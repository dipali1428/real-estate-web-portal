"use client";
import { useState, FormEvent } from "react";
import { X, Upload, FileText } from "lucide-react";

// Types
interface FormData {
  vehicleType: string;
  clientName: string;
  vehicleReg: string;
  vehicleModel: string;
  idv: string;
  requirement: string[];
  claimTaken: string;
}

interface FormErrors {
  [key: string]: string;
}

interface MotorInsuranceFormProps {
  onClose: () => void;
}

// Main Component
export default function MotorInsuranceForm({ onClose }: MotorInsuranceFormProps) {
  const [formData, setFormData] = useState<FormData>({
    vehicleType: "",
    clientName: "",
    vehicleReg: "",
    vehicleModel: "",
    idv: "",
    requirement: [],
    claimTaken: ""
  });
  
  const [hasPrevPolicy, setHasPrevPolicy] = useState("");
  const [errors, setErrors] = useState<FormErrors>({});
  const [files, setFiles] = useState<File[]>([]);
  const [prevPolicyFile, setPrevPolicyFile] = useState<File | null>(null);
  const [notRobot, setNotRobot] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleInputChange = (field: keyof FormData, value: string | string[]) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    // Clear error when user starts typing
    if (errors[field]) {
      setErrors(prev => ({ ...prev, [field]: "" }));
    }
  };

  const handleCheckboxChange = (option: string, isChecked: boolean) => {
    const currentValues = formData.requirement || [];
    let newValues: string[];
    
    if (isChecked) {
      newValues = [...currentValues, option];
    } else {
      newValues = currentValues.filter(item => item !== option);
    }
    
    handleInputChange('requirement', newValues);
  };

  const validateForm = (): boolean => {
    const newErrors: FormErrors = {};

    // Required fields validation
    if (!formData.vehicleType.trim()) newErrors.vehicleType = "This field is required";
    if (!formData.clientName.trim()) newErrors.clientName = "This field is required";
    if (!formData.vehicleReg.trim()) newErrors.vehicleReg = "This field is required";
    if (!formData.claimTaken.trim()) newErrors.claimTaken = "This field is required";
    
    // Requirement validation - at least one checkbox should be selected
    if (formData.requirement.length === 0) {
      newErrors.requirement = "Select at least one requirement";
    }

    // IDV validation - should be numeric
    if (formData.idv && !/^\d+$/.test(formData.idv)) {
      newErrors.idv = "IDV must be a number";
    }

    if (!hasPrevPolicy) {
      newErrors.hasPrevPolicy = "Select an option";
    }

    if (hasPrevPolicy === "Yes" && !prevPolicyFile) {
      newErrors.prevPolicy = "Upload previous year policy";
    }

    if (!notRobot) {
      newErrors.notRobot = "You must confirm you are not a robot";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    if (!validateForm()) {
      setIsSubmitting(false);
      return;
    }

    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      alert("Form submitted successfully!");
      onClose();
    } catch (error) {
      alert("Submission failed. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 text-gray-700">
      <div className="bg-white rounded-xl shadow-xl w-full max-w-4xl mx-4 overflow-y-auto max-h-[90vh]">

        {/* Header */}
        <div className="flex justify-between items-center border-b px-6 py-4 sticky top-0 bg-white z-10">
          <h2 className="text-xl font-semibold text-[#1CADA3]">Motor Insurance Form</h2>
          <button 
            onClick={onClose} 
            className="text-gray-500 hover:text-gray-800 transition-colors"
            aria-label="Close form"
          >
            <X size={22} />
          </button>
        </div>

        {/* Body */}
        <div className="p-6 max-h-[80vh] overflow-y-auto">
          <form className="grid grid-cols-1 md:grid-cols-2 gap-6" onSubmit={handleSubmit}>

            {/* Form Fields */}
            <Select 
              id="vehicleType"
              label="Type of Vehicle" 
              value={formData.vehicleType}
              onChange={(value) => handleInputChange('vehicleType', value)}
              options={["Private Vehicle", "2 Wheeler", "GCV", "PCV", "Misc-D"]} 
              error={errors.vehicleType}
              required
            />

            <Input 
              id="clientName"
              label="Client Name" 
              value={formData.clientName}
              onChange={(value) => handleInputChange('clientName', value)}
              placeholder="Enter Client Name" 
              error={errors.clientName}
              required
            />

            <Input 
              id="vehicleReg"
              label="Vehicle Registration" 
              value={formData.vehicleReg}
              onChange={(value) => handleInputChange('vehicleReg', value)}
              placeholder="Enter Vehicle Registration" 
              error={errors.vehicleReg}
              required
            />

            <Input 
              id="vehicleModel"
              label="Vehicle Make & Model" 
              value={formData.vehicleModel}
              onChange={(value) => handleInputChange('vehicleModel', value)}
              placeholder="Enter Vehicle Make & Model" 
              error={errors.vehicleModel}
            />

            <Input 
              id="idv"
              label="Vehicle IDV" 
              value={formData.idv}
              onChange={(value) => handleInputChange('idv', value)}
              placeholder="Enter Vehicle IDV" 
              error={errors.idv}
              type="number"
            />

            {/* Checkbox Group for Requirement */}
            <CheckboxGroup 
              id="requirement"
              label="Requirement" 
              value={formData.requirement}
              onChange={(value) => handleInputChange('requirement', value)}
              options={["Comprehensive", "Own Damage", "Third Party Damage"]} 
              error={errors.requirement}
              required
            />

            <Select 
              id="claimTaken"
              label="Claim Taken" 
              value={formData.claimTaken}
              onChange={(value) => handleInputChange('claimTaken', value)}
              options={["Yes", "No"]} 
              error={errors.claimTaken}
              required
            />

            {/* Previous Policy */}
            <div className="md:col-span-2">
              <label className="block text-sm font-medium mb-2">Prev. Year Policy Available?</label>
              <select
                className={`w-full border rounded-md p-3 transition-colors ${
                  errors.hasPrevPolicy ? 'border-red-500' : 'border-gray-300'
                } focus:border-[#1CADA3] focus:ring-1 focus:ring-[#1CADA3] outline-none`}
                value={hasPrevPolicy}
                onChange={(e) => {
                  setHasPrevPolicy(e.target.value);
                  if (errors.hasPrevPolicy) {
                    setErrors(prev => ({ ...prev, hasPrevPolicy: "" }));
                  }
                }}
              >
                <option value="">Select Option</option>
                <option value="Yes">Yes</option>
                <option value="No">No</option>
              </select>
              {errors.hasPrevPolicy && (
                <p className="text-red-500 text-xs mt-1">{errors.hasPrevPolicy}</p>
              )}
            </div>

            {/* File Uploads */}
            <MultiFileUpload 
              label="RC Documents (Multiple Upload)" 
              files={files} 
              setFiles={setFiles} 
            />

            {/* Previous Policy File */}
            {hasPrevPolicy === "Yes" && (
              <div className="md:col-span-2">
                <label className="block text-sm font-medium mb-2">Upload Prev. Year Policy</label>
                <div className="border-2 border-dashed border-gray-300 rounded-md p-4 text-center hover:border-[#1CADA3] transition-colors">
                  <input
                    type="file"
                    onChange={(e) => {
                      const file = e.target.files?.[0] || null;
                      setPrevPolicyFile(file);
                      if (errors.prevPolicy) {
                        setErrors(prev => ({ ...prev, prevPolicy: "" }));
                      }
                    }}
                    className="hidden"
                    id="prevPolicyUpload"
                    accept=".pdf,.jpg,.jpeg,.png"
                  />
                  <label htmlFor="prevPolicyUpload" className="cursor-pointer">
                    <Upload className="mx-auto mb-2 text-gray-400" size={24} />
                    <p className="text-sm text-gray-600">
                      {prevPolicyFile ? prevPolicyFile.name : "Click to upload previous policy"}
                    </p>
                    <p className="text-xs text-gray-500 mt-1">PDF, JPG, PNG up to 10MB</p>
                  </label>
                </div>
                {errors.prevPolicy && (
                  <p className="text-red-500 text-xs mt-1">{errors.prevPolicy}</p>
                )}
              </div>
            )}
            {/* Submit Button */}
            <div className="md:col-span-2 flex justify-center pt-4">
              <button
                type="submit"
                disabled={isSubmitting}
                className="bg-[#1CADA3] text-white px-8 py-3 rounded-md font-medium hover:bg-[#16948d] disabled:opacity-50 disabled:cursor-not-allowed transition-colors min-w-[120px]"
              >
                {isSubmitting ? "Submitting..." : "Submit"}
              </button>
            </div>

          </form>
        </div>
      </div>
    </div>
  );
}

// Input Component
interface InputProps {
  id: string;
  label: string;
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  error?: string;
  type?: string;
  required?: boolean;
}

function Input({ id, label, value, onChange, placeholder, error, type = "text", required }: InputProps) {
  return (
    <div>
      <label htmlFor={id} className="block text-sm font-medium mb-2">
        {label} {required && <span className="text-red-500">*</span>}
      </label>
      <input
        id={id}
        type={type}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        className={`w-full border rounded-md p-3 transition-colors ${
          error ? 'border-red-500' : 'border-gray-300'
        } focus:border-[#1CADA3] focus:ring-1 focus:ring-[#1CADA3] outline-none`}
      />
      {error && <p className="text-red-500 text-xs mt-1">{error}</p>}
    </div>
  );
}

// Select Component
interface SelectProps {
  id: string;
  label: string;
  value: string;
  onChange: (value: string) => void;
  options: string[];
  error?: string;
  required?: boolean;
}

function Select({ id, label, value, onChange, options, error, required }: SelectProps) {
  return (
    <div>
      <label htmlFor={id} className="block text-sm font-medium mb-2">
        {label} {required && <span className="text-red-500">*</span>}
      </label>
      <select
        id={id}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className={`w-full border rounded-md p-3 transition-colors ${
          error ? 'border-red-500' : 'border-gray-300'
        } focus:border-[#1CADA3] focus:ring-1 focus:ring-[#1CADA3] outline-none`}
      >
        <option value="">Select {label}</option>
        {options.map((opt) => (
          <option key={opt} value={opt}>{opt}</option>
        ))}
      </select>
      {error && <p className="text-red-500 text-xs mt-1">{error}</p>}
    </div>
  );
}

// Checkbox Group Component
interface CheckboxGroupProps {
  id: string;
  label: string;
  value: string[];
  onChange: (value: string[]) => void;
  options: string[];
  error?: string;
  required?: boolean;
}

function CheckboxGroup({ id, label, value = [], onChange, options, error, required }: CheckboxGroupProps) {
  const handleCheckboxChange = (option: string, isChecked: boolean) => {
    const currentValues = value || [];
    let newValues: string[];
    
    if (isChecked) {
      newValues = [...currentValues, option];
    } else {
      newValues = currentValues.filter(item => item !== option);
    }
    
    onChange(newValues);
  };

  return (
    <div className="md:col-span-2">
      <label className="block text-sm font-medium mb-2">
        {label} {required && <span className="text-red-500">*</span>}
      </label>
      
      <div className="space-y-3">
        {options.map((option) => (
          <div key={option} className="flex items-center">
            <input
              type="checkbox"
              id={`${id}-${option}`}
              checked={value?.includes(option) || false}
              onChange={(e) => handleCheckboxChange(option, e.target.checked)}
              className="w-4 h-4 text-[#1CADA3] focus:ring-[#1CADA3] border-gray-300 rounded"
            />
            <label 
              htmlFor={`${id}-${option}`} 
              className="ml-3 text-sm text-gray-700 cursor-pointer"
            >
              {option}
            </label>
          </div>
        ))}
      </div>
      
      {error && <p className="text-red-500 text-xs mt-1">{error}</p>}
    </div>
  );
}

// Multiple File Upload Component
interface MultiFileUploadProps {
  label: string;
  files: File[];
  setFiles: (files: File[]) => void;
}

function MultiFileUpload({ label, files, setFiles }: MultiFileUploadProps) {
  const handleFileAdd = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files) return;
    const newFiles = Array.from(e.target.files);
    setFiles([...files, ...newFiles]);
  };

  const removeFile = (index: number) => {
    setFiles(files.filter((_, i) => i !== index));
  };

  return (
    <div className="md:col-span-2">
      <label className="block text-sm font-medium mb-2">{label}</label>
      
      <div className="border-2 border-dashed border-gray-300 rounded-md p-4 hover:border-[#1CADA3] transition-colors">
        <input 
          type="file" 
          multiple 
          onChange={handleFileAdd} 
          className="hidden" 
          id="fileUpload"
          accept=".pdf,.jpg,.jpeg,.png"
        />
        <label htmlFor="fileUpload" className="cursor-pointer flex flex-col items-center">
          <Upload className="mb-2 text-gray-400" size={24} />
          <p className="text-sm text-gray-600">Click to upload files or drag and drop</p>
          <p className="text-xs text-gray-500 mt-1">PDF, JPG, PNG up to 10MB each</p>
        </label>
      </div>

      {/* File List */}
      {files.length > 0 && (
        <ul className="mt-4 space-y-2">
          {files.map((file: File, index: number) => (
            <li 
              key={index} 
              className="flex items-center justify-between bg-gray-50 p-3 rounded-md border"
            >
              <div className="flex items-center gap-2">
                <FileText size={16} className="text-gray-400" />
                <span className="text-sm text-gray-700">{file.name}</span>
                <span className="text-xs text-gray-500">
                  ({(file.size / 1024 / 1024).toFixed(2)} MB)
                </span>
              </div>
              <button 
                type="button"
                onClick={() => removeFile(index)} 
                className="text-red-500 hover:text-red-700 text-sm font-medium transition-colors"
              >
                Remove
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}