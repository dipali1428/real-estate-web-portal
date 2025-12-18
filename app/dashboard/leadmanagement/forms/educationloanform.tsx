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

// Document Constants
const STUDENT_BASE_DOCS = [
  "Aadhar Card", "PAN Card", "Passport / Driving License", "Resident Proof", 
  "Current Address Proof", "Academic Documents", "Offer Letter", 
  "Fee Structure", "Visa / I20 (USA)", "Entrance Exam Score Card"
];

const CO_APPLICANT_DOC_MAP: Record<string, string[]> = {
  "Salaried Person": ["Aadhar Card", "PAN Card", "Driving License", "Passport", "Permanent Address Proof", "Current Address Proof", "3 Months Salary Slip", "6 Months Bank Statement", "Form 16", "2 Years ITR"],
  "Self Employed": ["Aadhar Card", "PAN Card", "Driving License", "Passport", "Permanent Address Proof", "Current Address Proof", "6 Months Bank Statement", "GST Certificate", "Udyog Aadhar", "3 Years ITR", "Shop Act"],
  "Retired": ["Aadhar Card", "PAN Card", "Driving License", "Passport", "Permanent Address Proof", "Current Address Proof", "6 Months Bank Statement", "2 Years ITR", "Pension Slips/Certificate"]
};

interface EducationLoanFormProps {
  onClose: () => void;
}

