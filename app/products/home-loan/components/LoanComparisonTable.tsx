"use client";

import { motion } from 'framer-motion';

const COMPARISON_DATA = [
    { feature: "Interest", home: "7–9%", personal: "10–18%", lap: "8–11%" },
    { feature: "Tenure", home: "30 Years", personal: "5 Years", lap: "15–20 Years" },
    { feature: "Loan Amount", home: "High", personal: "Medium", lap: "High" },
    { feature: "Security", home: "Property", personal: "Unsecured", lap: "Property" }
];

export default function LoanComparisonTable() {
    return (
        <section className="py-12 md:py-16 bg-white border-y border-gray-100">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <motion.div initial="hidden" whileInView="visible" className="text-center mb-16">
                    <motion.h2 className="text-3xl md:text-4xl font-extrabold font-sans mb-3 bg-linear-to-r from-[#2076C7] to-[#1CADA3] bg-clip-text text-transparent drop-shadow-sm">
                        Home Loan vs Personal Loan vs LAP
                    </motion.h2>
                    <motion.p className="text-xl text-gray-500 max-w-3xl mx-auto font-light">
                        Compare different loan options to find the best fit for your financial goals.
                    </motion.p>
                </motion.div>

                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="rounded-[2.5rem] border border-gray-100 overflow-hidden bg-white shadow-sm"
                >
                    <div className="overflow-x-auto no-scrollbar">
                        <table className="w-full text-left border-collapse min-w-[600px]">
                            <thead>
                                <tr className="bg-linear-to-r from-[#2076C7] via-[#1CADA3] to-[#2076C7]">
                                    <th className="px-6 py-6 text-lg font-bold text-white">Feature</th>
                                    <th className="px-6 py-6 text-lg font-bold text-white">Home Loan</th>
                                    <th className="px-6 py-6 text-lg font-bold text-white">Personal Loan</th>
                                    <th className="px-6 py-6 text-lg font-bold text-white">LAP</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-gray-50">
                                {COMPARISON_DATA.map((row, idx) => (
                                    <motion.tr
                                        key={idx}
                                        whileHover={{ backgroundColor: "#fcfdfe" }}
                                        className="transition-colors group"
                                    >
                                        <td className="px-8 py-6 font-bold text-gray-900 group-hover:text-[#2076C7] transition-colors">{row.feature}</td>
                                        <td className="px-8 py-6">
                                            <span className="px-4 py-1.5 bg-blue-50 text-[#2076C7] rounded-full text-xs font-extrabold uppercase tracking-tight">{row.home}</span>
                                        </td>
                                        <td className="px-8 py-6 text-gray-600 font-medium">{row.personal}</td>
                                        <td className="px-8 py-6">
                                            <span className="px-4 py-1.5 bg-emerald-50 text-[#1CADA3] rounded-full text-xs font-extrabold uppercase tracking-tight">{row.lap}</span>
                                        </td>
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
