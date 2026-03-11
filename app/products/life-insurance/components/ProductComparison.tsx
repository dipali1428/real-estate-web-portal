"use client";

import React, { useState, useRef, useEffect } from "react";
import { motion } from "framer-motion";
import {
    ShieldCheck, TrendingUp, Coins, Anchor,
    GraduationCap, Landmark, ChevronDown, Info,
} from "lucide-react";

/* ─── DATA ──────────────────────────────────────────────── */
const products = [
    {
        name: "Term Insurance",
        shortName: "Term",
        icon: ShieldCheck,
        color: "#2076C7",
        risk: 1,           // 1-5
        returns: 1,        // 1-5 (0 = pure protection)
        lifeCover: 5,
        liquidity: 1,
        taxBenefit: 5,
        affordability: 5,
        suitedFor: "Protection",
        returnLabel: "~0% (Protection)",
        coverLabel: "10x–30x income",
        riskLabel: "None",
        premium: "₹500–₹2,000/mo",
        lock: "Full Term",
        taxNote: "80C + 10(10D)",
    },
    {
        name: "ULIP",
        shortName: "ULIP",
        icon: TrendingUp,
        color: "#7C3AED",
        risk: 4,
        returns: 4,
        lifeCover: 3,
        liquidity: 3,
        taxBenefit: 5,
        affordability: 2,
        suitedFor: "Wealth + Cover",
        returnLabel: "8%–15% (market)",
        coverLabel: "10x–20x premium",
        riskLabel: "Market Risk",
        premium: "₹3,000–₹15,000/mo",
        lock: "5 Years",
        taxNote: "80C + 10(10D)",
    },
    {
        name: "Guaranteed Savings",
        shortName: "Savings",
        icon: Coins,
        color: "#1CADA3",
        risk: 1,
        returns: 3,
        lifeCover: 2,
        liquidity: 2,
        taxBenefit: 5,
        affordability: 3,
        suitedFor: "Safe Returns",
        returnLabel: "5.5%–7% (assured)",
        coverLabel: "Sum Assured",
        riskLabel: "None",
        premium: "₹2,000–₹10,000/mo",
        lock: "Policy Term",
        taxNote: "80C + tax-free mat.",
    },
    {
        name: "Retirement Plan",
        shortName: "Pension",
        icon: Anchor,
        color: "#F59E0B",
        risk: 2,
        returns: 3,
        lifeCover: 2,
        liquidity: 2,
        taxBenefit: 4,
        affordability: 3,
        suitedFor: "Retirement Income",
        returnLabel: "5%–8% (annuity)",
        coverLabel: "Pension for Life",
        riskLabel: "Low",
        premium: "₹3,000–₹20,000/mo",
        lock: "Till 60/65",
        taxNote: "80CCC",
    },
    {
        name: "Child Plan",
        shortName: "Child",
        icon: GraduationCap,
        color: "#EC4899",
        risk: 2,
        returns: 4,
        lifeCover: 3,
        liquidity: 2,
        taxBenefit: 5,
        affordability: 3,
        suitedFor: "Child's Future",
        returnLabel: "7%–12% (blended)",
        coverLabel: "Goal Value",
        riskLabel: "Low–Medium",
        premium: "₹2,000–₹8,000/mo",
        lock: "Till 18/21 yrs",
        taxNote: "80C + 10(10D)",
    },
    {
        name: "Money Back",
        shortName: "Money Back",
        icon: Landmark,
        color: "#10B981",
        risk: 1,
        returns: 2,
        lifeCover: 2,
        liquidity: 4,
        taxBenefit: 4,
        affordability: 3,
        suitedFor: "Periodic Payouts",
        returnLabel: "4%–6% (regular)",
        coverLabel: "Sum Assured",
        riskLabel: "None",
        premium: "₹2,500–₹12,000/mo",
        lock: "Partial",
        taxNote: "80C + 10(10D)",
    },
];

