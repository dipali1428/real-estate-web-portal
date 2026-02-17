'use client';

import { motion } from 'framer-motion';
import {
    TrendingUp,
    ShieldCheck,
    Zap,
    Lock,
    Calendar,
    ArrowRightCircle,
    PiggyBank,
    Coins
} from 'lucide-react';

const benefits = [
    {
        title: "Power of Compounding",
        description: "Start early to let your money grow exponentially over decades, building a substantial retirement corpus.",
        icon: TrendingUp,
    },
    {
        title: "Tax Efficiency",
        description: "Save up to ₹2,00,000 annually under Sec 80C and Sec 80CCD(1B), one of the best tax-saving tools.",
        icon: ShieldCheck,
    },
    {
        title: "Professional Management",
        description: "Your funds are managed by PFRDA-regulated pension fund managers for optimized risk-adjusted returns.",
        icon: Zap,
    },
    {
        title: "Diverse Asset Mix",
        description: "Allocate across Equity, Corporate Debt, and Government Securities based on your risk appetite.",
        icon: Coins,
    }
];

const withdrawalRules = [
    {
        category: "At Retirement (60+)",
        rules: [
            "Minimum 40% must be used for Annuity (Monthly Pension).",
            "Up to 60% can be withdrawn as a tax-free Lump Sum.",
            "If corpus is ≤ ₹5 Lakh, 100% can be withdrawn as a lump sum."
        ],
        icon: Calendar,
        gradient: "from-[#2076C7] to-[#1CADA3]"
    },
    {
        category: "Partial Withdrawal",
        rules: [
            "Allowed after 3 years of joining NPS.",
            "Maximum 25% of self-contribution can be withdrawn.",
            "Reasons: Higher education, marriage, home purchase, or medical emergencies."
        ],
        icon: ArrowRightCircle,
        gradient: "from-[#1CADA3] to-[#2076C7]"
    },
    {
        category: "Premature Exit (Before 60)",
        rules: [
            "Allowed after 5 or 10 years depending on sector.",
            "Minimum 80% must be used for Annuity.",
            "If corpus is ≤ ₹2.5 Lakh, 100% can be withdrawn."
        ],
        icon: Lock,
        gradient: "from-[#2076C7] to-[#1CADA3]"
    }
];

