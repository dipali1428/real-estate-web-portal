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

interface CattleInsuranceFormProps {
  onClose: () => void;
  prefilledData?: {
    name: string;
    email: string;
    mobile: string;
  };
}

export default function CattleInsuranceForm({ onClose, prefilledData }: CattleInsuranceFormProps) {
  const [form, setForm] = useState<any>({
    clientName: prefilledData?.name || "", 
    phone: prefilledData?.mobile || "", 
    email: prefilledData?.email || "", 
    dob: "", 
    farmName: "",
    liveStock: "", 
    breed: "", 
    gender: "", 
    age: "", 
    color: "",
    tagNo: "", 
    financer: "", 
    location: "", 
    lossRatio: ""
  });
  
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [uploadedDocs, setUploadedDocs] = useState<Record<string, boolean>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);

  const handleInputChange = (field: string, value: any) => {
    setForm((prev: any) => ({ ...prev, [field]: value }));
    if (errors[field]) setErrors(p => ({ ...p, [field]: "" }));
  };

  const validate = () => {
    const errs: Record<string, string> = {};
    const req = (f: string, msg: string) => { if (!String(form[f] || "").trim()) errs[f] = msg; };

    req("clientName", "Client Name is required");
    req("email", "Email is required");
    req("dob", "DOB is required");
    req("farmName", "Farm Name is required");
    req("liveStock", "Livestock name is required");
    req("breed", "Breed is required");
    req("gender", "Select gender");
    req("age", "Age is required");
    req("color", "Color is required");
    req("tagNo", "Tag Number is required");
    req("financer", "Financer is required");
    req("location", "Location is required");
    req("lossRatio", "Loss ratio is required");

    if (!form.phone) errs.phone = "Phone is required";
    else if (form.phone.length !== 10) errs.phone = "Must be 10 digits";

    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;
    setIsSubmitting(true);

    try {
      const payload = {
        department: "Insurance",
        product_type: "Cattle Insurance",
        sub_category: "Cattle Insurance",
        client: {
          name: form.clientName,
          mobile: form.phone,
          email: form.email,
        },
        meta: {
          is_self_login: false,
        },
        form_data: {
          dob: form.dob,
          location: form.location,
          farmName: form.farmName,
          liveStock: form.liveStock,
          breed: form.breed,
          gender: form.gender,
          age: form.age,
          color: form.color,
          tagNo: form.tagNo,
          financer: form.financer,
          lossRatio: form.lossRatio
        }
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
          <h2 className="text-lg sm:text-xl font-semibold text-[#1CADA3]">Cattle Insurance Form</h2>
          <button onClick={onClose} className="text-gray-500 hover:text-gray-800 transition-colors"><X size={20} className="sm:w-6 sm:h-6" /></button>
        </div>

        <div className="flex-1 overflow-y-auto p-4 sm:p-6">
          <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6">
            
            {/* Basic Info */}
            <Field label="Client Name" placeholder="Enter full name" {...fieldProps("clientName")} required />
            <Field label="Phone Number" placeholder="10-digit number" onlyNumber maxLength={10} {...fieldProps("phone")} required />
            <Field label="Email ID" type="email" placeholder="Enter email address" {...fieldProps("email")} required />
            <Field label="Date of Birth" type="date" {...fieldProps("dob")} required />

            {/* Farm Info */}
            <Field label="Farm / Company Name" placeholder="Enter farm name" {...fieldProps("farmName")} required />
            <Field label="Name of Live Stock" placeholder="Enter livestock name" {...fieldProps("liveStock")} required />
            <Field label="Breed of Goat / Sheep" placeholder="Enter breed" {...fieldProps("breed")} required />
            <Field label="Gender" type="select" options={["Male", "Female"]} {...fieldProps("gender")} required />
            <Field label="Age" placeholder="Enter age" onlyNumber {...fieldProps("age")} required />
            <Field label="Color" placeholder="Enter color" {...fieldProps("color")} required />
            <Field label="Tag Number" placeholder="Enter tag number" onlyNumber {...fieldProps("tagNo")} required />
            <Field label="Financer Bank Name" placeholder="Enter bank name" {...fieldProps("financer")} required />
            <Field label="Location" placeholder="Enter city/location" {...fieldProps("location")} required />
            <Field label="Loss Ratio Details" placeholder="Enter loss ratio" {...fieldProps("lossRatio")} required />

            <div className="col-span-1 md:col-span-2 mt-4">
              <h3 className="text-md font-semibold mb-3 text-[#1CADA3] border-b pb-2">Documents</h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
                <FileUpload 
                  label="Prev. Year Policy (Optional)" 
                  onUpdate={(has: any) => setUploadedDocs(p => ({ ...p, prevPolicy: has }))} 
                />
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

function Field({ label, value, onChange, type = "text", options, required, placeholder, onlyNumber, maxLength, error, disabled }: any) {
  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (onlyNumber && !["Backspace", "Delete", "ArrowLeft", "ArrowRight", "Tab"].includes(e.key) && !/^[0-9]$/.test(e.key)) e.preventDefault();
  };

  return (
    <div className="w-full relative">
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
              className={`${STYLES.input(!!error)} cursor-pointer ${disabled ? 'bg-gray-50 text-gray-400 border-gray-200' : ''}`}
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
            className={`${STYLES.input(!!error)} ${disabled ? 'bg-gray-50 text-gray-400 border-gray-200' : ''}`} 
          />
        )}
      </div>
      {error && <p className={STYLES.err}>{error}</p>}
    </div>
  );
}

