"use client";

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Sparkles } from 'lucide-react';
import CalculatorSlider from './CalculatorSlider';

export default function SIPLumpsumCalculator() {
    const [lumpsumAmount, setLumpsumAmount] = useState(10000000); // ₹1 Cr
    const [sipAmount, setSipAmount] = useState(200000); // ₹2L monthly
    const [sipDuration, setSipDuration] = useState(12); // months
    const [expectedReturn, setExpectedReturn] = useState(15); // % annual

    const calculateLumpsum = () => {
        const annualRate = expectedReturn / 100;
        const years = sipDuration / 12;
        return lumpsumAmount * Math.pow(1 + annualRate, years);
    };

    const calculateSIP = () => {
        const monthlyRate = expectedReturn / 100 / 12;
        let total = 0;
        for (let i = 0; i < sipDuration; i++) {
            total = (total + sipAmount) * (1 + monthlyRate);
        }
        return total;
    };

    const lumpsumResult = calculateLumpsum();
    const sipResult = calculateSIP();
    const totalSIPInvested = sipAmount * sipDuration;

    return (
        <div className="bg-white rounded-[2.5rem] shadow-2xl p-10 border border-gray-100">
            <div className="mb-10 text-center">
                <h3 className="text-3xl font-black text-gray-900 mb-2 font-heading">
                    Lumpsum vs SIP <span className="text-primary italic">Battle</span>
                </h3>
                <p className="text-gray-500 font-medium">
                    Which path leads to higher alpha for your capital?
                </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
                {/* Lumpsum Section */}
                <div className="space-y-6 p-8 bg-blue-50/50 rounded-[2rem] border border-blue-100">
                    <div className="flex items-center gap-3 mb-4">
                        <div className="w-8 h-8 bg-primary/10 text-primary rounded-lg flex items-center justify-center font-black">L</div>
                        <h4 className="font-black text-gray-900 uppercase tracking-widest text-xs">Lumpsum Entry</h4>
                    </div>
                    <CalculatorSlider
                        label="Initial Capital"
                        value={lumpsumAmount}
                        onChange={setLumpsumAmount}
                        min={5000000}
                        max={50000000}
                        step={500000}
                        prefix="₹"
                    />
                </div>

                {/* SIP Section */}
                <div className="space-y-6 p-8 bg-teal-50/50 rounded-[2rem] border border-teal-100">
                    <div className="flex items-center gap-3 mb-4">
                        <div className="w-8 h-8 bg-teal-500/10 text-teal-600 rounded-lg flex items-center justify-center font-black">S</div>
                        <h4 className="font-black text-gray-900 uppercase tracking-widest text-xs">Systematic Flow</h4>
                    </div>
                    <CalculatorSlider
                        label="Monthly Contribution"
                        value={sipAmount}
                        onChange={setSipAmount}
                        min={50000}
                        max={1000000}
                        step={50000}
                        prefix="₹"
                    />

                    <div>
                        <label className="block text-xs font-black text-gray-900 uppercase tracking-[0.2em] mb-4">
                            Deployment Horizon (Months)
                        </label>
                        <div className="flex flex-wrap gap-3">
                            {[12, 24, 36, 48, 60].map(months => (
                                <button
                                    key={months}
                                    onClick={() => setSipDuration(months)}
                                    className={`px-6 py-2 rounded-xl text-xs font-black transition-all ${sipDuration === months
                                        ? 'bg-primary text-white shadow-xl shadow-primary/20 scale-105'
                                        : 'bg-white text-gray-400 hover:text-gray-600 border border-gray-100'
                                        }`}
                                >
                                    {months}M
                                </button>
                            ))}
                        </div>
                    </div>
                </div>
            </div>

            {/* Common Controls */}
            <div className="mt-12 p-8 bg-gray-50 rounded-[2rem] border border-gray-100">
                <CalculatorSlider
                    label="Target Growth Rate (CAGR)"
                    value={expectedReturn}
                    onChange={setExpectedReturn}
                    min={8}
                    max={25}
                    step={1}
                    suffix="%"
                />
                <div className="flex justify-between text-[10px] font-black text-gray-400 uppercase tracking-widest mt-4">
                    <span>Conservative (8%)</span>
                    <span>Aggressive (25%)</span>
                </div>
            </div>

            {/* Results */}
            <div className="mt-12">
                <h4 className="text-xl font-black text-gray-900 mb-8 font-heading text-center">
                    Projected Outcomes
                </h4>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    <motion.div
                        layout
                        className="p-8 bg-white rounded-[2rem] border-2 border-primary shadow-xl relative overflow-hidden group"
                    >
                        <div className="absolute top-0 right-0 w-32 h-32 bg-primary/5 rounded-full -mr-16 -mt-16 group-hover:scale-110 transition-transform" />
                        <div className="text-[10px] font-black text-primary uppercase tracking-[0.2em] mb-2">Lumpsum Strategy</div>
                        <div className="text-4xl font-black text-gray-900 mb-6">
                            ₹{new Intl.NumberFormat('en-IN').format(Math.round(lumpsumResult))}
                        </div>
                        <div className="space-y-3 font-medium">
                            <div className="flex justify-between text-sm">
                                <span className="text-gray-400">Total Invested:</span>
                                <span className="text-gray-900">₹{new Intl.NumberFormat('en-IN').format(lumpsumAmount)}</span>
                            </div>
                            <div className="flex justify-between text-sm">
                                <span className="text-gray-400">Net Multiplier:</span>
                                <span className="text-primary font-black">
                                    {(lumpsumResult / lumpsumAmount).toFixed(2)}x
                                </span>
                            </div>
                        </div>
                    </motion.div>

                    <motion.div
                        layout
                        className="p-8 bg-white rounded-[2rem] border-2 border-teal-500 shadow-xl relative overflow-hidden group"
                    >
                        <div className="absolute top-0 right-0 w-32 h-32 bg-teal-500/5 rounded-full -mr-16 -mt-16 group-hover:scale-110 transition-transform" />
                        <div className="text-[10px] font-black text-teal-600 uppercase tracking-[0.2em] mb-2">SIP Strategy</div>
                        <div className="text-4xl font-black text-gray-900 mb-6">
                            ₹{new Intl.NumberFormat('en-IN').format(Math.round(sipResult))}
                        </div>
                        <div className="space-y-3 font-medium">
                            <div className="flex justify-between text-sm">
                                <span className="text-gray-400">Total Invested:</span>
                                <span className="text-gray-900">₹{new Intl.NumberFormat('en-IN').format(totalSIPInvested)}</span>
                            </div>
                            <div className="flex justify-between text-sm">
                                <span className="text-gray-400">Net Multiplier:</span>
                                <span className="text-teal-600 font-black">
                                    {(sipResult / totalSIPInvested).toFixed(2)}x
                                </span>
                            </div>
                        </div>
                    </motion.div>
                </div>

                {/* Better Approach Badge */}
                <div className="mt-8 p-8 bg-gray-900 rounded-3xl text-white text-center relative overflow-hidden">
                    <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-r from-primary/20 to-teal-500/20 opacity-50" />
                    <div className="relative z-10 flex flex-col md:flex-row justify-center items-center gap-8">
                        <div>
                            <div className="text-[10px] font-black text-gray-400 uppercase tracking-[0.2em] mb-2 text-center md:text-left">Better approach for alpha</div>
                            <div className={`text-2xl font-black ${lumpsumResult > sipResult ? 'text-primary' : 'text-teal-400'}`}>
                                {lumpsumResult > sipResult ? 'FULL LUMPSUM' : 'SYSTEMATIC SIP'}
                            </div>
                        </div>
                        <div className="w-px h-12 bg-gray-800 hidden md:block" />
                        <div>
                            <div className="text-[10px] font-black text-gray-400 uppercase tracking-[0.2em] mb-2 text-center md:text-left">Yield Difference</div>
                            <div className="text-2xl font-black text-white">
                                ₹{new Intl.NumberFormat('en-IN').format(Math.abs(Math.round(lumpsumResult - sipResult)))}
                            </div>
                        </div>
                    </div>
                </div>

                {/* Insight */}
                <div className="mt-8 p-8 bg-blue-50/30 rounded-3xl border border-blue-100/50">
                    <div className="text-[10px] font-black text-primary uppercase tracking-[0.2em] mb-4 flex items-center gap-2">
                        <Sparkles size={14} /> Strat Insight
                    </div>
                    <p className="text-gray-600 font-medium leading-relaxed italic">
                        {lumpsumResult > sipResult
                            ? `Lumpsum investment performs significantly better when markets are rising consistently. With a horizon of ${sipDuration} months and ${expectedReturn}% target returns, deploying 100% of your capital today captures the maximum compounding benefit.`
                            : `The SIP approach is your primary risk management tool. Over ${sipDuration} months, systematic investing provides better cost-averaging, though the final absolute return might be lower than a perfect lumpsum entry.`}
                    </p>
                </div>
            </div>
        </div>
    );
}
