"use client";

import { X } from "lucide-react";
import { useState } from "react";

// Fixed Deposit Form Component
export function FixedDepositForm({ onClose }: { onClose?: () => void }) {
  return (
    <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
      <div className="bg-white w-full max-w-3xl rounded-xl shadow-xl p-6 relative">

        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-3 right-3 text-gray-600 hover:text-black"
        >
          <X size={22} />
        </button>

        {/* Title */}
        <h2 className="text-xl font-semibold text-center mb-5">
          Fixed Deposit Form
        </h2>

        {/* FORM */}
        <form className="grid grid-cols-1 md:grid-cols-2 gap-4">

          {/* Client Name */}
          <div className="flex flex-col">
            <label className="mb-1 font-medium">Client Name</label>
            <input type="text" placeholder="Enter Client Name" className="border p-2 rounded" />
          </div>

          {/* Phone Number */}
          <div className="flex flex-col">
            <label className="mb-1 font-medium">Client Phone No</label>
            <input type="text" placeholder="Enter Client Phone No" className="border p-2 rounded" />
          </div>

          {/* Email */}
          <div className="flex flex-col">
            <label className="mb-1 font-medium">Client Email ID</label>
            <input type="text" placeholder="Enter Client Email ID" className="border p-2 rounded" />
          </div>

          {/* DOB */}
          <div className="flex flex-col">
            <label className="mb-1 font-medium">Date of Birth</label>
            <input type="text" placeholder="Enter Client Date of Birth" className="border p-2 rounded" />
          </div>

          {/* Location */}
          <div className="flex flex-col">
            <label className="mb-1 font-medium">Location</label>
            <input type="text" placeholder="Enter Location" className="border p-2 rounded" />
          </div>

          {/* Term in Months */}
          <div className="flex flex-col">
            <label className="mb-1 font-medium">Term (Months)</label>
            <input type="text" placeholder="Enter Term [ In Months ]" className="border p-2 rounded" />
          </div>

          {/* Income */}
          <div className="flex flex-col">
            <label className="mb-1 font-medium">Total Monthly Income</label>
            <input type="text" placeholder="Total Monthly Income" className="border p-2 rounded" />
          </div>

          {/* Checkbox */}
          <div className="col-span-2 flex items-center gap-2 mt-2">
            <input type="checkbox" className="h-4 w-4" />
            <label>I am not Robot</label>
          </div>

          {/* Submit Button */}
          <div className="col-span-2 mt-3">
            <button type="submit" className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700">Submit</button>
          </div>

        </form>
      </div>
    </div>
  );
}

// Home Component
export default function Home() {
  const [open, setOpen] = useState(false);

  return (
    <div className="p-6">
      <button
        onClick={() => setOpen(true)}
        className="bg-blue-600 text-white px-4 py-2 rounded"
      >
        Open Fixed Deposit Form
      </button>

      {open && <FixedDepositForm onClose={() => setOpen(false)} />}
    </div>
  );
}
