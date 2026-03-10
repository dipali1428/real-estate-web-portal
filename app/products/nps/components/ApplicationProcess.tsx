"use client";

import { motion } from "framer-motion";
import { FileText, UserCheck, CreditCard, Send, CheckSquare, Zap, ChevronRight } from 'lucide-react';
import { useModal } from '@/app/context/ModalContext';

const steps = [
    {
        icon: <UserCheck className="w-10 h-10" />,
        title: "Registration",
        desc: "Visit the NPS portal of Infinity Arthvishwa and click on new registration."
    },
    {
        icon: <FileText className="w-10 h-10" />,
        title: "KYC Details",
        desc: "Enter your Aadhaar or PAN details for KYC verification via OTP authentication."
    },
    {
        icon: <CheckSquare className="w-10 h-10" />,
        title: "Fill Application",
        desc: "Provide personal details, bank info, and nomination. Select Pension Fund Manager."
    },
    {
        icon: <CreditCard className="w-10 h-10" />,
        title: "Payment",
        desc: "Make the initial contribution (Min ₹500) through Net Banking/Debit/UPI."
    },
    {
        icon: <Send className="w-10 h-10" />,
        title: "PRAN Generation",
        desc: "PRAN (Permanent Retirement Account Number) is generated instantly for your account."
    }
];

export default function ApplicationProcess() {
    const { openLogin } = useModal();

    return (
        <section id="application-process" className="py-16 md:py-24 bg-white overflow-hidden font-sans">
            <div className="container mx-auto px-4 md:px-6">

                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="text-center max-w-3xl mx-auto mb-16 md:mb-20"
                >
                    <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-blue-50 text-blue-600 font-bold text-xs mb-6 uppercase tracking-widest">
                        <Zap size={14} className="animate-pulse" />
                        Simple & Fast
                    </div>

                    <h2 className="text-3xl md:text-4xl font-extrabold mb-3 bg-linear-to-r from-[#2076C7] to-[#1CADA3] bg-clip-text text-transparent drop-shadow-sm pb-1">
                        Process to Apply
                    </h2>


                    <p className="text-gray-600 max-w-2xl mx-auto text-lg leading-relaxed">
                        Open your NPS account in 5 simple steps. Experience a 100% digital and hassle-free onboarding process.
                    </p>
                </motion.div>

                <div className="relative">

                    {/* Connection Line (Desktop) */}
                    <div className="hidden lg:block absolute top-[2.25rem] left-0 w-full h-1 bg-gray-100 -z-0">
                        <motion.div
                            initial={{ width: 0 }}
                            whileInView={{ width: "100%" }}
                            viewport={{ once: true }}
                            transition={{ duration: 1.5, ease: "easeInOut" }}
                            className="h-full bg-linear-to-r from-[#2076C7] to-[#1CADA3]"
                        />
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-12 relative z-10">

                        {steps.map((step, idx) => (
                            <motion.div
                                key={idx}
                                initial={{ opacity: 0, y: 30 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: idx * 0.2 }}
                                className="flex flex-col items-center text-center group"
                            >

                                {/* Icon Circle */}
                                <div className="relative mb-6 w-[72px] h-[72px] rounded-full bg-linear-to-r from-[#2076C7] to-[#1CADA3] shadow-md flex items-center justify-center text-white transform group-hover:scale-110 transition-all duration-500 p-4">
                                    {step.icon}
                                </div>

                                {/* Content */}
                                <h3 className="text-lg sm:text-xl font-bold mb-3 sm:mb-4 text-gray-800 transition-colors">
                                    {step.title}
                                </h3>

                                <p className="text-gray-600 font-medium text-sm leading-relaxed px-4">
                                    {step.desc}
                                </p>

                                {/* Arrow (Mobile/Tablet) */}
                                {idx < steps.length - 1 && (
                                    <div className="lg:hidden mt-8 text-gray-200 animate-bounce">
                                        <ChevronRight size={32} className="rotate-90 md:rotate-0" />
                                    </div>
                                )}

                            </motion.div>
                        ))}

                    </div>
                </div>

                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: 1 }}
                    className="mt-16 sm:mt-24 text-center"
                >
                    <button
                        onClick={openLogin}
                        className="px-10 py-4 bg-linear-to-r from-[#2076C7] to-[#1CADA3] text-white rounded-full font-bold hover:shadow-2xl hover:scale-105 transition-all shadow-xl cursor-pointer"
                    >
                        Start Your NPS Journey Now
                    </button>
                </motion.div>

            </div>
        </section>
    );
}
