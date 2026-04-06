"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import {
  LayoutDashboard,
  Search,
  BarChart3,
  Briefcase,
  Landmark,
  Calculator
} from "lucide-react";
import FDDashboard from "./dashboard/page";
import FDCompanies from "./companies/page";
import FDCompare from "./compare/page";
import FDInvestments from "./myinvestments/page";

const tabs = [
  { id: "DASHBOARD", label: "Overview", icon: LayoutDashboard },
  { id: "EXPLORE", label: "Explore FDs", icon: Search },
  { id: "COMPARE", label: "Compare FDs", icon: BarChart3 },
  { id: "INVESTMENTS", label: "My Investments", icon: Briefcase },
];

export default function UnifiedFDPage() {
  const [activeTab, setActiveTab] = useState("DASHBOARD");

  return (
    <div className="flex-1 p-4 sm:p-8 bg-gray-50/50 min-h-screen">
      {/* Header Banner */}
      <motion.div
        initial={{ opacity: 0, scale: 0.98 }}
        animate={{ opacity: 1, scale: 1 }}
        className="relative bg-gradient-to-r from-[#1CADA3] via-[#15857e] to-[#2076C7] rounded-3xl p-6 sm:p-10 mb-8 text-white shadow-xl overflow-hidden"
      >
        <div className="absolute -top-24 -right-24 w-64 h-64 bg-white/10 rounded-full blur-3xl"></div>
        <div className="relative z-10 flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/20 text-white text-[10px] font-black tracking-widest uppercase mb-4 backdrop-blur-md border border-white/10">
              <Landmark size={12} />
              Fixed Deposits
            </div>
            <h1 className="text-3xl sm:text-4xl font-black mb-2 leading-tight">
              Fixed Deposit
            </h1>
            <p className="text-white/80 text-sm font-medium">Explore, compare, and manage your FDs</p>
          </div>
        </div>
      </motion.div>

      {/* Tabs UI */}
      <div className="flex justify-center mb-8 relative z-20 overflow-x-auto pb-4 hide-scrollbar">
        <div className="inline-flex bg-white p-1.5 rounded-full border border-gray-200 shadow-sm whitespace-nowrap">
          {tabs.map((tab) => {
            const Icon = tab.icon;
            const isActive = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`relative z-10 flex items-center gap-2 px-5 py-2.5 rounded-full text-sm font-black transition-all duration-300 ${isActive
                  ? "text-white shadow-md"
                  : "text-gray-500 hover:text-gray-900 hover:bg-gray-50"
                  }`}
              >
                {isActive && (
                  <motion.div
                    layoutId="activeTabBadge"
                    className="absolute inset-0 bg-gradient-to-r from-[#2076C7] to-[#1CADA3] rounded-full -z-10"
                    transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
                  />
                )}
                <Icon size={16} className={isActive ? "text-white" : "text-gray-400"} />
                {tab.label}
              </button>
            );
          })}
        </div>
      </div>

      {/* Dynamic Content Rendering */}
      <motion.div
        key={activeTab}
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -10 }}
        transition={{ duration: 0.3 }}
      >
        {activeTab === "DASHBOARD" && <FDDashboard />}
        {activeTab === "EXPLORE" && <FDCompanies />}
        {activeTab === "COMPARE" && <FDCompare />}
        {activeTab === "INVESTMENTS" && <FDInvestments />}
      </motion.div>

      <style jsx>{`
        .hide-scrollbar::-webkit-scrollbar {
          display: none;
        }
        .hide-scrollbar {
          -ms-overflow-style: none; /* IE and Edge */
          scrollbar-width: none; /* Firefox */
        }
      `}</style>
    </div>
  );
}
