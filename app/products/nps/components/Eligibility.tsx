'use client';

import { CheckCircle2, FileText, User, CreditCard, Camera, MapPin } from 'lucide-react';
import { motion } from 'framer-motion';

const eligibilityItems = [
    {
        dot: 'bg-teal-500',
        label: 'Citizenship',
        value: 'Indian Citizens, NRIs & OCI Card Holders',
    },
    {
        dot: 'bg-teal-500',
        label: 'Age Limit',
        value: '18 – 70 Years (at the time of entry)',
    },
    {
        dot: 'bg-teal-500',
        label: 'Account Types',
        value: 'Available for both Tier I & Tier II Accounts',
    },
    {
        dot: 'bg-teal-500',
        label: 'Employment',
        value: 'Applicable to Government, Corporate & Individual Subscribers',
    },
];

const documents = [
    { icon: User, title: 'KYC Documents', desc: 'Aadhaar, PAN Card, or Passport', color: 'text-teal-500', bg: 'bg-blue-100' },
    { icon: CreditCard, title: 'Bank Details', desc: 'Cancelled Cheque or Passbook Copy', color: 'text-teal-500', bg: 'bg-teal-100' },
    { icon: Camera, title: 'Digital Uploads', desc: 'Recent Photograph & Signature', color: 'text-teal-500', bg: 'bg-blue-100' },
    { icon: MapPin, title: 'Address Proof', desc: 'Passport, Utility Bills, or Bank Statement', color: 'text-teal-500', bg: 'bg-teal-100' },
];

export default function Eligibility() {
    return (
        <section id="eligibility" className="relative py-12 md:py-16 bg-white overflow-hidden">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
                {/* Section Header */}
                <div className="text-center mb-14">
                    <h2 className="text-3xl md:text-4xl font-extrabold mb-3 bg-linear-to-r from-[#2076C7] to-[#1CADA3] bg-clip-text text-transparent pb-1">
                        NPS Eligibility &amp; Documents
                    </h2>
                    <p className="max-w-2xl mx-auto text-slate-500 font-medium text-base leading-relaxed">
                        Opening an NPS account is simple and transparent. Review the eligibility criteria and keep your documents ready.
                    </p>
                </div>

                <div className="grid md:grid-cols-2 gap-8 items-stretch">
                    {/* --- Eligibility Card --- */}
                    <motion.div
                        initial={{ opacity: 0, x: -30 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        className="bg-white rounded-2xl border border-gray-200 shadow-lg overflow-hidden flex flex-col"
                    >
                        {/* Card Header */}
                        <div className="bg-gradient-to-r from-[#2076C7] to-[#1CADA3] px-8 py-5">
                            <div className="flex items-center gap-3">
                                <div className="w-9 h-9 bg-white/20 rounded-xl flex items-center justify-center">
                                    <CheckCircle2 size={20} className="text-white" />
                                </div>
                                <h3 className="text-lg font-black text-white">Eligibility Criteria</h3>
                            </div>
                        </div>

                        {/* Items */}
                        <div className="flex-1 p-6 space-y-4">
                            {eligibilityItems.map((item, i) => (
                                <motion.div
                                    key={i}
                                    initial={{ opacity: 0, y: 10 }}
                                    whileInView={{ opacity: 1, y: 0 }}
                                    viewport={{ once: true }}
                                    transition={{ delay: i * 0.08 }}
                                    className="flex items-start gap-4 p-4 bg-gray-50 rounded-xl border border-gray-100 hover:border-blue-100 hover:bg-blue-50/30 transition-all duration-200"
                                >
                                    <div className={`w-3 h-3 rounded-full ${item.dot} mt-1.5 shrink-0`} />
                                    <div>
                                        <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest mb-1">{item.label}</p>
                                        <p className="font-bold text-gray-800 text-sm leading-snug">{item.value}</p>
                                    </div>
                                </motion.div>
                            ))}
                        </div>
                    </motion.div>

                    {/* --- Documents Card --- */}
                    <motion.div
                        initial={{ opacity: 0, x: 30 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        className="bg-white rounded-2xl border border-gray-200 shadow-lg overflow-hidden flex flex-col"
                    >
                        {/* Card Header */}
                        <div className="bg-gradient-to-r from-[#1CADA3] to-[#2076C7] px-8 py-5">
                            <div className="flex items-center gap-3">
                                <div className="w-9 h-9 bg-white/20 rounded-xl flex items-center justify-center">
                                    <FileText size={20} className="text-white" />
                                </div>
                                <h3 className="text-lg font-black text-white">Required Documents</h3>
                            </div>
                        </div>

                        {/* Document Grid */}
                        <div className="flex-1 p-6">
                            <div className="grid grid-cols-2 gap-4 mb-4">
                                {documents.map((doc, i) => {
                                    const Icon = doc.icon;
                                    return (
                                        <motion.div
                                            key={i}
                                            initial={{ opacity: 0, y: 10 }}
                                            whileInView={{ opacity: 1, y: 0 }}
                                            viewport={{ once: true }}
                                            transition={{ delay: i * 0.08 }}
                                            className="flex flex-col gap-3 p-4 bg-gray-50 rounded-xl border border-gray-100 hover:border-teal-100 hover:bg-teal-50/20 transition-all duration-200"
                                        >
                                            <div className={`w-9 h-9 ${doc.bg} rounded-xl flex items-center justify-center`}>
                                                <Icon size={18} className={doc.color} />
                                            </div>
                                            <div>
                                                <h4 className="font-extrabold text-gray-800 text-sm mb-0.5">{doc.title}</h4>
                                                <p className="text-[11px] text-gray-500 font-medium leading-tight">{doc.desc}</p>
                                            </div>
                                        </motion.div>
                                    );
                                })}
                            </div>

                            {/* Tip */}
                            <div className="flex items-start gap-3 p-4 bg-teal-50 border border-teal-100 rounded-xl">
                                <div className="w-8 h-8 bg-[#1CADA3]/10 rounded-lg flex items-center justify-center shrink-0">
                                    <FileText size={16} className="text-[#1CADA3]" />
                                </div>
                                <p className="text-sm text-teal-900 font-semibold leading-relaxed">
                                    Keep digital copies ready for a <span className="font-black">100% paperless</span> onboarding experience.
                                </p>
                            </div>
                        </div>
                    </motion.div>
                </div>
            </div>
        </section>
    );
}
