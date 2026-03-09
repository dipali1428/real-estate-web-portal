"use client";

import React, { useState } from 'react';
import { Plus, Minus } from "lucide-react";

const faqs = [
    {
        question: "What does a comprehensive motor insurance policy cover?",
        answer: "A comprehensive policy covers damages to your own vehicle due to accidents, theft, fire, and natural calamities, along with third-party liability coverage.",
    },
    {
        question: "Is motor insurance mandatory in India?",
        answer: "Yes, holding at least a valid Third-Party Liability policy is mandatory for all vehicles plying on Indian roads as per the Motor Vehicles Act, 1988.",
    },
    {
        question: "How is the premium calculated?",
        answer: "Premiums are based on the Insured Declared Value (IDV) of the vehicle, engine capacity, vehicle age, location of registration, and the type of coverage chosen.",
    },
    {
        question: "What is No Claim Bonus (NCB)?",
        answer: "NCB is a discount given by the insurer for every claim-free year. It can go up to 50% and helps reduce your premium during renewal.",
    },
    {
        question: "How can I make a claim?",
        answer: "You can initiate a claim via our mobile app or website. Upload photos of the damage, and our team will guide you through the process for quick settlement.",
    },
    {
        question: "Can I transfer my motor insurance to a new owner?",
        answer: "Yes, when you sell your vehicle, you can transfer your insurance policy to the new owner. Alternatively, you can retain your No Claim Bonus (NCB) and apply it to a new vehicle's policy.",
    },
    {
        question: "Is personal accident cover part of standard policy?",
        answer: "A Personal Accident (PA) cover of ₹15 Lakhs for the owner-driver is compulsory in India. It is usually included in a comprehensive policy but needs to be added independently in a standalone third-party cover.",
    },
    {
        question: "What is an Add-on or Rider?",
        answer: "Add-ons are optional extra coverage features like Zero Depreciation, Engine Protect, or Roadside Assistance that you can purchase along with your comprehensive policy for an increased premium.",
    },
];

export default function FAQ() {
    const [activeIndex, setActiveIndex] = useState<number | null>(null);
    const [showAllFaqs, setShowAllFaqs] = useState(false);

    const toggleFAQ = (index: number) => {
        setActiveIndex(activeIndex === index ? null : index);
    };

    return (
        <section id="faq" className="bg-white font-sans">
            <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
                <div className="text-center mb-6">
                    <h2 className="text-3xl md:text-4xl font-extrabold mb-3 bg-linear-to-r from-[#2076C7] to-[#1CADA3] bg-clip-text text-transparent drop-shadow-sm">Frequently Asked Questions</h2>
                    <div className="w-24 h-1 mx-auto rounded-full mb-4" style={{ background: 'linear-gradient(to right, #2076C7, #1CADA3)' }}></div>
                    <p className="text-gray-600 max-w-2xl mx-auto text-lg leading-relaxed">Have queries? We have answers.</p>
                </div>

                <div className="space-y-4">
                    {(showAllFaqs ? faqs : faqs.slice(0, 5)).map((faq, idx) => (
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

                {faqs.length > 5 && (
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
        </section>
    );
}
