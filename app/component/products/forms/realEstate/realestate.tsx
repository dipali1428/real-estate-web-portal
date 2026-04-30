"use client";
import { useState } from "react";
import { X, CheckCircle, ChevronDown } from "lucide-react";
import { AuthService } from "@/app/services/authService";
import { toast } from "react-hot-toast";

const STYLES = {
  input: (err: boolean) => `w-full border rounded-md p-2 bg-white text-gray-700 outline-none text-sm sm:text-base transition-all placeholder-gray-400 appearance-none ${err ? "border-red-500 focus:ring-1 focus:ring-red-500" : "border-gray-300 focus:ring-2 focus:ring-[#1CADA3] focus:border-[#1CADA3]"}`,
  label: "block text-sm font-medium mb-1 text-gray-700",
  btn: "w-full sm:w-50 bg-gradient-to-r from-[#2076C7] to-[#1CADA3] text-white py-2 rounded-md hover:from-[#1a68b0] hover:to-[#18998f] transition-colors text-sm sm:text-base font-medium shadow-md disabled:opacity-50 disabled:cursor-not-allowed",
  err: "text-red-500 text-xs mt-1"
};

const REALESTATE_TYPES = ["Investment", "Residential", "Commercial"];

export default function RealEstateForm({ onClose }: { onClose: () => void }) {
  const [form, setForm] = useState<Record<string, string>>({
    clientName: "", 
    phone: "", 
    email: "", 
    dob: "", 
    location: "",
    capitalAvailable: "", 
    appointmentDate: "", 
    realestateType: ""
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

    req("clientName", "Client name is required");
    req("dob", "Date of birth is required");
    req("location", "Location is required");
    req("capitalAvailable", "Capital available is required");
    req("appointmentDate", "Appointment date is required");
    req("realestateType", "Select real estate type");

    if (!form.phone) errs.phone = "Phone number is required";
    else if (form.phone.length !== 10) errs.phone = "Must be 10 digits";

    if (!form.email) errs.email = "Email is required";
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) errs.email = "Invalid email format";

    if (form.dob) {
      const birthDate = new Date(form.dob);
      if (birthDate >= new Date()) errs.dob = "Date of birth must be in the past";
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
        department: "Real Estate",
        product_type: "Real Estate",
        sub_category: "Real Estate",
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
          location: form.location,
          capitalAvailable: form.capitalAvailable,
          appointmentDate: form.appointmentDate,
          realestateType: form.realestateType
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
          <h2 className="text-lg sm:text-xl font-semibold text-[#1CADA3]">Real Estate Form</h2>
          <button onClick={onClose} className="text-gray-500 hover:text-gray-800 transition-colors">
            <X size={20} className="sm:w-6 sm:h-6" />
          </button>
        </div>

        <div className="flex-1 overflow-y-auto p-4 sm:p-6">
          <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6">
            
            <Field label="Client Name" placeholder="Enter Client Name" {...fieldProps("clientName")} required />
            <Field label="Client Phone No" placeholder="10-digit mobile" onlyNumber maxLength={10} {...fieldProps("phone")} required />
            <Field label="Client Email ID" type="email" placeholder="Enter Client Email ID" {...fieldProps("email")} required />
            <Field label="Client Date of Birth" type="date" {...fieldProps("dob")} required />
            <Field label="Location" placeholder="Enter location" {...fieldProps("location")} required />
            
            <Field label="Capital Available" placeholder="Enter available capital" onlyNumber {...fieldProps("capitalAvailable")} required />
            <Field label="Take an Appointment" type="date" {...fieldProps("appointmentDate")} required />
            
            <Field label="Type of Real Estate" type="select" options={REALESTATE_TYPES} {...fieldProps("realestateType")} required />

            <div className="col-span-1 md:col-span-2 flex justify-center mt-6 pb-2">
              <button type="submit" disabled={isSubmitting} className={STYLES.btn}>
                {isSubmitting ? "Submitting..." : "Submit Application"}
              </button>
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
      <div className="bg-white p-6 sm:p-8 rounded-2xl shadow-2xl text-center max-w-sm w-[90%]">
        <CheckCircle className="w-16 h-16 text-[#1CADA3] mx-auto mb-4" />
        <h3 className="text-2xl font-bold text-gray-800 mb-2">Success!</h3>
        <p className="text-gray-600 mb-6">Your Real Estate application has been submitted successfully.</p>
        <button onClick={onClose} className="w-full bg-[#1CADA3] text-white py-2.5 rounded-lg hover:bg-[#178e86] font-medium transition-colors">Okay, Got it</button>
      </div>
    </div>
  );
}