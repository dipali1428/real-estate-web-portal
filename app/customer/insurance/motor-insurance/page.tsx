"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import {
    Car,
    LayoutDashboard,
    FileText,
    ShieldCheck,
} from "lucide-react";

// Pages
import MotorDashboard from "@/app/customer/insurance/motor-insurance/dashboard/page";
import MotorQuotes from "@/app/customer/insurance/motor-insurance/quotes/page";
import MotorPolicies from "@/app/customer/insurance/motor-insurance/policies/page";

const tabs = [
    { id: "QUOTES", label: "Quotes", icon: FileText },
    { id: "POLICIES", label: "Policies", icon: ShieldCheck },
    { id: "DASHBOARD", label: "My Applications", icon: LayoutDashboard },
];

export default function MotorInsurancePage() {
    const [activeTab, setActiveTab] = useState("QUOTES");

    return (
        <div className="flex-1 p-4 sm:p-6">

            {/* Header */}
            <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4 }}
                className="relative bg-white rounded-2xl p-5 mb-6 shadow-sm border border-slate-100/60"
            >
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">

                        {/* Left Section */}
                        <div className="flex flex-col sm:flex-row items-center sm:items-start gap-4 text-center sm:text-left">
                            <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-[#2076C7] to-[#1CADA3] shadow-md shadow-blue-500/20 flex items-center justify-center text-white shrink-0">
                                <Car size={26} strokeWidth={2.5} />
                            </div>

                            <div className="flex flex-col items-center sm:items-start">
                                <div className="flex flex-col sm:flex-row items-center gap-2 sm:gap-3 mb-1">
                                    <h1 className="text-xl sm:text-2xl font-bold text-slate-800">
                                        Motor Insurance
                                    </h1>

                                    <span className="px-2.5 py-1 bg-blue-50 text-blue-600 text-[10px] font-bold rounded-full border border-blue-100 uppercase tracking-widest whitespace-nowrap">
                                        ACTIVE POLICIES
                                    </span>
                                </div>

                                <p className="text-sm text-slate-500 flex items-center justify-center sm:justify-start gap-2">
                                    <LayoutDashboard size={14} className="text-[#2076C7]" />
                                    Protect your vehicle with smart insurance plans
                                </p>
                            </div>
                        </div>

                        {/* Tabs Section */}
                        <div className="w-full sm:w-auto mt-4 sm:mt-0">
                            <div className="p-1 bg-slate-100/80 backdrop-blur-sm rounded-2xl sm:rounded-full flex flex-col sm:flex-row sm:items-center gap-1 relative shadow-inner border border-slate-200/50">
                                {tabs.map((tab) => {
                                    const Icon = tab.icon;
                                    const isActive = activeTab === tab.id;

                                    return (
                                        <button
                                            key={tab.id}
                                            onClick={() => setActiveTab(tab.id)}
                                            className={`relative w-full sm:w-auto px-4 md:px-5 py-2.5 md:py-2 rounded-xl sm:rounded-full text-[10px] md:text-xs font-bold uppercase tracking-wider transition-all duration-300 z-10 flex items-center justify-center sm:justify-start gap-1.5 ${isActive
                                                ? "text-white"
                                                : "text-slate-500 hover:text-slate-700"
                                                }`}
                                        >
                                            {isActive && (
                                                <motion.div
                                                    layoutId="motorActiveTab"
                                                    className="absolute inset-0 bg-gradient-to-r from-[#2076C7] to-[#1CADA3] rounded-xl sm:rounded-full -z-10 shadow-sm"
                                                    transition={{
                                                        type: "spring",
                                                        bounce: 0.2,
                                                        duration: 0.6,
                                                    }}
                                                />
                                            )}

                                            <Icon size={14} />
                                            <span>{tab.label}</span>
                                        </button>
                                    );
                                })}
                            </div>
                        </div>
                    </div>
            </motion.div>

            {/* Content */}
            <motion.div
                key={activeTab}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3 }}
            >
                {activeTab === "DASHBOARD" && <MotorDashboard />}
                {activeTab === "QUOTES" && <MotorQuotes />}
                {activeTab === "POLICIES" && <MotorPolicies />}
            </motion.div>
        </div>
    );
}