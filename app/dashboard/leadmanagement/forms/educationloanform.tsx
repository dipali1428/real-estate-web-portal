"use client";
import { useState, useRef, useMemo } from "react";
import { X, CheckCircle, UploadCloud, Trash2, Plus, ChevronDown } from "lucide-react";
import { DashboardService } from "../../../services/dashboardService";

const STYLES = {
  input: (err: boolean) => `w-full border rounded-md p-2 bg-white text-gray-700 outline-none text-sm sm:text-base transition-all placeholder-gray-400 appearance-none ${err ? "border-red-500 focus:ring-1 focus:ring-red-500" : "border-gray-300 focus:ring-2 focus:ring-[#1CADA3] focus:border-[#1CADA3]"}`,
  label: "block text-sm font-medium mb-1 text-gray-700",
  btn: "w-full sm:w-50 bg-gradient-to-r from-[#2076C7] to-[#1CADA3] text-white py-2 rounded-md hover:from-[#1a68b0] hover:to-[#18998f] transition-colors text-sm sm:text-base font-medium shadow-md disabled:opacity-50 disabled:cursor-not-allowed",
  err: "text-red-500 text-xs mt-1"
};

const STUDENT_BASE_DOCS = ["Aadhar Card", "PAN Card", "Passport / Driving License", "Resident Proof", "Current Address Proof", "Academic Documents", "Offer Letter", "Fee Structure", "Visa / I20 (USA)", "Entrance Exam Score Card"];

const CO_APPLICANT_DOC_MAP: Record<string, string[]> = {
  "Salaried Person": ["Aadhar Card", "PAN Card", "Driving License", "Passport", "Permanent Address Proof", "Current Address Proof", "3 Months Salary Slip", "6 Months Bank Statement", "Form 16", "2 Years ITR"],
  "Self Employed": ["Aadhar Card", "PAN Card", "Driving License", "Passport", "Permanent Address Proof", "Current Address Proof", "6 Months Bank Statement", "GST Certificate", "Udyog Aadhar", "3 Years ITR", "Shop Act"],
  "Retired": ["Aadhar Card", "PAN Card", "Driving License", "Passport", "Permanent Address Proof", "Current Address Proof", "6 Months Bank Statement", "2 Years ITR", "Pension Slips/Certificate"]
};

