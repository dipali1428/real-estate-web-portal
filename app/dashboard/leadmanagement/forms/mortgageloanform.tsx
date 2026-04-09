"use client";
import { useState, useRef, useMemo } from "react";
import { 
  X, CheckCircle, UploadCloud, Trash2, ChevronDown, 
  ShieldCheck, Loader2, ArrowRight, ArrowLeft, AlertCircle 
} from "lucide-react";
import { DashboardService } from "../../../services/dashboardService";

// --- Constants & Styles ---
const STYLES = {
  input: (err: boolean) => `w-full border rounded-md p-2 bg-white text-gray-700 outline-none text-sm sm:text-base transition-all placeholder-gray-400 appearance-none ${err ? "border-red-500 focus:ring-1 focus:ring-red-500" : "border-gray-300 focus:ring-2 focus:ring-[#1CADA3] focus:border-[#1CADA3]"}`,
  label: "block text-sm font-medium mb-1 text-gray-700",
  // Fixed button width and padding to prevent text breaking
  btn: "w-full sm:w-auto sm:px-10 bg-gradient-to-r from-[#2076C7] to-[#1CADA3] text-white py-2.5 rounded-md hover:from-[#1a68b0] hover:to-[#18998f] transition-colors text-sm sm:text-base font-medium shadow-md disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2 whitespace-nowrap",
  secondaryBtn: "flex items-center gap-2 text-gray-500 hover:text-gray-700 font-medium transition-colors",
  err: "text-red-500 text-xs mt-1"
};

const DOC_REGISTRY: Record<string, { key: string; label: string; multiple: boolean }> = {
  "Aadhar Card": { key: "AADHAAR", label: "Aadhar Card", multiple: false },
  "PAN Card": { key: "PAN", label: "PAN Card", multiple: false },
  "3 Months Salary Slip": { key: "SALARY_SLIP", label: "3 Months Salary Slip", multiple: true },
  "2 Years Form 16": { key: "FORM16", label: "2 Years Form 16", multiple: true },
  "6 Months Bank Statement": { key: "BANK_STATEMENT", label: "6 Months Bank Statement", multiple: true },
  "Company ID Card": { key: "COMPANY_ID", label: "Company ID Card", multiple: false },
  "Address Proof": { key: "ADDRESS_PROOF", label: "Address Proof", multiple: false },
  "Photograph": { key: "PHOTOGRAPH", label: "Photograph", multiple: false },
  "Existing Loan Statement": { key: "EXISTING_LOAN", label: "Existing Loan Statement", multiple: true },
  "Property Cost Sheet / Index II": { key: "PROPERTY_COST_SHEET", label: "Property Cost Sheet / Index II", multiple: true },
  "Own Contribution Proof": { key: "CONTRIBUTION_PROOF", label: "Own Contribution Proof", multiple: true },
  "Udyam Registration": { key: "UDYAM", label: "Udyam Registration", multiple: false },
  "Shop Act Licence": { key: "SHOP_ACT", label: "Shop Act Licence", multiple: false },
  "GST Certificate": { key: "GST_CERTIFICATE", label: "GST Certificate", multiple: false },
  "Last 12 Months GST Returns": { key: "GST_RETURNS", label: "Last 12 Months GST Returns", multiple: true },
  "3 Years ITR": { key: "ITR", label: "3 Years ITR", multiple: true },
  "Saving Bank Account": { key: "SAVING_BANK_STMT", label: "Saving Bank Account", multiple: true },
  "Business Office Address Proof": { key: "OFFICE_ADDRESS", label: "Business Office Address Proof", multiple: false },
  "PPO (Pension Payment Order)": { key: "PPO", label: "PPO (Pension Payment Order)", multiple: false },
  "1 Year Pension Credit Statement": { key: "PENSION_STMT", label: "1 Year Pension Credit Statement", multiple: true },
  "Rent Agreement": { key: "RENT_AGREEMENT", label: "Rent Agreement", multiple: true },
  "1 Year Rent Credit Statement": { key: "RENT_STMT", label: "1 Year Rent Credit Statement", multiple: true },
};

