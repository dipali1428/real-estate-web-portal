"use client";

import React, { useState, useMemo, useEffect } from "react";
import { useParams, useRouter, useSearchParams } from "next/navigation";
import Image from "next/image";
import {
  ArrowLeft,
  ShieldCheck,
  CheckCircle2,
  Percent,
  IndianRupee,
  Shield,
  FileText,
  Car,
  Bike,
  Truck,
  HelpCircle,
  Wrench,
  Cpu,
  Coins,
  Key,
  Flame,
  AlertOctagon,
  Sparkles,
  HeartHandshake
} from "lucide-react";
import {
  companiesData,
  bikeCCSegments,
  carCCSegments,
  commercialGVWSegments,
  miscCCSegments
} from "@/app/products/motor-insurance/components/insuranceData";
import MotorInsuranceForm from "@/app/dashboard/leadmanagement/forms/motorinsuranceform";

// Custom interface for add-ons
interface AddOnOption {
  id: string;
  name: string;
  desc: string;
  icon: React.ElementType;
  prices: Record<string, number>;
}

const ADD_ONS: AddOnOption[] = [
  {
    id: "zero-dep",
    name: "Zero Depreciation",
    desc: "100% claim payout on plastic, glass, and rubber parts replacements.",
    icon: Shield,
    prices: { bike: 249, car: 1499, commercial: 3499, misc: 4499 }
  },
  {
    id: "rsa",
    name: "Roadside Assistance",
    desc: "24/7 towing, minor repairs, flat tire assistance, and emergency fuel support.",
    icon: Wrench,
    prices: { bike: 99, car: 499, commercial: 999, misc: 1499 }
  },
  {
    id: "engine-protect",
    name: "Engine Protection",
    desc: "Covers repair or replacement cost for hydrostatic lock or water ingression damages.",
    icon: Cpu,
    prices: { bike: 199, car: 999, commercial: 1999, misc: 2499 }
  },
  {
    id: "consumables",
    name: "Consumables Cover",
    desc: "Covers costs of engine oil, nuts, bolts, washers, and other disposable materials.",
    icon: Coins,
    prices: { bike: 79, car: 299, commercial: 799, misc: 999 }
  },
  {
    id: "key-replacement",
    name: "Key Replacement",
    desc: "Financial reimbursement for replacing lost keys and locking cylinder assemblies.",
    icon: Key,
    prices: { bike: 49, car: 199, commercial: 399, misc: 499 }
  }
];

// Dynamic highlights mapping
const INSURER_DETAILS: Record<string, { garages: string; csr: string; phone: string }> = {
  "tata-aig": { garages: "6,500+", csr: "99.00%", phone: "1800-266-7780" },
  "bajaj-allianz": { garages: "7,200+", csr: "98.48%", phone: "1800-209-5858" },
  "digit": { garages: "5,800+", csr: "97.40%", phone: "1800-258-5956" },
  "royal-sundaram": { garages: "4,600+", csr: "96.80%", phone: "1860-425-0000" },
  "chola-ms": { garages: "5,100+", csr: "97.20%", phone: "1800-208-9100" },
  "shriram-general": { garages: "3,900+", csr: "95.50%", phone: "1800-300-30000" },
  "zuno": { garages: "3,500+", csr: "94.80%", phone: "1800-120-00" },
  "iffco-tokio": { garages: "6,000+", csr: "98.20%", phone: "1800-103-5499" },
  "magma-hdi": { garages: "4,200+", csr: "96.00%", phone: "1800-266-3202" },
  "sbi-general": { garages: "5,500+", csr: "97.00%", phone: "1800-102-1111" },
  "universal-sompo": { garages: "4,000+", csr: "96.30%", phone: "1800-22-4030" }
};

