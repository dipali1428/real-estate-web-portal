'use client';

import { motion } from 'framer-motion';
import { IconShieldCheck, IconCurrencyRupee, IconClock, IconHeartbeat, IconReceipt, IconBuildingBank, IconStar, IconWorld, IconChevronLeft, IconChevronRight } from '@tabler/icons-react';
import { useRef } from 'react';

const benefits = [
    { icon: IconShieldCheck, title: 'Zero Pre-payment Penalty', desc: 'Repay your loan early without any extra charges — save on interest and become debt-free faster.' },
    { icon: IconCurrencyRupee, title: 'Section 80E Tax Benefit', desc: 'Claim 100% deduction on interest paid for up to 8 years — available to the student or parents.' },
    { icon: IconClock, title: 'Moratorium Period', desc: 'No EMI during your course + 1 year. Focus on studies, not repayment.' },
    { icon: IconHeartbeat, title: 'Insurance Cover Included', desc: 'Life and health insurance bundled with select loan products to protect your financial future.' },
    { icon: IconReceipt, title: 'Covers All Expenses', desc: 'Tuition, accommodation, travel, books, equipment, exam fees — everything is covered.' },
    { icon: IconBuildingBank, title: 'Direct Disbursal', desc: 'Funds sent directly to institution — simplifying visa & admission fee requirements.' },
    { icon: IconStar, title: 'Government Subsidy Available', desc: 'Interest subsidy for EWS students under Central Sector Interest Subsidy (CSIS) scheme.' },
    { icon: IconWorld, title: '40+ Country Coverage', desc: 'Loans available for top universities in USA, UK, Canada, Australia, Germany, Ireland & more.' },
];

export default function BenefitsSection() {
    const scrollRef = useRef<HTMLDivElement>(null);

    const scroll = (direction: 'left' | 'right') => {
        if (scrollRef.current) {
            const { scrollLeft, clientWidth } = scrollRef.current;
            const scrollTo = direction === 'left' ? scrollLeft - clientWidth : scrollLeft + clientWidth;
            scrollRef.current.scrollTo({ left: scrollTo, behavior: 'smooth' });
        }
    };

    return (
        <>
            {/* ── Key Benefits ──────────────────────────────────────────── */}
            <section className="py-6 bg-white relative overflow-hidden">
                <div className="relative z-10 max-w-6xl mx-auto px-6 md:px-12">
                    <div className="relative flex items-center justify-center mb-12">
                        {/* Centered Header */}
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            className="text-center"
                        >
                            <span className="text-[#2076C7] font-black tracking-widest uppercase text-xs mb-4 block">Why Choose Us</span>
                            <h2 className="text-3xl md:text-4xl font-extrabold mb-4 bg-gradient-to-r from-[#2076C7] to-[#1CADA3] bg-clip-text text-transparent">
                                Benefits of Our Education Loan
                            </h2>
                            <div className="w-24 h-1 bg-gradient-to-r from-[#2076C7] via-[#1CADA3] to-[#2076C7] mx-auto rounded-full mb-4" />
                            <p className="text-gray-600 max-w-xl mx-auto font-medium text-lg leading-relaxed">
                                We go beyond just financing — every product is designed to give you maximum flexibility.
                            </p>
                        </motion.div>

                    </div>

                    {/* Mobile Arrows (Visible only on small screens) */}
                    <div className="flex md:hidden items-center justify-center gap-4 mb-8">
                        <button
                            onClick={() => scroll('left')}
                            className="w-10 h-10 rounded-full border-2 border-[#2076C7]/20 flex items-center justify-center text-[#2076C7]"
                            aria-label="Scroll Left"
                        >
                            <IconChevronLeft size={20} strokeWidth={3} />
                        </button>
                        <button
                            onClick={() => scroll('right')}
                            className="w-10 h-10 rounded-full border-2 border-[#2076C7]/20 flex items-center justify-center text-[#2076C7]"
                            aria-label="Scroll Right"
                        >
                            <IconChevronRight size={20} strokeWidth={3} />
                        </button>
                    </div>

                    {/* Carousel with side arrows */}
                    <div className="relative flex items-center">

                        {/* Left Arrow */}
                        <button
                            onClick={() => scroll('left')}
                            className="hidden md:flex absolute -left-6 z-10 w-11 h-11 rounded-full border-2 border-[#2076C7]/20 bg-white items-center justify-center text-[#2076C7] hover:bg-[#2076C7] hover:text-white transition-all active:scale-90 shadow-lg shadow-blue-100/50"
                            aria-label="Scroll Left"
                        >
                            <IconChevronLeft size={22} strokeWidth={3} />
                        </button>

                        <div
                            ref={scrollRef}
                            className="flex overflow-x-auto gap-6 pb-8 scrollbar-hide snap-x snap-mandatory touch-pan-x"
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
                                        transition={{ duration: 0.4, delay: i * 0.05 }}
                                        className="min-w-[280px] md:min-w-[320px] bg-white rounded-[2rem] p-8 border border-slate-100 hover:border-blue-200 hover:shadow-[0_20px_50px_-12px_rgba(32,118,199,0.1)] transition-all duration-300 group flex flex-col items-center text-center snap-start"
                                    >
                                        <div className="w-14 h-14 rounded-2xl flex items-center justify-center mb-6 bg-[#2076C7]/10 text-[#2076C7] group-hover:scale-110 transition-transform shadow-sm">
                                            <Icon size={28} strokeWidth={1.8} />
                                        </div>
                                        <h3 className="text-xl font-extrabold text-[#2076C7] mb-3 tracking-tight leading-snug">{b.title}</h3>
                                        <p className="text-slate-500 text-xs leading-relaxed font-bold">{b.desc}</p>
                                    </motion.div>
                                );
                            })}
                        </div>

                        {/* Right Arrow */}
                        <button
                            onClick={() => scroll('right')}
                            className="hidden md:flex absolute -right-6 z-10 w-11 h-11 rounded-full border-2 border-[#2076C7]/20 bg-white items-center justify-center text-[#2076C7] hover:bg-[#2076C7] hover:text-white transition-all active:scale-90 shadow-lg shadow-blue-100/50"
                            aria-label="Scroll Right"
                        >
                            <IconChevronRight size={22} strokeWidth={3} />
                        </button>
                    </div>
                </div>
            </section>
        </>
    );
}
