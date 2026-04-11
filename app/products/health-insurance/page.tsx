'use client';

import NextImage from 'next/image';
import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { motion, Variants, AnimatePresence } from 'framer-motion';
import {
    ShieldCheck,
    FileText,
    LineChart,
    ArrowRight,
    Zap,
    Plus,
    Minus,
    CheckCircle2,
    ArrowLeft,
    Users2,
    Activity,
    Stethoscope,
    HeartPulse,
    ClipboardCheck,
    Search,
    Hospital,
    TestTube,
    Pill,
    Ambulance,
    FileSearch,
    Brain,
    UserPlus,
    CreditCard,
    Stethoscope as StethoscopeIcon
} from 'lucide-react';
import { useModal } from '../../context/ModalContext';

// Components
import HealthInsuranceCalculator from './components/HealthInsuranceCalculator';
import HealthInsurancePlanCard from './components/HealthInsurancePlanCard';
import HealthInsuranceCharts from './components/HealthInsuranceCharts';
import HealthInsuranceApplyForm from './components/HealthInsuranceApplyForm';
import HealthInsuranceComparison from './components/HealthInsuranceComparison';
import CTASection from '@/app/component/CTASection';
import ScrollToTop from '@/app/component/ScrollToTop';
import Chatbot from '@/app/component/chatbot/page';

