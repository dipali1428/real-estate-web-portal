"use client";
import React, { useState } from 'react';
import { Plus, Minus } from 'lucide-react';

const pmsFaqs = [
    { 
        question: "What is Portfolio Management Services (PMS)?", 
        answer: "Portfolio Management Service (PMS) is a professional service where skilled portfolio managers and stock market experts manage your equity portfolio with the assistance of a research team. It offers a more customized and focused investment approach compared to mutual funds, specifically designed for high-net-worth individuals." 
    },
    { 
        question: "Who is eligible to invest in PMS?", 
        answer: "As per SEBI guidelines, any Indian resident, NRI, HUF, or corporate entity can invest in PMS. The statutory minimum investment amount required to start a PMS account is ₹50 lakhs, which can be in the form of cash or an existing portfolio of securities." 
    },
    { 
        question: "How does PMS differ from Mutual Funds?", 
        answer: "In a Mutual Fund, you own units of a pooled fund, whereas in a PMS, you directly own the underlying stocks in your own demat account. PMS offers greater customization, higher portfolio concentration, and direct coordination with the fund management team for alpha generation." 
    },
    { 
        question: "What is the tax treatment for PMS investments?", 
        answer: "Taxation is based on short-term and long-term capital gains, just like direct equity. We provide consolidated tax statements annually to make filing seamless for you." 
    },
    { 
        question: "How does the non-discretionary model work?", 
        answer: "In this model, our managers provide research-backed recommendations, but we only execute trades after receiving your explicit approval for each transaction." 
    },
    { 
        question: "Is my capital safe in a PMS?", 
        answer: "Yes, your investments are held in your name in a separate demat account with SEBI-regulated custodians like HDFC Bank or ICICI Bank. The portfolio manager only has limited power of attorney to execute trades on your behalf; the ownership remains entirely with you." 
    },
    { 
        question: "What is the onboarding process for a new PMS investor?", 
        answer: "The process is streamlined: 1. Strategy selection based on risk profile, 2. Documentation and KYC verification, 3. Account opening with the custodian & broker, and 4. Capital transfer or stock migration. Most investors are fully onboarded within 7-10 working days." 
    },
    { 
        question: "Are there any lock-in periods for PMS?", 
        answer: "While there is no legal lock-in, we recommend a 3-5 year horizon. Most strategies have a marginal exit load (typically 1%) if redeemed within the first year." 
    }
];

const PMSFAQ = () => {
    const [activeIndex, setActiveIndex] = useState<number | null>(null);
    const [showAllFaqs, setShowAllFaqs] = useState(false);

    const toggleFAQ = (index: number) => {
        setActiveIndex(activeIndex === index ? null : index);
    };

    return (
        <div className="bg-white font-sans">
            <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                <div className="text-center mb-8">
                    <h2 className="text-3xl md:text-4xl font-extrabold mb-3 bg-linear-to-r from-[#2076C7] to-[#1CADA3] bg-clip-text text-transparent drop-shadow-sm">Frequently Asked Questions</h2>
                    <div className="w-24 h-1 mx-auto rounded-full mb-4" style={{ background: 'linear-gradient(to right, #2076C7, #1CADA3)' }}></div>
                    <p className="text-gray-600 max-w-2xl mx-auto text-lg leading-relaxed">Common questions about starting your PMS journey.</p>
                </div>

                <div className="space-y-4">
                    {(showAllFaqs ? pmsFaqs : pmsFaqs.slice(0, 5)).map((faq, idx) => (
                        <div key={idx} className="border border-gray-100 rounded-2xl overflow-hidden transition-all duration-300 hover:border-[#2076C7]/30 hover:shadow-md">
                            <button
                                onClick={() => toggleFAQ(idx)}
                                className="w-full px-4 sm:px-6 py-3 sm:py-4 text-left flex justify-between items-start gap-3 bg-gray-50 hover:bg-[#2076C7]/5 transition-colors focus:outline-none cursor-pointer group"
                            >
                                <span className="font-bold text-gray-700 text-base sm:text-lg pr-2 group-hover:text-[#2076C7] transition-colors">{faq.question}</span>
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

                {pmsFaqs.length > 5 && (
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

export default PMSFAQ;
