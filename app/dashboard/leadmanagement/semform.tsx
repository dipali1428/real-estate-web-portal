"use client";

import { useState } from "react";
import { X } from "lucide-react";

export default function SMELoanForm({ onClose }: { onClose?: () => void }) {
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    email: "",
    dob: "",
    location: "",
    loanAmount: "",
    businessType: "",
    businessStartDate: "",
    loanObligation: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setFormData({ ...formData, [e.target.id]: e.target.value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
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

  // ✅ Local reusable Input field
  const Input = ({
    label,
    placeholder,
    type = "text",
  }: {
    label: string;
    placeholder?: string;
    type?: string;
  }) => (
    <div className="flex flex-col">
      <label className="text-gray-700 text-sm font-medium mb-1">{label}</label>
      <input
        type={type}
        placeholder={placeholder}
        className="border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-[#1CADA3]"
      />
    </div>
  );

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40">
      <div className="bg-white rounded-xl shadow-xl w-full max-w-4xl mx-4 overflow-y-auto max-h-[90vh]">
        {/* Header */}
        <div className="flex justify-between items-center border-b px-6 py-4">
          <h2 className="text-xl font-semibold text-black">Business Loan Form</h2>
          <button onClick={onClose} className="text-gray-500 hover:text-gray-800">
            <X size={22} />
          </button>
        </div>

        {/* Body */}
        <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-4 p-6">
          <Input label="Client Name" placeholder="Enter Client Name" />
          <Input label="Phone Number" placeholder="Enter Client Phone Number" />
          <Input label="Email ID" placeholder="Enter Client Email ID" />
          <Input label="Date of Birth" type="date" />
          <Input label="Location" placeholder="Enter Location" />
          <Input label="Loan Amount" placeholder="Enter Loan Amount" />
          <Input label="Deduction Details" placeholder="Enter Deduction Details" />
          <Input label="Company Name" placeholder="Enter Company Name" />
          <Input label="Company Address" placeholder="Enter Company Address" />
          <Input label="Other Loan Obligation Details" placeholder="Enter Other Loan Obligation Details" />

          {/* Uploads */}
          <div className="col-span-2 mt-6">
            <h3 className="text-lg font-semibold mb-3">Upload Documents</h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {fileInputs.map((label, index) => (
                <div key={index} className="flex flex-col space-y-2">
                  <label className="text-gray-700 text-sm font-medium">{label}</label>
                  <input
                    type="file"
                    className="border border-gray-300 rounded-lg p-2 text-sm file:mr-3 file:py-1 file:px-3 file:rounded-md file:border-0 file:bg-teal-600 file:text-white hover:file:bg-teal-700"
                  />
                </div>
              ))}
            </div>
          </div>

          {/* Checkbox */}
          <div className="col-span-2 flex items-center mt-4">
            <input type="checkbox" id="notRobot" className="mr-2" />
            <label htmlFor="notRobot" className="text-gray-700">
              I am not a robot
            </label>
          </div>

          {/* Submit */}
          <div className="col-span-2 flex justify-center mt-6">
            <button
              type="submit"
              className="bg-[#1CADA3] text-white px-8 py-3 rounded-xl w-full md:w-1/2 hover:bg-[#16948d] transition"
            >
              Submit
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
