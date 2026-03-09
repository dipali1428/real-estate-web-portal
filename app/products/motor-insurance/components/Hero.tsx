"use client";

import { motion } from "framer-motion";
import { ShieldCheck, ArrowRight, Check, Star } from "lucide-react";

export default function Hero() {
    return (
        <section className="relative min-h-[70vh] flex items-center justify-center overflow-hidden bg-white pt-20 pb-10">
            <div className="container mx-auto px-4 md:px-6 relative z-10">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center max-w-7xl mx-auto">
                    {/* Left Column: Marketing Copy */}
                    <motion.div
                        initial={{ opacity: 0, x: -30 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.8 }}
                        className="flex flex-col items-start lg:-translate-y-8"
                    >
                        <div className="inline-flex items-center gap-2 px-4 py-2 mt-6 rounded-full bg-blue-50 border border-blue-100 text-[#2076C7] font-medium text-sm mb-6 lg:mb-8">
                            <ShieldCheck size={16} />
                            <span>Trusted by 10 Lakhs+ Happy Customers</span>
                        </div>

                        <h1
                            className="text-4xl sm:text-5xl md:text-6xl lg:text-[72px] font-bold mb-4 sm:mb-6 leading-tight"
                            style={{
                                background: "linear-gradient(to right, #2076C7, #1CADA3, #2076C7)",
                                WebkitBackgroundClip: "text",
                                WebkitTextFillColor: "transparent",
                                backgroundClip: "text",
                            }}
                        >
                            <span className="whitespace-nowrap">
                                Save up to 50%* on
                            </span>
                            <span className="block">
                                Motor Insurance
                            </span>
                        </h1>

                        <p className="text-lg md:text-xl text-gray-600 mb-8 leading-relaxed max-w-xl">
                            We don&apos;t just sell policies; we provide peace of mind. Experience the fastest, most transparent way to secure your vehicle.
                        </p>


                        <div className="relative w-full max-w-xs h-48 md:h-[240px] animate-float hidden lg:block translate-x-12 -translate-y-12">
                            <img
                                src="/motor-insurance/hero.jpg"
                                alt="Motor Insurance"
                                className="w-full h-full object-contain"
                            />
                        </div>
                    </motion.div>

                    {/* Right Column: Lead Capture Form */}

                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8, delay: 0.2 }}
                        className="w-full max-w-lg lg:ml-auto lg:-translate-y-12"
                    >
                        <div className="bg-white rounded-3xl shadow-[0_20px_50px_rgba(0,0,0,0.1)] p-8 border border-gray-100 relative overflow-hidden">
                            <h3 className="text-2xl font-bold text-gray-800 mb-6">Get Instant Quote</h3>

                            {/* Vehicle Registration Number Input */}
                         {/* Vehicle Registration Number Input */}
                            <div className="relative mb-6">
                                <fieldset className="border-2 border-[#2076C7] rounded-xl px-4 pb-2 pt-1 group focus-within:border-[#1CADA3] transition-colors">
                                    <legend className="text-[#2076C7] text-xs font-bold px-1 ml-2 group-focus-within:text-[#1CADA3]">
                                        Vehicle registration number
                                    </legend>
                                    <input
                                        type="text"
                                        placeholder="E.G. MH01AA1234"
                                        className="w-full bg-transparent border-none focus:ring-0 outline-none text-gray-800 font-bold text-xl uppercase placeholder:text-gray-300 placeholder:normal-case h-10"
                                    />
                                </fieldset>
                                <div className="flex justify-between mt-2 px-1">
                                    <button className="text-[#2076C7] text-xs font-bold underline hover:no-underline">Got a new vehicle</button>
                                    <button className="text-[#2076C7] text-xs font-bold underline hover:no-underline">View prices</button>
                                </div>
                            </div>

                            {/* Email ID Input */}
                            <div className="mb-4">
                                <input
                                    type="email"
                                    placeholder="Enter Email ID"
                                    className="w-full px-6 py-4 rounded-xl border border-gray-200 focus:border-[#2076C7] focus:ring-1 focus:ring-[#2076C7]/20 outline-none transition-all text-gray-800 font-medium text-lg placeholder:text-gray-400"
                                />
                            </div>

                            {/* Mobile Number Input */}
                            <div className="mb-6">
                                <input
                                    type="tel"
                                    placeholder="Enter Mobile number"
                                    className="w-full px-6 py-4 rounded-xl border border-gray-200 focus:border-[#2076C7] focus:ring-1 focus:ring-[#2076C7]/20 outline-none transition-all text-gray-800 font-medium text-lg placeholder:text-gray-400"
                                />
                            </div>

                            {/* Get Quote Button */}
                            <button className="w-full py-4 bg-linear-to-r from-[#2076C7] to-[#1CADA3] hover:shadow-lg hover:shadow-blue-500/25 text-white font-extrabold text-xl rounded-2xl transition-all active:scale-[0.98] mb-6 flex items-center justify-center gap-3">
                                Get Your Quote Now <ArrowRight size={24} />
                            </button>

                            {/* Checkboxes */}
                            <div className="space-y-4">
                                <label className="flex items-start gap-3 cursor-pointer group">
                                    <div className="relative flex items-center mt-1">
                                        <input type="checkbox" className="peer hidden" defaultChecked />
                                        <div className="w-5 h-5 border-2 border-gray-300 rounded peer-checked:border-[#2076C7] peer-checked:bg-[#2076C7] transition-all" />
                                        <Check size={14} className="absolute text-white left-1 opacity-0 peer-checked:opacity-100 transition-opacity" />
                                    </div>
                                    <span className="text-gray-500 text-xs font-medium leading-tight">
                                        I agree to the <span className="underline text-[#2076C7]">terms and conditions</span> and privacy policy.
                                    </span>
                                </label>
                            </div>
                        </div>
                    </motion.div>
                </div>
            </div>
        </section>
    );
}
                                                                                    