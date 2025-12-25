"use client";

import { useEffect, useState } from "react";
import { X } from "lucide-react";
import { DashboardService } from "@/app/services/dashboardService";

// 🔥 1. Define the list of allowed domains here
const ALLOWED_DOMAINS = [
  "gmail.com",
  "yahoo.com",
  "outlook.com",
  "hotmail.com",
  "icloud.com",
  "live.com",
];

/* ======================= COMPONENT ======================= */
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

  const [validationErrors, setValidationErrors] = useState<Record<string, string>>(
    {}
  );
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState(false);

  // Payload trigger for useEffect API call
  const [submitPayload, setSubmitPayload] = useState<any>(null);

  const productKeyMap: Record<string, string> = {
    Loan: "loan",
    Insurance: "insurance",
    Investment: "investment",
    "Real Estate": "real_estate",
    "Mutual Funds": "mutual_funds",
    Unlisted: "unlisted",
  };

  const subProductOptions: Record<string, string[]> = {
    loan: [
      "Home Loan",
      "Personal Loan",
      "Business Loan",
      "Education Loan",
      "Lap Loan",
      "Vehicle Loan",
      "SME Loan",
      "Loan Against Securities",
      "NRP Loan",
      "Credit Cards",
    ],
    insurance: [
      "Health Insurance",
      "Life Insurance",
      "Travel Insurance",
      "Motor Insurance",
      "Property Insurance",
      "Cattle Insurance",
      "Marine Insurance",
    ],
    investment: ["Wealth Management", "PMS/AIF", "Bonds", "Fixed Deposits"],
    real_estate: ["Fractional Real Estate"],
    mutual_funds: ["Mutual Funds"],
    unlisted: ["Unlisted"],
  };

  /* ======================= HANDLERS ======================= */
  const handleChange = (key: string, value: string) => {
    setFormData({ ...formData, [key]: value });

    if (validationErrors[key]) {
      const updatedErrors = { ...validationErrors };
      delete updatedErrors[key];
      setValidationErrors(updatedErrors);
    }
  };

  const validateForm = () => {
    const errors: Record<string, string> = {};

    if (!formData.leadName.trim()) {
      errors.leadName = "Client name is required";
    }

    const cleanedContact = formData.contactNumber.replace(/\D/g, "");
    if (!cleanedContact) {
      errors.contactNumber = "Contact number is required";
    } else if (cleanedContact.length !== 10) {
      errors.contactNumber = "Contact number must be 10 digits";
    }

    if (!formData.product) {
      errors.product = "Product selection is required";
    }

    // 🔥 2. Enhanced Email Validation Logic
    if (formData.emailAddress) {
      // Basic regex for format (user@domain.com)
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      
      if (!emailRegex.test(formData.emailAddress)) {
        errors.emailAddress = "Enter a valid email format";
      } else {
        // Extract the domain part (everything after @)
        const domain = formData.emailAddress.split("@")[1];
        
        // Check if the domain is in our allowed list
        if (!ALLOWED_DOMAINS.includes(domain)) {
          errors.emailAddress = `Domain "@${domain}" is not supported. Please use a known provider (e.g., Gmail, Yahoo).`;
        }
      }
    }

    setValidationErrors(errors);
    return Object.keys(errors).length === 0;
  };

  /* ======================= SUBMIT ======================= */
  const submitForm = (e: React.FormEvent) => {
    e.preventDefault();
    setError(false);
    setSuccess(false);

    if (!validateForm()) {
      setError(true);
      return;
    }

    const payload = {
      lead_name: formData.leadName.trim(),
      contact_number: formData.contactNumber.replace(/\D/g, ""),
      email: formData.emailAddress.trim() || "",
      department: formData.product,
      sub_category: formData.subProduct || "",
      notes: formData.additionalNotes.trim() || "",
    };

    setIsSubmitting(true);
    setSubmitPayload(payload);
  };

  /* ======================= API CALL ======================= */
  useEffect(() => {
    if (!submitPayload) return;

    const createLead = async () => {
      try {
        await DashboardService.createReferralLead(submitPayload);

        setSuccess(true);

        setTimeout(() => {
          setIsSubmitting(false);
          setSuccess(false);
          setSubmitPayload(null);
          onClose();

          setFormData({
            leadName: "",
            contactNumber: "",
            emailAddress: "",
            product: "",
            subProduct: "",
            additionalNotes: "",
          });

          setValidationErrors({});
        }, 1500);
      } catch (err: any) {
        setIsSubmitting(false);
        setSubmitPayload(null);
        setError(true);

        setValidationErrors({
          apiError:
            err?.response?.data?.message ||
            "Failed to save lead. Please try again.",
        });
      }
    };

    createLead();
  }, [submitPayload]);

  if (!isOpen) return null;

  /* ======================= UI ======================= */
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 p-4">
      <div className="bg-white rounded-xl w-full max-w-4xl shadow-xl">
        {/* Header */}
        <div className="flex justify-between items-center border-b px-6 py-4 text-gray-700">
          <h2 className="text-xl font-semibold text-[#1CADA3]">Add New Lead</h2>
          <button onClick={onClose} disabled={isSubmitting}>
            <X />
          </button>
        </div>

        {/* Body */}
        <form onSubmit={submitForm} className="p-6 grid grid-cols-1 md:grid-cols-2 gap-6 text-gray-700">
          <Input
            label="Client Name"
            value={formData.leadName}
            onChange={(e: any) => handleChange("leadName", e.target.value)}
            error={validationErrors.leadName}
            required
          />

          <Input
            label="Contact Number"
            onlyNumber
            maxLength={10}
            value={formData.contactNumber}
            onChange={(e: any) => handleChange("contactNumber", e.target.value)}
            error={validationErrors.contactNumber}
            required
          />

          <Input
            label="Email Address"
            value={formData.emailAddress}
            // Forces lowercase on input
            onChange={(e: any) => 
              handleChange("emailAddress", e.target.value.toLowerCase())
            }
            error={validationErrors.emailAddress}
          />

          <Select
            label="Product"
            value={formData.product}
            options={Object.keys(productKeyMap)}
            onChange={(val: string) => handleChange("product", val)}
            error={validationErrors.product}
            required
          />

          {formData.product && (
            <Select
              label="Sub Product"
              value={formData.subProduct}
              options={subProductOptions[productKeyMap[formData.product]]}
              onChange={(val: string) => handleChange("subProduct", val)}
            />
          )}

          <div className="md:col-span-2">
            <label className="block text-sm mb-1">Additional Notes</label>
            <textarea
              rows={3}
              value={formData.additionalNotes}
              onChange={(e) => handleChange("additionalNotes", e.target.value)}
              className="w-full border rounded-md p-2"
            />
          </div>

          {validationErrors.apiError && (
            <div className="md:col-span-2 text-center text-red-600">
              ⚠ {validationErrors.apiError}
            </div>
          )}

          {success && (
            <div className="md:col-span-2 text-center text-green-600">
              ✔ Lead saved successfully
            </div>
          )}

          <div className="md:col-span-2 flex justify-center gap-4">
            <button type="button" onClick={onClose} className="px-6 py-2 bg-gray-200 rounded">
              Cancel
            </button>
            <button
              type="submit"
              disabled={isSubmitting}
              className="px-6 py-2 bg-[#1CADA3] text-white rounded"
            >
              {isSubmitting ? "Saving..." : "Save Lead"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

/* ======================= INPUT ======================= */
function Input({
  label,
  value,
  onChange,
  onlyNumber,
  maxLength,
  error,
  required,
}: any) {
  return (
    <div>
      <label className="block text-sm mb-1">
        {label} {required && <span className="text-red-500">*</span>}
      </label>
      <input
        value={value}
        maxLength={maxLength}
        onChange={onChange}
        onKeyDown={(e) =>
          onlyNumber && !/[0-9]|Backspace|Delete|Arrow/.test(e.key) && e.preventDefault()
        }
        className={`w-full border rounded-md p-2 ${
          error ? "border-red-500" : "border-gray-300"
        }`}
      />
      {error && <p className="text-xs text-red-500">{error}</p>}
    </div>
  );
}

/* ======================= SELECT ======================= */
function Select({ label, value, options, onChange, error, required }: any) {
  return (
    <div>
      <label className="block text-sm mb-1">
        {label} {required && <span className="text-red-500">*</span>}
      </label>
      <select
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className={`w-full border rounded-md p-2 ${
          error ? "border-red-500" : "border-gray-300"
        }`}
      >
        <option value="">Select {label}</option>
        {options.map((opt: string) => (
          <option key={opt}>{opt}</option>
        ))}
      </select>
      {error && <p className="text-xs text-red-500">{error}</p>}
    </div>
  );
}