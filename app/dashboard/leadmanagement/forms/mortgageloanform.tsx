"use client";
import { useState, useRef, useMemo, useCallback } from "react";
import { X, CheckCircle, UploadCloud, Trash2, Plus, ChevronDown } from "lucide-react";

// Styles shared across components
const STYLES = {
  input: (hasError: boolean) => 
    `w-full border rounded-md p-2 bg-white text-gray-700 outline-none text-sm sm:text-base transition-all placeholder-gray-400 appearance-none ${
      hasError 
        ? "border-red-500 focus:border-red-500 focus:ring-1 focus:ring-red-500" 
        : "border-gray-300 focus:ring-2 focus:ring-[#1CADA3] focus:border-[#1CADA3]"
    }`,
  label: "block text-sm font-medium mb-1 text-gray-700",
  btn: "w-full sm:w-50 bg-gradient-to-r from-[#2076C7] to-[#1CADA3] text-white py-2 rounded-md hover:from-[#1a68b0] hover:to-[#18998f] transition-colors text-sm sm:text-base font-medium shadow-md disabled:opacity-50 disabled:cursor-not-allowed",
  errorText: "text-red-500 text-xs mt-1"
};

const DOC_MAP: Record<string, string[]> = {
  "Salaried Person": ["Aadhar Card", "PAN Card", "3 Months Salary Slip", "2 Years Form 16", "6 Months Bank Statement", "Company ID Card", "Address Proof", "Photograph", "Existing Loan Statement", "Property Cost Sheet / Index II", "Own Contribution Proof"],
  "Self Employed": ["Aadhar Card", "PAN Card", "Udyam Registration", "Shop Act Licence", "GST Certificate", "Last 12 Months GST Returns", "3 Years ITR", "6 Months Bank Statement", "Saving Bank Account", "Business Office Address Proof", "Address Proof", "Photograph", "Existing Loan Statement", "Property Cost Sheet / Index II", "Own Contribution Proof"],
  "Pensioner": ["Aadhar Card", "PAN Card", "PPO (Pension Payment Order)", "1 Year Pension Credit Statement"],
  "Rental": ["Rent Agreement", "1 Year Rent Credit Statement"],
};

interface MortgageLoanFormProps {
  onClose: () => void;
}

