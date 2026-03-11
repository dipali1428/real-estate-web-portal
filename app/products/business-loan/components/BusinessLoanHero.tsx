"use client";

import { motion } from "framer-motion";
import { ShieldCheck, ArrowRight } from "lucide-react";

interface BusinessLoanHeroProps {
    onApplyClick: () => void;
    onCalculateClick: () => void;
}

export default function BusinessLoanHero({
    onApplyClick,
    onCalculateClick,
}: BusinessLoanHeroProps) {
    return (
        <section className="relative overflow-hidden font-sans bg-white pt-0">
            {/* Background pattern */}
            <div className="absolute inset-0 opacity-40">
                <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-blue-50 rounded-full blur-3xl -ml-64 -mb-64"></div>
            </div>

            <div className="relative container mx-auto px-4 pt-24 pb-10 md:pt-12 md:pb-16 z-10">
                <div className="text-center max-w-6xl mx-auto">

                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8, ease: "easeOut" }}
                        className="flex flex-col items-center"
                    >

                        {/* Badge */}
                        <div className="inline-flex items-center gap-2 px-3 py-1.5 sm:px-4 sm:py-2 rounded-full bg-teal-50 border border-teal-100 text-blue-600 font-semibold text-xs sm:text-sm mb-6 shadow-sm text-center">
                            <ShieldCheck size={18} />
                            <span>Fuel Your Business Growth with Confidence</span>
                        </div>

                        {/* Heading */}
                        <h1
                            className="text-3xl sm:text-5xl md:text-6xl lg:text-7xl font-bold mb-4 sm:mb-6 leading-tight"
                            style={{
                                background: "linear-gradient(to right, #2076C7, #1CADA3, #2076C7)",
                                WebkitBackgroundClip: "text",
                                WebkitTextFillColor: "transparent",
                                backgroundClip: "text",
                            }}
                        >
                            <span className="sm:whitespace-nowrap">
                                Empowering Business with
                            </span>
                            <span className="block">
                                Smart Financing
                            </span>
                        </h1>

                        {/* Description */}
                        <p className="text-base sm:text-lg md:text-xl lg:text-2xl mb-8 sm:mb-10 text-gray-700 leading-relaxed max-w-3xl">
                            Get flexible, low-interest business loans designed to scale your
                            enterprise. Fast approvals and zero hidden costs.
                        </p>

                        {/* Buttons */}
                        <div className="flex flex-col sm:flex-row justify-center gap-4 w-full max-w-md sm:max-w-none">
                            <button
                                onClick={onApplyClick}
                                className="group relative text-white px-8 py-4 rounded-lg font-semibold text-lg shadow-lg hover:shadow-xl transform hover:-translate-y-1 transition-all duration-300 overflow-hidden cursor-pointer"
                                style={{ background: "linear-gradient(to right, #1CADA3, #2076C7)" }}
                            >
                                <div className="relative z-10 flex items-center justify-center gap-2">
                                    <span>Apply Now</span>
                                    <ArrowRight
                                        size={22}
                                        className="group-hover:translate-x-1 transition-transform"
                                    />
                                </div>

                                <div
                                    className="absolute inset-0 transform scale-x-0 group-hover:scale-x-100 transition-transform origin-left duration-300"
                                    style={{ background: "linear-gradient(to right, #189B8D, #1A68B0)" }}
                                ></div>
                            </button>

                            <button
                                onClick={onCalculateClick}
                                className="group relative bg-white px-8 py-4 rounded-lg font-semibold text-lg border-2 hover:bg-blue-50 transform hover:-translate-y-1 transition-all duration-300 shadow-md hover:shadow-lg"
                                style={{ color: "#2076C7", borderColor: "#2076C7" }}
                            >
                                <span className="relative z-10">Calculate EMI</span>
                            </button>
                        </div>

                        {/* Stats */}
                        <div className="mt-10 sm:mt-16 flex flex-wrap justify-center gap-6 sm:gap-10 md:gap-20 w-full max-w-6xl mx-auto">

                            <div className="flex flex-col items-center">
                                <div className="text-4xl font-extrabold mb-1 tracking-tight bg-linear-to-r from-[#2076C7] to-[#1CADA3] bg-clip-text text-transparent">
                                    9.5%
                                    <span className="text-xl md:text-2xl font-bold align-top ml-1 text-[#2076C7]">*</span>
                                </div>

                                <div className="text-[10px] md:text-xs font-bold text-gray-500 uppercase tracking-[0.3em]">
                                    Starting APR
                                </div>

                                <div className="w-12 h-1 bg-[#009B91] mt-2 rounded-full opacity-30"></div>
                            </div>

                            <div className="flex flex-col items-center">
                                <div className="text-4xl font-extrabold mb-1 tracking-tight bg-linear-to-r from-[#2076C7] to-[#1CADA3] bg-clip-text text-transparent">
                                    24
                                    <span className="text-xl md:text-2xl font-bold ml-2 text-[#2076C7]">
                                        Hrs
                                    </span>
                                </div>

                                <div className="text-[10px] md:text-xs font-bold text-gray-500 uppercase tracking-[0.3em]">
                                    Fast Approval
                                </div>

                                <div className="w-12 h-1 bg-[#009B91] mt-2 rounded-full opacity-30"></div>
                            </div>

                        </div>

                    </motion.div>

                </div>
            </div>
        </section>
    );
}