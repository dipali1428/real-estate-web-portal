'use client';

import { motion, AnimatePresence, useScroll, useTransform } from 'framer-motion';
import {
    IconChevronRight, IconCalendar, IconMapPin, IconWorld, IconShieldCheck, IconAlertCircle, IconArrowLeft
} from '@tabler/icons-react';
import { useState, useRef } from 'react';
import { useRouter } from 'next/navigation';
import { useModal } from '../../../context/ModalContext';
import Image from 'next/image';

export default function HeroAndHighlights() {
    const containerRef = useRef(null);
    const { scrollY } = useScroll();

    // Parallax & Modal state
    const y1 = useTransform(scrollY, [0, 500], [0, 200]);
    const rotate = useTransform(scrollY, [0, 500], [0, 45]);
    const router = useRouter();

    // Quote Bar State
    const [destination, setDestination] = useState('');
    const [residingIn, setResidingIn] = useState('');
    const [departureDate, setDepartureDate] = useState('');
    const [showError, setShowError] = useState(false);

    const isFormValid = destination.trim() !== '' && residingIn.trim() !== '' && departureDate.trim() !== '';

    const { openLogin } = useModal();
    const handleGetFreeQuote = () => {
        if (isFormValid) {
            openLogin();
            setShowError(false);
        } else {
            setShowError(true);
        }
    };

    return (
        <>
            {/* --- HERO SECTION --- */}
            <section ref={containerRef} className="relative min-h-[60vh] flex items-center pt-24 md:pt-12 pb-14 overflow-hidden bg-white">
                {/* Back Button (Non-sticky) */}
                <div className="absolute z-10 top-4 left-4 md:top-12 md:left-12">
                    <button
                        onClick={() => router.push('/')}
                        aria-label="Back to Home"
                        className="md:hidden group flex items-center gap-2 p-2 text-gray-500"
                    >
                        <div className="p-2.5 bg-white/70 backdrop-blur-md rounded-full shadow-lg border border-gray-200/50 active:scale-80 transition-all" >
                            <IconArrowLeft className="w-4 h-4 text-gray-700" strokeWidth={2} />
                        </div>
                    </button>
                    <button
                        onClick={() => router.push('/')}
                        className="hidden md:inline-flex items-center gap-2 px-4 py-2 text-sm font-medium text-gray-700 bg-white/80 backdrop-blur-md rounded-lg border border-[#2076C7]/20 shadow-[0_4px_16px_rgba(32,118,199,0.1)] hover:bg-white hover:border-[#2076C7]/40 active:scale-95 transition-all group"
                    >
                        <IconArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" strokeWidth={2} />
                        Back to Home
                    </button>
                </div>

                <div className="relative z-10 max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-12 w-full">
                    <div className="flex flex-col lg:flex-row items-center gap-10 lg:gap-16">
                        {/* Left Column */}
                        <motion.div
                            initial={{ opacity: 0, x: -30 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ duration: 1 }}
                            className="lg:w-[65%] space-y-6 flex flex-col items-center lg:items-start text-center lg:text-left lg:pl-12"
                        >
                            <motion.div className="inline-flex items-center gap-2 px-4 py-2 bg-slate-20 border rounded-full text-[10px] font-black uppercase tracking-widest shadow-sm mt-16 md:mt-20 lg:mt-24 mb-6 lg:mb-8" style={{ color: '#2076C7', borderColor: 'rgba(32, 118, 199, 0.2)' }}>
                                <span className="relative flex h-2 w-2">
                                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#1CADA3] opacity-75"></span>
                                    <span className="relative inline-flex rounded-full h-2 w-2 bg-[#2076C7]"></span>
                                </span>
                                Travel Fearlessly
                            </motion.div>

                            <motion.h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-extrabold mb-4 sm:mb-6 leading-tight" style={{ background: 'linear-gradient(to right, #2076C7, #1CADA3, #2076C7)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text' }}>
                                Explore Your<br className="hidden md:block" />Boundaries with<br className="md:hidden" /><span className="inline-block lg:block"> Travel Insurance.</span>
                            </motion.h1>

                            <p className="text-gray-600 font-medium text-base md:text-lg mb-10 leading-relaxed max-w-xl mx-auto lg:mx-0">
                                Explore the world with confidence. Our comprehensive travel insurance protects you against medical emergencies, trip cancellations, and lost baggage across 195+ countries.
                            </p>
                        </motion.div>

                        {/* Right Column (Cartoon Illustration) */}
                        <motion.div className="lg:w-[35%] relative flex justify-center lg:justify-end items-center">
                            <div className="relative w-full max-w-[420px] aspect-square flex items-center justify-center">
                                {/* Decorative Background Rings & Glow */}
                                <div className="absolute inset-0 rounded-full bg-gradient-to-br from-[#2076C7]/10 via-transparent to-[#1CADA3]/10 blur-2xl" />
                                <div className="absolute inset-10 rounded-full border border-dashed border-[#2076C7]/20 animate-spin-slow" />

                                {/* Main Illustration (Circular Form) */}
                                <motion.div
                                    initial={{ opacity: 0, scale: 0.8, y: 20 }}
                                    animate={{ opacity: 1, scale: 1, y: 0 }}
                                    transition={{ duration: 0.8, ease: "easeOut" }}
                                    className="relative z-10 w-[280px] h-[280px] sm:w-[340px] sm:h-[340px] lg:w-[400px] lg:h-[400px] bg-white rounded-full flex items-center justify-center shadow-2xl border-8 border-white overflow-hidden group"
                                >
                                    {/* Subtle Gradient Inner Glow */}
                                    <div className="absolute inset-0 bg-gradient-to-tr from-[#2076C7]/5 to-[#1CADA3]/5" />

                                    <Image
                                        src="/travel insurance/travel_hero_illustration.png"
                                        alt="Travel Protection Illustration"
                                        fill
                                        className="w-full h-full object-cover drop-shadow-lg group-hover:scale-105 transition-transform duration-700"
                                    />
                                </motion.div>

                                {/* Floating Badges (Repositioned) */}
                                <motion.div animate={{ y: [0, -12, 0] }} transition={{ duration: 4, repeat: Infinity }} className="absolute -top-4 -right-2 bg-white p-3 rounded-2xl shadow-xl flex items-center gap-3 border border-[#2076C7]/10 z-20">
                                    <div className="w-8 h-8 bg-gradient-to-br from-[#1CADA3] to-[#2076C7] rounded-xl flex items-center justify-center text-white shadow-lg shadow-[#1CADA3]/30"><IconShieldCheck size={18} /></div>
                                    <div className="text-left">
                                        <div className="text-[8px] font-black text-slate-400 uppercase tracking-widest leading-none mb-1">Protection</div>
                                        <div className="text-[12px] font-black text-slate-800 leading-tight">Secure Journey</div>
                                    </div>
                                </motion.div>

                                <motion.div animate={{ y: [0, 12, 0] }} transition={{ duration: 5, repeat: Infinity, delay: 0.5 }} className="absolute bottom-2 -left-2 bg-white p-3 rounded-2xl shadow-xl flex items-center gap-3 border border-[#2076C7]/10 z-20">
                                    <div className="w-8 h-8 bg-gradient-to-br from-[#1CADA3] to-[#2076C7] rounded-xl flex items-center justify-center text-white shadow-lg shadow-[#2076C7]/30"><IconWorld size={18} /></div>
                                    <div className="text-left">
                                        <div className="text-[8px] font-black text-slate-400 uppercase tracking-widest leading-none mb-1">Global</div>
                                        <div className="text-[12px] font-black text-slate-800 leading-tight">195+ Countries</div>
                                    </div>
                                </motion.div>
                            </div>
                        </motion.div>
                    </div>

                    {/* Quote Widget */}
                    <div className="relative mt-4">
                        <AnimatePresence>
                            {showError && !isFormValid && (
                                <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: 10 }} className="absolute -top-12 left-1/2 -translate-x-1/2 bg-red-500 text-white px-4 py-1.5 rounded-full shadow-lg flex items-center gap-2 z-30">
                                    <IconAlertCircle size={16} />
                                    <span className="text-xs font-bold">Please fill all travel details first</span>
                                </motion.div>
                            )}
                        </AnimatePresence>
                        <div className="relative max-w-5xl mx-auto bg-white/70 backdrop-blur-2xl p-4 md:p-9 lg:p-4 rounded-[2rem] border border-slate-200 overflow-hidden">
                            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-3 lg:gap-4">
                                <div className={`flex flex-col gap-1 p-2.5 rounded-2xl bg-white/50 border transition-all ${showError && !destination ? 'border-red-200 bg-red-50/30' : 'border-slate-200'}`}>
                                    <div className="flex items-center gap-2 text-[#2076C7]"><IconMapPin size={18} /><span className="text-sm font-medium">Travel Destination</span></div>
                                    <select value={destination} onChange={(e) => setDestination(e.target.value)} className={`bg-transparent w-full text-base font-extrabold outline-none appearance-none cursor-pointer py-0.5 ${destination ? 'text-slate-900' : 'text-slate-400'}`}>
                                        <option value="">Select Destination</option>
                                        <option value="Asia">Asia</option>
                                        <option value="Schengen">Schengen Area</option>
                                        <option value="USA & Canada">USA & Canada</option>
                                        <option value="UK">United Kingdom</option>
                                        <option value="UAE">UAE / Middle East</option>
                                        <option value="Worldwide">Worldwide (Incl. US/CA)</option>
                                    </select>
                                </div>
                                <div className={`flex flex-col gap-1 p-2.5 rounded-2xl bg-white/50 border transition-all ${showError && !residingIn ? 'border-red-200 bg-red-50/30' : 'border-slate-200'}`}>
                                    <div className="flex items-center gap-2 text-[#2076C7]"><IconWorld size={18} /><span className="text-sm font-medium">Residing In</span></div>
                                    <select value={residingIn} onChange={(e) => setResidingIn(e.target.value)} className={`bg-transparent w-full text-base font-extrabold outline-none appearance-none cursor-pointer py-0.5 ${residingIn ? 'text-slate-900' : 'text-slate-400'}`}>
                                        <option value="">Select Region</option><option value="India">India</option><option value="United States">United States</option>
                                    </select>
                                </div>
                                <div className={`flex flex-col gap-1 p-2.5 rounded-2xl bg-white/50 border transition-all ${showError && !departureDate ? 'border-red-200 bg-red-50/30' : 'border-slate-200'}`}>
                                    <div className="flex items-center gap-2 text-[#2076C7]"><IconCalendar size={18} /><span className="text-sm font-medium">Departure Date</span></div>
                                    <input type="text" placeholder="Select Dates" value={departureDate} onChange={(e) => setDepartureDate(e.target.value)} className={`bg-transparent w-full text-base font-extrabold outline-none py-0.5 ${departureDate ? 'text-slate-900' : 'text-slate-400'}`} onFocus={(e) => e.target.type = 'date'} onBlur={(e) => { if (!e.target.value) e.target.type = 'text'; }} />
                                </div>
                                <button
                                    onClick={handleGetFreeQuote}
                                    className="w-full lg:w-auto px-10 py-4 bg-gradient-to-r from-[#2076C7] to-[#1CADA3] text-white rounded-2xl text-xs md:text-sm font-black uppercase tracking-widest hover:shadow-[0_20px_40px_-10px_rgba(32,118,199,0.3)] hover:-translate-y-1 transition-all duration-300 shadow-lg active:scale-95"
                                >
                                    <span className="relative z-10 flex gap-3 items-center justify-center">Get Quote & Apply <IconChevronRight size={18} strokeWidth={3} /></span>
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </>
    );
}
