'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { Check, ArrowRight, Bookmark, BookmarkCheck, Loader2 } from 'lucide-react';

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
    isWishlisted?: boolean;
    onWishlistToggle?: () => void;
    wishlistLoading?: boolean;
}

const HealthInsurancePlanCard: React.FC<PlanProps> = ({ 
    name, 
    price, 
    features, 
    isPopular, 
    bestFor, 
    sumInsured, 
    cashlessHospitals, 
    claimSettlementRatio, 
    onApply,
    isWishlisted,
    onWishlistToggle,
    wishlistLoading
}) => {
    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            whileHover={{ y: -5 }}
            className={`relative flex flex-col h-full font-sans transition-all duration-300 w-full mx-auto`}
        >
            <div className={`flex flex-col h-full bg-white rounded-[1.5rem] border transition-all duration-300 ${isPopular ? 'border-blue-400 ring-[4px] ring-blue-50' : 'border-gray-100 shadow-[0_5px_20px_rgba(0,0,0,0.02)]'}`}>

                {isPopular && (
                    <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-[#1CADA3] text-white px-5 py-1.5 rounded-full text-[9px] font-black uppercase tracking-widest z-30 shadow-md whitespace-nowrap">
                        Most Popular
                    </div>
                )}

                {/* Bookmark */}
                <button
                    onClick={(e) => { e.stopPropagation(); onWishlistToggle?.(); }}
                    className={`absolute top-4 right-4 p-1.5 rounded-lg bg-white border border-gray-100 shadow-sm transition-colors z-10 ${wishlistLoading ? "opacity-50 cursor-wait" : "hover:text-[#2076C7] text-gray-400"
                        }`}
                    disabled={wishlistLoading}
                >
                    {wishlistLoading ? (
                        <Loader2 size={16} className="animate-spin text-[#2076C7]" />
                    ) : isWishlisted ? (
                        <BookmarkCheck size={16} className="text-[#2076C7]" fill="#2076C7" />
                    ) : (
                        <Bookmark size={16} />
                    )}
                </button>

                <div className="p-4 pt-6 flex flex-col h-full">
                    <div className="mb-2 flex flex-col items-start text-left pr-8">
                        <span className="px-2 py-0.5 bg-gray-50 text-gray-400 rounded-full text-[7px] font-bold uppercase tracking-widest mb-2 border border-gray-100">
                            {bestFor}
                        </span>
                        <h3 className="text-base font-bold text-[#2076C7] uppercase leading-tight tracking-tight mb-2 flex items-center justify-start min-h-[2.5rem]">
                            {name}
                        </h3>
                    </div>

                    <div className="mb-3 flex flex-col items-start px-1">
                        <span className="text-gray-400 text-[8px] font-bold uppercase tracking-wider mb-0">Starting at</span>
                        <div className="flex items-baseline gap-1">
                            <span className="text-xl font-black text-gray-900">{price}</span>
                            <span className="text-gray-400 text-[10px] font-medium">/mo*</span>
                        </div>
                    </div>

                    <div className="grid grid-cols-2 gap-1.5 mb-2.5">
                        <div className="bg-gray-50/70 p-2 rounded-lg border border-gray-100/50">
                            <p className="text-[6px] uppercase tracking-wider text-gray-400 font-bold mb-0.5">Sum Insured</p>
                            <p className="text-[9px] font-black text-gray-800 leading-tight">{sumInsured}</p>
                        </div>
                        <div className="bg-gray-50/70 p-2 rounded-lg border border-gray-100/50">
                            <p className="text-[6px] uppercase tracking-wider text-gray-400 font-bold mb-0.5">Cashless</p>
                            <p className="text-[9px] font-black text-gray-800 leading-tight">{cashlessHospitals}</p>
                        </div>
                    </div>

                    <div className="mb-4 flex justify-start">
                        <div className="bg-[#EFFFFB] px-3 py-1.5 rounded-full border border-[#D1F7ED] flex items-center justify-center gap-1.5">
                            <p className="text-[8px] uppercase tracking-wider text-[#1CADA3] font-bold">CSR</p>
                            <p className="text-[9px] font-black text-[#1CADA3] tracking-tight">{claimSettlementRatio}</p>
                        </div>
                    </div>

                    <ul className="space-y-1 mb-4 flex-grow px-1">
                        {features.map((feature, idx) => (
                            <motion.li
                                key={idx}
                                initial={{ opacity: 0, x: -5 }}
                                whileInView={{ opacity: 1, x: 0 }}
                                transition={{ delay: idx * 0.05 }}
                                className="flex items-start gap-2 text-[10px] text-gray-700 font-semibold text-left"
                            >
                                <div className="shrink-0 w-5 h-5 rounded-full border-2 border-[#2076C7]/20 flex items-center justify-center text-[#2076C7] bg-blue-50/50 mt-0.5">
                                    <Check size={12} strokeWidth={4} />
                                </div>
                                {feature}
                            </motion.li>
                        ))}
                    </ul>

                    <div className="mt-auto">
                        <button
                            onClick={() => onApply?.(name)}
                            className="group relative w-full h-10 rounded-xl font-bold tracking-wider text-[10px] text-white shadow-[0_5px_15px_rgba(28,173,163,0.15)] transition-all duration-300 overflow-hidden cursor-pointer active:scale-95 border-none"
                            style={{ background: 'linear-gradient(135deg, #2076C7, #1CADA3)' }}
                        >
                            <span className="relative z-10 flex items-center justify-center gap-2">
                                Buy Now
                                <ArrowRight size={14} className="transition-transform group-hover:translate-x-1" />
                            </span>
                        </button>
                    </div>
                </div>
            </div>
        </motion.div>
    );
};

export default HealthInsurancePlanCard;
