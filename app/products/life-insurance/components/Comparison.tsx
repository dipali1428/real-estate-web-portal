"use client";

import { motion } from "framer-motion";
import { Shield, ShieldOff, CheckCircle2, TrendingUp, Star, Zap, Activity, Heart, ShieldCheck, UserCheck } from "lucide-react";

const comparisonData = [
    {
        feature: "Claim Assistance",
        infinity: "Dedicated DCAP Manager",
        others: "Automated IVR Support",
        icon: UserCheck
    },
    {
        feature: "Claim Payout",
        infinity: "Priority Claim Support*",
        others: "30-Day Standard Process",
        icon: Zap
    },
    {
        feature: "Document Help",
        infinity: "At-Home Collection",
        others: "Self Upload / Courier",
        icon: Activity
    },
    {
        feature: "Plan Flexibility",
        infinity: "Secure Choice + Age Adjust",
        others: "Fixed Cover Throughout",
        icon: Heart
    },
    {
        feature: "Tax Support",
        infinity: "Free Expert Tax Filing",
        others: "No Specialized Support",
        icon: TrendingUp
    }
];
export default function Comparison() {
    return (
        <section className="py-10 md:py-16 bg-[#F8FAFC] relative overflow-hidden" id="comparison">
            {/* Background Accents */}
            <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-[#2076C7]/5 rounded-full blur-[120px] -translate-y-1/2 translate-x-1/2" />
            <div className="absolute bottom-0 left-0 w-[600px] h-[600px] bg-[#1CADA3]/5 rounded-full blur-[120px] translate-y-1/2 -translate-x-1/2" />

            <div className="container-custom relative z-10 px-4 md:px-6">
                <div className="text-center max-w-4xl mx-auto mb-8 md:mb-12">
                    <motion.span
                        initial={{ opacity: 0, y: 10 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        className="text-[#2076C7] font-black uppercase text-[10px] md:text-xs tracking-[0.4em] mb-4 block font-sans"
                    >
                        THE INFINITY ADVANTAGE
                    </motion.span>
                    <motion.h2
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        className="text-3xl md:text-5xl lg:text-6xl font-black mb-6 md:mb-8 text-[#2076C7] leading-tight font-sans"
                    >
                        Why We Are <span className="text-transparent bg-clip-text bg-linear-to-r from-[#2076C7] via-[#1CADA3] to-[#2076C7] bg-[length:200%_auto] animate-gradient-x">Different</span>
                    </motion.h2>
                    <p className="text-gray-500 text-lg md:text-xl leading-relaxed font-medium font-sans max-w-2xl mx-auto">
                        Compare our dedicated family support against traditional agents and standard insurance websites.
                    </p>
                </div>

                <div className="grid lg:grid-cols-2 gap-8 lg:gap-12 max-w-6xl mx-auto">
                    {/* Infinity Card - Ultra Premium */}
                    <motion.div
                        initial={{ opacity: 0, x: -30 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
                        className="group relative p-10 md:p-14 lg:p-16 rounded-[4rem] bg-white border border-[#2076C7]/15 shadow-[0_40px_100px_rgba(32,118,199,0.1)] overflow-hidden"
                    >
                        {/* Shimmer Effect */}
                        <div className="absolute inset-0 bg-linear-to-r from-transparent via-white/40 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000 ease-in-out pointer-events-none" />

                        <div className="absolute top-0 right-0 w-64 h-64 bg-[#2076C7]/5 rounded-bl-full z-0 opacity-50 blur-3xl animate-pulse" />

                        <div className="relative z-10">
                            <div className="flex items-center gap-6 mb-14">
                                <div className="w-20 h-20 rounded-3xl bg-linear-to-br from-[#2076C7] to-[#1CADA3] flex items-center justify-center shadow-2xl shadow-[#2076C7]/30 group-hover:scale-110 transition-transform duration-700">
                                    <Star className="w-10 h-10 text-white fill-white" />
                                </div>
                                <div>
                                    <h3 className="text-2xl md:text-3xl font-black text-[#2076C7] font-sans">Infinity Arthvishva</h3>
                                    <p className="text-[#1CADA3] text-[10px] font-black uppercase tracking-[0.3em] font-sans">Dedicated Family Support</p>
                                </div>
                            </div>

                            <div className="space-y-10">
                                {comparisonData.map((item, idx) => (
                                    <div key={idx} className="flex items-center gap-8 group/item">
                                        <div className="flex-shrink-0 w-12 h-12 rounded-2xl bg-[#2076C7]/5 border border-[#2076C7]/10 flex items-center justify-center text-[#2076C7] group-hover/item:bg-[#2076C7] group-hover/item:text-white group-hover/item:scale-110 transition-all duration-500">
                                            <item.icon className="w-6 h-6" />
                                        </div>
                                        <div className="flex-1">
                                            <div className="text-[10px] font-black text-gray-400 uppercase tracking-[0.2em] mb-1 font-sans">{item.feature}</div>
                                            <div className="text-lg md:text-xl font-black text-[#2076C7] flex items-center gap-3 font-sans">
                                                {item.infinity}
                                                <div className="w-5 h-5 rounded-full bg-emerald-500/10 flex items-center justify-center">
                                                    <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500" />
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>

                            <button
                                suppressHydrationWarning
                                className="mt-16 w-full py-6 rounded-3xl bg-linear-to-r from-[#2076C7] via-[#1CADA3] to-[#2076C7] bg-[length:200%_auto] animate-gradient-x text-white font-black text-lg uppercase tracking-widest hover:scale-105 transition-all duration-500 shadow-2xl shadow-[#2076C7]/30 font-sans"
                            >
                                Experience The Difference
                            </button>
                        </div>
                    </motion.div>

                    {/* Traditional Card */}
                    <motion.div
                        initial={{ opacity: 0, x: 30 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
                        className="p-10 md:p-14 lg:p-16 rounded-[4rem] bg-slate-50 border border-slate-200 flex flex-col group shadow-sm"
                    >
                        <div className="flex items-center gap-6 mb-14 transition-opacity duration-700">
                            <div className="w-20 h-20 rounded-3xl bg-slate-100 flex items-center justify-center border border-slate-200">
                                <ShieldOff className="w-10 h-10 text-slate-500" />
                            </div>
                            <div>
                                <h3 className="text-2xl md:text-3xl font-black text-slate-800 font-sans">Traditional Agents</h3>
                                <p className="text-slate-500 text-[10px] font-black uppercase tracking-[0.3em] font-sans">Standard Market Services</p>
                            </div>
                        </div>

                        <div className="space-y-10 transition-opacity duration-700">
                            {comparisonData.map((item, idx) => (
                                <div key={idx} className="flex items-center gap-8">
                                    <div className="flex-shrink-0 w-12 h-12 rounded-2xl bg-slate-100 flex items-center justify-center text-slate-500 border border-slate-200">
                                        <item.icon className="w-6 h-6" />
                                    </div>
                                    <div>
                                        <div className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em] mb-1 font-sans">{item.feature}</div>
                                        <div className="text-lg md:text-xl font-bold text-slate-900 font-sans">{item.others}</div>
                                    </div>
                                </div>
                            ))}
                        </div>

                        <div className="mt-auto pt-16">
                            <motion.div
                                whileHover={{ scale: 1.02 }}
                                className="p-10 rounded-[3rem] bg-linear-to-r from-[#2076C7] via-[#1CADA3] to-[#2076C7] bg-[length:200%_auto] animate-gradient-x text-white relative overflow-hidden group/tip cursor-pointer shadow-2xl shadow-[#2076C7]/30"
                            >
                                <div className="absolute top-0 right-0 w-48 h-48 bg-[#2076C7]/10 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2 group-hover/tip:scale-150 transition-transform duration-1000" />
                                <div className="relative z-10">
                                    <p className="text-[10px] font-black uppercase tracking-[0.4em] text-[#1CADA3] mb-4 font-sans">PRO SAVINGS TIP</p>
                                    <h4 className="text-2xl font-black mb-6 leading-tight font-sans">Switch to Infinity & Save up to 17% on Annual Premiums*</h4>
                                    <div className="flex items-center gap-3 text-white/50 text-sm font-black group-hover/tip:text-[#1CADA3] transition-colors font-sans uppercase tracking-widest">
                                        Check My Savings <ArrowRight className="w-5 h-5 group-hover/tip:translate-x-2 transition-transform" />
                                    </div>
                                </div>
                            </motion.div>
                        </div>
                    </motion.div>
                </div>
            </div>
        </section>
    );
}

import { ArrowRight } from "lucide-react";
