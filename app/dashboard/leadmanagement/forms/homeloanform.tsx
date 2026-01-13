"use client";
import { useState, useRef, useMemo } from "react";
import { X, CheckCircle, UploadCloud, Trash2, Plus, ChevronDown, ShieldCheck } from "lucide-react";
import { DashboardService } from "../../../services/dashboardService";

const STYLES = {
  input: (err: boolean) => `w-full border rounded-md p-2 bg-white text-gray-700 outline-none text-sm sm:text-base transition-all placeholder-gray-400 appearance-none ${err ? "border-red-500 focus:ring-1 focus:ring-red-500" : "border-gray-300 focus:ring-2 focus:ring-[#1CADA3] focus:border-[#1CADA3]"}`,
  label: "block text-sm font-medium mb-1 text-gray-700",
  btn: "w-full sm:w-50 bg-gradient-to-r from-[#2076C7] to-[#1CADA3] text-white py-2 rounded-md hover:from-[#1a68b0] hover:to-[#18998f] transition-colors text-sm sm:text-base font-medium shadow-md disabled:opacity-50 disabled:cursor-not-allowed",
  err: "text-red-500 text-xs mt-1"
};

const DOC_MAP: Record<string, string[]> = {
  "Salaried Person": ["Aadhaar Card", "Pan Card", "3 Months Salary Slip", "2 Years Form 16", "6 Months Banking Statement", "Address Proof", "Photograph", "Property Cost Sheet / Index II", "Own Contribution Proof"],
  "Self Employed": ["Aadhaar Card", "Pan Card", "Udyam Registration", "Shop Act Licence", "1 Current Banking Statement", "Saving Bank Account", "Address Proof", "3 Years ITR", "GST Certificate", "Last 12 Months GST Returns", "Photograph", "Property Cost Sheet / Index II", "Own Contribution Proof"],
  "Pension": ["Aadhaar Card", "Pan Card", "PPO (Pension Payment Order)", "1 Year Pension Credit Statement"],
  "Rental": ["Rent Agreement", "1 Year Rent Credit Statement"],
};

const LOAN_TYPES = ["Balance Transfer", "Fresh Home Loan", "Home Equity Loan", "Top-up Loan", "Plot Loan", "Construction Loan", "Resale Home Loan"];

