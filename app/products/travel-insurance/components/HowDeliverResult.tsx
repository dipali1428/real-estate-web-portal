'use client';

import { motion } from 'framer-motion';
import { IconSearch, IconListCheck, IconCreditCardPay, IconShieldCheck } from '@tabler/icons-react';

const steps = [
    {
        icon: IconSearch,
        step: '01',
        title: 'Choose Your Plan',
        desc: 'Initial consultation and requirement assessment to find the best plan for your destination.',
        color: 'from-blue-600 to-blue-400',
    },
    {
        icon: IconListCheck,
        step: '02',
        title: 'Fill Your Details',
        desc: 'Quick document submission and online verification of your travel details.',
        color: 'from-blue-500 to-blue-300',
    },
    {
        icon: IconCreditCardPay,
        step: '03',
        title: 'Pay & Get Covered',
        desc: 'Fast approval process and terms finalization. Get policy agreement instantly upon payment.',
        color: 'from-blue-700 to-blue-500',
    },
    {
        icon: IconShieldCheck,
        step: '04',
        title: 'Travel & Claim',
        desc: 'Policy activation with ongoing 24/7 global support and service management.',
        color: 'from-blue-800 to-blue-600',
    },
];

export default function HowItWorks() {
    return (
        <section className="py-12 px-6 bg-white">
            <div className="max-w-7xl mx-auto">
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="text-center max-w-3xl mx-auto mb-20"
                >
                    <span className="text-primary-blue font-bold tracking-widest uppercase text-sm">Simple Process</span>
                    <h2 className="text-4xl md:text-5xl font-extrabold text-[#1CADA3] mt-3">
                        How We Deliver Results
                    </h2>
                    <p className="text-lg text-slate-500 mt-4">
                        Getting covered is quick and hassle-free. Follow these simple steps and travel with complete peace of mind.
                    </p>
                </motion.div>

                <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 relative">
                    {/* Connecting Line */}
                    <div className="hidden lg:block absolute top-16 left-[12%] right-[12%] h-0.5 bg-gradient-to-r from-blue-200 via-slate-300 to-blue-200" />

                    {steps.map((step, idx) => (
                        <motion.div
                            key={idx}
                            initial={{ opacity: 0, y: 40 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: idx * 0.15 }}
                            className="relative group"
                        >
                            <div className="bg-white p-8 rounded-2xl border-2 border-blue-300 shadow-[0_15px_40px_-12px_rgba(32,118,199,0.18)] hover:shadow-[0_25px_60px_-15px_rgba(32,118,199,0.3)] hover:border-primary-blue transition-all duration-300 h-full flex flex-col items-center text-center">
                                {/* Step Number Badge */}
                                <div className="relative mb-6">
                                    <div className={`w-16 h-16 mx-auto rounded-2xl bg-gradient-to-br ${step.color} flex items-center justify-center text-white shadow-lg group-hover:scale-110 group-hover:rotate-6 transition-all duration-300`}>
                                        <step.icon size={28} />
                                    </div>
                                    <div className="absolute -top-2 -right-2 w-7 h-7 bg-white rounded-full font-extrabold text-[10px] flex items-center justify-center shadow-md text-slate-700 border-2 border-slate-50">
                                        {step.step}
                                    </div>
                                </div>

                                <h3 className="text-lg font-bold text-[#1CADA3] mb-3">{step.title}</h3>
                                <p className="text-slate-500 leading-relaxed text-sm">{step.desc}</p>
                            </div>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
}
