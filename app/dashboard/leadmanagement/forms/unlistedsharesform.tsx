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

// Document Registry for Unlisted Shares
const DOC_REGISTRY: Record<string, { key: string; label: string; multiple: boolean }> = {
  "Client Master List": { key: "CLIENT_MASTER", label: "CML (Client Master List)", multiple: false },
  "PAN Card": { key: "PAN", label: "PAN Card", multiple: false },
  "Bank Statement": { key: "BANK_STATEMENT", label: "Bank Statement", multiple: false },
  "UTR Screenshot": { key: "UTR", label: "UTR Screenshot", multiple: false }
};

// Required documents
const REQUIRED_DOCS = ["Client Master List", "PAN Card", "Bank Statement", "UTR Screenshot"];

// Dropdown Options
const INVESTOR_TYPES = ["Individual", "HUF", "Company", "Trust", "Partnership Firm", "LLP", "NRI"];

// --- Types ---
interface QueuedFile {
    file: File;
    docKey: string;
    label: string;
    status: "pending" | "uploading" | "success" | "error";
}

interface FileSelectionCardProps {
    label: string;
    docKey: string;
    selectedFiles: QueuedFile[];
    onAdd: (files: File[]) => void;
    onRemove: (name: string) => void;
}

interface FieldProps {
    label: string;
    value: string;
    onChange: (value: string) => void;
    type?: string;
    required?: boolean;
    placeholder?: string;
    onlyNumber?: boolean;
    maxLength?: number;
    error?: string;
}

// --- Helper Components ---

function Field({ label, value, onChange, type = "text", required, placeholder, onlyNumber, maxLength, error }: FieldProps) {
  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (onlyNumber && !["Backspace", "Delete", "ArrowLeft", "ArrowRight", "Tab"].includes(e.key) && !/^[0-9]$/.test(e.key)) {
      e.preventDefault();
    }
  };
  return (
    <div className="w-full relative">
      <label className={STYLES.label}>{label} {required && <span className="text-red-500">*</span>}</label>
      <input 
        type={type} 
        value={value} 
        onChange={(e) => onChange(e.target.value)} 
        onKeyDown={handleKeyDown} 
        maxLength={maxLength} 
        placeholder={placeholder} 
        className={STYLES.input(!!error)} 
      />
      {error && <p className={STYLES.err}>{error}</p>}
    </div>
  );
}