export default function HomeLoanForm({ onClose }: { onClose: () => void }) {
  const [form, setForm] = useState<Record<string, string>>({
    isSelfLogin: "No",
    refId: "", fileId: "", loanAmount: "",
    clientName: "", location: "", bankName: "",
    rmName: "", rmContact: "", rmEmail: "",
    loanType: "", phone: "", email: "", dob: "",
    hasOtherLoan: "", otherLoanAmount: "",
    employmentType: "", otherIncome: "", otherIncomeAmount: ""
  });

  const [errors, setErrors] = useState<Record<string, string>>({});
  
  // 🔹 Store actual File objects for upload
  const [uploadedFiles, setUploadedFiles] = useState<Record<string, File[]>>({});
  
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);

  const isSelfLoginActive = form.isSelfLogin === "Yes";

  const requiredDocs = useMemo(() => {
    if (isSelfLoginActive) return [];
    let docs = [...(DOC_MAP[form.employmentType] || [])];
    if (form.employmentType === "Other") docs.push(...(DOC_MAP[form.otherIncome] || []));
    if (form.hasOtherLoan === "Yes" && docs.length) docs.push("Existing Loan Statement");
    return [...new Set(docs)];
  }, [form, isSelfLoginActive]);

  const handleInputChange = (field: string, value: string) => {
    setForm(prev => ({ ...prev, [field]: value }));
    if (errors[field]) setErrors(prev => ({ ...prev, [field]: "" }));
  };

  const validate = () => {
    const errs: Record<string, string> = {};
    const req = (f: string, msg: string) => { if (!form[f]?.trim()) errs[f] = msg; };

    if (isSelfLoginActive) {
      req("fileId", "File Number is required");
      req("clientName", "Name is required");
      req("location", "Location is required");
      req("loanAmount", "Loan Amount is required");
      req("bankName", "Bank Name is required");
      req("rmName", "RM/SM Name is required");
      if (!form.rmContact || form.rmContact.length !== 10) errs.rmContact = "Invalid contact";
      if (!form.rmEmail || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.rmEmail)) errs.rmEmail = "Invalid email";
    } else {
      req("loanType", "Select a loan type");
      req("clientName", "Client Name is required");
      req("location", "Location is required");
      req("dob", "Date of Birth is required");
      req("loanAmount", "Loan Amount is required");
      req("employmentType", "Employment Type is required");
      if (!form.phone || form.phone.length !== 10) errs.phone = "Invalid phone";
      if (!form.email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) errs.email = "Invalid email";
      if (form.hasOtherLoan === "Yes" && !form.otherLoanAmount) errs.otherLoanAmount = "Amount required";
      
      // Validation for mandatory documents (optional: uncomment to force upload)
      // requiredDocs.forEach(d => { if (!uploadedFiles[d] || uploadedFiles[d].length === 0) errs[`doc_${d}`] = `Upload ${d}`; });
    }

    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;
    setIsSubmitting(true);

    try {
      // 1. Prepare Lead Payload
      const payload = {
        department: "Loan",
        product_type: "Home Loan",
        sub_category: "Home Loan",
        client: {
          name: form.clientName,
          mobile: isSelfLoginActive ? form.rmContact : form.phone,
          email: isSelfLoginActive ? form.rmEmail : form.email,
        },
        meta: { is_self_login: isSelfLoginActive },
        form_data: isSelfLoginActive ? {
          refId: form.refId,
          fileId: form.fileId,
          bankName: form.bankName,
          rmName: form.rmName,
          location: form.location,
          loanAmount: form.loanAmount,
        } : {
          loanType: form.loanType,
          dob: form.dob,
          location: form.location,
          loanAmount: form.loanAmount,
          employmentType: form.employmentType,
          hasOtherLoan: form.hasOtherLoan,
          otherLoanAmount: form.otherLoanAmount,
          otherIncome: form.otherIncome || "N/A",
          otherIncomeAmount: form.otherIncomeAmount || "0"
        }
      };

      // 2. Call Create Lead API
      const result = await DashboardService.createLead(payload);
      const leadId = result.data?.id;

      // 3. Upload Documents if lead creation was successful
      if (leadId && Object.keys(uploadedFiles).length > 0) {
        const uploadPromises: Promise<any>[] = [];

        for (const [docLabel, files] of Object.entries(uploadedFiles)) {
          files.forEach((file) => {
            const formData = new FormData();
            formData.append("file", file);
            formData.append("document_type", docLabel); // Identifying the doc category
            uploadPromises.push(DashboardService.uploadLeadDocument(leadId, formData));
          });
        }

        if (uploadPromises.length > 0) {
          await Promise.all(uploadPromises);
        }
      }

      setShowSuccess(true);
    } catch (err) {
      console.error("Submission error:", err);
      alert("Failed to submit application. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const fieldProps = (name: string) => ({
    value: form[name],
    onChange: (v: string) => handleInputChange(name, v),
    error: errors[name]
  });

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 p-2 sm:p-4 text-gray-700">
      <div className="bg-white rounded-xl shadow-xl w-full max-w-4xl mx-auto h-[95vh] sm:h-[90vh] flex flex-col relative">
        <div className="flex justify-between items-center border-b px-4 sm:px-6 py-3 sm:py-4 shrink-0 bg-white rounded-t-xl">
          <h2 className="text-lg sm:text-xl font-semibold text-[#1CADA3]">Home Loan Form</h2>
          <button onClick={onClose} className="text-gray-500 hover:text-gray-800 transition-colors"><X size={20} /></button>
        </div>

        <div className="flex-1 overflow-y-auto p-4 sm:p-6">
          <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6">
            
            <div className="col-span-1 md:col-span-2 bg-[#1CADA3]/5 border-l-4 border-[#1CADA3] p-4 rounded-r-lg shadow-sm mb-2">
              <div className="flex items-center gap-2 mb-2">
                <ShieldCheck className="text-[#1CADA3]" size={20} />
                <span className="text-sm font-bold text-[#1CADA3] uppercase tracking-wide">Direct Submission</span>
              </div>
              <Field label="Self Login to Bank?" type="select" options={["No", "Yes"]} {...fieldProps("isSelfLogin")} required />
            </div>

            {isSelfLoginActive ? (
              <>
                <Field label="Ref ID" placeholder="Enter Reference ID" {...fieldProps("refId")} />
                <Field label="File Number" placeholder="Enter File Number" {...fieldProps("fileId")} required />
                <Field label="Name" placeholder="Enter full name" {...fieldProps("clientName")} required />
                <Field label="Location" placeholder="Enter city" {...fieldProps("location")} required />
                <Field label="Loan Amount" placeholder="Desired amount" onlyNumber {...fieldProps("loanAmount")} required />
                <Field label="Bank Name" placeholder="Enter bank name" {...fieldProps("bankName")} required />
                <Field label="RM/SM Name (Bank)" placeholder="Enter RM name" {...fieldProps("rmName")} required />
                <Field label="RM/SM Contact (Bank)" placeholder="10-digit number" type="tel" maxLength={10} onlyNumber {...fieldProps("rmContact")} required />
                <div className="col-span-1 md:col-span-2">
                  <Field label="RM/SM Email (Bank)" placeholder="Enter RM email" type="email" {...fieldProps("rmEmail")} required />
                </div>
              </>
            ) : (
              <>
                <Field label="Type of Home Loan" type="select" options={LOAN_TYPES} {...fieldProps("loanType")} required />
                <Field label="Client Name" placeholder="Enter full name" {...fieldProps("clientName")} required />
                <Field label="Phone Number" placeholder="10-digit number" type="tel" maxLength={10} onlyNumber {...fieldProps("phone")} required />
                <Field label="Email ID" placeholder="Enter email" type="email" {...fieldProps("email")} required />
                <Field label="Date of Birth" type="date" {...fieldProps("dob")} required />
                <Field label="Location" placeholder="Enter city" {...fieldProps("location")} required />
                <Field label="Loan Amount" placeholder="Desired amount" onlyNumber {...fieldProps("loanAmount")} required />
                <Field label="Any Other Loan Obligations?" type="select" options={["Yes", "No"]} {...fieldProps("hasOtherLoan")} required />

                {form.hasOtherLoan === "Yes" && <Field label="Existing Loan Amount" placeholder="Enter amount" onlyNumber {...fieldProps("otherLoanAmount")} required />}

                <div className="col-span-1 md:col-span-2 mt-2">
                  <Field label="Employment Type" type="select" options={["Salaried Person", "Self Employed", "Other"]} {...fieldProps("employmentType")} required />
                </div>

                {form.employmentType === "Other" && (
                  <>
                    <Field label="Other Income Source" type="select" options={["Pension", "Rental"]} {...fieldProps("otherIncome")} required />
                    {["Pension", "Rental"].includes(form.otherIncome) && <Field label="Approx Amount" placeholder="Enter amount" onlyNumber {...fieldProps("otherIncomeAmount")} required />}
                  </>
                )}

                {requiredDocs.length > 0 && (
                  <div className="col-span-1 md:col-span-2 mt-4">
                    <h3 className="text-md font-semibold mb-3 text-[#1CADA3] border-b pb-2">Upload Documents</h3>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
                      {requiredDocs.map(lbl => (
                        <FileUpload 
                          key={lbl} 
                          label={lbl} 
                          allowMultiple={!["Aadhaar Card", "Pan Card"].includes(lbl)} 
                          onUpdate={(files: File[]) => {
                            setUploadedFiles(prev => ({ ...prev, [lbl]: files }));
                            if (files.length > 0) setErrors(prev => ({ ...prev, [`doc_${lbl}`]: "" }));
                          }} 
                          error={errors[`doc_${lbl}`]} 
                        />
                      ))}
                    </div>
                  </div>
                )}
              </>
            )}

            <div className="col-span-1 md:col-span-2 flex justify-center mt-6 pb-2">
              <button type="submit" disabled={isSubmitting} className={STYLES.btn}>
                {isSubmitting ? "Processing..." : "Submit Application"}
              </button>
            </div>
          </form>
        </div>
        {showSuccess && <SuccessModal onClose={onClose} />}
      </div>
    </div>
  );
}

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
            <select value={value} onChange={e => onChange(e.target.value)} className={`${STYLES.input(!!error)} cursor-pointer font-medium text-[#1CADA3]`}>
              <option value="">Select {label}</option>
              {options?.map((opt: string) => <option key={opt} value={opt} className="text-gray-700">{opt}</option>)}
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

