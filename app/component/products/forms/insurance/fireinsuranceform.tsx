"use client";
import { useState, useRef, useMemo } from "react";
import { X, CheckCircle, UploadCloud, Trash2, ChevronDown } from "lucide-react";
import { AuthService } from "@/app/services/authService";

const STYLES = {
  input: (err: boolean) => `w-full border rounded-md p-2 bg-white text-gray-700 outline-none text-sm sm:text-base transition-all placeholder-gray-400 appearance-none ${err ? "border-red-500 focus:ring-1 focus:ring-red-500" : "border-gray-300 focus:ring-2 focus:ring-[#1CADA3] focus:border-[#1CADA3]"}`,
  label: "block text-sm font-medium mb-1 text-gray-700",
  btn: "w-full sm:w-50 bg-gradient-to-r from-[#2076C7] to-[#1CADA3] text-white py-2 rounded-md hover:from-[#1a68b0] hover:to-[#18998f] transition-colors text-sm sm:text-base font-medium shadow-md disabled:opacity-50 disabled:cursor-not-allowed",
  err: "text-red-500 text-xs mt-1"
};

const INSURANCE_TYPES = [
  { label: "Residential Property Insurance", value: "residential" },
  { label: "Commercial Property (Own properties)", value: "commercial" },
  { label: "Stock Insurance", value: "stock" }
];

const TENURES = ["1 Year", "2 Years", "3 Years", "4 Years", "5 Years"];

interface FireInsuranceFormProps {
  onClose: () => void;
  prefilledData?: {
    name: string;
    email: string;
    mobile: string;
  };
}

export default function FireInsuranceForm({ onClose, prefilledData }: FireInsuranceFormProps) {
  const [form, setForm] = useState<Record<string, string>>({
    insuranceType: "", 
    name: prefilledData?.name || "", // Prefilled from verification
    address: "", 
    pincode: "", 
    sumInsured: "", 
    tenure: ""
  });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [uploadedDocs, setUploadedDocs] = useState<Record<string, boolean>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);

  const isStock = form.insuranceType === "stock";
  const isProperty = form.insuranceType === "residential" || form.insuranceType === "commercial";

  const requiredDocs = useMemo(() => {
    if (isStock) return ["Stock Inventory Sheet"];
    return [];
  }, [isStock]);

  const handleInputChange = (field: string, value: string) => {
    setForm(prev => ({ ...prev, [field]: value }));
    if (errors[field]) setErrors(p => ({ ...p, [field]: "" }));
  };

  const validate = () => {
    const errs: Record<string, string> = {};
    const req = (f: string, msg: string) => { if (!form[f]?.trim()) errs[f] = msg; };

    req("insuranceType", "Select insurance type");

    if (isProperty) {
      req("name", "Name is required");
      req("address", "Address is required");
      if (!form.pincode) errs.pincode = "Pincode is required";
      else if (form.pincode.length !== 6) errs.pincode = "Must be 6 digits";
      req("sumInsured", "Sum insured is required");
      req("tenure", "Select tenure");
    }

    if (isStock) {
      requiredDocs.forEach(d => { if (!uploadedDocs[d]) errs[`doc_${d}`] = `Upload ${d}`; });
    }

    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;
    setIsSubmitting(true);

    try {
      const formData: Record<string, any> = {
        insuranceType: form.insuranceType
      };

      if (isProperty) {
        formData.address = form.address;
        formData.pincode = form.pincode;
        formData.sumInsured = form.sumInsured;
        formData.tenure = form.tenure;
      }

      const payload = {
        department: "Insurance",
        product_type: "Fire Insurance",
        sub_category: "Fire Insurance",
        client: {
          name: isStock ? (prefilledData?.name || "NA") : form.name,
          mobile: prefilledData?.mobile || "NA",
          email: prefilledData?.email || "NA",
        },
        meta: {
          is_self_login: false,
        },
        form_data: formData
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
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 p-2 sm:p-4 text-gray-700 overflow-y-auto">
      <div className="bg-white rounded-xl shadow-xl w-full max-w-4xl mx-auto my-auto flex flex-col relative max-h-[90vh]">
        <div className="flex justify-between items-center border-b px-4 sm:px-6 py-3 sm:py-4 shrink-0 bg-white rounded-t-xl">
          <h2 className="text-lg sm:text-xl font-semibold text-[#1CADA3]">Fire Insurance Form</h2>
          <button onClick={onClose} className="text-gray-500 hover:text-gray-800 transition-colors"><X size={20} className="sm:w-6 sm:h-6" /></button>
        </div>

        <div className="flex-1 overflow-y-auto p-4 sm:p-6">
          <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6">
            <div className="col-span-1 md:col-span-2">
              <Field
                label="Select Insurance Type"
                type="select"
                options={INSURANCE_TYPES.map(t => t.label)}
                value={INSURANCE_TYPES.find(t => t.value === form.insuranceType)?.label || ""}
                onChange={(label: string) => {
                  const val = INSURANCE_TYPES.find(t => t.label === label)?.value || "";
                  handleInputChange("insuranceType", val);
                }}
                error={errors.insuranceType}
                required
              />
            </div>

            {isProperty && (
              <>
                <div className="col-span-1 md:col-span-2">
                  <Field label="Name / Entity Name" placeholder="Enter full name" {...fieldProps("name")} required />
                </div>
                <Field label="Pincode" placeholder="6-digit pincode" onlyNumber maxLength={6} {...fieldProps("pincode")} required />
                <Field label="Sum Insured (₹)" placeholder="Enter amount" onlyNumber {...fieldProps("sumInsured")} required />
                <div className="col-span-1 md:col-span-2">
                  <Field label="Address for Insurance Location" placeholder="Enter full property address" {...fieldProps("address")} required />
                </div>
                <Field label="Tenure" type="select" options={TENURES} {...fieldProps("tenure")} required />
              </>
            )}

            {isStock && (
              <div className="col-span-1 md:col-span-2 mt-2">
                <h3 className="text-md font-semibold mb-3 text-[#1CADA3] border-b pb-2">Stock Insurance Documents</h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
                  <FileUpload
                    label="Stock Inventory Sheet"
                    accept=".xlsx,.xls,.csv,.pdf"
                    allowMultiple={true}
                    onUpdate={(has: any) => {
                      setUploadedDocs(p => ({ ...p, ["Stock Inventory Sheet"]: has }));
                      if (has) setErrors(p => ({ ...p, [`doc_Stock Inventory Sheet`]: "" }));
                    }}
                    error={errors[`doc_Stock Inventory Sheet`]}
                  />
                </div>
              </div>
            )}

            {form.insuranceType && (
              <div className="col-span-1 md:col-span-2 flex justify-center mt-6 pb-2">
                <button type="submit" disabled={isSubmitting} className={STYLES.btn}>
                  {isSubmitting ? "Submitting..." : "Submit Application"}
                </button>
              </div>
            )}
          </form>
        </div>
        {showSuccess && <SuccessModal onClose={onClose} />}
      </div>
    </div>
  );
}

function Field({ label, value, onChange, type = "text", options, required, placeholder, onlyNumber, maxLength, error, disabled }: any) {
  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (onlyNumber && !["Backspace", "Delete", "ArrowLeft", "ArrowRight", "Tab"].includes(e.key) && !/^[0-9]$/.test(e.key)) e.preventDefault();
  };

  return (
    <div className={`w-full relative ${disabled ? 'opacity-70' : ''}`}>
      <label className={`${STYLES.label} ${disabled ? 'text-gray-400' : ''}`}>
        {label} {required && !disabled && <span className="text-red-500">*</span>}
      </label>
      <div className="relative">
        {type === "select" ? (
          <>
            <select
              value={value}
              onChange={e => onChange(e.target.value)}
              disabled={disabled}
              className={`${STYLES.input(!!error)} cursor-pointer ${disabled ? 'bg-gray-50 text-gray-400' : ''}`}
            >
              <option value="">{placeholder || `Select ${label}`}</option>
              {options?.map((opt: string) => <option key={opt} value={opt}>{opt}</option>)}
            </select>
            <ChevronDown className={`absolute right-3 top-3 ${disabled ? 'text-gray-300' : 'text-gray-400'} pointer-events-none`} size={16} />
          </>
        ) : (
          <input
            type={type}
            value={value}
            onChange={e => onChange(e.target.value)}
            onKeyDown={handleKeyDown}
            maxLength={maxLength}
            placeholder={placeholder}
            disabled={disabled}
            className={`${STYLES.input(!!error)} ${disabled ? 'bg-gray-50 text-gray-400' : ''}`}
          />
        )}
      </div>
      {error && <p className={STYLES.err}>{error}</p>}
    </div>
  );
}

