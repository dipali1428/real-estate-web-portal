'use client';

import React, { useEffect, useRef, useState } from 'react';
import Link from 'next/link';
import { Loader2, ArrowRight } from 'lucide-react';

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
    const sectionRef = useRef<HTMLElement>(null);
    const [isVisible, setIsVisible] = useState(false);
    const [animatedItems, setAnimatedItems] = useState<number[]>([]);

    // Sort and Take first 5 for Home Page display
    const featured = companies
        .sort((a: any, b: any) => safeNumber(a.id) - safeNumber(b.id))
        .slice(0, 5);

    useEffect(() => {
        const observer = new IntersectionObserver(
            (entries) => {
                const [entry] = entries;
                if (entry.isIntersecting) {
                    setIsVisible(true);
                    
                    // Stagger the animation of individual items
                    featured.forEach((_: Company, index: number) => {
                        setTimeout(() => {
                            setAnimatedItems(prev => [...prev, index]);
                        }, 100 * (index + 1));
                    });
                }
            },
            {
                threshold: 0.1,
                rootMargin: '0px 0px -50px 0px'
            }
        );

        if (sectionRef.current) {
            observer.observe(sectionRef.current);
        }

        return () => {
            if (sectionRef.current) {
                observer.unobserve(sectionRef.current);
            }
        };
    }, [featured]);

    return (
        <section 
            ref={sectionRef}
            className="w-full bg-white py-12 md:py-20 overflow-hidden"
        >
            <div className="max-w-[1440px] mx-auto px-4 sm:px-6">
                
                {/* Header Section with Animation */}
                <div 
                    className={`text-center mb-10 md:mb-16 transition-all duration-1000 transform ${
                        isVisible 
                            ? 'opacity-100 translate-y-0' 
                            : 'opacity-0 translate-y-10'
                    }`}
                >
                    <h3 className="text-3xl sm:text-4xl font-extrabold bg-gradient-to-r from-[#2076C7] to-[#1CADA3] bg-clip-text text-transparent mb-4">
                        Featured Opportunities
                    </h3>
                    <p className="text-sm sm:text-base text-gray-600 max-w-2xl mx-auto mb-4">
                        Discover exclusive pre-IPO investment opportunities in India's most promising companies
                    </p>
                    <div className="w-16 h-1 mx-auto bg-gradient-to-r from-[#2076C7] to-[#1CADA3] rounded-full transform transition-all duration-1000 delay-300 scale-x-0 origin-center" 
                         style={{ transform: isVisible ? 'scaleX(1)' : 'scaleX(0)' }}
                    />
                </div>

                {loading ? (
                    <div className="flex justify-center py-20">
                        <Loader2 size={48} className="text-[#2076C7] animate-spin" />
                    </div>
                ) : (
                    <>
                        {/* Responsive Grid with Staggered Animation */}
                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5 gap-4 sm:gap-6 md:gap-8">
                            {featured.map((c: Company, index: number) => {
                                const price = safeNumber(c.price);
                                const lot = safeNumber(c.min_lot_size, getLotSize(price));
                                const isAnimated = animatedItems.includes(index);
                                
                                return (
                                    <div 
                                        key={c.id} 
                                        className={`bg-white rounded-2xl sm:rounded-[2rem] overflow-hidden shadow-[0_10px_30px_rgba(0,0,0,0.03)] hover:shadow-[0_30px_60px_rgba(32,118,199,0.15)] transition-all duration-500 group border border-slate-100 flex flex-col h-full transform ${
                                            isVisible && isAnimated
                                                ? 'opacity-100 translate-y-0 scale-100'
                                                : 'opacity-0 translate-y-20 scale-95'
                                        } hover:-translate-y-2 hover:scale-[1.02]`}
                                        style={{
                                            transitionDelay: isVisible ? `${index * 100}ms` : '0ms',
                                            transitionProperty: 'opacity, transform, box-shadow',
                                            transitionDuration: '600ms',
                                            transitionTimingFunction: 'cubic-bezier(0.4, 0, 0.2, 1)'
                                        }}
                                    >
                                        {/* Company Logo Container - Responsive height with hover animation */}
                                        <div className="h-40 sm:h-48 md:h-56 bg-gradient-to-br from-slate-50 to-white flex items-center justify-center p-4 sm:p-6 md:p-8 relative overflow-hidden">
                                            <img 
                                                src={c.logo_url || `https://placehold.co/200x150/2076C7/white?text=${c.name.charAt(0)}`}
                                                alt={c.name}
                                                className="max-h-full max-w-full object-contain transition-all duration-700 group-hover:scale-110"
                                                onError={(e) => {
                                                    (e.target as HTMLImageElement).src = `https://placehold.co/200x150/2076C7/white?text=${c.name.charAt(0)}`;
                                                }}
                                            />
                                            <span className="absolute top-3 right-3 sm:top-4 sm:right-4 px-2 sm:px-3 py-1 bg-white/90 backdrop-blur-sm rounded-full text-[8px] sm:text-[10px] font-black text-[#2076C7] shadow-sm uppercase tracking-widest transform transition-all duration-300 group-hover:scale-105 group-hover:bg-[#2076C7] group-hover:text-white">
                                                {c.sector || 'Pre-IPO'}
                                            </span>
                                            
                                            {/* Animated overlay on hover */}
                                            <div className="absolute inset-0 bg-gradient-to-t from-[#2076C7]/0 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />
                                        </div>

                                        {/* Company Details - Responsive padding */}
                                        <div className="p-4 sm:p-5 md:p-6 flex flex-col flex-grow">
                                            <h4 className="text-base sm:text-lg md:text-xl font-black text-slate-800 mb-3 sm:mb-4 line-clamp-1 group-hover:text-[#2076C7] transition-colors duration-300">
                                                {c.name}
                                            </h4>
                                            
                                            {/* Price and Lot - Responsive layout */}
                                            <div className="flex justify-between items-end mb-4 sm:mb-6">
                                                <div>
                                                    <div className="text-[8px] sm:text-[10px] font-bold text-slate-400 uppercase mb-1">Price/Share</div>
                                                    <div className="text-xl sm:text-2xl md:text-3xl font-black text-[#2076C7] tracking-tight group-hover:scale-105 transition-transform duration-300 origin-left">
                                                        {formatPrice(price)}
                                                    </div>
                                                </div>
                                                <div className="text-right">
                                                    <div className="text-[8px] sm:text-[10px] font-bold text-slate-400 uppercase mb-1">Min. Lot</div>
                                                    <div className="font-bold text-slate-700 text-sm sm:text-base md:text-lg group-hover:text-[#2076C7] group-hover:scale-105 transition-all duration-300">
                                                        {lot.toLocaleString()}
                                                    </div>
                                                </div>
                                            </div>

                                            {/* Investment range - Responsive */}
                                            <div className="flex items-center justify-between mb-4 sm:mb-6">
                                                <span className="text-[10px] sm:text-xs text-slate-400 font-bold uppercase tracking-tight">
                                                    Available Now
                                                </span>
                                                <span className="text-[10px] sm:text-xs font-black text-[#1CADA3] bg-emerald-50 px-2 sm:px-3 py-1 sm:py-1.5 rounded-full">
                                                    Min: ₹{(price * lot).toLocaleString()}
                                                </span>
                                            </div>

                                            {/* Enquire Button - Responsive with slide animation */}
                                            <button
                                                onClick={() => onEnquire(c)}
                                                className="mt-auto w-full py-3 sm:py-4 bg-gradient-to-r from-[#2076C7] to-[#1CADA3] text-white font-black rounded-xl sm:rounded-2xl shadow-lg hover:shadow-xl hover:scale-[1.02] active:scale-95 transition-all duration-300 uppercase tracking-widest text-[10px] sm:text-xs cursor-pointer relative overflow-hidden group/btn"
                                            >
                                                <span className="relative z-10 block group-hover:scale-105 transition-transform duration-300">Buy Now</span>
                                                <div className="absolute inset-0 bg-gradient-to-r from-[#1CADA3] to-[#2076C7] opacity-0 group-hover/btn:opacity-100 transition-opacity duration-300" />
                                                <div className="absolute inset-0 transform translate-x-[-100%] group-hover/btn:translate-x-0 bg-white/20 transition-transform duration-500" />
                                            </button>
                                        </div>
                                    </div>
                                );
                            })}
                        </div>

                        {/* View All Button - Responsive with hover animation */}
                        <div 
                            className={`text-center mt-10 sm:mt-12 md:mt-16 transition-all duration-1000 delay-500 transform ${
                                isVisible 
                                    ? 'opacity-100 translate-y-0' 
                                    : 'opacity-0 translate-y-10'
                            }`}
                        >
                            <Link 
                                href="/products/unlisted/buy-shares" 
                                className="inline-flex items-center gap-2 sm:gap-3 px-6 sm:px-8 md:px-10 py-3 sm:py-4 md:py-5 bg-white text-[#2076C7] font-black rounded-xl sm:rounded-2xl shadow-lg border-2 border-slate-100 hover:border-[#2076C7]/30 hover:bg-slate-50 transition-all duration-300 group text-sm sm:text-base relative overflow-hidden hover:-translate-y-1 hover:shadow-xl"
                            >
                                <span className="relative z-10">View All {companies.length}+ Companies</span>
                                <ArrowRight size={16} className="sm:w-5 sm:h-5 group-hover:translate-x-2 transition-transform duration-300 relative z-10" />
                                <div className="absolute inset-0 bg-gradient-to-r from-[#2076C7]/0 via-[#2076C7]/5 to-[#2076C7]/0 transform translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-1000" />
                            </Link>
                        </div>
                    </>
                )}
            </div>
        </section>
    );
}