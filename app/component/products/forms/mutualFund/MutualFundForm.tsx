"use client";
import { useState, useRef, useMemo } from "react";
import { X, CheckCircle, UploadCloud, Trash2, Plus, ChevronDown } from "lucide-react";
import { AuthService } from "@/app/services/authService";

const STYLES = {
  input: (err: boolean) => `w-full border rounded-md p-2 bg-white text-gray-700 outline-none text-sm sm:text-base transition-all placeholder-gray-400 appearance-none ${err ? "border-red-500 focus:ring-1 focus:ring-red-500" : "border-gray-300 focus:ring-2 focus:ring-[#1CADA3] focus:border-[#1CADA3]"}`,
  label: "block text-sm font-medium mb-1 text-gray-700",
  btn: "w-full sm:w-50 bg-gradient-to-r from-[#2076C7] to-[#1CADA3] text-white py-2 rounded-md hover:from-[#1a68b0] hover:to-[#18998f] transition-colors text-sm sm:text-base font-medium shadow-md disabled:opacity-50 disabled:cursor-not-allowed",
  err: "text-red-500 text-xs mt-1"
};

const OCCUPATIONS = ["Salaried", "Self-Employed", "Business", "Professional", "Retired", "Student", "Homemaker"];
const INCOME_RANGES = ["0-5L", "5-10L", "10-20L", "20-50L", "50L+"];
const RELATIONS = ["Spouse", "Son", "Daughter", "Father", "Mother", "Brother", "Sister", "Other"];
const GUARDIAN_REL_CLIENT = ["Father", "Mother", "Legal Guardian", "Other"];
const GUARDIAN_REL_NOMINEE = ["Parent", "Legal Guardian", "Grandparent", "Other"];
const INVESTMENT_TYPES = ["SIP", "Lumpsum", "SWP", "STP"];

interface MutualFundFormProps {
  onClose: () => void;
  prefilledData?: {
    name: string;
    email: string;
    mobile: string;
  };
}

