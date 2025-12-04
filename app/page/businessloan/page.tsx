"use client";

import { useState, useEffect, ChangeEvent, WheelEvent, useRef } from 'react';
import { Chart, DoughnutController, ArcElement, Tooltip, Legend } from 'chart.js';

// Register Chart.js components
Chart.register(DoughnutController, ArcElement, Tooltip, Legend);

type PaymentFrequency = 
  | 'daily' 
  | 'weekly' 
  | 'biweekly' 
  | 'semimonthly' 
  | 'monthly' 
  | 'bimonthly' 
  | 'quarterly' 
  | 'semiannually' 
  | 'annually' 
  | 'continuous';

interface PaymentScheduleEntry {
  period: number;
  payment: number;
  principal: number;
  interest: number;
  balance: number;
}

const frequencyMap: Record<PaymentFrequency, number> = {
  daily: 365,
  weekly: 52,
  biweekly: 26,
  semimonthly: 24,
  monthly: 12,
  bimonthly: 6,
  quarterly: 4,
  semiannually: 2,
  annually: 1,
  continuous: 0
};

const frequencyOptions: { value: PaymentFrequency; label: string }[] = [
  { value: 'daily', label: 'Daily' },
  { value: 'weekly', label: 'Weekly' },
  { value: 'biweekly', label: 'Bi-Weekly (Every 2 weeks)' },
  { value: 'semimonthly', label: 'Semi-Monthly (Twice a month)' },
  { value: 'monthly', label: 'Monthly (APR)' },
  { value: 'bimonthly', label: 'Bi-Monthly (Every 2 months)' },
  { value: 'quarterly', label: 'Quarterly' },
  { value: 'semiannually', label: 'Semi-Annually' },
  { value: 'annually', label: 'Annually (APY)' },
  { value: 'continuous', label: 'Continuously' },
];

