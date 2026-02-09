"use client";

import React, { useState, lazy, Suspense } from "react";
import Link from "next/link";
import {
    PieChart, TrendingUp, Shield, Search, CheckCircle,
    Users, Banknote, Globe, Zap, LineChart, UserPlus, ChevronDown, Sparkles, Calendar
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { Line, Bar } from "react-chartjs-2";
import { 
    Chart as ChartJS, 
    CategoryScale, 
    LinearScale, 
    PointElement, 
    LineElement, 
    BarElement, 
    Tooltip, 
    Legend, 
    Filler 
} from "chart.js";

// Register ChartJS Components
ChartJS.register(
    CategoryScale, 
    LinearScale, 
    PointElement, 
    LineElement, 
    BarElement, 
    Tooltip, 
    Legend, 
    Filler
);

// --- Animation Variants ---
const fadeInUp = {
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } }
};

const staggerContainer = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { staggerChildren: 0.1 } }
};

const cardHover = {
    rest: { scale: 1, y: 0 },
    hover: { scale: 1.02, y: -5, transition: { duration: 0.2 } }
};

// --- Mock Hero Graphic ---
const HeroGraphic = () => (
    <div className="relative w-full h-[400px] flex items-center justify-center">
        <div className="absolute inset-0 bg-gradient-to-tr from-blue-100/50 to-teal-100/50 rounded-full blur-3xl -z-10"></div>
        <motion.div 
            animate={{ y: [0, -20, 0] }} 
            transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
            className="bg-white p-8 rounded-3xl shadow-2xl border border-blue-50 relative"
        >
            <LineChart className="w-32 h-32 text-[#2076C7]" />
            <div className="absolute -top-4 -right-4 bg-[#1CADA3] p-3 rounded-xl shadow-lg">
                <TrendingUp className="text-white w-6 h-6" />
            </div>
        </motion.div>
    </div>
);

