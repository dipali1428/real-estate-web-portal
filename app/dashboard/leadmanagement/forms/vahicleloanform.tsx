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
  const [employmentType, setEmploymentType] = useState("");
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

    if (!employmentType)
      newErrors.employmentType = "Please select employment type";

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
    <div className="fixed inset-0 bg-black/40 z-50 flex items-center justify-center p-2 sm:p-4">
      <div className="bg-white rounded-xl shadow-xl w-full max-w-5xl mx-auto h-[95vh] sm:h-[90vh] flex flex-col">
        
        {/* HEADER */}
        <div className="flex items-center justify-between px-4 sm:px-6 py-3 sm:py-4 border-b flex-shrink-0">
          <h2 className="text-lg sm:text-xl font-semibold text-[#1CADA3]">Vehicle Loan Form</h2>
          <button onClick={onClose} className="text-gray-600 hover:text-black">
            <X size={20} className="sm:w-6 sm:h-6" />
          </button>
        </div>

        {/* SCROLLABLE BODY */}
        <div className="flex-1 overflow-y-auto">
          <form className="p-4 sm:p-6" onSubmit={handleSubmit}>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6">

              {/* Basic Fields */}
              <Input 
                label="Client Name" 
                placeholder="Enter client name"
                value={formData.clientName}
                onChange={(v) => setFormData({ ...formData, clientName: v })}
                error={errors.clientName} 
              />

              <Input 
                label="Client Phone Number" 
                maxLength={10}
                placeholder="Enter 10-digit phone number"
                value={formData.phone}
                onChange={(v) => setFormData({ ...formData, phone: v.replace(/\D/g, "") })}
                error={errors.phone} 
              />

              <Input 
                label="Client Email ID" 
                placeholder="Enter email address"
                value={formData.email}
                onChange={(v) => setFormData({ ...formData, email: v })}
                error={errors.email} 
              />

              <DateInput 
                label="Client Date of Birth" 
                value={formData.dob}
                onChange={(v) => setFormData({ ...formData, dob: v })}
                error={errors.dob} 
              />

              <Input 
                label="Location" 
                placeholder="Enter your location"
                value={formData.location}
                onChange={(v) => setFormData({ ...formData, location: v })}
                error={errors.location} 
              />

              <Input 
                label="Loan Amount" 
                placeholder="Enter loan amount"
                value={formData.loanAmount}
                onChange={(v) => setFormData({ ...formData, loanAmount: v })}
                error={errors.loanAmount} 
              />

              <SelectInput 
                label="Type of Vehicle" 
                options={vehicleOptions}
                value={formData.vehicleType}
                onChange={(v) => setFormData({ ...formData, vehicleType: v })}
                error={errors.vehicleType} 
              />

              <Input 
                label="Vehicle Company Name" 
                placeholder="Enter vehicle company"
                value={formData.vehicleCompany}
                onChange={(v) => setFormData({ ...formData, vehicleCompany: v })}
                error={errors.vehicleCompany} 
              />

              <Input 
                label="Vehicle Make & Model" 
                placeholder="Enter vehicle model"
                value={formData.vehicleModel}
                onChange={(v) => setFormData({ ...formData, vehicleModel: v })}
                error={errors.vehicleModel} 
              />

              <Input 
                label="Other Loan Obligation Details"
                placeholder="Enter other loan details"
                value={formData.otherDetails}
                onChange={(v) => setFormData({ ...formData, otherDetails: v })}
                error={errors.otherDetails} 
              />

              {/* Employment Type */}
              <div className="col-span-1 md:col-span-2">
                <label className="text-sm font-semibold text-gray-700">Employment Type</label>
                <select
                  value={employmentType}
                  onChange={(e) => setEmploymentType(e.target.value)}
                  className={`w-full border rounded-md p-2 mt-1 text-sm sm:text-base focus:ring-2 focus:ring-[#1CADA3] focus:border-transparent ${
                    errors.employmentType ? "border-red-500" : "border-gray-300 text-gray-700"
                  }`}
                >
                  <option value="">-- Select Employment Type --</option>
                  <option value="salaried">Salaried Person</option>
                  <option value="selfEmployed">Self Employed</option>
                </select>
                {errors.employmentType && <p className="text-red-500 text-xs mt-1">{errors.employmentType}</p>}
              </div>

              {/* Document Uploads */}
              {employmentType === "salaried" && (
                <div className="col-span-1 md:col-span-2">
                  <h3 className="text-base sm:text-lg font-semibold text-[#1CADA3] mt-4 mb-3 border-b pb-2">
                    Upload Documents for Salaried Person
                  </h3>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    {salariedUploads.map((label, index) => (
                      <div key={index} className="flex flex-col">
                        <label className="text-sm font-medium mb-1 text-gray-700">{label}</label>
                        <input 
                          type="file" 
                          className="w-full border border-gray-300 rounded-md p-2 text-gray-700 text-sm" 
                        />
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {employmentType === "selfEmployed" && (
                <div className="col-span-1 md:col-span-2">
                  <h3 className="text-base sm:text-lg font-semibold text-[#1CADA3] mt-4 mb-3 border-b pb-2">
                    Upload Documents for Self Employed
                  </h3>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    {selfEmployedUploads.map((label, index) => (
                      <div key={index} className="flex flex-col">
                        <label className="text-sm font-medium mb-1 text-gray-700">{label}</label>
                        <input 
                          type="file" 
                          className="w-full border border-gray-300 rounded-md p-2 text-gray-700 text-sm" 
                        />
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Checkbox */}
              <div className="col-span-1 md:col-span-2 flex items-center gap-2 mt-4 text-gray-700">
                <input 
                  type="checkbox" 
                  checked={formData.notRobot}
                  onChange={(e) => setFormData({ ...formData, notRobot: e.target.checked })}
                  className="w-4 h-4" 
                />
                <label className="text-sm sm:text-base">I am not a robot</label>
              </div>
              {errors.notRobot && <p className="col-span-1 md:col-span-2 text-red-500 text-xs mt-1">{errors.notRobot}</p>}

              {/* Submit */}
              <div className="col-span-1 md:col-span-2 mt-4">
                <button className="w-full sm:w-50 bg-gradient-to-r from-[#2076C7] to-[#1CADA3] text-white py-2 rounded-md hover:from-[#1a68b0] hover:to-[#18998f] transition-colors text-sm sm:text-base mx-auto block">
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


/* ============== REUSABLE COMPONENTS ================= */

function Input({ label, value, onChange, error, maxLength, placeholder }:
  { label: string; value: string; onChange: (v: string) => void; error?: string; maxLength?: number; placeholder?: string }) {
  return (
    <div className="w-full">
      <label className="text-sm font-medium text-gray-700">{label}</label>
      <input 
        type="text" 
        value={value} 
        maxLength={maxLength}
        placeholder={placeholder}
        onChange={(e) => onChange(e.target.value)}
        className={`w-full mt-1 p-2 border rounded-md focus:ring-2 focus:ring-[#1CADA3] focus:border-transparent text-gray-700 text-sm sm:text-base ${
          error ? "border-red-500" : "border-gray-300"
        }`} 
      />
      {error && <p className="text-red-600 text-xs mt-1">{error}</p>}
    </div>
  );
}

function DateInput({ label, value, onChange, error }:
  { label: string; value: string; onChange: (v: string) => void; error?: string }) {
  return (
    <div className="w-full">
      <label className="text-sm font-medium text-gray-700">{label}</label>
      <input 
        type="date" 
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className={`w-full mt-1 p-2 border rounded-md focus:ring-2 focus:ring-[#1CADA3] focus:border-transparent text-gray-700 text-sm sm:text-base ${
          error ? "border-red-500" : "border-gray-300"
        }`} 
      />
      {error && <p className="text-red-600 text-xs mt-1">{error}</p>}
    </div>
  );
}

function SelectInput({ label, options, value, onChange, error }:
  { label: string; options: string[]; value: string; onChange: (v: string) => void; error?: string }) {
  return (
    <div className="w-full">
      <label className="text-sm font-medium text-gray-700">{label}</label>
      <select 
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className={`w-full mt-1 p-2 border rounded-md focus:ring-2 focus:ring-[#1CADA3] focus:border-transparent text-sm sm:text-base ${
          error ? "border-red-500" : "border-gray-300 text-gray-700"
        }`}
      >
        <option value="">Select {label}</option>
        {options.map((opt) => (
          <option key={opt} value={opt}>{opt}</option>
        ))}
      </select>
      {error && <p className="text-red-600 text-xs mt-1">{error}</p>}
    </div>
  );
}