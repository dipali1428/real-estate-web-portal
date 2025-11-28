"use client";
import { useState } from "react";
import { X } from "lucide-react";

export default function AddLeadModal({
  isOpen,
  onClose,
}: {
  isOpen: boolean;
  onClose: () => void;
}) {
  const [formData, setFormData] = useState({
    leadName: "",
    contactNumber: "",
    emailAddress: "",
    product: "",
    subProduct: "",
    additionalNotes: "",
  });

  const [error, setError] = useState(false);
  const [success, setSuccess] = useState(false);

  const subProductOptions: Record<string, string[]> = {
    finance: ["Loans", "Credit Cards", "EMI Plans"],
    protection: ["Life Insurance", "Health Insurance"],
    investments: ["Mutual Funds", "Fixed Deposits", "Stocks"],
    real_estate: ["Apartments", "Commercial", "Land"],
  };

  // Update form values - matching Personal Loan behavior
  const handleChange = (key: string, value: string) => {
    setFormData({ ...formData, [key]: value });
  };

  // Validate before submit - matching Personal Loan behavior
  const submitForm = (e: any) => {
    e.preventDefault();
    setError(false);
    setSuccess(false);

    // Check all required fields
    const requiredFields = [
      formData.leadName,
      formData.contactNumber,
      formData.product,
    ];

    for (const field of requiredFields) {
      if (!field) {
        setError(true);
        return;
      }
    }

    // Validate phone number length
    if (formData.contactNumber.length !== 10) {
      setError(true);
      return;
    }

    // If all good
    setSuccess(true);
    
    // Reset form and close after success
    setTimeout(() => {
      setSuccess(false);
      onClose();
      setFormData({
        leadName: "",
        contactNumber: "",
        emailAddress: "",
        product: "",
        subProduct: "",
        additionalNotes: "",
      });
    }, 1500);
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 p-2 sm:p-4">
      <div className="bg-white rounded-xl shadow-xl w-full max-w-4xl mx-auto max-h-[90vh] flex flex-col">
        
        {/* Header - Matching Personal Loan design */}
        <div className="flex justify-between items-center border-b px-4 sm:px-6 py-3 sm:py-4 flex-shrink-0">
          <h2 className="text-lg sm:text-xl font-semibold text-[#1CADA3]">Add New Lead</h2>
          <button onClick={onClose} className="text-gray-600 hover:text-gray-800">
            <X size={20} className="sm:w-6 sm:h-6" />
          </button>
        </div>

        {/* Scrollable Form Body - Reduced bottom space */}
        <div className="flex-1 overflow-y-auto">
          <form onSubmit={submitForm} className="p-4 sm:p-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6">

              <Input 
                label="Client Name"
                placeholder="Enter client's full name"
                value={formData.leadName}
                onChange={(e: any) => handleChange("leadName", e.target.value)}
              />

              <Input
                label="Contact Number"
                type="tel"
                maxLength={10}
                onlyNumber
                placeholder="Enter 10-digit contact number"
                value={formData.contactNumber}
                onChange={(e: any) => handleChange("contactNumber", e.target.value)}
              />

              <Input 
                label="Email Address"
                type="email"
                placeholder="Enter email address"
                value={formData.emailAddress}
                onChange={(e: any) => handleChange("emailAddress", e.target.value)}
              />

              {/* Product Selection */}
              <Select
                label="Product"
                options={["Finance", "Protection", "Investments", "Real Estate"]}
                value={formData.product}
                onChange={(value: string) => handleChange("product", value)}
              />

              {/* Sub Product Selection */}
              {formData.product && (
                <Select
                  label="Sub Product"
                  options={subProductOptions[formData.product.toLowerCase()] || []}
                  value={formData.subProduct}
                  onChange={(value: string) => handleChange("subProduct", value)}
                />
              )}

              {/* Additional Notes - Full width */}
              <div className="col-span-1 md:col-span-2">
                <label className="block text-sm font-medium mb-1 text-gray-700">Additional Notes</label>
                <textarea
                  value={formData.additionalNotes}
                  onChange={(e: any) => handleChange("additionalNotes", e.target.value)}
                  placeholder="Enter any additional notes or comments..."
                  rows={3}
                  className="w-full border border-gray-300 rounded-md p-2 bg-white text-gray-700 focus:ring-2 focus:ring-[#1CADA3] text-sm sm:text-base placeholder-gray-400"
                />
              </div>

              {/* Error Message */}
              {error && (
                <div className="col-span-1 md:col-span-2 text-center text-red-600 font-semibold text-sm sm:text-base">
                  ⚠ Please fill all required fields correctly.
                </div>
              )}

              {/* Success Message */}
              {success && (
                <div className="col-span-1 md:col-span-2 text-center text-green-600 font-semibold text-sm sm:text-base">
                  ✔ Lead saved successfully!
                </div>
              )}

              {/* Action Buttons - Reduced top margin */}
              <div className="col-span-1 md:col-span-2 flex justify-center gap-4">
                <button
                  type="button"
                  onClick={onClose}
                  className="w-full sm:w-32 bg-gray-100 text-gray-700 py-2 rounded-md hover:bg-gray-200 transition-colors text-sm sm:text-base"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="w-full sm:w-32 bg-gradient-to-r from-[#2076C7] to-[#1CADA3] text-white py-2 rounded-md hover:from-[#1a68b0] hover:to-[#18998f] transition-colors text-sm sm:text-base"
                >
                  Save Lead
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