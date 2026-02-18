"use client";

import { bondsData } from "../data/bondsData";
import BondCard from "./BondCard";
import { Building2 } from "lucide-react";

import Link from "next/link";

interface Props {
    onInvest: (id: number) => void;
}

export default function PrivateBonds({ onInvest }: Props) {
    // Show only the top 3 featured private bonds on the main page
    const featuredPrivateBonds = bondsData
        .filter(bond => bond.category === "Private" && bond.featured)
        .slice(0, 3);

    // If we don't have enough featured bonds, just take the first 3 private bonds
    const displayBonds = featuredPrivateBonds.length > 0
        ? featuredPrivateBonds
        : bondsData.filter(bond => bond.category === "Private").slice(0, 3);

    return (
        <section className="py-16 bg-white">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex flex-col md:flex-row justify-between items-center md:items-end mb-10 gap-4 text-center md:text-left">
                    <div>
                        <div className="flex items-center gap-2 mb-2">
                            <Building2 className="text-[#1CADA3]" size={28} />
                            <h2 className="text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-[#2076C7] to-[#1CADA3]">
                                Private Corporate Bonds
                            </h2>
                        </div>
                        <p className="text-gray-600 max-w-2xl">
                            Invest in top-rated private sector giants. High coupons with the reliability of established conglomerates.
                        </p>
                    </div>
                    <Link href="/products/bonds/private">
                        <button className="text-[#2076C7] font-bold hover:text-[#1CADA3] transition-colors flex items-center gap-1 group">
                            View All Private Bonds <span className="group-hover:translate-x-1 transition-transform">→</span>
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
