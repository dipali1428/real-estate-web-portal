"use client";

import { X } from "lucide-react";

export default function LoanAgainstSecuritiesForm({
  onClose,
}: {
  onClose: () => void;
}) {
  return (
    <div className="fixed inset-0 bg-black/40 z-50 flex items-center justify-center">
      <div className="bg-white rounded-xl shadow-xl w-full max-w-4xl mx-4 max-h-[90vh] overflow-y-auto">

        {/* HEADER */}
        <div className="flex items-center justify-between px-6 py-4 border-b">
          <h2 className="text-xl font-semibold text-[#1CADA3]">
            Loan Against Securities Form
          </h2>
          <button onClick={onClose} className="text-gray-600 hover:text-black">
            <X size={22} />
          </button>
        </div>

        {/* BODY */}
        <div className="p-6">
          <form className="grid grid-cols-1 md:grid-cols-2 gap-4">

            {/* Personal Details */}
            <Input label="Client Name" placeholder="Enter Client Name" />
            <Input
              label="Client Phone Number"
              placeholder="Enter Client Phone Number"
            />
            <Input label="Client Email ID" placeholder="Enter Client Email ID" />
            <DateInput label="Client Date of Birth" />

            <Input label="Location" placeholder="Enter Location" />
            <Input label="Loan Amount" placeholder="Enter Loan Amount" />

            <div className="col-span-2">
              <Input
                label="Other Loan Obligation Details"
                placeholder="Enter Other Loan Obligation Details"
              />
            </div>

            {/* File Uploads - Updated to match BusinessLoanForm style */}
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

            {/* Checkbox */}
            <div className="col-span-2 flex items-center gap-2 mt-3 text-gray-700">
              <input type="checkbox" className="w-4 h-4" />
              <label className="text-sm">I am not a robot</label>
            </div>

            {/* Submit */}
            <div className="col-span-2 mt-4 flex justify-center">
              <button
                type="submit"
                className="w-50 bg-gradient-to-r from-[#2076C7] to-[#1CADA3] text-white py-2 rounded-md hover:from-[#1a68b0] hover:to-[#18998f] transition-colors"
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

/* ---------------------------------------------------
   REUSABLE COMPONENTS
-----------------------------------------------------*/

function Input({ label, placeholder }: { label: string; placeholder: string }) {
  return (
    <div>
      <label className="text-sm font-medium text-gray-700">{label}</label>
      <input
        type="text"
        placeholder={placeholder}
        className="w-full mt-1 p-2 border border-gray-300 rounded-md bg-white text-gray-700 focus:ring-2 focus:ring-teal-400"
      />
    </div>
  );
}

function DateInput({ label }: { label: string }) {
  return (
    <div>
      <label className="text-sm font-medium text-gray-700">{label}</label>
      <input
        type="date"
        className="w-full mt-1 p-2 border border-gray-300 rounded-md bg-white text-gray-700 focus:ring-2 focus:ring-teal-400"
      />
    </div>
  );
}