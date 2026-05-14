'use client';

import { motion } from 'framer-motion';
import { useRef } from 'react';
import { 
    TrendingUp, ShieldCheck, Building, 
    ChartPie, Clock, Award, ChevronLeft, ChevronRight,
} from 'lucide-react';

const benefits = [
    { icon: TrendingUp, title: 'High Return Potential', desc: 'Higher returns vs listed equities, especially post-IPO. Capitalize on early growth phases.' },
    { icon: ShieldCheck, title: 'Early Entry Advantage', desc: 'Invest before public listing at lower valuations before institutional premiums apply.' },
    { icon: Building, title: 'Access to Unicorns', desc: 'Exclusive access to fast-growing pre-IPO companies and late-stage startups.' },
    { icon: ChartPie, title: 'Portfolio Diversification', desc: 'Low correlation with public stock markets, helping balance your overall portfolio risk.' },
    { icon: Clock, title: 'Long-term Wealth', desc: 'Participate in the multi-year growth stories of emerging market leaders.' },
    { icon: Award, title: 'Pre-IPO Allocation', desc: 'Secure your share allocation before the highly oversubscribed public issues launch.' }
];

export default function UnlistedBenefits() {
    const scrollRef = useRef<HTMLDivElement>(null);

    const scroll = (direction: 'left' | 'right') => {
        if (scrollRef.current) {
            const { scrollLeft, clientWidth } = scrollRef.current;
            const scrollTo = direction === 'left' ? scrollLeft - clientWidth : scrollLeft + clientWidth;
            scrollRef.current.scrollTo({ left: scrollTo, behavior: 'smooth' });
        }
    };

    return (
        <section className="w-full bg-white py-20 relative overflow-hidden">
            <div className="max-w-[1440px] mx-auto px-6 relative z-10">
                
                {/* Section Header */}
                <div className="relative flex items-center justify-center mb-16">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="text-center"
                    >
                        <span className="text-[#2076C7] font-black tracking-widest uppercase text-[10px] mb-4 block">
                            Investor Value
                        </span>
                        <h2 className="text-3xl md:text-5xl font-extrabold mb-6 bg-gradient-to-r from-[#2076C7] to-[#1CADA3] bg-clip-text text-transparent drop-shadow-sm tracking-tight leading-tight">
                            Benefits of Unlisted Shares
                        </h2>
                        <div className="w-24 h-1 bg-gradient-to-r from-[#2076C7] via-[#1CADA3] to-[#2076C7] mx-auto rounded-full mb-6 opacity-30" />
                        <p className="text-gray-500 max-w-2xl mx-auto font-medium text-base md:text-lg leading-relaxed">
                            Unlock wealth creation opportunities usually reserved for institutional investors and venture capitalists.
                        </p>
                    </motion.div>
                </div>

                {/* Mobile Arrows */}
                <div className="flex md:hidden items-center justify-center gap-4 mb-10">
                    <button 
                        onClick={() => scroll('left')} 
                        className="w-12 h-12 rounded-full border border-slate-100 bg-white shadow-md flex items-center justify-center text-[#2076C7] active:scale-90 transition-all"
                    >
                        <ChevronLeft size={24} strokeWidth={2.5} />
                    </button>
                    <button 
                        onClick={() => scroll('right')} 
                        className="w-12 h-12 rounded-full border border-slate-100 bg-white shadow-md flex items-center justify-center text-[#2076C7] active:scale-90 transition-all"
                    >
                        <ChevronRight size={24} strokeWidth={2.5} />
                    </button>
                </div>

                {/* Carousel with side arrows */}
                <div className="relative flex items-center">
                    
                    {/* Desktop Left Arrow */}
                    <button 
                        onClick={() => scroll('left')} 
                        className="hidden md:flex absolute -left-6 z-20 w-12 h-12 rounded-full border border-slate-50 bg-white items-center justify-center text-[#2076C7] hover:bg-[#2076C7] hover:text-white transition-all active:scale-90 shadow-[0_10px_25px_rgba(0,0,0,0.1)]"
                    >
                        <ChevronLeft size={24} strokeWidth={2.5} />
                    </button>

                    <div 
                        ref={scrollRef} 
                        className="flex overflow-x-auto gap-8 pb-12 scrollbar-hide snap-x snap-mandatory touch-pan-x" 
                        style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
                    >
                        {benefits.map((b, i) => {
                            const Icon = b.icon;
                            return (
                                <motion.div
                                    key={b.title}
                                    initial={{ opacity: 0, y: 30 }}
                                    whileInView={{ opacity: 1, y: 0 }}
                                    viewport={{ once: true }}
                                    transition={{ duration: 0.5, delay: i * 0.05 }}
                                    className="min-w-[300px] md:min-w-[360px] bg-white rounded-[2.5rem] p-10 border border-slate-50 shadow-[0_10px_40px_rgba(0,0,0,0.04)] hover:shadow-[0_20px_60px_rgba(32,118,199,0.12)] hover:-translate-y-2 transition-all duration-500 group flex flex-col items-center text-center snap-start"
                                >
                                    {/* Icon Container */}
                                    <div className="w-16 h-16 bg-slate-50 rounded-2xl flex items-center justify-center text-[#2076C7] mb-8 group-hover:scale-110 group-hover:bg-[#2076C7] group-hover:text-white transition-all duration-500 shadow-sm">
                                        <Icon size={32} strokeWidth={1.5} />
                                    </div>

                                    {/* Text Content */}
                                    <h3 className="text-xl font-black text-slate-800 mb-4 tracking-tight leading-snug">
                                        {b.title}
                                    </h3>
                                    <p className="text-slate-500 text-sm md:text-base leading-relaxed font-medium">
                                        {b.desc}
                                    </p>
                                </motion.div>
                            );
                        })}
                    </div>

                    {/* Desktop Right Arrow */}
                    <button 
                        onClick={() => scroll('right')} 
                        className="hidden md:flex absolute -right-6 z-20 w-12 h-12 rounded-full border border-slate-50 bg-white items-center justify-center text-[#2076C7] hover:bg-[#2076C7] hover:text-white transition-all active:scale-90 shadow-[0_10px_25px_rgba(0,0,0,0.1)]"
                    >
                        <ChevronRight size={24} strokeWidth={2.5} />
                    </button>
                </div>
            </div>
        </section>
    );
}