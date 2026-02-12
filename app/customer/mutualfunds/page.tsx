'use client';

import { motion } from 'framer-motion';

export default function Dashboard() {
    return (
        <div className="flex-1 p-4 sm:p-6">
            <section className="min-h-[70vh] flex items-center justify-center">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5 }}
                    className="w-full max-w-2xl text-center">
                    {/* Gradient Card */}
                    <div className="relative bg-linear-to-r from-[#2076C7] to-[#1CADA3] rounded-3xl p-10 text-white shadow-xl overflow-hidden">

                        {/* Decorative Blur Circle */}
                        <div className="absolute -top-10 -right-10 w-40 h-40 bg-white/10 rounded-full blur-2xl"></div>

                        <h1 className="text-3xl sm:text-4xl font-bold mb-4">
                            🚀 New Customer Dashboard
                        </h1>

                        <p className="text-base sm:text-lg text-white/90 mb-6">
                            We’re building something amazing for you.
                        </p>

                        <div className="bg-white/10 border border-white/20 rounded-xl px-6 py-4 inline-block backdrop-blur-sm">
                            <p className="text-lg font-semibold tracking-wide">
                                Coming Soon
                            </p>
                        </div>

                        <p className="mt-6 text-sm text-white/80">
                            Stay tuned! Your personalized dashboard experience is on the way.
                        </p>
                    </div>
                </motion.div>
            </section>
        </div>
    );
}
