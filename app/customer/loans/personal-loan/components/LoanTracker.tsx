"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  X,
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
  Eye,
  ChevronDown,
  ChevronUp,
  TrendingUp,
  Briefcase,
} from "lucide-react";

// ─── Mock Application Data ───
// This simulates what a real API would return

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
  // Approved / Disbursed details
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

const MOCK_APPLICATIONS: LoanApplication[] = [
  {
    id: "INF-PL-2026-04198",
    bank: "HDFC BANK",
    plan: "Term Loan",
    appliedDate: "01 Apr 2026",
    requestedAmount: 800000,
    status: "disbursed",
    statusMessage: "Loan disbursed successfully to your account",
    sanctionedAmount: 750000,
    interestRate: 11.25,
    tenure: 48,
    monthlyEMI: 19536,
    loanAccountNo: "HDFC-PL-78291034",
    disbursementDate: "03 Apr 2026",
    firstEMIDate: "05 May 2026",
    totalInterest: 187728,
    totalRepayment: 937728,
    paidEMIs: 0,
    outstandingBalance: 750000,
    documents: [
      { name: "PAN Card", status: "verified" },
      { name: "Aadhaar Card", status: "verified" },
      { name: "3 Months Salary Slips", status: "verified" },
      { name: "6 Months Bank Statement", status: "verified" },
      { name: "Address Proof", status: "verified" },
    ],
    emiSchedule: [
      { month: "May 2026", date: "05 May 2026", amount: 19536, status: "upcoming" },
      { month: "Jun 2026", date: "05 Jun 2026", amount: 19536, status: "future" },
      { month: "Jul 2026", date: "05 Jul 2026", amount: 19536, status: "future" },
      { month: "Aug 2026", date: "05 Aug 2026", amount: 19536, status: "future" },
      { month: "Sep 2026", date: "05 Sep 2026", amount: 19536, status: "future" },
      { month: "Oct 2026", date: "05 Oct 2026", amount: 19536, status: "future" },
    ],
  },
  {
    id: "INF-PL-2026-04212",
    bank: "BAJAJ FINANCE",
    plan: "Balance Transfer",
    appliedDate: "02 Apr 2026",
    requestedAmount: 500000,
    status: "credit-check",
    statusMessage: "Credit assessment in progress. Estimated 24-48 hours.",
    documents: [
      { name: "PAN Card", status: "verified" },
      { name: "Aadhaar Card", status: "verified" },
      { name: "Existing Loan Sanction Letter", status: "verified" },
      { name: "12 Months Repayment Record", status: "uploaded" },
      { name: "Outstanding Statement", status: "pending" },
    ],
    emiSchedule: [],
  },
];

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

// ─── Main Tracker Component ───
interface LoanTrackerProps {
  onClose: () => void;
}

