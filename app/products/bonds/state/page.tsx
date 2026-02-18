import { bondsData } from "../data/bondsData";
import BondCard from "../components/BondCard";
import { ArrowLeft } from "lucide-react";
import Link from "next/link";
import { ShieldCheck } from "lucide-react";

export const metadata = {
    title: "All State Guaranteed Bonds | Infinity Arthvishva",
    description: "Browse our complete collection of government-backed state guaranteed bonds. Secure your investments with high safety and attractive returns.",
};

export default function StateGuaranteedBondsPage() {
    const allStateBonds = bondsData.filter(bond => bond.category === "StateGuaranteed");

    return (
        <main className="bg-white min-h-screen py-12">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="mb-8">
                    <Link
                        href="/products/bonds"
                        className="inline-flex items-center text-gray-600 hover:text-[#2076C7] transition-colors mb-4"
                    >
                        <ArrowLeft size={20} className="mr-2" />
                        Back to Bonds Overview
                    </Link>
                    <div className="flex items-center gap-3 mb-2">
                        <ShieldCheck className="text-[#1CADA3]" size={32} />
                        <h1 className="text-4xl font-extrabold bg-clip-text text-transparent bg-gradient-to-r from-[#2076C7] to-[#1CADA3]">
                            All State Guaranteed Bonds
                        </h1>
                    </div>
                    <p className="text-gray-600 mt-2 max-w-2xl text-lg">
                        Explore our full range of state government-backed securities offering safety and stable returns.
                    </p>
                </div>

                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {allStateBonds.map((bond) => (
                        <BondCard key={bond.id} bond={bond} />
                    ))}
                </div>
            </div>
        </main>
    );
}
