"use client";

import { motion } from "framer-motion";
import { Activity, Skull, Zap, AlertCircle, ShieldCheck, HeartPulse } from "lucide-react";

const riders = [
    {
        title: "Terminal Illness Cover",
        description: "Receive 100% sum assured immediately upon diagnosis of any terminal illness to manage final expenses.",
        icon: HeartPulse,
        benefit: "Included Free*"
    },
    {
        title: "Critical Illness Rider",
        description: "Get a lump sum payout on diagnosis of major illnesses, providing vital financial support for treatment.",
        icon: Activity,
        benefit: "34+ Illnesses"
    },
    {
        title: "Accidental Death Benefit",
        description: "Double the financial protection for your family with an additional payout in case of accidental death.",
        icon: Zap,
        benefit: "Double Payout"
    },
    {
        title: "Waiver of Premium",
        description: "All future premiums are waived if you face a critical illness or disability, keeping the cover active.",
        icon: ShieldCheck,
        benefit: "Zero Future Cost"
    }
];
export default function Riders() {
    return (
        <section className="py-10 md:py-16 bg-white relative overflow-hidden" id="riders">
            {/* Ambient background accent */}
            <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-[#2076C7]/5 rounded-full blur-[120px] -translate-y-1/2 translate-x-1/2" />

            <div className="container-custom relative z-10 px-4 md:px-6">
                <div className="flex flex-col lg:flex-row gap-12 lg:gap-24 items-center">
                    <div className="lg:w-[40%] text-left">
                        <motion.span
                            initial={{ opacity: 0, y: 10 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            className="text-[#2076C7] font-black uppercase text-[10px] md:text-xs tracking-[0.4em] mb-4 block font-sans"
                        >
                            POLICY ENHANCEMENTS
                        </motion.span>
                        <motion.h2
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            className="text-3xl md:text-5xl lg:text-6xl font-black mb-6 md:mb-8 text-[#2076C7] leading-tight font-sans"
                        >
                            High-Impact <br />
                            <span className="text-transparent bg-clip-text bg-linear-to-r from-[#2076C7] via-[#1CADA3] to-[#2076C7] bg-[length:200%_auto] animate-gradient-x">Add-on Covers</span>
                        </motion.h2>
                        <p className="text-gray-500 text-lg md:text-xl mb-10 leading-relaxed font-medium font-sans">
                            Strengthen your base policy with riders that provide specialized protection against life's most challenging surprises.
                        </p>

                        <div className="space-y-4 mb-10">
                            <div className="flex items-center gap-3 p-4 bg-blue-50/50 rounded-2xl border border-[#2076C7]/10 group hover:bg-[#2076C7]/5 transition-colors">
                                <div className="p-1 rounded-full bg-[#2076C7]/10">
                                    <CheckCircle2 className="w-4 h-4 text-[#2076C7]" />
                                </div>
                                <span className="text-sm font-black text-[#2076C7] font-sans">Terminal Illness covered in base plan</span>
                            </div>
                            <div className="flex items-center gap-3 p-4 bg-teal-50/50 rounded-2xl border border-[#1CADA3]/10 group hover:bg-[#1CADA3]/5 transition-colors">
                                <div className="p-1 rounded-full bg-[#1CADA3]/10">
                                    <CheckCircle2 className="w-4 h-4 text-[#1CADA3]" />
                                </div>
                                <span className="text-sm font-black text-[#1CADA3] font-sans">Flexible Rider Combinations</span>
                            </div>
                        </div>

                        <div className="p-8 rounded-[2.5rem] bg-linear-to-r from-[#2076C7] via-[#1CADA3] to-[#2076C7] bg-[length:200%_auto] animate-gradient-x text-white shadow-2xl shadow-[#2076C7]/30 relative overflow-hidden group">
                            <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 blur-[40px] translate-x-1/2 -translate-y-1/2 group-hover:scale-150 transition-transform duration-700" />
                            <p className="text-[9px] uppercase tracking-[0.3em] font-black text-white/60 mb-3 font-sans relative z-10">EXCLUSIVE FOR INFINITY USERS</p>
                            <p className="text-xl font-black mb-3 font-sans relative z-10">Dedicated Claim Agent</p>
                            <p className="text-sm text-white/80 leading-relaxed font-medium font-sans relative z-10">Assigning a personal relationship manager to your family for stress-free document assistance.</p>
                        </div>
                    </div>

                    <div className="lg:w-[60%] grid grid-cols-1 md:grid-cols-2 gap-6 w-full">
                        {riders.map((rider, index) => (
                            <motion.div
                                key={rider.title}
                                initial={{ opacity: 0, x: 20 }}
                                whileInView={{ opacity: 1, x: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: index * 0.1 }}
                                className="p-8 rounded-[2.5rem] border border-gray-100 shadow-xl shadow-slate-200/50 transition-all bg-white group hover:border-[#2076C7]/20 flex flex-col"
                            >
                                <div className="flex items-start justify-between mb-8">
                                    <div className="w-14 h-14 rounded-2xl bg-slate-50 flex items-center justify-center border border-gray-100 group-hover:bg-[#2076C7] group-hover:text-white transition-all duration-500">
                                        <rider.icon className="w-7 h-7 text-[#2076C7] group-hover:text-white transition-colors" />
                                    </div>
                                    <span className="text-[9px] font-black px-3 py-1.5 rounded-full bg-[#1CADA3]/10 text-[#1CADA3] uppercase tracking-widest font-sans">
                                        {rider.benefit}
                                    </span>
                                </div>
                                <h3 className="text-xl font-black text-[#2076C7] mb-4 font-sans">{rider.title}</h3>
                                <p className="text-gray-500 text-sm leading-relaxed font-sans font-medium">
                                    {rider.description}
                                </p>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </div>
        </section>
    );
}

import { CheckCircle2 } from "lucide-react";
