'use client';

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Bookmark } from 'lucide-react';
import { Bond } from '../../../../products/bonds/data/bondsData';

interface BondCardProps {
    bond: Bond;
    idx: number;
    onView: (bond: Bond) => void;
    onBuy: (bond: Bond) => void;
    onWishlist?: (bond: Bond) => Promise<boolean>;
    isWishlisted?: boolean;
}

export default function BondCard({ bond, idx, onView, onBuy, onWishlist, isWishlisted: initialWishlisted = false }: BondCardProps) {
    const [wishlisted, setWishlisted] = useState(initialWishlisted);
    const [wishlistLoading, setWishlistLoading] = useState(false);

    // Sync state with props when parent state updates or on reload
    React.useEffect(() => {
        setWishlisted(initialWishlisted);
    }, [initialWishlisted]);

    const handleWishlistClick = async (e: React.MouseEvent) => {
        e.stopPropagation();
        if (!onWishlist || wishlistLoading) return;
        setWishlistLoading(true);
        try {
            const success = await onWishlist(bond);
            if (success) setWishlisted(prev => !prev);
        } finally {
            setWishlistLoading(false);
        }
    };

    return (
        <motion.div 
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: idx * 0.05 }}
            className="bg-white rounded-[2rem] p-5 shadow-sm border border-slate-50 hover:shadow-xl transition-all duration-300 flex flex-col group font-sans"
        >
            <div className="flex justify-between items-start mb-4">
                <span className="bg-[#1CADA3]/10 text-[#1CADA3] text-[9px] font-black px-2.5 py-1.5 rounded-lg uppercase tracking-wider">
                    {bond.category}
                </span>
                <button 
                    onClick={handleWishlistClick}
                    disabled={wishlistLoading}
                    title={wishlisted ? "Remove from Wishlist" : "Add to Wishlist"}
                    className={`p-1.5 rounded-lg transition-all duration-200 ${
                        wishlisted 
                            ? 'text-[#2076C7] hover:bg-blue-50' 
                            : 'text-slate-300 hover:text-[#2076C7] hover:bg-slate-50'
                    } ${wishlistLoading ? 'opacity-50 cursor-wait' : 'cursor-pointer active:scale-90'}`}
                >
                    <Bookmark className="w-5 h-5" fill={wishlisted ? "currentColor" : "none"} color="currentColor" />
                </button>
            </div>
            
            <h3 className="font-black text-slate-800 text-base mb-4 line-clamp-2 min-h-[48px] leading-tight">
                {bond.company}
            </h3>

            <div className="grid grid-cols-2 gap-3 mb-5">
                <div className="bg-slate-50 rounded-xl p-3 flex flex-col items-center justify-center text-center">
                    <span className="text-slate-400 text-[8px] font-black uppercase mb-1">Coupon</span>
                    <span className="text-[#2076C7] font-black text-sm">{bond.coupon}</span>
                </div>
                <div className="bg-slate-50 rounded-xl p-3 flex flex-col items-center justify-center text-center">
                    <span className="text-slate-400 text-[8px] font-black uppercase mb-1">Yield</span>
                    <span className="text-[#1CADA3] font-black text-sm">{bond.yield}</span>
                </div>
            </div>

            <div className="flex gap-2">
                <button 
                    onClick={() => onView(bond)}
                    className="flex-1 bg-slate-50 hover:bg-slate-100 text-slate-600 py-3 rounded-xl font-black text-[10px] uppercase transition-all"
                >
                    Details
                </button>
                <button 
                    onClick={() => onBuy(bond)}
                    className="flex-1 bg-[#2076C7] text-white py-3 rounded-xl font-black text-[10px] uppercase transition-all shadow-md hover:shadow-lg active:scale-95"
                >
                    Buy Now
                </button>
            </div>
        </motion.div>
    );
}