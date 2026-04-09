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
  btn: "w-full sm:w-64 bg-gradient-to-r from-[#2076C7] to-[#1CADA3] text-white py-2.5 rounded-md hover:from-[#1a68b0] hover:to-[#18998f] transition-colors text-sm sm:text-base font-medium shadow-md disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2",
  secondaryBtn: "flex items-center gap-2 text-gray-500 hover:text-gray-700 font-medium transition-colors",
  err: "text-red-500 text-xs mt-1"
};

const DOC_REGISTRY: Record<string, { key: string; label: string; multiple: boolean }> = {
  "Aadhar Card": { key: "AADHAAR", label: "Aadhar Card", multiple: false },
  "Pan Card": { key: "PAN", label: "PAN Card", multiple: false },
  "3 Months Salary Slip": { key: "SALARY_SLIP", label: "3 Months Salary Slip", multiple: true },
  "Form 16": { key: "FORM16", label: "Form 16", multiple: true },
  "6 Months Banking Statement": { key: "BANK_STATEMENT", label: "6 Months Banking Statement", multiple: true },
  "Address Proof": { key: "ADDRESS_PROOF", label: "Address Proof", multiple: false },
  "Photograph": { key: "PHOTOGRAPH", label: "Photograph", multiple: false },
  "Company ID Card": { key: "COMPANY_ID", label: "Company ID Card", multiple: false },
  "Existing Loan Statement": { key: "EXISTING_LOAN", label: "Existing Loan Statement", multiple: true },
};

const BASE_DOCS = ["Aadhar Card", "Pan Card", "3 Months Salary Slip", "Form 16", "6 Months Banking Statement", "Address Proof", "Photograph", "Company ID Card"];

// --- Types ---
type QueuedFile = {
    file: File;
    docKey: string;
    label: string;
    status: "pending" | "uploading" | "success" | "error";
};

// --- Helper Sub-Components ---

function Field({ label, value, onChange, type = "text", options, required, placeholder, onlyNumber, maxLength, error }: any) {
  const handleKeyDown = (e: React.KeyboardEvent) => {
    // Check if it's a Paste command (Ctrl+V or Cmd+V)
    const isPaste = (e.ctrlKey || e.metaKey) && e.key.toLowerCase() === 'v';
    
    // Check if it's a Copy/Select All command (Optional but recommended)
    const isCopyOrSelect = (e.ctrlKey || e.metaKey) && ['c', 'a', 'x'].includes(e.key.toLowerCase());
  
    if (onlyNumber) {
      // Allow the event if it's a paste, copy, select all, or navigation key
      if (isPaste || isCopyOrSelect || ["Backspace", "Delete", "ArrowLeft", "ArrowRight", "Tab"].includes(e.key)) {
        return;
      }
      // Prevent if it's not a number
      if (!/^[0-9]$/.test(e.key)) {
        e.preventDefault();
      }
    }
  };
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
          <input type={type} value={value} onChange={e => onChange(e.target.value)} onKeyDown={handleKeyDown} maxLength={maxLength} placeholder={placeholder} className={STYLES.input(!!error)} />
        )}
      </div>
      {error && <p className={STYLES.err}>{error}</p>}
    </div>
  );
}

/**
 * FILE SELECTION CARD
 */
