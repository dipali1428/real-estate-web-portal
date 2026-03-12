"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Calculator, TrendingUp, TrendingDown, Target, LayoutGrid, Shield } from "lucide-react";
import { useIsMobile } from "../../../hooks/useIsMobile";

export default function InvestmentSection() {
    const isMobile = useIsMobile();
    // Calculator Logic
    const [amount, setAmount] = useState(10000);
    const rate = 11; // Weighted average of our bonds
    const years = 3;

    const total = amount * Math.pow(1 + rate / 100, years);
    const profit = total - amount;

    // Benefits Data
    const benefits = [
        {
            title: "Fixed & Predictable Income",
            description: "Receive regular interest payments (coupons) throughout the tenure of the bond.",
            icon: Target
        },
        {
            title: "Lower Volatility",
            description: "Bonds generally experience less price fluctuation compared to the equity markets.",
            icon: TrendingDown
        },
        {
            title: "Portfolio Diversification",
            description: "Reduce overall portfolio risk by adding fixed-income assets that behave differently from stocks.",
            icon: LayoutGrid
        },
        {
            title: "Capital Protection",
            description: "Secured bonds are backed by assets, providing an added layer of security for your principal.",
            icon: Shield
        }
    ];

    return (
        <section className="py-12 md:py-24 bg-white relative overflow-hidden font-sans px-4 sm:px-6 lg:px-8">
            <div className="max-w-7xl mx-auto">
                <div className="grid lg:grid-cols-2 gap-16 items-center">
                    
                    {/* Left Column: Why Invest in Bonds? */}
                    <motion.div
                        initial={{ opacity: 0, x: -30 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6 }}
                    >
                        <div className="mb-10 text-center lg:text-left">
                            <span className="text-[#2076C7] font-black tracking-widest uppercase text-xs mb-4 block">
                                Key Benefits
                            </span>
                            <h2 className="text-3xl md:text-4xl font-extrabold mb-3 bg-linear-to-r from-[#2076C7] to-[#1CADA3] bg-clip-text text-transparent drop-shadow-sm">
                                Why Invest in Bonds?
                            </h2>
                            <p className="text-slate-500 max-w-2xl mx-auto text-base md:text-lg mt-6 font-medium leading-relaxed px-4 md:px-0">
                                Beyond just financing — every bond product is designed to give you maximum stability and flexible returns.
                            </p>
                        </div>

                        <div className="grid sm:grid-cols-2 gap-6">
                            {benefits.map((benefit, index) => {
                                const Icon = benefit.icon;
                                return (
                                    <div
                                        key={index}
                                        className="bg-gray-50/50 rounded-2xl md:rounded-3xl p-5 md:p-6 border border-slate-100 hover:border-blue-200 hover:bg-white hover:shadow-xl transition-all duration-300 group"
                                    >
                                        <div className="w-10 h-10 bg-[#2076C7]/5 rounded-xl flex items-center justify-center text-[#2076C7] mb-4 group-hover:bg-[#2076C7] group-hover:text-white transition-all duration-300">
                                            <Icon size={20} strokeWidth={2} />
                                        </div>
                                        <h3 className="text-base md:text-lg font-extrabold text-[#2076C7] mb-2 tracking-tight">{benefit.title}</h3>
                                        <p className="text-slate-500 text-[10px] md:text-[11px] leading-relaxed font-bold">{benefit.description}</p>
                                    </div>
                                );
                            })}
                        </div>
                    </motion.div>

                    {/* Right Column: Investment Growth Calculator */}
                    <motion.div
                        initial={{ opacity: 0, scale: 0.95 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        whileHover={{ 
                            rotateX: 2, 
                            rotateY: -2,
                            translateZ: 20,
                            transition: { duration: 0.3 }
                        }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6 }}
                        className="relative perspective-1000"
                    >
                        {/* 3D Wrapper */}
                        <div className="relative transform-style-3d shadow-[0_32px_64px_-16px_rgba(32,118,199,0.12)] rounded-3xl md:rounded-[3.5rem]">
                            
                            {/* Main Card Background */}
                            <div className="bg-white rounded-3xl md:rounded-[3.5rem] p-6 md:p-12 border border-slate-100 relative overflow-hidden">
                                
                                <div className="mb-10 flex justify-between items-start relative z-10">
                                    <div>
                                        <h3 className="text-xl md:text-2xl font-black mb-2 tracking-tight bg-linear-to-r from-[#2076C7] to-[#1CADA3] bg-clip-text text-transparent">Growth Calculator</h3>
                                        <p className="text-gray-400 text-[10px] md:text-sm font-black uppercase tracking-widest">Identify Wealth Growth</p>
                                    </div>
                                    <div className="p-2.5 md:p-3 bg-[#1CADA3]/10 rounded-xl md:rounded-2xl text-[#1CADA3]">
                                        <Calculator size={isMobile ? 22 : 28} />
                                    </div>
                                </div>

                                <div className="space-y-8 mb-12 relative z-10">
                                    <div className="relative">
                                        <label className="text-[10px] font-black text-gray-400 mb-3 block uppercase tracking-[0.3em] ml-1">Investment Amount (₹)</label>
                                        <div className="relative group">
                                            <input
                                                type="number"
                                                value={amount}
                                                onChange={(e) => setAmount(Number(e.target.value))}
                                                suppressHydrationWarning={true}
                                                className="w-full bg-gray-50 border-2 border-transparent focus:border-[#2076C7] focus:bg-white p-4 md:p-5 px-6 rounded-2xl md:rounded-[2rem] text-lg md:text-xl font-black text-gray-900 transition-all outline-none placeholder-gray-300"
                                                placeholder="00,000"
                                            />
                                        </div>
                                    </div>
                                </div>

                                {/* Results Area (3D Elevation) - Light Peacock Green Theme */}
                                <div className="bg-[#f0f9f9] p-5 md:p-7 rounded-3xl md:rounded-[2.5rem] border border-[#1CADA3]/20 shadow-xl relative overflow-hidden group/results">
                                    <div className="absolute top-0 right-0 w-32 h-32 bg-[#1CADA3]/5 rounded-full blur-2xl" />
                                    
                                    <div className="flex items-center gap-2 mb-4 text-[#1CADA3] font-bold text-[10px] uppercase tracking-widest">
                                        <TrendingUp size={14} /> Projected Returns @ 11% p.a.
                                    </div>

                                    <div className="space-y-4">
                                        <div>
                                            <p className="text-teal-900/40 text-[9px] font-black uppercase tracking-widest mb-1">Estimated Maturity Value</p>
                                            <AnimatePresence mode="wait">
                                                <motion.p
                                                    key={total}
                                                    initial={{ opacity: 0, scale: 0.9 }}
                                                    animate={{ opacity: 1, scale: 1 }}
                                                    className="text-2xl md:text-3xl font-black text-[#2076C7] tracking-tighter"
                                                >
                                                    ₹{Math.round(total).toLocaleString()}
                                                </motion.p>
                                            </AnimatePresence>
                                        </div>

                                        <div className="pt-4 border-t border-[#1CADA3]/10 flex justify-between items-end">
                                            <div>
                                                <p className="text-teal-900/40 text-[9px] font-black uppercase tracking-widest mb-1">Wealth Created</p>
                                                <p className="text-lg md:text-xl font-black text-[#1CADA3]">
                                                    + ₹{Math.round(profit).toLocaleString()}
                                                </p>
                                            </div>
                                            <div className="text-right">
                                                <p className="text-teal-900/40 text-[10px] font-black uppercase tracking-widest mb-1">Time Period</p>
                                                <p className="text-lg font-bold text-[#0B1C2E] uppercase">{years} Years</p>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </motion.div>
                </div>
            </div>
        </section>
    );
}
