"use client";

import { motion } from "framer-motion";
import { TrendingUp, Wallet, GraduationCap, Anchor, Coins, RefreshCcw, Zap, ShieldCheck, Star, FileCheck, Landmark } from "lucide-react";
import TiltCard from "./TiltCard";
import React, { useState } from "react";

const insurancePlans = [
    {
        title: "Zero Cost Term Insurance",
        description: "Get 100% premium back benefit at the end of the term. Secure up to ₹25 Crore cover with zero net cost to you.",
        icon: <ShieldCheck className="w-8 h-8 text-[#2076C7]" />,
        features: ["100% Premium Back", "Cover up to Age 85", "Policy Term 5-40yrs"],
        tag: "Most Popular"
    },
    {
        title: "Standard Term Plan",
        description: "Pure protection at the lowest cost. Get ₹1 Crore life cover from just ₹450/month with built-in critical illness riders.",
        icon: <Zap className="w-8 h-8 text-[#1CADA3]" />,
        features: ["Highest Settlement Ratio", "Accidental Death Ben.", "Instant Issuance*"],
        tag: "Best Seller"
    },
    {
        title: "Retirement & Pension",
        description: "Secure a guaranteed lifelong pension. Build a tax-free corpus now and enjoy stable, worry-free post-retirement income.",
        icon: <Anchor className="w-8 h-8 text-[#1CADA3]" />,
        features: ["Lifelong Pension", "Joint Life Option", "Tax Free Corpus"],
        tag: "Retirement"
    },
    {
        title: "Child's Future Plan",
        description: "Protect your child's education milestones with guaranteed payouts and built-in premium waiver benefits for total security.",
        icon: <GraduationCap className="w-8 h-8 text-[#2076C7]" />,
        features: ["Education Goal Funding", "Premium Waiver", "Guaranteed Savings"],
        tag: "Family Focus"
    },
    {
        title: "Wealth + Protection (ULIP)",
        description: "Market-linked returns with high-value protection. Enjoy fund switching flexibility and maximum tax benefits under Section 80C.",
        icon: <TrendingUp className="w-8 h-8 text-[#1CADA3]" />,
        features: ["High Market Returns", "Fund Switching", "Triple Tax Savings"],
        tag: "High Growth"
    },
    {
        title: "Guaranteed Income Plan",
        description: "Ensure a steady, tax-free monthly income for your family. All payouts are fully guaranteed and safe from market volatility.",
        icon: <Wallet className="w-8 h-8 text-[#1CADA3]" />,
        features: ["Guaranteed Payouts", "Tax-Free Income", "Life Shield Included"],
        tag: "Steady Income"
    }
];

