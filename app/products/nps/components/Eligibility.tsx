'use client';

import { CheckCircle2, FileText } from 'lucide-react';
import { motion } from 'framer-motion';

export default function Eligibility() {
    return (
        <section id="eligibility" className="relative py-12 bg-white overflow-hidden">
            {/* Aesthetic Background Elements */}
            <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none">
                <div className="absolute inset-0 bg-dot-pattern opacity-[0.03]" />
                <div className="absolute top-[-5%] right-[-5%] w-[40%] h-[40%] bg-blue-50/50 rounded-full blur-[100px]" />
                <div className="absolute bottom-[0%] left-[-5%] w-[30%] h-[40%] bg-teal-50/50 rounded-full blur-[80px]" />
            </div>

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
                <div className="text-center mb-24">
                    <h2 className="text-3xl md:text-4xl font-extrabold mb-3 bg-gradient-to-r from-[#2076C7] via-[#1CADA3] to-[#2076C7] bg-clip-text text-transparent bg-[length:200%_auto] animate-gradient-flow drop-shadow-sm tracking-tight text-center w-full pb-1">
                        NPS Eligibility & Documents
                    </h2>
                    <div className="w-24 h-1 mx-auto bg-gradient-to-r from-[#2076C7] to-[#1CADA3] rounded-full mb-4 shadow-md shadow-blue-500/10"></div>
                    <p className="max-w-2xl mx-auto text-slate-600 font-medium text-lg leading-relaxed">
                        Opening an NPS account is simple and transparent. Review the general eligibility criteria and keep your documents ready.
                    </p>
                </div>

                <div className="grid md:grid-cols-2 gap-8 lg:gap-12 items-stretch">
                    {/* Eligibility Card */}
                    <motion.div
                        initial={{ opacity: 0, x: -30 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        whileHover={{ y: -8 }}
                        className="group relative bg-gradient-to-br from-[#2076C7]/5 to-[#1CADA3]/5 backdrop-blur-[40px] rounded-[3rem] p-8 lg:p-12 shadow-[0_10px_30px_-10px_rgba(0,0,0,0.05)] hover:shadow-[0_20px_60px_-15px_rgba(32,118,199,0.1)] border border-teal-100 flex flex-col transition-all duration-500"
                    >
                        <div className="absolute inset-0 rounded-[4rem] bg-gradient-to-br from-blue-500/0 to-blue-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none" />

                        <div className="relative z-10 flex flex-col items-center text-center">
                            <h3 className="text-2xl font-black text-slate-700 mb-8 leading-tight tracking-tight pb-1">Eligibility Criteria</h3>

                            <div className="space-y-6 flex-grow relative z-10 w-full">
                                <div className="group/item p-6 bg-white/60 backdrop-blur-md rounded-3xl border border-white shadow-sm hover:border-blue-200 hover:shadow-lg hover:shadow-blue-500/5 transition-all duration-300 flex flex-col items-center text-center">
                                    <h4 className="flex items-center gap-3 text-[10px] font-black text-gray-400 uppercase tracking-widest mb-3 justify-center">
                                        <div className="w-2 h-2 rounded-full bg-[#2076C7] animate-pulse" />
                                        Citizenship
                                    </h4>
                                    <p className="text-slate-700 font-extrabold text-lg leading-snug">Indian Citizens, NRIs & OCI Card Holders</p>
                                </div>

                                <div className="group/item p-6 bg-white/60 backdrop-blur-md rounded-3xl border border-white shadow-sm hover:border-blue-200 hover:shadow-lg hover:shadow-blue-500/5 transition-all duration-300 flex flex-col items-center text-center">
                                    <h4 className="flex items-center gap-3 text-[10px] font-black text-gray-400 uppercase tracking-widest mb-3 justify-center">
                                        <div className="w-2 h-2 rounded-full bg-[#1CADA3] animate-pulse" />
                                        Age Limit
                                    </h4>
                                    <p className="text-slate-700 font-extrabold text-lg leading-snug">18 - 70 Years (at entry)</p>
                                </div>

                                <div className="group/item p-6 bg-white/60 backdrop-blur-md rounded-3xl border border-white shadow-sm hover:border-blue-200 hover:shadow-lg hover:shadow-blue-500/5 transition-all duration-300 flex flex-col items-center text-center">
                                    <h4 className="flex items-center gap-3 text-[10px] font-black text-gray-400 uppercase tracking-widest mb-3 justify-center">
                                        <div className="w-2 h-2 rounded-full bg-indigo-500 animate-pulse" />
                                        Account Types
                                    </h4>
                                    <p className="text-slate-700 font-extrabold text-lg leading-snug">Available for Tier I & Tier II Accounts</p>
                                </div>
                            </div>
                        </div>
                    </motion.div>

                    {/* Documents Card */}
                    <motion.div
                        initial={{ opacity: 0, x: 30 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        whileHover={{ y: -8 }}
                        className="group relative bg-gradient-to-br from-[#2076C7]/5 to-[#1CADA3]/5 backdrop-blur-[40px] rounded-[3rem] p-8 lg:p-12 shadow-[0_10px_30px_-10px_rgba(0,0,0,0.05)] hover:shadow-[0_20px_60px_-15px_rgba(28,173,163,0.1)] border border-teal-100 flex flex-col transition-all duration-500"
                    >
                        <div className="absolute inset-0 rounded-[4rem] bg-gradient-to-br from-teal-500/0 to-teal-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none" />

                        <div className="relative z-10 flex flex-col items-center text-center">
                            <h3 className="text-2xl font-black text-slate-700 mb-8 leading-tight tracking-tight pb-1">Required Documents</h3>

                            <div className="grid grid-cols-2 gap-4 flex-grow relative z-10 w-full">
                                {[
                                    { title: "KYC Documents", desc: "Aadhaar, PAN Card, or Passport", icon: "🆔" },
                                    { title: "Bank Details", desc: "Cancelled Cheque or Passbook Copy", icon: "💳" },
                                    { title: "Digital Uploads", desc: "Recent Photograph & Signature", icon: "✍️" },
                                    { title: "Address Proof", desc: "Passport, Bills, or Bank Statement", icon: "📍" }
                                ].map((doc, i) => (
                                    <div key={i} className="flex flex-col items-center text-center gap-4 p-5 bg-white/50 backdrop-blur-md rounded-[2rem] border border-white/60 hover:bg-white/90 transition-all group/item shadow-sm hover:shadow-lg hover:shadow-teal-500/5 h-full justify-center">
                                        <div className="text-3xl group-hover/item:scale-125 group-hover/item:rotate-12 transition-transform duration-500 mb-1">{doc.icon}</div>
                                        <div>
                                            <h4 className="font-extrabold text-slate-700 text-sm mb-1">{doc.title}</h4>
                                            <p className="text-[10px] text-slate-500 font-bold leading-tight">{doc.desc}</p>
                                        </div>
                                    </div>
                                ))}
                            </div>

                            <div className="mt-10 p-6 bg-white/70 backdrop-blur-md rounded-[2rem] border border-teal-100 shadow-lg shadow-teal-500/5 flex flex-col items-center text-center gap-4 w-full">
                                <div className="w-12 h-12 bg-teal-50 rounded-2xl flex items-center justify-center text-[#1CADA3] shrink-0">
                                    <FileText size={24} />
                                </div>
                                <p className="text-sm text-teal-900 font-extrabold leading-relaxed italic">
                                    "Keep digital copies ready for a 100% paperless onboarding."
                                </p>
                            </div>
                        </div>
                    </motion.div>
                </div>
            </div>
        </section>
    );
}
