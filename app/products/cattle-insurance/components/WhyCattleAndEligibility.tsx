'use client';

import { motion } from 'framer-motion';
import { IconCheck, IconShieldCheck, IconCurrencyRupee, IconClock, IconHeartbeat, IconCloudRain, IconStar } from '@tabler/icons-react';

// ─── Why Cattle Insurance Data ───────────────────────────────────────────────

const benefits = [
    { icon: IconShieldCheck, title: 'Comprehensive Death Coverage', desc: 'Covers death of cattle due to accident, disease, natural calamities, and surgical operations.', color: 'bg-blue-100 text-blue-800' },
    { icon: IconCurrencyRupee, title: 'Affordable Premiums', desc: 'Plans starting as low as ₹200/year. Special subsidies available for small and marginal farmers.', color: 'bg-teal-100 text-teal-800' },
    { icon: IconClock, title: 'Quick Claim Settlement', desc: 'Claims processed within 48 hours of intimation with minimal documentation required.', color: 'bg-indigo-100 text-indigo-800' },
    { icon: IconHeartbeat, title: 'Veterinary Support', desc: 'Access to empaneled veterinary doctors for health certificates and claim verification.', color: 'bg-cyan-100 text-cyan-800' },
    { icon: IconCloudRain, title: 'Natural Calamity Cover', desc: 'Coverage against floods, cyclones, earthquakes, lightning and other natural disasters.', color: 'bg-sky-100 text-sky-800' },
    { icon: IconStar, title: 'Government Subsidy', desc: 'Up to 50% premium subsidy available for BPL farmers and SC/ST category beneficiaries.', color: 'bg-blue-100 text-blue-800' },
];

// ─── Eligibility Criteria Data ────────────────────────────────────────────────

const criteria = [
    { label: 'Age of Animal', desc: 'Cattle: 2 weeks to 10 years | Buffalo: 2 weeks to 12 years | Sheep/Goat: 3 months to 6 years' },
    { label: 'Health Condition', desc: 'Animal must be healthy at the time of insurance and certified by an empaneled veterinarian.' },
    { label: 'Identification', desc: 'Each animal must have an ear tag or permanent mark for identification purposes.' },
    { label: 'Owner Eligibility', desc: 'Individual farmers, cooperatives, dairy farms, and agro-based enterprises are eligible.' },
    { label: 'Vaccination', desc: 'Animals should have received mandatory vaccinations as per government guidelines.' },
    { label: 'Documentation', desc: 'Aadhaar card, land records, and veterinary health certificate required for enrollment.' },
];

// ─── Main Export ──────────────────────────────────────────────────────────────

