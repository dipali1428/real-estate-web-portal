"use client";

import React, { useEffect } from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import {
    TrendingUp, PieChart, BarChart3, ArrowLeft,
    CheckCircle, Clock, Target, Calendar, Award,
    Briefcase, Activity, Sliders, Layers, AlertCircle, Zap
} from 'lucide-react';
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    BarElement,
    ArcElement,
    Title,
    Tooltip,
    Legend,
    Filler
} from 'chart.js';
import { Line, Bar, Pie } from 'react-chartjs-2';

ChartJS.register(
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    BarElement,
    ArcElement,
    Title,
    Tooltip,
    Legend,
    Filler
);

export default function CarnelianCompounderDetail() {
    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);

    // Data for Performance Since Inception (Line Chart)
    const performanceData = {
        labels: ['May 2019', '2020', '2021', '2022', '2023', '2024', 'Current'],
        datasets: [
            {
                label: 'Carnelian Compounder',
                data: [100, 115, 165, 195, 245, 310, 340.1],
                borderColor: '#2076C7',
                backgroundColor: 'rgba(32, 118, 199, 0.1)',
                fill: true,
                tension: 0.4,
                borderWidth: 4,
                pointRadius: 4,
                pointBackgroundColor: '#fff',
                pointBorderWidth: 2,
            },
            {
                label: 'BSE 500 TRI',
                data: [100, 108, 142, 160, 205, 255, 279],
                borderColor: '#94A3B8',
                backgroundColor: 'transparent',
                fill: false,
                borderDash: [5, 5],
                borderWidth: 2,
                pointRadius: 0,
            }
        ]
    };

    const lineOptions = {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
            legend: {
                display: true,
                position: 'top' as const,
                align: 'end' as const,
                labels: {
                    usePointStyle: true,
                    boxWidth: 6,
                    font: { size: 11, weight: 600 }
                }
            },
            tooltip: {
                backgroundColor: '#1e293b',
                padding: 12,
                titleFont: { size: 14, weight: 700 },
                bodyFont: { size: 13 },
                cornerRadius: 12,
            }
        },
        scales: {
            x: {
                grid: { display: false },
                ticks: { color: '#64748b', font: { size: 12 } }
            },
            y: {
                grid: { color: '#e2e8f0' },
                ticks: { color: '#64748b', font: { size: 12 } },
                min: 80
            }
        }
    };

    // Trailing Returns Summary (Annualized)
    const returnsSummaryData = {
        labels: ['1 Year', '2 Years', '3 Years', '5 Years'],
        datasets: [
            {
                label: 'Returns (%)',
                data: [19.0, 22.1, 26.1, 21.1],
                backgroundColor: '#1CADA3',
                borderRadius: 8,
                barThickness: 40,
            }
        ]
    };

    const barOptions = {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
            legend: { display: false },
            tooltip: {
                backgroundColor: '#1e293b',
                callbacks: {
                    label: (context: any) => ` ${context.parsed.y}%`
                }
            }
        },
        scales: {
            x: {
                grid: { display: false },
                ticks: { color: '#64748b', font: { size: 12, weight: 600 } }
            },
            y: {
                grid: { color: '#f1f5f9' },
                ticks: { color: '#64748b', font: { size: 11 } }
            }
        }
    };

    // Market Cap Allocation
    const allocationData = {
        labels: ['Large Cap', 'Mid Cap', 'Small Cap', 'Cash'],
        datasets: [
            {
                data: [32.8, 44.9, 19.2, 3.2],
                backgroundColor: ['#2076C7', '#1CADA3', '#0E8A82', '#94A3B8'],
                borderWidth: 0,
                hoverOffset: 15,
            }
        ]
    };

    const pieOptions = {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
            legend: { display: false },
            tooltip: { backgroundColor: '#1e293b' }
        },
        cutout: '70%'
    };

    // Sector Allocation
    const sectorData = [
        { name: 'BFSI – Credit', value: 19.7 },
        { name: 'Pharma & CDMO', value: 19.0 },
        { name: 'Consumption', value: 11.2 },
        { name: 'BFSI – Non-Credit', value: 11.2 },
        { name: 'IT', value: 9.9 },
        { name: 'Auto & Auto Ancillary', value: 9.7 },
        { name: 'Engineering & Capital Goods', value: 9.6 },
        { name: 'Hospitals', value: 4.0 },
        { name: 'Freight & Logistics Services', value: 2.4 },
    ].sort((a, b) => b.value - a.value);

    // Top Holdings
    const holdings = [
        { name: 'Aditya Birla Capital', weight: '9.5%' },
        { name: 'Laurus Labs', weight: '7.2%' },
        { name: 'Biocon', weight: '6.9%' },
        { name: 'One 97 Communications', weight: '5.7%' },
        { name: 'Tech Mahindra', weight: '4.1%' },
        { name: 'Yatharth Hospital', weight: '4.0%' },
        { name: 'BHEL', weight: '3.9%' },
        { name: 'L&T', weight: '3.8%' },
        { name: 'Maruti Suzuki', weight: '3.6%' },
        { name: 'Punjab National Bank', weight: '3.4%' },
    ];

    return (
        <div className="bg-neutral-50 text-gray-700 pb-20">
            {/* Hero Section */}
            <div className="relative bg-gradient-to-br from-blue-50 to-white pt-32 pb-48 overflow-hidden rounded-b-[4rem] shadow-2xl">
                <div className="absolute inset-0 bg-[url('/grid-pattern.svg')] opacity-5"></div>
                <div className="absolute top-0 right-0 w-[40rem] h-[40rem] bg-primary/5 rounded-full blur-[120px] -mr-48 -mt-48"></div>

                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-left">
                    <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }}>
                        <Link href="/products/pms" className="inline-flex items-center text-slate-500 hover:text-primary transition-colors mb-8 group bg-white/50 backdrop-blur-md px-4 py-2 rounded-full border border-gray-100 shadow-sm">
                            <ArrowLeft size={16} className="mr-2 group-hover:-translate-x-1 transition-transform" />
                            <span className="font-bold tracking-wider uppercase text-[10px]">Back to PMS Portfolio</span>
                        </Link>

                        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-8">
                            <div className="max-w-3xl">
                                <h1 className="text-5xl md:text-7xl font-sans font-bold mb-3  bg-gradient-to-r from-[#2076C7] to-[#1CADA3] bg-clip-text text-transparent drop-shadow-sm">
                                    Carnelian Capital Compounder Strategy <br />
                                    
                                </h1>
                                <p className="text-xl md:text-2xl text-gray-700 leading-relaxed font-light">
                                    A multi-cap equity strategy focused on long-term compounding through high-quality growth businesses across India’s key structural growth sectors.
                                </p>
                            </div>
                            <div className="bg-white p-8 rounded-[2.5rem] shadow-xl border border-gray-50 flex-shrink-0 animate-in fade-in zoom-in duration-1000">
                                <div className="text-[10px] text-slate-400 uppercase font-black tracking-widest mb-2">Portfolio Alpha (SI)</div>
                                <div className="text-5xl font-sans text-gray-600">+240.1%</div>
                                <div className="text-xs text-slate-500 mt-2 font-medium italic">Absolute wealth generation</div>
                            </div>
                        </div>
                    </motion.div>
                </div>
            </div>

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 -mt-32 relative z-20">
                {/* 1. Fund Overview Section */}
                <div className="grid grid-cols-2 lg:grid-cols-6 gap-4 mb-16">
                    {[
                        { label: 'Inception Date', value: '15 May 2019', icon: Calendar },
                        { label: 'Benchmark', value: 'BSE 500 TRI', icon: Target },
                        { label: 'Investment Style', value: 'QGARP', icon: Sliders },
                        { label: 'Portfolio Size', value: '25–30 stocks', icon: Layers },
                        { label: 'Strategy Type', value: 'Multi-Cap Equity', icon: PieChart },
                        { label: 'Track Record', value: '6+ years', icon: Clock },
                    ].map((item, i) => (
                        <motion.div
                            key={i}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            transition={{ delay: i * 0.1 }}
                            className="bg-white p-6 rounded-[2rem] shadow-xl border border-white/20 flex flex-col items-center text-center hover:-translate-y-1 transition-transform duration-300"
                        >
                            <div className="w-12 h-12 rounded-2xl bg-primary/5 flex items-center justify-center mb-4">
                                <item.icon className="text-primary w-6 h-6" />
                            </div>
                            <div className="text-[10px] text-slate-400 uppercase font-black tracking-widest mb-2">{item.label}</div>
                            <div className="font-bold text-gray-700 leading-tight text-sm">{item.value}</div>
                        </motion.div>
                    ))}
                </div>

                {/* 2. Performance Charts Section */}
                <div className="grid lg:grid-cols-3 gap-8 mb-16 items-start">
                    <div className="lg:col-span-2 bg-white rounded-[2.5rem] p-8 shadow-2xl border border-gray-100 relative overflow-hidden group">
                        <div className="absolute top-0 right-0 w-80 h-80 bg-primary/5 rounded-full blur-[100px] -mr-40 -mt-40 transition-all duration-1000 group-hover:bg-primary/10" />

                        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-10 relative z-10">
                            <div>
                                <h3 className="text-2xl font-bold text-gray-800 flex items-center gap-3">
                                    <TrendingUp className="text-primary" />
                                    Performance Since Inception
                                </h3>
                                <p className="text-slate-500 mt-1 font-medium">Strategy growth vs Benchmark index</p>
                            </div>
                            <div className="flex gap-4">
                                <div className="text-right">
                                    <div className="text-[10px] font-black text-slate-400 uppercase tracking-widest">SI CAGR</div>
                                    <div className="text-3xl font-black text-primary">20.3%</div>
                                </div>
                                <div className="w-px h-10 bg-gray-100 mx-2" />
                                <div className="text-right">
                                    <div className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Benchmark</div>
                                    <div className="text-3xl font-black text-slate-300">16.7%</div>
                                </div>
                            </div>
                        </div>

                        <div className="h-[250px] md:h-[400px] w-full relative z-10">
                            <Line data={performanceData} options={lineOptions} />
                        </div>

                        <div className="mt-10 p-6 bg-[#1CADA3] rounded-[2rem] text-white relative z-10 flex flex-col md:flex-row items-center justify-between gap-6">
                            <div className="flex items-center gap-4">
                                <div className="w-12 h-12 rounded-full bg-[#1CADA3] flex items-center justify-center">
                                    <Award className="text-primary" />
                                </div>
                                <p className="text-lg font-medium">
                                    ₹100 invested in May 2019 has grown to <span className="text-primary font-bold">~₹340</span>, compared to ~₹279 in the BSE 500 TRI.
                                </p>
                            </div>
                            <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-widest opacity-60">
                                <Clock size={14} /> TWRR Basis
                            </div>
                        </div>
                    </div>

                    {/* Returns Summary Profile */}
                    <div className="bg-white rounded-[2.5rem] p-8 shadow-2xl border border-gray-100 group">
                        <div>
                            <h3 className="text-xl font-bold text-gray-800 mb-8 flex items-center gap-3">
                                <BarChart3 className="text-[#1CADA3]" />
                                Returns Summary
                            </h3>
                            <div className="h-[200px] md:h-[300px] w-full mb-10">
                                <Bar data={returnsSummaryData} options={barOptions} />
                            </div>
                        </div>
                        <div className="space-y-4">
                            {[
                                { label: '1 Year', value: '19.0%' },
                                { label: '2 Years', value: '22.1%' },
                                { label: '3 Years', value: '26.1%' },
                                { label: '5 Years', value: '21.1%' },
                            ].map((ret, i) => (
                                <div key={i} className="flex justify-between items-center p-4 bg-neutral-50 rounded-2xl border border-gray-100 group-hover:bg-white group-hover:shadow-md transition-all">
                                    <span className="text-sm font-bold text-slate-500 uppercase tracking-wider">{ret.label}</span>
                                    <span className="text-lg font-black text-primary">{ret.value}</span>
                                </div>
                            ))}
                            <p className="text-[10px] text-slate-400 text-center italic mt-4 font-medium">Returns &gt; 1 year are annualised.</p>
                        </div>
                    </div>
                </div>

                <div className="grid lg:grid-cols-3 gap-8 mb-16 items-start">
                    {/* 3. Market Allocation */}
                    <div className="bg-white rounded-[2.5rem] p-8 shadow-2xl border border-gray-100">
                        <div>
                            <h3 className="text-xl font-bold text-gray-800 mb-8 flex items-center gap-3">
                                <PieChart className="text-primary" />
                                Market Cap Split
                            </h3>
                            <div className="h-[200px] md:h-[280px] w-full relative">
                                <Pie data={allocationData} options={pieOptions} />
                                <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none">
                                    <span className="text-4xl font-black text-gray-800">Mix</span>
                                    <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Allocation</span>
                                </div>
                            </div>
                        </div>
                        <div className="space-y-3 mt-10">
                            {[
                                { name: 'Large Cap', value: 32.8, color: '#2076C7' },
                                { name: 'Mid Cap', value: 44.9, color: '#1CADA3' },
                                { name: 'Small Cap', value: 19.2, color: '#0E8A82' },
                                { name: 'Cash & Liquid', value: 3.2, color: '#94A3B8' },
                            ].map((entry, index) => (
                                <div key={index} className="flex items-center justify-between p-3 bg-neutral-50 rounded-xl border border-gray-50 hover:bg-white hover:shadow-sm transition-all group">
                                    <div className="flex items-center gap-3">
                                        <div className="w-3 h-3 rounded-full" style={{ backgroundColor: entry.color }} />
                                        <span className="text-sm font-bold text-slate-600">{entry.name}</span>
                                    </div>
                                    <span className="text-sm font-black text-gray-800">{entry.value}%</span>
                                </div>
                            ))}
                        </div>
                        <div className="grid grid-cols-2 gap-4 mt-8 pt-8 border-t border-gray-100">
                            <div className="text-center">
                                <div className="text-[9px] text-slate-400 uppercase font-black tracking-widest mb-1">Avg Market Cap</div>
                                <div className="text-sm font-bold text-gray-700">₹1,41,660 Cr</div>
                            </div>
                            <div className="text-center border-l border-gray-100">
                                <div className="text-[9px] text-slate-400 uppercase font-black tracking-widest mb-1">Median Cap</div>
                                <div className="text-sm font-bold text-gray-700">₹59,816 Cr</div>
                            </div>
                        </div>
                    </div>

                    {/* 4. Sector Exposure & Drawdowns */}
                    <div className="lg:col-span-2 flex flex-col gap-8">
                        <div className="bg-white rounded-[2.5rem] p-8 shadow-2xl border border-gray-100">
                            <div className="flex items-center justify-between mb-10">
                                <h3 className="text-xl font-bold text-gray-800 flex items-center gap-3">
                                    <Layers className="text-primary" />
                                    Sector Exposure
                                </h3>
                                <div className="px-4 py-1.5 bg-primary/5 rounded-full text-primary text-[10px] font-black uppercase tracking-widest border border-primary/10">
                                    Top Sector: BFSI
                                </div>
                            </div>
                            <div className="grid md:grid-cols-2 gap-x-12 gap-y-6">
                                {sectorData.map((item, index) => {
                                    const maxVal = sectorData[0].value;
                                    const percentage = (item.value / maxVal) * 100;
                                    return (
                                        <div key={index} className="relative group">
                                            <div className="flex justify-between text-xs font-bold text-slate-700 mb-2 group-hover:text-primary transition-colors">
                                                <span>{item.name}</span>
                                                <span>{item.value}%</span>
                                            </div>
                                            <div className="h-2.5 w-full bg-slate-50 rounded-full overflow-hidden border border-gray-100">
                                                <motion.div
                                                    initial={{ width: 0 }}
                                                    whileInView={{ width: `${percentage}%` }}
                                                    transition={{ duration: 1, delay: index * 0.1 }}
                                                    className="h-full rounded-full"
                                                    style={{
                                                        background: 'linear-gradient(to right, #2076C7, #1CADA3)',
                                                        opacity: 1 - (index * 0.08)
                                                    }}
                                                />
                                            </div>
                                        </div>
                                    );
                                })}
                            </div>
                        </div>

                        {/* 8. Drawdowns & Recovery */}
                        <div className="bg-gradient-to-br from-[#2076C7] to-[#1CADA3] rounded-[2.5rem] p-8 shadow-xl text-white">
                            <h3 className="text-xl font-bold font-heading mb-8 flex items-center gap-3">
                                <Zap className="text-white" />
                                Drawdowns & Recovery
                            </h3>
                            <div className="space-y-6">
                                <div className="p-6 bg-white/10 backdrop-blur-md rounded-2xl border border-white/20">
                                    <div className="text-xs font-black uppercase tracking-widest text-white/60 mb-3">Resilience during Sep 2024 correction</div>
                                    <div className="flex items-center justify-between">
                                        <div>
                                            <div className="text-3xl font-black">+13.7%</div>
                                            <div className="text-[10px] font-bold text-white/40 italic">Strategy Return</div>
                                        </div>
                                        <div className="text-right">
                                            <div className="text-xl font-bold text-white/50">-1.8%</div>
                                            <div className="text-[10px] font-bold text-white/40 uppercase">Benchmark</div>
                                        </div>
                                    </div>
                                </div>
                                <div className="p-6 bg-white/10 backdrop-blur-md rounded-2xl border border-white/20">
                                    <div className="text-xs font-black uppercase tracking-widest text-white/60 mb-3">Rebound from Mar 2025 lows</div>
                                    <div className="flex items-center justify-between">
                                        <div>
                                            <div className="text-3xl font-black">+41.2%</div>
                                            <div className="text-[10px] font-bold text-white/40 italic">Strategy Alpha</div>
                                        </div>
                                        <div className="text-right">
                                            <div className="text-xl font-bold text-white/50">+20.5%</div>
                                            <div className="text-[10px] font-bold text-white/40 uppercase">Benchmark</div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <p className="text-sm font-medium italic mt-6 text-center opacity-80">
                                The strategy has delivered outperformance with lower volatility across market cycles.
                            </p>
                        </div>
                    </div>
                </div>

                {/* 5. Top Holdings */}
                <div className="mb-24">
                    <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-10">
                        <h3 className="text-2xl font-bold text-gray-800 flex items-center gap-3">
                            <Briefcase className="text-primary" />
                            Major Portfolio Holdings
                        </h3>
                        <div className="flex items-center gap-2 p-3 bg-amber-50 rounded-2xl border border-amber-100 text-amber-700 font-bold text-[10px] uppercase tracking-wider">
                            <AlertCircle size={14} />
                            Holdings are indicative and subject to change
                        </div>
                    </div>
                    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
                        {holdings.map((stock, i) => (
                            <motion.div
                                key={i}
                                initial={{ opacity: 0, scale: 0.95 }}
                                whileInView={{ opacity: 1, scale: 1 }}
                                transition={{ delay: i * 0.05 }}
                                className="bg-white p-6 rounded-3xl shadow-lg border border-gray-100 hover:shadow-2xl hover:-translate-y-2 transition-all duration-300 group relative overflow-hidden"
                            >
                                <div className="absolute top-0 right-0 w-24 h-24 bg-primary/5 rounded-full -mr-12 -mt-12 transition-transform duration-500 group-hover:scale-150" />
                                <div className="h-12 w-12 bg-neutral-50 rounded-2xl flex items-center justify-center text-primary font-black mb-4 group-hover:bg-primary group-hover:text-white transition-colors relative z-10 border border-gray-50 shadow-inner">
                                    {i + 1}
                                </div>
                                <div className="font-bold text-gray-800 text-sm mb-2 leading-tight h-10 group-hover:text-primary transition-colors relative z-10">{stock.name}</div>
                                <div className="text-lg font-black text-primary relative z-10">{stock.weight}</div>
                            </motion.div>
                        ))}
                    </div>
                </div>

                {/* 6 & 7. Philosophy & Attributes */}
                <div className="grid lg:grid-cols-2 gap-12 mb-24 items-start">
                    {/* Philosophy */}
                    <div className="bg-white rounded-[2.5rem] p-8 shadow-xl border border-gray-100 relative overflow-hidden group">
                        <div className="absolute top-0 right-0 w-64 h-64 bg-primary/5 rounded-full blur-[80px] -mr-32 -mt-32 transition-all duration-700 group-hover:bg-primary/10" />
                        <h3 className="text-2xl font-bold text-gray-800 mb-10 flex items-center gap-3 relative z-10">
                            <Target className="text-primary" />
                            Investment Approach
                        </h3>
                        <div className="space-y-6 relative z-10">
                            {[
                                { t: "Structural Growth", d: "Focus on long-term structural growth themes across India" },
                                { t: "Dual Growth Profile", d: "Blend of accelerated growth (“Magic”) and sustainable compounders" },
                                { t: "Quality Bias", d: "Quality businesses with strong governance and management" },
                                { t: "Valuation Discipline", d: "Valuation discipline through QGARP approach" },
                                { t: "Secure Framework", d: "Risk managed via proprietary CLEAR forensic framework" }
                            ].map((point, i) => (
                                <motion.div key={i} className="flex gap-5" whileInView={{ x: [20, 0], opacity: [0, 1] }} transition={{ delay: i * 0.1 }}>
                                    <div className="shrink-0 mt-1">
                                        <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center group-hover:bg-primary transition-colors">
                                            <CheckCircle className="text-primary w-5 h-5 group-hover:text-white transition-colors" />
                                        </div>
                                    </div>
                                    <div>
                                        <div className="text-primary font-black text-sm uppercase tracking-widest mb-1">{point.t}</div>
                                        <p className="text-gray-600 font-medium leading-relaxed">{point.d}</p>
                                    </div>
                                </motion.div>
                            ))}
                        </div>
                    </div>

                    {/* Risk Attributes */}
                    <div className="flex flex-col gap-8">
                        <div className="bg-white rounded-[2.5rem] p-8 shadow-xl border border-gray-100 relative overflow-hidden">
                            <h3 className="text-xl font-bold font-heading text-gray-800 mb-8 flex items-center gap-3">
                                <Activity className="text-primary" />
                                Portfolio Attributes
                            </h3>
                            <div className="grid grid-cols-2 gap-4">
                                {[
                                    { l: "Portfolio Beta (SI)", v: "0.9" },
                                    { l: "Sharpe Ratio (SI)", v: "0.9" },
                                    { l: "Std Dev (SI)", v: "15.1" },
                                    { l: "ROE (FY27)", v: "18.8%" },
                                    { l: "Net Debt / Equity (FY25)", v: "0.0" },
                                ].map((attr, i) => (
                                    <div key={i} className="bg-neutral-50 p-5 rounded-2xl border border-gray-100 hover:bg-white hover:shadow-lg hover:border-primary/20 transition-all duration-300">
                                        <div className="text-[10px] uppercase text-slate-400 font-extrabold tracking-widest mb-1">{attr.l}</div>
                                        <div className="text-2xl font-black text-gray-800">{attr.v}</div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>

                {/* 9. Who Should Invest */}
                <section className="mb-24">
                    <div className="max-w-5xl mx-auto">
                        <div className="text-center mb-12">
                            <h3 className="text-3xl md:text-4xl font-bold font-sans text-gray-800 mb-4 tracking-tight">
                                Who Should Invest?
                            </h3>
                            <div className="w-20 h-1.5 bg-gradient-to-r from-primary to-[#1CADA3] mx-auto rounded-full"></div>
                        </div>

                        <div className="grid md:grid-cols-2 gap-6">
                            {[
                                "Long-term investors (5+ years)",
                                "Moderate to high risk appetite",
                                "Investors seeking consistent compounding",
                                "Exposure to India’s structural growth themes"
                            ].map((point, i) => (
                                <motion.div
                                    key={i}
                                    initial={{ opacity: 0, y: 20 }}
                                    whileInView={{ opacity: 1, y: 0 }}
                                    transition={{ delay: i * 0.1 }}
                                    className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 flex items-center gap-4 hover:shadow-md hover:border-primary/20 transition-all group"
                                >
                                    <div className="w-10 h-10 rounded-full bg-primary/5 flex items-center justify-center text-primary group-hover:bg-primary group-hover:text-white transition-colors">
                                        <CheckCircle size={20} />
                                    </div>
                                    <span className="font-bold text-gray-700">{point}</span>
                                </motion.div>
                            ))}
                        </div>
                    </div>
                </section>
            </div>
        </div>
    );
}
