"use client";
import { useState, useRef, useMemo, useEffect } from "react";
import {
  X, CheckCircle, UploadCloud, Trash2, ChevronDown, Search,
  Loader2, ArrowRight, ArrowLeft, AlertCircle
} from "lucide-react";
import { RTO_LIST } from "../data/rtoData";
import { toast } from "react-hot-toast";
import { DashboardService } from "../../../../services/dashboardService";
import LeadFormDsaSelect, { detailLeadMeta } from "../components/LeadFormDsaSelect";

// --- Constants & Styles ---
const STYLES = {
  input: (err: boolean) => `w-full border rounded-md p-2 bg-white text-gray-700 outline-none text-sm sm:text-base transition-all placeholder-gray-400 appearance-none ${err ? "border-red-500 focus:ring-1 focus:ring-red-500" : "border-gray-300 focus:ring-2 focus:ring-[#1CADA3] focus:border-[#1CADA3]"}`,
  label: "block text-sm font-medium mb-1 text-gray-700",
  btn: "w-full sm:w-auto sm:px-10 bg-gradient-to-r from-[#2076C7] to-[#1CADA3] text-white py-2.5 rounded-md hover:from-[#1a68b0] hover:to-[#18998f] transition-colors text-sm sm:text-base font-medium shadow-md disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2 whitespace-nowrap",
  secondaryBtn: "flex items-center gap-2 text-gray-500 hover:text-gray-700 font-medium transition-colors",
  err: "text-red-500 text-xs mt-1"
};

const VEHICLE_TYPES = ["Private Car", "2 Wheeler", "GCV", "PCV", "Misc-D"];
const REQUIREMENT_OPTIONS = ["Comprehensive", "Own Damage", "Third Party Damage"];
const MANUFACTURERS: Record<string, string[]> = {
  "Private Car": ["Maruti Suzuki", "Hyundai", "Tata Motors", "Mahindra", "Toyota", "Honda", "Kia", "Volkswagen", "Skoda", "MG Motor", "Renault", "Nissan", "Ford", "Jeep", "BMW", "Mercedes-Benz", "Audi", "Volvo", "Jaguar", "Land Rover", "BYD", "Citroen", "Isuzu", "Lexus", "Porsche", "Tesla", "Ferrari", "Lamborghini", "Rolls-Royce", "Bentley", "Aston Martin", "McLaren", "Maserati", "Mini", "Force Motors"],
  "2 Wheeler": ["Hero MotoCorp", "Honda", "TVS", "Bajaj Auto", "Royal Enfield", "Suzuki", "Yamaha", "KTM", "Vespa", "Harley-Davidson", "Mahindra", "Jawa", "BMW Motorrad", "Triumph", "Ducati", "Ola Electric", "Ather Energy", "Kawasaki", "Aprilia", "Husqvarna", "Hero Electric", "Okinawa", "Ampere", "Revolt", "Tork Motors", "Benelli", "Indian Motorcycle", "Keeway", "Zontes", "Yezdi"],
  "GCV": ["Tata Motors", "Ashok Leyland", "Mahindra", "Eicher Motors", "BharatBenz", "Volvo Trucks", "Scania", "MAN Trucks", "AMW Motors", "SML Isuzu", "Asia MotorWorks", "Isuzu", "Piaggio", "Atul Auto", "Euler Motors", "Altigreen", "Force Motors"],
  "PCV": ["Tata Motors", "Ashok Leyland", "Mahindra", "Force Motors", "Eicher Motors", "BharatBenz", "Volvo Buses", "Scania", "MAN", "SML Isuzu", "Hindustan Motors", "JBM Auto", "Olectra Greentech", "PMI Electro Mobility", "Skyline"],
  "Misc-D": ["Tata Motors", "Mahindra", "Ashok Leyland", "Force Motors", "Eicher Motors", "SML Isuzu", "Piaggio", "Atul Auto", "Bajaj Auto", "TVS", "JCB", "Caterpillar", "John Deere", "Escorts", "Kubota", "New Holland", "Case IH", "Action Construction Equipment (ACE)", "Kinetic Green", "L&T", "Sany"]
};

// --- Exact Database Mapping from SQL ---
const DOC_REGISTRY: Record<string, { key: string; label: string; multiple: boolean }> = {
  "RC Documents": { key: "RC_DOC", label: "RC Documents", multiple: true },
  "Showroom Quotation": { key: "SHOWROOM_QUOTATION", label: "Showroom Quotation", multiple: false },
  "Previous Year Policy Document": { key: "PREVIOUS_POLICY", label: "Previous Year Policy Document", multiple: false },
};