export default function MutualFundForm({ onClose, prefilledData }: MutualFundFormProps) {
  const [form, setForm] = useState<any>({
    clientName: prefilledData?.name || "", 
    mobile: prefilledData?.mobile || "", 
    email: prefilledData?.email || "", 
    pan: "", 
    occupation: "", 
    incomeRange: "", 
    mothersName: "",
    nomineeName: "", 
    nomineeDob: "", 
    nomineeRelation: "", 
    nomineeMobile: "", 
    nomineeEmail: "",
    guardianName: "", 
    guardianMobile: "", 
    guardianEmail: "", 
    guardianRelationClient: "", 
    guardianRelationNominee: "",
    investmentType: "SIP", 
    investmentAmount: "", 
    sipDate: "",
    schemes: [{ schemeName: "", schemeAmount: "", schemeId: "1" }]
  });

  const [errors, setErrors] = useState<Record<string, string>>({});
  const [uploadedDocs, setUploadedDocs] = useState<Record<string, boolean>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);

  const { age, isMinor } = useMemo(() => {
    if (!form.nomineeDob) return { age: null, isMinor: false };
    const diff = new Date().getTime() - new Date(form.nomineeDob).getTime();
    const ageVal = Math.floor(diff / (1000 * 60 * 60 * 24 * 365.25));
    return { age: ageVal, isMinor: ageVal < 18 };
  }, [form.nomineeDob]);

  const requiredDocs = useMemo(() => {
    const docs = ["Client PAN Card", "Client Aadhaar Card", "Cancelled Cheque", "Nominee PAN Card"];
    if (isMinor) docs.push("Birth Certificate", "Guardian PAN Card");
    return docs;
  }, [isMinor]);

  const handleInputChange = (field: string, value: string) => {
    let val = value;
    if (field.toLowerCase().includes("mobile")) val = value.replace(/\D/g, '').slice(0, 10);
    if (field.toLowerCase().includes("pan")) val = value.toUpperCase().replace(/[^A-Z0-9]/g, '').slice(0, 10);
    if (field === "sipDate") val = value.replace(/\D/g, '').slice(0, 2);

    setForm((prev: any) => ({ ...prev, [field]: val }));
    if (errors[field]) setErrors(p => ({ ...p, [field]: "" }));
  };

  const modScheme = (id: string, k: string, v: string) => {
    setForm((p: any) => ({ ...p, schemes: p.schemes.map((s: any) => s.schemeId === id ? { ...s, [k]: v } : s) }));
  };
  const addScheme = () => setForm((p: any) => ({ ...p, schemes: [...p.schemes, { schemeName: "", schemeAmount: "", schemeId: Date.now().toString() }] }));
  const remScheme = (id: string) => form.schemes.length > 1 && setForm((p: any) => ({ ...p, schemes: p.schemes.filter((s: any) => s.schemeId !== id) }));

  const validate = () => {
    const errs: Record<string, string> = {};
    const req = (f: string, msg: string) => { if (!String(form[f] || "").trim()) errs[f] = msg; };

    req("clientName", "Client Name is required");
    req("occupation", "Select occupation");
    req("incomeRange", "Select income range");
    req("mothersName", "Mother's name is required");
    if (form.mobile?.length !== 10) errs.mobile = "10-digit mobile required";
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) errs.email = "Invalid email";
    if (form.pan?.length !== 10) errs.pan = "10-character PAN required";

    req("nomineeName", "Nominee name is required");
    req("nomineeDob", "Nominee DOB is required");
    req("nomineeRelation", "Select relation");

    if (!isMinor) {
      if (form.nomineeMobile?.length !== 10) errs.nomineeMobile = "10-digit mobile required";
      if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.nomineeEmail)) errs.nomineeEmail = "Invalid email";
    } else {
      req("guardianName", "Guardian name is required");
      req("guardianRelationClient", "Select relation with client");
      req("guardianRelationNominee", "Select relation with nominee");
      if (form.guardianMobile?.length !== 10) errs.guardianMobile = "10-digit mobile required";
    }

    req("investmentAmount", "Amount is required");
    if (form.investmentType === "SIP") {
      if (!form.sipDate || +form.sipDate < 1 || +form.sipDate > 31) errs.sipDate = "Invalid Date (1-31)";
    }

    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;
    setIsSubmitting(true);

    try {
      const payload = {
        department: "Mutual Funds",
        product_type: "Mutual Fund",
        sub_category: "Mutual Funds",
        client: {
          name: form.clientName,
          mobile: form.mobile,
          email: form.email,
        },
        meta: { is_self_login: false },
        form_data: { ...form }
      };

      await AuthService.createLead(payload);
      setShowSuccess(true);
    } catch (err) {
      console.error("Submission error:", err);
      alert("Something went wrong. Please try again.");
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
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 p-2 sm:p-4 text-gray-700 overflow-y-auto">
      <div className="bg-white rounded-xl shadow-xl w-full max-w-4xl mx-auto my-auto flex flex-col relative max-h-[95vh]">
        <div className="flex justify-between items-center border-b px-4 sm:px-6 py-3 sm:py-4 shrink-0 bg-white rounded-t-xl">
          <h2 className="text-lg sm:text-xl font-semibold text-[#1CADA3]">Mutual Fund Onboarding</h2>
          <button onClick={onClose} className="text-gray-500 hover:text-gray-800 transition-colors"><X size={20} className="sm:w-6 sm:h-6" /></button>
        </div>

        <div className="flex-1 overflow-y-auto p-4 sm:p-6">
          <form onSubmit={handleSubmit} className="space-y-8">
            {/* Section 1: Client Details */}
            <div>
              <h3 className="text-md font-semibold mb-3 text-[#1CADA3] border-b pb-2">Section 1: Client Details</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6">
                <Field label="Client Full Name" placeholder="As per PAN" {...fieldProps("clientName")} required />
                <Field label="Mobile Number" placeholder="10-digit mobile" onlyNumber maxLength={10} {...fieldProps("mobile")} required />
                <Field label="Email Address" type="email" placeholder="client@example.com" {...fieldProps("email")} required />
                <Field label="PAN Number" placeholder="ABCDE1234F" maxLength={10} {...fieldProps("pan")} required />
                <Field label="Occupation" type="select" options={OCCUPATIONS} {...fieldProps("occupation")} required />
                <Field label="Annual Income" type="select" options={INCOME_RANGES} {...fieldProps("incomeRange")} required />
                <div className="md:col-span-2">
                  <Field label="Mother's Name" placeholder="Required for KYC" {...fieldProps("mothersName")} required />
                </div>
              </div>
            </div>

            {/* Section 2: Nominee Details */}
            <div>
              <h3 className="text-md font-semibold mb-3 text-[#1CADA3] border-b pb-2">Section 2: Nominee Details</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6">
                <Field label="Nominee Full Name" placeholder="Enter name" {...fieldProps("nomineeName")} required />
                <div>
                  <Field label="Date of Birth" type="date" {...fieldProps("nomineeDob")} required />
                  {age !== null && <p className={`text-xs mt-1 font-medium ${isMinor ? 'text-amber-600' : 'text-[#1CADA3]'}`}>Age: {age} years {isMinor && '(Minor)'}</p>}
                </div>
                <Field label="Relation with Client" type="select" options={RELATIONS} {...fieldProps("nomineeRelation")} required />
                <Field label="Nominee Mobile" placeholder="10-digit mobile" onlyNumber maxLength={10} {...fieldProps("nomineeMobile")} required={!isMinor} />
                <Field label="Nominee Email" type="email" placeholder="nominee@example.com" {...fieldProps("nomineeEmail")} required={!isMinor} />
              </div>
            </div>

            {/* Section 3: Guardian Details */}
            {isMinor && (
              <div className="bg-amber-50/30 p-4 rounded-lg border border-amber-100">
                <h3 className="text-md font-semibold mb-3 text-amber-600 border-b border-amber-200 pb-2">Section 3: Guardian Details</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6">
                  <Field label="Guardian Name" placeholder="Enter guardian name" {...fieldProps("guardianName")} required />
                  <Field label="Guardian Mobile" placeholder="10-digit mobile" onlyNumber maxLength={10} {...fieldProps("guardianMobile")} required />
                  <Field label="Guardian Email" type="email" placeholder="guardian@example.com" {...fieldProps("guardianEmail")} required />
                  <Field label="Relation (Client)" type="select" options={GUARDIAN_REL_CLIENT} {...fieldProps("guardianRelationClient")} required />
                  <div className="md:col-span-2">
                    <Field label="Relation (Nominee)" type="select" options={GUARDIAN_REL_NOMINEE} {...fieldProps("guardianRelationNominee")} required />
                  </div>
                </div>
              </div>
            )}

            {/* Section 4: Investment Details */}
            <div>
              <h3 className="text-md font-semibold mb-3 text-[#1CADA3] border-b pb-2">Section {isMinor ? '4' : '3'}: Investment Details</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6">
                <Field label="Investment Type" type="select" options={INVESTMENT_TYPES} {...fieldProps("investmentType")} required />
                <Field label="Total Amount (₹)" placeholder="Enter total amount" onlyNumber {...fieldProps("investmentAmount")} required />
                {form.investmentType === "SIP" && (
                  <Field label="SIP Date" placeholder="Day (1-31)" onlyNumber maxLength={2} {...fieldProps("sipDate")} required />
                )}
              </div>

              <div className="mt-6 space-y-4">
                {form.schemes.map((s: any, i: number) => (
                  <div key={s.schemeId} className="p-4 bg-gray-50 rounded-lg border border-gray-200 relative group">
                    <div className="flex justify-between items-center mb-4">
                      <span className="text-sm font-semibold text-gray-500 uppercase tracking-wider">Scheme #{i + 1}</span>
                      {form.schemes.length > 1 && (
                        <button type="button" onClick={() => remScheme(s.schemeId)} className="text-gray-400 hover:text-red-500 transition-colors">
                          <Trash2 size={16} />
                        </button>
                      )}
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <Field label="Scheme Name" placeholder="Enter fund name" value={s.schemeName} onChange={(v: string) => modScheme(s.schemeId, "schemeName", v)} />
                      <Field label="Amount (₹)" placeholder="Enter amount" onlyNumber value={s.schemeAmount} onChange={(v: string) => modScheme(s.schemeId, "schemeAmount", v)} />
                    </div>
                  </div>
                ))}
                <div className="flex justify-end">
                  <button type="button" onClick={addScheme} className="flex items-center gap-2 text-sm font-medium text-[#1CADA3] hover:text-[#18998f] transition-colors py-2 px-1">
                    <Plus size={16} /> Add Another Fund
                  </button>
                </div>
              </div>
            </div>

            {/* Section 5: Document Upload */}
            <div>
              <h3 className="text-md font-semibold mb-3 text-[#1CADA3] border-b pb-2">Section {isMinor ? '5' : '4'}: Document Upload</h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
                {requiredDocs.map(lbl => (
                  <FileUpload key={lbl} label={lbl} onUpdate={(has: any) => {
                    setUploadedDocs(p => ({ ...p, [lbl]: has }));
                    if (has) setErrors(p => ({ ...p, [`doc_${lbl}`]: "" }));
                  }} error={errors[`doc_${lbl}`]} />
                ))}
              </div>
            </div>

            <div className="flex justify-center mt-6 pb-2">
              <button type="submit" disabled={isSubmitting} className={STYLES.btn}>{isSubmitting ? "Submitting..." : "Submit Application"}</button>
            </div>
          </form>
        </div>
        {showSuccess && <SuccessModal onClose={onClose} />}
      </div>
    </div>
  );
}

