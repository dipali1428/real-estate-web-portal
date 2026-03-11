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

const FAQS = [
  { q: 'How accurate are these calculators?', a: 'Our calculators provide highly accurate estimates based on the mathematical formulas used by most financial institutions. However, the final figures may vary slightly depending on the specific bank\'s calculation methods and processing fees.' },
  { q: 'What is EMI?', a: 'EMI stands for Equated Monthly Installment. It is a fixed amount paid by a borrower to a lender at a specified date each calendar month.' },
  { q: 'Does the interest rate remain constant?', a: 'It depends on whether you choose a fixed-rate loan or a floating-rate loan. Fixed rates remain constant, while floating rates change according to market conditions.' },
  { q: 'Can I use these for any bank?', a: 'Yes, these are general-purpose financial calculators and can be used to estimate loans and investments for any bank or financial institution in India.' }
];

const CALCULATOR_TYPES = [
  { id: 'calc-emi', label: 'EMI Calculator', icon: CalcIcon, desc: 'Calculate your Equated Monthly Installment with precision.' },
  { id: 'calc-sip', label: 'SIP Calculator', icon: TrendingUp, desc: 'Plan your mutual fund investments and estimate future wealth.' },
  { id: 'calc-sip-emi', label: 'SIP Vs EMI', icon: Zap, desc: 'Optimize tenure for wealth creation.' },
  { id: 'calc-fd', label: 'FD Calculator', icon: PieChartIcon, desc: 'Calculate the maturity amount of your fixed deposits.' },
  { id: 'calc-home-loan', label: 'Home Loan', icon: CalcIcon, desc: 'Estimate your home loan EMI and total interest payable.' },
  { id: 'calc-personal-loan', label: 'Personal Loan', icon: CalcIcon, desc: 'Calculate your personal loan EMI and repayment schedule.' },
  { id: 'calc-business-loan', label: 'Business Loan', icon: CalcIcon, desc: 'Plan your business expansion with our business loan calculator.' },
  { id: 'calc-ci', label: 'Compound Interest', icon: TrendingUp, desc: 'See how your money grows over time with compound interest.' },
];

const COLORS = ['#2076C7', '#1CADA3', '#f59e0b', '#ef4444'];

