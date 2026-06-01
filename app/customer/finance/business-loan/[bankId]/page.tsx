"use client";

import React, { useState, useMemo } from "react";
import { useParams, useRouter } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import {
  X,
  CheckCircle2,
  Percent,
  ArrowRight,
  Briefcase,
  ArrowUpRight,
  Repeat,
  Zap,
  Landmark,
  FileText,
  User,
  IndianRupee,
  Calendar,
  Shield,
  Calculator,
} from "lucide-react";
import { businessLoanBanks } from "../components/data";
import BusinessLoanForm from "../../../../dashboard/leadmanagement/forms/businessloanform";

// ─── Plan Types & Product Templates ───
interface ProductPlan {
  key: string;
  title: string;
  icon: React.ElementType;
  color: string;
  badge: string;
  keyBenefit: string;
  features: string[];
  documents: string[];
}

const productPlanData: Record<string, ProductPlan> = {
  "Term Loan": {
    key: "term-loan",
    title: "Term Loan",
    icon: Briefcase,
    color: "bg-sky-50 text-sky-600 border-sky-100",
    badge: "Core Product",
    keyBenefit: "Pre-approved business term loan for scaling operations with quick disbursal",
    features: [
      "Fully digital application with high-speed approval",
      "No collateral or third-party security required",
      "Flexible monthly or structured EMI repayment options",
      "Special discounted rates for MSMEs and registered startups",
    ],
    documents: [
      "PAN Card & Aadhaar Card of all partners/promoters",
      "Business Registration Proof (GST/Trade License/MSME)",
      "Last 12 months business bank account statements",
      "Latest 2 years Income Tax Returns (ITR) & Balance Sheet",
    ],
  },
  "Balance Transfer": {
    key: "balance-transfer",
    title: "Balance Transfer",
    icon: Repeat,
    color: "bg-emerald-50 text-emerald-600 border-emerald-100",
    badge: "Save More",
    keyBenefit: "Transfer your high-interest business loan & lower your monthly EMI burden",
    features: [
      "Significantly lower interest rates compared to other lenders",
      "Attractive top-up loan facility available up to 100% value",
      "Seamless transfer process handled by relationship managers",
      "Zero foreclosure penalty on your pre-existing business loan",
    ],
    documents: [
      "Existing business loan sanction letter & repayment track",
      "Latest loan outstanding statement from present lender",
      "PAN, Aadhaar & Business Registration Proof",
      "Last 6 months business bank account statements",
    ],
  },
  "Top up": {
    key: "top-up",
    title: "Top Up",
    icon: ArrowUpRight,
    color: "bg-violet-50 text-violet-600 border-violet-100",
    badge: "Quick Top-Up",
    keyBenefit: "Get additional business funds on your existing loan with zero fresh documents",
    features: [
      "Instant processing and approval under 24 hours",
      "Minimal paper requirements using historical credit profiles",
      "Combine top-up funds seamlessly into single current monthly EMI",
      "High loan limit based on previous timely repayments",
    ],
    documents: [
      "Existing loan account number & active verification",
      "Last 3 months business current account statements",
      "Updated PAN & Aadhaar details (if changed)",
    ],
  },
  "OD": {
    key: "overdraft",
    title: "Overdraft Limit",
    icon: Zap,
    color: "bg-amber-50 text-amber-600 border-amber-100",
    badge: "Flexible Credit",
    keyBenefit: "Manage your daily working capital needs with a flexible overdraft limit",
    features: [
      "Interest charged solely on utilized overdraft amount and days",
      "Limit linked directly with business current account operations",
      "Withdraw, utilize and repay multiple times within limit",
      "Annual renewal based on current business turnover metrics",
    ],
    documents: [
      "12 months current account bank statements (active operations)",
      "Last 1 year GST filing history and tax payments",
      "PAN Card, Aadhaar Card & Business Address Verification",
      "Latest audited financial statements & cash flow details",
    ],
  },
};

