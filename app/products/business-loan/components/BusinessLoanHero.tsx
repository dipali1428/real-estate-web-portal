"use client";

import { motion } from "framer-motion";
import { ShieldCheck, ArrowRight, CheckCircle, TrendingUp } from "lucide-react";

interface BusinessLoanHeroProps {
    onApplyClick: () => void;
    onCalculateClick: () => void;
}

export default function BusinessLoanHero({ onApplyClick, onCalculateClick }: BusinessLoanHeroProps) {
    return (
        <section className="relative min-h-[80vh] flex items-center justify-center overflow-hidden bg-gradient-to-br from-[#2076C7]/5 via-white to-[#1CADA3]/5 pt-24 pb-12">
            {/* Ambient Background Glows */}
            <div className="absolute inset-0 z-0">
                <div className="absolute top-[-10%] right-[-5%] w-[600px] h-[600px] bg-[#2076C7]/10 rounded-full blur-[120px] animate-pulse" />
                <div className="absolute bottom-[-10%] left-[-5%] w-[500px] h-[500px] bg-[#1CADA3]/10 rounded-full blur-[120px] animate-pulse" />
            </div>

            <div className="container mx-auto px-4 md:px-6 relative z-10">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center max-w-7xl mx-auto">
                    {/* Left Column: Content */}
                    <motion.div
                        initial={{ opacity: 0, x: -40 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.8, ease: "easeOut" }}
                        className="flex flex-col items-start"
                    >
                        <div className="inline-flex items-center gap-1.5 sm:gap-2 px-3 sm:px-4 py-1.5 sm:py-2 rounded-full bg-blue-50 border border-blue-100 text-[#2076C7] font-semibold text-xs sm:text-sm mb-6 sm:mb-8 shadow-sm">
                            <ShieldCheck size={18} className="text-[#2076C7]" />
                            <span>Fuel Your Business Growth with Confidence</span>
                        </div>

                        <h1 className="text-3xl sm:text-4xl md:text-6xl lg:text-5xl font-extrabold leading-[1.1] mb-6 sm:mb-8 bg-linear-to-r from-[#2076C7] via-[#1CADA3] to-[#2076C7] text-transparent bg-clip-text inline-block tracking-tight">
                            Empower Your <br />
                            Business Vision
                        </h1>

                        <p className="text-base sm:text-xl md:text-2xl text-gray-600 mb-8 sm:mb-10 leading-relaxed max-w-xl font-medium">
                            Get flexible, low-interest business loans designed to scale your enterprise. Fast approvals and zero hidden costs.
                        </p>

                        <div className="flex flex-col sm:flex-row gap-5 w-full sm:w-auto">
                            <button
                                onClick={onApplyClick}
                                className="group relative px-8 py-4 bg-linear-to-r from-[#2076C7] to-[#1CADA3] text-white font-bold text-lg rounded-2xl transition-all hover:shadow-2xl hover:shadow-blue-500/30 active:scale-95 flex items-center justify-center gap-3"
                            >
                                Apply Now <ArrowRight size={22} className="group-hover:translate-x-1 transition-transform" />
                            </button>
                            <button
                                onClick={onCalculateClick}
                                className="px-8 py-4 bg-white text-[#2076C7] border-2 border-[#2076C7]/20 font-bold text-lg rounded-2xl transition-all hover:border-[#2076C7] hover:bg-blue-50 active:scale-95 flex items-center justify-center gap-3 shadow-sm"
                            >
                                Calculate EMI
                            </button>
                        </div>

                        <div className="mt-8 sm:mt-12 grid grid-cols-2 gap-4 sm:gap-8 border-t border-gray-100 pt-6 sm:pt-10">
                            <div className="flex items-center gap-3">
                                <div className="p-2 rounded-lg bg-green-50 text-green-600">
                                    <TrendingUp size={20} />
                                </div>
                                <div>
                                    <div className="text-xl sm:text-2xl font-bold text-gray-900 leading-none mb-1">9.5%*</div>
                                    <div className="text-sm font-semibold text-gray-500 uppercase tracking-wider">Starting APR</div>
                                </div>
                            </div>
                            <div className="flex items-center gap-3">
                                <div className="p-2 rounded-lg bg-teal-50 text-teal-600">
                                    <CheckCircle size={20} />
                                </div>
                                <div>
                                    <div className="text-xl sm:text-2xl font-bold text-gray-900 leading-none mb-1">24 Hrs</div>
                                    <div className="text-sm font-semibold text-gray-500 uppercase tracking-wider">Fast Approval</div>
                                </div>
                            </div>
                        </div>
                    </motion.div>

                    {/* Right Column: Visual Aspect */}
                    <motion.div
                        initial={{ opacity: 0, scale: 0.9, y: 20 }}
                        animate={{ opacity: 1, scale: 1, y: 0 }}
                        transition={{ duration: 1, ease: "easeOut", delay: 0.2 }}
                        className="relative hidden lg:block"
                    >
                        <div className="relative z-10 rounded-[3rem] overflow-hidden shadow-[0_40px_100px_rgba(0,0,0,0.15)] border-[4px] border-white aspect-[4/5] md:aspect-auto">
                            <img
                                src="/loan/business_loan_hero.png"
                                alt="Successful Business Meeting"
                                className="w-full h-full object-cover transform hover:scale-105 transition-transform duration-1000"
                            />
                        </div>

                        {/* Floating Decorative Elements */}
                        <div className="absolute -top-10 -right-10 w-32 h-32 bg-[#1CADA3]/10 rounded-full blur-2xl animate-pulse" />
                        <div className="absolute -bottom-10 -left-20 w-48 h-48 bg-[#2076C7]/10 rounded-full blur-3xl animate-pulse delay-700" />
                    </motion.div>
                </div>
            </div>
        </section>
    );
}
