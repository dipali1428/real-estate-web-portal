'use client';

import React, { useState, useEffect } from 'react';
import { CreditCard, Landmark, CheckCircle2, AlertCircle, Fingerprint, Loader2, ShieldCheck, Lock, Save, Database, Info } from 'lucide-react';
import customerService from '../../services/customerService';
import toast from 'react-hot-toast';

// Masking functions (same as original code)
const maskPAN = (pan: string) => (pan && pan.length >= 10) ? pan.slice(0, 2) + "••••••" + pan.slice(-2) : pan;
const maskAadhaar = (num: string) => (num && num.length >= 12) ? "•••• •••• " + num.slice(-4) : num;
const maskAccount = (num: string) => num ? "•".repeat(Math.max(0, num.length - 4)) + num.slice(-4) : "";
const maskIFSC = (ifsc: string) => ifsc ? ifsc.slice(0, 4) + "••••" + ifsc.slice(-3) : "";

// Helper function to format date of birth from YYYY-MM-DD to DD/MM/YYYY for display
const formatDOBForDisplay = (dateStr: string) => {
  if (!dateStr) return '';
  // If already in DD/MM/YYYY format
  if (dateStr.includes('/')) return dateStr;
  // If in YYYY-MM-DD format
  if (dateStr.includes('-')) {
    const [year, month, day] = dateStr.split('-');
    return `${day}/${month}/${year}`;
  }
  return dateStr;
};

// Helper function to format date of birth for input (DD/MM/YYYY)
const formatDOBInput = (value: string) => {
  let formatted = value.replace(/\D/g, '');
  if (formatted.length >= 3 && formatted.length <= 4) {
    formatted = `${formatted.slice(0, 2)}/${formatted.slice(2)}`;
  } else if (formatted.length > 4) {
    formatted = `${formatted.slice(0, 2)}/${formatted.slice(2, 4)}/${formatted.slice(4, 8)}`;
  }
  return formatted;
};

// Helper function to convert DD/MM/YYYY to YYYY-MM-DD for API
const convertDOBForAPI = (dobStr: string) => {
  if (!dobStr) return '';
  if (dobStr.includes('/')) {
    const [day, month, year] = dobStr.split('/');
    return `${year}-${month}-${day}`;
  }
  return dobStr;
};