export default function QuoteDetailPage() {
  const params = useParams();
  const router = useRouter();
  const searchParams = useSearchParams();

  const companyId = params?.companyId as string;
  const company = companiesData.find((c) => c.id === companyId);

  // Search parameters for configuration
  const vehicleType = searchParams?.get("vehicleType") || "car";
  const planType = searchParams?.get("planType") || "comprehensive";
  const cc = searchParams?.get("cc") || "";
  const idv = Number(searchParams?.get("idv")) || 300000;

  // Add-ons selected state
  const [selectedAddOns, setSelectedAddOns] = useState<string[]>([]);
  const [isFormOpen, setIsFormOpen] = useState(false);

  // Scroll to top on mount
  useEffect(() => {
    window.scrollTo({ top: 0, left: 0, behavior: "instant" as any });
  }, []);

  // Sync active CC segments for calculations
  const ccLabel = useMemo(() => {
    let seg: any = null;
    if (vehicleType === "bike") seg = bikeCCSegments.find(s => s.id === cc);
    else if (vehicleType === "car") seg = carCCSegments.find(s => s.id === cc);
    else if (vehicleType === "commercial") seg = commercialGVWSegments.find(s => s.id === cc);
    else if (vehicleType === "misc") seg = miscCCSegments.find(s => s.id === cc);
    return seg ? seg.label : cc;
  }, [vehicleType, cc]);

  // Calculate Base Premium (Exactly like comparison component)
  const basePremium = useMemo(() => {
    if (!company) return 0;
    const currentPrices = company.prices[vehicleType as keyof typeof company.prices];
    if (!currentPrices) return 0;

    const basePrice = currentPrices[planType as keyof typeof currentPrices];
    if (basePrice === undefined) return 0;

    let price = 0;

    if ((vehicleType === "car" || vehicleType === "commercial" || vehicleType === "misc") && (planType === "comprehensive" || planType === "ownDamage")) {
      if (vehicleType === "misc" && planType === "comprehensive") {
        if (idv === 1200000) price = 48625;
        else if (idv === 1500000) price = 55705;
        else if (idv === 1800000) price = 62785;
        else price = Math.round((20305 + idv * 0.03) * 1.18);
      } else if (vehicleType === "misc" && planType === "ownDamage") {
        price = Math.round((idv * 0.03) * 1.18);
      } else if (vehicleType === "commercial" && planType === "comprehensive") {
        if (cc === "upto-7500") price = 24049;
        else if (cc === "7501-12000") price = 42186;
        else if (cc === "12001-20000") price = 60313;
        else if (cc === "20001-40000") price = 78950;
        else if (cc === "above-40000") price = 89242;
        else price = 24049;
      } else {
        let tp = 0;
        if (planType === "comprehensive") {
          if (vehicleType === "car") {
            if (cc === "upto-1000") tp = 2094;
            else if (cc === "1001-1500") tp = 3416;
            else if (cc === "above-1500") tp = 7897;
          } else if (vehicleType === "commercial") {
            const gvw = commercialGVWSegments.find(s => s.id === cc);
            tp = gvw ? gvw.baseTP : 16049;
          }
        }
        const od = idv * 0.03;
        price = Math.round((tp + od) * 1.18);
      }
    } else if (vehicleType === "commercial" && planType === "thirdParty") {
      const gvw = commercialGVWSegments.find(s => s.id === cc);
      price = gvw ? gvw.baseTP : 16049;
    } else if (vehicleType === "misc" && planType === "thirdParty") {
      price = 20305;
    } else {
      const ccSegments = vehicleType === "bike" ? bikeCCSegments : (vehicleType === "car" ? carCCSegments : []);
      const factor = (ccSegments.length > 0 && cc) ? (ccSegments.find(s => s.id === cc)?.factor || 1.0) : 1.0;
      price = Math.round(basePrice * factor);
    }

    return price;
  }, [company, vehicleType, planType, cc, idv]);

  // Dynamic values based on selected add-ons
  const addOnsTotal = useMemo(() => {
    return selectedAddOns.reduce((total, id) => {
      const addOn = ADD_ONS.find(a => a.id === id);
      if (addOn) {
        const price = addOn.prices[vehicleType] || 0;
        return total + price;
      }
      return total;
    }, 0);
  }, [selectedAddOns, vehicleType]);

  const subTotal = basePremium + addOnsTotal;
  const gstAmount = Math.round(subTotal * 0.18);
  const grandTotal = subTotal + gstAmount;

  // Selected vehicle details info
  const vehicleInfo = useMemo(() => {
    const iconMap: Record<string, React.ElementType> = {
      bike: Bike,
      car: Car,
      commercial: Truck,
      misc: HelpCircle
    };
    const labelMap: Record<string, string> = {
      bike: "Two Wheeler",
      car: "Four Wheeler / Car",
      commercial: "Commercial Vehicle",
      misc: "Special Purpose / Miscellaneous"
    };

    return {
      Icon: iconMap[vehicleType] || Car,
      label: labelMap[vehicleType] || "Car"
    };
  }, [vehicleType]);

  // Static company meta (avoids undefined errors)
  const meta = useMemo(() => {
    return INSURER_DETAILS[companyId] || { garages: "4,500+", csr: "95.00%", phone: "1800-100-200" };
  }, [companyId]);

  if (!company) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen bg-slate-50 p-4">
        <div className="bg-white p-10 rounded-[2rem] shadow-xl border border-slate-100 text-center max-w-md">
          <AlertOctagon size={48} className="text-red-500 mx-auto mb-4" />
          <h1 className="text-2xl font-black text-slate-800 mb-2">Quote Not Found</h1>
          <p className="text-slate-500 text-sm mb-6">The insurer quote could not be loaded. It might have expired or the link is invalid.</p>
          <button
            onClick={() => router.back()}
            className="w-full py-4 bg-gradient-to-r from-[#2076C7] to-[#1CADA3] text-white rounded-xl font-bold transition shadow-lg shadow-blue-500/20 active:scale-95"
          >
            Go Back
          </button>
        </div>
      </div>
    );
  }

  // Toggle add-on selection
  const handleToggleAddOn = (id: string) => {
    setSelectedAddOns(prev =>
      prev.includes(id) ? prev.filter(x => x !== id) : [...prev, id]
    );
  };

  return (
    <div className="min-h-screen bg-[#F8FAFC] py-8 px-4 flex flex-col items-center font-sans leading-relaxed">
      
      {/* Container wrapper */}
      <div className="w-full max-w-6xl flex flex-col gap-6">
        
        {/* Navigation & Header */}
        <div className="flex items-center justify-between">
          <button
            onClick={() => router.back()}
            className="flex items-center gap-2 px-4 py-2 text-xs font-black uppercase tracking-wider text-slate-500 bg-white border border-slate-200/60 rounded-xl hover:bg-slate-50 hover:text-slate-700 transition shadow-sm active:scale-95"
          >
            <ArrowLeft size={14} strokeWidth={2.5} />
            Back to Quotes
          </button>

          <div className="flex items-center gap-1.5 text-emerald-600 text-[10px] font-black uppercase tracking-widest bg-emerald-50 px-3 py-1.5 rounded-xl border border-emerald-100 shadow-inner">
            <CheckCircle2 size={13} strokeWidth={2.5} />
            Verified Quote
          </div>
        </div>

        {/* Brand Banner Card */}
        <div className="bg-white border border-slate-100 rounded-3xl p-4 md:p-5 shadow-xl shadow-slate-200/30 relative overflow-hidden">
          
          {/* Subtle brand background gradient glow */}
          <div className="absolute top-0 right-0 w-80 h-80 bg-gradient-to-bl from-blue-50/40 to-teal-50/20 rounded-full blur-3xl -mr-16 -mt-16 pointer-events-none" />

          {/* Left Brand Details */}
          <div className="flex items-center gap-4 relative z-10">
            <div className="w-12 h-12 md:w-16 md:h-16 bg-slate-50 border border-slate-100 rounded-xl flex items-center justify-center p-2 shadow-inner overflow-hidden">
              {company.logo ? (
                <Image
                  src={company.logo}
                  alt={company.name}
                  width={64}
                  height={64}
                  className="h-full w-full object-contain mix-blend-multiply"
                  onError={(e) => {
                    (e.target as HTMLImageElement).src = `https://ui-avatars.com/api/?name=${company.name}&background=f0f9ff&color=2076C7&bold=true`;
                  }}
                />
              ) : (
                <span className="font-bold text-[#2076C7] text-xl uppercase">{company.name.substring(0, 2)}</span>
              )}
            </div>

            <div className="text-left">
              <div className="flex flex-wrap items-center gap-2.5">
                <h1 className="text-lg md:text-xl font-black text-slate-800 tracking-tight leading-none uppercase">{company.name}</h1>
                <span className="px-2 py-0.5 bg-blue-50 text-[#2076C7] border border-blue-100 rounded-md text-[9px] font-black uppercase tracking-widest leading-none">
                  {planType === "comprehensive" ? "COMPREHENSIVE" : planType === "thirdParty" ? "THIRD PARTY" : "OWN DAMAGE"}
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Main Grid: Left Side Configuration & Add-ons, Right Side Sticky Summary Card */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 items-start">
          
          {/* Left Column (Span 2) */}
          <div className="lg:col-span-2 flex flex-col gap-6 text-left">
            
            {/* Section 1: Configuration Selected */}
            <div className="bg-white border border-slate-100 rounded-[2rem] p-6 shadow-md shadow-slate-200/20">
              <h2 className="text-sm font-black text-slate-800 uppercase tracking-wider mb-4 flex items-center gap-2">
                <Sparkles size={16} className="text-[#1CADA3]" />
                Plan Configuration
              </h2>

              <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                <div className="bg-slate-50 p-4 rounded-xl border border-slate-100">
                  <div className="flex items-center gap-1.5 mb-1.5 text-slate-400">
                    <vehicleInfo.Icon size={14} />
                    <span className="text-[8px] font-black uppercase tracking-wider">Vehicle</span>
                  </div>
                  <p className="text-xs font-black text-slate-700 truncate">{vehicleInfo.label}</p>
                </div>

                <div className="bg-slate-50 p-4 rounded-xl border border-slate-100">
                  <div className="flex items-center gap-1.5 mb-1.5 text-slate-400">
                    <Percent size={14} />
                    <span className="text-[8px] font-black uppercase tracking-wider">Engine Cap / GVW</span>
                  </div>
                  <p className="text-xs font-black text-slate-700 truncate">{ccLabel || "N/A"}</p>
                </div>

                <div className="bg-slate-50 p-4 rounded-xl border border-slate-100">
                  <div className="flex items-center gap-1.5 mb-1.5 text-slate-400">
                    <ShieldCheck size={14} />
                    <span className="text-[8px] font-black uppercase tracking-wider">Plan Coverage</span>
                  </div>
                  <p className="text-xs font-black text-slate-700 capitalize">{planType === "thirdParty" ? "Third Party Only" : planType === "ownDamage" ? "Own Damage Only" : "Comprehensive Cover"}</p>
                </div>

                <div className="bg-slate-50 p-4 rounded-xl border border-slate-100">
                  <div className="flex items-center gap-1.5 mb-1.5 text-slate-400">
                    <IndianRupee size={14} />
                    <span className="text-[8px] font-black uppercase tracking-wider">Declared IDV</span>
                  </div>
                  <p className="text-xs font-black text-[#2076C7] truncate">
                    {planType === "thirdParty" ? "No IDV (TP Only)" : `₹ ${idv.toLocaleString("en-IN")}`}
                  </p>
                </div>
              </div>
            </div>

            {/* Section 2: Interactive Add-ons Selector */}
            <div className="bg-white border border-slate-100 rounded-[2rem] p-6 shadow-md shadow-slate-200/20">
              <div className="flex items-center justify-between mb-2">
                <h2 className="text-sm font-black text-slate-800 uppercase tracking-wider flex items-center gap-2">
                  <Shield size={16} className="text-[#2076C7]" />
                  Interactive Add-On Covers
                </h2>
                <span className="px-2.5 py-1 bg-teal-50 text-[#1CADA3] text-[9px] font-black rounded-lg border border-teal-100">
                  {selectedAddOns.length} Selected
                </span>
              </div>
              <p className="text-slate-500 text-xs font-medium mb-6">
                Enhance your base coverage by opting for interactive smart riders below. Premium updates instantly on selection.
              </p>

              <div className="flex flex-col gap-3">
                {ADD_ONS.map((addOn) => {
                  const price = addOn.prices[vehicleType] || 0;
                  const isChecked = selectedAddOns.includes(addOn.id);
                  const Icon = addOn.icon;

                  return (
                    <div
                      key={addOn.id}
                      onClick={() => handleToggleAddOn(addOn.id)}
                      className={`group border rounded-2xl p-4 flex items-center justify-between gap-4 cursor-pointer transition-all ${
                        isChecked
                          ? "border-[#2076C7]/60 bg-blue-50/20 shadow-md"
                          : "border-slate-100 bg-white hover:border-slate-200 hover:shadow-sm"
                      }`}
                    >
                      <div className="flex items-start gap-4">
                        <div className={`p-2.5 rounded-xl flex items-center justify-center shrink-0 transition-transform group-hover:scale-105 ${
                          isChecked
                            ? "bg-[#2076C7] text-white"
                            : "bg-slate-50 text-slate-400 group-hover:text-slate-600"
                        }`}>
                          <Icon size={18} />
                        </div>
                        <div>
                          <h3 className="text-xs font-black text-slate-800 uppercase tracking-tight mb-1">{addOn.name}</h3>
                          <p className="text-[11px] text-slate-400 font-semibold leading-relaxed max-w-md">{addOn.desc}</p>
                        </div>
                      </div>

                      <div className="flex items-center gap-3 shrink-0">
                        <p className={`text-xs font-black ${isChecked ? "text-[#2076C7]" : "text-slate-600"}`}>
                          + ₹ {price.toLocaleString("en-IN")}
                        </p>
                        <div className={`w-5 h-5 rounded-md border flex items-center justify-center transition-colors ${
                          isChecked
                            ? "bg-[#1CADA3] border-[#1CADA3] text-white"
                            : "border-slate-300 bg-white"
                        }`}>
                          {isChecked && <CheckCircle2 size={13} strokeWidth={3} className="text-white" />}
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Claims Filing Process */}
            <div className="bg-white border border-slate-100 rounded-[2rem] p-6 shadow-md shadow-slate-200/20">
              <h2 className="text-sm font-black text-slate-800 uppercase tracking-wider mb-2 flex items-center gap-2">
                <HeartHandshake size={16} className="text-[#1CADA3]" />
                Seamless Claims Process
              </h2>
              <p className="text-slate-500 text-xs font-medium mb-6">
                Registering and settling a claim is fully digital and completed in 3 simple steps.
              </p>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 relative">
                {[
                  {
                    step: "01",
                    title: "Intimate Claim",
                    desc: "Call the customer helpline or register a claim directly through the mobile app within 24 hours of occurrence.",
                    accent: "border-sky-100 bg-sky-50/30 text-sky-600"
                  },
                  {
                    step: "02",
                    title: "Instant Survey",
                    desc: "Upload photos or video of damage. A digital surveyor will review and approve the claim details within 3-4 hours.",
                    accent: "border-teal-100 bg-teal-50/30 text-teal-600"
                  },
                  {
                    step: "03",
                    title: "Cashless Repair",
                    desc: "Tow your vehicle to any network garage. Repair is fully cashless, with the insurer settling directly.",
                    accent: "border-indigo-100 bg-indigo-50/30 text-indigo-600"
                  }
                ].map((item, idx) => (
                  <div key={idx} className="relative bg-slate-50/50 border border-slate-100 rounded-2xl p-5 text-left flex flex-col justify-between h-full">
                    {/* Visual Connector Line */}
                    {idx < 2 && (
                      <div className="hidden md:block absolute top-1/2 -right-3 w-6 h-0.5 bg-slate-200 z-10" />
                    )}
                    <div>
                      <span className={`w-8 h-8 rounded-lg border font-black text-xs flex items-center justify-center mb-4 ${item.accent}`}>
                        {item.step}
                      </span>
                      <h3 className="text-xs font-black text-slate-800 uppercase tracking-tight mb-2">{item.title}</h3>
                      <p className="text-[11px] text-slate-400 font-semibold leading-relaxed">{item.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Documents Required */}
            <div className="bg-white border border-slate-100 rounded-[2rem] p-6 shadow-md shadow-slate-200/20">
              <h2 className="text-sm font-black text-slate-800 uppercase tracking-wider mb-4 flex items-center gap-2">
                <FileText size={16} className="text-amber-500" />
                Required Documents
              </h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {[
                  "Vehicle Registration Certificate (RC Copy)",
                  "Valid Driving License of owner-driver",
                  "Previous Year Policy document (For Renewals)",
                  "Aadhaar or Passport for KYC verification"
                ].map((doc, idx) => (
                  <div key={idx} className="bg-slate-50 p-4 rounded-xl border border-slate-100 flex items-center gap-3">
                    <div className="w-8 h-8 rounded-lg bg-amber-50 flex items-center justify-center text-amber-500 shrink-0 shadow-sm border border-amber-100">
                      <FileText size={14} />
                    </div>
                    <span className="text-xs font-semibold text-slate-700 leading-tight">{doc}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Right Column (Sticky Premium Summary) */}
          <div className="lg:sticky lg:top-8 flex flex-col gap-6">
            
            {/* Core Summary Card */}
            <div className="bg-white border border-slate-200 rounded-[2rem] p-6 shadow-xl shadow-slate-200/40 text-left relative overflow-hidden">
              <div className="absolute top-0 right-0 w-24 h-24 bg-gradient-to-bl from-[#2076C7]/5 to-[#1CADA3]/5 rounded-bl-full pointer-events-none" />

              <h2 className="text-sm font-black text-slate-800 uppercase tracking-wider mb-6 flex items-center gap-2 border-b border-slate-100 pb-3">
                <HeartHandshake size={16} className="text-[#2076C7]" />
                Premium Summary
              </h2>

              <div className="space-y-4 mb-6">
                <div className="flex justify-between items-center text-xs font-bold text-slate-400 uppercase tracking-wider">
                  <span>Base Plan Premium</span>
                  <span className="text-slate-700">₹ {basePremium.toLocaleString("en-IN")}</span>
                </div>

                {selectedAddOns.length > 0 && (
                  <div className="flex justify-between items-start text-xs font-bold text-slate-400 uppercase tracking-wider border-t border-slate-50 pt-3">
                    <div className="flex flex-col">
                      <span>Riders / Add-ons</span>
                      <span className="text-[10px] text-slate-400 font-semibold lowercase italic">
                        ({selectedAddOns.length} covers active)
                      </span>
                    </div>
                    <span className="text-[#2076C7] font-black">+ ₹ {addOnsTotal.toLocaleString("en-IN")}</span>
                  </div>
                )}

                <div className="flex justify-between items-center text-xs font-bold text-slate-400 uppercase tracking-wider border-t border-slate-50 pt-3">
                  <span>Subtotal</span>
                  <span className="text-slate-700 font-bold">₹ {subTotal.toLocaleString("en-IN")}</span>
                </div>

                <div className="flex justify-between items-center text-xs font-bold text-slate-400 uppercase tracking-wider border-t border-slate-50 pt-3">
                  <span>GST Taxes (18%)</span>
                  <span className="text-slate-600 font-bold">₹ {gstAmount.toLocaleString("en-IN")}</span>
                </div>

                <div className="border-t-2 border-dashed border-slate-200 pt-4 flex justify-between items-end">
                  <div>
                    <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest leading-none mb-1">Total Payable</p>
                    <p className="text-[10px] text-slate-400 font-bold italic leading-none">Ind. of GST & Add-ons</p>
                  </div>
                  <p className="text-[#1C2024] font-bold text-2xl leading-none text-right flex items-end gap-1">
                    ₹ {grandTotal.toLocaleString("en-IN")}
                    <span className="text-xs font-semibold text-slate-400 leading-none mb-0.5">/yr</span>
                  </p>
                </div>
              </div>

              {/* Action Apply Button */}
              <button
                onClick={() => setIsFormOpen(true)}
                className="w-full bg-gradient-to-r from-[#2076C7] to-[#1CADA3] text-white py-4 rounded-2xl font-black text-xs uppercase tracking-[0.2em] hover:shadow-lg hover:opacity-95 transition-all flex items-center justify-center gap-2 shadow-md shadow-blue-500/10 active:scale-95 cursor-pointer mb-5"
              >
                Buy Policy Now
                <Sparkles size={14} className="text-white" />
              </button>

              <p className="text-[9px] text-slate-400 font-semibold text-center leading-relaxed italic border-t border-slate-50 pt-4">
                * Prices are indicative and calculated instantly. Terms, conditions, and actual premium details are subject to complete underwriting rules and documentation verification.
              </p>
            </div>

            {/* Helpline Assistance */}
            <div className="bg-[#2076C7]/5 border border-blue-100 rounded-[2.5rem] p-6 text-left flex items-start gap-4">
              <div className="w-10 h-10 rounded-xl bg-white flex items-center justify-center shadow-md shrink-0 border border-blue-100/60">
                <Flame size={20} className="text-[#2076C7] animate-pulse" />
              </div>
              <div>
                <h3 className="text-xs font-black text-slate-800 uppercase tracking-tight mb-1"> Helplines & Assistance</h3>
                <p className="text-[11px] text-slate-500 font-semibold leading-relaxed mb-2">
                  Need expert guidance? Talk to {company.name} customer service team directly.
                </p>
                <a href={`tel:${meta.phone}`} className="text-xs font-black text-[#2076C7] hover:underline">
                  {meta.phone}
                </a>
              </div>
            </div>

          </div>

        </div>

      </div>

      {/* Interactive Motor Insurance Form Modal Overlay */}
      {isFormOpen && (
        <MotorInsuranceForm
          onClose={() => setIsFormOpen(false)}
        />
      )}

    </div>
  );
}
