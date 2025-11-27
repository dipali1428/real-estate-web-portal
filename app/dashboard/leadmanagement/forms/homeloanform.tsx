"use client";
import { useState } from "react";
import { X } from "lucide-react";

export default function HomeLoanForm({ onClose }: { onClose: () => void }) {
  const [loanType, setLoanType] = useState("");
  const [employmentType, setEmploymentType] = useState("");

  // ✅ Form Data State
  const [formData, setFormData] = useState({
    clientName: "",
    phone: "",
    email: "",
    dob: "",
    location: "",
    loanAmount: "",
    otherLoan: "",
  });

  // Validation UI states
  const [error, setError] = useState(false);
  const [success, setSuccess] = useState(false);

  // Input value handler
  const handleChange = (field: string, value: string) => {
    setFormData({ ...formData, [field]: value });
  };

  // Form Submit
  const handleSubmit = (e: any) => {
    e.preventDefault();
    setError(false);
    setSuccess(false);

    // Validate all fields
    const required = [
      formData.clientName,
      formData.phone,
      formData.email,
      formData.dob,
      formData.location,
      formData.loanAmount,
      formData.otherLoan,
      loanType,
      employmentType,
    ];

    if (required.some((f) => f === "")) {
      setError(true);
      return;
    }

    // Validate phone number
    if (formData.phone.length !== 10) {
      setError(true);
      return;
    }

    setSuccess(true);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 p-2 sm:p-4">
      <div className="bg-white rounded-xl shadow-xl w-full max-w-4xl mx-auto h-[95vh] sm:h-[90vh] flex flex-col">
        
        {/* Header */}
        <div className="flex justify-between items-center border-b px-4 sm:px-6 py-3 sm:py-4 flex-shrink-0">
          <h2 className="text-lg sm:text-xl font-semibold text-[#1CADA3]">Home Loan Form</h2>
          <button onClick={onClose} className="text-gray-500 hover:text-gray-800">
            <X size={20} className="sm:w-6 sm:h-6" />
          </button>
        </div>

        {/* Scrollable Form Body */}
        <div className="flex-1 overflow-y-auto">
          <form onSubmit={handleSubmit} className="p-4 sm:p-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6">
              
              <Select
                label="Type of Home Loan"
                options={[
                  "Balance Transfer",
                  "Fresh Home Loan",
                  "Home Equity Loan",
                  "Top-up Loan",
                  "Plot Loan",
                  "Construction Loan",
                  "Resale Home Loan",
                ]}
                value={loanType}
                onChange={setLoanType}
              />

              <Input
                label="Client Name"
                value={formData.clientName}
                onChange={(v: any) => handleChange("clientName", v)}
              />

              <Input
                label="Phone Number"
                type="tel"
                maxLength={10}
                value={formData.phone}
                onChange={(v: string) => {
                  if (/^\d*$/.test(v)) handleChange("phone", v);
                }}
              />

              <Input
                label="Email ID"
                value={formData.email}
                onChange={(v: any) => handleChange("email", v)}
              />

              <Input
                label="Date of Birth"
                type="date"
                value={formData.dob}
                onChange={(v: any) => handleChange("dob", v)}
              />

              <Input
                label="Location"
                value={formData.location}
                onChange={(v: any) => handleChange("location", v)}
              />

              <Input
                label="Loan Amount"
                value={formData.loanAmount}
                onChange={(v: any) => handleChange("loanAmount", v)}
              />

              <Input
                label="Other Loan Obligation Details"
                value={formData.otherLoan}
                onChange={(v: any) => handleChange("otherLoan", v)}
              />

              {/* Employment Type */}
              <Select
                label="Employment Type"
                options={["Salaried Person", "Self Employed"]}
                value={employmentType}
                onChange={(v: any) => setEmploymentType(v)}
              />

              {/* Dynamic Document Sections */}
              {employmentType === "Salaried Person" && <SalariedDocs />}
              {employmentType === "Self Employed" && <SelfEmployedDocs />}

              {/* Error */}
              {error && (
                <div className="col-span-1 md:col-span-2 text-center text-red-600 font-semibold text-sm sm:text-base py-2">
                  ⚠ Please fill all fields correctly.
                </div>
              )}

              {/* Success */}
              {success && (
                <div className="col-span-1 md:col-span-2 text-center text-green-600 font-semibold text-sm sm:text-base py-2">
                  ✔ Form submitted successfully!
                </div>
              )}

              {/* Submit */}
              <div className="col-span-1 md:col-span-2 mt-4 flex justify-center">
                <button
                  type="submit"
                  className="w-50 bg-gradient-to-r from-[#2076C7] to-[#1CADA3] text-white py-2 rounded-md hover:from-[#1a68b0] hover:to-[#18998f] transition-colors text-sm sm:text-base"
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

/* ----------- Input Component ----------- */
function Input({ label, value, onChange, type = "text", maxLength }: any) {
  return (
    <div className="w-full">
      <label className="block text-sm font-medium mb-1 text-gray-700">{label}</label>
      <input
        type={type}
        maxLength={maxLength}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="w-full border border-gray-300 rounded-md p-2 bg-white text-gray-700 text-sm sm:text-base"
      />
    </div>
  );
}

/* ----------- Select Component ----------- */
function Select({ label, options, value, onChange }: any) {
  return (
    <div className="w-full">
      <label className="block text-sm font-medium mb-1 text-gray-700">{label}</label>
      <select
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="w-full border border-gray-300 rounded-md p-2 bg-white text-gray-700 text-sm sm:text-base"
      >
        <option value="">Select {label}</option>
        {options.map((o: string) => (
          <option key={o}>{o}</option>
        ))}
      </select>
    </div>
  );
}

/* ----------- File Upload ----------- */
function FileUpload({ label }: { label: string }) {
  return (
    <div className="w-full">
      <label className="block text-sm font-medium mb-1 text-gray-700">{label}</label>
      <input 
        type="file" 
        className="w-full border border-gray-300 rounded-md p-2 bg-white text-gray-700 text-sm" 
      />
    </div>
  );
}

/* ----------- Sections ----------- */
function Section({ title, children }: any) {
  return (
    <div className="col-span-1 md:col-span-2 mt-6">
      <h3 className="text-md font-semibold mb-3 text-[#1CADA3]">{title}</h3>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">{children}</div>
    </div>
  );
}

/* ----------- Salaried ----------- */
function SalariedDocs() {
  const docs = [
    "Aadhar Card",
    "Pan Card",
    "3 Months Salary Slip",
    "2 Years Form 16",
    "6 Months Banking Statement",
    "Address Proof",
    "Photograph",
    "Existing Loan Statement",
    "Property Cost Sheet / Index II",
    "Own Contribution Proof",
  ];
  return (
    <Section title="Upload Documents for Salaried Person">
      {docs.map((d) => (
        <FileUpload key={d} label={d} />
      ))}
    </Section>
  );
}

/* ----------- Self Employed ----------- */
function SelfEmployedDocs() {
  const docs = [
    "Aadhar Card",
    "Pan Card",
    "Udyam Registration",
    "Shop Act Licence",
    "1 Current Banking Statement",
    "Saving Bank Account",
    "Address Proof",
    "3 Years ITR",
    "GST Certificate",
    "Last 12 Months GST Returns",
    "Photograph",
    "Existing Loan Statement",
    "Property Cost Sheet / Index II",
    "Own Contribution Proof",
  ];
  return (
    <Section title="Upload Documents for Self Employed Person">
      {docs.map((d) => (
        <FileUpload key={d} label={d} />
      ))}
    </Section>
  );
}