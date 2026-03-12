'use client';

import { motion } from 'framer-motion';
import { useState } from 'react';
import { IconCheck, IconExternalLink, IconBackpack, IconBriefcase, IconSchool, IconUsers } from '@tabler/icons-react';
import WaveDivider from './WaveDivider';
import { useModal } from '../../../context/ModalContext';

// --- Providers Data ---
const providers = [
    { name: 'Tata AIG', ratio: '99.01%', network: '7,000+', features: ['COVID-19 Coverage', 'No Sub-limits'], color: 'from-[#1CADA3] to-[#2076C7]', price: '₹24.8/*' },
    { name: 'Bajaj Allianz', ratio: '98.48%', network: '8,000+', features: ['Missed Flight Cover', 'Home Burglary Cover'], color: 'from-[#1CADA3] to-[#2076C7]', price: '₹13/*' },
    { name: 'HDFC ERGO', ratio: '99.85%', network: '1 Lakh+', features: ['Cashless Worldwide', 'No Medical Check-up'], color: 'from-[#1CADA3] to-[#2076C7]', price: '₹25/*' },
    { name: 'Niva Bupa', ratio: '99.99%', network: '10,000+', features: ['Zero Deductible', 'Quick Claim Settlement'], color: 'from-[#1CADA3] to-[#2076C7]', price: '₹20/*' },
    { name: 'Reliance', ratio: '98.65%', network: '8,500+', features: ['Auto-Extension', 'No Med Check'], color: 'from-[#1CADA3] to-[#2076C7]', price: '₹15/*' },
    { name: 'ICICI Lombard', ratio: '99.70%', network: '6,500+', features: ['Adventure Sports', 'Schengen Approved'], color: 'from-[#1CADA3] to-[#2076C7]', price: '₹22/*' },
];

// --- Plans Data ---
const plans = [
    {
        icon: IconBackpack, title: 'Single Trip', tagline: 'One Trip, Full Coverage',
        desc: 'Perfect for one-off vacations or business trips. Coverage for up to 180 days.',
        features: ['Medical up to ₹2 Cr', 'Cancellation 100%', 'Baggage up to ₹50k', '24/7 Support'],
        price: '₹399', duration: 'per trip', popular: false, gradient: 'from-[#2076C7] to-[#1CADA3]',
    },
    {
        icon: IconBriefcase, title: 'Multi-Trip Annual', tagline: 'Unlimited Trips, One Plan',
        desc: 'Ideal for frequent travelers. Cover unlimited trips within a year (up to 45 days each).',
        features: ['Medical up to ₹4 Cr', 'Unlimited Trips', 'Liability ₹8 Cr', 'Flight Delay Cover'],
        price: '₹2,499', duration: 'per year', popular: true, gradient: 'from-[#2076C7] to-[#1CADA3]',
    },
    {
        icon: IconSchool, title: 'Student Travel', tagline: 'Study Abroad, Stay Safe',
        desc: 'Tailored for students. Extended stays up to 2 years with academic activity coverage.',
        features: ['Extended Stays', 'Tuition Protection', 'Sponsor Benefit', 'Mental Health Support'],
        price: '₹4,999', duration: 'per year', popular: false, gradient: 'from-[#2076C7] to-[#1CADA3]',
    },
    {
        icon: IconUsers, title: 'Family Floater', tagline: 'Protect Your Whole Family',
        desc: 'One plan for the entire family. Cover spouse and up to 3 dependent children.',
        features: ['Family Medical ₹6 Cr', 'Child Benefits', 'Maternity Emergency', 'Adventure Sports'],
        price: '₹3,799', duration: 'per trip', popular: false, gradient: 'from-[#2076C7] to-[#1CADA3]',
    },
];

