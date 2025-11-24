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
  courseName: string;
  institutionName: string;
  countryName: string;
  otherDetails: string;
  notRobot: boolean;
}

export default function EducationLoanForm({ onClose }: { onClose: () => void }) {
  const [employmentType, setEmploymentType] = useState<string>("");

  const [formData, setFormData] = useState<FormDataType>({
    clientName: "",
    phone: "",
    email: "",
    dob: "",
    location: "",
    loanAmount: "",
    courseName: "",
    institutionName: "",
    countryName: "",
    otherDetails: "",
    notRobot: false,
  });

  const [errors, setErrors] = useState<{ [key: string]: string }>({});

  // Submit Handler
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const newErrors: { [key: string]: string } = {};

    Object.entries(formData).forEach(([key, value]) => {
      if (!value && key !== "otherDetails" && key !== "notRobot")
        newErrors[key] = "This field is required";
    });

    if (formData.phone.length < 10)
      newErrors.phone = "Phone number must be 10 digits";

    if (!employmentType)
      newErrors.employmentType = "Please select employment type";

    if (!formData.notRobot)
      newErrors.notRobot = "Please confirm";

    setErrors(newErrors);

    if (Object.keys(newErrors).length === 0) {
      alert("Form Submitted Successfully!");
      console.log(formData);
    }
  };

  // Upload Labels
  const studentdocuments =[
    "Student KYC (Aadhar card, Pan card, passport, driving license)",
    "Resident proof (light bill)",
    "Current address proof (Rent agreement)",
    "Academic documents",
    "Offer letter",
    "Fee structure",
    "Visa, I20 (USA)","Entrance exam score card","Experience letter etc",
  ];

  const salariedUploads = [
   "Aadhar card", "Pan card", "Driving License"," passport",
   "Permeant Address Proof (Light bill, Property tax bill)", "Current Address Proof (Rent Agreement)",
   "3 Months Salary Slip", "Latest 6 Months Bank Statement", "Form 16", "Latest 2 Years ITR",
  ];

  const selfEmployedUploads = [
    "Aadhar card", "Pan card", "Driving License"," passport",
    "Permeant Address Proof (Light bill, Property tax bill)", "Current Address Proof (Rent Agreement)",
    "Latest 6months bank statements", "GST Certificate", "Udyog aadhar certificate", "Latest ITR 3 years","Shop act", "TDS certificate","Qualification certificate as per self-employee professionals (Doctor, Architecture, Bpharm etc",
  ];

  const retiredUploads =[
    "Aadhar card", "Pan card", "Driving License"," Passport",
    "Permeant Address Proof (Light bill, Property tax bill)", "Current Address Proof (Rent Agreement)",
    "Latest 6months bank statements", "2years ITR","Pension slips or a pension certificate",
  ];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40">
      <div className="bg-white rounded-xl shadow-xl w-full max-w-4xl mx-4 overflow-y-auto max-h-[90vh]">

        {/* Header */}
        <div className="flex justify-between items-center border-b px-6 py-4">
          <h2 className="text-xl font-semibold text-[#1CADA3]">Education Loan Form</h2>
          <button onClick={onClose} className="text-gray-500 hover:text-gray-800">
            <X size={22} />
          </button>
        </div>

        {/* Body */}
        <div className="p-6 max-h-[80vh] overflow-y-auto">
          <form className="grid grid-cols-1 md:grid-cols-2 gap-4" onSubmit={handleSubmit}>

            <Input label="Client Name" value={formData.clientName}
              onChange={(v) => setFormData({ ...formData, clientName: v })} error={errors.clientName} />

            <Input label="Client Phone Number" maxLength={10}
              value={formData.phone}
              onChange={(v) => setFormData({ ...formData, phone: v.replace(/\D/g, "") })}
              error={errors.phone}
            />

            <Input label="Client Email ID" value={formData.email}
              onChange={(v) => setFormData({ ...formData, email: v })} error={errors.email} />

            <DateInput label="Client Date of Birth" value={formData.dob}
              onChange={(v) => setFormData({ ...formData, dob: v })} error={errors.dob} />

            <Input label="Location" value={formData.location}
              onChange={(v) => setFormData({ ...formData, location: v })} error={errors.location} />

            <Input label="Loan Amount" value={formData.loanAmount}
              onChange={(v) => setFormData({ ...formData, loanAmount: v })} error={errors.loanAmount} />

            <Input label="Course Name" value={formData.courseName}
              onChange={(v) => setFormData({ ...formData, courseName: v })} error={errors.courseName} />

            <Input label="Institution Name" value={formData.institutionName}
              onChange={(v) => setFormData({ ...formData, institutionName: v })} error={errors.institutionName} />

            <Input label="Country Name" value={formData.countryName}
              onChange={(v) => setFormData({ ...formData, countryName: v })} error={errors.countryName} />

            <Input label="Other Loan Obligation Details" value={formData.otherDetails}
              onChange={(v) => setFormData({ ...formData, otherDetails: v })} error={errors.otherDetails} />
              {/*Student Documents */}
                <>
                <div className="col-span-2">
                  <h3 className="text-lg font-semibold text-gray-700 mt-4 mb-2">Student Documents</h3>
                </div>
                {studentdocuments.map((label, i) => (
                  <FileUpload key={i} label={label} />
                ))}
              </>
            {/* Employment Type */}
            <div className="col-span-2">
              <label className="font-medium text-sm">Employment Type</label>
              <select
                value={employmentType}
                onChange={(e) => setEmploymentType(e.target.value)}
                className={`border rounded-lg p-2 w-80 mt-1 ${errors.employmentType ? "border-red-500" : "border-gray-300"}`}
              >
                <option value="">-- Select Employment Type --</option>
                <option value="salaried">Salaried Person</option>
                <option value="selfEmployed">Self Employed</option>
                <option value="retired">Retired</option>
              </select>
              {errors.employmentType && <p className="text-red-500 text-xs mt-1">{errors.employmentType}</p>}
            </div>

            {/* File Upload Show */}
            {employmentType === "salaried" && (
              <>
                <div className="col-span-2">
                  <h3 className="text-lg font-semibold text-gray-700 mt-4 mb-2">Upload Documents for Salaried Person</h3>
                </div>
                {salariedUploads.map((label, i) => (
                  <FileUpload key={i} label={label} />
                ))}
              </>
            )}

            {employmentType === "selfEmployed" && (
              <>
                <div className="col-span-2">
                  <h3 className="text-lg font-semibold text-gray-700 mt-4 mb-2">Upload Documents for Self Employed</h3>
                </div>
                {selfEmployedUploads.map((label, i) => (
                  <FileUpload key={i} label={label} />
                ))}
              </>
            )}

            {employmentType === "retired" && (
              <>
                <div className="col-span-2">
                  <h3 className="text-lg font-semibold text-gray-700 mt-4 mb-2">Upload Documents for Retired</h3>
                </div>
                {retiredUploads.map((label, i) => (
                  <FileUpload key={i} label={label} />
                ))}
              </>
            )}

            {/* Checkbox */}
            <div className="col-span-2 flex items-center gap-2 mt-4">
              <input type="checkbox" checked={formData.notRobot}
                onChange={(e) => setFormData({ ...formData, notRobot: e.target.checked })} />
              <label>I am not a robot</label>
            </div>
            {errors.notRobot && <p className="text-red-600 text-sm">{errors.notRobot}</p>}

            {/* Submit Btn */}
            <div className="col-span-2 flex justify-center mt-4">
              <button type="submit" className="w-50 bg-linear-to-r from-[#2076C7] to-[#1CADA3] text-white py-2 rounded-md hover:opacity-90">
                Submit
              </button>
            </div>

          </form>
        </div>
      </div>
    </div>
  );
}

/* ================= COMPONENTS ================= */

interface InputProps {
  label: string;
  value: string;
  onChange: (value: string) => void;
  error?: string;
  maxLength?: number;
}

function Input({ label, value, onChange, error, maxLength }: InputProps) {
  return (
    <div>
      <label className="text-sm font-medium">{label}</label>
      <input
        type="text"
        maxLength={maxLength}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="border border-gray-300 rounded-md p-2 w-full"
      />
      {error && <p className="text-red-600 text-xs">{error}</p>}
    </div>
  );
}

interface DateInputProps {
  label: string;
  value: string;
  onChange: (value: string) => void;
  error?: string;
}

function DateInput({ label, value, onChange, error }: DateInputProps) {
  return (
    <div>
      <label className="text-sm font-medium">{label}</label>
      <input
        type="date"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="border border-gray-300 rounded-md p-2 w-full"
      />
      {error && <p className="text-red-600 text-xs">{error}</p>}
    </div>
  );
}

interface FileUploadProps {
  label: string;
}

function FileUpload({ label }: FileUploadProps) {
  return (
    <div className="flex flex-col">
      <label className="text-sm font-medium mb-1">{label}</label>
      <input type="file" className="border rounded-lg p-2" />
    </div>
  );
}
