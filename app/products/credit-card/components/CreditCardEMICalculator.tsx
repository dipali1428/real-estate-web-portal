'use client';

import { motion } from 'framer-motion';
import { useState, useEffect, useMemo } from 'react';
import {
    IconArrowRight,
    IconPlus,
    IconMinus
} from '@tabler/icons-react';
import {
    PieChart,
    Pie,
    Cell,
    ResponsiveContainer,
    Tooltip,
    Legend
} from 'recharts';

export default function CreditCardEMICalculator({ onApplyClick }: { onApplyClick: () => void }) {
    const [loanAmount, setLoanAmount] = useState(50000);
    const [interestRate, setInterestRate] = useState(15);
    const [tenure, setTenure] = useState(12);
    const [emi, setEmi] = useState(0);
    const [totalInterest, setTotalInterest] = useState(0);
    const [totalPayment, setTotalPayment] = useState(0);

    // Calculate EMI using useMemo to avoid setState in effect
    const calculatedValues = useMemo(() => {
        const r = interestRate / 100 / 12;
        const n = tenure;
        let emiValue = 0;
        let totalPaymentValue = 0;
        let totalInterestValue = 0;
        
        if (r === 0) {
            emiValue = loanAmount / n;
            totalPaymentValue = loanAmount;
            totalInterestValue = 0;
        } else {
            emiValue = (loanAmount * r * Math.pow(1 + r, n)) / (Math.pow(1 + r, n) - 1);
            totalPaymentValue = emiValue * n;
            totalInterestValue = totalPaymentValue - loanAmount;
        }
        
        return {
            emi: emiValue,
            totalPayment: totalPaymentValue,
            totalInterest: totalInterestValue
        };
    }, [loanAmount, interestRate, tenure]);

    // Update state when calculated values change
    useEffect(() => {
        setEmi(calculatedValues.emi);
        setTotalPayment(calculatedValues.totalPayment);
        setTotalInterest(calculatedValues.totalInterest);
    }, [calculatedValues]);

    const chartData = [
        { name: 'Principal', value: loanAmount },
        { name: 'Interest', value: totalInterest },
    ];

    const COLORS = ['#2076C7', '#1CADA3'];

    const fmt = (n: number) =>
        new Intl.NumberFormat('en-IN', { maximumFractionDigits: 0 }).format(n);

    const getSliderStyle = (value: number, min: number, max: number) => {
        const percentage = ((value - min) / (max - min)) * 100;
        return {
            background: `linear-gradient(to right, #2076C7 0%, #1CADA3 ${percentage}%, #f1f5f9 ${percentage}%, #f1f5f9 100%)`
        };
    };

    return (
        <section className="py-6 md:py-10 bg-white">
            <div className="max-w-[1440px] mx-auto px-6">
                <div className="bg-white rounded-[2.5rem] shadow-[0_40px_100px_-20px_rgba(0,0,0,0.1)] border border-slate-100 overflow-hidden">
                    <div className="bg-white border-b border-slate-50 py-10 px-6 text-center">
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                        >
                            <h2 className="text-3xl md:text-4xl font-extrabold mb-3 bg-linear-to-r from-[#2076C7] to-[#1CADA3] bg-clip-text text-transparent drop-shadow-sm">
                                Credit Card EMI Calculator
                            </h2>
                            <p className="text-gray-600 max-w-3xl mx-auto text-xl md:text-1xl">
                                Planning a big purchase? Calculate your monthly conversion EMIs
                            </p>
                        </motion.div>
                    </div>

                    <div className="p-6 lg:p-10">
                        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                            <div className="space-y-8 lg:pr-8 lg:border-r border-slate-100">
                                <div className="space-y-6">
                                    <label className="block text-base md:text-lg font-extrabold text-[#2076C7]">Purchase Amount (₹)</label>
                                    <div className="relative pt-1">
                                        <input
                                            type="range"
                                            min="5000"
                                            max="1000000"
                                            step="5000"
                                            value={loanAmount}
                                            onChange={(e) => setLoanAmount(Number(e.target.value))}
                                            className="w-full h-2 rounded-lg appearance-none cursor-pointer accent-[#2076C7] transition-all"
                                            style={getSliderStyle(loanAmount, 5000, 1000000)}
                                        />
                                        <div className="flex justify-between mt-3 text-xs md:text-sm font-bold text-slate-400">
                                            <span>₹5,000</span>
                                            <span>₹10,00,000</span>
                                        </div>
                                    </div>
                                    <div className="flex items-center gap-2">
                                        <div className="relative flex-grow">
                                            <input
                                                type="number"
                                                value={loanAmount}
                                                onChange={(e) => setLoanAmount(Number(e.target.value))}
                                                className="w-full bg-slate-50 border border-slate-200 rounded-lg pl-4 pr-10 py-1.5 text-base font-extrabold text-[#2076C7] focus:outline-none focus:ring-4 focus:ring-[#2076C7]/5 transition-all text-center"
                                            />
                                            <span className="absolute right-10 top-1/2 -translate-y-1/2 text-slate-300 font-bold text-sm">₹</span>
                                        </div>
                                        <button onClick={() => setLoanAmount(Math.max(5000, loanAmount - 5000))} className="p-1.5 bg-slate-50 border border-slate-200 rounded-lg hover:bg-blue-50 hover:text-[#2076C7] transition-all"><IconMinus size={14} strokeWidth={3} /></button>
                                        <button onClick={() => setLoanAmount(Math.min(1000000, loanAmount + 5000))} className="p-1.5 bg-slate-50 border border-slate-200 rounded-lg hover:bg-blue-50 hover:text-[#2076C7] transition-all"><IconPlus size={14} strokeWidth={3} /></button>
                                    </div>
                                </div>

                                <div className="space-y-6">
                                    <label className="block text-base md:text-lg font-extrabold text-[#2076C7]">EMI Interest Rate (% p.a.)</label>
                                    <div className="relative pt-1">
                                        <input
                                            type="range"
                                            min="10"
                                            max="42"
                                            step="0.5"
                                            value={interestRate}
                                            onChange={(e) => setInterestRate(Number(e.target.value))}
                                            className="w-full h-2 rounded-lg appearance-none cursor-pointer accent-[#2076C7] transition-all"
                                            style={getSliderStyle(interestRate, 10, 42)}
                                        />
                                        <div className="flex justify-between mt-3 text-xs md:text-sm font-bold text-slate-400">
                                            <span>10%</span>
                                            <span>42%</span>
                                        </div>
                                    </div>
                                    <div className="flex items-center gap-2">
                                        <div className="relative flex-grow">
                                            <input
                                                type="number"
                                                value={interestRate}
                                                step="0.1"
                                                onChange={(e) => setInterestRate(Number(e.target.value))}
                                                className="w-full bg-slate-50 border border-slate-200 rounded-lg pl-4 pr-10 py-2.5 text-lg md:text-xl font-extrabold text-[#2076C7] focus:outline-none focus:ring-4 focus:ring-[#2076C7]/5 transition-all text-center"
                                            />
                                            <span className="absolute right-10 top-1/2 -translate-y-1/2 text-slate-300 font-bold text-base">%</span>
                                        </div>
                                        <button onClick={() => setInterestRate(Math.max(10, Number((interestRate - 0.5).toFixed(1))))} className="p-1.5 bg-slate-50 border border-slate-200 rounded-lg hover:bg-blue-50 hover:text-[#2076C7] transition-all"><IconMinus size={14} strokeWidth={3} /></button>
                                        <button onClick={() => setInterestRate(Math.min(42, Number((interestRate + 0.5).toFixed(1))))} className="p-1.5 bg-slate-50 border border-slate-200 rounded-lg hover:bg-blue-50 hover:text-[#2076C7] transition-all"><IconPlus size={14} strokeWidth={3} /></button>
                                    </div>
                                </div>

                                <div className="space-y-6">
                                    <label className="block text-base md:text-lg font-extrabold text-[#2076C7]">Tenure (Months)</label>
                                    <div className="relative pt-1">
                                        <input
                                            type="range"
                                            min="3"
                                            max="36"
                                            step="3"
                                            value={tenure}
                                            onChange={(e) => setTenure(Number(e.target.value))}
                                            className="w-full h-2 rounded-lg appearance-none cursor-pointer accent-[#2076C7] transition-all"
                                            style={getSliderStyle(tenure, 3, 36)}
                                        />
                                        <div className="flex justify-between mt-3 text-xs md:text-sm font-bold text-slate-400">
                                            <span>3 Months</span>
                                            <span>36 Months</span>
                                        </div>
                                    </div>
                                    <div className="flex items-center gap-2">
                                        <div className="relative flex-grow">
                                            <input
                                                type="number"
                                                value={tenure}
                                                onChange={(e) => setTenure(Number(e.target.value))}
                                                className="w-full bg-slate-50 border border-slate-200 rounded-lg pl-4 pr-10 py-2.5 text-lg md:text-xl font-extrabold text-[#2076C7] focus:outline-none focus:ring-4 focus:ring-[#2076C7]/5 transition-all text-center"
                                            />
                                            <span className="absolute right-10 top-1/2 -translate-y-1/2 text-slate-300 font-bold text-base">M</span>
                                        </div>
                                        <button onClick={() => setTenure(Math.max(3, tenure - 3))} className="p-1.5 bg-slate-50 border border-slate-200 rounded-lg hover:bg-blue-50 hover:text-[#2076C7] transition-all"><IconMinus size={14} strokeWidth={3} /></button>
                                        <button onClick={() => setTenure(Math.min(36, tenure + 3))} className="p-1.5 bg-slate-50 border border-slate-200 rounded-lg hover:bg-blue-50 hover:text-[#2076C7] transition-all"><IconPlus size={14} strokeWidth={3} /></button>
                                    </div>
                                </div>

                                <div className="p-6 sm:p-8 rounded-[2.5rem] border-2 border-[#1CADA3]/20 bg-gradient-to-br from-[#1CADA3]/5 to-transparent text-center shadow-sm">
                                    <div className="text-5xl font-extrabold text-[#1CADA3] mb-4 tracking-tight">₹{fmt(emi)}</div>
                                    <div className="grid grid-cols-2 gap-8 border-t border-[#1CADA3]/10 pt-4">
                                        <div>
                                            <div className="text-base md:text-lg font-extrabold text-[#2076C7] mb-1">₹{fmt(totalPayment)}</div>
                                            <div className="text-xs font-black text-slate-400 uppercase tracking-widest">Total Repayment</div>
                                        </div>
                                        <div>
                                            <div className="text-base md:text-lg font-extrabold text-[#1CADA3] mb-1">₹{fmt(totalInterest)}</div>
                                            <div className="text-xs font-black text-slate-400 uppercase tracking-widest">Interest Charged</div>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <div className="flex flex-col">
                                <div className="h-[250px] md:h-[300px] w-full mb-8 relative flex items-center justify-center">
                                    <ResponsiveContainer width="100%" height="100%">
                                        <PieChart>
                                            <Pie data={[{ value: 100 }]} cx="50%" cy="50%" innerRadius="70%" outerRadius="85%" fill="#f1f5f9" dataKey="value" stroke="none" isAnimationActive={false} />
                                            <Pie data={chartData} cx="50%" cy="50%" innerRadius="70%" outerRadius="85%" dataKey="value" stroke="none" animationDuration={1500} >
                                                {chartData.map((entry, index) => ( <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} /> ))}
                                            </Pie>
                                            <Tooltip contentStyle={{ borderRadius: '1rem', border: 'none', boxShadow: '0 10px 30px rgba(0,0,0,0.1)' }} formatter={(value: any) => `₹${fmt(Number(value) || 0)}`} />
                                            <Legend verticalAlign="bottom" height={36} iconType="circle" formatter={(value) => <span className="text-xs md:text-sm font-bold text-slate-500 uppercase tracking-widest ml-1">{value}</span>} />
                                        </PieChart>
                                    </ResponsiveContainer>
                                    <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none pb-8">
                                        <div className="text-sm font-black text-slate-400 uppercase tracking-widest mb-1">Monthly EMI</div>
                                        <div className="text-2xl font-black text-[#2076C7]">₹{fmt(emi)}</div>
                                    </div>
                                </div>

                                <div className="bg-slate-50/50 rounded-[2.5rem] border border-blue-100/50 p-6 sm:p-8 shadow-sm flex-grow flex flex-col">
                                    <div className="flex flex-col items-center justify-center mb-6">
                                        <h3 className="text-2xl font-extrabold text-[#2076C7] tracking-tight text-center">EMI Summary</h3>
                                        <div className="w-12 h-1 bg-[#2076C7]/20 rounded-full mt-2" />
                                    </div>
                                    <div className="space-y-4 mb-6">
                                        <div className="flex justify-between items-center py-2 border-b border-slate-100">
                                            <span className="text-sm font-bold text-slate-500">Transaction Value</span>
                                            <span className="text-lg md:text-xl font-extrabold text-[#1CADA3]">₹{fmt(loanAmount)}</span>
                                        </div>
                                        <div className="flex justify-between items-center py-2 border-b border-slate-100">
                                            <span className="text-sm font-bold text-slate-500">Interest Payable</span>
                                            <span className="text-lg md:text-xl font-extrabold text-[#1CADA3]">₹{fmt(totalInterest)}</span>
                                        </div>
                                        <div className="flex justify-between items-center py-2">
                                            <span className="text-sm font-bold text-slate-500">Total Payable</span>
                                            <span className="text-lg md:text-xl font-extrabold text-[#1CADA3]">₹{fmt(totalPayment)}</span>
                                        </div>
                                    </div>
                                    <button onClick={onApplyClick} className="w-full mt-auto py-6 bg-gradient-to-r from-[#2076C7] to-[#1CADA3] text-white rounded-2xl font-black uppercase tracking-widest text-sm md:text-base shadow-[0_20px_40px_-10px_rgba(32,118,199,0.3)] hover:shadow-[0_25px_50px_-10px_rgba(32,118,199,0.4)] hover:-translate-y-1.5 transition-all duration-500 group" > Apply For Credit Card <IconArrowRight size={16} className="inline-block ml-3 group-hover:translate-x-1.5 transition-transform" /> </button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <style jsx>{`
                input[type='range']::-webkit-slider-thumb { -webkit-appearance: none; appearance: none; width: 18px; height: 18px; background: #2076C7; border: 3px solid #fff; border-radius: 50%; cursor: pointer; box-shadow: 0 4px 8px rgba(32, 118, 199, 0.2); transition: all 0.3s ease; }
                input[type='range']::-webkit-slider-thumb:hover { transform: scale(1.15); box-shadow: 0 5px 12px rgba(32, 118, 199, 0.3); }
                input::-webkit-outer-spin-button, input::-webkit-inner-spin-button { -webkit-appearance: none; margin: 0; }
                input[type=number] { -moz-appearance: textfield; }
            `}</style>
        </section>
    );
}