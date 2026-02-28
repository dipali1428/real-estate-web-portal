"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
    BarChart, Bar, XAxis, YAxis, CartesianGrid,
    Tooltip, ResponsiveContainer, Cell, Legend,
    RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, Radar
} from 'recharts';
import {
    LayoutGrid,
    BarChart3,
    ShieldCheck,
    Zap,
    Trophy,
    Target
} from "lucide-react";

const planMetrics = [
    {
        name: "Tata AIA",
        fullName: "Tata AIA Sampoorna Raksha",
        csr: 99.0,
        payoutSpeed: 93,
        digitalEase: 89,
        affordability: 85,
        rating: 4.8,
    },
    {
        name: "HDFC Life",
        fullName: "HDFC Life Sanchay Plus",
        csr: 98.6,
        payoutSpeed: 91,
        digitalEase: 94,
        affordability: 75,
        rating: 4.8,
    },
    {
        name: "ICICI Pru",
        fullName: "ICICI Pru iProtect Smart",
        csr: 98.1,
        payoutSpeed: 94,
        digitalEase: 96,
        affordability: 82,
        rating: 4.7,
    },
    {
        name: "Bajaj Life",
        fullName: "Bajaj Allianz Life ACE",
        csr: 97.5,
        payoutSpeed: 88,
        digitalEase: 90,
        affordability: 91,
        rating: 4.6,
    },
];

const COLORS = ['#2076C7', '#1CADA3', '#7C3AED', '#EC4899', '#F59E0B'];

const CustomTooltip = ({ active, payload, label }: any) => {
    if (active && payload && payload.length) {
        return (
            <div className="bg-white p-6 rounded-[2rem] shadow-2xl border border-slate-100 backdrop-blur-xl">
                <p className="text-[10px] font-black text-[#2076C7] uppercase tracking-[0.2em] mb-2">{label}</p>
                <div className="space-y-2">
                    {payload.map((entry: any, index: number) => (
                        <div key={index} className="flex items-center justify-between gap-8">
                            <span className="text-xs font-bold text-slate-500">{entry.name}:</span>
                            <span className="text-sm font-black text-[#2076C7]">{entry.value}{entry.name === 'CSR' ? '%' : ''}</span>
                        </div>
                    ))}
                </div>
            </div>
        );
    }
    return null;
};