export default function NPSWithdrawal() {
    return (
        <section className="relative py-12 bg-white overflow-hidden">
            {/* Aesthetic Background Elements */}
            <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none">
                <div className="absolute inset-0 bg-dot-pattern opacity-[0.02]" />
                <div className="absolute top-[-10%] right-[-5%] w-[40%] h-[40%] bg-blue-50/50 rounded-full blur-[100px]" />
                <div className="absolute bottom-[-10%] left-[-5%] w-[40%] h-[40%] bg-teal-50/50 rounded-full blur-[100px]" />
            </div>

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
                {/* Strategies for a Secure Retirement Section */}
                <div className="text-center mb-24">
                    <motion.h2
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="text-3xl md:text-4xl font-extrabold mb-3 bg-gradient-to-r from-[#2076C7] via-[#1CADA3] to-[#2076C7] bg-clip-text text-transparent bg-[length:200%_auto] animate-gradient-flow drop-shadow-sm tracking-tight pb-1"
                    >
                        Strategies for a Secure Retirement
                    </motion.h2>
                    <div className="w-24 h-1 mx-auto bg-gradient-to-r from-[#2076C7] to-[#1CADA3] rounded-full mb-4 shadow-lg shadow-blue-500/20"></div>

                    <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-10">
                        {benefits.map((benefit, index) => (
                            <motion.div
                                key={index}
                                initial={{ opacity: 0, y: 30 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                whileHover={{ y: -15, scale: 1.02 }}
                                viewport={{ once: true }}
                                transition={{ delay: index * 0.1, duration: 0.5, type: "spring", stiffness: 100 }}
                                className="relative bg-white/40 backdrop-blur-3xl p-6 pt-10 rounded-[2rem] shadow-[0_10px_30px_-10px_rgba(0,0,0,0.05)] hover:shadow-[0_20px_60px_-15px_rgba(32,118,199,0.1)] transition-all duration-500 border-2 border-blue-100 flex flex-col items-center justify-start text-center group overflow-hidden h-full"
                            >


                                <div className="relative z-10 flex flex-col items-center">
                                    <div className="w-14 h-14 bg-gradient-to-br from-[#2076C7] to-[#1CADA3] rounded-[1rem] flex items-center justify-center mb-6 shadow-[0_10px_25px_-5px_rgba(32,118,199,0.2)] group-hover:rotate-6 transition-transform duration-500 ring-2 ring-white/30">
                                        <benefit.icon className="w-6 h-6 text-white" />
                                    </div>
                                    <h3 className="text-2xl font-black text-slate-700 mb-5 tracking-tight">{benefit.title}</h3>
                                    <p className="text-slate-600 leading-relaxed text-sm font-medium">{benefit.description}</p>
                                </div>
                            </motion.div>
                        ))}
                    </div>

                </div>

                {/* NPS Withdrawal Section */}
                <div className="mt-40">
                    <div className="text-center mb-24">
                        <motion.h2
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            className="text-3xl md:text-4xl font-extrabold mb-3 bg-gradient-to-r from-[#2076C7] via-[#1CADA3] to-[#2076C7] bg-clip-text text-transparent bg-[length:200%_auto] animate-gradient-flow drop-shadow-sm tracking-tight pb-1"
                        >
                            NPS Withdrawal & Exit Rules
                        </motion.h2>
                        <div className="w-24 h-1 mx-auto bg-gradient-to-r from-[#2076C7] to-[#1CADA3] rounded-full mb-4 shadow-lg shadow-blue-500/20"></div>
                        <p className="text-slate-900 max-w-2xl mx-auto font-medium text-lg leading-relaxed">
                            Transparent and flexible exit rules tailored for your financial milestones.
                        </p>
                    </div>

                    <div className="grid lg:grid-cols-3 gap-10">
                        {withdrawalRules.map((section, index) => (
                            <motion.div
                                key={index}
                                initial={{ opacity: 0, scale: 0.9 }}
                                whileInView={{ opacity: 1, scale: 1 }}
                                viewport={{ once: true }}
                                transition={{ delay: index * 0.1, duration: 0.6 }}
                                whileHover={{ y: -12 }}
                                className="relative overflow-hidden bg-white/40 backdrop-blur-[40px] rounded-[3.5rem] p-12 shadow-[0_30px_70px_-20px_rgba(0,0,0,0.06)] hover:shadow-[0_45px_110px_-20px_rgba(32,118,199,0.15)] border-2 border-[#2076C7]/10 group transition-all duration-500 hover:border-[#1CADA3]/30"
                            >
                                <div className={`absolute top-0 right-0 w-48 h-48 bg-gradient-to-br ${section.gradient} opacity-[0.05] -mr-24 -mt-24 rounded-full transition-transform group-hover:scale-150 duration-1000`}></div>

                                <div className={`relative z-20 w-18 h-18 bg-gradient-to-r ${section.gradient} rounded-2xl flex items-center justify-center mb-10 shadow-2xl shadow-blue-500/20 group-hover:scale-110 group-hover:rotate-6 transition-transform duration-500 mx-auto ring-4 ring-white/40`}>
                                    <section.icon className="w-9 h-9 text-white" />
                                </div>

                                <h3 className="relative z-20 text-2xl font-black text-slate-700 mb-10 text-center tracking-tight">{section.category}</h3>

                                <ul className="space-y-5">
                                    {section.rules.map((rule, idx) => (
                                        <li key={idx} className="flex items-start gap-4">
                                            <div className={`mt-2 w-2 h-2 rounded-full bg-gradient-to-r ${section.gradient} shrink-0 shadow-sm shadow-blue-200`}></div>
                                            <p className="text-slate-800 text-sm leading-relaxed font-medium">{rule}</p>
                                        </li>
                                    ))}
                                </ul>
                            </motion.div>
                        ))}
                    </div>

                    <div className="mt-12 text-center">
                        <p className="inline-block text-xs font-bold text-slate-500 uppercase tracking-widest bg-yellow-50 px-4 py-2 rounded-full border border-yellow-200 shadow-sm">
                            Disclaimer : <span className="text-yellow-600 mr-1">⚠️</span> * Rules are subject to PFRDA guidelines and may change. Please refer to official documentation.
                        </p>
                    </div>
                </div>


            </div>
        </section>
    );
}
