"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { ArrowRight, CheckCircle2 } from "lucide-react";

const vehicleTypes = [
    {
        title: "Car Loan",
        link: "calculator",
        description: "Flexible financing for your car with attractive interest rates.",
        features: ["Low EMI", "Zero Prepayment", "Fast Process"]
    },
    {
        title: "Bike Loan",
        link: "calculator",
        description: "Quick and easy loans for two-wheelers with manageable EMIs.",
        features: ["100% Finance", "Minimal Docs", "Instant Disbursal"]
    },
    {
        title: "Commercial Vehicle",
        link: "calculator",
        description: "Empower your business logistics with customized financing.",
        features: ["Custom Tenure", "Working Capital", "Fleet Solutions"]
    },
    {
        title: "Tractors Loan",
        link: "calculator",
        description: "Dedicated agricultural financing to modernize your equipment.",
        features: ["Seasonal Repayment", "No Hidden Charges", "Quick Approvals"]
    },
    {
        title: "Harvester Loan",
        link: "calculator",
        description: "Specialized loans for harvesting machinery to boost yield.",
        features: ["Flexible EMI", "High LTV", "Easy Valuation"]
    },
    {
        title: "Construction Equip.",
        link: "calculator",
        description: "Heavy machinery financing to scale up your operations.",
        features: ["Higher Loan Amount", "Custom Repayment", "Fast Processing"]
    }
];

export default function VehicleLoanTypes() {
    const [loanCategory, setLoanCategory] = useState<"new" | "used">("new");

    const getDisplayTitle = (title: string, category: "new" | "used") => {
        if (category === "used" && !title.startsWith("Used ") && !title.includes("Equip.")) {
            return `Used ${title}`;
        }
        return title;
    };

    return (
        <section className="py-24 bg-gradient-to-b from-white to-gray-50/50">
            <div className="container mx-auto px-4 text-center">
                <motion.h2
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="text-3xl md:text-5xl font-bold mb-6 tracking-tight bg-clip-text text-transparent bg-linear-to-r from-[#2076C7] to-[#1CADA3]"
                >
                    Choose Your Loan Type
                </motion.h2>
                <motion.p
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.1 }}
                    className="text-gray-500 mb-12 text-lg max-w-2xl mx-auto font-medium"
                >
                    Find the perfect financing solution matched to your vehicle choice with an easy application process.
                </motion.p>

                {/* Tabs / Toggle */}
                <motion.div
                    initial={{ opacity: 0, scale: 0.95 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.2 }}
                    className="inline-flex bg-white rounded-2xl p-2 mb-16 shadow-[0_8px_30px_rgb(0,0,0,0.04)] border border-gray-100"
                >
                    <button
                        onClick={() => setLoanCategory("new")}
                        className={`px-8 py-3.5 rounded-xl font-bold text-sm sm:text-base transition-all duration-300 ${loanCategory === "new"
                                ? "bg-gradient-to-r from-[#2076C7] to-[#1CADA3] text-white shadow-lg shadow-blue-500/20 transform scale-100"
                                : "text-gray-500 hover:text-gray-800 hover:bg-gray-50"
                            }`}
                    >
                        New Vehicle Loans
                    </button>
                    <button
                        onClick={() => setLoanCategory("used")}
                        className={`px-8 py-3.5 rounded-xl font-bold text-sm sm:text-base transition-all duration-300 ${loanCategory === "used"
                                ? "bg-gradient-to-r from-[#2076C7] to-[#1CADA3] text-white shadow-lg shadow-blue-500/20 transform scale-100"
                                : "text-gray-500 hover:text-gray-800 hover:bg-gray-50"
                            }`}
                    >
                        Used Vehicle Loans
                    </button>
                </motion.div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-7xl mx-auto text-left">
                    {vehicleTypes.map((loan, index) => (
                        <motion.div
                            key={`${loan.title}-${loanCategory}`}
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.4, delay: index * 0.1 }}
                            whileHover={{ y: -5 }}
                            className="group bg-white border border-gray-100 rounded-[2rem] p-8 flex flex-col cursor-pointer transition-all duration-500 shadow-[0_8px_30px_rgb(0,0,0,0.04)] hover:shadow-xl hover:shadow-[#1CADA3]/10 hover:border-[#2076C7]/20 relative overflow-hidden"
                            onClick={() => {
                                const element = document.getElementById(loan.link);
                                if (element) {
                                    element.scrollIntoView({ behavior: 'smooth', block: 'start' });
                                } else {
                                    const form = document.getElementById('apply-now-form');
                                    if (form) form.scrollIntoView({ behavior: 'smooth' });
                                }
                            }}
                        >
                            {/* Decorative background blob */}
                            <div className="absolute top-0 right-0 w-64 h-64 bg-linear-to-bl from-[#2076C7]/5 via-[#1CADA3]/5 to-transparent rounded-full -mr-20 -mt-20 opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none" />

                            <div className="flex justify-between items-start mb-6 relative z-10">
                                <div>
                                    <h3 className="text-2xl font-bold text-gray-900 mb-2 group-hover:text-[#2076C7] transition-colors">
                                        {getDisplayTitle(loan.title, loanCategory)}
                                    </h3>
                                    <p className="text-gray-500 text-sm leading-relaxed font-medium">
                                        {loanCategory === "used" ? "Quality pre-owned options perfectly fit for your budget." : loan.description}
                                    </p>
                                </div>
                            </div>

                            <div className="mt-8 space-y-3 relative z-10 flex-1">
                                {loan.features.map((feature, idx) => (
                                    <div key={idx} className="flex items-center gap-3">
                                        <div className="w-5 h-5 rounded-full bg-teal-50 flex items-center justify-center shrink-0">
                                            <CheckCircle2 size={12} className="text-[#1CADA3]" />
                                        </div>
                                        <span className="text-sm font-semibold text-gray-700">{feature}</span>
                                    </div>
                                ))}
                            </div>

                            <div className="mt-8 pt-6 border-t border-gray-100 flex items-center justify-between relative z-10">
                                <span className="text-sm font-bold text-[#2076C7] group-hover:text-[#1CADA3] transition-colors">
                                    Calculate EMI
                                </span>
                                <div className="w-10 h-10 rounded-full bg-gray-50 flex items-center justify-center text-gray-400 group-hover:bg-[#2076C7] group-hover:text-white transition-all duration-300 shadow-sm group-hover:shadow-[0_4px_15px_rgba(32,118,199,0.3)]">
                                    <ArrowRight size={18} className="group-hover:translate-x-0.5 transition-transform" />
                                </div>
                            </div>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
}
