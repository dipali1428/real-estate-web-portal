"use client";

import React from "react";
import { X, CheckCircle } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

interface FormModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function LASApplicationForm({
  isOpen,
  onClose,
}: FormModalProps) {
  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 sm:p-6 bg-black/60 backdrop-blur-sm">
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            className="bg-white w-full max-w-4xl rounded-3xl shadow-2xl flex flex-col max-h-[90vh] overflow-hidden"
          >
            {/* Header */}
            <div className="flex items-center justify-between p-8 border-b border-blue-50 bg-white relative overflow-hidden">
              <div className="absolute top-0 left-0 w-1 h-full bg-gradient-to-b from-[#2076C7] to-[#1CADA3]" />
              <div className="relative z-10">
                <h2 className="text-3xl font-black tracking-tight bg-linear-to-r from-[#2076C7] to-[#1CADA3] bg-clip-text text-transparent">
                  Loan Against Securities
                </h2>
                <p className="text-sm font-bold text-slate-400 mt-1 uppercase tracking-widest leading-none">
                  Instant Liquidity • Digital Application
                </p>
              </div>
              <button
                onClick={onClose}
                className="w-12 h-12 bg-white border border-slate-200 rounded-2xl flex items-center justify-center text-slate-400 hover:bg-slate-50 hover:text-[#2076C7] hover:border-[#2076C7]/30 transition-all shadow-sm active:scale-90"
              >
                <X className="w-6 h-6" />
              </button>
            </div>

            {/* Content (Scrollable) */}
            <div className="p-8 md:p-12 overflow-y-auto custom-scrollbar flex-1 bg-white">
              <form className="space-y-16">
                {/* Section 1 */}
                <section>
                  <div className="mb-8 pb-4 border-b border-slate-50">
                    <h3 className="text-xl font-extrabold text-[#2076C7] flex items-center gap-3 tracking-tight">
                      <span className="w-10 h-10 rounded-2xl bg-gradient-to-br from-[#2076C7] to-[#1CADA3] flex items-center justify-center text-sm text-white shadow-lg">
                        1
                      </span>
                      Basic Information
                    </h3>
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    <div>
                      <label className="block text-[10px] font-black text-slate-400 uppercase tracking-widest mb-2">
                        Full Name (as per PAN) *
                      </label>
                      <input
                        type="text"
                        className="w-full px-5 py-4 rounded-2xl border border-slate-200 focus:ring-4 focus:ring-[#2076C7]/10 focus:border-[#2076C7] text-slate-700 font-bold placeholder:text-slate-300 transition-all outline-none"
                        placeholder="Enter full name"
                      />
                    </div>
                    <div>
                      <label className="block text-[10px] font-black text-slate-400 uppercase tracking-widest mb-2">
                        Mobile Number *
                      </label>
                      <div className="flex">
                        <span className="inline-flex items-center px-5 rounded-l-2xl border border-r-0 border-slate-200 bg-slate-50 text-slate-500 font-bold text-sm">
                          +91
                        </span>
                        <input
                          type="tel"
                          className="w-full px-5 py-4 rounded-r-2xl border border-slate-200 focus:ring-4 focus:ring-[#2076C7]/10 focus:border-[#2076C7] text-slate-700 font-bold placeholder:text-slate-300 transition-all outline-none"
                          placeholder="10-digit number"
                        />
                      </div>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Email ID *
                      </label>
                      <input
                        type="email"
                        className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-[#2076C7]/20 focus:border-[#2076C7] transition-all"
                        placeholder="Email address"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        City *
                      </label>
                      <input
                        type="text"
                        className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-[#2076C7]/20 focus:border-[#2076C7] transition-all"
                        placeholder="Your city"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Date of Birth *
                      </label>
                      <input
                        type="date"
                        className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-[#2076C7]/20 focus:border-[#2076C7] transition-all"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        PAN Number *
                      </label>
                      <input
                        type="text"
                        className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-[#2076C7]/20 focus:border-[#2076C7] transition-all uppercase"
                        placeholder="ABCDE1234F"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Employment Type{" "}
                        <span className="text-gray-400 font-normal">
                          (Optional)
                        </span>
                      </label>
                      <select className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-[#2076C7]/20 focus:border-[#2076C7] transition-all bg-white">
                        <option value="">Select employment type</option>
                        <option>Salaried</option>
                        <option>Self-Employed</option>
                        <option>Business Owner</option>
                        <option>HNI</option>
                      </select>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Annual Income Range{" "}
                        <span className="text-gray-400 font-normal">
                          (Optional)
                        </span>
                      </label>
                      <select className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-[#2076C7]/20 focus:border-[#2076C7] transition-all bg-white">
                        <option value="">Select income range</option>
                        <option>Below ₹5 Lakhs</option>
                        <option>₹5 - 10 Lakhs</option>
                        <option>₹10 - 25 Lakhs</option>
                        <option>₹25 - 50 Lakhs</option>
                        <option>Above ₹50 Lakhs</option>
                      </select>
                    </div>
                  </div>
                </section>

                {/* Section 2 */}
                <section>
                  <div className="mb-6 pb-2 border-b border-gray-100">
                    <h3 className="text-xl font-bold text-[#2076C7] flex items-center gap-2">
                      <span className="w-8 h-8 rounded-full bg-[#2076C7]/10 flex items-center justify-center text-sm">
                        2
                      </span>
                      Loan Requirement Details
                    </h3>
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Loan Amount Required (₹) *
                      </label>
                      <input
                        type="number"
                        className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-[#2076C7]/20 focus:border-[#2076C7] transition-all"
                        placeholder="e.g. 500000"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Purpose of Loan *
                      </label>
                      <select className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-[#2076C7]/20 focus:border-[#2076C7] transition-all bg-white">
                        <option value="">Select purpose</option>
                        <option>Business Expansion</option>
                        <option>Working Capital</option>
                        <option>Investment</option>
                        <option>Personal</option>
                        <option>Others</option>
                      </select>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Preferred Tenure *
                      </label>
                      <select className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-[#2076C7]/20 focus:border-[#2076C7] transition-all bg-white">
                        <option value="">Select tenure</option>
                        <option>3 Months</option>
                        <option>6 Months</option>
                        <option>1 Year</option>
                        <option>2 Years</option>
                        <option>3 Years</option>
                      </select>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Existing loans? *
                      </label>
                      <div className="flex gap-4">
                        <label className="flex items-center gap-2 cursor-pointer">
                          <input
                            type="radio"
                            name="existing_loan"
                            className="w-4 h-4 text-[#2076C7] focus:ring-[#2076C7]"
                            value="Yes"
                          />{" "}
                          Yes
                        </label>
                        <label className="flex items-center gap-2 cursor-pointer">
                          <input
                            type="radio"
                            name="existing_loan"
                            className="w-4 h-4 text-[#2076C7] focus:ring-[#2076C7]"
                            value="No"
                          />{" "}
                          No
                        </label>
                      </div>
                    </div>
                  </div>
                </section>

                {/* Section 3 */}
                <section>
                  <div className="mb-6 pb-2 border-b border-gray-100">
                    <h3 className="text-xl font-bold text-[#1CADA3] flex items-center gap-2">
                      <span className="w-8 h-8 rounded-full bg-[#1CADA3]/10 flex items-center justify-center text-sm">
                        3
                      </span>
                      Securities Details
                    </h3>
                    <p className="text-sm text-gray-500 mt-1">
                      This helps us determine your eligible loan limit.
                    </p>
                  </div>

                  <div className="space-y-6">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-3">
                        Security Type (Multi-select) *
                      </label>
                      <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                        {[
                          "Mutual Funds",
                          "Listed Shares",
                          "Bonds",
                          "ETFs",
                          "Insurance Policy",
                          "Government Securities",
                        ].map((item) => (
                          <label
                            key={item}
                            className="flex items-center gap-3 p-3 border border-gray-200 rounded-xl cursor-pointer hover:bg-gray-50 transition-colors"
                          >
                            <input
                              type="checkbox"
                              className="w-4 h-4 rounded text-[#1CADA3] focus:ring-[#1CADA3]"
                            />
                            <span className="text-sm font-medium text-gray-700">
                              {item}
                            </span>
                          </label>
                        ))}
                      </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                          Current Market Value (₹) *
                        </label>
                        <input
                          type="number"
                          className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-[#1CADA3]/20 focus:border-[#1CADA3] transition-all"
                          placeholder="Approx. total value"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Are securities free from pledge? *
                        </label>
                        <div className="flex gap-4">
                          <label className="flex items-center gap-2 cursor-pointer">
                            <input
                              type="radio"
                              name="free_from_pledge"
                              className="w-4 h-4 text-[#1CADA3] focus:ring-[#1CADA3]"
                              value="Yes"
                            />{" "}
                            Yes
                          </label>
                          <label className="flex items-center gap-2 cursor-pointer">
                            <input
                              type="radio"
                              name="free_from_pledge"
                              className="w-4 h-4 text-[#1CADA3] focus:ring-[#1CADA3]"
                              value="No"
                            />{" "}
                            No
                          </label>
                        </div>
                      </div>
                    </div>

                    <div className="p-5 bg-gray-50 rounded-2xl border border-gray-100">
                      <h4 className="text-sm font-bold text-gray-800 mb-4">
                        Demat Account Details
                      </h4>
                      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                        <div>
                          <label className="block text-xs font-medium text-gray-500 mb-1">
                            DP Name *
                          </label>
                          <select className="w-full px-3 py-2 rounded-lg border border-gray-200 text-sm focus:ring-2 focus:ring-[#1CADA3]/20 focus:border-[#1CADA3] bg-white">
                            <option value="">Select</option>
                            <option>NSDL</option>
                            <option>CDSL</option>
                          </select>
                        </div>
                        <div>
                          <label className="block text-xs font-medium text-gray-500 mb-1">
                            DP ID *
                          </label>
                          <input
                            type="text"
                            className="w-full px-3 py-2 rounded-lg border border-gray-200 text-sm focus:ring-2 focus:ring-[#1CADA3]/20 focus:border-[#1CADA3]"
                            placeholder="Enter DP ID"
                          />
                        </div>
                        <div>
                          <label className="block text-xs font-medium text-gray-500 mb-1">
                            Client ID *
                          </label>
                          <input
                            type="text"
                            className="w-full px-3 py-2 rounded-lg border border-gray-200 text-sm focus:ring-2 focus:ring-[#1CADA3]/20 focus:border-[#1CADA3]"
                            placeholder="Enter Client ID"
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                </section>

                {/* Section 4 */}
                <section>
                  <div className="mb-6 pb-2 border-b border-gray-100">
                    <h3 className="text-xl font-bold text-[#2076C7] flex items-center gap-2">
                      <span className="w-8 h-8 rounded-full bg-[#2076C7]/10 flex items-center justify-center text-sm">
                        4
                      </span>
                      Declarations & Compliance
                    </h3>
                  </div>

                  <div className="grid md:grid-cols-3 gap-6 mb-6">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Resident Indian? *
                      </label>
                      <div className="flex gap-4">
                        <label className="flex items-center gap-2 cursor-pointer">
                          <input
                            type="radio"
                            name="resident"
                            className="w-4 h-4 text-[#2076C7] focus:ring-[#2076C7]"
                            value="Yes"
                          />{" "}
                          Yes
                        </label>
                        <label className="flex items-center gap-2 cursor-pointer">
                          <input
                            type="radio"
                            name="resident"
                            className="w-4 h-4 text-[#2076C7] focus:ring-[#2076C7]"
                            value="No"
                          />{" "}
                          No
                        </label>
                      </div>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Politically Exposed (PEP)? *
                      </label>
                      <div className="flex gap-4">
                        <label className="flex items-center gap-2 cursor-pointer">
                          <input
                            type="radio"
                            name="pep"
                            className="w-4 h-4 text-[#2076C7] focus:ring-[#2076C7]"
                            value="Yes"
                          />{" "}
                          Yes
                        </label>
                        <label className="flex items-center gap-2 cursor-pointer">
                          <input
                            type="radio"
                            name="pep"
                            className="w-4 h-4 text-[#2076C7] focus:ring-[#2076C7]"
                            value="No"
                          />{" "}
                          No
                        </label>
                      </div>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        History of loan default? *
                      </label>
                      <div className="flex gap-4">
                        <label className="flex items-center gap-2 cursor-pointer">
                          <input
                            type="radio"
                            name="default"
                            className="w-4 h-4 text-[#2076C7] focus:ring-[#2076C7]"
                            value="Yes"
                          />{" "}
                          Yes
                        </label>
                        <label className="flex items-center gap-2 cursor-pointer">
                          <input
                            type="radio"
                            name="default"
                            className="w-4 h-4 text-[#2076C7] focus:ring-[#2076C7]"
                            value="No"
                          />{" "}
                          No
                        </label>
                      </div>
                    </div>
                  </div>

                  <div className="space-y-3 bg-gray-50/50 p-4 rounded-xl border border-gray-100">
                    <label className="flex items-start gap-3 cursor-pointer">
                      <input
                        type="checkbox"
                        className="w-5 h-5 mt-0.5 rounded text-[#2076C7] focus:ring-[#2076C7]"
                      />
                      <span className="text-sm text-gray-600">
                        I authorize Infinity Arthvishva to share my details with
                        RBI-registered Banks/NBFCs for loan processing.
                      </span>
                    </label>
                    <label className="flex items-start gap-3 cursor-pointer">
                      <input
                        type="checkbox"
                        className="w-5 h-5 mt-0.5 rounded text-[#2076C7] focus:ring-[#2076C7]"
                      />
                      <span className="text-sm text-gray-600">
                        I consent to a credit bureau check to assess my
                        eligibility.
                      </span>
                    </label>
                  </div>
                </section>
              </form>
            </div>

            {/* Footer Action */}
            <div className="border-t border-gray-100 p-6 bg-gray-50 flex items-center justify-end gap-4">
              <button
                type="button"
                onClick={onClose}
                className="px-6 py-3 rounded-xl font-semibold text-gray-600 hover:bg-white border border-transparent hover:border-gray-200 transition-all"
              >
                Cancel
              </button>
              <button
                type="button"
                className="px-8 py-3 rounded-xl font-bold text-white bg-gradient-to-r from-[#2076C7] to-[#1CADA3] shadow-lg hover:shadow-xl hover:scale-[1.02] transition-all flex items-center gap-2"
              >
                Submit Application
                <CheckCircle className="w-5 h-5" />
              </button>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
