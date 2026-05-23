"use client";
import { motion, AnimatePresence } from "framer-motion";
import {
  X,
  ShieldCheck,
  CheckCircle2,
  Percent,
  ArrowRight,
  Zap,
  IndianRupee,
  Calendar
} from "lucide-react";
import { VehicleLoanBank } from "./data";

interface BankDetailViewProps {
  bank: VehicleLoanBank | null;
  isOpen: boolean;
  onClose: () => void;
  onApplyNow: () => void;
}

export default function BankDetailView({ bank, isOpen, onClose, onApplyNow }: BankDetailViewProps) {
  if (!bank) return null;

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop — covers everything including bottom bank cards */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-slate-900/70 backdrop-blur-md z-[60]"
          />

          {/* Modal Container */}
          <div className="fixed inset-0 z-[70] flex items-center justify-center p-2 sm:p-4 md:p-6 pointer-events-none">
            <motion.div
              initial={{ opacity: 0, scale: 0.9, y: 40 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 40 }}
              transition={{ type: "spring", duration: 0.5, bounce: 0.3 }}
              className="relative bg-white rounded-2xl sm:rounded-[2.5rem] shadow-2xl w-full max-w-4xl max-h-[95vh] sm:max-h-[92vh] overflow-hidden pointer-events-auto border border-slate-200 flex flex-col font-sans"
            >
              {/* ── Close Button (inside card, top-right) ── */}
              <div className="absolute top-3 right-3 sm:top-5 sm:right-5 z-10">
                <button
                  onClick={onClose}
                  className="group w-9 h-9 sm:w-10 sm:h-10 flex items-center justify-center rounded-full bg-white/90 backdrop-blur-sm border border-slate-200 text-slate-400 hover:bg-red-50 hover:border-red-200 hover:text-red-500 transition-all shadow-sm"
                  title="Close"
                >
                  <X size={18} className="group-hover:rotate-90 transition-transform duration-200" />
                </button>
              </div>

              <div className="overflow-y-auto flex-1">
                {/* ── Bank Identity Header ── */}
                <div className="px-4 sm:px-8 pb-5 sm:pb-8 pt-8 sm:pt-10 text-center border-b border-slate-100 bg-slate-50/30">
                  <span className="inline-flex items-center gap-1.5 px-3 py-1 bg-blue-50 text-blue-600 rounded-lg text-[10px] font-black uppercase tracking-widest border border-blue-100/60 mb-3 sm:mb-4">
                    Verified Vehicle Finance Partner
                  </span>
                  <h1 className="text-2xl sm:text-3xl md:text-4xl font-black tracking-tight bg-gradient-to-r from-[#2076C7] to-[#1CADA3] bg-clip-text text-transparent">
                    {bank.name}
                  </h1>
                  <p className="text-xs sm:text-sm text-slate-500 font-medium mt-1 uppercase tracking-wider">{bank.tagline}</p>
                </div>

                {/* ── Two Content Cards ── */}
                <div className="p-4 sm:p-6 md:p-8 grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6">

                  {/* Eligibility Card */}
                  <div className="rounded-3xl border border-emerald-100 bg-gradient-to-br from-emerald-50/60 to-white overflow-hidden shadow-sm">
                    <div className="flex items-center gap-3 px-6 py-5 border-b border-emerald-100 bg-emerald-50/40">
                      <div className="w-10 h-10 rounded-xl bg-white text-emerald-600 flex items-center justify-center shadow-sm border border-emerald-100">
                        <CheckCircle2 size={20} strokeWidth={2.5} />
                      </div>
                      <h3 className="text-sm font-black text-slate-800 uppercase tracking-wider">Eligibility Requirements</h3>
                    </div>
                    <ul className="divide-y divide-emerald-50">
                      {bank.details.eligibility.map((item, i) => (
                        <li key={i} className="flex items-start gap-4 px-6 py-5 hover:bg-emerald-50/40 transition-colors group">
                          <div className="mt-1 w-5 h-5 rounded-full border border-emerald-200 bg-white flex items-center justify-center shrink-0 group-hover:border-emerald-400 transition-colors">
                            <div className="w-2 h-2 rounded-full bg-emerald-200 group-hover:bg-emerald-500 transition-colors" />
                          </div>
                          <p className="text-sm font-semibold text-slate-600 leading-relaxed">{item}</p>
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* Key Offer Details Card */}
                  <div className="rounded-3xl border border-blue-100 bg-gradient-to-br from-blue-50/60 to-white overflow-hidden shadow-sm">
                    <div className="flex items-center gap-3 px-6 py-5 border-b border-blue-100 bg-blue-50/40">
                      <div className="w-10 h-10 rounded-xl bg-white text-blue-600 flex items-center justify-center shadow-sm border border-blue-100">
                        <Percent size={20} strokeWidth={2.5} />
                      </div>
                      <h3 className="text-sm font-black text-slate-800 uppercase tracking-wider">Key Offer Details</h3>
                    </div>
                    <ul className="divide-y divide-blue-50">
                      {[
                        { label: "Interest Rate", value: bank.interestRate, icon: Percent },
                        { label: "Processing Fee", value: bank.processingFee, icon: IndianRupee },
                        { label: "Max Funding", value: bank.details.maxLoanAmount, icon: Zap },
                        { label: "Max Tenure", value: bank.details.maxTenure, icon: Calendar },
                      ].map((item, i) => (
                        <li key={i} className="flex items-center justify-between px-6 py-5 hover:bg-blue-50/40 transition-colors group">
                          <div className="flex items-center gap-3">
                            <div className="w-5 h-5 rounded-full border border-blue-200 bg-white flex items-center justify-center shrink-0 group-hover:border-blue-400 transition-colors">
                              <div className="w-2 h-2 rounded-full bg-blue-200 group-hover:bg-blue-500 transition-colors" />
                            </div>
                            <p className="text-sm font-semibold text-slate-500 leading-snug">{item.label}</p>
                          </div>
                          <span className="text-sm font-black text-slate-800">{item.value}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>

                {/* ── Apply CTA ── */}
                <div className="px-4 sm:px-6 pb-8 sm:pb-12 pt-2 flex flex-col items-center">
                  <button
                    onClick={onApplyNow}
                    className="w-full sm:w-auto px-8 sm:px-16 md:px-24 py-3.5 sm:py-4 bg-gradient-to-r from-[#2076C7] to-[#1CADA3] text-white rounded-2xl font-black text-sm uppercase tracking-[0.15em] shadow-lg shadow-blue-500/20 hover:shadow-blue-500/40 hover:-translate-y-0.5 transition-all active:scale-[0.98] flex items-center justify-center gap-3 group"
                  >
                    Apply Now
                    <ArrowRight
                      size={18}
                      className="group-hover:translate-x-1 transition-transform"
                    />
                  </button>
                  <p className="text-center text-[10px] font-bold text-slate-400 mt-4 sm:mt-5 flex items-center justify-center gap-2">
                    <ShieldCheck size={14} className="text-emerald-500" />
                    Fast Approval · Secure &amp; Transparent Process
                  </p>
                </div>
              </div>
            </motion.div>
          </div>
        </>
      )}
    </AnimatePresence>
  );
}
