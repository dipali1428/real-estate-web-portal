"use client";

import React, { useEffect } from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import {
    ArrowLeft, TrendingUp, ShieldCheck, Briefcase, Activity, BarChart as BarChartIcon, PieChart as PieChartIcon,
    AlertCircle, Award, Clock, Calendar
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

export default function InvescoChallengersDetail() {
    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);

    // Data for Performance Since Inception (Line Chart)
    const performanceData = {
        labels: ['Sep 21', 'Jan 22', 'Jun 22', 'Dec 22', 'Jun 23', 'Dec 23', 'May 24'],
        datasets: [
            {
                label: 'Portfolio',
                data: [100, 102, 95, 98, 110, 125, 133.69],
                borderColor: '#2076C7',
                backgroundColor: 'rgba(32, 118, 199, 0.1)',
                fill: true,
                tension: 0.4,
                borderWidth: 4,
                pointRadius: 0,
                pointHoverRadius: 6,
            },
            {
                label: 'BSE 500 TRI',
                data: [100, 104, 98, 105, 112, 122, 128],
                borderColor: '#94A3B8',
                backgroundColor: 'transparent',
                fill: false,
                borderDash: [5, 5],
                borderWidth: 2,
                pointRadius: 0,
                pointHoverRadius: 4,
            }
        ]
    };

    const lineOptions = {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
            legend: { display: false },
            tooltip: {
                backgroundColor: '#0E8A82', // Deep Teal
                padding: 12,
                titleFont: { size: 14, weight: 700 },
                bodyFont: { size: 13 },
                cornerRadius: 8,
            }
        },
        scales: {
            x: {
                grid: { display: false },
                ticks: { color: '#94A3B8', font: { size: 10, weight: 700 } }
            },
            y: {
                grid: { color: '#E2E8F0' },
                ticks: { color: '#94A3B8', font: { size: 10, weight: 700 } }
            }
        }
    };

    // Calendar Year Performance
    const calendarPerformance = {
        labels: ['2021', '2022', '2023', '2024 (YTD)'],
        datasets: [
            {
                label: 'Portfolio',
                data: [3.42, -4.17, 32.25, 7.45],
                backgroundColor: '#2076C7',
                borderRadius: 4,
            },
            {
                label: 'Benchmark',
                data: [-0.31, 4.77, 26.55, 8.99],
                backgroundColor: '#94A3B8',
                borderRadius: 4,
            }
        ]
    };

    const calendarOptions = {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
            legend: { display: false },
            tooltip: { backgroundColor: '#123E66' }
        },
        scales: {
            x: {
                grid: { display: false },
                ticks: { color: '#64748B', font: { size: 11, weight: 700 } }
            },
            y: {
                grid: { color: '#F1F5F9' },
                ticks: { color: '#64748B', font: { size: 11, weight: 700 } }
            }
        }
    };

    // Market Capitalisation Split
    const marketCapData = {
        labels: ['Large Cap', 'Mid Cap', 'Small Cap', 'Cash'],
        datasets: [
            {
                data: [41.3, 20.5, 33.1, 5.1],
                backgroundColor: ['#2076C7', '#1CADA3', '#0E8A82', '#94A3B8'],
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
            tooltip: { backgroundColor: '#0E8A82' }
        },
        cutout: '70%'
    };

    // Sector Exposure
    const sectorData = [
        { name: 'Financials', value: 34.0 },
        { name: 'Consumer Discretionary', value: 26.1 },
        { name: 'Healthcare', value: 9.8 },
        { name: 'Consumer Staples', value: 9.8 },
        { name: 'Communication Services', value: 7.7 },
        { name: 'Industrials', value: 5.9 },
        { name: 'Info Tech', value: 1.6 },
    ].sort((a, b) => b.value - a.value);

    // Portfolio Fundamentals
    const fundamentals = [
        { label: "2-Yr EPS CAGR (FY24–26E)", value: "22.96%" },
        { label: "ROE FY25E", value: "17.57%" },
        { label: "ROE FY26E", value: "19.09%" },
        { label: "P/E FY25E", value: "31.61" },
        { label: "P/E FY26E", value: "25.76" },
        { label: "Dividend Yield", value: "0.13%" }
    ];

    return (
        <div className="bg-neutral-50 min-h-screen font-sans text-gray-700 pb-20">
            {/* Hero Section */}
            <div className="relative bg-gradient-to-r from-blue-50 to-white text-gray-700 pt-32 pb-48 overflow-hidden rounded-b-[3rem] shadow-2xl">
                <div className="absolute inset-0 bg-[url('/grid-pattern.svg')] opacity-10"></div>
                <div className="absolute top-0 right-0 w-96 h-96 bg-primary/5 rounded-full blur-[100px] -mr-32 -mt-32 animate-pulse"></div>

                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-left">
                    <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }}>
                        <Link href="/products/pms" className="inline-flex items-center text-gray-500 hover:text-primary transition-colors mb-6 group">
                            <div className="w-8 h-8 rounded-full bg-gray-100 flex items-center justify-center mr-3 group-hover:bg-primary transition-all">
                                <ArrowLeft size={16} />
                            </div>
                            <span className="font-bold tracking-wider uppercase text-sm">Back to PMS Products</span>
                        </Link>
                        <h1 className="text-5xl md:text-7xl font-extrabold mb-6 tracking-tighter font-sans leading-[1.1] bg-linear-to-r from-[#2076C7] via-[#1CADA3] to-[#2076C7] bg-clip-text text-transparent drop-shadow-sm">
                            Invesco <br />
                            Challengers
                        </h1>
                        <p className="text-xl md:text-2xl text-gray-600 max-w-2xl leading-relaxed">
                            Investing in the next generation of market leaders. A strategy focused on companies disrupting established industries.
                        </p>
                    </motion.div>
                </div>
            </div>

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 -mt-32 relative z-20 pb-24">
                {/* Key Fund Details Cards */}
                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4 mb-16">
                    {[
                        { label: "Benchmark", value: "BSE 500 TRI", icon: TrendingUp },
                        { label: "Inception Date", value: "Sep 2021", icon: Calendar },
                        { label: "Horizon", value: "3+ Years", icon: Clock },
                        { label: "Style", value: "Growth", icon: Activity },
                        { label: "Focus", value: "Multi-Cap", icon: ShieldCheck },
                        { label: "CAGR", value: "13.7%", icon: BarChartIcon }
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

                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-24">
                    {/* Performance Snapshot */}
                    <section className="bg-white rounded-[3rem] p-8 lg:p-16 shadow-xl border border-gray-100 overflow-hidden relative">
                        <div className="absolute top-0 right-0 w-96 h-96 bg-[#2076C7]/5 rounded-full blur-[80px] -mr-48 -mt-48" />

                        <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center mb-16 gap-8">
                            <div>
                                <h2 className="text-3xl font-bold text-gray-900 mb-2 font-sans">Performance Snapshot</h2>
                                <p className="text-gray-500 font-medium">Relative performance driven by bottom-up stock selection.</p>
                            </div>
                        </div>

                        <div className="grid lg:grid-cols-2 gap-16">
                            <div>
                                <h3 className="text-xl font-bold text-gray-900 mb-8 font-sans">Performance Comparison</h3>
                                <div className="h-[250px] md:h-[350px] w-full">
                                    <Line data={performanceData} options={lineOptions} />
                                </div>
                            </div>

                            <div>
                                <h3 className="text-xl font-bold text-gray-900 mb-8 font-sans">Calendar Year Performance</h3>
                                <div className="h-[250px] md:h-[350px] w-full">
                                    <Bar data={calendarPerformance} options={calendarOptions} />
                                </div>
                            </div>
                        </div>
                    </section>

                    {/* Market Cap Allocation */}
                    <div className="grid lg:grid-cols-2 gap-12 items-start">
                        <section className="bg-white rounded-[3rem] p-10 shadow-xl border border-gray-100">
                            <div className="flex items-center gap-4 mb-12">
                                <div className="w-12 h-12 bg-primary/10 text-primary rounded-2xl flex items-center justify-center">
                                    <PieChartIcon size={24} />
                                </div>
                                <h3 className="text-2xl font-bold text-gray-900 font-sans">Market Cap Evolution</h3>
                            </div>

                            <div className="flex flex-col md:flex-row items-center gap-12">
                                <div className="w-full h-[200px] md:h-[250px] shrink-0 relative">
                                    <Pie data={marketCapData} options={pieOptions} />
                                    <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none">
                                        <span className="text-3xl font-black text-gray-700 tracking-tight">100%</span>
                                        <span className="text-[10px] text-gray-400 font-bold uppercase tracking-widest text-center">Fund <br /> Capacity</span>
                                    </div>
                                </div>
                                <div className="space-y-4 w-full">
                                    {[
                                        { name: 'Large Cap', value: 41.3, color: '#2076C7' },
                                        { name: 'Mid Cap', value: 20.5, color: '#1CADA3' },
                                        { name: 'Small Cap', value: 33.1, color: '#0E8A82' },
                                        { name: 'Cash', value: 5.1, color: '#94A3B8' },
                                    ].map((item, i) => (
                                        <div key={i} className="flex items-center justify-between p-4 bg-neutral-50 rounded-2xl border border-gray-100 group transition-all">
                                            <div className="flex items-center gap-4">
                                                <div className="w-4 h-4 rounded-full" style={{ backgroundColor: item.color }} />
                                                <span className="font-bold text-gray-700">{item.name}</span>
                                            </div>
                                            <span className="text-xl font-black text-gray-700">{item.value}%</span>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </section>

                        <section className="bg-white rounded-[3rem] p-10 shadow-xl border border-gray-100">
                            <div className="flex items-center gap-4 mb-12">
                                <div className="w-12 h-12 rounded-2xl flex items-center justify-center" style={{ backgroundColor: '#1CADA31A', color: '#1CADA3' }}>
                                    <Briefcase size={24} />
                                </div>
                                <h3 className="text-2xl font-bold text-gray-900 font-sans">Sector Exposure</h3>
                            </div>

                            <div className="space-y-4">
                                {sectorData.map((sector, i) => {
                                    const maxVal = sectorData[0].value;
                                    const percentage = (sector.value / maxVal) * 100;
                                    return (
                                        <div key={i} className="space-y-1">
                                            <div className="flex justify-between text-sm">
                                                <span className="font-bold text-gray-600">{sector.name}</span>
                                                <span className="font-bold text-gray-900">{sector.value}%</span>
                                            </div>
                                            <div className="w-full h-2 bg-gray-100 rounded-full overflow-hidden">
                                                <motion.div
                                                    initial={{ width: 0 }}
                                                    whileInView={{ width: `${percentage}%` }}
                                                    transition={{ duration: 1, delay: i * 0.05 }}
                                                    className="h-full rounded-full"
                                                    style={{ backgroundColor: '#1CADA3' }}
                                                />
                                            </div>
                                        </div>
                                    );
                                })}
                            </div>
                        </section>
                    </div>

                    {/* Top Holdings */}
                    <section className="bg-white rounded-[3rem] p-10 lg:p-14 shadow-xl border border-gray-100">
                        <div className="flex items-center gap-4 mb-12">
                            <div className="w-14 h-14 bg-neutral-100 text-primary rounded-2xl flex items-center justify-center">
                                <Award size={28} />
                            </div>
                            <h3 className="text-3xl font-bold text-gray-900 font-sans">Top 10 Holdings</h3>
                        </div>

                        <div className="grid md:grid-cols-2 lg:grid-cols-5 gap-4">
                            {[
                                { name: "Bharti Airtel Ltd", weight: "7.7%" },
                                { name: "Dixon Technologies", weight: "6.9%" },
                                { name: "Axis Bank Ltd", weight: "5.9%" },
                                { name: "PB Fintech Ltd", weight: "5.9%" },
                                { name: "ICICI Bank Ltd", weight: "5.6%" },
                                { name: "Mrs. Bectors Food", weight: "4.9%" },
                                { name: "TVS Motor Company", weight: "4.4%" },
                                { name: "Safari Industries", weight: "4.3%" },
                                { name: "KIMS Ltd", weight: "3.9%" },
                                { name: "JB Chemicals", weight: "3.8%" }
                            ].map((stock, i) => (
                                <div key={i} className="flex flex-col p-6 bg-neutral-50 rounded-2xl border border-gray-50 hover:shadow-md transition-all group text-center">
                                    <div className="text-[10px] text-primary font-black uppercase mb-3 px-2 py-0.5 bg-white rounded-full w-fit mx-auto group-hover:bg-primary group-hover:text-white transition-colors tracking-widest">{i + 1}</div>
                                    <span className="font-bold text-gray-700 text-sm mb-3 h-10 flex items-center justify-center">{stock.name}</span>
                                    <div className="mt-auto flex items-end justify-center gap-1">
                                        <span className="text-2xl font-black text-primary tracking-tighter">{stock.weight}</span>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </section>
                </div>
                
                {/* DISCLAIMER */}
                <div className="mt-16 mb-4">
                    <div className="bg-amber-50/50 border border-amber-200/50 rounded-2xl p-6 flex flex-col md:flex-row items-center gap-4 text-center md:text-left shadow-sm">
                        <div className="w-12 h-12 bg-amber-100 rounded-xl flex items-center justify-center shrink-0">
                            <AlertCircle className="w-6 h-6 text-amber-600" />
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
