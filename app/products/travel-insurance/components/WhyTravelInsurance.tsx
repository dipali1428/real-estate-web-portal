'use client';

import { motion } from 'framer-motion';
import { IconShieldCheck, IconWorld, IconCurrencyRupee, IconClock, IconActivity, IconH3 } from '@tabler/icons-react';
import newTIImg from '../assets/new_TI.jpg';

const benefits = [
    {
        title: 'Instant Digital Issuance',
        desc: 'Receive your policy instantly via email. Verified coverage in less than 2 minutes.',
        icon: IconClock,
        color: 'text-[#2076C7]',
    },
    {
        title: 'Global Medical Network',
        desc: 'Access to 50,000+ top-rated hospitals and healthcare providers worldwide.',
        icon: IconWorld,
        color: 'text-[#1CADA3]',
    },
    {
        title: 'Cashless Hospitalization',
        desc: 'Direct settlement of medical bills with hospitals for seamless emergency care.',
        icon: IconShieldCheck,
        color: 'text-[#2076C7]',
    },
    {
        title: '24/7 Global Assistance',
        desc: 'Dedicated support team available around the clock for emergency coordination.',
        icon: IconActivity,
        color: 'text-[#1CADA3]',
    }
];

import WaveDivider from './WaveDivider';

export default function WhyTravelInsurance() {
    return (
        <section className="py-24 bg-slate-50 overflow-hidden">
            <div className="max-w-7xl mx-auto px-6">
                <div className="flex flex-col lg:flex-row gap-16 items-center">
                    {/* Left Side Content */}
                    <motion.div
                        initial={{ opacity: 0, x: -50 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        className="lg:w-1/2 text-center lg:text-left"
                    >
                        <span className="text-[#2076C7] font-bold tracking-widest uppercase text-xs md:text-sm mb-4 block">Why Choose Us?</span>
                        <h2 className="text-3xl md:text-4xl font-extrabold mb-3 bg-linear-to-r from-[#2076C7] to-[#1CADA3] bg-clip-text text-transparent drop-shadow-sm">
                                    Why Travel Insurance?
                    </h2>
                        <div className="w-24 h-1 bg-gradient-to-r from-[#2076C7] via-[#1CADA3] to-[#2076C7] rounded-full mb-6 mx-auto lg:mx-0" />
                        <p className="text-base md:text-lg text-slate-600 mb-10 leading-relaxed max-w-xl mx-auto lg:mx-0">
                            Travel insurance provides coverage for unexpected events during travel including medical emergencies, trip cancellation, lost baggage, flight delays, and personal liabilities.
                        </p>

                        <div className="space-y-8">
                            {benefits.map((benefit, idx) => (
                                <motion.div
                                    key={idx}
                                    initial={{ opacity: 0, y: 20 }}
                                    whileInView={{ opacity: 1, y: 0 }}
                                    viewport={{ once: true }}
                                    transition={{ delay: idx * 0.1 }}
                                    className="flex flex-col sm:flex-row items-center sm:items-start text-center sm:text-left gap-4 sm:gap-5 group"
                                >
                                    <div className={`mt-1 p-2.5 rounded-xl transition-colors ${benefit.color} bg-white shadow-md group-hover:scale-110 duration-300`}>
                                        <benefit.icon size={28} stroke={2} />
                                    </div>
                                    <div>
                                        <h4 className="text-lg md:text-xl font-bold text-[#1CADA3] mb-1 group-hover:text-[#2076C7] transition-colors">
                                            {benefit.title}
                                        </h4>
                                        <p className="text-sm md:text-base text-slate-500 leading-relaxed">
                                            {benefit.desc}
                                        </p>
                                    </div>
                                </motion.div>
                            ))}
                        </div>
                    </motion.div>

                    {/* Right Side Visual Element */}
                    <motion.div
                        initial={{ opacity: 0, scale: 0.9, rotate: 2 }}
                        whileInView={{ opacity: 1, scale: 1, rotate: 0 }}
                        viewport={{ once: true }}
                        className="lg:w-1/2 relative"
                    >
                        <div className="relative z-10 rounded-[2rem] lg:rounded-[2.5rem] overflow-hidden shadow-2xl border-4 md:border-8 border-white">
                            <img
                                src={newTIImg.src}
                                alt="Comprehensive Travel Coverage"
                                className="w-full h-[300px] sm:h-[450px] lg:h-[600px] object-cover"
                            />
                        </div>

                        {/* Background Decorative Rings */}
                        <div className="absolute -top-10 -right-10 w-64 h-64 bg-[#2076C7]/10 rounded-full blur-3xl opacity-50 -z-10 animate-pulse" />
                        <div className="absolute -bottom-10 -left-10 w-64 h-64 bg-[#1CADA3]/10 rounded-full blur-3xl opacity-50 -z-10 animate-pulse transition-delay-1000" />
                    </motion.div>
                </div>
            </div>
            <WaveDivider />
        </section>
    );
}
