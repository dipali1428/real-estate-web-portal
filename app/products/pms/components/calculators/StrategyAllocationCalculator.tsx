"use client";

import React, { useState } from 'react';
import CalculatorSlider from './CalculatorSlider';
import { motion } from 'framer-motion';
import { Target, AlertCircle, TrendingUp, Shield } from 'lucide-react';

export default function StrategyAllocationCalculator() {
    const [totalInvestment, setTotalInvestment] = useState(20000000); // ₹2 Cr
    const [strategies, setStrategies] = useState([
        { id: 'ntdop', name: 'NTDOP Strategy', allocation: 40, expectedReturn: 15, risk: 'High', color: 'bg-primary' },
        { id: 'value', name: 'Value Migration', allocation: 30, expectedReturn: 12, risk: 'Medium', color: 'bg-teal-500' },
        { id: 'founders', name: 'Founders Portfolio', allocation: 20, expectedReturn: 18, risk: 'High', color: 'bg-indigo-500' },
        { id: 'ethical', name: 'Ethical Strategy', allocation: 10, expectedReturn: 10, risk: 'Low', color: 'bg-amber-500' }
    ]);

    const updateAllocation = (index: number, newAllocation: number) => {
        const newStrategies = [...strategies];
        newStrategies[index].allocation = newAllocation;
        setStrategies(newStrategies);
    };

    const calculatePortfolioMetrics = () => {
        let weightedReturn = 0;
        let weightedRiskScore = 0;
        const totalAllocation = strategies.reduce((sum, s) => sum + s.allocation, 0);

        strategies.forEach(strategy => {
            const weight = strategy.allocation / 100;
            weightedReturn += weight * strategy.expectedReturn;
            const riskScore = strategy.risk === 'High' ? 3 : strategy.risk === 'Medium' ? 2 : 1;
            weightedRiskScore += weight * riskScore;
        });

        return {
            expectedReturn: weightedReturn,
            riskScore: weightedRiskScore,
            riskLevel: weightedRiskScore > 2.5 ? 'High' : weightedRiskScore > 1.5 ? 'Medium' : 'Low',
            totalAllocation
        };
    };

    const metrics = calculatePortfolioMetrics();

    return (
        <div className="bg-white rounded-[2.5rem] shadow-2xl p-10 border border-gray-100">
            <div className="mb-12 text-center">
                <h3 className="text-3xl font-black text-gray-900 mb-2 font-heading">
                    Strategy <span className="text-primary italic">Allocation</span> Optimizer
                </h3>
                <p className="text-gray-500 font-medium">
                    Fine-tune your portfolio mix across high-conviction strategies.
                </p>
            </div>

            <div className="mb-12 p-8 bg-gray-50 rounded-[2rem] border border-gray-100">
                <CalculatorSlider
                    label="Portfolio Capitalization"
                    value={totalInvestment}
                    onChange={setTotalInvestment}
                    min={5000000}
                    max={100000000}
                    step={500000}
                    prefix="₹"
                />
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
                <div className="space-y-8">
                    <h4 className="text-[10px] font-black text-gray-400 uppercase tracking-[0.2em] mb-4">Allocation Vectors</h4>
                    {strategies.map((strategy, index) => (
                        <div key={strategy.id} className="group">
                            <div className="flex justify-between items-center mb-3">
                                <span className="text-sm font-black text-gray-900">{strategy.name}</span>
                                <span className="text-lg font-black text-primary">{strategy.allocation}%</span>
                            </div>
                            <div className="relative h-4 bg-gray-100 rounded-full overflow-hidden shadow-inner">
                                <motion.div
                                    initial={{ width: 0 }}
                                    animate={{ width: `${strategy.allocation}%` }}
                                    className={`absolute h-full ${strategy.color} rounded-full`}
                                />
                                <input
                                    type="range"
                                    min="0"
                                    max="100"
                                    value={strategy.allocation}
                                    onChange={(e) => updateAllocation(index, Number(e.target.value))}
                                    className="absolute inset-0 w-full h-full opacity-0 cursor-pointer z-10"
                                />
                            </div>
                            <div className="flex justify-between text-[10px] font-bold text-gray-400 mt-2 uppercase tracking-widest">
                                <span>₹{new Intl.NumberFormat('en-IN').format(Math.round(totalInvestment * strategy.allocation / 100))}</span>
                                <span className="flex gap-2">
                                    Risk: <span className={strategy.risk === 'High' ? 'text-red-500' : strategy.risk === 'Medium' ? 'text-amber-500' : 'text-teal-500'}>{strategy.risk}</span>
                                    <span className="text-gray-200">|</span>
                                    Exp: {strategy.expectedReturn}%
                                </span>
                            </div>
                        </div>
                    ))}

                    {metrics.totalAllocation !== 100 && (
                        <motion.div
                            initial={{ opacity: 0, scale: 0.95 }}
                            animate={{ opacity: 1, scale: 1 }}
                            className="p-6 bg-amber-50 border border-amber-200 rounded-2xl flex items-center gap-4 text-amber-700"
                        >
                            <AlertCircle size={20} />
                            <span className="text-xs font-black uppercase tracking-widest">Total is {metrics.totalAllocation}%. Target 100%.</span>
                        </motion.div>
                    )}
                </div>

                <div className="space-y-6">
                    <div className="p-10 bg-gray-900 rounded-[3rem] text-white relative overflow-hidden shadow-2xl">
                        <div className="absolute top-0 right-0 w-64 h-64 bg-primary/20 blur-[100px] rounded-full -mr-32 -mt-32"></div>
                        <h4 className="text-[10px] font-black text-white/40 uppercase tracking-[0.2em] mb-10">Portfolio Summary</h4>

                        <div className="grid grid-cols-2 gap-10 mb-12">
                            <div>
                                <div className="text-[10px] font-black text-white/30 uppercase tracking-widest mb-2">Expected yield</div>
                                <div className="text-4xl font-black text-primary font-heading italic">{metrics.expectedReturn.toFixed(2)}%</div>
                            </div>
                            <div>
                                <div className="text-[10px] font-black text-white/30 uppercase tracking-widest mb-2">Beta rating</div>
                                <div className={`text-4xl font-black ${metrics.riskLevel === 'High' ? 'text-red-400' : 'text-teal-400'}`}>{metrics.riskLevel}</div>
                            </div>
                        </div>

                        <div className="space-y-4">
                            <div className="p-6 bg-white/5 rounded-2xl border border-white/10 flex justify-between items-center">
                                <div className="text-xs font-bold text-white/60">Expected Value (1Y)</div>
                                <div className="text-xl font-black text-white italic">₹{(totalInvestment * (1 + metrics.expectedReturn / 100) / 10000000).toFixed(2)} Cr</div>
                            </div>
                            <div className="p-6 bg-white/5 rounded-2xl border border-white/10 flex justify-between items-center">
                                <div className="text-xs font-bold text-white/60">Expected Value (5Y)</div>
                                <div className="text-xl font-black text-white italic">₹{(totalInvestment * Math.pow(1 + metrics.expectedReturn / 100, 5) / 10000000).toFixed(2)} Cr</div>
                            </div>
                        </div>
                    </div>

                    <div className="p-8 bg-blue-50/50 rounded-[2.5rem] border border-blue-100">
                        <h4 className="text-[10px] font-black text-primary uppercase tracking-widest mb-4 flex items-center gap-2">
                            <Target size={14} /> Allocation Insight
                        </h4>
                        <p className="text-sm font-medium text-gray-500 italic leading-relaxed">
                            {metrics.riskLevel === 'High'
                                ? "Dominant aggressive exposure. Recommend shifting 15% to Value Migration or Ethical strategies to buffer against systemic volatility."
                                : metrics.riskLevel === 'Low'
                                    ? "Defensive posture identified. Consider injecting 20% into NTDOP or Founders portfolios to capture growth-stage alpha."
                                    : "Optimized balance achieved. This allocation maintains a superior risk-adjusted return profile across the current cycle."}
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
}
