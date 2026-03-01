"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronRight, ChevronLeft, ArrowLeft } from "lucide-react";
import Link from "next/link";

export default function SMEApplyPage() {
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    name: "",
    mobile: "",
    email: "",
    businessName: "",
    businessType: "",
    vintage: "",
    industry: "",
    amount: "",
    purpose: "",
    timeline: "",
    turnover: "",
    existingLoan: "",
    cibil: "",
  });

  const nextStep = () => setStep((prev) => Math.min(prev + 1, 4));
  const prevStep = () => setStep((prev) => Math.max(prev - 1, 1));

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>,
  ) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (step < 4) {
      nextStep();
    } else {
      // Do nothing currently
      console.log("Form Submitted", formData);
    }
  };

  const stepTitles = [
    "Contact Details",
    "Business Profile",
    "Loan Requirements",
    "Financial Health",
  ];

  return (
    <div className="min-h-screen bg-slate-50 pt-24 pb-12 font-sans">
      <div className="container mx-auto px-4 max-w-3xl">
        <Link
          href="/products/Loans/SME"
          className="inline-flex items-center gap-2 text-slate-500 hover:text-[#0056D2] font-semibold mb-6 transition-colors font-sans text-sm"
        >
          <ArrowLeft className="w-4 h-4" /> Back to SME Loans
        </Link>
        <div className="bg-white rounded-2xl shadow-xl border border-[#0056D2]/10 p-6 sm:p-10">
          <div className="mb-8 text-center">
            <h3 className="text-2xl md:text-3xl font-extrabold font-sans mb-2">
              <span className="bg-gradient-to-r from-[#0056D2] to-[#1FAD9F] bg-clip-text text-transparent">
                Apply for SME Loan
              </span>
            </h3>
            <p className="text-slate-500 text-sm">
              Fast, flexible, and tailored financing.
            </p>
          </div>

          {/* Progress Bar */}
          <div className="flex items-center mb-8 gap-2">
            {[1, 2, 3, 4].map((s) => (
              <div key={s} className="flex-1">
                <div
                  className={`h-2 rounded-full ${step >= s ? "bg-[#1FAD9F]" : "bg-slate-100"} transition-colors duration-300`}
                />
                <p
                  className={`text-[10px] sm:text-xs font-bold mt-2 uppercase tracking-wide ${step >= s ? "text-[#1FAD9F]" : "text-slate-400"}`}
                >
                  Step {s}
                </p>
                <p className="text-[10px] hidden sm:block text-slate-500">
                  {stepTitles[s - 1]}
                </p>
              </div>
            ))}
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            <AnimatePresence mode="wait">
              <motion.div
                key={step}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                transition={{ duration: 0.3 }}
                className="space-y-5"
              >
                {step === 1 && (
                  <>
                    <div className="space-y-2">
                      <label className="text-sm font-bold text-slate-700">
                        Full Name
                      </label>
                      <input
                        required
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        className="w-full p-3 rounded-xl bg-slate-50 border border-slate-200 focus:border-[#0056D2] focus:ring-1 focus:ring-[#0056D2] outline-none transition-all"
                        placeholder="Enter your name"
                      />
                    </div>
                    <div className="space-y-2">
                      <label className="text-sm font-bold text-slate-700">
                        Mobile Number
                      </label>
                      <input
                        required
                        type="tel"
                        name="mobile"
                        value={formData.mobile}
                        onChange={handleChange}
                        className="w-full p-3 rounded-xl bg-slate-50 border border-slate-200 focus:border-[#0056D2] focus:ring-1 focus:ring-[#0056D2] outline-none transition-all"
                        placeholder="10-digit mobile number"
                      />
                    </div>
                    <div className="space-y-2">
                      <label className="text-sm font-bold text-slate-700">
                        Email Address
                      </label>
                      <input
                        required
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        className="w-full p-3 rounded-xl bg-slate-50 border border-slate-200 focus:border-[#0056D2] focus:ring-1 focus:ring-[#0056D2] outline-none transition-all"
                        placeholder="work@company.com"
                      />
                    </div>
                  </>
                )}

                {step === 2 && (
                  <>
                    <div className="space-y-2">
                      <label className="text-sm font-bold text-slate-700">
                        Business Name
                      </label>
                      <input
                        required
                        name="businessName"
                        value={formData.businessName}
                        onChange={handleChange}
                        className="w-full p-3 rounded-xl bg-slate-50 border border-slate-200 focus:border-[#0056D2] focus:ring-1 focus:ring-[#0056D2] outline-none transition-all"
                        placeholder="Your Registered Company Name"
                      />
                    </div>
                    <div className="space-y-2">
                      <label className="text-sm font-bold text-slate-700">
                        Business Type
                      </label>
                      <select
                        required
                        name="businessType"
                        value={formData.businessType}
                        onChange={handleChange}
                        className="w-full p-3 rounded-xl bg-slate-50 border border-slate-200 focus:border-[#0056D2] outline-none transition-all text-slate-700"
                      >
                        <option value="">Select Type</option>
                        <option value="Proprietorship">Proprietorship</option>
                        <option value="Partnership">Partnership</option>
                        <option value="Private Limited">Private Limited</option>
                        <option value="Public Limited">Public Limited</option>
                      </select>
                    </div>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <label className="text-sm font-bold text-slate-700">
                          Business Vintage
                        </label>
                        <select
                          required
                          name="vintage"
                          value={formData.vintage}
                          onChange={handleChange}
                          className="w-full p-3 rounded-xl bg-slate-50 border border-slate-200 focus:border-[#0056D2] outline-none transition-all text-slate-700"
                        >
                          <option value="">Select Vintage</option>
                          <option value="< 1 Year">&lt; 1 Year</option>
                          <option value="1-3 Years">1-3 Years</option>
                          <option value="3-5 Years">3-5 Years</option>
                          <option value="> 5 Years">&gt; 5 Years</option>
                        </select>
                      </div>
                      <div className="space-y-2">
                        <label className="text-sm font-bold text-slate-700">
                          Industry
                        </label>
                        <input
                          required
                          name="industry"
                          value={formData.industry}
                          onChange={handleChange}
                          className="w-full p-3 rounded-xl bg-slate-50 border border-slate-200 focus:border-[#0056D2] focus:ring-1 focus:ring-[#0056D2] outline-none transition-all"
                          placeholder="e.g. Manufacturing"
                        />
                      </div>
                    </div>
                  </>
                )}

                {step === 3 && (
                  <>
                    <div className="space-y-2">
                      <label className="text-sm font-bold text-slate-700">
                        Required Loan Amount (₹)
                      </label>
                      <input
                        required
                        type="number"
                        name="amount"
                        value={formData.amount}
                        onChange={handleChange}
                        className="w-full p-3 rounded-xl bg-slate-50 border border-slate-200 focus:border-[#0056D2] focus:ring-1 focus:ring-[#0056D2] outline-none transition-all"
                        placeholder="e.g. 5000000"
                      />
                    </div>
                    <div className="space-y-2">
                      <label className="text-sm font-bold text-slate-700">
                        Loan Purpose
                      </label>
                      <select
                        required
                        name="purpose"
                        value={formData.purpose}
                        onChange={handleChange}
                        className="w-full p-3 rounded-xl bg-slate-50 border border-slate-200 focus:border-[#0056D2] outline-none transition-all text-slate-700"
                      >
                        <option value="">Select Purpose</option>
                        <option value="Working Capital">Working Capital</option>
                        <option value="Machinery Purchase">
                          Machinery Purchase
                        </option>
                        <option value="Business Expansion">
                          Business Expansion
                        </option>
                        <option value="Other">Other</option>
                      </select>
                    </div>
                    <div className="space-y-2">
                      <label className="text-sm font-bold text-slate-700">
                        Funds Required In
                      </label>
                      <select
                        required
                        name="timeline"
                        value={formData.timeline}
                        onChange={handleChange}
                        className="w-full p-3 rounded-xl bg-slate-50 border border-slate-200 focus:border-[#0056D2] outline-none transition-all text-slate-700"
                      >
                        <option value="">Select Timeline</option>
                        <option value="Immediately">
                          Immediately (0-7 Days)
                        </option>
                        <option value="15 Days">Within 15 Days</option>
                        <option value="1 Month">Within 1 Month</option>
                        <option value="Just Exploring">Just Exploring</option>
                      </select>
                    </div>
                  </>
                )}

                {step === 4 && (
                  <>
                    <div className="space-y-2">
                      <label className="text-sm font-bold text-slate-700">
                        Annual Turnover (₹)
                      </label>
                      <input
                        required
                        type="number"
                        name="turnover"
                        value={formData.turnover}
                        onChange={handleChange}
                        className="w-full p-3 rounded-xl bg-slate-50 border border-slate-200 focus:border-[#0056D2] focus:ring-1 focus:ring-[#0056D2] outline-none transition-all"
                        placeholder="e.g. 15000000"
                      />
                    </div>
                    <div className="space-y-2">
                      <label className="text-sm font-bold text-slate-700">
                        Existing Business Loan
                      </label>
                      <select
                        required
                        name="existingLoan"
                        value={formData.existingLoan}
                        onChange={handleChange}
                        className="w-full p-3 rounded-xl bg-slate-50 border border-slate-200 focus:border-[#0056D2] outline-none transition-all text-slate-700"
                      >
                        <option value="">Select Option</option>
                        <option value="Yes">Yes</option>
                        <option value="No">No</option>
                      </select>
                    </div>
                    <div className="space-y-2">
                      <label className="text-sm font-bold text-slate-700">
                        Estimated CIBIL Score
                      </label>
                      <select
                        required
                        name="cibil"
                        value={formData.cibil}
                        onChange={handleChange}
                        className="w-full p-3 rounded-xl bg-slate-50 border border-slate-200 focus:border-[#0056D2] outline-none transition-all text-slate-700"
                      >
                        <option value="">Select Estimate</option>
                        <option value="Excellent (750+)">
                          Excellent (750+)
                        </option>
                        <option value="Good (700-750)">Good (700-750)</option>
                        <option value="Fair (650-700)">Fair (650-700)</option>
                        <option value="Below 650">
                          Below 650 or Don't Know
                        </option>
                      </select>
                    </div>
                  </>
                )}
              </motion.div>
            </AnimatePresence>

            <div className="flex gap-4 pt-4 border-t border-slate-100">
              {step > 1 && (
                <button
                  type="button"
                  onClick={prevStep}
                  className="px-6 py-3 bg-slate-100 text-slate-600 font-bold rounded-xl hover:bg-slate-200 transition-colors w-1/3 flex items-center justify-center gap-2"
                >
                  <ChevronLeft className="w-4 h-4" /> Back
                </button>
              )}
              <button
                type="submit"
                className={`px-6 py-3 font-bold rounded-xl text-white shadow-lg transition-all ${step === 1 ? "w-full" : "w-2/3"} bg-gradient-to-r from-[#0056D2] to-[#1FAD9F] hover:shadow-xl hover:scale-[1.02] flex items-center justify-center gap-2`}
              >
                {step === 4 ? "Submit Application" : "Continue"}
                {step < 4 && <ChevronRight className="w-4 h-4" />}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
