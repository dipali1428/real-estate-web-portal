"use client";

import { useState } from "react";
import { X } from "lucide-react";

export default function LoanAgainstSecuritiesForm({
  onClose,
}: {
  onClose: () => void;
}) {
  const [formData, setFormData] = useState({
    clientName: "",
    phone: "",
    email: "",
    dob: "",
    location: "",
    loanAmount: "",
    otherDetails: "",
    notRobot: false,
  });

  const [errors, setErrors] = useState<{ [key: string]: string }>({});

  // Handle form submit
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const newErrors: { [key: string]: string } = {};

    Object.entries(formData).forEach(([key, value]) => {
      if (!value && key !== "otherDetails" && key !== "notRobot") {
        newErrors[key] = "This field is required";
      }
    });

    if (formData.phone && formData.phone.length !== 10)
      newErrors.phone = "Phone number must be 10 digits";

    if (!formData.notRobot)
      newErrors.notRobot = "Please confirm you are not a robot";

    setErrors(newErrors);

    if (Object.keys(newErrors).length === 0) {
      alert("Form Submitted Successfully!");
      console.log("Form Data:", formData);
    }
  };

  return (
    <div className="fixed inset-0 bg-black/40 z-50 flex items-center justify-center p-2 sm:p-4">
      <div className="bg-white rounded-xl shadow-xl w-full max-w-4xl mx-auto h-[95vh] sm:h-[90vh] flex flex-col">
        
        {/* HEADER */}
        <div className="flex items-center justify-between px-4 sm:px-6 py-3 sm:py-4 border-b flex-shrink-0">
          <h2 className="text-lg sm:text-xl font-semibold text-[#1CADA3]">
            Loan Against Securities Form
          </h2>
          <button onClick={onClose} className="text-gray-600 hover:text-black">
            <X size={20} className="sm:w-6 sm:h-6" />
          </button>
        </div>

        {/* SCROLLABLE BODY */}
        <div className="flex-1 overflow-y-auto">
          <form className="p-4 sm:p-6" onSubmit={handleSubmit}>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6">

              {/* Personal Details */}
              <Input 
                label="Client Name" 
                placeholder="Enter client name"
                value={formData.clientName}
                onChange={(value) => setFormData({ ...formData, clientName: value })}
                error={errors.clientName}
              />
              
              <Input
                label="Client Phone Number"
                placeholder="Enter 10-digit phone number"
                value={formData.phone}
                onChange={(value) => setFormData({ ...formData, phone: value.replace(/\D/g, "") })}
                maxLength={10}
                error={errors.phone}
              />
              
              <Input 
                label="Client Email ID" 
                placeholder="Enter email address"
                value={formData.email}
                onChange={(value) => setFormData({ ...formData, email: value })}
                error={errors.email}
              />
              
              <DateInput 
                label="Client Date of Birth" 
                value={formData.dob}
                onChange={(value) => setFormData({ ...formData, dob: value })}
                error={errors.dob}
              />

              <Input 
                label="Location" 
                placeholder="Enter your location"
                value={formData.location}
                onChange={(value) => setFormData({ ...formData, location: value })}
                error={errors.location}
              />
              
              <Input 
                label="Loan Amount" 
                placeholder="Enter loan amount"
                value={formData.loanAmount}
                onChange={(value) => setFormData({ ...formData, loanAmount: value })}
                error={errors.loanAmount}
              />

              <div className="col-span-1 md:col-span-2">
                <Input
                  label="Other Loan Obligation Details"
                  placeholder="Enter other loan details"
                  value={formData.otherDetails}
                  onChange={(value) => setFormData({ ...formData, otherDetails: value })}
                  error={errors.otherDetails}
                />
              </div>

              {/* Section Header */}
              <div className="col-span-1 md:col-span-2 mt-4">
                <h3 className="text-base sm:text-lg font-semibold text-[#1CADA3] border-b pb-2">
                  Upload Documents
                </h3>
              </div>

              {/* File Uploads - Responsive grid */}
              <div className="col-span-1 md:col-span-2">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
                  {[
                    "Aadhar Card",
                    "Pan Card",
                    "Address Proof",
                    "1 Year Banking Statement",
                    "Demat Account Statement",
                    "Portfolio Reports",
                    "ITR 3 Years",
                    "Cancel Cheque",
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

              {/* Checkbox */}
              <div className="col-span-1 md:col-span-2 flex items-center gap-2 mt-4 text-gray-700">
                <input 
                  type="checkbox" 
                  checked={formData.notRobot}
                  onChange={(e) => setFormData({ ...formData, notRobot: e.target.checked })}
                  className="w-4 h-4" 
                />
                <label className="text-sm sm:text-base">I am not a robot</label>
              </div>
              {errors.notRobot && <p className="col-span-1 md:col-span-2 text-red-500 text-xs mt-1">{errors.notRobot}</p>}

              {/* Submit */}
              <div className="col-span-1 md:col-span-2 mt-4 flex justify-center">
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

/* ---------------------------------------------------
   REUSABLE COMPONENTS
-----------------------------------------------------*/

interface InputProps {
  label: string;
  placeholder: string;
  value?: string;
  onChange?: (value: string) => void;
  error?: string;
  maxLength?: number;
}

function Input({ label, placeholder, value, onChange, error, maxLength }: InputProps) {
  return (
    <div className="w-full">
      <label className="text-sm font-medium text-gray-700">{label}</label>
      <input
        type="text"
        placeholder={placeholder}
        value={value}
        maxLength={maxLength}
        onChange={(e) => onChange?.(e.target.value)}
        className={`w-full mt-1 p-2 border rounded-md bg-white text-gray-700 text-sm sm:text-base focus:ring-2 focus:ring-[#1CADA3] focus:border-transparent ${
          error ? "border-red-500" : "border-gray-300"
        }`}
      />
      {error && <p className="text-red-500 text-xs mt-1">{error}</p>}
    </div>
  );
}

interface DateInputProps {
  label: string;
  value?: string;
  onChange?: (value: string) => void;
  error?: string;
}

function DateInput({ label, value, onChange, error }: DateInputProps) {
  return (
    <div className="w-full">
      <label className="text-sm font-medium text-gray-700">{label}</label>
      <input
        type="date"
        value={value}
        onChange={(e) => onChange?.(e.target.value)}
        className={`w-full mt-1 p-2 border rounded-md bg-white text-gray-700 text-sm sm:text-base focus:ring-2 focus:ring-[#1CADA3] focus:border-transparent ${
          error ? "border-red-500" : "border-gray-300"
        }`}
      />
      {error && <p className="text-red-500 text-xs mt-1">{error}</p>}
    </div>
  );
}