export default function MortgageLoanForm({ onClose }: MortgageLoanFormProps) {
  const [form, setForm] = useState({
    name: "", phone: "", email: "", dob: "", location: "",
    loanAmount: "", useOfFund: "", applicationType: "",
    employmentType: "", otherIncomeSource: "", otherIncomeAmount: ""
  });
  
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [uploadedDocs, setUploadedDocs] = useState<Record<string, boolean>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);

  // Dynamic Required Documents List
  const requiredDocs = useMemo(() => {
    if (form.employmentType === "Other") {
      return DOC_MAP[form.otherIncomeSource] || [];
    }
    return DOC_MAP[form.employmentType] || [];
  }, [form.employmentType, form.otherIncomeSource]);

  // Handle Input Changes & Clear Errors
  const handleInputChange = useCallback((field: string, value: string) => {
    setForm(prev => {
      const next = { ...prev, [field]: value };
      
      // Reset dependent fields
      if (field === "employmentType" && value !== "Other") {
        next.otherIncomeSource = "";
        next.otherIncomeAmount = "";
      }
      
      return next;
    });

    if (errors[field]) {
      setErrors(prev => ({ ...prev, [field]: "" }));
    }
  }, [errors]);

  // Handle Document Status Updates
  const handleDocUpdate = (docName: string, hasFiles: boolean) => {
    setUploadedDocs(prev => ({ ...prev, [docName]: hasFiles }));
    if (hasFiles && errors[`doc_${docName}`]) {
      setErrors(prev => ({ ...prev, [`doc_${docName}`]: "" }));
    }
  };

  // Validation Logic
  const validateForm = useCallback((): boolean => {
    const newErrors: Record<string, string> = {};

    // Standard Fields
    if (!form.name.trim()) newErrors.name = "Client Name is required";
    if (!form.location.trim()) newErrors.location = "Location is required";
    if (!form.dob) newErrors.dob = "Date of Birth is required";
    if (!form.loanAmount) newErrors.loanAmount = "Loan Amount is required";
    
    // Mortgage Specific
    if (!form.applicationType) newErrors.applicationType = "Select application type";
    if (!form.useOfFund.trim()) newErrors.useOfFund = "Use of fund is required";
    if (!form.employmentType) newErrors.employmentType = "Employment type is required";

    // Employment Conditional
    if (form.employmentType === "Other") {
      if (!form.otherIncomeSource) newErrors.otherIncomeSource = "Select income source";
      if ((form.otherIncomeSource === "Pensioner" || form.otherIncomeSource === "Rental") && !form.otherIncomeAmount) {
        newErrors.otherIncomeAmount = "Income amount is required";
      }
    }

    // Phone Validation
    if (!form.phone) {
      newErrors.phone = "Phone number is required";
    } else if (form.phone.length !== 10) {
      newErrors.phone = "Phone number must be exactly 10 digits";
    }

    // Email Validation
    if (!form.email) {
      newErrors.email = "Email is required";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) {
      newErrors.email = "Invalid email format";
    }

    // Document Validation
    requiredDocs.forEach(doc => {
      if (!uploadedDocs[doc]) {
        newErrors[`doc_${doc}`] = `Upload ${doc}`;
      }
    });

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  }, [form, requiredDocs, uploadedDocs]);

  // Submit Handler
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    if (!validateForm()) {
      setIsSubmitting(false);
      return;
    }

    // Simulate API call
    try {
      await new Promise(resolve => setTimeout(resolve, 1000));
      setShowSuccess(true);
    } catch (error) {
      alert("Submission failed. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 p-2 sm:p-4 text-gray-700">
      <div className="bg-white rounded-xl shadow-xl w-full max-w-4xl mx-auto h-[95vh] sm:h-[90vh] flex flex-col relative">
        {/* Header */}
        <div className="flex justify-between items-center border-b px-4 sm:px-6 py-3 sm:py-4 shrink-0 bg-white rounded-t-xl">
          <h2 className="text-lg sm:text-xl font-semibold text-[#1CADA3]">Mortgage Loan Form</h2>
          <button onClick={onClose} className="text-gray-500 hover:text-gray-800 transition-colors">
            <X size={20} className="sm:w-6 sm:h-6" />
          </button>
        </div>

        {/* Body */}
        <div className="flex-1 overflow-y-auto p-4 sm:p-6">
          <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6">
            
            <Field 
              label="Client Name" 
              value={form.name} 
              onChange={(v) => handleInputChange("name", v)} 
              placeholder="Enter full name" 
              error={errors.name}
              required 
            />
            
            <Field 
              label="Phone Number" 
              value={form.phone} 
              onChange={(v) => handleInputChange("phone", v)} 
              placeholder="10-digit mobile number" 
              type="tel" 
              maxLength={10} 
              onlyNumber 
              error={errors.phone}
              required 
            />
            
            <Field 
              label="Email ID" 
              value={form.email} 
              onChange={(v) => handleInputChange("email", v)} 
              placeholder="Enter email address" 
              type="email" 
              error={errors.email}
              required 
            />
            
            <Field 
              label="Date of Birth" 
              value={form.dob} 
              onChange={(v) => handleInputChange("dob", v)} 
              type="date" 
              error={errors.dob}
              required 
            />
            
            <Field 
              label="Location" 
              value={form.location} 
              onChange={(v) => handleInputChange("location", v)} 
              placeholder="Enter city" 
              error={errors.location}
              required 
            />

             <Field 
              type="select" 
              label="Application Type" 
              value={form.applicationType} 
              onChange={(v) => handleInputChange("applicationType", v)} 
              options={["Fresh LAP", "BT (Balance Transfer)"]} 
              error={errors.applicationType}
              required 
            />
            
            <Field 
              label="Loan Amount" 
              value={form.loanAmount} 
              onChange={(v) => handleInputChange("loanAmount", v)} 
              placeholder="Desired amount" 
              onlyNumber 
              error={errors.loanAmount}
              required 
            />

            <Field 
              label="Use of Fund" 
              value={form.useOfFund} 
              onChange={(v) => handleInputChange("useOfFund", v)} 
              placeholder="Enter purpose of loan" 
              error={errors.useOfFund}
              required 
            />

             {/* Employment Section */}
             <div className="col-span-1 md:col-span-2 mt-2">
              <Field 
                type="select" 
                label="Employment Type" 
                value={form.employmentType} 
                onChange={(v) => handleInputChange("employmentType", v)} 
                options={["Salaried Person", "Self Employed", "Other"]} 
                error={errors.employmentType}
                required 
              />
            </div>

            {form.employmentType === "Other" && (
              <>
                <Field 
                  type="select" 
                  label="Other Income Source" 
                  value={form.otherIncomeSource} 
                  onChange={(v) => handleInputChange("otherIncomeSource", v)} 
                  options={["Pensioner", "Rental"]} 
                  error={errors.otherIncomeSource}
                  required 
                />
                
                {(form.otherIncomeSource === "Pensioner" || form.otherIncomeSource === "Rental") && (
                   <Field 
                    label="Approx Amount" 
                    value={form.otherIncomeAmount} 
                    onChange={(v) => handleInputChange("otherIncomeAmount", v)} 
                    placeholder="Enter amount" 
                    onlyNumber 
                    error={errors.otherIncomeAmount}
                    required 
                  />
                )}
              </>
            )}

            {/* Documents Section */}
            {requiredDocs.length > 0 && (
              <div className="col-span-1 md:col-span-2 mt-4">
                <h3 className="text-md font-semibold mb-3 text-[#1CADA3] border-b pb-2">
                  Upload Documents 
                  <span className="text-sm font-normal text-gray-500 ml-2">
                    (for {form.employmentType === "Other" ? form.otherIncomeSource : form.employmentType})
                  </span>
                </h3>
                
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
                  {requiredDocs.map((lbl) => (
                    <FileUpload 
                      key={lbl} 
                      label={lbl} 
                      allowMultiple={!["Aadhar Card", "PAN Card"].includes(lbl)} 
                      onUpdate={(hasFiles) => handleDocUpdate(lbl, hasFiles)}
                      error={errors[`doc_${lbl}`]}
                    />
                  ))}
                </div>
              </div>
            )}

            {/* Submit Button */}
            <div className="col-span-1 md:col-span-2 flex justify-center mt-6 pb-2">
              <button 
                type="submit" 
                disabled={isSubmitting}
                className={STYLES.btn}
              >
                {isSubmitting ? "Submitting..." : "Submit Application"}
              </button>
            </div>
          </form>
        </div>
        
        {showSuccess && <SuccessModal onClose={onClose} />}
      </div>
    </div>
  );
}

