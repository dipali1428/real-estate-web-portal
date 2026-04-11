'use client';

import { motion, AnimatePresence } from 'framer-motion';
import { useState } from 'react';
import { IconDownload, IconFileText, IconCalculator, IconShieldCheck,
    IconHistory, IconInfoCircle, IconMapPin, IconStethoscope, IconId, IconVaccine
} from '@tabler/icons-react';
import { Beef, Milk, Calendar, AlertCircle } from 'lucide-react';

import CoverageTypes from '@/app/products/cattle-insurance/components/CoverageTypes';
// import { coverageTypes } from '@/app/products/cattle-insurance/components/CoverageTypes';
import CattleCalculator from '@/app/products/cattle-insurance/components/CattleCalculator';


const coverageBenefits = [
    { icon: IconStethoscope, title: 'Medical Cover', limit: '₹0', status: 'Inactive', color: 'bg-blue-50/50 text-[#2076C7]' },
    { icon: Beef, title: 'Death Benefit', limit: '₹0', status: 'Inactive', color: 'bg-rose-50/50 text-rose-500' },
    { icon: Milk, title: 'Loss of Yield', limit: '₹0', status: 'Inactive', color: 'bg-teal-50/50 text-[#1CADA3]' },
    { icon: IconShieldCheck, title: 'Transit Risk', limit: '--', status: 'Inactive', color: 'bg-blue-50/50 text-blue-600' },
];

const cattleDashboardDetails = [
    { label: "Animal Type", value: "Cow (Crossbreed)", icon: Beef },
    { label: "Breed", value: "Jersey/Holstein", icon: IconInfoCircle },
    { label: "Tag ID", value: "INF-CTL-8821", icon: IconId },
    { label: "Age", value: "4.5 Years", icon: Calendar },
    { label: "Last Vaccination", value: "20 Feb, 2024", icon: IconVaccine },
    { label: "Next Deworming", value: "20 May, 2024", icon: IconHistory },
];

