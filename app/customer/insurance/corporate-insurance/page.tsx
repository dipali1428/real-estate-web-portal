"use client";

import { motion } from "framer-motion";
import CorporateInsuranceSection from "./components/CorporateInsuranceSection";

export default function CorporateInsurancePage() {
    return (
        <div className="flex-1 p-4 sm:p-6 bg-[#F8FAFC] min-h-screen font-sans">
            <section className="animate-fade-in">
               

                {/* Main Content Suite */}
                <CorporateInsuranceSection />

                {/* Information Footer */}
                <motion.div 
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.6 }}
                    className="pt-6 sm:pt-10 mt-6 sm:mt-8 border-t border-slate-100"
                >
                    <div className="bg-slate-50/50 rounded-xl sm:rounded-2xl md:rounded-[2rem] p-5 sm:p-6 md:p-8 border border-slate-100">
                        <h3 className="text-xs sm:text-sm font-bold text-[#1CADA3] uppercase tracking-wider mb-3 sm:mb-4">
Disclaimer                        </h3>
                        <p className="text-[10px] sm:text-xs text-slate-500 leading-relaxed font-medium">
                            * Corporate insurance plans (GMC, GPA, WC) are subject to group underwriting and master policy conditions. All quotes provided are indicative and based on the employee demographics shared. Final premiums and coverage limits are confirmed by the insurer after risk evaluation. GMC (Group Medical Cover) usually requires a minimum group size as IRDAI guidelines.
                        </p>
                    </div>
                </motion.div>
            </section>
        </div>
    );
}