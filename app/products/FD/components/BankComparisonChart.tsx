
"use client";

import React from 'react';
import { motion } from 'framer-motion';
import { ShieldCheck, TrendingUp, Info, Scale, Lock, Percent, ChevronRight } from 'lucide-react';

const MotionDiv = motion.div;

const SectorComparisonMatrix = () => {
    return (
        <MotionDiv
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="bg-white rounded-[40px] p-8 md:p-12 shadow-2xl border border-gray-100 overflow-hidden relative"
        >
            {/* SVG Gradient Definition for Icons */}
            <svg width="0" height="0" className="absolute">
                <linearGradient id="expert-advisory-gradient" x1="0%" y1="0%" x2="100%" y2="0%">
                    <stop offset="0%" stopColor="#2076C7" />
                    <stop offset="100%" stopColor="#1CADA3" />
                </linearGradient>
            </svg>
            {/* Background Decorative Element */}
            <div className="absolute top-0 right-0 w-64 h-64 bg-primary/5 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2 z-0"></div>

            <div className="relative z-10">
                <div className="text-center mb-12">
                    <MotionDiv
                        initial={{ opacity: 0, scale: 0.9 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        className="inline-flex items-center gap-3 bg-secondary/10 px-6 py-2 rounded-full text-slate-800 font-bold text-sm uppercase tracking-widest mb-6"
                    >
                        <Scale size={18} /> Sector Comparison
                    </MotionDiv>
                    <h2 className="text-3xl md:text-4xl font-extrabold mb-3 bg-clip-text text-transparent drop-shadow-sm" style={{ background: 'linear-gradient(to right, #2076C7, #1CADA3)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>
                        Find Your Perfect Investment Match
                    </h2>
                    <div className="w-24 h-1 mx-auto rounded-full mb-4" style={{ background: 'linear-gradient(to right, #2076C7, #1CADA3, #2076C7)' }}></div>
                    <p className="text-gray-600 mb-8">
                        Compare safety parameters, interest ranges, and insurance coverage across all financial sectors
                        to make an informed wealth growth decision.
                    </p>
                </div>

                <div className="overflow-x-auto rounded-[32px] border border-gray-100 shadow-2xl bg-white">
                    <table className="w-full min-w-[900px] border-collapse">
                        <thead>
                            <tr className="bg-gradient-to-r from-[#2076C7] to-[#1CADA3] text-white">
                                <th className="py-7 px-8 text-left font-bold uppercase text-xs tracking-[0.2em]">Sector Type</th>
                                <th className="py-7 px-8 text-center font-bold uppercase text-xs tracking-[0.2em]">
                                    <div className="flex items-center justify-center gap-2"><ShieldCheck size={16} className="text-secondary" /> Safety Profile</div>
                                </th>
                                <th className="py-7 px-8 text-center font-bold uppercase text-xs tracking-[0.2em]">
                                    <div className="flex items-center justify-center gap-2"><Percent size={16} className="text-secondary" /> Yield Range</div>
                                </th>
                                <th className="py-7 px-8 text-center font-bold uppercase text-xs tracking-[0.2em]">
                                    <div className="flex items-center justify-center gap-2"><Lock size={16} className="text-secondary" /> Protection</div>
                                </th>
                                <th className="py-7 px-8 text-center font-bold uppercase text-xs tracking-[0.2em]">
                                    <div className="flex items-center justify-center gap-2"><TrendingUp size={16} className="text-secondary" /> ROI Potential</div>
                                </th>
                            </tr>
                        </thead>
                        <tbody className="font-sans">
                            {[
                                { sector: "Public Sector Banks", safety: "Highest (Sovereign)", rate: "6.5% - 7.5%", insurance: "DICGC (Up to ₹5L)", roi: "Stable Growth", color: "text-blue-600", bg: "bg-blue-50", fill: 25 },
                                { sector: "Private Sector Banks", safety: "Very High (RBI)", rate: "7.0% - 8.2%", insurance: "DICGC (Up to ₹5L)", roi: "Moderate Yield", color: "text-blue-600", bg: "bg-blue-50", fill: 50 },
                                { sector: "Small Finance Banks", safety: "High (RBI Supervised)", rate: "7.5% - 9.1%", insurance: "DICGC (Up to ₹5L)", roi: "High Yield", color: "text-blue-600", bg: "bg-blue-50", fill: 75 },
                                { sector: "NBFCs", safety: "Moderate (Credit Rated)", rate: "8.0% - 9.1%", insurance: "Internal (No DICGC)", roi: "Maximum Returns", color: "text-blue-600", bg: "bg-blue-50", fill: 100 }
                            ].map((row, i) => (
                                <tr key={i} className="hover:bg-gray-50/50 transition-all duration-300 group">
                                    <td className="py-8 px-8 font-bold text-slate-700 border-none group-hover:bg-primary/5">
                                        <div className="flex flex-col">
                                            <span>{row.sector}</span>
                                            <span className="text-[10px] text-gray-400 font-bold uppercase mt-1 tracking-wider opacity-0 group-hover:opacity-100 transition-opacity">Financial Institution</span>
                                        </div>
                                    </td>
                                    <td className="py-8 px-8 text-center">
                                        <span className={`px-4 py-2 rounded-xl text-[10px] font-bold uppercase tracking-widest ${row.bg} ${row.color} shadow-sm border-none inline-block`}>
                                            {row.safety}
                                        </span>
                                    </td>
                                    <td className="py-8 px-8 text-center">
                                        <div className="text-lg font-bold text-slate-700 tracking-tight group-hover:text-primary transition-colors">{row.rate}</div>
                                        <div className="text-[10px] text-gray-400 font-bold uppercase mt-1">Per Annum</div>
                                    </td>
                                    <td className="py-8 px-8 text-center">
                                        <div className="flex flex-col items-center gap-1">
                                            <span className="text-sm font-bold text-slate-600">{row.insurance}</span>
                                        </div>
                                    </td>
                                    <td className="py-8 px-8 text-center">
                                        <div className="flex flex-col items-center">
                                            <span className="font-bold text-slate-700 mb-3 text-sm tracking-wide group-hover:text-primary transition-colors">{row.roi}</span>
                                            <div className="w-32 h-2.5 bg-gray-100 rounded-full overflow-hidden shadow-inner relative">
                                                <MotionDiv
                                                    initial={{ width: 0 }}
                                                    whileInView={{ width: `${row.fill}%` }}
                                                    transition={{ duration: 1.5, delay: 0.5 }}
                                                    whileHover={{ scaleY: 1.2 }}
                                                    className="h-full relative z-10"
                                                    style={{ background: 'linear-gradient(to right, #2076C7, #1CADA3)' }}
                                                ></MotionDiv>
                                                {/* Animated Glow on Hover */}
                                                <MotionDiv
                                                    animate={{ x: ['-100%', '100%'] }}
                                                    transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
                                                    className="absolute inset-0 bg-white/30 skew-x-12 opacity-0 group-hover:opacity-100 transition-opacity z-20"
                                                ></MotionDiv>
                                            </div>
                                        </div>
                                    </td>
                                </tr>
                            ))}
                        </tbody>     
                    </table>
                </div>

                <div className="mt-12 p-8 bg-blue-50/30 rounded-[32px] border border-blue-100/50 flex flex-col md:flex-row items-center gap-8 backdrop-blur-sm">
                    <div className="w-16 h-16 rounded-2xl bg-white shadow-xl flex items-center justify-center flex-shrink-0 border border-blue-50">
                        <Info
                            style={{ stroke: "url(#expert-advisory-gradient)" }}
                            size={32}
                            strokeWidth={2.5}
                        />
                    </div>
                    <div>
                        <p className="text-xs font-bold mb-2 uppercase tracking-[0.25em] bg-clip-text text-transparent drop-shadow-sm" style={{ background: 'linear-gradient(to right, #2076C7, #1CADA3, #2076C7)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>Expert Advisory</p>
                        <p className="text-slate-600 text-lg leading-relaxed font-sans font-medium italic">
                            "Optimal investment selection depends on balancing your unique risk tolerance with your financial goals. Each sector offers a different mix of safety, liquidity, and yield—we recommend reviewing all parameters and diversifying your deposits to build a robust wealth strategy."
                        </p>
                    </div>
                </div>
            </div>
        </MotionDiv>
    );
};

export default SectorComparisonMatrix;
