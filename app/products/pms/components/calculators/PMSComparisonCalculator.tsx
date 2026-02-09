"use client";

import React, { useState } from 'react';
import CalculatorSlider from './CalculatorSlider';

const PMSComparisonCalculator = () => {
    const [investmentAmount, setInvestmentAmount] = useState(10000000); // ₹1 Cr
    const [timePeriod, setTimePeriod] = useState(5); // years
    const [expectedReturn, setExpectedReturn] = useState({
        pms: 15,
        mutualFund: 12,
        fd: 7,
        inflation: 6
    });

    const calculate = () => {
        const results: { [key: string]: number } = {};
        Object.keys(expectedReturn).forEach(key => {
            const k = key as keyof typeof expectedReturn;
            const rate = expectedReturn[k] / 100;
            results[key] = investmentAmount * Math.pow(1 + rate, timePeriod);
        });
        return results;
    };

    const results = calculate();

    return (
        <div className="bg-white rounded-xl shadow-lg p-6 text-gray-700">
            <div className="mb-6">
                <h3 className="text-2xl font-bold text-slate-main mb-2">
                    PMS vs Other Investments
                </h3>
                <p className="text-slate-muted">
                    Compare PMS returns against traditional investment options
                </p>
            </div>

            <div className="space-y-6">
                {/* Investment Amount */}
                <CalculatorSlider
                    label="Investment Amount"
                    value={investmentAmount}
                    onChange={setInvestmentAmount}
                    min={5000000}
                    max={50000000}
                    step={500000}
                    prefix="₹"
                />

                {/* Time Period */}
                <div>
                    <label className="block text-sm font-medium text-slate-main mb-3">
                        Time Period (Years)
                    </label>
                    <div className="flex flex-wrap gap-2">
                        {[3, 5, 7, 10].map(years => (
                            <button
                                key={years}
                                onClick={() => setTimePeriod(years)}
                                className={`px-6 py-2 rounded-lg font-medium transition-all ${timePeriod === years
                                    ? 'bg-primary text-gray-700 shadow-md'
                                    : 'bg-gray-100 text-slate-main hover:bg-gray-200'
                                    }`}
                            >
                                {years} Years
                            </button>
                        ))}
                    </div>
                </div>

                {/* Expected Returns */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <CalculatorSlider
                        label="PMS Expected Return"
                        value={expectedReturn.pms}
                        onChange={(val) => setExpectedReturn({ ...expectedReturn, pms: val })}
                        min={8}
                        max={25}
                        step={1}
                        suffix="%"
                    />
                    <CalculatorSlider
                        label="Mutual Fund Return"
                        value={expectedReturn.mutualFund}
                        onChange={(val) => setExpectedReturn({ ...expectedReturn, mutualFund: val })}
                        min={5}
                        max={20}
                        step={1}
                        suffix="%"
                    />
                    <CalculatorSlider
                        label="Fixed Deposit Return"
                        value={expectedReturn.fd}
                        onChange={(val) => setExpectedReturn({ ...expectedReturn, fd: val })}
                        min={4}
                        max={10}
                        step={0.5}
                        suffix="%"
                    />
                    <CalculatorSlider
                        label="Inflation Rate"
                        value={expectedReturn.inflation}
                        onChange={(val) => setExpectedReturn({ ...expectedReturn, inflation: val })}
                        min={3}
                        max={10}
                        step={0.5}
                        suffix="%"
                    />
                </div>
            </div>

            {/* Results */}
            <div className="mt-8">
                <h4 className="text-lg font-bold text-slate-main mb-4">
                    Investment Growth Comparison
                </h4>
                <div className="space-y-3">
                    <div className="flex items-center justify-between p-4 border-2 border-gray-300 rounded-lg bg-blue-50">
                        <div className="flex items-center">
                            <div className="w-4 h-4 rounded-full bg-primary mr-3" />
                            <span className="font-medium text-slate-main">PMS Strategy</span>
                        </div>
                        <div className="text-right">
                            <div className="text-2xl font-bold text-primary">
                                ₹{new Intl.NumberFormat('en-IN').format(Math.round(results.pms))}
                            </div>
                            <div className="text-sm text-slate-muted">@{expectedReturn.pms}% p.a.</div>
                        </div>
                    </div>

                    <div className="flex items-center justify-between p-4 border border-gray-300 rounded-lg bg-green-50">
                        <div className="flex items-center">
                            <div className="w-4 h-4 rounded-full bg-green-500 mr-3" />
                            <span className="font-medium text-slate-main">Equity Mutual Fund</span>
                        </div>
                        <div className="text-right">
                            <div className="text-xl font-bold text-green-600">
                                ₹{new Intl.NumberFormat('en-IN').format(Math.round(results.mutualFund))}
                            </div>
                            <div className="text-sm text-slate-muted">@{expectedReturn.mutualFund}% p.a.</div>
                        </div>
                    </div>

                    <div className="flex items-center justify-between p-4 border border-gray-300 rounded-lg bg-yellow-50">
                        <div className="flex items-center">
                            <div className="w-4 h-4 rounded-full bg-yellow-500 mr-3" />
                            <span className="font-medium text-slate-main">Fixed Deposit</span>
                        </div>
                        <div className="text-right">
                            <div className="text-xl font-bold text-yellow-600">
                                ₹{new Intl.NumberFormat('en-IN').format(Math.round(results.fd))}
                            </div>
                            <div className="text-sm text-slate-muted">@{expectedReturn.fd}% p.a.</div>
                        </div>
                    </div>

                    <div className="flex items-center justify-between p-4 border border-gray-300 rounded-lg bg-red-50">
                        <div className="flex items-center">
                            <div className="w-4 h-4 rounded-full bg-red-500 mr-3" />
                            <span className="font-medium text-slate-main">Inflation Impact</span>
                        </div>
                        <div className="text-right">
                            <div className="text-xl font-bold text-red-600">
                                ₹{new Intl.NumberFormat('en-IN').format(Math.round(results.inflation))}
                            </div>
                            <div className="text-sm text-slate-muted">@{expectedReturn.inflation}% p.a.</div>
                        </div>
                    </div>
                </div>

                {/* PMS Advantage */}
                <div className="mt-6 p-4 bg-gradient-to-r from-blue-50 to-teal-50 rounded-lg border border-gray-300 border-primary">
                    <div className="flex justify-between items-center">
                        <div>
                            <div className="text-sm text-slate-muted">PMS Advantage over Mutual Funds</div>
                            <div className="text-3xl font-bold text-primary mt-1">
                                +₹{new Intl.NumberFormat('en-IN').format(Math.round(results.pms - results.mutualFund))}
                            </div>
                        </div>
                        <div className="text-right">
                            <div className="text-sm text-slate-muted">Additional Returns</div>
                            <div className="text-2xl font-bold text-accent-teal mt-1">
                                {(((results.pms - results.mutualFund) / investmentAmount) * 100).toFixed(1)}%
                            </div>
                        </div>
                    </div>
                </div>

                {/* Real Returns After Inflation */}
                <div className="mt-4 p-4 bg-purple-50 rounded-lg border border-purple-200">
                    <div className="text-sm font-medium text-slate-main mb-2">
                        Real Returns (After Inflation)
                    </div>
                    <div className="grid grid-cols-3 gap-4">
                        <div>
                            <div className="text-xs text-slate-muted">PMS</div>
                            <div className="text-lg font-bold text-purple-600">
                                ₹{new Intl.NumberFormat('en-IN').format(Math.round(results.pms - results.inflation + investmentAmount))}
                            </div>
                        </div>
                        <div>
                            <div className="text-xs text-slate-muted">Mutual Fund</div>
                            <div className="text-lg font-bold text-purple-600">
                                ₹{new Intl.NumberFormat('en-IN').format(Math.round(results.mutualFund - results.inflation + investmentAmount))}
                            </div>
                        </div>
                        <div>
                            <div className="text-xs text-slate-muted">Fixed Deposit</div>
                            <div className="text-lg font-bold text-purple-600">
                                ₹{new Intl.NumberFormat('en-IN').format(Math.round(results.fd - results.inflation + investmentAmount))}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default PMSComparisonCalculator;
