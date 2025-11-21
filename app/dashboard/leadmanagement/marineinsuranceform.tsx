"use client";

import { useState } from "react";
import { X } from "lucide-react";

interface MarineInsuranceFormProps {
  onClose: () => void;
}

export default function MarineInsuranceForm({ onClose }: MarineInsuranceFormProps) {
  const [formData, setFormData] = useState({
    proposer: "",
    policyNo: "",
    address: "",
    business: "",
    insurancePeriod: "",
    subjectMatter: "",
    packing: "",
    transitFrom: "",
    transitTo: "",
    transitMode: "",
    valuation: "",
    sumAssured: "",
    bottomLimit: "",
    locationLimit: "",
  });

  const [errors, setErrors] = useState<any>({});

  // Handle Input Change
  const handleChange = (e: any) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });

    setErrors({
      ...errors,
      [e.target.name]: "",
    });
  };

// Validation
const validate = () => {
  let newErrors: Record<string, string> = {};

  Object.entries(formData).forEach(([key, value]) => {
    if (value === "" || value === null || value === undefined) {
      newErrors[key] = "This field is required";
    }
  });

  setErrors(newErrors);

  return Object.keys(newErrors).length === 0;
};


  // Submit Form
  const handleSubmit = (e: any) => {
    e.preventDefault();

    if (!validate()) return;

    alert("Form Submitted Successfully!");
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 text-gray-700">
      <div className="bg-white rounded-xl shadow-xl w-full max-w-4xl mx-4 overflow-y-auto max-h-[90vh]">

        {/* Header */}
        <div className="flex justify-between items-center border-b px-6 py-4">
          <h2 className="text-xl font-semibold text-[#1CADA3]">Marine Insurance</h2>

          <button onClick={onClose} className="text-gray-500 hover:text-gray-800">
            <X size={22} />
          </button>
        </div>

        {/* Body */}
        <div className="p-6">
          <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-4">

            {/* Fields */}
            {[
              ["proposer", "Name of Proposer"],
              ["policyNo", "Expiring Policy No"],
              ["address", "Proposer Address"],
              ["business", "Nature of Business"],
              ["insurancePeriod", "Period of Insurance"],
              ["subjectMatter", "Subject Matter (Cargo Details)"],
              ["packing", "Nature of Packing"],
              ["transitFrom", "Transit Location From"],
              ["transitTo", "Transit Location To"],
              ["valuation", "Basis of Valuation"],
              ["sumAssured", "Sum Assured"],
              ["bottomLimit", "Per Bottom Limit"],
              ["locationLimit", "Per Location Limit"],
            ].map(([name, label], index) => (
              <div key={index}>
                <label className="block mb-1 font-medium">{label}</label>
                <input
                  name={name}
                  type="text"
                  value={(formData as any)[name]}
                  onChange={handleChange}
                  placeholder={`Enter ${label}`}
                  className="w-full border px-3 py-2 rounded-md"
                />
                {errors[name] && <p className="text-red-500 text-xs">{errors[name]}</p>}
              </div>
            ))}

            {/* Mode of Transit */}
            <div>
              <label className="block mb-1 font-medium">Mode Of Transit</label>
              <select
                name="transitMode"
                value={formData.transitMode}
                onChange={handleChange}
                className="w-full border px-3 py-2 rounded-md"
              >
                <option value="">Select Transit Mode</option>
                <option value="Rail">Rail</option>
                <option value="Road">Road</option>
                <option value="Courier">Courier</option>
                <option value="Sea">Sea</option>
                <option value="Air">Air</option>
              </select>
              {errors.transitMode && (
                <p className="text-red-500 text-xs">{errors.transitMode}</p>
              )}
            </div>

            {/* Captcha */}
            <div className="col-span-2">
              <label className="flex items-center gap-2">
                <input type="checkbox" required className="h-4 w-4" />
                <span>I am not Robot</span>
              </label>
            </div>

            {/* Submit */}
            <div className="col-span-2 mt-4 flex justify-center">
              <button
                type="submit"
                className="mt-6 bg-[#1CADA3] text-white px-6 py-2 rounded-md w-50 hover:bg-[#16948d] transition"
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
