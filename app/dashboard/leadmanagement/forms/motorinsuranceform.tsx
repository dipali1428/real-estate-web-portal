"use client";
import { useState, FormEvent, useCallback, useMemo, useRef, useEffect } from "react";
import { X, Upload, FileText, Search, ChevronDown } from "lucide-react";
import { RTO_LIST } from "../data/rtoData";

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
  const [formData, setFormData] = useState({
    vehicleType: "", clientName: "", vehicleReg: "", vehicleModel: "", manufacturer: "",
    idv: "", requirement: [] as string[], claimTaken: "", fuelType: "", rto: "",
    isNew: "", hasPrev: ""
  });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [files, setFiles] = useState<File[]>([]);
  const [prevPolicyFile, setPrevPolicyFile] = useState<File | null>(null);
  const [submitting, setSubmitting] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);

  // Searchable RTO Dropdown State
  const [rtoSearch, setRtoSearch] = useState("");
  const [isRtoOpen, setIsRtoOpen] = useState(false);
  const rtoRef = useRef<HTMLDivElement>(null);

  const isNew = formData.isNew === "Yes";
  const isGCV = formData.vehicleType === "GCV";
  const isNewGCV = isGCV && isNew;
  const showGvw = isGCV;
  const showCc = ["Private Car", "PCV"].includes(formData.vehicleType);
  const showIdv = !formData.requirement.includes("Third Party Damage") || formData.requirement.length > 1;

  // Filter RTOs based on search
  const filteredRTOs = useMemo(() => {
    return RTO_LIST.filter(item => 
      item.toLowerCase().includes(rtoSearch.toLowerCase())
    );
  }, [rtoSearch]);

  // Close RTO dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (rtoRef.current && !rtoRef.current.contains(event.target as Node)) {
        setIsRtoOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const update = (field: string, value: any) => {
    setFormData(p => {
      const next = { ...p, [field]: value };
      if (field === "vehicleType") Object.assign(next, { manufacturer: "", fuelType: "", gvw: "", cc: "" });
      if (field === "isNew") Object.assign(next, { vehicleReg: "", rto: "", claimTaken: "", hasPrev: "" });
      return next;
    });
    if (errors[field]) setErrors(prev => ({ ...prev, [field]: "" }));
  };

  const handleCheck = (opt: string, checked: boolean) => {
    let reqs = checked ? [...formData.requirement, opt] : formData.requirement.filter(r => r !== opt);
    if (checked) {
      if (opt === "Comprehensive") reqs = reqs.filter(r => r !== "Own Damage");
      if (opt === "Own Damage") reqs = reqs.filter(r => r !== "Comprehensive");
      if (!isGCV && isNew && (opt === "Comprehensive" || opt === "Own Damage")) reqs = reqs.filter(r => r !== "Third Party Damage");
      if (!isGCV && isNew && opt === "Third Party Damage") reqs = reqs.filter(r => !["Comprehensive", "Own Damage"].includes(r));
    }
    update("requirement", [...new Set(reqs)]);
  };

  const validate = () => {
    const e: Record<string, string> = {};
    const req = (f: string, msg = "This field is required") => { if (!String((formData as any)[f]).trim()) e[f] = msg; };
    ["vehicleType", "clientName", "manufacturer", "fuelType", "isNew"].forEach(f => req(f));
    if (!formData.requirement.length) e.requirement = "Select at least one requirement";
    if (!isNew) { req("claimTaken"); req("hasPrev", "Select an option"); }
    if (isNew && !formData.rto) e.rto = "RTO location is required for new vehicles";
    if (!isNew && !formData.vehicleReg) e.vehicleReg = "This field is required";
    if (isNew && !files.length) e.showroomQuotation = "Showroom Quotation is required";
    if (!isNew && !files.length) e.rcDocuments = "RC Documents are required";
    if (!isNew && formData.hasPrev === "Yes" && !prevPolicyFile) e.prevPolicy = "Upload previous year policy";
    setErrors(e);
    return !Object.keys(e).length;
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 text-gray-700">
      {showSuccess && (
        <div className="fixed inset-0 z-[60] flex items-center justify-center">
          <div className="absolute inset-0 bg-black/40" />
          <div className="relative bg-white rounded-xl shadow-xl p-6 max-w-sm text-center">
            <div className="mx-auto flex items-center justify-center h-12 w-12 rounded-full bg-green-100 mb-4 text-green-600">
              <svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" /></svg>
            </div>
            <h3 className="text-lg font-medium text-gray-900 mb-2">Form Submitted Successfully!</h3>
            <p className="text-sm text-gray-500">Redirecting in 3 seconds...</p>
          </div>
        </div>
      )}

      <div className="bg-white rounded-xl shadow-xl w-full max-w-4xl mx-4 overflow-y-auto max-h-[90vh]">
        <div className="flex justify-between items-center border-b px-6 py-4 sticky top-0 bg-white z-10">
          <h2 className="text-xl font-semibold text-[#1CADA3]">Motor Insurance Form</h2>
          <button onClick={onClose} className="text-gray-500 hover:text-gray-800"><X size={22} /></button>
        </div>

        <form className="p-6 grid grid-cols-1 md:grid-cols-2 gap-6" onSubmit={async (e) => {
          e.preventDefault(); if (!validate()) return; setSubmitting(true);
          await new Promise(r => setTimeout(r, 1000)); setShowSuccess(true);
          setTimeout(() => { setShowSuccess(false); onClose(); }, 3000);
        }}>
          <Select id="vehicleType" label="Type of Vehicle" value={formData.vehicleType} options={VEHICLE_TYPES} onChange={(v: any) => update("vehicleType", v)} error={errors.vehicleType} required />
          <Input id="clientName" label="Client Name" value={formData.clientName} onChange={(v: any) => update("clientName", v)} error={errors.clientName} placeholder="Enter Client Name" required />
          <Select id="isNew" label="Is this a new vehicle?" value={formData.isNew} options={["Yes", "No"]} onChange={(v: any) => update("isNew", v)} error={errors.isNew} required />
          
          {formData.vehicleType === "2 Wheeler" ? 
            <Select id="fuelType" label="Fuel Type" value={formData.fuelType} options={["Petrol", "Electric"]} onChange={(v: any) => update("fuelType", v)} error={errors.fuelType} required /> :
            <Input id="fuelType" label="Fuel Type" value={formData.fuelType} onChange={(v: any) => update("fuelType", v)} error={errors.fuelType} placeholder="Diesel, Petrol, CNG, Electric" required />
          }

          {!isNew && <Input id="vehicleReg" label="Vehicle Registration" value={formData.vehicleReg} onChange={(v: any) => update("vehicleReg", v)} error={errors.vehicleReg} placeholder="DL 01 AB 1234" required />}
          
          {/* Custom Searchable RTO Dropdown */}
          {isNew && (
            <div className="relative" ref={rtoRef}>
              <label className="block text-sm font-medium mb-2">RTO and City <span className="text-red-500">*</span></label>
              <div 
                className={`flex items-center justify-between w-full border rounded-md p-3 cursor-pointer bg-white transition-all ${errors.rto ? 'border-red-500' : 'border-gray-300 focus-within:border-[#1CADA3]'}`}
                onClick={() => setIsRtoOpen(!isRtoOpen)}
              >
                <span className={formData.rto ? "text-gray-900" : "text-gray-400"}>
                  {formData.rto || "Select RTO Location"}
                </span>
                <ChevronDown size={18} className={`text-gray-400 transition-transform ${isRtoOpen ? 'rotate-180' : ''}`} />
              </div>

              {isRtoOpen && (
                <div className="absolute z-50 w-full mt-1 bg-white border border-gray-200 rounded-md shadow-lg overflow-hidden animate-in fade-in slide-in-from-top-1">
                  <div className="p-2 border-b bg-gray-50 flex items-center">
                    <Search size={14} className="text-gray-400 mr-2" />
                    <input 
                      type="text"
                      className="w-full text-sm outline-none bg-transparent"
                      placeholder="Search city or code..."
                      value={rtoSearch}
                      onChange={(e) => setRtoSearch(e.target.value)}
                      autoFocus
                    />
                  </div>
                  {/* Fixed Height Container */}
                  <ul className="max-h-48 overflow-y-auto text-sm">
                    {filteredRTOs.length > 0 ? (
                      filteredRTOs.map((rto) => (
                        <li 
                          key={rto}
                          className="px-4 py-2 hover:bg-[#1CADA3] hover:text-white cursor-pointer transition-colors"
                          onClick={() => {
                            update("rto", rto);
                            setIsRtoOpen(false);
                            setRtoSearch("");
                          }}
                        >
                          {rto}
                        </li>
                      ))
                    ) : (
                      <li className="px-4 py-2 text-gray-500">No results found</li>
                    )}
                    <li 
                      className="px-4 py-2 border-t hover:bg-gray-100 cursor-pointer font-medium italic text-[#1CADA3]"
                      onClick={() => { update("rto", "Other"); setIsRtoOpen(false); }}
                    >
                      Other (Not in list)
                    </li>
                  </ul>
                </div>
              )}
              {errors.rto && <p className="text-red-500 text-xs mt-1">{errors.rto}</p>}
            </div>
          )}

          <div>
            <label className="block text-sm font-medium mb-2">Manufacturer <span className="text-red-500">*</span></label>
            <select className={`w-full border rounded-md p-3 transition-colors ${errors.manufacturer ? 'border-red-500' : 'border-gray-300'} ${!formData.vehicleType ? 'bg-gray-100' : ''}`} 
              value={formData.manufacturer} onChange={e => update("manufacturer", e.target.value)} disabled={!formData.vehicleType}>
              <option value="">{formData.vehicleType ? `Select ${formData.vehicleType} Manufacturer` : "Select Vehicle Type First"}</option>
              {(MANUFACTURERS[formData.vehicleType] || []).map(m => <option key={m} value={m}>{m}</option>)}
            </select>
            {errors.manufacturer && <p className="text-red-500 text-xs mt-1">{errors.manufacturer}</p>}
          </div>

          <Input id="vehicleModel" label="Vehicle Make & Model" value={formData.vehicleModel} onChange={(v: any) => update("vehicleModel", v)} error={errors.vehicleModel} placeholder="Enter Vehicle Make & Model" required />
          {showGvw && <Input id="gvw" label="GVW (Gross Vehicle Weight)" type="number" value={(formData as any).gvw} onChange={(v: any) => update("gvw", v)} error={errors.gvw} placeholder="Enter GVW in kg" required />}
          {showCc && <Input id="cc" label="CC (Cubic Capacity)" type="number" value={(formData as any).cc} onChange={(v: any) => update("cc", v)} error={errors.cc} placeholder="Enter CC" required />}

          <div className="md:col-span-2">
            <label className="block text-sm font-medium mb-2">Requirement <span className="text-red-500">*</span></label>
            <div className="space-y-1">
              {REQUIREMENT_OPTIONS.map(opt => {
                const disabled = (opt === "Comprehensive" && formData.requirement.includes("Own Damage")) ||
                  (opt === "Own Damage" && (formData.requirement.includes("Comprehensive") || isNewGCV || isNew)) ||
                  (opt === "Third Party Damage" && isNew && !isGCV);
                return (
                  <label key={opt} className={`flex items-center text-sm ${disabled ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer'}`}>
                    <input type="checkbox" checked={formData.requirement.includes(opt)} disabled={disabled} onChange={e => handleCheck(opt, e.target.checked)} className="mr-2 w-4 h-4 text-[#1CADA3] rounded border-gray-300 focus:ring-[#1CADA3]" />
                    {opt} {disabled && <span className="text-xs text-gray-500 ml-1">(Disabled)</span>}
                  </label>
                );
              })}
            </div>
            {errors.requirement && <p className="text-red-500 text-xs mt-1">{errors.requirement}</p>}
          </div>

          {showIdv && <Input id="idv" label="Vehicle IDV (Optional)" type="number" value={formData.idv} onChange={(v: any) => update("idv", v)} error={errors.idv} placeholder="Enter Vehicle IDV" />}
          {!isNew && <Select id="claimTaken" label="Claim Taken" value={formData.claimTaken} options={["Yes", "No"]} onChange={(v: any) => update("claimTaken", v)} error={errors.claimTaken} required />}
          {!isNew && <Select id="hasPrev" label="Prev. Year Policy Available?" value={formData.hasPrev} options={["Yes", "No"]} onChange={(v: any) => update("hasPrev", v)} error={errors.hasPrev} required />}

          <div className="md:col-span-2">
            <label className="block text-sm font-medium mb-2">{isNew ? "Showroom Quotation" : "RC Documents"} <span className="text-red-500">*</span> 
              <span className="text-xs text-gray-500 ml-2">{isNew ? "(Upload showroom quotation)" : "(Upload front and back photos of RC)"}</span>
            </label>
            <div className="border-2 border-dashed border-gray-300 rounded-md p-4 text-center hover:border-[#1CADA3] transition-colors">
              <input type="file" multiple hidden id="fup" accept=".pdf,.jpg,.jpeg,.png" onChange={e => setFiles([...files, ...Array.from(e.target.files || [])])} />
              <label htmlFor="fup" className="cursor-pointer flex flex-col items-center">
                <Upload className="text-gray-400 mb-2" size={24} />
                <p className="text-sm text-gray-600">Click to upload files or drag and drop</p>
                <p className="text-xs text-gray-500 mt-1">PDF, JPG, PNG up to 10MB each</p>
              </label>
            </div>
            {files.map((f, i) => (
              <div key={i} className="flex justify-between items-center bg-gray-50 p-3 rounded-md border mt-2">
                <div className="flex items-center gap-2"><FileText size={16} className="text-gray-400" /><span className="text-sm text-gray-700">{f.name}</span><span className="text-xs text-gray-500">({(f.size / (1024 * 1024)).toFixed(2)} MB)</span></div>
                <button type="button" onClick={() => setFiles(files.filter((_, idx) => idx !== i))} className="text-red-500 hover:text-red-700 text-sm font-medium">Remove</button>
              </div>
            ))}
            {(errors.rcDocuments || errors.showroomQuotation) && <p className="text-red-500 text-xs mt-1">{errors.rcDocuments || errors.showroomQuotation}</p>}
          </div>

          {!isNew && formData.hasPrev === "Yes" && (
            <div className="md:col-span-2">
              <label className="block text-sm font-medium mb-2">Upload Prev. Year Policy</label>
              <div className="border-2 border-dashed border-gray-300 rounded-md p-4 text-center hover:border-[#1CADA3] transition-colors">
                <input type="file" hidden id="prevPol" accept=".pdf,.jpg,.jpeg,.png" onChange={e => setPrevPolicyFile(e.target.files?.[0] || null)} />
                <label htmlFor="prevPol" className="cursor-pointer flex flex-col items-center">
                  <Upload className="text-gray-400 mb-2" size={24} />
                  <p className="text-sm text-gray-600">{prevPolicyFile ? prevPolicyFile.name : "Click to upload previous policy"}</p>
                </label>
              </div>
              {errors.prevPolicy && <p className="text-red-500 text-xs mt-1">{errors.prevPolicy}</p>}
            </div>
          )}

          <div className="md:col-span-2 flex justify-center pt-6">
            <button type="submit" disabled={submitting} className="bg-[#1CADA3] text-white px-8 py-3 rounded-md font-medium hover:bg-[#16948d] disabled:opacity-50 transition-colors min-w-[120px]">
              {submitting ? "Submitting..." : "Submit"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

const Input = ({ label, error, required, onChange, ...p }: any) => (
  <div>
    <label className="block text-sm font-medium mb-2">{label} {required && <span className="text-red-500">*</span>}</label>
    <input {...p} onChange={e => onChange(e.target.value)} className={`w-full border rounded-md p-3 transition-colors focus:border-[#1CADA3] focus:ring-1 focus:ring-[#1CADA3] outline-none ${error ? 'border-red-500' : 'border-gray-300'}`} />
    {error && <p className="text-red-500 text-xs mt-1">{error}</p>}
  </div>
);

const Select = ({ label, options, error, required, onChange, value, id }: any) => (
  <div>
    <label className="block text-sm font-medium mb-2">{label} {required && <span className="text-red-500">*</span>}</label>
    <select id={id} value={value} onChange={e => onChange(e.target.value)} className={`w-full border rounded-md p-3 transition-colors focus:border-[#1CADA3] focus:ring-1 focus:ring-[#1CADA3] outline-none ${error ? 'border-red-500' : 'border-gray-300'}`}>
      <option value="">Select {label}</option>
      {options.map((o: string) => <option key={o} value={o}>{o}</option>)}
    </select>
    {error && <p className="text-red-500 text-xs mt-1">{error}</p>}
  </div>
);