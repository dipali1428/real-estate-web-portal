"use client";

import { useState } from "react";

type InputProps = {
  label: string;
  placeholder: string;
  type?: string;
};

function Input({ label, placeholder, type = "text" }: InputProps) {
  return (
    <div className="flex flex-col mb-3">
      <label className="text-sm font-medium mb-1">{label}</label>
      <input
        type={type}
        placeholder={placeholder}
        className="border rounded-lg p-2 text-sm w-full"
      />
    </div>
  );
}

export default function DebtCapitalMarketForm({
  onClose,
}: {
  onClose: () => void;
}) {
  return (
    <div className="fixed inset-0 bg-black/40 z-50 flex items-center justify-center">
      <div className="bg-white w-full max-w-4xl rounded-xl shadow-xl p-6 overflow-y-auto max-h-[90vh]">

        
        {/* HEADER */}
        <div className="flex justify-between items-center border-b pb-3 mb-4">
          <h2 className="text-xl font-semibold text-[#1CADA3]">Debt Capital Market Form</h2>
          <button onClick={onClose} className="text-gray-600 hover:text-black text-xl">×</button>
        </div>

        {/* FORM */}
        <div className="p-6 max-h-[80vh] overflow-y-auto">
          <form className="grid grid-cols-1 md:grid-cols-2 gap-4">

            <Input label="Client Name" placeholder="Enter Client Name" />
            <Input label="Client Phone Number" placeholder="Enter Phone Number" />

            <Input label="Client Email ID" placeholder="Enter Email ID" />
            <Input label="Client Date of Birth" placeholder="Enter Date of Birth" type="date" />

            <Input label="Location" placeholder="Enter Location" />
            <Input label="Loan Amount" placeholder="Enter Loan Amount" />

            <Input label="Course Name" placeholder="Enter Course Name" />
            <Input label="Institution Name" placeholder="Enter Institution Name" />

            <Input label="Country Name" placeholder="Enter Country Name" />

            <div className="col-span-2">
              <Input
                label="Other Loan Obligation Details"
                placeholder="Enter Loan Obligation Details"
              />
            </div>

            {[
              "Aadhar Card",
              "Pan Card",
              "Address Proof",
              "1 Year Banking Statement",
              "Internal Memorandum",
              "Loan Agreements",
              "Borrowing Request",
              "Due Diligence Request List",
              "Guaranty",
              "Security Agreement",
              "Project Proposals",
              "Purchase Contracts",
              "Business Licence",
              "Photograph",
              "Existing Loan Statement",
            ].map((item, index) => (
              <div key={index} className="flex flex-col gap-1">
                <label className="text-sm font-medium">{item}</label>
                <input
                  type="file"
                   className="border rounded-lg p-2 text-sm file:mr-3 file:py-2 file:px-4 file:rounded-full file:border-0 file:bg-teal-500 file:text-white hover:file:bg-teal-600"
                />
              </div>
            ))}

            {/* SUBMIT BUTTON */}
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
