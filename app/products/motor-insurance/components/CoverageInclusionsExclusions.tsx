"use client";

import { motion } from "framer-motion";
import { CheckCircle2, XCircle, ShieldCheck, AlertOctagon, Shield } from "lucide-react";

const inclusions = [
    {
        title: "Accidents & Collisions",
        description: "Damage caused due to accidental collisions/crashes.",
    },
    {
        title: "Theft",
        description: "Compensation if your vehicle is stolen.",
    },
    {
        title: "Fire & Explosion",
        description: "Damages due to fire, explosion, self-ignition or lightning.",
    },
    {
        title: "Natural Calamities",
        description: "Earthquakes, floods, typhoons, hurricanes, storms, etc.",
    },
    {
        title: "Third-Party Liability",
        description: "Legal liability for injury/death/property damage to third parties.",
    },
    {
        title: "Personal Accident",
        description: "Coverage for individual owner-driver in case of injury/death.",
    },
];

const exclusions = [
    {
        title: "Driving Under Influence",
        description: "Accidents while driving under the influence of alcohol/drugs.",
    },
    {
        title: "Driving Without License",
        description: "Claims where the driver does not hold a valid driving license.",
    },
    {
        title: "General Wear & Tear",
        description: "Regular aging, wear and tear, and mechanical/electrical breakdown.",
    },
    {
        title: "Consequential Damages",
        description: "Damage occurring as a consequence of the main accident (e.g., driving with oil leak).",
    },
    {
        title: "War & Nuclear Perils",
        description: "Damages caused by war, mutiny, or nuclear risks.",
    },
    {
        title: "Outside Geographical Area",
        description: "Accidents taking place outside the specified geographical limits.",
    },
];

export default function CoverageInclusionsExclusions() {
    return (
        <section className="py-12 relative overflow-hidden">
            {/* Background Elements */}
            <div className="absolute top-0 left-0 w-full h-full overflow-hidden -z-10 pointer-events-none">
                <div className="absolute top-1/4 -right-64 w-96 h-96 bg-brand-teal/10 rounded-full blur-3xl" />
                <div className="absolute bottom-1/4 -left-64 w-96 h-96 bg-brand-blue/10 rounded-full blur-3xl" />
            </div>

            <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                <div className="text-center max-w-3xl mx-auto mb-16">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.5 }}
                    >
                        <h2 className="text-3xl md:text-4xl font-bold mb-4 bg-linear-to-r from-[#2076C7] via-[#1CADA3] to-[#2076C7] text-transparent bg-clip-text inline-block">
                            What's Covered & What's Not
                        </h2>
                        <p className="text-gray-500 mb-6 max-w-lg mx-auto">
                            While we aim for comprehensive coverage, it&apos;s important to understand what falls outside the policy to avoid surprises during claims.
                        </p>
                    </motion.div>
                </div>

                <div className="max-w-5xl mx-auto">
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-26">
                        {/* Inclusions */}
                        <motion.div
                            initial={{ opacity: 0, x: -50 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.6 }}
                            className="flex flex-col h-full"
                        >
                            <div className="glass-card rounded-2xl px-5 py-6 border border-green-200 border-t-4 border-t-green-500 h-full shadow-sm">
                                <div className="flex items-center gap-3 mb-8">
                                    <div className="p-3 rounded-full bg-green-100 text-green-600">
                                        <ShieldCheck size={24} />
                                    </div>
                                    <div>
                                        <h3 className="text-2xl font-bold text-gray-900">Inclusions</h3>
                                        <p className="text-green-600 font-medium">What we cover</p>
                                    </div>
                                </div>

                                <div className="space-y-4 mt-8">
                                    {inclusions.map((item, index) => (
                                        <motion.div
                                            key={index}
                                            initial={{ opacity: 0, y: 10 }}
                                            whileInView={{ opacity: 1, y: 0 }}
                                            viewport={{ once: true }}
                                            transition={{ delay: 0.1 * index }}
                                            className="flex gap-4"
                                        >
                                            <CheckCircle2 className="w-6 h-6 text-green-500 flex-shrink-0 mt-1" />
                                            <div>
                                                <h4 className="font-semibold text-gray-900">{item.title}</h4>
                                                <p className="text-sm text-gray-500 mt-1">{item.description}</p>
                                            </div>
                                        </motion.div>
                                    ))}
                                </div>
                            </div>
                        </motion.div>

                        {/* Exclusions */}
                        <motion.div
                            initial={{ opacity: 0, x: 50 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.6 }}
                            className="flex flex-col h-full"
                        >
                            <div className="glass-card rounded-2xl px-5 py-6 border border-red-200 border-t-4 border-t-red-500 h-full shadow-sm">
                                <div className="flex items-center gap-3 mb-8">
                                    <div className="p-3 rounded-full bg-red-100 text-red-600">
                                        <AlertOctagon size={24} />
                                    </div>
                                    <div>
                                        <h3 className="text-2xl font-bold text-gray-900">Exclusions</h3>
                                        <p className="text-red-500 font-medium">What we don't cover</p>
                                    </div>
                                </div>

                                <div className="space-y-4">
                                    {exclusions.map((item, index) => (
                                        <motion.div
                                            key={index}
                                            initial={{ opacity: 0, y: 10 }}
                                            whileInView={{ opacity: 1, y: 0 }}
                                            viewport={{ once: true }}
                                            transition={{ delay: 0.1 * index }}
                                            className="flex gap-4"
                                        >
                                            <XCircle className="w-6 h-6 text-red-500 flex-shrink-0 mt-1" />
                                            <div>
                                                <h4 className="font-semibold text-gray-900">{item.title}</h4>
                                                <p className="text-sm text-gray-500 mt-1">{item.description}</p>
                                            </div>
                                        </motion.div>
                                    ))}
                                </div>
                            </div>
                        </motion.div>
                    </div>
                </div>
            </div>
        </section>
    );
}
