"use client";

import { useState, useEffect, useRef, useMemo, useCallback } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Chart, DoughnutController, ArcElement, Tooltip, Legend } from 'chart.js';
import { TrendingUp, PieChart, Calculator, Home, User, Building2, LineChart, Timer, ChevronDown, CheckCircle2 } from 'lucide-react';
import { useRouter } from "next/navigation";

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
  { value: 'biweekly', label: 'Bi-Weekly' },
  { value: 'semimonthly', label: 'Semi-Monthly' },
  { value: 'monthly', label: 'Monthly' },
  { value: 'bimonthly', label: 'Bi-Monthly' },
  { value: 'quarterly', label: 'Quarterly' },
  { value: 'semiannually', label: 'Semi-Annually' },
  { value: 'annually', label: 'Annually' },
  { value: 'continuous', label: 'Continuous' },
];

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
export const HomeLoanCalculatorContent: React.FC = () => {
  // State for loan parameters
  const [loanAmount, setLoanAmount] = useState<number>(500000);
  const [annualInterestRate, setAnnualInterestRate] = useState<number>(8.5);
  const [loanTermMonths, setLoanTermMonths] = useState<number>(360);
  const [paymentFrequency, setPaymentFrequency] = useState<PaymentFrequency>('monthly');

  // State for pagination
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [itemsPerPage, setItemsPerPage] = useState<number>(12);

  // Chart reference
  const chartRef = useRef<Chart<'doughnut'> | null>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const chartsInitialized = useRef(false);

  // Format currency for display
  const formatCurrency = useCallback((value: number): string => {
    if (isNaN(value) || value === 0) return '₹0';
    return '₹' + value.toFixed(0).replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  }, []);

  const formatLoanTerm = useCallback((months: number) => {
    if (months === 0) return '0 months';

    const years = Math.floor(months / 12);
    const remainingMonths = months % 12;

    if (years > 0) {
      return `${years} year${years !== 1 ? 's' : ''}${remainingMonths > 0 ? `, ${remainingMonths} month${remainingMonths !== 1 ? 's' : ''}` : ''}`;
    }
    return `${months} month${months !== 1 ? 's' : ''}`;
  }, []);

  // Calculate total number of payments
  const calculateTotalPayments = useCallback(() => {
    if (paymentFrequency === 'continuous') {
      return 1;
    }
    const paymentsPerYear = frequencyMap[paymentFrequency];
    const loanTermYears = loanTermMonths / 12;
    return Math.ceil(loanTermYears * paymentsPerYear);
  }, [paymentFrequency, loanTermMonths]);

  // Generate FULL amortization schedule (pure function)
  const generateFullAmortizationSchedule = useCallback((
    initialLoanAmount: number,
    monthlyPayment: number,
    annualInterestRateDecimal: number,
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
          interestPayment = balance * (Math.exp(annualInterestRateDecimal * (totalPayments / 12)) - 1);
          principalPayment = initialLoanAmount;
          balance = 0;
        } else {
          break;
        }
      } else {
        const periodicInterestRate = annualInterestRateDecimal / paymentsPerYear;
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
  }, []);

  // Calculate derived values directly during render (NO useEffect, NO setState!)
  const calculateDerivedValues = useCallback(() => {
    const loanAmountNum = Number(loanAmount) || 0;
    const annualInterestRateNum = Number(annualInterestRate) || 0;
    const loanTermMonthsNum = Number(loanTermMonths) || 0;

    // Validation
    if (loanAmountNum < 10000 || annualInterestRateNum < 0.1 || loanTermMonthsNum < 1) {
      return {
        paymentAmount: 0,
        totalInterest: 0,
        totalPayment: 0,
        effectiveAnnualRate: 0,
        fullSchedule: []
      };
    }

    const paymentsPerYear = frequencyMap[paymentFrequency];
    const annualRateDecimal = annualInterestRateNum / 100;
    const loanTermYears = loanTermMonthsNum / 12;

    let calculatedPaymentAmount: number;
    let calculatedTotalPayment: number;
    let calculatedTotalInterest: number;
    let calculatedEffectiveAnnualRate: number;
    let totalPayments: number;

    if (paymentFrequency === 'continuous') {
      // Continuously compounded interest
      calculatedTotalPayment = loanAmountNum * Math.exp(annualRateDecimal * loanTermYears);
      calculatedTotalInterest = calculatedTotalPayment - loanAmountNum;
      calculatedPaymentAmount = calculatedTotalPayment;
      calculatedEffectiveAnnualRate = (Math.exp(annualRateDecimal) - 1) * 100;
      totalPayments = 1;
    } else {
      // Standard periodic payments
      totalPayments = Math.ceil(loanTermYears * paymentsPerYear);
      const periodicInterestRate = annualRateDecimal / paymentsPerYear;

      if (periodicInterestRate === 0) {
        calculatedPaymentAmount = loanAmountNum / totalPayments;
      } else {
        const rateFactor = Math.pow(1 + periodicInterestRate, totalPayments);
        calculatedPaymentAmount = (loanAmountNum * periodicInterestRate * rateFactor) / (rateFactor - 1);
      }

      calculatedTotalPayment = calculatedPaymentAmount * totalPayments;
      calculatedTotalInterest = calculatedTotalPayment - loanAmountNum;
      calculatedEffectiveAnnualRate = (Math.pow(1 + periodicInterestRate, paymentsPerYear) - 1) * 100;
    }

    // Generate FULL amortization schedule
    const fullSchedule = generateFullAmortizationSchedule(
      loanAmountNum,
      calculatedPaymentAmount,
      annualRateDecimal,
      totalPayments,
      paymentsPerYear,
      paymentFrequency
    );

    return {
      paymentAmount: calculatedPaymentAmount,
      totalInterest: calculatedTotalInterest,
      totalPayment: calculatedTotalPayment,
      effectiveAnnualRate: calculatedEffectiveAnnualRate,
      fullSchedule: fullSchedule
    };
  }, [loanAmount, annualInterestRate, loanTermMonths, paymentFrequency, generateFullAmortizationSchedule]);

  // Get derived values directly - these are what we use for rendering (NO STATE!)
  const {
    paymentAmount,
    totalInterest,
    totalPayment,
    effectiveAnnualRate,
    fullSchedule: fullAmortizationSchedule
  } = calculateDerivedValues();

  // Get displayed schedule (paginated)
  const amortizationSchedule = useMemo(() => {
    if (fullAmortizationSchedule.length === 0) return [];
    const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    return fullAmortizationSchedule.slice(startIndex, endIndex);
  }, [fullAmortizationSchedule, currentPage, itemsPerPage]);

  // Initialize chart only once
  useEffect(() => {
    if (chartsInitialized.current) return;

    if (canvasRef.current && !chartRef.current) {
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
  }, [formatCurrency, loanAmount, totalInterest]);

  // Update chart when values change (this is the ONLY effect that should set state, and it's for external system sync)
  useEffect(() => {
    if (chartRef.current) {
      chartRef.current.data.datasets[0].data = [loanAmount, totalInterest];
      chartRef.current.update();
    }
  }, [loanAmount, totalInterest]);

  // Handle slider changes
  const handleLoanAmountChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    setLoanAmount(Number(e.target.value));
  }, []);

  const handleInterestRateChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    setAnnualInterestRate(Number(e.target.value));
  }, []);

  const handleTenureChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    setLoanTermMonths(Number(e.target.value));
  }, []);

  // Handle input changes
  const handleInputChange = useCallback((field: string, value: string) => {
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
  }, []);

  const handleLoanAmountInputChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    handleInputChange('loanAmount', e.target.value);
  }, [handleInputChange]);

  const handleInterestRateInputChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    handleInputChange('annualInterestRate', e.target.value);
  }, [handleInputChange]);

  const handleTenureInputChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    handleInputChange('loanTermMonths', e.target.value);
  }, [handleInputChange]);

  // Get display value for inputs
  const getLoanAmountDisplayValue = useCallback(() => {
    return loanAmount === 0 ? '' : loanAmount.toString();
  }, [loanAmount]);

  const getInterestRateDisplayValue = useCallback(() => {
    return annualInterestRate === 0 ? '' : annualInterestRate.toString();
  }, [annualInterestRate]);

  const getTenureDisplayValue = useCallback(() => {
    return loanTermMonths === 0 ? '' : loanTermMonths.toString();
  }, [loanTermMonths]);

  // Prevent wheel event from changing input values
  const handleWheel = useCallback((e: React.WheelEvent<HTMLInputElement>) => {
    e.currentTarget.blur();
  }, []);

  const handleNumberInputWheel = useCallback((e: React.WheelEvent<HTMLInputElement>) => {
    e.currentTarget.blur();
    e.stopPropagation();
  }, []);

  // Pagination controls
  const totalPages = Math.ceil(fullAmortizationSchedule.length / itemsPerPage);

  const handlePageChange = useCallback((newPage: number) => {
    if (newPage >= 1 && newPage <= totalPages) {
      setCurrentPage(newPage);
    }
  }, [totalPages]);

  const handleItemsPerPageChange = useCallback((e: React.ChangeEvent<HTMLSelectElement>) => {
    const newItemsPerPage = parseInt(e.target.value);
    setItemsPerPage(newItemsPerPage);
    setCurrentPage(1);
  }, []);

  return (
    <div className="w-full px-3 sm:px-4 md:px-6 py-4 sm:py-6 md:py-8">
      <div className="bg-white rounded-xl sm:rounded-2xl shadow-xl overflow-hidden max-w-7xl mx-auto">
        <div className="flex flex-col lg:flex-row p-4 sm:p-6 lg:p-8 font-sans gap-6 lg:gap-8">
          
          {/* Input Section */}
          <div className="flex-1 min-w-0">
            {/* Loan Amount */}
            <div className="mb-5 sm:mb-6">
              <label htmlFor="loanAmount" className="block text-[#2076C7] font-semibold mb-2 text-sm sm:text-base">
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
                <div className="flex justify-between text-xs sm:text-sm text-gray-600 mt-1">
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
                  className="w-full px-3 sm:px-4 py-2.5 sm:py-3 border border-gray-300 rounded-lg focus:outline-none focus:border-[#1CADA3] bg-gray-100 focus:bg-white transition-colors pr-10 sm:pr-12 text-gray-800 text-sm sm:text-base"
                  placeholder="Enter loan amount"
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
                  min="0.1"
                  max="30"
                  step="0.1"
                  value={annualInterestRate}
                  onChange={handleInterestRateChange}
                  className="w-full h-2 bg-gray-300 rounded-lg cursor-pointer slider"
                />
                <div className="flex justify-between text-xs sm:text-sm text-gray-600 mt-1">
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
                  className="w-full px-3 sm:px-4 py-2.5 sm:py-3 border border-gray-300 rounded-lg focus:outline-none focus:border-[#1CADA3] bg-gray-100 focus:bg-white transition-colors pr-10 sm:pr-12 text-gray-800 text-sm sm:text-base"
                />
                <span className="absolute right-3 sm:right-4 top-1/2 transform -translate-y-1/2 text-gray-600 font-medium text-sm sm:text-base">%</span>
              </div>
            </div>

            {/* Loan Tenure */}
            <div className="mb-5 sm:mb-6">
              <label htmlFor="loanTerm" className="block text-[#2076C7] font-semibold mb-2 text-sm sm:text-base">
                Loan Tenure (Months)
              </label>
              <div className="slider-container mb-2">
                <input
                  type="range"
                  id="loanTerm"
                  min="1"
                  max="360"
                  step="1"
                  value={loanTermMonths}
                  onChange={handleTenureChange}
                  className="w-full h-2 bg-gray-300 rounded-lg cursor-pointer slider"
                />
                <div className="flex justify-between text-xs sm:text-sm text-gray-600 mt-1">
                  <span>1 Month</span>
                  <span>360 Months</span>
                </div>
              </div>
              <div className="relative">
                <input
                  type="number"
                  id="loanTermInput"
                  min="1"
                  max="360"
                  step="1"
                  value={getTenureDisplayValue()}
                  onChange={handleTenureInputChange}
                  onWheel={handleNumberInputWheel}
                  className="w-full px-3 sm:px-4 py-2.5 sm:py-3 border border-gray-300 rounded-lg focus:outline-none focus:border-[#1CADA3] bg-gray-100 focus:bg-white transition-colors pr-16 sm:pr-24 text-gray-800 text-sm sm:text-base"
                />
                <span className="absolute right-3 sm:right-4 top-1/2 transform -translate-y-1/2 text-gray-600 font-medium text-xs sm:text-sm">
                  Months
                </span>
              </div>
              <div className="mt-2 text-xs sm:text-sm text-gray-600">
                Current: {formatLoanTerm(loanTermMonths)}
              </div>
            </div>

            {/* Payment Frequency */}
            <div className="mb-6 sm:mb-8">
              <label className="block text-[#2076C7] font-semibold mb-3 text-sm sm:text-base">
                Payment Frequency
              </label>
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-3 xl:grid-cols-4 gap-2">
                {frequencyOptions.map((option) => (
                  <button
                    key={option.value}
                    type="button"
                    onClick={() => setPaymentFrequency(option.value)}
                    className={`py-1.5 sm:py-2 px-2 sm:px-3 rounded-lg border text-xs sm:text-sm transition-all ${
                      paymentFrequency === option.value
                        ? 'border-[#1CADA3] bg-teal-50 text-[#1CADA3] font-medium'
                        : 'border-gray-300 hover:border-gray-400 text-gray-700'
                    }`}
                  >
                    {option.label}
                  </button>
                ))}
              </div>
            </div>

            {/* Results Section */}
            <div className="bg-gray-50 p-4 sm:p-6 rounded-xl shadow-sm border-l-4 border-[#1CADA3]">
              <div className="text-center mb-4 sm:mb-6">
                <div className="text-xs sm:text-sm text-[#2076C7] font-medium mb-1">Payment Amount</div>
                <div className="text-2xl sm:text-3xl font-bold text-[#1CADA3] font-sans break-all">
                  {paymentAmount > 0 ? formatCurrency(paymentAmount) : '₹0'}
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
                    {totalPayment > 0 ? formatCurrency(totalPayment) : '₹0'}
                  </div>
                  <div className="text-xs sm:text-sm text-[#1CADA3] mt-1">Total Payment</div>
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
              <h5 className="text-[#2076C7] font-semibold mb-3 sm:mb-4 text-base sm:text-lg">Loan Summary</h5>
              <div className="space-y-3 sm:space-y-4">
                <div className="flex justify-between pb-2 sm:pb-3 border-b border-gray-200 flex-wrap gap-2">
                  <span className="text-gray-600 text-sm sm:text-base">Loan Amount</span>
                  <span className="font-medium font-sans text-[#1CADA3] text-sm sm:text-base break-all">
                    {loanAmount > 0 ? formatCurrency(loanAmount) : '₹0'}
                  </span>
                </div>
                <div className="flex justify-between pb-2 sm:pb-3 border-b border-gray-200 flex-wrap gap-2">
                  <span className="text-gray-600 text-sm sm:text-base">Interest Rate</span>
                  <span className="font-medium font-sans text-[#1CADA3] text-sm sm:text-base">
                    {annualInterestRate > 0 ? `${annualInterestRate}%` : '0%'}
                  </span>
                </div>
                <div className="flex justify-between pb-2 sm:pb-3 border-b border-gray-200 flex-wrap gap-2">
                  <span className="text-gray-600 text-sm sm:text-base">Loan Tenure</span>
                  <span className="font-medium font-sans text-[#1CADA3] text-sm sm:text-base break-all">
                    {loanTermMonths > 0 ? formatLoanTerm(loanTermMonths) : '0'}
                  </span>
                </div>
                <div className="flex justify-between pb-2 sm:pb-3 border-b border-gray-200 flex-wrap gap-2">
                  <span className="text-gray-600 text-sm sm:text-base">Payment Frequency</span>
                  <span className="font-medium font-sans text-[#1CADA3] text-sm sm:text-base capitalize">
                    {paymentFrequency}
                  </span>
                </div>
                <div className="flex justify-between pb-2 sm:pb-3 border-b border-gray-200 flex-wrap gap-2">
                  <span className="text-gray-600 text-sm sm:text-base">Total Payments</span>
                  <span className="font-medium font-sans text-[#1CADA3] text-sm sm:text-base">
                    {calculateTotalPayments()}
                  </span>
                </div>
                <div className="flex justify-between pb-2 sm:pb-3 border-b border-gray-200 flex-wrap gap-2">
                  <span className="text-gray-600 text-sm sm:text-base">Effective Annual Rate</span>
                  <span className="font-medium font-sans text-[#1CADA3] text-sm sm:text-base">
                    {effectiveAnnualRate > 0 ? `${effectiveAnnualRate.toFixed(2)}%` : '0%'}
                  </span>
                </div>
                <div className="flex justify-between pt-2 flex-wrap gap-2">
                  <span className="text-gray-600 font-semibold text-sm sm:text-base">Total Interest</span>
                  <span className="font-bold font-sans text-[#1CADA3] text-sm sm:text-base break-all">
                    {totalInterest > 0 ? formatCurrency(totalInterest) : '₹0'}
                  </span>
                </div>
              </div>
            </div>

            {/* Amortization Schedule Section */}
            {fullAmortizationSchedule.length > 0 && (
              <div className="bg-white rounded-xl border shadow-md p-4 sm:p-5 mt-4 sm:mt-6">
                <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3 mb-4">
                  <h3 className="text-base sm:text-lg font-semibold text-gray-800">Payment Schedule</h3>
                  <div className="flex items-center gap-2 sm:gap-4">
                    <label className="text-xs sm:text-sm text-gray-600">Show:</label>
                    <select
                      value={itemsPerPage}
                      onChange={handleItemsPerPageChange}
                      className="px-2 py-1 border rounded text-xs sm:text-sm text-gray-700"
                    >
                      <option value={6}>6</option>
                      <option value={12}>12</option>
                      <option value={24}>24</option>
                      <option value={48}>48</option>
                    </select>
                  </div>
                </div>
                
                {/* Only add horizontal scroll on mobile, normal table on desktop */}
                <div className="overflow-x-auto lg:overflow-x-visible">
                  <table className="w-full text-xs sm:text-sm min-w-[500px] lg:min-w-0">
                    <thead className="bg-gray-50">
                      <tr>
                        <th className="px-2 sm:px-4 py-2 text-gray-600 text-left">Period</th>
                        <th className="px-2 sm:px-4 py-2 text-gray-600 text-right">Payment</th>
                        <th className="px-2 sm:px-4 py-2 text-gray-600 text-right">Principal</th>
                        <th className="px-2 sm:px-4 py-2 text-gray-600 text-right">Interest</th>
                        <th className="px-2 sm:px-4 py-2 text-gray-600 text-right">Balance</th>
                      </tr>
                    </thead>
                    <tbody>
                      {amortizationSchedule.map((row) => (
                        <tr key={row.period} className="border-t">
                          <td className="px-2 sm:px-4 py-2 text-gray-600">{row.period}</td>
                          <td className="px-2 sm:px-4 py-2 text-gray-600 text-right break-all">{formatCurrency(row.payment)}</td>
                          <td className="px-2 sm:px-4 py-2 text-gray-600 text-right break-all">{formatCurrency(row.principal)}</td>
                          <td className="px-2 sm:px-4 py-2 text-gray-600 text-right break-all">{formatCurrency(row.interest)}</td>
                          <td className="px-2 sm:px-4 py-2 text-gray-600 text-right break-all">{formatCurrency(row.balance)}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
                
                {/* Pagination */}
                {totalPages > 1 && (
                  <div className="flex justify-between items-center mt-4 gap-2">
                    <button
                      onClick={() => handlePageChange(currentPage - 1)}
                      disabled={currentPage === 1}
                      className="px-2 sm:px-3 py-1 text-xs sm:text-sm bg-gray-100 text-gray-600 rounded disabled:opacity-50 hover:bg-gray-200 transition-colors"
                    >
                      Previous
                    </button>
                    <span className="text-xs sm:text-sm text-gray-600">
                      Page {currentPage} of {totalPages}
                    </span>
                    <button
                      onClick={() => handlePageChange(currentPage + 1)}
                      disabled={currentPage === totalPages}
                      className="px-2 sm:px-3 py-1 text-xs sm:text-sm bg-gray-100 text-gray-600 rounded disabled:opacity-50 hover:bg-gray-200 transition-colors"
                    >
                      Next
                    </button>
                  </div>
                )}
              </div>
            )}

            {/* Key Insights Section */}
            <div className="bg-white rounded-xl border shadow-md p-4 sm:p-5 mt-4 sm:mt-6">
              <h2 className="text-sm sm:text-base font-semibold text-gray-800 mb-2 flex items-center gap-2">
                Key Insights
              </h2>

              <div className="text-gray-700 leading-relaxed text-xs sm:text-sm">
                <ul className="list-disc pl-4 space-y-1.5">
                  <li>
                    Your payment amount of{' '}
                    <span className="bg-blue-50 px-1.5 py-0.5 rounded font-medium font-sans text-xs">
                      {formatCurrency(paymentAmount)}
                    </span>{' '}
                    will continue for {formatLoanTerm(loanTermMonths)}
                  </li>

                  <li>
                    You&apos;ll pay{' '}
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

                  <li>
                    A 1% lower interest rate would save you{' '}
                    <span className="bg-blue-50 px-1.5 py-0.5 rounded font-medium font-sans text-xs">
                      {formatCurrency(totalInterest * 0.15)}
                    </span>{' '}
                    over the loan term
                  </li>

                  <li>
                    Making one extra payment early could save approximately{' '}
                    <span className="bg-blue-50 px-1.5 py-0.5 rounded font-medium font-sans text-xs">
                      {formatCurrency(totalInterest * 0.2)}
                    </span>{' '}
                    in interest
                  </li>

                  <li>
                    Your effective annual rate is{' '}
                    <span className="bg-blue-50 px-1.5 py-0.5 rounded font-medium font-sans text-xs">
                      {effectiveAnnualRate.toFixed(2)}%
                    </span>{' '}
                    (higher than the nominal rate due to {paymentFrequency} compounding)
                  </li>
                </ul>

                <div className="mt-3 p-2.5 sm:p-3 bg-yellow-50 border border-yellow-200 rounded-lg">
                  <p className="text-xs text-yellow-800">
                    <strong>Pro Tip:</strong> Consider making at least one extra payment each year.
                    This can reduce your loan tenure by several months and save significant interest costs.
                  </p>
                </div>

                <p className="text-[10px] sm:text-[11px] text-gray-500 mt-2">
                  <strong>Note:</strong> This calculation doesn&apos;t account for processing fees, prepayment charges, or insurance costs.
                  Actual terms may vary based on lender policies and your credit profile.
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
const HomeLoanCalculatorStandalone: React.FC = () => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const router = useRouter();

  const activeData = CALCULATOR_OPTIONS.find(c => c.id === 'homeloan') || CALCULATOR_OPTIONS[0];

  const handleCalculatorChange = useCallback((path: string) => {
    router.push(path);
  }, [router]);

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header - Responsive */}
      <div className="bg-gradient-to-r from-[#2076C7] to-[#1CADA3] text-white py-4 sm:py-6 px-4 sm:px-8 text-center">
        <div className="flex items-center justify-center gap-2 sm:gap-3 mb-1 sm:mb-2">
          <i className="fas fa-home text-white text-xl sm:text-2xl"></i>
          <h1 className="text-xl sm:text-2xl md:text-3xl font-bold">Home Loan Calculator</h1>
        </div>
        <p className="text-blue-100 text-sm sm:text-base px-2">Estimate your home loan EMI and total interest payable</p>
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
                      calc.id === 'homeloan' ? 'bg-teal-500/5' : ''
                    }`}
                  >
                    <div className={`w-7 h-7 sm:w-8 sm:h-8 rounded-lg flex items-center justify-center ${
                      calc.id === 'homeloan'
                        ? 'bg-teal-500 text-white'
                        : 'bg-gray-100 text-gray-500'
                    }`}>
                      <calc.icon className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
                    </div>
                    <div className="flex-1">
                      <span className={`font-medium text-sm sm:text-base ${
                        calc.id === 'homeloan' ? 'text-teal-600' : 'text-gray-700'
                      }`}>
                        {calc.label}
                      </span>
                      <p className="text-xs text-gray-400 line-clamp-1 hidden sm:block">{calc.desc}</p>
                    </div>
                    {calc.id === 'homeloan' && (
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
      <HomeLoanCalculatorContent />

      {/* Font Awesome */}
      <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css" />
    </div>
  );
};

// Export both versions
export default HomeLoanCalculatorStandalone;