export const KYCSection = ({ profile, onRefresh, isStep1Complete, isStep2Complete, isStep3Complete, onAddressUpdate }: any) => {
  const [loadingSec, setLoadingSec] = useState<string | null>(null);
  
  // PAN Details State
  const [panDetails, setPanDetails] = useState({ 
    pan: '', 
    name_as_per_pan: '', 
    date_of_birth: '' 
  });
  
  // Aadhaar Details State
  const [aadhaarNum, setAadhaarNum] = useState('');
  const [otpSent, setOtpSent] = useState(false);
  const [refId, setRefId] = useState('');
  const [aadhaarOtp, setAadhaarOtp] = useState('');
  
  // Bank Details State
  const [bankDetails, setBankDetails] = useState({ 
    bank_name: '', 
    bank_account_number: '', 
    ifsc_code: '' 
  });
  
  // PAN-Aadhaar Link State
  const [panAadhaarLinked, setPanAadhaarLinked] = useState<boolean | null>(null);
  
  // Demat Account State
  const [dematDetails, setDematDetails] = useState({
    dp_id: '',
    client_id: '',
    depository: 'NSDL',
    demat_name: ''
  });
  const [savingDemat, setSavingDemat] = useState(false);
  const [dematAdded, setDematAdded] = useState(false);

  // Initialize form data from profile
  useEffect(() => {
    if (profile?.kycDetails) {
      setDematAdded(!!profile.demat_added || !!profile.kycDetails?.demat_added);
      if (profile.kycDetails?.demat_details) {
        setDematDetails(profile.kycDetails.demat_details);
      }
      
      // Initialize PAN details with proper DOB formatting
      let initialDOB = profile.date_of_birth || '';
      
      // If there's Aadhaar KYC data with DOB, use that as priority
      if (profile.kycDetails?.aadhaar_kyc_data?.date_of_birth) {
        const aadhaarDob = profile.kycDetails.aadhaar_kyc_data.date_of_birth; // Format: "13-11-2001"
        if (aadhaarDob && aadhaarDob.includes('-')) {
          const [day, month, year] = aadhaarDob.split('-');
          initialDOB = `${day}/${month}/${year}`; // Convert to DD/MM/YYYY for display
        }
      } else if (initialDOB && initialDOB.includes('-')) {
        // Convert YYYY-MM-DD to DD/MM/YYYY for display
        const [year, month, day] = initialDOB.split('-');
        initialDOB = `${day}/${month}/${year}`;
      }
      
      setPanDetails({ 
        pan: profile.pan || '', 
        name_as_per_pan: profile.name_as_per_pan || profile.name || '', 
        date_of_birth: initialDOB
      });
      setAadhaarNum(profile.kycDetails.aadhaar_number || '');
      setBankDetails({
        bank_name: profile.kycDetails.bank_name || '',
        bank_account_number: profile.kycDetails.bank_account_number || '',
        ifsc_code: profile.kycDetails.ifsc_code || ''
      });
      setPanAadhaarLinked(profile.kycDetails.pan_aadhaar_linked);
    }
  }, [profile]);

  // PAN Verification Handler
  const handlePanVerify = async () => {
    if (!panDetails.pan || !panDetails.name_as_per_pan || !panDetails.date_of_birth) {
      toast.error("Please fill all PAN details");
      return;
    }
    
    setLoadingSec('pan');
    try {
      // Convert DOB from DD/MM/YYYY to YYYY-MM-DD for API
      const formattedDOB = convertDOBForAPI(panDetails.date_of_birth);
      
      const payload = {
        pan: panDetails.pan,
        name_as_per_pan: panDetails.name_as_per_pan,
        date_of_birth: formattedDOB
      };

      await customerService.verifyPan(payload);
      toast.success("PAN Verified Successfully!");
      
      // Refresh profile data to get updated verification status
      onRefresh();
    } catch (e: any) {
      toast.error(e.response?.data?.message || "PAN verification failed");
    } finally {
      setLoadingSec(null);
    }
  };

  // Aadhaar OTP Send Handler
  const handleAadhaarSend = async () => {
    if (!aadhaarNum || aadhaarNum.length !== 12) {
      toast.error("Please enter a valid 12-digit Aadhaar number");
      return;
    }
    
    setLoadingSec('a-otp');
    try {
      const res = await customerService.generateAadhaarOtp(aadhaarNum);
      setRefId(res.reference_id || res["Reference ID"]);
      setOtpSent(true);
      toast.success("OTP sent to registered mobile number");
    } catch (e) {
      toast.error("Failed to send OTP");
    } finally {
      setLoadingSec(null);
    }
  };

  // Helper function to extract address from response
  const extractAddressFromResponse = (response: any): string | null => {
    
    // Try different possible paths for address
    if (response.data?.aadhaar_kyc_data?.full_address) {
      return response.data.aadhaar_kyc_data.full_address;
    }
    if (response.aadhaar_kyc_data?.full_address) {
      return response.aadhaar_kyc_data.full_address;
    }
    if (response.data?.address) {
      return response.data.address;
    }
    if (response.address) {
      return response.address;
    }
    if (response.data?.full_address) {
      return response.data.full_address;
    }
    if (response.full_address) {
      return response.full_address;
    }
    // Check if address is nested deeper
    if (response.data?.kyc_data?.address) {
      return response.data.kyc_data.address;
    }
    if (response.kyc_data?.address) {
      return response.kyc_data.address;
    }
    
    return null;
  };

  // Aadhaar OTP Verification Handler
  const handleAadhaarVerify = async () => {
    if (!aadhaarOtp || aadhaarOtp.length < 4) {
      toast.error("Please enter a valid OTP");
      return;
    }
    
    setLoadingSec('a-ver');
    try {
      const response = await customerService.verifyAadhaarOtp({ 
        reference_id: refId, 
        otp: aadhaarOtp, 
        aadhaar_number: aadhaarNum 
      });
      
      toast.success("Aadhaar verification response received");
      
      // Extract address from response
      const aadhaarAddress = extractAddressFromResponse(response);
      
      // Extract DOB from Aadhaar response if available
      let aadhaarDob = null;
      if (response.data?.aadhaar_kyc_data?.date_of_birth) {
        aadhaarDob = response.data.aadhaar_kyc_data.date_of_birth;
      } else if (response.aadhaar_kyc_data?.date_of_birth) {
        aadhaarDob = response.aadhaar_kyc_data.date_of_birth;
      }
      
      // If DOB from Aadhaar is available, update the PAN details with it
      if (aadhaarDob && aadhaarDob.includes('-')) {
        const [day, month, year] = aadhaarDob.split('-');
        const formattedDob = `${day}/${month}/${year}`;
        setPanDetails(prev => ({
          ...prev,
          date_of_birth: formattedDob
        }));
        toast.success("Date of Birth fetched from Aadhaar!");
      }
      
      if (aadhaarAddress && onAddressUpdate) {
        toast.success("Address extracted successfully");
        onAddressUpdate(aadhaarAddress);
        toast.success("Aadhaar Verified! Address fetched successfully.");
      } else {
        toast.success("Aadhaar Verified Successfully!");
        if (!aadhaarAddress) {
          toast("No address found in Aadhaar response");
        }
      }
      
      setOtpSent(false);
      setAadhaarOtp('');
      onRefresh();
    } catch (e) {
      toast.error("Aadhaar verification failed");
      toast.error("Invalid OTP. Please try again");
    } finally {
      setLoadingSec(null);
    }
  };

  // PAN-Aadhaar Link Check Handler
  const handleCheckLink = async () => {
    setLoadingSec('link');
    try {
      const res = await customerService.verifyPanAadhaarLink();
      if (res.status === 'success' || res.data?.pan_aadhaar_linked) {
        setPanAadhaarLinked(true);
        toast.success("PAN and Aadhaar are successfully linked!");
      } else {
        toast.error("PAN and Aadhaar are not linked");
      }
    } catch (e) {
      toast.error("Link verification failed");
    } finally {
      setLoadingSec(null);
    }
  };

  // Bank Verification Handler
  const handleBankVerify = async () => {
    if (!bankDetails.bank_name || !bankDetails.bank_account_number || !bankDetails.ifsc_code) {
      toast.error("Please fill all bank details");
      return;
    }
    
    setLoadingSec('bank');
    try {
      await customerService.verifyBankPennyDrop(bankDetails);
      toast.success("Bank Account Verified Successfully!");
      onRefresh();
    } catch (e) {
      toast.error("Bank verification failed");
    } finally {
      setLoadingSec(null);
    }
  };

  // Demat Account Add Handler
  const handleAddDemat = async () => {
    if (!dematDetails.dp_id || !dematDetails.client_id || !dematDetails.demat_name) {
      toast.error('Please fill DP ID, Client ID, and Name');
      return;
    }
    
    setSavingDemat(true);
    try {
      await customerService.addDematAccount(dematDetails);
      toast.success('Demat account added successfully!');
      setDematAdded(true);
      onRefresh();
    } catch (error) {
      toast.error('Failed to add demat account');
    } finally {
      setSavingDemat(false);
    }
  };

  // Get display value with masking if verified
  const getPanDisplayValue = () => {
    if (profile?.pan_verified && panDetails.pan) {
      return maskPAN(panDetails.pan);
    }
    return panDetails.pan || "";
  };

  const getAadhaarDisplayValue = () => {
    if (profile?.aadhaar_verified && aadhaarNum) {
      return maskAadhaar(aadhaarNum);
    }
    return aadhaarNum || "";
  };

  const getBankAccountDisplayValue = () => {
    if (profile?.bank_verified && bankDetails.bank_account_number) {
      return maskAccount(bankDetails.bank_account_number);
    }
    return bankDetails.bank_account_number || "";
  };

  const getIFSCDisplayValue = () => {
    if (profile?.bank_verified && bankDetails.ifsc_code) {
      return maskIFSC(bankDetails.ifsc_code);
    }
    return bankDetails.ifsc_code || "";
  };

  // Get DOB display value (always show the actual DOB, not masked)
  const getDOBDisplayValue = () => {
    if (panDetails.date_of_birth) {
      return panDetails.date_of_birth;
    }
    return "";
  };

  return (
    <div className="space-y-6">
      {/* STEP 2: IDENTITY VERIFICATION (PAN & AADHAAR) */}
      <div className="bg-white rounded-3xl p-8 border border-slate-100 shadow-sm relative">
        {!isStep1Complete && (
          <div className="absolute inset-0 z-20 bg-white/60 backdrop-blur-[2px] rounded-3xl flex items-center justify-center">
            <div className="bg-white px-6 py-3 rounded-2xl shadow-xl border font-bold text-slate-600 flex items-center gap-2">
              <Lock size={16} /> Complete Step 1 to Unlock KYC
            </div>
          </div>
        )}
        
        <div className="flex justify-between items-center mb-8">
          <h3 className="text-xl text-gray-700 font-bold flex items-center gap-3">
            <span className="bg-[#2076C7] text-white text-[10px] px-2 py-1 rounded-lg uppercase">Step 2</span>
            Identity Verification
          </h3>
          {profile?.pan_verified && profile?.aadhaar_verified && (
            <span className="bg-emerald-50 text-emerald-600 px-3 py-1 rounded-full text-[10px] font-black flex items-center gap-1">
              <CheckCircle2 size={12} /> ID VERIFIED
            </span>
          )}
        </div>

        <div className="space-y-6">
          {/* PAN SECTION */}
          <div className="p-6 bg-slate-50 rounded-2xl border border-slate-100">
            <div className="flex justify-between items-center mb-4">
              <p className="text-[10px] font-black text-gray-700 uppercase tracking-wider">PAN Details</p>
              {profile?.pan_verified && (
                <span className="text-[9px] bg-emerald-100 text-emerald-600 px-2 py-0.5 rounded-full font-black flex items-center gap-1">
                  <CheckCircle2 size={10} /> VERIFIED
                </span>
              )}
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <input
                disabled={profile?.pan_verified}
                placeholder="PAN Number"
                value={getPanDisplayValue()}
                onChange={(e) => setPanDetails({ ...panDetails, pan: e.target.value.toUpperCase() })}
                className="px-4 py-2 border border-slate-200 rounded-xl text-gray-700 text-sm font-bold uppercase focus:border-[#1CADA3] focus:outline-none disabled:bg-slate-100 disabled:text-slate-500"
                maxLength={10}
              />
              <input
                disabled={profile?.pan_verified}
                placeholder="Name on PAN"
                value={panDetails.name_as_per_pan || ""}
                onChange={(e) => setPanDetails({ ...panDetails, name_as_per_pan: e.target.value.toUpperCase() })}
                className="px-4 py-2 border border-slate-200 rounded-xl text-gray-700 text-sm font-bold focus:border-[#1CADA3] focus:outline-none disabled:bg-slate-100 disabled:text-slate-500"
              />
              <div className="flex gap-2">
                <input
                  type="text"
                  inputMode="numeric"
                  disabled={profile?.pan_verified}
                  placeholder="DD/MM/YYYY"
                  maxLength={10}
                  value={getDOBDisplayValue()}
                  onChange={(e) => {
                    const formatted = formatDOBInput(e.target.value);
                    setPanDetails({ ...panDetails, date_of_birth: formatted });
                  }}
                  className="flex-1 px-3 py-2 rounded-xl font-bold text-slate-700 border border-slate-200 text-sm outline-none focus:border-[#1CADA3] disabled:bg-slate-100 disabled:text-slate-500"
                />
                {!profile?.pan_verified && (
                  <button 
                    onClick={handlePanVerify} 
                    disabled={loadingSec === 'pan'}
                    className="bg-[#1CADA3] text-white px-6 rounded-xl text-xs font-bold hover:bg-[#158f87] transition-all disabled:opacity-50 flex items-center gap-2"
                  >
                    {loadingSec === 'pan' ? <Loader2 className="animate-spin w-4 h-4" /> : "Verify"}
                  </button>
                )}
              </div>
            </div>
          </div>

          {/* AADHAAR SECTION */}
          <div className="p-6 bg-slate-50 rounded-2xl border border-slate-100">
            <div className="flex justify-between items-center mb-4">
              <p className="text-[10px] font-black text-gray-700 uppercase tracking-wider">Aadhaar Details</p>
              {profile?.aadhaar_verified && (
                <span className="text-[9px] bg-emerald-100 text-emerald-600 px-2 py-0.5 rounded-full font-black flex items-center gap-1">
                  <CheckCircle2 size={10} /> VERIFIED
                </span>
              )}
            </div>
            <div className="flex flex-col sm:flex-row gap-4">
              <input
                disabled={profile?.aadhaar_verified}
                placeholder="12 Digit Aadhaar Number"
                value={getAadhaarDisplayValue()}
                onChange={(e) => setAadhaarNum(e.target.value.replace(/\D/g, '').slice(0, 12))}
                className="flex-1 px-4 py-2 border border-slate-200 rounded-xl text-gray-700 text-sm font-bold focus:border-[#1CADA3] focus:outline-none disabled:bg-slate-100 disabled:text-slate-500"
                maxLength={14}
              />
              {!profile?.aadhaar_verified && !otpSent && (
                <button 
                  onClick={handleAadhaarSend} 
                  disabled={loadingSec === 'a-otp' || !aadhaarNum || aadhaarNum.length !== 12}
                  className="bg-[#1CADA3] text-white px-6 py-2 rounded-xl text-xs font-bold hover:bg-[#158f87] transition-all disabled:opacity-50 flex items-center justify-center gap-2"
                >
                  {loadingSec === 'a-otp' ? <Loader2 className="animate-spin w-4 h-4" /> : "Get OTP"}
                </button>
              )}
            </div>
            
            {otpSent && !profile?.aadhaar_verified && (
              <div className="mt-4 flex gap-4 animate-in slide-in-from-top-2">
                <input
                  placeholder="Enter 6-digit OTP"
                  value={aadhaarOtp || ""}
                  onChange={(e) => setAadhaarOtp(e.target.value.replace(/\D/g, '').slice(0, 6))}
                  className="flex-1 px-4 py-2 border border-slate-200 rounded-xl text-gray-700 text-sm font-bold focus:border-[#1CADA3] focus:outline-none"
                  maxLength={6}
                />
                <button 
                  onClick={handleAadhaarVerify} 
                  disabled={loadingSec === 'a-ver' || !aadhaarOtp}
                  className="bg-emerald-600 text-white px-6 py-2 rounded-xl text-xs font-bold hover:bg-emerald-700 transition-all disabled:opacity-50 flex items-center gap-2"
                >
                  {loadingSec === 'a-ver' ? <Loader2 className="animate-spin w-4 h-4" /> : "Verify OTP"}
                </button>
              </div>
            )}
          </div>

          {/* PAN-AADHAAR LINK CHECK */}
          {profile?.pan_verified && profile?.aadhaar_verified && (
            <div className="mt-4">
              {panAadhaarLinked === true ? (
                <div className="flex items-center gap-2 p-3 bg-emerald-50 border border-emerald-100 rounded-xl text-emerald-700 text-[11px] font-bold">
                  <CheckCircle2 size={14} /> PAN and Aadhaar are successfully linked
                </div>
              ) : (
                <div className="space-y-3">
                  <button
                    onClick={handleCheckLink}
                    disabled={loadingSec === 'link'}
                    className="w-full py-3 rounded-xl font-black text-xs uppercase tracking-widest flex items-center justify-center gap-2 border-2 border-slate-200 text-slate-600 hover:border-[#1CADA3] transition-all disabled:opacity-50"
                  >
                    {loadingSec === 'link' ? <Loader2 className="animate-spin" size={16} /> : <ShieldCheck size={16} />}
                    Check PAN-Aadhaar Link Status
                  </button>
                  <div className="flex items-start gap-2 p-3 bg-amber-50 border border-amber-100 rounded-xl text-amber-700 text-[11px] font-bold">
                    <AlertCircle size={12} className="shrink-0 mt-0.5" />
                    <span>Note: Payout requires linked PAN-Aadhaar as per government regulations</span>
                  </div>
                </div>
              )}
            </div>
          )}
        </div>
      </div>

      {/* STEP 3: BANK PAYOUT SETUP */}
      <div className="bg-white rounded-3xl p-8 border border-slate-100 shadow-sm relative">
        {!isStep2Complete && (
          <div className="absolute inset-0 z-20 bg-white/60 backdrop-blur-[2px] rounded-3xl flex items-center justify-center">
            <div className="bg-white px-6 py-3 rounded-2xl shadow-xl border font-bold text-slate-600 flex items-center gap-2">
              <Lock size={16} /> Complete Step 2 to Unlock Banking
            </div>
          </div>
        )}
        
        <div className="flex justify-between items-center mb-8">
          <h3 className="text-xl text-gray-700 font-bold flex items-center gap-3">
            <span className="bg-[#2076C7] text-white text-[10px] px-2 py-1 rounded-lg uppercase">Step 3</span>
            Bank Account Verification
          </h3>
          {profile?.bank_verified && (
            <span className="bg-emerald-50 text-emerald-600 px-3 py-1 rounded-full text-[10px] font-black flex items-center gap-1">
              <CheckCircle2 size={12} /> BANK VERIFIED
            </span>
          )}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="space-y-2">
            <label className="text-[10px] font-black text-slate-700 uppercase tracking-wider">Bank Name</label>
            <input 
              disabled={profile?.bank_verified} 
              value={bankDetails.bank_name} 
              onChange={(e) => setBankDetails({...bankDetails, bank_name: e.target.value.toUpperCase()})} 
              className="w-full px-4 py-2 border border-slate-200 rounded-xl text-gray-700 text-sm font-bold focus:border-[#1CADA3] focus:outline-none disabled:bg-slate-100 disabled:text-slate-500"
              placeholder="Enter bank name"
            />
          </div>
          <div className="space-y-2">
            <label className="text-[10px] font-black text-slate-700 uppercase tracking-wider">Account Number</label>
            <input 
              disabled={profile?.bank_verified} 
              value={getBankAccountDisplayValue()} 
              onChange={(e) => setBankDetails({...bankDetails, bank_account_number: e.target.value.replace(/\D/g, '')})} 
              className="w-full px-4 py-2 border border-slate-200 rounded-xl text-gray-700 text-sm font-bold focus:border-[#1CADA3] focus:outline-none disabled:bg-slate-100 disabled:text-slate-500"
              placeholder="Enter account number"
            />
          </div>
          <div className="space-y-2">
            <label className="text-[10px] font-black text-slate-700 uppercase tracking-wider">IFSC Code</label>
            <div className="flex gap-2">
              <input 
                disabled={profile?.bank_verified} 
                value={getIFSCDisplayValue()} 
                onChange={(e) => setBankDetails({...bankDetails, ifsc_code: e.target.value.toUpperCase()})} 
                className="flex-1 px-4 py-2 border border-slate-200 rounded-xl text-gray-700 text-sm font-bold focus:border-[#1CADA3] focus:outline-none disabled:bg-slate-100 disabled:text-slate-500"
                placeholder="Enter IFSC code"
                maxLength={11}
              />
              {!profile?.bank_verified && (
                <button 
                  onClick={handleBankVerify} 
                  disabled={loadingSec === 'bank'}
                  className="bg-emerald-500 text-white px-6 rounded-xl text-xs font-bold hover:bg-emerald-600 transition-all disabled:opacity-50 flex items-center gap-2"
                >
                  {loadingSec === 'bank' ? <Loader2 className="animate-spin w-4 h-4" /> : "Verify"}
                </button>
              )}
            </div>
          </div>
        </div>

        {!profile?.bank_verified && (
          <div className="mt-4 flex items-start gap-2 p-3 bg-blue-50 rounded-xl border border-blue-100">
            <Info className="w-4 h-4 text-blue-600 shrink-0 mt-0.5" />
            <p className="text-[11px] text-blue-700 font-medium">
              A penny drop verification will be performed to validate your bank account details.
            </p>
          </div>
        )}
      </div>

      {/* OPTIONAL DEMAT SECTION */}
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
              <h3 className="text-base sm:text-lg font-bold text-slate-900 truncate">
                Demat Account <span className="text-slate-400 text-xs sm:text-sm font-normal"></span>
              </h3>
              <p className="text-[10px] sm:text-xs text-slate-500 truncate">
                Link your Demat account for seamless trading experience
              </p>
            </div>
          </div>
        </div>

        {dematAdded ? (
          <div className="flex items-center gap-3 sm:gap-4 p-4 sm:p-6 bg-emerald-50 rounded-lg sm:rounded-xl border border-emerald-100">
            <div className="w-8 h-8 sm:w-12 sm:h-12 bg-emerald-100 rounded-full flex items-center justify-center shrink-0">
              <CheckCircle2 className="w-4 h-4 sm:w-6 sm:h-6 text-emerald-600" />
            </div>
            <div className="min-w-0">
              <h4 className="text-sm sm:text-base font-bold text-emerald-800 truncate">
                Demat Account Added Successfully!
              </h4>
              <p className="text-xs sm:text-sm text-emerald-600 truncate">
                Your demat account has been linked to your profile.
              </p>
            </div>
          </div>
        ) : (
          <div className="space-y-4 sm:space-y-6">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
              <div>
                <label className="text-[8px] sm:text-[10px] font-black text-slate-400 uppercase tracking-widest block mb-1.5">
                  DP ID
                </label>
                <input
                  type="text"
                  value={dematDetails.dp_id}
                  onChange={(e) => setDematDetails({...dematDetails, dp_id: e.target.value.toUpperCase()})}
                  className="w-full px-3 sm:px-4 py-2 sm:py-2.5 rounded-lg sm:rounded-xl text-xs sm:text-sm font-medium text-slate-700 bg-white border border-slate-200 focus:border-[#1CADA3] focus:outline-none focus:ring-2 focus:ring-emerald-100"
                  placeholder="Enter DP ID"
                />
              </div>
              <div>
                <label className="text-[8px] sm:text-[10px] font-black text-slate-400 uppercase tracking-widest block mb-1.5">
                  Client ID
                </label>
                <input
                  type="text"
                  value={dematDetails.client_id}
                  onChange={(e) => setDematDetails({...dematDetails, client_id: e.target.value.toUpperCase()})}
                  className="w-full px-3 sm:px-4 py-2 sm:py-2.5 rounded-lg sm:rounded-xl text-xs sm:text-sm font-medium text-slate-700 bg-white border border-slate-200 focus:border-[#1CADA3] focus:outline-none focus:ring-2 focus:ring-emerald-100"
                  placeholder="Enter Client ID"
                />
              </div>
              <div>
                <label className="text-[8px] sm:text-[10px] font-black text-slate-400 uppercase tracking-widest block mb-1.5">
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
                <label className="text-[8px] sm:text-[10px] font-black text-slate-400 uppercase tracking-widest block mb-1.5">
                  Name on Demat
                </label>
                <input
                  type="text"
                  value={dematDetails.demat_name}
                  onChange={(e) => setDematDetails({...dematDetails, demat_name: e.target.value.toUpperCase()})}
                  className="w-full px-3 sm:px-4 py-2 sm:py-2.5 rounded-lg sm:rounded-xl text-xs sm:text-sm font-medium text-slate-700 bg-white border border-slate-200 focus:border-[#1CADA3] focus:outline-none focus:ring-2 focus:ring-emerald-100"
                  placeholder="Name as per Account"
                />
              </div>
            </div>

            <div className="flex items-start gap-2 p-3 sm:p-4 bg-blue-50 rounded-lg border border-blue-100">
              <Info className="text-blue-600 w-3 h-3 sm:w-4 sm:h-4 flex-shrink-0 mt-0.5" />
              <p className="text-[10px] sm:text-xs font-medium text-blue-700">
                Ensure details match your official demat statement exactly for successful verification.
              </p>
            </div>

            <div className="flex justify-end">
              <button
                onClick={handleAddDemat}
                disabled={savingDemat}
                className="w-full sm:w-auto px-6 py-2.5 bg-[#1CADA3] text-white rounded-lg font-bold text-xs sm:text-sm hover:bg-[#158f87] transition-all disabled:opacity-50 flex items-center justify-center gap-2"
              >
                {savingDemat ? (
                  <>
                    <Loader2 className="animate-spin w-4 h-4" />
                    Saving...
                  </>
                ) : (
                  <>
                    <Save className="w-4 h-4" />
                    Save Demat Account
                  </>
                )}
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};