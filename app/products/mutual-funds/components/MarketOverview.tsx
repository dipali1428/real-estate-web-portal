"use client";

import React from "react";
import { useMarketIndices } from "../../../hooks/useInvestmentData";
import { TrendingUp, TrendingDown } from "lucide-react";

export default function MarketOverview() {
  const { data: marketIndices, isLoading } = useMarketIndices();

  const filteredIndices = Array.isArray(marketIndices)
    ? marketIndices.filter(
        (index: any) =>
          index && index.name && !index.name.toLowerCase().includes("gold")
      )
    : [];

  const upCount = filteredIndices.filter((i: any) => i.trend === "up").length;
  const downCount = filteredIndices.filter((i: any) => i.trend === "down").length;

  let sentiment = "Neutral";
  if (upCount > downCount) sentiment = "Bullish";
  if (downCount > upCount) sentiment = "Bearish";

  const isBullish = sentiment === "Bullish";
  const isBearish = sentiment === "Bearish";

  return (
    <div className="w-full">
      <div
        className="relative bg-white border border-gray-100/80 rounded-3xl p-4 sm:p-6 md:p-8 overflow-hidden transition-all duration-300"
        style={{
          boxShadow:
            "0 2px 4px rgba(0,0,0,0.04), 0 8px 24px rgba(0,0,0,0.08), inset 0 1px 0 rgba(255,255,255,0.9)",
        }}
      >
        {/* Heading */}
        <div className="flex flex-wrap justify-center items-center gap-2 sm:gap-3 md:gap-4 mb-5 md:mb-8 text-center">

          <h2 className="text-lg sm:text-xl md:text-3xl lg:text-4xl font-extrabold">
            <span className="text-transparent bg-clip-text bg-linear-to-r from-[#2076C7] via-[#1CADA3] to-[#2076C7]">
              Market Overview
            </span>
          </h2>

          {!isLoading && filteredIndices.length > 0 && (
            <div
              className={`px-3 sm:px-4 py-1 rounded-full text-[11px] sm:text-xs font-semibold border flex items-center gap-1 sm:gap-2 ${
                isBullish
                  ? "bg-emerald-50 border-emerald-200 text-emerald-700"
                  : isBearish
                  ? "bg-rose-50 border-rose-200 text-rose-700"
                  : "bg-gray-100 border-gray-200 text-gray-600"
              }`}
            >
              {isBullish && "🚀 Bullish"}
              {isBearish && "📉 Bearish"}
              {sentiment === "Neutral" && "⚖️ Neutral"}
            </div>
          )}
        </div>

        {/* Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3 sm:gap-4 md:gap-5">

          {isLoading ? (
            Array(5)
              .fill(0)
              .map((_, i) => (
                <div
                  key={i}
                  className="h-20 sm:h-24 bg-gray-100 rounded-xl animate-pulse"
                />
              ))
          ) : filteredIndices.length > 0 ? (
            filteredIndices.map((index: any, idx: number) => (
              <div
                key={idx}
                className="group border border-gray-100 rounded-xl p-3 sm:p-4 hover:shadow-md hover:border-[#2076C7]/20 transition-all bg-gray-50/30"
              >
                {/* Name */}
                <div className="text-[11px] sm:text-sm md:text-base font-bold text-gray-500 uppercase mb-1 tracking-wide truncate">
                  {index.name}
                </div>

                {/* Price */}
                <div className="text-sm sm:text-lg md:text-xl font-extrabold text-gray-900 truncate">
                  {Number(index.price).toLocaleString("en-IN")}
                </div>

                {/* Change */}
                <div
                  className={`flex items-center gap-1 text-xs sm:text-sm md:text-base font-bold ${
                    Number(index.change) >= 0
                      ? "text-emerald-600"
                      : "text-rose-600"
                  }`}
                >
                  {index.trend === "up" ? (
                    <TrendingUp size={14} />
                  ) : (
                    <TrendingDown size={14} />
                  )}

                  {Number(index.change) >= 0 ? "+" : ""}
                  {index.change} ({Math.abs(Number(index.changePercent))}%)
                </div>

                {/* Accent Line */}
                <div className="mt-2 h-[2px] w-full bg-linear-to-r from-[#2076C7] to-[#1CADA3] opacity-0 group-hover:opacity-100 transition-all rounded-full" />
              </div>
            ))
          ) : (
            <div className="col-span-full text-center py-6 text-gray-400">
              Market data temporarily unavailable
            </div>
          )}
        </div>
      </div>
    </div>
  );
}