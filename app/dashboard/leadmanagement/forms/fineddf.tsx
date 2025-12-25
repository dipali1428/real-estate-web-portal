"use client";
import { useState, useRef } from "react";
import { X, CheckCircle, ChevronDown } from "lucide-react";

const STYLES = {
  input: (err: boolean) => `w-full border rounded-md p-2 bg-white text-gray-700 outline-none text-sm sm:text-base transition-all placeholder-gray-400 appearance-none ${err ? "border-red-500 focus:ring-1 focus:ring-red-500" : "border-gray-300 focus:ring-2 focus:ring-[#1CADA3] focus:border-[#1CADA3]"}`,
  label: "block text-sm font-medium mb-1 text-gray-700",
  btn: "w-full sm:w-50 bg-gradient-to-r from-[#2076C7] to-[#1CADA3] text-white py-2 rounded-md hover:from-[#1a68b0] hover:to-[#18998f] transition-colors text-sm sm:text-base font-medium shadow-md disabled:opacity-50 disabled:cursor-not-allowed",
  err: "text-red-500 text-xs mt-1"
};

export default function FixedDepositForm({ onClose }: { onClose: () => void }) {
  const [form, setForm] = useState<Record<string, string>>({
    clientName: "", phone: "", email: "", dob: "", gender: "",
    location: "", monthlyIncome: "", termValue: "", termType: "months",
    depositAmount: ""
  });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);

  const handleInputChange = (field: string, value: string) => {
    if (field === "termType") {
      setForm(prev => ({ ...prev, termType: value, termValue: "" }));
    } else {
      setForm(prev => ({ ...prev, [field]: value }));
    }
    if (errors[field]) setErrors(prev => ({ ...prev, [field]: "" }));
  };

  const validate = () => {
    const errs: Record<string, string> = {};
    const req = (f: string, msg: string) => { if (!form[f]?.trim()) errs[f] = msg; };

    req("clientName", "Name is required");
    req("dob", "DOB is required");
    req("gender", "Select gender");
    req("location", "Location is required");
    req("monthlyIncome", "Income is required");
    req("depositAmount", "Deposit amount is required");
    req("termValue", "Term value is required");

    if (!form.phone) errs.phone = "Phone is required";
    else if (form.phone.length !== 10) errs.phone = "Must be 10 digits";

    if (!form.email) errs.email = "Email is required";
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) errs.email = "Invalid email";

    if (form.termValue && parseInt(form.termValue) <= 0) {
      errs.termValue = "Value must be greater than 0";
    }

    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;
    setIsSubmitting(true);
    await new Promise(r => setTimeout(r, 1000));
    setShowSuccess(true);
    setIsSubmitting(false);
  };

  const fieldProps = (name: string) => ({
    value: form[name],
    onChange: (v: string) => handleInputChange(name, v),
    error: errors[name]
  });

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 p-2 sm:p-4 text-gray-700 overflow-y-auto">
      <div className="bg-white rounded-xl shadow-xl w-full max-w-4xl mx-auto my-auto flex flex-col relative max-h-[90vh]">
        <div className="flex justify-between items-center border-b px-4 sm:px-6 py-3 sm:py-4 shrink-0 bg-white rounded-t-xl">
          <h2 className="text-lg sm:text-xl font-semibold text-[#1CADA3]">Fixed Deposit Form</h2>
          <button onClick={onClose} className="text-gray-500 hover:text-gray-800 transition-colors"><X size={20} className="sm:w-6 sm:h-6" /></button>
        </div>

        <div className="flex-1 overflow-y-auto p-4 sm:p-6">
          <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6">

            <Field label="Client Name" placeholder="Enter full name" {...fieldProps("clientName")} required />
            <Field label="Phone Number" placeholder="10-digit mobile" onlyNumber maxLength={10} {...fieldProps("phone")} required />
            <Field label="Email ID" type="email" placeholder="Enter email address" {...fieldProps("email")} required />
            <Field label="Date of Birth" type="date" {...fieldProps("dob")} required />

            <Field label="Gender" type="select" options={["Male", "Female"]} {...fieldProps("gender")} required />
            <Field label="Location" placeholder="Enter city" {...fieldProps("location")} required />

            <Field label="Total Monthly Income" placeholder="Enter monthly income" onlyNumber {...fieldProps("monthlyIncome")} required />

            <div className="w-full">
              <label className={STYLES.label}>Term <span className="text-red-500">*</span></label>
              <div className="flex gap-2">
                <div className="flex-[2] relative">
                  <input
                    value={form.termValue}
                    onChange={(e) => handleInputChange("termValue", e.target.value)}
                    placeholder={form.termType === "months" ? "Months" : "Years"}
                    maxLength={form.termType === "months" ? 3 : 2}
                    className={STYLES.input(!!errors.termValue)}
                    onKeyDown={(e) => {
                      if (!/^[0-9]$/.test(e.key) && !["Backspace", "Delete", "ArrowLeft", "ArrowRight", "Tab"].includes(e.key)) e.preventDefault();
                    }}
                  />
                  {errors.termValue && <p className={STYLES.err}>{errors.termValue}</p>}
                </div>
                <div className="flex-1 relative">
                  <select
                    value={form.termType}
                    onChange={(e) => handleInputChange("termType", e.target.value)}
                    className={`${STYLES.input(false)} cursor-pointer`}
                  >
                    <option value="months">Months</option>
                    <option value="years">Years</option>
                  </select>
                  <ChevronDown className="absolute right-3 top-3 text-gray-400 pointer-events-none" size={16} />
                </div>
              </div>
              <p className="text-[10px] text-gray-500 mt-1">
                {form.termType === "months" ? "Maximum 3 digits" : "Maximum 2 digits"}
              </p>
            </div>

            <Field label="Fixed Deposit Amount" placeholder="Enter deposit amount" onlyNumber {...fieldProps("depositAmount")} required />

            <div className="col-span-1 md:col-span-2 flex justify-center mt-6 pb-2">
              <button type="submit" disabled={isSubmitting} className={STYLES.btn}>{isSubmitting ? "Submitting..." : "Submit Application"}</button>
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
    if (onlyNumber && !["Backspace", "Delete", "ArrowLeft", "ArrowRight", "Tab"].includes(e.key) && !/^[0-9]$/.test(e.key)) e.preventDefault();
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
          <input type={type} value={value} onChange={e => onChange(e.target.value)} onKeyDown={handleKeyDown} maxLength={maxLength} placeholder={placeholder} className={STYLES.input(!!error)} />
        )}
      </div>
      {error && <p className={STYLES.err}>{error}</p>}
    </div>
  );
}

function SuccessModal({ onClose }: { onClose: () => void }) {
  return (
    <div className="absolute inset-0 z-50 flex items-center justify-center bg-black/60 rounded-xl animate-in fade-in zoom-in duration-200">
      <div className="bg-white p-6 sm:p-8 rounded-2xl shadow-2xl text-center max-w-sm w-[90%]">
        <CheckCircle className="w-16 h-16 text-[#1CADA3] mx-auto mb-4" />
        <h3 className="text-2xl font-bold text-gray-800 mb-2">Success!</h3>
        <p className="text-gray-600 mb-6">Your Fixed Deposit application has been submitted successfully.</p>
        <button onClick={onClose} className="w-full bg-[#1CADA3] text-white py-2.5 rounded-lg hover:bg-[#178e86] font-medium transition-colors">Okay, Got it</button>
      </div>
    </div>
  );
}