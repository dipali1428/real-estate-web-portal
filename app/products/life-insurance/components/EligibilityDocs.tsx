"use client";

import { motion } from "framer-motion";
import {
    UserCheck, CheckCircle2, Globe,
    Briefcase, ShieldCheck, Zap, Clock, Landmark
} from "lucide-react";
import { useModal } from '@/app/context/ModalContext';


const eligibilityCriteria = [
    { label: "Age", value: "18-65 Yrs", icon: UserCheck },
    { label: "Term", value: "Up to 40 Yrs", icon: Clock },
    { label: "Min SA", value: "₹25 Lakhs", icon: Zap },
    { label: "Status", value: "NRI Friendly", icon: Globe },
];

const requiredDocs = [
    { title: "Identity", items: ["Aadhaar", "PAN"], icon: UserCheck },
    { title: "Income", items: ["Salary", "ITR"], icon: Briefcase },
    { title: "Address", items: ["Utility", "Rent"], icon: Landmark },
];

const EligibilityDocs = () => {
    const { openLogin } = useModal();
    return (
        <section className="py-16 md:py-24 bg-white relative overflow-hidden font-sans" id="onboarding">
            {/* Elegant Background Elements */}
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-[1px] bg-linear-to-r from-transparent via-[#2076C7]/10 to-transparent" />
            <div className="absolute -top-24 -right-24 w-96 h-96 bg-[#2076C7]/3 rounded-full blur-[100px] pointer-events-none" />

            <div className="container-custom relative z-10 px-6 md:px-10 mx-auto max-w-7xl">
                <div className="text-center max-w-5xl mx-auto mb-8 md:mb-12">
                    <motion.span
                        initial={{ opacity: 0, y: 10 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        className="text-[#2076C7] font-black uppercase text-[10px] md:text-xs tracking-[0.4em] mb-4 block"
                    >
                        THE ONBOARDING JOURNEY
                    </motion.span>
                    <motion.h2
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        className="text-3xl lg:text-4xl font-bold text-[#2076C7] leading-tight mb-8"
                    >
                        Simple Steps to <span className="text-transparent bg-clip-text bg-linear-to-r from-[#2076C7] via-[#1CADA3] to-[#2076C7] bg-[length:200%_auto] animate-gradient-x">Secure Life</span>
                    </motion.h2>
                    <p className="text-gray-400 text-base md:text-xl font-medium leading-relaxed">
                        Skip the paperwork. Our 100% digital process gets your policy issued in less than 24 hours.
                    </p>
                </div>

                <div className="grid lg:grid-cols-3 gap-8 md:gap-12">
                    {/* Step 1: Eligibility */}
                    <motion.div
                        initial={{ opacity: 0, x: -30 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        className="relative p-6 md:p-8 rounded-[3rem] bg-white border border-slate-100 shadow-[0_20px_50px_rgba(0,0,0,0.02)] group hover:shadow-[0_40px_80px_rgba(32,118,199,0.06)] transition-all duration-700"
                    >
                        <h3 className="text-2xl font-black text-[#2076C7] mb-8 relative z-10 text-center">Instant Eligibility</h3>
                        <div className="grid grid-cols-2 gap-6 relative z-10">
                            {eligibilityCriteria.map((item, idx) => (
                                <div key={idx} className="space-y-2">
                                    <div className="flex items-center gap-2 text-[#1CADA3]">
                                        <item.icon className="w-4 h-4" />
                                        <span className="text-[9px] font-black uppercase tracking-widest text-slate-300">{item.label}</span>
                                    </div>
                                    <div className="text-sm font-black text-slate-600">{item.value}</div>
                                </div>
                            ))}
                        </div>
                    </motion.div>

                    {/* Step 2: Documentation */}
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="relative p-6 md:p-8 rounded-[3rem] bg-white border border-slate-100 shadow-[0_20px_50px_rgba(0,0,0,0.02)] group hover:shadow-[0_40px_80px_rgba(32,118,199,0.06)] transition-all duration-700"
                    >
                        <h3 className="text-2xl font-black text-[#2076C7] mb-8 relative z-10 text-center">Digital Dossier</h3>
                        <div className="space-y-6 relative z-10">
                            {requiredDocs.map((doc, idx) => (
                                <div key={idx} className="flex items-center justify-between p-4 rounded-2xl bg-slate-50 border border-slate-100 group/doc hover:bg-white hover:border-[#2076C7]/30 transition-all font-sans">
                                    <div className="flex items-center gap-4">
                                        <div className="p-2 rounded-xl bg-white text-[#2076C7] shadow-sm">
                                            <doc.icon className="w-5 h-5" />
                                        </div>
                                        <div>
                                            <div className="text-[10px] font-black text-slate-400 uppercase tracking-widest">{doc.title}</div>
                                            <div className="text-sm font-bold text-slate-700">{doc.items.join(" / ")}</div>
                                        </div>
                                    </div>
                                    <CheckCircle2 className="w-4 h-4 text-[#1CADA3] opacity-40 group-hover/doc:opacity-100 transition-opacity" />
                                </div>
                            ))}
                        </div>
                    </motion.div>

                    {/* Step 3: Fast-Track Apply */}
                    <motion.div
                        initial={{ opacity: 0, x: 30 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        className="relative p-6 md:p-8 rounded-[3rem] bg-white border border-slate-100 shadow-[0_20px_50px_rgba(0,0,0,0.02)] flex flex-col justify-between group"
                    >
                        <h3 className="text-2xl font-black text-[#2076C7] mb-6 text-center">Expert Review</h3>
                        <p className="text-sm text-gray-400 font-medium leading-relaxed mb-8">
                            Our dedicated relationship managers ensure 100% accurate data filling and instant verification for priority terminal-case support.
                        </p>


                        <div className="space-y-4">
                            <div className="p-5 rounded-2xl bg-emerald-50 border border-emerald-100 flex items-center gap-4">
                                <div className="w-10 h-10 rounded-xl bg-emerald-500 flex items-center justify-center">
                                    <ShieldCheck className="w-6 h-6 text-white" />
                                </div>
                                <div>
                                    <div className="text-[10px] font-black text-emerald-600 uppercase tracking-widest">Trust Badge</div>
                                    <div className="text-xs font-black text-emerald-900">100% Verified Issue</div>
                                </div>
                            </div>
                            <button
                                onClick={(e) => { e.preventDefault(); openLogin(); }}
                                suppressHydrationWarning
                                className="w-full font-sans py-5 bg-linear-to-r from-[#2076C7] to-[#1CADA3] text-white rounded-2xl font-black text-base shadow-xl shadow-[#2076C7]/20 hover:scale-[1.02] active:scale-95 transition-all"
                            >
                                Start Application
                            </button>
                        </div>
                    </motion.div>
                </div>
            </div >
        </section >
    );
};

export default EligibilityDocs;
