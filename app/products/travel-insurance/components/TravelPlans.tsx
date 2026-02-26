'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
// import Link from 'next/link'; REMOVED
import { useModal } from '@/app/context/ModalContext';
import { IconBackpack, IconBriefcase, IconSchool, IconUsers, IconWorldStar, IconPlane } from '@tabler/icons-react';

const plans = [
    {
        icon: IconBackpack,
        title: 'Single Trip',
        tagline: 'One Trip, Full Coverage',
        desc: 'Perfect for one-off vacations or business trips. Coverage for up to 180 days with comprehensive medical and travel protection.',
        features: ['Medical Coverage up to ₹2 Cr', 'Trip Cancellation 100%', 'Baggage Loss up to ₹50,000', '24/7 Emergency Assistance'],
        price: '₹399',
        duration: 'per trip',
        popular: false,
        gradient: 'from-[#2076C7] to-[#1CADA3]',
    },
    {
        icon: IconBriefcase,
        title: 'Multi-Trip Annual',
        tagline: 'Unlimited Trips, One Plan',
        desc: 'This Plan Ideal for frequent travelers. Cover unlimited trips within a year with each trip up to 45 days long.',
        features: ['Medical Coverage up to ₹4 Cr', 'Unlimited Trips per Year', 'Personal Liability ₹8 Cr', 'Flight Delay Compensation'],
        price: '₹2,499',
        duration: 'per year',
        popular: true,
        gradient: 'from-[#2076C7] to-[#1CADA3]',
    },
    {
        icon: IconSchool,
        title: 'Student Travel',
        tagline: 'Study Abroad, Stay Safe',
        desc: 'Tailored coverage for students studying abroad. Extended stays up to 2 years with academic activity coverage.',
        features: ['Extended Stay Coverage', 'Tuition Fee Protection', 'Sponsor Protection Benefit', 'Mental Health Support'],
        price: '₹4,999',
        duration: 'per year',
        popular: false,
        gradient: 'from-[#2076C7] to-[#1CADA3]',
    },
    {
        icon: IconUsers,
        title: 'Family Floater',
        tagline: 'Protect Your Whole Family',
        desc: 'One plan for the entire family. Cover spouse and up to 3 dependent children under a single policy.',
        features: ['Family Medical Cover ₹6 Cr', 'Child-Specific Benefits', 'Maternity Emergency Cover', 'Adventure Sports Add-on'],
        price: '₹3,799',
        duration: 'per trip',
        popular: false,
        gradient: 'from-[#2076C7] to-[#1CADA3]',
    },
];

export default function InsuranceTypes() {
    const { openPartner } = useModal();
    const [hoveredIdx, setHoveredIdx] = useState<number | null>(null);

    return (
        <section id="plans" className="py-12 px-6 bg-white">
            <div className="max-w-7xl mx-auto">
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="flex flex-col items-center text-center mb-12 gap-6 mx-auto"
                >
                    <div className="max-w-3xl">
                        <span className="text-primary-blue font-bold tracking-widest uppercase text-sm">Our Plans</span>
                          <h2 className="text-3xl md:text-4xl font-extrabold mb-3 bg-linear-to-r from-[#2076C7] to-[#1CADA3] bg-clip-text text-transparent drop-shadow-sm">
                              Tailored for Every Traveler
                    </h2>
                        <p className="text-base md:text-lg text-slate-500 mt-4 px-4 md:px-0">
                            Choose the perfect plan for your journey. Each plan includes 24/7 support and hassle-free claims.
                        </p>
                    </div>
                </motion.div>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                    {plans.map((plan, idx) => (
                        <motion.div
                            key={idx}
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: idx * 0.1 }}
                            onMouseEnter={() => setHoveredIdx(idx)}
                            onMouseLeave={() => setHoveredIdx(null)}
                            className="relative overflow-hidden rounded-3xl border-2 border-blue-200 bg-white hover:border-blue-400 transition-all duration-500 shadow-[0_10px_30px_-10px_rgba(32,118,199,0.15)] hover:shadow-[0_20px_50px_-12px_rgba(32,118,199,0.25)] flex flex-col h-full"
                        >
                            <div className="p-8 flex flex-col h-full">
                                <div className="flex items-center gap-4 mb-6">
                                    <div className={`w-14 h-14 rounded-2xl bg-gradient-to-br ${plan.gradient} flex items-center justify-center text-white shadow-lg flex-shrink-0`}>
                                        <plan.icon size={28} />
                                    </div>
                                    {plan.popular && (
                                        <span className="text-[10px] font-black underline decoration-2 underline-offset-4 text-grey-600 uppercase tracking-widest">
                                            (Most Popular)
                                        </span>
                                    )}
                                </div>

                                <h3 className="text-xl md:text-2xl font-extrabold text-[#1CADA3]">{plan.title}</h3>
                                <p className="text-xs md:text-sm text-slate-500 font-medium mt-1">{plan.tagline}</p>
                                <p className="text-sm text-slate-600 mt-4 leading-relaxed min-h-[60px]">{plan.desc}</p>

                                <div className="mt-6 border-t border-slate-100 pt-6">
                                    <div className="flex items-baseline gap-1">
                                        <span className="text-3xl font-extrabold text-slate-900">{plan.price}</span>
                                        <span className="text-sm text-slate-400 font-medium">/{plan.duration}</span>
                                    </div>
                                </div>

                                <ul className="mt-6 space-y-3 flex-grow">
                                    {plan.features.map((f, i) => (
                                        <li key={i} className="flex items-center gap-3 text-sm text-slate-600">
                                            <div className="w-5 h-5 bg-teal-50 text-secondary-teal rounded-full flex items-center justify-center flex-shrink-0">
                                                <svg width="10" height="10" viewBox="0 0 10 10" fill="currentColor"><path d="M8.5 2.5L4 7.5L1.5 5" stroke="currentColor" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round" /></svg>
                                            </div>
                                            {f}
                                        </li>
                                    ))}
                                </ul>

                                <button
                                    onClick={openPartner}
                                    className={`mt-8 w-full block text-center py-3.5 rounded-xl font-bold transition-all ${plan.popular
                                        ? 'bg-linear-to-r from-[#2076C7] to-[#1CADA3] text-white shadow-lg hover:shadow-xl hover:scale-[1.02]'
                                        : 'bg-slate-100 text-slate-700 hover:bg-linear-to-r hover:from-[#2076C7] hover:to-[#1CADA3] hover:text-white'
                                        }`}
                                >
                                    Get This Plan
                                </button>
                            </div>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
}
