"use client";

import { motion } from "framer-motion";
import { Send, FileSearch, Verified, CheckCircle2, Users, Clock, Phone } from "lucide-react";

const steps = [
    {
        title: "Claim Intimation",
        desc: "Notify us instantly. A dedicated DCAP relationship manager is assigned to your case within 30 minutes.",
        icon: Send,
        time: "30 Min",
        color: "#2076C7"
    },
    {
        title: "Document Collection",
        desc: "Your manager visits your home for seamless document collection. No self-submission or courier required.",
        icon: FileSearch,
        time: "At Home",
        color: "#1CADA3"
    },
    {
        title: "Verified Tracking",
        desc: "AI-powered verification ensures instant cross-checks. Receive real-time status updates on your mobile.",
        icon: Verified,
        time: "Digital",
        color: "#2076C7"
    },
    {
        title: "Final Settlement",
        desc: "Direct credit of the claim amount to the nominee's account with priority processing for term policies.",
        icon: CheckCircle2,
        time: "Prompt*",
        color: "#1CADA3"
    },
];

const ClaimProcess = () => {
    return (
        <section className="py-16 md:py-24 bg-white relative overflow-hidden font-sans" id="claim-process">
            {/* Background decoration */}
            <div className="absolute top-1/2 left-0 w-full h-[1px] bg-linear-to-r from-transparent via-gray-100 to-transparent -translate-y-1/2 hidden lg:block" />

            <div className="container-custom relative z-10 px-6 md:px-10">
                <div className="text-center max-w-4xl mx-auto mb-8 md:mb-12">
                    <motion.span
                        initial={{ opacity: 0, y: 10 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        className="text-[#2076C7] font-black uppercase text-[10px] md:text-xs tracking-[0.4em] mb-4 block font-sans">
                        PERSONAL CLAIM SUPPORT
                    </motion.span>
                    <motion.h2
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        className="text-3xl lg:text-4xl font-bold bg-linear-to-r from-[#2076C7] to-[#1CADA3] bg-clip-text text-transparent mb-4">
                        Hassle-Free Claim Journey
                    </motion.h2>
                    <p className="text-gray-500 text-xl font-light leading-relaxed font-sans max-w-2xl mx-auto">
                        We&apos;re with you when it matters most. Every family gets a dedicated support person to handle everything — no queues, no stress.
                    </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                    {steps.map((step, idx) => (
                        <motion.div
                            key={idx}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: idx * 0.1 }}
                            className="relative flex flex-col items-center text-center p-6 md:p-8 bg-white rounded-[2.5rem] border border-gray-100 shadow-[0_10px_30px_rgba(0,0,0,0.04)] group hover:shadow-[0_30px_60px_rgba(0,0,0,0.08)] transition-all duration-500 overflow-hidden"
                        >
                            <div className="mb-6 w-16 h-16 rounded-2xl flex items-center justify-center bg-slate-50 border border-gray-100 group-hover:bg-white group-hover:border-[#2076C7]/20 transition-all duration-500">
                                <step.icon className="w-6 h-6 transition-colors" style={{ color: step.color }} />
                            </div>

                            {/* Time badge only */}
                            <div className="absolute top-6 right-8">
                                <span className="text-[10px] font-black uppercase tracking-wider px-3 py-1 rounded-full bg-slate-50 text-slate-400 group-hover:bg-[#1CADA3] group-hover:text-white transition-all duration-300">
                                    {step.time}
                                </span>
                            </div>

                            <h3 className="font-sans text-xl font-bold text-gray-900 mb-3 leading-tight">
                                {step.title}
                            </h3>
                            <p className="font-sans text-sm text-gray-500 leading-relaxed font-light">
                                {step.desc}
                            </p>
                        </motion.div>
                    ))}
                </div>

                {/* DCAP Feature Strip */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="mt-16 grid grid-cols-1 md:grid-cols-3 gap-4 max-w-5xl mx-auto"
                >
                    <div className="flex items-center gap-4 p-6 bg-[#1CADA3]/5 rounded-2xl border border-[#1CADA3]/10">
                        <div className="w-12 h-12 rounded-xl bg-[#1CADA3] flex items-center justify-center">
                            <Users className="w-6 h-6 text-white" />
                        </div>
                        <div>
                            <div className="font-black text-[#2076C7] text-sm">Personal Manager</div>
                            <div className="text-[10px] text-gray-400 font-bold">Assigned within 30 min</div>
                        </div>
                    </div>
                    <div className="flex items-center gap-4 p-6 bg-[#2076C7]/5 rounded-2xl border border-[#2076C7]/10">
                        <div className="w-12 h-12 rounded-xl bg-[#2076C7] flex items-center justify-center">
                            <Phone className="w-6 h-6 text-white" />
                        </div>
                        <div>
                            <div className="font-black text-[#2076C7] text-sm">24/7 Priority Line</div>
                            <div className="text-[10px] text-gray-400 font-bold">No IVR, direct connect</div>
                        </div>
                    </div>
                    <div className="flex items-center gap-4 p-6 bg-[#1CADA3]/5 rounded-2xl border border-[#1CADA3]/10">
                        <div className="w-12 h-12 rounded-xl bg-[#1CADA3] flex items-center justify-center">
                            <Clock className="w-6 h-6 text-white" />
                        </div>
                        <div>
                            <div className="font-black text-[#2076C7] text-sm">Priority Settlement*</div>
                            <div className="text-[10px] text-gray-400 font-bold">Fastest in industry</div>
                        </div>
                    </div>
                </motion.div>


            </div>
        </section>
    );
};

export default ClaimProcess;
