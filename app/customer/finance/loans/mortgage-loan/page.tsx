"use client";

import React, { useState } from "react";
import ExploreMortgageLoans from "./components/ExploreMortgageLoans";
import MyMortgageLoans from "./components/MyMortgageLoans";
import { Landmark, FileText } from "lucide-react";

export default function MortgageLoanDashboard() {
  const [activeTab, setActiveTab] = useState<"explore" | "applications">("explore");

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-blue-50">
      {/* Global Tab Navigation */}
      <div className="bg-white/90 backdrop-blur-md border-b border-gray-200/50 py-4 px-4 sm:px-6 lg:px-8 relative z-50">
        <div className="max-w-7xl mx-auto">
          <div className="flex bg-gray-100/80 p-1 rounded-xl sm:rounded-2xl w-full sm:w-fit overflow-x-auto no-scrollbar">
            <button
              onClick={() => setActiveTab("explore")}
              className={`flex-1 sm:flex-none px-3 sm:px-5 py-2 sm:py-2.5 text-xs sm:text-sm font-bold flex items-center justify-center gap-2 rounded-lg sm:rounded-xl transition-all whitespace-nowrap ${
                activeTab === "explore"
                  ? "bg-white text-[#2076C7] shadow-sm border border-gray-200/50"
                  : "text-gray-500 hover:text-gray-700 hover:bg-gray-200/50"
              }`}
            >
              <Landmark size={18} />
              Explore Offers
            </button>
            <button
              onClick={() => setActiveTab("applications")}
              className={`flex-1 sm:flex-none px-3 sm:px-5 py-2 sm:py-2.5 text-xs sm:text-sm font-bold flex items-center justify-center gap-2 rounded-lg sm:rounded-xl transition-all whitespace-nowrap ${
                activeTab === "applications"
                  ? "bg-white text-[#2076C7] shadow-sm border border-gray-200/50"
                  : "text-gray-500 hover:text-gray-700 hover:bg-gray-200/50"
              }`}
            >
              <FileText size={18} />
              My Applications
            </button>
          </div>
        </div>
      </div>

      {/* Active View */}
      {activeTab === "explore" ? <ExploreMortgageLoans /> : <MyMortgageLoans />}
    </div>
  );
}
