"use client";
import React, { useState } from "react";
import { Plus, Minus } from "lucide-react";

const lifeInsuranceFaqs = [
    {
        question: "What is the best age to buy life insurance?",
        answer:
            "The best age to buy life insurance is as early as possible — ideally between 21-30. Premiums are significantly lower (up to 40% cheaper) when you're younger. For example, a 25-year-old can get ₹1 Crore cover for just ₹490/month, while the same cover at age 40 costs ₹1,800/month."
    },
    {
        question: "How much life insurance coverage do I need?",
        answer:
            "Industry experts recommend a minimum of ₹1 Crore sum assured. The general rule is 15-20 times your annual income. Factor in outstanding loans, child education (₹25-50L per child), spouse's income needs, and inflation. Use our calculator for a personalized recommendation."
    },
    {
        question: "What is Zero Cost Term Insurance?",
        answer:
            "Zero Cost Term Insurance (Return of Premium) gives you pure protection plus all your premiums back if you outlive the policy term. It's like having protection at zero net cost. Available from many of India's most trusted insurers on our platform."
    },
    {
        question: "What is the Secure Choice Benefit?",
        answer:
            "Secure Choice Benefit allows you to exit your policy after a specific period with a return of premiums paid. It combines the safety of term insurance with the flexibility to get your money back — a feature available in premium plans from top independent insurers."
    },
    {
        question: "Can NRIs buy life insurance from India?",
        answer:
            "Yes! NRIs can purchase life insurance policies from Indian insurers. They need to provide passport, visa, overseas address proof, and income proof. Many plans like term insurance, ULIPs, and endowment plans are available for NRIs through Infinity Arthvishva."
    },
    {
        question: "What is Personal Claim Support?",
        answer:
            "Every Infinity Arthvishva policyholder gets personal claim support — a dedicated relationship manager who handles everything for your family. From document collection at your doorstep to real-time updates, we ensure a smooth and stress-free settlement process."
    },
    {
        question: "What are the tax benefits of life insurance?",
        answer:
            "Life insurance offers triple tax benefits: (1) Section 80C — Deduction up to ₹1.5 Lakh on premiums paid. (2) Section 10(10D) — Tax-free maturity and death benefits. (3) Section 80CCC — Additional deductions for pension plans. Total tax savings can go up to ₹46,800 per year."
    },
    {
        question: "How long does claim settlement take?",
        answer:
            "With our DCAP program, eligible digital claims are settled promptly. Standard claims take 7-15 working days. Our partner insurers have an average claim settlement ratio of 99.6%, one of the highest in the industry. We provide real-time tracking for all claims."
    },
    {
        question: "Can I have multiple life insurance policies?",
        answer:
            "Yes, you can hold multiple policies from different insurers. Many smart investors use a combination — one term plan for pure protection (₹1 Crore), one ULIP for wealth creation, and one child plan for education funding. This diversified approach covers all financial goals."
    }
];

const LifeInsuranceFAQ = () => {
    const [activeIndex, setActiveIndex] = useState<number | null>(null);
    const [showAllFaqs, setShowAllFaqs] = useState(false);

    const toggleFAQ = (index: number) => {
        setActiveIndex(activeIndex === index ? null : index);
    };

    return (
        <div className="bg-white font-sans py-16 md:py-24">
            <div className="max-w-4xl mx-auto px-6 md:px-10">

                {/* Heading */}
                <div className="text-center mb-8">
                    <h2 className="text-3xl md:text-4xl font-extrabold mb-3 bg-linear-to-r from-[#2076C7] to-[#1CADA3] bg-clip-text text-transparent drop-shadow-sm">
                        Frequently Asked Questions
                    </h2>

                    <div
                        className="w-24 h-1 mx-auto rounded-full mb-4"
                        style={{ background: "linear-gradient(to right, #2076C7, #1CADA3)" }}
                    ></div>

                    <p className="text-gray-600 max-w-2xl mx-auto text-lg leading-relaxed">
                        Got questions about life insurance? We've got answers.
                    </p>
                </div>

                {/* FAQ List */}
                <div className="space-y-4">
                    {(showAllFaqs
                        ? lifeInsuranceFaqs
                        : lifeInsuranceFaqs.slice(0, 5)
                    ).map((faq, idx) => (
                        <div
                            key={idx}
                            className="border border-gray-100 rounded-2xl overflow-hidden transition-all duration-300 hover:border-primary/30 hover:shadow-md"
                        >
                            <button
                                onClick={() => toggleFAQ(idx)}
                                className="w-full px-4 sm:px-6 py-3 sm:py-4 text-left flex justify-between items-start gap-3 bg-gray-50 hover:bg-blue-50/50 transition-colors focus:outline-none cursor-pointer group"
                            >
                                <span className="font-sans font-black text-black text-base pr-8">
                                    {faq.question}
                                </span>

                                <div
                                    className={`p-1.5 rounded-full bg-white border border-gray-300 text-gray-700 transition-transform duration-300 ${activeIndex === idx ? "rotate-180" : ""
                                        }`}
                                >
                                    {activeIndex === idx ? (
                                        <Minus size={18} strokeWidth={3} />
                                    ) : (
                                        <Plus size={18} strokeWidth={3} />
                                    )}
                                </div>
                            </button>

                            {activeIndex === idx && (
                                <div className="font-sans px-6 pb-6 text-gray-500 text-sm leading-relaxed border-t border-slate-50 pt-4">
                                    {faq.answer}
                                </div>
                            )}
                        </div>
                    ))}
                </div>

                {/* View More */}
                {lifeInsuranceFaqs.length > 5 && (
                    <div className="text-center mt-8">
                        <button
                            onClick={() => setShowAllFaqs(!showAllFaqs)}
                            className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-blue-50 text-[#2076C7] font-semibold hover:bg-blue-100 transition-colors cursor-pointer"
                        >
                            {showAllFaqs ? "View Less" : "View More"}
                            <Plus
                                size={18}
                                className={`transition-transform duration-300 ${showAllFaqs ? "rotate-45" : ""
                                    }`}
                            />
                        </button>
                    </div>
                )}
            </div>
        </div>
    );
};

export default LifeInsuranceFAQ;