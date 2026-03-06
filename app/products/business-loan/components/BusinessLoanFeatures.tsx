"use client";

import { motion } from "framer-motion";
import {
    Zap,
    Percent,
    Calendar,
    FileText,
    Clock,
    UserCheck,
    ChevronRight,
} from "lucide-react";
import React from 'react';

const features = [
    {
        title: "Paperless Approval",
        description: "Experience a fully digital application process with 100% paperless documentation.",
        icon: <Zap className="text-amber-500" />,
        bg: "bg-amber-50"
    },
    {
        title: "Competitive Rates",
        description: "Benefit from industry-leading interest rates tailored to your business profile.",
        icon: <Percent className="text-blue-600" />,
        bg: "bg-blue-50"
    },
    {
        title: "Flexible Tenure",
        description: "Repayment periods ranging from 12 to 60 months to suit your cash cycles.",
        icon: <Calendar className="text-[#1CADA3]" />,
        bg: "bg-teal-50"
    },
    {
        title: "Collateral-Free",
        description: "Access funds up to ₹50 Lakhs without the need for security or collateral.",
        icon: <FileText className="text-indigo-600" />,
        bg: "bg-indigo-50"
    },
    {
        title: "Quick Disbursal",
        description: "Funds credited directly to your business account within 48-72 hours.",
        icon: <Clock className="text-emerald-600" />,
        bg: "bg-emerald-50"
    },
    {
        title: "Dedicated Support",
        description: "Get assistance from a relationship manager throughout your loan journey.",
        icon: <UserCheck className="text-rose-600" />,
        bg: "bg-rose-50"
    }
];

export default function BusinessLoanFeatures() {
    return (
        <section className="py-24 bg-white relative overflow-hidden">
            <div className="container mx-auto px-4 md:px-6 relative z-10">
                <div className="text-center max-w-3xl mx-auto mb-20">
                    <motion.h2
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="text-3xl md:text-5xl font-bold mb-6 tracking-tight bg-clip-text text-transparent bg-linear-to-r from-[#2076C7] to-[#1CADA3]"
                    >
                        Why Choose Our Business Loans?
                    </motion.h2>
                    <motion.p
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.1 }}
                        className="text-lg text-gray-500 leading-relaxed font-medium"
                    >
                        We provide more than just capital. We provide the financial agility you need to transform your business goals into reality.
                    </motion.p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-7xl mx-auto">
                    {features.map((feature, index) => (
                        <motion.div
                            key={index}
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.5, delay: index * 0.1 }}
                            className="group relative"
                        >
                            <div className="absolute inset-0 bg-linear-to-br from-[#2076C7]/5 to-[#1CADA3]/5 rounded-[2.5rem] -rotate-1 group-hover:rotate-0 transition-transform duration-500" />
                            <div className="relative p-10 rounded-[2.5rem] border-2 border-gray-100 bg-white/80 backdrop-blur-sm shadow-sm group-hover:shadow-2xl group-hover:shadow-[#2076C7]/10 group-hover:border-[#2076C7]/20 transition-all duration-500 overflow-hidden flex flex-col items-center text-center">
                                {/* Decorative Gradient */}
                                <div className="absolute top-0 right-0 w-32 h-32 bg-linear-to-br from-[#2076C7]/5 to-transparent rounded-full -mr-16 -mt-16 group-hover:scale-150 transition-transform duration-700" />

                                <div className={`w-16 h-16 rounded-2xl ${feature.bg} flex items-center justify-center mb-8 relative z-10 group-hover:scale-110 group-hover:rotate-3 transition-all duration-500 shadow-sm`}>
                                    {React.cloneElement(feature.icon as React.ReactElement<{ size?: number }>, { size: 28 })}
                                </div>

                                <h3 className="text-2xl font-bold text-gray-900 mb-4 group-hover:text-[#2076C7] transition-colors relative z-10">
                                    {feature.title}
                                </h3>

                                <p className="text-gray-600 font-medium leading-relaxed relative z-10 group-hover:text-gray-700">
                                    {feature.description}
                                </p>

                                <div className="mt-8 flex items-center gap-2 text-sm font-bold text-[#2076C7] opacity-0 group-hover:opacity-100 transition-all duration-500 translate-y-4 group-hover:translate-y-0">
                                    Learn More <ChevronRight size={16} />
                                </div>
                            </div>
                        </motion.div>
                    ))}
                </div>

                <div className="mt-14 p-10 rounded-[3rem] bg-linear-to-br from-[#2076C7] to-[#1CADA3] text-white overflow-hidden relative group max-w-7xl mx-auto">
                    <div className="absolute top-0 right-0 w-80 h-80 bg-white/10 rounded-full blur-3xl -mr-40 -mt-40 group-hover:scale-110 transition-transform duration-700" />
                    <div className="absolute bottom-0 left-0 w-64 h-64 bg-black/10 rounded-full blur-3xl -ml-32 -mb-20 group-hover:scale-110 transition-transform duration-700" />

                    <div className="relative z-10 flex flex-col items-center text-center lg:flex-row lg:items-center lg:text-left lg:justify-between gap-8 sm:gap-10">
                        <div className="max-w-2xl w-full">
                            <h3 className="text-3xl font-bold mb-4">Ready to scale your business?</h3>
                            <p className="text-blue-50 text-lg font-medium">Join 50,000+ businesses that have accelerated their growth with our tailored financial solutions.</p>
                        </div>
                        <div className="flex flex-wrap justify-center gap-6 sm:gap-8 shrink-0">
                            <div className="text-center">
                                <div className="text-3xl sm:text-4xl font-extrabold mb-1">₹500Cr+</div>
                                <div className="text-blue-100 text-sm font-semibold uppercase tracking-wider">Disbursed</div>
                            </div>
                            <div className="w-px h-12 bg-white/20 hidden sm:block" />
                            <div className="text-center">
                                <div className="text-3xl sm:text-4xl font-extrabold mb-1">98%</div>
                                <div className="text-blue-100 text-sm font-semibold uppercase tracking-wider">Customer Satisfaction</div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}
