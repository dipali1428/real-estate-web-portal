"use client";

import React, { useState } from "react";
import { Landmark, FileText } from "lucide-react";
import ExploreHealthInsurance from "./components/ExploreHealthInsurance";
import MyHealthInsurance from "./components/MyHealthInsurance";

export default function HealthInsuranceDashboard() {
  const [activeTab, setActiveTab] = useState<"explore" | "applications">("explore");

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-blue-50">
      <div className="p-4 sm:p-6 lg:p-8">
        {/* Active View */}
        <div className="animate-fadeIn">
          {activeTab === "explore" ? (
            <ExploreHealthInsurance activeTab={activeTab} setActiveTab={setActiveTab} />
          ) : (
            <MyHealthInsurance activeTab={activeTab} setActiveTab={setActiveTab} />
          )}
        </div>
      </div>

      <style jsx>{`
        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(10px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .animate-fadeIn {
          animation: fadeIn 0.3s ease-out;
        }
      `}</style>
    </div>
  );
}