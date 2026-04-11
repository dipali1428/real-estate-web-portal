"use client";

import React, { useEffect } from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import {
    TrendingUp, ShieldCheck, PieChart, BarChart3, ArrowLeft,
    CheckCircle, Clock, Target, Calendar,
    Briefcase, Activity, Sliders, Layers
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

export default function CarnelianShiftDetail() {
    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);

    // Data for Performance Since Inception (Line Chart)
    const performanceData = {
        labels: ['2020', '2021', '2022', '2023', '2024', '2025'],
        datasets: [
            {
                label: 'Carnelian Shift',
                data: [100, 145, 190, 260, 380, 464],
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
                data: [100, 130, 145, 180, 220, 264],
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
        labels: ['1 Year', '2 Years', '3 Years', '5 Years', 'Since Incep'],
        datasets: [
            {
                label: 'Returns',
                data: [-3.5, 15.4, 30.1, 30.5, 34.0],
                backgroundColor: (context: any) => {
                    const val = context.dataset.data[context.dataIndex];
                    if (val < 0) return '#EF4444';
                    return context.dataIndex === 4 ? '#2076C7' : '#1CADA3';
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
                data: [16.2, 27.0, 55.0, 1.8],
                backgroundColor: ['#0E8A82', '#2076C7', '#1CADA3', '#94A3B8'],
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
        { name: 'Manufacturing', value: 80.8 },
        { name: 'Pharma & CDMO', value: 21.4 },
        { name: 'Engineering', value: 20.1 },
        { name: 'Technology', value: 17.4 },
        { name: 'Auto & Ancillary', value: 15.3 },
        { name: 'Consumption', value: 12.1 },
        { name: 'Chemicals', value: 4.4 },
        { name: 'Textiles', value: 4.2 },
        { name: 'Building Material', value: 3.4 },
    ].sort((a, b) => b.value - a.value);

    // Top Holdings
    const holdings = [
        { name: 'Laurus Labs', weight: '7.8%' },
        { name: 'Biocon', weight: '7.5%' },
        { name: 'Kalpataru Projects', weight: '5.2%' },
        { name: 'Pricol', weight: '4.3%' },
        { name: 'L&T Technology Services', weight: '4.2%' },
        { name: 'L&T', weight: '4.2%' },
        { name: 'Timken', weight: '4.1%' },
        { name: 'Tech Mahindra', weight: '3.9%' },
        { name: 'ASK Automotive', weight: '3.3%' },
        { name: 'Tata Motors', weight: '3.1%' },
    ];

    return (
        <div className="bg-neutral-50 font-sans text-gray-700">
            {/* Hero Section */}
            <div className="relative bg-gradient-to-r from-blue-50 to-white text-gray-700 pt-32 pb-48 overflow-hidden rounded-b-[3rem] shadow-2xl">
                <div className="absolute inset-0 bg-[url('/grid-pattern.svg')] opacity-10"></div>
                <div className="absolute top-0 right-0 w-96 h-96 bg-primary/5 rounded-full blur-[100px] -mr-32 -mt-32 animate-pulse"></div>

                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-left">
                    <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }}>
                        <Link href="/products/pms" className="inline-flex items-center text-gray-500 hover:text-primary transition-colors mb-6 group">
                            <div className="w-8 h-8 rounded-full bg-slate-100 flex items-center justify-center mr-3 group-hover:bg-primary transition-all">
                                <ArrowLeft size={16} />
                            </div>
                            <span className="font-bold tracking-wider uppercase text-sm">Back to PMS Products</span>
                        </Link>
                        <h1 className="text-5xl md:text-7xl font-extrabold mb-6 tracking-tighter font-sans leading-[1.1] bg-linear-to-r from-[#2076C7] via-[#1CADA3] to-[#2076C7] bg-clip-text text-transparent drop-shadow-sm">
                            Carnelian Shift <br />
                            Strategy
                        </h1>
                        <p className="text-xl md:text-2xl text-gray-600 max-w-3xl leading-relaxed">
                            A high-conviction mid and small-cap equity strategy focused on manufacturing and technology leaders benefiting from India’s structural transformation.
                        </p>
                    </motion.div>
                </div>
            </div>

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 -mt-32 relative z-20 pb-24">
                {/* Key Fund Details Cards */}
                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4 mb-16">
                    {[
                        { label: 'Inception', value: '06 Oct 2020', icon: Calendar },
                        { label: 'Benchmark', value: 'BSE 500 TRI', icon: Target },
                        { label: 'Style', value: 'QGARP', icon: Sliders },
                        { label: 'Stocks', value: '25–30', icon: Layers },
                        { label: 'Type', value: 'Mid & Small Cap', icon: PieChart },
                        { label: 'Track Record', value: '5+ Years', icon: Clock },
                    ].map((item, i) => (
                        <div key={i} className="bg-white p-6 rounded-[2rem] shadow-xl border border-white/20 flex flex-col items-center text-center hover:-translate-y-1 transition-transform duration-300">
                            <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center mb-3">
                                <item.icon className="text-primary w-6 h-6" />
                            </div>
                            <div className="text-xs text-gray-400 uppercase font-bold tracking-wider mb-1">{item.label}</div>
                            <div className="font-bold text-gray-900 leading-tight">{item.value}</div>
                        </div>
                    ))}
                </div>

                <div className="grid lg:grid-cols-3 gap-8 mb-16">
                    {/* Performance Snapshot */}
                    <div className="lg:col-span-2 bg-white rounded-[2.5rem] p-8 shadow-xl border border-gray-100 relative overflow-hidden group">
                        <div className="absolute top-0 right-0 w-64 h-64 bg-primary/5 rounded-full blur-[80px] -mr-32 -mt-32 transition-all duration-700 group-hover:bg-primary/10" />

                        <div className="flex items-center justify-between mb-8 relative z-10">
                            <div>
                                <h3 className="text-2xl font-bold font-sans text-gray-900 flex items-center gap-3">
                                    <TrendingUp className="text-primary" />
                                    Performance Since Inception
                                </h3>
                                <p className="text-gray-500 mt-1">Growth of ₹100 Invested</p>
                            </div>
                            <div className="text-right hidden md:block">
                                <div className="text-sm font-bold text-gray-400 uppercase tracking-widest">Active CAGR</div>
                                <div className="text-4xl font-black text-primary animate-in slide-in-from-right duration-700">34.0%</div>
                            </div>
                        </div>

                        <div className="h-[250px] md:h-[350px] w-full">
                            <Line data={performanceData} options={lineOptions} />
                        </div>

                        <div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-6">
                            <div className="bg-primary/5 rounded-2xl p-4 border border-primary/10">
                                <div className="text-xs text-gray-500 font-bold uppercase tracking-wider mb-1">Total Return</div>
                                <div className="text-2xl font-black text-primary">363.7%</div>
                                <div className="text-xs text-gray-400 mt-1">Absolute</div>
                            </div>
                            <div className="bg-neutral-50 rounded-2xl p-4 border border-gray-100">
                                <div className="text-xs text-gray-500 font-bold uppercase tracking-wider mb-1">Benchmark CAGR</div>
                                <div className="text-2xl font-black text-gray-700">20.3%</div>
                                <div className="text-xs text-gray-400 mt-1">Annualized</div>
                            </div>
                            <div className="bg-neutral-50 rounded-2xl p-4 border border-gray-100 flex items-center justify-center text-center">
                                <p className="text-sm text-gray-600 italic font-medium">
                                    ₹100 invested in Oct 2020 has grown to <span className="text-primary font-bold">~₹464</span>.
                                </p>
                            </div>
                        </div>
                    </div>

                    {/* Returns Profile */}
                    <div className="bg-white rounded-[2.5rem] p-8 shadow-xl border border-gray-100 flex flex-col justify-between">
                        <div>
                            <h3 className="text-xl font-bold font-sans text-gray-900 mb-6 flex items-center gap-2">
                                <BarChart3 className="text-[#1CADA3]" />
                                Returns Profile
                            </h3>
                            <div className="h-[200px] md:h-[250px] w-full mb-6">
                                <Bar data={returnsData} options={barOptions} />
                            </div>
                        </div>
                        <div className="bg-[#2076C7]/5 p-4 rounded-xl border border-[#2076C7]/10">
                            <p className="text-xs text-gray-500 leading-relaxed text-center">
                                Returns &gt; 1 year are annualized (CAGR) and calculated on TWRR basis.
                            </p>
                        </div>
                    </div>
                </div>

                <div className="grid lg:grid-cols-3 gap-8 mb-16 items-start">
                    {/* Market Allocation */}
                    <div className="bg-white rounded-[2.5rem] p-8 shadow-xl border border-gray-100 flex flex-col items-start">
                        <h3 className="text-xl font-bold font-sans text-gray-900 mb-6 flex items-center gap-2">
                            <PieChart className="text-primary" />
                            Market Allocation
                        </h3>
                        <div className="h-[200px] md:h-[250px] w-full relative mb-6">
                            <Pie data={allocationData} options={pieOptions} />
                            <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none">
                                <span className="text-3xl font-black text-gray-700">Mid/Sm</span>
                                <span className="text-xs font-bold text-gray-400 uppercase tracking-widest">Focus</span>
                            </div>
                        </div>
                        <div className="flex flex-wrap justify-center gap-4 mt-auto w-full">
                            {[
                                { name: 'Large Cap', value: 16.2, color: '#0E8A82' },
                                { name: 'Mid Cap', value: 27.0, color: '#2076C7' },
                                { name: 'Small Cap', value: 55.0, color: '#1CADA3' },
                                { name: 'Cash', value: 1.8, color: '#94A3B8' },
                            ].map((entry, index) => (
                                <div key={index} className="flex items-center gap-2">
                                    <div className="w-3 h-3 rounded-full" style={{ backgroundColor: entry.color }} />
                                    <span className="text-xs font-bold text-gray-600">{entry.name} {entry.value}%</span>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Sector Exposure */}
                    <div className="lg:col-span-2 bg-white rounded-[2.5rem] p-8 shadow-xl border border-gray-100">
                        <h3 className="text-xl font-bold font-sans text-gray-900 mb-6 flex items-center gap-2">
                            <Layers className="text-primary" />
                            Sector Exposure
                        </h3>
                        <div className="mb-6 bg-[#2076C7]/5 p-4 rounded-xl border border-[#2076C7]/10 text-sm text-gray-600 italic">
                            Portfolio is intentionally tilted towards manufacturing and technology to capture long-term capex and innovation cycles.
                        </div>
                        <div className="grid md:grid-cols-2 gap-x-12 gap-y-6">
                            {sectorData.map((item, index) => {
                                const maxVal = sectorData[0].value;
                                const percentage = (item.value / maxVal) * 100;
                                return (
                                    <div key={index} className="relative">
                                    <div className="flex justify-between text-sm font-bold text-gray-700 mb-2">
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
                    <h3 className="text-2xl font-bold font-sans text-gray-900 mb-8 flex items-center gap-2">
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
                <div className="grid lg:grid-cols-2 gap-12 mb-16 items-start">
                    <div className="bg-white rounded-[2.5rem] p-8 shadow-xl border border-gray-100 relative overflow-hidden">
                        <div className="absolute top-0 right-0 w-64 h-64 bg-primary/5 rounded-full blur-[80px] -mr-32 -mt-32" />
                        <h3 className="text-2xl font-bold font-sans text-gray-900 mb-8 flex items-center gap-3 relative z-10">
                            <Target className="text-primary" />
                            Investment Approach
                        </h3>
                        <div className="space-y-6 relative z-10">
                            {[
                                "Focus on mid & small-cap leaders in manufacturing and technology",
                                "Blend of accelerated growth (“Magic”) and sustainable compounders",
                                "Strong emphasis on governance, balance sheet strength and scalability",
                                "Valuation discipline using QGARP framework",
                                "Risk control via proprietary CLEAR forensic framework"
                            ].map((point, i) => (
                                <div key={i} className="flex gap-4">
                                    <div className="shrink-0 mt-1">
                                        <CheckCircle className="text-[#1CADA3] w-6 h-6" />
                                    </div>
                                    <p className="text-gray-700 font-medium leading-relaxed">{point}</p>
                                </div>
                            ))}
                        </div>
                    </div>

                    <div className="bg-white rounded-[2.5rem] p-8 shadow-xl border border-gray-100">
                        <h3 className="text-xl font-bold font-sans text-gray-900 mb-6 flex items-center gap-2">
                            <Activity className="text-primary" />
                            Portfolio Attributes
                        </h3>
                        <div className="grid grid-cols-2 gap-4">
                            {[
                                { l: "Beta (SI)", v: "0.9" },
                                { l: "Sharpe Ratio", v: "1.9" },
                                { l: "Std Dev", v: "14.5" },
                                { l: "ROE (FY27)", v: "19.0%" },
                                { l: "Net Debt/Equity", v: "0.0" },
                            ].map((attr, i) => (
                                <div key={i} className="bg-neutral-50 p-4 rounded-xl border border-gray-100">
                                    <div className="text-[10px] uppercase text-gray-400 font-bold tracking-wider mb-1">{attr.l}</div>
                                    <div className="text-lg font-black text-gray-700">{attr.v}</div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>

                {/* Who should invest */}
                <section>
                    <div className="max-w-5xl mx-auto">
                        <div className="text-center mb-12">
                            <h3 className="text-3xl md:text-4xl font-bold font-sans text-gray-800 mb-4 tracking-tight">
                                Is this right for you?
                            </h3>
                            <div className="w-20 h-1.5 bg-gradient-to-r from-primary to-[#1CADA3] mx-auto rounded-full"></div>
                        </div>

                        <div className="grid md:grid-cols-2 gap-6 w-full relative z-10">
                            {[
                                "Investors seeking high-growth mid & small caps",
                                "High risk appetite",
                                "Long-term horizon (5+ years)",
                                "Exposure to India’s manufacturing and technology upcycle"
                            ].map((point, i) => (
                                <motion.div
                                    key={i}
                                    initial={{ opacity: 0, y: 20 }}
                                    whileInView={{ opacity: 1, y: 0 }}
                                    transition={{ delay: i * 0.1 }}
                                    className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 flex items-center gap-4 hover:shadow-md hover:border-primary/20 transition-all group"
                                >
                                    <div className="w-10 h-10 rounded-full bg-primary/5 flex items-center justify-center text-primary group-hover:bg-primary group-hover:text-white transition-colors">
                                        <CheckCircle size={16} />
                                    </div>
                                    <span className="font-bold text-gray-700">{point}</span>
                                </motion.div>
                            ))}
                        </div>
                    </div>
                </section>

                {/* DISCLAIMER */}
                <div className="mt-16 mb-4">
                    <div className="bg-amber-50/50 border border-amber-200/50 rounded-2xl p-6 flex flex-col md:flex-row items-center gap-4 text-center md:text-left shadow-sm">
                        <div className="w-12 h-12 bg-amber-100 rounded-xl flex items-center justify-center shrink-0">
                            <ShieldCheck className="w-6 h-6 text-amber-600" />
                        </div>
                        <p className="text-amber-900 text-sm md:text-base font-medium leading-relaxed">
                            <strong>Disclaimer:</strong> Past performance may or may not be sustained in the future. Returns are calculated on a TWRR basis and are not verified by SEBI. Investments are subject to market risks.
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
}
