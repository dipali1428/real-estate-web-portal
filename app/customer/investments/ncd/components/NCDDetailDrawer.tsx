"use client";

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  X,
  Info,
  ShieldCheck,
  TrendingUp,
  Landmark,
  IndianRupee,
  Calendar,
  Clock,
  ArrowRight,
  ChevronRight,
  Zap,
  Calculator,
  Percent,
  CheckCircle2,
  AlertCircle
} from "lucide-react";
import { NCDData } from "../../../products/NCD/data/ncdData";

interface NCDDetailDrawerProps {
  ncd: NCDData | null;
  isOpen: boolean;
  onClose: () => void;
}

export default function NCDDetailDrawer({ ncd, isOpen, onClose }: NCDDetailDrawerProps) {
  const [investAmount, setInvestAmount] = useState<number>(0);
  const [totalReturns, setTotalReturns] = useState<{ interest: number; total: number }>({ interest: 0, total: 0 });

  useEffect(() => {
    if (ncd) {
      const min = parseInt(ncd.minInvest.replace(/[^0-9]/g, ""));
      setInvestAmount(min);
    }
  }, [ncd]);

  useEffect(() => {
    if (ncd && investAmount > 0) {
      const rate = parseFloat(ncd.interest.replace(/%/g, "")) / 100;
      const years = parseInt(ncd.tenure.split(" ")[0]) / 12;
      const interest = investAmount * rate * years;
      setTotalReturns({
        interest,
        total: investAmount + interest
      });
    }
  }, [ncd, investAmount]);

  if (!ncd) return null;

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-slate-900/60 backdrop-blur-sm z-[999]"
          />
          <motion.div
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ type: "spring", damping: 25, stiffness: 200 }}
            className="fixed right-0 top-0 h-full w-full md:w-[600px] bg-white shadow-2xl z-[1000] flex flex-col font-sans"
          >
            {/* Header */}
            <div className="p-6 border-b border-slate-100 flex items-center justify-between bg-gradient-to-r from-slate-50 to-white">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-blue-50 flex items-center justify-center border border-blue-100 shadow-sm">
                  <Landmark size={20} className="text-[#2076C7]" />
                </div>
                <div>
                  <h2 className="text-base font-black text-slate-800 uppercase tracking-tight leading-none">
                    {ncd.issuer}
                  </h2>
                  <p className="text-[10px] text-slate-400 font-bold uppercase tracking-widest mt-1">
                    {ncd.title}
                  </p>
                </div>
              </div>
              <button
                onClick={onClose}
                className="w-10 h-10 rounded-full hover:bg-slate-100 flex items-center justify-center transition-colors text-slate-400"
              >
                <X size={20} />
              </button>
            </div>

            {/* Content */}
            <div className="flex-1 overflow-y-auto p-6 space-y-8 scrollbar-thin scrollbar-thumb-slate-200">
              
              {/* Key Metrics Grid */}
              <div className="grid grid-cols-2 gap-4">
                <div className="bg-slate-50 rounded-2xl p-4 border border-slate-100 group hover:border-emerald-200 transition-all">
                  <p className="text-[9px] font-black text-slate-400 uppercase tracking-[0.2em] mb-2 flex items-center gap-2">
                    <TrendingUp size={12} className="text-[#1CADA3]" /> Yield p.a.
                  </p>
                  <p className="text-xl font-black text-[#1CADA3]">{ncd.interest}</p>
                </div>
                <div className="bg-slate-50 rounded-2xl p-4 border border-slate-100 group hover:border-blue-200 transition-all">
                  <p className="text-[9px] font-black text-slate-400 uppercase tracking-[0.2em] mb-2 flex items-center gap-2">
                    <ShieldCheck size={12} className="text-[#2076C7]" /> Rating
                  </p>
                  <p className="text-base font-black text-slate-800 uppercase tracking-tight">{ncd.rating}</p>
                  <p className="text-[9px] font-bold text-slate-500 uppercase">{ncd.ratingAgency}</p>
                </div>
              </div>

              {/* Status Banner */}
              <div className={`rounded-2xl px-4 py-3 flex items-center justify-between border ${
                ncd.status === 'Open' ? 'bg-emerald-50 border-emerald-100 text-emerald-700' :
                ncd.status === 'Upcoming' ? 'bg-amber-50 border-amber-100 text-amber-700' :
                'bg-slate-50 border-slate-200 text-slate-500'
              }`}>
                <div className="flex items-center gap-2 font-black text-[10px] uppercase tracking-widest leading-none">
                  <Zap size={14} className={ncd.status === 'Open' ? 'animate-pulse' : ''} />
                  Issue Status: {ncd.status}
                </div>
                <div className="text-[10px] font-bold">
                  {ncd.openDate} – {ncd.closeDate}
                </div>
              </div>

              {/* Yield Calculator */}
              <div className="bg-gradient-to-r from-[#2076C7] to-[#1CADA3] rounded-[2rem] p-6 text-white relative overflow-hidden shadow-xl">
                 <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full -translate-y-1/2 translate-x-1/2 blur-2xl pointer-events-none" />
                 <div className="flex items-center gap-2 mb-6 relative z-10">
                    <Calculator size={18} className="text-white" />
                    <h3 className="text-xs font-black uppercase tracking-[0.2em]">Yield Calculator</h3>
                 </div>

                 <div className="space-y-6 relative z-10">
                    <div>
                      <div className="flex justify-between items-end mb-4">
                        <label className="text-[10px] font-black uppercase tracking-widest text-white/70">Investment Amount</label>
                        <span className="text-lg font-black text-white">₹{investAmount.toLocaleString()}</span>
                      </div>
                      <input
                        type="range"
                        min={parseInt(ncd.minInvest.replace(/[^0-9]/g, ""))}
                        max={1000000}
                        step={10000}
                        value={investAmount}
                        onChange={(e) => setInvestAmount(Number(e.target.value))}
                        className="w-full h-1.5 bg-white/20 rounded-full appearance-none cursor-pointer accent-white"
                      />
                    </div>

                    <div className="grid grid-cols-2 gap-4 bg-white/10 rounded-2xl p-4 border border-white/20 backdrop-blur-sm">
                       <div>
                          <p className="text-[9px] font-black text-white/70 uppercase tracking-widest mb-1">Total Interest</p>
                          <p className="text-base font-black text-white">₹{Math.round(totalReturns.interest).toLocaleString()}</p>
                       </div>
                       <div className="text-right">
                          <p className="text-[9px] font-black text-white/70 uppercase tracking-widest mb-1">Maturity Value</p>
                          <p className="text-base font-black text-white">₹{Math.round(totalReturns.total).toLocaleString()}</p>
                       </div>
                    </div>
                 </div>
              </div>

              {/* Detailed Specs */}
              <div className="space-y-4">
                <h3 className="text-[10px] font-black text-slate-800 uppercase tracking-[0.3em] flex items-center gap-2">
                   <Info size={14} className="text-[#2076C7]" /> Technical Specifications
                </h3>
                <div className="grid grid-cols-2 gap-6 bg-slate-50/50 rounded-2xl p-6 border border-slate-100">
                   {[
                     { label: "ISIN Number", value: ncd.isin },
                     { label: "Security Type", value: ncd.securityType },
                     { label: "Face Value", value: ncd.faceValue },
                     { label: "Payout Frequency", value: ncd.frequency },
                     { label: "Allocation Ratio", value: ncd.allocationRatio },
                     { label: "Listing on", value: "NSE / BSE" }
                   ].map((spec, i) => (
                     <div key={i}>
                       <p className="text-[9px] font-black text-slate-400 uppercase tracking-widest mb-1">{spec.label}</p>
                       <p className="text-xs font-bold text-slate-700">{spec.value}</p>
                     </div>
                   ))}
                </div>
              </div>

              {/* Highlights & Rating Info */}
              <div className="space-y-6">
                 <div className="bg-blue-50/50 rounded-2xl p-5 border border-blue-100">
                    <h3 className="text-[10px] font-black text-[#2076C7] uppercase tracking-[0.2em] mb-4 flex items-center gap-2">
                       <ShieldCheck size={14} /> Credit Rating Rationale
                    </h3>
                    <p className="text-xs text-slate-600 font-medium leading-relaxed italic">
                      &quot;{ncd.creditRatingDetails}&quot;
                    </p>
                 </div>

                 <div className="space-y-3">
                   <h3 className="text-[10px] font-black text-slate-800 uppercase tracking-[0.2em] mb-2">Key Highlights</h3>
                   {ncd.highlights.map((highlight, i) => (
                     <div key={i} className="flex items-start gap-3 p-3 bg-white rounded-xl border border-slate-50 shadow-sm">
                        <CheckCircle2 size={16} className="text-[#1CADA3] shrink-0 mt-0.5" />
                        <span className="text-xs font-semibold text-slate-600 leading-tight">{highlight}</span>
                     </div>
                   ))}
                 </div>
              </div>

            </div>

            {/* Footer Actions */}
            <div className="p-6 border-t border-slate-100 bg-white shadow-[0_-10px_20px_-15px_rgba(0,0,0,0.1)]">
              {ncd.status === "Open" ? (
                <button className="w-full bg-[#2076C7] text-white py-4 rounded-2xl font-black text-xs uppercase tracking-[0.2em] shadow-[0_10px_20px_-10px_rgba(32,118,199,0.4)] hover:bg-[#1CADA3] transition-all flex items-center justify-center gap-3 active:scale-95 group">
                  Confirm Investment <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
                </button>
              ) : ncd.status === "Upcoming" ? (
                <button className="w-full bg-slate-100 text-slate-500 py-4 rounded-2xl font-black text-xs uppercase tracking-[0.2em] border border-slate-200 cursor-default flex items-center justify-center gap-3">
                   Subscription Starting Soon <AlertCircle size={16} />
                </button>
              ) : (
                <button disabled className="w-full bg-slate-50 text-slate-400 py-4 rounded-2xl font-black text-xs uppercase tracking-[0.2em] border border-slate-100 flex items-center justify-center">
                   Issue Closed
                </button>
              )}
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
