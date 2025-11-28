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
    notRobot: false,
  });

  const [errors, setErrors] = useState<any>({});

  // Handle Input Change
  const handleChange = (e: any) => {
    const { name, value, type, checked } = e.target;
    
    setFormData({
      ...formData,
      [name]: type === 'checkbox' ? checked : value,
    });

    setErrors({
      ...errors,
      [name]: "",
    });
  };

  // Validation
  const validate = () => {
    let newErrors: Record<string, string> = {};

    Object.entries(formData).forEach(([key, value]) => {
      if ((value === "" || value === null || value === undefined) && key !== "notRobot") {
        newErrors[key] = "This field is required";
      }
    });

    if (!formData.notRobot) {
      newErrors.notRobot = "Please confirm you are not a robot";
    }

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
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 p-2 sm:p-4 text-gray-700">
      <div className="bg-white rounded-xl shadow-xl w-full max-w-4xl mx-auto h-[95vh] sm:h-[90vh] flex flex-col">
        
        {/* Header */}
        <div className="flex justify-between items-center border-b px-4 sm:px-6 py-3 sm:py-4 flex-shrink-0">
          <h2 className="text-lg sm:text-xl font-semibold text-[#1CADA3]">Marine Insurance</h2>
          <button onClick={onClose} className="text-gray-500 hover:text-gray-800">
            <X size={20} className="sm:w-6 sm:h-6" />
          </button>
        </div>

        {/* Scrollable Body */}
        <div className="flex-1 overflow-y-auto">
          <form onSubmit={handleSubmit} className="p-4 sm:p-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6">

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
                <div key={index} className="w-full">
                  <label className="block mb-1 font-medium text-sm sm:text-base">{label}</label>
                  <input
                    name={name}
                    type="text"
                    value={(formData as any)[name]}
                    onChange={handleChange}
                    placeholder={`Enter ${label.toLowerCase()}`}
                    className="w-full border border-gray-300 px-3 py-2 rounded-md text-sm sm:text-base focus:ring-2 focus:ring-[#1CADA3] focus:border-transparent"
                  />
                  {errors[name] && <p className="text-red-500 text-xs mt-1">{errors[name]}</p>}
                </div>
              ))}

              {/* Mode of Transit */}
              <div className="w-full">
                <label className="block mb-1 font-medium text-sm sm:text-base">Mode Of Transit</label>
                <select
                  name="transitMode"
                  value={formData.transitMode}
                  onChange={handleChange}
                  className="w-full border border-gray-300 px-3 py-2 rounded-md text-sm sm:text-base focus:ring-2 focus:ring-[#1CADA3] focus:border-transparent"
                >
                  <option value="">Select Transit Mode</option>
                  <option value="Rail">Rail</option>
                  <option value="Road">Road</option>
                  <option value="Courier">Courier</option>
                  <option value="Sea">Sea</option>
                  <option value="Air">Air</option>
                </select>
                {errors.transitMode && (
                  <p className="text-red-500 text-xs mt-1">{errors.transitMode}</p>
                )}
              </div>
              {/* Submit */}
              <div className="col-span-1 md:col-span-2 mt-4 flex justify-center">
                <button
                  type="submit"
                  className="w-full sm:w-50 bg-gradient-to-r from-[#2076C7] to-[#1CADA3] text-white py-2 rounded-md hover:from-[#1a68b0] hover:to-[#18998f] transition-colors text-sm sm:text-base"
                >
                  Submit
                </button>
              </div>

            </div>
          </form>
        </div>
      </div>
    </div>
  );
}