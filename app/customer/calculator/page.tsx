"use client";
import React, { useState, useEffect } from 'react';
import { Calculator, ChevronDown, ArrowRight, Percent } from 'lucide-react';

// Calculator Logic Types
type CalcType = 'EMI' | 'SIP' | 'SIP_VS_EMI' | 'HOME_LOAN' | 'PERSONAL_LOAN' | 'BUSINESS_LOAN' | 'FD' | 'CI';

export default function EarningsCalculator() {
  const [calcType, setCalcType] = useState<CalcType>('EMI');
  const [principal, setPrincipal] = useState<number>(500000);
  const [rate, setRate] = useState<number>(10.5);
  const [tenure, setTenure] = useState<number>(5); // years
  
  // Results State
  const [results, setResults] = useState({
    primary: 0,
    secondary: 0,
    label: "Monthly EMI",
    tax: 0
  });

  const calculateValues = () => {
    let primary = 0;
    let secondary = 0;
    let label = "Monthly EMI";

    switch (calcType) {
      case 'EMI':
      case 'HOME_LOAN':
      case 'PERSONAL_LOAN':
      case 'BUSINESS_LOAN':
        const r = rate / 12 / 100;
        const n = tenure * 12;
        primary = (principal * r * Math.pow(1 + r, n)) / (Math.pow(1 + r, n) - 1);
        secondary = (primary * n) - principal; // Total Interest
        label = "Monthly EMI";
        break;
      
      case 'SIP':
        const i = rate / 12 / 100;
        const months = tenure * 12;
        primary = principal * ((Math.pow(1 + i, months) - 1) / i) * (1 + i);
        secondary = primary - (principal * months); // Wealth Gained
        label = "Estimated Returns";
        break;

      case 'FD':
      case 'CI':
        primary = principal * Math.pow((1 + rate / 100), tenure);
        secondary = primary - principal;
        label = "Maturity Amount";
        break;
        
      default:
        break;
    }

    setResults({
      primary: Math.round(primary),
      secondary: Math.round(secondary),
      label: label,
      tax: Math.round(primary * 0.02) // Example 2% TDS logic from image
    });
  };

  useEffect(() => {
    calculateValues();
  }, [calcType, principal, rate, tenure]);

  return (
    <div className="min-h-screen bg-gray-50 p-4 md:p-10 font-sans text-slate-800">
      <div className="max-w-5xl mx-auto grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* Left Section: Inputs */}
        <div className="lg:col-span-2 bg-white rounded-2xl border border-gray-100 shadow-sm p-6 md:p-8">
          <div className="flex items-center gap-3 mb-8">
            <div className="bg-emerald-50 p-2 rounded-lg">
              <Calculator className="text-emerald-600 w-6 h-6" />
            </div>
            <h1 className="text-xl font-bold text-slate-700 uppercase tracking-tight">Earnings Estimator</h1>
          </div>

          {/* Lead Category Tabs (Visual only as per image) */}
          <div className="mb-8">
            <p className="text-xs font-bold text-slate-400 mb-3 uppercase tracking-wider">Lead Category</p>
            <div className="flex flex-wrap gap-2 p-1 bg-gray-50 rounded-xl w-fit">
              {['Loans', 'Insurance', 'Mutual Funds', 'Investments'].map((tab) => (
                <button 
                  key={tab}
                  className={`px-6 py-2 rounded-lg text-sm font-semibold transition-all ${
                    tab === 'Loans' ? 'bg-white shadow-sm text-emerald-600' : 'text-slate-500 hover:text-slate-700'
                  }`}
                >
                  {tab}
                </button>
              ))}
            </div>
          </div>

          {/* Calculator Dropdown */}
          <div className="mb-8">
            <label className="text-xs font-bold text-slate-400 mb-2 block uppercase tracking-wider">Select Product</label>
            <div className="relative group">
              <select 
                value={calcType}
                onChange={(e) => setCalcType(e.target.value as CalcType)}
                className="w-full appearance-none bg-white border border-gray-200 rounded-xl px-4 py-4 pr-10 focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 transition-all cursor-pointer font-medium text-slate-700"
              >
                <option value="EMI">SME Loan (EMI)</option>
                <option value="HOME_LOAN">Home Loan</option>
                <option value="PERSONAL_LOAN">Personal Loan</option>
                <option value="BUSINESS_LOAN">Business Loan</option>
                <option value="SIP">SIP Calculator</option>
                <option value="FD">FD Calculator</option>
                <option value="CI">Compound Interest</option>
              </select>
              <ChevronDown className="absolute right-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400 pointer-events-none group-hover:text-slate-600" />
            </div>
          </div>

          {/* Dynamic Inputs */}
          <div className="space-y-6">
            <div>
              <label className="text-xs font-bold text-slate-400 mb-2 block uppercase tracking-wider">
                {calcType === 'SIP' ? 'Monthly Investment' : 'Principal Amount'} (₹)
              </label>
              <div className="relative border-2 border-emerald-100 rounded-xl overflow-hidden focus-within:border-emerald-500 transition-all">
                <span className="absolute left-4 top-1/2 -translate-y-1/2 text-emerald-600 font-bold text-lg">₹</span>
                <input 
                  type="number"
                  value={principal}
                  onChange={(e) => setPrincipal(Number(e.target.value))}
                  className="w-full pl-10 pr-12 py-4 text-xl font-bold text-slate-700 focus:outline-none"
                />
                <div className="absolute right-4 top-1/2 -translate-y-1/2 flex flex-col gap-1">
                   <button onClick={() => setPrincipal(p => p + 1000)} className="text-slate-300 hover:text-emerald-500 text-[10px]">▲</button>
                   <button onClick={() => setPrincipal(p => Math.max(0, p - 1000))} className="text-slate-300 hover:text-emerald-500 text-[10px]">▼</button>
                </div>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="text-xs font-bold text-slate-400 mb-2 block uppercase tracking-wider">Interest Rate (%)</label>
                <input 
                  type="number"
                  value={rate}
                  onChange={(e) => setRate(Number(e.target.value))}
                  className="w-full border border-gray-200 rounded-xl px-4 py-3 font-bold text-slate-700 focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 outline-none"
                />
              </div>
              <div>
                <label className="text-xs font-bold text-slate-400 mb-2 block uppercase tracking-wider">Tenure (Years)</label>
                <input 
                  type="number"
                  value={tenure}
                  onChange={(e) => setTenure(Number(e.target.value))}
                  className="w-full border border-gray-200 rounded-xl px-4 py-3 font-bold text-slate-700 focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 outline-none"
                />
              </div>
            </div>
          </div>
        </div>

        {/* Right Section: Results Card */}
        <div className="bg-white rounded-2xl border border-gray-100 shadow-xl overflow-hidden flex flex-col">
          {/* Header Teal Section */}
          <div className="bg-[#14b8a6] p-8 text-white relative">
             <p className="text-[10px] font-black uppercase tracking-[0.2em] opacity-80 mb-2">Estimated Net Payout</p>
             <h2 className="text-5xl font-extrabold flex items-center gap-1">
               <span className="text-3xl font-medium">₹</span>
               {results.primary.toLocaleString('en-IN')}
             </h2>
             
             <div className="mt-6 inline-flex items-center gap-2 bg-white/10 backdrop-blur-sm px-3 py-1.5 rounded-full text-[11px] font-bold">
               <Percent className="w-3 h-3" />
               <span>@ {rate}% avg commission</span>
             </div>
          </div>

          {/* Breakdown Section */}
          <div className="p-8 flex-1">
            <div className="flex justify-between items-start mb-10">
              <div>
                <p className="text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-1">Gross Earnings</p>
                <p className="text-2xl font-black text-slate-700">₹{results.primary.toLocaleString('en-IN')}</p>
              </div>
              <div className="text-right">
                <p className="text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-1">TDS (2%)</p>
                <p className="text-xl font-bold text-rose-500">-₹{results.tax.toLocaleString('en-IN')}</p>
              </div>
            </div>

            <button className="w-full bg-[#2563eb] hover:bg-blue-700 text-white font-bold py-4 rounded-xl shadow-lg shadow-blue-200 transition-all flex items-center justify-center gap-2 group">
              Process Deal
              <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </button>
          </div>
        </div>

      </div>
    </div>
  );
}