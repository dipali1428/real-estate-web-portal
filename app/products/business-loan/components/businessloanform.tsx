"use client";
import { useState, useRef, useMemo } from "react";
import { X, CheckCircle, UploadCloud, Trash2, Plus, ChevronDown } from "lucide-react";
import { AuthService } from "@/app/services/authService";

const STYLES = {
  input: (err: boolean) => `w-full border rounded-md p-2 bg-white text-gray-700 outline-none text-sm sm:text-base transition-all placeholder-gray-400 appearance-none ${err ? "border-red-500 focus:ring-1 focus:ring-red-500" : "border-gray-300 focus:ring-2 focus:ring-[#1CADA3] focus:border-[#1CADA3]"}`,
  label: "block text-sm font-medium mb-1 text-gray-700",
  btn: "w-full sm:w-50 bg-gradient-to-r from-[#2076C7] to-[#1CADA3] text-white py-2 rounded-md hover:from-[#1a68b0] hover:to-[#18998f] transition-colors text-sm sm:text-base font-medium shadow-md disabled:opacity-50 disabled:cursor-not-allowed",
  err: "text-red-500 text-xs mt-1"
};

const BASE_DOCS = ["Aadhar Card", "PAN Card", "Udyam Aadhar Registration", "Shop Act Licence", "1 Year Banking Statement", "Address Proof", "ITR 3 Years", "Photograph"];
const BIZ_TYPES = ["Proprietorship", "Partnership", "Pvt. Ltd."];

interface BusinessLoanFormProps {
  onClose: () => void;
  prefilledData?: {
    name: string;
    email: string;
    mobile: string;
  };
}

