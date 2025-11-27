"use client";
import { useState } from "react";
import { X } from "lucide-react";

export default function SMELoanForm({ onClose }: { onClose: () => void }) {
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

  const [errors, setErrors] = useState<Record<string, string>>({});

  const validateForm = () => {
    const newErrors: Record<string, string> = {};

    if (!formData.clientName) newErrors.clientName = "Client Name is required";
    if (!formData.phone) newErrors.phone = "Phone Number is required";
    else if (!/^[0-9]{10}$/.test(formData.phone))
      newErrors.phone = "Phone number must be 10 digits";

    if (!formData.email) newErrors.email = "Email is required";
    if (!formData.dob) newErrors.dob = "Date of Birth is required";
    if (!formData.location) newErrors.location = "Location is required";
    if (!formData.loanAmount) newErrors.loanAmount = "Loan Amount is required";
    if (!formData.otherDetails)
      newErrors.otherDetails = "Details are required";

    if (!formData.notRobot) newErrors.notRobot = "Please verify";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (validateForm()) {
      alert("Form Submitted Successfully!");
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 p-2 sm:p-4">
      <div className="bg-white rounded-xl shadow-xl w-full max-w-4xl mx-auto h-[95vh] sm:h-[90vh] flex flex-col">
        
        {/* Header */}
        <div className="flex justify-between items-center border-b px-4 sm:px-6 py-3 sm:py-4 flex-shrink-0">
          <h2 className="text-lg sm:text-xl font-semibold text-[#1CADA3]">SME Loan Form</h2>
          <button onClick={onClose} className="text-gray-500 hover:text-gray-800">
            <X size={20} className="sm:w-6 sm:h-6" />
          </button>
        </div>

        {/* Scrollable Form Body */}
        <div className="flex-1 overflow-y-auto">
          <form className="p-4 sm:p-6" onSubmit={handleSubmit}>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6">

              <Input
                label="Client Name"
                placeholder="Enter client name"
                value={formData.clientName}
                onChange={(value: string) => setFormData({ ...formData, clientName: value })}
                error={errors.clientName}
              />

              <Input
                label="Client Phone Number"
                placeholder="Enter 10-digit phone number"
                value={formData.phone}
                maxLength={10}
                onChange={(value: string) =>
                  setFormData({ ...formData, phone: value.replace(/\D/g, "") })
                }
                error={errors.phone}
              />

              <Input
                label="Client Email ID"
                placeholder="Enter email address"
                value={formData.email}
                onChange={(value: string) => setFormData({ ...formData, email: value })}
                error={errors.email}
              />

              <DateInput
                label="Client Date of Birth"
                value={formData.dob}
                onChange={(value: string) => setFormData({ ...formData, dob: value })}
                error={errors.dob}
              />

              <Input
                label="Location"
                placeholder="Enter your location"
                value={formData.location}
                onChange={(value: string) => setFormData({ ...formData, location: value })}
                error={errors.location}
              />

              <Input
                label="Loan Amount"
                placeholder="Enter loan amount"
                value={formData.loanAmount}
                onChange={(value: string) => setFormData({ ...formData, loanAmount: value })}
                error={errors.loanAmount}
              />

              <Input
                label="Other Loan Obligation Details"
                placeholder="Enter other loan details"
                value={formData.otherDetails}
                onChange={(value: string) => setFormData({ ...formData, otherDetails: value })}
                error={errors.otherDetails}
              />

              {/* Section Heading */}
              <div className="col-span-1 md:col-span-2 mt-4">
                <h3 className="font-semibold text-base sm:text-lg text-[#1CADA3] border-b pb-2">Upload Documents</h3>
              </div>

              {/* File Uploads - Responsive grid */}
              <div className="col-span-1 md:col-span-2">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
                  {[
                    "Aadhar Card",
                    "Pan Card",
                    "Address Proof",
                    "GST Registration Certificate",
                    "Udyam Aadhar Registration",
                    "Shop Act Licence",
                    "1 Year Banking Statement",
                    "ITR 3 Years",
                    "Constitution Doc (Partnership deep, MOA, AOM and GST)",
                    "Photograph",
                    "Existing Loan Statement"
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
                  id="notRobot"
                  type="checkbox"
                  checked={formData.notRobot}
                  onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                    setFormData({ ...formData, notRobot: e.target.checked })
                  }
                  className="w-4 h-4 border-gray-400"
                />
                <label htmlFor="notRobot" className="text-sm sm:text-base">I am not a robot</label>
              </div>
              {errors.notRobot && <p className="col-span-1 md:col-span-2 text-red-600 text-sm mt-1">{errors.notRobot}</p>}

              {/* Submit Button */}
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

/*=====================================
          Reusable Components
======================================*/

type InputProps = {
  label: string;
  placeholder: string;
  type?: string;
  value: string;
  onChange: (value: string) => void;
  error?: string;
  maxLength?: number;
};

function Input({ label, placeholder, type = "text", value, onChange, error, maxLength }: InputProps) {
  return (
    <div className="w-full">
      <label className="block text-sm font-medium mb-1 text-gray-700">{label}</label>
      <input
        type={type}
        value={value}
        maxLength={maxLength}
        placeholder={placeholder}
        onChange={(e: React.ChangeEvent<HTMLInputElement>) => onChange(e.target.value)}
        className="w-full border border-gray-300 rounded-md p-2 bg-white text-gray-700 focus:ring-2 focus:ring-[#1CADA3] focus:border-transparent text-sm sm:text-base"
      />
      {error && <p className="text-red-600 text-xs mt-1">{error}</p>}
    </div>
  );
}

type DateProps = {
  label: string;
  value: string;
  onChange: (value: string) => void;
  error?: string;
};

function DateInput({ label, value, onChange, error }: DateProps) {
  return (
    <div className="w-full">
      <label className="block text-sm font-medium mb-1 text-gray-700">{label}</label>
      <input
        type="date"
        value={value}
        onChange={(e: React.ChangeEvent<HTMLInputElement>) => onChange(e.target.value)}
        className="w-full border border-gray-300 rounded-md p-2 bg-white text-gray-700 focus:ring-2 focus:ring-[#1CADA3] focus:border-transparent text-sm sm:text-base"
      />
      {error && <p className="text-red-600 text-xs mt-1">{error}</p>}
    </div>
  );
}