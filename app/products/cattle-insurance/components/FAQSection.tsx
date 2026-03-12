'use client';

import { motion, AnimatePresence } from 'framer-motion';
import { useState } from 'react';
import { IconPlus, IconMinus } from '@tabler/icons-react';

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
    {
        q: 'What happens if I lose the ear tag of my insured cattle?',
        a: 'If an ear tag is lost, it must be reported to the insurance company immediately. A new tag must be fixed by a veterinarian and a fresh health certificate/tag conversion certificate should be submitted to maintain policy continuity.',
    },
    {
        q: 'Is theft of cattle covered under the insurance policy?',
        a: 'Yes, most comprehensive cattle insurance policies cover theft or burglary. However, a First Information Report (FIR) and immediate notification to the insurer are required to process such claims.',
    },
    {
        q: 'Are there any common exclusions in cattle insurance?',
        a: 'Common exclusions include intentional injury, slaughter without legal/medical necessity, theft during the first 15 days of policy, and death due to pre-existing diseases or non-notified transport beyond a certain radius.',
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
            {/* --- DISCLAIMER --- */}
            <div className="bg-white py-4 px-4">
                <div className="max-w-4xl mx-auto bg-yellow-50 border border-yellow-200 rounded-xl p-6 shadow-sm">
                    <p className="text-sm text-gray-700 text-center leading-relaxed">
                        <strong className="text-black">Disclaimer:</strong> Information and premium quotes provided are for general guidance and are subject to change. Please verify all details with the respective insurance providers before making a final decision.
                    </p>
                </div>
            </div>

            {/* --- FAQ SECTION --- */}
            <section id="faq" className="py-8 bg-white">
                <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="text-center mb-12">
                        <h2 className="text-2xl md:text-3xl font-extrabold mb-6 bg-linear-to-r from-[#2076C7] to-[#1CADA3] bg-clip-text text-transparent drop-shadow-sm tracking-tight leading-tight">
                            Frequently Asked Questions
                        </h2>

                        <p className="text-gray-600 font-medium text-base md:text-lg leading-relaxed mt-2">
                            Got questions about cattle insurance? We&apos;ve got answers for you.
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
                                        {faq.q}
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
                                                {faq.a}
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