export default function BusinessLoanForm({ onClose, prefilledData }: BusinessLoanFormProps) {
  const [form, setForm] = useState<Record<string, string>>({
    name: prefilledData?.name || "", 
    phone: prefilledData?.mobile || "", 
    email: prefilledData?.email || "", 
    dob: "", 
    location: "", 
    loanAmount: "",
    deduction: "", 
    companyName: "", 
    companyAddress: "", 
    businessStartDate: "",
    loanType: "", 
    hasOtherLoan: "", 
    otherLoanAmount: ""
  });

  const [errors, setErrors] = useState<Record<string, string>>({});
  const [uploadedDocs, setUploadedDocs] = useState<Record<string, boolean>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);

  const requiredDocs = useMemo(() => 
    form.hasOtherLoan === "Yes" ? [...BASE_DOCS, "Existing Loan Statement"] : BASE_DOCS, 
  [form.hasOtherLoan]);

  const handleInputChange = (field: string, value: string) => {
    setForm(prev => ({ 
      ...prev, [field]: value, 
      ...(field === "hasOtherLoan" && value === "No" ? { otherLoanAmount: "" } : {}) 
    }));
    if (errors[field]) setErrors(prev => ({ ...prev, [field]: "" }));
  };

  const validate = () => {
    const errs: Record<string, string> = {};
    const req = (f: string, msg: string) => { if (!form[f]?.trim()) errs[f] = msg; };

    req("loanType", "Select business type");
    req("businessStartDate", "Start date is required");
    req("name", "Client Name is required");
    req("location", "Location is required");
    req("dob", "Date of Birth is required");
    req("loanAmount", "Loan Amount is required");
    req("companyName", "Company Name is required");
    req("deduction", "Deduction details are required");
    req("companyAddress", "Company Address is required");

    if (!form.phone || form.phone.length !== 10) errs.phone = "Invalid phone number";
    if (!form.email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) errs.email = "Invalid email";

    if (!form.hasOtherLoan) errs.hasOtherLoan = "Select an option";
    if (form.hasOtherLoan === "Yes" && !form.otherLoanAmount) errs.otherLoanAmount = "Required";

    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;
    setIsSubmitting(true);

    try {
      const payload = {
        department: "Loan",
        product_type: "Business Loan",
        sub_category: "Business Loan",
        client: {
          name: form.name,
          mobile: form.phone,
          email: form.email,
        },
        meta: { is_self_login: false },
        form_data: { ...form }
      };

      await AuthService.createLead(payload);
      setShowSuccess(true);
    } catch (err) {
      console.error("Submission error:", err);
      alert("Something went wrong. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const fieldProps = (name: string) => ({
    value: form[name],
    onChange: (v: string) => handleInputChange(name, v),
    error: errors[name]
  });

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 p-2 sm:p-4 text-gray-700">
      <div className="bg-white rounded-xl shadow-xl w-full max-w-4xl mx-auto h-[95vh] sm:h-[90vh] flex flex-col relative">
        <div className="flex justify-between items-center border-b px-4 sm:px-6 py-3 sm:py-4 shrink-0 bg-white rounded-t-xl">
          <h2 className="text-lg sm:text-xl font-semibold text-[#1CADA3]">Business Loan Form</h2>
          <button onClick={onClose} className="text-gray-500 hover:text-gray-800 transition-colors"><X size={20} /></button>
        </div>

        <div className="flex-1 overflow-y-auto p-4 sm:p-6">
          <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6">
            <Field label="Type of Business" type="select" options={BIZ_TYPES} {...fieldProps("loanType")} required />
            <Field label="Business Start Date" type="date" {...fieldProps("businessStartDate")} required />
            <Field label="Client Name" placeholder="Enter full name" {...fieldProps("name")} required />
            <Field label="Phone Number" placeholder="10-digit mobile number" type="tel" maxLength={10} onlyNumber {...fieldProps("phone")} required />
            <Field label="Email ID" placeholder="Enter email address" type="email" {...fieldProps("email")} required />
            <Field label="Date of Birth" type="date" {...fieldProps("dob")} required />
            <Field label="Location" placeholder="Enter city" {...fieldProps("location")} required />
            <Field label="Loan Amount" placeholder="Desired amount" onlyNumber {...fieldProps("loanAmount")} required />
            <Field label="Company Name" placeholder="Enter company name" {...fieldProps("companyName")} required />
            <Field label="Deduction Details" placeholder="Business details" {...fieldProps("deduction")} required />
            
            <div className="col-span-1 md:col-span-2">
              <Field label="Company Address" placeholder="Enter company address" {...fieldProps("companyAddress")} required />
            </div>

            <Field label="Any Other Loan Obligations?" type="select" options={["Yes", "No"]} {...fieldProps("hasOtherLoan")} required />
            {form.hasOtherLoan === "Yes" && <Field label="Existing Loan Amount" placeholder="Enter amount" onlyNumber {...fieldProps("otherLoanAmount")} required />}

            <div className="col-span-1 md:col-span-2 mt-4">
              <h3 className="text-md font-semibold mb-3 text-[#1CADA3] border-b pb-2">Upload Documents</h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
                {requiredDocs.map(lbl => (
                  <FileUpload key={lbl} label={lbl} allowMultiple={!["Aadhar Card", "PAN Card"].includes(lbl)} onUpdate={(has: any) => {
                    setUploadedDocs(p => ({ ...p, [lbl]: has }));
                    if (has) setErrors(p => ({ ...p, [`doc_${lbl}`]: "" }));
                  }} error={errors[`doc_${lbl}`]} />
                ))}
              </div>
            </div>

            <div className="col-span-1 md:col-span-2 flex justify-center mt-6 pb-2">
              <button type="submit" disabled={isSubmitting} className={STYLES.btn}>{isSubmitting ? "Submitting..." : "Submit Application"}</button>
            </div>
          </form>
        </div>
        
        {showSuccess && <SuccessModal onClose={onClose} />}
      </div>
    </div>
  );
}

function Field({ label, value, onChange, type = "text", options, required, placeholder, onlyNumber, maxLength, error }: any) {
  return (
    <div className="w-full relative">
      <label className={STYLES.label}>{label} {required && <span className="text-red-500">*</span>}</label>
      <div className="relative">
        {type === "select" ? (
          <>
            <select value={value} onChange={e => onChange(e.target.value)} className={`${STYLES.input(!!error)} cursor-pointer font-medium text-[#1CADA3]`}>
              <option value="">Select {label}</option>
              {options?.map((opt: string) => <option key={opt} value={opt} className="text-gray-700">{opt}</option>)}
            </select>
            <ChevronDown className="absolute right-3 top-3 text-gray-400 pointer-events-none" size={16} />
          </>
        ) : (
          <input type={type} value={value} onChange={e => onChange(e.target.value)} onKeyDown={e => {
            if (onlyNumber && !["Backspace", "Delete", "ArrowLeft", "ArrowRight", "Tab"].includes(e.key) && !/^[0-9]$/.test(e.key)) e.preventDefault();
          }} maxLength={maxLength} placeholder={placeholder} className={STYLES.input(!!error)} />
        )}
      </div>
      {error && <p className={STYLES.err}>{error}</p>}
    </div>
  );
}

