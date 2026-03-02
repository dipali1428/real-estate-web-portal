"use client";

import { motion } from "framer-motion";
import { FileText, Search, MousePointerClick, CreditCard, ShieldCheck, ChevronRight } from "lucide-react";

const steps = [
    {
        icon: <FileText className="w-8 h-8 text-white" />,
        title: "Enter Details",
        description: "Provide your vehicle registration number and basic details.",
        step: "01",
    },
    {
        icon: <Search className="w-8 h-8 text-white" />,
        title: "Compare Quotes",
        description: "Check quotes from top insurers tailored for your needs.",
        step: "02",
    },
    {
        icon: <MousePointerClick className="w-8 h-8 text-white" />,
        title: "Customize & Buy",
        description: "Select IDV, add-ons, and finalize your premium.",
        step: "03",
    },
    {
        icon: <CreditCard className="w-8 h-8 text-white" />,
        title: "Instant Policy",
        description: "Make payment and get your policy document instantly.",
        step: "04",
    },
];

export default function BuyingProcess() {
    return (
        <section className="py-12 bg-gradient-to-b from-white to-gray-50 relative overflow-hidden">


            <div className="container mx-auto px-4 md:px-6 relative z-10">
                <div className="text-center max-w-3xl mx-auto mb-20">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.5 }}
                    >
                        <h2 className="text-3xl md:text-4xl font-bold mb-4 bg-linear-to-r from-[#2076C7] via-[#1CADA3] to-[#2076C7] text-transparent bg-clip-text inline-block">
                            Get Insured in 4 Simple Steps
                        </h2>
                        <p className="text-gray-600 text-lg">
                            Experience a seamless, paperless, and quick buying journey.
                        </p>
                    </motion.div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                    {steps.map((step, index) => (
                        <motion.div
                            key={index}
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: index * 0.2, duration: 0.5 }}
                            className="relative group"
                        >
                            <div className="bg-white p-6 rounded-3xl shadow-lg border border-gray-100 h-full flex flex-col items-center text-center hover:shadow-xl hover:-translate-y-2 transition-all duration-300 z-10 relative overflow-hidden">

                                <div className="relative z-10">
                                    <div className="w-20 h-20 rounded-2xl bg-gradient-to-br from-[#2076C7] to-[#1CADA3] flex items-center justify-center mb-6 shadow-lg transform group-hover:rotate-6 transition-transform duration-300 mx-auto">
                                        {step.icon}
                                    </div>

                                    <h3 className="text-xl font-bold text-gray-900 mb-2">{step.title}</h3>
                                    <p className="text-gray-600 text-sm leading-relaxed">
                                        {step.description}
                                    </p>
                                </div>

                                {/* Mobile Connector Arrow */}
                                <div className="lg:hidden mt-4 text-gray-300 relative z-10">
                                    {index < steps.length - 1 && <ChevronRight size={24} className="rotate-90 md:rotate-0" />}
                                </div>
                            </div>
                        </motion.div>
                    ))}
                </div>

                <motion.div
                    initial={{ opacity: 0, scale: 0.9 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.8, duration: 0.5 }}
                    className="text-center mt-16"
                >
                    <button className="bg-gradient-to-r from-[#2076C7] to-[#1CADA3] text-white px-10 py-4 rounded-full font-bold text-lg shadow-lg hover:shadow-2xl hover:scale-105 transition-all duration-300 flex items-center gap-3 mx-auto ring-4 ring-brand-teal/20">
                        <ShieldCheck className="w-6 h-6" />
                        Start Your Journey
                    </button>
                </motion.div>

            </div>
        </section>
    );
}
