'use client';

import React, { useState, useEffect } from 'react';
import {
  CreditCard,
  Landmark,
  CheckCircle2,
  AlertCircle,
  Fingerprint,
  Loader2,
  Clock,
  Info,
  Database,
  Save,
  User,
  Mail,
  Phone,
  MapPin,
  Calendar,
  Hash,
  Building2,
  FileText,
  IdCard,
  Globe,
  Home,
  Map,
  Briefcase,
  Asterisk
} from 'lucide-react';
import { motion } from 'framer-motion';
import customerService from '../../services/customerService';

type VerificationStatus = 'NOT_STARTED' | 'PENDING' | 'VERIFIED' | 'FAILED';

interface DematDetails {
  dp_id: string;
  client_id: string;
  depository: string;
  demat_name: string;
}

interface PopupMessage {
  id: string;
  message: string;
  type: "success" | "error" | "loading";
}

interface KYCSectionProps {
  profile?: any;
  onRefresh?: () => Promise<void>;
  externalPanVerified?: boolean;
  externalAadhaarVerified?: boolean;
  externalBankVerified?: boolean;
  externalDematAdded?: boolean;
}

// Verified Details Component
const VerifiedDetailsCard: React.FC<{ 
  title: string;
  icon: React.ReactNode;
  color: string;
  children: React.ReactNode;
}> = ({ title, icon, color, children }) => (
  <div className="bg-white rounded-xl border border-slate-100 overflow-hidden shadow-sm">
    <div className={`px-4 py-3 bg-gradient-to-r ${color} border-b border-white/10`}>
      <div className="flex items-center gap-2">
        <div className="p-1.5 bg-white/20 rounded-lg">
          {icon}
        </div>
        <h3 className="text-sm font-bold text-white">{title}</h3>
      </div>
    </div>
    <div className="p-4">
      {children}
    </div>
  </div>
);

// Detail Row Component
const DetailRow: React.FC<{
  icon: React.ReactNode;
  label: string;
  value: string | number;
  masked?: boolean;
}> = ({ icon, label, value, masked = false }) => {
  if (!value) return null;
  
  const displayValue = masked && typeof value === 'string' 
    ? `•••• ${value.slice(-4)}` 
    : value;
    
  return (
    <div className="flex items-start gap-3 py-2 border-b border-slate-50 last:border-0">
      <div className="text-slate-400 mt-0.5">{icon}</div>
      <div className="flex-1">
        <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">{label}</p>
        <p className="text-sm font-medium text-slate-700">{displayValue}</p>
      </div>
    </div>
  );
};

