"use client";
import React, { useState, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { TrendingUp, PieChart, Calculator, Home, User, Building2, LineChart, Timer, ChevronDown, CheckCircle2 } from 'lucide-react';

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

const SIPLumpsumCalculator: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'sip' | 'lumpsum'>('sip');
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  
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

  const activeData = CALCULATOR_OPTIONS.find(c => c.id === 'sip') || CALCULATOR_OPTIONS[0];

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

  const handleCalculatorChange = (path: string) => {
    window.location.href = path;
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-white to-blue-50 text-white p-5">
      <div className="max-w-6xl mx-auto">
        
        {/* Header */}
        <header className="text-center mb-6 p-8 bg-linear-to-r from-[#2076C7] to-[#1CADA3] rounded-2xl shadow-lg">
          <div className="flex items-center justify-center gap-3 mb-4">
            <div className="w-10 h-10 bg-teal-500 rounded-lg flex items-center justify-center text-white text-xl">
              <i className="fas fa-calculator"></i>
            </div>
            <h1 className="text-3xl font-bold text-white">SIP Calculator</h1>
          </div>
          <p className="text-white-600 text-lg max-w-2xl mx-auto">
            Plan your financial future with our advanced SIP and Lumpsum investment calculators
          </p>
        </header>

        {/* Dropdown - Added here */}
        <div className="mb-6 max-w-md mx-auto relative">
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
                    className={`w-full text-left p-4 flex items-center gap-3 hover:bg-gray-50 transition-colors ${
                      calc.id === 'sip' ? 'bg-teal-500/5' : ''
                    }`}
                  >
                    <div className={`w-8 h-8 rounded-lg flex items-center justify-center ${
                      calc.id === 'sip' 
                        ? 'bg-teal-500 text-white' 
                        : 'bg-gray-100 text-gray-500'
                    }`}>
                      <calc.icon className="w-4 h-4" />
                    </div>
                    <div className="flex-1">
                      <span className={`font-medium ${
                        calc.id === 'sip' ? 'text-teal-600' : 'text-gray-700'
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

        {/* Tabs */}
        <div className="flex bg-white rounded-2xl p-2 mb-8 max-w-md mx-auto">
          <button
            className={`flex-1 py-4 px-5 text-center cursor-pointer rounded-xl font-semibold transition-all duration-300 flex items-center justify-center gap-3 ${
              activeTab === 'sip' 
                ? 'bg-teal-500 text-white shadow-lg shadow-teal-200' 
                : 'text-gray-600'
            }`}
            onClick={() => setActiveTab('sip')}
          >
            <i className="fas fa-chart-line"></i>
            <span>SIP Calculator</span>
          </button>

          <button
            className={`flex-1 py-4 px-5 text-center cursor-pointer rounded-xl font-semibold transition-all duration-300 flex items-center justify-center gap-3 ${
              activeTab === 'lumpsum' 
                ? 'bg-teal-500 text-white shadow-lg shadow-teal-200' 
                : 'text-gray-600'
            }`}
            onClick={() => setActiveTab('lumpsum')}
          >
            <i className="fas fa-coins"></i>
            <span>Lumpsum Calculator</span>
          </button>
        </div>

        {/* SIP Calculator */}
        {activeTab === 'sip' && (
          <section className="animate-fade-in">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              
              {/* Input Card */}
              <div className="bg-white rounded-2xl shadow-lg p-8">
                <div className="flex items-center mb-6 pb-4 border-b border-gray-200">
                  <div className="w-12 h-12 bg-teal-50 rounded-lg flex items-center justify-center text-teal-500 text-xl mr-4">
                    <i className="fas fa-piggy-bank"></i>
                  </div>
                  <div>
                    <h2 className="text-2xl font-bold text-gray-800">SIP Calculator</h2>
                    <p className="text-gray-600">Calculate returns on your monthly investments</p>
                  </div>
                </div>

                {/* Monthly Investment */}
                <div className="mb-6">
                  <div className="flex justify-between mb-3">
                    <span className="font-semibold text-gray-800">Monthly Investment</span>
                    <span className="font-bold font-sans text-teal-500">{formatCurrency(sipAmount)}</span>
                  </div>
                  <input
                    type="range"
                    min="500"
                    max="100000"
                    step="500"
                    value={sipAmount}
                    onChange={(e) => setSipAmount(Number(e.target.value))}
                    className="w-full h-2  bg-gray-200 rounded-lg appearance-none cursor-pointer [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:h-5 [&::-webkit-slider-thumb]:w-5 [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:bg-teal-500 [&::-webkit-slider-thumb]:border-2 [&::-webkit-slider-thumb]:border-white [&::-webkit-slider-thumb]:shadow-lg"
                  />
                  <div className="flex justify-between mt-2 text-sm font-sans text-gray-500">
                    <span>₹500</span>
                    <span>₹1,00,000</span>
                  </div>
                </div>

                {/* Investment Period */}
                <div className="mb-6">
                  <div className="flex justify-between mb-3">
                    <span className="font-semibold text-gray-800">Investment Period</span>
                    <span className="font-bold font-sans text-teal-500">{sipDuration} Years</span>
                  </div>
                  <input
                    type="range"
                    min="1"
                    max="30"
                    value={sipDuration}
                    onChange={(e) => setSipDuration(Number(e.target.value))}
                    className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:h-5 [&::-webkit-slider-thumb]:w-5 [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:bg-teal-500 [&::-webkit-slider-thumb]:border-2 [&::-webkit-slider-thumb]:border-white [&::-webkit-slider-thumb]:shadow-lg"
                  />
                  <div className="flex justify-between mt-2 text-sm font-sans text-gray-500">
                    <span>1 Year</span>
                    <span>30 Years</span>
                  </div>
                </div>

                {/* Expected Return */}
                <div className="mb-6">
                  <div className="flex justify-between mb-3">
                    <span className="font-semibold text-gray-800">Expected Annual Return</span>
                    <span className="font-bold font-sans text-teal-500">{sipReturn}%</span>
                  </div>
                  <input
                    type="range"
                    min="1"
                    max="30"
                    step="0.1"
                    value={sipReturn}
                    onChange={(e) => setSipReturn(Number(e.target.value))}
                    className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:h-5 [&::-webkit-slider-thumb]:w-5 [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:bg-teal-500 [&::-webkit-slider-thumb]:border-2 [&::-webkit-slider-thumb]:border-white [&::-webkit-slider-thumb]:shadow-lg"
                  />
                  <div className="flex justify-between mt-2 text-sm font-sans text-gray-500">
                    <span>1%</span>
                    <span>30%</span>
                  </div>
                </div>
              </div>

              {/* Results Card */}
              <div className="bg-gradient-to-br from-teal-500 to-teal-600 text-white rounded-2xl p-6 shadow-lg">
                <h3 className="text-xl font-bold mb-5 flex items-center gap-3">
                  <i className="fas fa-chart-pie"></i>
                  <span>Investment Summary</span>
                </h3>

                <div className="flex justify-between items-center mb-5 pb-4 border-b border-teal-400">
                  <span className="text-lg">Total Investment</span>
                  <span className="text-xl font-sans font-bold">{formatCurrency(sipResults.totalInvestment)}</span>
                </div>

                <div className="flex justify-between items-center mb-5 pb-4 border-b border-teal-400">
                  <span className="text-lg">Est. Returns</span>
                  <span className="text-xl  font-sans font-bold">{formatCurrency(sipResults.estimatedReturns)}</span>
                </div>

                <div className="flex justify-between items-center">
                  <span className="text-lg">Total Value</span>
                  <span className="text-xl font-sans font-bold">{formatCurrency(sipResults.totalValue)}</span>
                </div>
              </div>
            </div>
          </section>
        )}

        {/* Lumpsum Calculator */}
        {activeTab === 'lumpsum' && (
          <section className="animate-fade-in">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              
              {/* Input */}
              <div className="bg-white rounded-2xl shadow-lg p-8">
                <div className="flex items-center mb-6 pb-4 border-b border-gray-200">
                  <div className="w-12 h-12 bg-blue-50 rounded-lg flex items-center justify-center text-blue-600 text-xl mr-4">
                    <i className="fas fa-hand-holding-usd"></i>
                  </div>
                  <div>
                    <h2 className="text-2xl font-bold text-gray-800">Lumpsum Calculator</h2>
                    <p className="text-gray-600">Calculate returns on your one-time investment</p>
                  </div>
                </div>

                {/* Investment */}
                <div className="mb-6">
                  <div className="flex justify-between mb-3 font-sans">
                    <span className="font-semibold  text-gray-800">Investment Amount</span>
                    <span className="font-bold text-teal-500">{formatCurrency(lumpsumAmount)}</span>
                  </div>
                  <input
                    type="range"
                    min="1000"
                    max="5000000"
                    step="1000"
                    value={lumpsumAmount}
                    onChange={(e) => setLumpsumAmount(Number(e.target.value))}
                    className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:h-5 [&::-webkit-slider-thumb]:w-5 [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:bg-teal-500 [&::-webkit-slider-thumb]:border-2 [&::-webkit-slider-thumb]:border-white [&::-webkit-slider-thumb]:shadow-lg"
                  />
                  <div className="flex justify-between mt-2 text-sm font-sans text-gray-500">
                    <span>₹1,000</span>
                    <span>₹50,00,000</span>
                  </div>
                </div>

                {/* Duration */}
                <div className="mb-6">
                  <div className="flex justify-between mb-3 font-sans">
                    <span className="font-semibold text-gray-800">Investment Period</span>
                    <span className="font-bold text-teal-500">{lumpsumDuration} Years</span>
                  </div>
                  <input
                    type="range"
                    min="1"
                    max="30"
                    value={lumpsumDuration}
                    onChange={(e) => setLumpsumDuration(Number(e.target.value))}
                    className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:h-5 [&::-webkit-slider-thumb]:w-5 [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:bg-teal-500 [&::-webkit-slider-thumb]:border-2 [&::-webkit-slider-thumb]:border-white [&::-webkit-slider-thumb]:shadow-lg"
                  />
                  <div className="flex justify-between mt-2 text-sm font-sans text-gray-500">
                    <span>1 Year</span>
                    <span>30 Years</span>
                  </div>
                </div>

                {/* Return */}
                <div className="mb-6">
                  <div className="flex justify-between mb-3 font-sans">
                    <span className="font-semibold text-gray-800">Expected Annual Return</span>
                    <span className="font-bold text-teal-500">{lumpsumReturn}%</span>
                  </div>
                  <input
                    type="range"
                    min="1"
                    max="30"
                    step="0.1"
                    value={lumpsumReturn}
                    onChange={(e) => setLumpsumReturn(Number(e.target.value))}
                    className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:h-5 [&::-webkit-slider-thumb]:w-5 [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:bg-teal-500 [&::-webkit-slider-thumb]:border-2 [&::-webkit-slider-thumb]:border-white [&::-webkit-slider-thumb]:shadow-lg"
                  />
                  <div className="flex justify-between mt-2 text-sm font-sans text-gray-500">
                    <span>1%</span>
                    <span>30%</span>
                  </div>
                </div>
              </div>

              {/* Summary */}
              <div className="bg-gradient-to-br from-teal-500 to-teal-600 text-white rounded-2xl p-6 shadow-lg">
                <h3 className="text-xl font-bold mb-5 flex items-center gap-3">
                  <i className="fas fa-chart-pie"></i>
                  <span>Investment Summary</span>
                </h3>

                <div className="flex justify-between items-center mb-5 pb-4 border-b border-teal-400">
                  <span className="text-lg">Total Investment</span>
                  <span className="text-xl font-sans font-bold">{formatCurrency(lumpsumResults.totalInvestment)}</span>
                </div>

                <div className="flex justify-between items-center mb-5 pb-4 border-b border-teal-400">
                  <span className="text-lg">Est. Returns</span>
                  <span className="text-xl font-sans font-bold">{formatCurrency(lumpsumResults.estimatedReturns)}</span>
                </div>

                <div className="flex justify-between items-center">
                  <span className="text-lg">Total Value</span>
                  <span className="text-xl font-sans font-bold">{formatCurrency(lumpsumResults.totalValue)}</span>
                </div>
              </div>
            </div>
          </section>
        )}

        {/* Comparison Chart */}
        <div className="bg-white rounded-2xl shadow-lg p-6 mt-8">
          <h2 className="text-2xl font-bold text-center  text-gray-800 mb-6">Investment Comparison</h2>
          <div className="flex items-end justify-center gap-16 py-6">
            {/* SIP Bar */}
            <div className="flex flex-col items-center">
              <div 
                className="w-16 bg-gradient-to-t from-teal-500 to-teal-600 rounded-t-lg relative shadow-lg shadow-teal-200 transition-all duration-1000"
                style={{ height: `${sipBarHeight}px` }}
              >
                <div className="absolute -top-8 left-0 w-full text-center font-bold font-sans text-gray-800 text-lg">
                  {formatCurrency(sipResults.totalValue)}
                </div>
              </div>
              <div className="mt-4 font-semibold  text-gray-800">SIP Investment</div>
            </div>

            {/* Lumpsum Bar */}
            <div className="flex flex-col items-center">
              <div 
                className="w-16 bg-gradient-to-t from-blue-500 to-blue-600 rounded-t-lg relative shadow-lg shadow-blue-200 transition-all duration-1000"
                style={{ height: `${lumpsumBarHeight}px` }}
              >
                <div className="absolute -top-8 left-0 w-full text-center font-bold font-sans text-gray-800 text-lg">
                  {formatCurrency(lumpsumResults.totalValue)}
                </div>
              </div>
              <div className="mt-4 font-semibold text-gray-800">Lumpsum Investment</div>
            </div>
          </div>

          {/* Legend */}
          <div className="flex justify-center gap-8 mt-8">
            <div className="flex items-center gap-3">
              <div className="w-4 h-4 bg-teal-500 rounded"></div>
              <span className="text-gray-700">SIP Investment</span>
            </div>
            <div className="flex items-center gap-3">
              <div className="w-4 h-4 bg-blue-500 rounded"></div>
              <span className="text-gray-700">Lumpsum Investment</span>
            </div>
          </div>
        </div>


        {/* FIXED Insight + Key Insights Container */}
        <div className="mt-8 space-y-8">

          {/* 3 Insight Cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-white rounded-2xl p-6 shadow-lg text-center">
              <div className="w-12 h-12 bg-teal-50 rounded-full flex items-center justify-center text-teal-500 text-xl mx-auto mb-4">
                <i className="fas fa-rocket"></i>
              </div>
              <div className="text-gray-600 text-sm mb-2">Wealth Gain</div>
              <div className="font-bold text-xl font-sans text-gray-800">
                {formatCurrency(activeTab === 'sip' ? sipResults.estimatedReturns : lumpsumResults.estimatedReturns)}
              </div>
            </div>

            <div className="bg-white rounded-2xl p-6 shadow-lg text-center">
              <div className="w-12 h-12 bg-teal-50 rounded-full flex items-center justify-center text-teal-500 text-xl mx-auto mb-4">
                <i className="fas fa-percentage"></i>
              </div>
              <div className="text-gray-600 text-sm mb-2">Annualized Return</div>
              <div className="font-bold text-xl font-sans text-gray-800">
                {activeTab === 'sip' ? sipReturn : lumpsumReturn}%
              </div>
            </div>

            <div className="bg-white rounded-2xl p-6 shadow-lg text-center">
              <div className="w-12 h-12 bg-teal-50 rounded-full flex items-center justify-center text-teal-500 text-xl mx-auto mb-4">
                <i className="fas fa-calendar-alt"></i>
              </div>
              <div className="text-gray-600 text-sm mb-2">Investment Period</div>
              <div className="font-bold text-xl font-sans text-gray-800">
                {activeTab === 'sip' ? sipDuration : lumpsumDuration} Years
              </div>
            </div>
          </div>

          {/* ⭐ KEY INSIGHTS FIXED */}
          <div className="bg-white rounded-2xl shadow-lg p-8">
            <h2 className="text-2xl font-bold text-gray-800 mb-6 flex items-center gap-3">
              <i className="fas fa-lightbulb text-yellow-500 text-xl"></i>
              Key Insights
            </h2>

            <ul className="space-y-4 text-gray-700 text-base leading-relaxed">

              <li className="flex gap-3">
                <i className="fas fa-check-circle text-teal-500 mt-1"></i>
                <span>
                  Your total investment amounts to{" "}
                  <strong className="font-sans">
                    {formatCurrency(
                      activeTab === "sip"
                        ? sipResults.totalInvestment
                        : lumpsumResults.totalInvestment
                    )}
                  </strong>
                </span>
              </li>

              <li className="flex gap-3">
                <i className="fas fa-check-circle text-teal-500 mt-1"></i>
                <span>
                  Your estimated returns are{" "}
                  <strong className="font-sans">
                    {formatCurrency(
                      activeTab === "sip"
                        ? sipResults.estimatedReturns
                        : lumpsumResults.estimatedReturns
                    )}
                  </strong>.
                </span>
              </li>

              <li className="flex gap-3">
                <i className="fas fa-check-circle text-teal-500 mt-1"></i>
                <span>
                  Your total future value will be{" "}
                  <strong className="font-sans">
                    {formatCurrency(
                      activeTab === "sip"
                        ? sipResults.totalValue
                        : lumpsumResults.totalValue
                    )}
                  </strong>.
                </span>
              </li>

              <li className="flex gap-3">
                <i className="fas fa-check-circle text-teal-500 mt-1"></i>
                <span>
                  SIP grows steadily due to <strong>monthly compounding</strong>.
                </span>
              </li>

              <li className="flex gap-3">
                <i className="fas fa-check-circle text-teal-500 mt-1"></i>
                <span>
                  Lumpsum investing benefits hugely from <strong>time in the market</strong>.
                </span>
              </li>

              <li className="flex gap-3">
                <i className="fas fa-check-circle text-teal-500 mt-1"></i>
                <span>
                  Higher returns dramatically increase wealth over <strong>10+ years</strong>.
                </span>
              </li>

            </ul>
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

export default SIPLumpsumCalculator;