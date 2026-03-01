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

    useEffect(() => {
        if (chartRef.current) {
            chartRef.current.data.datasets[0].data = [loanAmount, totalInterest];
            chartRef.current.update('none');
        }
    }, [loanAmount, totalInterest]);

    useEffect(() => {
        if (canvasRef.current && !chartRef.current) {
            const ctx = canvasRef.current.getContext('2d');
            if (ctx) {
                chartRef.current = new Chart(ctx, {
                    type: 'doughnut',
                    data: {
                        labels: ['Principal Amount', 'Total Interest'],
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
                                position: 'bottom' as const,
                                labels: { font: { family: "'Inter', sans-serif" } }
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
    }, []);

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
        <section className="py-24 bg-gray-50 relative overflow-hidden" id="calculator">
            <div className="container mx-auto px-4">
                <div className="max-w-3xl mx-auto text-center mb-16 px-4">
                    <h2 className="text-3xl md:text-5xl font-bold mb-6 tracking-tight bg-clip-text text-transparent bg-linear-to-r from-[#2076C7] to-[#1CADA3]">
                        Vehicle Loan EMI Calculator
                    </h2>
                    <p className="text-lg text-gray-500 font-medium">
                        Plan your dream vehicle purchase accurately. See how your EMI changes with different loan amounts, interest rates, and tenures.
                    </p>
                </div>

                <div className="bg-white rounded-[2.5rem] shadow-xl overflow-hidden max-w-7xl mx-auto border border-gray-100">
                    <div className="bg-linear-to-r from-[#2076C7] to-[#1CADA3] text-white py-6 px-8 text-center">
                        <h1 className="text-3xl font-bold mb-2">Estimate Your EMI</h1>
                        <p className="text-blue-100 font-medium font-sans">Get complete clarity on your repayment schedule</p>
                    </div>

                    <div className="flex flex-col lg:flex-row p-6 lg:p-10 font-sans gap-8 lg:gap-12">
                        {/* Input Section */}
                        <div className="flex-1 min-w-0 lg:pr-8 lg:border-r border-gray-200">

                            {/* Loan Amount */}
                            <div className="mb-8">
                                <label htmlFor="loanAmount" className="block text-[#2076C7] font-bold text-lg mb-3">
                                    Loan Amount
                                </label>
                                <div className="relative mb-4">
                                    <span className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-500 font-bold text-lg">₹</span>
                                    <input
                                        type="text"
                                        id="loanAmountInput"
                                        value={getLoanAmountDisplayValue()}
                                        onChange={handleLoanAmountInputChange}
                                        onWheel={handleWheel}
                                        className="w-full px-4 py-4 pl-10 border-2 border-gray-200 rounded-xl focus:outline-none focus:border-[#2076C7] bg-gray-50 focus:bg-white transition-all text-gray-900 font-bold text-xl placeholder:text-gray-400 shadow-inner"
                                        placeholder="Enter loan amount"
                                    />
                                </div>
                                <div className="slider-container px-2">
                                    <input
                                        type="range"
                                        id="loanAmount"
                                        min="50000"
                                        max="5000000"
                                        step="10000"
                                        value={loanAmount}
                                        onChange={handleLoanAmountChange}
                                        className="w-full h-2.5 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-[#2076C7]"
                                    />
                                    <div className="flex justify-between text-xs font-semibold text-gray-500 mt-2 uppercase tracking-wide">
                                        <span>₹50K</span>
                                        <span>₹50L</span>
                                    </div>
                                </div>
                            </div>

                            {/* Interest Rate */}
                            <div className="mb-8">
                                <label htmlFor="interestRate" className="block text-[#1CADA3] font-bold text-lg mb-3">
                                    Annual Interest Rate
                                </label>
                                <div className="relative mb-4">
                                    <input
                                        type="number"
                                        id="interestRateInput"
                                        min="0.1"
                                        max="25"
                                        step="0.1"
                                        value={getInterestRateDisplayValue()}
                                        onChange={handleInterestRateInputChange}
                                        onWheel={handleNumberInputWheel}
                                        className="w-full px-4 py-4 border-2 border-gray-200 rounded-xl focus:outline-none focus:border-[#1CADA3] bg-gray-50 focus:bg-white transition-all pr-12 text-gray-900 font-bold text-xl placeholder:text-gray-400 shadow-inner"
                                    />
                                    <span className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-500 font-bold text-lg">%</span>
                                </div>
                                <div className="slider-container px-2">
                                    <input
                                        type="range"
                                        id="interestRate"
                                        min="5"
                                        max="20"
                                        step="0.1"
                                        value={annualInterestRate}
                                        onChange={handleInterestRateChange}
                                        className="w-full h-2.5 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-[#1CADA3]"
                                    />
                                    <div className="flex justify-between text-xs font-semibold text-gray-500 mt-2 uppercase tracking-wide">
                                        <span>5%</span>
                                        <span>20%</span>
                                    </div>
                                </div>
                            </div>

                            {/* Loan Tenure */}
                            <div className="mb-8">
                                <label htmlFor="loanTerm" className="block text-gray-800 font-bold text-lg mb-3">
                                    Loan Tenure
                                </label>
                                <div className="relative mb-4">
                                    <input
                                        type="number"
                                        id="loanTermInput"
                                        min="12"
                                        max="84"
                                        step="1"
                                        value={getTenureDisplayValue()}
                                        onChange={handleTenureInputChange}
                                        onWheel={handleNumberInputWheel}
                                        className="w-full px-4 py-4 border-2 border-gray-200 rounded-xl focus:outline-none focus:border-gray-800 bg-gray-50 focus:bg-white transition-all pr-24 text-gray-900 font-bold text-xl placeholder:text-gray-400 shadow-inner"
                                    />
                                    <span className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-500 font-bold text-base">
                                        Months
                                    </span>
                                </div>
                                <div className="slider-container px-2">
                                    <input
                                        type="range"
                                        id="loanTerm"
                                        min="12"
                                        max="84"
                                        step="1"
                                        value={loanTermMonths}
                                        onChange={handleTenureChange}
                                        className="w-full h-2.5 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-gray-800"
                                    />
                                    <div className="flex justify-between text-xs font-semibold text-gray-500 mt-2 uppercase tracking-wide">
                                        <span>12 Months (1Y)</span>
                                        <span>84 Months (7Y)</span>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Results & Visualization Section */}
                        <div className="flex-1 min-w-0 flex flex-col justify-between">
                            <div className="bg-blue-50/50 p-6 rounded-2xl border border-blue-100 mb-8">
                                <div className="text-center">
                                    <div className="text-sm text-gray-600 font-semibold mb-2 uppercase tracking-wider">Your Estimated EMI</div>
                                    <div className="text-4xl sm:text-5xl font-extrabold text-[#2076C7] font-sans drop-shadow-sm">
                                        {paymentAmount > 0 ? formatCurrency(paymentAmount) : '₹0'}
                                    </div>
                                </div>
                            </div>

                            <div className="chart-container h-64 mb-8">
                                <canvas ref={canvasRef}></canvas>
                            </div>

                            <div className="grid grid-cols-2 gap-4">
                                <div className="bg-gray-50 p-4 rounded-xl border border-gray-200 text-center">
                                    <div className="text-xs text-gray-500 font-semibold uppercase tracking-wider mb-1">Total Principal</div>
                                    <div className="text-lg font-bold text-gray-900">{formatCurrency(loanAmount)}</div>
                                </div>
                                <div className="bg-teal-50/50 p-4 rounded-xl border border-teal-100 text-center">
                                    <div className="text-xs text-[#1CADA3] font-semibold uppercase tracking-wider mb-1">Total Interest</div>
                                    <div className="text-lg font-bold text-[#1CADA3]">{formatCurrency(totalInterest)}</div>
                                </div>
                                <div className="col-span-2 bg-gradient-to-r from-gray-50 to-white p-4 rounded-xl border border-gray-200 flex justify-between items-center shadow-sm">
                                    <div className="text-sm text-gray-600 font-semibold uppercase tracking-wider">Total Amount Payable</div>
                                    <div className="text-xl font-bold text-gray-900">{formatCurrency(totalPayment)}</div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Insights Box specific to Vehicle Loan */}
                <div className="max-w-7xl mx-auto mt-12 mb-8">
                    <div className="bg-white rounded-[2rem] border-2 border-[#1CADA3]/20 shadow-lg p-8 relative overflow-hidden">
                        <div className="absolute top-0 right-0 w-32 h-32 bg-[#1CADA3]/10 rounded-full blur-2xl -mr-10 -mt-10 pointer-events-none" />

                        <h3 className="text-xl font-bold text-gray-900 mb-6 flex items-center gap-3">
                            <span className="bg-[#1CADA3]/10 text-[#1CADA3] p-2 rounded-lg"><svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 10V3L4 14h7v7l9-11h-7z"></path></svg></span>
                            Smart Vehicle Financing Insights
                        </h3>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div className="flex gap-4 items-start">
                                <div className="w-2 h-2 rounded-full bg-[#2076C7] mt-2 shrink-0" />
                                <p className="text-gray-700 font-medium">
                                    By paying an extra <strong>{formatCurrency(paymentAmount * 0.1)}</strong> (10% more) each month, you could own your vehicle <strong className="text-[#2076C7]">{Math.floor(loanTermMonths * 0.15)} months earlier</strong> and save significantly on interest.
                                </p>
                            </div>
                            <div className="flex gap-4 items-start">
                                <div className="w-2 h-2 rounded-full bg-[#1CADA3] mt-2 shrink-0" />
                                <p className="text-gray-700 font-medium">
                                    Interest constitutes <strong>{loanAmount > 0 ? ((totalInterest / totalPayment) * 100).toFixed(1) : '0'}%</strong> of your total repayment. Opting for a higher down payment can drastically reduce this burden.
                                </p>
                            </div>
                            <div className="flex gap-4 items-start">
                                <div className="w-2 h-2 rounded-full bg-amber-500 mt-2 shrink-0" />
                                <p className="text-gray-700 font-medium">
                                    If this loan is for an Electric Vehicle (EV), you might be eligible for tax deductions under Section 80EEB up to ₹1.5 Lakhs annually.
                                </p>
                            </div>
                            <div className="flex gap-4 items-start md:col-span-2 bg-blue-50 p-4 rounded-xl border border-blue-100">
                                <p className="text-[#2076C7] font-semibold text-sm">
                                    💡 Tip: Before applying, check your CIBIL score. A score above 750 can help you negotiate the interest rate down by 0.5% to 1%, saving you roughly {formatCurrency(totalInterest * 0.1)} over the loan tenure.
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}
