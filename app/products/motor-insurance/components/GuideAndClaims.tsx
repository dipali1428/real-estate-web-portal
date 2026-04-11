"use client";

import { motion } from "framer-motion";
import { Search, Calculator, FileCheck, Layers, Percent, PhoneCall, FileText, Wrench, CheckCircle } from "lucide-react";

const buyingTips = [
    {
        icon: Search,
        title: "Assess Your Needs",
        description: "Determine whether you need comprehensive coverage or just third-party liability based on your vehicle's age and usage.",
        iconBg: "bg-[#1CADA3]/10",
        iconColor: "text-[#1CADA3]",
        border: "border-gray-200",
        hover: "hover:border-[#1CADA3]",
    },
    {
        icon: Calculator,
        title: "Check IDV (Insured Declared Value)",
        description: "IDV is your vehicle's current market value. Ensure it's not set too low (less claim amount) or too high (higher premium).",
        iconBg: "bg-[#1CADA3]/10",
        iconColor: "text-[#1CADA3]",
        border: "border-gray-200",
        hover: "hover:border-[#1CADA3]",
    },
    {
        icon: Layers,
        title: "Select Right Add-ons",
        description: "Choose add-ons like Zero Depreciation or Engine Protect relevant to your car's specific needs to enhance coverage.",
        iconBg: "bg-[#1CADA3]/10",
        iconColor: "text-[#1CADA3]",
        border: "border-gray-200",
        hover: "hover:border-[#1CADA3]",
    },
    {
        icon: Percent,
        title: "Claim Settlement Ratio",
        description: "Look for an insurer with a high claim settlement ratio to ensure a smooth and hassle-free claims experience.",
        iconBg: "bg-[#1CADA3]/10",
        iconColor: "text-[#1CADA3]",
        border: "border-gray-200",
        hover: "hover:border-[#1CADA3]",
    },
    {
        icon: FileCheck,
        title: "Compare Premiums",
        description: "Don't just buy the first policy you see. Compare quotes and benefits to ensure you get the best value for money.",
        iconBg: "bg-[#1CADA3]/10",
        iconColor: "text-[#1CADA3]",
        border: "border-gray-200",
        hover: "hover:border-[#1CADA3]",
    },
];

const claimSteps = [
    {
        id: 1,
        title: "Notify Us",
        description: "Call our toll-free number or use the mobile app to intimate a claim immediately after the incident.",
        icon: <PhoneCall className="w-8 h-8 text-white" />,
        color: "bg-linear-to-r from-[#2076C7] to-[#1CADA3]",
    },
    {
        id: 2,
        title: "Survey & Inspection",
        description: "Our surveyor will inspect your vehicle and assess the damages. You can also opt for self-inspection via app.",
        icon: <FileText className="w-8 h-8 text-white" />,
        color: "bg-linear-to-r from-[#2076C7] to-[#1CADA3]",
    },
    {
        id: 3,
        title: "Repair",
        description: "Take your vehicle to any of our 3500+ cashless network garages for repair.",
        icon: <Wrench className="w-8 h-8 text-white" />,
        color: "bg-linear-to-r from-[#2076C7] to-[#1CADA3]",
    },
    {
        id: 4,
        title: "Settlement",
        description: "We settle the bill directly with the garage. For reimbursement, payments are processed within 3 days.",
        icon: <CheckCircle className="w-8 h-8 text-white" />,
        color: "bg-linear-to-r from-[#2076C7] to-[#1CADA3]",
    },
];

