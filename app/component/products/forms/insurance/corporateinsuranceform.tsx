"use client";
import { useState, useRef } from "react";
import { X, CheckCircle, UploadCloud, Trash2, ChevronDown, Download, Info, AlertCircle } from "lucide-react";
import { AuthService } from "@/app/services/authService";
import * as XLSX from "xlsx"; // Required: npm install xlsx
import { toast } from "react-hot-toast";

/**
 * CSS Fix to hide number input spinners globally
 */
const hideSpinnersCSS = `
  input::-webkit-outer-spin-button,
  input::-webkit-inner-spin-button { -webkit-appearance: none; margin: 0; }
  input[type=number] { -moz-appearance: textfield; }
`;

// Header Constants
const GMC_HEADERS = ["Sl NO", "E. Code", "Name", "DOB", "Relation", "Age (Yr)", "GENDER", "Sum Insured"];
const GPA_HEADERS = ["Sr No", "First Name", "Middle Name", "Last Name", "Employee Code", "Date of Birth", "Gender", "Designation", "Gross Salary", "Sum Insured"];

const STYLES = {
  input: (hasError: boolean) =>
    `w-full border rounded-md p-2 bg-white text-gray-700 outline-none text-sm sm:text-base transition-all placeholder-gray-400 appearance-none ${hasError
      ? "border-red-500 focus:border-red-500 focus:ring-1 focus:ring-red-500"
      : "border-gray-300 focus:ring-2 focus:ring-[#1CADA3] focus:border-[#1CADA3]"
    }`,
  label: "block text-sm font-semibold mb-1 text-gray-700",
  btn: "w-full sm:w-64 bg-gradient-to-r from-[#2076C7] to-[#1CADA3] text-white py-2.5 rounded-md hover:from-[#1a68b0] hover:to-[#18998f] transition-colors text-sm sm:text-base font-bold shadow-md disabled:opacity-50 disabled:cursor-not-allowed",
  errorText: "text-red-500 text-xs mt-1",
  sectionTitle: "text-md font-bold mb-3 text-[#1CADA3] border-b pb-2 mt-6 uppercase tracking-wider"
};

interface InsurancePolicyFormProps {
  onClose: () => void;
  prefilledData?: {
    name: string;
    email: string;
    mobile: string;
  };
}

