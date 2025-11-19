"use client";
import { useState } from "react";
import { X } from "lucide-react";

export default function RealEstateForm({ onClose }: { onClose: () => void }) {
  const [realestateType, setRealestateType] = useState("");

  return (
    <div className="fixed inset-0 bg-black/40 z-50 flex items-center justify-center">
      <div className="bg-white w-full max-w-3xl rounded-xl shadow-xl overflow-y-auto max-h-[95vh]">

        {/* HEADER */}
        <div className="flex justify-between items-center px-5 py-3 border-b">
          <h2 className="text-xl font-semibold text-[#1CADA3]">Real Estate Form</h2>
          <button onClick={onClose} className="text-gray-700 hover:text-black">
            <X size={22} />
          </button>
        </div>

        {/* FORM */}
        <div className="px-5 py-4">
          <form className="grid grid-cols-1 md:grid-cols-2 gap-4">

            <Input label="Client Name" placeholder="Enter Client Name" />
            <Input label="Client Phone No" placeholder="Enter Phone Number" />
            <Input label="Client Email ID" placeholder="Enter Email" />
            <Input label="Date of Birth" type="date" placeholder="YYYY-MM-DD" />
            <Input label="Location" placeholder="Enter Location" />
            <Input label="Capital Available" placeholder="Enter Capital Available" />
            <Input label="Take an Appointment" placeholder="Enter Appointment Date" />

            {/* REAL ESTATE TYPE DROPDOWN */}
            <div className="flex flex-col">
              <label className="font-medium mb-1">Type of Real Estate</label>
              <select
                className="border p-2 rounded"
                value={realestateType}
                onChange={(e) => setRealestateType(e.target.value)}
              >
                <option value="" disabled>Select Type</option>
                <option value="investment">Investment</option>
                <option value="residential">Residential</option>
                <option value="commercial">Commercial</option>
              </select>
            </div>

            {/* CHECKBOX */}
            <div className="col-span-2 flex items-center gap-2 mt-2">
              <input type="checkbox" className="h-4 w-4" />
              <label>I am not Robot</label>
            </div>

            {/* SUBMIT BUTTON */}
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

/* REUSABLE INPUT */
function Input({
  label,
  placeholder,
  type = "text",
}: {
  label: string;
  placeholder: string;
  type?: string;
}) {
  return (
    <div className="flex flex-col">
      <label className="text-sm font-medium">{label}</label>
      <input
        type={type}
        placeholder={placeholder}
        className="border p-2 rounded mt-1"
      />
    </div>
  );
}
