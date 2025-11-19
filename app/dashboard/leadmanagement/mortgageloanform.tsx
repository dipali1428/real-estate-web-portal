"use client";
import { useState } from "react";
import { X } from "lucide-react";

// Reusable Input component
function Input({
  label,
  placeholder,
  type = "text",
}: {
  label: string;
  placeholder?: string;
  type?: string;
}) {
  return (
    <div className="flex flex-col">
      <label className="text-sm font-medium mb-1 text-gray-700">{label}</label>
      <input
        type={type}
        placeholder={placeholder}
        className="border border-gray-300 rounded-lg p-2 focus:ring-2 focus:ring-teal-500 focus:outline-none"
      />
    </div>
  );
}

// Upload documents
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
        <form className="grid grid-cols-1 md:grid-cols-2 gap-4 p-6">
          <Input label="Client Name" placeholder="Enter Client Name" />
          <Input label="Phone Number" placeholder="Enter Client Phone Number" />
          <Input label="Email ID" placeholder="Enter Client Email ID" />
          <Input label="Date of Birth" type="date" />
          <Input label="Location" placeholder="Enter Location" />
          <Input label="Loan Amount" placeholder="Enter Loan Amount" />
          <Input label="Use of Fund" placeholder="Enter Use of Fund" />
          <Input label="Deduction Details" placeholder="Enter Deduction Details" />

          {/* Employment Type */}
          <div className="col-span-2 ">
            <label className="text-sm font-semibold">Employment Type</label>
            <select
              value={employmentType}
              onChange={(e) => setEmploymentType(e.target.value)}
              className="border border-gray-300 rounded-lg p-2 mt-1 w-full"
            >
              <option value="">-- Select Employment Type --</option>
              <option value="salaried">Salaried Person</option>
              <option value="selfEmployed">Self Employed</option>
            </select>
          </div>

          {/* === Show Salaried Documents === */}
          {employmentType === "salaried" && (
            <>
              <div className="col-span-2 mt-4">
                <h3 className="text-lg font-semibold text-gray-700 mb-2">
                  Upload Documents for Salaried Person
                </h3>
              </div>

              {salariedUploads.map((label, index) => (
                <div key={index} className="flex flex-col">
                  <label className="text-sm font-medium mb-1">{label}</label>
                  <input
                    type="file"
                    className="border rounded-lg p-2 text-sm file:mr-3 file:py-2 file:px-4 
                      file:rounded-full file:border-0 file:bg-teal-500 file:text-white 
                      hover:file:bg-teal-600"
                  />
                </div>
              ))}
            </>
          )}

          {/* === Show Self-Employed Documents === */}
          {employmentType === "selfEmployed" && (
            <>
              <div className="col-span-2 mt-4">
                <h3 className="text-lg font-semibold text-gray-700 mb-2">
                  Upload Documents for Self Employed
                </h3>
              </div>

              {selfEmployedUploads.map((label, index) => (
                <div key={index} className="flex flex-col">
                  <label className="text-sm font-medium mb-1">{label}</label>
                  <input
                    type="file"
                    className="border rounded-lg p-2 text-sm file:mr-3 file:py-2 file:px-4 
                      file:rounded-full file:border-0 file:bg-teal-500 file:text-white 
                      hover:file:bg-teal-600"
                  />
                </div>
              ))}
            </>
          )}

          {/* Checkbox */}
          <div className="col-span-2 flex items-center gap-2 mt-4">
            <input type="checkbox" id="not-robot" className="w-4 h-4" />
            <label htmlFor="not-robot" className="text-sm text-gray-700">
              I am not a robot
            </label>
          </div>

          {/* Submit Button */}
          <div className="col-span-2 mt-4 flex justify-center">
            <button
              type="submit"
              className="bg-teal-600 w-50 text-white px-6 py-3 rounded-lg hover:bg-teal-700 transition-all"
            >
              Submit
            </button>
          </div>
        </form>

      </div>
    </div>
  );
}
