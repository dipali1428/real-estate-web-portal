"use client";

import React, { useState, useMemo } from "react";
import { motion } from "framer-motion";
import {
  X,
  FileText,
  RefreshCw,
  TrendingUp,
  Layers,
  CheckCircle2,
  IndianRupee,
  Calendar,
  Percent,
  Shield,
  ArrowRight,
  Calculator,
  Briefcase,
  CreditCard,
  User,
} from "lucide-react";

// ─── Plan Type Definitions ───
export interface PlanInfo {
  key: string;
  title: string;
  icon: React.ElementType;
  color: string;
  badge: string;
  rateRange: string;
  rateStart: string;
  amountRange: string;
  tenureRange: string;
  processingFee: string;
  keyBenefit: string;
  features: string[];
  eligibility: { label: string; value: string; icon: React.ElementType }[];
  documents: string[];
  prepayment: string;
}

// ─── Plan Templates ───
export const TERM_LOAN: PlanInfo = {
  key: "term-loan",
  title: "Term Loan",
  icon: FileText,
  color: "bg-sky-50 text-sky-500",
  badge: "Core Product",
  rateRange: "9.99% – 20.00% p.a.",
  rateStart: "9.99%",
  amountRange: "₹11,00,000 – ₹50,00,000",
  tenureRange: "36 – 84 Months",
  processingFee: "Up to 2.5% of loan amount",
  keyBenefit: "Pre-approved offers for salaried professionals with instant disbursal",
  features: [
    "Fully digital application with e-KYC verification",
    "No collateral or security required",
    "Flexible EMI options with step-up facility",
    "Instant approval for pre-qualified applicants",
  ],
  eligibility: [
    { label: "Age", value: "21 – 60 years", icon: User },
    { label: "Income", value: "Min ₹15,000/month", icon: IndianRupee },
    { label: "CIBIL Score", value: "700+", icon: CreditCard },
    { label: "Experience", value: "Min 1 year salaried", icon: Briefcase },
  ],
  documents: [
    "PAN Card & Aadhaar Card",
    "3 Months Salary Slips",
    "6 Months Bank Statement",
    "Passport Size Photograph",
    "Current Address Proof",
  ],
  prepayment: "Zero foreclosure after 12 EMIs (for floating rate)",
};

export const BALANCE_TRANSFER: PlanInfo = {
  key: "balance-transfer",
  title: "Balance Transfer",
  icon: RefreshCw,
  color: "bg-emerald-50 text-emerald-500",
  badge: "Save More",
  rateRange: "9.99% – 20.00% p.a.",
  rateStart: "9.99%",
  amountRange: "₹11,00,000 – ₹50,00,000",
  tenureRange: "36 – 84 Months",
  processingFee: "Up to 1.5% of transfer amount",
  keyBenefit: "Transfer your high-interest loan & save up to ₹1.5L on total interest",
  features: [
    "Lower interest rate than your existing lender",
    "Top-up available on balance transfer amount",
    "No pre-closure penalty on transferred loan",
    "Seamless transfer with minimal documentation",
  ],
  eligibility: [
    { label: "Age", value: "21 – 58 years", icon: User },
    { label: "Existing Loan", value: "Min 6 EMIs paid", icon: IndianRupee },
    { label: "CIBIL Score", value: "725+", icon: CreditCard },
    { label: "Repayment", value: "No defaults", icon: Briefcase },
  ],
  documents: [
    "Existing loan sanction letter",
    "12 Months repayment track record",
    "Latest loan outstanding statement",
    "PAN & Aadhaar Card",
    "3 Months Salary Slips",
  ],
  prepayment: "Zero pre-closure charges after 6 months",
};

export const OVERDRAFT_FACILITY: PlanInfo = {
  key: "overdraft",
  title: "Overdraft Facility",
  icon: TrendingUp,
  color: "bg-amber-50 text-amber-500",
  badge: "Flexible Credit",
  rateRange: "13.75% – 18.00% p.a.",
  rateStart: "13.75%",
  amountRange: "₹5,00,000 – ₹40,00,000",
  tenureRange: "36 – 96 Months",
  processingFee: "Up to 2.0% of sanctioned limit",
  keyBenefit: "Pay interest only on amount utilized — withdraw & repay anytime",
  features: [
    "Interest charged only on utilized amount",
    "Withdraw and repay multiple times within limit",
    "Renewable annually based on repayment track",
    "Dedicated OD account with cheque book facility",
  ],
  eligibility: [
    { label: "Age", value: "25 – 55 years", icon: User },
    { label: "Income", value: "Min ₹25,000/month", icon: IndianRupee },
    { label: "CIBIL Score", value: "750+", icon: CreditCard },
    { label: "Experience", value: "Min 2 years salaried", icon: Briefcase },
  ],
  documents: [
    "PAN Card & Aadhaar Card",
    "6 Months Salary Slips",
    "12 Months Bank Statement",
    "Company ID & appointment letter",
    "Property documents (if secured OD)",
  ],
  prepayment: "No prepayment penalty — repay anytime",
};

