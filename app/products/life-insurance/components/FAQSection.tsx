"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronDown, HelpCircle, MessageCircle } from "lucide-react";

const faqs = [
    {
        question: "What is the best age to buy life insurance?",
        answer: "The best age to buy life insurance is as early as possible — ideally between 21-30. Premiums are significantly lower (up to 40% cheaper) when you're younger. For example, a 25-year-old can get ₹1 Crore cover for just ₹490/month, while the same cover at age 40 costs ₹1,800/month."
    },
    {
        question: "How much life insurance coverage do I need?",
        answer: "Industry experts recommend a minimum of ₹1 Crore sum assured. The general rule is 15-20 times your annual income. Factor in outstanding loans, child education (₹25-50L per child), spouse's income needs, and inflation. Use our calculator for a personalized recommendation."
    },
    {
        question: "What is Zero Cost Term Insurance?",
        answer: "Zero Cost Term Insurance (Return of Premium) gives you pure protection plus all your premiums back if you outlive the policy term. It's like having protection at zero net cost. Available from many of India's most trusted insurers on our platform."
    },
    {
        question: "What is the Secure Choice Benefit?",
        answer: "Secure Choice Benefit allows you to exit your policy after a specific period with a return of premiums paid. It combines the safety of term insurance with the flexibility to get your money back — a feature available in premium plans from top independent insurers."
    },
    {
        question: "Can NRIs buy life insurance from India?",
        answer: "Yes! NRIs can purchase life insurance policies from Indian insurers. They need to provide passport, visa, overseas address proof, and income proof. Many plans like term insurance, ULIPs, and endowment plans are available for NRIs through Infinity Arthvishva."
    },
    {
        question: "What is Personal Claim Support?",
        answer: "Every Infinity Arthvishva policyholder gets personal claim support — a dedicated relationship manager who handles everything for your family. From document collection at your doorstep to real-time updates, we ensure a smooth and stress-free settlement process."
    },
    {
        question: "What are the tax benefits of life insurance?",
        answer: "Life insurance offers triple tax benefits: (1) Section 80C — Deduction up to ₹1.5 Lakh on premiums paid. (2) Section 10(10D) — Tax-free maturity and death benefits. (3) Section 80CCC — Additional deductions for pension plans. Total tax savings can go up to ₹46,800 per year."
    },
    {
        question: "How long does claim settlement take?",
        answer: "With our DCAP program, eligible digital claims are settled promptly. Standard claims take 7-15 working days. Our partner insurers have an average claim settlement ratio of 99.6%, one of the highest in the industry. We provide real-time tracking for all claims."
    },
    {
        question: "Can I have multiple life insurance policies?",
        answer: "Yes, you can hold multiple policies from different insurers. Many smart investors use a combination — one term plan for pure protection (₹1 Crore), one ULIP for wealth creation, and one child plan for education funding. This diversified approach covers all financial goals."
    }
];

export default function FAQSection() {
    const [openIndex, setOpenIndex] = useState<number | null>(0);

    return (
        <section className="py-10 md:py-16 bg-slate-50 relative overflow-hidden" id="faq">
            {/* Subtle background accent */}
            <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(circle_at_0%_100%,#2076C703_0%,transparent_40%)] pointer-events-none" />

            <div className="container-custom relative z-10 px-4 md:px-6">
                <div className="text-center max-w-4xl mx-auto mb-8 md:mb-12">
                    <motion.span
                        initial={{ opacity: 0, y: 10 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        className="text-[#2076C7] font-black uppercase text-[10px] md:text-xs tracking-[0.4em] mb-4 block font-sans"
                    >
                        INSURANCE CLARITY
                    </motion.span>
                    <motion.h2
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        className="text-3xl md:text-5xl lg:text-6xl font-black mb-6 md:mb-8 text-[#2076C7] font-sans"
                    >
                        Frequently Asked <span className="text-transparent bg-clip-text bg-linear-to-r from-[#2076C7] via-[#1CADA3] to-[#2076C7] bg-[length:200%_auto] animate-gradient-x">Questions</span>
                    </motion.h2>
                    <p className="text-gray-500 text-lg md:text-xl leading-relaxed font-medium font-sans">
                        Everything you need to know about life insurance — from coverage amounts to claim process and tax savings.
                    </p>
                </div>

                <div className="max-w-3xl mx-auto space-y-4 px-4">
                    {faqs.map((faq, index) => (
                        <motion.div
                            key={index}
                            initial={{ opacity: 0, y: 10 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: index * 0.03 }}
                            className="border border-slate-200 rounded-[1.5rem] bg-white overflow-hidden hover:border-[#2076C7]/20 transition-all hover:shadow-lg hover:shadow-slate-200/50"
                        >
                            <button
                                suppressHydrationWarning
                                onClick={() => setOpenIndex(openIndex === index ? null : index)}
                                className="w-full flex items-center justify-between p-6 text-left hover:bg-slate-50 transition-colors cursor-pointer"
                            >
                                <span className="font-black text-[#2076C7] text-base pr-8">{faq.question}</span>
                                <div className={`p-2 rounded-xl flex-shrink-0 transition-all duration-300 ${openIndex === index ? 'bg-[#2076C7] text-white rotate-180' : 'bg-slate-100 text-slate-400'}`}>
                                    <ChevronDown className="w-4 h-4" />
                                </div>
                            </button>

                            <AnimatePresence>
                                {openIndex === index && (
                                    <motion.div
                                        initial={{ height: 0, opacity: 0 }}
                                        animate={{ height: "auto", opacity: 1 }}
                                        exit={{ height: 0, opacity: 0 }}
                                        transition={{ duration: 0.3 }}
                                    >
                                        <div className="px-6 pb-6 text-gray-500 text-sm leading-relaxed border-t border-slate-50 pt-4">
                                            {faq.answer}
                                        </div>
                                    </motion.div>
                                )}
                            </AnimatePresence>
                        </motion.div>
                    ))}
                </div>

                {/* Expert help CTA */}
                {/* <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="mt-16 flex flex-col sm:flex-row items-center justify-center gap-4 max-w-2xl mx-auto p-8 bg-white rounded-[2.5rem] border border-gray-100 shadow-xl shadow-slate-200/50"
                >
                    <div className="w-14 h-14 rounded-2xl bg-[#1CADA3] flex items-center justify-center flex-shrink-0">
                        <MessageCircle className="w-7 h-7 text-white" />
                    </div>
                    <div className="text-center sm:text-left flex-1">
                        <h3 className="font-black text-[#2076C7] text-lg">Still have questions?</h3>
                        <p className="text-sm text-gray-400 font-medium">Talk to our certified insurance experts — available Mon-Sat, 9 AM to 9 PM</p>
                    </div>
                    <button
                        suppressHydrationWarning
                        className="px-6 py-3 bg-[#2076C7] text-white rounded-xl font-black text-sm hover:bg-[#1a63a5] transition-all active:scale-95 shadow-lg shadow-[#2076C7]/20 whitespace-nowrap"
                    >
                        Talk to Expert →
                    </button>
                </motion.div> */}
            </div>
        </section>
    );
}
