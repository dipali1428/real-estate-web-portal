'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
    IconCheck, IconInfoCircle, 
    IconPercentage, IconShieldCheck, IconX, IconArrowLeft
} from '@tabler/icons-react';
import { marketPlans,  MarketPlan } from '../data/MarketPlansData';

export default function MarketComparison({ onApplyClick }: { onApplyClick?: () => void }) {
    const [activeCategory, setActiveCategory] = useState<'All' | 'NBFC' | 'Private' | 'PSU' | 'Co-operative'>('All');
    const [selectedBank, setSelectedBank] = useState<MarketPlan | null>(null);

    const filteredPlans = activeCategory === 'All' 
        ? marketPlans 
        : marketPlans.filter(plan => plan.category === activeCategory);

    return (
        <div className="space-y-8 pt-8 pb-0 overflow-hidden">
            {/* --- Main Interactive Section --- */}
            <div className="space-y-6 relative min-h-[300px]">
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 px-4">
                    <div>
                        <h3 className="text-xl font-black text-slate-800 tracking-tight">Choose Your Preferred Lender</h3>
                        <p className="text-slate-500 font-medium text-sm mt-1">Click a moving card to view details</p>
                    </div>

                    <div className="flex items-center gap-2 p-1 bg-slate-100 rounded-2xl overflow-x-auto scrollbar-hide">
                        {(['All', 'NBFC', 'Private', 'PSU', 'Co-operative'] as const).map((cat) => (
                            <button
                                key={cat}
                                onClick={() => {
                                    setActiveCategory(cat);
                                    setSelectedBank(null);
                                }}
                                className={`px-5 py-2 rounded-xl text-[10px] font-black uppercase tracking-widest transition-all whitespace-nowrap ${
                                    activeCategory === cat ? 'bg-white text-[#2076C7] shadow-sm' : 'text-slate-400 hover:text-slate-600'
                                }`}
                            >
                                {cat}
                            </button>
                        ))}
                    </div>
                </div>

                {/* --- INFINITE MARQUEE --- */}
                <div className="relative w-full overflow-hidden py-10">
                    <div className="absolute inset-y-0 left-0 w-32 bg-gradient-to-r from-white to-transparent z-10 pointer-events-none" />
                    <div className="absolute inset-y-0 right-0 w-32 bg-gradient-to-l from-white to-transparent z-10 pointer-events-none" />
                    
                    <motion.div 
                        className="flex gap-12 whitespace-nowrap" // Increased gap from 6 to 12
                        animate={{ x: ["0%", "-50%"] }}
                        transition={{ 
                            duration: 30, // Faster loop for more energy
                            ease: "linear", 
                            repeat: Infinity 
                        }}
                        style={{ width: "fit-content" }}
                        whileHover={{ animationPlayState: "paused" }}
                    >
                        {/* Render double the list for seamless loop */}
                        {[...filteredPlans, ...filteredPlans].map((plan, i) => (
                            <motion.div
                                key={`${plan.id}-${i}`}
                                onClick={() => setSelectedBank(plan)}
                                className={`flex flex-col items-center justify-center p-8 bg-white border-2 rounded-[2.5rem] cursor-pointer transition-all hover:shadow-2xl shrink-0 min-w-[220px] md:min-w-[260px] ${
                                    selectedBank?.id === plan.id ? 'border-[#2076C7] shadow-xl scale-105' : 'border-slate-50 hover:border-blue-100'
                                }`}
                            >
                                <div className="w-20 h-20 mb-5 flex items-center justify-center p-3 rounded-3xl bg-slate-50/80 group-hover:bg-white transition-colors">
                                    <img 
                                        src={plan.logo} 
                                        alt={plan.name} 
                                        className="w-full h-full object-contain transition-all duration-500"
                                    />
                                </div>
                                <h4 className="text-xs md:text-sm font-black text-slate-800 text-center leading-tight px-2">
                                    {plan.name}
                                </h4>
                            </motion.div>
                        ))}
                    </motion.div>
                </div>

                {/* --- DETAIL PANEL (ANIMATED) --- */}
                <AnimatePresence>
                    {selectedBank && (
                        <motion.div
                            initial={{ opacity: 0, y: 40 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: 40 }}
                            className="mt-12 bg-white rounded-[2.5rem] md:rounded-[3rem] border-2 border-[#2076C7]/20 shadow-2xl overflow-hidden relative"
                        >
                            <button 
                                onClick={() => setSelectedBank(null)}
                                className="absolute top-6 right-6 p-2 rounded-full hover:bg-slate-100 transition-colors text-slate-400 group z-10"
                            >
                                <IconX size={20} className="group-hover:rotate-90 transition-transform" />
                            </button>

                            <div className="grid grid-cols-1 md:grid-cols-3">
                                {/* Left Content */}
                                <div className="md:col-span-2 p-8 md:p-12 border-b md:border-b-0 md:border-r border-slate-100">
                                    <div className="flex items-center gap-6 mb-10">
                                        <div className="w-20 h-20 p-4 rounded-3xl bg-slate-50 border border-slate-100 flex items-center justify-center">
                                            <img src={selectedBank.logo} alt={selectedBank.name} className="w-full h-full object-contain" />
                                        </div>
                                        <div>
                                            <div className="flex items-center gap-2 mb-1">
                                                <span className="px-3 py-1 bg-blue-50 text-[#2076C7] text-[10px] font-black uppercase tracking-widest rounded-full">
                                                    {selectedBank.category}
                                                </span>
                                                <span className="px-3 py-1 bg-emerald-50 text-emerald-600 text-[10px] font-black uppercase tracking-widest rounded-full">
                                                    Direct tie-up
                                                </span>
                                            </div>
                                            <h3 className="text-2xl md:text-3xl font-black text-slate-800 tracking-tight">{selectedBank.name}</h3>
                                        </div>
                                    </div>

                                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-8 mb-10">
                                        <div className="space-y-6">
                                            <div className="flex items-start gap-4">
                                                <div className="w-10 h-10 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center shrink-0 border border-emerald-100 shadow-sm">
                                                    <IconPercentage size={20} strokeWidth={2.5} />
                                                </div>
                                                <div>
                                                    <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1 leading-none">Market Interest Rate</p>
                                                    <p className="text-lg font-black text-slate-800">{selectedBank.interest}</p>
                                                    <p className="text-[10px] font-bold text-slate-400">Indicative rates for major courses</p>
                                                </div>
                                            </div>
                                            <div className="flex items-start gap-4">
                                                <div className="w-10 h-10 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center shrink-0 border border-blue-100 shadow-sm">
                                                    <IconShieldCheck size={20} strokeWidth={2.5} />
                                                </div>
                                                <div>
                                                    <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1 leading-none">Loan Amount & Limit</p>
                                                    <p className="text-lg font-black text-slate-800">{selectedBank.loanAmount}</p>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="space-y-6">
                                            <div className="p-5 bg-slate-50 rounded-2xl border border-slate-100 relative overflow-hidden group/usp">
                                                <div className="absolute top-0 left-0 w-1 h-full bg-[#2076C7] transition-all group-hover/usp:w-1.5" />
                                                <p className="text-[9px] font-black text-[#2076C7] uppercase tracking-widest mb-2 flex items-center gap-1.5">
                                                    <IconCheck size={12} strokeWidth={3} /> Core Advantage (USP)
                                                </p>
                                                <p className="text-sm font-bold text-slate-600 leading-relaxed italic">{selectedBank.usp}</p>
                                            </div>
                                            {selectedBank.extra && (
                                                <div className="flex items-center gap-3 px-4 py-3 bg-amber-50 rounded-2xl border border-amber-100">
                                                    <IconInfoCircle className="text-amber-500 shrink-0" size={18} />
                                                    <p className="text-[11px] font-black text-amber-900 leading-tight underline decoration-amber-200 underline-offset-4">{selectedBank.extra}</p>
                                                </div>
                                            )}
                                        </div>
                                    </div>

                                    <div className="flex items-center">
                                        <button 
                                            onClick={onApplyClick}
                                            className="px-8 py-4 bg-gradient-to-r from-[#2076C7] to-[#1CADA3] text-white rounded-2xl font-black text-xs uppercase tracking-widest shadow-xl shadow-blue-200 hover:scale-[1.02] active:scale-95 transition-all"
                                        >
                                            Check Eligibility with {selectedBank.name.split(' ')[0]}
                                        </button>
                                    </div>
                                </div>

                                {/* Right Panel / Highlights */}
                                <div className="p-8 md:p-12 bg-slate-50/50 flex flex-col justify-center">
                                    <h4 className="text-[10px] font-black text-[#1CADA3] uppercase tracking-widest mb-6">Expert Verdict</h4>
                                    <div className="space-y-6">
                                        <div>
                                            <p className="text-xs font-black text-slate-800 mb-1 leading-none">Ideal Candidate</p>
                                            <p className="text-sm font-bold text-slate-500">{selectedBank.bestFor}</p>
                                        </div>
                                        <div className="pt-6 border-t border-slate-100">
                                            <div className="flex items-center justify-between mb-4">
                                                <span className="text-[10px] font-black text-slate-400 uppercase">Speed</span>
                                                <div className="flex gap-1">
                                                    {[1,2,3,4,5].map(star => (
                                                        <div key={star} className={`w-1.5 h-1.5 rounded-full ${star <= (selectedBank.category === 'NBFC' ? 5 : 3) ? 'bg-[#2076C7]' : 'bg-slate-200'}`} />
                                                    ))}
                                                </div>
                                            </div>
                                            <div className="flex items-center justify-between mb-4">
                                                <span className="text-[10px] font-black text-slate-400 uppercase">Process</span>
                                                <span className="text-[10px] font-black text-slate-800 uppercase">Digital First</span>
                                            </div>
                                            <div className="flex items-center justify-between">
                                                <span className="text-[10px] font-black text-slate-400 uppercase">Collateral</span>
                                                <span className="text-[10px] font-black text-slate-800 uppercase">{selectedBank.category === 'NBFC' ? 'Not Required' : 'Cases Basis'}</span>
                                            </div>
                                        </div>
                                    </div>
                                    <button 
                                        onClick={() => setSelectedBank(null)}
                                        className="mt-10 group flex items-center gap-2 text-[10px] font-black text-[#2076C7] uppercase tracking-[0.2em] hover:gap-3 transition-all"
                                    >
                                        <IconArrowLeft size={16} /> Back to Lenders
                                    </button>
                                </div>
                            </div>
                        </motion.div>
                    )}
                </AnimatePresence>
            </div>
        </div>
    );
}