'use client';

import { MousePointerClick, FileCheck, IndianRupee, ArrowRight } from 'lucide-react';

const HowItWorks = () => {
    const steps = [
        {
            id: 1,
            title: 'Select Investment',
            desc: 'Choose from our wide range of AAA-rated NCDs.',
            icon: <MousePointerClick className="w-6 h-6 text-white" />,
            color: 'bg-[#2076C7]',
        },
        {
            id: 2,
            title: 'Complete KYC',
            desc: 'Paperless verification using PAN & Aadhaar.',
            icon: <FileCheck className="w-6 h-6 text-white" />,
            color: 'bg-[#1CADA3]',
        },
        {
            id: 3,
            title: 'Make Payment',
            desc: 'Transfer funds via UPI or Net Banking.',
            icon: <IndianRupee className="w-6 h-6 text-white" />,
            color: 'bg-[#2076C7]',
        },
    ];

    return (
        <section className="py-24 bg-[#F8FBFE] relative overflow-hidden">
            <div className="container-custom relative z-10">
                {/* Section Heading */}
                <div className="text-center max-w-3xl mx-auto mb-16 px-4">
                    <h2 className="text-2xl md:text-4xl font-bold mb-4 bg-linear-to-r from-[#2076C7] to-[#1CADA3] bg-clip-text text-transparent">
                        Invest in 3 Simple Steps
                    </h2>
                    <div className="w-20 h-1 mx-auto bg-gradient-to-r from-[#2076C7] to-[#1CADA3] rounded-full mb-4"></div>

                    <p className="text-sm md:text-lg text-gray-600 font-medium leading-relaxed">
                        Start your wealth generation journey today. Our seamless platform ensures a hassle-free experience.
                    </p>
                </div>

                {/* Steps Grid */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-10 relative">
                    {/* Connector Line (Desktop only) */}
                    <div className="hidden md:block absolute top-1/2 left-0 w-full h-[2px]
                                    bg-linear-to-r from-[#2076C7]/20 via-[#1CADA3]/20 to-[#2076C7]/20
                                    -translate-y-1/2 -z-10 rounded-full" />

                    {steps.map((step) => (
                        <div
                            key={step.id}
                            className="group relative bg-white p-6 md:p-10 rounded-3xl
                                       border border-gray-100
                                       shadow-[0_10px_30px_rgba(0,0,0,0.06)]
                                       hover:shadow-[0_20px_55px_rgba(32,118,199,0.15)]
                                       hover:-translate-y-1
                                       transition-all duration-300">

                            {/* Step Number */}
                            <div className="absolute -top-6 left-1/2 -translate-x-1/2
                                            bg-white border-4 border-[#F8FBFE]
                                            text-[#2076C7] font-black text-lg
                                            w-12 h-12 rounded-full
                                            flex items-center justify-center
                                            shadow-md
                                            group-hover:scale-105 transition-transform">
                                {step.id}
                            </div>

                            {/* Icon */}
                            <div
                                className={`w-16 h-16 md:w-20 md:h-20 mx-auto rounded-2xl md:rounded-3xl
                                            ${step.color}/10
                                            flex items-center justify-center mb-6 md:mb-8
                                            group-hover:scale-105 transition-transform`}>
                                <div className={`p-3 md:p-4 rounded-xl md:rounded-2xl ${step.color} shadow-md`}>
                                    {step.icon}
                                </div>
                            </div>

                            {/* Content */}
                            <h3 className="text-xl font-bold text-[#0B1C2E] mb-3 text-center group-hover:text-[#2076C7] transition-colors">
                                {step.title}
                            </h3>
                            <p className="text-gray-600 text-center leading-relaxed text-sm max-w-[260px] mx-auto">
                                {step.desc}
                            </p>
                        </div>
                    ))}
                </div>

                {/* Mobile CTA */}
                <div className="mt-14 text-center md:hidden">
                    <button
                        className="inline-flex items-center justify-center gap-2 w-full
                                   px-6 py-4 rounded-xl font-semibold text-white
                                   bg-gradient-to-r from-[#2076C7] to-[#1CADA3]
                                   shadow-md hover:shadow-lg transition-all">
                        <span>Start Investing Now</span>
                        <ArrowRight className="w-5 h-5" />
                    </button>
                </div>
            </div>
        </section>
    );
};

export default HowItWorks;
