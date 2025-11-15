"use client";
import { useState } from "react";
import { X } from "lucide-react";

export default function PersonalLoanForm({ onClose }: { onClose: () => void }) {
  const [loanType, setLoanType] = useState("");

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 ">
      <div className="bg-white rounded-xl shadow-xl w-full max-w-4xl mx-4 overflow-y-auto max-h-[90vh]">
        {/* Header */}
        <div className="flex justify-between items-center border-b px-6 py-4 text-gray-700">
          <h2 className="text-xl font-semibold text-[#1CADA3]">Personal Loan Form</h2>
          <button onClick={onClose} className="text-gray-500 hover:text-gray-800">
            <X size={22} />
          </button>
        </div>

        {/* Body */}
        <form className="grid grid-cols-1 md:grid-cols-2 gap-4 p-6 text-gray-700">
          <Input label="Client Name" placeholder="Enter Client Name" />
          <Input label="Phone Number" placeholder="Enter Client Phone Number" />
          <Input label="Email ID" placeholder="Enter Client Email ID" />
          <Input label="Date of Birth" type="date" />
          <Input label="Location" placeholder="Enter Location" />
          <Input label="Loan Amount" placeholder="Enter Loan Amount" />
          <Input label="Deduction Details" placeholder="Enter Deduction Details"/>
          <Input label="Company Name" type="text" placeholder="Enter Company Name" />
          <Input label="Company Address" type="text" placeholder="Enter Company Address"  />
          <Input label="Other Loan Obligation Details" type="text" placeholder="Enter Other Loan Obligation Details"/>
          {/* File Uploads */}
          
          {[
            "Aadhar Card",
            "Pan Card",
            "3 Months Salary Slip",
            "Form 16",
            "3 Months Banking Statement",
            "Address Proof",
            "Photograph",
            "Existing Loan Statement",
          ].map((label, idx) => (
            <div key={idx} className="col-span-1">
              <label className="block font-medium mb-1">{label}</label>
              <input
                type="file"
                className="border rounded-lg p-2 text-sm file:mr-3 file:py-2 file:px-4 file:rounded-full file:border-0 file:bg-teal-500 file:text-white hover:file:bg-teal-600"
              />
            </div>
          ))}
          {/* Bottom Section */}
          <div className="col-span-2 flex items-center gap-2 mt-4">
            <input id="notRobot" type="checkbox" className="w-4 h-4 text-blue-600 border-gray-300 rounded" />
            <label htmlFor="notRobot" className="text-sm text-gray-700">I am not a robot</label>
          </div>

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

/* --------------------------- COMPONENTS --------------------------- */

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
        {options.map((opt: string) => (
          <option key={opt}>{opt}</option>
        ))}
      </select>
    </div>
  );
}

function FileUpload({ label }: { label: string }) {
  return (
    <div>
      <label className="block text-sm font-medium mb-1">{label}</label>
      <div className="border border-dashed border-gray-400 rounded-md p-3 text-center hover:bg-gray-50">
        <input type="file" id={label} className="hidden" />
        <label htmlFor={label} className="text-blue-600 cursor-pointer">
          Upload File
        </label>
      </div>
    </div>
  );
}

/* --------------------------- DOC SECTIONS --------------------------- */

function SalariedDocs() {
  const docs = [
    "Aadhar Card",
    "Pan Card",
    "3 Months Salary Slip",
    "2 Years Form 16",
    "6 Months Banking Statement",
    "Address Proof",
    "Photograph",
    "Existing Loan Statement",
    "Property Cost Sheet",
    "Own Contribution Proof",
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
    "Udyam Aadhar Registration",
    "Shop Act Licence",
    "1 Year Banking Statement",
    "Address Proof",
    "ITR 3 Years",
    "GST Certificate",
    "Last 12 Months GST Returns",
    "Photograph",
    "Existing Loan Statement",
    "Property Cost Sheet",
    "Own Contribution Proof",
  ];
  return (
    <Section title="Upload Documents for Self Employed Person">
      {docs.map((d) => (
        <FileUpload key={d} label={d} />
      ))}
    </Section>
  );
}

function BTDocs() {
  const docs = [
    "Aadhar Card",
    "Pan Card",
    "Income Document (As Per Salaried / Self Employed)",
    "Foreclosure Letter from Existing Loan",
    "Property Cost Sheet",
    "Own Contribution Proof",
    "List of Documents from Existing Bank",
  ];
  return (
    <Section title="Upload Documents for Balance Transfer">
      {docs.map((d) => (
        <FileUpload key={d} label={d} />
      ))}
    </Section>
  );
}

function Section({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div className="col-span-2 mt-6">
      <h3 className="text-md font-semibold mb-3 text-[#1CADA3]">{title}</h3>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">{children}</div>
    </div>
  );
}