export default function GuideAndClaims() {
    return (
        <section className="py-12 md:py-16 bg-white relative font-sans">
            <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
                {/* --- Buying Guide Section --- */}
                <div className="mb-20">
                    <div className="text-center max-w-3xl mx-auto mb-12">
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.5 }}
                        >
                            <h2 className="text-3xl md:text-4xl font-extrabold mb-3 bg-linear-to-r from-[#2076C7] to-[#1CADA3] bg-clip-text text-transparent drop-shadow-sm">
                                Things to Consider Before Buying
                            </h2>
                            <p className="text-gray-600 text-lg">
                                Make an informed decision. Keep these key factors in mind when choosing your motor insurance policy.
                            </p>
                        </motion.div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
                        <div className="lg:col-span-3 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
                            {buyingTips.slice(0, 3).map((tip, index) => (
                                <motion.div
                                    key={index}
                                    initial={{ opacity: 0, y: 30 }}
                                    whileInView={{ opacity: 1, y: 0 }}
                                    viewport={{ once: true }}
                                    transition={{ delay: index * 0.1, duration: 0.5 }}
                                    className="group"
                                >
                                    <div className={`bg-white p-6 sm:p-8 rounded-2xl h-full border-2 ${tip.border} ${tip.hover} transition-all duration-300 relative overflow-hidden text-center shadow-sm hover:shadow-xl`}>
                                        <div className={`w-14 h-14 rounded-xl ${tip.iconBg} flex items-center justify-center mb-5 shadow-sm group-hover:scale-110 transition-transform duration-300 mx-auto`}>
                                            <tip.icon size={28} className={tip.iconColor} />
                                        </div>
                                        <h3 className="text-xl font-bold text-gray-900 mb-3 group-hover:text-[#1CADA3] transition-colors leading-tight">
                                            {tip.title}
                                        </h3>
                                        <p className="text-base text-gray-600 leading-relaxed">
                                            {tip.description}
                                        </p>
                                    </div>
                                </motion.div>
                            ))}
                        </div>

                        <div className="lg:col-span-3 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-6 lg:gap-8 max-w-4xl mx-auto w-full">
                            {buyingTips.slice(3).map((tip, index) => (
                                <motion.div
                                    key={index + 3}
                                    initial={{ opacity: 0, y: 30 }}
                                    whileInView={{ opacity: 1, y: 0 }}
                                    viewport={{ once: true }}
                                    transition={{ delay: (index + 3) * 0.1, duration: 0.5 }}
                                    className="group"
                                >
                                    <div className={`bg-white p-6 sm:p-8 rounded-2xl h-full border-2 ${tip.border} ${tip.hover} transition-all duration-300 relative overflow-hidden text-center shadow-sm hover:shadow-xl`}>
                                        <div className={`w-14 h-14 rounded-xl ${tip.iconBg} flex items-center justify-center mb-5 shadow-sm group-hover:scale-110 transition-transform duration-300 mx-auto`}>
                                            <tip.icon size={28} className={tip.iconColor} />
                                        </div>
                                        <h3 className="text-xl font-bold text-gray-900 mb-3 group-hover:text-[#1CADA3] transition-colors leading-tight">
                                            {tip.title}
                                        </h3>
                                        <p className="text-base text-gray-600 leading-relaxed">
                                            {tip.description}
                                        </p>
                                    </div>
                                </motion.div>
                            ))}
                        </div>
                    </div>
                </div>

                {/* --- Hassle-Free Claims Process Section --- */}
                <div className="mt-20 pt-10 border-t border-gray-100">
                    <div className="text-center max-w-3xl mx-auto mb-16">
                        <h2 className="text-3xl md:text-4xl font-extrabold mb-3 bg-linear-to-r from-[#2076C7] to-[#1CADA3] bg-clip-text text-transparent drop-shadow-sm">
                            Hassle-Free Claims Process
                        </h2>
                        <p className="text-gray-600">
                            We&apos;re committed to making your claim experience as smooth as possible. Here&apos;s a quick guide to help you through the process.
                        </p>
                    </div>

                    <div className="relative">
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 relative z-10">
                            {claimSteps.map((step, index) => (
                                <motion.div
                                    key={step.id}
                                    initial={{ opacity: 0, y: 30 }}
                                    whileInView={{ opacity: 1, y: 0 }}
                                    transition={{ duration: 0.5, delay: index * 0.2 }}
                                    viewport={{ once: true }}
                                    className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 text-center group hover:shadow-xl transition-all duration-300"
                                >
                                    <div className={`w-16 h-16 mx-auto rounded-full ${step.color} flex items-center justify-center mb-6 shadow-lg group-hover:scale-110 transition-transform duration-300 relative`}>
                                        {step.icon}
                                    </div>
                                    <h3 className="text-xl font-bold mb-3 text-gray-800">{step.title}</h3>
                                    <p className="text-gray-500 text-sm leading-relaxed">
                                        {step.description}
                                    </p>
                                </motion.div>
                            ))}
                        </div>
                    </div>

                    <div className="mt-16 text-center">
                        <p className="text-gray-600 mb-6">
                            Need help with an existing claim?
                        </p>
                        <button className="px-8 py-3 border-2 border-[#2076C7] text-[#2076C7] font-semibold rounded-lg hover:bg-[#2076C7] hover:text-white transition-all duration-300 cursor-pointer">
                            Track Claim Status
                        </button>
                    </div>
                </div>
            </div>
        </section>
    );
}
