"use client";

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Shield, Activity, PieChart, TrendingUp, AlertTriangle, CheckCircle } from 'lucide-react';

export default function PortfolioHealthCalculator() {
    const [currentAllocation, setCurrentAllocation] = useState([
        { type: 'Equity Mutual Funds', value: 30000000, allocation: 60, color: 'bg-blue-500' },
        { type: 'Fixed Deposits', value: 10000000, allocation: 20, color: 'bg-teal-500' },
        { type: 'Real Estate', value: 5000000, allocation: 10, color: 'bg-indigo-500' },
        { type: 'Gold', value: 3000000, allocation: 6, color: 'bg-amber-500' },
        { type: 'Cash', value: 2000000, allocation: 4, color: 'bg-gray-400' }
    ]);

    const [riskProfile, setRiskProfile] = useState('moderate');
    const [investmentGoal, setInvestmentGoal] = useState('wealth-growth');

    const analyzePortfolio = () => {
        const totalValue = currentAllocation.reduce((sum, item) => sum + item.value, 0);
        const gaps = [];
        const pmsAllocation = currentAllocation.find(a => a.type.includes('PMS'))?.allocation || 0;
        const fdAllocation = currentAllocation.find(a => a.type.includes('Fixed Deposit'))?.allocation || 0;
        const equityAllocation = currentAllocation.find(a => a.type.includes('Equity'))?.allocation || 0;

        if (pmsAllocation < 20) gaps.push('Missing PMS allocation (recommended: 20-40% for HNI investors)');
        if (fdAllocation > 30) gaps.push('Excess fixed income allocation may reduce long-term growth potential');
        if (equityAllocation > 70) gaps.push('High equity exposure - consider diversification for risk management');

        let suggestedStrategy = '';
        let suggestedAllocation: Record<string, number> = {};

        if (riskProfile === 'conservative' && investmentGoal === 'wealth-preservation') {
            suggestedStrategy = 'Value Migration Strategy + Ethical Strategy';
            suggestedAllocation = { 'PMS Strategies': 25, 'Equity Mutual Funds': 30, 'Fixed Income': 30, 'Alternatives': 15 };
        } else if (riskProfile === 'moderate' && investmentGoal === 'wealth-growth') {
            suggestedStrategy = 'NTDOP Strategy + Ethical Strategy mix';
            suggestedAllocation = { 'PMS Strategies': 35, 'Equity Mutual Funds': 35, 'Fixed Income': 20, 'Alternatives': 10 };
        } else if (riskProfile === 'aggressive' && investmentGoal === 'high-growth') {
            suggestedStrategy = 'Founders Portfolio + NTDOP Strategy';
            suggestedAllocation = { 'PMS Strategies': 40, 'Equity Mutual Funds': 40, 'Fixed Income': 10, 'Alternatives': 10 };
        } else {
            suggestedStrategy = 'Balanced mix of NTDOP and Value Migration';
            suggestedAllocation = { 'PMS Strategies': 30, 'Equity Mutual Funds': 40, 'Fixed Income': 20, 'Alternatives': 10 };
        }

        return { totalValue, gaps, suggestedStrategy, suggestedAllocation };
    };

    const analysis = analyzePortfolio();

    return (
        <div className="bg-white rounded-[2.5rem] shadow-2xl p-10 border border-gray-100">
            <div className="mb-12 text-center">
                <h3 className="text-3xl font-black text-gray-900 mb-2 font-heading">
                    Portfolio Health <span className="text-primary italic">Audit</span>
                </h3>
                <p className="text-gray-500 font-medium">
                    Analyze your current asset mix and discover alpha optimization opportunities.
                </p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
                <div>
                    <div className="flex justify-between items-end mb-8">
                        <div>
                            <h4 className="text-[10px] font-black text-gray-400 uppercase tracking-[0.2em] mb-2">Portfolio Valuation</h4>
                            <div className="text-4xl font-black text-gray-900">
                                ₹{new Intl.NumberFormat('en-IN').format(analysis.totalValue)}
                            </div>
                        </div>
                        <PieChart className="text-primary/20" size={48} />
                    </div>

                    <div className="space-y-6">
                        {currentAllocation.map((item, index) => (
                            <div key={index} className="group">
                                <div className="flex items-center justify-between mb-3 text-sm font-bold">
                                    <span className="text-gray-900">{item.type}</span>
                                    <span className="text-primary">{item.allocation}%</span>
                                </div>
                                <div className="relative h-4 bg-gray-100 rounded-full overflow-hidden shadow-inner">
                                    <motion.div
                                        initial={{ width: 0 }}
                                        whileInView={{ width: `${item.allocation}%` }}
                                        transition={{ duration: 1, delay: index * 0.1 }}
                                        className={`absolute h-full ${item.color} rounded-full`}
                                    />
                                </div>
                            </div>
                        ))}
                    </div>

                    <div className="mt-12 grid grid-cols-2 gap-6">
                        <div className="p-6 bg-gray-50 rounded-3xl border border-gray-100">
                            <label className="block text-[10px] font-black text-gray-400 uppercase tracking-widest mb-4">Risk Profile</label>
                            <div className="flex flex-col gap-2">
                                {['conservative', 'moderate', 'aggressive'].map(p => (
                                    <button
                                        key={p}
                                        onClick={() => setRiskProfile(p)}
                                        className={`px-4 py-2 rounded-xl text-[10px] font-black uppercase tracking-widest transition-all ${riskProfile === p ? 'bg-primary text-white shadow-lg' : 'bg-white text-gray-400 border border-gray-100'}`}
                                    >
                                        {p}
                                    </button>
                                ))}
                            </div>
                        </div>
                        <div className="p-6 bg-gray-50 rounded-3xl border border-gray-100">
                            <label className="block text-[10px] font-black text-gray-400 uppercase tracking-widest mb-4">Goal Path</label>
                            <select
                                value={investmentGoal}
                                onChange={(e) => setInvestmentGoal(e.target.value)}
                                className="w-full bg-white border border-gray-100 rounded-xl p-3 text-[10px] font-black uppercase tracking-widest outline-none focus:ring-2 focus:ring-primary/20"
                            >
                                <option value="wealth-preservation">Preservation</option>
                                <option value="wealth-growth">Growth</option>
                                <option value="high-growth">Alpha</option>
                            </select>
                        </div>
                    </div>
                </div>

                <div className="space-y-8">
                    <AnimatePresence mode="wait">
                        {analysis.gaps.length > 0 && (
                            <motion.div
                                initial={{ opacity: 0, x: 20 }}
                                animate={{ opacity: 1, x: 0 }}
                                className="p-8 bg-red-50 rounded-[2rem] border border-red-100"
                            >
                                <h4 className="text-sm font-black text-red-700 uppercase tracking-widest mb-4 flex items-center gap-2">
                                    <AlertTriangle size={16} /> Strategy Gaps
                                </h4>
                                <ul className="space-y-3">
                                    {analysis.gaps.map((gap, i) => (
                                        <li key={i} className="flex items-start gap-3 text-sm font-medium text-red-900/70">
                                            <span className="w-1.5 h-1.5 rounded-full bg-red-400 mt-1.5 shrink-0" />
                                            {gap}
                                        </li>
                                    ))}
                                </ul>
                            </motion.div>
                        )}
                    </AnimatePresence>

                    <div className="p-10 bg-gray-900 rounded-[3rem] text-white relative overflow-hidden shadow-2xl">
                        <div className="absolute top-0 right-0 w-64 h-64 bg-primary/20 blur-[100px] rounded-full -mr-32 -mt-32"></div>
                        <h4 className="text-[10px] font-black text-white/40 uppercase tracking-[0.2em] mb-6">Suggested Strategy</h4>
                        <div className="text-3xl font-black text-primary font-heading leading-tight mb-8">
                            {analysis.suggestedStrategy}
                        </div>

                        <div className="grid grid-cols-2 gap-8">
                            <div className="p-6 bg-white/5 rounded-2xl border border-white/10">
                                <div className="text-[10px] font-black text-white/30 uppercase tracking-widest mb-2">PMS Allocation</div>
                                <div className="text-4xl font-black text-white">{analysis.suggestedAllocation['PMS Strategies']}%</div>
                            </div>
                            <div className="p-6 bg-white/5 rounded-2xl border border-white/10">
                                <div className="text-[10px] font-black text-white/30 uppercase tracking-widest mb-2">Risk Rating</div>
                                <div className="text-4xl font-black text-white capitalize">{riskProfile === 'moderate' ? 'B+' : 'A'}</div>
                            </div>
                        </div>

                        <div className="mt-10 p-6 bg-primary/10 rounded-2xl border border-primary/20">
                            <h5 className="text-[10px] font-black text-primary uppercase tracking-[0.2em] mb-4">Recommended Actions</h5>
                            <ul className="space-y-3 text-xs font-bold text-white/60">
                                <li className="flex items-center gap-3">
                                    <CheckCircle size={14} className="text-primary" /> Shift {analysis.suggestedAllocation['PMS Strategies']}% to PMS
                                </li>
                                <li className="flex items-center gap-3">
                                    <CheckCircle size={14} className="text-primary" /> Target {riskProfile === 'aggressive' ? '15-20%' : '12-15%'} Alpha
                                </li>
                            </ul>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
