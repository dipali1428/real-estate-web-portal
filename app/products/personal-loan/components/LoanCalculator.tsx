"use client";

import { useState, useEffect, useRef, useCallback, useMemo } from 'react';
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

interface LoanCalculationResult {
    paymentAmount: number;
    totalInterest: number;
    totalPayment: number;
    effectiveAnnualRate: number;
    fullSchedule: PaymentScheduleEntry[];
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

    // Chart reference
    const chartRef = useRef<Chart<'doughnut'> | null>(null);
    const canvasRef = useRef<HTMLCanvasElement>(null);

    // Pure schedule generation function (no need for useCallback as it has no dependencies)
    const generateSchedule = (
        initialLoanAmount: number,
        monthlyPayment: number,
        annualRateDecimal: number,
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
                    interestPayment = balance * (Math.exp(annualRateDecimal * (totalPayments / 12)) - 1);
                    principalPayment = initialLoanAmount;
                    balance = 0;
                } else {
                    break;
                }
            } else {
                const periodicInterestRate = annualRateDecimal / paymentsPerYear;
                interestPayment = balance * periodicInterestRate;
                principalPayment = monthlyPayment - interestPayment;

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

    // Pure calculation function
    const calculateLoanDetails = useCallback((
        amount: number,
        rate: number,
        termMonths: number,
        frequency: PaymentFrequency
    ): LoanCalculationResult => {
        // Validate inputs
        if (amount < 10000 || rate < 0.1 || termMonths < 1) {
            return {
                paymentAmount: 0,
                totalInterest: 0,
                totalPayment: 0,
                effectiveAnnualRate: 0,
                fullSchedule: []
            };
        }

        const paymentsPerYear = frequencyMap[frequency];
        const annualRateDecimal = rate / 100;
        const loanTermYears = termMonths / 12;

        let paymentAmount: number;
        let totalPayment: number;
        let totalInterest: number;
        let effectiveAnnualRate: number;
        let totalPayments: number;

        if (frequency === 'continuous') {
            totalPayment = amount * Math.exp(annualRateDecimal * loanTermYears);
            totalInterest = totalPayment - amount;
            paymentAmount = totalPayment;
            effectiveAnnualRate = (Math.exp(annualRateDecimal) - 1) * 100;
            totalPayments = 1;
        } else {
            totalPayments = Math.ceil(loanTermYears * paymentsPerYear);
            const periodicInterestRate = annualRateDecimal / paymentsPerYear;

            if (periodicInterestRate === 0) {
                paymentAmount = amount / totalPayments;
            } else {
                const rateFactor = Math.pow(1 + periodicInterestRate, totalPayments);
                paymentAmount = (amount * periodicInterestRate * rateFactor) / (rateFactor - 1);
            }

            totalPayment = paymentAmount * totalPayments;
            totalInterest = totalPayment - amount;
            effectiveAnnualRate = (Math.pow(1 + periodicInterestRate, paymentsPerYear) - 1) * 100;
        }

        // Generate amortization schedule
        const fullSchedule = generateSchedule(
            amount,
            paymentAmount,
            annualRateDecimal,
            totalPayments,
            paymentsPerYear,
            frequency
        );

        return {
            paymentAmount,
            totalInterest,
            totalPayment,
            effectiveAnnualRate,
            fullSchedule
        };
    }, []);

    // Calculate all derived values during rendering
    const calculationResult = useMemo(
        () => calculateLoanDetails(loanAmount, annualInterestRate, loanTermMonths, paymentFrequency),
        [loanAmount, annualInterestRate, loanTermMonths, paymentFrequency, calculateLoanDetails]
    );

    const { paymentAmount, totalInterest, totalPayment, effectiveAnnualRate, fullSchedule } = calculationResult;

    // Get paginated schedule (derived during rendering)
    const paginatedSchedule = useMemo(() => {
        if (fullSchedule.length === 0) return [];
        const startIndex = (currentPage - 1) * itemsPerPage;
        const endIndex = startIndex + itemsPerPage;
        return fullSchedule.slice(startIndex, endIndex);
    }, [fullSchedule, currentPage, itemsPerPage]);

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

    const calculateTotalPayments = useCallback(() => {
        if (paymentFrequency === 'continuous') return 1;
        const paymentsPerYear = frequencyMap[paymentFrequency];
        const loanTermYears = loanTermMonths / 12;
        return Math.ceil(loanTermYears * paymentsPerYear);
    }, [paymentFrequency, loanTermMonths]);

    // Initialize chart (only runs once)
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
                            legend: { position: 'bottom' as const },
                            tooltip: {
                                callbacks: {
                                    label: (context) => {
                                        const label = context.label || '';
                                        const value = context.parsed;
                                        return `${label}: ${formatCurrency(value)}`;
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
    }, []); // Empty dependency array - only run once

    // Update chart when data changes (synchronizing with external system)
    useEffect(() => {
        if (chartRef.current && loanAmount > 0 && totalInterest > 0) {
            chartRef.current.data.datasets[0].data = [loanAmount, totalInterest];
            chartRef.current.update();
        }
    }, [loanAmount, totalInterest]);

    // Track previous calculation to reset page when it changes (no Effect needed!)
    const [prevCalculation, setPrevCalculation] = useState(calculationResult);
    
    // Reset to first page during render if calculation changed
    if (calculationResult !== prevCalculation) {
        setPrevCalculation(calculationResult);
        setCurrentPage(1);
    }

    // Pagination controls
    const totalPages = Math.ceil(fullSchedule.length / itemsPerPage);

    const handlePageChange = useCallback((newPage: number) => {
        if (newPage >= 1 && newPage <= totalPages) {
            setCurrentPage(newPage);
        }
    }, [totalPages]);

    const handleLoanAmountChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
        setLoanAmount(Number(e.target.value));
    }, []);

    const handleInterestRateChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
        setAnnualInterestRate(Number(e.target.value));
    }, []);

    const handleTenureChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
        setLoanTermMonths(Number(e.target.value));
    }, []);

    const handleInputChange = useCallback((field: string, value: string) => {
        if (value === '') {
            switch (field) {
                case 'loanAmount': setLoanAmount(0); break;
                case 'annualInterestRate': setAnnualInterestRate(0); break;
                case 'loanTermMonths': setLoanTermMonths(0); break;
            }
            return;
        }
        const cleanValue = value.replace(/[^\d.]/g, '');
        const numValue = parseFloat(cleanValue);
        if (!isNaN(numValue)) {
            switch (field) {
                case 'loanAmount': setLoanAmount(numValue); break;
                case 'annualInterestRate': setAnnualInterestRate(numValue); break;
                case 'loanTermMonths': setLoanTermMonths(numValue); break;
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

    const handleWheel = useCallback((e: React.WheelEvent<HTMLInputElement>) => {
        e.currentTarget.blur();
    }, []);

    const handleNumberInputWheel = useCallback((e: React.WheelEvent<HTMLInputElement>) => {
        e.currentTarget.blur();
        e.stopPropagation();
    }, []);

    const getLoanAmountDisplayValue = useCallback(() => {
        return loanAmount === 0 ? '' : loanAmount.toString();
    }, [loanAmount]);

    const getInterestRateDisplayValue = useCallback(() => {
        return annualInterestRate === 0 ? '' : annualInterestRate.toString();
    }, [annualInterestRate]);

    const getTenureDisplayValue = useCallback(() => {
        return loanTermMonths === 0 ? '' : loanTermMonths.toString();
    }, [loanTermMonths]);

    return (
        <div className="min-h-screen bg-gray-50 font-sans" style={{ fontFamily: 'var(--font-geist-sans)' }}>
            {/* Loan Calculator */}
            <div className="container mx-auto px-4 py-8">
                <div className="bg-white rounded-2xl shadow-xl overflow-hidden max-w-6xl mx-auto">
                    <div className="bg-linear-to-r from-[#2076C7] to-[#1CADA3] text-white py-6 px-8 text-center">
                        <h1 className="text-3xl font-bold mb-2">Personal Loan Calculator</h1>
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
                                <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                                    {frequencyOptions.map((option) => (
                                        <button
                                            key={option.value}
                                            type="button"
                                            onClick={() => setPaymentFrequency(option.value)}
                                            className={`py-3 px-4 rounded-lg border transition-all flex flex-col items-center justify-center text-center ${paymentFrequency === option.value ? 'border-[#1CADA3] bg-teal-50 text-[#1CADA3]' : 'border-gray-300 hover:border-gray-400 text-gray-700'}`}
                                        >
                                            <div className="font-semibold text-sm md:text-base leading-tight">{option.label.split('(')[0].trim()}</div>
                                            {option.label.includes('(') && (
                                                <div className="text-[10px] md:text-xs mt-1 opacity-75">
                                                    {option.label.split('(')[1].replace(')', '').trim()}
                                                </div>
                                            )}
                                        </button>
                                    ))}
                                </div>
                            </div>
                        </div>

                        {/* Visualization Section */}
                        <div className="flex-1 min-w-0 lg:pl-8 mt-8 lg:mt-0">
                            <div className="chart-container h-64 mb-6">
                                <canvas ref={canvasRef}></canvas>
                            </div>

                            {/* Results Section */}
                            <div className="bg-[#f8fcff] p-6 rounded-xl shadow-sm border-l-4 border-[#1CADA3] mb-6">
                                <div className="text-center mb-6">
                                    <div className="text-sm text-[#2076C7] font-medium mb-1">Monthly Payment (EMI)</div>
                                    <div className="text-3xl font-bold text-[#1CADA3] font-sans">
                                        {paymentAmount > 0 ? formatCurrency(paymentAmount) : '₹0'}
                                    </div>
                                </div>
                                <div className="flex justify-between divide-x divide-teal-100">
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

                    {/* KEY INSIGHTS Section */}
                    <div className="bg-gray-50/50 border-t border-gray-100 p-6 lg:p-10 font-sans">
                        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-10">
                            <div className="flex items-center gap-2">
                                <h2 className="text-2xl font-bold text-gray-800">Key Insights</h2>
                            </div>
                            <div className="flex-1 max-w-3xl grid grid-cols-1 md:grid-cols-2 gap-4">
                                <div className="bg-white p-4 rounded-xl border border-teal-100 shadow-sm flex items-start gap-3">
                                    <div className="mt-1.5 w-1.5 h-1.5 rounded-full bg-[#1CADA3] shrink-0"></div>
                                    <p className="text-sm text-gray-700 leading-tight font-semibold">
                                        Monthly EMI of{' '}
                                        <span className="text-[#2076C7] font-extrabold mx-1">
                                            {paymentAmount > 0 ? formatCurrency(paymentAmount) : '₹0'}
                                        </span>{' '}
                                        for {loanTermMonths > 0 ? formatLoanTerm(loanTermMonths) : '0 months'}
                                    </p>
                                </div>
                                <div className="bg-white p-4 rounded-xl border border-teal-100 shadow-sm flex items-start gap-3">
                                    <div className="mt-1.5 w-1.5 h-1.5 rounded-full bg-[#1CADA3] shrink-0"></div>
                                    <p className="text-sm text-gray-700 leading-tight font-semibold">
                                        Total Interest is{' '}
                                        <span className="text-[#2076C7] font-extrabold mx-1">
                                            {loanAmount > 0 ? ((totalInterest / loanAmount) * 100).toFixed(1) : '0'}%
                                        </span>{' '}
                                        ({totalInterest > 0 ? formatCurrency(totalInterest) : '₹0'})
                                    </p>
                                </div>
                            </div>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-6">
                            <div className="flex items-start gap-3">
                                <div className="mt-1.5 w-1.5 h-1.5 rounded-full bg-blue-400 shrink-0"></div>
                                <p className="text-gray-700 leading-relaxed font-semibold">
                                    For every ₹100 you repay,{' '}
                                    <span className="text-[#2076C7] font-extrabold mx-1">
                                        ₹{totalPayment > 0 ? ((totalInterest / totalPayment) * 100).toFixed(0) : '0'}
                                    </span>{' '}
                                    goes towards interest
                                </p>
                            </div>

                            {loanTermMonths > 0 && loanAmount > 0 && annualInterestRate > 0 && (() => {
                                const extendedTenure = loanTermMonths + 12;
                                const extendedPayments = Math.ceil(extendedTenure / 12 * frequencyMap[paymentFrequency]);
                                const periodicInterestRate = (annualInterestRate / 100) / frequencyMap[paymentFrequency];
                                const rateFactor = Math.pow(1 + periodicInterestRate, extendedPayments);
                                const extendedEMI = (loanAmount * periodicInterestRate * rateFactor) / (rateFactor - 1);
                                const emiReduction = paymentAmount - extendedEMI;
                                if (emiReduction > 0) {
                                    return (
                                        <div className="flex items-start gap-3">
                                            <div className="mt-1.5 w-1.5 h-1.5 rounded-full bg-blue-400 shrink-0"></div>
                                            <p className="text-gray-700 leading-relaxed font-semibold">
                                                Extending tenure by 1 yr reduces EMI by{' '}
                                                <span className="text-[#2076C7] font-extrabold mx-1">
                                                    {formatCurrency(emiReduction)}
                                                </span>
                                            </p>
                                        </div>
                                    );
                                }
                                return null;
                            })()}

                            {annualInterestRate > 1 && loanAmount > 0 && loanTermMonths > 0 && (() => {
                                const lowerRate = annualInterestRate - 1;
                                if (lowerRate > 0) {
                                    const periodicInterestRate = (lowerRate / 100) / frequencyMap[paymentFrequency];
                                    const totalPaymentsCount = calculateTotalPayments();
                                    const rateFactor = Math.pow(1 + periodicInterestRate, totalPaymentsCount);
                                    const lowerEMI = (loanAmount * periodicInterestRate * rateFactor) / (rateFactor - 1);
                                    const totalSavings = (paymentAmount - lowerEMI) * totalPaymentsCount;
                                    return (
                                        <div className="flex items-start gap-3">
                                            <div className="mt-1.5 w-1.5 h-1.5 rounded-full bg-blue-400 shrink-0"></div>
                                            <p className="text-gray-700 leading-relaxed font-semibold">
                                                A 1% lower rate would save you{' '}
                                                <span className="text-[#2076C7] font-extrabold mx-1">
                                                    {formatCurrency(totalSavings)}
                                                </span>
                                            </p>
                                        </div>
                                    );
                                }
                                return null;
                            })()}

                            {totalInterest > 0 && (() => {
                                const earlyRepaymentSavings = totalInterest * 0.2;
                                return (
                                    <div className="flex items-start gap-3">
                                        <div className="mt-1.5 w-1.5 h-1.5 rounded-full bg-blue-400 shrink-0"></div>
                                        <p className="text-gray-700 leading-relaxed font-semibold">
                                            Early repayment could save approximately{' '}
                                            <span className="text-[#2076C7] font-extrabold mx-1">
                                                {formatCurrency(earlyRepaymentSavings)}
                                            </span>
                                        </p>
                                    </div>
                                );
                            })()}

                            <div className="flex items-start gap-3">
                                <div className="mt-1.5 w-1.5 h-1.5 rounded-full bg-blue-400 shrink-0"></div>
                                <p className="text-gray-700 leading-relaxed font-semibold">
                                    Effective annual rate is{' '}
                                    <span className="text-[#2076C7] font-extrabold mx-1">
                                        {effectiveAnnualRate > 0 ? effectiveAnnualRate.toFixed(2) : '0.00'}%
                                    </span>
                                </p>
                            </div>

                            <div className="flex items-start gap-3">
                                <div className="mt-1.5 w-1.5 h-1.5 rounded-full bg-blue-400 shrink-0"></div>
                                <p className="text-gray-700 leading-relaxed font-semibold">
                                    Personal loans are unsecured with no collateral required
                                </p>
                            </div>
                        </div>

                        <div className="mt-10 p-5 bg-teal-50 border border-teal-100 rounded-2xl flex items-start gap-4">
                            <div className="w-10 h-10 bg-[#1CADA3]/10 rounded-full flex items-center justify-center text-[#1CADA3] shrink-0">
                                <i className="fas fa-info-circle"></i>
                            </div>
                            <p className="text-sm text-gray-700 leading-relaxed">
                                <strong className="text-[#1CADA3]">Pro Tip for Personal Loans:</strong> Early repayments can save significant interest costs. Even a single extra EMI payment can make a noticeable difference.
                            </p>
                        </div>

                        <p className="text-xs text-gray-400 mt-6 text-center italic">
                            *Note: Processing fees (1-3%) and other charges may apply. Actual terms vary by lender.
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
}