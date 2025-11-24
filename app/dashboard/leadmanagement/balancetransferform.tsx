"use client";

import { useState } from "react";
import { X } from "lucide-react";

export default function BalanceTransferForm({ onClose }: { onClose: () => void }) {
  const [formData, setFormData] = useState({
    clientName: "",
    phone: "",
    email: "",
    dob: "",
    location: "",
    loanAmount: "",
    otherDetails: "",
    employmentType: "",
    notRobot: false,
  });

  const [errors, setErrors] = useState<any>({});

  /* ---------------- HANDLE CHANGE ---------------- */
  const handleChange = (field: string, value: any) => {
    setFormData({ ...formData, [field]: value });

    setErrors({ ...errors, [field]: "" }); // remove error when typing
  };

  /* ---------------- VALIDATION ---------------- */
  const validateForm = () => {
    const newErrors: any = {};

    Object.entries(formData).forEach(([key, val]) => {
      if (!val && key !== "otherDetails") newErrors[key] = "This field is required";
    });

    if (formData.phone && formData.phone.length !== 10) {
      newErrors.phone = "Phone number must be 10 digits";
    }

    return newErrors;
  };

  /* ---------------- HANDLE SUBMIT ---------------- */
  const handleSubmit = (e: any) => {
    e.preventDefault();
    const validationErrors = validateForm();

    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      alert("❌ Please fill all required fields correctly");
      return;
    }

    alert("🎉 Form Submitted Successfully!");
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40">
      <div className="bg-white rounded-xl shadow-xl w-full max-w-4xl mx-4 overflow-y-auto max-h-[90vh] text-gray-700">

        {/* Header */}
        <div className="flex justify-between items-center border-b px-6 py-4">
          <h2 className="text-xl font-semibold text-[#1CADA3]">Balance Transfer Form</h2>
          <button onClick={onClose} className="text-gray-500 hover:text-gray-800">
            <X size={22} />
          </button>
        </div>

        {/* Form Body */}
        <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-4 p-6">

          <Input label="Client Name" value={formData.clientName} error={errors.clientName}
            onChange={(v: any) => handleChange("clientName", v)} />

          <Input label="Phone Number" value={formData.phone} maxLength={10}
            type="tel"
            error={errors.phone}
            onChange={(v: string) => {
              if (/^\d*$/.test(v)) handleChange("phone", v); // only numbers
            }}
          />

          <Input label="Email ID" value={formData.email} error={errors.email}
            onChange={(v: any) => handleChange("email", v)} />

          <Input label="Date of Birth" type="date" value={formData.dob} error={errors.dob}
            onChange={(v: any) => handleChange("dob", v)} />

          <Input label="Location" value={formData.location} error={errors.location}
            onChange={(v: any) => handleChange("location", v)} />

          <Input label="Loan Amount" value={formData.loanAmount} error={errors.loanAmount}
            onChange={(v: any) => handleChange("loanAmount", v)} />

          <Input label="Other Loan Details" value={formData.otherDetails}
            onChange={(v: any) => handleChange("otherDetails", v)} />

          {/* Employment Type */}
          <div>
            <label className="block text-sm font-medium ">Employment Type</label>
            <select
              value={formData.employmentType}
              onChange={(e) => handleChange("employmentType", e.target.value)}
              className="border border-gray-300 rounded-lg p-2 w-full focus:ring-2 focus:ring-[#1CADA3]"
            >
              <option value="">-- Select Employment Type --</option>
              <option value="salaried">Salaried Person</option>
              <option value="selfEmployed">Self Employed</option>
            </select>
            {errors.employmentType && <p className="text-red-500 text-sm">{errors.employmentType}</p>}
          </div>

          {/* Document Sections */}
          {formData.employmentType === "salaried" && <SalariedDocs />}
          {formData.employmentType === "selfEmployed" && <SelfEmployedDocs />}

          {/* Not Robot */}
          <div className="col-span-2 flex items-center gap-2 mt-4">
            <input type="checkbox" checked={formData.notRobot}
              onChange={(e) => handleChange("notRobot", e.target.checked)}
              className="w-4 h-4" />
            <label className="text-sm text-gray-700">I am not a robot</label>
          </div>

          {/* Submit */}
          <div className="col-span-2 mt-4 flex justify-center">
            <button type="submit"
              className="w-40 bg-linear-to-r from-[#2076C7] to-[#1CADA3] text-white py-2 rounded-md shadow hover:opacity-90"
            >
              Submit
            </button>
          </div>

        </form>

      </div>
    </div>
  );
}

/* ---------------- INPUT COMPONENT ---------------- */
function Input({ label, value, onChange, type = "text", placeholder, maxLength, error }: any) {
  return (
    <div>
      <label className="block text-sm font-medium mb-1">{label}</label>
      <input
        type={type}
        placeholder={placeholder}
        value={value}
        maxLength={maxLength}
        onChange={(e) => onChange(e.target.value)}
        className="w-full border border-gray-300 rounded-md p-2 focus:ring-2 focus:ring-[#1CADA3]"
      />
      {error && <p className="text-red-500 text-sm">{error}</p>}
    </div>
  );
}

/* ---------------- FILE UPLOAD ---------------- */
function FileUpload({ label }: { label: string }) {
  return (
    <div>
      <label className="block text-sm font-medium mb-1">{label}</label>
      <input type="file"
        className="border rounded-lg p-2 text-sm file:mr-3 file:py-2 file:px-4 
        file:rounded-full file:border-0 file:bg-[#1CADA3] file:text-white hover:file:bg-[#178d84]"
      />
    </div>
  );
}

/* ---------------- DOC SECTION ---------------- */
function Section({ title, children }: any) {
  return (
    <div className="col-span-2 mt-6">
      <h3 className="text-md font-semibold mb-3 text-[#1CADA3]">{title}</h3>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">{children}</div>
    </div>
  );
}

/* ---------------- SALARIED DOCS ---------------- */
function SalariedDocs() {
  const docs = [
    "Aadhar Card", "Pan Card", "3 Months Salary Slip", "2 Years Form 16",
    "6 Months Banking Statement", "Address Proof", "Photograph",
    "Existing Loan Statement / Index II", "Property Cost Sheet",
    "Own Contribution Proof", "List Of Document",
    "Loan Outstanding Letter", "Loan Account Statement / Loan Track Record",
  ];
  return <Section title="Upload Documents for Salaried Person">
    {docs.map((d) => <FileUpload key={d} label={d} />)}
  </Section>;
}

/* ---------------- SELF EMPLOYED DOCS ---------------- */
function SelfEmployedDocs() {
  const docs = [
    "Aadhar Card", "Pan Card", "Udyam Registration", "Shop Act Licence",
    "1 current Banking Statement", "Saving Bank Account", "Address Proof",
    "3 Years ITR", "GST Certificate", "Last 12 Months GST Returns", "Photograph",
    "Existing Loan Statement / Index II", "Property Cost Sheet",
    "Own Contribution Proof", "List Of Document",
    "Loan Outstanding Letter", "Loan Account Statement / Loan Track Record",
  ];
  return <Section title="Upload Documents for Self Employed Person">
    {docs.map((d) => <FileUpload key={d} label={d} />)}
  </Section>;
}
