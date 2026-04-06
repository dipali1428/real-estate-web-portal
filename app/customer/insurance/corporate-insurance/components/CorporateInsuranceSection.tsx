"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  IconShieldCheck,
  IconHeartbeat,
  IconHelmet,
  IconBuildingBank,
  IconShieldLock,
  IconBolt,
  IconActivity,
  IconCheck,
  IconCalculator,
} from "@tabler/icons-react";
import { useModal } from "@/app/context/ModalContext";
import { GroupHealthCalculator } from "@/app/products/corporate-insurance/components/GroupHealthCalculator";
import { CorporatePremiumCalculator } from "@/app/products/corporate-insurance/components/CorporatePremiumCalculator";

const GMC_PLANS = [
  {
    id: "gmc-1",
    category: "Group Medical",
    title: "GMC Comprehensive Benefit",
    insurer: "Niva Bupa Health",
    amount: "₹ 1.5 Cr",
    lives: "36 Members",
    premium: "₹ 54,168",
    color: "from-[#2076C7] to-[#1CADA3]",
    border: "border-blue-200",
    bg: "bg-blue-50/30",
    icon: IconHeartbeat,
    features: [
      "Unlimited Teleconsultations",
      "Accidental Death cover",
      "AMR Covered 10%",
    ],
  },
  {
    id: "gmc-2",
    category: "Group Medical",
    title: "Executive GMC Suite",
    insurer: "ICICI Lombard",
    amount: "₹ 2.5 Cr",
    lives: "50 Members",
    premium: "₹ 82,450",
    color: "from-[#2076C7] to-[#1CADA3]",
    border: "border-teal-200",
    bg: "bg-teal-50/30",
    icon: IconShieldLock,
    features: [
      "OPD Coverage Included",
      "No Disease Wait-period",
      "Maternity Benefit",
    ],
  },
  {
    id: "gmc-3",
    category: "Group Medical",
    title: "Corporate Health Plus",
    insurer: "HDFC ERGO",
    amount: "₹ 3.0 Cr",
    lives: "100 Members",
    premium: "₹ 1,24,500",
    color: "from-[#2076C7] to-[#1CADA3]",
    border: "border-indigo-200",
    bg: "bg-indigo-50/30",
    icon: IconActivity,
    features: [
      "Cashless Hospitalization",
      "Pre-existing Coverage",
      "Wellness Programs",
    ],
  },
];

const GPA_WC_PLANS = [
  {
    id: "wc-1",
    category: "Workman Comp",
    title: "Employees' Compensation",
    insurer: "Bajaj Allianz",
    amount: "₹ 18.1 Lac",
    lives: "10 Employees",
    premium: "₹ 8,108",
    color: "from-[#2076C7] to-[#1CADA3]",
    border: "border-slate-200",
    bg: "bg-slate-50/30",
    icon: IconHelmet,
    features: [
      "Medical Expense coverage",
      "Contractor Employees covered",
      "Height work included",
    ],
  },
  {
    id: "gpa-1",
    category: "Group Accident",
    title: "Master PA Policy",
    insurer: "Tata AIG",
    amount: "₹ 1.0 Cr",
    lives: "Group Policy",
    premium: "₹ 18,585",
    color: "from-[#2076C7] to-[#1CADA3]",
    border: "border-indigo-200",
    bg: "bg-indigo-50/30",
    icon: IconShieldCheck,
    features: [
      "Vector Borne Disease",
      "Age Group 18-65",
      "Accidental Disability",
    ],
  },
  {
    id: "gpa-2",
    category: "Group Accident",
    title: "Corporate PA Shield",
    insurer: "ICICI Lombard",
    amount: "₹ 2.0 Cr",
    lives: "25 Members",
    premium: "₹ 42,750",
    color: "from-[#2076C7] to-[#1CADA3]",
    border: "border-blue-200",
    bg: "bg-blue-50/30",
    icon: IconShieldLock,
    features: [
      "24/7 Global Coverage",
      "Family Floater Option",
      "Air Ambulance Cover",
    ],
  },
];

type TabType = "medical" | "accident-wc" | "calculator";

