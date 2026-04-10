"use client";

import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import {
    ArrowLeft, ShieldCheck, Target, Users, Clock, IndianRupee,
    FileText, PieChart as PieIcon, BarChart as BarIcon, TrendingUp
} from 'lucide-react';
import {
    PieChart, Pie, Cell, BarChart, Bar, XAxis, YAxis,
    Tooltip, ResponsiveContainer, Legend
} from 'recharts';

const COLORS = ['#2076C7', '#1CADA3', '#0E8A82', '#475569', '#94A3B8'];

const CustomTooltip = ({ active, payload, label }: any) => {
    if (active && payload && payload.length) {
        return (
            <div className="bg-white/95 backdrop-blur-sm p-3 shadow-xl border border-gray-100 rounded-xl min-w-[150px]">
                <p className="text-sm font-bold text-gray-800 mb-2 border-b border-gray-100 pb-1.5">{label}</p>
                {payload.map((entry: any, index: number) => (
                    <div key={index} className="flex items-center justify-between gap-4">
                        <span className="text-xs font-medium text-gray-500 capitalize">{entry.name}:</span>
                        <span className="text-xs font-bold" style={{ color: entry.color || entry.fill || '#2076C7' }}>
                            {entry.value}%
                        </span>
                    </div>
                ))}
            </div>
        );
    }
    return null;
};

const sectorAllocation = [
    { name: 'Consumer', value: 25 },
    { name: 'Financial Services', value: 20 },
    { name: 'Industrials', value: 20 },
    { name: 'Technology', value: 15 },
    { name: 'Others', value: 20 },
];

const stageAllocation = [
    { name: 'Growth Capital', value: 55 },
    { name: 'Expansion Capital', value: 30 },
    { name: 'Pre-IPO', value: 15 },
];

const portfolioConcentration = [
    { name: 'Companies', value: 15 },
    { name: 'Holding Period (Yrs)', value: 6 },
];

const coreFocusAreas = [
    'Mid-market scalable companies',
    'Consumer & retail growth stories',
    'Financial services',
    'Industrials & manufacturing',
    'Emerging India sectors',
];

const suitableFor = [
    'HNI / Ultra HNI',
    'Family Offices',
    'Long-term investors',
    'Growth-focused investors',
];

