"use client";

import { bondsData } from "../../data/bondsData";
import BondCard from "../BondCard";
import { ArrowLeft, ShieldCheck } from "lucide-react";

interface Props {
    category: "Private" | "StateGuaranteed";
    onBack: () => void;
    onInvest: (id: number) => void;
}

export default function AllBondsListingView({ category, onBack, onInvest }: Props) {
    const bonds = bondsData.filter(bond => bond.category === category);
    const isPrivate = category === "Private";

    return (
        <main className={`${isPrivate ? 'bg-gray-50' : 'bg-white'} min-h-screen py-12 md:py-16 font-sans px-4 sm:px-6 lg:px-8`}>
            <div className="max-w-7xl mx-auto">
                <div className="mb-8">
                    <button
                        onClick={onBack}
                        className="inline-flex items-center text-gray-600 hover:text-[#2076C7] transition-colors mb-4 group text-sm md:text-base"
                    >
                        <ArrowLeft size={18} className="mr-2 group-hover:-translate-x-1 transition-transform" />
                        Back to Overview
                    </button>
                    
                    <div className="flex items-center gap-2 md:gap-3 mb-2">
                        {!isPrivate && <ShieldCheck className="text-[#1CADA3] w-6 h-6 md:w-8 md:h-8" />}
                        <h1 className="text-2xl md:text-4xl font-extrabold bg-clip-text text-transparent bg-gradient-to-r from-[#2076C7] to-[#1CADA3] leading-tight">
                            {isPrivate ? "Private Corporate" : "State Guaranteed"} Bonds
                        </h1>
                    </div>
                    
                    <p className="text-gray-500 mt-2 max-w-2xl text-sm md:text-lg font-bold">
                        {isPrivate 
                            ? "Explore our full range of private sector bonds offering attractive yields."
                            : "Explore our full range of state government-backed securities offering safety."
                        }
                    </p>
                </div>

                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {bonds.map((bond) => (
                        <BondCard key={bond.id} bond={bond} onInvest={onInvest} />
                    ))}
                </div>
            </div>
        </main>
    );
}
