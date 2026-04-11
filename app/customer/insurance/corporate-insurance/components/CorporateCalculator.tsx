"use client";

import React, { useState, useEffect } from "react";
import {
  IconShieldCheck,
  IconInfoCircle,
  IconPlus,
  IconMinus,
  IconFlame,
  IconShield,
  IconScale,
} from "@tabler/icons-react";
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip } from "recharts";

// --- DATA ---
const BUSINESS_TYPES = [
  { id: "office", name: "Office / IT / Consulting", riskRate: 0.0005 },
  { id: "shop", name: "Retail Shop / Showroom", riskRate: 0.0015 },
  { id: "warehouse", name: "Warehouse / Godown", riskRate: 0.0025 },
  { id: "factory", name: "Factory / Manufacturing", riskRate: 0.0035 },
  { id: "restaurant", name: "Restaurant / Hotel", riskRate: 0.002 },
];

const LIABILITY_TIERS = [
  { label: "Up to ₹50 Lakhs", premium: 2500 },
  { label: "₹50L - ₹2 Cr", premium: 5000 },
  { label: "₹2 Cr - ₹10 Cr", premium: 12000 },
  { label: "Over ₹10 Cr", premium: 25000 },
];

export default function CorporateCalculator() {
  const [mode, setMode] = useState<"gmc" | "package">("gmc");

  // GMC State
  const [employees, setEmployees] = useState(100);
  const [avgAge, setAvgAge] = useState("26-30");
  const [industry, setIndustry] = useState("IT");
  const [sumInsured, setSumInsured] = useState(300000);

  // Package State
  const [businessType, setBusinessType] = useState(BUSINESS_TYPES[0]);
  const [turnover, setTurnover] = useState(LIABILITY_TIERS[0]);
  const [assetValue, setAssetValue] = useState(1000000);
  const [covers, setCovers] = useState({ fire: true, burglary: true, liability: false });

  const [premium, setPremium] = useState(0);
  const [breakdown, setBreakdown] = useState<any[]>([]);

  useEffect(() => {
    let basePremium = 0;
    let items = [];

    if (mode === "gmc") {
      let baseRate = 2500;
      const ageMultipliers: Record<string, number> = {
        "20-25": 0.85, "26-30": 1.0, "31-35": 1.15, "36-40": 1.3,
        "41-45": 1.55, "46-50": 1.8, "51-55": 2.0, "55+": 2.22,
      };
      const industryMultipliers: Record<string, number> = {
        IT: 0.9, Manufacturing: 1.3, Healthcare: 1.2,
        Retail: 1.0, Finance: 1.1, Other: 1.15,
      };

      baseRate *= ageMultipliers[avgAge] ?? 1;
      baseRate *= industryMultipliers[industry] ?? 1;

      if (sumInsured === 500000) baseRate *= 1.45;
      if (sumInsured === 1000000) baseRate *= 2.4;

      if (employees > 500) baseRate *= 0.8;
      else if (employees > 100) baseRate *= 0.85;
      else if (employees > 50) baseRate *= 0.9;

      basePremium = Math.round(baseRate * employees);

      items = [
        { name: "Base Medical", value: basePremium * 0.8 },
        { name: "Support Add-ons", value: basePremium * 0.2 },
      ];
    } else {
      const fire = covers.fire ? assetValue * businessType.riskRate : 0;
      const burglary = covers.burglary ? assetValue * 0.001 : 0;
      const liability = covers.liability ? turnover.premium : 0;
      basePremium = Math.round(fire + burglary + liability);
      items = [
        { name: "Fire Cover", value: fire },
        { name: "Burglary", value: burglary },
        { name: "Liability", value: liability },
      ].filter(i => i.value > 0);
    }

    const gst = Math.round(basePremium * 0.18);
    setPremium(basePremium + gst);
    setBreakdown([...items, { name: "GST (18%)", value: gst }]);
  }, [mode, employees, avgAge, industry, sumInsured, businessType, turnover, assetValue, covers]);

  const fmt = (n: number) => `₹${new Intl.NumberFormat("en-IN").format(Math.round(n))}`;
  const COLORS = ["#2076C7", "#1CADA3", "#0284c7", "#94a3b8"];

  return (
    <div className="w-full font-sans">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
        
        {/* --- LEFT: INPUTS --- */}
        <div className="space-y-8 lg:pr-8 lg:border-r border-slate-100">
          <div>
  
            
            {/* Mode Toggle */}
            <div className="inline-flex p-1 bg-slate-100 rounded-xl mb-6">
              <button 
                onClick={() => setMode("gmc")}
                className={`px-4 py-2 rounded-lg text-[10px] font-bold uppercase tracking-wider transition-all ${mode === "gmc" ? "bg-white text-[#2076C7] shadow-sm" : "text-slate-400"}`}
              >
                Group Health
              </button>
              <button 
                onClick={() => setMode("package")}
                className={`px-4 py-2 rounded-lg text-[10px] font-bold uppercase tracking-wider transition-all ${mode === "package" ? "bg-white text-[#2076C7] shadow-sm" : "text-slate-400"}`}
              >
                SME Asset Pack
              </button>
            </div>
            <h2 className="text-3xl font-extrabold text-slate-800 tracking-tight">
              {mode === "gmc" ? "GMC Premium Estimator" : "Business Asset Protection"}
            </h2>
          </div>

          <div className="space-y-8">
            {mode === "gmc" ? (
              <>
                {/* Employee Count */}
                <div className="space-y-4">
                  <div className="flex justify-between items-end">
                    <label className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Team Size</label>
                    <span className="text-lg font-extrabold text-[#2076C7]">{employees} Members</span>
                  </div>
                  <input
                    type="range" min="10" max="500" step="5" value={employees}
                    onChange={(e) => setEmployees(Number(e.target.value))}
                    className="w-full h-1.5 rounded-lg appearance-none bg-slate-100 accent-[#2076C7]"
                  />
                  <div className="flex gap-2">
                    <button onClick={() => setEmployees(v => Math.max(10, v - 5))} className="p-2 border rounded-lg hover:bg-slate-50"><IconMinus size={14}/></button>
                    <div className="flex-grow text-center py-1.5 bg-slate-50 border rounded-lg font-bold text-slate-600">{employees}</div>
                    <button onClick={() => setEmployees(v => Math.min(500, v + 5))} className="p-2 border rounded-lg hover:bg-slate-50"><IconPlus size={14}/></button>
                  </div>
                </div>

                {/* Age Bands & Industry Grid */}
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-3">
                    <label className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Average Age</label>
                    <select
                      value={avgAge}
                      onChange={(e) => setAvgAge(e.target.value)}
                      className="w-full p-3 bg-slate-50 border border-slate-200 rounded-xl text-xs font-bold text-slate-700 focus:ring-2 focus:ring-[#2076C7]/20 outline-none"
                    >
                      <option value="20-25">20 – 25 Yrs</option>
                      <option value="26-30">26 – 30 Yrs</option>
                      <option value="31-35">31 – 35 Yrs</option>
                      <option value="36-40">36 – 40 Yrs</option>
                      <option value="41-45">41 – 45 Yrs</option>
                      <option value="46-50">46 – 50 Yrs</option>
                      <option value="51-55">51 – 55 Yrs</option>
                      <option value="55+">55+ Yrs</option>
                    </select>
                  </div>
                  <div className="space-y-3">
                    <label className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Industry Type</label>
                    <select
                      value={industry}
                      onChange={(e) => setIndustry(e.target.value)}
                      className="w-full p-3 bg-slate-50 border border-slate-200 rounded-xl text-xs font-bold text-slate-700 focus:ring-2 focus:ring-[#2076C7]/20 outline-none"
                    >
                      <option value="IT">IT / Software</option>
                      <option value="Manufacturing">Manufacturing</option>
                      <option value="Healthcare">Healthcare</option>
                      <option value="Retail">Retail</option>
                      <option value="Finance">Finance / Bankers</option>
                      <option value="Other">Other / Services</option>
                    </select>
                  </div>
                </div>

                {/* Sum Insured */}
                <div className="space-y-3">
                  <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Individual Coverage</label>
                  <select
                    value={sumInsured}
                    onChange={(e) => setSumInsured(Number(e.target.value))}
                    className="w-full p-3 bg-slate-50 border border-slate-200 rounded-xl text-xs font-black text-slate-700 focus:ring-2 focus:ring-[#2076C7]/20 outline-none"
                  >
                    <option value={200000}>₹2 Lakhs</option>
                    <option value={300000}>₹3 Lakhs</option>
                    <option value={500000}>₹5 Lakhs</option>
                    <option value={1000000}>₹10 Lakhs</option>
                  </select>
                </div>
              </>
            ) : (
              <>
                {/* Asset Value */}
                <div className="space-y-4">
                  <div className="flex justify-between items-end">
                    <label className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Total Asset Value</label>
                    <span className="text-lg font-extrabold text-[#2076C7]">{fmt(assetValue)}</span>
                  </div>
                  <input
                    type="range" min="500000" max="50000000" step="500000" value={assetValue}
                    onChange={(e) => setAssetValue(Number(e.target.value))}
                    className="w-full h-1.5 rounded-lg appearance-none bg-slate-100 accent-[#2076C7]"
                  />
                  <div className="flex gap-2">
                    <button onClick={() => setAssetValue(v => Math.max(500000, v - 500000))} className="p-2 border rounded-lg hover:bg-slate-50"><IconMinus size={14}/></button>
                    <div className="flex-grow text-center py-1.5 bg-slate-50 border rounded-lg font-bold text-slate-600">{assetValue.toLocaleString()}</div>
                    <button onClick={() => setAssetValue(v => Math.min(50000000, v + 500000))} className="p-2 border rounded-lg hover:bg-slate-50"><IconPlus size={14}/></button>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  {/* Operations Type */}
                  <div className="space-y-3">
                    <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Industry Class</label>
                    <select
                      value={businessType.id}
                      onChange={(e) => setBusinessType(BUSINESS_TYPES.find(b => b.id === e.target.value)!)}
                      className="w-full p-3 bg-slate-50 border border-slate-200 rounded-xl text-xs font-black text-slate-700 focus:ring-2 focus:ring-[#2076C7]/20 outline-none"
                    >
                      {BUSINESS_TYPES.map(type => <option key={type.id} value={type.id}>{type.name}</option>)}
                    </select>
                  </div>
                  {/* Turnover */}
                  <div className="space-y-3">
                    <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Annual Turnover</label>
                    <select
                      value={turnover.label}
                      onChange={(e) =>
                        setTurnover(
                          LIABILITY_TIERS.find((t) => t.label === e.target.value) || LIABILITY_TIERS[0]
                        )
                      }
                      className="w-full p-3 bg-slate-50 border border-slate-200 rounded-xl text-xs font-black text-slate-700 focus:ring-2 focus:ring-[#2076C7]/20 outline-none"
                    >
                      {LIABILITY_TIERS.map((tier) => (
                        <option key={tier.label} value={tier.label}>{tier.label}</option>
                      ))}
                    </select>
                  </div>
                </div>

                {/* Risk Layer Toggles */}
                <div className="space-y-3">
                  <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Enabled Covers</label>
                  <div className="grid grid-cols-3 gap-2">
                    {[
                      { id: 'fire', label: 'Fire', icon: IconFlame },
                      { id: 'burglary', label: 'Burglary', icon: IconShield },
                      { id: 'liability', label: 'Liability', icon: IconScale }
                    ].map((c) => (
                      <button
                        key={c.id}
                        onClick={() => setCovers(prev => ({ ...prev, [c.id]: !prev[c.id as keyof typeof covers] }))}
                        className={`flex flex-col items-center gap-2 p-3 rounded-xl border transition-all ${covers[c.id as keyof typeof covers] ? "bg-teal-50 border-[#1CADA3] text-[#1CADA3]" : "bg-white border-slate-100 text-slate-400"}`}
                      >
                        <c.icon size={18} />
                        <span className="text-[9px] font-bold uppercase">{c.label}</span>
                      </button>
                    ))}
                  </div>
                </div>
              </>
            )}
            
            {/* Disclaimer Notice */}
            <div className="p-4 mt-4 bg-blue-50/50 rounded-2xl border border-blue-100/50 flex gap-3">
              <IconInfoCircle size={20} className="text-[#2076C7] shrink-0 mt-0.5" />
              <p className="text-xs font-bold text-slate-500 leading-relaxed">
                * Indicative quote based on market averages. Actual premiums are subject to insurer underwriting, claims history, and detailed risk inspection.
              </p>
            </div>
          </div>
        </div>

        {/* --- RIGHT: OUTPUTS --- */}
        <div className="flex flex-col justify-between space-y-8">
          <div className="space-y-8">
            {/* Total Premium Display */}
            <div className="bg-slate-50 p-6 rounded-[2.5rem] border border-slate-100 text-center relative overflow-hidden">
               <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-1">Total Estimated Premium</p>
               <h3 className="text-4xl font-extrabold text-[#2076C7] tracking-tight">{fmt(premium)}</h3>
               <p className="text-[10px] font-bold text-slate-400 mt-1 italic">Annual including GST</p>
            </div>

            {/* Chart with Center Text */}
            <div className="h-[300px] relative">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={breakdown} cx="50%" cy="50%"
                    innerRadius="75%" outerRadius="90%"
                    paddingAngle={4} dataKey="value" stroke="none"
                  >
                    {breakdown.map((_, i) => <Cell key={i} fill={COLORS[i % COLORS.length]} />)}
                  </Pie>
                  <Tooltip />
                </PieChart>
              </ResponsiveContainer>
              <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none">
                <IconShieldCheck size={32} className="text-[#1CADA3] mb-1" />
                <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Policy Active</span>
              </div>
            </div>

            {/* Grid Breakdown */}
            <div className="grid grid-cols-2 gap-3">
              {breakdown.map((item, i) => (
                <div key={item.name} className="flex items-center gap-3 p-4 bg-white border border-slate-100 rounded-2xl shadow-sm">
                  <div className="w-2 h-8 rounded-full" style={{ backgroundColor: COLORS[i % COLORS.length] }} />
                  <div>
                    <p className="text-[9px] font-bold text-slate-400 uppercase leading-none mb-1">{item.name}</p>
                    <p className="text-sm font-bold text-slate-700">{fmt(item.value)}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

        
        </div>
      </div>
    </div>
  );
}