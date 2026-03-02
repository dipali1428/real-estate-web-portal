'use client';

import { motion } from 'framer-motion';
import { useState, useEffect } from 'react';
import { IconChevronLeft, IconChevronRight, IconCalculator, IconCurrencyRupee, IconInfoCircle, IconChevronDown, IconChevronUp, IconBuildingBank, IconArrowRight } from '@tabler/icons-react';

export default function EMICalculator({ onApplyClick }: { onApplyClick: () => void }) {
    const [loanAmount, setLoanAmount] = useState(500000);
    const [interestRate, setInterestRate] = useState(8.5);
    const [tenure, setTenure] = useState(10);
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

    const fmt = (n: number) =>
        new Intl.NumberFormat('en-IN', { maximumFractionDigits: 0 }).format(n);

    const pct = (totalPayment > 0) ? (loanAmount / totalPayment) * 100 : 0;

    return (
        <section className="py-12 bg-[#fafcfe]">
            <div className="max-w-6xl mx-auto px-6 md:px-12">
                <style jsx global>{`
                    input[type='range']::-webkit-slider-thumb {
                        appearance: none;
                        width: 22px;
                        height: 22px;
                        background: #2076C7;
                        border-radius: 50%;
                        cursor: pointer;
                        border: 4px solid white;
                        box-shadow: 0 4px 12px rgba(32, 118, 199, 0.3);
                        margin-top: -9px;
                        transition: all 0.2s ease;
                    }
                    input[type='range']::-webkit-slider-thumb:hover {
                        transform: scale(1.1);
                        box-shadow: 0 6px 15px rgba(32, 118, 199, 0.4);
                    }
                    input[type='range']::-moz-range-thumb {
                        width: 22px;
                        height: 22px;
                        background: #2076C7;
                        border-radius: 50%;
                        cursor: pointer;
                        border: 4px solid white;
                        box-shadow: 0 4px 12px rgba(32, 118, 199, 0.3);
                        transition: all 0.2s ease;
                    }
                `}</style>

                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="text-center mb-10"
                >
                    <span className="inline-flex items-center gap-2 text-[#2076C7] font-black tracking-widest uppercase text-[10px] mb-4">
                        <IconCalculator size={14} />
                        EMI Calculator
                    </span>
                    <span className="inline-flex items-center gap-2 text-[#2076C7] font-black tracking-widest uppercase text-[10px] mb-4">
                        <IconCalculator size={14} />
                        EMI Calculator
                    </span>
                    <h2 className="text-3xl md:text-4xl font-extrabold mb-4 bg-gradient-to-r from-[#2076C7] to-[#1CADA3] bg-clip-text text-transparent">
                        Plan Your Repayment
                    </h2>
                    <p className="text-slate-400 max-w-xl mx-auto font-bold text-sm">
                        Estimate your monthly EMI instantly. Rates starting from 8.5% p.a. — final rate depends on your profile.
                    </p>
                </motion.div>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-center">

                    {/* Sliders */}
                    <motion.div
                        initial={{ opacity: 0, x: -30 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        className="bg-white rounded-[2.5rem] p-8 border border-blue-50 shadow-[0_32px_64px_-16px_rgba(32,118,199,0.08)] space-y-8"
                    >
                        {/* Loan Amount */}
                        <div>
                            <div className="flex justify-between items-center mb-4">
                                <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Loan Amount</label>
                                <div className="flex items-center gap-2 bg-blue-50/40 p-1 rounded-2xl border border-blue-100/50">
                                    <button
                                        onClick={() => setLoanAmount(Math.max(10000, loanAmount - 10000))}
                                        className="w-8 h-8 rounded-xl bg-white text-[#2076C7] flex items-center justify-center hover:bg-[#2076C7] hover:text-white shadow-sm transition-all active:scale-90"
                                    >
                                        <IconChevronLeft size={18} strokeWidth={3} />
                                    </button>
                                    <span className="text-sm font-black text-slate-700 min-w-[100px] text-center">₹{fmt(loanAmount)}</span>
                                    <button
                                        onClick={() => setLoanAmount(Math.min(15000000, loanAmount + 10000))}
                                        className="w-8 h-8 rounded-xl bg-white text-[#2076C7] flex items-center justify-center hover:bg-[#2076C7] hover:text-white shadow-sm transition-all active:scale-90"
                                    >
                                        <IconChevronRight size={18} strokeWidth={3} />
                                    </button>
                                </div>
                            </div>
                            <input
                                type="range" min="10000" max="15000000" step="10000"
                                value={loanAmount}
                                onChange={e => setLoanAmount(Number(e.target.value))}
                                className="w-full h-1.5 rounded-full appearance-none border border-slate-100 cursor-pointer"
                                style={{
                                    background: `linear-gradient(to right, #2076C7 0%, #2076C7 ${((loanAmount - 10000) / (15000000 - 10000)) * 100}%, #f8fafc ${((loanAmount - 10000) / (15000000 - 10000)) * 100}%, #f8fafc 100%)`
                                }}
                            />
                            <div className="flex justify-between mt-2 text-[9px] font-black text-slate-300 uppercase tracking-widest">
                                <span>₹10K</span><span>₹1.5 Cr</span>
                            </div>
                        </div>

                        {/* Interest Rate */}
                        <div>
                            <div className="flex justify-between items-center mb-4">
                                <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Interest Rate (p.a.)</label>
                                <div className="flex items-center gap-2 bg-blue-50/40 p-1 rounded-2xl border border-blue-100/50">
                                    <button
                                        onClick={() => setInterestRate(Math.max(8.5, Number((interestRate - 0.1).toFixed(1))))}
                                        className="w-8 h-8 rounded-xl bg-white text-[#2076C7] flex items-center justify-center hover:bg-[#2076C7] hover:text-white shadow-sm transition-all active:scale-90"
                                    >
                                        <IconChevronLeft size={18} strokeWidth={3} />
                                    </button>
                                    <span className="text-sm font-black text-slate-700 min-w-[60px] text-center">{interestRate.toFixed(1)}%</span>
                                    <button
                                        onClick={() => setInterestRate(Math.min(18, Number((interestRate + 0.1).toFixed(1))))}
                                        className="w-8 h-8 rounded-xl bg-white text-[#2076C7] flex items-center justify-center hover:bg-[#2076C7] hover:text-white shadow-sm transition-all active:scale-90"
                                    >
                                        <IconChevronRight size={18} strokeWidth={3} />
                                    </button>
                                </div>
                            </div>
                            <input
                                type="range" min="8.5" max="18" step="0.1"
                                value={interestRate}
                                onChange={e => setInterestRate(Number(e.target.value))}
                                className="w-full h-1.5 rounded-full appearance-none border border-slate-100 cursor-pointer"
                                style={{
                                    background: `linear-gradient(to right, #2076C7 0%, #2076C7 ${((interestRate - 8.5) / (18 - 8.5)) * 100}%, #f8fafc ${((interestRate - 8.5) / (18 - 8.5)) * 100}%, #f8fafc 100%)`
                                }}
                            />
                            <div className="flex justify-between mt-2 text-[9px] font-black text-slate-300 uppercase tracking-widest">
                                <span>8.5%</span><span>18%</span>
                            </div>
                        </div>

                        {/* Tenure */}
                        <div>
                            <div className="flex justify-between items-center mb-4">
                                <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Repayment Tenure</label>
                                <div className="flex items-center gap-2 bg-blue-50/40 p-1 rounded-2xl border border-blue-100/50">
                                    <button
                                        onClick={() => setTenure(Math.max(1, tenure - 1))}
                                        className="w-8 h-8 rounded-xl bg-white text-[#2076C7] flex items-center justify-center hover:bg-[#2076C7] hover:text-white shadow-sm transition-all active:scale-90"
                                    >
                                        <IconChevronLeft size={18} strokeWidth={3} />
                                    </button>
                                    <span className="text-sm font-black text-slate-700 min-w-[80px] text-center">{tenure} Years</span>
                                    <button
                                        onClick={() => setTenure(Math.min(20, tenure + 1))}
                                        className="w-8 h-8 rounded-xl bg-white text-[#2076C7] flex items-center justify-center hover:bg-[#2076C7] hover:text-white shadow-sm transition-all active:scale-90"
                                    >
                                        <IconChevronRight size={18} strokeWidth={3} />
                                    </button>
                                </div>
                            </div>
                            <input
                                type="range" min="1" max="20" step="1"
                                value={tenure}
                                onChange={e => setTenure(Number(e.target.value))}
                                className="w-full h-1.5 rounded-full appearance-none border border-slate-100 cursor-pointer"
                                style={{
                                    background: `linear-gradient(to right, #2076C7 0%, #2076C7 ${((tenure - 1) / (20 - 1)) * 100}%, #f8fafc ${((tenure - 1) / (20 - 1)) * 100}%, #f8fafc 100%)`
                                }}
                            />
                            <div className="flex justify-between mt-2 text-[9px] font-black text-slate-300 uppercase tracking-widest">
                                <span>1 Yr</span><span>20 Yrs</span>
                            </div>
                        </div>

                        {/* Integrated CTA */}
                        <div className="pt-4 mt-4 border-t border-slate-50">
                            <button 
                                onClick={onApplyClick}
                                className="group relative flex items-center justify-center gap-3 w-full px-6 py-4 bg-gradient-to-r from-[#2076C7] to-[#1CADA3] text-white rounded-2xl font-black uppercase tracking-[0.15em] text-[10px] shadow-[0_12px_24px_-8px_rgba(32,118,199,0.3)] hover:shadow-[0_16px_32px_-8px_rgba(32,118,199,0.4)] hover:-translate-y-0.5 transition-all duration-300"
                            >
                                Apply For This Loan Now
                                <IconArrowRight size={14} strokeWidth={3} className="group-hover:translate-x-1 transition-transform" />
                            </button>
                        </div>
                    </motion.div>

                    {/* Result */}
                    <motion.div
                        initial={{ opacity: 0, x: 30 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        className="space-y-6"
                    >
                        {/* EMI Display */}
                        <div className="bg-gradient-to-br from-[#2076C7]/15 via-[#2076C7]/5 to-[#1CADA3]/10 rounded-[2.5rem] p-10 text-center shadow-[0_32px_64px_-16px_rgba(32,118,199,0.1)] border border-blue-200/40 group relative overflow-hidden">
                            <div className="absolute top-0 right-0 w-32 h-32 bg-[#2076C7]/10 rounded-full -translate-y-1/2 translate-x-1/2 blur-2xl" />
                            <p className="text-[#2076C7]/70 font-black text-[10px] uppercase tracking-widest mb-3 relative z-10">Estimated Monthly EMI</p>
                            <p className="text-5xl md:text-6xl font-extrabold tracking-tight mb-2 text-[#2076C7] relative z-10">₹{fmt(emi)}</p>
                            <div className="inline-flex items-center gap-2 px-4 py-1.5 bg-white/60 rounded-full text-[10px] font-black text-[#2076C7] border border-[#2076C7]/20 relative z-10">
                                Repayment for {tenure} years
                            </div>
                        </div>

                        {/* Breakdown */}
                        <div className="bg-white rounded-[2.5rem] p-8 border border-blue-50 shadow-sm space-y-6">
                            {/* Visual bar */}
                            <div className="flex rounded-full overflow-hidden h-4 bg-slate-50 border border-slate-100">
                                <div className="bg-gradient-to-r from-[#2076C7] to-[#2076C7]/80 transition-all duration-500 rounded-full" style={{ width: `${pct}%` }} />
                            </div>
                            <div className="flex justify-between text-[9px] font-black uppercase tracking-widest px-1">
                                <span className="text-[#2076C7]">Principal Amount ({pct.toFixed(0)}%)</span>
                                <span className="text-slate-300">Interest Component ({(100 - pct).toFixed(0)}%)</span>
                            </div>

                            <div className="space-y-4 pt-2">
                                <div className="flex justify-between items-center px-2">
                                    <div className="flex items-center gap-3">
                                        <div className="w-2.5 h-2.5 rounded-full bg-[#2076C7] shadow-sm" />
                                        <span className="text-xs font-bold text-slate-500">Principal Amount</span>
                                    </div>
                                    <span className="text-sm font-black text-slate-700">₹{fmt(loanAmount)}</span>
                                </div>
                                <div className="flex justify-between items-center px-2">
                                    <div className="flex items-center gap-3">
                                        <div className="w-2.5 h-2.5 rounded-full bg-slate-200" />
                                        <span className="text-xs font-bold text-slate-500">Total Interest</span>
                                    </div>
                                    <span className="text-sm font-bold text-slate-500">₹{fmt(totalInterest)}</span>
                                </div>
                                <div className="flex justify-between items-center pt-5 border-t border-slate-50 px-2">
                                    <div className="flex items-center gap-3">
                                        <div className="w-8 h-8 rounded-xl bg-blue-50 flex items-center justify-center">
                                            <IconCurrencyRupee size={16} className="text-[#2076C7]" />
                                        </div>
                                        <span className="text-xs font-black text-slate-600 uppercase tracking-tight">Total Payment Due</span>
                                    </div>
                                    <span className="text-lg font-black text-[#2076C7]">₹{fmt(totalPayment)}</span>
                                </div>
                            </div>
                        </div>

                        <div className="flex items-start gap-2 text-[10px] font-bold text-slate-400 px-4">
                            <IconInfoCircle size={14} className="text-blue-300 shrink-0 mt-0.5" />
                            <p className="leading-relaxed">* Indicative EMI only. Final terms subject to credit appraisal and bank policy.</p>
                        </div>
                    </motion.div>
                </div>

                {/* Partner Banks Section */}
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="mt-20 relative"
                >
                    {/* Decorative Background Elements */}
                    <div className="absolute -top-10 -left-10 w-40 h-40 bg-[#2076C7]/5 rounded-full blur-3xl" />
                    <div className="absolute -bottom-10 -right-10 w-40 h-40 bg-[#1CADA3]/5 rounded-full blur-3xl" />

                    <div className="relative bg-white/70 backdrop-blur-xl rounded-[3rem] p-10 border border-white shadow-[0_32px_80px_-16px_rgba(32,118,199,0.08)] overflow-hidden">
                        {/* Mesh gradient overlay */}
                        <div className="absolute inset-0 bg-gradient-to-br from-[#2076C7]/[0.02] via-transparent to-[#1CADA3]/[0.02] pointer-events-none" />

                        <div className="relative z-10 flex flex-col md:flex-row justify-between items-center mb-10 gap-6 text-center md:text-left">
                            <div>
                                <h3 className="text-2xl font-black mb-2 flex items-center justify-center md:justify-start bg-gradient-to-r from-[#2076C7] to-[#1CADA3] bg-clip-text text-transparent">
                                    Our Partner Banks & HFCs
                                </h3>
                                <p className="text-[10px] font-black text-[#2076C7] uppercase tracking-[0.2em] opacity-70 border-l-2 border-[#1CADA3] pl-3 md:block hidden">Widest Network for the Most Competitive Rates</p>
                                <p className="text-[10px] font-black text-[#2076C7] uppercase tracking-[0.2em] opacity-70 md:hidden">Widest Network for the Most Competitive Rates</p>
                            </div>
                            <button
                                onClick={() => setShowAllBanks(!showAllBanks)}
                                className="group relative inline-flex items-center gap-3 px-8 py-3 bg-blue-50 text-[#2076C7] rounded-full text-[11px] font-black uppercase tracking-widest shadow-lg shadow-blue-100/50 hover:shadow-[#2076C7]/20 transition-all active:scale-95 overflow-hidden border border-blue-100"
                            >
                                <span className="absolute inset-0 bg-gradient-to-r from-[#2076C7] to-[#1CADA3] opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                                <span className="relative flex items-center gap-2 group-hover:text-white transition-colors duration-300">
                                    {showAllBanks ? 'Show Fewer Banks' : 'View All 18 Partners'}
                                    <motion.div
                                        animate={{ rotate: showAllBanks ? 180 : 0 }}
                                        transition={{ duration: 0.3 }}
                                    >
                                        <IconChevronDown size={14} strokeWidth={3} />
                                    </motion.div>
                                </span>
                            </button>
                        </div>

                        <div className="relative z-10 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
                            {PARTNER_BANKS.slice(0, showAllBanks ? PARTNER_BANKS.length : 8).map((bank, i) => (
                                <motion.div
                                    key={bank.name}
                                    initial={{ opacity: 0, y: 20 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ delay: i * 0.03 }}
                                    className="group relative flex items-center gap-4 p-5 rounded-3xl bg-white border border-slate-100 hover:border-[#2076C7]/20 hover:shadow-[0_20px_40px_-12px_rgba(32,118,199,0.1)] transition-all duration-300 cursor-default"
                                >
                                    <div className={`flex-shrink-0 p-2 rounded-xl transition-all duration-300 ${bank.bg} ${bank.text}`}>
                                        <IconBuildingBank size={18} strokeWidth={2.5} />
                                    </div>
                                    <span className="text-[10px] font-black text-slate-500 group-hover:text-slate-900 uppercase tracking-wider leading-relaxed transition-colors duration-300">{bank.name}</span>

                                    {/* Subtle hover background highlight */}
                                    <div className="absolute inset-0 rounded-3xl bg-gradient-to-br from-[#2076C7]/[0.02] to-[#1CADA3]/[0.02] opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none" />
                                </motion.div>
                            ))}
                        </div>
                    </div>
                </motion.div>
            </div>
        </section>
    );
}


const PARTNER_BANKS = [
    { name: "AVANSE FINANCIAL SERVICES", bg: "bg-blue-50", text: "text-blue-600" },
    { name: "AUXILO FINSERVE PRIVATE LTD", bg: "bg-teal-50", text: "text-teal-600" },
    { name: "AXIS BANK", bg: "bg-red-50", text: "text-red-600" },
    { name: "BANK OF BARODA", bg: "bg-orange-50", text: "text-orange-600" },
    { name: "BANK OF INDIA", bg: "bg-indigo-50", text: "text-indigo-600" },
    { name: "BANK OF MAHARASHTRA", bg: "bg-slate-50", text: "text-slate-600" },
    { name: "CENTRAL BANK OF INDIA", bg: "bg-blue-50", text: "text-blue-500" },
    { name: "HDFC CREDILA", bg: "bg-purple-50", text: "text-purple-600" },
    { name: "INCRED", bg: "bg-orange-50", text: "text-orange-500" },
    { name: "TATA CAPITAL", bg: "bg-blue-50", text: "text-blue-700" },
    { name: "IDFC FIRST BANK INTERNATIONAL", bg: "bg-red-50", text: "text-red-700" },
    { name: "UBI SERVICES", bg: "bg-blue-50", text: "text-blue-800" },
    { name: "ICICI BANK", bg: "bg-orange-50", text: "text-orange-700" },
    { name: "SVC Cooperative Bank", bg: "bg-teal-50", text: "text-teal-700" },
    { name: "YES BANK", bg: "bg-blue-100", text: "text-blue-900" },
    { name: "SARASWAT BANK", bg: "bg-slate-100", text: "text-slate-800" },
    { name: "INSTITUTIONAL LEDING (SCHOOL FUNDING)", bg: "bg-purple-100", text: "text-purple-800" },
    { name: "EDUCATION CONSULTANCY OFFER LETTER", bg: "bg-teal-100", text: "text-teal-800" }
];

