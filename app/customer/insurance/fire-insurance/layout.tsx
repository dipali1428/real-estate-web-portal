"use client";
import React from "react";
import FireInsuranceHeader from "./components/FireInsuranceHeader";

export default function FireInsuranceLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex-1 min-h-screen bg-[#FAFAFA] font-sans">
      <div className="max-w-[1440px] mx-auto px-6 py-2 md:py-6 leading-relaxed flex flex-col">
        <FireInsuranceHeader />
        <main className="flex-1">
          {children}
        </main>
      </div>
    </div>
  );
}
