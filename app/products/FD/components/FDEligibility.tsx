"use client";

import { motion } from "framer-motion";
import {
    User,
    MapPin,
    FileCheck,
    BadgeCheck,
    Briefcase
} from "lucide-react";

const documents = [
    { title: "Aadhar Card (e-KYC)", icon: <User size={20} />, color: "text-[#1CADA3]", bg: "bg-[#1CADA3]/10" },
    { title: "PAN Card (Mandatory)", icon: <Briefcase size={20} />, color: "text-[#1CADA3]", bg: "bg-[#1CADA3]/10" },
    { title: "Bank Passbook/Statement", icon: <FileCheck size={20} />, color: "text-[#1CADA3]", bg: "bg-[#1CADA3]/10" },
    { title: "Identity Documentation", icon: <User size={20} />, color: "text-[#1CADA3]", bg: "bg-[#1CADA3]/10" },
    { title: "Address Proof (Utility Bill)", icon: <MapPin size={20} />, color: "text-[#1CADA3]", bg: "bg-[#1CADA3]/10" },
    { title: "Nominee Details", icon: <User size={20} />, color: "text-[#1CADA3]", bg: "bg-[#1CADA3]/10" },
    { title: "Recent Digital Photograph", icon: <User size={20} />, color: "text-[#1CADA3]", bg: "bg-[#1CADA3]/10" },
    { title: "Form 15G/15H (For TDS)", icon: <FileCheck size={20} />, color: "text-[#1CADA3]", bg: "bg-[#1CADA3]/10" }
];

export default function FDEligibility() {
    return (
        <div className="flex flex-col font-sans">
            {/* Documents Section (Full Width) */}
            <section className="py-14 md:py-24 bg-white">
                <div className="container mx-auto px-4 md:px-6">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="text-center max-w-3xl mx-auto mb-16"
                    >
                        <h2 className="text-3xl md:text-4xl font-extrabold mb-3 bg-linear-to-r from-[#2076C7] to-[#1CADA3] bg-clip-text text-transparent drop-shadow-sm">
                            Required Documents
                        </h2>
                        <p className="text-gray-600 max-w-2xl mx-auto text-lg leading-relaxed">
                            Keep these digital copies ready for a quick and seamless paperless investment process.
                        </p>
                    </motion.div>

                    <div className="max-w-6xl mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                        {documents.map((doc, idx) => (
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
                            <h4 className="font-bold text-gray-800 mb-1">100% Secure & Paperless</h4>
                            <p className="text-sm text-gray-800 font-semibold leading-relaxed">
                                Note: Most applications are approved instantly through Aadhar e-KYC. Additional documents may be requested for bulk deposits or as per bank requirement.
                            </p>
                        </div>
                    </motion.div>
                </div>
            </section>
        </div>
    );
}
