"use client";

import { useState, useEffect, useRef, useCallback, useMemo } from 'react';
import { Chart, DoughnutController, ArcElement, Tooltip, Legend } from 'chart.js';

// Register Chart.js components
Chart.register(DoughnutController, ArcElement, Tooltip, Legend);

type PaymentFrequency = 'monthly' | 'quarterly' | 'annually';

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
    fullSchedule: PaymentScheduleEntry[];
}

const frequencyMap: Record<PaymentFrequency, number> = {
    monthly: 12,
    quarterly: 4,
    annually: 1
};

export default function MortgageLoanCalculator() {
    const [loanAmount, setLoanAmount] = useState<number>(1000000); // 10 Lakh default for LAP
    const [annualInterestRate, setAnnualInterestRate] = useState<number>(8.5);
    const [loanTermMonths, setLoanTermMonths] = useState<number>(120); // 10 years default
    const [paymentFrequency, setPaymentFrequency] = useState<PaymentFrequency>('monthly');

    const chartRef = useRef<Chart<'doughnut'> | null>(null);
    const canvasRef = useRef<HTMLCanvasElement>(null);

    const formatCurrency = useCallback((value: number): string => {
        if (isNaN(value) || value === 0) return '₹0';
        return '₹' + value.toFixed(0).replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    }, []);

    // Pure schedule generation function (MOVE THIS BEFORE calculateLoanDetails)
    const generateSchedule = useCallback((
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
            const periodicInterestRate = annualRateDecimal / paymentsPerYear;
            const interestPayment = balance * periodicInterestRate;
            let principalPayment = monthlyPayment - interestPayment;

            // Adjust last payment
            if (balance - principalPayment < 0) {
                principalPayment = balance;
            }

            balance -= principalPayment;

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
    }, []);

    // Pure calculation function (now can access generateSchedule)
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
                fullSchedule: []
            };
        }

        const paymentsPerYear = frequencyMap[frequency];
        const annualRateDecimal = rate / 100;
        const loanTermYears = termMonths / 12;
        const totalPayments = Math.ceil(loanTermYears * paymentsPerYear);
        const periodicInterestRate = annualRateDecimal / paymentsPerYear;

        let paymentAmount: number;
        if (periodicInterestRate === 0) {
            paymentAmount = amount / totalPayments;
        } else {
            const rateFactor = Math.pow(1 + periodicInterestRate, totalPayments);
            paymentAmount = (amount * periodicInterestRate * rateFactor) / (rateFactor - 1);
        }

        const totalPayment = paymentAmount * totalPayments;
        const totalInterest = totalPayment - amount;

        // Generate amortization schedule (generateSchedule is now defined above)
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
            fullSchedule
        };
    }, [generateSchedule]);

    // Calculate all derived values during rendering (no Effect needed!)
    const calculationResult = useMemo(
        () => calculateLoanDetails(loanAmount, annualInterestRate, loanTermMonths, paymentFrequency),
        [loanAmount, annualInterestRate, loanTermMonths, paymentFrequency, calculateLoanDetails]
    );

    const { paymentAmount, totalInterest, totalPayment, fullSchedule } = calculationResult;

    // Initialize chart (only runs once - external system)
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

    // Handlers
    const handleLoanAmountChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
        setLoanAmount(Number(e.target.value));
    }, []);

    const handleInterestRateChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
        setAnnualInterestRate(Number(e.target.value));
    }, []);

    const handleTenureChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
        setLoanTermMonths(Number(e.target.value));
    }, []);

    const handleFrequencyChange = useCallback((frequency: PaymentFrequency) => {
        setPaymentFrequency(frequency);
    }, []);

    return (
        <div className="bg-white rounded-2xl shadow-xl overflow-hidden max-w-6xl mx-auto border border-gray-100">
            <div className="bg-linear-to-r from-[#2076C7] to-[#1CADA3] text-white py-6 px-8 text-center uppercase tracking-wider font-extrabold text-xs">
                Mortgage / LAP EMI Calculator
            </div>

            <div className="flex flex-col lg:flex-row p-6 lg:p-8">
                <div className="flex-1 lg:pr-8 lg:border-r border-gray-100 space-y-8">
                    {/* Payment Frequency Selector */}
                    <div>
                        <label className="text-[#2076C7] font-bold text-sm uppercase block mb-3">
                            Payment Frequency
                        </label>
                        <div className="flex gap-3">
                            {(['monthly', 'quarterly', 'annually'] as PaymentFrequency[]).map((freq) => (
                                <button
                                    key={freq}
                                    onClick={() => handleFrequencyChange(freq)}
                                    className={`px-4 py-2 rounded-lg font-semibold text-sm transition-all ${
                                        paymentFrequency === freq
                                            ? 'bg-[#1CADA3] text-white'
                                            : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                                    }`}
                                >
                                    {freq.charAt(0).toUpperCase() + freq.slice(1)}
                                </button>
                            ))}
                        </div>
                    </div>

                    {/* Loan Amount */}
                    <div>
                        <div className="flex justify-between items-center mb-4">
                            <label className="text-[#2076C7] font-bold text-sm uppercase">Loan Amount (₹)</label>
                            <input
                                type="number"
                                value={loanAmount}
                                onChange={handleLoanAmountChange}
                                className="w-32 px-3 py-1 bg-neutral-50 border border-gray-200 rounded-lg text-right font-bold text-[#1CADA3] outline-none"
                            />
                        </div>
                        <input
                            type="range" 
                            min="100000" 
                            max="100000000" 
                            step="50000"
                            value={loanAmount} 
                            onChange={handleLoanAmountChange}
                            className="w-full h-1.5 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-[#1CADA3]"
                        />
                        <div className="flex justify-between text-[10px] text-gray-400 mt-2 font-bold">
                            <span>1 LAKH</span>
                            <span>10 CRORES</span>
                        </div>
                    </div>

                    {/* Interest Rate */}
                    <div>
                        <div className="flex justify-between items-center mb-4">
                            <label className="text-[#2076C7] font-bold text-sm uppercase">Interest Rate (% p.a.)</label>
                            <input
                                type="number" 
                                step="0.05"
                                value={annualInterestRate}
                                onChange={handleInterestRateChange}
                                className="w-24 px-3 py-1 bg-neutral-50 border border-gray-200 rounded-lg text-right font-bold text-[#1CADA3] outline-none"
                            />
                        </div>
                        <input
                            type="range" 
                            min="5" 
                            max="20" 
                            step="0.05"
                            value={annualInterestRate} 
                            onChange={handleInterestRateChange}
                            className="w-full h-1.5 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-[#1CADA3]"
                        />
                        <div className="flex justify-between text-[10px] text-gray-400 mt-2 font-bold">
                            <span>5%</span>
                            <span>20%</span>
                        </div>
                    </div>

                    {/* Tenure */}
                    <div>
                        <div className="flex justify-between items-center mb-4">
                            <label className="text-[#2076C7] font-bold text-sm uppercase">Tenure (Months)</label>
                            <input
                                type="number"
                                value={loanTermMonths}
                                onChange={handleTenureChange}
                                className="w-24 px-3 py-1 bg-neutral-50 border border-gray-200 rounded-lg text-right font-bold text-[#1CADA3] outline-none"
                            />
                        </div>
                        <input
                            type="range" 
                            min="12" 
                            max="240" 
                            step="12"
                            value={loanTermMonths} 
                            onChange={handleTenureChange}
                            className="w-full h-1.5 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-[#1CADA3]"
                        />
                        <div className="flex justify-between text-[10px] text-gray-400 mt-2 font-bold">
                            <span>1 YEAR</span>
                            <span>20 YEARS</span>
                        </div>
                    </div>
                </div>

                <div className="flex-1 lg:pl-8 mt-10 lg:mt-0 flex flex-col justify-center items-center">
                    <div className="w-full h-48 relative mb-8">
                        <canvas ref={canvasRef}></canvas>
                    </div>

                    <div className="grid grid-cols-2 gap-6 w-full text-center">
                        <div className="bg-neutral-50 p-4 rounded-2xl border border-gray-100">
                            <div className="text-[10px] font-bold text-gray-400 uppercase mb-1">
                                {paymentFrequency === 'monthly' ? 'Monthly' : paymentFrequency === 'quarterly' ? 'Quarterly' : 'Annual'} Payment
                            </div>
                            <div className="text-xl font-bold text-[#2076C7]">{formatCurrency(paymentAmount)}</div>
                        </div>
                        <div className="bg-neutral-50 p-4 rounded-2xl border border-gray-100">
                            <div className="text-[10px] font-bold text-gray-400 uppercase mb-1">Total Payment</div>
                            <div className="text-xl font-bold text-[#1CADA3]">{formatCurrency(totalPayment)}</div>
                        </div>
                        <div className="col-span-2 bg-[#2076C7]/5 p-4 rounded-2xl border border-[#2076C7]/10">
                            <div className="text-[10px] font-bold text-[#2076C7] uppercase mb-1">Total Interest Payable</div>
                            <div className="text-2xl font-bold text-[#2076C7]">{formatCurrency(totalInterest)}</div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}