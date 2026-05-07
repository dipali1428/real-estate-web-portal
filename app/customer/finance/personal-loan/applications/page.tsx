"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useRouter } from "next/navigation";
import {
  CheckCircle2,
  Clock,
  FileText,
  IndianRupee,
  Calendar,
  Percent,
  ArrowRight,
  Download,
  CreditCard,
  Landmark,
  AlertCircle,
  CheckCircle,
  Shield,
  RefreshCw,
  ChevronDown,
  ChevronUp,
  TrendingUp,
  Briefcase,
  Plus,
  Zap
} from "lucide-react";

// ─── Interfaces ───
// These match the backend response the user will implement later
interface EMIRecord {
  month: string;
  date: string;
  amount: number;
  status: "paid" | "upcoming" | "due" | "future";
}

interface DocumentItem {
  name: string;
  status: "verified" | "pending" | "rejected" | "uploaded";
}

interface LoanApplication {
  id: string;
  bank: string;
  plan: string;
  appliedDate: string;
  requestedAmount: number;
  status: "submitted" | "documents" | "credit-check" | "approved" | "agreement" | "disbursed" | "rejected";
  statusMessage: string;
  sanctionedAmount?: number;
  interestRate?: number;
  tenure?: number;
  monthlyEMI?: number;
  loanAccountNo?: string;
  disbursementDate?: string;
  firstEMIDate?: string;
  totalInterest?: number;
  totalRepayment?: number;
  paidEMIs?: number;
  outstandingBalance?: number;
  documents: DocumentItem[];
  emiSchedule: EMIRecord[];
}

// Note: This array is empty to handle the case where the user hasn't applied yet.
// Backend hook point goes here to populate this list natively.
const APPLICATIONS: LoanApplication[] = [];

// ─── Status Steps ───
const STATUS_STEPS = [
  { key: "submitted", label: "Submitted", icon: FileText },
  { key: "documents", label: "Documents", icon: Shield },
  { key: "credit-check", label: "Credit Check", icon: CreditCard },
  { key: "approved", label: "Approved", icon: CheckCircle },
  { key: "agreement", label: "Agreement", icon: Briefcase },
  { key: "disbursed", label: "Disbursed", icon: IndianRupee },
];

function getStepIndex(status: string): number {
  const idx = STATUS_STEPS.findIndex((s) => s.key === status);
  return idx >= 0 ? idx : 0;
}