export default function WhyCattleAndEligibility() {
    return (
        <>
            {/* ── Why Cattle Insurance Section ───────────────────────── */}
            <section className="pt-8 pb-12 bg-white relative overflow-hidden">
                <div className="absolute top-0 right-0 w-1/3 h-full bg-slate-50/50 skew-x-12 translate-x-1/2 -z-0" />
                <div className="relative z-10 max-w-6xl mx-auto px-6 md:px-12">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.7 }}
                        className="text-center mb-10"
                    >
                        <span className="text-primary-blue font-bold tracking-widest uppercase text-sm mb-4 block">Why Choose Us</span>
                        <h2 className="text-3xl md:text-4xl font-extrabold mb-3 bg-linear-to-r from-[#2076C7] to-[#1CADA3] bg-clip-text text-transparent drop-shadow-sm">
                            Why Cattle Insurance Matters
                        </h2>
                        <div className="w-24 h-1 bg-gradient-to-r from-[#2076C7] via-[#1CADA3] to-[#2076C7] mx-auto rounded-full" />
                        <p className="text-slate-500 max-w-2xl mx-auto text-lg mt-6 font-medium leading-relaxed">
                            Livestock is one of the most valuable assets for Indian farmers. Protecting them with insurance ensures financial stability during difficult times.
                        </p>
                    </motion.div>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {benefits.map((b, i) => {
                            const Icon = b.icon;
                            return (
                                <motion.div
                                    key={b.title}
                                    initial={{ opacity: 0, y: 30 }}
                                    whileInView={{ opacity: 1, y: 0 }}
                                    viewport={{ once: true }}
                                    transition={{ duration: 0.5, delay: i * 0.1 }}
                                    className="bg-white rounded-[2rem] p-8 border border-blue-300 hover:shadow-[0_20px_50px_-12px_rgba(32,118,199,0.08)] hover:-translate-y-2 transition-all duration-300 group"
                                >
                                    <div className={`w-14 h-14 rounded-2xl flex items-center justify-center mb-6 ${b.color} group-hover:scale-110 transition-transform shadow-sm`}>
                                        <Icon size={28} strokeWidth={1.8} />
                                    </div>
                                    <h3 className="text-xl font-extrabold text-[#2076C7] mb-3 tracking-tight">{b.title}</h3>
                                    <p className="text-slate-500 text-sm leading-relaxed font-medium">{b.desc}</p>
                                </motion.div>
                            );
                        })}
                    </div>
                </div>
            </section>

            {/* ── Eligibility Section ─────────────────────────────────── */}
            <section className="pt-8 pb-12 bg-[#fafcfe]">
                <div className="max-w-6xl mx-auto px-6 md:px-12">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.7 }}
                        className="text-center mb-12"
                    >
                        <span className="text-primary-blue font-bold tracking-widest uppercase text-xs md:text-sm mb-4 block">Who Can Apply</span>
                        <h2 className="text-3xl md:text-4xl font-extrabold mb-3 bg-linear-to-r from-[#2076C7] to-[#1CADA3] bg-clip-text text-transparent drop-shadow-sm">
                            Insurance Eligibility Criteria
                        </h2>
                        <p className="text-slate-500 text-base md:text-lg leading-relaxed max-w-3xl mx-auto font-medium px-4 md:px-0">
                            Cattle insurance is accessible to all types of livestock owners in India — from small farmers to large dairy enterprises. Check if you qualify:
                        </p>
                    </motion.div>

                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">

                        {/* Left: Criteria Cards */}
                        <div className="grid grid-cols-1 gap-4">
                            {criteria.map((item, i) => (
                                <motion.div
                                    key={item.label}
                                    initial={{ opacity: 0, x: -20 }}
                                    whileInView={{ opacity: 1, x: 0 }}
                                    viewport={{ once: true }}
                                    transition={{ duration: 0.4, delay: i * 0.08 }}
                                    className="flex gap-4 p-5 bg-[#fafcfe] rounded-[1.5rem] border border-blue-50 hover:border-blue-200 hover:shadow-lg hover:shadow-blue-500/5 transition-all group"
                                >
                                    <div className="w-8 h-8 bg-blue-100 rounded-xl flex items-center justify-center shrink-0 mt-0.5 group-hover:bg-blue-600 group-hover:text-white transition-all">
                                        <IconCheck size={18} strokeWidth={3} className="text-blue-600 group-hover:text-white transition-all" />
                                    </div>
                                    <div>
                                        <div className="font-extrabold text-[#2076C7] text-sm mb-1 tracking-tight">{item.label}</div>
                                        <div className="text-slate-500 text-sm leading-relaxed font-medium">{item.desc}</div>
                                    </div>
                                </motion.div>
                            ))}
                        </div>

                        {/* Right: Documents Required */}
                        <motion.div
                            initial={{ opacity: 0, x: 30 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.7 }}
                            className="relative"
                        >
                            <div className="absolute -inset-4 bg-gradient-to-br from-blue-600/10 to-teal-500/10 rounded-[3rem] blur-2xl -z-10" />
                            <div className="bg-gradient-to-br from-[#2076C7] to-[#1CADA3] rounded-[2rem] md:rounded-[3rem] p-6 md:p-10 text-white shadow-2xl relative overflow-hidden">
                                <div className="absolute top-10 right-10 text-white/5 opacity-20 -rotate-12">
                                    <IconShieldCheck size={200} stroke={1} />
                                </div>
                                <div className="flex flex-col md:flex-row justify-between items-center gap-6 mb-8 relative z-10">
                                    <h3 className="text-2xl md:text-3xl font-extrabold tracking-tight text-center md:text-left">Documents Required</h3>
                                </div>
                                <ul className="space-y-6 relative z-10">
                                    {[
                                        'Aadhaar Card / Voter ID (owner identity proof)',
                                        'Bank Passbook (for premium/claim transfer)',
                                        'Ear Tag Number / Animal Identification',
                                        'Veterinary Health Certificate',
                                        'Land Records / Khasra (for farming eligibility)',
                                        'Passport-size Photograph of Owner',
                                        'Recent Photograph of Animal',
                                    ].map((doc, i) => (
                                        <li key={i} className="flex items-start gap-4 text-sm font-bold group">
                                            <div className="w-6 h-6 bg-white/20 rounded-lg flex items-center justify-center shrink-0 mt-0.5 group-hover:bg-white group-hover:text-blue-600 transition-all duration-300">
                                                <span className="text-[10px] font-black">{i + 1}</span>
                                            </div>
                                            <span className="leading-relaxed opacity-90 group-hover:opacity-100 transition-opacity">{doc}</span>
                                        </li>
                                    ))}
                                </ul>

                                <div className="mt-12 p-6 bg-white/10 backdrop-blur-md rounded-2xl border border-white/20 text-sm relative z-10">
                                    <div className="flex gap-3">
                                        <div className="shrink-0 font-black text-white">💡</div>
                                        <p className="font-bold leading-relaxed">
                                            Documents <strong>must be clear</strong> and submitted via our online portal or through an authorized Infinity Arthvishva agent.
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </motion.div>
                    </div>
                </div>
            </section>
        </>
    );
}
