'use client';

import { TrendingUp, ShieldCheck, IndianRupee, ArrowRight } from 'lucide-react';

interface HeroProps {
    onStart: () => void;
}

const Hero = ({ onStart }: HeroProps) => {
    const stats = [
        {
            label: 'Annual Returns',
            value: '8-12%',
            icon: <TrendingUp className="w-6 h-6 text-[#2076C7]" />,
            color: 'bg-[#2076C7]/10',
        },
        {
            label: 'Safety Rating',
            value: 'AA+ Rated',
            icon: <ShieldCheck className="w-6 h-6 text-[#1CADA3]" />,
            color: 'bg-[#1CADA3]/10',
        },
        {
            label: 'Min Investment',
            value: '₹10,000',
            icon: <IndianRupee className="w-6 h-6 text-[#2076C7]" />,
            color: 'bg-[#2076C7]/5',
        },
    ];

    const handleGetStarted = () => {
        onStart();
    };

    return (
        <section className="relative overflow-hidden pt-24 pb-12 font-sans">
            {/* Brand Background Gradient */}
            <div className="absolute inset-0 bg-gradient-to-br from-[#2076C7]/20 via-[#E6F7FF] to-[#1CADA3]/20 -z-10" />

            {/* Subtle Light Effect */}
            <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-white/40 blur-3xl rounded-full pointer-events-none -translate-y-1/2 translate-x-1/2 opacity-50" />

            <div className="container-custom relative z-10">
                <div className="max-w-4xl mx-auto text-center">
                    {/* Title */}
                    <h1 className="leading-[1.1] mb-8 tracking-tight font-sans px-4">
                        <span className="block mb-3 text-[#2076C7] font-bold text-2xl sm:text-3xl md:text-5xl">
                            Secure Your Future with
                        </span>
                        <span className="bg-clip-text text-transparent bg-gradient-to-r from-[#2076C7] to-[#1CADA3] font-black text-3xl sm:text-4xl md:text-7xl drop-shadow-sm">
                            Trusted NCD Investments
                        </span>
                    </h1>

                    <p className="text-xl text-gray-600 mb-10 leading-relaxed max-w-3xl mx-auto font-medium">
                        Access premium, high-rated fixed-income instruments handpicked by experts.
                        Experience predictable{' '}
                        <span className="text-[#2076C7] font-bold">8-12% annual returns</span> with absolute capital protection.
                    </p>

                    {/* CTA Buttons */}
                    <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-12 px-6 sm:px-0">
                        {/* Primary CTA */}
                        <button
                            onClick={handleGetStarted}
                            className="flex items-center justify-center gap-3 w-full sm:w-auto max-w-[280px] sm:max-w-none
                                       px-8 py-3.5 text-base md:text-lg font-semibold text-white
                                       rounded-xl shadow-md
                                       bg-gradient-to-r from-[#2076C7] to-[#1CADA3]
                                       hover:from-[#1E6BB3] hover:to-[#179C93]
                                       focus:outline-none focus:ring-4 focus:ring-[#1CADA3]/40
                                       transition-all duration-300 group">
                            <span>Get Started Now</span>
                            <ArrowRight className="w-6 h-6 group-hover:translate-x-1 transition-transform" />
                        </button>
                    </div>

                    {/* Stats */}
                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 max-w-5xl mx-auto">
                        {stats.map((stat, idx) => (
                            <div key={idx} className="glass-card p-6 md:p-10 rounded-[2rem] md:rounded-[2.5rem] group">
                                <div
                                    className={`${stat.color} w-14 h-14 md:w-16 md:h-16 rounded-2xl flex items-center justify-center mb-4 md:mb-6 mx-auto group-hover:scale-110 transition-all duration-500`}>
                                    {stat.icon}
                                </div>
                                <div className="text-2xl md:text-3xl font-black text-[#2076C7] mb-2 md:mb-3">{stat.value}</div>
                                <div className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em] md:tracking-[0.3em]">
                                    {stat.label}
                                </div>
                            </div>
                        ))}
                    </div>

                    {/* Trust Indicators */}
                    <div className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-4 sm:gap-8">
                        <div className="flex items-center space-x-2">
                            <ShieldCheck className="w-5 h-5 text-[#1CADA3]" />
                            <span className="font-bold text-slate-700 text-sm md:text-base">SEBI Registered</span>
                        </div>
                        <div className="hidden sm:block h-5 w-px bg-gray-300" />
                        <div className="flex items-center space-x-2">
                            <ShieldCheck className="w-5 h-5 text-[#2076C7]" />
                            <span className="font-bold text-slate-700 text-sm md:text-base">CRISIL AAA Rated</span>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default Hero;
