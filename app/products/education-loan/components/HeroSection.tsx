'use client';

import { motion } from 'framer-motion';
import {
    IconSchool, IconArrowRight, IconCheck, IconStar
} from '@tabler/icons-react';

const stats = [
    { label: 'Students Funded', value: '50,000+' },
    { label: 'Loan Disbursed', value: '₹2,000 Cr+' },
];



export default function HeroSection({ onApplyClick }: { onApplyClick: () => void }) {
    return (
        <section className="relative min-h-[85vh] flex items-center bg-white overflow-hidden pt-8 pb-16">
            <div className="max-w-6xl mx-auto px-4 md:px-12 lg:px-24 mb-5">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">

                    {/* Left: Content */}
                    <motion.div
                        initial={{ opacity: 0, x: -40 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.8 }}
                        className="space-y-6 flex flex-col items-center lg:items-start text-center lg:text-left"
                    >
                        <div className="inline-flex items-center gap-2 px-4 py-2 bg-slate-20 border rounded-full text-[10px] font-black uppercase tracking-widest shadow-sm mt-8" style={{ color: '#2076C7', borderColor: 'rgba(32, 118, 199, 0.2)' }}>
                            <IconSchool size={12} />
                            Education Loan • Infinity Arthvishva
                        </div>
                        <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-extrabold mb-4 sm:mb-6 leading-tight" style={{
                            background: 'linear-gradient(to right, #2076C7, #1CADA3, #2076C7)',
                            WebkitBackgroundClip: 'text',
                            WebkitTextFillColor: 'transparent',
                            backgroundClip: 'text'
                        }}>
                            Fund Your
                            <br />
                            Dream Education
                        </h1>
                        <p className="text-lg sm:text-xl mb-6 text-gray-600 leading-relaxed max-w-lg">
                            Get education loans starting from ₹5,00,000 to ₹1.5 Cr+ for top institutions in India and abroad. Quick disbursal, flexible repayment, and tax benefits.
                        </p>



                        {/* CTAs */}
                        <div className="flex flex-col sm:flex-row gap-4">
                            <button
                                onClick={onApplyClick}
                                className="group relative text-white px-8 py-4 rounded-lg font-semibold text-lg shadow-lg hover:shadow-xl transform hover:-translate-y-1 transition-all duration-300 overflow-hidden cursor-pointer" style={{ background: 'linear-gradient(to right, #1CADA3, #2076C7)' }}
                            >
                                <span className="relative z-10 flex items-center justify-center gap-1">
                                    Apply Now 
                                </span>
                                <div className="absolute inset-0 transform scale-x-0 group-hover:scale-x-100 transition-transform origin-left duration-300" style={{ background: 'linear-gradient(to right, #189B8D, #1A68B0)' }}></div>
                            </button>
                            <a
                                href="#eligibility"
                                className="group relative bg-white px-7 py-1.5 rounded-lg font-semibold text-lg border-2 hover:bg-blue-50 transform hover:-translate-y-1 transition-all duration-300 shadow-md hover:shadow-lg flex items-center justify-center gap-1 transition-all"
                                style={{ color: '#2076C7', borderColor: '#2076C7' }}
                            >
                                <span className="relative z-10 flex items-center justify-center gap-1">
                                    Check Eligibility
                                    <IconArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
                                </span>
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
                        <div className="absolute -inset-4 bg-linear-to-br from-blue-50/10 to-teal-50/10 rounded-[3rem] blur-2xl" />
                        <div className="relative bg-white rounded-[2.5rem] p-8 border-2 shadow-xl" style={{ borderColor: '#c1dfe3ff' }}>
                            <div className="text-center mb-8">
                                <div className="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-br from-[#2076C7] to-[#1CADA3] rounded-3xl mb-4 shadow-lg">
                                    <IconSchool size={40} strokeWidth={1.5} className="text-white" />
                                </div>
                                <p className="text-slate-400 font-bold text-sm uppercase tracking-widest">Trusted by Students Across India</p>
                            </div>

                            <div className="grid grid-cols-2 gap-6">
                                {stats.map((s) => (
                                    <div key={s.label} className="text-center p-4 bg-slate-50 rounded-2xl border border-blue-100 shadow-sm">
                                        <div className="text-2xl font-extrabold mb-1 tracking-tight" style={{ color: '#2076C7' }}>{s.value}</div>
                                        <div className="text-[10px] font-black text-slate-500 uppercase tracking-widest">{s.label}</div>
                                    </div>
                                ))}
                            </div>

                            <div className="mt-6 p-4 rounded-2xl shadow-sm border" style={{ background: 'linear-gradient(to right, rgba(28, 173, 163, 0.05), rgba(32, 118, 199, 0.05))', borderColor: 'rgba(32, 118, 199, 0.2)' }}>
                                <div className="flex items-center gap-3">
                                    <div className="w-8 h-8 rounded-xl flex items-center justify-center shrink-0" style={{ backgroundColor: 'rgba(28, 173, 163, 0.1)' }}>
                                        <IconCheck size={16} style={{ color: '#1CADA3' }} strokeWidth={3} />
                                    </div>
                                    <p className="text-xs font-bold text-slate-600 leading-relaxed">
                                        Linked with <strong style={{ color: '#2076C7' }}>NSDL</strong>, <strong style={{ color: '#2076C7' }}>WES</strong>, and <strong style={{ color: '#2076C7' }}>100+ NBFCs</strong> for seamless approval
                                    </p>
                                </div>
                            </div>
                        </div>
                    </motion.div>
                </div>
            </div>
        </section>
    );
}