export default function EducationLoanForm({ onClose }: { onClose: () => void }) {
  const [form, setForm] = useState<Record<string, string>>({
    clientName: "", phone: "", email: "", dob: "", location: "",
    loanAmount: "", courseName: "", institutionName: "", countryName: "",
    hasOtherLoan: "", otherLoanAmount: "", coApplicantEmploymentType: ""
  });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [uploadedDocs, setUploadedDocs] = useState<Record<string, boolean>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);

  const studentDocs = useMemo(() => form.hasOtherLoan === "Yes" ? [...STUDENT_BASE_DOCS, "Existing Loan Statement"] : STUDENT_BASE_DOCS, [form.hasOtherLoan]);
  const coApplicantDocs = useMemo(() => CO_APPLICANT_DOC_MAP[form.coApplicantEmploymentType] || [], [form.coApplicantEmploymentType]);

  const handleInputChange = (field: string, value: string) => {
    setForm(prev => ({ ...prev, [field]: value, ...(field === "hasOtherLoan" && value === "No" ? { otherLoanAmount: "" } : {}) }));
    if (errors[field]) setErrors(p => ({ ...p, [field]: "" }));
  };

  const handleDocUpdate = (prefix: string, doc: string, has: boolean) => {
    const key = `${prefix}_${doc}`;
    setUploadedDocs(p => ({ ...p, [key]: has }));
    if (has) setErrors(p => ({ ...p, [`doc_${key}`]: "" }));
  };

  const validate = () => {
    const errs: Record<string, string> = {};
    const req = (f: string, msg: string) => { if (!form[f]?.trim()) errs[f] = msg; };

    req("clientName", "Student Name is required");
    ["location", "dob", "loanAmount", "courseName", "institutionName", "countryName"].forEach(f => req(f, `${f.split(/(?=[A-Z])/).join(" ").replace(/^\w/, c => c.toUpperCase())} is required`));

    if (!form.phone) errs.phone = "Phone number is required";
    else if (form.phone.length !== 10) errs.phone = "Phone number must be exactly 10 digits";

    if (!form.email) errs.email = "Email is required";
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) errs.email = "Invalid email format";

    if (!form.hasOtherLoan) errs.hasOtherLoan = "Select an option";
    if (form.hasOtherLoan === "Yes" && !form.otherLoanAmount) errs.otherLoanAmount = "Existing loan amount is required";
    if (!form.coApplicantEmploymentType) errs.coApplicantEmploymentType = "Select employment type";

    studentDocs.forEach(d => { if (!uploadedDocs[`student_${d}`]) errs[`doc_student_${d}`] = `Upload ${d}`; });
    coApplicantDocs.forEach(d => { if (!uploadedDocs[`co_${d}`]) errs[`doc_co_${d}`] = `Upload ${d}`; });

    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;
    setIsSubmitting(true);

    try {
      const payload = {
        department: "Loan",
        product_type: "Education Loan",
        sub_category: "Education Loan",
        client: {
          name: form.clientName,
          mobile: form.phone,
          email: form.email,
        },
        meta: {
          is_self_login: false,
        },
        form_data: {
          dob: form.dob,
          location: form.location,
          loanAmount: form.loanAmount,
          courseName: form.courseName,
          institutionName: form.institutionName,
          countryName: form.countryName,
          hasOtherLoan: form.hasOtherLoan,
          otherLoanAmount: form.otherLoanAmount || "0",
          coApplicantEmploymentType: form.coApplicantEmploymentType
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

  const fProps = (id: string) => ({ value: form[id], onChange: (v: string) => handleInputChange(id, v), error: errors[id] });

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 p-2 sm:p-4 text-gray-700">
      <div className="bg-white rounded-xl shadow-xl w-full max-w-4xl mx-auto h-[95vh] sm:h-[90vh] flex flex-col relative">
        <div className="flex justify-between items-center border-b px-4 sm:px-6 py-3 sm:py-4 shrink-0 bg-white rounded-t-xl">
          <h2 className="text-lg sm:text-xl font-semibold text-[#1CADA3]">Education Loan Form</h2>
          <button onClick={onClose} className="text-gray-500 hover:text-gray-800"><X size={20} className="sm:w-6 sm:h-6" /></button>
        </div>

        <div className="flex-1 overflow-y-auto p-4 sm:p-6">
          <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6">
            <Field label="Student Name" placeholder="Enter full name" {...fProps("clientName")} required />
            <Field label="Phone Number" placeholder="10-digit mobile number" type="tel" maxLength={10} onlyNumber {...fProps("phone")} required />
            <Field label="Email ID" placeholder="Enter email address" type="email" {...fProps("email")} required />
            <Field label="Date of Birth" type="date" {...fProps("dob")} required />
            <Field label="Location" placeholder="Enter city" {...fProps("location")} required />
            <Field label="Loan Amount" placeholder="Desired amount" onlyNumber {...fProps("loanAmount")} required />
            <Field label="Course Name" placeholder="e.g. MS in CS" {...fProps("courseName")} required />
            <Field label="Institution Name" placeholder="University name" {...fProps("institutionName")} required />
            <div className="col-span-1 md:col-span-2"><Field label="Country Name" placeholder="Study destination" {...fProps("countryName")} required /></div>
            <Field label="Any Other Loan Obligations?" type="select" options={["Yes", "No"]} {...fProps("hasOtherLoan")} required />
            {form.hasOtherLoan === "Yes" && <Field label="Existing Loan Amount" placeholder="Enter amount" onlyNumber {...fProps("otherLoanAmount")} required />}

            <div className="col-span-1 md:col-span-2 mt-4">
              <h3 className="text-md font-semibold mb-3 text-[#1CADA3] border-b pb-2">Student Documents <span className="text-sm font-normal text-gray-500 ml-2">(Max 180KB)</span></h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
                {studentDocs.map(lbl => (
                  <FileUpload key={`st_${lbl}`} label={lbl} allowMultiple={!["Aadhar Card", "PAN Card"].includes(lbl)} onUpdate={(has: boolean) => handleDocUpdate("student", lbl, has)} error={errors[`doc_student_${lbl}`]} />
                ))}
              </div>
            </div>

            <div className="col-span-1 md:col-span-2 mt-4"><Field label="Co-Applicant Employment Type" type="select" options={["Salaried Person", "Self Employed", "Retired"]} {...fProps("coApplicantEmploymentType")} required /></div>

            {form.coApplicantEmploymentType && (
              <div className="col-span-1 md:col-span-2 mt-2">
                <h3 className="text-md font-semibold mb-3 text-[#1CADA3] border-b pb-2">Co-Applicant Documents ({form.coApplicantEmploymentType})</h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
                  {coApplicantDocs.map(lbl => (
                    <FileUpload key={`co_${lbl}`} label={lbl} allowMultiple={!["Aadhar Card", "PAN Card"].includes(lbl)} onUpdate={(has: boolean) => handleDocUpdate("co", lbl, has)} error={errors[`doc_co_${lbl}`]} />
                  ))}
                </div>
              </div>
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

// --- Shared Components (Refined) ---

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
    if (allowMultiple && files.length + newFiles.length > 8) return setFileError("Limit: 8 files.");
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
        {!allowMultiple && files.length > 0 && <button type="button" onClick={() => ref.current?.click()} className="text-[10px] text-blue-600 hover:underline text-right">Change file</button>}
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
        <p className="text-gray-600 mb-6">Your Education Loan application has been submitted successfully.</p>
        <button onClick={onClose} className="w-full bg-[#1CADA3] text-white py-2.5 rounded-lg hover:bg-[#178e86] font-medium transition-colors">Okay, Got it</button>
      </div>
    </div>
  );
}