"use client";
import { useState, useRef } from "react";
import { X, CheckCircle, UploadCloud, Trash2, ChevronDown, Download, Info, AlertCircle, Loader2 } from "lucide-react";

/**
 * CSS Fix to hide number input spinners globally for this component
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

export default function InsurancePolicyForm({ onClose }: { onClose: () => void }) {
  const [form, setForm] = useState({
    insuranceType: "",
    insuredName: "",
    insuredAddress: "",
    businessNature: "",
    pincode: "",
    riskLocation: "",
    contactName: "",
    contactMobile: "",
    contactEmail: "",
    policyType: "",
    coverType: "individual",
    maternityCover: false,
    preExistingDisease: false,
    roomRentLimit: "",
    sumInsured: "",
    claimLastYear: "",
    // Added Medical Extension fields
    medicalExtension: "no",
    medicalLimit: "",
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

  const handleInsuranceTypeChange = (type: string) => {
    // Resetting specific fields when switching types to prevent data leaks
    setForm(prev => ({
      ...prev,
      insuranceType: type,
      policyType: "",
      pincode: "",
      medicalExtension: "no",
      medicalLimit: ""
    }));
    setFiles({});
    setErrors({});
  };

  const handleInputChange = (field: string, value: any) => {
    setForm(prev => ({ ...prev, [field]: value }));
    if (errors[field]) setErrors(prev => ({ ...prev, [field]: "" }));
  };

  const handleFileChange = (field: string, file: File | null) => {
    setFiles(prev => ({ ...prev, [field]: file }));
    if (file && errors[field]) setErrors(prev => ({ ...prev, [field]: "" }));
  };

  const handleWCRowChange = (index: number, field: string, value: string) => {
    const updatedRows = [...form.wcRows];
    let sanitizedValue = value;
    if (["count", "months", "monthlyWage"].includes(field)) {
      if (parseFloat(value) < 0) sanitizedValue = "0";
    }
    updatedRows[index] = { ...updatedRows[index], [field]: sanitizedValue };
    setForm(prev => ({ ...prev, wcRows: updatedRows }));
  };

  const validate = () => {
    const newErrors: Record<string, string> = {};
    if (!form.insuranceType) newErrors.insuranceType = "Required";

    if (form.insuranceType) {
      if (!form.insuredName) newErrors.insuredName = "Name required";
      if (!form.contactName) newErrors.contactName = "Contact name required";
      if (!form.contactMobile || form.contactMobile.length < 10) newErrors.contactMobile = "10 digit number required";
      if (!form.contactEmail || !/\S+@\S+\.\S+/.test(form.contactEmail)) newErrors.contactEmail = "Valid email required";
      if (!files.gstCertificate) newErrors.gstCertificate = "GST Certificate required";
    }

    if (form.insuranceType === "WC" || form.insuranceType === "GPA") {
      if (!form.pincode || form.pincode.length < 6) newErrors.pincode = "6 digit Pincode required";
    }

    if (form.insuranceType === "WC") {
      if (!form.riskLocation) newErrors.riskLocation = "Risk location required";
      // Added validation for medical limit if extension is required
      if (form.medicalExtension === "yes" && !form.medicalLimit) newErrors.medicalLimit = "Medical limit required";
    }

    if (form.insuranceType === "GMC" || form.insuranceType === "GPA") {
      if (!form.policyType) newErrors.policyType = "Select policy type";
      if (form.insuranceType === "GMC" && !form.sumInsured) newErrors.sumInsured = "Sum insured required";
      if (form.policyType === "renewal" && form.claimLastYear === "yes" && !files.claimedFile) newErrors.claimedFile = "Claim report required";
      if (form.policyType === "renewal" && !files.renewalCopy) newErrors.renewalCopy = "Previous policy copy required";
      if (form.insuranceType === "GMC" && !files.gmcExcel) newErrors.gmcExcel = "Excel required";
      if (form.insuranceType === "GPA" && !files.gpaExcel) newErrors.gpaExcel = "Excel required";
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
                {/* Policy Configuration and Documents sections follow here (omitted for brevity but kept in your build) */}
                <h3 className={STYLES.sectionTitle}>Policy Configuration</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <Field type="select" label="Type of Policy" options={["fresh", "renewal"]} value={form.policyType} onChange={(v: any) => handleInputChange("policyType", v)} error={errors.policyType} required />
                  {form.policyType === "renewal" ? (
                    <Field type="select" label="Any claim taken last year?" value={form.claimLastYear} onChange={(v: any) => handleInputChange("claimLastYear", v)} options={["yes", "no"]} />
                  ) : <div className="hidden md:block" />}
                </div>

                {form.insuranceType === "GMC" && (
                  <>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <Field label="Sum Insured Amount" value={form.sumInsured} onChange={(v: any) => handleInputChange("sumInsured", v)} onlyNumber placeholder="Amount per person" error={errors.sumInsured} required />
                      <Field label="Room Rent Limit" value={form.roomRentLimit} onChange={(v: any) => handleInputChange("roomRentLimit", v)} placeholder="e.g. 1% of SI" />
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
                          <span className="text-sm font-bold text-gray-600">Pre Existing</span>
                        </label>
                      </div>
                    </div>
                  </>
                )}

                <h3 className={STYLES.sectionTitle}>Required Documents</h3>
                <div className="space-y-6">
                  <FileUpload label={form.insuranceType === "GMC" ? "GMC Employee Details" : "GPA Employee Census"} onUpdate={(f: any) => handleFileChange(form.insuranceType === "GMC" ? "gmcExcel" : "gpaExcel", f)} error={errors[form.insuranceType === "GMC" ? "gmcExcel" : "gpaExcel"]} showTemplateGuide requiredHeaders={form.insuranceType === "GMC" ? GMC_HEADERS : GPA_HEADERS} />
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <FileUpload label="GST Certificate of company" onUpdate={(f: any) => handleFileChange("gstCertificate", f)} error={errors.gstCertificate} />
                    {form.policyType === "renewal" && <FileUpload label="Previous Policy Copy" onUpdate={(f: any) => handleFileChange("renewalCopy", f)} error={errors.renewalCopy} />}
                    {form.policyType === "renewal" && form.claimLastYear === "yes" && <FileUpload label="Claim History / MIS Report" onUpdate={(f: any) => handleFileChange("claimedFile", f)} error={errors.claimedFile} />}
                  </div>
                </div>
              </div>
            )}

            {form.insuranceType === "WC" && (
              <div className="space-y-6 animate-in fade-in slide-in-from-top-2">
                <h3 className={STYLES.sectionTitle}>Organisation Details</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <Field label="Name Of Organisation" value={form.insuredName} onChange={(v: any) => handleInputChange("insuredName", v)} error={errors.insuredName} required />
                  <Field label="Nature of Business" value={form.businessNature} onChange={(v: any) => handleInputChange("businessNature", v)} />
                  <div className="md:col-span-1">
                    <Field label="Address Of Organisation" value={form.insuredAddress} onChange={(v: any) => handleInputChange("insuredAddress", v)} required />
                  </div>
                  <Field label="Pin Code" value={form.pincode} onChange={(v: any) => handleInputChange("pincode", v)} error={errors.pincode} onlyNumber maxLength={6} required placeholder="6-digit PIN" />
                </div>

                <h3 className={STYLES.sectionTitle}>Risk Location Details</h3>
                <div className="w-full">
                  <Field label="RISK LOCATION (Address with Pin Code)" value={form.riskLocation} onChange={(v: any) => handleInputChange("riskLocation", v)} error={errors.riskLocation} placeholder="Complete site address where work is performed" required />
                </div>

                {/* NEW: Medical Extension Section */}
                <h3 className={STYLES.sectionTitle}>Medical Extension Details</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <Field type="select" label="Medical Extension Required?" value={form.medicalExtension} onChange={(v: any) => handleInputChange("medicalExtension", v)} options={["yes", "no"]} />
                  {form.medicalExtension === "yes" && (
                    <Field label="Medical Extension Limit (Per Person)" value={form.medicalLimit} onChange={(v: any) => handleInputChange("medicalLimit", v)} onlyNumber placeholder="Enter Amount" error={errors.medicalLimit} required />
                  )}
                </div>

                <h3 className={STYLES.sectionTitle}>Contact Person Information</h3>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <Field label="Contact Person Name" value={form.contactName} onChange={(v: any) => handleInputChange("contactName", v)} error={errors.contactName} required />
                  <Field label="Mobile Number" value={form.contactMobile} onChange={(v: any) => handleInputChange("contactMobile", v)} error={errors.contactMobile} required onlyNumber maxLength={10} placeholder="10-digit number" />
                  <Field label="Email ID" value={form.contactEmail} onChange={(v: any) => handleInputChange("contactEmail", v)} error={errors.contactEmail} required />
                </div>

                <div className="space-y-3">
                  <h3 className="text-md font-bold text-[#1CADA3] uppercase tracking-wider">Employee Wages Detail</h3>
                  <div className="overflow-x-auto border rounded-lg shadow-sm">
                    <table className="w-full text-left border-collapse min-w-[800px]">
                      <thead className="bg-gray-50 text-gray-600 text-[11px] uppercase font-bold border-b">
                        <tr>
                          <th className="px-4 py-3 w-16">Sr. No.</th>
                          <th className="px-4 py-3">Category of Worker</th>
                          <th className="px-4 py-3 w-28 text-center">No. of Employees</th>
                          <th className="px-4 py-3 w-28 text-center">Period (Months)</th>
                          <th className="px-4 py-3 w-40">Monthly Wages/Person</th>
                          <th className="px-4 py-3 w-40">Total Wages</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y text-sm">
                        {form.wcRows.map((row, index) => {
                          const total = (Number(row.count) || 0) * (Number(row.months) || 0) * (Number(row.monthlyWage) || 0);
                          return (
                            <tr key={index} className="hover:bg-gray-50/50">
                              <td className="px-4 py-2 font-medium text-gray-500 text-center">{index + 1}</td>
                              <td className="px-2 py-2"><input className="w-full p-1.5 border rounded-md" value={row.category} readOnly /></td>
                              <td className="px-2 py-2">
                                <input type="number" min="0" onWheel={(e) => e.currentTarget.blur()} className="w-full p-1.5 border rounded-md text-center" value={row.count} onChange={(e) => handleWCRowChange(index, "count", e.target.value)} />
                              </td>
                              <td className="px-2 py-2">
                                <input type="number" min="0" onWheel={(e) => e.currentTarget.blur()} className="w-full p-1.5 border rounded-md text-center" value={row.months} onChange={(e) => handleWCRowChange(index, "months", e.target.value)} />
                              </td>
                              <td className="px-2 py-2">
                                <input type="number" min="0" onWheel={(e) => e.currentTarget.blur()} className="w-full p-1.5 border rounded-md" value={row.monthlyWage} onChange={(e) => handleWCRowChange(index, "monthlyWage", e.target.value)} />
                              </td>
                              <td className="px-4 py-2 font-bold text-gray-700">₹ {total.toLocaleString('en-IN')}</td>
                            </tr>
                          );
                        })}
                      </tbody>
                    </table>
                  </div>
                </div>

                <h3 className={STYLES.sectionTitle}>Required Documents</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <FileUpload label="GST Certificate of company" onUpdate={(f: any) => handleFileChange("gstCertificate", f)} error={errors.gstCertificate} />
                </div>
              </div>
            )}

            <div className="flex justify-center pt-8 pb-4">
              <button type="submit" disabled={isSubmitting} className={STYLES.btn}>{isSubmitting ? "Submitting..." : "Submit"}</button>
            </div>
          </form>
        </div>
        {showSuccess && <SuccessModal onClose={onClose} />}
      </div>
    </div>
  );
}

// ... Field and FileUpload functions remain identical to your previous build ...
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
      <input type="file" ref={ref} onChange={(e) => { const f = e.target.files?.[0]; if (f) { setFile(f); onUpdate(f); } }} className="hidden" />
      {!file ? (
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