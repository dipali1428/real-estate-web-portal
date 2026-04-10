"use client";

import React, { useState, useEffect } from "react";
import {
  IconShieldCheck,
  IconPlus,
  IconMinus,
} from "@tabler/icons-react";
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip } from "recharts";
import { BASE_RATES, TENURE_FACTORS, LOAN_TYPES, PLAN_TYPES } from "@/app/products/loan-protector/components/data";

export const LoanProtectorCalculator = () => {
  // State from product calculator
  const [planType, setPlanType] = useState(PLAN_TYPES[0].title);
  const [loanAmount, setLoanAmount] = useState(5000000); // 50 Lakhs
  const [loanType, setLoanType] = useState(LOAN_TYPES[0]);
  const [tenure, setTenure] = useState(20);
  const [interestRate, setInterestRate] = useState(8.5);
  const [age, setAge] = useState(35);
  const [jointAge, setJointAge] = useState(30);
  const [gender, setGender] = useState<"Male" | "Female">("Male");
  const [isSmoker, setIsSmoker] = useState(false);
  const [coverType, setCoverType] = useState<"Reducing" | "Level">("Reducing");
  const [premiumType, setPremiumType] = useState<"Single" | "Regular">("Single");

  // Output State
  const [premium, setPremium] = useState(0);
  const [breakdown, setBreakdown] = useState<any[]>([]);

  useEffect(() => {
    // 1. Base Rate (based on age)
    const effectiveAge = planType === "Joint Loan Protection Plan" ? Math.max(age, jointAge) : age;

    const baseRateObj = BASE_RATES.find((r) => effectiveAge <= r.maxAge) || BASE_RATES[BASE_RATES.length - 1];
    const baseRate = baseRateObj.rate;

    // 2. Tenure Factor
    const tenureFactorObj = TENURE_FACTORS.find((t) => tenure <= t.maxTenure) || TENURE_FACTORS[TENURE_FACTORS.length - 1];
    const factorTenure = tenureFactorObj.factor;

    // 3. Actuarial Factors
    const genderFactor = gender === "Male" ? 1.05 : 1.0;
    const smokerFactor = isSmoker ? 1.4 : 1.0;
    const planFactor = PLAN_TYPES.find((p) => p.title === planType)?.factor || 1.0;

    // 4. Dynamic Cover Type Factor
    const coverTypeFactor = coverType === "Reducing" ? 0.75 + (tenure / 30) * 0.1 : 1.0;

    // 5. Loan Type Factor
    const loanTypeFactorMap: Record<string, number> = {
      "Home Loan": 1.0,
      "Personal Loan": 1.15,
      "Car Loan": 1.1,
      "Business Loan": 1.2,
      "Education Loan": 0.95,
    };
    const loanTypeFactor = loanTypeFactorMap[loanType] || 1.0;

    // 6. Premium Mode Factor
    const premiumModeFactor = premiumType === "Single" ? 8.5 : 1.0;

    // Base calculation
    let annualPremium =
      (loanAmount / 100000) *
      baseRate *
      factorTenure *
      genderFactor *
      smokerFactor *
      planFactor *
      coverTypeFactor *
      loanTypeFactor *
      premiumModeFactor;

    // 7. Minimum Premium Floor
    annualPremium = Math.max(annualPremium, 500);

    const calculatedPremium = premiumType === "Single" ? annualPremium : annualPremium / 12;
    
    const baseVal = Math.round(calculatedPremium);
    const gstVal = Math.round(baseVal * 0.18);
    
    setPremium(baseVal + gstVal);
    setBreakdown([
      { name: "Net Premium", value: baseVal },
      { name: "GST (18%)", value: gstVal },
    ]);
  }, [planType, loanAmount, loanType, tenure, interestRate, age, jointAge, gender, isSmoker, coverType, premiumType]);

  const fmt = (n: number) => `₹${new Intl.NumberFormat("en-IN", { maximumFractionDigits: 0 }).format(Math.round(n))}`;
  const formatCompact = (n: number) => {
    if (n >= 10000000) return `₹${(n / 10000000).toFixed(1)}Cr`;
    if (n >= 100000) return `₹${(n / 100000).toFixed(1)}L`;
    return `₹${(n / 1000).toFixed(0)}K`;
  };

  const COLORS = ["#2076C7", "#1CADA3"];
  
  const getSliderStyle = (value: number, min: number, max: number) => {
    const percentage = ((value - min) / (max - min)) * 100;
    return {
      background: `linear-gradient(to right, #2076C7 0%, #1CADA3 ${percentage}%, #f1f5f9 ${percentage}%, #f1f5f9 100%)`,
    };
  };

  return (
    <div className="w-full font-sans">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
        
        {/* --- LEFT: INPUTS --- */}
        <div className="space-y-8 lg:pr-8 lg:border-r border-slate-100">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1.5 mb-4 bg-slate-50 border rounded-full text-[10px] font-black uppercase tracking-widest text-[#2076C7]">
              <IconShieldCheck size={14} /> Debt Security Architect
            </div>
            <h2 className="text-3xl font-extrabold text-slate-800 tracking-tight">Loan Shield Estimator</h2>
            <p className="text-xs text-slate-500 font-bold mt-1 uppercase tracking-tight">Protecting family from outstanding liabilities</p>
          </div>

          <div className="space-y-7">
            {/* Plan Type Selection */}
            <div className="space-y-3">
              <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Protection Plan</label>
              <div className="flex bg-slate-50 p-1 rounded-2xl border overflow-x-auto">
                {PLAN_TYPES.slice(0, 3).map((plan) => (
                  <button
                    key={plan.title}
                    onClick={() => setPlanType(plan.title)}
                    className={`flex-1 min-w-max px-4 py-2 text-[10px] font-black rounded-xl transition-all whitespace-nowrap ${planType === plan.title ? "bg-white text-[#2076C7] shadow-sm border border-slate-100" : "text-slate-400 hover:text-slate-600"}`}
                  >
                    {plan.title.replace(" Loan Protection Plan", "").replace(" Insurance Plan", "")}
                  </button>
                ))}
              </div>
            </div>

            {/* Loan Amount */}
            <div className="space-y-4">
              <div className="flex justify-between items-end">
                <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Loan Amount</label>
                <span className="text-lg font-black text-[#2076C7]">{formatCompact(loanAmount)}</span>
              </div>
              <input
                type="range" min="100000" max="20000000" step="100000" value={loanAmount}
                onChange={(e) => setLoanAmount(Number(e.target.value))}
                className="w-full h-2 rounded-lg appearance-none cursor-pointer accent-[#2076C7]"
                style={getSliderStyle(loanAmount, 100000, 20000000)}
              />
              <div className="flex gap-2">
                <button onClick={() => setLoanAmount(v => Math.max(100000, v - 100000))} className="p-2 border rounded-lg hover:bg-slate-50"><IconMinus size={14}/></button>
                <div className="flex-grow text-center py-2 bg-slate-50 border rounded-lg font-bold text-slate-600">{fmt(loanAmount)}</div>
                <button onClick={() => setLoanAmount(v => Math.min(20000000, v + 100000))} className="p-2 border rounded-lg hover:bg-slate-50"><IconPlus size={14}/></button>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-8">
              {/* Tenure */}
              <div className="space-y-4">
                <div className="flex justify-between items-center">
                  <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Tenure</label>
                  <span className="text-sm font-black text-slate-700">{tenure} Yrs</span>
                </div>
                <input type="range" min="1" max="30" value={tenure} onChange={(e) => setTenure(Number(e.target.value))} 
                  className="w-full h-1.5 rounded-lg appearance-none cursor-pointer accent-[#2076C7]" style={getSliderStyle(tenure, 1, 30)} />
              </div>
              {/* Rate */}
              <div className="space-y-4">
                <div className="flex justify-between items-center">
                  <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Interest Rate</label>
                  <span className="text-sm font-black text-slate-700">{interestRate}%</span>
                </div>
                <input type="range" min="5" max="15" step="0.1" value={interestRate} onChange={(e) => setInterestRate(Number(e.target.value))} 
                  className="w-full h-1.5 rounded-lg appearance-none cursor-pointer accent-[#2076C7]" style={getSliderStyle(interestRate, 5, 15)} />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-8">
              {/* Age */}
              <div className="space-y-4">
                <div className="flex justify-between items-center">
                  <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Borrower Age</label>
                  <span className="text-sm font-black text-slate-700">{age} Yrs</span>
                </div>
                <input type="range" min="18" max="70" value={age} onChange={(e) => setAge(Number(e.target.value))} 
                  className="w-full h-1.5 rounded-lg appearance-none cursor-pointer accent-[#2076C7]" style={getSliderStyle(age, 18, 70)} />
              </div>
              
              {/* Joint Age */}
              <div className={`space-y-4 transition-all ${planType === "Joint Loan Protection Plan" ? 'opacity-100' : 'opacity-30 pointer-events-none'}`}>
                <div className="flex justify-between items-center">
                  <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Co-Borrower</label>
                  <span className="text-sm font-black text-slate-700">{jointAge} Yrs</span>
                </div>
                <input type="range" min="18" max="70" value={jointAge} onChange={(e) => setJointAge(Number(e.target.value))} 
                  className="w-full h-1.5 rounded-lg appearance-none cursor-pointer accent-[#2076C7]" style={getSliderStyle(jointAge, 18, 70)} />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-3">
                <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Gender</label>
                <div className="flex p-0.5 bg-slate-50 border rounded-xl">
                  <button onClick={() => setGender("Male")} className={`flex-1 py-1.5 text-[10px] font-black uppercase rounded-lg transition-all ${gender === "Male" ? "bg-white border border-slate-200 text-[#2076C7] shadow-sm" : "text-slate-400"}`}>Male</button>
                  <button onClick={() => setGender("Female")} className={`flex-1 py-1.5 text-[10px] font-black uppercase rounded-lg transition-all ${gender === "Female" ? "bg-white border border-slate-200 text-[#2076C7] shadow-sm" : "text-slate-400"}`}>Female</button>
                </div>
              </div>
              <div className="space-y-3">
                <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Tobacco Use</label>
                <div className="flex p-0.5 bg-slate-50 border rounded-xl">
                  <button onClick={() => setIsSmoker(false)} className={`flex-1 py-1.5 text-[10px] font-black uppercase rounded-lg transition-all ${!isSmoker ? "bg-white border border-slate-200 text-[#2076C7] shadow-sm" : "text-slate-400"}`}>No</button>
                  <button onClick={() => setIsSmoker(true)} className={`flex-1 py-1.5 text-[10px] font-black uppercase rounded-lg transition-all ${isSmoker ? "bg-red-500 border border-red-500 text-white shadow-sm" : "text-slate-400"}`}>Yes</button>
                </div>
              </div>
            </div>
            
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-3">
                <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Cover Detail</label>
                <div className="flex p-0.5 bg-slate-50 border rounded-xl">
                  <button onClick={() => setCoverType("Reducing")} className={`flex-1 py-1.5 text-[10px] font-black uppercase rounded-lg transition-all ${coverType === "Reducing" ? "bg-white border border-slate-200 text-[#1CADA3] shadow-sm" : "text-slate-400"}`}>Reducing</button>
                  <button onClick={() => setCoverType("Level")} className={`flex-1 py-1.5 text-[10px] font-black uppercase rounded-lg transition-all ${coverType === "Level" ? "bg-white border border-slate-200 text-[#1CADA3] shadow-sm" : "text-slate-400"}`}>Level</button>
                </div>
              </div>
              <div className="space-y-3">
                <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Premium Mode</label>
                <div className="flex p-0.5 bg-slate-50 border rounded-xl">
                  <button onClick={() => setPremiumType("Regular")} className={`flex-1 py-1.5 text-[10px] font-black uppercase rounded-lg transition-all ${premiumType === "Regular" ? "bg-white border border-slate-200 text-[#2076C7] shadow-sm" : "text-slate-400"}`}>Regular</button>
                  <button onClick={() => setPremiumType("Single")} className={`flex-1 py-1.5 text-[10px] font-black uppercase rounded-lg transition-all ${premiumType === "Single" ? "bg-white border border-slate-200 text-[#2076C7] shadow-sm" : "text-slate-400"}`}>Single</button>
                </div>
              </div>
            </div>

            {/* Loan Type */}
            <div className="space-y-3">
              <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Asset Facility Type</label>
              <select value={loanType} onChange={(e) => setLoanType(e.target.value)}
                  className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs font-black text-slate-700 focus:ring-2 focus:ring-[#2076C7]/20 outline-none">
                  {LOAN_TYPES.map(type => <option key={type} value={type}>{type}</option>)}
              </select>
            </div>
          </div>
        </div>

        {/* --- RIGHT: OUTPUTS --- */}
        <div className="flex flex-col h-full space-y-8">
           <div className="space-y-8 lg:sticky top-6">
              {/* Premium Result */}
              <div className="bg-gradient-to-br from-[#1CADA3]/5 to-transparent p-6 rounded-[2.5rem] border-2 border-[#1CADA3]/20 shadow-sm text-center relative overflow-hidden">
                <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1">
                    {premiumType === "Single" ? "Estimated Single Premium" : "Estimated Monthly Premium"}
                </p>
                <h3 className="text-4xl lg:text-5xl font-extrabold text-[#1CADA3] tracking-tighter my-2">{fmt(premium)}</h3>
                <p className="text-[10px] font-bold text-slate-400">
                    {premiumType === "Single" ? `One-time premium for ${tenure} years` : `Payable over ${tenure} years`} (inc. GST)
                </p>
              </div>

              {/* Chart */}
              <div className="h-[250px] relative">
                 <ResponsiveContainer width="100%" height="100%">
                    <PieChart>
                      <Pie
                        data={breakdown} cx="50%" cy="50%"
                        innerRadius="70%" outerRadius="85%"
                        paddingAngle={5} dataKey="value" stroke="none"
                      >
                        {breakdown.map((_, index) => (
                          <Cell key={index} fill={COLORS[index % COLORS.length]} />
                        ))}
                      </Pie>
                      <Tooltip formatter={(value: any) => fmt(value)} contentStyle={{ borderRadius: "1rem", border: "none" }} />
                    </PieChart>
                 </ResponsiveContainer>
                 <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none">
                    <span className="text-2xl font-black text-[#2076C7] mb-1">{formatCompact(loanAmount)}</span>
                    <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Sum Assured</span>
                 </div>
              </div>

              {/* Breakdown Cards */}
              <div className="grid grid-cols-2 gap-3">
                 {breakdown.map((item, i) => (
                   <div key={item.name} className="flex items-center gap-3 p-4 bg-white border border-slate-100 rounded-2xl shadow-sm">
                      <div className="w-1.5 h-8 rounded-full" style={{ backgroundColor: COLORS[i % COLORS.length] }} />
                      <div>
                        <p className="text-[9px] font-black text-slate-400 uppercase leading-none mb-1">{item.name}</p>
                        <p className="text-sm font-black text-slate-700">{fmt(item.value)}</p>
                      </div>
                   </div>
                 ))}
              </div>
           </div>

        </div>
      </div>
      <style jsx>{`
        input[type="range"]::-webkit-slider-thumb {
          -webkit-appearance: none;
          appearance: none;
          width: 18px;
          height: 18px;
          background: #2076c7;
          border: 3px solid #fff;
          border-radius: 50%;
          cursor: pointer;
          box-shadow: 0 4px 8px rgba(32, 118, 199, 0.2);
          transition: all 0.3s ease;
        }
        input[type="range"]::-webkit-slider-thumb:hover {
          transform: scale(1.15);
          box-shadow: 0 5px 12px rgba(32, 118, 199, 0.3);
        }
        input::-webkit-outer-spin-button,
        input::-webkit-inner-spin-button {
          -webkit-appearance: none;
          margin: 0;
        }
        input[type="number"] {
          -moz-appearance: textfield;
        }
      `}</style>
    </div>
  );
};