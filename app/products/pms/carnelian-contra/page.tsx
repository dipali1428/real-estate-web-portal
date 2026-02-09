"use client";

import React, { useEffect } from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import {
    TrendingUp, ShieldCheck, PieChart, BarChart3, ArrowRight, ArrowLeft,
    CheckCircle, Clock, Target, Calendar, Award,
    Briefcase, FileText, Download, Phone, UserCheck, Users,
    X, Percent, Activity, Sliders, Layers
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

export default function CarnelianContraDetail() {
    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);

    // Data for Performance Since Inception (Line Chart)
    const performanceData = {
        labels: ['2022', '2023', '2024', '2025', '2026'],
        datasets: [
            {
                label: 'Carnelian Contra',
                data: [100, 110, 160, 210, 263],
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
                data: [100, 105, 130, 150, 167],
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
            legend: { display: false },
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

    // Trailing Returns
    const returnsData = {
        labels: ['1 Year', '2 Years', '3 Years', 'Since Incep'],
        datasets: [
            {
                label: 'Returns',
                data: [0.2, 14.0, 31.9, 27.9],
                backgroundColor: (context: any) => {
                    return context.dataIndex === 3 ? '#2076C7' : '#1CADA3';
                },
                borderRadius: 4,
                barThickness: 24,
            }
        ]
    };

    const barOptions = {
        indexAxis: 'y' as const,
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
            legend: { display: false },
            tooltip: { backgroundColor: '#1e293b' }
        },
        scales: {
            x: { display: false },
            y: {
                grid: { display: false },
                ticks: { color: '#64748b', font: { size: 11, weight: 600 } }
            }
        }
    };

    // Market Allocation
    const allocationData = {
        labels: ['Large Cap', 'Mid Cap', 'Small Cap', 'Cash'],
        datasets: [
            {
                data: [58.7, 9.8, 30.7, 0.8],
                backgroundColor: ['#2076C7', '#1CADA3', '#0F172A', '#94A3B8'],
                borderWidth: 0,
                hoverOffset: 10,
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
        cutout: '60%'
    };

    // Sector Exposure
    const sectorData = [
        { name: 'BFSI – Credit', value: 22.1 },
        { name: 'Oil & Gas', value: 11.5 },
        { name: 'IT', value: 10.6 },
        { name: 'Auto & Ancillary', value: 9.5 },
        { name: 'Chemicals', value: 7.9 },
        { name: 'Metals', value: 7.0 },
        { name: 'Pharma & CDMO', value: 6.8 },
        { name: 'BFSI – Non-Credit', value: 5.6 },
        { name: 'Consumption', value: 5.6 },
        { name: 'Power', value: 4.9 },
    ].sort((a, b) => b.value - a.value);

    // Top Holdings
    const holdings = [
        { name: 'Reliance Industries', weight: '11.5%' },
        { name: 'Kotak Mahindra Bank', weight: '9.6%' },
        { name: 'Bajaj Auto', weight: '7.2%' },
        { name: 'Infosys', weight: '7.0%' },
        { name: 'Vedanta', weight: '7.0%' },
        { name: 'Biocon', weight: '6.8%' },
        { name: 'Edelweiss Financial', weight: '5.6%' },
        { name: 'PVR Inox', weight: '5.6%' },
        { name: 'Punjab National Bank', weight: '5.3%' },
        { name: 'CESC', weight: '4.9%' },
    ];

    return (
        <div className="bg-neutral-50 font-sans text-gray-700">
            {/* Hero Section */}
            <div className="relative bg-gradient-to-r from-blue-50 to-white text-gray-700 pt-32 pb-48 overflow-hidden rounded-b-[3rem] shadow-2xl">
                <div className="absolute inset-0 bg-[url('/grid-pattern.svg')] opacity-10"></div>
                <div className="absolute top-0 right-0 w-96 h-96 bg-primary/5 rounded-full blur-[100px] -mr-32 -mt-32 animate-pulse"></div>

                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-left">
                    <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }}>
                        <Link href="/products/pms" className="inline-flex items-center text-slate-500 hover:text-primary transition-colors mb-6 group">
                            <div className="w-8 h-8 rounded-full bg-slate-100 flex items-center justify-center mr-3 group-hover:bg-primary transition-all">
                                <ArrowLeft size={16} />
                            </div>
                            <span className="font-bold tracking-wider uppercase text-sm">Back to PMS Products</span>
                        </Link>
                        <h1 className="text-5xl md:text-7xl font-bold mb-6 tracking-tight font-heading leading-[1.1] text-gray-700">
                            Carnelian Contra <br />
                            <span className="text-[#2076C7]">
                                Portfolio Strategy
                            </span>
                        </h1>
                        <p className="text-xl md:text-2xl text-gray-600 max-w-3xl leading-relaxed">
                            A large-cap-biased multi-cap equity strategy following a contrarian, absolute-return approach to generate superior risk-adjusted returns across market cycles.
                        </p>
                    </motion.div>
                </div>
            </div>

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 -mt-32 relative z-20 pb-24">
                {/* Key Fund Details Cards */}
                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4 mb-16">
                    {[
                        { label: 'Inception', value: '27 Jan 2022', icon: Calendar },
                        { label: 'Benchmark', value: 'BSE 500 TRI', icon: Target },
                        { label: 'Style', value: 'QGARP', icon: Sliders },
                        { label: 'Stocks', value: '20–25', icon: Layers },
                        { label: 'Type', value: 'Multi-Cap', icon: PieChart },
                        { label: 'Track Record', value: '3+ Years', icon: Clock },
                    ].map((item, i) => (
                        <div key={i} className="bg-white p-6 rounded-[2rem] shadow-xl border border-white/20 flex flex-col items-center text-center hover:-translate-y-1 transition-transform duration-300">
                            <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center mb-3">
                                <item.icon className="text-primary w-6 h-6" />
                            </div>
                            <div className="text-xs text-slate-500 uppercase font-bold tracking-wider mb-1">{item.label}</div>
                            <div className="font-bold text-gray-700 leading-tight">{item.value}</div>
                        </div>
                    ))}
                </div>

                <div className="grid lg:grid-cols-3 gap-8 mb-16">
                    {/* Performance Snapshot */}
                    <div className="lg:col-span-2 bg-white rounded-[2.5rem] p-8 shadow-xl border border-gray-100 relative overflow-hidden group">
                        <div className="absolute top-0 right-0 w-64 h-64 bg-primary/5 rounded-full blur-[80px] -mr-32 -mt-32 transition-all duration-700 group-hover:bg-primary/10" />

                        <div className="flex items-center justify-between mb-8 relative z-10">
                            <div>
                                <h3 className="text-2xl font-bold font-heading text-gray-700 flex items-center gap-3">
                                    <TrendingUp className="text-primary" />
                                    Performance Since Inception
                                </h3>
                                <p className="text-slate-500 mt-1">Growth of ₹100 Invested</p>
                            </div>
                            <div className="text-right hidden md:block">
                                <div className="text-sm font-bold text-slate-400 uppercase tracking-widest">Active CAGR</div>
                                <div className="text-4xl font-black text-primary animate-in slide-in-from-right duration-700">27.9%</div>
                            </div>
                        </div>

                        <div className="h-[350px] w-full">
                            <Line data={performanceData} options={lineOptions} />
                        </div>

                        <div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-6">
                            <div className="bg-primary/5 rounded-2xl p-4 border border-primary/10">
                                <div className="text-xs text-slate-500 font-bold uppercase tracking-wider mb-1">Total Return</div>
                                <div className="text-2xl font-black text-primary">162.7%</div>
                                <div className="text-xs text-slate-400 mt-1">Absolute</div>
                            </div>
                            <div className="bg-neutral-50 rounded-2xl p-4 border border-gray-100">
                                <div className="text-xs text-slate-500 font-bold uppercase tracking-wider mb-1">Benchmark CAGR</div>
                                <div className="text-2xl font-black text-slate-700">13.9%</div>
                                <div className="text-xs text-slate-400 mt-1">Annualized</div>
                            </div>
                            <div className="bg-neutral-50 rounded-2xl p-4 border border-gray-100 flex items-center justify-center text-center">
                                <p className="text-sm text-slate-600 italic font-medium">
                                    "₹100 invested in Jan 2022 has grown to <span className="text-primary font-bold">~₹263</span>."
                                </p>
                            </div>
                        </div>
                    </div>

                    {/* Returns Profile */}
                    <div className="bg-white rounded-[2.5rem] p-8 shadow-xl border border-gray-100 flex flex-col justify-between">
                        <div>
                            <h3 className="text-xl font-bold font-heading text-gray-700 mb-6 flex items-center gap-2">
                                <BarChart3 className="text-accent-teal" />
                                Returns Profile
                            </h3>
                            <div className="h-[250px] w-full mb-6">
                                <Bar data={returnsData} options={barOptions} />
                            </div>
                        </div>
                        <div className="bg-blue-50/50 p-4 rounded-xl border border-blue-100">
                            <p className="text-xs text-slate-500 leading-relaxed text-center">
                                Returns &gt; 1 year are annualized (CAGR) and calculated on TWRR basis.
                            </p>
                        </div>
                    </div>
                </div>

                <div className="grid lg:grid-cols-3 gap-8 mb-16">
                    {/* Market Allocation */}
                    <div className="bg-white rounded-[2.5rem] p-8 shadow-xl border border-gray-100">
                        <h3 className="text-xl font-bold font-heading text-gray-700 mb-6 flex items-center gap-2">
                            <PieChart className="text-primary" />
                            Market Allocation
                        </h3>
                        <div className="h-[250px] w-full relative">
                            <Pie data={allocationData} options={pieOptions} />
                            <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none">
                                <span className="text-3xl font-black text-gray-700">Large</span>
                                <span className="text-xs font-bold text-slate-400 uppercase tracking-widest">Bias</span>
                            </div>
                        </div>
                        <div className="flex flex-wrap justify-center gap-4 mt-6">
                            {[
                                { name: 'Large Cap', value: 58.7, color: '#2076C7' },
                                { name: 'Mid Cap', value: 9.8, color: '#1CADA3' },
                                { name: 'Small Cap', value: 30.7, color: '#0F172A' },
                                { name: 'Cash', value: 0.8, color: '#94A3B8' },
                            ].map((entry, index) => (
                                <div key={index} className="flex items-center gap-2">
                                    <div className="w-3 h-3 rounded-full" style={{ backgroundColor: entry.color }} />
                                    <span className="text-xs font-bold text-slate-600">{entry.name} {entry.value}%</span>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Sector Exposure */}
                    <div className="lg:col-span-2 bg-white rounded-[2.5rem] p-8 shadow-xl border border-gray-100">
                        <h3 className="text-xl font-bold font-heading text-gray-700 mb-6 flex items-center gap-2">
                            <Layers className="text-primary" />
                            Sector Exposure
                        </h3>
                        <div className="mb-6 bg-blue-50/50 p-4 rounded-xl border border-blue-100 text-sm text-slate-600 italic">
                            The portfolio maintains a strong large-cap bias while selectively investing in mid and small caps through a contrarian lens.
                        </div>
                        <div className="grid md:grid-cols-2 gap-x-12 gap-y-6">
                            {sectorData.map((item, index) => {
                                const maxVal = sectorData[0].value;
                                const percentage = (item.value / maxVal) * 100;
                                return (
                                    <div key={index} className="relative">
                                        <div className="flex justify-between text-sm font-bold text-slate-700 mb-2">
                                            <span>{item.name}</span>
                                            <span>{item.value}%</span>
                                        </div>
                                        <div className="h-3 w-full bg-gray-100 rounded-full overflow-hidden">
                                            <motion.div
                                                initial={{ width: 0 }}
                                                whileInView={{ width: `${percentage}%` }}
                                                transition={{ duration: 1, delay: index * 0.1 }}
                                                className="h-full rounded-full"
                                                style={{ backgroundColor: index < 3 ? '#2076C7' : '#1CADA3', opacity: 1 - (index * 0.05) }}
                                            />
                                        </div>
                                    </div>
                                );
                            })}
                        </div>
                    </div>
                </div>

                {/* Top Holdings */}
                <div className="mb-16">
                    <h3 className="text-2xl font-bold font-heading text-gray-700 mb-8 flex items-center gap-2">
                        <Briefcase className="text-primary" />
                        Top Holdings
                    </h3>
                    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
                        {holdings.map((stock, i) => (
                            <div key={i} className="bg-white p-5 rounded-2xl shadow-md border border-gray-100 hover:shadow-lg transition-all group">
                                <div className="h-10 w-10 bg-neutral-100 rounded-full flex items-center justify-center text-primary group-hover:bg-primary group-hover:text-white transition-colors mb-3">
                                    <span className="font-bold text-xs">{i + 1}</span>
                                </div>
                                <div className="font-bold text-gray-700 text-sm mb-1 leading-snug">{stock.name}</div>
                                <div className="text-xs font-bold text-primary">{stock.weight}</div>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Investment Approach */}
                <div className="grid lg:grid-cols-2 gap-12 mb-16">
                    <div className="bg-white rounded-[2.5rem] p-8 lg:p-12 shadow-xl border border-gray-100 relative overflow-hidden">
                        <div className="absolute top-0 right-0 w-64 h-64 bg-primary/5 rounded-full blur-[80px] -mr-32 -mt-32" />
                        <h3 className="text-2xl font-bold font-heading text-gray-700 mb-8 flex items-center gap-3 relative z-10">
                            <Target className="text-primary" />
                            Investment Approach
                        </h3>
                        <div className="space-y-6 relative z-10">
                            {[
                                "Contrarian, absolute-return focused investing",
                                "Preference for fundamentally strong businesses trading below intrinsic value",
                                "Large-cap bias to manage downside risk",
                                "Strong emphasis on governance and cash flows",
                                "Risk management through proprietary CLEAR forensic framework"
                            ].map((point, i) => (
                                <div key={i} className="flex gap-4">
                                    <div className="shrink-0 mt-1">
                                        <CheckCircle className="text-accent-teal w-6 h-6" />
                                    </div>
                                    <p className="text-slate-700 font-medium leading-relaxed">{point}</p>
                                </div>
                            ))}
                        </div>
                    </div>

                    <div className="bg-white rounded-[2.5rem] p-8 shadow-xl border border-gray-100">
                        <h3 className="text-xl font-bold font-heading text-gray-700 mb-6 flex items-center gap-2">
                            <Activity className="text-primary" />
                            Portfolio Attributes
                        </h3>
                        <div className="grid grid-cols-2 gap-4">
                            {[
                                { l: "Beta (SI)", v: "1.0" },
                                { l: "Sharpe Ratio", v: "1.5" },
                                { l: "Std Dev", v: "13.9" },
                                { l: "ROE (FY27)", v: "18.9%" },
                                { l: "Net Debt/Equity", v: "0.2" },
                            ].map((attr, i) => (
                                <div key={i} className="bg-neutral-50 p-4 rounded-xl border border-gray-100">
                                    <div className="text-[10px] uppercase text-slate-400 font-bold tracking-wider mb-1">{attr.l}</div>
                                    <div className="text-lg font-black text-gray-700">{attr.v}</div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>

                {/* Who should invest */}
                <section>
                    <div className="bg-white rounded-[4rem] p-10 lg:p-14 border border-gray-100 shadow-xl flex flex-col items-center text-center relative overflow-hidden">
                        <div className="absolute top-0 right-0 w-64 h-64 bg-primary/5 rounded-full blur-[80px] -mr-32 -mt-32" />
                        <h3 className="text-3xl font-black text-gray-700 mb-10 uppercase tracking-tighter leading-none font-heading relative z-10">Is this right <br /> <span className="text-primary">for you?</span></h3>
                        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4 w-full relative z-10">
                            {[
                                "Investors seeking a contrarian investing approach",
                                "Moderate to high risk appetite",
                                "Medium to long-term horizon (3+ years)",
                                "Preference for large-cap stability with selective alpha"
                            ].map((point, i) => (
                                <div key={i} className="bg-neutral-50 p-6 rounded-[2rem] border border-gray-100 flex flex-col items-center gap-4 group transition-all duration-300">
                                    <CheckCircle className="text-primary" size={16} />
                                    <span className="font-bold text-slate-700">{point}</span>
                                </div>
                            ))}
                        </div>
                    </div>
                </section>
            </div>
        </div>
    );
}
