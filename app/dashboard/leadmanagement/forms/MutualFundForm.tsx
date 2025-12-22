"use client";
import { useState, useMemo } from "react";
import { X, Upload, Plus, AlertCircle, Trash2 } from "lucide-react";

const STYLES = {
  input: "w-full border border-gray-300 rounded-lg p-3 text-gray-700 focus:ring-2 focus:ring-[#1CADA3] focus:border-transparent outline-none transition-all",
  label: "block font-medium mb-1 text-gray-700",
  header: "text-lg sm:text-xl font-semibold text-[#1CADA3] border-b pb-2 mb-4",
  err: "text-red-500 text-sm mt-1 flex items-center gap-1"
};

export default function MutualFundForm({ onClose }: { onClose: () => void }) {
  const [form, setForm] = useState({
    clientName: "", mobile: "", email: "", pan: "", occupation: "", incomeRange: "", mothersName: "",
    nomineeName: "", nomineeDob: "", nomineeRelation: "", nomineeMobile: "", nomineeEmail: "",
    guardianName: "", guardianMobile: "", guardianEmail: "", guardianRelationClient: "", guardianRelationNominee: "",
    investmentType: "sip", investmentAmount: "", sipDate: "",
    schemes: [{ schemeName: "", schemeAmount: "", schemeId: "1" }],
    clientPan: null, clientAadhaar: null, cancelledCheque: null, nomineePan: null, birthCertificate: null, guardianPan: null
  });
  const [err, setErr] = useState<Record<string, string>>({});

  // Unified Updater
  const update = (k: string, v: any) => {
    let val = v;
    if (k.toLowerCase().includes("mobile")) val = v.replace(/\D/g, '').slice(0, 10);
    if (k.toLowerCase().includes("pan")) val = v.toUpperCase().replace(/[^A-Z0-9]/g, '').slice(0, 10);
    if (k === "sipDate") val = v.replace(/\D/g, '').slice(0, 2);
    if (k === "investmentAmount" || k.startsWith("schemeAmount")) {
      val = v.replace(/[^0-9.]/g, '');
      if ((val.match(/\./g) || []).length > 1) val = val.substring(0, val.lastIndexOf('.'));
      if (val.includes('.') && val.split('.')[1].length > 2) val = val.substring(0, val.indexOf('.') + 3);
    }
    setForm(p => ({ ...p, [k]: val }));
    setErr(p => ({ ...p, [k]: "" }));
  };

  // Scheme Logic
  const modScheme = (id: string, k: string, v: string) => {
    setForm(p => ({ ...p, schemes: p.schemes.map(s => s.schemeId === id ? { ...s, [k]: v } : s) }));
  };
  const addScheme = () => setForm(p => ({ ...p, schemes: [...p.schemes, { schemeName: "", schemeAmount: "", schemeId: Date.now().toString() }] }));
  const remScheme = (id: string) => form.schemes.length > 1 && setForm(p => ({ ...p, schemes: p.schemes.filter(s => s.schemeId !== id) }));

  // Derived State
  const { age, isMinor } = useMemo(() => {
    if (!form.nomineeDob) return { age: null, isMinor: false };
    const diff = new Date().getTime() - new Date(form.nomineeDob).getTime();
    const ageVal = Math.floor(diff / (1000 * 60 * 60 * 24 * 365.25));
    return { age: ageVal, isMinor: ageVal < 18 };
  }, [form.nomineeDob]);

  // Validation
  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    const eMap: Record<string, string> = {};
    const req = (k: string, msg = "Required") => !form[k as keyof typeof form] && (eMap[k] = msg);
    
    req("clientName"); req("incomeRange"); req("occupation"); req("mothersName");
    if (form.mobile.length !== 10) eMap.mobile = "Invalid Mobile";
    if (!/^\S+@\S+\.\S+$/.test(form.email)) eMap.email = "Invalid Email";
    if (form.pan.length !== 10) eMap.pan = "Invalid PAN";
    
    req("nomineeName"); req("nomineeDob"); req("nomineeRelation");
    if (!isMinor) {
       if (form.nomineeMobile.length !== 10) eMap.nomineeMobile = "Invalid Mobile";
       if (!/^\S+@\S+\.\S+$/.test(form.nomineeEmail)) eMap.nomineeEmail = "Invalid Email";
    } else {
       req("guardianName"); req("guardianRelationClient"); req("guardianRelationNominee");
       if (form.guardianMobile.length !== 10) eMap.guardianMobile = "Invalid Mobile";
       if (!/^\S+@\S+\.\S+$/.test(form.guardianEmail)) eMap.guardianEmail = "Invalid Email";
    }

    if (!form.investmentAmount || parseFloat(form.investmentAmount) <= 0) eMap.investmentAmount = "Invalid Amount";
    if (form.investmentType === 'sip' && (!form.sipDate || +form.sipDate < 1 || +form.sipDate > 31)) eMap.sipDate = "Invalid Date";

    req("clientPan"); req("clientAadhaar"); req("cancelledCheque"); req("nomineePan");
    if (isMinor) { req("birthCertificate"); req("guardianPan"); }

    setErr(eMap);
    if (!Object.keys(eMap).length) { alert("Form Submitted Successfully!"); console.log(form); }
  };

  return (
    <div className="fixed inset-0 bg-black/40 z-50 flex items-center justify-center p-2 sm:p-4">
      <div className="bg-white w-full max-w-4xl rounded-xl shadow-xl overflow-hidden flex flex-col h-[95vh] sm:h-[90vh]">
        <div className="flex justify-between items-center px-4 sm:px-6 py-3 sm:py-4 border-b shrink-0">
          <div><h2 className="text-lg sm:text-xl font-semibold text-[#1CADA3]">Mutual Fund Onboarding</h2><p className="text-gray-600 text-sm">Complete all sections below</p></div>
          <button onClick={onClose}><X size={20} className="sm:w-6 sm:h-6 text-gray-700 hover:text-black" /></button>
        </div>

        <div className="flex-1 overflow-y-auto px-4 sm:px-6 py-4">
          <form onSubmit={submit} className="space-y-8">
            {/* Section 1 */}
            <div className="border-b pb-6">
              <h3 className={STYLES.header}>Section 1: Client Details</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6">
                <Field label="Client Full Name" val={form.clientName} fn={update} name="clientName" err={err.clientName} req />
                <Field label="Mobile Number" val={form.mobile} fn={update} name="mobile" err={err.mobile} type="tel" req />
                <Field label="Email Address" val={form.email} fn={update} name="email" err={err.email} type="email" req />
                <Field label="PAN Number" val={form.pan} fn={update} name="pan" err={err.pan} req cls="uppercase" />
                <Field label="Occupation" val={form.occupation} fn={update} name="occupation" err={err.occupation} type="select" opts={["Salaried","Self-Employed","Business","Professional","Retired","Student","Homemaker"]} req />
                <Field label="Annual Income" val={form.incomeRange} fn={update} name="incomeRange" err={err.incomeRange} type="select" opts={["0-5L","5-10L","10-20L","20-50L","50L+"]} req />
                <div className="md:col-span-2"><Field label="Mother's Name" val={form.mothersName} fn={update} name="mothersName" err={err.mothersName} req note="Required for KYC" /></div>
              </div>
            </div>

            {/* Section 2 */}
            <div className="border-b pb-6">
              <h3 className={STYLES.header}>Section 2: Nominee Details</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6">
                <Field label="Nominee Full Name" val={form.nomineeName} fn={update} name="nomineeName" err={err.nomineeName} req />
                <div>
                  <Field label="Date of Birth" val={form.nomineeDob} fn={update} name="nomineeDob" err={err.nomineeDob} type="date" max={new Date().toISOString().split('T')[0]} req />
                  {age !== null && <p className={`text-sm mt-1 font-medium ${isMinor ? 'text-amber-600' : 'text-green-600'}`}>Age: {age} years {isMinor && '(Minor)'}</p>}
                </div>
                <Field label="Relation with Client" val={form.nomineeRelation} fn={update} name="nomineeRelation" err={err.nomineeRelation} type="select" opts={["Spouse","Son","Daughter","Father","Mother","Brother","Sister","Other"]} req />
                <Field label="Nominee Mobile" val={form.nomineeMobile} fn={update} name="nomineeMobile" err={err.nomineeMobile} req={!isMinor} note={isMinor ? "Optional for minor" : ""} />
                <Field label="Nominee Email" val={form.nomineeEmail} fn={update} name="nomineeEmail" err={err.nomineeEmail} req={!isMinor} note={isMinor ? "Optional for minor" : ""} />
              </div>
              {isMinor && <div className="bg-amber-50 border-l-4 border-amber-500 p-4 mt-6 flex gap-2 text-amber-800 text-sm"><AlertCircle size={20} /><span>Nominee is a minor. Guardian details are mandatory.</span></div>}
            </div>

            {/* Section 3 (Guardian) */}
            {isMinor && (
              <div className="border-b pb-6">
                <h3 className={STYLES.header}>Section 3: Guardian Details <span className="text-sm font-normal text-gray-600">(Required)</span></h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6">
                  <Field label="Guardian Name" val={form.guardianName} fn={update} name="guardianName" err={err.guardianName} req />
                  <Field label="Guardian Mobile" val={form.guardianMobile} fn={update} name="guardianMobile" err={err.guardianMobile} req />
                  <Field label="Guardian Email" val={form.guardianEmail} fn={update} name="guardianEmail" err={err.guardianEmail} req />
                  <Field label="Relation (Client)" val={form.guardianRelationClient} fn={update} name="guardianRelationClient" err={err.guardianRelationClient} type="select" opts={["Father","Mother","Legal Guardian","Other"]} req />
                  <div className="md:col-span-2"><Field label="Relation (Nominee)" val={form.guardianRelationNominee} fn={update} name="guardianRelationNominee" err={err.guardianRelationNominee} type="select" opts={["Parent","Legal Guardian","Grandparent","Other"]} req /></div>
                </div>
              </div>
            )}

            {/* Section 4 (Investment) */}
            <div className="border-b pb-6">
              <h3 className={STYLES.header}>{isMinor ? 'Section 4' : 'Section 3'}: Investment Details</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6 mb-6">
                <div>
                  <label className={STYLES.label}>Investment Type <span className="text-red-500">*</span></label>
                  <div className="flex flex-wrap gap-4 mt-2">
                    {['sip', 'lumpsum', 'swp', 'stp'].map(t => (
                      <label key={t} className="flex items-center gap-2 cursor-pointer uppercase text-sm font-medium text-gray-700">
                        <input type="radio" checked={form.investmentType === t} onChange={() => update("investmentType", t)} className="accent-blue-500" /> {t}
                      </label>
                    ))}
                  </div>
                </div>
                <Field label="Total Amount (₹)" val={form.investmentAmount} fn={update} name="investmentAmount" err={err.investmentAmount} req icon="₹" />
                {form.investmentType === 'sip' && <Field label="SIP Date" val={form.sipDate} fn={update} name="sipDate" err={err.sipDate} req placeholder="Day (1-31)" note="Monthly deduction date" />}
              </div>

              {form.schemes.map((s, i) => (
                <div key={s.schemeId} className="grid grid-cols-1 md:grid-cols-2 gap-4 p-4 border rounded-lg mb-4 relative bg-gray-50/50">
                  <div className="md:col-span-2 flex justify-between font-medium text-gray-700">Scheme #{i + 1} {form.schemes.length > 1 && <button type="button" onClick={() => remScheme(s.schemeId)} className="text-red-500"><Trash2 size={16} /></button>}</div>
                  <Field label="Scheme Name" val={s.schemeName} onChange={(e:any) => modScheme(s.schemeId, "schemeName", e.target.value)} />
                  <Field label="Amount (₹)" val={s.schemeAmount} onChange={(e:any) => {
                     let val = e.target.value.replace(/[^0-9.]/g, '');
                     if ((val.match(/\./g) || []).length > 1) val = val.substring(0, val.lastIndexOf('.'));
                     modScheme(s.schemeId, "schemeAmount", val);
                  }} icon="₹" />
                </div>
              ))}
              <div className="flex justify-end"><button type="button" onClick={addScheme} className="flex items-center gap-2 text-[#1CADA3] hover:text-[#18998f] font-medium"><Plus size={18} /> Add Another Fund</button></div>
            </div>

            {/* Section 5 (Docs) */}
            <div>
              <h3 className={STYLES.header}>{isMinor ? 'Section 5' : 'Section 4'}: Document Upload</h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                <FileUploader field="clientPan" label="Client PAN Card" file={form.clientPan} setForm={setForm} err={err.clientPan} />
                <FileUploader field="clientAadhaar" label="Client Aadhaar Card" file={form.clientAadhaar} setForm={setForm} err={err.clientAadhaar} />
                <FileUploader field="cancelledCheque" label="Cancelled Cheque" file={form.cancelledCheque} setForm={setForm} err={err.cancelledCheque} />
                <FileUploader field="nomineePan" label="Nominee PAN Card" file={form.nomineePan} setForm={setForm} err={err.nomineePan} />
                {isMinor && <><FileUploader field="birthCertificate" label="Birth Certificate" file={form.birthCertificate} setForm={setForm} err={err.birthCertificate} /><FileUploader field="guardianPan" label="Guardian PAN Card" file={form.guardianPan} setForm={setForm} err={err.guardianPan} /></>}
              </div>
              <div className="bg-blue-50 border-l-4 border-blue-500 p-4 mt-6 text-blue-800 text-sm">Max size: <strong>180KB</strong>. Formats: PDF, JPG, PNG.</div>
            </div>
          </form>
        </div>

        <div className="border-t px-4 sm:px-6 py-4 flex justify-between">
          <button onClick={onClose} className="px-6 py-2 rounded-lg border hover:bg-gray-50 text-gray-700">Cancel</button>
          <button onClick={submit} className="px-6 py-2 rounded-lg bg-gradient-to-r from-[#2076C7] to-[#1CADA3] text-white hover:opacity-90">Submit Application</button>
        </div>
      </div>
    </div>
  );
}

