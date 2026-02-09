"use client";

import React, { useState, useMemo, useEffect } from 'react';
import { Landmark, Info, Lightbulb, AlertCircle, RotateCcw } from 'lucide-react';
import {
    PieChart as RechartsPieChart,
    Pie,
    Cell,
    ResponsiveContainer,
    Tooltip as RechartsTooltip
} from 'recharts';
import { motion } from 'framer-motion';

const MotionDiv = motion.div;

const FDCalculator = () => {
    const [amount, setAmount] = useState(100000);
    const [rate, setRate] = useState(7.0);
    const [years, setYears] = useState(1);
    const [frequency, setFrequency] = useState(4); // Default: Quarterly
    const [isSeniorCitizen, setIsSeniorCitizen] = useState(false);
    const [isMounted, setIsMounted] = useState(false);

    useEffect(() => {
        setIsMounted(true);
    }, []);

    const resetToDefault = () => {
        setAmount(100000);
        setRate(7.0);
        setYears(1);
        setFrequency(4);
        setIsSeniorCitizen(false);
    };

    const frequencies = [
        { label: 'Yearly', value: 1 },
        { label: 'Half-Yearly', value: 2 },
        { label: 'Quarterly', value: 4 },
        { label: 'Monthly', value: 12 }
    ];

    const calculateValues = useMemo(() => {
        const P = parseFloat(amount.toString());
        const r = parseFloat(rate.toString()) / 100;
        const n = parseInt(frequency.toString());
        const t = parseInt(years.toString());

        if (P > 0 && r > 0 && t > 0) {
            const A = P * Math.pow((1 + r / n), (n * t));
            const I = A - P;
            return {
                maturityAmount: Math.round(A),
                interestEarned: Math.round(I)
            };
        }
        return { maturityAmount: 0, interestEarned: 0 };
    }, [amount, rate, years, frequency]);

    const { maturityAmount, interestEarned } = calculateValues;

    const handleSeniorCitizenChange = (e: React.ChangeEvent<HTMLInputElement> | { target: { checked: boolean } }) => {
        const checked = e.target.checked;
        setIsSeniorCitizen(checked);
        if (checked) {
            setRate(prev => Number((prev + 0.5).toFixed(2)));
        } else {
            setRate(prev => (prev > 0.5 ? Number((prev - 0.5).toFixed(2)) : prev));
        }
    };

    const percentage = Math.min((interestEarned / maturityAmount) * 100, 100) || 0;

    const chartData = useMemo(() => [
        { name: 'Principal', value: Number(amount) },
        { name: 'Interest Earned', value: interestEarned }
    ], [amount, interestEarned]);

    const COLORS = ['#0d9488', '#2076C7']; // Teal for Principal to match new theme

    return (
        <MotionDiv
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="bg-white rounded-[40px] shadow-2xl overflow-hidden border border-gray-100 max-w-7xl mx-auto"
        >
            <div className="p-6 text-white text-center relative overflow-hidden" style={{ background: 'linear-gradient(to right, #2076C7, #1CADA3)' }}>
                <div className="absolute top-0 left-0 w-full h-full opacity-10 bg-[radial-gradient(circle_at_20%_50%,white,transparent)]"></div>
                <div className="relative z-10">
                    <h2 className="text-2xl font-bold flex items-center justify-center gap-3" style={{ color: 'white' }}>
                        <Landmark className="text-secondary" /> FD Calculator
                    </h2>
                    <p className="opacity-90 mt-1 text-sm" style={{ color: 'white' }}>Calculate your wealth growth with precision</p>
                </div>
            </div>

            <div className="p-4 md:p-6 grid grid-cols-1 lg:grid-cols-2 gap-6">
                {/* Left Side: Inputs & Tips */}
                <div className="space-y-4">
                    {/* Segmented Toggle for Investment Type */}
                    <div className="bg-gray-50 p-2 rounded-2xl border border-gray-100 mb-8 flex gap-2">
                        <button
                            onClick={() => handleSeniorCitizenChange({ target: { checked: false } })}
                            className={`flex-1 py-2.5 rounded-xl font-bold text-xs transition-all duration-300 ${!isSeniorCitizen
                                ? 'text-white shadow-lg'
                                : 'text-gray-500 hover:bg-gray-100'}`}
                            style={!isSeniorCitizen ? { background: 'linear-gradient(to right, #1CADA3, #2076C7)' } : {}}
                        >
                            Regular FD
                        </button>
                        <button
                            onClick={() => handleSeniorCitizenChange({ target: { checked: true } })}
                            className={`flex-1 py-2.5 rounded-xl font-bold text-xs transition-all duration-300 ${isSeniorCitizen
                                ? 'text-white shadow-lg'
                                : 'text-gray-500 hover:bg-gray-100'}`}
                            style={isSeniorCitizen ? { background: 'linear-gradient(to right, #1CADA3, #2076C7)' } : {}}
                        >
                            Senior Citizen FD
                        </button>
                    </div>

                    <div className="space-y-4">
                        <div>
                            <div className="flex justify-between items-center mb-2">
                                <label className="block text-sm font-semibold text-gray-700 uppercase tracking-wider">Total Investment</label>
                                <div className="relative w-40">
                                    <span className="absolute left-3 top-2.5 text-gray-400 font-medium">₹</span>
                                    <input
                                        type="number"
                                        value={amount || 0}
                                        onChange={(e) => setAmount(Number(e.target.value))}
                                        className={`w-full pl-7 pr-3 py-2 text-right font-bold border-2 border-gray-100 rounded-xl focus:ring-0 outline-none transition-all text-slate-900 ${isSeniorCitizen ? 'focus:border-teal-500' : 'focus:border-primary'}`}
                                    />
                                </div>
                            </div>
                            <input
                                type="range"
                                min="5000"
                                max="10000000"
                                step="5000"
                                value={amount}
                                onChange={(e) => setAmount(Number(e.target.value))}
                                className={`w-full h-2 bg-gray-100 rounded-lg appearance-none cursor-pointer ${isSeniorCitizen ? 'accent-[#1CADA3]' : 'accent-[#2076C7]'}`}
                            />
                            <div className="flex justify-between text-[11px] text-gray-400 mt-2 font-bold">
                                <span>₹5,000</span>
                                <span>₹1,00,00,000</span>
                            </div>
                        </div>

                        <div>
                            <div className="flex justify-between items-center mb-2">
                                <label className="block text-sm font-semibold text-gray-700 uppercase tracking-wider">Interest Rate (% p.a.)</label>
                                <div className="relative w-24">
                                    <input
                                        type="number"
                                        step="0.1"
                                        value={Number(rate)}
                                        onChange={(e) => setRate(Number(e.target.value))}
                                        className={`w-full text-right font-bold border-2 border-gray-100 rounded-xl py-2 px-3 focus:ring-0 outline-none transition-all text-slate-900 ${isSeniorCitizen ? 'focus:border-teal-500' : 'focus:border-secondary'}`}
                                    />
                                </div>
                            </div>
                            <input
                                type="range"
                                min="1"
                                max="15"
                                step="0.1"
                                value={rate}
                                onChange={(e) => setRate(Number(e.target.value))}
                                className={`w-full h-2 bg-gray-100 rounded-lg appearance-none cursor-pointer ${isSeniorCitizen ? 'accent-[#1CADA3]' : 'accent-[#2076C7]'}`}
                            />
                            <div className="flex justify-between text-[11px] text-gray-400 mt-2 font-bold">
                                <span>1%</span>
                                <span>15%</span>
                            </div>
                        </div>

                        <div>
                            <div className="flex justify-between items-center mb-2">
                                <label className="block text-sm font-semibold text-gray-700 uppercase tracking-wider">Tenure (Years)</label>
                                <div className="relative w-24">
                                    <input
                                        type="number"
                                        step="0.5"
                                        value={years}
                                        onChange={(e) => setYears(Number(e.target.value))}
                                        className={`w-full text-right font-bold border-2 border-gray-100 rounded-xl py-2 px-3 focus:ring-0 outline-none transition-all text-slate-900 ${isSeniorCitizen ? 'focus:border-teal-500' : 'focus:border-primary'}`}
                                    />
                                </div>
                            </div>
                            <input
                                type="range"
                                min="0.5"
                                max="25"
                                step="0.5"
                                value={years}
                                onChange={(e) => setYears(Number(e.target.value))}
                                className={`w-full h-2 bg-gray-100 rounded-lg appearance-none cursor-pointer ${isSeniorCitizen ? 'accent-[#1CADA3]' : 'accent-[#2076C7]'}`}
                            />
                            <div className="flex justify-between text-[11px] text-gray-400 mt-2 font-bold">
                                <span>6 Months</span>
                                <span>25 Years</span>
                            </div>
                        </div>

                        <div className="bg-gray-50 p-4 rounded-2xl border border-gray-100">
                            <label className="block text-xs font-semibold text-gray-700 uppercase tracking-wider mb-3 flex items-center gap-2">
                                Compounding Frequency <Info size={14} className="text-gray-400" />
                            </label>
                            <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
                                {frequencies.map((freq) => (
                                    <button
                                        key={freq.value}
                                        onClick={() => setFrequency(freq.value)}
                                        className={`py-2.5 px-2 rounded-xl text-xs font-bold transition-all duration-300 border-2 ${frequency === freq.value
                                            ? 'text-white shadow-lg border-transparent'
                                            : 'bg-white border-gray-100 text-gray-500 hover:border-primary/30'
                                            }`}
                                        style={frequency === freq.value ? { background: 'linear-gradient(to right, #1CADA3, #2076C7)' } : {}}
                                    >
                                        {freq.label}
                                    </button>
                                ))}
                            </div>
                        </div>

                        {/* Reset Button */}
                        <button
                            onClick={resetToDefault}
                            className="w-full flex items-center justify-center gap-2 py-3 px-6 rounded-xl border-2 border-gray-100 text-gray-500 font-bold hover:bg-gray-50 hover:border-gray-200 transition-all duration-300 group"
                        >
                            <RotateCcw size={18} className="group-hover:rotate-[-45deg] transition-transform" />
                            Reset to Default
                        </button>

                        <div className="bg-amber-50 rounded-2xl p-4 border border-amber-100 mt-2">
                            <div className="flex items-center gap-2 text-amber-700 font-bold mb-2">
                                <Lightbulb size={20} />
                                <span>Investment Tip</span>
                            </div>
                            <p className="text-xs text-amber-800 leading-relaxed mb-6">
                                Senior citizens (above 60 years) typically get 0.5% higher FD rates. Consider splitting large FDs into smaller ones to maintain liquidity and avoid breaking the entire FD for partial withdrawals.
                            </p>

                            <div className="flex items-center gap-2 text-blue-700 font-bold mb-4 mt-8 border-t border-amber-200 pt-6">
                                <AlertCircle size={20} />
                                <span>Important Note</span>
                            </div>
                            <div className="space-y-3 text-xs text-blue-800 leading-relaxed">
                                <p>
                                    FD interest is fully taxable. TDS is deducted at 10% if interest exceeds ₹40,000 (₹50,000 for senior citizens).
                                </p>
                                <p className="italic opacity-70">
                                    * Interest rates vary between banks and change periodically.
                                </p>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Right: Results Visualization */}
                <div className="lg:col-span-1 relative flex flex-col items-center bg-white rounded-3xl p-6 shadow-sm border border-gray-100 overflow-hidden">
                    <div className="w-full grid grid-cols-1 gap-8 items-center">
                        {/* Compact Chart */}
                        <div className="flex flex-col items-center">
                            <div className="relative w-64 h-64 mb-6 bg-gray-50 rounded-full flex items-center justify-center">
                                {isMounted && (
                                    <ResponsiveContainer width="100%" height="100%">
                                        <RechartsPieChart>
                                            <Pie
                                                data={chartData}
                                                cx="50%"
                                                cy="50%"
                                                innerRadius={95}
                                                outerRadius={120}
                                                paddingAngle={0}
                                                dataKey="value"
                                                startAngle={90}
                                                endAngle={-270}
                                                stroke="none"
                                                isAnimationActive={true}
                                                animationDuration={800}
                                            >
                                                {chartData.map((entry, index) => (
                                                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                                                ))}
                                            </Pie>
                                            <RechartsTooltip
                                                formatter={(value: any) => `₹${(value || 0).toLocaleString()}`}
                                                contentStyle={{ borderRadius: '12px', border: 'none' }}
                                            />
                                        </RechartsPieChart>
                                    </ResponsiveContainer>
                                )}
                                <div className="absolute inset-0 flex flex-col items-center justify-center text-center pointer-events-none">
                                    <span className="text-[10px] font-bold text-slate-500 uppercase tracking-widest">Returns</span>
                                    <span className="text-3xl font-bold text-slate-800">{percentage.toFixed(1)}%</span>
                                </div>
                            </div>

                            {/* Legend - Centered below chart */}
                            <div className="flex gap-8 justify-center mb-8">
                                <div className="flex items-center gap-2">
                                    <div className="w-4 h-4 rounded-full bg-secondary"></div>
                                    <span className="text-gray-600 font-medium">Principal</span>
                                </div>
                                <div className="flex items-center gap-2">
                                    <div className="w-4 h-4 rounded-full bg-primary"></div>
                                    <span className="text-gray-600 font-medium">Interest Earned</span>
                                </div>
                            </div>
                        </div>

                        {/* Detailed Table - FD Summary Style */}
                        <div className="w-full max-w-lg mx-auto bg-gray-50/50 rounded-2xl p-4 border border-gray-100 shadow-inner">
                            <h4 className="text-sm font-bold text-slate-800 mb-3 uppercase tracking-wider">FD Summary</h4>
                            <div className="space-y-2">
                                <div className="flex justify-between items-center border-b border-gray-200/30 pb-2">
                                    <span className="text-slate-600 text-xs font-semibold">Deposit Amount</span>
                                    <span className="font-bold text-slate-700 text-sm">₹{amount.toLocaleString()}</span>
                                </div>
                                <div className="flex justify-between items-center border-b border-gray-200/30 pb-2">
                                    <span className="text-slate-600 text-xs font-semibold">Interest Rate</span>
                                    <span className="font-bold text-slate-700 text-sm">{rate}%</span>
                                </div>
                                <div className="flex justify-between items-center border-b border-gray-200/30 pb-2">
                                    <span className="text-slate-600 text-xs font-semibold">Tenure</span>
                                    <span className="font-bold text-slate-700 text-sm">{years} {years > 1 ? 'years' : 'year'}</span>
                                </div>
                                <div className="pt-1 flex justify-between items-center">
                                    <span className="text-slate-700 font-bold text-sm">Maturity Amount</span>
                                    <span className="font-bold text-lg text-slate-800">₹{maturityAmount.toLocaleString()}</span>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="w-full mt-10 p-4 bg-primary/5 rounded-xl border border-primary/10">
                        <p className="text-xs text-gray-500 text-center">
                            <Info size={14} className="inline mr-2 text-primary" />
                            Interest compounded <strong>{frequencies.find(f => f.value === frequency)?.label.toLowerCase()}</strong>. Calculations are based on inputs provided.
                        </p>
                    </div>
                </div>
            </div>
        </MotionDiv>
    );
};

export default FDCalculator;

