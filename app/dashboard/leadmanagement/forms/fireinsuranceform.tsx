"use client";
import { useState } from "react";
import { X, Upload, Home, Building, Package } from "lucide-react";

export default function FIreInsuranceForm({ onClose }: { onClose: () => void }) {
  const [insuranceType, setInsuranceType] = useState<"residential" | "commercial" | "stock" | "">("");
  const [formData, setFormData] = useState({
    // Property details
    name: "",
    dob: "",
    address: "",
    pincode: "",
    sumInsured: "",
    tenure: "",
    fireSafety: "",
    safetyType: "",
    notRobot: false,
  });

  const [selectedCompanies, setSelectedCompanies] = useState<string[]>([]);
  const [error, setError] = useState(false);
  const [success, setSuccess] = useState(false);
  const [uploadedFiles, setUploadedFiles] = useState<File[]>([]);

  // Update form values
  const handleChange = (key: string, value: string | boolean) => {
    setFormData({ ...formData, [key]: value });
  };

  // Toggle insurance companies
  const toggleCompany = (company: string) => {
    setSelectedCompanies(prev =>
      prev.includes(company)
        ? prev.filter(c => c !== company)
        : [...prev, company]
    );
  };

  // Handle file upload for stock insurance
  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (files && files.length > 0) {
      const newFiles = Array.from(files);
      
      // Validate file types (Excel files)
      const validFiles = newFiles.filter(file => 
        file.type.includes('spreadsheet') || 
        file.name.endsWith('.xlsx') || 
        file.name.endsWith('.xls') ||
        file.name.endsWith('.csv')
      );
      
      if (validFiles.length !== newFiles.length) {
        console.warn("Some files were not Excel files and were not added");
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

  // Validate before submit
  const submitForm = (e: React.FormEvent) => {
    e.preventDefault();
    setError(false);
    setSuccess(false);

    // Check if insurance type is selected
    if (!insuranceType) {
      setError(true);
      return;
    }

    // Check if at least one company is selected
    if (selectedCompanies.length === 0) {
      setError(true);
      return;
    }

    // Check not robot
    if (!formData.notRobot) {
      setError(true);
      return;
    }

    // Type-specific validation
    if (insuranceType === "residential" || insuranceType === "commercial") {
      const propertyFields = [
        formData.name,
        formData.dob,
        formData.address,
        formData.pincode,
        formData.sumInsured,
        formData.tenure,
        formData.fireSafety,
      ];
      
      for (const field of propertyFields) {
        if (!field) {
          setError(true);
          return;
        }
      }



    } else if (insuranceType === "stock") {
      // For stock insurance, require at least one Excel file
      if (uploadedFiles.length === 0) {
        setError(true);
        return;
      }
    }

    // If all good
    setSuccess(true);
    
    // Reset form after 2 seconds
    setTimeout(() => {
      setSuccess(false);
      onClose();
    }, 2000);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 p-2 sm:p-4">
      <div className="bg-white rounded-xl shadow-xl w-full max-w-4xl mx-auto h-[95vh] sm:h-[85vh] flex flex-col">
        
        {/* Header */}
        <div className="flex justify-between items-center border-b px-4 sm:px-6 py-3 sm:py-4 flex-shrink-0">
          <h2 className="text-lg sm:text-xl font-semibold text-[#1CADA3]">Fire Insurance Form</h2>
          <button onClick={onClose} className="text-gray-600 hover:text-gray-800">
            <X size={20} className="sm:w-6 sm:h-6" />
          </button>
        </div>

        {/* Scrollable Form Body */}
        <div className="flex-1 overflow-y-auto">
          <form onSubmit={submitForm} className="p-4 sm:p-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6">
              
              {/* Insurance Type Dropdown */}
              <div className="col-span-1 md:col-span-2 mb-4">
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
                  <option value="commercial">Commercial Property Insurance (For own commercial properties)</option>
                  <option value="stock">Stock Insurance</option>
                </select>
              </div>

              {/* Empty State - Shows when no type selected */}
              {!insuranceType && (
                <div className="col-span-1 md:col-span-2">
                  <div className="text-center py-12 px-4 border-2 border-dashed border-gray-300 rounded-lg bg-gray-50">
                    <div className="flex flex-col items-center justify-center space-y-4">
                      <div className="text-gray-400 mb-4">
                        <svg className="w-16 h-16 mx-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                        </svg>
                      </div>
                      <h3 className="text-lg font-medium text-gray-700">Select an Insurance Type</h3>
                      <p className="text-gray-500 max-w-md mx-auto">
                        Choose from Residential, Commercial, or Stock insurance to proceed with the application form.
                      </p>
                      
                      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mt-6">
                        <div className="text-center p-4 border border-gray-200 rounded-lg bg-white">
                          <Home className="w-8 h-8 mx-auto text-[#1CADA3] mb-2" />
                          <h4 className="font-medium text-gray-700">Residential</h4>
                          <p className="text-xs text-gray-500 mt-1">Home & Residential Properties</p>
                        </div>
                        
                        <div className="text-center p-4 border border-gray-200 rounded-lg bg-white">
                          <Building className="w-8 h-8 mx-auto text-[#1CADA3] mb-2" />
                          <h4 className="font-medium text-gray-700">Commercial</h4>
                          <p className="text-xs text-gray-500 mt-1">Office & Business Properties</p>
                        </div>
                        
                        <div className="text-center p-4 border border-gray-200 rounded-lg bg-white">
                          <Package className="w-8 h-8 mx-auto text-[#1CADA3] mb-2" />
                          <h4 className="font-medium text-gray-700">Stock</h4>
                          <p className="text-xs text-gray-500 mt-1">Inventory & Stock Coverage</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {/* Residential/Commercial Property Details */}
              {(insuranceType === "residential" || insuranceType === "commercial") && (
                <>
                  <Input 
                    label="Name"
                    placeholder="Enter your full name"
                    value={formData.name}
                    onChange={(e: any) => handleChange("name", e.target.value)}
                    required
                  />

                  {/* Property Details in requested format */}
                  <div className="col-span-1 md:col-span-2 space-y-4">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <Input 
                        label="ADDRESS FOR INSURANCE LOCATION"
                        placeholder="Enter complete property address"
                        value={formData.address}
                        onChange={(e: any) => handleChange("address", e.target.value)}
                        required
                      />
                      
                      <Input
                        label="PINCODE"
                        type="text"
                        maxLength={6}
                        onlyNumber
                        placeholder="Enter 6-digit pincode"
                        value={formData.pincode}
                        onChange={(e: any) => handleChange("pincode", e.target.value)}
                        required
                      />
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <Input
                        label="SUM INSURED (₹)"
                        type="text"
                        onlyNumber
                        placeholder="Enter sum insured amount"
                        value={formData.sumInsured}
                        onChange={(e: any) => handleChange("sumInsured", e.target.value)}
                        required
                      />

                      <Select
                        label="TENURE"
                        options={["1 Year", "2 Years", "3 Years", "4 Years", "5 Years"]}
                        value={formData.tenure}
                        onChange={(value: string) => handleChange("tenure", value)}
                        required
                      />
                    </div>

                    
                  </div>
                </>
              )}

              {/* Stock Insurance */}
              {insuranceType === "stock" && (
                <div className="col-span-1 md:col-span-2">
                  <h3 className="text-md font-semibold mb-3 text-[#1CADA3]">STOCK INSURANCE</h3>
                  
                  <div className="mb-6 p-4 border border-gray-300 rounded-md bg-gray-50">
                    <div className="flex justify-between items-center mb-3">
                      <label className="font-semibold text-sm text-gray-700">
                        Upload Stock Excel File <span className="text-red-500">*</span>
                      </label>
                      {uploadedFiles.length > 0 && (
                        <button
                          type="button"
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
                        id="stock-excel"
                        accept=".xlsx,.xls,.csv"
                        required={insuranceType === "stock"}
                      />
                      <label
                        htmlFor="stock-excel"
                        className="cursor-pointer flex flex-col items-center justify-center text-gray-600"
                      >
                        <Upload size={32} className="mb-2 text-[#1CADA3]" />
                        <span className="font-medium">Click to upload Excel file</span>
                        <span className="text-sm text-gray-500 mt-1">
                          XLSX, XLS, CSV (Max 10MB each)
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
                              type="button"
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
                </div>
              )}

              {/* Error Message */}
              {error && (
                <div className="col-span-1 md:col-span-2 text-center text-red-600 font-semibold mt-2 text-sm sm:text-base">
                  ⚠ Please fill all required fields before submitting.
                </div>
              )}

              {/* Success Message */}
              {success && (
                <div className="col-span-1 md:col-span-2 text-center text-green-600 font-semibold mt-2 text-sm sm:text-base">
                  ✔ Form submitted successfully!
                </div>
              )}

              {/* Submit Button - Show only when type is selected */}
              {insuranceType && (
                <div className="col-span-1 md:col-span-2 flex justify-center mt-4">
                  <button
                    type="submit"
                    className="w-full sm:w-50 bg-gradient-to-r from-[#2076C7] to-[#1CADA3] text-white py-2 rounded-md hover:from-[#1a68b0] hover:to-[#18998f] transition-colors text-sm sm:text-base"
                  >
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

/* Input Component */
function Input({ label, value, onChange, type = "text", onlyNumber, maxLength, placeholder, required = false }: any) {

  const restrictNumber = (e: any) => {
    if (!onlyNumber) return;

    if (["Backspace", "Delete", "ArrowLeft", "ArrowRight", "Tab"].includes(e.key)) return;

    if (!/^[0-9]$/.test(e.key)) e.preventDefault();
  };

  return (
    <div className="w-full">
      <label className="block text-sm font-medium mb-1 text-gray-700">
        {label} {required && <span className="text-red-500">*</span>}
      </label>
      <input
        value={value}
        type={type}
        maxLength={maxLength}
        onKeyDown={restrictNumber}
        onChange={onChange}
        placeholder={placeholder}
        className="w-full border border-gray-300 rounded-md p-2 bg-white text-gray-700 focus:ring-2 focus:ring-[#1CADA3] text-sm sm:text-base placeholder-gray-400"
        required={required}
      />
    </div>
  );
}

/* Select Component */
function Select({ label, options, value, onChange, required = false }: any) {
  return (
    <div className="w-full">
      <label className="block text-sm font-medium mb-1 text-gray-700">
        {label} {required && <span className="text-red-500">*</span>}
      </label>
      <select
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="w-full border border-gray-300 rounded-md p-2 bg-white text-gray-700 focus:ring-2 focus:ring-[#1CADA3] text-sm sm:text-base"
        required={required}
      >
        <option value="">Select {label}</option>
        {options.map((option: string) => (
          <option key={option} value={option}>{option}</option>
        ))}
      </select>
    </div>
  );
}