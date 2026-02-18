import { bondsData } from "../data/bondsData";
import BondCard from "../components/BondCard";
import { ArrowLeft } from "lucide-react";
import Link from "next/link";

export const metadata = {
    title: "All Private Corporate Bonds | Infinity Arthvishva",
    description: "Browse our complete collection of high-yield private corporate bonds. Find the best investment opportunities for your portfolio.",
};

export default function PrivateBondsPage() {
    const allPrivateBonds = bondsData.filter(bond => bond.category === "Private");

    return (
        <main className="bg-gray-50 min-h-screen py-12">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="mb-8">
                    <Link
                        href="/products/bonds"
                        className="inline-flex items-center text-gray-600 hover:text-[#2076C7] transition-colors mb-4"
                    >
                        <ArrowLeft size={20} className="mr-2" />
                        Back to Bonds Overview
                    </Link>
                    <h1 className="text-4xl font-extrabold bg-clip-text text-transparent bg-gradient-to-r from-[#2076C7] to-[#1CADA3]">
                        All Private Corporate Bonds
                    </h1>
                    <p className="text-gray-600 mt-2 max-w-2xl text-lg">
                        Explore our full range of private sector bonds offering attractive yields and diverse maturity options.
                    </p>
                </div>

                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {allPrivateBonds.map((bond) => (
                        <BondCard key={bond.id} bond={bond} />
                    ))}
                </div>
            </div>
        </main>
    );
}
