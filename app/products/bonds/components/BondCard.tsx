"use client";

import { motion } from "framer-motion";
import { Bond } from "../data/bondsData";
import { TrendingUp, ShieldCheck, Calendar, Clock, Lock, Award } from "lucide-react";
import { toast } from "react-hot-toast";

interface Props {
    bond: Bond;
    onInvest?: (id: number) => void;
}

export default function BondCard({ bond, onInvest }: Props) {
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
            whileHover={{ scale: 1.02, y: -5 }}
            transition={{ duration: 0.3 }}
            className="bg-white rounded-[2rem] shadow-lg hover:shadow-2xl hover:shadow-blue-200/50 p-6 border border-gray-100 flex flex-col h-full relative overflow-hidden group"
        >
            {/* Top Badges */}
            <div className="flex gap-2 mb-4">
                {bond.featured && (
                    <span className="bg-gradient-to-r from-[#1CADA3] to-[#148079] text-white text-[10px] font-bold px-3 py-1 rounded-full uppercase tracking-wider flex items-center gap-1 shadow-sm">
                        <Award size={12} /> Top Rated
                    </span>
                )}
                {bond.type === "Secured" && (
                    <span className="bg-teal-50 text-teal-700 text-[10px] font-bold px-3 py-1 rounded-full uppercase tracking-wider flex items-center gap-1 border border-teal-100">
                        <Lock size={12} /> Secured
                    </span>
                )}
            </div>

            {/* Header */}
            <div className="mb-6">
                <h3 className="text-xl font-bold text-[#2076C7] line-clamp-2 min-h-[3.5rem] leading-tight">
                    {bond.company}
                </h3>
                {bond.isin && (
                    <p className="text-[10px] text-gray-400 font-mono mt-1">ISIN: {bond.isin}</p>
                )}
            </div>

            {/* Main Stats Grid */}
            <div className="grid grid-cols-2 gap-4 mb-6">
                <div className="bg-blue-50/50 p-4 rounded-2xl border border-blue-100">
                    <p className="text-xs text-gray-500 font-bold uppercase mb-1">Coupon</p>
                    <p className="text-2xl font-black text-[#2076C7]">{bond.coupon}</p>
                    <p className="text-[10px] text-gray-400 mt-1">{bond.frequency}</p>
                </div>
                <div className="bg-teal-50/50 p-4 rounded-2xl border border-teal-100">
                    <p className="text-xs text-gray-500 font-bold uppercase mb-1">Yield</p>
                    <p className="text-2xl font-black text-[#1CADA3]">{bond.yield}</p>
                    <p className="text-[10px] text-gray-400 mt-1">Annualized</p>
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
                <div className="flex justify-between items-center mb-4">
                    <p className="text-xs text-gray-400">Min Investment</p>
                    <p className="text-sm font-bold text-gray-900">{bond.minInvestment}</p>
                </div>
                <button
                    onClick={handleInvest}
                    className="w-full bg-[#2076C7] hover:bg-[#1CADA3] text-white py-4 rounded-xl font-bold transition-all duration-300 shadow-md hover:shadow-lg flex justify-center items-center gap-2 group-hover:scale-[1.02]"
                >
                    Invest Now
                </button>
            </div>
        </motion.div>
    );
}
