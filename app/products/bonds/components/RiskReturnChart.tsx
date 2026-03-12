"use client";

import { Scatter } from "react-chartjs-2";
import {
    Chart as ChartJS,
    LinearScale,
    PointElement,
    Tooltip,
    Legend,
} from "chart.js";
import { motion } from "framer-motion";
import { ShieldCheck, Zap, TrendingUp } from "lucide-react";
import { useIsMobile } from "../../../hooks/useIsMobile";

ChartJS.register(LinearScale, PointElement, Tooltip, Legend);

export default function RiskReturnChart() {
    const isMobile = useIsMobile();

    const data = {
        datasets: [
            {
                label: "Government Bonds",
                data: [{ x: 2, y: 7 }],
                backgroundColor: "#1CADA3",
                pointRadius: isMobile ? 12 : 18,
                pointHoverRadius: isMobile ? 18 : 25,
                borderColor: "rgba(255,255,255,0.9)",
                borderWidth: 4,
            },
            {
                label: "Corporate Bonds",
                data: [{ x: 5, y: 11.5 }],
                backgroundColor: "#2076C7",
                pointRadius: isMobile ? 15 : 22,
                pointHoverRadius: isMobile ? 22 : 30,
                borderColor: "rgba(255,255,255,0.9)",
                borderWidth: isMobile ? 4 : 6,
                shadowColor: 'rgba(32, 118, 199, 0.5)',
                shadowBlur: 15,
            },
            {
                label: "Equity",
                data: [{ x: 9, y: 16 }],
                backgroundColor: "#8884d8",
                pointRadius: isMobile ? 12 : 18,
                pointHoverRadius: isMobile ? 18 : 25,
                borderColor: "rgba(255,255,255,0.9)",
                borderWidth: 4,
            },
        ],
    };

    const options = {
        responsive: true,
        maintainAspectRatio: false,
        animation: {
            duration: 2000,
            easing: 'easeOutQuart' as const,
        },
        plugins: {
            legend: {
                display: false
            },
            tooltip: {
                padding: isMobile ? 12 : 18,
                backgroundColor: "rgba(17, 24, 39, 0.95)",
                titleFont: { size: isMobile ? 14 : 16, weight: 'bold' as const, family: "sans-serif" },
                bodyFont: { size: isMobile ? 12 : 14, family: "sans-serif" },
                cornerRadius: 12,
                displayColors: true,
                callbacks: {
                    label: (context: any) => ` Expected Return: ${context.raw.y}%`
                }
            }
        },
        scales: {
            x: {
                min: 0,
                max: 10,
                grid: { display: false },
                ticks: { display: false }
            },
            y: {
                min: 0,
                max: 20,
                grid: { color: "rgba(0,0,0,0.04)", borderDash: [5, 5] },
                ticks: { 
                    color: "#9CA3AF", 
                    font: { weight: 'bold' as const, size: isMobile ? 10 : 12 }, 
                    callback: (v: any) => v + "%" 
                }
            }
        }
    };

    const zones = [
        { label: "Safety Zone", desc: "Low Volatility", riskColor: "text-teal-600", bgColor: "bg-teal-50/50", icon: <ShieldCheck size={20} className="text-teal-500" /> },
        { label: "High-Yield Sweet Spot", desc: "Optimal Hybrid", riskColor: "text-[#2076C7]", bgColor: "bg-blue-50/80", icon: <Zap size={20} className="text-[#2076C7]" /> },
        { label: "Aggressive Zone", desc: "High Volatility", riskColor: "text-purple-600", bgColor: "bg-purple-50/50", icon: <TrendingUp size={20} className="text-purple-500" /> },
    ];

    const risks = [
        {
            title: "Credit Risk",
            description: "The issuer may defaulted and fail to pay interest or principal. We mitigate this by curating highly-rated bonds."
        },
        {
            title: "Interest Rate Risk",
            description: "Bond prices normally fall when interest rates rise. However, if held to maturity, you still receive the full principal."
        },
        {
            title: "Liquidity Risk",
            description: "While bonds can be sold on exchanges, finding a buyer immediately at the desired price may not always be possible."
        },
        {
            title: "Market Risk",
            description: "The market value of bonds may fluctuate due to changes in economic conditions or issuer performance."
        }
    ];

    return (
        <section className="py-12 md:py-20 bg-white relative font-sans px-4 sm:px-6 lg:px-8 overflow-hidden">
            {/* Background decoration */}
            <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-blue-50/40 rounded-full blur-3xl -z-10 translate-x-1/2 -translate-y-1/2" />

            <div className="max-w-7xl mx-auto">
                <div className="grid lg:grid-cols-2 gap-12 xl:gap-24 items-start">
                    {/* Left Side: Risk vs Return Analysis */}
                    <div className="flex flex-col w-full overflow-hidden">
                        <div className="text-left mb-8 md:mb-12">
                            <span className="text-[#2076C7] font-black tracking-widest uppercase text-[10px] md:text-xs mb-3 md:mb-4 block">Risk vs Reward</span>
                            <motion.h2
                                initial={{ opacity: 0, y: 10 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                className="text-3xl md:text-4xl font-extrabold mb-3 bg-linear-to-r from-[#2076C7] to-[#1CADA3] bg-clip-text text-transparent drop-shadow-sm"
                            >
                                Risk vs Return Analysis
                            </motion.h2>
                            <p className="text-slate-500 max-w-2xl mx-auto text-base md:text-lg mt-6 font-medium leading-relaxed px-4 md:px-0">
                                Visualize the efficiency of corporate bonds. They occupy the <span className="font-bold text-[#2076C7]">Sweet Spot</span> of investing: Higher returns than traditional debt with significantly lower risk than equity.
                            </p>
                        </div>

                        <div className="relative h-[320px] md:h-[500px] w-full bg-gradient-to-b from-gray-50/80 to-white rounded-3xl md:rounded-[3rem] border border-gray-100 p-4 md:p-10 shadow-[0_32px_64px_-16px_rgba(0,0,0,0.08)]">
                            {/* Animated Background Pulse for Corporate Bonds Area */}
                            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-[60%] w-64 h-64 bg-[#2076C7]/5 rounded-full blur-3xl animate-pulse" />

                            {/* Label Overlays - Responsive adjustments */}
                            <div className="absolute left-[50px] md:left-[80px] right-8 bottom-0 hidden xs:flex justify-between h-full pointer-events-none pb-12">
                                <div className="flex-1 border-r border-dashed border-gray-200 bg-gradient-to-t from-teal-50/30 to-transparent flex flex-col justify-end p-2 md:p-4 transition-colors hover:bg-teal-50/40">
                                    <p className="text-teal-700 font-black text-[8px] md:text-xs tracking-widest uppercase opacity-70">Safety Zone</p>
                                </div>
                                <div className="flex-1 border-r border-dashed border-gray-200 bg-gradient-to-t from-blue-50/40 to-transparent flex flex-col justify-end p-2 md:p-4 relative">
                                    <div className="absolute inset-0 bg-blue-100/10 animate-pulse" /> 
                                    <p className="text-[#2076C7] font-black text-[8px] md:text-xs tracking-widest uppercase relative z-10">Balanced Core</p>
                                </div>
                                <div className="flex-1 bg-gradient-to-t from-purple-50/30 to-transparent flex flex-col justify-end p-2 md:p-4">
                                    <p className="text-purple-700 font-black text-[8px] md:text-xs tracking-widest uppercase opacity-70">Growth Exposure</p>
                                </div>
                            </div>

                            <div className="relative h-full z-10 flex items-center justify-center p-2">
                                <div className="w-full h-full">
                                    <Scatter data={data} options={options as any} />
                                </div>
                            </div>

                            <div className="absolute left-1/2 bottom-4 -translate-x-1/2 flex items-center gap-2 md:gap-3 text-gray-400 font-black text-[8px] md:text-[10px] tracking-widest uppercase bg-white/90 px-4 py-2 rounded-full backdrop-blur-md shadow-lg border border-gray-100/50">
                                <span>Low Risk</span>
                                <div className="w-16 md:w-24 h-1 rounded-full bg-linear-to-r from-teal-400 via-blue-500 to-purple-500 opacity-50" />
                                <span>High Risk</span>
                            </div>
                        </div>

                        <div className="mt-8 grid grid-cols-1 sm:grid-cols-3 gap-3 md:gap-4">
                            {zones.map((zone, i) => (
                                <motion.div
                                    key={i}
                                    initial={{ opacity: 0, scale: 0.9 }}
                                    whileInView={{ opacity: 1, scale: 1 }}
                                    transition={{ delay: i * 0.1, duration: 0.4 }}
                                    whileHover={{ y: -5, scale: 1.02 }}
                                    className={`${zone.bgColor} p-4 md:p-6 rounded-[2rem] border border-white/50 flex flex-col items-center text-center shadow-[0_10px_30px_-10px_rgba(0,0,0,0.05)] cursor-default transition-all duration-300`}
                                >
                                    <div className={`p-3 bg-white rounded-2xl shadow-sm mb-4 ${zone.riskColor}`}>
                                        {zone.icon}
                                    </div>
                                    <h4 className="font-black text-gray-900 text-sm md:text-base mb-1 tracking-tight">{zone.label}</h4>
                                    <p className="text-gray-500 font-bold text-[10px] md:text-xs leading-tight tracking-wide">{zone.desc}</p>
                                </motion.div>
                            ))}
                        </div>
                    </div>

                    {/* Right Side: Risk Factors */}
                    <div className="flex flex-col h-full mt-8 lg:mt-0">
                        <div className="text-left mb-8 md:mb-12">
                            <span className="text-[#1CADA3] font-black tracking-widest uppercase text-[10px] md:text-xs mb-3 md:mb-4 block">Risk Management</span>
                            <h2 className="text-3xl md:text-4xl font-extrabold mb-3 bg-linear-to-r from-[#2076C7] to-[#1CADA3] bg-clip-text text-transparent drop-shadow-sm">
                                Risk Factors
                            </h2>
                            <p className="text-slate-500 max-w-2xl mx-auto text-base md:text-lg mt-6 font-medium leading-relaxed px-4 md:px-0">
                                Understand the potential risks involved in bond investments and how we actively mitigate them.
                            </p>
                        </div>

                        <div className="flex-1 bg-gradient-to-b from-blue-50/50 to-white rounded-3xl md:rounded-[3.5rem] border border-blue-100/30 p-6 md:p-12 shadow-[0_32px_64px_-16px_rgba(32,118,199,0.08)] flex flex-col justify-between">
                            <div className="space-y-6 md:space-y-8">
                                {risks.map((risk, index) => (
                                    <motion.div
                                        key={index}
                                        initial={{ opacity: 0, x: 20 }}
                                        whileInView={{ opacity: 1, x: 0 }}
                                        transition={{ delay: index * 0.1 }}
                                        className="bg-white/80 backdrop-blur-sm rounded-3xl p-5 md:p-7 shadow-sm border border-white hover:border-[#1CADA3]/30 transition-all hover:shadow-md group"
                                    >
                                        <h3 className="text-lg font-black text-[#2076C7] mb-3 flex items-center gap-3">
                                            <div className="w-2 h-2 rounded-full bg-[#1CADA3] group-hover:scale-125 transition-transform" />
                                            {risk.title}
                                        </h3>
                                        <p className="text-gray-500 text-sm leading-relaxed font-bold pl-5 border-l-2 border-slate-100 group-hover:border-[#1CADA3]/20 transition-colors">
                                            {risk.description}
                                        </p>
                                    </motion.div>
                                ))}
                            </div>

                            <div className="mt-12 pt-8 border-t border-slate-100 text-[10px] md:text-[11px] text-gray-400 font-bold leading-relaxed text-center sm:text-left bg-white/40 p-5 rounded-2xl border border-white/50 backdrop-blur-md">
                                <span className="text-[#2076C7] font-black uppercase tracking-tighter mr-2">Disclaimer:</span>
                                Bond investments are subject to market risks. Please read the offer document carefully before investing. Infinity Arthvishva does not guarantee returns on corporate bonds.
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}
