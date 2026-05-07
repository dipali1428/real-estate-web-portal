"use client";
import { useState, useEffect } from "react";
import { X, CheckCircle, Plus, Trash2, ChevronDown } from "lucide-react";
import { AuthService } from "@/app/services/authService";
import { toast } from "react-hot-toast";

const STYLES = {
  input: (err: boolean) => `w-full border rounded-md p-2 bg-white text-gray-700 outline-none text-sm sm:text-base transition-all placeholder-gray-400 appearance-none ${err ? "border-red-500 focus:ring-1 focus:ring-red-500" : "border-gray-300 focus:ring-2 focus:ring-[#1CADA3] focus:border-[#1CADA3]"}`,
  label: "block text-sm font-medium mb-1 text-gray-700",
  btn: "w-full sm:w-50 bg-gradient-to-r from-[#2076C7] to-[#1CADA3] text-white py-2 rounded-md hover:from-[#1a68b0] hover:to-[#18998f] transition-colors text-sm sm:text-base font-medium shadow-md disabled:opacity-50 disabled:cursor-not-allowed",
  err: "text-red-500 text-xs mt-1"
};

const INCOME_TYPES = ["Salary Income", "Incentives / Commission", "Business Income", "Rental Income", "Pension Income", "Other Income"];
const RELATIONSHIPS = ["Spouse", "Child", "Parent", "Sibling", "Other"];

interface Dependent {
  id: string;
  name: string;
  dob: string;
  relationship: string;
}

