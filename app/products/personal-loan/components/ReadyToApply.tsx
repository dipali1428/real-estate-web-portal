"use client";
import React from 'react';
import { ArrowRight, Zap } from 'lucide-react';

interface ReadyToApplyProps {
}

export default function ReadyToApply({ }: ReadyToApplyProps) {
    return (
        <section className="py-12 md:py-20 bg-white font-sans" style={{ fontFamily: 'var(--font-geist-sans)' }}>
            <div className="container mx-auto px-4 md:px-6 max-w-7xl">
                <div className="relative overflow-hidden bg-gradient-to-r from-[#2076C7] to-[#1CADA3] rounded-[2.5rem] md:rounded-[3.5rem] p-8 md:p-16 text-center text-white shadow-2xl">
                    {/* Decorative Elements */}
                    <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full -mr-32 -mt-32 blur-3xl pointer-events-none"></div>
                    <div className="absolute bottom-0 left-0 w-64 h-64 bg-black/10 rounded-full -ml-32 -mb-32 blur-3xl pointer-events-none"></div>

                    <div className="relative z-10 max-w-3xl mx-auto">
                        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/20 backdrop-blur-md border border-white/30 text-white text-xs md:text-sm font-bold mb-6 mx-auto">
                            <Zap size={16} className="fill-current" />
                            Fastest Disbursement in India
                        </div>

                        <h2 className="text-3xl md:text-5xl lg:text-6xl font-black mb-6 leading-tight tracking-tight font-sans">
                            Ready to Transform <br className="hidden md:block" /> Your Financial Future?
                        </h2>

                        <p className="text-white/90 text-sm md:text-xl font-medium mb-10 max-w-2xl mx-auto leading-relaxed font-sans">
                            Join thousands of satisfied customers who achieved their dreams with Infinity Arthvishva. Start your 100% digital application today.
                        </p>

                        <div className="flex flex-col sm:flex-row items-center justify-center gap-6">
                            <a
                                href="#payout-structure"
                                className="w-full sm:w-auto bg-white text-[#2076C7] px-8 md:px-12 py-4 md:py-5 rounded-2xl font-black text-base md:text-lg shadow-xl hover:shadow-2xl hover:-translate-y-1 transition-all flex items-center justify-center gap-3 group font-sans"
                            >
                                Apply Now
                                <ArrowRight size={22} className="group-hover:translate-x-1 transition-transform" />
                            </a>

                            <p className="text-white/80 text-xs md:text-sm font-bold flex items-center gap-2 font-sans">
                                <span className="w-2 h-2 rounded-full bg-white animate-pulse"></span>
                                Instant Approval within 5 Mins
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}
