"use client";

import { motion } from "framer-motion";
import { Search, Calculator, FileCheck, Layers, Percent } from "lucide-react";

const buyingTips = [
    {
        icon: Search,
        title: "Assess Your Needs",
        description: "Determine whether you need comprehensive coverage or just third-party liability based on your vehicle's age and usage.",
        bg: "bg-purple-100",
        iconBg: "bg-purple-200",
        iconColor: "text-purple-600",
        border: "border-purple-100",
        hover: "hover:border-purple-300",
    },
    {
        icon: Calculator,
        title: "Check IDV (Insured Declared Value)",
        description: "IDV is your vehicle's current market value. Ensure it's not set too low (less claim amount) or too high (higher premium).",
        bg: "bg-yellow-100",
        iconBg: "bg-yellow-200",
        iconColor: "text-yellow-600",
        border: "border-yellow-100",
        hover: "hover:border-yellow-300",
    },
    {
        icon: Layers,
        title: "Select Right Add-ons",
        description: "Choose add-ons like Zero Depreciation or Engine Protect relevant to your car's specific needs to enhance coverage.",
        bg: "bg-green-100",
        iconBg: "bg-green-200",
        iconColor: "text-green-600",
        border: "border-green-100",
        hover: "hover:border-green-300",
    },
    {
        icon: Percent,
        title: "Claim Settlement Ratio",
        description: "Look for an insurer with a high claim settlement ratio to ensure a smooth and hassle-free claims experience.",
        bg: "bg-orange-200",
        iconBg: "bg-orange-300",
        iconColor: "text-orange-700",
        border: "border-orange-300",
        hover: "hover:border-orange-400",
    },
    {
        icon: FileCheck,
        title: "Compare Premiums",
        description: "Don't just buy the first policy you see. Compare quotes and benefits to ensure you get the best value for money.",
        bg: "bg-rose-100",
        iconBg: "bg-rose-200",
        iconColor: "text-rose-800",
        border: "border-rose-100",
        hover: "hover:border-rose-300",
    },
];

export default function BuyingGuide() {
    return (
        <section className="py-12 bg-gray-50 relative">
            <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
                <div className="text-center max-w-3xl mx-auto mb-16">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.5 }}
                    >
                        <h2 className="text-3xl md:text-4xl font-bold mb-4 bg-linear-to-r from-[#2076C7] via-[#1CADA3] to-[#2076C7] text-transparent bg-clip-text inline-block">
                            Things to Consider Before Buying
                        </h2>
                        <p className="text-gray-600 text-lg">
                            Make an informed decision. Keep these key factors in mind when choosing your motor insurance policy.
                        </p>
                    </motion.div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    <div className="lg:col-span-3 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {buyingTips.slice(0, 3).map((tip, index) => (
                            <motion.div
                                key={index}
                                initial={{ opacity: 0, y: 30 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: index * 0.1, duration: 0.5 }}
                                className="group"
                            >
                                <div className={`${tip.bg} p-8 rounded-2xl h-full border ${tip.border} ${tip.hover} transition-all duration-300 relative overflow-hidden text-center hover:shadow-lg`}>
                                    <div className={`w-14 h-14 rounded-xl ${tip.iconBg} flex items-center justify-center mb-6 shadow-sm group-hover:scale-110 transition-transform duration-300 mx-auto`}>
                                        <tip.icon size={28} className={tip.iconColor} />
                                    </div>

                                    <h3 className="text-xl font-bold text-gray-900 mb-3 group-hover:text-[#2076C7] transition-colors">
                                        {tip.title}
                                    </h3>
                                    <p className="text-gray-600 leading-relaxed">
                                        {tip.description}
                                    </p>
                                </div>
                            </motion.div>
                        ))}
                    </div>

                    <div className="lg:col-span-3 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-8 max-w-4xl mx-auto w-full">
                        {buyingTips.slice(3).map((tip, index) => (
                            <motion.div
                                key={index + 3}
                                initial={{ opacity: 0, y: 30 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: (index + 3) * 0.1, duration: 0.5 }}
                                className="group"
                            >
                                <div className={`${tip.bg} p-8 rounded-2xl h-full border ${tip.border} ${tip.hover} transition-all duration-300 relative overflow-hidden text-center hover:shadow-lg`}>
                                    <div className={`w-14 h-14 rounded-xl ${tip.iconBg} flex items-center justify-center mb-6 shadow-sm group-hover:scale-110 transition-transform duration-300 mx-auto`}>
                                        <tip.icon size={28} className={tip.iconColor} />
                                    </div>

                                    <h3 className="text-xl font-bold text-gray-900 mb-3 group-hover:text-[#2076C7] transition-colors">
                                        {tip.title}
                                    </h3>
                                    <p className="text-gray-600 leading-relaxed">
                                        {tip.description}
                                    </p>
                                </div>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </div>
        </section>
    );
}
