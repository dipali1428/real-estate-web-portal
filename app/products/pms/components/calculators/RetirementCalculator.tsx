"use client";

import React, { useState } from 'react';
import CalculatorSlider from './CalculatorSlider';
import ResultCard from './ResultCard';
import { motion, AnimatePresence } from 'framer-motion';
import { Clock, TrendingUp, Landmark, ShieldCheck } from 'lucide-react';

export default function RetirementCalculator() {
    const [currentAge, setCurrentAge] = useState(40);
    const [retirementAge, setRetirementAge] = useState(60);
    const [currentPortfolio, setCurrentPortfolio] = useState(50000000); // ₹5 Cr
    const [monthlySaving, setMonthlySaving] = useState(200000); // ₹2L
    const [expectedReturn, setExpectedReturn] = useState(12); // %
    const [inflation, setInflation] = useState(6); // %
    const [postRetirementReturn, setPostRetirementReturn] = useState(8); // %
    const [monthlyExpense, setMonthlyExpense] = useState(100000); // ₹1L

    const calculateRetirement = () => {
        const yearsToRetire = retirementAge - currentAge;
        const monthsToRetire = yearsToRetire * 12;

        const futureCurrentPortfolio = currentPortfolio * Math.pow(1 + expectedReturn / 100, yearsToRetire);
        const monthlyRate = expectedReturn / 100 / 12;
        let futureSavings = 0;
        for (let i = 0; i < monthsToRetire; i++) {
            futureSavings = (futureSavings + monthlySaving) * (1 + monthlyRate);
        }

        const totalCorpus = futureCurrentPortfolio + futureSavings;
        const futureMonthlyExpense = monthlyExpense * Math.pow(1 + inflation / 100, yearsToRetire);
        const annualRetirementExpense = futureMonthlyExpense * 12;

        const postRetirementYears = 30;
        const inflationAdjustedReturn = ((1 + postRetirementReturn / 100) / (1 + inflation / 100)) - 1;

        const requiredCorpus = annualRetirementExpense * (
            (1 - Math.pow(1 + inflationAdjustedReturn, -postRetirementYears)) / inflationAdjustedReturn
        );

        return {
            yearsToRetire, totalCorpus, requiredCorpus,
            surplusDeficit: totalCorpus - requiredCorpus,
            futureMonthlyExpense, annualRetirementExpense,
            fromCurrentPortfolio: futureCurrentPortfolio,
            fromSavings: futureSavings
        };
    };

    const results = calculateRetirement();

    return (
        <div className="bg-white rounded-[2.5rem] shadow-2xl p-10 border border-gray-100">
            <div className="mb-12 text-center">
                <h3 className="text-3xl font-black text-gray-900 mb-2 font-heading">
                    Legacy <span className="text-primary italic">Wealth</span> Planner
                </h3>
                <p className="text-gray-500 font-medium text-lg">
                    Engineer your retirement corpus for sustained multi-generational wealth.
                </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
                <div className="space-y-6 p-8 bg-gray-50 rounded-3xl border border-gray-100">
                    <h4 className="text-[10px] font-black text-primary uppercase tracking-[0.2em] mb-4 flex items-center gap-2 font-heading">
                        <Clock size={14} /> Demographics
                    </h4>
                    <CalculatorSlider
                        label="Current Vintage (Age)"
                        value={currentAge}
                        onChange={setCurrentAge}
                        min={30}
                        max={55}
                        step={1}
                        suffix=" years"
                    />
                    <CalculatorSlider
                        label="Retirement Exit (Age)"
                        value={retirementAge}
                        onChange={setRetirementAge}
                        min={55}
                        max={70}
                        step={1}
                        suffix=" years"
                    />
                </div>

                <div className="space-y-6 p-8 bg-gray-50 rounded-3xl border border-gray-100">
                    <h4 className="text-[10px] font-black text-primary uppercase tracking-[0.2em] mb-4 flex items-center gap-2 font-heading">
                        <Landmark size={14} /> Capital Base
                    </h4>
                    <div>
                        <label className="block text-[10px] font-black text-gray-400 uppercase tracking-widest mb-3">Live Portfolio (₹)</label>
                        <input
                            type="number"
                            value={currentPortfolio}
                            onChange={(e) => setCurrentPortfolio(Number(e.target.value))}
                            className="w-full px-4 py-3 bg-white border border-gray-200 rounded-xl font-bold text-gray-900 focus:ring-2 focus:ring-primary/20 transition-all shadow-inner"
                        />
                        <div className="text-xs text-primary font-bold mt-2">
                            ₹{new Intl.NumberFormat('en-IN').format(currentPortfolio)}
                        </div>
                    </div>
                    <CalculatorSlider
                        label="Monthly Top-up"
                        value={monthlySaving}
                        onChange={setMonthlySaving}
                        min={50000}
                        max={500000}
                        step={50000}
                        prefix="₹"
                    />
                </div>

                <div className="space-y-6 p-8 bg-gray-50 rounded-3xl border border-gray-100">
                    <h4 className="text-[10px] font-black text-primary uppercase tracking-[0.2em] mb-4 flex items-center gap-2 font-heading">
                        <TrendingUp size={14} /> Market Vectors
                    </h4>
                    <CalculatorSlider
                        label="Target Growth (%)"
                        value={expectedReturn}
                        onChange={setExpectedReturn}
                        min={8}
                        max={20}
                        step={1}
                        suffix="%"
                    />
                    <CalculatorSlider
                        label="Systemic Inflation (%)"
                        value={inflation}
                        onChange={setInflation}
                        min={4}
                        max={10}
                        step={0.5}
                        suffix="%"
                    />
                </div>
            </div>

            {/* Results Canvas */}
            <div className="mt-16 bg-gray-900 rounded-[3rem] p-12 text-white relative overflow-hidden shadow-2xl">
                <div className="absolute top-0 right-0 w-96 h-96 bg-primary/20 blur-[120px] rounded-full -mr-48 -mt-48 animate-pulse" />

                <div className="relative z-10 flex flex-col lg:flex-row justify-between items-center gap-12 text-center lg:text-left">
                    <div>
                        <div className="text-[10px] font-black text-white/40 uppercase tracking-[0.3em] mb-2 font-heading">Projected Terminal Corpus</div>
                        <div className="text-6xl md:text-7xl font-black text-primary font-heading tracking-tighter">
                            ₹{new Intl.NumberFormat('en-IN').format(Math.round(results.totalCorpus / 10000000))} <span className="text-2xl not-italic text-white/20">Cr</span>
                        </div>
                        <div className="mt-4 flex items-center justify-center lg:justify-start gap-3">
                            <div className={`px-4 py-1 rounded-full text-[10px] font-black uppercase tracking-widest ${results.surplusDeficit >= 0 ? 'bg-[#1CADA3]/20 text-[#1CADA3]' : 'bg-red-500/20 text-red-400'}`}>
                                {results.surplusDeficit >= 0 ? 'Surplus Achieved' : 'Capital Deficit'}
                            </div>
                            <div className="text-xs font-medium text-white/40 italic">Planning Horizon: {results.yearsToRetire} Years</div>
                        </div>
                    </div>

                    <div className="grid grid-cols-2 gap-6 w-full lg:w-auto">
                        <div className="p-6 bg-white/5 rounded-[2rem] border border-white/10 backdrop-blur-sm">
                            <div className="text-[10px] font-black text-white/30 uppercase tracking-widest mb-1">Required Base</div>
                            <div className="text-xl font-bold">₹{(results.requiredCorpus / 10000000).toFixed(1)} Cr</div>
                        </div>
                        <div className={`p-6 bg-white/5 rounded-[2rem] border ${results.surplusDeficit >= 0 ? 'border-[#1CADA3]/30' : 'border-red-500/30'} backdrop-blur-sm`}>
                            <div className="text-[10px] font-black text-white/30 uppercase tracking-widest mb-1">{results.surplusDeficit >= 0 ? 'Safety Margin' : 'Capital Gap'}</div>
                            <div className={`text-xl font-bold ${results.surplusDeficit >= 0 ? 'text-teal-400' : 'text-red-400'}`}>₹{(Math.abs(results.surplusDeficit) / 10000000).toFixed(1)} Cr</div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Strategic Insights */}
            <div className="mt-12 grid grid-cols-1 md:grid-cols-2 gap-8">
                <div className="p-8 bg-[#2076C7]/5 rounded-[2.5rem] border border-[#2076C7]/10 flex items-start gap-6">
                    <div className="w-12 h-12 bg-white rounded-2xl shadow-lg flex items-center justify-center text-primary shrink-0">
                        <ShieldCheck size={24} />
                    </div>
                    <div>
                        <h5 className="text-sm font-black text-gray-900 uppercase tracking-widest mb-3 font-heading italic">Post-Retirement Lifestyle</h5>
                        <p className="text-xs font-bold text-gray-500 leading-relaxed">
                            Your nominal monthly expense of ₹{new Intl.NumberFormat('en-IN').format(monthlyExpense)} will evolve into <span className="text-primary font-black italic">₹{new Intl.NumberFormat('en-IN').format(Math.round(results.futureMonthlyExpense))}</span> due to systemic inflation. This requires a capital base that generates at least {postRetirementReturn}% yield.
                        </p>
                    </div>
                </div>

                <div className="p-10 bg-gradient-to-br from-gray-900 to-gray-800 rounded-[2.5rem] text-white overflow-hidden relative group">
                    <div className="absolute top-0 right-0 w-32 h-32 bg-primary/20 blur-[60px] rounded-full group-hover:scale-150 transition-transform" />
                    <h5 className="text-[10px] font-black text-white/40 uppercase tracking-[0.2em] mb-4">Strategic Allocation</h5>
                    <p className="text-sm font-medium italic leading-relaxed text-white/80">
                        {results.surplusDeficit >= 0
                            ? "Plan on track. Focus shift from 'Wealth Accumulation' to 'Income Stabilization' via Structured PMS Credit and Index-linked strategies."
                            : `Deficit identified. Recommended shift to High-Conviction Concentrated PMS strategies (like NTDOP or Founders) to capture alpha and bridge the ₹${(Math.abs(results.surplusDeficit) / 10000000).toFixed(1)} Cr gap.`}
                    </p>
                </div>
            </div>
        </div>
    );
}
