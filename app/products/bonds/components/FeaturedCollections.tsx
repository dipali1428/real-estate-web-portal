"use client";

import { motion } from "framer-motion";
import { ShieldCheck, TrendingUp, Landmark, Coins, ArrowRight, Sparkles } from "lucide-react";
import { useModal } from "../../../context/ModalContext";

const collections = [
    {
        id: "tax-free",
        title: "Tax-Free Bonds",
        description: "100% Tax exemption on interest income. Ideal for high tax bracket investors.",
        icon: <ShieldCheck size={32} />,
        color: "text-green-600",
        bg: "bg-green-50",
    },
    {
        id: "psu",
        title: "PSU & Govt Bonds",
        description: "Backed by Government ownership. Highest safety and sovereign guarantee.",
        icon: <Landmark size={32} />,
        color: "text-blue-600",
        bg: "bg-blue-50",
    },
    {
        id: "high-yield",
        title: "High-Yield Corporate",
        description: "Maximize returns with top-rated corporate bonds offering up to 11% yield.",
        icon: <TrendingUp size={32} />,
        color: "text-purple-600",
        bg: "bg-purple-50",
    },
    {
        id: "sgb",
        title: "Sovereign Gold Bonds",
        description: "Capital appreciation of Gold + 2.5% fixed annual interest. No capital gains tax.",
        icon: <Coins size={32} />,
        color: "text-yellow-600",
        bg: "bg-yellow-50",
    }
];

export default function FeaturedCollections() {

    return (
        <section className="py-12 md:py-16 bg-white relative overflow-hidden font-sans px-4 sm:px-6 lg:px-8">
            <div className="max-w-7xl mx-auto">
                <div className="relative flex items-center justify-center mb-10">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="text-center"
                    >
                        <span className="text-[#2076C7] font-black tracking-widest uppercase text-xs mb-4 block">
                            Curated Collections
                        </span>
                        <h2 className="text-3xl md:text-4xl font-extrabold mb-6 bg-linear-to-r from-[#2076C7] to-[#1CADA3] bg-clip-text text-transparent drop-shadow-sm tracking-tight leading-tight">
                            Explore Our Top Bond Collections
                        </h2>
                        <p className="text-gray-600 max-w-2xl mx-auto font-medium text-base md:text-lg leading-relaxed">
                            Explore our handpicked selections tailored to meet specific financial goals, from tax saving to maximum growth.
                        </p>
                    </motion.div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                    {collections.map((collection, index) => (
                        <motion.div
                            key={collection.id}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            transition={{ delay: index * 0.1 }}
                            viewport={{ once: true }}
                            onClick={() => document.getElementById('bonds-listings')?.scrollIntoView({ behavior: 'smooth' })}
                            className="bg-white rounded-[2rem] p-8 border border-slate-100 hover:border-blue-200 hover:shadow-[0_20px_50px_-12px_rgba(32,118,199,0.1)] transition-all duration-300 group cursor-pointer flex flex-col items-center text-center"
                        >
                            <div className={`w-14 h-14 rounded-2xl ${collection.bg} ${collection.color} flex items-center justify-center mb-6 shadow-lg group-hover:scale-110 transition-transform`}>
                                {collection.icon}
                            </div>
                            <h3 className="text-xl font-extrabold text-gray-700 mb-3 tracking-tight leading-snug group-hover:text-[#2076C7] transition-colors">
                                {collection.title}
                            </h3>
                            <p className="text-slate-500 text-xs leading-relaxed font-bold mb-6 flex-grow">
                                {collection.description}
                            </p>

                            <div className="flex items-center text-[#2076C7] font-extrabold text-sm group-hover:gap-2 transition-all mt-auto pt-4 uppercase tracking-widest">
                                <span>Explore Collection</span>
                                <ArrowRight size={16} className="opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all stroke-3" />
                            </div>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
}
