"use client";

import React, { useState } from 'react';
import CalculatorSlider from './CalculatorSlider';
import ResultCard from './ResultCard';
import { motion } from 'framer-motion';

export default function FeeImpactCalculator() {
    const [investment, setInvestment] = useState(10000000); // ₹1 Cr
    const [returns, setReturns] = useState(15); // 15% annual
    const [years, setYears] = useState(5);
    const [managementFee, setManagementFee] = useState(1.5); // %
    const [performanceFee, setPerformanceFee] = useState(15); // %
    const [hurdleRate, setHurdleRate] = useState(8); // %

    const calculate = () => {
        let portfolio = investment;
        let totalManagementFees = 0;
        let totalPerformanceFees = 0;

        for (let year = 1; year <= years; year++) {
            const grossReturn = portfolio * (returns / 100);
            const mgmtFee = portfolio * (managementFee / 100);
            totalManagementFees += mgmtFee;

            let perfFee = 0;
            if (returns > hurdleRate) {
                const excessReturn = grossReturn - (portfolio * (hurdleRate / 100));
                perfFee = excessReturn * (performanceFee / 100);
                totalPerformanceFees += perfFee;
            }

            portfolio = portfolio + grossReturn - mgmtFee - perfFee;
        }

        return {
            finalPortfolio: portfolio,
            totalFees: totalManagementFees + totalPerformanceFees,
            managementFees: totalManagementFees,
            performanceFees: totalPerformanceFees,
            grossAmount: investment * Math.pow(1 + returns / 100, years)
        };
    };

    const results = calculate();

    return (
        <div className="bg-white rounded-[2.5rem] shadow-2xl p-10 border border-gray-100">
            <div className="mb-12 text-center">
                <h3 className="text-3xl font-black text-gray-900 mb-2 font-heading">
                    Fee Impact <span className="text-primary italic">Analysis</span>
                </h3>
                <p className="text-gray-500 font-medium">
                    Quantify the cost of alpha generation and management.
                </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
                <div className="space-y-8">
                    <div>
                        <label className="block text-[10px] font-black text-gray-400 uppercase tracking-[0.2em] mb-4">
                            Deployment Capital (₹)
                        </label>
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

                    <CalculatorSlider
                        label="Target Growth Rate (% p.a.)"
                        value={returns}
                        onChange={setReturns}
                        min={5}
                        max={30}
                        step={1}
                        suffix="%"
                    />

                    <CalculatorSlider
                        label="Planning Horizon (Years)"
                        value={years}
                        onChange={setYears}
                        min={1}
                        max={10}
                        step={1}
                        suffix=" years"
                    />
                </div>

                <div className="space-y-8 p-10 bg-slate-900 rounded-[2.5rem] text-white relative overflow-hidden">
                    <div className="absolute top-0 right-0 w-64 h-64 bg-primary/20 blur-[80px] rounded-full -mr-32 -mt-32"></div>

                    <div>
                        <label className="block text-[10px] font-black text-white/50 uppercase tracking-[0.2em] mb-4">
                            Management Fee (%)
                        </label>
                        <select
                            value={managementFee}
                            onChange={(e) => setManagementFee(Number(e.target.value))}
                            className="w-full px-8 py-4 bg-white/10 border border-white/10 rounded-2xl font-black text-white focus:bg-white/20 transition-all outline-none"
                        >
                            <option className="bg-gray-900" value="1.0">1.0% p.a.</option>
                            <option className="bg-gray-900" value="1.25">1.25% p.a.</option>
                            <option className="bg-gray-900" value="1.5">1.5% p.a.</option>
                            <option className="bg-gray-900" value="2.0">2.0% p.a.</option>
                            <option className="bg-gray-900" value="2.5">2.5% p.a.</option>
                        </select>
                    </div>

                    <CalculatorSlider
                        label="Performance Fee (%)"
                        value={performanceFee}
                        onChange={setPerformanceFee}
                        min={0}
                        max={25}
                        step={5}
                        suffix="%"
                    />

                    <CalculatorSlider
                        label="Hurdle Rate (%)"
                        value={hurdleRate}
                        onChange={setHurdleRate}
                        min={0}
                        max={15}
                        step={1}
                        suffix="%"
                    />
                </div>
            </div>

            {/* Results Grid */}
            <div className="mt-16">
                <h4 className="text-xl font-black text-gray-900 mb-10 text-center font-heading tracking-tight">Financial Summary</h4>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                    <div className="p-8 bg-[#2076C7]/5 rounded-3xl border border-[#2076C7]/10 group hover:bg-[#2076C7]/10 transition-colors">
                        <div className="text-[10px] font-black text-primary uppercase tracking-widest mb-4">Gross Asset Value</div>
                        <div className="text-2xl font-black text-gray-900 leading-tight">
                            ₹{new Intl.NumberFormat('en-IN').format(Math.round(results.grossAmount))}
                        </div>
                        <div className="mt-2 text-xs font-bold text-gray-400">Pre-fee terminal value</div>
                    </div>

                    <div className="p-8 bg-[#1CADA3]/5 rounded-3xl border border-[#1CADA3]/10 group hover:bg-[#1CADA3]/10 transition-colors">
                        <div className="text-[10px] font-black text-[#1CADA3] uppercase tracking-widest mb-4">Net Asset Value</div>
                        <div className="text-2xl font-black text-gray-900 leading-tight">
                            ₹{new Intl.NumberFormat('en-IN').format(Math.round(results.finalPortfolio))}
                        </div>
                        <div className="mt-2 text-xs font-bold text-gray-400">Post-fee capital</div>
                    </div>

                    <div className="p-8 bg-red-50/50 rounded-3xl border border-red-100 group hover:bg-red-50 transition-colors">
                        <div className="text-[10px] font-black text-red-500 uppercase tracking-widest mb-4">Cumulative Fees</div>
                        <div className="text-2xl font-black text-gray-900 leading-tight italic">
                            ₹{new Intl.NumberFormat('en-IN').format(Math.round(results.totalFees))}
                        </div>
                        <div className="mt-2 text-xs font-bold text-gray-400">Total cost of management</div>
                    </div>

                    <div className="p-8 bg-amber-50/50 rounded-3xl border border-amber-100 group hover:bg-amber-50 transition-colors">
                        <div className="text-[10px] font-black text-amber-600 uppercase tracking-widest mb-4">Alpha Retention</div>
                        <div className="text-2xl font-black text-gray-900 leading-tight">
                            {(results.finalPortfolio / results.grossAmount * 100).toFixed(1)}%
                        </div>
                        <div className="mt-2 text-xs font-bold text-gray-400">Profit share retained</div>
                    </div>
                </div>

                {/* Return Matrix */}
                <div className="mt-10 p-10 bg-gray-50 rounded-[3rem] border border-gray-100 relative overflow-hidden">
                    <div className="flex flex-col md:flex-row justify-between items-center gap-10">
                        <div className="text-center md:text-left">
                            <div className="text-[10px] font-black text-gray-400 uppercase tracking-[0.2em] mb-2">Effective Realized Rate</div>
                            <div className="text-5xl font-black text-primary font-heading">
                                {((Math.pow(results.finalPortfolio / investment, 1 / years) - 1) * 100).toFixed(2)}%
                            </div>
                        </div>
                        <div className="text-center md:text-right">
                            <div className="text-[10px] font-black text-gray-400 uppercase tracking-[0.2em] mb-2">Fee Intensity</div>
                            <div className="text-4xl font-black text-gray-900">
                                {((results.totalFees / (results.grossAmount - investment)) * 100).toFixed(1)}% <span className="text-sm text-gray-400">of profits</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
