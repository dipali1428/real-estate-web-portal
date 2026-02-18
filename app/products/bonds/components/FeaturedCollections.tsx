"use client";

import { motion } from "framer-motion";
import { ShieldCheck, TrendingUp, Landmark, Coins, ArrowRight, Sparkles } from "lucide-react";
import Link from "next/link";

const collections = [
    {
        id: "tax-free",
        title: "Tax-Free Bonds",
        description: "100% Tax exemption on interest income. Ideal for high tax bracket investors.",
        icon: <ShieldCheck size={32} />,
        color: "text-green-600",
        bg: "bg-green-50",
        link: "/products/bonds/tax-free" // Placeholder link
    },
    {
        id: "psu",
        title: "PSU & Govt Bonds",
        description: "Backed by Government ownership. Highest safety and sovereign guarantee.",
        icon: <Landmark size={32} />,
        color: "text-blue-600",
        bg: "bg-blue-50",
        link: "/products/bonds/psu"
    },
    {
        id: "high-yield",
        title: "High-Yield Corporate",
        description: "Maximize returns with top-rated corporate bonds offering up to 11% yield.",
        icon: <TrendingUp size={32} />,
        color: "text-purple-600",
        bg: "bg-purple-50",
        link: "/products/bonds/high-yield"
    },
    {
        id: "sgb",
        title: "Sovereign Gold Bonds",
        description: "Capital appreciation of Gold + 2.5% fixed annual interest. No capital gains tax.",
        icon: <Coins size={32} />,
        color: "text-yellow-600",
        bg: "bg-yellow-50",
        link: "/products/bonds/sgb"
    }
];

export default function FeaturedCollections() {
    return (
        <section className="py-16 bg-white">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="text-center mb-12">
                    <div className="flex items-center justify-center gap-2 mb-4">
                        <Sparkles className="text-[#1CADA3]" size={28} />
                        <h2 className="text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-[#2076C7] to-[#1CADA3]">
                            Curated Collections
                        </h2>
                    </div>
                    <p className="text-gray-600 max-w-2xl mx-auto">
                        Explore our handpicked selections tailored to meet specific financial goals, from tax saving to maximum growth.
                    </p>
                </div>

                <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
                    {collections.map((collection, index) => (
                        <motion.div
                            key={collection.id}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            transition={{ delay: index * 0.1 }}
                            viewport={{ once: true }}
                            className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100 hover:shadow-lg hover:-translate-y-1 transition-all duration-300 group cursor-pointer"
                        >
                            <div className={`w-16 h-16 rounded-2xl ${collection.bg} ${collection.color} flex items-center justify-center mb-6 group-hover:scale-110 transition-transform`}>
                                {collection.icon}
                            </div>
                            <h3 className="text-xl font-bold text-gray-900 mb-2 group-hover:text-[#2076C7] transition-colors">
                                {collection.title}
                            </h3>
                            <p className="text-gray-600 text-sm mb-6 leading-relaxed">
                                {collection.description}
                            </p>

                            <div className="flex items-center text-[#1CADA3] font-semibold text-sm group-hover:gap-2 transition-all">
                                <span>Explore Collection</span>
                                <ArrowRight size={16} className="opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all" />
                            </div>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
}
