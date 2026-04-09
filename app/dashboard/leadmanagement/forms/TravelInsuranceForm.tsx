"use client";

import { useState } from "react";
import { X, CheckCircle, ChevronDown, Loader2 } from "lucide-react";
import { DashboardService } from "../../../services/dashboardService";

const STYLES = {
  input: (err: boolean) => `w-full border rounded-md p-2 bg-white text-gray-700 outline-none text-sm sm:text-base transition-all placeholder-gray-400 appearance-none ${err ? "border-red-500 focus:ring-1 focus:ring-red-500" : "border-gray-300 focus:ring-2 focus:ring-[#1CADA3] focus:border-[#1CADA3]"}`,
  label: "block text-sm font-medium mb-1 text-gray-700",
  btn: "w-full sm:w-60 bg-gradient-to-r from-[#2076C7] to-[#1CADA3] text-white py-2 rounded-md hover:from-[#1a68b0] hover:to-[#18998f] transition-colors text-sm sm:text-base font-medium shadow-md disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center",
  err: "text-red-500 text-xs mt-1"
};

interface TravelInsuranceFormProps {
  onClose: () => void;
}

export default function TravelInsuranceForm({ onClose }: TravelInsuranceFormProps) {
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    email: "",
    dob: "",
    location: "",
    designation: "",
    duration: "",
    transport: "",
    sumAssured: "",
  });

  const [errors, setErrors] = useState<{ [key: string]: string }>({});
  const [loading, setLoading] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);

  const handleInput = (field: string, value: string) => {
    const finalValue = field === "email" ? value.toLowerCase() : value;
    setFormData({ ...formData, [field]: finalValue });
    if (errors[field]) setErrors((prev) => ({ ...prev, [field]: "" }));
  };

  const validateForm = () => {
    const newErrors: any = {};
    const req = (f: string, msg: string) => { if (!formData[f as keyof typeof formData]) newErrors[f] = msg; };

    req("name", "Client name is required");
    req("email", "Email is required");
    req("dob", "Date of birth is required");
    req("location", "Location is required");
    req("duration", "Duration of travel is required");
    req("transport", "Transport mode is required");
    req("sumAssured", "Sum assured is required");

    if (!formData.phone) {
        newErrors.phone = "Phone number is required";
    } else if (formData.phone.length !== 10) {
        newErrors.phone = "Phone number must be 10 digits";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const submitForm = async (e: React.FormEvent) => {
    e.preventDefault();

    if (validateForm()) {
      setLoading(true);
      try {
        // Updated payload to match HomeLoanForm / createLead structure
        const payload = {
          department: "Insurance",
          product_type: "Travel Insurance",
          sub_category: "Travel Insurance",
          client: {
            name: formData.name,
            mobile: formData.phone,
            email: formData.email,
          },
          meta: {
            is_self_login: false,
          },
          form_data: {
            dob: formData.dob,
            location: formData.location,
            designation: formData.designation,
            duration: formData.duration,
            transport: formData.transport,
            sumAssured: `${formData.sumAssured}.00`,
          }
        };

        // Using the same generic createLead API used in HomeLoanForm
        await DashboardService.createLead(payload);
        setShowSuccess(true);
      } catch (error: any) {
        setErrors({ api: error.response?.data?.message || "Something went wrong. Please try again." });
      } finally {
        setLoading(false);
      }
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 p-2 sm:p-4 text-gray-700 overflow-y-auto">
      <div className="bg-white rounded-xl shadow-xl w-full max-w-4xl mx-auto my-auto flex flex-col relative max-h-[90vh]">
        
        <div className="flex justify-between items-center border-b px-4 sm:px-6 py-3 sm:py-4 shrink-0 bg-white rounded-t-xl">
          <h2 className="text-lg sm:text-xl font-semibold text-[#1CADA3]">Travel Insurance Form</h2>
          <button className="text-gray-500 hover:text-gray-800 transition-colors" onClick={onClose} disabled={loading}>
            <X size={20} className="sm:w-6 sm:h-6" />
          </button>
        </div>

        <div className="flex-1 overflow-y-auto p-4 sm:p-6">
          <form className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6" onSubmit={submitForm}>
            
            <Field 
              label="Client Name" 
              placeholder="Enter client name" 
              value={formData.name} 
              onChange={(v: string) => handleInput("name", v)} 
              error={errors.name} 
              required 
            />

            <Field 
              label="Phone Number" 
              placeholder="Enter 10-digit phone number" 
              value={formData.phone} 
              onChange={(v: string) => handleInput("phone", v.replace(/\D/g, ""))} 
              maxLength={10}
              onlyNumber
              error={errors.phone} 
              required 
            />

            <Field 
              label="Email ID" 
              type="email"
              placeholder="enter email address" 
              value={formData.email} 
              onChange={(v: string) => handleInput("email", v)} 
              error={errors.email} 
              required 
            />

            <Field 
              label="Date of Birth" 
              type="date"
              value={formData.dob} 
              onChange={(v: string) => handleInput("dob", v)} 
              error={errors.dob} 
              required 
            />

            <Field 
              label="Location" 
              placeholder="Enter your location" 
              value={formData.location} 
              onChange={(v: string) => handleInput("location", v)} 
              error={errors.location} 
              required 
            />

            <Field 
              label="Designation" 
              placeholder="Enter designation" 
              value={formData.designation} 
              onChange={(v: string) => handleInput("designation", v)} 
              error={errors.designation} 
            />

            <Field 
              label="Duration Of Travel" 
              placeholder="Enter duration (e.g. 15 days)" 
              value={formData.duration} 
              onChange={(v: string) => handleInput("duration", v)} 
              error={errors.duration} 
              required 
            />

            <Field 
              label="Mode Of Transport" 
              type="select"
              options={["Air", "Sea", "Land"]}
              value={formData.transport} 
              onChange={(v: string) => handleInput("transport", v)} 
              error={errors.transport} 
              required 
            />

            <Field 
              label="Sum Assured Amount" 
              type="number"
              placeholder="Enter amount" 
              value={formData.sumAssured} 
              onlyNumber
              onChange={(v: string) => handleInput("sumAssured", v)} 
              error={errors.sumAssured} 
              required 
            />

            <div className="col-span-1 md:col-span-2 mt-4 flex flex-col items-center pb-2">
              <button
                type="submit"
                disabled={loading}
                className={STYLES.btn}
              >
                {loading ? <Loader2 className="animate-spin mr-2" size={18} /> : "Submit Application"}
              </button>

              {errors.api && <p className={STYLES.err}>{errors.api}</p>}
            </div>
          </form>
        </div>

        {showSuccess && <SuccessModal onClose={onClose} />}
      </div>
    </div>
  );
}

function Field({ label, value, onChange, type = "text", options, required, placeholder, onlyNumber, maxLength, error, disabled }: any) {
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
    <div className={`w-full relative ${disabled ? 'opacity-70' : ''}`}>
      <label className={STYLES.label}>
        {label} {required && <span className="text-red-500">*</span>}
      </label>
      <div className="relative">
        {type === "select" ? (
          <>
            <select
              value={value}
              onChange={e => onChange(e.target.value)}
              disabled={disabled}
              className={`${STYLES.input(!!error)} cursor-pointer`}
            >
              <option value="">{placeholder || `Select ${label}`}</option>
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
            disabled={disabled}
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
    <div className="absolute inset-0 z-50 flex items-center justify-center bg-black/60 rounded-xl animate-in fade-in zoom-in duration-200 p-4">
      <div className="bg-white p-6 sm:p-8 rounded-2xl shadow-2xl text-center max-w-sm w-full">
        <CheckCircle className="w-16 h-16 text-[#1CADA3] mx-auto mb-4" />
        <h3 className="text-2xl font-bold text-gray-800 mb-2">Success!</h3>
        <p className="text-gray-600 mb-6">Your Travel Insurance lead has been submitted successfully.</p>
        <button 
          onClick={onClose} 
          className="w-full bg-[#1CADA3] text-white py-2.5 rounded-lg hover:bg-[#178e86] font-medium transition-colors"
        >
          Okay, Got it
        </button>
      </div>
    </div>
  );
}