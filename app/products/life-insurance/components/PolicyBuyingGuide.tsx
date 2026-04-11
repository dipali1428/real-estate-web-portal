"use client";

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Calculator, Info, Target, Landmark, ChevronRight, ShieldCheck, Zap } from "lucide-react";
import Magnetic from "./Magnetic";

const tips = [
    {
        title: "Consider Liabilities",
        desc: "Factor in outstanding loans (home, car) when calculating the total sum assured needed.",
        icon: Landmark,
        color: "#1CADA3"
    },
    {
        title: "Future Milestone Inflations",
        desc: "Account for the rising costs of child education and marriage while planning coverage.",
        icon: Target,
        color: "#2076C7"
    },
    {
        title: "The Age Advantage",
        desc: "Buying early locks in lower premiums and ensures long-term affordability without high costs.",
        icon: Info,
        color: "#1CADA3"
    }
];

const PolicyBuyingGuide = () => {
    const [income, setIncome] = useState(10); // in Lakhs
    const [age, setAge] = useState(30);
    const [recommendedCover, setRecommendedCover] = useState(1.5); // in Crores
    const [isQuoteModalOpen, setIsQuoteModalOpen] = useState(false);

    useEffect(() => {
        const multiplier = age < 40 ? 15 : 10;
        setRecommendedCover((income * multiplier) / 100);
    }, [income, age]);

    const [referenceId] = useState(() =>
        `LH-PRT-${Math.floor(Math.random() * 100000)}-${age}`
    );

    return (
        <section className="py-16 md:py-24 bg-white relative overflow-hidden font-sans" id="buying-guide">
            {/* Ambient background glows */}
            <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-[#2076C7]/5 rounded-full blur-[120px] -translate-y-1/2 translate-x-1/2" />
            <div className="absolute bottom-0 left-0 w-[600px] h-[600px] bg-[#1CADA3]/5 rounded-full blur-[120px] translate-y-1/2 -translate-x-1/2" />

            <div className="container-custom relative z-10 px-6 md:px-10">
                <div className="text-center max-w-4xl mx-auto mb-6 md:mb-8">
                    <motion.span
                        initial={{ opacity: 0, y: 10 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        className="text-[#2076C7] font-black uppercase text-[10px] md:text-xs tracking-[0.4em] mb-3 block font-sans"
                    >
                        DECISION INTELLIGENCE
                    </motion.span>
                    <motion.h2
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        className="text-3xl md:text-5xl lg:text-6xl font-black mb-4 md:mb-6 text-[#2076C7] font-sans"
                    >
                        Policy <span className="text-transparent bg-clip-text bg-linear-to-r from-[#2076C7] via-[#1CADA3] to-[#2076C7] bg-[length:200%_auto] animate-gradient-x">Acquisition</span> Guide
                    </motion.h2>
                    <p className="text-gray-500 text-base md:text-lg leading-relaxed font-medium font-sans max-w-2xl mx-auto">
                        Use our proprietary calculator and expert audit framework to identify the perfect coverage for your family.
                    </p>
                </div>

                <div className="grid lg:grid-cols-2 gap-8 lg:gap-16 items-center max-w-6xl mx-auto px-4 md:px-6">
                    {/* Tips Column */}
                    <motion.div
                        initial={{ opacity: 0, x: -30 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        className="space-y-4 md:space-y-6"
                    >
                        {tips.map((tip, idx) => (
                            <motion.div
                                key={idx}
                                initial={{ opacity: 0, y: 10 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: idx * 0.1 }}
                                className="flex gap-4 p-4 md:p-6 bg-white rounded-[2rem] border border-gray-100 shadow-[0_10px_30px_rgba(0,0,0,0.02)] hover:shadow-[0_30px_60px_rgba(32,118,199,0.08)] transition-all duration-700 group"
                            >
                                <div className="p-3 md:p-4 bg-slate-50 rounded-xl h-fit group-hover:bg-[#2076C7] transition-all duration-700">
                                    <tip.icon className="w-5 h-5 md:w-6 md:h-6 transition-colors duration-700 group-hover:text-white" style={{ color: tip.color }} />
                                </div>
                                <div>
                                    <h4 className="text-base md:text-lg font-black text-[#2076C7] mb-1 font-sans">{tip.title}</h4>
                                    <p className="text-xs md:text-sm text-gray-500 leading-relaxed font-medium font-sans">{tip.desc}</p>
                                </div>
                            </motion.div>
                        ))}
                    </motion.div>

                    {/* Calculator Column */}
                    <motion.div
                        initial={{ opacity: 0, scale: 0.95 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        viewport={{ once: true }}
                        className="relative"
                    >
                        <div className="bg-linear-to-br from-[#2076C7] to-[#1CADA3] p-[2px] rounded-[2.5rem] md:rounded-[3.5rem] shadow-[0_40px_80px_rgba(32,118,199,0.12)]">
                            <div className="bg-white p-6 md:p-10 rounded-[2.4rem] md:rounded-[3.4rem] relative overflow-hidden">
                                <div className="absolute top-0 right-0 w-32 h-32 bg-[#1CADA3]/5 blur-[50px]" />
                                <div className="absolute bottom-0 left-0 w-32 h-32 bg-[#2076C7]/5 blur-[50px]" />

                                <h3 className="text-base md:text-lg font-black text-[#2076C7] mb-8 md:mb-10 text-center uppercase tracking-[0.3em] font-sans">Protection Quotient</h3>

                                <div className="space-y-8 md:space-y-10 relative z-10">
                                    {/* Income Slider */}
                                    <div className="space-y-3 md:space-y-4">
                                        <div className="flex justify-between items-center">
                                            <label className="text-[9px] font-black text-gray-400 uppercase tracking-widest font-sans">Annual Income</label>
                                            <span className="text-lg md:text-xl font-black text-[#2076C7] font-sans">₹{income} Lakhs</span>
                                        </div>
                                        <div className="relative h-1.5 bg-slate-100 rounded-full">
                                            <div className="absolute top-0 left-0 h-full bg-[#2076C7] rounded-full" style={{ width: `${(income - 5) / 95 * 100}%` }} />
                                            <input
                                                type="range" min="5" max="100" value={income}
                                                onChange={(e) => setIncome(parseInt(e.target.value))}
                                                className="absolute top-0 left-0 w-full h-full opacity-0 cursor-pointer"
                                            />
                                        </div>
                                    </div>

                                    {/* Age Slider */}
                                    <div className="space-y-3 md:space-y-4">
                                        <div className="flex justify-between items-center">
                                            <label className="text-[9px] font-black text-gray-400 uppercase tracking-widest font-sans">Current Age</label>
                                            <span className="text-lg md:text-xl font-black text-[#1CADA3] font-sans">{age} Years</span>
                                        </div>
                                        <div className="relative h-1.5 bg-slate-100 rounded-full">
                                            <div className="absolute top-0 left-0 h-full bg-[#1CADA3] rounded-full" style={{ width: `${(age - 18) / 47 * 100}%` }} />
                                            <input
                                                type="range" min="18" max="65" value={age}
                                                onChange={(e) => setAge(parseInt(e.target.value))}
                                                className="absolute top-0 left-0 w-full h-full opacity-0 cursor-pointer"
                                            />
                                        </div>
                                    </div>

                                    {/* Protection Dial */}
                                    <div className="relative py-4 md:py-6 flex flex-col items-center">
                                        <div className="relative w-40 h-40 md:w-52 md:h-52">
                                            <svg className="w-full h-full transform -rotate-90 scale-[1.1]">
                                                <circle cx="104" cy="104" r="92" stroke="currentColor" strokeWidth="10" fill="transparent" className="text-slate-50" />
                                                <motion.circle
                                                    cx="104" cy="104" r="92" stroke="currentColor" strokeWidth="10" fill="transparent"
                                                    strokeDasharray="578"
                                                    initial={{ strokeDashoffset: 578 }}
                                                    animate={{ strokeDashoffset: 578 - (578 * (recommendedCover / 15)) }}
                                                    className="text-[#2076C7]"
                                                    strokeLinecap="round"
                                                    transition={{ duration: 1, ease: "easeOut" }}
                                                />
                                            </svg>
                                            <div className="absolute inset-0 flex flex-col items-center justify-center text-center px-4">
                                                <span className="text-[8px] font-black text-gray-400 uppercase tracking-widest mb-1 font-sans">Recommended Cover</span>
                                                <motion.div
                                                    key={recommendedCover}
                                                    initial={{ scale: 0.9, opacity: 0 }}
                                                    animate={{ scale: 1, opacity: 1 }}
                                                    className="text-2xl md:text-3xl font-black text-[#2076C7] font-sans"
                                                >
                                                    ₹{recommendedCover.toFixed(1)} <span className="text-lg md:text-xl">Cr</span>
                                                </motion.div>
                                            </div>
                                        </div>
                                        <p className="mt-6 text-[9px] text-[#1CADA3] font-black uppercase tracking-[0.3em] bg-[#1CADA3]/5 px-3 py-1.5 rounded-full font-sans">Verified Safety Shield</p>
                                    </div>

                                    <Magnetic>
                                        <button
                                            suppressHydrationWarning
                                            onClick={() => setIsQuoteModalOpen(true)}
                                            className="w-full py-4 md:py-5 bg-linear-to-r from-[#2076C7] to-[#1CADA3] text-white rounded-[1.2rem] font-black text-base md:text-lg shadow-[0_15px_30px_rgba(32,118,199,0.25)] hover:scale-[1.02] transition-all flex items-center justify-center gap-3 font-sans"
                                        >
                                            Get Expert Quote <ChevronRight className="w-5 h-5" />
                                        </button>
                                    </Magnetic>
                                </div>
                            </div>
                        </div>
                    </motion.div>
                </div>
            </div>

            {/* EXPERT QUOTE MODAL */}
            <AnimatePresence>
                {isQuoteModalOpen && (
                    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            onClick={() => setIsQuoteModalOpen(false)}
                            className="absolute inset-0 bg-slate-900/60 backdrop-blur-md"
                        />

                        <motion.div
                            initial={{ opacity: 0, scale: 0.9, y: 20 }}
                            animate={{ opacity: 1, scale: 1, y: 0 }}
                            exit={{ opacity: 0, scale: 0.9, y: 20 }}
                            className="bg-white w-full max-w-[650px] rounded-[3rem] shadow-2xl relative z-11 overflow-hidden">
                            <div className="bg-linear-to-r from-[#0B1C2E] to-[#2076C7] p-8 text-white relative">
                                <div className="absolute top-0 right-0 p-6 flex gap-3">
                                    <div className="px-3 py-1 rounded-full bg-white/10 border border-white/20 flex items-center gap-2">
                                        <div className="w-1.5 h-1.5 bg-emerald-400 rounded-full animate-pulse" />
                                        <span className="text-[9px] font-black uppercase tracking-widest text-white/80">IRDAI Certified</span>
                                    </div>
                                    <button
                                        suppressHydrationWarning
                                        onClick={() => setIsQuoteModalOpen(false)}
                                        className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center hover:bg-white/20 transition-all font-sans">
                                        ✕
                                    </button>
                                </div>
                                <div className="space-y-4">
                                    <div className="w-12 h-12 bg-[#1CADA3] rounded-2xl flex items-center justify-center shadow-lg shadow-teal-500/20">
                                        <ShieldCheck className="w-6 h-6 text-white" />
                                    </div>
                                    <div>
                                        <h3 className="text-3xl font-black font-sans uppercase tracking-tight leading-none mb-1">
                                            Elite Audit <span className="text-[#1CADA3]">Quote</span>
                                        </h3>

                                        <p className="text-[10px] font-black text-white/40 uppercase tracking-[0.3em] font-sans">
                                            Reference: {referenceId}
                                        </p>
                                    </div>
                                </div>
                            </div>

                            <div className="p-8 md:p-10 space-y-10">
                                {/* Core Metrics */}
                                <div className="grid grid-cols-2 gap-8 pb-10 border-b border-slate-100">
                                    <div className="space-y-1">
                                        <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest font-sans flex items-center gap-2">
                                            <Target className="w-3 h-3 text-[#2076C7]" /> Recommended Cover
                                        </p>
                                        <div className="flex items-baseline gap-1">
                                            <span className="text-4xl font-black text-[#0B1C2E] font-sans">₹{recommendedCover.toFixed(1)}</span>
                                            <span className="text-xl font-black text-slate-400 font-sans">Cr</span>
                                        </div>
                                        <p className="text-[9px] text-[#1CADA3] font-bold uppercase">Optimal Asset Protection</p>
                                    </div>
                                    <div className="space-y-1">
                                        <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest font-sans flex items-center gap-2">
                                            <Calculator className="w-3 h-3 text-[#1CADA3]" /> Multiplier Applied
                                        </p>
                                        <div className="flex items-baseline gap-1">
                                            <span className="text-4xl font-black text-[#1CADA3] font-sans">{age < 40 ? '15x' : '10x'}</span>
                                            <span className="text-sm font-black text-slate-400 font-sans uppercase">Income</span>
                                        </div>
                                        <p className="text-[9px] text-slate-300 font-bold uppercase underline">Strategy: Replacement Cost</p>
                                    </div>
                                </div>

                                {/* Custom Insights */}
                                <div className="space-y-6">
                                    <div className="flex items-center justify-between">
                                        <h4 className="text-xs font-black text-[#0B1C2E] uppercase tracking-widest font-sans">Proprietary Insights</h4>
                                        <span className="px-2 py-0.5 rounded bg-blue-50 text-[8px] font-black text-[#2076C7] uppercase">LH Verified</span>
                                    </div>
                                    <div className="grid gap-4">
                                        <div className="group p-4 rounded-2xl bg-slate-50 border border-slate-100 hover:border-[#2076C7]/30 transition-all flex gap-4">
                                            <div className="w-8 h-8 rounded-xl bg-white flex items-center justify-center shadow-sm text-[#2076C7]">
                                                <Target className="w-4 h-4" />
                                            </div>
                                            <div>
                                                <p className="text-[11px] text-slate-600 font-bold font-sans leading-snug">
                                                    At <span className="text-[#0B1C2E]">{age} years</span>, you qualify for 100% premium waiver on Critical Illness—saving you ~₹6.2L in lifetime load.
                                                </p>
                                            </div>
                                        </div>
                                        <div className="group p-4 rounded-2xl bg-slate-50 border border-slate-100 hover:border-[#1CADA3]/30 transition-all flex gap-4">
                                            <div className="w-8 h-8 rounded-xl bg-white flex items-center justify-center shadow-sm text-[#1CADA3]">
                                                <Info className="w-4 h-4" />
                                            </div>
                                            <div>
                                                <p className="text-[11px] text-slate-600 font-bold font-sans leading-snug">
                                                    Income tax optimization detected: ₹{income}L annual bracket qualifies for the <span className="text-[#0B1C2E]">Max 80C Shield</span> (₹1.5L exemption).
                                                </p>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                <div className="pt-4 space-y-4">
                                    <div className="flex items-center gap-3 p-4 bg-amber-50 rounded-2xl border border-amber-100">
                                        <div className="w-8 h-8 rounded-full bg-amber-500 flex items-center justify-center text-white shrink-0">
                                            <Zap className="w-4 h-4" />
                                        </div>
                                        <p className="text-[10px] text-amber-900 font-bold leading-tight">
                                            Limited Time: This quote includes a 5% Early Action discount if activated within 24 hours.
                                        </p>
                                    </div>
                                    <button
                                        suppressHydrationWarning
                                        className="w-full py-5 bg-[#0B1C2E] text-white rounded-[1.5rem] font-black text-sm uppercase tracking-[0.2em] shadow-xl hover:bg-[#2076C7] hover:scale-[1.01] transition-all flex items-center justify-center gap-3 font-sans"
                                    >
                                        Execute this Strategy <ChevronRight className="w-5 h-5" />
                                    </button>
                                    <div className="flex justify-between items-center text-[8px] text-slate-300 font-black uppercase tracking-widest px-2">
                                        <span>IRDAI REG No: INF-8829-01</span>
                                        <span>LH Algorithm v4.8 (Updated Today)</span>
                                    </div>
                                </div>
                            </div>
                        </motion.div>
                    </div>
                )}
            </AnimatePresence>
        </section>
    );
};

export default PolicyBuyingGuide;