export default function InsurancePolicyForm({ onClose, prefilledData }: InsurancePolicyFormProps) {
  const [form, setForm] = useState<any>({
    insuranceType: "",
    insuredName: prefilledData?.name || "",
    insuredAddress: "",
    businessNature: "",
    pincode: "",
    riskLocation: "",
    contactName: prefilledData?.name || "",
    contactMobile: prefilledData?.mobile || "",
    contactEmail: prefilledData?.email || "",
    policyType: "",
    coverType: "individual",
    maternityCover: false,
    preExistingDisease: false,
    roomRentLimit: "",
    sumInsured: "",
    claimLastYear: "",
    medicalExtension: "no",
    medicalLimit: "",
    censusData: [], // Stores parsed JSON
    wcRows: [
      { category: "ENGINEER", count: "4", months: "12", monthlyWage: "40800" },
      { category: "SUPERVISOR", count: "2", months: "12", monthlyWage: "21000" },
      { category: "SKILL WORKER", count: "19", months: "12", monthlyWage: "18000" },
      { category: "UNSKILL WORKER", count: "50", months: "12", monthlyWage: "15500" },
    ]
  });

  const [files, setFiles] = useState<Record<string, File | null>>({});
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);

  /**
   * Parses file and validates headers. Returns JSON if valid, throws error if invalid.
   */
  const validateAndParseFile = (file: File, requiredHeaders: string[]): Promise<any[]> => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = (e) => {
        try {
          const data = e.target?.result;
          const workbook = XLSX.read(data, { type: "binary" });
          const sheetName = workbook.SheetNames[0];
          const worksheet = workbook.Sheets[sheetName];
          
          // Get first row to check headers
          const headers: string[] = XLSX.utils.sheet_to_json(worksheet, { header: 1 })[0] as string[];
          
          if (!headers) {
            reject("The uploaded file is empty.");
            return;
          }

          // Check if every required header exists (Case insensitive check)
          const fileHeadersLower = headers.map(h => String(h).trim().toLowerCase());
          const missing = requiredHeaders.filter(h => !fileHeadersLower.includes(h.toLowerCase()));

          if (missing.length > 0) {
            reject(`Invalid format. Missing columns: ${missing.join(", ")}`);
            return;
          }

          // Convert full sheet to JSON
          const json = XLSX.utils.sheet_to_json(worksheet);
          resolve(json);
        } catch (err) {
          reject("Could not read file. Please upload a valid Excel or CSV.");
        }
      };
      reader.readAsBinaryString(file);
    });
  };

  const handleInsuranceTypeChange = (type: string) => {
    setForm((prev: any) => ({
      ...prev,
      insuranceType: type,
      policyType: "",
      pincode: "",
      medicalExtension: "no",
      medicalLimit: "",
      censusData: []
    }));
    setFiles({});
    setErrors({});
  };

  const handleInputChange = (field: string, value: any) => {
    setForm((prev: any) => ({ ...prev, [field]: value }));
    if (errors[field]) setErrors(prev => ({ ...prev, [field]: "" }));
  };

  const handleFileChange = async (field: string, file: File | null) => {
    if (!file) {
        setFiles(prev => ({ ...prev, [field]: null }));
        if (field === "gmcExcel" || field === "gpaExcel") setForm((p: any) => ({ ...p, censusData: [] }));
        return;
    }

    // Census Validation Logic
    if (field === "gmcExcel" || field === "gpaExcel") {
      const required = field === "gmcExcel" ? GMC_HEADERS : GPA_HEADERS;
      try {
        const jsonData = await validateAndParseFile(file, required);
        // If we reach here, file is valid
        setFiles(prev => ({ ...prev, [field]: file }));
        setForm((prev: any) => ({ ...prev, censusData: jsonData }));
        setErrors(prev => ({ ...prev, [field]: "" }));
      } catch (err: any) {
        // If invalid, don't save the file and show error
        setErrors(prev => ({ ...prev, [field]: err }));
        setFiles(prev => ({ ...prev, [field]: null }));
      }
    } else {
      // Normal files (GST/Renewal) - no header check
      setFiles(prev => ({ ...prev, [field]: file }));
      if (errors[field]) setErrors(prev => ({ ...prev, [field]: "" }));
    }
  };

  const handleWCRowChange = (index: number, field: string, value: string) => {
    const updatedRows = [...form.wcRows];
    let sanitizedValue = value;
    if (["count", "months", "monthlyWage"].includes(field)) {
      if (parseFloat(value) < 0) sanitizedValue = "0";
    }
    updatedRows[index] = { ...updatedRows[index], [field]: sanitizedValue };
    setForm((prev: any) => ({ ...prev, wcRows: updatedRows }));
  };

  const validate = () => {
    const newErrors: Record<string, string> = {};
    if (!form.insuranceType) newErrors.insuranceType = "Required";

    if (form.insuranceType) {
      if (!form.insuredName) newErrors.insuredName = "Name required";
      if (!form.contactName) newErrors.contactName = "Contact name required";
      if (!form.contactMobile || form.contactMobile.length < 10) newErrors.contactMobile = "10 digit number required";
      if (!form.contactEmail || !/\S+@\S+\.\S+/.test(form.contactEmail)) newErrors.contactEmail = "Valid email required";
    }

    if (form.insuranceType === "WC" || form.insuranceType === "GPA") {
      if (!form.pincode || form.pincode.length < 6) newErrors.pincode = "6 digit Pincode required";
    }

    if (form.insuranceType === "GMC" && !files.gmcExcel) newErrors.gmcExcel = "Valid Employee Census required";
    if (form.insuranceType === "GPA" && !files.gpaExcel) newErrors.gpaExcel = "Valid Employee Census required";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;
    setIsSubmitting(true);

    try {
      const payload = {
        department: "Insurance",
        product_type: "Corporate Insurance",
        sub_category: "Corporate Insurance",
        client: {
          name: form.insuredName,
          mobile: form.contactMobile,
          email: form.contactEmail,
        },
        meta: { is_self_login: false },
        form_data: { ...form }
      };

      await AuthService.createLead(payload);
      setShowSuccess(true);
    } catch (err) {
      toast.error("Submission error");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4 text-gray-700">
      <style>{hideSpinnersCSS}</style>
      <div className="bg-white rounded-xl shadow-2xl w-full max-w-5xl flex flex-col relative overflow-hidden max-h-[95vh]">

        <div className="flex justify-between items-center border-b px-6 py-4 shrink-0 bg-white">
          <h2 className="text-xl font-bold text-[#1CADA3]">Corporate Insurance Form</h2>
          <button onClick={onClose} className="text-gray-400 hover:text-gray-800 transition-colors"><X size={24} /></button>
        </div>

        <div className="overflow-y-auto p-6 sm:p-8 bg-white">
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="w-full">
              <Field type="select" label="Insurance Product Type" value={form.insuranceType} onChange={handleInsuranceTypeChange} options={["GMC", "GPA", "WC"]} error={errors.insuranceType} required />
            </div>

            {(form.insuranceType === "GMC" || form.insuranceType === "GPA") && (
              <div className="space-y-6 animate-in fade-in slide-in-from-top-2 duration-300">
                <h3 className={STYLES.sectionTitle}>{form.insuranceType === "GPA" ? "Organisation Details" : "Insured Details"}</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <Field label={form.insuranceType === "GPA" ? "Name Of Organisation" : "Full Name of Insured"} value={form.insuredName} onChange={(v: any) => handleInputChange("insuredName", v)} error={errors.insuredName} required />
                  <Field label="Nature of Business" value={form.businessNature} onChange={(v: any) => handleInputChange("businessNature", v)} placeholder="e.g. IT, Manufacturing" />
                  <div className={form.insuranceType === "GPA" ? "md:col-span-1" : "md:col-span-2"}>
                    <Field label={form.insuranceType === "GPA" ? "Address Of Organisation" : "Insured Address"} value={form.insuredAddress} onChange={(v: any) => handleInputChange("insuredAddress", v)} />
                  </div>
                  {form.insuranceType === "GPA" && (
                    <Field label="Pin Code" value={form.pincode} onChange={(v: any) => handleInputChange("pincode", v)} error={errors.pincode} onlyNumber maxLength={6} required placeholder="6-digit PIN" />
                  )}
                </div>

                <h3 className={STYLES.sectionTitle}>Contact Person Details</h3>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <Field label="Contact Person Name" value={form.contactName} onChange={(v: any) => handleInputChange("contactName", v)} error={errors.contactName} required />
                  <Field label="Mobile Number" value={form.contactMobile} onChange={(v: any) => handleInputChange("contactMobile", v)} error={errors.contactMobile} required onlyNumber maxLength={10} placeholder="10-digit number" />
                  <Field label="Email ID" value={form.contactEmail} onChange={(v: any) => handleInputChange("contactEmail", v)} error={errors.contactEmail} required placeholder="email@company.com" />
                </div>

                <h3 className={STYLES.sectionTitle}>Policy Configuration</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <Field type="select" label="Type of Policy" options={["fresh", "renewal"]} value={form.policyType} onChange={(v: any) => handleInputChange("policyType", v)} error={errors.policyType} required />
                  {form.policyType === "renewal" && (
                    <Field type="select" label="Any claim taken last year?" value={form.claimLastYear} onChange={(v: any) => handleInputChange("claimLastYear", v)} options={["yes", "no"]} />
                  )}
                </div>

                {form.insuranceType === "GMC" && (
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <Field label="Sum Insured Amount" value={form.sumInsured} onChange={(v: any) => handleInputChange("sumInsured", v)} onlyNumber placeholder="Amount per person" error={errors.sumInsured} required />
                    <Field label="Room Rent Limit" value={form.roomRentLimit} onChange={(v: any) => handleInputChange("roomRentLimit", v)} placeholder="e.g. 1% of SI" />
                  </div>
                )}

                <h3 className={STYLES.sectionTitle}>Required Documents</h3>
                <div className="space-y-6">
                  <FileUpload 
                    label={form.insuranceType === "GMC" ? "GMC Employee Details" : "GPA Employee Census"} 
                    onUpdate={(f: any) => handleFileChange(form.insuranceType === "GMC" ? "gmcExcel" : "gpaExcel", f)} 
                    error={errors[form.insuranceType === "GMC" ? "gmcExcel" : "gpaExcel"]} 
                    showTemplateGuide 
                    requiredHeaders={form.insuranceType === "GMC" ? GMC_HEADERS : GPA_HEADERS} 
                  />
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <FileUpload label="GST Certificate of company" onUpdate={(f: any) => handleFileChange("gstCertificate", f)} error={errors.gstCertificate} />
                    {form.policyType === "renewal" && <FileUpload label="Previous Policy Copy" onUpdate={(f: any) => handleFileChange("renewalCopy", f)} error={errors.renewalCopy} />}
                  </div>
                </div>
              </div>
            )}

            {form.insuranceType === "WC" && (
              <div className="space-y-6 animate-in fade-in slide-in-from-top-2">
                <h3 className={STYLES.sectionTitle}>Organisation Details</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <Field label="Name Of Organisation" value={form.insuredName} onChange={(v: any) => handleInputChange("insuredName", v)} error={errors.insuredName} required />
                  <div className="md:col-span-1">
                    <Field label="Address Of Organisation" value={form.insuredAddress} onChange={(v: any) => handleInputChange("insuredAddress", v)} required />
                  </div>
                  <Field label="Pin Code" value={form.pincode} onChange={(v: any) => handleInputChange("pincode", v)} error={errors.pincode} onlyNumber maxLength={6} required placeholder="6-digit PIN" />
                </div>
                <h3 className={STYLES.sectionTitle}>Risk Location Details</h3>
                <Field label="RISK LOCATION (Address with Pin Code)" value={form.riskLocation} onChange={(v: any) => handleInputChange("riskLocation", v)} error={errors.riskLocation} required />
                <h3 className={STYLES.sectionTitle}>Required Documents</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <FileUpload label="GST Certificate of company" onUpdate={(f: any) => handleFileChange("gstCertificate", f)} error={errors.gstCertificate} />
                </div>
              </div>
            )}

            <div className="flex justify-center pt-8 pb-4">
              <button type="submit" disabled={isSubmitting} className={STYLES.btn}>{isSubmitting ? "Submitting..." : "Submit Application"}</button>
            </div>
          </form>
        </div>
        {showSuccess && <SuccessModal onClose={onClose} />}
      </div>
    </div>
  );
}

