'use client';

import React, { useState } from 'react';

// Moved calculation logic here for simplification as requested
export const extractYears = (period: string): number => {
  if (!period || period.toLowerCase().includes('closed')) return 1;
  const p = period.toLowerCase();
  if (p.includes('12-18')) return 1.5;
  if (p.includes('24')) return 2;
  if (p.includes('18')) return 1.5;
  if (p.includes('12')) return 1;
  
  const monthsMatch = period.match(/(\d+)\s*Months/i);
  if (monthsMatch) return parseInt(monthsMatch[1]) / 12;
  const yearsMatch = period.match(/(\d+)\s*Years/i);
  if (yearsMatch) return parseInt(yearsMatch[1]);
  return 1;
};

export interface InvestmentData {
  buyBack: number;
  cost: number;
  years: number;
  capital: number;
  loan: number;
  interest: number;
  gain: number;
  tax: number;
  netGain: number;
  xirr: number;
  inHand: number;
}

export const calculateInvestmentData = (
  investment: number,
  irr: number = 12.5,
  yieldPerc: number = 8.5,
  holdingPeriod: string = '12 Months'
): InvestmentData => {
  const years = extractYears(holdingPeriod);
  
  // Logical breakdown based on user's spreadsheet logic:
  // Post-tax return = Investment * (1 + (IRR/100) * years)
  const targetTotal = investment * (1 + (irr / 100) * years);
  
  // Simple Interest component
  const interest = investment * (yieldPerc / 100) * years;
  
  // Tax rate (approx 31.2% as per spreadsheet image)
  const taxRate = 0.312;
  
  // Back-calculate Gain required to hit target IRR after tax
  // targetTotal = investment + (gain - tax) + interest
  // targetTotal = investment + (gain * (1 - taxRate)) + interest
  // gain * (1 - taxRate) = targetTotal - investment - interest
  const gain = (targetTotal - investment - interest) / (1 - taxRate);
  const tax = gain * taxRate;
  
  const netGain = (gain - tax) + interest;
  const inHand = investment + netGain;
  
  // Derived fields for UI matching image
  return {
    buyBack: investment + gain,
    cost: investment,
    years: years,
    capital: investment * 0.05,
    loan: investment * 0.95,
    interest: interest,
    gain: gain,
    tax: tax,
    netGain: netGain,
    xirr: irr,
    inHand: inHand
  };
};

