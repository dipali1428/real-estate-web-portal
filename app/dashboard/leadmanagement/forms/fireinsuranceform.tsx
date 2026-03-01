"use client";
import { useState, useRef, useMemo } from "react";
import { 
  X, CheckCircle, UploadCloud, Trash2, ChevronDown, 
  Loader2, AlertCircle 
} from "lucide-react";
import { DashboardService } from "../../../services/dashboardService";

// --- Constants & Styles ---
const STYLES = {
  input: (err: boolean) => `w-full border rounded-md p-2 bg-white text-gray-700 outline-none text-sm sm:text-base transition-all placeholder-gray-400 appearance-none ${err ? "border-red-500 focus:ring-1 focus:ring-red-500" : "border-gray-300 focus:ring-2 focus:ring-[#1CADA3] focus:border-[#1CADA3]"}`,
  label: "block text-sm font-medium mb-1 text-gray-700",
  btn: "w-full sm:w-auto sm:px-10 bg-gradient-to-r from-[#2076C7] to-[#1CADA3] text-white py-2.5 rounded-md hover:from-[#1a68b0] hover:to-[#18998f] transition-colors text-sm sm:text-base font-medium shadow-md disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2 whitespace-nowrap",
  err: "text-red-500 text-xs mt-1"
};

const INSURANCE_TYPES = [
  { label: "Residential Property Insurance", value: "residential" },
  { label: "Commercial Property (Own properties)", value: "commercial" },
  { label: "Stock Insurance", value: "stock" }
];

const TENURES = ["1 Year", "2 Years", "3 Years", "4 Years", "5 Years"];

// --- Mapping for Document logic ---
const DOC_REGISTRY = {
  "STOCK_INVENTORY": { key: "STOCK_INVENTORY", label: "Stock Inventory Sheet", multiple: true },
};

type QueuedFile = {
    file: File;
    docKey: string;
    label: string;
    status: "pending" | "uploading" | "success" | "error";
};

