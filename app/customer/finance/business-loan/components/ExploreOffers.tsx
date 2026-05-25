"use client";

import React from "react";
import {
  Search,
  Percent,
  TrendingDown,
  Landmark,
  ShieldCheck,
  ArrowRight
} from "lucide-react";
import Link from "next/link";
import { motion } from "framer-motion";
import { businessLoanBanks, BusinessLoanBank } from "./data";

interface ExploreOffersProps {
  searchQuery: string;
  sortBy: "default" | "rate-asc" | "rate-desc";
}

export default function ExploreOffers({ searchQuery, sortBy }: ExploreOffersProps) {
  const filteredAndSortedBanks = businessLoanBanks
    .filter((bank: BusinessLoanBank) => bank.name.toLowerCase().includes(searchQuery.toLowerCase()))
    .sort((a: BusinessLoanBank, b: BusinessLoanBank) => {
      if (sortBy === "default") return 0;
      const rateA = parseFloat(a.interestRate);
      const rateB = parseFloat(b.interestRate);
      return sortBy === "rate-asc" ? rateA - rateB : rateB - rateA;
    });

  const avgInterestRate = (businessLoanBanks.reduce((acc: number, curr: BusinessLoanBank) => acc + parseFloat(curr.interestRate), 0) / businessLoanBanks.length).toFixed(2);
  const lowestRate = Math.min(...businessLoanBanks.map((b: BusinessLoanBank) => parseFloat(b.interestRate))).toFixed(2);

  return (
    <div className="space-y-6 text-left font-sans">

      {/* Stats row */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        <StatCard icon={Landmark} label="Total Banks" value={businessLoanBanks.length.toString()} iconColor="text-blue-500" />
        <StatCard icon={Percent} label="Avg. Interest Rate" value="18%" iconColor="text-purple-500" />
        <StatCard icon={TrendingDown} label="Lowest Rate" value="15%" iconColor="text-emerald-500" />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredAndSortedBanks.map((bank: BusinessLoanBank, index: number) => (
          <BankCard key={index} bank={bank} />
        ))}
      </div>

      {filteredAndSortedBanks.length === 0 && (
        <div className="py-20 text-center bg-white rounded-3xl border border-dashed border-gray-200">
          <Search size={48} className="mx-auto text-gray-200 mb-4" />
          <p className="text-gray-500 font-bold uppercase tracking-widest">No banks match your search</p>
        </div>
      )}
    </div>
  );
}

function StatCard({ icon: Icon, label, value, iconColor }: { icon: React.ElementType, label: string, value: string, iconColor: string }) {
  return (
    <div className="bg-white p-5 rounded-2xl border border-gray-100 shadow-sm flex items-center gap-4 hover:shadow-md transition-shadow">
      <div className={`p-2.5 rounded-xl bg-gray-50 ${iconColor} shrink-0`}>
        <Icon size={20} strokeWidth={2.5} />
      </div>
      <div className="flex flex-col">
        <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest">{label}</p>
        <p className="text-xl font-black text-gray-900 mt-0.5">{value}</p>
      </div>
    </div>
  );
}

function BankCard({ bank }: { bank: BusinessLoanBank }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      className="bg-white rounded-3xl border border-gray-100 shadow-sm hover:shadow-xl hover:border-blue-100 transition-all duration-300 relative overflow-hidden group flex flex-col h-full"
    >
      <div className="p-6 flex flex-col flex-1">
        <div className="flex justify-between items-start mb-6">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-xl bg-blue-50 border border-blue-100 flex items-center justify-center text-blue-600">
              <Landmark size={24} />
            </div>
            <div className="text-left">
              <h3 className="text-base font-black text-gray-900 leading-tight group-hover:text-blue-600 transition-colors">{bank.name}</h3>
              <p className="text-[10px] text-teal-500 font-black mt-1 flex items-center gap-1">
                <ShieldCheck size={12} /> {bank.tagline}
              </p>
            </div>
          </div>

        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-8">
          <div className="text-left bg-gray-50/50 p-4 rounded-2xl border border-gray-100/50">
            <p className="text-[9px] font-black text-gray-400 uppercase tracking-widest mb-1">Interest Rate</p>
            <p className="text-sm font-black text-blue-600">{bank.interestRate}</p>
          </div>
          <div className="text-left bg-gray-50/50 p-4 rounded-2xl border border-gray-100/50">
            <p className="text-[9px] font-black text-gray-400 uppercase tracking-widest mb-1">Processing Fee</p>
            <p className="text-sm font-black text-gray-700">{bank.processingFee}</p>
          </div>
        </div>

        <Link 
          href={`/customer/finance/business-loan/${bank.slug}`}
          className="w-full mt-auto py-3.5 bg-gradient-to-r from-[#2076C7] to-[#1CADA3] text-white rounded-2xl font-black text-xs uppercase tracking-widest active:scale-95 transition-all flex items-center justify-center gap-2 group/btn shadow-md hover:shadow-lg hover:shadow-teal-500/20"
        >
          View Details
          <ArrowRight size={14} className="group-hover/btn:translate-x-1 transition-transform" />
        </Link>
      </div>

      {bank.isLowestRate && (
        <div className="absolute top-0 right-0">
          <div className="bg-emerald-500 text-white text-[8px] font-black px-3 py-1 rounded-bl-xl shadow-sm uppercase tracking-widest">
            Lowest Rate
          </div>
        </div>
      )}
    </motion.div>
  );
}
