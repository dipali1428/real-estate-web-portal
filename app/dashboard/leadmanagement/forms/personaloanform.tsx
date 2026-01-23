"use client";
import { useState, useRef, useMemo } from "react";
import { X, CheckCircle, UploadCloud, Trash2, Plus, ChevronDown, Loader2, AlertCircle } from "lucide-react";
import { DashboardService } from "../../../services/dashboardService";

const MAX_FILE_SIZE_BYTES = 200 * 1024; // 200KB

// --- Types ---
type UploadStatus = 'pending' | 'uploading' | 'success' | 'error';

interface QueuedFile {
    file: File;
    label: string;
    key: string;
    status: UploadStatus;
}

const STYLES = {
  input: (err: boolean) => `w-full border rounded-md p-2 bg-white text-gray-700 outline-none text-sm sm:text-base transition-all placeholder-gray-400 appearance-none ${err ? "border-red-500 focus:ring-1 focus:ring-red-500" : "border-gray-300 focus:ring-2 focus:ring-[#1CADA3] focus:border-[#1CADA3]"}`,
  label: "block text-sm font-medium mb-1 text-gray-700",
  btn: "w-full sm:w-50 bg-gradient-to-r from-[#2076C7] to-[#1CADA3] text-white py-2 rounded-md hover:from-[#1a68b0] hover:to-[#18998f] transition-colors text-sm sm:text-base font-medium shadow-md disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2",
  err: "text-red-500 text-xs mt-1"
};

const BASE_DOCS = ["Aadhar Card", "Pan Card", "3 Months Salary Slip", "Form 16", "6 Months Banking Statement", "Address Proof", "Photograph", "Company ID Card"];
const getDocKey = (label: string) => label.toUpperCase().replace(/\s+/g, '_');

