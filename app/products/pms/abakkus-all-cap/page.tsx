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

export default function AbakkusAllCapDetail() {
    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);

    // Data for Performance Since Inception (Line Chart)
    const performanceData = {
        labels: ['Oct 20', 'Jan 21', 'Jun 21', 'Dec 21', 'Jun 22', 'Dec 22', 'Jun 23', 'Dec 23', 'Jun 24', 'Dec 24', 'Jun 25', 'Dec 25'],
        datasets: [
            {
                label: 'Abakkus All Cap',
                data: [100, 115, 145, 180, 170, 195, 230, 260, 285, 310, 318, 322.66],
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
                data: [100, 110, 135, 160, 155, 175, 200, 230, 255, 290, 305, 315.4],
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
                backgroundColor: '#123E66',
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
        labels: ['1 Month', '1 Year', '3 Years', '5 Years', 'FY26 YTD'],
        datasets: [
            {
                label: 'Strategy',
                data: [1.25, 11.14, 19.77, 21.82, 19.51],
                backgroundColor: '#2076C7',
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
                backgroundColor: '#123E66',
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
                data: [58.17, 22.13, 15.51, 4.19],
                backgroundColor: ['#2076C7', '#1CADA3', '#4F46E5', '#94A3B8'],
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
            tooltip: { backgroundColor: '#123E66' }
        },
        cutout: '70%'
    };

    const sectorData = [
        { name: 'Banks', value: 18.60 },
        { name: 'Industrials', value: 13.74 },
        { name: 'Commodities', value: 12.03 },
        { name: 'NBFCs', value: 11.97 },
        { name: 'Healthcare', value: 7.87 },
    ].sort((a, b) => b.value - a.value);

    return (
        <div className="bg-neutral-50 min-h-screen font-sans text-gray-700 pb-20">
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
                            Abakkus All Cap <br />
                            <span className="text-[#2076C7]">
                                Approach
                            </span>
                        </h1>
                        <p className="text-xl md:text-2xl text-gray-600 max-w-3xl leading-relaxed">
                            A diversified all-cap equity strategy focused on fundamental investing across large, mid, and small cap companies to generate long-term risk-adjusted returns.
                        </p>
                    </motion.div>
                </div>
            </div>

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 -mt-32 relative z-20 pb-24">
                {/* Key Fund Details Cards */}
                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4 mb-16">
                    {[
                        { label: "Inception Date", value: "29 Oct 2020", icon: CalendarIcon },
                        { label: "Benchmark", value: "BSE 500 TRI", icon: TrendingUp },
                        { label: "Horizon", value: "3-5 Years", icon: Clock },
                        { label: "Style", value: "Bottom-up", icon: Search },
                        { label: "Type", value: "Multi-Cap", icon: ShieldCheck },
                        { label: "CAGR", value: "25.4%", icon: Activity }
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

                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-24">
                    {/* Performance Snapshot */}
                    <section className="bg-white rounded-[3rem] p-8 shadow-xl border border-gray-100 overflow-hidden relative">
                        <div className="absolute top-0 right-0 w-96 h-96 bg-[#2076C7]/5 rounded-full blur-[80px] -mr-48 -mt-48" />

                        <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center mb-16 gap-8">
                            <div>
                                <h2 className="text-4xl font-black text-gray-700 mb-4 font-heading">Performance Snapshot</h2>
                                <p className="text-slate-500 font-medium">Consistent portfolio growth through disciplined market cap diversification.</p>
                            </div>
                        </div>

                        <div className="grid lg:grid-cols-3 gap-8">
                            <div className="lg:col-span-2">
                                <div className="mb-6 flex justify-between items-center">
                                    <h3 className="text-xl font-bold text-gray-700 font-heading">Performance Since Inception</h3>
                                    <div className="text-xs text-slate-400 font-bold italic">Data as on 31 Dec 2025</div>
                                </div>
                                <div className="h-[300px] w-full">
                                    <Line data={performanceData} options={lineOptions} />
                                </div>
                            </div>

                            <div className="lg:col-span-1">
                                <h3 className="text-xl font-bold text-gray-700 mb-8 font-heading">Returns Summary</h3>
                                <div className="h-[350px] w-full">
                                    <Bar data={returnsData} options={barOptions} />
                                </div>
                            </div>
                        </div>
                    </section>

                    {/* Market Cap Allocation */}
                    <div className="grid lg:grid-cols-2 gap-12">
                        <section className="bg-white rounded-[3rem] p-10 shadow-xl border border-gray-100 flex flex-col">
                            <div className="flex items-center gap-4 mb-12">
                                <div className="w-12 h-12 bg-primary/10 text-primary rounded-2xl flex items-center justify-center">
                                    <PieChartIcon size={24} />
                                </div>
                                <h3 className="text-2xl font-black text-gray-700 font-heading">Market Cap Allocation</h3>
                            </div>

                            <div className="flex-grow flex flex-col md:flex-row items-center gap-12">
                                <div className="w-64 h-64 shrink-0 relative">
                                    <Pie data={marketCapData} options={pieOptions} />
                                </div>
                                <div className="flex-grow space-y-4 w-full">
                                    {[
                                        { name: 'Large Cap', value: 58.17, color: '#2076C7' },
                                        { name: 'Mid Cap', value: 22.13, color: '#1CADA3' },
                                        { name: 'Small Cap', value: 15.51, color: '#4F46E5' },
                                        { name: 'Cash', value: 4.19, color: '#94A3B8' },
                                    ].map((item, i) => (
                                        <div key={i} className="flex items-center justify-between p-4 bg-neutral-50 rounded-2xl border border-gray-100 group transition-all">
                                            <div className="flex items-center gap-4">
                                                <div className="w-4 h-4 rounded-full" style={{ backgroundColor: item.color }} />
                                                <span className="font-bold text-slate-700">{item.name}</span>
                                            </div>
                                            <span className="text-xl font-black text-gray-700">{item.value}%</span>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </section>

                        <section className="bg-white rounded-[3rem] p-10 shadow-xl border border-gray-100 flex flex-col">
                            <div className="flex items-center gap-4 mb-12">
                                <div className="w-12 h-12 bg-accent-teal/10 text-accent-teal rounded-2xl flex items-center justify-center">
                                    <Briefcase size={24} />
                                </div>
                                <h3 className="text-2xl font-black text-gray-700 font-heading">Sector Allocation</h3>
                            </div>

                            <div className="flex-grow space-y-4">
                                {sectorData.map((sector, i) => {
                                    const maxVal = Math.max(...sectorData.map(s => s.value));
                                    const percentage = (sector.value / maxVal) * 100;
                                    return (
                                        <div key={i} className="space-y-1">
                                            <div className="flex justify-between text-sm">
                                                <span className="font-bold text-slate-600">{sector.name}</span>
                                                <span className="font-black text-gray-700">{sector.value}%</span>
                                            </div>
                                            <div className="w-full h-2 bg-gray-100 rounded-full overflow-hidden">
                                                <motion.div
                                                    initial={{ width: 0 }}
                                                    whileInView={{ width: `${percentage}%` }}
                                                    transition={{ duration: 1, delay: i * 0.05 }}
                                                    className="h-full bg-accent-teal rounded-full"
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
                            <h3 className="text-3xl font-black text-gray-700 font-heading">Top 10 Holdings</h3>
                        </div>

                        <div className="grid md:grid-cols-2 gap-4">
                            {[
                                { name: "Aditya Birla Capital Ltd", weight: "6.39%" },
                                { name: "Max Financial Services Ltd", weight: "5.73%" },
                                { name: "IIFL Finance Ltd", weight: "5.58%" },
                                { name: "State Bank of India", weight: "5.50%" },
                                { name: "Vedanta Ltd", weight: "5.22%" },
                                { name: "Larsen & Toubro Ltd", weight: "5.09%" },
                                { name: "Axis Bank Ltd", weight: "5.04%" },
                                { name: "HDFC Bank Ltd", weight: "5.00%" },
                                { name: "Sun Pharmaceuticals", weight: "4.83%" },
                                { name: "Bharti Airtel Ltd", weight: "3.95%" }
                            ].map((stock, i) => (
                                <div key={i} className="flex items-center justify-between p-6 bg-neutral-50 rounded-2xl border border-gray-50 hover:shadow-md transition-all">
                                    <div className="flex items-center gap-6">
                                        <div className="w-10 h-10 bg-white rounded-lg shadow-sm flex items-center justify-center text-xs font-black text-primary">
                                            {i + 1}
                                        </div>
                                        <span className="font-black text-gray-700 text-lg">{stock.name}</span>
                                    </div>
                                    <div className="relative flex items-center gap-4">
                                        <span className="font-black text-primary text-xl">{stock.weight}</span>
                                        <div className="w-2 h-2 rounded-full bg-primary" />
                                    </div>
                                </div>
                            ))}
                        </div>
                    </section>
                </div>
            </div>
        </div>
    );
}
