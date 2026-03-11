'use client';

import { MousePointerClick, FileCheck, IndianRupee, ArrowRight } from 'lucide-react';

interface HowItWorksProps {
    onStart?: () => void;
}

const HowItWorks = ({ onStart }: HowItWorksProps) => {
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
        <section className="py-12 md:py-16 bg-[#F8FBFE] relative overflow-hidden font-sans">
            <div className="container-custom relative z-10 px-4 sm:px-6 lg:px-8 mx-auto max-w-7xl">
                {/* Section Heading */}
                <div className="text-center max-w-4xl mx-auto mb-20 px-4">
                    <h2 className="text-3xl md:text-5xl font-black mb-6 bg-linear-to-r from-[#2076C7] to-[#1CADA3] bg-clip-text text-transparent font-sans">
                        Invest in 3 Simple Steps
                    </h2>

                    <p className="text-base md:text-xl text-slate-500 font-medium leading-relaxed max-w-2xl mx-auto">
                        Start your wealth generation journey today. Our seamless, digital-first platform ensures a paperless experience.
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
                            className="group relative bg-white p-8 md:p-12 rounded-[2.5rem]
                                       border border-blue-50/50
                                       shadow-xl shadow-blue-900/5
                                       hover:shadow-2xl hover:shadow-blue-900/10
                                       hover:-translate-y-2
                                       transition-all duration-500">



                            {/* Icon */}
                            <div
                                className={`w-20 h-20 md:w-28 md:h-28 mx-auto rounded-3xl
                                            ${step.color}/5
                                            flex items-center justify-center mb-8 md:mb-12
                                            group-hover:scale-110 transition-transform duration-500`}>
                                <div className={`p-4 md:p-6 rounded-2xl md:rounded-[2rem] ${step.color} shadow-xl shadow-blue-500/20`}>
                                    {step.icon}
                                </div>
                            </div>

                            {/* Content */}
                            <h3 className="text-xl md:text-2xl font-black text-[#0B1C2E] mb-4 text-center group-hover:text-[#2076C7] transition-colors font-sans">
                                {step.title}
                            </h3>
                            <p className="text-slate-500 text-center leading-relaxed text-sm md:text-base font-medium max-w-[280px] mx-auto">
                                {step.desc}
                            </p>
                        </div>
                    ))}
                </div>

                {/* Mobile CTA */}
                <div className="mt-14 text-center md:hidden">
                    <button
                        onClick={onStart}
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
