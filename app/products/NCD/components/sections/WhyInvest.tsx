'use client';

import { Shield, BarChart3, Clock, Zap } from 'lucide-react';

const WhyInvest = () => {
    const features = [
        {
            title: 'Secured Investments',
            desc: 'NCDs are backed by the assets of the issuing company, providing an additional layer of security to your principal capital.',
            icon: <Shield className="w-7 h-7 text-[#2076C7]" />,
        },
        {
            title: 'Fixed & High Returns',
            desc: 'Unlike market-linked instruments, NCDs offer fixed interest rates that remain unaffected by stock market volatility.',
            icon: <BarChart3 className="w-7 h-7 text-[#1CADA3]" />,
        },
        {
            title: 'Regular Income Stream',
            desc: 'Choose from monthly, quarterly, or annual interest payout options to match your cash flow requirements.',
            icon: <Clock className="w-7 h-7 text-[#2076C7]" />,
        },
        {
            title: 'Superior Liquidity',
            desc: 'Publicly issued NCDs are listed on major stock exchanges (NSE/BSE), allowing you to exit before maturity if needed.',
            icon: <Zap className="w-7 h-7 text-[#1CADA3]" />,
        },
    ];

    return (
        <section className="py-24 bg-white relative overflow-hidden" id="why-invest">
            {/* Ambient background */}
            <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-linear-to-bl from-[#2076C7]/5 to-transparent rounded-full blur-3xl pointer-events-none" />

            <div className="container-custom relative z-10">
                {/* Header */}
                <div className="text-center max-w-3xl mx-auto mb-16">
                    <h2 className="text-3xl md:text-4xl font-bold mb-4 bg-linear-to-r from-[#2076C7] to-[#1CADA3] bg-clip-text text-transparent">
                        Why Invest in NCDs?
                    </h2>
                    <div className="w-24 h-1 mx-auto bg-linear-to-r from-[#2076C7] to-[#1CADA3] rounded-full mb-5" />
                    <p className="text-gray-600 text-lg leading-relaxed">
                        Discover why smart investors are moving their fixed-income portfolio from traditional Bank FDs to Non-Convertible Debentures.
                    </p>
                </div>

                {/* Cards */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
                    {features.map((feature, idx) => (
                        <div
                            key={idx}
                            className="flex flex-col items-center text-center
                                       h-full p-10 rounded-3xl
                                       bg-white
                                       border border-gray-100
                                       shadow-[0_10px_30px_rgba(0,0,0,0.06)]
                                       hover:shadow-[0_18px_50px_rgba(32,118,199,0.15)]
                                       hover:-translate-y-1
                                       transition-all duration-300 group">

                            {/* Icon container */}
                            <div className="mb-8 w-16 h-16 rounded-2xl
                                            flex items-center justify-center
                                            bg-linear-to-br from-[#F4FAFF] to-[#ECFBF9]
                                            border border-[#2076C7]/10
                                            group-hover:scale-105 transition-transform">
                                {feature.icon}
                            </div>

                            {/* Title */}
                            <h3 className="text-lg font-bold text-[#2076C7] mb-4 group-hover:text-[#1CADA3] transition-colors">
                                {feature.title}
                            </h3>

                            {/* Description */}
                            <p className="text-sm text-gray-600 leading-relaxed max-w-[280px]">
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
