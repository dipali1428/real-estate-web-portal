import { bondsData } from "../data/bondsData";
import BondCard from "./BondCard";

export default function BondList() {
    return (
        <section className="py-24 bg-white">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="text-center mb-16">
                    <h2 className="text-3xl md:text-4xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-[#2076C7] to-[#1CADA3]">
                        Available Bond Offerings
                    </h2>
                    <p className="mt-4 text-gray-600 max-w-2xl mx-auto">
                        Explore our curated selection of high-yield corporate bonds with various ratings and tenures to suit your investment goals.
                    </p>
                </div>

                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {bondsData.map((bond) => (
                        <BondCard key={bond.id} bond={bond} />
                    ))}
                </div>

                <div className="mt-16 text-center">
                    <p className="text-sm text-gray-500 italic">
                        * Ratings are provided by independent agencies like CRISIL, ICRA, and CARE.
                    </p>
                </div>
            </div>
        </section>
    );
}
