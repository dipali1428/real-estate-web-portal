"use client";

import React, { useState, useMemo } from "react";
// import { motion } from "framer-motion";
import {
  PieChart ,
  Pie,
  ResponsiveContainer ,
  Tooltip,
} from "recharts";
import {
  Calculator as CalculatorIcon,
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
  const [loanAmount, setLoanAmount] = useState<number>(500000);
  const [interestRate, setInterestRate] = useState<number>(18);
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
  {
    name: 'Principal',
    value: Number((results?.totalPayment ?? 0) - (results?.totalInterest ?? 0)),
    fill: '#6366f1',
  },
  {
    name: 'Interest',
    value: Number(results?.totalInterest ?? 0),
    fill: '#22c55e',
  },
];
  // Percentages for slider backgrounds
  const amountPercent = ((loanAmount - 10000) / 9990000) * 100;
  const ratePercent = ((interestRate - 1) / 29) * 100; // Let's use 1% as min for smoother experience
  const tenurePercent = ((tenure - 1) / 119) * 100;

  return (
    <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 h-full">

      {/* LEFT: Inputs */}
      <div className="lg:col-span-7 h-full">
        <div className="bg-white p-6 sm:p-8 rounded-3xl border border-slate-100 shadow-sm h-full">
          <div className="flex items-center gap-3 mb-8">
            <div className="p-2 bg-blue-50 rounded-xl text-blue-600">
              <CalculatorIcon size={20} />
            </div>
            <h2 className="text-xl font-black text-slate-800">Calculator Settings</h2>
          </div>

          <div className="space-y-10">
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
                min={10000}
                max={10000000}
                step={50000}
                value={loanAmount}
                onChange={(e) => setLoanAmount(Number(e.target.value))}
                style={{ background: `linear-gradient(to right, #2076C7 ${amountPercent}%, #E2E8F0 ${amountPercent}%)` }}
                className="w-full h-1.5 rounded-full appearance-none cursor-pointer accent-[#2076C7] transition-all"
              />
              <div className="flex justify-between text-[10px] text-slate-400 font-bold uppercase tracking-tighter">
                <span>₹10,000</span>
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
                min={1}
                max={30}
                step={0.1}
                value={interestRate}
                onChange={(e) => setInterestRate(Number(e.target.value))}
                style={{ background: `linear-gradient(to right, #2076C7 ${ratePercent}%, #E2E8F0 ${ratePercent}%)` }}
                className="w-full h-1.5 rounded-full appearance-none cursor-pointer accent-[#2076C7] transition-all"
              />
              <div className="flex justify-between text-[10px] text-slate-400 font-bold uppercase tracking-tighter">
                <span>1% p.a.</span>
                <span>30% p.a.</span>
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
                min={1}
                max={120}
                step={1}
                value={tenure}
                onChange={(e) => setTenure(Number(e.target.value))}
                style={{ background: `linear-gradient(to right, #2076C7 ${tenurePercent}%, #E2E8F0 ${tenurePercent}%)` }}
                className="w-full h-1.5 rounded-full appearance-none cursor-pointer accent-[#2076C7] transition-all"
              />
              <div className="flex justify-between text-[10px] text-slate-400 font-bold uppercase tracking-tighter">
                <span>1 Month</span>
                <span>10 Years</span>
              </div>
            </div>
          </div>
        </div>


      </div>

      {/* RIGHT: Results */}
      <div className="lg:col-span-5 h-full mt-8 lg:mt-0">
        <div className="bg-white p-6 sm:p-8 rounded-3xl border border-slate-100 shadow-sm text-center h-full flex flex-col justify-between">
          <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-2">Your Monthly EMI</p>
          <div className="text-4xl font-black bg-gradient-to-r from-[#2076C7] to-[#1CADA3] bg-clip-text text-transparent mb-8">
            {formatCurrency(results.emi)}
          </div>
<div className="h-48 relative mb-8">
<div className="h-48 relative mb-8">
  <ResponsiveContainer width="100%" height="100%">
    <PieChart>
      <Pie
        data={chartData}
        cx="50%"
        cy="50%"
        innerRadius={60}
        outerRadius={80}
        paddingAngle={5}
        dataKey="value"
      />

      <Tooltip
        formatter={(value: number | string | undefined) =>
          formatCurrency(value === undefined ? 0 : Number(value))
        }
        contentStyle={{
          borderRadius: '12px',
          border: 'none',
          boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)'
        }}
      />
    </PieChart>
  </ResponsiveContainer>

  <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none">
    <p className="text-[9px] font-black text-slate-400 uppercase">
      Total Payable
    </p>
    <p className="text-xs font-black text-slate-800">
      {formatCurrency(results.totalPayment)}
    </p>
  </div>
</div>

  <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none">
    <p className="text-[9px] font-black text-slate-400 uppercase">
      Total Payable
    </p>
    <p className="text-xs font-black text-slate-800">
      {formatCurrency(results.totalPayment)}
    </p>
  </div>
</div>

          <div className="grid grid-cols-2 gap-3">
            <div className="p-4 bg-slate-50 rounded-2xl border border-slate-100">
              <div className="flex items-center gap-2 mb-1 justify-center">
                <div className="w-2 h-2 rounded-full bg-[#2076C7]" />
                <p className="text-[9px] font-black text-slate-400 uppercase">Principal</p>
              </div>
              <p className="text-sm font-black text-slate-800">{formatCurrency(loanAmount)}</p>
            </div>
            <div className="p-4 bg-slate-50 rounded-2xl border border-slate-100">
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