const HealthHeroVisual = () => {
    return (
        <div className="relative w-full h-full flex items-center justify-center overflow-hidden">
            {/* Background Gradient / Glow */}
            <div className="absolute inset-0 bg-gradient-to-tr from-[#2076C7]/5 to-[#1CADA3]/10 rounded-full blur-3xl" />

            {/* Main Image Container */}
            <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.8 }}
                className="relative z-20 w-full aspect-square max-w-[500px]"
            >
                <div className="relative w-full h-full rounded-2xl overflow-hidden shadow-2xl border border-white/20">
                    <NextImage
                        src="/images/health_insurance_hero.png"
                        alt="Health Insurance Coverage"
                        fill
                        className="object-cover"
                        priority
                    />
                    {/* Soft Overlay */}
                    <div className="absolute inset-0 bg-gradient-to-t from-[#2076C7]/20 to-transparent opacity-40" />
                </div>

                {/* Clean Info Tags - Repositioned for new visual */}
                {[
                    { icon: ShieldCheck, label: "SECURE", pos: "-top-3 -right-6", color: "#2076C7" },
                    { icon: Activity, label: "ACTIVE", pos: "bottom-12 -right-8", color: "#1CADA3" },
                    { icon: Stethoscope, label: "EXPERT", pos: "bottom-4 -left-12", color: "#2076C7" }
                ].map((tag, i) => (
                    <motion.div
                        key={i}
                        initial={{ opacity: 0, x: i % 2 === 0 ? -20 : 20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: 0.6 + i * 0.1 }}
                        className={`absolute ${tag.pos} z-30 hidden sm:block`}
                    >
                        <div className="bg-white/95 backdrop-blur-md px-5 py-2.5 rounded-lg border border-gray-100 flex items-center gap-2.5 shadow-xl">
                            <tag.icon size={16} style={{ color: tag.color }} />
                            <span className="text-gray-900 text-[11px] font-bold tracking-widest uppercase">{tag.label}</span>
                        </div>
                    </motion.div>
                ))}
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
    const router = useRouter();
    const [showBackButton, setShowBackButton] = useState(true);
    const [openFaq, setOpenFaq] = useState<number | null>(null);
    const [searchQuery, setSearchQuery] = useState('');
    const [selectedCategory, setSelectedCategory] = useState<string>('all');
    const [isApplyModalOpen, setIsApplyModalOpen] = useState(false);
    const [selectedPlan, setSelectedPlan] = useState<string | undefined>(undefined);
    const [showAllFaqs, setShowAllFaqs] = useState(false);

    const { openLogin } = useModal();

    const handleApply = (planName: string) => {
        setSelectedPlan(planName);
        openLogin();
    };

    const handleBackOffers = () => router.push('/#services');

    useEffect(() => {
        const handleScroll = () => setShowBackButton(window.scrollY < 80);
        window.addEventListener('scroll', handleScroll, { passive: true });
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

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
        <>
            {/* FIXED BACK BUTTON */}
            <div className={`fixed z-50 top-10 left-4 md:top-24 md:left-8 transition-all duration-300 ${showBackButton ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'}`}>
                <button
                    onClick={handleBackOffers}
                    aria-label="Back to Offers"
                    className="md:hidden group flex items-center gap-2 p-2 text-gray-500"
                >
                    <div className="p-2.5 bg-white/70 backdrop-blur-md rounded-full shadow-lg border border-gray-200/50 active:scale-80 transition-all">
                        <ArrowLeft className="w-4 h-4 text-[#2076C7]" strokeWidth={2} />
                    </div>
                </button>
                <button
                    onClick={handleBackOffers}
                    className="hidden md:inline-flex items-center gap-2 px-4 py-2 text-sm font-medium text-gray-700 bg-white/90 backdrop-blur-sm rounded-lg border border-gray-300 hover:bg-white shadow-lg active:scale-95 transition-all group cursor-pointer"
                >
                    <ArrowLeft className="w-4 h-4 text-[#2076C7] group-hover:-translate-x-1 transition-transform" strokeWidth={2} />
                    Back to Offers
                </button>
            </div>

            <div className="bg-white min-h-screen font-sans">
                {/* Hero Content Section */}
                {/* Hero Content Section */}
                <section
                    className="relative py-20 lg:py-28 overflow-hidden bg-white"
                >
                    {/* Animated background shapes */}
                    <div className="absolute inset-0 overflow-hidden">
                        <div
                            className="absolute -top-40 -right-40 w-80 h-80 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-pulse"
                            style={{ backgroundColor: "rgba(28, 202, 163, 0.3)" }}
                        ></div>

                        <div
                            className="absolute -bottom-40 -left-40 w-80 h-80 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-pulse"
                            style={{
                                backgroundColor: "rgba(32, 118, 199, 0.3)",
                                animationDelay: "1s",
                            }}
                        ></div>

                        <div
                            className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-pulse"
                            style={{
                                backgroundColor: "rgba(28, 202, 163, 0.2)",
                                animationDelay: "2s",
                            }}
                        ></div>
                    </div>

                    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
                        <div className="grid lg:grid-cols-2 gap-12 items-center">

                            {/* Left Content */}
                            <div className="text-left">

                                <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[#E6F7F6] border border-[#1CADA3]/20 mb-6 w-fit">

                                    <span className="text-xs font-bold text-[#1CADA3] tracking-wider uppercase">Comprehensive Health Protection</span>
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
                                    className="text-xl md:text-2xl text-gray-600 max-w-xl leading-relaxed mb-10">
                                    Secure your family&apos;s future with India&apos;s most trusted health insurance plans.
                                </motion.p>

                                <motion.div
                                    initial={{ opacity: 0, y: 20 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ delay: 0.2 }}
                                    className="flex flex-wrap gap-5 pt-4">
                                    <button
                                        onClick={() => handleApply('General Health Plan')}
                                        className="group relative px-8 py-4 rounded-xl font-bold text-sm md:text-base text-white shadow-lg hover:brightness-110 transform hover:-translate-y-1 transition-all duration-300 cursor-pointer overflow-hidden"
                                        style={{ background: "linear-gradient(to right, #2076C7, #1CADA3)" }}>
                                        <span className="relative z-10 flex items-center gap-2">
                                            Apply Now <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                                        </span>
                                    </button>
                                </motion.div>
                            </div>

                            {/* Updated Image Section */}
                            <motion.div
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                transition={{ duration: 1, delay: 0.2 }}
                                className="relative h-[350px] sm:h-[450px] md:h-[500px] lg:h-[500px] mt-8 lg:mt-0 flex items-center justify-center"
                            >
                                <img
                                    src="/insurance/health.jpeg"
                                    alt="Health insurance illustration"
                                    className="w-full h-full object-cover rounded-3xl shadow-2xl"
                                />
                            </motion.div>

                        </div>
                    </div>
                </section>



                {/* Plans Section */}
                <section className="py-12 md:py-16 bg-white border-t border-gray-100">
                    <div className="max-w-7xl mx-auto px-4 text-center">
                        <div className="mb-12">
                            <h2 className="text-3xl md:text-4xl font-extrabold font-sans mb-3 bg-linear-to-r from-[#2076C7] to-[#1CADA3] bg-clip-text text-transparent drop-shadow-sm">
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
                                    <Search className="absolute left-5 top-1/2 -translate-y-1/2 text-[#2076C7]" size={18} />
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
                <section id="calculator" className="py-12 md:py-16 bg-white relative overflow-hidden text-gray-900 border-t border-gray-100">
                    <div className="max-w-7xl mx-auto px-4 text-center mb-12">
                        <h2 className="text-3xl md:text-4xl font-extrabold font-sans mb-3 bg-linear-to-r from-[#2076C7] to-[#1CADA3] bg-clip-text text-transparent drop-shadow-sm">
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
                <section className="py-12 md:py-16 bg-white relative overflow-hidden border-y border-gray-100">
                    <div className="max-w-7xl mx-auto px-4 relative z-10">
                        <div className="grid lg:grid-cols-2 gap-16 items-center">
                            <div>
                                <h2 className="text-3xl md:text-4xl font-extrabold font-sans mb-3 bg-linear-to-r from-[#2076C7] to-[#1CADA3] bg-clip-text text-transparent drop-shadow-sm">
                                    Coverage Details
                                </h2>
                                <p className="text-xl text-gray-500 font-light mb-12">
                                    Comprehensive protection for your most valuable asset—your health.
                                </p>
                                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
                                    {[
                                        { icon: <Hospital className="text-[#2076C7]" />, text: "Hospitalization (Room, ICU, Surgery)" },
                                        { icon: <TestTube className="text-[#1CADA3]" />, text: "Diagnostic Tests (Blood, Scans)" },
                                        { icon: <Pill className="text-[#2076C7]" />, text: "Medicines & Pharmacy" },
                                        { icon: <Ambulance className="text-[#1CADA3]" />, text: "Emergency Ambulance" },
                                        { icon: <FileSearch className="text-[#2076C7]" />, text: "Pre & Post Hospitalization" },
                                        { icon: <Brain className="text-[#1CADA3]" />, text: "Mental Health Care" }
                                    ].map((item, idx) => (
                                        <div key={idx} className="flex items-center gap-4 p-4 bg-white rounded-lg border border-gray-100 shadow-sm">
                                            <div className="w-10 h-10 rounded-lg bg-gray-50 flex items-center justify-center shrink-0">
                                                {item.icon}
                                            </div>
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
                                            { title: "Individual Health Insurance", desc: "Covers one person with dedicated sum insured.", icon: <Users2 className="text-[#2076C7]" /> },
                                            { title: "Family Floater Plan", desc: "Covers the whole family under one sum insured.", icon: <Users2 className="text-[#1CADA3]" /> },
                                            { title: "Group Health Insurance", desc: "Provided by employers for employees.", icon: <ShieldCheck className="text-[#2076C7]" /> },
                                            { title: "Senior Citizen Plans", desc: "Tailored for people above 60 years.", icon: <HeartPulse className="text-[#1CADA3]" /> },
                                            { title: "Critical Illness Plans", desc: "Covers major diseases like cancer, heart attack.", icon: <Activity className="text-[#2076C7]" /> }
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
                <section className="py-12 md:py-16 bg-white relative overflow-hidden border-b border-gray-100">
                    <div className="max-w-7xl mx-auto px-4 relative z-10">
                        <div className="text-center mb-16">
                            <h2 className="text-3xl md:text-4xl font-extrabold font-sans mb-3 bg-linear-to-r from-[#2076C7] to-[#1CADA3] bg-clip-text text-transparent drop-shadow-sm">
                                Documentation Simplified
                            </h2>
                            <p className="text-xl text-gray-500 font-light">Everything you need to get started and claim hassle-free.</p>
                        </div>

                        <div className="grid lg:grid-cols-2 gap-12">
                            <div className="bg-neutral-50 p-10 rounded-2xl border border-gray-100">
                                <h3 className="text-2xl font-bold text-gray-900 mb-8 flex items-center gap-3">
                                    <FileText className="text-[#2076C7]" />
                                    For Policy Application
                                </h3>
                                <div className="grid sm:grid-cols-2 gap-6">
                                    {[
                                        { title: "Identity Proof", desc: "Aadhar Card / PAN Card", icon: <UserPlus className="text-[#2076C7]" /> },
                                        { title: "Bank Details", desc: "Canceled Cheque / Passbook", icon: <CreditCard className="text-[#1CADA3]" /> },
                                        { title: "Nominee Info", desc: "Name, Age & Relationship", icon: <Users2 className="text-[#2076C7]" /> },
                                        { title: "Medical Proof", desc: "Previous reports (if any)", icon: <StethoscopeIcon className="text-[#1CADA3]" /> }
                                    ].map((doc, idx) => (
                                        <div key={idx} className="bg-white p-6 rounded-lg shadow-sm border border-gray-50 group hover:border-[#2076C7]/20 transition-all">
                                            <div className="w-12 h-12 rounded-xl bg-gray-50 flex items-center justify-center mb-4">
                                                {doc.icon}
                                            </div>
                                            <h4 className="font-bold text-gray-900 mb-1">{doc.title}</h4>
                                            <p className="text-xs text-gray-500 font-medium leading-relaxed">{doc.desc}</p>
                                        </div>
                                    ))}
                                </div>
                            </div>

                            <div className="space-y-6">
                                <div className="bg-neutral-50 p-8 rounded-2xl border border-gray-100">
                                    <h3 className="text-xl font-bold text-gray-900 mb-6 flex items-center gap-3">
                                        <ShieldCheck className="text-[#1CADA3]" />
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
                                                <li className="flex items-center gap-2">• Doctor&apos;s Prescriptions</li>
                                            </ul>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>

                {/* Process Overview Section */}
                <section className="py-12 md:py-16 bg-white relative overflow-hidden border-b border-gray-100 text-gray-700">
                    <div className="max-w-7xl mx-auto px-4 relative z-10">
                        <div className="text-center mb-16">
                            <h2 className="text-3xl md:text-4xl font-extrabold font-sans mb-3 bg-linear-to-r from-[#2076C7] to-[#1CADA3] bg-clip-text text-transparent drop-shadow-sm">
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
                                    <div className="w-20 h-20 mx-auto rounded-xl shadow-xl flex items-center justify-center text-white mb-6 transition-all transform"
                                        style={{ background: 'linear-gradient(to right, #2076C7, #1CADA3)' }}
                                    >
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
                </section >

                {/* Eligibility Section */}
                < section className="py-12 md:py-16 bg-white relative overflow-hidden border-t border-gray-100" >
                    <div className="max-w-7xl mx-auto px-3 sm:px-4 relative z-10">
                        <div className="grid md:grid-cols-2 gap-10 md:gap-16 items-start">
                            <div className="min-w-0">
                                <h2 className="text-3xl md:text-4xl font-extrabold font-sans mb-3 bg-linear-to-r from-[#2076C7] to-[#1CADA3] bg-clip-text text-transparent drop-shadow-sm">
                                    Eligibility Criteria
                                </h2>
                                <p className="text-base sm:text-xl text-gray-500 font-light mb-8 sm:mb-12">
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
                                        <div key={idx} className="flex gap-3 sm:gap-4 items-start group min-w-0">
                                            <div className="p-1 rounded-lg bg-[#2076C7]/20 text-[#2076C7] mt-1 shrink-0">
                                                <CheckCircle2 className="w-4 h-4 sm:w-5 sm:h-5" />
                                            </div>
                                            <div className="min-w-0 flex-1">
                                                <span className="block text-gray-500 text-[10px] sm:text-sm font-bold uppercase tracking-widest group-hover:text-[#2076C7] transition-colors truncate">
                                                    {item.k}
                                                </span>
                                                <span className="text-sm sm:text-lg font-bold text-gray-900 break-words block leading-snug">
                                                    {item.v}
                                                </span>
                                            </div>
                                        </div>
                                    ))}
                                </div>

                                <div className="mt-10 sm:mt-12 overflow-hidden rounded-lg border border-gray-200 shadow-sm">
                                    <div className="overflow-x-auto custom-scrollbar-horizontal pb-1">
                                        <table className="w-full text-left bg-white min-w-[380px]">
                                            <thead className="bg-gray-50">
                                                <tr>
                                                    <th className="px-4 sm:px-6 py-3 sm:py-4 text-[10px] font-bold uppercase tracking-widest text-gray-500">Criteria</th>
                                                    <th className="px-4 sm:px-6 py-3 sm:py-4 text-[10px] font-bold uppercase tracking-widest text-gray-500">Requirement</th>
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
                                                        <td className="px-4 sm:px-6 py-3 sm:py-4 font-bold text-gray-900 text-xs sm:text-base">{k}</td>
                                                        <td className="px-4 sm:px-6 py-3 sm:py-4 text-gray-600 font-medium text-xs sm:text-base">{v}</td>
                                                    </tr>
                                                ))}
                                            </tbody>
                                        </table>
                                    </div>
                                </div>
                            </div>

                            <div className="mt-10 lg:mt-0">
                                <div className="bg-white p-5 sm:p-10 rounded-2xl shadow-2xl border border-gray-100">
                                    <h3 className="text-xl sm:text-2xl font-bold text-gray-900 mb-6 sm:mb-8 uppercase tracking-tighter text-center sm:text-left">Who Should Consider?</h3>
                                    <div className="grid gap-4 sm:gap-6">
                                        {/* Benefits / Who should consider */}
                                        {[
                                            { title: "Working Professionals", desc: "Protect savings from sudden medical expenses.", icon: <Zap size={22} className="text-[#2076C7]" /> },
                                            { title: "Families", desc: "Covers spouse and children under one plan.", icon: <Users2 size={22} className="text-[#1CADA3]" /> },
                                            { title: "Senior Citizens", desc: "Higher risk of illness with age requires special care.", icon: <HeartPulse size={22} className="text-[#2076C7]" /> },
                                            { title: "Young Adults", desc: "Lower premiums by starting early and completing waiting periods.", icon: <Activity size={22} className="text-[#1CADA3]" /> }
                                        ].map((person, idx) => (
                                            <div key={idx} className="flex gap-3 sm:gap-4 p-4 sm:p-5 rounded-lg bg-gray-50/50 border border-transparent hover:border-primary/20 transition-all group min-w-0">
                                                <div className="w-10 h-10 sm:w-12 sm:h-12 bg-white rounded-lg shadow-sm flex items-center justify-center group-hover:scale-110 transition-transform shrink-0 border border-gray-100">
                                                    {person.icon}
                                                </div>
                                                <div className="min-w-0 flex-1">
                                                    <h4 className="font-bold text-gray-900 text-sm sm:text-base truncate">{person.title}</h4>
                                                    <p className="text-[10px] sm:text-xs text-gray-500 font-medium line-clamp-2">{person.desc}</p>
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                    <div className="mt-6 sm:mt-8 pt-6 sm:pt-8 border-t border-gray-100 flex justify-center sm:justify-start">
                                        <button
                                            onClick={() => document.getElementById('plans-grid')?.scrollIntoView({ behavior: 'smooth' })}
                                            className="px-8 py-3 sm:py-4 bg-gradient-to-r from-[#2076C7] to-[#1CADA3] text-white rounded-xl font-bold tracking-widest text-sm md:text-base shadow-lg shadow-[#2076C7]/15 hover:scale-[1.02] active:scale-[0.98] transition-all cursor-pointer"
                                        >
                                            VIEW PLANS
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </section >


                <section className="py-12 md:py-16 bg-white font-sans">
                    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
                        <motion.div initial="hidden" whileInView="visible" className="text-center mb-16">
                            <section className="mb-10">
                                <div className="max-w-4xl mx-auto bg-yellow-50 border border-yellow-200 rounded-xl p-6 shadow-sm">
                                    <p className="text-sm text-gray-700 text-center leading-relaxed">
                                        <strong className="text-black">Disclaimer:</strong> Insurance plans, coverage limits, and policy terms are subject to change based on the insurer's internal policies and your eligibility profile. Final approval is at the sole discretion of the respective insurance providers.
                                    </p>
                                </div>
                            </section>
                            <h2 className="text-3xl md:text-4xl font-extrabold font-sans mb-3 bg-linear-to-r from-[#2076C7] to-[#1CADA3] bg-clip-text text-transparent drop-shadow-sm">
                                Frequently Asked Questions
                            </h2>
                            <p className="text-gray-600 max-w-2xl mx-auto text-lg leading-relaxed font-light">
                                Got questions about health insurance? We&apos;ve got answers.
                            </p>
                        </motion.div>

                        <div className="space-y-4">
                            {[
                                { q: "How quickly can I get the policy?", a: "Instantly! After payment, policy document reaches your email within 5 minutes." },
                                { q: "Are pre-existing diseases covered?", a: "Yes, after the waiting period (usually 2-4 years depending on condition)." },
                                { q: "Can I use it for parents?", a: "Absolutely. Our Family Floater and Senior Citizen plans cover parents." },
                                { q: "Is there any medical test required?", a: "For most plans up to ₹50 Lakhs and age below 55, no medical test needed." },
                                { q: "How do I claim?", a: "Go to any network hospital, show your digital card - no cash needed." },
                                { q: "Can I increase cover later?", a: "Yes, at the time of renewal you can upgrade your sum insured." },
                                { q: "What are the common exclusions?", a: "Expenses like cosmetic surgery, intentional self-injury, and dental treatments (unless due to accident) are typically not covered." },
                                { q: "Are tax benefits available?", a: "Yes, premiums qualify for tax deductions under Section 80D (up to ₹25,000 for self/family and ₹50,000 for senior citizen parents)." },
                                { q: "Does it cover maternity expenses?", a: "Many silver and gold plans cover maternity after 2-4 years, including newborn baby cover." },
                                { q: "What is a waiting period?", a: "A specific period (30 days for new illnesses, 2-4 years for pre-existing) before certain conditions are covered." },
                                { q: "Individual vs Family Floater?", a: "Individual plans cover one person. Family floater covers the entire family under a single shared sum insured." },
                                { q: "Is daycare treatment covered?", a: "Yes, modern plans cover daycare procedures like cataract or dialysis that require less than 24 hours of hospitalization." }
                            ].slice(0, showAllFaqs ? 12 : 5).map((faq, idx) => (
                                <motion.div
                                    key={idx}
                                    initial={{ opacity: 0, y: 20 }}
                                    whileInView={{ opacity: 1, y: 0 }}
                                    viewport={{ once: true }}
                                    className="border border-gray-100 rounded-2xl overflow-hidden transition-all duration-300 hover:border-[#2076C7]/30 hover:shadow-md"
                                >
                                    <button
                                        onClick={() => setOpenFaq(openFaq === idx ? null : idx)}
                                        className="w-full px-4 sm:px-6 py-3 sm:py-4 text-left flex justify-between items-start gap-3 bg-white hover:bg-blue-50/50 transition-colors focus:outline-none cursor-pointer group"
                                    >
                                        <span className="font-bold text-gray-700 text-base sm:text-lg pr-2 group-hover:text-[#2076C7] transition-colors">{faq.q}</span>
                                        <div className={`p-1.5 rounded-full bg-white border border-gray-300 text-gray-700 transition-transform duration-300 ${openFaq === idx ? 'rotate-180' : ''}`}>
                                            {openFaq === idx ? <Minus size={18} strokeWidth={3} /> : <Plus size={18} strokeWidth={3} />}
                                        </div>
                                    </button>
                                    <AnimatePresence>
                                        {openFaq === idx && (
                                            <motion.div
                                                initial={{ height: 0, opacity: 0 }}
                                                animate={{ height: "auto", opacity: 1 }}
                                                exit={{ height: 0, opacity: 0 }}
                                                transition={{ duration: 0.3, ease: "easeInOut" }}
                                            >
                                                <div className="px-6 py-6 bg-white text-gray-600 text-base leading-relaxed border-t border-gray-100 italic">
                                                    {faq.a}
                                                </div>
                                            </motion.div>
                                        )}
                                    </AnimatePresence>
                                </motion.div>
                            ))}
                        </div>

                        <div className="text-center mt-12">
                            <button
                                onClick={() => setShowAllFaqs(!showAllFaqs)}
                                className="inline-flex items-center gap-2 px-8 py-3.5 rounded-full bg-blue-50 text-[#2076C7] font-bold hover:bg-blue-100 transition-all cursor-pointer shadow-sm active:scale-95"
                            >
                                {showAllFaqs ? 'View Less' : 'View More Questions'}
                                <Plus className={`w-5 h-5 transition-transform duration-300 ${showAllFaqs ? 'rotate-45' : ''}`} />
                            </button>
                        </div>
                    </div>
                </section>

                <CTASection />

                <HealthInsuranceApplyForm
                    isOpen={isApplyModalOpen}
                    onClose={() => setIsApplyModalOpen(false)}
                    planName={selectedPlan}
                />
                <Chatbot />
            </div >
            <ScrollToTop />
        </>
    );
};

export default HealthInsurancePage;
