"use client";
import { useState } from "react";
import { X } from "lucide-react";

export default function PersonalLoanForm({ onClose }: { onClose: () => void }) {
  const [formData, setFormData] = useState({
    clientName: "",
    phone: "",
    email: "",
    dob: "",
    location: "",
    loanAmount: "",
    deductionDetails: "",
    companyName: "",
    companyAddress: "",
    loanObligation: "",
  });

  const [error, setError] = useState(false);
  const [success, setSuccess] = useState(false);

  // Update form values
  const handleChange = (key: string, value: string) => {
    setFormData({ ...formData, [key]: value });
  };

  // Validate before submit
  const submitForm = (e: any) => {
    e.preventDefault();
    setError(false);
    setSuccess(false);

    for (const key of Object.keys(formData)) {
      if (!formData[key as keyof typeof formData]) {
        setError(true);
        return;
      }
    }

    // If all good
    setSuccess(true);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 p-2 sm:p-4">
      <div className="bg-white rounded-xl shadow-xl w-full max-w-4xl mx-auto h-[95vh] sm:h-[90vh] flex flex-col">
        
        {/* Header */}
        <div className="flex justify-between items-center border-b px-4 sm:px-6 py-3 sm:py-4 flex-shrink-0">
          <h2 className="text-lg sm:text-xl font-semibold text-[#1CADA3]">Personal Loan Form</h2>
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
                label="Loan Amount"
                placeholder="Enter desired loan amount"
                value={formData.loanAmount}
                onChange={(e: any) => handleChange("loanAmount", e.target.value)}
              />

              <Input 
                label="Deduction Details"
                placeholder="Enter salary deduction details"
                value={formData.deductionDetails}
                onChange={(e: any) => handleChange("deductionDetails", e.target.value)}
              />

              <Input 
                label="Company Name"
                placeholder="Enter your company name"
                value={formData.companyName}
                onChange={(e: any) => handleChange("companyName", e.target.value)}
              />

              <Input 
                label="Company Address"
                placeholder="Enter company address"
                value={formData.companyAddress}
                onChange={(e: any) => handleChange("companyAddress", e.target.value)}
              />

              <Input 
                label="Loan Obligation Details"
                placeholder="Enter existing loan details"
                value={formData.loanObligation}
                onChange={(e: any) => handleChange("loanObligation", e.target.value)}
              />

              {/* File Uploads - Full width on mobile, 2 columns on larger screens */}
              <div className="col-span-1 md:col-span-2">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
                  {[
                    "Aadhar Card",
                    "Pan Card",
                    "3 Months Salary Slip",
                    "Form 16",
                    "6 Months Banking Statement",
                    "Address Proof",
                    "Photograph",
                    "Existing Loan Statement",
                  ].map((label, idx) => (
                    <div key={idx} className="flex flex-col">
                      <label className="text-sm font-medium mb-1 text-gray-700">{label}</label>
                      <input 
                        type="file" 
                        className="w-full border border-gray-300 rounded-md p-2 bg-white text-gray-700 text-sm" 
                      />
                    </div>
                  ))}
                </div>
              </div>

              {/* Robot Check */}
              <div className="col-span-1 md:col-span-2 flex items-center gap-2 mt-4 text-gray-700">
                <input id="robot" type="checkbox" className="w-4 h-4" />
                <label htmlFor="robot" className="text-sm sm:text-base">I am not a robot</label>
              </div>

              {/* Error Message */}
              {error && (
                <div className="col-span-1 md:col-span-2 text-center text-red-600 font-semibold mt-2 text-sm sm:text-base">
                  ⚠ Please fill all fields before submitting.
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