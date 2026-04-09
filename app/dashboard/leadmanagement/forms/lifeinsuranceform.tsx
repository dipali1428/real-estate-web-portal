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

const PLAN_TYPES = ["Term Insurance", "ULIP", "TULIP", "Child Plan", "Pension Plan", "Saving Plan"];
const PROFESSIONS = ["Salaried", "Self Employed"];
const INCOME_PROOFS = ["3 Years ITR", "Form 16"];

// --- Mapping for Step 2 ---
const DOC_REGISTRY: Record<string, { key: string; label: string; multiple: boolean }> = {
  "INCOME_PROOF": { key: "INCOME_PROOF", label: "Income Proof Document (3 Years ITR / Form 16)", multiple: true },
};

type QueuedFile = {
    file: File;
    docKey: string;
    label: string;
    status: "pending" | "uploading" | "success" | "error";
};

export default function LifeInsuranceForm({ onClose }: { onClose: () => void }) {
  const [step, setStep] = useState(1);
  const [leadId, setLeadId] = useState<string | null>(null);
  const [form, setForm] = useState<Record<string, string>>({
    planType: "", proposerName: "", phone: "", email: "", dob: "", education: "", profession: "",
    income: "", incomeProof: "", sumAssured: "", policyTerm: "", ppt: "",
    smokerStatus: "", drinkerStatus: "", existingDisease: "", investmentOption: "Investment Budget",
    investmentBudget: "", requiredMaturity: "", requiredPension: ""
  });

  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [statusMsg, setStatusMsg] = useState("");
  const [showSuccess, setShowSuccess] = useState(false);
  const [fileQueue, setFileQueue] = useState<QueuedFile[]>([]);

  const showTermFields = form.planType === "Term Insurance" || form.planType === "TULIP";
  const showInvestmentFields = ["ULIP", "Child Plan", "Pension Plan", "Saving Plan"].includes(form.planType);
  const showUploadField = INCOME_PROOFS.includes(form.incomeProof);

  const requiredDocsList = useMemo(() => {
    if (showTermFields && showUploadField) {
        return [DOC_REGISTRY["INCOME_PROOF"]];
    }
    return [];
  }, [showTermFields, showUploadField]);

  const handleInputChange = (field: string, value: string) => {
    const processedValue = field === "email" ? value.toLowerCase() : value;
    setForm(prev => ({ ...prev, [field]: processedValue }));
    if (errors[field]) setErrors(prev => ({ ...prev, [field]: "" }));
  };

  const validateStep1 = () => {
    const errs: Record<string, string> = {};
    const req = (f: string, msg: string) => { if (!form[f]?.trim()) errs[f] = msg; };

    req("planType", "Select a plan type");
    req("proposerName", "Proposer Name is required");
    req("dob", "Date of birth is required");
    req("profession", "Select profession");
    req("income", "Annual income is required");
    req("policyTerm", "Policy term is required");
    req("ppt", "Premium paying term is required");

    if (!form.phone || form.phone.length !== 10) errs.phone = "Invalid phone number";
    if (!form.email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) errs.email = "Invalid email";

    if (showTermFields) {
      req("education", "Education is required");
      req("incomeProof", "Select income proof");
      req("sumAssured", "Sum assured is required");
      req("smokerStatus", "Required");
      req("drinkerStatus", "Required");
      req("existingDisease", "Required");
    }

    if (showInvestmentFields) {
      if (form.investmentOption === "Investment Budget") req("investmentBudget", "Budget is required");
      else {
        if (form.planType === "Pension Plan") req("requiredPension", "Required pension amount is required");
        else req("requiredMaturity", "Required maturity amount is required");
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
        department: "Insurance",
        product_type: "Life Insurance",
        sub_category: "Life Insurance",
        client: { name: form.proposerName, mobile: form.phone, email: form.email },
        meta: { is_self_login: false },
        form_data: { ...form }
      };

      const result = await DashboardService.createLead(payload);
      if (!result?.detail_lead_id) throw new Error("ID missing");
      setLeadId(result.detail_lead_id);

      if (requiredDocsList.length === 0) {
        setShowSuccess(true);
      } else {
        setStep(2);
      }
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
        
        <div className="flex justify-between items-center border-b px-4 sm:px-6 py-3 sm:py-4 bg-white">
          <div>
            <h2 className="text-lg sm:text-xl font-semibold text-[#1CADA3]">Life Insurance Application</h2>
            <p className="text-xs text-gray-400">Step {step} of 2</p>
          </div>
          <button onClick={onClose} className="text-gray-500 hover:text-gray-800"><X size={20} /></button>
        </div>

        <div className="flex-1 overflow-y-auto p-4 sm:p-6 bg-gray-50/30">
          {step === 1 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6">
              <div className="col-span-1 md:col-span-2">
                <Field label="Select Insurance Type" type="select" options={PLAN_TYPES} {...fieldProps("planType")} required />
              </div>

              {form.planType && (
                <>
                  <Field label="Proposer Name" placeholder="Enter full name" {...fieldProps("proposerName")} required />
                  <Field label="Phone Number" placeholder="10-digit number" type="tel" maxLength={10} onlyNumber {...fieldProps("phone")} required />
                  <Field label="Email ID" placeholder="Enter email address" type="email" {...fieldProps("email")} required />
                  <Field label="Birthdate" type="date" {...fieldProps("dob")} required />

                  {showTermFields && <Field label="Education" placeholder="Highest qualification" {...fieldProps("education")} required />}

                  <Field label="Profession" type="select" options={PROFESSIONS} {...fieldProps("profession")} required />
                  <Field label="Income (Yearly)" placeholder="Enter annual income" onlyNumber {...fieldProps("income")} required />

                  {showTermFields && (
                    <>
                      <Field label="Income Proof" type="select" options={INCOME_PROOFS} {...fieldProps("incomeProof")} required />
                      <Field label="Sum Assured Amount" placeholder="Enter amount" onlyNumber {...fieldProps("sumAssured")} required />
                    </>
                  )}

                  <Field label="Policy Term" placeholder="In years" onlyNumber {...fieldProps("policyTerm")} required />
                  <Field label="Premium Paying Term (PPT)" placeholder="Enter term" onlyNumber {...fieldProps("ppt")} required />

                  {showTermFields && (
                    <>
                      <Field label="Smoker / Non-Smoker" placeholder="e.g. Non-Smoker" {...fieldProps("smokerStatus")} required />
                      <Field label="Drinker / Non-Drinker" placeholder="e.g. Non-Drinker" {...fieldProps("drinkerStatus")} required />
                      <div className="col-span-1 md:col-span-2">
                        <Field label="Any Existing Disease" placeholder="Enter medical conditions or 'None'" {...fieldProps("existingDisease")} required />
                      </div>
                    </>
                  )}

                  {showInvestmentFields && (
                    <div className="col-span-1 md:col-span-2 space-y-4">
                      <Field label="Select Investment Option" type="select" options={["Investment Budget", form.planType === "Pension Plan" ? "Required Pension" : "Required Maturity"]} {...fieldProps("investmentOption")} required />
                      {form.investmentOption === "Investment Budget" ? (
                        <Field label="Investment Budget (Yearly)" placeholder="Enter yearly budget" onlyNumber {...fieldProps("investmentBudget")} required />
                      ) : (
                        <>
                          {form.planType === "Pension Plan" ? (
                            <Field label="Required Pension (Monthly)" placeholder="Enter monthly pension" onlyNumber {...fieldProps("requiredPension")} required />
                          ) : (
                            <Field label="Required Maturity Amount" placeholder="Enter maturity amount" onlyNumber {...fieldProps("requiredMaturity")} required />
                          )}
                        </>
                      )}
                    </div>
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
                        <p className="text-xs text-blue-700">Lead ID: <span className="font-mono font-bold">{leadId}</span>. Upload income proof to complete.</p>
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
            <select value={value} onChange={e => onChange(e.target.value)} className={`${STYLES.input(!!error)} cursor-pointer`}>
              <option value="">Select {label}</option>
              {options?.map((opt: string) => <option key={opt} value={opt}>{opt}</option>)}
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