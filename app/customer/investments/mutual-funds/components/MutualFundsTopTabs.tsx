"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  IconSearch,
  IconTrendingUp,
  IconCalculator,
  IconChartBar,
  IconHistory,
} from "@tabler/icons-react";
import { motion } from "framer-motion";

const mutualFundTabs = [
  {
    label: "Explore",
    href: "/customer/investments/mutual-funds/explore",
    icon: IconSearch,
    description: "Discover top performing funds"
  },
  // {
  //   label: "Investments",
  //   href: "/customer/investments/mutual-funds/investments",
  //   icon: IconBriefcase,
  //   description: "Track your current portfolio"
  // },
  {
    label: "Sips",
    href: "/customer/investments/mutual-funds/sips",
    icon: IconTrendingUp,
    description: "Manage your active SIPs"
  },
  {
    label: "Calculator",
    href: "/customer/investments/mutual-funds/sip-calculator",
    icon: IconCalculator,
    description: "Plan your future returns"
  },
  {
    label: "Compare",
    href: "/customer/investments/mutual-funds/compare",
    icon: IconChartBar,
    description: "Side-by-side analysis"
  },
  {
    label: "Transactions",
    href: "/customer/investments/mutual-funds/transactions",
    icon: IconHistory,
    description: "View your order history"
  },
];

export default function MutualFundsTopTabs() {
  const pathname = usePathname();

  const getActiveTab = () => {
    const activeTab = mutualFundTabs.find(tab => pathname === tab.href);
    return activeTab || mutualFundTabs[0];
  };

  const activeTab = getActiveTab();

  return (
    <div className="w-full antialiased">
      {/* HEADER */}
      <motion.div
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
        className="relative bg-white rounded-2xl p-6 mb-8 shadow-sm border border-slate-100/60"
      >
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6">

          {/* LEFT: TITLE & ICON */}
          <div className="flex flex-col sm:flex-row items-center sm:items-start gap-4 text-center sm:text-left w-full sm:w-auto">
            <div className="w-12 h-12 rounded-xl bg-gradient-to-r from-[#2076C7] to-[#1CADA3] flex items-center justify-center text-white shadow-lg shrink-0">
              <activeTab.icon size={24} />
            </div>

            <div className="min-w-0">
              <div className="flex flex-col sm:flex-row items-center gap-3 mb-1">
                <h2 className="text-xl sm:text-2xl font-bold text-slate-800 tracking-tight leading-tight">
                  {activeTab.label}
                </h2>

                <span className="px-2.5 py-1 bg-emerald-100 text-emerald-700 text-[10px] font-black rounded-full border border-emerald-200 whitespace-nowrap uppercase tracking-wider">
                  Active
                </span>
              </div>

              <p className="text-sm text-slate-500 font-medium flex items-center justify-center sm:justify-start gap-2">
                <span>{activeTab.description}</span>
              </p>
            </div>
          </div>

          {/* RIGHT - TABS - Grid on Mobile, Pill on Desktop */}
          <div className="w-full sm:w-auto mt-4 sm:mt-0">
            <div className="grid grid-cols-2 sm:flex sm:flex-row p-1.5 bg-slate-100/80 backdrop-blur-sm rounded-2xl sm:rounded-full gap-1.5 relative shadow-inner border border-slate-200/50">

              {mutualFundTabs.map((tab) => {
                const isActive =
                  pathname === tab.href ||
                  (pathname === "/customer/investments/mutual-funds" &&
                    tab.href === "/customer/investments/mutual-funds/explore");

                const Icon = tab.icon;

                return (
                  <Link
                    key={tab.href}
                    href={tab.href}
                    className={`relative px-3 md:px-5 py-3 sm:py-2 rounded-xl sm:rounded-full text-[10px] md:text-xs font-black uppercase tracking-wider transition-all duration-300 z-10 flex flex-col sm:flex-row items-center justify-center gap-1 sm:gap-1.5 shrink-0 ${isActive
                        ? "text-white"
                        : "text-slate-400 hover:text-slate-600"
                      }`}
                  >
                    {isActive && (
                      <motion.div
                        layoutId="activeMutualFundTab"
                        className="absolute inset-0 bg-gradient-to-r from-[#2076C7] to-[#1CADA3] rounded-xl sm:rounded-full -z-10 shadow-sm"
                        transition={{
                          type: "spring",
                          bounce: 0.2,
                          duration: 0.6,
                        }}
                      />
                    )}

                    <Icon size={16} className="sm:size-[14px] transition-all duration-300" strokeWidth={isActive ? 2.5 : 2} />
                    <span className="leading-none">{tab.label}</span>
                  </Link>
                );
              })}

            </div>
          </div>
        </div>
      </motion.div>

    </div>

  );
}