export default function FireInsuranceForm({ onClose }: { onClose: () => void }) {
  const [form, setForm] = useState<Record<string, string>>({
    insuranceType: "", name: "", address: "", pincode: "", sumInsured: "", tenure: ""
  });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [statusMsg, setStatusMsg] = useState("");
  const [showSuccess, setShowSuccess] = useState(false);
  
  const [fileQueue, setFileQueue] = useState<QueuedFile[]>([]);

  const isStock = form.insuranceType === "stock";
  const isProperty = form.insuranceType === "residential" || form.insuranceType === "commercial";

  const handleInputChange = (field: string, value: string) => {
    setForm(prev => ({ ...prev, [field]: value }));
    if (errors[field]) setErrors(p => ({ ...p, [field]: "" }));
  };

  const validate = () => {
    const errs: Record<string, string> = {};
    const req = (f: string, msg: string) => { if (!form[f]?.trim()) errs[f] = msg; };

    req("insuranceType", "Select insurance type");

    if (isProperty) {
      req("name", "Name is required");
      req("address", "Address is required");
      if (!form.pincode || form.pincode.length !== 6) errs.pincode = "Must be 6 digits";
      req("sumInsured", "Sum insured is required");
      req("tenure", "Select tenure");
    }

    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;
    setIsSubmitting(true);
    setStatusMsg("Creating Application...");

    try {
      // 1. Create Lead
      const payload = {
        department: "Insurance",
        product_type: "Fire Insurance",
        sub_category: "Fire Insurance",
        client: { 
            name: isStock ? "Stock Applicant" : form.name, 
            mobile: "NA", 
            email: "NA" 
        },
        meta: { is_self_login: false },
        form_data: { ...form }
      };

      const result = await DashboardService.createLead(payload);
      const leadId = result?.detail_lead_id;
      if (!leadId) throw new Error("Lead ID missing");

      // 2. Sequential Upload
      for (let i = 0; i < fileQueue.length; i++) {
        const item = fileQueue[i];
        setStatusMsg(`Uploading ${i + 1}/${fileQueue.length}...`);
        setFileQueue(prev => prev.map((q, idx) => idx === i ? { ...q, status: "uploading" } : q));

        const formData = new FormData();
        formData.append("leadDbId", leadId);
        formData.append("documents", item.file);
        formData.append("metadata", JSON.stringify([{ key: item.docKey, label: item.label }]));

        try {
          await DashboardService.uploadLeadDocument(leadId, formData);
          setFileQueue(prev => prev.map((q, idx) => idx === i ? { ...q, status: "success" } : q));
        } catch (err) {
          setFileQueue(prev => prev.map((q, idx) => idx === i ? { ...q, status: "error" } : q));
          throw err; 
        }
      }

      setShowSuccess(true);
    } catch (err) {
      console.error(err);
      setStatusMsg("Submission failed.");
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
      <div className="bg-white rounded-xl shadow-xl w-full max-w-4xl mx-auto my-auto flex flex-col relative max-h-[95vh] overflow-hidden">
        
        <div className="flex justify-between items-center border-b px-4 sm:px-6 py-3 sm:py-4 shrink-0 bg-white">
          <h2 className="text-lg sm:text-xl font-semibold text-[#1CADA3]">Fire Insurance Form</h2>
          <button onClick={onClose} className="text-gray-500 hover:text-gray-800"><X size={20} /></button>
        </div>

        <div className="flex-1 overflow-y-auto p-4 sm:p-6 bg-gray-50/30">
          <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6">
            <div className="col-span-1 md:col-span-2">
              <Field
                label="Select Insurance Type"
                type="select"
                options={INSURANCE_TYPES.map(t => t.label)}
                value={INSURANCE_TYPES.find(t => t.value === form.insuranceType)?.label || ""}
                onChange={(label: string) => {
                  const val = INSURANCE_TYPES.find(t => t.label === label)?.value || "";
                  handleInputChange("insuranceType", val);
                }}
                error={errors.insuranceType}
                required
              />
            </div>

            {isProperty && (
              <>
                <div className="col-span-1 md:col-span-2">
                  <Field label="Name / Entity Name" placeholder="Enter full name" {...fieldProps("name")} required />
                </div>
                <Field label="Pincode" placeholder="6-digit pincode" onlyNumber maxLength={6} {...fieldProps("pincode")} required />
                <Field label="Sum Insured (₹)" placeholder="Enter amount" onlyNumber {...fieldProps("sumInsured")} required />
                <div className="col-span-1 md:col-span-2">
                  <Field label="Address for Insurance Location" placeholder="Enter full property address" {...fieldProps("address")} required />
                </div>
                <Field label="Tenure" type="select" options={TENURES} {...fieldProps("tenure")} required />
              </>
            )}

            {isStock && (
              <div className="col-span-1 md:col-span-2 mt-2">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <FileSelectionCard 
                        label="Stock Inventory Sheet"
                        docKey="STOCK_INVENTORY"
                        allowMultiple={true}
                        selectedFiles={fileQueue.filter(f => f.docKey === "STOCK_INVENTORY")}
                        onAdd={(files: File[]) => {
                            const newEntries = files.map(f => ({ file: f, docKey: "STOCK_INVENTORY", label: "Stock Inventory Sheet", status: "pending" as const }));
                            setFileQueue(prev => [...prev, ...newEntries]);
                        }}
                        onRemove={(name: string) => setFileQueue(prev => prev.filter(f => f.file.name !== name))}
                    />
                </div>
              </div>
            )}

            {form.insuranceType && (
              <div className="col-span-1 md:col-span-2 flex justify-center mt-6 pb-2">
                <button type="submit" disabled={isSubmitting} className={STYLES.btn}>
                  {isSubmitting ? <><Loader2 className="animate-spin" size={18}/> {statusMsg}</> : "Submit Application"}
                </button>
              </div>
            )}
          </form>
        </div>
        {showSuccess && <SuccessModal onClose={onClose} />}
      </div>
    </div>
  );
}

// --- Helper Components ---

function Field({ label, value, onChange, type = "text", options, required, placeholder, onlyNumber, maxLength, error }: any) {
  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (onlyNumber && !["Backspace", "Delete", "ArrowLeft", "ArrowRight", "Tab"].includes(e.key) && !/^[0-9]$/.test(e.key)) e.preventDefault();
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
        <input type="file" ref={inputRef} multiple={allowMultiple} onChange={handleFileChange} className="hidden" accept="image/*,application/pdf,.xlsx,.xls,.csv" />
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
          <p className="text-gray-600 mb-6">Your Fire Insurance application has been processed successfully.</p>
          <button onClick={onClose} className="w-full bg-[#1CADA3] text-white py-2.5 rounded-lg hover:bg-[#178e86] font-medium transition-colors">Return to Dashboard</button>
        </div>
      </div>
    );
}