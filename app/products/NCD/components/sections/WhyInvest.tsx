'use client';

import { Shield, BarChart3, Clock, Zap } from 'lucide-react';

const WhyInvest = () => {
    const features = [
        {
            title: 'Secured Investments',
            desc: 'NCDs are backed by the assets of the issuing company, providing an additional layer of security to your principal capital.',
            icon: <Shield className="w-6 h-6 sm:w-7 sm:h-7 text-[#2076C7]" />,
        },
        {
            title: 'Fixed & High Returns',
            desc: 'Unlike market-linked instruments, NCDs offer fixed interest rates that remain unaffected by stock market volatility.',
            icon: <BarChart3 className="w-6 h-6 sm:w-7 sm:h-7 text-[#1CADA3]" />,
        },
        {
            title: 'Regular Income Stream',
            desc: 'Choose from monthly, quarterly, or annual interest payout options to match your cash flow requirements.',
            icon: <Clock className="w-6 h-6 sm:w-7 sm:h-7 text-[#2076C7]" />,
        },
        {
            title: 'Superior Liquidity',
            desc: 'Publicly issued NCDs are listed on major stock exchanges (NSE/BSE), allowing you to exit before maturity if needed.',
            icon: <Zap className="w-6 h-6 sm:w-7 sm:h-7 text-[#1CADA3]" />,
        },
    ];

    return (
        <section
            className="py-12 md:py-16 bg-white relative overflow-hidden px-4 sm:px-6 lg:px-8 font-sans"
            id="why-invest"
        >
            {/* Ambient background */}
            <div className="absolute top-0 right-0 w-[300px] sm:w-[400px] lg:w-[500px] h-[300px] sm:h-[400px] lg:h-[500px] bg-linear-to-bl from-[#2076C7]/5 to-transparent rounded-full blur-3xl pointer-events-none" />

            <div className="max-w-7xl mx-auto relative z-10 px-4 sm:px-6 lg:px-8">
                {/* Header */}
                <div className="text-center max-w-4xl mx-auto mb-16 px-4">
                    <h2 className="text-3xl md:text-5xl font-black mb-6 bg-linear-to-r from-[#2076C7] to-[#1CADA3] bg-clip-text text-transparent font-sans">
                        Why Invest in NCDs?
                    </h2>

                    <p className="text-base md:text-xl text-slate-500 font-medium leading-relaxed max-w-2xl mx-auto">
                        Discover why smart investors are moving their fixed-income portfolio from traditional Bank FDs to Non-Convertible Debentures.
                    </p>
                </div>

                {/* Cards */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8">
                    {features.map((feature, idx) => (
                        <div
                            key={idx}
                            className="flex flex-col items-center text-center
                                       h-full p-8 md:p-12 rounded-[2.5rem]
                                       bg-white
                                       border border-gray-100
                                       shadow-xl shadow-blue-900/5
                                       hover:shadow-2xl hover:shadow-blue-900/10
                                       hover:-translate-y-2
                                       transition-all duration-500 group"
                        >
                            {/* Icon container */}
                            <div
                                className="mb-8 w-16 h-16 md:w-24 md:h-24 rounded-3xl
                                           flex items-center justify-center
                                           bg-linear-to-br from-[#F4FAFF] to-[#ECFBF9]
                                           border border-[#2076C7]/10
                                           group-hover:scale-110 transition-transform duration-500"
                            >
                                <div className="p-4 md:p-6 bg-white rounded-2xl shadow-sm border border-blue-50/50">
                                    {feature.icon}
                                </div>
                            </div>

                            {/* Title */}
                            <h3 className="text-xl font-black text-[#0B1C2E] mb-4 group-hover:text-[#2076C7] transition-colors font-sans">
                                {feature.title}
                            </h3>

                            {/* Description */}
                            <p className="text-sm md:text-base text-slate-500 leading-relaxed font-medium max-w-[280px]">
                                {feature.desc}
                            </p>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default WhyInvest;
