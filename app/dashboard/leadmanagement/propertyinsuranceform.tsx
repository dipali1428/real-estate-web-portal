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
}

function Input({
  label,
  placeholder = "",
  type = "text",
  value,
  onChange,
  error,
}: InputProps) {
  return (
    <div>
      <label className="block font-medium mb-1 text-black">{label}</label>
      <input
        type={type}
        placeholder={placeholder}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="w-full border border-gray-300 rounded-md px-3 py-2 
        focus:outline-none focus:ring-2 focus:ring-red-700"
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
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40">
      <div className="bg-white rounded-xl shadow-xl w-full max-w-4xl mx-4 overflow-y-auto max-h-[90vh]">
        {/* Header */}
        <div className="flex justify-between items-center border-b px-6 py-4">
          <h2 className="text-xl font-semibold text-[#1CADA3]">
            Property Insurance Form
          </h2>
          <button onClick={onClose} className="text-gray-500 hover:text-gray-800">
            <X size={22} />
          </button>
        </div>

        {/* Body */}
        <div className="p-6">
          <form className="grid grid-cols-1 md:grid-cols-2 gap-4" onSubmit={handleSubmit}>
            {/* Text Inputs */}
            <Input
              label="Client Name"
              placeholder="Enter Client Name"
              value={form.name}
              onChange={(v) => updateField("name", v)}
              error={errors.name}
            />

            <Input
              label="Phone Number"
              placeholder="Enter Phone Number"
              value={form.phone}
              onChange={(v) => updateField("phone", v)}
              error={errors.phone}
            />

            <Input
              label="Email ID"
              placeholder="Enter Email"
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
              placeholder="Enter Location"
              value={form.location}
              onChange={(v) => updateField("location", v)}
              error={errors.location}
            />

            {/* Fire Safety Dropdown */}
            <div>
              <label className="block font-medium mb-1">Fire Safety Measures</label>
              <select
                className="w-full border rounded-md p-2"
                value={form.fireSafety}
                onChange={(e) => updateField("fireSafety", e.target.value)}
              >
                <option value="">-- Select --</option>
                <option>Fire Alarm</option>
                <option>Sprinklers</option>
                <option>Extinguishers</option>
              </select>
              {errors.fireSafety && (
                <p className="text-red-500 text-xs">{errors.fireSafety}</p>
              )}
            </div>

            {/* Safety Type */}
            <div>
              <label className="block font-medium mb-1">Safety Type</label>
              <select
                className="w-full border rounded-md p-2"
                value={form.safetyType}
                onChange={(e) => updateField("safetyType", e.target.value)}
              >
                <option value="">-- Select --</option>
                <option>Yes</option>
                <option>No</option>
              </select>
              {errors.safetyType && (
                <p className="text-red-500 text-xs">{errors.safetyType}</p>
              )}
            </div>

            {/* File Upload */}
            <div className="col-span-1">
              <label className="block font-medium mb-1">Copy of Index II</label>
              <input
                type="file"
                onChange={(e) => updateField("file", e.target.files?.[0] || null)}
                className="border rounded-lg p-2 text-sm file:bg-teal-500 file:text-white file:px-4 file:rounded-full"
              />
              {errors.file && <p className="text-red-500 text-xs">{errors.file}</p>}
            </div>

            {/* Companies List */}
            

            {/* Not Robot */}
            <div className="col-span-2 flex items-center gap-2">
              <input
                type="checkbox"
                checked={form.notRobot}
                onChange={(e) => updateField("notRobot", e.target.checked)}
              />
              <span>I am not a Robot</span>
            </div>
            {errors.notRobot && (
              <p className="text-red-500 text-xs">{errors.notRobot}</p>
            )}

            {/* Submit */}
            <div className="col-span-2 mt-4 flex justify-center">
              <button
                type="submit"
                className="bg-[#1CADA3] text-white px-6 py-2 rounded-md hover:bg-[#16948d]"
              >
                Submit
              </button>
            </div>

            {/* Success Message */}
            {successMsg && (
              <p className="col-span-2 text-green-600 text-center mt-3 font-medium">
                {successMsg}
              </p>
            )}
          </form>
        </div>
      </div>
    </div>
  );
}
