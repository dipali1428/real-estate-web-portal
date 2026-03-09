'use client';

import { motion, AnimatePresence } from 'framer-motion';
import { useState } from 'react';
import { IconArrowRight, IconPlus, IconMinus } from '@tabler/icons-react';
import { useModal } from '../../../context/ModalContext';

// --- FAQ Data ---
const travelInsuranceFaqs = [
    { question: "What does travel insurance typically cover?", answer: "Medical emergencies, cancellations, flight delays, lost baggage, and personal liability." },
    { question: "When should I buy travel insurance?", answer: "Ideally as soon as you book your trip to get cancellation protection." },
    { question: "Are pre-existing medical conditions covered?", answer: "Standard plans may not, but we have specialized plans for stable conditions." },
    { question: "How do I file a claim?", answer: "Submit documents through our portal; we process within 24–48 hours." },
    { question: "Can I extend my policy while abroad?", answer: "Yes, you can extend online through our platform instantly." },
    { question: "Does it cover adventure sports?", answer: "Many plans include basic activities, but high-risk adventure sports may require an optional rider." },
    { question: "Is COVID-19 covered?", answer: "Yes, our comprehensive plans cover medical expenses and cancellations due to COVID-19." },
    { question: "What is the difference between single-trip and multi-trip?", answer: "Single-trip covers one specific journey, while multi-trip covers all trips within a year (up to a certain duration)." },
    { question: "Does it cover loss of passport?", answer: "Yes, coverage includes expenses for obtaining a duplicate or new passport while abroad." },
    { question: "Is there an age limit for travel insurance?", answer: "We provide coverage for all age groups, though premium rates and terms may vary for senior citizens." },
];

export default function SupportAndFaqs() {
    const { openLogin } = useModal();
    const [activeIndex, setActiveIndex] = useState<number | null>(null);
    const [showAllFaqs, setShowAllFaqs] = useState(false);

    const toggleFAQ = (index: number) => {
        setActiveIndex(activeIndex === index ? null : index);
    };

    return (
        <div className="bg-white font-sans">
            {/* --- DISCLAIMER --- */}
            <div className="bg-white py-6 px-4">
                <div className="max-w-4xl mx-auto bg-yellow-50 border border-yellow-200 rounded-xl p-6 shadow-sm">
                    <p className="text-sm text-gray-700 text-center leading-relaxed">
                        <strong className="text-black">Disclaimer:</strong> Information and premium quotes provided are for general guidance and are subject to change. Please verify all details with the respective insurance providers before making a final decision.
                    </p>
                </div>
            </div>

            {/* --- FAQ SECTION --- */}
            <section id="faq" className="py-7 bg-white">
                <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="text-center mb-12">
                        <h2 className="text-3xl md:text-4xl font-extrabold mb-6 bg-linear-to-r from-[#2076C7] to-[#1CADA3] bg-clip-text text-transparent drop-shadow-sm tracking-tight leading-tight">
                            Frequently Asked Questions
                        </h2>
                        <div className="w-24 h-1.5 mx-auto rounded-full mb-6" style={{ background: 'linear-gradient(to right, #2076C7, #1CADA3)' }}></div>
                        <p className="text-gray-600 font-medium text-base md:text-lg leading-relaxed mt-2">
                            Got questions about travel insurance? We&apos;ve got answers for you.
                        </p>
                    </div>

                    <div className="space-y-4">
                        {(showAllFaqs ? travelInsuranceFaqs : travelInsuranceFaqs.slice(0, 5)).map((faq, idx) => (
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

                    {travelInsuranceFaqs.length > 5 && (
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

            {/* --- CTA BANNER --- */}
            <section className="bg-linear-to-r from-teal-600 to-teal-500 text-white py-16 font-sans">
                <div className="max-w-4xl mx-auto px-4 sm:px-6 text-center space-y-8">
                    <h2 className="text-3xl md:text-5xl font-extrabold tracking-tight leading-tight">Ready to Secure Your<br />International Journey?</h2>
                    <p className="text-white/80 font-bold text-lg leading-relaxed">Get instant coverage from India's top insurers. 24/7 expert assistance.</p>
                    <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
                        <button onClick={openLogin} className="px-10 py-5 bg-white text-teal-600 rounded-2xl font-black shadow-lg hover:scale-[1.02] transition-all w-full sm:w-auto flex items-center justify-center gap-3 uppercase text-xs md:text-sm tracking-widest">Apply For Travel Insurance <IconArrowRight size={20} /></button>
                        <a href="/#contact" className="px-10 py-5 border-2 border-white/40 text-white rounded-2xl font-black hover:bg-white/10 transition-all w-full sm:w-auto uppercase text-xs md:text-sm tracking-widest text-center">Talk to Expert</a>
                    </div>
                </div>
            </section>
        </div>
    );
}