export default function ProvidersAndPlans() {
    const { openLogin } = useModal();

    return (
        <>
            {/* --- PROVIDER COMPARISON --- */}
            <section className="py-12 px-4 sm:px-6 bg-slate-50">
                <div className="max-w-7xl mx-auto">
                    <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="text-center max-w-3xl mx-auto mb-8">
                        <h3 className="text-xl sm:text-2xl md:text-3xl font-black bg-gradient-to-r from-[#2076C7] to-[#1CADA3] bg-clip-text text-transparent inline-block">Compare Top Providers</h3>
                        <div className="w-24 h-1 mx-auto bg-gradient-to-r from-[#2076C7] via-[#1CADA3] to-[#2076C7] rounded-full mt-3 mb-3 opacity-30" />
                        <p className="text-gray-600 font-medium text-base md:text-lg leading-relaxed mt-2">Analyze the best insurance companies in India to choose your right partner.</p>
                    </motion.div>

                    <div className="overflow-x-auto pb-6 custom-scrollbar">
                        <table className="w-full min-w-[800px] border-separate border-spacing-0 bg-white rounded-2xl shadow-xl overflow-hidden border border-slate-100">
                            <thead>
                                <tr className="bg-[#1CADA3]/10 text-slate-800">
                                    <th className="p-4 md:p-6 text-left font-extrabold text-[#1CADA3] text-base">Insurer</th>
                                    <th className="p-4 md:p-6 text-center font-extrabold text-[#1CADA3] text-base">Claim Ratio</th>
                                    <th className="p-4 md:p-6 text-center font-extrabold text-[#1CADA3] text-base">Network</th>
                                    <th className="p-4 md:p-6 text-left font-extrabold text-[#1CADA3] text-base">Key Features</th>
                                    <th className="p-4 md:p-6 text-center font-extrabold text-[#1CADA3] text-base">Price</th>
                                    <th className="p-4 md:p-6 text-center font-extrabold text-[#1CADA3] text-base">Action</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-slate-100">
                                {providers.map((p, idx) => (
                                    <motion.tr key={idx} initial={{ opacity: 0, y: 10 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: idx * 0.1 }} className="hover:bg-slate-50 transition-colors group">
                                        <td className="p-4 md:p-6">
                                            <div className="flex items-center gap-3">
                                                <div className={`w-12 h-12 md:w-14 md:h-14 rounded-xl bg-gradient-to-br ${p.color} text-white flex items-center justify-center font-bold text-lg md:text-xl shadow-md shrink-0`}>{p.name.charAt(0)}</div>
                                                <span className="font-bold text-slate-900 text-base md:text-lg">{p.name}</span>
                                            </div>
                                        </td>
                                        <td className="p-4 md:p-6 text-center"><span className="inline-block px-4 py-1.5 bg-[#1CADA3]/10 text-[#1CADA3] font-bold rounded-full text-sm border border-[#1CADA3]/20">{p.ratio}</span></td>
                                        <td className="p-4 md:p-6 text-center font-semibold text-slate-700 text-base">{p.network}</td>
                                        <td className="p-4 md:p-6">
                                            <div className="flex flex-col gap-2">
                                                {p.features.map((f, i) => (
                                                    <div key={i} className="flex items-center gap-2 text-sm text-slate-600 whitespace-nowrap"><IconCheck size={16} className="text-[#1CADA3] shrink-0" />{f}</div>
                                                ))}
                                            </div>
                                        </td>
                                        <td className="p-4 md:p-6 text-center"><div className="text-xl md:text-2xl font-bold text-slate-900">{p.price}</div><div className="text-xs text-slate-400">per day</div></td>
                                        <td className="p-4 md:p-6 text-center">
                                            <button onClick={openLogin} className="inline-flex items-center justify-center w-10 h-10 rounded-full bg-slate-100 text-slate-600 hover:bg-[#1CADA3] hover:text-white transition-all"><IconExternalLink size={20} /></button>
                                        </td>
                                    </motion.tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            </section>

            {/* --- TAILORED PLANS --- */}
            <section id="plans" className="py-12 px-4 sm:px-6 bg-white">
                <div className="max-w-7xl mx-auto">
                    <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="text-center mb-10 max-w-3xl mx-auto">
                        <h2 className="text-3xl md:text-4xl font-extrabold mb-6 bg-linear-to-r from-[#2076C7] to-[#1CADA3] bg-clip-text text-transparent drop-shadow-sm tracking-tight leading-tight">
                            Tailored Travel Insurance Plans
                        </h2>
                        <p className="text-gray-600 max-w-2xl mx-auto font-medium text-base md:text-lg leading-relaxed">
                            Choose the perfect coverage designed for your specific travel needs, whether it's a quick vacation or a year abroad.
                        </p>
                    </motion.div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                        {plans.map((plan, idx) => (
                            <motion.div key={idx} initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: idx * 0.1 }} className="relative rounded-3xl border-2 border-blue-200 bg-white hover:border-blue-400 transition-all duration-500 shadow-lg hover:shadow-2xl flex flex-col h-full">
                                <div className="p-6 flex flex-col h-full">
                                    <div className="flex items-center gap-4 mb-4">
                                        <div className={`w-12 h-12 rounded-2xl bg-gradient-to-br ${plan.gradient} flex items-center justify-center text-white shadow-lg shrink-0`}><plan.icon size={24} /></div>
                                        {plan.popular && <span className="text-[9px] font-black underline decoration-2 underline-offset-4 text-slate-600 uppercase tracking-widest">(Most Popular)</span>}
                                    </div>
                                    <h3 className="text-lg font-extrabold text-[#1CADA3]">{plan.title}</h3>
                                    <p className="text-[10px] text-slate-500 font-medium mt-0.5">{plan.tagline}</p>
                                    <p className="text-[13px] text-slate-600 mt-3 leading-relaxed min-h-[50px]">{plan.desc}</p>
                                    <div className="mt-6 border-t border-slate-100 pt-6"><div className="flex items-baseline gap-1"><span className="text-3xl font-extrabold text-slate-900">{plan.price}</span><span className="text-sm text-slate-400 font-medium">/{plan.duration}</span></div></div>
                                    <ul className="mt-6 space-y-3 flex-grow">
                                        {plan.features.map((f, i) => (
                                            <li key={i} className="flex items-center gap-3 text-sm text-slate-600">
                                                <div className="w-5 h-5 bg-teal-50 text-teal-600 rounded-full flex items-center justify-center shrink-0"><IconCheck size={12} strokeWidth={3} /></div>{f}
                                            </li>
                                        ))}
                                    </ul>
                                    <button onClick={openLogin} className="mt-8 w-full py-4 rounded-2xl font-black uppercase text-xs md:text-sm transition-all bg-gradient-to-r from-[#1CADA3] to-[#2076C7] text-white shadow-lg hover:scale-[1.02]">Apply Now</button>
                                </div>
                            </motion.div>
                        ))}
                    </div>
                </div>
                <WaveDivider />
            </section>
        </>
    );
}
