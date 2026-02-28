"use client";
import React, { useState, useEffect } from 'react';
import { Calculator, ArrowRight, Percent, Info, TrendingUp, Menu, X } from 'lucide-react';

type CalcType = 'EMI' | 'SIP' | 'SIP_VS_EMI' | 'HOME' | 'PERSONAL' | 'BUSINESS' | 'FD' | 'CI';

export default function CustomerCalculator() {
  const [activeTab, setActiveTab] = useState<CalcType>('EMI');
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  // Shared Inputs
  const [amount, setAmount] = useState<number>(1000000);
  const [rate, setRate] = useState<number>(8.5);
  const [tenure, setTenure] = useState<number>(20);
  
  // Specific inputs for SIP vs EMI
  const [sipReturn, setSipReturn] = useState<number>(12);

  // Result state
  const [results, setResults] = useState({
    primaryValue: 0,
    primaryLabel: "Monthly EMI",
    secondaryValue: 0,
    secondaryLabel: "Total Interest",
    extraInfo: "Calculated at 8.5% p.a.",
    tax: 0
  });

  const tabs = [
    { id: 'EMI', label: 'EMI' },
    { id: 'SIP', label: 'SIP' },
    { id: 'SIP_VS_EMI', label: 'SIP vs EMI' },
    { id: 'HOME', label: 'Home Loan' },
    { id: 'PERSONAL', label: 'Personal' },
    { id: 'BUSINESS', label: 'Business' },
    { id: 'FD', label: 'FD' },
    { id: 'CI', label: 'CI' },
  ];

  useEffect(() => {
    let primary = 0;
    let secondary = 0;
    let pLabel = "Monthly EMI";
    let sLabel = "Total Interest";
    
    const r = rate / 12 / 100;
    const n = tenure * 12;

    switch (activeTab) {
      case 'EMI':
      case 'HOME':
      case 'PERSONAL':
      case 'BUSINESS':
        primary = (amount * r * Math.pow(1 + r, n)) / (Math.pow(1 + r, n) - 1);
        secondary = (primary * n) - amount;
        pLabel = "Monthly EMI";
        sLabel = "Total Interest";
        break;

      case 'SIP':
        const i = rate / 12 / 100;
        primary = amount * ((Math.pow(1 + i, n) - 1) / i) * (1 + i);
        secondary = primary - (amount * n);
        pLabel = "Future Value";
        sLabel = "Wealth Gained";
        break;

      case 'FD':
        primary = amount * Math.pow((1 + (rate / 100) / 4), (4 * tenure));
        secondary = primary - amount;
        pLabel = "Maturity Amount";
        sLabel = "Total Interest";
        break;

      case 'CI':
        primary = amount * Math.pow((1 + rate / 100), tenure);
        secondary = primary - amount;
        pLabel = "Total Amount";
        sLabel = "Compound Interest";
        break;

      case 'SIP_VS_EMI':
        const r_val = rate / 12 / 100;
        const emi20 = (amount * r_val * Math.pow(1 + r_val, 240)) / (Math.pow(1 + r_val, 240) - 1);
        const emi30 = (amount * r_val * Math.pow(1 + r_val, 360)) / (Math.pow(1 + r_val, 360) - 1);
        const diff = emi20 - emi30;
        
        const sip_r = sipReturn / 12 / 100;
        primary = diff * ((Math.pow(1 + sip_r, 360) - 1) / sip_r) * (1 + sip_r);
        secondary = diff;
        pLabel = "Wealth from SIP";
        sLabel = "Monthly Savings";
        break;
    }

    setResults({
      primaryValue: Math.round(primary),
      primaryLabel: pLabel,
      secondaryValue: Math.round(secondary),
      secondaryLabel: sLabel,
      extraInfo: `@ ${rate}% avg rate`,
      tax: Math.round(secondary * 0.01)
    });
  }, [activeTab, amount, rate, tenure, sipReturn]);

  const formatINR = (val: number) => {
    return new Intl.NumberFormat('en-IN').format(val);
  };

  // Mobile menu tabs
  const MobileTabs = () => (
    <div className="lg:hidden fixed inset-0 bg-black/50 z-50" onClick={() => setMobileMenuOpen(false)}>
      <div className="absolute bottom-0 left-0 right-0 bg-white rounded-t-3xl p-6 max-h-[80vh] overflow-y-auto" onClick={e => e.stopPropagation()}>
        <div className="flex justify-between items-center mb-6">
          <h3 className="text-lg font-bold text-slate-800">Select Calculator</h3>
          <button onClick={() => setMobileMenuOpen(false)} className="p-2 hover:bg-slate-100 rounded-xl">
            <X className="w-5 h-5" />
          </button>
        </div>
        <div className="grid grid-cols-2 gap-3">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => {
                setActiveTab(tab.id as CalcType);
                setMobileMenuOpen(false);
              }}
              className={`p-4 rounded-xl text-center font-bold transition-all ${
                activeTab === tab.id
                  ? 'bg-emerald-500 text-white shadow-lg'
                  : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-[#f1f5f9] p-3 sm:p-4 md:p-6 lg:p-10 font-sans text-slate-800">
      <div className="max-w-6xl mx-auto">
        
        {/* Mobile Header */}
        <div className="lg:hidden flex items-center justify-between mb-4 bg-white p-4 rounded-2xl shadow-sm">
          <div className="flex items-center gap-3">
            <div className="bg-emerald-50 p-2 rounded-lg">
              <Calculator className="text-emerald-600 w-5 h-5" />
            </div>
            <h1 className="text-lg font-bold text-slate-700">Calculator</h1>
          </div>
          <button
            onClick={() => setMobileMenuOpen(true)}
            className="p-2 bg-slate-100 rounded-xl"
          >
            <Menu className="w-5 h-5" />
          </button>
        </div>

        {mobileMenuOpen && <MobileTabs />}

        {/* Desktop Header - Hidden on mobile */}
        <div className="hidden lg:flex items-center gap-3 mb-8">
          <div className="bg-emerald-50 p-2 rounded-lg">
            <Calculator className="text-emerald-600 w-6 h-6" />
          </div>
          <h1 className="text-xl font-bold text-slate-700 uppercase tracking-tight">Financial Calculator</h1>
        </div>

        {/* TAB NAVIGATION - Desktop only */}
        <div className="hidden lg:block mb-10">
          <p className="text-[10px] font-black text-slate-400 mb-4 uppercase tracking-[0.2em]">Calculator Type</p>
          <div className="flex flex-wrap gap-2 p-1 bg-slate-50 rounded-xl">
            {tabs.map((tab) => (
              <button 
                key={tab.id}
                onClick={() => setActiveTab(tab.id as CalcType)}
                className={`px-5 py-2 rounded-lg text-sm font-bold transition-all ${
                  activeTab === tab.id 
                    ? 'bg-white shadow-sm text-emerald-600' 
                    : 'text-slate-500 hover:text-slate-700'
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>
        </div>

        {/* Active Tab Indicator - Mobile */}
        <div className="lg:hidden mb-4">
          <p className="text-[10px] font-black text-slate-400 mb-2 uppercase tracking-[0.2em]">Active Calculator</p>
          <div className="bg-emerald-50 p-3 rounded-xl border border-emerald-100">
            <p className="text-sm font-bold text-emerald-700">
              {tabs.find(t => t.id === activeTab)?.label || 'EMI'} Calculator
            </p>
          </div>
        </div>

        {/* Main Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 md:gap-6">
          
          {/* LEFT PANEL: Inputs */}
          <div className="lg:col-span-2 bg-white rounded-xl md:rounded-2xl border border-slate-200 shadow-sm p-4 sm:p-6 md:p-8">
            
            {/* INPUTS SECTION */}
            <div className="space-y-4 sm:space-y-6 md:space-y-8">
              {/* Amount Input */}
              <div>
                <label className="text-[10px] sm:text-[11px] font-bold text-slate-400 mb-2 sm:mb-3 block uppercase tracking-wider">
                  {activeTab === 'SIP' ? 'Monthly Investment' : 'Principal / Loan Amount'} (₹)
                </label>
                <div className="relative border-2 border-emerald-50 rounded-lg sm:rounded-xl overflow-hidden focus-within:border-emerald-400 transition-all bg-white">
                  <span className="absolute left-3 sm:left-4 top-1/2 -translate-y-1/2 text-emerald-600 font-bold text-base sm:text-lg">₹</span>
                  <input 
                    type="number"
                    value={amount}
                    onChange={(e) => setAmount(Number(e.target.value))}
                    className="w-full pl-8 sm:pl-10 pr-3 sm:pr-4 py-3 sm:py-4 text-lg sm:text-xl md:text-2xl font-black text-slate-700 focus:outline-none"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
                {/* Rate Input */}
                <div>
                  <label className="text-[10px] sm:text-[11px] font-bold text-slate-400 mb-2 sm:mb-3 block uppercase tracking-wider">Interest Rate (%)</label>
                  <div className="relative">
                    <input 
                      type="number"
                      value={rate}
                      onChange={(e) => setRate(Number(e.target.value))}
                      className="w-full border border-slate-200 rounded-lg sm:rounded-xl px-3 sm:px-4 py-3 sm:py-4 text-sm sm:text-base font-bold text-slate-700 focus:ring-2 focus:ring-emerald-500/10 focus:border-emerald-500 outline-none transition-all"
                    />
                    <Percent className="absolute right-3 sm:right-4 top-1/2 -translate-y-1/2 w-3 h-3 sm:w-4 sm:h-4 text-slate-300" />
                  </div>
                </div>

                {/* Tenure Input */}
                <div>
                  <label className="text-[10px] sm:text-[11px] font-bold text-slate-400 mb-2 sm:mb-3 block uppercase tracking-wider">Tenure (Years)</label>
                  <input 
                    type="number"
                    value={tenure}
                    onChange={(e) => setTenure(Number(e.target.value))}
                    className="w-full border border-slate-200 rounded-lg sm:rounded-xl px-3 sm:px-4 py-3 sm:py-4 text-sm sm:text-base font-bold text-slate-700 focus:ring-2 focus:ring-emerald-500/10 focus:border-emerald-500 outline-none transition-all"
                  />
                </div>
              </div>

              {/* Special Field for SIP VS EMI */}
              {activeTab === 'SIP_VS_EMI' && (
                <div className="p-3 sm:p-4 bg-blue-50 rounded-lg sm:rounded-xl border border-blue-100">
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                    <div className="flex items-center gap-2">
                      <TrendingUp className="w-4 h-4 sm:w-5 sm:h-5 text-blue-600" />
                      <span className="text-xs sm:text-sm font-bold text-blue-700">Expected SIP Return (%)</span>
                    </div>
                    <input 
                      type="number"
                      value={sipReturn}
                      onChange={(e) => setSipReturn(Number(e.target.value))}
                      className="w-full sm:w-24 bg-white border border-blue-200 rounded-lg px-3 py-2 text-sm font-bold text-blue-800"
                    />
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* RIGHT PANEL: Results Card */}
          <div className="bg-white rounded-xl md:rounded-2xl lg:rounded-3xl border border-slate-200 shadow-lg lg:shadow-xl overflow-hidden flex flex-col h-fit">
            
            {/* Results Header (Teal) */}
            <div className="bg-[#14b8a6] p-6 sm:p-8 lg:p-10 text-white">
              <p className="text-[8px] sm:text-[10px] font-black uppercase tracking-[0.2em] sm:tracking-[0.25em] opacity-80 mb-1 sm:mb-2">
                Estimated {results.primaryLabel}
              </p>
              <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black flex items-center gap-1 break-all sm:break-normal">
                <span className="text-xl sm:text-2xl lg:text-3xl font-medium opacity-90">₹</span>
                <span className="text-2xl sm:text-3xl lg:text-4xl">{formatINR(results.primaryValue)}</span>
              </h2>
              
              <div className="mt-4 sm:mt-6 inline-flex items-center gap-2 bg-white/10 backdrop-blur-md px-2 sm:px-3 py-1 rounded-full text-[9px] sm:text-[11px] font-bold border border-white/5">
                <Percent className="w-2 h-2 sm:w-3 sm:h-3" />
                <span>{results.extraInfo}</span>
              </div>
            </div>

            {/* Breakdown Section */}
            <div className="p-6 sm:p-8 lg:p-10 flex-1">
              <div className="flex flex-col sm:flex-row justify-between items-start gap-4 sm:gap-0 mb-6 sm:mb-8 lg:mb-10">
                <div className="w-full sm:w-auto">
                  <p className="text-[8px] sm:text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-1">
                    {results.secondaryLabel}
                  </p>
                  <p className="text-xl sm:text-2xl font-black text-slate-700 break-all sm:break-normal">
                    ₹{formatINR(results.secondaryValue)}
                  </p>
                </div>
                <div className="w-full sm:w-auto text-left sm:text-right">
                  <p className="text-[8px] sm:text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-1">
                    TDS / Est. Tax
                  </p>
                  <p className="text-lg sm:text-xl font-bold text-rose-500 break-all sm:break-normal">
                    -₹{formatINR(results.tax)}
                  </p>
                </div>
              </div>

              <button className="w-full bg-[#2563eb] hover:bg-blue-700 text-white font-bold py-3 sm:py-4 lg:py-5 rounded-xl lg:rounded-2xl shadow-lg shadow-blue-100 transition-all flex items-center justify-center gap-2 sm:gap-3 text-sm sm:text-base">
                Submit Application
                <ArrowRight className="w-4 h-4 sm:w-5 sm:h-5 group-hover:translate-x-1 transition-transform" />
              </button>
              
              <div className="mt-6 sm:mt-8 pt-4 sm:pt-6 border-t border-slate-100 flex items-start gap-2 sm:gap-3 text-slate-400">
                <Info className="w-3 h-3 sm:w-4 sm:h-4 shrink-0 mt-0.5" />
                <p className="text-[9px] sm:text-[11px] font-medium leading-relaxed">
                  Calculations are based on monthly compounding for loans and SIPs. Maturity values for FD use quarterly compounding.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Responsive Styles */}
      <style jsx>{`
        @media (max-width: 640px) {
          input[type=number] {
            font-size: 16px !important; /* Prevents zoom on iOS */
          }
        }
      `}</style>
    </div>
  );
}