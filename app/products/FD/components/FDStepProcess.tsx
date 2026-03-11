"use client";

import { motion } from "framer-motion";
import { ClipboardCheck, Zap, ShieldCheck, Rocket, ChevronRight } from "lucide-react";

const steps = [
    {
        title: "Compare Rates",
        desc: "Choose from India's top banks & NBFCs with the best interest yields for your wealth.",
        icon: <ClipboardCheck className="w-10 h-10" />,
    },
    {
        title: "Digital Application",
        desc: "Enter your investment details & nominee information in minutes via our secure portal.",
        icon: <ShieldCheck className="w-10 h-10" />,
    },
    {
        title: "Instant Verification",
        desc: "Complete your identity verification instantly via 100% paperless digital onboarding.",
        icon: <Zap className="w-10 h-10" />,
    },
    {
        title: "Start Earning",
        desc: "Securely transfer funds & get your Fixed Deposit certificate instantly in your dashboard.",
        icon: <Rocket className="w-10 h-10" />,
    }
];

interface FDStepProcessProps {
    onApplyClick?: () => void;
}

export default function FDStepProcess({ onApplyClick }: FDStepProcessProps) {
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
                        Seamless Experience
                    </div>

                    <h2 className="text-3xl md:text-4xl font-extrabold mb-3 bg-linear-to-r from-[#2076C7] to-[#1CADA3] bg-clip-text text-transparent drop-shadow-sm">
                        Start Growing Your Savings in 4 Steps
                    </h2>

                    <p className="text-gray-600 max-w-2xl mx-auto text-lg leading-relaxed">
                        Experience a completely digital journey from selection to investment. No more physical bank visits needed.
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
                                <div className="relative mb-6 w-[72px] h-[72px] rounded-full bg-linear-to-r from-[#2076C7] to-[#1CADA3] shadow-md flex items-center justify-center text-white transform group-hover:scale-110 transition-all duration-500 p-4">
                                    {step.icon}
                                </div>

                                {/* Content */}
                                <h3 className="text-lg sm:text-xl font-bold mb-3 sm:mb-4 text-gray-800 transition-colors">
                                    {step.title}
                                </h3>

                                <p className="text-gray-600 font-semibold text-sm leading-relaxed px-4">
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
                    className="mt-12 sm:mt-20 text-center"
                >
                    <button
                        onClick={onApplyClick}
                        className="px-8 py-4 bg-linear-to-r from-[#2076C7] to-[#1CADA3] text-white rounded-full font-bold hover:shadow-2xl hover:scale-105 transition-all shadow-xl cursor-pointer"
                    >
                        Start Your Investment Journey
                    </button>
                </motion.div>

            </div>
        </section>
    );
}