function Field({ label, value, onChange, type = "text", options, required, placeholder, onlyNumber, maxLength, error, disabled }: any) {
  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (onlyNumber && !["Backspace", "Delete", "ArrowLeft", "ArrowRight", "Tab"].includes(e.key) && !/^[0-9]$/.test(e.key)) e.preventDefault();
  };

  return (
    <div className={`w-full relative ${disabled ? 'opacity-70' : ''}`}>
      <label className={`${STYLES.label} ${disabled ? 'text-gray-400' : ''}`}>
        {label} {required && !disabled && <span className="text-red-500">*</span>}
      </label>
      <div className="relative">
        {type === "select" ? (
          <>
            <select value={value} onChange={e => onChange(e.target.value)} disabled={disabled} className={`${STYLES.input(!!error)} cursor-pointer ${disabled ? 'bg-gray-50' : ''}`}>
              <option value="">{placeholder || `Select ${label}`}</option>
              {options?.map((opt: string) => <option key={opt} value={opt}>{opt}</option>)}
            </select>
            <ChevronDown className="absolute right-3 top-3 text-gray-400 pointer-events-none" size={16} />
          </>
        ) : (
          <input type={type} value={value} onChange={e => onChange(e.target.value)} onKeyDown={handleKeyDown} maxLength={maxLength} placeholder={placeholder} disabled={disabled} className={`${STYLES.input(!!error)} ${disabled ? 'bg-gray-50' : ''}`} />
        )}
      </div>
      {error && <p className={STYLES.err}>{error}</p>}
    </div>
  );
}

