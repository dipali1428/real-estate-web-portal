'use client';

import { useState } from 'react';
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
import SMELoanForm from '@/app/dashboard/leadmanagement/forms/smeloanform';

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
        bg: "bg-gradient-to-br from-[#2076C7]/5 to-white",
        border: "border-[#2076C7]/20",
        featured: false,
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
        color: "from-[#1CADA3] to-[#2076C7]",
        bg: "bg-gradient-to-br from-[#1CADA3]/5 to-white",
        border: "border-[#1CADA3]/20",
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
        bg: "bg-gradient-to-br from-[#2076C7]/5 to-white",
        border: "border-[#2076C7]/20",
        featured: false,
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
        color: "from-[#1CADA3] to-[#2076C7]",
        bg: "bg-gradient-to-br from-[#1CADA3]/5 to-white",
        border: "border-[#1CADA3]/20",
        featured: false,
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
        bg: "bg-gradient-to-br from-[#2076C7]/5 to-white",
        border: "border-[#2076C7]/20",
        featured: false,
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
        color: "from-[#1CADA3] to-[#2076C7]",
        bg: "bg-gradient-to-br from-[#1CADA3]/5 to-white",
        border: "border-[#1CADA3]/20",
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
        bg: "bg-gradient-to-br from-[#2076C7]/5 to-white",
        border: "border-[#2076C7]/20",
        featured: false,
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
        color: "from-[#1CADA3] to-[#2076C7]",
        bg: "bg-gradient-to-br from-[#1CADA3]/5 to-white",
        border: "border-[#1CADA3]/20",
        featured: false,
        features: ["SC/ST & Women", "Greenfield", "Up to ₹1 Crore"],
    },
];

export default function SMELoanTypesSection({ activeTab, showOnlyLive, }: {
    activeTab?: 'commercial' | 'govt'; showOnlyLive?: boolean
}) {
    const [showForm, setShowForm] = useState(false);

    // decide tab dynamically
    const tabToUse: 'commercial' | 'govt' =
        activeTab ?? (showOnlyLive ? 'commercial' : 'govt');

    const products =
        tabToUse === 'commercial' ? COMMERCIAL_PRODUCTS : GOVT_SCHEMES;

    return (
        <>
            <div className="max-w-7xl mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-7">
                {products.map((loan, i) => {
                    const Icon = loan.icon;
                    return (
                        <motion.div
                            key={loan.id}
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.5, delay: i * 0.1 }}
                            className={`group relative rounded-2xl border ${loan.border} ${loan.bg} p-5 md:p-6 flex flex-col h-full hover:shadow-xl hover:-translate-y-1 transition-all duration-300 ${
                                loan.featured ? 'ring-2 ring-[#2076C7]/30 shadow-lg' : ''
                            }`}
                        >
                            {/* ICON */}
                            <div className="flex flex-col items-center text-center">
                                <div className={`w-12 h-12 bg-gradient-to-br ${loan.color} rounded-xl flex items-center justify-center mb-3 shadow-md group-hover:scale-110 transition-transform duration-300`}>
                                    <Icon size={22} className="text-white" strokeWidth={1.8} />
                                </div>
                                <div className="text-[9px] font-bold text-[#2076C7]/70 uppercase tracking-wider mb-1">{loan.category}</div>
                                <h3 className="text-base font-extrabold text-gray-800 mb-2 tracking-tight text-center">{loan.title}</h3>
                                <p className="text-[10px] text-gray-500 mb-3 text-center">{loan.subtitle}</p>
                            </div>

                            {/* STATS */}
                            <div className="space-y-2 mb-4">
                                <div className="flex justify-between items-center py-1.5 border-b border-gray-100">
                                    <span className="text-[10px] font-semibold text-gray-400 uppercase tracking-wider">Max Amount</span>
                                    <span className="text-xs font-bold text-[#2076C7]">{loan.amount}</span>
                                </div>
                                <div className="flex justify-between items-center py-1.5 border-b border-gray-100">
                                    <span className="text-[10px] font-semibold text-gray-400 uppercase tracking-wider">Tenure</span>
                                    <span className="text-xs font-semibold text-gray-700">{loan.tenure}</span>
                                </div>
                                <div className="flex justify-between items-center py-1.5">
                                    <span className="text-[10px] font-semibold text-gray-400 uppercase tracking-wider">Interest</span>
                                    <span className="text-xs font-bold text-gray-800">{loan.rate}</span>
                                </div>
                            </div>

                            {/* FEATURES */}
                            <ul className="space-y-1.5 mb-4 flex-1">
                                {loan.features.map((feat) => (
                                    <li key={feat} className="flex items-start gap-1.5 text-[10px] font-medium text-gray-600 leading-relaxed">
                                        <IconCheck size={12} className="text-[#1CADA3] shrink-0 mt-0.5" strokeWidth={2.5} />
                                        <span className="break-words leading-tight">{feat}</span>
                                    </li>
                                ))}
                            </ul>

                            {/* Apply Now Button */}
                            <button
                                onClick={() => setShowForm(true)}
                                className="w-full mt-2 bg-gradient-to-r from-[#2076C7] to-[#1CADA3] hover:opacity-90 hover:shadow-lg text-white text-[10px] font-bold uppercase tracking-wider py-2.5 rounded-xl transition-all duration-300 flex items-center justify-center gap-2 cursor-pointer shadow-md"
                            >
                                Apply Now
                            </button>
                        </motion.div>
                    );
                })}
            </div>

            {showForm && (
                <SMELoanForm
                    onClose={() => setShowForm(false)}
                />
            )}
        </>
    );
}