function FileSelectionCard({ 
    label, 
    docKey, 
    allowMultiple, 
    selectedFiles, 
    onAdd, 
    onRemove 
}: { 
    label: string; 
    docKey: string; 
    allowMultiple: boolean; 
    selectedFiles: QueuedFile[];
    onAdd: (files: File[]) => void;
    onRemove: (name: string) => void;
}) {
  const inputRef = useRef<HTMLInputElement>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files || []);
    const validFiles = allowMultiple ? files : [files[0]];

    if (validFiles.length > 0) {
        onAdd(validFiles);
    }
    if (inputRef.current) inputRef.current.value = "";
  };

  return (
    <div className="flex flex-col bg-white p-3 rounded-lg border border-gray-100 shadow-sm">
      <label className="text-xs font-bold text-gray-500 uppercase mb-2 truncate">{label}</label>
      <input type="file" ref={inputRef} multiple={allowMultiple} onChange={handleFileChange} className="hidden" accept="image/*,application/pdf" />
      
      <div className="space-y-2">
        <button 
          type="button"
          onClick={() => inputRef.current?.click()} 
          className="w-full border border-dashed rounded-md py-2 flex flex-col items-center justify-center bg-gray-50 hover:bg-[#1CADA3]/5 border-gray-300 hover:border-[#1CADA3] group transition-colors"
        >
          <div className="flex items-center gap-2">
            <UploadCloud size={16} className="text-gray-400 group-hover:text-[#1CADA3]" />
            <span className="text-xs font-medium text-gray-500 group-hover:text-[#1CADA3]">
              {selectedFiles.length > 0 ? "Add More" : "Choose File"}
            </span>
          </div>
        </button>

        {selectedFiles.map((f, idx) => (
          <div key={idx} className={`flex items-center justify-between border px-2 py-1.5 rounded-md text-xs ${f.status === 'error' ? 'bg-red-50 border-red-200' : 'bg-white border-gray-100'}`}>
            <div className="flex items-center truncate gap-2 max-w-[80%]">
              {f.status === "uploading" ? <Loader2 className="w-3.5 h-3.5 animate-spin text-blue-500 shrink-0" /> : 
               f.status === "success" ? <CheckCircle className="w-3.5 h-3.5 text-[#1CADA3] shrink-0" /> : 
               f.status === "error" ? <AlertCircle className="w-3.5 h-3.5 text-red-500 shrink-0" /> : 
               <div className="w-3.5 h-3.5 rounded-full border border-gray-300 shrink-0" />}
              <span className="truncate text-gray-700">{f.file.name}</span>
            </div>
            {f.status === "pending" && (
                <button onClick={() => onRemove(f.file.name)} className="text-gray-400 hover:text-red-500 shrink-0"><Trash2 size={14}/></button>
            )}
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
        <p className="text-gray-600 mb-6">Your application and documents have been successfully processed.</p>
        <button onClick={onClose} className="w-full bg-[#1CADA3] text-white py-2.5 rounded-lg hover:bg-[#178e86] font-medium transition-colors">Return to Dashboard</button>
      </div>
    </div>
  );
}

// --- Main Form Component ---

export default function PersonalLoanForm({ onClose }: { onClose: () => void }) {
  const [step, setStep] = useState(1);
  const [leadId, setLeadId] = useState<string | null>(null);
  const [form, setForm] = useState<Record<string, string>>({
    clientName: "", phone: "", email: "", dob: "", location: "", loanAmount: "",
    deductionDetails: "", companyName: "", companyAddress: "", hasOtherLoan: "", otherLoanAmount: ""
  });

  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [statusMsg, setStatusMsg] = useState("");
  const [showSuccess, setShowSuccess] = useState(false);
  
  // File Queue State
  const [fileQueue, setFileQueue] = useState<QueuedFile[]>([]);

  const requiredDocsList = useMemo(() => {
    let docs = [...BASE_DOCS];
    if (form.hasOtherLoan === "Yes") docs.push("Existing Loan Statement");
    return [...new Set(docs)].map(label => DOC_REGISTRY[label]).filter(Boolean);
  }, [form.hasOtherLoan]);

  const handleInputChange = (field: string, value: string) => {
    // Automatically convert email inputs to lowercase
    const processedValue = field === "email" ? value.toLowerCase() : value;
  
    setForm(prev => ({ ...prev, [field]: processedValue }));
    if (errors[field]) setErrors(prev => ({ ...prev, [field]: "" }));
  };

  const validateStep1 = () => {
    const errs: Record<string, string> = {};
    const req = (f: string, msg: string) => { if (!form[f]?.trim()) errs[f] = msg; };
    
    req("clientName", "Client Name is required");
    req("location", "Location is required");
    req("dob", "Date of Birth is required");
    req("loanAmount", "Loan Amount is required");
    req("deductionDetails", "Deduction Details is required");
    req("companyName", "Company Name is required");
    req("companyAddress", "Company Address is required");
    req("hasOtherLoan", "Selection required");
    
    if (form.hasOtherLoan === "Yes") req("otherLoanAmount", "Existing Loan Amount is required");
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
        department: "Loan",
        product_type: "Personal Loan",
        sub_category: "Personal Loan",
        client: { name: form.clientName, mobile: form.phone, email: form.email },
        meta: { is_self_login: false },
        form_data: { ...form }
      };

      const result = await DashboardService.createLead(payload);
      const id = result?.detail_lead_id;

      if (!id) throw new Error("Lead ID missing");
      setLeadId(id);

      setStep(2);
    } catch (err) {
      console.error(err);
      setStatusMsg("Failed to create application.");
    } finally {
      setIsSubmitting(false);
    }
  };

  // --- Sequential Upload Logic ---
  const handleFinalSubmission = async () => {
    if (fileQueue.length === 0) {
        setShowSuccess(true);
        return;
    }

    setIsSubmitting(true);
    
    for (let i = 0; i < fileQueue.length; i++) {
        const currentItem = fileQueue[i];
        setStatusMsg(`Uploading ${i + 1}/${fileQueue.length}: ${currentItem.label}`);

        // Set status to uploading in UI
        setFileQueue(prev => prev.map((item, idx) => idx === i ? { ...item, status: "uploading" } : item));

        const formData = new FormData();
        formData.append("leadDbId", leadId!);
        formData.append("documents", currentItem.file);
        formData.append("metadata", JSON.stringify([{ key: currentItem.docKey, label: currentItem.label }]));

        try {
            await DashboardService.uploadLeadDocument(leadId!, formData);
            setFileQueue(prev => prev.map((item, idx) => idx === i ? { ...item, status: "success" } : item));
        } catch (err) {
            console.error(err);
            setFileQueue(prev => prev.map((item, idx) => idx === i ? { ...item, status: "error" } : item));
            setStatusMsg("Upload failed. Please try again.");
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
        <div className="flex justify-between items-center border-b px-4 sm:px-6 py-3 sm:py-4 shrink-0 bg-white">
          <div>
            <h2 className="text-lg sm:text-xl font-semibold text-[#1CADA3]">Personal Loan Application</h2>
            <p className="text-xs text-gray-400">Step {step} of 2</p>
          </div>
          <button onClick={onClose} className="text-gray-500 hover:text-gray-800 transition-colors"><X size={20} /></button>
        </div>

        {/* Content */}
        <div className="flex-1 overflow-y-auto p-4 sm:p-6 bg-gray-50/30">
          {step === 1 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6">
              <Field label="Client Name" placeholder="Enter full name" {...fieldProps("clientName")} required />
              <Field label="Phone Number" placeholder="10-digit number" type="tel" maxLength={10} onlyNumber {...fieldProps("phone")} required />
              <Field label="Email ID" placeholder="Enter email" type="email" {...fieldProps("email")} required />
              <Field label="Date of Birth" type="date" {...fieldProps("dob")} required />
              <Field label="Location" placeholder="Enter city" {...fieldProps("location")} required />
              <Field label="Loan Amount" placeholder="Desired amount" onlyNumber {...fieldProps("loanAmount")} required />
              <Field label="Deduction Details" placeholder="Enter deduction details" {...fieldProps("deductionDetails")} required />
              <Field label="Company Name" placeholder="Enter company name" {...fieldProps("companyName")} required />
              <div className="col-span-1 md:col-span-2">
                <Field label="Company Address" placeholder="Enter company address" {...fieldProps("companyAddress")} required />
              </div>
              <Field label="Any Other Loan Obligations?" type="select" options={["Yes", "No"]} {...fieldProps("hasOtherLoan")} required />
              {form.hasOtherLoan === "Yes" && <Field label="Existing Loan Amount" placeholder="Enter amount" onlyNumber {...fieldProps("otherLoanAmount")} required />}
            </div>
          ) : (
            <div className="animate-in fade-in slide-in-from-bottom-4 duration-300">
                <div className="mb-6 p-4 bg-blue-50 border border-blue-100 rounded-lg flex items-start gap-3">
                    <CheckCircle className="text-blue-500 mt-1 shrink-0" size={18} />
                    <div>
                        <p className="text-sm font-semibold text-blue-900">Application Created Successfully!</p>
                        <p className="text-xs text-blue-700">Lead ID: <span className="font-mono font-bold">{leadId}</span>. Select documents and click Submit to upload.</p>
                    </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                    {requiredDocsList.map(doc => (
                      <FileSelectionCard 
                        key={doc.key} 
                        docKey={doc.key}
                        label={doc.label} 
                        allowMultiple={doc.multiple}
                        selectedFiles={fileQueue.filter(f => f.docKey === doc.key)}
                        onAdd={(files) => {
                            const newEntries: QueuedFile[] = files.map(f => ({ file: f, docKey: doc.key, label: doc.label, status: "pending" }));
                            setFileQueue(prev => [...prev.filter(f => !(f.docKey === doc.key && !doc.multiple)), ...newEntries]);
                        }}
                        onRemove={(name) => setFileQueue(prev => prev.filter(f => f.file.name !== name))}
                      />
                    ))}
                </div>
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="border-t p-4 sm:px-6 flex items-center justify-between bg-white rounded-b-xl">
           {step === 2 && !isSubmitting && (
             <button onClick={() => setStep(1)} className={STYLES.secondaryBtn}><ArrowLeft size={18} /> Back</button>
           )}
           <div className="flex-1" />
           <button 
             onClick={step === 1 ? handleCreateLead : handleFinalSubmission} 
             disabled={isSubmitting} 
             className={`${STYLES.btn} px-6 py-3 w-auto min-w-max`}
           >
             {isSubmitting ? (
               <div className="flex items-center gap-2">
                 <Loader2 className="animate-spin" size={20} />
                 {statusMsg}
               </div>
             ) : step === 1 ? (
               <div className="flex items-center gap-2">
                 Create Lead & Upload Documents
                 <ArrowRight size={18} />
               </div>
             ) : (
               "Complete Submission"
             )}
           </button>
        </div>

        {showSuccess && <SuccessModal onClose={onClose} />}
      </div>
    </div>
  );
}