"use client";
import { useState, useRef } from "react";
import * as XLSX from "xlsx";
import { X, CheckCircle, UploadCloud, Trash2, ChevronDown, Download, Info, AlertCircle, Loader2 } from "lucide-react";

// Shared Styles
const STYLES = {
  input: (hasError: boolean) => 
    `w-full border rounded-md p-2 bg-white text-gray-700 outline-none text-sm sm:text-base transition-all placeholder-gray-400 appearance-none ${
      hasError 
        ? "border-red-500 focus:border-red-500 focus:ring-1 focus:ring-red-500" 
        : "border-gray-300 focus:ring-2 focus:ring-[#1CADA3] focus:border-[#1CADA3]"
    }`,
  label: "block text-sm font-semibold mb-1 text-gray-700",
  btn: "w-full sm:w-64 bg-gradient-to-r from-[#2076C7] to-[#1CADA3] text-white py-2.5 rounded-md hover:from-[#1a68b0] hover:to-[#18998f] transition-colors text-sm sm:text-base font-bold shadow-md disabled:opacity-50 disabled:cursor-not-allowed",
  errorText: "text-red-500 text-xs mt-1",
  sectionTitle: "text-md font-bold mb-3 text-[#1CADA3] border-b pb-2 mt-6 uppercase tracking-wider"
};