export const TOP_UP: PlanInfo = {
  key: "top-up",
  title: "Top Up",
  icon: Layers,
  color: "bg-violet-50 text-violet-500",
  badge: "Quick Top-Up",
  rateRange: "9.99% – 20.00% p.a.",
  rateStart: "9.99%",
  amountRange: "₹11,00,000 – ₹50,00,000",
  tenureRange: "36 – 84 Months",
  processingFee: "Up to 1.0% of top-up amount",
  keyBenefit: "Get additional funds on existing loan without fresh documentation",
  features: [
    "Minimal documentation — existing KYC reused",
    "Faster processing (under 24 hours)",
    "Can be clubbed with existing EMI",
    "Available after 6 months of regular repayment",
  ],
  eligibility: [
    { label: "Age", value: "21 – 58 years", icon: User },
    { label: "Existing Loan", value: "Min 6 EMIs paid", icon: IndianRupee },
    { label: "CIBIL Score", value: "700+", icon: CreditCard },
    { label: "Repayment", value: "No defaults in 12 months", icon: Briefcase },
  ],
  documents: [
    "Existing loan account number",
    "Latest 3 Months Salary Slips",
    "PAN Card (if not already on file)",
    "Latest bank statement (1 month)",
  ],
  prepayment: "Part-prepayment allowed after 3 EMIs",
};

// ─── Bank Groupings for Custom Rates ───
export const FOUR_PLAN_BANKS = [
  "ADITYA BIRLA FINANCE",
  "TATA CAPITAL",
  "BAJAJ FINANCE",
  "PIRAMAL CAPITAL",
  "KOTAK MAHINDRA",
];

const NBFC_BANK_GROUP = [
  "ADITYA BIRLA FINANCE",
  "BAJAJ FINANCE",
  "AXIS BANK",
  "AXIS FINANCE",
  "CHOLAMANDALAM",
  "CREDIT SAISON",
  "FIBE (EARLYSALARY)",
  "FINNABLE CREDIT",
  "INCRED FINANCIAL",
  "MUTHOOT FINANCE",
  "L&T FINANCE",
  "POONAWALLA FINCORP",
  "PIRAMAL CAPITAL",
  "PREFR (CREDIT VIDYA)",
  "SMFG INDIA CREDIT",
  "TATA CAPITAL",
  "UTKARSH SMALL FINANCE BANK"
];

export function getPlansForBank(bankName: string): PlanInfo[] {
  const basePlans = [TERM_LOAN, BALANCE_TRANSFER, TOP_UP];

  if (FOUR_PLAN_BANKS.includes(bankName)) {
    basePlans.push(OVERDRAFT_FACILITY);
  }

  // Apply specific overrides for the NBFC/Finance banks group
  if (NBFC_BANK_GROUP.includes(bankName)) {
    return basePlans.map(plan => {
      // Overdraft keeps its own definitions, only modify term/bt/topup
      if (plan.key === "overdraft") return plan;

      return {
        ...plan,
        rateRange: "11.50% – 30.00% p.a.",
        rateStart: "11.50%",
        amountRange: "₹1,00,000 – ₹50,00,000",
        tenureRange: "36 – 60 Months",
        eligibility: plan.eligibility.map(item =>
          item.label === "Age" ? { ...item, value: "22 – 60 years" } : item
        )
      };
    });
  }

  return basePlans;
}

// ─── Plan Detail Drawer Component ───
interface PlanDetailDrawerProps {
  plan: PlanInfo;
  bankName: string;
  onClose: () => void;
  onApply: (bankName: string, planKey: string) => void;
}

