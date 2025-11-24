"use client";
import { useState } from "react";
import { X } from "lucide-react";

// Reusable Input component
function Input({label, placeholder,type = "text",value,onChange,error,maxLength, }: 
  {label: string; placeholder?: string;type?: string;value?: string;onChange?: (e: any) => void; error?: string; maxLength?: number;  })
   {
  return (
    <div className="flex flex-col">
      <label className="text-sm font-medium mb-1 text-gray-700">{label}</label>
      <input
        type={type}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        maxLength={maxLength}
        className={`border rounded-lg p-2 focus:ring-2 focus:ring-teal-500 outline-none ${
          error ? "border-red-500" : "border-gray-300"
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
    deductionDetails: "",
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
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40">
      <div className="bg-white rounded-xl shadow-xl w-full max-w-4xl mx-4 overflow-y-auto max-h-[90vh]">

        {/* Header */}
        <div className="flex justify-between items-center border-b px-6 py-4">
          <h2 className="text-xl font-semibold text-[#1CADA3]">
            Mortgage Loan Form
          </h2>
          <button onClick={onClose} className="text-gray-500 hover:text-gray-800 transition">
            <X size={22} />
          </button>
        </div>

        {/* Body */}
        <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-4 p-6">
          
          <Input
            label="Client Name"
            placeholder="Enter Client Name"
            value={formData.name}
            onChange={(e) => handleChange("name", e.target.value)}
            error={errors.name}
          />

          <Input
            label="Phone Number"
            placeholder="Enter Phone Number"
            type="tel"
            maxLength={10}
            value={formData.phone}
            onChange={(e) => handleChange("phone", e.target.value)}
            error={errors.phone}
          />

          <Input
            label="Email ID"
            placeholder="Enter Client Email ID"
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
            placeholder="Enter Location"
            value={formData.location}
            onChange={(e) => handleChange("location", e.target.value)}
            error={errors.location}
          />

          <Input
            label="Loan Amount"
            placeholder="Enter Loan Amount"
            value={formData.loanAmount}
            onChange={(e) => handleChange("loanAmount", e.target.value)}
            error={errors.loanAmount}
          />

          <Input
            label="Use of Fund"
            placeholder="Enter Use of Fund"
            value={formData.useOfFund}
            onChange={(e) => handleChange("useOfFund", e.target.value)}
            error={errors.useOfFund}
          />

          <Input
            label="Deduction Details"
            placeholder="Enter Deduction Details"
            value={formData.deductionDetails}
            onChange={(e) => handleChange("deductionDetails", e.target.value)}
            error={errors.deductionDetails}
          />

          {/* Employment Type */}
          <div className="col-span-2">
            <label className="text-sm font-semibold">Employment Type</label>
            <select
              value={employmentType}
              onChange={(e) => setEmploymentType(e.target.value)}
              className={`border rounded-lg p-2 w-full mt-1 ${
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
            <>
              <div className="col-span-2">
                <h3 className="text-lg font-semibold text-gray-700 mt-4 mb-2">
                  Upload Documents for Salaried Person
                </h3>
              </div>

              {salariedUploads.map((label, index) => (
                <div key={index} className="flex flex-col">
                  <label className="text-sm font-medium mb-1">{label}</label>
                  <input type="file" className="border rounded-lg p-2" />
                </div>
              ))}
            </>
          )}

          {/* Self-Employed Docs */}
          {employmentType === "selfEmployed" && (
            <>
              <div className="col-span-2">
                <h3 className="text-lg font-semibold text-gray-700 mt-4 mb-2">
                  Upload Documents for Self Employed
                </h3>
              </div>

              {selfEmployedUploads.map((label, index) => (
                <div key={index} className="flex flex-col">
                  <label className="text-sm font-medium mb-1">{label}</label>
                  <input type="file" className="border rounded-lg p-2" />
                </div>
              ))}
            </>
          )}
          {/* Checkbox */}
          <div className="col-span-2 flex items-center mt-4">
            <input type="checkbox" id="notRobot" className="mr-2" />
            <label htmlFor="notRobot" className="text-gray-700">
              I am not a robot
            </label>
          </div>

          {/* Submit Button */}
          <div className="col-span-2 flex justify-center mt-4">
            <button
              type="submit"
              className="bg-teal-600 text-white px-6 py-3 rounded-lg hover:bg-teal-700 transition-all"
            >
              Submit Form
            </button>
          </div>
        </form>

      </div>
    </div>
  );
}
