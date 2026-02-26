'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { Check, ArrowRight, Shield, Heart, Zap, Crosshair } from 'lucide-react';

interface PlanProps {
    name: string;
    price: string;
    features: string[];
    isPopular?: boolean;
    color: string;
    bestFor: string;
    sumInsured: string;
    cashlessHospitals: string;
    claimSettlementRatio: string;
    onApply?: (planName: string) => void;
}

const HealthInsurancePlanCard: React.FC<PlanProps> = ({ name, price, features, isPopular, color, bestFor, sumInsured, cashlessHospitals, claimSettlementRatio, onApply }) => {
    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            whileHover={{ y: -5 }}
            className={`relative flex flex-col h-full font-sans transition-all duration-300 w-full max-w-[320px] mx-auto`}
        >
            <div className={`flex flex-col h-full bg-white rounded-[2rem] border transition-all duration-300 ${isPopular ? 'border-blue-400 ring-[6px] ring-blue-50' : 'border-gray-100 shadow-[0_10px_30px_rgba(0,0,0,0.03)]'}`}>

                {isPopular && (
                    <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-[#1CADA3] text-white px-5 py-1.5 rounded-full text-[9px] font-black uppercase tracking-widest z-30 shadow-md whitespace-nowrap">
                        Most Popular
                    </div>
                )}

                <div className="p-8 flex flex-col h-full">
                    {/* Header: Category and Name */}
                    <div className="mb-6 flex flex-col items-center text-center">
                        <span className="px-4 py-1.5 bg-gray-50 text-gray-400 rounded-full text-[9px] font-bold uppercase tracking-widest mb-6 border border-gray-100">
                            {bestFor}
                        </span>
                        <h3 className="text-xl font-bold text-[#2076C7] uppercase leading-tight tracking-tight mb-6 h-12 flex items-center justify-center">
                            {name}
                        </h3>
                    </div>

                    {/* Pricing */}
                    <div className="mb-8 flex flex-col items-start px-2">
                        <span className="text-gray-400 text-[10px] font-bold uppercase tracking-wider mb-1">Starting at</span>
                        <div className="flex items-baseline gap-1">
                            <span className="text-4xl font-black text-gray-900">{price}</span>
                            <span className="text-gray-400 text-sm font-medium">/mo*</span>
                        </div>
                    </div>

                    {/* Highlights Cards */}
                    <div className="grid grid-cols-2 gap-3 mb-4">
                        <div className="bg-gray-50/70 p-4 rounded-2xl border border-gray-100/50">
                            <p className="text-[8px] uppercase tracking-wider text-gray-400 font-bold mb-1">Sum Insured</p>
                            <p className="text-[11px] font-black text-gray-800 leading-tight">{sumInsured}</p>
                        </div>
                        <div className="bg-gray-50/70 p-4 rounded-2xl border border-gray-100/50">
                            <p className="text-[8px] uppercase tracking-wider text-gray-400 font-bold mb-1">Cashless</p>
                            <p className="text-[11px] font-black text-gray-800 leading-tight">{cashlessHospitals}</p>
                        </div>
                    </div>

                    {/* CSR Section */}
                    <div className="mb-10 flex justify-center">
                        <div className="bg-[#EFFFFB] px-6 py-2.5 rounded-full border border-[#D1F7ED] flex items-center justify-center gap-2">
                            <p className="text-[10px] uppercase tracking-wider text-[#1CADA3] font-bold">Claim Settlement Ratio</p>
                            <p className="text-[11px] font-black text-[#1CADA3] tracking-tight">{claimSettlementRatio}</p>
                        </div>
                    </div>

                    {/* Features List */}
                    <ul className="space-y-4 mb-10 flex-grow px-2">
                        {features.map((feature, idx) => (
                            <motion.li
                                key={idx}
                                initial={{ opacity: 0, x: -5 }}
                                whileInView={{ opacity: 1, x: 0 }}
                                transition={{ delay: idx * 0.05 }}
                                className="flex items-start gap-3 text-[12px] text-gray-700 font-semibold text-left"
                            >
                                <div className="shrink-0 w-6 h-6 rounded-full border-2 border-primary/20 flex items-center justify-center text-primary bg-blue-50/50 mt-0.5"
                                >
                                    <Check size={14} strokeWidth={4} />
                                </div>
                                {feature}
                            </motion.li>
                        ))}
                    </ul>

                    {/* Buttons/Actions */}
                    <div className="space-y-4 mt-auto">
                        <button
                            onClick={() => onApply?.(name)}
                            className="group relative w-full h-14 rounded-2xl font-bold tracking-wider text-[13px] text-white shadow-[0_10px_20px_rgba(28,173,163,0.2)] transition-all duration-300 overflow-hidden cursor-pointer active:scale-95 border-none"
                            style={{ background: 'linear-gradient(135deg, #2076C7, #1CADA3)' }}
                        >
                            <span className="relative z-10 flex items-center justify-center gap-2">
                                Consult an Advisor
                                <ArrowRight size={16} className="transition-transform group-hover:translate-x-1" />
                            </span>
                        </button>
                        <button className="w-full py-1 text-[10px] font-bold text-gray-400 hover:text-[#2076C7] transition-colors uppercase tracking-[0.2em] text-center">
                            TALK TO ADVISOR
                        </button>
                    </div>
                </div>
            </div>
        </motion.div>
    );
};


export default HealthInsurancePlanCard;