export default function InvestmentCalculator({ property }: { property: any }) {
  const [investment, setInvestment] = useState(property.min_contribution || 800000);
  const years = extractYears(property.holding_period);
  const taxRate = 31.2;
  const interestRate = property.yield_percentage || 8.5;
  const irrTarget = property.irr_percentage || 12.5;

  const individualData = calculateInvestmentData(investment, irrTarget, interestRate, property.holding_period);
  const llpData = individualData; // Simplified for display as they usually match in the basic math provided

  const formatValue = (val: number, isPercent: boolean = false) => {
    if (isPercent) return `${val.toFixed(2)}%`;
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
      maximumFractionDigits: 0
    }).format(val);
  };

  return (
    <div id="investment-calculator" className="bg-white border-2 border-slate-200 rounded-2xl overflow-hidden shadow-xl font-sans text-slate-800 mb-12 max-w-4xl mx-auto scroll-mt-24">
      {/* Title Bar like image */}
      <div className="bg-[#E8F6FA] p-2 text-center border-b border-slate-200">
        <h4 className="text-[#2076C7] font-black text-sm uppercase">{property.title} by {property.developer || 'Developers'}</h4>
      </div>
      <div className="bg-[#FFF9C4] p-2 text-center border-b border-slate-200">
        <h5 className="text-[#2076C7] font-black text-xs uppercase">{property.llp_name || 'PUNEINFRACORE LLP'}</h5>
      </div>

      {/* Input Section */}
      <div className="p-4 bg-slate-50 border-b border-slate-200 flex flex-wrap items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <label className="text-[10px] font-black text-slate-500 uppercase tracking-widest">Adjust Individual Investment:</label>
          <div className="flex items-center gap-1 bg-white border border-slate-200 px-3 py-1 rounded-lg">
            <span className="text-xs font-bold text-slate-400">₹</span>
            <input 
              type="number" 
              value={investment}
              onChange={(e) => setInvestment(Number(e.target.value))}
              className="w-24 text-sm font-black text-blue-600 outline-none"
            />
          </div>
        </div>
        <div className="flex items-center gap-4 text-[10px] font-black uppercase text-slate-400">
          <span>Period: {years} Years</span>
          <span>Tax: {taxRate}%</span>
          <span>Interest: {interestRate}%</span>
        </div>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full text-[11px] border-collapse">
          <thead>
            <tr className="bg-slate-50">
              <th className="text-left py-3 px-4 font-black border-b border-r border-slate-200">Particulars</th>
              <th className="text-right py-3 px-4 font-black border-b border-r border-slate-200 bg-blue-50/50 text-[#2076C7]">LLP</th>
              <th className="text-right py-3 px-4 font-black border-b border-slate-200 bg-teal-50/50 text-[#1CADA3]">Individual</th>
            </tr>
          </thead>
          <tbody className="font-bold">
            <tr className="border-b border-slate-100">
              <td className="py-2 px-4 border-r border-slate-100">Total Buy Back Amount</td>
              <td className="py-2 px-4 text-right border-r border-slate-100">{formatValue(llpData.buyBack)}</td>
              <td className="py-2 px-4 text-right">{formatValue(individualData.buyBack)}</td>
            </tr>
            <tr className="border-b border-slate-100 bg-slate-50/30">
              <td className="py-2 px-4 border-r border-slate-100">Total Cost of Acquisition</td>
              <td className="py-2 px-4 text-right border-r border-slate-100 font-extrabold">{formatValue(llpData.cost)}</td>
              <td className="py-2 px-4 text-right font-extrabold">{formatValue(individualData.cost)}</td>
            </tr>
            <tr className="border-b border-slate-100">
              <td className="py-2 px-4 border-r border-slate-100">Period in Years</td>
              <td className="py-2 px-4 text-right border-r border-slate-100 bg-[#FFF9C4]/50">{years.toFixed(2)}</td>
              <td className="py-2 px-4 text-right bg-[#FFF9C4]/50">{years.toFixed(2)}</td>
            </tr>
            <tr className="border-b border-slate-100">
              <td className="py-2 px-4 border-r border-slate-100">Capital</td>
              <td className="py-2 px-4 text-right border-r border-slate-100">{formatValue(llpData.capital)}</td>
              <td className="py-2 px-4 text-right">{formatValue(individualData.capital)}</td>
            </tr>
            <tr className="border-b border-slate-100">
              <td className="py-2 px-4 border-r border-slate-100">Loan to LLP</td>
              <td className="py-2 px-4 text-right border-r border-slate-100">{formatValue(llpData.loan)}</td>
              <td className="py-2 px-4 text-right">{formatValue(individualData.loan)}</td>
            </tr>
            <tr className="border-b border-slate-100">
              <td className="py-2 px-4 border-r border-slate-100">Interest Payable @ {interestRate}%</td>
              <td className="py-2 px-4 text-right border-r border-slate-100">{formatValue(llpData.interest)}</td>
              <td className="py-2 px-4 text-right">{formatValue(individualData.interest)}</td>
            </tr>
            <tr className="border-b border-slate-100">
              <td className="py-2 px-4 border-r border-slate-100">Tax paid by Partner as per his tax slab (including Cess)</td>
              <td className="py-2 px-4 text-right border-r border-slate-100">-</td>
              <td className="py-2 px-4 text-right">-</td>
            </tr>
            <tr className="border-b border-slate-100">
              <td className="py-2 px-4 border-r border-slate-100">Interest received in hand post tax</td>
              <td className="py-2 px-4 text-right border-r border-slate-100">{formatValue(llpData.interest)}</td>
              <td className="py-2 px-4 text-right">{formatValue(individualData.interest)}</td>
            </tr>
            <tr className="border-b border-slate-100">
              <td className="py-2 px-4 border-r border-slate-100">Total Gain</td>
              <td className="py-2 px-4 text-right border-r border-slate-100">{formatValue(llpData.gain)}</td>
              <td className="py-2 px-4 text-right">{formatValue(individualData.gain)}</td>
            </tr>
            <tr className="border-b border-slate-100">
              <td className="py-2 px-4 border-r border-slate-100 uppercase">Tax @ {taxRate}%</td>
              <td className="py-2 px-4 text-right border-r border-slate-100">{formatValue(llpData.tax)}</td>
              <td className="py-2 px-4 text-right">{formatValue(individualData.tax)}</td>
            </tr>
            <tr className="border-b border-slate-100">
              <td className="py-2 px-4 border-r border-slate-100 font-extrabold uppercase">Net Gain + Interest already paid</td>
              <td className="py-2 px-4 text-right border-r border-slate-100">{formatValue(llpData.netGain)}</td>
              <td className="py-2 px-4 text-right">{formatValue(individualData.netGain)}</td>
            </tr>
            <tr className="border-b border-slate-100">
              <td className="py-3 px-4 border-r border-slate-100 font-black uppercase">Post Tax XIRR at disbursal</td>
              <td className="py-3 px-4 text-right border-r border-slate-100 bg-yellow-400 font-black text-base">{formatValue(llpData.xirr, true)}</td>
              <td className="py-3 px-4 text-right bg-yellow-400 font-black text-base">{formatValue(individualData.xirr, true)}</td>
            </tr>
            <tr className="bg-slate-50">
              <td className="py-3 px-4 border-r border-slate-100 font-black uppercase">Total in Hand post Tax</td>
              <td className="py-3 px-4 text-right border-r border-slate-100 font-black">{formatValue(llpData.inHand)}</td>
              <td className="py-3 px-4 text-right font-black">{formatValue(individualData.inHand)}</td>
            </tr>
          </tbody>
        </table>
      </div>

      {/* Disclaimers from image */}
      <div className="p-4 bg-slate-50 border-t border-slate-200 space-y-1">
        {[
          "Personal Income Tax applicable only on interest received. To check final post tax return including interest, select income tax slab",
          "TDS will be applicable separately",
          "Eligible Contributors can claim back TDS",
          "Tax already Deducted at LLP level in the above calculation"
        ].map((text, i) => (
          <div key={i} className="text-[9px] font-bold text-slate-500 uppercase flex items-center gap-2">
            <div className="w-1 h-1 bg-slate-300 rounded-full" />
            {text}
          </div>
        ))}
      </div>
    </div>
  );
}
