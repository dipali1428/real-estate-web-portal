"use client";

import { motion } from "framer-motion";

export default function CTASection() {
    return (
        <section className="py-24 bg-white">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <motion.div
                    initial={{ opacity: 0, scale: 0.95 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6 }}
                    className="bg-gradient-to-br from-[#2076C7] to-[#1CADA3] rounded-[3rem] p-12 md:p-20 text-center text-white shadow-2xl shadow-blue-200/50 relative overflow-hidden"
                >
                    {/* Decorative circles */}
                    <div className="absolute top-0 left-0 w-64 h-64 bg-white/10 rounded-full -translate-x-1/2 -translate-y-1/2" />
                    <div className="absolute bottom-0 right-0 w-64 h-64 bg-white/10 rounded-full translate-x-1/2 translate-y-1/2" />

                    <h2 className="text-3xl md:text-5xl font-extrabold mb-8 relative z-10 leading-tight">
                        Ready to Build a <br /> Stable Financial Future?
                    </h2>
                    <p className="text-blue-50 text-xl font-medium mb-12 max-w-2xl mx-auto relative z-10">
                        Join thousands of smart investors who trust <span className="font-bold text-white">Infinity Arthvishva</span> for premium, fixed-income opportunities.
                    </p>

                    <div className="flex flex-col sm:flex-row justify-center gap-6 relative z-10">
                        <button className="bg-white text-[#2076C7] hover:bg-blue-50 transition-all duration-300 px-10 py-5 rounded-2xl font-bold text-lg shadow-xl shadow-blue-900/10">
                            Start Investing Now
                        </button>
                        <button className="bg-transparent border-2 border-white/40 hover:border-white transition-all duration-300 text-white px-10 py-5 rounded-2xl font-bold text-lg">
                            Contact Advisor
                        </button>
                    </div>
                </motion.div>
            </div>
        </section>
    );
}
