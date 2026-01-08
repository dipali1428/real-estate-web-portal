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

const PLAN_TYPES = ["Term Insurance", "ULIP", "TULIP", "Child Plan", "Pension Plan", "Saving Plan"];
const PROFESSIONS = ["Salaried", "Self Employed"];
const INCOME_PROOFS = ["3 Years ITR", "Form 16"];

export default function LifeInsuranceForm({ onClose }: { onClose: () => void }) {
  const [form, setForm] = useState<Record<string, string>>({
    planType: "", proposerName: "", dob: "", education: "", profession: "",
    income: "", incomeProof: "", sumAssured: "", policyTerm: "", ppt: "",
    smokerStatus: "", drinkerStatus: "", existingDisease: "", investmentOption: "Investment Budget",
    investmentBudget: "", requiredMaturity: "", requiredPension: ""
  });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [uploadedDocs, setUploadedDocs] = useState<Record<string, boolean>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);

  const showTermFields = form.planType === "Term Insurance" || form.planType === "TULIP";
  const showInvestmentFields = ["ULIP", "Child Plan", "Pension Plan", "Saving Plan"].includes(form.planType);
  const showUploadField = INCOME_PROOFS.includes(form.incomeProof);

  const requiredDocs = useMemo(() => {
    if (showTermFields && showUploadField) return ["Income Proof Document"];
    return [];
  }, [showTermFields, showUploadField]);

  const handleInputChange = (field: string, value: string) => {
    setForm(prev => ({ ...prev, [field]: value }));
    if (errors[field]) setErrors(prev => ({ ...prev, [field]: "" }));
  };

  const validate = () => {
    const errs: Record<string, string> = {};
    const req = (f: string, msg: string) => { if (!form[f]?.trim()) errs[f] = msg; };

    req("planType", "Select a plan type");
    req("proposerName", "Proposer Name is required");
    req("dob", "Date of birth is required");
    req("profession", "Select profession");
    req("income", "Annual income is required");
    req("policyTerm", "Policy term is required");
    req("ppt", "Premium paying term is required");

    if (showTermFields) {
      req("education", "Education is required");
      req("incomeProof", "Select income proof");
      req("sumAssured", "Sum assured is required");
      req("smokerStatus", "Required");
      req("drinkerStatus", "Required");
      req("existingDisease", "Required");
    }

    if (showInvestmentFields) {
      if (form.investmentOption === "Investment Budget") req("investmentBudget", "Budget is required");
      else {
        if (form.planType === "Pension Plan") req("requiredPension", "Required pension amount is required");
        else req("requiredMaturity", "Required maturity amount is required");
      }
    }

    requiredDocs.forEach(d => { if (!uploadedDocs[d]) errs[`doc_${d}`] = `Upload ${d}`; });
    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;
    setIsSubmitting(true);

    try {
      // Create a dynamic form data object to avoid sending NA to backend
      const dynamicFormData: Record<string, any> = {
        planType: form.planType,
        proposerName: form.proposerName,
        dob: form.dob,
        profession: form.profession,
        income: form.income,
        policyTerm: form.policyTerm,
        ppt: form.ppt,
      };

      // Add Term-specific fields ONLY if applicable
      if (showTermFields) {
        dynamicFormData.education = form.education;
        dynamicFormData.incomeProof = form.incomeProof;
        dynamicFormData.sumAssured = form.sumAssured;
        dynamicFormData.smokerStatus = form.smokerStatus;
        dynamicFormData.drinkerStatus = form.drinkerStatus;
        dynamicFormData.existingDisease = form.existingDisease;
      }

      // Add Investment-specific fields ONLY if applicable
      if (showInvestmentFields) {
        dynamicFormData.investmentOption = form.investmentOption;
        if (form.investmentOption === "Investment Budget") {
          dynamicFormData.investmentBudget = form.investmentBudget;
        } else {
          if (form.planType === "Pension Plan") {
            dynamicFormData.requiredPension = form.requiredPension;
          } else {
            dynamicFormData.requiredMaturity = form.requiredMaturity;
          }
        }
      }

      const payload = {
        department: "Insurance",
        product_type: "Life Insurance",
        sub_category: "Life Insurance",
        client: {
          name: form.proposerName,
          mobile: (form as any).phone || "NA",
          email: (form as any).email || "NA",
        },
        meta: {
          is_self_login: false,
        },
        form_data: dynamicFormData // Sends only the filtered data
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

  const fieldProps = (name: string) => ({
    value: form[name],
    onChange: (v: string) => handleInputChange(name, v),
    error: errors[name]
  });

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 p-2 sm:p-4 text-gray-700 overflow-y-auto">
      <div className="bg-white rounded-xl shadow-xl w-full max-w-4xl mx-auto my-auto flex flex-col relative max-h-[90vh]">
        <div className="flex justify-between items-center border-b px-4 sm:px-6 py-3 sm:py-4 shrink-0 bg-white rounded-t-xl">
          <h2 className="text-lg sm:text-xl font-semibold text-[#1CADA3]">Life Insurance Form</h2>
          <button onClick={onClose} className="text-gray-500 hover:text-gray-800 transition-colors"><X size={20} className="sm:w-6 sm:h-6" /></button>
        </div>

        <div className="flex-1 overflow-y-auto p-4 sm:p-6">
          <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6">
            <div className="col-span-1 md:col-span-2">
              <Field label="Select Insurance Type" type="select" options={PLAN_TYPES} {...fieldProps("planType")} required />
            </div>

            {form.planType && (
              <>
                <Field label="Proposer Name" placeholder="Enter full name" {...fieldProps("proposerName")} required />
                <Field label="Birthdate" type="date" {...fieldProps("dob")} required />

                {showTermFields && <Field label="Education" placeholder="Highest qualification" {...fieldProps("education")} required />}

                <Field label="Profession" type="select" options={PROFESSIONS} {...fieldProps("profession")} required />
                <Field label="Income (Yearly)" placeholder="Enter annual income" onlyNumber {...fieldProps("income")} required />

                {showTermFields && (
                  <>
                    <Field label="Income Proof" type="select" options={INCOME_PROOFS} {...fieldProps("incomeProof")} required />
                    <Field label="Sum Assured Amount" placeholder="Enter amount" onlyNumber {...fieldProps("sumAssured")} required />
                  </>
                )}

                <Field label="Policy Term" placeholder="In years" onlyNumber {...fieldProps("policyTerm")} required />
                <Field label="Premium Paying Term (PPT)" placeholder="Enter term" onlyNumber {...fieldProps("ppt")} required />

                {showTermFields && (
                  <>
                    <Field label="Smoker / Non-Smoker" placeholder="e.g. Non-Smoker" {...fieldProps("smokerStatus")} required />
                    <Field label="Drinker / Non-Drinker" placeholder="e.g. Non-Drinker" {...fieldProps("drinkerStatus")} required />
                    <div className="col-span-1 md:col-span-2">
                      <Field label="Any Existing Disease" placeholder="Enter medical conditions or 'None'" {...fieldProps("existingDisease")} required />
                    </div>
                  </>
                )}

                {showInvestmentFields && (
                  <div className="col-span-1 md:col-span-2 space-y-4">
                    <Field
                      label="Select Investment Option"
                      type="select"
                      options={["Investment Budget", form.planType === "Pension Plan" ? "Required Pension" : "Required Maturity"]}
                      {...fieldProps("investmentOption")}
                      required
                    />

                    {form.investmentOption === "Investment Budget" ? (
                      <Field label="Investment Budget (Yearly)" placeholder="Enter yearly budget" onlyNumber {...fieldProps("investmentBudget")} required />
                    ) : (
                      <>
                        {form.planType === "Pension Plan" ? (
                          <Field label="Required Pension (Monthly)" placeholder="Enter monthly pension" onlyNumber {...fieldProps("requiredPension")} required />
                        ) : (
                          <Field label="Required Maturity Amount" placeholder="Enter maturity amount" onlyNumber {...fieldProps("requiredMaturity")} required />
                        )}
                      </>
                    )}
                  </div>
                )}

                {requiredDocs.length > 0 && (
                  <div className="col-span-1 md:col-span-2 mt-4">
                    <h3 className="text-md font-semibold mb-3 text-[#1CADA3] border-b pb-2">Upload Documents</h3>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
                      {requiredDocs.map(lbl => (
                        <FileUpload key={lbl} label={lbl} onUpdate={(has: any) => {
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
        <p className="text-gray-600 mb-6">Your Life Insurance application has been submitted successfully.</p>
        <button onClick={onClose} className="w-full bg-[#1CADA3] text-white py-2.5 rounded-lg hover:bg-[#178e86] font-medium transition-colors">Okay, Got it</button>
      </div>
    </div>
  );
}