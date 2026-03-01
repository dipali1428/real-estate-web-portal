import React from 'react';
import { FormInput, FileText, BadgeCheck, HandCoins } from 'lucide-react';

export default function HowItWorks() {
    const steps = [
        {
            icon: FormInput,
            title: "Quick Registration",
            desc: "Provide your basic details like name, mobile number, and loan amount needed.",
            delay: "0s"
        },
        {
            icon: FileText,
            title: "Digital Verification",
            desc: "Upload required documents digitally. We safely fetch your CIBIL score.",
            delay: "0.2s"
        },
        {
            icon: BadgeCheck,
            title: "Instant Approval",
            desc: "Our financial engine analyzes your data and offers the finest loan terms immediately.",
            delay: "0.4s"
        },
        {
            icon: HandCoins,
            title: "Quick Disbursal",
            desc: "Once confirmed, the amount is disbursed directly into your bank account within 24 hours.",
            delay: "0.6s"
        }
    ];

    return (
        <section className="py-12 md:py-20 bg-gray-50 font-sans relative overflow-hidden">
            <div className="container mx-auto px-4 md:px-6 max-w-7xl relative z-10">
                <div className="text-center max-w-3xl mx-auto mb-20">
                    <span className="text-[#1CADA3] font-bold tracking-wider uppercase text-sm mb-4 block">Application Process</span>
                    <h2 className="text-3xl md:text-5xl font-extrabold mb-6 tracking-tight font-sans text-transparent bg-clip-text bg-gradient-to-r from-[#2076C7] via-[#1CADA3] to-[#2076C7]">
                        How It Works
                    </h2>
                    <p className="text-lg text-gray-600">
                        Getting a personal loan shouldn't be complicated. We mapped out a frictionless four-step roadmap to get you funded as fast as possible.
                    </p>
                </div>

                <div className="relative">
                    {/* Connecting Line (Hidden on mobile) */}
                    <div className="hidden lg:block absolute top-[5rem] left-[10%] right-[10%] h-[3px] bg-gradient-to-r from-gray-200 via-blue-200 to-teal-200 rounded-full z-0"></div>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 lg:gap-8 relative z-10">
                        {steps.map((step, idx) => (
                            <div key={idx} className="bg-white rounded-[2.5rem] p-8 md:p-10 shadow-sm border border-gray-100 hover:shadow-xl hover:border-[#1CADA3]/20 transition-all duration-500 group relative flex flex-col items-center text-center">
                                {/* Step Number Overlay */}
                                <div className="absolute -top-4 -right-4 w-12 h-12 bg-gradient-to-br from-[#2076C7] to-[#1CADA3] text-white rounded-2xl flex items-center justify-center font-black text-xl shadow-lg transform group-hover:rotate-12 transition-transform">
                                    {idx + 1}
                                </div>

                                {/* Icon Container */}
                                <div className="w-20 h-20 bg-teal-50 rounded-2xl flex items-center justify-center mb-8 group-hover:scale-110 transition-transform duration-500">
                                    <step.icon size={36} className="text-[#1CADA3]" strokeWidth={1.5} />
                                </div>

                                {/* Step Content */}
                                <h3 className="text-xl md:text-2xl font-extrabold text-gray-900 mb-4 group-hover:text-[#2076C7] transition-colors line-tight">
                                    {step.title}
                                </h3>
                                <p className="text-gray-600 font-medium leading-relaxed text-sm md:text-base">
                                    {step.desc}
                                </p>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </section>
    );
}
