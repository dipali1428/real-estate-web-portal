'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { IconCheck, IconX, IconArrowRight, IconShieldCheck, IconChevronDown, IconChevronUp } from '@tabler/icons-react';
import { useModal } from '../../../context/ModalContext';

const coverageTypes = [
    // ... items 1-9
    {
        animal: 'Cow (Indigenous/Crossbreed)',
        maxCover: '₹50,000',
        premium: '₹400 – ₹1,200/yr',
        covered: ['Accidental Death', 'Disease', 'Natural Calamity', 'Surgical Operation', 'Lightning Strike'],
        notCovered: ['Willful Injury', 'War/Nuclear Risk', 'Animals Over Age Limit'],
        color: 'border-blue-100',
        badge: 'bg-blue-100 text-blue-700',
        bg: 'bg-blue-50/30'
    },
    {
        animal: 'Buffalo',
        maxCover: '₹60,000',
        premium: '₹465 – ₹1,500/yr',
        covered: ['Accidental Death', 'Disease', 'Natural Calamity', 'Surgical Operation', 'Transit Risk'],
        notCovered: ['Willful Injury', 'Pre-existing Condition', 'Non-empaneled Vet Cases'],
        color: 'border-blue-100',
        badge: 'bg-blue-100 text-blue-700',
        bg: 'bg-blue-50/30'
    },
    {
        animal: 'Bullock',
        maxCover: '₹60,000',
        premium: '₹300 – ₹500/yr',
        covered: ['Accidental Death', 'Permanent Disability', 'Natural Calamity', 'Snake Bite'],
        notCovered: ['Theft', 'Intentional Neglect', 'Age Exceeding 12 Years'],
        color: 'border-blue-100',
        badge: 'bg-blue-100 text-blue-700',
        bg: 'bg-blue-50/30'
    },
    {
        animal: 'Heifer',
        maxCover: '₹70,000',
        premium: '₹300 – ₹600/yr',
        covered: ['Accidental Death', 'Permanent Disability', 'Natural Calamity', 'Snake Bite'],
        notCovered: ['Theft', 'Intentional Neglect', 'Age Exceeding 12 Years'],
        color: 'border-blue-100',
        badge: 'bg-blue-100 text-blue-700',
        bg: 'bg-blue-50/30'

    },
    {
        animal: 'Goat',
        maxCover: '₹10,000',
        premium: '₹25 – ₹100/yr',
        covered: ['Accidental Death', 'Permanent Disability', 'Natural Calamity', 'Snake Bite'],
        notCovered: ['Theft', 'Intentional Neglect', 'Age Exceeding 12 Years'],
        color: 'border-blue-100',
        badge: 'bg-blue-100 text-blue-700',
        bg: 'bg-blue-50/30'

    },
    {
        animal: 'Sheep',
        maxCover: '₹8,000',
        premium: '₹20– ₹800/yr',
        covered: ['Accidental Death', 'Epidemic Disease', 'Natural Calamity', 'Predator Attack'],
        notCovered: ['Theft (standalone)', 'Non-vaccination animals', 'Age below 3 months'],
        color: 'border-blue-100',
        badge: 'bg-blue-100 text-blue-700',
        bg: 'bg-blue-50/30'
    },
    {
        animal: 'Pig',
        maxCover: '₹10,000',
        premium: '₹50 – ₹200/yr',
        covered: ['Accidental Death', 'Swine Fever', 'Natural Disasters', 'Surgical Operations'],
        notCovered: ['Malnutrition', 'Failure to Vaccinate', 'Animals over 5 years'],
        color: 'border-blue-100',
        badge: 'bg-blue-100 text-blue-700',
        bg: 'bg-blue-50/30'
    },
    {
        animal: 'Horse',
        maxCover: '₹50,000',
        premium: '₹400 – ₹1,000/yr',
        covered: ['Accidental Death', 'Disease/Sickness', 'Colic/Strangles', 'Natural Calamity'],
        notCovered: ['Racing/Hunting Injuries', 'Surgical expenses only', 'Underweight animals'],
        color: 'border-blue-100',
        badge: 'bg-blue-100 text-blue-700',
        bg: 'bg-blue-50/30'
    },
    {
        animal: 'Mule',
        maxCover: '₹30,000',
        premium: '₹300 – ₹800/yr',
        covered: ['Accidental Death', 'Disease/Sickness', 'Colic/Strangles', 'Natural Calamity'],
        notCovered: ['Racing/Hunting Injuries', 'Surgical expenses only', 'Underweight animals'],
        color: 'border-blue-100',
        badge: 'bg-blue-100 text-blue-700',
        bg: 'bg-blue-50/30'
    },
];

