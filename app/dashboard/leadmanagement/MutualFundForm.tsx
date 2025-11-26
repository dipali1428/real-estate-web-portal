"use client";

import { X } from "lucide-react";
import { useState } from "react";

export default function MutualFundForm({ onClose }: { onClose: () => void }) {
  const [mutualType, setMutualType] = useState("");

  return (
    <div className="fixed inset-0 bg-black/40 z-50 flex items-center justify-center">
      <div className="bg-white w-full max-w-4xl rounded-xl shadow-xl overflow-y-auto max-h-[95vh]">

        {/* HEADER */}
        <div className="flex justify-between items-center px-5 py-3 border-b">
          <h2 className="text-xl font-semibold text-[#1CADA3]">Mutual Fund Form</h2>
          <button onClick={onClose} className="text-gray-700 hover:text-black">
            <X size={22} />
          </button>
        </div>

        {/* BODY */}
        <div className="px-5 py-5">
          <form className="grid grid-cols-1 md:grid-cols-2 gap-4 p-6 text-gray-700">

            {/* Client Name */}
            <div className="flex flex-col">
              <label className="font-medium mb-1 text-gray-700">Client Name</label>
              <input 
                type="text" 
                placeholder="Enter Client Name" 
                className="w-full border border-gray-300 rounded-md p-2 bg-white text-gray-700" 
              />
            </div>

            {/* Phone */}
            <div className="flex flex-col">
              <label className="font-medium mb-1 text-gray-700">Phone Number</label>
              <input 
                type="text" 
                placeholder="Enter Client Phone Number" 
                className="w-full border border-gray-300 rounded-md p-2 bg-white text-gray-700" 
              />
            </div>

            {/* Email */}
            <div className="flex flex-col">
              <label className="font-medium mb-1 text-gray-700">Email ID</label>
              <input 
                type="text" 
                placeholder="Enter Client Email ID" 
                className="w-full border border-gray-300 rounded-md p-2 bg-white text-gray-700" 
              />
            </div>

            {/* PAN */}
            <div className="flex flex-col">
              <label className="font-medium mb-1 text-gray-700">PAN Number</label>
              <input 
                type="text" 
                placeholder="Enter Client PAN Number" 
                className="w-full border border-gray-300 rounded-md p-2 bg-white text-gray-700" 
              />
            </div>

            {/* Nominee Name */}
            <div className="flex flex-col">
              <label className="font-medium mb-1 text-gray-700">Nominee Name</label>
              <input 
                type="text" 
                placeholder="Enter Nominee Name" 
                className="w-full border border-gray-300 rounded-md p-2 bg-white text-gray-700" 
              />
            </div>

            {/* Nominee DOB */}
            <div className="flex flex-col">
              <label className="font-medium mb-1 text-gray-700">Nominee Date of Birth</label>
              <input 
                type="date" 
                className="w-full border border-gray-300 rounded-md p-2 bg-white text-gray-700" 
              />
            </div>

            {/* Nominee Relation */}
            <div className="flex flex-col">
              <label className="font-medium mb-1 text-gray-700">Nominee Relation</label>
              <input 
                type="text" 
                placeholder="Enter Relation" 
                className="w-full border border-gray-300 rounded-md p-2 bg-white text-gray-700" 
              />
            </div>

            {/* Income Range */}
            <div className="flex flex-col">
              <label className="font-medium mb-1 text-gray-700">Income Range</label>
              <input 
                type="text" 
                placeholder="Enter Income Range" 
                className="w-full border border-gray-300 rounded-md p-2 bg-white text-gray-700" 
              />
            </div>

            {/* Occupation */}
            <div className="flex flex-col">
              <label className="font-medium mb-1 text-gray-700">Occupation</label>
              <input 
                type="text" 
                placeholder="Enter Occupation" 
                className="w-full border border-gray-300 rounded-md p-2 bg-white text-gray-700" 
              />
            </div>

            {/* Mutual Fund Type */}
            <div className="flex flex-col">
              <label className="font-medium mb-1 text-gray-700">Type of Mutual Fund</label>
              <select
                className="w-full border border-gray-300 rounded-md p-2 bg-white text-gray-700"
                value={mutualType}
                onChange={(e) => setMutualType(e.target.value)}
              >
                <option value="" disabled>Select Type</option>
                <option value="sip">SIP</option>
                <option value="lumpsum">Lumpsum</option>
              </select>
            </div>

            {/* Amount */}
            <div className="flex flex-col">
              <label className="font-medium mb-1 text-gray-700">Amount</label>
              <input 
                type="text" 
                placeholder="Enter Amount" 
                className="w-full border border-gray-300 rounded-md p-2 bg-white text-gray-700" 
              />
            </div>

            {/* Fund Name */}
            <div className="flex flex-col">
              <label className="font-medium mb-1 text-gray-700">Fund Name</label>
              <input 
                type="text" 
                placeholder="Enter Name of Fund" 
                className="w-full border border-gray-300 rounded-md p-2 bg-white text-gray-700" 
              />
            </div>

            {/* SIP Date */}
            <div className="flex flex-col">
              <label className="font-medium mb-1 text-gray-700">SIP Date (if applicable)</label>
              <input 
                type="date" 
                className="w-full border border-gray-300 rounded-md p-2 bg-white text-gray-700" 
              />
            </div>

            {/* FILE UPLOADS - Updated to match BusinessLoanForm style */}
            {[
              "Client PAN Copy",
              "Aadhaar Card Copy",
              "Cancelled Cheque",
              "Nominee PAN Copy",
            ].map((label, i) => (
              <div key={i} className="flex flex-col">
                <label className="font-medium text-sm mb-1 text-gray-700">{label}</label>
                <input
                  type="file"
                  className="w-full border border-gray-300 rounded-md p-2 bg-white text-gray-700 text-sm"
                />
              </div>
            ))}

            {/* CAPTCHA */}
            <div className="md:col-span-2 flex items-center gap-2 mt-2 text-gray-700">
              <input type="checkbox" className="h-4 w-4" />
              <label className="text-sm">I am not Robot</label>
            </div>

            {/* SUBMIT */}
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