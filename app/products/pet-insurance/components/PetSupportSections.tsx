'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { IconChevronDown, IconPlus, IconMinus, IconPhone, IconMail, IconArrowRight, IconHeart, IconAlertTriangle } from '@tabler/icons-react';
import { useModal } from '@/app/context/ModalContext';

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
    }
];

export function PetFAQSection() {
    const [openIndex, setOpenIndex] = useState<number | null>(0);

    return (
        <section className="py-12 bg-slate-50">
            <div className="max-w-4xl mx-auto px-4 sm:px-6">
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="text-center mb-10 md:mb-16"
                >
                    <span className="text-[#2076C7] font-bold tracking-widest uppercase text-xs md:text-sm">Got Questions?</span>
                    <h2 className="text-3xl md:text-4xl font-extrabold mb-3 bg-linear-to-r from-[#2076C7] to-[#1CADA3] bg-clip-text text-transparent drop-shadow-sm">
                        Pet Insurance FAQs
                    </h2>
                    <p className="text-base md:text-lg text-slate-500 mt-4">
                        Everything you need to know about protecting your furry friend's health.
                    </p>
                </motion.div>

                <div className="space-y-4">
                    {faqs.map((faq, idx) => (
                        <motion.div
                            key={idx}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: idx * 0.1 }}
                            className="bg-white rounded-2xl border border-slate-100 overflow-hidden shadow-sm hover:shadow-md transition-shadow"
                        >
                            <button
                                onClick={() => setOpenIndex(openIndex === idx ? null : idx)}
                                className="w-full p-5 md:p-6 text-left flex items-center justify-between gap-4"
                            >
                                <span className="text-base md:text-lg font-bold text-slate-800">{faq.question}</span>
                                <div className={`w-8 h-8 rounded-full flex items-center justify-center transition-colors ${openIndex === idx ? 'bg-[#2076C7] text-white' : 'bg-slate-50 text-slate-400'}`}>
                                    {openIndex === idx ? <IconMinus size={18} stroke={3} /> : <IconPlus size={18} stroke={3} />}
                                </div>
                            </button>
                            <AnimatePresence>
                                {openIndex === idx && (
                                    <motion.div
                                        initial={{ height: 0, opacity: 0 }}
                                        animate={{ height: 'auto', opacity: 1 }}
                                        exit={{ height: 0, opacity: 0 }}
                                        className="border-t border-slate-50"
                                    >
                                        <div className="p-5 md:p-6 text-slate-600 text-sm md:text-base leading-relaxed font-medium">
                                            {faq.answer}
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

// --- Section 2: PetContactSection ---
export function PetContactSection() {
    const { openPartner } = useModal();
    return (
        <section className="py-16 bg-white overflow-hidden relative">
            <div className="absolute top-0 left-0 w-full h-full bg-[#2076C7]/[0.02] -z-0" />

            <div className="max-w-7xl mx-auto px-4 sm:px-6 relative z-10">
                <div className="bg-gradient-to-br from-[#2076C7] to-[#1CADA3] rounded-[2rem] sm:rounded-[2.5rem] md:rounded-[4rem] p-6 sm:p-8 md:p-16 text-white shadow-2xl overflow-hidden relative group">

                    {/* Decorative Elements */}
                    <div className="absolute -top-24 -right-24 w-64 h-64 bg-white/10 rounded-full blur-3xl group-hover:scale-150 transition-transform duration-1000" />
                    <div className="absolute -bottom-24 -left-24 w-64 h-64 bg-white/10 rounded-full blur-3xl group-hover:scale-150 transition-transform duration-1000" />

                    <div className="flex flex-col lg:flex-row items-center gap-12 text-center lg:text-left">
                        <div className="lg:w-2/3">
                            <motion.div
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                            >
                                <div className="inline-flex items-center gap-2 py-1.5 px-4 rounded-full bg-white/20 backdrop-blur-sm border border-white/30 text-xs font-bold tracking-widest uppercase mb-6">
                                    <IconHeart size={14} /> Talk to our Pet Experts
                                </div>
                                <h2 className="text-3xl md:text-5xl font-black mb-6 leading-[1.1]">
                                    Unsure about the right cover? Let's help you choose!
                                </h2>
                                <p className="text-lg md:text-xl text-white/80 font-medium mb-8 max-w-2xl leading-relaxed">
                                    Our pet insurance experts are here to guide you through different plans and find the perfect protection for your furry friend.
                                </p>

                                <div className="flex flex-col sm:flex-row items-center gap-6 justify-center lg:justify-start">
                                    <div className="flex items-center gap-3">
                                        <div className="w-12 h-12 rounded-xl bg-white/20 flex items-center justify-center">
                                            <IconPhone size={24} />
                                        </div>
                                        <div>
                                            <p className="text-[10px] font-bold text-white/60 uppercase tracking-widest">Call Us</p>
                                            <p className="text-lg font-black tracking-tight">1800-PET-SECURE</p>
                                        </div>
                                    </div>
                                    <div className="flex items-center gap-3">
                                        <div className="w-12 h-12 rounded-xl bg-white/20 flex items-center justify-center">
                                            <IconMail size={24} />
                                        </div>
                                        <div>
                                            <p className="text-[10px] font-bold text-white/60 uppercase tracking-widest">Email Us</p>
                                            <p className="text-lg font-black tracking-tight">care@petinsurance.com</p>
                                        </div>
                                    </div>
                                </div>
                            </motion.div>
                        </div>

                        <div className="lg:w-1/3 w-full">
                            <motion.div
                                initial={{ opacity: 0, scale: 0.9 }}
                                whileInView={{ opacity: 1, scale: 1 }}
                                viewport={{ once: true }}
                                className="bg-white/20 backdrop-blur-md border border-white/30 p-6 rounded-[2rem] shadow-xl text-center"
                            >
                                <h3 className="text-xl font-black mb-3">Request a Callback</h3>
                                <p className="text-sm font-medium text-white/80 mb-6">
                                    Fill in your details and our team will get back to you within 15 minutes.
                                </p>
                                <button
                                    onClick={openPartner}
                                    className="w-full py-3 bg-white text-[#2076C7] font-black rounded-xl shadow-lg hover:shadow-xl hover:scale-[1.02] transition-all flex items-center justify-center gap-2 group"
                                >
                                    Contact Us
                                    <IconArrowRight className="group-hover:translate-x-1 transition-transform" />
                                </button>
                                <p className="mt-4 text-[10px] font-bold text-white/60 uppercase tracking-[0.2em]">Available 24/7</p>
                            </motion.div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}

// --- Section 3: PetDisclaimer ---
export function PetDisclaimer() {
    return (
        <section className="py-8 px-6 bg-[#f8fafc] border-t border-slate-200">
            <div className="max-w-[1440px] mx-auto">
                <motion.div
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    viewport={{ once: true }}
                    className="text-slate-500 text-[12px] leading-relaxed text-justify"
                >
                    <p>
                        <span className="font-bold text-slate-700">Disclaimer:</span> The premium estimates provided by the pet insurance calculator are for illustrative purposes only. The actual premium may vary based on the pet&apos;s breed, age, health condition, and the specific insurer&apos;s underwriting guidelines. Taxes and levies are as per the prevailing laws. Insurance is a subject matter of solicitation. The information provided is based on market research and publicly available data. We do not guarantee any specific claim payout or coverage amount. Please read the policy terms and conditions carefully before making a purchase. Standard waiting periods apply: 30 days for illnesses, and 24-48 hours for accidents. Specific chronic conditions may have longer waiting periods of 1-2 years. Wellness and OPD covers are optional and subject to the chosen plan limits. © 2024 PETSECURE. ALL RIGHTS RESERVED. IRDAI REGISTERED BROKER.
                    </p>
                </motion.div>
            </div>
        </section>
    );
}
