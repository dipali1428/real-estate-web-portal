"use client";

import { useState } from "react";
import { X } from "lucide-react";

export default function SMELoanForm({ onClose }: { onClose?: () => void }) {
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    email: "",
    location: "",
    loanAmount: "",
    deductionDetails: "",
    companyName: "",
    companyAddress: "",
    loanObligation: "",
  });

  const [errors, setErrors] = useState({} as any);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { id, value } = e.target;

    // Allow only numbers for phone & max 10 digits
    if (id === "phone") {
      if (!/^[0-9]*$/.test(value)) return;
      if (value.length > 10) return;
    }

    setFormData({ ...formData, [id]: value });
  };

  const validateForm = () => {
    const newErrors: any = {};
    Object.keys(formData).forEach((key) => {
      if (!formData[key as keyof typeof formData]) {
        newErrors[key] = "This field is required";
      }
    });
    if (formData.phone.length !== 10) {
      newErrors.phone = "Phone number must be 10 digits";
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!validateForm()) return;
    alert("Form submitted successfully!");
    console.log("Form Data:", formData);
  };

  const fileInputs = [
    "Aadhar Card",
    "Pan Card",
    "Address Proof",
    "GST Registration Certificate",
    "Udyam Aadhar Registration",
    "Shop Act Licence",
    "1 Year Banking Statement",
    "ITR 3 Years",
    "Constitution Doc (Partnership deed, MOA, AOA, GST In)",
    "Photograph",
    "Existing Loan Statement",
  ];

  const Input = ({
    label,
    id,
    placeholder,
    type = "text",
  }: {
    label: string;
    id: string;
    placeholder?: string;
    type?: string;
  }) => (
    <div className="flex flex-col">
      <label className="text-gray-700 text-sm font-medium mb-1">{label}</label>
      <input
        id={id}
        type={type}
        placeholder={placeholder}
        value={(formData as any)[id]}
        onChange={handleChange}
        className={`border rounded-lg px-3 py-2 focus:outline-none focus:ring-2 ${
          errors[id] ? "border-red-500 focus:ring-red-400" : "border-gray-300 focus:ring-[#1CADA3]"
        }`}
      />
      {errors[id] && <p className="text-red-500 text-xs mt-1">{errors[id]}</p>}
    </div>
  );

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40">
      <div className="bg-white rounded-xl shadow-xl w-full max-w-4xl mx-4 overflow-y-auto max-h-[90vh]">
        <div className="flex justify-between items-center border-b px-6 py-4">
          <h2 className="text-xl font-semibold text-[#1CADA3]">SME Loan Form</h2>
          <button onClick={onClose} className="text-gray-500 hover:text-gray-800">
            <X size={22} />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-4 p-6 text-gray-700">
          <Input label="Client Name" id="name" placeholder="Enter Client Name" />
          <Input label="Phone Number" id="phone" placeholder="Enter 10-digit phone number" type="tel" />
          <Input label="Email ID" id="email" placeholder="Enter Email" type="email" />

          <Input label="Location" id="location" placeholder="Enter Location" />
          <Input label="Loan Amount" id="loanAmount" placeholder="Enter Loan Amount" />
          <Input label="Deduction Details" id="deductionDetails" placeholder="Enter Deduction Details" />
          <Input label="Company Name" id="companyName" placeholder="Enter Company Name" />
          <Input label="Company Address" id="companyAddress" placeholder="Enter Company Address" />
          <Input label="Other Loan Obligation Details" id="loanObligation" placeholder="Enter Other Loan Details" />

          <div className="col-span-2 mt-6">
            <h3 className="text-lg font-semibold mb-3">Upload Documents</h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {fileInputs.map((label, index) => (
                <div key={index}>
                  <label className="text-sm font-medium">{label}</label>
                  <input type="file" className="border border-gray-300 rounded-lg p-2 mt-1 w-full" />
                </div>
              ))}
            </div>
          </div>

          <div className="col-span-2 mt-4 flex justify-center">
            <button
              type="submit"
              className="w-50 bg-linear-to-r from-[#2076C7] to-[#1CADA3] text-white py-2 rounded-md hover:opacity-90 transition"
            >
              Submit
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
