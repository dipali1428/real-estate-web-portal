'use client';

import { motion } from 'framer-motion';
import { useState } from 'react';
import {
    IconSchool, IconArrowRight, IconCheck, IconStar,
    IconWorld, IconTrendingUp, IconShieldCheck, IconClock
} from '@tabler/icons-react';
import EducationLoanForm from './educationloanform';

const stats = [
    { label: 'Students Funded', value: '50,000+' },
    { label: 'Loan Disbursed', value: '₹2,000 Cr+' },
];

const highlights = [
    { icon: IconShieldCheck, text: 'No collateral up to ₹7.5 Lakh' },
    { icon: IconTrendingUp, text: 'ROI from 7.5% p.a.' },
    { icon: IconClock, text: 'Approval within 7-15 working days' },
    { icon: IconWorld, text: 'Covers India & 35+ countries' },
];

export default function HeroSection({ onApplyClick }: { onApplyClick: () => void }) {
    // Moved showForm state to parent page.tsx
    // const [showForm, setShowForm] = useState(false);

    return (
        <section className="relative min-h-[85vh] flex items-center bg-[#fafcfe] overflow-hidden pt-12 pb-10">
            {/* Background elements */}
            <div className="absolute inset-0 -z-10">
                <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-br from-blue-50/70 via-transparent to-teal-50/50" />
                <div className="absolute top-20 right-0 w-[500px] h-[500px] bg-gradient-to-bl from-[#2076C7]/8 to-transparent rounded-full blur-3xl" />
                <div className="absolute -bottom-20 -left-20 w-[400px] h-[400px] bg-gradient-to-tr from-[#1CADA3]/8 to-transparent rounded-full blur-3xl" />
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] border border-blue-100/30 rounded-full" />
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] border border-blue-100/20 rounded-full" />
            </div>

            <div className="max-w-6xl mx-auto px-6 md:px-12 w-full">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">

                    {/* Left: Content */}
                    <motion.div
                        initial={{ opacity: 0, x: -40 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.8 }}
                        className="space-y-8"
                    >
                        <div className="inline-flex items-center gap-2 px-4 py-2 bg-blue-50 border border-blue-100 rounded-full text-[11px] font-black uppercase tracking-widest text-blue-600">
                            <IconSchool size={14} />
                            Education Loan • Infinity Arthvishva
                        </div>

                        <div className="space-y-4">
                            <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold leading-[1.1] tracking-tight text-transparent bg-gradient-to-r from-[#2076C7] to-[#1CADA3] bg-clip-text">
                                Fund Your
                                <br />
                                Dream Education
                            </h1>
                            <p className="text-slate-500 text-lg font-medium leading-relaxed max-w-lg">
                                Get education loans starting from ₹5,00,000 to ₹1.5 Cr+ for top institutions in India and abroad. Quick disbursal, flexible repayment, and tax benefits.
                            </p>
                        </div>

                        {/* Highlights */}
                        <div className="grid grid-cols-2 gap-3">
                            {highlights.map((h) => {
                                const Icon = h.icon;
                                return (
                                    <div key={h.text} className="flex items-center gap-3 bg-white rounded-2xl px-4 py-3 border border-blue-50 shadow-sm">
                                        <div className="w-8 h-8 bg-blue-50 rounded-xl flex items-center justify-center shrink-0">
                                            <Icon size={16} className="text-[#2076C7]" />
                                        </div>
                                        <span className="text-xs font-bold text-slate-600 leading-tight">{h.text}</span>
                                    </div>
                                );
                            })}
                        </div>

                        {/* CTAs */}
                        <div className="flex flex-col sm:flex-row gap-4">
                            <button
                                onClick={onApplyClick}
                                className="group flex items-center justify-center gap-3 px-8 py-4 bg-gradient-to-r from-[#2076C7] to-[#1CADA3] text-white rounded-2xl font-black text-base shadow-[0_16px_40px_-12px_rgba(32,118,199,0.4)] hover:shadow-[0_24px_60px_-12px_rgba(32,118,199,0.5)] hover:scale-[1.02] active:scale-[0.98] transition-all duration-300"
                            >
                                Apply Now — It's Free
                                <IconArrowRight size={20} className="group-hover:translate-x-1 transition-transform" />
                            </button>
                            <a
                                href="#eligibility"
                                className="flex items-center justify-center gap-2 px-8 py-4 border-2 border-blue-200 text-[#2076C7] rounded-2xl font-black text-base hover:bg-blue-50 transition-all duration-300"
                            >
                                Check Eligibility
                            </a>
                        </div>


                    </motion.div>

                    {/* Right: Stats Card */}
                    <motion.div
                        initial={{ opacity: 0, x: 40 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.8, delay: 0.2 }}
                        className="relative"
                    >
                        <div className="absolute -inset-4 bg-gradient-to-br from-[#2076C7]/10 to-[#1CADA3]/10 rounded-[3rem] blur-2xl" />
                        <div className="relative bg-white rounded-[2.5rem] p-8 shadow-[0_32px_80px_-16px_rgba(32,118,199,0.15)] border border-blue-50">
                            <div className="text-center mb-8">
                                <div className="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-br from-[#2076C7] to-[#1CADA3] rounded-3xl mb-4 shadow-lg">
                                    <IconSchool size={40} strokeWidth={1.5} className="text-white" />
                                </div>
                                <p className="text-slate-400 font-bold text-sm uppercase tracking-widest">Trusted by Students Across India</p>
                            </div>

                            <div className="grid grid-cols-2 gap-6">
                                {stats.map((s) => (
                                    <div key={s.label} className="text-center p-4 bg-[#fafcfe] rounded-2xl border border-blue-50">
                                        <div className="text-2xl font-extrabold text-[#2076C7] mb-1 tracking-tight">{s.value}</div>
                                        <div className="text-[10px] font-black text-slate-400 uppercase tracking-widest">{s.label}</div>
                                    </div>
                                ))}
                            </div>

                            <div className="mt-6 p-4 bg-gradient-to-r from-[#2076C7]/5 to-[#1CADA3]/5 rounded-2xl border border-blue-100/50">
                                <div className="flex items-center gap-3">
                                    <div className="w-8 h-8 bg-teal-100 rounded-xl flex items-center justify-center shrink-0">
                                        <IconCheck size={16} className="text-teal-600" strokeWidth={3} />
                                    </div>
                                    <p className="text-xs font-bold text-slate-600 leading-relaxed">
                                        Linked with <strong>NSDL</strong>, <strong>WES</strong>, and <strong>100+ NBFCs</strong> for seamless approval
                                    </p>
                                </div>
                            </div>
                        </div>
                    </motion.div>
                </div>
            </div>

            {/* EducationLoanForm is now managed in parent page.tsx */}
            {/* {showForm && <EducationLoanForm onClose={() => setShowForm(false)} />} */}
        </section>
    );
}
