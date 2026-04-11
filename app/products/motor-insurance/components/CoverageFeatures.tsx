"use client";

import { motion } from "framer-motion";
import { Wrench, CloudRain, Users, Gavel, Flame, Zap } from "lucide-react";

const features = [
    {
        icon: <Wrench className="w-6 h-6 text-white" />,
        title: "Accidental Damage",
        description: "Coverage against damages caused to your vehicle due to accidents or collisions.",
        color: "bg-[#2076C7]",
    },
    {
        icon: <CloudRain className="w-6 h-6 text-white" />,
        title: "Natural Calamities",
        description: "Protection against damages due to floods, earthquakes, storms, and other natural disasters.",
        color: "bg-[#1CADA3]",
    },
    {
        icon: <Users className="w-6 h-6 text-white" />,
        title: "Third Party Liability",
        description: "Covers legal liabilities arising from death, injury, or property damage to third parties.",
        color: "bg-purple-500",
    },
    {
        icon: <Gavel className="w-6 h-6 text-white" />,
        title: "Theft & Burglary",
        description: "Get compensated in case your vehicle gets stolen or damaged due to burglary.",
        color: "bg-orange-500",
    },
    {
        icon: <Flame className="w-6 h-6 text-white" />,
        title: "Fire & Explosion",
        description: "Coverage against damages caused by fire, explosion, self-ignition, or lightning.",
        color: "bg-red-500",
    },
    {
        icon: <Zap className="w-6 h-6 text-white" />,
        title: "Man-made Calamities",
        description: "Protection against riots, strikes, malicious acts, and terrorist activities.",
        color: "bg-yellow-500",
    },
];

export default function CoverageFeatures() {
    return (
        <section id="features" className="py-20 bg-gray-50">
            <div className="container mx-auto px-4 md:px-6">
                <div className="text-center max-w-3xl mx-auto mb-16">
                    <h2 className="text-3xl md:text-4xl font-bold mb-4 bg-linear-to-r from-[#2076C7] via-[#1CADA3] to-[#2076C7] text-transparent bg-clip-text inline-block">
                        Comprehensive Coverage Features
                    </h2>
                    <p className="text-gray-600">
                        We&apos;ve got you covered against all odds. Drive with complete peace of mind.
                    </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {features.map((feature, index) => (
                        <motion.div
                            key={index}
                            initial={{ opacity: 0, scale: 0.9 }}
                            whileInView={{ opacity: 1, scale: 1 }}
                            transition={{ duration: 0.4, delay: index * 0.1 }}
                            viewport={{ once: true }}
                            className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 hover:shadow-lg transition-all duration-300 flex items-start gap-4 group"
                        >
                            <div className={`shrink-0 w-12 h-12 rounded-xl ${feature.color} flex items-center justify-center shadow-md group-hover:scale-110 transition-transform duration-300`}>
                                {feature.icon}
                            </div>
                            <div>
                                <h3 className="text-lg font-bold mb-2 text-gray-800">{feature.title}</h3>
                                <p className="text-sm text-gray-500 leading-relaxed">
                                    {feature.description}
                                </p>
                            </div>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
}
