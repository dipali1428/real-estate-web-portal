'use client';

import React, { useState } from 'react';
import { motion, Variants, AnimatePresence } from 'framer-motion';
import {
    ShieldCheck,
    Clock,
    FileText,
    Headphones,
    LineChart,
    RefreshCcw,
    ArrowRight,
    Zap,
    ChevronDown,
    MapPin,
    ArrowUpRight,
    Calculator,
    CheckCircle2,
    ArrowLeft,
    IndianRupee,
    Baby,
    Users2,
    Activity,
    Stethoscope,
    HeartPulse,
    ClipboardCheck,
    Search,
    Filter
} from 'lucide-react';
import Link from 'next/link';

// Components
import HealthInsuranceCalculator from './components/HealthInsuranceCalculator';
import HealthInsurancePlanCard from './components/HealthInsurancePlanCard';
import HealthInsuranceCharts from './components/HealthInsuranceCharts';
import HealthInsuranceApplyForm from './components/HealthInsuranceApplyForm';
import HealthInsuranceComparison from './components/HealthInsuranceComparison';

const HealthHeroVisual = () => {
    return (
        <div className="relative w-full h-[550px] flex items-center justify-center overflow-hidden">
            {/* Minimalist Grid Background */}
            <div className="absolute inset-0 opacity-10">
                <svg width="100%" height="100%" className="absolute inset-0">
                    <defs>
                        <pattern id="health-grid" width="60" height="60" patternUnits="userSpaceOnUse">
                            <path d="M 60 0 L 0 0 0 60" fill="none" stroke="#2076C7" strokeWidth="1" />
                        </pattern>
                    </defs>
                    <rect width="100%" height="100%" fill="url(#health-grid)" />
                </svg>
            </div>

            {/* Main Centerpiece */}
            <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.8 }}
                className="relative z-20"
            >
                <div className="relative w-80 h-80 flex items-center justify-center">
                    {/* Minimal Geometric Accents */}
                    <div className="absolute w-[380px] h-[380px] border-2 border-primary/5 rounded-full" />
                    <div className="absolute w-[460px] h-[460px] border border-primary/5 rounded-full" />

                    {/* Solid Glass Container */}
                    <motion.div
                        whileHover={{ scale: 1.02 }}
                        className="relative w-64 h-64 bg-white border border-gray-100 shadow-[0_32px_64px_rgba(0,0,0,0.06)] rounded-xl flex items-center justify-center overflow-hidden"
                    >
                        <div className="relative z-10 flex flex-col items-center">
                            <div className="w-24 h-24 rounded-lg flex items-center justify-center mb-4 transition-transform group-hover:scale-110 shadow-lg"
                                style={{ background: 'linear-gradient(to right, #2076C7, #1CADA3)' }}
                            >
                                <HeartPulse className="text-white w-12 h-12" />
                            </div>
                            <span className="text-primary font-bold text-[10px] tracking-[0.4em] uppercase">
                                Health Shield
                            </span>
                        </div>
                    </motion.div>

                    {/* Clean Info Tags */}
                    {[
                        { icon: ShieldCheck, label: "SECURE", pos: "-top-6 -right-12", color: "#2076C7" },
                        { icon: Activity, label: "ACTIVE", pos: "bottom-12 -right-16", color: "#1CADA3" },
                        { icon: Stethoscope, label: "EXPERT", pos: "top-16 -left-16", color: "#2076C7" }
                    ].map((tag, i) => (
                        <motion.div
                            key={i}
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.4 + i * 0.1 }}
                            className={`absolute ${tag.pos} z-30`}
                        >
                            <div className="bg-white px-5 py-2.5 rounded-lg border border-gray-100 flex items-center gap-2.5 shadow-xl">
                                <tag.icon size={16} style={{ color: tag.color }} />
                                <span className="text-gray-900 text-[11px] font-bold tracking-widest">{tag.label}</span>
                            </div>
                        </motion.div>
                    ))}
                </div>
            </motion.div>
        </div>
    );
};