export default function BankDetailPage() {
  const params = useParams();
  const router = useRouter();

  const bankId = params?.bankId as string;
  const bank = businessLoanBanks.find((b) => b.slug === bankId);

  const [selectedPlan, setSelectedPlan] = useState<any | null>(null);
  const [isFormOpen, setIsFormOpen] = useState(false);

  // Scroll to top on mount / bankId change to fix Next.js scroll container persistence
  React.useEffect(() => {
    window.scrollTo({ top: 0, left: 0, behavior: "instant" as any });
    const scrollContainers = document.querySelectorAll("main, .overflow-y-auto");
    scrollContainers.forEach((container) => {
      container.scrollTop = 0;
    });
  }, [bankId]);

  // EMI Calculator Local States (for the Drawer)
  const [emiAmount, setEmiAmount] = useState(1000000);
  const [emiTenure, setEmiTenure] = useState(36);

  // Dynamic mapping of products from bank details
  const bankPlans = useMemo(() => {
    if (!bank) return [];
    return bank.details.products.map((p) => {
      const template = productPlanData[p] || {
        key: p.toLowerCase().replace(/\s+/g, "-"),
        title: p,
        icon: Briefcase,
        color: "bg-slate-50 text-slate-600 border-slate-100",
        badge: "Partner Product",
        keyBenefit: `Tailored financial solution for ${bank.name} ${p}`,
        features: bank.details.benefits || ["Fast approval", "Minimal paperwork"],
        documents: bank.details.documents || ["PAN Card", "Aadhaar Card"],
      };

      const maxLoan = bank.details.maxLoanAmount || "₹50 Lakhs";
      const maxTenure = bank.details.maxTenure || "60 Months";

      return {
        ...template,
        rateRange: bank.interestRate,
        amountRange: `₹1 Lakh - ${maxLoan}`,
        tenureRange: `12 - ${maxTenure}`,
        processingFee: bank.processingFee,
      };
    });
  }, [bank]);

  if (!bank) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen bg-[#F8FAFC]">
        <div className="bg-white p-12 rounded-[2rem] shadow-sm border border-slate-100 text-center">
          <h1 className="text-2xl font-black text-slate-800 mb-4">Bank Not Found</h1>
          <button
            onClick={() => router.back()}
            className="px-8 py-3 bg-blue-600 text-white rounded-2xl font-bold transition hover:bg-blue-700"
          >
            Go Back
          </button>
        </div>
      </div>
    );
  }

  // Parse interest rate for calculator
  const emiRate = parseFloat(bank.interestRate.replace(/[^0-9.]/g, "")) || 16.50;

  // Monthly EMI Calculation
  const monthlyEMI = Math.round(
    (() => {
      const r = emiRate / 12 / 100;
      const n = emiTenure;
      const p = emiAmount;
      if (r === 0) return p / n;
      return (p * r * Math.pow(1 + r, n)) / (Math.pow(1 + r, n) - 1);
    })()
  );

  const totalPayable = monthlyEMI * emiTenure;
  const totalInterest = totalPayable - emiAmount;

  return (
    <div className="min-h-screen bg-[#F8FAFC] py-8 px-4 flex flex-col items-center font-sans leading-relaxed">
      <div className="w-full max-w-6xl bg-white border border-slate-200 rounded-[2.5rem] shadow-xl shadow-slate-200/50 overflow-hidden flex flex-col">
        
        {/* Panel Header */}
        <div className="p-6 md:px-10 md:py-8 border-b border-slate-100 bg-gradient-to-r from-slate-50 to-white flex justify-between items-center">
          <div className="flex items-center gap-4 text-left">
            <div className="w-12 h-12 rounded-2xl bg-teal-50 flex items-center justify-center shadow-sm">
              <Landmark size={22} className="text-[#1CADA3]" />
            </div>
            <div>
              <p className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em]">Loan Plans For</p>
              <h2 className="text-lg md:text-xl font-black text-transparent bg-clip-text bg-gradient-to-r from-[#2076C7] to-[#1CADA3] uppercase tracking-tight">
                {bank.name}
              </h2>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <span className="hidden sm:inline text-[9px] font-black text-slate-400 uppercase tracking-widest bg-slate-50 px-3 py-1.5 rounded-lg border border-slate-100">
              {bankPlans.length} Plans
            </span>
            <button
              onClick={() => router.back()}
              className="w-9 h-9 rounded-xl bg-slate-100 flex items-center justify-center hover:bg-red-50 hover:text-red-400 transition-colors text-slate-400"
              title="Go Back"
            >
              <X size={16} />
            </button>
          </div>
        </div>

        {/* Enhanced Plan Cards Grid */}
        <div className="p-6 md:p-10 text-left">
          <div className={`grid grid-cols-1 sm:grid-cols-2 ${bankPlans.length >= 4 ? "lg:grid-cols-4" : "lg:grid-cols-3"} gap-6`}>
            {bankPlans.map((plan, idx) => {
              const Icon = plan.icon;
              return (
                <motion.div
                  key={plan.key}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: idx * 0.08 }}
                  className="group border border-slate-100 rounded-[1.75rem] p-5 hover:shadow-xl hover:border-blue-100 transition-all flex flex-col bg-white"
                >
                  {/* Icon + Badge */}
                  <div className="flex items-start justify-between mb-4">
                    <div className={`w-10 h-10 rounded-xl flex items-center justify-center ${plan.color} shadow-sm group-hover:scale-110 transition-transform`}>
                      <Icon size={18} />
                    </div>
                    <span className="text-[10px] font-black uppercase tracking-widest bg-blue-50 text-[#2076C7] px-2.5 py-1 rounded-md border border-blue-100">
                      {plan.badge}
                    </span>
                  </div>

                  {/* Title */}
                  <h3 className="text-base font-black text-slate-800 uppercase tracking-tight mb-3">{plan.title}</h3>

                  {/* Key Metrics */}
                  <div className="space-y-2 mb-4 flex-1">
                    <div className="flex items-center gap-2">
                      <Percent size={13} className="text-slate-400 shrink-0" />
                      <p className="text-xs font-bold text-slate-500">
                        Rate: <span className="text-[#2076C7] font-black">{plan.rateRange}</span>
                      </p>
                    </div>
                    <div className="flex items-center gap-2">
                      <IndianRupee size={13} className="text-slate-400 shrink-0" />
                      <p className="text-xs font-bold text-slate-500">
                        Amount: <span className="text-slate-800 font-black">{plan.amountRange}</span>
                      </p>
                    </div>
                    <div className="flex items-center gap-2">
                      <Calendar size={13} className="text-slate-400 shrink-0" />
                      <p className="text-xs font-bold text-slate-500">
                        Tenure: <span className="text-slate-800 font-black">{plan.tenureRange}</span>
                      </p>
                    </div>
                    <div className="flex items-center gap-2">
                      <FileText size={13} className="text-slate-400 shrink-0" />
                      <p className="text-xs font-bold text-slate-500">
                        Processing Fee: <span className="text-slate-800 font-black">{plan.processingFee}</span>
                      </p>
                    </div>
                  </div>

                  {/* Key Benefit */}
                  <p className="text-xs text-slate-500 font-semibold leading-relaxed mb-5 border-t border-slate-50 pt-3">
                    {plan.keyBenefit}
                  </p>

                  {/* View Details CTA */}
                  <button
                    onClick={() => setSelectedPlan(plan)}
                    className="w-full bg-gradient-to-r from-[#2076C7] to-[#1CADA3] hover:opacity-90 hover:shadow-lg text-white text-xs font-black uppercase tracking-[0.15em] py-3.5 rounded-xl transition-all flex items-center justify-center gap-2"
                  >
                    View Full Details <ArrowRight size={13} />
                  </button>
                </motion.div>
              );
            })}
          </div>

          {/* Trust Footer */}
          <div className="mt-10 pt-6 border-t border-slate-100 flex flex-wrap items-center justify-center sm:justify-start gap-6">
            {["RBI Regulated Partner", "Zero Hidden Charges", "100% Paperless Process"].map((tag) => (
              <div key={tag} className="flex items-center gap-1.5 text-emerald-600 text-[10px] font-black uppercase tracking-wide">
                <CheckCircle2 size={13} />
                {tag}
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* ─── Plan Details Modal Drawer ─── */}
      <AnimatePresence>
        {selectedPlan && (
          <>
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setSelectedPlan(null)}
              className="fixed inset-0 bg-black/40 backdrop-blur-sm z-50"
            />

            {/* Modal */}
            <motion.div
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 20 }}
              transition={{ type: "spring", damping: 25, stiffness: 300 }}
              className="fixed left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-[calc(100%-2rem)] sm:w-[560px] max-h-[90vh] bg-white z-50 shadow-2xl rounded-[2.5rem] overflow-hidden flex flex-col text-left"
            >
              {/* Header */}
              <div className="sticky top-0 bg-white z-10 border-b border-slate-100 p-6">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className={`w-10 h-10 rounded-xl flex items-center justify-center ${selectedPlan.color} shadow-sm`}>
                      {React.createElement(selectedPlan.icon, { size: 20 })}
                    </div>
                    <div>
                      <p className="text-[9px] font-black text-slate-400 uppercase tracking-[0.2em]">{bank.name}</p>
                      <h2 className="text-lg font-black text-slate-900 uppercase tracking-tight">{selectedPlan.title}</h2>
                    </div>
                  </div>
                  <button
                    onClick={() => setSelectedPlan(null)}
                    className="w-9 h-9 rounded-xl bg-slate-100 flex items-center justify-center hover:bg-red-50 hover:text-red-400 transition-colors text-slate-400"
                  >
                    <X size={16} />
                  </button>
                </div>
              </div>

              {/* Scrollable Content */}
              <div className="p-6 space-y-8 overflow-y-auto flex-1 custom-scrollbar">
                
                {/* Key Metrics Grid */}
                <div className="grid grid-cols-2 gap-3">
                  {[
                    { label: "Interest Rate", value: selectedPlan.rateRange, icon: Percent, accent: "text-[#2076C7]" },
                    { label: "Loan Amount", value: selectedPlan.amountRange, icon: IndianRupee, accent: "text-emerald-600" },
                    { label: "Tenure", value: selectedPlan.tenureRange, icon: Calendar, accent: "text-amber-600" },
                    { label: "Processing Fee", value: selectedPlan.processingFee, icon: FileText, accent: "text-violet-600" },
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
                  <p className="text-sm font-bold text-slate-700 leading-relaxed">{selectedPlan.keyBenefit}</p>
                </div>

                {/* Plan Features */}
                <div>
                  <h3 className="text-xs font-black text-slate-800 uppercase tracking-tight mb-4 flex items-center gap-2">
                    <Shield size={14} className="text-[#1CADA3]" /> Plan Features
                  </h3>
                  <div className="space-y-3">
                    {selectedPlan.features.map((f: string, i: number) => (
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
                    <User size={14} className="text-[#2076C7]" /> Eligibility Requirements
                  </h3>
                  <div className="bg-slate-50 rounded-2xl p-4 border border-slate-100 space-y-3">
                    {bank.details.eligibility.map((el: string, i: number) => (
                      <div key={i} className="flex items-start gap-3">
                        <div className="mt-1 w-3.5 h-3.5 rounded-full border border-blue-200 bg-white flex items-center justify-center shrink-0">
                          <div className="w-1.5 h-1.5 rounded-full bg-[#2076C7]" />
                        </div>
                        <p className="text-xs text-slate-600 font-medium leading-relaxed">{el}</p>
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
                    {selectedPlan.documents.map((d: string, i: number) => (
                      <div key={i} className="flex items-center gap-2.5">
                        <div className="w-1.5 h-1.5 rounded-full bg-[#1CADA3]" />
                        <p className="text-xs text-slate-600 font-semibold">{d}</p>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Mini EMI Calculator */}
                <div className="bg-slate-50 rounded-2xl p-5 border border-slate-100">
                  <h3 className="text-xs font-black text-slate-800 uppercase tracking-tight mb-5 flex items-center gap-2">
                    <Calculator size={14} className="text-[#2076C7]" /> Quick Business EMI Estimate
                  </h3>

                  {/* Amount Slider */}
                  <div className="mb-5">
                    <div className="flex justify-between items-center mb-2">
                      <p className="text-[10px] font-bold text-slate-500 uppercase tracking-wider">Loan Amount</p>
                      <p className="text-sm font-black text-slate-800">₹{(emiAmount / 100000).toFixed(1)} Lakhs</p>
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
                      <span className="text-[9px] text-slate-400 font-bold">₹1 Lakh</span>
                      <span className="text-[9px] text-slate-400 font-bold">₹50 Lakhs</span>
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
                      min={12}
                      max={60}
                      step={6}
                      value={emiTenure}
                      onChange={(e) => setEmiTenure(Number(e.target.value))}
                      className="w-full h-1.5 bg-slate-200 rounded-full appearance-none cursor-pointer accent-[#1CADA3]"
                    />
                    <div className="flex justify-between mt-1">
                      <span className="text-[9px] text-slate-400 font-bold">12 Months</span>
                      <span className="text-[9px] text-slate-400 font-bold">60 Months</span>
                    </div>
                  </div>

                  {/* EMI Result */}
                  <div className="grid grid-cols-3 gap-3">
                    <div className="bg-white rounded-xl p-3 text-center border border-slate-100">
                      <p className="text-[8px] font-black text-slate-400 uppercase tracking-widest mb-1">Monthly EMI</p>
                      <p className="text-xs sm:text-sm font-black text-[#2076C7]">₹{monthlyEMI.toLocaleString("en-IN")}</p>
                    </div>
                    <div className="bg-white rounded-xl p-3 text-center border border-slate-100">
                      <p className="text-[8px] font-black text-slate-400 uppercase tracking-widest mb-1">Total Interest</p>
                      <p className="text-xs sm:text-sm font-black text-amber-600">₹{totalInterest.toLocaleString("en-IN")}</p>
                    </div>
                    <div className="bg-white rounded-xl p-3 text-center border border-slate-100">
                      <p className="text-[8px] font-black text-slate-400 uppercase tracking-widest mb-1">Total Payable</p>
                      <p className="text-xs sm:text-sm font-black text-slate-800">₹{totalPayable.toLocaleString("en-IN")}</p>
                    </div>
                  </div>
                  <p className="text-[9px] text-slate-400 font-medium mt-3 text-center italic">
                    *Indicative Business EMI calculated starting at {emiRate}% p.a.
                  </p>
                </div>

                {/* Apply CTA */}
                <button
                  onClick={() => {
                    setSelectedPlan(null);
                    setIsFormOpen(true);
                  }}
                  className="w-full bg-gradient-to-r from-[#2076C7] to-[#1CADA3] text-white py-4 rounded-2xl font-black text-xs uppercase tracking-[0.2em] hover:shadow-lg hover:opacity-95 transition-all flex items-center justify-center gap-2 shadow-md shadow-blue-500/10"
                >
                  Apply for {selectedPlan.title} <ArrowRight size={15} />
                </button>

                {/* Disclaimer */}
                <p className="text-[9px] text-slate-400 font-medium text-center leading-relaxed px-2">
                  Terms, interest rates, and final eligibility are subject to lender credit verification and RBI guidelines. Please verify details directly with {bank.name} during actual sign-off.
                </p>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>

      {/* New Application Form Modal overlay */}
      {isFormOpen && (
        <BusinessLoanForm
          onClose={() => setIsFormOpen(false)}
        />
      )}
    </div>
  );
}
