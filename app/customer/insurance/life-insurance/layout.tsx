"use client";
import React from "react";
import LifeInsuranceHeader from "./components/LifeInsuranceHeader";

export default function LifeInsuranceLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex-1 min-h-screen bg-[#FAFAFA] font-sans">
      <div className="max-w-[1440px] mx-auto px-6 py-2 md:py-6 leading-relaxed flex flex-col">
        <LifeInsuranceHeader />
        <main className="flex-1">
          {children}
        </main>
      </div>
    </div>
  );
}