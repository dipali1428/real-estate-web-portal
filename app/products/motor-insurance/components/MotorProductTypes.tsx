"use client";

import { motion } from "framer-motion";
import { Bike, Car, Truck, ShieldCheck, ArrowRight } from "lucide-react";

const productTypes = [
    {
        title: "Two Wheeler Insurance",
        description: "Comprehensive coverage for your bike or scooter against accidents and theft.",
        icon: Bike,
        link: "plans",
        theme: {
            bg: "bg-[#1CADA3]/5",
            border: "border-[#1CADA3]/20",
            icon: "text-[#1CADA3]",
            iconBg: "bg-[#1CADA3]/10",
            button: "bg-[#1CADA3] hover:bg-[#1CADA3]/90 shadow-[#1CADA3]/20"
        }
    },
    {
        title: "Car Insurance",
        description: "Protect your car with instant policy issuance and a high claim settlement ratio.",
        icon: Car,
        link: "plans",
        theme: {
            bg: "bg-[#1CADA3]/5",
            border: "border-[#1CADA3]/20",
            icon: "text-[#1CADA3]",
            iconBg: "bg-[#1CADA3]/10",
            button: "bg-[#1CADA3] hover:bg-[#1CADA3]/90 shadow-[#1CADA3]/20"
        }
    },
    {
        title: "Commercial Vehicle",
        description: "Specialized insurance for trucks, buses, and other business-related vehicles.",
        icon: Truck,
        link: "plans",
        theme: {
            bg: "bg-[#1CADA3]/5",
            border: "border-[#1CADA3]/20",
            icon: "text-[#1CADA3]",
            iconBg: "bg-[#1CADA3]/10",
            button: "bg-[#1CADA3] hover:bg-[#1CADA3]/90 shadow-[#1CADA3]/20"
        }
    },
    {
        title: "Misc D Insurance",
        description: "Coverage for miscellaneous vehicles and unique risks in the motor segment.",
        icon: ShieldCheck,
        link: "plans",
        theme: {
            bg: "bg-[#1CADA3]/5",
            border: "border-[#1CADA3]/20",
            icon: "text-[#1CADA3]",
            iconBg: "bg-[#1CADA3]/10",
            button: "bg-[#1CADA3] hover:bg-[#1CADA3]/90 shadow-[#1CADA3]/20"
        }
    }
];

export default function MotorProductTypes() {
    return (
        <section className="py-10 bg-white">
            <div className="container mx-auto px-4">
                <div className="text-center mb-16">
                    <h2 className="text-3xl md:text-4xl font-extrabold mb-3 bg-linear-to-r from-[#2076C7] to-[#1CADA3] bg-clip-text text-transparent drop-shadow-sm">
                        Our Motor Insurance Products
                    </h2>
                    <p className="text-gray-500 text-lg max-w-2xl mx-auto">
                        Experience the most transparent way to secure your vehicle with our tailored plans.
                    </p>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 max-w-7xl mx-auto">
                    {productTypes.map((product, index) => {
                        const Icon = product.icon;
                        const { theme } = product;
                        return (
                            <motion.div
                                key={index}
                                initial={{ opacity: 0, scale: 0.9 }}
                                whileInView={{ opacity: 1, scale: 1 }}
                                whileHover={{ y: -5 }}
                                transition={{ duration: 0.4, delay: index * 0.1 }}
                                viewport={{ once: true }}
                                className="flex flex-col items-center text-center p-4 sm:p-6 rounded-3xl border border-gray-300 shadow-sm transition-all duration-300 relative overflow-hidden group h-full hover:shadow-md hover:scale-[1.02]"
                            >
                                <div className={`w-14 h-14 sm:w-16 sm:h-16 rounded-2xl ${theme.iconBg} flex items-center justify-center mb-4 sm:mb-6 group-hover:scale-110 transition-transform duration-500`}>
                                    <Icon size={28} className={theme.icon} />
                                </div>

                                <h3 className="text-lg sm:text-xl font-bold text-gray-900 mb-2 sm:mb-3 tracking-tight leading-tight">
                                    {product.title}
                                </h3>

                                <p className="text-gray-600 text-sm leading-relaxed mb-6 flex-1">
                                    {product.description}
                                </p>

                                <button
                                    type="button"
                                    onClick={() => {
                                        const element = document.getElementById(product.link);
                                        if (element) {
                                            element.scrollIntoView({ behavior: 'smooth', block: 'start' });
                                        }
                                    }}
                                    className="inline-flex items-center gap-2 font-bold bg-linear-to-r from-[#2076C7] via-[#1CADA3] to-[#2076C7] text-transparent bg-clip-text hover:opacity-80 transition-all group/btn"
                                >
                                    Explore Details
                                    <div className="w-8 h-8 rounded-full bg-white shadow-sm flex items-center justify-center text-[#2076C7] group-hover/btn:bg-[#2076C7] group-hover/btn:text-white transition-all">
                                        <ArrowRight size={18} className="group-hover/btn:translate-x-0.5 transition-transform" />
                                    </div>
                                </button>
                            </motion.div>
                        );
                    })}
                </div>
            </div>
        </section>
    );
}
