"use client";

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
    IconCalculator,
    IconShieldLock,
    IconFileText,
} from '@tabler/icons-react';
import LoanProtectorSection from './components/LoanProtectorSection';
import { LoanProtectorCalculator } from './components/LoanProtectorCalculator';
import LoanProtectorActiveDashboard from './components/LoanProtectorActiveDashboard';

export default function LoanProtectorDashboard() {
    const [activeTab, setActiveTab] = useState<'dashboard' | 'plans' | 'calculator'>('dashboard');

    const tabs = [
        { id: 'dashboard', label: 'Dashboard', icon: IconFileText },
        { id: 'plans', label: 'Shield Plans', icon: IconShieldLock },
        { id: 'calculator', label: 'Calculator', icon: IconCalculator }
    ];

    return (
        // Full width container for Desktop, no max-w restriction
        <div className="flex-1 w-full p-3 sm:p-5 md:p-8 bg-[#F8FAFC] min-h-screen font-sans overflow-x-hidden">
            
            {/* --- NAVIGATION HEADER --- */}
            <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                className="w-full bg-white rounded-2xl p-4 sm:p-6 mb-8 shadow-sm border border-slate-100/60"
            >
                <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6">
                    
                    {/* LEFT: TITLE & ICON */}
                    <div className="flex flex-col sm:flex-row items-center sm:items-start gap-4 text-center sm:text-left w-full sm:w-auto">
                        <div className="w-12 h-12 rounded-xl bg-gradient-to-r from-[#2076C7] to-[#1CADA3] flex items-center justify-center text-white shadow-lg shrink-0">
                            {activeTab === 'calculator' ? <IconCalculator size={24} /> : <IconShieldLock size={24} />}
                        </div>

                        <div className="min-w-0">
                            <div className="flex flex-col sm:flex-row items-center gap-2 mb-0.5">
                                <h2 className="text-xl sm:text-2xl font-bold text-slate-800 tracking-tight leading-tight">
                                    {activeTab === 'dashboard' ? 'My Protections' : activeTab === 'plans' ? 'Shield Plans' : 'Quote Builder'}
                                </h2>
                                {/* Preserved the Green Badge */}
                                <span className="px-2.5 py-1 bg-emerald-100 text-emerald-700 text-[10px] font-black rounded-full border border-emerald-200 whitespace-nowrap uppercase tracking-wider">
                                    {activeTab === 'calculator' ? 'Instant Quote' : 'Live Plans'}
                                </span>
                            </div>
                            <p className="text-sm text-slate-500 font-medium flex items-center justify-center sm:justify-start gap-1.5">
                                <span>Secure your outstanding balances</span>
                            </p>
                        </div>
                    </div>

                    {/* RIGHT: TABS - 2 per line on mobile, Pill on Desktop */}
                    <div className="w-full lg:w-auto">
                        <div className="grid grid-cols-2 sm:flex sm:flex-row p-1.5 bg-slate-100/80 backdrop-blur-sm rounded-2xl sm:rounded-full gap-1.5 border border-slate-200/50 shadow-inner">
                            {tabs.map((tab, index) => {
                                const isActive = activeTab === tab.id;
                                return (
                                    <button
                                        key={tab.id}
                                        onClick={() => setActiveTab(tab.id as any)}
                                        className={`
                                            relative px-4 py-3 sm:py-2 sm:px-6 rounded-xl sm:rounded-full 
                                            text-[10px] sm:text-[11px] font-black uppercase tracking-wider transition-all duration-300 
                                            flex flex-col sm:flex-row items-center justify-center gap-1 sm:gap-2 z-10
                                            ${isActive ? 'text-white' : 'text-slate-400 hover:text-slate-600'}
                                            ${index === 2 ? 'col-span-2 sm:col-span-1' : 'col-span-1'} 
                                        `}
                                    >
                                        {isActive && (
                                            <motion.div
                                                layoutId="activeTabLP"
                                                className="absolute inset-0 bg-gradient-to-r from-[#2076C7] to-[#1CADA3] rounded-xl sm:rounded-full -z-10 shadow-sm"
                                                transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
                                            />
                                        )}
                                        <tab.icon size={16} className="sm:size-[14px] transition-all duration-300" />
                                        <span className="leading-none">{tab.label}</span>
                                    </button>
                                );
                            })}
                        </div>
                    </div>
                </div>
            </motion.div>

            {/* --- MAIN CONTENT AREA --- */}
            <div className="w-full">
                <AnimatePresence mode="wait">
                    {activeTab === 'dashboard' ? (
                        <motion.div
                            key="dashboard"
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                        >
                            <LoanProtectorActiveDashboard />
                        </motion.div>
                    ) : activeTab === 'calculator' ? (
                        <motion.div
                            key="calculator"
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            className="bg-white rounded-3xl border border-slate-100 shadow-sm overflow-hidden w-full"
                        >
                            <div className="p-4 sm:p-8">
                                <LoanProtectorCalculator />
                            </div>
                        </motion.div>
                    ) : (
                        <motion.div
                            key="plans"
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            className="w-full"
                        >
                            <LoanProtectorSection activeTab={activeTab as any} />
                        </motion.div>
                    )}
                </AnimatePresence>
            </div>

            {/* --- FOOTER --- */}
            <footer className="mt-12 w-full">
                <div className="bg-slate-50 border border-slate-100 rounded-2xl p-6 text-center">
                    <p className="text-[11px] sm:text-xs text-slate-500 leading-relaxed max-w-4xl mx-auto">
                        <strong className="text-slate-700 font-black tracking-tight underline decoration-[#1CADA3]/30 uppercase mr-1">Disclaimer:</strong> 
                        Insurance coverage is subject to policy terms and conditions. Premium rates are indicative and based on standard underwriting guidelines.
                    </p>
                </div>
            </footer>
        </div>
    );
}