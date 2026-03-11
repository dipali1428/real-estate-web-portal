'use client';

import { motion } from 'framer-motion';
import { IconCheck, IconShieldCheck, IconCurrencyRupee, IconClock, IconHeartbeat, IconCloudRain, IconStar, IconArrowLeft, IconArrowRight } from '@tabler/icons-react';
import { useRef, useState, useEffect } from 'react';

// ─── Why Cattle Insurance Data ───────────────────────────────────────────────

const benefits = [
    { icon: IconShieldCheck, title: 'Comprehensive Death Coverage', desc: 'Covers death of cattle due to accident, disease, natural calamities, and surgical operations.', color: 'bg-blue-100 text-blue-800' },
    { icon: IconCurrencyRupee, title: 'Affordable Premiums', desc: 'Plans starting as low as ₹200/year. Special subsidies available for small and marginal farmers.', color: 'bg-teal-100 text-teal-800' },
    { icon: IconClock, title: 'Quick Claim Settlement', desc: 'Claims processed within 48 hours of intimation with minimal documentation required.', color: 'bg-indigo-100 text-indigo-800' },
    { icon: IconHeartbeat, title: 'Veterinary Support', desc: 'Access to empaneled veterinary doctors for health certificates and claim verification.', color: 'bg-cyan-100 text-cyan-800' },
    { icon: IconCloudRain, title: 'Natural Calamity Cover', desc: 'Coverage against floods, cyclones, earthquakes, lightning and other natural disasters.', color: 'bg-sky-100 text-sky-800' },
    { icon: IconStar, title: 'Government Subsidy', desc: 'Up to 50% premium subsidy available for BPL farmers and SC/ST category beneficiaries.', color: 'bg-blue-100 text-blue-800' },
];

