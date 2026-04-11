'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { IconPlus, IconMinus } from '@tabler/icons-react';

// --- Section 1: PetFAQSection ---
const faqs = [
    {
        question: "What does pet insurance typically cover?",
        answer: "Most pet insurance plans cover unexpected accidents, illnesses, surgeries, and hospitalization. Depending on your choice of plan, it can also cover outpatient treatments (OPD), diagnostic tests, and even routine wellness care like vaccinations."
    },
    {
        question: "Is there an age limit for pet insurance?",
        answer: "Generally, pets can be insured from 8 weeks of age up to 10 years. For pets older than 7 years, we offer specialized Senior Care plans that focus on aging-related health needs."
    },
    {
        question: "Are pre-existing conditions covered?",
        answer: "Pre-existing conditions (conditions your pet had before the policy started) are usually not covered. However, some plans may cover them after a certain waiting period or if they have been 'cured' for a specific duration. Always check the policy wordings."
    },
    {
        question: "How do I make a claim?",
        answer: "Our process is 100% digital. Visit your vet, pay the bill, and then upload a photo of the original prescription and invoice to our portal. We process most claims within 48-72 hours."
    },
    {
        question: "Can I take my pet to any vet?",
        answer: "Yes! Most plans allow you to visit any licensed veterinarian. Some plans even offer cashless treatment at specific network hospitals, making it even more convenient for you."
    },
    {
        question: "Does pet insurance cover dental care?",
        answer: "Most basic plans do not cover dental procedures unless they are a result of an accident. However, our Premium Shield plans often include coverage for routine dental checkups and essential treatments."
    },
    {
        question: "Is there a waiting period before coverage starts?",
        answer: "Yes, there is usually a 15-30 day waiting period for illnesses and a 24-hour waiting period for accidents. Conditions that occur during this period are not covered for that policy term."
    },
    {
        question: "Will my premium increase as my pet gets older?",
        answer: "Premiums may be adjusted as your pet enters different life stages or if there are significant changes in medical costs. We strive to keep adjustments transparent and fair based on the updated risk profile."
    },
    {
        question: "Are routine vaccinations covered?",
        answer: "Routine vaccinations are covered under our Wellness & Preventive add-ons or as part of the Premium Shield plan. This helps you stay on top of your pet's health and prevent future illnesses."
    },
    {
        question: "Can I cancel my policy if I change my mind?",
        answer: "Yes, you can cancel your policy at any time. If you cancel within the 15-day free-look period and haven't made a claim, you'll receive a full refund of the premium paid."
    }
];

export function PetFAQSection() {
    const [activeIndex, setActiveIndex] = useState<number | null>(null);
    const [showAllFaqs, setShowAllFaqs] = useState(false);

    const toggleFAQ = (index: number) => {
        setActiveIndex(activeIndex === index ? null : index);
    };

    return (
        <div className="bg-white font-sans">
            {/* --- DISCLAIMER --- */}
            <div className="bg-white py-4 px-4">
                <div className="max-w-4xl mx-auto bg-yellow-50 border border-yellow-200 rounded-xl p-4 shadow-sm">
                    <p className="text-sm text-gray-700 text-center leading-relaxed">
                        <strong className="text-black">Disclaimer:</strong> Information and premium quotes provided are for general guidance and are subject to change. Please verify all details with the respective insurance providers before making a final decision.
                    </p>
                </div>
            </div>

            {/* --- FAQ SECTION --- */}
            <section id="faq" className="py-7 bg-white">
                <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="text-center mb-8">
                        
                     <h2 className="text-3xl md:text-4xl font-extrabold mb-3 bg-linear-to-r from-[#2076C7] to-[#1CADA3] bg-clip-text text-transparent drop-shadow-sm">
                               Frequently Asked Questions
                    </h2>
                    <p className="text-slate-500 max-w-2xl mx-auto text-base md:text-lg mt-6 font-medium leading-relaxed px-4 md:px-0">
                      Got questions about pet insurance? We&apos;ve got answers for you.
                        </p>
                   
                    </div>

                    <div className="space-y-4">
                        {(showAllFaqs ? faqs : faqs.slice(0, 5)).map((faq, idx) => (
                            <motion.div
                                key={idx}
                                initial={{ opacity: 0, y: 10 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: idx * 0.05 }}
                                className="border border-gray-100 rounded-2xl overflow-hidden transition-all duration-300 hover:border-[#2076C7]/30 hover:shadow-md"
                            >
                                <button
                                    onClick={() => toggleFAQ(idx)}
                                    className="w-full px-4 sm:px-6 py-4 sm:py-5 text-left flex justify-between items-center gap-4 bg-slate-50/50 hover:bg-blue-50/50 transition-colors focus:outline-none group"
                                >
                                    <span className="font-extrabold text-gray-700 text-base sm:text-lg pr-2 group-hover:text-[#2076C7] transition-colors leading-snug">
                                        {faq.question}
                                    </span>
                                    <div className={`p-1.5 rounded-full bg-white border border-gray-200 text-gray-700 shadow-sm transition-transform duration-300 shrink-0 ${activeIndex === idx ? 'rotate-180 bg-[#2076C7] text-white border-[#2076C7]' : ''}`}>
                                        {activeIndex === idx ? <IconMinus size={18} strokeWidth={3} /> : <IconPlus size={18} strokeWidth={3} />}
                                    </div>
                                </button>

                                <AnimatePresence>
                                    {activeIndex === idx && (
                                        <motion.div
                                            initial={{ height: 0, opacity: 0 }}
                                            animate={{ height: 'auto', opacity: 1 }}
                                            exit={{ height: 0, opacity: 0 }}
                                            className="overflow-hidden"
                                        >
                                            <div className="px-6 py-5 bg-white text-slate-500 text-base font-medium leading-relaxed border-t border-gray-100">
                                                {faq.answer}
                                            </div>
                                        </motion.div>
                                    )}
                                </AnimatePresence>
                            </motion.div>
                        ))}
                    </div>

                    {faqs.length > 5 && (
                        <div className="text-center mt-12">
                            <button
                                onClick={() => setShowAllFaqs(!showAllFaqs)}
                                className="inline-flex items-center gap-2 px-8 py-3.5 rounded-full bg-blue-50 text-[#2076C7] font-black uppercase tracking-widest text-[10px] hover:bg-blue-100 transition-all shadow-sm active:scale-95"
                            >
                                {showAllFaqs ? 'View Less' : 'View More'}
                                <IconPlus size={16} strokeWidth={3} className={`transition-transform duration-300 ${showAllFaqs ? 'rotate-45' : ''}`} />
                            </button>
                        </div>
                    )}
                </div>
            </section>
        </div>
    );
}
