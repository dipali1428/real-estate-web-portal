'use client';

import { useState, useEffect } from 'react';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import { Doughnut } from 'react-chartjs-2';
import { motion } from 'framer-motion';

ChartJS.register(ArcElement, Tooltip, Legend);

export default function NPSCalculator() {
    const [age, setAge] = useState(25);
    const [retirementAge, setRetirementAge] = useState(60);
    const [contribution, setContribution] = useState(5000);
    const [returnRate, setReturnRate] = useState(10);
    const [annuityPercentage, setAnnuityPercentage] = useState(40);

    const [results, setResults] = useState({
        totalInvested: 0,
        totalCorpus: 0,
        wealthGained: 0,
        monthlyPension: 0,
        lumpSum: 0,
        annualTaxSaving: 0,
    });

    useEffect(() => {
        const years = retirementAge - age;
        const months = years * 12;
        const monthlyRate = returnRate / 12 / 100;

        let corpus = 0;
        if (monthlyRate > 0) {
            corpus = contribution * ((Math.pow(1 + monthlyRate, months) - 1) / monthlyRate) * (1 + monthlyRate);
        } else {
            corpus = contribution * months;
        }

        const invested = contribution * months;
        const wealth = corpus - invested;
        const annuityAmt = corpus * (annuityPercentage / 100);
        const lump = corpus - annuityAmt;
        const pension = (annuityAmt * 0.06) / 12; // Assuming 6% annuity return

        // Calculate Tax Savings (Self contribution deduction + extra 50k)
        // Max 80C is 1.5L, Max 80CCD(1B) is 50k. Total 2L.
        const annualContribution = contribution * 12;
        const taxSlab = 0.30; // Assuming 30% tax slab for demonstration
        const deductibleAmount = Math.min(annualContribution, 200000);
        const taxSavingAmount = deductibleAmount * taxSlab;

        setResults({
            totalInvested: Math.round(invested),
            totalCorpus: Math.round(corpus),
            wealthGained: Math.round(wealth),
            monthlyPension: Math.round(pension),
            lumpSum: Math.round(lump),
            annualTaxSaving: Math.round(taxSavingAmount),
        });
    }, [age, retirementAge, contribution, returnRate, annuityPercentage]);

    const chartData = {
        labels: ['Invested Amount', 'Wealth Gained'],
        datasets: [
            {
                data: [results.totalInvested, results.wealthGained],
                backgroundColor: ['#2076C7', '#1CADA3'], // brand gradient colors
                borderWidth: 0,
            },
        ],
    };

    const chartOptions = {
        cutout: '70%',
        plugins: {
            legend: {
                position: 'bottom' as const,
                labels: {
                    usePointStyle: true,
                    padding: 20,
                    font: {
                        family: 'var(--font-sans)',
                    }
                }
            },
            tooltip: {
                backgroundColor: 'rgba(255, 255, 255, 0.9)',
                titleColor: '#1e3a8a',
                bodyColor: '#1e3a8a',
                borderColor: '#e2e8f0',
                borderWidth: 1,
                padding: 10,
                boxPadding: 4,
                callbacks: {
                    label: function (context: any) {
                        let label = context.label || '';
                        if (label) {
                            label += ': ';
                        }
                        if (context.parsed !== null) {
                            label += new Intl.NumberFormat('en-IN', { style: 'currency', currency: 'INR', maximumFractionDigits: 0 }).format(context.parsed);
                        }
                        return label;
                    }
                }
            }
        },
    };

    return (
        <section id="calculator" className="relative py-12 bg-white overflow-hidden">
            {/* Aesthetic Background Elements */}
            <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none">
                <div className="absolute inset-0 bg-dot-pattern opacity-[0.03]" />
                <div className="absolute top-[10%] right-[-10%] w-[50%] h-[50%] bg-blue-50/50 rounded-full blur-[140px]" />
                <div className="absolute bottom-[10%] left-[-10%] w-[40%] h-[40%] bg-teal-50/50 rounded-full blur-[120px]" />
            </div>

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
                <div className="text-center mb-24">
                    <h2 className="text-3xl md:text-4xl font-extrabold mb-3 bg-gradient-to-r from-[#2076C7] via-[#1CADA3] to-[#2076C7] bg-clip-text text-transparent bg-[length:200%_auto] animate-gradient-flow drop-shadow-sm tracking-tight text-center w-full pb-1">
                        Pension Calculator
                    </h2>
                    <div className="w-24 h-1 mx-auto bg-gradient-to-r from-[#2076C7] to-[#1CADA3] rounded-full mb-4 shadow-md shadow-blue-500/10"></div>
                    <p className="text-slate-700 font-medium text-lg max-w-2xl mx-auto leading-relaxed text-center">
                        Visualize your financial future. Estimate retirement corpus and monthly pension with just a few clicks.
                    </p>
                </div>

                <div className="bg-white/40 backdrop-blur-[40px] rounded-[3rem] shadow-[0_20px_60px_-20px_rgba(0,0,0,0.08)] border-2 border-blue-100/50 overflow-hidden relative group">
                    <div className="absolute inset-0 bg-gradient-to-br from-blue-500/0 via-transparent to-blue-500/5 opacity-30 pointer-events-none" />

                    <div className="grid lg:grid-cols-12 relative z-10">
                        {/* Controls Panel */}
                        <div className="lg:col-span-12 p-10 lg:p-14 border-b border-gray-100/50">
                            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-12">
                                {/* Age Slider */}
                                <div className="space-y-6">
                                    <div className="flex justify-between items-end mb-2">
                                        <label className="text-[10px] font-black text-gray-500 uppercase tracking-[0.2em]">Current Age</label>
                                        <span className="text-2xl font-black text-[#2076C7] tabular-nums">{age} <span className="text-xs text-gray-500">Yrs</span></span>
                                    </div>
                                    <div className="relative h-10 flex items-center">
                                        <input
                                            type="range"
                                            min="18"
                                            max="60"
                                            value={age}
                                            onChange={(e) => setAge(Number(e.target.value))}
                                            style={{ background: `linear-gradient(to right, #2076C7 0%, #1CADA3 ${((age - 18) * 100) / (60 - 18)}%, #e5e7eb ${((age - 18) * 100) / (60 - 18)}%, #e5e7eb 100%)` }}
                                            className="w-full h-2 rounded-lg appearance-none cursor-pointer transition-all slider-thumb"
                                        />
                                        <div className="absolute -bottom-6 left-0 right-0 flex justify-between text-[10px] font-bold text-gray-500">
                                            <span>18</span>
                                            <span>60</span>
                                        </div>
                                    </div>
                                </div>

                                {/* Monthly Contribution */}
                                <div className="space-y-6">
                                    <div className="flex justify-between items-end mb-2">
                                        <label className="text-[10px] font-black text-gray-500 uppercase tracking-[0.2em]">Monthly Contribution</label>
                                        <span className="text-2xl font-black text-[#1CADA3] tabular-nums">₹{contribution.toLocaleString()}</span>
                                    </div>
                                    <div className="relative h-10 flex items-center">
                                        <input
                                            type="range"
                                            min="500"
                                            max="100000"
                                            step="500"
                                            value={contribution}
                                            onChange={(e) => setContribution(Number(e.target.value))}
                                            style={{ background: `linear-gradient(to right, #2076C7 0%, #1CADA3 ${((contribution - 500) * 100) / (100000 - 500)}%, #e5e7eb ${((contribution - 500) * 100) / (100000 - 500)}%, #e5e7eb 100%)` }}
                                            className="w-full h-2 rounded-lg appearance-none cursor-pointer transition-all slider-thumb"
                                        />
                                        <div className="absolute -bottom-6 left-0 right-0 flex justify-between text-[10px] font-bold text-gray-500">
                                            <span>₹500</span>
                                            <span>₹1L</span>
                                        </div>
                                    </div>
                                </div>

                                {/* Expected Return */}
                                <div className="space-y-6">
                                    <div className="flex justify-between items-end mb-2">
                                        <label className="text-[10px] font-black text-gray-500 uppercase tracking-[0.2em]">Expected Returns</label>
                                        <span className="text-2xl font-black text-blue-600 tabular-nums">{returnRate}%</span>
                                    </div>
                                    <div className="relative h-10 flex items-center">
                                        <input
                                            type="range"
                                            min="5"
                                            max="15"
                                            step="0.5"
                                            value={returnRate}
                                            onChange={(e) => setReturnRate(Number(e.target.value))}
                                            style={{ background: `linear-gradient(to right, #2076C7 0%, #1CADA3 ${((returnRate - 5) * 100) / (15 - 5)}%, #e5e7eb ${((returnRate - 5) * 100) / (15 - 5)}%, #e5e7eb 100%)` }}
                                            className="w-full h-2 rounded-lg appearance-none cursor-pointer transition-all slider-thumb"
                                        />
                                        <div className="absolute -bottom-6 left-0 right-0 flex justify-between text-[10px] font-bold text-gray-500">
                                            <span>5%</span>
                                            <span>15%</span>
                                        </div>
                                    </div>
                                </div>

                                {/* Retirement Age */}
                                <div className="space-y-6">
                                    <div className="flex justify-between items-end mb-2">
                                        <label className="text-[10px] font-black text-gray-500 uppercase tracking-[0.2em]">Retirement Age</label>
                                        <span className="text-2xl font-black text-blue-600 tabular-nums">{retirementAge} <span className="text-xs text-gray-500">Yrs</span></span>
                                    </div>
                                    <div className="relative h-10 flex items-center">
                                        <input
                                            type="range"
                                            min="60"
                                            max="75"
                                            step="1"
                                            value={retirementAge}
                                            onChange={(e) => setRetirementAge(Number(e.target.value))}
                                            style={{ background: `linear-gradient(to right, #2076C7 0%, #1CADA3 ${((retirementAge - 60) * 100) / (75 - 60)}%, #e5e7eb ${((retirementAge - 60) * 100) / (75 - 60)}%, #e5e7eb 100%)` }}
                                            className="w-full h-2 rounded-lg appearance-none cursor-pointer transition-all slider-thumb"
                                        />
                                        <div className="absolute -bottom-6 left-0 right-0 flex justify-between text-[10px] font-bold text-gray-500">
                                            <span>60</span>
                                            <span>75</span>
                                        </div>
                                    </div>
                                </div>

                                {/* Annuity Percentage */}
                                <div className="space-y-6">
                                    <div className="flex justify-between items-end mb-2">
                                        <label className="text-[10px] font-black text-gray-500 uppercase tracking-[0.2em]">Annuity Reinvestment</label>
                                        <span className="text-2xl font-black text-teal-600 tabular-nums">{annuityPercentage}%</span>
                                    </div>
                                    <div className="relative h-10 flex items-center">
                                        <input
                                            type="range"
                                            min="40"
                                            max="100"
                                            step="5"
                                            value={annuityPercentage}
                                            onChange={(e) => setAnnuityPercentage(Number(e.target.value))}
                                            style={{ background: `linear-gradient(to right, #2076C7 0%, #1CADA3 ${((annuityPercentage - 40) * 100) / (100 - 40)}%, #e5e7eb ${((annuityPercentage - 40) * 100) / (100 - 40)}%, #e5e7eb 100%)` }}
                                            className="w-full h-2 rounded-lg appearance-none cursor-pointer transition-all slider-thumb"
                                        />
                                        <div className="absolute -bottom-6 left-0 right-0 flex justify-between text-[10px] font-bold text-gray-500">
                                            <span>40%</span>
                                            <span>100%</span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Results Panel */}
                        <div className="lg:col-span-12 p-10 lg:p-14 bg-gradient-to-br from-blue-50/30 to-teal-50/30 backdrop-blur-md">
                            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-10">
                                <motion.div
                                    whileHover={{ scale: 1.05 }}
                                    className="bg-white/80 p-6 rounded-[2rem] border-2 border-blue-100 shadow-lg shadow-blue-500/5 group/res"
                                >
                                    <p className="text-[10px] font-black text-gray-500 uppercase tracking-[0.2em] mb-3">Total Investment</p>
                                    <p className="text-3xl font-black text-slate-700 tabular-nums">₹{results.totalInvested.toLocaleString()}</p>
                                    <div className="w-12 h-1 bg-gray-100 rounded-full mt-4 group-hover/res:w-full transition-all duration-500" />
                                </motion.div>

                                <motion.div
                                    whileHover={{ scale: 1.05 }}
                                    className="bg-white/80 p-6 rounded-[2rem] border-2 border-blue-100 shadow-lg shadow-blue-500/5 group/res"
                                >
                                    <p className="text-[10px] font-black text-gray-500 uppercase tracking-[0.2em] mb-3">Est. Wealth Gained</p>
                                    <p className="text-3xl font-black text-[#1CADA3] tabular-nums">₹{results.wealthGained.toLocaleString()}</p>
                                    <div className="w-12 h-1 bg-[#1CADA3]/20 rounded-full mt-4 group-hover/res:w-full transition-all duration-500" />
                                </motion.div>

                                <motion.div
                                    whileHover={{ scale: 1.05 }}
                                    className="bg-white/80 p-6 rounded-[2rem] border-2 border-blue-100 shadow-lg shadow-blue-500/5 group/res"
                                >
                                    <p className="text-[10px] font-black text-gray-500 uppercase tracking-[0.2em] mb-3">Total Corpus</p>
                                    <p className="text-3xl font-black text-[#2076C7] tabular-nums">₹{results.totalCorpus.toLocaleString()}</p>
                                    <div className="w-12 h-1 bg-[#2076C7]/20 rounded-full mt-4 group-hover/res:w-full transition-all duration-500" />
                                </motion.div>

                                <motion.div
                                    whileHover={{ scale: 1.05 }}
                                    className="bg-gradient-to-br from-[#2076C7] to-[#1CADA3] p-6 rounded-[2rem] shadow-xl shadow-blue-500/15 group/res text-white"
                                >
                                    <p className="text-[10px] font-black text-white/60 uppercase tracking-[0.2em] mb-3">Est. Monthly Pension</p>
                                    <p className="text-3xl font-black tabular-nums">₹{results.monthlyPension.toLocaleString()}</p>
                                    <div className="w-12 h-1 bg-white/20 rounded-full mt-4 group-hover/res:w-full transition-all duration-500" />
                                </motion.div>
                            </div>

                            <div className="mt-8 text-center bg-blue-50/50 p-4 rounded-xl border border-blue-100 text-slate-700 font-medium text-sm">
                                Based on a monthly contribution of <span className="text-[#2076C7] font-bold">₹{contribution.toLocaleString()}</span> for <span className="text-[#2076C7] font-bold">{retirementAge - age}</span> years, you could accumulate a total corpus of <span className="text-[#1CADA3] font-bold">₹{results.totalCorpus.toLocaleString()}</span>.
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}
