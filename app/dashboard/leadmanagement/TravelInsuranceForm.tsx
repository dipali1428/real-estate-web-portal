"use client";

import { X } from "lucide-react";

interface TravelInsuranceForm {
  onClose: () => void;
}

export default function TravelInsuranceForm({ onClose }: TravelInsuranceForm) {
  return (
     <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40">
      <div className="bg-white rounded-xl shadow-xl w-full max-w-4xl mx-4 overflow-y-auto max-h-[90vh]">

        {/* Header */}
        <div className="flex justify-between items-center border-b px-6 py-4">
          <h2 className="text-xl font-semibold text-[#1CADA3]">Travel Insurance Form</h2>
          <button className="text-gray-500 hover:text-gray-800" onClick={onClose}>
            <X size={22} />
          </button>
        </div>

        {/* Body */}
        <div className="p-6">
          <form className="grid grid-cols-1 md:grid-cols-2 gap-4">

            {/* Client Name */}
            <div>
              <label className="font-medium block mb-1">Client Name</label>
              <input
                type="text"
                placeholder="Enter Client Name"
                className="w-full border px-3 py-2 rounded-md"
              />
            </div>

            {/* Date of Birth */}
            <div>
              <label className="font-medium block mb-1">Date of Birth</label>
              <input
                type="date"
                className="w-full border px-3 py-2 rounded-md"
              />
            </div>

            {/* Designation */}
            <div>
              <label className="font-medium block mb-1">Designation</label>
              <input
                type="text"
                placeholder="Enter Designation"
                className="w-full border px-3 py-2 rounded-md"
              />
            </div>

            {/* Duration of Travel */}
            <div>
              <label className="font-medium block mb-1">Duration Of Travel</label>
              <input
                type="text"
                placeholder="Enter Duration Of Travel"
                className="w-full border px-3 py-2 rounded-md"
              />
            </div>

            {/* Mode of Transport */}
            <div>
              <label className="font-medium block mb-1">Mode Of Transport</label>
              <input
                type="text"
                placeholder="Enter Mode Of Transport"
                className="w-full border px-3 py-2 rounded-md"
              />
            </div>

            {/* Sum Assured */}
            <div>
              <label className="font-medium block mb-1">Sum Assured Amount</label>
              <input
                type="number"
                placeholder="Enter Sum Assured Amount"
                className="w-full border px-3 py-2 rounded-md"
              />
            </div>

            {/* Company Checkbox List */}
            <div className="col-span-2">
              <label className="font-medium block mb-2">Select Insurance Companies</label>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                {[
                  "Bajaj Allianz General Insurance Company",
                  "TATA AIG General Insurance",
                  "ICICI Lombard General Insurance Company Limited",
                  "Digit Insurance",
                ].map((name, idx) => (
                  <label key={idx} className="flex items-center gap-2">
                    <input type="checkbox" className="h-4 w-4" />
                    {name}
                  </label>
                ))}
              </div>
            </div>

            {/* Not Robot */}
            <div className="col-span-2">
              <label className="flex items-center gap-2">
                <input type="checkbox" className="h-4 w-4" />
                I am not Robot
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
