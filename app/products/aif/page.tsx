"use client";

import React, { useState, useEffect, Suspense } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import {
    TrendingUp, PieChart, ShieldCheck, ArrowRight, BarChart, Zap, ArrowLeft, Plus, Minus, Search, Filter
} from 'lucide-react';
import { motion, Variants, useMotionValue, useTransform, AnimatePresence } from 'framer-motion';

// Components
import AIF_Category_Performance from './components/AIF_Category_Performance';
import AIFDetailModal from './components/AIFDetailModal';
import { useModal } from '../../context/ModalContext';
import AIFComparisonGraph from './components/AIFComparisonGraph';
import CTASection from '@/app/component/CTASection';
import ChatBot from '@/app/component/chatbot/page';
import ScrollToTop from '@/app/component/ScrollToTop';

// Data
import { aifStrategies, aifComparisonData, aifFaqs, aifFloatingTags } from './data/aif_funds';

const AIFHeaderRecommended = () => {
    return (
        <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            whileHover={{ y: -5 }}
            className="mb-8 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 -mt-8 relative z-30"
        >
            <div className="bg-white/80 backdrop-blur-md rounded-2xl p-8 border border-gray-100 shadow-xl overflow-hidden relative group">
                <div className="absolute top-0 right-0 w-64 h-64 bg-primary/20 rounded-full -mr-32 -mt-32 transition-transform duration-1000 group-hover:scale-150 blur-3xl opacity-20" />
                <div className="flex flex-col lg:flex-row lg:items-center justify-between relative z-10">
                    <div className="lg:w-full">
                        <div className="flex items-center mb-4">
                            <div className="w-10 h-10 bg-[#2076C7]/10 text-[#2076C7] rounded-xl flex items-center justify-center mr-4 shadow-sm">
                                <BarChart className="w-6 h-6" />
                            </div>
                            <h1 className="text-xl md:text-3xl font-bold text-gray-900">
                                Alternative Investment Funds (AIF)
                            </h1>
                        </div>
                        <p className="text-gray-500 text-lg leading-relaxed max-w-3xl">
                            SEBI-registered private investment vehicles for sophisticated investors.
                            <span className="text-[#2076C7] font-bold"> Minimum investment ₹1 crore.</span> Diversified, strategy-driven funds with institutional-grade risk management.
                        </p>
                    </div>
                </div>
            </div>
        </motion.div>
    );
};

