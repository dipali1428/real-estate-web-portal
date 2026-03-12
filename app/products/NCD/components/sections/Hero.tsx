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
        <section className="relative overflow-hidden pt-12 pb-6 md:pt-16 md:pb-12 font-sans">
            {/* Brand Background Gradient */}
            <div className="absolute inset-0 bg-gradient-to-br from-[#2076C7]/10 via-[#F0F9FF] to-[#1CADA3]/10 -z-10" />

            {/* Subtle Light Effect */}
            <div className="absolute top-0 right-0 w-[400px] md:w-[700px] h-[400px] md:h-[700px] bg-white/40 blur-3xl rounded-full pointer-events-none -translate-y-1/2 translate-x-1/2 opacity-50" />

            <div className="container-custom relative z-10 px-4 sm:px-6 lg:px-8 mx-auto max-w-7xl">
                <div className="max-w-4xl mx-auto text-center">
                    {/* SEO Tagline */}
                    <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-linear-to-r from-[#2076C7]/5 to-[#1CADA3]/5 border border-[#2076C7]/10 mb-8 md:mb-12 animate-in fade-in slide-in-from-bottom-4 duration-1000">
                        <span className="w-1.5 h-1.5 rounded-full bg-[#1CADA3] animate-pulse" />
                        <span className="text-[10px] md:text-xs font-black text-[#2076C7] uppercase tracking-[0.3em]">High-Yield Fixed Income</span>
                    </div>

                    {/* Title */}
                    <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold mb-6 leading-tight tracking-tight bg-linear-to-r from-[#2076C7] via-[#1CADA3] to-[#2076C7] bg-[length:200%_auto] animate-gradient-x bg-clip-text text-transparent">
                        Secure Your Future with <br />
                        Trusted NCDs
                    </h1>

                    <p className="text-base md:text-2xl text-slate-600 mb-8 md:mb-12 leading-relaxed max-w-3xl mx-auto font-medium px-2">
                        Access premium, high-rated fixed-income instruments handpicked by experts.
                        Experience predictable{' '}
                        <span className="text-[#2076C7] font-bold">8-12% annual returns</span> with capital protection.
                    </p>

                    {/* CTA Buttons */}
                    <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-12 px-6 sm:px-0">
                        {/* Primary CTA */}
                        <button
                            suppressHydrationWarning={true}
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
                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 md:gap-8 max-w-5xl mx-auto">
                        {stats.map((stat, idx) => (
                            <div key={idx} className="bg-white/60 backdrop-blur-md p-6 md:p-10 rounded-[2rem] md:rounded-[3rem] border border-white shadow-xl shadow-blue-900/5 group transition-all duration-500 hover:shadow-2xl">
                                <div
                                    className={`${stat.color} w-12 h-12 md:w-20 md:h-20 rounded-2xl flex items-center justify-center mb-4 md:mb-8 mx-auto group-hover:scale-110 transition-all duration-500 shadow-sm`}>
                                    {stat.icon}
                                </div>
                                <h1 className="text-2xl md:text-4xl font-black text-[#0B1C2E] mb-1 md:mb-3 group-hover:text-[#2076C7] transition-colors font-sans">{stat.value}</h1>
                                <div className="text-[10px] md:text-xs font-black text-slate-400 uppercase tracking-[0.2em] md:tracking-[0.4em]">
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
