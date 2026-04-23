"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, Calendar, CreditCard, ChevronRight, CheckCircle2, AlertCircle, Info, TrendingUp, IndianRupee } from "lucide-react";

interface Fund {
  code: number | string;
  name: string;
  nav?: string | number;
}

interface OrderPlacementModalProps {
  isOpen: boolean;
  onClose: () => void;
  fund: Fund | null;
}

const FREQUENCIES = ["Weekly", "Monthly", "Quarterly", "Semi-Annually"];
const INSTALLMENT_DAYS = Array.from({ length: 28 }, (_, i) => i + 1);

export default function OrderPlacementModal({ isOpen, onClose, fund }: OrderPlacementModalProps) {
  const [step, setStep] = useState(1);
  const [investmentType, setInvestmentType] = useState<"LUMPSUM" | "SIP">("LUMPSUM");
  const [amount, setAmount] = useState<number>(5000); // Changed default from 0 to 5000
  const [frequency, setFrequency] = useState("Monthly");
  const [installmentDay, setInstallmentDay] = useState(5);
  const [isProcessing, setIsProcessing] = useState(false);

  // Mock bank info
  const bankAccount = {
    name: "HDFC Bank",
    accNo: "**** 4829",
    type: "Savings"
  };

  const handleNext = () => {
    if (step < 3) setStep(step + 1);
  };

  const handleBack = () => {
    if (step > 1) setStep(step - 1);
  };

  const handleConfirm = () => {
    setIsProcessing(true);
    // Simulate "paused" process as per user's instruction
    setTimeout(() => {
      setIsProcessing(false);
      setStep(4); // Success/Paused Step
    }, 1500);
  };

  if (!isOpen || !fund) return null;

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-[2001] flex items-center justify-center p-4">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
          className="absolute inset-0 bg-slate-900/60 backdrop-blur-md"
        />

        <motion.div
          initial={{ scale: 0.9, opacity: 0, y: 20 }}
          animate={{ scale: 1, opacity: 1, y: 0 }}
          exit={{ scale: 0.9, opacity: 0, y: 20 }}
          className="bg-white rounded-[2.5rem] shadow-2xl w-full max-w-lg overflow-hidden relative z-10 border border-slate-100 flex flex-col font-sans"
        >
          {/* Header */}
          <div className="p-8 border-b border-slate-50 flex justify-between items-center bg-slate-50/50">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-[#2076C7] to-[#1CADA3] flex items-center justify-center text-white font-bold text-xl shadow-lg">
                {fund.name.charAt(0)}
              </div>
              <div>
                <h3 className="text-xl font-black text-slate-900 leading-tight">{fund.name}</h3>
                <p className="text-[10px] font-bold text-slate-400 mt-1 uppercase tracking-widest leading-none">
                  {step === 4 ? "Transaction Logged" : `Step ${step} of 3: ${step === 1 ? "Investment Type" : step === 2 ? "Setup Details" : "Confirmation"}`}
                </p>
              </div>
            </div>
            <button onClick={onClose} className="p-2 hover:bg-white rounded-xl transition-all text-slate-400 hover:text-rose-500 shadow-sm">
              <X size={20} />
            </button>
          </div>

          {/* Progress Bar */}
          {step < 4 && (
            <div className="h-1.5 w-full bg-slate-100 flex">
              <div
                className="h-full bg-gradient-to-r from-[#2076C7] to-[#1CADA3] transition-all duration-500 ease-out"
                style={{ width: `${(step / 3) * 100}%` }}
              />
            </div>
          )}

          <div className="flex-1 p-8 overflow-y-auto">
            {step === 1 && (
              <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
                <div>
                  <label className="block text-[11px] font-black text-slate-400 uppercase tracking-widest mb-4">Select Investment Type</label>
                  <div className="grid grid-cols-2 gap-4">
                    <button
                      onClick={() => setInvestmentType("LUMPSUM")}
                      className={`relative p-6 rounded-3xl border-2 transition-all text-left flex flex-col items-center justify-center gap-3 ${investmentType === "LUMPSUM" ? "border-[#2076C7] bg-blue-50/50 shadow-inner" : "border-slate-100 hover:border-slate-200"
                        }`}
                    >
                      <div className={`p-3 rounded-2xl ${investmentType === "LUMPSUM" ? "bg-[#2076C7] text-white" : "bg-slate-100 text-slate-400"}`}>
                        <IndianRupee size={24} />
                      </div>
                      <div className="text-center">
                        <p className={`font-black text-sm ${investmentType === "LUMPSUM" ? "text-[#2076C7]" : "text-slate-600"}`}>Lumpsum</p>
                        <p className="text-[10px] font-bold text-slate-400">One-time</p>
                      </div>
                      {investmentType === "LUMPSUM" && (
                        <div className="absolute -top-2 -right-2 bg-[#2076C7] text-white p-1 rounded-full shadow-md">
                          <CheckCircle2 size={16} />
                        </div>
                      )}
                    </button>

                    <button
                      onClick={() => setInvestmentType("SIP")}
                      className={`relative p-6 rounded-3xl border-2 transition-all text-left flex flex-col items-center justify-center gap-3 ${investmentType === "SIP" ? "border-[#1CADA3] bg-teal-50/50 shadow-inner" : "border-slate-100 hover:border-slate-200"
                        }`}
                    >
                      <div className={`p-3 rounded-2xl ${investmentType === "SIP" ? "bg-[#1CADA3] text-white" : "bg-slate-100 text-slate-400"}`}>
                        <TrendingUp size={24} />
                      </div>
                      <div className="text-center">
                        <p className={`font-black text-sm ${investmentType === "SIP" ? "text-[#1CADA3]" : "text-slate-600"}`}>SIP</p>
                        <p className="text-[10px] font-bold text-slate-400">Monthly auto-invest</p>
                      </div>
                      {investmentType === "SIP" && (
                        <div className="absolute -top-2 -right-2 bg-[#1CADA3] text-white p-1 rounded-full shadow-md">
                          <CheckCircle2 size={16} />
                        </div>
                      )}
                    </button>
                  </div>
                </div>

                <div>
                  <label className="block text-[11px] font-black text-slate-400 uppercase tracking-widest mb-4">Investment Amount</label>
                  <div className="relative group">
                    <span className="absolute left-6 top-1/2 -translate-y-1/2 text-2xl font-black text-slate-300 group-focus-within:text-[#2076C7]">₹</span>
                    <input
                      type="number"
                      value={amount}
                      onChange={(e) => setAmount(Number(e.target.value))}
                      className="w-full pl-12 pr-6 py-5 bg-slate-50 border-2 border-transparent focus:border-[#2076C7] focus:bg-white rounded-2xl text-2xl font-black text-slate-900 transition-all outline-none"
                    />
                  </div>
                  <div className="flex gap-2 mt-4 overflow-x-auto pb-2 scrollbar-hide">
                    {[1000, 2000, 5000, 10000, 25000].map((val) => (
                      <button
                        key={val}
                        onClick={() => setAmount(val)}
                        className={`px-4 py-2 rounded-xl text-xs font-black transition-all whitespace-nowrap ${amount === val ? "bg-[#2076C7] text-white" : "bg-slate-100 text-slate-500 hover:bg-slate-200"
                          }`}
                      >
                        ₹{val.toLocaleString()}
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            )}

            {step === 2 && (
              <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
                {investmentType === "SIP" ? (
                  <>
                    <div>
                      <label className="block text-[11px] font-black text-slate-400 uppercase tracking-widest mb-4">SIP Frequency</label>
                      <div className="grid grid-cols-2 gap-3">
                        {FREQUENCIES.map((freq) => (
                          <button
                            key={freq}
                            onClick={() => setFrequency(freq)}
                            className={`p-4 rounded-2xl border-2 font-black text-xs transition-all ${frequency === freq ? "border-[#1CADA3] bg-teal-50 text-[#1CADA3]" : "border-slate-100 text-slate-400"
                              }`}
                          >
                            {freq}
                          </button>
                        ))}
                      </div>
                    </div>

                    <div>
                      <label className="block text-[11px] font-black text-slate-400 uppercase tracking-widest mb-4">Installment Date (Every Month)</label>
                      <div className="grid grid-cols-7 gap-2">
                        {INSTALLMENT_DAYS.map((day) => (
                          <button
                            key={day}
                            onClick={() => setInstallmentDay(day)}
                            className={`h-10 rounded-xl border flex items-center justify-center font-black text-xs transition-all ${installmentDay === day ? "bg-[#1CADA3] border-[#1CADA3] text-white shadow-lg" : "border-slate-100 text-slate-400 hover:border-slate-300"
                              }`}
                          >
                            {day}
                          </button>
                        ))}
                      </div>
                      <p className="mt-3 flex items-start gap-2 text-[10px] font-bold text-slate-400 bg-slate-50 p-3 rounded-xl border border-slate-100">
                        <Calendar size={14} className="mt-0.5 text-[#1CADA3]" />
                        Next installment will be on {installmentDay}th of the upcoming month.
                      </p>
                    </div>
                  </>
                ) : (
                  <div className="space-y-6">
                    <div className="bg-blue-50 p-6 rounded-[2rem] border border-blue-100 flex items-center gap-5">
                      <div className="w-14 h-14 bg-white rounded-2xl flex items-center justify-center text-[#2076C7] shadow-sm">
                        <Info size={28} />
                      </div>
                      <div>
                        <h4 className="font-black text-slate-900 text-sm">One-time Investment</h4>
                        <p className="text-xs font-bold text-slate-500 leading-relaxed">Your investment of ₹{amount.toLocaleString()} will be processed against the latest NAV available.</p>
                      </div>
                    </div>

                    <div className="p-6 bg-white border border-slate-100 rounded-[2rem] space-y-4 shadow-sm">
                      <div className="flex justify-between items-center pb-4 border-b border-slate-50">
                        <span className="text-xs font-bold text-slate-400 uppercase tracking-widest">Expected NAV Date</span>
                        <span className="text-xs font-black text-slate-700">Today (Before 3 PM)</span>
                      </div>
                      <div className="flex justify-between items-center">
                        <span className="text-xs font-bold text-slate-400 uppercase tracking-widest">Processing Time</span>
                        <span className="text-xs font-black text-slate-700">T + 2 Working Days</span>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            )}

            {step === 3 && (
              <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
                <div className="bg-slate-900 rounded-[2.5rem] p-8 text-white relative overflow-hidden shadow-2xl">
                  <div className="absolute top-0 right-0 w-32 h-32 bg-white/5 rounded-full -mr-16 -mt-16" />
                  <div className="absolute bottom-0 left-0 w-24 h-24 bg-[#1CADA3]/10 rounded-full -ml-12 -mb-12" />

                  <div className="relative z-10">
                    <p className="text-[10px] font-black text-white/50 uppercase tracking-widest mb-1">Total Payable Amount</p>
                    <h4 className="text-5xl font-black mb-6 tracking-tight">₹{amount.toLocaleString()}</h4>

                    <div className="space-y-4 pt-6 border-t border-white/10">
                      <div className="flex justify-between items-center">
                        <div className="flex items-center gap-3">
                          <CreditCard size={18} className="text-[#1CADA3]" />
                          <div>
                            <p className="font-black text-sm">{bankAccount.name}</p>
                            <p className="text-[10px] font-bold text-white/50">{bankAccount.type} ({bankAccount.accNo})</p>
                          </div>
                        </div>
                        <span className="text-[10px] font-black bg-white/10 px-2 py-1 rounded-md uppercase">Default</span>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="p-6 bg-rose-50 border border-rose-100 rounded-3xl flex items-center gap-4">
                  <div className="p-3 bg-white rounded-2xl text-rose-500 shadow-sm flex-shrink-0">
                    <AlertCircle size={24} />
                  </div>
                  <p className="text-xs font-bold text-rose-600 leading-snug">
                    Currently, payment integration is under maintenance. This transaction will be logged for tracking but actual payment will not be deducted.
                  </p>
                </div>
              </div>
            )}

            {step === 4 && (
              <div className="text-center space-y-8 py-10 animate-in zoom-in-95 fade-in duration-700">
                <div className="relative inline-block">
                  <div className="absolute inset-0 bg-emerald-100 rounded-full animate-ping opacity-25" />
                  <div className="w-24 h-24 bg-emerald-500 text-white rounded-full flex items-center justify-center shadow-xl shadow-emerald-500/20 relative z-10">
                    <CheckCircle2 size={48} />
                  </div>
                </div>

                <div>
                  <h3 className="text-3xl font-black text-slate-900 mb-3 tracking-tight">Process Paused</h3>
                  <p className="text-slate-500 font-bold max-w-sm mx-auto leading-relaxed">
                    We&apos;ve logged your intent to invest in <span className="text-[#2076C7]">{fund.name}</span>.
                    Due to missing payment gateway, the actual investment is currently <span className="text-rose-500">PAUSED</span>.
                  </p>
                </div>

                <div className="grid grid-cols-2 gap-4 p-8 bg-slate-50 rounded-[2.5rem]">
                  <div className="text-center">
                    <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1">Log ID</p>
                    <p className="text-sm font-black text-slate-900">#INF-{Math.floor(Math.random() * 90000) + 10000}</p>
                  </div>
                  <div className="text-center">
                    <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1">Intent Recorded</p>
                    <p className="text-sm font-black text-slate-900">{new Date().toLocaleDateString()}</p>
                  </div>
                </div>

                <button
                  onClick={onClose}
                  className="w-full py-5 bg-slate-900 text-white rounded-2xl font-black uppercase tracking-widest text-sm shadow-xl active:scale-95 transition-all"
                >
                  Close & Explore
                </button>
              </div>
            )}
          </div>

          {/* Footer Actions */}
          {step < 4 && (
            <div className="p-8 bg-white border-t border-slate-50 flex gap-4">
              {step > 1 && (
                <button
                  onClick={handleBack}
                  className="px-6 py-5 border-2 border-slate-100 text-slate-400 hover:text-slate-700 hover:border-slate-200 rounded-2xl font-black text-sm flex items-center justify-center transition-all"
                >
                  Back
                </button>
              )}

              <button
                onClick={step === 3 ? handleConfirm : handleNext}
                disabled={isProcessing}
                className="flex-1 py-5 bg-gradient-to-r from-[#2076C7] to-[#1CADA3] text-white rounded-2xl font-black uppercase tracking-widest text-sm flex items-center justify-center gap-3 shadow-xl hover:shadow-cyan-500/20 active:scale-95 transition-all disabled:opacity-50"
              >
                {isProcessing ? (
                  <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                ) : (
                  <>
                    {step === 3 ? "Process (Mock)" : "Continue"}
                    <ChevronRight size={18} />
                  </>
                )}
              </button>
            </div>
          )}
        </motion.div>
      </div>
    </AnimatePresence>
  );
}
