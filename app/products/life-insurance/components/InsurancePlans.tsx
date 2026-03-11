"use client";

import { motion } from "framer-motion";
import {
    ShieldCheck, Zap, Heart, Coins,
    GraduationCap, Anchor, Gem, ArrowRight,
    TrendingUp, Shield, HelpCircle, Star
} from "lucide-react";

const plans = [
    {
        title: "Retirement & Pension",
        tag: "Guaranteed Income",
        desc: "Secure a lifelong pension and build a tax-free corpus for your golden years through India's most trusted pension schemes.",
        icon: <Anchor className="w-8 h-8" />,
        color: "teal",
        highlights: ["Immediate/Deferred Pension", "Joint Life Cover", "Safe & Tax-Free Corpus"]
    },
    {
        title: "Wealth Creation (ULIP)",
        tag: "High Growth",
        desc: "Maximize wealth with market-linked returns (Equity/Debt) combined with a significant life cover and fund-switching flexibility.",
        icon: <TrendingUp className="w-8 h-8" />,
        color: "blue",
        isGrowth: true,
        highlights: ["Wealth + Protection", "Free Fund Switching", "Tax-Free Maturity"]
    },
    {
        title: "Standard Term Plan",
        tag: "High Cover",
        desc: "The foundation of financial security. Get the highest life cover (up to ₹25 Cr) at the lowest possible premium rates.",
        icon: <ShieldCheck className="w-8 h-8" />,
        color: "blue",
        highlights: ["₹1 Cr+ Coverage", "Instant Digital Issuance", "Low Premium Cost"]
    },
    {
        title: "Zero Cost Term",
        tag: "Most Popular",
        desc: "Get 100% of your paid premiums back if you survive the term. Pure protection with a full refund benefit.",
        icon: <Zap className="w-8 h-8" />,
        color: "teal",
        isPopular: true,
        highlights: ["Full Premium Refund", "Cover till Age 100", "Asset Backed Security"]
    },
    {
        title: "Child Future Plan",
        tag: "Education Fund",
        desc: "Ensure your child's education and marriage goals are funded even if you're not around with built-in premium waivers.",
        icon: <GraduationCap className="w-8 h-8" />,
        color: "blue",
        highlights: ["Guaranteed Payouts", "Waiver of Premium", "Inflation Adjusted Payouts"]
    },
    {
        title: "Whole Life Legacy",
        tag: "Generation Wealth",
        desc: "Secure yourself for life through coverage until age 100. The ultimate way to transfer tax-free wealth to your children.",
        icon: <Gem className="w-8 h-8" />,
        color: "teal",
        highlights: ["Lifetime Protection", "Wealth Transfer Optimized", "High Survival Benefits"]
    },
    {
        title: "Money Back Plan",
        tag: "Liquidity Plus",
        desc: "Receive periodic survival payouts every few years while your full death cover remains intact throughout the policy.",
        icon: <Coins className="w-8 h-8" />,
        color: "blue",
        highlights: ["Regular Cash Flow", "Death Benefit Intact", "Safe Returns"]
    },
    {
        title: "Guaranteed Income",
        tag: "Fixed ROI",
        desc: "Lock-in high, fully guaranteed returns for 20-30 years. Safest alternative to FDs with tax-free monthly income.",
        icon: <Star className="w-8 h-8" />,
        color: "teal",
        highlights: ["Fixed Yearly Returns", "Section 10(10D) Benefit", "No Market Risk"]
    }
];

