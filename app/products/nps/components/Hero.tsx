'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { ArrowRight, ShieldCheck } from 'lucide-react';
import { useModal } from '@/app/context/ModalContext';

export default function Hero() {
    const { openLogin } = useModal();

    return (
        <section className="relative min-h-[70vh] flex items-center justify-center overflow-hidden bg-white pt-20 pb-10">
            <div className="container mx-auto px-4 md:px-6 relative z-10">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center max-w-7xl mx-auto">
                    {/* Left Column: Marketing Copy */}
                    <motion.div
                        initial={{ opacity: 0, x: -30 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.8 }}
                        className="flex flex-col items-start lg:-translate-y-8"
                    >
                        <div className="inline-flex items-center gap-2 px-4 py-2 mt-6 rounded-full bg-blue-50 border border-blue-100 text-[#2076C7] font-medium text-sm mb-6 lg:mb-8">
                            <ShieldCheck size={16} />
                            <span>The most trusted government-backed scheme</span>
                        </div>

                        <h1
                            className="text-4xl sm:text-5xl md:text-6xl lg:text-[72px] font-bold mb-4 sm:mb-6 leading-tight w-full flex flex-col gap-2"
                            style={{
                                background: "linear-gradient(to right, #2076C7, #1CADA3, #2076C7)",
                                WebkitBackgroundClip: "text",
                                WebkitTextFillColor: "transparent",
                                backgroundClip: "text",
                            }}
                        >
                            <span className="block whitespace-nowrap">
                                Retire Smart
                            </span>
                            <span className="block whitespace-nowrap">
                                with NPS
                            </span>
                        </h1>

                        <p className="text-lg md:text-xl text-gray-600 mb-8 leading-relaxed max-w-xl pr-4">
                            Grow your wealth systematically and enjoy a worry-free life post-retirement with National Pension System.
                        </p>

                        <div className="flex flex-col sm:flex-row gap-4 w-full max-w-md sm:max-w-none">
                            <button
                                onClick={openLogin}
                                className="group relative text-white px-8 py-4 rounded-xl font-bold text-lg shadow-lg hover:shadow-xl transform hover:-translate-y-1 transition-all duration-300 overflow-hidden cursor-pointer bg-linear-to-r from-[#2076C7] to-[#1CADA3] flex items-center justify-center gap-2 w-full sm:w-auto"
                            >
                                <span>Apply Now</span>
                                <ArrowRight
                                    size={22}
                                    className="group-hover:translate-x-1 transition-transform"
                                />
                            </button>

                            <button
                                onClick={() => {
                                    const el = document.getElementById('account-types');
                                    if (el) {
                                        const y = el.getBoundingClientRect().top + window.scrollY - 100;
                                        window.scrollTo({ top: y, behavior: 'smooth' });
                                    }
                                }}
                                className="group relative bg-white px-8 py-4 rounded-xl font-bold text-lg border-2 hover:bg-blue-50 transform hover:-translate-y-1 transition-all duration-300 shadow-md hover:shadow-lg text-[#2076C7] border-[#2076C7] cursor-pointer flex items-center justify-center w-full sm:w-auto"
                            >
                                <span className="relative z-10">Learn More</span>
                            </button>
                        </div>
                    </motion.div>

                    {/* Right Column: Hero Image */}
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 1, delay: 0.2 }}
                        className="relative flex justify-center lg:justify-end w-full lg:-translate-y-4"
                    >
                        <div className="relative w-full max-w-lg lg:max-w-[700px] xl:scale-110 lg:origin-center">
                            {/* Decorative background glow behind image */}
                            <div className="absolute inset-0 bg-gradient-to-tr from-blue-100/40 to-teal-50/40 rounded-full blur-3xl transform scale-90" />

                            <motion.img
                                whileHover={{ scale: 1.05 }}
                                transition={{ duration: 0.4, ease: "easeOut" }}
                                src="/nps/nps.jpeg"
                                alt="NPS retirement planning"
                                className="relative w-full h-auto object-contain drop-shadow-[0_25px_45px_rgba(0,0,0,0.15)] z-10 cursor-pointer"
                            />
                        </div>
                    </motion.div>
                </div>
            </div>
        </section>
    );
}
