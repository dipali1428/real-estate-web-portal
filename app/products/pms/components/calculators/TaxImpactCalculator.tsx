"use client";

import React, { useState } from 'react';
import CalculatorSlider from './CalculatorSlider';
import ResultCard from './ResultCard';
import { Shield, Info, TrendingUp, Landmark } from 'lucide-react';
import { motion } from 'framer-motion';

export default function TaxImpactCalculator() {
    const [investment, setInvestment] = useState(10000000);
    const [holdingPeriod, setHoldingPeriod] = useState(3); // years
    const [annualReturn, setAnnualReturn] = useState(15); // %
    const [investorType, setInvestorType] = useState('individual');

    const calculateTax = () => {
        const finalValue = investment * Math.pow(1 + annualReturn / 100, holdingPeriod);
        const profit = finalValue - investment;

        let tax = 0;
        let taxType = '';

        if (holdingPeriod < 1) {
            tax = profit * 0.15;
            taxType = 'STCG (15%)';
        } else {
            const exemptionLimit = 100000;
            const taxableProfit = Math.max(0, profit - exemptionLimit);
            tax = taxableProfit * 0.10;
            taxType = 'LTCG (10%)';
        }

        const cess = tax * 0.04;
        const totalTax = tax + cess;

        return {
            investment, finalValue, profit, tax, cess, totalTax,
            netValue: finalValue - totalTax,
            effectiveReturn: ((Math.pow((finalValue - totalTax) / investment, 1 / holdingPeriod) - 1) * 100),
            taxType,
            exemptionUsed: holdingPeriod >= 1 ? Math.min(profit, 100000) : 0
        };
    };

    const results = calculateTax();

    return (
        <div className="bg-white rounded-[2.5rem] shadow-2xl p-10 border border-gray-100">
            <div className="mb-12 text-center">
                <h3 className="text-3xl font-black text-gray-900 mb-2 font-heading">
                    Tax Impact <span className="text-primary italic">Matrix</span>
                </h3>
                <p className="text-gray-500 font-medium">
                    Calculate your net-of-tax realized alpha.
                </p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-12">
                <div className="space-y-8">
                    <div>
                        <label className="block text-[10px] font-black text-gray-400 uppercase tracking-[0.2em] mb-4">Initial Capital</label>
                        <input
                            type="number"
                            value={investment}
                            onChange={(e) => setInvestment(Number(e.target.value))}
                            className="w-full px-8 py-5 bg-gray-50 border border-gray-100 rounded-2xl font-black text-gray-900 focus:ring-4 focus:ring-primary/10 transition-all text-xl"
                        />
                        <div className="text-sm text-primary font-bold mt-4 px-4">
                            ₹{new Intl.NumberFormat('en-IN').format(investment)}
                        </div>
                    </div>

                    <div>
                        <label className="block text-[10px] font-black text-gray-400 uppercase tracking-[0.2em] mb-6">Holding Horizon</label>
                        <div className="flex flex-wrap gap-4">
                            {[1, 2, 3, 5, 10].map(years => (
                                <button
                                    key={years}
                                    onClick={() => setHoldingPeriod(years)}
                                    className={`px-8 py-3 rounded-xl text-xs font-black transition-all ${holdingPeriod === years
                                        ? 'bg-primary text-white shadow-xl shadow-primary/20 scale-105'
                                        : 'bg-white text-gray-400 border border-gray-100 hover:text-gray-600'
                                        }`}
                                >
                                    {years} YEAR{years > 1 ? 'S' : ''}
                                </button>
                            ))}
                        </div>
                    </div>

                    <CalculatorSlider
                        label="Projected Annual Yield (%)"
                        value={annualReturn}
                        onChange={setAnnualReturn}
                        min={5}
                        max={30}
                        step={1}
                        suffix="%"
                    />

                    <div>
                        <label className="block text-[10px] font-black text-gray-400 uppercase tracking-[0.2em] mb-4">Tax Residence Status</label>
                        <select
                            value={investorType}
                            onChange={(e) => setInvestorType(e.target.value)}
                            className="w-full px-8 py-4 bg-gray-50 border border-gray-100 rounded-2xl font-black text-gray-900 outline-none focus:ring-2 focus:ring-primary/20"
                        >
                            <option value="individual">Individual / NRI</option>
                            <option value="huf">HUF / Estate</option>
                            <option value="company">Corporate / AOP</option>
                        </select>
                    </div>
                </div>

                <div className="space-y-6">
                    <div className="p-8 bg-gray-900 rounded-[2.5rem] text-white relative overflow-hidden shadow-2xl">
                        <div className="absolute bottom-0 right-0 w-48 h-48 bg-primary/20 blur-[80px] rounded-full translate-x-1/2 translate-y-1/2" />
                        <div className="flex items-center justify-between mb-8">
                            <div>
                                <h4 className="text-[10px] font-black text-white/40 uppercase tracking-[0.2em] mb-1">Tax Classification</h4>
                                <div className="text-3xl font-black text-primary font-heading italic">{results.taxType}</div>
                            </div>
                            <Shield className="text-white/10" size={40} />
                        </div>

                        <div className="space-y-4">
                            <div className="p-6 bg-white/5 rounded-2xl border border-white/10 flex justify-between items-center group hover:bg-white/10 transition-all">
                                <div>
                                    <div className="text-[10px] font-black text-white/30 uppercase tracking-widest mb-1">Cumulative Tax</div>
                                    <div className="text-2xl font-black text-white">₹{new Intl.NumberFormat('en-IN').format(Math.round(results.totalTax))}</div>
                                </div>
                                <div className="text-right">
                                    <div className="text-[10px] font-black text-white/30 uppercase tracking-widest mb-1">Intensity</div>
                                    <div className="text-lg font-black text-red-400">-{((results.totalTax / results.profit) * 100).toFixed(1)}%</div>
                                </div>
                            </div>

                            <div className="p-6 bg-white/5 rounded-2xl border border-white/10 flex justify-between items-center group hover:bg-white/10 transition-all">
                                <div>
                                    <div className="text-[10px] font-black text-white/30 uppercase tracking-widest mb-1">Net Alpha Realized</div>
                                    <div className="text-2xl font-black text-primary font-heading italic">{results.effectiveReturn.toFixed(2)}% <span className="text-xs text-white/40 not-italic">p.a.</span></div>
                                </div>
                                <Landmark className="text-white/10" size={24} />
                            </div>
                        </div>
                    </div>

                    <div className="p-8 bg-[#2076C7]/5 rounded-[2.5rem] border border-[#2076C7]/10">
                        <h4 className="text-[10px] font-black text-primary uppercase tracking-widest mb-4 flex items-center gap-2">
                            <Info size={14} /> Optimization Vector
                        </h4>
                        <ul className="space-y-3 text-xs font-bold text-gray-500">
                            <li className="flex items-start gap-2 italic leading-relaxed">
                                <span className="text-primary mt-1">•</span>
                                {holdingPeriod >= 1
                                    ? `LTCG Status Achieved. You are currently saving ~5.4% in taxes compared to short-term trading.`
                                    : `Consider holding for 12+ months to flip from 15% STCG to 10% LTCG.`}
                            </li>
                            <li className="flex items-start gap-2 italic leading-relaxed">
                                <span className="text-primary mt-1">•</span>
                                {results.exemptionUsed >= 100000
                                    ? `Exemption threshold of ₹1L fully utilized in this terminal year.`
                                    : `Unused LTCG exemption of ₹${new Intl.NumberFormat('en-IN').format(100000 - results.exemptionUsed)} remains.`}
                            </li>
                        </ul>
                    </div>
                </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="p-8 bg-gray-50 rounded-3xl border border-gray-100 text-center">
                    <div className="text-[10px] font-black text-gray-400 uppercase tracking-widest mb-2">Terminal Profits</div>
                    <div className="text-3xl font-black text-gray-900">₹{new Intl.NumberFormat('en-IN').format(Math.round(results.profit))}</div>
                </div>
                <div className="p-8 bg-gray-50 rounded-3xl border border-gray-100 text-center">
                    <div className="text-[10px] font-black text-gray-400 uppercase tracking-widest mb-2">Capital Retention</div>
                    <div className="text-3xl font-black text-[#1CADA3] italic">
                        {((results.netValue / results.finalValue) * 100).toFixed(1)}%
                    </div>
                </div>
                <div className="p-8 bg-gray-50 rounded-3xl border border-gray-100 text-center">
                    <div className="text-[10px] font-black text-gray-400 uppercase tracking-widest mb-2">Post-Tax Value</div>
                    <div className="text-3xl font-black text-primary font-heading">
                        ₹{new Intl.NumberFormat('en-IN').format(Math.round(results.netValue))}
                    </div>
                </div>
            </div>
        </div>
    );
}
