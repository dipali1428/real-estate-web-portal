"use client";
import { useState } from "react";
import { X } from "lucide-react";

export default function PersonalLoanForm({ onClose }: { onClose: () => void }) {
  const [formData, setFormData] = useState({
    clientName: "",
    phone: "",
    email: "",
    dob: "",
    location: "",
    loanAmount: "",
    deductionDetails: "",
    companyName: "",
    companyAddress: "",
    loanObligation: "",
  });

  const [error, setError] = useState(false);
  const [success, setSuccess] = useState(false);

  // Update form values
  const handleChange = (key: string, value: string) => {
    setFormData({ ...formData, [key]: value });
  };

  // Validate before submit
  const submitForm = (e: any) => {
    e.preventDefault();
    setError(false);
    setSuccess(false);

    for (const key of Object.keys(formData)) {
      if (!formData[key as keyof typeof formData]) {
        setError(true);
        return;
      }
    }

    // If all good
    setSuccess(true);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40">
      <div className="bg-white rounded-xl shadow-xl w-full max-w-4xl mx-4 overflow-y-auto max-h-[90vh] text-gray-700">

        {/* Header */}
        <div className="flex justify-between items-center border-b px-6 py-4">
          <h2 className="text-xl font-semibold text-[#1CADA3]">Personal Loan Form</h2>
          <button onClick={onClose} className="text-gray-600 hover:text-gray-800">
            <X size={22} />
          </button>
        </div>

        {/* Form */}
        <form onSubmit={submitForm} className="grid grid-cols-1 md:grid-cols-2 gap-4 p-6">

          <Input 
            label="Client Name"
            value={formData.clientName}
            onChange={(e: any) => handleChange("clientName", e.target.value)}
          />

          <Input
            label="Phone Number"
            type="tel"
            maxLength={10}
            onlyNumber
            value={formData.phone}
            onChange={(e: any) => handleChange("phone", e.target.value)}
          />

          <Input 
            label="Email ID"
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
            value={formData.location}
            onChange={(e: any) => handleChange("location", e.target.value)}
          />

          <Input 
            label="Loan Amount"
            value={formData.loanAmount}
            onChange={(e: any) => handleChange("loanAmount", e.target.value)}
          />

          <Input 
            label="Deduction Details"
            value={formData.deductionDetails}
            onChange={(e: any) => handleChange("deductionDetails", e.target.value)}
          />

          <Input 
            label="Company Name"
            value={formData.companyName}
            onChange={(e: any) => handleChange("companyName", e.target.value)}
          />

          <Input 
            label="Company Address"
            value={formData.companyAddress}
            onChange={(e: any) => handleChange("companyAddress", e.target.value)}
          />

          <Input 
            label="Loan Obligation Details"
            value={formData.loanObligation}
            onChange={(e: any) => handleChange("loanObligation", e.target.value)}
          />

          {/* File Uploads */}
          {[
            "Aadhar Card",
            "Pan Card",
            "3 Months Salary Slip",
            "Form 16",
            "6 Months Banking Statement",
            "Address Proof",
            "Photograph",
            "Existing Loan Statement",
          ].map((label, idx) => (
            <div key={idx} className="col-span-1">
              <label className="block font-medium mb-1">{label}</label>
              <input
                type="file"
                className="border rounded-lg p-2 text-sm 
                file:mr-3 file:py-2 file:px-4 file:rounded-full file:border-0 
                file:bg-[#1CADA3] file:text-white hover:file:bg-teal-600"
              />
            </div>
          ))}

          {/* Robot Check */}
          <div className="col-span-2 flex items-center gap-2 mt-4">
            <input id="robot" type="checkbox" className="w-4 h-4" />
            <label htmlFor="robot">I am not a robot</label>
          </div>

          {/* Error Message */}
          {error && (
            <div className="col-span-2 text-center text-red-600 font-semibold mt-2">
              ⚠ Please fill all fields before submitting.
            </div>
          )}

          {/* Success Message */}
          {success && (
            <div className="col-span-2 text-center text-green-600 font-semibold mt-2">
              ✔ Form submitted successfully!
            </div>
          )}

          {/* Submit Button */}
          <div className="col-span-2 flex justify-center mt-4">
            <button
              type="submit"
              className="bg-linear-to-r from-[#2076C7] to-[#1CADA3] text-white px-6 py-2 rounded-md hover:opacity-90"
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
function Input({ label, value, onChange, type = "text", onlyNumber, maxLength }: any) {

  const restrictNumber = (e: any) => {
    if (!onlyNumber) return;

    if (["Backspace", "Delete", "ArrowLeft", "ArrowRight", "Tab"].includes(e.key)) return;

    if (!/^[0-9]$/.test(e.key)) e.preventDefault();
  };

  return (
    <div>
      <label className="block text-sm font-medium mb-1">{label}</label>
      <input
        value={value}
        type={type}
        maxLength={maxLength}
        onKeyDown={restrictNumber}
        onChange={onChange}
        className="w-full border border-gray-300 rounded-md p-2 focus:ring-2 focus:ring-[#1CADA3]"
      />
    </div>
  );
}
