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
  "Salaried Person": ["Aadhar Card", "PAN Card", "3 Months Salary Slip", "2 Years Form 16", "6 Months Bank Statement", "Company ID Card", "Address Proof", "Photograph", "Existing Loan Statement", "Property Cost Sheet / Index II", "Own Contribution Proof"],
  "Self Employed": ["Aadhar Card", "PAN Card", "Udyam Registration", "Shop Act Licence", "GST Certificate", "Last 12 Months GST Returns", "3 Years ITR", "6 Months Bank Statement", "Saving Bank Account", "Business Office Address Proof", "Address Proof", "Photograph", "Existing Loan Statement", "Property Cost Sheet / Index II", "Own Contribution Proof"],
  "Pensioner": ["Aadhar Card", "PAN Card", "PPO (Pension Payment Order)", "1 Year Pension Credit Statement"],
  "Rental": ["Rent Agreement", "1 Year Rent Credit Statement"],
};

export default function NrpLoanForm({ onClose }: { onClose: () => void }) {
  const [form, setForm] = useState<Record<string, string>>({
    isSelfLogin: "No", // Default to No to preserve original behavior
    refId: "", fileId: "", bankName: "",
    rmName: "", rmContact: "", rmEmail: "",
    name: "", phone: "", email: "", dob: "", location: "",
    loanCategory: "", loanAmount: "", useOfFund: "",
    employmentType: "", otherIncomeSource: "", otherIncomeAmount: ""
  });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [uploadedDocs, setUploadedDocs] = useState<Record<string, boolean>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);

  const isSelfLoginActive = form.isSelfLogin === "Yes";

  const requiredDocs = useMemo(() => {
    if (isSelfLoginActive) return [];
    return DOC_MAP[form.employmentType === "Other" ? form.otherIncomeSource : form.employmentType] || [];
  }, [form.employmentType, form.otherIncomeSource, isSelfLoginActive]);

  const handleInputChange = (field: string, value: string) => {
    setForm(prev => ({
      ...prev, [field]: value,
      ...(field === "employmentType" && value !== "Other" ? { otherIncomeSource: "", otherIncomeAmount: "" } : {})
    }));
    if (errors[field]) setErrors(p => ({ ...p, [field]: "" }));
  };

  const validate = () => {
    const errs: Record<string, string> = {};
    const req = (f: string, msg: string) => { if (!form[f]?.trim()) errs[f] = msg; };

    req("isSelfLogin", "Selection required");

    if (isSelfLoginActive) {
      // req("refId", "Ref ID is required");
      req("fileId", "File Number is required");
      req("name", "Client Name is required");
      req("location", "Location is required");
      req("loanAmount", "Loan Amount is required");
      req("bankName", "Bank Name is required");
      req("rmName", "RM/SM Name is required");

      if (!form.rmContact) errs.rmContact = "Contact number required";
      else if (form.rmContact.length !== 10) errs.rmContact = "Must be 10 digits";

      if (!form.rmEmail) errs.rmEmail = "Email required";
      else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.rmEmail)) errs.rmEmail = "Invalid email";

    } else {
      req("name", "Client Name is required");
      req("location", "Location is required");
      req("dob", "Date of Birth is required");
      req("loanAmount", "Loan Amount is required");
      req("loanCategory", "Select loan category");
      req("useOfFund", "Use of fund is required");
      req("employmentType", "Employment type is required");

      if (!form.phone) errs.phone = "Phone number is required";
      else if (form.phone.length !== 10) errs.phone = "Phone number must be exactly 10 digits";

      if (!form.email) errs.email = "Email is required";
      else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) errs.email = "Invalid email format";

      if (form.employmentType === "Other") {
        if (!form.otherIncomeSource) errs.otherIncomeSource = "Select income source";
        else if (["Pensioner", "Rental"].includes(form.otherIncomeSource) && !form.otherIncomeAmount) errs.otherIncomeAmount = "Income amount is required";
      }

      requiredDocs.forEach(d => { if (!uploadedDocs[d]) errs[`doc_${d}`] = `Upload ${d}`; });
    }

    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;
    setIsSubmitting(true);

    try {
      const isSelfLoginActive = form.isSelfLogin === "Yes";
      const payload = {
        department: "Loan",
        product_type: "NRP Loan",
        sub_category: "NRP Loan",
        client: {
          name: form.name,
          mobile: isSelfLoginActive ? form.rmContact : form.phone,
          email: isSelfLoginActive ? form.rmEmail : form.email,
        },
        meta: {
          is_self_login: isSelfLoginActive,
        },
        form_data: isSelfLoginActive ? {
          fileId: form.fileId,
          bankName: form.bankName,
          rmName: form.rmName,
          location: form.location,
          loanAmount: form.loanAmount,
        } : {
          dob: form.dob,
          location: form.location,
          loanAmount: form.loanAmount,
          loanCategory: form.loanCategory,
          useOfFund: form.useOfFund,
          employmentType: form.employmentType,
          otherIncomeSource: form.otherIncomeSource || "N/A",
          otherIncomeAmount: form.otherIncomeAmount || "0"
        }
      };

      await DashboardService.createLead(payload);
      setShowSuccess(true);
    } catch (err) {
      console.error("Submission error:", err);
      alert("Something went wrong. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const fProps = (id: string) => ({
    value: form[id],
    onChange: (v: string) => handleInputChange(id, v),
    error: errors[id]
  });

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 p-2 sm:p-4 text-gray-700">
      <div className="bg-white rounded-xl shadow-xl w-full max-w-4xl mx-auto h-[95vh] sm:h-[90vh] flex flex-col relative">
        <div className="flex justify-between items-center border-b px-4 sm:px-6 py-3 sm:py-4 shrink-0 bg-white rounded-t-xl">
          <h2 className="text-lg sm:text-xl font-semibold text-[#1CADA3]">NRP Loan Form</h2>
          <button onClick={onClose} className="text-gray-500 hover:text-gray-800"><X size={20} /></button>
        </div>

        <div className="flex-1 overflow-y-auto p-4 sm:p-6">
          <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6">

            {/* HIGHLIGHTED SELF LOGIN SELECTOR */}
            <div className="col-span-1 md:col-span-2 bg-[#1CADA3]/5 border-l-4 border-[#1CADA3] p-4 rounded-r-lg shadow-sm mb-2">
              <div className="flex items-center gap-2 mb-2">
                <ShieldCheck className="text-[#1CADA3]" size={20} />
                <span className="text-sm font-bold text-[#1CADA3] uppercase tracking-wide">Direct Submission</span>
              </div>
              <Field label="Self Login to Bank?" type="select" options={["No", "Yes"]} {...fProps("isSelfLogin")} required />
              <p className="text-[11px] text-gray-500 mt-2 italic">Select "Yes" if you have already initiated the login process with the bank.</p>
            </div>

            {isSelfLoginActive ? (
              <>
                <Field label="Ref ID" placeholder="Enter Reference ID" {...fProps("refId")} />
                <Field label="File Number" placeholder="Enter File Number" {...fProps("fileId")} required />
                <Field label="Client Name" placeholder="Enter full name" {...fProps("name")} required />
                <Field label="Location" placeholder="Enter city" {...fProps("location")} required />
                <Field label="Loan Amount" placeholder="Desired amount" onlyNumber {...fProps("loanAmount")} required />
                <Field label="Bank Name" placeholder="Enter bank name" {...fProps("bankName")} required />
                <Field label="RM/SM Name (Bank)" placeholder="Enter RM name" {...fProps("rmName")} required />
                <Field label="RM/SM Contact (Bank)" placeholder="10-digit number" type="tel" maxLength={10} onlyNumber {...fProps("rmContact")} required />
                <div className="col-span-1 md:col-span-2">
                  <Field label="RM/SM Email (Bank)" placeholder="Enter RM email" type="email" {...fProps("rmEmail")} required />
                </div>
              </>
            ) : (
              <>
                <Field label="Client Name" placeholder="Enter full name" {...fProps("name")} required />
                <Field label="Phone Number" placeholder="10-digit mobile number" type="tel" maxLength={10} onlyNumber {...fProps("phone")} required />
                <Field label="Email ID" placeholder="Enter email address" type="email" {...fProps("email")} required />
                <Field label="Date of Birth" type="date" {...fProps("dob")} required />
                <Field label="Location" placeholder="Enter city" {...fProps("location")} required />
                <Field label="Loan Category" type="select" options={["Fresh", "Resell", "BT"]} {...fProps("loanCategory")} required />
                <Field label="Loan Amount" placeholder="Desired amount" onlyNumber {...fProps("loanAmount")} required />
                <Field label="Use of Fund" placeholder="Enter purpose of loan" {...fProps("useOfFund")} required />

                <div className="col-span-1 md:col-span-2 mt-2">
                  <Field label="Employment Type" type="select" options={["Salaried Person", "Self Employed", "Other"]} {...fProps("employmentType")} required />
                </div>

                {form.employmentType === "Other" && (
                  <>
                    <Field label="Other Income Source" type="select" options={["Pensioner", "Rental"]} {...fProps("otherIncomeSource")} required />
                    {["Pensioner", "Rental"].includes(form.otherIncomeSource) && <Field label="Approx Amount" placeholder="Enter amount" onlyNumber {...fProps("otherIncomeAmount")} required />}
                  </>
                )}

                {requiredDocs.length > 0 && (
                  <div className="col-span-1 md:col-span-2 mt-4">
                    <h3 className="text-md font-semibold mb-3 text-[#1CADA3] border-b pb-2">Upload Documents</h3>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
                      {requiredDocs.map(lbl => (
                        <FileUpload key={lbl} label={lbl} allowMultiple={!["Aadhar Card", "PAN Card"].includes(lbl)} onUpdate={(has: any) => {
                          setUploadedDocs(p => ({ ...p, [lbl]: has }));
                          if (has) setErrors(p => ({ ...p, [`doc_${lbl}`]: "" }));
                        }} error={errors[`doc_${lbl}`]} />
                      ))}
                    </div>
                  </div>
                )}
              </>
            )}

            <div className="col-span-1 md:col-span-2 flex justify-center mt-6 pb-2">
              <button type="submit" disabled={isSubmitting} className={STYLES.btn}>{isSubmitting ? "Submitting..." : "Submit Application"}</button>
            </div>
          </form>
        </div>
        {showSuccess && <SuccessModal onClose={onClose} />}
      </div>
    </div>
  );
}

