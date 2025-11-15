"use client";

import { useState } from "react";
import { X } from "lucide-react";

export default function WealthManagementForm({
  onClose,
}: {
  onClose: () => void;
}) {
  return (
    <div className="fixed inset-0 bg-black/40 z-50 flex items-center justify-center">
      <div className="bg-white w-full max-w-3xl rounded-xl shadow-xl overflow-y-auto max-h-[95vh]">

        {/* HEADER */}
        <div className="flex justify-between items-center px-5 py-3 border-b">
          <h2 className="text-xl font-semibold text-[#1CADA3] ">Wealth Management Form</h2>
          <button onClick={onClose} className="text-gray-700 hover:text-black">
            <X size={22} />
          </button>
        </div>

        {/* BODY */}
        <div className="px-5 py-4">
          <form className="grid grid-cols-1 md:grid-cols-2 gap-4">

            {/* Client Name */}
            <div className="flex flex-col">
              <label className="font-medium mb-1">Client Name</label>
              <input type="text" className="input border p-2 rounded" placeholder="Enter Client Name" />
            </div>

            {/* Phone Number */}
            <div className="flex flex-col">
              <label className="font-medium mb-1">Client Phone No</label>
              <input type="text" className="input border p-2 rounded" placeholder="Enter Client Phone No" />
            </div>

            {/* Email */}
            <div className="flex flex-col">
              <label className="font-medium mb-1">Client Email ID</label>
              <input type="text" className="input border p-2 rounded" placeholder="Enter Client Email ID" />
            </div>

            {/* Client DOB */}
            <div className="flex flex-col">
              <label className="font-medium mb-1">Client Date of Birth</label>
              <input type="date" className="input border p-2 rounded" />
            </div>

            {/* Total Dependents */}
            <div className="flex flex-col">
              <label className="font-medium mb-1">Total No. of Dependents</label>
              <input type="text" className="input border p-2 rounded" placeholder="Enter Total Dependents" />
            </div>

            {/* Dependents DOB */}
            <div className="flex flex-col ">
              <label className="font-medium mb-1">Dependents Date of Birth</label>
              <input type="date" className="input border p-2 rounded" />
            </div>

            {/* Occupation */}
            <div className="flex flex-col">
              <label className="font-medium mb-1">Occupation</label>
              <select className="input border p-2 rounded">
                <option disabled selected>Select Occupation</option>
                <option>Job</option>
                <option>Business</option>
              </select>
            </div>

            {/* Monthly Income */}
            <div className="flex flex-col">
              <label className="font-medium mb-1">Total Monthly Income</label>
              <select className="input border p-2 rounded">
                <option disabled selected>Select Income Type</option>
                <option>Salary Income</option>
                <option>Incentives / Commission</option>
                <option>Business Income</option>
                <option>Rental Income</option>
                <option>Pension Income</option>
                <option>Other Income</option>
              </select>
            </div>

            {/* Rental Liability */}
            <div className="flex flex-col">
              <label className="font-medium mb-1">Rental Liability</label>
              <input type="text" className="input border p-2 rounded" placeholder="Enter Rental Liability" />
            </div>

            {/* Loan Liability */}
            <div className="flex flex-col">
              <label className="font-medium mb-1">Loan Liability</label>
              <input type="text" className="input border p-2 rounded" placeholder="Enter Loan Liability" />
            </div>

            {/* Insurance Liability */}
            <div className="flex flex-col">
              <label className="font-medium mb-1">Insurance Liability</label>
              <input type="text" className="input border p-2 rounded" placeholder="Enter Insurance Liability" />
            </div>

            {/* Investment Liability */}
            <div className="flex flex-col">
              <label className="font-medium mb-1">Investment Liability</label>
              <input type="text" className="input border p-2 rounded" placeholder="Enter Investment Liability" />
            </div>

            {/* Total Liability */}
            <div className="flex flex-col">
              <label className="font-medium mb-1">Total Liability</label>
              <input type="text" className="input border p-2 rounded" placeholder="Total Amount" />
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
