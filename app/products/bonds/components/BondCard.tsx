"use client";

import { motion } from "framer-motion";
import { useState } from "react";
import { Bond } from "../data/bondsData";
import { TrendingUp, ShieldCheck, Calendar, Clock, Lock, Award } from "lucide-react";
import { toast } from "react-hot-toast";
import BondDetailModal from "./BondDetailModal";

interface Props {
    bond: Bond;
    onInvest?: (id: number) => void;
}

export default function BondCard({ bond, onInvest }: Props) {
    const [isModalOpen, setIsModalOpen] = useState(false);

    const handleInvest = () => {
        if (onInvest) {
            onInvest(bond.id);
        } else {
            toast.success(`Investment initiated for ${bond.company}`, {
                duration: 3000,
                icon: '🚀',
                style: {
                    borderRadius: '16px',
                    background: '#2076C7',
                    color: '#fff',
                    fontWeight: '600',
                },
            });
        }
    };

    return (
        <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="bg-white rounded-[1.5rem] md:rounded-[2rem] border border-slate-100 hover:border-blue-200 hover:shadow-[0_20px_50px_-12px_rgba(32,118,199,0.1)] transition-all duration-500 group flex flex-col h-full relative overflow-hidden p-5 md:p-8 font-sans"
        >
            {/* Top Badges */}
            <div className="flex flex-wrap gap-2 mb-4">
                {bond.featured && (
                    <span className="bg-gradient-to-r from-[#1CADA3] to-[#148079] text-white text-[10px] font-bold px-3 py-1 rounded-full uppercase tracking-wider flex items-center gap-1 shadow-sm">
                        <Award size={12} /> Top Rated
                    </span>
                )}
                {bond.category === "PSU" && (
                    <span className="bg-blue-50 text-blue-700 text-[10px] font-bold px-3 py-1 rounded-full uppercase tracking-wider flex items-center gap-1 border border-blue-100">
                        <ShieldCheck size={12} /> PSU
                    </span>
                )}
                {bond.type === "Secured" && (
                    <span className="bg-teal-50 text-teal-700 text-[10px] font-bold px-3 py-1 rounded-full uppercase tracking-wider flex items-center gap-1 border border-teal-100">
                        <Lock size={12} /> Secured
                    </span>
                )}
                {bond.type === "Tax-Free" && (
                    <span className="bg-amber-50 text-amber-700 text-[10px] font-bold px-3 py-1 rounded-full uppercase tracking-wider flex items-center gap-1 border border-amber-100">
                        <TrendingUp size={12} /> Tax Free
                    </span>
                )}
                {bond.type === "Gold" && (
                    <span className="bg-yellow-50 text-yellow-700 text-[10px] font-bold px-3 py-1 rounded-full uppercase tracking-wider flex items-center gap-1 border border-yellow-200">
                        <Award size={12} /> SGB
                    </span>
                )}
                {bond.category === "Municipal" && (
                    <span className="bg-indigo-50 text-indigo-700 text-[10px] font-bold px-3 py-1 rounded-full uppercase tracking-wider flex items-center gap-1 border border-indigo-100">
                        <ShieldCheck size={12} /> Municipal
                    </span>
                )}
                {bond.category === "GSec" && (
                    <span className="bg-emerald-50 text-emerald-700 text-[10px] font-bold px-3 py-1 rounded-full uppercase tracking-wider flex items-center gap-1 border border-emerald-100">
                        <Award size={12} /> Sovereign
                    </span>
                )}
            </div>

            {/* Header */}
            <div className="mb-6">
                <h3 className="text-lg md:text-xl font-bold text-[#2076C7] line-clamp-2 min-h-[3rem] md:min-h-[3.5rem] leading-tight">
                    {bond.company}
                </h3>
                {bond.isin && (
                    <p className="text-[9px] md:text-[10px] text-gray-400 font-mono mt-1">ISIN: {bond.isin}</p>
                )}
            </div>

            {/* Main Stats Grid */}
            <div className="grid grid-cols-2 gap-3 md:gap-4 mb-6">
                <div className="bg-blue-50/50 p-3 md:p-4 rounded-xl md:rounded-2xl border border-blue-100">
                    <p className="text-[10px] md:text-xs text-gray-500 font-bold uppercase mb-1">Coupon</p>
                    <p className="text-xl md:text-2xl font-black text-[#2076C7]">{bond.coupon}</p>
                    <p className="text-[9px] md:text-[10px] text-gray-400 mt-1">{bond.frequency}</p>
                </div>
                <div className="bg-teal-50/50 p-3 md:p-4 rounded-xl md:rounded-2xl border border-teal-100">
                    <p className="text-[10px] md:text-xs text-gray-500 font-bold uppercase mb-1">Yield</p>
                    <p className="text-xl md:text-2xl font-black text-[#1CADA3]">{bond.yield}</p>
                    <p className="text-[9px] md:text-[10px] text-gray-400 mt-1">Annualized</p>
                </div>
            </div>

            {/* Secondary Stats */}
            <div className="space-y-3 mb-8">
                <div className="flex justify-between items-center text-sm pb-3 border-b border-gray-50">
                    <span className="text-gray-500 flex items-center gap-2">
                        <ShieldCheck size={16} className="text-gray-400" /> Rating
                    </span>
                    <span className="font-bold text-gray-900 bg-gray-100 px-2 py-0.5 rounded-md">{bond.rating}</span>
                </div>

                <div className="flex justify-between items-center text-sm pb-3 border-b border-gray-50">
                    <span className="text-gray-500 flex items-center gap-2">
                        <Clock size={16} className="text-gray-400" /> Maturity
                    </span>
                    <span className="font-bold text-gray-900">{bond.maturity}</span>
                </div>

                {bond.callDate && (
                    <div className="flex justify-between items-center text-sm pb-3 border-b border-gray-50 bg-teal-50/30 -mx-6 px-6 py-2">
                        <span className="text-teal-700/80 flex items-center gap-2 font-medium">
                            <Calendar size={16} /> Next Call Date
                        </span>
                        <span className="font-bold text-teal-800">{bond.callDate}</span>
                    </div>
                )}
            </div>

            {/* Action */}
            <div className="mt-auto">
                <div className="flex justify-between items-center mb-6 border-t border-black/5 pt-4">
                    <span className="text-sm font-bold text-slate-400 uppercase">Min Investment</span>
                    <span className="text-base font-extrabold text-[#2076C7]">{bond.minInvestment}</span>
                </div>
                <div className="flex gap-2 sm:gap-3">
                    <button
                        onClick={() => setIsModalOpen(true)}
                        className="flex-1 px-4 py-3.5 border-2 hover:border-[#2076C7] text-slate-500 hover:text-[#2076C7] rounded-2xl text-[10px] sm:text-xs font-black uppercase tracking-widest hover:bg-blue-50 transition-all duration-300 whitespace-nowrap group-hover:border-blue-200"
                    >
                        View Detail
                    </button>
                    <button
                        onClick={handleInvest}
                        suppressHydrationWarning={true}
                        className="relative flex-[1.5] text-white px-4 py-3.5 rounded-2xl text-[10px] sm:text-xs font-black uppercase tracking-widest shadow-lg hover:shadow-xl transform hover:-translate-y-1 transition-all duration-300 overflow-hidden cursor-pointer group"
                        style={{ background: 'linear-gradient(to right, #1CADA3, #2076C7)' }}
                    >
                        <span className="relative z-10 flex items-center justify-center gap-1">
                            Invest Now
                        </span>
                        <div className="absolute inset-0 transform scale-x-0 group-hover:scale-x-100 transition-transform origin-left duration-300" style={{ background: 'linear-gradient(to right, #189B8D, #1A68B0)' }}></div>
                    </button>
                </div>
            </div>

            <BondDetailModal 
                bond={bond} 
                isOpen={isModalOpen} 
                onClose={() => setIsModalOpen(false)} 
                onInvest={onInvest}
            />
        </motion.div>
    );
}
