"use client";

import React, { useState } from "react";
import ExploreHomeLoans from "./components/ExploreHomeLoans";
import MyHomeLoans from "./components/MyHomeLoans";

export default function HomeLoanDashboard() {
  const [activeTab, setActiveTab] = useState<"explore" | "applications">("explore");

  return (
   <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-blue-50">
          <div className="p-4 sm:p-4 lg:p-6">
        {activeTab === "explore" ? (
          <ExploreHomeLoans activeTab={activeTab} setActiveTab={setActiveTab} />
        ) : (
          <MyHomeLoans activeTab={activeTab} setActiveTab={setActiveTab} />
        )}
      </div>
    </div>
  );
}