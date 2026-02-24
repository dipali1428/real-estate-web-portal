"use client";

import React, { useState, useEffect, Suspense } from 'react';
import Link from 'next/link';
import {
    TrendingUp, PieChart, ShieldCheck, ArrowRight,
    Activity, BarChart, Zap, ArrowLeft, ChevronDown, Search, Filter
} from 'lucide-react';
import { motion, Variants, useMotionValue, useTransform, AnimatePresence } from 'framer-motion';

// Components
import AIF_Category_Performance from './components/AIF_Category_Performance';
import AIFDetailModal from './components/AIFDetailModal';
import AIFComparisonGraph from './components/AIFComparisonGraph';

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
                            <div className="w-10 h-10 bg-primary/10 text-gray-700 rounded-xl flex items-center justify-center mr-4 shadow-sm">
                                <BarChart className="w-6 h-6" />
                            </div>
                            <h1 className="text-xl md:text-3xl font-bold text-gray-900">
                                Alternative Investment Funds (AIF)
                            </h1>
                        </div>
                        <p className="text-gray-500 text-lg leading-relaxed max-w-3xl">
                            SEBI-registered private investment vehicles for sophisticated investors.
                            <span className="text-primary font-bold"> Minimum investment ₹1 crore.</span> Diversified, strategy-driven funds with institutional-grade risk management.
                        </p>
                    </div>
                </div>
            </div>
        </motion.div>
    );
};

const AIFHeroVisual = () => {
    const [mounted, setMounted] = useState(false);
    const mouseX = useMotionValue(0);
    const mouseY = useMotionValue(0);
    const rotateX = useTransform(mouseY, [-300, 300], [5, -5]);
    const rotateY = useTransform(mouseX, [-300, 300], [-5, 5]);

    useEffect(() => {
        setMounted(true);
    }, []);

    return (
        <div
            className="relative w-full h-[450px] lg:h-[450px] flex items-center justify-center overflow-hidden"
            onMouseMove={(e) => {
                const rect = e.currentTarget.getBoundingClientRect();
                mouseX.set(e.clientX - rect.left - rect.width / 2);
                mouseY.set(e.clientY - rect.top - rect.height / 2);
            }}
        >
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
                <motion.div
                    key={i}
                    animate={{
                        x: [0, (i % 2 ? 50 : -50), 0],
                        y: [0, (i % 2 ? -40 : 40), 0],
                        scale: [1, 1.3, 1],
                        opacity: [0.3, 0.4, 0.3]
                    }}
                    transition={{
                        duration: 15 + i * 3,
                        repeat: Infinity,
                        ease: "easeInOut",
                        delay: i * 2
                    }}
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

            <motion.div
                style={{ rotateX, rotateY }}
                className="relative z-20 w-64 h-64"
            >
                <div className="relative w-full h-full perspective-1000">
                    <motion.div
                        animate={{
                            rotateY: 360,
                            rotateX: [0, 5, 0, -5, 0]
                        }}
                        transition={{
                            rotateY: { duration: 25, repeat: Infinity, ease: "linear" },
                            rotateX: { duration: 10, repeat: Infinity, ease: "easeInOut" }
                        }}
                        className="w-full h-full relative preserve-3d"
                    >
                        <div className="absolute inset-0 bg-gradient-to-br from-primary/10 to-teal-400/10 rounded-[2.5rem] blur-md" />
                        <div className="absolute inset-0 bg-white/40 backdrop-blur-2xl border border-white/60 shadow-xl rounded-[2.5rem] flex items-center justify-center overflow-hidden group">
                            <div className="absolute inset-0 bg-gradient-to-tr from-primary/10 via-transparent to-teal-400/10 animate-pulse" />
                            <div className="relative z-10 flex flex-col items-center">
                                <motion.div
                                    animate={{
                                        scale: [1, 1.15, 1],
                                        rotate: [0, 5, -5, 0]
                                    }}
                                    transition={{ duration: 4, repeat: Infinity }}
                                    className="w-20 h-20 bg-gradient-to-br from-white to-blue-50 rounded-2xl flex items-center justify-center shadow-lg border border-blue-100 mb-3"
                                >
                                    <ShieldCheck className="text-primary w-10 h-10 drop-shadow-sm" />
                                </motion.div>
                                <div className="h-px w-16 bg-gradient-to-r from-transparent via-primary/50 to-transparent my-2" />
                                <span className="text-teal-600 font-bold text-xs tracking-[0.3em]">
                                    AIF PLATFORM
                                </span>
                            </div>
                            <motion.div
                                animate={{
                                    top: ['-100%', '200%'],
                                    opacity: [0, 1, 0]
                                }}
                                transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
                                className="absolute left-0 w-full h-1"
                                style={{
                                    background: 'linear-gradient(to right, transparent, #1CADA3, #2076C7, transparent)',
                                    boxShadow: '0 0 30px #1CADA3'
                                }}
                            />
                        </div>
                    </motion.div>
                </div>

                {aifFloatingTags.map((tag, i) => (
                    <motion.div
                        key={i}
                        initial={{ opacity: 0, scale: 0 }}
                        animate={{
                            opacity: 1,
                            scale: 1,
                            y: [0, -8, 0],
                            rotate: [0, 2, -2, 0]
                        }}
                        transition={{
                            delay: tag.delay,
                            y: { duration: 5, repeat: Infinity, ease: "easeInOut" },
                            rotate: { duration: 7, repeat: Infinity, ease: "easeInOut" }
                        }}
                        className={`absolute ${tag.pos} z-30`}
                    >
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
                    </motion.div>
                ))}
            </motion.div>

            <div className="absolute w-[400px] h-[400px] border border-primary/10 rounded-full animate-ping opacity-30" />
            <div className="absolute w-[550px] h-[550px] border border-primary/5 rounded-full animate-pulse opacity-40" />
        </div>
    );
};

