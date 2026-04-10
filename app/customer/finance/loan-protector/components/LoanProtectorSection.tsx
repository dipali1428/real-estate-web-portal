"use client";

// import React, { useState } from 'react';
import { motion } from 'framer-motion';
import {
    IconHome,
    IconCash,
    IconBuildingStore,
    IconCheck,
} from '@tabler/icons-react';

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

export default function LoanProtectorSection({ activeTab }: { activeTab: 'plans' }) {
    // Note: We currently only have one tab 'plans' for the grid view
    const products = PROTECTOR_PLANS;

    return (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 font-sans max-w-6xl mx-auto">
            {products.map((loan, i) => {
                const Icon = loan.icon;

                return (
                    <motion.div
                        key={loan.id}
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.5, delay: i * 0.1 }}
                        className={`group relative rounded-[2rem] border ${loan.border} ${loan.bg} p-5 md:p-6 flex flex-col h-full hover:shadow-2xl hover:-translate-y-2 transition-all duration-500`}
                    >

                        {/* Icon & Category */}
                        <div className="flex flex-col items-center text-center">
                            <div className={`w-12 h-12 bg-gradient-to-br ${loan.color} rounded-2xl flex items-center justify-center mb-4 shadow-lg group-hover:scale-110 transition-transform`}>
                                <Icon size={24} className="text-white" strokeWidth={1.8} />
                            </div>
                            <div className="text-[9px] font-black text-slate-400 uppercase tracking-widest mb-1">{loan.category}</div>
                            <h3 className="text-lg font-extrabold text-gray-800 mb-1 tracking-tight">{loan.title}</h3>
                            <p className="text-xs text-slate-500 mt-1 font-bold mb-4 uppercase tracking-tighter">{loan.insurer}</p>
                        </div>

                        {/* Stats */}
                        <div className="space-y-2 mb-6">
                            <div className="flex justify-between items-center py-2 border-b border-black/5">
                                <span className="text-sm font-bold text-slate-400 uppercase tracking-wider">Sum Insured</span>
                                <span className="text-base font-extrabold text-[#2076C7]">{loan.amount}</span>
                            </div>
                            <div className="flex justify-between items-center py-2 border-b border-black/5">
                                <span className="text-sm font-bold text-slate-400 uppercase tracking-wider">Tenure</span>
                                <span className="text-base font-extrabold text-slate-700">{loan.tenure}</span>
                            </div>
                            <div className="flex justify-between items-center py-2">
                                <span className="text-sm font-bold text-slate-400 uppercase tracking-wider">Claim Ratio</span>
                                <span className="text-base font-extrabold text-teal-600">{loan.rate}</span>
                            </div>
                        </div>

                        {/* Features */}
                        <ul className="space-y-2 mb-8 flex-1">
                            {loan.features.map((feat) => (
                                <li key={feat} className="flex items-start gap-2 text-sm font-bold text-slate-600">
                                    <IconCheck size={14} className="text-teal-500 shrink-0 mt-0.5" strokeWidth={3} />
                                    <span className="break-words">{feat}</span>
                                </li>
                            ))}
                        </ul>
                    </motion.div>
                );
            })}
        </div>
    );
}