// app/offers/loans/mortgage-loan/page.tsx
"use client";

import { useRouter } from 'next/navigation';
import { useEffect, useState, Suspense, useRef, useMemo } from 'react';
import Image from 'next/image';
import {
    CheckCircle, Clock, ShieldCheck, FileText, Users,
    TrendingUp, ArrowLeft, Home, IndianRupee, Briefcase,
    Factory, Car, Landmark, GraduationCap, Building,
    Globe, Heart, Shield, Banknote, Award, Zap, Star, Plane, PieChart, X,
    ArrowRight, User, Mail, Smartphone, Wallet, CreditCard, Ship, Anchor,
    Flame, HardHat, Building2, Trees, Gem, Landmark as Bank, Key, ShoppingBag,
    Stethoscope, Activity, Truck, MapPin, Search, Warehouse, Coins, BadgePercent,
    PiggyBank, BarChart3, Receipt, Scale, UserCheck, CircleDollarSign,
    Repeat, Wrench, Construction, ChevronDown, Plus, Minus
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

// Import local data and components
import { mortgageLoanData as offer } from './data';
import { CATEGORIES, categorizedPlans, MORTGAGE_LOAN_TYPES, PARTNER_BANKS } from './loanConstants';
import { AuthService } from "@/app/services/authService";
import MortgageLoanForm from './components/MortgageLoanForm';
import MortgageLoanCalculator from './components/MortgageLoanCalculator';
import heroImage from './mortgage-loan-hero.png';
import TiltCard from '../life-insurance/components/TiltCard';
import CTASection from '@/app/component/CTASection';
import { useModal } from '@/app/context/ModalContext';
import ScrollToTop from '@/app/component/ScrollToTop';
import Chatbot from '@/app/component/chatbot/page';



const IconMap: Record<string, any> = {
    Home,
    Building2,
    Repeat,
    Wrench,
    Construction,
    Building,
    Coins,
    Zap
};

const MORTGAGE_LOAN_FAQS = [
    { question: "What property types can I pledge?", answer: "You can pledge Residential, Commercial, and Industrial properties including vacant plots (subject to bank policy). The property must have a clear title and should be located in an approved zone." },
    { question: "How is the loan amount determined?", answer: "The loan amount is primarily based on the Market Value of your property (LTV) and your repayment capacity (Income). Typically, banks fund up to 60-70% of the property value." },
    { question: "Can I use the funds for any purpose?", answer: "Yes, unlike home loans, Mortgage Loans have no end-use restriction. Use them for business capital, higher education abroad, debt consolidation, or weddings." },
    { question: "What is Lease Rental Discounting (LRD)?", answer: "LRD is a specialized loan where you pledge the future rental income from your commercial property leased to reputed corporate / retail tenants. It offers the lowest interest rates in the mortgage category." },
    { question: "Is pre-payment allowed on Mortgage Loans?", answer: "Yes, most lenders allow part-prepayment or full foreclosure. Salaried individuals usually enjoy zero foreclosure charges on floating rate loans, while businesses might have a small fee." },
    { question: "What is the minimum and maximum tenure for a Mortgage Loan?", answer: "Tenure typically ranges from 1 year up to 15-20 years. Longer tenures are available to ensure lower EMIs, depending on the property type and applicant's age." },
    { question: "Can I get a loan against a property that is currently rented?", answer: "Absolutely. In fact, if the property is rented to a reputable tenant, you can opt for Lease Rental Discounting (LRD), which often yields higher loan amounts and better rates." },
    { question: "Are there any tax benefits on Mortgage Loans?", answer: "Tax benefits depend on the end-use. If the funds are used for business, the interest paid can be claimed as a business expense. If used for house construction/renovation, you might be eligible for deductions under Section 24." },
    { question: "How long does it take for the loan to be disbursed?", answer: "Since it involves legal and technical valuation of the property, it usually takes 7-10 working days from the date of document submission and satisfactory valuation reports." }
];

export default function MortgageLoanPage() {
    const router = useRouter();
    const { openLogin, openSignup } = useModal();
    const [isVerifying, setIsVerifying] = useState(false);
    const [isFormOpen, setIsFormOpen] = useState(false);
    const [verifiedUserData, setVerifiedUserData] = useState({ name: "", email: "", mobile: "" });
    const [activeCategory, setActiveCategory] = useState(CATEGORIES[0]);
    const [openFaq, setOpenFaq] = useState<number | null>(null);
    const [showAllFaqs, setShowAllFaqs] = useState(false);
    const [showBackButton, setShowBackButton] = useState(true);
    const [isMobile, setIsMobile] = useState(false);
    const [isChecklistOpen, setIsChecklistOpen] = useState(false);


    useEffect(() => {
        const handleResize = () => setIsMobile(window.innerWidth < 768);
        handleResize(); // Set initial value
        window.addEventListener('resize', handleResize, { passive: true });
        return () => window.removeEventListener('resize', handleResize);
    }, []);


    useEffect(() => {
        const handleScroll = () => setShowBackButton(window.scrollY < 80);
        window.addEventListener('scroll', handleScroll, { passive: true });
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    // Dynamic Filtered Partners based on Active Category
    const filteredPartners = useMemo(() => {
        const currentPlans = categorizedPlans[activeCategory] || [];
        const bankNamesInCategory = new Set(currentPlans.map(p => p.bank.toLowerCase()));

        return PARTNER_BANKS.filter(partner => {
            const partnerName = partner.name.toLowerCase();
            return Array.from(bankNamesInCategory).some(planBank =>
                partnerName.includes(planBank) || planBank.includes(partnerName)
            );
        });
    }, [activeCategory]);

    useEffect(() => {
        const title = `${offer.title} - ${offer.category} | Financial Services`;
        document.title = title;
        const description = offer.description;

        let metaDescription = document.querySelector('meta[name="description"]');
        if (metaDescription) {
            metaDescription.setAttribute('content', description);
        } else {
            metaDescription = document.createElement('meta');
            metaDescription.setAttribute('name', 'description');
            metaDescription.setAttribute('content', description);
            document.head.appendChild(metaDescription);
        }

        const canonicalUrl = `https://yourdomain.com/offers/loans/mortgage-loan`;
        let canonical = document.querySelector('link[rel="canonical"]');
        if (canonical) canonical.setAttribute('href', canonicalUrl);
        else {
            canonical = document.createElement('link');
            canonical.setAttribute('rel', 'canonical');
            canonical.setAttribute('href', canonicalUrl);
            document.head.appendChild(canonical);
        }

        // Service Schema
        const structuredData: any = {
            '@context': 'https://schema.org',
            '@type': 'Service',
            name: offer.title,
            description: description,
            provider: { '@type': 'Organization', name: 'Financial Services', url: 'https://yourdomain.com' },
            serviceType: offer.category
        };

        const script = document.createElement('script');
        script.type = 'application/ld+json';
        script.text = JSON.stringify(structuredData);
        document.head.appendChild(script);

        return () => { if (script.parentNode === document.head) document.head.removeChild(script); };
    }, [offer]);

    const breadcrumbStructuredData = {
        '@context': 'https://schema.org',
        '@type': 'BreadcrumbList',
        itemListElement: [
            { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://yourdomain.com' },
            { '@type': 'ListItem', position: 2, name: 'Offers', item: 'https://yourdomain.com/offers' },
            { '@type': 'ListItem', position: 3, name: offer.title, item: `https://yourdomain.com/offers/loans/mortgage-loan` },
        ],
    };

    const handleBackToOffers = () => router.push('/#services');
    const handleApply = () => openLogin();

    const handleVerificationSuccess = (userData: { name: string, email: string, mobile: string }) => {
        setVerifiedUserData(userData);
        setIsVerifying(false);
        setIsFormOpen(true);
    };

    return (
        <>
            <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbStructuredData) }} />
            <div className="min-h-screen bg-neutral-100 font-sans">
                {/* FIXED BACK BUTTON */}
                <div className={`fixed z-50 top-20 left-4 md:top-24 md:left-8 transition-all duration-300 ${showBackButton ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'}`}>
                    <button
                        onClick={() => router.push('/')}
                        aria-label="Back to Home"
                        className="md:hidden group flex items-center gap-2 p-2 text-gray-500"
                    >
                        <div className="p-2.5 bg-white/70 backdrop-blur-md rounded-full shadow-lg border border-gray-200/50 active:scale-80 transition-all">
                            <ArrowLeft className="w-4 h-4 text-gray-700" strokeWidth={2} />
                        </div>
                    </button>
                    <button
                        onClick={() => router.push('/')}
                        className="hidden md:inline-flex items-center gap-2 px-4 py-2 text-sm font-medium text-gray-700 bg-white/90 backdrop-blur-sm rounded-lg border border-gray-300 hover:bg-white shadow-lg active:scale-95 transition-all group"
                    >
                        <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" strokeWidth={2} />
                        Back to Home
                    </button>
                </div>

                {/* HERO SECTION */}
                <header className="relative w-full overflow-hidden pt-24 md:pt-32 pb-16 bg-white">
                    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
                        <div className="flex flex-col lg:flex-row items-center gap-12">
                            {/* Left Column: Text & CTA */}
                            <motion.div
                                initial={{ opacity: 0, x: -50 }}
                                animate={{ opacity: 1, x: 0 }}
                                transition={{ duration: 0.8, ease: "easeOut" }}
                                className="w-full lg:w-1/2 text-left space-y-8"
                            >
                                <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[#E6F7F6] border border-[#1CADA3]/20 mb-6 w-fit">
                                    <Landmark className="w-4 h-4 text-[#1CADA3]" />
                                    <span className="text-xs font-bold text-[#1CADA3] tracking-wider uppercase">Property Backed Funding</span>
                                </div>

                                <h1 className="text-5xl md:text-6xl lg:text-7xl font-sans font-bold bg-linear-to-r from-[#2076C7] via-[#1CADA3] to-[#2076C7] bg-clip-text text-transparent leading-tight mb-6 tracking-tight">
                                    <>
                                        Unlock Your <br />
                                        <span className="text-[#2076C7]">Property's Value</span> <br />
                                        with Rates as <span className="text-[#1CADA3]">Lowest</span>
                                    </>
                                </h1>

                                <p className="text-lg md:text-xl lg:text-2xl text-gray-700 max-w-2xl leading-relaxed mb-10">
                                    {offer.description}
                                </p>

                                <div className="flex flex-wrap gap-5 pt-2">
                                    <button
                                        onClick={handleApply}
                                        className="group relative text-white px-8 py-4 rounded-lg font-semibold text-lg bg-linear-to-r from-[#2076C7] via-[#1CADA3] to-[#2076C7] shadow-lg hover:shadow-xl transform hover:-translate-y-1 transition-all duration-300 overflow-hidden cursor-pointer"
                                    >
                                        <span className="relative z-10 flex items-center gap-2">
                                            Apply Now <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                                        </span>
                                    </button>
                                    <button
                                        onClick={handleApply}
                                        className="group relative text-[#2076C7] bg-white px-8 py-4 rounded-lg font-semibold text-lg border-2 border-[#2076C7] shadow-lg hover:shadow-xl transform hover:-translate-y-1 transition-all duration-300 overflow-hidden cursor-pointer"
                                    >
                                        <span className="relative z-10 transition-colors duration-300 group-hover:text-white">Consult an Advisor</span>
                                        <div className="absolute inset-0 transform scale-x-0 group-hover:scale-x-100 transition-transform origin-left duration-300" style={{ background: 'linear-gradient(to right, #1CADA3, #2076C7)' }}></div>
                                    </button>
                                </div>
                            </motion.div>

                            {/* Right Column: Visual Graphic */}
                            <motion.div
                                initial={{ opacity: 0, scale: 0.8 }}
                                animate={{ opacity: 1, scale: 1 }}
                                transition={{ duration: 1, ease: "easeOut" }}
                                className="w-full lg:w-1/2 flex items-center justify-center"
                            >
                                <div className="relative w-full aspect-[4/3] max-w-[600px] rounded-[3rem] overflow-hidden shadow-2xl">
                                    <Image
                                        src={heroImage}
                                        alt="Mortgage Loan"
                                        fill
                                        className="object-cover hover:scale-105 transition-transform duration-700"
                                        priority
                                    />

                                    {/* Floating Interest Rate Badge */}
                                    <motion.div
                                        initial={{ opacity: 0, x: 20 }}
                                        animate={{
                                            opacity: 1,
                                            x: 0,
                                            y: isMobile ? 0 : [0, -10, 0]
                                        }}
                                        transition={{
                                            opacity: { duration: 0.8, delay: 0.5 },
                                            x: { duration: 0.8, delay: 0.5 },
                                            y: isMobile ? { duration: 0.8, delay: 0.5 } : { duration: 3, repeat: Infinity, ease: "easeInOut" }
                                        }}
                                        className="absolute top-4 right-4 md:top-6 md:right-6 bg-white/90 backdrop-blur-md p-2.5 md:p-3.5 rounded-2xl shadow-xl border border-white/50 z-20 flex items-center gap-2.5 min-w-[140px]"
                                    >
                                        <div className="w-8 h-8 rounded-xl bg-blue-100 flex items-center justify-center text-[#2076C7] shrink-0">
                                            <TrendingUp className="w-4 h-4" />
                                        </div>
                                        <div>
                                            <div className="text-[8px] text-gray-500 font-bold uppercase tracking-widest mb-0.5">Rates From</div>
                                            <div className="text-sm font-extrabold text-[#2076C7]">8.20% <span className="text-[10px] font-medium text-gray-400">*</span></div>
                                        </div>
                                    </motion.div>

                                    {/* Floating Funding Badge */}
                                    <motion.div
                                        initial={{ opacity: 0, x: -20 }}
                                        animate={{
                                            opacity: 1,
                                            x: 0,
                                            y: isMobile ? 0 : [0, 10, 0]
                                        }}
                                        transition={{
                                            opacity: { duration: 0.8, delay: 0.7 },
                                            x: { duration: 0.8, delay: 0.7 },
                                            y: isMobile ? { duration: 0.8, delay: 0.7 } : { duration: 3.5, repeat: Infinity, ease: "easeInOut" }
                                        }}
                                        className="absolute bottom-4 left-4 md:bottom-6 md:left-6 bg-white/90 backdrop-blur-md p-2.5 md:p-3.5 rounded-2xl shadow-xl border border-white/50 z-20 flex items-center gap-2.5 min-w-[140px]"
                                    >
                                        <div className="w-8 h-8 rounded-xl bg-teal-100 flex items-center justify-center text-[#1CADA3] shrink-0">
                                            <ShieldCheck className="w-4 h-4" />
                                        </div>
                                        <div>
                                            <div className="text-[8px] text-gray-500 font-bold uppercase tracking-widest mb-0.5">Max Funding</div>
                                            <div className="text-sm font-extrabold text-[#2076C7]">Up to 70%</div>
                                        </div>
                                    </motion.div>
                                </div>
                            </motion.div>
                        </div>
                    </div>

                    {/* Bottom Wave Transition Shape */}
                    <div className="absolute bottom-0 left-0 w-full overflow-hidden leading-[0]">
                        <svg className="relative block w-full h-[80px]" viewBox="0 0 1200 120" preserveAspectRatio="none">
                            <path d="M321.39,56.44c58-10.79,114.16-30.13,172-41.86,82.39-16.72,168.19-17.73,250.45-.39C823.78,31,906.67,72,985.66,92.83c70.05,18.48,146.53,26.09,214.34,3V120H0V27.35A600.21,600.21,0,0,0,321.39,56.44Z" fill="#FFFFFF"></path>
                        </svg>
                    </div>
                </header>

                {/* VARIANTS GRID */}
                <section className="py-12 md:py-16 bg-white relative overflow-hidden">
                    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                        <motion.div
                            initial="hidden"
                            whileInView="visible"
                            viewport={{ once: true }}
                            className="text-center mb-16"
                        >
                            <motion.h2 className="text-3xl md:text-4xl font-extrabold font-sans mb-3 bg-linear-to-r from-[#2076C7] to-[#1CADA3] bg-clip-text text-transparent drop-shadow-sm">
                                Choose Your Solution
                            </motion.h2>

                            <motion.p className="text-xl text-gray-500 max-w-3xl mx-auto font-light leading-relaxed">
                                Different assets require different strategies. Explore our specialized mortgage programs.
                            </motion.p>
                        </motion.div>

                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                            {MORTGAGE_LOAN_TYPES.map((type, index) => {
                                const IconComponent = IconMap[type.icon] || Landmark;
                                return (
                                    <TiltCard key={index}>
                                        <motion.div
                                            initial={{ opacity: 0, y: 30 }}
                                            whileInView={{ opacity: 1, y: -4 }}
                                            viewport={{ once: true }}
                                            transition={{ delay: index * 0.1 }}
                                            className="group relative bg-white rounded-[2.5rem] p-6 border border-gray-200/50 shadow-xl transition-all duration-500 flex flex-col h-full overflow-hidden items-center text-center"
                                        >

                                            {/* Top corner decoration */}
                                            <div className="absolute top-0 right-0 w-16 h-16 bg-[#F8FAFC] rounded-bl-[1.5rem] -mr-8 -mt-8" />

                                            {/* Icon Box */}
                                            <div className="self-center mb-4 w-14 h-14 rounded-2xl bg-linear-to-r from-[#2076C7] via-[#1CADA3] to-[#2076C7] flex items-center justify-center shrink-0">
                                                <IconComponent className="w-7 h-7 text-white" />
                                            </div>

                                            {/* Content Header */}
                                            <h3 className="text-xl font-extrabold font-sans text-gray-800 leading-tight mb-2 text-center w-full">
                                                {type.title}
                                            </h3>

                                            <p className="text-gray-500 mb-4 leading-relaxed text-sm text-center w-full">
                                                {type.description}
                                            </p>

                                            {/* Sections */}
                                            <div className="space-y-4 flex-grow w-full max-w-[260px] mx-auto">
                                                <div className="space-y-1.5 text-left">
                                                    <span className="text-[10px] font-black text-[#1CADA3] uppercase tracking-[0.1em]">Benefits:</span>
                                                    <ul className="space-y-2">
                                                        {type.benefits.map((benefit, i) => (
                                                            <li key={i} className="flex items-start gap-3 text-sm text-gray-600">
                                                                <CheckCircle className="w-4 h-4 text-[#2076C7] mt-0.5 shrink-0" />
                                                                <span className="font-medium">{benefit}</span>
                                                            </li>
                                                        ))}
                                                    </ul>
                                                </div>
                                            </div>

                                            {/* Action Button */}
                                            <button
                                                onClick={() => {
                                                    openSignup();
                                                }}
                                                className="mt-8 relative inline-flex items-center justify-center gap-3 px-8 py-4 bg-linear-to-r from-[#2076C7] via-[#1CADA3] to-[#2076C7] text-white rounded-2xl font-bold font-sans text-lg overflow-hidden transition-all duration-300 shadow-[0_15px_30px_-10px_rgba(28,173,163,0.4)] self-center group/btn cursor-pointer active:scale-95"
                                            >
                                                <div className="absolute inset-0 bg-white/20 translate-y-full group-hover/btn:translate-y-0 transition-transform duration-300 ease-out" />
                                                <span className="relative z-10 flex items-center gap-2">
                                                    Apply now
                                                    <ArrowRight className="w-5 h-5 group-hover/btn:translate-x-1 transition-transform" />
                                                </span>
                                            </button>
                                        </motion.div>
                                    </TiltCard>
                                );
                            })}
                        </div>
                    </div>
                </section>


                {/* PARTNER BANKS SECTION */}
                <section id="partners-section" className="py-12 md:py-16 bg-white">
                    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                        <div className="bg-white rounded-[40px] p-8 md:p-12 shadow-inner border border-gray-100 relative overflow-hidden">
                            {/* Decorative Background */}
                            <div className="absolute top-0 right-0 w-64 h-64 bg-linear-to-br from-[#2076C7]/5 to-transparent rounded-full blur-3xl -mr-32 -mt-32" />

                            <div className="relative z-10 flex flex-col items-center justify-center text-center gap-6 mb-12">
                                <div className="text-center">
                                    <h2 className="text-3xl md:text-4xl font-extrabold font-sans mb-3 bg-linear-to-r from-[#2076C7] to-[#1CADA3] bg-clip-text text-transparent drop-shadow-sm">Our Partner Banks</h2>

                                    <p className="text-gray-500 font-medium">Top-rated financial institutions supporting your {activeCategory.toLowerCase()} needs</p>
                                </div>
                            </div>

                            {/* CATEGORY TABS FOR PARTNERS */}
                            <div className="mb-10 relative z-10">
                                <div className="flex flex-nowrap items-center gap-2 md:gap-4 p-2 bg-white rounded-2xl border border-gray-100 w-full overflow-x-auto no-scrollbar justify-start lg:justify-center">
                                    {CATEGORIES.map((category) => (
                                        <button
                                            key={category}
                                            onClick={() => setActiveCategory(category)}
                                            className={`px-4 md:px-6 py-2.5 rounded-xl text-xs md:text-sm font-bold transition-all duration-300 whitespace-nowrap ${activeCategory === category
                                                ? 'bg-gradient-to-r from-[#2076C7] via-[#1CADA3] to-[#2076C7] text-white shadow-md'
                                                : 'text-gray-500 hover:bg-white hover:text-[#2076C7]'
                                                }`}
                                        >
                                            {category}
                                        </button>
                                    ))}
                                </div>
                            </div>

                            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6 relative z-10">
                                <AnimatePresence mode="popLayout">
                                    {filteredPartners.length > 0 ? (
                                        filteredPartners.map((bank, index) => (
                                            <TiltCard key={bank.name}>
                                                <motion.div
                                                    layout
                                                    initial={{ opacity: 0, scale: 0.9 }}
                                                    animate={{ opacity: 1, scale: 1 }}
                                                    exit={{ opacity: 0, scale: 0.9 }}
                                                    transition={{ duration: 0.3, delay: index * 0.05 }}
                                                    className="bg-white border border-gray-100 rounded-2xl p-5 flex items-center gap-4 hover:shadow-lg hover:shadow-gray-200/40 transition-all duration-300 group cursor-pointer h-full"
                                                >
                                                    <div
                                                        className="w-12 h-12 rounded-xl flex items-center justify-center shrink-0 transition-transform group-hover:scale-110"
                                                        style={{ backgroundColor: `${bank.color}10` }}
                                                    >
                                                        <Bank className="w-6 h-6" style={{ color: bank.color }} />
                                                    </div>
                                                    <span className="text-[11px] font-bold font-sans text-gray-700 leading-tight group-hover:text-[#2076C7] transition-colors uppercase">
                                                        {bank.name}
                                                    </span>
                                                </motion.div>
                                            </TiltCard>
                                        ))
                                    ) : (
                                        <div className="col-span-full py-12 text-center text-gray-400 font-medium italic">
                                            Exploring tailored partners for this category...
                                        </div>
                                    )}
                                </AnimatePresence>
                            </div>
                        </div>
                    </div>
                </section>

                {/* CALCULATOR SECTION */}
                <section className="py-12 md:py-16 bg-white border-y border-gray-100">
                    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
                        <motion.div initial="hidden" whileInView="visible" className="text-center mb-16">
                            <motion.h2 className="text-3xl md:text-4xl font-extrabold font-sans mb-3 bg-linear-to-r from-[#2076C7] to-[#1CADA3] bg-clip-text text-transparent drop-shadow-sm">
                                Precision Planning
                            </motion.h2>

                            <motion.p className="text-xl text-gray-500 max-w-3xl mx-auto font-light leading-relaxed">
                                Fine-tune your finances with our specialized LAP calculator.
                            </motion.p>
                        </motion.div>
                        <div className="mb-12">
                            <Suspense fallback={<div className="flex justify-center items-center py-12">Loading calculator...</div>}>
                                <MortgageLoanCalculator />
                            </Suspense>
                        </div>
                    </div>
                </section>

                {/* DETAILED VARIANTS COMPARISON */}
                <section className="py-12 md:py-16 bg-white">
                    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                        <motion.div initial="hidden" whileInView="visible" className="text-center mb-16">
                            <motion.h2 className="text-3xl md:text-4xl font-extrabold font-sans mb-3 bg-linear-to-r from-[#2076C7] to-[#1CADA3] bg-clip-text text-transparent drop-shadow-sm">
                                Explore Mortgage Variants
                            </motion.h2>

                            <motion.p className="text-xl text-gray-500 max-w-3xl mx-auto font-light leading-relaxed">
                                A side-by-side analysis of our specialized mortgage solutions to help you find the perfect fit.
                            </motion.p>
                        </motion.div>

                        <motion.div
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            className="rounded-[2.5rem] border border-gray-100 overflow-hidden bg-white shadow-sm"
                        >
                            <div className="overflow-x-auto no-scrollbar">
                                <table className="w-full text-left border-collapse min-w-[1000px]">
                                    <thead>
                                        <tr className="bg-linear-to-r from-[#2076C7] via-[#1CADA3] to-[#2076C7] text-white">
                                            <th className="px-6 py-6 text-[11px] font-black uppercase tracking-[0.15em] text-white/90 whitespace-nowrap">Feature</th>
                                            <th className="px-6 py-6 text-lg font-bold text-white">Residential LAP</th>
                                            <th className="px-6 py-6 text-lg font-bold text-white">Commercial LAP</th>
                                            <th className="px-6 py-6 text-lg font-bold text-white">LRD Facility</th>
                                            <th className="px-6 py-6 text-lg font-bold text-white">Overdraft LAP</th>
                                        </tr>
                                    </thead>
                                    <tbody className="divide-y divide-gray-100">
                                        {[
                                            { feature: "Primary Purpose", resi: "Personal / Business Funds", comm: "Business Expansion", lrd: "Liquidity vs Rent", od: "Working Capital" },
                                            { feature: "Property Type", resi: "House / Apartment", comm: "Office / Shop / Showroom", lrd: "Leased Commercial", od: "Resi / Commercial" },
                                            { feature: "Max Funding", resi: "Up to 70% of Market Value", comm: "Up to 60% of Market Value", lrd: "Based on Rental Discounting", od: "Up to 65% of Value" },
                                            { feature: "Interest Rate", resi: "Starts from 8.40% p.a.", comm: "Starts from 8.75% p.a.", lrd: "Starts from 8.20% p.a.", od: "Starts from 8.45% p.a." },
                                            { feature: "Best For", resi: "Homeowners & Salaried", comm: "Business Owners & SMEs", lrd: "Real Estate Investors", od: "Flexible Cash Flow Needs" }
                                        ].map((row, idx) => (
                                            <motion.tr
                                                key={idx}
                                                whileHover={{ backgroundColor: "#ffffff" }}
                                                className="transition-colors group"
                                            >
                                                <td className="px-6 py-6 font-bold text-gray-900 group-hover:text-[#2076C7] transition-colors sticky left-0 bg-neutral-50 group-hover:bg-white z-10">{row.feature}</td>
                                                <td className="px-6 py-6 text-gray-600 text-sm font-medium">{row.resi}</td>
                                                <td className="px-6 py-6 text-gray-600 text-sm font-medium">{row.comm}</td>
                                                <td className="px-6 py-6 text-gray-600 text-sm font-medium">{row.lrd}</td>
                                                <td className="px-6 py-6 text-gray-600 text-sm font-medium">{row.od}</td>
                                            </motion.tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                        </motion.div>
                    </div>
                </section>

                {/* COMPARISON SECTION */}
                <section className="py-12 md:py-16 bg-white border-y border-gray-100">
                    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                        <motion.div initial="hidden" whileInView="visible" className="text-center mb-16">
                            <motion.h2 className="text-3xl md:text-4xl font-extrabold font-sans mb-3 bg-linear-to-r from-[#2076C7] to-[#1CADA3] bg-clip-text text-transparent drop-shadow-sm">
                                Mortgage Loan vs Personal Loan vs LAP
                            </motion.h2>

                            <motion.p className="text-xl text-gray-500 max-w-3xl mx-auto font-light leading-relaxed">
                                Analysis of property-backed funding compared to other major credit facilities.
                            </motion.p>
                        </motion.div>

                        <motion.div
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            className="rounded-[2.5rem] border border-gray-100 overflow-hidden bg-white shadow-sm"
                        >
                            <div className="overflow-x-auto no-scrollbar">
                                <table className="w-full text-left border-collapse min-w-[600px]">
                                    <thead>
                                        <tr className="bg-linear-to-r from-[#2076C7] via-[#1CADA3] to-[#2076C7] text-white">
                                            <th className="px-6 py-6 text-[11px] font-black uppercase tracking-[0.15em] text-white/90">Feature</th>
                                            <th className="px-6 py-6 text-lg font-bold text-white">Mortgage Loan</th>
                                            <th className="px-6 py-6 text-lg font-bold text-white">Personal Loan</th>
                                            <th className="px-6 py-6 text-lg font-bold text-white">Business Loan</th>
                                        </tr>
                                    </thead>
                                    <tbody className="divide-y divide-gray-50">
                                        {[
                                            { feature: "Interest", mortgage: "8.2–11%", personal: "10–18%", business: "12–22%" },
                                            { feature: "Tenure", mortgage: "15–20 Years", personal: "5 Years", business: "1–5 Years" },
                                            { feature: "Loan Amount", mortgage: "High (Up to 70% LTV)", personal: "Medium", business: "Medium" },
                                            { feature: "Security", mortgage: "Property Collatral", personal: "Unsecured", business: "Unsecured / CGTMSE" }
                                        ].map((row, idx) => (
                                            <motion.tr
                                                key={idx}
                                                whileHover={{ backgroundColor: "#f9fafb" }}
                                                className="transition-colors group"
                                            >
                                                <td className="px-6 py-6 font-bold text-gray-900 group-hover:text-[#2076C7] transition-colors">{row.feature}</td>
                                                <td className="px-6 py-6">
                                                    <span className="px-4 py-1.5 bg-blue-50 text-[#2076C7] rounded-full text-xs font-extrabold uppercase tracking-tight">
                                                        {row.mortgage}
                                                    </span>
                                                </td>
                                                <td className="px-6 py-6 text-gray-600 font-medium">{row.personal}</td>
                                                <td className="px-6 py-6">
                                                    <span className="px-4 py-1.5 bg-emerald-50 text-[#1CADA3] rounded-full text-xs font-extrabold uppercase tracking-tight">
                                                        {row.business}
                                                    </span>
                                                </td>
                                            </motion.tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                        </motion.div>
                    </div>
                </section>

                {/* ELIGIBILITY & DOCUMENTS */}
                <section className="py-12 md:py-16 bg-white">
                    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
                        <div className="bg-white rounded-[40px] p-8 md:p-12 border border-gray-100 shadow-sm relative overflow-hidden">
                            <div className="absolute top-0 right-0 w-32 h-32 bg-linear-to-br from-blue-50/50 to-emerald-50/50 rounded-bl-full -mr-16 -mt-16 opacity-50" />

                            <div className="relative z-10">
                                <motion.h2 className="text-3xl md:text-4xl font-extrabold font-sans mb-3 bg-linear-to-r from-[#2076C7] to-[#1CADA3] bg-clip-text text-transparent drop-shadow-sm tracking-tight text-center">Eligibility Criteria</motion.h2>


                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-10">
                                    {offer.eligibility.map((item, i) => (
                                        <motion.div
                                            whileHover={{ y: -2, boxShadow: "0 4px 6px -1px rgb(0 0 0 / 0.1)" }}
                                            key={i}
                                            className="flex items-center gap-4 p-5 bg-gray-50/50 rounded-2xl border border-gray-100 transition-all"
                                        >
                                            <div className="w-6 h-6 rounded-full bg-white shadow-sm flex items-center justify-center text-[#2076C7] text-[10px] font-black border border-blue-100">{i + 1}</div>
                                            <span className="text-sm font-bold text-gray-700">{item}</span>
                                        </motion.div>
                                    ))}
                                </div>

                                {/* Integrated Document Checklist Toggle */}
                                <div className="flex flex-col items-center">
                                    <button
                                        onClick={() => setIsChecklistOpen(!isChecklistOpen)}
                                        className="group relative flex items-center gap-3 px-8 py-4 bg-white border-2 border-[#2076C7]/20 hover:border-[#2076C7] rounded-2xl transition-all duration-300 text-[#2076C7] font-bold shadow-sm hover:shadow-md cursor-pointer overflow-hidden"
                                    >
                                        <div className="absolute inset-0 bg-blue-50 opacity-0 group-hover:opacity-100 transition-opacity" />
                                        <FileText className="relative z-10 w-5 h-5" />
                                        <span className="relative z-10">{isChecklistOpen ? "Hide Required Documents" : "View Required Documents"}</span>
                                        <ChevronDown className={`relative z-10 w-5 h-5 transition-transform duration-500 ${isChecklistOpen ? 'rotate-180' : ''}`} />
                                    </button>

                                    <AnimatePresence>
                                        {isChecklistOpen && (
                                            <motion.div
                                                initial={{ height: 0, opacity: 0 }}
                                                animate={{ height: "auto", opacity: 1 }}
                                                exit={{ height: 0, opacity: 0 }}
                                                transition={{ duration: 0.5, ease: "easeInOut" }}
                                                className="w-full overflow-hidden"
                                            >
                                                <div className="pt-10 space-y-10">
                                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
                                                        <div>
                                                            <h4 className="text-[10px] font-black text-[#2076C7] uppercase tracking-[0.2em] mb-4 flex items-center gap-2">
                                                                <div className="w-1.5 h-1.5 rounded-full bg-[#2076C7]" />
                                                                Property Chain
                                                            </h4>
                                                            <div className="grid grid-cols-1 gap-2">
                                                                {offer.documents.propertyDocs.map((doc, i) => (
                                                                    <div key={i} className="flex items-center gap-2 p-3 bg-gray-50/80 border border-gray-100 rounded-xl text-xs font-bold text-gray-600">
                                                                        <CheckCircle size={14} className="text-[#2076C7] shrink-0" /> {doc}
                                                                    </div>
                                                                ))}
                                                            </div>
                                                        </div>

                                                        <div>
                                                            <h4 className="text-[10px] font-black text-[#1CADA3] uppercase tracking-[0.2em] mb-4 flex items-center gap-2">
                                                                <div className="w-1.5 h-1.5 rounded-full bg-[#1CADA3]" />
                                                                Income Suite
                                                            </h4>
                                                            <div className="grid grid-cols-1 gap-2">
                                                                {offer.documents.incomeSelfEmployed.slice(0, 4).map((doc, i) => (
                                                                    <div key={i} className="flex items-center gap-2 p-3 bg-gray-50/80 border border-gray-100 rounded-xl text-xs font-bold text-gray-600">
                                                                        <CheckCircle size={14} className="text-[#1CADA3] shrink-0" /> {doc}
                                                                    </div>
                                                                ))}
                                                            </div>
                                                        </div>
                                                    </div>

                                                    <div className="p-4 bg-amber-50/50 border border-amber-100/50 rounded-2xl flex items-start gap-3">
                                                        <Clock size={16} className="text-amber-500 mt-0.5 shrink-0" />
                                                        <p className="text-[11px] text-amber-800 font-bold leading-relaxed italic">
                                                            * Additional documents may be required based on specific profile or technical valuation of property. Processing time is usually 7-10 working days.
                                                        </p>
                                                    </div>
                                                </div>
                                            </motion.div>
                                        )}
                                    </AnimatePresence>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>

                {/* PROCESS OVERVIEW */}
                <section className="py-12 md:py-16 bg-white">
                    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                        <motion.div initial="hidden" whileInView="visible" className="text-center mb-16">
                            <motion.h2 className="text-3xl md:text-4xl font-extrabold font-sans mb-3 bg-linear-to-r from-[#2076C7] to-[#1CADA3] bg-clip-text text-transparent drop-shadow-sm">
                                Process Overview
                            </motion.h2>

                            <motion.p className="text-xl text-gray-500 max-w-3xl mx-auto font-light">
                                A simple, transparent journey from application to disbursement.
                            </motion.p>
                        </motion.div>

                        <motion.section
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            className="bg-white rounded-[40px] shadow-sm border border-gray-100 p-8 md:p-12"
                        >
                            <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-4 relative">
                                {[
                                    { step: "1", title: "Check Eligibility", details: ["Share basic details like income, loan amount, and employment type", "Our team helps you check eligibility across multiple banks"] },
                                    { step: "2", title: "Submit Documents", details: ["Provide required KYC and income documents", "Documents are verified by the bank"] },
                                    { step: "3", title: "Application & Processing", details: ["Application is submitted to selected bank", "Bank evaluates credit score and property", "Legal & technical verification conducted"] },
                                    { step: "4", title: "Loan Approval", details: ["Bank issues Sanction Letter", "Loan amount, rate & tenure confirmed"] },
                                    { step: "5", title: "Loan Disbursement", details: ["Agreement signing", "Loan amount disbursed to seller / builder"] }
                                ].map((item, index) => (
                                    <TiltCard key={index}>
                                        <motion.div
                                            whileHover={{ y: -5, boxShadow: "0 10px 15px -3px rgb(0 0 0 / 0.1)" }}
                                            className="relative z-10 flex flex-col items-center text-center p-4 bg-white rounded-xl border border-gray-100 hover:border-[#1CADA3] transition-all group h-full"
                                        >
                                            <div className="w-16 h-16 rounded-full bg-linear-to-r from-[#2076C7] via-[#1CADA3] to-[#2076C7] flex items-center justify-center text-white font-bold text-2xl mb-4 group-hover:scale-110 transition-transform">
                                                {item.step}
                                            </div>
                                            <h3 className="font-bold text-gray-800 mb-3 text-sm md:text-base leading-tight min-h-[40px] flex items-center justify-center">
                                                {item.title}
                                            </h3>
                                            <ul className="space-y-2 text-left">
                                                {item.details.map((detail, idx) => (
                                                    <li key={idx} className="text-xs text-gray-600 flex items-start gap-1.5">
                                                        <span className="text-[#1CADA3] mt-1 shrink-0">•</span>
                                                        {detail}
                                                    </li>
                                                ))}
                                            </ul>
                                        </motion.div>
                                    </TiltCard>
                                ))}
                            </div>
                        </motion.section>
                    </div>
                </section>

                {/* Section Divider */}
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="h-0.5 bg-linear-to-r from-transparent to-transparent opacity-40 rounded-full" />
                </div>

                {/* DISCLAIMER SECTION */}
                <section className="py-2 bg-white font-sans">
                    <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
                        <motion.div
                            initial={{ opacity: 0, y: 10 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            className="bg-yellow-50 border border-yellow-100 rounded-xl p-3 md:p-4 flex flex-col md:flex-row items-center gap-3"
                        >
                            <div className="w-8 h-8 rounded-lg bg-white shadow-sm border border-yellow-100 flex items-center justify-center shrink-0">
                                <ShieldCheck className="w-4 h-4 text-[#2076C7]" />
                            </div>
                            <div className="space-y-0.5 text-center md:text-left">
                                <h3 className="text-sm font-bold text-black">Disclaimer:</h3>
                                <p className="text-[10px] text-gray-700 leading-relaxed font-semibold">
                                    The interest rates, loan amounts, and tenures mentioned are indicative and subject to the lender&apos;s final credit evaluation. Approval is at the sole discretion of the bank/HFC based on the property valuation, legal reports, and the applicant&apos;s financial profile.
                                </p>
                            </div>
                        </motion.div>
                    </div>
                </section>

                {/* FAQ SECTION */}

                <section className="py-12 md:py-16 bg-white">
                    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
                        <div className="text-center mb-12">
                            <h2 className="text-3xl md:text-4xl font-extrabold mb-3 bg-linear-to-r from-[#2076C7] to-[#1CADA3] bg-clip-text text-transparent drop-shadow-sm">Frequently Asked Questions</h2>

                            <p className="text-gray-600 max-w-2xl mx-auto text-lg leading-relaxed font-light">Got questions about mortgage loans? We&apos;ve got answers.</p>
                        </div>

                        <div className="space-y-4">
                            {(showAllFaqs ? MORTGAGE_LOAN_FAQS : MORTGAGE_LOAN_FAQS.slice(0, 5)).map((faq, idx) => (
                                <div key={idx} className="border border-gray-100 rounded-2xl overflow-hidden transition-all duration-300 hover:border-[#2076C7]/30 hover:shadow-md">
                                    <button
                                        onClick={() => setOpenFaq(openFaq === idx ? null : idx)}
                                        className="w-full px-6 py-4 sm:py-5 text-left flex justify-between items-start gap-4 bg-gray-50/50 hover:bg-blue-50/50 transition-colors focus:outline-none cursor-pointer group"
                                    >
                                        <span className="font-bold text-gray-700 text-base sm:text-lg pr-2 group-hover:text-[#2076C7] transition-colors leading-tight">{faq.question}</span>
                                        <div className={`p-1.5 rounded-full bg-white border border-gray-200 text-gray-700 transition-transform duration-300 shrink-0 ${openFaq === idx ? 'rotate-180 bg-[#2076C7] border-[#2076C7] text-white' : ''}`}>
                                            {openFaq === idx ? <Minus size={18} strokeWidth={3} /> : <Plus size={18} strokeWidth={3} />}
                                        </div>
                                    </button>

                                    <AnimatePresence>
                                        {openFaq === idx && (
                                            <motion.div
                                                initial={{ height: 0, opacity: 0 }}
                                                animate={{ height: 'auto', opacity: 1 }}
                                                exit={{ height: 0, opacity: 0 }}
                                                className="overflow-hidden bg-white"
                                            >
                                                <div className="px-8 pb-6 text-gray-600 text-base leading-relaxed border-t border-gray-50 pt-4">
                                                    {faq.answer}
                                                </div>
                                            </motion.div>
                                        )}
                                    </AnimatePresence>
                                </div>
                            ))}
                        </div>

                        {MORTGAGE_LOAN_FAQS.length > 5 && (
                            <div className="text-center mt-10">
                                <button
                                    onClick={() => setShowAllFaqs(!showAllFaqs)}
                                    className="inline-flex items-center gap-2 px-8 py-3.5 rounded-full bg-blue-50 text-[#2076C7] font-bold hover:bg-blue-100 transition-all cursor-pointer shadow-sm active:scale-95"
                                >
                                    {showAllFaqs ? 'View Less' : 'View More Questions'}
                                    <Plus className={`w-5 h-5 transition-transform duration-300 ${showAllFaqs ? 'rotate-45' : ''}`} />
                                </button>
                            </div>
                        )}
                    </div>
                </section>

                {/* FINAL CTA */}
                <CTASection />

                {/* MODALS */}
                {isVerifying && (
                    <VerificationPopup
                        offerTitle={offer.title}
                        onSuccess={handleVerificationSuccess}
                        onCancel={() => setIsVerifying(false)}
                    />
                )}

                {isFormOpen && (
                    <div className="fixed inset-0 z-[100] bg-[#2076C7]/10 backdrop-blur-md flex items-center justify-center p-4">
                        <div className="relative w-full max-w-4xl animate-in zoom-in duration-300">
                            <MortgageLoanForm
                                onClose={() => setIsFormOpen(false)}
                                prefilledData={verifiedUserData}
                            />
                        </div>
                    </div>
                )}
                <Chatbot />
            </div>
            <ScrollToTop />
        </>
    );
}


/**
 * 🔹 Verification Component (Internal Modal) - Shared Premium Style
 */
function VerificationPopup({ offerTitle, onSuccess, onCancel }: any) {
    const [step, setStep] = useState<"details" | "otp">("details");
    const [formData, setFormData] = useState({ name: "", email: "", mobile: "" });
    const [otp, setOtp] = useState<string[]>(new Array(6).fill(""));
    const inputRefs = useRef<(HTMLInputElement | null)[]>([]);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState("");
    const [timer, setTimer] = useState(0);

    useEffect(() => {
        let interval: NodeJS.Timeout;
        if (timer > 0) interval = setInterval(() => setTimer((prev) => prev - 1), 1000);
        return () => clearInterval(interval);
    }, [timer]);

    const handleSendOtp = async (e?: React.FormEvent) => {
        if (e) e.preventDefault();
        if (!formData.name || !formData.email || formData.mobile.length !== 10) return setError("Please fill all details correctly.");
        setIsLoading(true);
        setError("");
        try {
            await AuthService.sendLoginOtp({ identifier: formData.mobile });
            setStep("otp");
            setTimer(30);
        } catch (err) {
            setError("Failed to send OTP. Please try again.");
        } finally {
            setIsLoading(false);
        }
    };

    const handleVerifyOtp = async () => {
        const otpString = otp.join("");
        if (otpString.length < 6) return setError("Enter the 6-digit OTP code.");
        setIsLoading(true);
        setError("");
        try {
            await AuthService.verifyLoginOtp({ identifier: formData.mobile, otp: otpString });
            onSuccess(formData);
        } catch (err) {
            setError("Invalid OTP code. Please try again.");
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="fixed inset-0 z-[1100] bg-[#2076C7]/10 backdrop-blur-lg flex items-center justify-center p-4">
            <div className="bg-white rounded-3xl w-full max-w-md overflow-hidden shadow-2xl animate-in zoom-in duration-300 border border-gray-100">
                <div className="bg-linear-to-r from-[#2076C7] to-[#1CADA3] p-6 text-center text-white relative">
                    <button onClick={onCancel} className="absolute right-4 top-4 hover:bg-white/20 rounded-full p-1 transition-colors"><X size={20} /></button>
                    <div className="bg-white/10 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-3 border border-white/20 shadow-inner"><ShieldCheck size={32} /></div>
                    <h3 className="text-xl font-bold italic uppercase tracking-tight">Security First</h3>
                    <p className="text-[10px] font-bold text-white/70 uppercase tracking-widest mt-1">{offerTitle} Application</p>
                </div>
                <div className="p-10">
                    {step === "details" ? (
                        <form onSubmit={handleSendOtp} className="space-y-6">
                            <div className="space-y-4">
                                <input required type="text" placeholder="FULL NAME" className="w-full bg-neutral-50 border-gray-100 border-2 rounded-2xl p-4 focus:border-[#1CADA3] outline-none text-gray-700 font-bold text-xs uppercase tracking-widest" value={formData.name} onChange={e => setFormData({ ...formData, name: e.target.value })} />
                                <input required type="email" placeholder="EMAIL ADDRESS" className="w-full bg-neutral-50 border-gray-100 border-2 rounded-2xl p-4 focus:border-[#1CADA3] outline-none text-gray-700 font-bold text-xs uppercase tracking-widest" value={formData.email} onChange={e => setFormData({ ...formData, email: e.target.value })} />
                                <input required type="tel" maxLength={10} placeholder="MOBILE NUMBER" className="w-full bg-neutral-50 border-gray-100 border-2 rounded-2xl p-4 focus:border-[#1CADA3] outline-none text-gray-700 font-bold text-xs uppercase tracking-widest" value={formData.mobile} onChange={e => setFormData({ ...formData, mobile: e.target.value.replace(/\D/g, "") })} />
                            </div>
                            {error && <p className="text-red-500 text-[10px] font-bold text-center uppercase tracking-widest bg-red-50 p-3 rounded-xl">{error}</p>}
                            <button type="submit" disabled={isLoading} className="w-full bg-gradient-to-r from-[#2076C7] to-[#1CADA3] text-white py-4 rounded-2xl font-black text-xs uppercase tracking-widest shadow-xl disabled:opacity-50 transition-all active:scale-95">{isLoading ? "PROCESSING..." : "GET SECURE CODE"}</button>
                        </form>
                    ) : (
                        <div className="space-y-8 animate-in slide-in-from-bottom-4">
                            <div className="text-center">
                                <p className="text-xs font-bold text-gray-400 uppercase tracking-widest mb-2">Verification Code Sent To</p>
                                <p className="text-lg font-black text-[#2076C7] tracking-widest">{formData.mobile}</p>
                            </div>
                            <div className="flex justify-between gap-2">
                                {otp.map((digit, index) => (
                                    <input
                                        key={index} type="text" maxLength={1}
                                        ref={(el) => { inputRefs.current[index] = el; }}
                                        value={digit}
                                        onChange={(e) => {
                                            const v = e.target.value;
                                            if (isNaN(Number(v))) return;
                                            const newOtp = [...otp];
                                            newOtp[index] = v.substring(v.length - 1);
                                            setOtp(newOtp);
                                            if (v && index < 5) inputRefs.current[index + 1]?.focus();
                                        }}
                                        onKeyDown={(e) => {
                                            if (e.key === "Backspace" && !otp[index] && index > 0) inputRefs.current[index - 1]?.focus();
                                        }}
                                        className="w-12 h-16 bg-neutral-50 border-2 border-gray-100 rounded-2xl text-center text-2xl font-black text-[#2076C7] focus:border-[#1CADA3] outline-none transition-all"
                                    />
                                ))}
                            </div>
                            {error && <p className="text-red-500 text-[10px] font-bold text-center uppercase tracking-widest bg-red-50 p-3 rounded-xl">{error}</p>}
                            <div className="space-y-4">
                                <button onClick={handleVerifyOtp} disabled={isLoading} className="w-full bg-linear-to-r from-[#2076C7] to-[#1CADA3] text-white py-4 rounded-2xl font-black text-xs uppercase tracking-widest shadow-xl">{isLoading ? "VERIFYING..." : "CONFIRM & PROCEED"}</button>
                                <div className="flex flex-col items-center gap-2">
                                    {timer > 0 ? <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">Resend Code In {timer}s</p> : <button onClick={() => handleSendOtp()} className="text-[10px] font-black text-[#1CADA3] uppercase tracking-widest underline">Resend Code</button>}
                                </div>
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}