export default function LoanCalculator() {
  // State for loan parameters
  const [loanAmount, setLoanAmount] = useState<number>(500000);
  const [annualInterestRate, setAnnualInterestRate] = useState<number>(8.5);
  const [loanTermMonths, setLoanTermMonths] = useState<number>(60);
  const [paymentFrequency, setPaymentFrequency] = useState<PaymentFrequency>('monthly');
  
  // State for pagination
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [itemsPerPage, setItemsPerPage] = useState<number>(12);

  // State for calculated values
  const [paymentAmount, setPaymentAmount] = useState<number>(0);
  const [totalInterest, setTotalInterest] = useState<number>(0);
  const [totalPayment, setTotalPayment] = useState<number>(0);
  const [effectiveAnnualRate, setEffectiveAnnualRate] = useState<number>(0);
  const [amortizationSchedule, setAmortizationSchedule] = useState<PaymentScheduleEntry[]>([]);
  const [fullAmortizationSchedule, setFullAmortizationSchedule] = useState<PaymentScheduleEntry[]>([]);

  // Chart reference
  const chartRef = useRef<Chart<'doughnut'> | null>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  // Format currency for display
  const formatCurrency = (value: number): string => {
    if (isNaN(value) || value === 0) return '₹0';
    return '₹' + value.toFixed(0).replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  };

  const formatCurrencyWithDecimals = (value: number): string => {
    if (isNaN(value) || value === 0) return '₹0.00';
    return '₹' + value.toFixed(2).replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  };

  const formatLoanTerm = (months: number) => {
    if (months === 0) return '0 months';
    
    const years = Math.floor(months / 12);
    const remainingMonths = months % 12;
    
    if (years > 0) {
      return `${years} year${years !== 1 ? 's' : ''}${remainingMonths > 0 ? `, ${remainingMonths} month${remainingMonths !== 1 ? 's' : ''}` : ''}`;
    }
    return `${months} month${months !== 1 ? 's' : ''}`;
  };

  // Calculate total number of payments
  const calculateTotalPayments = () => {
    if (paymentFrequency === 'continuous') {
      return 1;
    }
    const paymentsPerYear = frequencyMap[paymentFrequency];
    const loanTermYears = loanTermMonths / 12;
    return Math.ceil(loanTermYears * paymentsPerYear);
  };

  // Calculate loan payments
  const calculateLoanPayments = () => {
    if (!loanAmount || loanAmount < 10000 || loanAmount === 0) {
      return;
    }

    if (!annualInterestRate || annualInterestRate < 0.1 || annualInterestRate === 0) {
      return;
    }

    if (!loanTermMonths || loanTermMonths < 1 || loanTermMonths === 0) {
      return;
    }

    const paymentsPerYear = frequencyMap[paymentFrequency];
    const annualRateDecimal = annualInterestRate / 100;
    const loanTermYears = loanTermMonths / 12;
    
    let calculatedPaymentAmount: number;
    let calculatedTotalPayment: number;
    let calculatedTotalInterest: number;
    let calculatedEffectiveAnnualRate: number;
    let totalPayments: number;
    
    if (paymentFrequency === 'continuous') {
      // Continuously compounded interest
      calculatedTotalPayment = loanAmount * Math.exp(annualRateDecimal * loanTermYears);
      calculatedTotalInterest = calculatedTotalPayment - loanAmount;
      calculatedPaymentAmount = calculatedTotalPayment;
      calculatedEffectiveAnnualRate = (Math.exp(annualRateDecimal) - 1) * 100;
      totalPayments = 1;
    } else {
      // Standard periodic payments
      totalPayments = Math.ceil(loanTermYears * paymentsPerYear);
      const periodicInterestRate = annualRateDecimal / paymentsPerYear;
      
      if (periodicInterestRate === 0) {
        calculatedPaymentAmount = loanAmount / totalPayments;
      } else {
        const rateFactor = Math.pow(1 + periodicInterestRate, totalPayments);
        calculatedPaymentAmount = (loanAmount * periodicInterestRate * rateFactor) / (rateFactor - 1);
      }
      
      calculatedTotalPayment = calculatedPaymentAmount * totalPayments;
      calculatedTotalInterest = calculatedTotalPayment - loanAmount;
      calculatedEffectiveAnnualRate = (Math.pow(1 + periodicInterestRate, paymentsPerYear) - 1) * 100;
    }
    
    // Generate FULL amortization schedule (all periods)
    const fullSchedule = generateFullAmortizationSchedule(
      loanAmount,
      calculatedPaymentAmount,
      annualRateDecimal,
      totalPayments,
      paymentsPerYear,
      paymentFrequency
    );
    
    // Set full schedule
    setFullAmortizationSchedule(fullSchedule);
    
    // Set initial display schedule (first page)
    const initialDisplaySchedule = fullSchedule.slice(0, itemsPerPage);
    setAmortizationSchedule(initialDisplaySchedule);
    
    setPaymentAmount(calculatedPaymentAmount);
    setTotalInterest(calculatedTotalInterest);
    setTotalPayment(calculatedTotalPayment);
    setEffectiveAnnualRate(calculatedEffectiveAnnualRate);

    // Update chart
    updateChart(loanAmount, calculatedTotalInterest);
    
    // Reset to first page
    setCurrentPage(1);
  };

  // Generate FULL amortization schedule
  const generateFullAmortizationSchedule = (
    initialLoanAmount: number,
    monthlyPayment: number,
    annualInterestRate: number,
    totalPayments: number,
    paymentsPerYear: number,
    frequency: PaymentFrequency
  ): PaymentScheduleEntry[] => {
    const schedule: PaymentScheduleEntry[] = [];
    let balance = initialLoanAmount;
    
    for (let period = 1; period <= totalPayments; period++) {
      let interestPayment: number;
      let principalPayment: number;
      
      if (frequency === 'continuous') {
        if (period === 1) {
          interestPayment = balance * (Math.exp(annualInterestRate * (totalPayments / 12)) - 1);
          principalPayment = initialLoanAmount;
          balance = 0;
        } else {
          break;
        }
      } else {
        const periodicInterestRate = annualInterestRate / paymentsPerYear;
        interestPayment = balance * periodicInterestRate;
        principalPayment = monthlyPayment - interestPayment;
        
        // Adjust last payment
        if (balance - principalPayment < 0) {
          principalPayment = balance;
          interestPayment = monthlyPayment - principalPayment;
        }
        
        balance -= principalPayment;
        
        if (balance < 0) {
          principalPayment += balance;
          balance = 0;
        }
      }
      
      schedule.push({
        period,
        payment: monthlyPayment,
        principal: principalPayment,
        interest: interestPayment,
        balance: Math.max(0, balance)
      });
      
      if (balance <= 0) break;
    }
    
    return schedule;
  };

  // Update the chart with new data
  const updateChart = (principal: number, interest: number) => {
    if (chartRef.current) {
      chartRef.current.data.datasets[0].data = [principal, interest];
      chartRef.current.update();
    }
  };

  // Initialize chart
  useEffect(() => {
    if (canvasRef.current) {
      const ctx = canvasRef.current.getContext('2d');
      if (ctx) {
        chartRef.current = new Chart(ctx, {
          type: 'doughnut',
          data: {
            labels: ['Loan Amount', 'Total Interest'],
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
              },
              tooltip: {
                callbacks: {
                  label: function(context) {
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
      }
    }

    return () => {
      if (chartRef.current) {
        chartRef.current.destroy();
      }
    };
  }, []);

  // Calculate loan payments when parameters change
  useEffect(() => {
    calculateLoanPayments();
  }, [loanAmount, annualInterestRate, loanTermMonths, paymentFrequency]);

  // Update displayed schedule when page or items per page changes
  useEffect(() => {
    if (fullAmortizationSchedule.length > 0) {
      const startIndex = (currentPage - 1) * itemsPerPage;
      const endIndex = startIndex + itemsPerPage;
      const currentSchedule = fullAmortizationSchedule.slice(startIndex, endIndex);
      setAmortizationSchedule(currentSchedule);
    }
  }, [currentPage, itemsPerPage, fullAmortizationSchedule]);

  // Pagination controls
  const totalPages = Math.ceil(fullAmortizationSchedule.length / itemsPerPage);
  
  const handlePageChange = (newPage: number) => {
    if (newPage >= 1 && newPage <= totalPages) {
      setCurrentPage(newPage);
    }
  };

  const handleItemsPerPageChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const newItemsPerPage = parseInt(e.target.value);
    setItemsPerPage(newItemsPerPage);
    setCurrentPage(1); // Reset to first page when changing items per page
  };

  // Handle slider changes
  const handleLoanAmountChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setLoanAmount(Number(e.target.value));
  };

  const handleInterestRateChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setAnnualInterestRate(Number(e.target.value));
  };

  const handleTenureChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setLoanTermMonths(Number(e.target.value));
  };

  // Handle input changes
  const handleInputChange = (field: string, value: string) => {
    if (value === '') {
      switch (field) {
        case 'loanAmount':
          setLoanAmount(0);
          break;
        case 'annualInterestRate':
          setAnnualInterestRate(0);
          break;
        case 'loanTermMonths':
          setLoanTermMonths(0);
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
        case 'annualInterestRate':
          setAnnualInterestRate(numValue);
          break;
        case 'loanTermMonths':
          setLoanTermMonths(numValue);
          break;
      }
    }
  };

  // Handle input changes with proper typing
  const handleLoanAmountInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    handleInputChange('loanAmount', e.target.value);
  };

  const handleInterestRateInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    handleInputChange('annualInterestRate', e.target.value);
  };

  const handleTenureInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    handleInputChange('loanTermMonths', e.target.value);
  };

  // Get display value for inputs
  const getLoanAmountDisplayValue = () => {
    return loanAmount === 0 ? '' : loanAmount.toString();
  };

  const getInterestRateDisplayValue = () => {
    return annualInterestRate === 0 ? '' : annualInterestRate.toString();
  };

  const getTenureDisplayValue = () => {
    return loanTermMonths === 0 ? '' : loanTermMonths.toString();
  };

  // Prevent wheel event from changing input values
  const handleWheel = (e: React.WheelEvent<HTMLInputElement>) => {
    e.currentTarget.blur();
  };

  const handleNumberInputWheel = (e: React.WheelEvent<HTMLInputElement>) => {
    e.currentTarget.blur();
    e.stopPropagation();
  };
  

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Loan Calculator */}
      <div className="container mx-auto px-4 py-8">
        <div className="bg-white rounded-2xl shadow-xl overflow-hidden max-w-6xl mx-auto">
          <div className="bg-linear-to-r from-[#2076C7] to-[#1CADA3] text-white py-6 px-8 text-center">
            <h1 className="text-3xl font-bold mb-2">Business Loan Calculator</h1>
            <p className="text-blue-100">Calculate your Loan EMI and Payment Schedule</p>
          </div>

          <div className="flex flex-col lg:flex-row p-6 lg:p-8 font-sans">
            {/* Input Section */}
            <div className="flex-1 min-w-0 lg:pr-8 lg:border-r border-gray-200">
              
              {/* Loan Amount */}
              <div className="mb-6">
                <label htmlFor="loanAmount" className="block text-[#2076C7] font-semibold mb-2">
                  Loan Amount (₹)
                </label>
                <div className="slider-container mb-2">
                  <input
                    type="range"
                    id="loanAmount"
                    min="10000"
                    max="10000000"
                    step="10000"
                    value={loanAmount}
                    onChange={handleLoanAmountChange}
                    className="w-full h-2 bg-gray-300 rounded-lg cursor-pointer slider"
                  />
                  <div className="flex justify-between text-sm text-gray-600 mt-1">
                    <span>₹10,000</span>
                    <span>₹1,00,00,000</span>
                  </div>
                </div>
                <div className="relative">
                  <input
                    type="text"
                    id="loanAmountInput"
                    value={getLoanAmountDisplayValue()}
                    onChange={handleLoanAmountInputChange}
                    onWheel={handleWheel}
                    className="w-full px-4 py-3 border border-gray-300 rounded focus:outline-none focus:border-[#1CADA3] bg-gray-100 focus:bg-white focus:ring-0 focus:ring-teal-200 transition-colors pr-12 text-gray-800 placeholder:text-gray-500"
                    placeholder="Enter loan amount"
                  />
                  <span className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-600 font-medium">₹</span>
                </div>
              </div>

              {/* Interest Rate */}
              <div className="mb-6">
                <label htmlFor="interestRate" className="block text-[#2076C7] font-semibold mb-2">
                  Annual Interest Rate (%)
                </label>
                <div className="slider-container mb-2">
                  <input
                    type="range"
                    id="interestRate"
                    min="0.1"
                    max="30"
                    step="0.1"
                    value={annualInterestRate}
                    onChange={handleInterestRateChange}
                    className="w-full h-2 bg-gray-300 rounded-lg cursor-pointer slider"
                  />
                  <div className="flex justify-between text-sm text-gray-600 mt-1">
                    <span>0.1%</span>
                    <span>30%</span>
                  </div>
                </div>
                <div className="relative">
                  <input
                    type="number"
                    id="interestRateInput"
                    min="0.1"
                    max="30"
                    step="0.1"
                    value={getInterestRateDisplayValue()}
                    onChange={handleInterestRateInputChange}
                    onWheel={handleNumberInputWheel}
                    className="w-full px-4 py-3 border border-gray-300 rounded focus:outline-none focus:border-[#1CADA3] bg-gray-100 focus:bg-white focus:ring-0 focus:ring-teal-200 transition-colors pr-12 text-gray-800 placeholder:text-gray-500"
                  />
                  <span className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-600 font-medium">%</span>
                </div>
              </div>

              {/* Loan Tenure */}
              <div className="mb-6">
                <label htmlFor="loanTerm" className="block text-[#2076C7] font-semibold mb-2">
                  Loan Tenure (Months)
                </label>
                <div className="slider-container mb-2">
                  <input
                    type="range"
                    id="loanTerm"
                    min="1"
                    max="120"
                    step="1"
                    value={loanTermMonths}
                    onChange={handleTenureChange}
                    className="w-full h-2 bg-gray-300 rounded-lg cursor-pointer slider"
                  />
                  <div className="flex justify-between text-sm text-gray-600 mt-1">
                    <span>1 Month</span>
                    <span>120 Months</span>
                  </div>
                </div>
                <div className="relative">
                  <input
                    type="number"
                    id="loanTermInput"
                    min="1"
                    max="120"
                    step="1"
                    value={getTenureDisplayValue()}
                    onChange={handleTenureInputChange}
                    onWheel={handleNumberInputWheel}
                    className="w-full px-4 py-3 border border-gray-300 rounded focus:outline-none focus:border-[#1CADA3] bg-gray-100 focus:bg-white focus:ring-0 focus:ring-teal-200 transition-colors pr-24 text-gray-800 placeholder:text-gray-500"
                  />
                  <span className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-600 font-medium">
                    Months
                  </span>
                </div>
              </div>

              {/* Payment Frequency */}
              <div className="mb-8">
                <label className="block text-[#2076C7] font-semibold mb-3">
                  Payment Frequency
                </label>
                <div className="grid grid-cols-3 gap-3">
                  {frequencyOptions.slice(0, 3).map((option) => (
                    <button
                      key={option.value}
                      type="button"
                      onClick={() => setPaymentFrequency(option.value)}
                      className={`py-3 px-4 rounded-lg border transition-all ${paymentFrequency === option.value ? 'border-[#1CADA3] bg-teal-50 text-[#1CADA3]' : 'border-gray-300 hover:border-gray-400 text-gray-700'}`}
                    >
                      <div className="font-medium">{option.label.split('(')[0]}</div>
                      <div className="text-xs mt-1 opacity-75">
                        {option.label.includes('(') ? option.label.split('(')[1].replace(')', '') : ''}
                      </div>
                    </button>
                  ))}
                </div>
                <div className="grid grid-cols-3 gap-3 mt-3">
                  {frequencyOptions.slice(3, 6).map((option) => (
                    <button
                      key={option.value}
                      type="button"
                      onClick={() => setPaymentFrequency(option.value)}
                      className={`py-3 px-4 rounded-lg border transition-all ${paymentFrequency === option.value ? 'border-[#1CADA3] bg-teal-50 text-[#1CADA3]' : 'border-gray-300 hover:border-gray-400 text-gray-700'}`}
                    >
                      <div className="font-medium">{option.label.split('(')[0]}</div>
                      <div className="text-xs mt-1 opacity-75">
                        {option.label.includes('(') ? option.label.split('(')[1].replace(')', '') : ''}
                      </div>
                    </button>
                  ))}
                </div>
                <div className="grid grid-cols-3 gap-3 mt-3">
                  {frequencyOptions.slice(6).map((option) => (
                    <button
                      key={option.value}
                      type="button"
                      onClick={() => setPaymentFrequency(option.value)}
                      className={`py-3 px-4 rounded-lg border transition-all ${paymentFrequency === option.value ? 'border-[#1CADA3] bg-teal-50 text-[#1CADA3]' : 'border-gray-300 hover:border-gray-400 text-gray-700'}`}
                    >
                      <div className="font-medium">{option.label.split('(')[0]}</div>
                      <div className="text-xs mt-1 opacity-75">
                        {option.label.includes('(') ? option.label.split('(')[1].replace(')', '') : ''}
                      </div>
                    </button>
                  ))}
                </div>
              </div>

              {/* Results Section */}
              <div className="bg-gray-50 p-6 rounded-xl shadow-sm border-l-4 border-[#1CADA3]">
                <div className="text-center mb-6">
                  <div className="text-sm text-[#2076C7] font-medium mb-1">Monthly Payment (EMI)</div>
                  <div className="text-3xl font-bold text-[#1CADA3] font-sans">
                    {paymentAmount > 0 ? formatCurrency(paymentAmount) : '₹0'}
                  </div>
                </div>
                <div className="flex justify-between">
                  <div className="text-center flex-1 px-4">
                    <div className="text-lg font-medium font-sans text-[#1CADA3]">
                      {totalInterest > 0 ? formatCurrency(totalInterest) : '₹0'}
                    </div>
                    <div className="text-sm text-[#1CADA3] mt-1">Total Interest</div>
                  </div>
                  <div className="text-center flex-1 px-4">
                    <div className="text-lg font-medium font-sans text-[#1CADA3]">
                      {totalPayment > 0 ? formatCurrency(totalPayment) : '₹0'}
                    </div>
                    <div className="text-sm text-[#1CADA3] mt-1">Total Payment</div>
                  </div>
                </div>
              </div>
            </div>

            {/* Visualization Section */}
            <div className="flex-1 min-w-0 lg:pl-8 mt-8 lg:mt-0">
              <div className="chart-container h-64 mb-6">
                <canvas ref={canvasRef}></canvas>
              </div>

              <div className="bg-gray-50 p-6 rounded-xl shadow-sm border-l-4 border-[#2076C7]">
                <h5 className="text-[#2076C7] font-semibold mb-4 text-lg">Loan Summary</h5>
                <div className="space-y-4">
                  <div className="flex justify-between pb-3 border-b border-gray-200">
                    <span className="text-gray-600">Loan Amount</span>
                    <span className="font-medium font-sans text-[#1CADA3]">
                      {loanAmount > 0 ? formatCurrency(loanAmount) : '₹0'}
                    </span>
                  </div>
                  <div className="flex justify-between pb-3 border-b border-gray-200">
                    <span className="text-gray-600">Interest Rate</span>
                    <span className="font-medium font-sans text-[#1CADA3]">
                      {annualInterestRate > 0 ? `${annualInterestRate}%` : '0%'}
                    </span>
                  </div>
                  <div className="flex justify-between pb-3 border-b border-gray-200">
                    <span className="text-gray-600">Loan Tenure</span>
                    <span className="font-medium font-sans text-[#1CADA3]">
                      {loanTermMonths > 0 ? formatLoanTerm(loanTermMonths) : '0'}
                    </span>
                  </div>
                  <div className="flex justify-between pb-3 border-b border-gray-200">
                    <span className="text-gray-600">Payment Frequency</span>
                    <span className="font-medium font-sans text-[#1CADA3] capitalize">
                      {paymentFrequency}
                    </span>
                  </div>
                  <div className="flex justify-between pb-3 border-b border-gray-200">
                    <span className="text-gray-600">Total Payments</span>
                    <span className="font-medium font-sans text-[#1CADA3]">
                      {calculateTotalPayments()}
                    </span>
                  </div>
                  <div className="flex justify-between pb-3 border-b border-gray-200">
                    <span className="text-gray-600">Effective Annual Rate</span>
                    <span className="font-medium font-sans text-[#1CADA3]">
                      {effectiveAnnualRate > 0 ? `${effectiveAnnualRate.toFixed(2)}%` : '0%'}
                    </span>
                  </div>
                  <div className="flex justify-between pt-2">
                    <span className="text-gray-600 font-semibold">Total Interest</span>
                    <span className="font-bold font-sans text-[#1CADA3]">
                      {totalInterest > 0 ? formatCurrency(totalInterest) : '₹0'}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* KEY INSIGHTS SECTION - Business Loan */}
      <div className="mt-10 mb-20">
        <div className="max-w-6xl mx-auto">
          <div className="bg-white rounded-xl border shadow-md p-6">
            <h2 className="text-xl font-semibold text-gray-800 mb-4 flex items-center gap-2">
              <i className="fas fa-lightbulb text-yellow-500"></i>
              Key Insights
            </h2>

            <div className="text-gray-700 leading-relaxed">
              <ul className="list-disc pl-5 mb-4 space-y-2">
                <li>
                  Your business will pay{' '}
                  <span className="bg-blue-50 px-2 py-1 rounded font-medium font-sans">
                    {paymentAmount > 0 ? formatCurrency(paymentAmount) : '₹0'}
                  </span>{' '}
                  monthly for {loanTermMonths > 0 ? formatLoanTerm(loanTermMonths) : '0 months'}
                </li>
                
                <li>
                  Total interest cost for your business will be{' '}
                  <span className="bg-blue-50 px-2 py-1 rounded font-medium font-sans">
                    {totalInterest > 0 ? formatCurrency(totalInterest) : '₹0'}
                  </span>{' '}
                  which is{' '}
                  <span className="bg-blue-50 px-2 py-1 rounded font-medium font-sans">
                    {loanAmount > 0 ? ((totalInterest / loanAmount) * 100).toFixed(1) : '0'}%
                  </span>{' '}
                  of the loan amount
                </li>
                
                <li>
                  For every ₹100 repaid,{' '}
                  <span className="bg-blue-50 px-2 py-1 rounded font-medium font-sans">
                    ₹{totalPayment > 0 ? ((totalInterest / totalPayment) * 100).toFixed(0) : '0'}
                  </span>{' '}
                  goes towards interest and{' '}
                  <span className="bg-blue-50 px-2 py-1 rounded font-medium font-sans">
                    ₹{totalPayment > 0 ? ((loanAmount / totalPayment) * 100).toFixed(0) : '0'}
                  </span>{' '}
                  reduces principal
                </li>
                
                {(() => {
                  // Calculate if shorter tenure saves interest
                  if (loanTermMonths > 12 && loanAmount > 0 && annualInterestRate > 0) {
                    const shorterTenure = Math.max(6, loanTermMonths - 12);
                    const shorterPayments = Math.ceil(shorterTenure / 12 * frequencyMap[paymentFrequency]);
                    const periodicInterestRate = (annualInterestRate / 100) / frequencyMap[paymentFrequency];
                    const rateFactor = Math.pow(1 + periodicInterestRate, shorterPayments);
                    const higherEMI = (loanAmount * periodicInterestRate * rateFactor) / (rateFactor - 1);
                    const interestSaved = totalInterest - (higherEMI * shorterPayments - loanAmount);
                    
                    if (interestSaved > 0) {
                      return (
                        <li>
                          Reducing tenure by 1 year could save your business{' '}
                          <span className="bg-blue-50 px-2 py-1 rounded font-medium font-sans">
                            {formatCurrency(interestSaved)}
                          </span>{' '}
                          in interest
                        </li>
                      );
                    }
                  }
                  return null;
                })()}
                
                {(() => {
                  // Calculate tax benefit insight for businesses
                  if (totalInterest > 0) {
                    const taxBenefit = totalInterest * 0.30; // Assuming 30% tax rate for businesses
                    return (
                      <li>
                        Interest payments may be tax deductible, potentially saving your business{' '}
                        <span className="bg-blue-50 px-2 py-1 rounded font-medium font-sans">
                          {formatCurrency(taxBenefit)}
                        </span>{' '}
                        in taxes
                      </li>
                    );
                  }
                  return null;
                })()}
                
                {(() => {
                  // Calculate impact of better credit score/rate
                  if (annualInterestRate > 1 && loanAmount > 0 && loanTermMonths > 0) {
                    const betterRate = annualInterestRate - 2; // 2% better rate for good credit
                    if (betterRate > 0) {
                      const periodicInterestRate = (betterRate / 100) / frequencyMap[paymentFrequency];
                      const totalPayments = calculateTotalPayments();
                      const rateFactor = Math.pow(1 + periodicInterestRate, totalPayments);
                      const betterEMI = (loanAmount * periodicInterestRate * rateFactor) / (rateFactor - 1);
                      const totalSavings = (paymentAmount - betterEMI) * totalPayments;
                      
                      return (
                        <li>
                          A 2% lower interest rate could save{' '}
                          <span className="bg-blue-50 px-2 py-1 rounded font-medium font-sans">
                            {formatCurrency(totalSavings)}
                          </span>{' '}
                          in financing costs
                        </li>
                      );
                    }
                  }
                  return null;
                })()}
                
                {(() => {
                  // Early repayment insight for business cash flow
                  if (totalInterest > 0) {
                    const quarterlyRepaymentSavings = totalInterest * 0.15; // 15% savings with quarterly extra payments
                    return (
                      <li>
                        Making quarterly extra payments could reduce interest by{' '}
                        <span className="bg-blue-50 px-2 py-1 rounded font-medium font-sans">
                          {formatCurrency(quarterlyRepaymentSavings)}
                        </span>
                      </li>
                    );
                  }
                  return null;
                })()}
                
                <li>
                  Effective annual borrowing cost is{' '}
                  <span className="bg-blue-50 px-2 py-1 rounded font-medium font-sans">
                    {effectiveAnnualRate > 0 ? effectiveAnnualRate.toFixed(2) : '0.00'}%
                  </span>{' '}
                  (considers {paymentFrequency} compounding)
                </li>

                {/* Business Loan Specific Insight */}
                <li>
                  Business loans often have{' '}
                  <span className="bg-blue-50 px-2 py-1 rounded font-medium font-sans">
                    flexible repayment options
                  </span>{' '}
                  like EMI holidays during lean seasons
                </li>
              </ul>
              
              <div className="mt-6 p-4 bg-yellow-50 border border-yellow-200 rounded-lg">
                <p className="text-sm text-yellow-800">
                  <strong>💡 Business Strategy Tip:</strong> Match your loan repayment schedule with your business cash flow cycles. 
                  Consider making larger payments during peak business months and smaller payments during lean periods. 
                  Business loan interest is often tax deductible - consult your accountant.
                </p>
              </div>
              
              <p className="text-sm text-gray-600 mt-4">
                <strong>Note for Businesses:</strong> Business loans typically require collateral, business plans, and financial statements. 
                Rates vary based on business vintage, creditworthiness, and loan purpose. Processing fees (1-2.5%) and other charges apply.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}