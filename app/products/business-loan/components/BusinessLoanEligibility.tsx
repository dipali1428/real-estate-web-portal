"use client";

import { motion } from "framer-motion";
import {
    CheckCircle2,
    Briefcase,
    User,
    MapPin,
    CalendarCheck,
    FileCheck,
    BadgeCheck
} from "lucide-react";

const criteria = [
    {
        title: "Eligible Entities",
        items: ["Proprietorship Firms", "Partnership Firms", "Private Limited Companies", "LLPs"],
        icon: <Briefcase className="text-red-600" />,
        bg: "bg-red-50",
        cardBg: "from-white to-red-50/30",
        borderColor: "border-red-100"
    },
    {
        title: "Business Vintage",
        items: ["Minimum 1 years in operations", "At least 1 year in current location", "Stable revenue generation"],
        icon: <CalendarCheck className="text-emerald-600" />,
        bg: "bg-emerald-50",
        cardBg: "from-white to-emerald-50/30",
        borderColor: "border-emerald-100"
    },
    {
        title: "Applicant Age",
        items: ["Minimum 22 years at application", "Maximum 60 years at maturity"],
        icon: <User className="text-purple-600" />,
        bg: "bg-purple-50",
        cardBg: "from-white to-purple-50/30",
        borderColor: "border-purple-100"
    },
    {
        title: "Financial Health",
        items: ["Healthy Credit Score (CIBIL 700+)", "Turnover(1cr+) - 50 lacs funding"],
        icon: <BadgeCheck className="text-yellow-600" />,
        bg: "bg-yellow-50",
        cardBg: "from-white to-yellow-50/30",
        borderColor: "border-yellow-100"
    }
];

const documents = [
    { title: "Aadhar Card & PAN Card", icon: <User size={20} />, color: "text-blue-600", bg: "bg-blue-50" },
    { title: "Udyam Aadhar Registration", icon: <Briefcase size={20} />, color: "text-emerald-600", bg: "bg-emerald-50" },
    { title: "Shop Act Licence / GST Reg", icon: <FileCheck size={20} />, color: "text-purple-600", bg: "bg-purple-50" },
    { title: "Last 1 Year Banking Statement", icon: <CalendarCheck size={20} />, color: "text-rose-600", bg: "bg-rose-50" },
    { title: "Address Proof (Utility Bill)", icon: <MapPin size={20} />, color: "text-orange-600", bg: "bg-orange-50" },
    { title: "ITR for last 3 Years", icon: <BadgeCheck size={20} />, color: "text-teal-600", bg: "bg-teal-50" },
    { title: "Recent Photograph", icon: <User size={20} />, color: "text-indigo-600", bg: "bg-indigo-50" },
    { title: "Business Continuity Proof", icon: <Briefcase size={20} />, color: "text-cyan-600", bg: "bg-cyan-50" }
];

