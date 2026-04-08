"use client";

import React, { useState } from "react";
import ExploreMortgageLoans from "./components/ExploreMortgageLoans";
import MyMortgageLoans from "./components/MyMortgageLoans";
import { Landmark, FileText } from "lucide-react";

export default function MortgageLoanDashboard() {
  const [activeTab, setActiveTab] = useState<"explore" | "applications">("explore");

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-blue-50">
      <div className="p-4 sm:p-6 lg:p-8">
        <div className="animate-fadeIn">
          {activeTab === "explore" ? (
            <ExploreMortgageLoans activeTab={activeTab} setActiveTab={setActiveTab} />
          ) : (
            <MyMortgageLoans activeTab={activeTab} setActiveTab={setActiveTab} />
          )}
        </div>
      </div>
    </div>
  );
}