"use client";
import { useState } from "react";
import { X } from "lucide-react";

export default function LifeInsuranceForm({ onClose }: { onClose: () => void }) {
  // State for Insurance Plan Type
  const [planType, setPlanType] = useState("");

  // Conditions for showing sections
  const showWholeTermFields =
    planType === "wholeLife" || planType === "termInsurance";

  const showInvestmentFields =
    planType === "ulip" || planType === "childPlan" || planType === "pensionPlan";

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40">
      <div className="bg-white rounded-xl shadow-xl w-full max-w-4xl mx-4 overflow-y-auto max-h-[90vh]">

        {/* Header */}
        <div className="flex justify-between items-center border-b px-6 py-4">
          <h2 className="text-xl font-semibold text-[#1CADA3]">
            Life Insurance Form
          </h2>
          <button onClick={onClose} className="text-gray-500 hover:text-gray-800">
            <X size={22} />
          </button>
        </div>

        {/* Select Plan */}
        <div className="mb-5 p-6">
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

          {/* Whole Life / Term Insurance Fields */}
          {showWholeTermFields && (
            <div className="space-y-3 mt-4">
              <Input label="Customer Name" type="text" />
              <Input label="Birthdate" type="date" />
              <Input label="Education" type="text" />
              <Input label="Profession" type="text" />
              <Input label="Income" type="number" />
              <Input label="3 Yrs ITR / Form 16 Provided?" type="text" />
              <Input label="Sum Assured Amount" type="number" />
              <Input label="Policy Term" type="text" />
              <Input label="PPT (Premium Paying Term)" type="text" />
              <Input label="Smoker / Non-Smoker" type="text" />
              <Input label="Drinker / Non-Drinker" type="text" />
              <Input label="Any Existing Disease?" type="text" />
            </div>
          )}

          {/* ULIP / Child / Pension Plans */}
          {showInvestmentFields && (
            <div className="space-y-3 mt-4">
              <Input label="Birthdate" type="date" />
              <Input label="Profession" type="text" />
              <Input label="Income" type="number" />
              <Input label="Policy Term" type="text" />
              <Input label="Premium Paying Term (PPT)" type="text" />
              <Input label="Investment Budget (Yearly)" type="number" />
            </div>
          )}

          {/* Button */}
          <div  className="col-span-2 mt-4 flex justify-center" ><button
            type="submit"
            className="mt-6 bg-[#1CADA3] text-white px-6 py-2 rounded-md w-50 hover:bg-[#16948d] transition"
          >
            Submit
          </button>
          </div>
        </div>
      </div>
    </div>
  );
}

/* REUSABLE INPUT COMPONENT */
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
