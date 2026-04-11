"use client";
import React, { useState } from "react";
import { Plus, Minus } from "lucide-react";

const bondsFaqs = [
    {
        question: "What are Bonds?",
        answer:
            "Bonds are fixed-income investment instruments where you lend money to a government or company for a specific period. In return, the issuer pays regular interest (called coupon) and returns the principal amount at maturity."
    },
    {
        question: "How do bonds work?",
        answer:
            "When you buy a bond, you are essentially lending money to the issuer. The issuer pays periodic interest to the investor and returns the original investment amount once the bond reaches its maturity date."
    },
    {
        question: "What types of bonds are available in India?",
        answer:
            "Common types include Government Bonds (G-Secs), Corporate Bonds, Tax-Free Bonds, Infrastructure Bonds, Green Bonds, and Floating Rate Bonds."
    },
    {
        question: "What is the minimum investment required for bonds?",
        answer:
            "Many bonds can be purchased with a minimum investment starting from ₹10,000, although some corporate or government bonds may have different investment limits."
    },
    {
        question: "Are bonds safer than stocks?",
        answer:
            "Generally, bonds are considered safer than stocks because they provide fixed interest payments and return of principal at maturity. However, risk depends on the creditworthiness of the issuer."
    },
    {
        question: "What is a bond's maturity period?",
        answer:
            "Maturity refers to the time period after which the issuer repays the principal amount to investors. Bond maturities can range from a few months to 30 years or more."
    },
    {
        question: "What is the coupon rate in bonds?",
        answer:
            "The coupon rate is the fixed interest rate that a bond issuer pays to investors. It is usually expressed as a percentage of the bond's face value and paid annually or semi-annually."
    },
    {
        question: "Can bonds be sold before maturity?",
        answer:
            "Yes, many bonds are listed on stock exchanges and can be sold in the secondary market before maturity. The selling price may be higher or lower depending on market conditions."
    },
    {
        question: "How are bonds different from fixed deposits?",
        answer:
            "Both provide fixed income, but bonds can be traded in the market and may offer higher returns. Fixed deposits are issued by banks and generally cannot be traded before maturity."
    },
    {
        question: "What factors should I check before investing in bonds?",
        answer:
            "Before investing, check the issuer's credit rating, interest rate (coupon), maturity period, liquidity, and risk profile of the bond."
    }
];

const BondsFAQ = () => {
    const [activeIndex, setActiveIndex] = useState<number | null>(null);
    const [showAllFaqs, setShowAllFaqs] = useState(false);

    const toggleFAQ = (index: number) => {
        setActiveIndex(activeIndex === index ? null : index);
    };

    return (
        <div className="bg-white font-sans">
            <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">

                {/* Heading */}
                <div className="text-center mb-16 px-4 md:px-0">
                    <h2 className="text-3xl md:text-4xl font-extrabold mb-3 bg-linear-to-r from-[#2076C7] to-[#1CADA3] bg-clip-text text-transparent drop-shadow-sm">
                        Frequently Asked Questions
                    </h2>
                    <p className="text-slate-500 max-w-2xl mx-auto text-base md:text-lg mt-6 font-medium leading-relaxed px-4 md:px-0">
                        Got questions about bond investments? We&apos;ve got answers. Everything you need to know about Corporate and State Guaranteed Bonds.
                    </p>
                </div>

                {/* FAQ List */}
                <div className="space-y-4">
                    {(showAllFaqs ? bondsFaqs : bondsFaqs.slice(0, 5)).map((faq, idx) => (
                        <div
                            key={idx}
                            className="border border-gray-100 rounded-2xl overflow-hidden transition-all duration-300 hover:border-primary/30 hover:shadow-md">
                            <button
                                onClick={() => toggleFAQ(idx)}
                                suppressHydrationWarning={true}
                                className="w-full px-4 sm:px-6 py-3 sm:py-4 text-left flex justify-between items-start gap-3 bg-gray-50 hover:bg-blue-50/50 transition-colors">
                                <span className="font-bold text-gray-700 text-sm sm:text-lg pr-2 hover:text-blue-600 transition-colors">
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
                                <div className="px-6 py-3 bg-white text-gray-600 text-base leading-relaxed border-t border-gray-100">
                                    {faq.answer}
                                </div>
                            )}
                        </div>
                    ))}
                </div>

                {/* View More Button */}
                {bondsFaqs.length > 5 && (
                    <div className="text-center mt-8">
                        <button
                            onClick={() => setShowAllFaqs(!showAllFaqs)}
                            suppressHydrationWarning={true}
                            className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-blue-50 text-[#2076C7] font-semibold hover:bg-blue-100 transition-colors"
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

export default BondsFAQ;