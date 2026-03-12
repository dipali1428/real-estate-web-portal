"use client";

import Image from 'next/image';
import { TrendingUp, Clock, ArrowRight } from 'lucide-react';
import { motion } from 'framer-motion';
import heroImage from '../home-loan-hero-v4.jpg';

interface HeroSectionProps {
    onApply: () => void;
    isMobile: boolean;
}

export default function HeroSection({ onApply, isMobile }: HeroSectionProps) {
    return (
        <header className="relative w-full overflow-hidden pt-24 md:pt-32 pb-16 bg-white">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
                <div className="flex flex-col lg:flex-row items-center gap-12">
                    {/* Left Column: Text & CTA */}
                    <motion.div
                        initial={{ opacity: 0, x: -50 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.8, ease: "easeOut" }}
                        className="w-full lg:w-1/2 text-left space-y-8"
                    >
                        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-gray-100 border border-gray-200 mb-6 w-fit">
                            <svg className="w-4 h-4 text-[#2076C7]" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 9.75L12 3l9 6.75V20a1 1 0 01-1 1H4a1 1 0 01-1-1V9.75z" /></svg>
                            <span className="text-xs font-bold text-[#2076C7] tracking-wider uppercase">Dream Home Financing</span>
                        </div>
                        <h1 className="text-5xl md:text-6xl lg:text-7xl font-sans font-bold bg-linear-to-r from-[#2076C7] via-[#1CADA3] to-[#2076C7] bg-clip-text text-transparent leading-tight mb-6 tracking-tight">
                            <>
                                Unlock Your <br />
                                <span className="text-[#2076C7]">Dream Home</span> <br />
                                with Rates as Low as <span className="text-[#1CADA3]">7.10%</span>
                            </>
                        </h1>

                        <p className="text-lg md:text-xl lg:text-2xl text-gray-700 max-w-2xl leading-relaxed mb-10">
                            Special home loan offer with reduced interest rates for dream home ownership
                        </p>

                        <div className="flex flex-wrap gap-5 pt-2">
                            <button
                                onClick={onApply}
                                className="group relative text-white px-8 py-4 rounded-lg font-semibold text-lg bg-linear-to-r from-[#2076C7] via-[#1CADA3] to-[#2076C7] shadow-lg hover:shadow-xl transform hover:-translate-y-1 transition-all duration-300 overflow-hidden cursor-pointer"
                            >
                                <span className="relative z-10 flex items-center gap-2">
                                    Apply Now <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                                </span>
                            </button>
                        </div>
                    </motion.div>

                    {/* Right Column: Visual Graphic */}
                    <motion.div
                        initial={{ opacity: 0, scale: 0.8 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 1, ease: "easeOut" }}
                        className="w-full lg:w-1/2 flex items-center justify-center"
                    >
                        <div className="relative w-full aspect-[4/3] max-w-[600px] rounded-[3rem] overflow-hidden shadow-2xl">
                            <Image
                                src={heroImage}
                                alt="Dream Home Loan"
                                fill
                                className="object-cover hover:scale-105 transition-transform duration-700"
                                priority
                            />

                            {/* Floating Interest Rate Badge */}
                            <motion.div
                                initial={{ opacity: 0, x: 20 }}
                                animate={{
                                    opacity: 1,
                                    x: 0,
                                    y: isMobile ? 0 : [0, -10, 0]
                                }}
                                transition={{
                                    opacity: { duration: 0.8, delay: 0.5 },
                                    x: { duration: 0.8, delay: 0.5 },
                                    y: isMobile ? { duration: 0.8, delay: 0.5 } : { duration: 3, repeat: Infinity, ease: "easeInOut" }
                                }}
                                className="absolute top-4 right-4 md:top-6 md:right-6 bg-white/90 backdrop-blur-md p-2.5 md:p-3.5 rounded-2xl shadow-xl border border-white/50 z-20 flex items-center gap-2.5 min-w-[140px]"
                            >
                                <div className="w-8 h-8 rounded-xl bg-blue-100 flex items-center justify-center text-[#2076C7] shrink-0">
                                    <TrendingUp className="w-4 h-4" />
                                </div>
                                <div>
                                    <div className="text-[8px] text-gray-500 font-bold uppercase tracking-widest mb-0.5">Starting Interest Rate</div>
                                    <div className="text-sm font-extrabold text-[#2076C7]">7.10% <span className="text-[10px] font-medium text-gray-400">*</span></div>
                                </div>
                            </motion.div>

                            {/* Floating Tenure Badge */}
                            <motion.div
                                initial={{ opacity: 0, x: -20 }}
                                animate={{
                                    opacity: 1,
                                    x: 0,
                                    y: isMobile ? 0 : [0, 10, 0]
                                }}
                                transition={{
                                    opacity: { duration: 0.8, delay: 0.7 },
                                    x: { duration: 0.8, delay: 0.7 },
                                    y: isMobile ? { duration: 0.8, delay: 0.7 } : { duration: 3.5, repeat: Infinity, ease: "easeInOut" }
                                }}
                                className="absolute bottom-4 left-4 md:bottom-6 md:left-6 bg-white/90 backdrop-blur-md p-2.5 md:p-3.5 rounded-2xl shadow-xl border border-white/50 z-20 flex items-center gap-2.5 min-w-[140px]"
                            >
                                <div className="w-8 h-8 rounded-xl bg-teal-100 flex items-center justify-center text-[#1CADA3] shrink-0">
                                    <Clock className="w-4 h-4" />
                                </div>
                                <div>
                                    <div className="text-[8px] text-gray-500 font-bold uppercase tracking-widest mb-0.5">Tenure</div>
                                    <div className="text-sm font-extrabold text-[#2076C7]">Up to 30 years</div>
                                </div>
                            </motion.div>
                        </div>
                    </motion.div>
                </div>
            </div>

            {/* Bottom Wave Transition Shape */}
            <div className="absolute bottom-0 left-0 w-full overflow-hidden leading-[0]">
                <svg className="relative block w-full h-[80px]" viewBox="0 0 1200 120" preserveAspectRatio="none">
                    <path d="M321.39,56.44c58-10.79,114.16-30.13,172-41.86,82.39-16.72,168.19-17.73,250.45-.39C823.78,31,906.67,72,985.66,92.83c70.05,18.48,146.53,26.09,214.34,3V120H0V27.35A600.21,600.21,0,0,0,321.39,56.44Z" fill="#FFFFFF"></path>
                </svg>
            </div>
        </header>
    );
}