const DOC_MAP: Record<string, string[]> = {
  "Salaried Person": ["Aadhar Card", "PAN Card", "3 Months Salary Slip", "2 Years Form 16", "6 Months Bank Statement", "Company ID Card", "Address Proof", "Photograph", "Existing Loan Statement", "Property Cost Sheet / Index II", "Own Contribution Proof"],
  "Self Employed": ["Aadhar Card", "PAN Card", "Udyam Registration", "Shop Act Licence", "GST Certificate", "Last 12 Months GST Returns", "3 Years ITR", "6 Months Bank Statement", "Saving Bank Account", "Business Office Address Proof", "Address Proof", "Photograph", "Existing Loan Statement", "Property Cost Sheet / Index II", "Own Contribution Proof"],
  "Pensioner": ["Aadhar Card", "PAN Card", "PPO (Pension Payment Order)", "1 Year Pension Credit Statement"],
  "Rental": ["Rent Agreement", "1 Year Rent Credit Statement"],
};

type QueuedFile = {
    file: File;
    docKey: string;
    label: string;
    status: "pending" | "uploading" | "success" | "error";
};

export default function MortgageLoanForm({ onClose }: { onClose: () => void }) {
  const [step, setStep] = useState(1);
  const [leadId, setLeadId] = useState<string | null>(null);
  const [form, setForm] = useState<Record<string, string>>({
    isSelfLogin: "No", refId: "", fileId: "", bankName: "",
    rmName: "", rmContact: "", rmEmail: "",
    name: "", phone: "", email: "", dob: "", location: "",
    loanAmount: "", useOfFund: "", applicationType: "",
    employmentType: "", otherIncomeSource: "", otherIncomeAmount: ""
  });

  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [statusMsg, setStatusMsg] = useState("");
  const [showSuccess, setShowSuccess] = useState(false);
  const [fileQueue, setFileQueue] = useState<QueuedFile[]>([]);

  const isSelfLoginActive = form.isSelfLogin === "Yes";

  const requiredDocsList = useMemo(() => {
    if (isSelfLoginActive) return [];
    const labels = DOC_MAP[form.employmentType === "Other" ? form.otherIncomeSource : form.employmentType] || [];
    return labels.map(label => DOC_REGISTRY[label]).filter(Boolean);
  }, [form.employmentType, form.otherIncomeSource, isSelfLoginActive]);

  const handleInputChange = (field: string, value: string) => {
    // Email Lowercase Logic
    const processedValue = (field === "email" || field === "rmEmail") ? value.toLowerCase() : value;
    
    setForm(prev => ({
      ...prev, [field]: processedValue,
      ...(field === "employmentType" && value !== "Other" ? { otherIncomeSource: "", otherIncomeAmount: "" } : {})
    }));
    if (errors[field]) setErrors(p => ({ ...p, [field]: "" }));
  };

  const validateStep1 = () => {
    const errs: Record<string, string> = {};
    const req = (f: string, msg: string) => { if (!form[f]?.trim()) errs[f] = msg; };

    if (isSelfLoginActive) {
      req("fileId", "File Number is required");
      req("name", "Client Name is required");
      req("location", "Location is required");
      req("loanAmount", "Loan Amount is required");
      req("bankName", "Bank Name is required");
      req("rmName", "RM Name is required");
      if (!form.rmContact || form.rmContact.length !== 10) errs.rmContact = "Invalid contact";
      if (!form.rmEmail || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.rmEmail)) errs.rmEmail = "Invalid email";
    } else {
      req("name", "Client Name is required");
      req("location", "Location is required");
      req("dob", "Date of Birth is required");
      req("loanAmount", "Loan Amount is required");
      req("applicationType", "Select type");
      req("useOfFund", "Required");
      req("employmentType", "Required");
      if (!form.phone || form.phone.length !== 10) errs.phone = "Invalid phone";
      if (!form.email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) errs.email = "Invalid email";
      if (form.employmentType === "Other") {
        if (!form.otherIncomeSource) errs.otherIncomeSource = "Select source";
        if (["Pensioner", "Rental"].includes(form.otherIncomeSource) && !form.otherIncomeAmount) errs.otherIncomeAmount = "Required";
      }
    }
    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const handleCreateLead = async () => {
    if (!validateStep1()) return;
    setIsSubmitting(true);
    setStatusMsg("Creating Application...");

    try {
      const payload = {
        department: "Loan",
        product_type: "Mortgage Loan",
        sub_category: "Mortgage Loan",
        client: { 
            name: form.name, 
            mobile: isSelfLoginActive ? form.rmContact : form.phone, 
            email: isSelfLoginActive ? form.rmEmail : form.email 
        },
        meta: { is_self_login: isSelfLoginActive },
        form_data: isSelfLoginActive ? {
          refId: form.refId, fileId: form.fileId, bankName: form.bankName, rmName: form.rmName, location: form.location, loanAmount: form.loanAmount,
        } : {
          dob: form.dob, location: form.location, loanAmount: form.loanAmount, useOfFund: form.useOfFund,
          applicationType: form.applicationType, employmentType: form.employmentType,
          otherIncomeSource: form.otherIncomeSource || "N/A", otherIncomeAmount: form.otherIncomeAmount || "0"
        }
      };

      const result = await DashboardService.createLead(payload);
      if (!result?.detail_lead_id) throw new Error("ID Missing");
      setLeadId(result.detail_lead_id);

      if (isSelfLoginActive || requiredDocsList.length === 0) {
        setShowSuccess(true);
      } else {
        setStep(2);
      }
    } catch (err) {
      console.error(err);
      setStatusMsg("Failed to create application.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleFinalSubmission = async () => {
    if (fileQueue.length === 0) { setShowSuccess(true); return; }
    setIsSubmitting(true);
    
    for (let i = 0; i < fileQueue.length; i++) {
        const currentItem = fileQueue[i];
        setStatusMsg(`Uploading ${i + 1}/${fileQueue.length}...`);
        setFileQueue(prev => prev.map((item, idx) => idx === i ? { ...item, status: "uploading" } : item));

        const formData = new FormData();
        formData.append("leadDbId", leadId!);
        formData.append("documents", currentItem.file);
        formData.append("metadata", JSON.stringify([{ key: currentItem.docKey, label: currentItem.label }]));

        try {
            await DashboardService.uploadLeadDocument(leadId!, formData);
            setFileQueue(prev => prev.map((item, idx) => idx === i ? { ...item, status: "success" } : item));
        } catch (err) {
            setFileQueue(prev => prev.map((item, idx) => idx === i ? { ...item, status: "error" } : item));
            setStatusMsg("Upload failed.");
            setIsSubmitting(false);
            return; 
        }
    }
    setIsSubmitting(false);
    setShowSuccess(true);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 p-2 sm:p-4 text-gray-700">
      <div className="bg-white rounded-xl shadow-xl w-full max-w-4xl mx-auto h-[95vh] sm:h-[90vh] flex flex-col relative overflow-hidden">
        
        <div className="flex justify-between items-center border-b px-4 sm:px-6 py-3 sm:py-4 bg-white">
          <div>
            <h2 className="text-lg sm:text-xl font-semibold text-[#1CADA3]">Mortgage Loan Application</h2>
            <p className="text-xs text-gray-400">Step {step} of 2</p>
          </div>
          <button onClick={onClose} className="text-gray-500 hover:text-gray-800"><X size={20} /></button>
        </div>

        <div className="flex-1 overflow-y-auto p-4 sm:p-6 bg-gray-50/30">
          {step === 1 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6">
              <div className="col-span-1 md:col-span-2 bg-[#1CADA3]/5 border-l-4 border-[#1CADA3] p-4 rounded-r-lg shadow-sm mb-2">
                <div className="flex items-center gap-2 mb-2">
                  <ShieldCheck className="text-[#1CADA3]" size={20} />
                  <span className="text-sm font-bold text-[#1CADA3] uppercase tracking-wide">Direct Bank Submission</span>
                </div>
                <Field label="Self Login to Bank?" type="select" options={["No", "Yes"]} value={form.isSelfLogin} onChange={(v:any)=>handleInputChange("isSelfLogin", v)} error={errors.isSelfLogin} required />
              </div>

              {isSelfLoginActive ? (
                <>
                  <Field label="Ref ID" placeholder="Enter Reference ID" value={form.refId} onChange={(v:any)=>handleInputChange("refId", v)} error={errors.refId} />
                  <Field label="File Number" placeholder="Enter File Number" value={form.fileId} onChange={(v:any)=>handleInputChange("fileId", v)} error={errors.fileId} required />
                  <Field label="Client Name" placeholder="Enter full name" value={form.name} onChange={(v:any)=>handleInputChange("name", v)} error={errors.name} required />
                  <Field label="Location" placeholder="Enter city" value={form.location} onChange={(v:any)=>handleInputChange("location", v)} error={errors.location} required />
                  <Field label="Loan Amount" placeholder="Desired amount" onlyNumber value={form.loanAmount} onChange={(v:any)=>handleInputChange("loanAmount", v)} error={errors.loanAmount} required />
                  <Field label="Bank Name" placeholder="Enter bank name" value={form.bankName} onChange={(v:any)=>handleInputChange("bankName", v)} error={errors.bankName} required />
                  <Field label="RM/SM Name (Bank)" placeholder="Enter RM name" value={form.rmName} onChange={(v:any)=>handleInputChange("rmName", v)} error={errors.rmName} required />
                  <Field label="RM/SM Contact (Bank)" placeholder="10-digit number" type="tel" maxLength={10} onlyNumber value={form.rmContact} onChange={(v:any)=>handleInputChange("rmContact", v)} error={errors.rmContact} required />
                  <div className="col-span-1 md:col-span-2"><Field label="RM/SM Email (Bank)" placeholder="Enter RM email" type="email" value={form.rmEmail} onChange={(v:any)=>handleInputChange("rmEmail", v)} error={errors.rmEmail} required /></div>
                </>
              ) : (
                <>
                  <Field label="Client Name" placeholder="Enter full name" value={form.name} onChange={(v:any)=>handleInputChange("name", v)} error={errors.name} required />
                  <Field label="Phone Number" placeholder="10-digit mobile number" type="tel" maxLength={10} onlyNumber value={form.phone} onChange={(v:any)=>handleInputChange("phone", v)} error={errors.phone} required />
                  <Field label="Email ID" placeholder="Enter email address" type="email" value={form.email} onChange={(v:any)=>handleInputChange("email", v)} error={errors.email} required />
                  <Field label="Date of Birth" type="date" value={form.dob} onChange={(v:any)=>handleInputChange("dob", v)} error={errors.dob} required />
                  <Field label="Location" placeholder="Enter city" value={form.location} onChange={(v:any)=>handleInputChange("location", v)} error={errors.location} required />
                  <Field label="Application Type" type="select" options={["Fresh LAP", "BT (Balance Transfer)"]} value={form.applicationType} onChange={(v:any)=>handleInputChange("applicationType", v)} error={errors.applicationType} required />
                  <Field label="Loan Amount" placeholder="Desired amount" onlyNumber value={form.loanAmount} onChange={(v:any)=>handleInputChange("loanAmount", v)} error={errors.loanAmount} required />
                  <Field label="Use of Fund" placeholder="Enter purpose of loan" value={form.useOfFund} onChange={(v:any)=>handleInputChange("useOfFund", v)} error={errors.useOfFund} required />
                  <div className="col-span-1 md:col-span-2 mt-2"><Field label="Employment Type" type="select" options={["Salaried Person", "Self Employed", "Other"]} value={form.employmentType} onChange={(v:any)=>handleInputChange("employmentType", v)} error={errors.employmentType} required /></div>
                  {form.employmentType === "Other" && (
                    <>
                      <Field label="Other Income Source" type="select" options={["Pensioner", "Rental"]} value={form.otherIncomeSource} onChange={(v:any)=>handleInputChange("otherIncomeSource", v)} error={errors.otherIncomeSource} required />
                      {["Pensioner", "Rental"].includes(form.otherIncomeSource) && <Field label="Approx Amount" placeholder="Enter amount" onlyNumber value={form.otherIncomeAmount} onChange={(v:any)=>handleInputChange("otherIncomeAmount", v)} error={errors.otherIncomeAmount} required />}
                    </>
                  )}
                </>
              )}
            </div>
          ) : (
            <div className="animate-in fade-in slide-in-from-bottom-4 duration-300">
                <div className="mb-6 p-4 bg-blue-50 border border-blue-100 rounded-lg flex items-start gap-3">
                    <CheckCircle className="text-blue-500 mt-1 shrink-0" size={18} />
                    <div>
                        <p className="text-sm font-semibold text-blue-900">Application Created Successfully!</p>
                        <p className="text-xs text-blue-700">Lead ID: <span className="font-mono font-bold">{leadId}</span>. Select documents and click Submit.</p>
                    </div>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                    {requiredDocsList.map(doc => (
                      <FileSelectionCard key={doc.key} docKey={doc.key} label={doc.label} allowMultiple={doc.multiple}
                        selectedFiles={fileQueue.filter(f => f.docKey === doc.key)}
                        onAdd={(files: File[]) => {
                            const newEntries = files.map(f => ({ file: f, docKey: doc.key, label: doc.label, status: "pending" as const }));
                            setFileQueue(prev => [...prev.filter(f => !(f.docKey === doc.key && !doc.multiple)), ...newEntries]);
                        }}
                        onRemove={(name: string) => setFileQueue(prev => prev.filter(f => f.file.name !== name))}
                      />
                    ))}
                </div>
            </div>
          )}
        </div>

        <div className="border-t p-4 sm:px-6 flex items-center justify-between bg-white">
           {step === 2 && !isSubmitting && <button onClick={() => setStep(1)} className={STYLES.secondaryBtn}><ArrowLeft size={18} /> Back</button>}
           <div className="flex-1" />
           <button onClick={step === 1 ? handleCreateLead : handleFinalSubmission} disabled={isSubmitting} className={STYLES.btn}>
             {isSubmitting ? <><Loader2 className="animate-spin" size={20} /> {statusMsg}</> : 
              step === 1 ? <>Create Lead & Upload Documents <ArrowRight size={18} /></> : "Complete Submission"}
           </button>
        </div>
        {showSuccess && <SuccessModal onClose={onClose} />}
      </div>
    </div>
  );
}

// --- Helper Components ---

function Field({ label, value, onChange, type = "text", options, required, placeholder, onlyNumber, maxLength, error }: any) {
  return (
    <div className="w-full relative">
      <label className={STYLES.label}>{label} {required && <span className="text-red-500">*</span>}</label>
      <div className="relative">
        {type === "select" ? (
          <>
            <select value={value} onChange={e => onChange(e.target.value)} className={`${STYLES.input(!!error)} cursor-pointer`}>
              <option value="">Select {label}</option>
              {options?.map((opt: string) => <option key={opt} value={opt}>{opt}</option>)}
            </select>
            <ChevronDown className="absolute right-3 top-3 text-gray-400 pointer-events-none" size={16} />
          </>
        ) : (
          <input type={type} value={value} onChange={e => onChange(e.target.value)} onKeyDown={e => {
            if (onlyNumber) {
              // 1. Allow navigation and control keys
              const isControlKey = ["Backspace", "Delete", "ArrowLeft", "ArrowRight", "Tab", "Enter", "Escape"].includes(e.key);
              
              // 2. Allow Ctrl/Command shortcuts (A, C, V, X)
              const isShortcut = (e.ctrlKey === true || e.metaKey === true) && ["a", "c", "v", "x"].includes(e.key.toLowerCase());

              // 3. Allow numbers
              const isNumber = /^[0-9]$/.test(e.key);

              // If it's none of the above, prevent the character from being typed
              if (!isControlKey && !isShortcut && !isNumber) {
                e.preventDefault();
              }
            }
          }} maxLength={maxLength} placeholder={placeholder} className={STYLES.input(!!error)} />
        )}
      </div>
      {error && <p className={STYLES.err}>{error}</p>}
    </div>
  );
}

function FileSelectionCard({ label, docKey, allowMultiple, selectedFiles, onAdd, onRemove }: any) {
    const inputRef = useRef<HTMLInputElement>(null);
    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      const files = Array.from(e.target.files || []);
      if (files.length > 0) onAdd(allowMultiple ? files : [files[0]]);
      if (inputRef.current) inputRef.current.value = "";
    };
  
    return (
      <div className="flex flex-col bg-white p-3 rounded-lg border border-gray-100 shadow-sm">
        <label className="text-xs font-bold text-gray-500 uppercase mb-2 truncate">{label}</label>
        <input type="file" ref={inputRef} multiple={allowMultiple} onChange={handleFileChange} className="hidden" accept="image/*,application/pdf" />
        <div className="space-y-2">
          <button type="button" onClick={() => inputRef.current?.click()} className="w-full border border-dashed rounded-md py-2 flex flex-col items-center justify-center bg-gray-50 hover:bg-[#1CADA3]/5 border-gray-300 hover:border-[#1CADA3] group transition-colors">
            <div className="flex items-center gap-2">
              <UploadCloud size={16} className="text-gray-400 group-hover:text-[#1CADA3]" />
              <span className="text-xs font-medium text-gray-500 group-hover:text-[#1CADA3]">{selectedFiles.length > 0 ? "Add More" : "Choose File"}</span>
            </div>
          </button>
          {selectedFiles.map((f: any, idx: number) => (
            <div key={idx} className={`flex items-center justify-between border px-2 py-1.5 rounded-md text-xs ${f.status === 'error' ? 'bg-red-50 border-red-200' : 'bg-white border-gray-100'}`}>
              <div className="flex items-center truncate gap-2 max-w-[80%]">
                {f.status === "uploading" ? <Loader2 className="w-3.5 h-3.5 animate-spin text-blue-500 shrink-0" /> : 
                 f.status === "success" ? <CheckCircle className="w-3.5 h-3.5 text-[#1CADA3] shrink-0" /> : 
                 f.status === "error" ? <AlertCircle className="w-3.5 h-3.5 text-red-500 shrink-0" /> : 
                 <div className="w-3.5 h-3.5 rounded-full border border-gray-300 shrink-0" />}
                <span className="truncate text-gray-700">{f.file.name}</span>
              </div>
              {f.status === "pending" && <button onClick={() => onRemove(f.file.name)} className="text-gray-400 hover:text-red-500 shrink-0"><Trash2 size={14}/></button>}
            </div>
          ))}
        </div>
      </div>
    );
}

function SuccessModal({ onClose }: { onClose: () => void }) {
    return (
      <div className="absolute inset-0 z-[60] flex items-center justify-center bg-black/60 rounded-xl">
        <div className="bg-white p-6 sm:p-8 rounded-2xl shadow-2xl text-center max-w-sm w-[90%] animate-in zoom-in duration-300">
          <CheckCircle className="w-16 h-16 text-[#1CADA3] mx-auto mb-4" />
          <h3 className="text-2xl font-bold text-gray-800 mb-2">Submitted!</h3>
          <p className="text-gray-600 mb-6">Your application and documents have been processed successfully.</p>
          <button onClick={onClose} className="w-full bg-[#1CADA3] text-white py-2.5 rounded-lg hover:bg-[#178e86] font-medium transition-colors">Return to Dashboard</button>
        </div>
      </div>
    );
}