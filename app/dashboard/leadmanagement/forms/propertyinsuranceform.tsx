"use client";

import { useState } from "react";
import { X } from "lucide-react";

// ----------------------
// Input Component
// ----------------------
interface InputProps {
  label: string;
  placeholder?: string;
  type?: string;
  value: string;
  onChange: (value: string) => void;
  error?: string;
  maxLength?: number;
}

function Input({
  label,
  placeholder = "",
  type = "text",
  value,
  onChange,
  error,
  maxLength,
}: InputProps) {
  return (
    <div className="w-full">
      <label className="block font-medium mb-1 text-gray-700 text-sm sm:text-base">{label}</label>
      <input
        type={type}
        placeholder={placeholder}
        value={value}
        maxLength={maxLength}
        onChange={(e) => onChange(e.target.value)}
        className="w-full border border-gray-300 rounded-md p-2 bg-white text-gray-700 text-sm sm:text-base focus:ring-2 focus:ring-[#1CADA3] focus:border-transparent"
      />
      {error && <p className="text-red-500 text-xs mt-1">{error}</p>}
    </div>
  );
}

// ----------------------
// Main Component
// ----------------------
interface PropertyInsuranceFormProps {
  onClose: () => void;
}

export default function PropertyInsuranceForm({
  onClose,
}: PropertyInsuranceFormProps) {
  const [form, setForm] = useState({
    name: "",
    phone: "",
    email: "",
    dob: "",
    location: "",
    fireSafety: "",
    safetyType: "",
    file: null as File | null,
    companies: [] as string[],
    notRobot: false,
  });

  const [errors, setErrors] = useState<{ [key: string]: string }>({});
  const [successMsg, setSuccessMsg] = useState("");

  const companiesList = [
    "Bajaj Allianz General Insurance Company",
    "TATA AIG General Insurance",
    "ICICI Lombard General Insurance Company Limited",
    "Digit Insurance",
  ];

  // ----------------------
  // Handle Change
  // ----------------------
  const updateField = (key: string, value: any) => {
    setForm({ ...form, [key]: value });
    setErrors({ ...errors, [key]: "" });
  };

  const toggleCompany = (name: string) => {
    const updated = form.companies.includes(name)
      ? form.companies.filter((c) => c !== name)
      : [...form.companies, name];

    updateField("companies", updated);
  };

  // ----------------------
  // Validation
  // ----------------------
  const validateForm = () => {
    const newErrors: any = {};

    if (!form.name) newErrors.name = "Client name is required";
    if (!form.phone) newErrors.phone = "Phone number is required";
    if (!/^[0-9]{10}$/.test(form.phone))
      newErrors.phone = "Phone number must be 10 digits";
    if (!form.email) newErrors.email = "Email is required";
    if (!form.dob) newErrors.dob = "Date of birth is required";
    if (!form.location) newErrors.location = "Location is required";
    if (!form.fireSafety) newErrors.fireSafety = "Fire Safety selection required";
    if (!form.safetyType) newErrors.safetyType = "Safety type required";

    if (!form.file) newErrors.file = "File upload required";

    if (form.companies.length === 0)
      newErrors.companies = "Select at least one company";

    if (!form.notRobot) newErrors.notRobot = "Please confirm you're not a robot";

    setErrors(newErrors);

    return Object.keys(newErrors).length === 0;
  };

  // ----------------------
  // Submit
  // ----------------------
  const handleSubmit = (e: any) => {
    e.preventDefault();

    if (validateForm()) {
      setSuccessMsg("Form submitted successfully! 🎉");
    } else {
      setSuccessMsg("");
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 p-2 sm:p-4">
      <div className="bg-white rounded-xl shadow-xl w-full max-w-4xl mx-auto h-[95vh] sm:h-[90vh] flex flex-col">
        
        {/* Header */}
        <div className="flex justify-between items-center border-b px-4 sm:px-6 py-3 sm:py-4 flex-shrink-0">
          <h2 className="text-lg sm:text-xl font-semibold text-[#1CADA3]">
            Property Insurance Form
          </h2>
          <button onClick={onClose} className="text-gray-500 hover:text-gray-800">
            <X size={20} className="sm:w-6 sm:h-6" />
          </button>
        </div>

        {/* Scrollable Body */}
        <div className="flex-1 overflow-y-auto">
          <form className="p-4 sm:p-6" onSubmit={handleSubmit}>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6">
              
              {/* Text Inputs */}
              <Input
                label="Client Name"
                placeholder="Enter client name"
                value={form.name}
                onChange={(v) => updateField("name", v)}
                error={errors.name}
              />

              <Input
                label="Phone Number"
                placeholder="Enter 10-digit phone number"
                value={form.phone}
                maxLength={10}
                onChange={(v) => {
                  // Allow only numbers and maximum 10 digits
                  if (/^\d{0,10}$/.test(v)) {
                    updateField("phone", v);
                  }
                }}
                error={errors.phone}
              />

              <Input
                label="Email ID"
                placeholder="Enter email address"
                value={form.email}
                onChange={(v) => updateField("email", v)}
                error={errors.email}
              />

              <Input
                label="Date of Birth"
                type="date"
                value={form.dob}
                onChange={(v) => updateField("dob", v)}
                error={errors.dob}
              />

              <Input
                label="Location"
                placeholder="Enter your location"
                value={form.location}
                onChange={(v) => updateField("location", v)}
                error={errors.location}
              />

              {/* Fire Safety Dropdown */}
              <div className="w-full">
                <label className="block font-medium mb-1 text-gray-700 text-sm sm:text-base">Fire Safety Measures</label>
                <select
                  className="w-full border border-gray-300 rounded-md p-2 bg-white text-gray-700 text-sm sm:text-base focus:ring-2 focus:ring-[#1CADA3] focus:border-transparent"
                  value={form.fireSafety}
                  onChange={(e) => updateField("fireSafety", e.target.value)}
                >
                  <option value="">-- Select --</option>
                  <option>Yes</option>
                  <option>No</option>
                </select>
                {errors.fireSafety && (
                  <p className="text-red-500 text-xs mt-1">{errors.fireSafety}</p>
                )}
              </div>

              {/* Safety Type */}
              <div className="w-full">
                <label className="block font-medium mb-1 text-gray-700 text-sm sm:text-base">Safety Type</label>
                <select
                  className="w-full border border-gray-300 rounded-md p-2 bg-white text-gray-700 text-sm sm:text-base focus:ring-2 focus:ring-[#1CADA3] focus:border-transparent"
                  value={form.safetyType}
                  onChange={(e) => updateField("safetyType", e.target.value)}
                >
                  <option value="">-- Select --</option>
                  <option>Fire Extinguishers</option>
                  <option>Smoke Alarm</option>
                  <option>Sprinkler System</option>
                  <option>Fire Hydrant</option>
                </select>
                {errors.safetyType && (
                  <p className="text-red-500 text-xs mt-1">{errors.safetyType}</p>
                )}
              </div>

              {/* File Upload */}
              <div className="col-span-1 md:col-span-2">
                <div className="flex flex-col w-full">
                  <label className="text-sm font-medium mb-1 text-gray-700">Copy of Index II</label>
                  <input 
                    type="file" 
                    onChange={(e) => updateField("file", e.target.files?.[0] || null)}
                    className="w-full border border-gray-300 rounded-md p-2 bg-white text-gray-700 text-sm" 
                  />
                  {errors.file && <p className="text-red-500 text-xs mt-1">{errors.file}</p>}
                </div>
              </div>

              {/* Companies List */}
              <div className="col-span-1 md:col-span-2">
                <label className="block font-medium mb-2 text-gray-700 text-sm sm:text-base">Insurance Companies</label>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {companiesList.map((company) => (
                    <label key={company} className="flex items-center gap-2 text-gray-700 text-sm sm:text-base">
                      <input
                        type="checkbox"
                        checked={form.companies.includes(company)}
                        onChange={() => toggleCompany(company)}
                        className="w-4 h-4"
                      />
                      <span>{company}</span>
                    </label>
                  ))}
                </div>
                {errors.companies && (
                  <p className="text-red-500 text-xs mt-1">{errors.companies}</p>
                )}
              </div>

              {/* Not Robot */}
              <div className="col-span-1 md:col-span-2 flex items-center gap-2 text-gray-700 mt-4">
                <input
                  type="checkbox"
                  checked={form.notRobot}
                  onChange={(e) => updateField("notRobot", e.target.checked)}
                  className="w-4 h-4"
                />
                <span className="text-sm sm:text-base">I am not a Robot</span>
              </div>
              {errors.notRobot && (
                <p className="col-span-1 md:col-span-2 text-red-500 text-xs mt-1">{errors.notRobot}</p>
              )}

              {/* Submit */}
              <div className="col-span-1 md:col-span-2 mt-4 flex justify-center">
                <button
                  type="submit"
                  className="w-full sm:w-50 bg-gradient-to-r from-[#2076C7] to-[#1CADA3] text-white py-2 rounded-md hover:from-[#1a68b0] hover:to-[#18998f] transition-colors text-sm sm:text-base"
                >
                  Submit
                </button>
              </div>

              {/* Success Message */}
              {successMsg && (
                <p className="col-span-1 md:col-span-2 text-green-600 text-center mt-3 font-medium text-sm sm:text-base">
                  {successMsg}
                </p>
              )}
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}