function FileUpload({ label, allowMultiple, onUpdate, error }: any) {
  const [files, setFiles] = useState<File[]>([]);
  const [fileError, setFileError] = useState("");
  const ref = useRef<HTMLInputElement>(null);
  
  const handleFiles = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newFiles = Array.from(e.target.files || []);
    if (!newFiles.length) return;
    
    // Check for file size (2MB limit recommended for stability)
    if (newFiles.some(f => f.size > 2 * 1024 * 1024)) return setFileError("Max file size: 2MB");

    const updated = allowMultiple ? [...files, ...newFiles] : [newFiles[0]];
    setFiles(updated);
    onUpdate(updated); // Send File objects to parent
    setFileError("");
    e.target.value = "";
  };

  const removeFile = (idx: number) => {
    const updated = files.filter((_, i) => i !== idx);
    setFiles(updated);
    onUpdate(updated);
  };

  return (
    <div className="flex flex-col">
      <label className="text-sm font-medium mb-1 text-gray-700 flex justify-between">
        <span>{label}</span>
        <span className="text-[10px] text-gray-400 font-normal">{allowMultiple ? "(Multiple, <2MB)" : "(<2MB)"}</span>
      </label>
      <input type="file" ref={ref} multiple={allowMultiple} onChange={handleFiles} className="hidden" accept="image/*,application/pdf" />
      <div className="flex flex-col gap-2">
        {files.length === 0 && (
          <div onClick={() => ref.current?.click()} className={`cursor-pointer border border-dashed rounded-md h-10 flex items-center justify-center gap-2 bg-gray-50 hover:bg-[#1CADA3]/5 transition-colors group ${error ? "border-red-500 bg-red-50" : "border-gray-300 hover:border-[#1CADA3]"}`}>
            <UploadCloud size={16} className={error ? "text-red-400" : "text-gray-400 group-hover:text-[#1CADA3]"} />
            <span className={`text-xs font-medium ${error ? "text-red-500" : "text-gray-500 group-hover:text-[#1CADA3]"}`}>{error ? "Upload Required" : "Choose File"}</span>
          </div>
        )}
        {files.map((f, i) => (
          <div key={i} className="flex items-center justify-between bg-gray-50 border border-gray-200 px-2 py-1.5 rounded-md text-xs">
            <div className="flex items-center truncate max-w-[85%]">
              <CheckCircle className="w-3.5 h-3.5 text-[#1CADA3] mr-2 shrink-0" />
              <span className="truncate text-gray-700">{f.name}</span>
            </div>
            <button type="button" onClick={() => removeFile(i)} className="text-gray-400 hover:text-red-500"><Trash2 size={14} /></button>
          </div>
        ))}
        {allowMultiple && files.length > 0 && files.length < 8 && (
          <button type="button" onClick={() => ref.current?.click()} className="flex justify-center gap-1 text-[11px] font-medium text-[#1CADA3] border border-[#1CADA3] border-dashed rounded-md py-1.5 hover:bg-[#1CADA3]/10"><Plus size={12} /> Add more</button>
        )}
      </div>
      {(fileError || (error && !fileError)) && <span className="text-xs text-red-500 mt-1">{fileError || error}</span>}
    </div>
  );
}

function SuccessModal({ onClose }: { onClose: () => void }) {
  return (
    <div className="absolute inset-0 z-50 flex items-center justify-center bg-black/60 rounded-xl animate-in fade-in zoom-in duration-200">
      <div className="bg-white p-6 sm:p-8 rounded-2xl shadow-2xl text-center max-w-sm w-[90%]">
        <CheckCircle className="w-16 h-16 text-[#1CADA3] mx-auto mb-4" />
        <h3 className="text-2xl font-bold text-gray-800 mb-2">Success!</h3>
        <p className="text-gray-600 mb-6">Your Home Loan application and documents have been submitted successfully.</p>
        <button onClick={onClose} className="w-full bg-[#1CADA3] text-white py-2.5 rounded-lg hover:bg-[#178e86] font-medium transition-colors">Okay, Got it</button>
      </div>
    </div>
  );
}