export default function InsurancePolicyForm({ onClose }: { onClose: () => void }) {
  const [form, setForm] = useState({
    insuranceType: "",
    insuredName: "",
    insuredAddress: "",
    businessNature: "",
    policyType: "", 
    coverType: "individual", 
    maternityCover: false,
    preExistingDisease: false,
    roomRentLimit: "",
    sumInsured: "",
    claimLastYear: "no"
  });

  const [files, setFiles] = useState<Record<string, File | null>>({});
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);

  const handleInputChange = (field: string, value: any) => {
    setForm(prev => ({ ...prev, [field]: value }));
    if (errors[field]) setErrors(prev => ({ ...prev, [field]: "" }));
  };

  const handleFileChange = (field: string, file: File | null) => {
    setFiles(prev => ({ ...prev, [field]: file }));
    if (file && errors[field]) setErrors(prev => ({ ...prev, [field]: "" }));
  };

  const validate = () => {
    const newErrors: Record<string, string> = {};
    if (!form.insuranceType) newErrors.insuranceType = "Required";

    if (form.insuranceType === "GMC") {
      if (!form.insuredName) newErrors.insuredName = "Insured name required";
      if (!form.sumInsured) newErrors.sumInsured = "Sum insured required";
      if (!form.policyType) newErrors.policyType = "Select policy type";
      if (!files.gmcExcel) newErrors.gmcExcel = "Upload employee excel";
      if (form.claimLastYear === "yes" && !files.claimedFile) newErrors.claimedFile = "Upload claim MIS";
    } else if (form.insuranceType === "GPA") {
      if (!files.gpaExcel) newErrors.gpaExcel = "Upload GPA excel";
    } else if (form.insuranceType === "WC") {
      if (!files.wcExcel) newErrors.wcExcel = "Upload WC excel";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;
    setIsSubmitting(true);
    await new Promise(r => setTimeout(r, 1500));
    setIsSubmitting(false);
    setShowSuccess(true);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4 text-gray-700">
      <div className="bg-white rounded-xl shadow-2xl w-full max-w-4xl flex flex-col relative overflow-hidden max-h-[95vh]">
        
        <div className="flex justify-between items-center border-b px-6 py-4 shrink-0 bg-white">
          <h2 className="text-xl font-bold text-[#1CADA3]">Insurance Policy Registration</h2>
          <button onClick={onClose} className="text-gray-400 hover:text-gray-800 transition-colors">
            <X size={24} />
          </button>
        </div>

        <div className="overflow-y-auto p-6 sm:p-8 bg-white">
          <form onSubmit={handleSubmit} className="space-y-6">
            
            <div className="w-full">
              <Field 
                type="select" 
                label="Insurance Product Type" 
                value={form.insuranceType} 
                onChange={(v: string) => handleInputChange("insuranceType", v)} 
                options={["GMC", "GPA", "WC"]} 
                error={errors.insuranceType}
                required 
              />
            </div>

            {form.insuranceType === "GMC" && (
              <div className="space-y-6 animate-in fade-in slide-in-from-top-2 duration-300">
                <h3 className={STYLES.sectionTitle}>Insured Details</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <Field label="Full Name of Insured" value={form.insuredName} onChange={(v: any) => handleInputChange("insuredName", v)} error={errors.insuredName} required />
                  <Field label="Nature of Business" value={form.businessNature} onChange={(v: any) => handleInputChange("businessNature", v)} placeholder="e.g. IT, Manufacturing" />
                  <div className="md:col-span-2">
                    <Field label="Insured Address" value={form.insuredAddress} onChange={(v: any) => handleInputChange("insuredAddress", v)} />
                  </div>
                </div>

                <h3 className={STYLES.sectionTitle}>Policy Configuration</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <Field type="select" label="Policy Type" options={["fresh", "renewal"]} value={form.policyType} onChange={(v: any) => handleInputChange("policyType", v)} error={errors.policyType} required />
                  <Field label="Sum Insured Amount" value={form.sumInsured} onChange={(v: any) => handleInputChange("sumInsured", v)} onlyNumber placeholder="Amount per person" error={errors.sumInsured} required />
                </div>

                <div className="bg-gray-50 p-5 rounded-xl border border-gray-200">
                  <label className={STYLES.label}>Cover Required</label>
                  <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mt-3">
                    <label className="flex items-center space-x-3 cursor-pointer bg-white px-4 h-12 rounded-md border border-gray-300 shadow-sm">
                      <input type="radio" name="cover" className="accent-blue-500 w-4 h-4" checked={form.coverType === 'individual'} onChange={() => handleInputChange("coverType", 'individual')} />
                      <span className="text-sm font-bold text-gray-600">Individual</span>
                    </label>
                    <label className="flex items-center space-x-3 cursor-pointer bg-white px-4 h-12 rounded-md border border-gray-300 shadow-sm">
                      <input type="radio" name="cover" className="accent-blue-500 w-4 h-4" checked={form.coverType === 'floater'} onChange={() => handleInputChange("coverType", 'floater')} />
                      <span className="text-sm font-bold text-gray-600">Floater</span>
                    </label>
                    <label className="flex items-center space-x-3 cursor-pointer bg-white px-4 h-12 rounded-md border border-gray-300 shadow-sm">
                      <input type="checkbox" className="accent-blue-500 w-4 h-4" checked={form.maternityCover} onChange={(e) => handleInputChange("maternityCover", e.target.checked)} />
                      <span className="text-sm font-bold text-gray-600">Maternity</span>
                    </label>
                    <label className="flex items-center space-x-3 cursor-pointer bg-white px-4 h-12 rounded-md border border-gray-300 shadow-sm">
                      <input type="checkbox" className="accent-blue-500 w-4 h-4" checked={form.preExistingDisease} onChange={(e) => handleInputChange("preExistingDisease", e.target.checked)} />
                      <span className="text-sm font-bold text-gray-600">Pre Existing Disease</span>
                    </label>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                   <Field label="Room Rent Limit" value={form.roomRentLimit} onChange={(v: any) => handleInputChange("roomRentLimit", v)} placeholder="e.g. 1% of SI" />
                   <Field type="select" label="Any claim taken last year?" value={form.claimLastYear} onChange={(v: any) => handleInputChange("claimLastYear", v)} options={["yes", "no"]} />
                </div>

                <h3 className={STYLES.sectionTitle}>Required Documents</h3>
                <div className="space-y-6"> {/* Use vertical space instead of grid here */}
                   <FileUpload 
                      label="Employee Details (Excel)" 
                      onUpdate={(f: any) => handleFileChange("gmcExcel", f)} 
                      error={errors.gmcExcel} 
                      showTemplateGuide
                   />
                   
                   {form.claimLastYear === "yes" && (
                     <div className="grid grid-cols-1 md:grid-cols-2">
                        <FileUpload label="Claim History / MIS Report" onUpdate={(f: any) => handleFileChange("claimedFile", f)} error={errors.claimedFile} />
                     </div>
                   )}
                </div>
              </div>
            )}

            {(form.insuranceType === "GPA" || form.insuranceType === "WC") && (
              <div className="pt-4 animate-in fade-in slide-in-from-top-2">
                <FileUpload 
                  label={`Upload ${form.insuranceType} Employee Census`} 
                  onUpdate={(f: any) => handleFileChange(form.insuranceType === "GPA" ? "gpaExcel" : "wcExcel", f)} 
                  error={errors[form.insuranceType === "GPA" ? "gpaExcel" : "wcExcel"]} 
                  showTemplateGuide
                />
              </div>
            )}

            <div className="flex justify-center pt-8 pb-4">
              <button type="submit" disabled={isSubmitting} className={STYLES.btn}>
                {isSubmitting ? "Submitting..." : "Submit Policy Details"}
              </button>
            </div>
          </form>
        </div>

        {showSuccess && <SuccessModal onClose={onClose} />}
      </div>
    </div>
  );
}

