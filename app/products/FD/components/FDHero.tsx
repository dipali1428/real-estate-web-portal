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
        <section className="relative lg:h-[calc(100vh-64px)] flex items-center justify-center overflow-hidden pt-20 pb-8 font-sans">
            <div className="container mx-auto px-4 md:px-6 relative z-10 w-full">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center max-w-7xl mx-auto">
                    {/* Left Content */}
                    <MotionDiv
                        initial={{ opacity: 0, x: -40 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.8, ease: "easeOut" }}
                        className="flex flex-col items-start w-full"
                    >
                        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-blue-50 border border-blue-100 text-[#2076C7] font-medium text-sm mb-4">
                            <ShieldCheck size={16} />
                            <span>Premium Fixed Deposit Investment</span>
                        </div>

                        <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold leading-[1.05] mb-4 tracking-tight bg-clip-text text-transparent bg-linear-to-r from-[#2076C7] to-[#1CADA3]">
                            Grow Your Wealth With <br />
                            Fixed Deposits
                        </h1>

                        <p className="text-sm sm:text-base md:text-lg text-slate-600 mb-6 leading-relaxed max-w-lg font-medium">
                            Sophisticated fixed-income solutions for secure wealth growth.
                        </p>

                        <div className="flex flex-col sm:flex-row gap-4 w-full sm:w-auto mb-8">
                            <button
                                onClick={openLogin}
                                className="group relative text-white px-8 py-4 rounded-lg font-semibold text-lg shadow-lg hover:shadow-xl transform hover:-translate-y-1 transition-all duration-300 overflow-hidden cursor-pointer"
                                style={{ background: 'linear-gradient(to right, #2076C7, #1CADA3)' }}
                            >
                                <div className="relative z-10 flex items-center justify-center gap-2">
                                    <span>Apply Now</span>
                                    <ArrowRight
                                        size={22}
                                        className="group-hover:translate-x-1 transition-transform"
                                    />
                                </div>
                                <div className="absolute inset-0 transform scale-x-0 group-hover:scale-x-100 transition-transform origin-left duration-300" style={{ background: 'linear-gradient(to right, #1A68B0, #189B8D)' }}></div>
                            </button>
                            <button
                                onClick={scrollToCalculator}
                                className="group relative bg-white px-8 py-4 rounded-lg font-semibold text-lg border-2 hover:bg-blue-50 transform hover:-translate-y-1 transition-all duration-300 shadow-md hover:shadow-lg cursor-pointer"
                                style={{ color: '#2076C7', borderColor: '#2076C7' }}
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
                                width={512}
                                height={512}
                                className="w-full max-w-lg h-auto object-contain drop-shadow-md rounded-3xl"
                            />
                        </motion.div>
                    </MotionDiv>
                </div>
            </div>
        </section>
    );
};

export default FDHero;
