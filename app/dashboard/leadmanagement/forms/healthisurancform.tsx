"use client";

import { useState } from "react";
import { X, Upload } from "lucide-react";

export default function HealthInsuranceForm({ onClose }: { onClose?: () => void }) {
  const [planType, setPlanType] = useState("");
  const [policyType, setPolicyType] = useState(""); // fresh, port, renewal
  const [policyTenure, setPolicyTenure] = useState(""); // 1,2,3,4,5
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState(false);
  const [uploadedFiles, setUploadedFiles] = useState<File[]>([]);

  const [form, setForm] = useState({
    proposer: "",
    city: "",
    pin: "",
    PSA: "",
    dob: "",
    disease: "",
    FirstAdultDob: "",
    SecondAdultDob: "",
    child1Dob: "",
    child2Dob: "",
  });

  const updateField = (key: string, value: any) => {
    setForm({ ...form, [key]: value });
  };

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (files && files.length > 0) {
      const newFiles = Array.from(files);
      
      // Validate file sizes (max 10MB each)
      const validFiles = newFiles.filter(file => file.size <= 10 * 1024 * 1024);
      
      if (validFiles.length !== newFiles.length) {
        console.warn("Some files were too large and were not added");
      }
      
      // Add new files to existing ones
      setUploadedFiles(prev => [...prev, ...validFiles]);
      
      // Clear the input to allow selecting the same files again
      e.target.value = '';
    }
  };

  const removeFile = (index: number) => {
    setUploadedFiles(prev => prev.filter((_, i) => i !== index));
  };

  const clearAllFiles = () => {
    setUploadedFiles([]);
  };

  // ---------- VALIDATION ----------
  const validateForm = () => {
    if (!planType || !form.proposer || !policyType || !policyTenure) return false;

    // Validate document upload for port and renewal
    if ((policyType === "port" || policyType === "renewal") && uploadedFiles.length === 0) {
      return false;
    }

    if (planType === "individual") {
      return form.city && form.pin && form.dob && form.disease;
    }

    if (planType === "family") {
      return (
        form.city &&
        form.pin &&
        form.FirstAdultDob &&
        form.SecondAdultDob &&
        form.child1Dob &&
        form.child2Dob &&
        form.disease
      );
    }

    return true;
  };

  // SUBMIT
  const handleSubmit = () => {
    if (!validateForm()) {
      setError(true);
      setSuccess(false);
      return;
    }

    // SUCCESS
    setError(false);
    setSuccess(true);

    setTimeout(() => {
      setSuccess(false);
      onClose?.();
    }, 2000);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40">
      <div className="bg-white rounded-xl shadow-xl w-full max-w-4xl mx-4 overflow-y-auto max-h-[90vh]">

        {/* HEADER */}
        <div className="flex justify-between items-center border-b px-6 py-4 text-gray-700">
          <h2 className="text-xl font-semibold text-[#1CADA3]">Health Insurance Form</h2>
          <button onClick={onClose} className="text-gray-500 hover:text-gray-800">
            <X size={22} />
          </button>
        </div>

        <div className="p-6">
          {/* POLICY TYPE */}
          <label className="font-semibold text-sm block mb-2 text-gray-700">Policy Type</label>
          <select
            value={policyType}
            onChange={(e) => setPolicyType(e.target.value)}
            className="w-full border border-gray-300 rounded-md p-2 mb-6 text-gray-700"
          >
            <option value="">Select Policy Type</option>
            <option value="fresh">Fresh</option>
            <option value="port">Port</option>
            <option value="renewal">Renewal</option>
          </select>

          {/* PLAN TYPE */}
          <label className="font-semibold text-sm block mb-2 text-gray-700">Types of Plan</label>
          <select
            value={planType}
            onChange={(e) => setPlanType(e.target.value)}
            className="w-full border border-gray-300 rounded-md p-2 mb-6 text-gray-700"
          >
            <option value="">Select Plan</option>
            <option value="individual">Individual</option>
            <option value="family">Family Floater</option>
          </select>

          {/* PROPOSER NAME */}
          <Input
            label="Proposer Name"
            type="text"
            value={form.proposer}
            onChange={(v) => updateField("proposer", v)}
            placeholder="Enter proposer's full name"
          />

          {/* INDIVIDUAL */}
          {planType === "individual" && (
            <div className="space-y-4">
              <Input label="City" type="text" value={form.city} onChange={(v) => updateField("city", v)} placeholder="Enter your city" />
              <Input label="Pin Code" type="text" value={form.pin} onChange={(v) => updateField("pin", v.replace(/\D/g, ""))} placeholder="Enter 6-digit pin code" />
              <Input label="Preferred Sum Assured (Min- 5 lakhs)" type="text" value={form.PSA} onChange={(v) => updateField("PSA", v.replace(/\D/g, ""))} placeholder="Enter sum assured amount" />
              
              {/* POLICY TENURE - Only show when plan type is selected */}
              <div className="mb-4">
                <label className="font-semibold text-sm block mb-2 text-gray-700">Policy Tenure (Years)</label>
                <select
                  value={policyTenure}
                  onChange={(e) => setPolicyTenure(e.target.value)}
                  className="w-full border border-gray-300 rounded-md p-2 text-gray-700"
                >
                  <option value="">Select Tenure</option>
                  <option value="1">1 Year</option>
                  <option value="2">2 Years</option>
                  <option value="3">3 Years</option>
                  <option value="4">4 Years</option>
                  <option value="5">5 Years</option>
                </select>
              </div>

              <Input label="Date of Birth" type="date" value={form.dob} onChange={(v) => updateField("dob", v)} />
              <Input label="Pre Existing Disease" type="text" value={form.disease} onChange={(v) => updateField("disease", v)} placeholder="Enter any pre-existing medical conditions" />
            </div>
          )}

          {/* FAMILY */}
          {planType === "family" && (
            <div className="space-y-4">
              <Input label="City" type="text" value={form.city} onChange={(v) => updateField("city", v)} placeholder="Enter your city" />
              <Input label="Pin Code" type="text" value={form.pin} onChange={(v) => updateField("pin", v.replace(/\D/g, ""))} placeholder="Enter 6-digit pin code" />
              <Input label="Preferred Sum Assured (Min- 5 lakhs)" type="text" value={form.PSA} onChange={(v) => updateField("PSA", v.replace(/\D/g, ""))} placeholder="Enter sum assured amount" />
              
              {/* POLICY TENURE - Only show when plan type is selected */}
              <div className="mb-4">
                <label className="font-semibold text-sm block mb-2 text-gray-700">Policy Tenure (Years)</label>
                <select
                  value={policyTenure}
                  onChange={(e) => setPolicyTenure(e.target.value)}
                  className="w-full border border-gray-300 rounded-md p-2 text-gray-700"
                >
                  <option value="">Select Tenure</option>
                  <option value="1">1 Year</option>
                  <option value="2">2 Years</option>
                  <option value="3">3 Years</option>
                  <option value="4">4 Years</option>
                  <option value="5">5 Years</option>
                </select>
              </div>

              {[
                { label: "DOB of First Adult Member", field: "FirstAdultDob" },
                { label: "DOB of Second Adult Member", field: "SecondAdultDob" },
                { label: "DOB of 1st Child", field: "child1Dob" },
                { label: "DOB of 2nd Child", field: "child2Dob" },
              ].map((item) => (
                <Input
                  key={item.field}
                  label={item.label}
                  type="date"
                  value={(form as any)[item.field]}
                  onChange={(v) => updateField(item.field, v)}
                />
              ))}

              <Input label="Pre Existing Disease" type="text" value={form.disease} onChange={(v) => updateField("disease", v)} placeholder="Enter any pre-existing medical conditions" />
            </div>
          )}

          {/* DOCUMENT UPLOAD FOR PORT AND RENEWAL */}
          {(policyType === "port" || policyType === "renewal") && (
            <div className="mb-6 p-4 border border-gray-300 rounded-md bg-gray-50">
              <div className="flex justify-between items-center mb-3">
                <label className="font-semibold text-sm text-gray-700">
                  Upload Previous Policy Document {policyType === "port" ? "(for Porting)" : "(for Renewal)"}
                </label>
                {uploadedFiles.length > 0 && (
                  <button
                    onClick={clearAllFiles}
                    className="text-sm text-red-600 hover:text-red-800 font-medium"
                  >
                    Clear All
                  </button>
                )}
              </div>
              
              {/* File Upload Area */}
              <div className="border-2 border-dashed border-gray-300 rounded-md p-6 text-center mb-4">
                <input
                  type="file"
                  multiple
                  onChange={handleFileUpload}
                  className="hidden"
                  id="policy-document"
                  accept=".pdf,.jpg,.jpeg,.png,.doc,.docx"
                />
                <label
                  htmlFor="policy-document"
                  className="cursor-pointer flex flex-col items-center justify-center text-gray-600"
                >
                  <Upload size={32} className="mb-2 text-[#1CADA3]" />
                  <span className="font-medium">Click to upload documents</span>
                  <span className="text-sm text-gray-500 mt-1">
                    PDF, JPG, PNG, DOC (Max 10MB each) - Select multiple files
                  </span>
                </label>
              </div>

              {/* Uploaded Files List */}
              {uploadedFiles.length > 0 && (
                <div className="space-y-2">
                  <div className="flex justify-between items-center">
                    <h4 className="font-semibold text-sm text-gray-700">
                      Uploaded Files ({uploadedFiles.length})
                    </h4>
                  </div>
                  {uploadedFiles.map((file, index) => (
                    <div
                      key={index}
                      className="flex items-center justify-between bg-white p-3 rounded-md border border-gray-200"
                    >
                      <div className="flex items-center space-x-3">
                        <div className="w-10 h-10 bg-[#1CADA3] rounded-full flex items-center justify-center">
                          <span className="text-white text-xs font-bold">
                            {file.name.split('.').pop()?.toUpperCase()}
                          </span>
                        </div>
                        <div className="flex flex-col">
                          <span className="text-sm text-gray-700 truncate max-w-xs">
                            {file.name}
                          </span>
                          <span className="text-xs text-gray-500">
                            {(file.size / 1024 / 1024).toFixed(2)} MB
                          </span>
                        </div>
                      </div>
                      <button
                        onClick={() => removeFile(index)}
                        className="text-red-500 hover:text-red-700 p-1"
                        title="Remove file"
                      >
                        <X size={16} />
                      </button>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}

          {/* ERROR */}
          {error && (
            <div className="mt-4 text-center text-red-600 font-semibold">
              ⚠ Please fill all required fields.
              {(policyType === "port" || policyType === "renewal") && uploadedFiles.length === 0 && (
                <div className="text-sm mt-1">Please upload previous policy document.</div>
              )}
            </div>
          )}

          {/* SUCCESS */}
          {success && (
            <div className="mt-4 text-center text-green-600 font-semibold">
              ✔ Form submitted successfully!
            </div>
          )}

          {/* SUBMIT */}
          <div className="col-span-2 mt-4 flex justify-center">
            <button
              onClick={handleSubmit}
              className="mt-6 bg-[#1CADA3] text-white px-6 py-2 rounded-md hover:bg-[#16948d]"
            >
              Submit
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

/* INPUT COMPONENT */
function Input({
  label,
  type,
  value,
  onChange,
  placeholder = ""
}: {
  label: string;
  type: string;
  value: any;
  onChange: (v: string) => void;
  placeholder?: string;
}) {
  return (
    <div className="mb-4">
      <label className="font-semibold text-sm block mb-1 text-gray-700">{label}</label>
      <input
        type={type}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="w-full border border-gray-300 rounded-md p-2 text-gray-700"
        placeholder={placeholder}
      />
    </div>
  );
}