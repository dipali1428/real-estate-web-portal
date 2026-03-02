"use client";

import { useState } from "react";
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
];

export default function FAQ() {
    const [openIndex, setOpenIndex] = useState<number | null>(0);

    return (
        <section id="faq" className="py-10 bg-gray-50">
            <div className="container mx-auto px-4 md:px-6 max-w-4xl">
                <div className="text-center mb-16">
                    <h2 className="text-3xl md:text-4xl font-bold mb-4 bg-linear-to-r from-[#2076C7] via-[#1CADA3] to-[#2076C7] text-transparent bg-clip-text inline-block">
                        Frequently Asked Questions
                    </h2>
                    <p className="text-gray-600">
                        Have queries? We have answers.
                    </p>
                </div>

                <div className="space-y-4">
                    {faqs.map((faq, index) => (
                        <div
                            key={index}
                            className="bg-white rounded-xl border border-gray-200 overflow-hidden transition-all duration-300 hover:shadow-md"
                        >
                            <button
                                onClick={() => setOpenIndex(openIndex === index ? null : index)}
                                className="w-full flex items-center justify-between p-6 text-left font-medium text-gray-800 hover:bg-gray-50 transition-colors focus:outline-none cursor-pointer"
                            >
                                <span className="text-lg">{faq.question}</span>
                                {openIndex === index ? (
                                    <Minus className="text-[#1CADA3] shrink-0" />
                                ) : (
                                    <Plus className="text-gray-400 shrink-0" />
                                )}
                            </button>
                            <div
                                className={`transition-all duration-300 ease-in-out ${openIndex === index ? "max-h-40 opacity-100" : "max-h-0 opacity-0"
                                    }`}
                            >
                                <p className="px-6 pb-6 text-gray-600 leading-relaxed">
                                    {faq.answer}
                                </p>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}
