import type { ReactNode } from "react";
import MutualFundsTopTabs from "./components/MutualFundsTopTabs";

export default function MutualFundsLayout({ children }: { children: ReactNode }) {
  return (
    <div className="min-h-screen bg-[#F8FAFC] p-4 sm:p-6">
      <div className="mx-auto max-w-7xl space-y-6">
        <MutualFundsTopTabs />
        {children}
      </div>
    </div>
  );
}
