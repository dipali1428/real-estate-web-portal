'use client';

import React, { useState, useEffect, useRef, useCallback } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Chart, DoughnutController, ArcElement, Tooltip, Legend, LineController, LineElement, PointElement, LinearScale, CategoryScale } from 'chart.js';
import { TrendingUp, PieChart, Calculator, Home, User, Building2, LineChart, Timer, ChevronDown, CheckCircle2 } from 'lucide-react';
import { useRouter } from 'next/navigation';

// Register Chart.js components
Chart.register(
  DoughnutController, ArcElement, Tooltip, Legend, LineController, LineElement, PointElement, LinearScale, CategoryScale
);

// Calculator options for dropdown
const CALCULATOR_OPTIONS = [
  { id: 'emi', label: 'EMI Calculator', icon: Calculator, desc: 'Calculate your Equated Monthly Installment with precision.', path: '/page/emi' },
  { id: 'sip', label: 'SIP Calculator', icon: TrendingUp, desc: 'Plan your mutual fund investments and estimate future wealth.', path: '/page/sip' },
  { id: 'sipVsEmi', label: 'EMI VS SIP', icon: Timer, desc: 'Compare how different loan tenures affect your finances.', path: '/page/sipVsEmi' },
  { id: 'homeloan', label: 'Home Loan', icon: Home, desc: 'Estimate your home loan EMI and total interest payable.', path: '/page/homeloan' },
  { id: 'personalloan', label: 'Personal Loan', icon: User, desc: 'Calculate your personal loan EMI and repayment schedule.', path: '/page/personalloan' },
  { id: 'businessloan', label: 'Business Loan', icon: Building2, desc: 'Plan your business expansion with our business loan calculator.', path: '/page/businessloan' },
  { id: 'fd', label: 'FD Calculator', icon: PieChart, desc: 'Calculate the maturity amount of your fixed deposits.', path: '/page/fd' },
  { id: 'compoundinterest', label: 'Compound Interest', icon: LineChart, desc: 'See how your money grows over time with compound interest.', path: '/page/compoundinterest' },
];

