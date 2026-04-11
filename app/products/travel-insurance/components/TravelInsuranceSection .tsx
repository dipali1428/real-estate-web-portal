
'use client';

import { motion, AnimatePresence } from 'framer-motion';
import { useState } from 'react';
import { 
    IconCheck, IconDownload, IconBackpack, IconBriefcase, 
    IconSchool, IconUsers, IconLoader, IconPlane, 
    IconFileText, IconCalculator, IconWorld, IconShieldCheck, IconMapPin,
    IconHistory, IconFileCertificate,
    IconStethoscope, IconLuggage, IconPlaneArrival
} from '@tabler/icons-react';
import { useModal } from '@/app/context/ModalContext';
import toast from 'react-hot-toast';
import { travelInsurancePlans } from '../data';

// --- Shared Data ---
const providers = [
    { name: 'Tata AIG', ratio: '99.01%', network: '7,000+', features: ['COVID-19 Coverage', 'No Sub-limits'], color: 'from-[#1CADA3] to-[#2076C7]', price: '₹24.8/*' },
    { name: 'Bajaj Allianz', ratio: '98.48%', network: '8,000+', features: ['Missed Flight Cover', 'Home Burglary Cover'], color: 'from-[#1CADA3] to-[#2076C7]', price: '₹13/*' },
    { name: 'HDFC ERGO', ratio: '99.85%', network: '1 Lakh+', features: ['Cashless Worldwide', 'No Medical Check-up'], color: 'from-[#1CADA3] to-[#2076C7]', price: '₹25/*' },
    { name: 'Niva Bupa', ratio: '99.99%', network: '10,000+', features: ['Zero Deductible', 'Quick Claim Settlement'], color: 'from-[#1CADA3] to-[#2076C7]', price: '₹20/*' },
    { name: 'Reliance', ratio: '98.65%', network: '8,500+', features: ['Auto-Extension', 'No Med Check'], color: 'from-[#1CADA3] to-[#2076C7]', price: '₹15/*' },
    { name: 'ICICI Lombard', ratio: '99.70%', network: '6,500+', features: ['Adventure Sports', 'Schengen Approved'], color: 'from-[#1CADA3] to-[#2076C7]', price: '₹22/*' },
];

const coverageBenefits = [
    { icon: IconStethoscope, title: 'Medical Cover', limit: '$0', status: 'Inactive', color: 'bg-slate-50 text-slate-400' },
    { icon: IconLuggage, title: 'Baggage Loss', limit: '$0', status: 'Inactive', color: 'bg-slate-50 text-slate-400' },
    { icon: IconPlaneArrival, title: 'Trip Delay', limit: '$0', status: 'Inactive', color: 'bg-slate-50 text-slate-400' },
    { icon: IconFileCertificate, title: 'Emergency Return', limit: '--', status: 'Inactive', color: 'bg-slate-50 text-slate-400' },
];

// Sub-components
import BenefitsAndEligibility from './BenefitsAndEligibility';
import CalculatorAndProcess from './CalculatorAndProcess';
import DashboardView from './DashboardView';

const getPlanIcon = (title: string) => {
    switch (title) {
        case 'Single Trip': return IconBackpack;
        case 'Multi-Trip Annual': return IconBriefcase;
        case 'Student Travel': return IconSchool;
        case 'Family Floater': return IconUsers;
        default: return IconPlane;
    }
};