export default function PersonalLoanForm({ onClose }: { onClose: () => void }) {
  const [form, setForm] = useState<Record<string, string>>({
    clientName: "", phone: "", email: "", dob: "", location: "", loanAmount: "",
    deductionDetails: "", companyName: "", companyAddress: "", hasOtherLoan: "", otherLoanAmount: ""
  });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [statusMsg, setStatusMsg] = useState("");
  const [showSuccess, setShowSuccess] = useState(false);

  // File Queue State with Status
  const [fileQueue, setFileQueue] = useState<QueuedFile[]>([]);

  const requiredDocs = useMemo(() => 
    form.hasOtherLoan === "Yes" ? [...BASE_DOCS, "Existing Loan Statement"] : BASE_DOCS, 
  [form.hasOtherLoan]);

  const handleInputChange = (field: string, value: string) => {
    setForm(prev => ({ ...prev, [field]: value }));
    if (errors[field]) setErrors(prev => ({ ...prev, [field]: "" }));
  };

  const validate = () => {
    const errs: Record<string, string> = {};
    const req = (f: string, msg: string) => { if (!form[f]?.trim()) errs[f] = msg; };
    ["clientName", "location", "dob", "loanAmount", "deductionDetails", "companyName", "companyAddress"].forEach(f => req(f, "Required"));
    if (!form.phone || form.phone.length !== 10) errs.phone = "Invalid phone";
    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;
    setIsSubmitting(true);
    setStatusMsg("Creating Application...");

    try {
      const payload = {
        department: "Loan", product_type: "Personal Loan", sub_category: "Personal Loan",
        client: { name: form.clientName, mobile: form.phone, email: form.email },
        meta: { is_self_login: false },
        form_data: { ...form }
      };

      const result = await DashboardService.createLead(payload);
      const leadId = result?.detail_lead_id;
      if (!leadId) throw new Error("Lead ID missing");

      // Upload files sequentially and update their status
      for (let i = 0; i < fileQueue.length; i++) {
        const item = fileQueue[i];
        
        // Update status to 'uploading'
        setFileQueue(prev => prev.map((q, idx) => idx === i ? { ...q, status: 'uploading' } : q));
        setStatusMsg(`Uploading: ${item.label}`);

        const formData = new FormData();
        formData.append("leadDbId", leadId);
        formData.append("documents", item.file);
        formData.append("metadata", JSON.stringify([{ key: item.key, label: item.label }]));

        try {
          await DashboardService.uploadLeadDocument(leadId, formData);
          // Update status to 'success'
          setFileQueue(prev => prev.map((q, idx) => idx === i ? { ...q, status: 'success' } : q));
        } catch (err) {
          // Update status to 'error'
          setFileQueue(prev => prev.map((q, idx) => idx === i ? { ...q, status: 'error' } : q));
          throw err; // Stop the process
        }
      }

      setShowSuccess(true);
    } catch (err) {
      console.error(err);
      setStatusMsg("Upload failed.");
      setIsSubmitting(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 p-2 sm:p-4 text-gray-700">
      <div className="bg-white rounded-xl shadow-xl w-full max-w-4xl mx-auto h-[95vh] sm:h-[90vh] flex flex-col relative">
        <div className="flex justify-between items-center border-b px-4 sm:px-6 py-3 sm:py-4 shrink-0">
          <h2 className="text-lg sm:text-xl font-semibold text-[#1CADA3]">Personal Loan Form</h2>
          <button onClick={onClose} className="text-gray-500 hover:text-gray-800"><X size={20} /></button>
        </div>

        <div className="flex-1 overflow-y-auto p-4 sm:p-6">
          <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6">
            {/* Form Fields... (same as your design) */}
            <Field label="Client Name" placeholder="Enter full name" value={form.clientName} onChange={(v:any)=>handleInputChange("clientName", v)} error={errors.clientName} required />
            <Field label="Phone Number" type="tel" maxLength={10} onlyNumber value={form.phone} onChange={(v:any)=>handleInputChange("phone", v)} error={errors.phone} required />
            <Field label="Email ID" type="email" value={form.email} onChange={(v:any)=>handleInputChange("email", v)} error={errors.email} required />
            <Field label="Date of Birth" type="date" value={form.dob} onChange={(v:any)=>handleInputChange("dob", v)} error={errors.dob} required />
            <Field label="Location" value={form.location} onChange={(v:any)=>handleInputChange("location", v)} error={errors.location} required />
            <Field label="Loan Amount" onlyNumber value={form.loanAmount} onChange={(v:any)=>handleInputChange("loanAmount", v)} error={errors.loanAmount} required />
            <Field label="Deduction Details" value={form.deductionDetails} onChange={(v:any)=>handleInputChange("deductionDetails", v)} error={errors.deductionDetails} required />
            <Field label="Company Name" value={form.companyName} onChange={(v:any)=>handleInputChange("companyName", v)} error={errors.companyName} required />
            <div className="col-span-1 md:col-span-2">
                <Field label="Company Address" value={form.companyAddress} onChange={(v:any)=>handleInputChange("companyAddress", v)} error={errors.companyAddress} required />
            </div>
            <Field label="Any Other Loan Obligations?" type="select" options={["Yes", "No"]} value={form.hasOtherLoan} onChange={(v:any)=>handleInputChange("hasOtherLoan", v)} error={errors.hasOtherLoan} required />
            {form.hasOtherLoan === "Yes" && <Field label="Existing Loan Amount" onlyNumber value={form.otherLoanAmount} onChange={(v:any)=>handleInputChange("otherLoanAmount", v)} error={errors.otherLoanAmount} required />}

            <div className="col-span-1 md:col-span-2 mt-4">
              <h3 className="text-md font-semibold mb-3 text-[#1CADA3] border-b pb-2">Upload Documents <span className="text-sm font-normal text-gray-500 ml-2">(Max 200KB)</span></h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
                {requiredDocs.map(lbl => (
                  <FileUpload 
                    key={lbl} 
                    label={lbl} 
                    allowMultiple={!["Aadhar Card", "Pan Card"].includes(lbl)}
                    // Filter the global queue for files belonging to this specific label
                    queuedFiles={fileQueue.filter(f => f.label === lbl)}
                    onFilesChange={(action: 'add' | 'remove', file: File) => {
                        if(action === 'add') {
                            setFileQueue(prev => [...prev, { file, label: lbl, key: getDocKey(lbl), status: 'pending' }]);
                        } else {
                            setFileQueue(prev => prev.filter(f => !(f.label === lbl && f.file.name === file.name)));
                        }
                    }}
                  />
                ))}
              </div>
            </div>

            <div className="col-span-1 md:col-span-2 flex justify-center mt-6 pb-2">
              <button type="submit" disabled={isSubmitting} className={STYLES.btn}>
                {isSubmitting ? <><Loader2 className="animate-spin" size={18}/> {statusMsg}</> : "Submit Application"}
              </button>
            </div>
          </form>
        </div>
        {showSuccess && <SuccessModal onClose={onClose} />}
      </div>
    </div>
  );
}

// --- Updated FileUpload Sub-component ---

function FileUpload({ label, allowMultiple, queuedFiles, onFilesChange }: {
    label: string;
    allowMultiple: boolean;
    queuedFiles: QueuedFile[];
    onFilesChange: (action: 'add' | 'remove', file: File) => void;
}) {
  const [fileError, setFileError] = useState("");
  const ref = useRef<HTMLInputElement>(null);
  
  const handleFiles = (e: React.ChangeEvent<HTMLInputElement>) => {
    const incoming = Array.from(e.target.files || []);
    setFileError("");

    for (const f of incoming) {
        if (f.size > MAX_FILE_SIZE_BYTES) {
            setFileError("File exceeds 200KB limit.");
            continue;
        }
        onFilesChange('add', f);
    }
    e.target.value = "";
  };

  return (
    <div className="flex flex-col">
      <label className="text-sm font-medium mb-1 text-gray-700 flex justify-between">
        <span>{label}</span>
        <span className="text-[10px] text-gray-400 font-normal">{allowMultiple ? "Multiple" : "Single"}</span>
      </label>
      <input type="file" ref={ref} multiple={allowMultiple} onChange={handleFiles} className="hidden" accept="image/*,application/pdf" />
      
      <div className="flex flex-col gap-2">
        {/* Only show "Choose File" if no files are selected OR if multiple are allowed */}
        {(queuedFiles.length === 0 || allowMultiple) && (
          <div onClick={() => ref.current?.click()} className="cursor-pointer border border-dashed rounded-md h-10 flex items-center justify-center gap-2 bg-gray-50 hover:bg-[#1CADA3]/5 border-gray-300 hover:border-[#1CADA3] group transition-colors">
            <UploadCloud size={16} className="text-gray-400 group-hover:text-[#1CADA3]" />
            <span className="text-xs font-medium text-gray-500 group-hover:text-[#1CADA3]">Choose File</span>
          </div>
        )}

        {queuedFiles.map((f, i) => (
          <div key={i} className={`flex items-center justify-between border px-2 py-1.5 rounded-md text-xs ${f.status === 'error' ? 'bg-red-50 border-red-200' : 'bg-gray-50 border-gray-200'}`}>
            <div className="flex items-center truncate max-w-[85%]">
              {/* DYNAMIC ICON BASED ON STATUS */}
              {f.status === 'uploading' && <Loader2 className="w-3.5 h-3.5 text-blue-500 animate-spin mr-2 shrink-0" />}
              {f.status === 'success' && <CheckCircle className="w-3.5 h-3.5 text-[#1CADA3] mr-2 shrink-0" />}
              {f.status === 'error' && <AlertCircle className="w-3.5 h-3.5 text-red-500 mr-2 shrink-0" />}
              {f.status === 'pending' && <div className="w-3.5 h-3.5 border border-gray-300 rounded-full mr-2 shrink-0" />}
              
              <span className="truncate text-gray-700">{f.file.name}</span>
            </div>
            {/* Only allow removal if not yet uploaded */}
            {f.status === 'pending' && (
                <button type="button" onClick={() => onFilesChange('remove', f.file)} className="text-gray-400 hover:text-red-500">
                    <Trash2 size={14} />
                </button>
            )}
          </div>
        ))}
      </div>
      {fileError && <span className="text-xs text-red-500 mt-1">{fileError}</span>}
    </div>
  );
}

// (SuccessModal and Field components remain the same as your design)
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

function SuccessModal({ onClose }: { onClose: () => void }) {
    return (
      <div className="absolute inset-0 z-50 flex items-center justify-center bg-black/60 rounded-xl animate-in fade-in zoom-in duration-200">
        <div className="bg-white p-6 sm:p-8 rounded-2xl shadow-2xl text-center max-w-sm w-[90%]">
          <CheckCircle className="w-16 h-16 text-[#1CADA3] mx-auto mb-4" />
          <h3 className="text-2xl font-bold text-gray-800 mb-2">Success!</h3>
          <p className="text-gray-600 mb-6">Application and documents submitted successfully.</p>
          <button onClick={onClose} className="w-full bg-[#1CADA3] text-white py-2.5 rounded-lg hover:bg-[#178e86] font-medium transition-colors">Okay, Got it</button>
        </div>
      </div>
    );
}