const ATTRS = [
    { key: "risk", label: "Risk Level", invert: true },
    { key: "returns", label: "Returns Potential", invert: false },
    { key: "lifeCover", label: "Life Cover", invert: false },
    { key: "liquidity", label: "Liquidity", invert: false },
    { key: "taxBenefit", label: "Tax Benefits", invert: false },
    { key: "affordability", label: "Affordability", invert: false },
] as const;

const CHART_METRICS = [
    { key: "returns", label: "Returns" },
    { key: "lifeCover", label: "Life Cover" },
    { key: "liquidity", label: "Liquidity" },
    { key: "taxBenefit", label: "Tax Benefit" },
    { key: "affordability", label: "Affordability" },
] as const;

/* ─── HELPERS ───────────────────────────────────────────── */
function ScoreDots({ value, max = 5, color }: { value: number; max?: number; color: string }) {
    return (
        <div className="flex gap-1 justify-center">
            {Array.from({ length: max }).map((_, i) => (
                <span
                    key={i}
                    className="w-2.5 h-2.5 rounded-full transition-all"
                    style={{ backgroundColor: i < value ? color : "#e2e8f0" }}
                />
            ))}
        </div>
    );
}

function AnimatedBar({ value, max = 5, color, delay = 0 }: { value: number; max?: number; color: string; delay?: number }) {
    const [width, setWidth] = useState(0);
    const ref = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const observer = new IntersectionObserver(
            ([entry]) => { if (entry.isIntersecting) setWidth((value / max) * 100); },
            { threshold: 0.3 }
        );
        if (ref.current) observer.observe(ref.current);
        return () => observer.disconnect();
    }, [value, max]);

    return (
        <div ref={ref} className="w-full h-3 bg-slate-100 rounded-full overflow-hidden">
            <div
                className="h-full rounded-full transition-all duration-1000"
                style={{
                    width: `${width}%`,
                    backgroundColor: color,
                    transitionDelay: `${delay}ms`,
                    boxShadow: `0 0 8px ${color}60`,
                }}
            />
        </div>
    );
}

