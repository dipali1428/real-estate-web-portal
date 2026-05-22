"use client";
import React, { useState, useCallback } from 'react';
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

  // Update SIP calculations - using useMemo instead of useEffect
  const computedSipResults = React.useMemo(() => 
    calculateSIP(sipAmount, sipDuration, sipReturn),
    [sipAmount, sipDuration, sipReturn, calculateSIP]
  );

  // Update Lumpsum calculations - using useMemo instead of useEffect
  const computedLumpsumResults = React.useMemo(() => 
    calculateLumpsum(lumpsumAmount, lumpsumDuration, lumpsumReturn),
    [lumpsumAmount, lumpsumDuration, lumpsumReturn, calculateLumpsum]
  );

  // Sync computed results to state
  React.useEffect(() => {
    setSipResults(computedSipResults);
  }, [computedSipResults]);

  React.useEffect(() => {
    setLumpsumResults(computedLumpsumResults);
  }, [computedLumpsumResults]);

  // Calculate bar heights
  const getBarHeight = (value: number, maxValue: number): number => {
    const chartHeight = 200;
    return (value / maxValue) * chartHeight;
  };

  const maxChartValue = Math.max(computedSipResults.totalValue, computedLumpsumResults.totalValue);
  const sipBarHeight = getBarHeight(computedSipResults.totalValue, maxChartValue);
  const lumpsumBarHeight = getBarHeight(computedLumpsumResults.totalValue, maxChartValue);

  return (
    <div className="w-full px-3 sm:px-4 md:px-6 py-4 sm:py-6 md:py-8">
      <div className="bg-white rounded-xl sm:rounded-2xl shadow-xl overflow-hidden max-w-7xl mx-auto">
        <div className="p-4 sm:p-6 lg:p-8 font-sans">

          {/* Tabs - Responsive */}
          <div className="flex flex-col sm:flex-row bg-gray-100 rounded-xl p-1 mb-6 sm:mb-8 max-w-full sm:max-w-md mx-auto gap-1 sm:gap-0">
            <button
              className={`flex-1 py-2.5 sm:py-3 px-3 sm:px-5 text-center cursor-pointer rounded-lg font-semibold transition-all duration-300 flex items-center justify-center gap-1 sm:gap-2 text-sm sm:text-base ${
                activeTab === 'sip'
                  ? 'bg-[#1CADA3] text-white shadow-md'
                  : 'text-gray-600 hover:text-gray-800'
              }`}
              onClick={() => setActiveTab('sip')}
            >
              <i className="fas fa-chart-line text-xs sm:text-sm"></i>
              <span>SIP Calculator</span>
            </button>

            <button
              className={`flex-1 py-2.5 sm:py-3 px-3 sm:px-5 text-center cursor-pointer rounded-lg font-semibold transition-all duration-300 flex items-center justify-center gap-1 sm:gap-2 text-sm sm:text-base ${
                activeTab === 'lumpsum'
                  ? 'bg-[#1CADA3] text-white shadow-md'
                  : 'text-gray-600 hover:text-gray-800'
              }`}
              onClick={() => setActiveTab('lumpsum')}
            >
              <i className="fas fa-coins text-xs sm:text-sm"></i>
              <span>Lumpsum Calculator</span>
            </button>
          </div>

          {/* SIP Calculator */}
          {activeTab === 'sip' && (
            <div className="animate-fade-in">
              <div className="flex flex-col lg:flex-row gap-6 lg:gap-8">

                {/* Input Card */}
                <div className="flex-1 bg-white rounded-xl border border-gray-200 p-4 sm:p-6">
                  <div className="flex items-center mb-4 sm:mb-6 pb-3 sm:pb-4 border-b border-gray-200">
                    <div className="w-10 h-10 sm:w-12 sm:h-12 bg-teal-50 rounded-lg flex items-center justify-center text-teal-500 mr-3 sm:mr-4">
                      <i className="fas fa-piggy-bank text-xl sm:text-2xl"></i>
                    </div>
                    <div>
                      <h2 className="text-lg sm:text-xl font-bold text-gray-800">SIP Calculator</h2>
                      <p className="text-xs sm:text-sm text-gray-600">Calculate returns on your monthly investments</p>
                    </div>
                  </div>

                  {/* Monthly Investment */}
                  <div className="mb-5 sm:mb-6">
                    <div className="flex flex-col sm:flex-row justify-between mb-2 gap-1">
                      <label className="block text-[#2076C7] font-semibold text-xs sm:text-sm">Monthly Investment</label>
                      <span className="font-bold font-sans text-[#1CADA3] text-sm sm:text-base">{formatCurrency(sipAmount)}</span>
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
                  <div className="mb-5 sm:mb-6">
                    <div className="flex flex-col sm:flex-row justify-between mb-2 gap-1">
                      <label className="block text-[#2076C7] font-semibold text-xs sm:text-sm">Investment Period</label>
                      <span className="font-bold font-sans text-[#1CADA3] text-sm sm:text-base">{sipDuration} Years</span>
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
                  <div className="mb-5 sm:mb-6">
                    <div className="flex flex-col sm:flex-row justify-between mb-2 gap-1">
                      <label className="block text-[#2076C7] font-semibold text-xs sm:text-sm">Expected Annual Return</label>
                      <span className="font-bold font-sans text-[#1CADA3] text-sm sm:text-base">{sipReturn}%</span>
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
                <div className="flex-1 bg-gray-50 rounded-xl shadow-sm border-l-4 border-[#1CADA3] p-4 sm:p-6">
                  <h3 className="text-[#2076C7] font-semibold mb-3 sm:mb-4 text-base sm:text-lg flex items-center gap-2">
                    <i className="fas fa-chart-pie"></i>
                    <span>Investment Summary</span>
                  </h3>
                  <div className="space-y-3 sm:space-y-4">
                    <div className="flex justify-between pb-2 sm:pb-3 border-b border-gray-200">
                      <span className="text-gray-600 text-sm sm:text-base">Total Investment</span>
                      <span className="font-medium font-sans text-[#1CADA3] text-sm sm:text-base">{formatCurrency(computedSipResults.totalInvestment)}</span>
                    </div>
                    <div className="flex justify-between pb-2 sm:pb-3 border-b border-gray-200">
                      <span className="text-gray-600 text-sm sm:text-base">Est. Returns</span>
                      <span className="font-medium font-sans text-[#1CADA3] text-sm sm:text-base">{formatCurrency(computedSipResults.estimatedReturns)}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600 text-sm sm:text-base">Total Value</span>
                      <span className="font-medium font-sans text-[#1CADA3] text-base sm:text-lg">{formatCurrency(computedSipResults.totalValue)}</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Lumpsum Calculator */}
          {activeTab === 'lumpsum' && (
            <div className="animate-fade-in">
              <div className="flex flex-col lg:flex-row gap-6 lg:gap-8">

                {/* Input Card */}
                <div className="flex-1 bg-white rounded-xl border border-gray-200 p-4 sm:p-6">
                  <div className="flex items-center mb-4 sm:mb-6 pb-3 sm:pb-4 border-b border-gray-200">
                    <div className="w-10 h-10 sm:w-12 sm:h-12 bg-blue-50 rounded-lg flex items-center justify-center text-blue-600 mr-3 sm:mr-4">
                      <i className="fas fa-hand-holding-usd text-xl sm:text-2xl"></i>
                    </div>
                    <div>
                      <h2 className="text-lg sm:text-xl font-bold text-gray-800">Lumpsum Calculator</h2>
                      <p className="text-xs sm:text-sm text-gray-600">Calculate returns on your one-time investment</p>
                    </div>
                  </div>

                  {/* Investment Amount */}
                  <div className="mb-5 sm:mb-6">
                    <div className="flex flex-col sm:flex-row justify-between mb-2 gap-1">
                      <label className="block text-[#2076C7] font-semibold text-xs sm:text-sm">Investment Amount</label>
                      <span className="font-bold font-sans text-[#1CADA3] text-sm sm:text-base">{formatCurrency(lumpsumAmount)}</span>
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
                  <div className="mb-5 sm:mb-6">
                    <div className="flex flex-col sm:flex-row justify-between mb-2 gap-1">
                      <label className="block text-[#2076C7] font-semibold text-xs sm:text-sm">Investment Period</label>
                      <span className="font-bold font-sans text-[#1CADA3] text-sm sm:text-base">{lumpsumDuration} Years</span>
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
                  <div className="mb-5 sm:mb-6">
                    <div className="flex flex-col sm:flex-row justify-between mb-2 gap-1">
                      <label className="block text-[#2076C7] font-semibold text-xs sm:text-sm">Expected Annual Return</label>
                      <span className="font-bold font-sans text-[#1CADA3] text-sm sm:text-base">{lumpsumReturn}%</span>
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
                <div className="flex-1 bg-gray-50 rounded-xl shadow-sm border-l-4 border-[#1CADA3] p-4 sm:p-6">
                  <h3 className="text-[#2076C7] font-semibold mb-3 sm:mb-4 text-base sm:text-lg flex items-center gap-2">
                    <i className="fas fa-chart-pie"></i>
                    <span>Investment Summary</span>
                  </h3>
                  <div className="space-y-3 sm:space-y-4">
                    <div className="flex justify-between pb-2 sm:pb-3 border-b border-gray-200">
                      <span className="text-gray-600 text-sm sm:text-base">Total Investment</span>
                      <span className="font-medium font-sans text-[#1CADA3] text-sm sm:text-base">{formatCurrency(computedLumpsumResults.totalInvestment)}</span>
                    </div>
                    <div className="flex justify-between pb-2 sm:pb-3 border-b border-gray-200">
                      <span className="text-gray-600 text-sm sm:text-base">Est. Returns</span>
                      <span className="font-medium font-sans text-[#1CADA3] text-sm sm:text-base">{formatCurrency(computedLumpsumResults.estimatedReturns)}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600 text-sm sm:text-base">Total Value</span>
                      <span className="font-medium font-sans text-[#1CADA3] text-base sm:text-lg">{formatCurrency(computedLumpsumResults.totalValue)}</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Comparison Chart - Responsive */}
          <div className="bg-white rounded-xl border shadow-md p-4 sm:p-6 mt-6 sm:mt-8">
            <h2 className="text-base sm:text-lg font-semibold text-gray-800 mb-3 sm:mb-4 text-center flex items-center justify-center gap-2">
              <i className="fas fa-chart-bar text-[#2076C7]"></i>
              <span>Investment Comparison</span>
            </h2>
            <div className="flex items-end justify-center gap-8 sm:gap-12 md:gap-16 py-4 sm:py-6">
              {/* SIP Bar */}
              <div className="flex flex-col items-center">
                <div
                  className="w-12 sm:w-16 bg-gradient-to-t from-[#1CADA3] to-[#1CADA3] rounded-t-lg relative shadow-sm"
                  style={{ height: `${Math.min(sipBarHeight, 200)}px`, minHeight: '30px' }}
                >
                  <div className="absolute -top-7 sm:-top-8 left-0 w-full text-center font-bold font-sans text-gray-800 text-xs sm:text-sm whitespace-nowrap">
                    {formatCurrency(computedSipResults.totalValue)}
                  </div>
                </div>
                <div className="mt-2 sm:mt-3 text-xs sm:text-sm font-semibold text-gray-700 flex items-center gap-1">
                  <i className="fas fa-chart-line text-[#1CADA3] text-xs"></i>
                  <span className="hidden sm:inline">SIP Investment</span>
                  <span className="sm:hidden">SIP</span>
                </div>
              </div>

              {/* Lumpsum Bar */}
              <div className="flex flex-col items-center">
                <div
                  className="w-12 sm:w-16 bg-gradient-to-t from-[#2076C7] to-[#2076C7] rounded-t-lg relative shadow-sm"
                  style={{ height: `${Math.min(lumpsumBarHeight, 200)}px`, minHeight: '30px' }}
                >
                  <div className="absolute -top-7 sm:-top-8 left-0 w-full text-center font-bold font-sans text-gray-800 text-xs sm:text-sm whitespace-nowrap">
                    {formatCurrency(computedLumpsumResults.totalValue)}
                  </div>
                </div>
                <div className="mt-2 sm:mt-3 text-xs sm:text-sm font-semibold text-gray-700 flex items-center gap-1">
                  <i className="fas fa-coins text-[#2076C7] text-xs"></i>
                  <span className="hidden sm:inline">Lumpsum Investment</span>
                  <span className="sm:hidden">Lumpsum</span>
                </div>
              </div>
            </div>
          </div>

          {/* Metric Cards - Responsive Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-4 mb-6 sm:mb-8 mt-6 sm:mt-8">
            <div className="bg-white rounded-xl border shadow-md p-3 sm:p-4 text-center hover:shadow-lg transition-shadow">
              <div className="w-8 h-8 sm:w-10 sm:h-10 bg-teal-50 rounded-full flex items-center justify-center mx-auto mb-2">
                <i className="fas fa-rocket text-[#1CADA3] text-base sm:text-lg"></i>
              </div>
              <div className="text-xs text-gray-600 mb-1">Wealth Gain</div>
              <div className="font-bold text-base sm:text-lg font-sans text-[#1CADA3]">
                {formatCurrency(activeTab === 'sip' ? computedSipResults.estimatedReturns : computedLumpsumResults.estimatedReturns)}
              </div>
            </div>

            <div className="bg-white rounded-xl border shadow-md p-3 sm:p-4 text-center hover:shadow-lg transition-shadow">
              <div className="w-8 h-8 sm:w-10 sm:h-10 bg-teal-50 rounded-full flex items-center justify-center mx-auto mb-2">
                <i className="fas fa-percentage text-[#1CADA3] text-base sm:text-lg"></i>
              </div>
              <div className="text-xs text-gray-600 mb-1">Annualized Return</div>
              <div className="font-bold text-base sm:text-lg font-sans text-[#1CADA3]">
                {activeTab === 'sip' ? sipReturn : lumpsumReturn}%
              </div>
            </div>

            <div className="bg-white rounded-xl border shadow-md p-3 sm:p-4 text-center hover:shadow-lg transition-shadow sm:col-span-2 lg:col-span-1">
              <div className="w-8 h-8 sm:w-10 sm:h-10 bg-teal-50 rounded-full flex items-center justify-center mx-auto mb-2">
                <i className="fas fa-calendar-alt text-[#1CADA3] text-base sm:text-lg"></i>
              </div>
              <div className="text-xs text-gray-600 mb-1">Investment Period</div>
              <div className="font-bold text-base sm:text-lg font-sans text-[#1CADA3]">
                {activeTab === 'sip' ? sipDuration : lumpsumDuration} Years
              </div>
            </div>
          </div>

          {/* Key Insights Section - Responsive */}
          <div className="bg-white rounded-xl border shadow-md p-4 sm:p-5 mt-6 sm:mt-8">
            <h2 className="text-sm sm:text-base font-semibold text-gray-800 mb-2 flex items-center gap-2">
              Key Insights
            </h2>

            <div className="text-gray-700 leading-relaxed text-xs sm:text-sm">
              <ul className="list-disc pl-4 space-y-1.5">
                <li>
                  <span className="font-medium">Total Investment</span> - Your total investment amount is{' '}
                  <span className="bg-blue-50 px-1.5 py-0.5 rounded font-medium font-sans text-xs">
                    {formatCurrency(activeTab === 'sip' ? computedSipResults.totalInvestment : computedLumpsumResults.totalInvestment)}
                  </span>
                </li>

                <li>
                  <span className="font-medium">Estimated Returns</span> - You can expect to earn{' '}
                  <span className="bg-blue-50 px-1.5 py-0.5 rounded font-medium font-sans text-xs">
                    {formatCurrency(activeTab === 'sip' ? computedSipResults.estimatedReturns : computedLumpsumResults.estimatedReturns)}
                  </span>{' '}
                  in returns
                </li>

                <li>
                  <span className="font-medium">Future Value</span> - Your investment will grow to{' '}
                  <span className="bg-blue-50 px-1.5 py-0.5 rounded font-medium font-sans text-xs">
                    {formatCurrency(activeTab === 'sip' ? computedSipResults.totalValue : computedLumpsumResults.totalValue)}
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

              <p className="text-[10px] sm:text-[11px] text-gray-500 mt-2 flex items-start gap-1">
                <span><strong>Note:</strong> Past performance doesn&apos;t guarantee future returns. These calculations are for illustration purposes only. Actual returns may vary based on market conditions.</span>
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
        
        /* Responsive improvements */
        @media (max-width: 640px) {
          input[type="range"] {
            min-height: 44px;
          }
          button {
            min-height: 44px;
          }
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
      {/* Header - Responsive */}
      <div className="bg-linear-to-r from-[#2076C7] to-[#1CADA3] text-white py-4 sm:py-6 px-4 sm:px-8 text-center">
        <div className="flex items-center justify-center gap-2 sm:gap-3 mb-1 sm:mb-2">
          <i className="fas fa-chart-line text-white text-xl sm:text-2xl"></i>
          <h1 className="text-xl sm:text-2xl md:text-3xl font-bold">SIP Calculator</h1>
        </div>
        <p className="text-blue-100 text-sm sm:text-base px-2">Plan your mutual fund investments and estimate future wealth</p>
      </div>

      {/* Dropdown - Responsive */}
      <div className="container mx-auto px-3 sm:px-4 py-3 sm:py-4 max-w-md">
        <div className="relative">
          <button
            onClick={() => setIsDropdownOpen(!isDropdownOpen)}
            className="w-full bg-white border-2 border-gray-200 p-3 sm:p-4 rounded-xl flex items-center justify-between hover:border-teal-500 transition-colors shadow-sm"
          >
            <div className="flex items-center gap-2 sm:gap-3">
              <div className="w-8 h-8 sm:w-10 sm:h-10 bg-teal-500/10 rounded-lg flex items-center justify-center">
                <activeData.icon className="w-4 h-4 sm:w-5 sm:h-5 text-teal-600" />
              </div>
              <span className="font-semibold text-gray-800 text-base sm:text-lg">{activeData.label}</span>
            </div>
            <ChevronDown className={`w-4 h-4 sm:w-5 sm:h-5 text-gray-400 transition-transform ${isDropdownOpen ? 'rotate-180' : ''}`} />
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
                    className={`w-full text-left p-3 sm:p-4 flex items-center gap-2 sm:gap-3 hover:bg-gray-50 transition-colors ${
                      calc.id === 'sip' ? 'bg-teal-500/5' : ''
                    }`}
                  >
                    <div className={`w-7 h-7 sm:w-8 sm:h-8 rounded-lg flex items-center justify-center ${
                      calc.id === 'sip'
                        ? 'bg-teal-500 text-white'
                        : 'bg-gray-100 text-gray-500'
                    }`}>
                      <calc.icon className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
                    </div>
                    <div className="flex-1">
                      <span className={`font-medium text-sm sm:text-base ${
                        calc.id === 'sip' ? 'text-teal-600' : 'text-gray-700'
                      }`}>
                        {calc.label}
                      </span>
                      <p className="text-xs text-gray-400 line-clamp-1 hidden sm:block">{calc.desc}</p>
                    </div>
                    {calc.id === 'sip' && (
                      <CheckCircle2 className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-teal-500 ml-auto" />
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