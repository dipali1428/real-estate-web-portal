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
            bg: "bg-purple-100/50",
            border: "border-purple-200",
            icon: "text-purple-700",
            iconBg: "bg-purple-100",
            button: "bg-purple-400 hover:bg-purple-500 shadow-purple-600/20"
        }
    },
    {
        title: "Car Insurance",
        description: "Protect your car with instant policy issuance and a high claim settlement ratio.",
        icon: Car,
        link: "plans",
        theme: {
            bg: "bg-yellow-100/50",
            border: "border-yellow-300",
            icon: "text-yellow-700",
            iconBg: "bg-yellow-100",
            button: "bg-yellow-400 hover:bg-yellow-500 shadow-yellow-500/20"
        }
    },
    {
        title: "Commercial Vehicle",
        description: "Specialized insurance for trucks, buses, and other business-related vehicles.",
        icon: Truck,
        link: "plans",
        theme: {
            bg: "bg-red-100/50",
            border: "border-red-200",
            icon: "text-red-700",
            iconBg: "bg-red-100",
            button: "bg-red-400 hover:bg-red-500 shadow-red-600/20"
        }
    },
    {
        title: "Misc D Insurance",
        description: "Coverage for miscellaneous vehicles and unique risks in the motor segment.",
        icon: ShieldCheck,
        link: "plans",
        theme: {
            bg: "bg-green-100/50",
            border: "border-green-200",
            icon: "text-green-700",
            iconBg: "bg-green-100",
            button: "bg-green-400 hover:bg-green-500 shadow-green-600/20"
        }
    }
];

export default function MotorProductTypes() {
    return (
        <section className="py-10 bg-white">
            <div className="container mx-auto px-4">
                <div className="text-center mb-16">
                    <h2 className="text-3xl md:text-5xl font-extrabold mb-6 bg-linear-to-r from-[#2076C7] via-[#1CADA3] to-[#2076C7] text-transparent bg-clip-text inline-block">
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
                                whileHover={{ y: -10 }}
                                transition={{ duration: 0.4, delay: index * 0.1 }}
                                viewport={{ once: true }}
                                className="flex flex-col items-center text-center p-5 sm:p-8 rounded-[2rem] sm:rounded-[2.5rem] border border-gray-300 shadow-sm transition-all duration-300 relative overflow-hidden group h-full hover:shadow-md hover:scale-[1.02]"
                            >
                                <div className={`w-16 h-16 sm:w-20 sm:h-20 rounded-2xl ${theme.iconBg} flex items-center justify-center mb-5 sm:mb-8 group-hover:scale-110 transition-transform duration-500`}>
                                    <Icon size={36} className={theme.icon} />
                                </div>

                                <h3 className="text-xl sm:text-2xl font-bold text-gray-900 mb-3 sm:mb-4 tracking-tight leading-tight">
                                    {product.title}
                                </h3>

                                <p className="text-gray-600 text-sm leading-relaxed mb-8 sm:mb-10 flex-1">
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
