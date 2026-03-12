"use client";

import { useState } from 'react';
import { FileText, CheckCircle, ChevronDown, User, Building2 } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
// import TiltCard from '@/app/component/ui/TiltCard';

interface EligibilitySectionProps {
    eligibility: string[];
}

export default function EligibilitySection({ eligibility }: EligibilitySectionProps) {
    const [isChecklistOpen, setIsChecklistOpen] = useState(false);

    return (
        <section className="py-12 md:py-16 bg-white">
            <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
                <motion.div initial="hidden" whileInView="visible" className="text-center mb-16">
                    <motion.h2 className="text-3xl md:text-4xl font-extrabold font-sans mb-3 bg-linear-to-r from-[#2076C7] to-[#1CADA3] bg-clip-text text-transparent drop-shadow-sm">
                        Eligibility Criteria
                    </motion.h2>
                    <motion.p className="text-xl text-gray-500 max-w-3xl mx-auto font-light">
                        Basic requirements to qualify for a home loan.
                    </motion.p>
                </motion.div>

                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                >
                    <section className="bg-white rounded-[40px] shadow-inner border border-gray-100 p-8 md:p-12">
                        <ul className="space-y-4 mb-10">
                            {eligibility.map((item, index) => (
                                <li key={index} className="flex items-center gap-3 p-3 rounded-lg bg-white shadow-sm border border-gray-50">
                                    <div className="w-8 h-8 rounded-full bg-blue-100 flex items-center justify-center text-[#2076C7] font-bold text-sm shrink-0">{index + 1}</div>
                                    <span className="text-gray-700 text-sm md:text-base">{item}</span>
                                </li>
                            ))}
                        </ul>

                        <div className="flex justify-center">
                            <button
                                onClick={() => setIsChecklistOpen(!isChecklistOpen)}
                                className="group flex items-center gap-3 px-8 py-4 bg-gray-50 hover:bg-white border-2 border-dashed border-gray-200 hover:border-[#1CADA3] rounded-2xl transition-all duration-300 cursor-pointer text-gray-700 font-bold hover:text-[#1CADA3] shadow-sm hover:shadow-md"
                            >
                                <FileText className={`w-5 h-5 transition-transform duration-300 ${isChecklistOpen ? 'scale-110' : ''}`} />
                                <span>{isChecklistOpen ? "Hide Required Documents" : "View Required Documents Checklist"}</span>
                                <ChevronDown className={`w-5 h-5 transition-transform duration-500 ${isChecklistOpen ? 'rotate-180' : ''}`} />
                            </button>
                        </div>

                        <AnimatePresence>
                            {isChecklistOpen && (
                                <motion.div
                                    initial={{ height: 0, opacity: 0 }}
                                    animate={{ height: "auto", opacity: 1 }}
                                    exit={{ height: 0, opacity: 0 }}
                                    transition={{ duration: 0.5, ease: "easeInOut" }}
                                    className="overflow-hidden"
                                >
                                    <div className="pt-12 mt-8 border-t border-gray-100">
                                        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 lg:gap-8">
                                            {/* Salaried Applicants */}
                                            {/* Salaried Applicants */}
                                            <div className="bg-white rounded-[2rem] border border-gray-100 shadow-sm p-6 md:p-8 transition-all hover:shadow-md h-full">
                                                <div className="flex items-center gap-4 mb-6 pb-4 border-b border-gray-100">
                                                    <div className="p-2.5 bg-blue-50 rounded-xl">
                                                        <User className="w-6 h-6 text-[#2076C7]" />
                                                    </div>
                                                    <h3 className="text-xl font-bold text-gray-800">Salaried Applicants</h3>
                                                </div>
                                                <div className="space-y-6">
                                                    {[
                                                        { label: "Identity Proof", color: "#1CADA3", items: ['PAN Card', 'Aadhaar Card', 'Passport Size Photo'] },
                                                        { label: "Address Proof (Any One)", color: "#2076C7", items: ['Aadhaar Card', 'Electricity Bill', 'Telephone Bill', 'Gas Receipt'] },
                                                        { label: "Income Proof", color: "#1CADA3", items: ['Latest 3 Months Salary Slips', 'Latest 6 Months Bank Statement', 'Form 16 (Last 2 Years)'] },
                                                        { label: "Employment Proof", color: "#2076C7", items: ['Employment ID Card', 'Offer / Appointment Letter'] },
                                                    ].map((section) => (
                                                        <div key={section.label}>
                                                            <h4 className="font-black text-[10px] mb-3 uppercase tracking-[0.2em]" style={{ color: section.color }}>{section.label}</h4>
                                                            <ul className="grid grid-cols-2 gap-y-2.5 gap-x-6">
                                                                {section.items.map((item, i) => (
                                                                    <li key={i} className="text-sm text-gray-600 flex items-center gap-3">
                                                                        <CheckCircle className="w-4 h-4 text-[#1CADA3] shrink-0" />
                                                                        <span>{item}</span>
                                                                    </li>
                                                                ))}
                                                            </ul>
                                                        </div>
                                                    ))}
                                                </div>
                                            </div>

                                            {/* Self-Employed Applicants */}
                                            {/* Self-Employed Applicants */}
                                            <div className="bg-white rounded-[2rem] border border-gray-100 shadow-sm p-6 md:p-8 transition-all hover:shadow-md h-full">
                                                <div className="flex items-center gap-4 mb-6 pb-4 border-b border-gray-100">
                                                    <div className="p-2.5 bg-emerald-50 rounded-xl">
                                                        <Building2 className="w-6 h-6 text-[#1CADA3]" />
                                                    </div>
                                                    <h3 className="text-xl font-bold text-gray-800">Self-Employed Applicants</h3>
                                                </div>
                                                <div className="space-y-6">
                                                    {[
                                                        { label: "Identity Proof", color: "#1CADA3", items: ['PAN Card', 'Aadhaar Card', 'Passport Size Photo'] },
                                                        { label: "Address Proof (Any One)", color: "#2076C7", items: ['Aadhaar Card', 'Electricity Bill', 'Telephone Bill', 'Gas Receipt'] },
                                                        { label: "Income Proof", color: "#1CADA3", items: ['Latest 3 Years ITR', 'Latest 1 Year Bank Statement'] },
                                                        { label: "Business Proof", color: "#2076C7", items: ['Shop Act License', 'GST Certificate'] },
                                                    ].map((section) => (
                                                        <div key={section.label}>
                                                            <h4 className="font-black text-[10px] mb-3 uppercase tracking-[0.2em]" style={{ color: section.color }}>{section.label}</h4>
                                                            <ul className="grid grid-cols-2 gap-y-2.5 gap-x-6">
                                                                {section.items.map((item, i) => (
                                                                    <li key={i} className="text-sm text-gray-600 flex items-center gap-3">
                                                                        <CheckCircle className="w-4 h-4 text-[#1CADA3] shrink-0" />
                                                                        <span>{item}</span>
                                                                    </li>
                                                                ))}
                                                            </ul>
                                                        </div>
                                                    ))}
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </motion.div>
                            )}
                        </AnimatePresence>
                    </section>
                </motion.div>
            </div>
        </section>
    );
}