export default function RecommendedPlansGraph() {
    const [view, setView] = useState<'csr' | 'multi'>('csr');

    return (
        <section className="py-24 bg-white relative overflow-hidden text-gray-700">
            {/* BG Accents */}
            <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-[#2076C7]/5 rounded-full blur-[120px] pointer-events-none translate-x-1/2 -translate-y-1/2" />
            <div className="absolute bottom-0 left-0 w-[600px] h-[600px] bg-[#1CADA3]/5 rounded-full blur-[120px] pointer-events-none -translate-x-1/2 translate-y-1/2" />

            <div className="container-custom relative z-10 px-4 md:px-6">
                <div className="flex flex-col lg:flex-row items-center justify-between mb-16 gap-10">
                    <div className="max-w-2xl">
                        <motion.span
                            initial={{ opacity: 0, y: 10 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            className="text-[#1CADA3] font-black uppercase text-[10px] tracking-[0.4em] mb-4 block"
                        >
                            MARKET ANALYTICS · BATTLE-TESTED
                        </motion.span>
                        <motion.h2
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            className="text-4xl font-bold bg-linear-to-r from-[#2076C7] to-[#1CADA3] bg-clip-text text-transparent mb-4"
                        >
                            Performance Benchmarking
                        </motion.h2>
                        <p className="mt-6 text-gray-500 text-xl font-light leading-relaxed">
                            A deep-dive into the critical metrics that matter. We analyze Claim Settlement Ratios (CSR) and operational efficiency to rank the industry leaders.
                        </p>
                    </div>

                    {/* View Switcher */}
                    <div className="flex p-2 bg-white rounded-[2rem] border border-slate-100 shadow-xl shadow-slate-200/50">
                        <button
                            onClick={() => setView('csr')}
                            className={`flex items-center gap-3 px-8 py-4 rounded-2xl text-[10px] font-black uppercase tracking-widest transition-all ${view === 'csr' ? "bg-[#2076C7] text-white shadow-xl" : "text-slate-400 hover:text-slate-600"}`}
                        >
                            <BarChart3 className="w-4 h-4" />
                            CSR Analysis
                        </button>
                        <button
                            onClick={() => setView('multi')}
                            className={`flex items-center gap-3 px-8 py-4 rounded-2xl text-[10px] font-black uppercase tracking-widest transition-all ${view === 'multi' ? "bg-[#2076C7] text-white shadow-xl" : "text-slate-400 hover:text-slate-600"}`}
                        >
                            <LayoutGrid className="w-4 h-4" />
                            Multi-Metric
                        </button>
                    </div>
                </div>

                <div className="grid lg:grid-cols-12 gap-10 items-stretch">
                    {/* Main Chart Container */}
                    <div className="lg:col-span-8 bg-white rounded-[3rem] p-8 md:p-12 border border-slate-100 shadow-[0_30px_70px_rgba(0,0,0,0.04)] relative">
                        <div className="h-[400px] md:h-[500px]">
                            <ResponsiveContainer width="100%" height="100%">
                                {view === 'csr' ? (
                                    <BarChart data={planMetrics} margin={{ top: 20, right: 30, left: 0, bottom: 0 }}>
                                        <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                                        <XAxis
                                            dataKey="name"
                                            axisLine={false}
                                            tickLine={false}
                                            tick={{ fill: '#64748b', fontSize: 10, fontWeight: 900 }}
                                            dy={15}
                                        />
                                        <YAxis
                                            domain={[95, 100]}
                                            axisLine={false}
                                            tickLine={false}
                                            tick={{ fill: '#cbd5e1', fontSize: 10, fontWeight: 700 }}
                                        />
                                        <Tooltip content={<CustomTooltip />} cursor={{ fill: '#f8fafc', radius: 20 }} />
                                        <Bar dataKey="csr" name="CSR" radius={[12, 12, 12, 12]} barSize={40}>
                                            {planMetrics.map((entry, index) => (
                                                <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                                            ))}
                                        </Bar>
                                    </BarChart>
                                ) : (
                                    <RadarChart cx="50%" cy="50%" outerRadius="80%" data={[
                                        { subject: 'CSR', A: 99, B: 95, fullMark: 100 },
                                        { subject: 'Payout', A: 94, B: 85, fullMark: 100 },
                                        { subject: 'Digital', A: 96, B: 80, fullMark: 100 },
                                        { subject: 'Rating', A: 98, B: 90, fullMark: 100 },
                                        { subject: 'Price', A: 85, B: 70, fullMark: 100 },
                                    ]}>
                                        <PolarGrid stroke="#e2e8f0" />
                                        <PolarAngleAxis dataKey="subject" tick={{ fill: '#94a3b8', fontSize: 10, fontWeight: 900 }} />
                                        <PolarRadiusAxis angle={30} domain={[0, 100]} hide />
                                        <Radar name="Top Tier" dataKey="A" stroke="#2076C7" fill="#2076C7" fillOpacity={0.6} activeDot={{ r: 8 }} />
                                        <Radar name="Industry Avg" dataKey="B" stroke="#cbd5e1" fill="#cbd5e1" fillOpacity={0.2} />
                                        <Tooltip content={<CustomTooltip />} />
                                        <Legend wrapperStyle={{ paddingTop: '20px', fontSize: '10px', fontWeight: 900, textTransform: 'uppercase', letterSpacing: '0.1em' }} />
                                    </RadarChart>
                                )}
                            </ResponsiveContainer>
                        </div>
                    </div>

                    {/* Metric Cards Sidebar */}
                    <div className="lg:col-span-4 space-y-6">
                        {/* CSR Leader Card */}
                        <motion.div
                            whileHover={{ scale: 1.02 }}
                            className="p-8 bg-linear-to-br from-[#2076C7] to-[#1CADA3] rounded-[2.5rem] text-white overflow-hidden relative"
                        >
                            <div className="absolute top-0 right-0 w-32 h-32 bg-[#2076C7]/20 rounded-full blur-3xl -mr-16 -mt-16" />
                            <div className="relative z-10">
                                <Trophy className="w-10 h-10 text-yellow-400 mb-6" />
                                <p className="text-[10px] font-black text-[#1CADA3] uppercase mb-2 tracking-[0.2em]">CSR Leader</p>
                                <h4 className="text-2xl font-black mb-1">Tata AIA</h4>
                                <div className="text-5xl font-black text-white mt-4">99.0<span className="text-xl text-[#1CADA3]">%</span></div>
                            </div>
                        </motion.div>

                        {/* Feature Highlights */}
                        <div className="bg-white rounded-[2.5rem] p-8 border border-slate-100 shadow-xl shadow-slate-200/40">
                            <h5 className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-8 text-center bg-slate-50 py-3 rounded-full">Top Operational Metrics</h5>
                            <div className="space-y-6">
                                <div className="flex items-center gap-5">
                                    <div className="w-12 h-12 bg-blue-50 rounded-2xl flex items-center justify-center text-[#2076C7] shrink-0">
                                        <Zap className="w-6 h-6" />
                                    </div>
                                    <div>
                                        <p className="text-[11px] font-black text-[#2076C7] mb-1">94% Instant Approval</p>
                                        <p className="text-[10px] text-slate-400 font-bold uppercase tracking-wide">Payout Efficiency</p>
                                    </div>
                                </div>
                                <div className="flex items-center gap-5">
                                    <div className="w-12 h-12 bg-teal-50 rounded-2xl flex items-center justify-center text-[#1CADA3] shrink-0">
                                        <ShieldCheck className="w-6 h-6" />
                                    </div>
                                    <div>
                                        <p className="text-[11px] font-black text-[#2076C7] mb-1">IRDAI Certified Plans</p>
                                        <p className="text-[10px] text-slate-400 font-bold uppercase tracking-wide">Trust Compliance</p>
                                    </div>
                                </div>
                                <div className="flex items-center gap-5">
                                    <div className="w-12 h-12 bg-purple-50 rounded-2xl flex items-center justify-center text-purple-600 shrink-0">
                                        <Target className="w-6 h-6" />
                                    </div>
                                    <div>
                                        <p className="text-[11px] font-black text-[#2076C7] mb-1">Digital-First KYC</p>
                                        <p className="text-[10px] text-slate-400 font-bold uppercase tracking-wide">Onboarding Speed</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Bottom Stats Grid */}
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-10">
                    {planMetrics.slice(0, 4).map((plan, i) => (
                        <div key={i} className="bg-white/50 border border-slate-100 p-6 rounded-3xl text-center">
                            <p className="text-[9px] font-black text-slate-400 uppercase tracking-widest mb-2">{plan.name}</p>
                            <div className="text-xl font-black text-[#2076C7]">{plan.rating} ★</div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}
