"use client";
import { useState, useRef, useMemo } from "react";
import {
  X, CheckCircle, UploadCloud, Trash2, ChevronDown,
  Loader2, ArrowRight, ArrowLeft, AlertCircle
} from "lucide-react";
import { DashboardService } from "../../../services/dashboardService";
import { toast } from "react-hot-toast";

// --- Constants & Styles ---
const STYLES = {
  input: (err: boolean) => `w-full border rounded-md p-2 bg-white text-gray-700 outline-none text-sm sm:text-base transition-all placeholder-gray-400 appearance-none ${err ? "border-red-500 focus:ring-1 focus:ring-red-500" : "border-gray-300 focus:ring-2 focus:ring-[#1CADA3] focus:border-[#1CADA3]"}`,
  label: "block text-sm font-medium mb-1 text-gray-700",
  btn: "w-full sm:w-auto sm:px-10 bg-gradient-to-r from-[#2076C7] to-[#1CADA3] text-white py-2.5 rounded-md hover:from-[#1a68b0] hover:to-[#18998f] transition-colors text-sm sm:text-base font-medium shadow-md disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2 whitespace-nowrap",
  secondaryBtn: "flex items-center gap-2 text-gray-500 hover:text-gray-700 font-medium transition-colors",
  err: "text-red-500 text-xs mt-1"
};

const POLICY_TYPES = ["Fresh", "Port", "Renewal"];
const PLAN_TYPES = ["Individual", "Family Floater"];
const TENURES = ["1 Year", "2 Years", "3 Years", "4 Years", "5 Years"];
const CHILD_COUNT_OPTIONS = ["0", "1", "2", "3", "4"];

// --- Database Mapping from SQL ---
const DOC_REGISTRY: Record<string, { key: string; label: string; multiple: boolean }> = {
  "PREVIOUS_POLICY": { key: "PREVIOUS_POLICY", label: "Previous Policy Document", multiple: true },
};

type QueuedFile = {
  file: File;
  docKey: string;
  label: string;
  status: "pending" | "uploading" | "success" | "error";
};

interface HealthInsuranceFormProps {
  onClose: () => void;
  initialPlanName?: string;
  initialSumAssured?: string;
}

