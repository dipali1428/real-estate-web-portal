'use client';

import React from 'react';
import { motion } from 'framer-motion';
import ExplorePMS from './components/ExplorePMS';
import { 
    Briefcase
} from 'lucide-react';

export default function PMSDashboard() {
    return (
        <div className="min-h-screen bg-[#F8FAFC]">
            <div className="p-4 sm:p-6">
                {/* Header Section */}
                <motion.section 
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="relative bg-linear-to-r from-[#2076C7] to-[#1CADA3] rounded-3xl p-8 mb-8 text-white shadow-xl overflow-hidden"
                >
                    <div className="relative z-10">
                        <span className="bg-white/20 backdrop-blur-md px-3 py-1 rounded-lg text-[10px] font-bold tracking-widest uppercase mb-4 inline-block">
                            Portfolio Management Services
                        </span>
                        <h2 className="text-3xl sm:text-4xl font-extrabold mb-2 tracking-tight">
                            Explore PMS Strategies
                        </h2>
                        <p className="text-white/80 text-sm sm:text-lg max-w-xl leading-relaxed">
                            Curated high-alpha investment strategies managed by professional wealth managers. Add your preferred strategies to the cart to build your portfolio.
                        </p>
                    </div>
                    <Briefcase className="absolute -right-10 -bottom-10 w-64 h-64 text-white/5 rotate-12" />
                </motion.section>

                {/* Interactive Explore Section slice */}
                <ExplorePMS />

                {/* Disclaimer Section */}
                <div className="mt-12 p-6 bg-amber-50 rounded-3xl border border-amber-100">
                    <p className="text-xs text-amber-800 leading-relaxed text-center italic">
                        <strong>Disclaimer:</strong> Portfolio Management Services (PMS) involve investment risks. Past performance is not indicative of future results. Minimum investment required is ₹50 Lakhs as per SEBI regulations. Please read the disclosure documents carefully before investing.
                    </p>
                </div>
            </div>
        </div>
    );
}
