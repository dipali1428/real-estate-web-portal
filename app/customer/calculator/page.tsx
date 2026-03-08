"use client";
import React, { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Calculator as CalcIcon, 
  PieChart as PieChartIcon, 
  TrendingUp, 
  Info, 
  ArrowLeft, 
  CheckCircle2, 
  ChevronDown, 
  ArrowRight,
  ShieldCheck,
  Zap,
  Plus,
  Minus
} from 'lucide-react';
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip as RechartsTooltip, Legend } from 'recharts';

// --- SUB-COMPONENTS (Dashboard Styled) ---

const SectionHeader = ({ title, subtitle }: { title: string; subtitle: string }) => (
  <div className="text-center mb-12">
    <h2 className="text-2xl md:text-3xl font-bold text-gray-800 mb-4">{title}</h2>
    <p className="text-gray-500 max-w-2xl mx-auto text-sm">{subtitle}</p>
  </div>
);

const FAQ = ({ items }: { items: { q: string; a: string }[] }) => {
  const [openIndex, setOpenIndex] = useState<number | null>(null);
  return (
    <div className="space-y-3">
      {items.map((item, i) => (
        <div key={i} className="border border-gray-100 rounded-xl overflow-hidden bg-white shadow-sm">
          <button 
            onClick={() => setOpenIndex(openIndex === i ? null : i)}
            className="w-full p-4 text-left flex justify-between items-center hover:bg-gray-50 transition-colors"
          >
            <span className="font-semibold text-gray-700 text-sm">{item.q}</span>
            {openIndex === i ? <Minus className="w-4 h-4 text-[#2076C7]" /> : <Plus className="w-4 h-4 text-gray-400" />}
          </button>
          {openIndex === i && (
            <div className="p-4 pt-0 text-gray-500 text-xs leading-relaxed border-t border-gray-50">
              {item.a}
            </div>
          )}
        </div>
      ))}
    </div>
  );
};

const CTA = ({ title, subtitle, buttonText, onClick }: any) => (
  <div className="bg-linear-to-r from-[#2076C7] to-[#1CADA3] rounded-2xl p-8 md:p-12 text-center text-white shadow-lg">
    <h2 className="text-2xl md:text-3xl font-bold mb-3">{title}</h2>
    <p className="text-white/80 mb-6 text-sm max-w-xl mx-auto">{subtitle}</p>
    <button 
      onClick={onClick}
      className="bg-white text-[#2076C7] font-bold px-6 py-3 rounded-xl transition-all flex items-center gap-2 mx-auto hover:shadow-xl"
    >
      {buttonText} <ArrowRight className="w-4 h-4" />
    </button>
  </div>
);

// --- MAIN CALCULATOR ---

const CALCULATOR_TYPES = [
  { id: 'calc-emi', label: 'EMI Calculator', icon: CalcIcon, desc: 'Monthly loan installment estimates.' },
  { id: 'calc-sip', label: 'SIP Calculator', icon: TrendingUp, desc: 'Mutual fund wealth projections.' },
  { id: 'calc-sip-emi', label: 'SIP Vs EMI', icon: Zap, desc: 'Optimize tenure for wealth creation.' },
  { id: 'calc-home-loan', label: 'Home Loan', icon: CalcIcon, desc: 'Housing finance planning.' },
  { id: 'calc-personal-loan', label: 'Personal Loan', icon: CalcIcon, desc: 'Quick personal finance estimates.' },
  { id: 'calc-business-loan', label: 'Business Loan', icon: CalcIcon, desc: 'Capital expansion planning.' },
  { id: 'calc-fd', label: 'FD Calculator', icon: PieChartIcon, desc: 'Fixed deposit maturity values.' },
  { id: 'calc-ci', label: 'Compound Interest', icon: TrendingUp, desc: 'Long-term savings growth.' },
];

const COLORS = ['#2076C7', '#1CADA3', '#f59e0b', '#ef4444'];

