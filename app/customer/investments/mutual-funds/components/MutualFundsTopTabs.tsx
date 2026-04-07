"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  IconSearch,
  IconBriefcase,
  IconTrendingUp,
  IconCalculator,
  IconChartBar,
  IconHistory,
  IconInfoCircle
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
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">

            {/* LEFT */}
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-xl bg-gradient-to-r from-[#2076C7] to-[#1CADA3] flex items-center justify-center text-white shadow-lg shrink-0">
                <activeTab.icon size={24} />
              </div>

              <div>
                <div className="flex items-center gap-3 mb-1">
                  <h2 className="text-xl sm:text-2xl font-bold text-slate-800 tracking-tight">
                    {activeTab.label}
                  </h2>

                  <span className="px-2.5 py-1 bg-emerald-100 text-emerald-700 text-[10px] font-black rounded-full border border-emerald-200 whitespace-nowrap uppercase tracking-wider">
                    Active
                  </span>
                </div>

                <p className="text-sm text-slate-500 font-medium flex items-center gap-2">
                  <IconInfoCircle size={14} className="text-[#2076C7]" />
                  {activeTab.description}
                </p>
              </div>
            </div>

            {/* RIGHT - TABS */}
            <div className="flex pb-2 md:pb-0 w-full sm:w-auto mt-2 sm:mt-0 overflow-x-auto hide-scrollbar sm:overflow-visible">
              <div className="p-1 bg-slate-100/80 backdrop-blur-sm rounded-full flex items-center gap-1 relative shadow-inner border border-slate-200/50 shrink-0">

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
                      className={`relative px-3 md:px-5 py-1.5 md:py-2 rounded-full text-[10px] md:text-xs font-black uppercase tracking-wider transition-all duration-300 z-10 flex items-center gap-1.5 shrink-0 ${
                        isActive
                          ? "text-white"
                          : "text-slate-400 hover:text-slate-600"
                      }`}
                    >
                      {isActive && (
                        <motion.div
                          layoutId="activeMutualFundTab"
                          className="absolute inset-0 bg-gradient-to-r from-[#2076C7] to-[#1CADA3] rounded-full -z-10 shadow-sm"
                          transition={{
                            type: "spring",
                            bounce: 0.2,
                            duration: 0.6,
                          }}
                        />
                      )}

                      <Icon size={14} strokeWidth={isActive ? 2.5 : 2} />
                      {tab.label}
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