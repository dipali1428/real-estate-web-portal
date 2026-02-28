'use client';

import { motion, AnimatePresence } from 'framer-motion';
import { useState } from 'react';
import { IconChevronDown } from '@tabler/icons-react';

const faqs = [
    {
        q: 'What types of animals are covered under cattle insurance?',
        a: 'Cattle insurance covers cows, bullocks, buffalo, heifers, calves, sheep, goats, pigs, rabbits, and poultry in some schemes. Coverage varies by plan — contact us for the complete list.',
    },
    {
        q: 'Is a veterinary certificate mandatory for enrolling an animal?',
        a: 'Yes. A health certificate from an empaneled/registered veterinarian is mandatory at the time of insurance. The vet will examine the animal and confirm its health status before coverage begins.',
    },
    {
        q: 'What is the maximum sum insured I can get for my cattle?',
        a: 'The maximum sum insured is generally equal to the market value of the animal, up to ₹5 lakh for cattle and ₹6 lakh for buffalo. This is determined at the time of insurance based on a vet evaluation.',
    },
    {
        q: 'Is there a government subsidy on cattle insurance premium?',
        a: 'Yes. Under the Rashtriya Pashu Bima Yojana and state-level schemes, BPL farmers, SC/ST farmers, and small/marginal farmers can get up to 50% premium subsidy from the government.',
    },
    {
        q: 'How long does it take to settle a claim?',
        a: 'Once all documents are submitted, claims are typically settled within 48 hours. The amount is directly credited to the policyholder\'s bank account via NEFT/RTGS.',
    },
    {
        q: 'Can I insure a pregnant animal?',
        a: 'Yes, pregnant animals can be insured. However, death due to complicated delivery (dystocia) may have specific conditions. Please review your policy wording or speak with our advisor.',
    },
];

export default function FAQSection() {
    const [openIndex, setOpenIndex] = useState<number | null>(0);
    const [showAll, setShowAll] = useState(false);

    const displayedFaqs = showAll ? faqs : faqs.slice(0, 4);

    return (
        <section className="pt-8 pb-8 bg-[#fafcfe]">
            <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.7 }}
                    className="text-center mb-10"
                >
                    <span className="text-primary-blue font-bold tracking-widest uppercase text-sm mb-4 block">Got Questions?</span>
                    <h2 className="text-3xl md:text-4xl font-extrabold mb-3 bg-linear-to-r from-[#2076C7] to-[#1CADA3] bg-clip-text text-transparent drop-shadow-sm">
                        Frequently Asked Questions
                    </h2>
                    <div className="w-24 h-1 bg-gradient-to-r from-[#2076C7] via-[#1CADA3] to-[#2076C7] mx-auto rounded-full" />
                </motion.div>

                <div className="space-y-4">
                    <AnimatePresence mode="popLayout">
                        {displayedFaqs.map((faq, i) => (
                            <motion.div
                                key={i}
                                initial={{ opacity: 0, y: 15 }}
                                animate={{ opacity: 1, y: 0 }}
                                exit={{ opacity: 0, scale: 0.95 }}
                                transition={{ duration: 0.4, delay: i * 0.05 }}
                                className={`border rounded-[2rem] overflow-hidden transition-all duration-300 ${openIndex === i ? 'border-blue-200 bg-white shadow-lg shadow-blue-500/5' : 'border-slate-100 bg-white hover:border-blue-200 shadow-sm'}`}
                            >
                                <button
                                    onClick={() => setOpenIndex(openIndex === i ? null : i)}
                                    className="w-full flex items-center justify-between p-6 text-left transition-colors"
                                    aria-expanded={openIndex === i}
                                >
                                    <span className={`font-bold pr-4 text-sm md:text-base leading-snug tracking-tight ${openIndex === i ? 'text-blue-700' : 'text-slate-700'}`}>
                                        {faq.q}
                                    </span>
                                    <motion.div
                                        animate={{ rotate: openIndex === i ? 180 : 0 }}
                                        transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
                                        className={`shrink-0 w-8 h-8 rounded-full flex items-center justify-center transition-colors ${openIndex === i ? 'bg-blue-600 text-white' : 'bg-blue-50 text-blue-500'}`}
                                    >
                                        <IconChevronDown size={18} strokeWidth={3} />
                                    </motion.div>
                                </button>
                                <AnimatePresence initial={false}>
                                    {openIndex === i && (
                                        <motion.div
                                            initial={{ height: 0, opacity: 0 }}
                                            animate={{ height: 'auto', opacity: 1 }}
                                            exit={{ height: 0, opacity: 0 }}
                                            transition={{ duration: 0.3, ease: "easeInOut" }}
                                        >
                                            <div className="px-6 pb-6 text-slate-500 text-sm md:text-base leading-relaxed font-medium pt-2 border-t border-blue-100/30">
                                                {faq.a}
                                            </div>
                                        </motion.div>
                                    )}
                                </AnimatePresence>
                            </motion.div>
                        ))}
                    </AnimatePresence>
                </div>

                {!showAll && faqs.length > 4 && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        className="mt-10 text-center"
                    >
                        <button
                            onClick={() => setShowAll(true)}
                            className="px-8 py-3 bg-white text-[#2076C7] rounded-2xl font-black text-sm uppercase tracking-widest hover:bg-[#2076C7] hover:text-white border border-blue-100 transition-all duration-300 shadow-sm hover:shadow-md active:scale-95"
                        >
                            Read More FAQs
                        </button>
                    </motion.div>
                )}

                {showAll && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        className="mt-10 text-center"
                    >
                        <button
                            onClick={() => setShowAll(false)}
                            className="text-slate-400 font-bold text-sm hover:text-[#2076C7] transition-colors flex items-center gap-2 mx-auto"
                        >
                            Show Less
                        </button>
                    </motion.div>
                )}

                <motion.div
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    transition={{ delay: 0.5 }}
                    className="mt-10 text-center"
                >
                    <p className="text-slate-400 font-bold text-sm">
                        Can't find your answer? <a href="#contact" className="text-blue-600 border-b-2 border-blue-600/20 hover:border-blue-600 transition-all ml-1">Connect with our support team</a>
                    </p>
                </motion.div>
            </div>
        </section>
    );
}
