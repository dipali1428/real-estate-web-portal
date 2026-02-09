'use client';

import { ShieldCheck, Users, Zap, Award } from 'lucide-react';

const Trust = () => {
    const features = [
        {
            icon: <ShieldCheck className="w-8 h-8 text-[#1CADA3]" />,
            title: 'Curated Selection',
            desc: 'Only AA+ and AAA rated instruments passed by our risk team.',
        },
        {
            icon: <Users className="w-8 h-8 text-[#2076C7]" />,
            title: 'Dedicated RM',
            desc: 'Get a personal Relationship Manager for portfolio guidance.',
        },
        {
            icon: <Zap className="w-8 h-8 text-[#1CADA3]" />,
            title: '100% Digital',
            desc: 'Zero paperwork. Complete investment process in 5 minutes.',
        },
        {
            icon: <Award className="w-8 h-8 text-[#2076C7]" />,
            title: 'Zero Brokerage',
            desc: 'Invest directly without any hidden fees or commissions.',
        },
    ];

    return (
        <section className="py-16 bg-white border-b border-gray-100">
            <div className="container-custom">
                {/* Section Header */}
                <div className="text-center max-w-3xl mx-auto mb-14">
                    <h2 className="text-3xl md:text-4xl font-bold mb-3 bg-gradient-to-r from-[#2076C7] to-[#1CADA3] bg-clip-text text-transparent drop-shadow-sm">
                        Why Choose{' '}
                        <span className="bg-clip-text text-transparent bg-linear-to-r from-[#2076C7] to-[#1CADA3]">
                            Infinity Arthvishva
                        </span>
                        ?
                    </h2>
                    <div className="w-24 h-1 mx-auto bg-gradient-to-r from-[#2076C7] to-[#1CADA3] rounded-full mb-4"></div>

                    <p className="text-gray-600 text-base md:text-lg">
                        We blend technology with expertise to secure your financial future.
                    </p>
                </div>

                {/* Feature Cards */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
                    {features.map((feature, idx) => (
                        <div
                            key={idx}
                            className="flex flex-col items-center text-center
                                       h-full p-8 rounded-3xl
                                       bg-linear-to-b from-gray-50 to-white
                                       border border-gray-100
                                       hover:shadow-xl hover:-translate-y-1
                                       transition-all duration-300 group">

                            {/* Icon */}
                            <div className="mb-6 p-4 bg-white rounded-2xl shadow-sm
                                            group-hover:scale-110 transition-transform duration-300">
                                {feature.icon}
                            </div>

                            {/* Title */}
                            <h3 className="text-lg font-bold text-[#2076C7] mb-3">
                                {feature.title}
                            </h3>

                            {/* Description */}
                            <p className="text-sm text-gray-600 leading-relaxed max-w-[260px]">
                                {feature.desc}
                            </p>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default Trust;
