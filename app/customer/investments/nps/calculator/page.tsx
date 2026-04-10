'use client';

import React, { useState } from 'react';
import {
  Calculator,
  PiggyBank,
  IndianRupee,
  Shield,
  Info,
  Building2,
  Landmark,
} from 'lucide-react';

const NPSCalculator: React.FC = () => {
  const [monthlyContribution, setMonthlyContribution] = useState(5000);
  const [currentAge, setCurrentAge] = useState(30);
  const [retirementAge, setRetirementAge] = useState(60);
  const [expectedReturn, setExpectedReturn] = useState(12);
  const [annuityReturn, setAnnuityReturn] = useState(6);
  const [annuityPercent, setAnnuityPercent] = useState(40);

  const years = retirementAge - currentAge;
  const months = years * 12;
  const r = expectedReturn / 100 / 12;
  const totalCorpus = monthlyContribution * ((Math.pow(1 + r, months) - 1) / r) * (1 + r);
  const lumpSum = totalCorpus * (1 - annuityPercent / 100);
  const annuityCorpus = totalCorpus * (annuityPercent / 100);
  const monthlyPension = (annuityCorpus * annuityReturn) / 100 / 12;
  const totalInvested = monthlyContribution * months;
  
  // Calculate percentages for slider tracks
  const depositPercent = ((monthlyContribution - 500) / 99500) * 100;
  const agePercent = ((currentAge - 18) / 37) * 100;
  const retirementPercent = ((retirementAge - Math.max(currentAge + 5, 45)) / (70 - Math.max(currentAge + 5, 45))) * 100;
  const returnPercent = ((expectedReturn - 6) / 14) * 100;
  const annuityPercentVal = ((annuityPercent - 40) / 60) * 100;
  const annuityRatePercent = ((annuityReturn - 4) / 6) * 100;

  const fmt = (n: number) =>
    n >= 10000000
      ? `₹${(n / 10000000).toFixed(2)} Cr`
      : n >= 100000
        ? `₹${(n / 100000).toFixed(2)} L`
        : `₹${Math.round(n).toLocaleString('en-IN')}`;

  return (
    <div className="space-y-5">
      {/* Input Section */}
      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-5">
        <h2 className="text-base font-black text-gray-900 mb-4 flex items-center gap-2">
          <Calculator size={16} className="text-[#2076C7]" />
          NPS Retirement Calculator
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-4">
          {/* Monthly Contribution */}
          <div>
            <div className="flex justify-between items-center mb-1">
              <label className="text-xs font-semibold text-gray-700">Monthly Contribution</label>
              <span className="text-sm font-black text-[#2076C7]">₹{monthlyContribution.toLocaleString('en-IN')}</span>
            </div>
            <input type="range" min={500} max={100000} step={500} value={monthlyContribution}
              onChange={(e) => setMonthlyContribution(Number(e.target.value))}
              style={{ background: `linear-gradient(to right, #2076C7 ${depositPercent}%, #E2E8F0 ${depositPercent}%)` }}
              className="w-full h-1.5 rounded-full appearance-none cursor-pointer accent-[#2076C7] transition-all"
            />
            <div className="flex justify-between text-[10px] text-gray-400 mt-0.5"><span>₹500</span><span>₹1L</span></div>
          </div>

          {/* Current Age */}
          <div>
            <div className="flex justify-between items-center mb-1">
              <label className="text-xs font-semibold text-gray-700">Current Age</label>
              <span className="text-sm font-black text-[#2076C7]">{currentAge} yrs</span>
            </div>
            <input type="range" min={18} max={55} step={1} value={currentAge}
              onChange={(e) => setCurrentAge(Number(e.target.value))}
              style={{ background: `linear-gradient(to right, #2076C7 ${agePercent}%, #E2E8F0 ${agePercent}%)` }}
              className="w-full h-1.5 rounded-full appearance-none cursor-pointer accent-[#2076C7] transition-all"
            />
            <div className="flex justify-between text-[10px] text-gray-400 mt-0.5"><span>18</span><span>55</span></div>
          </div>

          {/* Retirement Age */}
          <div>
            <div className="flex justify-between items-center mb-1">
              <label className="text-xs font-semibold text-gray-700">Retirement Age</label>
              <span className="text-sm font-black text-[#2076C7]">{retirementAge} yrs</span>
            </div>
            <input type="range" min={Math.max(currentAge + 5, 45)} max={70} step={1} value={retirementAge}
              onChange={(e) => setRetirementAge(Number(e.target.value))}
              style={{ background: `linear-gradient(to right, #2076C7 ${retirementPercent}%, #E2E8F0 ${retirementPercent}%)` }}
              className="w-full h-1.5 rounded-full appearance-none cursor-pointer accent-[#2076C7] transition-all"
            />
            <div className="flex justify-between text-[10px] text-gray-400 mt-0.5"><span>45</span><span>70</span></div>
          </div>

          {/* Expected Return */}
          <div>
            <div className="flex justify-between items-center mb-1">
              <label className="text-xs font-semibold text-gray-700">Expected Annual Return</label>
              <span className="text-sm font-black text-[#2076C7]">{expectedReturn}%</span>
            </div>
            <input type="range" min={6} max={20} step={0.5} value={expectedReturn}
              onChange={(e) => setExpectedReturn(Number(e.target.value))}
              style={{ background: `linear-gradient(to right, #2076C7 ${returnPercent}%, #E2E8F0 ${returnPercent}%)` }}
              className="w-full h-1.5 rounded-full appearance-none cursor-pointer accent-[#2076C7] transition-all"
            />
            <div className="flex justify-between text-[10px] text-gray-400 mt-0.5"><span>6%</span><span>20%</span></div>
          </div>

          {/* Annuity % */}
          <div>
            <div className="flex justify-between items-center mb-1">
              <label className="text-xs font-semibold text-gray-700">Annuity Purchase %</label>
              <span className="text-sm font-black text-[#2076C7]">{annuityPercent}%</span>
            </div>
            <input type="range" min={40} max={100} step={5} value={annuityPercent}
              onChange={(e) => setAnnuityPercent(Number(e.target.value))}
              style={{ background: `linear-gradient(to right, #2076C7 ${annuityPercentVal}%, #E2E8F0 ${annuityPercentVal}%)` }}
              className="w-full h-1.5 rounded-full appearance-none cursor-pointer accent-[#2076C7] transition-all"
            />
            <div className="flex justify-between text-[10px] text-gray-400 mt-0.5"><span>40% (min)</span><span>100%</span></div>
          </div>

          {/* Annuity Rate */}
          <div>
            <div className="flex justify-between items-center mb-1">
              <label className="text-xs font-semibold text-gray-700">Annuity Rate</label>
              <span className="text-sm font-black text-[#2076C7]">{annuityReturn}%</span>
            </div>
            <input type="range" min={4} max={10} step={0.5} value={annuityReturn}
              onChange={(e) => setAnnuityReturn(Number(e.target.value))}
              style={{ background: `linear-gradient(to right, #2076C7 ${annuityRatePercent}%, #E2E8F0 ${annuityRatePercent}%)` }}
              className="w-full h-1.5 rounded-full appearance-none cursor-pointer accent-[#2076C7] transition-all"
            />
            <div className="flex justify-between text-[10px] text-gray-400 mt-0.5"><span>4%</span><span>10%</span></div>
          </div>
        </div>
      </div>

      {/* Results */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
        {[
          { label: 'Total Corpus', value: fmt(totalCorpus), icon: PiggyBank, gradient: 'from-[#2076C7] to-[#1CADA3]', desc: 'at retirement' },
          { label: 'Monthly Pension', value: fmt(monthlyPension), icon: IndianRupee, gradient: 'from-blue-600 to-[#2076C7]', desc: 'estimated' },
          { label: 'Lump Sum', value: fmt(lumpSum), icon: Landmark, gradient: 'from-[#1CADA3] to-teal-400', desc: `${100 - annuityPercent}% withdrawal` },
          { label: 'Total Invested', value: fmt(totalInvested), icon: Building2, gradient: 'from-gray-400 to-gray-500', desc: `over ${years} years` },
        ].map((card, i) => {
          const Icon = card.icon;
          return (
            <div key={i} className="bg-white rounded-2xl shadow-sm border border-gray-100 p-4 text-center hover:shadow-md transition-all">
              <div className={`w-10 h-10 rounded-xl bg-gradient-to-r ${card.gradient} flex items-center justify-center mx-auto mb-2 shadow-md`}>
                <Icon className="w-5 h-5 text-white" />
              </div>
              <p className="text-lg font-black text-gray-900 leading-none">{card.value}</p>
              <p className="text-[10px] text-gray-500 mt-1">{card.label}</p>
              <p className="text-[9px] text-gray-400">{card.desc}</p>
            </div>
          );
        })}
      </div>

      {/* Wealth Breakdown Bar */}
      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-5">
        <h3 className="text-sm font-bold text-gray-900 mb-3">Corpus Breakdown</h3>
        <div className="w-full h-5 rounded-full overflow-hidden flex">
          <div style={{ width: `${100 - annuityPercent}%` }} className="bg-gradient-to-r from-[#2076C7] to-[#1CADA3] h-full transition-all duration-500" />
          <div style={{ width: `${annuityPercent}%` }} className="bg-blue-100 h-full transition-all duration-500" />
        </div>
        <div className="flex flex-col sm:flex-row justify-between mt-3 gap-3 text-[11px] sm:text-xs">
          <span className="flex items-center gap-1.5 text-gray-600">
            <span className="w-3 h-3 rounded-sm bg-gradient-to-r from-[#2076C7] to-[#1CADA3] inline-block shrink-0" />
            Lump Sum ({100 - annuityPercent}%) &mdash; <span className="font-bold text-gray-900">{fmt(lumpSum)}</span>
          </span>
          <span className="flex items-center gap-1.5 text-gray-600">
            <span className="w-3 h-3 rounded-sm bg-blue-100 inline-block shrink-0" />
            Annuity ({annuityPercent}%) &mdash; <span className="font-bold text-gray-900">{fmt(annuityCorpus)}</span>
          </span>
        </div>
      </div>

      {/* Tax Benefit Breakdown */}
      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-5">
        <h3 className="text-sm font-black text-gray-900 mb-4 flex items-center gap-2">
          <Shield size={16} className="text-[#1CADA3]" />
          Annual Tax Savings Breakdown
        </h3>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <div className="p-4 bg-[#1CADA3]/10 rounded-2xl border border-[#1CADA3]/20">
             <p className="text-[10px] font-bold text-[#1CADA3] uppercase mb-1">Section 80C</p>
             <p className="text-lg font-black text-gray-900">₹{Math.min(monthlyContribution * 12, 150000).toLocaleString('en-IN')}</p>
             <p className="text-[9px] text-[#1CADA3] mt-1">out of ₹1.5L limit</p>
          </div>
          <div className="p-4 bg-blue-50 rounded-2xl border border-blue-100">
             <p className="text-[10px] font-bold text-blue-800 uppercase mb-1">Sec 80CCD(1B)</p>
             <p className="text-lg font-black text-blue-900">₹{Math.min(Math.max(monthlyContribution * 12 - 150000, 0), 50000).toLocaleString('en-IN')}</p>
             <p className="text-[9px] text-blue-600 mt-1">Exclusive NPS benefit</p>
          </div>
          <div className="p-4 bg-blue-100 rounded-2xl border border-blue-200">
             <p className="text-[10px] font-bold text-blue-700 uppercase mb-1">Total Tax Saved</p>
             <p className="text-xl font-black text-blue-900">₹{(Math.min(monthlyContribution * 12, 200000) * 0.3).toLocaleString('en-IN')}*</p>
             <p className="text-[9px] text-blue-600 mt-1">*at 30% tax bracket</p>
          </div>
        </div>
      </div>

      {/* Info Note */}
      <div className="flex items-start gap-2 bg-blue-50 border border-blue-100 rounded-xl p-4">
        <Info size={16} className="text-blue-600 flex-shrink-0 mt-0.5" />
        <p className="text-xs text-blue-700 leading-relaxed font-medium">
          NPS is one of the few instruments providing an additional deduction of ₹50,000 over and above the ₹1.5 Lakh limit under Section 80C, making it a highly tax-efficient retirement tool.
        </p>
      </div>
    </div>
  );
};

export default NPSCalculator;
