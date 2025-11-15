"use client";

import { X } from "lucide-react";

interface MarineInsuranceFormProps {
  onClose: () => void;
}

export default function MarineInsuranceForm({ onClose }: MarineInsuranceFormProps) {
  return (
     <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 text-gray-700">
      <div className="bg-white rounded-xl shadow-xl w-full max-w-4xl mx-4 overflow-y-auto max-h-[90vh]">

        {/* Header */}
        <div className="flex justify-between items-center border-b px-6 py-4 ">
          <h2 className="text-xl font-semibold text-[#1CADA3]">Marine Insurance</h2>

          <button
            onClick={onClose}
            className="text-gray-500 hover:text-gray-800"
          >
            <X size={22} />
          </button>
        </div>

        {/* Body */}
        <div className="p-6">
          <form className="grid grid-cols-1 md:grid-cols-2 gap-4">

            {/* Name of Proposer */}
            <div>
              <label className="block mb-1 font-medium">Name of Proposer</label>
              <input
                type="text"
                placeholder="Enter Name Of Proposer"
                className="w-full border px-3 py-2 rounded-md"
              />
            </div>
             <div>
              <label className="block mb-1 font-medium">Expiring Policy No</label>
              <input
                type="text"
                placeholder="Enter Expiring Policy No"
                className="w-full border px-3 py-2 rounded-md"
              />
            </div>

            {/* Proposer Address */}
            <div className="col-span-2">
              <label className="block mb-1 font-medium">Proposer Address</label>
              <input
                type="text"
                placeholder="Enter Proposer Address"
                className="w-full border px-3 py-2 rounded-md"
              />
            </div>

            {/* Nature of Business */}
            <div>
              <label className="block mb-1 font-medium">Nature of Business</label>
              <input
                type="text"
                placeholder="Enter Nature of Business"
                className="w-full border px-3 py-2 rounded-md"
              />
            </div>

            
           

            {/* Period of Insurance */}
            <div>
              <label className="block mb-1 font-medium">Period of Insurance</label>
              <input
                type="text"
                placeholder="Enter Period Of Insurance"
                className="w-full border px-3 py-2 rounded-md"
              />
            </div>

            {/* Subject Matter */}
            <div className="col-span-2">
              <label className="block mb-1 font-medium">Subject Matter (Full Particulars Of Cargo)</label>
              <input
                type="text"
                placeholder="Enter Subject Matter (Full Particulars Of Cargo)"
                className="w-full border px-3 py-2 rounded-md"
              />
            </div>

            {/* Nature Of Packing */}
            <div>
              <label className="block mb-1 font-medium">Nature Of Packing</label>
              <input
                type="text"
                placeholder="Enter Nature Of Packing"
                className="w-full border px-3 py-2 rounded-md"
              />
            </div>

            {/* Transit From */}
            <div>
              <label className="block mb-1 font-medium">Transit Location From</label>
              <input
                type="text"
                placeholder="Enter Transit Location From"
                className="w-full border px-3 py-2 rounded-md"
              />
            </div>

            {/* Transit To */}
            <div>
              <label className="block mb-1 font-medium">Transit Location To</label>
              <input
                type="text"
                placeholder="Enter Transit Location To"
                className="w-full border px-3 py-2 rounded-md"
              />
            </div>

            {/* Mode of Transit */}
            <div>
              <label className="block mb-1 font-medium">Mode Of Transit</label>
              <select className="w-full border px-3 py-2 rounded-md">
                <option disabled selected>Mode Of Transit</option>
                <option>Rail</option>
                <option>Road</option>
                <option>Courier</option>
                <option>Sea</option>
                <option>Air</option>
              </select>
            </div>

            {/* Basis of Valuation */}
            <div>
              <label className="block mb-1 font-medium">Basis of Valuation</label>
              <input
                type="text"
                placeholder="Enter Basis of Valuation"
                className="w-full border px-3 py-2 rounded-md"
              />
            </div>

            {/* Sum Assured */}
            <div>
              <label className="block mb-1 font-medium">Sum Assured</label>
              <input
                type="text"
                placeholder="Enter Sum Assured"
                className="w-full border px-3 py-2 rounded-md"
              />
            </div>

            {/* Per Bottom Limit */}
            <div>
              <label className="block mb-1 font-medium">Per Bottom Limit</label>
              <input
                type="text"
                placeholder="Enter Per Bottom Limit"
                className="w-full border px-3 py-2 rounded-md"
              />
            </div>

            {/* Per Location Limit */}
            <div>
              <label className="block mb-1 font-medium">Per Location Limit</label>
              <input
                type="text"
                placeholder="Enter Per Location Limit"
                className="w-full border px-3 py-2 rounded-md"
              />
            </div>

            {/* Company Selection (Checklist) */}
            <div className="col-span-2">
              <label className="block font-medium mb-2">Select Insurance Companies</label>

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

            {/* Captcha */}
            <div className="col-span-2">
              <label className="flex items-center gap-2">
                <input type="checkbox" className="h-4 w-4" />
                <span>I am not Robot</span>
              </label>
            </div>

            {/* Submit Button */}
            <div  className="col-span-2 mt-4 flex justify-center" >
              <button
                type="submit"
                className="mt-6 bg-[#1CADA3] text-white px-6 py-2 rounded-md w-50 hover:bg-[#16948d] transition"
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