export default function CalculatorPage({ type = 'calc-emi', onNavigate }: any) {
  const [activeCalc, setActiveCalc] = useState(type);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const [amount, setAmount] = useState(1000000);
  const [rate, setRate] = useState(8.5);
  const [tenure, setTenure] = useState(20);
  const [sipReturn, setSipReturn] = useState(12);

  const activeData = CALCULATOR_TYPES.find(c => c.id === activeCalc) || CALCULATOR_TYPES[0];

  const results = useMemo(() => {
    const r = rate / 12 / 100;
    const n = tenure * 12;

    if (activeCalc.includes('loan') || activeCalc === 'calc-emi') {
      const emi = (amount * r * Math.pow(1 + r, n)) / (Math.pow(1 + r, n) - 1);
      const interest = (emi * n) - amount;
      return { type: 'loan', emi, secondary: interest, total: emi * n, chart: [{ name: 'Principal', value: amount }, { name: 'Interest', value: interest }] };
    } 
    
    if (activeCalc === 'calc-sip') {
      const i = rate / 12 / 100;
      const maturity = amount * ((Math.pow(1 + i, n) - 1) / i) * (1 + i);
      const wealth = maturity - (amount * n);
      return { type: 'investment', primary: maturity, secondary: wealth, total: amount * n, chart: [{ name: 'Invested', value: amount * n }, { name: 'Wealth', value: wealth }] };
    }

    if (activeCalc === 'calc-sip-emi') {
      const r_val = rate / 12 / 100;
      const emi20 = (amount * r_val * Math.pow(1 + r_val, 240)) / (Math.pow(1 + r_val, 240) - 1);
      const emi30 = (amount * r_val * Math.pow(1 + r_val, 360)) / (Math.pow(1 + r_val, 360) - 1);
      const diff = emi20 - emi30;
      const sip_r = sipReturn / 12 / 100;
      const wealth = diff * ((Math.pow(1 + sip_r, 360) - 1) / sip_r) * (1 + sip_r);
      return { type: 'sip-emi', primary: wealth, secondary: diff, total: diff * 360, chart: [{ name: 'Wealth', value: wealth }, { name: 'Savings', value: diff }] };
    }

    const factor = activeCalc === 'calc-fd' ? 4 : 1;
    const maturity = amount * Math.pow((1 + (rate / 100) / factor), (factor * tenure));
    return { type: 'investment', primary: maturity, secondary: maturity - amount, total: amount, chart: [{ name: 'Principal', value: amount }, { name: 'Interest', value: maturity - amount }] };
  }, [activeCalc, amount, rate, tenure, sipReturn]);

  const formatINR = (val: number = 0) => new Intl.NumberFormat('en-IN').format(Math.round(val));

  return (
    <div className="flex-1 p-4 sm:p-6 bg-[#f8fafc] min-h-screen pb-20">
      
      {/* Header (Reports Style) */}
      <motion.div
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        className="relative bg-linear-to-r from-[#2076C7] to-[#1CADA3] rounded-2xl p-6 mb-6 text-white"
      >
        <div className="flex items-center justify-between">
            <div>
                <h2 className="text-xl sm:text-2xl font-bold mb-2">📊 Financial Calculators</h2>
                <p className="text-sm opacity-90">Plan your investments with {activeData.label}</p>
            </div>
        </div>
      </motion.div>

      {/* Dropdown Selector (Same Pattern) */}
      <div className="mb-6 relative z-50">
          <div className="max-w-md mx-auto relative">
            <button onClick={() => setIsDropdownOpen(!isDropdownOpen)} className="w-full bg-white border border-gray-100 p-4 rounded-xl flex items-center justify-between shadow-sm hover:bg-gray-50 transition-all">
              <div className="flex items-center gap-3">
                <activeData.icon className="w-5 h-5 text-[#2076C7]" />
                <span className="font-bold text-gray-700 text-sm">{activeData.label}</span>
              </div>
              <ChevronDown className={`w-4 h-4 text-gray-400 transition-transform ${isDropdownOpen ? 'rotate-180' : ''}`} />
            </button>

            <AnimatePresence>
              {isDropdownOpen && (
                <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: 10 }} className="absolute top-full left-0 right-0 mt-2 bg-white border border-gray-100 rounded-xl shadow-lg overflow-hidden z-50 p-2">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-1">
                    {CALCULATOR_TYPES.map((calc) => (
                      <button key={calc.id} onClick={() => { setActiveCalc(calc.id); setIsDropdownOpen(false); }} className={`flex items-center gap-3 p-3 rounded-lg text-xs font-semibold transition-all ${activeCalc === calc.id ? 'bg-blue-50 text-[#2076C7]' : 'hover:bg-gray-50 text-gray-600'}`}>
                        <calc.icon className="w-4 h-4" />
                        {calc.label}
                      </button>
                    ))}
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          
          {/* Main Content Area */}
          <div className="lg:col-span-2 space-y-6">
            <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
               <h3 className="text-xs font-bold text-gray-400 uppercase tracking-widest mb-8">Inputs</h3>
               <div className="space-y-10">
                  <div className="space-y-4">
                    <div className="flex justify-between items-center text-sm font-medium">
                        <span className="text-gray-600">{activeCalc === 'calc-sip' ? 'Monthly Investment' : 'Principal Amount'}</span>
                        <span className="text-[#2076C7] font-bold">₹{formatINR(amount)}</span>
                    </div>
                    <input type="range" min="5000" max="10000000" step="5000" value={amount} onChange={(e) => setAmount(Number(e.target.value))} className="w-full h-1.5 bg-gray-100 rounded-lg appearance-none cursor-pointer accent-[#2076C7]" />
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
                    <div className="space-y-4">
                        <div className="flex justify-between items-center text-sm font-medium">
                            <span className="text-gray-600">Rate (%)</span>
                            <span className="text-gray-800 font-bold">{rate}%</span>
                        </div>
                        <input type="range" min="1" max="30" step="0.1" value={rate} onChange={(e) => setRate(Number(e.target.value))} className="w-full h-1.5 bg-gray-100 rounded-lg appearance-none cursor-pointer accent-[#2076C7]" />
                    </div>
                    <div className="space-y-4">
                        <div className="flex justify-between items-center text-sm font-medium">
                            <span className="text-gray-600">Tenure (Y)</span>
                            <span className="text-gray-800 font-bold">{tenure}y</span>
                        </div>
                        <input type="range" min="1" max="40" step="1" value={tenure} onChange={(e) => setTenure(Number(e.target.value))} className="w-full h-1.5 bg-gray-100 rounded-lg appearance-none cursor-pointer accent-[#2076C7]" />
                    </div>
                  </div>

                  {activeCalc === 'calc-sip-emi' && (
                    <div className="p-4 bg-blue-50 rounded-xl border border-blue-100 flex items-center justify-between">
                        <span className="text-xs font-bold text-blue-800 uppercase tracking-tighter">SIP Return (%)</span>
                        <input type="number" value={sipReturn} onChange={(e) => setSipReturn(Number(e.target.value))} className="w-20 bg-white border border-blue-200 rounded-lg px-2 py-1 text-sm font-bold text-blue-600 text-center" />
                    </div>
                  )}
               </div>
            </div>

            {/* KPI Cards (Reports Style) */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                <div className="bg-white rounded-2xl p-5 shadow-sm border border-gray-100">
                    <div className="text-xs text-gray-500 mb-1">{results.type === 'loan' ? 'Monthly EMI' : 'Value'}</div>
                    <div className="text-xl font-bold text-gray-800">₹{formatINR(results.type === 'loan' ? results.emi : results.primary)}</div>
                </div>
                <div className="bg-white rounded-2xl p-5 shadow-sm border border-gray-100">
                    <div className="text-xs text-gray-500 mb-1">{results.type === 'loan' ? 'Total Interest' : 'Wealth Gained'}</div>
                    <div className="text-xl font-bold text-green-600">₹{formatINR(results.secondary)}</div>
                </div>
                <div className="bg-white rounded-2xl p-5 shadow-sm border border-gray-100">
                    <div className="text-xs text-gray-500 mb-1">{results.type === 'loan' ? 'Total Payment' : 'Invested'}</div>
                    <div className="text-xl font-bold text-[#2076C7]">₹{formatINR(results.total)}</div>
                </div>
            </div>
          </div>

          {/* Right Column: Visualization */}
          <div className="space-y-6">
             <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
                <h3 className="text-xs font-bold text-gray-800 mb-6 uppercase">Breakdown</h3>
                <div className="h-56">
                    <ResponsiveContainer width="100%" height="100%">
                        <PieChart>
                            <Pie data={results.chart} cx="50%" cy="50%" innerRadius={60} outerRadius={80} paddingAngle={5} dataKey="value" cornerRadius={4}>
                                {results.chart.map((_, index) => (
                                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                                ))}
                            </Pie>
                            <RechartsTooltip formatter={(val: any) => `₹${formatINR(val)}`} contentStyle={{ borderRadius: '12px', border: 'none', fontSize: '12px' }} />
                            <Legend verticalAlign="bottom" wrapperStyle={{ fontSize: '10px' }} />
                        </PieChart>
                    </ResponsiveContainer>
                </div>
                <button className="w-full mt-6 py-3 bg-linear-to-r from-[#2076C7] to-[#1CADA3] text-white font-bold rounded-xl shadow-md text-sm">
                    Consult Advisor
                </button>
             </div>

             <div className="bg-amber-50 rounded-xl p-4 border border-amber-100 flex gap-3">
                <Info size={16} className="text-amber-600 shrink-0 mt-1" />
                <p className="text-[11px] text-amber-800 leading-relaxed font-medium">
                    {results.type === 'loan' ? "Paying just 5% extra every month can reduce your tenure by years." : "Compounding works best with time. Even a small SIP started now creates huge long-term wealth."}
                </p>
             </div>
          </div>
      </div>
    </div>
  );
}