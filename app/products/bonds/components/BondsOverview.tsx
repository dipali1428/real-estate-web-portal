import { Info } from "lucide-react";

export default function BondsOverview() {
    return (
        <section className="bg-gray-50 py-20">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="max-w-4xl mx-auto text-center">
                    <div className="flex items-center justify-center gap-2 mb-4">
                        <Info className="text-[#1CADA3]" size={28} />
                        <h2 className="text-3xl md:text-4xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-[#2076C7] to-[#1CADA3]">
                            Understanding Bonds
                        </h2>
                    </div>

                    <div className="mt-10 grid md:grid-cols-2 gap-12 text-left">
                        <div>
                            <p className="text-lg text-gray-700 leading-relaxed font-sans">
                                Bonds are fixed-income instruments where you lend money to corporations or government entities for a defined period. In return, you receive periodic interest payments (coupons) and the full principal amount at maturity.
                            </p>
                        </div>
                        <div>
                            <p className="text-lg text-gray-700 leading-relaxed font-sans">
                                They are an essential component of a diversified portfolio, offering lower volatility than equities and providing a predictable income stream, making them ideal for wealth preservation and steady growth.
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}
