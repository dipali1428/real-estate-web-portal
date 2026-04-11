"use client";

import { useState, useEffect } from "react";
import {
  IconBuildingBank,
  IconChartPie,
  IconShieldCheck,
  IconTrendingUp,
  IconSwitchHorizontal, IconPlus, IconMinus
} from "@tabler/icons-react";
import {
  PieChart,
  Pie,
  Cell,
  ResponsiveContainer,
  Tooltip,
} from "recharts";
import { useModal } from "@/app/context/ModalContext";

const SECURITY_TYPES = [
  { id: 'equity', name: 'Equity', ltv: 50, rate: 10.5, icon: IconTrendingUp },
  { id: 'mf_equity', name: 'MF (Equity)', ltv: 50, rate: 9.5, icon: IconChartPie },
  { id: 'mf_debt', name: 'MF (Debt)', ltv: 70, rate: 9.0, icon: IconBuildingBank },
  { id: 'bonds', name: 'Bonds/ETF', ltv: 75, rate: 8.5, icon: IconShieldCheck },
  { id: 'insurance', name: 'Insurance', ltv: 85, rate: 10.0, icon: IconShieldCheck },
];

export const LASCalculator = () => {
  const { openLogin } = useModal();
  const [securityType, setSecurityType] = useState(SECURITY_TYPES[0]);
  const [portfolioValue, setPortfolioValue] = useState(1000000);
  const [ltv, setLtv] = useState(50);
  const [interestRate, setInterestRate] = useState(10.5);
  const [tenure, setTenure] = useState(1);
  const [isInterestOnly, setIsInterestOnly] = useState(true);
  const [futurePortfolioValue, setFuturePortfolioValue] = useState(1200000);

  // Derived Values
  const [maxLoan, setMaxLoan] = useState(0);
  const [monthlyPayment, setMonthlyPayment] = useState(0);
  const [totalInterest, setTotalInterest] = useState(0);
  const [totalPayment, setTotalPayment] = useState(0);
  const [marginCallValue, setMarginCallValue] = useState(0);
  const [topUpEligibility, setTopUpEligibility] = useState(0);

  useEffect(() => {
    const loan = portfolioValue * (ltv / 100);
    setMaxLoan(loan);
    const r = interestRate / 100 / 12;
    const n = tenure * 12;

    if (isInterestOnly) {
      const monthly = loan * r;
      setMonthlyPayment(monthly);
      setTotalInterest(monthly * n);
      setTotalPayment(loan + monthly * n);
    } else {
      const e = r === 0 ? loan / n : (loan * r * Math.pow(1 + r, n)) / (Math.pow(1 + r, n) - 1);
      setMonthlyPayment(e);
      setTotalPayment(e * n);
      setTotalInterest(e * n - loan);
    }
    setMarginCallValue(loan / 0.75);
    setTopUpEligibility(Math.max(0, (futurePortfolioValue * (ltv / 100)) - loan));
  }, [portfolioValue, ltv, interestRate, tenure, isInterestOnly, futurePortfolioValue]);

  const riskLevel = ltv < 40 ? 'LOW' : ltv < 55 ? 'MODERATE' : 'HIGH';
  const riskColor = ltv < 40 ? 'text-[#1CADA3]' : ltv < 55 ? 'text-amber-500' : 'text-red-500';
  const riskBgColor = ltv < 40 ? 'bg-[#1CADA3]' : ltv < 55 ? 'bg-amber-500' : 'bg-red-500';

  const formatCurrency = (n: number, compact: boolean = false) => {
    if (compact) {
      if (n >= 10000000) return `₹${(n / 10000000).toFixed(1)}Cr`;
      if (n >= 100000) return `₹${(n / 100000).toFixed(1)}L`;
      return `₹${(n / 1000).toFixed(0)}K`;
    }
    return `₹${new Intl.NumberFormat("en-IN").format(Math.round(n))}`;
  };

  const chartData = [
    { name: "Principal", value: maxLoan },
    { name: "Interest", value: totalInterest },
  ];

  return (
    <div className="w-full font-sans">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
        {/* Left Column: Controls */}
        <div className="space-y-7 lg:pr-8 lg:border-r border-slate-100">
          <div className="flex flex-col items-center text-center sm:items-start sm:text-left">
            <div className="inline-flex items-center gap-2 px-3 py-1.5 mb-4 bg-slate-50 border rounded-full text-[10px] font-black uppercase tracking-widest text-[#2076C7]">
              <IconBuildingBank size={14} /> Securities Finance Architect
            </div>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-[#2076C7]">Loan Against Securities</h2>
          </div>

          {/* Asset Class Selector */}
          <div className="space-y-3">
            <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest text-center sm:text-left">Select Asset Class</p>
            <div className="grid grid-cols-3 sm:grid-cols-5 gap-2">
              {SECURITY_TYPES.map((type) => (
                <button
                  key={type.id}
                  onClick={() => { setSecurityType(type); setLtv(type.ltv); setInterestRate(type.rate); }}
                  className={`flex flex-col items-center p-2.5 sm:p-3 rounded-xl border transition-all ${securityType.id === type.id ? 'border-[#2076C7] bg-[#2076C7]/5 ring-2 ring-[#2076C7]/10' : 'border-slate-100 bg-white hover:border-slate-200'}`}
                >
                  <type.icon size={18} className={securityType.id === type.id ? 'text-[#2076C7]' : 'text-slate-400'} />
                  <span className="text-[9px] mt-2 font-bold text-center leading-none uppercase">{type.name}</span>
                </button>
              ))}
            </div>
          </div>

          {/* Repayment Toggle */}
          <div className="flex items-center justify-between p-4 bg-slate-50 border rounded-2xl">
            <div className="flex items-center gap-3">
              <IconSwitchHorizontal className="text-[#2076C7]" size={20} />
              <div>
                <p className="text-xs font-black text-slate-800">{isInterestOnly ? 'INTEREST-ONLY' : 'STANDARD EMI'}</p>
                <p className="text-[9px] font-bold text-slate-400 uppercase">Repayment Structure</p>
              </div>
            </div>
            <button onClick={() => setIsInterestOnly(!isInterestOnly)} className={`w-12 h-6 rounded-full relative transition-colors ${isInterestOnly ? 'bg-[#2076C7]' : 'bg-slate-300'}`}>
              <div className={`w-4 h-4 bg-white rounded-full absolute top-1 transition-transform ${isInterestOnly ? 'right-1' : 'left-1'}`} />
            </button>
          </div>

          {/* Portfolio Input */}
          <div className="space-y-4">
            <div className="flex justify-between items-center">
              <label className="text-sm font-black text-[#2076C7] uppercase">Portfolio Value</label>
              <span className="text-lg font-black text-slate-700">{formatCurrency(portfolioValue)}</span>
            </div>
            <input
              type="range" min="100000" max="100000000" step="100000" value={portfolioValue}
              onChange={(e) => setPortfolioValue(Number(e.target.value))}
              className="w-full h-1.5 rounded-lg appearance-none bg-slate-100 accent-[#2076C7]"
            />
            <div className="flex gap-2">
              <button onClick={() => setPortfolioValue(v => Math.max(100000, v - 100000))} className="p-2 border rounded-lg hover:bg-slate-50"><IconMinus size={14}/></button>
              <div className="flex-grow flex items-center justify-center bg-slate-50 border rounded-lg font-bold text-slate-600 truncate px-2">{portfolioValue.toLocaleString()}</div>
              <button onClick={() => setPortfolioValue(v => Math.min(100000000, v + 100000))} className="p-2 border rounded-lg hover:bg-slate-50"><IconPlus size={14}/></button>
            </div>
          </div>

          {/* LTV & Rate Sliders */}
          <div className="grid grid-cols-2 gap-4 sm:gap-8">
            <div className="space-y-3">
              <label className="flex justify-between text-[10px] font-black text-slate-400 uppercase">LTV <span>{ltv}%</span></label>
              <input type="range" min="10" max="90" value={ltv} onChange={(e) => setLtv(Number(e.target.value))} className="w-full h-1.5 accent-[#2076C7]" />
            </div>
            <div className="space-y-3">
              <label className="flex justify-between text-[10px] font-black text-slate-400 uppercase">Rate <span>{interestRate}%</span></label>
              <input type="range" min="7" max="18" step="0.25" value={interestRate} onChange={(e) => setInterestRate(Number(e.target.value))} className="w-full h-1.5 accent-[#2076C7]" />
            </div>
          </div>

          {/* Tenure Slider */}
          <div className="space-y-3">
             <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Tenure: {tenure} Year</label>
             <input type="range" min="1" max="10" value={tenure} onChange={(e) => setTenure(Number(e.target.value))} className="w-full h-1.5 accent-[#2076C7]" />
          </div>
        </div>

        {/* Right Column: Visuals - Height Balanced */}
        <div className="flex flex-col justify-between h-full space-y-8">
          {/* Chart Section */}
          <div className="relative h-[280px] sm:h-[320px] w-full flex items-center justify-center">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie data={chartData} cx="50%" cy="50%" innerRadius="75%" outerRadius="90%" paddingAngle={5} dataKey="value" stroke="none">
                  <Cell fill="#2076C7" />
                  <Cell fill="#1CADA3" />
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
            <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none">
              <span className="text-[10px] font-black text-slate-400 uppercase tracking-tighter">Total Payable</span>
              <span className="text-2xl sm:text-3xl font-black text-[#2076C7] tracking-tight">{formatCurrency(totalPayment)}</span>
              <div className="flex gap-4 mt-2">
                <div className="flex items-center gap-1.5"><div className="w-2 h-2 rounded-full bg-[#2076C7]" /><span className="text-[9px] font-bold text-slate-500 uppercase">Principal</span></div>
                <div className="flex items-center gap-1.5"><div className="w-2 h-2 rounded-full bg-[#1CADA3]" /><span className="text-[9px] font-bold text-slate-500 uppercase">Interest</span></div>
              </div>
            </div>
          </div>

          {/* Metric Cards - Adaptive Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div className="bg-slate-50 p-5 rounded-[2rem] border border-slate-100 text-center flex flex-col justify-center min-h-[110px]">
              <p className="text-[9px] font-black text-slate-400 uppercase mb-2">Risk Profile</p>
              <div className={`text-sm font-black ${riskColor} uppercase`}>{riskLevel}</div>
              <div className="mt-3 w-full h-1.5 bg-slate-200 rounded-full overflow-hidden">
                <div className={`h-full ${riskBgColor}`} style={{ width: `${(ltv / 90) * 100}%` }} />
              </div>
            </div>
            <div className="bg-blue-50/40 p-5 rounded-[2rem] border border-blue-100 text-center flex flex-col justify-center min-h-[90px] sm:min-h-0">
              <p className="text-[9px] font-black text-slate-400 uppercase mb-1">Margin Call</p>
              <div className="text-lg sm:text-base font-black text-[#2076C7]">{formatCurrency(marginCallValue, true)}</div>
            </div>
            <div className="bg-teal-50/30 p-5 rounded-[2rem] border border-teal-100 text-center flex flex-col justify-center min-h-[90px] sm:min-h-0">
              <p className="text-[9px] font-black text-slate-400 uppercase mb-1">Top-up Value</p>
              <div className="text-lg sm:text-base font-black text-[#1CADA3]">{formatCurrency(topUpEligibility, true)}</div>
            </div>
          </div>

          {/* Future Simulator - Responsive Padding */}
          <div className="bg-[#2076C7]/5 p-5 sm:p-6 rounded-[2.5rem] border border-[#2076C7]/10">
            <div className="flex justify-between items-center mb-4">
              <div>
                <h5 className="text-xs font-black text-[#2076C7] uppercase">Growth Simulator</h5>
                <p className="text-[10px] font-bold text-slate-400">Pledge growth for higher limit</p>
              </div>
              <span className="text-lg sm:text-xl font-black text-[#1CADA3]">{formatCurrency(futurePortfolioValue, true)}</span>
            </div>
            <input 
              type="range" min={portfolioValue} max={portfolioValue * 2} value={futurePortfolioValue} 
              onChange={(e) => setFuturePortfolioValue(Number(e.target.value))}
              className="w-full h-2 rounded-lg appearance-none bg-slate-200 accent-[#1CADA3]"
            />
          </div>
        </div>
      </div>
    </div>
  );
};