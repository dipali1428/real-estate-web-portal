"use client";

import React from "react";
import { motion } from "framer-motion";
import { useRouter, usePathname } from "next/navigation";
import {
  Umbrella,
  Calculator,
  Clock,
  Grid,
  LayoutDashboard,
  LucideIcon
} from "lucide-react";

interface HeaderButtonProps {
  label: string;
  icon: LucideIcon;
  path: string;
  isActive: boolean;
  onClick: () => void;
  variant?: "primary" | "secondary";
}

const HeaderButton = ({ label, icon: Icon, isActive, onClick, variant = "secondary" }: HeaderButtonProps) => {
  if (isActive || variant === "primary") {
    return (
      <button
        onClick={onClick}
        className="relative w-full sm:w-auto px-4 md:px-5 py-2.5 md:py-2 rounded-xl sm:rounded-full text-[10px] md:text-xs font-black uppercase tracking-wider text-white flex items-center justify-center gap-1.5 overflow-hidden active:scale-95 transition-transform"
      >
        <div className="absolute inset-0 bg-gradient-to-r from-[#2076C7] to-[#1CADA3] rounded-xl sm:rounded-full -z-10 shadow-sm" />
        <Icon size={14} />
        {label}
      </button>
    );
  }

  return (
    <button
      onClick={onClick}
      className="w-full sm:w-auto px-4 md:px-5 py-2.5 md:py-2 rounded-xl sm:rounded-full text-[10px] md:text-xs font-black uppercase tracking-wider text-slate-500 hover:text-slate-700 flex items-center justify-center gap-1.5 transition-colors"
    >
      <Icon size={14} />
      {label}
    </button>
  );
};

export default function LifeInsuranceHeader() {
  const router = useRouter();
  const pathname = usePathname();

  const navItems = [
    { label: "Overview", icon: LayoutDashboard, path: "/customer/insurance/life-insurance" },
    { label: "Holdings", icon: Clock, path: "/customer/insurance/life-insurance/holdings" },
    { label: "Calculator", icon: Calculator, path: "/customer/insurance/life-insurance/calculator" },
    { label: "Categories", icon: Grid, path: "/customer/insurance/life-insurance/categories" },
  ];

  return (
    <motion.div
      initial={{ opacity: 0, y: -10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
      className="sticky top-0 z-[40] bg-[#FAFAFA]/80 backdrop-blur-md py-4 mb-4"
    >
      <div className="bg-white rounded-2xl p-5 shadow-sm border border-slate-100/60">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">

        {/* LEFT SECTION */}
        <div 
          className="flex flex-col sm:flex-row items-center sm:items-start gap-4 text-center sm:text-left cursor-pointer transition-opacity hover:opacity-80"
          onClick={() => router.push("/customer/insurance/life-insurance")}
        >
          <div className="w-12 h-12 rounded-xl bg-gradient-to-r from-[#2076C7] to-[#1CADA3] flex items-center justify-center text-white font-bold shadow-md shrink-0">
            <Umbrella size={22} />
          </div>

          <div className="flex flex-col items-center sm:items-start">
            <div className="flex flex-col sm:flex-row items-center gap-2 sm:gap-3 mb-1">
              <h2 className="text-xl sm:text-2xl font-bold text-slate-800">
                Life Insurance Dashboard
              </h2>
              <span className="px-2.5 py-1 bg-emerald-100 text-emerald-700 text-[10px] font-bold rounded-full border border-emerald-200 whitespace-nowrap">
                Asset Protection
              </span>
            </div>
            <p className="text-sm text-slate-500 flex items-center justify-center sm:justify-start gap-2">
              Manage policies, track applications, and explore new coverage
            </p>
          </div>
        </div>

        {/* RIGHT BUTTONS */}
        <div className="w-full sm:w-auto mt-4 sm:mt-0">
          <div className="p-1 bg-slate-100/80 backdrop-blur-sm rounded-2xl sm:rounded-full flex flex-col sm:flex-row sm:items-center gap-1 relative shadow-inner border border-slate-200/50">
            {navItems.map((item) => (
              <HeaderButton
                key={item.label}
                label={item.label}
                icon={item.icon}
                path={item.path}
                isActive={pathname === item.path}
                onClick={() => router.push(item.path)}
              />
            ))}
          </div>
        </div>

      </div>
      </div>
    </motion.div>
  );
}
