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
    Coins,
    ChevronRight,
} from 'lucide-react';


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
        <section id="withdrawal-rules" className="relative py-12 md:py-16 bg-white overflow-hidden">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
                {/* NPS Withdrawal Section */}
                <div>
                    <div className="text-center mb-12">
                        <motion.h2
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            className="text-3xl md:text-4xl font-extrabold mb-3 bg-gradient-to-r from-[#2076C7] via-[#1CADA3] to-[#2076C7] bg-clip-text text-transparent bg-[length:200%_auto] animate-gradient-flow drop-shadow-sm tracking-tight pb-1"
                        >
                            NPS Withdrawal & Exit Rules
                        </motion.h2>
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
                                className="relative overflow-hidden bg-white rounded-[2rem] p-10 shadow-xl border border-gray-200 group transition-all duration-500 hover:border-[#1CADA3]/30"
                            >
                                <div className={`relative z-20 w-16 h-16 bg-gradient-to-r ${section.gradient} rounded-2xl flex items-center justify-center mb-8 shadow-lg group-hover:scale-110 group-hover:rotate-3 transition-transform duration-500 mx-auto`}>
                                    <section.icon className="w-8 h-8 text-white" />
                                </div>

                                <h3 className="relative z-20 text-xl font-bold text-gray-800 mb-8 text-center tracking-tight">{section.category}</h3>

                                <ul className="space-y-4">
                                    {section.rules.map((rule, idx) => (
                                        <li key={idx} className="flex items-start gap-4">
                                            <div className={`mt-1.5 w-1.5 h-1.5 rounded-full bg-gradient-to-r ${section.gradient} shrink-0`}></div>
                                            <p className="text-gray-700 text-sm leading-relaxed font-medium">{rule}</p>
                                        </li>
                                    ))}
                                </ul>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </div>
        </section>
    );
}