function FileUpload({ label, onUpdate, error }: any) {
  const [file, setFile] = useState<File | null>(null);
  const [fileError, setFileError] = useState("");
  const ref = useRef<HTMLInputElement>(null);

  const handleFile = (e: React.ChangeEvent<HTMLInputElement>) => {
    const f = e.target.files?.[0];
    if (!f) return;
    if (f.size > 184320) return setFileError("Max file size: 180KB");
    setFile(f);
    onUpdate(true);
    setFileError("");
    e.target.value = "";
  };

  return (
    <div className="flex flex-col">
      <label className="text-sm font-medium mb-1 text-gray-700 flex justify-between">
        <span>{label} <span className="text-red-500">*</span></span>
        <span className="text-[10px] text-gray-400 font-normal">(&lt;180KB)</span>
      </label>
      <input type="file" ref={ref} onChange={handleFile} className="hidden" accept="image/*,application/pdf" />
      <div className="flex flex-col gap-2">
        {!file ? (
          <div onClick={() => ref.current?.click()} className={`cursor-pointer border border-dashed rounded-md h-10 flex items-center justify-center gap-2 bg-gray-50 hover:bg-[#1CADA3]/5 transition-colors group ${error ? "border-red-500 bg-red-50" : "border-gray-300 hover:border-[#1CADA3]"}`}>
            <UploadCloud size={16} className={error ? "text-red-400" : "text-gray-400 group-hover:text-[#1CADA3]"} />
            <span className={`text-xs font-medium ${error ? "text-red-500" : "text-gray-500 group-hover:text-[#1CADA3]"}`}>{error ? "Upload Required" : "Choose File"}</span>
          </div>
        ) : (
          <div className="flex items-center justify-between bg-gray-50 border border-gray-200 px-2 py-1.5 rounded-md text-xs">
            <div className="flex items-center truncate max-w-[85%]">
              <CheckCircle className="w-3.5 h-3.5 text-[#1CADA3] mr-2 shrink-0" />
              <span className="truncate text-gray-700">{file.name}</span>
            </div>
            <button type="button" onClick={() => { setFile(null); onUpdate(false); }} className="text-gray-400 hover:text-red-500"><Trash2 size={14} /></button>
          </div>
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
        <p className="text-gray-600 mb-6">Your Mutual Fund onboarding application has been submitted successfully.</p>
        <button onClick={onClose} className="w-full bg-[#1CADA3] text-white py-2.5 rounded-lg hover:bg-[#178e86] font-medium transition-colors">Okay, Got it</button>
      </div>
    </div>
  );
}