function FileUpload({ label, onUpdate, error }: any) {
  const [file, setFile] = useState<File | null>(null);
  const [fileError, setFileError] = useState("");
  const ref = useRef<HTMLInputElement>(null);
  
  const handleFile = (e: React.ChangeEvent<HTMLInputElement>) => {
    const f = e.target.files?.[0];
    if (!f) return;
    if (f.size > 184320) return setFileError("Max size: 180KB");
    
    setFile(f);
    onUpdate(true);
    setFileError("");
    e.target.value = "";
  };

  return (
    <div className="flex flex-col">
      <label className="text-sm font-medium mb-1 text-gray-700 flex justify-between">
        <span>{label}</span>
        <span className="text-[10px] text-gray-400 font-normal">{"(<180KB)"}</span>
      </label>
      <input type="file" ref={ref} onChange={handleFile} className="hidden" accept="image/*,application/pdf" />
      <div className="flex flex-col gap-2">
        {!file ? (
          <div onClick={() => ref.current?.click()} className={`cursor-pointer border border-dashed rounded-md h-10 flex items-center justify-center gap-2 bg-gray-50 hover:bg-[#1CADA3]/5 transition-colors group ${error ? "border-red-500 bg-red-50" : "border-gray-300 hover:border-[#1CADA3]"}`}>
            <UploadCloud size={16} className={error ? "text-red-400" : "text-gray-400 group-hover:text-[#1CADA3]"} />
            <span className={`text-xs font-medium ${error ? "text-red-500" : "text-gray-500 group-hover:text-[#1CADA3]"}`}>Choose File</span>
          </div>
        ) : (
          <div className="flex items-center justify-between bg-gray-50 border border-gray-200 px-2 py-1.5 rounded-md text-xs">
            <div className="flex items-center truncate max-w-[85%]">
              <CheckCircle className="w-3.5 h-3.5 text-[#1CADA3] mr-2 shrink-0" />
              <span className="truncate text-gray-700">{file.name}</span>
            </div>
            <button type="button" onClick={() => { setFile(null); onUpdate(false); }} className="text-gray-400 hover:text-red-500"><Trash2 size={14} /></button>
          </div>
        )}
      </div>
      {fileError && <span className="text-xs text-red-500 mt-1">{fileError}</span>}
    </div>
  );
}

function SuccessModal({ onClose }: { onClose: () => void }) {
  return (
    <div className="absolute inset-0 z-50 flex items-center justify-center bg-black/60 rounded-xl animate-in fade-in zoom-in duration-200">
      <div className="bg-white p-6 sm:p-8 rounded-2xl shadow-2xl text-center max-w-sm w-[90%]">
        <CheckCircle className="w-16 h-16 text-[#1CADA3] mx-auto mb-4" />
        <h3 className="text-2xl font-bold text-gray-800 mb-2">Success!</h3>
        <p className="text-gray-600 mb-6">Your Cattle Insurance application has been submitted successfully.</p>
        <button onClick={onClose} className="w-full bg-[#1CADA3] text-white py-2.5 rounded-lg hover:bg-[#178e86] font-medium transition-colors">Okay, Got it</button>
      </div>
    </div>
  );
}