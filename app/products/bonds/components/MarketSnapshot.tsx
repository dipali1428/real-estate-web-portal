"use client";

import { motion } from "framer-motion";
import { TrendingUp, ArrowUpRight, Activity, BarChart3, Globe, Landmark, TrendingDown, Gauge, IndianRupee } from "lucide-react";

// Data from HR Snapshot + New Additions
const data = [
    { title: "NIFTY 50", value: "25,694", icon: <TrendingUp size={20} />, change: "25,889 High", color: "text-green-600", bg: "bg-green-50" },
    { title: "SENSEX", value: "83,580", icon: <BarChart3 size={20} />, change: "84,178 High", color: "text-green-600", bg: "bg-green-50" },
    { title: "BANK NIFTY", value: "53,980", icon: <Landmark size={20} />, change: "0.85% Up", color: "text-green-600", bg: "bg-green-50" },
    { title: "INDIA VIX", value: "12.45", icon: <Gauge size={20} />, change: "-2.10%", color: "text-red-500", bg: "bg-red-50" },
    { title: "GOLD (24K)", value: "₹78,500", icon: <IndianRupee size={20} />, change: "10g", color: "text-yellow-600", bg: "bg-yellow-50" },
    { title: "SILVER", value: "₹96,200", icon: <IndianRupee size={20} />, change: "1kg", color: "text-gray-600", bg: "bg-gray-100" },
    { title: "US 10Y YIELD", value: "4.22%", icon: <Globe size={20} />, change: "Yield", color: "text-indigo-600", bg: "bg-indigo-50" },
    { title: "USD/INR", value: "₹83.95", icon: <ArrowUpRight size={20} />, change: "Forex", color: "text-teal-600", bg: "bg-teal-50" },
    { title: "BRENT CRUDE", value: "$71.50", icon: <TrendingDown size={20} />, change: "BBL", color: "text-orange-600", bg: "bg-orange-50" },
    { title: "6.54% GS 2032", value: "6.85%", icon: <Activity size={20} />, change: "G-Sec", color: "text-blue-600", bg: "bg-blue-50" },
];

export default function MarketSnapshot() {
    return (
        <section className="py-12 md:py-16 bg-white border-b border-gray-100 font-sans px-4 sm:px-6 lg:px-8">
            <div className="max-w-7xl mx-auto">
                <div className="flex items-center justify-between mb-6">
                    <div className="flex items-center gap-3">
                        <h2 className="text-2xl font-bold bg-clip-text text-transparent bg-linear-to-r from-[#2076C7] to-[#1CADA3]">
                            Market Snapshot
                        </h2>
                    </div>

                    {/* Live Indicator */}
                    <div className="flex items-center gap-2 px-3 py-1 bg-green-50 text-green-700 rounded-full text-xs font-semibold border border-green-100">
                        <span className="relative flex h-2 w-2">
                            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
                            <span className="relative inline-flex rounded-full h-2 w-2 bg-green-500"></span>
                        </span>
                        <span>LIVE UPDATES</span>
                    </div>
                </div>

                <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-10 gap-3">
                    {data.map((item, index) => (
                        <motion.div
                            key={index}
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: index * 0.05 }}
                            whileHover={{ scale: 1.05, y: -2 }}
                            className="bg-white p-2.5 rounded-xl shadow-xs border border-gray-100 hover:shadow-md transition-all duration-300 group cursor-default"
                        >
                            <div className="flex justify-between items-start mb-1.5">
                                <div className={`p-1.5 rounded-lg ${item.bg} ${item.color} group-hover:bg-opacity-80 transition-colors`}>
                                    {item.icon}
                                </div>
                                <span className={`text-[9px] font-bold px-1.5 py-0.5 rounded-full ${item.change.includes('-') ? 'bg-red-50 text-red-600' : 'bg-gray-50 text-gray-500'}`}>
                                    {item.change}
                                </span>
                            </div>
                            <h3 className="text-[10px] text-gray-500 font-bold uppercase tracking-wide truncate mb-0.5" title={item.title}>
                                {item.title}
                            </h3>
                            <p className="text-sm font-black text-gray-900 leading-tight">{item.value}</p>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
}
