'use client';

import { motion } from 'framer-motion';
import {
    IconCreditCard, IconArrowRight, IconArrowLeft
} from '@tabler/icons-react';
import { useRouter } from 'next/navigation';


export default function HeroSection({ onApplyClick }: { onApplyClick: () => void }) {
    const router = useRouter();
    const handleBackHome = () => router.push('/');

    return (
        <section className="relative min-h-[75vh] flex items-center bg-white overflow-hidden pt-8 pb-16">
            {/* Back Button (Non-sticky) */}
            <div className="absolute z-10 top-8 left-4 md:top-12 md:left-12">
                <button
                    onClick={handleBackHome}
                    aria-label="Back to Home"
                    className="md:hidden group flex items-center gap-2 p-2 text-gray-500"
                >
                    <div className="p-2.5 bg-white/70 backdrop-blur-md rounded-full shadow-lg border border-gray-200/50 active:scale-80 transition-all" >
                        <IconArrowLeft className="w-4 h-4 text-gray-700" strokeWidth={2} />
                    </div>
                </button>
                <button
                    onClick={handleBackHome}
                    className="hidden md:inline-flex items-center gap-2 px-4 py-2 text-sm font-medium text-gray-700 bg-white/80 backdrop-blur-md rounded-lg border border-[#2076C7]/20 shadow-[0_4px_16px_rgba(32,118,199,0.1)] hover:bg-white hover:border-[#2076C7]/40 active:scale-95 transition-all group"
                >
                    <IconArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" strokeWidth={2} />
                    Back to Home
                </button>
            </div>
            <div className="max-w-[1440px] mx-auto px-6">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 lg:gap-2 items-center">

                    {/* Left: Content */}
                    <motion.div
                        initial={{ opacity: 0, x: -40 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.8 }}
                        className="space-y-6 flex flex-col items-center text-center max-w-2xl mx-auto"
                    >
                        <div className="inline-flex items-center gap-2 px-4 py-2 bg-slate-50 border rounded-full text-[10px] font-black uppercase tracking-widest shadow-sm mt-12 lg:mt-20" style={{ color: '#2076C7', borderColor: 'rgba(32, 118, 199, 0.2)' }}>
                            <IconCreditCard size={12} />
                            Credit Card • Infinity Arthvishva
                        </div>
                        <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-extrabold mb-4 sm:mb-6 leading-tight" style={{
                            background: 'linear-gradient(to right, #2076C7, #1CADA3, #2076C7)',
                            WebkitBackgroundClip: 'text',
                            WebkitTextFillColor: 'transparent',
                            backgroundClip: 'text'
                        }}>
                            Unlock Your
                            <br />
                            Financial Power
                        </h1>
                        <p className="text-lg sm:text-xl mb-6 text-gray-600 leading-relaxed max-w-lg text-center">
                            Get exclusive access to premium credit cards with up to 10% cashback, luxury travel perks, and airport lounge access. Compare and apply for the best cards in India.
                        </p>

                        {/* CTAs */}
                        <div className="flex flex-col sm:flex-row gap-4">
                            <button
                                onClick={onApplyClick}
                                className="group relative text-white px-10 py-5 rounded-lg font-bold text-xl shadow-lg hover:shadow-xl transform hover:-translate-y-1 transition-all duration-300 overflow-hidden cursor-pointer" style={{ background: 'linear-gradient(to right, #1CADA3, #2076C7)' }}
                            >
                                <span className="relative z-10 flex items-center justify-center gap-1">
                                    Apply Now
                                </span>
                                <div className="absolute inset-0 transform scale-x-0 group-hover:scale-x-100 transition-transform origin-left duration-300" style={{ background: 'linear-gradient(to right, #189B8D, #1A68B0)' }}></div>
                            </button>
                            <a
                                href="#eligibility"
                                className="group relative bg-white px-7 py-1.5 rounded-lg font-semibold text-lg border-2 hover:bg-blue-50 transform hover:-translate-y-1 transition-all duration-300 shadow-md hover:shadow-lg flex items-center justify-center gap-1 transition-all"
                                style={{ color: '#2076C7', borderColor: '#2076C7' }}
                            >
                                <span className="relative z-10 flex items-center justify-center gap-1">
                                    Check Eligibility
                                    <IconArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
                                </span>
                            </a>
                        </div>
                    </motion.div>

                    {/* Right: Illustration */}
                    <motion.div
                        initial={{ opacity: 0, x: 40 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 1, ease: "easeOut" }}
                        className="relative flex justify-center items-center lg:translate-y-20"
                    >
                        <div className="relative w-full max-w-[420px] aspect-square flex items-center justify-center">
                            {/* Decorative Background Rings & Glow */}
                            <div className="absolute inset-0 rounded-full bg-gradient-to-br from-[#2076C7]/10 via-transparent to-[#1CADA3]/10 blur-2xl" />
                            <div className="absolute inset-10 rounded-full border border-dashed border-[#2076C7]/20 animate-spin-slow" />

                            {/* Main Illustration (Circular Form) */}
                            <motion.div
                                initial={{ opacity: 0, scale: 0.8, y: 20 }}
                                animate={{ opacity: 1, scale: 1, y: 0 }}
                                transition={{ duration: 0.8, ease: "easeOut" }}
                                className="relative z-10 w-[280px] h-[280px] sm:w-[340px] sm:h-[340px] lg:w-[400px] lg:h-[400px] bg-white rounded-full flex items-center justify-center shadow-2xl border-6 border-white overflow-hidden group"
                            >
                                {/* Subtle Gradient Inner Glow */}
                                <div className="absolute inset-0 bg-gradient-to-tr from-[#2076C7]/5 to-[#1CADA3]/5" />

                                <img
                                    src="/credit-card/credit-card-hero.png"
                                    alt="Credit Card illustration"
                                    className="w-full h-full object-cover drop-shadow-lg transition-transform duration-700"
                                />
                            </motion.div>                       
                        </div>
                    </motion.div>
                </div>
            </div>
        </section>
    );
}
