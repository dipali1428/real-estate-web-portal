"use client";
import { useState, useRef, useMemo } from "react";
import { 
  X, CheckCircle, UploadCloud, Trash2, Plus, ChevronDown, 
  Loader2, ArrowRight, ArrowLeft, AlertCircle, Building2, Users, Briefcase 
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

// Dropdown Options
const INVESTOR_TYPES = ["Individual", "HUF", "Company", "Trust", "Partnership Firm", "LLP", "NRI"];
const OCCUPATIONS = ["Salaried", "Self-Employed", "Business", "Professional", "Retired", "Student", "Homemaker"];
const INCOME_RANGES = ["0-5L", "5-10L", "10-20L", "20-50L", "50L-1Cr", "1Cr+"];
const RELATIONS = ["Self", "Spouse", "Son", "Daughter", "Father", "Mother", "Brother", "Sister", "Other"];
const COMPANIES_LIST = ["Unlisted Company A", "Unlisted Company B", "Unlisted Company C", "Other"];

// Document Registry for Unlisted Shares
const DOC_REGISTRY: Record<string, { key: string; label: string; multiple: boolean }> = {
  "PAN Card": { key: "PAN", label: "PAN Card", multiple: false },
  "Aadhaar Card": { key: "AADHAAR", label: "Aadhaar Card", multiple: false },
  "Cancelled Cheque": { key: "CANCEL_CHEQUE", label: "Cancelled Cheque", multiple: false },
  "Income Tax Return": { key: "ITR", label: "Income Tax Return (Last 2 Years)", multiple: true },
  "Bank Statement": { key: "BANK_STATEMENT", label: "Bank Statement (Last 6 Months)", multiple: true },
  "Net Worth Certificate": { key: "NET_WORTH_CERT", label: "Net Worth Certificate", multiple: false },
  "RTA Form": { key: "RTA_FORM", label: "RTA Transfer Form (Signed)", multiple: false },
  "Share Certificate": { key: "SHARE_CERT", label: "Original Share Certificate", multiple: true },
  "Deal Memorandum": { key: "DEAL_MEMO", label: "Deal Memorandum / Contract Note", multiple: true },
  "Client Master List": { key: "CLIENT_MASTER", label: "Client Master List from Broker", multiple: false },
};

type QueuedFile = {
    file: File;
    docKey: string;
    label: string;
    status: "pending" | "uploading" | "success" | "error";
};

interface ShareHolding {
    id: string;
    companyName: string;
    quantity: string;
    purchasePrice: string;
    currentPrice: string;
    certificateNumber: string;
}

export default function UnlistedSharesForm({ onClose }: { onClose: () => void }) {
  const [step, setStep] = useState(1);
  const [leadId, setLeadId] = useState<string | null>(null);
  const [form, setForm] = useState<any>({
    // Primary Investor Details
    investorType: "Individual",
    fullName: "",
    dateOfBirth: "",
    pan: "",
    mobile: "",
    email: "",
    alternateMobile: "",
    occupation: "",
    incomeRange: "",
    
    // Address Details
    addressLine1: "",
    addressLine2: "",
    city: "",
    state: "",
    pincode: "",
    cityOfResidence: "",
    
    // Nominee Details
    nomineeName: "",
    nomineeRelation: "",
    nomineeDob: "",
    nomineePan: "",
    
    // Share Holding Details
    holdings: [{ id: "1", companyName: "", quantity: "", purchasePrice: "", currentPrice: "", certificateNumber: "" }],
    
    // Transaction Details
    totalInvestmentAmount: "",
    expectedSaleValue: "",
    purchaseDate: "",
    brokerName: "",
    dematAccountNumber: "",
    remarks: ""
  });

  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [statusMsg, setStatusMsg] = useState("");
  const [showSuccess, setShowSuccess] = useState(false);
  const [fileQueue, setFileQueue] = useState<QueuedFile[]>([]);
  const [isNRI, setIsNRI] = useState(false);

  // Required Documents based on Investor Type
  const requiredDocsList = useMemo(() => {
    const labels = ["PAN Card", "Aadhaar Card", "Cancelled Cheque", "Income Tax Return", "Bank Statement"];
    
    if (isNRI) {
      labels.push("Foreign Address Proof", "PIS Account Statement");
    }
    
    if (form.holdings.length > 0 && form.holdings[0].companyName) {
      labels.push("Share Certificate", "Deal Memorandum", "Client Master List");
    }
    
    return labels.map(l => DOC_REGISTRY[l]).filter(Boolean);
  }, [isNRI, form.holdings]);

  const handleInputChange = (field: string, value: string) => {
    let val = value;
    if (field.toLowerCase().includes("mobile")) val = value.replace(/\D/g, '').slice(0, 10);
    if (field.toLowerCase().includes("pan")) val = value.toUpperCase().replace(/[^A-Z0-9]/g, '').slice(0, 10);
    if (field === "pincode") val = value.replace(/\D/g, '').slice(0, 6);
    
    if (field.toLowerCase().includes("email")) val = val.toLowerCase();

    setForm((prev: any) => ({ ...prev, [field]: val }));
    if (errors[field]) setErrors(p => ({ ...p, [field]: "" }));
  };

  // Share Holdings Management
  const updateHolding = (id: string, field: string, value: string) => {
    setForm((p: any) => ({
      ...p,
      holdings: p.holdings.map((h: ShareHolding) => 
        h.id === id ? { ...h, [field]: value } : h
      )
    }));
  };

  const addHolding = () => {
    setForm((p: any) => ({
      ...p,
      holdings: [...p.holdings, { 
        id: Date.now().toString(), 
        companyName: "", 
        quantity: "", 
        purchasePrice: "", 
        currentPrice: "", 
        certificateNumber: "" 
      }]
    }));
  };

  const removeHolding = (id: string) => {
    if (form.holdings.length > 1) {
      setForm((p: any) => ({
        ...p,
        holdings: p.holdings.filter((h: ShareHolding) => h.id !== id)
      }));
    }
  };

  // Calculate total investment
  const calculateTotal = () => {
    let total = 0;
    form.holdings.forEach((h: ShareHolding) => {
      const qty = parseFloat(h.quantity) || 0;
      const price = parseFloat(h.purchasePrice) || 0;
      total += qty * price;
    });
    return total.toLocaleString('en-IN');
  };

  const validateStep1 = () => {
    const errs: Record<string, string> = {};
    const req = (f: string, msg: string) => { if (!String(form[f] || "").trim()) errs[f] = msg; };

    req("investorType", "Investor Type is required");
    req("fullName", "Full Name is required");
    req("pan", "PAN is required");
    req("mobile", "Mobile number is required");
    req("email", "Email is required");
    
    if (form.mobile?.length !== 10) errs.mobile = "10-digit mobile required";
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) errs.email = "Invalid email";
    if (form.pan?.length !== 10) errs.pan = "10-character PAN required";
    
    req("addressLine1", "Address is required");
    req("city", "City is required");
    req("state", "State is required");
    req("pincode", "Pincode is required");
    if (form.pincode?.length !== 6) errs.pincode = "6-digit pincode required";
    
    // Validate holdings
    let hasValidHolding = false;
    form.holdings.forEach((h: ShareHolding, idx: number) => {
      if (h.companyName && h.quantity && h.purchasePrice) {
        hasValidHolding = true;
        const qty = parseFloat(h.quantity);
        const price = parseFloat(h.purchasePrice);
        if (isNaN(qty) || qty <= 0) errs[`holding_${idx}_quantity`] = "Valid quantity required";
        if (isNaN(price) || price <= 0) errs[`holding_${idx}_price`] = "Valid price required";
      }
    });
    
    if (!hasValidHolding) errs.holdings = "At least one valid holding is required";

    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const handleCreateLead = async () => {
    if (!validateStep1()) return;
    setIsSubmitting(true);
    setStatusMsg("Creating Application...");
    try {
      const payload = {
        department: "Unlisted Shares",
        product_type: "Unlisted Shares",
        sub_category: "Secondary Market Transaction",
        client: { 
          name: form.fullName, 
          mobile: form.mobile, 
          email: form.email,
          pan: form.pan,
          investor_type: form.investorType
        },
        meta: { 
          is_self_login: false,
          is_nri: isNRI
        },
        form_data: { 
          ...form, 
          totalCalculated: calculateTotal(),
          holdings_count: form.holdings.length
        }
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
    if (fileQueue.length === 0) { 
      setShowSuccess(true); 
      return; 
    }
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
      <div className="bg-white rounded-xl shadow-xl w-full max-w-5xl mx-auto h-[95vh] sm:h-[90vh] flex flex-col relative overflow-hidden">
        
        {/* Header */}
        <div className="flex justify-between items-center border-b px-4 sm:px-6 py-3 sm:py-4 bg-white shrink-0">
          <div>
            <h2 className="text-lg sm:text-xl font-semibold text-[#1CADA3] flex items-center gap-2">
              Unlisted Shares Application
            </h2>
            <p className="text-xs text-gray-400">Step {step} of 2</p>
          </div>
          <button onClick={onClose} className="text-gray-500 hover:text-gray-800"><X size={20} /></button>
        </div>

        {/* Content Area */}
        <div className="flex-1 overflow-y-auto p-4 sm:p-6 bg-gray-50/30">
          {step === 1 ? (
            <div className="space-y-8">
              {/* Investor Type */}
              <section className="bg-gradient-to-r from-blue-50/30 to-teal-50/30 p-4 rounded-lg">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <Field label="Investor Type" type="select" options={INVESTOR_TYPES} {...fieldProps("investorType")} required />
                  <div className="flex items-center gap-3 mt-6">
                    <label className="flex items-center gap-2 cursor-pointer">
                      <input type="checkbox" checked={isNRI} onChange={(e) => setIsNRI(e.target.checked)} className="w-4 h-4 text-[#1CADA3]" />
                      <span className="text-sm text-gray-700">NRI Investor</span>
                    </label>
                  </div>
                </div>
              </section>

              {/* Primary Investor Details */}
              <section>
                <h3 className="text-sm font-bold text-[#1CADA3] uppercase tracking-wider border-b pb-2 mb-4 flex items-center gap-2">
                  <Users size={16} /> 1. Primary Investor Details
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6">
                  <Field label="Full Name" placeholder="As per PAN" {...fieldProps("fullName")} required />
                  <Field label="Date of Birth" type="date" {...fieldProps("dateOfBirth")} />
                  <Field label="PAN Number" placeholder="ABCDE1234F" maxLength={10} {...fieldProps("pan")} required />
                  <Field label="Mobile Number" placeholder="10-digit mobile" onlyNumber maxLength={10} {...fieldProps("mobile")} required />
                  <Field label="Email Address" type="email" placeholder="investor@example.com" {...fieldProps("email")} required />
                  <Field label="Alternate Mobile" placeholder="10-digit mobile" onlyNumber maxLength={10} {...fieldProps("alternateMobile")} />
                  <Field label="Occupation" type="select" options={OCCUPATIONS} {...fieldProps("occupation")} />
                  <Field label="Annual Income" type="select" options={INCOME_RANGES} {...fieldProps("incomeRange")} />
                </div>
              </section>

              {/* Address Details */}
              <section>
                <h3 className="text-sm font-bold text-[#1CADA3] uppercase tracking-wider border-b pb-2 mb-4">2. Address Details</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6">
                  <div className="md:col-span-2">
                    <Field label="Address Line 1" placeholder="House No, Building Name" {...fieldProps("addressLine1")} required />
                  </div>
                  <div className="md:col-span-2">
                    <Field label="Address Line 2" placeholder="Street, Area" {...fieldProps("addressLine2")} />
                  </div>
                  <Field label="City" placeholder="City name" {...fieldProps("city")} required />
                  <Field label="State" placeholder="State name" {...fieldProps("state")} required />
                  <Field label="Pincode" placeholder="6-digit pincode" onlyNumber maxLength={6} {...fieldProps("pincode")} required />
                  <Field label="City of Residence" placeholder="For KYC purposes" {...fieldProps("cityOfResidence")} />
                </div>
              </section>

              {/* Nominee Details */}
              <section>
                <h3 className="text-sm font-bold text-[#1CADA3] uppercase tracking-wider border-b pb-2 mb-4">3. Nominee Details</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6">
                  <Field label="Nominee Full Name" placeholder="Enter name" {...fieldProps("nomineeName")} />
                  <Field label="Relation with Investor" type="select" options={RELATIONS} {...fieldProps("nomineeRelation")} />
                  <Field label="Nominee Date of Birth" type="date" {...fieldProps("nomineeDob")} />
                  <Field label="Nominee PAN" placeholder="ABCDE1234F" maxLength={10} {...fieldProps("nomineePan")} />
                </div>
              </section>

              {/* Share Holdings */}
              <section>
                <h3 className="text-sm font-bold text-[#1CADA3] uppercase tracking-wider border-b pb-2 mb-4 flex items-center gap-2">
                  <Briefcase size={16} /> 4. Share Holdings Details
                </h3>
                
                {errors.holdings && <p className={STYLES.err}>{errors.holdings}</p>}
                
                <div className="space-y-4">
                  {form.holdings.map((h: ShareHolding, idx: number) => (
                    <div key={h.id} className="p-4 bg-white rounded-lg border border-gray-200 shadow-sm relative group">
                      <div className="flex justify-between items-center mb-4">
                        <span className="text-[10px] font-bold text-gray-400 uppercase">Holding #{idx + 1}</span>
                        {form.holdings.length > 1 && (
                          <button type="button" onClick={() => removeHolding(h.id)} className="text-gray-300 hover:text-red-500 transition-colors">
                            <Trash2 size={16} />
                          </button>
                        )}
                      </div>
                      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                        <div>
                          <Field 
                            label="Company Name" 
                            placeholder="Enter company name" 
                            value={h.companyName} 
                            onChange={(v: string) => updateHolding(h.id, "companyName", v)} 
                          />
                          {errors[`holding_${idx}_company`] && <p className={STYLES.err}>{errors[`holding_${idx}_company`]}</p>}
                        </div>
                        <div>
                          <Field 
                            label="Quantity" 
                            placeholder="Number of shares" 
                            onlyNumber 
                            value={h.quantity} 
                            onChange={(v: string) => updateHolding(h.id, "quantity", v)} 
                          />
                          {errors[`holding_${idx}_quantity`] && <p className={STYLES.err}>{errors[`holding_${idx}_quantity`]}</p>}
                        </div>
                        <div>
                          <Field 
                            label="Purchase Price (₹)" 
                            placeholder="Per share price" 
                            onlyNumber 
                            value={h.purchasePrice} 
                            onChange={(v: string) => updateHolding(h.id, "purchasePrice", v)} 
                          />
                          {errors[`holding_${idx}_price`] && <p className={STYLES.err}>{errors[`holding_${idx}_price`]}</p>}
                        </div>
                        <div>
                          <Field 
                            label="Current Market Price (₹)" 
                            placeholder="Current value per share" 
                            onlyNumber 
                            value={h.currentPrice} 
                            onChange={(v: string) => updateHolding(h.id, "currentPrice", v)} 
                          />
                        </div>
                        <div className="md:col-span-2">
                          <Field 
                            label="Certificate Number / Folio No" 
                            placeholder="Share certificate or folio number" 
                            value={h.certificateNumber} 
                            onChange={(v: string) => updateHolding(h.id, "certificateNumber", v)} 
                          />
                        </div>
                      </div>
                    </div>
                  ))}
                  
                  <div className="flex justify-between items-center">
                    <button type="button" onClick={addHolding} className="flex items-center gap-2 text-xs font-bold text-[#1CADA3] hover:text-[#18998f] uppercase tracking-wide py-2">
                      <Plus size={14} /> Add Another Holding
                    </button>
                    {form.holdings.some((h: ShareHolding) => h.quantity && h.purchasePrice) && (
                      <div className="text-sm bg-gray-100 px-3 py-2 rounded-lg">
                        <span className="text-gray-600">Total Investment: </span>
                        <span className="font-bold text-[#1CADA3]">₹ {calculateTotal()}</span>
                      </div>
                    )}
                  </div>
                </div>
              </section>

              {/* Transaction Details */}
              <section>
                <h3 className="text-sm font-bold text-[#1CADA3] uppercase tracking-wider border-b pb-2 mb-4">5. Transaction Details</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6">
                  <Field label="Purchase Date" type="date" {...fieldProps("purchaseDate")} />
                  <Field label="Broker / Intermediary Name" placeholder="Name of broker if any" {...fieldProps("brokerName")} />
                  <Field label="Demat Account Number" placeholder="16-digit BO ID / DP ID" {...fieldProps("dematAccountNumber")} />
                  <Field label="Expected Sale Value (₹)" placeholder="Expected value on sale" onlyNumber {...fieldProps("expectedSaleValue")} />
                  <div className="md:col-span-2">
                    <Field label="Additional Remarks" placeholder="Any special instructions or notes" {...fieldProps("remarks")} />
                  </div>
                </div>
              </section>
            </div>
          ) : (
            <div className="animate-in fade-in slide-in-from-bottom-4 duration-300">
                <div className="mb-6 p-4 bg-blue-50 border border-blue-100 rounded-lg flex items-start gap-3">
                    <CheckCircle className="text-blue-500 mt-1 shrink-0" size={18} />
                    <div>
                        <p className="text-sm font-semibold text-blue-900">Application Created Successfully!</p>
                        <p className="text-xs text-blue-700">Lead ID: <span className="font-mono font-bold">{leadId}</span>. Please upload the required documents to proceed.</p>
                    </div>
                </div>
                
                <div className="mb-4">
                  <h3 className="text-sm font-semibold text-gray-700 mb-3">Required Documents for Unlisted Shares Transaction:</h3>
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
              step === 1 ? <>Submit Application & Upload Documents <ArrowRight size={18} /></> : "Complete Submission"}
           </button>
        </div>
        {showSuccess && <SuccessModal onClose={onClose} />}
      </div>
    </div>
  );
}

// --- Internal Components (Same as Mutual Fund Form) ---

function Field({ label, value, onChange, type = "text", options, required, placeholder, onlyNumber, maxLength, error, disabled }: any) {
  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (onlyNumber && !["Backspace", "Delete", "ArrowLeft", "ArrowRight", "Tab"].includes(e.key) && !/^[0-9]$/.test(e.key)) e.preventDefault();
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
          <input 
            type={type} 
            value={value} 
            onChange={e => onChange(e.target.value)} 
            onKeyDown={handleKeyDown} 
            maxLength={maxLength} 
            placeholder={placeholder} 
            disabled={disabled} 
            className={`${STYLES.input(!!error)}`} 
          />
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
          <h3 className="text-2xl font-bold text-gray-800 mb-2">Application Submitted!</h3>
          <p className="text-gray-600 mb-6">Your unlisted shares application and documents have been submitted successfully. Our team will contact you shortly.</p>
          <button onClick={onClose} className="w-full bg-[#1CADA3] text-white py-2.5 rounded-lg hover:bg-[#178e86] font-medium transition-colors">Return to Dashboard</button>
        </div>
      </div>
    );
}