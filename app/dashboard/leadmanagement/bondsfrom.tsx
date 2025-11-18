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
          <h2 className="text-xl font-semibold text-[#1CADA3] ">Bonds Form</h2>
          <button onClick={onClose} className="text-gray-700 hover:text-black">
            <X size={22} />
          </button>
        </div>

        {/* BODY */}
        <div className="px-5 py-4">
          <form className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="flex flex-col">
              <label className="font-medium mb-1">Client Name</label>
              <input type="text" className="input border p-2 rounded" placeholder="Enter Client Name" />
            </div>
            <div className="flex flex-col">
              <label className="font-medium mb-1">Client Phone No</label>
              <input type="text" className="input border p-2 rounded" placeholder="Enter Client Phone No" />
            </div>
            <div className="flex flex-col">
              <label className="font-medium mb-1">Client Email ID</label>
              <input type="text" className="input border p-2 rounded" placeholder="Enter Client Email ID" />
            </div>
            <div className="flex flex-col">
              <label className="font-medium mb-1">Client Date of Birth</label>
              <input type="date" className="input border p-2 rounded" />
            </div>
             <div className="flex flex-col ">
              <label className="font-medium mb-1"> Location</label>
              <input type="text" className="input border p-2 rounded" placeholder="Enter location" />
            </div>
             <div className="flex flex-col ">
              <label className="font-medium mb-1"> Lumsum Deposit Amount</label>
              <input type="text" className="input border p-2 rounded"placeholder="Enter Lumsum Deposit Amount" />
            </div>
            <div className="flex flex-col ">
              <label className="font-medium mb-1"> Total Monthly Income</label>
              <input type="text" className="input border p-2 rounded"placeholder="Enter Total Monthly Income" />
            </div>
            <div>
              <label className="block font-medium mb-1">Safety Type</label>
              <select className="w-full border border-gray-300 rounded-md px-3 py-2">
                <option>Corporate Bonds</option>
                <option>Sovereign Gold Bonds</option>
              </select>
            </div>

            {/* Checkbox */}
            <div className="md:col-span-2 mt-2">
              <label className="flex items-center gap-2">
                <input type="checkbox" className="h-4 w-4" />
                <span>I am not Robot</span>
              </label>
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