// --- Reusable Sub-Components ---

interface FieldProps {
  label: string;
  value: string;
  onChange: (val: string) => void;
  type?: string;
  options?: string[];
  required?: boolean;
  placeholder?: string;
  onlyNumber?: boolean;
  maxLength?: number;
  error?: string;
}

function Field({ label, value, onChange, type = "text", options, required, placeholder, onlyNumber, maxLength, error }: FieldProps) {
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => onChange(e.target.value);
  
  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (onlyNumber) {
      if (!["Backspace", "Delete", "ArrowLeft", "ArrowRight", "Tab"].includes(e.key) && !/^[0-9]$/.test(e.key)) {
        e.preventDefault();
      }
    }
  };

  return (
    <div className="w-full relative">
      <label className={STYLES.label}>
        {label} {required && <span className="text-red-500">*</span>}
      </label>
      
      {type === "select" ? (
        <div className="relative">
          <select 
            value={value} 
            onChange={handleChange} 
            className={`${STYLES.input(!!error)} cursor-pointer`}
          >
            <option value="">Select {label}</option>
            {options?.map((opt) => <option key={opt} value={opt}>{opt}</option>)}
          </select>
          <ChevronDown className="absolute right-3 top-[1.1rem] text-gray-400 pointer-events-none" size={16} />
        </div>
      ) : (
        <input 
          type={type} 
          value={value} 
          onChange={handleChange} 
          onKeyDown={handleKeyDown} 
          maxLength={maxLength} 
          placeholder={placeholder} 
          className={STYLES.input(!!error)} 
        />
      )}
      
      {error && <p className={STYLES.errorText}>{error}</p>}
    </div>
  );
}

interface FileUploadProps {
  label: string;
  allowMultiple: boolean;
  onUpdate: (hasFiles: boolean) => void;
  error?: string;
}

