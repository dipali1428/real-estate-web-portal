"use client";
import { useState, useRef, useMemo } from "react";
import { 
  X, CheckCircle, UploadCloud, Trash2, ChevronDown, 
  Loader2, ArrowRight, ArrowLeft, AlertCircle 
} from "lucide-react";
import { DashboardService } from "../../../services/dashboardService";

// --- Constants & Styles ---
const STYLES = {
  input: (err: boolean) => `w-full border rounded-md p-2 bg-white text-gray-700 outline-none text-sm sm:text-base transition-all placeholder-gray-400 appearance-none ${err ? "border-red-500 focus:ring-1 focus:ring-red-500" : "border-gray-300 focus:ring-2 focus:ring-[#1CADA3] focus:border-[#1CADA3]"}`,
  label: "block text-sm font-medium mb-1 text-gray-700",
  btn: "w-full sm:w-auto sm:px-10 bg-gradient-to-r from-[#2076C7] to-[#1CADA3] text-white py-2.5 rounded-md hover:from-[#1a68b0] hover:to-[#18998f] transition-colors text-sm sm:text-base font-medium shadow-md disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2 whitespace-nowrap",
  secondaryBtn: "flex items-center gap-2 text-gray-500 hover:text-gray-700 font-medium transition-colors",
  err: "text-red-500 text-xs mt-1"
};

// --- Exact Database Mapping from SQL ---
const DOC_REGISTRY: Record<string, { key: string; label: string; multiple: boolean }> = {
  "Previous Year Policy Document": { key: "PREVIOUS_POLICY", label: "Previous Year Policy Document", multiple: false },
};

type QueuedFile = {
    file: File;
    docKey: string;
    label: string;
    status: "pending" | "uploading" | "success" | "error";
};

export default function CattleInsuranceForm({ onClose }: { onClose: () => void }) {
  const [step, setStep] = useState(1);
  const [leadId, setLeadId] = useState<string | null>(null);
  const [form, setForm] = useState<any>({
    clientName: "", phone: "", email: "", dob: "", farmName: "",
    liveStock: "", breed: "", gender: "", age: "", color: "",
    tagNo: "", financer: "", location: "", lossRatio: ""
  });

  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [statusMsg, setStatusMsg] = useState("");
  const [showSuccess, setShowSuccess] = useState(false);
  const [fileQueue, setFileQueue] = useState<QueuedFile[]>([]);

  const requiredDocsList = useMemo(() => {
    // According to SQL rules, Previous Year Policy is the standard doc for Cattle Insurance
    return [DOC_REGISTRY["Previous Year Policy Document"]];
  }, []);

  const handleInputChange = (field: string, value: any) => {
    const processedValue = field === "email" ? value.toLowerCase() : value;
    setForm((prev: any) => ({ ...prev, [field]: processedValue }));
    if (errors[field]) setErrors(p => ({ ...p, [field]: "" }));
  };

  const validateStep1 = () => {
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

    if (!form.phone || form.phone.length !== 10) errs.phone = "Invalid phone number";
    if (!form.email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) errs.email = "Invalid email format";

    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const handleCreateLead = async () => {
    if (!validateStep1()) return;
    setIsSubmitting(true);
    setStatusMsg("Creating Application...");
    try {
      const payload = {
        department: "Insurance",
        product_type: "Cattle Insurance",
        sub_category: "Cattle Insurance",
        client: { name: form.clientName, mobile: form.phone, email: form.email },
        meta: { is_self_login: false },
        form_data: { ...form }
      };

      const result = await DashboardService.createLead(payload);
      if (!result?.detail_lead_id) throw new Error("ID Missing");
      setLeadId(result.detail_lead_id);
      setStep(2);
    } catch (err) {
      console.error(err);
      setStatusMsg("Failed to create lead.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleFinalSubmission = async () => {
    if (fileQueue.length === 0) { setShowSuccess(true); return; }
    setIsSubmitting(true);
    for (let i = 0; i < fileQueue.length; i++) {
        const item = fileQueue[i];
        setStatusMsg(`Uploading ${i + 1}/${fileQueue.length}...`);
        setFileQueue(prev => prev.map((q, idx) => idx === i ? { ...q, status: "uploading" } : q));
        const formData = new FormData();
        formData.append("leadDbId", leadId!);
        formData.append("documents", item.file);
        formData.append("metadata", JSON.stringify([{ key: item.docKey, label: item.label }]));
        try {
            await DashboardService.uploadLeadDocument(leadId!, formData);
            setFileQueue(prev => prev.map((q, idx) => idx === i ? { ...q, status: "success" } : q));
        } catch (err) {
            setFileQueue(prev => prev.map((q, idx) => idx === i ? { ...q, status: "error" } : q));
            setStatusMsg("Upload failed.");
            setIsSubmitting(false);
            return; 
        }
    }
    setIsSubmitting(false);
    setShowSuccess(true);
  };

  const fieldProps = (name: string) => ({
    value: form[name],
    onChange: (v: string) => handleInputChange(name, v),
    error: errors[name]
  });

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 p-2 sm:p-4 text-gray-700">
      <div className="bg-white rounded-xl shadow-xl w-full max-w-4xl mx-auto h-[95vh] sm:h-[90vh] flex flex-col relative overflow-hidden">
        
        {/* Header */}
        <div className="flex justify-between items-center border-b px-4 sm:px-6 py-3 sm:py-4 bg-white">
          <div>
            <h2 className="text-lg sm:text-xl font-semibold text-[#1CADA3]">Cattle Insurance Application</h2>
            <p className="text-xs text-gray-400">Step {step} of 2</p>
          </div>
          <button onClick={onClose} className="text-gray-500 hover:text-gray-800"><X size={20} /></button>
        </div>

        {/* Content Area */}
        <div className="flex-1 overflow-y-auto p-4 sm:p-6 bg-gray-50/30">
          {step === 1 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6">
            <Field label="Client Name" placeholder="Enter full name" {...fieldProps("clientName")} required />
            <Field label="Phone Number" placeholder="10-digit number" onlyNumber maxLength={10} {...fieldProps("phone")} required />
              <Field label="Email ID" placeholder="Enter email address" type="email" {...fieldProps("email")} required />
            <Field label="Date of Birth" type="date" {...fieldProps("dob")} required />
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

        {/* Footer */}
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
            <select value={value} onChange={e => onChange(e.target.value)} disabled={disabled} className={`${STYLES.input(!!error)} cursor-pointer`}>
              <option value="">{placeholder || `Select ${label}`}</option>
              {options?.map((opt: string) => <option key={opt} value={opt}>{opt}</option>)}
            </select>
            <ChevronDown className="absolute right-3 top-3 text-gray-400 pointer-events-none" size={16} />
          </>
        ) : (
          <input type={type} value={value} onChange={e => onChange(e.target.value)} onKeyDown={handleKeyDown} maxLength={maxLength} placeholder={placeholder} disabled={disabled} className={`${STYLES.input(!!error)}`} />
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
          <p className="text-gray-600 mb-6">Your Cattle Insurance application has been processed successfully.</p>
          <button onClick={onClose} className="w-full bg-[#1CADA3] text-white py-2.5 rounded-lg hover:bg-[#178e86] font-medium transition-colors">Return to Dashboard</button>
      </div>
    </div>
  );
}