"use client";
import { useState } from "react";
import { X } from "lucide-react";

export default function FixedDepositForm({ onClose }: { onClose: () => void }) {
  const [formData, setFormData] = useState({
    clientName: "",
    phone: "",
    email: "",
    dob: "",
    location: "",
    depositAmount: "",
    termValue: "",
    termType: "months", // months or years
    monthlyIncome: "",
    gender: "", // male, female
  });

  const [error, setError] = useState(false);
  const [success, setSuccess] = useState(false);

  // Update form values
  const handleChange = (key: string, value: string | boolean) => {
    setFormData({ ...formData, [key]: value });
  };

  // Handle term input with digit limits based on term type
  const handleTermChange = (value: string) => {
    let processedValue = value;
    
    if (formData.termType === "months") {
      // Limit to 3 digits for months (max 999 months = ~83 years)
      if (value.length > 3) {
        processedValue = value.slice(0, 3);
      }
    } else {
      // Limit to 2 digits for years (max 99 years)
      if (value.length > 2) {
        processedValue = value.slice(0, 2);
      }
    }
    
    handleChange("termValue", processedValue);
  };

  // Handle term type change separately
  const handleTermTypeChange = (value: string) => {
    // Clear term value when switching between months/years
    setFormData({ ...formData, termType: value, termValue: "" });
  };

  // Validate before submit
  const submitForm = (e: any) => {
    e.preventDefault();
    setError(false);
    setSuccess(false);

    // Check all required fields
    const requiredFields = [
      formData.clientName,
      formData.phone,
      formData.email,
      formData.dob,
      formData.location,
      formData.depositAmount,
      formData.termValue,
      formData.monthlyIncome,
      formData.gender,
    ];

    for (const field of requiredFields) {
      if (!field) {
        setError(true);
        return;
      }
    }

    // Validate phone number length
    if (formData.phone.length !== 10) {
      setError(true);
      return;
    }

    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(formData.email)) {
      setError(true);
      return;
    }

    // Validate term value
    if (!formData.termValue || parseInt(formData.termValue) <= 0) {
      setError(true);
      return;
    }

    // If all good
    setSuccess(true);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 p-2 sm:p-4">
      <div className="bg-white rounded-xl shadow-xl w-full max-w-4xl mx-auto h-[95vh] sm:h-[90vh] flex flex-col">
        
        {/* Header */}
        <div className="flex justify-between items-center border-b px-4 sm:px-6 py-3 sm:py-4 flex-shrink-0">
          <h2 className="text-lg sm:text-xl font-semibold text-[#1CADA3]">Fixed Deposit Form</h2>
          <button onClick={onClose} className="text-gray-600 hover:text-gray-800">
            <X size={20} className="sm:w-6 sm:h-6" />
          </button>
        </div>

        {/* Scrollable Form Body */}
        <div className="flex-1 overflow-y-auto">
          <form onSubmit={submitForm} className="p-4 sm:p-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6">

              <Input 
                label="Client Name"
                placeholder="Enter your full name"
                value={formData.clientName}
                onChange={(e: any) => handleChange("clientName", e.target.value)}
                required={true}
              />

              <Input
                label="Phone Number"
                type="tel"
                maxLength={10}
                onlyNumber
                placeholder="Enter 10-digit mobile number"
                value={formData.phone}
                onChange={(e: any) => handleChange("phone", e.target.value)}
                required={true}
              />

              <Input 
                label="Email ID"
                type="email"
                placeholder="Enter your email address"
                value={formData.email}
                onChange={(e: any) => handleChange("email", e.target.value)}
                required={true}
              />

              <Input 
                label="Date of Birth"
                type="date"
                value={formData.dob}
                onChange={(e: any) => handleChange("dob", e.target.value)}
                required={true}
              />

              {/* Gender Selector */}
              <div className="w-full">
                <label className="block text-sm font-medium mb-1 text-gray-700">
                  Gender <span className="text-red-500">*</span>
                </label>
                <div className="flex gap-4">
                  {["Male", "Female"].map((option) => (
                    <label key={option} className="flex items-center gap-2 cursor-pointer">
                      <input
                        type="radio"
                        name="gender"
                        value={option.toLowerCase()}
                        checked={formData.gender === option.toLowerCase()}
                        onChange={(e) => handleChange("gender", e.target.value)}
                        className="text-[#1CADA3] focus:ring-[#1CADA3]"
                        required={true}
                      />
                      <span className="text-sm sm:text-base text-gray-700">{option}</span>
                    </label>
                  ))}
                </div>
              </div>

              <Input 
                label="Location"
                placeholder="Enter your city"
                value={formData.location}
                onChange={(e: any) => handleChange("location", e.target.value)}
                required={true}
              />

              <Input 
                label="Total Monthly Income"
                placeholder="Enter your monthly income"
                onlyNumber
                value={formData.monthlyIncome}
                onChange={(e: any) => handleChange("monthlyIncome", e.target.value)}
                required={true}
              />

              {/* Term with Month/Year Selector */}
              <div className="w-full">
                <label className="block text-sm font-medium mb-1 text-gray-700">
                  Term <span className="text-red-500">*</span>
                </label>
                <div className="flex gap-2">
                  <input
                    value={formData.termValue}
                    onChange={(e) => handleTermChange(e.target.value)}
                    placeholder={formData.termType === "months" ? "Enter term in months" : "Enter term in years"}
                    maxLength={formData.termType === "months" ? 3 : 2}
                    onKeyDown={(e) => {
                      if (!/^[0-9]$/.test(e.key) && 
                          !["Backspace", "Delete", "ArrowLeft", "ArrowRight", "Tab"].includes(e.key)) {
                        e.preventDefault();
                      }
                    }}
                    className="flex-1 border border-gray-300 rounded-md p-2 bg-white text-gray-700 focus:ring-2 focus:ring-[#1CADA3] text-sm sm:text-base placeholder-gray-400"
                    required={true}
                  />
                  <select
                    value={formData.termType}
                    onChange={(e) => handleTermTypeChange(e.target.value)}
                    className="border border-gray-300 rounded-md p-2 bg-white text-gray-700 focus:ring-2 focus:ring-[#1CADA3] text-sm sm:text-base"
                    required={true}
                  >
                    <option value="months">Months</option>
                    <option value="years">Years</option>
                  </select>
                </div>
                <p className="text-xs text-gray-500 mt-1">
                  {formData.termType === "months" 
                    ? "Maximum 3 digits" 
                    : "Maximum 2 digits"}
                </p>
              </div>

              <Input 
                label="Fixed Deposit Amount"
                placeholder="Enter deposit amount"
                onlyNumber
                value={formData.depositAmount}
                onChange={(e: any) => handleChange("depositAmount", e.target.value)}
                required={true}
              />

              {/* Error Message */}
              {error && (
                <div className="col-span-1 md:col-span-2 text-center text-red-600 font-semibold mt-2 text-sm sm:text-base">
                  ⚠ Please fill all fields correctly before submitting.
                </div>
              )}

              {/* Success Message */}
              {success && (
                <div className="col-span-1 md:col-span-2 text-center text-green-600 font-semibold mt-2 text-sm sm:text-base">
                  ✔ Form submitted successfully!
                </div>
              )}

              {/* Submit Button */}
              <div className="col-span-1 md:col-span-2 flex justify-center mt-4">
                <button
                  type="submit"
                  className="w-full sm:w-50 bg-gradient-to-r from-[#2076C7] to-[#1CADA3] text-white py-2 rounded-md hover:from-[#1a68b0] hover:to-[#18998f] transition-colors text-sm sm:text-base"
                >
                  Submit
                </button>
              </div>

            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

/* ---------------- INPUT COMPONENT ---------------- */
function Input({ label, value, onChange, type = "text", onlyNumber, maxLength, placeholder, required = false }: any) {

  const restrictNumber = (e: any) => {
    if (!onlyNumber) return;

    if (["Backspace", "Delete", "ArrowLeft", "ArrowRight", "Tab"].includes(e.key)) return;

    if (!/^[0-9]$/.test(e.key)) e.preventDefault();
  };

  return (
    <div className="w-full">
      <label className="block text-sm font-medium mb-1 text-gray-700">
        {label} {required && <span className="text-red-500">*</span>}
      </label>
      <input
        value={value}
        type={type}
        maxLength={maxLength}
        onKeyDown={restrictNumber}
        onChange={onChange}
        placeholder={placeholder}
        className="w-full border border-gray-300 rounded-md p-2 bg-white text-gray-700 focus:ring-2 focus:ring-[#1CADA3] text-sm sm:text-base placeholder-gray-400"
        required={required}
      />
    </div>
  );
}