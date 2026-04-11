'use client';

import React, { useState, useMemo, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import {
    ArrowRight,
    ArrowLeft,
    Search,
    Plus,
    Minus,
    HelpCircle,
    Zap,
    ShieldCheck,
    Scale,
    Box,
    Ship,
    Anchor,
    IndianRupee
} from 'lucide-react';

// Components
import MarineInsuranceCalculator from './components/MarineInsuranceCalculator';
import MarineInsurancePlanCard from './components/MarineInsurancePlanCard';
import MarineInsuranceCharts from './components/MarineInsuranceCharts';
import MarineInsuranceTable from './components/MarineInsuranceTable';
import MarineInsuranceApplyForm from './components/MarineInsuranceApplyForm';
import CTASection from '@/app/component/CTASection';
import Chatbot from '@/app/component/chatbot/page';
import ScrollToTop from '@/app/component/ScrollToTop';
import { useModal } from '@/app/context/ModalContext';

const MarineHeroVisual = () => {
    return (
        <div className="relative w-full h-[350px] sm:h-[450px] md:h-[500px] lg:h-[550px] flex items-center justify-center overflow-hidden">
            {/* Minimalist Grid Background */}
            <div className="absolute inset-0 opacity-10">
                <svg width="100%" height="100%" className="absolute inset-0">
                    <defs>
                        <pattern id="marine-grid" width="60" height="60" patternUnits="userSpaceOnUse">
                            <path d="M 60 0 L 0 0 0 60" fill="none" stroke="#2076C7" strokeWidth="1" />
                        </pattern>
                    </defs>
                    <rect width="100%" height="100%" fill="url(#marine-grid)" />
                </svg>
            </div>

            {/* Main Centerpiece */}
            <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.8 }}
                className="relative z-20 scale-[0.6] sm:scale-[0.8] md:scale-90 lg:scale-100"
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
                                style={{ background: 'linear-gradient(to bottom right, #2076C7, #1CADA3, #2076C7)' }}
                            >
                                <Ship className="text-white w-12 h-12" />
                            </div>
                            <span className="text-primary font-bold text-[10px] tracking-[0.4em] uppercase">
                                Marine Shield
                            </span>
                        </div>
                    </motion.div>

                    {/* Clean Info Tags */}
                    {[
                        { icon: Anchor, label: "ANCHORED", pos: "-top-6 -right-12", color: "#2076C7" },
                        { icon: Box, label: "SECURE", pos: "bottom-12 -right-16", color: "#1CADA3" },
                        { icon: ShieldCheck, label: "EXPERT", pos: "top-16 -left-16", color: "#2076C7" }
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

const marinePlansData = [
    {
        name: "ICICI Lombard – Marine Cargo Insurance",
        carrier: "By ICICI Lombard General Insurance",
        category: "Cargo",
        bestFor: "SMEs & Exporters",
        coverageType: "Open Policy / Specific Transit",
        coverageScope: "Global Transit",
        sumInsured: "CIF Value + 10%",
        color: "#2076C7",
        keyBenefits: [
            "Institute Cargo Clauses (A, B, C)",
            "Door-to-Door Coverage",
            "War & Strike Add-on Option",
            "Fast Digital Claim Process",
            "Global Risk Coverage"
        ]
    },
    {
        name: "Tata AIG – Marine Insurance Policy",
        carrier: "By Tata AIG General Insurance",
        category: "Hull",
        bestFor: "SMEs & Exporters",
        coverageType: "Open Policy / Specific Transit",
        coverageScope: "Global Transit",
        sumInsured: "CIF Value + 10%",
        color: "#1CADA3",
        keyBenefits: [
            "All Risk Coverage Option",
            "Loading & Unloading Risk Protection",
            "Port & Warehouse Cover",
            "International Shipment Protection",
            "Dedicated Marine Claim Support"
        ]
    },
    {
        name: "HDFC Ergo – Marine Transit Insurance",
        carrier: "By HDFC ERGO General Insurance",
        category: "Transit",
        bestFor: "SMEs & Exporters",
        coverageType: "Open Policy / Specific Transit",
        coverageScope: "Global Transit",
        sumInsured: "CIF Value + 10%",
        color: "#2076C7",
        keyBenefits: [
            "Theft & Accident Coverage",
            "Storm & Natural Disaster Cover",
            "Affordable Premium Rates",
            "Quick Claim Settlement",
            "Wide Network of Surveyors"
        ]
    },
    {
        name: "Bajaj Allianz – Marine Cargo Insurance",
        carrier: "By Bajaj Allianz General Insurance",
        category: "Cargo",
        bestFor: "SMEs & Exporters",
        coverageType: "Open Policy / Specific Transit",
        coverageScope: "Global Transit",
        sumInsured: "CIF Value + 10%",
        color: "#1CADA3",
        keyBenefits: [
            "Institute Cargo Clauses (A/B/C)",
            "Optional War Risk Cover",
            "Warehouse-to-Warehouse Protection",
            "Customizable Coverage"
        ]
    },
    {
        name: "SBI General – Marine Cargo Insurance",
        carrier: "By SBI General Insurance",
        category: "Cargo",
        bestFor: "SMEs & Exporters",
        coverageType: "Open Policy / Specific Transit",
        coverageScope: "Global Transit",
        sumInsured: "CIF Value + 10%",
        color: "#2076C7",
        keyBenefits: [
            "Institute Cargo Clauses (A/B/C)",
            "Theft & Pilferage Cover",
            "Storm & Natural Calamity Protection",
            "Door-to-Door Coverage",
            "Dedicated Marine Claims Team"
        ]
    },
    {
        name: "Reliance General – Marine Insurance Policy",
        carrier: "By Reliance General Insurance",
        category: "Cargo",
        bestFor: "SMEs & Exporters",
        coverageType: "Open Policy / Specific Transit",
        coverageScope: "Global Transit",
        sumInsured: "CIF Value + 10%",
        color: "#1CADA3",
        keyBenefits: [
            "All Risk Cargo Coverage",
            "Loading & Unloading Risk Protection",
            "War & Strike Add-on Option",
            "Flexible Coverage Terms",
            "Quick Claim Assistance"
        ]
    },
    {
        name: "IFFCO Tokio – Marine Cargo Insurance",
        carrier: "By IFFCO Tokio General Insurance",
        category: "Cargo",
        bestFor: "SMEs & Exporters",
        coverageType: "Open Policy / Specific Transit",
        coverageScope: "Global Transit",
        sumInsured: "CIF Value + 10%",
        color: "#2076C7",
        keyBenefits: [
            "Institute Cargo Clause Coverage",
            "Warehouse-to-Warehouse Protection",
            "Natural Disaster & Accident Cover",
            "Competitive Premium Rates",
            "Easy Documentation"
        ]
    },
    {
        name: "Cholamandalam MS – Marine Transit Insurance",
        carrier: "By Chola MS General Insurance",
        category: "Transit",
        bestFor: "SMEs & Exporters",
        coverageType: "Open Policy / Specific Transit",
        coverageScope: "Global Transit",
        sumInsured: "CIF Value + 10%",
        color: "#1CADA3",
        keyBenefits: [
            "Theft & Accident Coverage",
            "Damage During Handling Cover",
            "Affordable Premium",
            "Quick Policy Issuance"
        ]
    },
    {
        name: "Go Digit – Marine Cargo Insurance",
        carrier: "By Digit General Insurance",
        category: "Cargo",
        bestFor: "SMEs & Exporters",
        coverageType: "Open Policy / Specific Transit",
        coverageScope: "Global Transit",
        sumInsured: "CIF Value + 10%",
        color: "#2076C7",
        keyBenefits: [
            "Simple Online Policy Issuance",
            "All Risk Cargo Coverage",
            "War & Strike Risk Option",
            "Transparent Claim Process",
            "Easy Digital Documentation"
        ]
    }
];

const MarineInsurancePage = () => {
    const router = useRouter();
    const [openFaq, setOpenFaq] = useState<number | null>(null);
    const [showAllFaqs, setShowAllFaqs] = useState(false);
    const [searchQuery, setSearchQuery] = useState('');
    const [selectedCategory, setSelectedCategory] = useState<string>('All');
    const [isApplyModalOpen, setIsApplyModalOpen] = useState(false);
    const [selectedPlan, setSelectedPlan] = useState<string | undefined>(undefined);
    const [showBackButton, setShowBackButton] = useState(true);
    const { openLogin, openSignup } = useModal();

    useEffect(() => {
        const handleScroll = () => setShowBackButton(window.scrollY < 80);
        window.addEventListener('scroll', handleScroll, { passive: true });
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    const handleBackToOffers = () => router.push('/offers');

    const handleApply = (planName: string) => {
        setSelectedPlan(planName);
        setIsApplyModalOpen(true);
    };

    const categories = ['All', 'Cargo', 'Hull', 'Transit', 'Freight'];

    const filteredPlans = useMemo(() => {
        return marinePlansData.filter(plan => {
            const matchesSearch = plan.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                plan.carrier.toLowerCase().includes(searchQuery.toLowerCase());
            const matchesCategory = selectedCategory === 'All' || plan.category === selectedCategory;
            return matchesSearch && matchesCategory;
        });
    }, [searchQuery, selectedCategory]);

    const faqs = [
        { q: "What is 'All Risks' coverage?", a: "It provides the broadest protection, covering all physical loss or damage from external causes, subject to certain standard exclusions." },
        { q: "Does it cover war and strikes?", a: "Standard policies usually exclude these, but they can be added as optional 'War & Strike' clauses for specific routes." },
        { q: "What is CIF vs FOB?", a: "CIF (Cost, Insurance, Freight) means the seller provides insurance. FOB (Free on Board) means the buyer is responsible for insurance once goods are loaded." },
        { q: "Can I get a policy for a single shipment?", a: "Yes, 'Single Voyage' policies are available for one-off shipments. For regular trade, 'Open Cover' policies are more efficient." },
        { q: "How are marine claims processed?", a: "A survey is usually required by an independent surveyor. You'll need the invoice, bill of lading, and damage report." },
        { q: "What is General Average?", a: "It is a principle of maritime law where all stakeholders in a sea venture proportionally share any losses resulting from a voluntary sacrifice of part of the ship or cargo to save the whole in an emergency." },
        { q: "Is Inland Transit covered?", a: "Yes, Marine Transit Insurance can cover goods moving domestically by road, rail, or air, as well as international shipments." }
    ];

    return (
        <div className="bg-[#f8fafd] min-h-screen font-sans relative">

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
                    className="hidden md:inline-flex items-center gap-2 px-4 py-2 text-sm font-medium text-gray-700 bg-white/90 backdrop-blur-sm rounded-lg border border-gray-300 hover:bg-white shadow-lg active:scale-95 transition-all group cursor-pointer"
                >
                    <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" strokeWidth={2} />
                    Back to Offers
                </button>
            </div>

            {/* Hero Content Section */}
            <section className="relative py-20 lg:py-28 overflow-hidden" style={{ background: 'linear-gradient(to bottom right, #f8fafd, #ffffff)' }}>
                {/* Animated background shapes */}
                <div className="absolute inset-0 overflow-hidden">
                    <div className="absolute -top-40 -right-40 w-80 h-80 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-pulse" style={{ backgroundColor: 'rgba(28, 202, 163, 0.3)' }}></div>
                    <div className="absolute -bottom-40 -left-40 w-80 h-80 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-pulse" style={{ backgroundColor: 'rgba(32, 118, 199, 0.3)', animationDelay: '1s' }}></div>
                </div>

                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
                    <div className="grid lg:grid-cols-2 gap-12 items-center">
                        <div className="text-left">
                            <div className="mb-6">
                                <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-gray-100 border border-gray-200 w-fit">
                                    <Ship className="w-4 h-4 text-[#2076C7]" />
                                    <span className="text-xs font-bold text-[#2076C7] tracking-wider uppercase">Global Transit Protection</span>
                                </div>
                            </div>

                            <motion.h1
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                className="text-5xl md:text-6xl lg:text-7xl font-sans font-bold bg-linear-to-r from-[#2076C7] via-[#1CADA3] to-[#2076C7] bg-clip-text text-transparent leading-tight mb-6 tracking-tight"
                            >
                                Get Closer to Your Goals <br />
                                with an Instant <br />
                                <span className="text-[#2076C7]">Marine Insurance</span>
                            </motion.h1>

                            <motion.p
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: 0.05 }}
                                className="text-lg md:text-xl lg:text-2xl text-gray-700 max-w-2xl leading-relaxed mb-10"
                            >
                                Protection for cargo and vessels during transit
                            </motion.p>

                            <motion.div
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: 0.2 }}
                                className="flex flex-wrap gap-5 pt-2"
                            >
                                <button
                                    onClick={openLogin}
                                    className="group relative text-white px-8 py-4 rounded-lg font-semibold text-lg bg-linear-to-r from-[#2076C7] via-[#1CADA3] to-[#2076C7] shadow-lg hover:shadow-xl transform hover:-translate-y-1 transition-all duration-300 overflow-hidden cursor-pointer"
                                    style={{ background: 'linear-gradient(to right, #2076C7, #1CADA3)' }}
                                >
                                    <span className="relative z-10 flex items-center gap-2">
                                        Consult an Advisor <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                                    </span>
                                </button>
                                <button
                                    onClick={openSignup}
                                    className="group relative text-[#2076C7] bg-white px-8 py-4 rounded-lg font-semibold text-lg border-2 border-[#2076C7] shadow-lg hover:shadow-xl transform hover:-translate-y-1 transition-all duration-300 overflow-hidden cursor-pointer"
                                >
                                    <span className="relative z-10 transition-colors duration-300 group-hover:text-white">Get Free Quote</span>
                                    <div className="absolute inset-0 transform scale-x-0 group-hover:scale-x-100 transition-transform origin-left duration-300" style={{ background: 'linear-gradient(to right, #1CADA3, #2076C7)' }}></div>
                                </button>
                            </motion.div>
                        </div>

                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ duration: 1, delay: 0.2 }}
                            className="relative h-[350px] sm:h-[450px] md:h-[500px] lg:h-[500px] mt-8 lg:mt-0"
                        >
                            <MarineHeroVisual />
                        </motion.div>
                    </div>
                </div>
            </section>

            {/* Types Section */}
            <section className="py-24 bg-[#f8fafd] border-b border-gray-100">
                <div className="max-w-7xl mx-auto px-4">
                    <div className="max-w-3xl mx-auto text-center mb-16">
                        <h2 className="text-3xl md:text-4xl font-extrabold font-sans mb-3 bg-linear-to-r from-[#2076C7] to-[#1CADA3] bg-clip-text text-transparent drop-shadow-sm">
                            Types of Marine Insurance
                        </h2>
                        <p className="text-xl text-gray-500 max-w-3xl mx-auto font-light leading-relaxed">Comprehensive solutions for every maritime risk</p>
                    </div>

                    <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
                        {[
                            { id: 1, title: "Marine Cargo Insurance", desc: "Protects goods in transit by sea, air, road, or rail.", icon: Ship, color: "#2076C7" },
                            { id: 2, title: "Hull Insurance", desc: "Covers physical damage to vessels / ships.", icon: Anchor, color: "#1CADA3" },
                            { id: 3, title: "Freight Insurance", desc: "Compensates shipping costs if goods are lost/damaged.", icon: IndianRupee, color: "#2076C7" },
                            { id: 4, title: "Marine Transit Insurance", desc: "For goods moving internationally or domestically.", icon: Box, color: "#1CADA3" }
                        ].map((type) => (
                            <div key={type.id} className="bg-white p-6 rounded-2xl border border-gray-50 shadow-sm hover:shadow-xl transition-all group">
                                <div
                                    className="w-12 h-12 rounded-xl bg-gray-50 flex items-center justify-center mb-4 transition-all"
                                    style={{ color: type.color }}
                                >
                                    <type.icon size={24} className="group-hover:scale-110 transition-transform" />
                                </div>
                                <h3 className="text-sm font-bold text-gray-900 uppercase tracking-tight mb-2">{type.id}. {type.title}</h3>
                                <p className="text-[11px] text-gray-500 font-bold leading-relaxed">{type.desc}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Plans Section */}
            <section id="plans-grid" className="py-24 bg-white">
                <div className="max-w-7xl mx-auto px-4">
                    {/* Filter Section */}
                    <div className="flex flex-col lg:flex-row items-center gap-8 mb-16">
                        <div className="relative w-full max-w-sm">
                            <Search className="absolute left-6 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
                            <input
                                type="text"
                                placeholder="SEARCH PLANS..."
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                                className="w-full h-14 pl-14 pr-6 bg-white border border-gray-100 rounded-2xl shadow-[0_4px_20px_rgb(0,0,0,0.02)] outline-none focus:ring-2 focus:ring-blue-500/10 transition-all font-bold text-gray-600 text-[11px] placeholder:text-gray-400 uppercase tracking-widest"
                            />
                        </div>

                        <div className="flex flex-wrap justify-start gap-4">
                            {categories.map((cat) => (
                                <button
                                    key={cat}
                                    onClick={() => setSelectedCategory(cat)}
                                    className={`px-6 py-2.5 rounded-full font-bold text-sm transition-all cursor-pointer whitespace-nowrap shadow-sm border ${selectedCategory === cat
                                        ? 'bg-linear-to-r from-[#2076C7] to-[#1CADA3] text-white border-transparent'
                                        : 'bg-white text-gray-600 border-gray-200 hover:border-[#1CADA3] hover:text-[#1CADA3]'
                                        }`}
                                >
                                    {cat}
                                </button>
                            ))}
                        </div>
                    </div>

                    <div className="max-h-[850px] overflow-y-auto pr-2 custom-scrollbar">
                        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 pb-8">
                            {filteredPlans.map((plan, idx) => (
                                <MarineInsurancePlanCard key={idx} {...plan} onApply={handleApply} onGetQuote={openSignup} onTalkToAdvisor={() => router.push('/contact')} />
                            ))}
                        </div>
                    </div>
                </div>
            </section>

            {/* Calculator Section */}
            <section id="calculator" className="py-24 bg-white border-y border-gray-100">
                <div className="max-w-7xl mx-auto px-4 relative z-10">
                    <MarineInsuranceCalculator />
                </div>
            </section>

            <MarineInsuranceCharts />
            <MarineInsuranceTable />

            {/* Importance Section */}
            <section className="py-24 bg-white border-y border-gray-100">
                <div className="max-w-7xl mx-auto px-4">
                    <div className="grid lg:grid-cols-2 gap-16 items-center">
                        <div className="order-2 lg:order-1">
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                                {[
                                    { icon: <Zap size={28} className="text-[#2076C7]" />, title: "Rapid Recovery", desc: "Minimize downtime after marine incidents with fast settlements.", bg: "from-[#2076C7]/10 to-[#2076C7]/20" },
                                    { icon: <ShieldCheck size={28} className="text-[#1CADA3]" />, title: "Risk Mitigation", desc: "Global protection against unpredictability on the high seas.", bg: "from-[#1CADA3]/10 to-[#1CADA3]/20" },
                                    { icon: <Scale size={28} className="text-[#2076C7]" />, title: "Legal Security", desc: "Compliance with international maritime laws and liabilities.", bg: "from-[#2076C7]/10 to-[#2076C7]/20" },
                                    { icon: <Box size={28} className="text-[#1CADA3]" />, title: "Asset Protection", desc: "Full value coverage for high-stakes cargo and vessels.", bg: "from-[#1CADA3]/10 to-[#1CADA3]/20" }
                                ].map((item, i) => (
                                    <div key={i} className="flex flex-col items-center text-center p-6 bg-white rounded-2xl shadow-md border border-gray-100 hover:shadow-xl transition-all font-sans group">
                                        <div className={`w-16 h-16 rounded-full bg-linear-to-r ${item.bg} flex items-center justify-center mb-5 shadow-sm group-hover:scale-110 transition-transform`}>
                                            {item.icon}
                                        </div>
                                        <h4 className="text-lg font-bold text-gray-900 mb-2 tracking-tight">{item.title}</h4>
                                        <p className="text-sm text-gray-600 leading-relaxed font-medium">{item.desc}</p>
                                    </div>
                                ))}
                            </div>
                        </div>
                        <div className="order-1 lg:order-2">
                            <h2 className="text-3xl md:text-4xl font-extrabold font-sans mb-3 bg-linear-to-r from-[#2076C7] to-[#1CADA3] bg-clip-text text-transparent drop-shadow-sm">
                                Why Marine Insurance <br /> is Crucial for Your Business
                            </h2>
                            <p className="text-xl text-gray-500 max-w-3xl mx-auto font-light leading-relaxed mb-8">
                                In the world of global logistics, the unexpected is the only constant. Marine insurance provides the financial bedrock to keep your operations afloat.
                            </p>
                            <div className="space-y-4">
                                {[
                                    "Financial protection against high-value cargo loss",
                                    "Essential for international trading licenses",
                                    "Covers liability in case of vessel collision",
                                    "Peace of mind for complex multi-modal transits"
                                ].map((point, i) => (
                                    <div key={i} className="flex items-start gap-3">
                                        <div className="w-5 h-5 rounded-md bg-blue-100 flex items-center justify-center mt-1">
                                            <div className="w-2 h-2 bg-blue-600 rounded-full" />
                                        </div>
                                        <span className="text-gray-700 font-bold text-sm tracking-tight">{point}</span>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* How to Choose Section */}
            <section className="py-24 bg-white border-b border-gray-100">
                <div className="max-w-7xl mx-auto px-4 text-center">
                    <div className="max-w-3xl mx-auto mb-16">
                        <h2 className="text-3xl md:text-4xl font-extrabold font-sans mb-3 bg-linear-to-r from-[#2076C7] to-[#1CADA3] bg-clip-text text-transparent drop-shadow-sm">
                            How to Choose Marine Insurance
                        </h2>
                        <p className="text-xl text-gray-500 max-w-3xl mx-auto font-light leading-relaxed">A guide for businesses and traders</p>
                    </div>

                    <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
                        {[
                            { step: "1", title: "Assess Cargo Value", desc: "Include cost of goods, freight, and a 10% buffer for contingencies." },
                            { step: "2", title: "Define Transit Route", desc: "Different ports and routes carry varying risk levels (climate, piracy)." },
                            { step: "3", title: "Select Coverage", desc: "Choose between 'All Risks' (Institute Cargo Clause A) or restricted covers." },
                            { step: "4", title: "Review Deductibles", desc: "Balance your out-of-pocket costs with the premium amount." }
                        ].map((item, idx) => (
                            <div key={idx} className="flex flex-col items-center text-center p-8 bg-white rounded-2xl shadow-md border border-gray-100 hover:shadow-xl transition-all font-sans group">
                                <div className="w-16 h-16 rounded-full bg-linear-to-r from-[#2076C7] to-[#1CADA3] flex items-center justify-center text-white font-bold text-2xl mb-6 shadow-md group-hover:scale-110 transition-transform">
                                    {item.step}
                                </div>
                                <h4 className="text-lg font-bold text-gray-900 mb-3 tracking-tight">{item.title}</h4>
                                <p className="text-sm text-gray-600 leading-relaxed font-medium">{item.desc}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Disclaimer Section Box */}
            <section className="bg-white py-12 px-4">
                <div className="max-w-4xl mx-auto bg-yellow-50 border border-yellow-200 rounded-xl p-6 shadow-sm">
                    <p className="text-sm text-gray-700 text-center leading-relaxed font-sans">
                        <strong className="text-black">Disclaimer:</strong> Marine Insurance coverage, premium rates, and policy terms are subject to the insurer&apos;s underwriting guidelines and the Maritime Laws of India. Final approval and claim settlements are at the sole discretion of the respective insurance providers.
                    </p>
                </div>
            </section>

            {/* Questions Section - Restored and Refactored */}
            <section className="py-24 bg-white font-sans border-b border-gray-100">
                <div className="max-w-4xl mx-auto px-4">
                    <div className="text-center mb-16 relative">
                        <div className="mb-4 flex justify-center">
                            <HelpCircle className="w-12 h-12 text-[#1CADA3] opacity-20" strokeWidth={1.5} />
                        </div>
                        <h2 className="text-3xl md:text-4xl font-extrabold font-sans mb-3 bg-linear-to-r from-[#2076C7] to-[#1CADA3] bg-clip-text text-transparent drop-shadow-sm">
                            Frequently Asked Questions
                        </h2>
                        <div className="w-24 h-1.5 mx-auto bg-linear-to-r from-[#2076C7] to-[#1CADA3] rounded-full"></div>
                        <p className="text-gray-600 max-w-2xl mx-auto text-lg leading-relaxed mt-4 font-light">Got questions about marine insurance? We&apos;ve got answers.</p>
                    </div>

                    <div className="space-y-4">
                        {(showAllFaqs ? faqs : faqs.slice(0, 5)).map((faq, idx) => (
                            <div
                                key={idx}
                                className="border border-gray-100 rounded-2xl overflow-hidden transition-all duration-300 hover:border-[#2076C7]/30 hover:shadow-md"
                            >
                                <button
                                    onClick={() => setOpenFaq(openFaq === idx ? null : idx)}
                                    className="w-full px-4 sm:px-6 py-4 sm:py-5 text-left flex justify-between items-start gap-3 bg-gray-50/50 hover:bg-blue-50/50 transition-colors focus:outline-none cursor-pointer group"
                                >
                                    <span className="font-bold text-gray-700 text-base sm:text-lg pr-2 group-hover:text-[#2076C7] transition-colors">{faq.q}</span>
                                    <div className={`p-1.5 rounded-full bg-white border border-gray-200 text-[#2076C7] transition-transform duration-300 ${openFaq === idx ? 'rotate-180' : ''}`}>
                                        {openFaq === idx ? <Minus size={18} strokeWidth={3} /> : <Plus size={18} strokeWidth={3} />}
                                    </div>
                                </button>

                                <AnimatePresence>
                                    {openFaq === idx && (
                                        <motion.div
                                            initial={{ height: 0, opacity: 0 }}
                                            animate={{ height: "auto", opacity: 1 }}
                                            exit={{ height: 0, opacity: 0 }}
                                            className="px-8 pb-8 bg-white"
                                        >
                                            <div className="pt-4 border-t border-gray-100 mt-2">
                                                <p className="text-sm text-gray-500 font-bold leading-relaxed">{faq.a}</p>
                                            </div>
                                        </motion.div>
                                    )}
                                </AnimatePresence>
                            </div>
                        ))}
                    </div>

                    {faqs.length > 5 && (
                        <div className="text-center mt-12">
                            <button
                                onClick={() => setShowAllFaqs(!showAllFaqs)}
                                className="inline-flex items-center gap-2 px-8 py-3.5 rounded-full bg-blue-50 text-[#2076C7] font-bold tracking-tight hover:bg-blue-100 transition-all cursor-pointer shadow-sm active:scale-95"
                            >
                                {showAllFaqs ? 'View Less' : 'View More'}
                                <Plus size={18} strokeWidth={3} className={`transition-transform duration-300 ${showAllFaqs ? 'rotate-45' : ''}`} />
                            </button>
                        </div>
                    )}
                </div>
            </section>

            <CTASection />

            <MarineInsuranceApplyForm
                isOpen={isApplyModalOpen}
                onClose={() => setIsApplyModalOpen(false)}
                planName={selectedPlan}
            />

            <Chatbot />
            <ScrollToTop />
        </div>
    );
};

export default MarineInsurancePage;
