'use client';

import { motion } from 'framer-motion';
import { useState } from 'react';
import { IconCheck, IconX, IconSchool, IconBuildingBank, IconWorld, IconAward, IconCurrencyRupee, IconPercentage, IconShieldCheck, IconClock, IconHistory, IconReceiptTax, IconFileText, IconFirstAidKit, IconArrowRight, IconUser, IconPhone, IconBook, IconMapPin } from '@tabler/icons-react';
import { useModal } from '../../../context/ModalContext';

const loanTypes = [
    {
        icon: IconSchool,
        title: 'Domestic Education Loan',
        subtitle: 'Study in India',
        amount: 'Up to ₹75 Lakh',
        rate: '9.0% – 14% p.a.',
        tenure: 'Up to 15 years',
        color: 'from-blue-500 to-blue-700',
        bg: 'bg-blue-50/30',
        border: 'border-blue-200',
        features: [
            'All UG, PG, diploma & professional courses',
            'IITs, IIMs, NLUs, medical colleges covered',
            'No collateral up to ₹7.5 lakh',
            'Moratorium period: course + 6-12 months',
        ],
    },
    {
        icon: IconWorld,
        title: 'Overseas Education Loan',
        subtitle: 'Study Abroad',
        amount: 'Up to ₹1.5 Crore+',
        rate: '8.5% – 18% p.a.',
        tenure: 'Up to 15 years',
        color: 'from-[#2076C7] to-[#1CADA3]',
        bg: 'bg-gradient-to-br from-blue-50/30 to-teal-50/30',
        border: 'border-blue-100',
        featured: true,
        features: [
            'USA, UK, Canada, Australia & 35+ countries',
            'Secured (8.5%+) & Unsecured (10%+) options',
            'Pre-visa disbursal & tax benefits (Sec 80E)',
            'Covers 100% tuition, living & travel costs',
        ],
    },
    {
        icon: IconBuildingBank,
        title: 'Skill Development Loan',
        subtitle: 'Vocational & Short-term',
        amount: 'Up to ₹1.5 Lakh',
        rate: '11% – 15% p.a.',
        tenure: 'Up to 7 years',
        color: 'from-teal-500 to-teal-700',
        bg: 'bg-teal-50/30',
        border: 'border-teal-200',
        features: [
            'ITI, polytechnic & short-term courses',
            'Government certified skill programs',
            'Quick 3-day approval process',
            'Minimal documentation required',
        ],
    },
];

const comparison = [
    { feature: 'Loan Amount', domestic: '₹5 Lakh onwards', abroad: '₹4 Lakh onwards', icon: IconCurrencyRupee },
    { feature: 'Interest Rate', domestic: '8.0% onwards', abroad: '8.5% onwards', icon: IconPercentage },
    { feature: 'Collateral', domestic: 'Required > ₹7.5L', abroad: 'Secured & Unsecured', icon: IconShieldCheck },
    { feature: 'Moratorium', domestic: 'Course + 6-12 months', abroad: 'Course + 6-12 months', icon: IconClock },
    { feature: 'Repayment', domestic: 'Up to 15 years', abroad: 'Up to 15 years', icon: IconHistory },
    { feature: 'Processing Fee', domestic: '0.5% – 2%', abroad: '0.5% – 2% + GST', icon: IconReceiptTax },
    { feature: 'Tax Benefit', domestic: 'Sec 80E (8 years)', abroad: 'Sec 80E (8 years)', icon: IconFileText },
    { feature: 'Insurance Cover', domestic: true, abroad: true, icon: IconFirstAidKit },
];

