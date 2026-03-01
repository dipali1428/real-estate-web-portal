"use client";
import React from 'react';
import { ShieldCheck, Banknote, Zap, History, FileText, Gift, ArrowRight } from 'lucide-react';

interface FeaturesBenefitsProps {
    openForm: () => void;
}

export default function FeaturesBenefits({ openForm }: FeaturesBenefitsProps) {
    const features = [
        {
            icon: Zap,
            title: "Lightning Fast Approvals",
            desc: "Experience zero wait time. Our advanced algorithms process your application instantly, rendering a decision within seconds.",
        },
        {
            icon: FileText,
            title: "100% Paperless Journey",
            desc: "No physical visits, no printing documents. Complete your entire loan process entirely online from the comfort of your couch.",
        },
        {
            icon: Banknote,
            title: "Zero Hidden Charges",
            desc: "Transparency is our promise. From processing fees to interest rates, everything is communicated clearly upfront.",
        },
        {
            icon: History,
            title: "Flexible Repayment",
            desc: "Choose a tenure that fits your monthly budget perfectly. Ranging from 12 months up to 84 months for ultimate peace of mind.",
        },
        {
            icon: ShieldCheck,
            title: "Bank-Grade Security",
            desc: "Your data is protected utilizing AES-256 encryption. We utilize top-tier infrastructure strictly adhering to RBI guidelines.",
        },
        {
            icon: Gift,
            title: "Pre-Approved Offers",
            desc: "Existing customers with good repayment history gain access to instant top-ups and exclusive reduced interest rates.",
        }
    ];

    return (
        <section className="py-12 md:py-20 bg-white font-sans">
            <div className="container mx-auto px-4 md:px-6 max-w-7xl">
                <div className="text-center max-w-3xl mx-auto mb-12 md:mb-20">
                    <span className="text-[#1CADA3] font-bold tracking-wider uppercase text-[10px] md:text-sm mb-3 md:mb-4 block">Why Choose Infinity Arthvishva</span>
                    <h2 className="text-2xl md:text-4xl lg:text-5xl font-extrabold mb-4 md:mb-6 tracking-tight leading-tight font-sans text-transparent bg-clip-text bg-gradient-to-r from-[#2076C7] via-[#1CADA3] to-[#2076C7]">
                        Built for Speed and Convenience
                    </h2>
                    <p className="text-sm md:text-lg text-gray-600 leading-relaxed md:leading-relaxed">
                        We have redefined how personal loans work. Say goodbye to lengthy unorganized processes, and say hello to seamless modern financing.
                    </p>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 md:gap-8 mb-10 md:mb-12">
                    {features.map((item, idx) => (
                        <div
                            key={idx}
                            className="group relative p-6 md:p-8 bg-white rounded-2xl md:rounded-3xl border border-gray-100 shadow-[0_4px_20px_-10px_rgba(0,0,0,0.05)] hover:shadow-2xl hover:shadow-blue-500/10 transition-all duration-500 hover:-translate-y-2 overflow-hidden flex flex-col items-start text-left"
                        >
                            {/* Decorative Background Element */}
                            <div className="absolute top-0 right-0 -mt-4 -mr-4 w-20 md:w-24 h-20 md:h-24 bg-gradient-to-br from-blue-50 to-teal-50 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-500 blur-2xl"></div>

                            <div className="relative z-10 w-full">
                                <div className="w-11 h-11 md:w-14 md:h-14 bg-gradient-to-br from-[#2076C7] to-[#1CADA3] rounded-xl md:rounded-2xl flex items-center justify-center text-white mb-5 md:mb-6 shadow-lg shadow-blue-100">
                                    <item.icon size={26} className="w-5 h-5 md:w-6 md:h-6" strokeWidth={1.5} />
                                </div>
                                <h3 className="text-lg md:text-xl font-extrabold text-gray-900 mb-3 md:mb-4 group-hover:text-[#2076C7] transition-colors leading-tight">{item.title}</h3>
                                <p className="text-gray-600 leading-relaxed font-medium text-xs md:text-base">
                                    {item.desc}
                                </p>
                            </div>
                        </div>
                    ))}
                </div>


            </div>
        </section>
    );
}
