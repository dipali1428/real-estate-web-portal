'use client';

import { useState } from 'react';
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
import LoanAgainstSecuritiesForm from '@/app/dashboard/leadmanagement/forms/loanagainstsecuritiesform';

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
        color: "from-[#1CADA3] to-[#2076C7]",
        bg: "bg-gradient-to-br from-[#1CADA3]/5 to-white",
        border: "border-[#1CADA3]/20",
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
        color: "from-[#1CADA3] to-[#2076C7]",
        bg: "bg-gradient-to-br from-[#2076C7]/5 to-white",
        border: "border-[#2076C7]/20",
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
        bg: "bg-gradient-to-br from-[#1CADA3]/5 to-white",
        border: "border-[#1CADA3]/20",
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
        color: "from-[#1CADA3] to-[#2076C7]",
        bg: "bg-gradient-to-br from-[#1CADA3]/5 to-white",
        border: "border-[#1CADA3]/20",
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
        bg: "bg-gradient-to-br from-[#2076C7]/5 to-white",
        border: "border-[#2076C7]/20",
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
        color: "from-[#1CADA3] to-[#2076C7]",
        bg: "bg-gradient-to-br from-[#1CADA3]/5 to-white",
        border: "border-[#1CADA3]/20",
        featured: false,
        features: ["Surrender value based", "Policy continues", "Fast disbursal"],
    },
];

export default function LASTypesSection({ activeTab }: { activeTab: 'marketable' | 'fixed' }) {
    const [showForm, setShowForm] = useState(false);

    const products = activeTab === 'marketable'
        ? MARKETABLE_SECURITIES
        : FIXED_INCOME_OTHERS;

    return (
        <>
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
                            className={`group relative rounded-2xl border ${loan.border} ${loan.bg} p-6 md:p-7 flex flex-col h-full hover:shadow-xl hover:-translate-y-1 transition-all duration-300 ${
                                loan.featured ? 'ring-2 ring-[#2076C7]/30 shadow-lg' : ''
                            }`}
                        >
                            {/* ICON */}
                            <div className="flex flex-col items-center text-center">
                                <div className={`w-14 h-14 bg-gradient-to-br ${loan.color} rounded-xl flex items-center justify-center mb-4 shadow-md group-hover:scale-110 transition-transform duration-300`}>
                                    <Icon size={26} className="text-white" strokeWidth={1.8} />
                                </div>
                                <div className="text-[10px] font-bold text-[#2076C7]/70 uppercase tracking-wider mb-1">{loan.category}</div>
                                <h3 className="text-xl font-extrabold text-gray-800 mb-3 tracking-tight">{loan.title}</h3>
                                <p className="text-xs text-gray-500 mb-4">{loan.subtitle}</p>
                            </div>

                            {/* STATS */}
                            <div className="space-y-3 mb-5">
                                <div className="flex justify-between items-center py-2 border-b border-gray-100">
                                    <span className="text-[11px] font-semibold text-gray-400 uppercase tracking-wider">Max Amount</span>
                                    <span className="text-sm font-bold text-[#2076C7]">{loan.amount}</span>
                                </div>
                                <div className="flex justify-between items-center py-2 border-b border-gray-100">
                                    <span className="text-[11px] font-semibold text-gray-400 uppercase tracking-wider">Tenure</span>
                                    <span className="text-sm font-semibold text-gray-700">{loan.tenure}</span>
                                </div>
                                <div className="flex justify-between items-center py-2">
                                    <span className="text-[11px] font-semibold text-gray-400 uppercase tracking-wider">Interest</span>
                                    <span className="text-sm font-bold text-gray-800">{loan.rate}</span>
                                </div>
                            </div>

                            {/* FEATURES */}
                            <ul className="space-y-2 mb-5 flex-1">
                                {loan.features.map((feat) => (
                                    <li key={feat} className="flex items-start gap-2 text-[11px] font-medium text-gray-600 leading-relaxed">
                                        <IconCheck size={14} className="text-[#1CADA3] shrink-0 mt-0.5" strokeWidth={2.5} />
                                        <span className="break-words">{feat}</span>
                                    </li>
                                ))}
                            </ul>

                            {/* Apply Now Button */}
                            <button
                                onClick={() => setShowForm(true)}
                                className="w-full mt-2 bg-gradient-to-r from-[#2076C7] to-[#1CADA3] hover:opacity-90 hover:shadow-lg text-white text-xs font-bold uppercase tracking-wider py-3 rounded-xl transition-all duration-300 flex items-center justify-center gap-2 cursor-pointer shadow-md"
                            >
                                Apply Now
                            </button>
                        </motion.div>
                    );
                })}
            </div>

            {showForm && (
                <LoanAgainstSecuritiesForm
                    onClose={() => setShowForm(false)}
                />
            )}
        </>
    );
}