"use client";

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  LayoutDashboard,
  Calculator,
  PiggyBank,
  CalendarDays,
  UserPlus,
  Briefcase,
  User
} from "lucide-react";
import NPSDashboard from "./dashboard/page";
import NPSCalculator from "./calculator/page";
import NPSMeetingsPage from "./meetings/page";
import ScheduleMeetingModal from "./ScheduleMeetingModal";

const tabs = [
  { id: "DASHBOARD", label: "Overview", icon: LayoutDashboard },
  { id: "CALCULATOR", label: "Calculator", icon: Calculator },
  // { id: "INVESTMENTS", label: "My Investments", icon: Briefcase },
  { id: "MEETINGS", label: "Meetings", icon: CalendarDays },
];

export default function UnifiedNPSPage() {
  const [activeTab, setActiveTab] = useState("DASHBOARD");
  const [showScheduleModal, setShowScheduleModal] = useState(false);

  useEffect(() => {
    const handleOpenModal = () => setShowScheduleModal(true);
    window.addEventListener('openScheduleModal', handleOpenModal);
    return () => window.removeEventListener('openScheduleModal', handleOpenModal);
  }, []);

  return (
    <div className="flex-1 p-4 sm:p-6 bg-gray-50/50 min-h-screen">

      {/* 🔷 UPDATED HEADER (Loan Style) */}
      <motion.div
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
        className="relative bg-white rounded-2xl p-5 mb-6 shadow-sm border border-slate-100/60"
      >
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">

          {/* Left Section */}
          <div className="flex flex-col sm:flex-row items-center sm:items-start gap-4 text-center sm:text-left">
            <div className="w-12 h-12 rounded-xl bg-gradient-to-r from-[#2076C7] to-[#1CADA3] flex items-center justify-center text-white font-bold shadow-md shrink-0">
              <PiggyBank size={22} />
            </div>

            <div className="flex flex-col items-center sm:items-start">
              <div className="flex flex-col sm:flex-row items-center gap-2 sm:gap-3 mb-1">
                <h2 className="text-xl sm:text-2xl font-bold text-slate-800">
                  National Pension System
                </h2>

                <span className="px-2.5 py-1 bg-emerald-100 text-emerald-700 text-[10px] font-bold rounded-full border border-emerald-200 whitespace-nowrap">
                  Tier I & II
                </span>
              </div>

              <p className="text-sm text-slate-500 flex items-center justify-center sm:justify-start gap-2">
                <LayoutDashboard size={14} className="text-[#2076C7]" />
                Plan, invest & track your retirement savings
              </p>
            </div>
          </div>

          {/* Tabs Section */}
          <div className="w-full sm:w-auto mt-4 sm:mt-0">
            <div className="p-1 bg-slate-100/80 backdrop-blur-sm rounded-2xl sm:rounded-full flex flex-col sm:flex-row sm:items-center gap-1 relative shadow-inner border border-slate-200/50">

              {tabs.map((tab) => {
                const Icon = tab.icon;
                const isActive = activeTab === tab.id;

                return (
                  <button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id)}
                    className={`relative w-full sm:w-auto px-4 md:px-5 py-2.5 md:py-2 rounded-xl sm:rounded-full text-[10px] md:text-xs font-bold uppercase tracking-wider transition-all duration-300 z-10 flex items-center justify-center sm:justify-start gap-1.5 ${isActive
                      ? "text-white"
                      : "text-slate-500 hover:text-slate-700"
                      }`}
                  >
                    {isActive && (
                      <motion.div
                        layoutId="activeTab"
                        className="absolute inset-0 bg-gradient-to-r from-[#2076C7] to-[#1CADA3] rounded-xl sm:rounded-full -z-10 shadow-sm"
                        transition={{
                          type: "spring",
                          bounce: 0.2,
                          duration: 0.6,
                        }}
                      />
                    )}

                    <Icon size={14} />
                    <span>{tab.label}</span>
                  </button>
                );
              })}
            </div>
          </div>
        </div>
      </motion.div>


      {/* Content */}
      <AnimatePresence mode="wait">
        <motion.div
          key={activeTab}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -10 }}
          transition={{ duration: 0.3, ease: "easeOut" }}
          className="min-h-[500px]"
        >
          {activeTab === "DASHBOARD" && <NPSDashboard />}
          {activeTab === "CALCULATOR" && <NPSCalculator />}
          {activeTab === "MEETINGS" && <NPSMeetingsPage />}
        </motion.div>
      </AnimatePresence>

      {/* Modal */}
      {showScheduleModal && (
        <ScheduleMeetingModal onClose={() => {
          setShowScheduleModal(false);
          // Refresh list if we are on the meetings tab
          if (activeTab === "MEETINGS") {
            window.location.reload(); // Simple way to refresh
          }
        }} />
      )}

      {/* Hide Scrollbar */}
      <style jsx>{`
        .hide-scrollbar::-webkit-scrollbar {
          display: none;
        }
        .hide-scrollbar {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }
      `}</style>
    </div>
  );
}