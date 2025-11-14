'use client';

import React, { useState, useEffect, useRef } from 'react';
import { Chart, DoughnutController, ArcElement, Tooltip, Legend } from 'chart.js';

// Register Chart.js components
Chart.register(DoughnutController, ArcElement, Tooltip, Legend);

const EMICalculator: React.FC = () => {
  // State for loan parameterss
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

  // Calculate EMI and related values
  const calculateEMI = () => {
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
              backgroundColor: ['#0E8376', '#2F3D88'],
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

  // Handle input changes
  const handleLoanAmountInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value.replace(/,/g, '');
    setLoanAmount(Number(value));
  };

  const handleInterestRateInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInterestRate(Number(e.target.value));
  };

  const handleLoanTenureInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setLoanTenure(Number(e.target.value));
  };

  return (
    <div className="min-h-screen bg-gray-50">

      {/* EMI Calculator */}
      <div className="container mx-auto px-4 py-8">
        <div className="bg-white rounded-2xl shadow-xl overflow-hidden max-w-6xl mx-auto">
          <div className="bg-gradient-to-r from-blue-500 to-teal-600 text-white py-6 px-8 text-center">
            <h1 className="text-3xl font-bold mb-2">EMI Calculator</h1>
            <p className="text-blue-100">Calculate your Equated Monthly Installment</p>
          </div>
          
          <div className="flex flex-col lg:flex-row p-6 lg:p-8">
            {/* Input Section */}
            <div className="flex-1 min-w-0 lg:pr-8 lg:border-r border-gray-200">
              {/* Loan Amount */}
              <div className="mb-6">
                <label htmlFor="loanAmount" className="block text-blue-800 font-semibold mb-2">
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
                    className="w-full h-2 bg-gray-300 rounded-lg appearance-none cursor-pointer slider"
                  />
                  <div className="flex justify-between text-sm text-gray-600 mt-1">
                    <span>₹1,00,000</span>
                    <span>₹5,00,00,000</span>
                  </div>
                </div>
                <div className="relative">
                  <input
                    type="text"
                    id="loanAmountInput"
                    value={formatCurrency(loanAmount).substring(1)}
                    onChange={handleLoanAmountInputChange}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg bg-gray-50 focus:bg-white focus:border-teal-500 focus:ring-2 focus:ring-teal-200 transition-colors pr-12  text-gray-500"
                  />
                  <span className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-600 font-medium">₹</span>
                </div>
              </div>
              
              {/* Interest Rate */}
              <div className="mb-6">
                <label htmlFor="interestRate" className="block text-blue-800 font-semibold mb-2">
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
                    className="w-full h-2 bg-gray-300 rounded-lg appearance-none cursor-pointer slider"
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
                    value={interestRate}
                    onChange={handleInterestRateInputChange}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg bg-gray-50 focus:bg-white focus:border-teal-500 focus:ring-2 focus:ring-teal-200 transition-colors pr-12  text-gray-500"
                  />
                  <span className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-600 font-medium">%</span>
                </div>
              </div>
              
              {/* Loan Tenure */}
              <div className="mb-8">
                <label htmlFor="loanTenure" className="block text-blue-800 font-semibold mb-2">
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
                    className="w-full h-2 bg-gray-300 rounded-lg appearance-none cursor-pointer slider"
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
                    value={loanTenure}
                    onChange={handleLoanTenureInputChange}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg bg-gray-50 focus:bg-white focus:border-teal-500 focus:ring-2 focus:ring-teal-200 transition-colors pr-20  text-gray-500"
                  />
                  <span className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-600 font-medium">Years</span>
                </div>
              </div>
              
              {/* Results Section */}
              <div className="bg-gray-50 p-6 rounded-xl shadow-sm border-l-4 border-teal-600">
                <div className="text-3xl font-bold text-teal-600 text-center mb-6">
                  {formatCurrency(emi)}
                </div>
                <div className="flex justify-between">
                  <div className="text-center flex-1 px-4">
                    <div className="text-lg font-semibold text-teal-600">
                      {formatCurrency(totalPayment)}
                    </div>
                    <div className="text-sm text-teal-600 mt-1">Total Payment</div>
                  </div>
                  <div className="text-center flex-1 px-4">
                    <div className="text-lg font-semibold text-teal-600">
                      {formatCurrency(totalInterest)}
                    </div>
                    <div className="text-sm text-teal-600 mt-1">Total Interest</div>
                  </div>
                </div>
              </div>
            </div>
            
            {/* Visualization Section */}
            <div className="flex-1 min-w-0 lg:pl-8 mt-8 lg:mt-0">
              <div className="chart-container h-64 mb-6">
                <canvas ref={canvasRef}></canvas>
              </div>
              
              <div className="bg-gray-50 p-6 rounded-xl shadow-sm border-l-4 border-blue-700">
                <h5 className="text-blue-800 font-semibold mb-4 text-lg">Loan Summary</h5>
                <div className="space-y-4">
                  <div className="flex justify-between pb-3 border-b border-gray-200">
                    <span className="text-gray-600">Principal Amount</span>
                    <span className="font-semibold text-teal-600">{formatCurrency(loanAmount)}</span>
                  </div>
                  <div className="flex justify-between pb-3 border-b border-gray-200">
                    <span className="text-gray-600">Total Interest Payable</span>
                    <span className="font-semibold text-teal-600">{formatCurrency(totalInterest)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Total Amount Payable</span>
                    <span className="font-semibold text-teal-600">{formatCurrency(totalPayment)}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

    </div>
  );
};

export default EMICalculator;