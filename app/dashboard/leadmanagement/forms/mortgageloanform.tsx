"use client";
import { useState } from "react";
import { X } from "lucide-react";

// Reusable Input component
function Input({label, placeholder,type = "text",value,onChange,error,maxLength, }: 
  {label: string; placeholder?: string;type?: string;value?: string;onChange?: (e: any) => void; error?: string; maxLength?: number;  })
   {
  return (
    <div className="flex flex-col w-full">
      <label className="text-sm font-medium mb-1 text-gray-700">{label}</label>
      <input
        type={type}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        maxLength={maxLength}
        className={`w-full border rounded-lg p-2 focus:ring-2 focus:ring-[#1CADA3] outline-none text-sm sm:text-base ${
          error ? "border-red-500" : "border-gray-300 bg-white text-gray-700"
        }`}
      />

      {error && <p className="text-red-500 text-xs mt-1">{error}</p>}
    </div>
  );
}

// Upload document labels
const salariedUploads = [
  "PAN Card",
  "Aadhar Card",
  "3 Months Salary Slip",
  "6 Months Bank Statement",
  "Company ID Card",
  "Form 16 (if available)",
];

const selfEmployedUploads = [
  "PAN Card",
  "Aadhar Card",
  "Business Registration Proof",
  "Last 2 Years ITR",
  "6 Months Bank Statement",
  "Business Office Address Proof",
];

export default function MortgageLoanForm({ onClose }: { onClose: () => void }) {
  const [employmentType, setEmploymentType] = useState("");

  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    email: "",
    dob: "",
    location: "",
    loanAmount: "",
    useOfFund: "",
  });

  const [errors, setErrors] = useState<{ [key: string]: string }>({});

  // Handle input change
  const handleChange = (field: string, value: string) => {
    if (field === "phone") {
      if (!/^\d*$/.test(value)) return; // Only digits allowed
    }

    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  // Validate form
  const validateForm = () => {
    let newErrors: { [key: string]: string } = {};

    Object.entries(formData).forEach(([key, value]) => {
      if (!value || value.trim() === "") {
        newErrors[key] = "This field is required";
      }
    });

    if (formData.phone.length !== 10) {
      newErrors.phone = "Phone number must be 10 digits";
    }

    if (!employmentType) {
      newErrors.employmentType = "Please select employment type";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // Submit handler
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!validateForm()) {
      alert("Please fill all required fields");
      return;
    }

    alert("Form submitted successfully!");
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 p-2 sm:p-4">
      <div className="bg-white rounded-xl shadow-xl w-full max-w-4xl mx-auto h-[95vh] sm:h-[90vh] flex flex-col">
        
        {/* Header */}
        <div className="flex justify-between items-center border-b px-4 sm:px-6 py-3 sm:py-4 flex-shrink-0">
          <h2 className="text-lg sm:text-xl font-semibold text-[#1CADA3]">
            Mortgage Loan Form
          </h2>
          <button onClick={onClose} className="text-gray-500 hover:text-gray-800 transition">
            <X size={20} className="sm:w-6 sm:h-6" />
          </button>
        </div>

        {/* Scrollable Form Body */}
        <div className="flex-1 overflow-y-auto">
          <form onSubmit={handleSubmit} className="p-4 sm:p-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6">
              
              <Input
                label="Client Name"
                placeholder="Enter client name"
                value={formData.name}
                onChange={(e) => handleChange("name", e.target.value)}
                error={errors.name}
              />

              <Input
                label="Phone Number"
                placeholder="Enter 10-digit phone number"
                type="tel"
                maxLength={10}
                value={formData.phone}
                onChange={(e) => handleChange("phone", e.target.value)}
                error={errors.phone}
              />

              <Input
                label="Email ID"
                placeholder="Enter email address"
                value={formData.email}
                onChange={(e) => handleChange("email", e.target.value)}
                error={errors.email}
              />

              <Input
                label="Date of Birth"
                type="date"
                value={formData.dob}
                onChange={(e) => handleChange("dob", e.target.value)}
                error={errors.dob}
              />

              <Input
                label="Location"
                placeholder="Enter your location"
                value={formData.location}
                onChange={(e) => handleChange("location", e.target.value)}
                error={errors.location}
              />

              <Input
                label="Loan Amount"
                placeholder="Enter loan amount"
                value={formData.loanAmount}
                onChange={(e) => handleChange("loanAmount", e.target.value)}
                error={errors.loanAmount}
              />

              <Input
                label="Use of Fund"
                placeholder="Enter purpose of loan"
                value={formData.useOfFund}
                onChange={(e) => handleChange("useOfFund", e.target.value)}
                error={errors.useOfFund}
              />

              {/* Employment Type */}
              <div className="col-span-1 md:col-span-2">
                <label className="text-sm font-semibold text-gray-700">Employment Type</label>
                <select
                  value={employmentType}
                  onChange={(e) => setEmploymentType(e.target.value)}
                  className={`w-full border rounded-lg p-2 mt-1 text-gray-700 text-sm sm:text-base ${
                    errors.employmentType ? "border-red-500" : "border-gray-300"
                  }`}
                >
                  <option value="">-- Select Employment Type --</option>
                  <option value="salaried">Salaried Person</option>
                  <option value="selfEmployed">Self Employed</option>
                </select>

                {errors.employmentType && (
                  <p className="text-red-500 text-xs mt-1">{errors.employmentType}</p>
                )}
              </div>

              {/* Salaried Docs */}
              {employmentType === "salaried" && (
                <div className="col-span-1 md:col-span-2">
                  <h3 className="text-base sm:text-lg font-semibold text-[#1CADA3] mt-4 mb-3 border-b pb-2">
                    Upload Documents for Salaried Person
                  </h3>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    {salariedUploads.map((label, index) => (
                      <div key={index} className="flex flex-col">
                        <label className="text-sm font-medium mb-1 text-gray-700">{label}</label>
                        <input 
                          type="file" 
                          className="w-full border border-gray-300 rounded-lg p-2 text-gray-700 text-sm" 
                        />
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Self-Employed Docs */}
              {employmentType === "selfEmployed" && (
                <div className="col-span-1 md:col-span-2">
                  <h3 className="text-base sm:text-lg font-semibold text-[#1CADA3] mt-4 mb-3 border-b pb-2">
                    Upload Documents for Self Employed
                  </h3>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    {selfEmployedUploads.map((label, index) => (
                      <div key={index} className="flex flex-col">
                        <label className="text-sm font-medium mb-1 text-gray-700">{label}</label>
                        <input 
                          type="file" 
                          className="w-full border border-gray-300 rounded-lg p-2 text-gray-700 text-sm" 
                        />
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Checkbox */}
              <div className="col-span-1 md:col-span-2 flex items-center mt-4">
                <input type="checkbox" id="notRobot" className="mr-2 w-4 h-4" />
                <label htmlFor="notRobot" className="text-gray-700 text-sm sm:text-base">
                  I am not a robot
                </label>
              </div>

              {/* Submit Button */}
              <div className="col-span-1 md:col-span-2 flex justify-center mt-4">
                <button
                  type="submit"
                  className="w-full sm:w-50 bg-gradient-to-r from-[#2076C7] to-[#1CADA3] text-white py-2 rounded-md hover:from-[#1a68b0] hover:to-[#18998f] transition-colors text-sm sm:text-base"
                >
                  Submit Form
                </button>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}