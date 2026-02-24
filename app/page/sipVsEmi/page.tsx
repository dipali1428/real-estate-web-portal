"use client";
import React, { useState, useEffect, useCallback, useRef } from 'react';

interface LoanParameters {
  loanAmount: number;
  interestRate: number;
  sipReturn: number;
  shorterTenure: number; // Added field
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

const LoanTenureCalculator: React.FC = () => {
  const [parameters, setParameters] = useState<LoanParameters>({
    loanAmount: 5000000,
    interestRate: 8.5,
    sipReturn: 12,
    shorterTenure: 20, // Initialized to 20
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

    // Calculate EMIs - Now uses parameters.shorterTenure instead of hardcoded 20
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
    calculateImpact();
  }, [calculateImpact]);

  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-linear-to-r from-[#2076C7] to-[#1CADA3] text-white shadow-lg rounded-b-xl mb-8">
        <div className="container mx-auto px-4 py-6">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <div className="flex items-center gap-4">
              <i className="fas fa-balance-scale text-3xl"></i>
              <h1 className="text-2xl font-semibold">Loan Tenure Impact: EMI vs SIP</h1>
            </div>
            <div className="text-center md:text-right">
              <span className="text-blue-100">See how extending your loan tenure affects your finances</span>
            </div>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 pb-4">
        <div className="bg-white rounded-xl border border-gray-200 shadow-md p-4 mb-6">
          <div className="flex justify-between items-center mb-6 pb-4 border-b border-gray-200">
            <h2 className="text-xl font-medium text-gray-800 flex items-center">
              <i className="fas fa-calculator"></i>
              Loan & Investment Parameters
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
            <div>
              <label htmlFor="loan-amount" className="block text-sm font-semibold text-gray-700 mb-2">
                Loan Amount (₹)
              </label>
              <input
                type="number"
                id="loan-amount"
                value={parameters.loanAmount === 0 ? '' : parameters.loanAmount}
                onChange={(e) => handleInputChange('loanAmount', e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-0 focus:ring-[#a0ffbd] focus:border-green-500 focus:outline-none transition-colors text-gray-800"
                min="100000"
                step="100000"
              />
            </div>

            <div>
              <label htmlFor="interest-rate" className="block text-sm font-semibold text-gray-700 mb-2">
                Interest Rate (%)
              </label>
              <input
                type="number"
                id="interest-rate"
                value={parameters.interestRate === 0 ? '' : parameters.interestRate}
                onChange={(e) => handleInputChange('interestRate', e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-0 focus:ring-[#a0ffbd] focus:border-green-500 focus:outline-none transition-colors text-gray-800"
                min="1"
                max="30"
                step="0.1"
              />
            </div>

            <div>
              <label htmlFor="sip-return" className="block text-sm font-semibold text-gray-700 mb-2">
                SIP Expected Return (%)
              </label>
              <input
                type="number"
                id="sip-return"
                value={parameters.sipReturn === 0 ? '' : parameters.sipReturn}
                onChange={(e) => handleInputChange('sipReturn', e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-0 focus:ring-[#a0ffbd] focus:border-green-500 focus:outline-none transition-colors text-gray-800"
                min="1"
                max="30"
                step="0.1"
              />
            </div>

            {/* New Year Selection Field */}
            <div>
              <label htmlFor="shorter-tenure" className="block text-sm font-semibold text-gray-700 mb-2">
                Base Tenure (Years)
              </label>
              <input
                type="number"
                id="shorter-tenure"
                value={parameters.shorterTenure === 0 ? '' : parameters.shorterTenure}
                onChange={(e) => handleInputChange('shorterTenure', e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-0 focus:ring-[#a0ffbd] focus:border-green-500 focus:outline-none transition-colors text-gray-800"
                min="1"
                max="29"
                step="1"
              />
            </div>
          </div>

          <div className="flex gap-3">
            <button
              onClick={calculateImpact}
              className="bg-[#2076C7] hover:bg-[#006ace] text-white px-6 py-2 rounded-lg font-medium flex items-center gap-2 transition-colors">
              <i className="fas fa-calculator"></i>
              Calculate
            </button>
            <button
              onClick={resetForm}
              className="bg-[#1CADA3] hover:bg-[#0d968d] text-white px-6 py-2 rounded-lg font-medium flex items-center gap-2 transition-colors">
              <i className="fas fa-redo"></i>
              Reset
            </button>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-6 font-sans">
          <div className="bg-white border border-gray-200 text-gray-800 rounded-xl p-6 text-center shadow-sm hover:shadow-md transition">
            <div className="text-2xl font-medium mb-1">{formatCurrency(results.emi20)}</div>
            <div className="text-gray-500 text-sm">EMI ({parameters.shorterTenure} Years)</div>
          </div>

          <div className="bg-white border border-gray-200 text-gray-800 rounded-xl p-6 text-center shadow-sm hover:shadow-md transition">
            <i className="fas fa-money-bill-wave text-2xl text-gray-600 mb-2"></i>
            <div className="text-2xl font-medium mb-1">{formatCurrency(results.emi30)}</div>
            <div className="text-gray-500 text-sm">EMI (30 Years)</div>
          </div>

          <div className="bg-white border border-gray-200 text-gray-800 rounded-xl p-6 text-center shadow-sm hover:shadow-md transition">
            <i className="fas fa-chart-line text-2xl text-gray-600 mb-2"></i>
            <div className="text-2xl font-medium mb-1">{formatCurrency(results.emiDifference)}</div>
            <div className="text-gray-500 text-sm">Monthly SIP Difference</div>
          </div>
        </div>

       <div className="bg-white rounded-xl border border-gray-200 shadow-md overflow-hidden mb-6">
          <div className="shrink-0 p-4 pb-4 border-b border-gray-200">
            <h2 className="text-xl font-medium text-gray-800 flex items-center">
              <i className="fas fa-table"></i>
              Yearly Breakdown: EMI Savings Invested in SIP
            </h2>
          </div>

          <div className="flex-1 overflow-y-auto">
            <div className="relative">
              <table className="w-full border-collapse">
                <thead>
                  <tr className="bg-[#2076C7] text-white sticky top-0 z-10">
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
                      className={`border-b border-gray-200 hover:bg-gray-50 text-gray-800 font-sans ${row.className || ''}`}>
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
        </div>

        <div className="bg-white rounded-xl border shadow-md p-4">
          <h2 className="text-xl font-semibold text-gray-800 mb-4 flex items-center gap-2">
            <i className="fas fa-lightbulb text-yellow-500"></i>
            Key Insights
          </h2>

          <div className="text-gray-700 leading-relaxed">
            <p className="mb-3">By extending your loan tenure from {parameters.shorterTenure} to 30 years:</p>
            <ul className="list-disc pl-5 mb-4 space-y-2">
              <li>
                Your monthly EMI decreases by{' '}
                <span className="bg-blue-50 px-2 py-1 rounded font-medium font-sans">
                  {formatCurrency(results.emiDifference)}
                </span>{' '}
                ({((results.emi20 - results.emi30) / results.emi20 * 100).toFixed(1)}% reduction)
              </li>
              <li>Total interest paid increases by {formatCurrency(results.totalInterest30 - results.totalInterest20)}</li>
              <li>If you invest the EMI difference in a SIP with {parameters.sipReturn}% annual returns:</li>
              <li>Your SIP grows to <span className="bg-blue-50 px-2 py-1 rounded font-medium font-sans">{formatCurrency(results.sipValue)}</span> in 30 years</li>

              <li>The SIP value is <span className="bg-blue-50 px-2 py-1 rounded font-medium font-sans">
                {((results.sipValue / (parameters.loanAmount + results.totalInterest30)) * 100).toFixed(1)}%
              </span> of your total loan cost</li>
            </ul>
            <p className="text-sm text-gray-600">
              <strong>Note:</strong> This analysis assumes consistent SIP returns and doesn't account for inflation or tax implications.
            </p>
          </div>
        </div>
      </div>

      {notification.show && (
        <div className={`fixed top-5 right-5 bg-white rounded-lg shadow-lg z-50 max-w-sm border-l-4 ${notification.type === 'success' ? 'border-[#1CADA3]' : 'border-red-500'}`}>
          <div className="p-4 flex items-center gap-3">
            <i className={`fas ${notification.type === 'success' ? 'fa-check-circle text-green-500' : 'fa-exclamation-circle text-red-500'} text-xl`}></i>
            <span className="flex-1 text-gray-600">{notification.message}</span>
            <button onClick={() => setNotification(prev => ({ ...prev, show: false }))} className="text-gray-400 hover:text-gray-600 transition-colors">
              <i className="fas fa-times"></i>
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default LoanTenureCalculator;