export default function CoverageTypes() {
    const { openLogin } = useModal();
    const [showAll, setShowAll] = useState(false);

    const visiblePlans = showAll ? coverageTypes : coverageTypes.slice(0, 3);

    return (
        <section id="coverage" className="py-8 bg-white relative">
            <div className="max-w-6xl mx-auto px-4 sm:px-6 py-4 md:px-12">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.7 }}
                    className="text-center mb-10"
                >
                    <h2 className="text-3xl md:text-4xl font-extrabold mb-3 bg-linear-to-r from-[#2076C7] to-[#1CADA3] bg-clip-text text-transparent drop-shadow-sm">
                        Comprehensive Protection Plans
                    </h2>
                    <p className="text-slate-500 max-w-2xl mx-auto text-base md:text-lg mt-6 font-medium leading-relaxed px-4 md:px-0">
                        Choose coverage based on the type of livestock you own. All plans are backed by IRDA-approved insurers with direct bank settlement.
                    </p>
                </motion.div>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 md:gap-8">
                    {visiblePlans.map((plan, i) => (
                        <motion.div
                            key={plan.animal}
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.5, delay: i * 0.1 }}
                            className={`bg-white rounded-[2rem] border-2 ${plan.color} shadow-[0_20px_50px_-12px_rgba(32,118,199,0.08)] overflow-hidden hover:shadow-[0_40px_80px_-16px_rgba(32,118,199,0.15)] hover:-translate-y-2 transition-all duration-500 flex flex-col relative group`}
                        >
                            <div className={`p-4 sm:p-6 bg-white border-b border-slate-100 relative overflow-hidden flex flex-col items-center text-center`}>
                                <div className="bg-blue-50/50 py-3 px-6 rounded-2xl w-full flex flex-col items-center mb-4 relative z-10 font-sans border border-blue-100/30">
                                    <span className="text-2xl font-black text-[#2076C7] tracking-tight">{plan.animal.split(' (')[0]}</span>
                                    {plan.animal.includes('(') && (
                                        <span className="text-[11px] font-bold text-blue-500 uppercase tracking-[0.2em]">({plan.animal.split('(')[1]}</span>
                                    )}
                                </div>
                                <div className={`inline-flex items-center gap-2 px-3 py-1.5 rounded-full text-[11px] font-black tracking-widest uppercase mb-4 relative z-10 shadow-sm bg-blue-50 text-blue-700 border border-blue-100 backdrop-blur-sm`}>
                                    <IconShieldCheck size={16} />
                                    Limit: {plan.maxCover}
                                </div>
                                <div className="bg-slate-50 rounded-xl p-3 w-full border border-slate-100 shadow-inner relative z-10">
                                    <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest block mb-0.5">Annual Premium</span>
                                    <span className="text-slate-700 text-lg font-black">{plan.premium}</span>
                                </div>
                            </div>

                            {/* Card Content: flex-col so button is naturally pushed to bottom */}
                            <div className="p-4 sm:p-6 space-y-5 flex flex-col flex-1">
                                <div className="space-y-4">
                                    <div className="flex items-center justify-between">
                                        <div className="text-xs font-black text-slate-900 uppercase tracking-[0.15em]">Included Benefits</div>
                                        <div className="w-12 h-1 bg-teal-500/20 rounded-full"></div>
                                    </div>
                                    <ul className="grid grid-cols-1 gap-3">
                                        {plan.covered.slice(0, 4).map((item) => (
                                            <li key={item} className="flex items-center gap-3 text-sm text-slate-600 font-bold group/item">
                                                <div className="w-7 h-7 rounded-lg bg-teal-50 flex items-center justify-center shrink-0 group-hover/item:bg-[#1CADA3] group-hover/item:text-white transition-all duration-300 shadow-sm">
                                                    <IconCheck size={14} strokeWidth={3} className="text-[#1CADA3] group-hover/item:text-white" />
                                                </div>
                                                <span className="group-hover/item:text-slate-900 transition-colors">{item}</span>
                                            </li>
                                        ))}
                                    </ul>
                                </div>

                                <div className="pt-3 border-t border-slate-100 flex items-center gap-2 flex-wrap">
                                    <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider shrink-0">Exclusions:</span>
                                    {plan.notCovered.slice(0, 3).map((item) => (
                                        <span key={item} className="inline-flex items-center gap-1 px-2 py-0.5 rounded bg-slate-50 text-[10px] text-slate-500 font-semibold border border-slate-100">
                                            <IconX size={10} className="text-red-300" strokeWidth={3} />
                                            {item}
                                        </span>
                                    ))}
                                </div>

                                {/* Apply Now Button — in natural flow, always below exclusions */}
                                <div className="mt-auto pt-4">
                                    <button
                                        onClick={openLogin}
                                        className="w-full py-4 px-6 rounded-xl bg-linear-to-r from-[#2076C7] to-[#1CADA3] text-white text-xs font-black uppercase tracking-widest flex items-center justify-center gap-2 transition-all shadow-[0_10px_30px_-10px_rgba(32,118,199,0.5)] hover:shadow-[0_20px_50px_-12px_rgba(32,118,199,0.6)] hover:scale-[1.02] active:scale-[0.98] group/btn overflow-hidden relative"
                                    >
                                        <span className="relative z-10">Apply Now</span>
                                        <IconArrowRight size={20} strokeWidth={3} className="relative z-10 group-hover/btn:translate-x-1 transition-transform" />
                                        <div className="absolute inset-0 bg-white/20 translate-y-full group-hover/btn:translate-y-0 transition-transform duration-300"></div>
                                    </button>
                                </div>
                            </div>
                        </motion.div>
                    ))}
                </div>

                {/* View More Plans Toggle */}
                <div className="mt-12 flex justify-center">
                    <button
                        onClick={() => setShowAll(!showAll)}
                        className="group flex items-center gap-2 px-8 py-3 rounded-full bg-white border-2 border-slate-100 text-[#2076C7] font-black uppercase tracking-widest text-xs hover:border-[#2076C7]/30 hover:bg-blue-50/50 transition-all active:scale-95 shadow-lg shadow-slate-200/50"
                    >
                        {showAll ? (
                            <>Show Fewer Plans <IconChevronUp size={18} className="translate-y-[-1px]" /></>
                        ) : (
                            <>View More Plans <IconChevronDown size={18} className="translate-y-[1px]" /></>
                        )}
                    </button>
                </div>
            </div>
        </section >
    );
}