const InsurancePlans = () => {
    return (
        <section className="py-24 md:py-32 bg-white relative overflow-hidden font-sans" id="plans">
            {/* Background Accents */}
            <div className="absolute top-0 right-0 w-[800px] h-[800px] bg-[#2076C7]/3 rounded-full blur-[140px] pointer-events-none" />
            <div className="absolute bottom-0 left-0 w-[800px] h-[800px] bg-[#1CADA3]/3 rounded-full blur-[140px] pointer-events-none" />

            <div className="container-custom relative z-10 px-4 md:px-6">
                <div className="text-center max-w-4xl mx-auto mb-20">
                    <motion.span
                        initial={{ opacity: 0, y: 10 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        className="text-[#1CADA3] font-black uppercase text-xs md:text-sm tracking-[0.4em] mb-4 block"
                    >
                        Insurance Universe
                    </motion.span>
                    <h2 className="text-4xl md:text-7xl font-black text-[#2076C7] mb-8 leading-[1.1] tracking-tight">
                        Explore Every Type of <br />
                        <span className="text-transparent bg-clip-text bg-linear-to-r from-[#2076C7] via-[#1CADA3] to-[#2076C7] bg-[length:200%_auto] animate-gradient-x">Life Protection.</span>
                    </h2>
                    <p className="font-sans text-gray-500 text-lg md:text-xl font-medium max-w-2xl mx-auto">
                        From basic term plans to high-yield investment strategies, find the perfect blueprint for your financial legacy.
                    </p>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8">
                    {plans.map((plan, idx) => (
                        <motion.div
                            key={idx}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: idx * 0.05 }}
                            whileHover={{ y: -8 }}
                            className="bg-white p-8 rounded-[2.5rem] border border-slate-100 shadow-[0_4px_25px_rgba(0,0,0,0.02)] hover:shadow-[0_40px_80px_rgba(32,118,199,0.08)] transition-all duration-500 group relative overflow-hidden"
                        >
                            {/* Popular/Growth Badge */}
                            {plan.isPopular && (
                                <div className="absolute top-6 right-6 z-20">
                                    <div className="bg-[#FF4D4D] text-white text-[8px] font-black uppercase tracking-widest px-3 py-1 rounded-full shadow-lg animate-pulse">
                                        Most Popular
                                    </div>
                                </div>
                            )}
                            {plan.isGrowth && (
                                <div className="absolute top-6 right-6 z-20">
                                    <div className="bg-[#1CADA3] text-white text-[8px] font-black uppercase tracking-widest px-3 py-1 rounded-full shadow-lg">
                                        High Growth
                                    </div>
                                </div>
                            )}

                            {/* Card Accent */}
                            <div className={`absolute top-0 right-0 w-24 h-24 blur-[60px] opacity-20 transition-opacity group-hover:opacity-40 ${plan.color === 'blue' ? 'bg-[#2076C7]' : 'bg-[#1CADA3]'}`} />

                            <div className={`w-14 h-14 rounded-2xl flex items-center justify-center mb-8 transition-transform duration-500 group-hover:scale-110 ${plan.color === 'blue' ? 'bg-blue-50 text-[#2076C7]' : 'bg-teal-50 text-[#1CADA3]'}`}>
                                {plan.icon}
                            </div>

                            <span className="font-sans text-xs md:text-sm font-black uppercase tracking-[0.2em] text-[#2076C7] mb-2 block">{plan.tag}</span>
                            <h3 className="font-sans text-xl md:text-2xl font-black text-[#0B1C2E] mb-4 group-hover:text-[#1CADA3] transition-colors">{plan.title}</h3>
                            <p className="font-sans text-sm md:text-[15px] text-gray-500 font-medium leading-relaxed mb-8 min-h-[4.5rem]">{plan.desc}</p>

                            <div className="space-y-3 mb-8">
                                {plan.highlights.map((h, i) => (
                                    <div key={i} className="flex items-center gap-2">
                                        <div className={`w-1.5 h-1.5 rounded-full ${plan.color === 'blue' ? 'bg-[#2076C7]' : 'bg-[#1CADA3]'}`} />
                                        <span className="font-sans text-xs md:text-sm font-bold text-slate-600">{h}</span>
                                    </div>
                                ))}
                            </div>

                            <button
                                suppressHydrationWarning
                                className="font-sans flex items-center gap-2 text-xs font-black uppercase tracking-[0.2em] text-[#2076C7] group-hover:gap-4 transition-all"
                            >
                                Learn More <ArrowRight className="w-5 h-5" />
                            </button>
                        </motion.div>
                    ))}
                </div>

                <div className="mt-20 p-10 rounded-[3rem] bg-linear-to-br from-[#1CADA3] to-[#2076C7] text-white flex flex-col md:flex-row items-center justify-between gap-10 shadow-2xl relative overflow-hidden">
                    {/* Decorative Elements */}
                    <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full blur-[80px] -mr-32 -mt-32" />

                    <div className="relative z-10 max-w-xl text-center md:text-left">
                        <h4 className="font-sans text-2xl md:text-3xl font-black mb-4">Not sure which plan is right for you?</h4>
                        <p className="font-sans text-white/80 font-medium text-sm md:text-base">Use our Premium Audit Hub to find the ideal coverage based on your current age, income, and lifestyle habits.</p>
                    </div>

                    <div className="relative z-10">
                        <button
                            suppressHydrationWarning
                            onClick={() => document.getElementById('calculator')?.scrollIntoView({ behavior: 'smooth' })}
                            className="font-sans px-10 py-5 bg-white text-[#2076C7] rounded-2xl font-black text-xs uppercase tracking-widest shadow-xl hover:bg-slate-50 hover:scale-105 transition-all active:scale-95 flex items-center gap-3"
                        >
                            Quick Calculator <ArrowRight className="w-5 h-5" />
                        </button>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default InsurancePlans;
