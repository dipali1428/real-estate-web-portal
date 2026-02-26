"use client";
import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
    ExternalLink,
    Shield,
    Users,
    Briefcase,
    FileText,
    CheckCircle,
    Flame,
    Anchor,
    Heart,
    ChevronDown,
    Building,
    Factory,
    Laptop,
    Stethoscope,
    Store,
    Banknote,
    Lock,
    Clock,
    Star,
    TrendingUp,
    AlertTriangle,
    Lightbulb,
    Award,
    Calculator,
    AlertCircle,
    IndianRupee,
    CheckCircle2,
    ShieldCheck,
    Scale,
    Activity,
    Send,
    Loader2,
    Container,
    UserCheck,
    Handshake,
    Home,
    GraduationCap,
    ThumbsUp,
    Info,
    Percent,
    XCircle,
    Wrench
} from "lucide-react";

import Link from "next/link";
import Image from "next/image";
import { useModal } from "../../context/ModalContext";
import {
    PieChart, Pie, Cell, ResponsiveContainer, Tooltip, Legend,
    AreaChart, Area, XAxis, YAxis, CartesianGrid
} from 'recharts';

/* ---------------- ANIMATIONS ---------------- */

const fadeInUp = {
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6 } }
};

const staggerContainer = {
    hidden: {},
    visible: { transition: { staggerChildren: 0.08 } }
};

const cardHover = {
    rest: { scale: 1 },
    hover: { scale: 1.02, transition: { duration: 0.2 } }
};

/* ---------------- PAGE ---------------- */