const healthInsurancePlans = [
    {
        name: "HDFC ERGO General Insurance",
        price: "₹499",
        bestFor: "Individual & Family",
        sumInsured: "₹5 Lakh – ₹2 Crore",
        cashlessHospitals: "13,000+",
        claimSettlementRatio: "~98%",
        color: "#2076C7",
        isPopular: true,
        features: ["4X Coverage Benefit", "No Claim Bonus", "Pre & Post Hospitalization", "Daycare Procedures"]
    },
    {
        name: "Niva Bupa Health Insurance",
        price: "₹450",
        bestFor: "Family Floater",
        sumInsured: "₹3 Lakh – ₹1 Crore",
        cashlessHospitals: "10,000+",
        claimSettlementRatio: "~96%",
        color: "#2076C7",
        features: ["Unlimited Restoration", "Maternity Cover", "AYUSH Treatment", "Annual Health Checkup"]
    },
    {
        name: "ICICI Lombard General Insurance",
        price: "₹520",
        bestFor: "Individual & Family",
        sumInsured: "₹5 Lakh – ₹3 Crore",
        cashlessHospitals: "9,000+",
        claimSettlementRatio: "~97%",
        color: "#2076C7",
        features: ["No Room Rent Limit", "Critical Illness Cover", "Wellness Program", "Lifetime Renewability"]
    },
    {
        name: "Care Health – Care Supreme",
        price: "₹480",
        bestFor: "Individual, Family & Senior",
        sumInsured: "₹5 Lakh – ₹1 Crore",
        cashlessHospitals: "11,000+",
        claimSettlementRatio: "~96%",
        color: "#2076C7",
        features: ["Unlimited Automatic Recharge", "No Claim Bonus", "Annual Health Checkup", "Daycare Coverage"]
    },

    {
        name: "ManipalCigna – ProHealth Plus",
        price: "₹390",
        bestFor: "Individual & Family",
        sumInsured: "₹3 Lakh – ₹50 Lakh",
        cashlessHospitals: "8,500+",
        claimSettlementRatio: "~95%",
        color: "#2076C7",
        features: ["Restoration Benefit", "Wellness Rewards", "Worldwide Emergency Cover", "No Claim Bonus"]
    },
    {
        name: "SBI General – Arogya Supreme",
        price: "₹470",
        bestFor: "Individual & Family",
        sumInsured: "₹5 Lakh – ₹3 Crore",
        cashlessHospitals: "6,000+",
        claimSettlementRatio: "~95%",
        color: "#2076C7",
        features: ["Super Restoration", "Optional OPD Cover", "Critical Illness Add-on", "Tax Benefits"]
    },
    {
        name: "Aditya Birla – Activ One Max",
        price: "₹530",
        bestFor: "Individual & Family",
        sumInsured: "₹5 Lakh – ₹6 Crore",
        cashlessHospitals: "10,000+",
        claimSettlementRatio: "~96%",
        color: "#2076C7",
        features: ["Chronic Care Program", "No Claim Bonus", "Wellness Rewards", "Maternity Add-on"]
    },
    {
        name: "Tata AIG – Medicare Premier",
        price: "₹560",
        bestFor: "Individual & Family",
        sumInsured: "₹5 Lakh – ₹3 Crore",
        cashlessHospitals: "12,000+",
        claimSettlementRatio: "~98%",
        color: "#2076C7",
        features: ["Worldwide Coverage", "High Sum Insured Options", "No Room Rent Limit", "Annual Health Checkup"]
    },

    {
        name: "Reliance – Health Infinity",
        price: "₹399",
        bestFor: "Individual & Family",
        sumInsured: "₹3 Lakh – ₹1 Crore",
        cashlessHospitals: "8,000+",
        claimSettlementRatio: "~95%",
        color: "#2076C7",
        features: ["Unlimited Restoration", "OPD Add-on", "Wellness Benefits", "Pre & Post Hospitalization"]
    },
    {
        name: "Future Generali – Health Absolute",
        price: "₹370",
        bestFor: "Individual & Family",
        sumInsured: "₹3 Lakh – ₹1 Crore",
        cashlessHospitals: "6,000+",
        claimSettlementRatio: "~94%",
        color: "#2076C7",
        features: ["Unlimited Restoration", "No Claim Bonus", "Daycare Coverage", "Lifetime Renewability"]
    },
    {
        name: "Max Bupa – Health Companion",
        price: "₹380",
        bestFor: "Individual & Family",
        sumInsured: "₹3 Lakh – ₹1 Crore",
        cashlessHospitals: "10,000+",
        claimSettlementRatio: "~96%",
        color: "#2076C7",
        features: ["Restore Benefit", "No Claim Bonus", "AYUSH Coverage", "Pre & Post Hospitalization"]
    },
    {
        name: "Care Health – Care Supreme (Standard)",
        price: "₹480",
        bestFor: "Individuals & Families",
        sumInsured: "₹5 Lakh – ₹1 Crore",
        cashlessHospitals: "11,800+",
        claimSettlementRatio: "~96%",
        color: "#2076C7",
        features: ["No Room Rent Limit", "Unlimited Automatic Recharge", "Cumulative Bonus", "Daycare & AYUSH Coverage"]
    },
    {
        name: "Care Health – Care Supreme Vikas",
        price: "₹399",
        bestFor: "Budget-Focused Families",
        sumInsured: "₹5 Lakh – ₹1 Crore",
        cashlessHospitals: "11,800+",
        claimSettlementRatio: "~96%",
        color: "#2076C7",
        features: ["Affordable Premium", "Shared Room Coverage", "Unlimited Automatic Recharge", "Hospitalization & Daycare"]
    },
    {
        name: "Care Health – Care Supreme Value",
        price: "₹430",
        bestFor: "Balanced Coverage Seekers",
        sumInsured: "₹5 Lakh – ₹1 Crore",
        cashlessHospitals: "11,800+",
        claimSettlementRatio: "~96%",
        color: "#2076C7",
        features: ["Automatic Recharge", "Cumulative Bonus", "Pre & Post Hospitalization", "Organ Donor Expenses"]
    },
    {
        name: "Care Health – Care Supreme Shine",
        price: "₹520",
        bestFor: "Wellness-Focused Individuals & Families",
        sumInsured: "₹5 Lakh – ₹1 Crore",
        cashlessHospitals: "11,800+",
        claimSettlementRatio: "~96%",
        color: "#2076C7",
        features: ["Wellness Rewards", "Unlimited E-Consultations", "No Major Treatment Sub-Limits", "Health & Fitness Programs"]
    },
    {
        name: "Star Health – Family Health Optima",
        price: "₹410",
        bestFor: "Family Floater",
        sumInsured: "₹5 Lakh – ₹25 Lakh",
        cashlessHospitals: "14,000+",
        claimSettlementRatio: "~97%",
        color: "#2076C7",
        features: ["Maternity & Newborn Cover", "Automatic Restoration Benefit", "Pre & Post Hospitalization", "AYUSH Treatment Coverage"]
    },
    {
        name: "Star Health – Super Star Plan",
        price: "₹450",
        bestFor: "Individual & Family",
        sumInsured: "₹5 Lakh – ₹1 Crore",
        cashlessHospitals: "14,000+",
        claimSettlementRatio: "~97%",
        color: "#2076C7",
        features: ["No Room Rent Restriction", "Super Restoration Benefit", "Wellness & Rewards Program", "Coverage for Modern Treatments"]
    },
    {
        name: "Star Health – Senior Citizens Red Carpet",
        price: "₹520",
        bestFor: "Senior Citizens (60+ Years)",
        sumInsured: "₹1 Lakh – ₹25 Lakh",
        cashlessHospitals: "14,000+",
        claimSettlementRatio: "~97%",
        color: "#2076C7",
        features: ["Designed for Seniors", "Pre-Existing Diseases Covered", "No Pre-Policy Checkup", "Lifelong Renewability"]
    },
    {
        name: "Star Health – Young Star Insurance",
        price: "₹350",
        bestFor: "Young Individuals (18–40 Years)",
        sumInsured: "₹5 Lakh – ₹1 Crore",
        cashlessHospitals: "14,000+",
        claimSettlementRatio: "~97%",
        color: "#2076C7",
        features: ["Lower Premium for Young Adults", "No Claim Bonus Benefit", "Automatic Restoration", "Daycare Procedures Covered"]
    },
    {
        name: "Star Health – Star Comprehensive Plan",
        price: "₹430",
        bestFor: "Individual & Family",
        sumInsured: "₹5 Lakh – ₹1 Crore",
        cashlessHospitals: "14,000+",
        claimSettlementRatio: "~97%",
        color: "#2076C7",
        features: ["Comprehensive Hospitalization", "Maternity Benefit (Optional)", "Organ Donor Expenses", "Pre & Post Hospitalization"]
    },
];

