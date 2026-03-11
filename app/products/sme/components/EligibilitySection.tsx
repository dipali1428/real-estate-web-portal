"use client";
import React from "react";
import { motion } from "framer-motion";
import {
  Building2,
  ArrowUpRight,
  Landmark,
  ShieldCheck,
  Factory,
  Briefcase,
} from "lucide-react";

export const EligibilitySection = () => {
  return (
    <section className="py-12 md:py-16 bg-white border-t border-slate-200/50">
      <div className="container mx-auto px-4 md:px-6 max-w-7xl">
        <div className="text-center mb-12 md:mb-16">
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-extrabold font-sans mb-4 leading-tight">
            <span className="text-transparent bg-clip-text bg-linear-to-r from-[#2076C7] via-[#1CADA3] to-[#2076C7]">
              Eligibility Factors Considered
            </span>
          </h2>
          <p className="text-slate-600 max-w-md sm:max-w-xl mx-auto font-normal text-sm sm:text-base md:text-lg leading-relaxed">
            We look at the complete picture of your business. Here are the key
            factors that determine your eligibility and loan limits.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
          {[
            {
              title: "Business Vintage",
              desc: "Minimum 1-3 years of continuous operation depending on the lender.",
              icon: <Building2 className="w-6 h-6 text-[#0056D2]" />,
            },
            {
              title: "Annual Turnover",
              desc: "Consistent revenue flow validating business size and scale.",
              icon: <ArrowUpRight className="w-6 h-6 text-[#0056D2]" />,
            },
            {
              title: "Cash Flow Stability",
              desc: "Healthy month-on-month banking transactions and profitability.",
              icon: <Landmark className="w-6 h-6 text-[#0056D2]" />,
            },
            {
              title: "Credit Profile",
              desc: "Promoter's CIBIL score and the company's credit history.",
              icon: <ShieldCheck className="w-6 h-6 text-[#0056D2]" />,
            },
            {
              title: "Industry Type",
              desc: "Lender policies varying by manufacturing, retail, or service sectors.",
              icon: <Factory className="w-6 h-6 text-[#0056D2]" />,
            },
            {
              title: "Existing Obligations",
              desc: "Current EMIs and debt-to-income ratios ensuring affordability.",
              icon: <Briefcase className="w-6 h-6 text-[#0056D2]" />,
            },
          ].map((factor, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.1 }}
              className="bg-slate-50 p-6 rounded-2xl border border-slate-100 hover:shadow-md transition-all group text-center"
            >
              <div className="w-12 h-12 bg-white rounded-xl shadow-sm flex items-center justify-center mb-4 mx-auto group-hover:scale-110 transition-transform">
                {factor.icon}
              </div>
              <h3 className="font-extrabold text-[#2076C7] text-lg mb-2">
                {factor.title}
              </h3>
              <p className="text-sm text-slate-600 leading-relaxed font-normal">
                {factor.desc}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};
