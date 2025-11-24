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
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40">
      <div className="bg-white rounded-xl shadow-xl w-full max-w-4xl mx-4 overflow-y-auto max-h-[90vh]">

        {/* Header */}
        <div className="flex justify-between items-center border-b px-6 py-4">
          <h2 className="text-xl font-semibold text-[#1CADA3]">SME Loan Form</h2>
          <button onClick={onClose} className="text-gray-500 hover:text-gray-800">
            <X size={22} />
          </button>
        </div>

        {/* Body */}
        <div className="p-6 max-h-[80vh] overflow-y-auto">
          <form className="grid grid-cols-1 md:grid-cols-2 gap-4" onSubmit={handleSubmit}>

  <Input
    label="Client Name"
    placeholder="Enter Client Name"
    value={formData.clientName}
    onChange={(value: string) => setFormData({ ...formData, clientName: value })}
    error={errors.clientName}
  />

  <Input
    label="Client Phone Number"
    placeholder="Enter Phone Number"
    value={formData.phone}
    maxLength={10}
    onChange={(value: string) =>
      setFormData({ ...formData, phone: value.replace(/\D/g, "") })
    }
    error={errors.phone}
  />

  <Input
    label="Client Email ID"
    placeholder="Enter Email ID"
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
    placeholder="Enter Location"
    value={formData.location}
    onChange={(value: string) => setFormData({ ...formData, location: value })}
    error={errors.location}
  />

  <Input
    label="Loan Amount"
    placeholder="Enter Loan Amount"
    value={formData.loanAmount}
    onChange={(value: string) => setFormData({ ...formData, loanAmount: value })}
    error={errors.loanAmount}
  />

  <Input
    label="Other Loan Obligation Details"
    placeholder="Enter Other Loan Obligation Details"
    value={formData.otherDetails}
    onChange={(value: string) => setFormData({ ...formData, otherDetails: value })}
    error={errors.otherDetails}
  />

  {/* Section Heading */}
  <div className="col-span-2 mt-4">
    <h3 className="font-semibold text-lg text-gray-800">Upload Documents</h3>
  </div>

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
    <div key={idx} className="col-span-1">
      <label className="block font-medium mb-1">{label}</label>
      <input
        type="file"
        className="border rounded-lg p-2 text-sm file:mr-3 file:py-2 file:px-4 
        file:rounded-full file:border-0 file:bg-teal-500 file:text-white 
        hover:file:bg-teal-600"
      />
    </div>
  ))}

  {/* Checkbox */}
  <div className="col-span-2 flex items-center gap-2 mt-4">
    <input
      id="notRobot"
      type="checkbox"
      checked={formData.notRobot}
      onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
        setFormData({ ...formData, notRobot: e.target.checked })
      }
      className="w-4 h-4 border-gray-400"
    />
    <label htmlFor="notRobot" className="text-sm">I am not a robot</label>
  </div>
  {errors.notRobot && <p className="text-red-600 text-sm">{errors.notRobot}</p>}

  {/* Submit Button */}
  <div className="col-span-2 mt-4 flex justify-center">
    <button
      type="submit"
      className="w-50 bg-linear-to-r from-[#2076C7] to-[#1CADA3] text-white py-2 rounded-md hover:bg-[#178d84] transition"
    >
      Submit
    </button>
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
    <div>
      <label className="block text-sm font-medium mb-1">{label}</label>
      <input
        type={type}
        value={value}
        maxLength={maxLength}
        placeholder={placeholder}
        onChange={(e: React.ChangeEvent<HTMLInputElement>) => onChange(e.target.value)}
        className="w-full border border-gray-300 rounded-md p-2 focus:ring-2 focus:ring-blue-400"
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
    <div>
      <label className="block text-sm font-medium mb-1">{label}</label>
      <input
        type="date"
        value={value}
        onChange={(e: React.ChangeEvent<HTMLInputElement>) => onChange(e.target.value)}
        className="w-full border border-gray-300 rounded-md p-2 focus:ring-2 focus:ring-blue-400"
      />
      {error && <p className="text-red-600 text-xs mt-1">{error}</p>}
    </div>
  );
}
