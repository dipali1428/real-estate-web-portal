"use client";
import React, { useState } from 'react';
import { Plus, Minus } from 'lucide-react';

const businessLoanFaqs = [
    {
        question: "What is the maximum loan amount I can get for my business?",
        answer: "You can apply for a business loan up to ₹1 Crore, depending on your business stability, vintage, annual turnover, and repayment capacity. Our team evaluates each application on a case-by-case basis to offer the best possible quantum."
    },
    {
        question: "Is collateral required for a business loan?",
        answer: "We offer unsecured business loans where no collateral or security is required. This means you don't have to pledge any assets like property or inventory to secure the funding."
    },
    {
        question: "What are the interest rates for business loans?",
        answer: "Our interest rates are highly competitive and are determined based on factors like your business type, vintage, financial health, and credit score. Typically, they start at 14% to 18% per annum."
    },
    {
        question: "How long does it take for the loan to be disbursed?",
        answer: "Our process is designed for speed. Once your documents are verified and the loan is approved, the funds are usually disbursed into your business account within 48 to 72 hours."
    },
    {
        question: "What is the eligibility criteria for a business loan?",
        answer: "Generally, your business should have a minimum vintage of 2-3 years, a healthy turnover, and a good credit history. Both self-employed professionals and business owners (Partnerships, LLPs, Private Ltd. Companies) are eligible."
    },
    {
        question: "Can I prepay or foreclose my business loan?",
        answer: "Yes, you can prepay or foreclose your loan after a minimum lock-in period (usually 6-12 months). Standard foreclosure charges may apply as per the terms of your loan agreement."
    },
    {
        question: "Can I use a business loan to start a new business?",
        answer: "Typically, standard business loans require a minimum vintage of 2-3 years. However, we have specific schemes catering to startups and new enterprises. Please speak to our advisors to see if you qualify."
    },
    {
        question: "Are there any processing fees involved?",
        answer: "Yes, a nominal processing fee ranging from 1% to 2% of the loan amount is usually charged, which is deducted straight from the disbursed loan amount. All charges are completely transparent and communicated prior to disbursement."
    },
    {
        question: "How does my credit score affect my business loan application?",
        answer: "A good credit score (typically 750 or above) increases your chances of approval and helps secure a lower interest rate, as it reflects a strong repayment history and financial discipline."
    }
];

const BusinessLoanFAQ = () => {
    const [activeIndex, setActiveIndex] = useState<number | null>(null);
    const [showAllFaqs, setShowAllFaqs] = useState(false);

    const toggleFAQ = (index: number) => {
        setActiveIndex(activeIndex === index ? null : index);
    };

    return (
        <div className="bg-white font-sans">
            <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-6 md:py-10">
                <div className="text-center mb-6">
                    <h2 className="text-3xl md:text-4xl font-extrabold mb-3 bg-linear-to-r from-[#2076C7] to-[#1CADA3] bg-clip-text text-transparent drop-shadow-sm">Frequently Asked Questions</h2>
                    <div className="w-24 h-1 mx-auto rounded-full mb-4" style={{ background: 'linear-gradient(to right, #2076C7, #1CADA3)' }}></div>
                    <p className="text-gray-600 max-w-2xl mx-auto text-lg leading-relaxed">Got questions about business loans? We&apos;ve got answers.</p>
                </div>

                <div className="space-y-4">
                    {(showAllFaqs ? businessLoanFaqs : businessLoanFaqs.slice(0, 5)).map((faq, idx) => (
                        <div key={idx} className="border border-gray-100 rounded-2xl overflow-hidden transition-all duration-300 hover:border-primary/30 hover:shadow-md">
                            <button
                                onClick={() => toggleFAQ(idx)}
                                className="w-full px-4 sm:px-6 py-3 sm:py-4 text-left flex justify-between items-start gap-3 bg-gray-50 hover:bg-blue-50/50 transition-colors focus:outline-none cursor-pointer group"
                            >
                                <span className="font-bold text-gray-700 text-base sm:text-lg pr-2 group-hover:text-blue-600 transition-colors">{faq.question}</span>
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

                {businessLoanFaqs.length > 4 && (
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

export default BusinessLoanFAQ;
