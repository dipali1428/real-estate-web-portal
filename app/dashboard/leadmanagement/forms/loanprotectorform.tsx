"use client";
import { useState } from "react";
import { X, CheckCircle, ChevronDown } from "lucide-react";
import { DashboardService } from "../../../services/dashboardService";

const STYLES = {
    input: (err: boolean) => `w-full border rounded-md p-2 bg-white text-gray-700 outline-none text-sm sm:text-base transition-all placeholder-gray-400 appearance-none ${err ? "border-red-500 focus:ring-1 focus:ring-red-500" : "border-gray-300 focus:ring-2 focus:ring-[#1CADA3] focus:border-[#1CADA3]"}`,
    label: "block text-sm font-medium mb-1 text-gray-700",
    btn: "w-full sm:w-64 bg-gradient-to-r from-[#2076C7] to-[#1CADA3] text-white py-2.5 rounded-md hover:from-[#1a68b0] hover:to-[#18998f] transition-colors text-sm sm:text-base font-medium shadow-md disabled:opacity-50 disabled:cursor-not-allowed",
    err: "text-red-500 text-xs mt-1"
};

const LOAN_TYPES = [
    "Home Loan",
    "Personal Loan",
    "Business Loan",
    "Mortgage Loan",
    "SME Loan",
    "Education Loan",
    "NRP Loan",
    "Vehicle Loan",
    "Loan Against Securities / MF"
];

const TENURE_OPTIONS = ["1 Year", "2 Years", "3 Years", "5 Years", "10 Years", "15 Years", "20 Years", "25 Years", "30 Years"];

export default function LoanProtectorForm({ onClose }: { onClose: () => void }) {
    const [form, setForm] = useState<Record<string, string>>({
        name: "",
        dob: "",
        pincode: "",
        loanAmount: "",
        loanAccountNumber: "",
        loanType: "",
        loanTenure: ""
    });

    const [errors, setErrors] = useState<Record<string, string>>({});
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [showSuccess, setShowSuccess] = useState(false);

    const handleInputChange = (field: string, value: string) => {
        setForm(prev => ({ ...prev, [field]: value }));
        if (errors[field]) setErrors(prev => ({ ...prev, [field]: "" }));
    };

    const validate = () => {
        const errs: Record<string, string> = {};
        const req = (f: string, msg: string) => { if (!form[f]?.trim()) errs[f] = msg; };

        req("name", "Full Name is required");
        req("dob", "Date of Birth is required");
        req("loanAmount", "Loan Amount is required");
        req("loanAccountNumber", "Account Number is required");
        req("loanType", "Select a loan type");
        req("loanTenure", "Select loan tenure");

        if (!form.pincode) {
            errs.pincode = "Pincode is required";
        } else if (form.pincode.length !== 6) {
            errs.pincode = "Pincode must be 6 digits";
        }

        setErrors(errs);
        return Object.keys(errs).length === 0;
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!validate()) return;
        setIsSubmitting(true);

      try {
        const payload = {
          department: "Insurance",
          product_type: "Loan Protector",
          sub_category: "Loan Protector",
          client: {
            name: form.name,
            mobile: form.phone || "NA",
            email: form.email || "NA",
          },
          meta: {
            is_self_login: false,
          },
          form_data: {
            dob: form.dob,
            pincode: form.pincode,
            loanAmount: form.loanAmount,
            loanAccountNumber: form.loanAccountNumber,
            loanType: form.loanType,
            loanTenure: form.loanTenure
          }
        };

        await DashboardService.createLead(payload);
        setShowSuccess(true);
      } catch (err) {
        console.error("Submission error:", err);
        alert("Something went wrong. Please try again.");
      } finally {
        setIsSubmitting(false);
      }
    };

    const fieldProps = (name: string) => ({
        value: form[name],
        onChange: (v: string) => handleInputChange(name, v),
        error: errors[name]
    });

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 p-2 sm:p-4 text-gray-700">
            <div className="bg-white rounded-xl shadow-xl w-full max-w-2xl mx-auto flex flex-col relative animate-in fade-in zoom-in duration-200">

                {/* Header */}
                <div className="flex justify-between items-center border-b px-6 py-4 shrink-0 bg-white rounded-t-xl">
                    <div className="flex flex-col">
                        <h2 className="text-lg sm:text-xl font-semibold text-[#1CADA3]">Loan Protector Plan</h2>
                        <p className="text-[10px] text-gray-400 uppercase tracking-wider font-bold">Secure your liability</p>
                    </div>
                    <button onClick={onClose} className="text-gray-400 hover:text-gray-800 transition-colors">
                        <X size={24} />
                    </button>
                </div>

                {/* Body */}
                <div className="flex-1 overflow-y-auto p-6">
                    <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-5">

                        <Field label="Name" placeholder="Enter full name" {...fieldProps("name")} required />

                        <Field label="Date of Birth" type="date" {...fieldProps("dob")} required />

                        <Field label="Pincode" placeholder="6-digit pincode" maxLength={6} onlyNumber {...fieldProps("pincode")} required />

                        <Field label="Loan Amount" placeholder="Outstanding amount" onlyNumber {...fieldProps("loanAmount")} required />

                        <Field label="Loan Account Number" placeholder="Enter account number" {...fieldProps("loanAccountNumber")} required />

                        <Field label="Loan Type" type="select" options={LOAN_TYPES} {...fieldProps("loanType")} required />

                        <Field label="Loan Tenure" type="select" options={TENURE_OPTIONS} {...fieldProps("loanTenure")} required />

                        <div className="col-span-1 md:col-span-2 flex flex-col items-center gap-3 mt-6">
                            <button type="submit" disabled={isSubmitting} className={STYLES.btn}>
                                {isSubmitting ? "Submitting..." : "Submit"}
                            </button>
                            <p className="text-[11px] text-gray-400 italic">Note: Coverage is subject to eligibility and verification.</p>
                        </div>
                    </form>
                </div>

                {showSuccess && <SuccessModal onClose={onClose} />}
            </div>
        </div>
    );
}

