"use client";

import { motion } from "framer-motion";
import { ShieldCheck, ArrowUpRight, Scale, BadgePercent, Sparkles, ArrowRight } from "lucide-react";

const benefits = [
    {
        section: "Section 80C",
        title: "Premium Deductions",
        desc: "Deduct up to ₹1.5 Lakh annually from your taxable income for premiums paid for self, spouse, or children.",
        limit: "₹1.5 Lakh Limit",
        icon: ShieldCheck,
        color: "#2076C7"
    },
    {
        section: "Section 10(10D)",
        title: "E-E-E Tax Status",
        desc: "Entire Maturity and Death benefits are 100% Tax-Free, provided annual premium is <10% of sum assured.",
        limit: "100% Tax Free",
        icon: ArrowUpRight,
        color: "#1CADA3"
    },
    {
        section: "Section 80D",
        title: "Health Riders",
        desc: "Save up to ₹25,000 extra for Critical Illness or Medical riders opted with your life insurance policy.",
        limit: "Extra ₹25k Saving",
        icon: Sparkles,
        color: "#1CADA3"
    },
    {
        section: "Wealth Transfer",
        title: "MWP Act Protection",
        desc: "Secure payouts under the Married Women's Property Act, ensuring money stays safe from any legal creditors.",
        limit: "Asset Protection",
        icon: Scale,
        color: "#2076C7"
    }
];

export default function TaxBenefits() {
    return (
        <section className="py-10 md:py-16 relative overflow-hidden bg-white" id="tax-benefits">
            {/* Ambient background glows */}
            <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-[#2076C7]/5 rounded-full blur-[120px] -translate-y-1/2 translate-x-1/2" />

            <div className="container-custom relative z-10 px-4 md:px-6">
                <div className="text-center max-w-4xl mx-auto mb-8 md:mb-12">
                    <motion.span
                        initial={{ opacity: 0, y: 10 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        className="text-[#2076C7] font-black uppercase text-[10px] md:text-xs tracking-[0.4em] mb-4 block font-sans"
                    >
                        YOUR TAX SAVINGS
                    </motion.span>
                    <motion.h2
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        className="text-3xl md:text-5xl lg:text-6xl font-black mb-6 md:mb-8 text-[#2076C7] leading-tight font-sans"
                    >
                        Save More with <span className="text-transparent bg-clip-text bg-linear-to-r from-[#2076C7] via-[#1CADA3] to-[#2076C7] bg-[length:200%_auto] animate-gradient-x">Tax Privileges</span>
                    </motion.h2>
                    <p className="text-gray-500 text-lg md:text-xl leading-relaxed font-medium font-sans">
                        Maximize your savings for your family's future with simple tax planning built into every policy.
                    </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-6xl mx-auto px-4 md:px-0">
                    {benefits.map((benefit, idx) => (
                        <motion.div
                            key={idx}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: idx * 0.05 }}
                            className="bg-white p-8 rounded-[2.5rem] border border-gray-100 shadow-[0_15px_35px_rgba(0,0,0,0.02)] flex flex-col items-center text-center group hover:border-[#2076C7]/20 hover:shadow-[0_30px_60px_rgba(32,118,199,0.06)] transition-all duration-700 relative overflow-hidden h-full"
                        >
                            {/* Accent bar */}
                            <div className="absolute top-0 left-0 w-full h-1 bg-linear-to-r from-[#2076C7] to-[#1CADA3] scale-x-0 group-hover:scale-x-100 transition-transform duration-700 origin-left" />

                            <div className="mb-6 p-4 bg-slate-50 rounded-2xl group-hover:bg-[#2076C7] transition-all duration-700">
                                <benefit.icon className="w-6 h-6 group-hover:text-white transition-colors" style={{ color: benefit.color }} />
                            </div>

                            <span className="text-[9px] font-black uppercase tracking-[0.2em] text-[#1CADA3] mb-3">
                                {benefit.section}
                            </span>
                            <h3 className="text-lg font-black text-[#2076C7] mb-3 leading-tight">
                                {benefit.title}
                            </h3>
                            <p className="text-gray-400 text-xs leading-relaxed mb-6 flex-grow font-medium">
                                {benefit.desc}
                            </p>
                            <div className="w-full py-3 bg-linear-to-r from-[#2076C7]/5 to-[#1CADA3]/5 border border-[#2076C7]/10 rounded-xl font-black text-[10px] text-[#2076C7] tracking-wider uppercase">
                                {benefit.limit}
                            </div>
                        </motion.div>
                    ))}
                </div>

                {/* Tax savings CTA */}
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="mt-12 p-8 md:p-12 bg-linear-to-r from-[#2076C7] via-[#1CADA3] to-[#2076C7] bg-[length:200%_auto] animate-gradient-x rounded-[3rem] text-center max-w-5xl mx-auto text-white relative overflow-hidden shadow-2xl shadow-[#2076C7]/20"
                >
                    <div className="absolute top-0 right-0 w-64 h-64 bg-white/5 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2" />
                    <div className="relative z-10 flex flex-col md:flex-row items-center justify-between gap-8">
                        <div className="text-left max-w-xl">
                            <h3 className="text-2xl md:text-3xl font-black mb-3 text-white">Smart Tax Planning</h3>
                            <p className="text-white/80 text-sm md:text-base font-medium leading-relaxed">
                                A ₹1 Crore term plan not only protects your family but also saves you ₹46,800 annually in taxes.
                            </p>
                        </div>
                        <button
                            suppressHydrationWarning
                            className="whitespace-nowrap px-8 py-4 bg-white text-[#2076C7] rounded-xl font-black text-sm hover:scale-105 transition-all active:scale-95 shadow-xl flex items-center gap-2"
                        >
                            Calculate Savings <ArrowRight className="w-4 h-4" />
                        </button>
                    </div>
                </motion.div>
            </div>
        </section>
    );
};