export default function BusinessLoanEligibility() {
    return (
        <div className="flex flex-col">
            {/* Eligibility Section (Full Width) */}
            <section className="py-14 md:py-24 bg-gray-50/50">
                <div className="container mx-auto px-4 md:px-6">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="text-center max-w-3xl mx-auto mb-16"
                    >
                        <h2 className="text-3xl md:text-5xl font-bold mb-6 tracking-tight bg-clip-text text-transparent bg-linear-to-r from-[#2076C7] to-[#1CADA3]">
                            Eligibility Criteria
                        </h2>
                        <p className="text-lg text-gray-600 font-medium leading-relaxed">
                            We've simplified our requirements to ensure you can access growth capital without the usual hurdles.
                        </p>
                    </motion.div>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-7xl mx-auto">
                        {criteria.map((item, index) => (
                            <motion.div
                                key={index}
                                initial={{ opacity: 0, scale: 0.95 }}
                                whileInView={{ opacity: 1, scale: 1 }}
                                viewport={{ once: true }}
                                transition={{ delay: index * 0.1 }}
                                className="relative group h-full"
                            >
                                <div className={`absolute inset-0 bg-linear-to-br ${item.cardBg} rounded-[2.5rem] border ${item.borderColor} shadow-sm group-hover:shadow-xl transition-all duration-300`} />
                                <div className="relative p-8 flex flex-col items-center text-center h-full">
                                    <div className={`w-14 h-14 rounded-2xl ${item.bg} flex items-center justify-center mb-6 shadow-sm group-hover:scale-110 transition-transform`}>
                                        {item.icon}
                                    </div>
                                    <h3 className="text-lg font-bold text-gray-900 mb-6 flex items-center gap-2">
                                        {item.title}
                                    </h3>
                                    <div className="flex-grow">
                                        <ul className="space-y-4">
                                            {item.items.map((li, i) => (
                                                <li key={i} className="flex items-start gap-4 text-gray-600 font-semibold text-sm">
                                                    <div className={`mt-0.5 p-1 rounded-full ${item.bg} ${item.icon.props.className} shrink-0`}>
                                                        <CheckCircle2 size={12} />
                                                    </div>
                                                    <span className="leading-tight group-hover:text-gray-900 transition-colors">{li}</span>
                                                </li>
                                            ))}
                                        </ul>
                                    </div>
                                </div>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Documents Section (Full Width) */}
            <section className="py-14 md:py-24 bg-white border-y border-gray-100">
                <div className="container mx-auto px-4 md:px-6">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="text-center max-w-3xl mx-auto mb-16"
                    >
                        <h2 className="text-3xl md:text-5xl font-bold mb-6 tracking-tight bg-clip-text text-transparent bg-linear-to-r from-[#2076C7] to-[#1CADA3]">
                            Required Documents
                        </h2>
                        <p className="text-lg text-gray-600 font-medium leading-relaxed">
                            Keep these digital copies ready for a lightning-fast application and disbursal process.
                        </p>
                    </motion.div>

                    <div className="max-w-7xl mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                        {documents.map((doc, idx) => (
                            <motion.div
                                key={idx}
                                initial={{ opacity: 0, scale: 0.9 }}
                                whileInView={{ opacity: 1, scale: 1 }}
                                viewport={{ once: true }}
                                transition={{ delay: idx * 0.05 }}
                                whileHover={{ y: -5, scale: 1.02 }}
                                className="flex items-center gap-3 p-4 rounded-3xl bg-gray-50/50 border-gray-300 hover:bg-white hover:shadow-xl border border-gray-100 hover:border-[#2076C7]/20 transition-all duration-300 group"
                            >
                                <div className={`w-10 h-10 rounded-2xl ${doc.bg} ${doc.color} flex items-center justify-center transition-all shadow-sm group-hover:scale-110 shrink-0`}>
                                    {doc.icon}
                                </div>
                                <span className="text-gray-800 font-bold text-sm tracking-tight leading-tight">{doc.title}</span>
                            </motion.div>
                        ))}
                    </div>

                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.4 }}
                        className="mt-10 sm:mt-16 max-w-2xl mx-auto p-5 sm:p-8 rounded-[2rem] sm:rounded-[2.5rem] bg-linear-to-br from-yellow-50 to-orange-50 border border-yellow-100 flex flex-col sm:flex-row items-center sm:items-start gap-4 sm:gap-6 shadow-sm text-center sm:text-left"
                    >
                        <div className="shrink-0 w-16 h-16 rounded-full bg-white flex items-center justify-center text-yellow-600 shadow-sm">
                            <BadgeCheck size={32} />
                        </div>
                        <div>
                            <h4 className="font-bold text-gray-900 mb-1">100% Digital Process</h4>
                            <p className="text-sm text-gray-700 font-semibold leading-relaxed">
                                Tip: We only require digital scans/copies. No physical document collection is needed for the initial application phase.
                            </p>
                        </div>
                    </motion.div>
                </div>
            </section>
        </div>
    );
}