const AIFProductsContent = () => {
    const [openFaq, setOpenFaq] = useState<number | null>(null);
    const [isDetailModalOpen, setIsDetailModalOpen] = useState(false);
    const [selectedFund, setSelectedFund] = useState<any>(null);

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
            <motion.div
                key="aif-content"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.4 }}
            >
                {/* AIF Hero Section */}
                <section className="relative py-20 lg:py-28 overflow-hidden bg-gradient-to-r from-teal-50 to-white">
                    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
                        <div className="grid lg:grid-cols-2 gap-12 items-center">
                            <motion.div
                                variants={staggerContainer}
                                initial="hidden"
                                animate="visible"
                                className="text-left"
                            >
                                <div className="mb-6 flex flex-wrap items-center gap-4">
                                    <Link
                                        href="/"
                                        className="inline-flex items-center gap-2 px-5 py-2.5 bg-white rounded-lg border border-gray-100 shadow-sm text-gray-700 font-bold text-sm hover:shadow-md transition-all active:scale-95"
                                    >
                                        <ArrowLeft size={16} />
                                        Back
                                    </Link>
                                </div>

                                <div className="absolute top-0 right-0 z-30">
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
                                    Strategic Wealth <br />
                                    Creation via <br />
                                    <span className="text-primary">Alternative Investment Funds</span>
                                </motion.h1>

                                <motion.p variants={slideUpFade} className="text-xl md:text-2xl text-gray-600 max-w-xl leading-relaxed mb-10">
                                    Exclusive alternative investment opportunities for sophisticated portfolios.
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
                                        <h3 className="text-lg font-bold text-gray-800 mb-1 group-hover:text-primary transition-colors">{cat.title}</h3>
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
                <section className="py-24 bg-neutral-50 text-gray-700">
                    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                        <motion.div initial="hidden" whileInView="visible" variants={staggerContainer} className="text-center mb-12">
                            <motion.h2 variants={slideUpFade} className="text-4xl font-bold bg-linear-to-r from-[#2076C7] to-[#1CADA3] bg-clip-text text-transparent mb-4">
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
                                    <Search className="h-5 w-5 text-gray-400 group-focus-within:text-primary transition-colors" />
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
                                            ? 'bg-primary text-white shadow-lg shadow-primary/30 scale-105'
                                            : 'bg-white text-gray-600 border border-gray-100 hover:border-primary/30 hover:bg-gray-50'
                                            }`}
                                    >
                                        {cat}
                                    </button>
                                ))}
                            </div>
                        </div>

                        <div className="flex flex-col gap-4 max-h-[800px] overflow-y-auto pr-2 custom-scrollbar">
                            <AnimatePresence mode='popLayout'>
                                {filteredStrategies.length > 0 ? (
                                    filteredStrategies.map((fund, idx) => (
                                        <motion.div
                                            key={fund.name}
                                            layout
                                            initial={{ opacity: 0, scale: 0.95 }}
                                            animate={{ opacity: 1, scale: 1 }}
                                            exit={{ opacity: 0, scale: 0.95 }}
                                            transition={{ duration: 0.3 }}
                                            className="w-full"
                                        >
                                            <div
                                                className='block cursor-pointer'
                                                onClick={(e) => {
                                                    if (fund.details) {
                                                        setSelectedFund(fund);
                                                        setIsDetailModalOpen(true);
                                                    }
                                                }}
                                            >
                                                <motion.div
                                                    whileHover={{ scale: 1.01, x: 5 }}
                                                    className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 flex flex-col md:flex-row md:items-center justify-between gap-6 hover:shadow-lg transition-all duration-300 relative overflow-hidden group"
                                                >
                                                    <div className="absolute left-0 top-0 bottom-0 w-1.5" style={{ backgroundColor: fund.color }} />

                                                    {/* Primary Info: Name & Tags */}
                                                    <div className="flex-1 min-w-0 md:max-w-xs lg:max-w-sm">
                                                        <h3 className="text-xl font-bold text-gray-700 mb-2 group-hover:text-primary transition-colors truncate">{fund.name}</h3>
                                                        <div className="flex flex-wrap gap-2">
                                                            <span className="px-2 py-1 bg-gray-100 text-gray-600 rounded text-[10px] font-bold uppercase tracking-wider">{fund.category}</span>
                                                            <span className="px-2 py-1 bg-blue-50 text-blue-600 rounded text-[10px] font-bold uppercase tracking-wider truncate">{fund.theme}</span>
                                                        </div>
                                                    </div>

                                                    {/* Secondary Info: Manager & Description */}
                                                    <div className="flex-[2] text-gray-500 text-sm border-l border-gray-100 pl-6 hidden lg:block">
                                                        <div className="space-y-1">
                                                            <p className="line-clamp-1"><span className="font-semibold text-gray-700">Manager:</span> {fund.manager}</p>
                                                            <p className="text-gray-400 text-xs italic line-clamp-2">{fund.desc}</p>
                                                        </div>
                                                    </div>

                                                    {/* Action / Arrow */}
                                                    <div className="flex items-center gap-4 shrink-0">
                                                        <div className="hidden sm:block text-right">
                                                            <div className="text-xs font-bold text-primary group-hover:translate-x-[-4px] transition-transform">VIEW DETAILS</div>
                                                        </div>
                                                        <div className="p-3 rounded-xl bg-slate-50 text-slate-400 group-hover:bg-primary group-hover:text-white transition-all shadow-sm">
                                                            <ArrowRight size={20} />
                                                        </div>
                                                    </div>
                                                </motion.div>
                                            </div>
                                        </motion.div>
                                    ))
                                ) : (
                                    <motion.div
                                        initial={{ opacity: 0 }}
                                        animate={{ opacity: 1 }}
                                        className="py-20 text-center bg-white rounded-3xl border border-dashed border-gray-300"
                                    >
                                        <div className="inline-flex items-center justify-center w-20 h-20 bg-gray-50 rounded-full mb-4">
                                            <Search className="w-10 h-10 text-gray-300" />
                                        </div>
                                        <h4 className="text-xl font-bold text-gray-700 mb-2">No matching funds found</h4>
                                        <p className="text-gray-500">Try adjusting your filters or search query to find what you're looking for.</p>
                                        <button
                                            onClick={() => {
                                                setSearchQuery("");
                                                setSelectedCategory("All");
                                            }}
                                            className="mt-6 font-bold text-primary hover:underline"
                                        >
                                            Clear all filters
                                        </button>
                                    </motion.div>
                                )}
                            </AnimatePresence>
                        </div>
                    </div>
                </section>

                {/* Strategy Comparison Table */}
                <section className="py-24 bg-white">
                    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                        <motion.div initial="hidden" whileInView="visible" variants={staggerContainer} viewport={{ once: true }} className="text-center mb-16">
                            <motion.h2 variants={slideUpFade} className="text-3xl lg:text-4xl font-bold bg-linear-to-r from-[#2076C7] to-[#1CADA3] bg-clip-text text-transparent mb-4">
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
                                    <tr className="bg-gradient-to-r from-[#1CADA3] to-[#2076C7] text-white">
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
                <section className="py-24 bg-neutral-50">
                    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                        <motion.div initial="hidden" whileInView="visible" variants={staggerContainer} viewport={{ once: true }} className="text-center mb-16">
                            <motion.h2 variants={slideUpFade} className="text-3xl lg:text-4xl font-bold bg-linear-to-r from-[#2076C7] to-[#1CADA3] bg-clip-text text-transparent mb-4">
                                Why Choose AIF?
                            </motion.h2>
                            <motion.p variants={slideUpFade} className="text-gray-500 text-lg lg:text-xl font-light">
                                Understanding the structural advantage vs Mutual Funds.
                            </motion.p>
                        </motion.div>

                        <div className="overflow-x-auto rounded-3xl shadow-xl border border-gray-200">
                            <table className="w-full text-left border-collapse bg-white">
                                <thead>
                                    <tr className="bg-gradient-to-r from-[#1CADA3] to-[#2076C7] text-white">
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
                <section className="py-24 bg-white">
                    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 ">
                        <motion.div initial="hidden" whileInView="visible" variants={staggerContainer} viewport={{ once: true }} className="text-center mb-16">
                            <motion.h2 variants={slideUpFade} className="text-4xl font-bold bg-linear-to-r from-[#2076C7] to-[#1CADA3] bg-clip-text text-transparent mb-4">
                                AIF Category Intelligence
                            </motion.h2>
                            <motion.p variants={slideUpFade} className="text-xl text-gray-500 max-w-3xl mx-auto font-light">
                                Real-time comparison across alternative investment categories.
                            </motion.p>
                        </motion.div>
                        <AIF_Category_Performance />
                    </div>
                </section>

                {/* FAQ Section */}
                <section className="py-24 bg-neutral-50">
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
                            <motion.h2 variants={slideUpFade} className="text-4xl font-bold bg-linear-to-r from-[#2076C7] to-[#1CADA3] bg-clip-text text-transparent mb-4">AIF FAQ & Investor Guidance</motion.h2>
                            <motion.p variants={slideUpFade} className="text-gray-00 text-xl">Common questions about starting your AIF journey.</motion.p>
                        </motion.div>
                        <div className="space-y-6">
                            {aifFaqs.map((faq, idx) => (
                                <motion.div key={idx} variants={slideUpFade} initial="hidden" whileInView="visible" viewport={{ once: true }} className="overflow-hidden bg-white shadow-sm border border-gray-100 rounded-2xl">
                                    <button onClick={() => setOpenFaq(openFaq === idx ? null : idx)} className="w-full px-8 py-6 text-left flex justify-between items-center hover:bg-neutral-50 transition-colors group">
                                        <span className="font-bold text-lg text-gray-700 group-hover:text-primary transition-colors">{faq.q}</span>
                                        <div className={`p-2 rounded-full transition-all ${openFaq === idx ? 'bg-primary text-white rotate-180' : 'bg-primary/10 text-primary'}`}><ChevronDown size={20} /></div>
                                    </button>
                                    {openFaq === idx && <div className="px-8 pb-8 text-gray-500 bg-neutral-50/50 leading-relaxed"><div className="h-px bg-gray-100 mb-6" />{faq.a}</div>}
                                </motion.div>
                            ))}
                        </div>
                    </div>
                </section>

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

            <AIFDetailModal
                isOpen={isDetailModalOpen}
                onClose={() => setIsDetailModalOpen(false)}
                fund={selectedFund}
            />
        </div>
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