export default function NVCapitalDetail() {
    const [mounted, setMounted] = useState(false);

    useEffect(() => {
        window.scrollTo(0, 0);
        setMounted(true);
    }, []);

    return (
        <div className="bg-gray-50 min-h-screen font-sans text-gray-700">
            {/* Hero Header — matches modal exactly */}
            <div className="relative bg-gradient-to-r from-[#2076C7] to-[#1CADA3] pt-28 pb-10 text-white">
                <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
                    <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
                        <Link href="/products/aif" className="inline-flex items-center gap-2 mb-6 text-white/80 hover:text-white transition-colors group">
                            <div className="p-1.5 bg-white/10 hover:bg-white/20 rounded-full transition-colors">
                                <ArrowLeft className="w-4 h-4" />
                            </div>
                            <span className="text-sm font-bold uppercase tracking-wider">Back to AIF Products</span>
                        </Link>

                        <div className="flex flex-col sm:flex-row items-center sm:items-start gap-4 text-center sm:text-left">
                            <div className="p-3 bg-white/10 rounded-xl backdrop-blur-md shrink-0">
                                <ShieldCheck className="w-8 h-8" />
                            </div>
                            <div>
                                <div className="flex flex-wrap items-center justify-center sm:justify-start gap-2 sm:gap-3 mb-3">
                                    <span className="px-2.5 py-1 bg-white/20 rounded-full text-xs font-bold uppercase tracking-wider">
                                        II AIF
                                    </span>
                                    <span className="px-2.5 py-1 bg-white/20 rounded-full text-xs font-bold uppercase tracking-wider">
                                        Closed-Ended
                                    </span>
                                </div>
                                <h1 className="text-3xl sm:text-4xl font-bold mb-2">NV Capital Scheme 1</h1>
                                <p className="text-white/80 text-base sm:text-lg leading-snug">
                                    Managed by N V Associates LLP
                                </p>
                            </div>
                        </div>
                    </motion.div>
                </div>
            </div>

            {/* Main Content */}
            <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-10 pb-20">
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">

                    {/* Left Column */}
                    <div className="lg:col-span-2 space-y-8">

                        {/* Investment Strategy */}
                        <section className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
                            <h3 className="flex items-center gap-2 text-xl font-bold text-gray-800 mb-4">
                                <Target className="w-5 h-5 text-[#2076C7]" />
                                Investment Strategy
                            </h3>
                            <p className="text-gray-600 leading-relaxed mb-6">
                                NV Capital Scheme 1 is a Category II AIF focused on growth-stage investments. The fund aims to deliver long-term capital appreciation by backing companies with strong fundamentals, scalable models, and sector tailwinds. It follows a multi-sector growth strategy, investing in businesses that are in expansion or late-growth phases.
                            </p>
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                {coreFocusAreas.map((area, idx) => (
                                    <div key={idx} className="flex items-center gap-3 p-3 bg-blue-50/50 rounded-lg border border-blue-100">
                                        <div className="w-2 h-2 rounded-full bg-[#1CADA3] shrink-0" />
                                        <span className="text-gray-700 font-medium">{area}</span>
                                    </div>
                                ))}
                            </div>
                        </section>

                        {/* Suitable For */}
                        <section className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
                            <h3 className="flex items-center gap-2 text-xl font-bold text-gray-800 mb-4">
                                <Users className="w-5 h-5 text-[#1CADA3]" />
                                Suitable For
                            </h3>
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                {suitableFor.map((item, idx) => (
                                    <div key={idx} className="flex items-center gap-3 p-3 bg-teal-50/50 rounded-lg border border-teal-100">
                                        <div className="w-2 h-2 rounded-full bg-[#2076C7] shrink-0" />
                                        <span className="text-gray-700 font-medium">{item}</span>
                                    </div>
                                ))}
                            </div>
                        </section>

                        {/* Charts */}
                        <section className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            {/* Sector Allocation Pie */}
                            <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 flex flex-col">
                                <h4 className="font-bold text-gray-700 mb-6 flex items-center gap-2">
                                    <PieIcon className="w-4 h-4 text-[#1CADA3]" /> Sector Allocation
                                </h4>
                                <div className="h-80 w-full">
                                    <ResponsiveContainer width="100%" height="100%">
                                        {mounted ? (
                                            <PieChart>
                                                <Pie
                                                    data={sectorAllocation}
                                                    cx="50%"
                                                    cy="40%"
                                                    innerRadius={60}
                                                    outerRadius={80}
                                                    paddingAngle={5}
                                                    dataKey="value"
                                                >
                                                    {sectorAllocation.map((entry, index) => (
                                                        <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                                                    ))}
                                                </Pie>
                                                <Tooltip content={<CustomTooltip />} />
                                                <Legend layout="vertical" verticalAlign="bottom" iconType="circle" />
                                            </PieChart>
                                        ) : <div />}
                                    </ResponsiveContainer>
                                </div>
                            </div>

                            {/* Stage Allocation Bar */}
                            <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 flex flex-col">
                                <h4 className="font-bold text-gray-700 mb-6 flex items-center gap-2">
                                    <BarIcon className="w-4 h-4 text-[#2076C7]" /> Stage Allocation
                                </h4>
                                <div className="h-64 w-full">
                                    <ResponsiveContainer width="100%" height="100%">
                                        {mounted ? (
                                            <BarChart data={stageAllocation}>
                                                <XAxis dataKey="name" tick={{ fontSize: 10 }} />
                                                <YAxis hide />
                                                <Tooltip content={<CustomTooltip />} cursor={{ fill: 'rgba(32, 118, 199, 0.05)' }} />
                                                <Bar dataKey="value" radius={[4, 4, 0, 0]}>
                                                    {stageAllocation.map((entry, index) => (
                                                        <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                                                    ))}
                                                </Bar>
                                            </BarChart>
                                        ) : <div />}
                                    </ResponsiveContainer>
                                </div>
                            </div>
                        </section>

                        {/* Portfolio Concentration */}
                        <section className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
                            <h4 className="font-bold text-gray-700 mb-6 flex items-center gap-2">
                                <BarIcon className="w-4 h-4 text-[#2076C7]" /> Portfolio Snapshot
                            </h4>
                            <div className="h-40 w-full">
                                <ResponsiveContainer width="100%" height="100%">
                                    {mounted ? (
                                        <BarChart data={portfolioConcentration} layout="vertical">
                                            <XAxis type="number" hide />
                                            <YAxis dataKey="name" type="category" width={160} tick={{ fontSize: 12, fontWeight: 500 }} />
                                            <Tooltip content={<CustomTooltip />} cursor={{ fill: 'rgba(32, 118, 199, 0.05)' }} />
                                            <Bar dataKey="value" radius={[0, 4, 4, 0]} barSize={32}>
                                                {portfolioConcentration.map((entry, index) => (
                                                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                                                ))}
                                            </Bar>
                                        </BarChart>
                                    ) : <div />}
                                </ResponsiveContainer>
                            </div>
                        </section>

                        {/* Capital Deployment */}
                        <section className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
                            <h4 className="font-bold text-gray-700 mb-4 flex items-center gap-2">
                                <TrendingUp className="w-4 h-4 text-[#1CADA3]" /> Capital Deployment
                            </h4>
                            <div className="relative pt-1">
                                <div className="flex mb-2 items-center justify-between">
                                    <span className="text-xs font-semibold py-1 px-2 uppercase rounded-full text-[#1CADA3] bg-[#1CADA3]/20">
                                        Deployed
                                    </span>
                                    <span className="text-xs font-semibold text-[#1CADA3]">65%</span>
                                </div>
                                <div className="overflow-hidden h-2 mb-4 rounded bg-[#1CADA3]/20">
                                    <div style={{ width: '65%' }} className="h-full rounded bg-[#1CADA3] transition-all duration-1000 ease-out" />
                                </div>
                                <p className="text-xs text-gray-500 text-right">35% Available for Deployment</p>
                            </div>
                        </section>
                    </div>

                    {/* Right Sidebar */}
                    <div className="space-y-6">

                        {/* Fund Overview */}
                        <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
                            <h4 className="text-sm font-bold text-gray-400 uppercase tracking-widest mb-6">Fund Overview</h4>
                            <ul className="space-y-4">
                                <li className="flex justify-between items-center border-b border-gray-100 pb-3">
                                    <span className="text-gray-500 font-medium flex items-center gap-2.5 text-sm">
                                        <IndianRupee className="w-4 h-4 text-[#1CADA3]" /> Min Investment
                                    </span>
                                    <span className="font-bold text-gray-900">₹1 Crore</span>
                                </li>
                                <li className="flex justify-between items-center border-b border-gray-100 pb-3">
                                    <span className="text-gray-500 font-medium flex items-center gap-2.5 text-sm">
                                        <Clock className="w-4 h-4 text-[#1CADA3]" /> Tenure
                                    </span>
                                    <span className="font-bold text-gray-900">5–7 Years</span>
                                </li>
                                <li className="flex justify-between items-center pb-1">
                                    <span className="text-gray-500 font-medium flex items-center gap-2.5 text-sm">
                                        <Target className="w-4 h-4 text-[#1CADA3]" /> Target IRR
                                    </span>
                                    <span className="font-bold text-green-600">Capital Appreciation</span>
                                </li>
                            </ul>
                        </div>

                        {/* Fund Manager */}
                        <div className="bg-gradient-to-br from-[#2076C7] to-[#1CADA3] p-6 rounded-2xl shadow-lg text-white">
                            <div className="flex items-center gap-3 mb-4">
                                <div className="p-2 bg-white/20 rounded-lg backdrop-blur-sm">
                                    <Users className="w-5 h-5 text-white" />
                                </div>
                                <h4 className="font-bold text-lg">Fund Manager</h4>
                            </div>
                            <p className="text-white font-bold mb-1">N V Associates LLP</p>
                            <p className="text-white/90 text-sm leading-relaxed mb-4">
                                The fund follows a research-driven investment approach involving bottom-up stock selection, sector & macro analysis, promoter due diligence, and risk-managed allocation with an active exit strategy.
                            </p>
                        </div>

                        {/* Fee Structure */}
                        <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
                            <h4 className="text-sm font-bold text-gray-400 uppercase tracking-widest mb-4">Fee Structure</h4>
                            <div className="space-y-4">
                                <div className="flex justify-between items-center border-b border-gray-100 pb-3">
                                    <span className="text-gray-500 font-medium text-sm">Management Fee</span>
                                    <span className="font-bold text-gray-900">As per PPM</span>
                                </div>
                                <div className="flex justify-between items-center border-b border-gray-100 pb-3">
                                    <span className="text-gray-500 font-medium text-sm">Performance Fee</span>
                                    <span className="font-bold text-gray-900">Carry model</span>
                                </div>
                                <div className="flex justify-between items-center pb-1">
                                    <span className="text-gray-500 font-medium text-sm">Hurdle Rate</span>
                                    <span className="font-bold text-gray-900">Applicable</span>
                                </div>
                            </div>
                        </div>

                        {/* CTA */}
                        <div className="space-y-3">
                            <button className="w-full py-4 px-4 bg-[#2076C7] hover:bg-[#2076C7]/90 text-white rounded-xl font-bold shadow-lg shadow-[#2076C7]/20 transition-all flex items-center justify-center gap-2 group cursor-pointer">
                                <FileText className="w-5 h-5 group-hover:scale-110 transition-transform" />
                                Apply Now
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
