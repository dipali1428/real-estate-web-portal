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
        <section className="py-8 bg-white relative">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-12">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.7 }}
                    className="text-center mb-10"
                >
                    <h2 className="text-3xl md:text-4xl font-extrabold mb-3 bg-linear-to-r from-[#2076C7] to-[#1CADA3] bg-clip-text text-transparent drop-shadow-sm">
                        Seamless Claims Process
                    </h2>
                    <p className="text-slate-500 max-w-2xl mx-auto text-base md:text-lg mt-6 font-medium leading-relaxed px-4 md:px-0">
                        Our streamlined 4-step claims process ensures you receive your settlement quickly with minimum paperwork.
                    </p>
                </motion.div>

                {/* Steps */}
                <div className="relative">
                    {/* Connector line (Desktop) */}
                    <div className="hidden lg:block absolute top-10 left-[10%] right-[10%] h-[2px] bg-[#1CADA3]/30 -z-0" />

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
                                        <div className={`w-20 h-20 rounded-full ${step.color} flex items-center justify-center shadow-[0_15px_30px_-5px_rgba(32,118,199,0.15)] border-4 border-white transition-transform duration-500 group-hover:rotate-[10deg]`}>
                                            <Icon size={30} strokeWidth={2} />
                                        </div>
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

                {/* Important note - Minimal & Centered */}
                <motion.div
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6, delay: 0.3 }}
                    className="mt-16 flex justify-center"
                >
                    <div className="max-w-2xl px-6 py-3 bg-slate-50/50 rounded-full border border-slate-100/50 flex items-center gap-3 shadow-sm">
                        <div className="w-1.5 h-1.5 rounded-full bg-red-500 animate-pulse shrink-0" />
                        <p className="text-slate-500 font-bold text-[10px] md:text-[11px] leading-tight tracking-wide text-center">
                            <span className="text-red-600 uppercase tracking-widest mr-2">Mandatory Reporting Rule:</span>
                            Death of the animal must be reported within 24 hours. Delay in reporting without a valid reason can lead to claim complications. Please do not dispose of the carcass before inspection.
                        </p>
                    </div>
                </motion.div>
            </div>
        </section>
    );
}
