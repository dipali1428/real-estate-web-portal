'use client';

import React, { useState, useEffect } from 'react';
import { 
  CreditCard, Landmark, CheckCircle2, 
  AlertCircle, Fingerprint, Loader2,
  Clock, ArrowLeft, Info, X,
  Database, Save, Phone, Mail, MapPin
} from 'lucide-react';
import { motion } from 'framer-motion';
import CustomerService from '../../../services/customerService';
import { useRouter } from 'next/navigation';

type VerificationStatus = 'NOT_STARTED' | 'PENDING' | 'VERIFIED' | 'FAILED';

interface DematDetails {
  dp_id: string;
  client_id: string;
  depository: string;
  demat_name: string;
}

interface ProfileData {
  id?: number;
  name: string;
  email: string;
  mobile?: string;
  adv_id?: string;
  city?: string;
  state?: string;
  pan?: string;
  aadhaar?: string;
  gst_number?: string;
  bank_name?: string;
  bank_account?: string;
  ifsc?: string;
  pan_verified?: boolean;
  name_as_per_pan?: string;
  date_of_birth?: string;
}

interface PopupMessage {
  id: string;
  message: string;
  type: "success" | "error" | "loading";
}

export default function KYCVerificationPage() {
  const router = useRouter();
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [loadingSection, setLoadingSection] = useState<string | null>(null);
  const [profile, setProfile] = useState<ProfileData | null>(null);
  
  // PAN Verification States
  const [panDetails, setPanDetails] = useState({
    pan: '',
    name_as_per_pan: '',
    date_of_birth: ''
  });

  // Aadhaar Verification States
  const [aadhaarNumber, setAadhaarNumber] = useState('');
  const [referenceId, setReferenceId] = useState<string | null>(null);
  const [otp, setOtp] = useState(['', '', '', '', '', '']);
  const [otpSent, setOtpSent] = useState(false);
  const [otpExpiry, setOtpExpiry] = useState<number | null>(null);

  // Bank Verification States
  const [bankDetails, setBankDetails] = useState({
    bank_name: '',
    bank_account_number: '',
    ifsc_code: ''
  });

  // Demat States
  const [dematDetails, setDematDetails] = useState<DematDetails>({
    dp_id: '',
    client_id: '',
    depository: 'NSDL',
    demat_name: ''
  });
  const [savingDemat, setSavingDemat] = useState(false);
  const [dematAdded, setDematAdded] = useState(false);

  // Status States - Initialize from profile data
  const [panStatus, setPanStatus] = useState<VerificationStatus>('NOT_STARTED');
  const [aadhaarStatus, setAadhaarStatus] = useState<VerificationStatus>('NOT_STARTED');
  const [bankStatus, setBankStatus] = useState<VerificationStatus>('NOT_STARTED');

  // IFSC Lookup
  const [fetchingBankDetails, setFetchingBankDetails] = useState(false);

  // Popup States
  const [popups, setPopups] = useState<PopupMessage[]>([]);

  // ========== POPUP FUNCTIONS ==========
  const removePopup = (id: string) => {
    setPopups(prev => prev.filter(p => p.id !== id));
  };

  const triggerPopup = (message: string, type: "success" | "error" | "loading" = "success", manualId?: string) => {
    const id = manualId || Math.random().toString(36).substring(2, 9);

    setPopups(prev => {
      const exists = prev.find(p => p.id === id);
      if (exists) {
        return prev.map(p => p.id === id ? { ...p, message, type } : p);
      }
      return [...prev, { id, message, type }];
    });

    if (type !== "loading") {
      setTimeout(() => removePopup(id), 4000);
    }
    return id;
  };

  // ========== FETCH PROFILE DATA ==========
  useEffect(() => {
    const fetchProfileData = async () => {
      setLoading(true);
      try {
        const profileData = await CustomerService.getProfile();
        console.log('Profile data:', profileData);
        
        if (profileData) {
          setProfile(profileData);
          
          // Pre-fill PAN details if available
          setPanDetails({
            pan: profileData.pan || '',
            name_as_per_pan: profileData.name_as_per_pan || profileData.name || '',
            date_of_birth: profileData.date_of_birth || ''
          });
          
          // Pre-fill Aadhaar if available
          setAadhaarNumber(profileData.aadhaar || '');
          
          // Pre-fill Bank if available
          setBankDetails({
            bank_name: profileData.bank_name || '',
            bank_account_number: profileData.bank_account || '',
            ifsc_code: profileData.ifsc || ''
          });
          
          // Set PAN verification status from profile
          if (profileData.pan_verified) {
            setPanStatus('VERIFIED');
          }
          
          // Note: Bank and Aadhaar verification status would need to come from
          // a separate KYC endpoint which you don't have. For now, we'll assume
          // they are not verified unless we have another way to determine this.
        }
      } catch (error) {
        console.error('Failed to fetch profile:', error);
        triggerPopup('Failed to load profile data', 'error');
      } finally {
        setLoading(false);
      }
    };

    fetchProfileData();
  }, []);

  // OTP Expiry Timer
  useEffect(() => {
    if (otpExpiry && otpExpiry > Date.now()) {
      const timer = setTimeout(() => {
        setOtpExpiry(null);
        setOtpSent(false);
        setOtp(['', '', '', '', '', '']);
        triggerPopup('OTP expired. Please generate again.', 'error');
      }, otpExpiry - Date.now());
      return () => clearTimeout(timer);
    }
  }, [otpExpiry]);

  // Auto-fetch bank details from IFSC
  useEffect(() => {
    const fetchBankFromIFSC = async () => {
      if (bankDetails.ifsc_code.length === 11) {
        setFetchingBankDetails(true);
        try {
          const response = await fetch(`https://ifsc.razorpay.com/${bankDetails.ifsc_code}`);
          const data = await response.json();
          if (data.BANK) {
            setBankDetails(prev => ({
              ...prev,
              bank_name: data.BANK
            }));
          }
        } catch (error) {
          console.error('Failed to fetch bank details');
        } finally {
          setFetchingBankDetails(false);
        }
      }
    };

    fetchBankFromIFSC();
  }, [bankDetails.ifsc_code]);

  // ==================== API HANDLERS ====================

  const handleVerifyPan = async () => {
    if (!panDetails.pan || panDetails.pan.length !== 10) {
      triggerPopup('Please enter a valid 10-digit PAN number', 'error');
      return;
    }

    const panRegex = /^[A-Z]{5}[0-9]{4}[A-Z]{1}$/;
    if (!panRegex.test(panDetails.pan)) {
      triggerPopup('Invalid PAN format. It should be 5 letters, 4 numbers, and 1 letter', 'error');
      return;
    }

    if (!panDetails.name_as_per_pan) {
      triggerPopup('Please enter your name as per PAN card', 'error');
      return;
    }

    if (!panDetails.date_of_birth) {
      triggerPopup('Please enter your date of birth', 'error');
      return;
    }

    // Convert date to DD/MM/YYYY if it's in YYYY-MM-DD format
    let formattedDate = panDetails.date_of_birth;
    if (panDetails.date_of_birth.includes('-')) {
      const [year, month, day] = panDetails.date_of_birth.split('-');
      formattedDate = `${day}/${month}/${year}`;
    }

    setLoadingSection('pan');
    try {
      const response = await CustomerService.verifyPan({
        pan: panDetails.pan,
        name_as_per_pan: panDetails.name_as_per_pan,
        date_of_birth: formattedDate
      });
      setPanStatus('VERIFIED');
      triggerPopup(response.message || 'PAN verified successfully!', 'success');
    } catch (error: any) {
      setPanStatus('FAILED');
      triggerPopup(error.response?.data?.message || 'PAN verification failed', 'error');
    } finally {
      setLoadingSection(null);
    }
  };

  const handleGenerateAadhaarOtp = async () => {
    if (!aadhaarNumber || aadhaarNumber.length !== 12) {
      triggerPopup('Please enter a valid 12-digit Aadhaar number', 'error');
      return;
    }

    setLoadingSection('aadhaar-otp');
    try {
      const response = await CustomerService.generateAadhaarOtp(aadhaarNumber);
      
      if (response.reference_id || response["Reference ID"]) {
        setReferenceId(response.reference_id || response["Reference ID"]);
      }
      
      setOtpSent(true);
      setOtpExpiry(Date.now() + 180000);
      triggerPopup('OTP sent to your registered mobile number', 'success');
    } catch (error: any) {
      setAadhaarStatus('FAILED');
      triggerPopup(error.response?.data?.message || 'Failed to generate OTP', 'error');
    } finally {
      setLoadingSection(null);
    }
  };

  const handleVerifyAadhaarOtp = async () => {
    const otpString = otp.join('');
    if (otpString.length !== 6) {
      triggerPopup('Please enter a valid 6-digit OTP', 'error');
      return;
    }

    if (!referenceId) {
      triggerPopup('Reference ID not found. Please generate OTP again.', 'error');
      return;
    }

    setLoadingSection('aadhaar-verify');
    try {
      const response = await CustomerService.verifyAadhaarOtp({
        reference_id: referenceId,
        otp: otpString,
        aadhaar_number: aadhaarNumber
      });
      
      setAadhaarStatus('VERIFIED');
      setOtpSent(false);
      setOtpExpiry(null);
      setOtp(['', '', '', '', '', '']);
      triggerPopup('Aadhaar verified successfully', 'success');
    } catch (error: any) {
      setAadhaarStatus('FAILED');
      triggerPopup(error.response?.data?.message || 'OTP verification failed', 'error');
    } finally {
      setLoadingSection(null);
    }
  };

  const handleVerifyBank = async () => {
    if (!bankDetails.bank_name || !bankDetails.bank_account_number || !bankDetails.ifsc_code) {
      triggerPopup('Please fill all bank details', 'error');
      return;
    }

    if (bankDetails.bank_account_number.length < 9 || bankDetails.bank_account_number.length > 18) {
      triggerPopup('Account number should be between 9 and 18 digits', 'error');
      return;
    }

    if (bankDetails.ifsc_code.length !== 11) {
      triggerPopup('IFSC code should be 11 characters', 'error');
      return;
    }

    setLoadingSection('bank');
    try {
      const response = await CustomerService.verifyBankPennyDrop(bankDetails);
      setBankStatus('VERIFIED');
      triggerPopup(response.message, 'success');
      if (response.data?.utr) {
        triggerPopup(`₹${response.data.amount_deposited} deposited. UTR: ${response.data.utr}`, 'success');
      }
    } catch (error: any) {
      setBankStatus('FAILED');
      triggerPopup(error.response?.data?.message || 'Bank verification failed', 'error');
    } finally {
      setLoadingSection(null);
    }
  };

  const handleAddDemat = async () => {
    if (!dematDetails.dp_id || !dematDetails.client_id || !dematDetails.demat_name) {
        triggerPopup('Please fill all required fields (DP ID, Client ID, and Name on Demat)', 'error');
        return;
    }

    if (!dematDetails.dp_id.match(/^[A-Z0-9]{6,}$/)) {
        triggerPopup('Invalid DP ID format', 'error');
        return;
    }

    if (!dematDetails.client_id.match(/^[0-9]{8,}$/)) {
        triggerPopup('Client ID should be at least 8 digits', 'error');
        return;
    }

    setSavingDemat(true);
    try {
        const response = await CustomerService.addDematAccount({
            dp_id: dematDetails.dp_id,
            client_id: dematDetails.client_id,
            depository: dematDetails.depository,
            demat_name: dematDetails.demat_name
        });
        
        if (response) {
            setDematAdded(true);
            triggerPopup('Demat account added successfully!', 'success');
        }
    } catch (error: any) {
        console.error('Error adding demat:', error);
        triggerPopup(error.response?.data?.message || 'Failed to add demat account', 'error');
    } finally {
        setSavingDemat(false);
    }
  };

  // ========== SAVE ALL CHANGES ==========
  const handleSaveAllChanges = async () => {
    if (!profile) return;
    
    setSaving(true);
    try {
      // Update profile with all the edited details
      const updatedProfile = {
        id: profile.id,
        name: profile.name,
        email: profile.email,
        pan: panDetails.pan,
        name_as_per_pan: panDetails.name_as_per_pan,
        date_of_birth: panDetails.date_of_birth,
        aadhaar: aadhaarNumber,
        bank_name: bankDetails.bank_name,
        bank_account: bankDetails.bank_account_number,
        ifsc: bankDetails.ifsc_code
      };
      
      const response = await CustomerService.updateProfile(updatedProfile);
      
      if (response) {
        triggerPopup('All changes saved successfully!', 'success');
      }
    } catch (error: any) {
      console.error('Save error:', error);
      triggerPopup(error.response?.data?.message || 'Failed to save changes', 'error');
    } finally {
      setSaving(false);
    }
  };

  // ==================== HELPER FUNCTIONS ====================

  const getCompletedSteps = () => {
    let count = 0;
    if (panStatus === 'VERIFIED') count++;
    if (aadhaarStatus === 'VERIFIED') count++;
    if (bankStatus === 'VERIFIED') count++;
    if (dematAdded) count++;
    return count;
  };

  const progressPercentage = (getCompletedSteps() / 4) * 100;

  // ========== LOADING STATE ==========
  if (loading) {
    return (
      <main className="max-w-[1440px] mx-auto px-4 md:px-8 py-8 bg-[#F8FAFC] min-h-screen flex items-center justify-center">
        <div className="flex justify-center items-center h-[60vh]">
          <div className="w-10 h-10 border-4 border-[#1CADA3] border-t-transparent rounded-full animate-spin" />
        </div>
      </main>
    );
  }

  return (
    <main className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8 bg-[#F8FAFC] min-h-screen relative">
      
      {/* --- CUSTOM NOTIFICATION POPUPS --- */}
      <div className="fixed top-5 right-5 z-[9999] flex flex-col gap-3 pointer-events-none">
        {popups.map((p) => (
          <div
            key={p.id}
            className={`pointer-events-auto min-w-[280px] px-6 py-4 rounded-2xl shadow-2xl border transition-all duration-300
              ${p.type === 'success' ? 'bg-emerald-50 border-emerald-100 text-emerald-800' :
                p.type === 'error' ? 'bg-rose-50 border-rose-100 text-rose-800' :
                'bg-white border-slate-200 text-slate-800'}`}
          >
            <div className="flex items-center justify-between gap-4">
              <span className="text-sm font-bold tracking-wide">
                {p.type === 'loading' ? `Please wait: ${p.message}` : p.message}
              </span>
              <button
                onClick={() => removePopup(p.id)}
                className="text-xs font-black uppercase opacity-50 hover:opacity-100 transition-opacity"
              >
                Dismiss
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Header */}
      <header className="mb-6 sm:mb-8">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div className="flex items-center gap-3">
            <button 
              onClick={() => router.back()}
              className="p-2 hover:bg-white rounded-xl transition-colors"
            >
              <ArrowLeft className="w-5 h-5 text-slate-600" />
            </button>
            <div>
              <h1 className="text-xl sm:text-2xl font-bold text-slate-800">KYC & Demat Verification</h1>
              <p className="text-xs sm:text-sm text-slate-500 mt-0.5">Complete your verification to start investing</p>
            </div>
          </div>
          
          {/* Step Counter */}
          <div className="flex items-center gap-3 self-start sm:self-auto">
            <span className={`px-3 py-1.5 rounded-lg text-xs font-black uppercase tracking-widest whitespace-nowrap ${
              getCompletedSteps() === 4 
                ? "bg-emerald-50 text-emerald-600 border border-emerald-200" 
                : "bg-amber-50 text-amber-600 border border-amber-200"
            }`}>
              {getCompletedSteps() === 4 ? "All Completed" : `${getCompletedSteps()}/4 Steps Done`}
            </span>
          </div>
        </div>
      </header>

      {/* Progress Bar */}
      <div className="mb-6 sm:mb-8 bg-white rounded-xl p-4 sm:p-5 border border-slate-100 shadow-sm">
        <div className="flex justify-between items-center mb-2">
          <span className="text-[10px] sm:text-xs font-black text-slate-400 uppercase tracking-widest">Overall Progress</span>
          <span className="text-xs sm:text-sm font-bold text-[#1CADA3]">{getCompletedSteps()}/4 Steps</span>
        </div>
        <div className="h-2 bg-slate-100 rounded-full overflow-hidden">
          <motion.div 
            initial={{ width: 0 }}
            animate={{ width: `${progressPercentage}%` }}
            className="h-full bg-gradient-to-r from-[#2076C7] to-[#1CADA3] rounded-full"
          />
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left Column - Bank Verification */}
        <div className="lg:col-span-5 space-y-6">          
          {/* Bank Verification Card - Step 1 */}
          <div className="bg-white rounded-xl p-5 border border-slate-100 shadow-sm space-y-4">
            <div className="flex items-center justify-between">
              <span className="px-2 py-1 bg-blue-50 text-blue-600 text-[9px] font-black uppercase tracking-widest rounded-md border border-blue-100">
                Step - 1
              </span>
              <span className={`flex items-center gap-1 text-[8px] font-black uppercase px-2 py-1 rounded-full ${
                bankStatus === 'VERIFIED' 
                  ? "text-emerald-600 bg-emerald-50 border border-emerald-100" 
                  : "text-amber-600 bg-amber-50 border border-amber-100"
              }`}>
                {bankStatus === 'VERIFIED' ? <CheckCircle2 size={10} /> : <AlertCircle size={10} />} 
                {bankStatus === 'VERIFIED' ? "Verified" : "Not Verified"}
              </span>
            </div>
            
            <div className="flex items-center gap-3">
              <div className="p-2 bg-emerald-50 text-emerald-500 rounded-lg">
                <Landmark size={18} />
              </div>
              <div>
                <h3 className="text-base font-bold text-slate-900">Bank Details</h3>
                <p className="text-[10px] text-slate-500">Verify your bank account</p>
              </div>
            </div>

            <div className="space-y-3">
              <div>
                <label className="text-[9px] font-black text-slate-400 uppercase tracking-widest block mb-1">Bank Name</label>
                <input 
                  value={bankDetails.bank_name} 
                  onChange={(e) => setBankDetails({...bankDetails, bank_name: e.target.value})} 
                  placeholder="Enter Bank Name" 
                  className="w-full px-3 py-2 rounded-lg text-xs font-medium text-slate-700 bg-white border border-slate-200 focus:border-[#1CADA3] focus:outline-none" 
                />
              </div>
              <div>
                <label className="text-[9px] font-black text-slate-400 uppercase tracking-widest block mb-1">Account Number</label>
                <input 
                  value={bankDetails.bank_account_number} 
                  onChange={(e) => setBankDetails({...bankDetails, bank_account_number: e.target.value.replace(/\D/g, '')})} 
                  placeholder="Enter Account Number" 
                  className="w-full px-3 py-2 rounded-lg text-xs font-medium text-slate-700 bg-white border border-slate-200 focus:border-[#1CADA3] focus:outline-none" 
                />
              </div>
              <div>
                <label className="text-[9px] font-black text-slate-400 uppercase tracking-widest block mb-1">IFSC Code</label>
                <div className="relative">
                  <input 
                    value={bankDetails.ifsc_code} 
                    onChange={(e) => setBankDetails({...bankDetails, ifsc_code: e.target.value.toUpperCase()})} 
                    placeholder="Enter IFSC Code" 
                    className="w-full px-3 py-2 rounded-lg text-xs font-medium tracking-widest text-slate-700 bg-white border border-slate-200 focus:border-[#1CADA3] focus:outline-none" 
                  />
                  {fetchingBankDetails && (
                    <Loader2 className="absolute right-3 top-1/2 -translate-y-1/2 w-3 h-3 text-slate-400 animate-spin" />
                  )}
                </div>
              </div>
            </div>
            
            {/* Info Notice */}
            <div className="flex items-start gap-2 p-3 bg-amber-50 rounded-lg border border-amber-100">
              <Info className="text-amber-600 w-3 h-3 flex-shrink-0 mt-0.5" />
              <p className="text-[10px] font-medium text-amber-700 leading-relaxed">
                We'll deposit ₹1.00 to verify your account. This amount will be refunded within 24 hours.
              </p>
            </div>

            {/* Bank Verified Status */}
            {bankStatus === 'VERIFIED' && (
              <div className="flex items-center gap-2 p-3 bg-emerald-50 rounded-lg border border-emerald-100">
                <CheckCircle2 className="text-emerald-500 w-4 h-4 flex-shrink-0" />
                <span className="text-emerald-700 font-bold text-xs">Bank account verified successfully</span>
              </div>
            )}

            {/* Verify Button */}
            {bankStatus !== 'VERIFIED' && bankDetails.bank_account_number && bankDetails.ifsc_code && (
              <div className="flex justify-end">
                <button 
                  disabled={loadingSection === 'bank'} 
                  onClick={handleVerifyBank} 
                  className="bg-emerald-500 hover:bg-emerald-600 text-white text-[10px] font-black px-4 py-2 rounded-lg uppercase flex items-center gap-1 shadow-sm disabled:opacity-70"
                >
                  {loadingSection === 'bank' ? (
                    <><Loader2 size={10} className="animate-spin" />Verifying…</>
                  ) : (
                    <><CheckCircle2 size={10} />Verify Bank</>
                  )}
                </button>
              </div>
            )}
          </div>
        </div>

        {/* Right Column - KYC Steps */}
        <div className="lg:col-span-7 space-y-6">
          
          {/* PAN & Aadhaar Verification Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            
            {/* PAN Card - Step 2 */}
            <div className="bg-white rounded-xl p-5 border border-slate-100 shadow-sm">
              <div className="flex items-center justify-between mb-3">
                <span className="px-2 py-1 bg-blue-50 text-blue-600 text-[9px] font-black uppercase tracking-widest rounded-md border border-blue-100">
                  Step - 2
                </span>
                <span className={`text-[8px] font-black uppercase px-2 py-1 rounded-md ${
                  panStatus === 'VERIFIED' 
                    ? "text-emerald-500 bg-emerald-50 border border-emerald-100" 
                    : panStatus === 'FAILED'
                    ? "text-rose-500 bg-rose-50 border border-rose-100"
                    : "text-amber-500 bg-amber-50 border border-amber-100"
                }`}>
                  {panStatus === 'VERIFIED' ? "Verified" : panStatus === 'FAILED' ? "Failed" : "Pending"}
                </span>
              </div>
              
              <div className="flex items-center gap-2 mb-3">
                <div className="p-1.5 bg-emerald-50 text-emerald-500 rounded-lg">
                  <CreditCard size={16} strokeWidth={2.5} />
                </div>
                <h3 className="text-sm font-bold text-[#0f172a]">PAN Verification</h3>
              </div>

              <div className="space-y-3">
                <input
                  className="w-full text-xs font-medium text-slate-700 bg-white border border-slate-200 rounded-lg px-3 py-2 focus:outline-none focus:border-[#1CADA3]"
                  value={panDetails.pan}
                  placeholder="Enter PAN (e.g. ABCDE1234F)"
                  maxLength={10}
                  onChange={(e) => setPanDetails({...panDetails, pan: e.target.value.toUpperCase()})}
                />

                {panStatus !== 'VERIFIED' && (
                  <>
                    <input
                      className="w-full text-xs font-medium text-slate-700 bg-white border border-slate-200 rounded-lg px-3 py-2 focus:outline-none focus:border-[#1CADA3]"
                      value={panDetails.name_as_per_pan}
                      placeholder="Full Name as per PAN Card"
                      onChange={(e) => setPanDetails({...panDetails, name_as_per_pan: e.target.value})}
                    />

                    <div className="flex items-center gap-2">
                      <input
                        type="date"
                        className="flex-1 text-xs font-medium text-slate-700 bg-white border border-slate-200 rounded-lg px-3 py-2 focus:outline-none focus:border-[#1CADA3]"
                        value={panDetails.date_of_birth}
                        onChange={(e) => setPanDetails({...panDetails, date_of_birth: e.target.value})}
                      />
                      <button
                        onClick={handleVerifyPan}
                        disabled={loadingSection === 'pan' || !panDetails.pan}
                        className="bg-[#1CADA3] hover:bg-[#158f87] text-white text-[10px] font-bold px-3 py-2 rounded-lg transition-colors disabled:opacity-50 whitespace-nowrap"
                      >
                        {loadingSection === 'pan' ? "..." : "Verify"}
                      </button>
                    </div>
                    
                    {/* Disclaimer */}
                    <p className="text-[8px] text-amber-600 leading-tight mt-1">
                      * Upon verification, your name will be updated as per PAN
                    </p>
                  </>
                )}

                {panStatus === 'VERIFIED' && (
                  <p className="text-xs font-bold text-slate-700 bg-slate-50 p-2 rounded-lg">{panDetails.pan}</p>
                )}
              </div>
            </div>

            {/* Aadhaar Card - Step 3 */}
            <div className="bg-white rounded-xl p-5 border border-slate-100 shadow-sm">
              <div className="flex items-center justify-between mb-3">
                <span className="px-2 py-1 bg-blue-50 text-blue-600 text-[9px] font-black uppercase tracking-widest rounded-md border border-blue-100">
                  Step - 3
                </span>
                <span className={`text-[8px] font-black uppercase px-2 py-1 rounded-md ${
                  aadhaarStatus === 'VERIFIED' 
                    ? "text-emerald-500 bg-emerald-50 border border-emerald-100" 
                    : aadhaarStatus === 'FAILED'
                    ? "text-rose-500 bg-rose-50 border border-rose-100"
                    : "text-amber-500 bg-amber-50 border border-amber-100"
                }`}>
                  {aadhaarStatus === 'VERIFIED' ? "Verified" : aadhaarStatus === 'FAILED' ? "Failed" : "Pending"}
                </span>
              </div>

              <div className="flex items-center gap-2 mb-3">
                <div className="p-1.5 bg-emerald-50 text-emerald-500 rounded-lg">
                  <Fingerprint size={16} strokeWidth={2.5} />
                </div>
                <h3 className="text-sm font-bold text-[#0f172a]">Aadhaar Authentication</h3>
              </div>

              <div className="space-y-3">
                {!otpSent && aadhaarStatus !== 'VERIFIED' && (
                  <div className="flex items-center gap-2">
                    <div className="relative flex-1">
                      <input
                        className="w-full text-xs font-medium text-slate-700 bg-white border border-slate-200 rounded-lg px-3 py-2 focus:outline-none focus:border-[#1CADA3]"
                        value={aadhaarNumber}
                        placeholder="Enter 12 digit Aadhaar"
                        maxLength={12}
                        onChange={(e) => setAadhaarNumber(e.target.value.replace(/\D/g, ''))}
                      />
                    </div>

                    <button
                      onClick={handleGenerateAadhaarOtp}
                      disabled={loadingSection === 'aadhaar-otp' || aadhaarNumber.length !== 12}
                      className="whitespace-nowrap bg-[#1CADA3] hover:bg-[#158f87] text-white text-[10px] font-bold px-3 py-2 rounded-lg transition-colors disabled:opacity-50 shadow-sm"
                    >
                      {loadingSection === 'aadhaar-otp' ? "..." : "Get OTP"}
                    </button>
                  </div>
                )}

                {aadhaarStatus === 'VERIFIED' && (
                  <p className="text-xs font-bold text-slate-700 bg-slate-50 p-2 rounded-lg">
                    {aadhaarNumber ? `•••• •••• ${aadhaarNumber.slice(-4)}` : "NOT PROVIDED"}
                  </p>
                )}

                {otpSent && (
                  <div className="space-y-2">
                    <div className="flex items-center gap-2">
                      <input
                        type="text"
                        placeholder="Enter 6-digit OTP"
                        maxLength={6}
                        value={otp.join('')}
                        onChange={(e) => {
                          const val = e.target.value.replace(/\D/g, '');
                          const newOtp = [...Array(6)].map((_, i) => val[i] || '');
                          setOtp(newOtp);
                        }}
                        className="flex-1 text-xs font-medium px-3 py-2 rounded-lg border border-[#1CADA3] outline-none bg-emerald-50/30"
                      />
                      <button
                        onClick={handleVerifyAadhaarOtp}
                        disabled={loadingSection === 'aadhaar-verify' || otp.join('').length < 6}
                        className="bg-emerald-600 text-white text-[10px] px-3 py-2 rounded-lg font-bold disabled:opacity-50 shadow-sm whitespace-nowrap"
                      >
                        {loadingSection === 'aadhaar-verify' ? "..." : "Verify"}
                      </button>
                      <button
                        onClick={() => {
                          setOtpSent(false);
                          setOtp(['', '', '', '', '', '']);
                          setReferenceId(null);
                        }}
                        className="text-rose-500 text-[9px] font-bold hover:underline px-1 whitespace-nowrap"
                      >
                        Edit
                      </button>
                    </div>
                    
                    {otpExpiry && (
                      <div className="flex items-center gap-1 text-[10px] font-medium text-slate-500">
                        <Clock className="w-3 h-3" />
                        <span>Expires in {Math.max(0, Math.floor((otpExpiry - Date.now()) / 1000))}s</span>
                      </div>
                    )}
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Demat Card - Step 4 */}
          <div className="bg-white rounded-xl p-5 border border-slate-100 shadow-sm">
            <div className="flex items-center justify-between mb-4">
              <span className="px-2 py-1 bg-blue-50 text-blue-600 text-[9px] font-black uppercase tracking-widest rounded-md border border-blue-100">
                Step - 4
              </span>
              {dematAdded && (
                <span className="flex items-center gap-1 text-[9px] font-black uppercase px-2 py-1 rounded-full text-emerald-600 bg-emerald-50 border border-emerald-100">
                  <CheckCircle2 size={10} />
                  Added
                </span>
              )}
            </div>

            <div className="flex items-center gap-3 mb-4">
              <div className="p-2 bg-emerald-50 text-emerald-500 rounded-lg">
                <Database size={18} />
              </div>
              <div>
                <h3 className="text-base font-bold text-slate-900">Demat Account</h3>
                <p className="text-[10px] text-slate-500">Add your Demat account for trading</p>
              </div>
            </div>

            {dematAdded ? (
              <div className="flex items-center gap-3 p-4 bg-emerald-50 rounded-lg border border-emerald-100">
                <div className="w-8 h-8 bg-emerald-100 rounded-full flex items-center justify-center">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                </div>
                <div>
                  <h4 className="text-sm font-bold text-emerald-800">Demat Account Added Successfully!</h4>
                  <p className="text-[10px] text-emerald-600">Your demat account has been linked.</p>
                </div>
              </div>
            ) : (
              <div className="space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="text-[9px] font-black text-slate-400 uppercase tracking-widest block mb-1">
                      DP ID <span className="text-rose-500">*</span>
                    </label>
                    <input
                      type="text"
                      value={dematDetails.dp_id}
                      onChange={(e) => setDematDetails({...dematDetails, dp_id: e.target.value})}
                      className="w-full px-3 py-2 bg-white border border-slate-200 rounded-lg text-xs font-medium text-slate-700 focus:outline-none focus:border-[#1CADA3]"
                      placeholder="Enter DP ID"
                    />
                  </div>
                  <div>
                    <label className="text-[9px] font-black text-slate-400 uppercase tracking-widest block mb-1">
                      Client ID <span className="text-rose-500">*</span>
                    </label>
                    <input
                      type="text"
                      value={dematDetails.client_id}
                      onChange={(e) => setDematDetails({...dematDetails, client_id: e.target.value})}
                      className="w-full px-3 py-2 bg-white border border-slate-200 rounded-lg text-xs font-medium text-slate-700 focus:outline-none focus:border-[#1CADA3]"
                      placeholder="Enter Client ID"
                    />
                  </div>
                  <div>
                    <label className="text-[9px] font-black text-slate-400 uppercase tracking-widest block mb-1">
                      Depository <span className="text-rose-500">*</span>
                    </label>
                    <select
                      value={dematDetails.depository}
                      onChange={(e) => setDematDetails({...dematDetails, depository: e.target.value})}
                      className="w-full px-3 py-2 bg-white border border-slate-200 rounded-lg text-xs font-medium text-slate-700 focus:outline-none focus:border-[#1CADA3]"
                    >
                      <option value="NSDL">NSDL</option>
                      <option value="CDSL">CDSL</option>
                    </select>
                  </div>
                  <div>
                    <label className="text-[9px] font-black text-slate-400 uppercase tracking-widest block mb-1">
                      Name on Demat <span className="text-rose-500">*</span>
                    </label>
                    <input
                      type="text"
                      value={dematDetails.demat_name}
                      onChange={(e) => setDematDetails({...dematDetails, demat_name: e.target.value.toUpperCase()})}
                      className="w-full px-3 py-2 bg-white border border-slate-200 rounded-lg text-xs font-medium text-slate-700 focus:outline-none focus:border-[#1CADA3]"
                      placeholder="Enter Name as per Demat Account"
                    />
                  </div>
                </div>

                <div className="flex items-start gap-2 p-3 bg-blue-50 rounded-lg border border-blue-100">
                  <Info className="text-blue-600 w-3 h-3 flex-shrink-0 mt-0.5" />
                  <p className="text-[9px] font-medium text-blue-700">
                    Ensure details match your official records.
                  </p>
                </div>

                <div className="flex justify-end">
                  <button
                    onClick={handleAddDemat}
                    disabled={savingDemat}
                    className="px-5 py-2 bg-[#1CADA3] text-white rounded-lg font-bold text-xs hover:bg-[#158f87] transition-all disabled:opacity-50 flex items-center gap-1 shadow-sm"
                  >
                    {savingDemat ? (
                      <Loader2 className="animate-spin w-3 h-3" />
                    ) : (
                      <Save className="w-3 h-3" />
                    )}
                    {savingDemat ? 'Saving...' : 'Save Demat'}
                  </button>
                </div>
              </div>
            )}
          </div>
          
          {/* Global Save Button */}
          <div className="flex justify-end pt-2">
            <button
              onClick={handleSaveAllChanges}
              disabled={saving}
              className="px-6 py-3 bg-[#1CADA3] text-white rounded-lg font-bold text-sm hover:bg-[#158f87] transition-all disabled:opacity-50 flex items-center gap-2 shadow-md"
            >
              {saving ? (
                <Loader2 className="animate-spin w-4 h-4" />
              ) : (
                <Save className="w-4 h-4" />
              )}
              {saving ? 'Saving All Changes...' : 'Save All Changes'}
            </button>
          </div>
        </div>
      </div>
    </main>
  );
}