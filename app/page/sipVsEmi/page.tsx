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

interface LoanParameters {
  loanAmount: number;
  interestRate: number;
  sipReturn: number;
  shorterTenure: number;
}

interface CalculationResults {
  emi20: number;
  emi30: number;
  emiDifference: number;
  sipValue: number;
  totalInterest20: number;
  totalInterest30: number;
}

interface YearlyBreakdown {
  year: number;
  emiSavings: number;
  sipValue: number;
  loanBalance: number;
  status: string;
  className?: string;
}

interface NotificationState {
  show: boolean;
  message: string;
  type: 'success' | 'error';
}

// =============================================
// CONTENT ONLY VERSION (no header, no dropdown)
// =============================================
export const LoanTenureCalculatorContent: React.FC = () => {
  const [parameters, setParameters] = useState<LoanParameters>({
    loanAmount: 5000000,
    interestRate: 8.5,
    sipReturn: 12,
    shorterTenure: 20,
  });

  const [results, setResults] = useState<CalculationResults>({
    emi20: 43391,
    emi30: 38452,
    emiDifference: 4939,
    sipValue: 14284258,
    totalInterest20: 5413840,
    totalInterest30: 8842720,
  });

  const [yearlyBreakdown, setYearlyBreakdown] = useState<YearlyBreakdown[]>([]);
  const [notification, setNotification] = useState<NotificationState>({
    show: false,
    message: '',
    type: 'success',
  });

  // Calculate EMI
  const calculateEMI = useCallback((principal: number, rate: number, years: number): number => {
    const monthlyRate = rate / 12 / 100;
    const months = years * 12;

    const emi = principal * monthlyRate *
      Math.pow(1 + monthlyRate, months) /
      (Math.pow(1 + monthlyRate, months) - 1);

    return emi;
  }, []);

  // Calculate total interest paid
  const calculateTotalInterest = useCallback((emi: number, principal: number, years: number): number => {
    const totalPayment = emi * years * 12;
    return totalPayment - principal;
  }, []);

  // Calculate SIP Value
  const calculateSIPValue = useCallback((monthlyInvestment: number, rate: number, years: number): number => {
    const monthlyRate = rate / 12 / 100;
    const months = years * 12;

    const futureValue = monthlyInvestment *
      ((Math.pow(1 + monthlyRate, months) - 1) / monthlyRate) *
      (1 + monthlyRate);

    return futureValue;
  }, []);

  // Format currency
  const formatCurrency = useCallback((amount: number): string => {
    if (isNaN(amount) || amount === null || amount === undefined) {
      return '₹0';
    }

    if (amount >= 10000000) {
      return '₹' + (amount / 10000000).toFixed(2) + ' Cr';
    } else if (amount >= 100000) {
      return '₹' + (amount / 100000).toFixed(1) + ' L';
    } else {
      return '₹' + amount.toFixed(0).replace(/\d(?=(\d{3})+$)/g, '$&,');
    }
  }, []);

  // Show notification
  const showNotification = useCallback((message: string, type: 'success' | 'error') => {
    setNotification({
      show: true,
      message,
      type,
    });

    setTimeout(() => {
      setNotification(prev => ({ ...prev, show: false }));
    }, 5000);
  }, []);

  // Handle input changes
  const handleInputChange = (field: keyof LoanParameters, value: string) => {
    if (value === '') {
      setParameters(prev => ({
        ...prev,
        [field]: 0,
      }));
      return;
    }

    const cleanValue = value.replace(/[^\d.]/g, '');
    const parts = cleanValue.split('.');
    if (parts.length > 2) return;

    const numValue = parseFloat(cleanValue);
    if (!isNaN(numValue)) {
      setParameters(prev => ({
        ...prev,
        [field]: numValue,
      }));
    }
  };

  // Calculate impact
  const calculateImpact = useCallback(() => {
    const { loanAmount, interestRate, sipReturn, shorterTenure } = parameters;

    // Validate inputs
    if (!loanAmount || loanAmount < 100000) {
      showNotification('Please enter a valid loan amount (min ₹1,00,000)', 'error');
      return;
    }

    if (!interestRate || interestRate < 1) {
      showNotification('Please enter a valid interest rate (min 1%)', 'error');
      return;
    }

    if (!sipReturn || sipReturn < 1) {
      showNotification('Please enter a valid SIP return rate (min 1%)', 'error');
      return;
    }

    if (!shorterTenure || shorterTenure < 1 || shorterTenure >= 30) {
      showNotification('Base tenure must be between 1 and 29 years', 'error');
      return;
    }

    // Calculate EMIs
    const emi20 = calculateEMI(loanAmount, interestRate, shorterTenure);
    const emi30 = calculateEMI(loanAmount, interestRate, 30);
    const emiDifference = emi20 - emi30;
    const sipValue = calculateSIPValue(emiDifference, sipReturn, 30);
    const totalInterest20 = calculateTotalInterest(emi20, loanAmount, shorterTenure);
    const totalInterest30 = calculateTotalInterest(emi30, loanAmount, 30);

    setResults({
      emi20,
      emi30,
      emiDifference,
      sipValue,
      totalInterest20,
      totalInterest30,
    });

    // Calculate yearly breakdown
    const breakdown: YearlyBreakdown[] = [];
    let remainingBalance = loanAmount;
    let sipCurrentValue = 0;
    const monthlyRate = interestRate / 12 / 100;
    const sipMonthlyRate = sipReturn / 12 / 100;
    const emi30Value = calculateEMI(loanAmount, interestRate, 30);

    let loanPayoffYear = 30;
    let sipExceedsYear: number | null = null;
    let loanClosedBySipYear: number | null = null;

    for (let year = 1; year <= 30; year++) {
      if (loanClosedBySipYear !== null) break;

      if (remainingBalance <= 0) {
        for (let month = 1; month <= 12; month++) {
          sipCurrentValue = (sipCurrentValue + emiDifference) * (1 + sipMonthlyRate);
        }

        breakdown.push({
          year,
          emiSavings: emiDifference * 12,
          sipValue: sipCurrentValue,
          loanBalance: 0,
          status: 'Loan Closed (Regular)',
          className: 'bg-green-50',
        });
        continue;
      }

      for (let month = 1; month <= 12; month++) {
        const interestPayment = remainingBalance * monthlyRate;
        const principalPayment = emi30Value - interestPayment;
        remainingBalance -= principalPayment;

        if (remainingBalance <= 0 && loanPayoffYear === 30) {
          loanPayoffYear = year;
          remainingBalance = 0;
          break;
        }
      }

      for (let month = 1; month <= 12; month++) {
        sipCurrentValue = (sipCurrentValue + emiDifference) * (1 + sipMonthlyRate);
      }

      if (sipCurrentValue >= remainingBalance && sipExceedsYear === null && remainingBalance > 0) {
        sipExceedsYear = year;
      }

      if (sipCurrentValue >= remainingBalance && remainingBalance > 0 && loanClosedBySipYear === null) {
        loanClosedBySipYear = year;
        remainingBalance = 0;
      }

      const status = remainingBalance <= 0
        ? (loanClosedBySipYear === year ? 'Loan Closed (SIP)' : 'Loan Closed (Regular)')
        : 'Loan Active';

      let className = '';
      if (loanClosedBySipYear === year) {
        className = 'bg-green-200 font-bold';
      } else if (remainingBalance <= 0) {
        className = 'bg-green-50 font-bold';
      } else if (sipCurrentValue >= remainingBalance && sipExceedsYear === year && remainingBalance > 0) {
        className = 'bg-yellow-100 font-bold';
      }

      breakdown.push({
        year,
        emiSavings: emiDifference * 12,
        sipValue: sipCurrentValue,
        loanBalance: Math.max(0, remainingBalance),
        status: status + (sipCurrentValue >= remainingBalance && sipExceedsYear === year && remainingBalance > 0 ? ' (SIP > Loan)' : ''),
        className,
      });

      if (loanClosedBySipYear === year) break;
    }

    setYearlyBreakdown(breakdown);
  }, [parameters, calculateEMI, calculateSIPValue, calculateTotalInterest, showNotification]);

  const resetForm = () => {
    setParameters({
      loanAmount: 5000000,
      interestRate: 8.5,
      sipReturn: 12,
      shorterTenure: 20,
    });
    showNotification('Form reset successfully!', 'success');
  };

  useEffect(() => {
    // calculateImpact();
  }, [calculateImpact]);

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="bg-white rounded-2xl shadow-xl overflow-hidden max-w-6xl mx-auto">
        <div className="p-6 lg:p-8 font-sans">

          {/* Loan & Investment Parameters Card */}
          <div className="bg-white rounded-xl border border-gray-200 p-6 mb-8">
            <div className="flex items-center mb-6 pb-4 border-b border-gray-200">
              <div className="w-12 h-12 bg-teal-50 rounded-lg flex items-center justify-center text-teal-500 mr-4">
                <i className="fas fa-calculator text-2xl"></i>
              </div>
              <div>
                <h2 className="text-xl font-bold text-gray-800">Loan & Investment Parameters</h2>
                <p className="text-sm text-gray-600">Adjust the parameters to see the impact of loan tenure on your finances</p>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-6">
              <div>
                <label className="block text-[#2076C7] font-semibold text-sm mb-2">Loan Amount (₹)</label>
                <input
                  type="number"
                  value={parameters.loanAmount === 0 ? '' : parameters.loanAmount}
                  onChange={(e) => handleInputChange('loanAmount', e.target.value)}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-[#1CADA3] bg-gray-100 focus:bg-white transition-colors text-gray-800"
                  min="100000"
                  step="100000"
                />
              </div>

              <div>
                <label className="block text-[#2076C7] font-semibold text-sm mb-2">Interest Rate (%)</label>
                <input
                  type="number"
                  value={parameters.interestRate === 0 ? '' : parameters.interestRate}
                  onChange={(e) => handleInputChange('interestRate', e.target.value)}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-[#1CADA3] bg-gray-100 focus:bg-white transition-colors text-gray-800"
                  min="1"
                  max="30"
                  step="0.1"
                />
              </div>

              <div>
                <label className="block text-[#2076C7] font-semibold text-sm mb-2">SIP Expected Return (%)</label>
                <input
                  type="number"
                  value={parameters.sipReturn === 0 ? '' : parameters.sipReturn}
                  onChange={(e) => handleInputChange('sipReturn', e.target.value)}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-[#1CADA3] bg-gray-100 focus:bg-white transition-colors text-gray-800"
                  min="1"
                  max="30"
                  step="0.1"
                />
              </div>

              <div>
                <label className="block text-[#2076C7] font-semibold text-sm mb-2">Base Tenure (Years)</label>
                <input
                  type="number"
                  value={parameters.shorterTenure === 0 ? '' : parameters.shorterTenure}
                  onChange={(e) => handleInputChange('shorterTenure', e.target.value)}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-[#1CADA3] bg-gray-100 focus:bg-white transition-colors text-gray-800"
                  min="1"
                  max="29"
                  step="1"
                />
              </div>
            </div>

            <div className="flex gap-3">
              <button
                onClick={calculateImpact}
                className="bg-[#2076C7] hover:bg-[#006ace] text-white px-6 py-2 rounded-lg font-medium flex items-center gap-2 transition-colors"
              >
                <i className="fas fa-calculator"></i>
                Calculate
              </button>
              <button
                onClick={resetForm}
                className="bg-[#1CADA3] hover:bg-[#0d968d] text-white px-6 py-2 rounded-lg font-medium flex items-center gap-2 transition-colors"
              >
                <i className="fas fa-redo"></i>
                Reset
              </button>
            </div>
          </div>

          {/* Metric Cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
            <div className="bg-white rounded-xl border shadow-md p-4 text-center hover:shadow-lg transition-shadow">
              <div className="w-10 h-10 bg-teal-50 rounded-full flex items-center justify-center mx-auto mb-2">
                <i className="fas fa-chart-line text-[#1CADA3] text-lg"></i>
              </div>
              <div className="text-xs text-gray-600 mb-1">EMI ({parameters.shorterTenure} Years)</div>
              <div className="font-bold text-lg font-sans text-[#1CADA3]">
                {formatCurrency(results.emi20)}
              </div>
            </div>

            <div className="bg-white rounded-xl border shadow-md p-4 text-center hover:shadow-lg transition-shadow">
              <div className="w-10 h-10 bg-teal-50 rounded-full flex items-center justify-center mx-auto mb-2">
                <i className="fas fa-money-bill-wave text-[#1CADA3] text-lg"></i>
              </div>
              <div className="text-xs text-gray-600 mb-1">EMI (30 Years)</div>
              <div className="font-bold text-lg font-sans text-[#1CADA3]">
                {formatCurrency(results.emi30)}
              </div>
            </div>

            <div className="bg-white rounded-xl border shadow-md p-4 text-center hover:shadow-lg transition-shadow">
              <div className="w-10 h-10 bg-teal-50 rounded-full flex items-center justify-center mx-auto mb-2">
                <i className="fas fa-chart-line text-[#1CADA3] text-lg"></i>
              </div>
              <div className="text-xs text-gray-600 mb-1">Monthly SIP Difference</div>
              <div className="font-bold text-lg font-sans text-[#1CADA3]">
                {formatCurrency(results.emiDifference)}
              </div>
            </div>
          </div>

          {/* Yearly Breakdown Table */}
          <div className="bg-white rounded-xl border shadow-md overflow-hidden mb-8">
            <div className="bg-gray-50 p-4 border-b border-gray-200">
              <h2 className="text-lg font-semibold text-gray-800 flex items-center gap-2">
                <i className="fas fa-table text-[#2076C7]"></i>
                <span>Yearly Breakdown: EMI Savings Invested in SIP</span>
              </h2>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full border-collapse">
                <thead>
                  <tr className="bg-[#2076C7] text-white">
                    <th className="px-4 py-3 text-left font-medium">Year</th>
                    <th className="px-4 py-3 text-left font-medium">EMI Savings (₹)</th>
                    <th className="px-4 py-3 text-left font-medium">SIP Value (₹)</th>
                    <th className="px-4 py-3 text-left font-medium">Loan Balance (₹)</th>
                    <th className="px-4 py-3 text-left font-medium">Status</th>
                  </tr>
                </thead>
                <tbody>
                  {yearlyBreakdown.map((row, index) => (
                    <tr
                      key={index}
                      className={`border-b border-gray-200 hover:bg-gray-50 text-gray-800 ${row.className || ''}`}
                    >
                      <td className="px-4 py-3">{row.year}</td>
                      <td className="px-4 py-3">{formatCurrency(row.emiSavings)}</td>
                      <td className="px-4 py-3">{formatCurrency(row.sipValue)}</td>
                      <td className="px-4 py-3">{formatCurrency(row.loanBalance)}</td>
                      <td className="px-4 py-3">{row.status}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* Key Insights Section */}
          <div className="bg-white rounded-xl border shadow-md p-5">
            <h2 className="text-base font-semibold text-gray-800 mb-2 flex items-center gap-2">
              Key Insights
            </h2>

            <div className="text-gray-700 leading-relaxed text-xs">
              <p className="mb-2">By extending your loan tenure from {parameters.shorterTenure} to 30 years:</p>
              <ul className="list-disc pl-4 space-y-1.5 mb-3">
                <li>
                  Your monthly EMI decreases by{' '}
                  <span className="bg-blue-50 px-1.5 py-0.5 rounded font-medium font-sans text-xs">
                    {formatCurrency(results.emiDifference)}
                  </span>{' '}
                  ({((results.emi20 - results.emi30) / results.emi20 * 100).toFixed(1)}% reduction)
                </li>
                <li>
                  Total interest paid increases by{' '}
                  <span className="bg-blue-50 px-1.5 py-0.5 rounded font-medium font-sans text-xs">
                    {formatCurrency(results.totalInterest30 - results.totalInterest20)}
                  </span>
                </li>
                <li>If you invest the EMI difference in a SIP with {parameters.sipReturn}% annual returns:</li>
                <li>
                  Your SIP grows to{' '}
                  <span className="bg-blue-50 px-1.5 py-0.5 rounded font-medium font-sans text-xs">
                    {formatCurrency(results.sipValue)}
                  </span>{' '}
                  in 30 years
                </li>
                <li>
                  The SIP value is{' '}
                  <span className="bg-blue-50 px-1.5 py-0.5 rounded font-medium font-sans text-xs">
                    {((results.sipValue / (parameters.loanAmount + results.totalInterest30)) * 100).toFixed(1)}%
                  </span>{' '}
                  of your total loan cost
                </li>
              </ul>

              <div className="mt-3 p-3 bg-yellow-50 border border-yellow-200 rounded-lg">
                <p className="text-xs text-yellow-800 flex items-start gap-2">
                  <span><strong>Pro Tip:</strong> Consider investing the EMI difference in a disciplined SIP to build wealth while managing your loan payments effectively.</span>
                </p>
              </div>

              <p className="text-[11px] text-gray-500 mt-2 flex items-start gap-1">
                <span><strong>Note:</strong> This analysis assumes consistent SIP returns and doesn&apos;t account for inflation or tax implications. Actual results may vary.</span>
              </p>
            </div>
          </div>

        </div>
      </div>

      {/* Font Awesome */}
      <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css" />

      {/* Notification */}
      {notification.show && (
        <div className={`fixed top-5 right-5 bg-white rounded-lg shadow-lg z-50 max-w-sm border-l-4 ${notification.type === 'success' ? 'border-[#1CADA3]' : 'border-red-500'}`}>
          <div className="p-4 flex items-center gap-3">
            <i className={`fas ${notification.type === 'success' ? 'fa-check-circle text-green-500' : 'fa-exclamation-circle text-red-500'} text-xl`}></i>
            <span className="flex-1 text-gray-600 text-sm">{notification.message}</span>
            <button onClick={() => setNotification(prev => ({ ...prev, show: false }))} className="text-gray-400 hover:text-gray-600 transition-colors">
              <i className="fas fa-times"></i>
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

// =============================================
// STANDALONE VERSION (with header and dropdown)
// =============================================
const LoanTenureCalculatorStandalone: React.FC = () => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const activeData = CALCULATOR_OPTIONS.find(c => c.id === 'sipVsEmi') || CALCULATOR_OPTIONS[0];

  const handleCalculatorChange = (path: string) => {
    window.location.href = path;
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-linear-to-r from-[#2076C7] to-[#1CADA3] text-white py-6 px-8 text-center">
        <div className="flex items-center justify-center gap-3 mb-2">
          <i className="fas fa-balance-scale text-white text-2xl"></i>
          <h1 className="text-3xl font-bold">EMI VS SIP Calculator</h1>
        </div>
        <p className="text-blue-100">Compare how different loan tenures affect your finances</p>
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
                    className={`w-full text-left p-4 flex items-center gap-3 hover:bg-gray-50 transition-colors ${calc.id === 'sipVsEmi' ? 'bg-teal-500/5' : ''
                      }`}
                  >
                    <div className={`w-8 h-8 rounded-lg flex items-center justify-center ${calc.id === 'sipVsEmi'
                      ? 'bg-teal-500 text-white'
                      : 'bg-gray-100 text-gray-500'
                      }`}>
                      <calc.icon className="w-4 h-4" />
                    </div>
                    <div className="flex-1">
                      <span className={`font-medium ${calc.id === 'sipVsEmi' ? 'text-teal-600' : 'text-gray-700'
                        }`}>
                        {calc.label}
                      </span>
                      <p className="text-xs text-gray-400 line-clamp-1">{calc.desc}</p>
                    </div>
                    {calc.id === 'sipVsEmi' && (
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
      <LoanTenureCalculatorContent />
    </div>
  );
};

// Export both versions
export default LoanTenureCalculatorStandalone;