export default function TravelInsuranceSection({ isDashboard = false }: { isDashboard?: boolean }) {
    const { openLogin, openApplyNow } = useModal();
    const [activeTab, setActiveTab] = useState<'plans' | 'details' | 'calculator'>('plans');

    const [hasActivePolicy, setHasActivePolicy] = useState(false); // Reset to false as requested for initial empty state
    const [hasActiveClaim, setHasActiveClaim] = useState(false);

    // Cart check removed

    const handleAddToCart = (plan: any) => {
        if (isDashboard) {
            openApplyNow();
        } else {
            openLogin();
        }
    };

    return (
        <section className={isDashboard ? 'pt-4 relative overflow-hidden' : 'py-12 bg-white relative overflow-hidden'}>
            <div className={isDashboard ? 'leading-relaxed' : 'max-w-[1440px] mx-auto px-6 leading-relaxed'}>
                
                {/* NAVIGATION HEADER */}
                {isDashboard ? (
                    <motion.div
                        initial={{ opacity: 0, y: -10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.4 }}
                        className="relative bg-white rounded-2xl p-6 mb-8 shadow-sm border border-slate-100/60"
                    >
                        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6">
                            <div className="flex flex-col sm:flex-row items-center sm:items-start gap-4 text-center sm:text-left">
                                <div className="w-12 h-12 rounded-xl bg-gradient-to-r from-[#2076C7] to-[#1CADA3] flex items-center justify-center text-white font-bold text-xl shadow-lg shrink-0">
                                    {activeTab === 'calculator' ? (
                                        <IconCalculator size={24} />
                                    ) : activeTab === 'details' ? (
                                        <IconHistory size={24} />
                                    ) : (
                                        <IconPlane size={24} />
                                    )}
                                </div>

                                <div>
                                    <div className="flex flex-col sm:flex-row items-center gap-3 mb-1">
                                        <h2 className="text-xl sm:text-2xl font-bold text-slate-800 tracking-tight leading-tight">
                                            {activeTab === 'plans' 
                                                ? 'Travel Protection' 
                                                : activeTab === 'details' 
                                                ? 'Insurance Dashboard' 
                                                : 'Travel Calculator'}
                                        </h2>
                                    </div>
                                    <p className="text-xs text-slate-500 font-medium flex items-center justify-center sm:justify-start gap-2">
                                        <span>
                                            {activeTab === 'plans' 
                                                ? 'Secure your journeys with comprehensive global coverage' 
                                                : activeTab === 'details' 
                                                ? 'Manage your active policy and claims' 
                                                : 'Estimate your premium based on destination and duration'}
                                        </span>
                                    </p>
                                </div>
                            </div>

                            <div className="w-full sm:w-auto mt-4 sm:mt-0">
                                <div className="flex flex-wrap justify-center sm:flex-nowrap sm:flex-row p-1.5 bg-slate-100/80 backdrop-blur-sm rounded-2xl sm:rounded-full gap-1.5 relative shadow-inner border border-slate-200/50">
                                    {[
                                        { id: 'plans', label: 'Plans', icon: IconPlane },
                                        { id: 'details', label: 'Dashboard', icon: IconFileText },
                                        { id: 'calculator', label: 'Calculator', icon: IconCalculator },
                                    ].map((tab) => (
                                        <button
                                            key={tab.id}
                                            onClick={() => setActiveTab(tab.id as any)}
                                            className={`relative flex-1 sm:flex-none px-3 md:px-5 py-3 sm:py-2 rounded-xl sm:rounded-full text-[10px] md:text-xs font-bold uppercase tracking-wider transition-all duration-300 z-10 flex flex-col sm:flex-row items-center justify-center gap-1 sm:gap-1.5 ${activeTab === tab.id ? 'text-white' : 'text-slate-400 hover:text-slate-600'}`}
                                        >
                                            {activeTab === tab.id && (
                                                <motion.div
                                                    layoutId="activeTabTravel"
                                                    className="absolute inset-0 bg-gradient-to-r from-[#2076C7] to-[#1CADA3] rounded-xl sm:rounded-full -z-10 shadow-sm"
                                                    transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
                                                />
                                            )}
                                            <tab.icon size={16} className="sm:size-[14px] transition-all duration-300" />
                                            <span className="leading-none">{tab.label}</span>
                                        </button>
                                    ))}
                                </div>
                            </div>
                        </div>
                    </motion.div>
                ) : (
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="text-center mb-10">
                        <span className="inline-flex items-center gap-2 text-[#2076C7] font-black tracking-widest uppercase text-xs mb-4">
                            <IconShieldCheck size={14} />
                            Travel Insurance
                        </span>
                        <h2 className="text-2xl md:text-4xl font-extrabold mb-4 md:mb-6 bg-linear-to-r from-[#2076C7] to-[#1CADA3] bg-clip-text text-transparent drop-shadow-sm tracking-tight leading-tight">
                            Tailored Travel Insurance Plans
                        </h2>
                        <p className="text-gray-600 max-w-2xl mx-auto font-medium text-sm md:text-lg leading-relaxed">
                            Choose the perfect coverage designed for your specific travel needs, whether it&apos;s a quick vacation or a year abroad.
                        </p>
                    </motion.div>
                )}

                <AnimatePresence mode="wait">
                    {activeTab === 'plans' && (
                        <motion.div
                            key="plans"
                            initial={{ opacity: 0, x: -20 }}
                            animate={{ opacity: 1, x: 0 }}
                            exit={{ opacity: 0, x: 20 }}
                            transition={{ duration: 0.3 }}>
                            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-16 px-2">
                                {travelInsurancePlans.map((plan, idx) => {
                                    const Icon = getPlanIcon(plan.title);

                                    return (
                                        <motion.div
                                            key={idx}
                                            initial={{ opacity: 0, scale: 0.95 }}
                                            whileInView={{ opacity: 1, scale: 1 }}
                                            viewport={{ once: true }}
                                            transition={{ delay: idx * 0.1 }}
                                            className="relative group h-full"
                                        >
                                            <div className="h-full bg-white rounded-[2rem] md:rounded-[2.5rem] border border-slate-100 p-6 md:p-8 hover:border-[#1CADA3]/50 transition-all duration-500 shadow-md hover:shadow-2xl flex flex-col items-center text-center">
                                                {plan.popular && (
                                                    <div className="absolute -top-4 left-1/2 -translate-x-1/2 bg-gradient-to-r from-blue-400 to-[#2076C7] text-white text-[10px] font-black uppercase tracking-[0.2em] px-6 py-2 rounded-full shadow-lg z-20">
                                                        Most Popular
                                                    </div>
                                                )}
                                                
                                                <div className="w-16 h-16 rounded-[1.5rem] bg-slate-50 flex items-center justify-center text-[#2076C7] shadow-inner mb-6 group-hover:scale-110 group-hover:bg-[#2076C7] group-hover:text-white transition-all duration-500">
                                                    <Icon size={32} stroke={2} />
                                                </div>

                                                <h3 className="text-xl font-extrabold text-slate-800 mb-2">{plan.title}</h3>
                                                <p className="text-[#1CADA3] text-[10px] font-black uppercase tracking-widest mb-4">{plan.tagline}</p>
                                                <p className="text-slate-500 text-sm font-medium leading-relaxed mb-8 flex-grow">
                                                    {plan.desc}
                                                </p>

                                                <div className="w-full flex flex-col items-center gap-6 mt-auto">
                                                    <div className="flex items-baseline gap-1">
                                                        <span className="text-3xl font-black text-[#2076C7]">{plan.price}</span>
                                                        <span className="text-sm text-slate-400 font-bold">/{plan.duration}</span>
                                                    </div>

                                                    <ul className="w-full space-y-3 mb-8">
                                                        {plan.features.map((feature, i) => (
                                                            <li key={i} className="flex items-start gap-3 text-[13px] text-slate-600 font-medium text-left">
                                                                <IconCheck size={16} className="text-[#1CADA3] shrink-0 mt-0.5" strokeWidth={3} />
                                                                {feature}
                                                            </li>
                                                        ))}
                                                    </ul>

                                                    <button
                                                        onClick={() => openApplyNow(plan.title, isDashboard)}
                                                        className="w-full py-3.5 md:py-4 rounded-2xl font-black uppercase tracking-widest textxs md:text-xs shadow-lg transition-all duration-300 flex items-center justify-center gap-2 bg-gradient-to-r from-[#2076C7] to-[#1CADA3] text-white hover:shadow-xl hover:-translate-y-1 active:scale-95"
                                                    >
                                                        Apply Now
                                                    </button>
                                                </div>
                                            </div>
                                        </motion.div>
                                    );
                                })}
                            </div>

                            {/* Comparison Provider Table */}
                            <motion.div
                                initial={{ opacity: 0, y: 30 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                className="mb-12"
                            >
                                <div className="text-center mb-8">
                                    <h3 className="text-2xl font-extrabold text-slate-800 mb-2 tracking-tight">Compare Top Insurance Providers</h3>
                                    <div className="w-20 h-1 bg-gradient-to-r from-[#2076C7] to-[#1CADA3] mx-auto rounded-full opacity-30" />
                                </div>

                                <div className="overflow-x-auto bg-white rounded-[2rem] md:rounded-[2.5rem] border border-slate-100 shadow-2xl relative">
                                    <table className="w-full min-w-[900px] border-collapse">
                                        <thead>
                                            <tr className="bg-slate-50/50">
                                                <th className="p-5 md:p-8 text-left text-[10px] font-black uppercase tracking-widest text-slate-400">Insurer</th>
                                                <th className="p-5 md:p-8 text-center text-[10px] font-black uppercase tracking-widest text-slate-400 border-x border-slate-100/50">Claim Ratio</th>
                                                <th className="p-5 md:p-8 text-center text-[10px] font-black uppercase tracking-widest text-slate-400 border-r border-slate-100/50">Network</th>
                                                <th className="p-5 md:p-8 text-left text-[10px] font-black uppercase tracking-widest text-slate-400">Key Features</th>
                                                <th className="p-5 md:p-8 text-center text-[10px] font-black uppercase tracking-widest text-slate-400 border-l border-slate-100/50">Price</th>
                                                <th className="p-5 md:p-8 text-center text-[10px] font-black uppercase tracking-widest text-slate-400">Action</th>
                                            </tr>
                                        </thead>
                                        <tbody className="divide-y divide-slate-50">
                                            {providers.map((p, idx) => {
                                                const planObj = { title: p.name, price: p.price }; // Helper for handlers

                                                return (
                                                    <tr key={idx} className="hover:bg-slate-50/80 transition-colors group">
                                                        <td className="p-5 md:p-8">
                                                            <div className="flex items-center gap-4">
                                                                <div className={`w-12 h-12 md:w-14 md:h-14 rounded-xl md:rounded-2xl bg-gradient-to-br ${p.color} text-white flex items-center justify-center font-black text-lg md:text-xl shadow-lg group-hover:scale-110 transition-transform`}>
                                                                    {p.name.charAt(0)}
                                                                </div>
                                                                <span className="font-extrabold text-slate-800 text-base md:text-lg tracking-tight">{p.name}</span>
                                                            </div>
                                                        </td>
                                                        <td className="p-5 md:p-8 text-center">
                                                            <div className="inline-block px-4 py-1.5 md:px-5 md:py-2 bg-emerald-50 text-emerald-600 font-black text-xs md:text-sm rounded-[1rem] border border-emerald-100 shadow-sm">
                                                                {p.ratio}
                                                            </div>
                                                        </td>
                                                        <td className="p-5 md:p-8 text-center font-black text-slate-700 text-sm md:text-base">{p.network}</td>
                                                        <td className="p-5 md:p-8">
                                                            <div className="flex flex-col gap-2">
                                                                {p.features.map((f, i) => (
                                                                    <div key={i} className="flex items-center gap-2 text-xs font-bold text-slate-500">
                                                                        <div className="w-4 h-4 rounded-full bg-teal-50 flex items-center justify-center">
                                                                            <IconCheck size={10} className="text-[#1CADA3]" strokeWidth={4} />
                                                                        </div>
                                                                        {f}
                                                                    </div>
                                                                ))}
                                                            </div>
                                                        </td>
                                                        <td className="p-5 md:p-8 text-center">
                                                            <div className="text-xl md:text-2xl font-black text-slate-900 tracking-tight">{p.price}</div>
                                                            <div className="text-[9px] md:text-[10px] text-slate-400 font-black uppercase tracking-widest leading-none">per day</div>
                                                        </td>
                                                        <td className="p-5 md:p-8 text-center">
                                                            <div className="flex items-center justify-center gap-3">
                                                                <button 
                                                                    onClick={() => openApplyNow(planObj.title, isDashboard)}
                                                                    className="w-10 h-10 rounded-xl transition-all duration-300 flex items-center justify-center shadow-md bg-[#2076C7] text-white hover:bg-[#1CADA3] hover:rotate-[360deg]"
                                                                    aria-label="Apply Now"
                                                                >
                                                                    Go
                                                                </button>
                                                            </div>
                                                        </td>
                                                    </tr>
                                                );
                                            })}
                                        </tbody>
                                    </table>
                                </div>
                            </motion.div>
                        </motion.div>
                    )}

                    {activeTab === 'details' && (
                        <motion.div
                            key="details"
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -20 }}
                            transition={{ duration: 0.4 }}
                            className="space-y-12 mb-16"
                        >
                            {isDashboard ? (
                                <>
                                    {/* --- ZERO-STATE DASHBOARD HERO SECTION --- */}
                                    <div className="grid grid-cols-1 gap-8">
                                        
                                        {/* Digital Policy Card - Handled Dynamic State */}
                                        <div className="relative group cursor-pointer">
                                            <div className="absolute inset-0 bg-slate-100 rounded-[2rem] md:rounded-[3rem] blur-2xl opacity-10" />
                                            <div className={`relative rounded-[2rem] md:rounded-[3rem] p-6 md:p-10 text-white shadow-2xl overflow-hidden transition-all duration-700 ${hasActivePolicy ? 'bg-gradient-to-br from-[#2076C7] via-[#1E90C0] to-[#1CADA3]' : 'bg-slate-50 border-2 border-dashed border-slate-200 text-slate-400'}`}>
                                                
                                                {hasActivePolicy ? (
                                                    <div className="relative z-10 flex flex-col h-full">
                                                        <IconWorld className="absolute -right-20 -bottom-20 w-80 h-80 text-white/5 rotate-12" />
                                                        
                                                        {/* --- EXIT DEMO BUTTON (TOP RIGHT) --- */}
                                                        <button 
                                                            type="button"
                                                            onClick={(e) => {
                                                                e.stopPropagation();
                                                                setHasActivePolicy(false);
                                                                setHasActiveClaim(false);
                                                                toast.error("Demo Mode Deactivated");
                                                            }}
                                                            className="absolute top-0 right-0 px-4 py-2 bg-rose-500/20 hover:bg-rose-500 text-white border border-white/20 rounded-bl-2xl rounded-tr-[2rem] md:rounded-tr-[3rem] font-black text-[10px] uppercase tracking-widest transition-all z-30 flex items-center gap-2"
                                                        >
                                                            Exit Demo Mode
                                                        </button>

                                                        <div className="flex justify-between items-start mb-12">
                                                            <div>
                                                                <span className="px-4 py-1.5 bg-white/20 backdrop-blur-md rounded-full text-[10px] font-black uppercase tracking-[0.2em] mb-4 inline-block border border-white/30 text-white/90">
                                                                    Active Policy
                                                                </span>
                                                                <h3 className="text-2xl md:text-3xl font-black tracking-tight leading-tight mb-2">Infinity Platinum Plan</h3>
                                                                <p className="text-white/70 font-bold text-sm tracking-widest uppercase flex items-center gap-2">
                                                                    <IconMapPin size={14} /> Worldwide (Excl. USA/Canada)
                                                                </p>
                                                            </div>
                                                            <div className="p-4 bg-white/20 backdrop-blur-md rounded-2xl border border-white/30">
                                                                <IconShieldCheck size={32} />
                                                            </div>
                                                        </div>

                                                        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mt-auto">
                                                            <div>
                                                                <p className="text-[9px] md:text-[10px] font-black text-white/50 uppercase tracking-widest mb-1">Policy Number</p>
                                                                <p className="text-base md:text-lg font-black tracking-tight">IA-TRAVEL-2024-8832</p>
                                                            </div>
                                                            <div>
                                                                <p className="text-[9px] md:text-[10px] font-black text-white/50 uppercase tracking-widest mb-1">Valid Till</p>
                                                                <p className="text-base md:text-lg font-black tracking-tight">31 May, 2026</p>
                                                            </div>
                                                            <div>
                                                                <p className="text-[9px] md:text-[10px] font-black text-white/50 uppercase tracking-widest mb-1">Sum Insured</p>
                                                                <p className="text-base md:text-lg font-black tracking-tight">USD 500,000</p>
                                                            </div>
                                                            <div className="flex items-end md:justify-end gap-3 flex-wrap">
                                                                <button className="flex items-center gap-2 px-6 py-3 bg-white text-[#2076C7] rounded-xl font-black text-xs uppercase tracking-widest hover:bg-slate-50 transition-colors shadow-lg">
                                                                    <IconDownload size={14} /> Download
                                                                </button>
                                                            </div>
                                                        </div>
                                                    </div>
                                                ) : (
                                                    <div className="relative z-10 flex flex-col items-center justify-center min-h-[300px] text-center p-8">
                                                        <div className="w-20 h-20 rounded-full bg-slate-100 flex items-center justify-center text-slate-300 mb-6 border-2 border-slate-200">
                                                            <IconShieldCheck size={40} />
                                                        </div>
                                                        <h3 className="text-2xl font-black text-slate-800 mb-2">No Active Policy Found</h3>
                                                        <p className="text-slate-400 font-medium mb-8 max-w-sm">Protect your travel journey today. Choose from our top-rated plans and get instant coverage.</p>
                                                        <div className="flex flex-col sm:flex-row gap-4">
                                                            <button 
                                                                onClick={() => setActiveTab('plans')}
                                                                className="px-8 py-3 bg-[#2076C7] text-white rounded-xl font-black text-xs uppercase tracking-widest shadow-lg hover:shadow-xl hover:-translate-y-1 transition-all"
                                                            >
                                                                Browse Plans
                                                            </button>
                                                            <button 
                                                                onClick={() => {
                                                                    setHasActivePolicy(true);
                                                                    setHasActiveClaim(true);
                                                                    toast.success("Demo Mode Activated: This is how your live dashboard will look!");
                                                                }}
                                                                className="px-8 py-3 bg-white text-[#2076C7] border-2 border-[#2076C7] rounded-xl font-black text-xs uppercase tracking-widest shadow-md hover:bg-blue-50 transition-all flex items-center gap-2"
                                                            >
                                                                <IconLoader size={16} /> View Dashboard Demo
                                                            </button>
                                                        </div>
                                                    </div>
                                                )}
                                            </div>
                                        </div>
                                    </div>

                                    {/* --- NEW DETAILED DASHBOARD VIEW --- */}
                                    {hasActivePolicy && <DashboardView />}

                                    {/* --- ZERO-STATE CLAIMS SECTION --- */}
                                    <div className="grid grid-cols-1 gap-8 pt-4">
                                        
                                        {/* Claim Tracker - Zero State */}
                                        <div className="bg-slate-50/50 rounded-[2rem] md:rounded-[3rem] border border-slate-100 p-6 md:p-8 flex flex-col items-center justify-center text-center">
                                            {hasActiveClaim ? (
                                                <div className="w-full">
                                                    <div className="flex justify-between items-center mb-6 md:mb-8">
                                                        <h3 className="text-lg md:text-xl font-black text-slate-800 flex items-center gap-3">
                                                            <IconHistory size={20} className="text-[#2076C7] md:w-[24px] md:h-[24px]" /> Active Claim Tracker
                                                        </h3>
                                                        <span className="text-[10px] font-black uppercase tracking-widest bg-blue-100 text-[#2076C7] px-4 py-1.5 rounded-full">
                                                            Claim ID: #77283
                                                        </span>
                                                    </div>
                                                    <div className="flex justify-between items-start relative px-4">
                                                        <div className="absolute top-5 left-10 right-10 h-1 bg-slate-200 rounded-full -z-0" />
                                                        {[1,2,3].map((step, i) => (
                                                            <div key={i} className="relative z-10 flex flex-col items-center text-center">
                                                                <div className="w-10 h-10 rounded-full flex items-center justify-center border-2 bg-white border-slate-200 text-slate-300">
                                                                    <span className="font-black text-xs">{i+1}</span>
                                                                </div>
                                                                <p className="text-xs font-black uppercase tracking-widest mb-1 text-slate-400">Step {i+1}</p>
                                                            </div>
                                                        ))}
                                                    </div>
                                                </div>
                                            ) : (
                                                <div className="py-12">
                                                    <div className="w-16 h-16 bg-white rounded-full flex items-center justify-center text-slate-200 mb-6 shadow-inner">
                                                        <IconHistory size={32} />
                                                    </div>
                                                    <h3 className="text-xl font-black text-slate-800 mb-2">No Active Claims</h3>
                                                    <p className="text-sm font-medium text-slate-400 max-w-xs">You have no claims in process at the moment. All filed claims will appear here.</p>
                                                </div>
                                            )}
                                        </div>

                                    </div>
                                </>
                            ) : (
                                <BenefitsAndEligibility isDashboard={true} />
                            )}
                        </motion.div>
                    )}

                    {activeTab === 'calculator' && (
                        <motion.div
                            key="calculator"
                            initial={{ opacity: 0, x: -20 }}
                            animate={{ opacity: 1, x: 0 }}
                            exit={{ opacity: 0, x: 20 }}
                            transition={{ duration: 0.3 }}
                        >
                            <CalculatorAndProcess isDashboard={true} onShowPlans={() => setActiveTab('plans')} />
                        </motion.div>
                    )}
                </AnimatePresence>
            </div>
        </section>
    );
}