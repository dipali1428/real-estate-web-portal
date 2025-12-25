"use client";
import { useState, useRef, useMemo, useEffect } from "react";
import { X, CheckCircle, UploadCloud, Trash2, Plus, ChevronDown, Search } from "lucide-react";
import { RTO_LIST } from "../data/rtoData";

const STYLES = {
  input: (err: boolean) => `w-full border rounded-md p-2 bg-white text-gray-700 outline-none text-sm sm:text-base transition-all placeholder-gray-400 appearance-none ${err ? "border-red-500 focus:ring-1 focus:ring-red-500" : "border-gray-300 focus:ring-2 focus:ring-[#1CADA3] focus:border-[#1CADA3]"}`,
  label: "block text-sm font-medium mb-1 text-gray-700",
  btn: "w-full sm:w-50 bg-gradient-to-r from-[#2076C7] to-[#1CADA3] text-white py-2 rounded-md hover:from-[#1a68b0] hover:to-[#18998f] transition-colors text-sm sm:text-base font-medium shadow-md disabled:opacity-50 disabled:cursor-not-allowed",
  err: "text-red-500 text-xs mt-1"
};

const VEHICLE_TYPES = ["Private Car", "2 Wheeler", "GCV", "PCV", "Misc-D"];
const REQUIREMENT_OPTIONS = ["Comprehensive", "Own Damage", "Third Party Damage"];
const MANUFACTURERS: Record<string, string[]> = {
  "Private Car": ["Maruti Suzuki", "Hyundai", "Tata Motors", "Mahindra", "Toyota", "Honda", "Kia", "Volkswagen", "Skoda", "MG Motor", "Renault", "Nissan", "Ford", "Jeep", "BMW", "Mercedes-Benz", "Audi", "Volvo", "Jaguar", "Land Rover", "BYD", "Citroen", "Isuzu", "Lexus", "Porsche", "Tesla", "Ferrari", "Lamborghini", "Rolls-Royce", "Bentley", "Aston Martin", "McLaren", "Maserati", "Mini", "Force Motors"],
  "2 Wheeler": ["Hero MotoCorp", "Honda", "TVS", "Bajaj Auto", "Royal Enfield", "Suzuki", "Yamaha", "KTM", "Vespa", "Harley-Davidson", "Mahindra", "Jawa", "BMW Motorrad", "Triumph", "Ducati", "Ola Electric", "Ather Energy", "Kawasaki", "Aprilia", "Husqvarna", "Hero Electric", "Okinawa", "Ampere", "Revolt", "Tork Motors", "Benelli", "Indian Motorcycle", "Keeway", "Zontes", "Yezdi"],
  "GCV": ["Tata Motors", "Ashok Leyland", "Mahindra", "Eicher Motors", "BharatBenz", "Volvo Trucks", "Scania", "MAN Trucks", "AMW Motors", "SML Isuzu", "Asia MotorWorks", "Isuzu", "Piaggio", "Atul Auto", "Euler Motors", "Altigreen", "Force Motors"],
  "PCV": ["Tata Motors", "Ashok Leyland", "Mahindra", "Force Motors", "Eicher Motors", "BharatBenz", "Volvo Buses", "Scania", "MAN", "SML Isuzu", "Hindustan Motors", "JBM Auto", "Olectra Greentech", "PMI Electro Mobility", "Skyline"],
  "Misc-D": ["Tata Motors", "Mahindra", "Ashok Leyland", "Force Motors", "Eicher Motors", "SML Isuzu", "Piaggio", "Atul Auto", "Bajaj Auto", "TVS", "JCB", "Caterpillar", "John Deere", "Escorts", "Kubota", "New Holland", "Case IH", "Action Construction Equipment (ACE)", "Kinetic Green", "L&T", "Sany"]
};

