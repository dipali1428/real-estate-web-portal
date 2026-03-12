"use client";

import { motion } from 'framer-motion';

const VARIANTS_DATA = [
    { feature: "Purpose", new: "Buy new house from builder", resale: "Buy second-hand property", takeover: "Transfer existing loan", renovation: "Repair / upgrade house", plot: "Buy plot + build house" },
    { feature: "Property Type", new: "Under-construction / Ready", resale: "Ready property", takeover: "Existing financed property", renovation: "Existing owned property", plot: "Land + Construction" },
    { feature: "Legal Verification", new: "Builder + Bank", resale: "Full property legal check", takeover: "Minimal (existing loan)", renovation: "Basic check", plot: "Land + Construction approval" },
    { feature: "Disbursal", new: "Lump sum / Stage-wise", resale: "Lump sum", takeover: "Loan closure + new sanction", renovation: "Lump sum", plot: "Stage-wise" },
    { feature: "Interest Rate", new: "Lowest options available", resale: "Similar to new purchase", takeover: "Similar or slightly lower", renovation: "Slightly higher", plot: "Similar to home loan" },
    { feature: "Best For", new: "First-time buyers", resale: "Ready-to-move homes", takeover: "Reduce EMI", renovation: "House improvement", plot: "Self-construction" }
];

export default function LoanVariantsTable() {
    return (
        <section className="py-12 md:py-16 bg-white">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <motion.div initial="hidden" whileInView="visible" className="text-center mb-16">
                    <motion.h2 className="text-3xl md:text-4xl font-extrabold font-sans mb-3 bg-linear-to-r from-[#2076C7] to-[#1CADA3] bg-clip-text text-transparent drop-shadow-sm">
                        Explore Home Loan Variants
                    </motion.h2>
                    <motion.p className="text-xl text-gray-500 max-w-3xl mx-auto font-light">
                        A detailed breakdown of various home loan variants to help you make an informed choice.
                    </motion.p>
                </motion.div>

                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="rounded-[2.5rem] border border-gray-100 overflow-hidden bg-white shadow-sm"
                >
                    <div className="overflow-x-auto no-scrollbar">
                        <table className="w-full text-left border-collapse min-w-[1000px]">
                            <thead>
                                <tr className="bg-linear-to-r from-[#2076C7] via-[#1CADA3] to-[#2076C7]">
                                    <th className="px-6 py-6 text-lg font-bold text-white">Feature</th>
                                    <th className="px-6 py-6 text-lg font-bold text-white">New Purchase</th>
                                    <th className="px-6 py-6 text-lg font-bold text-white">Resale Property</th>
                                    <th className="px-6 py-6 text-lg font-bold text-white">Takeover (BT)</th>
                                    <th className="px-6 py-6 text-lg font-bold text-white">Renovation</th>
                                    <th className="px-6 py-6 text-lg font-bold text-white">Plot + Const.</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-gray-100">
                                {VARIANTS_DATA.map((row, idx) => (
                                    <motion.tr
                                        key={idx}
                                        whileHover={{ backgroundColor: "#fcfdfe" }}
                                        className="transition-colors group"
                                    >
                                        <td className="px-8 py-6 font-bold text-gray-800 text-sm whitespace-nowrap">{row.feature}</td>
                                        <td className="px-8 py-6 text-gray-500 text-sm leading-relaxed">{row.new}</td>
                                        <td className="px-8 py-6 text-gray-500 text-sm leading-relaxed">{row.resale}</td>
                                        <td className="px-8 py-6 text-gray-500 text-sm leading-relaxed">{row.takeover}</td>
                                        <td className="px-8 py-6 text-gray-500 text-sm leading-relaxed">{row.renovation}</td>
                                        <td className="px-8 py-6 text-gray-500 text-sm leading-relaxed">{row.plot}</td>
                                    </motion.tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </motion.div>
            </div>
        </section>
    );
}
