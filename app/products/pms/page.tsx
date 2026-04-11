"use client";

import React, { useState, useEffect, Suspense } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { TrendingUp, PieChart, ArrowRight, BarChart, IndianRupee, ArrowLeft
} from 'lucide-react';
import { motion, Variants } from 'framer-motion';

// Components
import PMS_Live_Performance from './components/dashboard/PMS_Live_Performance';
import PMSComparisonCalculator from './components/calculators/PMSComparisonCalculator';
import CTASection from '@/app/component/CTASection';
import ChatBot from '@/app/component/chatbot/page';
import ScrollToTop from '@/app/component/ScrollToTop';
import { useModal } from '@/app/context/ModalContext';
import PMSFAQ from './components/PMSFAQ';

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
        <div className="relative w-full h-full flex items-center justify-center scale-75 md:scale-90 lg:scale-100">
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
                    <PieChart className="text-[#2076C7] w-4 h-4" />
                </motion.div>
                <motion.div className="absolute bottom-10 right-10 w-10 h-10 bg-white rounded-full shadow-lg flex items-center justify-center border border-gray-100">
                    <IndianRupee className="text-[#1CADA3] w-5 h-5" />
                </motion.div>
            </motion.div>
        </div>
    );
};

function PMSProductsContent() {
    // Back Button State & Navigation
    const router = useRouter();
    const { openLogin } = useModal();
    const [showBackButton, setShowBackButton] = useState(true);

    useEffect(() => {
        const handleScroll = () => setShowBackButton(window.scrollY < 80);
        window.addEventListener('scroll', handleScroll, { passive: true });
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    const handleBackToOffers = () => router.push('/#services');

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
        hidden: { opacity: 1 },
        visible: {
            opacity: 1,
            transition: {
                staggerChildren: 0.1
            }
        }
    };

    return (
        <div className="bg-white min-h-screen font-sans">
            {/* FIXED BACK BUTTON */}
            <div className={`fixed z-50 top-20 left-4 md:top-24 md:left-8 transition-all duration-300 ${showBackButton ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'}`}>
                <button
                    onClick={handleBackToOffers}
                    aria-label="Back to Offers"
                    className="md:hidden group flex items-center gap-2 p-2 text-gray-500"
                >
                    <div className="p-2.5 bg-white/70 backdrop-blur-md rounded-full shadow-lg border border-gray-200/50 active:scale-80 transition-all">
                        <ArrowLeft className="w-4 h-4 text-gray-700" strokeWidth={2} />
                    </div>
                </button>
                <button
                    onClick={handleBackToOffers}
                    className="hidden md:inline-flex items-center gap-2 px-4 py-2 text-sm font-medium text-gray-700 bg-white/90 backdrop-blur-sm rounded-lg border border-gray-300 hover:bg-white shadow-lg active:scale-95 transition-all group"
                >
                    <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" strokeWidth={2} />
                    Back to Offers
                </button>
            </div>

            <motion.div
                key="pms-content"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.4 }}
            >
                {/* PMS Hero Section */}
                <section className="relative py-20 lg:py-28 overflow-hidden bg-white">
                    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
                        <div className="grid lg:grid-cols-2 gap-12 items-center">
                            <motion.div
                                variants={staggerContainer}
                                initial="hidden"
                                animate="visible"
                                className="text-left"
                            >
                                <motion.div
                                    variants={slideUpFade}
                                    className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-50 border border-blue-100 mb-6 shadow-sm"
                                >
                                    <span className="relative flex h-2 w-2">
                                        <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-sky-400 opacity-75"></span>
                                        <span className="relative inline-flex rounded-full h-2 w-2 bg-sky-500"></span>
                                    </span>
                                    <span className="text-[10px] font-bold text-[#2076C7] uppercase tracking-widest">
                                        Exclusive PMS Strategies
                                    </span>
                                </motion.div>

                                <motion.h1 variants={slideUpFade} className="text-5xl md:text-6xl lg:text-7xl font-sans font-bold bg-gradient-to-r from-[#2076C7] via-[#1CADA3] to-[#2076C7] bg-clip-text text-transparent leading-tight mb-6 tracking-tight">
                                    Get Closer to <br />
                                    Your Goals with <br />
                                    <span className="text-[#2076C7]">Instant PMS <br /> Investments</span>
                                </motion.h1>

                                <motion.p variants={slideUpFade} className="text-lg md:text-xl lg:text-2xl text-gray-700 max-w-xl leading-relaxed mb-10">
                                    Sophisticated investment vehicles for high-alpha wealth creation
                                </motion.p>

                                <motion.div className="flex flex-col sm:flex-row gap-4 mb-2">
                                    <button
                                        onClick={openLogin}
                                        className="group relative w-max px-8 py-3.5 md:px-12 md:py-4 rounded-xl font-bold text-base md:text-lg text-white transform hover:-translate-y-1 transition-all duration-300 shadow-xl hover:shadow-2xl overflow-hidden"
                                        style={{ background: 'linear-gradient(135deg, #2076C7 0%, #1CADA3 100%)' }}
                                    >
                                        <div className="absolute inset-0 bg-white/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                                        <span className="relative z-10 flex items-center justify-center gap-2">
                                            Apply Now
                                            <svg className="w-5 h-5 md:w-6 md:h-6 transform group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                                            </svg>
                                        </span>
                                    </button>
                                </motion.div>                            </motion.div>

                            <motion.div
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                transition={{ duration: 1, delay: 0.2 }}
                                className="relative h-[350px] md:h-[400px] lg:h-[500px] w-full block mt-8 lg:mt-0">
                                <PMSHeroVisual />
                            </motion.div>
                        </div>
                    </div>
                </section>

                <PMSHeaderRecommended />

                {/* PMS Strategies Section */}
                <section id="strategies" className="py-24 bg-white text-gray-700">
                    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
                        <motion.div initial="hidden" whileInView="visible" variants={staggerContainer} className="text-center mb-16">
                            <motion.h2 variants={slideUpFade} className="text-3xl md:text-4xl font-extrabold font-sans mb-3 bg-gradient-to-r from-[#2076C7] to-[#1CADA3] bg-clip-text text-transparent drop-shadow-sm">PMS Strategies & Approaches</motion.h2>
                            <motion.p variants={slideUpFade} className="text-xl text-gray-500 max-w-3xl mx-auto font-light">
                                Our research-driven strategies are designed to capture alpha across diverse market cycles.
                            </motion.p>
                        </motion.div>
                        <div className="space-y-6">
                            {[
                                { name: "Carnelian Capital Compounder Strategy", desc: "Multi-cap strategy focused on 'Magic' (Growth) and 'Compounder' (Quality) businesses.", link: "/products/pms/carnelian-compounder", risk: "High Risk", horizon: "5+ Years", color: "#2076C7" },
                                { name: "Carnelian Shift Strategy", desc: "High-conviction mid & small-cap strategy focused on manufacturing and technology leaders.", link: "/products/pms/carnelian-shift", risk: "High Risk", horizon: "5+ Years", color: "#1CADA3" },
                                { name: "Carnelian Contra Portfolio Strategy", desc: "Large-cap-biased multi-cap strategy following a contrarian, absolute-return approach.", link: "/products/pms/carnelian-contra", risk: "Moderate to High", horizon: "3+ Years", color: "#2076C7" },
                                { name: "PGIM India Core Equity Portfolio", desc: "A core equity strategy investing in high-quality Indian companies available at reasonable valuations.", link: "/products/pms/pgim-india-core-equity", risk: "Moderate", horizon: "3+ Years", color: "#2076C7" },
                                { name: "PGIM India Equity Portfolio", desc: "Diversified multi-cap equity portfolio aiming for long-term capital appreciation.", link: "/products/pms/pgim-india-equity", risk: "Moderate to High", horizon: "3+ Years", color: "#2076C7" },
                                { name: "PGIM India Phoenix Portfolio", desc: "Quality-focused mid and small-cap equity portfolio aiming for long-term capital appreciation.", link: "/products/pms/pgim-india-phoenix", risk: "High Risk", horizon: "3+ Years", color: "#1CADA3" },
                                { name: "MOTILAL OSWAL ETHICAL STRATEGY", desc: "A long-term equity strategy focused on ethical businesses with strong earnings growth and quality governance.", link: "/products/pms/motilal-oswal-ethical", risk: "High Risk", horizon: "3+ Years", color: "#1CADA3" },
                                { name: "Invesco India Challengers Portfolio", desc: "Globally recognized investment approaches tailored for institutional-grade equity performance.", link: "/products/pms/invesco-challengers", risk: "Moderate to High", horizon: "3-5 Years", color: "#1CADA3" },
                                { name: "Abakkus Emerging Opportunities – PMS", desc: "Focusing on mid and small-cap companies with high growth potential and strong fundamental backings.", link: "/products/pms/abakkus-emerging", risk: "High Risk", horizon: "5+ Years", color: "#1CADA3" },
                                { name: "Abakkus All Cap Approach – PMS", desc: "A diversified approach across market capitalizations to capture growth opportunities in various cycles.", link: "/products/pms/abakkus-all-cap", risk: "Moderate Risk", horizon: "3-5 Years", color: "#2076C7" }
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
                            <motion.h2 variants={slideUpFade} className="text-3xl md:text-4xl font-extrabold font-sans mb-3 bg-gradient-to-r from-[#2076C7] to-[#1CADA3] bg-clip-text text-transparent drop-shadow-sm">PMS Strategies Comparison</motion.h2>
                            <motion.p variants={slideUpFade} className="text-gray-500 text-lg lg:text-xl font-light">Find the right fit for your investment goals.</motion.p>
                        </motion.div>

                        <div className="overflow-x-auto rounded-3xl shadow-xl border border-gray-200">
                            <table className="w-full text-left border-collapse bg-white">
                                <thead>
                                    <tr className="bg-gradient-to-r from-[#2076C7] to-[#1CADA3] text-white">
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
                                        <tr key={idx} className={`hover:bg-[#2076C7]/5 transition-colors ${idx % 2 === 0 ? 'bg-white' : 'bg-neutral-50/50'}`}>
                                            <td className="p-5 font-bold text-gray-700">{row.name}</td>
                                            <td className="p-5">{row.type}</td>
                                            <td className="p-5">{row.cap}</td>
                                            <td className="p-5">
                                                <span className={`px-3 py-1 rounded-full text-xs font-bold ${row.risk.includes('High') ? 'bg-[#2076C7]/10 text-[#2076C7]' : 'bg-[#1CADA3]/10 text-[#1CADA3]'}`}>
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
                <section className="py-24 bg-white">
                    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
                        <motion.div initial="hidden" whileInView="visible" variants={staggerContainer} viewport={{ once: true }} className="text-center mb-16">
                            <motion.h2 variants={slideUpFade} className="text-3xl md:text-4xl font-extrabold font-sans mb-3 bg-gradient-to-r from-[#2076C7] to-[#1CADA3] bg-clip-text text-transparent drop-shadow-sm">Compare PMS with Other Investments</motion.h2>
                            <motion.p variants={slideUpFade} className="text-xl text-gray-500 max-w-3xl mx-auto font-light">See how PMS returns stand out against traditional investment vehicles over time.</motion.p>
                        </motion.div>
                        <PMSComparisonCalculator />
                    </div>
                </section>

                {/* PMS Live Performance Section */}
                <section className="py-24 bg-white">
                    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 ">
                        <motion.div initial="hidden" whileInView="visible" variants={staggerContainer} viewport={{ once: true }} className="text-center mb-16">
                            <motion.h2 variants={slideUpFade} className="text-3xl md:text-4xl font-extrabold font-sans mb-3 bg-gradient-to-r from-[#2076C7] to-[#1CADA3] bg-clip-text text-transparent drop-shadow-sm">Live Strategy Performance</motion.h2>
                            <motion.p variants={slideUpFade} className="text-xl text-gray-500 max-w-3xl mx-auto font-light">Real-time tracking of our aggregate PMS performance against benchmarks.</motion.p>
                        </motion.div>
                        <PMS_Live_Performance />
                    </div>
                </section>

                <div className="bg-white py-10 px-4">
                    <div className="max-w-4xl mx-auto bg-yellow-50 border border-yellow-200 rounded-xl p-6 shadow-sm">
                        <p className="text-sm text-gray-700 text-center leading-relaxed">
                            <strong className="text-black">Disclaimer:</strong> Portfolio Management Services (PMS) involve investment risks. Past performance is not indicative of future results. Investors are advised to read the Disclosure Document and Strategy brochure carefully before investing. Minimum investment required is ₹50 Lakhs as per SEBI regulations.
                        </p>
                    </div>
                </div>

                <PMSFAQ />

                <CTASection />
            </motion.div>
            <ChatBot />
            <ScrollToTop />
        </div>
    );
}

export default function PMSListingPage() {
    return (
        <Suspense fallback={
            <div className="min-h-screen bg-white flex items-center justify-center">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
            </div>
        }>
            <PMSProductsContent />
        </Suspense>
    );
}