export default function MotorInsuranceForm({ onClose }: { onClose: () => void }) {
  const [form, setForm] = useState<any>({
    vehicleType: "", clientName: "", isNew: "", fuelType: "", vehicleReg: "",
    rto: "", manufacturer: "", vehicleModel: "", gvw: "", cc: "",
    requirement: [] as string[], idv: "", claimTaken: "", hasPrev: ""
  });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [uploadedDocs, setUploadedDocs] = useState<Record<string, boolean>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);

  const [rtoSearch, setRtoSearch] = useState("");
  const [isRtoOpen, setIsRtoOpen] = useState(false);
  const rtoRef = useRef<HTMLDivElement>(null);

  const isNew = form.isNew === "Yes";
  const isGCV = form.vehicleType === "GCV";
  const isNewGCV = isGCV && isNew;
  const showGvw = isGCV;
  const showCc = ["Private Car", "PCV"].includes(form.vehicleType);
  const showIdv = !form.requirement.includes("Third Party Damage") || form.requirement.length > 1;

  const filteredRTOs = useMemo(() => {
    return RTO_LIST.filter(item => item.toLowerCase().includes(rtoSearch.toLowerCase()));
  }, [rtoSearch]);

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (rtoRef.current && !rtoRef.current.contains(e.target as Node)) setIsRtoOpen(false);
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const requiredDocs = useMemo(() => {
    const docs = [];
    if (form.vehicleType) {
      if (isNew) docs.push("Showroom Quotation");
      else docs.push("RC Documents");
      if (!isNew && form.hasPrev === "Yes") docs.push("Previous Year Policy");
    }
    return docs;
  }, [form.vehicleType, isNew, form.hasPrev]);

  const handleInputChange = (field: string, value: any) => {
    setForm((prev: any) => {
      const next = { ...prev, [field]: value };
      if (field === "vehicleType") Object.assign(next, { manufacturer: "", fuelType: "", gvw: "", cc: "" });
      if (field === "isNew") Object.assign(next, { vehicleReg: "", rto: "", claimTaken: "", hasPrev: "" });
      return next;
    });
    if (errors[field]) setErrors(p => ({ ...p, [field]: "" }));
  };

  const handleCheck = (opt: string, checked: boolean) => {
    let reqs = checked ? [...form.requirement, opt] : form.requirement.filter((r: string) => r !== opt);
    if (checked) {
      if (opt === "Comprehensive") reqs = reqs.filter((r: string) => r !== "Own Damage");
      if (opt === "Own Damage") reqs = reqs.filter((r: string) => r !== "Comprehensive");
      if (!isGCV && isNew && (opt === "Comprehensive" || opt === "Own Damage")) reqs = reqs.filter((r: string) => r !== "Third Party Damage");
      if (!isGCV && isNew && opt === "Third Party Damage") reqs = reqs.filter((r: string) => !["Comprehensive", "Own Damage"].includes(r));
    }
    handleInputChange("requirement", [...new Set(reqs)]);
  };

  const validate = () => {
    const errs: Record<string, string> = {};
    const req = (f: string, msg: string) => { if (!String(form[f] || "").trim()) errs[f] = msg; };
    req("vehicleType", "Select vehicle type");
    req("clientName", "Client Name is required");
    req("isNew", "Select an option");
    req("fuelType", "Fuel type is required");
    req("manufacturer", "Select manufacturer");
    req("vehicleModel", "Model is required");
    if (!isNew) {
      req("vehicleReg", "Registration is required");
      req("claimTaken", "Select an option");
      req("hasPrev", "Select an option");
    } else req("rto", "RTO location is required");
    if (showGvw) req("gvw", "GVW is required");
    if (showCc) req("cc", "CC is required");
    if (!form.requirement.length) errs.requirement = "Select at least one requirement";
    requiredDocs.forEach(d => { if (!uploadedDocs[d]) errs[`doc_${d}`] = `Upload ${d}`; });
    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;
    setIsSubmitting(true);
    await new Promise(r => setTimeout(r, 1000));
    setShowSuccess(true);
    setIsSubmitting(false);
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
          <h2 className="text-lg sm:text-xl font-semibold text-[#1CADA3]">Motor Insurance Form</h2>
          <button onClick={onClose} className="text-gray-500 hover:text-gray-800 transition-colors"><X size={20} className="sm:w-6 sm:h-6" /></button>
        </div>

        <div className="flex-1 overflow-y-auto p-4 sm:p-6">
          <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6">
            <Field label="Type of Vehicle" type="select" options={VEHICLE_TYPES} {...fieldProps("vehicleType")} required />
            <Field label="Client Name" placeholder="Enter full name" {...fieldProps("clientName")} required />
            <Field label="Is this a new vehicle?" type="select" options={["Yes", "No"]} {...fieldProps("isNew")} required />

            {form.vehicleType === "2 Wheeler" ? (
              <Field label="Fuel Type" type="select" options={["Petrol", "Electric"]} {...fieldProps("fuelType")} required />
            ) : (
              <Field label="Fuel Type" placeholder="Diesel, Petrol, CNG, Electric" {...fieldProps("fuelType")} required />
            )}

            {!isNew && <Field label="Vehicle Registration" placeholder="DL 01 AB 1234" {...fieldProps("vehicleReg")} required />}

            {isNew && (
              <div className="relative" ref={rtoRef}>
                <label className={STYLES.label}>RTO and City <span className="text-red-500">*</span></label>
                <div
                  className={`${STYLES.input(!!errors.rto)} cursor-pointer flex justify-between items-center`}
                  onClick={() => setIsRtoOpen(!isRtoOpen)}
                >
                  <span className={form.rto ? "text-gray-700" : "text-gray-400"}>{form.rto || "Select RTO Location"}</span>
                  <ChevronDown size={16} className={`text-gray-400 transition-transform ${isRtoOpen ? 'rotate-180' : ''}`} />
                </div>
                {isRtoOpen && (
                  <div className="absolute z-50 w-full mt-1 bg-white border border-gray-200 rounded-md shadow-lg overflow-hidden">
                    <div className="p-2 border-b bg-gray-50 flex items-center">
                      <Search size={14} className="text-gray-400 mr-2" />
                      <input type="text" className="w-full text-sm outline-none bg-transparent" placeholder="Search..." value={rtoSearch} onChange={(e) => setRtoSearch(e.target.value)} autoFocus />
                    </div>
                    <ul className="max-h-48 overflow-y-auto text-sm">
                      {filteredRTOs.length > 0 ? filteredRTOs.map((rto) => (
                        <li key={rto} className="px-4 py-2 hover:bg-[#1CADA3] hover:text-white cursor-pointer" onClick={() => { handleInputChange("rto", rto); setIsRtoOpen(false); setRtoSearch(""); }}>{rto}</li>
                      )) : <li className="px-4 py-2 text-gray-500">No results found</li>}
                      <li className="px-4 py-2 border-t hover:bg-gray-100 cursor-pointer text-[#1CADA3] italic" onClick={() => { handleInputChange("rto", "Other"); setIsRtoOpen(false); }}>Other (Not in list)</li>
                    </ul>
                  </div>
                )}
                {errors.rto && <p className={STYLES.err}>{errors.rto}</p>}
              </div>
            )}

            <Field
              label="Manufacturer"
              type="select"
              placeholder={form.vehicleType ? `Select ${form.vehicleType} Manufacturer` : "Select Vehicle Type First"}
              options={MANUFACTURERS[form.vehicleType] || []}
              {...fieldProps("manufacturer")}
              required
              disabled={!form.vehicleType}
            />

            <Field label="Vehicle Make & Model" placeholder="Enter make and model" {...fieldProps("vehicleModel")} required />
            {showGvw && <Field label="GVW (Gross Vehicle Weight)" placeholder="Weight in kg" onlyNumber {...fieldProps("gvw")} required />}
            {showCc && <Field label="CC (Cubic Capacity)" placeholder="Enter CC" onlyNumber {...fieldProps("cc")} required />}

            <div className="col-span-1 md:col-span-2">
              <label className={STYLES.label}>Requirement <span className="text-red-500">*</span></label>
              <div className="flex flex-wrap gap-4 mt-2">
                {REQUIREMENT_OPTIONS.map(opt => {
                  const disabled = (opt === "Comprehensive" && form.requirement.includes("Own Damage")) ||
                    (opt === "Own Damage" && (form.requirement.includes("Comprehensive") || isNewGCV || isNew)) ||
                    (opt === "Third Party Damage" && isNew && !isGCV);
                  return (
                    <label key={opt} className={`flex items-center text-sm gap-2 ${disabled ? 'opacity-40 cursor-not-allowed' : 'cursor-pointer'}`}>
                      <input type="checkbox" checked={form.requirement.includes(opt)} disabled={disabled} onChange={e => handleCheck(opt, e.target.checked)} className="w-4 h-4 rounded border-gray-300 text-[#1CADA3] focus:ring-[#1CADA3]" />
                      <span className="text-gray-700">{opt}</span>
                    </label>
                  );
                })}
              </div>
              {errors.requirement && <p className={STYLES.err}>{errors.requirement}</p>}
            </div>

            {showIdv && <Field label="Vehicle IDV (Optional)" placeholder="Enter IDV amount" onlyNumber {...fieldProps("idv")} />}
            {!isNew && <Field label="Claim Taken" type="select" options={["Yes", "No"]} {...fieldProps("claimTaken")} required />}
            {!isNew && <Field label="Prev. Year Policy Available?" type="select" options={["Yes", "No"]} {...fieldProps("hasPrev")} required />}

            {requiredDocs.length > 0 && (
              <div className="col-span-1 md:col-span-2 mt-4">
                <h3 className="text-md font-semibold mb-3 text-[#1CADA3] border-b pb-2">Upload Documents</h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
                  {requiredDocs.map(lbl => (
                    <FileUpload key={lbl} label={lbl} allowMultiple={lbl === "RC Documents"} onUpdate={(has: any) => {
                      setUploadedDocs(p => ({ ...p, [lbl]: has }));
                      if (has) setErrors(p => ({ ...p, [`doc_${lbl}`]: "" }));
                    }} error={errors[`doc_${lbl}`]} />
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
            <select
              value={value}
              onChange={e => onChange(e.target.value)}
              disabled={disabled}
              className={`${STYLES.input(!!error)} cursor-pointer ${disabled ? 'bg-gray-50 text-gray-400 border-gray-200' : ''}`}
            >
              <option value="">{placeholder || `Select ${label}`}</option>
              {options?.map((opt: string) => <option key={opt} value={opt}>{opt}</option>)}
            </select>
            <ChevronDown className={`absolute right-3 top-3 ${disabled ? 'text-gray-300' : 'text-gray-400'} pointer-events-none`} size={16} />
          </>
        ) : (
          <input
            type={type}
            value={value}
            onChange={e => onChange(e.target.value)}
            onKeyDown={handleKeyDown}
            maxLength={maxLength}
            placeholder={placeholder}
            disabled={disabled}
            className={`${STYLES.input(!!error)} ${disabled ? 'bg-gray-50 text-gray-400 border-gray-200' : ''}`}
          />
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
      <label className="text-sm font-medium mb-1 text-gray-700 flex justify-between">
        <span>{label} <span className="text-red-500">*</span></span>
        <span className="text-[10px] text-gray-400 font-normal">{allowMultiple ? "(Multiple, <180KB)" : "(<180KB)"}</span>
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
        <p className="text-gray-600 mb-6">Your Motor Insurance application has been submitted successfully.</p>
        <button onClick={onClose} className="w-full bg-[#1CADA3] text-white py-2.5 rounded-lg hover:bg-[#178e86] font-medium transition-colors">Okay, Got it</button>
      </div>
    </div>
  );
}