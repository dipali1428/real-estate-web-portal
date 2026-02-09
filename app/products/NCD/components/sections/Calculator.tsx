'use client';

import { useState, useEffect } from 'react';
import { RotateCcw, Download, Lightbulb } from 'lucide-react';

const Calculator = ({ isWidget = false }) => {
    // State for inputs
    const [frequency, setFrequency] = useState('Yearly');
    const [amount, setAmount] = useState(100000);
    const [rate, setRate] = useState(9.5);
    const [period, setPeriod] = useState(5);

    // State for interaction
    const [showResult, setShowResult] = useState(false);

    // State for results
    const [results, setResults] = useState({
        maturity: 0,
        interest: 0,
        payout: 0
    });

    const calculateReturns = () => {
        const principal = amount;
        const rateDecimal = rate / 100;
        const totalSimpleInterest = principal * rateDecimal * period;

        // Payout Calculation
        let payoutAmount = 0;
        if (frequency === 'Yearly') {
            payoutAmount = Math.round(principal * rateDecimal);
        } else if (frequency === 'Quarterly') {
            payoutAmount = Math.round((principal * rateDecimal) / 4);
        } else {
            payoutAmount = Math.round((principal * rateDecimal) / 12);
        }

        setResults({
            maturity: Math.round(principal + totalSimpleInterest),
            interest: Math.round(totalSimpleInterest),
            payout: payoutAmount
        });

        setShowResult(true);
    };

    const handleReset = () => {
        setFrequency('Yearly');
        setAmount(100000);
        setRate(9.5);
        setPeriod(5);
        setShowResult(false);
    };

    const formatCurrency = (val: number) => {
        return new Intl.NumberFormat('en-IN', {
            style: 'currency',
            currency: 'INR',
            maximumFractionDigits: 0
        }).format(val);
    };

    // Widget Mode Styling
    const containerClass = isWidget
        ? "bg-white rounded-3xl shadow-lg border border-blue-50 overflow-hidden relative"
        : "max-w-xl mx-auto bg-white rounded-[2rem] shadow-2xl border border-gray-100 overflow-hidden relative";

    const wrapperClass = isWidget ? "" : "container-custom";
    const sectionClass = isWidget ? "" : "py-12 bg-gray-50 bg-gradient-to-b from-white to-gray-50";

    const content = (
        <div className={containerClass}>
            {/* Brand Top Bar */}
            <div className="h-1.5 bg-gradient-to-r from-[#2076C7] to-[#1CADA3]" />

            <div className={`p-6 ${isWidget ? 'pt-6' : 'md:p-10'}`}>
                {isWidget && (
                    <h3 className="text-xl font-bold text-[#2076C7] mb-6 flex items-center">
                        NCD Calculator
                    </h3>
                )}

                {!showResult ? (
                    <div className="space-y-6 animate-fade-in">
                        {/* Frequency */}
                        <div>
                            <label className="block text-[10px] font-bold text-gray-400 uppercase tracking-wider mb-2">Payout Frequency</label>
                            <div className="grid grid-cols-3 gap-2">
                                {['Yearly', 'Quarterly', 'Monthly'].map((freq) => (
                                    <button
                                        key={freq}
                                        onClick={() => setFrequency(freq)}
                                        className={`py-3 rounded-xl text-xs font-black border-2 transition-all ${frequency === freq
                                            ? 'bg-[#1CADA3] text-white border-[#1CADA3] shadow-lg shadow-[#1CADA3]/20'
                                            : 'bg-white text-gray-400 border-gray-100 hover:border-[#1CADA3]'
                                            }`}
                                    >
                                        {freq}
                                    </button>
                                ))}
                            </div>
                        </div>

                        {/* Amount */}
                        <div>
                            <div className="flex justify-between items-center mb-2">
                                <label className="text-[10px] font-bold text-gray-400 uppercase tracking-wider">Invest Amount</label>
                                <span className="text-lg font-bold text-[#2076C7]">{formatCurrency(amount)}</span>
                            </div>
                            <input
                                type="range"
                                min="10000"
                                max="5000000"
                                step="10000"
                                value={amount}
                                onChange={(e) => setAmount(Number(e.target.value))}
                                className="w-full h-1.5 bg-gray-100 rounded-lg appearance-none cursor-pointer accent-[#2076C7]"
                            />
                            {!isWidget && (
                                <div className="flex justify-between mt-2">
                                    <button onClick={() => setAmount(100000)} className="text-xs font-bold text-gray-400 hover:text-[#2076C7]">1L</button>
                                    <button onClick={() => setAmount(500000)} className="text-xs font-bold text-gray-400 hover:text-[#2076C7]">5L</button>
                                    <button onClick={() => setAmount(1000000)} className="text-xs font-bold text-gray-400 hover:text-[#2076C7]">10L</button>
                                </div>
                            )}
                        </div>

                        {/* Rate */}
                        <div>
                            <div className="flex justify-between items-center mb-2">
                                <label className="text-[10px] font-bold text-gray-400 uppercase tracking-wider">Interest Rate</label>
                                <span className="text-lg font-bold text-[#1CADA3]">{rate}%</span>
                            </div>
                            <input
                                type="range"
                                min="7"
                                max="14"
                                step="0.1"
                                value={rate}
                                onChange={(e) => setRate(Number(e.target.value))}
                                className="w-full h-1.5 bg-gray-100 rounded-lg appearance-none cursor-pointer accent-[#1CADA3]"
                            />
                        </div>

                        {/* Period */}
                        <div>
                            <div className="flex justify-between items-center mb-2">
                                <label className="text-[10px] font-bold text-gray-400 uppercase tracking-wider">Tenure</label>
                                <span className="text-lg font-bold text-[#1CADA3]">{period} Years</span>
                            </div>
                            <input
                                type="range"
                                min="1"
                                max="10"
                                step="1"
                                value={period}
                                onChange={(e) => setPeriod(Number(e.target.value))}
                                className="w-full h-1.5 bg-gray-100 rounded-lg appearance-none cursor-pointer accent-[#1CADA3]"
                            />
                        </div>

                        <button
                            onClick={calculateReturns}
                            className="w-full py-4 bg-[#2076C7] text-white font-black rounded-xl shadow-xl shadow-[#2076C7]/20 hover:bg-[#1a65ab] hover:-translate-y-1 transition-all text-sm uppercase tracking-widest"
                        >
                            Calculate Now
                        </button>
                    </div>
                ) : (
                    <div className="space-y-6 animate-fade-in">
                        <div className="text-center">
                            <p className="text-gray-500 font-bold mb-1 uppercase tracking-wide text-[10px]">Expected Maturity</p>
                            <h3 className={`font-black text-[#2076C7] mb-2 ${isWidget ? 'text-3xl' : 'text-5xl'}`}>{formatCurrency(results.maturity)}</h3>
                            <p className="text-[#1CADA3] font-bold text-xs bg-[#1CADA3]/10 px-3 py-1 rounded-full inline-block">
                                Net Yield: {rate}%
                            </p>
                        </div>

                        <div className="bg-gray-50 rounded-xl p-4 border border-gray-100 space-y-3">
                            <div className="flex justify-between items-center pb-3 border-b border-gray-100">
                                <span className="text-gray-400 text-[10px] font-black uppercase tracking-wider">Invested</span>
                                <span className="text-[#0B1C2E] font-extrabold text-sm">{formatCurrency(amount)}</span>
                            </div>
                            <div className="flex justify-between items-center pb-3 border-b border-gray-100">
                                <span className="text-gray-400 text-[10px] font-black uppercase tracking-wider">Total Interest</span>
                                <span className="text-[#2076C7] font-extrabold text-sm">{formatCurrency(results.interest)}</span>
                            </div>
                            <div className="flex justify-between items-center">
                                <span className="text-gray-400 text-[10px] font-black uppercase tracking-wider">{frequency} Payout</span>
                                <span className="text-[#1CADA3] font-extrabold text-sm">{formatCurrency(results.payout)}</span>
                            </div>
                        </div>

                        <div className="flex gap-3">
                            <button
                                onClick={() => setShowResult(false)}
                                className="flex-1 py-2.5 bg-white text-gray-500 font-bold rounded-xl border border-gray-200 hover:bg-gray-50 transition-colors text-xs"
                            >
                                Recalculate
                            </button>
                            <button className="flex-1 py-2.5 bg-[#1CADA3] text-white font-bold rounded-xl shadow-lg hover:bg-[#168a82] transition-colors flex items-center justify-center gap-1.5 text-xs">
                                <Download className="w-3 h-3" /> Report
                            </button>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );

    if (isWidget) return content;

    return (
        <section className={sectionClass} id="calculator">
            <div className={wrapperClass}>
                <div className="text-center max-w-2xl mx-auto mb-8">
                    <h2 className="text-3xl font-extrabold text-[#2076C7] mb-3">
                        NCD Returns <span className="heading-gradient">Calculator</span>
                    </h2>
                    <div className="w-24 h-1 mx-auto bg-gradient-to-r from-[#2076C7] to-[#1CADA3] rounded-full mb-4"></div>
                    <p className="text-gray-500 font-medium">
                        Plan your investment and check your potential returns.
                    </p>
                </div>
                {content}
            </div>
        </section>
    );
};

export default Calculator;



