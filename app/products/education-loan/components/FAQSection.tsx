"use client";
import React, { useState } from 'react';
import { Plus, Minus } from 'lucide-react';

const educationLoanFaqs = [
    {
        question: "What is the maximum loan amount I can get for studying abroad?",
        answer: "You can get up to ₹1.5 Crore for overseas education. For studies in India, the limit is ₹75 Lakh through select NBFCs and banks. The final amount depends on course fees, institution, and co-applicant income."
    },
    {
        question: "Is collateral required for an education loan?",
        answer: "For loans up to ₹7.5 Lakh (domestic) and ₹40 Lakh (abroad), no collateral is required. For higher amounts, residential/commercial property, FD, LIC policy, or NSC are accepted as security."
    },
    {
        question: "When does EMI repayment start?",
        answer: "There is a moratorium period equal to your course duration + 6 months to 1 year. During this time, only simple interest may be payable (varies by lender). EMI repayment starts after the moratorium period."
    },
    {
        question: "Can I get a tax benefit on education loan interest?",
        answer: "Yes. Under Section 80E of the Income Tax Act, the entire interest paid on an education loan is deductible from taxable income for up to 8 consecutive years from the year repayment begins."
    },
    {
        question: "What types of courses are covered?",
        answer: "All UG, PG, diploma, professional, and skill development courses at recognized institutions are covered — including engineering, medicine, MBA, law, and arts. STEM courses abroad may qualify for higher loan amounts."
    },
    {
        question: "Does a low CIBIL score affect my education loan application?",
        answer: "Student's CIBIL score is not always considered since most students are first-time borrowers. The co-applicant's credit score (750+ preferred) plays a crucial role in determining approval and interest rate."
    },
    {
        question: "What expenses are covered under the education loan?",
        answer: "Tuition fees, hostel/accommodation, travel expenses, books/equipment, study tours, and laptop costs are all covered. Some lenders also cover health insurance premiums for the duration of the course."
    },
    {
        question: "How long does loan approval take?",
        answer: "With complete documentation, approval typically takes 5–7 working days. For pre-approved or fast-track cases, sanction letters can be issued within 24–48 hours to support visa applications."
    },
];

export default function FAQSection() {
    const [activeIndex, setActiveIndex] = useState<number | null>(null);
    const [showAllFaqs, setShowAllFaqs] = useState(false);

    const toggleFAQ = (index: number) => {
        setActiveIndex(activeIndex === index ? null : index);
    };

    return (
        <div className="bg-white font-sans">
            <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                <div className="text-center mb-8">
                    <h2 className="text-3xl md:text-4xl font-extrabold mb-3 bg-gradient-to-r from-[#2076C7] to-[#1CADA3] bg-clip-text text-transparent drop-shadow-sm">
                        Frequently Asked Questions
                    </h2>
                    <div className="w-24 h-1 mx-auto rounded-full mb-4" style={{ background: 'linear-gradient(to right, #2076C7, #1CADA3)' }}></div>
                    <p className="text-gray-600 max-w-2xl mx-auto text-sm leading-relaxed">
                        Everything you need to know about education loans — answered by our experts.
                    </p>
                </div>

                <div className="space-y-4">
                    {(showAllFaqs ? educationLoanFaqs : educationLoanFaqs.slice(0, 5)).map((faq, idx) => (
                        <div
                            key={idx}
                            className="border border-gray-100 rounded-2xl overflow-hidden transition-all duration-300 hover:border-blue-200 hover:shadow-md"
                        >
                            <button
                                onClick={() => toggleFAQ(idx)}
                                className="w-full px-4 sm:px-6 py-3 sm:py-4 text-left flex justify-between items-start gap-3 bg-gray-50 hover:bg-blue-50/50 transition-colors focus:outline-none cursor-pointer group"
                            >
                                <span className="font-bold text-gray-700 text-base sm:text-lg pr-2 group-hover:text-[#2076C7] transition-colors">
                                    {faq.question}
                                </span>
                                <div className={`p-1.5 rounded-full bg-white border border-gray-300 text-gray-700 transition-transform duration-300 shrink-0 ${activeIndex === idx ? 'rotate-180' : ''}`}>
                                    {activeIndex === idx
                                        ? <Minus size={18} strokeWidth={3} />
                                        : <Plus size={18} strokeWidth={3} />
                                    }
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

                {educationLoanFaqs.length > 5 && (
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
}