export default function LoanTypesSection() {
    const { openLogin } = useModal();

    return (
        <section className="py-2 bg-white relative overflow-hidden">
            <div className="max-w-[1440px] mx-auto px-6 leading-relaxed">

                {/* Header */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="text-center mb-10"
                >
                    <span className="inline-flex items-center gap-2 text-[#2076C7] font-black tracking-widest uppercase text-xs mb-4">
                        <IconAward size={14} />
                        Loan Products
                    </span>
                    <h2 className="text-3xl md:text-4xl font-extrabold mb-6 bg-linear-to-r from-[#2076C7] to-[#1CADA3] bg-clip-text text-transparent drop-shadow-sm tracking-tight leading-tight">
                        Choose Your Education Loan
                    </h2>
                    <p className="text-gray-600 max-w-2xl mx-auto font-medium text-base md:text-lg leading-relaxed">
                        From domestic degrees to international programs — we have tailored loan products to match every aspiration and budget.
                    </p>
                </motion.div>

                {/* Loan Type Cards */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
                    {loanTypes.map((loan, i) => {
                        const Icon = loan.icon;
                        return (
                            <motion.div
                                key={loan.title}
                                initial={{ opacity: 0, y: 30 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ duration: 0.5, delay: i * 0.1 }}
                                className={`relative rounded-[2rem] border ${loan.border} ${loan.bg} p-8 pb-20 hover:shadow-2xl hover:-translate-y-2 transition-all duration-500 group ${loan.featured ? 'ring-2 ring-[#2076C7]/30 shadow-xl' : ''}`}
                            >
                                {loan.featured && (
                                    <div className="absolute -top-3 left-1/2 -translate-x-1/2 bg-gradient-to-r from-[#2076C7] to-[#1CADA3] text-white text-[10px] font-black uppercase tracking-widest px-4 py-1 rounded-full shadow">
                                        Most Popular
                                    </div>
                                )}
                                <div className="flex flex-col items-center text-center">
                                    <div className={`w-14 h-14 bg-gradient-to-br ${loan.color} rounded-2xl flex items-center justify-center mb-5 shadow-lg group-hover:scale-110 transition-transform`}>
                                        <Icon size={28} strokeWidth={1.8} className="text-white" />
                                    </div>
                                    <div className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1">{loan.subtitle}</div>
                                    <h3 className="text-xl font-extrabold text-gray-700 mb-4 tracking-tight">{loan.title}</h3>
                                </div>

                                <div className="space-y-2 mb-6">
                                    <div className="flex justify-between items-center py-2 border-b border-black/5">
                                        <span className="text-sm font-bold text-slate-400 uppercase">Max Amount</span>
                                        <span className="text-base font-extrabold text-[#2076C7]">{loan.amount}</span>
                                    </div>
                                    <div className="flex justify-between items-center py-2 border-b border-black/5">
                                        <span className="text-sm font-bold text-slate-400 uppercase">Interest Rate</span>
                                        <span className="text-base font-extrabold text-slate-700">{loan.rate}</span>
                                    </div>
                                    <div className="flex justify-between items-center py-2">
                                        <span className="text-sm font-bold text-slate-400 uppercase">Tenure</span>
                                        <span className="text-base font-extrabold text-slate-700">{loan.tenure}</span>
                                    </div>
                                </div>

                                <ul className="space-y-2 mb-8">
                                    {loan.features.map((f) => (
                                        <li key={f} className="flex items-start gap-2 text-sm font-bold text-slate-600">
                                            <IconCheck size={14} className="text-teal-500 shrink-0 mt-0.5" strokeWidth={3} />
                                            {f}
                                        </li>
                                    ))}
                                </ul>

                                {/* Apply Now Button */}
                                <button
                                    onClick={openLogin}
                                    className="absolute bottom-6 left-1/2 -translate-x-1/2 inline-flex items-center gap-2 px-10 py-3.5 rounded-2xl text-xs md:text-sm font-black uppercase tracking-widest text-white shadow-lg hover:shadow-xl transform hover:-translate-y-1 transition-all duration-300 overflow-hidden cursor-pointer group whitespace-nowrap"
                                    style={{ background: 'linear-gradient(to right, #1CADA3, #2076C7)' }}
                                >
                                    <span className="relative z-6 flex items-center justify-center gap-1">
                                        Apply Now
                                        <IconArrowRight size={14} className="group-hover:translate-x-1 transition-transform" strokeWidth={3} />
                                    </span>
                                    <div className="absolute inset-0 transform scale-x-0 group-hover:scale-x-100 transition-transform origin-left duration-300" style={{ background: 'linear-gradient(to right, #189B8D, #1A68B0)' }}></div>
                                </button>
                            </motion.div>
                        );
                    })}
                </div>

                {/* Comparison Section */}
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="mt-14"
                >
                    <div className="text-center mb-6">
                        <h3 className="text-3xl md:text-4xl py-8 font-extrabold bg-linear-to-r from-[#2076C7] to-[#1CADA3] bg-clip-text text-transparent inline-block drop-shadow-sm tracking-tight leading-tight">
                            Domestic vs. Abroad — Quick Comparison
                        </h3>
                        <div className="w-24 h-1 bg-gradient-to-r from-[#2076C7] to-[#1CADA3] mx-auto mt-4 rounded-full opacity-30" />
                    </div>

                    <div className="bg-white rounded-[2.5rem] border border-blue-50 shadow-[0_40px_100px_-20px_rgba(32,118,199,0.1)] overflow-hidden">
                        <div className="overflow-x-auto">
                            <table className="w-full text-sm border-collapse">
                                <thead>
                                    <tr className="bg-gradient-to-r from-[#2076C7] to-[#1CADA3]">
                                        <th className="text-left px-4 sm:px-8 py-5 text-lg md:text-xl font-black text-white border-b border-white/10">Key Features</th>
                                        <th className="text-center px-4 sm:px-8 py-5 border-b border-white/10">
                                            <div className="inline-flex flex-col items-center">
                                                <span className="text-lg md:text-xl font-black text-white">Domestic Loan</span>
                                                <div className="text-[10px] font-bold text-white/90 mt-0.5">(study in india)</div>
                                            </div>
                                        </th>
                                        <th className="text-center px-4 sm:px-8 py-5 border-b border-white/10">
                                            <div className="inline-flex flex-col items-center">
                                                <span className="text-lg md:text-xl font-black text-white">Abroad Loan</span>
                                                <div className="text-[10px] font-bold text-white/90 mt-0.5">(study overseas)</div>
                                            </div>
                                        </th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {comparison.map((row, i) => {
                                        const FeatureIcon = row.icon;
                                        return (
                                            <tr
                                                key={row.feature}
                                                className={`group transition-all duration-300 ${i === comparison.length - 1 ? '' : 'border-b border-slate-50'} hover:bg-blue-50/30`}
                                            >
                                                <td className="px-3 sm:px-8 py-4">
                                                    <div className="flex items-center gap-3 md:gap-4">
                                                        <div className="w-8 h-8 md:w-9 md:h-9 rounded-xl bg-gradient-to-r from-[#2076C7] to-[#1CADA3] flex items-center justify-center text-white group-hover:scale-110 transition-transform shadow-md">
                                                            <FeatureIcon size={18} strokeWidth={2.5} />
                                                        </div>
                                                        <span className="font-extrabold text-slate-700 tracking-tight text-sm md:text-lg">{row.feature}</span>
                                                    </div>
                                                </td>
                                                <td className="px-4 sm:px-8 py-3.5 text-center">
                                                    {typeof row.domestic === 'boolean' ? (
                                                        <div className={`w-7 h-7 rounded-full mx-auto flex items-center justify-center ${row.domestic ? 'bg-teal-50 text-teal-600' : 'bg-red-50 text-red-500'}`}>
                                                            {row.domestic ? <IconCheck size={16} strokeWidth={3} /> : <IconX size={16} strokeWidth={3} />}
                                                        </div>
                                                    ) : (
                                                        <span className="text-base md:text-lg font-bold text-slate-500">{row.domestic}</span>
                                                    )}
                                                </td>
                                                <td className="px-4 sm:px-8 py-3.5 text-center">
                                                    {typeof row.abroad === 'boolean' ? (
                                                        <div className={`w-7 h-7 rounded-full mx-auto flex items-center justify-center ${row.abroad ? 'bg-teal-50 text-teal-600' : 'bg-red-50 text-red-500'}`}>
                                                            {row.abroad ? <IconCheck size={16} strokeWidth={3} /> : <IconX size={16} strokeWidth={3} />}
                                                        </div>
                                                    ) : (
                                                        <span className="text-base md:text-lg font-black text-[#2076C7]">{row.abroad}</span>
                                                    )}
                                                </td>
                                            </tr>
                                        );
                                    })}
                                </tbody>
                            </table>
                        </div>

                    </div>
                </motion.div>
            </div>
        </section>
    );
}
