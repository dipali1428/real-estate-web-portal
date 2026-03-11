"use client";

import React from "react";
import { motion } from "framer-motion";
import {
  ShieldCheck, Star, Zap, Anchor,
  GraduationCap, Landmark, Info,
  CheckCircle2, AlertCircle
} from "lucide-react";

const topPlans = [
  {
    name: "Axis Max Life Smart Term",
    shortName: "Term Plus",
    insurer: "Max Life",
    icon: ShieldCheck,
    color: "#2076C7",
    type: "Term Insurance",
    benefit: "Pure Protection",
    cover: "₹1 Cr - ₹5 Cr",
    payout: "Instant",
    unique: "Skip-a-premium",
    rating: 4.9
  },
  {
    name: "HDFC Life Sanchay Plus",
    shortName: "Sanchay Plus",
    insurer: "HDFC Life",
    icon: Landmark,
    color: "#1CADA3",
    type: "Savings Plan",
    benefit: "Guaranteed Income",
    cover: "SA + Maturity",
    payout: "Maturity/Income",
    unique: "Fixed Returns",
    rating: 4.8
  },
  {
    name: "ICICI Pru SmartKid Assure",
    shortName: "SmartKid",
    insurer: "ICICI Pru",
    icon: GraduationCap,
    color: "#7C3AED",
    type: "Child Plan",
    benefit: "Education Security",
    cover: "Education Goal",
    payout: "Milestone",
    unique: "Waiver of Premium",
    rating: 4.8
  },
  {
    name: "Tata AIA Param Raksha",
    shortName: "Param Raksha",
    insurer: "Tata AIA",
    icon: Zap,
    color: "#EC4899",
    type: "Combo Plan",
    benefit: "360° Safety",
    cover: "Life + Health + Acc.",
    payout: "Multi-event",
    unique: "Hospital Cash",
    rating: 4.7
  },
  {
    name: "HDFC Life Pension",
    shortName: "Pension",
    insurer: "HDFC Life",
    icon: Anchor,
    color: "#F59E0B",
    type: "Retirement",
    benefit: "Retirement Income",
    cover: "Pension for Life",
    payout: "Annuity",
    unique: "Market Linked",
    rating: 4.7
  }
];

const ATTRS = [
  { label: "Plan Category", key: "type" },
  { label: "Primary Benefit", key: "benefit" },
  { label: "Life Cover / SA", key: "cover" },
  { label: "Payout Structure", key: "payout" },
  { label: "Unique Feature", key: "unique" },
];

export default function TopPlansComparison() {
  return (
    <section
      className="py-16 md:py-24 bg-white relative overflow-hidden font-sans"
      id="plan-comparison"
    >
      {/* Background Blur */}
      <div className="absolute top-0 left-1/2 w-[700px] md:w-[1000px] h-[700px] md:h-[1000px] bg-slate-50 rounded-full blur-[120px] -translate-x-1/2 -translate-y-1/2 pointer-events-none opacity-60" />

      <div className="container-custom relative z-10 px-6 md:px-10 mx-auto max-w-7xl">

        {/* Header */}
        <div className="text-center mb-14 md:mb-20 max-w-3xl mx-auto">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-3xl md:text-4xl lg:text-5xl font-bold bg-gradient-to-r from-[#2076C7] to-[#1CADA3] bg-clip-text text-transparent mb-6"
          >
            Insurance Blueprints Comparison
          </motion.h2>

          <p className="text-gray-500 text-lg md:text-xl font-light leading-relaxed">
            Find the right fit for your lifelong financial protection.
          </p>
        </div>

        {/* Table Card */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="bg-white rounded-[2rem] md:rounded-[3rem] border border-slate-100 shadow-[0_30px_80px_rgba(0,0,0,0.06)] overflow-hidden"
        >
          <div className="overflow-x-auto">
            <table className="w-full min-w-[750px] md:min-w-[900px]">

              {/* Table Header */}
              <thead>
                <tr className="bg-gradient-to-r from-[#2076C7] to-[#1CADA3] text-white">
                  <th className="p-4 md:p-6 font-bold text-xs md:text-sm uppercase tracking-wider text-left w-40 md:w-56">
                    Attributes
                  </th>

                  {topPlans.map((plan, i) => (
                    <th key={i} className="p-4 md:p-6 text-center">
                      <div className="flex flex-col items-center gap-1">
                        <span className="text-xs md:text-sm font-bold">
                          {plan.shortName}
                        </span>
                        <span className="text-[9px] md:text-[10px] font-medium text-white/80 uppercase tracking-widest">
                          {plan.insurer}
                        </span>
                      </div>
                    </th>
                  ))}
                </tr>
              </thead>

              {/* Table Body */}
              <tbody>
                {ATTRS.map((attr, idx) => (
                  <tr
                    key={idx}
                    className={`transition-colors hover:bg-blue-50/50 ${idx % 2 === 0 ? "bg-white" : "bg-neutral-50/60"
                      }`}
                  >
                    <td className="p-4 md:p-6 font-bold text-gray-700 uppercase text-[9px] md:text-[10px] tracking-widest">
                      {attr.label}
                    </td>

                    {topPlans.map((plan, pi) => (
                      <td key={pi} className="p-4 md:p-6 text-center">
                        <span className="text-xs md:text-sm font-medium text-gray-700">
                          {plan[attr.key as keyof typeof plan] as string}
                        </span>
                      </td>
                    ))}
                  </tr>
                ))}

                {/* Rating Row */}
                <tr className="bg-white hover:bg-blue-50/50 transition-colors">
                  <td className="p-4 md:p-6">
                    <div className="font-bold text-gray-700 uppercase text-[9px] md:text-[10px] tracking-widest mb-1">
                      Expert Rating*
                    </div>
                    <div className="text-[8px] md:text-[9px] text-slate-400 font-medium normal-case tracking-wide">
                      Source: CRISIL & Independent Audit
                    </div>
                  </td>

                  {topPlans.map((plan, i) => (
                    <td key={i} className="p-4 md:p-6 text-center">
                      <div className="flex flex-col items-center gap-1">
                        <div className="flex gap-0.5">
                          {[...Array(5)].map((_, si) => (
                            <Star
                              key={si}
                              className={`w-3 h-3 ${si < Math.floor(plan.rating)
                                  ? "fill-[#2076C7] text-[#2076C7]"
                                  : "text-slate-200"
                                }`}
                            />
                          ))}
                        </div>
                        <span className="text-xs md:text-sm font-bold text-gray-900">
                          {plan.rating} / 5.0
                        </span>
                      </div>
                    </td>
                  ))}
                </tr>
              </tbody>
            </table>
          </div>
        </motion.div>

        {/* Bottom Badges */}
        <div className="mt-12 flex flex-wrap items-center justify-center gap-4 text-center">
          <div className="flex items-center gap-2 bg-emerald-50 text-emerald-600 px-4 py-2 rounded-full border border-emerald-100">
            <CheckCircle2 className="w-3.5 h-3.5" />
            <span className="text-[10px] font-black uppercase tracking-widest">
              Digital Claim Guarantee
            </span>
          </div>

          <div className="flex items-center gap-2 bg-blue-50 text-[#2076C7] px-4 py-2 rounded-full border border-blue-100">
            <AlertCircle className="w-3.5 h-3.5" />
            <span className="text-[10px] font-black uppercase tracking-widest">
              IRDAI Certified Plans
            </span>
          </div>
        </div>

      </div>
    </section>
  );
}