export default function CattleInsuranceSection({ isDashboard = false }: { isDashboard?: boolean }) {
    const [activeTab, setActiveTab] = useState<'plans' | 'details' | 'calculator'>('plans');
    const [hasActivePolicy, setHasActivePolicy] = useState(false);
    const [hasActiveClaim, setHasActiveClaim] = useState(false);

    return (
        <section className={isDashboard ? 'pt-4 relative overflow-hidden' : 'py-12 bg-white relative overflow-hidden'}>
            <div className={isDashboard ? 'leading-relaxed' : 'max-w-[1440px] mx-auto px-4 md:px-6 leading-relaxed'}>
                
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
                                        <Beef size={24} />
                                    )}
                                </div>

                                <div>
                                    <div className="flex flex-col sm:flex-row items-center gap-3 mb-1">
                                        <h2 className="text-xl sm:text-2xl font-bold text-slate-800 tracking-tight leading-tight">
                                            {activeTab === 'plans' 
                                                ? 'Cattle Insurance' 
                                                : activeTab === 'details' 
                                                ? 'Insurance Dashboard' 
                                                : 'Premium Calculator'}
                                        </h2>
                                    </div>
                                    <p className="text-xs text-slate-500 font-medium flex items-center justify-center sm:justify-start gap-2">
                                        <span>
                                            {activeTab === 'plans' 
                                                ? 'Choose the perfect coverage designed for your specific livestock needs' 
                                                : activeTab === 'details' 
                                                ? 'Manage your active cattle policies and claims' 
                                                : 'Estimate your premium with real-time subsidy adjustments'}
                                        </span>
                                    </p>
                                </div>
                            </div>

                            <div className="w-full sm:w-auto mt-4 sm:mt-0">
                                <div className="flex flex-wrap justify-center sm:flex-nowrap sm:flex-row p-1.5 bg-slate-100/80 backdrop-blur-sm rounded-2xl sm:rounded-full gap-1.5 relative shadow-inner border border-slate-200/50">
                                    {[
                                        { id: 'plans', label: 'Plans', icon: Beef },
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
                                                    layoutId="activeTabCattle"
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
                        className="text-center mb-10"
                    >
                         <span className="inline-flex items-center gap-2 text-[#2076C7] font-black tracking-widest uppercase text-xs mb-4">
                            <IconShieldCheck size={14} />
                            Cattle Insurance
                        </span>
                        <h2 className="text-2xl md:text-4xl font-extrabold mb-4 md:mb-6 bg-linear-to-r from-[#2076C7] to-[#1CADA3] bg-clip-text text-transparent drop-shadow-sm tracking-tight leading-tight">
                            {!isDashboard || activeTab === 'plans' 
                                ? 'Comprehensive Cattle Insurance Plans' 
                                : activeTab === 'details' 
                                ? 'Cattle Insurance Dashboard' 
                                : 'Calculate Your Premium'}
                        </h2>
                        <p className="text-gray-600 max-w-2xl mx-auto font-medium text-sm md:text-lg leading-relaxed">
                            {!isDashboard || activeTab === 'plans'
                                ? "Choose the perfect coverage designed for your specific livestock needs, backed by IRDA-approved insurers."
                                : activeTab === 'details'
                                ? "Manage your active cattle policies, track digital claims, and protect your livelihood from your command center."
                                : "Easily estimate your premium for cows, buffaloes, and more with real-time subsidy adjustments."
                            }
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
                            transition={{ duration: 0.3 }}
                        >
                            <div className="mx-0">
                                <CoverageTypes isDashboard={isDashboard} />
                            </div>
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
                                <>
                                    {/* --- DASHBOARD HERO SECTION --- */}
                                    <div className="mb-12">
                                        <div className="relative group cursor-pointer lg:min-h-[280px]">
                                            <div className="absolute inset-0 bg-slate-100 rounded-[2rem] md:rounded-[3rem] blur-2xl opacity-10" />
                                            <div className={`relative rounded-[2rem] md:rounded-[3rem] p-6 sm:p-8 md:p-10 text-white shadow-2xl overflow-hidden transition-all duration-700 h-full ${hasActivePolicy ? 'bg-gradient-to-br from-[#2076C7] via-[#1E90C0] to-[#1CADA3]' : 'bg-slate-50 border-2 border-dashed border-slate-200 text-slate-400'}`}>
                                                
                                                {hasActivePolicy ? (
                                                    <div className="relative z-10 flex flex-col h-full min-h-[200px]">
                                                        <IconShieldCheck className="absolute -right-20 -bottom-20 w-80 h-80 text-white/5 rotate-12" />
                                                        <div className="flex flex-col sm:flex-row justify-between items-start gap-6 mb-8">
                                                            <div>
                                                                <span className="px-4 py-1.5 bg-white/20 backdrop-blur-md rounded-full text-[10px] font-black uppercase tracking-[0.2em] mb-4 inline-block border border-white/30 text-white/90">
                                                                    Active Policy
                                                                </span>
                                                                <h3 className="text-xl md:text-3xl font-black tracking-tight leading-tight mb-2">Comprehensive Dairy Protection</h3>
                                                                <p className="text-white/70 font-bold text-xs md:text-sm tracking-widest uppercase flex items-center gap-2">
                                                                    <IconMapPin size={14} /> Gujarat Farm Region
                                                                </p>
                                                            </div>
                                                            <div className="p-3 md:p-4 bg-white/20 backdrop-blur-md rounded-2xl border border-white/30 truncate max-w-[200px]">
                                                                <div className="flex items-center gap-3">
                                                                    <Beef size={20} className="md:w-[24px] md:h-[24px]" />
                                                                    <span className="text-[10px] md:text-xs font-black uppercase tracking-widest">Jersey/Holstein</span>
                                                                </div>
                                                            </div>
                                                        </div>

                                                        <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8 mt-auto">
                                                            <div>
                                                                <p className="text-[9px] md:text-[10px] font-black text-white/50 uppercase tracking-widest mb-1">Policy Number</p>
                                                                <p className="text-sm md:text-lg font-black tracking-tight">IA-CATTLE-8821-X</p>
                                                            </div>
                                                            <div>
                                                                <p className="text-[9px] md:text-[10px] font-black text-white/50 uppercase tracking-widest mb-1">Applied On</p>
                                                                <p className="text-sm md:text-lg font-black tracking-tight">15 Jan, 2024</p>
                                                            </div>
                                                            <div>
                                                                <p className="text-[9px] md:text-[10px] font-black text-white/50 uppercase tracking-widest mb-1">Sum Insured</p>
                                                                <p className="text-sm md:text-lg font-black tracking-tight">₹1,50,000</p>
                                                            </div>
                                                            <div className="flex items-end lg:justify-end mt-4 lg:mt-0">
                                                                <button className="flex items-center gap-2 px-5 py-2.5 md:px-6 md:py-3 bg-white text-[#2076C7] rounded-xl font-black text-[10px] md:text-xs uppercase tracking-widest hover:bg-slate-50 transition-colors shadow-lg w-full md:w-auto justify-center">
                                                                    <IconDownload size={14} /> Download PDF
                                                                </button>
                                                            </div>
                                                        </div>
                                                    </div>
                                                ) : (
                                                    <div className="relative z-10 flex flex-col items-center justify-center min-h-[200px] text-center">
                                                        <div className="w-16 h-16 rounded-full bg-slate-100 flex items-center justify-center text-slate-300 mb-4 border-2 border-slate-200">
                                                            <IconShieldCheck size={32} />
                                                        </div>
                                                        <h3 className="text-xl font-black text-slate-800 mb-1">No Active Policy Found</h3>
                                                        <p className="text-slate-400 text-sm font-medium mb-6 max-w-sm">Secure your livestock today. Choose from our government-approved plans.</p>
                                                        <button 
                                                            onClick={() => setActiveTab('plans')}
                                                            className="px-8 py-3 bg-[#2076C7] text-white rounded-xl font-black text-[10px] uppercase tracking-widest shadow-lg hover:shadow-xl hover:-translate-y-1 transition-all"
                                                        >
                                                            Browse Plans
                                                        </button>
                                                    </div>
                                                )}
                                            </div>
                                        </div>
                                    </div>

                                    {/* --- TABULAR DATA SECTION --- */}
                                    <div className="bg-white rounded-[2rem] md:rounded-[3rem] border border-slate-100 shadow-xl overflow-hidden mb-12">
                                        <div className="p-6 md:p-8 border-b border-slate-50 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 bg-slate-50/30">
                                            <h3 className="text-lg md:text-xl font-black text-slate-800 flex items-center gap-3">
                                                <IconId size={20} className="md:w-[24px] md:h-[24px] text-[#2076C7]" />
                                                Detailed Policy Information
                                            </h3>
                                            {hasActivePolicy && (
                                                <div className="flex items-center gap-2 bg-teal-50 text-[#1CADA3] px-4 py-2 rounded-xl text-[10px] font-black uppercase tracking-widest border border-[#1CADA3]/10">
                                                    <span className="w-2 h-2 rounded-full bg-[#1CADA3] animate-pulse" />
                                                    All Details Verified
                                                </div>
                                            )}
                                        </div>
                                        <div className="overflow-x-auto">
                                            <table className="w-full text-left border-collapse min-w-[800px]">
                                                <thead>
                                                    <tr className="bg-slate-50/50">
                                                        <th className="px-6 md:px-8 py-4 md:py-5 text-[9px] md:text-[10px] font-black text-slate-400 uppercase tracking-widest border-b border-slate-100">Animal Information</th>
                                                        <th className="px-6 md:px-8 py-4 md:py-5 text-[9px] md:text-[10px] font-black text-slate-400 uppercase tracking-widest border-b border-slate-100">Identification</th>
                                                        <th className="px-6 md:px-8 py-4 md:py-5 text-[9px] md:text-[10px] font-black text-slate-400 uppercase tracking-widest border-b border-slate-100">Applied Date</th>
                                                        <th className="px-6 md:px-8 py-4 md:py-5 text-[9px] md:text-[10px] font-black text-slate-400 uppercase tracking-widest border-b border-slate-100">Sum Insured</th>
                                                        <th className="px-6 md:px-8 py-4 md:py-5 text-[9px] md:text-[10px] font-black text-slate-400 uppercase tracking-widest border-b border-slate-100">Current Status</th>
                                                        <th className="px-6 md:px-8 py-4 md:py-5 text-[9px] md:text-[10px] font-black text-slate-400 uppercase tracking-widest border-b border-slate-100 text-right">Reminder</th>
                                                    </tr>
                                                </thead>
                                                <tbody>
                                                    <tr className="group hover:bg-slate-50 transition-colors duration-500">
                                                        <td className="px-6 md:px-8 py-5 md:py-6 border-b border-slate-100">
                                                            <div className="font-black text-slate-800 text-sm md:text-base">{hasActivePolicy ? "Cow (Crossbreed)" : "No Animal Registered"}</div>
                                                            <div className="text-[9px] md:text-[10px] font-bold text-slate-400 uppercase tracking-widest mt-1">Breed: {hasActivePolicy ? "Jersey/Holstein" : "--"}</div>
                                                        </td>
                                                        <td className="px-6 md:px-8 py-5 md:py-6 border-b border-slate-100">
                                                            <div className="font-black text-slate-800 text-sm md:text-base">{hasActivePolicy ? "INF-CTL-8821" : "Not Assigned"}</div>
                                                            <div className="text-[9px] md:text-[10px] font-bold text-slate-400 uppercase tracking-widest mt-1">Age: {hasActivePolicy ? "4.5 Years" : "0 Years"}</div>
                                                        </td>
                                                        <td className="px-6 md:px-8 py-5 md:py-6 border-b border-slate-100 font-bold text-slate-600 text-sm md:text-base">{hasActivePolicy ? "15 Jan, 2024" : "No Active Policy"}</td>
                                                        <td className="px-6 md:px-8 py-5 md:py-6 border-b border-slate-100 font-black text-[#2076C7] text-sm md:text-base">{hasActivePolicy ? "₹1,50,000" : "₹0"}</td>
                                                        <td className="px-6 md:px-8 py-5 md:py-6 border-b border-slate-100">
                                                            <span className={`px-3 md:px-4 py-1 md:py-1.5 rounded-full text-[9px] md:text-[10px] font-black uppercase tracking-widest ${hasActivePolicy ? 'bg-teal-50 text-[#1CADA3] border border-[#1CADA3]/20' : 'bg-slate-100 text-slate-400 border border-slate-200'}`}>
                                                                {hasActivePolicy ? 'Active' : 'Not Found'}
                                                            </span>
                                                        </td>
                                                        <td className="px-6 md:px-8 py-5 md:py-6 border-b border-slate-100 text-right text-[9px] md:text-[10px] font-black text-rose-500 uppercase tracking-widest">
                                                            {hasActivePolicy ? (
                                                                <div className="flex items-center justify-end gap-2">
                                                                    <AlertCircle size={12} className="md:w-[14px] md:h-[14px]" />
                                                                    Upcoming: 20 May (Deworming)
                                                                </div>
                                                            ) : '--'}
                                                        </td>
                                                    </tr>
                                                </tbody>
                                            </table>
                                        </div>
                                    </div>

                                    {/* --- GRAPHICAL PRESENTATION SECTION --- */}
                                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                                        {/* Coverage Utilization Chart */}
                                        <div className="bg-white rounded-[2rem] md:rounded-[3rem] border border-slate-100 p-6 md:p-8 shadow-xl">
                                            <div className="flex justify-between items-center mb-6 md:mb-8">
                                                <h3 className="text-lg md:text-xl font-black text-slate-800 flex items-center gap-3">
                                                    <IconHistory size={20} className="md:w-[24px] md:h-[24px] text-[#2076C7]" />
                                                    Coverage Status
                                                </h3>
                                                <span className="text-[9px] md:text-[10px] font-black text-slate-400 uppercase tracking-widest">2024 Projections</span>
                                            </div>
                                            
                                            <div className="space-y-8">
                                                {coverageBenefits.map((benefit, i) => (
                                                    <div key={i} className="group">
                                                        <div className="flex justify-between items-end mb-3">
                                                            <div className="flex items-center gap-2">
                                                                <benefit.icon size={18} className={`${benefit.color.split(' ')[1]}`} />
                                                                <span className="text-[10px] font-black text-slate-500 uppercase tracking-widest">{benefit.title}</span>
                                                            </div>
                                                            <span className="text-sm font-black text-slate-800">{hasActivePolicy ? (i === 0 ? 'Applied' : 'Inactive') : '₹0'}</span>
                                                        </div>
                                                        <div className="h-3 bg-slate-50 rounded-full overflow-hidden border border-slate-100 shadow-inner p-[1px]">
                                                            <motion.div 
                                                                initial={{ width: 0 }}
                                                                animate={{ width: hasActivePolicy ? (i === 0 ? '100%' : '5%') : '0%' }}
                                                                transition={{ duration: 1, delay: i * 0.1 }}
                                                                className={`h-full rounded-full bg-linear-to-r ${i === 0 ? 'from-[#2076C7] to-[#1CADA3]' : 'from-slate-200 to-slate-300'} shadow-sm`}
                                                            />
                                                        </div>
                                                    </div>
                                                ))}
                                            </div>
                                            
                                            <div className="mt-8 md:mt-10 p-4 md:p-5 bg-teal-50/50 rounded-2xl border border-teal-100/50 flex items-start gap-3 md:gap-4 transition-all hover:bg-teal-50">
                                                <div className="w-9 h-9 md:w-10 md:h-10 rounded-xl bg-white shadow-sm flex items-center justify-center text-[#1CADA3] shrink-0">
                                                    <IconShieldCheck size={18} className="md:w-[20px] md:h-[20px]" />
                                                </div>
                                                <div>
                                                    <p className="text-[11px] md:text-xs font-black text-slate-700 uppercase tracking-wider mb-1 leading-none">Security Insights</p>
                                                    <p className="text-[9px] md:text-[10px] font-bold text-slate-400 uppercase tracking-widest leading-relaxed">
                                                        {hasActivePolicy 
                                                            ? "Your cattle are currently 100% protected under the Dairy Comprehensive Plan." 
                                                            : "Please activate a plan to see protection insights for your cattle."}
                                                    </p>
                                                </div>
                                            </div>
                                        </div>

                                        {/* Status & Claims Visualizer */}
                                        <div className="bg-slate-50/30 rounded-[2rem] md:rounded-[3rem] border border-slate-100 p-6 md:p-8 flex flex-col items-center justify-center text-center relative overflow-hidden group">
                                            <div className="absolute inset-0 bg-white/50 backdrop-blur-sm opacity-0 group-hover:opacity-100 transition-opacity duration-700 -z-10" />
                                            {hasActiveClaim ? (
                                                <div className="w-full">
                                                    <div className="flex justify-between items-center mb-6 md:mb-8">
                                                        <h3 className="text-lg md:text-xl font-black text-slate-800 flex items-center gap-3">
                                                            <IconHistory size={20} className="md:w-[24px] md:h-[24px] text-[#2076C7]" /> Active Claim Tracker
                                                        </h3>
                                                        <span className="text-[9px] md:text-[10px] font-black uppercase tracking-widest bg-blue-100 text-[#2076C7] px-3 md:px-4 py-1 md:py-1.5 rounded-full">
                                                            Claim ID: #CTL-122
                                                        </span>
                                                    </div>
                                                </div>
                                            ) : (
                                                <div className="py-8 md:py-12 flex flex-col items-center">
                                                    <div className="w-20 h-20 md:w-24 md:h-24 rounded-[2rem] md:rounded-[2.5rem] bg-white flex items-center justify-center text-[#2076C7]/20 mb-6 md:mb-8 shadow-2xl border border-slate-100 group-hover:scale-110 transition-transform duration-700 rotate-[-8deg] group-hover:rotate-0">
                                                        <IconHistory size={40} className="md:w-[48px] md:h-[48px]" />
                                                    </div>
                                                    <h3 className="text-xl md:text-2xl font-black text-slate-800 mb-3 tracking-tight leading-none uppercase">No Claim History</h3>
                                                    <p className="text-slate-400 font-medium max-w-xs leading-relaxed text-xs md:text-sm mb-6 md:mb-8">
                                                        You haven't filed any claims yet. When you do, the graphical lifecycle of each claim will appear here in real-time.
                                                    </p>
                                                    <div className="flex gap-3 md:gap-4">
                                                        <span className="w-2 md:w-3 h-2 md:h-3 rounded-full bg-slate-200 animate-pulse" />
                                                        <span className="w-2 md:w-3 h-2 md:h-3 rounded-full bg-slate-200 animate-pulse delay-100" />
                                                        <span className="w-2 md:w-3 h-2 md:h-3 rounded-full bg-slate-200 animate-pulse delay-200" />
                                                    </div>
                                                </div>
                                            )}
                                        </div>
                                    </div>
                                </>
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
                            <CattleCalculator 
  isDashboard={true} 
  onShowPlans={() => setActiveTab('plans')} 
/>
                        </motion.div>
                    )}
                </AnimatePresence>
            </div>
        </section>
    );
}
