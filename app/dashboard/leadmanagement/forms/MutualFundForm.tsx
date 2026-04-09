"use client";
import { useState, useRef, useMemo } from "react";
import { 
  X, CheckCircle, UploadCloud, Trash2, Plus, ChevronDown, 
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

const OCCUPATIONS = ["Salaried", "Self-Employed", "Business", "Professional", "Retired", "Student", "Homemaker"];
const INCOME_RANGES = ["0-5L", "5-10L", "10-20L", "20-50L", "50L+"];
const RELATIONS = ["Spouse", "Son", "Daughter", "Father", "Mother", "Brother", "Sister", "Other"];
const GUARDIAN_REL_CLIENT = ["Father", "Mother", "Legal Guardian", "Other"];
const GUARDIAN_REL_NOMINEE = ["Parent", "Legal Guardian", "Grandparent", "Other"];
const INVESTMENT_TYPES = ["SIP", "Lumpsum", "SWP", "STP"];

// --- Metadata Registry ---
const DOC_REGISTRY: Record<string, { key: string; label: string; multiple: boolean }> = {
  "Client PAN Card": { key: "PAN", label: "Client PAN Card", multiple: false },
  "Client Aadhaar Card": { key: "AADHAAR", label: "Client Aadhaar Card", multiple: false },
  "Cancelled Cheque": { key: "CANCEL_CHEQUE", label: "Cancelled Cheque", multiple: false },
  "Nominee PAN Card": { key: "NOMINEE_PAN", label: "Nominee PAN Card", multiple: false },
  "Birth Certificate": { key: "BIRTH_CERTIFICATE", label: "Birth Certificate", multiple: false },
  "Guardian PAN Card": { key: "GUARDIAN_PAN_CARD", label: "Guardian PAN Card", multiple: false },
};

type QueuedFile = {
    file: File;
    docKey: string;
    label: string;
    status: "pending" | "uploading" | "success" | "error";
};

export default function MutualFundForm({ onClose }: { onClose: () => void }) {
  const [step, setStep] = useState(1);
  const [leadId, setLeadId] = useState<string | null>(null);
  const [form, setForm] = useState<any>({
    clientName: "", mobile: "", email: "", pan: "", occupation: "", incomeRange: "", mothersName: "",
    nomineeName: "", nomineeDob: "", nomineeRelation: "", nomineeMobile: "", nomineeEmail: "",
    guardianName: "", guardianMobile: "", guardianEmail: "", guardianRelationClient: "", guardianRelationNominee: "",
    investmentType: "SIP", investmentAmount: "", sipDate: "",
    schemes: [{ schemeName: "", schemeAmount: "", schemeId: "1" }]
  });

  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [statusMsg, setStatusMsg] = useState("");
  const [showSuccess, setShowSuccess] = useState(false);
  const [fileQueue, setFileQueue] = useState<QueuedFile[]>([]);

  const { age, isMinor } = useMemo(() => {
    if (!form.nomineeDob) return { age: null, isMinor: false };
    const diff = new Date().getTime() - new Date(form.nomineeDob).getTime();
    const ageVal = Math.floor(diff / (1000 * 60 * 60 * 24 * 365.25));
    return { age: ageVal, isMinor: ageVal < 18 };
  }, [form.nomineeDob]);

  const requiredDocsList = useMemo(() => {
    const labels = ["Client PAN Card", "Client Aadhaar Card", "Cancelled Cheque", "Nominee PAN Card"];
    if (isMinor) labels.push("Birth Certificate", "Guardian PAN Card");
    return labels.map(l => DOC_REGISTRY[l]).filter(Boolean);
  }, [isMinor]);

  const handleInputChange = (field: string, value: string) => {
    let val = value;
    if (field.toLowerCase().includes("mobile")) val = value.replace(/\D/g, '').slice(0, 10);
    if (field.toLowerCase().includes("pan")) val = value.toUpperCase().replace(/[^A-Z0-9]/g, '').slice(0, 10);
    if (field === "sipDate") val = value.replace(/\D/g, '').slice(0, 2);
    
    // Lowercase conversion for emails
    if (field.toLowerCase().includes("email")) val = val.toLowerCase();

    setForm((prev: any) => ({ ...prev, [field]: val }));
    if (errors[field]) setErrors(p => ({ ...p, [field]: "" }));
  };

  const modScheme = (id: string, k: string, v: string) => {
    setForm((p: any) => ({ ...p, schemes: p.schemes.map((s: any) => s.schemeId === id ? { ...s, [k]: v } : s) }));
  };
  const addScheme = () => setForm((p: any) => ({ ...p, schemes: [...p.schemes, { schemeName: "", schemeAmount: "", schemeId: Date.now().toString() }] }));
  const remScheme = (id: string) => form.schemes.length > 1 && setForm((p: any) => ({ ...p, schemes: p.schemes.filter((s: any) => s.schemeId !== id) }));

  const validateStep1 = () => {
    const errs: Record<string, string> = {};
    const req = (f: string, msg: string) => { if (!String(form[f] || "").trim()) errs[f] = msg; };

    req("clientName", "Client Name is required");
    req("occupation", "Select occupation");
    req("incomeRange", "Select income range");
    req("mothersName", "Mother's name is required");
    if (form.mobile?.length !== 10) errs.mobile = "10-digit mobile required";
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) errs.email = "Invalid email";
    if (form.pan?.length !== 10) errs.pan = "10-character PAN required";

    req("nomineeName", "Nominee name is required");
    req("nomineeDob", "Nominee DOB is required");
    req("nomineeRelation", "Select relation");

    if (!isMinor) {
      if (form.nomineeMobile?.length !== 10) errs.nomineeMobile = "10-digit mobile required";
      if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.nomineeEmail)) errs.nomineeEmail = "Invalid email";
    } else {
      req("guardianName", "Guardian name required");
      req("guardianRelationClient", "Select relation");
      req("guardianRelationNominee", "Select relation");
      if (form.guardianMobile?.length !== 10) errs.guardianMobile = "10-digit mobile required";
    }

    req("investmentAmount", "Amount is required");
    if (form.investmentType === "SIP") {
      if (!form.sipDate || +form.sipDate < 1 || +form.sipDate > 31) errs.sipDate = "Invalid Date (1-31)";
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
        department: "Mutual Funds", product_type: "Mutual Funds", sub_category: "Mutual Funds",
        client: { name: form.clientName, mobile: form.mobile, email: form.email },
        meta: { is_self_login: false },
        form_data: { ...form, isMinor: isMinor ? "yes" : "no" }
      };

      const result = await DashboardService.createLead(payload);
      if (!result?.detail_lead_id) throw new Error("ID Missing");
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
        <div className="flex justify-between items-center border-b px-4 sm:px-6 py-3 sm:py-4 bg-white shrink-0">
          <div>
            <h2 className="text-lg sm:text-xl font-semibold text-[#1CADA3]">Mutual Fund Application</h2>
            <p className="text-xs text-gray-400">Step {step} of 2</p>
          </div>
          <button onClick={onClose} className="text-gray-500 hover:text-gray-800"><X size={20} /></button>
        </div>

        {/* Content Area */}
        <div className="flex-1 overflow-y-auto p-4 sm:p-6 bg-gray-50/30">
          {step === 1 ? (
            <div className="space-y-8">
              {/* Client Details */}
              <section>
                <h3 className="text-sm font-bold text-[#1CADA3] uppercase tracking-wider border-b pb-2 mb-4">1. Client Details</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6">
                  <Field label="Client Full Name" placeholder="As per PAN" {...fieldProps("clientName")} required />
                  <Field label="Mobile Number" placeholder="10-digit mobile" onlyNumber maxLength={10} {...fieldProps("mobile")} required />
                  <Field label="Email Address" type="email" placeholder="client@example.com" {...fieldProps("email")} required />
                  <Field label="PAN Number" placeholder="ABCDE1234F" maxLength={10} {...fieldProps("pan")} required />
                  <Field label="Occupation" type="select" options={OCCUPATIONS} {...fieldProps("occupation")} required />
                  <Field label="Annual Income" type="select" options={INCOME_RANGES} {...fieldProps("incomeRange")} required />
                  <div className="md:col-span-2"><Field label="Mother's Name" placeholder="Required for KYC" {...fieldProps("mothersName")} required /></div>
                </div>
              </section>

              {/* Nominee Details */}
              <section>
                <h3 className="text-sm font-bold text-[#1CADA3] uppercase tracking-wider border-b pb-2 mb-4">2. Nominee Details</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6">
                  <Field label="Nominee Full Name" placeholder="Enter name" {...fieldProps("nomineeName")} required />
                  <div>
                    <Field label="Date of Birth" type="date" {...fieldProps("nomineeDob")} required />
                    {age !== null && <p className={`text-[10px] mt-1 font-bold uppercase ${isMinor ? 'text-amber-600' : 'text-[#1CADA3]'}`}>Age: {age} years {isMinor && '(Minor)'}</p>}
                  </div>
                  <Field label="Relation with Client" type="select" options={RELATIONS} {...fieldProps("nomineeRelation")} required />
                  <Field label="Nominee Mobile" placeholder="10-digit mobile" onlyNumber maxLength={10} {...fieldProps("nomineeMobile")} required={!isMinor} />
                  <Field label="Nominee Email" type="email" placeholder="nominee@example.com" {...fieldProps("nomineeEmail")} required={!isMinor} />
                </div>
              </section>

              {/* Guardian Logic */}
              {isMinor && (
                <section className="bg-amber-50/50 p-4 rounded-lg border border-amber-100">
                  <h3 className="text-sm font-bold text-amber-600 uppercase tracking-wider border-b border-amber-200 pb-2 mb-4">3. Guardian Details (Mandatory for Minor)</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6">
                    <Field label="Guardian Name" placeholder="Enter guardian name" {...fieldProps("guardianName")} required />
                    <Field label="Guardian Mobile" placeholder="10-digit mobile" onlyNumber maxLength={10} {...fieldProps("guardianMobile")} required />
                    <Field label="Guardian Email" type="email" placeholder="guardian@example.com" {...fieldProps("guardianEmail")} required />
                    <Field label="Relation (Client)" type="select" options={GUARDIAN_REL_CLIENT} {...fieldProps("guardianRelationClient")} required />
                    <div className="md:col-span-2"><Field label="Relation (Nominee)" type="select" options={GUARDIAN_REL_NOMINEE} {...fieldProps("guardianRelationNominee")} required /></div>
                  </div>
                </section>
              )}

              {/* Investment Details */}
              <section>
                <h3 className="text-sm font-bold text-[#1CADA3] uppercase tracking-wider border-b pb-2 mb-4">4. Investment Details</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6">
                  <Field label="Investment Type" type="select" options={INVESTMENT_TYPES} {...fieldProps("investmentType")} required />
                  <Field label="Total Amount (₹)" placeholder="Enter total amount" onlyNumber {...fieldProps("investmentAmount")} required />
                  {form.investmentType === "SIP" && <Field label="SIP Date" placeholder="Day (1-31)" onlyNumber maxLength={2} {...fieldProps("sipDate")} required />}
                </div>

                <div className="mt-6 space-y-4">
                  {form.schemes.map((s: any, i: number) => (
                    <div key={s.schemeId} className="p-4 bg-white rounded-lg border border-gray-100 shadow-sm relative group">
                      <div className="flex justify-between items-center mb-4">
                        <span className="text-[10px] font-bold text-gray-400 uppercase">Scheme #{i + 1}</span>
                        {form.schemes.length > 1 && (
                          <button type="button" onClick={() => remScheme(s.schemeId)} className="text-gray-300 hover:text-red-500 transition-colors"><Trash2 size={16} /></button>
                        )}
                      </div>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <Field label="Scheme Name" placeholder="Enter fund name" value={s.schemeName} onChange={(v: string) => modScheme(s.schemeId, "schemeName", v)} />
                        <Field label="Amount (₹)" placeholder="Enter amount" onlyNumber value={s.schemeAmount} onChange={(v: string) => modScheme(s.schemeId, "schemeAmount", v)} />
                      </div>
                    </div>
                  ))}
                  <div className="flex justify-end">
                    <button type="button" onClick={addScheme} className="flex items-center gap-2 text-xs font-bold text-[#1CADA3] hover:text-[#18998f] uppercase tracking-wide py-2"><Plus size={14} /> Add Another Fund</button>
                  </div>
                </div>
              </section>
            </div>
          ) : (
            <div className="animate-in fade-in slide-in-from-bottom-4 duration-300">
                <div className="mb-6 p-4 bg-blue-50 border border-blue-100 rounded-lg flex items-start gap-3">
                    <CheckCircle className="text-blue-500 mt-1 shrink-0" size={18} />
                    <div>
                        <p className="text-sm font-semibold text-blue-900">Lead Created Successfully!</p>
                        <p className="text-xs text-blue-700">Lead ID: <span className="font-mono font-bold">{leadId}</span>. Upload KYC documents to finish.</p>
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
        <div className="border-t p-4 sm:px-6 flex items-center justify-between bg-white shrink-0">
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

// --- Internal Components ---

function Field({ label, value, onChange, type = "text", options, required, placeholder, onlyNumber, maxLength, error, disabled }: any) {
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
    <div className={`w-full relative ${disabled ? 'opacity-70' : ''}`}>
      <label className={STYLES.label}>{label} {required && <span className="text-red-500">*</span>}</label>
      <div className="relative">
        {type === "select" ? (
          <>
            <select value={value} onChange={e => onChange(e.target.value)} disabled={disabled} className={`${STYLES.input(!!error)} cursor-pointer`}>
              <option value="">Select {label}</option>
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
        <label className="text-[10px] font-bold text-gray-400 uppercase mb-2 truncate">{label}</label>
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