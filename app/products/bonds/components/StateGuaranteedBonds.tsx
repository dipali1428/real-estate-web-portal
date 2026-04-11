"use client";

import { bondsData } from "../data/bondsData";
import BondCard from "./BondCard";



interface Props {
    onInvest: (id: number) => void;
    onViewAll: () => void;
}

import { motion } from "framer-motion";

export default function StateGuaranteedBonds({ onInvest, onViewAll }: Props) {
    // Show only the top 3 featured state bonds on the main page
    // Show top 3 state bonds, prioritizing featured ones
    const stateBonds = bondsData.filter(bond => bond.category === "StateGuaranteed");
    const featured = stateBonds.filter(bond => bond.featured);
    const others = stateBonds.filter(bond => !bond.featured);

    // Combine featured and non-featured, then take top 3
    const displayBonds = [...featured, ...others].slice(0, 3);

    return (
        <section className="py-12 md:py-16 bg-white relative overflow-hidden border-t border-slate-50 font-sans px-4 sm:px-6 lg:px-8">
            <div className="max-w-7xl mx-auto">
                <div className="flex flex-col md:flex-row justify-between items-center md:items-end mb-10 gap-4 text-center md:text-left">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                    >
                        <span className="inline-flex items-center gap-2 text-[#2076C7] font-black tracking-widest uppercase text-xs mb-4">
                            State Backed
                        </span>
                        <h2 className="text-3xl md:text-4xl font-extrabold mb-3 bg-linear-to-r from-[#2076C7] to-[#1CADA3] bg-clip-text text-transparent drop-shadow-sm">
                            State Guaranteed Bonds
                        </h2>
                        <p className="text-slate-500 max-w-2xl mx-auto text-base md:text-lg mt-6 font-medium leading-relaxed px-4 md:px-0">
                            Government-backed security with attractive yields. Ideal for risk-averse investors seeking higher returns than FDs.
                        </p>
                    </motion.div>
                    <button 
                        onClick={onViewAll}
                        suppressHydrationWarning={true}
                        className="text-[#2076C7] font-bold hover:text-[#1CADA3] transition-colors flex items-center gap-1 group whitespace-nowrap"
                    >
                        View All State Bonds <span className="group-hover:translate-x-1 transition-transform">→</span>
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
