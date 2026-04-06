"use client";

import ExploreFunds from "../components/ExploreFunds";

export default function ExploreFundsPage() {
  return (
    <div className="space-y-6">
      <div className="text-center w-full">
        <h2 className="text-3xl font-black text-[#2076C7] tracking-tight">
          Explore & Discover Funds
        </h2>
      </div>

      <ExploreFunds />
    </div>
  );
}
