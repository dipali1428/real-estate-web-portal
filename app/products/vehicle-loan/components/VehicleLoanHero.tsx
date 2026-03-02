"use client";

import { motion } from "framer-motion";
import { Car, ArrowRight, CheckCircle, Zap, ShieldCheck } from "lucide-react";

interface VehicleLoanHeroProps {
    onApplyClick?: () => void;
    onCalculateClick?: () => void;
}

export default function VehicleLoanHero({ onApplyClick, onCalculateClick }: VehicleLoanHeroProps) {
    return (
        <section className="relative min-h-[85vh] flex items-center justify-center overflow-hidden bg-[#F8F9FF] pt-24 pb-12">
            {/* Ambient Background Glows */}
            <div className="absolute inset-0 z-0 overflow-hidden">
                <div className="absolute top-[-20%] right-[-10%] w-[800px] h-[800px] bg-blue-200/40 rounded-full blur-[120px] mix-blend-multiply" />
                <div className="absolute bottom-[-20%] left-[-10%] w-[600px] h-[600px] bg-teal-200/40 rounded-full blur-[120px] mix-blend-multiply" />

                {/* Subtle Grid Overlay */}
                <div className="absolute inset-0 bg-[url('/grid-pattern.svg')] opacity-[0.03] mix-blend-overlay"></div>
            </div>

            <div className="container mx-auto px-4 md:px-6 relative z-10 w-full">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center max-w-7xl mx-auto">
                    {/* Left Column: Content */}
                    <motion.div
                        initial={{ opacity: 0, x: -40 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.8, ease: "easeOut" }}
                        className="flex flex-col items-start w-full"
                    >
                        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white border border-blue-100 shadow-sm text-blue-700 font-semibold text-xs sm:text-sm mb-8">
                            <span className="relative flex h-2 w-2">
                                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-blue-500 opacity-75"></span>
                                <span className="relative inline-flex rounded-full h-2 w-2 bg-blue-600"></span>
                            </span>
                            Premium Vehicle Financing
                        </div>

                        <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold leading-[1.05] mb-6 tracking-tight bg-clip-text text-transparent bg-linear-to-r from-[#2076C7] to-[#1CADA3]">
                            Drive Your <br />
                            Dream Today
                        </h1>

                        <p className="text-base sm:text-lg md:text-xl text-gray-600 mb-10 leading-relaxed max-w-lg font-medium">
                            Experience the fastest route to ownership. <strong className="text-gray-900">Up to 100% on-road financing</strong> with industry-leading interest rates and instant approvals.
                        </p>

                        <div className="flex flex-col sm:flex-row gap-4 w-full sm:w-auto mb-12">
                            <button
                                onClick={onApplyClick}
                                className="group relative px-8 py-4 bg-gradient-to-r from-blue-700 to-teal-500 text-white font-bold text-lg rounded-2xl transition-all hover:shadow-[0_8px_30px_rgba(28,173,163,0.3)] active:scale-95 flex items-center justify-center gap-3 overflow-hidden shadow-md"
                            >
                                <span className="absolute inset-0 w-full h-full bg-white/20 -translate-x-full group-hover:translate-x-0 transition-transform duration-500 ease-out skew-x-[30deg]"></span>
                                <span className="relative flex items-center gap-2">Get Approved <ArrowRight size={22} className="group-hover:translate-x-1 transition-transform" /></span>
                            </button>
                            <button
                                onClick={onCalculateClick}
                                className="px-8 py-4 bg-white text-gray-800 border border-gray-200 font-bold text-lg rounded-2xl transition-all hover:bg-gray-50 hover:border-gray-300 active:scale-95 flex items-center justify-center gap-3 shadow-sm hover:shadow"
                            >
                                Calculate EMI
                            </button>
                        </div>

                        {/* Premium Stats Row */}
                        <div className="grid grid-cols-3 gap-4 sm:gap-8 border-t border-gray-200 pt-8 w-full">
                            <div className="flex flex-col">
                                <div className="text-2xl sm:text-3xl font-extrabold text-[#0A1A2F] mb-1 flex items-center gap-1">8.5<span className="text-teal-500">%</span></div>
                                <div className="text-xs sm:text-sm font-semibold text-gray-500">Starting APR</div>
                            </div>
                            <div className="flex flex-col border-l border-gray-200 pl-4 sm:pl-8">
                                <div className="text-2xl sm:text-3xl font-extrabold text-[#0A1A2F] mb-1 flex items-center gap-2"><Zap className="text-amber-500" size={24} fill="currentColor" /></div>
                                <div className="text-xs sm:text-sm font-semibold text-gray-500">Instant Approval</div>
                            </div>
                            <div className="flex flex-col border-l border-gray-200 pl-4 sm:pl-8">
                                <div className="text-2xl sm:text-3xl font-extrabold text-[#0A1A2F] mb-1 flex items-center gap-2"><ShieldCheck className="text-teal-500" size={24} /></div>
                                <div className="text-xs sm:text-sm font-semibold text-gray-500">Secure Process</div>
                            </div>
                        </div>
                    </motion.div>

                    {/* Right Column: Visual Aspect */}
                    <motion.div
                        initial={{ opacity: 0, scale: 0.95, y: 20 }}
                        animate={{ opacity: 1, scale: 1, y: 0 }}
                        transition={{ duration: 1, ease: "easeOut", delay: 0.2 }}
                        className="relative hidden lg:block h-full min-h-[550px]"
                    >
                        <div className="absolute inset-0 z-10 rounded-[2.5rem] overflow-hidden shadow-2xl border border-gray-100 group">

                            <div className="absolute inset-0 z-10 bg-gradient-to-t from-gray-900/80 via-transparent to-transparent opacity-80" />

                            <div className="w-full h-full relative overflow-hidden bg-gray-100">
                                <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1542282088-72c9c27ed0cd?q=80&w=2670&auto=format&fit=crop')] bg-cover bg-center object-cover transform group-hover:scale-105 transition-transform duration-[2s] ease-out mix-blend-multiply opacity-90" />
                            </div>

                            <motion.div
                                initial={{ y: 20, opacity: 0 }}
                                animate={{ y: 0, opacity: 1 }}
                                transition={{ delay: 1.2, duration: 0.8 }}
                                className="absolute bottom-8 left-8 right-8 z-20 bg-white/90 backdrop-blur-xl border border-white/50 p-5 rounded-2xl flex items-center justify-between shadow-2xl"
                            >
                                <div className="flex items-center gap-4">
                                    <div className="w-12 h-12 bg-blue-50 rounded-full flex items-center justify-center text-blue-600 shadow-inner">
                                        <Car size={24} />
                                    </div>
                                    <div>
                                        <div className="text-gray-900 font-bold">100% Financing</div>
                                        <div className="text-gray-500 text-sm font-medium">On-road price covered</div>
                                    </div>
                                </div>
                                <CheckCircle className="text-teal-500" size={28} />
                            </motion.div>
                        </div>

                        <div className="absolute top-10 -right-10 w-40 h-40 bg-teal-400/20 rounded-full blur-[40px] animate-pulse" />
                        <div className="absolute bottom-20 -left-10 w-48 h-48 bg-blue-400/20 rounded-full blur-[50px] animate-pulse delay-500" />
                    </motion.div>
                </div>
            </div>
        </section>
    );
}
