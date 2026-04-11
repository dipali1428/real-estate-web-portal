"use client";

import React, { useState } from "react";
import {
  Search,
  Bookmark,
  Percent,
  TrendingDown,
  Landmark,
  ShieldCheck,
  ChevronRight
} from "lucide-react";
import { motion } from "framer-motion";
import BankDetailView from "./BankDetailView";
import { VehicleLoanBanks, VehicleLoanBank } from "./data";

const extractRate = (rateStr: string): number => {
  const match = rateStr.match(/(\d+(\.\d+)?)/);
  return match ? parseFloat(match[0]) : 0;
};

export default function ExploreOffers({ searchQuery, sortBy }: { searchQuery: string, sortBy: string }) {
  const [selectedBank, setSelectedBank] = useState<VehicleLoanBank | null>(null);

  const filteredAndSortedBanks = VehicleLoanBanks
    .filter((bank: VehicleLoanBank) => bank.name.toLowerCase().includes(searchQuery.toLowerCase()))
    .sort((a: VehicleLoanBank, b: VehicleLoanBank) => {
      if (sortBy === "default") return 0;
      const rateA = extractRate(a.interestRate);
      const rateB = extractRate(b.interestRate);
      return sortBy === "rate-asc" ? rateA - rateB : rateB - rateA;
    });

  const avgInterestRate = (VehicleLoanBanks.reduce((acc: number, curr: VehicleLoanBank) => acc + extractRate(curr.interestRate), 0) / VehicleLoanBanks.length).toFixed(2);
  const lowestRate = Math.min(...VehicleLoanBanks.map((b: VehicleLoanBank) => extractRate(b.interestRate))).toFixed(2);

  return (
    <div className="space-y-6 text-left font-sans">
      {/* Stats row */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        <StatCard icon={Landmark} label="Total Banks" value={VehicleLoanBanks.length.toString()} iconColor="text-blue-500" />
        <StatCard icon={Percent} label="Avg. Interest Rate" value={`${avgInterestRate}%`} iconColor="text-purple-500" />
        <StatCard icon={TrendingDown} label="Lowest Rate" value={`${lowestRate}%`} iconColor="text-emerald-500" />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredAndSortedBanks.map((bank: VehicleLoanBank, index: number) => (
          <BankCard key={index} bank={bank} onViewDetails={() => setSelectedBank(bank)} />
        ))}
      </div>

      {filteredAndSortedBanks.length === 0 && (
        <div className="py-20 text-center bg-white rounded-3xl border border-dashed border-gray-200">
          <Search size={48} className="mx-auto text-gray-200 mb-4" />
          <p className="text-gray-500 font-bold uppercase tracking-widest">No banks match your search</p>
        </div>
      )}

      {/* Detail View Overlay */}
      <BankDetailView 
        bank={selectedBank} 
        isOpen={!!selectedBank} 
        onClose={() => setSelectedBank(null)} 
      />
    </div>
  );
}

function StatCard({ icon: Icon, label, value, iconColor }: { icon: any, label: string, value: string, iconColor: string }) {
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

function BankCard({ bank, onViewDetails }: { bank: VehicleLoanBank, onViewDetails: () => void }) {
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
          <button className="text-gray-300 hover:text-blue-500 transition-colors">
            <Bookmark size={20} />
          </button>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-8 items-stretch">
          <div className="flex flex-col h-full text-left bg-gray-50/50 p-4 rounded-2xl border border-gray-100/50 min-h-[105px] justify-center">
            <p className="text-[9px] font-black text-gray-400 uppercase tracking-widest mb-1.5">Interest Rate</p>
            <p className="text-[13px] font-bold text-blue-600 leading-snug">{bank.interestRate}</p>
          </div>
          <div className="flex flex-col h-full text-left bg-gray-50/50 p-4 rounded-2xl border border-gray-100/50 min-h-[105px] justify-center">
            <p className="text-[9px] font-black text-gray-400 uppercase tracking-widest mb-1.5">Processing Fee</p>
            <p className="text-[13px] font-bold text-gray-700 leading-snug">{bank.processingFee}</p>
          </div>
        </div>

        <button 
          onClick={onViewDetails}
          className="w-full mt-auto py-3.5 bg-gradient-to-r from-[#2076C7] to-[#1CADA3] hover:shadow-teal-500/40 text-white rounded-2xl font-black text-xs uppercase tracking-widest shadow-lg shadow-teal-500/20 active:scale-95 transition-all flex items-center justify-center gap-2"
        >
          View Details
          <ChevronRight size={14} />
        </button>
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
