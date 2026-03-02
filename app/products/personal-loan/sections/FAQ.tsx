"use client";
import React, { useState } from 'react';
import { ChevronDown, ChevronUp, HelpCircle } from 'lucide-react';

export default function FAQ() {
    const [openIdx, setOpenIdx] = useState<number | null>(null);

    const faqs = [
        {
            q: "What is the maximum loan amount I can avail?",
            a: "You can avail a personal loan up to ₹50 Lakhs, depending on your eligibility, monthly income, and existing credit commitments."
        },
        {
            q: "How long does the approval process take?",
            a: "Our digital-first approach allows for instant in-principle approval. Once all documents are verified, the amount is usually disbursed within 24-48 hours."
        },
        {
            q: "Do I need to provide any collateral or security?",
            a: "No, personal loans are unsecured loans, meaning you don't need to provide any collateral, gold, or property as security."
        },
        {
            q: "What are the interest rates offered?",
            a: "Interest rates start from as low as 10.5% p.a. and vary based on your credit score, employer category, and loan tenure."
        },
        {
            q: "Can I prepay or foreclose my loan?",
            a: "Yes, you can prepay or foreclose your loan after a minimum lock-in period (usually 6-12 months). Applicable foreclosure charges may apply as per bank norms."
        }
    ];

    const toggle = (idx: number) => {
        setOpenIdx(openIdx === idx ? null : idx);
    };

    return (
        <section className="py-12 md:py-20 bg-[#fcfdfe] font-sans">
            <div className="container mx-auto px-4 md:px-6 max-w-7xl">
                <div className="text-center mb-12 md:mb-16">
                    <div className="inline-flex items-center justify-center w-12 h-12 md:w-16 md:h-16 bg-blue-50 text-[#2076C7] rounded-2xl mb-4 md:mb-6 shadow-sm">
                        <HelpCircle size={32} className="w-7 h-7" />
                    </div>
                    <h2 className="text-2xl md:text-3xl lg:text-4xl font-extrabold mb-3 md:mb-4 tracking-tight font-sans text-transparent bg-clip-text bg-gradient-to-r from-[#2076C7] via-[#1CADA3] to-[#2076C7]">
                        Frequently Asked Questions
                    </h2>
                    <p className="text-sm md:text-base text-gray-600 max-w-lg mx-auto">
                        Everything you need to know about our personal loan process and policies.
                    </p>
                </div>

                <div className="space-y-3 md:space-y-4">
                    {faqs.map((faq, idx) => (
                        <div
                            key={idx}
                            className={`group border rounded-xl md:rounded-2xl transition-all duration-300 bg-white ${openIdx === idx
                                ? 'border-[#2076C7] shadow-lg shadow-blue-500/5'
                                : 'border-gray-100 hover:border-gray-200 shadow-sm'
                                }`}
                        >
                            <button
                                onClick={() => toggle(idx)}
                                suppressHydrationWarning
                                className="w-full flex items-center justify-between p-4 md:p-6 text-left focus:outline-none"
                            >
                                <span className={`font-bold text-sm md:text-lg pr-6 transition-colors ${openIdx === idx ? 'text-[#2076C7]' : 'text-gray-900'
                                    }`}>
                                    {faq.q}
                                </span>
                                <div className={`shrink-0 w-8 h-8 rounded-full flex items-center justify-center transition-all ${openIdx === idx ? 'bg-blue-100 text-[#2076C7]' : 'bg-gray-50 text-gray-400'
                                    }`}>
                                    {openIdx === idx ? <ChevronUp size={18} /> : <ChevronDown size={18} />}
                                </div>
                            </button>

                            <div
                                className={`overflow-hidden transition-all duration-300 ease-in-out ${openIdx === idx ? 'max-h-60' : 'max-h-0'
                                    }`}
                            >
                                <div className="p-4 md:p-6 pt-0 md:pt-0 border-t border-gray-50">
                                    <p className="text-xs md:text-base text-gray-600 leading-relaxed font-medium">
                                        {faq.a}
                                    </p>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>


            </div>
        </section>
    );
}
