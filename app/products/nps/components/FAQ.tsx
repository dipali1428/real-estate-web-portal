"use client";
import React, { useState } from 'react';
import { Plus, Minus } from 'lucide-react';

const npsFaqs = [
    {
        question: "Who can subscribe to NPS?",
        answer: "Any individual citizen of India (both resident and Non-resident) in the age group of 18-70 years (as on the date of submission of NPS application) can join NPS."
    },
    {
        question: "What are the tax benefits in NPS?",
        answer: "NPS offers tax benefits under Section 80CCD(1) within the overall ceiling of Rs. 1.5 lakh under Sec 80C. Additionally, an exclusive tax benefit for investment up to Rs. 50,000 is available u/s 80CCD(1B)."
    },
    {
        question: "Can I withdraw from NPS before 60?",
        answer: "Yes, partial withdrawal is allowed for specific purposes like higher education of children, marriage of children, purchase/construction of residential house, and treatment of critical illnesses, subject to certain conditions."
    },
    {
        question: "How is the annuity amount decided?",
        answer: "At the time of exit/retirement, at least 40% of the accumulated corpus must be utilized to purchase an annuity from an ASP. The remaining 60% can be withdrawn as a tax-free lump sum."
    },
    {
        question: "Is it mandatory to contribute every month?",
        answer: "No, there is no mandate for monthly contributions. However, a minimum contribution of Rs. 1,000 per financial year is required to keep the account active."
    },
    {
        question: "Can I have more than one NPS account?",
        answer: "No, an individual can have only one Permanent Retirement Account Number (PRAN). However, you can have one Tier I and one Tier II account under the same PRAN."
    },
    {
        question: "What is the difference between Tier I and Tier II accounts?",
        answer: "Tier I is a mandatory retirement account with tax benefits but restricted withdrawals. Tier II is a voluntary savings account with no tax benefits but allows unlimited withdrawals."
    },
    {
        question: "How can I track my NPS investments?",
        answer: "You can track your investments through the CRA website or mobile app, and you will receive a Statement of Transaction (SOT) annually."
    },
    {
        question: "Is there any minimum and maximum limit on investment?",
        answer: "The minimum initial contribution is ₹500 for Tier I. There is no maximum limit on the amount you can invest in NPS."
    }
];

const FAQ = () => {
    const [activeIndex, setActiveIndex] = useState<number | null>(null);
    const [showAllFaqs, setShowAllFaqs] = useState(false);

    const toggleFAQ = (index: number) => {
        setActiveIndex(activeIndex === index ? null : index);
    };

    return (
        <div className="bg-white font-sans overflow-hidden py-12 md:py-16">
            <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="text-center mb-12">
                    <h2 className="text-3xl md:text-4xl font-extrabold mb-3 bg-linear-to-r from-[#2076C7] to-[#1CADA3] bg-clip-text text-transparent drop-shadow-sm pb-1">
                        Frequently Asked Questions
                    </h2>
                    <p className="text-gray-600 max-w-2xl mx-auto text-lg leading-relaxed">
                        Have questions about National Pension System? We have answers.
                    </p>
                </div>

                <div className="space-y-4">
                    {(showAllFaqs ? npsFaqs : npsFaqs.slice(0, 5)).map((faq, idx) => (
                        <div key={idx} className="border border-gray-100 rounded-2xl overflow-hidden transition-all duration-300 hover:border-primary/30 hover:shadow-md">
                            <button
                                onClick={() => toggleFAQ(idx)}
                                className="w-full px-4 sm:px-6 py-4 sm:py-5 text-left flex justify-between items-start gap-4 bg-gray-50 hover:bg-blue-50/50 transition-colors focus:outline-none cursor-pointer group"
                            >
                                <span className="font-bold text-gray-700 text-base sm:text-lg pr-2 group-hover:text-blue-600 transition-colors">
                                    {faq.question}
                                </span>
                                <div className={`p-1.5 rounded-full bg-white border border-gray-300 text-gray-700 transition-transform duration-300 ${activeIndex === idx ? 'rotate-180' : ''}`}>
                                    {activeIndex === idx ? <Minus size={18} strokeWidth={3} /> : <Plus size={18} strokeWidth={3} />}
                                </div>
                            </button>

                            {activeIndex === idx && (
                                <div className="px-6 py-4 bg-white text-gray-600 text-base leading-relaxed border-t border-gray-100 animate-fadeIn">
                                    {faq.answer}
                                </div>
                            )}
                        </div>
                    ))}
                </div>

                {npsFaqs.length > 5 && (
                    <div className="text-center mt-10">
                        <button
                            onClick={() => setShowAllFaqs(!showAllFaqs)}
                            className="inline-flex items-center gap-2 px-8 py-3 rounded-full bg-blue-50 text-[#2076C7] font-semibold hover:bg-blue-100 transition-colors cursor-pointer"
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

export default FAQ;
