"use client";

import React, { useState } from 'react';
import { motion } from "framer-motion";
import { Plus, Minus } from 'lucide-react';
import { faqs } from '../data/mockData';

const FAQ = () => {
    const [activeIndex, setActiveIndex] = useState<number | null>(null);
    const [showAllFaqs, setShowAllFaqs] = useState(false);

    const toggleFAQ = (index: number) => {
        setActiveIndex(activeIndex === index ? null : index);
    };

    return (
        <div className="py-20 bg-white font-sans">
            <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="text-center max-w-3xl mx-auto mb-12 md:mb-16">
                    <h2 className="text-3xl md:text-4xl font-extrabold mb-3 bg-linear-to-r from-[#2076C7] to-[#1CADA3] bg-clip-text text-transparent drop-shadow-sm">
                        Frequently Asked Questions
                    </h2>
                    <div className="w-24 h-1 mx-auto rounded-full mb-4" style={{ background: 'linear-gradient(to right, #2076C7, #1CADA3)' }}></div>
                    <p className="text-gray-600 max-w-2xl mx-auto text-lg leading-relaxed">
                        Got questions about Fixed Deposits? We&apos;ve got you covered.
                    </p>
                </div>

                <div className="space-y-4">
                    {(showAllFaqs ? faqs : faqs.slice(0, 5)).map((faq: any, idx: number) => (
                        <div key={idx} className="border border-gray-100 rounded-2xl overflow-hidden transition-all duration-300 hover:border-[#2076C7]/30 hover:shadow-md">
                            <button
                                onClick={() => toggleFAQ(idx)}
                                className="w-full px-4 sm:px-6 py-3 sm:py-4 text-center md:text-left flex flex-col md:flex-row justify-between items-center md:items-start md:gap-3 bg-gray-50 hover:bg-blue-50/50 transition-colors focus:outline-none cursor-pointer group"
                            >
                                <span className="font-bold text-gray-700 text-base sm:text-lg pr-2 group-hover:text-blue-600 transition-colors">{faq.question}</span>
                                <div className={`p-1.5 rounded-full bg-white border border-gray-300 text-gray-700 transition-transform duration-300 ${activeIndex === idx ? 'rotate-180' : ''}`}>
                                    {activeIndex === idx ? <Minus size={18} strokeWidth={3} /> : <Plus size={18} strokeWidth={3} />}
                                </div>
                            </button>
 
                            {activeIndex === idx && (
                                <motion.div
                                    initial={{ opacity: 0, height: 0 }}
                                    animate={{ opacity: 1, height: "auto" }}
                                    className="px-6 py-4 bg-white text-gray-600 text-base leading-relaxed border-t border-gray-100 animate-fadeIn"
                                >
                                    {faq.answer}
                                </motion.div>
                            )}
                        </div>
                    ))}
                </div>

                {faqs.length > 5 && (
                    <div className="text-center mt-12">
                        <button
                            onClick={() => setShowAllFaqs(!showAllFaqs)}
                            className="inline-flex items-center gap-2 px-8 py-3 rounded-full bg-blue-50 text-[#2076C7] font-bold hover:bg-blue-100 transition-all duration-300 cursor-pointer shadow-sm hover:shadow-md"
                        >
                            {showAllFaqs ? 'View Less' : 'View More'}
                            <Plus size={20} className={`transition-transform duration-500 ${showAllFaqs ? 'rotate-45' : ''}`} />
                        </button>
                    </div>
                )}
            </div>
        </div>
    );
};

export default FAQ;
