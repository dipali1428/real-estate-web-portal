"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
    ChevronRight,
    ShieldCheck,
    ShieldAlert,
    ShieldX,
    Heart,
    Activity,
    Users,
    CircleDashed,
    Flame
} from "lucide-react";
import Link from "next/link";

const tabs = [
    { id: "bike", label: "Bike" },
    { id: "car", label: "Car" },
    { id: "commercial", label: "Commercial" },
    { id: "Misc-D", label: "Misc-D" },
];

const tabData: Record<string, { cards: { title: string; icon: any; badge?: string }[]; link: string; label: string }> = {
    bike: {
        cards: [
            { title: "Third Party", icon: <ShieldAlert className="w-12 h-12 text-[#1CADA3]" /> },
            { title: "Comprehensive", icon: <ShieldCheck className="w-12 h-12 text-[#1CADA3]" />, badge: "Recommended" },
            { title: "Own Damage", icon: <ShieldX className="w-12 h-12 text-[#1CADA3]" /> },
        ],
        link: "/offers/protection/two-wheeler-insurance",
        label: "Bike"
    },
    car: {
        cards: [
            { title: "Third Party", icon: <ShieldAlert className="w-12 h-12 text-[#1CADA3]" /> },
            { title: "Comprehensive", icon: <ShieldCheck className="w-12 h-12 text-[#1CADA3]" />, badge: "Recommended" },
            { title: "Own Damage", icon: <ShieldX className="w-12 h-12 text-[#1CADA3]" /> },
        ],
        link: "/offers/protection/car-insurance",
        label: "Car"
    },
    commercial: {
        cards: [
            { title: "Third Party", icon: <ShieldAlert className="w-12 h-12 text-[#1CADA3]" /> },
            { title: "Comprehensive", icon: <ShieldCheck className="w-12 h-12 text-[#1CADA3]" />, badge: "Recommended" },
            { title: "Own Damage", icon: <ShieldX className="w-12 h-12 text-[#1CADA3]" /> },
        ],
        link: "/offers/protection/commercial-vehicle-insurance",
        label: "Commercial"
    },
    "Misc-D": {
        cards: [
            { title: "Third Party", icon: <ShieldAlert className="w-12 h-12 text-red" /> },
            { title: "Comprehensive", icon: <ShieldCheck className="w-12 h-12 text-purple" />, badge: "Recommended" },
            { title: "Own Damage", icon: <ShieldX className="w-12 h-12 text-green" /> },
        ],
        link: "/offers/protection/misc-d-insurance",
        label: "Misc-D"
    }
};

const cardStyles = [
    { bg: "bg-red-100", iconBg: "bg-red-100", iconColor: "text-red-700", border: "border-red-100" },
    { bg: "bg-purple-100", iconBg: "bg-purple-100", iconColor: "text-purple-700", border: "border-purple-100" },
    { bg: "bg-green-100", iconBg: "bg-green-100", iconColor: "text-green-700", border: "border-green-100" },
];

export default function InsuranceProducts() {
    const [activeTab, setActiveTab] = useState("bike");

    return (
        <section id="types" className="py-16 bg-gradient-to-br from-[#F8F5FF] via-[#FFFFFF] to-[#FFF5F8]">
            <div className="container mx-auto px-4 md:px-6">
                {/* Title Section */}
                <div className="text-center mb-10">
                    <h2 className="text-3xl md:text-4xl font-bold mb-4 bg-linear-to-r from-[#2076C7] via-[#1CADA3] to-[#2076C7] text-transparent bg-clip-text inline-block">
                        Types Of Insurance Products
                    </h2>
                </div>

                {/* Tab Navigation */}
                <div className="flex justify-center items-center gap-8 md:gap-12 mb-12 overflow-x-auto pb-4 no-scrollbar">
                    {tabs.map((tab) => (
                        <button
                            key={tab.id}
                            onClick={() => setActiveTab(tab.id)}
                            className={`relative text-lg md:text-2xl font-semibold transition-all duration-300 px-3 py-1 ${activeTab === tab.id ? "text-[#1CADA3]" : "text-gray-400 hover:text-gray-600"
                                }`}
                        >
                            {tab.label}
                            {activeTab === tab.id && (
                                <motion.div
                                    layoutId="activeTab"
                                    className="absolute -bottom-1 left-3 right-3 h-[2px] bg-[#1CADA3] rounded-full"
                                    transition={{ type: "spring", stiffness: 300, damping: 30 }}
                                />
                            )}
                        </button>
                    ))}
                </div>

                {/* Content Cards */}
                <div className="max-w-5xl mx-auto">
                    <AnimatePresence mode="wait">
                        <motion.div
                            key={activeTab}
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -10 }}
                            transition={{ duration: 0.3, ease: "easeOut" }}
                            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-12 px-4"
                        >
                            {tabData[activeTab].cards.map((card, index) => {
                                const style = cardStyles[index % cardStyles.length];
                                return (
                                    <motion.div
                                        key={index}
                                        whileHover={{ y: -6, boxShadow: "0 20px 40px -12px rgba(28, 173, 163, 0.08)" }}
                                        className={`${style.bg} rounded-[2rem] p-8 flex flex-col items-center justify-center text-center shadow-[0_4px_20px_rgba(0,0,0,0.02)] border ${style.border} group transition-all duration-300 relative overflow-hidden`}
                                    >
                                        {(card as any).badge && (
                                            <div className="absolute top-0 right-0 py-1.5 px-4 bg-linear-to-r from-[#2076C7] to-[#1CADA3] text-white text-[10px] font-bold rounded-bl-xl shadow-sm">
                                                {(card as any).badge}
                                            </div>
                                        )}
                                        <div className={`mb-6 w-20 h-20 rounded-2xl ${style.iconBg} flex items-center justify-center group-hover:scale-110 transition-transform duration-500`}>
                                            <div className={`w-10 h-10 ${style.iconColor}`}>
                                                {card.icon}
                                            </div>
                                        </div>
                                        <h3 className="text-lg md:text-xl font-bold text-[#1F2937] tracking-tight group-hover:text-[#1CADA3] transition-colors duration-300">
                                            {card.title}
                                        </h3>
                                    </motion.div>
                                );
                            })}
                        </motion.div>
                    </AnimatePresence>

                    {/* Footer Link */}
                    <div className="text-center">
                        <Link
                            href={tabData[activeTab].link}
                            className="inline-flex items-center gap-2 text-[#1CADA3] text-base md:text-lg font-bold hover:gap-4 transition-all duration-300 group"
                        >
                            Learn More About {tabData[activeTab].label}
                            <ChevronRight className="w-5 h-5 stroke-[2.5px] transition-transform duration-300 group-hover:translate-x-1" />
                        </Link>
                    </div>
                </div>
            </div>
        </section>
    );
}
