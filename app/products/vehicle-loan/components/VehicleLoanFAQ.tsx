"use client";

import React, { useState } from 'react';
import { motion } from "framer-motion";
import { Plus, Minus } from 'lucide-react';

const vehicleLoanFaqs = [
    {
        question: "What is the maximum vehicle loan amount I can get?",
        answer: "We offer up to 100% financing on the on-road price of the vehicle. The exact loan amount depends on the vehicle's cost, your income, credit score, and existing financial obligations."
    },
    {
        question: "Can I get a loan for a used or pre-owned vehicle?",
        answer: "Yes, we provide financing options for used and pre-owned vehicles. The loan amount and interest rate may vary slightly compared to new vehicle loans, and the vehicle's age is taken into consideration."
    },
    {
        question: "How long does it take for a vehicle loan to be approved?",
        answer: "With our streamlined digital process, if all your documents are in order and you meet the eligibility criteria, approval can happen in as little as 24-48 hours. Pre-approved customers can receive instant approvals."
    },
    {
        question: "Is it mandatory to have a guarantor for a vehicle loan?",
        answer: "No, a guarantor is not usually mandatory. However, if your income does not meet the criteria or your credit score is low, a guarantor with a good credit history might be required."
    },
    {
        question: "Can I prepay my vehicle loan before the tenure ends?",
        answer: "Yes, you can prepay or foreclose your vehicle loan. There might be a minimum lock-in period (typically 6 months to 1 year), after which you can prepay. Standard foreclosure charges may apply as per the loan agreement."
    },
    {
        question: "What happens if I miss an EMI payment?",
        answer: "Missing an EMI payment will incur penal interest and late payment fees. It will also negatively impact your credit score (CIBIL). Consistent defaults may lead to vehicle repossession."
    }
];

const VehicleLoanFAQ = () => {
    const [activeIndex, setActiveIndex] = useState<number | null>(null);

    const toggleFAQ = (index: number) => {
        setActiveIndex(activeIndex === index ? null : index);
    };

    return (
        <div className="py-20 bg-white">
            <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="text-center mb-12">
                    <h2 className="text-3xl md:text-4xl font-extrabold mb-3 bg-clip-text text-transparent drop-shadow-sm transition-all" style={{ background: 'linear-gradient(to right, #2076C7, #1CADA3)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>Frequently Asked Questions</h2>
                    <div className="w-24 h-1 mx-auto rounded-full mb-4" style={{ background: 'linear-gradient(to right, #2076C7, #1CADA3)' }}></div>
                    <p className="text-gray-600">Got questions about vehicle financing? We've got answers.</p>
                </div>

                <div className="space-y-4">
                    {vehicleLoanFaqs.map((faq, idx) => (
                        <div key={idx} className="border border-gray-200 rounded-2xl overflow-hidden transition-all duration-300 hover:border-[#1CADA3]/30 hover:shadow-md">
                            <button
                                onClick={() => toggleFAQ(idx)}
                                className="w-full px-4 sm:px-6 py-4 sm:py-5 text-left flex justify-between items-start gap-3 bg-gray-50 hover:bg-gray-100 transition-colors focus:outline-none cursor-pointer"
                            >
                                <span className="font-bold text-gray-800 text-base sm:text-lg pr-2">{faq.question}</span>
                                <div className={`p-1 rounded-full bg-white border border-gray-200 text-[#2076C7] transition-transform duration-300 ${activeIndex === idx ? 'rotate-180' : ''}`}>
                                    {activeIndex === idx ? <Minus size={20} /> : <Plus size={20} />}
                                </div>
                            </button>

                            {activeIndex === idx && (
                                <div className="px-6 py-5 bg-white text-gray-600 text-base leading-relaxed border-t border-gray-100 animate-fadeIn">
                                    {faq.answer}
                                </div>
                            )}
                        </div>
                    ))}
                </div>
            </div>

            <section className="mt-12 py-12 bg-[#1CADA3] relative overflow-hidden">
                {/* Background Decorative Elements */}
                <div className="absolute top-0 left-0 w-full h-full opacity-10 pointer-events-none">
                    <div className="absolute -top-24 -left-24 w-96 h-96 bg-white rounded-full blur-3xl" />
                    <div className="absolute -bottom-24 -right-24 w-96 h-96 bg-white rounded-full blur-3xl" />
                </div>

                <div className="container mx-auto px-4 md:px-6 text-center relative z-10">
                    <motion.div
                        initial={{ opacity: 0, scale: 0.95 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        viewport={{ once: true }}
                        className="max-w-4xl mx-auto flex flex-col items-center"
                    >
                        <h2 className="text-3xl md:text-4xl font-extrabold text-white mb-4 leading-tight">
                            Ready to Drive Your New Vehicle?
                        </h2>
                        <p className="text-white/90 text-base md:text-lg mb-8 max-w-2xl mx-auto font-medium leading-relaxed">
                            Stop waiting and start driving. Apply today for a seamless vehicle financing experience with low interest rates and flexible tenures.
                        </p>
                        <motion.button
                            whileHover={{ scale: 1.05, boxShadow: "0 20px 25px -5px rgb(0 0 0 / 0.1)" }}
                            whileTap={{ scale: 0.95 }}
                            onClick={() => {
                                const formElement = document.getElementById('apply-now-form');
                                if (formElement) formElement.scrollIntoView({ behavior: 'smooth' });
                            }}
                            className="px-10 py-3.5 bg-white text-[#1CADA3] rounded-full font-bold text-base hover:bg-gray-50 transition-all shadow-lg"
                        >
                            Apply Now
                        </motion.button>
                    </motion.div>
                </div>
            </section>
        </div>
    );
};

export default VehicleLoanFAQ;
