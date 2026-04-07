"use client";
import React from "react";

interface Props {
  title: string;
  funds: any[];
  renderItem: (item: any) => React.ReactNode;
}

export default function TopPicksSection({ title, funds, renderItem }: Props) {
  return (
    <section className="space-y-6">
      <h2 className="text-xl sm:text-2xl font-bold text-center bg-gradient-to-r from-[#2076C7] to-[#1CADA3] bg-clip-text text-transparent mb-6">
        {title}
      </h2>
      {/* Use global custom-scrollbar-x class (defined in globals.css) */}
     <div className="flex gap-6 overflow-x-auto pb-4 custom-scrollbar-x w-fit max-w-full mx-auto">
        {funds.map((fund) => (
          <div
            key={`${fund.schemeCode}-${fund.name}`}
            className="w-[240px] md:w-[260px] max-w-[80vw] shrink-0"
          >
            {renderItem(fund)}
          </div>
        ))}
      </div>
    </section>
  );
}