export default function InsuranceTypes() {
    return (
        <section className="py-24 md:py-40 relative overflow-hidden bg-white" id="types">
            {/* Ultra-Premium Ambient Background */}
            <div className="absolute inset-0 pointer-events-none overflow-hidden">
                <div className="absolute -top-[500px] -left-[300px] w-[1000px] h-[1000px] bg-[#2076C7]/5 rounded-full blur-[150px]" />
                <div className="absolute -bottom-[500px] -right-[300px] w-[1000px] h-[1000px] bg-[#1CADA3]/5 rounded-full blur-[150px]" />
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-[0.01]" />
            </div>

            <div className="container-custom relative z-10 px-4 md:px-6">
                <div className="text-left max-w-4xl mb-16 md:mb-24">
                    <motion.span
                        initial={{ opacity: 0, y: 10 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        className="text-[#2076C7] font-black uppercase text-[10px] md:text-xs tracking-[0.4em] mb-6 block font-sans"
                    >
                        COMPLETE PROTECTION
                    </motion.span>
                    <motion.h2
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        className="text-4xl md:text-6xl lg:text-7xl font-black mb-8 text-[#2076C7] font-sans leading-[1.1] tracking-tight"
                    >
                        Protect What <br />
                        <span className="text-transparent bg-clip-text bg-linear-to-r from-[#2076C7] via-[#1CADA3] to-[#2076C7] bg-[length:200%_auto] animate-gradient-x">Matters Most</span>
                    </motion.h2>
                    <p className="text-gray-500 text-lg md:text-2xl leading-relaxed font-medium font-sans max-w-2xl">
                        Whatever your life stage, we have a simple and secure plan to protect your family's future.
                    </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-10">
                    {insurancePlans.map((plan, idx) => (
                        <PlanCard key={idx} plan={plan} idx={idx} />
                    ))}
                </div>
            </div>
        </section>
    );
}

function PlanCard({ plan, idx }: { plan: any, idx: number }) {
    const [mousePos, setMousePos] = useState({ x: 0, y: 0 });

    const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
        const rect = e.currentTarget.getBoundingClientRect();
        setMousePos({
            x: e.clientX - rect.left,
            y: e.clientY - rect.top,
        });
    };

    return (
        <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: idx * 0.05, duration: 1, ease: [0.22, 1, 0.36, 1] }}
            onMouseMove={handleMouseMove}
            className="group relative flex flex-col items-start text-left
                       h-full p-10 md:p-12 rounded-[3.5rem]
                       bg-white border border-gray-100
                       shadow-[0_20px_50px_rgba(0,0,0,0.02)]
                       hover:shadow-[0_60px_100px_rgba(32,118,199,0.06)]
                       transition-all duration-700 overflow-hidden"
        >
            {/* Premium Radial Glow */}
            <div
                className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none"
                style={{
                    background: `radial-gradient(600px circle at ${mousePos.x}px ${mousePos.y}px, rgba(32,118,199,0.04), transparent 70%)`
                }}
            />

            {/* Premium Badge */}
            {plan.tag && (
                <div className="absolute top-8 right-8 px-4 py-2 rounded-full bg-white/40 border border-[#2076C7]/10 text-[9px] font-black text-[#2076C7] uppercase tracking-[0.2em] backdrop-blur-md shadow-sm z-20">
                    <span className="relative z-10">{plan.tag}</span>
                    <div className="absolute inset-0 bg-[#2076C7]/5 rounded-full" />
                </div>
            )}

            {/* Icon container with shimmer */}
            <div className="mb-10 w-20 h-20 rounded-[2.5rem]
                            flex items-center justify-center
                            bg-linear-to-br from-slate-50 to-white
                            border border-gray-100
                            group-hover:scale-110 group-hover:-rotate-3 transition-all duration-700 shadow-sm relative z-10 group/icon overflow-hidden">
                <div className="absolute inset-0 bg-linear-to-r from-transparent via-white/40 to-transparent -translate-x-full group-hover/icon:translate-x-full transition-transform duration-1000" />
                <div className={`${idx % 2 === 0 ? 'text-[#2076C7]' : 'text-[#1CADA3]'}`}>
                    {React.cloneElement(plan.icon, { className: 'w-10 h-10 transition-transform duration-700 group-hover:scale-110' })}
                </div>
            </div>

            {/* Title */}
            <h3 className="text-2xl md:text-3xl font-black text-[#2076C7] mb-6 relative z-10 leading-tight font-sans">
                {plan.title}
            </h3>

            {/* Description */}
            <p className="text-base text-gray-400 leading-relaxed mb-10 font-medium relative z-10 line-clamp-3 font-sans">
                {plan.description}
            </p>

            {/* Features Tags */}
            <div className="flex flex-col gap-4 mb-12 relative z-10 w-full flex-1">
                {plan.features.map((feature: string, fIdx: number) => (
                    <div key={fIdx} className="flex items-center gap-3 text-sm font-bold text-[#2076C7]/60 group-hover:text-[#2076C7] transition-colors font-sans">
                        <div className="w-6 h-6 rounded-lg bg-[#2076C7]/5 flex items-center justify-center">
                            <Star className="w-3.5 h-3.5 text-[#2076C7] fill-[#2076C7]" />
                        </div>
                        {feature}
                    </div>
                ))}
            </div>

            {/* Action Button */}
            <button
                suppressHydrationWarning
                className="w-full py-5 rounded-2xl bg-slate-50 border border-slate-100 text-[#2076C7] font-black text-xs uppercase tracking-widest hover:bg-linear-to-r hover:from-[#2076C7] hover:to-[#1CADA3] hover:text-white hover:border-transparent hover:shadow-xl hover:shadow-[#2076C7]/20 transition-all duration-500 relative z-10 font-sans"
            >
                Explore Strategy
            </button>

            {/* Subtle bottom accent line */}
            <div className="absolute bottom-0 left-0 w-full h-1 bg-linear-to-r from-[#2076C7] to-[#1CADA3] scale-x-0 group-hover:scale-x-100 transition-transform duration-700 origin-left" />
        </motion.div>
    );
}
