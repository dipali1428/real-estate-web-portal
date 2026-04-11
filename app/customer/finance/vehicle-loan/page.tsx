"use client";

import React, { useState } from "react";
// import { useModal } from "@/app/context/ModalContext";
import { motion, AnimatePresence } from "framer-motion";
import {
  Car,
  Search,
  Plus,
  FileText,
  Landmark,
  Settings2,
  Calculator as CalculatorIcon,
  LayoutDashboard
} from "lucide-react";
import ExploreOffers from "./components/ExploreOffers";
import MyApplications from "./components/MyApplications";
import NewApplicationForm from "./components/NewApplicationForm";
import Calculator from "./components/Calculator";

const tabs = [
  { id: "EXPLORE", label: "Explore Offers", icon: Landmark },
  { id: "CALCULATOR", label: "EMI Calculator", icon: CalculatorIcon },
  { id: "APPLICATIONS", label: "My Applications", icon: FileText },
];

export default function VehicleLoanDashboard() {
  const [activeTab, setActiveTab] = useState("EXPLORE");
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [sortBy, setSortBy] = useState<"default" | "rate-asc" | "rate-desc">("default");
  const [showFilters, setShowFilters] = useState(false);
  // const { setLoanModalOpen } = useModal();

  // useEffect(() => {
  //   // Only call if the function exists in the context (prevents crash on older versions)
  //   if (typeof setLoanModalOpen === 'function') {
  //     setLoanModalOpen(isFormOpen);
  //   }
  //   return () => {
  //     if (typeof setLoanModalOpen === 'function') {
  //       setLoanModalOpen(false);
  //     }
  //   };
  // }, [isFormOpen, setLoanModalOpen]);

  return (
    <div className="flex-1 p-4 sm:p-6 bg-gray-50/50 min-h-screen font-sans">

      {/* 🔷 Premium Header Card */}
      <motion.div
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
        className="relative bg-white rounded-2xl p-5 mb-8 shadow-sm border border-slate-100/60"
      >
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">

          {/* Left Section */}
          <div className="flex flex-col sm:flex-row items-center sm:items-start gap-4 text-center sm:text-left">
            <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-[#2076C7] to-[#1CADA3] shadow-md shadow-blue-500/20 flex items-center justify-center text-white shrink-0">
              <Car size={26} strokeWidth={2.5} />
            </div>

            <div className="flex flex-col items-center sm:items-start">
              <div className="flex flex-col sm:flex-row items-center gap-2 sm:gap-3 mb-1">
                <h1 className="text-xl sm:text-2xl font-bold text-slate-800">
                  Vehicle Loan
                </h1>
              </div>

              <p className="text-sm text-slate-500 flex items-center justify-center sm:justify-start gap-2">
                <LayoutDashboard size={14} className="text-[#2076C7]" />
                Financing for your next dream ride
              </p>
            </div>
          </div>

          {/* Tabs Section */}
          <div className="w-full sm:w-auto">
            <div className="p-1.5 bg-slate-100/80 backdrop-blur-sm rounded-2xl sm:rounded-full flex flex-col sm:flex-row sm:items-center gap-1 relative shadow-inner border border-slate-200/50">

              {tabs.map((tab) => {
                const Icon = tab.icon;
                const isActive = activeTab === tab.id;

                return (
                  <button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id)}
                    className={`relative w-full sm:w-auto px-5 py-2.5 sm:py-2 rounded-xl sm:rounded-full text-[10px] sm:text-xs font-bold uppercase tracking-widest transition-all duration-300 z-10 flex items-center justify-center sm:justify-start gap-2 ${isActive
                      ? "text-white"
                      : "text-slate-500 hover:text-slate-700"
                      }`}
                  >
                    {isActive && (
                      <motion.div
                        layoutId="vehicleActiveTab"
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

      {/* Unified Action Bar: Search, Filters, and New Application */}
      {activeTab === "EXPLORE" && (
        <div className="flex flex-col md:flex-row items-center gap-4 mb-8">
          {/* Search Bar */}
          <div className="relative flex-1 w-full">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
            <input
              type="text"
              placeholder="Search partner banks..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-12 pr-4 py-3 bg-white border border-slate-200 rounded-2xl text-sm font-medium text-slate-900 placeholder-slate-400 focus:outline-none focus:ring-4 focus:ring-blue-500/5 focus:border-blue-500/50 transition-all shadow-sm"
            />
          </div>

          <div className="flex items-center gap-3 w-full md:w-auto">
            <div className="relative">
              <button
                onClick={() => setShowFilters(!showFilters)}
                className={`flex items-center gap-2 px-5 py-3 bg-white border border-slate-200 rounded-2xl text-sm font-bold text-slate-600 hover:bg-slate-50 transition-all shadow-sm group ${showFilters ? 'border-blue-500 ring-4 ring-blue-500/5' : ''}`}
              >
                <Settings2 size={18} className={`${showFilters ? 'text-blue-500 rotate-90' : 'text-slate-400'} transition-transform`} />
                <span className="hidden sm:inline">Filters</span>
              </button>

              {showFilters && (
                <>
                  <div className="fixed inset-0 z-40" onClick={() => setShowFilters(false)} />
                  <div className="absolute right-0 top-full mt-2 w-56 bg-white rounded-2xl shadow-2xl border border-slate-100 z-50 overflow-hidden py-2 animate-in fade-in zoom-in duration-200">
                    <p className="px-4 py-2 text-[10px] font-black text-slate-400 uppercase tracking-widest border-b border-slate-50 mb-1">Sort By Interest Rate</p>
                    {[
                      { id: "default", label: "Recommended" },
                      { id: "rate-asc", label: "Lowest Interest Rate" },
                      { id: "rate-desc", label: "Highest Interest Rate" }
                    ].map((option) => (
                      <button
                        key={option.id}
                        onClick={() => { setSortBy(option.id as "default" | "rate-asc" | "rate-desc"); setShowFilters(false); }}
                        className={`w-full text-left px-4 py-2.5 text-sm font-bold transition-colors ${sortBy === option.id ? "bg-blue-50 text-blue-600" : "text-slate-600 hover:bg-slate-50"}`}
                      >
                        {option.label}
                      </button>
                    ))}
                  </div>
                </>
              )}
            </div>

            <button
              onClick={() => setIsFormOpen(true)}
              className="flex-1 md:flex-none flex items-center justify-center gap-2 px-6 py-3 bg-gradient-to-r from-[#2076C7] to-[#1CADA3] hover:shadow-lg hover:shadow-blue-500/20 text-white rounded-2xl font-bold text-sm transition-all active:scale-95 whitespace-nowrap"
            >
              <Plus size={18} />
              <span className="hidden sm:inline">New Application</span>
              <span className="sm:hidden">New App</span>
            </button>
          </div>
        </div>
      )}

      {/* Main Content Area */}
      <AnimatePresence mode="wait">
        <motion.div
          key={activeTab}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -10 }}
          transition={{ duration: 0.2 }}
        >
          {activeTab === "EXPLORE" && <ExploreOffers searchQuery={searchQuery} sortBy={sortBy} />}
          {activeTab === "APPLICATIONS" && <MyApplications searchQuery={searchQuery} />}
          {activeTab === "CALCULATOR" && <Calculator />}
        </motion.div>
      </AnimatePresence>

      <NewApplicationForm
        isOpen={isFormOpen}
        onClose={() => setIsFormOpen(false)}
      />

    </div>
  );
}
