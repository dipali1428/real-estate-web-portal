"use client";

import React from 'react';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { ShieldCheck, ArrowRight, CalendarDays, UserPlus } from 'lucide-react';

const MotionDiv = motion.div;

interface FDHeroProps {
    openLogin: () => void;
    scrollToCalculator: () => void;
}

const FDHero: React.FC<FDHeroProps> = ({ openLogin, scrollToCalculator }) => {
    return (
        <section className="relative lg:h-[calc(100vh-64px)] flex items-center justify-center overflow-hidden pt-20 pb-8 font-sans bg-white border-b border-gray-100">
            <div className="container mx-auto px-4 md:px-6 relative z-10 w-full">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center max-w-7xl mx-auto">
                    {/* Left Content */}
                    <MotionDiv
                        initial={{ opacity: 0, x: -40 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.8, ease: "easeOut" }}
                        className="flex flex-col items-center text-center lg:items-start lg:text-left w-full"
                    >
                        <motion.div
                            initial={{ opacity: 0, y: -20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.6 }}
                            className="inline-flex items-center gap-2 px-4 py-2 mb-4 lg:mb-8 bg-slate-50 border rounded-full text-[10px] font-black uppercase tracking-widest shadow-sm"
                            style={{ color: "#2076C7", borderColor: "rgba(32,118,199,0.2)" }}
                        >
                            <ShieldCheck size={14} /> Premium Fixed Deposit Investment
                        </motion.div>

                        <h1 
                            className="font-sans text-[48px] font-extrabold mb-4 lg:mb-6 leading-tight tracking-tight px-4 sm:px-0"
                            style={{
                                background: "linear-gradient(to right, #2076C7, #1CADA3, #2076C7)",
                                WebkitBackgroundClip: "text",
                                WebkitTextFillColor: "transparent",
                                backgroundClip: "text",
                            }}
                        >
                            Grow Your Wealth With <br />
                            Fixed Deposits
                        </h1>

                        <p className="text-base md:text-xl text-gray-600 mb-6 lg:mb-8 leading-relaxed max-w-xl">
                            Sophisticated fixed-income solutions for secure wealth growth.
                        </p>

                        <div className="flex flex-col sm:flex-row gap-4 w-full sm:w-auto mb-8">
                            <button
                                onClick={openLogin}
                                className="group relative text-white px-8 py-4 rounded-2xl font-extrabold text-lg shadow-lg hover:shadow-blue-500/25 transform hover:-translate-y-0.5 transition-all duration-300 overflow-hidden cursor-pointer bg-linear-to-r from-[#2076C7] to-[#1CADA3] active:scale-[0.98]"
                            >
                                <div className="relative z-10 flex items-center justify-center gap-3">
                                    <span>Apply Now</span>
                                    <ArrowRight
                                        size={22}
                                        className="group-hover:translate-x-1 transition-transform"
                                    />
                                </div>
                            </button>
                            <button
                                onClick={scrollToCalculator}
                                className="group relative bg-white px-8 py-4 rounded-2xl font-extrabold text-lg border-2 border-[#2076C7] text-[#2076C7] hover:bg-blue-50 transform hover:-translate-y-0.5 transition-all duration-300 shadow-md hover:shadow-lg active:scale-[0.98] cursor-pointer"
                            >
                                <span className="relative z-10">Calculate Returns</span>
                            </button>
                        </div>

                        {/* Premium Stats Row */}
                        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 sm:gap-4 border-t border-gray-200 pt-6 w-full">
                            <div className="flex flex-row sm:flex-col items-center sm:items-start gap-4 sm:gap-0">
                                <div className="text-2xl sm:text-3xl font-extrabold text-teal-500 mb-1 flex items-center gap-1">9.10%*</div>
                                <div className="text-xs sm:text-sm font-semibold text-gray-500">Max Returns</div>
                            </div>
                            <div className="flex flex-row sm:flex-col items-center sm:items-start border-t sm:border-t-0 sm:border-l border-gray-200 pt-4 sm:pt-0 sm:pl-8 gap-4 sm:gap-0">
                                <div className="text-2xl sm:text-3xl font-extrabold text-teal-500 mb-1 flex items-center gap-2"><CalendarDays className="text-teal-500" size={24} /></div>
                                <div className="text-xs sm:text-sm font-semibold text-gray-500">Flexible Tenure Options</div>
                            </div>
                            <div className="flex flex-row sm:flex-col items-center sm:items-start border-t sm:border-t-0 sm:border-l border-gray-200 pt-4 sm:pt-0 sm:pl-8 gap-4 sm:gap-0">
                                <div className="text-2xl sm:text-3xl font-extrabold text-teal-500 mb-1 flex items-center gap-2"><UserPlus className="text-teal-500" size={24} /></div>
                                <div className="text-xs sm:text-sm font-semibold text-gray-500">Senior Citizen Benefits</div>
                            </div>
                        </div>
                    </MotionDiv>

                    {/* Right Image/Illustration */}
                    <MotionDiv
                        initial={{ opacity: 0, x: 40 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.8, ease: "easeOut", delay: 0.2 }}
                        className="relative hidden lg:flex items-center justify-center min-h-[500px]"
                    >
                        <motion.div
                            whileHover={{ scale: 1.05, y: -10 }}
                            transition={{ type: "spring", stiffness: 300 }}
                            className="relative z-10 cursor-pointer"
                        >
                            <Image
                                src="/FD/fdimage.png"
                                alt="Fixed Deposit Wealth Growth"
                                width={480}
                                height={480}
                                className="w-full max-w-[480px] h-auto object-contain drop-shadow-md rounded-3xl"
                            />
                        </motion.div>
                    </MotionDiv>
                </div>
            </div>
        </section>
    );
};

export default FDHero;
