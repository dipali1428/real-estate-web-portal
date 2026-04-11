"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  LayoutDashboard, Search, BarChart3, Landmark, FileText
} from "lucide-react";
import FDDashboard from "./dashboard/page";
import FDCompanies from "./companies/page";
import FDCompare from "./compare/page";
// import FDInvestments from "./myinvestments/page";

const tabs = [
  { id: "DASHBOARD", label: "OVERVIEW", icon: LayoutDashboard },
  { id: "EXPLORE", label: "EXPLORE", icon: Search },
  { id: "COMPARE", label: "COMPARE", icon: BarChart3 },
  // { id: "INVESTMENTS", label: "PORTFOLIO", icon: Briefcase },
];

export default function UnifiedFDPage() {
  const [activeTab, setActiveTab] = useState("DASHBOARD");

  return (
        <div className="flex-1 p-4 sm:p-6">

      {/* Redesigned Header: Travel Insurance Style */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-white rounded-[2rem] p-6 lg:p-8 shadow-xl shadow-slate-200/50 border border-slate-100 mb-8 relative overflow-hidden"
      >
        <div className="flex flex-col lg:flex-row items-center justify-between gap-8 relative z-10">

          {/* Left Section: Icon, Title, Subtitle */}
          <div className="flex items-center gap-6 w-full lg:w-auto">
            <div className="w-16 h-16 rounded-2xl bg-linear-to-br from-[#2076C7] to-[#1CADA3] shadow-lg shadow-blue-500/20 flex items-center justify-center shrink-0">
              <Landmark className="text-white" size={32} strokeWidth={2.5} />
            </div>

            <div className="flex flex-col gap-1.5">
              <div className="flex items-center gap-3">
                <h1 className="text-2xl lg:text-3xl font-black tracking-tight bg-gradient-to-r from-[#2076C7] to-[#1CADA3] bg-clip-text text-transparent pb-1">
                  Fixed Deposits
                </h1>
                <span className="px-2.5 py-0.5 bg-emerald-50 text-emerald-600 text-[10px] font-black rounded-lg border border-emerald-100 uppercase tracking-wider shadow-xs">
                  4+ Plans
                </span>
              </div>

              <div className="flex items-center gap-2 text-slate-500">
                <FileText size={14} className="text-slate-400" />
                <p className="text-xs lg:text-sm font-bold opacity-80">
                  Secure your savings with high-yield FD options tailored for you.
                </p>
              </div>
            </div>
          </div>

          {/* Right Section: Tab Navigation */}
          <div className="w-full lg:w-auto bg-[#F1F5F9]/80 backdrop-blur-md p-1.5 rounded-full border border-slate-200/50 flex items-center shadow-inner overflow-x-auto no-scrollbar">
            {tabs.map((tab) => {
              const Icon = tab.icon;
              const isActive = activeTab === tab.id;
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`relative flex items-center gap-2.5 px-6 py-2.5 rounded-full text-[10px] font-black tracking-widest transition-all duration-300 whitespace-nowrap uppercase ${isActive
                    ? "text-white scale-105"
                    : "text-slate-500 hover:text-slate-900 active:scale-95"
                    }`}
                >
                  {isActive && (
                    <motion.div
                      layoutId="activePill"
                      className="absolute inset-0 bg-linear-to-r from-[#2076C7] to-[#1CADA3] rounded-full -z-10 shadow-lg shadow-blue-500/20"
                      transition={{ type: "spring", bounce: 0.25, duration: 0.5 }}
                    />
                  )}
                  <Icon size={14} className={isActive ? "text-white" : "text-slate-400"} />
                  {tab.label}
                </button>
              );
            })}
          </div>
        </div>
      </motion.div>

      {/* Content Rendering Section */}
      <AnimatePresence mode="wait">
        <motion.div
          key={activeTab}
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -20 }}
          transition={{ duration: 0.3, ease: "easeOut" }}
          className="min-h-[500px]"
        >
          {activeTab === "DASHBOARD" && <FDDashboard />}
          {activeTab === "EXPLORE" && <FDCompanies />}
          {activeTab === "COMPARE" && <FDCompare />}
          {/* {activeTab === "INVESTMENTS" && <FDInvestments />} */}
        </motion.div>
      </AnimatePresence>

      {/* @ts-ignore - styled-jsx is injected by Next.js */}
      <style jsx>{`
        .no-scrollbar::-webkit-scrollbar {
          display: none;
        }
        .no-scrollbar {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }
      `}</style>
    </div>
  );
}