// Sub-components remains the same logic, but I'll ensure FileUpload looks good full-width

function Field({ label, value, onChange, type = "text", options, required, placeholder, onlyNumber, error }: any) {
  const handleChange = (e: any) => onChange(e.target.value);
  const handleKeyDown = (e: any) => {
    if (onlyNumber && !["Backspace", "Delete", "ArrowLeft", "ArrowRight", "Tab"].includes(e.key) && !/^[0-9]$/.test(e.key)) {
      e.preventDefault();
    }
  };

  return (
    <div className="w-full">
      <label className={STYLES.label}>{label} {required && <span className="text-red-500">*</span>}</label>
      <div className="relative">
        {type === "select" ? (
          <>
            <select value={value} onChange={handleChange} className={STYLES.input(!!error)}>
              <option value="">Select Option</option>
              {options?.map((opt: string) => <option key={opt} value={opt}>{opt.toUpperCase()}</option>)}
            </select>
            <ChevronDown className="absolute right-3 top-2.5 text-gray-400 pointer-events-none" size={18} />
          </>
        ) : (
          <input type={type} value={value} onChange={handleChange} onKeyDown={handleKeyDown} placeholder={placeholder} className={STYLES.input(!!error)} />
        )}
      </div>
      {error && <p className={STYLES.errorText}>{error}</p>}
    </div>
  );
}

