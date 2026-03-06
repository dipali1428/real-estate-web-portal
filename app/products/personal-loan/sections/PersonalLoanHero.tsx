"use client";
import React from 'react';
import { ShieldCheck, Clock, Percent, Zap, TrendingUp, CheckCircle, ArrowRight } from 'lucide-react';

interface PersonalLoanHeroProps {
    openForm: () => void;
}

export default function PersonalLoanHero({ openForm }: PersonalLoanHeroProps) {
    return (
        <section className="relative bg-[#ffffff] pt-20 pb-12 lg:pt-28 lg:pb-20 font-sans overflow-hidden">

            {/* Minimalist Background Elements */}
            <div className="absolute top-0 right-0 w-full h-[300px] md:h-[500px] bg-gradient-to-b from-blue-50/80 to-transparent pointer-events-none"></div>
            <div className="absolute -top-40 -right-40 w-[300px] h-[300px] md:w-[600px] md:h-[600px] rounded-full bg-gradient-to-br from-[#2076C7]/5 to-[#1CADA3]/5 blur-3xl"></div>
            <div className="absolute top-40 -left-20 w-[200px] h-[200px] md:w-[400px] md:h-[400px] rounded-full bg-gradient-to-tr from-[#1CADA3]/10 to-transparent blur-3xl"></div>

            <div className="container mx-auto px-4 md:px-6 max-w-7xl relative z-10">
                <div className="flex flex-col lg:flex-row gap-8 lg:gap-16 items-center">

                    {/* Content Section */}
                    <div className="w-full lg:w-1/2 text-center lg:text-left order-2 lg:order-1">
                        <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-teal-50 border border-teal-100 text-[#1CADA3] text-xs md:text-sm font-semibold mb-5 md:mb-6 shadow-sm mx-auto lg:mx-0">
                            <span className="flex h-1.5 w-1.5 md:h-2 md:w-2 rounded-full bg-[#1CADA3] animate-pulse"></span>
                            Instant Digital Approval
                        </div>

                        <h1 className="text-3xl md:text-5xl lg:text-6xl font-extrabold leading-tight mb-4 md:mb-6 font-sans text-transparent bg-clip-text bg-gradient-to-r from-[#2076C7] via-[#1CADA3] to-[#2076C7]">
                            Smart Financing for Your Ambitions
                        </h1>

                        <p className="text-sm md:text-lg lg:text-xl text-gray-600 mb-8 max-w-lg mx-auto lg:mx-0 leading-relaxed md:leading-relaxed">
                            Access instant personal loans up to ₹50 Lakhs with Infinity Arthvishva. Realize your goals with industry-leading rates and a 100% paperless process.
                        </p>

                        <div className="flex flex-col sm:flex-row gap-3 md:gap-4 mb-10 md:mb-12 max-w-xs sm:max-w-sm mx-auto lg:mx-0">
                            <a
                                href="#payout-structure"
                                className="w-full flex items-center justify-center gap-2 bg-gradient-to-r from-[#2076C7] to-[#1CADA3] text-white px-6 md:px-8 py-3.5 md:py-4 rounded-xl font-bold shadow-lg shadow-teal-500/20 hover:shadow-teal-500/40 hover:-translate-y-0.5 transition-all text-sm md:text-base"
                            >
                                Apply Now <ArrowRight size={18} />
                            </a>
                        </div>

                        {/* Features Grid */}
                        <div className="grid grid-cols-2 gap-4 md:gap-6 max-w-md mx-auto lg:mx-0">
                            <div className="flex items-center gap-2.5 md:gap-3 justify-center lg:justify-start">
                                <div className="flex-shrink-0 w-8 h-8 md:w-10 md:h-10 rounded-full bg-blue-50 flex items-center justify-center text-[#2076C7]">
                                    <Zap size={20} className="w-4 h-4 md:w-5 md:h-5" />
                                </div>
                                <span className="font-semibold text-gray-700 text-xs md:text-sm">Lightning Fast</span>
                            </div>
                            <div className="flex items-center gap-2.5 md:gap-3 justify-center lg:justify-start">
                                <div className="flex-shrink-0 w-8 h-8 md:w-10 md:h-10 rounded-full bg-teal-50 flex items-center justify-center text-[#1CADA3]">
                                    <ShieldCheck size={20} className="w-4 h-4 md:w-5 md:h-5" />
                                </div>
                                <span className="font-semibold text-gray-700 text-xs md:text-sm">Highly Secure</span>
                            </div>
                            <div className="flex items-center gap-2.5 md:gap-3 justify-center lg:justify-start">
                                <div className="flex-shrink-0 w-8 h-8 md:w-10 md:h-10 rounded-full bg-green-50 flex items-center justify-center text-green-600">
                                    <Percent size={20} className="w-4 h-4 md:w-5 md:h-5" />
                                </div>
                                <span className="font-semibold text-gray-700 text-xs md:text-sm">Low Interest</span>
                            </div>
                            <div className="flex items-center gap-2.5 md:gap-3 justify-center lg:justify-start">
                                <div className="flex-shrink-0 w-8 h-8 md:w-10 md:h-10 rounded-full bg-purple-50 flex items-center justify-center text-purple-600">
                                    <Clock size={20} className="w-4 h-4 md:w-5 md:h-5" />
                                </div>
                                <span className="font-semibold text-gray-700 text-xs md:text-sm">Flexible Tenure</span>
                            </div>
                        </div>
                    </div>

                    {/* Image Section */}
                    <div className="w-full lg:w-1/2 relative order-1 lg:order-2 px-4 md:px-0">
                        {/* Main Image Base */}
                        <div className="relative rounded-2xl md:rounded-3xl overflow-hidden shadow-xl md:shadow-2xl bg-white border border-gray-100 z-10 w-full h-[280px] sm:h-[350px] md:h-[500px]">
                            <img
                                src="https://images.unsplash.com/photo-1554224155-8d04cb21cd6c?q=80&w=2070&auto=format&fit=crop"
                                alt="Personal finance and loan calculation"
                                className="w-full h-full object-cover object-center"
                            />
                        </div>

                        {/* Floating Micro-Interactions - Hidden on very small screens, refined on mobile */}
                        <div className="hidden sm:flex absolute top-6 -left-2 md:-left-12 bg-white/95 backdrop-blur-lg border border-white/50 shadow-xl rounded-xl md:rounded-2xl p-3 md:p-4 items-center gap-2.5 md:gap-4 z-20 animate-bounce" style={{ animationDuration: '3s' }}>
                            <div className="w-9 h-9 md:w-12 md:h-12 rounded-full bg-teal-50 flex items-center justify-center text-[#1CADA3] shrink-0">
                                <CheckCircle size={24} className="w-5 h-5 md:w-6 md:h-6" />
                            </div>
                            <div>
                                <p className="text-[10px] text-gray-500 font-semibold uppercase tracking-wider mb-0.5">Status</p>
                                <p className="text-gray-900 font-bold text-xs md:text-sm whitespace-nowrap">Approved in 5 Mins</p>
                            </div>
                        </div>

                        <div className="hidden sm:flex absolute bottom-20 -right-2 md:-right-8 bg-white/95 backdrop-blur-lg border border-white/50 shadow-xl rounded-xl md:rounded-2xl p-3 md:p-4 items-center gap-2.5 md:gap-4 z-20 animate-bounce" style={{ animationDuration: '4s' }}>
                            <div className="w-9 h-9 md:w-12 md:h-12 rounded-full bg-teal-50 flex items-center justify-center text-[#1CADA3] shrink-0">
                                <TrendingUp size={24} className="w-5 h-5 md:w-6 md:h-6" />
                            </div>
                            <div>
                                <p className="text-[10px] text-gray-500 font-semibold uppercase tracking-wider mb-0.5">Funding</p>
                                <p className="text-gray-900 font-bold text-xs md:text-sm whitespace-nowrap">Up to ₹50L</p>
                            </div>
                        </div>

                    </div>
                </div>
            </div>
        </section>
    );
}
