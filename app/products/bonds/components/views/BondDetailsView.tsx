"use client";

import { motion } from "framer-motion";
import { ArrowLeft, ShieldCheck, Clock, Calendar, Lock, Award, Info, TrendingUp, AlertTriangle } from "lucide-react";
import { bondsData } from "../../data/bondsData";

interface Props {
    id: number;
    onApply: () => void;
    onBack: () => void;
}

export default function BondDetailsView({ id, onApply, onBack }: Props) {
    const bond = bondsData.find(b => b.id === id);

    if (!bond) {
        return (
            <div className="py-20 text-center">
                <h2 className="text-2xl font-bold text-gray-800 mb-4">Bond Not Found</h2>
                <button onClick={onBack} className="text-[#2076C7] font-bold hover:underline">Back to List</button>
            </div>
        );
    }

    return (
        <div className="py-12 md:py-16 bg-white min-h-screen font-sans px-4 sm:px-6 lg:px-8">
            <div className="max-w-7xl mx-auto">
                {/* Navigation */}
                <button
                    onClick={onBack}
                    className="flex items-center gap-2 text-[#2076C7] font-bold mb-6 md:mb-8 hover:gap-3 transition-all group text-sm md:text-base"
                >
                    <ArrowLeft className="w-4 h-4 md:w-5 md:h-5 group-hover:-translate-x-1 transition-transform" />
                    Back to Overview
                </button>

                <div className="grid lg:grid-cols-3 gap-12">
                    {/* Left Column: Key Info & Stats */}
                    <div className="lg:col-span-2 space-y-8">
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            className="bg-white rounded-3xl md:rounded-[3rem] p-6 md:p-12 shadow-xl border border-gray-100"
                        >
                            <div className="flex flex-wrap gap-3 mb-6">
                                {bond.featured && (
                                    <span className="bg-gradient-to-r from-[#1CADA3] to-[#148079] text-white text-xs font-bold px-4 py-1.5 rounded-full uppercase tracking-wider flex items-center gap-2 shadow-md">
                                        <Award size={16} /> Top Rated Choice
                                    </span>
                                )}
                                <span className={`text-xs font-bold px-4 py-1.5 rounded-full uppercase tracking-wider flex items-center gap-2 border ${bond.type === "Secured"
                                        ? "bg-teal-50 text-teal-700 border-teal-100"
                                        : "bg-blue-50 text-blue-700 border-blue-100"
                                    }`}>
                                    <Lock size={16} /> {bond.type}
                                </span>
                            </div>

                            <h1 className="text-2xl md:text-5xl font-black text-[#0B1C2E] mb-3 md:mb-4 leading-tight">
                                {bond.company}
                            </h1>
                            <p className="text-gray-400 font-mono text-sm mb-10">ISIN: {bond.isin}</p>

                            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6">
                                <div className="bg-blue-50/50 p-4 md:p-6 rounded-2xl md:rounded-3xl border border-blue-100">
                                    <p className="text-[9px] md:text-[10px] text-gray-500 font-black uppercase tracking-widest mb-1 md:mb-2">Coupon (PA)</p>
                                    <p className="text-xl md:text-3xl font-black text-[#2076C7]">{bond.coupon}</p>
                                    <p className="text-[9px] md:text-[10px] text-blue-400 mt-1 font-bold">{bond.frequency}</p>
                                </div>
                                <div className="bg-teal-50/50 p-4 md:p-6 rounded-2xl md:rounded-3xl border border-teal-100">
                                    <p className="text-[9px] md:text-[10px] text-gray-500 font-black uppercase tracking-widest mb-1 md:mb-2">Yield (XIRR)</p>
                                    <p className="text-xl md:text-3xl font-black text-[#1CADA3]">{bond.yield}</p>
                                    <p className="text-[9px] md:text-[10px] text-teal-400 mt-1 font-bold">Annualized</p>
                                </div>
                                <div className="bg-gray-50 p-4 md:p-6 rounded-2xl md:rounded-3xl border border-gray-100">
                                    <p className="text-[9px] md:text-[10px] text-gray-500 font-black uppercase tracking-widest mb-1 md:mb-2">Rating</p>
                                    <p className="text-xl md:text-3xl font-black text-gray-900">{bond.rating}</p>
                                    <p className="text-[9px] md:text-[10px] text-gray-400 mt-1 font-bold">Stable Outlook</p>
                                </div>
                                <div className="bg-gray-50 p-4 md:p-6 rounded-2xl md:rounded-3xl border border-gray-100">
                                    <p className="text-[9px] md:text-[10px] text-gray-500 font-black uppercase tracking-widest mb-1 md:mb-2">Maturity</p>
                                    <p className="text-base md:text-xl font-black text-gray-900 leading-tight mt-1">{bond.maturity}</p>
                                    <p className="text-[9px] md:text-[10px] text-gray-400 mt-1 font-bold">Full Term</p>
                                </div>
                            </div>
                        </motion.div>

                        {/* Additional Details Sections */}
                        <div className="grid md:grid-cols-2 gap-8">
                            <motion.div
                                initial={{ opacity: 0, x: -20 }}
                                animate={{ opacity: 1, x: 0 }}
                                transition={{ delay: 0.2 }}
                                className="bg-white rounded-[2.5rem] p-8 shadow-lg border border-gray-50"
                            >
                                <div className="flex items-center gap-3 mb-6">
                                    <div className="p-3 bg-blue-50 rounded-2xl">
                                        <Info className="text-[#2076C7]" size={24} />
                                    </div>
                                    <h3 className="text-xl font-bold text-[#0B1C2E]">Investment Details</h3>
                                </div>
                                <ul className="space-y-4">
                                    <li className="flex justify-between items-center py-2 border-b border-gray-50">
                                        <span className="text-gray-500 font-medium">Minimum Investment</span>
                                        <span className="font-bold text-gray-900">{bond.minInvestment}</span>
                                    </li>
                                    <li className="flex justify-between items-center py-2 border-b border-gray-50">
                                        <span className="text-gray-500 font-medium">Interest Frequency</span>
                                        <span className="font-bold text-gray-900">{bond.frequency}</span>
                                    </li>
                                    <li className="flex justify-between items-center py-2 border-b border-gray-50">
                                        <span className="text-gray-500 font-medium">Bond Category</span>
                                        <span className="font-bold text-gray-900">{bond.category === "Private" ? "Corporate" : "State Guaranteed"}</span>
                                    </li>
                                    {bond.callDate && (
                                        <li className="flex justify-between items-center py-2 border-b border-gray-50">
                                            <span className="text-teal-600 font-medium">Next Call Date</span>
                                            <span className="font-bold text-teal-700">{bond.callDate}</span>
                                        </li>
                                    )}
                                </ul>
                            </motion.div>

                            <motion.div
                                initial={{ opacity: 0, x: 20 }}
                                animate={{ opacity: 1, x: 0 }}
                                transition={{ delay: 0.3 }}
                                className="bg-white rounded-[2.5rem] p-8 shadow-lg border border-gray-50"
                            >
                                <div className="flex items-center gap-3 mb-6">
                                    <div className="p-3 bg-teal-50 rounded-2xl">
                                        <TrendingUp className="text-[#1CADA3]" size={24} />
                                    </div>
                                    <h3 className="text-xl font-bold text-[#0B1C2E]">Growth Potential</h3>
                                </div>
                                <div className="p-6 bg-gradient-to-br from-[#1CADA3]/5 to-transparent rounded-3xl border border-[#1CADA3]/10">
                                    <p className="text-sm text-gray-600 leading-relaxed mb-4">
                                        This bond offers a superior yield compared to traditional fixed deposits, making it an excellent choice for <span className="font-bold text-teal-700">Wealth Appreciation</span> with managed risk.
                                    </p>
                                    <div className="flex items-center gap-2 text-xs font-bold text-teal-600 uppercase tracking-widest">
                                        <ShieldCheck size={14} /> High Safety Rating
                                    </div>
                                </div>
                            </motion.div>
                        </div>
                    </div>

                    {/* Right Column: CTA & Risk */}
                    <div className="space-y-8">
                        <motion.div
                            initial={{ opacity: 0, scale: 0.95 }}
                            animate={{ opacity: 1, scale: 1 }}
                            className="bg-gradient-to-br from-[#0B1C2E] to-[#1a3a5a] rounded-3xl md:rounded-[3rem] p-6 md:p-8 text-white shadow-2xl relative overflow-hidden sticky top-8"
                        >
                            <div className="absolute top-0 right-0 w-32 h-32 bg-blue-500/10 rounded-full blur-3xl" />

                            <h3 className="text-2xl font-bold mb-6 relative z-10">Start Your Investment</h3>

                            <div className="space-y-6 mb-10 relative z-10">
                                <div className="flex justify-between items-center pb-4 border-b border-white/10">
                                    <span className="text-blue-200/70 text-sm">Target Return</span>
                                    <span className="text-xl font-black text-[#1CADA3]">{bond.yield}</span>
                                </div>
                                <div className="flex justify-between items-center pb-4 border-b border-white/10">
                                    <span className="text-blue-200/70 text-sm">Security Type</span>
                                    <span className="text-base font-bold text-white">{bond.type}</span>
                                </div>
                                <div className="p-4 bg-white/5 rounded-2xl flex items-center gap-4">
                                    <div className="w-10 h-10 rounded-full bg-[#2076C7]/20 flex items-center justify-center">
                                        <ShieldCheck className="text-[#2076C7]" size={20} />
                                    </div>
                                    <div>
                                        <p className="text-[10px] font-bold text-blue-200/50 uppercase">Verified Issue</p>
                                        <p className="text-xs font-medium">Compliance Checked</p>
                                    </div>
                                </div>
                            </div>

                            <button
                                onClick={onApply}
                                className="w-full bg-[#1CADA3] hover:bg-[#168a82] text-white py-5 rounded-2xl font-black text-lg transition-all shadow-lg shadow-teal-900/40 relative z-10 active:scale-95"
                            >
                                Apply Now
                            </button>

                            <p className="mt-6 text-[10px] text-center text-blue-200/40 font-bold uppercase tracking-widest relative z-10">
                                Powered by Infinity Arthvishva
                            </p>
                        </motion.div>

                        <div className="bg-orange-50 border border-orange-100 rounded-3xl md:rounded-[2.5rem] p-6 md:p-8">
                            <div className="flex items-center gap-3 mb-4">
                                <AlertTriangle className="text-orange-500" size={20} />
                                <h4 className="font-bold text-orange-900 text-sm italic">Risk Note</h4>
                            </div>
                            <p className="text-xs text-orange-800/70 leading-relaxed italic">
                                Fixed income investments are subject to market risks. Please read the offer document carefully before investing.
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
