"use client";

import { useState } from "react";
import { X } from "lucide-react"; // ✅ Import close icon

export default function LifeInsuranceForm({ onClose }: { onClose?: () => void }) {
  const [planType, setPlanType] = useState("");

  const showWholeTermFields =
    planType === "wholeLife" || planType === "termInsurance";
  const showInvestmentFields =
    planType === "ulip" || planType === "childPlan" || planType === "pensionPlan";

  return (
    
    <div className="relative w-5/12 max-w-5xl mx-auto my-10 bg-white rounded-xl shadow-lg p-8 border border-gray-200">
      
   
       {/* X Close Button (upper-right corner) */}
      {onClose && (
        <button
          onClick={onClose}
          className="absolute top-3 right-3 text-gray-500 hover:text-red-600 transition"
        >
          <X size={24} /> {/* Lucide icon */}
        </button>
      )}

        <h2 className="text-center text-2xl font-semibold text-[#1CADA3] mb-6">
          Life Insurance Plan Details
        </h2>

        {/* Select Plan */}
        <div className="mb-5">
          <label className="font-semibold text-sm block mb-2">
            Select Insurance Type:
          </label>
          <select
            value={planType}
            onChange={(e) => setPlanType(e.target.value)}
            className="w-full border border-gray-300 rounded-md p-2 focus:ring-2 focus:ring-blue-400"
          >
            <option value="">-- Select Plan --</option>
            <option value="wholeLife">Whole Life Insurance</option>
            <option value="termInsurance">Term Insurance</option>
            <option value="ulip">Unit Linked Insurance Plans (ULIP)</option>
            <option value="childPlan">Child Plan</option>
            <option value="pensionPlan">Pension Plan</option>
          </select>
        </div>

        {/* Whole Life / Term Insurance */}
        {showWholeTermFields && (
          <div className="space-y-3">
            <Input label="Customer Name" type="text" />
            <Input label="Birthdate" type="date" />
            <Input label="Education" type="text" />
            <Input label="Profession" type="text" />
            <Input label="Income" type="number" />
            <Input label="3 Yrs ITR / Form 16" type="text" />
            <Input label="Sum Assured Amount" type="number" />
            <Input label="Policy Term" type="text" />
            <Input label="PPT" type="text" />
            <Input label="Smoker / Non-Smoker" type="text" />
            <Input label="Drinker / Non-Drinker" type="text" />
            <Input label="Any Existing Disease" type="text" />
          </div>
        )}

        {/* ULIP / Child / Pension Plans */}
        {showInvestmentFields && (
          <div className="space-y-3">
            <Input label="Birthdate" type="date" />
            <Input label="Profession" type="text" />
            <Input label="Income" type="number" />
            <Input label="Policy Term" type="text" />
            <Input label="Premium Paying Term" type="text" />
            <Input label="Investment Budget" type="number" />
          </div>
        )}

        <button
          type="submit"
          className="mt-6 bg-[#1CADA3] text-white px-6 py-2 rounded-md w-25 hover:bg-[#1f376b] transition"
        >
          Submit
        </button>
      </div>
    
  );
}

/* ✅ Reusable Input Component */
function Input({
  label,
  type = "text",
}: {
  label: string;
  type?: string;
}) {
  return (
    <div>
      <label className="font-semibold text-sm block mb-1">{label}</label>
      <input
        type={type}
        className="w-full border border-gray-300 rounded-md p-2 focus:ring-2 focus:ring-blue-400"
      />
    </div>
  );
}