export default function EducationLoanForm({ onClose }: EducationLoanFormProps) {
  const [form, setForm] = useState({
    clientName: "", phone: "", email: "", dob: "", location: "",
    loanAmount: "", courseName: "", institutionName: "", countryName: "",
    hasOtherLoan: "", otherLoanAmount: "",
    coApplicantType: ""
  });
  
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [uploadedDocs, setUploadedDocs] = useState<Record<string, boolean>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);

  // --- Dynamic Document Lists ---

  // 1. Student Docs (Base + Existing Loan if applicable)
  const studentDocs = useMemo(() => {
    const list = [...STUDENT_BASE_DOCS];
    if (form.hasOtherLoan === "Yes") list.push("Existing Loan Statement");
    return list;
  }, [form.hasOtherLoan]);

  // 2. Co-Applicant Docs (Based on employment type)
  const coApplicantDocs = useMemo(() => {
    return CO_APPLICANT_DOC_MAP[form.coApplicantType] || [];
  }, [form.coApplicantType]);


  // Handle Input Changes & Clear Errors
  const handleInputChange = useCallback((field: string, value: string) => {
    setForm(prev => {
      const next = { ...prev, [field]: value };
      
      // Reset dependent fields
      if (field === "hasOtherLoan" && value === "No") {
        next.otherLoanAmount = "";
      }
      return next;
    });

    // Clear error for this field
    if (errors[field]) {
      setErrors(prev => ({ ...prev, [field]: "" }));
    }
  }, [errors]);

  // Handle Document Status Updates
  // Note: We prefix keys with "student_" or "co_" to distinguish files with same names (e.g. Aadhar)
  const handleDocUpdate = (prefix: string, docName: string, hasFiles: boolean) => {
    const key = `${prefix}_${docName}`;
    setUploadedDocs(prev => ({ ...prev, [key]: hasFiles }));
    
    if (hasFiles && errors[`doc_${key}`]) {
      setErrors(prev => ({ ...prev, [`doc_${key}`]: "" }));
    }
  };

  // Validation Logic
  const validateForm = useCallback((): boolean => {
    const newErrors: Record<string, string> = {};

    // Standard Fields
    if (!form.clientName.trim()) newErrors.clientName = "Student Name is required";
    if (!form.location.trim()) newErrors.location = "Location is required";
    if (!form.dob) newErrors.dob = "Date of Birth is required";
    if (!form.loanAmount) newErrors.loanAmount = "Loan Amount is required";
    
    // Education Specific
    if (!form.courseName.trim()) newErrors.courseName = "Course Name is required";
    if (!form.institutionName.trim()) newErrors.institutionName = "Institution Name is required";
    if (!form.countryName.trim()) newErrors.countryName = "Country Name is required";

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

    // Conditional: Other Loan
    if (!form.hasOtherLoan) newErrors.hasOtherLoan = "Select an option";
    if (form.hasOtherLoan === "Yes" && !form.otherLoanAmount) {
      newErrors.otherLoanAmount = "Existing loan amount is required";
    }

    // Co-Applicant
    if (!form.coApplicantType) newErrors.coApplicantType = "Select employment type";

    // Document Validation (Student)
    studentDocs.forEach(doc => {
      const key = `student_${doc}`;
      if (!uploadedDocs[key]) {
        newErrors[`doc_${key}`] = `Upload ${doc}`;
      }
    });

    // Document Validation (Co-Applicant)
    if (form.coApplicantType) {
      coApplicantDocs.forEach(doc => {
        const key = `co_${doc}`;
        if (!uploadedDocs[key]) {
          newErrors[`doc_${key}`] = `Upload ${doc}`;
        }
      });
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  }, [form, studentDocs, coApplicantDocs, uploadedDocs]);

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
          <h2 className="text-lg sm:text-xl font-semibold text-[#1CADA3]">Education Loan Form</h2>
          <button onClick={onClose} className="text-gray-500 hover:text-gray-800 transition-colors">
            <X size={20} className="sm:w-6 sm:h-6" />
          </button>
        </div>

        {/* Body */}
        <div className="flex-1 overflow-y-auto p-4 sm:p-6">
          <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6">
            
            <Field 
              label="Student Name" 
              value={form.clientName} 
              onChange={(v) => handleInputChange("clientName", v)} 
              placeholder="Enter full name" 
              error={errors.clientName}
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
              label="Loan Amount" 
              value={form.loanAmount} 
              onChange={(v) => handleInputChange("loanAmount", v)} 
              placeholder="Desired amount" 
              onlyNumber 
              error={errors.loanAmount}
              required 
            />

            <Field 
              label="Course Name" 
              value={form.courseName} 
              onChange={(v) => handleInputChange("courseName", v)} 
              placeholder="e.g. MS in CS" 
              error={errors.courseName}
              required 
            />

            <Field 
              label="Institution Name" 
              value={form.institutionName} 
              onChange={(v) => handleInputChange("institutionName", v)} 
              placeholder="University name" 
              error={errors.institutionName}
              required 
            />

            <div className="col-span-1 md:col-span-2">
              <Field 
                label="Country Name" 
                value={form.countryName} 
                onChange={(v) => handleInputChange("countryName", v)} 
                placeholder="Study destination" 
                error={errors.countryName}
                required 
              />
            </div>

            <Field 
              type="select" 
              label="Any Other Loan Obligations?" 
              value={form.hasOtherLoan} 
              onChange={(v) => handleInputChange("hasOtherLoan", v)} 
              options={["Yes", "No"]} 
              error={errors.hasOtherLoan}
              required 
            />
            
            {form.hasOtherLoan === "Yes" && (
              <Field 
                label="Existing Loan Amount" 
                value={form.otherLoanAmount} 
                onChange={(v) => handleInputChange("otherLoanAmount", v)} 
                placeholder="Enter amount" 
                onlyNumber 
                error={errors.otherLoanAmount}
                required 
              />
            )}

            {/* Student Documents */}
            <div className="col-span-1 md:col-span-2 mt-4">
              <h3 className="text-md font-semibold mb-3 text-[#1CADA3] border-b pb-2">
                Student Documents 
                <span className="text-sm font-normal text-gray-500 ml-2">(Max 180KB)</span>
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
                {studentDocs.map((lbl) => (
                  <FileUpload 
                    key={`student_${lbl}`} 
                    label={lbl} 
                    allowMultiple={!["Aadhar Card", "PAN Card"].includes(lbl)} 
                    onUpdate={(hasFiles) => handleDocUpdate("student", lbl, hasFiles)}
                    error={errors[`doc_student_${lbl}`]}
                  />
                ))}
              </div>
            </div>

            {/* Co-Applicant Section */}
            <div className="col-span-1 md:col-span-2 mt-4">
              <Field 
                type="select" 
                label="Co-Applicant Employment Type" 
                value={form.coApplicantType} 
                onChange={(v) => handleInputChange("coApplicantType", v)} 
                options={["Salaried Person", "Self Employed", "Retired"]} 
                error={errors.coApplicantType}
                required 
              />
            </div>

            {form.coApplicantType && (
              <div className="col-span-1 md:col-span-2 mt-2">
                <h3 className="text-md font-semibold mb-3 text-[#1CADA3] border-b pb-2">
                  Co-Applicant Documents ({form.coApplicantType})
                </h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
                  {coApplicantDocs.map((lbl) => (
                    <FileUpload 
                      key={`co_${lbl}`} 
                      label={lbl} 
                      allowMultiple={!["Aadhar Card", "PAN Card"].includes(lbl)} 
                      onUpdate={(hasFiles) => handleDocUpdate("co", lbl, hasFiles)}
                      error={errors[`doc_co_${lbl}`]}
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
        <p className="text-gray-600 mb-6">Your Education Loan application has been submitted successfully.</p>
        <button onClick={onClose} className="w-full bg-[#1CADA3] text-white py-2.5 rounded-lg hover:bg-[#178e86] font-medium transition-colors">
          Okay, Got it
        </button>
      </div>
    </div>
  );
}