export default function WealthManagementForm({ onClose }: { onClose: () => void }) {
  const [form, setForm] = useState<any>({
    clientName: "", phone: "", email: "", dob: "", totalDependents: "",
    incomeType: "", monthlyIncome: "", rentalLiability: "",
    loanLiability: "", insuranceLiability: "", investmentLiability: ""
  });
  const [dependents, setDependents] = useState<Dependent[]>([]);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);

  // Sync Dependents List when totalDependents count changes
  useEffect(() => {
    const count = Math.min(Math.max(0, parseInt(form.totalDependents) || 0), 9);
    setDependents(prev => {
      if (count === prev.length) return prev;
      if (count > prev.length) {
        const added = Array.from({ length: count - prev.length }, () => ({
          id: Math.random().toString(36).substr(2, 9),
          name: "", dob: "", relationship: ""
        }));
        return [...prev, ...added];
      }
      return prev.slice(0, count);
    });
  }, [form.totalDependents]);

  const handleInputChange = (field: string, value: string) => {
    setForm((prev: any) => ({ ...prev, [field]: value }));
    if (errors[field]) setErrors(p => ({ ...p, [field]: "" }));
  };

  const handleDependentChange = (id: string, field: string, value: string) => {
    setDependents(prev => prev.map(d => d.id === id ? { ...d, [field]: value } : d));
    if (errors[`dep_${field}_${id}`]) setErrors(p => ({ ...p, [`dep_${field}_${id}`]: "" }));
  };

  const addDependent = () => {
    if (dependents.length >= 9) return;
    handleInputChange("totalDependents", (dependents.length + 1).toString());
  };

  const removeDependent = (id: string) => {
    const newCount = Math.max(0, dependents.length - 1);
    handleInputChange("totalDependents", newCount.toString());
  };

  const validate = () => {
    const errs: Record<string, string> = {};
    const req = (f: string, msg: string) => { if (!String(form[f] || "").trim()) errs[f] = msg; };

    req("clientName", "Name is required");
    req("dob", "DOB is required");
    req("incomeType", "Select income type");
    req("monthlyIncome", "Monthly income is required");
    req("totalDependents", "Total dependents is required");

    if (!form.phone) errs.phone = "Phone is required";
    else if (form.phone.length !== 10) errs.phone = "Must be 10 digits";

    if (!form.email) errs.email = "Email is required";
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) errs.email = "Invalid email format";

    dependents.forEach((dep) => {
      if (!dep.name.trim()) errs[`dep_name_${dep.id}`] = "Required";
      if (!dep.dob) errs[`dep_dob_${dep.id}`] = "Required";
      if (!dep.relationship) errs[`dep_rel_${dep.id}`] = "Required";
    });

    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;
    setIsSubmitting(true);

    try {
      const payload = {
        department: "Investment",
        product_type: "Wealth Management",
        sub_category: "Wealth Management",
        client: {
          name: form.clientName,
          mobile: form.phone,
          email: form.email,
        },
        meta: {
          is_self_login: false,
        },
        form_data: {
          dob: form.dob,
          totalDependents: form.totalDependents,
          incomeType: form.incomeType,
          monthlyIncome: form.monthlyIncome,
          rentalLiability: form.rentalLiability || "0",
          loanLiability: form.loanLiability || "0",
          insuranceLiability: form.insuranceLiability || "0",
          investmentLiability: form.investmentLiability || "0"
        }
      };

      await AuthService.createLead(payload);
      setShowSuccess(true);
    } catch (err) {
      toast.error("Submission error:");
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
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 p-2 sm:p-4 text-gray-700 overflow-y-auto">
      <div className="bg-white rounded-xl shadow-xl w-full max-w-4xl mx-auto my-auto flex flex-col relative max-h-[90vh]">
        <div className="flex justify-between items-center border-b px-4 sm:px-6 py-3 sm:py-4 shrink-0 bg-white rounded-t-xl">
          <h2 className="text-lg sm:text-xl font-semibold text-[#1CADA3]">Wealth Management Form</h2>
          <button onClick={onClose} className="text-gray-500 hover:text-gray-800 transition-colors"><X size={20} className="sm:w-6 sm:h-6" /></button>
        </div>

        <div className="flex-1 overflow-y-auto p-4 sm:p-6">
          <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6">

            <Field label="Client Name" placeholder="Enter full name" {...fieldProps("clientName")} required />
            <Field label="Client Phone No" placeholder="10-digit mobile" onlyNumber maxLength={10} {...fieldProps("phone")} required />
            <Field label="Client Email ID" type="email" placeholder="client@example.com" {...fieldProps("email")} required />
            <Field label="Client Date of Birth" type="date" {...fieldProps("dob")} required />

            <Field label="Income Type" type="select" options={INCOME_TYPES} {...fieldProps("incomeType")} required />
            <Field label="Monthly Income (₹)" placeholder="Enter amount" onlyNumber {...fieldProps("monthlyIncome")} required />

            <Field label="Total No. of Dependents" placeholder="0-9" onlyNumber maxLength={1} {...fieldProps("totalDependents")} required />

            {/* Dynamic Dependents Section */}
            {dependents.length > 0 && (
              <div className="col-span-1 md:col-span-2 mt-4">
                <div className="flex justify-between items-center border-b pb-2 mb-4">
                  <h3 className="text-md font-semibold text-[#1CADA3]">Dependents Details</h3>
                  <button type="button" onClick={addDependent} disabled={dependents.length >= 9} className="text-sm font-medium text-[#1CADA3] hover:underline disabled:opacity-50 flex items-center gap-1">
                    <Plus size={14} /> Add Dependent
                  </button>
                </div>

                <div className="space-y-4">
                  {dependents.map((dep, index) => (
                    <div key={dep.id} className="p-4 bg-gray-50 rounded-lg border border-gray-200 relative">
                      <button type="button" onClick={() => removeDependent(dep.id)} className="absolute top-2 right-2 text-gray-400 hover:text-red-500">
                        <Trash2 size={16} />
                      </button>
                      <span className="text-xs font-bold text-gray-400 uppercase mb-3 block">Dependent #{index + 1}</span>
                      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                        <Field
                          label="Name"
                          value={dep.name}
                          onChange={(v: string) => handleDependentChange(dep.id, "name", v)}
                          error={errors[`dep_name_${dep.id}`]}
                          required
                        />
                        <Field
                          label="Date of Birth"
                          type="date"
                          value={dep.dob}
                          onChange={(v: string) => handleDependentChange(dep.id, "dob", v)}
                          error={errors[`dep_dob_${dep.id}`]}
                          required
                        />
                        <Field
                          label="Relationship"
                          type="select"
                          options={RELATIONSHIPS}
                          value={dep.relationship}
                          onChange={(v: string) => handleDependentChange(dep.id, "relationship", v)}
                          error={errors[`dep_rel_${dep.id}`]}
                          required
                        />
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Liabilities (Optional) */}
            <div className="col-span-1 md:col-span-2 mt-4">
              <h3 className="text-md font-semibold mb-3 text-[#1CADA3] border-b pb-2">Liabilities & Obligations</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6">
                <Field label="Rental Liability" placeholder="Monthly rent" onlyNumber {...fieldProps("rentalLiability")} />
                <Field label="Loan Liability" placeholder="Monthly EMIs" onlyNumber {...fieldProps("loanLiability")} />
                <Field label="Insurance Liability" placeholder="Premium payments" onlyNumber {...fieldProps("insuranceLiability")} />
                <Field label="Investment Liability" placeholder="SIPs/Commitments" onlyNumber {...fieldProps("investmentLiability")} />
              </div>
            </div>

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
        <p className="text-gray-600 mb-6">Your Wealth Management assessment has been submitted successfully.</p>
        <button onClick={onClose} className="w-full bg-[#1CADA3] text-white py-2.5 rounded-lg hover:bg-[#178e86] font-medium transition-colors">Okay, Got it</button>
      </div>
    </div>
  );
}