"use client";

import React, { useEffect } from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import {
    ArrowLeft, Download, Calculator, TrendingUp, ShieldCheck,
    User, Briefcase, ChevronRight, FileText, Activity,
    CheckCircle, BarChart as BarChartIcon, PieChart as PieChartIcon,
    AlertCircle, Info, MessageSquare, PhoneCall, Award, Users,
    Search, TrendingDown, Clock, Calendar as CalendarIcon
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

export default function AbakkusEmergingDetail() {
    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);

    // Data for Performance Since Inception (Line Chart)
    const performanceData = {
        labels: ['Aug 20', 'Dec 20', 'Jun 21', 'Dec 21', 'Jun 22', 'Dec 22', 'Jun 23', 'Dec 23', 'Jun 24', 'Dec 24', 'Jun 25', 'Dec 25'],
        datasets: [
            {
                label: 'Abakkus Emerging',
                data: [100, 125, 160, 210, 195, 230, 280, 320, 350, 385, 390, 392.39],
                borderColor: '#1CADA3',
                backgroundColor: 'rgba(28, 173, 163, 0.1)',
                fill: true,
                tension: 0.4,
                borderWidth: 4,
                pointRadius: 0,
                pointHoverRadius: 6,
            },
            {
                label: 'BSE 500 TRI',
                data: [100, 118, 140, 170, 165, 185, 210, 240, 270, 310, 325, 335.2],
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

    const returnsData = {
        labels: ['1 Year', '3 Years', '5 Years', 'Inception'],
        datasets: [
            {
                label: 'Strategy',
                data: [12.15, 24.21, 25.99, 29.11],
                backgroundColor: '#1CADA3',
                borderRadius: 8,
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
            tooltip: {
                backgroundColor: '#0E8A82',
                callbacks: {
                    label: (context: any) => `${context.dataset.label}: ${context.parsed.x}%`
                }
            }
        },
        scales: {
            x: { display: false },
            y: {
                grid: { display: false },
                ticks: { color: '#475569', font: { size: 12, weight: 800 } }
            }
        }
    };

    const marketCapData = {
        labels: ['Large Cap', 'Mid Cap', 'Small Cap', 'Cash'],
        datasets: [
            {
                data: [8.93, 36.06, 48.36, 6.65],
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

    const sectorData = [
        { name: 'Banks', value: 17.48 },
        { name: 'NBFCs', value: 12.94 },
        { name: 'Healthcare', value: 9.51 },
        { name: 'Commodities', value: 8.77 },
        { name: 'Industrials', value: 8.18 },
    ].sort((a, b) => b.value - a.value);

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
                            Abakkus <br />
                            Emerging Opportunities
                        </h1>
                        <p className="text-xl md:text-2xl text-gray-600 max-w-3xl leading-relaxed">
                            A fundamentally driven equity portfolio focused on emerging businesses across mid and small caps with long-term growth potential.
                        </p>
                    </motion.div>
                </div>
            </div>

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 -mt-32 relative z-20 pb-24">
                {/* Key Fund Details Cards */}
                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4 mb-16">
                    {[
                        { label: "Inception Date", value: "26 Aug 2020", icon: CalendarIcon },
                        { label: "Benchmark", value: "BSE 500 TRI", icon: TrendingUp },
                        { label: "Horizon", value: "3-5 Years", icon: Clock },
                        { label: "Style", value: "Bottom-up", icon: Search },
                        { label: "Type", value: "Mid & Small Cap", icon: ShieldCheck },
                        { label: "CAGR", value: "29.1%", icon: Activity }
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
                    {/* Performance Summary */}
                    <section className="bg-white rounded-[3rem] p-8 shadow-xl border border-gray-100 overflow-hidden relative">
                        <div className="absolute top-0 right-0 w-96 h-96 bg-[#2076C7]/5 rounded-full blur-[80px] -mr-48 -mt-48" />

                        <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center mb-16 gap-8">
                            <div>
                                <h2 className="text-3xl font-bold text-gray-900 mb-2 font-sans">Performance Snapshot</h2>
                                <p className="text-gray-500 font-medium">Consistent portfolio growth through disciplined market cap diversification.</p>
                            </div>
                            <div className="flex gap-4">
                                <div className="flex items-center gap-2">
                                    <div className="w-3 h-3 rounded-full bg-primary" />
                                    <span className="text-xs font-bold text-gray-600">Abakkus Emerging</span>
                                </div>
                                <div className="flex items-center gap-2">
                                    <div className="w-3 h-3 rounded-full bg-gray-300" />
                                    <span className="text-xs font-bold text-gray-600">BSE 500 TRI</span>
                                </div>
                            </div>
                        </div>

                        <div className="grid lg:grid-cols-3 gap-8">
                            <div className="lg:col-span-2">
                                <div className="mb-6 flex justify-between items-center">
                                    <h3 className="text-xl font-bold text-gray-900 font-sans">Performance Since Inception</h3>
                                    <div className="text-xs text-gray-400 font-bold italic">Data as on 31 Dec 2025</div>
                                </div>
                                <div className="h-[200px] md:h-[300px] w-full">
                                    <Line data={performanceData} options={lineOptions} />
                                </div>
                            </div>

                            <div className="lg:col-span-1">
                                <h3 className="text-xl font-bold text-gray-900 mb-8 font-sans">Returns Summary</h3>
                                <div className="h-[200px] md:h-[300px] w-full">
                                    <Bar data={returnsData} options={barOptions} />
                                </div>
                                <div className="mt-4 text-center">
                                    <span className="bg-neutral-100 text-gray-400 text-[10px] font-black uppercase tracking-widest px-4 py-2 rounded-full">
                                        Indicative Split
                                    </span>
                                </div>
                            </div>
                        </div>
                    </section>

                    {/* Asset Allocation */}
                    <div className="grid lg:grid-cols-2 gap-12 items-start">
                        <section className="bg-white rounded-[3rem] p-10 shadow-xl border border-gray-100">
                            <div className="flex items-center gap-4 mb-12">
                                <div className="w-12 h-12 bg-primary/10 text-primary rounded-2xl flex items-center justify-center">
                                    <PieChartIcon size={24} />
                                </div>
                                <div>
                                    <h3 className="text-2xl font-bold text-gray-900 font-sans">Market Cap Allocation</h3>
                                    <p className="text-gray-400 text-sm font-bold tracking-tight">Tilt towards Mid & Small Caps</p>
                                </div>
                            </div>

                            <div className="flex flex-col md:flex-row items-center gap-12">
                                <div className="w-full h-[200px] md:h-[250px] shrink-0 relative">
                                    <Pie data={marketCapData} options={pieOptions} />
                                    <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none">
                                        <span className="text-3xl font-black text-gray-700 tracking-tight">100%</span>
                                        <span className="text-[10px] text-gray-400 font-bold uppercase">Allocated</span>
                                    </div>
                                </div>
                                <div className="space-y-4 w-full">
                                    {[
                                        { name: 'Large Cap', value: 8.93, color: '#2076C7' },
                                        { name: 'Mid Cap', value: 36.06, color: '#1CADA3' },
                                        { name: 'Small Cap', value: 48.36, color: '#0E8A82' },
                                        { name: 'Cash', value: 6.65, color: '#94A3B8' },
                                    ].map((item, i) => (
                                        <div key={i} className="flex items-center justify-between p-4 bg-neutral-50 rounded-2xl border border-gray-100 group hover:border-primary/30 transition-all">
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
                                <div>
                                    <h3 className="text-2xl font-bold text-gray-900 font-sans">Sector Allocation</h3>
                                    <p className="text-gray-400 text-sm font-bold tracking-tight">Top sector industry distribution</p>
                                </div>
                            </div>

                            <div className="space-y-4">
                                {sectorData.map((sector, i) => {
                                    const maxVal = Math.max(...sectorData.map(s => s.value));
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
                            <div>
                                <h3 className="text-3xl font-bold text-gray-900 font-sans uppercase tracking-tighter">Market Highlights</h3>
                                <p className="text-gray-400 text-sm font-bold">High-conviction emerging opportunities</p>
                            </div>
                        </div>

                        <div className="grid md:grid-cols-2 gap-4">
                            {[
                                { name: "Federal Bank Ltd", weight: "6.03%" },
                                { name: "IIFL Finance Ltd", weight: "5.19%" },
                                { name: "Max Financial Services", weight: "5.04%" },
                                { name: "Sarda Energy & Minerals", weight: "5.01%" },
                                { name: "PNB Housing Finance", weight: "4.79%" },
                                { name: "Canara Bank", weight: "4.68%" },
                                { name: "The Anup Engineering", weight: "4.49%" },
                                { name: "Axis Bank", weight: "4.25%" },
                                { name: "Jindal Stainless", weight: "3.76%" },
                                { name: "LT Foods", weight: "3.65%" }
                            ].map((stock, i) => (
                                <div key={i} className="flex items-center justify-between p-6 bg-neutral-50 rounded-2xl border border-gray-50 hover:shadow-md transition-all">
                                    <div className="flex items-center gap-6">
                                        <div className="w-10 h-10 bg-white rounded-lg shadow-sm flex items-center justify-center text-xs font-black text-primary">
                                            {i + 1}
                                        </div>
                                        <span className="font-bold text-gray-700 text-lg">{stock.name}</span>
                                    </div>
                                    <div className="relative flex items-center gap-4">
                                        <span className="font-bold text-primary text-xl">{stock.weight}</span>
                                        <div className="w-2 h-2 rounded-full bg-primary" />
                                    </div>
                                </div>
                            ))}
                        </div>
                    </section>
                </div>
            </div>

            {/* DISCLAIMER */}
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-16 mb-4">
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
    );
}
