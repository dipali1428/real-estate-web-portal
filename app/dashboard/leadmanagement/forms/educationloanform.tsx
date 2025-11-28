"use client";
import { useState } from "react";
import { X } from "lucide-react";

export default function EducationLoanForm({ onClose }: { onClose: () => void }) {
  const [employmentType, setEmploymentType] = useState("");

  const [formData, setFormData] = useState({
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

  const [error, setError] = useState(false);
  const [success, setSuccess] = useState(false);

  // Update form values - matching Personal Loan behavior
  const handleChange = (key: string, value: string | boolean) => {
    setFormData({ ...formData, [key]: value });
  };

  // Validate before submit - matching Personal Loan behavior
  const submitForm = (e: any) => {
    e.preventDefault();
    setError(false);
    setSuccess(false);

    // Check all required fields including the dropdown
    const requiredFields = [
      formData.clientName,
      formData.phone,
      formData.email,
      formData.dob,
      formData.location,
      formData.loanAmount,
      formData.courseName,
      formData.institutionName,
      formData.countryName,
      formData.notRobot,
      employmentType,
    ];

    for (const field of requiredFields) {
      if (!field) {
        setError(true);
        return;
      }
    }

    // Validate phone number length
    if (formData.phone.length !== 10) {
      setError(true);
      return;
    }

    // If all good
    setSuccess(true);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 p-2 sm:p-4">
      <div className="bg-white rounded-xl shadow-xl w-full max-w-4xl mx-auto h-[95vh] sm:h-[90vh] flex flex-col">
        
        {/* Header - Matching Personal Loan design */}
        <div className="flex justify-between items-center border-b px-4 sm:px-6 py-3 sm:py-4 flex-shrink-0">
          <h2 className="text-lg sm:text-xl font-semibold text-[#1CADA3]">Education Loan Form</h2>
          <button onClick={onClose} className="text-gray-600 hover:text-gray-800">
            <X size={20} className="sm:w-6 sm:h-6" />
          </button>
        </div>

        {/* Scrollable Form Body - Matching Personal Loan structure */}
        <div className="flex-1 overflow-y-auto">
          <form onSubmit={submitForm} className="p-4 sm:p-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6">

              <Input 
                label="Client Name"
                placeholder="Enter your full name"
                value={formData.clientName}
                onChange={(e: any) => handleChange("clientName", e.target.value)}
              />

              <Input
                label="Phone Number"
                type="tel"
                maxLength={10}
                onlyNumber
                placeholder="Enter 10-digit mobile number"
                value={formData.phone}
                onChange={(e: any) => handleChange("phone", e.target.value)}
              />

              <Input 
                label="Email ID"
                type="email"
                placeholder="Enter your email address"
                value={formData.email}
                onChange={(e: any) => handleChange("email", e.target.value)}
              />

              <Input 
                label="Date of Birth"
                type="date"
                value={formData.dob}
                onChange={(e: any) => handleChange("dob", e.target.value)}
              />

              <Input 
                label="Location"
                placeholder="Enter your city"
                value={formData.location}
                onChange={(e: any) => handleChange("location", e.target.value)}
              />

              <Input 
                label="Loan Amount"
                placeholder="Enter desired loan amount"
                onlyNumber
                value={formData.loanAmount}
                onChange={(e: any) => handleChange("loanAmount", e.target.value)}
              />

              <Input 
                label="Course Name"
                placeholder="Enter course name"
                value={formData.courseName}
                onChange={(e: any) => handleChange("courseName", e.target.value)}
              />

              <Input 
                label="Institution Name"
                placeholder="Enter institution name"
                value={formData.institutionName}
                onChange={(e: any) => handleChange("institutionName", e.target.value)}
              />

              <Input 
                label="Country Name"
                placeholder="Enter country name"
                value={formData.countryName}
                onChange={(e: any) => handleChange("countryName", e.target.value)}
              />

              <Input 
                label="Other Loan Obligation Details"
                placeholder="Enter existing loan details"
                value={formData.otherDetails}
                onChange={(e: any) => handleChange("otherDetails", e.target.value)}
              />

              {/* Student Documents Section */}
              <div className="col-span-1 md:col-span-2">
                <Section title="Student Documents">
                  {[
                    "Student KYC (Aadhar card, Pan card, passport, driving license)",
                    "Resident proof (light bill)",
                    "Current address proof (Rent agreement)",
                    "Academic documents",
                    "Offer letter",
                    "Fee structure",
                    "Visa, I20 (USA)",
                    "Entrance exam score card",
                    "Experience letter etc",
                  ].map((doc) => (
                    <FileUpload key={doc} label={doc} />
                  ))}
                </Section>
              </div>

              {/* Employment Type - Updated with Personal Loan styling */}
              <Select
                label="Employment Type"
                options={["Salaried Person", "Self Employed", "Retired"]}
                value={employmentType}
                onChange={setEmploymentType}
              />

              {/* Dynamic Document Sections */}
              {employmentType === "Salaried Person" && <SalariedDocs />}
              {employmentType === "Self Employed" && <SelfEmployedDocs />}
              {employmentType === "Retired" && <RetiredDocs />}

              {/* Error Message - Matching Personal Loan styling */}
              {error && (
                <div className="col-span-1 md:col-span-2 text-center text-red-600 font-semibold mt-2 text-sm sm:text-base">
                  ⚠ Please fill all fields before submitting.
                </div>
              )}

              {/* Success Message - Matching Personal Loan styling */}
              {success && (
                <div className="col-span-1 md:col-span-2 text-center text-green-600 font-semibold mt-2 text-sm sm:text-base">
                  ✔ Form submitted successfully!
                </div>
              )}

              {/* Submit Button - Matching Personal Loan styling */}
              <div className="col-span-1 md:col-span-2 flex justify-center mt-4">
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

/* ---------------- INPUT COMPONENT - Matching Personal Loan exactly ---------------- */
function Input({ label, value, onChange, type = "text", onlyNumber, maxLength, placeholder }: any) {

  const restrictNumber = (e: any) => {
    if (!onlyNumber) return;

    if (["Backspace", "Delete", "ArrowLeft", "ArrowRight", "Tab"].includes(e.key)) return;

    if (!/^[0-9]$/.test(e.key)) e.preventDefault();
  };

  return (
    <div className="w-full">
      <label className="block text-sm font-medium mb-1 text-gray-700">{label}</label>
      <input
        value={value}
        type={type}
        maxLength={maxLength}
        onKeyDown={restrictNumber}
        onChange={onChange}
        placeholder={placeholder}
        className="w-full border border-gray-300 rounded-md p-2 bg-white text-gray-700 focus:ring-2 focus:ring-[#1CADA3] text-sm sm:text-base placeholder-gray-400"
      />
    </div>
  );
}

/* ---------------- SELECT COMPONENT - With Personal Loan styling ---------------- */
function Select({ label, options, value, onChange }: any) {
  return (
    <div className="w-full">
      <label className="block text-sm font-medium mb-1 text-gray-700">{label}</label>
      <select
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="w-full border border-gray-300 rounded-md p-2 bg-white text-gray-700 focus:ring-2 focus:ring-[#1CADA3] text-sm sm:text-base"
      >
        <option value="">Select {label}</option>
        {options.map((option: string) => (
          <option key={option} value={option}>{option}</option>
        ))}
      </select>
    </div>
  );
}

/* ---------------- FILE UPLOAD - With Personal Loan styling ---------------- */
function FileUpload({ label }: { label: string }) {
  return (
    <div className="flex flex-col">
      <label className="text-sm font-medium mb-1 text-gray-700">{label}</label>
      <input 
        type="file" 
        className="w-full border border-gray-300 rounded-md p-2 bg-white text-gray-700 text-sm" 
      />
    </div>
  );
}

/* ---------------- SECTION COMPONENT ---------------- */
function Section({ title, children }: any) {
  return (
    <div className="col-span-1 md:col-span-2 mt-6">
      <h3 className="text-md font-semibold mb-3 text-[#1CADA3]">{title}</h3>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">{children}</div>
    </div>
  );
}

/* ---------------- SALARIED DOCUMENTS ---------------- */
function SalariedDocs() {
  const docs = [
    "Aadhar card", "Pan card", "Driving License", "Passport",
    "Permeant Address Proof (Light bill, Property tax bill)", "Current Address Proof (Rent Agreement)",
    "3 Months Salary Slip", "Latest 6 Months Bank Statement", "Form 16", "Latest 2 Years ITR",
  ];
  
  return (
    <Section title="Upload Documents for Salaried Person">
      {docs.map((doc) => (
        <FileUpload key={doc} label={doc} />
      ))}
    </Section>
  );
}

/* ---------------- SELF EMPLOYED DOCUMENTS ---------------- */
function SelfEmployedDocs() {
  const docs = [
    "Aadhar card", "Pan card", "Driving License", "Passport",
    "Permeant Address Proof (Light bill, Property tax bill)", "Current Address Proof (Rent Agreement)",
    "Latest 6months bank statements", "GST Certificate", "Udyog aadhar certificate", 
    "Latest ITR 3 years", "Shop act", "TDS certificate",
    "Qualification certificate as per self-employee professionals (Doctor, Architecture, Bpharm etc)",
  ];
  
  return (
    <Section title="Upload Documents for Self Employed">
      {docs.map((doc) => (
        <FileUpload key={doc} label={doc} />
      ))}
    </Section>
  );
}

/* ---------------- RETIRED DOCUMENTS ---------------- */
function RetiredDocs() {
  const docs = [
    "Aadhar card", "Pan card", "Driving License", "Passport",
    "Permeant Address Proof (Light bill, Property tax bill)", "Current Address Proof (Rent Agreement)",
    "Latest 6months bank statements", "2years ITR", "Pension slips or a pension certificate",
  ];
  
  return (
    <Section title="Upload Documents for Retired">
      {docs.map((doc) => (
        <FileUpload key={doc} label={doc} />
      ))}
    </Section>
  );
}