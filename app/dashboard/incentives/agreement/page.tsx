"use client";
import React, { useState, useEffect, ChangeEvent, FormEvent } from 'react';
import { FileText, CheckCircle, PenTool, Download, AlertCircle, ArrowRight } from 'lucide-react';
import Link from 'next/link';
import { DashboardService } from "@/app/services/dashboardService";
import toast, { Toaster } from 'react-hot-toast';

export default function DSAAgreement() {
  const [profile, setProfile] = useState<any>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [signedName, setSignedName] = useState<string>('');
  const [isAgreed, setIsAgreed] = useState<boolean>(false);
  const [isSubmitted, setIsSubmitted] = useState<boolean>(false);
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);

  useEffect(() => {
    const fetchProfileData = async () => {
      try {
        const response = await DashboardService.checkKycStatus();
        setProfile(response);
        console.log("Profile data fetched:", response);
      } catch (error) {
        console.error("Error fetching profile:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchProfileData();
  }, []);

  // // ADD THIS BLOCK (around line 30)
  // useEffect(() => {
  //   if (profile) {
  //     console.log("--- Profile State Verification ---");
  //     console.log("Stored Name:", profile.name);
  //     console.log("Stored Email:", profile.email);
  //     console.log("Full Profile Object:", profile);
  //     console.log("----------------------------------");
  //   }
  // }, [profile]); // This runs whenever 'profile' state updates

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    // Remove the "isAgreed" and "signedName" check since inputs are hidden
    try {
      setIsSubmitting(true);
      const nameToSubmit = signedName || profile?.name || "Agent";

      const response = await DashboardService.createAgreement({ signed_name: nameToSubmit });
      
      // 2. Show success toast with message from response
      toast.success(response?.message || "Agreement link sent to your email!");
      setIsSubmitted(true);
    } catch (error: any) {
      console.error("Error signing agreement:", error);
      
      // 3. Extract the error message from the backend response
      const errorMessage = 
        error.response?.data?.message || 
        error.message || 
        "Failed to submit agreement. Please try again.";
      
      toast.error(errorMessage, {
        duration: 3000,
        position: 'top-right',
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-[#2076C7]"></div>
      </div>
    );
  }

  const isKycComplete = profile?.kycStatus === true;

  if (isSubmitted) {
    return (
      <div className="min-h-full flex items-center justify-center bg-gray-50 p-4">
        <div className="max-w-3xl w-full bg-white rounded-xl shadow-lg p-8 text-center border-t-4 border-[#1CADA3]">
          <div className="flex justify-center mb-4">
            <CheckCircle size={64} className="text-[#1CADA3]" />
          </div>
          {/* EDIT THE LINE BELOW */}
          <h2 className="text-2xl font-bold text-gray-800 mb-2">
            Agreement Sent to <span className='text-blue-600 rounded-xl'>{profile?.email}</span> from CaseDocker for signing 
          </h2>
          <p className="text-gray-600 mb-6">
            Thank you, <span className='font-bold'>{profile?.name}</span>. Please check your mail inbox to review and sign your DSA partnership agreement.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-full w-full bg-gray-100 py-12 px-4 sm:px-6 lg:px-8">
      <Toaster position="top-right" reverseOrder={false} />

      <div className="max-w-4xl mx-auto relative rounded-xl shadow-xl overflow-hidden bg-white">

        {/* Overlay for Incomplete KYC */}
        {!isKycComplete && (
          <div className="absolute inset-0 z-50 flex items-center justify-center p-4 bg-gray-100/10 backdrop-blur-[4px] rounded-xl">
            <div className="max-w-md w-full bg-white rounded-xl shadow-2xl p-8 text-center border-t-4 border-orange-500 scale-100 animate-in fade-in zoom-in duration-300">
              <div className="flex justify-center mb-4 text-orange-500">
                <AlertCircle size={64} />
              </div>
              <h2 className="text-2xl font-bold text-gray-800 mb-2">Profile is not completed</h2>
              <p className="text-gray-600 mb-8">
                Complete profile first to access the DSA Agreement.
              </p>
              <Link
                href="/dashboard/profile"
                className="flex items-center justify-center w-full gap-2 bg-[#2076C7] text-white py-3 rounded-lg font-semibold hover:bg-[#1a5fa1] transition-colors"
              >
                Go to Profile <ArrowRight size={18} />
              </Link>
            </div>
          </div>
        )}

        {/* Header */}
        <div className={`bg-white p-6 border-b border-gray-200 flex flex-col md:flex-row md:items-center justify-between gap-4 ${!isKycComplete ? 'select-none' : ''}`}>
          <div className="flex items-center gap-3">
            <div className="bg-[#2076C7] p-2 rounded-lg">
              <FileText className="text-white" size={24} />
            </div>
            <div>
              <h1 className="text-xl font-bold text-gray-900">DSA Partnership Agreement</h1>
              <p className="text-sm text-gray-500">Agent: {profile?.name || "N/A"}</p>
            </div>
          </div>
          <div className="text-right">
            <span className={`text-xs font-bold uppercase tracking-wider ${isKycComplete ? 'text-[#1CADA3] bg-[#1CADA3]/10' : 'text-orange-500 bg-orange-100'} px-3 py-1 rounded-full`}>
              {isKycComplete ? 'KYC Verified' : 'KYC Pending'}
            </span>
          </div>
        </div>

        {/* Updated Agreement Steps Box */}
        <div className={`bg-white p-8 h-96 overflow-y-scroll border-x border-gray-200 prose prose-sm max-w-none ${!isKycComplete ? 'select-none pointer-events-none' : ''}`}>
          <h3 className="text-[#2076C7] font-bold text-lg">Signing Instructions</h3>
          <p className="text-gray-600 mb-6 italic">Please follow these steps to complete your digital partnership agreement:</p>

          <div className="space-y-6">
            <div className="flex gap-4">
              <div className="flex-shrink-0 w-8 h-8 bg-blue-100 text-[#2076C7] rounded-full flex items-center justify-center font-bold">1</div>
              <p className="text-gray-700 pt-1">Click on the <strong>&quot;Sign & Accept Agreement&quot;</strong> button below to trigger a secure signing link to your registered email address.</p>
            </div>

            <div className="flex gap-4">
              <div className="flex-shrink-0 w-8 h-8 bg-blue-100 text-[#2076C7] rounded-full flex items-center justify-center font-bold">2</div>
              <p className="text-gray-700 pt-1">Open the email received from our system and click on the <strong>&quot;View Document&quot;</strong> button to open the signing portal.</p>
            </div>

            <div className="flex gap-4">
              <div className="flex-shrink-0 w-8 h-8 bg-blue-100 text-[#2076C7] rounded-full flex items-center justify-center font-bold">3</div>
              <p className="text-gray-700 pt-1">Enter the <strong>One-Time Password (OTP)</strong> sent to your email to verify your identity.</p>
            </div>

            <div className="flex gap-4">
              <div className="flex-shrink-0 w-8 h-8 bg-blue-100 text-[#2076C7] rounded-full flex items-center justify-center font-bold">4</div>
              <p className="text-gray-700 pt-1">Review the document and <strong>proceed to sign</strong>. Once completed, your partnership will be officially activated.</p>
            </div>
          </div>
        </div>

        {/* Signing Section */}
        <div className={`bg-gray-50 rounded-b-xl p-8 border border-gray-200 shadow-sm ${!isKycComplete ? 'select-none pointer-events-none' : ''}`}>
          <form onSubmit={handleSubmit} className="space-y-6">
            <button
              type="submit"
              className="w-full bg-[#1CADA3] text-white py-3 rounded-lg font-bold hover:bg-[#18968d] disabled:opacity-50 transition-all shadow-md flex items-center justify-center gap-2"
            >
              {isSubmitting ? (
                <>
                  <div className="h-5 w-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                  Processing...
                </>
              ) : (
                "Sign & Accept Agreement"
              )}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}