type QueuedFile = {
  file: File;
  docKey: string;
  label: string;
  status: "pending" | "uploading" | "success" | "error";
};

export default function MotorInsuranceForm({ onClose }: { onClose: () => void }) {
  const [step, setStep] = useState(1);
  const [leadId, setLeadId] = useState<string | null>(null);
  const [dsaId, setDsaId] = useState("");
  const [form, setForm] = useState<any>({
    vehicleType: "", clientName: "", phone: "", email: "", isNew: "", fuelType: "", vehicleReg: "",
    rto: "", manufacturer: "", vehicleModel: "", gvw: "", cc: "",
    requirement: [] as string[], idv: "", claimTaken: "", hasPrev: ""
  });

  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [statusMsg, setStatusMsg] = useState("");
  const [showSuccess, setShowSuccess] = useState(false);
  const [fileQueue, setFileQueue] = useState<QueuedFile[]>([]);

  const [rtoSearch, setRtoSearch] = useState("");
  const [isRtoOpen, setIsRtoOpen] = useState(false);
  const rtoRef = useRef<HTMLDivElement>(null);

  const isNew = form.isNew === "Yes";
  const isGCV = form.vehicleType === "GCV";
  const isNewGCV = isGCV && isNew;
  const showGvw = isGCV;
  const showCc = ["Private Car", "PCV"].includes(form.vehicleType);
  const showIdv = !form.requirement.includes("Third Party Damage") || form.requirement.length > 1;

  const filteredRTOs = useMemo(() => {
    return RTO_LIST.filter(item => item.toLowerCase().includes(rtoSearch.toLowerCase()));
  }, [rtoSearch]);

  const requiredDocsList = useMemo(() => {
    const list = [];
    if (form.vehicleType) {
      if (isNew) list.push(DOC_REGISTRY["Showroom Quotation"]);
      else list.push(DOC_REGISTRY["RC Documents"]);
      if (!isNew && form.hasPrev === "Yes") list.push(DOC_REGISTRY["Previous Year Policy Document"]);
    }
    return list.filter(Boolean);
  }, [form.vehicleType, isNew, form.hasPrev]);

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (rtoRef.current && !rtoRef.current.contains(e.target as Node)) setIsRtoOpen(false);
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleInputChange = (field: string, value: any) => {
    const processedValue = field === "email" ? value.toLowerCase() : value;
    setForm((prev: any) => {
      const next = { ...prev, [field]: processedValue };
      if (field === "vehicleType") Object.assign(next, { manufacturer: "", fuelType: "", gvw: "", cc: "" });
      if (field === "isNew") Object.assign(next, { vehicleReg: "", rto: "", claimTaken: "", hasPrev: "" });
      return next;
    });
    if (errors[field]) setErrors(p => ({ ...p, [field]: "" }));
  };

  const handleCheck = (opt: string, checked: boolean) => {
    let reqs = checked ? [...form.requirement, opt] : form.requirement.filter((r: string) => r !== opt);
    if (checked) {
      if (opt === "Comprehensive") reqs = reqs.filter((r: string) => r !== "Own Damage");
      if (opt === "Own Damage") reqs = reqs.filter((r: string) => r !== "Comprehensive");
      if (!isGCV && isNew && (opt === "Comprehensive" || opt === "Own Damage")) reqs = reqs.filter((r: string) => r !== "Third Party Damage");
      if (!isGCV && isNew && opt === "Third Party Damage") reqs = reqs.filter((r: string) => !["Comprehensive", "Own Damage"].includes(r));
    }
    handleInputChange("requirement", [...new Set(reqs)]);
  };

  const validateStep1 = () => {
    const errs: Record<string, string> = {};
    const req = (f: string, msg: string) => { if (!String(form[f] || "").trim()) errs[f] = msg; };

    if (!dsaId.trim()) errs.dsaId = "Select a DSA partner";

    req("vehicleType", "Select vehicle type");
    req("clientName", "Client Name is required");
    req("isNew", "Select an option");
    req("fuelType", "Fuel type is required");
    req("manufacturer", "Select manufacturer");
    req("vehicleModel", "Model is required");
    if (!form.phone || form.phone.length !== 10) errs.phone = "Invalid phone";
    if (form.email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) {
      errs.email = "Invalid email format";
    }

    if (!isNew) {
      req("vehicleReg", "Registration required");
      req("claimTaken", "Selection required");
      req("hasPrev", "Selection required");
    } else req("rto", "RTO required");

    if (showGvw) req("gvw", "GVW is required");
    if (showCc) req("cc", "CC is required");
    if (!form.requirement.length) errs.requirement = "Select at least one";

    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const handleCreateLead = async () => {
    if (!validateStep1()) return;
    setIsSubmitting(true);
    setStatusMsg("Creating Application...");
    try {
      const payload = {
        department: "Insurance", product_type: "Motor Insurance", sub_category: "Motor Insurance",
        client: { name: form.clientName, mobile: form.phone, email: form.email },
        dsa_id: dsaId ? Number(dsaId) : null,
        meta: detailLeadMeta({ is_self_login: false }),
        form_data: { ...form }
      };
      const result = await DashboardService.createLead(payload);
      if (!result?.detail_lead_id) throw new Error("ID Missing");
      setLeadId(result.detail_lead_id);
      if (requiredDocsList.length === 0) setShowSuccess(true);
      else setStep(2);
    } catch (err) {
      toast.error("Failed to create application. Please try again.");
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

        <div className="flex justify-between items-center border-b px-4 sm:px-6 py-3 sm:py-4 bg-white">
          <div>
            <h2 className="text-lg sm:text-xl font-semibold text-[#1CADA3]">Motor Insurance Application</h2>
            <p className="text-xs text-gray-400">Step {step} of 2</p>
          </div>
          <button onClick={onClose} className="text-gray-500 hover:text-gray-800"><X size={20} /></button>
        </div>

        <div className="flex-1 overflow-y-auto p-4 sm:p-6 bg-gray-50/30">
          {step === 1 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6">
              <div className="col-span-1 md:col-span-2">
                <LeadFormDsaSelect
                  value={dsaId}
                  onChange={(v) => {
                    setDsaId(v);
                    if (errors.dsaId) setErrors((p) => ({ ...p, dsaId: "" }));
                  }}
                  error={errors.dsaId}
                  required
                />
              </div>
              <Field label="Type of Vehicle" type="select" options={VEHICLE_TYPES} {...fieldProps("vehicleType")} required />
              <Field label="Client Name" placeholder="Enter full name" {...fieldProps("clientName")} required />
              <Field label="Phone Number" placeholder="10-digit number" type="tel" maxLength={10} onlyNumber {...fieldProps("phone")} required />
              <Field label="Email ID" placeholder="Enter email address" type="email" {...fieldProps("email")} />
              <Field label="Is this a new vehicle?" type="select" options={["Yes", "No"]} {...fieldProps("isNew")} required />

              {form.vehicleType === "2 Wheeler" ? (
                <Field label="Fuel Type" type="select" options={["Petrol", "Electric"]} {...fieldProps("fuelType")} required />
              ) : (
                <Field label="Fuel Type" placeholder="Diesel, Petrol, CNG, Electric" {...fieldProps("fuelType")} required />
              )}

              {!isNew && <Field label="Vehicle Registration" placeholder="DL 01 AB 1234" {...fieldProps("vehicleReg")} required />}

              {isNew && (
                <div className="relative" ref={rtoRef}>
                  <label className={STYLES.label}>RTO and City <span className="text-red-500">*</span></label>
                  <div
                    className={`${STYLES.input(!!errors.rto)} cursor-pointer flex justify-between items-center`}
                    onClick={() => setIsRtoOpen(!isRtoOpen)}
                  >
                    <span className={form.rto ? "text-gray-700" : "text-gray-400"}>{form.rto || "Select RTO Location"}</span>
                    <ChevronDown size={16} className={`text-gray-400 transition-transform ${isRtoOpen ? 'rotate-180' : ''}`} />
                  </div>
                  {isRtoOpen && (
                    <div className="absolute z-50 w-full mt-1 bg-white border border-gray-200 rounded-md shadow-lg overflow-hidden">
                      <div className="p-2 border-b bg-gray-50 flex items-center">
                        <Search size={14} className="text-gray-400 mr-2" />
                        <input type="text" className="w-full text-sm outline-none bg-transparent" placeholder="Search..." value={rtoSearch} onChange={(e) => setRtoSearch(e.target.value)} autoFocus />
                      </div>
                      <ul className="max-h-48 overflow-y-auto text-sm">
                        {filteredRTOs.length > 0 ? filteredRTOs.map((rto) => (
                          <li key={rto} className="px-4 py-2 hover:bg-[#1CADA3] hover:text-white cursor-pointer" onClick={() => { handleInputChange("rto", rto); setIsRtoOpen(false); setRtoSearch(""); }}>{rto}</li>
                        )) : <li className="px-4 py-2 text-gray-500">No results found</li>}
                        <li className="px-4 py-2 border-t hover:bg-gray-100 cursor-pointer text-[#1CADA3] italic" onClick={() => { handleInputChange("rto", "Other"); setIsRtoOpen(false); }}>Other (Not in list)</li>
                      </ul>
                    </div>
                  )}
                  {errors.rto && <p className={STYLES.err}>{errors.rto}</p>}
                </div>
              )}

              <Field label="Manufacturer" type="select" options={MANUFACTURERS[form.vehicleType] || []} {...fieldProps("manufacturer")} required disabled={!form.vehicleType} />
              <Field label="Vehicle Make & Model" placeholder="Enter make and model" {...fieldProps("vehicleModel")} required />
              {showGvw && <Field label="GVW (Gross Vehicle Weight)" placeholder="Weight in kg" onlyNumber {...fieldProps("gvw")} required />}
              {showCc && <Field label="CC (Cubic Capacity)" placeholder="Enter CC" onlyNumber {...fieldProps("cc")} required />}

              <div className="col-span-1 md:col-span-2">
                <label className={STYLES.label}>Requirement <span className="text-red-500">*</span></label>
                <div className="flex flex-wrap gap-4 mt-2">
                  {REQUIREMENT_OPTIONS.map(opt => {
                    const disabled = (opt === "Comprehensive" && form.requirement.includes("Own Damage")) ||
                      (opt === "Own Damage" && (form.requirement.includes("Comprehensive") || isNewGCV || isNew)) ||
                      (opt === "Third Party Damage" && isNew && !isGCV);
                    return (
                      <label key={opt} className={`flex items-center text-sm gap-2 ${disabled ? 'opacity-40 cursor-not-allowed' : 'cursor-pointer'}`}>
                        <input type="checkbox" checked={form.requirement.includes(opt)} disabled={disabled} onChange={e => handleCheck(opt, e.target.checked)} className="w-4 h-4 rounded border-gray-300 text-[#1CADA3] focus:ring-[#1CADA3]" />
                        <span className="text-gray-700">{opt}</span>
                      </label>
                    );
                  })}
                </div>
                {errors.requirement && <p className={STYLES.err}>{errors.requirement}</p>}
              </div>

              {showIdv && <Field label="Vehicle IDV (Optional)" placeholder="Enter IDV amount" onlyNumber {...fieldProps("idv")} />}
              {!isNew && <Field label="Claim Taken" type="select" options={["Yes", "No"]} {...fieldProps("claimTaken")} required />}
              {!isNew && <Field label="Prev. Year Policy Available?" type="select" options={["Yes", "No"]} {...fieldProps("hasPrev")} required />}
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
                  <FileSelectionCard key={doc.key} docKey={doc.key} label={doc.label} allowMultiple={doc.key === "RC_DOC"}
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

// --- Internal Helper Components ---

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
      <label className={`${STYLES.label} ${disabled ? 'text-gray-400' : ''}`}>
        {label} {required && !disabled && <span className="text-red-500">*</span>}
      </label>
      <div className="relative">
        {type === "select" ? (
          <>
            <select value={value} onChange={e => onChange(e.target.value)} disabled={disabled} className={`${STYLES.input(!!error)} cursor-pointer ${disabled ? 'bg-gray-50 text-gray-400 border-gray-200' : ''}`}>
              <option value="">{placeholder || `Select ${label}`}</option>
              {options?.map((opt: string) => <option key={opt} value={opt}>{opt}</option>)}
            </select>
            <ChevronDown className={`absolute right-3 top-3 ${disabled ? 'text-gray-300' : 'text-gray-400'} pointer-events-none`} size={16} />
          </>
        ) : (
          <input type={type} value={value} onChange={e => onChange(e.target.value)} onKeyDown={handleKeyDown} maxLength={maxLength} placeholder={placeholder} disabled={disabled} className={`${STYLES.input(!!error)} ${disabled ? 'bg-gray-50 text-gray-400 border-gray-200' : ''}`} />
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
      {docKey === "RC_DOC" && (
        <p className="text-[10px] text-orange-600 font-medium mb-2 leading-tight">
          * Please ensure you upload both <b>Front</b> and <b>Back</b> sides of the RC.
        </p>
      )}
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