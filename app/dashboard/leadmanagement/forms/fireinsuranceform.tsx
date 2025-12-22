"use client";
import { useState } from "react";
import { X, Upload } from "lucide-react";

export default function FIreInsuranceForm({ onClose }: { onClose: () => void }) {
  const [insuranceType, setInsuranceType] = useState<"residential" | "commercial" | "stock" | "">("");
  const [formData, setFormData] = useState({
    name: "",
    address: "",
    pincode: "",
    sumInsured: "",
    tenure: "",
    notRobot: false,
  });

  const [error, setError] = useState(false);
  const [success, setSuccess] = useState(false);
  const [uploadedFiles, setUploadedFiles] = useState<File[]>([]);

  const handleChange = (key: string, value: string | boolean) => {
    setFormData({ ...formData, [key]: value });
  };

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (files && files.length > 0) {
      const newFiles = Array.from(files).filter(file => 
        file.type.includes('spreadsheet') || file.name.match(/\.(xlsx|xls|csv)$/)
      );
      setUploadedFiles(prev => [...prev, ...newFiles]);
      e.target.value = '';
    }
  };

  const submitForm = (e: React.FormEvent) => {
    e.preventDefault();
    if (!insuranceType) {
      setError(true);
      return;
    }
    setSuccess(true);
    setTimeout(() => {
      setSuccess(false);
      onClose();
    }, 2000);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 p-2 sm:p-4">
      {/* 
          DYNAMIC HEIGHT LOGIC:
          - If no insuranceType: h-auto (window shrinks to fit the dropdown)
          - If insuranceType selected: h-[95vh] sm:h-[85vh] (expanded view)
      */}
      <div className={`bg-white rounded-xl shadow-xl w-full max-w-4xl mx-auto flex flex-col transition-all duration-300 
        ${insuranceType ? "h-auto" : "h-auto max-h-[90vh]"}`}>
        
        {/* Header */}
        <div className="flex justify-between items-center border-b px-4 sm:px-6 py-3 sm:py-4 flex-shrink-0">
          <h2 className="text-lg sm:text-xl font-semibold text-[#1CADA3]">Fire Insurance Form</h2>
          <button onClick={onClose} className="text-gray-600 hover:text-gray-800">
            <X size={20} className="sm:w-6 sm:h-6" />
          </button>
        </div>

        {/* Scrollable Form Body */}
        <div className="flex-1 overflow-y-auto text-gray-700">
          <form onSubmit={submitForm} className="p-4 sm:p-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6">
              
              {/* Insurance Type Dropdown */}
              <div className={`col-span-1 md:col-span-2 ${!insuranceType ? 'mb-2' : 'mb-4'}`}>
                <label className="block text-sm font-medium mb-2 text-gray-700">
                  Select Insurance Type <span className="text-red-500">*</span>
                </label>
                <select
                  value={insuranceType}
                  onChange={(e) => setInsuranceType(e.target.value as any)}
                  className="w-full border border-gray-300 rounded-md p-2 bg-white text-gray-700 focus:ring-2 focus:ring-[#1CADA3] text-sm sm:text-base"
                  required
                >
                  <option value="">-- Select Insurance Type --</option>
                  <option value="residential">Residential Property Insurance</option>
                  <option value="commercial">Commercial Property (Own properties)</option>
                  <option value="stock">Stock Insurance</option>
                </select>
              </div>

              {/* Show fields only when a type is selected */}
              {(insuranceType === "residential" || insuranceType === "commercial") && (
                <>
                  <Input label="Name" placeholder="Enter full name" value={formData.name} onChange={(e: any) => handleChange("name", e.target.value)} required />
                  <div className="col-span-1 md:col-span-2 space-y-4">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <Input label="ADDRESS FOR INSURANCE LOCATION" placeholder="Address" value={formData.address} onChange={(e: any) => handleChange("address", e.target.value)} required />
                      <Input label="PINCODE" maxLength={6} onlyNumber placeholder="6-digit pincode" value={formData.pincode} onChange={(e: any) => handleChange("pincode", e.target.value)} required />
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <Input label="SUM INSURED (₹)" onlyNumber placeholder="Amount" value={formData.sumInsured} onChange={(e: any) => handleChange("sumInsured", e.target.value)} required />
                      <Select label="TENURE" options={["1 Year", "2 Years", "3 Years", "4 Years", "5 Years"]} value={formData.tenure} onChange={(value: string) => handleChange("tenure", value)} required />
                    </div>
                  </div>
                </>
              )}

              {insuranceType === "stock" && (
                <div className="col-span-1 md:col-span-2">
                  <h3 className="text-md font-semibold mb-3 text-[#1CADA3]">STOCK INSURANCE</h3>
                  <div className="mb-6 p-4 border border-gray-300 rounded-md bg-gray-50">
                    <div className="border-2 border-dashed border-gray-300 rounded-md p-6 text-center mb-4">
                      <input type="file" multiple onChange={handleFileUpload} className="hidden" id="stock-excel" accept=".xlsx,.xls,.csv" />
                      <label htmlFor="stock-excel" className="cursor-pointer flex flex-col items-center justify-center text-gray-600">
                        <Upload size={32} className="mb-2 text-[#1CADA3]" />
                        <span className="font-medium">Click to upload Excel file</span>
                      </label>
                    </div>
                    {uploadedFiles.map((file, index) => (
                      <div key={index} className="flex items-center justify-between bg-white p-2 rounded border mb-1">
                        <span className="text-xs truncate">{file.name}</span>
                        <X size={14} className="cursor-pointer text-red-500" onClick={() => setUploadedFiles(prev => prev.filter((_, i) => i !== index))} />
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Footer Buttons / Messages */}
              {insuranceType && (
                <div className="col-span-1 md:col-span-2 flex flex-col items-center gap-3">
                  {error && <p className="text-red-500 text-sm">⚠ Please fill all required fields.</p>}
                  {success && <p className="text-green-500 text-sm">✔ Submitted successfully!</p>}
                  <button type="submit" className="w-full sm:w-48 bg-gradient-to-r from-[#2076C7] to-[#1CADA3] text-white py-2 rounded-md font-medium">
                    Submit
                  </button>
                </div>
              )}
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

// Sub-components
function Input({ label, value, onChange, onlyNumber, maxLength, placeholder, required }: any) {
  const onKeyDown = (e: any) => {
    if (onlyNumber && !["Backspace", "Delete", "ArrowLeft", "ArrowRight", "Tab"].includes(e.key) && !/^[0-9]$/.test(e.key)) e.preventDefault();
  };
  return (
    <div className="w-full">
      <label className="block text-xs font-semibold mb-1 text-gray-600 uppercase tracking-tight">{label} {required && "*"}</label>
      <input value={value} maxLength={maxLength} onKeyDown={onKeyDown} onChange={onChange} placeholder={placeholder} className="w-full border border-gray-300 rounded-md p-2 text-sm focus:ring-1 focus:ring-[#1CADA3] outline-none" required={required} />
    </div>
  );
}

function Select({ label, options, value, onChange, required }: any) {
  return (
    <div className="w-full">
      <label className="block text-xs font-semibold mb-1 text-gray-600 uppercase tracking-tight">{label} {required && "*"}</label>
      <select value={value} onChange={(e) => onChange(e.target.value)} className="w-full border border-gray-300 rounded-md p-2 text-sm focus:ring-1 focus:ring-[#1CADA3] outline-none" required={required}>
        <option value="">Select</option>
        {options.map((opt: string) => <option key={opt} value={opt}>{opt}</option>)}
      </select>
    </div>
  );
}