"use client";

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
    IconHome,
    IconCash,
    IconBuildingStore,
    IconShieldLock,
    IconBolt,
    IconCheck,
    IconCalculator,
} from '@tabler/icons-react';
import { LoanProtectorCalculator } from '@/app/products/loan-protector/components/Calculator';

const PROTECTOR_PLANS = [
    {
        id: 'lp-1',
        category: 'Home Loan',
        title: 'Mortgage Shield Premium',
        insurer: 'HDFC ERGO',
        amount: '₹ 1.2 Cr',
        tenure: '25 Years',
        rate: '96.71% Claims',
        color: 'from-[#2076C7] to-[#1CADA3]',
        border: 'border-blue-100',
        bg: 'bg-blue-50/30',
        icon: IconHome,
        features: ['Reducing Balance Cover', 'Mortgage Protection', 'Accidental Death Rider'],
    },
    {
        id: 'lp-2',
        category: 'Personal Loan',
        title: 'Liability Guard Pro',
        insurer: 'ICICI Lombard',
        amount: '₹ 25.0 Lac',
        tenure: '5 Years',
        rate: '98.54% Claims',
        color: 'from-[#2076C7] to-[#1CADA3]',
        border: 'border-teal-100',
        bg: 'bg-teal-50/30',
        icon: IconCash,
        features: ['Debt-Free Family', 'Critical Illness Cover', 'Job Loss Rider'],
    },
    {
        id: 'lp-3',
        category: 'LAP',
        title: 'Asset Liability Shelter',
        insurer: 'Tata AIG',
        amount: '₹ 5.0 Cr',
        tenure: '15 Years',
        rate: '97.10% Claims',
        color: 'from-[#2076C7] to-[#1CADA3]',
        border: 'border-indigo-100',
        bg: 'bg-indigo-50/30',
        icon: IconBuildingStore,
        features: ['Business Asset Protection', 'Property Shield', 'Total Disability Cover'],
    }
];