function FileUpload({ label, allowMultiple, onUpdate, error }: any) {
  const [files, setFiles] = useState<File[]>([]);
  const [fileError, setFileError] = useState("");
  const ref = useRef<HTMLInputElement>(null);
  
  const handleFiles = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newFiles = Array.from(e.target.files || []);
    if (!newFiles.length) return;
    if (newFiles.some(f => f.size > 184320)) return setFileError("Max file size: 180KB");
    const updated = allowMultiple ? [...files, ...newFiles] : [newFiles[0]];
    setFiles(updated);
    onUpdate(true);
    setFileError("");
    e.target.value = "";
  };

  const removeFile = (idx: number) => {
    const updated = files.filter((_, i) => i !== idx);
    setFiles(updated);
    onUpdate(updated.length > 0);
  };

  return (
    <div className="flex flex-col">
      <label className="text-sm font-medium mb-1 text-gray-700 flex justify-between">
        <span>{label}</span>
        <span className="text-[10px] text-gray-400 font-normal">{allowMultiple ? "(Multiple, <180KB)" : "(<180KB)"}</span>
      </label>
      <input type="file" ref={ref} multiple={allowMultiple} onChange={handleFiles} className="hidden" accept="image/*,application/pdf" />
      <div className="flex flex-col gap-2">
        {files.length === 0 && (
          <div onClick={() => ref.current?.click()} className={`cursor-pointer border border-dashed rounded-md h-10 flex items-center justify-center gap-2 bg-gray-50 hover:bg-[#1CADA3]/5 transition-colors group ${error ? "border-red-500 bg-red-50" : "border-gray-300 hover:border-[#1CADA3]"}`}>
            <UploadCloud size={16} className={error ? "text-red-400" : "text-gray-400 group-hover:text-[#1CADA3]"} />
            <span className={`text-xs font-medium ${error ? "text-red-500" : "text-gray-500 group-hover:text-[#1CADA3]"}`}>{error ? "Upload Required" : "Choose File"}</span>
          </div>
        )}
        {files.map((f, i) => (
          <div key={i} className="flex items-center justify-between bg-gray-50 border border-gray-200 px-2 py-1.5 rounded-md text-xs">
            <div className="flex items-center truncate max-w-[85%]">
              <CheckCircle className="w-3.5 h-3.5 text-[#1CADA3] mr-2 shrink-0" />
              <span className="truncate text-gray-700">{f.name}</span>
            </div>
            <button type="button" onClick={() => removeFile(i)} className="text-gray-400 hover:text-red-500"><Trash2 size={14} /></button>
          </div>
        ))}
        {allowMultiple && files.length > 0 && files.length < 8 && (
          <button type="button" onClick={() => ref.current?.click()} className="flex justify-center gap-1 text-[11px] font-medium text-[#1CADA3] border border-[#1CADA3] border-dashed rounded-md py-1.5 hover:bg-[#1CADA3]/10"><Plus size={12} /> Add more</button>
        )}
      </div>
      {(fileError || (error && !fileError)) && <span className="text-xs text-red-500 mt-1">{fileError || error}</span>}
    </div>
  );
}

function SuccessModal({ onClose }: { onClose: () => void }) {
  return (
    <div className="absolute inset-0 z-50 flex items-center justify-center bg-black/60 rounded-xl animate-in fade-in zoom-in duration-200">
      <div className="bg-white p-6 sm:p-8 rounded-2xl shadow-2xl text-center max-w-sm w-[90%] mx-auto">
        <CheckCircle className="w-16 h-16 text-[#1CADA3] mx-auto mb-4" />
        <h3 className="text-2xl font-bold text-gray-800 mb-2">Success!</h3>
        <p className="text-gray-600 mb-6">Your Business Loan application has been submitted successfully.</p>
        <button onClick={onClose} className="w-full bg-[#1CADA3] text-white py-2.5 rounded-lg hover:bg-[#178e86] font-medium transition-colors">Okay, Got it</button>
      </div>
    </div>
  );
}