export const KYCSection: React.FC<KYCSectionProps> = ({
  profile,
  onRefresh,
  externalPanVerified,
  externalAadhaarVerified,
  externalBankVerified,
  externalDematAdded
}) => {
  const [loading, setLoading] = useState(true);
  const [loadingSection, setLoadingSection] = useState<string | null>(null);
  
  // PAN States
  const [panDetails, setPanDetails] = useState({
    pan: '',
    name_as_per_pan: '',
    date_of_birth: ''
  });

  // Aadhaar States
  const [aadhaarNumber, setAadhaarNumber] = useState('');
  const [referenceId, setReferenceId] = useState<string | null>(null);
  const [otp, setOtp] = useState(['', '', '', '', '', '']);
  const [otpSent, setOtpSent] = useState(false);
  const [otpExpiry, setOtpExpiry] = useState<number | null>(null);

  // Bank States
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

  // Status States
  const [panStatus, setPanStatus] = useState<VerificationStatus>(
    externalPanVerified ? 'VERIFIED' : 'NOT_STARTED'
  );
  const [aadhaarStatus, setAadhaarStatus] = useState<VerificationStatus>(
    externalAadhaarVerified ? 'VERIFIED' : 'NOT_STARTED'
  );
  const [bankStatus, setBankStatus] = useState<VerificationStatus>(
    externalBankVerified ? 'VERIFIED' : 'NOT_STARTED'
  );

  // Store KYC details from profile
  const [kycDetails, setKycDetails] = useState<any>(null);

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

  useEffect(() => {
    if (!profile) {
      setLoading(false);
      return;
    }
    
    // Extract kycDetails from profile
    if (profile.kycDetails) {
      setKycDetails(profile.kycDetails);
      
      // Set aadhaar number from kycDetails
      if (profile.kycDetails.aadhaar_number) {
        setAadhaarNumber(profile.kycDetails.aadhaar_number);
      }
      
      // Set bank details from kycDetails
      if (profile.kycDetails.bank_name) {
        setBankDetails({
          bank_name: profile.kycDetails.bank_name || '',
          bank_account_number: profile.kycDetails.bank_account_number || '',
          ifsc_code: profile.kycDetails.ifsc_code || ''
        });
      }
    }

    setPanDetails({
      pan: profile.pan || profile.user?.pan || '',
      name_as_per_pan: profile.name_as_per_pan || profile.user?.name || profile.name || '',
      date_of_birth: profile.date_of_birth || profile.user?.date_of_birth || ''
    });

    // Update verification statuses
    setPanStatus(profile.pan_verified || profile.user?.pan_verified ? 'VERIFIED' : 'NOT_STARTED');
    setAadhaarStatus(profile.aadhaar_verified || profile.kycDetails?.aadhaar_verified ? 'VERIFIED' : 'NOT_STARTED');
    setBankStatus(profile.bank_verified || profile.kycDetails?.bank_verified ? 'VERIFIED' : 'NOT_STARTED');
    setDematAdded(!!profile.demat_added);

    setLoading(false);
  }, [profile]);

  // ========== OTP EXPIRY TIMER ==========
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

  // ========== IFSC AUTO-FETCH ==========
  useEffect(() => {
    const fetchBankFromIFSC = async () => {
      if (bankDetails.ifsc_code.length === 11) {
        setFetchingBankDetails(true);
        try {
          const response = await fetch(`https://ifsc.razorpay.com/${bankDetails.ifsc_code}`);
          const data = await response.json();
          if (data.BANK) {
            setBankDetails(prev => ({ ...prev, bank_name: data.BANK }));
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

  // ========== PAN VERIFICATION ==========
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
    
    const dobRegex = /^\d{2}\/\d{2}\/\d{4}$/;
    if (!dobRegex.test(panDetails.date_of_birth)) {
      triggerPopup('Date must be in DD/MM/YYYY format', 'error');
      return;
    }

    const formattedDate = panDetails.date_of_birth;

    setLoadingSection('pan');
    try {
      const response = await customerService.verifyPan({
        pan: panDetails.pan,
        name_as_per_pan: panDetails.name_as_per_pan,
        date_of_birth: formattedDate
      });
      
      if (onRefresh) await onRefresh();
      setPanStatus('VERIFIED');
    
      triggerPopup(response.message || 'PAN verified successfully!', 'success');
    } catch (error: any) {
      setPanStatus('FAILED');
      triggerPopup(error.response?.data?.message || 'PAN verification failed', 'error');
    } finally {
      setLoadingSection(null);
    }
  };

  // ========== AADHAAR OTP GENERATION ==========
  const handleGenerateAadhaarOtp = async () => {
    if (!aadhaarNumber || aadhaarNumber.length !== 12) {
      triggerPopup('Please enter a valid 12-digit Aadhaar number', 'error');
      return;
    }

    setLoadingSection('aadhaar-otp');
    try {
      const response = await customerService.generateAadhaarOtp(aadhaarNumber);
      if (response.reference_id || response["Reference ID"]) {
        setReferenceId(response.reference_id || response["Reference ID"]);
      }
      setOtpSent(true);
      setOtpExpiry(Date.now() + 180000); // 3 minutes
      triggerPopup('OTP sent to your registered mobile number', 'success');
    } catch (error: any) {
      setAadhaarStatus('FAILED');
      triggerPopup(error.response?.data?.message || 'Failed to generate OTP', 'error');
    } finally {
      setLoadingSection(null);
    }
  };

  // ========== AADHAAR OTP VERIFICATION ==========
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
      const response = await customerService.verifyAadhaarOtp({
        reference_id: referenceId,
        otp: otpString,
        aadhaar_number: aadhaarNumber
      });
      
      setAadhaarStatus('VERIFIED');
      setOtpSent(false);
      setOtpExpiry(null);
      setOtp(['', '', '', '', '', '']);
      
      // Refresh data from backend
      if (onRefresh) await onRefresh();
      
      triggerPopup('Aadhaar verified successfully', 'success');
    } catch (error: any) {
      setAadhaarStatus('FAILED');
      triggerPopup(error.response?.data?.message || 'OTP verification failed', 'error');
    } finally {
      setLoadingSection(null);
    }
  };

  // ========== BANK VERIFICATION ==========
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
      const response = await customerService.verifyBankPennyDrop(bankDetails);
      
      setBankStatus('VERIFIED');
      
      // Refresh data from backend
      if (onRefresh) await onRefresh();
      
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

  // ========== ADD DEMAT ==========
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
      const response = await customerService.addDematAccount({
        dp_id: dematDetails.dp_id,
        client_id: dematDetails.client_id,
        depository: dematDetails.depository,
        demat_name: dematDetails.demat_name
      });
      
      if (response) {
        setDematAdded(true);
        
        // Refresh data from backend
        if (onRefresh) await onRefresh();
        
        triggerPopup('Demat account added successfully!', 'success');
      }
    } catch (error: any) {
      console.error('Error adding demat:', error);
      triggerPopup(error.response?.data?.message || 'Failed to add demat account', 'error');
    } finally {
      setSavingDemat(false);
    }
  };

  // ========== HELPER FUNCTIONS ==========
  const resetAadhaarOtp = () => {
    setOtpSent(false);
    setOtp(['', '', '', '', '', '']);
    setReferenceId(null);
  };

  const getKYCCompletedSteps = () => {
    let count = 0;
    if (panStatus === 'VERIFIED') count++;
    if (aadhaarStatus === 'VERIFIED') count++;
    if (bankStatus === 'VERIFIED') count++;
    // Demat is optional, so don't include in mandatory count
    return count;
  };

  const mandatoryStepsCompleted = getKYCCompletedSteps();
  const mandatoryProgressPercentage = (mandatoryStepsCompleted / 3) * 100;
  const allMandatoryCompleted = mandatoryStepsCompleted === 3;

  // Update status when external props change
  useEffect(() => {
    if (externalPanVerified !== undefined) {
      setPanStatus(externalPanVerified ? 'VERIFIED' : 'NOT_STARTED');
    }
    if (externalAadhaarVerified !== undefined) {
      setAadhaarStatus(externalAadhaarVerified ? 'VERIFIED' : 'NOT_STARTED');
    }
    if (externalBankVerified !== undefined) {
      setBankStatus(externalBankVerified ? 'VERIFIED' : 'NOT_STARTED');
    }
    if (externalDematAdded !== undefined) {
      setDematAdded(externalDematAdded);
    }
  }, [externalPanVerified, externalAadhaarVerified, externalBankVerified, externalDematAdded]);

  if (loading) {
    return (
      <div className="mt-12 flex justify-center items-center h-64">
        <div className="w-10 h-10 border-4 border-[#1CADA3] border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  return (
    <div className="mt-12">
      {/* KYC Custom Notification Popups */}
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

      {/* KYC Header */}
      <header className="mb-6 sm:mb-8">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div className="flex items-center gap-3">
            <div>
              <h1 className="text-xl sm:text-2xl font-bold text-slate-800">KYC & Demat Verification</h1>
            </div>
          </div>
          
          {/* Step Counter */}
          <div className="flex items-center gap-3 self-start sm:self-auto">
            <span className={`px-3 py-1.5 rounded-lg text-xs font-black uppercase tracking-widest whitespace-nowrap ${
              allMandatoryCompleted 
                ? "bg-emerald-50 text-emerald-600 border border-emerald-200" 
                : "bg-amber-50 text-amber-600 border border-amber-200"
            }`}>
              {allMandatoryCompleted ? "✓ KYC Completed" : `${mandatoryStepsCompleted}/3 Mandatory Steps`}
            </span>
            {dematAdded && (
              <span className="px-3 py-1.5 bg-indigo-50 text-indigo-600 border border-indigo-200 rounded-lg text-xs font-black uppercase tracking-widest">
                Demat Added
              </span>
            )}
          </div>
        </div>
      </header>

      {/* KYC Progress Bar - Now shows only mandatory steps */}
      <div className="mb-6 sm:mb-8 bg-white rounded-xl p-4 sm:p-5 border border-slate-100 shadow-sm">
        <div className="flex justify-between items-center mb-2">
          <span className="text-[10px] sm:text-xs font-black text-slate-400 uppercase tracking-widest flex items-center gap-1">
            <Asterisk size={10} className="text-rose-500" />
            Mandatory KYC Progress
          </span>
          <span className="text-xs sm:text-sm font-bold text-[#1CADA3]">{mandatoryStepsCompleted}/3 Steps</span>
        </div>
        <div className="h-2 bg-slate-100 rounded-full overflow-hidden">
          <motion.div 
            initial={{ width: 0 }}
            animate={{ width: `${mandatoryProgressPercentage}%` }}
            className="h-full bg-gradient-to-r from-[#2076C7] to-[#1CADA3] rounded-full"
          />
        </div>
      </div>

      {/* Verified KYC Summary Cards - Show only verified mandatory items */}
      {(panStatus === 'VERIFIED' || aadhaarStatus === 'VERIFIED' || bankStatus === 'VERIFIED') && (
        <div className="mb-8">
          <h2 className="text-lg font-bold text-slate-800 mb-4 flex items-center gap-2">
            <CheckCircle2 className="w-5 h-5 text-emerald-500" />
            Verified Information
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            
            {/* PAN Card - Mandatory */}
            {panStatus === 'VERIFIED' && (
              <VerifiedDetailsCard 
                title="PAN Card" 
                icon={<CreditCard className="w-4 h-4 text-white" />}
                color="from-blue-600 to-blue-500"
              >
                <DetailRow 
                  icon={<IdCard className="w-4 h-4" />}
                  label="PAN Number" 
                  value={panDetails.pan} 
                />
                <DetailRow 
                  icon={<User className="w-4 h-4" />}
                  label="Name on PAN" 
                  value={panDetails.name_as_per_pan} 
                />
                <DetailRow 
                  icon={<Calendar className="w-4 h-4" />}
                  label="Date of Birth" 
                  value={panDetails.date_of_birth} 
                />
              </VerifiedDetailsCard>
            )}

            {/* Aadhaar Card - Mandatory */}
            {aadhaarStatus === 'VERIFIED' && kycDetails?.aadhaar_kyc_data && (
              <VerifiedDetailsCard 
                title="Aadhaar Card" 
                icon={<Fingerprint className="w-4 h-4 text-white" />}
                color="from-purple-600 to-purple-500"
              >
                <DetailRow 
                  icon={<User className="w-4 h-4" />}
                  label="Name" 
                  value={kycDetails.aadhaar_kyc_data.name} 
                />
                <DetailRow 
                  icon={<Hash className="w-4 h-4" />}
                  label="Aadhaar Number" 
                  value={kycDetails.aadhaar_number}
                  masked={true}
                />
                <DetailRow 
                  icon={<Calendar className="w-4 h-4" />}
                  label="Date of Birth" 
                  value={kycDetails.aadhaar_kyc_data.date_of_birth} 
                />
              </VerifiedDetailsCard>
            )}

            {/* Bank Account - Mandatory */}
            {bankStatus === 'VERIFIED' && kycDetails && (
              <VerifiedDetailsCard 
                title="Bank Account" 
                icon={<Landmark className="w-4 h-4 text-white" />}
                color="from-emerald-600 to-emerald-500"
              >
                <DetailRow 
                  icon={<Building2 className="w-4 h-4" />}
                  label="Bank Name" 
                  value={kycDetails.bank_name} 
                />
                <DetailRow 
                  icon={<Hash className="w-4 h-4" />}
                  label="Account Number" 
                  value={kycDetails.bank_account_number}
                  masked={true}
                />
                <DetailRow 
                  icon={<FileText className="w-4 h-4" />}
                  label="IFSC Code" 
                  value={kycDetails.ifsc_code} 
                />
              </VerifiedDetailsCard>
            )}

            {/* Demat Account - Optional - Only show if added */}
            {dematAdded && (
              <VerifiedDetailsCard 
                title="Demat Account" 
                icon={<Database className="w-4 h-4 text-white" />}
                color="from-indigo-600 to-indigo-500"
              >
                <DetailRow 
                  icon={<IdCard className="w-4 h-4" />}
                  label="DP ID" 
                  value={dematDetails.dp_id} 
                />
                <DetailRow 
                  icon={<Hash className="w-4 h-4" />}
                  label="Client ID" 
                  value={dematDetails.client_id} 
                />
                <DetailRow 
                  icon={<Building2 className="w-4 h-4" />}
                  label="Depository" 
                  value={dematDetails.depository} 
                />
              </VerifiedDetailsCard>
            )}
          </div>
        </div>
      )}

      <div className="w-full max-w-7xl mx-auto px-0 py-6 space-y-6">
        {/* PAN Verification Card - Step 1 - Mandatory */}
        <div className="bg-white rounded-2xl p-6 border border-slate-100 shadow-sm hover:shadow-md transition-shadow">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 bg-blue-50 rounded-xl flex items-center justify-center relative">
                <CreditCard className="w-6 h-6 text-blue-600" />
                <Asterisk size={14} className="absolute -top-1 -right-1 text-rose-500" />
              </div>
              <div>
                <div className="flex items-center gap-3 mb-1">
                  <span className="px-2.5 py-1 bg-blue-50 text-blue-600 text-[10px] font-black uppercase tracking-widest rounded-md border border-blue-100">
                    Step 1 of 3
                  </span>
                  <span className={`text-[10px] font-black uppercase px-2.5 py-1 rounded-full ${
                    panStatus === 'VERIFIED' 
                      ? "text-emerald-600 bg-emerald-50 border border-emerald-100" 
                      : panStatus === 'FAILED'
                      ? "text-rose-600 bg-rose-50 border border-rose-100"
                      : "text-amber-600 bg-amber-50 border border-amber-100"
                  }`}>
                    {panStatus === 'VERIFIED' ? "Verified" : panStatus === 'FAILED' ? "Failed" : "Pending"}
                  </span>
                </div>
                <h3 className="text-lg font-bold text-slate-900">PAN Card Verification <span className="text-rose-500 text-sm">*</span></h3>
                <p className="text-xs text-slate-500">Verify your PAN card for tax compliance</p>
              </div>
            </div>
          </div>

          <div className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="md:col-span-1">
                <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest block mb-1.5">
                  PAN Number <span className="text-rose-500">*</span>
                </label>
                <input
                  className="w-full px-4 py-2.5 rounded-xl text-sm font-medium text-slate-700 bg-white border border-slate-200 focus:border-[#1CADA3] focus:outline-none focus:ring-2 focus:ring-emerald-100 uppercase"
                  value={panDetails.pan}
                  placeholder="ABCDE1234F"
                  maxLength={10}
                  onChange={(e) => setPanDetails({...panDetails, pan: e.target.value.toUpperCase()})}
                  disabled={panStatus === 'VERIFIED'}
                />
              </div>

              {panStatus !== 'VERIFIED' && (
                <>
                  <div className="md:col-span-1">
                    <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest block mb-1.5">
                      Full Name as per PAN <span className="text-rose-500">*</span>
                    </label>
                    <input
                      className="w-full px-4 py-2.5 rounded-xl text-sm font-medium text-slate-700 bg-white border border-slate-200 focus:border-[#1CADA3] focus:outline-none focus:ring-2 focus:ring-emerald-100"
                      value={panDetails.name_as_per_pan}
                      placeholder="Enter your full name"
                      onChange={(e) => setPanDetails({...panDetails, name_as_per_pan: e.target.value})}
                    />
                  </div>

                  <div className="md:col-span-1">
                    <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest block mb-1.5">
                      Date of Birth <span className="text-rose-500">*</span>
                    </label>
                    <div className="flex gap-2">
                      <input
                        type="text"
                        placeholder="DD/MM/YYYY"
                        className="flex-1 px-4 py-2.5 rounded-xl text-sm font-medium text-slate-700 bg-white border border-slate-200 focus:border-[#1CADA3] focus:outline-none focus:ring-2 focus:ring-emerald-100"
                        value={panDetails.date_of_birth}
                        onChange={(e) => {
                          let value = e.target.value.replace(/\D/g, '').slice(0, 8);

                          if (value.length > 4) {
                            value = `${value.slice(0, 2)}/${value.slice(2, 4)}/${value.slice(4)}`;
                          } else if (value.length > 2) {
                            value = `${value.slice(0, 2)}/${value.slice(2)}`;
                          }

                          setPanDetails({
                            ...panDetails,
                            date_of_birth: value
                          });
                        }}
                      />
                      <button
                        onClick={handleVerifyPan}
                        disabled={loadingSection === 'pan' || !panDetails.pan}
                        className="px-6 bg-[#1CADA3] hover:bg-[#158f87] text-white text-xs font-bold rounded-xl transition-colors disabled:opacity-50 whitespace-nowrap"
                      >
                        {loadingSection === 'pan' ? "Verifying..." : "Verify PAN"}
                      </button>
                    </div>
                  </div>
                </>
              )}

              {panStatus === 'VERIFIED' && (
                <div className="md:col-span-2">
                  <div className="flex items-center gap-4 p-4 bg-emerald-50 rounded-xl border border-emerald-100">
                    <CheckCircle2 className="text-emerald-500 w-5 h-5" />
                    <div>
                      <p className="text-sm font-bold text-emerald-800">PAN Verified Successfully</p>
                      <p className="text-xs text-emerald-600">PAN: {panDetails.pan}</p>
                    </div>
                  </div>
                </div>
              )}
            </div>
            
            {/* Disclaimer */}
            {panStatus !== 'VERIFIED' && (
              <p className="text-[10px] text-amber-600 bg-amber-50 p-3 rounded-xl border border-amber-100">
                * Upon verification, your name will be updated as per PAN card records
              </p>
            )}
          </div>
        </div>

        {/* Aadhaar Verification Card - Step 2 - Mandatory */}
        <div className="bg-white rounded-2xl p-6 border border-slate-100 shadow-sm hover:shadow-md transition-shadow">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 bg-purple-50 rounded-xl flex items-center justify-center relative">
                <Fingerprint className="w-6 h-6 text-purple-600" />
                <Asterisk size={14} className="absolute -top-1 -right-1 text-rose-500" />
              </div>
              <div>
                <div className="flex items-center gap-3 mb-1">
                  <span className="px-2.5 py-1 bg-blue-50 text-blue-600 text-[10px] font-black uppercase tracking-widest rounded-md border border-blue-100">
                    Step 2 of 3
                  </span>
                  <span className={`text-[10px] font-black uppercase px-2.5 py-1 rounded-full ${
                    aadhaarStatus === 'VERIFIED' 
                      ? "text-emerald-600 bg-emerald-50 border border-emerald-100" 
                      : aadhaarStatus === 'FAILED'
                      ? "text-rose-600 bg-rose-50 border border-rose-100"
                      : "text-amber-600 bg-amber-50 border border-amber-100"
                  }`}>
                    {aadhaarStatus === 'VERIFIED' ? "Verified" : aadhaarStatus === 'FAILED' ? "Failed" : "Pending"}
                  </span>
                </div>
                <h3 className="text-lg font-bold text-slate-900">Aadhaar Authentication <span className="text-rose-500 text-sm">*</span></h3>
                <p className="text-xs text-slate-500">Verify your Aadhaar for identity proof</p>
              </div>
            </div>
          </div>

          <div className="space-y-4">
            {!otpSent && aadhaarStatus !== 'VERIFIED' && (
              <div className="flex flex-col sm:flex-row gap-4">
                <div className="flex-1">
                  <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest block mb-1.5">
                    Aadhaar Number <span className="text-rose-500">*</span>
                  </label>
                  <input
                    className="w-full px-4 py-2.5 rounded-xl text-sm font-medium text-slate-700 bg-white border border-slate-200 focus:border-[#1CADA3] focus:outline-none focus:ring-2 focus:ring-emerald-100"
                    value={aadhaarNumber}
                    placeholder="Enter 12 digit Aadhaar number"
                    maxLength={12}
                    onChange={(e) => setAadhaarNumber(e.target.value.replace(/\D/g, ''))}
                  />
                </div>
                <div className="flex items-end">
                  <button
                    onClick={handleGenerateAadhaarOtp}
                    disabled={loadingSection === 'aadhaar-otp' || aadhaarNumber.length !== 12}
                    className="px-8 py-2.5 bg-[#1CADA3] hover:bg-[#158f87] text-white text-xs font-bold rounded-xl transition-colors disabled:opacity-50 shadow-sm"
                  >
                    {loadingSection === 'aadhaar-otp' ? "Sending OTP..." : "Send OTP"}
                  </button>
                </div>
              </div>
            )}

            {aadhaarStatus === 'VERIFIED' && (
              <div className="flex items-center gap-4 p-4 bg-emerald-50 rounded-xl border border-emerald-100">
                <CheckCircle2 className="text-emerald-500 w-5 h-5" />
                <div>
                  <p className="text-sm font-bold text-emerald-800">Aadhaar Verified Successfully</p>
                  <p className="text-xs text-emerald-600">Aadhaar: •••• •••• {aadhaarNumber?.slice(-4)}</p>
                </div>
              </div>
            )}

            {otpSent && (
              <div className="space-y-4">
                <div>
                  <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest block mb-1.5">Enter OTP</label>
                  <div className="flex flex-col sm:flex-row gap-3">
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
                      className="flex-1 px-4 py-2.5 rounded-xl text-sm font-medium border border-[#1CADA3] outline-none bg-emerald-50/30 focus:ring-2 focus:ring-emerald-100"
                    />
                    <div className="flex gap-2">
                      <button
                        onClick={handleVerifyAadhaarOtp}
                        disabled={loadingSection === 'aadhaar-verify' || otp.join('').length < 6}
                        className="px-6 py-2.5 bg-emerald-600 text-white text-xs font-bold rounded-xl disabled:opacity-50 shadow-sm hover:bg-emerald-700 transition-colors"
                      >
                        {loadingSection === 'aadhaar-verify' ? "Verifying..." : "Verify OTP"}
                      </button>
                      <button
                        onClick={resetAadhaarOtp}
                        className="px-4 py-2.5 border border-rose-200 text-rose-600 text-xs font-bold rounded-xl hover:bg-rose-50 transition-colors"
                      >
                        Edit
                      </button>
                    </div>
                  </div>
                </div>
                
                {otpExpiry && (
                  <div className="flex items-center gap-2 text-xs font-medium text-slate-600 bg-slate-50 p-3 rounded-xl">
                    <Clock className="w-4 h-4" />
                    <span>OTP expires in {Math.max(0, Math.floor((otpExpiry - Date.now()) / 1000))} seconds</span>
                  </div>
                )}
              </div>
            )}
          </div>
        </div>

        {/* Bank Verification Card - Step 3 - Mandatory */}
        <div className="bg-white rounded-2xl p-6 border border-slate-100 shadow-sm hover:shadow-md transition-shadow">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 bg-emerald-50 rounded-xl flex items-center justify-center relative">
                <Landmark className="w-6 h-6 text-emerald-600" />
                <Asterisk size={14} className="absolute -top-1 -right-1 text-rose-500" />
              </div>
              <div>
                <div className="flex items-center gap-3 mb-1">
                  <span className="px-2.5 py-1 bg-blue-50 text-blue-600 text-[10px] font-black uppercase tracking-widest rounded-md border border-blue-100">
                    Step 3 of 3
                  </span>
                  <span className={`flex items-center gap-1 text-[10px] font-black uppercase px-2.5 py-1 rounded-full ${
                    bankStatus === 'VERIFIED' 
                      ? "text-emerald-600 bg-emerald-50 border border-emerald-100" 
                      : "text-amber-600 bg-amber-50 border border-amber-100"
                  }`}>
                    {bankStatus === 'VERIFIED' ? <CheckCircle2 size={12} /> : <AlertCircle size={12} />} 
                    {bankStatus === 'VERIFIED' ? "Verified" : "Pending"}
                  </span>
                </div>
                <h3 className="text-lg font-bold text-slate-900">Bank Account Verification <span className="text-rose-500 text-sm">*</span></h3>
                <p className="text-xs text-slate-500">Verify your bank account to enable transactions</p>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            <div>
              <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest block mb-1.5">
                Bank Name <span className="text-rose-500">*</span>
              </label>
              <input 
                value={bankDetails.bank_name} 
                onChange={(e) => setBankDetails({...bankDetails, bank_name: e.target.value})} 
                placeholder="Enter Bank Name" 
                className="w-full px-4 py-2.5 rounded-xl text-sm font-medium text-slate-700 bg-white border border-slate-200 focus:border-[#1CADA3] focus:outline-none focus:ring-2 focus:ring-emerald-100" 
                disabled={bankStatus === 'VERIFIED'}
              />
            </div>
            <div>
              <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest block mb-1.5">
                Account Number <span className="text-rose-500">*</span>
              </label>
              <input 
                value={bankDetails.bank_account_number} 
                onChange={(e) => setBankDetails({...bankDetails, bank_account_number: e.target.value.replace(/\D/g, '')})} 
                placeholder="Enter Account Number" 
                className="w-full px-4 py-2.5 rounded-xl text-sm font-medium text-slate-700 bg-white border border-slate-200 focus:border-[#1CADA3] focus:outline-none focus:ring-2 focus:ring-emerald-100" 
                disabled={bankStatus === 'VERIFIED'}
              />
            </div>
            <div>
              <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest block mb-1.5">
                IFSC Code <span className="text-rose-500">*</span>
              </label>
              <div className="relative">
                <input 
                  value={bankDetails.ifsc_code} 
                  onChange={(e) => setBankDetails({...bankDetails, ifsc_code: e.target.value.toUpperCase()})} 
                  placeholder="Enter IFSC Code" 
                  className="w-full px-4 py-2.5 rounded-xl text-sm font-medium tracking-widest text-slate-700 bg-white border border-slate-200 focus:border-[#1CADA3] focus:outline-none focus:ring-2 focus:ring-emerald-100 pr-10" 
                  disabled={bankStatus === 'VERIFIED'}
                />
                {fetchingBankDetails && (
                  <Loader2 className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400 animate-spin" />
                )}
              </div>
            </div>
          </div>

          {/* Bank Verified Status */}
          {bankStatus === 'VERIFIED' && (
            <div className="mt-4 flex items-center gap-3 p-4 bg-emerald-50 rounded-xl border border-emerald-100">
              <CheckCircle2 className="text-emerald-500 w-5 h-5 flex-shrink-0" />
              <span className="text-emerald-700 font-bold text-sm">Bank account verified successfully</span>
            </div>
          )}

          {/* Verify Button */}
          {bankStatus !== 'VERIFIED' && bankDetails.bank_account_number && bankDetails.ifsc_code && (
            <div className="mt-4 flex justify-end">
              <button 
                disabled={loadingSection === 'bank'} 
                onClick={handleVerifyBank} 
                className="px-6 py-2.5 bg-emerald-500 hover:bg-emerald-600 text-white text-xs font-black rounded-xl uppercase flex items-center gap-2 shadow-sm disabled:opacity-70 transition-all"
              >
                {loadingSection === 'bank' ? (
                  <><Loader2 size={14} className="animate-spin" />Verifying…</>
                ) : (
                  <><CheckCircle2 size={14} />Verify Bank Account</>
                )}
              </button>
            </div>
          )}
        </div>

        {/* Demat Account Card - Step 4 - Optional */}
        <div className="bg-white rounded-2xl p-6 border border-slate-100 shadow-sm hover:shadow-md transition-shadow">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 bg-indigo-50 rounded-xl flex items-center justify-center">
                <Database className="w-6 h-6 text-indigo-600" />
              </div>
              <div>
                <div className="flex items-center gap-3 mb-1">
                  <span className="px-2.5 py-1 bg-indigo-50 text-indigo-600 text-[10px] font-black uppercase tracking-widest rounded-md border border-indigo-100">
                    Optional
                  </span>
                  {dematAdded && (
                    <span className="flex items-center gap-1 text-[10px] font-black uppercase px-2.5 py-1 rounded-full text-emerald-600 bg-emerald-50 border border-emerald-100">
                      <CheckCircle2 size={12} />
                      Added
                    </span>
                  )}
                </div>
                <h3 className="text-lg font-bold text-slate-900">Demat Account <span className="text-slate-400 text-sm font-normal">(Optional)</span></h3>
                <p className="text-xs text-slate-500">Link your Demat account for trading</p>
              </div>
            </div>
          </div>

          {dematAdded ? (
            <div className="flex items-center gap-4 p-6 bg-emerald-50 rounded-xl border border-emerald-100">
              <div className="w-12 h-12 bg-emerald-100 rounded-full flex items-center justify-center">
                <CheckCircle2 className="w-6 h-6 text-emerald-600" />
              </div>
              <div>
                <h4 className="text-base font-bold text-emerald-800">Demat Account Added Successfully!</h4>
                <p className="text-sm text-emerald-600">Your demat account has been linked to your profile.</p>
              </div>
            </div>
          ) : (
            <div className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest block mb-1.5">
                    DP ID
                  </label>
                  <input
                    type="text"
                    value={dematDetails.dp_id}
                    onChange={(e) => setDematDetails({...dematDetails, dp_id: e.target.value})}
                    className="w-full px-4 py-2.5 rounded-xl text-sm font-medium text-slate-700 bg-white border border-slate-200 focus:border-[#1CADA3] focus:outline-none focus:ring-2 focus:ring-emerald-100"
                    placeholder="Enter DP ID"
                  />
                </div>
                <div>
                  <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest block mb-1.5">
                    Client ID
                  </label>
                  <input
                    type="text"
                    value={dematDetails.client_id}
                    onChange={(e) => setDematDetails({...dematDetails, client_id: e.target.value})}
                    className="w-full px-4 py-2.5 rounded-xl text-sm font-medium text-slate-700 bg-white border border-slate-200 focus:border-[#1CADA3] focus:outline-none focus:ring-2 focus:ring-emerald-100"
                    placeholder="Enter Client ID"
                  />
                </div>
                <div>
                  <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest block mb-1.5">
                    Depository
                  </label>
                  <select
                    value={dematDetails.depository}
                    onChange={(e) => setDematDetails({...dematDetails, depository: e.target.value})}
                    className="w-full px-4 py-2.5 rounded-xl text-sm font-medium text-slate-700 bg-white border border-slate-200 focus:border-[#1CADA3] focus:outline-none focus:ring-2 focus:ring-emerald-100"
                  >
                    <option value="NSDL">NSDL</option>
                    <option value="CDSL">CDSL</option>
                  </select>
                </div>
                <div>
                  <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest block mb-1.5">
                    Name on Demat
                  </label>
                  <input
                    type="text"
                    value={dematDetails.demat_name}
                    onChange={(e) => setDematDetails({...dematDetails, demat_name: e.target.value.toUpperCase()})}
                    className="w-full px-4 py-2.5 rounded-xl text-sm font-medium text-slate-700 bg-white border border-slate-200 focus:border-[#1CADA3] focus:outline-none focus:ring-2 focus:ring-emerald-100"
                    placeholder="Enter Name as per Demat Account"
                  />
                </div>
              </div>

              <div className="flex items-start gap-3 p-4 bg-blue-50 rounded-xl border border-blue-100">
                <Info className="text-blue-600 w-4 h-4 flex-shrink-0 mt-0.5" />
                <p className="text-xs font-medium text-blue-700">
                  Ensure all details match your official Demat account records exactly as they appear on your statement.
                </p>
              </div>

              <div className="flex justify-end">
                <button
                  onClick={handleAddDemat}
                  disabled={savingDemat}
                  className="px-8 py-3 bg-[#1CADA3] text-white rounded-xl font-bold text-sm hover:bg-[#158f87] transition-all disabled:opacity-50 flex items-center gap-2 shadow-md"
                >
                  {savingDemat ? (
                    <><Loader2 className="animate-spin w-4 h-4" />Saving Demat...</>
                  ) : (
                    <><Save className="w-4 h-4" />Save Demat Account</>
                  )}
                </button>
              </div>
            </div>
          )}
        </div>

        {/* Note */}
        <div className="flex justify-end pt-4">
          <p className="text-xs text-slate-400">
            <span className="text-rose-500">*</span> Mandatory fields • Demat account is optional
          </p>
        </div>
      </div>
    </div>
  );
};