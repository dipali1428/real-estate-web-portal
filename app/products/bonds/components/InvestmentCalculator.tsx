"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Calculator, TrendingUp } from "lucide-react";

export default function InvestmentCalculator() {
    const [amount, setAmount] = useState(10000);
    const rate = 11; // Weighted average of our bonds
    const years = 3;

    const total = amount * Math.pow(1 + rate / 100, years);
    const profit = total - amount;

    return (
        <section className="py-24 bg-white relative overflow-hidden">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="max-w-4xl mx-auto flex flex-col md:flex-row gap-12 items-center">
                    <div className="flex-1 text-center md:text-left">
                        <div className="flex items-center justify-center md:justify-start gap-3 mb-6">
                            <TrendingUp className="text-[#1CADA3]" size={36} />
                            <h2 className="text-3xl md:text-4xl font-extrabold bg-clip-text text-transparent bg-gradient-to-r from-[#2076C7] to-[#1CADA3]">
                                Investment Growth Calculator
                            </h2>
                        </div>
                        <p className="text-gray-600 text-lg mb-8 font-sans">
                            See how your wealth could grow with high-yield corporate bonds. Enter an initial investment amount to simulate potential returns over 3 years.
                        </p>
                        <div className="space-y-6">
                            <div className="relative">
                                <label className="text-sm font-bold text-gray-400 mb-2 block uppercase tracking-wide">Enter Investment Amount (₹)</label>
                                <div className="relative group">
                                    <div className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 group-focus-within:text-[#2076C7] transition-colors">
                                        <Calculator size={24} />
                                    </div>
                                    <input
                                        type="number"
                                        value={amount}
                                        onChange={(e) => setAmount(Number(e.target.value))}
                                        className="w-full bg-gray-50 border-2 border-transparent focus:border-[#2076C7] focus:bg-white p-5 pl-14 rounded-2xl text-xl font-bold text-gray-900 transition-all outline-none"
                                        placeholder="Enter amount..."
                                    />
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="flex-1 w-full">
                        <motion.div
                            className="bg-gradient-to-br from-[#2076C7] to-[#1CADA3] p-6 md:p-10 rounded-[3rem] text-white shadow-2xl shadow-blue-200"
                            initial={{ scale: 0.9, opacity: 0 }}
                            whileInView={{ scale: 1, opacity: 1 }}
                            viewport={{ once: true }}
                        >
                            <div className="flex items-center gap-3 mb-8">
                                <div className="p-2 bg-white/20 rounded-lg">
                                    <TrendingUp size={20} />
                                </div>
                                <span className="font-bold text-blue-50">Projected Growth (11% p.a.)</span>
                            </div>

                            <div className="space-y-8">
                                <div>
                                    <p className="text-blue-50/80 text-sm mb-1">Total Estimated Value</p>
                                    <AnimatePresence mode="wait">
                                        <motion.p
                                            key={total}
                                            initial={{ opacity: 0, y: 10 }}
                                            animate={{ opacity: 1, y: 0 }}
                                            className="text-4xl md:text-5xl font-extrabold"
                                        >
                                            ₹{Math.round(total).toLocaleString()}
                                        </motion.p>
                                    </AnimatePresence>
                                </div>

                                <div className="pt-8 border-t border-white/10 flex justify-between">
                                    <div>
                                        <p className="text-blue-50/80 text-sm mb-1">Total Interest Earned</p>
                                        <p className="text-2xl font-bold text-[#1CADA3] filter brightness-125">
                                            + ₹{Math.round(profit).toLocaleString()}
                                        </p>
                                    </div>
                                    <div className="text-right">
                                        <p className="text-blue-50/80 text-sm mb-1">Years to Maturity</p>
                                        <p className="text-2xl font-bold">{years} Years</p>
                                    </div>
                                </div>
                            </div>
                        </motion.div>
                    </div>
                </div>
            </div>
        </section>
    );
}
