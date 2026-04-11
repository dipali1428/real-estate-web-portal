'use client';

import { motion } from 'framer-motion';
import {
    IconCheck,
    IconBuildingBank,
    IconTrendingUp,
    IconChartLine,
    IconShieldCheck,
    IconBriefcase,
    IconChartPie,
} from '@tabler/icons-react';


// --- DATA CONFIGURATION ---

const MARKETABLE_SECURITIES = [
    {
        id: 'las-mf',
        category: 'LIQUIDITY',
        icon: IconChartPie,
        title: "Mutual Funds",
        subtitle: "Pledge equity, debt, or hybrid units",
        amount: "Up to 80%",
        rate: "9% – 12% p.a.",
        tenure: "Flexible",
        color: "from-[#2076C7] to-[#1CADA3]",
        bg: "bg-blue-50/30",
        border: "border-blue-200",
        featured: false,
        features: ["Instant digital pledge", "Continue earning returns", "Nil foreclosure charges"],
    },
    {
        id: 'las-shares',
        category: 'MARKET ASSETS',
        icon: IconChartLine,
        title: "Shares (Equity)",
        subtitle: "NSE/BSE listed approved shares",
        amount: "Up to 50%",
        rate: "9% – 14% p.a.",
        tenure: "Flexible",
        color: "from-[#2076C7] to-[#1CADA3]",
        bg: "bg-gradient-to-br from-blue-50/30 to-teal-50/30",
        border: "border-blue-100",
        featured: false,
        features: ["Large & Mid-cap focus", "Dividends credited to you", "Swift approval"],
    },
    {
        id: 'las-etf',
        category: 'PASSIVE INCOME',
        icon: IconTrendingUp,
        title: "ETFs",
        subtitle: "Gold, Nifty & Bank ETFs",
        amount: "Up to 65%",
        rate: "9% – 13% p.a.",
        tenure: "Flexible",
        color: "from-[#2076C7] to-[#1CADA3]",
        bg: "bg-teal-50/30",
        border: "border-teal-200",
        featured: false,
        features: ["Market price LTV", "Exchange-traded", "Diversified collateral"],
    },
];

const FIXED_INCOME_OTHERS = [
    {
        id: 'las-bonds',
        category: 'STABLE INCOME',
        icon: IconBriefcase,
        title: "Bonds",
        subtitle: "Corporate, PSU & Govt Bonds",
        amount: "Up to 80%",
        rate: "9% – 12% p.a.",
        tenure: "Flexible",
        color: "from-[#2076C7] to-[#1CADA3]",
        bg: "bg-indigo-50/30",
        border: "border-indigo-100",
        featured: false,
        features: ["High LTV for PSU bonds", "Portfolio expertise", "Minimal paperwork"],
    },
    {
        id: 'las-gov-sec',
        category: 'SOVEREIGN',
        icon: IconBuildingBank,
        title: "Govt Securities",
        subtitle: "T-Bills & Sovereign Gold Bonds",
        amount: "Up to 90%",
        rate: "7.5% – 10% p.a.",
        tenure: "Flexible",
        color: "from-[#2076C7] to-[#1CADA3]",
        bg: "bg-gradient-to-br from-blue-50/30 to-teal-50/30",
        border: "border-blue-100",
        featured: true,
        features: ["Lowest interest rates", "Zero risk-weightage", "Highest LTV"],
    },
    {
        id: 'las-insurance',
        category: 'PROTECTION',
        icon: IconShieldCheck,
        title: "Insurance Policies",
        subtitle: "LIC & Traditional Plans",
        amount: "Up to 90%",
        rate: "10% – 13% p.a.",
        tenure: "Up to 7 Years",
        color: "from-[#2076C7] to-[#1CADA3]",
        bg: "bg-blue-50/30",
        border: "border-blue-200",
        featured: false,
        features: ["Surrender value based", "Policy continues", "Fast disbursal"],
    },
];

export default function LASTypesSection({ activeTab }: { activeTab: 'marketable' | 'fixed' }) {
    const products = activeTab === 'marketable'
        ? MARKETABLE_SECURITIES
        : FIXED_INCOME_OTHERS;

    return (
        <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-10">
            {products.map((loan, i) => {
                const Icon = loan.icon;

                return (
                    <motion.div
                        key={loan.id}
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.5, delay: i * 0.1 }}
                        className={`group relative rounded-3xl border ${loan.border} ${loan.bg} p-6 md:p-7 flex flex-col h-full hover:shadow-2xl hover:-translate-y-1 transition-all duration-500 ${
                            loan.featured ? 'ring-2 ring-[#2076C7]/30 shadow-lg' : ''
                        }`}
                    >

                        {/* ICON */}
                        <div className="flex flex-col items-center text-center">
                            <div className={`w-12 h-12 bg-gradient-to-br ${loan.color} rounded-2xl flex items-center justify-center mb-4 shadow-md group-hover:scale-110 transition-transform`}>
                                <Icon size={24} className="text-white" strokeWidth={1.8} />
                            </div>
                            <div className="text-[9px] font-black text-slate-400 uppercase tracking-widest mb-1">{loan.category}</div>
                            <h3 className="text-lg font-extrabold text-gray-700 mb-3 tracking-tight">{loan.title}</h3>
                        </div>

                        {/* STATS */}
                        <div className="space-y-2 mb-5">
                            <div className="flex justify-between items-center py-1.5 border-b border-black/5">
                                <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider">Max Amount</span>
                                <span className="text-sm font-extrabold text-[#2076C7]">{loan.amount}</span>
                            </div>
                            <div className="flex justify-between items-center py-1.5 border-b border-black/5">
                                <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider">Tenure</span>
                                <span className="text-sm font-extrabold text-slate-700">{loan.tenure}</span>
                            </div>
                            <div className="flex justify-between items-center py-1.5">
                                <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider">Interest</span>
                                <span className="text-sm font-extrabold text-slate-700">{loan.rate}</span>
                            </div>
                        </div>

                        {/* FEATURES */}
                        <ul className="space-y-2 mb-4 flex-1">
                            {loan.features.map((feat) => (
                                <li key={feat} className="flex items-start gap-2 text-[11px] sm:text-xs font-bold text-slate-600 leading-snug">
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