export default function LoanProtectorSection() {
    const [activeTab, setActiveTab] = useState<'plans' | 'calculator'>('plans');
    const [planType, setPlanType] = useState("Home Loan Protection Plan");

    return (
        <div className="space-y-6 sm:space-y-8">

            {/* HEADER */}
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-6 bg-slate-50/80 p-6 md:p-8 rounded-[3rem] border border-slate-100 shadow-sm"
            >
                <div className="flex items-center gap-4">
                    <div className="w-14 h-14 bg-gradient-to-br from-[#1CADA3] to-[#2076C7] rounded-2xl flex items-center justify-center shadow-xl">
                        {activeTab === 'calculator' 
                            ? <IconCalculator size={28} className="text-white" /> 
                            : <IconShieldLock size={28} className="text-white" />
                        }
                    </div>

                    <div>
                        <h2 className="text-xl md:text-2xl font-black text-slate-800 uppercase">
                            {activeTab === 'calculator' ? 'Quote Builder' : 'Debt Protection Suites'}
                        </h2>

                        <p className="text-sm text-slate-500 font-semibold mt-1 flex items-center gap-2">
                            <IconBolt size={16} className="text-[#1CADA3]" />
                            {activeTab === 'calculator' 
                                ? 'Generate official loan protection quotes instantly' 
                                : 'Specialized plans to clear outstanding loan balances automatically.'
                            }
                        </p>
                    </div>
                </div>

                {/* TABS */}
                <div className="flex items-center gap-2 bg-white p-2 rounded-2xl shadow-inner border border-slate-100 w-full lg:w-auto overflow-x-auto scrollbar-hide">
                    {[
                        { id: 'plans', label: 'Shield Plans' },
                        { id: 'calculator', label: 'Quote Builder' }
                    ].map((tab) => (
                        <button 
                            key={tab.id}
                            onClick={() => setActiveTab(tab.id as any)}
                            className={`px-5 py-2 text-xs font-black uppercase tracking-wider rounded-xl transition-all duration-300 whitespace-nowrap ${
                                activeTab === tab.id 
                                ? 'bg-gradient-to-r from-[#2076C7] to-[#1CADA3] text-white shadow-lg' 
                                : 'text-slate-400 hover:text-slate-600 hover:bg-slate-50'
                            }`}
                        >
                            {tab.label}
                        </button>
                    ))}
                </div>
            </motion.div>

            {/* CONTENT */}
            <div className="relative min-h-[500px]">
                <AnimatePresence mode="wait">
                    {activeTab === 'calculator' ? (
                        <motion.div
                            key="lp-calc"
                            initial={{ opacity: 0, scale: 0.98 }}
                            animate={{ opacity: 1, scale: 1 }}
                            exit={{ opacity: 0, scale: 0.98 }}
                            className="max-w-7xl mx-auto"
                        >
                            <div className="bg-white rounded-[3rem] border border-slate-100 shadow-sm overflow-hidden text-slate-900">
                                <div className="p-4 sm:p-6 md:p-8 lg:p-12">
                                    <LoanProtectorCalculator 
                                        planType={planType} 
                                        setPlanType={setPlanType} 
                                        isDashboard={true} 
                                    />
                                </div>
                            </div>
                        </motion.div>
                    ) : (
                        <motion.div 
                            key="lp-grid"
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5 sm:gap-6 md:gap-8"
                        >
                            {PROTECTOR_PLANS.map((loan, i) => {
                                const Icon = loan.icon;

                                return (
                                    <motion.div
                                        key={loan.id}
                                        initial={{ opacity: 0, y: 20 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        transition={{ delay: i * 0.1 }}
                                        className={`group relative rounded-[3rem] border ${loan.border} ${loan.bg} p-5 sm:p-6 md:p-8 pb-16 sm:pb-20 shadow-sm hover:shadow-md hover:-translate-y-2 transition-all duration-500`}
                                    >

                                        {/* Icon & Category */}
                                        <div className="flex flex-col items-center text-center mb-5 sm:mb-6 md:mb-8">
                                            <div className={`w-14 h-14 sm:w-16 sm:h-16 bg-gradient-to-br ${loan.color} rounded-xl sm:rounded-2xl flex items-center justify-center mb-4 sm:mb-6 shadow-lg group-hover:scale-110 transition-transform duration-500`}>
                                                <Icon size={28} className="text-white" strokeWidth={1.5} />
                                            </div>
                                            <span className="text-[10px] sm:text-xs font-black text-slate-400 uppercase tracking-[0.15em] sm:tracking-[0.2em] mb-1 sm:mb-2">{loan.category}</span>
                                            <h3 className="text-base sm:text-lg md:text-xl font-bold text-slate-800 leading-tight">{loan.title}</h3>
                                            <p className="text-xs sm:text-sm text-slate-500 mt-1 font-semibold">{loan.insurer}</p>
                                        </div>

                                        {/* Stats */}
                                        <div className="space-y-3 sm:space-y-4 mb-6 sm:mb-8">
                                            {[
                                                { label: 'Sum Insured', val: loan.amount, color: 'text-[#2076C7]' },
                                                { label: 'Loan Tenure', val: loan.tenure, color: 'text-slate-700' },
                                                { label: 'Claim Ratio', val: loan.rate, color: 'text-[#1CADA3]' }
                                            ].map((stat, idx) => (
                                                <div key={idx} className="flex justify-between items-center pb-2 sm:pb-3 border-b border-slate-200/50">
                                                    <span className="text-[10px] sm:text-xs font-bold text-slate-400 uppercase tracking-wider">{stat.label}</span>
                                                    <span className={`text-xs sm:text-sm font-black ${stat.color}`}>{stat.val}</span>
                                                </div>
                                            ))}
                                        </div>

                                        {/* Features */}
                                        <ul className="space-y-2 sm:space-y-3">
                                            {loan.features.map((feat) => (
                                                <li key={feat} className="flex items-start gap-1.5 sm:gap-2 text-[10px] sm:text-xs font-bold text-slate-600">
                                                    <IconCheck size={14} className="text-[#1CADA3] shrink-0 mt-0.5" strokeWidth={3} />
                                                    <span className="break-words">{feat}</span>
                                                </li>
                                            ))}
                                        </ul>
                                    </motion.div>
                                );
                            })}
                        </motion.div>
                    )}
                </AnimatePresence>
            </div>
        </div>
    );
}