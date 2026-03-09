"use client";

import { motion } from "framer-motion";
import { CheckCircle2, AlertCircle, ShieldAlert, ShieldCheck, Car } from "lucide-react";

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
        <section className="py-24 relative">
            <div className="container mx-auto px-4 md:px-6 relative z-10">
                <div className="text-center max-w-3xl mx-auto mb-6">
                    <h2 className="text-3xl md:text-4xl font-extrabold mb-4 bg-linear-to-r from-[#2076C7] to-[#1CADA3] bg-clip-text text-transparent drop-shadow-sm">
                        Compare Policy Coverages
                    </h2>
                    <p className="text-gray-600 text-lg">
                        A quick comparison to help you understand the protection offered by different plans.
                    </p>
                </div>

                <div className="max-w-6xl mx-auto overflow-x-auto">
                    <table className="w-full border border-gray-300 rounded-2xl overflow-hidden border-separate border-spacing-0">
                        <thead>
                            <tr>
                                <th className="p-6 text-left text-gray-700 font-bold border-b border-r border-gray-200">Features & Benefits</th>
                                <th className="p-6 text-center border-b border-r border-gray-200">
                                    <div className="flex flex-col items-center gap-2">
                                        <ShieldAlert size={24} className="text-teal-500" />
                                        <span className="text-sm font-bold text-gray-700 leading-tight">Third-Party <br /> Liability</span>
                                    </div>
                                </th>
                                <th className="p-6 text-center border-b border-r border-gray-200">
                                    <div className="flex flex-col items-center gap-2">
                                        <ShieldCheck size={24} className="text-teal-500" />
                                        <span className="text-sm font-bold text-gray-700 leading-tight">Comprehensive <br /> Cover</span>
                                    </div>
                                </th>
                                <th className="p-6 text-center border-b border-gray-200">
                                    <div className="flex flex-col items-center gap-2">
                                        <Car size={24} className="text-teal-600" />
                                        <span className="text-sm font-bold text-gray-700 leading-tight">Standalone <br /> Own Damage</span>
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
                                    <td className="p-6 text-gray-700 font-medium border-b border-r border-gray-200">{item.feature}</td>
                                    <td className="p-6 text-center border-b border-r border-gray-200">
                                        {item.thirdParty ? <CheckCircle2 className="mx-auto text-[#1CADA3]" size={24} strokeWidth={2} /> : <AlertCircle className="mx-auto text-gray-600" size={24} strokeWidth={2} />}
                                    </td>
                                    <td className="p-6 text-center border-b border-r border-gray-200">
                                        {item.comprehensive ? <CheckCircle2 className="mx-auto text-[#1CADA3]" size={24} strokeWidth={2} /> : <AlertCircle className="mx-auto text-gray-600" size={24} strokeWidth={2} />}
                                    </td>
                                    <td className="p-6 text-center border-b border-gray-200">
                                        {item.ownDamage ? <CheckCircle2 className="mx-auto text-[#1CADA3]" size={24} strokeWidth={2} /> : <AlertCircle className="mx-auto text-gray-600" size={24} strokeWidth={2} />}
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
