'use client';

import { motion } from 'framer-motion';
import { useState, useEffect } from 'react';
import {
    IconArrowRight,
    IconBuildingBank,
    IconChevronDown,
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

export default function EMICalculator({ onApplyClick }: { onApplyClick: () => void }) {
    const [loanAmount, setLoanAmount] = useState(1000000);
    const [interestRate, setInterestRate] = useState(8.5);
    const [tenure, setTenure] = useState(20);
    const [emi, setEmi] = useState(0);
    const [totalInterest, setTotalInterest] = useState(0);
    const [totalPayment, setTotalPayment] = useState(0);
    const [showAllBanks, setShowAllBanks] = useState(false);

    useEffect(() => {
        const r = interestRate / 100 / 12;
        const n = tenure * 12;
        if (r === 0) {
            setEmi(loanAmount / n);
            setTotalPayment(loanAmount);
            setTotalInterest(0);
        } else {
            const e = (loanAmount * r * Math.pow(1 + r, n)) / (Math.pow(1 + r, n) - 1);
            setEmi(e);
            setTotalPayment(e * n);
            setTotalInterest(e * n - loanAmount);
        }
    }, [loanAmount, interestRate, tenure]);

    const chartData = [
        { name: 'Principal', value: loanAmount },
        { name: 'Interest', value: totalInterest },
    ];

    const COLORS = ['#2076C7', '#1CADA3'];

    const fmt = (n: number) =>
        new Intl.NumberFormat('en-IN', { maximumFractionDigits: 0 }).format(n);

    // Dynamic slider filling style generator
    const getSliderStyle = (value: number, min: number, max: number) => {
        const percentage = ((value - min) / (max - min)) * 100;
        return {
            background: `linear-gradient(to right, #2076C7 0%, #1CADA3 ${percentage}%, #f1f5f9 ${percentage}%, #f1f5f9 100%)`
        };
    };

    return (
        <section className="py-10 md:py-20 bg-white">
            <div className="max-w-[1440px] mx-auto px-6">
                <div className="bg-white rounded-[2.5rem] shadow-[0_40px_100px_-20px_rgba(0,0,0,0.1)] border border-slate-100 overflow-hidden">
                    {/* Standardized Header */}
                    <div className="bg-white border-b border-slate-50 py-10 px-6 text-center">
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                        >
                            <h2 className="text-3xl md:text-4xl font-extrabold mb-6 bg-linear-to-r from-[#2076C7] to-[#1CADA3] bg-clip-text text-transparent drop-shadow-sm tracking-tight leading-tight">
                                Education Loan EMI Calculator
                            </h2>
                            <div className="w-24 h-1 bg-gradient-to-r from-[#2076C7] via-[#1CADA3] to-[#2076C7] mx-auto rounded-full mb-6 opacity-30" />
                            <p className="text-gray-600 max-w-2xl mx-auto font-medium text-base md:text-lg leading-relaxed">Calculate your Equated Monthly Installment</p>
                        </motion.div>
                    </div>

                    <div className="p-6 lg:p-10">
                        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                            {/* Left Column: Controls */}
                            <div className="space-y-8 lg:pr-8 lg:border-r border-slate-100">
                                {/* Loan Amount */}
                                <div className="space-y-6">
                                    <label className="block text-base md:text-lg font-extrabold text-[#2076C7]">Loan Amount (₹)</label>
                                    <div className="relative pt-1">
                                        <input
                                            type="range"
                                            min="100000"
                                            max="50000000"
                                            step="50000"
                                            value={loanAmount}
                                            onChange={(e) => setLoanAmount(Number(e.target.value))}
                                            className="w-full h-2 rounded-lg appearance-none cursor-pointer accent-[#2076C7] transition-all"
                                            style={getSliderStyle(loanAmount, 100000, 50000000)}
                                        />
                                        <div className="flex justify-between mt-3 text-xs md:text-sm font-bold text-slate-400">
                                            <span>₹1,00,000</span>
                                            <span>₹5,00,00,000</span>
                                        </div>
                                    </div>
                                    <div className="flex items-center gap-2">
                                        <div className="relative flex-grow">
                                            <input
                                                type="number"
                                                value={loanAmount}
                                                onChange={(e) => setLoanAmount(Number(e.target.value))}
                                                className="w-full bg-slate-50 border border-slate-200 rounded-lg pl-4 pr-10 py-1.5 text-base font-extrabold text-slate-700 focus:outline-none focus:ring-4 focus:ring-[#2076C7]/5 transition-all text-center"
                                            />
                                            <span className="absolute right-10 top-1/2 -translate-y-1/2 text-slate-300 font-bold text-sm">₹</span>
                                        </div>
                                        <button
                                            onClick={() => setLoanAmount(Math.max(100000, loanAmount - 50000))}
                                            className="p-1.5 bg-slate-50 border border-slate-200 rounded-lg hover:bg-blue-50 hover:text-[#2076C7] transition-all"
                                        >
                                            <IconMinus size={14} strokeWidth={3} />
                                        </button>
                                        <button
                                            onClick={() => setLoanAmount(Math.min(50000000, loanAmount + 50000))}
                                            className="p-1.5 bg-slate-50 border border-slate-200 rounded-lg hover:bg-blue-50 hover:text-[#2076C7] transition-all"
                                        >
                                            <IconPlus size={14} strokeWidth={3} />
                                        </button>
                                    </div>
                                </div>

                                {/* Interest Rate */}
                                <div className="space-y-6">
                                    <label className="block text-base md:text-lg font-extrabold text-[#2076C7]">Interest Rate (% per annum)</label>
                                    <div className="relative pt-1">
                                        <input
                                            type="range"
                                            min="1"
                                            max="30"
                                            step="0.1"
                                            value={interestRate}
                                            onChange={(e) => setInterestRate(Number(e.target.value))}
                                            className="w-full h-2 rounded-lg appearance-none cursor-pointer accent-[#2076C7] transition-all"
                                            style={getSliderStyle(interestRate, 1, 30)}
                                        />
                                        <div className="flex justify-between mt-3 text-xs md:text-sm font-bold text-slate-400">
                                            <span>1%</span>
                                            <span>30%</span>
                                        </div>
                                    </div>
                                    <div className="flex items-center gap-2">
                                        <div className="relative flex-grow">
                                            <input
                                                type="number"
                                                value={interestRate}
                                                step="0.1"
                                                onChange={(e) => setInterestRate(Number(e.target.value))}
                                                className="w-full bg-slate-50 border border-slate-200 rounded-lg pl-4 pr-10 py-2.5 text-lg md:text-xl font-extrabold text-slate-700 focus:outline-none focus:ring-4 focus:ring-[#2076C7]/5 transition-all text-center"
                                            />
                                            <span className="absolute right-10 top-1/2 -translate-y-1/2 text-slate-300 font-bold text-base">%</span>
                                        </div>
                                        <button
                                            onClick={() => setInterestRate(Math.max(1, Number((interestRate - 0.1).toFixed(1))))}
                                            className="p-1.5 bg-slate-50 border border-slate-200 rounded-lg hover:bg-blue-50 hover:text-[#2076C7] transition-all"
                                        >
                                            <IconMinus size={14} strokeWidth={3} />
                                        </button>
                                        <button
                                            onClick={() => setInterestRate(Math.min(30, Number((interestRate + 0.1).toFixed(1))))}
                                            className="p-1.5 bg-slate-50 border border-slate-200 rounded-lg hover:bg-blue-50 hover:text-[#2076C7] transition-all"
                                        >
                                            <IconPlus size={14} strokeWidth={3} />
                                        </button>
                                    </div>
                                </div>

                                {/* Tenure */}
                                <div className="space-y-6">
                                    <label className="block text-base md:text-lg font-extrabold text-[#2076C7]">Loan Tenure (Years)</label>
                                    <div className="relative pt-1">
                                        <input
                                            type="range"
                                            min="1"
                                            max="30"
                                            step="1"
                                            value={tenure}
                                            onChange={(e) => setTenure(Number(e.target.value))}
                                            className="w-full h-2 rounded-lg appearance-none cursor-pointer accent-[#2076C7] transition-all"
                                            style={getSliderStyle(tenure, 1, 30)}
                                        />
                                        <div className="flex justify-between mt-3 text-xs md:text-sm font-bold text-slate-400">
                                            <span>1 Year</span>
                                            <span>30 Years</span>
                                        </div>
                                    </div>
                                    <div className="flex items-center gap-2">
                                        <div className="relative flex-grow">
                                            <input
                                                type="number"
                                                value={tenure}
                                                onChange={(e) => setTenure(Number(e.target.value))}
                                                className="w-full bg-slate-50 border border-slate-200 rounded-lg pl-4 pr-10 py-2.5 text-lg md:text-xl font-extrabold text-slate-700 focus:outline-none focus:ring-4 focus:ring-[#2076C7]/5 transition-all text-center"
                                            />
                                            <span className="absolute right-10 top-1/2 -translate-y-1/2 text-slate-300 font-bold text-base">Y</span>
                                        </div>
                                        <button
                                            onClick={() => setTenure(Math.max(1, tenure - 1))}
                                            className="p-1.5 bg-slate-50 border border-slate-200 rounded-lg hover:bg-blue-50 hover:text-[#2076C7] transition-all"
                                        >
                                            <IconMinus size={14} strokeWidth={3} />
                                        </button>
                                        <button
                                            onClick={() => setTenure(Math.min(30, tenure + 1))}
                                            className="p-1.5 bg-slate-50 border border-slate-200 rounded-lg hover:bg-blue-50 hover:text-[#2076C7] transition-all"
                                        >
                                            <IconPlus size={14} strokeWidth={3} />
                                        </button>
                                    </div>
                                </div>

                                {/* EMI Highlight Box */}
                                <div className="p-6 sm:p-8 rounded-[2.5rem] border-2 border-[#1CADA3]/20 bg-gradient-to-br from-[#1CADA3]/5 to-transparent text-center shadow-sm">
                                    <div className="text-5xl font-extrabold text-[#1CADA3] mb-4 tracking-tight">₹{fmt(emi)}</div>
                                    <div className="grid grid-cols-2 gap-8 border-t border-[#1CADA3]/10 pt-4">
                                        <div>
                                            <div className="text-base md:text-lg font-extrabold text-[#2076C7] mb-1">₹{fmt(totalPayment)}</div>
                                            <div className="text-xs font-black text-slate-400 uppercase tracking-widest">Total Payment</div>
                                        </div>
                                        <div>
                                            <div className="text-base md:text-lg font-extrabold text-[#1CADA3] mb-1">₹{fmt(totalInterest)}</div>
                                            <div className="text-xs font-black text-slate-400 uppercase tracking-widest">Total Interest</div>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            {/* Right Column: Visuals & Summary */}
                            <div className="flex flex-col">
                                {/* Donut Chart */}
                                <div className="h-[250px] md:h-[300px] w-full mb-8 relative flex items-center justify-center">
                                    <ResponsiveContainer width="100%" height="100%">
                                        <PieChart>
                                            {/* Background Track Pie */}
                                            <Pie
                                                data={[{ value: 100 }]}
                                                cx="50%"
                                                cy="50%"
                                                innerRadius="70%"
                                                outerRadius="85%"
                                                fill="#f1f5f9"
                                                dataKey="value"
                                                stroke="none"
                                                isAnimationActive={false}
                                            />
                                            {/* Data Pie (Now Thinner) */}
                                            <Pie
                                                data={chartData}
                                                cx="50%"
                                                cy="50%"
                                                innerRadius="70%"
                                                outerRadius="85%"
                                                dataKey="value"
                                                stroke="none"
                                                animationDuration={1500}
                                            >
                                                {chartData.map((entry, index) => (
                                                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                                                ))}
                                            </Pie>
                                            <Tooltip
                                                contentStyle={{ borderRadius: '1rem', border: 'none', boxShadow: '0 10px 30px rgba(0,0,0,0.1)' }}
                                                formatter={(value: any) => `₹${fmt(Number(value) || 0)}`}
                                            />
                                            <Legend
                                                verticalAlign="bottom"
                                                height={36}
                                                iconType="circle"
                                                formatter={(value) => <span className="text-xs md:text-sm font-bold text-slate-500 uppercase tracking-widest ml-1">{value}</span>}
                                            />
                                        </PieChart>
                                    </ResponsiveContainer>

                                    {/* Central Label */}
                                    <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none pb-8">
                                        <div className="text-sm font-black text-slate-400 uppercase tracking-widest mb-1">Monthly EMI</div>
                                        <div className="text-2xl font-black text-[#2076C7]">₹{fmt(emi)}</div>
                                    </div>
                                </div>

                                {/* Loan Summary Box */}
                                <div className="bg-slate-50/50 rounded-[2.5rem] border border-blue-100/50 p-6 sm:p-8 shadow-sm flex-grow flex flex-col">
                                    <div className="flex items-center gap-4 mb-6 border-l-4 border-[#2076C7] pl-5">
                                        <h3 className="text-2xl font-extrabold text-gray-700 tracking-tight">Loan Summary</h3>
                                    </div>
                                    <div className="space-y-4 mb-6">
                                        <div className="flex justify-between items-center py-2 border-b border-slate-100">
                                            <span className="text-sm font-bold text-slate-500">Principal Amount</span>
                                            <span className="text-lg md:text-xl font-extrabold text-[#1CADA3]">₹{fmt(loanAmount)}</span>
                                        </div>
                                        <div className="flex justify-between items-center py-2 border-b border-slate-100">
                                            <span className="text-sm font-bold text-slate-500">Total Interest Payable</span>
                                            <span className="text-lg md:text-xl font-extrabold text-[#1CADA3]">₹{fmt(totalInterest)}</span>
                                        </div>
                                        <div className="flex justify-between items-center py-2">
                                            <span className="text-sm font-bold text-slate-500">Total Amount Payable</span>
                                            <span className="text-lg md:text-xl font-extrabold text-[#1CADA3]">₹{fmt(totalPayment)}</span>
                                        </div>
                                    </div>

                                    {/* Moved CTA Button */}
                                    <button
                                        onClick={onApplyClick}
                                        className="w-full mt-auto py-6 bg-gradient-to-r from-[#2076C7] to-[#1CADA3] text-white rounded-2xl font-black uppercase tracking-widest text-sm md:text-base shadow-[0_20px_40px_-10px_rgba(32,118,199,0.3)] hover:shadow-[0_25px_50px_-10px_rgba(32,118,199,0.4)] hover:-translate-y-1.5 transition-all duration-500 group"
                                    >
                                        Apply For This Loan Now
                                        <IconArrowRight size={16} className="inline-block ml-3 group-hover:translate-x-1.5 transition-transform" />
                                    </button>
                                </div>

                                {/* Disclaimer Card */}
                                <div className="mt-6 p-5 bg-yellow-50/50 border border-yellow-100 rounded-[1.5rem] text-xs md:text-sm leading-relaxed text-slate-500 font-sans">
                                    <p>* Note: Figures are illustrative. Final rates and terms are subject to bank approval and eligibility. Consult our experts for precise details.</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Partner Banks (Enhanced Visibility) */}
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="mt-20 relative"
                >
                    <div className="relative bg-white/70 backdrop-blur-xl rounded-[4rem] p-8 md:p-14 border border-white shadow-[0_40px_100px_-20px_rgba(32,118,199,0.12)] overflow-hidden">
                        {/* More prominent background glow */}
                        <div className="absolute -top-24 -right-24 w-96 h-96 bg-[#1CADA3]/10 blur-[100px] rounded-full" />
                        <div className="absolute -bottom-24 -left-24 w-96 h-96 bg-[#2076C7]/10 blur-[100px] rounded-full" />

                        <div className="relative z-10 flex flex-col lg:flex-row justify-between items-center mb-14 gap-8 text-center lg:text-left">
                            <div>
                                <h3 className="text-3xl md:text-4xl font-extrabold mb-4 flex items-center justify-center lg:justify-start bg-linear-to-r from-[#2076C7] to-[#1CADA3] bg-clip-text text-transparent drop-shadow-sm tracking-tight leading-tight">
                                    Our Partner Banks & HFCs
                                </h3>
                                <p className="text-gray-600 max-w-2xl mx-auto font-medium text-base md:text-lg leading-relaxed border-l-4 border-[#1CADA3] pl-6 md:block hidden font-sans">
                                    Strategic Alliances with India's Premier Lending Institutions
                                </p>
                            </div>
                            <button
                                onClick={() => setShowAllBanks(!showAllBanks)}
                                className="group relative inline-flex items-center gap-6 px-10 py-4 bg-white text-[#2076C7] rounded-full text-base font-black shadow-2xl shadow-blue-100/50 hover:shadow-[#2076C7]/30 transition-all active:scale-95 border border-blue-50"
                            >
                                <span className="absolute inset-0 bg-gradient-to-r from-[#2076C7] to-[#1CADA3] opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-full" />
                                <span className="relative flex items-center gap-3 group-hover:text-white transition-colors duration-300">
                                    {showAllBanks ? 'Show Fewer Banks' : 'View All 18 Partners'}
                                    <motion.div animate={{ rotate: showAllBanks ? 180 : 0 }} transition={{ duration: 0.3 }}>
                                        <IconChevronDown size={16} strokeWidth={3} />
                                    </motion.div>
                                </span>
                            </button>
                        </div>

                        <div className="relative z-10 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                            {PARTNER_BANKS.slice(0, showAllBanks ? PARTNER_BANKS.length : 8).map((bank, i) => (
                                <motion.div
                                    key={bank.name}
                                    initial={{ opacity: 0, y: 15 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ delay: i * 0.03 }}
                                    className="group relative flex items-center gap-3 sm:gap-4 md:gap-5 px-4 py-4 sm:px-6 sm:py-5 rounded-[2rem] bg-white/90 backdrop-blur-sm border border-blue-100 shadow-[0_8px_30px_rgb(0,0,0,0.04)] hover:border-[#1CADA3]/50 hover:shadow-[0_20px_50px_rgba(32,118,199,0.12)] hover:-translate-y-1.5 transition-all duration-500 cursor-default overflow-hidden"
                                >
                                    {/* Subtle internal glow on hover */}
                                    <div className="absolute inset-0 bg-gradient-to-br from-blue-50/0 via-transparent to-[#1CADA3]/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

                                    <div className="relative z-10 flex-shrink-0 w-14 h-14 rounded-2xl bg-gradient-to-br from-blue-50 to-white text-[#1CADA3] flex items-center justify-center shadow-lg shadow-blue-50/50 transition-all duration-500 group-hover:scale-110 group-hover:bg-gradient-to-br group-hover:from-[#1CADA3] group-hover:to-[#2076C7] group-hover:text-white">
                                        <IconBuildingBank size={28} strokeWidth={2.2} />
                                    </div>
                                    <span className="font-medium text-gray-600 text-xs md:text-sm leading-relaxed font-sans transition-colors duration-300">
                                        {bank.name}
                                    </span>
                                </motion.div>
                            ))}
                        </div>
                    </div>
                </motion.div>
            </div>

            <style jsx>{`
                input[type='range']::-webkit-slider-thumb {
                    -webkit-appearance: none;
                    appearance: none;
                    width: 18px;
                    height: 18px;
                    background: #2076C7;
                    border: 3px solid #fff;
                    border-radius: 50%;
                    cursor: pointer;
                    box-shadow: 0 4px 8px rgba(32, 118, 199, 0.2);
                    transition: all 0.3s ease;
                }
                input[type='range']::-webkit-slider-thumb:hover {
                    transform: scale(1.15);
                    box-shadow: 0 5px 12px rgba(32, 118, 199, 0.3);
                }
                /* Hide number input arrows */
                input::-webkit-outer-spin-button,
                input::-webkit-inner-spin-button {
                    -webkit-appearance: none;
                    margin: 0;
                }
                input[type=number] {
                    -moz-appearance: textfield;
                }
            `}</style>
        </section>
    );
}