/* ─── MAIN COMPONENT ─────────────────────────────────────── */
export default function ProductComparison() {
    const [showAll, setShowAll] = useState(false);

    return (
        <section className="py-20 md:py-28 bg-[#F8FAFF] relative overflow-hidden font-sans" id="product-comparison">
            {/* BG blobs */}
            <div className="absolute top-0 left-0 w-[500px] h-[500px] bg-[#2076C7]/4 rounded-full blur-[120px] pointer-events-none" />
            <div className="absolute bottom-0 right-0 w-[500px] h-[500px] bg-[#1CADA3]/4 rounded-full blur-[120px] pointer-events-none" />

            <div className="container-custom relative z-10 px-4 md:px-6">

                {/* Header */}
                <div className="text-center mb-14">
                    <motion.span
                        initial={{ opacity: 0, y: 10 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="text-[#1CADA3] font-black uppercase text-[10px] tracking-[0.4em] mb-4 block"
                    >
                        SIDE-BY-SIDE · EXPERT ANALYSIS
                    </motion.span>
                    <motion.h2
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="text-3xl md:text-5xl font-black text-[#0B1C2E] leading-tight"
                    >
                        Product{" "}
                        <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#2076C7] to-[#1CADA3]">
                            Comparison
                        </span>
                    </motion.h2>
                    <p className="mt-4 text-sm text-slate-500 font-medium max-w-xl mx-auto">
                        Compare life insurance types across risk, returns, cover &amp; tax benefits to find your ideal match.
                    </p>
                </div>

                {/* ── COMPARISON TABLE ─────────────────────── */}
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="rounded-[2rem] overflow-hidden border border-slate-200 shadow-[0_20px_60px_rgba(0,0,0,0.06)] mb-16"
                >
                    <div className="overflow-x-auto">
                        <table className="w-full min-w-[800px]">
                            {/* ── Head ── */}
                            <thead>
                                <tr className="bg-[#0B1C2E]">
                                    <th className="py-5 px-6 text-left text-[10px] font-black text-slate-400 uppercase tracking-widest w-36">
                                        Attribute
                                    </th>
                                    {products.map(p => (
                                        <th key={p.name} className="py-5 px-4 text-center">
                                            <div className="flex flex-col items-center gap-2">
                                                <div
                                                    className="w-10 h-10 rounded-xl flex items-center justify-center"
                                                    style={{ backgroundColor: `${p.color}25` }}
                                                >
                                                    <p.icon className="w-5 h-5" style={{ color: p.color }} />
                                                </div>
                                                <span className="text-[10px] font-black text-white uppercase tracking-wide block">
                                                    {p.shortName}
                                                </span>
                                            </div>
                                        </th>
                                    ))}
                                </tr>
                            </thead>

                            {/* ── Body ── */}
                            <tbody>
                                {/* Score rows */}
                                {ATTRS.map((attr, ri) => (
                                    <tr
                                        key={attr.key}
                                        className={`border-b border-slate-100 ${ri % 2 === 0 ? "bg-white" : "bg-slate-50/50"}`}
                                    >
                                        <td className="py-4 px-6 text-xs font-black text-slate-600">{attr.label}</td>
                                        {products.map(p => {
                                            const val = p[attr.key as keyof typeof p] as number;
                                            const displayVal = attr.invert ? (6 - val) : val;
                                            return (
                                                <td key={p.name} className="py-4 px-4 text-center">
                                                    <ScoreDots value={displayVal} color={p.color} />
                                                </td>
                                            );
                                        })}
                                    </tr>
                                ))}

                                {/* Premium row */}
                                <tr className="bg-white border-b border-slate-100">
                                    <td className="py-4 px-6 text-xs font-black text-slate-600">Avg. Premium</td>
                                    {products.map(p => (
                                        <td key={p.name} className="py-4 px-4 text-center">
                                            <span className="text-[10px] font-black text-slate-600">{p.premium}</span>
                                        </td>
                                    ))}
                                </tr>

                                {/* Returns row */}
                                <tr className="bg-slate-50/50 border-b border-slate-100">
                                    <td className="py-4 px-6 text-xs font-black text-slate-600">Expected Return</td>
                                    {products.map(p => (
                                        <td key={p.name} className="py-4 px-4 text-center">
                                            <span
                                                className="text-[10px] font-black px-2 py-1 rounded-full"
                                                style={{ color: p.color, backgroundColor: `${p.color}12` }}
                                            >
                                                {p.returnLabel}
                                            </span>
                                        </td>
                                    ))}
                                </tr>

                                {/* Tax row */}
                                <tr className="bg-white border-b border-slate-100">
                                    <td className="py-4 px-6 text-xs font-black text-slate-600">Tax Section</td>
                                    {products.map(p => (
                                        <td key={p.name} className="py-4 px-4 text-center">
                                            <span className="text-[9px] font-black text-emerald-600 bg-emerald-50 px-2 py-1 rounded-full border border-emerald-100">
                                                {p.taxNote}
                                            </span>
                                        </td>
                                    ))}
                                </tr>

                                {/* Lock-in row */}
                                <tr className="bg-slate-50/50">
                                    <td className="py-4 px-6 text-xs font-black text-slate-600">Lock-in Period</td>
                                    {products.map(p => (
                                        <td key={p.name} className="py-4 px-4 text-center">
                                            <span className="text-[10px] font-black text-slate-500">{p.lock}</span>
                                        </td>
                                    ))}
                                </tr>
                            </tbody>
                        </table>
                    </div>
                </motion.div>



                {/* ── PRODUCT DETAIL CARDS (accordion) ─────── */}
                <div className="mt-16">
                    <div className="flex items-center justify-between mb-8">
                        <h3 className="text-xl font-black text-[#0B1C2E]">Quick Summaries</h3>
                        <button
                            suppressHydrationWarning
                            onClick={() => setShowAll(p => !p)}
                            className="flex items-center gap-1.5 text-[10px] font-black text-[#2076C7] uppercase tracking-widest"
                        >
                            {showAll ? "Collapse All" : "Expand All"}
                            <ChevronDown className={`w-3.5 h-3.5 transition-transform ${showAll ? "rotate-180" : ""}`} />
                        </button>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
                        {products.map((p, i) => (
                            <motion.div
                                key={p.name}
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: i * 0.06 }}
                                className="bg-white rounded-[1.75rem] border border-slate-100 shadow-[0_4px_20px_rgba(0,0,0,0.03)] overflow-hidden hover:shadow-[0_12px_40px_rgba(0,0,0,0.07)] transition-all"
                            >
                                {/* Card Top */}
                                <div className="p-5 flex items-center gap-4">
                                    <div
                                        className="w-11 h-11 rounded-xl flex items-center justify-center shrink-0"
                                        style={{ backgroundColor: `${p.color}15` }}
                                    >
                                        <p.icon className="w-5 h-5" style={{ color: p.color }} />
                                    </div>
                                    <div className="flex-1">
                                        <p className="text-[9px] font-black text-slate-400 uppercase tracking-widest">{p.suitedFor}</p>
                                        <h4 className="text-sm font-black text-[#0B1C2E]">{p.name}</h4>
                                    </div>
                                    <div
                                        className="w-6 h-6 rounded-full flex items-center justify-center text-white text-[10px] font-black shrink-0"
                                        style={{ backgroundColor: p.color }}
                                    >
                                        ?
                                    </div>
                                </div>

                                {/* Mini bar chart */}
                                <div className="px-5 pb-5 space-y-2.5">
                                    {CHART_METRICS.slice(0, showAll ? 5 : 3).map(m => {
                                        const val = p[m.key as keyof typeof p] as number;
                                        return (
                                            <div key={m.key} className="flex items-center gap-3">
                                                <span className="text-[9px] font-black text-slate-400 w-20 shrink-0">{m.label}</span>
                                                <div className="flex-1">
                                                    <AnimatedBar value={val} max={5} color={p.color} />
                                                </div>
                                                <span className="text-[9px] font-black w-5 text-right" style={{ color: p.color }}>{val}</span>
                                            </div>
                                        );
                                    })}

                                    {/* Key stats */}
                                    <div className="mt-4 pt-4 border-t border-slate-100 grid grid-cols-2 gap-3">
                                        <div className="bg-slate-50 rounded-xl p-3">
                                            <p className="text-[8px] font-black text-slate-400 uppercase tracking-widest mb-1">Returns</p>
                                            <p className="text-[10px] font-black" style={{ color: p.color }}>{p.returnLabel}</p>
                                        </div>
                                        <div className="bg-slate-50 rounded-xl p-3">
                                            <p className="text-[8px] font-black text-slate-400 uppercase tracking-widest mb-1">Tax</p>
                                            <p className="text-[10px] font-black text-emerald-600">{p.taxNote}</p>
                                        </div>
                                        <div className="bg-slate-50 rounded-xl p-3">
                                            <p className="text-[8px] font-black text-slate-400 uppercase tracking-widest mb-1">Risk</p>
                                            <p className="text-[10px] font-black text-slate-600">{p.riskLabel}</p>
                                        </div>
                                        <div className="bg-slate-50 rounded-xl p-3">
                                            <p className="text-[8px] font-black text-slate-400 uppercase tracking-widest mb-1">Premium</p>
                                            <p className="text-[10px] font-black text-slate-600">{p.premium}</p>
                                        </div>
                                    </div>
                                </div>
                            </motion.div>
                        ))}
                    </div>
                </div>

                {/* Footer note */}
                <div className="mt-12 flex items-center gap-3 bg-white border border-slate-100 rounded-2xl p-4 max-w-2xl mx-auto">
                    <Info className="w-4 h-4 text-[#2076C7] shrink-0" />
                    <p className="text-[10px] text-slate-400 font-medium">
                        Scores are indicative comparisons. Actual returns & benefits vary per insurer, age, and policy terms. Consult our advisor for a personalised recommendation.
                    </p>
                </div>
            </div>
        </section>
    );
}
