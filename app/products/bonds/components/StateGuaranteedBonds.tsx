"use client";

import { bondsData } from "../data/bondsData";
import BondCard from "./BondCard";
import { ShieldCheck } from "lucide-react";

import Link from "next/link";

interface Props {
    onInvest: (id: number) => void;
}

export default function StateGuaranteedBonds({ onInvest }: Props) {
    // Show only the top 3 featured state bonds on the main page
    // Show top 3 state bonds, prioritizing featured ones
    const stateBonds = bondsData.filter(bond => bond.category === "StateGuaranteed");
    const featured = stateBonds.filter(bond => bond.featured);
    const others = stateBonds.filter(bond => !bond.featured);

    // Combine featured and non-featured, then take top 3
    const displayBonds = [...featured, ...others].slice(0, 3);

    return (
        <section className="py-16 bg-blue-50/30 border-y border-blue-50">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex flex-col md:flex-row justify-between items-center md:items-end mb-10 gap-4 text-center md:text-left">
                    <div>
                        <div className="flex items-center gap-2 mb-2">
                            <ShieldCheck className="text-[#1CADA3]" size={28} />
                            <h2 className="text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-[#2076C7] to-[#1CADA3]">
                                State Guaranteed Bonds
                            </h2>
                        </div>
                        <p className="text-gray-600 max-w-2xl">
                            Government-backed security with attractive yields. Ideal for risk-averse investors seeking higher returns than FDs.
                        </p>
                    </div>
                    <Link href="/products/bonds/state">
                        <button className="text-[#2076C7] font-bold hover:text-[#1CADA3] transition-colors flex items-center gap-1 group">
                            View All State Bonds <span className="group-hover:translate-x-1 transition-transform">→</span>
                        </button>
                    </Link>
                </div>

                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {displayBonds.map((bond) => (
                        <BondCard key={bond.id} bond={bond} onInvest={onInvest} />
                    ))}
                </div>
            </div>
        </section>
    );
}
