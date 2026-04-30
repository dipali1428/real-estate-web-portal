"use client";
import React, { useState, useEffect } from 'react';
import { FileText, CheckCircle, X, AlertCircle, ArrowRight } from 'lucide-react';
import Link from 'next/link';
import { DashboardService } from "@/app/services/dashboardService";
import { AdminService } from "@/app/services/adminService";
import toast, { Toaster } from 'react-hot-toast';
import { load } from "@cashfreepayments/cashfree-js";

export default function DSAAgreement() {
  const [profile, setProfile] = useState<any>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [signedName, setSignedName] = useState<string>('');
  const [isSubmitted, setIsSubmitted] = useState<boolean>(false);
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
  const [showPaymentModal, setShowPaymentModal] = useState<boolean>(false);
  const [paymentType, setPaymentType] = useState<'PAY_DIRECTLY' | 'USE_COUPON' | null>(null);
  const [couponCode, setCouponCode] = useState<string>('');
  const [isValidatingCoupon, setIsValidatingCoupon] = useState<boolean>(false);
  const [couponApplied, setCouponApplied] = useState<boolean>(false);
  const [downloadingId, setDownloadingId] = useState<string | null>(null);

  // ==========================================
  // TOGGLE MAINTENANCE MODE HERE
  // ==========================================
  const IS_MAINTENANCE_MODE = true; // Set to true to show maintenance page, false to show normal page
  // ==========================================

  useEffect(() => {
    if (IS_MAINTENANCE_MODE) {
      setLoading(false);
      return;
    }
    const fetchProfileData = async () => {
      try {
        const response = await DashboardService.checkKycStatus();
        setProfile(response);

        // ✅ NEW: check agreement status
        if (response?.agreementStatus === "created") {
          setIsSubmitted(true);
        }

      } catch (error: any) {
        toast.error("Error fetching profile data. Please try again later.");
      } finally {
        setLoading(false);
      }
    };
    fetchProfileData();
  }, []);

  const handleDownload = async () => {
    // We use the uuid from the profile state fetched during useEffect
    const uuid = profile?.agreementUuid;
    const name = profile?.name || "DSA";

    if (!uuid) {
      toast.error("Agreement ID not found");
      return;
    }

    setDownloadingId(uuid);
    try {
      const response = await AdminService.downloadAgreement(uuid); // or AdminService
      const url = window.URL.createObjectURL(new Blob([response.data]));
      const link = document.createElement('a');
      link.href = url;
      link.setAttribute('download', `${name.replace(/\s+/g, '_')}_Agreement.pdf`);
      document.body.appendChild(link);
      link.click();
      link.parentNode?.removeChild(link);
      window.URL.revokeObjectURL(url);
      toast.success("Download started");
    } catch (error) {
      toast.error("Failed to download agreement");
    } finally {
      setDownloadingId(null);
    }
  };

  // const RazorpayPaymentButton = () => {
  //   const containerRef = React.useRef<HTMLDivElement>(null);

  //   useEffect(() => {
  //     // 1. Clear any existing content inside the container to prevent duplicates
  //     if (containerRef.current) {
  //       containerRef.current.innerHTML = "";
  //     }

  //     const script = document.createElement("script");
  //     script.src = process.env.NEXT_PUBLIC_RAZORPAY_URL || "";
  //     script.dataset.payment_button_id = process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID;
  //     script.async = true;

  //     const form = document.createElement("form");
  //     form.appendChild(script);

  //     if (containerRef.current) {
  //       containerRef.current.appendChild(form);
  //     }

  //     // 2. Cleanup function: removes the form when the component unmounts
  //     return () => {
  //       if (containerRef.current) {
  //         containerRef.current.innerHTML = "";
  //       }
  //     };
  //   }, []);

  //   return <div ref={containerRef} className="w-full flex justify-center" />;
  // };

  const handlePayment = async () => {
    setIsSubmitting(true);
    try {
      const data = await DashboardService.createOrder();

      const order_id = data.order_id;
      const paymentSessionId = data.orderToken;


      if (!paymentSessionId) {
        toast.error("Payment session ID missing from server");
        setIsSubmitting(false);
        return;
      }

      // 🔹 3. Initialize SDK
      const cashfree = await load({
        mode: "production", // Change to "production" when going live
      });

      // 🔹 4. Open Checkout
      const result = await cashfree.checkout({
        paymentSessionId: paymentSessionId,
        redirectTarget: "_modal", // This opens the popup
      });

      if (result.error) {
        toast.error(result.error.message);
        await DashboardService.markFailed(order_id);
      }

      if (result.paymentDetails) {
        const verifyRes = await DashboardService.verifyPayment(order_id);

        if (verifyRes?.success) {
          await handleSubmit('PAY_DIRECTLY');
        } else {
          toast.error(verifyRes?.message || "Payment verification failed");
        }
      }

    } catch (err: any) {
      toast.error(err.response?.data?.message);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleValidateCoupon = async () => {
    if (!couponCode.trim()) {
      toast.error("Please enter a coupon code");
      return;
    }

    try {
      setIsValidatingCoupon(true);
      const response = await DashboardService.validateCoupon(couponCode);

      // Assuming success if the request doesn't throw
      setCouponApplied(true);
      toast.success(response?.message || "Coupon applied successfully!");
    } catch (error: any) {
      setCouponApplied(false);
      const errorMsg = error.response?.data?.message || "Invalid coupon code";
      toast.error(errorMsg);
    } finally {
      setIsValidatingCoupon(false);
    }
  };

  const handleSubmit = async (paymentChoice: 'PAY_DIRECTLY' | 'USE_COUPON') => {
    // e.preventDefault();

    // Remove the "isAgreed" and "signedName" check since inputs are hidden
    try {
      setIsSubmitting(true);
      const nameToSubmit = signedName || profile?.name || "Agent";

      const response = await DashboardService.createAgreement({
        // signed_name: nameToSubmit,
        payment_method: paymentChoice,
        coupon_code: paymentChoice === 'USE_COUPON' ? couponCode : null
      });

      // 2. Show success toast with message from response
      toast.success(response?.message || "Agreement link sent to your email!");
      setIsSubmitted(true);
      setShowPaymentModal(false);
    } catch (error: any) {
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
  if (!loading && IS_MAINTENANCE_MODE) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50 p-4">
        <div className="max-w-md w-full bg-white rounded-xl shadow-lg p-8 text-center border-t-4 border-yellow-500">
          <h2 className="text-2xl font-bold text-gray-800 mb-2 mt-6">Under Maintenance</h2>
          <p className="text-gray-600 mb-8">
            We are currently updating the agreement portal to serve you better. We'll be back shortly!
          </p>
          <Link
            href="/dashboard"
            className="inline-flex items-center justify-center px-6 py-3 bg-[#2076C7] text-white rounded-lg font-semibold hover:bg-[#1a5fa1] transition-colors"
          >
            Back to Dashboard
          </Link>
          <p className="mt-6 text-sm text-gray-400 italic">Expected uptime: Soon</p>
        </div>
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
          <h2 className="text-2xl font-bold text-gray-800 mb-2">
            Agreement Sent to <span className='text-blue-600 rounded-xl'>{profile?.email}</span> from CaseDocker for signing
          </h2>
          <p className="text-gray-600 mb-6">
            Thank you, <span className='font-bold'>{profile?.name}</span>. Please check your mail inbox to review and sign your DSA partnership agreement.
          </p>

          {/* --- ADD THIS BUTTON SECTION --- */}
          <div className="flex flex-col items-center gap-4">
            <button
              onClick={handleDownload}
              disabled={downloadingId !== null}
              className="flex items-center gap-2 px-6 py-2 bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-lg font-medium transition-colors border border-gray-300"
            >
              {downloadingId ? (
                <span className="animate-spin rounded-full h-4 w-4 border-2 border-gray-500 border-t-transparent"></span>
              ) : (
                <FileText size={18} />
              )}
              {downloadingId ? "Preparing PDF..." : "Download Agreement Copy"}
            </button>
            <p className="text-xs text-gray-400 font-medium italic">Sign via the link sent to your email to activate partnership.</p>
          </div>
          {/* ------------------------------ */}

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
              <p className="text-gray-700 pt-1">The  <strong>&quot;Payment Selection&quot;</strong> window will be shown. Select payment method and click Proceed To Sign.</p>
            </div>

            <div className="flex gap-4">
              <div className="flex-shrink-0 w-8 h-8 bg-blue-100 text-[#2076C7] rounded-full flex items-center justify-center font-bold">3</div>
              <p className="text-gray-700 pt-1">Open the email received from our system and click on the <strong>&quot;View Document&quot;</strong> button to open the signing portal.</p>
            </div>

            <div className="flex gap-4">
              <div className="flex-shrink-0 w-8 h-8 bg-blue-100 text-[#2076C7] rounded-full flex items-center justify-center font-bold">4</div>
              <p className="text-gray-700 pt-1">Enter the <strong>One-Time Password (OTP)</strong> sent to your email to verify your identity.</p>
            </div>

            <div className="flex gap-4">
              <div className="flex-shrink-0 w-8 h-8 bg-blue-100 text-[#2076C7] rounded-full flex items-center justify-center font-bold">5</div>
              <p className="text-gray-700 pt-1">Review the document and <strong>proceed to sign</strong>. Once completed, your partnership will be officially activated.</p>
            </div>
          </div>
        </div>

        {/* Signing Section */}
        <div className={`bg-gray-50 rounded-b-xl p-8 border border-gray-200 shadow-sm ${!isKycComplete ? 'select-none pointer-events-none' : ''}`}>
          <button
            type="button" // Change from "submit" to "button"
            onClick={() => setShowPaymentModal(true)} // Open the popup
            className="w-full bg-[#1CADA3] text-white py-3 rounded-lg font-bold hover:bg-[#18968d] disabled:opacity-50 transition-all shadow-md flex items-center justify-center gap-2">
            Sign & Accept Agreement
          </button>
        </div>
      </div>
      {showPaymentModal && (
        <div className="fixed inset-0 z-[60] flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm">
          <div className="bg-white rounded-xl shadow-2xl max-w-md w-full p-6 animate-in zoom-in duration-200 relative">
            <button
              onClick={() => { setShowPaymentModal(false); setCouponApplied(false); setCouponCode(''); setPaymentType(null); }}
              className="absolute top-4 right-4 text-gray-400 hover:text-gray-600 transition-colors">
              <X size={22} />
            </button>
            <h3 className="text-xl font-bold text-gray-900 mb-4">Payment Selection</h3>
            <p className="text-gray-600 mb-1">
              Please select how you would like to pay the agreement processing fee <span className="font-medium">(₹590)</span>.
            </p>
            <p className="text-sm text-gray-500 italic mb-6">
              Includes <span className="text-green-800">₹500</span> fee + <span className="text-blue-600">₹90 GST</span>
            </p>

            <div className="space-y-3">
              {/* Option 1: Direct Payment */}
              <button
                onClick={() => setPaymentType('PAY_DIRECTLY')}
                className={`w-full p-4 border-2 rounded-lg text-left transition-all ${paymentType === 'PAY_DIRECTLY' ? 'border-[#2076C7] bg-blue-50' : 'border-gray-200 hover:border-gray-300'}`}>
                <p className="font-bold text-gray-800">Pay Directly</p>
                <p className="text-sm text-gray-500">Pay now using UPI, Card, or NetBanking</p>
              </button>

              {/* Option 2: Payout Deduction */}
              <button
                onClick={() => setPaymentType('USE_COUPON')}
                className={`w-full p-4 border-2 rounded-lg text-left transition-all ${paymentType === 'USE_COUPON' ? 'border-[#2076C7] bg-blue-50' : 'border-gray-200 hover:border-gray-300'}`}>
                <p className="font-bold text-gray-800">Use Token (Deduct from Payout)</p>
                <p className="text-sm text-gray-500">Amount will be deducted from your first commission</p>
              </button>

              {/* Find the paymentType === 'USE_COUPON' block in your modal */}
              {paymentType === 'USE_COUPON' && (
                <div className="mt-2 px-1 animate-in slide-in-from-top-2 duration-200">
                  <label className="text-xs font-semibold text-gray-600 uppercase">Enter Coupon/Token Code</label>
                  <div className="flex gap-2 mt-1">
                    <input
                      type="text"
                      disabled={couponApplied}
                      value={couponCode}
                      onChange={(e) => setCouponCode(e.target.value.toUpperCase())}
                      placeholder="e.g. SAVE100"
                      className={`flex-1 p-2 border ${couponApplied ? 'bg-green-50 border-green-500' : 'border-gray-300'} text-gray-800 rounded-md focus:ring-2 focus:ring-[#2076C7] focus:outline-none text-sm`}
                    />
                    <button
                      type="button"
                      disabled={isValidatingCoupon || !couponCode.trim() || couponApplied}
                      onClick={handleValidateCoupon}
                      className={`px-4 py-2 rounded-md text-sm font-bold transition-colors ${couponApplied
                        ? 'bg-green-500 text-white'
                        : 'bg-gray-800 text-white hover:bg-black disabled:opacity-50'
                        }`}>
                      {isValidatingCoupon ? "..." : couponApplied ? "Applied" : "Apply"}
                    </button>
                  </div>
                  {couponApplied && (
                    <p className="text-[10px] text-green-600 mt-1 font-medium flex items-center gap-1">
                      <CheckCircle size={10} /> Coupon code verified
                    </p>
                  )}
                </div>
              )}
            </div>

            <div className="flex gap-3 mt-8">
              <button
                onClick={() => { setShowPaymentModal(false); setCouponApplied(false); setCouponCode(''); setPaymentType(null); }}
                className="flex-1 py-2 text-gray-600 font-medium hover:bg-gray-100 rounded-lg transition-colors">
                Cancel
              </button>
              {paymentType === 'PAY_DIRECTLY' ? (
                <div className="flex-1">
                  <button
                    onClick={handlePayment}
                    disabled={isSubmitting}
                    className="w-full py-3 bg-[#2076C7] text-white font-semibold rounded-lg hover:bg-[#aedaac] disabled:bg-[#2076C7]/60 cursor-pointertransition-all duration-200 flex items-center justify-center gap-2"
                  >
                    {isSubmitting ? (
                      <>
                        <span className="animate-spin rounded-full h-4 w-4 border-2 border-white border-t-transparent"></span>
                        Processing...
                      </>
                    ) : (
                      "Pay ₹590 & Continue"
                    )}
                  </button>
                </div>
              ) : (
                <button
                  disabled={!paymentType || isSubmitting || (paymentType === 'USE_COUPON' && !couponApplied)}
                  onClick={() => paymentType && handleSubmit(paymentType)}
                  className="flex-1 py-3 bg-[#2076C7] text-white font-bold rounded-lg disabled:opacity-50 hover:bg-[#1a5fa1] transition-colors">
                  {isSubmitting ? "Processing..." : "Proceed To E-Sign"}
                </button>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}