"use client";

import { useState } from 'react';
import { Plus, Minus } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const HOME_LOAN_FAQS = [
    { q: 'What is the rate of interest?', a: 'Home loan interest rates start from 7.10% p.a. However, the final rate depends on various factors including the chosen bank, your CIBIL score, loan amount, and employment type.' },
    { q: 'How to apply?', a: "You can apply directly through our website by clicking the 'Apply Now' button on any plan card. Our experts will then guide you through the digital documentation and approval process." },
    { q: 'What is the processing time?', a: 'Processing time varies by lender but typically ranges from 3 to 10 working days, depending on the completeness of your documentation and property verification.' },
    { q: 'Are there any hidden charges?', a: 'No, we believe in complete transparency. All processing fees and legal charges are clearly mentioned in your loan agreement. Some banks also offer zero processing fee options for balance transfers.' },
    { q: 'What tax benefits can I claim?', a: 'You can claim tax deductions under Section 24(b) (up to ₹2 Lakh for interest) and Section 80C (up to ₹1.5 Lakh for principal repayment) of the Income Tax Act every financial year.' },
    { q: 'Is there a prepayment penalty?', a: 'As per RBI guidelines, there are zero prepayment charges for individual borrowers on floating-rate home loans. This allows you to close your loan earlier without extra costs.' },
    { q: 'Should I add a co-applicant?', a: 'Adding a co-applicant (like a spouse or parent) can significantly increase your loan eligibility and allow both parties to claim individual tax benefits if they are co-owners.' },
    { q: 'What is a Home Loan Balance Transfer?', a: 'It allows you to transfer your existing home loan from one bank to another to take advantage of lower interest rates or better service terms, potentially saving lakhs in interest.' },
    { q: 'Fixed vs Floating Interest Rates?', a: 'Fixed rates remain constant for a specific period, offering stability. Floating rates change with market conditions (Repo Rate), often being cheaper over the long term but subject to market fluctuations.' },
    { q: 'What factors affect my eligibility?', a: 'Major factors include your age (21-65 years), monthly net income, credit score (750+ preferred), existing liabilities, and the technical/legal valuation of the property.' }
];

export default function HomeLoanFAQ() {
    const [openFaq, setOpenFaq] = useState<number | null>(null);
    const [showAllFaqs, setShowAllFaqs] = useState(false);

    return (
        <section className="py-12 md:py-16 bg-white font-sans">
            <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
                <motion.div initial="hidden" whileInView="visible" className="text-center mb-16">
                    <section className="mb-10">
                        <div className="max-w-4xl mx-auto bg-yellow-50 border border-yellow-200 rounded-xl p-6 shadow-sm">
                            <p className="text-sm text-gray-700 text-center leading-relaxed">
                                <strong className="text-black">Disclaimer:</strong> Interest rates, loan eligibility, and terms are subject to change based on the lender&apos;s internal policies and your individual credit profile. Final approval is at the sole discretion of the respective banks/HFCs.
                            </p>
                        </div>
                    </section>
                    <motion.h2 className="text-3xl md:text-4xl font-extrabold mb-3 bg-linear-to-r from-[#2076C7] to-[#1CADA3] bg-clip-text text-transparent drop-shadow-sm">
                        Frequently Asked Questions
                    </motion.h2>
                    <motion.p className="text-gray-600 max-w-2xl mx-auto text-lg leading-relaxed font-light">
                        Got questions about home loans? We&apos;ve got answers.
                    </motion.p>
                </motion.div>

                <div className="space-y-4">
                    {(showAllFaqs ? HOME_LOAN_FAQS : HOME_LOAN_FAQS.slice(0, 5)).map((faq, i) => (
                        <motion.div
                            key={i}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            className="border border-gray-100 rounded-2xl overflow-hidden transition-all duration-300 hover:border-[#2076C7]/30 hover:shadow-md"
                        >
                            <button
                                onClick={() => setOpenFaq(openFaq === i ? null : i)}
                                className="w-full px-4 sm:px-6 py-3 sm:py-4 text-left flex justify-between items-start gap-3 bg-white hover:bg-blue-50/50 transition-colors focus:outline-none cursor-pointer group"
                            >
                                <span className="font-bold text-gray-700 text-base sm:text-lg pr-2 group-hover:text-[#2076C7] transition-colors">{faq.q}</span>
                                <div className={`p-1.5 rounded-full bg-white border border-gray-300 text-gray-700 transition-transform duration-300 ${openFaq === i ? 'rotate-180' : ''}`}>
                                    {openFaq === i ? <Minus size={18} strokeWidth={3} /> : <Plus size={18} strokeWidth={3} />}
                                </div>
                            </button>
                            <AnimatePresence>
                                {openFaq === i && (
                                    <motion.div
                                        initial={{ height: 0, opacity: 0 }}
                                        animate={{ height: "auto", opacity: 1 }}
                                        exit={{ height: 0, opacity: 0 }}
                                        transition={{ duration: 0.3, ease: "easeInOut" }}
                                    >
                                        <div className="px-6 py-6 bg-white text-gray-600 text-base leading-relaxed border-t border-gray-100 italic">
                                            {faq.a}
                                        </div>
                                    </motion.div>
                                )}
                            </AnimatePresence>
                        </motion.div>
                    ))}
                </div>

                {HOME_LOAN_FAQS.length > 5 && (
                    <div className="text-center mt-12">
                        <button
                            onClick={() => setShowAllFaqs(!showAllFaqs)}
                            className="inline-flex items-center gap-2 px-8 py-3.5 rounded-full bg-blue-50 text-[#2076C7] font-bold hover:bg-blue-100 transition-all cursor-pointer shadow-sm active:scale-95"
                        >
                            {showAllFaqs ? 'View Less' : 'View More Questions'}
                            <Plus className={`w-5 h-5 transition-transform duration-300 ${showAllFaqs ? 'rotate-45' : ''}`} />
                        </button>
                    </div>
                )}
            </div>
        </section>
    );
}
