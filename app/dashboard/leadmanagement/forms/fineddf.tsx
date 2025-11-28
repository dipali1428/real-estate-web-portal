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
    termMonths: "",
    monthlyIncome: "",
    notRobot: false,
  });

  const [error, setError] = useState(false);
  const [success, setSuccess] = useState(false);

  // Update form values - matching Personal Loan behavior
  const handleChange = (key: string, value: string | boolean) => {
    setFormData({ ...formData, [key]: value });
  };

  // Validate before submit - matching Personal Loan behavior
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
      formData.termMonths,
      formData.monthlyIncome,
      formData.notRobot,
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

    // If all good
    setSuccess(true);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 p-2 sm:p-4">
      <div className="bg-white rounded-xl shadow-xl w-full max-w-4xl mx-auto h-[95vh] sm:h-[90vh] flex flex-col">
        
        {/* Header - Matching Personal Loan design */}
        <div className="flex justify-between items-center border-b px-4 sm:px-6 py-3 sm:py-4 flex-shrink-0">
          <h2 className="text-lg sm:text-xl font-semibold text-[#1CADA3]">Fixed Deposit Form</h2>
          <button onClick={onClose} className="text-gray-600 hover:text-gray-800">
            <X size={20} className="sm:w-6 sm:h-6" />
          </button>
        </div>

        {/* Scrollable Form Body - Matching Personal Loan structure */}
        <div className="flex-1 overflow-y-auto">
          <form onSubmit={submitForm} className="p-4 sm:p-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6">

              <Input 
                label="Client Name"
                placeholder="Enter your full name"
                value={formData.clientName}
                onChange={(e: any) => handleChange("clientName", e.target.value)}
              />

              <Input
                label="Phone Number"
                type="tel"
                maxLength={10}
                onlyNumber
                placeholder="Enter 10-digit mobile number"
                value={formData.phone}
                onChange={(e: any) => handleChange("phone", e.target.value)}
              />

              <Input 
                label="Email ID"
                type="email"
                placeholder="Enter your email address"
                value={formData.email}
                onChange={(e: any) => handleChange("email", e.target.value)}
              />

              <Input 
                label="Date of Birth"
                type="date"
                value={formData.dob}
                onChange={(e: any) => handleChange("dob", e.target.value)}
              />

              <Input 
                label="Location"
                placeholder="Enter your city"
                value={formData.location}
                onChange={(e: any) => handleChange("location", e.target.value)}
              />

              <Input 
                label="Term (Months)"
                placeholder="Enter deposit term in months"
                onlyNumber
                value={formData.termMonths}
                onChange={(e: any) => handleChange("termMonths", e.target.value)}
              />

              <Input 
                label="Total Monthly Income"
                placeholder="Enter your monthly income"
                onlyNumber
                value={formData.monthlyIncome}
                onChange={(e: any) => handleChange("monthlyIncome", e.target.value)}
              />

              {/* Error Message - Matching Personal Loan styling */}
              {error && (
                <div className="col-span-1 md:col-span-2 text-center text-red-600 font-semibold mt-2 text-sm sm:text-base">
                  ⚠ Please fill all fields before submitting.
                </div>
              )}

              {/* Success Message - Matching Personal Loan styling */}
              {success && (
                <div className="col-span-1 md:col-span-2 text-center text-green-600 font-semibold mt-2 text-sm sm:text-base">
                  ✔ Form submitted successfully!
                </div>
              )}

              {/* Submit Button - Matching Personal Loan styling */}
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

/* ---------------- INPUT COMPONENT - Matching Personal Loan exactly ---------------- */
function Input({ label, value, onChange, type = "text", onlyNumber, maxLength, placeholder }: any) {

  const restrictNumber = (e: any) => {
    if (!onlyNumber) return;

    if (["Backspace", "Delete", "ArrowLeft", "ArrowRight", "Tab"].includes(e.key)) return;

    if (!/^[0-9]$/.test(e.key)) e.preventDefault();
  };

  return (
    <div className="w-full">
      <label className="block text-sm font-medium mb-1 text-gray-700">{label}</label>
      <input
        value={value}
        type={type}
        maxLength={maxLength}
        onKeyDown={restrictNumber}
        onChange={onChange}
        placeholder={placeholder}
        className="w-full border border-gray-300 rounded-md p-2 bg-white text-gray-700 focus:ring-2 focus:ring-[#1CADA3] text-sm sm:text-base placeholder-gray-400"
      />
    </div>
  );
}