// =============================================
// CONTENT ONLY VERSION (no header, no dropdown)
// =============================================
export const CompoundInterestCalculatorContent: React.FC = () => {
  // State for investment parameters with proper initialization
  const [principal, setPrincipal] = useState<number>(100000);
  const [interestRate, setInterestRate] = useState<number>(7.5);
  const [tenureValue, setTenureValue] = useState<number>(12);
  const [tenureUnit, setTenureUnit] = useState<string>('years');
  const [frequency, setFrequency] = useState<string>('yearly');

  // Chart references
  const doughnutChartRef = useRef<Chart<'doughnut'> | null>(null);
  const lineChartRef = useRef<Chart<'line'> | null>(null);
  const doughnutCanvasRef = useRef<HTMLCanvasElement>(null);
  const lineCanvasRef = useRef<HTMLCanvasElement>(null);
  const chartsInitialized = useRef(false);

  // Frequency mapping
  const frequencyMap: Record<string, number> = {
    yearly: 1,
    halfyearly: 2,
    quarterly: 4,
    monthly: 12
  };

  // Format currency for display
  const formatCurrency = useCallback((value: number): string => {
    if (value === 0) return '₹0';
    if (value >= 10000000) {
      return '₹' + (value / 10000000).toFixed(2) + ' Cr';
    }
    if (value >= 100000) {
      return '₹' + (value / 100000).toFixed(2) + ' L';
    }
    return '₹' + value.toFixed(0).replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  }, []);

  // Calculate derived values directly during render (no useEffect needed!)
  const calculateDerivedValues = useCallback(() => {
    const p = Number(principal) || 0;
    const r = Number(interestRate) / 100 || 0;
    const years = tenureUnit === 'years' ? (Number(tenureValue) || 0) : (Number(tenureValue) || 0) / 12;
    const n = frequencyMap[frequency] || 1;

    // Validation
    if (p <= 1000 || r <= 0 || years < 1) {
      return {
        finalAmount: p,
        totalInterest: 0,
        yearlyData: []
      };
    }

    const finalAmountValue = p * Math.pow(1 + r / n, n * years);
    const totalInterestValue = finalAmountValue - p;

    // Generate yearly data for the chart
    const yearlyDataCalc = [];
    const totalYears = Math.max(1, Math.ceil(years));
    
    for (let year = 1; year <= totalYears; year++) {
      const t = Math.min(year, years);
      const amount = p * Math.pow(1 + r / n, n * t);
      yearlyDataCalc.push({
        year: `Year ${year}`,
        amount: Math.round(amount),
        interest: Math.round(amount - p),
        principal: Math.round(p)
      });
    }
    
    // Add final period if needed
    if (years < totalYears) {
      yearlyDataCalc.push({
        year: `${(years * 12).toFixed(0)} months`,
        amount: Math.round(finalAmountValue),
        interest: Math.round(totalInterestValue),
        principal: Math.round(p)
      });
    }

    return {
      finalAmount: finalAmountValue,
      totalInterest: totalInterestValue,
      yearlyData: yearlyDataCalc,
    };
  }, [principal, interestRate, tenureValue, tenureUnit, frequency, frequencyMap]);

  const { finalAmount, totalInterest, yearlyData } = calculateDerivedValues();

  // Handle input changes with proper type safety
  const handleInputChange = useCallback((field: string, value: string) => {
    if (value === '') {
      switch (field) {
        case 'principal':
          setPrincipal(0);
          break;
        case 'interestRate':
          setInterestRate(0);
          break;
        case 'tenureValue':
          setTenureValue(0);
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
        case 'principal':
          setPrincipal(Math.max(0, Math.min(numValue, 10000000)));
          break;
        case 'interestRate':
          setInterestRate(Math.max(0, Math.min(numValue, 25)));
          break;
        case 'tenureValue':
          if (tenureUnit === 'years') {
            setTenureValue(Math.max(1, Math.min(numValue, 50)));
          } else {
            setTenureValue(Math.max(1, Math.min(numValue, 600)));
          }
          break;
      }
    }
  }, [tenureUnit]);

  // Initialize charts only once
  useEffect(() => {
    if (chartsInitialized.current) return;
    
    if (doughnutCanvasRef.current && !doughnutChartRef.current) {
      const ctx = doughnutCanvasRef.current.getContext('2d');
      if (ctx) {
        doughnutChartRef.current = new Chart(ctx, {
          type: 'doughnut',
          data: {
            labels: ['Principal', 'Interest'],
            datasets: [{
              data: [principal, totalInterest],
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
      }
    }

    if (lineCanvasRef.current && !lineChartRef.current && yearlyData.length > 0) {
      const ctx = lineCanvasRef.current.getContext('2d');
      if (ctx) {
        lineChartRef.current = new Chart(ctx, {
          type: 'line',
          data: {
            labels: yearlyData.map(d => d.year).slice(0, 5),
            datasets: [{
              label: 'Investment Value',
              data: yearlyData.slice(0, 5).map(d => d.amount),
              borderColor: '#1CADA3',
              backgroundColor: 'rgba(28, 173, 163, 0.1)',
              borderWidth: 3,
              pointBackgroundColor: '#2076C7',
              pointBorderColor: '#2076C7',
              pointRadius: 6,
              pointHoverRadius: 8,
              fill: true,
              tension: 0.4
            }]
          },
          options: {
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
              legend: {
                display: false
              }
            },
            scales: {
              y: {
                beginAtZero: true,
                ticks: {
                  callback: function(value) {
                    if (typeof value === 'number') {
                      return formatCurrency(value);
                    }
                    return value;
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
      if (doughnutChartRef.current) {
        doughnutChartRef.current.destroy();
        doughnutChartRef.current = null;
      }
      if (lineChartRef.current) {
        lineChartRef.current.destroy();
        lineChartRef.current = null;
      }
      chartsInitialized.current = false;
    };
  }, [formatCurrency, principal, totalInterest, yearlyData]);

  // Update doughnut chart when values change
  useEffect(() => {
    if (doughnutChartRef.current) {
      doughnutChartRef.current.data.datasets[0].data = [principal, totalInterest];
      doughnutChartRef.current.update();
    }
  }, [principal, totalInterest]);

  // Update line chart when yearlyData changes
  useEffect(() => {
    if (lineChartRef.current && yearlyData.length > 0) {
      lineChartRef.current.data.labels = yearlyData.map(d => d.year);
      lineChartRef.current.data.datasets[0].data = yearlyData.map(d => d.amount);
      lineChartRef.current.update();
    }
  }, [yearlyData]);

  // Handle slider changes
  const handlePrincipalChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPrincipal(Number(e.target.value));
  };

  const handleInterestRateChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInterestRate(Number(e.target.value));
  };

  const handleTenureValueChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setTenureValue(Number(e.target.value));
  };

  // Input change handlers
  const handlePrincipalInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    handleInputChange('principal', e.target.value);
  };

  const handleInterestRateInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    handleInputChange('interestRate', e.target.value);
  };

  const handleTenureValueInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    handleInputChange('tenureValue', e.target.value);
  };

  // Get display values
  const getPrincipalDisplayValue = () => principal === 0 ? '' : principal.toString();
  const getInterestRateDisplayValue = () => interestRate === 0 ? '' : interestRate.toString();
  const getTenureValueDisplayValue = () => tenureValue === 0 ? '' : tenureValue.toString();

  // Get max values based on unit
  const getTenureMax = () => tenureUnit === 'years' ? 50 : 600;
  const getTenureLabel = () => tenureUnit === 'years' ? 'Years' : 'Months';

  return (
    <div className="w-full px-3 sm:px-4 md:px-6 py-4 sm:py-6 md:py-8">
      <div className="bg-white rounded-xl sm:rounded-2xl shadow-xl overflow-hidden max-w-7xl mx-auto">
        <div className="flex flex-col lg:flex-row p-4 sm:p-6 lg:p-8 font-sans gap-6 lg:gap-8">
          
          {/* Input Section */}
          <div className="flex-1 min-w-0">
            {/* Principal Amount */}
            <div className="mb-5 sm:mb-6">
              <label htmlFor="principal" className="block text-[#2076C7] font-semibold mb-2 text-sm sm:text-base">
                Principal Amount (₹)
              </label>
              <div className="slider-container mb-2">
                <input
                  type="range"
                  id="principal"
                  min="1000"
                  max="10000000"
                  step="1000"
                  value={principal}
                  onChange={handlePrincipalChange}
                  className="w-full h-2 bg-gray-300 rounded-lg cursor-pointer slider"
                />
                <div className="flex justify-between text-xs sm:text-sm text-gray-600 mt-1">
                  <span>₹1,000</span>
                  <span>₹1,00,00,000</span>
                </div>
              </div>
              <div className="relative">
                <input
                  type="text"
                  id="principalInput"
                  value={getPrincipalDisplayValue()}
                  onChange={handlePrincipalInputChange}
                  className="w-full px-3 sm:px-4 py-2.5 sm:py-3 border border-gray-300 rounded-lg focus:outline-none focus:border-[#1CADA3] bg-gray-100 focus:bg-white focus:ring-0 focus:ring-teal-200 transition-colors pr-10 sm:pr-12 text-gray-800 text-sm sm:text-base"
                  placeholder="Enter principal amount"
                />
                <span className="absolute right-3 sm:right-4 top-1/2 transform -translate-y-1/2 text-gray-600 font-medium text-sm sm:text-base">₹</span>
              </div>
            </div>

            {/* Interest Rate */}
            <div className="mb-5 sm:mb-6">
              <label htmlFor="interestRate" className="block text-[#2076C7] font-semibold mb-2 text-sm sm:text-base">
                Annual Interest Rate (%)
              </label>
              <div className="slider-container mb-2">
                <input
                  type="range"
                  id="interestRate"
                  min="1"
                  max="25"
                  step="0.1"
                  value={interestRate}
                  onChange={handleInterestRateChange}
                  className="w-full h-2 bg-gray-300 rounded-lg cursor-pointer slider"
                />
                <div className="flex justify-between text-xs sm:text-sm text-gray-600 mt-1">
                  <span>1%</span>
                  <span>25%</span>
                </div>
              </div>
              <div className="relative">
                <input
                  type="number"
                  id="interestRateInput"
                  min="1"
                  max="25"
                  step="0.1"
                  value={getInterestRateDisplayValue()}
                  onChange={handleInterestRateInputChange}
                  className="w-full px-3 sm:px-4 py-2.5 sm:py-3 border border-gray-300 rounded-lg focus:outline-none focus:border-[#1CADA3] bg-gray-100 focus:bg-white focus:ring-0 focus:ring-teal-200 transition-colors pr-10 sm:pr-12 text-gray-800 text-sm sm:text-base"
                />
                <span className="absolute right-3 sm:right-4 top-1/2 transform -translate-y-1/2 text-gray-600 font-medium text-sm sm:text-base">%</span>
              </div>
            </div>

            {/* Tenure */}
            <div className="mb-6 sm:mb-8">
              <label htmlFor="tenureValue" className="block text-[#2076C7] font-semibold mb-2 text-sm sm:text-base">
                Time Period ({getTenureLabel()})
              </label>
              <div className="slider-container mb-2">
                <input
                  type="range"
                  id="tenureValue"
                  min="1"
                  max={getTenureMax()}
                  step="1"
                  value={tenureValue}
                  onChange={handleTenureValueChange}
                  className="w-full h-2 bg-gray-300 rounded-lg cursor-pointer slider"
                />
                <div className="flex justify-between text-xs sm:text-sm text-gray-600 mt-1">
                  <span>1 {tenureUnit}</span>
                  <span>{getTenureMax()} {tenureUnit}</span>
                </div>
              </div>
              <div className="flex flex-col sm:flex-row gap-2">
                <div className="relative flex-1">
                  <input
                    type="number"
                    id="tenureValueInput"
                    min="1"
                    max={getTenureMax()}
                    value={getTenureValueDisplayValue()}
                    onChange={handleTenureValueInputChange}
                    className="w-full px-3 sm:px-4 py-2.5 sm:py-3 border border-gray-300 rounded-lg focus:outline-none focus:border-[#1CADA3] bg-gray-100 focus:bg-white focus:ring-0 focus:ring-teal-200 transition-colors text-gray-800 text-sm sm:text-base"
                  />
                </div>
                <select
                  value={tenureUnit}
                  onChange={(e) => setTenureUnit(e.target.value)}
                  className="px-3 sm:px-4 py-2.5 sm:py-3 border border-gray-300 rounded-lg focus:outline-none focus:border-[#1CADA3] bg-gray-100 focus:bg-white focus:ring-0 focus:ring-teal-200 transition-colors text-gray-800 text-sm sm:text-base"
                >
                  <option value="years">Years</option>
                  <option value="months">Months</option>
                </select>
              </div>
            </div>

            {/* Compounding Frequency */}
            <div className="mb-6 sm:mb-8">
              <label className="block text-[#2076C7] font-semibold mb-3 text-sm sm:text-base">
                Compounding Frequency
              </label>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 sm:gap-3">
                {[
                  { id: 'yearly', label: 'Yearly' },
                  { id: 'halfyearly', label: 'Half-Yearly' },
                  { id: 'quarterly', label: 'Quarterly' },
                  { id: 'monthly', label: 'Monthly' }
                ].map((freq) => (
                  <button
                    key={freq.id}
                    onClick={() => setFrequency(freq.id)}
                    className={`py-2 sm:py-3 px-2 sm:px-4 rounded-lg border-2 transition-all duration-200 text-xs sm:text-sm ${
                      frequency === freq.id 
                        ? 'bg-[#1CADA3] text-white border-[#1CADA3] shadow-md' 
                        : 'bg-gray-50 border-gray-200 hover:bg-gray-100 text-gray-700'
                    }`}
                  >
                    <div className="font-medium">{freq.label}</div>
                  </button>
                ))}
              </div>
            </div>

            {/* Results Section */}
            <div className="bg-gray-50 p-4 sm:p-6 rounded-xl shadow-sm border-l-4 border-[#1CADA3]">
              <div className="text-2xl sm:text-3xl font-bold text-[#1CADA3] font-sans text-center mb-4 sm:mb-6 break-all">
                {finalAmount > 0 ? formatCurrency(finalAmount) : '₹0'}
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
                    {principal > 0 ? formatCurrency(principal) : '₹0'}
                  </div>
                  <div className="text-xs sm:text-sm text-[#1CADA3] mt-1">Principal</div>
                </div>
              </div>
            </div>
          </div>

          {/* Visualization Section */}
          <div className="flex-1 min-w-0">
            <div className="chart-container h-48 sm:h-56 md:h-64 mb-4 sm:mb-6">
              <canvas ref={doughnutCanvasRef}></canvas>
            </div>

            <div className="bg-gray-50 p-4 sm:p-6 rounded-xl shadow-sm border-l-4 border-[#2076C7] mb-4 sm:mb-6">
              <h5 className="text-[#2076C7] font-semibold mb-3 sm:mb-4 text-base sm:text-lg">Investment Summary</h5>
              <div className="space-y-3 sm:space-y-4">
                <div className="flex justify-between pb-2 sm:pb-3 border-b border-gray-200 flex-wrap gap-2">
                  <span className="text-gray-600 text-sm sm:text-base">Principal Amount</span>
                  <span className="font-medium font-sans text-[#1CADA3] text-sm sm:text-base break-all">
                    {principal > 0 ? formatCurrency(principal) : '₹0'}
                  </span>
                </div>
                <div className="flex justify-between pb-2 sm:pb-3 border-b border-gray-200 flex-wrap gap-2">
                  <span className="text-gray-600 text-sm sm:text-base">Total Interest Earned</span>
                  <span className="font-medium font-sans text-[#1CADA3] text-sm sm:text-base break-all">
                    {totalInterest > 0 ? formatCurrency(totalInterest) : '₹0'}
                  </span>
                </div>
                <div className="flex justify-between pb-2 sm:pb-3 border-b border-gray-200 flex-wrap gap-2">
                  <span className="text-gray-600 text-sm sm:text-base">Compounding Frequency</span>
                  <span className="font-medium font-sans text-[#1CADA3] text-sm sm:text-base capitalize">
                    {frequency}
                  </span>
                </div>
                <div className="flex justify-between flex-wrap gap-2">
                  <span className="text-gray-600 text-sm sm:text-base">Final Amount</span>
                  <span className="font-medium font-sans text-[#1CADA3] text-sm sm:text-base break-all">
                    {finalAmount > 0 ? formatCurrency(finalAmount) : '₹0'}
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
                    <span className="font-medium">The magic of interest earning interest</span> - Your investment grows from{' '}
                    <span className="bg-blue-50 px-1.5 py-0.5 rounded font-medium font-sans text-xs">
                      {formatCurrency(principal)}
                    </span>{' '}
                    to{' '}
                    <span className="bg-blue-50 px-1.5 py-0.5 rounded font-medium font-sans text-xs">
                      {formatCurrency(finalAmount)}
                    </span>
                  </li>
                  
                  <li>
                    <span className="font-medium">Start early - Time is your biggest advantage</span> - If you started 5 years earlier, your investment would be worth{' '}
                    <span className="bg-blue-50 px-1.5 py-0.5 rounded font-medium font-sans text-xs">
                      {(() => {
                        const years = tenureUnit === 'years' ? tenureValue : tenureValue / 12;
                        const n = frequencyMap[frequency] || 1;
                        const r = interestRate / 100;
                        const extraYears = years + 5;
                        const amountWithExtraTime = principal * Math.pow(1 + r / n, n * extraYears);
                        return formatCurrency(amountWithExtraTime - finalAmount);
                      })()}
                    </span>{' '}
                    more
                  </li>
                  
                  <li>
                    <span className="font-medium">Monthly compounding beats yearly significantly</span> - With{' '}
                    <span className="bg-blue-50 px-1.5 py-0.5 rounded font-medium font-sans text-xs">{frequency}</span>{' '}
                    compounding, you earn{' '}
                    <span className="bg-blue-50 px-1.5 py-0.5 rounded font-medium font-sans text-xs">
                      {(() => {
                        if (frequency !== 'yearly') {
                          const years = tenureUnit === 'years' ? tenureValue : tenureValue / 12;
                          const currentN = frequencyMap[frequency] || 1;
                          const yearlyN = 1;
                          const r = interestRate / 100;
                          
                          const currentAmount = finalAmount;
                          const yearlyAmount = principal * Math.pow(1 + r / yearlyN, yearlyN * years);
                          const extraEarnings = currentAmount - yearlyAmount;
                          
                          return formatCurrency(extraEarnings);
                        }
                        return '₹0';
                      })()}
                    </span>{' '}
                    more than yearly compounding
                  </li>
                  
                  <li>
                    <span className="font-medium">The Rule of 72</span> - At{' '}
                    <span className="bg-blue-50 px-1.5 py-0.5 rounded font-medium font-sans text-xs">{interestRate}%</span>{' '}
                    interest, your money doubles in approximately{' '}
                    <span className="bg-blue-50 px-1.5 py-0.5 rounded font-medium font-sans text-xs">
                      {(72 / interestRate).toFixed(1)} years
                    </span>
                  </li>
                  
                  <li>
                    <span className="font-medium">Consistency matters more than timing</span> - Your investment earns{' '}
                    <span className="bg-blue-50 px-1.5 py-0.5 rounded font-medium font-sans text-xs">
                      {formatCurrency(totalInterest)}
                    </span>{' '}
                    in interest, which is{' '}
                    <span className="bg-blue-50 px-1.5 py-0.5 rounded font-medium font-sans text-xs">
                      {((totalInterest / principal) * 100).toFixed(1)}%
                    </span>{' '}
                    of your principal
                  </li>
                  
                  <li>
                    With simple interest, you would earn only{' '}
                    <span className="bg-blue-50 px-1.5 py-0.5 rounded font-medium font-sans text-xs">
                      {formatCurrency(
                        principal * (interestRate / 100) * (tenureUnit === 'years' ? tenureValue : tenureValue / 12)
                      )}
                    </span>{' '}
                    - that&apos;s{' '}
                    <span className="bg-blue-50 px-1.5 py-0.5 rounded font-medium font-sans text-xs">
                      {formatCurrency(
                        totalInterest - (principal * (interestRate / 100) * (tenureUnit === 'years' ? tenureValue : tenureValue / 12))
                      )}
                    </span>{' '}
                    less than compound interest!
                  </li>
                </ul>
                
                <div className="mt-3 p-2.5 sm:p-3 bg-yellow-50 border border-yellow-200 rounded-lg">
                  <p className="text-xs text-yellow-800">
                    <strong>Pro Tip:</strong> Start investing early, stay consistent, and let compounding work its magic over time.
                    Even small, regular investments can grow into significant wealth.
                  </p>
                </div>
                
                <p className="text-[10px] sm:text-[11px] text-gray-500 mt-2">
                  <strong>Note:</strong> This calculation assumes consistent returns and doesn&apos;t account for inflation or taxes. 
                  Actual returns may vary based on market conditions.
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
const CompoundInterestCalculatorStandalone: React.FC = () => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const router = useRouter();
  const activeData = CALCULATOR_OPTIONS.find(c => c.id === 'compoundinterest') || CALCULATOR_OPTIONS[0];

  const handleCalculatorChange = (path: string) => {
    router.push(path);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header - Responsive */}
      <div className="bg-gradient-to-r from-[#2076C7] to-[#1CADA3] text-white py-4 sm:py-6 px-4 sm:px-8 text-center">
        <h1 className="text-xl sm:text-2xl md:text-3xl font-bold mb-1 sm:mb-2">Compound Interest Calculator</h1>
        <p className="text-blue-100 text-sm sm:text-base px-2">Calculate your investment growth with compounding</p>
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
                      calc.id === 'compoundinterest' ? 'bg-teal-500/5' : ''
                    }`}
                  >
                    <div className={`w-7 h-7 sm:w-8 sm:h-8 rounded-lg flex items-center justify-center ${
                      calc.id === 'compoundinterest' 
                        ? 'bg-teal-500 text-white' 
                        : 'bg-gray-100 text-gray-500'
                    }`}>
                      <calc.icon className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
                    </div>
                    <div className="flex-1">
                      <span className={`font-medium text-sm sm:text-base ${
                        calc.id === 'compoundinterest' ? 'text-teal-600' : 'text-gray-700'
                      }`}>
                        {calc.label}
                      </span>
                      <p className="text-xs text-gray-400 line-clamp-1 hidden sm:block">{calc.desc}</p>
                    </div>
                    {calc.id === 'compoundinterest' && (
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
      <CompoundInterestCalculatorContent />
    </div>
  );
};

// Export both versions
export default CompoundInterestCalculatorStandalone;