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
    Repeat, Wrench, Construction, ChevronDown
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

// Import local data and components
import { mortgageLoanData as offer } from './data';
import { CATEGORIES, categorizedPlans, MORTGAGE_LOAN_TYPES, PARTNER_BANKS } from './loanConstants';
import { AuthService } from "@/app/services/authService";
import MortgageLoanForm from './components/MortgageLoanForm';
import MortgageLoanCalculator from './components/MortgageLoanCalculator';
import heroImage from './mortgage-loan-hero.png';

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

export default function MortgageLoanPage() {
    const router = useRouter();
    const [isVerifying, setIsVerifying] = useState(false);
    const [isFormOpen, setIsFormOpen] = useState(false);
    const [verifiedUserData, setVerifiedUserData] = useState({ name: "", email: "", mobile: "" });
    const [activeCategory, setActiveCategory] = useState(CATEGORIES[0]);
    const [openFaq, setOpenFaq] = useState<number | null>(null);

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
    const handleApply = () => setIsVerifying(true);

    const handleVerificationSuccess = (userData: { name: string, email: string, mobile: string }) => {
        setVerifiedUserData(userData);
        setIsVerifying(false);
        setIsFormOpen(true);
    };

    return (
        <>
            <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbStructuredData) }} />
            <div className="min-h-screen bg-neutral-100 font-sans">
                {/* NAVIGATION & ACTION BUTTONS */}
                <div className="fixed z-50 top-17 left-1 md:top-23 md:left-4">
                    <button onClick={handleBackToOffers} aria-label="Back to Offers" className="md:hidden group flex items-center gap-2 p-2 text-gray-500">
                        <div className="p-2.5 bg-white/70 backdrop-blur-md rounded-full shadow-lg border border-gray-200/50 active:scale-80 transition-all">
                            <ArrowLeft className="w-4 h-4 text-gray-700" />
                        </div>
                    </button>
                    <button onClick={handleBackToOffers} className="hidden md:inline-flex items-center gap-2 px-4 py-2 text-sm font-medium text-gray-700 bg-white/90 backdrop-blur-sm rounded-lg border border-gray-300 hover:bg-white shadow-lg">
                        <ArrowLeft className="w-4 h-4" /> Back to Offers
                    </button>
                </div>

                <div className="fixed z-50 top-17 right-1 md:top-23 md:right-4">
                    <button onClick={handleApply} className="flex items-center gap-2 px-4 py-2 md:px-6 md:py-2 text-sm md:text-base font-bold text-white bg-linear-to-r from-[#2076C7] to-[#1CADA3] rounded-full md:rounded-lg shadow-lg hover:opacity-90 active:scale-95 transition-all">
                        Apply Now <Zap className="w-4 h-4 fill-current" />
                    </button>
                </div>

                {/* HERO SECTION */}
                <header className="relative w-full overflow-hidden pt-24 md:pt-32 pb-16 bg-linear-to-r from-blue-50 to-white">
                    <div className="absolute top-0 right-0 w-1/2 h-full bg-linear-to-l from-blue-50/20 to-transparent pointer-events-none" />
                    <div className="max-w-7xl mx-auto px-6 relative z-10">
                        <div className="flex flex-col lg:flex-row items-center gap-16">
                            <motion.div
                                initial={{ opacity: 0, x: -30 }}
                                animate={{ opacity: 1, x: 0 }}
                                className="w-full lg:w-1/2 space-y-8"
                            >
                                <div className="inline-flex items-center gap-2 px-3 py-1 bg-blue-50 text-[#2076C7] rounded-full text-[10px] font-black uppercase tracking-widest border border-blue-100">
                                    <Landmark size={12} /> Property Backed Funding
                                </div>
                                <h1 className="text-5xl md:text-7xl font-bold font-sans bg-linear-to-r from-[#2076C7] to-[#1CADA3] bg-clip-text text-transparent leading-[1.1] mb-6 tracking-tight">
                                    Unlock Your <br />
                                    <span className="text-[#2076C7]">Property's Value</span> <br />
                                    with Rates as <span className="text-[#1CADA3]">Lowest</span>
                                </h1>
                                <p className="text-lg md:text-xl text-gray-500 font-medium leading-relaxed max-w-lg">
                                    {offer.description}
                                </p>
                                <div className="flex flex-wrap gap-5 pt-2">
                                    <button onClick={handleApply} className="px-10 py-4 bg-gradient-to-r from-[#2076C7] to-[#1CADA3] text-white rounded-full font-bold shadow-lg hover:opacity-90 transition-all active:scale-95">
                                        Apply Now
                                    </button>
                                </div>
                            </motion.div>

                            <motion.div
                                initial={{ opacity: 0, scale: 0.9 }}
                                animate={{ opacity: 1, scale: 1 }}
                                className="w-full lg:w-1/2 relative"
                            >
                                <div className="relative aspect-square w-full max-w-[550px] mx-auto">
                                    <div className="absolute inset-0 bg-linear-to-br from-[#1CADA3]/10 to-[#2076C7]/10 rounded-full blur-3xl animate-pulse" />
                                    <Image
                                        src={heroImage}
                                        alt="Mortgage Loan"
                                        fill
                                        className="object-contain drop-shadow-[0_20px_50px_rgba(0,0,0,0.1)]"
                                        priority
                                    />

                                    {/* Floating Badges */}
                                    <motion.div animate={{ y: [0, -10, 0] }} transition={{ duration: 4, repeat: Infinity }} className="absolute -top-4 right-0 bg-white p-4 rounded-2xl shadow-2xl border border-gray-50 flex items-center gap-3">
                                        <div className="w-10 h-10 rounded-xl bg-teal-50 flex items-center justify-center text-[#1CADA3]"><TrendingUp size={20} /></div>
                                        <div>
                                            <div className="text-[10px] font-black text-gray-400 uppercase">Rates From</div>
                                            <div className="text-lg font-bold text-gray-800">8.20% <span className="text-xs font-medium">p.a.</span></div>
                                        </div>
                                    </motion.div>

                                    <motion.div animate={{ y: [0, 10, 0] }} transition={{ duration: 3.5, repeat: Infinity }} className="absolute bottom-10 -left-6 bg-white p-4 rounded-2xl shadow-2xl border border-gray-50 flex items-center gap-3">
                                        <div className="w-10 h-10 rounded-xl bg-blue-50 flex items-center justify-center text-[#2076C7]"><ShieldCheck size={20} /></div>
                                        <div>
                                            <div className="text-[10px] font-black text-gray-400 uppercase">Max Funding</div>
                                            <div className="text-lg font-bold text-gray-800">70% <span className="text-xs font-medium text-gray-400">of Market Value</span></div>
                                        </div>
                                    </motion.div>
                                </div>
                            </motion.div>
                        </div>
                    </div>
                </header>

                {/* VARIANTS GRID */}
                <section className="py-24 bg-neutral-50 px-6">
                    <div className="max-w-7xl mx-auto">
                        <div className="text-center mb-16">
                            <h2 className="text-4xl md:text-5xl font-bold bg-linear-to-r from-[#2076C7] to-[#1CADA3] bg-clip-text text-transparent mb-6">Choose Your Solution</h2>
                            <p className="text-gray-500 font-medium max-w-2xl mx-auto">Different assets require different strategies. Explore our specialized mortgage programs.</p>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                            {MORTGAGE_LOAN_TYPES.map((type, idx) => {
                                const Icon = IconMap[type.icon] || Landmark;
                                return (
                                    <motion.div
                                        key={idx}
                                        whileHover={{ y: -10 }}
                                        className="bg-white p-8 rounded-[32px] border border-gray-100 shadow-sm hover:shadow-2xl hover:shadow-[#1CADA3]/10 transition-all group flex flex-col h-full"
                                    >
                                        <div className={`w-14 h-14 rounded-2xl mb-6 flex items-center justify-center transition-transform group-hover:scale-110 ${type.color === 'blue' ? 'bg-blue-50 text-[#2076C7]' : 'bg-teal-50 text-[#1CADA3]'}`}>
                                            <Icon size={28} />
                                        </div>
                                        <h3 className="text-xl font-bold text-gray-800 mb-4 group-hover:text-[#2076C7] transition-colors">{type.title}</h3>
                                        <p className="text-sm text-gray-400 font-medium mb-6 flex-grow leading-relaxed">{type.description}</p>

                                        <div className="space-y-3 mb-8">
                                            {type.benefits.map((b, i) => (
                                                <div key={i} className="flex items-center gap-2 text-xs font-bold text-gray-600">
                                                    <div className="w-1.5 h-1.5 rounded-full bg-[#1CADA3]" /> {b}
                                                </div>
                                            ))}
                                        </div>

                                        <button
                                            onClick={() => {
                                                setActiveCategory(type.category);
                                                document.getElementById('partners-section')?.scrollIntoView({ behavior: 'smooth' });
                                            }}
                                            className="w-full py-4 rounded-2xl bg-neutral-50 text-gray-700 font-black text-xs uppercase tracking-widest hover:bg-[#2076C7] hover:text-white transition-all active:scale-95"
                                        >
                                            Compare Plans
                                        </button>
                                    </motion.div>
                                )
                            })}
                        </div>
                    </div>
                </section>

                {/* PARTNER BANKS SECTION */}
                <section id="partners-section" className="py-24 bg-white px-6">
                    <div className="max-w-7xl mx-auto">
                        <div className="bg-neutral-50 rounded-[48px] p-8 md:p-16 border border-gray-100 overflow-hidden relative">
                            <div className="absolute top-0 right-0 w-64 h-64 bg-[#2076C7]/5 rounded-full blur-3xl -mr-32 -mt-32" />

                            <div className="relative z-10 flex flex-col md:flex-row justify-between items-end gap-8 mb-16">
                                <div className="max-w-xl">
                                    <h2 className="text-3xl font-bold bg-linear-to-r from-[#2076C7] to-[#1CADA3] bg-clip-text text-transparent mb-4">Our Partner Banks</h2>
                                    <p className="text-sm text-gray-400 font-bold uppercase tracking-wider">Top-tier banks supporting {activeCategory}</p>
                                </div>
                                <div className="flex gap-2 p-1.5 bg-white rounded-2xl shadow-sm border border-gray-100 overflow-x-auto no-scrollbar max-w-full">
                                    {CATEGORIES.map(c => (
                                        <button
                                            key={c}
                                            onClick={() => setActiveCategory(c)}
                                            className={`px-6 py-2.5 rounded-xl text-[10px] font-black uppercase tracking-widest transition-all whitespace-nowrap ${activeCategory === c ? 'bg-gradient-to-r from-[#2076C7] to-[#1CADA3] text-white shadow-lg' : 'text-gray-400 hover:text-gray-800'}`}
                                        >
                                            {c}
                                        </button>
                                    ))}
                                </div>
                            </div>

                            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 relative z-10">
                                <AnimatePresence mode="popLayout">
                                    {filteredPartners.map((bank, i) => (
                                        <motion.div
                                            key={bank.name}
                                            layout
                                            initial={{ opacity: 0, y: 10 }}
                                            animate={{ opacity: 1, y: 0 }}
                                            exit={{ opacity: 0, scale: 0.9 }}
                                            transition={{ delay: i * 0.05 }}
                                            className="bg-white p-6 rounded-3xl border border-gray-100 flex items-center gap-4 hover:shadow-xl transition-all cursor-pointer group"
                                        >
                                            <div className="w-12 h-12 rounded-xl flex items-center justify-center shrink-0 group-hover:scale-110 transition-all" style={{ backgroundColor: `${bank.color}10` }}>
                                                <Bank style={{ color: bank.color }} size={24} />
                                            </div>
                                            <span className="text-[11px] font-black text-gray-700 uppercase tracking-tight group-hover:text-[#2076C7]">{bank.name}</span>
                                        </motion.div>
                                    ))}
                                </AnimatePresence>
                            </div>
                        </div>
                    </div>
                </section>

                {/* CALCULATOR SECTION */}
                <section className="py-24 bg-neutral-50 px-6">
                    <div className="max-w-5xl mx-auto">
                        <div className="text-center mb-16">
                            <h2 className="text-4xl font-bold bg-linear-to-r from-[#2076C7] to-[#1CADA3] bg-clip-text text-transparent mb-4">Precision Planning</h2>
                            <p className="text-gray-500 font-medium">Fine-tune your finances with our specialized LAP calculator.</p>
                        </div>
                        <MortgageLoanCalculator />
                    </div>
                </section>

                {/* DETAILED VARIANTS COMPARISON */}
                <section className="py-24 bg-white px-6">
                    <div className="max-w-7xl mx-auto">
                        <div className="text-center mb-16">
                            <h2 className="text-4xl font-bold bg-linear-to-r from-[#2076C7] to-[#1CADA3] bg-clip-text text-transparent mb-4">
                                Explore Mortgage Variants
                            </h2>
                            <p className="text-gray-500 font-medium max-w-2xl mx-auto">
                                A side-by-side analysis of our specialized mortgage solutions to help you find the perfect fit.
                            </p>
                        </div>

                        <motion.div
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            className="bg-neutral-50 rounded-[40px] p-4 md:p-10 shadow-inner border border-gray-100 overflow-hidden"
                        >
                            <div className="overflow-x-auto no-scrollbar">
                                <table className="w-full text-left border-collapse min-w-[1000px]">
                                    <thead>
                                        <tr className="bg-gradient-to-r from-[#2076C7] to-[#1CADA3] text-white">
                                            <th className="px-6 py-6 text-sm font-black uppercase tracking-widest text-white/90 whitespace-nowrap">Feature</th>
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
                <section className="py-24 bg-neutral-50 border-y border-gray-100 px-6">
                    <div className="max-w-7xl mx-auto">
                        <div className="text-center mb-16">
                            <h2 className="text-4xl font-bold bg-linear-to-r from-[#2076C7] to-[#1CADA3] bg-clip-text text-transparent mb-4">
                                Mortgage Loan vs Personal Loan vs LAP
                            </h2>
                            <p className="text-gray-500 font-medium max-w-2xl mx-auto">
                                Analysis of property-backed funding compared to other major credit facilities.
                            </p>
                        </div>

                        <motion.div
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            className="bg-white rounded-[40px] p-4 md:p-10 shadow-[0_20px_50px_rgba(0,0,0,0.04)] border border-gray-100 overflow-hidden"
                        >
                            <div className="overflow-x-auto no-scrollbar">
                                <table className="w-full text-left border-collapse min-w-[600px]">
                                    <thead>
                                        <tr className="bg-linear-to-r from-[#2076C7] to-[#1CADA3] text-white">
                                            <th className="px-6 py-6 text-sm font-black uppercase tracking-widest text-white/90">Feature</th>
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
                <section className="py-24 bg-white px-6">
                    <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-16">
                        <div className="space-y-12">
                            <div>
                                <h2 className="text-3xl font-bold bg-linear-to-r from-[#2076C7] to-[#1CADA3] bg-clip-text text-transparent mb-8 uppercase tracking-tight">Eligibility Criteria</h2>
                                <div className="space-y-4">
                                    {offer.eligibility.map((item, i) => (
                                        <motion.div whileHover={{ x: 10 }} key={i} className="flex items-center gap-4 p-5 bg-neutral-50 rounded-2xl border border-gray-100">
                                            <div className="w-6 h-6 rounded-full bg-[#1CADA3] flex items-center justify-center text-white text-[10px] font-black">{i + 1}</div>
                                            <span className="text-sm font-bold text-gray-600">{item}</span>
                                        </motion.div>
                                    ))}
                                </div>
                            </div>
                        </div>

                        <div className="bg-neutral-50 rounded-[48px] p-8 md:p-12 border border-gray-100 shadow-inner relative overflow-hidden">
                            <h2 className="text-3xl font-bold bg-linear-to-r from-[#2076C7] to-[#1CADA3] bg-clip-text text-transparent mb-12 uppercase tracking-tight">Document Bundle</h2>
                            <div className="space-y-10 relative z-10">
                                <div>
                                    <h4 className="text-[10px] font-black text-[#2076C7] uppercase tracking-[0.2em] mb-4">Property Chain</h4>
                                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                                        {offer.documents.propertyDocs.map((doc, i) => (
                                            <div key={i} className="flex items-center gap-2 p-3 bg-white border border-gray-100 rounded-xl text-xs font-bold text-gray-500 hover:border-[#2076C7]/30 transition-all">
                                                <FileText size={14} className="text-[#2076C7]" /> {doc}
                                            </div>
                                        ))}
                                    </div>
                                </div>

                                <div>
                                    <h4 className="text-[10px] font-black text-[#1CADA3] uppercase tracking-[0.2em] mb-4">Income Suite</h4>
                                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                                        {offer.documents.incomeSelfEmployed.slice(0, 4).map((doc, i) => (
                                            <div key={i} className="flex items-center gap-2 p-3 bg-white border border-gray-100 rounded-xl text-xs font-bold text-gray-500 hover:border-[#1CADA3]/30 transition-all">
                                                <PieChart size={14} className="text-[#1CADA3]" /> {doc}
                                            </div>
                                        ))}
                                    </div>
                                </div>

                                <div className="pt-8 border-t border-gray-200">
                                    <p className="text-xs text-gray-400 font-bold leading-relaxed italic">* Additional documents may be required based on specific profile or technical valuation of property.</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>

                {/* FAQ SECTION */}
                <section className="py-24 bg-neutral-50 px-6">
                    <div className="max-w-4xl mx-auto">
                        <div className="text-center mb-16">
                            <h2 className="text-4xl font-bold bg-linear-to-r from-[#2076C7] to-[#1CADA3] bg-clip-text text-transparent mb-4 tracking-tight">FQA</h2>
                            <p className="text-gray-500 font-medium uppercase tracking-widest text-[10px]">Your queries addressed by professionals</p>
                        </div>

                        <div className="space-y-6">
                            {[
                                { q: "What property types can I pledge?", a: "You can pledge Residential, Commercial, and Industrial properties including vacant plots (subject to bank policy). The property must have a clear title and should be located in an approved zone." },
                                { q: "How is the loan amount determined?", a: "The loan amount is primarily based on the Market Value of your property (LTV) and your repayment capacity (Income). Typically, banks fund up to 60-70% of the property value." },
                                { q: "Can I use the funds for any purpose?", a: "Yes, unlike home loans, Mortgage Loans have no end-use restriction. Use them for business capital, higher education abroad, debt consolidation, or weddings." },
                                { q: "What is Lease Rental Discounting (LRD)?", a: "LRD is a specialized loan where you pledge the future rental income from your commercial property leased to reputed corporate / retail tenants. It offers the lowest interest rates in the mortgage category." }
                            ].map((faq, i) => (
                                <div key={i} className="bg-white rounded-3xl border border-gray-100 overflow-hidden">
                                    <button
                                        onClick={() => setOpenFaq(openFaq === i ? null : i)}
                                        className="w-full p-8 flex justify-between items-center text-left group transition-all"
                                    >
                                        <span className="text-lg font-bold text-gray-700 group-hover:text-[#2076C7] transition-colors">{faq.q}</span>
                                        <div className={`p-2 rounded-full transition-all ${openFaq === i ? 'bg-[#2076C7] text-white rotate-180' : 'bg-[#2076C7]/5 text-[#2076C7]'}`}>
                                            <ChevronDown size={20} />
                                        </div>
                                    </button>
                                    <AnimatePresence>
                                        {openFaq === i && (
                                            <motion.div initial={{ height: 0 }} animate={{ height: 'auto' }} exit={{ height: 0 }} className="overflow-hidden">
                                                <div className="px-8 pb-8 text-gray-500 font-medium leading-relaxed bg-neutral-50/50">
                                                    <div className="h-0.5 w-12 bg-gray-200 mb-6" />
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

                {/* FINAL CTA */}
                <section className="py-24 bg-white px-6">
                    <div className="max-w-4xl mx-auto">
                        <motion.div
                            initial={{ opacity: 0, scale: 0.95 }}
                            whileInView={{ opacity: 1, scale: 1 }}
                            className="p-12 md:p-16 shadow-2xl rounded-3xl relative overflow-hidden bg-gradient-to-r from-[#2076C7] to-[#1CADA3] text-white text-center"
                        >
                            <motion.h2 className="text-3xl md:text-4xl font-bold mb-6">Ready to Get Started?</motion.h2>
                            <motion.p className="text-lg md:text-xl text-white/90 mb-10 leading-relaxed font-light mx-auto max-w-2xl">
                                Apply now for {offer.title} and get expert guidance throughout the process.
                            </motion.p>
                            <div className="flex flex-col sm:flex-row gap-4 justify-center">
                                <button onClick={handleApply} className="bg-white text-[#2076C7] hover:bg-white/90 px-10 py-4 rounded-xl font-bold transition-all shadow-lg hover:shadow-xl hover:-translate-y-0.5">
                                    Apply Now
                                </button>
                                <a href="/#contact" className="bg-transparent border-2 border-white text-white hover:bg-white/10 px-10 py-4 rounded-xl font-bold transition-all flex items-center justify-center">
                                    Contact Us
                                </a>
                            </div>
                        </motion.div>
                    </div>
                </section>

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
            </div>
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
