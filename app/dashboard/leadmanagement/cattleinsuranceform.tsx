"use client";

import { X } from "lucide-react";

interface CattleInsuranceFormProps {
  onClose: () => void;
}

export default function CattleInsuranceForm({ onClose }: CattleInsuranceFormProps) {
  return (
     <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40">
      <div className="bg-white rounded-xl shadow-xl w-full max-w-4xl mx-4 overflow-y-auto max-h-[90vh]">

        {/* Header */}
        <div className="flex justify-between items-center border-b px-6 py-4">
          <h2 className="text-xl font-semibold text-gray-800">Cattle Insurance Form</h2>

          <button onClick={onClose} className="text-gray-500 hover:text-gray-800">
            <X size={22} />
          </button>
        </div>

        {/* Body */}
        <div className="p-6 max-h-[80vh] overflow-y-auto">
          <form className="grid grid-cols-1 md:grid-cols-2 gap-4">

            {/* Client Name */}
            <div>
              <label className="block font-medium mb-1">Client Name</label>
              <input
                type="text"
                placeholder="Enter Client Name"
                className="w-full border rounded-md px-3 py-2"
              />
            </div>

            {/* Farm / Company Name */}
            <div>
              <label className="block font-medium mb-1">Farm / Company Name</label>
              <input
                type="text"
                placeholder="Enter Farm / Company Name"
                className="w-full border rounded-md px-3 py-2"
              />
            </div>

            {/* Name of Livestock */}
            <div>
              <label className="block font-medium mb-1">Name of Live Stock</label>
              <input
                type="text"
                placeholder="Enter Name of Live Stock"
                className="w-full border rounded-md px-3 py-2"
              />
            </div>

            {/* Breed */}
            <div>
              <label className="block font-medium mb-1">Breed of Goat / Sheep</label>
              <input
                type="text"
                placeholder="Enter Breed of Goat / Sheep"
                className="w-full border rounded-md px-3 py-2"
              />
            </div>

            {/* Gender */}
            <div>
              <label className="block font-medium mb-1">Gender</label>
              <select className="w-full border rounded-md px-3 py-2">
                <option disabled selected>Gender</option>
                <option>Male</option>
                <option>Female</option>
              </select>
            </div>

            {/* Age */}
            <div>
              <label className="block font-medium mb-1">Age</label>
              <input
                type="text"
                placeholder="Enter Age"
                className="w-full border rounded-md px-3 py-2"
              />
            </div>

            {/* Color */}
            <div>
              <label className="block font-medium mb-1">Color</label>
              <input
                type="text"
                placeholder="Enter Color"
                className="w-full border rounded-md px-3 py-2"
              />
            </div>

            {/* Tag No */}
            <div>
              <label className="block font-medium mb-1">Tag Number</label>
              <input
                type="text"
                placeholder="Enter Tag No"
                className="w-full border rounded-md px-3 py-2"
              />
            </div>

            {/* Financer Bank */}
            <div>
              <label className="block font-medium mb-1">Financer Bank Name</label>
              <input
                type="text"
                placeholder="Enter Name Of Financer Bank"
                className="w-full border rounded-md px-3 py-2"
              />
            </div>

            {/* Location */}
            <div>
              <label className="block font-medium mb-1">Location</label>
              <input
                type="text"
                placeholder="Enter Location"
                className="w-full border rounded-md px-3 py-2"
              />
            </div>

            {/* Loss Ratio */}
            <div>
              <label className="block font-medium mb-1">Loss Ratio Details</label>
              <input
                type="text"
                placeholder="Enter Loss Ratio Details"
                className="w-full border rounded-md px-3 py-2"
              />
            </div>

            {/* File Upload */}
            <div>
              <label className="block font-medium mb-2">Prev. Year Policy</label>
              <input
                type="file"
                className="w-full border rounded-md px-3 py-2 cursor-pointer"
              />
            </div>

            {/* Company List (Checklist) */}
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

            {/* Not Robot */}
            <div className="col-span-2">
              <label className="flex items-center gap-2">
                <input type="checkbox" className="h-4 w-4" />
                <span>I am not Robot</span>
              </label>
            </div>

            {/* Submit */}
            <div className="col-span-2 mt-3">
              <button className="w-full bg-blue-600 text-white py-3 rounded-md hover:bg-blue-700 transition">
                Submit
              </button>
            </div>

          </form>
        </div>
      </div>
    </div>
  );
}
