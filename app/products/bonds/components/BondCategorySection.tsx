"use client";

import { bondsData } from "../data/bondsData";
import BondCard from "./BondCard";
import { motion } from "framer-motion";

interface Props {
    category: "Private" | "StateGuaranteed" | "PSU" | "TaxFree" | "SGB" | "Municipal" | "GSec";
    onInvest: (id: number) => void;
    onViewAll: () => void;
    title: string;
    subtitle: string;
    description: string;
    badge: string;
    bgColor?: string;
}

export default function BondCategorySection({ 
    category, 
    onInvest, 
    onViewAll, 
    title, 
    subtitle, 
    description, 
    badge,
    bgColor = "bg-white"
}: Props) {
    // Show only the top 3 bonds for this category
    const categoryBonds = bondsData.filter(bond => bond.category === category);
    const featured = categoryBonds.filter(bond => bond.featured);
    const others = categoryBonds.filter(bond => !bond.featured);
    
    const displayBonds = [...featured, ...others].slice(0, 3);

    if (displayBonds.length === 0) return null;

    return (
        <section className={`py-12 md:py-16 ${bgColor} relative overflow-hidden font-sans px-4 sm:px-6 lg:px-8 border-t border-gray-50`}>
            <div className="max-w-7xl mx-auto">
                <div className="flex flex-col md:flex-row justify-between items-center md:items-end mb-10 gap-4 text-center md:text-left">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                    >
                        <span className="inline-flex items-center gap-2 text-[#2076C7] font-black tracking-widest uppercase text-xs mb-4">
                            {badge}
                        </span>
                        <h2 className="text-3xl md:text-4xl font-extrabold mb-3 bg-linear-to-r from-[#2076C7] to-[#1CADA3] bg-clip-text text-transparent drop-shadow-sm">
                            {title}
                        </h2>
                        <p className="text-slate-500 max-w-2xl mx-auto text-base md:text-lg mt-6 font-medium leading-relaxed px-4 md:px-0">
                            {description}
                        </p>
                    </motion.div>
                    <button 
                        onClick={onViewAll}
                        suppressHydrationWarning={true}
                        className="text-[#2076C7] font-bold hover:text-[#1CADA3] transition-colors flex items-center gap-1 group whitespace-nowrap"
                    >
                        View All {subtitle} <span className="group-hover:translate-x-1 transition-transform">→</span>
                    </button>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {displayBonds.map((bond) => (
                        <BondCard key={bond.id} bond={bond} onInvest={onInvest} />
                    ))}
                </div>
            </div>
        </section>
    );
}
