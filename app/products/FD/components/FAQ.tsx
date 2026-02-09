"use client";

import React, { useState } from 'react';
import { Plus, Minus } from 'lucide-react';
import { faqs } from '../data/mockData';

const FAQ = () => {
    const [activeIndex, setActiveIndex] = useState<number | null>(null);

    const toggleFAQ = (index: number) => {
        setActiveIndex(activeIndex === index ? null : index);
    };

    return (
        <div className="py-16 bg-white">
            <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="text-center mb-12">
                    <h2 className="text-3xl md:text-4xl font-extrabold mb-3 bg-clip-text text-transparent drop-shadow-sm" style={{ background: 'linear-gradient(to right, #2076C7, #1CADA3)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>Frequently Asked Questions</h2>
                    <div className="w-24 h-1 mx-auto rounded-full mb-4" style={{ background: 'linear-gradient(to right, #2076C7, #1CADA3)' }}></div>
                </div>

                <div className="space-y-4">
                    {faqs.map((faq: any, idx: number) => (
                        <div key={idx} className="border border-gray-200 rounded-lg overflow-hidden">
                            <button
                                onClick={() => toggleFAQ(idx)}
                                className="w-full px-6 py-4 text-left flex justify-between items-center bg-gray-50 hover:bg-gray-100 transition-colors focus:outline-none cursor-pointer"
                            >
                                <span className="font-semibold text-gray-800">{faq.question}</span>
                                {activeIndex === idx ? <Minus size={20} className="text-primary" /> : <Plus size={20} className="text-primary" />}
                            </button>

                            {activeIndex === idx && (
                                <div className="px-6 py-4 bg-white text-gray-600 leading-relaxed border-t border-gray-100 animate-fadeIn">
                                    {faq.answer}
                                </div>
                            )}
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default FAQ;
