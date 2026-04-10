'use client';
import React, { useState, useEffect, useRef } from 'react';
import { Chart, DoughnutController, ArcElement, Tooltip, Legend } from 'chart.js';

// Register Chart.js components
Chart.register(DoughnutController, ArcElement, Tooltip, Legend);

// Format currency for display
const formatCurrency = (value: number): string => {
    if (value === 0) return '₹0';
    return '₹' + value.toFixed(0).replace(/\B(?=(\d{3})+(?!\d))/g, ",");
};

const FDCalculator: React.FC = () => {
    // State for FD parameters
    const [principalAmount, setPrincipalAmount] = useState<number>(100000);
    const [interestRate, setInterestRate] = useState<number>(7.5);
    const [tenure, setTenure] = useState<number>(5);
    const [tenureType, setTenureType] = useState<'years' | 'months'>('years');
    const [compoundingFrequency, setCompoundingFrequency] = useState<'monthly' | 'quarterly' | 'annually'>('quarterly');

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

    // State for validation errors

    // State for validation errors

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

    // Calculation logic moved to render for efficiency and to avoid sync state updates
    const calculateReturns = () => {
        // Simple internal validation for calculation
        if (!principalAmount || principalAmount < 10000 || !interestRate || interestRate < 1 || !tenure || tenure <= 0) {
            return {
                amount: 0,
                interest: 0
            };
        }

        // Convert tenure to years for calculation
        const tenureInYears = tenureType === 'months' ? tenure / 12 : tenure;

        // Determine compounding periods per year
        let periodsPerYear: number;
        switch (compoundingFrequency) {
            case 'monthly': periodsPerYear = 12; break;
            case 'quarterly': periodsPerYear = 4; break;
            case 'annually': periodsPerYear = 1; break;
            default: periodsPerYear = 4;
        }

        // Standard FD calculation formula: A = P(1 + r/n)^(nt)
        const ratePerPeriod = interestRate / (100 * periodsPerYear);
        const totalPeriods = periodsPerYear * tenureInYears;
        const amount = principalAmount * Math.pow(1 + ratePerPeriod, totalPeriods);
        const interest = amount - principalAmount;

        return {
            amount: Math.round(amount * 100) / 100,
            interest: Math.round(interest * 100) / 100
        };
    };

    const returns = calculateReturns();
    const maturityAmount = returns.amount;
    const totalInterest = returns.interest;

    // Chart reference
    const chartRef = useRef<Chart<'doughnut'> | null>(null);
    const canvasRef = useRef<HTMLCanvasElement>(null);



    // Initialize or update chart
    useEffect(() => {
        if (!canvasRef.current) return;

        if (!chartRef.current) {
            const ctx = canvasRef.current.getContext('2d');
            if (ctx) {
                chartRef.current = new Chart(ctx, {
                    type: 'doughnut',
                    data: {
                        labels: ['Principal', 'Interest Earned'],
                        datasets: [{
                            data: [principalAmount, totalInterest],
                            backgroundColor: ['#009B91', '#E5E7EB'],
                            borderWidth: 0
                        }]
                    },
                    options: {
                        responsive: true,
                        maintainAspectRatio: false,
                        cutout: '80%',
                        plugins: {
                            legend: { display: false },
                            tooltip: {
                                callbacks: {
                                    label: function (context) {
                                        let label = context.label || '';
                                        if (label) label += ': ';
                                        if (context.parsed !== null) label += formatCurrency(context.parsed);
                                        return label;
                                    }
                                }
                            }
                        }
                    }
                });
            }
        } else {
            chartRef.current.data.datasets[0].data = [principalAmount, totalInterest];
            chartRef.current.update();
        }

        return () => {
            // No need to destroy on every update if we keep the ref
        };
    }, [principalAmount, totalInterest]);

    // Final cleanup when component unmounts
    useEffect(() => {
        return () => {
            if (chartRef.current) {
                chartRef.current.destroy();
                chartRef.current = null;
            }
        };
    }, []);

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
        switch (compoundingFrequency) {
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
        <div className="w-full">
            {/* FD Calculator */}
            <div className="container mx-auto px-4 py-6 md:py-10">
                <div className="bg-white rounded-2xl shadow-xl overflow-hidden max-w-6xl mx-auto">
                    <div className="bg-linear-to-r from-[#2076C7] to-[#1CADA3] text-white py-4 px-4 sm:px-8 text-center">
                        <h1 className="text-xl sm:text-2xl md:text-3xl font-bold mb-1 sm:mb-2">Fixed Deposit Calculator</h1>
                        <p className="text-blue-100 text-sm sm:text-base">Calculate your Fixed Deposit returns with compounding interest</p>
                    </div>

                    <div className="flex flex-col lg:flex-row p-4 lg:p-5 font-sans">
                        {/* Input Section */}
                        <div className="flex-1 min-w-0 lg:pr-8 lg:border-r border-gray-200">

                            {/* Principal Amount */}
                            <div className="mb-4 sm:mb-6">
                                <div className="flex justify-between items-center mb-1.5 sm:mb-2 text-sm sm:text-base">
                                    <label htmlFor="principalAmount" className="block text-[#2076C7] font-semibold">
                                        Deposit Amount (₹)
                                    </label>
                                    {errors.principalAmount && (
                                        <span className="text-red-500 text-[10px] sm:text-sm font-medium">{errors.principalAmount}</span>
                                    )}
                                </div>
                                <div className="slider-container mb-3 sm:mb-4">
                                    <input
                                        type="range"
                                        id="principalAmount"
                                        min="10000"
                                        max="10000000"
                                        step="10000"
                                        value={principalAmount}
                                        onChange={handlePrincipalAmountChange}
                                        className="w-full h-1.5 sm:h-2 rounded-lg cursor-pointer slider accent-teal-600"
                                        style={{ background: `linear-gradient(to right, #1CADA3 0%, #1CADA3 ${((principalAmount - 10000) / (10000000 - 10000)) * 100}%, #e5e7eb ${((principalAmount - 10000) / (10000000 - 10000)) * 100}%, #e5e7eb 100%)` }}
                                    />
                                    <div className="flex justify-between text-[10px] sm:text-sm text-gray-600 mt-1.5">
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
                                        className={`w-full px-4 py-2.5 sm:py-2 border rounded-xl sm:rounded border-gray-300 focus:outline-none focus:ring-0 transition-colors pr-12 text-gray-800 placeholder:text-gray-500 text-sm sm:text-base ${errors.principalAmount
                                            ? 'border-red-500 focus:border-red-500 bg-red-50'
                                            : 'border-gray-300 focus:border-[#1CADA3] bg-gray-100 focus:bg-white'
                                            }`}
                                        placeholder="e.g., 100000"
                                    />
                                    <span className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-600 font-medium">₹</span>
                                </div>
                            </div>

                            {/* Interest Rate */}
                            <div className="mb-4 sm:mb-6">
                                <div className="flex justify-between items-center mb-1.5 sm:mb-2 text-sm sm:text-base">
                                    <label htmlFor="interestRate" className="block text-[#2076C7] font-semibold">
                                        Interest Rate (% per annum)
                                    </label>
                                    {errors.interestRate && (
                                        <span className="text-red-500 text-[10px] sm:text-sm font-medium">{errors.interestRate}</span>
                                    )}
                                </div>
                                <div className="slider-container mb-3 sm:mb-4">
                                    <input
                                        type="range"
                                        id="interestRate"
                                        min="1"
                                        max="15"
                                        step="0.1"
                                        value={interestRate}
                                        onChange={handleInterestRateChange}
                                        className="w-full h-1.5 sm:h-2 rounded-lg cursor-pointer slider accent-teal-600"
                                        style={{ background: `linear-gradient(to right, #1CADA3 0%, #1CADA3 ${((interestRate - 1) / (15 - 1)) * 100}%, #e5e7eb ${((interestRate - 1) / (15 - 1)) * 100}%, #e5e7eb 100%)` }}
                                    />
                                    <div className="flex justify-between text-[10px] sm:text-sm text-gray-600 mt-1.5">
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
                                        className={`w-full px-4 py-2.5 sm:py-2 border rounded-xl sm:rounded border-gray-300 focus:outline-none focus:ring-0 transition-colors pr-12 text-gray-800 placeholder:text-gray-500 text-sm sm:text-base ${errors.interestRate
                                            ? 'border-red-500 focus:border-red-500 bg-red-50'
                                            : 'border-gray-300 focus:border-[#1CADA3] bg-gray-100 focus:bg-white'
                                            }`}
                                        placeholder="e.g., 7.5"
                                    />
                                    <span className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-600 font-medium">%</span>
                                </div>
                            </div>

                            {/* Tenure */}
                            <div className="mb-4 sm:mb-6">
                                <div className="flex justify-between items-center mb-1.5 sm:mb-2 text-sm sm:text-base">
                                    <div className="flex items-center space-x-3 sm:space-x-4">
                                        <label htmlFor="tenure" className="block text-[#2076C7] font-semibold">
                                            Deposit Tenure
                                        </label>
                                        {errors.tenure && (
                                            <span className="text-red-500 text-[10px] sm:text-sm font-medium">{errors.tenure}</span>
                                        )}
                                    </div>
                                    <div className="flex space-x-1.5 sm:space-x-2">
                                        <button
                                            type="button"
                                            onClick={() => handleTenureTypeToggle('years')}
                                            className={`px-2.5 py-0.5 sm:px-3 sm:py-1 text-[10px] sm:text-sm rounded-full transition-colors font-medium ${tenureType === 'years' ? 'bg-[#1CADA3] text-white' : 'bg-gray-200 text-gray-700 hover:bg-gray-300'}`}
                                        >
                                            Years
                                        </button>
                                        <button
                                            type="button"
                                            onClick={() => handleTenureTypeToggle('months')}
                                            className={`px-2.5 py-0.5 sm:px-3 sm:py-1 text-[10px] sm:text-sm rounded-full transition-colors font-medium ${tenureType === 'months' ? 'bg-[#1CADA3] text-white' : 'bg-gray-200 text-gray-700 hover:bg-gray-300'}`}
                                        >
                                            Months
                                        </button>
                                    </div>
                                </div>
                                <div className="slider-container mb-3 sm:mb-4">
                                    <input
                                        type="range"
                                        id="tenure"
                                        min={tenureLimits.min}
                                        max={tenureLimits.max}
                                        step={tenureType === 'years' ? '1' : '1'}
                                        value={tenure}
                                        onChange={handleTenureChange}
                                        className="w-full h-1.5 sm:h-2 rounded-lg cursor-pointer slider accent-teal-600"
                                        style={{ background: `linear-gradient(to right, #1CADA3 0%, #1CADA3 ${((tenure - Number(tenureLimits.min)) / (Number(tenureLimits.max) - Number(tenureLimits.min))) * 100}%, #e5e7eb ${((tenure - Number(tenureLimits.min)) / (Number(tenureLimits.max) - Number(tenureLimits.min))) * 100}%, #e5e7eb 100%)` }}
                                    />
                                    <div className="flex justify-between text-[10px] sm:text-sm text-gray-600 mt-1.5">
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
                                        className={`w-full px-4 py-2.5 sm:py-2 border rounded-xl sm:rounded border-gray-300 focus:outline-none focus:ring-0 transition-colors pr-24 text-gray-800 placeholder:text-gray-500 text-sm sm:text-base ${errors.tenure
                                            ? 'border-red-500 focus:border-red-500 bg-red-50'
                                            : 'border-gray-300 focus:border-[#1CADA3] bg-gray-100 focus:bg-white'
                                            }`}
                                        placeholder={tenureType === 'years' ? 'e.g., 5' : 'e.g., 60'}
                                    />
                                    <span className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-600 font-medium text-xs sm:text-sm">
                                        {tenureType === 'years' ? 'Years' : 'Months'}
                                    </span>
                                </div>
                            </div>

                            {/* Compounding Frequency */}
                            <div className="mb-6">
                                <label className="block text-[#2076C7] font-semibold mb-2 text-sm sm:text-base">
                                    Compounding Frequency
                                </label>
                                <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5 sm:gap-3">
                                    <button
                                        type="button"
                                        onClick={() => setCompoundingFrequency('monthly')}
                                        className={`py-2 px-4 rounded-xl sm:rounded-lg border transition-all ${compoundingFrequency === 'monthly' ? 'border-[#1CADA3] bg-teal-50 text-[#1CADA3]' : 'border-gray-300 hover:border-gray-400 text-gray-700'}`}
                                    >
                                        <div className="text-[13px] sm:text-[13px] font-bold sm:font-semibold">Monthly</div>
                                        <div className="text-[10px] mt-0.5 opacity-75">12 times/year</div>
                                    </button>
                                    <button
                                        type="button"
                                        onClick={() => setCompoundingFrequency('quarterly')}
                                        className={`py-2 px-4 rounded-xl sm:rounded-lg border transition-all ${compoundingFrequency === 'quarterly' ? 'border-[#1CADA3] bg-teal-50 text-[#1CADA3]' : 'border-gray-300 hover:border-gray-400 text-gray-700'}`}
                                    >
                                        <div className="text-[13px] sm:text-[13px] font-bold sm:font-semibold">Quarterly</div>
                                        <div className="text-[10px] mt-0.5 opacity-75">4 times/year</div>
                                    </button>
                                    <button
                                        type="button"
                                        onClick={() => setCompoundingFrequency('annually')}
                                        className={`py-2 px-4 rounded-xl sm:rounded-lg border transition-all ${compoundingFrequency === 'annually' ? 'border-[#1CADA3] bg-teal-50 text-[#1CADA3]' : 'border-gray-300 hover:border-gray-400 text-gray-700'}`}
                                    >
                                        <div className="text-[13px] sm:text-[13px] font-bold sm:font-semibold">Annually</div>
                                        <div className="text-[10px] mt-0.5 opacity-75">Once a year</div>
                                    </button>
                                </div>
                                <p className="text-[11px] sm:text-sm text-gray-500 mt-3 font-medium">
                                    {getCompoundingDescription()}
                                </p>
                            </div>

                            {/* Reset Button */}
                            <button
                                onClick={handleReset}
                                className="w-full mb-8 sm:mb-6 px-4 py-3.5 sm:py-3 bg-gray-100 text-gray-600 rounded-xl sm:rounded-lg hover:bg-gray-200 transition-colors font-bold sm:font-medium text-sm sm:text-base border border-gray-200"
                            >
                                Reset to Default Values
                            </button>

                            {/* Results Section */}
                            <div className="bg-teal-50/30 p-6 sm:p-6 rounded-2xl sm:rounded-xl border-l-4 border-[#1CADA3] mb-8 lg:mb-0">
                                <div className="text-center mb-6">
                                    <div className="text-xs sm:text-sm text-[#2076C7] font-bold sm:font-medium mb-1 uppercase tracking-wider">Maturity Amount</div>
                                    <div className="text-2xl sm:text-2xl font-extrabold text-[#1CADA3] font-sans">
                                        {maturityAmount > 0 ? formatCurrency(maturityAmount) : '₹0'}
                                    </div>
                                </div>
                                <div className="flex justify-between items-start divide-x divide-teal-100">
                                    <div className="text-center flex-1 px-2">
                                        <div className="text-sm sm:text-base font-bold sm:font-medium font-sans text-slate-700">
                                            {totalInterest > 0 ? formatCurrency(totalInterest) : '₹0'}
                                        </div>
                                        <div className="text-[10px] sm:text-sm text-[#1CADA3] mt-1 font-bold sm:font-normal uppercase">Total Interest</div>
                                    </div>
                                    <div className="text-center flex-1 px-2">
                                        <div className="text-sm sm:text-base font-bold sm:font-medium font-sans text-slate-700">
                                            {totalInterest > 0 ? formatCurrency(totalInterest) : '₹0'}
                                        </div>
                                        <div className="text-[10px] sm:text-sm text-[#1CADA3] mt-1 font-bold sm:font-normal uppercase text-nowrap">Est. Returns</div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Visualization Section */}
                        <div className="flex-1 min-w-0 lg:pl-8 mt-8 lg:mt-0">
                            <div className="chart-container h-44 sm:h-56 mb-4 sm:mb-6 relative">
                                <canvas ref={canvasRef} style={{ display: 'block', width: '100%', height: '100%' }}></canvas>
                                <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none">
                                    <div className="text-[10px] sm:text-xs font-bold text-gray-400 uppercase tracking-wider mb-0.5">
                                        MATURITY AMOUNT
                                    </div>
                                    <div className="text-xl sm:text-2xl font-extrabold text-[#009B91] font-sans">
                                        {maturityAmount > 0 ? formatCurrency(maturityAmount) : '₹0'}
                                    </div>
                                </div>
                            </div>

                            <div className="flex justify-center gap-8 mb-4 sm:mb-6">
                                <div className="flex items-center gap-2">
                                    <div className="w-4 h-4 rounded-full bg-[#009B91]"></div>
                                    <span className="text-sm font-bold text-gray-700">Principal</span>
                                </div>
                                <div className="flex items-center gap-2">
                                    <div className="w-4 h-4 rounded-full bg-[#E5E7EB]"></div>
                                    <span className="text-sm font-bold text-gray-700">Interest Earned</span>
                                </div>
                            </div>

                            <div className="bg-white p-4 sm:p-6 rounded-2xl shadow-sm border border-gray-100 mb-6">
                                <h5 className="font-bold mb-4 text-base sm:text-lg bg-linear-to-r from-[#2076C7] to-[#1CADA3] bg-clip-text text-transparent">FD Summary</h5>
                                <div className="space-y-2.5">
                                    <div className="flex justify-between pb-2 border-b border-gray-100 items-baseline">
                                        <span className="text-xs sm:text-sm text-gray-500 font-medium">Deposit Amount</span>
                                        <span className="text-sm sm:text-base font-bold font-sans text-slate-700">
                                            {principalAmount > 0 ? formatCurrency(principalAmount) : '₹0'}
                                        </span>
                                    </div>
                                    <div className="flex justify-between pb-2 border-b border-gray-100 items-baseline">
                                        <span className="text-xs sm:text-sm text-gray-500 font-medium">Interest Rate</span>
                                        <span className="text-sm sm:text-base font-bold font-sans text-slate-700">
                                            {interestRate > 0 ? `${interestRate.toFixed(1)}%` : '0%'}
                                        </span>
                                    </div>
                                    <div className="flex justify-between pb-2 border-b border-gray-100 items-baseline">
                                        <span className="text-xs sm:text-sm text-gray-500 font-medium">Tenure</span>
                                        <span className="text-sm sm:text-base font-bold font-sans text-slate-700">
                                            {tenure > 0 ? `${tenure} ${tenureType}` : '0'}
                                        </span>
                                    </div>
                                    <div className="flex justify-between pb-2 border-b border-gray-100 items-baseline">
                                        <span className="text-xs sm:text-sm text-gray-500 font-medium">Compounding</span>
                                        <span className="text-sm sm:text-base font-bold font-sans text-slate-700 capitalize">
                                            {compoundingFrequency}
                                        </span>
                                    </div>
                                    <div className="flex justify-between pt-2 items-baseline">
                                        <span className="text-xs sm:text-sm text-slate-800 font-bold">Total Interest</span>
                                        <span className="text-base sm:text-lg font-extrabold font-sans text-[#1CADA3]">
                                            {totalInterest > 0 ? formatCurrency(totalInterest) : '₹0'}
                                        </span>
                                    </div>
                                </div>
                            </div>

                            {/* Disclaimer */}
                            <div className="p-4 bg-blue-50/50 border border-blue-100 rounded-xl">
                                <p className="text-[11px] sm:text-sm text-blue-800 mb-2 leading-relaxed">
                                    <span className="font-bold">Note:</span> This calculator provides an estimate of returns based on the inputs provided. Actual returns may vary depending on bank policies and applicable taxes.
                                </p>
                                <div className="text-[10px] sm:text-xs text-blue-700 font-medium space-y-1">
                                    <div className="flex items-center gap-1.5">• Interest is compounded {compoundingFrequency}</div>
                                    <div className="flex items-center gap-1.5">• This is for estimation purposes only</div>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* KEY INSIGHTS SECTION - Fixed Deposit */}
                    <div className="border-t border-gray-100 p-5 lg:p-8 bg-gray-50/30">
                        <h2 className="text-lg sm:text-xl font-bold mb-5 flex items-center gap-2 bg-linear-to-r from-[#2076C7] to-[#1CADA3] bg-clip-text text-transparent">
                            <i className="fas fa-lightbulb text-yellow-500"></i>
                            Key Investment Insights
                        </h2>

                        <div className="text-xs sm:text-sm text-gray-700 leading-relaxed">
                            <ul className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-4 list-none pl-0 mb-2">
                                <li className="flex items-start gap-3">
                                    <div className="w-1.5 h-1.5 rounded-full bg-[#1CADA3] mt-2 shrink-0"></div>
                                    <span>
                                        Your investment of{' '}
                                        <span className="bg-[#2076C7]/5 px-2 py-0.5 rounded font-bold text-slate-800 font-sans">
                                            {principalAmount > 0 ? formatCurrency(principalAmount) : '₹0'}
                                        </span>{' '}
                                        will grow to{' '}
                                        <span className="bg-[#1CADA3]/10 px-2 py-0.5 rounded font-extrabold text-[#1CADA3] font-sans">
                                            {maturityAmount > 0 ? formatCurrency(maturityAmount) : '₹0'}
                                        </span>{' '}
                                        in {tenure > 0 ? `${tenure} ${tenureType}` : '0'} at {interestRate > 0 ? interestRate.toFixed(1) : '0'}% interest
                                    </span>
                                </li>

                                <li className="flex items-start gap-3">
                                    <div className="w-1.5 h-1.5 rounded-full bg-[#1CADA3] mt-2 shrink-0"></div>
                                    <span>
                                        You will earn{' '}
                                        <span className="bg-teal-50 px-2 py-0.5 rounded font-bold text-teal-700 font-sans">
                                            {totalInterest > 0 ? formatCurrency(totalInterest) : '₹0'}
                                        </span>{' '}
                                        in interest, which is{' '}
                                        <span className="bg-teal-50 px-2 py-0.5 rounded font-bold text-teal-700 font-sans">
                                            {insights.interestPercentageOfPrincipal}%
                                        </span>{' '}
                                        of your principal amount
                                    </span>
                                </li>

                                <li className="flex items-start gap-3">
                                    <div className="w-1.5 h-1.5 rounded-full bg-[#1CADA3] mt-2 shrink-0"></div>
                                    <span>
                                        Your FD will generate{' '}
                                        <span className="bg-blue-50 px-2 py-0.5 rounded font-bold text-blue-700 font-sans">
                                            ₹{(Number(insights.averageAnnualInterest)).toLocaleString('en-IN')}
                                        </span>{' '}
                                        average annual interest
                                    </span>
                                </li>

                                {(() => {
                                    if (interestRate > 1 && principalAmount > 0 && tenure > 0) {
                                        const higherRate = interestRate + 1;
                                        const periodsPerYear = compoundingFrequency === 'monthly' ? 12 :
                                            compoundingFrequency === 'quarterly' ? 4 : 1;
                                        const ratePerPeriod = higherRate / (100 * periodsPerYear);
                                        const tenureInYears = tenureType === 'months' ? tenure / 12 : tenure;
                                        const totalPeriods = periodsPerYear * tenureInYears;
                                        const higherAmount = principalAmount * Math.pow(1 + ratePerPeriod, totalPeriods);
                                        const extraEarnings = higherAmount - maturityAmount;

                                        if (extraEarnings > 0) {
                                            return (
                                                <li className="flex items-start gap-3">
                                                    <div className="w-1.5 h-1.5 rounded-full bg-[#1CADA3] mt-2 shrink-0"></div>
                                                    <span>
                                                        A 1% higher interest rate could earn you an extra{' '}
                                                        <span className="bg-orange-50 px-2 py-0.5 rounded font-bold text-orange-700 font-sans">
                                                            {formatCurrency(extraEarnings)}
                                                        </span>
                                                    </span>
                                                </li>
                                            );
                                        }
                                    }
                                    return null;
                                })()}

                                <li className="flex items-start gap-3">
                                    <div className="w-1.5 h-1.5 rounded-full bg-[#1CADA3] mt-2 shrink-0"></div>
                                    <span>
                                        Your FD generates{' '}
                                        <span className="bg-blue-50 px-2 py-0.5 rounded font-bold text-blue-700 font-sans">
                                            ₹{insights.interestPerDay}
                                        </span>{' '}
                                        per day in interest income
                                    </span>
                                </li>

                                <li className="flex items-start gap-3">
                                    <div className="w-1.5 h-1.5 rounded-full bg-[#1CADA3] mt-2 shrink-0"></div>
                                    <span>
                                        At this rate, your money will double in{' '}
                                        <span className="bg-blue-50 px-2 py-0.5 rounded font-bold text-blue-700 font-sans">
                                            {insights.doublingYears} years
                                        </span>{' '}
                                        (using the Rule of 72)
                                    </span>
                                </li>
                            </ul>
                        </div>

                        <div className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div className="p-4 bg-yellow-50 border border-yellow-200 rounded-xl">
                                <p className="text-[11px] sm:text-xs text-yellow-800 leading-relaxed">
                                    <span className="font-bold">💡 Investment Tip:</span> Senior citizens (above 60 years) typically get 0.5% higher FD rates.
                                    Consider splitting large FDs into smaller ones to maintain liquidity and avoid breaking the entire FD for partial withdrawals.
                                </p>
                            </div>
                            <div className="p-4 bg-gray-50 border border-gray-200 rounded-xl">
                                <p className="text-[11px] sm:text-xs text-slate-600 leading-relaxed">
                                    <span className="font-bold">📋 Note:</span> FD interest is fully taxable. TDS is deducted at 10% if interest exceeds ₹40,000
                                    (₹50,000 for senior citizens). Interest rates vary between banks and change periodically.
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
