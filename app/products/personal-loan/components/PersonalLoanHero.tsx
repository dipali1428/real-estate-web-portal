"use client";
import React from 'react';
import { ShieldCheck, Clock, Percent, Zap, TrendingUp, ArrowRight } from 'lucide-react';
import { useModal } from '@/app/context/ModalContext';


// interface PersonalLoanHeroProps {
// }

export default function PersonalLoanHero() {
    const { openLogin } = useModal();

    return (
        <section className="relative bg-white pt-20 pb-12 lg:pt-28 lg:pb-20 font-sans overflow-hidden">

            <div className="container mx-auto px-4 md:px-6 max-w-7xl relative z-10">
                <div className="flex flex-col lg:flex-row gap-8 lg:gap-16 items-center">

                    {/* Content Section */}
                    <div className="w-full lg:w-1/2 text-center lg:text-left order-1 lg:order-1">
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

                        <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start mb-10">
                            <button
                                onClick={(e) => { e.preventDefault(); openLogin(); }}
                                className="group relative text-white px-8 py-4 rounded-lg font-semibold text-lg shadow-lg hover:shadow-xl transform hover:-translate-y-1 transition-all duration-300 overflow-hidden cursor-pointer inline-block text-center"
                                style={{ background: 'linear-gradient(to right, #1CADA3, #2076C7)' }}>
                                <span className="relative z-10 flex items-center justify-center gap-2">
                                    Apply Now
                                    <ArrowRight size={18} className="transform group-hover:translate-x-1 transition-transform" />
                                </span>
                                <div className="absolute inset-0 transform scale-x-0 group-hover:scale-x-100 transition-transform origin-left duration-300" style={{ background: 'linear-gradient(to right, #189B8D, #1A68B0)' }}></div>
                            </button>
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
                    <div className="w-full lg:w-1/2 relative order-2 lg:order-2 px-4 md:px-0">
                        {/* Main Image Base */}
                        <div className="relative rounded-2xl md:rounded-3xl overflow-hidden shadow-xl md:shadow-2xl bg-white border border-gray-100 z-10 w-full h-[280px] sm:h-[350px] md:h-[500px]">
                            <img
                                src="/loan/personal-loan-hero.png"
                                alt="Personal finance and loan calculation"
                                className="w-full h-full object-cover object-center"
                            />
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
        </section >
    );
}