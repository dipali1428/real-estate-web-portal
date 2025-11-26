"use client";

import { useState } from "react";
import { X } from "lucide-react";

interface CattleInsuranceFormProps {
  onClose: () => void;
}

export default function CattleInsuranceForm({ onClose }: CattleInsuranceFormProps) {
  // ----------------- STATE -----------------
  const [formData, setFormData] = useState({
    clientName: "",
    farmName: "",
    liveStock: "",
    breed: "",
    gender: "",
    age: "",
    color: "",
    tagNo: "",
    financer: "",
    location: "",
    lossRatio: "",
    prevPolicy: null as File | null,
    notRobot: false,
  //  selectedCompanies: [] as string[],
  });

  const [errors, setErrors] = useState<Record<string, string>>({});

  // ---------- HANDLE INPUT CHANGE ----------
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value, type, checked, files } = e.target as any;

    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" && name === "notRobot"
        ? checked
        : type === "file"
        ? files[0]
        : value,
    }));
  };

  // const handleCompanyChange = (company: string) => {
  //   setFormData((prev) => {
  //     const selected = prev.selectedCompanies.includes(company)
  //       ? prev.selectedCompanies.filter((c) => c !== company)
  //       : [...prev.selectedCompanies, company];
  //     return { ...prev, selectedCompanies: selected };
  //   });
  // };

  // ---------- VALIDATION ----------
  const validateForm = () => {
    const newErrors: Record<string, string> = {};

    Object.keys(formData).forEach((key) => {
      if (!formData[key as keyof typeof formData]) {
        if (key === "prevPolicy" || key === "selectedCompanies") return; // optional fields
        newErrors[key] = "This field is required";
      }
    });

    if (!formData.notRobot) {
      newErrors.notRobot = "Please confirm you are not a robot";
    }

    setErrors(newErrors);

    return Object.keys(newErrors).length === 0;
  };

  // ---------- SUBMIT ----------
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!validateForm()) return;

    console.log("Form Data Submitted:", formData);
    alert("Form Submitted Successfully!");
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40">
      <div className="bg-white rounded-xl shadow-xl w-full max-w-4xl mx-4 overflow-y-auto max-h-[90vh]">

        {/* Header */}
        <div className="flex justify-between items-center border-b px-6 py-4">
          <h2 className="text-xl font-semibold text-[#1CADA3]">Cattle Insurance Form</h2>
          <button onClick={onClose} className="text-gray-500 hover:text-gray-800">
            <X size={22} />
          </button>
        </div>

        {/* Body */}
        <div className="p-6 max-h-[80vh] overflow-y-auto">
          <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-4">

            {/* Text Inputs */}
            {[
              { label: "Client Name", name: "clientName" },
              { label: "Farm / Company Name", name: "farmName" },
              { label: "Name of Live Stock", name: "liveStock" },
              { label: "Breed of Goat / Sheep", name: "breed" },
              { label: "Age", name: "age" },
              { label: "Color", name: "color" },
              { label: "Tag Number", name: "tagNo" },
              { label: "Financer Bank Name", name: "financer" },
              { label: "Location", name: "location" },
              { label: "Loss Ratio Details", name: "lossRatio" },
            ].map((field, idx) => (
              <div key={idx}>
                <label className="block font-medium mb-1 text-gray-700">{field.label}</label>
                <input
                  name={field.name}
                  type="text"
                  value={formData[field.name as keyof typeof formData] as string}
                  onChange={handleChange}
                  placeholder={`Enter ${field.label}`}
                  className="w-full border rounded-md px-3 py-2 border-gray-300 text-gray-700"
                />
                {errors[field.name] && (
                  <p className="text-red-500 text-xs">{errors[field.name]}</p>
                )}
              </div>
            ))}

            {/* Gender */}
            <div>
              <label className="block font-medium mb-1 text-gray-700">Gender</label>
              <select
                name="gender"
                value={formData.gender}
                onChange={handleChange}
                className="w-full border rounded-md px-3 py-2 border-gray-300 text-gray-700"
              >
                <option value="">Select gender</option>
                <option value="Male">Male</option>
                <option value="Female">Female</option>
              </select>
              {errors.gender && <p className="text-red-500 text-xs">{errors.gender}</p>}
            </div>

            {/* Prev Policy File */}
            <div>
              <label className="block font-medium mb-2 text-gray-700">Prev. Year Policy (Optional)</label>
              <input
                type="file"
                name="prevPolicy"
                onChange={handleChange}
                className="w-full border rounded-md px-3 py-2 border-gray-300 cursor-pointer text-gray-700"
              />
            </div>

            {/* Companies 
            <div className="col-span-2">
              <label className="block font-medium mb-2">Select Insurance Companies</label>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                {[
                  "Bajaj Allianz General Insurance Company",
                  "TATA AIG General Insurance",
                  "ICICI Lombard General Insurance Company Limited",
                  "Digit Insurance",
                ].map((company, idx) => (
                  <label key={idx} className="flex items-center gap-2">
                    <input
                      type="checkbox"
                      className="h-4 w-4"
                      checked={formData.selectedCompanies.includes(company)}
                      onChange={() => handleCompanyChange(company)}
                    />
                    <span>{company}</span>
                  </label>
                ))}
              </div>
            </div>*/}

            {/* Not Robot */}
            <div className="col-span-2">
              <label className="flex items-center gap-2 text-gray-700">
                <input
                  type="checkbox"
                  name="notRobot"
                  checked={formData.notRobot}
                  onChange={handleChange}
                  className="h-4 w-4"
                />
                <span>I am not Robot</span>
              </label>
              {errors.notRobot && (
                <p className="text-red-500 text-xs">{errors.notRobot}</p>
              )}
            </div>

            {/* Submit */}
            <div className="col-span-2 mt-4 flex justify-center">
              <button
                type="submit"
                className="mt-6 bg-[#1CADA3] text-white px-6 py-2 rounded-md hover:bg-[#16948d] transition"
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
