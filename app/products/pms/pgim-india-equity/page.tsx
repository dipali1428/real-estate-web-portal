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

export default function PGIMIndiaEquityDetail() {
    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);

    // 1. Performance Data
    const performanceData = {
        labels: ['Mar 23', 'Mar 24', 'Mar 25', 'Dec 25'],
        datasets: [
            {
                label: 'PGIM Portfolio',
                data: [100, 136.7, 145.8, 148.9],
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
                label: 'NIFTY 50 TRI',
                data: [100, 130.1, 141.0, 145.0],
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

    // 2. Calendar Returns
    const calendarData = {
        labels: ['2024', '2025'],
        datasets: [
            {
                label: 'Returns',
                data: [19.99, -8.99],
                backgroundColor: (context: any) => {
                    const value = context.dataset.data[context.dataIndex];
                    return value < 0 ? '#EF4444' : '#2076C7';
                },
                borderRadius: 4,
                barThickness: 32,
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
                ticks: { color: '#64748b', font: { size: 14, weight: 700 } }
            }
        }
    };

    // 3. Asset Allocation (Market Cap)
    const allocationData = {
        labels: ['Large Cap', 'Mid Cap', 'Small Cap', 'Cash'],
        datasets: [
            {
                data: [18, 26, 52, 3],
                backgroundColor: ['#0F172A', '#2076C7', '#1CADA3', '#94A3B8'],
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

    // 4. Sector Allocation
    const sectorData = [
        { name: 'Industrials', value: 20.43 },
        { name: 'Information Technology', value: 16.75 },
        { name: 'Materials', value: 12.33 },
        { name: 'Financials', value: 12.25 },
        { name: 'Consumer Discretionary', value: 11.69 },
        { name: 'Health Care', value: 9.90 },
        { name: 'Communication Services', value: 7.06 },
        { name: 'Real Estate', value: 6.48 },
    ].sort((a, b) => b.value - a.value);

    // 5. Top Holdings
    const holdings = [
        { name: 'Bharti Airtel Ltd', weight: '7.06%' },
        { name: 'Shaily Engineering Plastics', weight: '4.92%' },
        { name: '360 ONE WAM Ltd', weight: '4.80%' },
        { name: 'HBL Engineering Ltd', weight: '4.80%' },
        { name: 'Jubilant Foodworks Ltd', weight: '4.74%' },
        { name: 'Blackbuck Ltd', weight: '4.53%' },
        { name: 'Tata Steel Ltd', weight: '4.29%' },
        { name: 'Kaynes Technology India', weight: '4.23%' },
        { name: 'RateGain Travel Technologies', weight: '4.23%' },
        { name: 'Timken India Ltd', weight: '4.02%' },
    ];

    return (
        <div className="bg-neutral-50 font-sans text-gray-700">
            {/* Hero Section */}
            <div className="relative bg-gradient-to-r from-blue-50 to-white text-gray-700 pt-32 pb-48 overflow-hidden rounded-b-[3rem] shadow-2xl">
                <div className="absolute inset-0 bg-[url('/grid-pattern.svg')] opacity-10"></div>
                <div className="absolute top-0 right-0 w-96 h-96 bg-white/10 rounded-full blur-[100px] -mr-32 -mt-32 animate-pulse space-y-4"></div>

                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-left">
                    <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }}>
                        <Link href="/products/pms" className="inline-flex items-center text-slate-500 hover:text-primary transition-colors mb-6 group">
                            <div className="w-8 h-8 rounded-full bg-slate-100 flex items-center justify-center mr-3 group-hover:bg-primary transition-all">
                                <ArrowLeft size={16} />
                            </div>
                            <span className="font-bold tracking-wider uppercase text-sm">Back to PMS Products</span>
                        </Link>
                        <h1 className="text-5xl md:text-7xl font-bold mb-6 tracking-tight font-heading leading-[1.1] text-gray-700">
                            PGIM India <br />
                            <span className="text-[#2076C7]">
                                Equity Portfolio
                            </span>
                        </h1>
                        <p className="text-xl md:text-2xl text-gray-600 max-w-3xl leading-relaxed">
                            A diversified multi-cap equity portfolio aiming for long-term capital appreciation through a disciplined, research-driven approach.
                        </p>
                    </motion.div>
                </div>
            </div>

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 -mt-32 relative z-20 pb-24">
                {/* Key Fund Details Cards */}
                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4 mb-16">
                    {[
                        { label: 'Inception', value: '19 Jan 2023', icon: Calendar },
                        { label: 'Manager', value: 'Mohit Khanna', icon: UserCheck },
                        { label: 'AUM', value: '₹120.14 Cr', icon: BarChart3 },
                        { label: 'Benchmark', value: 'NIFTY 50 TRI', icon: Target },
                        { label: 'Type', value: 'Multi-Cap', icon: PieChart },
                        { label: 'Horizon', value: '3+ Years', icon: Clock },
                    ].map((item, i) => (
                        <div key={i} className="bg-white p-6 rounded-[2rem] shadow-xl border border-white/20 flex flex-col items-center text-center hover:-translate-y-1 transition-transform duration-300">
                            <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center mb-3">
                                <item.icon className="text-primary w-6 h-6" />
                            </div>
                            <div className="text-xs text-slate-500 uppercase font-bold tracking-wider mb-1">{item.label}</div>
                            <div className="font-bold text-gray-700 leading-tight text-sm">{item.value}</div>
                        </div>
                    ))}
                </div>

                <div className="grid lg:grid-cols-3 gap-8 mb-16">
                    {/* Performance Summary */}
                    <div className="lg:col-span-2 bg-white rounded-[2.5rem] p-8 shadow-xl border border-gray-100 relative overflow-hidden group">
                        <div className="absolute top-0 right-0 w-64 h-64 bg-primary/5 rounded-full blur-[80px] -mr-32 -mt-32 transition-all duration-700 group-hover:bg-primary/10" />

                        <div className="flex items-center justify-between mb-8 relative z-10">
                            <div>
                                <h3 className="text-2xl font-bold font-heading text-gray-700 flex items-center gap-3">
                                    <TrendingUp className="text-primary" />
                                    Performance Journey
                                </h3>
                                <p className="text-slate-500 mt-1">Portfolio Growth vs Benchmark</p>
                            </div>
                        </div>

                        <div className="h-[350px] w-full">
                            <Line data={performanceData} options={lineOptions} />
                        </div>

                        <div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-6">
                            <div className="bg-primary/5 rounded-2xl p-4 border border-primary/10">
                                <div className="text-xs text-slate-500 font-bold uppercase tracking-wider mb-1">FY 2023-24</div>
                                <div className="text-2xl font-black text-primary">36.73%</div>
                                <div className="text-xs text-slate-400 mt-1">Outperformance</div>
                            </div>
                            <div className="bg-neutral-50 rounded-2xl p-4 border border-gray-100">
                                <div className="text-xs text-slate-500 font-bold uppercase tracking-wider mb-1">FY 2024-25</div>
                                <div className="text-2xl font-black text-slate-700">6.63%</div>
                                <div className="text-xs text-slate-400 mt-1">In Line</div>
                            </div>
                            <div className="bg-neutral-50 rounded-2xl p-4 border border-gray-100 flex items-center justify-center text-center">
                                <p className="text-sm text-slate-600 italic font-medium">
                                    "Consistently delivering competitive performance across market cycles."
                                </p>
                            </div>
                        </div>
                    </div>

                    {/* Calendar Returns */}
                    <div className="bg-white rounded-[2.5rem] p-8 shadow-xl border border-gray-100 flex flex-col justify-between">
                        <div>
                            <h3 className="text-xl font-bold font-heading text-gray-700 mb-6 flex items-center gap-2">
                                <BarChart3 className="text-accent-teal" />
                                Calendar Returns
                            </h3>
                            <div className="h-[250px] w-full mb-6">
                                <Bar data={calendarData} options={barOptions} />
                            </div>
                        </div>
                        <div className="bg-blue-50/50 p-4 rounded-xl border border-blue-100">
                            <p className="text-xs text-slate-500 leading-relaxed text-center">
                                Returns are net of all fees and charges; calculated on TWRR basis.
                            </p>
                        </div>
                    </div>
                </div>

                <div className="grid lg:grid-cols-3 gap-8 mb-16">
                    {/* Market Cap Split */}
                    <div className="bg-white rounded-[2.5rem] p-8 shadow-xl border border-gray-100">
                        <h3 className="text-xl font-bold font-heading text-gray-700 mb-6 flex items-center gap-2">
                            <PieChart className="text-primary" />
                            Market Allocation
                        </h3>
                        <div className="h-[250px] w-full relative">
                            <Pie data={allocationData} options={pieOptions} />
                            <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none">
                                <span className="text-3xl font-black text-gray-700">52%</span>
                                <span className="text-xs font-bold text-slate-400 uppercase tracking-widest">Small Cap</span>
                            </div>
                        </div>
                        <div className="flex flex-wrap justify-center gap-4 mt-6">
                            {allocationData.labels.map((label, index) => (
                                <div key={index} className="flex items-center gap-2">
                                    <div className="w-3 h-3 rounded-full" style={{ backgroundColor: (allocationData.datasets[0].backgroundColor as string[])[index] }} />
                                    <span className="text-xs font-bold text-slate-600">{label} {allocationData.datasets[0].data[index]}%</span>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Sector Allocation */}
                    <div className="lg:col-span-2 bg-white rounded-[2.5rem] p-8 shadow-xl border border-gray-100">
                        <h3 className="text-xl font-bold font-heading text-gray-700 mb-6 flex items-center gap-2">
                            <Layers className="text-primary" />
                            Sector Exposure
                        </h3>
                        <div className="mb-6 bg-blue-50/50 p-4 rounded-xl border border-blue-100 text-sm text-slate-600 italic">
                            Diversified exposure with strong focus on Industrials, IT, and Financials.
                        </div>
                        <div className="grid md:grid-cols-2 gap-x-12 gap-y-6">
                            {sectorData.map((item, index) => (
                                <div key={index} className="relative">
                                    <div className="flex justify-between text-sm font-bold text-slate-700 mb-2">
                                        <span>{item.name}</span>
                                        <span>{item.value}%</span>
                                    </div>
                                    <div className="h-3 w-full bg-gray-100 rounded-full overflow-hidden">
                                        <motion.div
                                            initial={{ width: 0 }}
                                            whileInView={{ width: `${item.value}%` }}
                                            transition={{ duration: 1, delay: index * 0.1 }}
                                            className="h-full rounded-full"
                                            style={{ backgroundColor: index < 3 ? '#2076C7' : '#1CADA3', opacity: 1 - (index * 0.05) }}
                                        />
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>

                {/* Top Holdings */}
                <div className="mb-16">
                    <h3 className="text-2xl font-bold font-heading text-gray-700 mb-8 flex items-center gap-2">
                        <Briefcase className="text-primary" />
                        Top Portfolio Holdings
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
                    <p className="text-xs text-slate-400 mt-4 italic">* Holdings are indicative and subject to change.</p>
                </div>

                <div className="grid lg:grid-cols-2 gap-12 mb-16">
                    {/* Investment Philosophy */}
                    <div className="bg-white rounded-[2.5rem] p-8 lg:p-12 shadow-xl border border-gray-100 relative overflow-hidden">
                        <div className="absolute top-0 right-0 w-64 h-64 bg-primary/5 rounded-full blur-[80px] -mr-32 -mt-32" />
                        <h3 className="text-2xl font-bold font-heading text-gray-700 mb-8 flex items-center gap-3 relative z-10">
                            <Target className="text-primary" />
                            Investment Approach
                        </h3>
                        <div className="space-y-6 relative z-10">
                            {[
                                "Bottom-up stock selection across market capitalisations",
                                "Focus on companies with strong business models and scalability",
                                "Emphasis on sustainable earnings growth and valuation discipline",
                                "Active portfolio management with risk controls",
                                "Research-driven disciplined processes"
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

                    {/* Risk & Portfolio Attributes */}
                    <div className="bg-white rounded-[2.5rem] p-8 shadow-xl border border-gray-100">
                        <h3 className="text-xl font-bold font-heading text-gray-700 mb-6 flex items-center gap-2">
                            <Activity className="text-primary" />
                            Portfolio Statistics & Risk
                        </h3>
                        <div className="grid grid-cols-2 gap-4">
                            {[
                                { l: "Weighted Avg RoCE", v: "19.63%", sub: "(ex-financials)" },
                                { l: "Portfolio P/E", v: "33.25", sub: "(FY27E)" },
                                { l: "Sharpe Ratio", v: "0.53", sub: "" },
                                { l: "Standard Deviation", v: "15.52%", sub: "" },
                                { l: "Beta", v: "0.99", sub: "" },
                                { l: "Jensen Alpha", v: "0.55", sub: "" },
                                { l: "Top 10 Concentration", v: "47.62%", sub: "" },
                            ].map((attr, i) => (
                                <div key={i} className={`bg-neutral-50 p-4 rounded-xl border border-gray-100 ${i === 6 ? 'col-span-2' : ''}`}>
                                    <div className="text-[10px] uppercase text-slate-400 font-bold tracking-wider mb-1">{attr.l}</div>
                                    <div className="text-lg font-black text-gray-700">{attr.v}</div>
                                    {attr.sub && <div className="text-[10px] text-slate-400">{attr.sub}</div>}
                                </div>
                            ))}
                        </div>
                    </div>
                </div>

                {/* Who Should Invest */}
                <section>
                    <div className="bg-white rounded-[4rem] p-10 lg:p-14 border border-gray-100 shadow-xl flex flex-col items-center text-center relative overflow-hidden">
                        <div className="absolute top-0 right-0 w-64 h-64 bg-primary/5 rounded-full blur-[80px] -mr-32 -mt-32" />

                        <div className="w-20 h-20 bg-primary/10 rounded-[2rem] flex items-center justify-center mb-8 relative z-10">
                            <Users className="text-primary" size={36} />
                        </div>
                        <h3 className="text-3xl font-black text-gray-700 mb-10 uppercase tracking-tighter leading-none font-heading relative z-10">Is this right <br /> <span className="text-primary">for you?</span></h3>
                        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4 w-full relative z-10">
                            {[
                                "Investors seeking diversified multi-cap exposure",
                                "Moderate to high risk appetite",
                                "Minimum investment horizon of 3 years",
                                "Objective of long-term capital appreciation"
                            ].map((point, i) => (
                                <div key={i} className="bg-neutral-50 p-6 rounded-[2rem] border border-gray-100 flex flex-col items-center gap-4 group hover:border-primary/20 hover:shadow-md transition-all duration-300">
                                    <div className="w-8 h-8 rounded-full bg-white shadow-sm flex items-center justify-center group-hover:bg-primary transition-colors">
                                        <CheckCircle className="text-primary group-hover:text-white" size={16} />
                                    </div>
                                    <span className="font-bold text-slate-700 group-hover:text-gray-700 transition-colors">{point}</span>
                                </div>
                            ))}
                        </div>
                    </div>
                </section>

                {/* Disclaimer & CTA */}
                <div className="mt-16 text-center">
                    <div className="flex flex-col md:flex-row gap-6 justify-center">
                        <a href="/assets/factsheets/PGIM India Equity Portfolio - Factsheet December 2025.pdf" target="_blank" rel="noopener noreferrer" className="bg-[#2076C7] hover:bg-[#185ea0] text-white px-10 py-5 rounded-xl font-bold text-lg shadow-xl hover:shadow-2xl transition-all flex items-center justify-center gap-3">
                            <Download size={20} />
                            Download Factsheet
                        </a>
                        <a href="tel:18005327600" className="bg-white hover:bg-gray-50 text-gray-700 px-10 py-5 rounded-xl font-bold text-lg shadow-lg hover:shadow-xl border border-gray-100 transition-all flex items-center justify-center gap-3">
                            <Phone size={20} className="text-primary" />
                            Request Callback
                        </a>
                    </div>
                </div>
            </div>
        </div>
    );
}
