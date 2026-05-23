"use client";

import React, { useState, useEffect, useRef, useCallback } from 'react';
import { Chart, DoughnutController, ArcElement, Tooltip, Legend } from 'chart.js';
import { motion, AnimatePresence } from 'motion/react';
import { TrendingUp, PieChart, Calculator, Home, User, Building2, LineChart, Timer, ChevronDown, CheckCircle2 } from 'lucide-react';
import { useRouter } from 'next/navigation';

// Register Chart.js components
Chart.register(DoughnutController, ArcElement, Tooltip, Legend);

// Calculator options for dropdown (only used in standalone version)
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

// Main Calculator Component (without any header/dropdown)
const EMICalculatorContent: React.FC = () => {
  // Only store input state
  const [loanAmount, setLoanAmount] = useState<number>(1000000);
  const [interestRate, setInterestRate] = useState<number>(8.5);
  const [loanTenure, setLoanTenure] = useState<number>(20);

  const chartRef = useRef<Chart<'doughnut'> | null>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const chartsInitialized = useRef(false);

  const formatCurrency = useCallback((value: number): string => {
    if (value === 0 || isNaN(value)) return '₹0';
    return '₹' + value.toFixed(0).replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  }, []);

  // Calculate derived values directly during render (NO STATE, NO EFFECT!)
  const calculateDerivedValues = useCallback(() => {
    const loanAmountNum = Number(loanAmount) || 0;
    const interestRateNum = Number(interestRate) || 0;
    const loanTenureNum = Number(loanTenure) || 0;

    // Validation
    if (loanAmountNum < 100000 || interestRateNum < 7 || loanTenureNum < 1) {
      return {
        emi: 0,
        totalPayment: 0,
        totalInterest: 0
      };
    }

    const monthlyInterestRate = interestRateNum / 12 / 100;
    const tenureMonths = loanTenureNum * 12;

    const emiValue = loanAmountNum * monthlyInterestRate *
      Math.pow(1 + monthlyInterestRate, tenureMonths) /
      (Math.pow(1 + monthlyInterestRate, tenureMonths) - 1);

    const totalPaymentValue = emiValue * tenureMonths;
    const totalInterestValue = totalPaymentValue - loanAmountNum;

    return {
      emi: emiValue,
      totalPayment: totalPaymentValue,
      totalInterest: totalInterestValue
    };
  }, [loanAmount, interestRate, loanTenure]);

  // Get derived values directly - these are what we use for rendering
  const { emi, totalPayment, totalInterest } = calculateDerivedValues();

  const handleInputChange = useCallback((field: string, value: string) => {
    if (value === '') {
      switch (field) {
        case 'loanAmount':
          setLoanAmount(0);
          break;
        case 'interestRate':
          setInterestRate(0);
          break;
        case 'loanTenure':
          setLoanTenure(0);
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
        case 'loanAmount':
          setLoanAmount(numValue);
          break;
        case 'interestRate':
          setInterestRate(numValue);
          break;
        case 'loanTenure':
          setLoanTenure(numValue);
          break;
      }
    }
  }, []);

  // Initialize chart only once
  useEffect(() => {
    if (chartsInitialized.current) return;

    if (canvasRef.current && !chartRef.current) {
      const ctx = canvasRef.current.getContext('2d');
      if (ctx) {
        chartRef.current = new Chart(ctx, {
          type: 'doughnut',
          data: {
            labels: ['Principal', 'Interest'],
            datasets: [{
              data: [loanAmount, totalInterest],
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
      chartRef.current.data.datasets[0].data = [loanAmount, totalInterest];
      chartRef.current.update();
    }
  }, [loanAmount, totalInterest]);

  const handleLoanAmountChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    setLoanAmount(Number(e.target.value));
  }, []);

  const handleInterestRateChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    setInterestRate(Number(e.target.value));
  }, []);

  const handleLoanTenureChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    setLoanTenure(Number(e.target.value));
  }, []);

  const handleLoanAmountInputChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    handleInputChange('loanAmount', e.target.value);
  }, [handleInputChange]);

  const handleInterestRateInputChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    handleInputChange('interestRate', e.target.value);
  }, [handleInputChange]);

  const handleLoanTenureInputChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    handleInputChange('loanTenure', e.target.value);
  }, [handleInputChange]);

  const getLoanAmountDisplayValue = useCallback(() => {
    return loanAmount === 0 ? '' : loanAmount.toString();
  }, [loanAmount]);

  const getInterestRateDisplayValue = useCallback(() => {
    return interestRate === 0 ? '' : interestRate.toString();
  }, [interestRate]);

  const getLoanTenureDisplayValue = useCallback(() => {
    return loanTenure === 0 ? '' : loanTenure.toString();
  }, [loanTenure]);

  return (
    <div className="w-full px-3 sm:px-4 md:px-6 py-4 sm:py-6 md:py-8">
      <div className="bg-white rounded-xl sm:rounded-2xl shadow-xl overflow-hidden max-w-7xl mx-auto">
        <div className="flex flex-col lg:flex-row p-4 sm:p-6 lg:p-8 font-sans">
          {/* Input Section */}
          <div className="flex-1 min-w-0 lg:pr-6 xl:pr-8 lg:border-r border-gray-200">
            {/* Loan Amount */}
            <div className="mb-5 sm:mb-6">
              <label htmlFor="loanAmount" className="block text-[#2076C7] font-semibold mb-2 text-sm sm:text-base">
                Loan Amount (₹)
              </label>
              <div className="slider-container mb-2">
                <input
                  type="range"
                  id="loanAmount"
                  min="100000"
                  max="50000000"
                  step="10000"
                  value={loanAmount}
                  onChange={handleLoanAmountChange}
                  className="w-full h-2 bg-gray-300 rounded-lg cursor-pointer slider"
                />
                <div className="flex justify-between text-xs sm:text-sm text-gray-600 mt-1">
                  <span>₹1,00,000</span>
                  <span>₹5,00,00,000</span>
                </div>
              </div>
              <div className="relative">
                <input
                  type="text"
                  id="loanAmountInput"
                  value={getLoanAmountDisplayValue()}
                  onChange={handleLoanAmountInputChange}
                  className="w-full px-3 sm:px-4 py-2.5 sm:py-3 border border-gray-300 rounded focus:outline-none focus:border-[#1CADA3] bg-gray-100 focus:bg-white focus:ring-0 focus:ring-teal-200 transition-colors pr-10 sm:pr-12 text-gray-800 placeholder:text-gray-500 text-sm sm:text-base"
                  placeholder="Enter loan amount"
                />
                <span className="absolute right-3 sm:right-4 top-1/2 transform -translate-y-1/2 text-gray-600 font-medium text-sm sm:text-base">₹</span>
              </div>
            </div>

            {/* Interest Rate */}
            <div className="mb-5 sm:mb-6">
              <label htmlFor="interestRate" className="block text-[#2076C7] font-semibold mb-2 text-sm sm:text-base">
                Interest Rate (% per annum)
              </label>
              <div className="slider-container mb-2">
                <input
                  type="range"
                  id="interestRate"
                  min="7"
                  max="50"
                  step="0.1"
                  value={interestRate}
                  onChange={handleInterestRateChange}
                  className="w-full h-2 bg-gray-300 rounded-lg cursor-pointer slider"
                />
                <div className="flex justify-between text-xs sm:text-sm text-gray-600 mt-1">
                  <span>7%</span>
                  <span>50%</span>
                </div>
              </div>
              <div className="relative">
                <input
                  type="number"
                  id="interestRateInput"
                  min="7"
                  max="50"
                  step="0.1"
                  value={getInterestRateDisplayValue()}
                  onChange={handleInterestRateInputChange}
                  className="w-full px-3 sm:px-4 py-2.5 sm:py-3 border border-gray-300 rounded focus:outline-none focus:border-[#1CADA3] bg-gray-100 focus:bg-white focus:ring-0 focus:ring-teal-200 transition-colors pr-10 sm:pr-12 text-gray-800 placeholder:text-gray-500 text-sm sm:text-base"
                />
                <span className="absolute right-3 sm:right-4 top-1/2 transform -translate-y-1/2 text-gray-600 font-medium text-sm sm:text-base">%</span>
              </div>
            </div>

            {/* Loan Tenure */}
            <div className="mb-6 sm:mb-8">
              <label htmlFor="loanTenure" className="block text-[#2076C7] font-semibold mb-2 text-sm sm:text-base">
                Loan Tenure (Years)
              </label>
              <div className="slider-container mb-2">
                <input
                  type="range"
                  id="loanTenure"
                  min="1"
                  max="30"
                  step="1"
                  value={loanTenure}
                  onChange={handleLoanTenureChange}
                  className="w-full h-2 bg-gray-300 rounded-lg cursor-pointer slider"
                />
                <div className="flex justify-between text-xs sm:text-sm text-gray-600 mt-1">
                  <span>1 Year</span>
                  <span>30 Years</span>
                </div>
              </div>
              <div className="relative">
                <input
                  type="number"
                  id="loanTenureInput"
                  min="1"
                  max="30"
                  value={getLoanTenureDisplayValue()}
                  onChange={handleLoanTenureInputChange}
                  className="w-full px-3 sm:px-4 py-2.5 sm:py-3 border border-gray-300 rounded focus:outline-none focus:border-[#1CADA3] bg-gray-100 focus:bg-white focus:ring-0 focus:ring-teal-200 transition-colors pr-16 sm:pr-20 text-gray-800 placeholder:text-gray-500 text-sm sm:text-base"
                />
                <span className="absolute right-3 sm:right-4 top-1/2 transform -translate-y-1/2 text-gray-600 font-medium text-sm sm:text-base">Years</span>
              </div>
            </div>

            {/* Results Section */}
            <div className="bg-gray-50 p-4 sm:p-6 rounded-xl shadow-sm border-l-4 border-[#1CADA3]">
              <div className="text-2xl sm:text-3xl font-bold text-[#1CADA3] font-sans text-center mb-4 sm:mb-6 break-all">
                {emi > 0 ? formatCurrency(emi) : '₹0'}
              </div>
              <div className="flex flex-col sm:flex-row justify-between gap-4 sm:gap-0">
                <div className="text-center flex-1 px-2 sm:px-4">
                  <div className="text-base sm:text-lg font-medium font-sans text-[#1CADA3] break-all">
                    {totalPayment > 0 ? formatCurrency(totalPayment) : '₹0'}
                  </div>
                  <div className="text-xs sm:text-sm text-[#1CADA3] mt-1">Total Payment</div>
                </div>
                <div className="text-center flex-1 px-2 sm:px-4">
                  <div className="text-base sm:text-lg font-medium font-sans text-[#1CADA3] break-all">
                    {totalInterest > 0 ? formatCurrency(totalInterest) : '₹0'}
                  </div>
                  <div className="text-xs sm:text-sm text-[#1CADA3] mt-1">Total Interest</div>
                </div>
              </div>
            </div>
          </div>

          {/* Visualization Section */}
          <div className="flex-1 min-w-0 lg:pl-6 xl:pl-8 mt-6 lg:mt-0">
            <div className="chart-container h-48 sm:h-56 md:h-64 mb-4 sm:mb-6">
              <canvas ref={canvasRef}></canvas>
            </div>

            <div className="bg-gray-50 p-4 sm:p-6 rounded-xl shadow-sm border-l-4 border-[#2076C7] mb-4 sm:mb-6">
              <h5 className="text-[#2076C7] font-semibold mb-3 sm:mb-4 text-base sm:text-lg">Loan Summary</h5>
              <div className="space-y-3 sm:space-y-4">
                <div className="flex justify-between pb-2 sm:pb-3 border-b border-gray-200">
                  <span className="text-gray-600 text-sm sm:text-base">Principal Amount</span>
                  <span className="font-medium font-sans text-[#1CADA3] text-sm sm:text-base break-all">
                    {loanAmount > 0 ? formatCurrency(loanAmount) : '₹0'}
                  </span>
                </div>
                <div className="flex justify-between pb-2 sm:pb-3 border-b border-gray-200">
                  <span className="text-gray-600 text-sm sm:text-base">Total Interest Payable</span>
                  <span className="font-medium font-sans text-[#1CADA3] text-sm sm:text-base break-all">
                    {totalInterest > 0 ? formatCurrency(totalInterest) : '₹0'}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600 text-sm sm:text-base">Total Amount Payable</span>
                  <span className="font-medium font-sans text-[#1CADA3] text-sm sm:text-base break-all">
                    {totalPayment > 0 ? formatCurrency(totalPayment) : '₹0'}
                  </span>
                </div>
              </div>
            </div>

            {/* Insights Section */}
            <div className="bg-white rounded-xl border shadow-md p-4 sm:p-5">
              <h2 className="text-sm sm:text-base font-semibold text-gray-800 mb-2 flex items-center gap-2">
                Key Insights
              </h2>

              <div className="text-gray-700 leading-relaxed text-xs sm:text-sm">
                <ul className="list-disc pl-4 space-y-1.5">
                  <li>
                    <span className="font-medium">Your monthly commitment</span> - You need to pay{' '}
                    <span className="bg-blue-50 px-1.5 py-0.5 rounded font-medium font-sans text-xs">
                      {formatCurrency(emi)}
                    </span>{' '}
                    every month for {loanTenure} years
                  </li>
                  
                  <li>
                    <span className="font-medium">Interest adds significant cost</span> - You pay{' '}
                    <span className="bg-blue-50 px-1.5 py-0.5 rounded font-medium font-sans text-xs">
                      {formatCurrency(totalInterest)}
                    </span>{' '}
                    in interest, which is{' '}
                    <span className="bg-blue-50 px-1.5 py-0.5 rounded font-medium font-sans text-xs">
                      {((totalInterest / loanAmount) * 100).toFixed(1)}%
                    </span>{' '}
                    of your loan amount
                  </li>
                  
                  <li>
                    <span className="font-medium">Shorter tenure saves interest</span> - Reducing tenure by 5 years would increase your EMI by{' '}
                    <span className="bg-blue-50 px-1.5 py-0.5 rounded font-medium font-sans text-xs">
                      {(() => {
                        if (loanTenure > 5) {
                          const shorterTenure = loanTenure - 5;
                          const monthlyRate = interestRate / 12 / 100;
                          const shorterMonths = shorterTenure * 12;
                          const shorterEMI = loanAmount * monthlyRate *
                            Math.pow(1 + monthlyRate, shorterMonths) /
                            (Math.pow(1 + monthlyRate, shorterMonths) - 1);
                          return formatCurrency(shorterEMI - emi);
                        }
                        return '₹0';
                      })()}
                    </span>{' '}
                    but save significant interest
                  </li>
                  
                  <li>
                    <span className="font-medium">Even 0.5% rate reduction matters</span> - At{' '}
                    <span className="bg-blue-50 px-1.5 py-0.5 rounded font-medium font-sans text-xs">
                      {(interestRate - 0.5).toFixed(1)}%
                    </span>{' '}
                    instead of {interestRate}%, you would save{' '}
                    <span className="bg-blue-50 px-1.5 py-0.5 rounded font-medium font-sans text-xs">
                      {(() => {
                        const lowerRate = interestRate - 0.5;
                        const monthlyRate = lowerRate / 12 / 100;
                        const months = loanTenure * 12;
                        const lowerEMI = loanAmount * monthlyRate *
                          Math.pow(1 + monthlyRate, months) /
                          (Math.pow(1 + monthlyRate, months) - 1);
                        const lowerTotal = lowerEMI * months;
                        return formatCurrency(totalPayment - lowerTotal);
                      })()}
                    </span>
                  </li>
                  
                  <li>
                    <span className="font-medium">Consider prepayments</span> - A single{' '}
                    <span className="bg-blue-50 px-1.5 py-0.5 rounded font-medium font-sans text-xs">
                      ₹50,000
                    </span>{' '}
                    prepayment in year 1 can reduce total interest by{' '}
                    <span className="bg-blue-50 px-1.5 py-0.5 rounded font-medium font-sans text-xs">
                      {formatCurrency(totalInterest * 0.015)}
                    </span>
                  </li>
                  
                  <li>
                    For every ₹100 you repay,{' '}
                    <span className="bg-blue-50 px-1.5 py-0.5 rounded font-medium font-sans text-xs">
                      ₹{((totalInterest / totalPayment) * 100).toFixed(0)}
                    </span>{' '}
                    goes towards interest and only{' '}
                    <span className="bg-blue-50 px-1.5 py-0.5 rounded font-medium font-sans text-xs">
                      ₹{((loanAmount / totalPayment) * 100).toFixed(0)}
                    </span>{' '}
                    reduces your principal
                  </li>
                </ul>
                
                <div className="mt-3 p-2.5 sm:p-3 bg-yellow-50 border border-yellow-200 rounded-lg">
                  <p className="text-xs text-yellow-800">
                    <strong>Pro Tip:</strong> Aim to make at least one extra EMI payment each year. 
                    This can reduce your loan tenure by several years and save lakhs in interest payments.
                  </p>
                </div>
                
                <p className="text-[10px] sm:text-[11px] text-gray-500 mt-2">
                  <strong>Note:</strong> This calculation doesn&apos;t account for processing fees, insurance, or any other charges. 
                  Actual EMI may vary based on lender policies.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

// Standalone version with header and dropdown (for direct access)
const EMICalculatorStandalone: React.FC = () => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const router = useRouter();
  const activeData = CALCULATOR_OPTIONS.find(c => c.id === 'emi') || CALCULATOR_OPTIONS[0];

  const handleCalculatorChange = useCallback((path: string) => {
    router.push(path);
  }, [router]);

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header - Responsive */}
      <div className="bg-linear-to-r from-[#2076C7] to-[#1CADA3] text-white py-4 sm:py-6 px-4 sm:px-8 text-center">
        <h1 className="text-xl sm:text-2xl md:text-3xl font-bold mb-1 sm:mb-2">EMI Calculator</h1>
        <p className="text-blue-100 text-sm sm:text-base px-2">Calculate your Equated Monthly Installment</p>
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
                      calc.id === 'emi' ? 'bg-teal-500/5' : ''
                    }`}
                  >
                    <div className={`w-7 h-7 sm:w-8 sm:h-8 rounded-lg flex items-center justify-center ${
                      calc.id === 'emi' 
                        ? 'bg-teal-500 text-white' 
                        : 'bg-gray-100 text-gray-500'
                    }`}>
                      <calc.icon className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
                    </div>
                    <div className="flex-1">
                      <span className={`font-medium text-sm sm:text-base ${
                        calc.id === 'emi' ? 'text-teal-600' : 'text-gray-700'
                      }`}>
                        {calc.label}
                      </span>
                      <p className="text-xs text-gray-400 line-clamp-1 hidden sm:block">{calc.desc}</p>
                    </div>
                    {calc.id === 'emi' && (
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
      <EMICalculatorContent />
    </div>
  );
};

// Export both versions
export { EMICalculatorContent };
export default EMICalculatorStandalone;