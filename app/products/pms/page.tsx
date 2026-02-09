"use client";

import React, { useState, useEffect, Suspense } from 'react';
import Link from 'next/link';
import {
    CheckCircle, TrendingUp, PieChart, ShieldCheck, ArrowRight, Users, Settings,
    Activity, FileText, BarChart, Layers, Search, Award, HelpCircle, Info,
    BookOpen, Smartphone, MessageSquare, IndianRupee, Target, ChevronDown, ChevronUp, Briefcase, Building,
    Globe, Clock, Zap, AlertTriangle, ArrowLeft
} from 'lucide-react';
import { motion, AnimatePresence, Variants } from 'framer-motion';

// Components
import PMS_Live_Performance from './components/dashboard/PMS_Live_Performance';
import PMSComparisonCalculator from './components/calculators/PMSComparisonCalculator';

const PMSHeaderRecommended = () => {
    return (
        <div className="mb-8 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 -mt-8 relative z-30">
            <div className="bg-white/80 backdrop-blur-md rounded-2xl p-8 border border-gray-100 shadow-xl overflow-hidden relative group">
                <div className="absolute top-0 right-0 w-64 h-64 bg-primary/5 rounded-full -mr-32 -mt-32 transition-transform duration-700 group-hover:scale-110" />
                <div className="flex flex-col lg:flex-row lg:items-center justify-between relative z-10">
                    <div className="lg:w-full">
                        <div className="flex items-center mb-4">
                            <div className="w-10 h-10 bg-primary/10 text-gray-700 rounded-xl flex items-center justify-center mr-4 shadow-sm">
                                <BarChart className="w-6 h-6" />
                            </div>
                            <h1 className="text-3xl font-bold text-gray-900">
                                Portfolio Management Services
                            </h1>
                        </div>
                        <p className="text-gray-500 text-lg leading-relaxed max-w-2xl">
                            Customized equity portfolio management for qualified investors.
                            <span className="text-primary font-bold"> Minimum investment ₹50 lakhs.</span> Active, concentrated strategies with professional oversight.
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
};

const PMSHeroVisual = () => {
    return (
        <div className="relative w-full h-full flex items-center justify-center">
            {/* Background Glow */}
            <motion.div
                animate={{
                    opacity: [0.3, 0.5, 0.3]
                }}
                transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
                className="absolute w-[400px] h-[400px] rounded-full blur-3xl"
                style={{ background: 'radial-gradient(circle, rgba(32, 118, 199, 0.2) 0%, rgba(28, 173, 163, 0.2) 70%, transparent 100%)' }}
            />

            {/* Floating Glass Cards */}
            <motion.div
                animate={{ y: [0, -15, 0] }}
                transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
                className="relative z-20 w-80 h-48 bg-white/40 backdrop-blur-xl rounded-3xl border border-white/50 shadow-2xl flex flex-col p-6 overflow-hidden"
            >
                <div className="flex justify-between items-center mb-4">
                    <div className="w-12 h-12 bg-primary/20 rounded-xl flex items-center justify-center">
                        <TrendingUp className="text-primary w-6 h-6" />
                    </div>
                    <div className="text-right">
                        <div className="text-xs text-slate-500 font-bold uppercase tracking-tighter">Portfolio Alpha</div>
                        <div className="text-xl font-black text-gray-700">+24.8%</div>
                    </div>
                </div>
                <div className="mt-auto h-16 w-full flex items-end gap-1 px-1">
                    {[40, 70, 45, 90, 65, 80, 50, 95].map((h, i) => (
                        <motion.div
                            key={i}
                            initial={{ height: 0 }}
                            animate={{ height: `${h}%` }}
                            transition={{ duration: 1, delay: i * 0.1 }}
                            className="flex-1 rounded-t-sm"
                            style={{ background: 'linear-gradient(to top, #2076C7, #1CADA3)' }}
                        />
                    ))}
                </div>
            </motion.div>

            {/* Orbiting Elements */}
            <motion.div
                animate={{ rotate: 360 }}
                transition={{ duration: 25, repeat: Infinity, ease: "linear" }}
                className="absolute w-[450px] h-[450px] rounded-full border border-dashed border-slate-200 pointer-events-none">
                <motion.div className="absolute top-0 left-1/2 -ml-4 mt-6 w-8 h-8 bg-white rounded-full shadow-lg flex items-center justify-center border border-gray-100">
                    <PieChart className="text-blue-500 w-4 h-4" />
                </motion.div>
                <motion.div className="absolute bottom-10 right-10 w-10 h-10 bg-white rounded-full shadow-lg flex items-center justify-center border border-gray-100">
                    <IndianRupee className="text-teal-500 w-5 h-5" />
                </motion.div>
            </motion.div>
        </div>
    );
};

function PMSProductsContent() {
    const [openPmsFaq, setOpenPmsFaq] = useState<number | null>(null);

    // Fixed Variants with "as const" to resolve TypeScript Easing error
    const fadeIn: Variants = {
        hidden: { opacity: 0 },
        visible: { opacity: 1, transition: { duration: 0.6, ease: "easeOut" } }
    };

    const slideUpFade: Variants = {
        hidden: { opacity: 0, y: 20 },
        visible: { 
            opacity: 1, 
            y: 0, 
            transition: { duration: 0.5, ease: "easeOut" } 
        }
    };

    const staggerContainer: Variants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: {
                staggerChildren: 0.1
            }
        }
    };

    return (
        <div className="bg-neutral-100 min-h-screen">
            <motion.div
                key="pms-content"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.4 }}
            >
                {/* PMS Hero Section */}
                <section className="relative py-20 lg:py-28 overflow-hidden bg-gradient-to-r from-blue-50 to-white">
                    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
                        <div className="grid lg:grid-cols-2 gap-12 items-center">
                            <motion.div
                                variants={staggerContainer}
                                initial="hidden"
                                animate="visible"
                                className="text-left"
                            >
                                <div className="mb-6">
                                    <Link
                                        href="/"
                                        className="inline-flex items-center gap-2 px-5 py-2.5 bg-white rounded-lg border border-gray-100 shadow-sm text-gray-700 font-bold text-sm hover:shadow-md transition-all active:scale-95"
                                    >
                                        <ArrowLeft size={16} />
                                        Back to Home
                                    </Link>
                                </div>

                                <div className="absolute top-8 right-8 z-30">
                                    <motion.div>
                                        <a
                                            href="mailto:info@infinityarthvishva.com"
                                            className="flex items-center gap-2 px-6 py-2.5 rounded-lg font-bold text-white shadow-lg text-sm transition-all hover:opacity-90"
                                            style={{ background: 'linear-gradient(to right, #2076C7, #1CADA3)' }}
                                        >
                                            Apply Now
                                            <Zap size={16} fill="currentColor" />
                                        </a>
                                    </motion.div>
                                </div>

                                <motion.h1 variants={slideUpFade} className="text-5xl md:text-7xl font-bold font-sans bg-linear-to-r from-[#2076C7] to-[#1CADA3] bg-clip-text text-transparent leading-[1.1] mb-6 tracking-tight">
                                    Get Closer to <br />
                                    Your Goals with <br />
                                    <span className="text-primary">Instant PMS <br /> Investments</span>
                                </motion.h1>

                                <motion.p variants={slideUpFade} className="text-xl md:text-2xl text-gray-600 max-w-xl leading-relaxed mb-10">
                                    Sophisticated investment vehicles for high-alpha wealth creation
                                </motion.p>

                                <motion.div variants={slideUpFade} className="flex flex-wrap gap-5 pt-4">
                                    <a href="mailto:info@infinityarthvishva.com" className="flex items-center gap-3 px-6 py-3 md:px-8 md:py-4 text-sm md:text-base font-bold text-white bg-gradient-to-r from-[#2076C7] to-[#1CADA3] rounded-full shadow-lg hover:opacity-90 transition-all">
                                        Consult an Advisor
                                    </a>
                                </motion.div>
                            </motion.div>

                            <motion.div
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                transition={{ duration: 1, delay: 0.2 }}
                                className="relative h-[500px] hidden lg:block"
                            >
                                <PMSHeroVisual />
                            </motion.div>
                        </div>
                    </div>
                </section>

                <PMSHeaderRecommended />

                {/* PMS Strategies Section */}
                <section className="py-24 bg-neutral-50 text-gray-700">
                    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
                        <motion.div initial="hidden" whileInView="visible" variants={staggerContainer} className="text-center mb-16">
                            <motion.h2 variants={slideUpFade} className="text-4xl font-bold bg-linear-to-r from-[#2076C7] to-[#1CADA3] bg-clip-text text-transparent mb-4">PMS Strategies & Approaches</motion.h2>
                            <motion.p variants={slideUpFade} className="text-xl text-gray-500 max-w-3xl mx-auto font-light">
                                Our research-driven strategies are designed to capture alpha across diverse market cycles.
                            </motion.p>
                        </motion.div>
                        <div className="space-y-6">
                            {[
                                { name: "Carnelian Capital Compounder Strategy", desc: "Multi-cap strategy focused on 'Magic' (Growth) and 'Compounder' (Quality) businesses.", link: "/products/pms/carnelian-compounder", risk: "High Risk", horizon: "5+ Years", color: "#2076C7" },
                                { name: "Carnelian Shift Strategy", desc: "High-conviction mid & small-cap strategy focused on manufacturing and technology leaders.", link: "/products/pms/carnelian-shift", risk: "High Risk", horizon: "5+ Years", color: "#1CADA3" },
                                { name: "Carnelian Contra Portfolio Strategy", desc: "Large-cap-biased multi-cap strategy following a contrarian, absolute-return approach.", link: "/products/pms/carnelian-contra", risk: "Moderate to High", horizon: "3+ Years", color: "#4F46E5" },
                                { name: "PGIM India Core Equity Portfolio", desc: "A core equity strategy investing in high-quality Indian companies available at reasonable valuations.", link: "/products/pms/pgim-india-core-equity", risk: "Moderate", horizon: "3+ Years", color: "#2076C7" },
                                { name: "PGIM India Equity Portfolio", desc: "Diversified multi-cap equity portfolio aiming for long-term capital appreciation.", link: "/products/pms/pgim-india-equity", risk: "Moderate to High", horizon: "3+ Years", color: "#2076C7" },
                                { name: "PGIM India Phoenix Portfolio", desc: "Quality-focused mid and small-cap equity portfolio aiming for long-term capital appreciation.", link: "/products/pms/pgim-india-phoenix", risk: "High Risk", horizon: "3+ Years", color: "#1CADA3" },
                                { name: "MOTILAL OSWAL ETHICAL STRATEGY", desc: "A long-term equity strategy focused on ethical businesses with strong earnings growth and quality governance.", link: "/products/pms/motilal-oswal-ethical", risk: "High Risk", horizon: "3+ Years", color: "#1CADA3" },
                                { name: "Invesco India Challengers Portfolio", desc: "Globally recognized investment approaches tailored for institutional-grade equity performance.", link: "/products/pms/invesco-challengers", risk: "Moderate to High", horizon: "3-5 Years", color: "#1CADA3" },
                                { name: "Abakkus Emerging Opportunities – PMS", desc: "Focusing on mid and small-cap companies with high growth potential and strong fundamental backings.", link: "/products/pms/abakkus-emerging", risk: "High Risk", horizon: "5+ Years", color: "#4F46E5" },
                                { name: "Abakkus All Cap Approach – PMS", desc: "A diversified approach across market capitalizations to capture growth opportunities in various cycles.", link: "/products/pms/abakkus-all-cap", risk: "Moderate Risk", horizon: "3-5 Years", color: "#0D9488" }
                            ].map((fund, idx) => (
                                <motion.div
                                    key={idx}
                                    variants={slideUpFade}
                                    initial="hidden"
                                    whileInView="visible"
                                    viewport={{ once: true }}
                                >
                                    <Link href={fund.link}>
                                        <div className="bg-white p-8 rounded-2xl shadow-sm border border-gray-100 flex flex-col md:flex-row md:items-center justify-between gap-6 hover:shadow-xl transition-all duration-300 relative overflow-hidden group">
                                            <div className="absolute left-0 top-0 bottom-0 w-1.5" style={{ backgroundColor: fund.color }} />

                                            <div className="flex-1">
                                                <h3 className="text-xl font-bold text-gray-700 mb-2 group-hover:text-primary transition-colors">{fund.name}</h3>
                                                <p className="text-gray-500 text-sm max-w-2xl leading-relaxed">{fund.desc}</p>
                                            </div>

                                            <div className="flex items-center gap-8 text-sm shrink-0 border-t md:border-t-0 pt-4 md:pt-0 border-gray-50">
                                                <div className="flex flex-col">
                                                    <span className="text-[10px] uppercase tracking-widest text-slate-400 mb-1">Risk Profile</span>
                                                    <span className="font-bold text-slate-700">{fund.risk}</span>
                                                </div>
                                                <div className="flex flex-col">
                                                    <span className="text-[10px] uppercase tracking-widest text-slate-400 mb-1">Min Horizon</span>
                                                    <span className="font-bold text-slate-700">{fund.horizon}</span>
                                                </div>
                                                <div className="p-3 rounded-full bg-slate-50 text-slate-400 group-hover:bg-primary/10 group-hover:text-primary transition-all">
                                                    <ArrowRight size={20} />
                                                </div>
                                            </div>
                                        </div>
                                    </Link>
                                </motion.div>
                            ))}
                        </div>
                    </div>
                </section>

                {/* Strategy Comparison Table */}
                <section className="py-24 bg-white">
                    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                        <motion.div initial="hidden" whileInView="visible" variants={staggerContainer} viewport={{ once: true }} className="text-center mb-16">
                            <motion.h2 variants={slideUpFade} className="text-3xl lg:text-4xl font-bold bg-linear-to-r from-[#2076C7] to-[#1CADA3] bg-clip-text text-transparent mb-4">PMS Strategies Comparison</motion.h2>
                            <motion.p variants={slideUpFade} className="text-gray-500 text-lg lg:text-xl font-light">Find the right fit for your investment goals.</motion.p>
                        </motion.div>

                        <div className="overflow-x-auto rounded-3xl shadow-xl border border-gray-200">
                            <table className="w-full text-left border-collapse bg-white">
                                <thead>
                                    <tr className="bg-gradient-to-r from-primary to-accent-teal text-white">
                                        <th className="p-5 font-bold text-sm uppercase tracking-wider text-white">Fund Name</th>
                                        <th className="p-5 font-bold text-sm uppercase tracking-wider text-white">Strategy Type</th>
                                        <th className="p-5 font-bold text-sm uppercase tracking-wider text-white">Market Cap Bias</th>
                                        <th className="p-5 font-bold text-sm uppercase tracking-wider text-white">Risk</th>
                                        <th className="p-5 font-bold text-sm uppercase tracking-wider text-white">Horizon</th>
                                        <th className="p-5 font-bold text-sm uppercase tracking-wider text-white">Best Suited For</th>
                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-gray-100 text-gray-700 text-sm">
                                    {[
                                        { name: "Carnelian Compounder", type: "Quality Growth", cap: "Multi-cap", risk: "Medium–High", horizon: "5+ yrs", suit: "Long-term compounding" },
                                        { name: "Carnelian Shift", type: "Growth", cap: "Mid & Small", risk: "High", horizon: "5+ yrs", suit: "Aggressive growth seekers" },
                                        { name: "Carnelian Contra", type: "Contrarian", cap: "Large-cap bias", risk: "Medium", horizon: "3–5 yrs", suit: "Defensive investors" },
                                        { name: "PGIM Core Equity", type: "Core Equity", cap: "Large-cap", risk: "Medium", horizon: "3+ yrs", suit: "Stability-focused" },
                                        { name: "PGIM Equity Portfolio", type: "Diversified", cap: "Multi-cap", risk: "Medium–High", horizon: "3+ yrs", suit: "Balanced investors" },
                                        { name: "PGIM Phoenix", type: "High Growth", cap: "Small-cap", risk: "High", horizon: "5+ yrs", suit: "High-risk, high-reward" },
                                        { name: "Abakkus Emerging", type: "Emerging Growth", cap: "Mid & Small", risk: "High", horizon: "5+ yrs", suit: "Alpha seekers" },
                                        { name: "Abakkus All Cap", type: "Diversified Growth", cap: "Large + Mid + Small", risk: "Medium–High", horizon: "4–5+ yrs", suit: "Alpha seekers" },
                                        { name: "Invesco Challengers", type: "Challenger Theme", cap: "Multi-cap", risk: "Medium–High", horizon: "4+ yrs", suit: "Structural growth" },
                                    ].map((row, idx) => (
                                        <tr key={idx} className={`hover:bg-blue-50/50 transition-colors ${idx % 2 === 0 ? 'bg-white' : 'bg-neutral-50/50'}`}>
                                            <td className="p-5 font-bold text-gray-700">{row.name}</td>
                                            <td className="p-5">{row.type}</td>
                                            <td className="p-5">{row.cap}</td>
                                            <td className="p-5">
                                                <span className={`px-3 py-1 rounded-full text-xs font-bold ${row.risk.includes('High') ? 'bg-red-100 text-red-700' : 'bg-yellow-100 text-yellow-700'}`}>
                                                    {row.risk}
                                                </span>
                                            </td>
                                            <td className="p-5">{row.horizon}</td>
                                            <td className="p-5 font-medium text-primary">{row.suit}</td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </div>
                </section>

                {/* PMS Calculator Section */}
                <section className="py-24 bg-neutral-100">
                    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
                        <motion.div initial="hidden" whileInView="visible" variants={staggerContainer} viewport={{ once: true }} className="text-center mb-16">
                            <motion.h2 variants={slideUpFade} className="text-4xl font-bold bg-linear-to-r from-[#2076C7] to-[#1CADA3] bg-clip-text text-transparent mb-4">Compare PMS with Other Investments</motion.h2>
                            <motion.p variants={slideUpFade} className="text-xl text-gray-500 max-w-3xl mx-auto font-light">See how PMS returns stand out against traditional investment vehicles over time.</motion.p>
                        </motion.div>
                        <PMSComparisonCalculator />
                    </div>
                </section>

                {/* PMS Live Performance Section */}
                <section className="py-24 bg-white">
                    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 ">
                        <motion.div initial="hidden" whileInView="visible" variants={staggerContainer} viewport={{ once: true }} className="text-center mb-16">
                            <motion.h2 variants={slideUpFade} className="text-4xl font-bold bg-linear-to-r from-[#2076C7] to-[#1CADA3] bg-clip-text text-transparent mb-4">Live Strategy Performance</motion.h2>
                            <motion.p variants={slideUpFade} className="text-xl text-gray-500 max-w-3xl mx-auto font-light">Real-time tracking of our aggregate PMS performance against benchmarks.</motion.p>
                        </motion.div>
                        <PMS_Live_Performance />
                    </div>
                </section>

                {/* PMS FAQ */}
                <section className="py-24 bg-neutral-50">
                    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
                        <motion.div initial="hidden" whileInView="visible" variants={staggerContainer} viewport={{ once: true }} className="text-center mb-16">
                            <motion.h2 variants={slideUpFade} className="text-4xl font-bold bg-linear-to-r from-[#2076C7] to-[#1CADA3] bg-clip-text text-transparent mb-4">PMS FAQ & Investor Guidance</motion.h2>
                            <motion.p variants={slideUpFade} className="text-gray-500 text-xl">Common questions about starting your PMS journey.</motion.p>
                        </motion.div>
                        <div className="space-y-6">
                            {[
                                { q: "What is Portfolio Management Services (PMS)?", a: "Portfolio Management Service (PMS) is a professional service where skilled portfolio managers and stock market experts manage your equity portfolio with the assistance of a research team. It offers a more customized and focused investment approach compared to mutual funds, specifically designed for high-net-worth individuals." },
                                { q: "What is the tax treatment for PMS investments?", a: "Taxation is based on short-term and long-term capital gains, just like direct equity. We provide consolidated tax statements annually to make filing seamless for you." },
                                { q: "How does the non-discretionary model work?", a: "In this model, our managers provide research-backed recommendations, but we only execute trades after receiving your explicit approval for each transaction." },
                                { q: "Are there any lock-in periods for PMS?", a: "While there is no legal lock-in, we recommend a 3-5 year horizon. Most strategies have a marginal exit load (typically 1%) if redeemed within the first year." }
                            ].map((faq, idx) => (
                                <motion.div key={idx} variants={slideUpFade} initial="hidden" whileInView="visible" viewport={{ once: true }} className="overflow-hidden bg-white shadow-sm border border-gray-100 rounded-2xl">
                                    <button onClick={() => setOpenPmsFaq(openPmsFaq === idx ? null : idx)} className="w-full px-8 py-6 text-left flex justify-between items-center hover:bg-neutral-50 transition-colors group">
                                        <span className="font-bold text-lg text-gray-700 group-hover:text-primary transition-colors">{faq.q}</span>
                                        <div className={`p-2 rounded-full transition-all ${openPmsFaq === idx ? 'bg-primary text-white rotate-180' : 'bg-primary/10 text-primary'}`}><ChevronDown size={20} /></div>
                                    </button>
                                    {openPmsFaq === idx && <div className="px-8 pb-8 text-gray-500 bg-neutral-50/50 leading-relaxed"><div className="h-px bg-gray-100 mb-6" />{faq.a}</div>}
                                </motion.div>
                            ))}
                        </div>
                    </div>
                </section>

                {/* PMS CTA */}
                <section className="py-24">
                    <div className="max-w-4xl mx-auto text-center px-4">
                        <motion.div initial="hidden" whileInView="visible" variants={fadeIn} viewport={{ once: true }} className="p-16 shadow-2xl rounded-3xl relative overflow-hidden bg-gradient-to-r from-[#2076C7] to-[#1CADA3] text-white">
                            <motion.h2 variants={slideUpFade} className="text-4xl font-bold text-white mb-6">Ready to redefine your wealth?</motion.h2>
                            <motion.p variants={slideUpFade} className="text-xl text-white/90 mb-10 leading-relaxed font-light">Join elite investors who choose professional management over passive indexing. Let's build a portfolio that reflects your ambitions.</motion.p>
                            <a href="mailto:info@infinityarthvishva.com" className="bg-white text-primary hover:bg-white/90 px-12 py-4 rounded-xl text-[#2076C7] transition-all inline-flex items-center justify-center text-xl shadow-lg">Request a Strategy Call</a>
                        </motion.div>
                    </div>
                </section>
            </motion.div>
        </div>
    );
}

export default function PMSListingPage() {
    return (
        <Suspense fallback={
            <div className="min-h-screen bg-neutral-100 flex items-center justify-center">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
            </div>
        }>
            <PMSProductsContent />
        </Suspense>
    );
}