const AIFHeroVisual = () => {
    // const [mounted, setMounted] = useState(false);
    const mouseX = useMotionValue(0);
    const mouseY = useMotionValue(0);
    const rotateX = useTransform(mouseY, [-300, 300], [5, -5]);
    const rotateY = useTransform(mouseX, [-300, 300], [-5, 5]);

    // useEffect(() => {
    //     setMounted(true);
    // }, []);

    return (
        <div
            className="relative w-full h-[450px] lg:h-[450px] flex items-center justify-center overflow-hidden scale-75 md:scale-90 lg:scale-100">
            <div className="absolute inset-0 opacity-30">
                <svg width="100%" height="100%" className="absolute inset-0">
                    <defs>
                        <pattern id="aif-grid" width="50" height="50" patternUnits="userSpaceOnUse">
                            <path d="M 50 0 L 0 0 0 50" fill="none" stroke="#2076C7" strokeWidth="0.3" opacity="0.3" />
                        </pattern>
                    </defs>
                    <rect width="100%" height="100%" fill="url(#aif-grid)" />
                </svg>
            </div>

            {[...Array(4)].map((_, i) => (
                <div
                    key={i}
                    className="absolute rounded-full blur-[80px]"
                    style={{
                        width: `${200 + i * 60}px`,
                        height: `${200 + i * 60}px`,
                        background: i % 2 === 0
                            ? 'radial-gradient(circle, rgba(28,173,163,0.15) 0%, transparent 70%)'
                            : 'radial-gradient(circle, rgba(32,118,199,0.15) 0%, transparent 70%)',
                        left: `${10 + i * 15}%`,
                        top: `${5 + i * 20}%`
                    }}
                />
            ))}

            <div
                className="relative z-20 w-64 h-64">
                <div className="relative w-full h-full perspective-1000">
                    <div
                        className="w-full h-full relative preserve-3d">
                        <div className="absolute inset-0 bg-gradient-to-br from-primary/10 to-teal-400/10 rounded-[2.5rem] blur-md" />
                        <div className="absolute inset-0 bg-white/40 backdrop-blur-2xl border border-white/60 shadow-xl rounded-[2.5rem] flex items-center justify-center overflow-hidden group">
                            <div className="absolute inset-0 bg-gradient-to-tr from-primary/10 via-transparent to-teal-400/10 animate-pulse" />
                            <div className="relative z-10 flex flex-col items-center">
                                <div
                                    className="w-20 h-20 bg-gradient-to-br from-white to-blue-50 rounded-2xl flex items-center justify-center shadow-lg border border-blue-100 mb-3">
                                    <ShieldCheck className="text-[#1CADA3] w-10 h-10 drop-shadow-sm" />
                                </div>
                                <div className="h-px w-16 bg-gradient-to-r from-transparent via-primary/50 to-transparent my-2" />
                                <span className="text-teal-600 font-bold text-xs tracking-[0.3em]">
                                    AIF PLATFORM
                                </span>
                            </div>
                        </div>
                    </div>
                </div>

                {aifFloatingTags.map((tag, i) => (
                    <div
                        key={i}
                        className={`absolute ${tag.pos} z-30`}>
                        <div className="relative group">
                            <div
                                className="absolute inset-0 rounded-full blur-md opacity-30 group-hover:opacity-50 transition-opacity"
                                style={{ background: tag.color }}
                            />
                            <div className="relative bg-white/90 backdrop-blur-xl px-3 py-2 rounded-full border border-gray-100 flex items-center gap-2 shadow-xl hover:scale-110 transition-transform">
                                <tag.icon size={12} style={{ color: tag.color }} />
                                <span className="text-gray-700 text-[9px] font-bold tracking-widest whitespace-nowrap">
                                    {tag.label}
                                </span>
                            </div>
                        </div>
                    </div>
                ))}
            </div>

            <div className="absolute w-[400px] h-[400px] border border-primary/10 rounded-full opacity-30" />
            <div className="absolute w-[550px] h-[550px] border border-primary/5 rounded-full opacity-40" />
        </div>
    );
};

