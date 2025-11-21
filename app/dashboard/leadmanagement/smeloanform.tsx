"use client";
import { X } from "lucide-react";

export default function SMELoanForm({ onClose }: { onClose: () => void }) {
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

        {/* BODY */}
        <div className="p-6 max-h-[80vh] overflow-y-auto">
          <form className="grid grid-cols-1 md:grid-cols-2 gap-4">

            <Input label="Client Name" placeholder="Enter Client Name" />
            <Input label="Client Phone Number" placeholder="Enter Phone Number" />

            <Input label="Client Email ID" placeholder="Enter Email ID" />
            <DateInput label="Client Date of Birth" />

            <Input label="Location" placeholder="Enter Location" />
            <Input label="Loan Amount" placeholder="Enter Loan Amount" />

            
            <Input label="Other Loan Obligation Details" placeholder="Enter Other Loan Obligation Details" />

           
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
                className="border rounded-lg p-2 text-sm file:mr-3 file:py-2 file:px-4 file:rounded-full file:border-0 file:bg-teal-500 file:text-white hover:file:bg-teal-600"
              />
            </div>
          ))}
            {/* Checkbox */}
            <div className="col-span-2 flex items-center gap-2 mt-4">
              <input
                id="notRobot"
                type="checkbox"
                className="w-4 h-4 border-gray-400"
              />
              <label htmlFor="notRobot" className="text-sm">I am not a robot</label>
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
    </div>
  );
}

/* ===========================
   Reusable Components
   =========================== */

function Input({ label, placeholder }: { label: string; placeholder: string }) {
  return (
    <div>
      <label className="block text-sm font-medium mb-1">{label}</label>
      <input
        type="text"
        placeholder={placeholder}
        className="w-full border border-gray-300 rounded-md p-2 focus:ring-2 focus:ring-blue-400"
      />
    </div>
  );
}

function DateInput({ label }: { label: string }) {
  return (
    <div>
      <label className="block text-sm font-medium mb-1">{label}</label>
      <input
        type="date"
        className="w-full border border-gray-300 rounded-md p-2 focus:ring-2 focus:ring-blue-400"
      />
    </div>
  );
}

function FileUpload({ label }: { label: string }) {
  const id = label.replace(/\s+/g, "-").toLowerCase();

  return (
    <div>
      <label className="block text-sm font-medium mb-1">{label}</label>

      <div className="border border-dashed border-gray-400 rounded-md p-3 text-center cursor-pointer hover:bg-gray-50">
        <input type="file" className="hidden" id={id} />
        <label htmlFor={id} className="text-blue-600 cursor-pointer">
          Upload File
        </label>
      </div>
    </div>
  );
}
