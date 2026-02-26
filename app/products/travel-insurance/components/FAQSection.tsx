'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { IconChevronDown } from '@tabler/icons-react';

const faqs = [
    {
        q: 'What does travel insurance typically cover?',
        a: 'Travel insurance generally covers medical emergencies, trip cancellations, flight delays, lost or delayed baggage, personal liability, and emergency evacuation. The exact coverage depends on the plan you choose.',
    },
    {
        q: 'When should I buy travel insurance?',
        a: 'You should purchase travel insurance as soon as you book your trip. Buying early gives you immediate cancellation protection and ensures you are covered from the moment you start your journey.',
    },
    {
        q: 'Are pre-existing medical conditions covered?',
        a: 'Standard plans may not cover pre-existing conditions. However, we offer specialized plans that cover stable pre-existing conditions with a simple medical declaration. Contact us for a personalized quote.',
    },
    {
        q: 'How do I file a claim?',
        a: 'Filing a claim is simple — log in to your account, submit the claim form with supporting documents (medical bills, FIR, airline reports), and our team processes it within 24–48 hours. Most cashless claims are settled instantly at partner hospitals.',
    },
    {
        q: 'Can I extend my policy while abroad?',
        a: 'Yes! You can extend your policy online even while traveling. Simply log in, request an extension, and make the additional payment. The extension is instant and confirmed via email.',
    },
    {
        q: 'Is adventure sports coverage included?',
        a: 'Basic plans cover standard adventure sports like snorkeling and hiking. For extreme activities like skydiving, bungee jumping, or scuba diving, you can add our Adventure Sports Add-on at a small extra cost.',
    },
    {
        q: 'What is the maximum age limit for coverage?',
        a: 'We cover travelers from 3 months to 85 years of age. For travelers above 60, we have special senior citizen plans with enhanced medical coverage and simplified application processes.',
    },
];

export default function FAQSection() {
    const [openIdx, setOpenIdx] = useState<number | null>(0);

    return (
        <section id="faq" className="py-12 px-6 bg-white">
            <div className="max-w-4xl mx-auto">
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="text-center mb-16"
                >
                    <span className="text-[#1CADA3] font-bold tracking-widest uppercase text-sm">Got Questions?</span>
                    <h2 className="text-3xl md:text-4xl font-extrabold mb-3 bg-linear-to-r from-[#2076C7] to-[#1CADA3] bg-clip-text text-transparent drop-shadow-sm">
                    Common Questions
                    </h2> 
                    <p className="text-lg text-slate-500 mt-4">
                        Everything you need to know about our travel insurance plans.
                    </p>
                </motion.div>

                <div className="space-y-3">
                    {faqs.map((faq, idx) => (
                        <motion.div
                            key={idx}
                            initial={{ opacity: 0, y: 10 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: idx * 0.05 }}
                            className={`rounded-2xl border-2 overflow-hidden transition-all duration-300 ${openIdx === idx
                                ? 'border-[#1CADA3] bg-[#1CADA3]/5 shadow-[0_20px_50px_-12px_rgba(28,173,163,0.3)] scale-[1.02]'
                                : 'border-[#1CADA3]/20 bg-white hover:border-[#1CADA3]/40 shadow-[0_10px_30px_-10px_rgba(28,173,163,0.12)] hover:shadow-md'
                                }`}
                        >
                            <button
                                onClick={() => setOpenIdx(openIdx === idx ? null : idx)}
                                className="w-full flex items-center justify-between p-6 text-left"
                            >
                                <div className="flex items-center gap-4">
                                    <span className={`text-sm font-extrabold ${openIdx === idx ? 'text-[#1CADA3]' : 'text-slate-300'}`}>
                                        {String(idx + 1).padStart(2, '0')}
                                    </span>
                                    <h3 className={`text-lg font-bold ${openIdx === idx ? 'text-[#1CADA3]' : 'text-slate-800'}`}>
                                        {faq.q}
                                    </h3>
                                </div>
                                <div className={`w-8 h-8 rounded-full flex items-center justify-center transition-all ${openIdx === idx ? 'bg-gradient-to-br from-[#2076C7] to-[#1CADA3] text-white rotate-180' : 'bg-slate-100 text-slate-400'
                                    }`}>
                                    <IconChevronDown size={16} />
                                </div>
                            </button>

                            <AnimatePresence>
                                {openIdx === idx && (
                                    <motion.div
                                        initial={{ height: 0, opacity: 0 }}
                                        animate={{ height: 'auto', opacity: 1 }}
                                        exit={{ height: 0, opacity: 0 }}
                                        transition={{ duration: 0.3 }}
                                        className="overflow-hidden"
                                    >
                                        <div className="px-6 pb-6 pl-16">
                                            <p className="text-slate-600 leading-relaxed">{faq.a}</p>
                                        </div>
                                    </motion.div>
                                )}
                            </AnimatePresence>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
}