function FileSelectionCard({ label, docKey, selectedFiles, onAdd, onRemove }: FileSelectionCardProps) {
    const inputRef = useRef<HTMLInputElement>(null);
    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      const files = Array.from(e.target.files || []);
      if (files.length > 0) onAdd([files[0]]);
      if (inputRef.current) inputRef.current.value = "";
    };
  
    return (
      <div className="flex flex-col bg-white p-3 rounded-lg border border-gray-100 shadow-sm">
        <label className="text-xs font-bold text-gray-500 uppercase mb-2 truncate">{label}</label>
        <input type="file" ref={inputRef} onChange={handleFileChange} className="hidden" accept="image/*,application/pdf" />
        <div className="space-y-2">
          <button type="button" onClick={() => inputRef.current?.click()} className="w-full border border-dashed rounded-md py-2 flex flex-col items-center justify-center bg-gray-50 hover:bg-[#1CADA3]/5 border-gray-300 hover:border-[#1CADA3] group transition-colors">
            <div className="flex items-center gap-2">
              <UploadCloud size={16} className="text-gray-400 group-hover:text-[#1CADA3]" />
              <span className="text-xs font-medium text-gray-500 group-hover:text-[#1CADA3]">{selectedFiles.length > 0 ? "Change File" : "Choose File"}</span>
            </div>
          </button>
          {selectedFiles.map((f: QueuedFile, idx: number) => (
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
          <h3 className="text-2xl font-bold text-gray-800 mb-2">Lead Submitted to RM!</h3>
          <p className="text-gray-600 mb-6">Your unlisted shares application and documents have been submitted successfully.</p>
          <button onClick={onClose} className="w-full bg-[#1CADA3] text-white py-2.5 rounded-lg hover:bg-[#178e86] font-medium transition-colors">Return to Dashboard</button>
        </div>
      </div>
    );
}

// --- Main Form Component ---

interface FormData {
  fullName: string;
  mobile: string;
  email: string;
  pan: string;
  utrNumber: string;
  stockName: string;
  quantity: string;
  price: string;
  remarks: string;
  investorType: string;
}

export default function UnlistedSharesForm({ onClose }: { onClose: () => void }) {
  const [step, setStep] = useState<number>(1);
  const [leadId, setLeadId] = useState<string | null>(null);
  const [form, setForm] = useState<FormData>({
    fullName: "",
    mobile: "",
    email: "",
    pan: "",
    utrNumber: "",
    stockName: "",
    quantity: "",
    price: "",
    remarks: "",
    investorType: "Individual"
  });

  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
  const [statusMsg, setStatusMsg] = useState<string>("");
  const [showSuccess, setShowSuccess] = useState<boolean>(false);
  const [fileQueue, setFileQueue] = useState<QueuedFile[]>([]);
  const [quotationAccepted, setQuotationAccepted] = useState<boolean>(false);

  const requiredDocsList = useMemo(() => {
    return REQUIRED_DOCS.map(label => DOC_REGISTRY[label]).filter(Boolean);
  }, []);

  const handleInputChange = (field: keyof FormData, value: string) => {
    let val = value;
    if (field === "mobile") val = value.replace(/\D/g, '').slice(0, 10);
    if (field === "pan") val = value.toUpperCase().replace(/[^A-Z0-9]/g, '').slice(0, 10);
    if (field === "quantity" || field === "price") val = value.replace(/\D/g, '');
    if (field === "email") val = value.toLowerCase();
    
    setForm(prev => ({ ...prev, [field]: val }));
    if (errors[field]) setErrors(prev => ({ ...prev, [field]: "" }));
  };

  const calculateTotal = (): string => {
    const qty = parseFloat(form.quantity) || 0;
    const price = parseFloat(form.price) || 0;
    return (qty * price).toLocaleString('en-IN');
  };

  const validateStep1 = (): boolean => {
    const errs: Record<string, string> = {};
    
    if (!form.fullName.trim()) errs.fullName = "Full Name is required";
    if (!form.mobile.trim()) errs.mobile = "Mobile number is required";
    if (form.mobile.length !== 10) errs.mobile = "10-digit mobile required";
    if (!form.email.trim()) errs.email = "Email is required";
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) errs.email = "Invalid email";
    if (!form.pan.trim()) errs.pan = "PAN is required";
    if (form.pan.length !== 10) errs.pan = "10-character PAN required";
    if (!form.utrNumber.trim()) errs.utrNumber = "UTR number is required";

    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const validateStep2 = (): boolean => {
    const errs: Record<string, string> = {};
    
    if (!form.stockName.trim()) errs.stockName = "Stock name is required";
    
    const qty = parseFloat(form.quantity);
    if (!form.quantity || isNaN(qty) || qty <= 0) errs.quantity = "Valid quantity required";
    
    const price = parseFloat(form.price);
    if (!form.price || isNaN(price) || price <= 0) errs.price = "Valid price required";
    
    if (!quotationAccepted) errs.quotation = "Please accept the quotation confirmation";
    
    if (fileQueue.length < REQUIRED_DOCS.length) {
      errs.documents = `Please upload all required documents (${fileQueue.length}/${REQUIRED_DOCS.length} uploaded)`;
    }

    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const handleCreateLead = async (): Promise<void> => {
    if (!validateStep1()) return;
    setIsSubmitting(true);
    setStatusMsg("Creating Application...");

    try {
      const notes = `Investor Type: ${form.investorType}
  PAN: ${form.pan}
  UTR Number: ${form.utrNumber}
  Remarks: ${form.remarks || 'N/A'}`;

      const payload = {
        lead_name: form.fullName,
        contact_number: form.mobile,
        email: form.email,
        department: "Unlisted",
        sub_category: "Unlisted",
        notes: notes.trim()
      };

      // Log the payload for debugging
      console.log("Sending payload:", payload);

      const result = await DashboardService.createReferralLead(payload);
      console.log("API Response:", result);
      
      // Check if the response indicates success
      if (!result.success) {
        throw new Error(result.message || "Failed to create lead");
      }
      
      // Since the API doesn't return an ID, generate a temporary ID
      // or fetch the lead ID from another endpoint
      const tempId = `TEMP_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
      
      // Store the lead data in localStorage to retrieve later
      const pendingLeads = JSON.parse(localStorage.getItem('pending_leads') || '{}');
      pendingLeads[tempId] = {
        ...form,
        created_at: new Date().toISOString(),
        api_response: result
      };
      localStorage.setItem('pending_leads', JSON.stringify(pendingLeads));
      
      setLeadId(tempId);
      setStep(2);
    } catch (err: any) {
      console.error("API Error Details:", {
        message: err.message,
        response: err.response?.data,
        status: err.response?.status,
        statusText: err.response?.statusText
      });
      
      let errorMessage = "Failed to create application.";
      
      // Parse different error response formats
      if (err.response?.data) {
        if (typeof err.response.data === 'string') {
          errorMessage = err.response.data;
        } else if (err.response.data.message) {
          errorMessage = err.response.data.message;
        } else if (err.response.data.error) {
          errorMessage = err.response.data.error;
        } else {
          errorMessage = JSON.stringify(err.response.data);
        }
      } else if (err.message) {
        errorMessage = err.message;
      }
      
      setStatusMsg(errorMessage);
      // Show error alert for better visibility
      alert(`Error: ${errorMessage}`);
    } finally {
      setIsSubmitting(false);
    }
  };

  const uploadDocuments = async (): Promise<void> => {
    for (let i = 0; i < fileQueue.length; i++) {
      const currentItem = fileQueue[i];
      setStatusMsg(`Uploading ${i + 1}/${fileQueue.length}: ${currentItem.label}`);

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
        throw err;
      }
    }
  };

  const handleFinalSubmission = async (): Promise<void> => {
    if (!validateStep2()) return;
    setIsSubmitting(true);
    setStatusMsg("Uploading documents...");

    try {
      await uploadDocuments();
      
      setStatusMsg("Submitting to RM Department...");
      
      const rmLeads = JSON.parse(localStorage.getItem('rm_unlisted_leads') || '[]');
      rmLeads.push({
        lead_id: leadId,
        lead_name: form.fullName,
        contact_number: form.mobile,
        email: form.email,
        pan: form.pan,
        utr_number: form.utrNumber,
        department: "Unlisted Shares",
        sub_category: "Secondary Market Transaction",
        status: "Pending_RM_Approval",
        transaction_details: {
          stockName: form.stockName,
          quantity: form.quantity,
          price: form.price,
          total_amount: calculateTotal()
        },
        quotation_accepted: quotationAccepted,
        remarks: form.remarks,
        submitted_at: new Date().toISOString(),
        documents_uploaded: fileQueue.map(f => f.label)
      });
      localStorage.setItem('rm_unlisted_leads', JSON.stringify(rmLeads));

      setIsSubmitting(false);
      setShowSuccess(true);
    } catch (err) {
      setStatusMsg("Submission failed. Please try again.");
      setIsSubmitting(false);
    }
  };

  const fieldProps = (name: keyof FormData) => ({
    value: form[name],
    onChange: (v: string) => handleInputChange(name, v),
    error: errors[name]
  });

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 p-2 sm:p-4 text-gray-700">
      <div className="bg-white rounded-xl shadow-xl w-full max-w-4xl mx-auto h-[95vh] sm:h-[90vh] flex flex-col relative overflow-hidden">
        
        <div className="flex justify-between items-center border-b px-4 sm:px-6 py-3 sm:py-4 bg-white">
          <div>
            <h2 className="text-lg sm:text-xl font-semibold text-[#1CADA3]">Unlisted Shares Application</h2>
            <p className="text-xs text-gray-400">Step {step} of 2</p>
          </div>
          <button onClick={onClose} className="text-gray-500 hover:text-gray-800"><X size={20} /></button>
        </div>

        <div className="flex-1 overflow-y-auto p-4 sm:p-6 bg-gray-50/30">
          {step === 1 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6">
              <div className="col-span-1 md:col-span-2">
                <h3 className="text-sm font-semibold text-[#1CADA3] mb-3">Customer Details</h3>
              </div>
              
              <div className="col-span-1 md:col-span-2">
                <label className={STYLES.label}>Investor Type <span className="text-red-500">*</span></label>
                <select 
                  value={form.investorType} 
                  onChange={(e) => handleInputChange("investorType", e.target.value)} 
                  className={`${STYLES.input(!!errors.investorType)} cursor-pointer`}
                >
                  {INVESTOR_TYPES.map(opt => <option key={opt} value={opt}>{opt}</option>)}
                </select>
                {errors.investorType && <p className={STYLES.err}>{errors.investorType}</p>}
              </div>
              
              <Field label="Full Name" placeholder="Enter full name" {...fieldProps("fullName")} required />
              <Field label="Mobile Number" placeholder="10-digit number" type="tel" maxLength={10} onlyNumber {...fieldProps("mobile")} required />
              <Field label="Email ID" placeholder="Enter email address" type="email" {...fieldProps("email")} required />
              <Field label="PAN Number" placeholder="ABCDE1234F" maxLength={10} {...fieldProps("pan")} required />
              <Field label="UTR Number" placeholder="Unique Transaction Reference Number" {...fieldProps("utrNumber")} required />
              <div className="col-span-1 md:col-span-2">
                <Field label="Remarks (Optional)" placeholder="Any additional information" {...fieldProps("remarks")} />
              </div>
            </div>
          ) : (
            <div className="animate-in fade-in slide-in-from-bottom-4 duration-300 space-y-6">
              <div className="mb-6 p-4 bg-blue-50 border border-blue-100 rounded-lg flex items-start gap-3">
                <CheckCircle className="text-blue-500 mt-1 shrink-0" size={18} />
                <div>
                  <p className="text-sm font-semibold text-blue-900">Application Created Successfully!</p>
                  <p className="text-xs text-blue-700">Lead ID: <span className="font-mono font-bold">{leadId}</span></p>
                </div>
              </div>

              {/* Documents Upload Section */}
              <div>
                <h3 className="text-sm font-bold text-[#1CADA3] uppercase tracking-wider mb-4">Required Documents</h3>
                {errors.documents && <p className={STYLES.err}>{errors.documents}</p>}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                  {requiredDocsList.map((doc) => (
                    <FileSelectionCard 
                      key={doc.key} 
                      docKey={doc.key}
                      label={doc.label} 
                      selectedFiles={fileQueue.filter(f => f.docKey === doc.key)}
                      onAdd={(files: File[]) => {
                        const newEntries: QueuedFile[] = files.map(f => ({ file: f, docKey: doc.key, label: doc.label, status: "pending" }));
                        setFileQueue(prev => [...prev.filter(f => f.docKey !== doc.key), ...newEntries]);
                      }}
                      onRemove={(name: string) => setFileQueue(prev => prev.filter(f => f.file.name !== name))}
                    />
                  ))}
                </div>
              </div>

              {/* Stock Transaction */}
              <div>
                <h3 className="text-sm font-bold text-[#1CADA3] uppercase tracking-wider mb-4">Transaction Details</h3>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6">
                  <Field label="Stock / Company Name" placeholder="Enter unlisted company name" {...fieldProps("stockName")} required />
                  <Field label="Quantity" placeholder="Number of shares" onlyNumber {...fieldProps("quantity")} required />
                  <Field label="Price per Share (₹)" placeholder="Per share price" onlyNumber {...fieldProps("price")} required />
                  
                  {form.quantity && form.price && (
                    <div className="col-span-1 md:col-span-2 text-right text-sm bg-gray-100 px-3 py-2 rounded-lg">
                      <span className="text-gray-600">Total Amount: </span>
                      <span className="font-bold text-[#1CADA3]">₹ {calculateTotal()}</span>
                    </div>
                  )}
                </div>
              </div>

              {/* Quotation Acceptance */}
              <div className="bg-amber-50 p-4 rounded-lg border border-amber-200">
                <label className="flex items-center gap-3 cursor-pointer">
                  <input 
                    type="checkbox" 
                    checked={quotationAccepted}
                    onChange={(e) => setQuotationAccepted(e.target.checked)} 
                    className="w-4 h-4 text-[#1CADA3]" 
                  />
                  <span className="text-sm font-medium text-gray-800">
                    I confirm that the above quotation details are accurate and agree to proceed with the transaction.
                  </span>
                </label>
                {errors.quotation && <p className={STYLES.err}>{errors.quotation}</p>}
              </div>
            </div>
          )}
        </div>

        <div className="border-t p-4 sm:px-6 flex items-center justify-between bg-white">
          {step === 2 && !isSubmitting && (
            <button onClick={() => setStep(1)} className={STYLES.secondaryBtn}>
              <ArrowLeft size={18} /> Back
            </button>
          )}
          <div className="flex-1" />
          <button 
            onClick={step === 1 ? handleCreateLead : handleFinalSubmission} 
            disabled={isSubmitting} 
            className={STYLES.btn}
          >
            {isSubmitting ? (
              <div className="flex items-center gap-2">
                <Loader2 className="animate-spin" size={20} />
                {statusMsg}
              </div>
            ) : step === 1 ? (
              <div className="flex items-center gap-2">
                Create Lead & Proceed
                <ArrowRight size={18} />
              </div>
            ) : (
              "Submit to RM Department"
            )}
          </button>
        </div>

        {showSuccess && <SuccessModal onClose={onClose} />}
      </div>
    </div>
  );
}