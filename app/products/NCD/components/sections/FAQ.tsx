"use client";
import React, { useState } from "react";
import { Plus, Minus, HelpCircle } from "lucide-react";

const ncdFaqs = [
    {
        question: "What is a Non-Convertible Debenture (NCD)?",
        answer: "An NCD is a fixed-income instrument issued by a company to raise capital from the public. Unlike convertible debentures, NCDs cannot be converted into equity shares at maturity. In return, they offer higher interest rates compared to FD and bonds."
    },
    {
        question: "What is the minimum investment required for NCDs?",
        answer: "Generally, the minimum investment is ₹10,000 (usually 10 units of ₹1,000 each). This makes NCDs accessible for retail investors seeking higher fixed income."
    },
    {
        question: "Is TDS deducted on NCD interest?",
        answer: "Yes, TDS @ 10% is deducted if the interest exceeds ₹5,000 in a financial year. However, if the NCDs are held in Demat form and listed on local stock exchanges, usually no TDS is deducted at source."
    },
    {
        question: "How safe are NCDs?",
        answer: "The safety depends on the credit rating and security. 'Secured' NCDs are backed by company assets. Always check for ratings like 'AAA' or 'AA+' from agencies like CRISIL, ICRA, or CARE before investing."
    },
    {
        question: "Can I sell my NCD before maturity?",
        answer: "Yes, you can sell listed NCDs on the stock exchange (NSE/BSE) through your Demat account, similar to trading stocks. However, the price you get will depend on the market demand and prevailing interest rates."
    },
    {
        question: "How is interest calculated in NCDs?",
        answer: "Interest is calculated on the face value of the NCD. You can choose different payout options like monthly, quarterly, semi-annually, or annually, depending on the issuer's terms."
    },
    {
        question: "What are the documents required for NCD investment?",
        answer: "Typically, you need a PAN card, Address proof (Aadhar/Voter ID), and a Demat account. The process is usually 100% digital on our platform."
    },
    {
        question: "Difference between Secured and Unsecured NCDs?",
        answer: "Secured NCDs are backed by the issuer's assets, meaning if the company defaults, assets can be liquidated to pay investors. Unsecured NCDs are not backed by assets and carry higher risk, but usually offer higher interest."
    }
];

const FAQ = () => {
    const [activeIndex, setActiveIndex] = useState<number | null>(null);
    const [showAllFaqs, setShowAllFaqs] = useState(false);

    const toggleFAQ = (index: number) => {
        setActiveIndex(activeIndex === index ? null : index);
    };

    const displayedFaqs = showAllFaqs ? ncdFaqs : ncdFaqs.slice(0, 5);

    return (
        <section className="py-12 md:py-16 bg-[#F8FBFE] font-sans px-4 sm:px-6 lg:px-8" id="faq">
            <div className="max-w-4xl mx-auto">

                {/* Heading */}
                <div className="text-center mb-12">
                    <h2 className="text-3xl md:text-5xl font-black mb-6 bg-linear-to-r from-[#2076C7] to-[#1CADA3] bg-clip-text text-transparent font-sans">
                        Frequently Asked Questions
                    </h2>

                    <p className="text-gray-600 max-w-2xl mx-auto text-lg font-medium leading-relaxed">
                        Everything you need to know about NCDs and secure fixed-income investments.
                    </p>
                </div>

                {/* FAQ List */}
                <div className="space-y-4">
                    {displayedFaqs.length > 0 ? (
                        displayedFaqs.map((faq, idx) => (
                            <div
                                key={idx}
                                className={`border rounded-3xl overflow-hidden transition-all duration-300 ${activeIndex === idx ? "border-[#2076C7] shadow-xl shadow-blue-500/10 bg-white" : "border-gray-100 bg-white hover:border-[#2076C7]/30 hover:shadow-md"
                                    }`}
                            >
                                <button
                                    onClick={() => toggleFAQ(idx)}
                                    className="w-full px-6 py-5 text-left flex justify-between items-center gap-4 group"
                                >
                                    <span className={`font-black text-lg transition-colors duration-300 ${activeIndex === idx ? "text-[#2076C7]" : "text-slate-800"}`}>
                                        {faq.question}
                                    </span>

                                    <div
                                        className={`p-2 rounded-full transition-all duration-300 ${activeIndex === idx ? "bg-[#2076C7] text-white rotate-180 shadow-lg shadow-blue-500/30" : "bg-slate-50 text-slate-400 group-hover:bg-[#1CADA3] group-hover:text-white"
                                            }`}
                                    >
                                        {activeIndex === idx ? (
                                            <Minus size={20} strokeWidth={3} />
                                        ) : (
                                            <Plus size={20} strokeWidth={3} />
                                        )}
                                    </div>
                                </button>

                                {activeIndex === idx && (
                                    <div className="px-6 pb-6 pt-2 bg-white text-slate-500 text-lg font-medium leading-relaxed border-t border-slate-50 animate-in slide-in-from-top-2 duration-300">
                                        {faq.answer}
                                    </div>
                                )}
                            </div>
                        ))
                    ) : (
                        <div className="text-center py-12 bg-white rounded-[2rem] border-2 border-dashed border-slate-200">
                            <HelpCircle className="w-12 h-12 text-slate-300 mx-auto mb-4" />
                            <p className="text-slate-500 font-bold">No questions found matching your search.</p>
                        </div>
                    )}
                </div>

                {/* View More Button */}
                {ncdFaqs.length > 5 && (
                    <div className="text-center mt-10">
                        <button
                            onClick={() => setShowAllFaqs(!showAllFaqs)}
                            className="inline-flex items-center gap-2 px-8 py-3 rounded-full bg-white text-[#2076C7] font-black shadow-md border border-slate-100 hover:shadow-lg transition-all"
                        >
                            {showAllFaqs ? "View Less" : "View All Questions"}
                            <Plus
                                size={18}
                                className={`transition-transform duration-300 ${showAllFaqs ? "rotate-45" : ""
                                    }`}
                            />
                        </button>
                    </div>
                )}
            </div>
        </section>
    );
};

export default FAQ;