export default function HealthInsuranceForm({
  onClose,
  initialPlanName,
  initialSumAssured,
}: HealthInsuranceFormProps) {
  const [step, setStep] = useState(1);
  const [leadId, setLeadId] = useState<string | null>(null);
  const [form, setForm] = useState<Record<string, string>>({
    policyType: "", planType: "", proposer: "", phone: "", email: "", city: "", pin: "",
    PSA: "", policyTenure: "", dob: "", disease: "",
    childCount: "1",
    FirstAdultDob: "", SecondAdultDob: "", child1Dob: "", child2Dob: "",
  });

  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [statusMsg, setStatusMsg] = useState("");
  const [showSuccess, setShowSuccess] = useState(false);
  const [fileQueue, setFileQueue] = useState<QueuedFile[]>([]);
  const [errorData, setErrorData] = useState<{message: string, existing_lead_id?: string} | null>(null);

  const isPortOrRenewal = form.policyType === "Port" || form.policyType === "Renewal";
  const isIndividual = form.planType === "Individual";
  const isFamily = form.planType === "Family Floater";

  const requiredDocsList = useMemo(() => {
    if (isPortOrRenewal) return [DOC_REGISTRY["PREVIOUS_POLICY"]];
    return [];
  }, [isPortOrRenewal]);

  const handleInputChange = (field: string, value: string) => {
    const processedValue = field === "email" ? value.toLowerCase() : value;
    setForm(prev => ({ ...prev, [field]: processedValue }));
    if (errors[field]) setErrors(prev => ({ ...prev, [field]: "" }));
  };

  const validateStep1 = () => {
    const errs: Record<string, string> = {};
    const req = (f: string, msg: string) => { if (!form[f]?.trim()) errs[f] = msg; };

    req("policyType", "Select policy type");
    req("planType", "Select plan type");
    req("proposer", "Proposer Name required");
    req("city", "City required");
    if (!form.pin || form.pin.length !== 6) errs.pin = "Invalid Pin Code";
    if (form.phone && form.phone.length !== 10) {
      errs.phone = "Invalid phone (must be 10 digits)";
    }
    if (form.email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) {
      errs.email = "Invalid email format";
    }

    req("PSA", "Sum Assured required");
    req("policyTenure", "Select tenure");
    req("disease", "Required");

    if (isIndividual) req("dob", "DOB required");
    if (isFamily) {
      req("FirstAdultDob", "DOB required");

      const count = parseInt(form.childCount || "0");
      for (let i = 1; i <= count; i++) {
        req(`child${i}Dob`, `Child ${i} DOB required`);
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
        product_type: "Health Insurance",
        sub_category: "Health Insurance",
        client: { name: form.proposer, mobile: form.phone, email: form.email },
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
    } catch (err: any) {
      toast.error("Failed to create lead.");
      // Check for the specific "already exists" error from server
      const serverError = err.response?.data || err;
      if (serverError.success === false) {
        setErrorData({
          message: serverError.message,
          existing_lead_id: serverError.existing_lead_id
        });
        setStatusMsg(""); // Clear status message so modal is the focus
      } else {
        setStatusMsg("Failed to create lead.");
      }
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
            <h2 className="text-lg sm:text-xl font-semibold text-[#1CADA3]">Health Insurance Application</h2>
            <p className="text-xs text-gray-400">Step {step} of 2</p>
          </div>
          <button onClick={onClose} className="text-gray-500 hover:text-gray-800"><X size={20} /></button>
        </div>

        <div className="flex-1 overflow-y-auto p-4 sm:p-6 bg-gray-50/30">
          {step === 1 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6">
              <Field label="Policy Type" type="select" options={POLICY_TYPES} {...fieldProps("policyType")} required />
              <Field label="Types of Plan" type="select" options={PLAN_TYPES} {...fieldProps("planType")} required />
              <div className="col-span-1 md:col-span-2">
                <Field label="Proposer Name" placeholder="Enter full name" {...fieldProps("proposer")} required />
              </div>
              <Field label="Phone Number" placeholder="10-digit number" type="tel" maxLength={10} onlyNumber {...fieldProps("phone")} />
              <Field label="Email ID" placeholder="Enter email address" type="email" {...fieldProps("email")} />

              {(isIndividual || isFamily) && (
                <>
                  <Field label="City" placeholder="Enter city" {...fieldProps("city")} required />
                  <Field label="Pin Code" placeholder="6-digit PIN" maxLength={6} onlyNumber {...fieldProps("pin")} required />
                  <Field label="Preferred Sum Assured" placeholder="Enter amount" onlyNumber {...fieldProps("PSA")} required />
                  <Field label="Policy Tenure" type="select" options={TENURES} {...fieldProps("policyTenure")} required />

                  {isIndividual && <Field label="Date of Birth" type="date" {...fieldProps("dob")} required />}

                  {isFamily && (
                    <>
                      <div className="col-span-1 md:col-span-2">
                        <Field
                          label="Number of Children"
                          type="select"
                          options={CHILD_COUNT_OPTIONS}
                          {...fieldProps("childCount")}
                          required
                        />
                      </div>
                      <Field label="DOB of First Adult Member" type="date" {...fieldProps("FirstAdultDob")} required />
                      <Field label="DOB of Second Adult Member" type="date" {...fieldProps("SecondAdultDob")} />
                      {Array.from({ length: parseInt(form.childCount || "0") }).map((_, i) => (
                        <Field
                          key={i}
                          label={`DOB of Child ${i + 1}`}
                          type="date"
                          {...fieldProps(`child${i + 1}Dob`)}
                          required
                        />
                      ))}
                    </>
                  )}

                  <div className="col-span-1 md:col-span-2">
                    <Field label="Pre Existing Disease" placeholder="Enter medical conditions or 'None'" {...fieldProps("disease")} required />
                  </div>
                </>
              )}
            </div>
          ) : (
            <div className="animate-in fade-in slide-in-from-bottom-4 duration-300">
              <div className="mb-6 p-4 bg-blue-50 border border-blue-100 rounded-lg flex items-start gap-3">
                <CheckCircle className="text-blue-500 mt-1 shrink-0" size={18} />
                <div>
                  <p className="text-sm font-semibold text-blue-900">Application Created Successfully!</p>
                  <p className="text-xs text-blue-700">Lead ID: <span className="font-mono font-bold">{leadId}</span>. Upload previous policy to complete.</p>
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
        {errorData && (
          <ErrorModal 
            message={errorData.message} 
            leadId={errorData.existing_lead_id} 
            onClose={() => setErrorData(null)} 
          />
        )}
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
            {f.status === "pending" && <button onClick={() => onRemove(f.file.name)} className="text-gray-400 hover:text-red-500 shrink-0"><Trash2 size={14} /></button>}
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
function ErrorModal({ message, leadId, onClose }: { message: string, leadId?: string, onClose: () => void }) {
  return (
    <div className="absolute inset-0 z-[60] flex items-center justify-center bg-black/60 rounded-xl p-4">
      <div className="bg-white p-6 rounded-2xl shadow-2xl text-center max-w-sm w-full animate-in zoom-in duration-300">
        <div className="w-16 h-16 bg-red-50 rounded-full flex items-center justify-center mx-auto mb-4">
          <AlertCircle className="w-10 h-10 text-red-500" />
        </div>
        <h3 className="text-xl font-bold text-gray-800 mb-2">Notice</h3>
        <p className="text-gray-600 mb-4 text-sm">{message}</p>
        
        {leadId && (
          <div className="bg-gray-50 border border-gray-200 rounded-lg p-3 mb-6">
            <p className="text-[10px] text-gray-400 uppercase font-bold mb-1">Existing Lead ID</p>
            <p className="text-sm font-mono font-bold text-[#2076C7]">{leadId}</p>
          </div>
        )}
        
        <button 
          onClick={onClose} 
          className="w-full bg-gray-800 text-white py-2.5 rounded-lg hover:bg-gray-900 font-medium transition-colors"
        >
          Got it
        </button>
      </div>
    </div>
  );
}