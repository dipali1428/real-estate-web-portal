"use client";

import { motion } from "framer-motion";
import { ClipboardEdit, FileCheck, Landmark, Car, CheckCircle2, Zap, ChevronRight } from "lucide-react";
import { useModal } from "@/app/context/ModalContext";

const processSteps = [
    {
        title: "Submit Details",
        description: "Quick online form with basic details for initial evaluation.",
        icon: <ClipboardEdit className="w-10 h-10" />,
    },
    {
        title: "Instant Approval",
        description: "Fast evaluation for eligibility and pre-approved offers.",
        icon: <CheckCircle2 className="w-10 h-10" />,
    },
    {
        title: "Upload Docs",
        description: "Seamless digital KYC and income proof upload.",
        icon: <FileCheck className="w-10 h-10" />,
    },
    {
        title: "Verification",
        description: "Finalize agreement and terms with our experts.",
        icon: <Landmark className="w-10 h-10" />,
    },
    {
        title: "Disbursal",
        description: "Funds sent to dealer quickly for your vehicle.",
        icon: <Car className="w-10 h-10" />,
    }
];

export default function VehicleLoanProcess() {
    const { openLogin } = useModal();
    return (
        <section className="py-16 md:py-20 bg-white overflow-hidden font-sans">
            <div className="container mx-auto px-4 md:px-6">

                {/* Header */}
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
                        How It Works
                    </h2>

                    <p className="text-gray-600 max-w-2xl mx-auto text-lg leading-relaxed">
                        Experience a fully digital, beautifully designed journey from application to disbursal.
                    </p>
                </motion.div>


                <div className="relative">

                    {/* Desktop Connection Line */}
                    <div className="hidden lg:block absolute top-[2.25rem] left-0 w-full h-1 bg-gray-100 -z-0">
                        <motion.div
                            initial={{ width: 0 }}
                            whileInView={{ width: "100%" }}
                            viewport={{ once: true }}
                            transition={{ duration: 1.5, ease: "easeInOut" }}
                            className="h-full bg-linear-to-r from-[#2076C7] to-[#1CADA3]"
                        />
                    </div>


                    {/* Steps */}
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-12 relative z-10 max-w-6xl mx-auto">

                        {processSteps.map((step, idx) => (
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

                                {/* Title */}
                                <h3 className="text-lg sm:text-xl font-bold mb-3 sm:mb-4 text-gray-800 transition-colors">
                                    {step.title}
                                </h3>

                                {/* Description */}
                                <p className="text-gray-600 font-semibold text-sm leading-relaxed px-4">
                                    {step.description}
                                </p>


                                {/* Arrow for Mobile */}
                                {idx < processSteps.length - 1 && (
                                    <div className="lg:hidden mt-8 text-gray-200 animate-bounce">
                                        <ChevronRight size={32} className="rotate-90 md:rotate-0" />
                                    </div>
                                )}

                            </motion.div>
                        ))}

                    </div>

                </div>


                {/* CTA Button */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: 1 }}
                    className="mt-12 sm:mt-20 text-center"
                >
                    <button
                        onClick={openLogin}
                        className="px-8 py-4 bg-linear-to-r from-[#2076C7] to-[#1CADA3] text-white rounded-full font-bold hover:shadow-2xl hover:scale-105 transition-all shadow-xl cursor-pointer"
                    >
                        Start Your Application Now
                    </button>

                    <p className="mt-6 text-sm text-gray-400 font-semibold uppercase tracking-widest">
                        Takes less than 5 minutes
                    </p>
                </motion.div>

            </div>
        </section>
    );
}