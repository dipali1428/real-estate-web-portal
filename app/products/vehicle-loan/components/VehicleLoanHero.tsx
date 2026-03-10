"use client";

import { motion } from "framer-motion";
import { Car, ArrowRight, CheckCircle, Zap, ShieldCheck } from "lucide-react";

interface VehicleLoanHeroProps {
    onApplyClick?: () => void;
    onCalculateClick?: () => void;
}

export default function VehicleLoanHero({ onApplyClick, onCalculateClick }: VehicleLoanHeroProps) {
    return (
        <section className="relative lg:h-[calc(100vh-64px)] flex items-center justify-center overflow-hidden pt-20 pb-8 font-sans">

            <div className="container mx-auto px-4 md:px-6 relative z-10 w-full">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center max-w-7xl mx-auto">
                    {/* Left Column: Content */}
                    <motion.div
                        initial={{ opacity: 0, x: -40 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.8, ease: "easeOut" }}
                        className="flex flex-col items-start w-full"
                    >
                        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-blue-50 border border-blue-100 text-[#2076C7] font-medium text-sm mb-4">
                            <ShieldCheck size={16} />
                            <span>Premium Vehicle Financing</span>
                        </div>

                        <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold leading-[1.05] mb-4 tracking-tight bg-clip-text text-transparent bg-linear-to-r from-[#2076C7] to-[#1CADA3]">
                            Drive Your <br />
                            Dream Today
                        </h1>

                        <p className="text-sm sm:text-base md:text-lg text-gray-600 mb-6 leading-relaxed max-w-lg font-medium">
                            Experience the fastest route to ownership. <strong className="text-gray-900">Up to 100% on-road financing</strong> with industry-leading interest rates and instant approvals.
                        </p>

                        <div className="flex flex-col sm:flex-row gap-4 w-full sm:w-auto mb-8">
                            <button
                                onClick={onApplyClick}
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
                                onClick={onCalculateClick}
                                className="group relative bg-white px-8 py-4 rounded-lg font-semibold text-lg border-2 hover:bg-blue-50 transform hover:-translate-y-1 transition-all duration-300 shadow-md hover:shadow-lg"
                                style={{ color: '#2076C7', borderColor: '#2076C7' }}
                            >
                                <span className="relative z-10">Calculate EMI</span>
                            </button>
                        </div>

                        {/* Premium Stats Row*/}
                        <div className="grid grid-cols-3 gap-4 sm:gap-8 border-t border-gray-200 pt-6 w-full">
                            <div className="flex flex-col">
                                <div className="text-2xl sm:text-3xl font-extrabold text-teal-500 mb-1 flex items-center gap-1">8.5<span className="text-teal-500">%</span></div>
                                <div className="text-xs sm:text-sm font-semibold text-gray-500">Starting APR</div>
                            </div>
                            <div className="flex flex-col border-l border-gray-200 pl-4 sm:pl-8">
                                <div className="text-2xl sm:text-3xl font-extrabold text-[#0A1A2F] mb-1 flex items-center gap-2"><Zap className="text-teal-500" size={24} fill="currentColor" /></div>
                                <div className="text-xs sm:text-sm font-semibold text-gray-500">Minimal Documentation</div>
                            </div>
                            <div className="flex flex-col border-l border-gray-200 pl-4 sm:pl-8">
                                <div className="text-2xl sm:text-3xl font-extrabold text-[#0A1A2F] mb-1 flex items-center gap-2"><ShieldCheck className="text-teal-500" size={24} /></div>
                                <div className="text-xs sm:text-sm font-semibold text-gray-500">Zero Prepayment</div>
                            </div>
                        </div>
                    </motion.div>


                    {/* Right Column: Visual Aspect */}
                    <motion.div
                        initial={{ opacity: 0, scale: 0.95, y: 20 }}
                        animate={{ opacity: 1, scale: 1, y: 0 }}
                        transition={{ duration: 1, ease: "easeOut", delay: 0.2 }}
                        className="relative hidden lg:flex items-center justify-center min-h-[900px]"
                    >
                        <motion.img
                            initial={{ opacity: 0, scale: 0.9 }}
                            animate={{ opacity: 1, scale: 1 }}
                            transition={{ duration: 1, delay: 0.5 }}
                            src="/loan/vehicle-loan image.jpeg"
                            alt="Vehicle Financing"
                            className="w-[115%] max-w-[900px] h-auto object-contain drop-shadow-2xl rounded-3xl"
                        />
                    </motion.div>
                </div>
            </div>
        </section>
    );
}
