"use client";

import { X } from "lucide-react";

export default function VehicleLoanForm({ onClose }: { onClose: () => void }) {
  return (
    <div className="fixed inset-0 bg-black/40 z-50 flex items-center justify-center">
      <div className="bg-white rounded-xl shadow-xl w-full max-w-5xl mx-4 max-h-[90vh] overflow-y-auto">

        {/* HEADER */}
        <div className="flex items-center justify-between px-6 py-4 border-b">
          <h2 className="text-xl font-semibold text-[#1CADA3]">Vehicle Loan Form</h2>
          <button onClick={onClose} className="text-gray-600 hover:text-black">
            <X size={22} />
          </button>
        </div>

        {/* BODY */}
        <div className="p-6">
          <form className="grid grid-cols-1 md:grid-cols-2 gap-4">

            {/* Personal Info */}
            <Input label="Client Name" placeholder="Enter Client Name" />
            <Input label="Client Phone Number" placeholder="Enter Client Phone Number" />
            <Input label="Client Email ID" placeholder="Enter Client Email ID" />

            <DateInput label="Client Date of Birth" />

            <Input label="Location" placeholder="Enter Location" />
            <Input label="Loan Amount" placeholder="Enter Loan Amount" />

            {/* Select */}
            <SelectInput
              label="Type of Vehicle"
              options={["Type - 1", "Type - 2", "Type - 3"]}
            />

            <div className="col-span-2">
              <Input label="Vehicle Company Name" placeholder="Enter Vehicle Company Name" />
            </div>

            <div className="col-span-2">
              <Input label="Vehicle Make & Model" placeholder="Enter Vehicle Make & Model" />
            </div>

            <div className="col-span-2">
              <Input
                label="Other Loan Obligation Details"
                placeholder="Enter Other Loan Obligation Details"
              />
            </div>

            {/* ---------- SALARIED SECTION ---------- */}
            <SectionHeading title="Upload Documents for Salaried Person" />

            <FileUpload label="Aadhar Card" />
            <FileUpload label="Pan Card" />
            <FileUpload label="3 Months Salary Slip" />
            <FileUpload label="2 Years Form 16" />
            <FileUpload label="6 Months Banking Statement" />
            <FileUpload label="Address Proof" />
            <FileUpload label="Photograph" />
            <FileUpload label="Existing Loan Statement" />
            <FileUpload label="Vehicle Quotation / Invoice" />

            {/* ---------- SELF EMPLOYED SECTION ---------- */}
            <SectionHeading title="Upload Documents for Self Employed Person" />

            <FileUpload label="Aadhar Card" />
            <FileUpload label="Pan Card" />
            <FileUpload label="Udyam Aadhar Registration" />
            <FileUpload label="Shop Act Licence" />
            <FileUpload label="1 Year Banking Statement" />
            <FileUpload label="Address Proof" />
            <FileUpload label="ITR 3 Years" />
            <FileUpload label="GST Certificate" />
            <FileUpload label="Last 12 Months GST Returns" />
            <FileUpload label="Photograph" />
            <FileUpload label="Existing Loan Statement" />
            <FileUpload label="Vehicle Quotation / Invoice" />

            {/* CHECKBOX */}
            <div className="col-span-2 flex items-center gap-2 mt-3">
              <input type="checkbox" className="w-4 h-4" />
              <label className="text-sm">I am not a robot</label>
            </div>

            {/* SUBMIT */}
            <div className="col-span-2 mt-4">
              <button className="w-full bg-[#1CADA3] text-white py-2 rounded-md hover:bg-[#15958b]">
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
      <label className="text-sm font-medium">{label}</label>
      <input
        type="text"
        placeholder={placeholder}
        className="w-full mt-1 p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-400"
      />
    </div>
  );
}

function DateInput({ label }: { label: string }) {
  return (
    <div>
      <label className="text-sm font-medium">{label}</label>
      <input
        type="date"
        className="w-full mt-1 p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-400"
      />
    </div>
  );
}

function SelectInput({ label, options }: { label: string; options: string[] }) {
  return (
    <div>
      <label className="text-sm font-medium">{label}</label>
      <select className="w-full mt-1 p-2 border border-gray-300 rounded-md">
        <option value="" disabled selected>
          Select {label}
        </option>
        {options.map((opt) => (
          <option key={opt}>{opt}</option>
        ))}
      </select>
    </div>
  );
}

function FileUpload({ label }: { label: string }) {
  const id = label.replace(/\s+/g, "-").toLowerCase();
  return (
    <div>
      <label className="block text-sm font-medium mb-1">{label}</label>
      <label
        htmlFor={id}
        className="border border-dashed border-gray-400 rounded-md p-3 block text-center cursor-pointer hover:bg-gray-50"
      >
        Upload File
      </label>
      <input type="file" id={id} className="hidden" />
    </div>
  );
}

function SectionHeading({ title }: { title: string }) {
  return (
    <div className="col-span-2 mt-6 mb-1">
      <h3 className="text-lg font-semibold text-gray-800 border-b pb-1">{title}</h3>
    </div>
  );
}
