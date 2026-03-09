"use client";

import { motion } from "framer-motion";
import { ClipboardCheck, Zap, ShieldCheck, Rocket, ChevronRight } from "lucide-react";

const steps = [
    {
        title: "Check Eligibility",
        desc: "Quick 2-minute eligibility check with basic business details, document verification & CIBIL verification.",
        icon: <ClipboardCheck className="w-12 h-12" />,
        color: "from-blue-500 to-blue-600",
        shadow: "shadow-blue-200"
    },
    {
        title: "Digital KYC",
        desc: "Hassle-free digital document upload for lightning-fast verification.",
        icon: <ShieldCheck className="w-12 h-12" />,
        color: "from-purple-500 to-purple-600",
        shadow: "shadow-purple-200"

    },
    {
        title: "Get Best Offer",
        desc: "Our algorithm matches you with the ideal lender & competitive rates.",
        icon: <Zap className="w-12 h-12" />,
        color: "from-emerald-500 to-emerald-600",
        shadow: "shadow-emerald-200"
    },
    {
        title: "Direct Disbursal",
        desc: "Funds credited directly to your business account within 24-48 hours.",
        icon: <Rocket className="w-12 h-12" />,
        color: "from-orange-500 to-orange-600",
        shadow: "shadow-orange-200"
    }
];

interface BusinessLoanStepProcessProps {
    onApplyClick?: () => void;
}

export default function BusinessLoanStepProcess({ onApplyClick }: BusinessLoanStepProcessProps) {
    return (
        <section className="py-16 md:py-20 bg-white overflow-hidden font-sans">
            <div className="container mx-auto px-4 md:px-6">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="text-center max-w-3xl mx-auto mb-12 md:mb-16"
                >
                    <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-blue-50 text-blue-600 font-bold text-xs mb-6 uppercase tracking-widest">
                        <Zap size={14} className="animate-pulse" />
                        Simple & Fast
                    </div>
                    <h2 className="text-3xl md:text-4xl font-extrabold mb-3 bg-linear-to-r from-[#2076C7] to-[#1CADA3] bg-clip-text text-transparent drop-shadow-sm">
                        Your Path to Success in 4 Simple Steps
                    </h2>
                    <p className="text-gray-600 max-w-2xl mx-auto text-lg leading-relaxed">
                        Say goodbye to lengthy bank visits. Our 100% digital process ensures you get the capital you need without the wait.
                    </p>
                </motion.div>

                <div className="relative">
                    {/* Connection Line (Desktop) */}
                    <div className="hidden lg:block absolute top-[2.75rem] left-0 w-full h-1 bg-gray-100 -z-0">
                        <motion.div
                            initial={{ width: 0 }}
                            whileInView={{ width: "100%" }}
                            viewport={{ once: true }}
                            transition={{ duration: 1.5, ease: "easeInOut" }}
                            className="h-full bg-linear-to-r from-[#2076C7] to-[#1CADA3]"
                        />
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 relative z-10">
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
                                <div className="relative mb-6 w-[88px] h-[88px] rounded-full bg-linear-to-r from-[#2076C7] to-[#1CADA3] shadow-md flex items-center justify-center text-white transform group-hover:scale-110 transition-all duration-500 p-5">
                                    {step.icon}
                                    {/* Number Badge */}
                                    <div className="absolute -top-3 -right-3 w-10 h-10 rounded-full bg-white border-4 border-gray-50 flex items-center justify-center text-gray-900 font-black text-sm shadow-md">
                                        0{idx + 1}
                                    </div>
                                </div>

                                {/* Content */}
                                <h3 className="text-lg sm:text-xl font-bold mb-3 sm:mb-4 text-gray-800 transition-colors">{step.title}</h3>
                                <p className="text-gray-600 font-semibold text-sm leading-relaxed px-4">
                                    {step.desc}
                                </p>

                                {/* Arrow (Mobile/Small Tablet) */}
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
                    className="mt-12 sm:mt-20 text-center"
                >
                    <button
                        onClick={onApplyClick}
                        className="px-8 py-4 bg-linear-to-r from-[#2076C7] to-[#1CADA3] text-white rounded-full font-bold hover:shadow-2xl hover:scale-105 transition-all shadow-xl cursor-pointer"
                    >
                        Start Your Application Now
                    </button>
                </motion.div>
            </div>
        </section>
    );
}