function Field({ label, value, onChange, type = "text", options, required, placeholder, onlyNumber, error, maxLength }: any) {
  const handleChange = (e: any) => {
    let val = e.target.value;
    if (maxLength && val.length > maxLength) val = val.slice(0, maxLength);
    onChange(val);
  };
  const handleKeyDown = (e: any) => {
    if (onlyNumber && !["Backspace", "Delete", "ArrowLeft", "ArrowRight", "Tab"].includes(e.key) && !/^[0-9]$/.test(e.key)) e.preventDefault();
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
          <input type={type} value={value} onChange={handleChange} onKeyDown={handleKeyDown} placeholder={placeholder} className={STYLES.input(!!error)} maxLength={maxLength} />
        )}
      </div>
      {error && <p className={STYLES.errorText}>{error}</p>}
    </div>
  );
}

function FileUpload({ label, onUpdate, error, showTemplateGuide, requiredHeaders = [] }: any) {
  const [file, setFile] = useState<File | null>(null);
  const ref = useRef<HTMLInputElement>(null);

  // Re-sync local file state if parent clears it due to validation failure
  const handleInternalUpdate = (f: File | null) => {
    setFile(f);
    onUpdate(f);
  };

  return (
    <div className="w-full flex flex-col">
      <div className="flex justify-between items-center mb-1.5">
        <label className="text-sm font-semibold text-gray-700">{label} <span className="text-red-500">*</span></label>
        {showTemplateGuide && (
          <button type="button" onClick={() => {
            const csv = requiredHeaders.join(",") + "\n" + requiredHeaders.map(() => "Data").join(",");
            const blob = new Blob([csv], { type: 'text/csv' });
            const url = window.URL.createObjectURL(blob);
            const a = document.createElement('a'); a.href = url; a.download = 'template.csv'; a.click();
          }} className="text-[10px] font-bold text-[#2076C7] flex items-center gap-1 hover:underline"><Download size={12} /> Download Format</button>
        )}
      </div>
      {showTemplateGuide && !file && (
        <div className="mb-2 p-2 bg-blue-50 border border-blue-100 rounded text-[10px] text-blue-800 flex items-center gap-2">
          <Info size={14} className="shrink-0 text-blue-500" />
          <p>Format: <span className="font-mono font-bold">{requiredHeaders.join(", ")}</span></p>
        </div>
      )} 
      <input type="file" ref={ref} accept=".xlsx, .xls, .csv" onChange={(e) => { 
        const f = e.target.files?.[0]; 
        if (f) {
            handleInternalUpdate(f);
            // If parent rejects it (validation fails), the internal state is reset via a useEffect or clear logic
            // but for simplicity in this flow, we handle it in handleFileChange
        }
      }} className="hidden" />
      
      {/* If file exists but the parent error state is set specifically for this file, clear local view */}
      {(!file || error?.includes("Invalid")) ? (
        <div onClick={() => ref.current?.click()} className={`cursor-pointer border border-dashed rounded-lg px-4 py-2.5 flex flex-row items-center justify-center gap-3 transition-all ${error ? "border-red-400 bg-red-50" : "border-gray-300 hover:border-[#1CADA3] hover:bg-teal-50 bg-gray-50/50"}`}>
          <UploadCloud size={18} className={error ? "text-red-500" : "text-[#1CADA3]"} />
          <span className="text-xs font-bold text-gray-600">Click to upload</span>
        </div>
      ) : (
        <div className="flex items-center justify-between bg-teal-50 border border-[#1CADA3] px-3 py-2 rounded-lg">
          <span className="truncate text-xs font-bold text-gray-800">{file.name}</span>
          <button type="button" onClick={() => { setFile(null); onUpdate(null); }} className="text-gray-400 hover:text-red-500"><Trash2 size={16} /></button>
        </div>
      )}
      {error && <div className="flex items-center gap-1 mt-1 text-red-500"><AlertCircle size={12} /><p className="text-[10px] font-medium">{error}</p></div>}
    </div>
  );
}

function SuccessModal({ onClose }: { onClose: () => void }) {
  return (
    <div className="absolute inset-0 z-[60] flex items-center justify-center bg-black/60 animate-in fade-in zoom-in duration-200">
      <div className="bg-white p-8 rounded-2xl shadow-2xl text-center max-w-sm w-[90%] mx-auto">
        <div className="w-20 h-20 bg-teal-100 rounded-full flex items-center justify-center mx-auto mb-4"><CheckCircle className="w-12 h-12 text-[#1CADA3]" /></div>
        <h3 className="text-2xl font-bold text-gray-800 mb-2">Success!</h3>
        <p className="text-gray-600 mb-8">Your details have been submitted.</p>
        <button onClick={onClose} className="w-full bg-gradient-to-r from-[#2076C7] to-[#1CADA3] text-white py-3 rounded-xl font-bold">Great, thanks!</button>
      </div>
    </div>
  );
}