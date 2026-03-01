"use client";
import React, { useState, useMemo } from 'react';
import { Doughnut } from 'react-chartjs-2';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import { ArrowRight } from 'lucide-react';

ChartJS.register(ArcElement, Tooltip, Legend);

interface LoanCalculatorProps {
    openForm: () => void;
}

export default function LoanCalculator({ openForm }: LoanCalculatorProps) {
    const [loanAmount, setLoanAmount] = useState(500000);
    const [interestRate, setInterestRate] = useState(10.5);
    const [tenure, setTenure] = useState(36);

    // Calculations
    const { emi, totalInterest, totalPayment } = useMemo(() => {
        const p = loanAmount;
        const r = interestRate / 12 / 100;
        const n = tenure;

        let calculatedEmi = 0;
        if (r === 0) {
            calculatedEmi = p / n;
        } else {
            calculatedEmi = (p * r * Math.pow(1 + r, n)) / (Math.pow(1 + r, n) - 1);
        }

        const emiRounded = Math.round(calculatedEmi);
        const totalPayable = emiRounded * n;
        const totalInt = totalPayable - p;

        return {
            emi: emiRounded,
            totalInterest: Math.round(totalInt),
            totalPayment: totalPayable,
        };
    }, [loanAmount, interestRate, tenure]);

    const formatCurrency = (val: number) => {
        return new Intl.NumberFormat('en-IN', {
            style: 'currency',
            currency: 'INR',
            maximumFractionDigits: 0
        }).format(val);
    };

    const chartData = {
        labels: ['Principal Amount', 'Total Interest'],
        datasets: [
            {
                data: [loanAmount, totalInterest],
                backgroundColor: ['#1CADA3', '#2076C7'],
                hoverBackgroundColor: ['#178e86', '#1a63a6'],
                borderWidth: 0,
            },
        ],
    };

    const chartOptions = {
        cutout: '80%',
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
            legend: {
                display: false,
            },
            tooltip: {
                callbacks: {
                    label: function (context: any) {
                        return ' ' + formatCurrency(context.raw);
                    }
                }
            }
        },
    };

    return (
        <section className="py-12 md:py-20 bg-white font-sans border-t border-gray-100" id="calculator-section">
            <div className="container mx-auto px-4 md:px-6 max-w-7xl">
                <div className="text-center max-w-2xl mx-auto mb-10 md:mb-12">
                    <h2 className="text-2xl md:text-3xl lg:text-4xl font-extrabold mb-3 md:mb-4 tracking-tight font-sans text-transparent bg-clip-text bg-gradient-to-r from-[#2076C7] via-[#1CADA3] to-[#2076C7]">
                        Personal Loan EMI Calculator
                    </h2>
                    <p className="text-sm md:text-base text-gray-600">
                        Get a detailed breakdown of your monthly EMI, interest, and timeline. Plan your perfect repayment structure effortlessly.
                    </p>
                </div>

                <div className="flex flex-col lg:flex-row gap-10 lg:gap-16 items-start">
                    {/* Controls */}
                    <div className="lg:w-7/12 w-full space-y-6 md:space-y-8 order-2 lg:order-1">
                        {/* Loan Amount */}
                        <div className="bg-gray-50/50 p-5 md:p-6 rounded-2xl border border-gray-100">
                            <div className="flex flex-wrap justify-between items-end gap-2 mb-4">
                                <div>
                                    <label className="text-gray-800 font-bold text-sm md:text-base block mb-0.5">Loan Amount</label>
                                    <span className="text-[10px] md:text-xs text-gray-500">₹50,000 to ₹50,00,000</span>
                                </div>
                                <div className="text-lg md:text-xl font-black text-[#1CADA3]">
                                    {formatCurrency(loanAmount)}
                                </div>
                            </div>
                            <input
                                type="range"
                                min="50000"
                                max="5000000"
                                step="50000"
                                value={loanAmount}
                                onChange={(e) => setLoanAmount(Number(e.target.value))}
                                className="w-full h-2 bg-gray-200 rounded-full appearance-none cursor-pointer accent-[#1CADA3] hover:accent-[#178e86]"
                            />
                        </div>

                        {/* Interest Rate */}
                        <div className="bg-gray-50/50 p-5 md:p-6 rounded-2xl border border-gray-100">
                            <div className="flex flex-wrap justify-between items-end gap-2 mb-4">
                                <div>
                                    <label className="text-gray-800 font-bold text-sm md:text-base block mb-0.5">Interest Rate (p.a)</label>
                                    <span className="text-[10px] md:text-xs text-gray-500">8.5% to 25%</span>
                                </div>
                                <div className="text-lg md:text-xl font-black text-[#2076C7]">
                                    {interestRate.toFixed(1)}%
                                </div>
                            </div>
                            <input
                                type="range"
                                min="8.5"
                                max="25"
                                step="0.1"
                                value={interestRate}
                                onChange={(e) => setInterestRate(Number(e.target.value))}
                                className="w-full h-2 bg-gray-200 rounded-full appearance-none cursor-pointer accent-[#2076C7] hover:accent-[#1a63a6]"
                            />
                        </div>

                        {/* Tenure */}
                        <div className="bg-gray-50/50 p-5 md:p-6 rounded-2xl border border-gray-100">
                            <div className="flex flex-wrap justify-between items-end gap-2 mb-4">
                                <div>
                                    <label className="text-gray-800 font-bold text-sm md:text-base block mb-0.5">Tenure</label>
                                    <span className="text-[10px] md:text-xs text-gray-500">12 Months to 84 Months</span>
                                </div>
                                <div className="text-lg md:text-xl font-black text-[#1CADA3]">
                                    {tenure} Months
                                </div>
                            </div>
                            <input
                                type="range"
                                min="12"
                                max="84"
                                step="6"
                                value={tenure}
                                onChange={(e) => setTenure(Number(e.target.value))}
                                className="w-full h-2 bg-gray-200 rounded-full appearance-none cursor-pointer accent-[#1CADA3] hover:accent-[#178e86]"
                            />
                        </div>
                    </div>

                    {/* Chart & Results */}
                    <div className="lg:w-5/12 w-full flex flex-col items-center order-1 lg:order-2">
                        <div className="relative w-64 h-64 md:w-72 md:h-72 mb-8 md:mb-10">
                            <Doughnut data={chartData} options={chartOptions} />
                            <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none p-4 text-center">
                                <span className="text-[10px] md:text-sm text-gray-500 font-bold uppercase tracking-widest mb-1">Monthly EMI</span>
                                <span className="text-2xl md:text-4xl font-black text-gray-900">{formatCurrency(emi)}</span>
                            </div>
                        </div>

                        <div className="w-full max-w-sm space-y-4 md:space-y-6">
                            <div className="space-y-3 md:space-y-4 text-base md:text-lg">
                                <div className="flex justify-between items-center border-b border-gray-100 pb-3 md:pb-4">
                                    <div className="flex items-center gap-2 md:gap-3">
                                        <div className="w-3 h-3 md:w-4 md:h-4 rounded-full bg-[#1CADA3]"></div>
                                        <span className="text-gray-600 font-medium text-sm md:text-base">Principal Amount</span>
                                    </div>
                                    <span className="font-bold text-gray-900 text-sm md:text-base">{formatCurrency(loanAmount)}</span>
                                </div>
                                <div className="flex justify-between items-center border-b border-gray-100 pb-3 md:pb-4">
                                    <div className="flex items-center gap-2 md:gap-3">
                                        <div className="w-3 h-3 md:w-4 md:h-4 rounded-full bg-[#2076C7]"></div>
                                        <span className="text-gray-600 font-medium text-sm md:text-base">Total Interest</span>
                                    </div>
                                    <span className="font-bold text-gray-900 text-sm md:text-base">{formatCurrency(totalInterest)}</span>
                                </div>
                                <div className="flex justify-between items-center pt-1 md:pt-2">
                                    <span className="text-gray-800 font-bold text-sm md:text-base">Total Payable</span>
                                    <span className="font-black text-gray-900 text-lg md:text-xl">{formatCurrency(totalPayment)}</span>
                                </div>
                            </div>

                            <button
                                onClick={openForm}
                                suppressHydrationWarning
                                className="w-full mt-4 md:mt-6 flex items-center justify-center gap-2 bg-[#2076C7] text-white py-3.5 md:py-4 rounded-xl font-bold text-base md:text-lg hover:bg-[#1CADA3] transition-colors duration-300"
                            >
                                Apply Now <ArrowRight size={20} />
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}
