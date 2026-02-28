'use client';

import { motion } from 'framer-motion';
import { IconFileText, IconPhone, IconClipboardCheck, IconCurrencyRupee, IconArrowRight } from '@tabler/icons-react';

const steps = [
    {
        step: '01',
        icon: IconPhone,
        title: 'Intimate the Insurer',
        desc: 'Report the death of the animal within 24 hours to the insurance company or Infinity Arthvishva helpline. Call or use our online portal.',
        color: 'bg-blue-100 text-blue-600',
    },
    {
        step: '02',
        icon: IconClipboardCheck,
        title: 'Veterinary Examination',
        desc: 'An empaneled veterinary doctor will inspect the animal, note the cause of death, and issue a post-mortem report.',
        color: 'bg-teal-100 text-teal-600',
    },
    {
        step: '03',
        icon: IconFileText,
        title: 'Submit Documents',
        desc: 'Submit claim form along with ear tag, policy document, vet certificate, death certificate and your bank details.',
        color: 'bg-indigo-100 text-indigo-600',
    },
    {
        step: '04',
        icon: IconCurrencyRupee,
        title: 'Claim Settlement',
        desc: 'Post document verification, the claim amount is directly transferred to your bank account within 48 hours.',
        color: 'bg-cyan-100 text-cyan-600',
    },
];

export default function ClaimsProcess() {
    return (
        <section className="pt-8 pb-12 bg-white relative">
            <div className="max-w-6xl mx-auto px-6 md:px-12">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.7 }}
                    className="text-center mb-10"
                >
                    <span className="text-primary-blue font-bold tracking-widest uppercase text-xs md:text-sm mb-4 block">Hassle-Free</span>
                    <h2 className="text-3xl md:text-4xl font-extrabold mb-3 bg-linear-to-r from-[#2076C7] to-[#1CADA3] bg-clip-text text-transparent drop-shadow-sm">
                        Seamless Claims Process
                    </h2>
                    <p className="text-slate-500 max-w-2xl mx-auto text-base md:text-lg mt-6 font-medium leading-relaxed px-4 md:px-0">
                        Our streamlined 4-step claims process ensures you receive your settlement quickly with minimum paperwork.
                    </p>
                </motion.div>

                {/* Steps */}
                <div className="relative">
                    {/* Connector line */}
                    <div className="hidden lg:block absolute top-[2.5rem] left-[15%] right-[15%] h-1 bg-slate-100 -z-0" />
                    <div className="hidden lg:block absolute top-[2.5rem] left-[15%] right-[15%] h-1 bg-gradient-to-r from-blue-300 to-teal-300 -z-0 opacity-50" />

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 relative z-10">
                        {steps.map((step, i) => {
                            const Icon = step.icon;
                            return (
                                <motion.div
                                    key={step.step}
                                    initial={{ opacity: 0, y: 30 }}
                                    whileInView={{ opacity: 1, y: 0 }}
                                    viewport={{ once: true }}
                                    transition={{ duration: 0.5, delay: i * 0.15 }}
                                    className="relative text-center group"
                                >
                                    {/* Step number circle */}
                                    <div className="relative inline-flex items-center justify-center mb-8">
                                        <div className={`w-20 h-20 rounded-3xl ${step.color} flex items-center justify-center shadow-[0_15px_30px_-5px_rgba(32,118,199,0.15)] border-4 border-white transition-transform duration-500 group-hover:rotate-[10deg]`}>
                                            <Icon size={30} strokeWidth={2} />
                                        </div>
                                        <span className="absolute -top-3 -right-3 w-8 h-8 bg-slate-800 text-white text-xs font-extrabold rounded-full flex items-center justify-center shadow-lg border-2 border-white">
                                            {step.step}
                                        </span>
                                    </div>

                                    <h3 className="text-xl font-extrabold text-[#2076C7] mb-4 tracking-tight">{step.title}</h3>
                                    <p className="text-slate-500 text-sm leading-relaxed font-medium px-4">{step.desc}</p>

                                    {i < steps.length - 1 && (
                                        <div className="lg:hidden flex justify-center mt-6">
                                            <IconArrowRight size={24} className="text-slate-300 rotate-90" />
                                        </div>
                                    )}
                                </motion.div>
                            );
                        })}
                    </div>
                </div>

                {/* Important note */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6, delay: 0.4 }}
                    className="mt-20 p-8 bg-white rounded-[2.5rem] shadow-[0_32px_64px_-16px_rgba(32,118,199,0.08)] border border-blue-50 relative overflow-hidden text-center"
                >
                    <div className="absolute top-0 right-6 p-1 bg-red-500 text-white text-[8px] font-extrabold uppercase tracking-widest px-4 rounded-b-xl shadow-md">Critical Timeline</div>
                    <p className="text-slate-600 font-bold text-sm md:text-base leading-relaxed px-4 md:px-8">
                        ⚠️ <strong>Crucial Intimation Policy:</strong> Death of the animal must be reported within <strong>24 hours</strong>. Delay in reporting without a valid reason can lead to claim complications. Please do not dispose of the carcass before inspection.
                    </p>
                </motion.div>
            </div>
        </section>
    );
}
