"use client";

import React, { useState } from "react";
import ExploreHomeLoans from "./components/ExploreHomeLoans";
import MyHomeLoans from "./components/MyHomeLoans";
import { Landmark, FileText } from "lucide-react";

export default function HomeLoanDashboard() {
  const [activeTab, setActiveTab] = useState<"explore" | "applications">("explore");

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-blue-50">
      <div className="flex-col animate-fadeIn">
        {activeTab === "explore" ? (
          <ExploreHomeLoans activeTab={activeTab} setActiveTab={setActiveTab} />
        ) : (
          <MyHomeLoans activeTab={activeTab} setActiveTab={setActiveTab} />
        )}
      </div>
    </div>
  );
}