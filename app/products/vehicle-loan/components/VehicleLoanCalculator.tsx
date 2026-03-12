"use client";

import { useState, useEffect, useRef, useMemo, useCallback } from 'react';
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
    { value: 'monthly', label: 'Monthly' },
    { value: 'bimonthly', label: 'Bi-Monthly (Every 2 months)' },
    { value: 'quarterly', label: 'Quarterly' },
    { value: 'semiannually', label: 'Semi-Annually' },
    { value: 'annually', label: 'Annually' },
    { value: 'continuous', label: 'Continuously' },
];

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

const formatCurrency = (value: number): string => {
    if (isNaN(value) || value === 0) return '₹0';
    return '₹' + value.toFixed(0).replace(/\B(?=(\d{3})+(?!\d))/g, ",");
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

export default function VehicleLoanCalculator() {
    // Defaults targeted for Vehicle Loans
    const [loanAmount, setLoanAmount] = useState<number>(800000);
    const [annualInterestRate, setAnnualInterestRate] = useState<number>(8.5);
    const [loanTermMonths, setLoanTermMonths] = useState<number>(60);
    const [paymentFrequency, setPaymentFrequency] = useState<PaymentFrequency>('monthly');

    const chartRef = useRef<Chart<'doughnut'> | null>(null);
    const canvasRef = useRef<HTMLCanvasElement>(null);

    const calculateTotalPayments = useCallback(() => {
        if (paymentFrequency === 'continuous') return 1;
        const paymentsPerYear = frequencyMap[paymentFrequency];
        const loanTermYears = loanTermMonths / 12;
        return Math.ceil(loanTermYears * paymentsPerYear);
    }, [paymentFrequency, loanTermMonths]);

    const loanResults = useMemo(() => {
        if (!loanAmount || loanAmount < 10000) {
            return {
                paymentAmount: 0,
                totalInterest: 0,
                totalPayment: 0,
                effectiveAnnualRate: 0,
                totalPayments: 0,
                fullSchedule: []
            };
        }

        const annualRateDecimal = annualInterestRate / 100;
        const loanTermYears = loanTermMonths / 12;
        const paymentsPerYear = frequencyMap[paymentFrequency];

        let calculatedPaymentAmount: number;
        let calculatedTotalPayment: number;
        let calculatedTotalInterest: number;
        let calculatedEffectiveAnnualRate: number;
        let totalPayments: number;

        if (paymentFrequency === 'continuous') {
            calculatedTotalPayment = loanAmount * Math.exp(annualRateDecimal * loanTermYears);
            calculatedTotalInterest = calculatedTotalPayment - loanAmount;
            calculatedPaymentAmount = calculatedTotalPayment;
            calculatedEffectiveAnnualRate = (Math.exp(annualRateDecimal) - 1) * 100;
            totalPayments = 1;
        } else {
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

        const fullSchedule = generateFullAmortizationSchedule(
            loanAmount,
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
            totalPayments,
            fullSchedule
        };
    }, [loanAmount, annualInterestRate, loanTermMonths, paymentFrequency]);

    const { paymentAmount, totalInterest, totalPayment, effectiveAnnualRate } = loanResults;

    // Calculate slider background gradient
    const getSliderBackground = (value: number, min: number, max: number) => {
        const percentage = ((value - min) / (max - min)) * 100;
        return `linear-gradient(to right, #1CADA3 0%, #1CADA3 ${percentage}%, #e5e7eb ${percentage}%, #e5e7eb 100%)`;
    };

    useEffect(() => {
        if (canvasRef.current && !chartRef.current) {
            const ctx = canvasRef.current.getContext('2d');
            if (ctx) {
                chartRef.current = new Chart(ctx, {
                    type: 'doughnut',
                    data: {
                        labels: ['Loan Amount', 'Total Interest'],
                        datasets: [{
                            data: [loanAmount, totalInterest > 0 ? totalInterest : loanAmount * 0.3],
                            backgroundColor: ['#1CADA3', '#E5E7EB'],
                            hoverBackgroundColor: ['#17b8ae', '#d1d5db'],
                            borderWidth: 0
                        }]
                    },
                    options: {
                        responsive: true,
                        maintainAspectRatio: false,
                        cutout: '78%',
                        plugins: {
                            legend: {
                                display: false
                            },
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
        }

        return () => {
            if (chartRef.current) {
                chartRef.current.destroy();
                chartRef.current = null;
            }
        };
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    useEffect(() => {
        if (chartRef.current) {
            chartRef.current.data.datasets[0].data = [loanAmount, totalInterest > 0 ? totalInterest : 0];
            chartRef.current.update('active');
        }
    }, [loanAmount, totalInterest]);

    const handleLoanAmountChange = (e: React.ChangeEvent<HTMLInputElement>) => setLoanAmount(Number(e.target.value));
    const handleInterestRateChange = (e: React.ChangeEvent<HTMLInputElement>) => setAnnualInterestRate(Number(e.target.value));
    const handleTenureChange = (e: React.ChangeEvent<HTMLInputElement>) => setLoanTermMonths(Number(e.target.value));

    const handleInputChange = (field: string, value: string) => {
        if (value === '') {
            if (field === 'loanAmount') setLoanAmount(0);
            if (field === 'annualInterestRate') setAnnualInterestRate(0);
            if (field === 'loanTermMonths') setLoanTermMonths(0);
            return;
        }

        const cleanValue = value.replace(/[^\d.]/g, '');
        const parts = cleanValue.split('.');
        if (parts.length > 2) return;

        const numValue = parseFloat(cleanValue);
        if (!isNaN(numValue)) {
            if (field === 'loanAmount') setLoanAmount(numValue);
            if (field === 'annualInterestRate') setAnnualInterestRate(numValue);
            if (field === 'loanTermMonths') setLoanTermMonths(numValue);
        }
    };

    const handleLoanAmountInputChange = (e: React.ChangeEvent<HTMLInputElement>) => handleInputChange('loanAmount', e.target.value);
    const handleInterestRateInputChange = (e: React.ChangeEvent<HTMLInputElement>) => handleInputChange('annualInterestRate', e.target.value);
    const handleTenureInputChange = (e: React.ChangeEvent<HTMLInputElement>) => handleInputChange('loanTermMonths', e.target.value);

    const getLoanAmountDisplayValue = () => loanAmount === 0 ? '' : loanAmount.toString();
    const getInterestRateDisplayValue = () => annualInterestRate === 0 ? '' : annualInterestRate.toString();
    const getTenureDisplayValue = () => loanTermMonths === 0 ? '' : loanTermMonths.toString();

    const handleWheel = (e: React.WheelEvent<HTMLInputElement>) => e.currentTarget.blur();
    const handleNumberInputWheel = (e: React.WheelEvent<HTMLInputElement>) => {
        e.currentTarget.blur();
        e.stopPropagation();
    };

    return (
        <section className="py-16 md:py-20 bg-white relative overflow-hidden" id="calculator">
            <div className="container mx-auto px-4">
                <div className="max-w-3xl mx-auto text-center mb-10 px-4">
                    <h2 className="text-3xl md:text-4xl font-extrabold mb-3 bg-linear-to-r from-[#2076C7] to-[#1CADA3] bg-clip-text text-transparent drop-shadow-sm">
                        Vehicle Loan EMI Calculator
                    </h2>
                    <p className="text-lg text-gray-500 font-medium">
                        Plan your dream vehicle purchase accurately. See how your EMI changes with different loan amounts, interest rates, and tenures.
                    </p>
                </div>

                <div className="bg-white rounded-2xl shadow-xl overflow-hidden max-w-6xl mx-auto">
                    <div className="bg-linear-to-r from-[#2076C7] to-[#1CADA3] text-white py-4 px-4 sm:px-8 text-center">
                        <h1 className="text-xl sm:text-2xl md:text-3xl font-bold mb-1 sm:mb-2">Vehicle Loan Calculator</h1>
                        <p className="text-blue-100 text-sm sm:text-base">Calculate your Loan EMI and Payment Schedule</p>
                    </div>

                    <div className="flex flex-col lg:flex-row p-4 lg:p-5 font-sans">
                        {/* Input Section */}
                        <div className="flex-1 min-w-0 lg:pr-8 lg:border-r border-gray-200">

                            {/* Loan Amount */}
                            <div className="mb-2">
                                <label htmlFor="loanAmount" className="block text-[#2076C7] font-semibold mb-1">
                                    Loan Amount (₹)
                                </label>
                                <div className="slider-container mb-2">
                                    <input
                                        type="range"
                                        id="loanAmount"
                                        min="10000"
                                        max="5000000"
                                        step="10000"
                                        value={loanAmount}
                                        onChange={handleLoanAmountChange}
                                        className="w-full h-2 rounded-lg cursor-pointer slider accent-teal-600 appearance-none"
                                        style={{
                                            background: getSliderBackground(loanAmount, 10000, 5000000)
                                        }}
                                    />
                                    <div className="flex justify-between text-sm text-gray-600 mt-1">
                                        <span>₹10,000</span>
                                        <span>₹50,00,000</span>
                                    </div>
                                </div>
                                <div className="relative">
                                    <input
                                        type="text"
                                        id="loanAmountInput"
                                        value={getLoanAmountDisplayValue()}
                                        onChange={handleLoanAmountInputChange}
                                        onWheel={handleWheel}
                                        className="w-full px-4 py-2 border border-gray-300 rounded focus:outline-none focus:border-[#1CADA3] bg-gray-100 focus:bg-white focus:ring-0 transition-colors pr-12 text-gray-800 placeholder:text-gray-400"
                                        placeholder="Enter loan amount"
                                    />
                                    <span className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-600 font-medium">₹</span>
                                </div>
                            </div>

                            {/* Interest Rate */}
                            <div className="mb-2">
                                <label htmlFor="interestRate" className="block text-[#2076C7] font-semibold mb-1">
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
                                        className="w-full h-2 rounded-lg cursor-pointer slider accent-teal-600 appearance-none"
                                        style={{
                                            background: getSliderBackground(annualInterestRate, 0.1, 30)
                                        }}
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
                                        className="w-full px-4 py-2 border border-gray-300 rounded focus:outline-none focus:border-[#1CADA3] bg-gray-100 focus:bg-white focus:ring-0 transition-colors pr-12 text-gray-800"
                                    />
                                    <span className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-600 font-medium">%</span>
                                </div>
                            </div>

                            {/* Loan Tenure */}
                            <div className="mb-2">
                                <label htmlFor="loanTerm" className="block text-[#2076C7] font-semibold mb-1">
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
                                        className="w-full h-2 rounded-lg cursor-pointer slider accent-teal-600 appearance-none"
                                        style={{
                                            background: getSliderBackground(loanTermMonths, 1, 120)
                                        }}
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
                                        className="w-full px-4 py-3 border border-gray-300 rounded focus:outline-none focus:border-[#1CADA3] bg-gray-100 focus:bg-white focus:ring-0 transition-colors pr-24 text-gray-800"
                                    />
                                    <span className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-600 font-medium">
                                        Months
                                    </span>
                                </div>
                            </div>

                            {/* Payment Frequency */}
                            <div className="mb-4">
                                <label className="block text-[#2076C7] font-semibold mb-1">
                                    Payment Frequency
                                </label>
                                <div className="grid grid-cols-2 sm:grid-cols-3 gap-2 sm:gap-3">
                                    {frequencyOptions.slice(0, 3).map((option) => (
                                        <button
                                            key={option.value}
                                            type="button"
                                            onClick={() => setPaymentFrequency(option.value)}
                                            className={`py-1 px-4 rounded-lg border transition-all ${paymentFrequency === option.value ? 'border-[#1CADA3] bg-teal-50 text-[#1CADA3]' : 'border-gray-300 hover:border-gray-400 text-gray-700'}`}
                                        >
                                            <div className="text-[13px] font-semibold">{option.label.split('(')[0]}</div>
                                            <div className="text-[10px] mt-0.5 opacity-75">
                                                {option.label.includes('(') ? option.label.split('(')[1].replace(')', '') : ''}
                                            </div>
                                        </button>
                                    ))}
                                </div>
                                <div className="grid grid-cols-2 sm:grid-cols-3 gap-2 sm:gap-3 mt-2">
                                    {frequencyOptions.slice(3, 6).map((option) => (
                                        <button
                                            key={option.value}
                                            type="button"
                                            onClick={() => setPaymentFrequency(option.value)}
                                            className={`py-1 px-4 rounded-lg border transition-all ${paymentFrequency === option.value ? 'border-[#1CADA3] bg-teal-50 text-[#1CADA3]' : 'border-gray-300 hover:border-gray-400 text-gray-700'}`}
                                        >
                                            <div className="text-[13px] font-semibold">{option.label.split('(')[0]}</div>
                                            <div className="text-[10px] mt-0.5 opacity-75">
                                                {option.label.includes('(') ? option.label.split('(')[1].replace(')', '') : ''}
                                            </div>
                                        </button>
                                    ))}
                                </div>
                                <div className="grid grid-cols-2 sm:grid-cols-3 gap-2 sm:gap-3 mt-2">
                                    {frequencyOptions.slice(6).map((option) => (
                                        <button
                                            key={option.value}
                                            type="button"
                                            onClick={() => setPaymentFrequency(option.value)}
                                            className={`py-1 px-4 rounded-lg border transition-all ${paymentFrequency === option.value ? 'border-[#1CADA3] bg-teal-50 text-[#1CADA3]' : 'border-gray-300 hover:border-gray-400 text-gray-700'}`}
                                        >
                                            <div className="text-[13px] font-semibold">{option.label.split('(')[0]}</div>
                                            <div className="text-[10px] mt-0.5 opacity-75">
                                                {option.label.includes('(') ? option.label.split('(')[1].replace(')', '') : ''}
                                            </div>
                                        </button>
                                    ))}
                                </div>
                            </div>
                        </div>

                        {/* Visualization Section */}
                        <div className="flex-1 min-w-0 lg:pl-8 mt-8 lg:mt-0">
                            <div className="chart-container h-44 sm:h-56 mb-4 sm:mb-6 relative flex items-center justify-center">
                                <canvas ref={canvasRef}></canvas>
                                <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none">
                                    <div className="text-[10px] sm:text-xs font-bold text-gray-400 uppercase tracking-wider mb-0.5">
                                        ESTIMATED EMI
                                    </div>
                                    <div className="text-xl sm:text-3xl font-extrabold text-[#009B91] font-sans">
                                        {paymentAmount > 0 ? formatCurrency(paymentAmount) : '₹0'}
                                    </div>
                                </div>
                            </div>

                            <div className="flex justify-center gap-8 mb-6">
                                <div className="flex items-center gap-2">
                                    <div className="w-4 h-4 rounded-full bg-[#1CADA3]"></div>
                                    <span className="text-sm font-bold text-gray-700">Loan Amount</span>
                                </div>
                                <div className="flex items-center gap-2">
                                    <div className="w-4 h-4 rounded-full bg-[#E5E7EB]"></div>
                                    <span className="text-sm font-bold text-gray-700">Total Interest</span>
                                </div>
                            </div>

                            <div className="bg-gray-50 p-6 rounded-xl shadow-sm border-l-4 border-[#2076C7]">
                                <h5 className="font-semibold mb-4 text-lg bg-linear-to-r from-[#2076C7] to-[#1CADA3] bg-clip-text text-transparent">Loan Summary</h5>
                                <div className="space-y-1.5">
                                    <div className="flex justify-between pb-1 border-b border-gray-200">
                                        <span className="text-gray-600 text-sm">Loan Amount</span>
                                        <span className="font-medium font-sans text-sm text-[#1CADA3]">
                                            {loanAmount > 0 ? formatCurrency(loanAmount) : '₹0'}
                                        </span>
                                    </div>
                                    <div className="flex justify-between pb-1 border-b border-gray-200">
                                        <span className="text-gray-600 text-sm">Interest Rate</span>
                                        <span className="font-medium font-sans text-sm text-[#1CADA3]">
                                            {annualInterestRate > 0 ? `${annualInterestRate}%` : '0%'}
                                        </span>
                                    </div>
                                    <div className="flex justify-between pb-1 border-b border-gray-200">
                                        <span className="text-gray-600 text-sm">Loan Tenure</span>
                                        <span className="font-medium font-sans text-sm text-[#1CADA3]">
                                            {loanTermMonths > 0 ? formatLoanTerm(loanTermMonths) : '0'}
                                        </span>
                                    </div>
                                    <div className="flex justify-between pb-1 border-b border-gray-200">
                                        <span className="text-gray-600 text-sm">Payment Frequency</span>
                                        <span className="font-medium font-sans text-sm text-[#1CADA3] capitalize">
                                            {paymentFrequency}
                                        </span>
                                    </div>
                                    <div className="flex justify-between pb-1 border-b border-gray-200">
                                        <span className="text-gray-600 text-sm">Total Payments</span>
                                        <span className="font-medium font-sans text-sm text-[#1CADA3]">
                                            {calculateTotalPayments()}
                                        </span>
                                    </div>
                                    <div className="flex justify-between pb-1 border-b border-gray-200 text-sm">
                                        <span className="text-gray-600">Effective Annual Rate</span>
                                        <span className="font-medium font-sans text-[#1CADA3]">
                                            {effectiveAnnualRate > 0 ? `${effectiveAnnualRate.toFixed(2)}%` : '0%'}
                                        </span>
                                    </div>
                                    <div className="flex justify-between pt-2">
                                        <span className="text-gray-600 font-semibold text-sm">Total Interest</span>
                                        <span className="font-bold font-sans text-sm text-[#1CADA3]">
                                            {totalInterest > 0 ? formatCurrency(totalInterest) : '₹0'}
                                        </span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Insights Section Integrated */}
                    <div className="border-t border-gray-100 p-5 lg:p-6 bg-gray-50/30">
                        <h2 className="text-xl font-bold mb-2 flex items-center gap-2 bg-linear-to-r from-[#2076C7] to-[#1CADA3] bg-clip-text text-transparent">
                            <span className="text-yellow-500">
                                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                                    <path d="M11 3a1 1 0 10-2 0v1a1 1 0 102 0V3zM15.657 5.757a1 1 0 00-1.414-1.414l-.707.707a1 1 0 001.414 1.414l.707-.707zM18 10a1 1 0 01-1 1h-1a1 1 0 110-2h1a1 1 0 011 1zM5.05 6.464A1 1 0 106.464 5.05l-.707-.707a1 1 0 00-1.414 1.414l.707.707zM5 10a1 1 0 01-1 1H3a1 1 0 110-2h1a1 1 0 011 1zM8 16v-1h4v1a2 2 0 11-4 0zM12 14c.015-.34.208-.646.477-.859a4 4 0 10-4.954 0c.27.213.462.519.477.859h4z" />
                                </svg>
                            </span>
                            Key Insights
                        </h2>

                        <div className="text-sm text-gray-700 leading-relaxed">
                            <ul className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-2 list-disc pl-5 mb-4">
                                <li>
                                    Your vehicle EMI will be{' '}
                                    <span className="bg-blue-50 px-2 py-1 rounded font-medium font-sans">
                                        {paymentAmount > 0 ? formatCurrency(paymentAmount) : '₹0'}
                                    </span>{' '}
                                    for {loanTermMonths > 0 ? formatLoanTerm(loanTermMonths) : '0 months'}
                                </li>

                                <li>
                                    Interest constitutes{' '}
                                    <span className="bg-blue-50 px-2 py-1 rounded font-medium font-sans">
                                        {loanAmount > 0 && totalPayment > 0 ? ((totalInterest / totalPayment) * 100).toFixed(1) : '0'}%
                                    </span>{' '}
                                    of your total repayment amount
                                </li>

                                <li>
                                    By paying an extra{' '}
                                    <span className="bg-blue-50 px-2 py-1 rounded font-medium font-sans">
                                        {formatCurrency(paymentAmount * 0.1)}
                                    </span>{' '}
                                    per month, you could own your vehicle{' '}
                                    <span className="bg-blue-50 px-2 py-1 rounded font-medium font-sans">
                                        {Math.floor(loanTermMonths * 0.15)} months earlier
                                    </span>
                                </li>

                                <li>
                                    Effective annual borrowing cost is{' '}
                                    <span className="bg-blue-50 px-2 py-1 rounded font-medium font-sans">
                                        {effectiveAnnualRate > 0 ? effectiveAnnualRate.toFixed(2) : '0.00'}%
                                    </span>{' '}
                                    (considers {paymentFrequency} compounding)
                                </li>
                            </ul>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-3">
                                <div className="p-4 bg-yellow-50 border border-yellow-200 rounded-xl">
                                    <p className="text-sm text-yellow-800">
                                        <strong className="block mb-1 bg-linear-to-r from-[#2076C7] to-[#1CADA3] bg-clip-text text-transparent">💡 CIBIL Score Tip:</strong>
                                        A score above 750 can help you negotiate the interest rate down by 0.5%–1%, saving roughly{' '}
                                        <span className="font-semibold">{formatCurrency(totalInterest * 0.1)}</span> over the loan tenure.
                                    </p>
                                </div>

                                <div className="p-4 bg-blue-50/50 border border-blue-100 rounded-xl">
                                    <p className="text-sm text-gray-600">
                                        <strong className="block mb-1 bg-linear-to-r from-[#2076C7] to-[#1CADA3] bg-clip-text text-transparent">Note for EV Buyers:</strong>
                                        If this is for an Electric Vehicle, you may be eligible for tax deductions under Section 80EEB up to ₹1.5 Lakhs annually.
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}
