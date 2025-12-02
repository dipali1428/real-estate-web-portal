'use client';

import React, { useState, useEffect, useRef } from 'react';
import { Chart, DoughnutController, ArcElement, Tooltip, Legend } from 'chart.js';

// Register Chart.js components
Chart.register(DoughnutController, ArcElement, Tooltip, Legend);

const FDCalculator: React.FC = () => {
  // State for FD parameters
  const [principalAmount, setPrincipalAmount] = useState<number>(100000);
  const [interestRate, setInterestRate] = useState<number>(7.5);
  const [tenure, setTenure] = useState<number>(5);
  const [tenureType, setTenureType] = useState<'years' | 'months'>('years');
  const [interestPayout, setInterestPayout] = useState<'monthly' | 'quarterly' | 'cumulative'>('cumulative');

  // State for calculated values
  const [maturityAmount, setMaturityAmount] = useState<number>(0);
  const [totalInterest, setTotalInterest] = useState<number>(0);
  const [estimatedReturns, setEstimatedReturns] = useState<number>(0);

  // Chart reference
  const chartRef = useRef<Chart<'doughnut'> | null>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  // Format currency for display
  const formatCurrency = (value: number): string => {
    return '₹' + value.toFixed(0).replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  };

  // Handle input changes
  const handleInputChange = (field: string, value: string) => {
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
          setInterestRate(numValue);
          break;
        case 'tenure':
          setTenure(numValue);
          break;
      }
    }
  };

  // Calculate FD returns (simplified calculation)
  const calculateFDReturns = () => {
    if (!principalAmount || principalAmount < 1000 || principalAmount === 0) {
      return;
    }

    if (!interestRate || interestRate < 1 || interestRate === 0) {
      return;
    }

    if (!tenure || tenure < 1 || tenure === 0) {
      return;
    }

    // Convert tenure to years for calculation
    const tenureInYears = tenureType === 'months' ? tenure / 12 : tenure;
    
    // Simple FD calculation formula: A = P(1 + r/n)^(nt)
    // For simplicity, we'll use annual compounding
    const annualRate = interestRate / 100;
    const compoundFrequency = interestPayout === 'monthly' ? 12 : 
                             interestPayout === 'quarterly' ? 4 : 1;
    
    const amount = principalAmount * Math.pow(1 + annualRate / compoundFrequency, 
                                             compoundFrequency * tenureInYears);
    const interestEarned = amount - principalAmount;
    
    setMaturityAmount(amount);
    setTotalInterest(interestEarned);
    setEstimatedReturns(interestEarned);

    // Update chart
    updateChart(principalAmount, interestEarned);
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

  // Calculate FD returns when parameters change
  useEffect(() => {
    calculateFDReturns();
  }, [principalAmount, interestRate, tenure, tenureType, interestPayout]);

  // Handle slider changes
  const handlePrincipalAmountChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPrincipalAmount(Number(e.target.value));
  };

  const handleInterestRateChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInterestRate(Number(e.target.value));
  };

  const handleTenureChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setTenure(Number(e.target.value));
  };

  // Input change handlers
  const handlePrincipalAmountInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    handleInputChange('principalAmount', e.target.value);
  };

  const handleInterestRateInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    handleInputChange('interestRate', e.target.value);
  };

  const handleTenureInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    handleInputChange('tenure', e.target.value);
  };

  // Format principal amount for display
  const getPrincipalAmountDisplayValue = () => {
    return principalAmount === 0 ? '' : principalAmount.toString();
  };

  // Handle tenure type toggle with auto-conversion
  const handleTenureTypeToggle = (type: 'years' | 'months') => {
    // If already in the requested type, do nothing
    if (type === tenureType) return;
    
    let convertedValue = tenure;
    
    if (type === 'months') {
      // Convert from years to months
      convertedValue = Math.round(tenure * 12);
      
      // Handle edge cases
      if (tenure === 0) convertedValue = 0;
      else if (convertedValue < 1) convertedValue = 1; // Minimum 1 month
      else if (convertedValue > 360) convertedValue = 360; // Maximum 360 months (30 years)
    } else {
      // Convert from months to years
      convertedValue = tenure / 12;
      
      // Handle edge cases
      if (tenure === 0) convertedValue = 0;
      else if (convertedValue < 0.1) convertedValue = 0.1; // Minimum 0.1 years
      else if (convertedValue > 30) convertedValue = 30; // Maximum 30 years
      
      // Round to 1 decimal place for better readability
      convertedValue = Math.round(convertedValue * 10) / 10;
    }
    
    // Update the tenure value
    setTenure(convertedValue);
    
    // Update the tenure type
    setTenureType(type);
  };

  // Prevent wheel event from changing input values
  const handleWheel = (e: React.WheelEvent<HTMLInputElement>) => {
    e.currentTarget.blur();
  };

  const handleNumberInputWheel = (e: React.WheelEvent<HTMLInputElement>) => {
    // Prevent the input value change
    e.currentTarget.blur();
    // Prevent the page/container from scrolling
    e.stopPropagation();
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* FD Calculator */}
      <div className="container mx-auto px-4 py-8">
        <div className="bg-white rounded-2xl shadow-xl overflow-hidden max-w-6xl mx-auto">
          <div className="bg-linear-to-r from-[#2076C7] to-[#1CADA3] text-white py-6 px-8 text-center">
            <h1 className="text-3xl font-bold mb-2">Fixed Deposit Calculator</h1>
            <p className="text-blue-100">Calculate your Fixed Deposit returns</p>
          </div>

          <div className="flex flex-col lg:flex-row p-6 lg:p-8 font-sans">
            {/* Input Section */}
            <div className="flex-1 min-w-0 lg:pr-8 lg:border-r border-gray-200">
              
              {/* Principal Amount */}
              <div className="mb-6">
                <label htmlFor="principalAmount" className="block text-[#2076C7] font-semibold mb-2">
                  Deposit Amount (₹)
                </label>
                <div className="slider-container mb-2">
                  <input
                    type="range"
                    id="principalAmount"
                    min="1000"
                    max="10000000"
                    step="1000"
                    value={principalAmount}
                    onChange={handlePrincipalAmountChange}
                    className="w-full h-2 bg-gray-300 rounded-lg cursor-pointer slider"
                  />
                  <div className="flex justify-between text-sm text-gray-600 mt-1">
                    <span>₹1,000</span>
                    <span>₹1,00,00,000</span>
                  </div>
                </div>
                <div className="relative">
                  <input
                    type="text"
                    id="principalAmountInput"
                    value={getPrincipalAmountDisplayValue()}
                    onChange={handlePrincipalAmountInputChange}
                    onWheel={handleWheel}
                    className="w-full px-4 py-3 border border-gray-300 rounded focus:outline-none focus:border-[#1CADA3] bg-gray-100 focus:bg-white focus:ring-0 focus:ring-teal-200 transition-colors pr-12 text-gray-800 placeholder:text-gray-500"
                    placeholder="Enter deposit amount"
                  />
                  <span className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-600 font-medium">₹</span>
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
                    min="1"
                    max="15"
                    step="0.1"
                    value={interestRate}
                    onChange={handleInterestRateChange}
                    className="w-full h-2 bg-gray-300 rounded-lg cursor-pointer slider"
                  />
                  <div className="flex justify-between text-sm text-gray-600 mt-1">
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
                    className="w-full px-4 py-3 border border-gray-300 rounded focus:outline-none focus:border-[#1CADA3] bg-gray-100 focus:bg-white focus:ring-0 focus:ring-teal-200 transition-colors pr-12 text-gray-800 placeholder:text-gray-500"
                  />
                  <span className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-600 font-medium">%</span>
                </div>
              </div>

              {/* Tenure */}
              <div className="mb-6">
                <div className="flex justify-between items-center mb-2">
                  <label htmlFor="tenure" className="block text-[#2076C7] font-semibold">
                    Deposit Tenure
                  </label>
                  <div className="flex space-x-2">
                    <button
                      type="button"
                      onClick={() => handleTenureTypeToggle('years')}
                      className={`px-3 py-1 text-sm rounded-full transition-colors ${tenureType === 'years' ? 'bg-[#1CADA3] text-white' : 'bg-gray-200 text-gray-700 hover:bg-gray-300'}`}
                    >
                      Years
                    </button>
                    <button
                      type="button"
                      onClick={() => handleTenureTypeToggle('months')}
                      className={`px-3 py-1 text-sm rounded-full transition-colors ${tenureType === 'months' ? 'bg-[#1CADA3] text-white' : 'bg-gray-200 text-gray-700 hover:bg-gray-300'}`}
                    >
                      Months
                    </button>
                  </div>
                </div>
                <div className="slider-container mb-2">
                  <input
                    type="range"
                    id="tenure"
                    min={tenureType === 'years' ? '1' : '1'}
                    max={tenureType === 'years' ? '30' : '360'}
                    step={tenureType === 'years' ? '0.1' : '1'}
                    value={tenure}
                    onChange={handleTenureChange}
                    className="w-full h-2 bg-gray-300 rounded-lg cursor-pointer slider"
                  />
                  <div className="flex justify-between text-sm text-gray-600 mt-1">
                    <span>{tenureType === 'years' ? '1 Year' : '1 Month'}</span>
                    <span>{tenureType === 'years' ? '30 Years' : '360 Months'}</span>
                  </div>
                </div>
                <div className="relative">
                  <input
                    type="number"
                    id="tenureInput"
                    min={tenureType === 'years' ? '0.1' : '1'}
                    max={tenureType === 'years' ? '30' : '360'}
                    step={tenureType === 'years' ? '0.1' : '1'}
                    value={tenure === 0 ? '' : tenure}
                    onChange={handleTenureInputChange}
                    onWheel={handleNumberInputWheel}
                    className="w-full px-4 py-3 border border-gray-300 rounded focus:outline-none focus:border-[#1CADA3] bg-gray-100 focus:bg-white focus:ring-0 focus:ring-teal-200 transition-colors pr-24 text-gray-800 placeholder:text-gray-500"
                  />
                  <span className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-600 font-medium">
                    {tenureType === 'years' ? 'Years' : 'Months'}
                  </span>
                </div>
              </div>

              {/* Interest Payout Frequency */}
              <div className="mb-8">
                <label className="block text-[#2076C7] font-semibold mb-3">
                  Interest Payout Frequency
                </label>
                <div className="grid grid-cols-3 gap-3">
                  <button
                    type="button"
                    onClick={() => setInterestPayout('cumulative')}
                    className={`py-3 px-4 rounded-lg border transition-all ${interestPayout === 'cumulative' ? 'border-[#1CADA3] bg-teal-50 text-[#1CADA3]' : 'border-gray-300 hover:border-gray-400 text-gray-700'}`}
                  >
                    <div className="font-medium">Cumulative</div>
                    <div className="text-xs mt-1 opacity-75">At Maturity</div>
                  </button>
                  <button
                    type="button"
                    onClick={() => setInterestPayout('quarterly')}
                    className={`py-3 px-4 rounded-lg border transition-all ${interestPayout === 'quarterly' ? 'border-[#1CADA3] bg-teal-50 text-[#1CADA3]' : 'border-gray-300 hover:border-gray-400 text-gray-700'}`}
                  >
                    <div className="font-medium">Quarterly</div>
                    <div className="text-xs mt-1 opacity-75">Every 3 Months</div>
                  </button>
                  <button
                    type="button"
                    onClick={() => setInterestPayout('monthly')}
                    className={`py-3 px-4 rounded-lg border transition-all ${interestPayout === 'monthly' ? 'border-[#1CADA3] bg-teal-50 text-[#1CADA3]' : 'border-gray-300 hover:border-gray-400 text-gray-700'}`}
                  >
                    <div className="font-medium">Monthly</div>
                    <div className="text-xs mt-1 opacity-75">Every Month</div>
                  </button>
                </div>
              </div>

              {/* Results Section */}
              <div className="bg-gray-50 p-6 rounded-xl shadow-sm border-l-4 border-[#1CADA3]">
                <div className="text-center mb-6">
                  <div className="text-sm text-[#2076C7] font-medium mb-1">Maturity Amount</div>
                  <div className="text-3xl font-bold text-[#1CADA3] font-sans">
                    {maturityAmount > 0 ? formatCurrency(maturityAmount) : '₹0'}
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
                      {estimatedReturns > 0 ? formatCurrency(estimatedReturns) : '₹0'}
                    </div>
                    <div className="text-sm text-[#1CADA3] mt-1">Estimated Returns</div>
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
                <h5 className="text-[#2076C7] font-semibold mb-4 text-lg">FD Summary</h5>
                <div className="space-y-4">
                  <div className="flex justify-between pb-3 border-b border-gray-200">
                    <span className="text-gray-600">Deposit Amount</span>
                    <span className="font-medium font-sans text-[#1CADA3]">
                      {principalAmount > 0 ? formatCurrency(principalAmount) : '₹0'}
                    </span>
                  </div>
                  <div className="flex justify-between pb-3 border-b border-gray-200">
                    <span className="text-gray-600">Interest Rate</span>
                    <span className="font-medium font-sans text-[#1CADA3]">
                      {interestRate > 0 ? `${interestRate}%` : '0%'}
                    </span>
                  </div>
                  <div className="flex justify-between pb-3 border-b border-gray-200">
                    <span className="text-gray-600">Tenure</span>
                    <span className="font-medium font-sans text-[#1CADA3]">
                      {tenure > 0 ? `${tenure} ${tenureType}` : '0'}
                    </span>
                  </div>
                  <div className="flex justify-between pb-3 border-b border-gray-200">
                    <span className="text-gray-600">Interest Payout</span>
                    <span className="font-medium font-sans text-[#1CADA3] capitalize">
                      {interestPayout}
                    </span>
                  </div>
                  <div className="flex justify-between pt-2">
                    <span className="text-gray-600 font-semibold">Total Interest Earned</span>
                    <span className="font-bold font-sans text-[#1CADA3]">
                      {totalInterest > 0 ? formatCurrency(totalInterest) : '₹0'}
                    </span>
                  </div>
                </div>
              </div>

              {/* Disclaimer */}
              <div className="mt-6 p-4 bg-blue-50 border border-blue-100 rounded-lg">
                <p className="text-sm text-blue-800">
                  <span className="font-semibold">Note:</span> This calculator provides an estimate of returns based on the inputs provided. Actual returns may vary depending on bank policies, compounding frequency, and applicable taxes.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FDCalculator;