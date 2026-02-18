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

ChartJS.register(LinearScale, PointElement, Tooltip, Legend);

export default function RiskReturnChart() {
    const data = {
        datasets: [
            {
                label: "Government Bonds",
                data: [{ x: 2, y: 7 }],
                backgroundColor: "#1CADA3",
                pointRadius: 18,
                pointHoverRadius: 25,
                borderColor: "rgba(255,255,255,0.9)",
                borderWidth: 4,
            },
            {
                label: "Corporate Bonds",
                data: [{ x: 5, y: 11.5 }],
                backgroundColor: "#2076C7",
                pointRadius: 22, // Highlighted size
                pointHoverRadius: 30,
                borderColor: "rgba(255,255,255,0.9)",
                borderWidth: 6, // Thicker border for emphasis
                shadowColor: 'rgba(32, 118, 199, 0.5)',
                shadowBlur: 15,
            },
            {
                label: "Equity",
                data: [{ x: 9, y: 16 }],
                backgroundColor: "#8884d8",
                pointRadius: 18,
                pointHoverRadius: 25,
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
                padding: 18,
                backgroundColor: "rgba(17, 24, 39, 0.95)", // Glassmorphism dark tooltip
                titleFont: { size: 16, weight: 'bold' as const, family: "sans-serif" },
                bodyFont: { size: 14, family: "sans-serif" },
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
                ticks: { color: "#9CA3AF", font: { weight: 'bold' as const }, callback: (v: any) => v + "%" }
            }
        }
    };

    const zones = [
        { label: "Safety Zone", desc: "Low Volatility", riskColor: "text-teal-600", bgColor: "bg-teal-50/50", icon: <ShieldCheck size={20} className="text-teal-500" /> },
        { label: "High-Yield Sweet Spot", desc: "Optimal Hybrid", riskColor: "text-[#2076C7]", bgColor: "bg-blue-50/80 ring-2 ring-[#2076C7]/20", icon: <Zap size={20} className="text-[#2076C7]" /> },
        { label: "Aggressive Zone", desc: "High Volatility", riskColor: "text-purple-600", bgColor: "bg-purple-50/50", icon: <TrendingUp size={20} className="text-purple-500" /> },
    ];

    return (
        <section className="py-24 bg-white overflow-hidden relative">
            {/* Background decoration */}
            <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-blue-50/40 rounded-full blur-3xl -z-10 translate-x-1/2 -translate-y-1/2" />

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="text-center mb-16">
                    <div className="flex items-center justify-center gap-3 mb-4">
                        <TrendingUp className="text-[#1CADA3]" size={32} />
                        <motion.h2
                            initial={{ opacity: 0, y: 10 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            className="text-3xl md:text-5xl font-black bg-clip-text text-transparent bg-gradient-to-r from-[#2076C7] to-[#1CADA3]"
                        >
                            Risk vs Return Analysis
                        </motion.h2>
                    </div>
                    <p className="mt-6 text-gray-500 max-w-2xl mx-auto text-lg font-sans">
                        Visualize the efficiency of corporate bonds. They occupy the <span className="font-bold text-[#2076C7]">Sweet Spot</span> of investing: Higher returns than traditional debt with significantly lower risk than equity.
                    </p>
                </div>

                <div className="relative h-[550px] w-full bg-gradient-to-b from-gray-50/80 to-white rounded-[4rem] border border-gray-100 p-8 pt-12 shadow-[0_20px_60px_-15px_rgba(0,0,0,0.1)] overflow-hidden">

                    {/* Animated Background Pulse for Corporate Bonds Area */}
                    <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-[60%] w-64 h-64 bg-[#2076C7]/5 rounded-full blur-3xl animate-pulse" />

                    {/* Label Overlays - Hidden on Mobile */}
                    <div className="absolute left-[60px] right-8 bottom-0 hidden md:flex justify-between h-full pointer-events-none pb-12">
                        <div className="flex-1 border-r border-dashed border-gray-200 bg-gradient-to-t from-teal-50/30 to-transparent flex flex-col justify-end p-6 transition-colors hover:bg-teal-50/40">
                            <p className="text-teal-700 font-extrabold text-sm tracking-widest uppercase opacity-70">Safety Zone</p>
                        </div>
                        <div className="flex-1 border-r border-dashed border-gray-200 bg-gradient-to-t from-blue-50/40 to-transparent flex flex-col justify-end p-6 relative">
                            <div className="absolute inset-0 bg-blue-100/10 animate-pulse" /> {/* Subtle pulse */}
                            <p className="text-[#2076C7] font-extrabold text-sm tracking-widest uppercase relative z-10">Balanced Core</p>
                        </div>
                        <div className="flex-1 bg-gradient-to-t from-purple-50/30 to-transparent flex flex-col justify-end p-6">
                            <p className="text-purple-700 font-extrabold text-sm tracking-widest uppercase opacity-70">Growth Exposure</p>
                        </div>
                    </div>

                    <div className="relative h-full z-10">
                        <Scatter data={data} options={options as any} />
                    </div>

                    <div className="absolute left-1/2 bottom-6 -translate-x-1/2 flex items-center gap-3 text-gray-400 font-bold text-[10px] tracking-[0.3em] uppercase bg-white/80 px-4 py-2 rounded-full backdrop-blur-sm shadow-sm border border-gray-100">
                        <span>Low Risk</span>
                        <div className="w-32 h-1 rounded-full bg-gradient-to-r from-teal-400 via-blue-500 to-purple-500 opactiy-50" />
                        <span>High Risk</span>
                    </div>
                </div>

                <div className="mt-16 grid md:grid-cols-3 gap-8">
                    {zones.map((zone, i) => (
                        <motion.div
                            key={i}
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            transition={{ delay: i * 0.15, type: "spring" }}
                            whileHover={{ y: -10 }}
                            className={`${zone.bgColor} p-8 rounded-[2.5rem] border border-white flex flex-col items-center text-center shadow-lg shadow-gray-100/50 cursor-default transition-all duration-300`}
                        >
                            <div className={`p-4 bg-white rounded-2xl shadow-md mb-6 ${zone.riskColor}`}>
                                {zone.icon}
                            </div>
                            <h4 className="font-extrabold text-gray-900 text-lg mb-2">{zone.label}</h4>
                            <p className="text-gray-600 font-medium text-sm font-sans">{zone.desc}</p>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
}
