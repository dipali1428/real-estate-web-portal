"use client";
import { useState, useRef, useMemo } from "react";
import { 
  X, CheckCircle, UploadCloud, Trash2, ChevronDown, 
  Loader2, ArrowRight, ArrowLeft, AlertCircle 
} from "lucide-react";
import { DashboardService } from "../../../services/dashboardService";

const STYLES = {
  input: (err: boolean) => `w-full border rounded-md p-2 bg-white text-gray-700 outline-none text-sm sm:text-base transition-all placeholder-gray-400 appearance-none ${err ? "border-red-500 focus:ring-1 focus:ring-red-500" : "border-gray-300 focus:ring-2 focus:ring-[#1CADA3] focus:border-[#1CADA3]"}`,
  label: "block text-sm font-medium mb-1 text-gray-700",
  // Fixed button width to prevent text breaking
  btn: "w-full sm:w-auto sm:px-10 bg-gradient-to-r from-[#2076C7] to-[#1CADA3] text-white py-2.5 rounded-md hover:from-[#1a68b0] hover:to-[#18998f] transition-colors text-sm sm:text-base font-medium shadow-md disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2 whitespace-nowrap",
  secondaryBtn: "flex items-center gap-2 text-gray-500 hover:text-gray-700 font-medium transition-colors",
  err: "text-red-500 text-xs mt-1"
};

const DOC_REGISTRY: Record<string, { key: string; label: string; multiple: boolean }> = {
  "Aadhar Card": { key: "AADHAAR", label: "Aadhar Card", multiple: false },
  "PAN Card": { key: "PAN", label: "PAN Card", multiple: false },
  "Udyam Aadhar Registration": { key: "UDYAM", label: "Udyam Aadhar Registration", multiple: false },
  "Shop Act Licence": { key: "SHOP_ACT", label: "Shop Act Licence", multiple: false },
  "1 Year Banking Statement": { key: "BANK_STATEMENT", label: "1 Year Banking Statement", multiple: true },
  "Address Proof": { key: "ADDRESS_PROOF", label: "Address Proof", multiple: false },
  "ITR 3 Years": { key: "ITR", label: "ITR 3 Years", multiple: true },
  "Photograph": { key: "PHOTOGRAPH", label: "Photograph", multiple: false }, 
  "Existing Loan Statement": { key: "EXISTING_LOAN", label: "Existing Loan Statement", multiple: true },
};

const BASE_DOCS = ["Aadhar Card", "PAN Card", "Udyam Aadhar Registration", "Shop Act Licence", "1 Year Banking Statement", "Address Proof", "ITR 3 Years", "Photograph"];
const BIZ_TYPES = ["Proprietorship", "Partnership", "Pvt. Ltd."];

type QueuedFile = {
    file: File;
    docKey: string;
    label: string;
    status: "pending" | "uploading" | "success" | "error";
};

