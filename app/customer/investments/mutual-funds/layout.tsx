import type { ReactNode } from "react";
import MutualFundsTopTabs from "./components/MutualFundsTopTabs";

export default function MutualFundsLayout({ children }: { children: ReactNode }) {
  return (
    <div className="flex-1 p-4 sm:p-6 bg-[#F8FAFC] min-h-screen font-sans">
      <MutualFundsTopTabs />
      <div className="relative min-h-[500px]">
        {children}
      </div>
    </div>
  );
}