function FileUpload({ label, allowMultiple, accept, onUpdate, error }: any) {
  const [files, setFiles] = useState<File[]>([]);
  const [fileError, setFileError] = useState("");
  const ref = useRef<HTMLInputElement>(null);

  const handleFiles = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newFiles = Array.from(e.target.files || []);
    if (!newFiles.length) return;
    if (newFiles.some(f => f.size > 5 * 1024 * 1024)) return setFileError("Max size: 5MB");
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
        <span>{label} <span className="text-red-500">*</span></span>
        <span className="text-[10px] text-gray-400 font-normal">
          {allowMultiple ? "(Multiple, <5MB)" : "(<5MB)"}
        </span>
      </label>
      <input type="file" ref={ref} multiple={allowMultiple} onChange={handleFiles} className="hidden" accept={accept || "image/*,application/pdf"} />
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
      </div>
      {(fileError || (error && !fileError)) && <span className="text-xs text-red-500 mt-1">{fileError || error}</span>}
    </div>
  );
}

function SuccessModal({ onClose }: { onClose: () => void }) {
  return (
    <div className="absolute inset-0 z-50 flex items-center justify-center bg-black/60 rounded-xl animate-in fade-in zoom-in duration-200">
      <div className="bg-white p-6 sm:p-8 rounded-2xl shadow-2xl text-center max-w-sm w-[90%]">
        <CheckCircle className="w-16 h-16 text-[#1CADA3] mx-auto mb-4" />
        <h3 className="text-2xl font-bold text-gray-800 mb-2">Success!</h3>
        <p className="text-gray-600 mb-6">Your Fire Insurance application has been submitted successfully.</p>
        <button onClick={onClose} className="w-full bg-[#1CADA3] text-white py-2.5 rounded-lg hover:bg-[#178e86] font-medium transition-colors">Okay, Got it</button>
      </div>
    </div>
  );
}