'use client';

import { motion } from 'framer-motion';
import { 
    Building,
    ShoppingCart, 
    CreditCard, 
    CheckCircle,
    ArrowUpRight,
    Package
} from 'lucide-react';

const steps = [
    { 
        icon: Building, 
        title: 'Select Company', 
        desc: 'Browse and choose from our curated list of high-growth pre-IPO companies based on your investment goals.', 
        color: 'bg-blue-50 text-blue-600' 
    },
    { 
        icon: ShoppingCart, 
        title: 'Buy Shares', 
        desc: 'Select the number of shares you wish to purchase and review the investment amount before proceeding.', 
        color: 'bg-indigo-50 text-indigo-600' 
    },
    { 
        icon: CreditCard, 
        title: 'Transaction & Payment', 
        desc: 'Complete the payment securely via our integrated payment gateway or direct bank transfer with ESCROW protection.', 
        color: 'bg-teal-50 text-teal-600' 
    },
    { 
        icon: Package, 
        title: 'Demat Transfer', 
        desc: 'Shares are transferred to your Demat account within 24-48 hours after successful payment verification.', 
        color: 'bg-sky-50 text-sky-600' 
    },
    { 
        icon: CheckCircle, 
        title: 'Confirmation & Updates', 
        desc: 'Receive email confirmation and regular updates on your investment portfolio performance.', 
        color: 'bg-emerald-50 text-emerald-600' 
    },
];

export default function InvestmentProcess() {
    return (
        <section className="w-full bg-white py-20 md:py-28 overflow-hidden">
            <div className="max-w-[1440px] mx-auto px-4 sm:px-6">
                
                {/* Section Header */}
                <motion.div 
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6 }}
                    className="text-center mb-16 md:mb-24"
                >
                    <span className="text-[#2076C7] font-black tracking-[0.2em] uppercase text-[10px] sm:text-xs mb-4 block">
                        How It Works
                    </span>
                    <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold mb-6 bg-gradient-to-r from-[#2076C7] to-[#1CADA3] bg-clip-text text-transparent tracking-tight">
                        Simple Steps to Start Investing
                    </h2>
                    <p className="text-sm sm:text-base text-gray-600 max-w-2xl mx-auto mb-6">
                        Get started with unlisted shares in just a few simple steps
                    </p>
                    <div className="w-24 h-1 mx-auto bg-gradient-to-r from-[#2076C7] to-[#1CADA3] rounded-full opacity-30" />
                </motion.div>

                {/* Steps Grid - Responsive layout */}
                <div className="relative grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-8 lg:gap-6">
                    
                    {/* Visual Connector Line (Hidden on Mobile) */}
                    <div className="hidden lg:block absolute top-16 left-[10%] right-[10%] h-0.5 bg-gradient-to-r from-[#2076C7] to-[#1CADA3] opacity-10" />
                    
                    {steps.map((step, i) => {
                        const Icon = step.icon;
                        const isLast = i === steps.length - 1;
                        
                        return (
                            <motion.div 
                                key={i}
                                initial={{ opacity: 0, y: 30 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: i * 0.15, duration: 0.5 }}
                                className="relative flex flex-col items-center text-center group"
                            >
                                {/* Icon Container with Hover Effects */}
                                <div className={`relative mb-6 md:mb-8`}>
                                    <div className={`w-20 h-20 md:w-24 md:h-24 ${step.color} rounded-2xl md:rounded-[2rem] flex items-center justify-center shadow-lg group-hover:shadow-xl group-hover:scale-110 transition-all duration-500 relative z-10 border-2 border-white`}>
                                        <Icon size={32} strokeWidth={1.5} className="md:w-[38px] md:h-[38px]" />
                                    </div>
                                    
                                    {/* Step Number Badge */}
                                    <div className="absolute -top-3 -right-3 w-8 h-8 bg-white border-2 border-[#2076C7]/20 rounded-full flex items-center justify-center shadow-md z-20 group-hover:scale-110 group-hover:bg-[#2076C7] transition-all duration-300">
                                        <span className="text-xs font-black text-[#2076C7] group-hover:text-white transition-colors duration-300">
                                            {i + 1}
                                        </span>
                                    </div>

                                    {/* Connector Arrow for Desktop (except last) */}
                                    {!isLast && (
                                        <div className="hidden xl:block absolute -right-8 top-8 text-[#2076C7]/20">
                                            <ArrowUpRight size={32} strokeWidth={1} />
                                        </div>
                                    )}
                                </div>

                                {/* Content */}
                                <h3 className="text-lg md:text-xl font-black text-slate-800 mb-3 group-hover:text-[#2076C7] transition-colors duration-300">
                                    {step.title}
                                </h3>
                                <p className="text-xs sm:text-sm text-slate-500 font-medium leading-relaxed px-2 max-w-[250px]">
                                    {step.desc}
                                </p>

                                {/* Mobile Connector (Vertical) */}
                                {i < steps.length - 1 && (
                                    <div className="block md:hidden w-0.5 h-8 bg-gradient-to-b from-[#2076C7] to-[#1CADA3] opacity-20 my-4" />
                                )}
                            </motion.div>
                        );
                    })}
                </div>

                {/* Bottom CTA */}
                <motion.div 
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.8 }}
                    className="text-center mt-16 md:mt-20"
                >
                    <div className="inline-flex items-center gap-2 px-4 py-2 bg-blue-50 rounded-full">
                        <span className="w-2 h-2 bg-[#1CADA3] rounded-full animate-pulse" />
                        <span className="text-xs font-black text-[#2076C7] uppercase tracking-wider">
                            Start your investment journey today
                        </span>
                    </div>
                </motion.div>
            </div>
        </section>
    );
}