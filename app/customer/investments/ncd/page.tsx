"use client";

import React, { useState, useMemo, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useRouter } from "next/navigation";
import {
  Briefcase, TrendingUp, ShieldCheck, Landmark, Star, Search, Plus,
  Wallet, PieChart as PieChartIcon, 
  ShoppingBag
} from "lucide-react";


import { ncdData, NCDData } from "../../../products/NCD/data/ncdData";
import NCDDetailDrawer from "./components/NCDDetailDrawer";

interface NCDInvestment {
    id: string;
    issuer: string;
    amount: number;
    investedDate: string;
    interest: string;
    nextPayout: string;
    rating: string;
    status: "Active" | "Matured";
}

export default function NCDDashboard() {
  const router = useRouter();
  const [mainTab, setMainTab] = useState<"explore" | "investments">("explore");
  
  // Explore Tab State
  const [ncdStatusTab, setNcdStatusTab] = useState<"Open" | "Upcoming" | "Closed">("Open");
  const [selectedRating, setSelectedRating] = useState<string>("All");
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [selectedNCD, setSelectedNCD] = useState<NCDData | null>(null);

  // Portfolio State
  const [investments, setInvestments] = useState<NCDInvestment[]>([]);
  const [loading, setLoading] = useState(true);

  // Backend Integration Pending (Initially Empty)
  useEffect(() => {
      // Data will be fetched from actual backend/database here
      setInvestments([]);
      setLoading(false);
  }, []);

  // Stats for Portfolio
  const portfolioStats = useMemo(() => {
      if (investments.length === 0) return { total: 0, activeCount: 0, returns: 0, risk: "N/A", weightedYield: 0, nextCoupon: "N/A" };
      const total = investments.reduce((sum, item) => sum + item.amount, 0);
      const activeCount = investments.filter(i => i.status === "Active").length;
      const returns = Math.round(total * 0.105); // Simulated returns for NCD
      
      const coupons = investments.map(i => parseFloat(i.interest.replace('%', '') || '0'));
      const weightedYield = coupons.length > 0 ? (coupons.reduce((a, b) => a + b, 0) / coupons.length).toFixed(2) : 0;
      
      return { 
          total, 
          activeCount, 
          returns, 
          risk: "LOW TO MODERATE", 
          weightedYield, 
          nextCoupon: "05 May 2026" 
      };
  }, [investments]);

  // Chart Data for Portfolio
  const chartData = useMemo(() => {
      if (investments.length === 0) {
          return [
              { month: "Jan", returns: 0 }, { month: "Feb", returns: 0 },
              { month: "Mar", returns: 0 }, { month: "Apr", returns: 0 }
          ];
      }
      const baseReturn = portfolioStats.returns / 6;
      return [
          { month: "Jan", returns: Math.round(baseReturn * 0.8) },
          { month: "Feb", returns: Math.round(baseReturn * 1.9) },
          { month: "Mar", returns: Math.round(baseReturn * 3.1) },
          { month: "Apr", returns: Math.round(baseReturn * 4.4) },
          { month: "May", returns: Math.round(baseReturn * 5.8) },
          { month: "Jun", returns: portfolioStats.returns },
      ];
  }, [investments, portfolioStats.returns]);

  // Get unique ratings for filter
  const ratings = ["All", ...new Set(ncdData.map(ncd => ncd.ratingAgency))];

  // Filtered NCDs
  const filteredNCDs = ncdData.filter((ncd) => {
    const tabMatch = ncd.status === ncdStatusTab;
    const ratingMatch = selectedRating === "All" || ncd.ratingAgency === selectedRating;
    const searchMatch = ncd.issuer.toLowerCase().includes(searchQuery.toLowerCase()) || 
                        ncd.title.toLowerCase().includes(searchQuery.toLowerCase());
    return tabMatch && ratingMatch && searchMatch;
  });

  const handleViewDetails = (ncd: NCDData) => {
    setSelectedNCD(ncd);
    setIsDrawerOpen(true);
  };

  const handleInvestNow = (ncd: NCDData) => {
    setSelectedNCD(ncd);
    setIsDrawerOpen(true);
  };

  return (
    <div className="flex-1 min-h-screen bg-[#FAFAFA] font-sans">
      <div className="max-w-[1440px] mx-auto px-3 sm:px-6 py-6 sm:py-10 leading-relaxed">
        
        {/* 🔷 PREMIUM HEADER */}
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
          className="relative bg-white rounded-2xl p-5 mb-8 shadow-sm border border-slate-100/60"
        >
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">

            {/* LEFT (BRANDING) */}
            <div className="flex flex-col sm:flex-row items-center sm:items-start gap-4 text-center sm:text-left">
              <div className="w-12 h-12 rounded-xl bg-gradient-to-r from-[#2076C7] to-[#1CADA3] flex items-center justify-center text-white font-bold shadow-md shrink-0">
                <Landmark size={22} />
              </div>

              <div className="flex flex-col items-center sm:items-start">
                <div className="flex flex-col sm:flex-row items-center gap-2 sm:gap-3 mb-1">
                  <h2 className="text-xl sm:text-2xl font-bold text-slate-800">
                    NCD Investment Portal
                  </h2>
                  <span className="px-2.5 py-1 bg-emerald-100 text-emerald-700 text-[10px] font-bold rounded-full border border-emerald-200 whitespace-nowrap">
                    Exclusive Debentures
                  </span>
                </div>

                <p className="text-sm text-slate-500 flex items-center justify-center sm:justify-start gap-2">
                  Secure institutional-grade yields with corporate debt
                </p>
              </div>
            </div>

            {/* RIGHT BUTTONS (CAPSULE) */}
            <div className="w-full sm:w-auto mt-4 sm:mt-0">
              <div className="p-1 bg-slate-100/80 backdrop-blur-sm rounded-2xl sm:rounded-full flex flex-col sm:flex-row sm:items-center gap-1 relative shadow-inner border border-slate-200/50">

                <button
                  onClick={() => setMainTab('explore')}
                  className={`w-full sm:w-auto px-4 md:px-5 py-2.5 md:py-2 rounded-xl sm:rounded-full text-[10px] md:text-xs font-black uppercase tracking-wider flex items-center justify-center gap-1.5 transition-all ${
                    mainTab === 'explore' 
                    ? "bg-white text-[#2076C7] shadow-sm" 
                    : "text-slate-500 hover:text-slate-700"
                  }`}
                >
                  <Search size={14} />
                  Explore NCDs
                </button>

                <button
                  onClick={() => setMainTab('investments')}
                  className={`relative w-full sm:w-auto px-4 md:px-5 py-2.5 md:py-2 rounded-xl sm:rounded-full text-[10px] md:text-xs font-black uppercase tracking-wider flex items-center justify-center gap-1.5 transition-all ${
                    mainTab === 'investments' 
                    ? "text-white" 
                    : "text-slate-500 hover:text-slate-700"
                  }`}
                >
                  {mainTab === 'investments' && (
                    <div className="absolute inset-0 bg-gradient-to-r from-[#2076C7] to-[#1CADA3] rounded-xl sm:rounded-full -z-10 shadow-sm" />
                  )}
                  <Briefcase size={14} />
                  My Holdings
                </button>

              </div>
            </div>

          </div>
        </motion.div>

        <AnimatePresence mode="wait">
          {mainTab === 'explore' ? (
             <motion.div
               key="explore"
               initial={{ opacity: 0, x: -20 }}
               animate={{ opacity: 1, x: 0 }}
               exit={{ opacity: 0, x: 20 }}
               transition={{ duration: 0.3 }}
               className="space-y-8"
             >
                {/* Highlights Banner */}
                <div className="bg-gradient-to-r from-[#2076C7] to-[#1CADA3] rounded-[2rem] sm:rounded-[2.5rem] p-5 sm:p-6 md:p-8 text-white relative overflow-hidden shadow-lg">
                   <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full -translate-y-1/2 translate-x-1/4 blur-3xl pointer-events-none" />
                   <div className="relative z-10 flex flex-col md:flex-row items-center justify-between gap-4 md:gap-6">
                      <div className="flex items-center gap-4">
                         <div className="w-12 h-12 sm:w-14 sm:h-14 bg-white/20 rounded-2xl flex items-center justify-center shrink-0 backdrop-blur-md shadow-sm border border-white/10">
                            <Star size={22} className="text-white" />
                         </div>
                         <div>
                            <p className="text-[9px] sm:text-[10px] font-black uppercase tracking-[0.2em] sm:tracking-[0.3em] text-white/70 mb-1">Premium Fixed Income</p>
                            <h2 className="text-lg sm:text-xl md:text-2xl font-black leading-tight">
                              Yields up to <span className="underline decoration-white/30 underline-offset-4">11.50% p.a.</span>
                            </h2>
                         </div>
                      </div>
                      <div className="flex gap-2 sm:gap-3 shrink-0 w-full md:w-auto justify-center md:justify-end">
                         <div className="bg-white/10 border border-white/20 rounded-xl sm:rounded-2xl px-4 sm:px-5 py-2.5 sm:py-3 backdrop-blur-sm text-center flex-1 md:flex-none">
                            <p className="text-[9px] font-black uppercase tracking-widest text-white/60 mb-0.5">Rating</p>
                            <p className="text-xs sm:text-sm font-black">CRISIL AAA</p>
                         </div>
                         <div className="bg-white/10 border border-white/20 rounded-xl sm:rounded-2xl px-4 sm:px-5 py-2.5 sm:py-3 backdrop-blur-sm text-center flex-1 md:flex-none">
                            <p className="text-[9px] font-black uppercase tracking-widest text-white/60 mb-0.5">Min Cap</p>
                            <p className="text-xs sm:text-sm font-black">₹10,000</p>
                         </div>
                      </div>
                   </div>
                </div>

                {/* NCD Market Feed */}
                <div className="bg-white rounded-[2rem] sm:rounded-[2.5rem] border border-slate-100 shadow-sm p-4 sm:p-6 md:p-10 overflow-hidden">
                   {/* Tabs & Search */}
                   <div className="flex flex-col md:flex-row md:items-center justify-between mb-6 sm:mb-8 pb-5 sm:pb-6 border-b border-slate-50 gap-3 sm:gap-4">
                      <h2 className="text-lg sm:text-xl font-black text-slate-900 uppercase tracking-tighter flex items-center gap-2 sm:gap-3">
                        <TrendingUp className="text-[#2076C7]" size={22} /> Live Market
                      </h2>
                      
                      <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3">
                        <div className="relative w-full sm:w-auto">
                            <Search className="absolute left-3 sm:left-4 top-1/2 -translate-y-1/2 text-slate-800 w-4 h-4" />
                            <input 
                                type="text" 
                                placeholder="Search issuer..."
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                                className="w-full sm:w-56 md:w-64 pl-10 sm:pl-12 pr-4 py-2.5 sm:py-3 rounded-2xl border border-slate-300 focus:outline-none bg-slate-50 transition-all text-xs font-bold text-slate-900"
                            />
                        </div>
                        <div className="flex p-1 bg-slate-50 rounded-2xl border border-slate-100 w-full sm:w-auto">
                          {(["Open", "Upcoming", "Closed"] as const).map((tab) => (
                            <button
                              key={tab}
                              onClick={() => setNcdStatusTab(tab)}
                              className={`flex-1 sm:flex-none px-3 sm:px-5 py-2 sm:py-2.5 rounded-xl text-[9px] sm:text-[10px] font-black uppercase tracking-[0.1em] sm:tracking-[0.15em] transition-all whitespace-nowrap ${
                                ncdStatusTab === tab
                                  ? "bg-white text-[#2076C7] shadow-sm border border-slate-200"
                                  : "text-slate-400 hover:text-slate-600"
                              }`}
                            >
                              {tab}
                            </button>
                          ))}
                        </div>
                      </div>
                   </div>

                   {/* Cards Grid */}
                   <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
                      {filteredNCDs.length > 0 ? (
                        filteredNCDs.map((ncd) => (
                          <motion.div
                            key={ncd.id}
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            className="group border border-slate-100 rounded-[1.5rem] sm:rounded-[2rem] overflow-hidden bg-white hover:border-blue-200 hover:shadow-xl transition-all duration-300 flex flex-col pt-2"
                          >
                            <div className="px-6 py-4 relative">
                               <div className="absolute top-4 right-6">
                                 <span className={`text-[9px] font-black uppercase tracking-[0.2em] px-3 py-1.5 rounded-lg border ${
                                    ncdStatusTab === "Open" ? "bg-emerald-50 border-emerald-100 text-emerald-600" 
                                    : ncdStatusTab === "Upcoming" ? "bg-amber-50 border-amber-100 text-amber-600"
                                    : "bg-red-50 border-red-100 text-red-500"
                                 }`}>
                                   {ncdStatusTab}
                                 </span>
                               </div>
                               <div className="w-14 h-14 rounded-2xl bg-[#F8FAFC] flex items-center justify-center border border-slate-100 mb-4 group-hover:scale-110 transition-transform">
                                  <Landmark size={24} className="text-[#2076C7]" />
                               </div>
                               <p className="text-[10px] font-black text-[#1CADA3] uppercase tracking-widest mb-1">{ncd.rating} • {ncd.ratingAgency}</p>
                               <h3 className="text-lg font-black text-slate-900 leading-tight">{ncd.issuer}</h3>
                               <p className="text-xs font-bold text-slate-500 mt-1 line-clamp-1">{ncd.title}</p>
                            </div>

                            <div className="p-6 flex-1 flex flex-col bg-slate-50/50 border-t border-slate-100 mt-2">
                               <div className="grid grid-cols-2 gap-4 mb-6">
                                  <div className="bg-white p-3 rounded-xl border border-slate-100 shadow-sm">
                                    <p className="text-[9px] font-black text-slate-400 uppercase tracking-widest mb-1">Yield p.a.</p>
                                    <p className="text-xl font-black text-[#2076C7]">{ncd.interest}</p>
                                  </div>
                                  <div className="bg-white p-3 rounded-xl border border-slate-100 shadow-sm">
                                    <p className="text-[9px] font-black text-slate-400 uppercase tracking-widest mb-1">Tenure</p>
                                    <p className="text-base font-black text-slate-700 mt-1">{ncd.tenure}</p>
                                  </div>
                               </div>
                               <div className="mt-auto flex gap-3">
                                 <button 
                                    onClick={() => handleViewDetails(ncd)}
                                    className="flex-1 bg-white border border-slate-200 text-slate-600 py-3 rounded-xl text-xs font-black transition-all hover:border-[#2076C7] hover:text-[#2076C7]"
                                 >
                                    Details
                                 </button>
                                 {ncdStatusTab === "Open" ? (
                                   <button onClick={() => handleInvestNow(ncd)} className="flex-1 bg-[#2076C7] text-white py-3 rounded-xl text-xs font-black shadow-md hover:bg-[#1a5fa1] transition-all">
                                      Invest
                                   </button>
                                 ) : (
                                   <button disabled className="flex-1 bg-slate-200 text-slate-400 py-3 rounded-xl text-xs font-black cursor-not-allowed">
                                      {ncdStatusTab === "Upcoming" ? "Soon" : "Closed"}
                                   </button>
                                 )}
                               </div>
                            </div>
                          </motion.div>
                        ))
                      ) : (
                        <div className="col-span-full py-20 text-center">
                           <h3 className="text-xl font-black text-slate-700 uppercase tracking-tight">No Results Found</h3>
                        </div>
                      )}
                   </div>
                </div>
             </motion.div>
          ) : (
             <motion.div
               key="investments"
               initial={{ opacity: 0, x: 20 }}
               animate={{ opacity: 1, x: 0 }}
               exit={{ opacity: 0, x: -20 }}
               transition={{ duration: 0.3 }}
               className="space-y-8"
             >
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-10">
                    <div className="lg:col-span-2 grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <div className="bg-white p-6 rounded-[2rem] border border-slate-100 shadow-sm">
                            <div className="flex items-center gap-3 mb-4">
                                <div className="p-2.5 bg-blue-50 rounded-xl text-[#2076C7]">
                                    <Wallet className="w-5 h-5" />
                                </div>
                                <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Total Investment</span>
                            </div>
                            <h3 className="text-2xl font-black text-slate-900">₹{portfolioStats.total.toLocaleString()}</h3>
                        </div>

                        <div className="bg-white p-6 rounded-[2rem] border border-slate-100 shadow-sm">
                            <div className="flex items-center gap-3 mb-4">
                                <div className="p-2.5 bg-teal-50 rounded-xl text-[#1CADA3]">
                                    <ShieldCheck className="w-5 h-5" />
                                </div>
                                <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Weighted Yield</span>
                            </div>
                            <h3 className="text-2xl font-black text-slate-900">{portfolioStats.weightedYield}%</h3>
                        </div>
                    </div>

                    <div className="bg-white p-6 rounded-[2.5rem] border border-slate-100 shadow-sm flex flex-col items-center justify-center">
                        <PieChartIcon className="w-12 h-12 text-slate-200 mb-2" />
                        <span className="text-[10px] font-black text-slate-300 uppercase tracking-widest">Allocation Matrix</span>
                    </div>
                </div>

                <motion.div 
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="bg-white rounded-[3rem] p-12 text-center border-2 border-dashed border-slate-200 shadow-sm flex flex-col items-center justify-center min-h-[350px]"
                >
                    <div className="w-24 h-24 bg-blue-50/50 rounded-full flex items-center justify-center mb-6 border border-blue-100">
                        <ShoppingBag className="w-10 h-10 text-[#2076C7] opacity-20" />
                    </div>
                    <h2 className="text-2xl font-black text-slate-800 mb-2">No Active NCD Assets</h2>
                    <p className="text-slate-500 max-w-sm mx-auto mb-10 leading-relaxed font-medium">
                        You haven't invested in any Non-Convertible Debentures yet. Explore the market to start earning secure yields.
                    </p>
                    <button 
                        onClick={() => setMainTab('explore')}
                        className="flex items-center gap-3 bg-gradient-to-r from-[#2076C7] to-[#1CADA3] text-white px-8 py-5 rounded-2xl font-black text-sm hover:shadow-2xl transition-all"
                    >
                        <Plus size={18} />
                        Browse Issues
                    </button>
                </motion.div>
             </motion.div>
          )}
        </AnimatePresence>

      </div>

      <NCDDetailDrawer 
        isOpen={isDrawerOpen}
        ncd={selectedNCD}
        onClose={() => setIsDrawerOpen(false)}
      />

    </div>
  );
}