function Field({ label, value, onChange, type = "text", options, required, placeholder, onlyNumber, maxLength, error }: any) {
    const handleKeyDown = (e: React.KeyboardEvent) => {
        // Check if it's a Paste command (Ctrl+V or Cmd+V)
        const isPaste = (e.ctrlKey || e.metaKey) && e.key.toLowerCase() === 'v';
        
        // Check if it's a Copy/Select All command (Optional but recommended)
        const isCopyOrSelect = (e.ctrlKey || e.metaKey) && ['c', 'a', 'x'].includes(e.key.toLowerCase());
      
        if (onlyNumber) {
          // Allow the event if it's a paste, copy, select all, or navigation key
          if (isPaste || isCopyOrSelect || ["Backspace", "Delete", "ArrowLeft", "ArrowRight", "Tab"].includes(e.key)) {
            return;
          }
          // Prevent if it's not a number
          if (!/^[0-9]$/.test(e.key)) {
            e.preventDefault();
          }
        }
      };

    return (
        <div className="w-full relative">
            <label className={STYLES.label}>{label} {required && <span className="text-red-500">*</span>}</label>
            <div className="relative">
                {type === "select" ? (
                    <>
                        <select value={value} onChange={e => onChange(e.target.value)} className={`${STYLES.input(!!error)} cursor-pointer`}>
                            <option value="">Select {label}</option>
                            {options?.map((opt: string) => <option key={opt} value={opt}>{opt}</option>)}
                        </select>
                        <ChevronDown className="absolute right-3 top-3 text-gray-400 pointer-events-none" size={16} />
                    </>
                ) : (
                    <input
                        type={type}
                        value={value}
                        onChange={e => onChange(e.target.value)}
                        onKeyDown={handleKeyDown}
                        maxLength={maxLength}
                        placeholder={placeholder}
                        className={STYLES.input(!!error)}
                    />
                )}
            </div>
            {error && <p className={STYLES.err}>{error}</p>}
        </div>
    );
}

function SuccessModal({ onClose }: { onClose: () => void }) {
    return (
        <div className="absolute inset-0 z-50 flex items-center justify-center bg-black/60 rounded-xl animate-in fade-in zoom-in duration-200">
            <div className="bg-white p-6 sm:p-8 rounded-2xl shadow-2xl text-center max-w-sm w-[90%] mx-auto">
                <CheckCircle className="w-16 h-16 text-[#1CADA3] mx-auto mb-4" />
                <h3 className="text-2xl font-bold text-gray-800 mb-2">Success!</h3>
                <p className="text-gray-600 mb-6">Your Loan Protector application has been submitted successfully. Our team will contact you shortly.</p>
                <button onClick={onClose} className="w-full bg-[#1CADA3] text-white py-2.5 rounded-lg hover:bg-[#178e86] font-medium transition-colors">
                    Got it
                </button>
            </div>
        </div>
    );
}