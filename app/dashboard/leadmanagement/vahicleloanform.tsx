"use client";

import { useState } from "react";
import { X } from "lucide-react";

interface FormDataType {
  clientName: string;
  phone: string;
  email: string;
  dob: string;
  location: string;
  loanAmount: string;
  vehicleType: string;
  vehicleCompany: string;
  vehicleModel: string;
  otherDetails: string;
  notRobot: boolean;
}

export default function VehicleLoanForm({ onClose }: { onClose: () => void }) {
  const [formData, setFormData] = useState<FormDataType>({
    clientName: "",
    phone: "",
    email: "",
    dob: "",
    location: "",
    loanAmount: "",
    vehicleType: "",
    vehicleCompany: "",
    vehicleModel: "",
    otherDetails: "",
    notRobot: false,
  });

  const [errors, setErrors] = useState<{ [key: string]: string }>({});

  // Handle form submit
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const newErrors: { [key: string]: string } = {};

    Object.entries(formData).forEach(([key, value]) => {
      if (!value && key !== "otherDetails" && key !== "notRobot") {
        newErrors[key] = "This field is required";
      }
    });

    if (formData.phone.length !== 10)
      newErrors.phone = "Phone number must be 10 digits";

    if (!formData.notRobot)
      newErrors.notRobot = "Please confirm you are not a robot";

    setErrors(newErrors);

    if (Object.keys(newErrors).length === 0) {
      alert("Form Submitted Successfully!");
      console.log("Form Data:", formData);
    }
  };

  const vehicleOptions = ["Two Wheeler", "Four Wheeler", "Commercial Vehicle"];
   
  const salariedUploads = [
  "PAN Card",
  "Aadhar Card",
  "3 Months Salary Slip",
  "6 Months Bank Statement",
  "Company ID Card",
  "Form 16 (if available)",
];

const selfEmployedUploads = [
  "PAN Card",
  "Aadhar Card",
  "Business Registration Proof",
  "Last 2 Years ITR",
  "6 Months Bank Statement",
  "Business Office Address Proof",
];

  return (
    <div className="fixed inset-0 bg-black/40 z-50 flex items-center justify-center">
      <div className="bg-white rounded-xl shadow-xl w-full max-w-5xl mx-4 max-h-[90vh] overflow-y-auto">
        
        {/* HEADER */}
        <div className="flex items-center justify-between px-6 py-4 border-b">
          <h2 className="text-xl font-semibold text-[#1CADA3]">Vehicle Loan Form</h2>
          <button onClick={onClose} className="text-gray-600 hover:text-black">
            <X size={22} />
          </button>
        </div>

        {/* BODY */}
        <div className="p-6">
          <form className="grid grid-cols-1 md:grid-cols-2 gap-4" onSubmit={handleSubmit}>

            {/* Basic Fields */}
            <Input label="Client Name" value={formData.clientName}
              onChange={(v) => setFormData({ ...formData, clientName: v })}
              error={errors.clientName} />

            <Input label="Client Phone Number" maxLength={10}
              value={formData.phone}
              onChange={(v) => setFormData({ ...formData, phone: v.replace(/\D/g, "") })}
              error={errors.phone} />

            <Input label="Client Email ID" value={formData.email}
              onChange={(v) => setFormData({ ...formData, email: v })}
              error={errors.email} />

            <DateInput label="Client Date of Birth" value={formData.dob}
              onChange={(v) => setFormData({ ...formData, dob: v })}
              error={errors.dob} />

            <Input label="Location" value={formData.location}
              onChange={(v) => setFormData({ ...formData, location: v })}
              error={errors.location} />

            <Input label="Loan Amount" value={formData.loanAmount}
              onChange={(v) => setFormData({ ...formData, loanAmount: v })}
              error={errors.loanAmount} />

            <SelectInput label="Type of Vehicle" options={vehicleOptions}
              value={formData.vehicleType}
              onChange={(v) => setFormData({ ...formData, vehicleType: v })}
              error={errors.vehicleType} />

            <Input label="Vehicle Company Name" value={formData.vehicleCompany}
              onChange={(v) => setFormData({ ...formData, vehicleCompany: v })}
              error={errors.vehicleCompany} />

            <Input label="Vehicle Make & Model" value={formData.vehicleModel}
              onChange={(v) => setFormData({ ...formData, vehicleModel: v })}
              error={errors.vehicleModel} />

            <Input label="Other Loan Obligation Details"
              value={formData.otherDetails}
              onChange={(v) => setFormData({ ...formData, otherDetails: v })}
              error={errors.otherDetails} />

            {/* Checkbox */}
            <div className="col-span-2 flex items-center gap-2 mt-3 text-gray-700">
              <input type="checkbox" checked={formData.notRobot}
                onChange={(e) => setFormData({ ...formData, notRobot: e.target.checked })}
                className="w-4 h-4" />
              <label className="text-sm">I am not a robot</label>
            </div>
            {errors.notRobot && <p className="text-red-500 text-xs col-span-2 -mt-2">{errors.notRobot}</p>}

            {/* Submit */}
            <div className="col-span-2 mt-4">
              <button className="w-full bg-[#1CADA3] text-white py-2 rounded-md hover:bg-[#15958b]">
                Submit
              </button>
            </div>

          </form>
        </div>
      </div>
    </div>
  );
}


/* ============== REUSABLE COMPONENTS ================= */

function Input({ label, value, onChange, error, maxLength }:
  { label: string; value: string; onChange: (v: string) => void; error?: string; maxLength?: number }) {
  return (
    <div>
      <label className="text-sm font-medium text-gray-700">{label}</label>
      <input type="text" value={value} maxLength={maxLength}
        onChange={(e) => onChange(e.target.value)}
        className={`w-full mt-1 p-2 border rounded-md focus:ring-2 text-gray-700
        ${error ? "border-red-500" : "border-gray-300"}`} />
      {error && <p className="text-red-600 text-xs mt-1">{error}</p>}
    </div>
  );
}

function DateInput({ label, value, onChange, error }:
  { label: string; value: string; onChange: (v: string) => void; error?: string }) {
  return (
    <div>
      <label className="text-sm font-medium text-gray-700">{label}</label>
      <input type="date" value={value}
        onChange={(e) => onChange(e.target.value)}
        className={`w-full mt-1 p-2 border rounded-md focus:ring-2 text-gray-700
        ${error ? "border-red-500" : "border-gray-300"}`} />
      {error && <p className="text-red-600 text-xs mt-1">{error}</p>}
    </div>
  );
}

function SelectInput({ label, options, value, onChange, error }:
  { label: string; options: string[]; value: string; onChange: (v: string) => void; error?: string }) {
  return (
    <div>
      <label className="text-sm font-medium text-gray-700">{label}</label>
      <select value={value}
        onChange={(e) => onChange(e.target.value)}
        className={`w-full mt-1 p-2 border rounded-md ${error ? "border-red-500" : "border-gray-300 text-gray-700"}`}>
        <option value="">Select {label}</option>
        {options.map((opt) => (
          <option key={opt} value={opt}>{opt}</option>
        ))}
      </select>
      {error && <p className="text-red-600 text-xs mt-1">{error}</p>}
    </div>
  );
}