export default function MutualFundsLandingPage() {
    const [expandedIdx, setExpandedIdx] = useState<number | null>(null);

    // Consolidated Fund Categories
    const categories = [
        {
            title: "Equity Funds",
            desc: "Capital growth by investing in stocks of companies across market caps.",
            icon: TrendingUp,
            color: "text-blue-600",
            bg: "bg-blue-50"
        },
        {
            title: "Debt Funds",
            desc: "Stable returns and capital preservation via fixed-income securities.",
            icon: Shield,
            color: "text-indigo-600",
            bg: "bg-indigo-50"
        },
        {
            title: "Global Funds",
            desc: "Diversify your portfolio by investing in international markets.",
            icon: Globe,
            color: "text-teal-600",
            bg: "bg-teal-50"
        },
        {
            title: "ETF Funds",
            desc: "Exchange-traded funds offering low costs and high liquidity.",
            icon: Zap,
            color: "text-yellow-600",
            bg: "bg-yellow-50"
        }
    ];

    const benefits = [
        { title: "Expert Management", desc: "Your money is managed by experienced professionals.", icon: Users },
        { title: "Diversification", desc: "Reduce risk by investing across various sectors and companies.", icon: PieChart },
        { title: "Liquidity", desc: "Withdraw your money easily whenever you need it.", icon: Banknote },
        { title: "Transparency", desc: "Complete visibility into where your money is invested.", icon: Search }
    ];

    const steps = [
        { title: "Register & KYC", desc: "Complete your simple one-time registration.", icon: UserPlus },
        { title: "Select Fund", desc: "Choose from our wide range of curated funds.", icon: Search },
        { title: "Invest", desc: "Start with as low as ₹500 via SIP or Lumpsum.", icon: Zap },
        { title: "Track Growth", desc: "Monitor your portfolio performance in real-time.", icon: LineChart }
    ];

    // Combined all NFOs from your prompt
    const nfos = [
        { name: "Mirae Asset Defence ETF", type: "Equity", launchDate: "02 Feb 2026", closeDate: "16 Feb 2026", minInvestment: "₹500", desc: "Invests in India's defence sector via BSE India Defence ETF.", badge: "Open", logo: "/MF/mirae.png" },
        { name: "HDFC Nifty 100", type: "Equity Index", launchDate: "15 Feb 2026", closeDate: "29 Feb 2026", minInvestment: "₹5,000", desc: "Aims to track the Nifty 100 Index returns.", badge: "NEW", logo: "/MF/hdfc.png" },
        { name: "SBI Multicap Fund", type: "Multicap", launchDate: "01 Mar 2026", closeDate: "15 Mar 2026", minInvestment: "₹5,000", desc: "Invests across large, mid, and small cap stocks.", badge: "NEW", logo: "/MF/sbi.png" },
        { name: "Kotak Services Fund", type: "Equity", launchDate: "04 Feb 2026", closeDate: "18 Feb 2026", minInvestment: "₹500", desc: "Aims to invest in service sector companies.", badge: "Open", logo: "/MF/kotak.png" },
        { name: "UTI Nifty500 Shariah", type: "Equity", launchDate: "05 Feb 2026", closeDate: "18 Feb 2026", minInvestment: "₹500", desc: "Tracks the Nifty500 Shariah Index.", badge: "Open", logo: "/MF/uti.webp" },
        { name: "Angel One Silver ETF", type: "Commodities", launchDate: "09 Feb 2026", closeDate: "23 Feb 2026", minInvestment: "₹500", desc: "Invests in Silver ETF. High Risk.", badge: "Open", logo: "/MF/angel.png" },
        { name: "HDFC India Consumption", type: "Equity", launchDate: "04 Feb 2026", closeDate: "13 Feb 2026", minInvestment: "₹500", desc: "Tracks the Nifty India Consumption Index.", badge: "Open", logo: "/MF/hdfc.png" },
        { name: "Bajaj Low Duration", type: "Debt", launchDate: "09 Feb 2026", closeDate: "16 Feb 2026", minInvestment: "₹500", desc: "Low duration debt fund. Moderate Risk.", badge: "Open", logo: "/MF/bajaj.webp" }
    ];

    const faqs = [
        { q: "What is a mutual fund, and how does it work?", a: "A mutual fund pools money from many investors to buy a diversified portfolio of stocks, bonds, or other assets. It's managed by professional fund managers, giving you instant diversification." },
        { q: "What makes your fund's philosophy different?", a: "Our \"Quality-At-Reasonable-Price\" (QARP) philosophy is core. We systematically invest in financially healthy companies with durable competitive advantages." },
        { q: "How do you manage risk beyond volatility?", a: "We look beyond price volatility (beta). Our risk management focuses on portfolio durability, including stress-testing against economic downturns." },
        { q: "Is my money safe and easily accessible?", a: "Mutual funds are regulated, and assets are held separately with a custodian bank. Open-ended funds allow you to redeem units on any business day." }
    ];

    return (
        <div className="min-h-screen bg-gray-50 font-sans text-slate-800">
            {/* HERO SECTION */}
            <header className="relative w-full overflow-hidden pt-28 pb-20 bg-gradient-to-b from-[#e1f0ff] via-[#f7faff] to-white">
                <div className="container mx-auto px-6 relative z-10">
                    <div className="flex flex-col lg:flex-row items-center gap-12">
                        {/* LEFT HERO TEXT */}
                        <div className="w-full lg:w-1/2 text-left space-y-8">
                            <motion.h1
                                initial={{ opacity: 0, y: 30 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: 0.3, duration: 0.7 }}
                                className="text-5xl md:text-6xl font-bold bg-linear-to-r from-[#2076C7] to-[#1CADA3] bg-clip-text text-transparent">
                                Grow Your Wealth with Expert Mutual Funds
                            </motion.h1>
                            <motion.p
                                initial={{ opacity: 0, y: 30 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: 0.4, duration: 0.7 }}
                                className="text-lg md:text-xl text-slate-700 max-w-2xl leading-relaxed font-normal">
                                Start your journey towards financial freedom with our curated selection of top-performing funds and expert guidance.
                            </motion.p>
                            <motion.div
                                initial={{ opacity: 0, y: 30 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: 0.5, duration: 0.7 }}
                                className="flex flex-wrap gap-4 pt-4">
                                <Link href="/product/mutual-funds/register">
                                    <button className="px-8 py-3.5 text-base font-semibold text-white bg-gradient-to-r from-[#2076C7] to-[#1CADA3] rounded-full shadow-md hover:shadow-lg transition-all duration-300">
                                        Start Investing
                                    </button>
                                </Link>
                                <Link href="#categories">
                                    <button className="px-8 py-3.5 text-base font-semibold text-slate-700 bg-white border border-gray-200 rounded-full hover:bg-gray-50 hover:border-gray-300 transition-all duration-300">
                                        Explore Funds
                                    </button>
                                </Link>
                            </motion.div>
                            <motion.div
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                transition={{ delay: 0.8 }}
                                className="flex items-center gap-6 pt-4 text-sm text-slate-600 font-medium">
                                <div className="flex items-center gap-2">
                                    <CheckCircle className="w-5 h-5 text-green-500" /> 0% Commission
                                </div>
                                <div className="flex items-center gap-2">
                                    <CheckCircle className="w-5 h-5 text-green-500" /> Paperless & Secure
                                </div>
                            </motion.div>
                        </div>
                        {/* RIGHT HERO: HDFC NFO CARD */}
                        <motion.div
                            initial={{ opacity: 0, scale: 0.95 }}
                            animate={{ opacity: 1, scale: 1 }}
                            transition={{ duration: 0.8, ease: "easeOut" }}
                            className="w-full lg:w-1/2 flex items-center justify-center">
                            <div className="h-full bg-white rounded-2xl shadow-sm border border-gray-100 hover:shadow-lg hover:border-blue-100 transition-all duration-300 overflow-hidden group w-full max-w-md">
                                <div className="bg-gradient-to-r from-blue-50 to-teal-50 p-4 border-b border-gray-100 flex items-start justify-between">
                                    <div className="flex items-center gap-2">
                                        <img src="/MF/hdfc.png" alt="HDFC Nifty 100 Logo" className="w-8 h-8 object-contain rounded bg-white" style={{ background: '#fff' }} />
                                        <div>
                                            <h3 className="text-lg font-semibold text-slate-800 group-hover:text-[#2076C7] transition-colors">HDFC Nifty 100</h3>
                                            <p className="text-sm text-slate-600 mt-1">Equity Index Fund</p>
                                        </div>
                                    </div>
                                    <span className="inline-block bg-amber-100 text-amber-700 text-xs font-bold px-3 py-1 rounded-full whitespace-nowrap">NEW</span>
                                </div>
                                <div className="p-6 space-y-4">
                                    <p className="text-sm text-slate-600">Aims to track the Nifty 100 Index returns.</p>
                                    <div className="space-y-3 pt-2 text-sm">
                                        <div className="flex justify-between"><span className="text-slate-600">Launch</span><span className="font-semibold text-slate-800">15 Feb 2026</span></div>
                                        <div className="flex justify-between"><span className="text-slate-600">Closing</span><span className="font-semibold text-red-500">29 Feb 2026</span></div>
                                        <div className="flex justify-between"><span className="text-slate-600">Min Inv.</span><span className="font-semibold text-slate-800">₹5,000</span></div>
                                    </div>
                                    <button className="w-full mt-2 px-6 py-2 text-white bg-gradient-to-r from-[#2076C7] to-[#1CADA3] rounded-full font-semibold shadow-md hover:shadow-lg transition-all">Apply Now</button>
                                </div>
                            </div>
                        </motion.div>
                    </div>
                </div>
            </header>

            <main className="container mx-auto px-6 py-16 space-y-24">
                {/* CATEGORIES SECTION */}
                <motion.section id="categories" initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-100px" }} variants={staggerContainer}>
                    <div className="text-center mb-16">
                        <motion.h2  className="text-3xl md:text-4xl font-bold font-sans bg-linear-to-r from-[#2076C7] to-[#1CADA3] bg-clip-text text-transparent mb-4">Explore Fund Categories</motion.h2>
                        <motion.p  className="text-lg text-slate-600 max-w-2xl mx-auto font-light">Find the perfect fund to match your investment goals and risk profile.</motion.p>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                        {categories.map((cat, idx) => (
                            <motion.div key={idx}  whileHover="hover" initial="rest" animate="rest">
                                <motion.div variants={cardHover} className="h-full bg-white p-8 rounded-2xl shadow-sm border border-gray-100 hover:shadow-lg transition-all duration-300 group cursor-pointer">
                                    <div className={`w-14 h-14 ${cat.bg} rounded-xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform`}>
                                        <cat.icon className={`w-7 h-7 ${cat.color}`} />
                                    </div>
                                    <h3 className="text-xl font-medium text-slate-800 mb-3 group-hover:text-[#2076C7] transition-colors">{cat.title}</h3>
                                    <p className="text-slate-600 leading-relaxed text-sm">{cat.desc}</p>
                                </motion.div>
                            </motion.div>
                        ))}
                    </div>
                </motion.section>

                {/* CHART SECTION */}
                <motion.section initial="hidden" whileInView="visible" viewport={{ once: true }}  className="bg-white rounded-3xl p-8 md:p-12 border border-gray-100 shadow-sm">
                    <div className="text-center mb-12">
                        <h2 className="text-3xl md:text-4xl font-bold font-sans bg-linear-to-r from-[#2076C7] to-[#1CADA3] bg-clip-text text-transparent mb-4">Fund Types: Growth & Tax Benefit</h2>
                        <p className="text-lg text-slate-600 max-w-2xl mx-auto font-light">Compare unique selling points of each fund type.</p>
                    </div>
                    <div className="w-full h-96">
                        <Bar 
                            data={{
                                labels: ["Equity", "Debt", "Hybrid", "ELSS", "Index", "Global", "ETF"],
                                datasets: [
                                    { label: "Growth", data: [5, 2, 3, 4, 4, 4, 3], backgroundColor: "#2076C7", borderRadius: 8 },
                                    { label: "Tax Benefit", data: [2, 2, 2, 5, 2, 2, 2], backgroundColor: "#1CADA3", borderRadius: 8 }
                                ]
                            }}
                            options={{ responsive: true, maintainAspectRatio: false, plugins: { legend: { position: 'top' } } }}
                        />
                    </div>
                </motion.section>

                {/* WHY CHOOSE US */}
                <motion.section initial="hidden" whileInView="visible" viewport={{ once: true }} variants={staggerContainer} className="bg-gradient-to-b from-gray-50 to-white rounded-3xl p-8 md:p-12 border border-gray-100">
                    <div className="flex flex-col md:flex-row items-center justify-between gap-12">
                        <div className="w-full md:w-5/12">
                            <motion.span  className="text-[#2076C7] font-medium tracking-wider text-sm uppercase mb-2 block">Why Choose Us</motion.span>
                            <motion.h2  className="text-3xl md:text-4xl font-bold font-sans bg-linear-to-r from-[#2076C7] to-[#1CADA3] bg-clip-text text-transparent mb-6 leading-tight">Smart Investing for a Secure Future</motion.h2>
                            <motion.p  className="text-lg text-slate-600 mb-8 font-light">We combine technology with financial expertise to help you build and manage your wealth effectively.</motion.p>
                        </div>
                        <div className="w-full md:w-6/12 grid grid-cols-1 sm:grid-cols-2 gap-6">
                            {benefits.map((benefit, idx) => (
                                <motion.div key={idx}  className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
                                    <benefit.icon className="w-8 h-8 text-[#1CADA3] mb-4" />
                                    <h4 className="text-lg font-medium text-slate-800 mb-2">{benefit.title}</h4>
                                    <p className="text-sm text-slate-600">{benefit.desc}</p>
                                </motion.div>
                            ))}
                        </div>
                    </div>
                </motion.section>

                {/* NFO SECTION */}
                <motion.section initial="hidden" whileInView="visible" viewport={{ once: true }} variants={staggerContainer}>
                    <div className="text-center mb-16">
                        <motion.div  className="flex justify-center mb-4">
                            <div className="inline-flex items-center gap-2 bg-amber-50 border border-amber-200 px-4 py-2 rounded-full">
                                <Sparkles className="w-4 h-4 text-amber-600" />
                                <span className="text-xs font-semibold text-amber-700">UPCOMING NFOs</span>
                            </div>
                        </motion.div>
                        <motion.h2  className="text-3xl md:text-4xl font-bold font-sans bg-linear-to-r from-[#2076C7] to-[#1CADA3] bg-clip-text text-transparent mb-4">New Fund Offers Coming Soon</motion.h2>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                        {nfos.map((nfo, idx) => (
                            <motion.div key={idx}  whileHover="hover" initial="rest" animate="rest">
                                <motion.div variants={cardHover} className="h-full bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden group">
                                    <div className="bg-gradient-to-r from-blue-50 to-teal-50 p-4 border-b border-gray-100 flex items-start justify-between">
                                        <div className="flex items-center gap-2">
                                            {nfo.logo && (
                                                <img
                                                    src={nfo.logo}
                                                    alt={nfo.name + ' logo'}
                                                    className="w-8 h-8 object-contain rounded bg-white"
                                                    style={{ background: '#fff' }}
                                                />
                                            )}
                                            <div>
                                                <h3 className="text-lg font-semibold text-slate-800 group-hover:text-[#2076C7] transition-colors">{nfo.name}</h3>
                                                <p className="text-sm text-slate-600 mt-1">{nfo.type}</p>
                                            </div>
                                        </div>
                                        <span className="bg-amber-100 text-amber-700 text-[10px] font-bold px-2 py-1 rounded-full whitespace-nowrap">{nfo.badge}</span>
                                    </div>
                                    <div className="p-6 space-y-4">
                                        <p className="text-sm text-slate-600">{nfo.desc}</p>
                                        <div className="space-y-3 pt-2 text-sm">
                                            <div className="flex justify-between"><span className="text-slate-600">Launch</span><span className="font-semibold text-slate-800">{nfo.launchDate}</span></div>
                                            <div className="flex justify-between"><span className="text-slate-600">Closing</span><span className="font-semibold text-red-500">{nfo.closeDate}</span></div>
                                            <div className="flex justify-between"><span className="text-slate-600">Min Inv.</span><span className="font-semibold text-slate-800">{nfo.minInvestment}</span></div>
                                        </div>
                                    </div>
                                </motion.div>
                            </motion.div>
                        ))}
                    </div>
                </motion.section>

                {/* FAQ SECTION */}
                <motion.section initial="hidden" whileInView="visible" viewport={{ once: true }} variants={staggerContainer}>
                    <div className="text-center mb-16">
                        <motion.h2  className="text-3xl md:text-4xl font-bold font-sans bg-linear-to-r from-[#2076C7] to-[#1CADA3] bg-clip-text text-transparent mb-4">Frequently Asked Questions</motion.h2>
                    </div>
                    <div className="max-w-3xl mx-auto space-y-4">
                        {faqs.map((faq, idx) => (
                            <motion.div key={idx}  className="bg-white rounded-xl border border-gray-200 overflow-hidden">
                                <button onClick={() => setExpandedIdx(expandedIdx === idx ? null : idx)} className="w-full px-6 py-4 flex items-start justify-between hover:bg-gray-50 transition-colors group">
                                    <h3 className="text-lg font-medium text-slate-800 group-hover:text-[#2076C7] transition-colors text-left">{faq.q}</h3>
                                    <ChevronDown className={`w-5 h-5 text-gray-400 transition-transform ${expandedIdx === idx ? 'rotate-180' : ''}`} />
                                </button>
                                <AnimatePresence>
                                    {expandedIdx === idx && (
                                        <motion.div initial={{ height: 0 }} animate={{ height: "auto" }} exit={{ height: 0 }} className="overflow-hidden">
                                            <div className="px-6 py-4 bg-gray-50 border-t border-gray-100 text-slate-600 leading-relaxed">{faq.a}</div>
                                        </motion.div>
                                    )}
                                </AnimatePresence>
                            </motion.div>
                        ))}
                    </div>
                </motion.section>

                {/* CTA SECTION */}
                <motion.section initial="hidden" whileInView="visible" viewport={{ once: true }}  className="mb-16">
                    <div className="relative overflow-hidden bg-gradient-to-r from-[#2076C7] to-[#1CADA3] rounded-3xl p-10 md:p-16 text-center shadow-xl text-white">
                        <h2 className="text-3xl md:text-5xl font-medium text-white mb-6 tracking-tight">Ready to Grow Your Wealth?</h2>
                        <p className="text-blue-50 text-lg md:text-xl mb-10 max-w-2xl mx-auto opacity-90 font-light">Join thousands of investors who trust us with their financial future. Start your SIP today.</p>
                        <div className="flex flex-col sm:flex-row gap-4 justify-center">
                            <button className="px-8 py-4 text-[#2076C7] bg-white rounded-xl shadow-lg font-medium hover:bg-gray-50 transition-all">Open Free Account</button>
                            <button className="px-8 py-4 border border-white/30 bg-white/10 backdrop-blur-sm rounded-xl font-medium hover:bg-white/20 transition-all">Talk to an Expert</button>
                        </div>
                    </div>
                </motion.section>
            </main>
        </div>
    );
}