"use client";

import { motion } from 'framer-motion';


const PROCESS_STEPS = [
    { step: "1", title: "Check Eligibility", details: ["Share basic details like income, loan amount, and employment type", "Our team helps you check eligibility across multiple banks"] },
    { step: "2", title: "Submit Documents", details: ["Provide required KYC and income documents", "Documents are verified by the bank"] },
    { step: "3", title: "Application & Processing", details: ["Application is submitted to selected bank", "Bank evaluates credit score and property", "Legal & technical verification conducted"] },
    { step: "4", title: "Loan Approval", details: ["Bank issues Sanction Letter", "Loan amount, rate & tenure confirmed"] },
    { step: "5", title: "Loan Disbursement", details: ["Agreement signing", "Loan amount disbursed to seller / builder"] }
];

export default function ProcessOverviewSection() {
    return (
        <section className="py-8 md:py-12 bg-white">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <motion.div initial="hidden" whileInView="visible" className="text-center mb-10">
                    <motion.h2 className="text-3xl md:text-4xl font-extrabold font-sans mb-3 bg-linear-to-r from-[#2076C7] to-[#1CADA3] bg-clip-text text-transparent drop-shadow-sm">
                        Process Overview
                    </motion.h2>
                    <motion.p className="text-xl text-gray-500 max-w-3xl mx-auto font-light">
                        A simple, transparent journey from application to disbursement.
                    </motion.p>
                </motion.div>

                <motion.section
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="bg-white rounded-[40px] shadow-sm border border-gray-100 p-8 md:p-12"
                >
                    <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-4 relative">
                        <div className="hidden lg:block absolute top-12 left-10 right-10 h-0.5 bg-linear-to-r from-[#2076C7] via-[#1CADA3] to-[#2076C7] z-0 opacity-30"></div>
                        {PROCESS_STEPS.map((item, index) => (
                            <div key={index} className="h-full">
                                <motion.div
                                    whileHover={{ y: -5, boxShadow: "0 10px 15px -3px rgb(0 0 0 / 0.1)" }}
                                    className="relative z-10 flex flex-col items-center text-center p-4 bg-white rounded-xl border border-gray-100 hover:border-[#1CADA3] transition-all group h-full"
                                >
                                    <div className="w-16 h-16 rounded-full bg-linear-to-r from-[#2076C7] via-[#1CADA3] to-[#2076C7] flex items-center justify-center text-white font-bold text-2xl mb-4 group-hover:scale-110 transition-transform">
                                        {item.step}
                                    </div>
                                    <h3 className="font-bold text-gray-800 mb-3 text-sm md:text-base leading-tight min-h-[40px] flex items-center justify-center">
                                        {item.title}
                                    </h3>
                                    <ul className="space-y-2 text-left">
                                        {item.details.map((detail, idx) => (
                                            <li key={idx} className="text-xs text-gray-600 flex items-start gap-1.5">
                                                <span className="text-[#1CADA3] mt-1 shrink-0">•</span>
                                                {detail}
                                            </li>
                                        ))}
                                    </ul>
                                </motion.div>
                            </div>
                        ))}
                    </div>
                </motion.section>
            </div>
        </section>
    );
}