export default function BusinessLoanForm({ onClose }: { onClose: () => void }) {
  const [step, setStep] = useState(1);
  const [leadId, setLeadId] = useState<string | null>(null);
  const [form, setForm] = useState<Record<string, string>>({
    name: "", phone: "", email: "", dob: "", location: "", loanAmount: "",
    deduction: "", companyName: "", companyAddress: "", businessStartDate: "",
    loanType: "", hasOtherLoan: "", otherLoanAmount: ""
  });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [statusMsg, setStatusMsg] = useState("");
  const [showSuccess, setShowSuccess] = useState(false);
  const [fileQueue, setFileQueue] = useState<QueuedFile[]>([]);

  const requiredDocsList = useMemo(() => {
    let docs = [...BASE_DOCS];
    if (form.hasOtherLoan === "Yes") docs.push("Existing Loan Statement");
    return docs.map(label => DOC_REGISTRY[label]).filter(Boolean);
  }, [form.hasOtherLoan]);

  const handleInputChange = (field: string, value: string) => {
    const processedValue = field === "email" ? value.toLowerCase() : value;
    setForm(prev => ({ ...prev, [field]: processedValue }));
    if (errors[field]) setErrors(prev => ({ ...prev, [field]: "" }));
  };

  const validateStep1 = () => {
    const errs: Record<string, string> = {};
    const req = (f: string, msg: string) => { if (!form[f]?.trim()) errs[f] = msg; };
    ["loanType", "businessStartDate", "name", "location", "dob", "loanAmount", "companyName", "deduction", "companyAddress", "hasOtherLoan"].forEach(f => req(f, "Required"));
    if (form.hasOtherLoan === "Yes" && !form.otherLoanAmount) errs.otherLoanAmount = "Required";
    if (!form.phone || form.phone.length !== 10) errs.phone = "Invalid phone";
    if (!form.email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) errs.email = "Invalid email";
    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const handleCreateLead = async () => {
    if (!validateStep1()) return;
    setIsSubmitting(true);
    setStatusMsg("Creating Application...");
    try {
      const payload = {
        department: "Loan", product_type: "Business Loan", sub_category: "Business Loan",
        client: { name: form.name, mobile: form.phone, email: form.email },
        meta: { is_self_login: false },
        form_data: { ...form }
      };
      const result = await DashboardService.createLead(payload);
      if (!result?.detail_lead_id) throw new Error("ID missing");
      setLeadId(result.detail_lead_id);
      setStep(2);
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
            <h2 className="text-lg sm:text-xl font-semibold text-[#1CADA3]">Business Loan Application</h2>
            <p className="text-xs text-gray-400">Step {step} of 2</p>
          </div>
          <button onClick={onClose} className="text-gray-500 hover:text-gray-800"><X size={20} /></button>
        </div>

        <div className="flex-1 overflow-y-auto p-4 sm:p-6 bg-gray-50/30">
          {step === 1 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6">
              <Field label="Type of Business" type="select" options={BIZ_TYPES} value={form.loanType} onChange={(v:any)=>handleInputChange("loanType", v)} error={errors.loanType} required />
              <Field label="Business Start Date" type="date" value={form.businessStartDate} onChange={(v:any)=>handleInputChange("businessStartDate", v)} error={errors.businessStartDate} required />
              <Field label="Client Name" placeholder="Enter full name" value={form.name} onChange={(v:any)=>handleInputChange("name", v)} error={errors.name} required />
              <Field label="Phone Number" placeholder="10-digit mobile number" type="tel" maxLength={10} onlyNumber value={form.phone} onChange={(v:any)=>handleInputChange("phone", v)} error={errors.phone} required />
              <Field label="Email ID" placeholder="Enter email address" type="email" value={form.email} onChange={(v:any)=>handleInputChange("email", v)} error={errors.email} required />
              <Field label="Date of Birth" type="date" value={form.dob} onChange={(v:any)=>handleInputChange("dob", v)} error={errors.dob} required />
              <Field label="Location" placeholder="Enter city" value={form.location} onChange={(v:any)=>handleInputChange("location", v)} error={errors.location} required />
              <Field label="Loan Amount" placeholder="Desired amount" onlyNumber value={form.loanAmount} onChange={(v:any)=>handleInputChange("loanAmount", v)} error={errors.loanAmount} required />
              <Field label="Company Name" placeholder="Enter company name" value={form.companyName} onChange={(v:any)=>handleInputChange("companyName", v)} error={errors.companyName} required />
              <Field label="Deduction Details" placeholder="Salary deduction details" value={form.deduction} onChange={(v:any)=>handleInputChange("deduction", v)} error={errors.deduction} required />
              <div className="col-span-1 md:col-span-2"><Field label="Company Address" placeholder="Enter company address" value={form.companyAddress} onChange={(v:any)=>handleInputChange("companyAddress", v)} error={errors.companyAddress} required /></div>
              <Field label="Any Other Loan Obligations?" type="select" options={["Yes", "No"]} value={form.hasOtherLoan} onChange={(v:any)=>handleInputChange("hasOtherLoan", v)} error={errors.hasOtherLoan} required />
              {form.hasOtherLoan === "Yes" && <Field label="Existing Loan Amount" placeholder="Enter amount" onlyNumber value={form.otherLoanAmount} onChange={(v:any)=>handleInputChange("otherLoanAmount", v)} error={errors.otherLoanAmount} required />}
            </div>
          ) : (
            <div className="animate-in fade-in slide-in-from-bottom-4 duration-300">
                <div className="mb-6 p-4 bg-blue-50 border border-blue-100 rounded-lg flex items-start gap-3">
                    <CheckCircle className="text-blue-500 mt-1 shrink-0" size={18} />
                    <div>
                        <p className="text-sm font-semibold text-blue-900">Application Created Successfully!</p>
                        <p className="text-xs text-blue-700">Lead ID: <span className="font-mono font-bold">{leadId}</span>. Upload documents to complete.</p>
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
            if (onlyNumber && !["Backspace", "Delete", "ArrowLeft", "ArrowRight", "Tab"].includes(e.key) && !/^[0-9]$/.test(e.key)) e.preventDefault();
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