export default function WhyCattleAndEligibility() {
    const scrollRef = useRef<HTMLDivElement>(null);
    const [canScrollLeft, setCanScrollLeft] = useState(false);
    const [canScrollRight, setCanScrollRight] = useState(true);

    const checkScroll = () => {
        if (scrollRef.current) {
            const { scrollLeft, scrollWidth, clientWidth } = scrollRef.current;
            setCanScrollLeft(scrollLeft > 10);
            setCanScrollRight(scrollLeft < scrollWidth - clientWidth - 10);
        }
    };

    const scroll = (direction: 'left' | 'right') => {
        if (scrollRef.current) {
            const { clientWidth } = scrollRef.current;
            const scrollAmount = clientWidth * 0.8;
            scrollRef.current.scrollBy({
                left: direction === 'left' ? -scrollAmount : scrollAmount,
                behavior: 'smooth'
            });
        }
    };

    useEffect(() => {
        checkScroll();
        window.addEventListener('resize', checkScroll);
        return () => window.removeEventListener('resize', checkScroll);
    }, []);

    return (
        <>
            {/* ── Why Cattle Insurance Section ───────────────────────── */}
            <section className="py-8 bg-white relative overflow-hidden">
                <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 md:px-12">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.7 }}
                        className="text-center mb-10 flex flex-col items-center"
                    >
                        <h2 className="text-3xl md:text-4xl font-extrabold mb-3 bg-linear-to-r from-[#2076C7] to-[#1CADA3] bg-clip-text text-transparent drop-shadow-sm">
                            Why Cattle Insurance Matters
                        </h2>
                        <p className="text-slate-500 max-w-2xl mx-auto text-lg mt-6 font-medium leading-relaxed">
                            Livestock is one of the most valuable assets for Indian farmers. Protecting them with insurance ensures financial stability during difficult times.
                        </p>
                    </motion.div>

                    {/* Navigation Arrows Container */}
                    <div className="relative group">
                        {/* Control Buttons */}
                        <div className="absolute top-1/2 -translate-y-1/2 -left-4 md:-left-6 z-20 pointer-events-none w-full flex justify-between">
                            <button
                                onClick={() => scroll('left')}
                                disabled={!canScrollLeft}
                                className={`p-3 rounded-full bg-white shadow-xl border border-gray-100 text-[#2076C7] transition-all pointer-events-auto ${canScrollLeft ? 'opacity-100 scale-100 hover:bg-[#2076C7] hover:text-white' : 'opacity-0 scale-90'}`}
                                aria-label="Previous"
                            >
                                <IconArrowLeft size={24} strokeWidth={2.5} />
                            </button>
                            <button
                                onClick={() => scroll('right')}
                                disabled={!canScrollRight}
                                className={`p-3 rounded-full bg-white shadow-xl border border-gray-100 text-[#2076C7] transition-all pointer-events-auto ${canScrollRight ? 'opacity-100 scale-100 hover:bg-[#2076C7] hover:text-white' : 'opacity-0 scale-90'}`}
                                aria-label="Next"
                            >
                                <IconArrowRight size={24} strokeWidth={2.5} />
                            </button>
                        </div>

                        {/* Horizontal Scroll Area */}
                        <div
                            ref={scrollRef}
                            onScroll={checkScroll}
                            className="flex overflow-x-auto hide-scrollbar snap-x snap-mandatory gap-6 px-4 py-8 -mx-4 cursor-grab active:cursor-grabbing"
                        >
                            {benefits.map((b, i) => {
                                const Icon = b.icon;
                                return (
                                    <motion.div
                                        key={b.title}
                                        initial={{ opacity: 0, scale: 0.95 }}
                                        whileInView={{ opacity: 1, scale: 1 }}
                                        viewport={{ once: true }}
                                        transition={{ duration: 0.5, delay: i * 0.05 }}
                                        className="min-w-[240px] sm:min-w-[280px] md:min-w-[340px] max-w-[340px] bg-white rounded-[2.5rem] p-6 sm:p-8 border border-blue-50 hover:border-blue-200 hover:shadow-[0_20px_50px_-12px_rgba(32,118,199,0.12)] transition-all duration-500 group snap-center flex flex-col items-center text-center"
                                    >
                                        <div className={`w-14 h-14 rounded-2xl flex items-center justify-center mb-6 ${b.color} group-hover:scale-110 transition-transform shadow-sm`}>
                                            <Icon size={28} strokeWidth={1.8} />
                                        </div>
                                        <h3 className="text-xl font-extrabold text-[#2076C7] mb-3 tracking-tight transition-transform">{b.title}</h3>
                                        <p className="text-slate-500 text-sm leading-relaxed font-medium">{b.desc}</p>
                                    </motion.div>
                                );
                            })}
                        </div>
                    </div>
                </div>
            </section>

            {/* ── Eligibility & Documentation Section ───────────────────── */}
            <section className="pt-8 pb-12 bg-[#fafcfe]">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-12">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.7 }}
                        className="text-center mb-10"
                    >                       
                    <h2 className="text-3xl md:text-4xl font-extrabold mb-3 bg-linear-to-r from-[#2076C7] to-[#1CADA3] bg-clip-text text-transparent drop-shadow-sm">
                            Eligibility & Documentation
                        </h2>
                        <p className="text-slate-500 max-w-2xl mx-auto text-lg mt-6 font-medium leading-relaxed">
                            Accessible to all livestock owners. Ensure your animals are healthy and properly identified.
                        </p>
                    </motion.div>

                    <div className="grid grid-cols-1 lg:grid-cols-5 gap-6 lg:gap-8 items-start">

                        {/* Left: Criteria List (3/5 width) */}
                        <div className="lg:col-span-3 grid grid-cols-1 md:grid-cols-2 gap-4">
                            {[
                                { label: 'Animal Age', desc: 'Cattle: 0.5-10y | Buffalo: 0.5-12y | Sheep: 3m-6y', icon: IconCheck },
                                { label: 'Health Status', desc: 'Certified healthy by an empaneled vet at enrollment.', icon: IconHeartbeat },
                                { label: 'Identification', desc: 'Mandatory ear tagging or permanent marks required.', icon: IconShieldCheck },
                                { label: 'Owner Type', desc: 'Farmers, cooperatives, dairy farms & agro-enterprises.', icon: IconStar },
                                { label: 'Vaccination', desc: 'Must follow standard government health protocols.', icon: IconCloudRain },
                                { label: 'Verification', desc: 'Valid Aadhaar and bank details for claim processing.', icon: IconCurrencyRupee }
                            ].map((item, i) => {
                                const Icon = item.icon;
                                return (
                                    <motion.div
                                        key={item.label}
                                        initial={{ opacity: 0, x: -10 }}
                                        whileInView={{ opacity: 1, x: 0 }}
                                        viewport={{ once: true }}
                                        transition={{ duration: 0.4, delay: i * 0.05 }}
                                        className="flex gap-3 p-4 bg-white rounded-2xl border border-blue-50 hover:border-blue-100 hover:shadow-md transition-all group"
                                    >
                                        <div className="w-8 h-8 bg-blue-50 rounded-xl flex items-center justify-center shrink-0 group-hover:bg-[#2076C7] group-hover:text-white transition-all text-[#2076C7]">
                                            <Icon size={18} strokeWidth={2.5} />
                                        </div>
                                        <div>
                                            <div className="font-extrabold text-[#2076C7] text-xs mb-1 uppercase tracking-tight">{item.label}</div>
                                            <div className="text-slate-500 text-xs leading-relaxed font-bold">{item.desc}</div>
                                        </div>
                                    </motion.div>
                                );
                            })}
                        </div>

                        {/* Right: Documents Card (2/5 width) */}
                        <motion.div
                            initial={{ opacity: 0, x: 20 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.7 }}
                            className="lg:col-span-2"
                        >
                            <div className="bg-gradient-to-br from-[#2076C7] to-[#1CADA3] rounded-[2rem] p-6 text-white shadow-xl relative overflow-hidden h-full">
                                <div className="absolute top-4 right-4 text-white/5 opacity-10">
                                    <IconShieldCheck size={120} stroke={1} />
                                </div>
                                <h3 className="text-xl font-extrabold tracking-tight mb-6 relative z-10">Documents Required</h3>
                                <ul className="grid grid-cols-1 gap-3 relative z-10">
                                    {[
                                        'Owner Aadhaar / Voter ID',
                                        'Owner Bank Passbook',
                                        'Veterinary Health Certificate',
                                        'Animal Ear Tag ID',
                                        'Owner & Animal Photos',
                                        'Land Records (Khasra)'
                                    ].map((doc, i) => (
                                        <li key={i} className="flex items-center gap-3 text-[11px] font-black group">
                                            <div className="w-5 h-5 bg-white/20 rounded-md flex items-center justify-center shrink-0 group-hover:bg-white group-hover:text-[#2076C7] transition-all">
                                                <span className="text-[9px]">{i + 1}</span>
                                            </div>
                                            <span className="opacity-90">{doc}</span>
                                        </li>
                                    ))}
                                </ul>

                                <div className="mt-8 p-4 bg-white/10 backdrop-blur-sm rounded-xl border border-white/20 text-[10px] relative z-10 flex gap-2">
                                    <span className="shrink-0">💡</span>
                                    <p className="font-bold leading-relaxed opacity-95">
                                        Documents must be clear. Special <strong>premium subsidies</strong> available for BPL/SC/ST farmers.
                                    </p>
                                </div>
                            </div>
                        </motion.div>
                    </div>
                </div>
            </section>
        </>
    );
}
