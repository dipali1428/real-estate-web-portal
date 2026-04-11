"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Landmark, Search, X, Percent, ArrowDownSquare, ShieldCheck, ShoppingCart, Banknote } from "lucide-react";
import { categorizedPlans } from "../loanConstants";

export default function BankLoanCards() {
  const categories = Object.keys(categorizedPlans);
  const [activeCategory, setActiveCategory] = useState(categories[0] || "New Purchase");
  const [searchQuery, setSearchQuery] = useState("");

  const currentPlans = categorizedPlans[activeCategory] || [];
  
  const filteredPlans = currentPlans.filter((plan: any) =>
    plan.bank.toLowerCase().includes(searchQuery.toLowerCase())
  );

  // Overview Metrics Calculation
  const totalBanks = currentPlans.length;
  
  const parseRate = (rateStr: string) => parseFloat(rateStr.replace(/[^\d.]/g, '')) || 0;
  
  const avgRate = totalBanks > 0 
    ? (currentPlans.reduce((sum, p) => sum + parseRate(p.interest), 0) / totalBanks).toFixed(2) + '%'
    : 'N/A';
    
  const lowestRate = totalBanks > 0
    ? Math.min(...currentPlans.map(p => parseRate(p.interest))).toFixed(2) + '%'
    : 'N/A';
    
  // Check if any plan has 'NIL' processing fee
  const hasNilFee = currentPlans.some(p => p.fee.toUpperCase() === 'NIL');
  const bestFee = hasNilFee ? 'NIL' : 'Varies';

  return (
    <div className="space-y-6 animate-fadeIn">
      {/* Search Header */}
      <div className="bg-white/80 backdrop-blur-md rounded-2xl p-6 border border-gray-100 shadow-sm sticky top-0 z-40">
        <div className="flex flex-col md:flex-row gap-4 items-center justify-end">
          
          <div className="relative w-full md:w-72 shrink-0">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
            <input
              type="text"
              placeholder="Search banks..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-11 pr-10 py-3 rounded-xl border border-gray-200 bg-white text-sm text-gray-800 placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:border-[#2076C7] transition-all"
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery("")}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
              >
                <X size={16} />
              </button>
            )}
          </div>
        </div>
      </div>

      {/* Market Overview Cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-white rounded-xl p-5 border border-gray-100 shadow-sm flex items-center gap-4">
          <div className="w-12 h-12 bg-blue-50 text-[#2076C7] rounded-full flex items-center justify-center shrink-0">
            <Landmark size={20} />
          </div>
          <div>
            <p className="text-xs font-medium text-gray-500 uppercase tracking-wider mb-1">Partner Banks</p>
            <p className="text-2xl font-black text-gray-900 leading-none">{totalBanks}</p>
          </div>
        </div>
        <div className="bg-white rounded-xl p-5 border border-gray-100 shadow-sm flex items-center gap-4">
          <div className="w-12 h-12 bg-purple-50 text-purple-600 rounded-full flex items-center justify-center shrink-0">
            <Percent size={20} />
          </div>
          <div>
            <p className="text-xs font-medium text-gray-500 uppercase tracking-wider mb-1">Avg. Rate</p>
            <p className="text-2xl font-black text-gray-900 leading-none">{avgRate}</p>
          </div>
        </div>
        <div className="bg-white rounded-xl p-5 border border-gray-100 shadow-sm flex items-center gap-4">
          <div className="w-12 h-12 bg-emerald-50 text-emerald-600 rounded-full flex items-center justify-center shrink-0">
            <ArrowDownSquare size={20} />
          </div>
          <div>
            <p className="text-xs font-medium text-gray-500 uppercase tracking-wider mb-1">Lowest Rate</p>
            <p className="text-2xl font-black text-gray-900 leading-none">{lowestRate}</p>
          </div>
        </div>
        <div className="bg-white rounded-xl p-5 border border-gray-100 shadow-sm flex items-center gap-4">
          <div className="w-12 h-12 bg-amber-50 text-amber-600 rounded-full flex items-center justify-center shrink-0">
            <Banknote size={20} />
          </div>
          <div>
            <p className="text-xs font-medium text-gray-500 uppercase tracking-wider mb-1">Best Fee</p>
            <p className="text-2xl font-black text-gray-900 leading-none">{bestFee}</p>
          </div>
        </div>
      </div>

      {/* List / Table Layout */}
      <div className="bg-white rounded-2xl shadow-sm border border-gray-200 overflow-hidden">
        {/* Table Header */}
        <div className="hidden lg:grid grid-cols-12 gap-4 bg-gradient-to-r from-gray-50 to-gray-100 px-6 py-4 border-b border-gray-200 text-xs font-bold text-gray-500 uppercase tracking-widest">
          <div className="col-span-4 pl-2">Bank Offer</div>
          <div className="col-span-2">Interest Rate</div>
          <div className="col-span-3">Processing Fee</div>
          <div className="col-span-3 text-right pr-2">Action</div>
        </div>

        {/* Data Rows */}
        <div className="divide-y divide-gray-100">
          <AnimatePresence mode="popLayout">
            {filteredPlans.length > 0 ? (
              filteredPlans.map((plan: any, index: number) => (
                <motion.div
                  key={plan.bank + index}
                  layout
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  transition={{ duration: 0.2 }}
                  className="px-6 py-5 hover:bg-gray-50 transition-colors group flex flex-col lg:grid lg:grid-cols-12 lg:gap-4 lg:items-center gap-4 relative"
                >
                  {/* Bank Column */}
                  <div className="col-span-4 flex items-center gap-4">
                    <div
                      className="w-12 h-12 rounded-xl flex items-center justify-center shrink-0 border border-gray-100/50 shadow-sm"
                      style={{ backgroundColor: `var(--${plan.color}-50, #F8FAFC)`, color: plan.color === 'peacock-green' ? '#1CADA3' : '#2076C7' }}
                    >
                      <Landmark size={20} />
                    </div>
                    <div>
                      <div className="font-black text-gray-900 text-base leading-snug mb-0.5">
                        {plan.bank}
                      </div>
                      <div className="flex items-center gap-1.5 text-xs text-gray-500">
                        <ShieldCheck size={12} className="text-emerald-500" />
                        <span className="truncate max-w-[180px]">{plan.benefits[0]}</span>
                      </div>
                    </div>
                  </div>

                  {/* Interest Rate */}
                  <div className="col-span-2 flex lg:flex-col items-center lg:items-start justify-between lg:justify-center">
                    <span className="text-[10px] font-bold text-gray-400 uppercase tracking-wider lg:hidden">Interest Rate</span>
                    <span className="font-black text-lg text-[#2076C7]">{plan.interest}</span>
                  </div>

                  {/* Processing Fee */}
                  <div className="col-span-3 flex lg:flex-col items-center lg:items-start justify-between lg:justify-center">
                    <span className="text-[10px] font-bold text-gray-400 uppercase tracking-wider lg:hidden">Processing Fee</span>
                    <span className={`font-semibold text-gray-700 ${plan.fee.length > 25 ? 'text-xs' : 'text-sm'}`}>
                      {plan.fee}
                    </span>
                  </div>

                  {/* Actions */}
                  <div className="col-span-3 flex items-center justify-end gap-2 mt-2 lg:mt-0">
                    <button className="flex-1 lg:flex-none px-5 py-2.5 bg-gradient-to-r from-[#2076C7] to-[#1CADA3] text-white rounded-lg text-xs font-bold shadow-sm hover:opacity-95 active:scale-95 transition-all flex items-center justify-center gap-1.5 whitespace-nowrap">
                      <ShoppingCart size={14} /> Add to Cart
                    </button>
                  </div>
                </motion.div>
              ))
            ) : (
              <motion.div 
                initial={{ opacity: 0 }} 
                animate={{ opacity: 1 }} 
                className="py-16 text-center"
              >
                <div className="w-16 h-16 bg-gray-50 rounded-full flex items-center justify-center mx-auto mb-4 border border-gray-100">
                  <Search className="w-6 h-6 text-gray-400" />
                </div>
                <h3 className="text-lg font-bold text-gray-800 mb-1">No banks found</h3>
                <p className="text-sm text-gray-500">Try adjusting your search query.</p>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>

      <style jsx>{`
        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(10px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .animate-fadeIn {
          animation: fadeIn 0.4s ease-out;
        }
      `}</style>
    </div>
  );
}