function FileUpload({ label, allowMultiple, onUpdate, error }: FileUploadProps) {
  const [files, setFiles] = useState<File[]>([]);
  const [fileError, setFileError] = useState("");
  const ref = useRef<HTMLInputElement>(null);
  
  const updateFiles = (newFiles: File[]) => {
    setFiles(newFiles);
    onUpdate(newFiles.length > 0);
  };

  const handleFiles = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newFiles = Array.from(e.target.files || []);
    if (!newFiles.length) return;
    
    // Size check
    if (newFiles.some(f => f.size > 184320)) {
      setFileError("Max file size: 180KB");
      return;
    }
    
    // Limit check
    if (allowMultiple && files.length + newFiles.length > 8) {
      setFileError("Limit: 8 files.");
      return;
    }
    
    updateFiles(allowMultiple ? [...files, ...newFiles] : [newFiles[0]]);
    setFileError(""); 
    e.target.value = "";
  };

  const removeFile = (idx: number) => {
    updateFiles(files.filter((_, i) => i !== idx));
  };

  return (
    <div className="flex flex-col">
      <label className="text-sm font-medium mb-1 text-gray-700 flex justify-between">
        <span>{label} <span className="text-red-500">*</span></span>
        <span className="text-[10px] text-gray-400 font-normal">{allowMultiple ? "(Multiple, <180KB)" : "(<180KB)"}</span>
      </label>
      
      <input type="file" ref={ref} multiple={allowMultiple} onChange={handleFiles} className="hidden" accept="image/*,application/pdf" />
      
      <div className={`flex flex-col gap-2`}>
        {files.length === 0 && (
          <div 
            onClick={() => ref.current?.click()} 
            className={`cursor-pointer border border-dashed rounded-md h-10 flex items-center justify-center gap-2 bg-gray-50 hover:bg-[#1CADA3]/5 transition-colors group
              ${error ? "border-red-500 bg-red-50" : "border-gray-300 hover:border-[#1CADA3]"}`}
          >
            <UploadCloud size={16} className={error ? "text-red-400" : "text-gray-400 group-hover:text-[#1CADA3]"} />
            <span className={`text-xs font-medium ${error ? "text-red-500" : "text-gray-500 group-hover:text-[#1CADA3]"}`}>
               {error ? "Upload Required" : "Choose File"}
            </span>
          </div>
        )}

        {files.map((f, i) => (
          <div key={i} className="flex items-center justify-between bg-gray-50 border border-gray-200 px-2 py-1.5 rounded-md text-xs">
            <div className="flex items-center truncate max-w-[85%]">
              <CheckCircle className="w-3.5 h-3.5 text-[#1CADA3] mr-2 shrink-0" />
              <span className="truncate text-gray-700">{f.name}</span>
            </div>
            <button type="button" onClick={() => removeFile(i)} className="text-gray-400 hover:text-red-500 transition-colors">
              <Trash2 size={14} />
            </button>
          </div>
        ))}

        {/* Add more / Change file actions */}
        {(allowMultiple && files.length > 0 && files.length < 8) && (
          <button type="button" onClick={() => ref.current?.click()} className="flex justify-center gap-1 text-[11px] font-medium text-[#1CADA3] border border-[#1CADA3] border-dashed rounded-md py-1.5 hover:bg-[#1CADA3]/10">
            <Plus size={12} /> Add more
          </button>
        )}
        
        {(!allowMultiple && files.length > 0) && (
          <button type="button" onClick={() => ref.current?.click()} className="text-[10px] text-blue-600 hover:underline text-right">
            Change file
          </button>
        )}
      </div>
      
      {fileError && <span className="text-[10px] text-red-500 mt-0.5 font-medium">{fileError}</span>}
      {error && !fileError && <span className="text-xs text-red-500 mt-1">{error}</span>}
    </div>
  );
}

function SuccessModal({ onClose }: { onClose: () => void }) {
  return (
    <div className="absolute inset-0 z-50 flex items-center justify-center bg-black/60 rounded-xl animate-in fade-in zoom-in duration-200">
      <div className="bg-white p-6 sm:p-8 rounded-2xl shadow-2xl text-center max-w-sm w-[90%]">
        <CheckCircle className="w-16 h-16 text-[#1CADA3] mx-auto mb-4" />
        <h3 className="text-2xl font-bold text-gray-800 mb-2">Success!</h3>
        <p className="text-gray-600 mb-6">Your Mortgage Loan application has been submitted successfully.</p>
        <button onClick={onClose} className="w-full bg-[#1CADA3] text-white py-2.5 rounded-lg hover:bg-[#178e86] font-medium transition-colors">
          Okay, Got it
        </button>
      </div>
    </div>
  );
}