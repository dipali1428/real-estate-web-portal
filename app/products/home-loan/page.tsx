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
import { homeLoanData as offer } from './data';
import { CATEGORIES, categorizedPlans, HOME_LOAN_TYPES, PARTNER_BANKS } from './loanConstants';
import { AuthService } from "@/app/services/authService";
import HomeLoanForm from './components/HomeLoanForm';
import LoanCalculator from './components/LoanCalculator';
import heroImage from './home-loan-hero-v2.png';

const IconMap: Record<string, any> = {
    Home,
    Building2,
    Repeat,
    Wrench,
    Construction,
    Building
};

export default function HomeLoanPage() {
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
            // Check for direct match or substring match (e.g. "AXIS BANK" in "Axis Bank")
            return Array.from(bankNamesInCategory).some(planBank =>
                partnerName.includes(planBank) || planBank.includes(partnerName)
            );
        });
    }, [activeCategory]);

    useEffect(() => {
        const title = `${offer.title} - ${offer.category} | Financial Services`;
        document.title = title;
        const description = offer.description || `Explore ${offer.title} - ${offer.overview?.substring(0, 150)}...`;

        let metaDescription = document.querySelector('meta[name="description"]');
        if (metaDescription) {
            metaDescription.setAttribute('content', description);
        } else {
            metaDescription = document.createElement('meta');
            metaDescription.setAttribute('name', 'description');
            metaDescription.setAttribute('content', description);
            document.head.appendChild(metaDescription);
        }

        const canonicalUrl = `https://yourdomain.com/offers/loans/home-loan`;
        let canonical = document.querySelector('link[rel="canonical"]');
        if (canonical) canonical.setAttribute('href', canonicalUrl);
        else {
            canonical = document.createElement('link');
            canonical.setAttribute('rel', 'canonical');
            canonical.setAttribute('href', canonicalUrl);
            document.head.appendChild(canonical);
        }

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
            { '@type': 'ListItem', position: 3, name: offer.title, item: `https://yourdomain.com/offers/loans/home-loan` },
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

            <div className="min-h-screen bg-neutral-100">

                {/* FIXED BACK BUTTON */}
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

                {/* TOP RIGHT APPLY BUTTON */}
                <div className="fixed z-50 top-17 right-1 md:top-23 md:right-4">
                    <button onClick={handleApply} className="flex items-center gap-2 px-4 py-2 md:px-6 md:py-2 text-sm md:text-base font-bold text-white bg-linear-to-r from-[#2076C7] to-[#1CADA3] rounded-full md:rounded-lg shadow-lg hover:opacity-90 active:scale-95 transition-all">
                        Apply Now <Zap className="w-4 h-4 fill-current" />
                    </button>
                </div>

                <header className="relative w-full overflow-hidden pt-24 md:pt-32 pb-16 bg-linear-to-r from-blue-50 to-white">
                    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">


                        <div className="flex flex-col lg:flex-row items-center gap-12">
                            {/* Left Column: Text & CTA */}
                            <motion.div
                                initial={{ opacity: 0, x: -50 }}
                                animate={{ opacity: 1, x: 0 }}
                                transition={{ duration: 0.8, ease: "easeOut" }}
                                className="w-full lg:w-1/2 text-left space-y-8"
                            >
                                <h1 className="text-5xl md:text-7xl font-bold font-sans bg-linear-to-r from-[#2076C7] to-[#1CADA3] bg-clip-text text-transparent leading-[1.1] mb-6 tracking-tight">
                                    <>
                                        Unlock Your <br />
                                        <span className="text-[#2076C7]">Dream Home</span> <br />
                                        with Rates as Low as <span className="text-[#1CADA3]">7.10%</span>
                                    </>
                                </h1>

                                <p className="text-xl md:text-2xl text-gray-600 max-w-xl leading-relaxed mb-8">
                                    {offer.description || `Explore flexible ${offer.title} options tailored to meet your unique financial needs.`}
                                </p>

                                <div className="flex flex-wrap gap-5 pt-2">
                                    <button onClick={handleApply} className="flex items-center gap-3 px-6 py-3 md:px-8 md:py-4 text-sm md:text-base font-bold text-white bg-gradient-to-r from-[#2076C7] to-[#1CADA3] rounded-full shadow-lg hover:opacity-90 transition-all">
                                        Consult an Advisor
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
                                {/* Added overflow-hidden and rounded-3xl here */}
                                <div className="relative w-full aspect-square max-w-[500px] rounded-3xl overflow-hidden">
                                    <Image
                                        src={heroImage}
                                        alt="Dream Home Loan"
                                        fill
                                        /* Added rounded-3xl here as well */
                                        className="object-contain drop-shadow-2xl hover:scale-105 transition-transform duration-700 rounded-3xl"
                                        priority
                                    />


                                    {/* Floating Interest Rate Badge */}
                                    <motion.div
                                        initial={{ opacity: 0, x: 20 }}
                                        animate={{
                                            opacity: 1,
                                            x: 0,
                                            y: [0, -10, 0]
                                        }}
                                        transition={{
                                            opacity: { duration: 0.8, delay: 0.5 },
                                            x: { duration: 0.8, delay: 0.5 },
                                            y: { duration: 3, repeat: Infinity, ease: "easeInOut" }
                                        }}
                                        className="absolute top-10 -right-4 md:-right-10 bg-white/80 backdrop-blur-md p-4 rounded-2xl shadow-xl border border-white/50 z-20 flex items-center gap-3"
                                    >
                                        <div className="w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center text-[#2076C7]">
                                            <TrendingUp className="w-5 h-5" />
                                        </div>
                                        <div>
                                            <div className="text-[10px] text-gray-500 font-medium uppercase tracking-wider">Starting Interest Rate</div>
                                            <div className="text-lg font-bold text-gray-800">7.15% <span className="text-sm font-normal text-gray-400">p.a.</span></div>
                                        </div>
                                    </motion.div>

                                    {/* Floating Tenure Badge */}
                                    <motion.div
                                        initial={{ opacity: 0, x: -20 }}
                                        animate={{
                                            opacity: 1,
                                            x: 0,
                                            y: [0, 10, 0]
                                        }}
                                        transition={{
                                            opacity: { duration: 0.8, delay: 0.7 },
                                            x: { duration: 0.8, delay: 0.7 },
                                            y: { duration: 3.5, repeat: Infinity, ease: "easeInOut" }
                                        }}
                                        className="absolute bottom-10 -left-4 md:-left-12 bg-white/80 backdrop-blur-md p-4 rounded-2xl shadow-xl border border-white/50 z-20 flex items-center gap-3"
                                    >
                                        <div className="w-10 h-10 rounded-full bg-teal-100 flex items-center justify-center text-[#1CADA3]">
                                            <Clock className="w-5 h-5" />
                                        </div>
                                        <div>
                                            <div className="text-[10px] text-gray-500 font-medium uppercase tracking-wider">Tenure</div>
                                            <div className="text-lg font-bold text-gray-800">Up to 30 years</div>
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

                <main>
                    {/* Choose Your Home Loan Section */}
                    <section className="py-24 bg-neutral-50 relative overflow-hidden">
                        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                            <motion.div
                                initial="hidden"
                                whileInView="visible"
                                viewport={{ once: true }}
                                className="text-center mb-16"
                            >
                                <motion.h2 className="text-4xl md:text-5xl font-bold bg-linear-to-r from-[#2076C7] to-[#1CADA3] bg-clip-text text-transparent mb-6">
                                    Choose Your Home Loan
                                </motion.h2>
                                <motion.p className="text-xl text-gray-500 max-w-3xl mx-auto font-light leading-relaxed">
                                    We offer a wide range of home loan solutions tailored to meet your financial needs. Choose the right option based on your property and requirements.
                                </motion.p>
                            </motion.div>

                            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                                {HOME_LOAN_TYPES.map((type, index) => {
                                    const IconComponent = IconMap[type.icon] || Home;
                                    return (
                                        <motion.div
                                            key={index}
                                            initial={{ opacity: 0, y: 30 }}
                                            whileInView={{ opacity: 1, y: 0 }}
                                            viewport={{ once: true }}
                                            transition={{ delay: index * 0.1 }}
                                            whileHover={{ y: -10 }}
                                            className="group relative bg-white rounded-3xl p-8 border border-gray-100 hover:border-[#1CADA3]/30 hover:shadow-2xl hover:shadow-[#1CADA3]/10 transition-all duration-500 flex flex-col h-full"
                                        >
                                            {/* Icon Header */}
                                            <div className="flex items-center gap-4 mb-6">
                                                <div className={`w-14 h-14 rounded-2xl flex items-center justify-center transition-all duration-500 group-hover:scale-110 group-hover:rotate-3 ${type.color === 'blue' ? 'bg-blue-100 text-[#2076C7]' : 'bg-teal-100 text-[#1CADA3]'}`}>
                                                    <IconComponent className="w-7 h-7" />
                                                </div>
                                                <h3 className="text-xl font-bold text-gray-800 leading-tight">
                                                    {type.title}
                                                </h3>
                                            </div>

                                            {/* Content */}
                                            <p className="text-gray-600 mb-6 flex-grow leading-relaxed">
                                                {type.description}
                                            </p>

                                            <div className="space-y-4 mb-8">
                                                <div>
                                                    <span className="text-xs font-bold text-[#2076C7] uppercase tracking-wider block mb-1">Best For:</span>
                                                    <p className="text-sm text-gray-700 font-medium">{type.bestFor}</p>
                                                </div>

                                                <div>
                                                    <span className="text-xs font-bold text-[#1CADA3] uppercase tracking-wider block mb-3">Benefits:</span>
                                                    <ul className="space-y-2">
                                                        {type.benefits.map((benefit, i) => (
                                                            <li key={i} className="flex items-start gap-2 text-sm text-gray-600">
                                                                <CheckCircle className="w-4 h-4 text-green-500 mt-0.5 shrink-0" />
                                                                <span>{benefit}</span>
                                                            </li>
                                                        ))}
                                                    </ul>
                                                </div>


                                            </div>

                                            {/* Button */}
                                            <button
                                                onClick={() => {
                                                    setActiveCategory(type.category);
                                                    document.getElementById('products-section')?.scrollIntoView({ behavior: 'smooth' });
                                                }}
                                                className="w-full py-4 rounded-xl font-bold text-sm bg-white border-2 border-gray-100 text-[#2076C7] group-hover:bg-linear-to-r group-hover:from-[#2076C7] group-hover:to-[#1CADA3] group-hover:text-white group-hover:border-transparent transition-all duration-300 flex items-center justify-center gap-2 shadow-sm"
                                            >
                                                Apply Now <ArrowRight className="w-4 h-4" />
                                            </button>

                                            {/* Background Decoration */}
                                            <div className="absolute top-0 right-0 p-4 opacity-5 group-hover:opacity-10 transition-opacity">
                                                <IconComponent className="w-24 h-24 -mr-8 -mt-8 rotate-12" />
                                            </div>
                                        </motion.div>
                                    );
                                })}
                            </div>
                        </div>
                    </section>

                    {/* Our Partner Banks & HFCs Section */}
                    <section id="products-section" className="py-24 bg-white">
                        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                            <div className="bg-neutral-50 rounded-[40px] p-8 md:p-12 shadow-inner border border-gray-100 relative overflow-hidden">
                                {/* Decorative Background */}
                                <div className="absolute top-0 right-0 w-64 h-64 bg-linear-to-br from-[#2076C7]/5 to-transparent rounded-full blur-3xl -mr-32 -mt-32" />

                                <div className="relative z-10 flex flex-col md:flex-row justify-between items-start md:items-center gap-6 mb-12">
                                    <div>
                                        <h2 className="text-3xl font-bold bg-linear-to-r from-[#2076C7] to-[#1CADA3] bg-clip-text text-transparent mb-2">Our Partner Banks & HFCs</h2>
                                        <p className="text-gray-500 font-medium">Top-rated financial institutions supporting your {activeCategory.toLowerCase()} needs</p>
                                    </div>
                                </div>

                                {/* CATEGORY TABS FOR PARTNERS */}
                                <div className="mb-10 relative z-10">
                                    <div className="flex flex-nowrap items-center gap-2 md:gap-4 p-2 bg-neutral-50/50 rounded-2xl border border-gray-100 w-full overflow-x-auto no-scrollbar justify-start lg:justify-center">
                                        {CATEGORIES.map((category) => (
                                            <button
                                                key={category}
                                                onClick={() => setActiveCategory(category)}
                                                className={`px-4 md:px-6 py-2.5 rounded-xl text-xs md:text-sm font-bold transition-all duration-300 whitespace-nowrap ${activeCategory === category
                                                    ? 'bg-gradient-to-r from-[#2076C7] to-[#1CADA3] text-white shadow-md'
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
                                                <motion.div
                                                    key={bank.name}
                                                    layout
                                                    initial={{ opacity: 0, scale: 0.9 }}
                                                    animate={{ opacity: 1, scale: 1 }}
                                                    exit={{ opacity: 0, scale: 0.9 }}
                                                    transition={{ duration: 0.3, delay: index * 0.05 }}
                                                    className="bg-white border border-gray-100 rounded-2xl p-5 flex items-center gap-4 hover:shadow-lg hover:shadow-gray-200/40 transition-all duration-300 group cursor-pointer"
                                                >
                                                    <div
                                                        className="w-12 h-12 rounded-xl flex items-center justify-center shrink-0 transition-transform group-hover:scale-110"
                                                        style={{ backgroundColor: `${bank.color}10` }}
                                                    >
                                                        <Bank className="w-6 h-6" style={{ color: bank.color }} />
                                                    </div>
                                                    <span className="text-[11px] font-bold text-gray-700 leading-tight group-hover:text-[#2076C7] transition-colors uppercase">
                                                        {bank.name}
                                                    </span>
                                                </motion.div>
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

                    {/* Calculator Section */}
                    <section className="py-24 bg-neutral-50 border-y border-gray-100">
                        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
                            <motion.div initial="hidden" whileInView="visible" className="text-center mb-16">
                                <motion.h2 className="text-4xl font-bold bg-linear-to-r from-[#2076C7] to-[#1CADA3] bg-clip-text text-transparent mb-4">
                                    Calculate Your EMI
                                </motion.h2>
                                <motion.p className="text-xl text-gray-500 max-w-3xl mx-auto font-light">
                                    Plan your home purchase with our accurate EMI calculator.
                                </motion.p>
                            </motion.div>
                            <div className="mb-12">
                                <Suspense fallback={<div className="flex justify-center items-center py-12">Loading calculator...</div>}>
                                    <LoanCalculator />
                                </Suspense>
                            </div>
                        </div>
                    </section>


                    {/* Detailed Types Comparison */}
                    <section className="py-24 bg-white">
                        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                            <motion.div initial="hidden" whileInView="visible" className="text-center mb-16">
                                <motion.h2 className="text-4xl font-bold bg-linear-to-r from-[#2076C7] to-[#1CADA3] bg-clip-text text-transparent mb-4">
                                    Explore Home Loan Variants
                                </motion.h2>
                                <motion.p className="text-xl text-gray-500 max-w-3xl mx-auto font-light">
                                    A detailed breakdown of various home loan variants to help you make an informed choice.
                                </motion.p>
                            </motion.div>

                            <motion.div
                                initial={{ opacity: 0, y: 30 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                className="bg-neutral-50 rounded-[40px] p-4 md:p-10 shadow-inner border border-gray-100 overflow-hidden"
                            >
                                <div className="overflow-x-auto no-scrollbar">
                                    <table className="w-full text-left border-collapse min-w-[1000px]">
                                        <thead>
                                            <tr className="bg-gradient-to-r from-[#2076C7] to-[#1CADA3] text-white">
                                                <th className="px-6 py-6 text-sm font-black uppercase tracking-widest text-white/90 whitespace-nowrap">Feature</th>
                                                <th className="px-6 py-6 text-lg font-bold text-white">New Purchase</th>
                                                <th className="px-6 py-6 text-lg font-bold text-white">Resale Property</th>
                                                <th className="px-6 py-6 text-lg font-bold text-white">Takeover (BT)</th>
                                                <th className="px-6 py-6 text-lg font-bold text-white">Renovation</th>
                                                <th className="px-6 py-6 text-lg font-bold text-white">Plot + Const.</th>
                                            </tr>
                                        </thead>
                                        <tbody className="divide-y divide-gray-100">
                                            {[
                                                { feature: "Purpose", new: "Buy new house from builder", resale: "Buy second-hand property", takeover: "Transfer existing loan", renovation: "Repair / upgrade house", plot: "Buy plot + build house" },
                                                { feature: "Property Type", new: "Under-construction / Ready", resale: "Ready property", takeover: "Existing financed property", renovation: "Existing owned property", plot: "Land + Construction" },
                                                { feature: "Legal Verification", new: "Builder + Bank", resale: "Full property legal check", takeover: "Minimal (existing loan)", renovation: "Basic check", plot: "Land + Construction approval" },
                                                { feature: "Disbursal", new: "Lump sum / Stage-wise", resale: "Lump sum", takeover: "Loan closure + new sanction", renovation: "Lump sum", plot: "Stage-wise" },
                                                { feature: "Interest Rate", new: "Lowest options available", resale: "Similar to new purchase", takeover: "Similar or slightly lower", renovation: "Slightly higher", plot: "Similar to home loan" },
                                                { feature: "Best For", new: "First-time buyers", resale: "Ready-to-move homes", takeover: "Reduce EMI", renovation: "House improvement", plot: "Self-construction" }
                                            ].map((row, idx) => (
                                                <motion.tr
                                                    key={idx}
                                                    whileHover={{ backgroundColor: "#f9fafb" }}
                                                    className="transition-colors group"
                                                >
                                                    <td className="px-6 py-6 font-bold text-gray-900 group-hover:text-[#2076C7] transition-colors sticky left-0 bg-neutral-50 group-hover:bg-white z-10">{row.feature}</td>
                                                    <td className="px-6 py-6 text-gray-600 text-sm font-medium">{row.new}</td>
                                                    <td className="px-6 py-6 text-gray-600 text-sm font-medium">{row.resale}</td>
                                                    <td className="px-6 py-6 text-gray-600 text-sm font-medium">{row.takeover}</td>
                                                    <td className="px-6 py-6 text-gray-600 text-sm font-medium">{row.renovation}</td>
                                                    <td className="px-6 py-6 text-gray-600 text-sm font-medium">{row.plot}</td>
                                                </motion.tr>
                                            ))}
                                        </tbody>
                                    </table>
                                </div>
                            </motion.div>
                        </div>
                    </section>


                    {/* Comparison Section */}
                    <section className="py-24 bg-neutral-50 border-y border-gray-100">
                        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                            <motion.div initial="hidden" whileInView="visible" className="text-center mb-16">
                                <motion.h2 className="text-4xl font-bold bg-linear-to-r from-[#2076C7] to-[#1CADA3] bg-clip-text text-transparent mb-4">
                                    Home Loan vs Personal Loan vs LAP
                                </motion.h2>
                                <motion.p className="text-xl text-gray-500 max-w-3xl mx-auto font-light">
                                    Compare different loan options to find the best fit for your financial goals.
                                </motion.p>
                            </motion.div>

                            <motion.div
                                initial={{ opacity: 0, y: 30 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                className="bg-white rounded-[40px] p-4 md:p-10 shadow-[0_20px_50px_rgba(0,0,0,0.04)] border border-gray-100 overflow-hidden"
                            >
                                <div className="overflow-x-auto no-scrollbar">
                                    <table className="w-full text-left border-collapse min-w-[600px]">
                                        <thead>
                                            <tr className="bg-gradient-to-r from-[#2076C7] to-[#1CADA3] text-white">
                                                <th className="px-6 py-6 text-sm font-black uppercase tracking-widest text-white/90">Feature</th>
                                                <th className="px-6 py-6 text-lg font-bold text-white">Home Loan</th>
                                                <th className="px-6 py-6 text-lg font-bold text-white">Personal Loan</th>
                                                <th className="px-6 py-6 text-lg font-bold text-white">LAP</th>
                                            </tr>
                                        </thead>
                                        <tbody className="divide-y divide-gray-50">
                                            {[
                                                { feature: "Interest", home: "7–9%", personal: "10–18%", lap: "8–11%" },
                                                { feature: "Tenure", home: "30 Years", personal: "5 Years", lap: "15–20 Years" },
                                                { feature: "Loan Amount", home: "High", personal: "Medium", lap: "High" },
                                                { feature: "Security", home: "Property", personal: "Unsecured", lap: "Property" }
                                            ].map((row, idx) => (
                                                <motion.tr
                                                    key={idx}
                                                    whileHover={{ backgroundColor: "#f9fafb" }}
                                                    className="transition-colors group"
                                                >
                                                    <td className="px-6 py-6 font-bold text-gray-900 group-hover:text-[#2076C7] transition-colors">{row.feature}</td>
                                                    <td className="px-6 py-6">
                                                        <span className="px-4 py-1.5 bg-blue-50 text-[#2076C7] rounded-full text-xs font-extrabold uppercase tracking-tight">
                                                            {row.home}
                                                        </span>
                                                    </td>
                                                    <td className="px-6 py-6 text-gray-600 font-medium">{row.personal}</td>
                                                    <td className="px-6 py-6">
                                                        <span className="px-4 py-1.5 bg-emerald-50 text-[#1CADA3] rounded-full text-xs font-extrabold uppercase tracking-tight">
                                                            {row.lap}
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

                    {/* Eligibility Criteria */}
                    <section className="py-24 bg-white">
                        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
                            <motion.div initial="hidden" whileInView="visible" className="text-center mb-16">
                                <motion.h2 className="text-4xl font-bold bg-linear-to-r from-[#2076C7] to-[#1CADA3] bg-clip-text text-transparent mb-4">
                                    Eligibility Criteria
                                </motion.h2>
                                <motion.p className="text-xl text-gray-500 max-w-3xl mx-auto font-light">
                                    Basic requirements to qualify for a home loan.
                                </motion.p>
                            </motion.div>

                            <motion.div
                                initial={{ opacity: 0, y: 30 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                            >
                                <section className="bg-neutral-50 rounded-[40px] shadow-inner border border-gray-100 p-8 md:p-12">
                                    <ul className="space-y-4">
                                        {offer.eligibility.map((item, index) => (
                                            <li key={index} className="flex items-center gap-3 p-3 rounded-lg bg-white shadow-sm">
                                                <div className="w-8 h-8 rounded-full bg-blue-100 flex items-center justify-center text-[#2076C7] font-bold text-sm">{index + 1}</div>
                                                <span className="text-gray-700 text-sm md:text-base">{item}</span>
                                            </li>
                                        ))}
                                    </ul>
                                </section>
                            </motion.div>
                        </div>
                    </section>

                    {/* Required Documents */}
                    <section className="py-24 bg-neutral-50 border-y border-gray-100">
                        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                            <motion.div initial="hidden" whileInView="visible" className="text-center mb-16">
                                <motion.h2 className="text-4xl font-bold bg-linear-to-r from-[#2076C7] to-[#1CADA3] bg-clip-text text-transparent mb-4">
                                    Document Checklist
                                </motion.h2>
                                <motion.p className="text-xl text-gray-500 max-w-3xl mx-auto font-light">
                                    Keep these documents ready for a smooth application process.
                                </motion.p>
                            </motion.div>

                            <motion.div
                                initial={{ opacity: 0, y: 30 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                            >
                                <section className="bg-white rounded-[40px] shadow-[0_20px_50px_rgba(0,0,0,0.04)] border border-gray-100 p-8 md:p-12">
                                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12">
                                        {/* Salaried Applicants */}
                                        <div className="rounded-xl p-5">
                                            <div className="flex items-center gap-3 mb-8 pb-3 border-b border-gray-100">
                                                <User className="w-6 h-6 text-[#2076C7]" />
                                                <h3 className="text-2xl font-bold text-[#115E59]">Salaried Applicants</h3>
                                            </div>
                                            <div className="space-y-10">
                                                <div>
                                                    <h4 className="font-bold text-[#1CADA3] text-sm mb-4 flex items-center gap-2 uppercase tracking-wide">
                                                        <CheckCircle className="w-4 h-4" /> Identity Proof
                                                    </h4>
                                                    <ul className="grid grid-cols-2 gap-y-3 gap-x-4">
                                                        {['PAN Card', 'Aadhaar Card', 'Passport Size Photo'].map((item, i) => (
                                                            <li key={i} className="text-sm text-gray-600 flex items-center gap-2">
                                                                <span className="w-1 h-1 rounded-full bg-gray-300" /> {item}
                                                            </li>
                                                        ))}
                                                    </ul>
                                                </div>
                                                <div>
                                                    <h4 className="font-bold text-[#2076C7] text-sm mb-4 flex items-center gap-2 uppercase tracking-wide">
                                                        <CheckCircle className="w-4 h-4" /> Address Proof (Any One)
                                                    </h4>
                                                    <ul className="grid grid-cols-2 gap-y-3 gap-x-4">
                                                        {['Aadhaar Card', 'Electricity Bill', 'Telephone Bill', 'Gas Receipt'].map((item, i) => (
                                                            <li key={i} className="text-sm text-gray-600 flex items-center gap-2">
                                                                <span className="w-1 h-1 rounded-full bg-gray-300" /> {item}
                                                            </li>
                                                        ))}
                                                    </ul>
                                                </div>
                                                <div>
                                                    <h4 className="font-bold text-[#1CADA3] text-sm mb-4 flex items-center gap-2 uppercase tracking-wide">
                                                        <CheckCircle className="w-4 h-4" /> Income Proof
                                                    </h4>
                                                    <ul className="grid grid-cols-1 gap-y-3">
                                                        {['Latest 3 Months Salary Slips', 'Latest 6 Months Bank Statement', 'Form 16 (Last 2 Years)'].map((item, i) => (
                                                            <li key={i} className="text-sm text-gray-600 flex items-center gap-2">
                                                                <span className="w-1 h-1 rounded-full bg-gray-300" /> {item}
                                                            </li>
                                                        ))}
                                                    </ul>
                                                </div>
                                                <div>
                                                    <h4 className="font-bold text-[#2076C7] text-sm mb-4 flex items-center gap-2 uppercase tracking-wide">
                                                        <CheckCircle className="w-4 h-4" /> Employment Proof
                                                    </h4>
                                                    <ul className="grid grid-cols-2 gap-y-3 gap-x-4">
                                                        {['Employment ID Card', 'Offer / Appointment Letter'].map((item, i) => (
                                                            <li key={i} className="text-sm text-gray-600 flex items-center gap-2">
                                                                <span className="w-1 h-1 rounded-full bg-gray-300" /> {item}
                                                            </li>
                                                        ))}
                                                    </ul>
                                                </div>
                                            </div>
                                        </div>

                                        {/* Self-Employed Applicants */}
                                        <div className="rounded-xl p-5">
                                            <div className="flex items-center gap-3 mb-8 pb-3 border-b border-gray-100">
                                                <Building2 className="w-6 h-6 text-[#1CADA3]" />
                                                <h3 className="text-2xl font-bold text-[#115E59]">Self-Employed Applicants</h3>
                                            </div>
                                            <div className="space-y-10">
                                                <div>
                                                    <h4 className="font-bold text-[#1CADA3] text-sm mb-4 flex items-center gap-2 uppercase tracking-wide">
                                                        <CheckCircle className="w-4 h-4" /> Identity Proof
                                                    </h4>
                                                    <ul className="grid grid-cols-2 gap-y-3 gap-x-4">
                                                        {['PAN Card', 'Aadhaar Card', 'Passport Size Photo'].map((item, i) => (
                                                            <li key={i} className="text-sm text-gray-600 flex items-center gap-2">
                                                                <span className="w-1 h-1 rounded-full bg-gray-300" /> {item}
                                                            </li>
                                                        ))}
                                                    </ul>
                                                </div>
                                                <div>
                                                    <h4 className="font-bold text-[#1CADA3] text-sm mb-4 flex items-center gap-2 uppercase tracking-wide">
                                                        <CheckCircle className="w-4 h-4" /> Address Proof (Any One)
                                                    </h4>
                                                    <ul className="grid grid-cols-2 gap-y-3 gap-x-4">
                                                        {['Aadhaar Card', 'Electricity Bill', 'Telephone Bill', 'Gas Receipt'].map((item, i) => (
                                                            <li key={i} className="text-sm text-gray-600 flex items-center gap-2">
                                                                <span className="w-1 h-1 rounded-full bg-gray-300" /> {item}
                                                            </li>
                                                        ))}
                                                    </ul>
                                                </div>
                                                <div>
                                                    <h4 className="font-bold text-[#1CADA3] text-sm mb-4 flex items-center gap-2 uppercase tracking-wide">
                                                        <CheckCircle className="w-4 h-4" /> Income Proof
                                                    </h4>
                                                    <ul className="grid grid-cols-1 gap-y-3">
                                                        {['Latest 3 Years ITR', 'Latest 1 Year Bank Statement'].map((item, i) => (
                                                            <li key={i} className="text-sm text-gray-600 flex items-center gap-2">
                                                                <span className="w-1 h-1 rounded-full bg-gray-300" /> {item}
                                                            </li>
                                                        ))}
                                                    </ul>
                                                </div>
                                                <div>
                                                    <h4 className="font-bold text-[#1CADA3] text-sm mb-4 flex items-center gap-2 uppercase tracking-wide">
                                                        <CheckCircle className="w-4 h-4" /> Business Proof
                                                    </h4>
                                                    <ul className="grid grid-cols-2 gap-y-3 gap-x-4">
                                                        {['Shop Act License', 'GST Certificate'].map((item, i) => (
                                                            <li key={i} className="text-sm text-gray-600 flex items-center gap-2">
                                                                <span className="w-1 h-1 rounded-full bg-gray-300" /> {item}
                                                            </li>
                                                        ))}
                                                    </ul>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </section>
                            </motion.div>
                        </div>
                    </section>

                    {/* Process Overview */}
                    <section className="py-24 bg-neutral-50">
                        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                            <motion.div initial="hidden" whileInView="visible" className="text-center mb-16">
                                <motion.h2 className="text-4xl font-bold bg-linear-to-r from-[#2076C7] to-[#1CADA3] bg-clip-text text-transparent mb-4">
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
                                    <div className="hidden lg:block absolute top-12 left-10 right-10 h-0.5 bg-linear-to-r from-[#2076C7] via-[#1CADA3] to-[#2076C7] z-0 opacity-30"></div>
                                    {[
                                        { step: "1", title: "Check Eligibility", details: ["Share basic details like income, loan amount, and employment type", "Our team helps you check eligibility across multiple banks"] },
                                        { step: "2", title: "Submit Documents", details: ["Provide required KYC and income documents", "Documents are verified by the bank"] },
                                        { step: "3", title: "Application & Processing", details: ["Application is submitted to selected bank", "Bank evaluates credit score and property", "Legal & technical verification conducted"] },
                                        { step: "4", title: "Loan Approval", details: ["Bank issues Sanction Letter", "Loan amount, rate & tenure confirmed"] },
                                        { step: "5", title: "Loan Disbursement", details: ["Agreement signing", "Loan amount disbursed to seller / builder"] }
                                    ].map((item, index) => (
                                        <motion.div
                                            key={index}
                                            whileHover={{ y: -5, boxShadow: "0 10px 15px -3px rgb(0 0 0 / 0.1)" }}
                                            className="relative z-10 flex flex-col items-center text-center p-4 bg-gray-50 rounded-xl border border-gray-100 hover:border-[#1CADA3] transition-all group"
                                        >
                                            <div className="w-16 h-16 rounded-full bg-linear-to-r from-[#2076C7] to-[#1CADA3] flex items-center justify-center text-white font-bold text-2xl mb-4 group-hover:scale-110 transition-transform">
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
                                    ))}
                                </div>
                            </motion.section>
                        </div>
                    </section>

                    {/* FAQ Section */}
                    <section className="py-24 bg-white">
                        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
                            <motion.div initial="hidden" whileInView="visible" className="text-center mb-16">
                                <motion.h2 className="text-4xl font-bold bg-linear-to-r from-[#2076C7] to-[#1CADA3] bg-clip-text text-transparent mb-4">
                                    FAQ
                                </motion.h2>
                                <motion.p className="text-xl text-gray-500 max-w-3xl mx-auto font-light">
                                    Common questions about securing your dream home.
                                </motion.p>
                            </motion.div>
                            <div className="space-y-6">
                                {[
                                    { q: 'What is the rate of interest?', a: 'Home loan interest rates start from 7.15% p.a. However, the final rate depends on various factors including the chosen bank, your CIBIL score, loan amount, and employment type.' },
                                    { q: 'How to apply?', a: 'You can apply directly through our website by clicking the \'Apply Now\' button on any plan card. Our experts will then guide you through the digital documentation and approval process.' },
                                    { q: 'What is the processing time?', a: 'Processing time varies by lender but typically ranges from 3 to 10 working days, depending on the completeness of your documentation and property verification.' },
                                    { q: 'Are there any hidden charges?', a: 'No, we believe in complete transparency. All processing fees and legal charges are clearly mentioned in your loan agreement. Some banks also offer zero processing fee options for balance transfers.' }
                                ].map((faq, i) => (
                                    <motion.div
                                        key={i}
                                        initial="hidden"
                                        whileInView="visible"
                                        viewport={{ once: true }}
                                        className="overflow-hidden bg-white shadow-sm border border-gray-100 rounded-2xl"
                                    >
                                        <button
                                            onClick={() => setOpenFaq(openFaq === i ? null : i)}
                                            className="w-full px-8 py-6 text-left flex justify-between items-center hover:bg-neutral-50 transition-colors group"
                                        >
                                            <span className="font-bold text-lg text-gray-700 group-hover:text-[#2076C7] transition-colors">{faq.q}</span>
                                            <div className={`p-2 rounded-full transition-all ${openFaq === i ? 'bg-[#2076C7] text-white rotate-180' : 'bg-[#2076C7]/10 text-[#2076C7]'}`}>
                                                <ChevronDown className="w-5 h-5" />
                                            </div>
                                        </button>
                                        <AnimatePresence>
                                            {openFaq === i && (
                                                <motion.div
                                                    initial={{ height: 0, opacity: 0 }}
                                                    animate={{ height: "auto", opacity: 1 }}
                                                    exit={{ height: 0, opacity: 0 }}
                                                    transition={{ duration: 0.3, ease: "easeInOut" }}
                                                >
                                                    <div className="px-8 pb-8 text-gray-500 bg-neutral-50/50 leading-relaxed">
                                                        <div className="h-px bg-gray-100 mb-6" />
                                                        {faq.a}
                                                    </div>
                                                </motion.div>
                                            )}
                                        </AnimatePresence>
                                    </motion.div>
                                ))}
                            </div>
                        </div>
                    </section>

                    {/* CTA Section */}
                    <section className="py-24 bg-white">
                        <div className="max-w-4xl mx-auto text-center px-4">
                            <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} className="p-12 md:p-16 shadow-2xl rounded-3xl relative overflow-hidden bg-gradient-to-r from-[#2076C7] to-[#1CADA3] text-white">
                                <motion.h2 className="text-3xl md:text-4xl font-bold mb-6">Ready to Get Started?</motion.h2>
                                <motion.p className="text-lg md:text-xl text-white/90 mb-10 leading-relaxed font-light">
                                    Apply now for {offer.title} and get expert guidance throughout the process.
                                </motion.p>
                                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                                    <button onClick={handleApply} className="bg-white text-[#2076C7] hover:bg-white/90 px-10 py-4 rounded-xl font-bold transition-all shadow-lg hover:shadow-xl hover:-translate-y-0.5">
                                        Apply Now
                                    </button>
                                    <a href="/#contact" className="bg-transparent border-2 border-white text-white hover:bg-white/10 px-10 py-4 rounded-xl font-bold transition-all">
                                        Contact Us
                                    </a>
                                </div>
                            </motion.div>
                        </div>
                    </section>

                    <div className="pb-16 flex justify-center">
                        <button onClick={handleBackToOffers} className="inline-flex items-center gap-2 px-6 py-3 text-gray-700 bg-white rounded-lg border border-gray-300 hover:bg-gray-50 transition-colors shadow-sm">
                            <ArrowLeft className="w-4 h-4" /> Back to All Offers
                        </button>
                    </div>
                </main>

                {/* VERIFICATION MODAL */}
                {isVerifying && (
                    <VerificationPopup
                        offerTitle={offer.title}
                        onSuccess={handleVerificationSuccess}
                        onCancel={() => setIsVerifying(false)}
                    />
                )}

                {/* PRODUCT FORM MODAL */}
                {isFormOpen && (
                    <div className="fixed inset-0 z-[1000] bg-black/50 flex items-center justify-center p-4 backdrop-blur-sm">
                        <div className="relative bg-white rounded-2xl w-full max-w-4xl max-h-[90vh] overflow-y-auto shadow-xl p-6">
                            <button onClick={() => setIsFormOpen(false)} className="absolute top-4 right-4 z-10 p-2 hover:bg-gray-100 rounded-lg transition-colors">
                                <X className="w-6 h-6" />
                            </button>
                            <Suspense fallback={<div className="flex justify-center items-center py-12">Loading form...</div>}>
                                <HomeLoanForm
                                    onClose={() => setIsFormOpen(false)}
                                    prefilledData={verifiedUserData}
                                />
                            </Suspense>
                        </div>
                    </div>
                )}
            </div >
        </>
    );
}

/**
 * 🔹 Verification Component (Internal Modal)
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

    const handleOtpChange = (value: string, index: number) => {
        if (isNaN(Number(value))) return;
        const newOtp = [...otp];
        newOtp[index] = value.substring(value.length - 1);
        setOtp(newOtp);
        if (value && index < 5) inputRefs.current[index + 1]?.focus();
    };

    const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>, index: number) => {
        if (e.key === "Backspace" && !otp[index] && index > 0) inputRefs.current[index - 1]?.focus();
    };

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
        <div className="fixed inset-0 z-[1100] bg-black/60 backdrop-blur-md flex items-center justify-center p-4">
            <div className="bg-white rounded-3xl w-full max-w-md overflow-hidden shadow-2xl animate-in zoom-in duration-200">
                <div className="bg-linear-to-r from-[#2076C7] to-[#1CADA3] p-6 text-center text-white relative">
                    <button onClick={onCancel} className="absolute right-4 top-4 hover:bg-white/20 rounded-full p-1 transition-colors"><X size={20} /></button>
                    <div className="bg-white/20 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-3 border-2 border-white/30"><ShieldCheck size={32} /></div>
                    <h3 className="text-xl font-bold">Verification</h3>
                    <p className="text-xs text-white/80 mt-1">Applying for: {offerTitle}</p>
                </div>
                <div className="p-6">
                    {step === "details" ? (
                        <form onSubmit={handleSendOtp} className="space-y-4">
                            <div className="space-y-3">
                                <div className="relative">
                                    <User className="absolute left-3 top-3 text-gray-400" size={18} />
                                    <input required type="text" placeholder="Full Name" className="w-full border-gray-200 border rounded-xl p-2.5 pl-10 focus:ring-2 focus:ring-[#1CADA3] outline-none text-gray-700" value={formData.name} onChange={e => setFormData({ ...formData, name: e.target.value })} />
                                </div>
                                <div className="relative">
                                    <Mail className="absolute left-3 top-3 text-gray-400" size={18} />
                                    <input required type="email" placeholder="Email Address" className="w-full border-gray-200 border rounded-xl p-2.5 pl-10 focus:ring-2 focus:ring-[#1CADA3] outline-none text-gray-700" value={formData.email} onChange={e => setFormData({ ...formData, email: e.target.value })} />
                                </div>
                                <div className="relative">
                                    <Smartphone className="absolute left-3 top-3 text-gray-400" size={18} />
                                    <input required type="tel" maxLength={10} placeholder="10-digit Mobile Number" className="w-full border-gray-200 border rounded-xl p-2.5 pl-10 focus:ring-2 focus:ring-[#1CADA3] outline-none text-gray-700" value={formData.mobile} onChange={e => setFormData({ ...formData, mobile: e.target.value.replace(/\D/g, "") })} />
                                </div>
                            </div>
                            {error && <p className="text-red-500 text-xs text-center font-medium bg-red-50 p-2 rounded-lg">{error}</p>}
                            <button type="submit" disabled={isLoading} className="w-full bg-[#1CADA3] text-white py-3.5 rounded-xl font-bold hover:bg-[#178e86] shadow-lg disabled:opacity-50 transition-all active:scale-95">{isLoading ? "Requesting OTP..." : "Continue to Verification"}</button>
                        </form>
                    ) : (
                        <div className="space-y-6 text-center animate-in slide-in-from-bottom-4 duration-300">
                            <div>
                                <p className="text-sm text-gray-500 mb-6">Enter the code sent to <br /> <span className="text-gray-800 font-medium tracking-wide">{formData.mobile}</span></p>
                                <div className="flex justify-between gap-2 mb-2">
                                    {otp.map((digit, index) => (
                                        <input key={index} type="text" maxLength={1} ref={(el) => { inputRefs.current[index] = el; }} value={digit} onChange={(e) => handleOtpChange(e.target.value, index)} onKeyDown={(e) => handleKeyDown(e, index)} className="w-12 h-14 border-2 border-gray-100 rounded-xl text-center text-2xl font-medium text-gray-700 focus:border-[#1CADA3] focus:ring-1 focus:ring-[#1CADA3] outline-none transition-all" />
                                    ))}
                                </div>
                            </div>
                            {error && <p className="text-red-500 text-xs font-medium bg-red-50 p-2 rounded-lg">{error}</p>}
                            <div className="space-y-3">
                                <button onClick={handleVerifyOtp} disabled={isLoading} className="w-full bg-linear-to-r from-[#2076C7] to-[#1CADA3] text-white py-3.5 rounded-xl font-bold shadow-lg">{isLoading ? "Verifying..." : "Verify & Open Application"}</button>
                                <div className="flex flex-col gap-2 pt-2">
                                    {timer > 0 ? <p className="text-xs text-red-400 font-medium">Resend OTP in {timer}s</p> : <button onClick={() => handleSendOtp()} className="text-xs text-[#1CADA3] hover:text-[#178e86] font-bold underline">Resend OTP</button>}
                                    <button onClick={() => setStep("details")} className="text-xs text-gray-400 hover:text-gray-600 underline">Change details</button>
                                </div>
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}
