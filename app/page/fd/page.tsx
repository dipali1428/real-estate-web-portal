'use client';

import React, { useState, useEffect, useRef, useCallback } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Chart, DoughnutController, ArcElement, Tooltip, Legend } from 'chart.js';
import { TrendingUp, PieChart, Calculator, Home, User, Building2, LineChart, Timer, ChevronDown, CheckCircle2 } from 'lucide-react';
import { useRouter } from "next/navigation";

// Register Chart.js components
Chart.register(DoughnutController, ArcElement, Tooltip, Legend);

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
export const FDCalculatorContent: React.FC = () => {
  // State for FD parameters
  const [principalAmount, setPrincipalAmount] = useState<number>(100000);
  const [interestRate, setInterestRate] = useState<number>(7.5);
  const [tenure, setTenure] = useState<number>(5);
  const [tenureType, setTenureType] = useState<'years' | 'months'>('years');
  const [compoundingFrequency, setCompoundingFrequency] = useState<'monthly' | 'quarterly' | 'annually'>('quarterly');

  // Chart reference
  const chartRef = useRef<Chart<'doughnut'> | null>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const chartsInitialized = useRef(false);

  // Format currency for display
  const formatCurrency = useCallback((value: number): string => {
    if (value === 0 || isNaN(value)) return '₹0';
    return '₹' + value.toFixed(0).replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  }, []);

  // Calculate derived values directly during render (NO STATE, NO EFFECT!)
  const calculateDerivedValues = useCallback(() => {
    const principal = Number(principalAmount) || 0;
    const rate = Number(interestRate) || 0;
    const tenureValue = Number(tenure) || 0;

    // Validation
    if (principal < 10000 || rate < 1 || tenureValue <= 0) {
      return {
        maturityAmount: 0,
        totalInterest: 0,
        estimatedReturns: 0
      };
    }

    const tenureInYears = tenureType === 'months' ? tenureValue / 12 : tenureValue;

    let periodsPerYear: number;
    switch (compoundingFrequency) {
      case 'monthly':
        periodsPerYear = 12;
        break;
      case 'quarterly':
        periodsPerYear = 4;
        break;
      case 'annually':
        periodsPerYear = 1;
        break;
      default:
        periodsPerYear = 4;
    }

    const ratePerPeriod = rate / (100 * periodsPerYear);
    const totalPeriods = periodsPerYear * tenureInYears;
    const amount = principal * Math.pow(1 + ratePerPeriod, totalPeriods);
    const totalInterestEarned = amount - principal;

    const roundedAmount = Math.round(amount * 100) / 100;
    const roundedInterest = Math.round(totalInterestEarned * 100) / 100;

    return {
      maturityAmount: roundedAmount,
      totalInterest: roundedInterest,
      estimatedReturns: roundedInterest
    };
  }, [principalAmount, interestRate, tenure, tenureType, compoundingFrequency]);

  // Get derived values directly - these are what we use for rendering
  const { maturityAmount, totalInterest, estimatedReturns } = calculateDerivedValues();

  // Calculate validation errors directly during render (NO useEffect!)
  const getValidationErrors = useCallback(() => {
    const errors = {
      principalAmount: '',
      interestRate: '',
      tenure: ''
    };

    if (!principalAmount || principalAmount < 10000) {
      errors.principalAmount = 'Minimum deposit amount is ₹10,000';
    } else if (principalAmount > 100000000) {
      errors.principalAmount = 'Maximum deposit amount is ₹10,00,00,000';
    }

    if (!interestRate || interestRate < 1) {
      errors.interestRate = 'Minimum interest rate is 1%';
    } else if (interestRate > 15) {
      errors.interestRate = 'Maximum interest rate is 15%';
    }

    if (!tenure || tenure <= 0) {
      errors.tenure = tenureType === 'years' ? 'Minimum tenure is 1 years' : 'Minimum tenure is 1 month';
    } else if (tenureType === 'years' && tenure > 30) {
      errors.tenure = 'Maximum tenure is 30 years';
    } else if (tenureType === 'months' && tenure > 360) {
      errors.tenure = 'Maximum tenure is 360 months';
    }

    return errors;
  }, [principalAmount, interestRate, tenure, tenureType]);

  // Get validation errors directly during render
  const errors = getValidationErrors();

  // Handle input changes with validation
  const handleInputChange = useCallback((field: string, value: string) => {
    if (value === '') {
      switch (field) {
        case 'principalAmount':
          setPrincipalAmount(0);
          break;
        case 'interestRate':
          setInterestRate(0);
          break;
        case 'tenure':
          setTenure(0);
          break;
      }
      return;
    }

    const cleanValue = value.replace(/[^\d.]/g, '');
    const parts = cleanValue.split('.');
    if (parts.length > 2) return;

    const numValue = parseFloat(cleanValue);
    if (!isNaN(numValue)) {
      switch (field) {
        case 'principalAmount':
          setPrincipalAmount(numValue);
          break;
        case 'interestRate':
          const roundedRate = Math.round(numValue * 10) / 10;
          setInterestRate(roundedRate);
          break;
        case 'tenure':
          const roundedTenure = tenureType === 'years'
            ? Math.round(numValue * 10) / 10
            : Math.round(numValue);
          setTenure(roundedTenure);
          break;
      }
    }
  }, [tenureType]);

  // Initialize chart only once
  useEffect(() => {
    if (chartsInitialized.current) return;

    if (canvasRef.current && !chartRef.current) {
      const ctx = canvasRef.current.getContext('2d');
      if (ctx) {
        chartRef.current = new Chart(ctx, {
          type: 'doughnut',
          data: {
            labels: ['Principal', 'Interest Earned'],
            datasets: [{
              data: [principalAmount, totalInterest],
              backgroundColor: ['#1CADA3', '#2076C7'],
              borderWidth: 0
            }]
          },
          options: {
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
              legend: {
                position: 'bottom' as const
              },
              tooltip: {
                callbacks: {
                  label: function (context) {
                    let label = context.label || '';
                    if (label) {
                      label += ': ';
                    }
                    if (context.parsed !== null) {
                      label += formatCurrency(context.parsed);
                    }
                    return label;
                  }
                }
              }
            }
          }
        });
        chartsInitialized.current = true;
      }
    }

    return () => {
      if (chartRef.current) {
        chartRef.current.destroy();
        chartRef.current = null;
      }
      chartsInitialized.current = false;
    };
  }, []); // Empty dependency array - only run once

  // Update chart when values change
  useEffect(() => {
    if (chartRef.current) {
      chartRef.current.data.datasets[0].data = [principalAmount, totalInterest];
      chartRef.current.update();
    }
  }, [principalAmount, totalInterest]);

  // Handle slider changes
  const handlePrincipalAmountChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    setPrincipalAmount(Number(e.target.value));
  }, []);

  const handleInterestRateChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    setInterestRate(Number(e.target.value));
  }, []);

  const handleTenureChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    setTenure(Number(e.target.value));
  }, []);

  // Input change handlers
  const handlePrincipalAmountInputChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    handleInputChange('principalAmount', e.target.value);
  }, [handleInputChange]);

  const handleInterestRateInputChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    handleInputChange('interestRate', e.target.value);
  }, [handleInputChange]);

  const handleTenureInputChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    handleInputChange('tenure', e.target.value);
  }, [handleInputChange]);

  // Format principal amount for display
  const getPrincipalAmountDisplayValue = useCallback(() => {
    return principalAmount === 0 ? '' : principalAmount.toString();
  }, [principalAmount]);

  // Handle tenure type toggle with auto-conversion
  const handleTenureTypeToggle = useCallback((type: 'years' | 'months') => {
    if (type === tenureType) return;

    let convertedValue = tenure;

    if (type === 'months') {
      convertedValue = Math.max(1, Math.round(tenure * 12));
      if (convertedValue > 360) convertedValue = 360;
    } else {
      convertedValue = tenure / 12;
      if (convertedValue < 0.1) convertedValue = 0.1;
      if (convertedValue > 30) convertedValue = 30;
      convertedValue = Math.round(convertedValue * 10) / 10;
    }

    setTenure(convertedValue);
    setTenureType(type);
  }, [tenureType, tenure]);

  // Prevent wheel event from changing input values
  const handleWheelPrevent = useCallback((e: React.WheelEvent<HTMLInputElement>) => {
    e.currentTarget.blur();
  }, []);

  const handleNumberInputWheel = useCallback((e: React.WheelEvent<HTMLInputElement>) => {
    e.currentTarget.blur();
    e.stopPropagation();
  }, []);

  // Reset to default values
  const handleReset = useCallback(() => {
    setPrincipalAmount(100000);
    setInterestRate(7.5);
    setTenure(5);
    setTenureType('years');
    setCompoundingFrequency('quarterly');
  }, []);

  // Get minimum and maximum values for tenure
  const getTenureMinMax = useCallback(() => {
    return {
      min: tenureType === 'years' ? '1' : '1',
      max: tenureType === 'years' ? '30' : '360'
    };
  }, [tenureType]);

  const tenureLimits = getTenureMinMax();

  // Calculate insights data
  const calculateInsights = useCallback(() => {
    const insights = {
      interestPercentageOfPrincipal: principalAmount > 0 ? ((totalInterest / principalAmount) * 100).toFixed(1) : '0',
      averageAnnualInterest: principalAmount > 0
        ? (totalInterest / (tenureType === 'years' ? tenure : tenure / 12)).toFixed(0)
        : '0',
      interestPerDay: totalInterest > 0
        ? (totalInterest / (tenure * (tenureType === 'years' ? 365 : 30.4))).toFixed(0)
        : '0',
      doublingYears: interestRate > 0 ? (72 / interestRate).toFixed(1) : '0'
    };

    return insights;
  }, [principalAmount, totalInterest, tenure, tenureType, interestRate]);

  const insights = calculateInsights();

  // Get compounding frequency description
  const getCompoundingDescription = useCallback(() => {
    switch (compoundingFrequency) {
      case 'monthly':
        return 'Compounded monthly (12 times a year)';
      case 'quarterly':
        return 'Compounded quarterly (4 times a year)';
      case 'annually':
        return 'Compounded annually (once a year)';
      default:
        return 'Compounded quarterly';
    }
  }, [compoundingFrequency]);

  return (
    <div className="w-full px-3 sm:px-4 md:px-6 py-4 sm:py-6 md:py-8">
      <div className="bg-white rounded-xl sm:rounded-2xl shadow-xl overflow-hidden max-w-7xl mx-auto">
        <div className="flex flex-col lg:flex-row p-4 sm:p-6 lg:p-8 font-sans gap-6 lg:gap-8">
          
          {/* Input Section */}
          <div className="flex-1 min-w-0">
            {/* Principal Amount */}
            <div className="mb-5 sm:mb-6">
              <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-2 gap-1">
                <label htmlFor="principalAmount" className="block text-[#2076C7] font-semibold text-sm sm:text-base">
                  Deposit Amount (₹)
                </label>
                {errors.principalAmount && (
                  <span className="text-red-500 text-xs">{errors.principalAmount}</span>
                )}
              </div>
              <div className="slider-container mb-2">
                <input
                  type="range"
                  id="principalAmount"
                  min="10000"
                  max="10000000"
                  step="10000"
                  value={principalAmount}
                  onChange={handlePrincipalAmountChange}
                  className="w-full h-2 bg-gray-300 rounded-lg cursor-pointer slider"
                />
                <div className="flex justify-between text-xs sm:text-sm text-gray-600 mt-1">
                  <span>₹10,000</span>
                  <span>₹1,00,00,000</span>
                </div>
              </div>
              <div className="relative">
                <input
                  type="text"
                  id="principalAmountInput"
                  value={getPrincipalAmountDisplayValue()}
                  onChange={handlePrincipalAmountInputChange}
                  onWheel={handleWheelPrevent}
                  className="w-full px-3 sm:px-4 py-2.5 sm:py-3 border border-gray-300 rounded-lg focus:outline-none focus:border-[#1CADA3] bg-gray-100 focus:bg-white focus:ring-0 focus:ring-teal-200 transition-colors pr-10 sm:pr-12 text-gray-800 text-sm sm:text-base"
                  placeholder="e.g., 100000"
                />
                <span className="absolute right-3 sm:right-4 top-1/2 transform -translate-y-1/2 text-gray-600 font-medium text-sm sm:text-base">₹</span>
              </div>
            </div>

            {/* Interest Rate */}
            <div className="mb-5 sm:mb-6">
              <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-2 gap-1">
                <label htmlFor="interestRate" className="block text-[#2076C7] font-semibold text-sm sm:text-base">
                  Interest Rate (% per annum)
                </label>
                {errors.interestRate && (
                  <span className="text-red-500 text-xs">{errors.interestRate}</span>
                )}
              </div>
              <div className="slider-container mb-2">
                <input
                  type="range"
                  id="interestRate"
                  min="1"
                  max="15"
                  step="0.1"
                  value={interestRate}
                  onChange={handleInterestRateChange}
                  className="w-full h-2 bg-gray-300 rounded-lg cursor-pointer slider"
                />
                <div className="flex justify-between text-xs sm:text-sm text-gray-600 mt-1">
                  <span>1%</span>
                  <span>15%</span>
                </div>
              </div>
              <div className="relative">
                <input
                  type="number"
                  id="interestRateInput"
                  min="1"
                  max="15"
                  step="0.1"
                  value={interestRate === 0 ? '' : interestRate}
                  onChange={handleInterestRateInputChange}
                  onWheel={handleNumberInputWheel}
                  className="w-full px-3 sm:px-4 py-2.5 sm:py-3 border border-gray-300 rounded-lg focus:outline-none focus:border-[#1CADA3] bg-gray-100 focus:bg-white focus:ring-0 focus:ring-teal-200 transition-colors pr-10 sm:pr-12 text-gray-800 text-sm sm:text-base"
                />
                <span className="absolute right-3 sm:right-4 top-1/2 transform -translate-y-1/2 text-gray-600 font-medium text-sm sm:text-base">%</span>
              </div>
            </div>

            {/* Tenure */}
            <div className="mb-5 sm:mb-6">
              <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-2 gap-2">
                <div className="flex flex-col sm:flex-row items-start sm:items-center gap-2 sm:space-x-4">
                  <label htmlFor="tenure" className="block text-[#2076C7] font-semibold text-sm sm:text-base">
                    Deposit Tenure
                  </label>
                  {errors.tenure && (
                    <span className="text-red-500 text-xs">{errors.tenure}</span>
                  )}
                </div>
                <div className="flex space-x-2">
                  <button
                    type="button"
                    onClick={() => handleTenureTypeToggle('years')}
                    className={`px-2 sm:px-3 py-1 text-xs sm:text-sm rounded-full transition-colors ${
                      tenureType === 'years' ? 'bg-[#1CADA3] text-white' : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                    }`}
                  >
                    Years
                  </button>
                  <button
                    type="button"
                    onClick={() => handleTenureTypeToggle('months')}
                    className={`px-2 sm:px-3 py-1 text-xs sm:text-sm rounded-full transition-colors ${
                      tenureType === 'months' ? 'bg-[#1CADA3] text-white' : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                    }`}
                  >
                    Months
                  </button>
                </div>
              </div>
              <div className="slider-container mb-2">
                <input
                  type="range"
                  id="tenure"
                  min={tenureLimits.min}
                  max={tenureLimits.max}
                  step="1"
                  value={tenure}
                  onChange={handleTenureChange}
                  className="w-full h-2 bg-gray-300 rounded-lg cursor-pointer slider"
                />
                <div className="flex justify-between text-xs sm:text-sm text-gray-600 mt-1">
                  <span>{tenureType === 'years' ? '1 Year' : '1 Month'}</span>
                  <span>{tenureType === 'years' ? '30 Years' : '360 Months'}</span>
                </div>
              </div>
              <div className="relative">
                <input
                  type="number"
                  id="tenureInput"
                  min={tenureLimits.min}
                  max={tenureLimits.max}
                  step="1"
                  value={tenure === 0 ? '' : tenure}
                  onChange={handleTenureInputChange}
                  onWheel={handleNumberInputWheel}
                  className="w-full px-3 sm:px-4 py-2.5 sm:py-3 border border-gray-300 rounded-lg focus:outline-none focus:border-[#1CADA3] bg-gray-100 focus:bg-white focus:ring-0 focus:ring-teal-200 transition-colors pr-16 sm:pr-24 text-gray-800 text-sm sm:text-base"
                />
                <span className="absolute right-3 sm:right-4 top-1/2 transform -translate-y-1/2 text-gray-600 font-medium text-xs sm:text-sm">
                  {tenureType === 'years' ? 'Years' : 'Months'}
                </span>
              </div>
            </div>

            {/* Compounding Frequency */}
            <div className="mb-6 sm:mb-8">
              <label className="block text-[#2076C7] font-semibold mb-3 text-sm sm:text-base">
                Compounding Frequency
              </label>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                <button
                  type="button"
                  onClick={() => setCompoundingFrequency('monthly')}
                  className={`py-1.5 sm:py-2 px-2 sm:px-3 rounded-lg border text-xs sm:text-sm transition-all ${
                    compoundingFrequency === 'monthly'
                      ? 'border-[#1CADA3] bg-teal-50 text-[#1CADA3] font-medium'
                      : 'border-gray-300 hover:border-gray-400 text-gray-700'
                  }`}
                >
                  Monthly
                </button>
                <button
                  type="button"
                  onClick={() => setCompoundingFrequency('quarterly')}
                  className={`py-1.5 sm:py-2 px-2 sm:px-3 rounded-lg border text-xs sm:text-sm transition-all ${
                    compoundingFrequency === 'quarterly'
                      ? 'border-[#1CADA3] bg-teal-50 text-[#1CADA3] font-medium'
                      : 'border-gray-300 hover:border-gray-400 text-gray-700'
                  }`}
                >
                  Quarterly
                </button>
                <button
                  type="button"
                  onClick={() => setCompoundingFrequency('annually')}
                  className={`py-1.5 sm:py-2 px-2 sm:px-3 rounded-lg border text-xs sm:text-sm transition-all ${
                    compoundingFrequency === 'annually'
                      ? 'border-[#1CADA3] bg-teal-50 text-[#1CADA3] font-medium'
                      : 'border-gray-300 hover:border-gray-400 text-gray-700'
                  }`}
                >
                  Annually
                </button>
              </div>
              <p className="text-xs text-gray-500 mt-2">
                {getCompoundingDescription()}
              </p>
            </div>

            {/* Reset Button */}
            <button
              onClick={handleReset}
              className="w-full mb-6 px-3 sm:px-4 py-2 sm:py-2.5 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors font-medium border border-gray-300 text-sm sm:text-base"
            >
              Reset to Default Values
            </button>

            {/* Results Section */}
            <div className="bg-gray-50 p-4 sm:p-6 rounded-xl shadow-sm border-l-4 border-[#1CADA3]">
              <div className="text-center mb-4 sm:mb-6">
                <div className="text-xs sm:text-sm text-[#2076C7] font-medium mb-1">Maturity Amount</div>
                <div className="text-2xl sm:text-3xl font-bold text-[#1CADA3] font-sans break-all">
                  {maturityAmount > 0 ? formatCurrency(maturityAmount) : '₹0'}
                </div>
              </div>
              <div className="flex flex-col sm:flex-row justify-between gap-4 sm:gap-0">
                <div className="text-center flex-1 px-2 sm:px-4">
                  <div className="text-base sm:text-lg font-medium font-sans text-[#1CADA3] break-all">
                    {totalInterest > 0 ? formatCurrency(totalInterest) : '₹0'}
                  </div>
                  <div className="text-xs sm:text-sm text-[#1CADA3] mt-1">Total Interest</div>
                </div>
                <div className="text-center flex-1 px-2 sm:px-4">
                  <div className="text-base sm:text-lg font-medium font-sans text-[#1CADA3] break-all">
                    {estimatedReturns > 0 ? formatCurrency(estimatedReturns) : '₹0'}
                  </div>
                  <div className="text-xs sm:text-sm text-[#1CADA3] mt-1">Estimated Returns</div>
                </div>
              </div>
            </div>
          </div>

          {/* Visualization Section */}
          <div className="flex-1 min-w-0">
            <div className="chart-container h-48 sm:h-56 md:h-64 mb-4 sm:mb-6">
              <canvas ref={canvasRef}></canvas>
            </div>

            <div className="bg-gray-50 p-4 sm:p-6 rounded-xl shadow-sm border-l-4 border-[#2076C7] mb-4 sm:mb-6">
              <h5 className="text-[#2076C7] font-semibold mb-3 sm:mb-4 text-base sm:text-lg">FD Summary</h5>
              <div className="space-y-3 sm:space-y-4">
                <div className="flex justify-between pb-2 sm:pb-3 border-b border-gray-200 flex-wrap gap-2">
                  <span className="text-gray-600 text-sm sm:text-base">Deposit Amount</span>
                  <span className="font-medium font-sans text-[#1CADA3] text-sm sm:text-base break-all">
                    {principalAmount > 0 ? formatCurrency(principalAmount) : '₹0'}
                  </span>
                </div>
                <div className="flex justify-between pb-2 sm:pb-3 border-b border-gray-200 flex-wrap gap-2">
                  <span className="text-gray-600 text-sm sm:text-base">Interest Rate</span>
                  <span className="font-medium font-sans text-[#1CADA3] text-sm sm:text-base">
                    {interestRate > 0 ? `${interestRate.toFixed(1)}%` : '0%'}
                  </span>
                </div>
                <div className="flex justify-between pb-2 sm:pb-3 border-b border-gray-200 flex-wrap gap-2">
                  <span className="text-gray-600 text-sm sm:text-base">Tenure</span>
                  <span className="font-medium font-sans text-[#1CADA3] text-sm sm:text-base break-all">
                    {tenure > 0 ? `${tenure} ${tenureType}` : '0'}
                  </span>
                </div>
                <div className="flex justify-between pb-2 sm:pb-3 border-b border-gray-200 flex-wrap gap-2">
                  <span className="text-gray-600 text-sm sm:text-base">Compounding</span>
                  <span className="font-medium font-sans text-[#1CADA3] text-sm sm:text-base capitalize">
                    {compoundingFrequency}
                  </span>
                </div>
                <div className="flex justify-between pt-2 flex-wrap gap-2">
                  <span className="text-gray-600 font-semibold text-sm sm:text-base">Total Interest Earned</span>
                  <span className="font-bold font-sans text-[#1CADA3] text-sm sm:text-base break-all">
                    {totalInterest > 0 ? formatCurrency(totalInterest) : '₹0'}
                  </span>
                </div>
              </div>
            </div>

            {/* Key Insights Section - Inside right column */}
            <div className="bg-white rounded-xl border shadow-md p-4 sm:p-5">
              <h2 className="text-sm sm:text-base font-semibold text-gray-800 mb-2 flex items-center gap-2">
                Key Insights
              </h2>

              <div className="text-gray-700 leading-relaxed text-xs sm:text-sm">
                <ul className="list-disc pl-4 space-y-1.5">
                  <li>
                    Your investment of{' '}
                    <span className="bg-blue-50 px-1.5 py-0.5 rounded font-medium font-sans text-xs">
                      {principalAmount > 0 ? formatCurrency(principalAmount) : '₹0'}
                    </span>{' '}
                    will grow to{' '}
                    <span className="bg-blue-50 px-1.5 py-0.5 rounded font-medium font-sans text-xs">
                      {maturityAmount > 0 ? formatCurrency(maturityAmount) : '₹0'}
                    </span>{' '}
                    in {tenure > 0 ? `${tenure} ${tenureType}` : '0'} at {interestRate > 0 ? interestRate.toFixed(1) : '0'}% interest
                  </li>

                  <li>
                    You will earn{' '}
                    <span className="bg-blue-50 px-1.5 py-0.5 rounded font-medium font-sans text-xs">
                      {totalInterest > 0 ? formatCurrency(totalInterest) : '₹0'}
                    </span>{' '}
                    in interest, which is{' '}
                    <span className="bg-blue-50 px-1.5 py-0.5 rounded font-medium font-sans text-xs">
                      {insights.interestPercentageOfPrincipal}%
                    </span>{' '}
                    of your principal amount
                  </li>

                  <li>
                    Your FD will generate{' '}
                    <span className="bg-blue-50 px-1.5 py-0.5 rounded font-medium font-sans text-xs">
                      ₹{insights.averageAnnualInterest}
                    </span>{' '}
                    average annual interest
                  </li>

                  {(() => {
                    if (interestRate > 1 && principalAmount > 0 && tenure > 0) {
                      const higherRate = interestRate + 1;
                      const periodsPerYear = compoundingFrequency === 'monthly' ? 12 :
                        compoundingFrequency === 'quarterly' ? 4 : 1;
                      const ratePerPeriod = higherRate / (100 * periodsPerYear);
                      const tenureInYears = tenureType === 'months' ? tenure / 12 : tenure;
                      const totalPeriods = periodsPerYear * tenureInYears;
                      const higherAmount = principalAmount * Math.pow(1 + ratePerPeriod, totalPeriods);
                      const extraEarnings = higherAmount - maturityAmount;

                      if (extraEarnings > 0) {
                        return (
                          <li>
                            A 1% higher interest rate could earn you an extra{' '}
                            <span className="bg-blue-50 px-1.5 py-0.5 rounded font-medium font-sans text-xs">
                              {formatCurrency(extraEarnings)}
                            </span>
                          </li>
                        );
                      }
                    }
                    return null;
                  })()}

                  {(() => {
                    if (compoundingFrequency !== 'monthly' && principalAmount > 0 && interestRate > 0 && tenure > 0) {
                      const monthlyRate = interestRate / (100 * 12);
                      const tenureInYears = tenureType === 'months' ? tenure / 12 : tenure;
                      const months = tenureInYears * 12;
                      const monthlyAmount = principalAmount * Math.pow(1 + monthlyRate, months);
                      const difference = monthlyAmount - maturityAmount;

                      if (difference > 0) {
                        return (
                          <li>
                            Monthly compounding would earn{' '}
                            <span className="bg-blue-50 px-1.5 py-0.5 rounded font-medium font-sans text-xs">
                              {formatCurrency(difference)}
                            </span>{' '}
                            more than {compoundingFrequency} compounding
                          </li>
                        );
                      }
                    }
                    return null;
                  })()}

                  {(() => {
                    if (totalInterest > 0) {
                      const taxableAmount = Math.max(0, totalInterest - 40000);
                      const taxPayable = taxableAmount > 0 ? taxableAmount * 0.10 : 0;
                      const netReturn = totalInterest - taxPayable;

                      if (taxableAmount > 0) {
                        return (
                          <li>
                            After TDS (10% tax on interest above ₹40,000), your net interest would be{' '}
                            <span className="bg-blue-50 px-1.5 py-0.5 rounded font-medium font-sans text-xs">
                              {formatCurrency(netReturn)}
                            </span>
                          </li>
                        );
                      }
                    }
                    return null;
                  })()}

                  {(() => {
                    if (maturityAmount > 0 && totalInterest > 0) {
                      const inflationRate = 6;
                      const inflationAdjustedValue = maturityAmount / Math.pow(1 + inflationRate / 100,
                        tenureType === 'months' ? tenure / 12 : tenure);
                      const realReturn = inflationAdjustedValue - principalAmount;

                      return (
                        <li>
                          Adjusted for 6% inflation, your real return would be{' '}
                          <span className="bg-blue-50 px-1.5 py-0.5 rounded font-medium font-sans text-xs">
                            {formatCurrency(realReturn)}
                          </span>{' '}
                          (in today&apos;s money value)
                        </li>
                      );
                    }
                    return null;
                  })()}

                  <li>
                    Your FD generates{' '}
                    <span className="bg-blue-50 px-1.5 py-0.5 rounded font-medium font-sans text-xs">
                      ₹{insights.interestPerDay}
                    </span>{' '}
                    per day in interest income
                  </li>

                  <li>
                    At this rate, your money will double in{' '}
                    <span className="bg-blue-50 px-1.5 py-0.5 rounded font-medium font-sans text-xs">
                      {insights.doublingYears} years
                    </span>{' '}
                    (using the Rule of 72)
                  </li>
                </ul>

                <div className="mt-3 p-2.5 sm:p-3 bg-yellow-50 border border-yellow-200 rounded-lg">
                  <p className="text-xs text-yellow-800">
                    <strong>Investment Tip:</strong> Senior citizens (above 60 years) typically get 0.5% higher FD rates.
                    Consider splitting large FDs into smaller ones to maintain liquidity and avoid breaking the entire FD for partial withdrawals.
                  </p>
                </div>

                <p className="text-[10px] sm:text-[11px] text-gray-500 mt-2">
                  <strong>Note:</strong> FD interest is fully taxable. TDS is deducted at 10% if interest exceeds ₹40,000
                  (₹50,000 for senior citizens). Interest rates vary between banks and change periodically.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

// =============================================
// STANDALONE VERSION (with header and dropdown)
// =============================================
const FDCalculatorStandalone: React.FC = () => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const activeData = CALCULATOR_OPTIONS.find(c => c.id === 'fd') || CALCULATOR_OPTIONS[0];
  const router = useRouter();

  const handleCalculatorChange = useCallback((path: string) => {
    router.push(path);
  }, [router]);

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header - Responsive */}
      <div className="bg-gradient-to-r from-[#2076C7] to-[#1CADA3] text-white py-4 sm:py-6 px-4 sm:px-8 text-center">
        <div className="flex items-center justify-center gap-2 sm:gap-3 mb-1 sm:mb-2">
          <i className="fas fa-chart-pie text-white text-xl sm:text-2xl"></i>
          <h1 className="text-xl sm:text-2xl md:text-3xl font-bold">Fixed Deposit Calculator</h1>
        </div>
        <p className="text-blue-100 text-sm sm:text-base px-2">Calculate the maturity amount of your fixed deposits</p>
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
                      calc.id === 'fd' ? 'bg-teal-500/5' : ''
                    }`}
                  >
                    <div className={`w-7 h-7 sm:w-8 sm:h-8 rounded-lg flex items-center justify-center ${
                      calc.id === 'fd'
                        ? 'bg-teal-500 text-white'
                        : 'bg-gray-100 text-gray-500'
                    }`}>
                      <calc.icon className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
                    </div>
                    <div className="flex-1">
                      <span className={`font-medium text-sm sm:text-base ${
                        calc.id === 'fd' ? 'text-teal-600' : 'text-gray-700'
                      }`}>
                        {calc.label}
                      </span>
                      <p className="text-xs text-gray-400 line-clamp-1 hidden sm:block">{calc.desc}</p>
                    </div>
                    {calc.id === 'fd' && (
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
      <FDCalculatorContent />

      {/* Font Awesome */}
      <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css" />
    </div>
  );
};

// Export both versions
export default FDCalculatorStandalone;