export default function MyApplicationsPage() {
  const router = useRouter();
  const [expandedApp, setExpandedApp] = useState<string | null>(APPLICATIONS[0]?.id || null);
  const [activeTabs, setActiveTabs] = useState<Record<string, "overview" | "emi" | "documents">>({});

  const getTabForApp = (appId: string) => activeTabs[appId] || "overview";
  const setTabForApp = (appId: string, tab: "overview" | "emi" | "documents") => {
    setActiveTabs(prev => ({ ...prev, [appId]: tab }));
  };

  return (
    <div className="flex-1 p-4 md:p-10 bg-slate-50 font-sans min-h-screen">
      {/* 🔷 PREMIUM HEADER */}
      <div className="max-w-6xl mx-auto mb-6">
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
          className="bg-white/80 backdrop-blur-md rounded-2xl p-5 shadow-sm border border-slate-100/60"
        >
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">

            {/* LEFT (BRANDING) */}
            <div className="flex flex-col sm:flex-row items-center sm:items-start gap-4 text-center sm:text-left">
              <div className="w-12 h-12 rounded-xl bg-gradient-to-r from-[#2076C7] to-[#1CADA3] flex items-center justify-center text-white font-bold shadow-md shrink-0">
                <Zap size={22} />
              </div>

              <div className="flex flex-col items-center sm:items-start">
                <div className="flex flex-col sm:flex-row items-center gap-2 sm:gap-3 mb-1">
                  <h2 className="text-xl sm:text-2xl font-bold text-slate-800">
                    Personal Loan Dashboard
                  </h2>
                  <span className="px-2.5 py-1 bg-emerald-100 text-emerald-700 text-[10px] font-bold rounded-full border border-emerald-200 whitespace-nowrap">
                    Strategic Lending
                  </span>
                </div>

                <p className="text-sm text-slate-500 flex items-center justify-center sm:justify-start gap-2">
                  Explore plans, compare rates, and apply seamlessly
                </p>
              </div>
            </div>

            {/* RIGHT BUTTONS (CAPSULE) */}
            <div className="w-full sm:w-auto mt-4 sm:mt-0">
              <div className="p-1 bg-slate-100/80 backdrop-blur-sm rounded-2xl sm:rounded-full flex flex-col sm:flex-row sm:items-center gap-1 relative shadow-inner border border-slate-200/50">

                <button
                  onClick={() => router.push("/customer/finance/personal-loan")}
                  className="w-full sm:w-auto px-4 md:px-5 py-2.5 md:py-2 rounded-xl sm:rounded-full text-[10px] md:text-xs font-black uppercase tracking-wider text-slate-500 hover:text-slate-700 flex items-center justify-center gap-1.5 transition-colors"
                >
                  <Plus size={14} />
                  Quick Apply
                </button>

                <button
                  onClick={() => router.push("/customer/finance/personal-loan/applications")}
                  className="relative w-full sm:w-auto px-4 md:px-5 py-2.5 md:py-2 rounded-xl sm:rounded-full text-[10px] md:text-xs font-black uppercase tracking-wider text-white flex items-center justify-center gap-1.5 overflow-hidden active:scale-95 transition-transform"
                >
                  <div className="absolute inset-0 bg-gradient-to-r from-[#2076C7] to-[#1CADA3] rounded-xl sm:rounded-full -z-10 shadow-sm" />
                  <Clock size={14} />
                  Applications
                </button>

              </div>
            </div>

          </div>
        </motion.div>
      </div>

      <div className="max-w-6xl mx-auto space-y-8">
        {APPLICATIONS.length === 0 ? (
          <div className="space-y-6">
            {/* Engaging Main Empty State */}
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-white rounded-[2.5rem] border border-slate-100 shadow-sm p-10 md:p-16 flex flex-col items-center justify-center text-center relative overflow-hidden min-h-[500px]"
            >
              {/* Animated Background Gradients */}
              <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-gradient-to-br from-blue-100/40 via-blue-50/20 to-transparent rounded-full -translate-y-1/2 translate-x-1/3 blur-3xl pointer-events-none" />
              <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-gradient-to-tr from-teal-100/40 via-teal-50/20 to-transparent rounded-full translate-y-1/3 -translate-x-1/3 blur-3xl pointer-events-none" />
              
              {/* Floating Decorative Elements */}
              <motion.div 
                animate={{ y: [0, -15, 0] }} 
                transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                className="absolute top-1/4 left-[15%] w-16 h-16 bg-white rounded-2xl shadow-xl border border-slate-100 flex items-center justify-center hidden md:flex"
              >
                <Percent size={24} className="text-[#2076C7]" />
              </motion.div>
              
              <motion.div 
                animate={{ y: [0, 20, 0] }} 
                transition={{ duration: 5, repeat: Infinity, ease: "easeInOut", delay: 1 }}
                className="absolute bottom-1/3 right-[15%] w-20 h-20 bg-white rounded-full shadow-xl shadow-teal-500/10 border border-slate-100 flex items-center justify-center hidden md:flex z-10"
              >
                <IndianRupee size={28} className="text-[#1CADA3]" />
              </motion.div>

              <div className="relative z-10 w-32 h-32 bg-gradient-to-br from-slate-50 to-slate-100 rounded-[2rem] flex items-center justify-center mb-8 shadow-inner border border-white">
                 <div className="w-16 h-16 bg-white rounded-xl shadow-md flex items-center justify-center rotate-12 transition-transform hover:rotate-0">
                   <Landmark size={32} className="text-[#2076C7]" />
                 </div>
                 <div className="absolute -bottom-3 -right-3 w-14 h-14 bg-gradient-to-r from-[#2076C7] to-[#1CADA3] rounded-full flex items-center justify-center shadow-lg shadow-blue-500/30 text-white">
                    <CheckCircle2 size={24} />
                 </div>
              </div>
              
              <div className="relative z-10 max-w-2xl mx-auto space-y-4">
                <span className="text-[10px] font-black text-[#1CADA3] uppercase tracking-[0.3em] bg-teal-50 px-4 py-2 rounded-xl border border-teal-100 shadow-sm inline-block mb-2">
                  Zero Active Applications
                </span>
                <h2 className="text-3xl md:text-5xl font-black text-slate-800 tracking-tight leading-tight">
                  Start Your <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#2076C7] to-[#1CADA3]">Financial Journey</span>
                </h2>
                <p className="text-sm text-slate-500 font-medium leading-relaxed max-w-lg mx-auto">
                  You haven&apos;t applied for any personal loans yet. Experience lightning-fast approvals, competitive interest rates, and a 100% paperless tracking experience.
                </p>
              </div>

              
              <div className="relative z-10 w-full max-w-md mt-2">
                <button 
                  onClick={() => router.push("/customer/finance/personal-loan")}
                  className="w-full bg-gradient-to-r from-[#2076C7] to-[#1CADA3] text-white px-8 py-5 rounded-2xl font-black text-[11px] uppercase tracking-[0.2em] hover:shadow-2xl hover:shadow-blue-500/20 hover:-translate-y-1 transition-all flex items-center justify-center gap-3 relative overflow-hidden group"
                >
                  <div className="absolute inset-0 bg-white/20 translate-y-full group-hover:translate-y-0 transition-transform duration-300" />
                  <Plus size={18} strokeWidth={3} className="relative z-10" /> 
                  <span className="relative z-10">Explore Pre-Approved Plans</span>
                </button>
              </div>
            </motion.div>


          </div>
        ) : (
          <div className="space-y-6">
            {APPLICATIONS.map((app) => {
              const isExpanded = expandedApp === app.id;
              const stepIndex = getStepIndex(app.status);
              const isDisbursed = app.status === "disbursed";
              const isRejected = app.status === "rejected";
              const currentTab = getTabForApp(app.id);

              return (
                <div key={app.id} className="bg-white rounded-[2rem] border border-slate-100 shadow-sm overflow-hidden transition-all hover:shadow-md">
                  {/* Application Summary Row */}
                  <button
                    onClick={() => setExpandedApp(isExpanded ? null : app.id)}
                    className="w-full p-6 md:p-8 flex items-center gap-4 text-left hover:bg-slate-50/50 transition-colors"
                  >
                    <div className="w-14 h-14 rounded-2xl bg-teal-50 flex items-center justify-center shrink-0 shadow-sm border border-teal-100">
                      <Landmark size={24} className="text-[#1CADA3]" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-3 mb-1.5">
                        <h3 className="text-base font-black text-slate-800 uppercase tracking-tight truncate">{app.bank}</h3>
                        <span className="text-[9px] font-black text-slate-500 uppercase tracking-widest bg-slate-50 px-2.5 py-1 rounded-md border border-slate-100 shrink-0">
                          {app.plan}
                        </span>
                      </div>
                      <div className="flex items-center gap-3">
                        <span className="text-xs font-bold text-slate-500">{app.id}</span>
                        <span className="text-[10px] font-bold text-slate-300">•</span>
                        <span className="text-xs font-bold text-slate-500">{app.appliedDate}</span>
                      </div>
                    </div>
                    <div className="flex items-center gap-4 shrink-0">
                      <span className={`text-[10px] hidden md:inline-flex font-black uppercase tracking-[0.1em] px-3 py-1.5 rounded-lg border ${
                        isDisbursed
                          ? "bg-emerald-50 text-emerald-600 border-emerald-100"
                          : isRejected
                          ? "bg-red-50 text-red-500 border-red-100"
                          : "bg-amber-50 text-amber-600 border-amber-100"
                      }`}>
                        {isDisbursed ? "Active" : isRejected ? "Rejected" : "In Progress"}
                      </span>
                      <div className="w-10 h-10 rounded-xl bg-slate-50 flex items-center justify-center border border-slate-100">
                        {isExpanded ? <ChevronUp size={20} className="text-slate-400" /> : <ChevronDown size={20} className="text-slate-400" />}
                      </div>
                    </div>
                  </button>

                  <AnimatePresence>
                    {isExpanded && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.3 }}
                        className="overflow-hidden"
                      >
                        <div className="border-t border-slate-100">
                          {/* Status Timeline */}
                          <div className="p-6 md:p-8 bg-slate-50/50">
                            <p className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em] mb-6">Application Progress</p>
                            <div className="flex flex-col md:flex-row md:items-center gap-4 md:gap-1">
                              {STATUS_STEPS.map((step, i) => {
                                const isCompleted = i <= stepIndex;
                                const isCurrent = i === stepIndex;
                                return (
                                  <React.Fragment key={step.key}>
                                    <div className="flex flex-row md:flex-col items-center gap-3 md:gap-2">
                                      <div className={`w-10 h-10 rounded-full flex items-center justify-center text-xs transition-all ${
                                        isCompleted
                                          ? isCurrent
                                            ? "bg-[#2076C7] text-white shadow-lg shadow-blue-200"
                                            : "bg-[#1CADA3] text-white"
                                          : "bg-slate-100 text-slate-400"
                                      }`}>
                                        {isCompleted && !isCurrent ? <CheckCircle2 size={18} /> : <step.icon size={18} />}
                                      </div>
                                      <span className={`text-[9px] font-black uppercase tracking-widest ${
                                        isCompleted ? "text-slate-700" : "text-slate-400"
                                      }`}>
                                        {step.label}
                                      </span>
                                    </div>
                                    {i < STATUS_STEPS.length - 1 && (
                                      <div className={`hidden md:block flex-1 h-[2px] rounded-full -mt-5 ${
                                        i < stepIndex ? "bg-[#1CADA3]" : "bg-slate-200"
                                      }`} />
                                    )}
                                  </React.Fragment>
                                );
                              })}
                            </div>
                            <div className="mt-6 bg-white rounded-xl p-4 border border-slate-100 flex items-start gap-3">
                              <AlertCircle size={18} className="text-[#2076C7] shrink-0 mt-0.5" />
                              <p className="text-xs text-slate-600 font-medium leading-relaxed">
                                <span className="font-black text-slate-800 mr-2">Status Update:</span>
                                {app.statusMessage}
                              </p>
                            </div>
                          </div>

                          {/* Tab Navigation (for disbursed loans) */}
                          {isDisbursed && (
                            <>
                              <div className="flex gap-2 p-2 mx-6 md:mx-8 mt-6 bg-slate-100 rounded-xl">
                                {(["overview", "emi", "documents"] as const).map((tab) => (
                                  <button
                                    key={tab}
                                    onClick={() => setTabForApp(app.id, tab)}
                                    className={`flex-1 px-4 py-2.5 rounded-lg text-[10px] font-black uppercase tracking-[0.1em] transition-all ${
                                      currentTab === tab
                                        ? "bg-white text-[#2076C7] shadow-sm"
                                        : "text-slate-500 hover:text-slate-700"
                                    }`}
                                  >
                                    {tab === "emi" ? "EMI Schedule" : tab}
                                  </button>
                                ))}
                              </div>

                              <div className="p-6 md:p-8">
                                {/* Overview */}
                                {currentTab === "overview" && (
                                  <div className="space-y-6">
                                    <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                                      {[
                                        { label: "Loan Account", value: app.loanAccountNo || "-", icon: CreditCard, accent: "text-slate-800" },
                                        { label: "Sanctioned Amount", value: `₹${(app.sanctionedAmount || 0).toLocaleString("en-IN")}`, icon: IndianRupee, accent: "text-emerald-600" },
                                        { label: "Interest Rate", value: `${app.interestRate}% p.a.`, icon: Percent, accent: "text-[#2076C7]" },
                                        { label: "Tenure", value: `${app.tenure} Months`, icon: Calendar, accent: "text-amber-600" },
                                        { label: "Monthly EMI", value: `₹${(app.monthlyEMI || 0).toLocaleString("en-IN")}`, icon: RefreshCw, accent: "text-[#2076C7]" },
                                        { label: "Disbursed On", value: app.disbursementDate || "-", icon: CheckCircle, accent: "text-emerald-600" },
                                      ].map((m) => (
                                        <div key={m.label} className="bg-slate-50 rounded-2xl p-5 border border-slate-100">
                                          <div className="flex items-center gap-2 mb-2">
                                            <m.icon size={14} className="text-slate-400" />
                                            <p className="text-[9px] font-black text-slate-400 uppercase tracking-widest">{m.label}</p>
                                          </div>
                                          <p className={`text-sm md:text-base font-black ${m.accent}`}>{m.value}</p>
                                        </div>
                                      ))}
                                    </div>

                                    {/* Detailed Analytics Grid */}
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                      {/* Repayment Progress */}
                                      <div className="bg-gradient-to-r from-blue-50 to-teal-50 rounded-2xl p-6 border border-blue-100 flex flex-col justify-center">
                                        <div className="flex justify-between items-center mb-4">
                                          <p className="text-[10px] font-black text-[#2076C7] uppercase tracking-[0.2em]">Repayment Progress</p>
                                          <p className="text-sm font-black text-slate-800">
                                            {app.paidEMIs}/{app.tenure} EMIs Paid
                                          </p>
                                        </div>
                                        <div className="h-3 bg-white rounded-full overflow-hidden shadow-inner mb-4">
                                          <motion.div
                                            initial={{ width: 0 }}
                                            animate={{ width: `${((app.paidEMIs || 0) / (app.tenure || 1)) * 100}%` }}
                                            transition={{ duration: 1, ease: "easeOut" }}
                                            className="h-full bg-gradient-to-r from-[#2076C7] to-[#1CADA3] rounded-full"
                                          />
                                        </div>
                                        <div className="flex justify-between">
                                          <div>
                                            <p className="text-[9px] font-black text-slate-400 uppercase tracking-widest">Outstanding</p>
                                            <p className="text-base font-black text-slate-800">₹{(app.outstandingBalance || 0).toLocaleString("en-IN")}</p>
                                          </div>
                                          <div className="text-right">
                                            <p className="text-[9px] font-black text-slate-400 uppercase tracking-widest">Total Paid</p>
                                            <p className="text-base font-black text-[#1CADA3]">₹{((app.paidEMIs || 0) * (app.monthlyEMI || 0)).toLocaleString("en-IN")}</p>
                                          </div>
                                        </div>
                                      </div>

                                      {/* Cost Breakdown Chart */}
                                      <div className="bg-white rounded-2xl p-6 border border-slate-100 flex items-center justify-between shadow-sm">
                                        <div className="flex-1">
                                          <p className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em] mb-4">Loan Distribution</p>
                                          <div className="space-y-3">
                                            <div className="flex items-center gap-2">
                                              <div className="w-3 h-3 rounded-full bg-[#2076C7]"></div>
                                              <div>
                                                <p className="text-[9px] font-bold text-slate-500 uppercase tracking-wider">Principal</p>
                                                <p className="text-xs font-black text-slate-800">₹{(app.sanctionedAmount || 0).toLocaleString("en-IN")}</p>
                                              </div>
                                            </div>
                                            <div className="flex items-center gap-2">
                                              <div className="w-3 h-3 rounded-full bg-amber-400"></div>
                                              <div>
                                                <p className="text-[9px] font-bold text-slate-500 uppercase tracking-wider">Total Interest</p>
                                                <p className="text-xs font-black text-slate-800">₹{(app.totalInterest || 0).toLocaleString("en-IN")}</p>
                                              </div>
                                            </div>
                                          </div>
                                        </div>
                                        <div className="relative w-28 h-28 flex items-center justify-center shrink-0">
                                          <svg className="w-full h-full transform -rotate-90" viewBox="0 0 100 100">
                                            <circle cx="50" cy="50" r="38" stroke="#FCD34D" strokeWidth="12" fill="none" />
                                            <motion.circle 
                                              initial={{ strokeDashoffset: 2 * Math.PI * 38 }}
                                              animate={{ strokeDashoffset: (2 * Math.PI * 38) - (((app.sanctionedAmount || 1) / ((app.sanctionedAmount || 1) + (app.totalInterest || 0))) * (2 * Math.PI * 38)) }}
                                              transition={{ duration: 1.5, ease: "easeOut" }}
                                              cx="50" cy="50" r="38" 
                                              stroke="#2076C7" strokeWidth="12" fill="none" 
                                              strokeDasharray={2 * Math.PI * 38} 
                                              strokeLinecap="round"
                                            />
                                          </svg>
                                          <div className="absolute inset-0 flex flex-col items-center justify-center">
                                            <span className="text-[8px] font-black text-slate-400 uppercase tracking-widest">Total</span>
                                            <span className="text-xs font-black text-slate-800">₹{(((app.sanctionedAmount || 0) + (app.totalInterest || 0)) / 100000).toFixed(1)}L</span>
                                          </div>
                                        </div>
                                      </div>
                                    </div>

                                    {/* Quick Actions */}
                                    <div className="grid grid-cols-3 gap-4">
                                      {[
                                        { label: "Statement", icon: Download },
                                        { label: "EMI Calendar", icon: Calendar },
                                        { label: "Foreclosure", icon: TrendingUp },
                                      ].map((a) => (
                                        <button key={a.label} className="bg-white border border-slate-100 rounded-2xl p-4 text-center hover:border-blue-100 hover:shadow-md transition-all group">
                                          <a.icon size={22} className="text-slate-400 group-hover:text-[#2076C7] mx-auto mb-3 transition-colors" />
                                          <p className="text-[10px] font-black text-slate-500 uppercase tracking-[0.1em] group-hover:text-[#2076C7]">{a.label}</p>
                                        </button>
                                      ))}
                                    </div>
                                  </div>
                                )}

                                {/* EMI Schedule */}
                                {currentTab === "emi" && (
                                  <div className="space-y-3">
                                    <div className="flex items-center justify-between mb-4">
                                      <p className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em]">Upcoming EMI Schedule</p>
                                      <p className="text-xs font-bold text-[#2076C7]">₹{(app.monthlyEMI || 0).toLocaleString("en-IN")} / month</p>
                                    </div>
                                    {app.emiSchedule.map((emi, i) => (
                                      <div key={i} className={`flex flex-row items-center justify-between p-4 rounded-2xl border transition-all ${
                                        emi.status === "paid"
                                          ? "bg-emerald-50 border-emerald-100"
                                          : emi.status === "upcoming"
                                          ? "bg-blue-50 border-blue-200 shadow-sm"
                                          : emi.status === "due"
                                          ? "bg-red-50 border-red-200"
                                          : "bg-white border-slate-100"
                                      }`}>
                                        <div className="flex items-center gap-4">
                                          <div className={`w-10 h-10 rounded-xl flex items-center justify-center ${
                                            emi.status === "paid"
                                              ? "bg-emerald-100 text-emerald-600"
                                              : emi.status === "upcoming"
                                              ? "bg-blue-100 text-[#2076C7]"
                                              : emi.status === "due"
                                              ? "bg-red-100 text-red-500"
                                              : "bg-slate-100 text-slate-400"
                                          }`}>
                                            {emi.status === "paid" ? <CheckCircle2 size={18} /> : <Calendar size={18} />}
                                          </div>
                                          <div>
                                            <p className="text-sm font-black text-slate-800">{emi.month}</p>
                                            <p className="text-xs text-slate-500 font-medium">{emi.date}</p>
                                          </div>
                                        </div>
                                        <div className="text-right">
                                          <p className="text-sm font-black text-slate-800">₹{emi.amount.toLocaleString("en-IN")}</p>
                                          <span className={`text-[9px] font-black uppercase tracking-widest ${
                                            emi.status === "paid"
                                              ? "text-emerald-600"
                                              : emi.status === "upcoming"
                                              ? "text-[#2076C7]"
                                              : emi.status === "due"
                                              ? "text-red-500"
                                              : "text-slate-400"
                                          }`}>
                                            {emi.status === "upcoming" ? "Next Due" : emi.status.charAt(0).toUpperCase() + emi.status.slice(1)}
                                          </span>
                                        </div>
                                      </div>
                                    ))}
                                  </div>
                                )}

                                {/* Documents */}
                                {currentTab === "documents" && (
                                  <div className="space-y-3">
                                    {app.documents.map((doc, i) => (
                                      <div key={i} className="flex items-center justify-between p-4 bg-white rounded-2xl border border-slate-100">
                                        <div className="flex items-center gap-4">
                                          <FileText size={18} className="text-slate-400" />
                                          <p className="text-sm font-bold text-slate-700">{doc.name}</p>
                                        </div>
                                        <span className={`text-[9px] font-black uppercase tracking-[0.1em] px-3 py-1.5 rounded-lg border ${
                                          doc.status === "verified"
                                            ? "bg-emerald-50 text-emerald-600 border-emerald-100"
                                            : doc.status === "uploaded"
                                            ? "bg-blue-50 text-[#2076C7] border-blue-100"
                                            : doc.status === "pending"
                                            ? "bg-amber-50 text-amber-600 border-amber-100"
                                            : "bg-red-50 text-red-500 border-red-100"
                                        }`}>
                                          {doc.status}
                                        </span>
                                      </div>
                                    ))}
                                  </div>
                                )}
                              </div>
                            </>
                          )}

                          {/* Documents for non-disbursed applications */}
                          {!isDisbursed && (
                            <div className="p-6 md:p-8 space-y-4">
                              <p className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em] mb-4">Document Verification</p>
                              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                {app.documents.map((doc, i) => (
                                  <div key={i} className="flex items-center justify-between p-4 bg-slate-50 rounded-2xl border border-slate-100">
                                    <div className="flex items-center gap-3">
                                      <FileText size={16} className="text-slate-400" />
                                      <p className="text-xs font-bold text-slate-700">{doc.name}</p>
                                    </div>
                                    <span className={`text-[9px] font-black uppercase tracking-widest px-2.5 py-1 rounded-md border ${
                                      doc.status === "verified"
                                        ? "bg-emerald-50 text-emerald-600 border-emerald-100"
                                        : doc.status === "uploaded"
                                        ? "bg-blue-50 text-[#2076C7] border-blue-100"
                                        : doc.status === "pending"
                                        ? "bg-amber-50 text-amber-600 border-amber-100"
                                        : "bg-red-50 text-red-500 border-red-100"
                                    }`}>
                                      {doc.status}
                                    </span>
                                  </div>
                                ))}
                              </div>
                              {app.documents.some((d) => d.status === "pending") && (
                                <div className="mt-6 flex justify-end">
                                  <button className="bg-gradient-to-r from-[#2076C7] to-[#1CADA3] text-white px-6 py-3 rounded-xl font-black text-[10px] uppercase tracking-[0.15em] hover:shadow-lg hover:opacity-90 transition-all flex items-center justify-center gap-2">
                                    Upload Pending Documents <ArrowRight size={14} />
                                  </button>
                                </div>
                              )}
                            </div>
                          )}
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              );
            })}
          </div>
        )}

      </div>
    </div>
  );
}