"use client";

import React, { useState, useMemo } from "react";
import {
  PieChart as ReChartsPie,
  Pie,
  Cell as ReCell,
  ResponsiveContainer as ReResponsiveContainer,
  Tooltip
} from "recharts";
import {
  Car as CarIcon,
} from "lucide-react";


const formatCurrency = (value: number | undefined): string => {
  if (value === undefined) return "₹0";
  return new Intl.NumberFormat('en-IN', {
    style: 'currency',
    currency: 'INR',
    maximumFractionDigits: 0,
  }).format(value);
};

export default function Calculator() {
  const [loanAmount, setLoanAmount] = useState<number>(800000);
  const [interestRate, setInterestRate] = useState<number>(8.5);
  const [tenure, setTenure] = useState<number>(60); // Months

  const results = useMemo(() => {
    const P = loanAmount;
    const r = (interestRate / 12) / 100;
    const n = tenure;

    let emi = 0;
    if (r === 0) {
      emi = P / n;
    } else {
      emi = (P * r * Math.pow(1 + r, n)) / (Math.pow(1 + r, n) - 1);
    }

    const totalPayment = emi * n;
    const totalInterest = totalPayment - P;

    return {
      emi: Math.round(emi),
      totalInterest: Math.round(totalInterest),
      totalPayment: Math.round(totalPayment),
    };
  }, [loanAmount, interestRate, tenure]);

  const chartData = [
    { name: "Principal", value: loanAmount, color: "#2076C7" },
    { name: "Interest", value: results.totalInterest, color: "#1CADA3" }
  ];

  // Percentages for slider backgrounds
  const amountPercent = ((loanAmount - 100000) / 9900000) * 100;
  const ratePercent = ((interestRate - 5) / 15) * 100; // 5% to 20%
  const tenurePercent = ((tenure - 12) / 72) * 100; // 1 to 7 years

  return (
    <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">

      {/* LEFT: Inputs */}
      <div className="lg:col-span-7 h-full">
        <div className="bg-white p-5 sm:p-6 rounded-3xl border border-slate-100 shadow-sm h-full">
          <div className="flex items-center gap-3 mb-6">
            <div className="p-2 bg-blue-50 rounded-xl text-blue-600">
              <CarIcon size={18} />
            </div>
            <h2 className="text-lg font-black text-slate-800">EMI Calculator</h2>
          </div>

          <div className="space-y-7">
            {/* Loan Amount */}
            <div className="space-y-4">
              <div className="flex justify-between items-center">
                <label className="text-xs font-black text-slate-400 uppercase tracking-widest">Loan Amount</label>
                <div className="px-4 py-1.5 bg-blue-50 rounded-xl border border-blue-100 text-blue-700 font-black text-sm">
                  {formatCurrency(loanAmount)}
                </div>
              </div>
              <input
                type="range"
                min={100000}
                max={10000000}
                step={50000}
                value={loanAmount}
                onChange={(e) => setLoanAmount(Number(e.target.value))}
                style={{ background: `linear-gradient(to right, #2076C7 ${amountPercent}%, #E2E8F0 ${amountPercent}%)` }}
                className="w-full h-1.5 rounded-full appearance-none cursor-pointer accent-[#2076C7] transition-all"
              />
              <div className="flex justify-between text-[10px] text-slate-400 font-bold uppercase tracking-tighter">
                <span>₹1 Lakh</span>
                <span>₹1 Crore</span>
              </div>
            </div>

            {/* Interest Rate */}
            <div className="space-y-4">
              <div className="flex justify-between items-center">
                <label className="text-xs font-black text-slate-400 uppercase tracking-widest">Interest Rate (p.a)</label>
                <div className="px-4 py-1.5 bg-teal-50 rounded-xl border border-teal-100 text-teal-700 font-black text-sm">
                  {interestRate}%
                </div>
              </div>
              <input
                type="range"
                min={5}
                max={20}
                step={0.1}
                value={interestRate}
                onChange={(e) => setInterestRate(Number(e.target.value))}
                style={{ background: `linear-gradient(to right, #2076C7 ${ratePercent}%, #E2E8F0 ${ratePercent}%)` }}
                className="w-full h-1.5 rounded-full appearance-none cursor-pointer accent-[#2076C7] transition-all"
              />
              <div className="flex justify-between text-[10px] text-slate-400 font-bold uppercase tracking-tighter">
                <span>5% p.a.</span>
                <span>20% p.a.</span>
              </div>
            </div>

            {/* Tenure */}
            <div className="space-y-4">
              <div className="flex justify-between items-center">
                <label className="text-xs font-black text-slate-400 uppercase tracking-widest">Loan Tenure</label>
                <div className="px-4 py-1.5 bg-slate-50 rounded-xl border border-slate-200 text-slate-700 font-black text-sm">
                  {tenure} Months ({Math.floor(tenure / 12)}Y {tenure % 12}M)
                </div>
              </div>
              <input
                type="range"
                min={12}
                max={84}
                step={1}
                value={tenure}
                onChange={(e) => setTenure(Number(e.target.value))}
                style={{ background: `linear-gradient(to right, #2076C7 ${tenurePercent}%, #E2E8F0 ${tenurePercent}%)` }}
                className="w-full h-1.5 rounded-full appearance-none cursor-pointer accent-[#2076C7] transition-all"
              />
              <div className="flex justify-between text-[10px] text-slate-400 font-bold uppercase tracking-tighter">
                <span>1 Year</span>
                <span>7 Years</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* RIGHT: Results */}
      <div className="lg:col-span-5 mt-8 lg:mt-0 h-full">
        <div className="bg-white p-5 sm:p-6 rounded-3xl border border-slate-100 shadow-sm text-center flex flex-col items-center justify-between h-full">
          <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-2">Monthly EMI</p>
          <div className="text-3xl font-black bg-gradient-to-r from-[#2076C7] to-[#1CADA3] bg-clip-text text-transparent mb-5">
            {formatCurrency(results.emi)}
          </div>

          <div className="h-40 w-full relative mb-5">
            <ReResponsiveContainer width="100%" height="100%">
              <ReChartsPie>
                <Pie
                  data={chartData}
                  cx="50%"
                  cy="50%"
                  innerRadius={55}
                  outerRadius={75}
                  paddingAngle={5}
                  dataKey="value"
                >
                  {chartData.map((entry, index) => (
                    <ReCell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip
                  formatter={(value: number | string | undefined) => formatCurrency(value === undefined ? 0 : Number(value))}
                  contentStyle={{ borderRadius: '12px', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' }}
                />
              </ReChartsPie>
            </ReResponsiveContainer>
            <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none">
              <p className="text-[8px] font-black text-slate-400 uppercase">Total Payable</p>
              <p className="text-[10px] font-black text-slate-800">{formatCurrency(results.totalPayment)}</p>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-3 w-full">
            <div className="p-3 bg-slate-50 rounded-2xl border border-slate-100">
              <div className="flex items-center gap-2 mb-1 justify-center">
                <div className="w-2 h-2 rounded-full bg-[#2076C7]" />
                <p className="text-[9px] font-black text-slate-400 uppercase">Principal</p>
              </div>
              <p className="text-sm font-black text-slate-800">{formatCurrency(loanAmount)}</p>
            </div>
            <div className="p-3 bg-slate-50 rounded-2xl border border-slate-100">
              <div className="flex items-center gap-2 mb-1 justify-center">
                <div className="w-2 h-2 rounded-full bg-[#1CADA3]" />
                <p className="text-[9px] font-black text-slate-400 uppercase">Interest</p>
              </div>
              <p className="text-sm font-black text-slate-800">{formatCurrency(results.totalInterest)}</p>
            </div>
          </div>
        </div>
      </div>

    </div>
  );
}