export default function LoanTracker({ onClose }: LoanTrackerProps) {
  const [expandedApp, setExpandedApp] = useState<string | null>(MOCK_APPLICATIONS[0]?.id || null);
  const [activeTab, setActiveTab] = useState<"overview" | "emi" | "documents">("overview");

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

      {/* Panel */}
      <motion.div
        initial={{ x: "100%" }}
        animate={{ x: 0 }}
        exit={{ x: "100%" }}
        transition={{ type: "spring", damping: 30, stiffness: 300 }}
        className="fixed right-0 top-0 bottom-0 w-full sm:w-[600px] bg-slate-50 z-50 shadow-2xl overflow-y-auto"
      >
        {/* Header */}
        <div className="sticky top-0 bg-white z-10 border-b border-slate-100 p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-[9px] font-black text-[#2076C7] uppercase tracking-[0.25em] mb-1">Loan Portfolio</p>
              <h2 className="text-xl font-black text-slate-900 tracking-tight">My Applications</h2>
            </div>
            <div className="flex items-center gap-3">
              <span className="text-[9px] font-black text-emerald-600 uppercase tracking-widest bg-emerald-50 px-3 py-1 rounded-lg border border-emerald-100">
                {MOCK_APPLICATIONS.length} Active
              </span>
              <button
                onClick={onClose}
                className="w-9 h-9 rounded-xl bg-slate-100 flex items-center justify-center hover:bg-red-50 hover:text-red-400 transition-colors text-slate-400"
              >
                <X size={16} />
              </button>
            </div>
          </div>
        </div>

        <div className="p-6 space-y-4">
          {MOCK_APPLICATIONS.map((app) => {
            const isExpanded = expandedApp === app.id;
            const stepIndex = getStepIndex(app.status);
            const isDisbursed = app.status === "disbursed";
            const isRejected = app.status === "rejected";

            return (
              <div key={app.id} className="bg-white rounded-2xl border border-slate-100 shadow-sm overflow-hidden">
                {/* Application Summary Row */}
                <button
                  onClick={() => setExpandedApp(isExpanded ? null : app.id)}
                  className="w-full p-5 flex items-center gap-4 text-left hover:bg-slate-50/50 transition-colors"
                >
                  <div className="w-11 h-11 rounded-xl bg-teal-50 flex items-center justify-center shrink-0">
                    <Landmark size={20} className="text-[#1CADA3]" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 mb-1">
                      <h3 className="text-sm font-black text-slate-800 uppercase tracking-tight truncate">{app.bank}</h3>
                      <span className="text-[8px] font-black text-slate-400 uppercase tracking-widest bg-slate-50 px-2 py-0.5 rounded border border-slate-100 shrink-0">
                        {app.plan}
                      </span>
                    </div>
                    <div className="flex items-center gap-3">
                      <span className="text-[10px] font-bold text-slate-400">{app.id}</span>
                      <span className="text-[10px] font-bold text-slate-300">•</span>
                      <span className="text-[10px] font-bold text-slate-400">{app.appliedDate}</span>
                    </div>
                  </div>
                  <div className="flex items-center gap-3 shrink-0">
                    <span className={`text-[9px] font-black uppercase tracking-widest px-2.5 py-1 rounded-lg border ${
                      isDisbursed
                        ? "bg-emerald-50 text-emerald-600 border-emerald-100"
                        : isRejected
                        ? "bg-red-50 text-red-500 border-red-100"
                        : "bg-amber-50 text-amber-600 border-amber-100"
                    }`}>
                      {isDisbursed ? "Active" : isRejected ? "Rejected" : "In Progress"}
                    </span>
                    {isExpanded ? <ChevronUp size={16} className="text-slate-400" /> : <ChevronDown size={16} className="text-slate-400" />}
                  </div>
                </button>

                {/* Expanded Details */}
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
                        <div className="p-5 bg-slate-50/50">
                          <p className="text-[9px] font-black text-slate-400 uppercase tracking-[0.2em] mb-4">Application Progress</p>
                          <div className="flex items-center gap-1">
                            {STATUS_STEPS.map((step, i) => {
                              const isCompleted = i <= stepIndex;
                              const isCurrent = i === stepIndex;
                              return (
                                <React.Fragment key={step.key}>
                                  <div className="flex flex-col items-center gap-1.5">
                                    <div className={`w-8 h-8 rounded-full flex items-center justify-center text-xs transition-all ${
                                      isCompleted
                                        ? isCurrent
                                          ? "bg-[#2076C7] text-white shadow-lg shadow-blue-200"
                                          : "bg-[#1CADA3] text-white"
                                        : "bg-slate-100 text-slate-400"
                                    }`}>
                                      {isCompleted && !isCurrent ? <CheckCircle2 size={14} /> : <step.icon size={14} />}
                                    </div>
                                    <span className={`text-[8px] font-black uppercase tracking-wider ${
                                      isCompleted ? "text-slate-700" : "text-slate-400"
                                    }`}>
                                      {step.label}
                                    </span>
                                  </div>
                                  {i < STATUS_STEPS.length - 1 && (
                                    <div className={`flex-1 h-[2px] rounded-full -mt-4 ${
                                      i < stepIndex ? "bg-[#1CADA3]" : "bg-slate-200"
                                    }`} />
                                  )}
                                </React.Fragment>
                              );
                            })}
                          </div>
                          <p className="text-[10px] text-slate-500 font-medium mt-4 bg-white rounded-lg p-3 border border-slate-100">
                            <span className="font-black text-[#2076C7]">Status:</span> {app.statusMessage}
                          </p>
                        </div>

                        {/* Tab Navigation (for disbursed loans) */}
                        {isDisbursed && (
                          <>
                            <div className="flex gap-1 p-1.5 mx-5 mt-4 bg-slate-100 rounded-xl">
                              {(["overview", "emi", "documents"] as const).map((tab) => (
                                <button
                                  key={tab}
                                  onClick={() => setActiveTab(tab)}
                                  className={`flex-1 px-3 py-2 rounded-lg text-[10px] font-black uppercase tracking-widest transition-all ${
                                    activeTab === tab
                                      ? "bg-white text-[#2076C7] shadow-sm"
                                      : "text-slate-500 hover:text-slate-700"
                                  }`}
                                >
                                  {tab === "emi" ? "EMI Schedule" : tab}
                                </button>
                              ))}
                            </div>

                            <div className="p-5">
                              {/* Overview Tab */}
                              {activeTab === "overview" && (
                                <div className="space-y-4">
                                  {/* Loan Details Grid */}
                                  <div className="grid grid-cols-2 gap-3">
                                    {[
                                      { label: "Loan Account", value: app.loanAccountNo || "-", icon: CreditCard, accent: "text-slate-800" },
                                      { label: "Sanctioned Amount", value: `₹${(app.sanctionedAmount || 0).toLocaleString("en-IN")}`, icon: IndianRupee, accent: "text-emerald-600" },
                                      { label: "Interest Rate", value: `${app.interestRate}% p.a.`, icon: Percent, accent: "text-[#2076C7]" },
                                      { label: "Tenure", value: `${app.tenure} Months`, icon: Calendar, accent: "text-amber-600" },
                                      { label: "Monthly EMI", value: `₹${(app.monthlyEMI || 0).toLocaleString("en-IN")}`, icon: RefreshCw, accent: "text-[#2076C7]" },
                                      { label: "Disbursed On", value: app.disbursementDate || "-", icon: CheckCircle, accent: "text-emerald-600" },
                                    ].map((m) => (
                                      <div key={m.label} className="bg-slate-50 rounded-xl p-3.5 border border-slate-100">
                                        <div className="flex items-center gap-2 mb-1.5">
                                          <m.icon size={12} className="text-slate-400" />
                                          <p className="text-[8px] font-black text-slate-400 uppercase tracking-widest">{m.label}</p>
                                        </div>
                                        <p className={`text-xs font-black ${m.accent}`}>{m.value}</p>
                                      </div>
                                    ))}
                                  </div>

                                  {/* Repayment Progress */}
                                  <div className="bg-gradient-to-r from-blue-50 to-teal-50 rounded-2xl p-5 border border-blue-100">
                                    <div className="flex justify-between items-center mb-3">
                                      <p className="text-[9px] font-black text-[#2076C7] uppercase tracking-[0.2em]">Repayment Progress</p>
                                      <p className="text-xs font-black text-slate-800">
                                        {app.paidEMIs}/{app.tenure} EMIs Paid
                                      </p>
                                    </div>
                                    <div className="h-2.5 bg-white rounded-full overflow-hidden">
                                      <motion.div
                                        initial={{ width: 0 }}
                                        animate={{ width: `${((app.paidEMIs || 0) / (app.tenure || 1)) * 100}%` }}
                                        className="h-full bg-gradient-to-r from-[#2076C7] to-[#1CADA3] rounded-full"
                                      />
                                    </div>
                                    <div className="flex justify-between mt-3">
                                      <div>
                                        <p className="text-[8px] font-black text-slate-400 uppercase tracking-widest">Outstanding</p>
                                        <p className="text-sm font-black text-slate-800">₹{(app.outstandingBalance || 0).toLocaleString("en-IN")}</p>
                                      </div>
                                      <div className="text-right">
                                        <p className="text-[8px] font-black text-slate-400 uppercase tracking-widest">Total Interest</p>
                                        <p className="text-sm font-black text-amber-600">₹{(app.totalInterest || 0).toLocaleString("en-IN")}</p>
                                      </div>
                                    </div>
                                  </div>

                                  {/* Quick Actions */}
                                  <div className="grid grid-cols-3 gap-3">
                                    {[
                                      { label: "Statement", icon: Download },
                                      { label: "EMI Calendar", icon: Calendar },
                                      { label: "Foreclosure", icon: TrendingUp },
                                    ].map((a) => (
                                      <button key={a.label} className="bg-white border border-slate-100 rounded-xl p-3 text-center hover:border-blue-100 hover:shadow-sm transition-all group">
                                        <a.icon size={18} className="text-slate-400 group-hover:text-[#2076C7] mx-auto mb-2 transition-colors" />
                                        <p className="text-[9px] font-black text-slate-500 uppercase tracking-wider group-hover:text-[#2076C7]">{a.label}</p>
                                      </button>
                                    ))}
                                  </div>
                                </div>
                              )}

                              {/* EMI Schedule Tab */}
                              {activeTab === "emi" && (
                                <div className="space-y-2">
                                  <div className="flex items-center justify-between mb-3">
                                    <p className="text-[9px] font-black text-slate-400 uppercase tracking-[0.2em]">Upcoming EMI Schedule</p>
                                    <p className="text-[10px] font-bold text-[#2076C7]">₹{(app.monthlyEMI || 0).toLocaleString("en-IN")} / month</p>
                                  </div>
                                  {app.emiSchedule.map((emi, i) => (
                                    <div key={i} className={`flex items-center justify-between p-3.5 rounded-xl border transition-all ${
                                      emi.status === "paid"
                                        ? "bg-emerald-50 border-emerald-100"
                                        : emi.status === "upcoming"
                                        ? "bg-blue-50 border-blue-200 shadow-sm"
                                        : emi.status === "due"
                                        ? "bg-red-50 border-red-200"
                                        : "bg-white border-slate-100"
                                    }`}>
                                      <div className="flex items-center gap-3">
                                        <div className={`w-8 h-8 rounded-lg flex items-center justify-center ${
                                          emi.status === "paid"
                                            ? "bg-emerald-100 text-emerald-600"
                                            : emi.status === "upcoming"
                                            ? "bg-blue-100 text-[#2076C7]"
                                            : emi.status === "due"
                                            ? "bg-red-100 text-red-500"
                                            : "bg-slate-100 text-slate-400"
                                        }`}>
                                          {emi.status === "paid" ? <CheckCircle2 size={14} /> : <Calendar size={14} />}
                                        </div>
                                        <div>
                                          <p className="text-xs font-black text-slate-800">{emi.month}</p>
                                          <p className="text-[10px] text-slate-400 font-medium">{emi.date}</p>
                                        </div>
                                      </div>
                                      <div className="text-right">
                                        <p className="text-xs font-black text-slate-800">₹{emi.amount.toLocaleString("en-IN")}</p>
                                        <span className={`text-[8px] font-black uppercase tracking-widest ${
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
                                  {app.emiSchedule.length > 0 && (
                                    <p className="text-[9px] text-slate-400 font-medium text-center mt-3 italic">
                                      Showing next {app.emiSchedule.length} EMIs. Full schedule available in your statement.
                                    </p>
                                  )}
                                </div>
                              )}

                              {/* Documents Tab */}
                              {activeTab === "documents" && (
                                <div className="space-y-2.5">
                                  {app.documents.map((doc, i) => (
                                    <div key={i} className="flex items-center justify-between p-3.5 bg-white rounded-xl border border-slate-100">
                                      <div className="flex items-center gap-3">
                                        <FileText size={16} className="text-slate-400" />
                                        <p className="text-xs font-bold text-slate-700">{doc.name}</p>
                                      </div>
                                      <span className={`text-[8px] font-black uppercase tracking-widest px-2 py-1 rounded-md border ${
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
                          <div className="p-5 space-y-3">
                            <p className="text-[9px] font-black text-slate-400 uppercase tracking-[0.2em]">Document Status</p>
                            {app.documents.map((doc, i) => (
                              <div key={i} className="flex items-center justify-between p-3 bg-slate-50 rounded-xl border border-slate-100">
                                <div className="flex items-center gap-2.5">
                                  <FileText size={14} className="text-slate-400" />
                                  <p className="text-[11px] font-bold text-slate-700">{doc.name}</p>
                                </div>
                                <span className={`text-[8px] font-black uppercase tracking-widest px-2 py-1 rounded-md border ${
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
                            {app.documents.some((d) => d.status === "pending") && (
                              <button className="w-full bg-gradient-to-r from-[#2076C7] to-[#1CADA3] text-white py-3 rounded-xl font-black text-[10px] uppercase tracking-[0.15em] hover:shadow-lg hover:opacity-90 transition-all flex items-center justify-center gap-2 mt-2">
                                Upload Pending Documents <ArrowRight size={13} />
                              </button>
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

        {/* Footer Info */}
        <div className="p-6 pt-2">
          <div className="bg-blue-50 rounded-xl p-4 border border-blue-100">
            <p className="text-[9px] font-black text-[#2076C7] uppercase tracking-[0.2em] mb-1">Need Help?</p>
            <p className="text-[10px] text-slate-600 font-medium">
              For any queries regarding your loan application, contact our support team at <span className="font-black text-[#2076C7]">support@infinityarthvishva.com</span>
            </p>
          </div>
        </div>
      </motion.div>
    </>
  );
}
