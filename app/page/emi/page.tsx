'use client';

import React, { useState, useEffect, useRef } from 'react';
import { Chart, DoughnutController, ArcElement, Tooltip, Legend } from 'chart.js';

// Register Chart.js components
Chart.register(DoughnutController, ArcElement, Tooltip, Legend);

const EMICalculator: React.FC = () => {
  // State for loan parameters
  const [loanAmount, setLoanAmount] = useState<number>(1000000);
  const [interestRate, setInterestRate] = useState<number>(8.5);
  const [loanTenure, setLoanTenure] = useState<number>(20);

  // State for calculated values
  const [emi, setEmi] = useState<number>(0);
  const [totalPayment, setTotalPayment] = useState<number>(0);
  const [totalInterest, setTotalInterest] = useState<number>(0);

  // Chart reference
  const chartRef = useRef<Chart<'doughnut'> | null>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  // Format currency for display
  const formatCurrency = (value: number): string => {
    return '₹' + value.toFixed(0).replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  };

  // ✅ Handle input changes for number inputs
  const handleInputChange = (field: string, value: string) => {
    // If the value is empty, set it to 0 to allow clearing
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

    // Remove any non-numeric characters except decimal point
    const cleanValue = value.replace(/[^\d.]/g, '');

    // Ensure only one decimal point
    const parts = cleanValue.split('.');
    if (parts.length > 2) return; // Invalid input

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
  };

  // Calculate EMI and related values
  const calculateEMI = () => {
    // Validate inputs before calculation
    if (!loanAmount || loanAmount < 100000 || loanAmount === 0) {
      return;
    }

    if (!interestRate || interestRate < 7 || interestRate === 0) {
      return;
    }

    if (!loanTenure || loanTenure < 1 || loanTenure === 0) {
      return;
    }

    const monthlyInterestRate = interestRate / 12 / 100;
    const tenureMonths = loanTenure * 12;

    // EMI formula: [P x R x (1+R)^N]/[(1+R)^N-1]
    const emiValue = loanAmount * monthlyInterestRate *
      Math.pow(1 + monthlyInterestRate, tenureMonths) /
      (Math.pow(1 + monthlyInterestRate, tenureMonths) - 1);

    const totalPaymentValue = emiValue * tenureMonths;
    const totalInterestValue = totalPaymentValue - loanAmount;

    setEmi(emiValue);
    setTotalPayment(totalPaymentValue);
    setTotalInterest(totalInterestValue);

    // Update chart
    updateChart(loanAmount, totalInterestValue);
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
      }
    }

    return () => {
      if (chartRef.current) {
        chartRef.current.destroy();
      }
    };
  }, []);

  // Calculate EMI when parameters change
  useEffect(() => {
    calculateEMI();
  }, [loanAmount, interestRate, loanTenure]);

  // Handle slider changes
  const handleLoanAmountChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setLoanAmount(Number(e.target.value));
  };

  const handleInterestRateChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInterestRate(Number(e.target.value));
  };

  const handleLoanTenureChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setLoanTenure(Number(e.target.value));
  };

  // ✅ Fixed input change handlers
  const handleLoanAmountInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    handleInputChange('loanAmount', e.target.value);
  };

  const handleInterestRateInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    handleInputChange('interestRate', e.target.value);
  };

  const handleLoanTenureInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    handleInputChange('loanTenure', e.target.value);
  };

  // ✅ Format loan amount for display (remove commas for editing)
  const getLoanAmountDisplayValue = () => {
    return loanAmount === 0 ? '' : loanAmount.toString();
  };

  return (
    <div className="min-h-screen bg-gray-50">

      {/* EMI Calculator */}
      <div className="container mx-auto px-4 py-8">
        <div className="bg-white rounded-2xl shadow-xl overflow-hidden max-w-6xl mx-auto">
          <div className="bg-linear-to-r from-[#2076C7] to-[#1CADA3] text-white py-6 px-8 text-center">
            <h1 className="text-3xl font-bold  mb-2">EMI Calculator</h1>
            <p className="text-blue-100">Calculate your Equated Monthly Installment</p>
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
                    min="100000"
                    max="50000000"
                    step="10000"
                    value={loanAmount}
                    onChange={handleLoanAmountChange}
                    className="w-full h-2 bg-gray-300  rounded-lg cursor-pointer slider"
                  />
                  <div className="flex justify-between text-sm  text-gray-600 mt-1">
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
                    className="w-full px-4 py-3 border border-gray-300 rounded focus:outline-none focus:border-[#1CADA3] bg-gray-100 focus:bg-white focus:ring-0 focus:ring-teal-200 transition-colors pr-12  text-gray-800 placeholder:text-gray-500"
                    placeholder="Enter loan amount"
                  />
                  <span className="absolute right-4 top-1/2 transform -translate-y-1/2  text-gray-600 font-medium">₹</span>
                </div>
              </div>

              {/* Interest Rate */}
              <div className="mb-6">
                <label htmlFor="interestRate" className="block text-[#2076C7] font-semibold mb-2">
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
                    className="w-full h-2 bg-gray-300 border border-gray-300 focus:outline-none focus:border-[#1CADA3] rounded-lg cursor-pointer slider"
                  />
                  <div className="flex justify-between text-sm text-gray-600 mt-1">
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
                    value={interestRate === 0 ? '' : interestRate}
                    onChange={handleInterestRateInputChange}
                    className="w-full px-4 py-3 border border-gray-300 rounded focus:outline-none focus:border-[#1CADA3]  bg-gray-100 focus:bg-white focus:ring-0 focus:ring-teal-200 transition-colors pr-12  text-gray-800 placeholder:text-gray-500"
                  />
                  <span className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-600 font-medium">%</span>
                </div>
              </div>

              {/* Loan Tenure */}
              <div className="mb-8">
                <label htmlFor="loanTenure" className="block text-[#2076C7] font-semibold mb-2">
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
                  <div className="flex justify-between text-sm text-gray-600 mt-1">
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
                    value={loanTenure === 0 ? '' : loanTenure}
                    onChange={handleLoanTenureInputChange}
                    className="w-full px-4 py-3 border border-gray-300 rounded focus:outline-none focus:border-[#1CADA3]  bg-gray-100 focus:bg-white  focus:ring-0 focus:ring-teal-200 transition-colors pr-20 text-gray-800 placeholder:text-gray-500"
                  />
                  <span className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-600 font-medium">Years</span>
                </div>
              </div>

              {/* Results Section */}
              <div className="bg-gray-50 p-6 rounded-xl shadow-sm border-l-4 border-[#1CADA3]">
                <div className="text-3xl font-bold text-[#1CADA3] font-sans text-center mb-6">
                  {emi > 0 ? formatCurrency(emi) : '₹0'}
                </div>
                <div className="flex justify-between">
                  <div className="text-center flex-1 px-4">
                    <div className="text-lg font-medium font-sans text-[#1CADA3]">
                      {totalPayment > 0 ? formatCurrency(totalPayment) : '₹0'}
                    </div>
                    <div className="text-sm text-[#1CADA3] mt-1">Total Payment</div>
                  </div>
                  <div className="text-center flex-1 px-4">
                    <div className="text-lg font-medium font-sans text-[#1CADA3]">
                      {totalInterest > 0 ? formatCurrency(totalInterest) : '₹0'}
                    </div>
                    <div className="text-sm text-[#1CADA3] mt-1">Total Interest</div>
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
                    <span className="text-gray-600">Principal Amount</span>
                    <span className="font-medium font-sans text-[#1CADA3]">
                      {loanAmount > 0 ? formatCurrency(loanAmount) : '₹0'}
                    </span>
                  </div>
                  <div className="flex justify-between pb-3 border-b border-gray-200">
                    <span className="text-gray-600">Total Interest Payable</span>
                    <span className="font-medium font-sans text-[#1CADA3]">
                      {totalInterest > 0 ? formatCurrency(totalInterest) : '₹0'}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Total Amount Payable</span>
                    <span className="font-medium font-sans text-[#1CADA3]">
                      {totalPayment > 0 ? formatCurrency(totalPayment) : '₹0'}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      
      {/* Insights Section - Properly aligned with calculator */}
      <div className="max-w-6xl mx-auto mt-8">
        <div className="bg-white rounded-xl border shadow-md p-6">
          <h2 className="text-xl font-semibold text-gray-800 mb-4 flex items-center gap-2">
            <i className="fas fa-lightbulb text-yellow-500"></i>
            Key Insights
          </h2>

          <div className="text-gray-700 leading-relaxed">
            <ul className="list-disc pl-5 mb-4 space-y-3">
              <li>
                <span className="font-medium">💡 Your monthly commitment</span> - You need to pay{' '}
                <span className="bg-blue-50 px-2 py-1 rounded font-medium font-sans">
                  {formatCurrency(emi)}
                </span>{' '}
                every month for {loanTenure} years
              </li>
              
              <li>
                <span className="font-medium">✅ Interest adds significant cost</span> - You pay{' '}
                <span className="bg-blue-50 px-2 py-1 rounded font-medium font-sans">
                  {formatCurrency(totalInterest)}
                </span>{' '}
                in interest, which is{' '}
                <span className="bg-blue-50 px-2 py-1 rounded font-medium font-sans">
                  {((totalInterest / loanAmount) * 100).toFixed(1)}%
                </span>{' '}
                of your loan amount
              </li>
              
              <li>
                <span className="font-medium">✅ Shorter tenure saves interest</span> - Reducing tenure by 5 years would increase your EMI by{' '}
                <span className="bg-blue-50 px-2 py-1 rounded font-medium font-sans">
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
                <span className="font-medium">✅ Even 0.5% rate reduction matters</span> - At{' '}
                <span className="bg-blue-50 px-2 py-1 rounded font-medium font-sans">
                  {(interestRate - 0.5).toFixed(1)}%
                </span>{' '}
                instead of {interestRate}%, you would save{' '}
                <span className="bg-blue-50 px-2 py-1 rounded font-medium font-sans">
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
                <span className="font-medium">✅ Consider prepayments</span> - A single{' '}
                <span className="bg-blue-50 px-2 py-1 rounded font-medium font-sans">
                  ₹50,000
                </span>{' '}
                prepayment in year 1 can reduce total interest by{' '}
                <span className="bg-blue-50 px-2 py-1 rounded font-medium font-sans">
                  {formatCurrency(totalInterest * 0.015)}
                </span>
              </li>
              
              {/* Additional insight about interest proportion */}
              <li>
                For every ₹100 you repay,{' '}
                <span className="bg-blue-50 px-2 py-1 rounded font-medium font-sans">
                  ₹{((totalInterest / totalPayment) * 100).toFixed(0)}
                </span>{' '}
                goes towards interest and only{' '}
                <span className="bg-blue-50 px-2 py-1 rounded font-medium font-sans">
                  ₹{((loanAmount / totalPayment) * 100).toFixed(0)}
                </span>{' '}
                reduces your principal
              </li>
            </ul>
            
            <div className="mt-6 p-4 bg-yellow-50 border border-yellow-200 rounded-lg">
              <p className="text-sm text-yellow-800">
                <strong>💡 Pro Tip:</strong> Aim to make at least one extra EMI payment each year. 
                This can reduce your loan tenure by several years and save lakhs in interest payments.
              </p>
            </div>
            
            <p className="text-sm text-gray-600 mt-4">
              <strong>Note:</strong> This calculation doesn't account for processing fees, insurance, or any other charges. 
              Actual EMI may vary based on lender policies.
            </p>
          </div>
        </div>
      </div>
    </div>
    </div>
  );
};

export default EMICalculator;