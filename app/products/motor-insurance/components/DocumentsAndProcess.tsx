"use client";

import { motion } from "framer-motion";
import { CreditCard, FileText, UserCheck, Car, BadgeCheck, Search, MousePointerClick, Zap, ChevronRight } from "lucide-react";
import { useModal } from "@/app/context/ModalContext";

const requirements = [
    { title: "Registration Certificate (RC)", icon: <Car size={20} />, color: "text-[#1CADA3]", bg: "bg-[#1CADA3]/10" },
    { title: "Previous Policy Details", icon: <FileText size={20} />, color: "text-[#1CADA3]", bg: "bg-[#1CADA3]/10" },
    { title: "Driving License", icon: <UserCheck size={20} />, color: "text-[#1CADA3]", bg: "bg-[#1CADA3]/10" },
    { title: "Aadhaar Card", icon: <CreditCard size={20} />, color: "text-[#1CADA3]", bg: "bg-[#1CADA3]/10" },
    { title: "PAN Card", icon: <CreditCard size={20} />, color: "text-[#1CADA3]", bg: "bg-[#1CADA3]/10" },
    { title: "Vehicle Purchase Invoice", icon: <FileText size={20} />, color: "text-[#1CADA3]", bg: "bg-[#1CADA3]/10" },
];

const steps = [
    {
        icon: <FileText className="w-10 h-10" />,
        title: "Enter Details",
        description: "Provide your vehicle registration number and basic details.",
    },
    {
        icon: <Search className="w-10 h-10" />,
        title: "Compare Quotes",
        description: "Check quotes from top insurers tailored for your needs.",
    },
    {
        icon: <MousePointerClick className="w-10 h-10" />,
        title: "Customize & Buy",
        description: "Select IDV, add-ons, and finalize your premium.",
    },
    {
        icon: <CreditCard className="w-10 h-10" />,
        title: "Instant Policy",
        description: "Make payment and get your policy document instantly.",
    },
];

export default function DocumentsAndProcess() {
    const { openLogin } = useModal();

    return (
        <section className="py-14 md:py-24 bg-white border-y border-gray-100 font-sans">
            <div className="container mx-auto px-4 md:px-6">

                {/* --- Required Documents Section --- */}
                <div className="mb-20">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="text-center max-w-3xl mx-auto mb-16"
                    >
                        <h2 className="text-3xl md:text-4xl font-extrabold mb-3 bg-linear-to-r from-[#2076C7] to-[#1CADA3] bg-clip-text text-transparent drop-shadow-sm">
                            Required Documents
                        </h2>
                        <p className="text-lg text-gray-600 font-medium leading-relaxed">
                            Buying motor insurance is now paperless and instant. Keep these details handy for a seamless experience.
                        </p>
                    </motion.div>

                    <div className="max-w-5xl mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                        {requirements.map((doc, idx) => (
                            <motion.div
                                key={idx}
                                initial={{ opacity: 0, scale: 0.9 }}
                                whileInView={{ opacity: 1, scale: 1 }}
                                viewport={{ once: true }}
                                transition={{ delay: idx * 0.05 }}
                                whileHover={{ y: -5, scale: 1.02 }}
                                className="flex items-center gap-3 p-4 rounded-3xl bg-gray-50/50 border-gray-300 hover:bg-white hover:shadow-xl border border-gray-100 hover:border-[#2076C7]/20 transition-all duration-300 group"
                            >
                                <div className={`w-10 h-10 rounded-2xl ${doc.bg} ${doc.color} flex items-center justify-center transition-all shadow-sm group-hover:scale-110 shrink-0`}>
                                    {doc.icon}
                                </div>
                                <span className="text-gray-800 font-bold text-sm tracking-tight leading-tight">{doc.title}</span>
                            </motion.div>
                        ))}
                    </div>

                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.4 }}
                        className="mt-10 sm:mt-16 max-w-4xl mx-auto p-5 sm:p-8 rounded-[2rem] sm:rounded-[2.5rem] bg-linear-to-br from-[#1CADA3]/10 to-[#2076C7]/10 border border-[#1CADA3]/20 flex flex-col sm:flex-row items-center sm:items-start gap-4 sm:gap-6 shadow-sm text-center sm:text-left"
                    >
                        <div className="shrink-0 w-16 h-16 rounded-full bg-white flex items-center justify-center text-[#1CADA3] shadow-sm">
                            <BadgeCheck size={32} />
                        </div>
                        <div>
                            <h4 className="font-bold text-gray-800 mb-1">100% Digital Process</h4>
                            <p className="text-sm text-gray-800 font-semibold leading-relaxed">
                                Tip: We only require digital scans/copies. No physical document collection is needed for the initial application phase.
                            </p>
                        </div>
                    </motion.div>
                </div>

                {/* --- Buying Process Section --- */}
                <div className="mt-16 pt-10 border-t border-gray-100">
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
                            Get Insured in 4 Simple Steps
                        </h2>

                        <p className="text-gray-600 max-w-2xl mx-auto text-lg leading-relaxed">
                            Experience a seamless, paperless, and quick buying journey.
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
                                    <div className="relative mb-6 w-[72px] h-[72px] rounded-full bg-linear-to-r from-[#2076C7] to-[#1CADA3] shadow-md flex items-center justify-center text-white transform group-hover:scale-110 transition-all duration-500 p-4">
                                        {step.icon}
                                    </div>
                                    <h3 className="text-lg sm:text-xl font-bold mb-3 sm:mb-4 text-gray-800 transition-colors">
                                        {step.title}
                                    </h3>
                                    <p className="text-gray-600 font-semibold text-sm leading-relaxed px-4">
                                        {step.description}
                                    </p>
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
                        <button onClick={openLogin} className="px-8 py-4 bg-linear-to-r from-[#2076C7] to-[#1CADA3] text-white rounded-full font-bold hover:shadow-2xl hover:scale-105 transition-all shadow-xl cursor-pointer">
                            Start Your Journey
                        </button>
                    </motion.div>
                </div>
            </div>
        </section>
    );
}
