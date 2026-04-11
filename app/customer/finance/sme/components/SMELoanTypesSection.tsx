'use client';

import { motion } from 'framer-motion';
import {
    IconCheck,
    IconBuildingBank,
    IconBriefcase,
    IconTractor,
    IconFileText,
    IconUsers,
    IconShieldCheck,
    IconTarget,
    IconAward,
} from '@tabler/icons-react';

const COMMERCIAL_PRODUCTS = [
    {
        id: 'sme-wc',
        category: 'WORKING CAPITAL',
        icon: IconBriefcase,
        title: "Working Capital Loans",
        subtitle: "Day-to-day operations & CC/OD facilities",
        amount: "Up to ₹2 Crore",
        rate: "10.5% – 15% p.a.",
        tenure: "12-36 Months",
        color: "from-[#2076C7] to-[#1CADA3]",
        bg: "bg-blue-50/30",
        border: "border-blue-200",
        features: ["Cash Credit (CC)", "Overdraft (OD)", "Daily operations"],
    },
    {
        id: 'sme-term',
        category: 'GROWTH',
        icon: IconBuildingBank,
        title: "Term Loans",
        subtitle: "Expansion or buying office space",
        amount: "Up to ₹5 Crore",
        rate: "9.5% – 13.5% p.a.",
        tenure: "Up to 60 Months",
        color: "from-[#2076C7] to-[#1CADA3]",
        bg: "bg-gradient-to-br from-blue-50/30 to-teal-50/30",
        border: "border-blue-100",
        featured: true,
        features: ["Business expansion", "High value", "Structured EMI"],
    },
    {
        id: 'sme-machinery',
        category: 'ASSET FINANCE',
        icon: IconTractor,
        title: "Machinery Finance",
        subtitle: "Plant & machinery with machine as collateral",
        amount: "Up to ₹5 Crore",
        rate: "9.0% – 12% p.a.",
        tenure: "Up to 84 Months",
        color: "from-[#2076C7] to-[#1CADA3]",
        bg: "bg-teal-50/30",
        border: "border-teal-200",
        features: ["Machine as collateral", "Tax benefits", "Up to 80% funding"],
    },
    {
        id: 'sme-invoice',
        category: 'LIQUIDITY',
        icon: IconFileText,
        title: "Invoice Discounting",
        subtitle: "Selling unpaid invoices for immediate cash",
        amount: "Up to ₹5 Crore",
        rate: "Starting 1% p.m.",
        tenure: "30-90 Days",
        color: "from-[#2076C7] to-[#1CADA3]",
        bg: "bg-indigo-50/30",
        border: "border-indigo-100",
        features: ["Immediate cash", "Unpaid invoices", "Short-term"],
    },
];

const GOVT_SCHEMES = [
    {
        id: 'sme-mudra',
        category: 'GOVT SCHEME',
        icon: IconUsers,
        title: "PMMY (Mudra Loan)",
        subtitle: "Categorized into Shishu, Kishore, Tarun",
        amount: "Up to ₹20 Lakh",
        rate: "Starting 8.5% p.a.",
        tenure: "Up to 5 Years",
        color: "from-[#2076C7] to-[#1CADA3]",
        bg: "bg-blue-50/30",
        border: "border-blue-200",
        features: ["No collateral", "Micro-units", "Refinance support"],
    },
    {
        id: 'sme-cgtmse',
        category: 'CREDIT GUARANTEE',
        icon: IconShieldCheck,
        title: "CGTMSE",
        subtitle: "Loans without traditional security/collateral",
        amount: "Up to ₹5 Crore",
        rate: "Based on Lender",
        tenure: "Based on Lender",
        color: "from-[#2076C7] to-[#1CADA3]",
        bg: "bg-gradient-to-br from-blue-50/30 to-teal-50/30",
        border: "border-blue-100",
        featured: true,
        features: ["Govt guarantee", "No security", "Nationwide"],
    },
    {
        id: 'sme-pmegp',
        category: 'SUBSIDY',
        icon: IconTarget,
        title: "PMEGP",
        subtitle: "Credit-linked subsidy for new units",
        amount: "Up to ₹50L (Mfg)",
        rate: "15–35% Subsidy",
        tenure: "3-7 Years",
        color: "from-[#2076C7] to-[#1CADA3]",
        bg: "bg-teal-50/30",
        border: "border-teal-200",
        features: ["15-35% Subsidy", "Up to ₹50 Lakh", "New units"],
    },
    {
        id: 'sme-standup',
        category: 'EMPOWERMENT',
        icon: IconAward,
        title: "Stand-Up India",
        subtitle: "For SC/ST and Women entrepreneurs",
        amount: "Up to ₹1 Crore",
        rate: "Starting 10.5% p.a.",
        tenure: "Up to 7 Years",
        color: "from-[#2076C7] to-[#1CADA3]",
        bg: "bg-blue-50/30",
        border: "border-blue-200",
        features: ["SC/ST & Women", "Greenfield", "Up to ₹1 Crore"],
    },
];

export default function SMELoanTypesSection({ activeTab, showOnlyLive, }: {
    activeTab?: 'commercial' | 'govt'; showOnlyLive?: boolean
}) {
    // decide tab dynamically
    const tabToUse: 'commercial' | 'govt' =
        activeTab ?? (showOnlyLive ? 'commercial' : 'govt');

    const products =
        tabToUse === 'commercial' ? COMMERCIAL_PRODUCTS : GOVT_SCHEMES;

    return (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {products.map((loan, i) => {
                const Icon = loan.icon;
                return (
                    <motion.div
                        key={loan.id}
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.5, delay: i * 0.1 }}
                        className={`group relative rounded-[2rem] border ${loan.border} ${loan.bg} p-6 md:p-8 flex flex-col h-full hover:shadow-2xl hover:-translate-y-2 transition-all duration-500 ${loan.featured ? 'ring-2 ring-[#2076C7]/30 shadow-xl' : ''
                            }`}
                    >

                        {/* Icon & Category */}
                        <div className="flex flex-col items-center text-center">
                            <div className={`w-14 h-14 bg-gradient-to-br ${loan.color} rounded-2xl flex items-center justify-center mb-5 shadow-lg group-hover:scale-110 transition-transform`}>
                                <Icon size={28} className="text-white" strokeWidth={1.8} />
                            </div>
                            <div className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1">{loan.category}</div>
                            <h3 className="text-xl font-extrabold text-gray-700 mb-4 tracking-tight">{loan.title}</h3>
                        </div>

                        {/* Stats */}
                        <div className="space-y-2 mb-6">
                            <div className="flex justify-between items-center py-2 border-b border-black/5">
                                <span className="text-sm font-bold text-slate-400 uppercase tracking-wider">Max Amount</span>
                                <span className="text-base font-extrabold text-[#2076C7]">{loan.amount}</span>
                            </div>
                            <div className="flex justify-between items-center py-2 border-b border-black/5">
                                <span className="text-sm font-bold text-slate-400 uppercase tracking-wider">Tenure</span>
                                <span className="text-base font-extrabold text-slate-700">{loan.tenure}</span>
                            </div>
                            <div className="flex justify-between items-center py-2">
                                <span className="text-sm font-bold text-slate-400 uppercase tracking-wider">Interest</span>
                                <span className="text-base font-extrabold text-slate-700">{loan.rate}</span>
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