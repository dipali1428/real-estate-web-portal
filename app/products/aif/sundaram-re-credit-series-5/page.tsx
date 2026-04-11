"use client";

import React, { useEffect } from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import {
    ArrowLeft, TrendingUp, ShieldCheck,
    Briefcase, FileText,
    CheckCircle, BarChart as BarChartIcon, PieChart as PieChartIcon,
    AlertCircle, Target, Users, Clock, IndianRupee
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
import { Bar, Pie } from 'react-chartjs-2';

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

export default function SundaramRECreditDetail() {
    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);

    // Asset Allocation Data
    const assetData = {
        labels: ['Residential Projects', 'Commercial Real Estate', 'Mixed Use / Others'],
        datasets: [
            {
                data: [50, 30, 20],
                backgroundColor: ['#1CADA3', '#2076C7', '#123E66'],
                borderWidth: 0,
                hoverOffset: 10,
            }
        ]
    };

    // Investment Type Data
    const investmentTypeData = {
        labels: ['Secured Debt', 'Structured Credit', 'Mezzanine'],
        datasets: [
            {
                label: 'Allocation %',
                data: [65, 25, 10],
                backgroundColor: '#1CADA3',
                borderRadius: 8,
                barThickness: 40,
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

    const barOptions = {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
            legend: { display: false },
        },
        scales: {
            x: { grid: { display: false } },
            y: { grid: { color: '#f1f5f9' }, beginAtZero: true, max: 100 }
        }
    };

    return (
        <div className="bg-neutral-50 min-h-screen font-sans text-gray-700 pb-20">
            {/* Hero Section */}
            <div className="relative bg-gradient-to-r from-teal-50 to-white text-gray-700 pt-32 pb-48 overflow-hidden rounded-b-[3rem] shadow-2xl">
                <div className="absolute inset-0 bg-[url('/grid-pattern.svg')] opacity-10"></div>
                <div className="absolute top-0 right-0 w-96 h-96 bg-[#1CADA3]/10 rounded-full blur-[100px] -mr-32 -mt-32 animate-pulse"></div>

                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-left">
                    <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }}>
                        <Link href="/products/aif" className="inline-flex items-center text-gray-500 hover:text-[#1CADA3] transition-colors mb-6 group">
                            <div className="w-8 h-8 rounded-full bg-gray-100 flex items-center justify-center mr-3 group-hover:bg-[#1CADA3] group-hover:text-white transition-all">
                                <ArrowLeft size={16} />
                            </div>
                            <span className="font-bold tracking-wider uppercase text-sm">Back to AIF Products</span>
                        </Link>
                        <h1 className="text-5xl md:text-7xl font-extrabold mb-6 tracking-tighter font-sans leading-[1.1] bg-gradient-to-r from-[#1CADA3] via-[#2076C7] to-[#1CADA3] bg-clip-text text-transparent drop-shadow-sm">
                            Sundaram Real Estate <br />
                            Credit Income (Sr 5)
                        </h1>
                        <p className="text-xl md:text-2xl text-gray-600 max-w-3xl leading-relaxed">
                            A real estate-focused credit AIF designed to generate stable income through secured, asset-backed lending and developer financing.
                        </p>
                    </motion.div>
                </div>
            </div>

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 -mt-32 relative z-20 pb-24">
                {/* Key Fund Details Cards */}
                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4 mb-16">
                    {[
                        { label: "Category", value: "Category II AIF", icon: ShieldCheck },
                        { label: "Structure", value: "Closed Ended", icon: Briefcase },
                        { label: "Min Commitment", value: "₹1 Crore", icon: IndianRupee },
                        { label: "Tenure", value: "3–5 Years", icon: Clock },
                        { label: "Theme", value: "RE Credit", icon: TrendingUp },
                        { label: "Return Type", value: "Income Yield", icon: Target }
                    ].map((item, i) => (
                        <div key={i} className="bg-white p-6 rounded-[2rem] shadow-xl border border-white/20 flex flex-col items-center text-center hover:-translate-y-1 transition-transform duration-300">
                            <div className="w-12 h-12 rounded-full bg-[#1CADA3]/10 flex items-center justify-center mb-3">
                                <item.icon className="text-[#1CADA3] w-6 h-6" />
                            </div>
                            <div className="text-xs text-gray-400 uppercase font-bold tracking-wider mb-1">{item.label}</div>
                            <div className="font-bold text-gray-900 leading-tight">{item.value}</div>
                        </div>
                    ))}
                </div>

                <div className="grid lg:grid-cols-3 gap-8 mb-16">
                    {/* Investment Strategy */}
                    <div className="lg:col-span-2 space-y-8">
                        <section className="bg-white rounded-[3rem] p-10 shadow-xl border border-gray-100">
                            <div className="flex items-center gap-4 mb-8">
                                <div className="w-12 h-12 bg-[#1CADA3]/10 text-[#1CADA3] rounded-2xl flex items-center justify-center">
                                    <Target size={24} />
                                </div>
                                <h3 className="text-2xl font-bold text-gray-900 font-sans">Investment Strategy</h3>
                            </div>
                            <p className="text-gray-600 text-lg leading-relaxed mb-10">
                                Sundaram Real Estate Credit Income Generator Fund – Series 5 focuses on real estate-backed credit opportunities. The fund invests in residential and commercial real estate financing, aiming to provide regular yield with strong downside protection through secured lending with real estate collateral and rigorous developer due diligence.
                            </p>
                            <div className="grid md:grid-cols-2 gap-4">
                                {[
                                    "Residential real estate financing",
                                    "Commercial real estate lending",
                                    "Structured real estate credit",
                                    "Developer funding",
                                    "Asset-backed investments",
                                    "Secured lending focus",
                                    "Developer due diligence",
                                    "Conservative loan structures"
                                ].map((focus, i) => (
                                    <div key={i} className="flex items-center gap-3 p-4 bg-teal-50/50 rounded-2xl border border-teal-100/50">
                                        <CheckCircle className="text-[#1CADA3] w-5 h-5 shrink-0" />
                                        <span className="font-bold text-gray-700 text-sm">{focus}</span>
                                    </div>
                                ))}
                            </div>
                        </section>

                        {/* Portfolio Allocation Charts */}
                        <div className="grid md:grid-cols-2 gap-8">
                            <section className="bg-white rounded-[3rem] p-8 shadow-xl border border-gray-100">
                                <h4 className="font-bold text-gray-700 mb-8 flex items-center gap-2">
                                    <PieChartIcon className="w-5 h-5 text-[#1CADA3]" /> Asset Allocation
                                </h4>
                                <div className="h-[250px] relative mb-8">
                                    <Pie data={assetData} options={pieOptions} />
                                    <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none">
                                        <span className="text-2xl font-black text-gray-700">100%</span>
                                        <span className="text-[10px] text-gray-400 font-bold uppercase">Collateral</span>
                                    </div>
                                </div>
                                <div className="space-y-3">
                                    {assetData.labels.map((label, i) => (
                                        <div key={i} className="flex justify-between items-center text-sm">
                                            <div className="flex items-center gap-2">
                                                <div className="w-3 h-3 rounded-full" style={{ backgroundColor: assetData.datasets[0].backgroundColor[i] }} />
                                                <span className="font-medium text-gray-600">{label}</span>
                                            </div>
                                            <span className="font-bold text-gray-900">{assetData.datasets[0].data[i]}%</span>
                                        </div>
                                    ))}
                                </div>
                            </section>

                            <section className="bg-white rounded-[3rem] p-8 shadow-xl border border-gray-100">
                                <h4 className="font-bold text-gray-700 mb-8 flex items-center gap-2">
                                    <BarChartIcon className="w-5 h-5 text-[#2076C7]" /> Investment Type
                                </h4>
                                <div className="h-[250px] w-full">
                                    <Bar data={investmentTypeData} options={barOptions} />
                                </div>
                                <div className="mt-8 space-y-4">
                                    <div className="p-4 bg-teal-50 rounded-2xl border border-teal-100">
                                        <p className="text-xs text-teal-800 font-medium italic">
                                            Yield-focused allocation with strong emphasis on secured debt.
                                        </p>
                                    </div>
                                </div>
                            </section>
                        </div>
                    </div>

                    {/* Sidebar */}
                    <div className="space-y-8">
                        {/* Fund Manager */}
                        <section className="bg-gradient-to-br from-[#1CADA3] to-[#2076C7] rounded-[3rem] p-8 text-white shadow-2xl relative overflow-hidden">
                            <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full -mr-16 -mt-16 blur-2xl" />
                            <div className="flex items-center gap-4 mb-6 relative z-10">
                                <div className="w-12 h-12 bg-white/20 rounded-2xl flex items-center justify-center backdrop-blur-md">
                                    <Users size={24} />
                                </div>
                                <div>
                                    <h4 className="font-black text-xl leading-none">Investment Manager</h4>
                                    <p className="text-white/70 text-xs font-bold uppercase tracking-widest mt-1">Sundaram Alternate Assets</p>
                                </div>
                            </div>
                            <p className="text-white/90 text-sm leading-relaxed mb-6 font-medium italic">
                                Specialized expertise in real estate financing and asset-backed credit.
                            </p>
                            <ul className="space-y-2 text-xs font-bold font-sans">
                                <li className="flex items-center gap-2">
                                    <CheckCircle size={14} className="text-white/60" /> Real estate credit focus
                                </li>
                                <li className="flex items-center gap-2:">
                                    <CheckCircle size={14} className="text-white/60" /> Asset-backed investments
                                </li>
                                <li className="flex items-center gap-2">
                                    <CheckCircle size={14} className="text-white/60" /> Developer due diligence
                                </li>
                                <li className="flex items-center gap-2">
                                    <CheckCircle size={14} className="text-white/60" /> Active monitoring
                                </li>
                            </ul>
                        </section>

                        {/* Fee Structure */}
                        <section className="bg-white rounded-[3rem] p-8 shadow-xl border border-gray-100">
                            <h4 className="text-sm font-bold text-gray-400 uppercase tracking-widest mb-6">Fee Structure</h4>
                            <div className="space-y-4">
                                <div className="flex justify-between items-center border-b border-gray-100 pb-3">
                                    <span className="text-gray-500 font-medium text-sm">Management Fee</span>
                                    <span className="font-black text-gray-900">As per PPM</span>
                                </div>
                                <div className="flex justify-between items-center border-b border-gray-100 pb-3">
                                    <span className="text-gray-500 font-medium text-sm">Performance Fee</span>
                                    <span className="font-black text-gray-900 text-[#1CADA3]">Carry Model</span>
                                </div>
                                <div className="flex justify-between items-center">
                                    <span className="text-gray-500 font-medium text-sm">Hurdle Rate</span>
                                    <span className="font-black text-gray-900">Applicable</span>
                                </div>
                            </div>
                        </section>

                        {/* CTA Section */}
                        <section className="bg-slate-900 rounded-[3rem] p-8 text-white shadow-2xl">
                            <h4 className="text-2xl font-black mb-4 leading-tight">Stable <br /> Real Estate Yield</h4>
                            <p className="text-slate-400 text-sm mb-8 font-medium">Ideal for investors seeking regular income through secured real estate lending.</p>
                            <div className="space-y-3">
                                <button className="w-full py-4 bg-[#1CADA3] hover:bg-[#1CADA3]/90 text-white rounded-2xl font-black shadow-lg shadow-[#1CADA3]/30 transition-all flex items-center justify-center gap-3 cursor-pointer">
                                    <FileText size={20} />
                                    Apply Now
                                </button>
                                <div className="grid grid-cols-2 gap-3 text-[10px] font-black uppercase tracking-wider">
                                    <button className="py-3 bg-white/5 hover:bg-white/10 rounded-xl border border-white/10 transition-colors">Request PPM</button>
                                    <button className="py-3 bg-white/5 hover:bg-white/10 rounded-xl border border-white/10 transition-colors">Talk to Advisor</button>
                                </div>
                            </div>
                        </section>
                    </div>
                </div>

                {/* Ideal Investor Section */}
                <section className="bg-white rounded-[4rem] p-12 lg:p-20 shadow-xl border border-gray-100 text-center mb-16 relative overflow-hidden">
                    <div className="absolute top-0 right-0 w-64 h-64 bg-teal-50 rounded-full blur-3xl -mr-32 -mt-32 opacity-50" />
                    <h2 className="text-3xl md:text-5xl font-black text-gray-900 mb-12 tracking-tighter uppercase font-sans">Ideal Investor Profile</h2>
                    <div className="grid md:grid-cols-4 gap-6 relative z-10">
                        {[
                            { label: "HNIs / UHNIs", value: "High Net Worth", icon: Users },
                            { label: "Income-focused", value: "Yield Seekers", icon: Target },
                            { label: "RE Seekers", value: "Property Credit", icon: Briefcase },
                            { label: "Conservative", value: "Risk-adjusted", icon: ShieldCheck }
                        ].map((item, i) => (
                            <div key={i} className="bg-neutral-50 p-6 rounded-[2.5rem] border border-gray-100 flex flex-col items-center">
                                <div className="w-12 h-12 bg-white rounded-2xl shadow-sm flex items-center justify-center mb-4">
                                    <item.icon className="text-[#1CADA3] w-6 h-6" />
                                </div>
                                <div className="text-[10px] text-gray-400 font-black uppercase tracking-widest mb-1">{item.label}</div>
                                <div className="font-bold text-gray-800">{item.value}</div>
                            </div>
                        ))}
                    </div>
                </section>

                {/* Disclaimer */}
                <div className="max-w-4xl mx-auto">
                    <div className="bg-amber-50/50 border border-amber-200/50 rounded-3xl p-8 flex items-start gap-4 shadow-sm italic">
                        <AlertCircle className="w-6 h-6 text-amber-600 shrink-0 mt-0.5" />
                        <p className="text-amber-900 text-sm font-medium leading-relaxed">
                            <strong>Mandatory Disclaimer:</strong> Investments in AIFs are subject to market risks. Category II AIFs have liquidity constraints and are suitable for long-term investors only. Please read the PPM before investing.
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
}
