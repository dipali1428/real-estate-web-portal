"use client";

import { motion } from "framer-motion";
import { ClipboardEdit, FileCheck, Landmark, Car, CheckCircle2, ArrowRight } from "lucide-react";

const processSteps = [
    {
        title: "Submit Details",
        description: "Quick online form with basic details.",
        icon: <ClipboardEdit className="text-white w-8 h-8" />,
        gradient: "from-blue-500 to-indigo-600",
        shadow: "shadow-blue-500/30",
        delay: 0.1
    },
    {
        title: "Instant Approval",
        description: "Instant evaluation for eligibility.",
        icon: <CheckCircle2 className="text-white w-8 h-8" />,
        gradient: "from-teal-400 to-emerald-500",
        shadow: "shadow-teal-500/30",
        delay: 0.2
    },
    {
        title: "Upload Docs",
        description: "Digital KYC and income proof.",
        icon: <FileCheck className="text-white w-8 h-8" />,
        gradient: "from-purple-500 to-fuchsia-600",
        shadow: "shadow-purple-500/30",
        delay: 0.3
    },
    {
        title: "Verification",
        description: "Finalize agreement & terms.",
        icon: <Landmark className="text-white w-8 h-8" />,
        gradient: "from-orange-400 to-amber-500",
        shadow: "shadow-orange-500/30",
        delay: 0.4
    },
    {
        title: "Disbursal",
        description: "Funds sent to dealer quickly.",
        icon: <Car className="text-white w-8 h-8" />,
        gradient: "from-cyan-500 to-blue-500",
        shadow: "shadow-cyan-500/30",
        delay: 0.5
    }
];

export default function VehicleLoanProcess() {
    return (
        <section className="py-24 bg-gradient-to-b from-[#F4F7FF] to-white relative overflow-hidden">
            {/* Attractive Background Pattern */}
            <div className="absolute inset-0 z-0 opacity-[0.03] bg-[radial-gradient(#2076C7_1px,transparent_1px)] [background-size:20px_20px]" />

            <div className="absolute top-20 right-0 w-[600px] h-[600px] bg-purple-200/40 rounded-full blur-[120px] -translate-y-1/2 translate-x-1/3 mix-blend-multiply pointer-events-none" />
            <div className="absolute bottom-10 left-0 w-[500px] h-[500px] bg-teal-200/40 rounded-full blur-[100px] translate-y-1/2 -translate-x-1/3 mix-blend-multiply pointer-events-none" />

            <div className="container mx-auto px-4 md:px-6 relative z-10">
                <div className="text-center max-w-3xl mx-auto mb-20">
                    <motion.div
                        initial={{ opacity: 0, scale: 0.9 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        viewport={{ once: true }}
                        className="inline-flex items-center px-4 py-2 rounded-full bg-white border border-gray-100 shadow-md text-blue-600 font-bold text-sm mb-6 uppercase tracking-wider"
                    >
                        Simple 5-Step Process
                    </motion.div>

                    <motion.h2
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.1 }}
                        className="text-4xl md:text-5xl lg:text-6xl font-extrabold mb-6 tracking-tight bg-clip-text text-transparent bg-linear-to-r from-[#2076C7] to-[#1CADA3]"
                    >
                        How It Works
                    </motion.h2>
                    <motion.p
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.2 }}
                        className="text-lg md:text-xl text-gray-600 leading-relaxed font-medium"
                    >
                        Experience a fully digital, beautifully designed journey from application to disbursal.
                    </motion.p>
                </div>

                <div className="max-w-7xl mx-auto px-4">
                    <div className="relative">
                        {/* Interactive Connecting Line */}
                        <div className="hidden lg:block absolute top-[5.5rem] left-[10%] right-[10%] h-1.5 bg-gray-200 rounded-full overflow-hidden">
                            <motion.div
                                initial={{ x: "-100%" }}
                                whileInView={{ x: "0%" }}
                                viewport={{ once: true }}
                                transition={{ duration: 1.5, delay: 0.5, ease: "easeOut" }}
                                className="w-full h-full bg-gradient-to-r from-blue-500 via-teal-400 to-indigo-500 rounded-full"
                            />
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-8 lg:gap-6">
                            {processSteps.map((step, index) => (
                                <motion.div
                                    key={index}
                                    initial={{ opacity: 0, y: 40 }}
                                    whileInView={{ opacity: 1, y: 0 }}
                                    viewport={{ once: true, margin: "-50px" }}
                                    transition={{ duration: 0.6, delay: step.delay, type: "spring", stiffness: 100 }}
                                    className="relative flex flex-col items-center group cursor-pointer"
                                >
                                    {/* Elevated Icon Container */}
                                    <div className="relative mb-6 mt-4">
                                        <div className={`w-24 h-24 rounded-3xl bg-gradient-to-br ${step.gradient} flex items-center justify-center shadow-lg ${step.shadow} relative z-20 group-hover:-translate-y-3 group-hover:scale-110 transition-all duration-500 right-0`}>
                                            {step.icon}
                                        </div>
                                        {/* Number Badge floating */}
                                        <div className="absolute -top-3 -right-3 w-8 h-8 rounded-full bg-white text-gray-900 font-black shadow-md flex items-center justify-center z-30 border-2 border-gray-50 transform group-hover:rotate-12 transition-transform">
                                            {index + 1}
                                        </div>
                                    </div>

                                    {/* Content Card */}
                                    <div className="bg-white/80 backdrop-blur-sm p-6 rounded-3xl border border-gray-100 shadow-xl shadow-gray-200/50 group-hover:shadow-2xl group-hover:border-blue-100 transition-all duration-300 w-full h-full text-center flex flex-col justify-center transform group-hover:-translate-y-1">
                                        <h3 className="text-xl font-extrabold text-gray-900 mb-3 leading-tight group-hover:text-blue-600 transition-colors">
                                            {step.title}
                                        </h3>
                                        <p className="text-gray-500 text-sm font-medium leading-relaxed">
                                            {step.description}
                                        </p>
                                    </div>
                                </motion.div>
                            ))}
                        </div>
                    </div>
                </div>

                <motion.div
                    initial={{ opacity: 0, scale: 0.9 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.8 }}
                    className="mt-24 text-center"
                >
                    <button
                        onClick={() => {
                            const formElement = document.getElementById('apply-now-form');
                            if (formElement) formElement.scrollIntoView({ behavior: 'smooth' });
                        }}
                        className="inline-flex items-center gap-3 px-10 py-5 bg-[#0A1A2F] text-white font-bold text-lg rounded-2xl shadow-xl hover:shadow-2xl hover:bg-blue-900 hover:-translate-y-1 active:scale-95 transition-all group overflow-hidden relative"
                    >
                        <span className="absolute inset-0 w-full h-full bg-gradient-to-r from-blue-600 to-teal-500 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></span>
                        <span className="relative z-10 flex items-center gap-2">Start Your Journey <ArrowRight className="group-hover:translate-x-1.5 transition-transform" /></span>
                    </button>
                    <p className="mt-6 text-sm text-gray-400 font-semibold uppercase tracking-widest">Takes less than 5 minutes</p>
                </motion.div>
            </div>
        </section>
    );
}