// --- Components ---

function Field({ label, value, onChange, type = "text", options, required, placeholder, onlyNumber, maxLength, error }: any) {
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
          <input type={type} value={value} onChange={e => onChange(e.target.value)} onKeyDown={e => {
            if (onlyNumber && !["Backspace", "Delete", "ArrowLeft", "ArrowRight", "Tab"].includes(e.key) && !/^[0-9]$/.test(e.key)) e.preventDefault();
          }} maxLength={maxLength} placeholder={placeholder} className={STYLES.input(!!error)} />
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
    if (newFiles.some(f => f.size > 184320)) return setFileError("Max file size: 180KB");
    const updated = allowMultiple ? [...files, ...newFiles] : [newFiles[0]];
    setFiles(updated);
    onUpdate(true);
    setFileError("");
    e.target.value = "";
  };

  const removeFile = (idx: number) => {
    const updated = files.filter((_, i) => i !== idx);
    setFiles(updated);
    onUpdate(updated.length > 0);
  };

  return (
    <div className="flex flex-col">
      <label className={STYLES.label + " flex justify-between"}>
        <span>{label} <span className="text-red-500">*</span></span>
        <span className="text-[10px] text-gray-400 font-normal">{allowMultiple ? "(Multiple, <180KB)" : "(<180KB)"}</span>
      </label>
      <input type="file" ref={ref} multiple={allowMultiple} onChange={handleFiles} className="hidden" accept="image/*,application/pdf" />
      <div className="flex flex-col gap-2">
        {files.length === 0 && (
          <div onClick={() => ref.current?.click()} className={`cursor-pointer border border-dashed rounded-md h-10 flex items-center justify-center gap-2 bg-gray-50 transition-colors group ${error ? "border-red-500 bg-red-50" : "border-gray-300 hover:border-[#1CADA3]"}`}>
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
        <p className="text-gray-600 mb-6">Your NRP Loan application has been submitted successfully.</p>
        <button onClick={onClose} className="w-full bg-[#1CADA3] text-white py-2.5 rounded-lg hover:bg-[#178e86] font-medium transition-colors">Okay, Got it</button>
      </div>
    </div>
  );
}