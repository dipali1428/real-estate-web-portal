"use client";
import { useState } from "react";
import { X } from "lucide-react";

export default function LifeInsuranceForm({ onClose }: { onClose: () => void }) {
  // State for Insurance Plan Type
  const [planType, setPlanType] = useState("");

  // Success & Error message states
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState(false);

  // ---------- Form State ----------
  const [formData, setFormData] = useState<any>({});

  // Handle Input Change
  const handleChange = (label: string, value: any) => {
    setFormData({ ...formData, [label]: value });
  };

  // Conditions for showing sections
  const showTermInsuranceFields = planType === "termInsurance";
  const showInvestmentFields =
    planType === "ulip" || planType === "childPlan" || planType === "pensionPlan";

  // Check if income proof is selected (for showing upload field)
  const showUploadField = formData["Income Proof"] === "3 Years ITR" || formData["Income Proof"] === "Form 16";

  // Submit Handler with VALIDATION
  const handleSubmit = () => {
    let requiredFields: string[] = [];

    if (showTermInsuranceFields) {
      requiredFields = [
        "Proposer Name",
        "Birthdate",
        "Education",
        "Profession",
        "Income",
        "ITR Filling",
        "Sum Assured Amount",
        "Policy Term",
        "PPT (Premium Paying Term)",
        "Smoker / Non-Smoker",
        "Drinker / Non-Drinker",
        "Any Existing Disease",
      ];

      // Add income proof document to required fields if income proof is selected
      if (showUploadField && formData["Income Proof"]) {
        requiredFields.push("Income Proof Document");
      }
    }

    if (showInvestmentFields) {
      requiredFields = [
        "Proposer Name",
        "Birthdate",
        "Profession",
        "Income",
        "Policy Term",
        "Premium Paying Term (PPT)",
        "Investment Budget (Yearly)",
      ];
    }

    // Check if all required fields are filled
    const allFilled = requiredFields.every((field) => formData[field] && formData[field] !== "");

    if (!allFilled || !planType) {
      setError(true);
      setSuccess(false);
      return;
    }

    // If filled successfully
    setError(false);
    setSuccess(true);

    setTimeout(() => setSuccess(false), 2000);
  };

  // Handle file upload
  const handleFileUpload = (label: string, files: FileList | null) => {
    if (files && files.length > 0) {
      handleChange(label, files[0]);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40">
      <div className="bg-white rounded-xl shadow-xl w-full max-w-4xl mx-4 overflow-y-auto max-h-[90vh]">

        {/* Header */}
        <div className="flex justify-between items-center border-b px-6 py-4">
          <h2 className="text-xl font-semibold text-[#1CADA3]">Life Insurance Form</h2>
          <button onClick={onClose} className="text-gray-500 hover:text-gray-800">
            <X size={22} />
          </button>
        </div>

        {/* Form Section */}
        <div className="mb-5 p-6">
          <label className="font-semibold text-sm block mb-2 text-gray-700">Select Insurance Type:</label>

          <select
            value={planType}
            onChange={(e) => setPlanType(e.target.value)}
            className="w-full border border-gray-300 rounded-md p-2 focus:ring-2 focus:ring-blue-400 text-gray-700"
          >
            <option value="">-- Select Plan --</option>
            <option value="termInsurance">Term Insurance</option>
            <option value="ulip">ULIP</option>
            <option value="childPlan">Child Plan</option>
            <option value="pensionPlan">Pension Plan</option>
          </select>

          {/* Term Insurance Fields */}
          {showTermInsuranceFields && (
            <div className="space-y-3 mt-4">
              <Input label="Proposer Name" onChange={handleChange} />
              <Input label="Birthdate" type="date" onChange={handleChange} />
              <Input label="Education" onChange={handleChange} />
              <Select 
                label="Profession" 
                options={["Salaried", "Self Employed"]} 
                onChange={handleChange} 
              />
              <Input label="Income (Yearly)" type="number" onChange={handleChange} />
              <Select label="Income Proof" options={["3 Years ITR", "Form 16"]} onChange={handleChange} />
              
              {/* Upload Document Field - Shows when Income Proof is selected */}
              {showUploadField && (
                <FileInput 
                  label="Income Proof Document" 
                  onChange={handleFileUpload}
                  accept=".pdf,.jpg,.jpeg,.png,.doc,.docx"
                />
              )}
              
              <Input label="Sum Assured Amount" type="number" onChange={handleChange} />
              <Input label="Policy Term" onChange={handleChange} />
              <Input label="PPT (Premium Paying Term)" onChange={handleChange} />
              <Input label="Smoker / Non-Smoker" onChange={handleChange} />
              <Input label="Drinker / Non-Drinker" onChange={handleChange} />
              <Input label="Any Existing Disease" onChange={handleChange} />
            </div>
          )}

          {/* Investment Plans */}
          {showInvestmentFields && (
            <div className="space-y-3 mt-4">
              <Input label="Proposer Name" onChange={handleChange} />
              <Input label="Birthdate" type="date" onChange={handleChange} />
              <Select 
                label="Profession" 
                options={["Salaried", "Self Employed"]} 
                onChange={handleChange} 
              />
              <Input label="Income (Yearly)" type="number" onChange={handleChange} />
              <Input label="Policy Term" onChange={handleChange} />
              <Input label="Premium Paying Term (PPT)" onChange={handleChange} />
              <Input label="Investment Budget (Yearly)" type="number" onChange={handleChange} />
            </div>
          )}

          {/* ERROR MESSAGE */}
          {error && (
            <div className="mt-4 text-center text-red-600 font-semibold">
              ⚠ Please fill all fields before submitting.
            </div>
          )}

          {/* SUCCESS MESSAGE */}
          {success && (
            <div className="mt-4 text-center text-green-600 font-semibold">
              ✔ Form submitted successfully!
            </div>
          )}

          {/* Submit Button */}
          <div className="col-span-2 mt-4 flex justify-center">
            <button
              onClick={handleSubmit}
              type="button"
              className="mt-6 bg-[#1CADA3] text-white px-6 py-2 rounded-md w-50 hover:bg-[#16948d] transition"
            >
              Submit
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

/* REUSABLE INPUT COMPONENT */
function Input({
  label,
  type = "text",
  onChange,
}: {
  label: string;
  type?: string;
  onChange: (label: string, value: any) => void;
}) {
  return (
    <div>
      <label className="font-semibold text-sm block mb-1 text-gray-700">{label}</label>
      <input
        type={type}
        onChange={(e) => onChange(label, e.target.value)}
        className="w-full border border-gray-300 rounded-md p-2 focus:ring-2 focus:ring-blue-400 text-gray-700"
      />
    </div>
  );
}

/* REUSABLE SELECT COMPONENT */
function Select({
  label,
  options,
  onChange,
}: {
  label: string;
  options: string[];
  onChange: (label: string, value: any) => void;
}) {
  return (
    <div>
      <label className="font-semibold text-sm block mb-1 text-gray-700">{label}</label>
      <select
        onChange={(e) => onChange(label, e.target.value)}
        className="w-full border border-gray-300 rounded-md p-2 focus:ring-2 focus:ring-blue-400 text-gray-700"
      >
        <option value="">Select</option>
        {options.map((opt, i) => (
          <option key={i} value={opt}>
            {opt}
          </option>
        ))}
      </select>
    </div>
  );
}

/* REUSABLE FILE INPUT COMPONENT */
function FileInput({
  label,
  onChange,
  accept = "*/*"
}: {
  label: string;
  onChange: (label: string, files: FileList | null) => void;
  accept?: string;
}) {
  return (
    <div>
      <label className="font-semibold text-sm block mb-1 text-gray-700">{label}</label>
      <input
        type="file"
        accept={accept}
        onChange={(e) => onChange(label, e.target.files)}
        className="w-full border border-gray-300 rounded-md p-2 focus:ring-2 focus:ring-blue-400 text-gray-700 file:mr-4 file:py-2 file:px-4 file:rounded-md file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100"
      />
      <p className="text-xs text-gray-500 mt-1">Supported formats: PDF, JPG, PNG, DOC</p>
    </div>
  );
}