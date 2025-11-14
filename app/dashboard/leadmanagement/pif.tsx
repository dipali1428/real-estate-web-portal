"use client";
import { useState } from "react";
import { X } from "lucide-react";

// ----------------------
// Input component types
// ----------------------
interface InputProps {
  label: string;
  placeholder?: string;
  type?: string;
}

function Input({ label, placeholder = "", type = "text" }: InputProps) {
  return (
    <div className="">
      <label className="block font-medium mb-1 text-black">{label}</label>
      <input
        type={type}
        placeholder={placeholder}
        className="w-full border border-gray-300 rounded-md px-3 py-2 
          focus:outline-none focus:ring-2 focus:ring-red-700"
      />
    </div>
  );
}

// ----------------------
// onClose typing
// ----------------------
interface PropertyInsuranceFormProps {
  onClose: () => void;
}

export default function PropertyInsuranceForm({
  onClose,
}: PropertyInsuranceFormProps) {
  const [loanType, setLoanType] = useState("");

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40">
      <div className="bg-white rounded-xl shadow-xl w-full max-w-4xl mx-4 overflow-y-auto max-h-[90vh]">
        {/* Header */}
        <div className="flex justify-between items-center border-b px-6 py-4">
          <h2 className="text-xl font-semibold text-black">
            Property Insurance Form
          </h2>
          <button onClick={onClose} className="text-gray-500 hover:text-gray-800">
            <X size={22} />
          </button>
        </div>

        <div className="p-6 max-h-[80vh] overflow-y-auto">
          <form className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Input label="Client Name" placeholder="Enter Client Name" />
            <Input label="Phone Number" placeholder="Enter Client Phone Number" />
            <Input label="Email ID" placeholder="Enter Client Email ID" />
            <Input label="Date of Birth" type="date" />
            <Input label="Location" placeholder="Enter Location" />

            {/* Dropdown Row */}
            <div>
              <label className="block font-medium mb-1">Fire Safety Measures</label>
              <select className="w-full border border-gray-300 rounded-md px-3 py-2">
                <option>Fire Alarm</option>
                <option>Sprinklers</option>
                <option>Extinguishers</option>
              </select>
            </div>

            <div>
              <label className="block font-medium mb-1">Safety Type</label>
              <select className="w-full border border-gray-300 rounded-md px-3 py-2">
                <option>Yes</option>
                <option>No</option>
              </select>
            </div>

            {/* File Upload Group */}
            <>
              {[
                "Copy of Index II"
              ].map((label, idx) => (
                <div key={idx} className="col-span-1">
                  <label className="block font-medium mb-1">{label}</label>
                  <input
                    type="file"
                    className="border rounded-lg p-2 text-sm 
                    file:mr-3 file:py-2 file:px-4 
                    file:rounded-full file:border-0 
                    file:bg-teal-500 file:text-white 
                    hover:file:bg-teal-600"
                  />
                </div>
              ))}
            </>

            {/* Company  */}
            <div className="col-span-2">
              <label className="block font-medium mb-2">Select Company</label>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                {[
                  "Bajaj Allianz General Insurance Company",
                  "TATA AIG General Insurance",
                  "ICICI Lombard General Insurance Company Limited",
                  "Digit Insurance",
                ].map((company, idx) => (
                  <label key={idx} className="flex items-center gap-2">
                    <input type="checkbox" className="h-4 w-4" />
                    <span>{company}</span>
                  </label>
                ))}
              </div>
            </div>

            {/* Checkbox */}
            <div className="col-span-2 flex items-center gap-2">
              <input type="checkbox" />
              <span>I am not a Robot</span>
            </div>

            {/* Submit */}
            <div className="col-span-2 justify-center">
              <button className="w-50  bg-linear-to-r from-[#2076C7] to-[#1CADA3] text-white py-2 rounded-md hover:bg-[#178d84] transition">
                Submit
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
