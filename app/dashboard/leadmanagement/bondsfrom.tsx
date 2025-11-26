"use client";

import { useState } from "react";
import { X } from "lucide-react";

export default function BondsForm({
  onClose,
}: {
  onClose: () => void;
}) {
  return (
    <div className="fixed inset-0 bg-black/40 z-50 flex items-center justify-center">
      <div className="bg-white w-full max-w-3xl rounded-xl shadow-xl overflow-y-auto max-h-[95vh]">

        {/* HEADER */}
        <div className="flex justify-between items-center px-5 py-3 border-b">
          <h2 className="text-xl font-semibold text-[#1CADA3]">Bonds Form</h2>
          <button onClick={onClose} className="text-gray-700 hover:text-black">
            <X size={22} />
          </button>
        </div>

        {/* BODY */}
        <div className="px-5 py-4">
          <form className="grid grid-cols-1 md:grid-cols-2 gap-4">
            
            {/* Client Name */}
            <div className="flex flex-col">
              <label className="font-medium mb-1 text-gray-700">Client Name</label>
              <input 
                type="text" 
                className="w-full border border-gray-300 rounded-md p-2 bg-white text-gray-700" 
                placeholder="Enter Client Name" 
              />
            </div>

            {/* Phone Number */}
            <div className="flex flex-col">
              <label className="font-medium mb-1 text-gray-700">Client Phone No</label>
              <input 
                type="text" 
                className="w-full border border-gray-300 rounded-md p-2 bg-white text-gray-700" 
                placeholder="Enter Client Phone No" 
              />
            </div>

            {/* Email */}
            <div className="flex flex-col">
              <label className="font-medium mb-1 text-gray-700">Client Email ID</label>
              <input 
                type="text" 
                className="w-full border border-gray-300 rounded-md p-2 bg-white text-gray-700" 
                placeholder="Enter Client Email ID" 
              />
            </div>

            {/* Date of Birth */}
            <div className="flex flex-col">
              <label className="font-medium mb-1 text-gray-700">Client Date of Birth</label>
              <input 
                type="date" 
                className="w-full border border-gray-300 rounded-md p-2 bg-white text-gray-700" 
              />
            </div>

            {/* Location */}
            <div className="flex flex-col">
              <label className="font-medium mb-1 text-gray-700">Location</label>
              <input 
                type="text" 
                className="w-full border border-gray-300 rounded-md p-2 bg-white text-gray-700" 
                placeholder="Enter location" 
              />
            </div>

            {/* Lumsum Deposit Amount */}
            <div className="flex flex-col">
              <label className="font-medium mb-1 text-gray-700">Lumsum Deposit Amount</label>
              <input 
                type="text" 
                className="w-full border border-gray-300 rounded-md p-2 bg-white text-gray-700" 
                placeholder="Enter Lumsum Deposit Amount" 
              />
            </div>

            {/* Total Monthly Income */}
            <div className="flex flex-col">
              <label className="font-medium mb-1 text-gray-700">Total Monthly Income</label>
              <input 
                type="text" 
                className="w-full border border-gray-300 rounded-md p-2 bg-white text-gray-700" 
                placeholder="Enter Total Monthly Income" 
              />
            </div>

            {/* Safety Type */}
            <div className="flex flex-col">
              <label className="font-medium mb-1 text-gray-700">Safety Type</label>
              <select className="w-full border border-gray-300 rounded-md p-2 bg-white text-gray-700">
                <option>Corporate Bonds</option>
                <option>Sovereign Gold Bonds</option>
              </select>
            </div>

            {/* Checkbox */}
            <div className="md:col-span-2 mt-2">
              <label className="flex items-center gap-2 text-gray-700">
                <input type="checkbox" className="h-4 w-4" />
                <span>I am not Robot</span>
              </label>
            </div>

            {/* Submit Button */}
            <div className="col-span-2 mt-4 flex justify-center">
              <button
                type="submit"
                className="w-50 bg-gradient-to-r from-[#2076C7] to-[#1CADA3] text-white py-2 rounded-md hover:from-[#1a68b0] hover:to-[#18998f] transition-colors"
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