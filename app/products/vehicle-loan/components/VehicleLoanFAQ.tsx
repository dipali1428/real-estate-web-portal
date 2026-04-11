"use client";

import React, { useState } from 'react';
import { Plus, Minus } from 'lucide-react';

const vehicleLoanFaqs = [
    {
        question: "What is the maximum vehicle loan amount I can get?",
        answer: "We offer up to 100% financing on the on-road price of the vehicle. The exact loan amount depends on the vehicle's cost, your income, credit score, and existing financial obligations."
    },
    {
        question: "Can I get a loan for a used or pre-owned vehicle?",
        answer: "Yes, we provide financing options for used and pre-owned vehicles. The loan amount and interest rate may vary slightly compared to new vehicle loans, and the vehicle's age is taken into consideration."
    },
    {
        question: "How long does it take for a vehicle loan to be approved?",
        answer: "With our streamlined digital process, if all your documents are in order and you meet the eligibility criteria, approval can happen in as little as 24-48 hours. Pre-approved customers can receive instant approvals."
    },
    {
        question: "Is it mandatory to have a guarantor for a vehicle loan?",
        answer: "No, a guarantor is not usually mandatory. However, if your income does not meet the criteria or your credit score is low, a guarantor with a good credit history might be required."
    },
    {
        question: "Can I prepay my vehicle loan before the tenure ends?",
        answer: "Yes, you can prepay or foreclose your vehicle loan. There might be a minimum lock-in period (typically 6 months to 1 year), after which you can prepay. Standard foreclosure charges may apply as per the loan agreement."
    },
    {
        question: "What happens if I miss an EMI payment?",
        answer: "Missing an EMI payment will incur penal interest and late payment fees. It will also negatively impact your credit score (CIBIL). Consistent defaults may lead to vehicle repossession."
    }
];

const VehicleLoanFAQ = () => {
    const [activeIndex, setActiveIndex] = useState<number | null>(null);
    const [showAllFaqs, setShowAllFaqs] = useState(false);

    const toggleFAQ = (index: number) => {
        setActiveIndex(activeIndex === index ? null : index);
    };

    return (
        <div className="bg-white font-sans">
            <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                <div className="text-center mb-8">
                    <h2 className="text-3xl md:text-4xl font-extrabold mb-3 bg-linear-to-r from-[#2076C7] to-[#1CADA3] bg-clip-text text-transparent drop-shadow-sm">Frequently Asked Questions</h2>
                    <div className="w-24 h-1 mx-auto rounded-full mb-4" style={{ background: 'linear-gradient(to right, #2076C7, #1CADA3)' }}></div>
                    <p className="text-gray-600 max-w-2xl mx-auto text-lg leading-relaxed">Got questions about vehicle financing? We&apos;ve got answers.</p>
                </div>

                <div className="space-y-4">
                    {(showAllFaqs ? vehicleLoanFaqs : vehicleLoanFaqs.slice(0, 5)).map((faq, idx) => (
                        <div key={idx} className="border border-gray-100 rounded-2xl overflow-hidden transition-all duration-300 hover:border-blue-600/30 hover:shadow-md">
                            <button
                                onClick={() => toggleFAQ(idx)}
                                className="w-full px-4 sm:px-6 py-3 sm:py-4 text-left flex justify-between items-start gap-3 bg-gray-50 hover:bg-blue-50/50 transition-colors focus:outline-none cursor-pointer group"
                            >
                                <span className="font-bold text-gray-700 text-base sm:text-lg pr-2 group-hover:text-blue-600 transition-colors text-balance">{faq.question}</span>
                                <div className={`p-1.5 rounded-full bg-white border border-gray-300 text-gray-700 transition-transform duration-300 ${activeIndex === idx ? 'rotate-180' : ''}`}>
                                    {activeIndex === idx ? <Minus size={18} strokeWidth={3} /> : <Plus size={18} strokeWidth={3} />}
                                </div>
                            </button>

                            {activeIndex === idx && (
                                <div className="px-6 py-3 bg-white text-gray-600 text-base leading-relaxed border-t border-gray-100 animate-fadeIn">
                                    {faq.answer}
                                </div>
                            )}
                        </div>
                    ))}
                </div>

                {vehicleLoanFaqs.length > 5 && (
                    <div className="text-center mt-8">
                        <button
                            onClick={() => setShowAllFaqs(!showAllFaqs)}
                            className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-blue-50 text-[#2076C7] font-semibold hover:bg-blue-100 transition-colors cursor-pointer"
                        >
                            {showAllFaqs ? 'View Less' : 'View More'}
                            <Plus size={18} className={`transition-transform duration-300 ${showAllFaqs ? 'rotate-45' : ''}`} />
                        </button>
                    </div>
                )}
            </div>
        </div>
    );
};

export default VehicleLoanFAQ;