export default function CorporateInsurancePage() {
    const { openQuote, openSignup } = useModal();
    const [expandedIdx, setExpandedIdx] = useState<number | null>(null);
    const [selectedProduct, setSelectedProduct] = useState<string | null>(null);
    const [activeFilter, setActiveFilter] = useState("All");

    /* ---------------- TOP INSURANCE COMPANIES IN INDIA (2026) ---------------- */
    const topInsurers = [
        {
            name: "HDFC ERGO",
            image: "/Logos/hdfcergo.webp",
            rating: "AAA",
            claimRatio: "96.71%",
            network: "13,000+",
            marketCap: "₹85,000Cr",
            specialty: "Comprehensive Business Packages",
            color: "bg-blue-50 border-blue-100"
        },
        {
            name: "ICICI Lombard",
            image: "/Logos/icicilombard.webp",
            rating: "AAA",
            claimRatio: "98.54%",
            network: "12,500+",
            marketCap: "₹92,000Cr",
            specialty: "Tech-driven Claims Processing",
            color: "bg-orange-50 border-orange-100"
        },
        {
            name: "New India Assurance",
            image: "/Logos/newindia.webp",
            rating: "AAA",
            claimRatio: "92.30%",
            network: "15,000+",
            marketCap: "₹1,20,000Cr",
            specialty: "Public Sector Reliability",
            color: "bg-green-50 border-green-100"
        },
        {
            name: "Tata AIG",
            image: "/Logos/tataaig.png",
            rating: "AAA",
            claimRatio: "97.10%",
            network: "11,000+",
            marketCap: "₹78,000Cr",
            specialty: "Best for Liability Insurance",
            color: "bg-slate-50 border-slate-100"
        },
        {
            name: "Bajaj Allianz",
            image: "/Logos/bajaj.webp",
            rating: "AAA",
            claimRatio: "98.00%",
            network: "10,000+",
            marketCap: "₹80,000Cr",
            specialty: "Customer-Centric Services",
            color: "bg-indigo-50 border-indigo-100"
        },
        {
            name: "SBI General",
            image: "/Logos/sbigeneral.webp",
            rating: "AAA",
            claimRatio: "95.50%",
            network: "14,000+",
            marketCap: "₹65,000Cr",
            specialty: "Wide Reach & Trust",
            color: "bg-teal-50 border-teal-100"
        },
        {
            name: "goDigit Insurance",
            image: "/Logos/digit.png",
            rating: "AA",
            claimRatio: "96.04%",
            network: "5,900+",
            marketCap: "₹28,000Cr",
            specialty: "Digital-First General Insurance",
            color: "bg-violet-50 border-violet-100"
        },
        {
            name: "Cholamandalam MS",
            image: "/Logos/Chola Ms.png",
            rating: "AA",
            claimRatio: "95.80%",
            network: "7,200+",
            marketCap: "₹22,000Cr",
            specialty: "SME & Motor Insurance",
            color: "bg-amber-50 border-amber-100"
        },
        {
            name: "Royal Sundaram",
            image: "/Logos/royal.png",
            rating: "AA",
            claimRatio: "94.50%",
            network: "5,000+",
            marketCap: "₹18,000Cr",
            specialty: "Complete Business Protection",
            color: "bg-rose-50 border-rose-100"
        },
        {
            name: "Future Generali",
            image: "/Logos/future.png",
            rating: "A+",
            claimRatio: "95.20%",
            network: "6,000+",
            marketCap: "₹15,000Cr",
            specialty: "Retail & SME Corporate Plans",
            color: "bg-orange-50 border-orange-100"
        },
        {
            name: "Zurich Kotak",
            image: "/Logos/Zurich.jpg",
            rating: "AAA",
            claimRatio: "95.80%",
            network: "5,500+",
            marketCap: "₹32,000Cr",
            specialty: "Global Expertise, Indian Market",
            color: "bg-sky-50 border-sky-100"
        },
        {
            name: "Liberty General",
            image: "/Logos/liberty.png",
            rating: "A+",
            claimRatio: "90.50%",
            network: "5,000+",
            marketCap: "₹12,000Cr",
            specialty: "Motor & Commercial Lines",
            color: "bg-green-50 border-green-100"
        }
    ];

    /* ---------------- PRODUCTS WITH DETAILED COVERAGE ---------------- */
    const products = [
        {
            title: "Group Personal Accident (GPA) Cover",
            category: "Accident",
            desc: "24x7 accident coverage for all employees — covers accidental death, permanent disability, temporary disability, and medical expenses arising from accidents.",
            icon: ShieldCheck,
            color: "text-[#2076C7]",
            bg: "bg-blue-50",
            coverage: "₹5L – ₹1Cr per employee",
            network: "Pan India + Worldwide",
            waiting: "No waiting period",
            claimRatio: "98%",
            popular: true,
            premium: "Starts at ₹200/employee/year"
        },
        {
            title: "Group Medical Cover (GMC)",
            category: "Health",
            desc: "Comprehensive cashless hospitalisation cover for employees and their families — includes pre & post hospitalisation, day-care procedures, maternity, and OPD benefits.",
            icon: Stethoscope,
            color: "text-rose-600",
            bg: "bg-rose-50",
            coverage: "₹1L – ₹10L per employee + family",
            network: "10,000+ network hospitals",
            waiting: "30 days (waived for accidents)",
            claimRatio: "96%+",
            popular: true,
            premium: "Starts at ₹400/employee/month"
        },
        {
            title: "Group Term Life (GTL)",
            category: "Life",
            desc: "Life insurance for the entire workforce — provides a lump-sum payout to the nominee in case of an employee's death during service, at very low group premium rates.",
            icon: Heart,
            color: "text-teal-600",
            bg: "bg-teal-50",
            coverage: "2× – 5× annual CTC per employee",
            network: "All major life insurers",
            waiting: "No waiting period",
            claimRatio: "99%+",
            popular: true,
            premium: "Starts at ₹100/employee/year"
        },

        {
            title: "Bharat Laghu Udyam Policy",
            category: "Property",
            desc: "Commercial property insurance for mid-size businesses with assets ₹5Cr–₹50Cr.",
            icon: Factory,
            color: "text-green-600",
            bg: "bg-green-50",
            coverage: "₹5Cr – ₹50Cr",
            network: "Pan India",
            waiting: "7 days",
            claimRatio: "94%",
            premium: "Based on asset value"
        },
        {
            title: "Workmen Compensation",
            category: "Liability",
            desc: "Mandatory protection for employee injury, disability, or death during employment.",
            icon: Users,
            color: "text-indigo-600",
            bg: "bg-indigo-50",
            coverage: "Based on wages (min ₹4L cover)",
            network: "Pan India",
            waiting: "Immediate coverage",
            claimRatio: "98%",
            premium: "0.5% - 2% of wages"
        },

        {
            title: "Marine & Transit Insurance",
            category: "Property",
            desc: "Coverage for goods transported via road, rail, air, or sea.",
            icon: Anchor,
            color: "text-[#1CADA3]",
            bg: "bg-[#1CADA3]/5",
            coverage: "CIF value + 10%",
            network: "International",
            waiting: "Immediate",
            claimRatio: "94%",
            premium: "0.2% - 0.8% of consignment value"
        },
        {
            title: "General Liability Insurance",
            category: "Liability",
            desc: "Protection against third-party injury, property damage, or legal claims.",
            icon: Shield,
            color: "text-purple-600",
            bg: "bg-purple-50",
            coverage: "₹1Cr - ₹50Cr",
            network: "Pan India",
            waiting: "15 days",
            claimRatio: "89%",
            premium: "₹10,000 - ₹2L annually"
        },
        {
            title: "Professional Indemnity",
            category: "Liability",
            desc: "Protection against claims due to professional negligence or service errors.",
            icon: FileText,
            color: "text-cyan-600",
            bg: "bg-cyan-50",
            coverage: "₹10L - ₹10Cr",
            network: "IT, consulting, finance",
            waiting: "Retroactive cover available",
            claimRatio: "91%",
            premium: "0.5% - 2% of sum insured"
        },
        {
            title: "Directors & Officers Insurance",
            category: "Liability",
            desc: "Protect company directors from personal liability claims.",
            icon: Briefcase,
            color: "text-slate-600",
            bg: "bg-slate-50",
            coverage: "₹1Cr - ₹25Cr",
            network: "All companies",
            waiting: "30 days",
            claimRatio: "88%",
            premium: "₹25,000 - ₹5L annually"
        },
        {
            title: "Cyber Insurance",
            category: "Cyber",
            desc: "Coverage against hacking, ransomware, and data breaches.",
            icon: Lock,
            color: "text-red-600",
            bg: "bg-red-50",
            coverage: "₹25L - ₹10Cr",
            network: "24/7 incident response",
            waiting: "7 days",
            claimRatio: "86%",
            popular: true,
            premium: "₹15,000 - ₹3L annually"
        },
        {
            title: "Contractor All Risk",
            category: "Property",
            desc: "Coverage for construction projects against accidental damage.",
            icon: Factory,
            color: "text-green-600",
            bg: "bg-green-50",
            coverage: "Project value based",
            network: "Infrastructure sector",
            waiting: "Immediate",
            claimRatio: "93%",
            premium: "0.3% - 1% of project value"
        },
        {
            title: "Contractors Plant & Machinery (CPM)",
            category: "Property",
            desc: "Comprehensive cover for construction machinery and equipment against accidental damage, breakdown, or external perils during operation or at rest.",
            icon: Wrench,
            color: "text-orange-600",
            bg: "bg-orange-50",
            coverage: "Market value of machinery",
            network: "Construction & Mining sectors",
            waiting: "Immediate",
            claimRatio: "90%",
            popular: false,
            premium: "0.5% - 2.5% of equipment value"
        },
        {
            title: "Office Package Policy",
            category: "Property",
            desc: "Comprehensive insurance covering office assets and liabilities.",
            icon: Building,
            color: "text-yellow-600",
            bg: "bg-yellow-50",
            coverage: "₹10L - ₹5Cr",
            network: "SMEs, startups",
            waiting: "7 days",
            claimRatio: "94%",
            premium: "₹5,000 - ₹50,000 annually"
        },
        {
            title: "Key Man Insurance",
            category: "Life",
            desc: "Protects your business against financial loss arising from the death or disability of a key employee or founder.",
            icon: UserCheck,
            color: "text-[#2076C7]",
            bg: "bg-blue-50",
            coverage: "₹25L - ₹10Cr (based on key person's value)",
            network: "All major life insurers",
            waiting: "30 days",
            claimRatio: "97%",
            popular: false,
            premium: "0.5% - 2% of sum assured annually"
        },
        {
            title: "Surety Bonds",
            category: "Liability",
            desc: "Financial guarantee bonds for contractors, government projects, and tenders — covering bid bonds, performance bonds, advance payment bonds, and contract bonds.",
            icon: Banknote,
            color: "text-emerald-600",
            bg: "bg-emerald-50",
            coverage: "Project / Contract value based",
            network: "Govt, Infrastructure & EPC sector",
            waiting: "Immediate on approval",
            claimRatio: "92%",
            popular: false,
            premium: "0.5% - 3% of bond value annually"
        }
    ];

    /* ---------------- INDUSTRIES ---------------- */
    const industries = [
        {
            title: "IT & Software Companies",
            icon: Laptop,
            desc: "Cyber, Professional Indemnity, Group Health"
        },
        {
            title: "Manufacturing",
            icon: Factory,
            desc: "Fire, Workmen Compensation, Machinery Breakdown"
        },
        {
            title: "Construction & Infrastructure",
            icon: Building,
            desc: "Workmen Compensation, Contractor All Risk (CAR), CPM, Marine & Liability"
        },
        {
            title: "Healthcare & Hospitals",
            icon: Stethoscope,
            desc: "Medical Malpractice, Group Health, Property"
        },
        {
            title: "Retail & Shops",
            icon: Store,
            desc: "Fire, Theft, Public Liability"
        },
        {
            title: "Finance & Banking",
            icon: Banknote,
            desc: "D&O, Professional Indemnity, Cyber"
        },
        {
            title: "Startups & Corporates",
            icon: Building,
            desc: "Complete business protection packages"
        },
        {
            title: "Residential Societies",
            icon: Home,
            desc: "Property, Public Liability, Workmen Compensation"
        },
        {
            title: "Educational Institutions",
            icon: GraduationCap,
            desc: "GPA, GMC, GTL, Property & Liability Cover"
        }
    ];

    /* ---------------- PROCESS ---------------- */
    const process = [
        {
            title: "Submit Your Requirement",
            desc: "Tell us about your business and insurance needs. Free consultation."
        },
        {
            title: "Get Expert Consultation",
            desc: "Our IRDAI-certified experts analyze your risks and suggest best policies from top insurers."
        },
        {
            title: "Compare & Choose Plan",
            desc: "Compare multiple insurers, premiums, and coverage to choose the best fit."
        },
        {
            title: "Policy Issuance",
            desc: "Instant policy issuance with full documentation support (24-48 hrs)."
        }
    ];

    /* ---------------- BENEFITS ---------------- */
    const benefits = [
        {
            title: "Complete Business Protection",
            desc: "Protect employees, assets, operations, and liabilities under one roof.",
            icon: Shield
        },
        {
            title: "Regulatory Compliance",
            desc: "Ensure compliance with Indian labor laws, IRDAI, and corporate regulations.",
            icon: FileText
        },
        {
            title: "Financial Security",
            desc: "Prevent large financial losses and protect revenue streams.",
            icon: Banknote
        },
        {
            title: "Employee Satisfaction",
            desc: "Improve retention with strong employee benefits and wellness programs.",
            icon: Users
        },
        {
            title: "Pan India Service",
            desc: "On-ground support across all major cities and states — from policy issuance to claims, wherever your business operates.",
            icon: Activity
        }
    ];

    /* ---------------- FAQ ---------------- */
    const faqs = [
        {
            q: "Is corporate insurance mandatory in India?",
            a: "Yes, certain policies like Workmen Compensation are mandatory under the Employees' Compensation Act, 1923 for businesses with employees. Other policies like Professional Indemnity may be mandatory for specific professions as per regulatory requirements."
        },
        {
            q: "Who should buy corporate insurance?",
            a: "Any business including startups, SMEs, and large enterprises should have insurance. According to industry data, 75% of Indian businesses are underinsured, leaving them vulnerable to unexpected losses that could threaten their survival."
        },
        {
            q: "How fast can policy be issued?",
            a: "Most policies can be issued within 24-48 hours after documentation. Group Health Insurance can be activated instantly for organizations with 20+ employees. Cyber insurance quotes are available within 2-3 hours."
        },
        {
            q: "What is the typical claim settlement ratio?",
            a: "Top insurers like HDFC ERGO (96.71%), Bajaj General (96.78%), and New India Assurance maintain claim settlement ratios above 95%, ensuring reliable payouts when you need them most."
        },
        {
            q: "Can I customize coverage for my industry?",
            a: "Absolutely. We work with multiple insurers to create tailored packages for IT, manufacturing, healthcare, and other sectors with specific risk profiles. Each policy is customized to your unique business needs."
        }
    ];

    /* ---------------- FACTS & FIGURES ---------------- */
    const riskData = [
        { name: 'Cyber Attacks', value: 35, color: '#EF4444' },
        { name: 'Employee Health', value: 25, color: '#3B82F6' },
        { name: 'Property Damage', value: 20, color: '#F59E0B' },
        { name: 'Legal Liability', value: 15, color: '#8B5CF6' },
        { name: 'Theft & Fraud', value: 5, color: '#10B981' },
    ];

    const trendData = [
        { year: '2020', CostWithoutInsurance: 50, CostWithInsurance: 40 },
        { year: '2021', CostWithoutInsurance: 80, CostWithInsurance: 45 },
        { year: '2022', CostWithoutInsurance: 120, CostWithInsurance: 50 },
        { year: '2023', CostWithoutInsurance: 160, CostWithInsurance: 55 },
        { year: '2024', CostWithoutInsurance: 200, CostWithInsurance: 60 },
    ];

    const didYouKnow = [
        {
            fact: "43% of cyber attacks target small businesses.",
            desc: "Cyber insurance is no longer optional; it's a necessity for digital safety. Premiums start at just ₹15,000 annually for basic coverage.",
            icon: Laptop
        },
        {
            fact: "75% of businesses are underinsured.",
            desc: "Many companies fail to update their coverage as they grow, leaving gaps in protection that could be catastrophic.",
            icon: AlertTriangle
        },
        {
            fact: "Group Health premiums grew 9% in FY26.",
            desc: "Retail health grew even faster at 10%, showing increased awareness of health coverage needs among Indians.",
            icon: TrendingUp
        }
    ];

    /* ---------------- DISCLAIMER ---------------- */
    const disclaimer = "Insurance is the subject matter of solicitation. Terms and conditions apply. This is for information purposes only. Please consult with our experts for personalized advice.";

    /* ---------------- PAGE ---------------- */
    return (
        <div className="min-h-screen bg-gray-50 text-slate-800 font-sans">
            <section className="relative pt-32 pb-24 md:pb-32 overflow-hidden">
                {/* Sticky CTA */}
                <div className="fixed bottom-6 right-6 z-50 md:hidden">
                    <button
                        onClick={() => openQuote("Corporate Insurance")}
                        className="bg-[#2076C7] text-white px-5 py-3 rounded-full shadow-[0_8px_30px_rgb(0,0,0,0.2)] text-sm font-bold animate-bounce"
                        aria-label="Get a corporate insurance quote"
                    >
                        Get Quote
                    </button>
                </div>
                <div className="fixed bottom-8 right-8 z-50 hidden md:block">
                    <button
                        onClick={() => openQuote("Corporate Insurance")}
                        className="bg-[#2076C7] text-white px-8 py-4 rounded-xl shadow-[0_8px_30px_rgb(32,118,199,0.3)] hover:shadow-[0_8px_30px_rgb(28,173,163,0.4)] transition-all duration-300 font-bold hover:-translate-y-1"
                        aria-label="Get a corporate insurance quote"
                    >
                        Get Quote
                    </button>
                </div>

                {/* Background Gradient Layer */}
                <div className="absolute inset-0 bg-gradient-to-br from-blue-50 via-white to-teal-50"></div>

                {/* Premium Glow Effects */}
                <div className="absolute top-0 left-1/3 w-[400px] h-[400px] md:w-[600px] md:h-[600px] bg-[#2076C7]/10 rounded-full blur-[100px] -translate-y-1/2"></div>
                <div className="absolute bottom-0 right-1/4 w-[400px] h-[400px] md:w-[600px] md:h-[600px] bg-[#1CADA3]/10 rounded-full blur-[100px] translate-y-1/2"></div>

                {/* Grid texture overlay */}
                <div className="absolute inset-0 opacity-[0.02]"
                    style={{
                        backgroundImage: "linear-gradient(#2076C7 1px, transparent 1px), linear-gradient(to right, #2076C7 1px, transparent 1px)",
                        backgroundSize: "64px 64px"
                    }}
                />

                <div className="container mx-auto px-4 md:px-6 max-w-7xl relative z-10">
                    <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">
                        {/* LEFT CONTENT */}
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.7 }}
                            className="max-w-2xl mx-auto lg:mx-0 text-center lg:text-left"
                        >
                            {/* Badge */}
                            <div className="inline-flex items-center gap-2 px-4 py-2 mb-6 bg-gradient-to-r from-[#2076C7]/10 to-[#1CADA3]/10 border border-[#2076C7]/20 rounded-full text-sm font-semibold text-[#2076C7]">
                                <ShieldCheck className="w-4 h-4 text-[#1CADA3]" />
                                IRDAI-Approved Corporate Insurance
                            </div>

                            {/* Heading */}
                            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold leading-[1.15] mb-6">
                                <span className="block text-slate-900 mb-2">
                                    Protect your business
                                </span>
                                <span className="block relative inline-block">
                                    <span className="bg-gradient-to-r from-[#2076C7] via-[#1CADA3] to-[#2076C7] bg-clip-text text-transparent bg-[length:200%_auto] animate-gradient">
                                        with confidence.
                                    </span>
                                    {/* subtle underline glow */}
                                    <span className="absolute bottom-1 left-0 w-full h-3 bg-gradient-to-r from-[#2076C7]/30 to-[#1CADA3]/30 blur-md -z-10"></span>
                                </span>
                            </h1>

                            {/* Description */}
                            <p className="text-lg text-slate-600 leading-relaxed mb-10 max-w-xl mx-auto lg:mx-0">
                                Comprehensive insurance solutions for modern Indian businesses.
                                Protect your employees, assets, and operations with coverage from top-rated insurers.
                            </p>

                            {/* CTA */}
                            <div className="flex flex-col sm:flex-row gap-4 mb-10 justify-center lg:justify-start">
                                <button
                                    onClick={() => openQuote("Corporate Insurance")}
                                    className="group relative px-8 py-4 rounded-xl font-bold text-white overflow-hidden shadow-[0_8px_20px_rgb(32,118,199,0.25)] hover:shadow-[0_8px_25px_rgb(28,173,163,0.35)] transition-all"
                                    aria-label="Get a corporate insurance quote"
                                >
                                    <span className="absolute inset-0 bg-gradient-to-r from-[#2076C7] to-[#1CADA3]"></span>
                                    <span className="absolute inset-0 opacity-0 group-hover:opacity-100 transition duration-300 bg-gradient-to-r from-[#1CADA3] to-[#2076C7]"></span>
                                    <span className="relative flex items-center justify-center gap-2">
                                        Get Quote
                                        <ChevronDown className="w-4 h-4 -rotate-90 group-hover:translate-x-1 transition-transform" />
                                    </span>
                                </button>
                                <button
                                    onClick={() => document.getElementById("products")?.scrollIntoView({ behavior: "smooth" })}
                                    className="px-8 py-4 border-2 border-slate-200 rounded-xl font-semibold text-slate-700 hover:border-[#2076C7] hover:text-[#2076C7] hover:bg-white transition-colors duration-300"
                                >
                                    Explore Plans
                                </button>
                            </div>




                        </motion.div>

                        {/* RIGHT GRAPHIC */}
                        <motion.div
                            initial={{ opacity: 0, scale: 0.95 }}
                            animate={{ opacity: 1, scale: 1 }}
                            transition={{ duration: 0.8 }}
                            className="relative mt-12 lg:mt-0"
                        >
                            {/* glow behind graphic */}
                            <div className="absolute inset-0 bg-gradient-to-r from-[#2076C7]/20 to-[#1CADA3]/20 blur-3xl rounded-full"></div>
                            <HeroGraphic />
                        </motion.div>
                    </div>
                </div>
            </section>

            {/* DATA & INSIGHTS SECTION — moved up for impact */}
            <section className="py-20 md:py-24 bg-slate-50 border-t border-slate-200/50">
                <div className="container mx-auto px-4 md:px-6 max-w-7xl">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="text-center mb-16 md:mb-20"
                    >
                        <h2 className="text-3xl md:text-4xl font-bold font-sans mb-4">
                            <span className="bg-gradient-to-r from-[#2076C7] to-[#1CADA3] bg-clip-text text-transparent">
                                Why Corporate Insurance Matters
                            </span>
                        </h2>
                        <p className="text-slate-600 max-w-2xl mx-auto text-lg">
                            Data-driven insights on why comprehensive coverage is crucial for business continuity in India.
                        </p>
                    </motion.div>

                    <div className="grid lg:grid-cols-2 gap-8 lg:gap-12 items-stretch mb-20">
                        {/* CHART 1: RISK DISTRIBUTION */}
                        <motion.div
                            initial={{ opacity: 0, x: -30 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.8 }}
                            className="bg-white p-6 md:p-8 rounded-3xl shadow-lg border border-slate-100 h-full flex flex-col"
                        >
                            <div className="flex items-center gap-4 mb-8">
                                <div className="p-3 bg-red-50 rounded-xl">
                                    <AlertTriangle className="w-6 h-6 text-red-500" />
                                </div>
                                <h3 className="text-xl md:text-2xl font-bold text-slate-800">Top Business Risks in India</h3>
                            </div>
                            <div className="h-[300px] w-full flex-grow">
                                <ResponsiveContainer width="100%" height="100%">
                                    <PieChart>
                                        <Pie
                                            data={riskData}
                                            cx="50%"
                                            cy="50%"
                                            innerRadius={70}
                                            outerRadius={110}
                                            paddingAngle={4}
                                            dataKey="value"
                                            label={({ name, percent }) => `${name} ${((percent || 0) * 100).toFixed(0)}%`}
                                            labelLine={false}
                                        >
                                            {riskData.map((entry, index) => (
                                                <Cell key={`cell-${index}`} fill={entry.color} />
                                            ))}
                                        </Pie>
                                        <Tooltip contentStyle={{ borderRadius: '12px', border: 'none', boxShadow: '0 10px 25px rgba(0,0,0,0.1)' }} />
                                    </PieChart>
                                </ResponsiveContainer>
                            </div>
                            <p className="text-center text-sm text-slate-500 mt-6 pt-4 border-t border-slate-50">
                                *Distribution of common claims faced by Indian enterprises. Cyber attacks now #1 risk.
                            </p>
                        </motion.div>

                        {/* CHART 2: COST SAVINGS */}
                        <motion.div
                            initial={{ opacity: 0, x: 30 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.8 }}
                            className="bg-white p-6 md:p-8 rounded-3xl shadow-lg border border-slate-100 h-full flex flex-col"
                        >
                            <div className="flex items-center gap-4 mb-8">
                                <div className="p-3 bg-green-50 rounded-xl">
                                    <TrendingUp className="w-6 h-6 text-green-600" />
                                </div>
                                <h3 className="text-xl md:text-2xl font-bold text-slate-800">Financial Impact (Liability Costs)</h3>
                            </div>
                            <div className="h-[300px] w-full flex-grow">
                                <ResponsiveContainer width="100%" height="100%">
                                    <AreaChart data={trendData} margin={{ top: 10, right: 30, left: -20, bottom: 0 }}>
                                        <defs>
                                            <linearGradient id="colorUninsured" x1="0" y1="0" x2="0" y2="1">
                                                <stop offset="5%" stopColor="#EF4444" stopOpacity={0.2} />
                                                <stop offset="95%" stopColor="#EF4444" stopOpacity={0} />
                                            </linearGradient>
                                            <linearGradient id="colorInsured" x1="0" y1="0" x2="0" y2="1">
                                                <stop offset="5%" stopColor="#1CADA3" stopOpacity={0.2} />
                                                <stop offset="95%" stopColor="#1CADA3" stopOpacity={0} />
                                            </linearGradient>
                                        </defs>
                                        <XAxis dataKey="year" fontSize={12} tickLine={false} axisLine={false} tickMargin={10} />
                                        <YAxis fontSize={12} tickLine={false} axisLine={false} tickFormatter={(value) => `₹${value}k`} tickMargin={10} />
                                        <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                                        <Tooltip
                                            contentStyle={{ backgroundColor: "#fff", borderRadius: "12px", border: "none", boxShadow: "0 10px 25px rgba(0,0,0,0.1)" }}
                                            itemStyle={{ color: "#1e293b", fontWeight: 600 }}
                                            formatter={(value) => `₹${value}k`}
                                        />
                                        <Area
                                            type="monotone"
                                            dataKey="CostWithoutInsurance"
                                            stroke="#EF4444"
                                            strokeWidth={3}
                                            fillOpacity={1}
                                            fill="url(#colorUninsured)"
                                            name="Cost Without Insurance"
                                        />
                                        <Area
                                            type="monotone"
                                            dataKey="CostWithInsurance"
                                            stroke="#1CADA3"
                                            strokeWidth={3}
                                            fillOpacity={1}
                                            fill="url(#colorInsured)"
                                            name="Cost With Insurance"
                                        />
                                    </AreaChart>
                                </ResponsiveContainer>
                            </div>
                            <p className="text-center text-sm text-slate-500 mt-6 pt-4 border-t border-slate-50">
                                *Projected accumulative costs of liability claims over 5 years (Indian market data).
                            </p>
                        </motion.div>
                    </div>

                    {/* DID YOU KNOW CARDS */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                    >
                        <div className="flex items-center justify-center gap-3 mb-10">
                            <Lightbulb className="w-7 h-7 text-amber-500" />
                            <h3 className="text-2xl md:text-3xl font-bold text-slate-800">Did You Know?</h3>
                        </div>
                        <div className="grid md:grid-cols-3 gap-6">
                            {didYouKnow.map((item, idx) => (
                                <motion.div
                                    key={idx}
                                    whileHover={{ y: -5 }}
                                    className="bg-white p-6 md:p-8 rounded-2xl border border-amber-100 shadow-sm hover:shadow-xl transition-all flex flex-col sm:flex-row gap-5 h-full"
                                >
                                    <div className="w-14 h-14 bg-amber-50 rounded-2xl flex items-center justify-center shrink-0">
                                        <item.icon className="w-7 h-7 text-amber-600" />
                                    </div>
                                    <div>
                                        <h4 className="font-bold text-lg text-slate-800 mb-2 leading-tight">{item.fact}</h4>
                                        <p className="text-sm text-slate-600 leading-relaxed">{item.desc}</p>
                                    </div>
                                </motion.div>
                            ))}
                        </div>
                    </motion.div>
                </div>
            </section>

            {/* PREMIUM CALCULATOR SECTION */}
            <CorporatePremiumCalculator />

            {/* GROUP HEALTH CALCULATOR */}
            <GroupHealthCalculator />


            {/* TOP INSURERS SECTION */}
            <section id="insurers" className="py-20 md:py-24 bg-white border-t border-gray-100">
                <div className="container mx-auto px-4 md:px-6 max-w-7xl">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="text-center mb-16"
                    >
                        <h2 className="text-3xl md:text-4xl font-bold font-sans mb-4">
                            <span className="bg-gradient-to-r from-[#2076C7] to-[#1CADA3] bg-clip-text text-transparent">
                                Leading Commercial & Corporate Insurers in India
                            </span>
                        </h2>
                        <p className="text-slate-600 max-w-3xl mx-auto text-lg">
                            We partner with IRDAI-approved insurers rated on Claim Settlement Ratio, Network Hospitals, and Financial Stability
                        </p>
                    </motion.div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                        {topInsurers.map((insurer, index) => (
                            <motion.div
                                key={index}
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: index * 0.05 }}
                                className={`${insurer.color} p-6 rounded-2xl border hover:shadow-xl hover:-translate-y-1 transition-all duration-300 relative overflow-hidden group flex flex-col h-full`}
                            >
                                <div className="flex justify-between items-start mb-6">
                                    <div>
                                        {insurer.image && (
                                            <div className="h-10 w-28 relative mb-3">
                                                <Image
                                                    src={insurer.image}
                                                    alt={insurer.name}
                                                    fill
                                                    className="object-contain object-left"
                                                />
                                            </div>
                                        )}
                                        <h3 className="font-bold text-lg text-slate-800 leading-tight mb-1">{insurer.name}</h3>
                                    </div>
                                    <span className="bg-white px-2 py-1 rounded-md text-xs font-bold text-slate-700 shadow-sm border border-slate-100 shrink-0">
                                        {insurer.rating}
                                    </span>
                                </div>

                                <div className="space-y-3 mb-6">
                                    <div className="flex justify-between items-center text-sm border-b border-black/5 pb-2">
                                        <span className="text-slate-600">Claim Ratio</span>
                                        <span className="font-bold text-[#1CADA3]">{insurer.claimRatio}</span>
                                    </div>
                                    <div className="flex justify-between items-center text-sm border-b border-black/5 pb-2">
                                        <span className="text-slate-600">Network</span>
                                        <span className="font-semibold text-slate-800">{insurer.network}</span>
                                    </div>
                                    <div className="flex justify-between items-center text-sm">
                                        <span className="text-slate-600">Market Cap</span>
                                        <span className="font-semibold text-slate-800">{insurer.marketCap}</span>
                                    </div>
                                </div>

                                <p className="text-xs text-slate-500 italic mb-6 leading-relaxed line-clamp-2">{insurer.specialty}</p>

                                <div className="mt-auto w-full pt-4 border-t border-black/5">
                                    <button
                                        onClick={() => openQuote(insurer.name)}
                                        className="w-full py-2.5 bg-white rounded-lg text-sm text-[#2076C7] font-semibold border border-[#2076C7]/20 hover:border-[#2076C7] hover:bg-blue-50 transition-all flex items-center justify-center gap-2 group/btn"
                                        aria-label={`Get quote from ${insurer.name}`}
                                    >
                                        Get Quote
                                        <ExternalLink className="w-3.5 h-3.5 group-hover/btn:translate-x-0.5 group-hover/btn:-translate-y-0.5 transition-transform" />
                                    </button>
                                </div>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>

            {/* COMPARISON CHART SECTION */}
            <InsurersComparisonChart />

            {/* PRODUCTS SECTION */}
            <section id="products" className="py-20 md:py-24 bg-white border-t border-gray-100">
                <div className="container mx-auto px-4 md:px-6 max-w-7xl">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="text-center mb-12 md:mb-16"
                    >
                        <h2 className="text-3xl md:text-4xl font-bold font-sans mb-4">
                            <span className="bg-gradient-to-r from-[#2076C7] to-[#1CADA3] bg-clip-text text-transparent">
                                Insurance Products
                            </span>
                        </h2>
                        <p className="text-slate-600 max-w-2xl mx-auto text-lg">
                            Comprehensive coverage tailored for Indian businesses. All products backed by top-rated insurers with competitive premiums.
                        </p>
                    </motion.div>

                    <div className="flex flex-wrap justify-center gap-3 mb-12 max-w-3xl mx-auto">
                        {["All", "Accident", "Health", "Property", "Liability", "Cyber", "Life"].map((filter) => (
                            <button
                                key={filter}
                                onClick={() => setActiveFilter(filter)}
                                className={`px-6 py-2.5 rounded-full text-sm font-bold transition-all duration-300 ${activeFilter === filter
                                    ? "bg-gradient-to-r from-[#2076C7] to-[#1CADA3] text-white shadow-md scale-105"
                                    : "bg-slate-50 text-slate-600 border border-slate-200 hover:border-[#2076C7]/50 hover:text-[#2076C7] hover:bg-white"
                                    }`}
                            >
                                {filter}
                            </button>
                        ))}
                    </div>

                    <motion.div
                        variants={staggerContainer}
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true }}
                        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8"
                    >
                        {products
                            .filter(product => activeFilter === "All" || product.category === activeFilter)
                            .map((product, index) => (
                                <motion.div
                                    key={index}
                                    variants={fadeInUp}
                                    whileHover="hover"
                                    initial="rest"
                                    animate="rest"
                                    className="relative flex"
                                    onMouseEnter={() => setSelectedProduct(product.title)}
                                    onMouseLeave={() => setSelectedProduct(null)}
                                >
                                    {product.popular && (
                                        <div className="absolute -top-3 right-6 bg-gradient-to-r from-orange-500 to-amber-500 text-white text-xs font-bold px-4 py-1.5 rounded-full z-10 shadow-lg border border-white/20">
                                            Most Popular
                                        </div>
                                    )}
                                    <motion.div
                                        variants={cardHover}
                                        className={`bg-white p-6 md:p-8 rounded-2xl shadow-sm hover:shadow-xl border-2 ${selectedProduct === product.title ? 'border-[#2076C7]/50 shadow-blue-500/10' : 'border-slate-100'
                                            } h-full w-full flex flex-col relative overflow-hidden group transition-all duration-300`}
                                    >
                                        <div className={`absolute top-0 right-0 w-24 h-24 ${product.bg} rounded-bl-full opacity-30 transition-transform group-hover:scale-110`}></div>

                                        <div className={`w-14 h-14 rounded-xl flex items-center justify-center mb-6 ${product.bg}`}>
                                            <product.icon className={`w-7 h-7 ${product.color}`} />
                                        </div>

                                        <h3 className="font-bold text-xl mb-3 text-slate-800 leading-tight pr-4">
                                            {product.title}
                                        </h3>

                                        <p className="text-slate-600 text-sm leading-relaxed mb-6">
                                            {product.desc}
                                        </p>

                                        {/* Coverage Details */}
                                        <div className="space-y-3 text-sm border-t border-slate-100 pt-5 mt-auto mb-6">
                                            <div className="flex justify-between items-center">
                                                <span className="text-slate-500">Coverage:</span>
                                                <span className="font-semibold text-slate-800">{product.coverage}</span>
                                            </div>
                                            <div className="flex justify-between items-center">
                                                <span className="text-slate-500">Network:</span>
                                                <span className="font-semibold text-slate-800">{product.network}</span>
                                            </div>
                                            <div className="flex justify-between items-center">
                                                <span className="text-slate-500">Claim Ratio:</span>
                                                <span className="font-bold text-[#1CADA3]">{product.claimRatio}</span>
                                            </div>
                                            <div className="flex justify-between items-center">
                                                <span className="text-slate-500">Premium:</span>
                                                <span className="font-bold text-[#2076C7]">{product.premium}</span>
                                            </div>
                                        </div>

                                        <div className="w-full pt-2">
                                            <button
                                                onClick={openSignup}
                                                className="w-full py-3 text-sm bg-slate-50 text-slate-700 hover:bg-gradient-to-r hover:from-[#2076C7] hover:to-[#1CADA3] hover:text-white border border-slate-200 hover:border-transparent rounded-xl font-bold transition-all duration-300"
                                                aria-label={`Get quote for ${product.title}`}
                                            >
                                                Get Quote
                                            </button>
                                        </div>
                                    </motion.div>
                                </motion.div>
                            ))}
                    </motion.div>
                </div>
            </section>

            {/* INDUSTRIES SECTION */}
            <section className="py-20 md:py-24 bg-slate-50 border-t border-slate-200/50">
                <div className="container mx-auto px-4 md:px-6 max-w-7xl">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="text-center mb-12 md:mb-16"
                    >
                        <h2 className="text-3xl md:text-4xl font-bold font-sans mb-4">
                            <span className="bg-gradient-to-r from-[#2076C7] to-[#1CADA3] bg-clip-text text-transparent">
                                Industries We Serve
                            </span>
                        </h2>
                        <p className="text-slate-600 max-w-2xl mx-auto text-lg">
                            Tailored insurance solutions for every industry sector
                        </p>
                    </motion.div>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
                        {industries.map((industry, index) => (
                            <motion.div
                                key={index}
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: index * 0.1 }}
                                className="bg-white p-8 rounded-2xl hover:shadow-xl transition-all duration-300 border border-slate-100 group flex flex-col items-center text-center h-full"
                            >
                                <div className="w-16 h-16 bg-blue-50 rounded-2xl flex items-center justify-center mb-6 group-hover:-translate-y-2 transition-transform duration-300">
                                    <industry.icon className="text-[#2076C7] w-8 h-8" />
                                </div>
                                <h3 className="font-bold text-xl text-slate-800 mb-3">
                                    {industry.title}
                                </h3>
                                <p className="text-sm text-slate-600 leading-relaxed max-w-xs mx-auto">
                                    {industry.desc}
                                </p>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>

            {/* PROCESS SECTION */}
            <section className="py-20 md:py-24 bg-white border-t border-slate-100">
                <div className="container mx-auto px-4 md:px-6 max-w-7xl">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="text-center mb-16"
                    >
                        <h2 className="text-3xl md:text-4xl font-bold font-sans mb-4">
                            <span className="bg-gradient-to-r from-[#2076C7] to-[#1CADA3] bg-clip-text text-transparent">
                                How It Works
                            </span>
                        </h2>
                        <p className="text-slate-600 max-w-2xl mx-auto text-lg">
                            Get insured in 4 simple steps
                        </p>
                    </motion.div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8">
                        {process.map((step, index) => (
                            <motion.div
                                key={index}
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: index * 0.1 }}
                                className="bg-slate-50 p-8 rounded-2xl border border-slate-100 h-full relative group hover:bg-white hover:shadow-xl transition-all duration-300"
                            >
                                <div className="absolute -top-4 -left-4 w-12 h-12 bg-gradient-to-br from-[#2076C7] to-[#1CADA3] text-white rounded-xl flex items-center justify-center font-bold text-xl shadow-lg transform -rotate-6 group-hover:rotate-0 transition-transform">
                                    {index + 1}
                                </div>

                                <div className="mt-4 flex flex-col h-full">
                                    <h3 className="font-bold text-xl mb-3 text-slate-800 pr-2">
                                        {step.title}
                                    </h3>
                                    <p className="text-slate-600 text-sm leading-relaxed">
                                        {step.desc}
                                    </p>
                                </div>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>

            {/* CLAIMS SUPPORT SECTION */}
            <section className="py-20 md:py-24 bg-blue-50/50 border-y border-blue-100/50">
                <div className="container mx-auto px-4 md:px-6 max-w-7xl">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="text-center mb-16"
                    >
                        <span className="inline-block py-1.5 px-4 rounded-full bg-blue-100 text-[#2076C7] text-sm font-bold mb-4 border border-blue-200/50">
                            Claims Assistance
                        </span>
                        <h2 className="text-3xl md:text-4xl font-bold font-sans mb-4">
                            <span className="bg-gradient-to-r from-[#2076C7] to-[#1CADA3] bg-clip-text text-transparent">
                                Seamless Claims Experience
                            </span>
                        </h2>
                        <p className="text-slate-600 max-w-2xl mx-auto text-lg">
                            We don't just sell policies; we settle claims. Our dedicated team ensures you get what you were promised.
                        </p>
                    </motion.div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8">
                        {[
                            {
                                title: "Dedicated Manager",
                                desc: "A single point of contact for all your claim-related queries.",
                                icon: UserCheck,
                                color: "text-blue-600",
                                bg: "bg-blue-100"
                            },
                            {
                                title: "Documentation Support",
                                desc: "Complete handholding with paperwork to avoid rejections.",
                                icon: FileText,
                                color: "text-teal-600",
                                bg: "bg-teal-100"
                            },
                            {
                                title: "Insurer Coordination",
                                desc: "We talk to the insurers so you can focus on your business.",
                                icon: Handshake,
                                color: "text-purple-600",
                                bg: "bg-purple-100"
                            },
                            {
                                title: "Escalation Support",
                                desc: "Priority resolution channels for complex or delayed claims.",
                                icon: TrendingUp,
                                color: "text-red-600",
                                bg: "bg-red-100"
                            }
                        ].map((item, index) => (
                            <motion.div
                                key={index}
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: index * 0.1 }}
                                className="bg-white p-6 md:p-8 rounded-2xl shadow-sm border border-white hover:border-blue-100 hover:shadow-xl transition-all duration-300 text-center flex flex-col h-full group"
                            >
                                <div className={`w-16 h-16 ${item.bg} rounded-2xl flex items-center justify-center mx-auto mb-6 group-hover:-translate-y-2 transition-transform duration-300`}>
                                    <item.icon className={`w-8 h-8 ${item.color}`} />
                                </div>
                                <h3 className="font-bold text-slate-800 mb-3 text-lg leading-tight">
                                    {item.title}
                                </h3>
                                <p className="text-sm text-slate-600 leading-relaxed">
                                    {item.desc}
                                </p>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>

            {/* BENEFITS SECTION */}
            <section className="py-20 md:py-24 bg-white">
                <div className="container mx-auto px-4 md:px-6 max-w-7xl">
                    <div className="text-center mb-16">
                        <h2 className="text-3xl md:text-4xl font-bold font-sans mb-4">
                            <span className="bg-gradient-to-r from-[#2076C7] to-[#1CADA3] bg-clip-text text-transparent">
                                Benefits
                            </span>
                        </h2>
                        <p className="text-slate-600 max-w-2xl mx-auto text-lg">
                            Why choose our corporate insurance solutions
                        </p>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-6 md:gap-8">
                        {benefits.map((benefit, index) => (
                            <div
                                key={index}
                                className="bg-slate-50 p-8 rounded-2xl border border-slate-100 hover:bg-white hover:shadow-xl hover:-translate-y-1 transition-all duration-300 text-center flex flex-col h-full"
                            >
                                <div className="w-16 h-16 bg-gradient-to-br from-[#2076C7] to-[#1CADA3] rounded-2xl flex items-center justify-center mx-auto mb-6 shadow-md transform rotate-3">
                                    <benefit.icon className="text-white w-8 h-8 -rotate-3" />
                                </div>
                                <h3 className="font-bold text-xl text-slate-800 mb-3">
                                    {benefit.title}
                                </h3>
                                <p className="text-slate-600 text-sm leading-relaxed">
                                    {benefit.desc}
                                </p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* FAQ SECTION */}
            <section className="py-20 md:py-24 bg-white border-t border-slate-100">
                <div className="container mx-auto px-4 md:px-6 max-w-4xl">
                    <div className="text-center mb-12 md:mb-16">
                        <h2 className="text-3xl md:text-4xl font-bold font-sans mb-4">
                            <span className="bg-gradient-to-r from-[#2076C7] to-[#1CADA3] bg-clip-text text-transparent">
                                Frequently Asked Questions
                            </span>
                        </h2>
                        <p className="text-slate-600 max-w-2xl mx-auto text-lg">
                            Got questions? We've got answers.
                        </p>
                    </div>

                    <div className="bg-white rounded-2xl border border-slate-200 divide-y divide-slate-100 overflow-hidden shadow-sm">
                        {faqs.map((faq, index) => (
                            <div key={index} className="group">
                                <button
                                    onClick={() => setExpandedIdx(expandedIdx === index ? null : index)}
                                    className={`flex justify-between items-center w-full px-6 py-5 text-left transition-colors duration-200 ${expandedIdx === index ? 'bg-blue-50/50' : 'hover:bg-slate-50'}`}
                                    aria-expanded={expandedIdx === index}
                                    aria-controls={`faq-answer-${index}`}
                                >
                                    <span className="font-bold text-slate-800 pr-8">{faq.q}</span>
                                    <ChevronDown className={`transition-transform duration-300 flex-shrink-0 text-slate-400 ${expandedIdx === index ? 'rotate-180 text-[#2076C7]' : 'group-hover:text-[#2076C7]'}`} />
                                </button>

                                <AnimatePresence>
                                    {expandedIdx === index && (
                                        <motion.div
                                            initial={{ height: 0, opacity: 0 }}
                                            animate={{ height: "auto", opacity: 1 }}
                                            exit={{ height: 0, opacity: 0 }}
                                            className="overflow-hidden bg-blue-50/20"
                                            id={`faq-answer-${index}`}
                                        >
                                            <div className="px-6 pb-6 pt-2 text-slate-600 leading-relaxed text-sm md:text-base">
                                                {faq.a}
                                            </div>
                                        </motion.div>
                                    )}
                                </AnimatePresence>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* CORPORATE CONTACT FORM */}
            <CorporateContactForm />

            {/* IRDAI COMPLIANCE SECTION */}
            <section className="py-12 md:py-16 bg-white border-y border-slate-200">
                <div className="container mx-auto px-4 md:px-6 max-w-5xl">
                    <div className="space-y-8">
                        {/* Company Details */}
                        <div className="text-center pb-8 border-b border-slate-200">
                            <h3 className="font-extrabold text-[#2076C7] tracking-wide text-lg mb-6">
                                INFINITY ARTHVISHVA INSURANCE BROKER PRIVATE LIMITED
                            </h3>
                            <div className="flex flex-wrap justify-center gap-4 text-sm">
                                <div className="px-5 py-3 bg-slate-50 border border-slate-200 rounded-xl min-w-[160px]">
                                    <span className="text-slate-500 text-xs block mb-1 uppercase tracking-wider font-semibold">CIN</span>
                                    <span className="font-bold text-slate-700">U65110PN2025PTC241213</span>
                                </div>
                                <div className="px-5 py-3 bg-slate-50 border border-slate-200 rounded-xl min-w-[160px]">
                                    <span className="text-slate-500 text-xs block mb-1 uppercase tracking-wider font-semibold">GST</span>
                                    <span className="font-medium italic text-slate-600">Under Process</span>
                                </div>
                                <div className="px-5 py-3 bg-slate-50 border border-slate-200 rounded-xl min-w-[160px]">
                                    <span className="text-slate-500 text-xs block mb-1 uppercase tracking-wider font-semibold">Registered Office</span>
                                    <span className="font-bold text-slate-700">Pune, Maharashtra</span>
                                </div>
                            </div>
                        </div>

                        {/* Warning */}
                        <div className="bg-amber-50 p-6 md:p-8 rounded-2xl border border-amber-200 max-w-3xl mx-auto">
                            <div className="flex flex-col sm:flex-row items-center sm:items-start gap-4 text-center sm:text-left">
                                <div className="bg-amber-100 p-3 rounded-full shrink-0">
                                    <AlertTriangle className="w-6 h-6 text-amber-600" />
                                </div>
                                <div>
                                    <h4 className="font-bold text-amber-900 mb-2">
                                        BEWARE OF SPURIOUS PHONE CALLS
                                    </h4>
                                    <p className="text-sm text-amber-800/80 leading-relaxed">
                                        IRDAI is not involved in activities like selling insurance policies, announcing bonus or investment of premiums.
                                        Public receiving such phone calls are requested to lodge a police complaint.
                                    </p>
                                </div>
                            </div>
                        </div>

                        {/* Disclaimers */}
                        <div className="text-center space-y-4 pt-4">
                            <p className="text-xs text-slate-500 max-w-3xl mx-auto leading-relaxed">
                                {disclaimer}
                            </p>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    );

}

// ----------------------------------------------------------------------
// SUB-COMPONENTS
// ----------------------------------------------------------------------

// Business Types & Risk Factors
const BUSINESS_TYPES = [
    { id: "office", name: "Office / IT / Consulting", riskRate: 0.0005 }, // Low risk (0.05%)
    { id: "shop", name: "Retail Shop / Showroom", riskRate: 0.0015 },     // Medium risk (0.15%)
    { id: "warehouse", name: "Warehouse / Godown", riskRate: 0.0025 },    // High risk (0.25%)
    { id: "factory", name: "Factory / Manufacturing", riskRate: 0.0035 }, // Very High risk (0.35%)
    { id: "restaurant", name: "Restaurant / Hotel", riskRate: 0.0020 },   // Medium-High
];

// Liability Tiers (Turnover based -> Approx Premium)
const LIABILITY_TIERS = [
    { label: "Up to ₹50 Lakhs", premium: 2500 },
    { label: "₹50L - ₹2 Cr", premium: 5000 },
    { label: "₹2 Cr - ₹10 Cr", premium: 12000 },
    { label: "Over ₹10 Cr", premium: 25000 },
];

function CorporatePremiumCalculator() {
    const { openQuote } = useModal();

    // State
    const [businessType, setBusinessType] = useState(BUSINESS_TYPES[0]);
    const [assetValue, setAssetValue] = useState<number>(1000000); // 10 Lakhs default
    const [turnover, setTurnover] = useState(LIABILITY_TIERS[0]);

    // Covers
    const [covers, setCovers] = useState({
        fire: true,
        burglary: true,
        liability: false,
    });

    const [premiums, setPremiums] = useState({
        fire: 0,
        burglary: 0,
        liability: 0,
        total: 0
    });
    const [isAnimating, setIsAnimating] = useState(false);

    // Calculate Premium
    useEffect(() => {
        setIsAnimating(true);

        const timer = setTimeout(() => {
            let firePremium = 0;
            let burglaryPremium = 0;
            let liabilityPremium = 0;

            if (covers.fire) firePremium = assetValue * businessType.riskRate;
            if (covers.burglary) burglaryPremium = assetValue * 0.001;
            if (covers.liability) liabilityPremium = turnover.premium;

            const total = Math.round(firePremium + burglaryPremium + liabilityPremium);
            setPremiums({
                fire: Math.round(firePremium),
                burglary: Math.round(burglaryPremium),
                liability: Math.round(liabilityPremium),
                total: total
            });
            setIsAnimating(false);
        }, 400);

        return () => clearTimeout(timer);
    }, [businessType, assetValue, turnover, covers]);

    const formatCurrency = (amount: number) => {
        return new Intl.NumberFormat('en-IN', {
            style: 'currency',
            currency: 'INR',
            maximumFractionDigits: 0
        }).format(amount);
    };

    const toggleCover = (key: keyof typeof covers) => {
        setCovers(prev => ({ ...prev, [key]: !prev[key] }));
    };

    return (
        <section className="py-20 md:py-24 bg-white border-t border-slate-100">
            <div className="container mx-auto px-4 md:px-6 max-w-7xl">
                <div className="flex flex-col lg:flex-row gap-12 lg:gap-16 items-start">
                    {/* LEFT: CONTENT */}
                    <div className="w-full lg:w-5/12 pt-4 lg:pt-12">
                        <motion.div
                            initial={{ opacity: 0, x: -20 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true }}
                        >
                            <span className="inline-flex items-center gap-2 px-4 py-1.5 bg-gradient-to-r from-[#2076C7]/10 to-[#1CADA3]/10 text-[#2076C7] rounded-full text-xs font-bold uppercase tracking-wider mb-6 border border-[#2076C7]/20">
                                <Calculator className="w-3.5 h-3.5 text-[#1CADA3]" />
                                Business Shield Estimator
                            </span>
                            <h2 className="text-3xl md:text-4xl font-extrabold mb-6 text-slate-800 leading-tight">
                                Estimate Your Business Insurance Cost
                            </h2>
                            <p className="text-slate-600 mb-10 text-lg leading-relaxed">
                                Comprehensive protection for your assets, stock, and legal liabilities.
                                Secure your business against Fire, Theft, and Third-Party claims.
                            </p>

                            <div className="space-y-6">
                                <div className="flex items-start gap-4">
                                    <div className="mt-1 bg-blue-50 p-2 rounded-xl shrink-0">
                                        <ShieldCheck className="w-5 h-5 text-[#2076C7]" />
                                    </div>
                                    <div>
                                        <h4 className="font-bold text-slate-800 mb-1">Assets Cover</h4>
                                        <p className="text-sm text-slate-600">Protects Building, Plant, Machinery & Stock.</p>
                                    </div>
                                </div>
                                <div className="flex items-start gap-4">
                                    <div className="mt-1 bg-blue-50 p-2 rounded-xl shrink-0">
                                        <ShieldCheck className="w-5 h-5 text-[#2076C7]" />
                                    </div>
                                    <div>
                                        <h4 className="font-bold text-slate-800 mb-1">Burglary</h4>
                                        <p className="text-sm text-slate-600">Coverage against Keyman theft and forcible entry.</p>
                                    </div>
                                </div>
                                <div className="flex items-start gap-4">
                                    <div className="mt-1 bg-blue-50 p-2 rounded-xl shrink-0">
                                        <ShieldCheck className="w-5 h-5 text-[#2076C7]" />
                                    </div>
                                    <div>
                                        <h4 className="font-bold text-slate-800 mb-1">Liability</h4>
                                        <p className="text-sm text-slate-600">Legal protection against third-party bodily injury or property damage.</p>
                                    </div>
                                </div>
                            </div>
                        </motion.div>
                    </div>

                    {/* RIGHT: CALCULATOR CARD */}
                    <div className="w-full lg:w-7/12">
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            className="bg-white rounded-[2rem] shadow-[0_10px_40px_rgb(0,0,0,0.08)] border border-slate-100 overflow-hidden"
                        >
                            <div className="bg-gradient-to-r from-[#2076C7] to-[#1CADA3] p-6 sm:p-8 text-white text-center">
                                <h3 className="font-bold font-sans text-2xl mb-1">SME Package Calculator</h3>
                                <p className="text-white/90 text-sm font-medium">Fire + Burglary + Public Liability</p>
                            </div>

                            <div className="p-6 sm:p-10">
                                <div className="grid md:grid-cols-2 gap-8 mb-10">
                                    {/* INPUT: BUSINESS TYPE */}
                                    <div className="space-y-3">
                                        <label className="text-sm font-bold text-slate-700 flex items-center gap-2">
                                            <Store className="w-4 h-4 text-[#2076C7]" />
                                            Business Type
                                        </label>
                                        <select
                                            value={businessType.id}
                                            onChange={(e) => setBusinessType(BUSINESS_TYPES.find(b => b.id === e.target.value) || BUSINESS_TYPES[0])}
                                            className="w-full p-4 rounded-xl border border-slate-200 focus:border-[#2076C7] focus:ring-4 focus:ring-[#2076C7]/10 outline-none text-slate-700 font-semibold transition-all"
                                        >
                                            {BUSINESS_TYPES.map((type) => (
                                                <option key={type.id} value={type.id}>{type.name}</option>
                                            ))}
                                        </select>
                                    </div>

                                    {/* INPUT: TURNOVER (FOR LIABILITY) */}
                                    <div className="space-y-3">
                                        <label className="text-sm font-bold text-slate-700 flex items-center gap-2">
                                            <TrendingUp className="w-4 h-4 text-[#2076C7]" />
                                            Annual Turnover (For Liability)
                                        </label>
                                        <select
                                            value={turnover.label}
                                            onChange={(e) => setTurnover(LIABILITY_TIERS.find(t => t.label === e.target.value) || LIABILITY_TIERS[0])}
                                            className="w-full p-4 rounded-xl border border-slate-200 focus:border-[#2076C7] focus:ring-4 focus:ring-[#2076C7]/10 outline-none text-slate-700 font-semibold transition-all"
                                        >
                                            {LIABILITY_TIERS.map((tier) => (
                                                <option key={tier.label} value={tier.label}>{tier.label}</option>
                                            ))}
                                        </select>
                                    </div>

                                    {/* INPUT: ASSET VALUE */}
                                    <div className="space-y-3 md:col-span-2">
                                        <label className="text-sm font-bold text-slate-700 flex items-center gap-2">
                                            <IndianRupee className="w-4 h-4 text-[#2076C7]" />
                                            Total Value of Assets (Stock + Furniture)
                                        </label>
                                        <div className="relative pt-2 pb-6 px-2">
                                            <input
                                                type="range"
                                                min="500000"
                                                max="50000000"
                                                step="500000"
                                                value={assetValue}
                                                onChange={(e) => setAssetValue(parseInt(e.target.value))}
                                                className="w-full h-2.5 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-[#1CADA3]"
                                            />
                                            <div className="flex justify-between mt-4">
                                                <span className="text-xs font-semibold text-slate-400">₹5L</span>
                                                <span className="text-sm font-extrabold text-[#2076C7] bg-blue-50 px-3 py-1.5 rounded-lg border border-blue-100 shadow-sm absolute left-1/2 -translate-x-1/2 top-8">
                                                    {formatCurrency(assetValue)}
                                                </span>
                                                <span className="text-xs font-semibold text-slate-400">₹5Cr+</span>
                                            </div>
                                        </div>
                                    </div>

                                    {/* COVER SELECTION */}
                                    <div className="space-y-4 md:col-span-2">
                                        <label className="text-sm font-bold text-slate-700 flex items-center gap-2">
                                            <Shield className="w-4 h-4 text-[#2076C7]" />
                                            Selected Covers
                                        </label>
                                        <div className="grid sm:grid-cols-3 gap-3">
                                            <label className={`flex items-center gap-3 cursor-pointer p-4 rounded-xl border transition-all ${covers.fire ? 'border-[#2076C7] bg-blue-50/50' : 'border-slate-200 hover:border-slate-300'}`}>
                                                <input
                                                    type="checkbox"
                                                    checked={covers.fire}
                                                    onChange={() => toggleCover('fire')}
                                                    className="w-4 h-4 accent-[#2076C7] cursor-pointer"
                                                />
                                                <span className="text-sm font-semibold text-slate-700">Fire & Perils</span>
                                            </label>
                                            <label className={`flex items-center gap-3 cursor-pointer p-4 rounded-xl border transition-all ${covers.burglary ? 'border-[#2076C7] bg-blue-50/50' : 'border-slate-200 hover:border-slate-300'}`}>
                                                <input
                                                    type="checkbox"
                                                    checked={covers.burglary}
                                                    onChange={() => toggleCover('burglary')}
                                                    className="w-4 h-4 accent-[#2076C7] cursor-pointer"
                                                />
                                                <span className="text-sm font-semibold text-slate-700">Burglary</span>
                                            </label>
                                            <label className={`flex items-center gap-3 cursor-pointer p-4 rounded-xl border transition-all ${covers.liability ? 'border-[#2076C7] bg-blue-50/50' : 'border-slate-200 hover:border-slate-300'}`}>
                                                <input
                                                    type="checkbox"
                                                    checked={covers.liability}
                                                    onChange={() => toggleCover('liability')}
                                                    className="w-4 h-4 accent-[#2076C7] cursor-pointer"
                                                />
                                                <span className="text-sm font-semibold text-slate-700">Public Liability</span>
                                            </label>
                                        </div>
                                    </div>
                                </div>

                                {/* OUTPUT SECTION */}
                                <div className="bg-slate-50 rounded-2xl p-6 sm:p-8 border border-slate-200">
                                    <div className="flex flex-col md:flex-row justify-between items-center gap-6">
                                        <div className="w-full md:w-auto">
                                            <p className="text-sm text-slate-500 font-bold mb-2 uppercase tracking-wide">Estimated Annual Premium</p>
                                            <div className="flex items-baseline gap-2">
                                                {isAnimating ? (
                                                    <span className="text-3xl md:text-4xl font-bold text-slate-300 animate-pulse">Calculating...</span>
                                                ) : (
                                                    <>
                                                        <h3 className="text-4xl md:text-5xl font-extrabold text-slate-900 tracking-tight">
                                                            {formatCurrency(premiums.total)}
                                                        </h3>
                                                        <span className="text-sm text-slate-500 font-semibold">+ GST</span>
                                                    </>
                                                )}
                                            </div>

                                            {/* Premium Breakdown */}
                                            {!isAnimating && premiums.total > 0 && (
                                                <div className="mt-5 text-sm font-medium text-slate-600 space-y-2 bg-white p-4 rounded-xl border border-slate-100 shadow-sm">
                                                    {premiums.fire > 0 && (
                                                        <div className="flex justify-between items-center">
                                                            <span className="flex items-center gap-2"><Flame className="w-3.5 h-3.5 text-orange-500" /> Fire</span>
                                                            <span className="font-bold text-slate-800">{formatCurrency(premiums.fire)}</span>
                                                        </div>
                                                    )}
                                                    {premiums.burglary > 0 && (
                                                        <div className="flex justify-between items-center">
                                                            <span className="flex items-center gap-2"><Shield className="w-3.5 h-3.5 text-blue-500" /> Burglary</span>
                                                            <span className="font-bold text-slate-800">{formatCurrency(premiums.burglary)}</span>
                                                        </div>
                                                    )}
                                                    {premiums.liability > 0 && (
                                                        <div className="flex justify-between items-center">
                                                            <span className="flex items-center gap-2"><Scale className="w-3.5 h-3.5 text-purple-500" /> Liability</span>
                                                            <span className="font-bold text-slate-800">{formatCurrency(premiums.liability)}</span>
                                                        </div>
                                                    )}
                                                </div>
                                            )}
                                            <p className="text-xs text-slate-400 mt-4 italic">
                                                *Indicative premium for selected {Object.values(covers).filter(Boolean).length} covers.
                                            </p>
                                        </div>

                                        <button
                                            onClick={() => openQuote("Corporate Premium Estimate")}
                                            className="w-full md:w-auto px-8 py-4 bg-gradient-to-r from-[#2076C7] to-[#1CADA3] text-white rounded-xl font-bold hover:shadow-[0_8px_25px_rgb(32,118,199,0.3)] transition-all transform hover:-translate-y-1 shrink-0"
                                        >
                                            Get Detailed Quote
                                        </button>
                                    </div>
                                </div>

                                <div className="mt-6 flex items-start gap-3 p-4 bg-amber-50 rounded-xl text-amber-800 text-sm border border-amber-100">
                                    <AlertCircle className="w-5 h-5 shrink-0 mt-0.5" />
                                    <p className="leading-relaxed">
                                        <span className="font-semibold">Disclaimer: </span>Starting premiums are indicative for a base sum insured for a healthy group of 100+ employees. Final quotes may vary based on group age, industry risk, and chosen add-ons as per IRDAI guidelines.
                                    </p>
                                </div>
                            </div>
                        </motion.div>
                    </div>
                </div>
            </div>
        </section>
    );
}

const InsurersComparisonChart = () => {
    const comparisonData = [
        { name: "HDFC ERGO", claimRatio: "96.7%", network: "13,000+", rating: 4.5, solvency: "2.14", incurredClaims: "85%", feature: "Unlimited Restoration" },
        { name: "ICICI Lombard", claimRatio: "97.2%", network: "10,000+", rating: 4.4, solvency: "2.56", incurredClaims: "82%", feature: "Wellness Program" },
        { name: "Tata AIG", claimRatio: "97.0%", network: "10,500+", rating: 4.5, solvency: "2.28", incurredClaims: "80%", feature: "24x7 Claims Support" },
        { name: "New India Assurance", claimRatio: "93.0%", network: "14,000+", rating: 4.3, solvency: "1.95", incurredClaims: "92%", feature: "Sovereign Backing" },
        { name: "Bajaj Allianz", claimRatio: "96.8%", network: "12,000+", rating: 4.6, solvency: "3.10", incurredClaims: "78%", feature: "Global Assistance" },
        { name: "Digit Insurance", claimRatio: "96.0%", network: "5,900+", rating: 4.4, solvency: "1.89", incurredClaims: "81%", feature: "Digital Claims" },
        { name: "Cholamandalam MS", claimRatio: "95.8%", network: "7,200+", rating: 4.2, solvency: "2.12", incurredClaims: "83%", feature: "SME Specialist" },
        { name: "Royal Sundaram", claimRatio: "94.5%", network: "5,000+", rating: 4.1, solvency: "1.95", incurredClaims: "86%", feature: "Business Shield" },
        { name: "Future Generali", claimRatio: "95.2%", network: "6,000+", rating: 4.0, solvency: "1.79", incurredClaims: "84%", feature: "Retail & SME Plans" },
        { name: "Zurich Kotak", claimRatio: "95.8%", network: "5,500+", rating: 4.3, solvency: "2.39", incurredClaims: "83%", feature: "Global Backing" },
        { name: "Liberty General", claimRatio: "90.5%", network: "5,000+", rating: 3.9, solvency: "1.80", incurredClaims: "75%", feature: "Motor & Commercial" }
    ];

    return (
        <section className="py-20 md:py-24 bg-slate-50 border-t border-slate-200/50">
            <div className="container mx-auto px-4 md:px-6 max-w-7xl">
                <motion.div
                    initial={{ opacity: 0, y: 40 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="bg-white rounded-[2rem] md:rounded-[3rem] p-6 sm:p-8 md:p-12 shadow-xl border border-slate-200 overflow-hidden relative"
                >
                    <svg width="0" height="0" className="absolute">
                        <linearGradient id="comparison-gradient" x1="0%" y1="0%" x2="100%" y2="0%">
                            <stop offset="0%" stopColor="#2076C7" />
                            <stop offset="100%" stopColor="#1CADA3" />
                        </linearGradient>
                    </svg>

                    <div className="absolute top-0 left-0 w-64 h-64 bg-[#2076C7]/5 rounded-full blur-3xl -translate-y-1/2 -translate-x-1/2 z-0 pointer-events-none"></div>

                    <div className="relative z-10">
                        <div className="text-center mb-12">
                            <motion.div
                                initial={{ opacity: 0, scale: 0.9 }}
                                whileInView={{ opacity: 1, scale: 1 }}
                                className="inline-flex items-center gap-3 bg-blue-50 px-6 py-2.5 rounded-full text-slate-800 font-bold text-sm uppercase tracking-widest mb-6 border border-blue-100"
                            >
                                <Scale size={18} className="text-[#2076C7]" /> Insurer Comparison Matrix
                            </motion.div>
                            <h2 className="text-3xl md:text-4xl font-extrabold font-sans mb-4 bg-clip-text text-transparent drop-shadow-sm" style={{ background: 'linear-gradient(to right, #2076C7, #1CADA3)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>
                                Compare India's Best Insurers
                            </h2>
                            <div className="w-24 h-1.5 mx-auto rounded-full mb-6" style={{ background: 'linear-gradient(to right, #2076C7, #1CADA3, #2076C7)' }}></div>
                            <p className="text-slate-600 mb-8 max-w-3xl mx-auto text-lg">
                                Evaluate top insurance providers based on critical performance metrics like Claim Settlement Ratio, financial strength, and network coverage.
                            </p>
                        </div>

                        {/* Mobile Card View */}
                        <div className="md:hidden space-y-6">
                            {comparisonData.map((insurer, index) => (
                                <div key={index} className="bg-slate-50 p-6 rounded-2xl border border-slate-200 shadow-sm">
                                    <div className="flex justify-between items-center mb-5 pb-4 border-b border-slate-200">
                                        <h3 className="text-lg font-bold text-slate-800">{insurer.name}</h3>
                                        <div className="flex items-center gap-1.5 bg-yellow-50 px-2.5 py-1 rounded-md border border-yellow-100">
                                            <span className="font-bold text-slate-800 text-sm">{insurer.rating}</span>
                                            <Star size={14} className="text-yellow-500 fill-yellow-500" />
                                        </div>
                                    </div>

                                    <div className="space-y-4">
                                        <div className="flex justify-between items-center">
                                            <span className="text-slate-600 text-sm font-medium">Claim Settlement</span>
                                            <div className="flex flex-col items-end w-1/2">
                                                <span className="font-bold text-[#1CADA3]">{insurer.claimRatio}</span>
                                                <div className="w-full h-1.5 bg-slate-200 rounded-full mt-1.5">
                                                    <div className="h-full bg-[#1CADA3] rounded-full" style={{ width: insurer.claimRatio }}></div>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="flex justify-between items-center">
                                            <span className="text-slate-600 text-sm font-medium">Network Hospitals</span>
                                            <span className="font-bold text-slate-800">{insurer.network}</span>
                                        </div>
                                        <div className="flex justify-between items-center">
                                            <span className="text-slate-600 text-sm font-medium">Solvency Ratio</span>
                                            <span className="font-bold text-slate-800">{insurer.solvency}</span>
                                        </div>
                                        <div className="pt-3 mt-3 border-t border-slate-200 flex justify-center">
                                            <span className="text-xs font-bold uppercase tracking-wide text-[#2076C7] bg-blue-50 px-4 py-1.5 rounded-full border border-blue-100">
                                                {insurer.feature}
                                            </span>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>

                        {/* Desktop Table View */}
                        <div className="hidden md:block overflow-x-auto rounded-[2rem] border border-slate-200 shadow-sm bg-white">
                            <table className="w-full min-w-[900px] border-collapse">
                                <thead>
                                    <tr className="bg-gradient-to-r from-[#2076C7] to-[#1CADA3] text-white">
                                        <th className="py-6 px-6 text-left font-bold uppercase text-xs tracking-wider">Insurer</th>
                                        <th className="py-6 px-6 text-center font-bold uppercase text-xs tracking-wider">
                                            <div className="flex items-center justify-center gap-2"><CheckCircle size={16} /> Claim Ratio</div>
                                        </th>
                                        <th className="py-6 px-6 text-center font-bold uppercase text-xs tracking-wider">
                                            <div className="flex items-center justify-center gap-2"><TrendingUp size={16} /> Solvency</div>
                                        </th>
                                        <th className="py-6 px-6 text-center font-bold uppercase text-xs tracking-wider">
                                            <div className="flex items-center justify-center gap-2"><ShieldCheck size={16} /> Network</div>
                                        </th>
                                        <th className="py-6 px-6 text-center font-bold uppercase text-xs tracking-wider">
                                            <div className="flex items-center justify-center gap-2"><Star size={16} /> Rating</div>
                                        </th>
                                        <th className="py-6 px-6 text-center font-bold uppercase text-xs tracking-wider">
                                            <div className="flex items-center justify-center gap-2"><Award size={16} /> Key Feature</div>
                                        </th>
                                    </tr>
                                </thead>
                                <tbody className="font-sans">
                                    {comparisonData.map((row, i) => (
                                        <tr key={i} className="hover:bg-slate-50 transition-colors duration-200 group border-b border-slate-100 last:border-0">
                                            <td className="py-5 px-6 font-bold text-slate-800">
                                                <div className="flex items-center gap-4">
                                                    <div className="w-10 h-10 rounded-xl bg-slate-100 border border-slate-200 flex items-center justify-center text-sm font-extrabold text-[#2076C7]">
                                                        {row.name.charAt(0)}
                                                    </div>
                                                    {row.name}
                                                </div>
                                            </td>
                                            <td className="py-5 px-6 text-center align-middle">
                                                <div className="flex flex-col items-center justify-center h-full">
                                                    <span className="font-bold text-[#1CADA3] text-lg leading-none">{row.claimRatio}</span>
                                                    <div className="w-24 h-1.5 bg-slate-200 rounded-full mt-2.5 overflow-hidden">
                                                        <div className="h-full bg-[#1CADA3] rounded-full" style={{ width: row.claimRatio }}></div>
                                                    </div>
                                                </div>
                                            </td>
                                            <td className="py-5 px-6 text-center align-middle">
                                                <div className="flex flex-col items-center justify-center h-full">
                                                    <span className="font-bold text-slate-800 text-lg leading-none">{row.solvency}</span>
                                                    <span className="text-xs text-slate-400 font-medium mt-1.5">(Min 1.50)</span>
                                                </div>
                                            </td>
                                            <td className="py-5 px-6 text-center align-middle">
                                                <div className="flex flex-col items-center justify-center h-full">
                                                    <span className="font-bold text-slate-800 text-lg leading-none">{row.network}</span>
                                                    <span className="text-xs text-slate-500 font-medium mt-1.5">Hospitals</span>
                                                </div>
                                            </td>
                                            <td className="py-5 px-6 text-center align-middle">
                                                <div className="flex items-center justify-center gap-1.5 bg-yellow-50 py-1.5 px-3 rounded-lg border border-yellow-100 w-fit mx-auto">
                                                    <span className="font-bold text-slate-800">{row.rating}</span>
                                                    <Star size={14} className="text-yellow-500 fill-yellow-500" />
                                                </div>
                                            </td>
                                            <td className="py-5 px-6 text-center align-middle">
                                                <span className="inline-block text-xs font-bold uppercase tracking-wide text-[#2076C7] bg-blue-50 px-3 py-1.5 rounded-full border border-blue-100">
                                                    {row.feature}
                                                </span>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </div>

                    <div className="mt-8 grid md:grid-cols-2 gap-6 relative z-10">
                        <div className="bg-[#2076C7]/5 p-6 rounded-2xl flex items-start gap-4 border border-blue-100/50">
                            <ThinkingIcon />
                            <div>
                                <h4 className="font-bold text-slate-800 mb-2 font-sans text-sm md:text-base">Why These Metrics Matter?</h4>
                                <p className="text-xs md:text-sm text-slate-600 leading-relaxed">
                                    <strong>Claim Settlement Ratio (CSR):</strong> Indicates the percentage of claims settled by the insurer. A higher ratio (above 95%) implies better reliability.
                                    <br />
                                    <span className="mt-1 block">
                                        <strong>Solvency Ratio:</strong> Measures the company's financial ability to pay claims. IRDAI mandates a minimum of 1.50.
                                    </span>
                                </p>
                            </div>
                        </div>
                        <div className="bg-[#1CADA3]/10 p-6 rounded-2xl flex items-start gap-4 border border-[#1CADA3]/20">
                            <ThumbsUp size={24} className="text-[#1CADA3] mt-1 shrink-0" />
                            <div>
                                <h4 className="font-bold text-slate-800 mb-2 font-sans text-sm md:text-base">Expert Recommendation</h4>
                                <p className="text-xs md:text-sm text-slate-600 leading-relaxed">
                                    While price is important, prioritize <strong>Claim Settlement Ratio</strong> and <strong>Network Strength</strong> for corporate policies to ensure your employees get cashless treatment when needed.
                                </p>
                            </div>
                        </div>
                    </div>
                </motion.div>
            </div>
        </section>
    );
}

const ThinkingIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#2076C7" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-brain-circuit mt-1 shrink-0">
        <path d="M12 5a3 3 0 1 0-5.997.125 4 4 0 0 0-2.526 5.77 4 4 0 0 0 .556 6.588A4 4 0 1 0 12 18Z" /><path d="M9 13a4.5 4.5 0 0 0 3-4" /><path d="M6.003 5.125A3 3 0 0 0 6.401 6.5" /><path d="M3.477 10.896a4 4 0 0 1 .585-.396" /><path d="M6 18a4 4 0 0 1-1.97-3.484" /><path d="M12 18a4 4 0 0 0 3.203-6.306" /><path d="M19 22v-6.02a4 4 0 0 0 3.98 5.923" /><path d="M14 16.5a4 4 0 0 0 3.666-6.43" /><path d="M22 15.5a4 4 0 0 0-2-3" /><path d="M17 10.5a4 4 0 0 0-2.128-3.353" /><path d="M22 8.5a4 4 0 0 0-2.12-3.364" /><path d="M15.5 8.5a4 4 0 0 0 2.128-3.353" />
    </svg>
);

/* ---------------- GROUP HEALTH CALCULATOR ---------------- */

function GroupHealthCalculator() {
    const { openQuote } = useModal();
    const [employees, setEmployees] = useState(100);
    const [avgAge, setAvgAge] = useState('26-30');
    const [industry, setIndustry] = useState('IT');
    const [sumInsured, setSumInsured] = useState(300000); // 3 Lakhs default
    const [premium, setPremium] = useState(0);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        setLoading(true);
        const timer = setTimeout(() => {
            let baseRate = 2500;
            // Age multipliers — 5-year bands
            const ageMultipliers: Record<string, number> = {
                '20-25': 0.85,
                '26-30': 1.00,
                '31-35': 1.15,
                '36-40': 1.30,
                '41-45': 1.55,
                '46-50': 1.80,
                '51-55': 2.00,
                '55+': 2.22,
            };

            // Industry multipliers
            const industryMultipliers: Record<string, number> = {
                'IT': 0.9,
                'Manufacturing': 1.3,
                'Healthcare': 1.2,
                'Retail': 1.0,
                'Finance': 1.1,
                'Other': 1.15
            };

            baseRate *= (ageMultipliers[avgAge] ?? 1);
            baseRate *= (industryMultipliers[industry] ?? 1);

            if (sumInsured === 500000) baseRate *= 1.45;
            if (sumInsured === 1000000) baseRate *= 2.4;

            if (employees > 500) baseRate *= 0.80;
            else if (employees > 100) baseRate *= 0.85;
            else if (employees > 50) baseRate *= 0.9;

            setPremium(Math.round(baseRate * employees));
            setLoading(false);
        }, 600);
        return () => clearTimeout(timer);
    }, [employees, avgAge, sumInsured, industry]);

    const formatCurrency = (val: number) => new Intl.NumberFormat('en-IN', {
        style: 'currency', currency: 'INR', maximumFractionDigits: 0
    }).format(val);

    return (
        <section className="py-20 md:py-24 bg-slate-50 border-t border-slate-200/50">
            <div className="container mx-auto px-4 md:px-6 max-w-7xl">
                <div className="flex flex-col lg:flex-row gap-12 lg:gap-16 items-start">

                    {/* LEFT CONTENT */}
                    <div className="w-full lg:w-5/12 pt-4 lg:pt-12">
                        <motion.div
                            initial={{ opacity: 0, x: -20 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true }}
                        >
                            <span className="inline-flex items-center gap-2 px-4 py-1.5 bg-blue-50 text-[#2076C7] rounded-full text-xs font-bold uppercase tracking-wider mb-6 border border-blue-100">
                                <Heart className="w-3.5 h-3.5" />
                                Employee Wellness
                            </span>
                            <h2 className="text-3xl md:text-4xl font-extrabold mb-6 text-slate-800 leading-tight">
                                Group Health Insurance Estimate
                            </h2>
                            <p className="text-slate-600 mb-10 text-lg leading-relaxed">
                                Calculate estimated premium for covering your team against hospitalization expenses.
                                Boost employee retention with comprehensive health benefits.
                            </p>

                            <div className="grid sm:grid-cols-2 gap-4">
                                {[
                                    { icon: Activity, text: "Cashless Hospitalization", color: "text-[#2076C7]" },
                                    { icon: Users, text: "Covers Family & Parents", color: "text-[#1CADA3]" },
                                    { icon: CheckCircle2, text: "Pre-existing Covered", color: "text-[#2076C7]" },
                                ].map((feature, i) => (
                                    <div key={i} className="flex items-center gap-3 bg-white p-4 rounded-xl border border-slate-200 shadow-sm">
                                        <feature.icon className={`w-5 h-5 ${feature.color} shrink-0`} />
                                        <span className="text-sm font-bold text-slate-700">{feature.text}</span>
                                    </div>
                                ))}
                            </div>
                        </motion.div>
                    </div>

                    {/* RIGHT CALCULATOR */}
                    <div className="w-full lg:w-7/12">
                        <motion.div
                            initial={{ opacity: 0, scale: 0.95 }}
                            whileInView={{ opacity: 1, scale: 1 }}
                            viewport={{ once: true }}
                            className="bg-white rounded-[2rem] shadow-[0_10px_40px_rgb(0,0,0,0.08)] border border-slate-100 overflow-hidden"
                        >
                            <div className="bg-gradient-to-r from-[#2076C7] to-[#1CADA3] p-6 sm:p-8 text-white text-center">
                                <h3 className="font-bold font-sans text-2xl mb-1">GMC Premium Calculator</h3>
                                <p className="text-white/90 text-sm font-medium">Instant Quote for Group Mediclaim</p>
                            </div>

                            <div className="p-6 sm:p-10 space-y-8">
                                {/* Employee Count Input */}
                                <div className="space-y-5">
                                    <div className="flex justify-between items-center">
                                        <label className="text-sm font-bold text-slate-700">Number of Employees</label>
                                        <span className="text-sm font-extrabold text-[#2076C7] bg-blue-50 px-3 py-1.5 rounded-lg border border-blue-100">{employees}</span>
                                    </div>
                                    <input
                                        type="range"
                                        min="5" max="500" step="5"
                                        value={employees}
                                        onChange={(e) => setEmployees(Number(e.target.value))}
                                        className="w-full h-2.5 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-[#1CADA3]"
                                    />
                                    <div className="flex justify-between text-xs font-semibold text-slate-400">
                                        <span>5</span>
                                        <span>500+</span>
                                    </div>
                                </div>

                                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                                    {/* Sum Insured Select */}
                                    <div className="space-y-3">
                                        <label className="text-sm font-bold text-slate-700 block">Sum Insured / Family</label>
                                        <select
                                            value={sumInsured}
                                            onChange={(e) => setSumInsured(Number(e.target.value))}
                                            className="w-full p-4 rounded-xl border border-slate-200 focus:border-[#2076C7] focus:ring-4 focus:ring-[#2076C7]/10 outline-none text-sm font-semibold transition-all"
                                        >
                                            <option value={200000}>₹2 Lakhs</option>
                                            <option value={300000}>₹3 Lakhs</option>
                                            <option value={500000}>₹5 Lakhs</option>
                                            <option value={1000000}>₹10 Lakhs</option>
                                        </select>
                                    </div>

                                    {/* Avg Age Select */}
                                    <div className="space-y-3">
                                        <label className="text-sm font-bold text-slate-700 block text-left">Avg. Age Group</label>
                                        <select
                                            value={avgAge}
                                            onChange={(e) => setAvgAge(e.target.value)}
                                            className="w-full p-4 rounded-xl border border-slate-200 focus:border-[#2076C7] focus:ring-4 focus:ring-[#2076C7]/10 outline-none text-sm font-semibold transition-all"
                                        >
                                            <option value="20-25">20 – 25 Yrs</option>
                                            <option value="26-30">26 – 30 Yrs</option>
                                            <option value="31-35">31 – 35 Yrs</option>
                                            <option value="36-40">36 – 40 Yrs</option>
                                            <option value="41-45">41 – 45 Yrs</option>
                                            <option value="46-50">46 – 50 Yrs</option>
                                            <option value="51-55">51 – 55 Yrs</option>
                                            <option value="55+">55+ Yrs</option>
                                        </select>
                                    </div>

                                    {/* Industry Select */}
                                    <div className="space-y-3">
                                        <label className="text-sm font-bold text-slate-700 block text-left">Industry Type</label>
                                        <select
                                            value={industry}
                                            onChange={(e) => setIndustry(e.target.value)}
                                            className="w-full p-4 rounded-xl border border-slate-200 focus:border-[#2076C7] focus:ring-4 focus:ring-[#2076C7]/10 outline-none text-sm font-semibold transition-all"
                                        >
                                            <option value="IT">IT / Software</option>
                                            <option value="Manufacturing">Manufacturing</option>
                                            <option value="Healthcare">Healthcare</option>
                                            <option value="Retail">Retail</option>
                                            <option value="Finance">Finance / Banking</option>
                                            <option value="Other">Other / Services</option>
                                        </select>
                                    </div>
                                </div>

                                {/* Total Premium Output */}
                                <div className="bg-slate-50 p-6 sm:p-8 rounded-2xl border border-slate-200 text-center">
                                    <p className="text-sm text-slate-500 font-bold mb-3 uppercase tracking-wide">Estimated Annual Premium</p>
                                    {loading ? (
                                        <div className="h-12 flex items-center justify-center gap-3 text-slate-400 font-medium">
                                            <Loader2 className="animate-spin w-6 h-6" /> Calculating...
                                        </div>
                                    ) : (
                                        <h3 className="text-4xl sm:text-5xl font-extrabold text-slate-900 tracking-tight">
                                            {formatCurrency(premium)}
                                            <span className="text-base text-slate-500 font-semibold ml-2">+ GST</span>
                                        </h3>
                                    )}
                                    <p className="text-xs text-slate-500 mt-4 italic">Includes maternity & day care procedures</p>
                                </div>

                                <button
                                    onClick={() => openQuote("Group Health Insurance")}
                                    className="w-full py-4 bg-gradient-to-r from-[#2076C7] to-[#1CADA3] text-white font-bold rounded-xl shadow-[0_8px_25px_rgb(32,118,199,0.3)] hover:shadow-[0_8px_30px_rgb(28,173,163,0.4)] hover:-translate-y-1 transition-all duration-300 text-lg"
                                >
                                    Request Custom Group Quote
                                </button>

                                <div className="mt-4 flex items-start gap-3 p-4 bg-amber-50 rounded-xl text-amber-800 text-sm border border-amber-100">
                                    <AlertCircle className="w-5 h-5 shrink-0 mt-0.5" />
                                    <p className="leading-relaxed">
                                        <span className="font-semibold">Disclaimer: </span>Starting premiums are indicative for a base sum insured for a healthy group of 100+ employees. Final quotes may vary based on group age, industry risk, and chosen add-ons as per IRDAI guidelines.
                                    </p>
                                </div>
                            </div>
                        </motion.div>
                    </div>
                </div>
            </div>
        </section>
    );
}

/* ---------------- CORPORATE CONTACT FORM ---------------- */

function CorporateContactForm() {
    const [formState, setFormState] = useState({
        company: '', contactPerson: '', mobile: '', email: '', employees: '', industry: ''
    });
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [submitted, setSubmitted] = useState(false);

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        setIsSubmitting(true);
        setTimeout(() => { setIsSubmitting(false); setSubmitted(true); }, 1500);
    };

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        setFormState({ ...formState, [e.target.name]: e.target.value });
    };

    if (submitted) {
        return (
            <section className="py-24 bg-slate-50 border-t border-slate-200/50">
                <div className="container mx-auto px-4 md:px-6 max-w-2xl text-center">
                    <div className="bg-white p-12 rounded-[2rem] border border-teal-100 shadow-xl">
                        <div className="w-24 h-24 bg-teal-50 rounded-full flex items-center justify-center mx-auto mb-8 border border-teal-100">
                            <CheckCircle2 className="w-12 h-12 text-[#1CADA3]" />
                        </div>
                        <h3 className="text-3xl font-bold text-slate-800 mb-4">Request Received!</h3>
                        <p className="text-slate-600 mb-10 text-lg leading-relaxed">
                            Thank you for your interest, <span className="font-bold text-slate-800">{formState.contactPerson}</span>.
                            Our corporate insurance expert will contact you shortly at <span className="font-bold text-slate-800">{formState.mobile}</span>.
                        </p>
                        <button
                            onClick={() => setSubmitted(false)}
                            className="bg-white text-[#2076C7] px-8 py-3 rounded-xl border border-blue-200 font-bold hover:bg-blue-50 transition-colors shadow-sm"
                        >
                            Submit Another Request
                        </button>
                    </div>
                </div>
            </section>
        );
    }

    return (
        <section className="py-20 md:py-24 bg-slate-50 border-t border-slate-200/50">
            <div className="container mx-auto px-4 md:px-6 max-w-4xl">
                <div className="text-center mb-12 md:mb-16">
                    <h2 className="text-3xl md:text-4xl font-bold font-sans mb-4">
                        <span className="bg-gradient-to-r from-[#2076C7] to-[#1CADA3] bg-clip-text text-transparent">
                            Talk to a Corporate Insurance Expert
                        </span>
                    </h2>
                    <p className="text-slate-600 max-w-2xl mx-auto text-lg">
                        Fill in the details below and our IRDAI-certified advisor will get back to you within 2 hours.
                    </p>
                </div>

                <div className="bg-white p-6 sm:p-10 md:p-12 rounded-[2rem] shadow-xl border border-slate-100">
                    <form onSubmit={handleSubmit} className="space-y-6 md:space-y-8">
                        <div className="grid md:grid-cols-2 gap-6 md:gap-8">
                            {/* Company Name */}
                            <div>
                                <label className="block text-sm font-bold text-slate-700 mb-2">Company Name <span className="text-red-500">*</span></label>
                                <input type="text" name="company" required value={formState.company} onChange={handleChange} placeholder="e.g., ABC Pvt Ltd" className="w-full px-5 py-3.5 rounded-xl border border-slate-200 focus:border-[#2076C7] focus:ring-4 focus:ring-[#2076C7]/10 outline-none transition-all font-medium" />
                            </div>
                            {/* Contact Person */}
                            <div>
                                <label className="block text-sm font-bold text-slate-700 mb-2">Contact Person <span className="text-red-500">*</span></label>
                                <input type="text" name="contactPerson" required value={formState.contactPerson} onChange={handleChange} placeholder="Full Name" className="w-full px-5 py-3.5 rounded-xl border border-slate-200 focus:border-[#2076C7] focus:ring-4 focus:ring-[#2076C7]/10 outline-none transition-all font-medium" />
                            </div>
                            {/* Mobile */}
                            <div>
                                <label className="block text-sm font-bold text-slate-700 mb-2">Mobile Number <span className="text-red-500">*</span></label>
                                <input type="tel" name="mobile" required value={formState.mobile} onChange={handleChange} placeholder="10-digit mobile" pattern="[0-9]{10}" className="w-full px-5 py-3.5 rounded-xl border border-slate-200 focus:border-[#2076C7] focus:ring-4 focus:ring-[#2076C7]/10 outline-none transition-all font-medium" />
                            </div>
                            {/* Email */}
                            <div>
                                <label className="block text-sm font-bold text-slate-700 mb-2">Email ID <span className="text-red-500">*</span></label>
                                <input type="email" name="email" required value={formState.email} onChange={handleChange} placeholder="you@company.com" className="w-full px-5 py-3.5 rounded-xl border border-slate-200 focus:border-[#2076C7] focus:ring-4 focus:ring-[#2076C7]/10 outline-none transition-all font-medium" />
                            </div>
                            {/* Employee Count */}
                            <div>
                                <label className="block text-sm font-bold text-slate-700 mb-2">Number of Employees</label>
                                <select name="employees" value={formState.employees} onChange={handleChange} className="w-full px-5 py-3.5 rounded-xl border border-slate-200 focus:border-[#2076C7] focus:ring-4 focus:ring-[#2076C7]/10 outline-none transition-all font-medium text-slate-700">
                                    <option value="">Select range</option>
                                    <option value="1-10">1-10</option>
                                    <option value="11-50">11-50</option>
                                    <option value="51-200">51-200</option>
                                    <option value="201-500">201-500</option>
                                    <option value="500+">500+</option>
                                </select>
                            </div>
                            {/* Industry */}
                            <div>
                                <label className="block text-sm font-bold text-slate-700 mb-2">Industry</label>
                                <select name="industry" value={formState.industry} onChange={handleChange} className="w-full px-5 py-3.5 rounded-xl border border-slate-200 focus:border-[#2076C7] focus:ring-4 focus:ring-[#2076C7]/10 outline-none transition-all font-medium text-slate-700">
                                    <option value="">Select industry</option>
                                    <option value="IT">IT / Software</option>
                                    <option value="Manufacturing">Manufacturing</option>
                                    <option value="Healthcare">Healthcare</option>
                                    <option value="Retail">Retail</option>
                                    <option value="Finance">Finance / Banking</option>
                                    <option value="Other">Other</option>
                                </select>
                            </div>
                        </div>

                        {/* Submit Button */}
                        <div className="text-center pt-6 border-t border-slate-100">
                            <button
                                type="submit"
                                disabled={isSubmitting}
                                className="w-full sm:w-auto px-12 py-4 bg-gradient-to-r from-[#2076C7] to-[#1CADA3] text-white font-bold rounded-xl shadow-[0_8px_25px_rgb(32,118,199,0.3)] hover:shadow-[0_8px_30px_rgb(28,173,163,0.4)] hover:-translate-y-1 transition-all disabled:opacity-70 disabled:cursor-not-allowed inline-flex items-center justify-center gap-3 text-lg"
                            >
                                {isSubmitting ? (
                                    <><Loader2 className="animate-spin w-5 h-5" /> Submitting...</>
                                ) : (
                                    <><Send className="w-5 h-5" /> Request Callback</>
                                )}
                            </button>
                            <p className="text-sm text-slate-500 mt-4 font-medium">
                                No obligation. Free consultation. Takes 30 seconds.
                            </p>
                        </div>
                    </form>
                </div>
            </div>
        </section>
    );
}

// ----------------------------------------------------------------------
// Animated Hero Graphic Component
// ----------------------------------------------------------------------

const HeroGraphic = () => {
    return (
        <div className="relative w-full h-[350px] md:h-[500px] flex items-center justify-center">
            {/* Background Decor */}
            <div className="absolute inset-0 flex items-center justify-center">
                <div className="w-[300px] h-[300px] md:w-[450px] md:h-[450px] border border-blue-200/40 rounded-full animate-none md:animate-[spin_60s_linear_infinite]" />
                <div className="w-[220px] h-[220px] md:w-[350px] md:h-[350px] border border-teal-200/40 rounded-full absolute animate-none md:animate-[spin_40s_linear_infinite_reverse]" />
            </div>

            {/* Central Hub */}
            <motion.div
                initial={{ scale: 0.8, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ duration: 0.8, ease: "easeOut" }}
                className="relative z-10 w-28 h-28 md:w-36 md:h-36 bg-gradient-to-br from-[#2076C7] to-[#1CADA3] rounded-[2rem] rotate-45 transform shadow-[0_20px_50px_rgba(32,118,199,0.4)] flex items-center justify-center border-4 border-white"
            >
                <div className="-rotate-45">
                    <Building className="w-10 h-10 md:w-14 md:h-14 text-white" />
                </div>
            </motion.div>

            {/* Floating Satellite Icons */}
            <motion.div
                animate={{ y: [-10, 10, -10] }}
                transition={{ duration: 4, repeat: Infinity, ease: "easeInOut", delay: 0 }}
                className="absolute top-10 right-4 md:top-20 md:right-20 bg-white p-3 md:p-4 rounded-2xl shadow-xl border border-slate-100 flex flex-col items-center gap-2 z-20"
            >
                <div className="p-2 bg-blue-50 rounded-xl">
                    <Users className="w-5 h-5 md:w-6 md:h-6 text-[#2076C7]" />
                </div>
                <span className="text-[10px] md:text-xs font-bold text-slate-700">Employees</span>
            </motion.div>

            <motion.div
                animate={{ y: [10, -10, 10] }}
                transition={{ duration: 5, repeat: Infinity, ease: "easeInOut", delay: 1 }}
                className="absolute bottom-10 left-4 md:bottom-20 md:left-20 bg-white p-3 md:p-4 rounded-2xl shadow-xl border border-slate-100 flex flex-col items-center gap-2 z-20"
            >
                <div className="p-2 bg-teal-50 rounded-xl">
                    <Factory className="w-5 h-5 md:w-6 md:h-6 text-[#1CADA3]" />
                </div>
                <span className="text-[10px] md:text-xs font-bold text-slate-700">Assets</span>
            </motion.div>

            <motion.div
                animate={{ x: [-5, 5, -5], y: [-5, 5, -5] }}
                transition={{ duration: 6, repeat: Infinity, ease: "easeInOut", delay: 0.5 }}
                className="absolute top-20 left-4 md:top-32 md:left-10 bg-white p-2 md:p-3 rounded-2xl shadow-xl border border-slate-100 flex items-center gap-2 z-20"
            >
                <div className="p-2 bg-amber-50 rounded-xl">
                    <Briefcase className="w-4 h-4 md:w-5 md:h-5 text-amber-600" />
                </div>
                <span className="text-xs font-bold text-slate-700 hidden md:inline">Liability</span>
            </motion.div>

            <motion.div
                animate={{ x: [5, -5, 5], y: [5, -5, 5] }}
                transition={{ duration: 5.5, repeat: Infinity, ease: "easeInOut", delay: 1.5 }}
                className="absolute bottom-24 right-4 md:bottom-32 md:right-10 bg-white p-2 md:p-3 rounded-2xl shadow-xl border border-slate-100 flex items-center gap-2 z-20"
            >
                <div className="p-2 bg-purple-50 rounded-xl">
                    <Container className="w-4 h-4 md:w-5 md:h-5 text-purple-600" />
                </div>
                <span className="text-xs font-bold text-slate-700 hidden md:inline">Transport</span>
            </motion.div>

            {/* Connecting Lines */}
            <svg className="absolute inset-0 w-full h-full pointer-events-none opacity-20" viewBox="0 0 500 500" preserveAspectRatio="xMidYMid slice">
                <motion.path
                    d="M250 250 L400 150 M250 250 L100 350 M250 250 L100 150 M250 250 L400 350"
                    stroke="#2076C7"
                    strokeWidth="2"
                    strokeDasharray="5 5"
                    initial={{ pathLength: 0 }}
                    animate={{ pathLength: 1 }}
                    transition={{ duration: 1.5, ease: "easeInOut", delay: 0.5 }}
                />
            </svg>
        </div>
    );
};