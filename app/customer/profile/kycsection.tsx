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
  Asterisk,
  X
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

interface Toast {
  id: string;
  message: string;
  type: 'success' | 'error' | 'info' | 'warning';
}

interface KYCSectionProps {
  profile?: any;
  onRefresh?: () => Promise<void>;
  externalPanVerified?: boolean;
  externalAadhaarVerified?: boolean;
  externalBankVerified?: boolean;
  externalDematAdded?: boolean;
}

// Toast Component
const Toast = ({ message, type, onClose }: { message: string; type: 'success' | 'error' | 'info' | 'warning'; onClose: () => void }) => {
  useEffect(() => {
    const timer = setTimeout(onClose, 4000);
    return () => clearTimeout(timer);
  }, [onClose]);

  const bgColor = {
    success: 'bg-green-50 border-green-200 text-green-800',
    error: 'bg-red-50 border-red-200 text-red-800',
    warning: 'bg-yellow-50 border-yellow-200 text-yellow-800',
    info: 'bg-blue-50 border-blue-200 text-blue-800'
  }[type];

  const icon = {
    success: <CheckCircle2 className="w-5 h-5 text-green-500" />,
    error: <AlertCircle className="w-5 h-5 text-red-500" />,
    warning: <AlertCircle className="w-5 h-5 text-yellow-500" />,
    info: <Info className="w-5 h-5 text-blue-500" />
  }[type];

  return (
    <div className={`fixed top-20 right-4 z-50 flex items-center gap-3 px-4 py-3 rounded-xl border shadow-lg ${bgColor} animate-in slide-in-from-right-5 max-w-sm cursor-pointer`} onClick={onClose}>
      {icon}
      <p className="text-sm font-medium">{message}</p>
      <button onClick={onClose} className="ml-2 hover:opacity-70">
        <X className="w-4 h-4" />
      </button>
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
  
  // Toast state
  const [toasts, setToasts] = useState<Toast[]>([]);
  
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

  // ========== TOAST FUNCTIONS ==========
  const showToast = (message: string, type: Toast['type'] = 'info') => {
    const id = Math.random().toString(36).substring(2, 9);
    setToasts(prev => [...prev, { id, message, type }]);
    setTimeout(() => {
      setToasts(prev => prev.filter(toast => toast.id !== id));
    }, 4000);
  };

  const removeToast = (id: string) => {
    setToasts(prev => prev.filter(toast => toast.id !== id));
  };

  useEffect(() => {
    if (!profile) {
      setLoading(false);
      return;
    }
    
    if (profile.kycDetails) {
      setKycDetails(profile.kycDetails);
      
      if (profile.kycDetails.aadhaar_number) {
        setAadhaarNumber(profile.kycDetails.aadhaar_number);
      }
      
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
        showToast('OTP expired. Please generate again.', 'warning');
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
          setFetchingBankDetails(false);
        }
      }
    };
    fetchBankFromIFSC();
  }, [bankDetails.ifsc_code]);

  // ========== PAN VERIFICATION ==========
  const handleVerifyPan = async () => {
    if (!panDetails.pan || panDetails.pan.length !== 10) {
      showToast('Please enter a valid 10-digit PAN number', 'error');
      return;
    }

    const panRegex = /^[A-Z]{5}[0-9]{4}[A-Z]{1}$/;
    if (!panRegex.test(panDetails.pan)) {
      showToast('Invalid PAN format. It should be 5 letters, 4 numbers, and 1 letter', 'error');
      return;
    }

    if (!panDetails.name_as_per_pan) {
      showToast('Please enter your name as per PAN card', 'error');
      return;
    }

    if (!panDetails.date_of_birth) {
      showToast('Please enter your date of birth', 'error');
      return;
    }
    
    const dobRegex = /^\d{2}\/\d{2}\/\d{4}$/;
    if (!dobRegex.test(panDetails.date_of_birth)) {
      showToast('Date must be in DD/MM/YYYY format', 'error');
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
    
      showToast(response.message || 'PAN verified successfully!', 'success');
    } catch (error: any) {
      setPanStatus('FAILED');
      showToast(error.response?.data?.message || 'PAN verification failed', 'error');
    } finally {
      setLoadingSection(null);
    }
  };

  // ========== AADHAAR OTP GENERATION ==========
  const handleGenerateAadhaarOtp = async () => {
    if (!aadhaarNumber || aadhaarNumber.length !== 12) {
      showToast('Please enter a valid 12-digit Aadhaar number', 'error');
      return;
    }

    setLoadingSection('aadhaar-otp');
    try {
      const response = await customerService.generateAadhaarOtp(aadhaarNumber);
      if (response.reference_id || response["Reference ID"]) {
        setReferenceId(response.reference_id || response["Reference ID"]);
      }
      setOtpSent(true);
      setOtpExpiry(Date.now() + 180000);
      showToast('OTP sent to your registered mobile number', 'success');
    } catch (error: any) {
      setAadhaarStatus('FAILED');
      showToast(error.response?.data?.message || 'Failed to generate OTP', 'error');
    } finally {
      setLoadingSection(null);
    }
  };

  // ========== AADHAAR OTP VERIFICATION ==========
  const handleVerifyAadhaarOtp = async () => {
    const otpString = otp.join('');
    if (otpString.length !== 6) {
      showToast('Please enter a valid 6-digit OTP', 'error');
      return;
    }

    if (!referenceId) {
      showToast('Reference ID not found. Please generate OTP again.', 'error');
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
      
      if (onRefresh) await onRefresh();
      
      showToast('Aadhaar verified successfully', 'success');
    } catch (error: any) {
      setAadhaarStatus('FAILED');
      showToast(error.response?.data?.message || 'OTP verification failed', 'error');
    } finally {
      setLoadingSection(null);
    }
  };

  // ========== BANK VERIFICATION ==========
  const handleVerifyBank = async () => {
    if (!bankDetails.bank_name || !bankDetails.bank_account_number || !bankDetails.ifsc_code) {
      showToast('Please fill all bank details', 'error');
      return;
    }

    if (bankDetails.bank_account_number.length < 9 || bankDetails.bank_account_number.length > 18) {
      showToast('Account number should be between 9 and 18 digits', 'error');
      return;
    }

    if (bankDetails.ifsc_code.length !== 11) {
      showToast('IFSC code should be 11 characters', 'error');
      return;
    }

    setLoadingSection('bank');
    try {
      const response = await customerService.verifyBankPennyDrop(bankDetails);
      
      setBankStatus('VERIFIED');
      
      if (onRefresh) await onRefresh();
      
      showToast(response.message, 'success');
      if (response.data?.utr) {
        showToast(`₹${response.data.amount_deposited} deposited. UTR: ${response.data.utr}`, 'info');
      }
    } catch (error: any) {
      setBankStatus('FAILED');
      showToast(error.response?.data?.message || 'Bank verification failed', 'error');
    } finally {
      setLoadingSection(null);
    }
  };

  // ========== ADD DEMAT ==========
  const handleAddDemat = async () => {
    if (!dematDetails.dp_id || !dematDetails.client_id || !dematDetails.demat_name) {
      showToast('Please fill all required fields (DP ID, Client ID, and Name on Demat)', 'error');
      return;
    }

    if (!dematDetails.dp_id.match(/^[A-Z0-9]{6,}$/)) {
      showToast('Invalid DP ID format', 'error');
      return;
    }

    if (!dematDetails.client_id.match(/^[0-9]{8,}$/)) {
      showToast('Client ID should be at least 8 digits', 'error');
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
        if (onRefresh) await onRefresh();
        showToast('Demat account added successfully!', 'success');
      }
    } catch (error) {
      showToast('Failed to add demat account', 'error');
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
    return count;
  };

  const mandatoryStepsCompleted = getKYCCompletedSteps();
  const mandatoryProgressPercentage = (mandatoryStepsCompleted / 3) * 100;
  const allMandatoryCompleted = mandatoryStepsCompleted === 3;

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
      <div className="mt-8 sm:mt-12 flex justify-center items-center h-48 sm:h-64">
        <div className="w-8 h-8 sm:w-10 sm:h-10 border-4 border-[#1CADA3] border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  return (
    <div className="mt-6 sm:mt-12 px-4 sm:px-0">
      {/* Toast Container */}
      <div className="fixed top-20 right-4 z-[9999] flex flex-col gap-3">
        {toasts.map((toast) => (
          <Toast
            key={toast.id}
            message={toast.message}
            type={toast.type}
            onClose={() => removeToast(toast.id)}
          />
        ))}
      </div>

      {/* KYC Header */}
      <header className="mb-4 sm:mb-8">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 sm:gap-4">
          <div className="flex items-center gap-2 sm:gap-3">
            <div>
              <h1 className="text-lg sm:text-2xl font-bold text-slate-800">KYC & Demat Verification</h1>
            </div>
          </div>
          
          <div className="flex items-center gap-2 sm:gap-3 self-start sm:self-auto">
            <span className={`px-2 sm:px-3 py-1 sm:py-1.5 rounded-lg text-[9px] sm:text-xs font-black uppercase tracking-widest whitespace-nowrap ${
              allMandatoryCompleted 
                ? "bg-emerald-50 text-emerald-600 border border-emerald-200" 
                : "bg-amber-50 text-amber-600 border border-amber-200"
            }`}>
              {allMandatoryCompleted ? "✓ KYC Completed" : `${mandatoryStepsCompleted}/3 Mandatory Steps`}
            </span>
            {dematAdded && (
              <span className="px-2 sm:px-3 py-1 sm:py-1.5 bg-indigo-50 text-indigo-600 border border-indigo-200 rounded-lg text-[9px] sm:text-xs font-black uppercase tracking-widest">
                Demat Added
              </span>
            )}
          </div>
        </div>
      </header>

      {/* KYC Progress Bar */}
      <div className="mb-4 sm:mb-8 bg-white rounded-xl p-3 sm:p-5 border border-slate-100 shadow-sm">
        <div className="flex justify-between items-center mb-2">
          <span className="text-[9px] sm:text-xs font-black text-slate-400 uppercase tracking-widest flex items-center gap-1">
            <Asterisk size={8} className="sm:w-3 sm:h-3 text-rose-500" />
            Mandatory KYC Progress
          </span>
          <span className="text-xs sm:text-sm font-bold text-[#1CADA3]">{mandatoryStepsCompleted}/3 Steps</span>
        </div>
        <div className="h-1.5 sm:h-2 bg-slate-100 rounded-full overflow-hidden">
          <motion.div 
            initial={{ width: 0 }}
            animate={{ width: `${mandatoryProgressPercentage}%` }}
            className="h-full bg-gradient-to-r from-[#2076C7] to-[#1CADA3] rounded-full"
          />
        </div>
      </div>
  
      <div className="w-full max-w-7xl mx-auto px-0 py-4 sm:py-6 space-y-4 sm:space-y-6">
        {/* PAN Verification Card */}
        <div className="bg-white rounded-xl sm:rounded-2xl p-4 sm:p-6 border border-slate-100 shadow-sm hover:shadow-md transition-shadow">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 sm:gap-4 mb-4 sm:mb-6">
            <div className="flex items-center gap-3 sm:gap-4">
              <div className="w-10 h-10 sm:w-12 sm:h-12 bg-blue-50 rounded-xl flex items-center justify-center relative shrink-0">
                <CreditCard className="w-5 h-5 sm:w-6 sm:h-6 text-blue-600" />
                <Asterisk size={10} className="sm:w-3.5 sm:h-3.5 absolute -top-1 -right-1 text-rose-500" />
              </div>
              <div className="min-w-0">
                <div className="flex items-center gap-2 sm:gap-3 mb-1 flex-wrap">
                  <span className="px-1.5 sm:px-2.5 py-0.5 sm:py-1 bg-blue-50 text-blue-600 text-[8px] sm:text-[10px] font-black uppercase tracking-widest rounded-md border border-blue-100">
                    Step 1 of 3
                  </span>
                  <span className={`text-[8px] sm:text-[10px] font-black uppercase px-1.5 sm:px-2.5 py-0.5 sm:py-1 rounded-full ${
                    panStatus === 'VERIFIED' 
                      ? "text-emerald-600 bg-emerald-50 border border-emerald-100" 
                      : panStatus === 'FAILED'
                      ? "text-rose-600 bg-rose-50 border border-rose-100"
                      : "text-amber-600 bg-amber-50 border border-amber-100"
                  }`}>
                    {panStatus === 'VERIFIED' ? "Verified" : panStatus === 'FAILED' ? "Failed" : "Pending"}
                  </span>
                </div>
                <h3 className="text-base sm:text-lg font-bold text-slate-900 truncate">PAN Card Verification <span className="text-rose-500 text-xs sm:text-sm">*</span></h3>
                <p className="text-[10px] sm:text-xs text-slate-500 truncate">Verify your PAN card for tax compliance</p>
              </div>
            </div>
          </div>

          <div className="space-y-3 sm:space-y-4">
            {panStatus !== 'VERIFIED' && (
              <div className="grid grid-cols-1 md:grid-cols-3 gap-3 sm:gap-4">
                <div>
                  <label className="text-[8px] sm:text-[10px] font-black text-slate-400 uppercase tracking-widest block mb-1 sm:mb-1.5">
                    PAN Number <span className="text-rose-500">*</span>
                  </label>
                  <input
                    className="w-full px-3 sm:px-4 py-2 sm:py-2.5 rounded-lg sm:rounded-xl text-xs sm:text-sm font-medium text-slate-700 bg-white border border-slate-200 focus:border-[#1CADA3] focus:outline-none focus:ring-2 focus:ring-emerald-100 uppercase"
                    value={panDetails.pan}
                    placeholder="ABCDE1234F"
                    maxLength={10}
                    onChange={(e) => setPanDetails({...panDetails, pan: e.target.value.toUpperCase()})}
                  />
                </div>

                <div>
                  <label className="text-[8px] sm:text-[10px] font-black text-slate-400 uppercase tracking-widest block mb-1 sm:mb-1.5">
                    Full Name as per PAN <span className="text-rose-500">*</span>
                  </label>
                  <input
                    className="w-full px-3 sm:px-4 py-2 sm:py-2.5 rounded-lg sm:rounded-xl text-xs sm:text-sm font-medium text-slate-700 bg-white border border-slate-200 focus:border-[#1CADA3] focus:outline-none focus:ring-2 focus:ring-emerald-100"
                    value={panDetails.name_as_per_pan}
                    onChange={(e) => setPanDetails({...panDetails, name_as_per_pan: e.target.value})}
                  />
                </div>

                <div>
                  <label className="text-[8px] sm:text-[10px] font-black text-slate-400 uppercase tracking-widest block mb-1 sm:mb-1.5">
                    Date of Birth <span className="text-rose-500">*</span>
                  </label>
                  <div className="flex gap-2">
                    <input
                      type="text"
                      placeholder="DD/MM/YYYY"
                      className="w-full px-3 sm:px-4 py-2 sm:py-2.5 rounded-lg sm:rounded-xl text-xs sm:text-sm font-medium text-slate-700 bg-white border border-slate-200 focus:border-[#1CADA3] focus:outline-none focus:ring-2 focus:ring-emerald-100"
                      value={panDetails.date_of_birth}
                      onChange={(e) =>
                        setPanDetails({...panDetails, date_of_birth: e.target.value})
                      }
                    />
                    <button
                      onClick={handleVerifyPan}
                      disabled={loadingSection === 'pan'}
                      className="px-4 sm:px-6 py-2 sm:py-2.5 bg-[#1CADA3] text-white text-xs font-bold rounded-lg sm:rounded-xl hover:bg-[#158f87] transition-colors disabled:opacity-50"
                    >
                      {loadingSection === 'pan' ? "Verifying..." : "Verify PAN"}
                    </button>
                  </div>
                </div>
              </div>
            )}

            {panStatus === 'VERIFIED' && (
              <div className="flex items-center gap-2 sm:gap-4 p-3 sm:p-4 bg-emerald-50 rounded-lg sm:rounded-xl border border-emerald-100">
                <CheckCircle2 className="text-emerald-500 w-4 h-4 sm:w-5 sm:h-5 shrink-0" />
                <div>
                  <p className="text-xs sm:text-sm font-bold text-emerald-800">PAN Verified Successfully</p>
                  <p className="text-[10px] sm:text-xs text-emerald-600">PAN: ••••••{panDetails.pan?.slice(-4)}</p>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Aadhaar Verification Card */}
        <div className="bg-white rounded-xl sm:rounded-2xl p-4 sm:p-6 border border-slate-100 shadow-sm hover:shadow-md transition-shadow">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 sm:gap-4 mb-4 sm:mb-6">
            <div className="flex items-center gap-3 sm:gap-4">
              <div className="w-10 h-10 sm:w-12 sm:h-12 bg-purple-50 rounded-xl flex items-center justify-center relative shrink-0">
                <Fingerprint className="w-5 h-5 sm:w-6 sm:h-6 text-purple-600" />
                <Asterisk size={10} className="sm:w-3.5 sm:h-3.5 absolute -top-1 -right-1 text-rose-500" />
              </div>
              <div className="min-w-0">
                <div className="flex items-center gap-2 sm:gap-3 mb-1 flex-wrap">
                  <span className="px-1.5 sm:px-2.5 py-0.5 sm:py-1 bg-blue-50 text-blue-600 text-[8px] sm:text-[10px] font-black uppercase tracking-widest rounded-md border border-blue-100">
                    Step 2 of 3
                  </span>
                  <span className={`text-[8px] sm:text-[10px] font-black uppercase px-1.5 sm:px-2.5 py-0.5 sm:py-1 rounded-full ${
                    aadhaarStatus === 'VERIFIED' 
                      ? "text-emerald-600 bg-emerald-50 border border-emerald-100" 
                      : aadhaarStatus === 'FAILED'
                      ? "text-rose-600 bg-rose-50 border border-rose-100"
                      : "text-amber-600 bg-amber-50 border border-amber-100"
                  }`}>
                    {aadhaarStatus === 'VERIFIED' ? "Verified" : aadhaarStatus === 'FAILED' ? "Failed" : "Pending"}
                  </span>
                </div>
                <h3 className="text-base sm:text-lg font-bold text-slate-900 truncate">Aadhaar Authentication <span className="text-rose-500 text-xs sm:text-sm">*</span></h3>
                <p className="text-[10px] sm:text-xs text-slate-500 truncate">Verify your Aadhaar for identity proof</p>
              </div>
            </div>
          </div>

          <div className="space-y-3 sm:space-y-4">
            {!otpSent && aadhaarStatus !== 'VERIFIED' && (
              <div className="flex flex-col sm:flex-row gap-3 sm:gap-4">
                <div className="flex-1">
                  <label className="text-[8px] sm:text-[10px] font-black text-slate-400 uppercase tracking-widest block mb-1 sm:mb-1.5">
                    Aadhaar Number <span className="text-rose-500">*</span>
                  </label>
                  <input
                    className="w-full px-3 sm:px-4 py-2 sm:py-2.5 rounded-lg sm:rounded-xl text-xs sm:text-sm font-medium text-slate-700 bg-white border border-slate-200 focus:border-[#1CADA3] focus:outline-none focus:ring-2 focus:ring-emerald-100"
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
                    className="w-full sm:w-auto px-6 sm:px-8 py-2 sm:py-2.5 bg-[#1CADA3] hover:bg-[#158f87] text-white text-[10px] sm:text-xs font-bold rounded-lg sm:rounded-xl transition-colors disabled:opacity-50 shadow-sm"
                  >
                    {loadingSection === 'aadhaar-otp' ? "Sending OTP..." : "Send OTP"}
                  </button>
                </div>
              </div>
            )}

            {aadhaarStatus === 'VERIFIED' && (
              <div className="flex items-center gap-2 sm:gap-4 p-3 sm:p-4 bg-emerald-50 rounded-lg sm:rounded-xl border border-emerald-100">
                <CheckCircle2 className="text-emerald-500 w-4 h-4 sm:w-5 sm:h-5 shrink-0" />
                <div className="min-w-0">
                  <p className="text-xs sm:text-sm font-bold text-emerald-800 truncate">Aadhaar Verified Successfully</p>
                  <p className="text-[10px] sm:text-xs text-emerald-600 truncate">Aadhaar: •••• •••• {aadhaarNumber?.slice(-4)}</p>
                </div>
              </div>
            )}

            {otpSent && (
              <div className="space-y-3 sm:space-y-4">
                <div>
                  <label className="text-[8px] sm:text-[10px] font-black text-slate-400 uppercase tracking-widest block mb-1 sm:mb-1.5">Enter OTP</label>
                  <div className="flex flex-col sm:flex-row gap-2 sm:gap-3">
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
                      className="w-full sm:flex-1 px-3 sm:px-4 py-2 sm:py-2.5 rounded-lg sm:rounded-xl text-xs sm:text-sm font-medium border border-[#1CADA3] outline-none bg-emerald-50/30 focus:ring-2 focus:ring-emerald-100"
                    />
                    <div className="flex gap-2">
                      <button
                        onClick={handleVerifyAadhaarOtp}
                        disabled={loadingSection === 'aadhaar-verify' || otp.join('').length < 6}
                        className="flex-1 sm:flex-none px-4 sm:px-6 py-2 sm:py-2.5 bg-emerald-600 text-white text-[10px] sm:text-xs font-bold rounded-lg sm:rounded-xl disabled:opacity-50 shadow-sm hover:bg-emerald-700 transition-colors"
                      >
                        {loadingSection === 'aadhaar-verify' ? "Verifying..." : "Verify OTP"}
                      </button>
                      <button
                        onClick={resetAadhaarOtp}
                        className="px-3 sm:px-4 py-2 sm:py-2.5 border border-rose-200 text-rose-600 text-[10px] sm:text-xs font-bold rounded-lg sm:rounded-xl hover:bg-rose-50 transition-colors"
                      >
                        Edit
                      </button>
                    </div>
                  </div>
                </div>
                
                {otpExpiry && (
                  <div className="flex items-center gap-1.5 sm:gap-2 text-[10px] sm:text-xs font-medium text-slate-600 bg-slate-50 p-2 sm:p-3 rounded-lg sm:rounded-xl">
                    <Clock className="w-3 h-3 sm:w-4 sm:h-4 shrink-0" />
                    <span>OTP expires in {Math.max(0, Math.floor((otpExpiry - Date.now()) / 1000))} seconds</span>
                  </div>
                )}
              </div>
            )}
          </div>
        </div>

        {/* Bank Verification Card */}
        <div className="bg-white rounded-xl sm:rounded-2xl p-4 sm:p-6 border border-slate-100 shadow-sm hover:shadow-md transition-shadow">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 sm:gap-4 mb-4 sm:mb-6">
            <div className="flex items-center gap-3 sm:gap-4">
              <div className="w-10 h-10 sm:w-12 sm:h-12 bg-emerald-50 rounded-xl flex items-center justify-center relative shrink-0">
                <Landmark className="w-5 h-5 sm:w-6 sm:h-6 text-emerald-600" />
                <Asterisk size={10} className="sm:w-3.5 sm:h-3.5 absolute -top-1 -right-1 text-rose-500" />
              </div>
              <div className="min-w-0">
                <div className="flex items-center gap-2 sm:gap-3 mb-1 flex-wrap">
                  <span className="px-1.5 sm:px-2.5 py-0.5 sm:py-1 bg-blue-50 text-blue-600 text-[8px] sm:text-[10px] font-black uppercase tracking-widest rounded-md border border-blue-100">
                    Step 3 of 3
                  </span>
                  <span className={`flex items-center gap-1 text-[8px] sm:text-[10px] font-black uppercase px-1.5 sm:px-2.5 py-0.5 sm:py-1 rounded-full ${
                    bankStatus === 'VERIFIED' 
                      ? "text-emerald-600 bg-emerald-50 border border-emerald-100" 
                      : "text-amber-600 bg-amber-50 border border-amber-100"
                  }`}>
                    {bankStatus === 'VERIFIED' ? <CheckCircle2 size={8} className="sm:w-3 sm:h-3" /> : <AlertCircle size={8} className="sm:w-3 sm:h-3" />} 
                    {bankStatus === 'VERIFIED' ? "Verified" : "Pending"}
                  </span>
                </div>
                <h3 className="text-base sm:text-lg font-bold text-slate-900 truncate">Bank Account Verification <span className="text-rose-500 text-xs sm:text-sm">*</span></h3>
                <p className="text-[10px] sm:text-xs text-slate-500 truncate">Verify your bank account to enable transactions</p>
              </div>
            </div>
          </div>

          {bankStatus !== 'VERIFIED' && (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-4">
              <div>
                <label className="text-[8px] sm:text-[10px] font-black text-slate-400 uppercase tracking-widest block mb-1 sm:mb-1.5">
                  Bank Name <span className="text-rose-500">*</span>
                </label>
                <input 
                  value={bankDetails.bank_name} 
                  onChange={(e) => setBankDetails({...bankDetails, bank_name: e.target.value})} 
                  placeholder="Enter Bank Name" 
                  className="w-full px-3 sm:px-4 py-2 sm:py-2.5 rounded-lg sm:rounded-xl text-xs sm:text-sm font-medium text-slate-700 bg-white border border-slate-200 focus:border-[#1CADA3] focus:outline-none focus:ring-2 focus:ring-emerald-100" 
                />
              </div>
              <div>
                <label className="text-[8px] sm:text-[10px] font-black text-slate-400 uppercase tracking-widest block mb-1 sm:mb-1.5">
                  Account Number <span className="text-rose-500">*</span>
                </label>
                <input 
                  value={bankDetails.bank_account_number} 
                  onChange={(e) => setBankDetails({...bankDetails, bank_account_number: e.target.value.replace(/\D/g, '')})} 
                  placeholder="Enter Account Number" 
                  className="w-full px-3 sm:px-4 py-2 sm:py-2.5 rounded-lg sm:rounded-xl text-xs sm:text-sm font-medium text-slate-700 bg-white border border-slate-200 focus:border-[#1CADA3] focus:outline-none focus:ring-2 focus:ring-emerald-100" 
                />
              </div>
              <div>
                <label className="text-[8px] sm:text-[10px] font-black text-slate-400 uppercase tracking-widest block mb-1 sm:mb-1.5">
                  IFSC Code <span className="text-rose-500">*</span>
                </label>
                <div className="relative">
                  <input 
                    value={bankDetails.ifsc_code} 
                    onChange={(e) => setBankDetails({...bankDetails, ifsc_code: e.target.value.toUpperCase()})} 
                    placeholder="Enter IFSC Code" 
                    className="w-full px-3 sm:px-4 py-2 sm:py-2.5 rounded-lg sm:rounded-xl text-xs sm:text-sm font-medium tracking-widest text-slate-700 bg-white border border-slate-200 focus:border-[#1CADA3] focus:outline-none focus:ring-2 focus:ring-emerald-100 pr-8 sm:pr-10" 
                  />
                  {fetchingBankDetails && (
                    <Loader2 className="absolute right-2 sm:right-3 top-1/2 -translate-y-1/2 w-3 h-3 sm:w-4 sm:h-4 text-slate-400 animate-spin" />
                  )}
                </div>
              </div>
            </div>
          )}

          {bankStatus === 'VERIFIED' && (
            <div className="flex items-center gap-2 sm:gap-4 p-3 sm:p-4 bg-emerald-50 rounded-lg sm:rounded-xl border border-emerald-100">
              <CheckCircle2 className="text-emerald-500 w-4 h-4 sm:w-5 sm:h-5 shrink-0" />
              <div>
                <p className="text-xs sm:text-sm font-bold text-emerald-800">Bank Account Verified Successfully</p>
                <p className="text-[10px] sm:text-xs text-emerald-600">
                  {bankDetails.bank_name && `Bank: ${bankDetails.bank_name} | `}
                  A/C: ••••••{bankDetails.bank_account_number?.slice(-4)} | IFSC: •••••••{bankDetails.ifsc_code?.slice(-4)}
                </p>
              </div>
            </div>
          )}

          {bankStatus !== 'VERIFIED' && bankDetails.bank_account_number && bankDetails.ifsc_code && (
            <div className="mt-3 sm:mt-4 flex justify-end">
              <button 
                disabled={loadingSection === 'bank'} 
                onClick={handleVerifyBank} 
                className="w-full sm:w-auto px-4 sm:px-6 py-2 sm:py-2.5 bg-emerald-500 hover:bg-emerald-600 text-white text-[10px] sm:text-xs font-black rounded-lg sm:rounded-xl uppercase flex items-center justify-center gap-1.5 sm:gap-2 shadow-sm disabled:opacity-70 transition-all"
              >
                {loadingSection === 'bank' ? (
                  <><Loader2 size={10} className="sm:w-3.5 sm:h-3.5 animate-spin" />Verifying…</>
                ) : (
                  <><CheckCircle2 size={10} className="sm:w-3.5 sm:h-3.5" />Verify Bank Account</>
                )}
              </button>
            </div>
          )}
        </div>

        {/* Demat Account Card - Optional */}
        <div className="bg-white rounded-xl sm:rounded-2xl p-4 sm:p-6 border border-slate-100 shadow-sm hover:shadow-md transition-shadow">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 sm:gap-4 mb-4 sm:mb-6">
            <div className="flex items-center gap-3 sm:gap-4">
              <div className="w-10 h-10 sm:w-12 sm:h-12 bg-indigo-50 rounded-xl flex items-center justify-center shrink-0">
                <Database className="w-5 h-5 sm:w-6 sm:h-6 text-indigo-600" />
              </div>
              <div className="min-w-0">
                <div className="flex items-center gap-2 sm:gap-3 mb-1 flex-wrap">
                  <span className="px-1.5 sm:px-2.5 py-0.5 sm:py-1 bg-indigo-50 text-indigo-600 text-[8px] sm:text-[10px] font-black uppercase tracking-widest rounded-md border border-indigo-100">
                    Optional
                  </span>
                  {dematAdded && (
                    <span className="flex items-center gap-1 text-[8px] sm:text-[10px] font-black uppercase px-1.5 sm:px-2.5 py-0.5 sm:py-1 rounded-full text-emerald-600 bg-emerald-50 border border-emerald-100">
                      <CheckCircle2 size={8} className="sm:w-3 sm:h-3" />
                      Added
                    </span>
                  )}
                </div>
                <h3 className="text-base sm:text-lg font-bold text-slate-900 truncate">Demat Account <span className="text-slate-400 text-xs sm:text-sm font-normal">(Optional)</span></h3>
                <p className="text-[10px] sm:text-xs text-slate-500 truncate">Link your Demat account for trading</p>
              </div>
            </div>
          </div>

          {dematAdded ? (
            <div className="flex items-center gap-3 sm:gap-4 p-4 sm:p-6 bg-emerald-50 rounded-lg sm:rounded-xl border border-emerald-100">
              <div className="w-8 h-8 sm:w-12 sm:h-12 bg-emerald-100 rounded-full flex items-center justify-center shrink-0">
                <CheckCircle2 className="w-4 h-4 sm:w-6 sm:h-6 text-emerald-600" />
              </div>
              <div className="min-w-0">
                <h4 className="text-sm sm:text-base font-bold text-emerald-800 truncate">Demat Account Added Successfully!</h4>
                <p className="text-xs sm:text-sm text-emerald-600 truncate">Your demat account has been linked to your profile.</p>
              </div>
            </div>
          ) : (
            <div className="space-y-4 sm:space-y-6">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
                <div>
                  <label className="text-[8px] sm:text-[10px] font-black text-slate-400 uppercase tracking-widest block mb-1 sm:mb-1.5">
                    DP ID
                  </label>
                  <input
                    type="text"
                    value={dematDetails.dp_id}
                    onChange={(e) => setDematDetails({...dematDetails, dp_id: e.target.value})}
                    className="w-full px-3 sm:px-4 py-2 sm:py-2.5 rounded-lg sm:rounded-xl text-xs sm:text-sm font-medium text-slate-700 bg-white border border-slate-200 focus:border-[#1CADA3] focus:outline-none focus:ring-2 focus:ring-emerald-100"
                    placeholder="Enter DP ID"
                  />
                </div>
                <div>
                  <label className="text-[8px] sm:text-[10px] font-black text-slate-400 uppercase tracking-widest block mb-1 sm:mb-1.5">
                    Client ID
                  </label>
                  <input
                    type="text"
                    value={dematDetails.client_id}
                    onChange={(e) => setDematDetails({...dematDetails, client_id: e.target.value})}
                    className="w-full px-3 sm:px-4 py-2 sm:py-2.5 rounded-lg sm:rounded-xl text-xs sm:text-sm font-medium text-slate-700 bg-white border border-slate-200 focus:border-[#1CADA3] focus:outline-none focus:ring-2 focus:ring-emerald-100"
                    placeholder="Enter Client ID"
                  />
                </div>
                <div>
                  <label className="text-[8px] sm:text-[10px] font-black text-slate-400 uppercase tracking-widest block mb-1 sm:mb-1.5">
                    Depository
                  </label>
                  <select
                    value={dematDetails.depository}
                    onChange={(e) => setDematDetails({...dematDetails, depository: e.target.value})}
                    className="w-full px-3 sm:px-4 py-2 sm:py-2.5 rounded-lg sm:rounded-xl text-xs sm:text-sm font-medium text-slate-700 bg-white border border-slate-200 focus:border-[#1CADA3] focus:outline-none focus:ring-2 focus:ring-emerald-100"
                  >
                    <option value="NSDL">NSDL</option>
                    <option value="CDSL">CDSL</option>
                  </select>
                </div>
                <div>
                  <label className="text-[8px] sm:text-[10px] font-black text-slate-400 uppercase tracking-widest block mb-1 sm:mb-1.5">
                    Name on Demat
                  </label>
                  <input
                    type="text"
                    value={dematDetails.demat_name}
                    onChange={(e) => setDematDetails({...dematDetails, demat_name: e.target.value.toUpperCase()})}
                    className="w-full px-3 sm:px-4 py-2 sm:py-2.5 rounded-lg sm:rounded-xl text-xs sm:text-sm font-medium text-slate-700 bg-white border border-slate-200 focus:border-[#1CADA3] focus:outline-none focus:ring-2 focus:ring-emerald-100"
                    placeholder="Enter Name as per Demat Account"
                  />
                </div>
              </div>

              <div className="flex items-start gap-2 sm:gap-3 p-3 sm:p-4 bg-blue-50 rounded-lg sm:rounded-xl border border-blue-100">
                <Info className="text-blue-600 w-3 h-3 sm:w-4 sm:h-4 flex-shrink-0 mt-0.5" />
                <p className="text-[10px] sm:text-xs font-medium text-blue-700">
                  Ensure all details match your official Demat account records exactly as they appear on your statement.
                </p>
              </div>

              <div className="flex justify-end">
                <button
                  onClick={handleAddDemat}
                  disabled={savingDemat}
                  className="w-full sm:w-auto px-6 sm:px-8 py-2.5 sm:py-3 bg-[#1CADA3] text-white rounded-lg sm:rounded-xl font-bold text-xs sm:text-sm hover:bg-[#158f87] transition-all disabled:opacity-50 flex items-center justify-center gap-1.5 sm:gap-2 shadow-md"
                >
                  {savingDemat ? (
                    <><Loader2 className="animate-spin w-3 h-3 sm:w-4 sm:h-4" />Saving Demat...</>
                  ) : (
                    <><Save className="w-3 h-3 sm:w-4 sm:h-4" />Save Demat Account</>
                  )}
                </button>
              </div>
            </div>
          )}
        </div>

        <div className="flex justify-end pt-2 sm:pt-4">
          <p className="text-[8px] sm:text-xs text-slate-400">
            <span className="text-rose-500">*</span> Mandatory fields • Demat account is optional
          </p>
        </div>
      </div>
    </div>
  );
};