const HealthInsurancePage = () => {
    const [openFaq, setOpenFaq] = useState<number | null>(null);
    const [searchQuery, setSearchQuery] = useState('');
    const [selectedCategory, setSelectedCategory] = useState<string>('all');
    const [isApplyModalOpen, setIsApplyModalOpen] = useState(false);
    const [selectedPlan, setSelectedPlan] = useState<string | undefined>(undefined);

    const handleApply = (planName: string) => {
        setSelectedPlan(planName);
        setIsApplyModalOpen(true);
    };

    const categories = ['All', ...Array.from(new Set(healthInsurancePlans.map(plan => plan.bestFor))).slice(0, 3)];

    const filteredPlans = React.useMemo(() => {
        return healthInsurancePlans.filter(plan => {
            const matchesSearch = plan.name.toLowerCase().includes(searchQuery.toLowerCase());
            const matchesCategory = selectedCategory === 'All' || plan.bestFor === selectedCategory;
            return matchesSearch && matchesCategory;
        });
    }, [searchQuery, selectedCategory]);

    const staggerContainer: Variants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: { staggerChildren: 0.1 }
        }
    };

    const slideUpFade: Variants = {
        hidden: { opacity: 0, y: 30 },
        visible: {
            opacity: 1,
            y: 0,
            transition: { duration: 0.6, ease: "easeOut" }
        }
    };

    return (
        <div className="bg-neutral-100 min-h-screen font-sans">
            {/* Hero Content Section */}
            <section className="relative py-20 lg:py-28 overflow-hidden bg-linear-to-r from-blue-50 via-teal-50 to-emerald-50" style={{ background: 'linear-gradient(to right, #79c2f7ff, #ffffffff)' }}>
                {/* Animated background shapes */}
                <div className="absolute inset-0 overflow-hidden">
                    <div className="absolute -top-40 -right-40 w-80 h-80 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-pulse" style={{ backgroundColor: 'rgba(28, 202, 163, 0.3)' }}></div>
                    <div className="absolute -bottom-40 -left-40 w-80 h-80 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-pulse" style={{ backgroundColor: 'rgba(32, 118, 199, 0.3)', animationDelay: '1s' }}></div>
                    <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-pulse" style={{ backgroundColor: 'rgba(28, 202, 163, 0.2)', animationDelay: '2s' }}></div>
                </div>

                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
                    <div className="grid lg:grid-cols-2 gap-12 items-center">
                        <div className="text-left">
                            <div className="mb-6">
                                <Link
                                    href="/"
                                    className="inline-flex items-center gap-2 px-5 py-2.5 bg-white rounded-lg border border-gray-100 shadow-sm text-gray-700 font-bold text-sm hover:shadow-md transition-all active:scale-95"
                                >
                                    <ArrowLeft size={16} />
                                    Back
                                </Link>
                            </div>
                            <motion.h1
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                className="text-5xl md:text-7xl font-bold font-sans bg-linear-to-r from-[#2076C7] to-[#1CADA3] bg-clip-text text-transparent leading-[1.1] mb-6 tracking-tight"
                            >
                                Health Protection <br />
                                for Every <br />
                                Generation
                            </motion.h1>

                            <motion.p
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: 0.1 }}
                                className="text-xl md:text-2xl text-gray-600 max-w-xl leading-relaxed mb-10"
                            >
                                Secure your family's future with India's most trusted health insurance plans.
                            </motion.p>

                            <motion.div
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: 0.2 }}
                                className="flex flex-wrap gap-5 pt-4"
                            >
                                <button
                                    onClick={() => document.getElementById('calculator')?.scrollIntoView({ behavior: 'smooth' })}
                                    className="group relative px-8 py-4 rounded-xl font-bold text-sm md:text-base text-white shadow-lg hover:brightness-110 transform hover:-translate-y-1 transition-all duration-300 cursor-pointer overflow-hidden"
                                    style={{ background: 'linear-gradient(to right, #2076C7, #1CADA3)' }}
                                >
                                    Consult an Advisor
                                </button>
                            </motion.div>
                        </div>

                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ duration: 1, delay: 0.2 }}
                            className="relative h-[500px] hidden lg:block"
                        >
                            <HealthHeroVisual />
                        </motion.div>
                    </div>
                </div>
            </section>



            {/* Plans Section */}
            <section className="py-24 bg-neutral-100 border-t border-gray-100">
                <div className="max-w-7xl mx-auto px-4 text-center">
                    <div className="mb-12">
                        <h2 className="text-4xl font-bold bg-linear-to-r from-[#2076C7] to-[#1CADA3] bg-clip-text text-transparent mb-4">
                            Choose Your Perfect Plan
                        </h2>
                        <p className="text-xl text-gray-500 max-w-2xl mx-auto font-light">
                            Tailored health coverage options for individuals and families
                        </p>
                    </div>

                    {/* Filter Section */}
                    <div className="w-full mx-auto mb-10 px-4">
                        <div className="bg-white/90 backdrop-blur-xl p-2 rounded-lg shadow-[0_8px_30px_rgb(0,0,0,0.04)] border border-gray-100 flex flex-col md:flex-row gap-2 items-center w-full">
                            {/* Search */}
                            <div className="relative w-full md:w-72 shrink-0">
                                <Search className="absolute left-5 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
                                <input
                                    type="text"
                                    placeholder="Search insurers..."
                                    value={searchQuery}
                                    onChange={(e) => setSearchQuery(e.target.value)}
                                    className="w-full h-12 pl-12 pr-4 bg-gray-50 border-none rounded-lg outline-none focus:bg-white focus:ring-2 focus:ring-[#2076C7]/10 transition-all font-medium text-gray-700 text-sm placeholder:text-gray-400"
                                />
                            </div>

                            <div className="h-8 w-px bg-gray-200 hidden md:block mx-2"></div>

                            {/* Category Filter */}
                            <div className="flex flex-wrap justify-center md:justify-start gap-1.5 w-full">
                                {categories.map((cat) => (
                                    <button
                                        key={cat}
                                        onClick={() => setSelectedCategory(cat)}
                                        className={`px-5 py-2.5 rounded-lg font-bold text-[11px] tracking-wide transition-all cursor-pointer whitespace-nowrap border ${selectedCategory === cat
                                            ? 'text-white border-transparent shadow-lg shadow-[#2076C7]/20'
                                            : 'bg-white text-gray-500 border-gray-100 hover:border-gray-200 hover:bg-gray-50'
                                            }`}
                                        style={selectedCategory === cat ? { background: 'linear-gradient(to right, #2076C7, #1CADA3)' } : {}}
                                    >
                                        {cat}
                                    </button>
                                ))}
                            </div>
                        </div>

                        {/* Results Count */}
                        <div className="mt-4 px-2 flex justify-between items-center text-xs font-bold text-gray-400 uppercase tracking-widest">
                            <span>{filteredPlans.length} PLANS FOUND</span>
                            {(searchQuery || selectedCategory !== 'All') && (
                                <button
                                    onClick={() => { setSearchQuery(''); setSelectedCategory('All'); }}
                                    className="text-[#2076C7] hover:text-[#1CADA3] transition-colors cursor-pointer flex items-center gap-1"
                                >
                                    <span>Clear Filters</span>
                                    <div className="w-4 h-4 rounded-md bg-gray-100 flex items-center justify-center text-[8px] text-gray-500">✕</div>
                                </button>
                            )}
                        </div>
                    </div>

                    <div id="plans-grid" className="px-4 py-8 max-h-[850px] overflow-y-auto pr-2 custom-scrollbar">
                        <div className="grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
                            {(filteredPlans.length > 0 ? filteredPlans : healthInsurancePlans).map((plan, idx) => (
                                <HealthInsurancePlanCard key={idx} {...plan} onApply={handleApply} />
                            ))}
                        </div>
                    </div>


                </div>
            </section>

            {/* Calculator Section */}
            <section id="calculator" className="py-24 bg-white relative overflow-hidden text-gray-900 border-t border-gray-100">
                <div className="max-w-7xl mx-auto px-4 text-center mb-12">
                    <h2 className="text-4xl font-bold bg-linear-to-r from-[#2076C7] to-[#1CADA3] bg-clip-text text-transparent mb-4">
                        Premium Calculator
                    </h2>
                    <p className="text-xl text-gray-500 font-light">Get instant premium estimates for you and your family</p>
                </div>
                <div className="max-w-7xl mx-auto px-4 relative z-10">
                    <HealthInsuranceCalculator />
                </div>
            </section>

            <HealthInsuranceComparison />
            <HealthInsuranceCharts />

            {/* Coverage Section */}
            <section className="py-24 bg-neutral-100 relative overflow-hidden border-y border-gray-100">
                <div className="max-w-7xl mx-auto px-4 relative z-10">
                    <div className="grid lg:grid-cols-2 gap-16 items-center">
                        <div>
                            <h2 className="text-4xl font-bold bg-linear-to-r from-[#2076C7] to-[#1CADA3] bg-clip-text text-transparent mb-4">
                                Coverage Details
                            </h2>
                            <p className="text-xl text-gray-500 font-light mb-12">
                                Comprehensive protection for your most valuable asset—your health.
                            </p>
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
                                {[
                                    { icon: "🏥", text: "Hospitalization (Room, ICU, Surgery)" },
                                    { icon: "🧪", text: "Diagnostic Tests (Blood, Scans)" },
                                    { icon: "💊", text: "Medicines & Pharmacy" },
                                    { icon: "🚑", text: "Emergency Ambulance" },
                                    { icon: "📋", text: "Pre & Post Hospitalization" },
                                    { icon: "🧠", text: "Mental Health Care" }
                                ].map((item, idx) => (
                                    <div key={idx} className="flex items-center gap-4 p-4 bg-white rounded-lg border border-gray-100 shadow-sm">
                                        <span className="text-2xl shrink-0">{item.icon}</span>
                                        <span className="font-bold text-gray-700 text-xs sm:text-sm">{item.text}</span>
                                    </div>
                                ))}
                            </div>
                        </div>
                        <div className="relative">
                            <div className="bg-white p-8 rounded-2xl shadow-2xl border border-gray-100">
                                <h3 className="text-2xl font-bold text-gray-900 mb-8">Types of Health Insurance</h3>
                                <div className="space-y-4">
                                    {[
                                        { title: "Individual Health Insurance", desc: "Covers one person with dedicated sum insured.", icon: <Users2 className="text-blue-500" /> },
                                        { title: "Family Floater Plan", desc: "Covers the whole family under one sum insured.", icon: <Users2 className="text-teal-500" /> },
                                        { title: "Group Health Insurance", desc: "Provided by employers for employees.", icon: <ShieldCheck className="text-indigo-500" /> },
                                        { title: "Senior Citizen Plans", desc: "Tailored for people above 60 years.", icon: <HeartPulse className="text-red-500" /> },
                                        { title: "Critical Illness Plans", desc: "Covers major diseases like cancer, heart attack.", icon: <Activity className="text-orange-500" /> }
                                    ].map((type, idx) => (
                                        <div key={idx} className="flex gap-4 p-4 rounded-lg hover:bg-gray-50 transition-colors border border-transparent hover:border-gray-100">
                                            <div className="w-12 h-12 shrink-0 bg-white rounded-lg shadow-sm border border-gray-50 flex items-center justify-center">
                                                {type.icon}
                                            </div>
                                            <div>
                                                <h4 className="font-bold text-gray-900">{type.title}</h4>
                                                <p className="text-xs text-gray-500 font-medium">{type.desc}</p>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Documentation Section */}
            <section className="py-24 bg-white relative overflow-hidden border-b border-gray-100">
                <div className="max-w-7xl mx-auto px-4 relative z-10">
                    <div className="text-center mb-16">
                        <h2 className="text-4xl font-bold bg-linear-to-r from-[#2076C7] to-[#1CADA3] bg-clip-text text-transparent mb-4">
                            Documentation Simplified
                        </h2>
                        <p className="text-xl text-gray-500 font-light">Everything you need to get started and claim hassle-free.</p>
                    </div>

                    <div className="grid lg:grid-cols-2 gap-12">
                        <div className="bg-neutral-50 p-10 rounded-2xl border border-gray-100">
                            <h3 className="text-2xl font-bold text-gray-900 mb-8 flex items-center gap-3">
                                <FileText className="text-primary" />
                                For Policy Application
                            </h3>
                            <div className="grid sm:grid-cols-2 gap-6">
                                {[
                                    { title: "Identity Proof", desc: "Aadhar Card / PAN Card", icon: "🪪" },
                                    { title: "Bank Details", desc: "Canceled Cheque / Passbook", icon: "🏦" },
                                    { title: "Nominee Info", desc: "Name, Age & Relationship", icon: "👤" },
                                    { title: "Medical Proof", desc: "Previous reports (if any)", icon: "🩺" }
                                ].map((doc, idx) => (
                                    <div key={idx} className="bg-white p-6 rounded-lg shadow-sm border border-gray-50 group hover:border-primary/20 transition-all">
                                        <div className="text-3xl mb-4">{doc.icon}</div>
                                        <h4 className="font-bold text-gray-900 mb-1">{doc.title}</h4>
                                        <p className="text-xs text-gray-500 font-medium leading-relaxed">{doc.desc}</p>
                                    </div>
                                ))}
                            </div>
                        </div>

                        <div className="space-y-6">
                            <div className="bg-neutral-50 p-8 rounded-2xl border border-gray-100">
                                <h3 className="text-xl font-bold text-gray-900 mb-6 flex items-center gap-3">
                                    <ShieldCheck className="text-primary" />
                                    For Claims
                                </h3>
                                <div className="space-y-4">
                                    <div className="p-4 bg-white/60 backdrop-blur-sm rounded-lg border border-white/50">
                                        <p className="font-bold text-gray-900 text-sm mb-2 uppercase tracking-widest text-[#2076C7]">Cashless Claim</p>
                                        <ul className="text-xs text-gray-600 space-y-2 font-medium">
                                            <li className="flex items-center gap-2">• Health Card / Policy Number</li>
                                            <li className="flex items-center gap-2">• Valid Photo ID Proof</li>
                                            <li className="flex items-center gap-2">• Cashless Request Form</li>
                                        </ul>
                                    </div>
                                    <div className="p-4 bg-white rounded-lg border border-gray-100">
                                        <p className="font-bold text-gray-900 text-sm mb-2 uppercase tracking-widest text-[#1CADA3]">Reimbursement Claim</p>
                                        <ul className="text-xs text-gray-600 space-y-2 font-medium">
                                            <li className="flex items-center gap-2">• Hospital Bills & Receipts</li>
                                            <li className="flex items-center gap-2">• Discharge Summary</li>
                                            <li className="flex items-center gap-2">• Doctor's Prescriptions</li>
                                        </ul>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Process Overview Section */}
            <section className="py-24 bg-neutral-100 relative overflow-hidden border-b border-gray-100 text-gray-700">
                <div className="max-w-7xl mx-auto px-4 relative z-10">
                    <div className="text-center mb-16">
                        <h2 className="text-4xl font-bold bg-linear-to-r from-[#2076C7] to-[#1CADA3] bg-clip-text text-transparent mb-4">
                            Our Process
                        </h2>
                    </div>

                    <div className="grid md:grid-cols-4 gap-8">
                        {[
                            { title: "Choosing Plan", desc: "Select based on coverage, premium & hospitals.", icon: <LineChart size={32} /> },
                            { title: "Application", desc: "Fill proposal form & declare medical history.", icon: <ClipboardCheck size={32} /> },
                            { title: "Medical Check", desc: "Required for higher age or specific cases.", icon: <Stethoscope size={32} /> },
                            { title: "Policy Issuance", desc: "Pay premium & receive your policy instantly.", icon: <Zap size={32} /> }
                        ].map((step, idx) => (
                            <div key={idx} className="relative group text-center">
                                <div className="w-20 h-20 mx-auto rounded-xl bg-white shadow-xl flex items-center justify-center text-primary mb-6 group-hover:bg-primary group-hover:text-white transition-all transform group-hover:-translate-y-2">
                                    {step.icon}
                                </div>
                                <h4 className="font-bold text-gray-900 mb-2">{step.title}</h4>
                                <p className="text-xs text-gray-500 font-medium leading-relaxed">{step.desc}</p>
                                {idx < 3 && (
                                    <div className="hidden md:block absolute top-10 left-full w-full h-px border-t-2 border-dashed border-gray-200 -z-10" />
                                )}
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Eligibility Section */}
            <section className="py-24 bg-white relative overflow-hidden border-t border-gray-100">
                <div className="max-w-7xl mx-auto px-4 relative z-10">
                    <div className="grid md:grid-cols-2 gap-12 md:gap-20 items-center">
                        <div>
                            <h2 className="text-4xl font-bold bg-linear-to-r from-[#2076C7] to-[#1CADA3] bg-clip-text text-transparent mb-4">
                                Eligibility Criteria
                            </h2>
                            <p className="text-xl text-gray-500 font-light mb-12">
                                Simple criteria for complete peace of mind.
                            </p>
                            <div className="space-y-6">
                                {[
                                    { k: "Age Criteria", v: "Adults: 18-65 years | Children: 90 days to 18 years | Seniors: 60+ (up to 85)" },
                                    { k: "Family Members", v: "Self, Spouse, Children, Parents & Parents-in-law" },
                                    { k: "Medical History", v: "Must disclose pre-existing diseases (Diabetes, BP, etc.)" },
                                    { k: "Medical Check-up", v: "Required if age > 45 or high sum insured chosen" },
                                    { k: "Residency", v: "Must be an Indian resident (NRIs covered for treatment in India)" }
                                ].map((item, idx) => (
                                    <div key={idx} className="flex gap-4 items-start group">
                                        <div className="p-1 rounded-lg bg-[#2076C7]/20 text-[#2076C7] mt-1">
                                            <CheckCircle2 size={20} />
                                        </div>
                                        <div>
                                            <span className="block text-gray-500 text-sm font-bold uppercase tracking-widest group-hover:text-[#2076C7] transition-colors">
                                                {item.k}
                                            </span>
                                            <span className="text-base sm:text-lg font-bold text-gray-900">
                                                {item.v}
                                            </span>
                                        </div>
                                    </div>
                                ))}
                            </div>

                            <div className="mt-12 overflow-hidden rounded-lg border border-gray-200">
                                <div className="overflow-x-auto">
                                    <table className="w-full text-left bg-white min-w-[500px]">
                                        <thead className="bg-gray-50">
                                            <tr>
                                                <th className="px-6 py-4 text-xs font-bold uppercase tracking-widest text-gray-500">Criteria</th>
                                                <th className="px-6 py-4 text-xs font-bold uppercase tracking-widest text-gray-500">Requirement</th>
                                            </tr>
                                        </thead>
                                        <tbody className="divide-y divide-gray-100">
                                            {[
                                                ["Minimum age", "18 years"],
                                                ["Child coverage", "90 days onwards"],
                                                ["Medical tests", "Age / health based"],
                                                ["Pre-existing illness", "Allowed with waiting period"],
                                                ["Residency", "Indian resident"]
                                            ].map(([k, v], i) => (
                                                <tr key={i}>
                                                    <td className="px-6 py-4 font-bold text-gray-900 text-sm sm:text-base">{k}</td>
                                                    <td className="px-6 py-4 text-gray-600 font-medium text-sm sm:text-base">{v}</td>
                                                </tr>
                                            ))}
                                        </tbody>
                                    </table>
                                </div>
                            </div>
                        </div>

                        <div>
                            <div className="bg-white p-6 sm:p-10 rounded-2xl shadow-2xl border border-gray-100">
                                <h3 className="text-xl sm:text-2xl font-bold text-gray-900 mb-8 uppercase tracking-tighter text-center sm:text-left">Who Should Consider?</h3>
                                <div className="grid gap-6">
                                    {/* Benefits / Who should consider */}
                                    {[
                                        { title: "Working Professionals", desc: "Protect savings from sudden medical expenses.", icon: <Zap size={24} className="text-yellow-500" /> },
                                        { title: "Families", desc: "Covers spouse and children under one plan.", icon: <Users2 size={24} className="text-teal-500" /> },
                                        { title: "Senior Citizens", desc: "Higher risk of illness with age requires special care.", icon: <HeartPulse size={24} className="text-red-500" /> },
                                        { title: "Young Adults", desc: "Lower premiums by starting early and completing waiting periods.", icon: <Activity size={24} className="text-blue-500" /> }
                                    ].map((person, idx) => (
                                        <div key={idx} className="flex gap-4 p-5 rounded-lg bg-gray-50/50 border border-transparent hover:border-primary/20 transition-all group">
                                            <div className="w-12 h-12 bg-white rounded-lg shadow-sm flex items-center justify-center group-hover:scale-110 transition-transform">
                                                {person.icon}
                                            </div>
                                            <div>
                                                <h4 className="font-bold text-gray-900">{person.title}</h4>
                                                <p className="text-xs text-gray-500 font-medium">{person.desc}</p>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                                <div className="mt-8 pt-8 border-t border-gray-100">
                                    <button
                                        onClick={() => document.getElementById('plans-grid')?.scrollIntoView({ behavior: 'smooth' })}
                                        className="w-full py-4 sm:py-5 bg-gradient-to-r from-[#2076C7] to-[#1CADA3] text-white rounded-xl font-bold tracking-widest text-base sm:text-lg shadow-xl shadow-[#2076C7]/20 hover:scale-[1.02] active:scale-[0.98] transition-all cursor-pointer"
                                    >
                                        VIEW PLANS
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>


            {/* FAQ Section */}
            <section className="py-24 bg-white border-t border-gray-100">
                <div className="max-w-4xl mx-auto px-4">
                    <div className="text-center mb-16">
                        <h2 className="text-3xl md:text-4xl font-extrabold mb-3">
                            <span className="text-transparent bg-clip-text bg-linear-to-r from-[#2076C7] via-[#1CADA3] to-[#2076C7]">
                                Frequently Asked Questions
                            </span>
                        </h2>
                        <div className="w-24 h-1 mx-auto bg-linear-to-r from-[#2076C7] to-[#1CADA3] rounded-full mb-4"></div>
                    </div>

                    <div className="space-y-4">
                        {[
                            { q: "How quickly can I get the policy?", a: "Instantly! After payment, policy document reaches your email within 5 minutes." },
                            { q: "Are pre-existing diseases covered?", a: "Yes, after the waiting period (usually 2-4 years depending on condition)." },
                            { q: "Can I use it for parents?", a: "Absolutely. Our Family Floater and Senior Citizen plans cover parents." },
                            { q: "Is there any medical test required?", a: "For most plans up to ₹50 Lakhs and age below 55, no medical test needed." },
                            { q: "How do I claim?", a: "Go to any network hospital, show your digital card - no cash needed." },
                            { q: "Can I increase cover later?", a: "Yes, at the time of renewal you can upgrade your sum insured." }
                        ].map((faq, idx) => (
                            <motion.div
                                key={idx}
                                className="overflow-hidden bg-white border border-gray-100 rounded-xl shadow-sm hover:shadow-md transition-shadow"
                            >
                                <button
                                    onClick={() => setOpenFaq(openFaq === idx ? null : idx)}
                                    className="w-full px-8 py-6 text-left flex justify-between items-center group"
                                >
                                    <span className="font-bold text-lg text-gray-700 group-hover:text-[#2076C7] transition-colors">{faq.q}</span>
                                    <div className={`p-2 rounded-md transition-all ${openFaq === idx ? 'bg-[#2076C7] text-white rotate-180' : 'bg-[#2076C7]/10 text-[#2076C7]'}`}>
                                        <ChevronDown size={20} />
                                    </div>
                                </button>
                                <AnimatePresence>
                                    {openFaq === idx && (
                                        <motion.div
                                            initial={{ height: 0, opacity: 0 }}
                                            animate={{ height: "auto", opacity: 1 }}
                                            exit={{ height: 0, opacity: 0 }}
                                            transition={{ duration: 0.3 }}
                                            className="px-8 pb-8 text-gray-500 font-medium leading-relaxed"
                                        >
                                            <div className="h-px bg-gray-100 mb-6" />
                                            {faq.a}
                                        </motion.div>
                                    )}
                                </AnimatePresence>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>

            {/* CTA Final */}
            <section className="py-24 bg-neutral-100 flex flex-col items-center border-t border-gray-100">
                <div className="max-w-4xl mx-auto text-center px-4">
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="p-8 sm:p-16 shadow-3xl rounded-xl relative overflow-hidden bg-gradient-to-r from-[#2076C7] to-[#1CADA3] text-white"
                    >
                        <div className="absolute top-0 right-0 w-64 h-64 bg-white/20 rounded-full blur-[80px] -mr-32 -mt-32" />
                        <h2 className="text-3xl md:text-4xl font-bold text-white mb-6 tracking-tighter font-sans">Ready to protect your family?</h2>
                        <p className="text-xl text-white/70 mb-10 leading-relaxed font-medium">Join thousands of smart families who secured their future with us today.</p>
                        <div className="flex flex-wrap justify-center gap-4">
                            <button className="group relative bg-white text-[#1CADA3] px-12 py-5 rounded-lg font-bold tracking-widest flex items-center gap-3 shadow-xl hover:shadow-2xl transform hover:-translate-y-1 transition-all duration-300 overflow-hidden cursor-pointer font-sans">
                                <span className="relative z-10 flex items-center gap-3">
                                    Get Started Now
                                    <Zap size={20} fill="currentColor" className="text-[#2076C7]" />
                                </span>
                                <div className="absolute inset-0 transform scale-x-0 group-hover:scale-x-100 transition-transform origin-left duration-300 bg-gray-50"></div>
                            </button>
                        </div>
                    </motion.div>
                </div>
            </section>

            <HealthInsuranceApplyForm
                isOpen={isApplyModalOpen}
                onClose={() => setIsApplyModalOpen(false)}
                planName={selectedPlan}
            />
        </div>
    );
};

export default HealthInsurancePage;