export default function PlanDetailDrawer({ plan, bankName, onClose, onApply }: PlanDetailDrawerProps) {
  const [emiAmount, setEmiAmount] = useState(500000);
  const [emiTenure, setEmiTenure] = useState(36);
  const emiRate = parseFloat(plan.rateStart);

  const monthlyEMI = useMemo(() => {
    const r = emiRate / 12 / 100;
    const n = emiTenure;
    const p = emiAmount;
    if (r === 0) return Math.round(p / n);
    const emi = (p * r * Math.pow(1 + r, n)) / (Math.pow(1 + r, n) - 1);
    return Math.round(emi);
  }, [emiAmount, emiTenure, emiRate]);

  const totalPayable = monthlyEMI * emiTenure;
  const totalInterest = totalPayable - emiAmount;

  return (
    <>
      {/* Backdrop */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        onClick={onClose}
        className="fixed inset-0 bg-black/40 backdrop-blur-sm z-50"
      />

      {/* Drawer */}
      <motion.div
        initial={{ x: "100%" }}
        animate={{ x: 0 }}
        exit={{ x: "100%" }}
        transition={{ type: "spring", damping: 30, stiffness: 300 }}
        className="fixed right-0 top-0 bottom-0 w-full sm:w-[520px] bg-white z-50 shadow-2xl overflow-y-auto"
      >
        {/* Header */}
        <div className="sticky top-0 bg-white z-10 border-b border-slate-100 p-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className={`w-10 h-10 rounded-xl flex items-center justify-center ${plan.color} shadow-sm`}>
                <plan.icon size={20} />
              </div>
              <div>
                <p className="text-[9px] font-black text-slate-400 uppercase tracking-[0.2em]">{bankName}</p>
                <h2 className="text-lg font-black text-slate-900 uppercase tracking-tight">{plan.title}</h2>
              </div>
            </div>
            <button
              onClick={onClose}
              className="w-9 h-9 rounded-xl bg-slate-100 flex items-center justify-center hover:bg-red-50 hover:text-red-400 transition-colors text-slate-400"
            >
              <X size={16} />
            </button>
          </div>
        </div>

        <div className="p-6 space-y-8">

          {/* Key Metrics Grid */}
          <div className="grid grid-cols-2 gap-3">
            {[
              { label: "Interest Rate", value: plan.rateRange, icon: Percent, accent: "text-[#2076C7]" },
              { label: "Loan Amount", value: plan.amountRange, icon: IndianRupee, accent: "text-emerald-600" },
              { label: "Tenure", value: plan.tenureRange, icon: Calendar, accent: "text-amber-600" },
              { label: "Processing Fee", value: plan.processingFee, icon: FileText, accent: "text-violet-600" },
            ].map((m) => (
              <div key={m.label} className="bg-slate-50 rounded-2xl p-4 border border-slate-100">
                <div className="flex items-center gap-2 mb-2">
                  <m.icon size={14} className="text-slate-400" />
                  <p className="text-[9px] font-black text-slate-400 uppercase tracking-widest">{m.label}</p>
                </div>
                <p className={`text-xs font-black ${m.accent}`}>{m.value}</p>
              </div>
            ))}
          </div>

          {/* Key Benefit */}
          <div className="bg-gradient-to-r from-blue-50 to-teal-50 rounded-2xl p-5 border border-blue-100">
            <p className="text-[9px] font-black text-[#2076C7] uppercase tracking-[0.2em] mb-2">Key Benefit</p>
            <p className="text-sm font-bold text-slate-700 leading-relaxed">{plan.keyBenefit}</p>
          </div>

          {/* Features */}
          <div>
            <h3 className="text-xs font-black text-slate-800 uppercase tracking-tight mb-4 flex items-center gap-2">
              <Shield size={14} className="text-[#1CADA3]" /> Plan Features
            </h3>
            <div className="space-y-3">
              {plan.features.map((f, i) => (
                <div key={i} className="flex items-start gap-3">
                  <CheckCircle2 size={15} className="text-[#1CADA3] mt-0.5 shrink-0" />
                  <p className="text-xs text-slate-600 font-medium leading-relaxed">{f}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Eligibility */}
          <div>
            <h3 className="text-xs font-black text-slate-800 uppercase tracking-tight mb-4 flex items-center gap-2">
              <User size={14} className="text-[#2076C7]" /> Eligibility at a Glance
            </h3>
            <div className="grid grid-cols-2 gap-3">
              {plan.eligibility.map((e) => (
                <div key={e.label} className="bg-white border border-slate-100 rounded-xl p-3">
                  <div className="flex items-center gap-2 mb-1">
                    <e.icon size={12} className="text-slate-400" />
                    <p className="text-[9px] font-black text-slate-400 uppercase tracking-widest">{e.label}</p>
                  </div>
                  <p className="text-[11px] font-black text-slate-800">{e.value}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Documents */}
          <div>
            <h3 className="text-xs font-black text-slate-800 uppercase tracking-tight mb-4 flex items-center gap-2">
              <FileText size={14} className="text-amber-500" /> Documents Required
            </h3>
            <div className="bg-slate-50 rounded-2xl p-4 border border-slate-100 space-y-2.5">
              {plan.documents.map((d, i) => (
                <div key={i} className="flex items-center gap-2.5">
                  <div className="w-1.5 h-1.5 rounded-full bg-[#1CADA3]" />
                  <p className="text-xs text-slate-600 font-medium">{d}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Prepayment Info */}
          <div className="bg-emerald-50 rounded-2xl p-4 border border-emerald-100">
            <p className="text-[9px] font-black text-emerald-600 uppercase tracking-[0.2em] mb-1">Prepayment / Foreclosure</p>
            <p className="text-xs font-bold text-emerald-700">{plan.prepayment}</p>
          </div>

          {/* Mini EMI Calculator */}
          <div className="bg-slate-50 rounded-2xl p-5 border border-slate-100">
            <h3 className="text-xs font-black text-slate-800 uppercase tracking-tight mb-5 flex items-center gap-2">
              <Calculator size={14} className="text-[#2076C7]" /> Quick EMI Estimate
            </h3>

            {/* Amount Slider */}
            <div className="mb-5">
              <div className="flex justify-between items-center mb-2">
                <p className="text-[10px] font-bold text-slate-500 uppercase tracking-wider">Loan Amount</p>
                <p className="text-sm font-black text-slate-800">₹{(emiAmount / 100000).toFixed(1)}L</p>
              </div>
              <input
                type="range"
                min={100000}
                max={5000000}
                step={50000}
                value={emiAmount}
                onChange={(e) => setEmiAmount(Number(e.target.value))}
                className="w-full h-1.5 bg-slate-200 rounded-full appearance-none cursor-pointer accent-[#2076C7]"
              />
              <div className="flex justify-between mt-1">
                <span className="text-[9px] text-slate-400 font-bold">₹1L</span>
                <span className="text-[9px] text-slate-400 font-bold">₹50L</span>
              </div>
            </div>

            {/* Tenure Slider */}
            <div className="mb-6">
              <div className="flex justify-between items-center mb-2">
                <p className="text-[10px] font-bold text-slate-500 uppercase tracking-wider">Tenure</p>
                <p className="text-sm font-black text-slate-800">{emiTenure} Months</p>
              </div>
              <input
                type="range"
                min={24}
                max={96}
                step={6}
                value={emiTenure}
                onChange={(e) => setEmiTenure(Number(e.target.value))}
                className="w-full h-1.5 bg-slate-200 rounded-full appearance-none cursor-pointer accent-[#1CADA3]"
              />
              <div className="flex justify-between mt-1">
                <span className="text-[9px] text-slate-400 font-bold">24 Mo</span>
                <span className="text-[9px] text-slate-400 font-bold">96 Mo</span>
              </div>
            </div>

            {/* EMI Result */}
            <div className="grid grid-cols-3 gap-3">
              <div className="bg-white rounded-xl p-3 text-center border border-slate-100">
                <p className="text-[8px] font-black text-slate-400 uppercase tracking-widest mb-1">Monthly EMI</p>
                <p className="text-sm font-black text-[#2076C7]">₹{monthlyEMI.toLocaleString("en-IN")}</p>
              </div>
              <div className="bg-white rounded-xl p-3 text-center border border-slate-100">
                <p className="text-[8px] font-black text-slate-400 uppercase tracking-widest mb-1">Total Interest</p>
                <p className="text-sm font-black text-amber-600">₹{totalInterest.toLocaleString("en-IN")}</p>
              </div>
              <div className="bg-white rounded-xl p-3 text-center border border-slate-100">
                <p className="text-[8px] font-black text-slate-400 uppercase tracking-widest mb-1">Total Payable</p>
                <p className="text-sm font-black text-slate-800">₹{totalPayable.toLocaleString("en-IN")}</p>
              </div>
            </div>
            <p className="text-[9px] text-slate-400 font-medium mt-3 text-center italic">
              *Indicative EMI at {plan.rateStart} p.a. Actual rate may vary based on profile.
            </p>
          </div>

          {/* Apply CTA */}
          <button
            onClick={() => onApply(bankName, plan.key)}
            className="w-full bg-gradient-to-r from-[#2076C7] to-[#1CADA3] text-white py-4 rounded-2xl font-black text-xs uppercase tracking-[0.2em] hover:shadow-lg hover:opacity-95 transition-all flex items-center justify-center gap-2"
          >
            Apply for {plan.title} <ArrowRight size={15} />
          </button>

          {/* Disclaimer */}
          <p className="text-[9px] text-slate-400 font-medium text-center leading-relaxed px-2">
            Terms, interest rates and eligibility are subject to lender discretion, RBI guidelines, and applicant credit profile. Please verify with {bankName} before final application.
          </p>
        </div>
      </motion.div>
    </>
  );
}
