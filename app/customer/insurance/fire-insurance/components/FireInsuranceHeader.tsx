"use client";

import React from "react";
import { motion } from "framer-motion";
import { useRouter, usePathname } from "next/navigation";
import {
  Flame,
  Clock,
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

export default function FireInsuranceHeader() {
  const router = useRouter();
  const pathname = usePathname();

  const navItems = [
    { label: "Overview", icon: LayoutDashboard, path: "/customer/insurance/fire-insurance" },
    { label: "Holdings", icon: Clock, path: "/customer/insurance/fire-insurance/holdings" },
  ];

  return (
    <motion.div
      initial={{ opacity: 0, y: -10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
      className="py-2 md:py-4 mb-3 md:mb-6"
    >
      <div className="bg-white rounded-2xl p-4 md:p-5 shadow-sm border border-slate-100/60 transition-all">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-5 md:gap-4">

        <div 
          className="flex flex-row items-center gap-3 text-left cursor-pointer transition-opacity hover:opacity-80"
          onClick={() => router.push("/customer/insurance/fire-insurance")}
        >
          <div className="w-10 h-10 md:w-12 md:h-12 rounded-xl bg-gradient-to-r from-[#2076C7] to-[#1CADA3] flex items-center justify-center text-white font-bold shadow-md shrink-0">
            <Flame size={20} className="md:w-[22px]" />
          </div>

          <div className="flex flex-col items-start">
            <div className="flex flex-wrap items-center gap-1.5 md:gap-3 mb-0.5 md:mb-1">
              <h2 className="text-lg md:text-2xl font-bold text-slate-800 leading-none">
                Fire Insurance
              </h2>
              <span className="px-2 py-0.5 bg-emerald-100 text-emerald-700 text-[8px] md:text-[10px] font-bold rounded-full border border-emerald-200 whitespace-nowrap">
                Asset Protection
              </span>
            </div>
            <p className="text-[11px] md:text-sm text-slate-500 font-medium leading-none">
              Protecting property & business assets
            </p>
          </div>
        </div>

        <div className="w-full md:w-auto">
          <div className="p-1 bg-slate-100/80 backdrop-blur-sm rounded-xl md:rounded-full flex flex-row items-center gap-1 relative shadow-inner border border-slate-200/50 overflow-x-auto scrollbar-hide">
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