const AIFProductsContent = () => {
    const [openFaq, setOpenFaq] = useState<number | null>(null);
    const [isDetailModalOpen, setIsDetailModalOpen] = useState(false);
    const { openSignup, openLogin } = useModal();
    const [selectedFund, setSelectedFund] = useState<any>(null);

    // Back Button State & Navigation
    const router = useRouter();
    const [showBackButton, setShowBackButton] = useState(true);

    useEffect(() => {
        const handleScroll = () => setShowBackButton(window.scrollY < 80);
        window.addEventListener('scroll', handleScroll, { passive: true });
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    const handleBackToOffers = () => router.push('/#services');

    // Filtering State
    const [searchQuery, setSearchQuery] = useState("");
    const [selectedCategory, setSelectedCategory] = useState("All");

    const categories = ["All", "Category I", "Category II", "Category III"];

    const filteredStrategies = React.useMemo(() => {
        return aifStrategies.filter(fund => {
            const matchesSearch = fund.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                fund.manager.toLowerCase().includes(searchQuery.toLowerCase()) ||
                fund.theme.toLowerCase().includes(searchQuery.toLowerCase());

            const matchesCategory = selectedCategory === "All" || fund.category === selectedCategory;

            return matchesSearch && matchesCategory;
        });
    }, [searchQuery, selectedCategory]);

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
                key="aif-content"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.4 }}
            >
                {/* AIF Hero Section */}
                <section className="relative py-20 lg:py-28 overflow-hidden bg-white">
                    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
                        <div className="grid lg:grid-cols-2 gap-12 items-center text-center lg:text-left">
                            <div className="max-w-4xl lg:max-w-none mx-auto lg:mx-0">
                                <div className="mb-6 flex flex-wrap items-center justify-center lg:justify-start gap-4">
                                    <div className="bg-[#1CADA3]/10 text-[#1CADA3] px-4 py-1.5 rounded-full text-xs font-bold uppercase tracking-widest">
                                        Advanced Investments
                                    </div>
                                </div>

                                <motion.h1
                                    initial={{ opacity: 0, y: 20 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ duration: 0.5, delay: 0.1 }}
                                    className="text-5xl md:text-6xl lg:text-7xl font-bold font-sans bg-gradient-to-r from-[#2076C7] to-[#1CADA3] bg-clip-text text-transparent leading-[1.1] mb-6 tracking-tight"
                                >
                                    Strategic Wealth <br className="hidden sm:block" />
                                    Creation via <br className="hidden sm:block" />
                                    <span className="text-[#2076C7]">Alternative Investment Funds</span>
                                </motion.h1>

                                <motion.p
                                    initial={{ opacity: 0, y: 20 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ duration: 0.5, delay: 0.2 }}
                                    className="text-lg md:text-xl lg:text-2xl text-gray-600 max-w-2xl mx-auto leading-relaxed mb-10"
                                >
                                    Exclusive alternative investment opportunities for sophisticated portfolios.
                                </motion.p>

                                <motion.div
                                    initial={{ opacity: 0, y: 20 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ duration: 0.5, delay: 0.3 }}
                                >
                                    <button
                                        onClick={() => openLogin()}
                                        className="group relative inline-flex items-center gap-2 px-8 py-4 rounded-lg font-semibold text-white shadow-lg text-lg bg-gradient-to-r from-[#1CADA3] to-[#2076C7] hover:shadow-xl transform hover:-translate-y-1 transition-all duration-300 cursor-pointer"
                                    >
                                        Apply Now
                                        <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                                    </button>
                                </motion.div>
                            </div>

                            <motion.div
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                transition={{ duration: 1, delay: 0.2 }}
                                className="relative h-[300px] md:h-[400px] lg:h-[450px] w-full block order-last lg:order-none"
                            >
                                <AIFHeroVisual />
                            </motion.div>
                        </div>
                    </div>
                </section>

                <AIFHeaderRecommended />

                {/* AIF Category Cards */}
                <section className="py-8 md:py-12 bg-white z-20">
                    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
                        <div className="grid md:grid-cols-3 gap-5">
                            {[
                                {
                                    title: "Category I",
                                    desc: "Development-focused funds investing in startups, SMEs, and infrastructure projects.",
                                    icon: <TrendingUp className="w-6 h-6 text-[#2076C7]" />,
                                    color: "border-l-4 border-[#2076C7]"
                                },
                                {
                                    title: "Category II",
                                    desc: "Growth, private equity, and credit-oriented funds with structured investment approaches.",
                                    icon: <PieChart className="w-6 h-6 text-[#1CADA3]" />,
                                    color: "border-l-4 border-[#1CADA3]"
                                },
                                {
                                    title: "Category III",
                                    desc: "Market-linked strategies using long-short and leveraged positions for enhanced return potential.",
                                    icon: <Zap className="w-6 h-6 text-gray-400" />,
                                    color: ""
                                }
                            ].map((cat, idx) => (
                                <motion.div
                                    key={idx}
                                    initial={{ opacity: 0, y: 20 }}
                                    whileInView={{ opacity: 1, y: 0 }}
                                    whileHover={{
                                        scale: 1.03,
                                        y: -8,
                                        boxShadow: "0 20px 25px -5px rgb(0 0 0 / 0.1), 0 8px 10px -6px rgb(0 0 0 / 0.1)"
                                    }}
                                    viewport={{ once: true }}
                                    transition={{ delay: idx * 0.1 }}
                                    className={`bg-white p-5 rounded-xl shadow-lg border border-gray-100 transition-all duration-300 ${cat.color} group relative overflow-hidden`}
                                >
                                    <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                                    <div className="relative z-10">
                                        <div className="mb-2 bg-gray-50 w-12 h-12 rounded-lg flex items-center justify-center group-hover:bg-white group-hover:shadow-inner transition-all duration-300">
                                            {cat.icon}
                                        </div>
                                        <h3 className="text-lg font-bold text-gray-800 mb-1 group-hover:text-[#2076C7] transition-colors">{cat.title}</h3>
                                        <p className="text-gray-600 leading-tight text-xs">
                                            {cat.desc}
                                        </p>
                                    </div>
                                </motion.div>
                            ))}
                        </div>
                    </div>
                </section>

                {/* Content Section */}
                <section className="py-12 bg-neutral-50 text-gray-700">
                    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                        <motion.div initial="hidden" whileInView="visible" variants={staggerContainer} className="text-center mb-12">
                            <motion.h2 variants={slideUpFade} className="text-3xl md:text-4xl font-extrabold font-sans mb-3 bg-linear-to-r from-[#2076C7] to-[#1CADA3] bg-clip-text text-transparent drop-shadow-sm">
                                AIF Strategies & Approaches
                            </motion.h2>
                            <motion.p variants={slideUpFade} className="text-xl text-gray-500 max-w-3xl mx-auto font-light">
                                Exclusive alternative investment opportunities for enhanced portfolio diversification.
                            </motion.p>
                        </motion.div>

                        {/* Search and Filter UI */}
                        <div className="mb-12 flex flex-col md:flex-row items-center justify-between gap-6">
                            <div className="relative w-full md:max-w-md group">
                                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                                    <Search className="h-5 w-5 text-gray-400 group-focus-within:text-[#2076C7] transition-colors" />
                                </div>
                                <input
                                    type="text"
                                    placeholder="Search by fund name, manager, or theme..."
                                    className="block w-full pl-11 pr-4 py-4 bg-white border border-gray-200 rounded-2xl text-gray-700 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all shadow-sm hover:shadow-md"
                                    value={searchQuery}
                                    onChange={(e) => setSearchQuery(e.target.value)}
                                />
                            </div>

                            <div className="flex flex-wrap items-center gap-3 w-full md:w-auto overflow-x-auto pb-2 md:pb-0 scrollbar-hide">
                                <div className="flex items-center gap-2 mr-2 text-gray-500 font-bold text-xs uppercase tracking-widest bg-gray-100 px-3 py-2 rounded-lg">
                                    <Filter size={14} />
                                    <span>Filter:</span>
                                </div>
                                {categories.map((cat) => (
                                    <button
                                        key={cat}
                                        onClick={() => setSelectedCategory(cat)}
                                        className={`px-6 py-2.5 rounded-xl text-sm font-bold transition-all whitespace-nowrap ${selectedCategory === cat
                                            ? 'bg-gradient-to-r from-[#1CADA3] to-[#2076C7] text-white shadow-lg'
                                            : 'bg-white text-gray-600 border border-gray-100 hover:border-[#1CADA3]/30 hover:bg-teal-50 hover:text-[#1CADA3]'
                                            }`}
                                    >
                                        {cat}
                                    </button>
                                ))}
                            </div>
                        </div>

                        <div className="flex flex-col gap-4 md:max-h-[800px] md:overflow-y-auto md:pr-2 md:custom-scrollbar">
                            <AnimatePresence>
                                {filteredStrategies.length > 0 ? (
                                    filteredStrategies.map((fund, idx) => (
                                        <motion.div
                                            key={fund.name}
                                            layout
                                            initial={{ opacity: 0 }}
                                            animate={{ opacity: 1 }}
                                            exit={{ opacity: 0 }}
                                            transition={{ duration: 0.3 }}
                                            className="w-full"
                                        >
                                            {fund.slug ? (
                                                <Link href={`/products/aif/${fund.slug}`} className="block w-full">
                                                    <motion.div
                                                        whileHover={{ scale: 1.01 }}
                                                        className="bg-white rounded-2xl shadow-sm border border-gray-100 hover:shadow-lg transition-all duration-300 relative overflow-hidden group"
                                                    >
                                                        {/* Colour bar */}
                                                        <div className="absolute left-0 top-0 bottom-0 w-1.5 rounded-l-2xl" style={{ backgroundColor: fund.color }} />

                                                        <div className="pl-6 pr-4 py-4 sm:py-5 flex flex-col sm:flex-row sm:items-center gap-3 sm:gap-4">
                                                            {/* Name & tags */}
                                                            <div className="flex-1 min-w-0">
                                                                <h3 className="text-base sm:text-lg font-bold text-gray-700 mb-1.5 group-hover:text-[#2076C7] transition-colors leading-snug">{fund.name}</h3>
                                                                <div className="flex flex-wrap gap-1.5">
                                                                    <span className="px-2 py-0.5 bg-[#1CADA3]/10 text-[#1CADA3] rounded text-[10px] font-bold uppercase tracking-wider">{fund.category}</span>
                                                                    <span className="px-2 py-0.5 bg-[#2076C7]/10 text-[#2076C7] rounded text-[10px] font-bold uppercase tracking-wider">{fund.theme}</span>
                                                                </div>
                                                            </div>

                                                            {/* Manager info — shown on lg only */}
                                                            <div className="hidden lg:block flex-[2] text-gray-500 text-sm border-l border-gray-100 pl-5 min-w-0">
                                                                <p className="line-clamp-1"><span className="font-semibold text-gray-700">Manager:</span> {fund.manager}</p>
                                                                <p className="text-gray-400 text-xs italic line-clamp-2 mt-0.5">{fund.desc}</p>
                                                            </div>

                                                            {/* CTA */}
                                                            <div className="flex items-center justify-between sm:justify-end gap-3 shrink-0 pt-3 sm:pt-0 border-t sm:border-none border-gray-100">
                                                                <span className="text-xs font-bold text-[#2076C7] uppercase tracking-wider">View Page</span>
                                                                <div className="p-2 rounded-xl bg-slate-50 text-slate-400 group-hover:bg-[#2076C7] group-hover:text-white transition-all shadow-sm">
                                                                    <ArrowRight size={16} />
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </motion.div>
                                                </Link>
                                            ) : (
                                                <div
                                                    className="block cursor-pointer w-full"
                                                    onClick={() => {
                                                        if (fund.details) {
                                                            setSelectedFund(fund);
                                                            setIsDetailModalOpen(true);
                                                        }
                                                    }}
                                                >
                                                    <motion.div
                                                        whileHover={{ scale: 1.01 }}
                                                        className="bg-white rounded-2xl shadow-sm border border-gray-100 hover:shadow-lg transition-all duration-300 relative overflow-hidden group"
                                                    >
                                                        {/* Colour bar */}
                                                        <div className="absolute left-0 top-0 bottom-0 w-1.5 rounded-l-2xl" style={{ backgroundColor: fund.color }} />

                                                        <div className="pl-6 pr-4 py-4 sm:py-5 flex flex-col sm:flex-row sm:items-center gap-3 sm:gap-4">
                                                            {/* Name & tags */}
                                                            <div className="flex-1 min-w-0">
                                                                <h3 className="text-base sm:text-lg font-bold text-gray-700 mb-1.5 group-hover:text-[#2076C7] transition-colors leading-snug">{fund.name}</h3>
                                                                <div className="flex flex-wrap gap-1.5">
                                                                    <span className="px-2 py-0.5 bg-[#1CADA3]/10 text-[#1CADA3] rounded text-[10px] font-bold uppercase tracking-wider">{fund.category}</span>
                                                                    <span className="px-2 py-0.5 bg-[#2076C7]/10 text-[#2076C7] rounded text-[10px] font-bold uppercase tracking-wider">{fund.theme}</span>
                                                                </div>
                                                            </div>

                                                            {/* Manager info — shown on lg only */}
                                                            <div className="hidden lg:block flex-[2] text-gray-500 text-sm border-l border-gray-100 pl-5 min-w-0">
                                                                <p className="line-clamp-1"><span className="font-semibold text-gray-700">Manager:</span> {fund.manager}</p>
                                                                <p className="text-gray-400 text-xs italic line-clamp-2 mt-0.5">{fund.desc}</p>
                                                            </div>

                                                            {/* CTA */}
                                                            <div className="flex items-center justify-between sm:justify-end gap-3 shrink-0 pt-3 sm:pt-0 border-t sm:border-none border-gray-100">
                                                                <span className="text-xs font-bold text-[#2076C7] uppercase tracking-wider">View Details</span>
                                                                <div className="p-2 rounded-xl bg-slate-50 text-slate-400 group-hover:bg-[#2076C7] group-hover:text-white transition-all shadow-sm">
                                                                    <ArrowRight size={16} />
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </motion.div>
                                                </div>
                                            )}

                                        </motion.div>
                                    ))
                                ) : (
                                    <motion.div
                                        initial={{ opacity: 0 }}
                                        animate={{ opacity: 1 }}
                                        className="py-20 text-center bg-white rounded-3xl border border-dashed border-gray-300">
                                        <div className="inline-flex items-center justify-center w-20 h-20 bg-gray-50 rounded-full mb-4">
                                            <Search className="w-10 h-10 text-gray-300" />
                                        </div>
                                        <h4 className="text-xl font-bold text-gray-700 mb-2">No matching funds found</h4>
                                        <p className="text-gray-500">Try adjusting your filters or search query to find what you&apos;re looking for.</p>
                                        <button
                                            onClick={() => {
                                                setSearchQuery("");
                                                setSelectedCategory("All");
                                            }}
                                            className="mt-6 font-bold text-[#2076C7] hover:underline">
                                            Clear all filters
                                        </button>
                                    </motion.div>
                                )}
                            </AnimatePresence>
                        </div>
                    </div>
                </section>

                {/* Strategy Comparison Table */}
                <section className="py-12 bg-white">
                    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                        <motion.div initial="hidden" whileInView="visible" variants={staggerContainer} viewport={{ once: true }} className="text-center mb-16">
                            <motion.h2 variants={slideUpFade} className="text-3xl md:text-4xl font-extrabold font-sans mb-3 bg-linear-to-r from-[#2076C7] to-[#1CADA3] bg-clip-text text-transparent drop-shadow-sm">
                                AIF Funds Comparison
                            </motion.h2>
                            <motion.p variants={slideUpFade} className="text-gray-500 text-lg lg:text-xl font-light">
                                Compare top-performing Alternative Investment Funds.
                            </motion.p>
                        </motion.div>

                        <AIFComparisonGraph />

                        <div className="overflow-x-auto rounded-3xl shadow-xl border border-gray-200">
                            <table className="w-full text-left border-collapse bg-white">
                                <thead>
                                    <tr className="bg-gradient-to-r from-[#2076C7] to-[#1CADA3] text-white">
                                        <th className="p-5 font-bold text-sm uppercase tracking-wider text-white">Fund Name</th>
                                        <th className="p-5 font-bold text-sm uppercase tracking-wider text-white">Category</th>
                                        <th className="p-5 font-bold text-sm uppercase tracking-wider text-white">Strategy</th>
                                        <th className="p-5 font-bold text-sm uppercase tracking-wider text-white">Manager</th>
                                        <th className="p-5 font-bold text-sm uppercase tracking-wider text-white">Tenure</th>
                                        <th className="p-5 font-bold text-sm uppercase tracking-wider text-white">Min Investment</th>
                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-gray-100 text-gray-700 text-sm">
                                    {aifComparisonData.map((row, idx) => (
                                        <tr key={idx} className={`hover:bg-teal-50/50 transition-colors ${idx % 2 === 0 ? 'bg-white' : 'bg-neutral-50/50'}`}>
                                            <td className="p-5 font-bold text-gray-700 min-w-[200px]">{row.name}</td>
                                            <td className="p-5 whitespace-nowrap"><span className="px-2 py-1 bg-gray-100 rounded text-xs font-semibold text-gray-600">{row.cat}</span></td>
                                            <td className="p-5">{row.type}</td>
                                            <td className="p-5 font-medium text-gray-900">{row.manager}</td>
                                            <td className="p-5">{row.tenure}</td>
                                            <td className="p-5 font-medium text-[#1CADA3]">{row.min}</td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </div>
                </section>

                {/* Educational Section */}
                <section className="py-12 bg-neutral-50">
                    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                        <motion.div initial="hidden" whileInView="visible" variants={staggerContainer} viewport={{ once: true }} className="text-center mb-16">
                            <motion.h2 variants={slideUpFade} className="text-3xl md:text-4xl font-extrabold font-sans mb-3 bg-linear-to-r from-[#2076C7] to-[#1CADA3] bg-clip-text text-transparent drop-shadow-sm">
                                Why Choose AIF?
                            </motion.h2>
                            <motion.p variants={slideUpFade} className="text-gray-500 text-lg lg:text-xl font-light">
                                Understanding the structural advantage vs Mutual Funds.
                            </motion.p>
                        </motion.div>

                        <div className="overflow-x-auto rounded-3xl shadow-xl border border-gray-200">
                            <table className="w-full text-left border-collapse bg-white">
                                <thead>
                                    <tr className="bg-gradient-to-r from-[#2076C7] to-[#1CADA3] text-white">
                                        <th className="p-5 font-bold text-sm uppercase tracking-wider text-white w-1/4">Parameter</th>
                                        <th className="p-5 font-bold text-sm uppercase tracking-wider text-white w-1/3">AIF (Alternative Investment Fund)</th>
                                        <th className="p-5 font-bold text-sm uppercase tracking-wider text-white w-1/3">Mutual Fund</th>
                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-gray-100 text-gray-700 text-sm">
                                    {[
                                        { param: "Regulator", aif: "SEBI", mf: "SEBI" },
                                        { param: "Target Investors", aif: "HNIs, Institutional", mf: "Retail, All Investors" },
                                        { param: "Minimum Investment", aif: "₹1 Crore (usually)", mf: "₹100-500" },
                                        { param: "Liquidity", aif: "Lock-in period (3-7 years)", mf: "Daily liquidity" },
                                        { param: "Asset Classes", aif: "Alternative, Unlisted", mf: "Traditional, Listed" },
                                        { param: "Transparency", aif: "Limited disclosure", mf: "High disclosure" },
                                        { param: "Fees", aif: "2% management + 20% performance", mf: "1-2% management only" }
                                    ].map((row, idx) => (
                                        <tr key={idx} className={`hover:bg-teal-50/50 transition-colors ${idx % 2 === 0 ? 'bg-white' : 'bg-neutral-50/50'}`}>
                                            <td className="p-5 font-bold text-gray-700 border-r border-gray-100">{row.param}</td>
                                            <td className="p-5 font-semibold text-[#1CADA3] border-r border-gray-100 bg-teal-50/30">{row.aif}</td>
                                            <td className="p-5 text-gray-600">{row.mf}</td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </div>
                </section>

                {/* Intelligence Section */}
                <section className="py-12 bg-white">
                    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 ">
                        <motion.div initial="hidden" whileInView="visible" variants={staggerContainer} viewport={{ once: true }} className="text-center mb-16">
                            <motion.h2 variants={slideUpFade} className="text-3xl md:text-4xl font-extrabold font-sans mb-3 bg-linear-to-r from-[#2076C7] to-[#1CADA3] bg-clip-text text-transparent drop-shadow-sm">
                                AIF Category Intelligence
                            </motion.h2>
                            <motion.p variants={slideUpFade} className="text-xl text-gray-500 max-w-3xl mx-auto font-light">
                                Real-time comparison across alternative investment categories.
                            </motion.p>
                        </motion.div>
                        <AIF_Category_Performance />
                    </div>
                </section>

                <section className="py-12 bg-neutral-50">
                    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 mb-8">
                        <motion.div variants={slideUpFade} initial="hidden" whileInView="visible" viewport={{ once: true }} className="p-4 bg-yellow-50 border border-yellow-100 rounded-xl flex items-start gap-3 text-sm text-yellow-800">
                            <ShieldCheck className="w-5 h-5 shrink-0 mt-0.5" />
                            <p>
                                <strong>Mandatory Disclaimer:</strong> Investments in Alternative Investment Funds are subject to market risks and are available only to eligible investors under SEBI regulations. Category III AIFs may use leverage and derivatives. Please read the Private Placement Memorandum (PPM) carefully before investing.
                            </p>
                        </motion.div>
                    </div>
                    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
                        <motion.div initial="hidden" whileInView="visible" variants={staggerContainer} viewport={{ once: true }} className="text-center mb-16">
                            <motion.h2 variants={slideUpFade} className="text-3xl md:text-4xl font-extrabold font-sans mb-3 bg-linear-to-r from-[#2076C7] to-[#1CADA3] bg-clip-text text-transparent drop-shadow-sm">Frequently Asked Questions</motion.h2>
                            <motion.p variants={slideUpFade} className="text-gray-600 max-w-2xl mx-auto text-lg leading-relaxed font-light">Common questions about starting your AIF journey.</motion.p>
                        </motion.div>
                        <div className="space-y-4">
                            {aifFaqs.map((faq, idx) => (
                                <motion.div key={idx} variants={slideUpFade} initial="hidden" whileInView="visible" viewport={{ once: true }} className="overflow-hidden bg-white shadow-sm border border-gray-100 rounded-2xl">
                                    <button onClick={() => setOpenFaq(openFaq === idx ? null : idx)} className="w-full px-4 sm:px-6 py-3 sm:py-4 text-left flex justify-between items-start gap-3 bg-white hover:bg-blue-50/50 transition-colors focus:outline-none cursor-pointer group">
                                        <span className="font-bold text-gray-700 text-base sm:text-lg pr-2 group-hover:text-[#2076C7] transition-colors">{faq.q}</span>
                                        <div className={`p-1.5 rounded-full bg-white border border-gray-300 text-gray-700 transition-transform duration-300 shrink-0 ${openFaq === idx ? 'rotate-180' : ''}`}>
                                            {openFaq === idx ? <Minus size={18} strokeWidth={3} /> : <Plus size={18} strokeWidth={3} />}
                                        </div>
                                    </button>
                                    {openFaq === idx && <div className="px-6 py-6 bg-white text-gray-600 text-base leading-relaxed border-t border-gray-100 italic">{faq.a}</div>}
                                </motion.div>
                            ))}
                        </div>
                    </div>
                </section>

                <CTASection onClick={() => openLogin()} buttonText="Apply Now" />
            </motion.div>

            <AIFDetailModal
                isOpen={isDetailModalOpen}
                onClose={() => setIsDetailModalOpen(false)}
                fund={selectedFund}
            />
            <ChatBot />
            <ScrollToTop />
        </div >
    );
};

export default function AIFListingPage() {
    return (
        <Suspense fallback={
            <div className="min-h-screen bg-neutral-100 flex items-center justify-center">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
            </div>
        }>
            <AIFProductsContent />
        </Suspense>
    );
}