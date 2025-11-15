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
            <div key={idx} className="col-span-1">
              <label className="block font-medium mb-1">{label}</label>
              <input
                type="file"
                className="border rounded-lg p-2 text-sm file:mr-3 file:py-2 file:px-4 file:rounded-full file:border-0 file:bg-teal-500 file:text-white hover:file:bg-teal-600"
              />
            </div>
          ))}
            

            {/* Checkbox */}
            <div className="col-span-2 flex items-center gap-2 mt-3">
              <input type="checkbox" className="w-4 h-4" />
              <label className="text-sm">I am not a robot</label>
            </div>

            {/* Submit */}
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
        className="w-full mt-1 p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-teal-400"
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
        className="w-full mt-1 p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-teal-400"
      />
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
    <div className="col-span-2 mt-6 mb-2">
      <h3 className="text-lg font-semibold border-b pb-1">{title}</h3>
    </div>
  );
}
