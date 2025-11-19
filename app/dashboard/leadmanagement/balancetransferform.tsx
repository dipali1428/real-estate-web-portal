"use client";
import { useState } from "react";
import { X } from "lucide-react";

export default function BalanceTransferForm({ onClose }: { onClose: () => void }) {
  const [loanType, setLoanType] = useState("");
  const [employmentType, setEmploymentType] = useState(""); // ✅ FIXED

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40">
      <div className="bg-white rounded-xl shadow-xl w-full max-w-4xl mx-4 overflow-y-auto max-h-[90vh] text-gray-700">

        {/* Header */}
        <div className="flex justify-between items-center border-b px-6 py-4">
          <h2 className="text-xl font-semibold text-[#1CADA3]">Balance Transfer Form</h2>
          <button onClick={onClose} className="text-gray-500 hover:text-gray-800">
            <X size={22} />
          </button>
        </div>

        {/* Form Body */}
        <form className="grid grid-cols-1 md:grid-cols-2 gap-4 p-6">
          <Input label="Client Name" placeholder="Enter Client Name" />
          <Input label="Phone Number" placeholder="Enter Client Phone Number" />
          <Input label="Email ID" placeholder="Enter Client Email ID" />
          <Input label="Date of Birth" type="date" />
          <Input label="Location" placeholder="Enter Location" />
          <Input label="Loan Amount" placeholder="Enter Loan Amount" />
          <Input label="Other Loan Obligation Details" placeholder="Enter Other Loan Obligation Details" />
          
          {/* Employment Type */}
         <div className=" md:grid-cols-2 gap-4">
            <label >Employment Type</label>
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

          {/* === Salaried Docs === */}
          {employmentType === "salaried" && <SalariedDocs />}

          {/* === Self Employed Docs === */}
          {employmentType === "selfEmployed" && <SelfEmployedDocs />}

          {/* Not Robot */}
          <div className="col-span-2 flex items-center gap-2 mt-4">
            <input id="notRobot" type="checkbox" className="w-4 h-4" />
            <label htmlFor="notRobot" className="text-sm text-gray-700">
              I am not a robot
            </label>
          </div>

          {/* Submit */}
          <div className="col-span-2 mt-4 flex justify-center">
            <button
              type="submit"
              className="w-50 bg-linear-to-r from-[#2076C7] to-[#1CADA3] text-white py-2 rounded-md hover:bg-[#178d84]"
            >
              Submit
            </button>
          </div>
        </form>

      </div>
    </div>
  );
}

/* ---------------- INPUT ---------------- */
function Input({ label, placeholder, type = "text", className = "" }: any) {
  return (
    <div className={className}>
      <label className="block text-sm font-medium mb-1">{label}</label>
      <input
        type={type}
        placeholder={placeholder}
        className="w-full border border-gray-300 rounded-md p-2 focus:ring-2 focus:ring-[#1CADA3]"
      />
    </div>
  );
}

/* ---------------- SELECT ---------------- */
function Select({ label, options, value, onChange }: any) {
  return (
    <div>
      <label className="block text-sm font-medium mb-1">{label}</label>
      <select
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="w-full border border-gray-300 rounded-md p-2 focus:ring-2 focus:ring-[#1CADA3]"
      >
        <option value="">Select {label}</option>
        {options.map((o: string) => (
          <option key={o}>{o}</option>
        ))}
      </select>
    </div>
  );
}

/* ---------------- FILE UPLOAD ---------------- */
function FileUpload({ label }: { label: string }) {
  return (
    <div>
      <label className="block text-sm font-medium mb-1">{label}</label>
      <input
        type="file"
        className="border rounded-lg p-2 text-sm file:mr-3 file:py-2 file:px-4 
        file:rounded-full file:border-0 file:bg-[#1CADA3] file:text-white hover:file:bg-[#178d84]"
      />
    </div>
  );
}

/* ---------------- DOC SECTIONS ---------------- */
function Section({ title, children }: any) {
  return (
    <div className="col-span-2 mt-6">
      <h3 className="text-md font-semibold mb-3 text-[#1CADA3]">{title}</h3>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">{children}</div>
    </div>
  );
}

function SalariedDocs() {
  const docs = [
    "Aadhar Card",
    "Pan Card",
    "3 Months Salary Slip",
    "2 Years Form 16",
    "6 Months Banking Statement",
    "Address Proof",
    "Photograph",
    "Existing Loan Statement / Index II",
    "Property Cost Sheet",
    "Own Contribution Proof",
    "List Of Document",
    "Loan Outstanding Letter",
    "Loan Account Statement / Loan Track Record",
  ];
  return (
    <Section title="Upload Documents for Salaried Person">
      {docs.map((d) => (
        <FileUpload key={d} label={d} />
      ))}
    </Section>
  );
}

function SelfEmployedDocs() {
  const docs = [
    "Aadhar Card",
    "Pan Card",
    "Udyam Registration",
    "Shop Act Licence",
    "1 current Banking Statement",
    "Saving  Bank account",
    "Address Proof",
    "3 Years ITR",
    "GST Certificate",
    "Last 12 Months GST Returns",
    "Photograph",
    "Existing Loan Statement / Index II",
    "Property Cost Sheet",
    "Own Contribution Proof",
    "List Of Document",
    "Loan Outstanding Letter",
    "Loan Account Statement / Loan Track Record",
  ];
  return (
    <Section title="Upload Documents for Self Employed Person">
      {docs.map((d) => (
        <FileUpload key={d} label={d} />
      ))}
    </Section>
  );
}
