"use client";

import { motion } from "framer-motion";
import { PhoneCall, FileText, Wrench, CheckCircle } from "lucide-react";

const steps = [
    {
        id: 1,
        title: "Notify Us",
        description: "Call our toll-free number or use the mobile app to intimate a claim immediately after the incident.",
        icon: <PhoneCall className="w-8 h-8 text-white" />,
        color: "bg-[#2076C7]",
    },
    {
        id: 2,
        title: "Survey & Inspection",
        description: "Our surveyor will inspect your vehicle and assess the damages. You can also opt for self-inspection via app.",
        icon: <FileText className="w-8 h-8 text-white" />,
        color: "bg-[#1CADA3]",
    },
    {
        id: 3,
        title: "Repair",
        description: "Take your vehicle to any of our 3500+ cashless network garages for repair.",
        icon: <Wrench className="w-8 h-8 text-white" />,
        color: "bg-[#2076C7]",
    },
    {
        id: 4,
        title: "Settlement",
        description: "We settle the bill directly with the garage. For reimbursement, payments are processed within 3 days.",
        icon: <CheckCircle className="w-8 h-8 text-white" />,
        color: "bg-[#1CADA3]",
    },
];

export default function ClaimsProcess() {
    return (
        <section id="claims" className="py-10 bg-gray-50">
            <div className="container mx-auto px-4 md:px-6">
                <div className="text-center max-w-3xl mx-auto mb-16">
                    <h2 className="text-3xl md:text-4xl font-bold mb-4 bg-linear-to-r from-[#2076C7] via-[#1CADA3] to-[#2076C7] text-transparent bg-clip-text inline-block">
                        Hassle-Free Claims Process
                    </h2>
                    <p className="text-gray-600">
                        We&apos;re committed to making your claim experience as smooth as possible. Here&apos;s a quick guide to help you through the process.
                    </p>
                </div>

                <div className="relative">
                    {/* Connecting Line (Desktop) */}


                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 relative z-10">
                        {steps.map((step, index) => (
                            <motion.div
                                key={step.id}
                                initial={{ opacity: 0, y: 30 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.5, delay: index * 0.2 }}
                                viewport={{ once: true }}
                                className="bg-blue-50/50 p-6 rounded-2xl shadow-sm border border-gray-100 text-center group hover:shadow-xl transition-all duration-300"
                            >
                                <div className={`w-16 h-16 mx-auto rounded-full ${step.color} flex items-center justify-center mb-6 shadow-lg group-hover:scale-110 transition-transform duration-300 relative`}>
                                    {step.icon}
                                    <div className="absolute -top-2 -right-2 w-8 h-8 bg-white rounded-full flex items-center justify-center font-bold text-gray-800 border-2 border-gray-100">
                                        {step.id}
                                    </div>
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
                    <button className="px-8 py-3 border-2 border-[#2076C7] text-[#2076C7] font-semibold rounded-lg hover:bg-[#2076C7] hover:text-white transition-all duration-300">
                        Track Claim Status
                    </button>
                </div>
            </div>
        </section>
    );
}
