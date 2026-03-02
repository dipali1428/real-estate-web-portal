'use client';

import { motion } from 'framer-motion';
import { IconShieldCheck, IconCurrencyRupee, IconClock, IconHeartbeat, IconReceipt, IconBuildingBank, IconStar, IconWorld } from '@tabler/icons-react';

const benefits = [
    { icon: IconShieldCheck, title: 'Zero Pre-payment Penalty', desc: 'Repay your loan early without any extra charges — save on interest and become debt-free faster.', color: 'bg-blue-100 text-blue-700' },
    { icon: IconCurrencyRupee, title: 'Section 80E Tax Benefit', desc: 'Claim 100% deduction on interest paid for up to 8 years — available to the student or parents.', color: 'bg-teal-100 text-teal-700' },
    { icon: IconClock, title: 'Moratorium Period', desc: 'No EMI during your course + 1 year. Focus on studies, not repayment.', color: 'bg-indigo-100 text-indigo-700' },
    { icon: IconHeartbeat, title: 'Insurance Cover Included', desc: 'Life and health insurance bundled with select loan products to protect your financial future.', color: 'bg-sky-100 text-sky-700' },
    { icon: IconReceipt, title: 'Covers All Expenses', desc: 'Tuition, accommodation, travel, books, equipment, exam fees — everything is covered.', color: 'bg-violet-100 text-violet-700' },
    { icon: IconBuildingBank, title: 'Direct Disbursal', desc: 'Funds sent directly to institution — simplifying visa & admission fee requirements.', color: 'bg-cyan-100 text-cyan-700' },
    { icon: IconStar, title: 'Government Subsidy Available', desc: 'Interest subsidy for EWS students under Central Sector Interest Subsidy (CSIS) scheme.', color: 'bg-amber-100 text-amber-700' },
    { icon: IconWorld, title: '40+ Country Coverage', desc: 'Loans available for top universities in USA, UK, Canada, Australia, Germany, Ireland & more.', color: 'bg-emerald-100 text-emerald-700' },
];

export default function BenefitsSection() {
    return (
        <>
            {/* ── Key Benefits ──────────────────────────────────────────── */}
            <section className="py-12 bg-white relative overflow-hidden">
                <div className="absolute top-0 right-0 w-1/3 h-full bg-slate-50/50 skew-x-12 translate-x-1/2 -z-0" />
                <div className="relative z-10 max-w-6xl mx-auto px-6 md:px-12">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="text-center mb-10"
                    >
                        <span className="text-[#2076C7] font-black tracking-widest uppercase text-xs mb-4 block">Why Choose Us</span>
                        <h2 className="text-3xl md:text-4xl font-extrabold mb-4 bg-gradient-to-r from-[#2076C7] to-[#1CADA3] bg-clip-text text-transparent">
                            Benefits of Our Education Loan
                        </h2>
                        <div className="w-24 h-1 bg-gradient-to-r from-[#2076C7] via-[#1CADA3] to-[#2076C7] mx-auto rounded-full mb-4" />
                        <p className="text-slate-500 max-w-xl mx-auto font-medium text-base leading-relaxed">
                            We go beyond just financing — every product is designed to give you maximum flexibility and financial freedom.
                        </p>
                    </motion.div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                        {benefits.map((b, i) => {
                            const Icon = b.icon;
                            return (
                                <motion.div
                                    key={b.title}
                                    initial={{ opacity: 0, y: 30 }}
                                    whileInView={{ opacity: 1, y: 0 }}
                                    viewport={{ once: true }}
                                    transition={{ duration: 0.4, delay: i * 0.07 }}
                                    className="bg-white rounded-[2rem] p-6 border border-slate-100 hover:border-blue-200 hover:shadow-[0_20px_50px_-12px_rgba(32,118,199,0.1)] hover:-translate-y-2 transition-all duration-300 group"
                                >
                                    <div className={`w-12 h-12 rounded-2xl flex items-center justify-center mb-4 ${b.color} group-hover:scale-110 transition-transform shadow-sm`}>
                                        <Icon size={24} strokeWidth={1.8} />
                                    </div>
                                    <h3 className="text-sm font-extrabold text-[#2076C7] mb-2 tracking-tight leading-snug">{b.title}</h3>
                                    <p className="text-slate-500 text-xs leading-relaxed font-bold">{b.desc}</p>
                                </motion.div>
                            );
                        })}
                    </div>
                </div>
            </section>

        </>
    );
}
