"use client";

import { useState } from 'react';
import { CheckCircle, ChevronDown, ArrowRight, Home } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

import { HOME_LOAN_TYPES } from '../loanConstants';

const IconMap: Record<string, any> = {
    Home,
    Building2: (props: any) => (
        <svg {...props} fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
        </svg>
    ),
    Repeat: (props: any) => (
        <svg {...props} fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
        </svg>
    ),
    Wrench: (props: any) => (
        <svg {...props} fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
        </svg>
    ),
    Construction: (props: any) => (
        <svg {...props} fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21l-7-5-7 5V5a2 2 0 012-2h10a2 2 0 012 2v16z" />
        </svg>
    ),
    Building: (props: any) => (
        <svg {...props} fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 14v3m4-3v3m4-3v3M3 21h18M3 10h18M3 7l9-4 9 4M4 10h16v11H4V10z" />
        </svg>
    ),
};

interface LoanTypesSectionProps {
    onApply: () => void;
}

export default function LoanTypesSection({ onApply }: LoanTypesSectionProps) {
    const [showMoreLoans, setShowMoreLoans] = useState(false);

    return (
        <section className="py-8 md:py-12 bg-white relative overflow-hidden">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <motion.div
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true }}
                    className="text-center mb-10"
                >
                    <motion.h2 className="text-3xl md:text-4xl font-extrabold font-sans mb-3 bg-linear-to-r from-[#2076C7] to-[#1CADA3] bg-clip-text text-transparent drop-shadow-sm">
                        Choose Your Home Loan
                    </motion.h2>
                    <motion.p className="text-xl text-gray-500 max-w-3xl mx-auto font-light leading-relaxed">
                        We offer a wide range of home loan solutions tailored to meet your financial needs. Choose the right option based on your property and requirements.
                    </motion.p>
                </motion.div>

                <div className="space-y-8">
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 relative">
                        {/* SVG Gradient Definition for Icons */}
                        <svg width="0" height="0" className="absolute">
                            <defs>
                                <linearGradient id="card-icon-gradient" x1="0%" y1="0%" x2="100%" y2="0%">
                                    <stop offset="0%" stopColor="#2076C7" />
                                    <stop offset="50%" stopColor="#1CADA3" />
                                    <stop offset="100%" stopColor="#2076C7" />
                                </linearGradient>
                            </defs>
                        </svg>

                        {HOME_LOAN_TYPES.slice(0, 3).map((type, index) => {
                            const IconComponent = IconMap[type.icon] || Home;
                            return (
                                <div key={index} className="h-full">
                                    <motion.div
                                        initial={{ opacity: 0, y: 30 }}
                                        whileInView={{ opacity: 1, y: -4 }}
                                        viewport={{ once: true }}
                                        transition={{ delay: index * 0.1 }}
                                        className="group relative bg-white rounded-[2.5rem] p-6 border border-gray-200/50 shadow-xl transition-all duration-500 flex flex-col h-full overflow-hidden items-center text-center"
                                    >
                                        <div className="absolute top-0 right-0 w-16 h-16 bg-[#F8FAFC] rounded-bl-[1.5rem] -mr-8 -mt-8" />

                                        <div className="self-center mb-4 w-14 h-14 rounded-2xl bg-linear-to-r from-[#2076C7] via-[#1CADA3] to-[#2076C7] flex items-center justify-center shrink-0">
                                            <IconComponent className="w-7 h-7 text-white" />
                                        </div>

                                        <h3 className="text-xl font-extrabold font-sans text-gray-800 leading-tight mb-2 text-center w-full">
                                            {type.title}
                                        </h3>

                                        <p className="text-gray-500 mb-4 leading-relaxed text-sm text-center w-full">
                                            {type.description}
                                        </p>

                                        <div className="space-y-6 flex-grow w-full max-w-[280px] mx-auto">
                                            <div className="space-y-1.5 text-left">
                                                <span className="text-[10px] font-black text-[#2076C7] uppercase tracking-[0.1em]">Best For:</span>
                                                <p className="text-sm text-gray-600 font-medium leading-relaxed">{type.bestFor}</p>
                                            </div>

                                            <div className="space-y-2.5 text-left">
                                                <span className="text-[10px] font-black text-[#1CADA3] uppercase tracking-[0.1em]">Benefits:</span>
                                                <ul className="space-y-2">
                                                    {type.benefits.map((benefit, i) => (
                                                        <li key={i} className="flex items-start gap-3 text-sm text-gray-600">
                                                            <CheckCircle className="w-4 h-4 text-[#2076C7] mt-0.5 shrink-0" />
                                                            <span className="font-medium">{benefit}</span>
                                                        </li>
                                                    ))}
                                                </ul>
                                            </div>
                                        </div>

                                        <button
                                            onClick={onApply}
                                            className="mt-8 relative inline-flex items-center justify-center gap-3 px-8 py-4 bg-linear-to-r from-[#2076C7] via-[#1CADA3] to-[#2076C7] text-white rounded-2xl font-bold font-sans text-lg overflow-hidden transition-all duration-300 shadow-[0_15px_30px_-10px_rgba(28,173,163,0.4)] self-center group/btn cursor-pointer active:scale-95"
                                        >
                                            <div className="absolute inset-0 bg-white/20 translate-y-full group-hover/btn:translate-y-0 transition-transform duration-300 ease-out" />
                                            <span className="relative z-10 flex items-center gap-2">
                                                Apply Now
                                                <ArrowRight className="w-5 h-5 group-hover/btn:translate-x-1 transition-transform" />
                                            </span>
                                        </button>
                                    </motion.div>
                                </div>
                            );
                        })}
                    </div>

                    {/* Extra Loans */}
                    <AnimatePresence>
                        {showMoreLoans && (
                            <motion.div
                                initial={{ height: 0, opacity: 0 }}
                                animate={{ height: "auto", opacity: 1 }}
                                exit={{ height: 0, opacity: 0 }}
                                transition={{ duration: 0.5, ease: "easeInOut" }}
                                className="overflow-hidden"
                            >
                                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 pt-4 pb-4">
                                    {HOME_LOAN_TYPES.slice(3).map((type, index) => {
                                        const IconComponent = IconMap[type.icon] || Home;
                                        return (
                                            <div key={index + 3} className="h-full">
                                                <motion.div
                                                    initial={{ opacity: 0, scale: 0.95 }}
                                                    animate={{ opacity: 1, scale: 1 }}
                                                    className="group relative bg-white rounded-[2.5rem] p-6 border border-gray-200/50 shadow-xl transition-all duration-500 flex flex-col h-full overflow-hidden items-center text-center"
                                                >
                                                    <div className="absolute top-0 right-0 w-16 h-16 bg-[#F8FAFC] rounded-bl-[1.5rem] -mr-8 -mt-8" />
                                                    <div className="self-center mb-4 w-14 h-14 rounded-2xl bg-linear-to-r from-[#2076C7] via-[#1CADA3] to-[#2076C7] flex items-center justify-center shrink-0">
                                                        <IconComponent className="w-7 h-7 text-white" />
                                                    </div>
                                                    <h3 className="text-xl font-extrabold font-sans text-gray-800 leading-tight mb-2 text-center w-full">{type.title}</h3>
                                                    <p className="text-gray-500 mb-4 leading-relaxed text-sm text-center w-full">{type.description}</p>
                                                    <div className="space-y-6 flex-grow w-full max-w-[280px] mx-auto">
                                                        <div className="space-y-1.5 text-left">
                                                            <span className="text-[10px] font-black text-[#2076C7] uppercase tracking-[0.1em]">Best For:</span>
                                                            <p className="text-sm text-gray-600 font-medium leading-relaxed">{type.bestFor}</p>
                                                        </div>
                                                        <div className="space-y-2.5 text-left">
                                                            <span className="text-[10px] font-black text-[#1CADA3] uppercase tracking-[0.1em]">Benefits:</span>
                                                            <ul className="space-y-2">
                                                                {type.benefits.map((benefit, i) => (
                                                                    <li key={i} className="flex items-start gap-3 text-sm text-gray-600">
                                                                        <CheckCircle className="w-4 h-4 text-[#2076C7] mt-0.5 shrink-0" />
                                                                        <span className="font-medium">{benefit}</span>
                                                                    </li>
                                                                ))}
                                                            </ul>
                                                        </div>
                                                    </div>
                                                    <button
                                                        onClick={onApply}
                                                        className="mt-8 relative inline-flex items-center justify-center gap-3 px-8 py-4 bg-linear-to-r from-[#2076C7] via-[#1CADA3] to-[#2076C7] text-white rounded-2xl font-bold font-sans text-lg overflow-hidden transition-all duration-300 shadow-[0_15px_30px_-10px_rgba(28,173,163,0.4)] self-center group/btn cursor-pointer active:scale-95"
                                                    >
                                                        <div className="absolute inset-0 bg-white/20 translate-y-full group-hover/btn:translate-y-0 transition-transform duration-300 ease-out" />
                                                        <span className="relative z-10 flex items-center gap-2">
                                                            Apply Now
                                                            <ArrowRight className="w-5 h-5 group-hover/btn:translate-x-1 transition-transform" />
                                                        </span>
                                                    </button>
                                                </motion.div>
                                            </div>
                                        );
                                    })}
                                </div>
                            </motion.div>
                        )}
                    </AnimatePresence>

                    {/* View More Toggle Button */}
                    <div className="flex justify-center mt-8">
                        <button
                            onClick={() => setShowMoreLoans(!showMoreLoans)}
                            className="group relative flex items-center gap-3 px-10 py-4 bg-white border-2 border-[#2076C7]/20 hover:border-[#1CADA3] rounded-2xl transition-all duration-300 text-[#2076C7] hover:text-[#1CADA3] font-bold shadow-sm hover:shadow-xl hover:-translate-y-1 cursor-pointer overflow-hidden"
                        >
                            <div className="absolute inset-0 bg-linear-to-r from-[#2076C7]/5 to-[#1CADA3]/5 opacity-0 group-hover:opacity-100 transition-opacity" />
                            <span className="relative z-10">{showMoreLoans ? "Show Less" : "View More Loan Options"}</span>
                            <ChevronDown className={`relative z-10 w-5 h-5 transition-transform duration-500 ${showMoreLoans ? 'rotate-180' : ''}`} />
                        </button>
                    </div>
                </div>
            </div>
        </section>
    );
}