function FileUpload({ label, onUpdate, error, showTemplateGuide }: any) {
  const [file, setFile] = useState<File | null>(null);
  const [isValidating, setIsValidating] = useState(false);
  const [localError, setLocalError] = useState<string | null>(null);
  const ref = useRef<HTMLInputElement>(null);

  const REQUIRED_HEADERS = [
    "Sl NO", "E. Code", "Name", "DOB", "Relation", "Age (Yr)", "GENDER", "Sum Insured"
  ];

  const validateExcel = async (file: File) => {
    setIsValidating(true);
    setLocalError(null);

    const reader = new FileReader();
    reader.onload = (e) => {
      try {
        const data = new Uint8Array(e.target?.result as ArrayBuffer);
        const workbook = XLSX.read(data, { type: 'array' });
        const firstSheetName = workbook.SheetNames[0];
        const worksheet = workbook.Sheets[firstSheetName];
        
        // Get the first row (headers)
        const jsonData: any[] = XLSX.utils.sheet_to_json(worksheet, { header: 1 });
        const uploadedHeaders = (jsonData[0] || []).map((h: any) => String(h).trim());

        // Check if all required headers exist
        const missingHeaders = REQUIRED_HEADERS.filter(
          req => !uploadedHeaders.some((up: string) => up.toLowerCase() === req.toLowerCase())
        );

        if (missingHeaders.length > 0) {
          setLocalError(`Invalid Format. Missing: ${missingHeaders.join(", ")}`);
          setFile(null);
          onUpdate(null);
        } else {
          setFile(file);
          onUpdate(file);
        }
      } catch (err) {
        setLocalError("Could not read file. Please upload a valid Excel/CSV.");
      } finally {
        setIsValidating(false);
      }
    };

    reader.readAsArrayBuffer(file);
  };

  const handleFiles = (e: React.ChangeEvent<HTMLInputElement>) => {
    const f = e.target.files?.[0];
    if (!f) return;

    // Basic extension check before deep validation
    const ext = f.name.split('.').pop()?.toLowerCase();
    if (!['xlsx', 'xls', 'csv'].includes(ext || '')) {
      setLocalError("Invalid file type. Please upload .xlsx or .csv");
      return;
    }

    if (showTemplateGuide) {
      validateExcel(f); // Deep validation for employee details
    } else {
      setFile(f);
      onUpdate(f);
    }
  };

  const downloadTemplate = () => {
    const csvContent = REQUIRED_HEADERS.join(",") + "\n1,EMP001,John Doe,1990-01-01,Self,34,Male,500000";
    const blob = new Blob([csvContent], { type: 'text/csv' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'employee_template.csv';
    a.click();
  };

  return (
    <div className="w-full flex flex-col">
      <div className="flex justify-between items-center mb-1.5">
        <label className="text-sm font-semibold text-gray-700">{label} <span className="text-red-500">*</span></label>
        {showTemplateGuide && (
          <button type="button" onClick={downloadTemplate} className="text-[10px] font-bold text-[#2076C7] flex items-center gap-1 hover:underline uppercase">
            <Download size={12} /> Download Format
          </button>
        )}
      </div>

      {showTemplateGuide && !file && (
        <div className="mb-2 p-1.5 bg-blue-50 border border-blue-100 rounded text-[10px] text-blue-800 flex items-center gap-2">
          <Info size={14} className="shrink-0 text-blue-500" />
          <p>Strict Format: <span className="font-mono font-bold">{REQUIRED_HEADERS.join(", ")}</span></p>
        </div>
      )}

      <input type="file" ref={ref} onChange={handleFiles} className="hidden" accept=".xlsx,.xls,.csv" />
      
      {!file ? (
        <div 
          onClick={() => !isValidating && ref.current?.click()} 
          className={`cursor-pointer border border-dashed rounded-lg px-4 py-2.5 flex flex-row items-center justify-center gap-3 transition-all 
            ${(error || localError) ? "border-red-400 bg-red-50" : "border-gray-300 hover:border-[#1CADA3] hover:bg-teal-50 bg-gray-50/50"}`}
        >
          {isValidating ? (
            <>
              <Loader2 size={18} className="animate-spin text-[#1CADA3]" />
              <span className="text-xs font-bold text-gray-500">Validating file structure...</span>
            </>
          ) : (
            <>
              <UploadCloud size={18} className={(error || localError) ? "text-red-500" : "text-[#1CADA3]"} />
              <div className="flex items-baseline gap-2">
                <span className="text-xs font-bold text-gray-600">Click to upload spreadsheet</span>
                <span className="text-[10px] text-gray-400 font-normal">(.xlsx, .csv)</span>
              </div>
            </>
          )}
        </div>
      ) : (
        <div className="flex items-center justify-between bg-teal-50 border border-[#1CADA3] px-3 py-2 rounded-lg shadow-sm">
          <div className="flex items-center truncate">
            <CheckCircle className="w-4 h-4 text-[#1CADA3] mr-2 shrink-0" />
            <span className="truncate text-xs font-bold text-gray-800">{file.name}</span>
          </div>
          <button type="button" onClick={() => { setFile(null); onUpdate(null); setLocalError(null); }} className="text-gray-400 hover:text-red-500">
            <Trash2 size={16} />
          </button>
        </div>
      )}

      {(localError || error) && (
        <div className="flex items-center gap-1 mt-1 text-red-500">
          <AlertCircle size={12} />
          <p className="text-[10px] font-medium">{localError || error}</p>
        </div>
      )}
    </div>
  );
}

function SuccessModal({ onClose }: { onClose: () => void }) {
  return (
    <div className="absolute inset-0 z-[60] flex items-center justify-center bg-black/60 animate-in fade-in zoom-in duration-200">
      <div className="bg-white p-8 rounded-2xl shadow-2xl text-center max-w-sm w-[90%] mx-auto">
        <div className="w-20 h-20 bg-teal-100 rounded-full flex items-center justify-center mx-auto mb-4">
          <CheckCircle className="w-12 h-12 text-[#1CADA3]" />
        </div>
        <h3 className="text-2xl font-bold text-gray-800 mb-2">Success!</h3>
        <p className="text-gray-600 mb-8">Your insurance details have been submitted for review.</p>
        <button onClick={onClose} className="w-full bg-gradient-to-r from-[#2076C7] to-[#1CADA3] text-white py-3 rounded-xl font-bold shadow-lg transition-transform active:scale-95">
          Great, thanks!
        </button>
      </div>
    </div>
  );
}