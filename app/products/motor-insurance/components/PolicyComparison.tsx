"use client";

import { motion } from "framer-motion";
import { Check, X, ShieldAlert, ShieldCheck, Car } from "lucide-react";

const comparisonData = [
    {
        feature: "Third Party Liabilities",
        thirdParty: true,
        comprehensive: true,
        ownDamage: false,
    },
    {
        feature: "Damages from Accidents",
        thirdParty: false,
        comprehensive: true,
        ownDamage: true,
    },
    {
        feature: "Theft & Burglary",
        thirdParty: false,
        comprehensive: true,
        ownDamage: true,
    },
    {
        feature: "Fire & Explosions",
        thirdParty: false,
        comprehensive: true,
        ownDamage: true,
    },
    {
        feature: "Natural Calamities",
        thirdParty: false,
        comprehensive: true,
        ownDamage: true,
    },
    {
        feature: "Personal Accident Cover",
        thirdParty: true,
        comprehensive: true,
        ownDamage: false,
    },
    {
        feature: "Add-on Coverage",
        thirdParty: false,
        comprehensive: true,
        ownDamage: true,
    },
];

export default function PolicyComparison() {
    return (
        <section className="py-24 bg-white">
            <div className="container mx-auto px-4 md:px-6">
                <div className="text-center max-w-3xl mx-auto mb-16">
                    <h2 className="text-3xl md:text-4xl font-bold mb-4 bg-linear-to-r from-[#2076C7] via-[#1CADA3] to-[#2076C7] text-transparent bg-clip-text inline-block">
                        Compare Policy Coverages
                    </h2>
                    <p className="text-gray-600 text-lg">
                        A quick comparison to help you understand the protection offered by different plans.
                    </p>
                </div>

                <div className="max-w-7xl mx-auto overflow-x-auto">
                    <table className="w-full border border-gray-200 rounded-2xl overflow-hidden border-separate border-spacing-0">
                        <thead>
                            <tr className="bg-gray-50">
                                <th className="p-6 text-left text-gray-700 font-bold border-b border-r border-gray-200">Features & Benefits</th>
                                <th className="p-6 text-center border-b border-r border-gray-200">
                                    <div className="flex flex-col items-center gap-2">
                                        <ShieldAlert size={24} className="text-orange-500" />
                                        <span className="text-sm font-bold text-gray-900 leading-tight">Third-Party <br /> Liability</span>
                                    </div>
                                </th>
                                <th className="p-6 text-center border-b border-r border-gray-200 bg-blue-50/50">
                                    <div className="flex flex-col items-center gap-2">
                                        <ShieldCheck size={24} className="text-[#2076C7]" />
                                        <span className="text-sm font-bold text-[#2076C7] leading-tight">Comprehensive <br /> Cover</span>
                                    </div>
                                </th>
                                <th className="p-6 text-center border-b border-gray-200">
                                    <div className="flex flex-col items-center gap-2">
                                        <Car size={24} className="text-indigo-600" />
                                        <span className="text-sm font-bold text-gray-900 leading-tight">Standalone <br /> Own Damage</span>
                                    </div>
                                </th>
                            </tr>
                        </thead>
                        <tbody>
                            {comparisonData.map((item, index) => (
                                <motion.tr
                                    key={index}
                                    initial={{ opacity: 0, y: 10 }}
                                    whileInView={{ opacity: 1, y: 0 }}
                                    transition={{ delay: index * 0.05 }}
                                    viewport={{ once: true }}
                                    className="hover:bg-gray-50/50 transition-colors"
                                >
                                    <td className="p-6 text-gray-700 font-medium border-b border-r border-gray-100">{item.feature}</td>
                                    <td className="p-6 text-center border-b border-r border-gray-100">
                                        {item.thirdParty ? <Check className="mx-auto text-green-500" size={20} /> : <X className="mx-auto text-gray-800" size={20} />}
                                    </td>
                                    <td className="p-6 text-center bg-blue-50/30 border-b border-r border-gray-100">
                                        {item.comprehensive ? <Check className="mx-auto text-[#2076C7]" size={22} strokeWidth={3} /> : <X className="mx-auto text-gray-800" size={20} />}
                                    </td>
                                    <td className="p-6 text-center border-b border-gray-100">
                                        {item.ownDamage ? <Check className="mx-auto text-green-500" size={20} /> : <X className="mx-auto text-gray-800" size={20} />}
                                    </td>
                                </motion.tr>
                            ))}
                        </tbody>
                    </table>
                </div>

            </div>
        </section>
    );
}
