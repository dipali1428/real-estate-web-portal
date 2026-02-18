"use client";

import { motion } from "framer-motion";

export default function StatsSection() {
    const stats = [
        { label: "Assets Distributed", value: "₹250+ Cr" },
        { label: "Active Investors", value: "10,000+" },
        { label: "Bond Issues Listed", value: "50+" },
    ];

    return (
        <section className="py-20 bg-gray-50/50">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    {stats.map((stat, index) => (
                        <motion.div
                            key={index}
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.6, delay: index * 0.1 }}
                            className="bg-white p-10 rounded-[2.5rem] shadow-xl shadow-gray-200/30 border border-gray-50 text-center hover:translate-y-[-5px] transition-transform duration-300"
                        >
                            <h3 className="text-4xl md:text-5xl font-extrabold bg-clip-text text-transparent bg-gradient-to-r from-[#2076C7] to-[#1CADA3] mb-3">
                                {stat.value}
                            </h3>
                            <div className="w-12 h-1.5 bg-[#1CADA3] mx-auto rounded-full mb-4 opacity-70" />
                            <p className="text-gray-500 font-bold uppercase tracking-widest text-xs">
                                {stat.label}
                            </p>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
}
