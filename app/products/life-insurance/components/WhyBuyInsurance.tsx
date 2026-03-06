"use client";

import { motion } from "framer-motion";
import { ShieldCheck, TrendingUp, Heart, Wallet, BadgeIndianRupee, FileCheck, Clock, Users } from "lucide-react";

const reasons = [
    {
        title: "₹1 Crore Cover from ₹450/month",
        desc: "Secure your family's future with high coverage at extremely affordable premiums. Our most popular protection plan.",
        icon: BadgeIndianRupee,
        stat: "99.7%",
        statLabel: "Claim Settlement Ratio",
        color: "#2076C7"
    },
    {
        title: "Wealth & Savings",
        desc: "Grow your wealth while staying protected with market-linked ULIPs and guaranteed savings plans for your long-term goals.",
        icon: TrendingUp,
        stat: "High",
        statLabel: "Return Potential",
        color: "#1CADA3"
    },
    {
        title: "Tax Free Payouts",
        desc: "The entire sum assured received by the nominee is 100% tax-free under Section 10(10D), ensuring full value reaches them.",
        icon: FileCheck,
        stat: "100%",
        statLabel: "Tax Exempted",
        color: "#1CADA3"
    },
    {
        title: "Critical Illness Payout",
        desc: "Lump sum payout on diagnosis of 34+ critical illnesses including cancer, heart attack, and kidney failure.",
        icon: FileCheck,
        stat: "34+",
        statLabel: "Illnesses Covered",
        color: "#2076C7"
    },
    {
        title: "Dedicated Claim Manager",
        desc: "Every policyholder gets a personal DCAP relationship manager for end-to-end claim settlement assistance.",
        icon: Users,
        stat: "24/7",
        statLabel: "Support Available",
        color: "#2076C7"
    },
];

export default function WhyBuyInsurance() {
    return (
        <section className="py-24 relative overflow-hidden bg-white text-[#2076C7]" id="why">
            {/* Refined Background Accents */}
            <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(circle_at_100%_0%,#2076C705_0%,transparent_50%)] pointer-events-none" />

            <div className="container-custom relative z-10 px-4 md:px-6">
                <div className="text-center max-w-4xl mx-auto mb-16 md:mb-20">
                    <motion.span
                        initial={{ opacity: 0, y: 10 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        className="text-[#2076C7] font-black uppercase text-[10px] md:text-xs tracking-[0.4em] mb-4 block font-sans"
                    >
                        WHY CHOOSE US
                    </motion.span>
                    <motion.h2
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        className="text-3xl md:text-5xl lg:text-6xl font-black mb-6 md:mb-8 text-[#2076C7] leading-tight font-sans"
                    >
                        Why <span className="text-transparent bg-clip-text bg-linear-to-r from-[#2076C7] via-[#1CADA3] to-[#2076C7] bg-[length:200%_auto] animate-gradient-x">Infinity Artvishva?</span>
                    </motion.h2>
                    <p className="text-gray-500 text-lg md:text-xl leading-relaxed font-medium font-sans max-w-2xl mx-auto">
                        We don't just provide policies; we ensure complete peace of mind for you and your family.
                    </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 px-4 md:px-0">
                    {reasons.map((reason, idx) => (
                        <motion.div
                            key={idx}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: idx * 0.05 }}
                            className="p-10 rounded-[3rem] bg-white border border-gray-100 shadow-[0_20px_40px_rgba(0,0,0,0.02)] group hover:shadow-[0_40px_80px_rgba(32,118,199,0.08)] transition-all duration-700 relative overflow-hidden"
                        >
                            <div className="flex items-start justify-between mb-8">
                                <div className="w-16 h-16 rounded-2xl bg-slate-50 flex items-center justify-center group-hover:scale-110 group-hover:bg-[#2076C7] transition-all duration-700">
                                    <reason.icon className="w-8 h-8 group-hover:text-white transition-colors" style={{ color: reason.color }} />
                                </div>
                                <div className="text-right">
                                    <div className="text-2xl font-black" style={{ color: reason.color }}>{reason.stat}</div>
                                    <div className="text-[10px] font-bold text-gray-300 uppercase tracking-widest">{reason.statLabel}</div>
                                </div>
                            </div>

                            <h3 className="text-xl font-black text-[#2076C7] mb-4 leading-tight">
                                {reason.title}
                            </h3>
                            <p className="text-sm text-gray-500 leading-relaxed font-medium">
                                {reason.desc}
                            </p>

                            {/* Subtle bottom accent line */}
                            <div className="absolute bottom-0 left-0 w-full h-1 bg-linear-to-r from-[#2076C7] to-[#1CADA3] scale-x-0 group-hover:scale-x-100 transition-transform duration-700 origin-left" />
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
};