// --- Reusable Components ---

function Field({ label, val, fn, name, onChange, err, type = "text", req, opts, icon, note, cls, max, placeholder }: any) {
  const handleChange = (e: any) => onChange ? onChange(e) : fn(name, e.target.value);
  return (
    <div className="flex flex-col w-full relative">
      <label className={STYLES.label}>{label} {req && <span className="text-red-500">*</span>} {note && <span className="text-sm font-normal text-gray-500 ml-2">({note})</span>}</label>
      <div className="relative">
        {icon && <div className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500">{icon}</div>}
        {type === "select" ? (
          <select value={val} onChange={handleChange} className={STYLES.input}><option value="">Select {label}</option>{opts.map((o: any) => <option key={o} value={o}>{o}</option>)}</select>
        ) : (
          <input type={type} value={val} onChange={handleChange} className={`${STYLES.input} ${icon ? 'pl-10' : ''} ${cls}`} placeholder={placeholder || `Enter ${label}`} max={max} />
        )}
      </div>
      {err && <p className={STYLES.err}><AlertCircle size={14} /> {err}</p>}
    </div>
  );
}

function FileUploader({ field, label, file, setForm, err }: any) {
  const handle = (e: any) => {
    const f = e.target.files?.[0];
    if (f) f.size <= 180 * 1024 ? setForm((p: any) => ({ ...p, [field]: f })) : alert('File size must be less than 180KB');
  };
  return (
    <div className="space-y-2">
      <label className={STYLES.label}>{label} <span className="text-red-500">*</span></label>
      <div className="border-2 border-dashed border-gray-300 rounded-lg p-4 hover:border-[#1CADA3] transition-colors">
        {file ? (
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3"><div className="bg-blue-50 p-2 rounded"><Upload className="text-blue-500" size={20} /></div><div><p className="font-medium text-gray-700 truncate max-w-[150px]">{file.name}</p><p className="text-gray-500 text-sm">{(file.size / 1024).toFixed(2)} KB</p></div></div>
            <button type="button" onClick={() => setForm((p: any) => ({ ...p, [field]: null }))} className="text-red-500 text-sm">Remove</button>
          </div>
        ) : (
          <label className="cursor-pointer block text-center"><input type="file" className="hidden" onChange={handle} accept=".pdf,.jpg,.png" /><Upload className="mx-auto text-gray-400 mb-2" size={24} /><p className="text-gray-700 font-medium">Click to upload</p><p className="text-gray-500 text-sm">PDF, JPG, PNG up to 180KB</p></label>
        )}
      </div>
      {err && <p className={STYLES.err}><AlertCircle size={14} /> {err}</p>}
    </div>
  );
}