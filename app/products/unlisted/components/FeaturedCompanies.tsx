'use client';

import React from 'react';
import Link from 'next/link';
import { Loader2, ArrowUp } from 'lucide-react';

interface Company {
    id: number;
    name: string;
    sector: string;
    price: number;
    min_lot_size: number;
    logo_url?: string;
    depository_applicable?: string;
}

// --- Data Helpers ---
const safeNumber = (val: any, def = 0) => 
    val === null || val === undefined ? def : 
    typeof val === 'number' ? val : 
    isNaN(parseFloat(val)) ? def : parseFloat(val);

const formatPrice = (price: number) => 
    price ? `₹${price.toLocaleString(undefined, { minimumFractionDigits: 2 })}` : 'N/A';

const getLotSize = (price: number) => {
    if (price >= 1000) return 5;
    if (price >= 500) return 10;
    if (price >= 100) return 50;
    return 100;
};

export default function FeaturedCompanies({ companies, loading, onEnquire }: any) {
    
    // Sort and Take first 3 for Home Page display
    const featured = companies
        .sort((a: any, b: any) => safeNumber(a.id) - safeNumber(b.id))
        .slice(0, 3);

    return (
        <section className="w-full bg-white py-20"> {/* Changed to solid white, no borders */}
            <div className="max-w-[1440px] mx-auto px-6">
                
                {/* Header Section */}
                <div className="text-center mb-16">
                    <h3 className="text-4xl font-extrabold bg-gradient-to-r from-[#2076C7] to-[#1CADA3] bg-clip-text text-transparent mb-4">
                        Featured Opportunities
                    </h3>
                    <div className="w-16 h-1 mx-auto bg-gradient-to-r from-[#2076C7] to-[#1CADA3] rounded-full" />
                </div>

                {loading ? (
                    <div className="flex justify-center py-20">
                        <Loader2 size={48} className="text-[#2076C7] animate-spin" />
                    </div>
                ) : (
                    <>
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
                            {featured.map((c: Company) => {
                                const price = safeNumber(c.price);
                                const lot = safeNumber(c.min_lot_size, getLotSize(price));
                                
                                return (
                                    <div 
                                        key={c.id} 
                                        className="bg-white rounded-[2.5rem] overflow-hidden shadow-[0_15px_45px_rgba(0,0,0,0.05)] hover:shadow-[0_20px_60px_rgba(0,0,0,0.1)] transition-all duration-500 group border border-slate-50 flex flex-col"
                                    >
                                        {/* Company Logo Container */}
                                        <div className="h-60 bg-slate-50/50 flex items-center justify-center p-10 relative">
                                            <img 
                                                src={c.logo_url || `https://placehold.co/200x150/2076C7/white?text=${c.name.charAt(0)}`}
                                                alt={c.name}
                                                className="max-h-full max-w-full object-contain group-hover:scale-110 transition-transform duration-500"
                                            />
                                            <span className="absolute top-5 right-6 px-3 py-1 bg-white/90 rounded-full text-[10px] font-black text-[#2076C7] shadow-sm uppercase tracking-widest">
                                                {c.sector || 'Pre-IPO'}
                                            </span>
                                        </div>

                                        {/* Company Details */}
                                        <div className="p-8 flex flex-col flex-grow">
                                            <h4 className="text-2xl font-black text-slate-800 mb-6 line-clamp-1 group-hover:text-[#2076C7] transition-colors">
                                                {c.name}
                                            </h4>
                                            
                                            <div className="flex justify-between items-end mb-8">
                                                <div>
                                                    <div className="text-[10px] font-bold text-slate-400 uppercase mb-1">Price/Share</div>
                                                    <div className="text-3xl font-black text-[#2076C7] tracking-tight">
                                                        {formatPrice(price)}
                                                    </div>
                                                </div>
                                                <div className="text-right">
                                                    <div className="text-[10px] font-bold text-slate-400 uppercase mb-1">Min. Lot</div>
                                                    <div className="font-bold text-slate-700 text-lg">
                                                        {lot.toLocaleString()} Shares
                                                    </div>
                                                </div>
                                            </div>

                                            <div className="flex items-center justify-between mb-8">
                                                <span className="text-xs text-slate-400 font-bold uppercase tracking-tight">Available Now</span>
                                                <span className="text-xs font-black text-[#1CADA3] bg-emerald-50 px-4 py-1.5 rounded-full">
                                                    Min: ₹{(price * lot).toLocaleString()}
                                                </span>
                                            </div>

                                            <button
                                                onClick={() => onEnquire(c)}
                                                className="mt-auto w-full py-5 bg-gradient-to-r from-[#2076C7] to-[#1CADA3] text-white font-black rounded-2xl shadow-lg hover:shadow-xl hover:scale-[1.02] active:scale-95 transition-all uppercase tracking-widest text-xs cursor-pointer"
                                            >
                                                Enquire Now
                                            </button>
                                        </div>
                                    </div>
                                );
                            })}
                        </div>

                        {/* View All Button */}
                        <div className="text-center mt-16">
                            <Link 
                                href="/products/unlisted/buy-shares" 
                                className="inline-flex items-center gap-3 px-10 py-5 bg-white text-[#2076C7] font-black rounded-2xl shadow-lg border-2 border-slate-100 hover:border-[#2076C7]/30 hover:bg-slate-50 transition-all group"
                            >
                                View All 150+ Companies 
                                <ArrowUp size={20} className="rotate-45 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
                            </Link>
                        </div>
                    </>
                )}
            </div>
        </section>
    );
}