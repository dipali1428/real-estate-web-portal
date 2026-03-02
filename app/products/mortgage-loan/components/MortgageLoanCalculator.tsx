// app/offers/loans/mortgage-loan/components/MortgageLoanCalculator.tsx
"use client";

import { useState, useEffect, useRef } from 'react';
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

    const [paymentAmount, setPaymentAmount] = useState<number>(0);
    const [totalInterest, setTotalInterest] = useState<number>(0);
    const [totalPayment, setTotalPayment] = useState<number>(0);
    const [amortizationSchedule, setAmortizationSchedule] = useState<PaymentScheduleEntry[]>([]);

    const chartRef = useRef<Chart<'doughnut'> | null>(null);
    const canvasRef = useRef<HTMLCanvasElement>(null);

    const formatCurrency = (value: number): string => {
        if (isNaN(value) || value === 0) return '₹0';
        return '₹' + value.toFixed(0).replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    };

    const calculateLoanPayments = () => {
        if (!loanAmount || loanAmount < 10000 || !annualInterestRate || !loanTermMonths) return;

        const paymentsPerYear = frequencyMap[paymentFrequency];
        const annualRateDecimal = annualInterestRate / 100;
        const loanTermYears = loanTermMonths / 12;
        const totalPayments = Math.ceil(loanTermYears * paymentsPerYear);
        const periodicInterestRate = annualRateDecimal / paymentsPerYear;

        let calculatedPaymentAmount: number;
        if (periodicInterestRate === 0) {
            calculatedPaymentAmount = loanAmount / totalPayments;
        } else {
            const rateFactor = Math.pow(1 + periodicInterestRate, totalPayments);
            calculatedPaymentAmount = (loanAmount * periodicInterestRate * rateFactor) / (rateFactor - 1);
        }

        const calculatedTotalPayment = calculatedPaymentAmount * totalPayments;
        const calculatedTotalInterest = calculatedTotalPayment - loanAmount;

        setPaymentAmount(calculatedPaymentAmount);
        setTotalInterest(calculatedTotalInterest);
        setTotalPayment(calculatedTotalPayment);

        if (chartRef.current) {
            chartRef.current.data.datasets[0].data = [loanAmount, calculatedTotalInterest];
            chartRef.current.update();
        }
    };

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
                            legend: { position: 'bottom' },
                            tooltip: {
                                callbacks: {
                                    label: (context) => `${context.label}: ${formatCurrency(context.parsed)}`
                                }
                            }
                        }
                    }
                });
            }
        }
        return () => chartRef.current?.destroy();
    }, []);

    useEffect(() => {
        calculateLoanPayments();
    }, [loanAmount, annualInterestRate, loanTermMonths, paymentFrequency]);

    return (
        <div className="bg-white rounded-2xl shadow-xl overflow-hidden max-w-6xl mx-auto border border-gray-100">
            <div className="bg-linear-to-r from-[#2076C7] to-[#1CADA3] text-white py-6 px-8 text-center uppercase tracking-wider font-extrabold text-xs">
                Mortgage / LAP EMI Calculator
            </div>

            <div className="flex flex-col lg:flex-row p-6 lg:p-8">
                <div className="flex-1 lg:pr-8 lg:border-r border-gray-100 space-y-8">
                    {/* Loan Amount */}
                    <div>
                        <div className="flex justify-between items-center mb-4">
                            <label className="text-[#2076C7] font-bold text-sm uppercase">Loan Amount (₹)</label>
                            <input
                                type="number"
                                value={loanAmount}
                                onChange={(e) => setLoanAmount(Number(e.target.value))}
                                className="w-32 px-3 py-1 bg-neutral-50 border border-gray-200 rounded-lg text-right font-bold text-[#1CADA3] outline-none"
                            />
                        </div>
                        <input
                            type="range" min="100000" max="100000000" step="50000"
                            value={loanAmount} onChange={(e) => setLoanAmount(Number(e.target.value))}
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
                                type="number" step="0.05"
                                value={annualInterestRate}
                                onChange={(e) => setAnnualInterestRate(Number(e.target.value))}
                                className="w-24 px-3 py-1 bg-neutral-50 border border-gray-200 rounded-lg text-right font-bold text-[#1CADA3] outline-none"
                            />
                        </div>
                        <input
                            type="range" min="5" max="20" step="0.05"
                            value={annualInterestRate} onChange={(e) => setAnnualInterestRate(Number(e.target.value))}
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
                                onChange={(e) => setLoanTermMonths(Number(e.target.value))}
                                className="w-24 px-3 py-1 bg-neutral-50 border border-gray-200 rounded-lg text-right font-bold text-[#1CADA3] outline-none"
                            />
                        </div>
                        <input
                            type="range" min="12" max="240" step="12"
                            value={loanTermMonths} onChange={(e) => setLoanTermMonths(Number(e.target.value))}
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
                            <div className="text-[10px] font-bold text-gray-400 uppercase mb-1">Monthly EMI</div>
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