export default function CalculatorPage({ type = 'calc-emi', onNavigate }: any) {
  const [activeCalc, setActiveCalc] = useState(type);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  // Shared State
  const [amount, setAmount] = useState(1000000);
  const [rate, setRate] = useState(8.5);
  const [tenure, setTenure] = useState(20);
  
  // SIP Specific State
  const [monthlyInvestment, setMonthlyInvestment] = useState(10000);
  const [expectedReturn, setExpectedReturn] = useState(12);
  const [sipTenure, setSipTenure] = useState(10);
  
  // SIP Vs EMI Specific State
  const [sipReturn, setSipReturn] = useState(12);

  const activeData = CALCULATOR_TYPES.find(c => c.id === activeCalc) || CALCULATOR_TYPES[0];

  const results = useMemo(() => {
    if (activeCalc.includes('loan') || activeCalc === 'calc-emi') {
      const r = rate / 12 / 100;
      const n = tenure * 12;
      const emi = r === 0 ? Math.round(amount / n) : Math.round((amount * r * Math.pow(1 + r, n)) / (Math.pow(1 + r, n) - 1));
      const totalPayment = emi * n;
      const totalInterest = totalPayment - amount;
      
      return {
        type: 'loan',
        emi,
        secondary: totalInterest,
        total: totalPayment,
        principal: amount,
        chart: [
          { name: 'Principal', value: amount },
          { name: 'Interest', value: totalInterest }
        ]
      };
    } else if (activeCalc === 'calc-sip') {
      const i = expectedReturn / 12 / 100;
      const n = sipTenure * 12;
      const investedAmount = monthlyInvestment * n;
      const estimatedReturns = Math.round(monthlyInvestment * ((Math.pow(1 + i, n) - 1) / i) * (1 + i));
      const wealthGained = estimatedReturns - investedAmount;

      return {
        type: 'investment',
        primary: estimatedReturns,
        secondary: wealthGained,
        total: investedAmount,
        chart: [
          { name: 'Invested', value: investedAmount },
          { name: 'Est. Returns', value: wealthGained }
        ]
      };
    } else if (activeCalc === 'calc-sip-emi') {
      const r_val = rate / 12 / 100;
      const emi20 = (amount * r_val * Math.pow(1 + r_val, 240)) / (Math.pow(1 + r_val, 240) - 1);
      const emi30 = (amount * r_val * Math.pow(1 + r_val, 360)) / (Math.pow(1 + r_val, 360) - 1);
      const diff = emi20 - emi30;
      const sip_r = sipReturn / 12 / 100;
      const wealth = diff * ((Math.pow(1 + sip_r, 360) - 1) / sip_r) * (1 + sip_r);
      return { 
        type: 'sip-emi', 
        primary: wealth, 
        secondary: diff, 
        total: diff * 360, 
        chart: [
          { name: 'Wealth', value: wealth },
          { name: 'Savings', value: diff * 360 }
        ] 
      };
    } else if (activeCalc === 'calc-fd' || activeCalc === 'calc-ci') {
      const n = 4; // Quarterly compounding
      const r = rate / 100;
      const t = tenure;
      const maturityAmount = Math.round(amount * Math.pow(1 + (r / n), n * t));
      const totalInterest = maturityAmount - amount;

      return {
        type: 'investment',
        primary: maturityAmount,
        secondary: totalInterest,
        total: amount,
        chart: [
          { name: 'Principal', value: amount },
          { name: 'Interest', value: totalInterest }
        ]
      };
    }
    return null;
  }, [activeCalc, amount, rate, tenure, monthlyInvestment, expectedReturn, sipTenure, sipReturn]);

  const formatINR = (val: number = 0) => new Intl.NumberFormat('en-IN').format(Math.round(val));

  const renderInputs = () => {
    if (activeCalc === 'calc-sip') {
      return (
        <>
          <div className="space-y-4">
            <div className="flex justify-between items-center text-sm font-medium">
              <span className="text-gray-600">Monthly Investment (₹)</span>
              <input 
                type="number" 
                value={monthlyInvestment} 
                onChange={(e) => setMonthlyInvestment(Number(e.target.value))}
                className="w-24 px-2 py-1 bg-gray-50 border border-gray-200 rounded-lg font-bold text-[#2076C7] text-right text-sm focus:ring-2 focus:ring-[#2076C7]/20 focus:border-[#2076C7] outline-none transition-all"
              />
            </div>
            <input 
              type="range" min="500" max="1000000" step="500"
              value={monthlyInvestment}
              onChange={(e) => setMonthlyInvestment(Number(e.target.value))}
              className="w-full h-1.5 bg-gray-100 rounded-lg appearance-none cursor-pointer accent-[#2076C7]"
            />
            <div className="flex justify-between text-xs font-medium text-gray-400">
              <span>₹500</span>
              <span>₹10,00,000</span>
            </div>
          </div>

          <div className="space-y-4">
            <div className="flex justify-between items-center text-sm font-medium">
              <span className="text-gray-600">Expected Return (% p.a)</span>
              <input 
                type="number" 
                value={expectedReturn} 
                onChange={(e) => setExpectedReturn(Number(e.target.value))}
                className="w-24 px-2 py-1 bg-gray-50 border border-gray-200 rounded-lg font-bold text-[#2076C7] text-right text-sm focus:ring-2 focus:ring-[#2076C7]/20 focus:border-[#2076C7] outline-none transition-all"
              />
            </div>
            <input 
              type="range" min="1" max="30" step="0.1"
              value={expectedReturn}
              onChange={(e) => setExpectedReturn(Number(e.target.value))}
              className="w-full h-1.5 bg-gray-100 rounded-lg appearance-none cursor-pointer accent-[#2076C7]"
            />
            <div className="flex justify-between text-xs font-medium text-gray-400">
              <span>1%</span>
              <span>30%</span>
            </div>
          </div>

          <div className="space-y-4">
            <div className="flex justify-between items-center text-sm font-medium">
              <span className="text-gray-600">Time Period (Years)</span>
              <input 
                type="number" 
                value={sipTenure} 
                onChange={(e) => setSipTenure(Number(e.target.value))}
                className="w-24 px-2 py-1 bg-gray-50 border border-gray-200 rounded-lg font-bold text-[#2076C7] text-right text-sm focus:ring-2 focus:ring-[#2076C7]/20 focus:border-[#2076C7] outline-none transition-all"
              />
            </div>
            <input 
              type="range" min="1" max="40" step="1"
              value={sipTenure}
              onChange={(e) => setSipTenure(Number(e.target.value))}
              className="w-full h-1.5 bg-gray-100 rounded-lg appearance-none cursor-pointer accent-[#2076C7]"
            />
            <div className="flex justify-between text-xs font-medium text-gray-400">
              <span>1 Year</span>
              <span>40 Years</span>
            </div>
          </div>
        </>
      );
    }

    // Default Loan / FD Inputs
    return (
      <>
        <div className="space-y-4">
          <div className="flex justify-between items-center text-sm font-medium">
            <span className="text-gray-600">{activeCalc === 'calc-fd' || activeCalc === 'calc-ci' ? 'Investment Amount (₹)' : 'Loan Amount (₹)'}</span>
            <input 
              type="number" 
              value={amount} 
              onChange={(e) => setAmount(Number(e.target.value))}
              className="w-24 px-2 py-1 bg-gray-50 border border-gray-200 rounded-lg font-bold text-[#2076C7] text-right text-sm focus:ring-2 focus:ring-[#2076C7]/20 focus:border-[#2076C7] outline-none transition-all"
            />
          </div>
          <input 
            type="range" min="10000" max="50000000" step="10000"
            value={amount}
            onChange={(e) => setAmount(Number(e.target.value))}
            className="w-full h-1.5 bg-gray-100 rounded-lg appearance-none cursor-pointer accent-[#2076C7]"
          />
          <div className="flex justify-between text-xs font-medium text-gray-400">
            <span>₹10,000</span>
            <span>₹5,00,00,000</span>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
          <div className="space-y-4">
            <div className="flex justify-between items-center text-sm font-medium">
              <span className="text-gray-600">Rate (% p.a)</span>
              <input 
                type="number" 
                value={rate} 
                onChange={(e) => setRate(Number(e.target.value))}
                className="w-20 px-2 py-1 bg-gray-50 border border-gray-200 rounded-lg font-bold text-[#2076C7] text-right text-sm focus:ring-2 focus:ring-[#2076C7]/20 focus:border-[#2076C7] outline-none transition-all"
              />
            </div>
            <input 
              type="range" min="1" max="30" step="0.1"
              value={rate}
              onChange={(e) => setRate(Number(e.target.value))}
              className="w-full h-1.5 bg-gray-100 rounded-lg appearance-none cursor-pointer accent-[#2076C7]"
            />
            <div className="flex justify-between text-xs font-medium text-gray-400">
              <span>1%</span>
              <span>30%</span>
            </div>
          </div>

          <div className="space-y-4">
            <div className="flex justify-between items-center text-sm font-medium">
              <span className="text-gray-600">Tenure (Years)</span>
              <input 
                type="number" 
                value={tenure} 
                onChange={(e) => setTenure(Number(e.target.value))}
                className="w-20 px-2 py-1 bg-gray-50 border border-gray-200 rounded-lg font-bold text-[#2076C7] text-right text-sm focus:ring-2 focus:ring-[#2076C7]/20 focus:border-[#2076C7] outline-none transition-all"
              />
            </div>
            <input 
              type="range" min="1" max="30" step="1"
              value={tenure}
              onChange={(e) => setTenure(Number(e.target.value))}
              className="w-full h-1.5 bg-gray-100 rounded-lg appearance-none cursor-pointer accent-[#2076C7]"
            />
            <div className="flex justify-between text-xs font-medium text-gray-400">
              <span>1 Year</span>
              <span>30 Years</span>
            </div>
          </div>
        </div>
      </>
    );
  };

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
            <h2 className="text-xl sm:text-2xl font-bold mb-2">📊 {activeData.label}</h2>
            <p className="text-sm opacity-90">{activeData.desc}</p>
          </div>
        </div>
      </motion.div>

      {/* Dropdown Selector (Reference Pattern) */}
      <div className="mb-6 relative z-50">
        <div className="max-w-md mx-auto relative">
          <button 
            onClick={() => setIsDropdownOpen(!isDropdownOpen)} 
            className="w-full bg-white border-2 border-gray-100 p-4 rounded-xl flex items-center justify-between shadow-sm hover:border-[#2076C7]/30 transition-all"
          >
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-gray-50 rounded-xl flex items-center justify-center">
                <activeData.icon className="w-5 h-5 text-[#2076C7]" />
              </div>
              <span className="font-bold text-gray-800 text-base">{activeData.label}</span>
            </div>
            <ChevronDown className={`w-5 h-5 text-gray-400 transition-transform ${isDropdownOpen ? 'rotate-180' : ''}`} />
          </button>

          <AnimatePresence>
            {isDropdownOpen && (
              <motion.div 
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 10 }}
                className="absolute top-full left-0 right-0 mt-2 bg-white border border-gray-100 rounded-xl shadow-lg overflow-hidden z-50"
              >
                {CALCULATOR_TYPES.map((calc) => (
                  <button
                    key={calc.id}
                    onClick={() => {
                      setActiveCalc(calc.id);
                      setIsDropdownOpen(false);
                    }}
                    className={`w-full text-left p-4 flex items-center gap-3 hover:bg-gray-50 transition-colors ${activeCalc === calc.id ? 'bg-gray-50' : ''}`}
                  >
                    <div className={`w-8 h-8 rounded-lg flex items-center justify-center ${activeCalc === calc.id ? 'bg-[#2076C7] text-white' : 'bg-gray-100 text-gray-500'}`}>
                      <calc.icon className="w-4 h-4" />
                    </div>
                    <span className={`font-medium ${activeCalc === calc.id ? 'text-[#2076C7]' : 'text-gray-700'}`}>{calc.label}</span>
                    {activeCalc === calc.id && <CheckCircle2 className="w-4 h-4 text-[#2076C7] ml-auto" />}
                  </button>
                ))}
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
            <div className="space-y-8">
              {renderInputs()}
              
              {activeCalc === 'calc-sip-emi' && (
                <div className="p-4 bg-blue-50 rounded-xl border border-blue-100 flex items-center justify-between">
                  <span className="text-xs font-bold text-blue-800 uppercase tracking-tighter">SIP Return (%)</span>
                  <input 
                    type="number" 
                    value={sipReturn} 
                    onChange={(e) => setSipReturn(Number(e.target.value))} 
                    className="w-20 bg-white border border-blue-200 rounded-lg px-2 py-1 text-sm font-bold text-blue-600 text-center focus:ring-2 focus:ring-blue-200 outline-none" 
                  />
                </div>
              )}
            </div>
          </div>

          {/* KPI Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            <div className="bg-white rounded-2xl p-5 shadow-sm border border-gray-100">
              <div className="text-xs text-gray-500 mb-1">
                {results?.type === 'loan' ? 'Monthly EMI' : 
                 results?.type === 'sip-emi' ? 'Wealth Created' : 'Maturity Value'}
              </div>
              <div className="text-xl font-bold text-gray-800">
                ₹{formatINR(results?.type === 'loan' ? results.emi : results?.primary)}
              </div>
            </div>
            <div className="bg-white rounded-2xl p-5 shadow-sm border border-gray-100">
              <div className="text-xs text-gray-500 mb-1">
                {results?.type === 'loan' ? 'Total Interest' : 
                 results?.type === 'sip-emi' ? 'Monthly Savings' : 'Wealth Gained'}
              </div>
              <div className="text-xl font-bold text-green-600">
                ₹{formatINR(results?.secondary)}
              </div>
            </div>
            <div className="bg-white rounded-2xl p-5 shadow-sm border border-gray-100">
              <div className="text-xs text-gray-500 mb-1">
                {results?.type === 'loan' ? 'Total Payment' : 
                 results?.type === 'sip-emi' ? 'Total Savings' : 'Invested Amount'}
              </div>
              <div className="text-xl font-bold text-[#2076C7]">
                ₹{formatINR(results?.total)}
              </div>
            </div>
          </div>
        </div>

        {/* Right Column: Visualization */}
        <div className="space-y-6">
          <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
            <h3 className="text-xs font-bold text-gray-800 mb-6 uppercase">Breakdown</h3>
            <div className="h-56">
              {results && (
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie 
                      data={results.chart} 
                      cx="50%" 
                      cy="50%" 
                      innerRadius={60} 
                      outerRadius={80} 
                      paddingAngle={5} 
                      dataKey="value" 
                      cornerRadius={4}
                    >
                      {results.chart.map((_, index) => (
                        <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                      ))}
                    </Pie>
                    <RechartsTooltip 
                      formatter={(val: any) => `₹${formatINR(val)}`} 
                      contentStyle={{ borderRadius: '12px', border: 'none', fontSize: '12px' }} 
                    />
                    <Legend verticalAlign="bottom" wrapperStyle={{ fontSize: '10px' }} />
                  </PieChart>
                </ResponsiveContainer>
              )}
            </div>
            <button 
              onClick={() => onNavigate('contact')}
              className="w-full mt-6 py-3 bg-linear-to-r from-[#2076C7] to-[#1CADA3] text-white font-bold rounded-xl shadow-md text-sm hover:shadow-lg transition-all"
            >
              Consult Advisor
            </button>
          </div>

          <div className="bg-amber-50 rounded-xl p-4 border border-amber-100 flex gap-3">
            <Info size={16} className="text-amber-600 shrink-0 mt-1" />
            <p className="text-[11px] text-amber-800 leading-relaxed font-medium">
              {results?.type === 'loan' ? 
                "Paying just 5% extra every month can reduce your loan tenure by years and save lakhs in interest." : 
                results?.type === 'sip-emi' ?
                "The power of compounding: Even small monthly savings from EMI differences can create significant wealth over 30 years." :
                "Compounding works best with time. Even a small SIP started now creates huge long-term wealth."}
            </p>
          </div>
        </div>
      </div>

      {/* Benefits Section */}
      <section className="mt-16">
        <SectionHeader 
          title="Why Use Our Financial Calculators?" 
          subtitle="Make informed decisions with our precise and easy-to-use planning tools."
        />
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-white p-6 rounded-xl border border-gray-100 shadow-sm hover:shadow-md transition-all">
            <div className="w-10 h-10 bg-gray-50 rounded-lg flex items-center justify-center mb-4">
              <TrendingUp className="w-5 h-5 text-[#2076C7]" />
            </div>
            <h4 className="text-base font-bold text-gray-800 mb-2">Precision Planning</h4>
            <p className="text-xs text-gray-500 leading-relaxed">Get exact figures for your monthly outgoings and total interest, helping you budget with confidence.</p>
          </div>
          <div className="bg-white p-6 rounded-xl border border-gray-100 shadow-sm hover:shadow-md transition-all">
            <div className="w-10 h-10 bg-gray-50 rounded-lg flex items-center justify-center mb-4">
              <CalcIcon className="w-5 h-5 text-[#2076C7]" />
            </div>
            <h4 className="text-base font-bold text-gray-800 mb-2">Compare Scenarios</h4>
            <p className="text-xs text-gray-500 leading-relaxed">Easily adjust interest rates and tenures to see how different loan options impact your finances.</p>
          </div>
          <div className="bg-white p-6 rounded-xl border border-gray-100 shadow-sm hover:shadow-md transition-all">
            <div className="w-10 h-10 bg-gray-50 rounded-lg flex items-center justify-center mb-4">
              <CheckCircle2 className="w-5 h-5 text-[#2076C7]" />
            </div>
            <h4 className="text-base font-bold text-gray-800 mb-2">100% Free</h4>
            <p className="text-xs text-gray-500 leading-relaxed">Access all our professional-grade financial tools for free, with no registration required.</p>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="mt-16">
        <SectionHeader 
          title="Frequently Asked Questions" 
          subtitle="Got questions about our calculators? We've got answers."
        />
        <div className="max-w-3xl mx-auto">
          <FAQ items={FAQS} />
        </div>
      </section>

      {/* CTA Section */}
      <section className="mt-16">
        <CTA 
          title="Need Professional Financial Advice?" 
          subtitle="Our experts can help you choose the right loan or investment plan based on your unique financial goals."
          buttonText="Talk to an Expert"
          onClick={() => onNavigate('contact')}
        />
      </section>
    </div>
  );
}