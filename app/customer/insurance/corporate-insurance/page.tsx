"use client";

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
    IconCalculator,
    IconHeartbeat,
    IconHelmet,
    IconFileText,
} from '@tabler/icons-react';
import CorporateInsuranceSection from './components/CorporateInsuranceSection';
import CorporateCalculator from './components/CorporateCalculator';
import CorporateActiveDashboard from './components/CorporateActiveDashboard';

export default function CorporateInsuranceDashboard() {
    const [activeTab, setActiveTab] = useState<'dashboard' | 'medical' | 'accident-wc' | 'calculator'>('dashboard');

    return (
        <div className="flex-1 p-4 sm:p-6 bg-[#F8FAFC] min-h-screen font-sans">
            {/* --- NAVIGATION HEADER --- */}
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
                            ) : activeTab === 'medical' ? (
                                <IconHeartbeat size={24} />
                            ) : (
                                <IconHelmet size={24} />
                            )}
                        </div>

                        <div>
                            <div className="flex flex-col sm:flex-row items-center gap-3 mb-1">
                                <h2 className="text-xl sm:text-2xl font-bold text-slate-800 tracking-tight leading-tight">
                                    {activeTab === 'dashboard'
                                        ? "My Corporate Policies"
                                        : activeTab === 'medical'
                                        ? "Group Medical Insurance"
                                        : activeTab === 'accident-wc'
                                        ? "Liability & Accident Insurance"
                                        : "Corporate Quote Builder"}
                                </h2>
                                {/* <span className="px-2.5 py-1 bg-emerald-100 text-emerald-700 text-[10px] font-black rounded-full border border-emerald-200 whitespace-nowrap uppercase tracking-wider">
                                    {activeTab === 'calculator' }
                                </span> */}
                            </div>
                            <p className="text-sm text-slate-500 font-medium flex items-center justify-center sm:justify-start gap-2">
                                <span>
                                    {activeTab === 'calculator'
                                        ? "Generate official group insurance quotes instantly"
                                        : activeTab === 'medical'
                                        ? "Comprehensive health benefit plans for employees"
                                        : "Statutory & accidental coverage for business continuity"}
                                </span>
                            </p>
                        </div>
                    </div>

                    {/* Tab Buttons - Refined Grid Switcher for Mobile, Pill for Desktop */}
                    <div className="w-full sm:w-auto mt-4 sm:mt-0">
                        <div className="grid grid-cols-2 sm:flex sm:flex-row p-1.5 bg-slate-100/80 backdrop-blur-sm rounded-2xl sm:rounded-full gap-1.5 relative shadow-inner border border-slate-200/50">
                            {[
                                { id: 'dashboard', label: 'Dashboard', icon: IconFileText },
                                { id: 'medical', label: 'Medical', icon: IconHeartbeat },
                                { id: 'accident-wc', label: 'Liability', icon: IconHelmet },
                                { id: 'calculator', label: 'Calculator', icon: IconCalculator },
                            ].map((tab) => (
                                <button
                                    key={tab.id}
                                    onClick={() => setActiveTab(tab.id as any)}
                                    className={`relative px-3 md:px-5 py-3 sm:py-2 rounded-xl sm:rounded-full text-[10px] md:text-xs font-bold uppercase tracking-wider transition-all duration-300 z-10 flex flex-col sm:flex-row items-center justify-center gap-1 sm:gap-1.5 ${activeTab === tab.id ? 'text-white' : 'text-slate-400 hover:text-slate-600'}`}
                                >
                                    {activeTab === tab.id && (
                                        <motion.div
                                            layoutId="activeTabCorp"
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

            {/* --- MAIN CONTENT --- */}
            <div className="relative min-h-[500px]">
                <AnimatePresence mode="wait">
                    {activeTab === 'dashboard' ? (
                        <motion.div
                            key="dashboard"
                            initial={{ opacity: 0, scale: 0.98 }}
                            animate={{ opacity: 1, scale: 1 }}
                            exit={{ opacity: 0, scale: 0.98 }}
                            className="w-full"
                        >
                            <CorporateActiveDashboard />
                        </motion.div>
                    ) : activeTab === 'calculator' ? (
                        <motion.div
                            key="calculator-view"
                            initial={{ opacity: 0, scale: 0.98 }}
                            animate={{ opacity: 1, scale: 1 }}
                            exit={{ opacity: 0, scale: 0.98 }}
                            className="w-full"
                        >
                            <div className="bg-white rounded-[2rem] border border-slate-100 shadow-sm overflow-hidden">
                                <div className="p-4 sm:p-6 md:p-8">
                                    <CorporateCalculator />
                                </div>
                            </div>
                        </motion.div>
                    ) : (
                        <motion.div
                            key="grid"
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            className="w-full"
                        >
                            <CorporateInsuranceSection activeTab={activeTab as any} />
                        </motion.div>
                    )}
                </AnimatePresence>
            </div>

            {/* Subtle footer disclaimer area */}
            <div className="mt-12">
                <div className="bg-slate-50 border border-slate-100 rounded-2xl p-6 shadow-sm">
                    <p className="text-sm text-slate-500 text-center leading-relaxed font-medium">
                        <strong className="text-slate-800 font-bold tracking-tight underline decoration-[#1CADA3]/30">Disclaimer:</strong>{" "}
                        Insurance is a subject matter of solicitation. Policy issuance is subject to the underwriting guidelines and discretion of the respective insurance companies. Benefits and premiums are indicative.
                    </p>
                </div>
            </div>
        </div>
    );
}