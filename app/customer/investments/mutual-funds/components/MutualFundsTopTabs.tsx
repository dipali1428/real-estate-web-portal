"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { BarChart3, Briefcase, Calculator, History as HistoryIcon, Search, TrendingUp } from "lucide-react";

const mutualFundTabs = [
  {
    label: "Explore Funds",
    href: "/customer/investments/mutual-funds/explore",
    icon: Search,
    description: "Discover funds by objective, category, and strategy.",
  },
  // {
  //   label: "Investments",
  //   href: "/customer/mutual-funds/investments",
  //   icon: Briefcase,
  //   description: "Track holdings, value, and allocation in one place.",
  // },
  {
    label: "SIP Calculator",
    href: "/customer/investments/mutual-funds/sip-calculator",
    icon: Calculator,
    description: "Estimate future corpus and fine-tune monthly SIPs.",
  },
  {
    label: "Compare Funds",
    href: "/customer/investments/mutual-funds/compare",
    icon: BarChart3,
    description: "Compare multiple schemes before you invest.",
  },
  {
    label: "Transactions",
    href: "/customer/investments/mutual-funds/transactions",
    icon: HistoryIcon,
    description: "View your order history and status.",
  },
  {
    label: "SIP Center",
    href: "/customer/investments/mutual-funds/sips",
    icon: TrendingUp,
    description: "Manage your active SIPs and schedules.",
  },
];

export default function MutualFundsTopTabs() {
  const pathname = usePathname();

  return (
    <section className="rounded-3xl border border-slate-200 bg-white/95 p-5 shadow-sm">
      <div className="flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
        <div className="space-y-2 w-full">
      
          <div className="flex flex-col items-center text-center w-full">
       <h1 className="text-2xl sm:text-4xl font-sans font-medium tracking-normal bg-gradient-to-r from-[#2076C7] to-[#1CADA3] bg-clip-text text-transparent">
  Mutual Funds Panel
</h1>
          </div>
        </div>
      </div>

      <div className="mt-5 grid gap-3 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6">
        {mutualFundTabs.map((tab) => {
          const isActive =
            pathname === tab.href || (pathname === "/customer/mutual-funds" && tab.href === "/customer/mutual-funds/explore");
          const Icon = tab.icon;

          return (
            <Link
              key={tab.href}
              href={tab.href}
              className={`group rounded-2xl border p-4 transition-all ${
                isActive
                  ? "border-[#1CADA3] bg-gradient-to-r from-[#2076C7] to-[#1CADA3] text-white shadow-lg shadow-cyan-100"
                  : "border-slate-200 bg-slate-50 text-slate-700 hover:border-[#1CADA3]/40 hover:bg-white hover:shadow-md"
              }`}
            >
              <div className="flex items-center gap-3">
                <div
                  className={`rounded-xl p-2 ${
                    isActive
                      ? "bg-white/20 text-white"
                      : "bg-white text-[#2076C7] shadow-sm"
                  }`}
                >
                  <Icon className="h-5 w-5" />
                </div>
                <div>
                  <p className="text-sm font-semibold">{tab.label}</p>
                </div>
              </div>
              <p
                className={`mt-3 text-xs leading-5 ${
                  isActive ? "text-white/85" : "text-slate-500"
                }`}
              >
                {tab.description}
              </p>
            </Link>
          );
        })}
      </div>
    </section>
  );
}
