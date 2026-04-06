"use client";

import { motion } from "framer-motion";
import LoanProtectorSection from "./components/LoanProtectorSection";

export default function LoanProtectorPage() {
    return (
        <div className="flex-1 p-4 sm:p-6 bg-[#F8FAFC] min-h-screen font-sans">
            <section className="animate-fade-in">
    

                {/* Main Content Suite */}
                <LoanProtectorSection />

                {/* Information Footer */}
                <motion.div 
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.6 }}
                    className="pt-6 sm:pt-10 mt-6 sm:mt-8 border-t border-slate-100"
                >
                    <div className="bg-slate-50/50 rounded-xl sm:rounded-2xl md:rounded-[2rem] p-5 sm:p-6 md:p-8 border border-slate-100">
                        <h3 className="text-xs sm:text-sm font-bold text-[#1CADA3] uppercase tracking-wider mb-3 sm:mb-4">
                            Coverage Note
                        </h3>
                        <p className="text-[10px] sm:text-xs text-slate-500 leading-relaxed font-medium">
                            * Loan protector insurance plans are dynamic term policies where the sum insured decreases in alignment with your reducing loan balance. This makes it more cost-effective than standard life insurance for debt coverage. Accidental death and critical illness riders are available as add-ons. Coverage is subject to the terms of the master policy and loan agreement.
                        </p>
                    </div>
                </motion.div>
            </section>
        </div>
    );
}