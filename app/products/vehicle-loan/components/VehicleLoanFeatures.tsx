"use client";

import { motion } from "framer-motion";
import {
    Percent,
    Banknote,
    Clock,
    FileText,
    ShieldCheck,
    CarFront,
    ChevronRight,
} from "lucide-react";
import React from 'react';

const features = [
    {
        title: "Up to 100% Financing",
        description: "Get funding up to the full on-road price of your vehicle, minimizing your initial out-of-pocket expenses.",
        icon: <CarFront className="text-teal-500" />,
        bg: "bg-teal-50"
    },
    {
        title: "Lowest Interest Rates",
        description: "Enjoy competitive interest rates starting from 8.5% p.a., ensuring your EMIs are affordable.",
        icon: <Percent className="text-teal-600" />,
        bg: "bg-teal-50"
    },
    {
        title: "Flexible Repayment",
        description: "Choose a repayment tenure ranging from 12 to 84 months, tailored to suit your financial comfort.",
        icon: <Clock className="text-teal-600" />,
        bg: "bg-teal-50"
    },
    {
        title: "Zero Pre-closure Charges",
        description: "Prepay your loan anytime after the initial lock-in period without incurring extra penalties.",
        icon: <Banknote className="text-teal-600" />,
        bg: "bg-teal-50"
    },
    {
        title: "Minimal Documentation",
        description: "Experience a hassle-free, fully digital application process with basic KYC and income proofs.",
        icon: <FileText className="text-teal-600" />,
        bg: "bg-teal-50"
    },
    {
        title: "Secure & Transparent",
        description: "No hidden charges or surprise fees. Get complete clarity on processing fees and terms upfront.",
        icon: <ShieldCheck className="text-teal-600" />,
        bg: "bg-teal-50"
    }
];

export default function VehicleLoanFeatures() {
    return (
        <section className="py-16 md:py-20 bg-white relative overflow-hidden font-sans">
            <div className="container mx-auto px-4 md:px-6 relative z-10">
                <div className="text-center max-w-3xl mx-auto mb-12 md:mb-16">
                    <motion.h2
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="text-3xl md:text-4xl font-extrabold mb-3 bg-linear-to-r from-[#2076C7] to-[#1CADA3] bg-clip-text text-transparent drop-shadow-sm"
                    >
                        Why Choose Our Vehicle Loans?
                    </motion.h2>
                    <motion.p
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.1 }}
                        className="text-gray-600 max-w-2xl mx-auto text-lg leading-relaxed"
                    >
                        We make bringing your dream vehicle home simple, affordable, and incredibly fast. Discover the advantages of financing with us.
                    </motion.p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
                    {features.map((feature, index) => (
                        <motion.div
                            key={index}
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.5, delay: index * 0.1 }}
                            className="group relative h-full"
                        >
                            <div className="relative p-7 rounded-[2.25rem] bg-white border border-gray-200 shadow-lg hover:shadow-2xl hover:shadow-[#2076C7]/15 transition-all duration-500 overflow-hidden flex flex-col items-center text-center h-full">
                                <div className={`w-16 h-16 rounded-full bg-linear-to-r from-[#2076C7] to-[#1CADA3] flex items-center justify-center mb-6 relative z-10 group-hover:scale-110 transition-all duration-500 shadow-md`}>
                                    {React.cloneElement(feature.icon as any, { size: 28, className: "text-white" })}
                                </div>

                                <h3 className="text-lg font-bold mb-3 text-gray-900 group-hover:text-[#2076C7] transition-colors relative z-10">
                                    {feature.title}
                                </h3>

                                <p className="text-gray-800 font-medium leading-relaxed text-sm relative z-10 group-hover:text-gray-900 mb-5">
                                    {feature.description}
                                </p>

                                <div className="mt-auto flex items-center gap-2 text-xs font-bold text-[#2076C7] group-hover:text-[#1CADA3] transition-all duration-300 relative z-10">
                                    Learn More <ChevronRight size={14} className="group-hover:translate-x-1 transition-transform" />
                                </div>

                                {/* Hover Glow Effect */}
                                <div className="absolute inset-0 bg-linear-to-br from-[#2076C7]/0 via-transparent to-[#1CADA3]/0 opacity-0 group-hover:opacity-10 transition-opacity duration-500 pointer-events-none" />
                            </div>
                        </motion.div>
                    ))}
                </div>

                {/* Call to Action Banner */}
                <div className="mt-14 p-10 rounded-[3rem] bg-linear-to-br from-[#2076C7] to-[#1CADA3] text-white overflow-hidden relative group max-w-6xl mx-auto">
                    <div className="absolute top-0 right-0 w-80 h-80 bg-white/10 rounded-full blur-3xl -mr-40 -mt-40 group-hover:scale-110 transition-transform duration-700" />
                    <div className="absolute bottom-0 left-0 w-64 h-64 bg-black/10 rounded-full blur-3xl -ml-32 -mb-20 group-hover:scale-110 transition-transform duration-700" />

                    <div className="relative z-10 flex flex-col items-center text-center lg:flex-row lg:items-center lg:text-left lg:justify-between gap-8 sm:gap-10">
                        <div className="max-w-2xl w-full">
                            <h3 className="text-3xl md:text-4xl font-extrabold mb-3 bg-linear-to-r from-white to-white bg-clip-text text-transparent drop-shadow-sm">Start Your Engine Today</h3>
                            <p className="text-blue-50 text-lg leading-relaxed opacity-90 font-normal">Join thousands of customers who have driven home their dream vehicles with our seamless financing process.</p>
                        </div>
                        <div className="flex flex-wrap justify-center gap-6 sm:gap-8 shrink-0">
                            <div className="text-center">
                                <div className="text-3xl sm:text-4xl font-extrabold mb-1">5Lakh+</div>
                                <div className="text-blue-100 text-sm font-semibold uppercase tracking-wider">Vehicles Financed</div>
                            </div>
                            <div className="w-px h-12 bg-white/20 hidden sm:block" />
                            <div className="text-center">
                                <div className="text-3xl sm:text-4xl font-extrabold mb-1">4.9/5</div>
                                <div className="text-blue-100 text-sm font-semibold uppercase tracking-wider">Customer Rating</div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}
