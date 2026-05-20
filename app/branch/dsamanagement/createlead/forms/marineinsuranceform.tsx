"use client";
import { useState } from "react";
import { X, CheckCircle, ChevronDown } from "lucide-react";
import { DashboardService } from "../../../../services/dashboardService";
import toast from "react-hot-toast";
import LeadFormDsaSelect, { detailLeadMeta } from "../components/LeadFormDsaSelect";

const STYLES = {
  input: (err: boolean) => `w-full border rounded-md p-2 bg-white text-gray-700 outline-none text-sm sm:text-base transition-all placeholder-gray-400 appearance-none ${err ? "border-red-500 focus:ring-1 focus:ring-red-500" : "border-gray-300 focus:ring-2 focus:ring-[#1CADA3] focus:border-[#1CADA3]"}`,
  label: "block text-sm font-medium mb-1 text-gray-700",
  btn: "w-full sm:w-50 bg-gradient-to-r from-[#2076C7] to-[#1CADA3] text-white py-2 rounded-md hover:from-[#1a68b0] hover:to-[#18998f] transition-colors text-sm sm:text-base font-medium shadow-md disabled:opacity-50 disabled:cursor-not-allowed",
  err: "text-red-500 text-xs mt-1"
};

const TRANSIT_MODES = ["Rail", "Road", "Courier", "Sea", "Air"];

export default function MarineInsuranceForm({ onClose }: { onClose: () => void }) {
  const [dsaId, setDsaId] = useState("");
  const [form, setForm] = useState<Record<string, string>>({
    proposer: "", policyNo: "", address: "", business: "", insurancePeriod: "",
    subjectMatter: "", packing: "", transitFrom: "", transitTo: "",
    transitMode: "", valuation: "", sumAssured: "", bottomLimit: "", locationLimit: ""
  });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);

  const handleInputChange = (field: string, value: string) => {
    setForm(prev => ({ ...prev, [field]: value }));
    if (errors[field]) setErrors(prev => ({ ...prev, [field]: "" }));
  };

  const validate = () => {
    const errs: Record<string, string> = {};
    const req = (f: string, msg: string) => { if (!form[f]?.trim()) errs[f] = msg; };

    if (!dsaId.trim()) errs.dsaId = "Select a DSA partner";

    req("proposer", "Proposer name is required");
    req("policyNo", "Policy number is required");
    req("address", "Address is required");
    req("business", "Business nature is required");
    req("insurancePeriod", "Period is required");
    req("subjectMatter", "Cargo details are required");
    req("packing", "Packing nature is required");
    req("transitFrom", "Transit from is required");
    req("transitTo", "Transit to is required");
    req("transitMode", "Select transit mode");
    req("valuation", "Valuation basis is required");
    req("sumAssured", "Sum assured is required");
    req("bottomLimit", "Bottom limit is required");
    req("locationLimit", "Location limit is required");

    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;
    setIsSubmitting(true);

    try {
      const payload = {
        department: "Insurance",
        product_type: "Marine Insurance",
        sub_category: "Marine Insurance",
        dsa_id: dsaId ? Number(dsaId) : null,
        client: {
          name: form.proposer,
          mobile: form.phone || "NA",
          email: form.email || "NA",
        },
        meta: detailLeadMeta({ is_self_login: false }),
        form_data: {
          policyNo: form.policyNo,
          address: form.address,
          business: form.business,
          insurancePeriod: form.insurancePeriod,
          subjectMatter: form.subjectMatter,
          packing: form.packing,
          transitFrom: form.transitFrom,
          transitTo: form.transitTo,
          transitMode: form.transitMode,
          valuation: form.valuation,
          sumAssured: form.sumAssured
        }
      };

      await DashboardService.createLead(payload);
      setShowSuccess(true);
    } catch (err) {
      toast.error("Failed to submit application. Please try again.");
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
          <h2 className="text-lg sm:text-xl font-semibold text-[#1CADA3]">Marine Insurance Form</h2>
          <button onClick={onClose} className="text-gray-500 hover:text-gray-800 transition-colors"><X size={20} className="sm:w-6 sm:h-6" /></button>
        </div>

        <div className="flex-1 overflow-y-auto p-4 sm:p-6">
          <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6">
            <div className="col-span-1 md:col-span-2">
              <LeadFormDsaSelect
                value={dsaId}
                onChange={(v) => {
                  setDsaId(v);
                  if (errors.dsaId) setErrors((p) => ({ ...p, dsaId: "" }));
                }}
                error={errors.dsaId}
                required
              />
            </div>
            <Field label="Name of Proposer" placeholder="Enter proposer name" {...fieldProps("proposer")} required />
            <Field label="Expiring Policy No" placeholder="Enter policy number" {...fieldProps("policyNo")} required />

            <div className="col-span-1 md:col-span-2">
              <Field label="Proposer Address" placeholder="Enter full address" {...fieldProps("address")} required />
            </div>

            <Field label="Nature of Business" placeholder="Enter business type" {...fieldProps("business")} required />
            <Field label="Period of Insurance" placeholder="e.g. 12 Months" {...fieldProps("insurancePeriod")} required />

            <Field label="Subject Matter (Cargo Details)" placeholder="Enter cargo details" {...fieldProps("subjectMatter")} required />
            <Field label="Nature of Packing" placeholder="e.g. Wooden Crates, Bags" {...fieldProps("packing")} required />

            <Field label="Transit Location From" placeholder="Origin location" {...fieldProps("transitFrom")} required />
            <Field label="Transit Location To" placeholder="Destination location" {...fieldProps("transitTo")} required />

            <Field label="Mode Of Transit" type="select" options={TRANSIT_MODES} {...fieldProps("transitMode")} required />
            <Field label="Basis of Valuation" placeholder="e.g. Invoice Value + 10%" {...fieldProps("valuation")} required />

            <Field label="Sum Assured" placeholder="Enter total amount" {...fieldProps("sumAssured")} required />
            <Field label="Per Bottom Limit" placeholder="Limit per transit" {...fieldProps("bottomLimit")} required />
            <Field label="Per Location Limit" placeholder="Limit per location" {...fieldProps("locationLimit")} required />

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

function Field({ label, value, onChange, type = "text", options, required, placeholder, error }: any) {
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
          <input type={type} value={value} onChange={e => onChange(e.target.value)} placeholder={placeholder} className={STYLES.input(!!error)} />
        )}
      </div>
      {error && <p className={STYLES.err}>{error}</p>}
    </div>
  );
}

function SuccessModal({ onClose }: { onClose: () => void }) {
  return (
    <div className="absolute inset-0 z-50 flex items-center justify-center bg-black/60 rounded-xl animate-in fade-in zoom-in duration-200">
      <div className="bg-white p-6 sm:p-8 rounded-2xl shadow-2xl text-center max-w-sm w-[90%]">
        <CheckCircle className="w-16 h-16 text-[#1CADA3] mx-auto mb-4" />
        <h3 className="text-2xl font-bold text-gray-800 mb-2">Success!</h3>
        <p className="text-gray-600 mb-6">Your Marine Insurance application has been submitted successfully.</p>
        <button onClick={onClose} className="w-full bg-[#1CADA3] text-white py-2.5 rounded-lg hover:bg-[#178e86] font-medium transition-colors">Okay, Got it</button>
      </div>
    </div>
  );
}