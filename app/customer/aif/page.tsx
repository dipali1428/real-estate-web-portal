'use client';

import React from 'react';
import { motion } from 'framer-motion';
import ExploreAIF from './components/ExploreAIF';

export default function AIFDashboard() {
    return (
        <div className="min-h-screen bg-gradient-to-tr from-gray-50 via-white to-blue-50">
            <div className="p-4 sm:p-6 lg:p-8">
                {/* Header Section */}
                <motion.section 
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="relative bg-linear-to-r from-[#1CADA3] to-[#2076C7] rounded-3xl p-8 mb-8 text-white shadow-xl overflow-hidden"
                >
                    <div className="relative z-10">
                        <span className="bg-white/20 backdrop-blur-md px-3 py-1 rounded-lg text-[10px] font-bold tracking-widest uppercase mb-4 inline-block">
                            Alternative Investment Funds
                        </span>
                        <h2 className="text-3xl sm:text-4xl font-extrabold mb-2 tracking-tight">
                            Explore AIF Opportunities
                        </h2>
                        <p className="text-white/80 text-sm sm:text-lg max-w-xl leading-relaxed">
                            Access exclusive Category II & III AIFs, private equity, and structured credit funds. Add to cart to request detailed fund performance and PPM documentation.
                        </p>
                    </div>
                </motion.section>

                {/* Interactive Explore Section */}
                <ExploreAIF />

                {/* Disclaimer Section */}
                <div className="mt-12 p-6 bg-teal-50 rounded-3xl border border-teal-100">
                    <p className="text-xs text-teal-800 leading-relaxed text-center italic">
                        <strong>Disclaimer:</strong> Alternative Investment Funds (AIF) are high-risk investments suitable only for sophisticated investors. Minimum investment required is ₹1 Crore as per SEBI regulations. Registration and detailed documentation (PPM) are mandatory before making any investment decision.
                    </p>
                </div>
            </div>
        </div>
    );
}
