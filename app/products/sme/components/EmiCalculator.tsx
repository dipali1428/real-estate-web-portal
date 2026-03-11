"use client";
import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import {
  Calculator,
  Clock,
  TrendingUp,
  ShieldCheck,
  Info,
  IndianRupee,
  Minus,
  Plus,
  ArrowUpRight,
} from "lucide-react";
import { useModal } from "@/app/context/ModalContext";

export const EMICalculator = () => {
  const { openSignup } = useModal();
  const [amount, setAmount] = useState(1000000);
  const [rate, setRate] = useState(12);
  const [tenure, setTenure] = useState(36);

  const [emi, setEmi] = useState(0);
  const [totalInterest, setTotalInterest] = useState(0);
  const [totalPayment, setTotalPayment] = useState(0);

  useEffect(() => {
    const r = rate / 12 / 100;
    const n = tenure;

    let emiValue;
    if (r === 0) {
      emiValue = amount / n;
    } else {
      emiValue = (amount * r * Math.pow(1 + r, n)) / (Math.pow(1 + r, n) - 1);
    }

    if (isFinite(emiValue)) {
      setEmi(Math.round(emiValue));
      const totalPay = emiValue * n;
      setTotalPayment(Math.round(totalPay));
      setTotalInterest(Math.round(totalPay - amount));
    }
  }, [amount, rate, tenure]);

  return (
    <div className="relative">
      <div className="flex flex-col lg:flex-row gap-6 sm:gap-8 lg:gap-16 items-start">
        {/* LEFT: CONTENT */}
        <div className="w-full lg:w-5/12 pt-4 lg:pt-12">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
          >
            <span className="inline-flex items-center gap-2 px-4 py-1.5 bg-gradient-to-r from-[#2076C7]/10 to-[#1CADA3]/10 text-[#2076C7] rounded-full text-xs font-bold uppercase tracking-wider mb-6 border border-[#2076C7]/20">
              <Calculator className="w-3.5 h-3.5 text-[#1CADA3]" />
              Business Finance
            </span>
            <h2 className="text-3xl md:text-4xl font-extrabold mb-6 font-sans leading-tight">
              <span className="text-transparent bg-clip-text bg-linear-to-r from-[#2076C7] via-[#1CADA3] to-[#2076C7]">
                SME Loan EMI Architect
              </span>
            </h2>
            <p className="text-slate-600 mb-10 text-lg leading-relaxed">
              Plan your business expansion with precision. Our EMI architect
              helps you visualize your repayment journey and optimize your
              monthly cash flows.
            </p>

            <div className="space-y-6">
              {[
                {
                  title: "Flexible Tenures",
                  desc: "Choose from 12 to 120 months based on your asset type.",
                  icon: Clock,
                },
                {
                  title: "Cash Flow Optimized",
                  desc: "Structure your EMIs to match your business revenue cycles.",
                  icon: TrendingUp,
                },
                {
                  title: "No Hidden Costs",
                  desc: "Transparent calculation with clear interest & principal split.",
                  icon: ShieldCheck,
                },
              ].map((benefit, i) => (
                <div key={i} className="flex items-start gap-4">
                  <div className="mt-1 bg-blue-50 p-2 rounded-xl shrink-0">
                    <benefit.icon className="w-5 h-5 text-[#2076C7]" />
                  </div>
                  <div>
                    <h4 className="font-bold text-slate-800 mb-1">
                      {benefit.title}
                    </h4>
                    <p className="text-sm text-slate-600">{benefit.desc}</p>
                  </div>
                </div>
              ))}

              <div className="mt-8 p-4 rounded-xl bg-blue-50 border border-blue-100 text-sm text-slate-700 leading-relaxed">
                <div className="flex items-start gap-2">
                  <Info className="w-4 h-4 text-[#2076C7] mt-[2px]" />
                  <p>
                    <span className="font-bold">Disclaimer:</span> This
                    calculator provides estimated EMI values. Final loan terms
                    and interest rates are subject to credit assessment and
                    lender policies.
                  </p>
                </div>
              </div>
            </div>
          </motion.div>
        </div>

        {/* RIGHT: CALCULATOR CARD */}
        <div className="w-full lg:w-7/12 max-w-full">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="bg-white rounded-2xl shadow-[0_10px_40px_rgb(0,0,0,0.08)] border border-slate-100 overflow-hidden"
          >
            <div className="bg-gradient-to-r from-[#2076C7] to-[#1CADA3] p-6 sm:p-8 text-white text-center">
              <h3 className="font-bold font-sans text-2xl mb-1">
                SME Loan Calculator
              </h3>
              <p className="text-white/90 text-sm font-medium">
                Calculate your monthly outflows instantly
              </p>
            </div>

            <div className="p-4 sm:p-8 md:p-10 space-y-8">
              {/* LOAN AMOUNT */}
              <div className="space-y-4">
                <div className="flex justify-between items-center">
                  <label className="text-sm font-black text-slate-700 uppercase tracking-widest flex items-center gap-2">
                    <IndianRupee className="w-4 h-4 text-[#2076C7]" />
                    Loan Amount
                  </label>
                  <div className="bg-blue-50 px-4 py-2 rounded-xl border border-blue-100">
                    <span className="text-lg font-black text-[#2076C7]">
                      ₹{amount.toLocaleString("en-IN")}
                    </span>
                  </div>
                </div>
                <div className="flex items-center gap-1.5 sm:gap-3">
                  <button
                    onClick={() => setAmount(Math.max(100000, amount - 50000))}
                    className="w-8 h-8 sm:w-9 sm:h-9 md:w-10 md:h-10 rounded-xl bg-slate-50 flex items-center justify-center text-[#2076C7] border border-slate-200 hover:bg-[#2076C7] hover:text-white transition-all shadow-sm"
                  >
                    <Minus size={18} strokeWidth={3} />
                  </button>
                  <input
                    type="range"
                    min="100000"
                    max="100000000"
                    step="50000"
                    value={amount}
                    onChange={(e) => setAmount(Number(e.target.value))}
                    className="w-full h-2.5 bg-slate-100 rounded-lg appearance-none cursor-pointer accent-[#2076C7]"
                  />
                  <button
                    onClick={() =>
                      setAmount(Math.min(100000000, amount + 50000))
                    }
                    className="w-8 h-8 sm:w-9 sm:h-9 md:w-10 md:h-10 rounded-xl bg-slate-50 flex items-center justify-center text-[#2076C7] border border-slate-200 hover:bg-[#2076C7] hover:text-white transition-all shadow-sm"
                  >
                    <Plus size={18} strokeWidth={3} />
                  </button>
                </div>
                <div className="flex justify-between text-[10px] font-bold text-slate-400 uppercase tracking-wider">
                  <span>₹1 Lakh</span>
                  <span>₹10 Crore</span>
                </div>
              </div>

              {/* INTEREST RATE */}
              <div className="space-y-4">
                <div className="flex justify-between items-center">
                  <label className="text-sm font-black text-slate-700 uppercase tracking-widest flex items-center gap-2">
                    <TrendingUp className="w-4 h-4 text-[#1CADA3]" />
                    Interest Rate (% p.a.)
                  </label>
                  <div className="bg-teal-50 px-4 py-2 rounded-xl border border-teal-100">
                    <span className="text-lg font-black text-[#1CADA3]">
                      {rate}%
                    </span>
                  </div>
                </div>
                <div className="flex items-center gap-1.5 sm:gap-3">
                  <button
                    onClick={() => setRate(Math.max(8, rate - 0.5))}
                    className="w-8 h-8 sm:w-9 sm:h-9 md:w-10 md:h-10 rounded-xl bg-slate-50 flex items-center justify-center text-[#1CADA3] border border-slate-200 hover:bg-[#1CADA3] hover:text-white transition-all shadow-sm"
                  >
                    <Minus size={18} strokeWidth={3} />
                  </button>
                  <input
                    type="range"
                    min="8"
                    max="24"
                    step="0.5"
                    value={rate}
                    onChange={(e) => setRate(Number(e.target.value))}
                    className="w-full h-2.5 bg-slate-100 rounded-lg appearance-none cursor-pointer accent-[#1CADA3]"
                  />
                  <button
                    onClick={() => setRate(Math.min(24, rate + 0.5))}
                    className="w-8 h-8 sm:w-9 sm:h-9 md:w-10 md:h-10 rounded-xl bg-slate-50 flex items-center justify-center text-[#1CADA3] border border-slate-200 hover:bg-[#1CADA3] hover:text-white transition-all shadow-sm"
                  >
                    <Plus size={18} strokeWidth={3} />
                  </button>
                </div>
                <div className="flex justify-between text-[10px] font-bold text-slate-400 uppercase tracking-wider">
                  <span>8% p.a.</span>
                  <span>24% p.a.</span>
                </div>
              </div>

              {/* TENURE */}
              <div className="space-y-4">
                <div className="flex justify-between items-center">
                  <label className="text-sm font-black text-slate-700 uppercase tracking-widest flex items-center gap-2">
                    <Clock className="w-4 h-4 text-[#2076C7]" />
                    Loan Tenure
                  </label>
                  <div className="bg-blue-50 px-4 py-2 rounded-xl border border-blue-100">
                    <span className="text-lg font-black text-[#2076C7]">
                      {tenure} Months
                    </span>
                  </div>
                </div>
                <div className="flex items-center gap-1.5 sm:gap-3">
                  <button
                    onClick={() => setTenure(Math.max(12, tenure - 6))}
                    className="w-8 h-8 sm:w-9 sm:h-9 md:w-10 md:h-10 rounded-xl bg-slate-50 flex items-center justify-center text-[#2076C7] border border-slate-200 hover:bg-[#2076C7] hover:text-white transition-all shadow-sm"
                  >
                    <Minus size={18} strokeWidth={3} />
                  </button>
                  <input
                    type="range"
                    min="12"
                    max="120"
                    step="6"
                    value={tenure}
                    onChange={(e) => setTenure(Number(e.target.value))}
                    className="w-full h-2.5 bg-slate-100 rounded-lg appearance-none cursor-pointer accent-[#2076C7]"
                  />
                  <button
                    onClick={() => setTenure(Math.min(120, tenure + 6))}
                    className="w-8 h-8 sm:w-9 sm:h-9 md:w-10 md:h-10 rounded-xl bg-slate-50 flex items-center justify-center text-[#2076C7] border border-slate-200 hover:bg-[#2076C7] hover:text-white transition-all shadow-sm"
                  >
                    <Plus size={18} strokeWidth={3} />
                  </button>
                </div>
                <div className="flex justify-between text-[10px] font-bold text-slate-400 uppercase tracking-wider">
                  <span>1 Year</span>
                  <span>10 Years</span>
                </div>
              </div>

              {/* OUTPUT SECTION */}
              <div className="bg-slate-50 rounded-2xl p-6 sm:p-8 border border-slate-200 relative overflow-hidden group">
                <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-[#2076C7]/5 to-[#1CADA3]/5 rounded-bl-full -mr-16 -mt-16 transition-transform group-hover:scale-110" />

                <div className="relative z-10 space-y-6">
                  <div className="text-center">
                    <p className="text-[10px] sm:text-xs font-black text-slate-400 uppercase tracking-[0.2em] mb-3">
                      Monthly EMI
                    </p>
                    <h3 className="text-[clamp(18px,5vw,48px)] font-extrabold bg-gradient-to-r from-[#2076C7] to-[#1CADA3] bg-clip-text text-transparent break-words leading-tight">
                      ₹{emi.toLocaleString("en-IN")}
                    </h3>
                  </div>

                  <div className="h-px bg-gradient-to-r from-transparent via-slate-200 to-transparent" />

                  <div className="grid grid-cols-2 gap-4">
                    <div className="text-center p-3 rounded-xl bg-white/50 border border-white shadow-sm">
                      <p className="text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-1">
                        Total Interest
                      </p>
                      <p className="text-base sm:text-lg font-bold text-[#2076C7]">
                        ₹{totalInterest.toLocaleString("en-IN")}
                      </p>
                    </div>
                    <div className="text-center p-3 rounded-xl bg-white/50 border border-white shadow-sm">
                      <p className="text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-1">
                        Total Payment
                      </p>
                      <p className="text-base sm:text-lg font-bold text-[#1CADA3]">
                        ₹{totalPayment.toLocaleString("en-IN")}
                      </p>
                    </div>
                  </div>

                  <button
                    onClick={openSignup}
                    className="w-full bg-gradient-to-r from-[#2076C7] to-[#1CADA3] text-white py-4 rounded-xl font-black text-lg shadow-lg hover:shadow-[0_8px_25px_rgb(32,118,199,0.3)] hover:-translate-y-1 transition-all flex items-center justify-center gap-2 group/btn cursor-pointer"
                  >
                    Get Detailed Quote
                    <ArrowUpRight className="w-5 h-5 group-hover/btn:translate-x-1 group-hover/btn:-translate-y-1 transition-transform" />
                  </button>
                </div>
              </div>

              <p className="text-center text-[10px] font-bold text-slate-400 uppercase tracking-widest">
                * Indicative Calculation as per input values
              </p>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
};