const PARTNER_BANKS = [
    { name: "AVANSE FINANCIAL SERVICES", bg: "bg-cyan-50", text: "text-cyan-500" },
    { name: "AUXILO FINSERVE PRIVATE LTD", bg: "bg-cyan-50", text: "text-cyan-500" },
    { name: "AXIS BANK", bg: "bg-cyan-50", text: "text-cyan-500" },
    { name: "BANK OF BARODA", bg: "bg-cyan-50", text: "text-cyan-500" },
    { name: "BANK OF INDIA", bg: "bg-cyan-50", text: "text-cyan-500" },
    { name: "BANK OF MAHARASHTRA", bg: "bg-cyan-50", text: "text-cyan-500" },
    { name: "CENTRAL BANK OF INDIA", bg: "bg-cyan-50", text: "text-cyan-500" },
    { name: "HDFC CREDILA", bg: "bg-cyan-50", text: "text-cyan-500" },
    { name: "INCRED", bg: "bg-cyan-50", text: "text-cyan-500" },
    { name: "TATA CAPITAL", bg: "bg-cyan-50", text: "text-cyan-500" },
    { name: "IDFC FIRST BANK INTERNATIONAL", bg: "bg-cyan-50", text: "text-cyan-500" },
    { name: "UBI SERVICES", bg: "bg-cyan-50", text: "text-cyan-500" },
    { name: "ICICI BANK", bg: "bg-cyan-50", text: "text-cyan-500" },
    { name: "SVC Cooperative Bank", bg: "bg-cyan-50", text: "text-cyan-500" },
    { name: "YES BANK", bg: "bg-cyan-50", text: "text-cyan-500" },
    { name: "SARASWAT BANK", bg: "bg-cyan-50", text: "text-cyan-500" },
    { name: "INSTITUTIONAL LEDING (SCHOOL FUNDING)", bg: "bg-cyan-50", text: "text-cyan-500" },
    { name: "EDUCATION CONSULTANCY OFFER LETTER", bg: "bg-cyan-50", text: "text-cyan-500" }
];
