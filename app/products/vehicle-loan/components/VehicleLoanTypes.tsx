"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Car, Bike, Truck, Tractor, Scissors, HardHat } from "lucide-react";

const vehicleTypes = [
    {
        title: "Car Loan",
        icon: Car,
        link: "calculator",
        description: "Flexible financing for your car at attractive rates.",
        features: ["Low EMI", "Zero Prepayment", "Fast Process"],
    },
    {
        title: "Bike Loan",
        icon: Bike,
        link: "calculator",
        description: "Quick loans for two-wheelers with easy EMIs.",
        features: ["100% Finance", "Minimal Docs", "Instant Disbursal"],
    },
    {
        title: "Commercial Vehicle",
        icon: Truck,
        link: "calculator",
        description: "Customized financing for business logistics.",
        features: ["Custom Tenure", "Working Capital", "Fleet Solutions"],
    },
    {
        title: "Tractor Loan",
        icon: Tractor,
        link: "calculator",
        description: "Agricultural financing to modernize your equipment.",
        features: ["Seasonal Repayment", "No Hidden Charges", "Quick Approvals"],
    },
    {
        title: "Harvester Loan",
        icon: Scissors,
        link: "calculator",
        description: "Specialized loans for harvesting machinery.",
        features: ["Flexible EMI", "High LTV", "Easy Valuation"],
    },
    {
        title: "Construction Equip.",
        icon: HardHat,
        link: "calculator",
        description: "Heavy machinery financing to scale operations.",
        features: ["Higher Loan Amount", "Custom Repayment", "Fast Processing"],
    }
];

export default function VehicleLoanTypes() {
    const [loanCategory, setLoanCategory] = useState<"new" | "used">("new");

    const getDisplayTitle = (title: string, category: "new" | "used") => {
        if (category === "used" && !title.startsWith("Used ") && !title.includes("Equip.") && !title.includes("Tractor") && !title.includes("Harvester")) {
            return `Used ${title}`;
        }
        return title;
    };

    const scrollTo = (id: string) => {
        const el = document.getElementById(id);
        if (el) el.scrollIntoView({ behavior: "smooth", block: "start" });
    };

    return (
        <section className="py-14 md:py-20 bg-white font-sans">
            <div className="container mx-auto px-4">
                {/* Header */}
                <div className="text-center mb-10">
                    <motion.h2
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="text-3xl md:text-4xl font-extrabold mb-3 bg-linear-to-r from-[#2076C7] to-[#1CADA3] bg-clip-text text-transparent drop-shadow-sm"
                    >
                        Choose Your Loan Type
                    </motion.h2>
                    <motion.p
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.1 }}
                        className="text-gray-500 text-base max-w-xl mx-auto"
                    >
                        Find the perfect financing solution matched to your vehicle choice.
                    </motion.p>
                </div>

                {/* Toggle */}
                <div className="flex justify-center mb-10">
                    <div className="inline-flex bg-white border border-gray-200 rounded-xl p-1 gap-1 shadow-sm">
                        <button
                            onClick={() => setLoanCategory("new")}
                            className={`px-6 py-2 rounded-lg text-sm font-semibold transition-all duration-300 ${loanCategory === "new"
                                ? "bg-gradient-to-r from-[#2076C7] to-[#1CADA3] text-white shadow-md"
                                : "text-gray-500 hover:text-gray-700"
                                }`}
                        >
                            New Vehicle
                        </button>
                        <button
                            onClick={() => setLoanCategory("used")}
                            className={`px-6 py-2 rounded-lg text-sm font-semibold transition-all duration-300 ${loanCategory === "used"
                                ? "bg-gradient-to-r from-[#2076C7] to-[#1CADA3] text-white shadow-md"
                                : "text-gray-500 hover:text-gray-700"
                                }`}
                        >
                            Used Vehicle
                        </button>
                    </div>
                </div>

                {/* Cards Grid */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 max-w-6xl mx-auto">
                    {vehicleTypes.map((loan, index) => {
                        const Icon = loan.icon;
                        return (
                            <motion.div
                                key={`${loan.title}-${loanCategory}`}
                                initial={{ opacity: 0, y: 16 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.35, delay: index * 0.07 }}
                                whileHover={{ y: -4 }}
                                className="group bg-white rounded-2xl p-5 flex flex-col border border-gray-200 shadow-md hover:shadow-xl hover:border-[#1CADA3]/40 transition-all duration-300"
                            >
                                {/* Icon + Title Row */}
                                <div className="flex items-center gap-3 mb-3">
                                    <div className="w-10 h-10 rounded-xl bg-gradient-to-r from-[#2076C7] to-[#1CADA3] flex items-center justify-center shrink-0 shadow-sm">
                                        <Icon size={18} className="text-white" />
                                    </div>
                                    <h3 className="text-sm font-bold text-gray-800 leading-tight">
                                        {getDisplayTitle(loan.title, loanCategory)}
                                    </h3>
                                </div>

                                {/* Description */}
                                <p className="text-xs text-gray-400 mb-3 leading-relaxed">
                                    {loanCategory === "used" ? "Quality pre-owned financing options." : loan.description}
                                </p>

                                {/* Feature Tags */}
                                <div className="flex flex-wrap gap-1.5 mb-4">
                                    {loan.features.map((feature, idx) => (
                                        <span
                                            key={idx}
                                            className="text-[10px] font-semibold text-gray-500 bg-gray-100 px-2.5 py-1 rounded-full"
                                        >
                                            {feature}
                                        </span>
                                    ))}
                                </div>

                                {/* CTA Button */}
                                <div className="mt-auto pt-3 border-t border-gray-100">
                                    <button
                                        onClick={() => scrollTo(loan.link)}
                                        className="w-full py-2 rounded-lg text-xs font-bold text-white bg-gradient-to-r from-[#2076C7] to-[#1CADA3] hover:opacity-90 transition-all duration-300"
                                    >
                                        Calculate EMI →
                                    </button>
                                </div>
                            </motion.div>
                        );
                    })}
                </div>
            </div>
        </section>
    );
}
