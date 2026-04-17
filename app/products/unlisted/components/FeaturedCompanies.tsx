'use client';

import React, { useEffect, useRef, useState } from 'react';
import Link from 'next/link';
import { Loader2, ArrowRight } from 'lucide-react';
import { useModal } from '../../../context/ModalContext';
import Image from 'next/image';

interface Company {
    id: number;
    name: string;
    sector: string;
    price: number;
    min_lot_size: number;
    logo_url?: string;
    depository_applicable?: string;
    available?: string; // Add this
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

const getAvailableValue = (id: number) => {
    // Generate a consistent value based on company ID
    const random = ((id * 997) % 100) + 20; // This creates consistent but varied numbers
    return `${random.toFixed(1)}K`;
};

export default function FeaturedCompanies({ companies, loading, onEnquire }: any) {
    const { openLogin } = useModal();
    const sectionRef = useRef<HTMLElement>(null);
    const [isVisible, setIsVisible] = useState(false);
    const [animatedItems, setAnimatedItems] = useState<number[]>([]);

    // Sort and Take first 5 for Home Page display
    const featured = companies
        .sort((a: any, b: any) => safeNumber(a.id) - safeNumber(b.id))
        .slice(0, 5)
        .map((company: any) => ({
            ...company,
            available: getAvailableValue(company.id) // Add static available value
        }));

    // Handle Buy Now click - opens login modal and stores company in session storage
    const handleBuyNow = (company: Company) => {
        sessionStorage.setItem('pendingBuyCompany', JSON.stringify({
            id: company.id,
            name: company.name,
            price: company.price,
            lotSize: company.min_lot_size || getLotSize(company.price),
            logo_url: company.logo_url,
            sector: company.sector
        }));
        openLogin();
    };

    useEffect(() => {
        const observer = new IntersectionObserver(
            (entries) => {
                const [entry] = entries;
                if (entry.isIntersecting) {
                    setIsVisible(true);
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
                
                {/* Header Section with Animation - Exact same as BuyShares */}
                <div 
                    className={`text-center mb-10 md:mb-16 transition-all duration-1000 transform ${
                        isVisible 
                            ? 'opacity-100 translate-y-0' 
                            : 'opacity-0 translate-y-10'
                    }`}>
                    <h3 className="text-3xl sm:text-4xl font-extrabold bg-gradient-to-r from-[#2076C7] to-[#1CADA3] bg-clip-text text-transparent mb-4">
                        Featured Opportunities
                    </h3>
                    <p className="text-sm sm:text-base text-gray-600 max-w-2xl mx-auto mb-4">
                        Discover exclusive pre-IPO investment opportunities in India&apos;s most promising companies
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
                        {/* Responsive Grid - Same as BuyShares grid pattern */}
                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5 gap-4 sm:gap-6 md:gap-8">
                            {featured.map((c: Company, index: number) => {
                                const price = safeNumber(c.price);
                                const lot = safeNumber(c.min_lot_size, getLotSize(price));
                                const isAnimated = animatedItems.includes(index);
                                
                                return (
                                    <div 
                                        key={c.id} 
                                        className={`bg-white rounded-2xl shadow-lg border border-gray-100 hover:border-[#2076C7] transition-all duration-300 hover:shadow-xl hover:-translate-y-1 flex flex-col h-full transform ${
                                            isVisible && isAnimated
                                                ? 'opacity-100 translate-y-0 scale-100'
                                                : 'opacity-0 translate-y-20 scale-95'
                                        }`}
                                        style={{
                                            transitionDelay: isVisible ? `${index * 100}ms` : '0ms',
                                            transitionProperty: 'opacity, transform, box-shadow',
                                            transitionDuration: '600ms',
                                            transitionTimingFunction: 'cubic-bezier(0.4, 0, 0.2, 1)'
                                        }}
                                    >
                                        {/* RECTANGULAR IMAGE CONTAINER - Exact same as BuyShares */}
                                        <div className="w-full h-32 bg-gray-50 rounded-t-2xl flex items-center justify-center border-b border-gray-100 overflow-hidden">
                                            <Image 
                                                src={c.logo_url || `https://placehold.co/200x150/2076C7/white?text=${c.name.charAt(0)}`}
                                                alt={c.name}
                                                className="w-full h-full object-contain p-3 transition-all duration-700 group-hover:scale-110"
                                                onError={(e) => {
                                                    (e.target as HTMLImageElement).src = `https://placehold.co/200x150/2076C7/white?text=${c.name.charAt(0)}`;
                                                }}
                                            />
                                        </div>

                                        {/* Company Details - Same padding and styling as BuyShares */}
                                        <div className="p-5 flex flex-col flex-grow">
                                            <h4 className="text-lg font-bold text-gray-900 mb-3 line-clamp-1 group-hover:text-[#2076C7] transition-colors duration-300">
                                                {c.name}
                                            </h4>
                                            
                                            {/* Price Display - Exact same as BuyShares with #2076C7 color */}
                                            <div className="mb-4 text-center">
                                                <span className="text-2xl font-bold text-[#2076C7]">
                                                    {formatPrice(price)}
                                                </span>
                                            </div>
                                            
                                            <div className="text-sm text-gray-500 text-center mb-4">{c.sector || 'Pre-IPO'}</div>

                                            {/* Info Grid - Same grid layout as BuyShares */}
                                            <div className="grid grid-cols-2 gap-x-6 gap-y-3 w-full mb-6">
                                                <div className="text-center">
                                                    <div className="text-xs text-gray-500 mb-0.5">Lot Size</div>
                                                    <div className="text-sm font-bold text-gray-900">
                                                        {lot.toLocaleString()} shares
                                                    </div>
                                                </div>
                                                <div className="text-center">
                                                    <div className="text-xs text-gray-500 mb-0.5">Depository</div>
                                                    <div className="text-sm font-bold text-gray-900">
                                                        {c.depository_applicable?.replace(/&AMP;/gi, '&').split(' ')[0] || 'NSDL'}
                                                    </div>
                                                </div>
                                                <div className="text-center">
                                                    <div className="text-xs text-gray-500 mb-0.5">Min. Invest</div>
                                                    <div className="text-sm font-bold text-gray-900">
                                                        ₹{(price * lot).toLocaleString()}
                                                    </div>
                                                </div>
                                                <div className="text-center">
                                                    <div className="text-xs text-gray-500 mb-0.5">Available</div>
                                                    <div className="text-sm font-bold text-gray-900">
                                                        {c.available} {/* Use static value instead of random */}
                                                    </div>
                                                </div>
                                            </div>

                                            {/* Buy Now Button - Exact same styling as BuyShares */}
                                            <button
                                                onClick={() => handleBuyNow(c)}
                                                className="w-full py-3.5 bg-gradient-to-r from-[#2076C7] to-[#1CADA3] text-white text-sm font-bold rounded-xl shadow-md hover:opacity-90 transition-all flex items-center justify-center gap-2"
                                            >
                                                Buy Now
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