"use client";
import { useState } from "react";
import { X } from "lucide-react";

export default function BusinessLoanForm({ onClose }: { onClose: () => void }) {
  const [loanType, setLoanType] = useState("");

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40">
      <div className="bg-white rounded-xl shadow-xl w-full max-w-4xl mx-4 overflow-y-auto max-h-[90vh]">
        {/* Header */}
        <div className="flex justify-between items-center border-b px-6 py-4">
          <h2 className="text-xl font-semibold text-[#1CADA3]">Business Loan Form</h2>
          <button onClick={onClose} className="text-gray-500 hover:text-gray-800">
            <X size={22} />
          </button>
        </div>

        {/* Body */}
        <form className="grid grid-cols-1 md:grid-cols-2 gap-4 p-6">
          <Input label="Client Name" placeholder="Enter Client Name" />
          <Input label="Phone Number" placeholder="Enter Client Phone Number" />
          <Input label="Email ID" placeholder="Enter Client Email ID" />
          <Input label="Date of Birth" type="date" />
          <Input label="Location" placeholder="Enter Location" />
          <Input label="Loan Amount" placeholder="Enter Loan Amount" />
          <Input label="Deduction Details" placeholder="Enter Deduction Details" />
          <Input label="Company Name" placeholder="Enter Company Name" />
          <Input label="Company Address" placeholder="Enter Company Address" />
          <Input
            label="Other Loan Obligation Details"
            placeholder="Enter Other Loan Obligation Details"
          />

          {/* Type of Business */}
          <div className="flex flex-col">
            <label className="text-sm font-medium mb-1">Type of Business</label>
            <select
              className="border rounded-lg p-3 focus:ring-2 focus:ring-teal-500 outline-none"
              defaultValue=""
              onChange={(e) => setLoanType(e.target.value)}
            >
              <option value="" disabled>
                Select Type
              </option>
              <option>Proprietorship</option>
              <option>Partnership</option>
              <option>Pvt. Ltd.</option>
            </select>
          </div>

          {/* Business Start Date */}
          <Input label="Business Start Date" type="date" />

          {/* Upload Documents */}
          {[
            "Aadhar Card",
            "PAN Card",
            "Udyam Aadhar Registration",
            "Shop Act Licence",
            "1 Year Banking Statement",
            "Address Proof",
            "ITR 3 Years",
            "Photograph",
            "Existing Loan Statement",
          ].map((label, index) => (
            <div key={index} className="flex flex-col">
              <label className="text-sm font-medium mb-1">{label}</label>
              <input
                type="file"
                className="border rounded-lg p-2 text-sm file:mr-3 file:py-2 file:px-4 file:rounded-full file:border-0 file:bg-teal-500 file:text-white hover:file:bg-teal-600"
              />
            </div>
          ))}

          {/* Checkbox */}
          <div className="col-span-2 flex items-center gap-2">
            <input type="checkbox" id="not-robot" className="w-4 h-4" />
            <label htmlFor="not-robot" className="text-sm text-gray-700">
              I am not a robot
            </label>
          </div>

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
  );
}

/* ✅ Local Input Component */
function Input({
  label,
  type = "text",
  placeholder,
}: {
  label: string;
  type?: string;
  placeholder?: string;
}) {
  return (
    <div className="flex flex-col">
      <label className="text-sm font-medium mb-1">{label}</label>
      <input
        type={type}
        placeholder={placeholder}
        className="border rounded-lg p-3 focus:ring-2 focus:ring-teal-500 outline-none"
      />
    </div>
  );
}
