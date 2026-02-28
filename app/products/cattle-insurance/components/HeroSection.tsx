'use client';

import { motion } from 'framer-motion';
import { IconShieldCheck, IconStar, IconArrowRight, IconHeartHandshake, IconHeartbeat, IconCurrencyRupee, IconAward, IconCheck } from '@tabler/icons-react';
import heroImg from '../assets/icon.png';

export default function HeroSection() {
    return (
        <section className="relative overflow-hidden bg-[#fafcfe] pt-12 pb-12">
            {/* Background blobs - matching travel insurance style */}
            <div className="absolute inset-0 z-0 text-right">
                <motion.div
                    animate={{
                        scale: [1, 1.2, 1],
                        x: [0, 100, 0],
                        y: [0, 50, 0],
                    }}
                    transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
                    className="absolute top-[-10%] right-[-10%] w-[600px] h-[600px] bg-blue-100/40 rounded-full blur-[120px]"
                />
                <motion.div
                    animate={{
                        scale: [1, 1.3, 1],
                        x: [0, -80, 0],
                        y: [0, 100, 0],
                    }}
                    transition={{ duration: 25, repeat: Infinity, ease: "linear" }}
                    className="absolute bottom-[-10%] left-[-5%] w-[700px] h-[700px] bg-teal-50/50 rounded-full blur-[140px]"
                />
            </div>

            <div className="relative z-10 max-w-6xl mx-auto px-6 md:px-12">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">

                    {/* Left Content */}
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8 }}
                        className="text-center lg:text-left flex flex-col items-center lg:items-start lg:pl-16"
                    >
                        <motion.div
                            initial={{ opacity: 0, scale: 0.9 }}
                            animate={{ opacity: 1, scale: 1 }}
                            transition={{ duration: 0.5 }}
                            className="inline-flex items-center gap-2 py-1.5 px-4 rounded-full bg-blue-50/80 backdrop-blur-sm border border-blue-100 text-primary-blue font-bold tracking-widest uppercase text-[10px] mb-6 shadow-sm"
                        >
                            <IconShieldCheck size={14} />
                            Cattle Protection Scheme
                        </motion.div>
                            <h1 className="text-3xl md:text-4xl lg:text-6xl font-extrabold tracking-tight leading-[1.2] lg:leading-[1.1] mb-6 py-2 bg-linear-to-r from-[#2076C7] to-[#1CADA3] bg-clip-text text-transparent">
                                Protect Your Livestock Secure Your Income
                            </h1>
                        <p className="text-sm md:text-base text-slate-400 mb-8 max-w-3xl mx-auto lg:mx-0 leading-relaxed font-small">
                            Safeguard your cows, buffaloes, sheep and goats against unforeseen risks. Affordable premiums, quick claims, and complete peace of mind for your farm.
                        </p>

                        <div className="flex flex-col sm:flex-row w-full sm:w-auto gap-4 justify-center items-center mt-4">
                            <a
                                href="#coverage"
                                className="inline-flex justify-center items-center gap-2 bg-linear-to-r from-[#2076C7] to-[#1CADA3] text-white w-full sm:w-auto px-10 md:px-20 py-3 sm:py-2.5 rounded-2xl text-sm md:text-base font-black shadow-[0_10px_30px_-10px_rgba(32,118,199,0.4)] hover:shadow-[0_20px_50px_-12px_rgba(32,118,199,0.5)] transition-all duration-300 hover:scale-[1.02] whitespace-nowrap"
                            >
                                Explore Coverage <IconArrowRight size={18} className="shrink-0" />
                            </a>
                            <a
                                href="#contact"
                                className="inline-flex justify-center items-center gap-2 border-2 border-blue-600/20 bg-white text-blue-700 w-full sm:w-auto px-10 md:px-20 py-3 sm:py-2.5 rounded-2xl text-sm md:text-base font-bold hover:bg-blue-50 transition-all duration-300 whitespace-nowrap"
                            >
                                <IconHeartHandshake size={18} className="shrink-0" /> Talk to an Expert
                            </a>
                        </div>

                        {/* Trust badge */}
                        <div className="mt-10 flex items-center gap-3 justify-center">
                            <div className="flex -space-x-1">
                                {[...Array(5)].map((_, i) => (
                                    <IconStar key={i} size={16} className="text-yellow-400" fill="currentColor" />
                                ))}
                            </div>
                            <span className="text-sm text-slate-500 font-bold">Trusted by 10,000+ farmers across India</span>
                        </div>
                    </motion.div>

                    {/* Right Column: Circular Image & Floating Icons - Matching Travel Insurance Style */}
                    <motion.div
                        initial={{ opacity: 0, x: 30, scale: 0.9 }}
                        animate={{ opacity: 1, x: 0, scale: 1 }}
                        transition={{ duration: 1, delay: 0.2 }}
                        className="relative flex justify-center items-center lg:-mt-64"
                    >
                        <div className="relative w-full max-w-[400px] aspect-square flex items-center justify-center">

                            {/* Dashed Orbit Circle */}
                            <div className="absolute inset-8 rounded-full border-2 border-dashed border-slate-200/60 -z-0" />

                            {/* Main Circular Image */}
                            <div className="relative w-[180px] h-[180px] sm:w-[220px] sm:h-[220px] md:w-[260px] md:h-[260px] rounded-full overflow-hidden shadow-2xl z-10 border-8 border-white bg-white group">
                                <img
                                    src={heroImg.src}
                                    alt="Cattle Insurance Protection"
                                    className="w-full h-full object-cover transition-transform duration-700 ease-out"
                                />
                            </div>

                            {/* Floating Icon: Health (Top-Left) */}
                            <motion.div
                                animate={{ y: [0, -10, 0] }}
                                transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                                className="absolute top-12 left-10 md:top-16 md:left-14 z-20"
                            >
                                <div className="w-12 h-12 bg-white rounded-2xl shadow-lg flex items-center justify-center border border-slate-100">
                                    <IconHeartbeat size={24} className="text-pink-500" strokeWidth={2} />
                                </div>
                            </motion.div>

                            <motion.div
                                animate={{ y: [0, -10, 0] }}
                                transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                                className="absolute top-12 right-6 md:top-16 md:right-10 z-30"
                            >
                                <div className="w-14 h-14 bg-linear-to-r from-[#2076C7] to-[#1CADA3] rounded-full flex items-center justify-center shadow-xl border-4 border-white">
                                    <IconCheck size={28} className="text-white" strokeWidth={3} />
                                </div>
                            </motion.div>

                            {/* Floating Icon: Claims (Bottom-Left) */}
                            <motion.div
                                animate={{ y: [0, -7, 0] }}
                                transition={{ duration: 4, repeat: Infinity, ease: "easeInOut", delay: 1 }}
                                className="absolute bottom-16 left-8 md:bottom-22 md:left-12 z-20"
                            >
                                <div className="w-12 h-12 bg-white rounded-2xl shadow-lg flex items-center justify-center border border-slate-100">
                                    <IconCurrencyRupee size={24} className="text-teal-500" strokeWidth={2} />
                                </div>
                            </motion.div>

                            {/* Floating Verified Badge (Bottom-Right) */}
                            <motion.div
                                animate={{ y: [0, -9, 0] }}
                                transition={{ duration: 3.8, repeat: Infinity, ease: "easeInOut", delay: 0.8 }}
                                className="absolute bottom-14 right-8 md:bottom-18 md:right-12 z-20"
                            >
                                <div className="w-12 h-12 bg-white rounded-2xl shadow-lg flex items-center justify-center border border-slate-100">
                                    <IconShieldCheck size={24} className="text-blue-600" strokeWidth={2} />
                                </div>
                            </motion.div>


                        </div>
                    </motion.div>

                </div>
            </div>

            {/* Stats bar */}
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.6 }}
                className="relative z-10 mt-6 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8"
            >
                <div className="bg-white/60 backdrop-blur-2xl rounded-[2rem] p-4 shadow-xl border border-white/80 grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
                    {[
                        { label: 'Cattle Covered', value: '20 Thousand+' },
                        { label: 'States Active', value: '15+' },
                        { label: 'Avg Claim Time', value: '5 Days' },
                        { label: 'Premium From', value: '₹100/yr' },
                    ].map((item) => (
                        <div key={item.label}>
                            <div className="text-2xl font-extrabold text-slate-800">{item.value}</div>
                            <div className="text-[10px] text-slate-400 uppercase tracking-widest font-extrabold">{item.label}</div>
                        </div>
                    ))}
                </div>
            </motion.div>
        </section>
    );
}
