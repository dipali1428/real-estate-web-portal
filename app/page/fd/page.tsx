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
  const [compoundingFrequency, setCompoundingFrequency] = useState<'monthly' | 'quarterly' | 'annually'>('quarterly');
  const [isCalculating, setIsCalculating] = useState<boolean>(false);

  // State for calculated values
  const [maturityAmount, setMaturityAmount] = useState<number>(0);
  const [totalInterest, setTotalInterest] = useState<number>(0);
  const [estimatedReturns, setEstimatedReturns] = useState<number>(0);

  // State for validation errors
  const [errors, setErrors] = useState<{
    principalAmount: string;
    interestRate: string;
    tenure: string;
  }>({
    principalAmount: '',
    interestRate: '',
    tenure: ''
  });

  // Chart reference
  const chartRef = useRef<Chart<'doughnut'> | null>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  // Format currency for display
  const formatCurrency = (value: number): string => {
    if (value === 0) return '₹0';
    return '₹' + value.toFixed(0).replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  };

  // Validate inputs
  const validateInputs = () => {
    const newErrors = {
      principalAmount: '',
      interestRate: '',
      tenure: ''
    };

    if (!principalAmount || principalAmount < 10000) {
      newErrors.principalAmount = 'Minimum deposit amount is ₹10,000';
    } else if (principalAmount > 100000000) {
      newErrors.principalAmount = 'Maximum deposit amount is ₹10,00,00,000';
    }

    if (!interestRate || interestRate < 1) {
      newErrors.interestRate = 'Minimum interest rate is 1%';
    } else if (interestRate > 15) {
      newErrors.interestRate = 'Maximum interest rate is 15%';
    }

    if (!tenure || tenure <= 0) {
      newErrors.tenure = tenureType === 'years' ? 'Minimum tenure is 1 years' : 'Minimum tenure is 1 month';
    } else if (tenureType === 'years' && tenure > 30) {
      newErrors.tenure = 'Maximum tenure is 30 years';
    } else if (tenureType === 'months' && tenure > 360) {
      newErrors.tenure = 'Maximum tenure is 360 months';
    }

    setErrors(newErrors);
    return !newErrors.principalAmount && !newErrors.interestRate && !newErrors.tenure;
  };

  // Handle input changes with validation
  const handleInputChange = (field: string, value: string) => {
    if (value === '') {
      switch (field) {
        case 'principalAmount':
          setPrincipalAmount(0);
          setErrors(prev => ({ ...prev, principalAmount: 'Please enter deposit amount' }));
          break;
        case 'interestRate':
          setInterestRate(0);
          setErrors(prev => ({ ...prev, interestRate: 'Please enter interest rate' }));
          break;
        case 'tenure':
          setTenure(0);
          setErrors(prev => ({ ...prev, tenure: `Please enter tenure in ${tenureType}` }));
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
          if (numValue >= 10000 && numValue <= 100000000) {
            setErrors(prev => ({ ...prev, principalAmount: '' }));
          }
          break;
        case 'interestRate':
          const roundedRate = Math.round(numValue * 10) / 10; // Round to 1 decimal
          setInterestRate(roundedRate);
          if (roundedRate >= 1 && roundedRate <= 15) {
            setErrors(prev => ({ ...prev, interestRate: '' }));
          }
          break;
        case 'tenure':
          // Round to 1 decimal for years, whole number for months
          const roundedTenure = tenureType === 'years' 
            ? Math.round(numValue * 10) / 10 
            : Math.round(numValue);
          setTenure(roundedTenure);
          if (roundedTenure > 0) {
            setErrors(prev => ({ ...prev, tenure: '' }));
          }
          break;
      }
    }
  };

  // Calculate FD returns with compounding frequency
  const calculateFDReturns = () => {
    if (!validateInputs()) {
      // Reset to 0 if invalid
      setMaturityAmount(0);
      setTotalInterest(0);
      setEstimatedReturns(0);
      updateChart(0, 0);
      return;
    }

    setIsCalculating(true);

    // Convert tenure to years for calculation
    const tenureInYears = tenureType === 'months' ? tenure / 12 : tenure;
    
    // Determine compounding periods per year
    let periodsPerYear: number;
    switch(compoundingFrequency) {
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
        periodsPerYear = 4; // Default to quarterly
    }
    
    // Standard FD calculation formula: A = P(1 + r/n)^(nt)
    const ratePerPeriod = interestRate / (100 * periodsPerYear);
    const totalPeriods = periodsPerYear * tenureInYears;
    const amount = principalAmount * Math.pow(1 + ratePerPeriod, totalPeriods);
    const totalInterestEarned = amount - principalAmount;

    // Round to 2 decimal places
    const roundedAmount = Math.round(amount * 100) / 100;
    const roundedInterest = Math.round(totalInterestEarned * 100) / 100;
    
    setMaturityAmount(roundedAmount);
    setTotalInterest(roundedInterest);
    setEstimatedReturns(roundedInterest);

    // Update chart
    updateChart(principalAmount, roundedInterest);

    setIsCalculating(false);
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
              borderWidth: 0,
              hoverOffset: 10
            }]
          },
          options: {
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
              legend: {
                position: 'bottom' as const,
                labels: {
                  padding: 20,
                  usePointStyle: true,
                  pointStyle: 'circle',
                  font: {
                    size: 12
                  }
                }
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
            },
            cutout: '65%'
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

  // Update chart when data changes
  useEffect(() => {
    if (chartRef.current && principalAmount > 0 && totalInterest >= 0) {
      updateChart(principalAmount, totalInterest);
    }
  }, [principalAmount, totalInterest]);

  // Calculate FD returns when parameters change
  useEffect(() => {
    calculateFDReturns();
  }, [principalAmount, interestRate, tenure, tenureType, compoundingFrequency]);

  // Handle slider changes
  const handlePrincipalAmountChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = Number(e.target.value);
    setPrincipalAmount(value);
    if (value >= 10000 && value <= 10000000) {
      setErrors(prev => ({ ...prev, principalAmount: '' }));
    }
  };

  const handleInterestRateChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = Number(e.target.value);
    setInterestRate(value);
    if (value >= 1 && value <= 15) {
      setErrors(prev => ({ ...prev, interestRate: '' }));
    }
  };

  const handleTenureChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = Number(e.target.value);
    setTenure(value);
    if (value > 0) {
      setErrors(prev => ({ ...prev, tenure: '' }));
    }
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
    if (type === tenureType) return;
    
    let convertedValue = tenure;
    
    if (type === 'months') {
      // Convert from years to months
      convertedValue = Math.max(1, Math.round(tenure * 12));
      if (convertedValue > 360) convertedValue = 360;
    } else {
      // Convert from months to years
      convertedValue = tenure / 12;
      if (convertedValue < 0.1) convertedValue = 0.1;
      if (convertedValue > 30) convertedValue = 30;
      convertedValue = Math.round(convertedValue * 10) / 10; // Round to 1 decimal
    }
    
    setTenure(convertedValue);
    setTenureType(type);
    setErrors(prev => ({ ...prev, tenure: '' }));
  };

  // Prevent wheel event from changing input values
  const handleWheelPrevent = (e: React.WheelEvent<HTMLInputElement>) => {
    e.preventDefault();
    e.currentTarget.blur();
  };

  const handleNumberInputWheel = (e: React.WheelEvent<HTMLInputElement>) => {
    e.preventDefault();
    e.currentTarget.blur();
    e.stopPropagation();
  };

  // Reset to default values
  const handleReset = () => {
    setPrincipalAmount(100000);
    setInterestRate(7.5);
    setTenure(5);
    setTenureType('years');
    setCompoundingFrequency('quarterly');
    setErrors({
      principalAmount: '',
      interestRate: '',
      tenure: ''
    });
  };

  // Get minimum and maximum values for tenure
  const getTenureMinMax = () => {
    return {
      min: tenureType === 'years' ? '1' : '1',
      max: tenureType === 'years' ? '30' : '360'
    };
  };

  const tenureLimits = getTenureMinMax();

  // Calculate insights data
  const calculateInsights = () => {
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
  };

  const insights = calculateInsights();

  // Get compounding frequency description
  const getCompoundingDescription = () => {
    switch(compoundingFrequency) {
      case 'monthly':
        return 'Compounded monthly (12 times a year)';
      case 'quarterly':
        return 'Compounded quarterly (4 times a year)';
      case 'annually':
        return 'Compounded annually (once a year)';
      default:
        return 'Compounded quarterly';
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* FD Calculator */}
      <div className="container mx-auto px-4 py-8">
        <div className="bg-white rounded-2xl shadow-xl overflow-hidden max-w-6xl mx-auto">
          <div className="bg-linear-to-r from-[#2076C7] to-[#1CADA3] text-white py-6 px-8 text-center">
            <h1 className="text-3xl font-bold mb-2">Fixed Deposit Calculator</h1>
            <p className="text-blue-100">Calculate your Fixed Deposit returns with compounding interest</p>
          </div>

          <div className="flex flex-col lg:flex-row p-6 lg:p-8 font-sans">
            {/* Input Section */}
            <div className="flex-1 min-w-0 lg:pr-8 lg:border-r border-gray-200">
              
              {/* Principal Amount */}
              <div className="mb-6">
                <div className="flex justify-between items-center mb-2">
                  <label htmlFor="principalAmount" className="block text-[#2076C7] font-semibold">
                    Deposit Amount (₹)
                  </label>
                  {errors.principalAmount && (
                    <span className="text-red-500 text-sm font-medium">{errors.principalAmount}</span>
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
                  <div className="flex justify-between text-sm text-gray-600 mt-1">
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
                    className={`w-full px-4 py-3 border rounded focus:outline-none focus:ring-2 transition-colors pr-12 text-gray-800 placeholder:text-gray-500 ${
                      errors.principalAmount 
                        ? 'border-red-500 focus:border-red-500 focus:ring-red-200 bg-red-50' 
                        : 'border-gray-300 focus:border-[#1CADA3] focus:ring-teal-200 bg-gray-100 focus:bg-white'
                    }`}
                    placeholder="e.g., 100000"
                  />
                  <span className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-600 font-medium">₹</span>
                </div>
              </div>

              {/* Interest Rate */}
              <div className="mb-6">
                <div className="flex justify-between items-center mb-2">
                  <label htmlFor="interestRate" className="block text-[#2076C7] font-semibold">
                    Interest Rate (% per annum)
                  </label>
                  {errors.interestRate && (
                    <span className="text-red-500 text-sm font-medium">{errors.interestRate}</span>
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
                    className={`w-full px-4 py-3 border rounded focus:outline-none focus:ring-2 transition-colors pr-12 text-gray-800 placeholder:text-gray-500 ${
                      errors.interestRate 
                        ? 'border-red-500 focus:border-red-500 focus:ring-red-200 bg-red-50' 
                        : 'border-gray-300 focus:border-[#1CADA3] focus:ring-teal-200 bg-gray-100 focus:bg-white'
                    }`}
                    placeholder="e.g., 7.5"
                  />
                  <span className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-600 font-medium">%</span>
                </div>
              </div>

              {/* Tenure */}
              <div className="mb-6">
                <div className="flex justify-between items-center mb-2">
                  <div className="flex items-center space-x-4">
                    <label htmlFor="tenure" className="block text-[#2076C7] font-semibold">
                      Deposit Tenure
                    </label>
                    {errors.tenure && (
                      <span className="text-red-500 text-sm font-medium">{errors.tenure}</span>
                    )}
                  </div>
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
                    min={tenureLimits.min}
                    max={tenureLimits.max}
                    step={tenureType === 'years' ? '1' : '1'}
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
                    min={tenureLimits.min}
                    max={tenureLimits.max}
                    step={tenureType === 'years' ? '1' : '1'}
                    value={tenure === 0 ? '' : tenure}
                    onChange={handleTenureInputChange}
                    onWheel={handleNumberInputWheel}
                    className={`w-full px-4 py-3 border rounded focus:outline-none focus:ring-2 transition-colors pr-24 text-gray-800 placeholder:text-gray-500 ${
                      errors.tenure 
                        ? 'border-red-500 focus:border-red-500 focus:ring-red-200 bg-red-50' 
                        : 'border-gray-300 focus:border-[#1CADA3] focus:ring-teal-200 bg-gray-100 focus:bg-white'
                    }`}
                    placeholder={tenureType === 'years' ? 'e.g., 5' : 'e.g., 60'}
                  />
                  <span className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-600 font-medium">
                    {tenureType === 'years' ? 'Years' : 'Months'}
                  </span>
                </div>
              </div>

              {/* Compounding Frequency */}
              <div className="mb-6">
                <label className="block text-[#2076C7] font-semibold mb-3">
                  Compounding Frequency
                </label>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                  <button
                    type="button"
                    onClick={() => setCompoundingFrequency('monthly')}
                    className={`py-3 px-4 rounded-lg border transition-all ${compoundingFrequency === 'monthly' ? 'border-[#1CADA3] bg-teal-50 text-[#1CADA3]' : 'border-gray-300 hover:border-gray-400 text-gray-700'}`}
                  >
                    <div className="font-medium">Monthly</div>
                    <div className="text-xs mt-1 opacity-75">12 times/year</div>
                  </button>
                  <button
                    type="button"
                    onClick={() => setCompoundingFrequency('quarterly')}
                    className={`py-3 px-4 rounded-lg border transition-all ${compoundingFrequency === 'quarterly' ? 'border-[#1CADA3] bg-teal-50 text-[#1CADA3]' : 'border-gray-300 hover:border-gray-400 text-gray-700'}`}
                  >
                    <div className="font-medium">Quarterly</div>
                    <div className="text-xs mt-1 opacity-75">4 times/year</div>
                  </button>
                  <button
                    type="button"
                    onClick={() => setCompoundingFrequency('annually')}
                    className={`py-3 px-4 rounded-lg border transition-all ${compoundingFrequency === 'annually' ? 'border-[#1CADA3] bg-teal-50 text-[#1CADA3]' : 'border-gray-300 hover:border-gray-400 text-gray-700'}`}
                  >
                    <div className="font-medium">Annually</div>
                    <div className="text-xs mt-1 opacity-75">Once a year</div>
                  </button>
                </div>
                <p className="text-sm text-gray-500 mt-2">
                  {getCompoundingDescription()}
                </p>
              </div>

              {/* Reset Button */}
              <button
                onClick={handleReset}
                className="w-full mb-6 px-4 py-3 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300 transition-colors font-medium"
              >
                Reset to Default Values
              </button>

              {/* Results Section */}
              <div className="bg-gray-50 p-6 rounded-xl shadow-sm border-l-4 border-[#1CADA3]">
                <div className="text-center mb-6">
                  <div className="text-sm text-[#2076C7] font-medium mb-1">Maturity Amount</div>
                  <div className="text-3xl font-bold text-[#1CADA3] font-sans">
                    {isCalculating ? (
                      <div className="inline-block h-8 w-8 animate-spin rounded-full border-4 border-solid border-current border-r-transparent"></div>
                    ) : (
                      maturityAmount > 0 ? formatCurrency(maturityAmount) : '₹0'
                    )}
                  </div>
                </div>
                <div className="flex justify-between">
                  <div className="text-center flex-1 px-4">
                    <div className="text-lg font-medium font-sans text-[#1CADA3]">
                      {isCalculating ? '-' : totalInterest > 0 ? formatCurrency(totalInterest) : '₹0'}
                    </div>
                    <div className="text-sm text-[#1CADA3] mt-1">Total Interest</div>
                  </div>
                  <div className="text-center flex-1 px-4">
                    <div className="text-lg font-medium font-sans text-[#1CADA3]">
                      {isCalculating ? '-' : estimatedReturns > 0 ? formatCurrency(estimatedReturns) : '₹0'}
                    </div>
                    <div className="text-sm text-[#1CADA3] mt-1">Estimated Returns</div>
                  </div>
                </div>
              </div>
            </div>

            {/* Visualization Section */}
            <div className="flex-1 min-w-0 lg:pl-8 mt-8 lg:mt-0">
              <div className="chart-container h-64 mb-6 relative">
                <canvas ref={canvasRef}></canvas>
                {principalAmount === 0 && (
                  <div className="absolute inset-0 flex items-center justify-center bg-gray-100 bg-opacity-50 rounded-lg">
                    <p className="text-gray-500">Enter deposit amount to see chart</p>
                  </div>
                )}
              </div>

              <div className="bg-gray-50 p-6 rounded-xl shadow-sm border-l-4 border-[#2076C7] mb-6">
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
                      {interestRate > 0 ? `${interestRate.toFixed(1)}%` : '0%'}
                    </span>
                  </div>
                  <div className="flex justify-between pb-3 border-b border-gray-200">
                    <span className="text-gray-600">Tenure</span>
                    <span className="font-medium font-sans text-[#1CADA3]">
                      {tenure > 0 ? `${tenure} ${tenureType}` : '0'}
                    </span>
                  </div>
                  <div className="flex justify-between pb-3 border-b border-gray-200">
                    <span className="text-gray-600">Compounding</span>
                    <span className="font-medium font-sans text-[#1CADA3] capitalize">
                      {compoundingFrequency}
                    </span>
                  </div>
                  <div className="flex justify-between pt-2">
                    <span className="text-gray-600 font-semibold">Total Interest Earned</span>
                    <span className="font-bold font-sans text-[#1CADA3]">
                      {isCalculating ? '-' : totalInterest > 0 ? formatCurrency(totalInterest) : '₹0'}
                    </span>
                  </div>
                </div>
              </div>

              {/* Disclaimer */}
              <div className="p-4 bg-blue-50 border border-blue-100 rounded-lg">
                <p className="text-sm text-blue-800 mb-2">
                  <span className="font-semibold">Note:</span> This calculator provides an estimate of returns based on the inputs provided. Actual returns may vary depending on bank policies and applicable taxes.
                </p>
                <p className="text-xs text-blue-700">
                  • Interest is compounded {compoundingFrequency}<br/>
                  • This is for estimation purposes only
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      {/* KEY INSIGHTS SECTION - Fixed Deposit */}
      <div className="mt-8 mb-8">
        <div className="max-w-6xl mx-auto">
          <div className="bg-white rounded-xl border shadow-md p-6">
            <h2 className="text-xl font-semibold text-gray-800 mb-4 flex items-center gap-2">
              <i className="fas fa-lightbulb text-yellow-500"></i>
              Key Insights
            </h2>

            <div className="text-gray-700 leading-relaxed">
              <ul className="list-disc pl-5 mb-4 space-y-2">
                <li>
                  Your investment of{' '}
                  <span className="bg-blue-50 px-2 py-1 rounded font-medium font-sans">
                    {principalAmount > 0 ? formatCurrency(principalAmount) : '₹0'}
                  </span>{' '}
                  will grow to{' '}
                  <span className="bg-blue-50 px-2 py-1 rounded font-medium font-sans">
                    {maturityAmount > 0 ? formatCurrency(maturityAmount) : '₹0'}
                  </span>{' '}
                  in {tenure > 0 ? `${tenure} ${tenureType}` : '0'} at {interestRate > 0 ? interestRate.toFixed(1) : '0'}% interest
                </li>
                
                <li>
                  You will earn{' '}
                  <span className="bg-blue-50 px-2 py-1 rounded font-medium font-sans">
                    {totalInterest > 0 ? formatCurrency(totalInterest) : '₹0'}
                  </span>{' '}
                  in interest, which is{' '}
                  <span className="bg-blue-50 px-2 py-1 rounded font-medium font-sans">
                    {insights.interestPercentageOfPrincipal}%
                  </span>{' '}
                  of your principal amount
                </li>
                
                <li>
                  Your FD will generate{' '}
                  <span className="bg-blue-50 px-2 py-1 rounded font-medium font-sans">
                    ₹{insights.averageAnnualInterest}
                  </span>{' '}
                  average annual interest
                </li>
                
                {(() => {
                  // Calculate impact of higher interest rate
                  if (interestRate > 1 && principalAmount > 0 && tenure > 0) {
                    const higherRate = interestRate + 1; // 1% higher rate
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
                          <span className="bg-blue-50 px-2 py-1 rounded font-medium font-sans">
                            {formatCurrency(extraEarnings)}
                          </span>
                        </li>
                      );
                    }
                  }
                  return null;
                })()}
                
                {(() => {
                  // Calculate impact of different compounding frequencies
                  if (compoundingFrequency !== 'monthly' && principalAmount > 0 && interestRate > 0 && tenure > 0) {
                    // Calculate with monthly compounding for comparison
                    const monthlyRate = interestRate / (100 * 12);
                    const tenureInYears = tenureType === 'months' ? tenure / 12 : tenure;
                    const months = tenureInYears * 12;
                    const monthlyAmount = principalAmount * Math.pow(1 + monthlyRate, months);
                    const difference = monthlyAmount - maturityAmount;
                    
                    if (difference > 0) {
                      return (
                        <li>
                          Monthly compounding would earn{' '}
                          <span className="bg-blue-50 px-2 py-1 rounded font-medium font-sans">
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
                  // Calculate tax impact insight
                  if (totalInterest > 0) {
                    const taxableAmount = Math.max(0, totalInterest - 40000); // Assuming basic exemption
                    const taxPayable = taxableAmount > 0 ? taxableAmount * 0.10 : 0; // 10% tax rate
                    const netReturn = totalInterest - taxPayable;
                    
                    if (taxableAmount > 0) {
                      return (
                        <li>
                          After TDS (10% tax on interest above ₹40,000), your net interest would be{' '}
                          <span className="bg-blue-50 px-2 py-1 rounded font-medium font-sans">
                            {formatCurrency(netReturn)}
                          </span>
                        </li>
                      );
                    }
                  }
                  return null;
                })()}
                
                {(() => {
                  // Compare with inflation
                  if (maturityAmount > 0 && totalInterest > 0) {
                    const inflationRate = 6; // Assume 6% inflation
                    const inflationAdjustedValue = maturityAmount / Math.pow(1 + inflationRate/100, 
                                                                           tenureType === 'months' ? tenure/12 : tenure);
                    const realReturn = inflationAdjustedValue - principalAmount;
                    
                    return (
                      <li>
                        Adjusted for 6% inflation, your real return would be{' '}
                        <span className="bg-blue-50 px-2 py-1 rounded font-medium font-sans">
                          {formatCurrency(realReturn)}
                        </span>{' '}
                        (in today's money value)
                      </li>
                    );
                  }
                  return null;
                })()}
                
                <li>
                  Your FD generates{' '}
                  <span className="bg-blue-50 px-2 py-1 rounded font-medium font-sans">
                    ₹{insights.interestPerDay}
                  </span>{' '}
                  per day in interest income
                </li>

                <li>
                  At this rate, your money will double in{' '}
                  <span className="bg-blue-50 px-2 py-1 rounded font-medium font-sans">
                    {insights.doublingYears} years
                  </span>{' '}
                  (using the Rule of 72)
                </li>
              </ul>
              
              <div className="mt-6 p-4 bg-yellow-50 border border-yellow-200 rounded-lg">
                <p className="text-sm text-yellow-800">
                  <strong>💡 Investment Tip:</strong> Senior citizens (above 60 years) typically get 0.5% higher FD rates. 
                  Consider splitting large FDs into smaller ones to maintain liquidity and avoid breaking the entire FD for partial withdrawals.
                </p>
              </div>
              
              <p className="text-sm text-gray-600 mt-4">
                <strong>Note:</strong> FD interest is fully taxable. TDS is deducted at 10% if interest exceeds ₹40,000 
                (₹50,000 for senior citizens). Interest rates vary between banks and change periodically.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FDCalculator;