"use client";
import React, { useState } from "react";
import { Plus, Minus } from "lucide-react";

const personalLoanFaqs = [
    {
        question: "What is the maximum loan amount I can avail?",
        answer:
            "You can avail a personal loan up to ₹50 Lakhs, depending on your eligibility, monthly income, and existing credit commitments."
    },
    {
        question: "How long does the approval process take?",
        answer:
            "Our digital-first approach allows for instant in-principle approval. Once all documents are verified, the amount is usually disbursed within 24-48 hours."
    },
    {
        question: "Do I need to provide any collateral or security?",
        answer:
            "No, personal loans are unsecured loans, meaning you don't need to provide any collateral, gold, or property as security."
    },
    {
        question: "What are the interest rates offered?",
        answer:
            "Interest rates start from as low as 10.5% p.a. and vary based on your credit score, employer category, and loan tenure."
    },
    {
        question: "Can I prepay or foreclose my loan?",
        answer:
            "Yes, you can prepay or foreclose your loan after a minimum lock-in period (usually 6-12 months). Applicable foreclosure charges may apply as per bank norms."
    },
    {
        question: "Can I get a loan if I am self-employed?",
        answer:
            "Yes, self-employed professionals and business owners can apply for personal loans, provided they meet the income and business vintage requirements."
    },
    {
        question: "Is there a processing fee for the loan?",
        answer:
            "Yes, banks usually charge a processing fee ranging from 1% to 3% of the loan amount. This is often deducted from the disbursed amount."
    },
    {
        question: "What is the minimum monthly income required?",
        answer:
            "The minimum net monthly income requirement typically starts from ₹15,000, though it may be higher depending on the lender and your city of residence."
    },
    {
        question: "Can I apply for a personal loan with a low CIBIL score?",
        answer:
            "While a score of 700+ is ideal, some lenders offer loans to those with lower scores at slightly higher interest rates or with a co-applicant."
    },
    {
        question: "What can I use a personal loan for?",
        answer:
            "Personal loans are multi-purpose. You can use them for weddings, travel, medical emergencies, home renovation, or debt consolidation."
    },
    {
        question: "Does checking my eligibility impact my credit score?",
        answer:
            "A soft inquiry for checking eligibility typically doesn't affect your score. However, a formal loan application results in a hard inquiry, which may have a minor impact."
    },
    {
        question: "What is the minimum and maximum tenure for repayment?",
        answer:
            "Repayment tenures are flexible, usually ranging from 12 months (1 year) up to 84 months (7 years)."
    },
    {
        question: "Are there any hidden charges?",
        answer:
            "We maintain complete transparency. All charges, including processing fees, documentation charges, and foreclosure fees, are disclosed upfront in the loan agreement."
    },
    {
        question: "Can I get a top-up on my existing personal loan?",
        answer:
            "Yes, if you have a good repayment track record on your existing loan, many lenders offer top-up loans with minimal documentation."
    },
    {
        question: "How is the EMI calculated?",
        answer:
            "EMIs are calculated based on the principal amount, interest rate, and tenure using the reducing balance method. You can use our EMI calculator to see your exact breakdown."
    }
];

const PersonalLoanFAQ = () => {
    const [activeIndex, setActiveIndex] = useState<number | null>(null);
    const [showAllFaqs, setShowAllFaqs] = useState(false);

    const toggleFAQ = (index: number) => {
        setActiveIndex(activeIndex === index ? null : index);
    };

    return (
        <div className="bg-white font-sans" style={{ fontFamily: 'var(--font-geist-sans)' }}>
            <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">

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
                        Got questions about personal loans? We&apos;ve got answers.
                    </p>
                </div>

                {/* FAQ Cards */}
                <div className="space-y-4">
                    {(showAllFaqs
                        ? personalLoanFaqs
                        : personalLoanFaqs.slice(0, 5)
                    ).map((faq, idx) => (
                        <div
                            key={idx}
                            className="border border-gray-100 rounded-2xl overflow-hidden transition-all duration-300 hover:border-primary/30 hover:shadow-md"
                        >
                            <button
                                onClick={() => toggleFAQ(idx)}
                                className="w-full px-4 sm:px-6 py-3 sm:py-4 text-left flex justify-between items-start gap-3 bg-gray-50 hover:bg-blue-50/50 transition-colors focus:outline-none cursor-pointer group"
                            >
                                <span className="font-bold text-gray-700 text-base sm:text-lg pr-2 group-hover:text-blue-600 transition-colors">
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
                                <div className="px-6 py-3 bg-white text-gray-600 text-base leading-relaxed border-t border-gray-100 animate-fadeIn">
                                    {faq.answer}
                                </div>
                            )}
                        </div>
                    ))}
                </div>

                {/* View More */}
                {personalLoanFaqs.length > 4 && (
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

export default PersonalLoanFAQ;