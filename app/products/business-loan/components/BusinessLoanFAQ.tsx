"use client";

import React, { useState } from 'react';
import { motion } from "framer-motion";
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
    }
];

const BusinessLoanFAQ = () => {
    const [activeIndex, setActiveIndex] = useState<number | null>(null);

    const toggleFAQ = (index: number) => {
        setActiveIndex(activeIndex === index ? null : index);
    };

    return (
        <div className="py-20 bg-white">
            <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="text-center mb-12">
                    <h2 className="text-3xl md:text-4xl font-extrabold mb-3 bg-clip-text text-transparent drop-shadow-sm" style={{ background: 'linear-gradient(to right, #2076C7, #1CADA3)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>Frequently Asked Questions</h2>
                    <div className="w-24 h-1 mx-auto rounded-full mb-4" style={{ background: 'linear-gradient(to right, #2076C7, #1CADA3)' }}></div>
                    <p className="text-gray-600">Got questions about business loans? We've got answers.</p>
                </div>

                <div className="space-y-4">
                    {businessLoanFaqs.map((faq, idx) => (
                        <div key={idx} className="border border-gray-200 rounded-2xl overflow-hidden transition-all duration-300 hover:border-primary/30 hover:shadow-md">
                            <button
                                onClick={() => toggleFAQ(idx)}
                                className="w-full px-4 sm:px-6 py-4 sm:py-5 text-left flex justify-between items-start gap-3 bg-gray-50 hover:bg-gray-100 transition-colors focus:outline-none cursor-pointer"
                            >
                                <span className="font-bold text-gray-800 text-base sm:text-lg pr-2">{faq.question}</span>
                                <div className={`p-1 rounded-full bg-white border border-gray-200 text-primary transition-transform duration-300 ${activeIndex === idx ? 'rotate-180' : ''}`}>
                                    {activeIndex === idx ? <Minus size={20} /> : <Plus size={20} />}
                                </div>
                            </button>

                            {activeIndex === idx && (
                                <div className="px-6 py-5 bg-white text-gray-600 text-base leading-relaxed border-t border-gray-100 animate-fadeIn">
                                    {faq.answer}
                                </div>
                            )}
                        </div>
                    ))}
                </div>
            </div>

            <section className="mt-12 py-12 bg-[#00A88E] relative overflow-hidden">
                {/* Background Decorative Elements */}
                <div className="absolute top-0 left-0 w-full h-full opacity-10 pointer-events-none">
                    <div className="absolute -top-24 -left-24 w-96 h-96 bg-white rounded-full blur-3xl" />
                    <div className="absolute -bottom-24 -right-24 w-96 h-96 bg-white rounded-full blur-3xl" />
                </div>

                <div className="container mx-auto px-4 md:px-6 text-center relative z-10">
                    <motion.div
                        initial={{ opacity: 0, scale: 0.95 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        viewport={{ once: true }}
                        className="max-w-4xl mx-auto"
                    >
                        <h2 className="text-3xl md:text-4xl font-extrabold text-white mb-4 leading-tight">
                            Fuel Your Enterprise Growth Today
                        </h2>
                        <p className="text-white/90 text-base md:text-lg mb-8 max-w-2xl mx-auto font-medium leading-relaxed">
                            Scale your operations, manage working capital, and take your business to the next level with our tailor-made financing solutions. Fast approvals, minimal paperwork.
                        </p>
                        <motion.button
                            whileHover={{ scale: 1.05, boxShadow: "0 20px 25px -5px rgb(0 0 0 / 0.1)" }}
                            whileTap={{ scale: 0.95 }}
                            onClick={() => {
                                const formElement = document.getElementById('apply-now-form');
                                if (formElement) formElement.scrollIntoView({ behavior: 'smooth' });
                            }}
                            className="px-10 py-3.5 bg-white text-[#00A88E] rounded-full font-bold text-base hover:bg-gray-50 transition-all shadow-lg"
                        >
                            Request a Callback
                        </motion.button>
                    </motion.div>
                </div>
            </section>
        </div>
    );
};

export default BusinessLoanFAQ;
