"use client";
import React, { useState, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { TrendingUp, PieChart, Calculator, Home, User, Building2, LineChart, Timer, ChevronDown, CheckCircle2 } from 'lucide-react';
import { useRouter } from "next/navigation";

// Calculator options for dropdown
const CALCULATOR_OPTIONS = [
  { id: 'emi', label: 'EMI Calculator', icon: Calculator, desc: 'Calculate your Equated Monthly Installment with precision.', path: '/page/emi' },
  { id: 'sip', label: 'SIP Calculator', icon: TrendingUp, desc: 'Plan your mutual fund investments and estimate future wealth.', path: '/page/sip' },
  { id: 'sipVsEmi', label: 'EMI VS SIP', icon: Timer, desc: 'Compare how different loan tenures affect your finances.', path: '/page/sipVsEmi' },
  { id: 'homeloan', label: 'Home Loan', icon: Home, desc: 'Estimate your home loan EMI and total interest payable.', path: '/page/homeloan' },
  { id: 'personalloan', label: 'Personal Loan', icon: User, desc: 'Calculate your personal loan EMI and repayment schedule.', path: '/page/personalloan' },
  { id: 'businessloan', label: 'Business Loan', icon: Building2, desc: 'Plan your business expansion with our business loan calculator.', path: '/page/businessloan' },
  { id: 'fd', label: 'FD Calculator', icon: PieChart, desc: 'Calculate the maturity amount of your fixed deposits.', path: '/page/fd' },
  { id: 'CompoundInterest', label: 'Compound Interest', icon: LineChart, desc: 'See how your money grows over time with compound interest.', path: '/page/CompoundInterest' },
];

// =============================================
// CONTENT ONLY VERSION (no header, no dropdown)
// =============================================
export const SIPCalculatorContent: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'sip' | 'lumpsum'>('sip');

  // SIP Calculator State
  const [sipAmount, setSipAmount] = useState(5000);
  const [sipDuration, setSipDuration] = useState(10);
  const [sipReturn, setSipReturn] = useState(12);

  // Lumpsum Calculator State
  const [lumpsumAmount, setLumpsumAmount] = useState(100000);
  const [lumpsumDuration, setLumpsumDuration] = useState(10);
  const [lumpsumReturn, setLumpsumReturn] = useState(12);

  // Results State
  const [sipResults, setSipResults] = useState({
    totalInvestment: 600000,
    estimatedReturns: 461384,
    totalValue: 1061384
  });

  const [lumpsumResults, setLumpsumResults] = useState({
    totalInvestment: 100000,
    estimatedReturns: 210585,
    totalValue: 310585
  });

  // Format currency function
  const formatCurrency = useCallback((amount: number): string => {
    if (amount >= 10000000) {
      return '₹' + (amount / 10000000).toFixed(1) + 'Cr';
    } else if (amount >= 100000) {
      return '₹' + (amount / 100000).toFixed(1) + 'L';
    } else if (amount >= 1000) {
      return '₹' + (amount / 1000).toFixed(0) + 'K';
    }
    return '₹' + amount.toLocaleString('en-IN');
  }, []);

  // Calculate SIP returns
  const calculateSIP = useCallback((monthlyInvestment: number, years: number, annualReturn: number) => {
    const months = years * 12;
    const monthlyRate = annualReturn / 100 / 12;

    const futureValue = monthlyInvestment *
      ((Math.pow(1 + monthlyRate, months) - 1) / monthlyRate) *
      (1 + monthlyRate);

    const totalInvestment = monthlyInvestment * months;
    const estimatedReturns = futureValue - totalInvestment;

    return {
      totalInvestment,
      estimatedReturns,
      totalValue: futureValue
    };
  }, []);

  // Calculate Lumpsum returns
  const calculateLumpsum = useCallback((investment: number, years: number, annualReturn: number) => {
    const rate = annualReturn / 100;
    const futureValue = investment * Math.pow(1 + rate, years);
    const estimatedReturns = futureValue - investment;

    return {
      totalInvestment: investment,
      estimatedReturns,
      totalValue: futureValue
    };
  }, []);

  // Update SIP calculations
  useEffect(() => {
    const results = calculateSIP(sipAmount, sipDuration, sipReturn);
    setSipResults(results);
  }, [sipAmount, sipDuration, sipReturn, calculateSIP]);

  // Update Lumpsum calculations
  useEffect(() => {
    const results = calculateLumpsum(lumpsumAmount, lumpsumDuration, lumpsumReturn);
    setLumpsumResults(results);
  }, [lumpsumAmount, lumpsumDuration, lumpsumReturn, calculateLumpsum]);

  // Calculate bar heights
  const getBarHeight = (value: number, maxValue: number): number => {
    const chartHeight = 200;
    return (value / maxValue) * chartHeight;
  };

  const maxChartValue = Math.max(sipResults.totalValue, lumpsumResults.totalValue);
  const sipBarHeight = getBarHeight(sipResults.totalValue, maxChartValue);
  const lumpsumBarHeight = getBarHeight(lumpsumResults.totalValue, maxChartValue);

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="bg-white rounded-2xl shadow-xl overflow-hidden max-w-6xl mx-auto">
        <div className="p-6 lg:p-8 font-sans">

          {/* Tabs */}
          <div className="flex bg-gray-100 rounded-xl p-1 mb-8 max-w-md mx-auto">
            <button
              className={`flex-1 py-3 px-5 text-center cursor-pointer rounded-lg font-semibold transition-all duration-300 flex items-center justify-center gap-2 ${activeTab === 'sip'
                ? 'bg-[#1CADA3] text-white shadow-md'
                : 'text-gray-600 hover:text-gray-800'
                }`}
              onClick={() => setActiveTab('sip')}
            >
              <i className="fas fa-chart-line text-sm"></i>
              <span>SIP Calculator</span>
            </button>

            <button
              className={`flex-1 py-3 px-5 text-center cursor-pointer rounded-lg font-semibold transition-all duration-300 flex items-center justify-center gap-2 ${activeTab === 'lumpsum'
                ? 'bg-[#1CADA3] text-white shadow-md'
                : 'text-gray-600 hover:text-gray-800'
                }`}
              onClick={() => setActiveTab('lumpsum')}
            >
              <i className="fas fa-coins text-sm"></i>
              <span>Lumpsum Calculator</span>
            </button>
          </div>

          {/* SIP Calculator */}
          {activeTab === 'sip' && (
            <div className="animate-fade-in">
              <div className="flex flex-col lg:flex-row gap-8">

                {/* Input Card */}
                <div className="flex-1 bg-white rounded-xl border border-gray-200 p-6">
                  <div className="flex items-center mb-6 pb-4 border-b border-gray-200">
                    <div className="w-12 h-12 bg-teal-50 rounded-lg flex items-center justify-center text-teal-500 mr-4">
                      <i className="fas fa-piggy-bank text-2xl"></i>
                    </div>
                    <div>
                      <h2 className="text-xl font-bold text-gray-800">SIP Calculator</h2>
                      <p className="text-sm text-gray-600">Calculate returns on your monthly investments</p>
                    </div>
                  </div>

                  {/* Monthly Investment */}
                  <div className="mb-6">
                    <div className="flex justify-between mb-2">
                      <label className="block text-[#2076C7] font-semibold text-sm">Monthly Investment</label>
                      <span className="font-bold font-sans text-[#1CADA3] text-sm">{formatCurrency(sipAmount)}</span>
                    </div>
                    <input
                      type="range"
                      min="500"
                      max="100000"
                      step="500"
                      value={sipAmount}
                      onChange={(e) => setSipAmount(Number(e.target.value))}
                      className="w-full h-2 bg-gray-300 rounded-lg cursor-pointer"
                    />
                    <div className="flex justify-between mt-1 text-xs text-gray-600">
                      <span>₹500</span>
                      <span>₹1,00,000</span>
                    </div>
                  </div>

                  {/* Investment Period */}
                  <div className="mb-6">
                    <div className="flex justify-between mb-2">
                      <label className="block text-[#2076C7] font-semibold text-sm">Investment Period</label>
                      <span className="font-bold font-sans text-[#1CADA3] text-sm">{sipDuration} Years</span>
                    </div>
                    <input
                      type="range"
                      min="1"
                      max="30"
                      value={sipDuration}
                      onChange={(e) => setSipDuration(Number(e.target.value))}
                      className="w-full h-2 bg-gray-300 rounded-lg cursor-pointer"
                    />
                    <div className="flex justify-between mt-1 text-xs text-gray-600">
                      <span>1 Year</span>
                      <span>30 Years</span>
                    </div>
                  </div>

                  {/* Expected Return */}
                  <div className="mb-6">
                    <div className="flex justify-between mb-2">
                      <label className="block text-[#2076C7] font-semibold text-sm">Expected Annual Return</label>
                      <span className="font-bold font-sans text-[#1CADA3] text-sm">{sipReturn}%</span>
                    </div>
                    <input
                      type="range"
                      min="1"
                      max="30"
                      step="0.1"
                      value={sipReturn}
                      onChange={(e) => setSipReturn(Number(e.target.value))}
                      className="w-full h-2 bg-gray-300 rounded-lg cursor-pointer"
                    />
                    <div className="flex justify-between mt-1 text-xs text-gray-600">
                      <span>1%</span>
                      <span>30%</span>
                    </div>
                  </div>
                </div>

                {/* Results Card */}
                <div className="flex-1 bg-gray-50 rounded-xl shadow-sm border-l-4 border-[#1CADA3] p-6">
                  <h3 className="text-[#2076C7] font-semibold mb-4 text-lg flex items-center gap-2">
                    <i className="fas fa-chart-pie"></i>
                    <span>Investment Summary</span>
                  </h3>
                  <div className="space-y-4">
                    <div className="flex justify-between pb-3 border-b border-gray-200">
                      <span className="text-gray-600">Total Investment</span>
                      <span className="font-medium font-sans text-[#1CADA3]">{formatCurrency(sipResults.totalInvestment)}</span>
                    </div>
                    <div className="flex justify-between pb-3 border-b border-gray-200">
                      <span className="text-gray-600">Est. Returns</span>
                      <span className="font-medium font-sans text-[#1CADA3]">{formatCurrency(sipResults.estimatedReturns)}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Total Value</span>
                      <span className="font-medium font-sans text-[#1CADA3] text-lg">{formatCurrency(sipResults.totalValue)}</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Lumpsum Calculator */}
          {activeTab === 'lumpsum' && (
            <div className="animate-fade-in">
              <div className="flex flex-col lg:flex-row gap-8">

                {/* Input Card */}
                <div className="flex-1 bg-white rounded-xl border border-gray-200 p-6">
                  <div className="flex items-center mb-6 pb-4 border-b border-gray-200">
                    <div className="w-12 h-12 bg-blue-50 rounded-lg flex items-center justify-center text-blue-600 mr-4">
                      <i className="fas fa-hand-holding-usd text-2xl"></i>
                    </div>
                    <div>
                      <h2 className="text-xl font-bold text-gray-800">Lumpsum Calculator</h2>
                      <p className="text-sm text-gray-600">Calculate returns on your one-time investment</p>
                    </div>
                  </div>

                  {/* Investment Amount */}
                  <div className="mb-6">
                    <div className="flex justify-between mb-2">
                      <label className="block text-[#2076C7] font-semibold text-sm">Investment Amount</label>
                      <span className="font-bold font-sans text-[#1CADA3] text-sm">{formatCurrency(lumpsumAmount)}</span>
                    </div>
                    <input
                      type="range"
                      min="1000"
                      max="5000000"
                      step="1000"
                      value={lumpsumAmount}
                      onChange={(e) => setLumpsumAmount(Number(e.target.value))}
                      className="w-full h-2 bg-gray-300 rounded-lg cursor-pointer"
                    />
                    <div className="flex justify-between mt-1 text-xs text-gray-600">
                      <span>₹1,000</span>
                      <span>₹50,00,000</span>
                    </div>
                  </div>

                  {/* Investment Period */}
                  <div className="mb-6">
                    <div className="flex justify-between mb-2">
                      <label className="block text-[#2076C7] font-semibold text-sm">Investment Period</label>
                      <span className="font-bold font-sans text-[#1CADA3] text-sm">{lumpsumDuration} Years</span>
                    </div>
                    <input
                      type="range"
                      min="1"
                      max="30"
                      value={lumpsumDuration}
                      onChange={(e) => setLumpsumDuration(Number(e.target.value))}
                      className="w-full h-2 bg-gray-300 rounded-lg cursor-pointer"
                    />
                    <div className="flex justify-between mt-1 text-xs text-gray-600">
                      <span>1 Year</span>
                      <span>30 Years</span>
                    </div>
                  </div>

                  {/* Expected Return */}
                  <div className="mb-6">
                    <div className="flex justify-between mb-2">
                      <label className="block text-[#2076C7] font-semibold text-sm">Expected Annual Return</label>
                      <span className="font-bold font-sans text-[#1CADA3] text-sm">{lumpsumReturn}%</span>
                    </div>
                    <input
                      type="range"
                      min="1"
                      max="30"
                      step="0.1"
                      value={lumpsumReturn}
                      onChange={(e) => setLumpsumReturn(Number(e.target.value))}
                      className="w-full h-2 bg-gray-300 rounded-lg cursor-pointer"
                    />
                    <div className="flex justify-between mt-1 text-xs text-gray-600">
                      <span>1%</span>
                      <span>30%</span>
                    </div>
                  </div>
                </div>

                {/* Results Card */}
                <div className="flex-1 bg-gray-50 rounded-xl shadow-sm border-l-4 border-[#1CADA3] p-6">
                  <h3 className="text-[#2076C7] font-semibold mb-4 text-lg flex items-center gap-2">
                    <i className="fas fa-chart-pie"></i>
                    <span>Investment Summary</span>
                  </h3>
                  <div className="space-y-4">
                    <div className="flex justify-between pb-3 border-b border-gray-200">
                      <span className="text-gray-600">Total Investment</span>
                      <span className="font-medium font-sans text-[#1CADA3]">{formatCurrency(lumpsumResults.totalInvestment)}</span>
                    </div>
                    <div className="flex justify-between pb-3 border-b border-gray-200">
                      <span className="text-gray-600">Est. Returns</span>
                      <span className="font-medium font-sans text-[#1CADA3]">{formatCurrency(lumpsumResults.estimatedReturns)}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Total Value</span>
                      <span className="font-medium font-sans text-[#1CADA3] text-lg">{formatCurrency(lumpsumResults.totalValue)}</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Comparison Chart */}
          <div className="bg-white rounded-xl border shadow-md p-6 mt-8">
            <h2 className="text-lg font-semibold text-gray-800 mb-4 text-center flex items-center justify-center gap-2">
              <i className="fas fa-chart-bar text-[#2076C7]"></i>
              <span>Investment Comparison</span>
            </h2>
            <div className="flex items-end justify-center gap-16 py-6">
              {/* SIP Bar */}
              <div className="flex flex-col items-center">
                <div
                  className="w-16 bg-gradient-to-t from-[#1CADA3] to-[#1CADA3] rounded-t-lg relative shadow-sm"
                  style={{ height: `${sipBarHeight}px` }}
                >
                  <div className="absolute -top-8 left-0 w-full text-center font-bold font-sans text-gray-800 text-sm">
                    {formatCurrency(sipResults.totalValue)}
                  </div>
                </div>
                <div className="mt-3 text-sm font-semibold text-gray-700 flex items-center gap-1">
                  <i className="fas fa-chart-line text-[#1CADA3] text-xs"></i>
                  <span>SIP Investment</span>
                </div>
              </div>

              {/* Lumpsum Bar */}
              <div className="flex flex-col items-center">
                <div
                  className="w-16 bg-gradient-to-t from-[#2076C7] to-[#2076C7] rounded-t-lg relative shadow-sm"
                  style={{ height: `${lumpsumBarHeight}px` }}
                >
                  <div className="absolute -top-8 left-0 w-full text-center font-bold font-sans text-gray-800 text-sm">
                    {formatCurrency(lumpsumResults.totalValue)}
                  </div>
                </div>
                <div className="mt-3 text-sm font-semibold text-gray-700 flex items-center gap-1">
                  <i className="fas fa-coins text-[#2076C7] text-xs"></i>
                  <span>Lumpsum Investment</span>
                </div>
              </div>
            </div>

            {/* Legend */}
            <div className="flex justify-center gap-8 mt-6">
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 bg-[#1CADA3] rounded"></div>
                <span className="text-xs text-gray-600">SIP Investment</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 bg-[#2076C7] rounded"></div>
                <span className="text-xs text-gray-600">Lumpsum Investment</span>
              </div>
            </div>
          </div>

          {/* Metric Cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8 mt-8 ">
            <div className="bg-white rounded-xl border shadow-md p-4 text-center hover:shadow-lg transition-shadow">
              <div className="w-10 h-10 bg-teal-50 rounded-full flex items-center justify-center mx-auto mb-2">
                <i className="fas fa-rocket text-[#1CADA3] text-lg"></i>
              </div>
              <div className="text-xs text-gray-600 mb-1">Wealth Gain</div>
              <div className="font-bold text-lg font-sans text-[#1CADA3]">
                {formatCurrency(activeTab === 'sip' ? sipResults.estimatedReturns : lumpsumResults.estimatedReturns)}
              </div>
            </div>

            <div className="bg-white rounded-xl border shadow-md p-4 text-center hover:shadow-lg transition-shadow">
              <div className="w-10 h-10 bg-teal-50 rounded-full flex items-center justify-center mx-auto mb-2">
                <i className="fas fa-percentage text-[#1CADA3] text-lg"></i>
              </div>
              <div className="text-xs text-gray-600 mb-1">Annualized Return</div>
              <div className="font-bold text-lg font-sans text-[#1CADA3]">
                {activeTab === 'sip' ? sipReturn : lumpsumReturn}%
              </div>
            </div>

            <div className="bg-white rounded-xl border shadow-md p-4 text-center hover:shadow-lg transition-shadow">
              <div className="w-10 h-10 bg-teal-50 rounded-full flex items-center justify-center mx-auto mb-2">
                <i className="fas fa-calendar-alt text-[#1CADA3] text-lg"></i>
              </div>
              <div className="text-xs text-gray-600 mb-1">Investment Period</div>
              <div className="font-bold text-lg font-sans text-[#1CADA3]">
                {activeTab === 'sip' ? sipDuration : lumpsumDuration} Years
              </div>
            </div>
          </div>

          {/* Key Insights Section */}
          <div className="bg-white rounded-xl border shadow-md p-5 mt-8">
            <h2 className="text-base font-semibold text-gray-800 mb-2 flex items-center gap-2">
              Key Insights
            </h2>

            <div className="text-gray-700 leading-relaxed text-xs">
              <ul className="list-disc pl-4 space-y-1.5">
                <li>
                  <span className="font-medium">Total Investment</span> - Your total investment amount is{' '}
                  <span className="bg-blue-50 px-1.5 py-0.5 rounded font-medium font-sans text-xs">
                    {formatCurrency(activeTab === 'sip' ? sipResults.totalInvestment : lumpsumResults.totalInvestment)}
                  </span>
                </li>

                <li>
                  <span className="font-medium">Estimated Returns</span> - You can expect to earn{' '}
                  <span className="bg-blue-50 px-1.5 py-0.5 rounded font-medium font-sans text-xs">
                    {formatCurrency(activeTab === 'sip' ? sipResults.estimatedReturns : lumpsumResults.estimatedReturns)}
                  </span>{' '}
                  in returns
                </li>

                <li>
                  <span className="font-medium">Future Value</span> - Your investment will grow to{' '}
                  <span className="bg-blue-50 px-1.5 py-0.5 rounded font-medium font-sans text-xs">
                    {formatCurrency(activeTab === 'sip' ? sipResults.totalValue : lumpsumResults.totalValue)}
                  </span>
                </li>

                <li>
                  <span className="font-medium">SIP Advantage</span> - SIP grows steadily due to <strong>monthly compounding</strong> and rupee cost averaging
                </li>

                <li>
                  <span className="font-medium">Lumpsum Advantage</span> - Lumpsum investing benefits hugely from <strong>time in the market</strong> and compounding
                </li>

                <li>
                  <span className="font-medium">Long-term Impact</span> - Higher returns dramatically increase wealth over <strong>10+ years</strong>
                </li>

                <li>
                  <span className="font-medium">Power of Compounding</span> - At {activeTab === 'sip' ? sipReturn : lumpsumReturn}% return, your money doubles approximately every{' '}
                  <span className="bg-blue-50 px-1.5 py-0.5 rounded font-medium font-sans text-xs">
                    {Math.round(72 / (activeTab === 'sip' ? sipReturn : lumpsumReturn))} years
                  </span>
                </li>
              </ul>

              <div className="mt-3 p-3 bg-yellow-50 border border-yellow-200 rounded-lg">
                <p className="text-xs text-yellow-800 flex items-start gap-2">
                  <span><strong>Pro Tip:</strong> Start early to maximize the power of compounding. Even small amounts invested regularly can grow into substantial wealth over time.</span>
                </p>
              </div>

              <p className="text-[11px] text-gray-500 mt-2 flex items-start gap-1">


                <span><strong>Note:</strong> Past performance doesn't guarantee future returns. These calculations are for illustration purposes only. Actual returns may vary based on market conditions.</span>
              </p>
            </div>
          </div>

        </div>
      </div>

      {/* Font Awesome */}
      <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css" />

      {/* Fade Animation */}
      <style>{`
        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(10px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .animate-fade-in {
          animation: fadeIn 0.5s ease;
        }
      `}</style>
    </div>
  );
};

// =============================================
// STANDALONE VERSION (with header and dropdown)
// =============================================
const SIPLumpsumCalculatorStandalone: React.FC = () => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const activeData = CALCULATOR_OPTIONS.find(c => c.id === 'sip') || CALCULATOR_OPTIONS[0];
  const router = useRouter();

  const handleCalculatorChange = (path: string) => {
    router.push(path);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-linear-to-r from-[#2076C7] to-[#1CADA3] text-white py-6 px-8 text-center">
        <div className="flex items-center justify-center gap-3 mb-2">
          <i className="fas fa-chart-line text-white text-2xl"></i>
          <h1 className="text-3xl font-bold">SIP Calculator</h1>
        </div>
        <p className="text-blue-100">Plan your mutual fund investments and estimate future wealth</p>
      </div>

      {/* Dropdown */}
      <div className="container mx-auto px-4 py-4 max-w-md">
        <div className="relative">
          <button
            onClick={() => setIsDropdownOpen(!isDropdownOpen)}
            className="w-full bg-white border-2 border-gray-200 p-4 rounded-xl flex items-center justify-between hover:border-teal-500 transition-colors shadow-sm"
          >
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-teal-500/10 rounded-lg flex items-center justify-center">
                <activeData.icon className="w-5 h-5 text-teal-600" />
              </div>
              <span className="font-semibold text-gray-800 text-lg">{activeData.label}</span>
            </div>
            <ChevronDown className={`w-5 h-5 text-gray-400 transition-transform ${isDropdownOpen ? 'rotate-180' : ''}`} />
          </button>

          <AnimatePresence>
            {isDropdownOpen && (
              <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                className="absolute top-full left-0 right-0 mt-2 bg-white border border-gray-200 rounded-xl shadow-xl overflow-hidden z-50 max-h-96 overflow-y-auto"
              >
                {CALCULATOR_OPTIONS.map((calc) => (
                  <button
                    key={calc.id}
                    onClick={() => {
                      handleCalculatorChange(calc.path);
                      setIsDropdownOpen(false);
                    }}
                    className={`w-full text-left p-4 flex items-center gap-3 hover:bg-gray-50 transition-colors ${calc.id === 'sip' ? 'bg-teal-500/5' : ''
                      }`}
                  >
                    <div className={`w-8 h-8 rounded-lg flex items-center justify-center ${calc.id === 'sip'
                      ? 'bg-teal-500 text-white'
                      : 'bg-gray-100 text-gray-500'
                      }`}>
                      <calc.icon className="w-4 h-4" />
                    </div>
                    <div className="flex-1">
                      <span className={`font-medium ${calc.id === 'sip' ? 'text-teal-600' : 'text-gray-700'
                        }`}>
                        {calc.label}
                      </span>
                      <p className="text-xs text-gray-400 line-clamp-1">{calc.desc}</p>
                    </div>
                    {calc.id === 'sip' && (
                      <CheckCircle2 className="w-4 h-4 text-teal-500 ml-auto" />
                    )}
                  </button>
                ))}
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>

      {/* Calculator Content */}
      <SIPCalculatorContent />
    </div>
  );
};

// Export both versions
export default SIPLumpsumCalculatorStandalone;