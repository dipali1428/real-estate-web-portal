"use client";

import React from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  X,
  Building2,
  IndianRupee,
  Briefcase,
  FileText,
  ArrowRight,
  User,
  Phone,
  Mail,
  Calendar,
  MapPin,
  CreditCard,
  TrendingUp,
  Clock,
  CheckCircle
} from "lucide-react";

interface NewApplicationFormProps {
  isOpen: boolean;
  onClose: () => void;
}

const inputClass =
  "w-full pl-10 pr-4 py-3 bg-gray-50 border border-gray-200 rounded-xl text-sm font-medium text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all";

const labelClass = "text-[10px] font-black text-gray-500 uppercase tracking-widest mb-1.5 block";

function Field({ icon: Icon, placeholder, type = "text", className = "" }: {
  icon: React.ElementType;
  placeholder: string;
  type?: string;
  className?: string;
}) {
  return (
    <div className={`relative ${className}`}>
      <Icon className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400" size={16} />
      <input
        type={type}
        placeholder={placeholder}
        className={inputClass}
      />
    </div>
  );
}

function SelectField({ icon: Icon, options, placeholder }: {
  icon: React.ElementType;
  options: string[];
  placeholder: string;
}) {
  return (
    <div className="relative">
      <Icon className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400 z-10" size={16} />
      <select defaultValue="" className="w-full pl-10 pr-4 py-3 bg-gray-50 border border-gray-200 rounded-xl text-sm font-medium text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all appearance-none">
        <option value="" disabled>{placeholder}</option>
        {options.map(opt => <option key={opt} value={opt}>{opt}</option>)}
      </select>
    </div>
  );
}

export default function NewApplicationForm({ isOpen, onClose }: NewApplicationFormProps) {
  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/40 backdrop-blur-sm z-40"
          />

          {/* Modal */}
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 pointer-events-none">
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              transition={{ type: "spring", duration: 0.5 }}
              className="bg-white rounded-3xl shadow-2xl w-full max-w-2xl overflow-hidden pointer-events-auto border border-gray-100 flex flex-col font-sans max-h-[90vh]"
            >
              {/* Header */}
              <div className="flex items-center justify-between px-6 py-5 border-b border-gray-100 bg-gradient-to-r from-[#2076C7]/5 to-[#1CADA3]/5 shrink-0">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 flex items-center justify-center rounded-xl bg-gradient-to-r from-[#2076C7] to-[#1CADA3] text-white shadow-sm">
                    <Briefcase size={20} />
                  </div>
                  <div>
                    <h2 className="text-lg font-black text-transparent bg-clip-text bg-gradient-to-r from-[#2076C7] to-[#1CADA3]">New Business Loan</h2>
                    <p className="text-[10px] text-gray-400 font-black uppercase tracking-widest mt-0.5">Fill all required details</p>
                  </div>
                </div>
                <button onClick={onClose} className="p-2 text-gray-400 hover:text-gray-700 hover:bg-gray-100 rounded-xl transition-all">
                  <X size={20} />
                </button>
              </div>

              {/* Body */}
              <div className="p-6 overflow-y-auto flex-1 space-y-6">

                {/* Section 1: Applicant Info */}
                <Section label="Applicant Information">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <Field icon={User} placeholder="Full Name" />
                    <Field icon={Phone} placeholder="Mobile Number" type="tel" />
                    <Field icon={Mail} placeholder="Email Address" type="email" />
                    <Field icon={Calendar} placeholder="Date of Birth" type="date" />
                    <Field icon={MapPin} placeholder="City" />
                    <SelectField
                      icon={MapPin}
                      placeholder="Select State"
                      options={["Maharashtra", "Gujarat", "Delhi", "Karnataka", "Tamil Nadu", "Rajasthan", "Uttar Pradesh", "West Bengal", "Telangana", "Other"]}
                    />
                  </div>
                </Section>

                {/* Section 2: Business Info */}
                <Section label="Business Details">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <Field icon={Building2} placeholder="Business / Company Name" className="sm:col-span-2" />
                    <SelectField
                      icon={Briefcase}
                      placeholder="Business Type"
                      options={["Proprietorship", "Partnership", "Private Limited", "LLP", "Public Limited", "Trust / NGO"]}
                    />
                    <SelectField
                      icon={Clock}
                      placeholder="Business Vintage"
                      options={["Less than 1 year", "1 – 2 years", "2 – 3 years", "3 – 5 years", "5+ years"]}
                    />
                    <Field icon={FileText} placeholder="GSTIN Number" />
                    <Field icon={FileText} placeholder="PAN Number of Business" />
                  </div>
                </Section>

                {/* Section 3: Financial Info */}
                <Section label="Financial Details">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <Field icon={IndianRupee} placeholder="Annual Turnover (₹)" type="number" />
                    <Field icon={TrendingUp} placeholder="Monthly Revenue (₹)" type="number" />
                    <Field icon={CreditCard} placeholder="Approx. CIBIL Score" type="number" />
                    <SelectField
                      icon={CheckCircle}
                      placeholder="Existing Loan?"
                      options={["No existing loans", "Yes – 1 loan", "Yes – 2 or more loans"]}
                    />
                  </div>
                </Section>

                {/* Section 4: Loan Requirement */}
                <Section label="Loan Requirement">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <Field icon={IndianRupee} placeholder="Desired Loan Amount (₹)" type="number" />
                    <SelectField
                      icon={Clock}
                      placeholder="Preferred Tenure"
                      options={["12 Months", "24 Months", "36 Months", "48 Months", "60 Months", "72 Months", "84 Months"]}
                    />
                    <SelectField
                      icon={Briefcase}
                      placeholder="Loan Purpose"
                      options={["Working Capital", "Business Expansion", "Equipment Purchase", "Inventory", "Debt Consolidation", "Other"]}
                    />
                    <SelectField
                      icon={Briefcase}
                      placeholder="Loan Type"
                      options={["Term Loan", "Top Up", "Balance Transfer", "OD (Overdraft)"]}
                    />
                  </div>
                </Section>

              </div>

              {/* Footer */}
              <div className="px-6 py-4 border-t border-gray-100 bg-gray-50/60 flex flex-col sm:flex-row justify-end gap-3 shrink-0">
                <button
                  onClick={onClose}
                  className="w-full sm:w-auto px-6 py-3 bg-white border border-gray-200 text-gray-600 rounded-xl font-bold text-xs uppercase tracking-widest hover:bg-gray-50 transition-all shadow-sm active:scale-95"
                >
                  Cancel
                </button>
                <button className="w-full sm:w-auto flex items-center justify-center gap-2 px-8 py-3 bg-gradient-to-r from-[#2076C7] to-[#1CADA3] text-white rounded-xl font-black text-xs uppercase tracking-widest transition-all active:scale-95 shadow-lg hover:shadow-teal-500/30">
                  Submit Application
                  <ArrowRight size={16} />
                </button>
              </div>
            </motion.div>
          </div>
        </>
      )}
    </AnimatePresence>
  );
}

function Section({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div className="space-y-3">
      <div className="flex items-center gap-3">
        <p className="text-[10px] font-black text-gray-500 uppercase tracking-[0.2em] whitespace-nowrap">{label}</p>
        <div className="flex-1 h-px bg-gray-100" />
      </div>
      {children}
    </div>
  );
}
