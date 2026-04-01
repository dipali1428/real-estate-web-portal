"use client";
import React from "react";
import { motion } from "framer-motion";
interface StrategyData {
  type: string;
  strategy: string;
  marketCap: string;
  risk: "LOW" | "MODERATE" | "HIGH" | "VERY HIGH";
  horizon: string;
  bestSuited: string;
}
const STRATEGIES: StrategyData[] = [
  {
    type: "Large Cap Funds",
    strategy: "Invest in stable blue-chip companies",
    marketCap: "Large Cap",
    risk: "MODERATE",
    horizon: "3-5 yrs",
    bestSuited: "Conservative Investors",
  },
  {
    type: "Mid Cap Funds",
    strategy: "Focus on growing mid-size companies",
    marketCap: "Mid Cap",
    risk: "HIGH",
    horizon: "5+ yrs",
    bestSuited: "Growth Investors",
  },
  {
    type: "Small Cap Funds",
    strategy: "Invest in emerging companies",
    marketCap: "Small Cap",
    risk: "VERY HIGH",
    horizon: "5-7 yrs",
    bestSuited: "Aggressive Investors",
  },
  {
    type: "Flexi Cap Funds",
    strategy: "Dynamic allocation across caps",
    marketCap: "Multi Cap",
    risk: "HIGH",
    horizon: "5+ yrs",
    bestSuited: "Long-term investors",
  },
  {
    type: "ELSS Funds",
    strategy: "Equity funds with tax benefits",
    marketCap: "Multi Cap",
    risk: "HIGH",
    horizon: "3 yrs",
    bestSuited: "Tax-saving investors",
  },
  {
    type: "Index Funds",
    strategy: "Passive funds tracking an index",
    marketCap: "Market Index",
    risk: "MODERATE",
    horizon: "5+ yrs",
    bestSuited: "Low-cost investors",
  },
  {
    type: "Liquid Funds",
    strategy: "Short-term debt instruments",
    marketCap: "Debt",
    risk: "LOW",
    horizon: "< 1 yr",
    bestSuited: "Parking surplus cash",
  },
  {
    type: "Hybrid Funds",
    strategy: "Mix of equity and debt",
    marketCap: "Mixed",
    risk: "MODERATE",
    horizon: "3-5 yrs",
    bestSuited: "Balanced investors",
  },
];
const getRiskStyle = (risk: string) => {
  switch (risk) {
    case "LOW":
      return "bg-emerald-50 text-emerald-600 border-emerald-100";
    case "MODERATE":
      return "bg-blue-50 text-[#2076C7] border-blue-100";
    case "HIGH":
      return "bg-orange-50 text-orange-600 border-orange-100";
    case "VERY HIGH":
      return "bg-rose-50 text-rose-600 border-rose-100";
    default:
      return "bg-gray-50 text-gray-600 border-gray-100";
  }
};
export default function FundTypeComparison() {
  return (
    <section className="py-20 bg-white overflow-hidden">
      <div className="max-w-7xl mx-auto px-4">
        {/* Header */}
        <div className="text-center mb-12 sm:mb-16">
          <motion.h2 
            initial={{ opacity: 0, y: -20 }}
            whileInView={{ opacity: 1, y: 0 }}
            className="text-3xl md:text-4xl font-bold mb-4 bg-gradient-to-r from-[#2076C7] to-[#1CADA3] bg-clip-text text-transparent"
          >
            Mutual Fund Strategy Comparison
          </motion.h2>
          <motion.p 
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-gray-500 max-w-2xl mx-auto text-sm md:text-base font-medium"
          >
            Compare different mutual fund categories to find the perfect match for your financial goals, risk appetite, and investment horizon.
          </motion.p>
        </div>
        {/* Table Container */}
        <div className="bg-white rounded-[2rem] border border-[#E5EEF6] shadow-xl shadow-blue-500/5 overflow-hidden">
          <div className="overflow-x-auto custom-scrollbar">
            <table className="w-full text-left border-collapse min-w-[900px]">
              <thead>
                <tr className="bg-[#F3F7FB] border-b border-[#E5EEF6]">
                  <th className="px-6 py-5 text-[10px] font-bold uppercase tracking-widest text-[#2076C7]">Fund Type</th>
                  <th className="px-6 py-5 text-[10px] font-bold uppercase tracking-widest text-[#2076C7]">Strategy</th>
                  <th className="px-6 py-5 text-[10px] font-bold uppercase tracking-widest text-[#2076C7]">Market Cap Bias</th>
                  <th className="px-6 py-5 text-[10px] font-bold uppercase tracking-widest text-[#2076C7]">Risk</th>
                  <th className="px-6 py-5 text-[10px] font-bold uppercase tracking-widest text-[#2076C7]">Horizon</th>
                  <th className="px-6 py-5 text-[10px] font-bold uppercase tracking-widest text-[#2076C7]">Best Suited For</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#F0F5FA]">
                {STRATEGIES.map((item, idx) => (
                  <motion.tr 
                    key={idx}
                    initial={{ opacity: 0, x: -10 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    transition={{ delay: idx * 0.05 }}
                    className="hover:bg-blue-50/30 transition-colors group"
                  >
                    <td className="px-6 py-5">
                      <span className="text-sm font-bold text-gray-900 group-hover:text-[#2076C7] transition-colors">
                        {item.type}
                      </span>
                    </td>
                    <td className="px-6 py-5">
                      <span className="text-sm font-medium text-gray-600 line-clamp-1">
                        {item.strategy}
                      </span>
                    </td>
                    <td className="px-6 py-5">
                      <span className="text-sm font-bold text-gray-700">
                        {item.marketCap}
                      </span>
                    </td>
                    <td className="px-6 py-5">
                      <span className={`text-[9px] font-bold px-3 py-1 rounded-full border shadow-sm ${getRiskStyle(item.risk)}`}>
                        {item.risk}
                      </span>
                    </td>
                    <td className="px-6 py-5">
                      <span className="text-sm font-bold text-gray-900">
                        {item.horizon}
                      </span>
                    </td>
                    <td className="px-6 py-5">
                      <span className="text-sm font-medium text-blue-500/80 italic">
                        {item.bestSuited}
                      </span>
                    </td>
                  </motion.tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
      <style jsx>{`
        .custom-scrollbar::-webkit-scrollbar {
          height: 6px;
        }
        .custom-scrollbar::-webkit-scrollbar-track {
          background: #F3F7FB;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb {
          background: #2076C7;
          border-radius: 10px;
        }
      `}</style>
    </section>
  );
}
