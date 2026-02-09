"use client";

import React from 'react';
import { motion } from 'framer-motion';
import { Landmark, Building2, ShieldCheck, HeartPulse, Clock, ArrowRightLeft, TrendingUp, Info } from 'lucide-react';

const BankVsNBFC = () => {
    return (
        <section className="py-24 bg-gray-50 relative overflow-hidden">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
                <div className="text-center mb-12">
                    <h2 className="text-3xl md:text-4xl font-extrabold mb-3 bg-clip-text text-transparent drop-shadow-sm" style={{ background: 'linear-gradient(to right, #2076C7, #1CADA3)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>Bank FD vs. NBFC FD</h2>
                    <div className="w-24 h-1 mx-auto rounded-full mb-4" style={{ background: 'linear-gradient(to right, #2076C7, #1CADA3)' }}></div>
                    <p className="text-gray-600">
                        Understanding the key differences helps you choose the right balance between safety and higher returns for your wealth growth.
                    </p>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
                    {/* Bank FD Card */}
                    <motion.div
                        initial={{ opacity: 0, x: -30 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        className="bg-white rounded-[40px] p-8 md:p-12 shadow-lg relative overflow-hidden group hover:translate-y-[-10px] transition-all duration-500"
                    >
                        <div className="absolute top-0 left-0 w-full h-[6px]" style={{ background: 'linear-gradient(to right, #2076C7, #1CADA3)' }}></div>
                        <div className="relative z-10">
                            <div className="flex items-center gap-4 mb-8">
                                <div className="w-16 h-16 rounded-2xl bg-primary/10 flex items-center text-gray-700 justify-center text-primary">
                                    <Landmark size={32} />
                                </div>
                                <h3 className="text-3xl font-bold text-slate-700">Bank FD</h3>
                            </div>

                            <ul className="space-y-6">
                                <li className="flex items-start gap-4 p-4 rounded-2xl bg-gray-50 border border-gray-100">
                                    <ShieldCheck className="text-green-500 mt-1 flex-shrink-0" size={24} />
                                    <div>
                                        <h4 className="font-bold text-slate-700 mb-1">DICGC Insured</h4>
                                        <p className="text-sm text-gray-500 font-medium">Deposits up to ₹5 Lakh (Principal + Interest) are insured by RBI's subsidiary.</p>
                                    </div>
                                </li>
                                <li className="flex items-start gap-4 p-4 rounded-2xl bg-gray-50 border border-gray-100">
                                    <HeartPulse className="text-blue-500 mt-1 flex-shrink-0" size={24} />
                                    <div>
                                        <h4 className="font-bold text-slate-700 mb-1">Highly Regulated</h4>
                                        <p className="text-sm text-gray-500 font-medium">Directly governed by RBI policies ensuring maximum transparency.</p>
                                    </div>
                                </li>
                                <li className="flex items-start gap-4 p-4 rounded-2xl bg-gray-50 border border-gray-100">
                                    <Clock className="text-amber-500 mt-1 flex-shrink-0" size={24} />
                                    <div>
                                        <h4 className="font-bold text-slate-700 mb-1">Stable Interest</h4>
                                        <p className="text-sm text-gray-500 font-medium">Offers moderate but steady interest rates tailored for conservative growth.</p>
                                    </div>
                                </li>
                            </ul>
                        </div>
                    </motion.div>

                    {/* NBFC FD Card */}
                    <motion.div
                        initial={{ opacity: 0, x: 30 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        className="bg-white rounded-[40px] p-8 md:p-12 shadow-lg relative overflow-hidden group hover:translate-y-[-10px] transition-all duration-500"
                    >
                        <div className="absolute top-0 left-0 w-full h-[6px]" style={{ background: 'linear-gradient(to right, #2076C7, #1CADA3)' }}></div>
                        <div className="relative z-10">
                            <div className="flex items-center gap-4 mb-8">
                                <div className="w-16 h-16 rounded-2xl bg-secondary/10 flex text-gray-700 items-center justify-center text-secondary">
                                    <ArrowRightLeft size={32} />
                                </div>
                                <h3 className="text-3xl font-bold text-slate-700">NBFC FD</h3>
                            </div>

                            <ul className="space-y-6">
                                <li className="flex items-start gap-4 p-4 rounded-2xl bg-gray-50 border border-gray-100">
                                    <TrendingUp className="text-green-500 mt-1 flex-shrink-0" size={24} />
                                    <div>
                                        <h4 className="font-bold text-slate-700 mb-1">Higher Yields</h4>
                                        <p className="text-sm text-gray-500 font-medium">Typically offers 1-2% higher interest rates compared to traditional banks.</p>
                                    </div>
                                </li>
                                <li className="flex items-start gap-4 p-4 rounded-2xl bg-gray-50 border border-gray-100">
                                    <ShieldCheck className="text-amber-500 mt-1 flex-shrink-0" size={24} />
                                    <div>
                                        <h4 className="font-bold text-slate-700 mb-1">Credit Rated Safety</h4>
                                        <p className="text-sm text-gray-500 font-medium">Safety depends on corporate credit ratings (AAA, AA+) from CRISIL/ICRA.</p>
                                    </div>
                                </li>
                                <li className="flex items-start gap-4 p-4 rounded-2xl bg-gray-50 border border-gray-100">
                                    <Clock className="text-blue-500 mt-1 flex-shrink-0" size={24} />
                                    <div>
                                        <h4 className="font-bold text-slate-700 mb-1">Flexibility</h4>
                                        <p className="text-sm text-gray-500 font-medium">More flexible tenure options and frequent interest payout choices.</p>
                                    </div>
                                </li>
                            </ul>
                        </div>
                    </motion.div>
                </div>

                <div className="mt-16 w-full bg-gradient-to-r from-[#2076C7] to-[#1CADA3] text-white py-8 px-8 md:px-12 rounded-2xl font-semibold shadow-md hover:shadow-lg transition cursor-pointer relative overflow-hidden">
                    <div className="absolute top-0 left-0 w-full h-full opacity-10 bg-[radial-gradient(circle_at_20%_50%,white,transparent)]"></div>
                    <div className="flex flex-col md:flex-row items-center gap-10 relative z-10">
                        <div className="w-24 h-24 rounded-full bg-white/20 backdrop-blur-md flex items-center justify-center flex-shrink-0">
                            <Info size={48} className="text-white" />
                        </div>
                        <div>
                            <h4 className="text-2xl font-bold mb-4 tracking-tight text-white">Key Takeaway for Investors</h4>
                            <p className="text-lg text-blue-50 leading-relaxed font-medium">
                                While Bank FDs offer sovereign-grade security via DICGC insurance, NBFC FDs are excellent for boosting your overall portfolio returns.
                                We advise conservative investors to stick with Banks, while those seeking higher yields can explore AAA-rated corporate FDs with Shriram or Bajaj.
                            </p>
                        </div>
                    </div>
                </div>
            </div >

            <div className="absolute bottom-0 left-0 w-full h-1/2 bg-[radial-gradient(ellipse_at_bottom,rgba(28,173,163,0.05),transparent_70%)] z-0"></div>
        </section >
    );
};

export default BankVsNBFC;
