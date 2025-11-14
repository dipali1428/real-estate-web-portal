"use client";
import { useState } from "react";
import { X } from "lucide-react";

export default function MotorInsuranceForm({ onClose }: { onClose: () => void }) {
  // ✅ Add state for Prev Year Policy selection
  const [hasPrevPolicy, setHasPrevPolicy] = useState("");

  return (
     <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40">
      <div className="bg-white rounded-xl shadow-xl w-full max-w-4xl mx-4 overflow-y-auto max-h-[90vh]">
        {/* Header */}
        <div className="flex justify-between items-center border-b px-6 py-4">
          <h2 className="text-xl font-semibold text-[#1CADA3]">
            Motor Insurance Form
          </h2>
          <button
            onClick={onClose}
            className="text-gray-500 hover:text-gray-800"
          >
            <X size={22} />
          </button>
        </div>

        {/* Body */}
        <div className="p-6 max-h-[80vh] overflow-y-auto">
          <form className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Select
              label="Type of Vehicle"
              options={["Car Insurance", "2 Wheeler", "GCV", "PCV", "Mic-D"]}
            />
            <Input label="Client Name" placeholder="Enter Client Name" />
            <Input
              label="Vehicle Registration"
              placeholder="Enter Vehicle Registration"
            />
            <Input
              label="Vehicle Make & Model"
              placeholder="Enter Vehicle Make & Model"
            />
            <Input label="Vehicle IDV" placeholder="Enter Vehicle IDV" />
            <Select
              label="Requirement"
              options={["Comprehensive", "Own Damage", "Third Party Damage"]}
            />
            <Select label="Claim Taken" options={["Yes", "No"]} />

            {/* ✅ Yes/No for Previous Year Policy */}
            <div>
              <label className="block text-sm font-medium mb-1">
                Prev. Year Policy Available?
              </label>
              <select
                className="w-full border border-gray-300 rounded-md p-2 focus:ring-2 focus:ring-blue-400"
                value={hasPrevPolicy}
                onChange={(e) => setHasPrevPolicy(e.target.value)}
              >
                <option value="">Select Option</option>
                <option value="Yes">Yes</option>
                <option value="No">No</option>
              </select>
            </div>
             <FileUpload label="RC" />
            {/* ✅ Show File Upload only if “Yes” */}
            {hasPrevPolicy === "Yes" && (
             
                <FileUpload label="Upload Prev. Year Policy" />
              
            )}

           
            

            <div className="col-span-2 flex items-center gap-2 mt-2">
              <input
                id="notRobot"
                type="checkbox"
                className="w-4 h-4 text-blue-600 border-gray-300 rounded"
              />
              <label htmlFor="notRobot" className="text-sm text-gray-700">
                I am not a robot
              </label>
            </div>

            <div className="col-span-2 mt-4">
              <button
                type="submit"
                className="w-full bg-[#1CADA3] text-white py-2 rounded-md hover:bg-[#16948d] transition"
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

/* ✅ Reusable Components */
function Input({ label, placeholder }: { label: string; placeholder: string }) {
  return (
    <div>
      <label className="block text-sm font-medium mb-1">{label}</label>
      <input
        type="text"
        placeholder={placeholder}
        className="w-full border border-gray-300 rounded-md p-2 focus:ring-2 focus:ring-blue-400"
      />
    </div>
  );
}

function Select({ label, options }: { label: string; options: string[] }) {
  return (
    <div>
      <label className="block text-sm font-medium mb-1">{label}</label>
      <select className="w-full border border-gray-300 rounded-md p-2 focus:ring-2 focus:ring-blue-400">
        <option value="">Select {label}</option>
        {options.map((opt) => (
          <option key={opt}>{opt}</option>
        ))}
      </select>
    </div>
  );
}

function FileUpload({ label }: { label: string }) {
  return (
    <div>
      <label className="block text-sm font-medium mb-1">{label}</label>
      <div className="border border-dashed border-gray-400 rounded-md p-3 text-center cursor-pointer hover:bg-gray-50">
        <input type="file" className="hidden" id={label} />
        <label htmlFor={label} className="text-blue-600 cursor-pointer">
          Upload File
        </label>
      </div>
    </div>
  );
}