export default function CorporateInsuranceSection() {
  const [activeTab, setActiveTab] = useState<TabType>("medical");
  const [calcMode, setCalcMode] = useState<"gmc" | "package">("gmc");
  const { openLogin } = useModal();

  const products = activeTab === "medical" ? GMC_PLANS : GPA_WC_PLANS;

  return (
    <div className="space-y-6 sm:space-y-8 font-sans">

      {/* HEADER */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-5 sm:gap-6 md:gap-8 bg-slate-50/80 p-5 sm:p-6 md:p-8 rounded-2xl sm:rounded-3xl md:rounded-[3rem] border border-slate-100 shadow-sm"
      >
        <div className="flex items-center gap-3 sm:gap-4 md:gap-6 w-full lg:w-auto">
          <div className="w-14 h-14 bg-gradient-to-br from-[#2076C7] to-[#1CADA3] rounded-2xl flex items-center justify-center shadow-xl">
            {activeTab === "calculator" ? (
              <IconCalculator size={28} className="text-white" />
            ) : activeTab === "medical" ? (
              <IconHeartbeat size={28} className="text-white" />
            ) : (
              <IconBuildingBank size={28} className="text-white" />
            )}
          </div>

          <div className="flex-1 min-w-0">
            <h2 className="text-xl md:text-2xl font-black text-slate-800">
              {activeTab === "calculator"
                ? "Corporate Quote Builder"
                : activeTab === "medical"
                ? "Group Medical Hub"
                : "Liability & Accident Suite"}
            </h2>

            <p className="text-sm text-slate-500 font-semibold mt-1 flex items-center gap-2 flex-wrap">
              <IconBolt size={16} className="text-[#1CADA3]" />
              {activeTab === "calculator"
                ? "Generate official group insurance quotes instantly"
                : activeTab === "medical"
                ? "Manage group medical benefits for your employees"
                : "Statutory & accident coverage for business continuity"}
            </p>
          </div>
        </div>

        {/* TABS */}
        <div className="flex items-center gap-1.5 sm:gap-2 bg-white p-1.5 sm:p-2 rounded-xl sm:rounded-2xl shadow-inner border border-slate-100 w-full lg:w-auto overflow-x-auto scrollbar-hide">
          {[
            { id: "medical", label: "Group Medical" },
            { id: "accident-wc", label: "Accident & WC" },
            { id: "calculator", label: "Quote Builder" },
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id as TabType)}
              className={`flex-1 lg:flex-none px-4 sm:px-5 md:px-6 py-1.5 sm:py-2 text-[10px] sm:text-xs md:text-sm font-black uppercase rounded-lg sm:rounded-xl transition-all duration-300 whitespace-nowrap ${
                activeTab === tab.id
                  ? "bg-gradient-to-r from-[#2076C7] to-[#1CADA3] text-white shadow-lg"
                  : "text-slate-400 hover:text-slate-600 hover:bg-slate-50"
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>
      </motion.div>

      <div className="relative min-h-[600px]">
        <AnimatePresence mode="wait">
          {activeTab === "calculator" ? (
            <motion.div
              key="calc"
              initial={{ opacity: 0, scale: 0.98 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.98 }}
              className="max-w-7xl mx-auto"
            >
              <div className="bg-white rounded-[3rem] border border-slate-100 shadow-sm overflow-hidden">
                <div className="p-4 sm:p-6 md:p-8 lg:p-12">
                  {/* Internal Sub-tabs for Calculator Mode */}
                  <div className="flex justify-center mb-8">
                    <div className="inline-flex items-center gap-1.5 p-1.5 bg-slate-100 rounded-xl sm:rounded-2xl border border-slate-200">
                      {[
                        { id: "gmc", label: "Group Health (GMC)" },
                        { id: "package", label: "Business Package" },
                      ].map((mode) => (
                        <button
                          key={mode.id}
                          onClick={() => setCalcMode(mode.id as any)}
                          className={`px-4 sm:px-6 py-2 text-[10px] sm:text-xs font-black uppercase tracking-tight rounded-lg sm:rounded-xl transition-all duration-300 ${
                            calcMode === mode.id
                              ? "bg-white text-[#2076C7] shadow-sm"
                              : "text-slate-400 hover:text-slate-600"
                          }`}
                        >
                          {mode.label}
                        </button>
                      ))}
                    </div>
                  </div>

                  <AnimatePresence mode="wait">
                    {calcMode === "gmc" ? (
                      <motion.div
                        key="gmc-calc"
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -10 }}
                      >
                        <GroupHealthCalculator
                          openQuote={openLogin}
                          isDashboard={true}
                        />
                      </motion.div>
                    ) : (
                      <motion.div
                        key="pkg-calc"
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -10 }}
                      >
                        <CorporatePremiumCalculator
                          openQuote={openLogin}
                          isDashboard={true}
                        />
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              </div>
            </motion.div>
          ) : (
            <motion.div
              key="grid"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5 sm:gap-6 md:gap-8"
            >
              {products.map((plan, i) => {
                const Icon = plan.icon;

                return (
                  <motion.div
                    key={plan.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: i * 0.1 }}
                    className={`group relative rounded-[3rem] border ${plan.border} ${plan.bg} p-5 sm:p-6 md:p-8 pb-16 sm:pb-20 shadow-sm hover:shadow-md hover:-translate-y-2 transition-all duration-500`}
                  >
                    {/* Icon & Category */}
                    <div className="flex flex-col items-center text-center mb-5 sm:mb-6 md:mb-8">
                      <div className={`w-14 h-14 sm:w-16 sm:h-16 bg-gradient-to-br ${plan.color} rounded-xl sm:rounded-2xl flex items-center justify-center mb-4 sm:mb-6 shadow-lg group-hover:scale-110 transition-transform duration-500`}>
                        <Icon
                          size={28}
                          className="text-white"
                          strokeWidth={1.5}
                        />
                      </div>
                      <span className="text-[10px] sm:text-xs font-black text-slate-400 uppercase tracking-[0.15em] sm:tracking-[0.2em] mb-1 sm:mb-2">
                        {plan.category}
                      </span>
                      <h3 className="text-base sm:text-lg md:text-xl font-bold text-slate-800 leading-tight">
                        {plan.title}
                      </h3>
                      <p className="text-xs sm:text-sm text-slate-500 mt-1 font-semibold">
                        {plan.insurer}
                      </p>
                    </div>

                    {/* Stats */}
                    <div className="space-y-3 sm:space-y-4 mb-6 sm:mb-8">
                      {[
                        {
                          label: "Sum Insured",
                          val: plan.amount,
                          color: "text-[#2076C7]",
                        },
                        {
                          label: "Lives Covered",
                          val: plan.lives,
                          color: "text-slate-700",
                        },
                        {
                          label: "Premium",
                          val: plan.premium,
                          color: "text-slate-700",
                        },
                      ].map((stat, idx) => (
                        <div
                          key={idx}
                          className="flex justify-between items-center pb-2 sm:pb-3 border-b border-slate-200/50"
                        >
                          <span className="text-[10px] sm:text-xs font-bold text-slate-400 uppercase tracking-wider">
                            {stat.label}
                          </span>
                          <span
                            className={`text-xs sm:text-sm font-black ${stat.color}`}
                          >
                            {stat.val}
                          </span>
                        </div>
                      ))}
                    </div>

                    {/* Features */}
                    <ul className="space-y-2 sm:space-y-3">
                      {plan.features.map((feat) => (
                        <li
                          key={feat}
                          className="flex items-start gap-1.5 sm:gap-2 text-[10px] sm:text-xs font-bold text-slate-600"
                        >
                          <IconCheck
                            size={14}
                            className="text-[#1CADA3] shrink-0 mt-0.5"
                            strokeWidth={3}
                          />
                          <span className="break-words">{feat}</span>
                        </li>
                      ))}
                    </ul>
                  </motion.div>
                );
              })}
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      <style jsx>{`
        .scrollbar-hide::-webkit-scrollbar {
          display: none;
        }
        .scrollbar-hide {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }
      `}</style>
    </div>
  );
}