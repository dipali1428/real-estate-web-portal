"use client";

import { X } from "lucide-react";
import { useState } from "react";

export default function PMSAIFForm({ onClose }: { onClose?: () => void }) {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40">
      <div className="bg-white w-full max-w-3xl rounded-xl shadow-lg p-6">
        {/* Header */}
        <div className="flex justify-between items-center border-b pb-3">
          <h2 className="text-xl font-semibold">PMS / AIF Form</h2>
          <button onClick={onClose}>
            <X className="w-6 h-6" />
          </button>
        </div>

        {/* Form */}
        <form className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-6">

          <input
            type="text"
            className="input"
            placeholder="Enter Client Name"
          />

          <input
            type="text"
            className="input"
            placeholder="Enter Client Phone No"
          />

          <input
            type="text"
            className="input"
            placeholder="Enter Client Email ID"
          />

          <input
            type="date"
            className="input"
            placeholder="Enter Client Date of Birth"
          />

          <input
            type="text"
            className="input"
            placeholder="Enter Location"
          />

          <input
            type="text"
            className="input"
            placeholder="Enter Pincode"
          />

          {/* Appointment Date */}
          <div className="md:col-span-2">
            <label className="text-sm font-semibold">Take an Appointment</label>
            <input
              type="date"
              className="input mt-1 w-full"
            />
          </div>

          {/* Checkbox */}
          <div className="md:col-span-2 flex items-center gap-2 mt-2">
            <input type="checkbox" className="w-4 h-4" />
            <label className="text-sm">I am not Robot</label>
          </div>

          {/* Submit Button */}
          <div className="md:col-span-2 mt-4">
            <button className="w-full bg-blue-600 text-white py-2 rounded-lg font-semibold">
              Submit
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
