"use client";

import React, { useState, useMemo, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useRouter } from "next/navigation";
import {
  Briefcase, TrendingUp, ShieldCheck, Zap, ArrowRight,
  Clock, Landmark, IndianRupee, Star, Percent,
  Calendar, AlertCircle, FileText, Search, Plus, Download,
  Wallet, BarChart3, PieChart as PieChartIcon, 
  ShoppingBag, Sparkles, ChevronRight, CreditCard
} from "lucide-react";
import {
  LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid,
  PieChart, Pie, Cell
} from "recharts";
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
    // Investment action logic will go through backend here
    // For now, let's just open the details drawer to view
    setSelectedNCD(ncd);
    setIsDrawerOpen(true);
  };

  return (
    <div className="flex-1 p-4 md:p-10 bg-[#F8FAFC] font-sans min-h-screen">
      
      {/* Main Toggle Navigation */}
      <div className="flex justify-start gap-4 mb-8">
          <button
              onClick={() => setMainTab('explore')}
              className={`px-8 py-3 rounded-2xl font-black text-xs uppercase tracking-wider transition-all shadow-sm border border-slate-100 flex items-center gap-2 ${
                  mainTab === 'explore'
                      ? 'bg-gradient-to-br from-[#2076C7] to-[#1CADA3] text-white shadow-lg shadow-blue-200'
                      : 'bg-white text-slate-500 hover:text-[#2076C7]'
              }`}
          >
              <Search className={mainTab === 'explore' ? "w-4 h-4 animate-pulse" : "w-4 h-4"} /> 
              Explore NCDs
          </button>
          <button
              onClick={() => setMainTab('investments')}
              className={`px-8 py-3 rounded-2xl font-black text-xs uppercase tracking-wider transition-all shadow-sm border border-slate-100 flex items-center gap-2 ${
                  mainTab === 'investments'
                      ? 'bg-gradient-to-br from-[#2076C7] to-[#1CADA3] text-white shadow-lg shadow-blue-200'
                      : 'bg-white text-slate-500 hover:text-[#2076C7]'
              }`}
          >
              <Briefcase className={mainTab === 'investments' ? "w-4 h-4 animate-pulse" : "w-4 h-4"} /> 
              My Holdings
          </button>
      </div>

      <AnimatePresence mode="wait">
        {mainTab === 'explore' ? (
           <motion.div
             key="explore"
             initial={{ opacity: 0, x: -20 }}
             animate={{ opacity: 1, x: 0 }}
             exit={{ opacity: 0, x: 20 }}
             transition={{ duration: 0.3 }}
             className="max-w-7xl mx-auto space-y-8"
           >
              {/* Highlights Banner */}
              <div className="bg-gradient-to-r from-[#2076C7] to-[#1CADA3] rounded-[2.5rem] p-8 md:p-10 text-white relative overflow-hidden shadow-xl">
                 <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full -translate-y-1/2 translate-x-1/4 blur-3xl pointer-events-none" />
                 <div className="relative z-10 flex flex-col md:flex-row items-center justify-between gap-6">
                    <div className="flex items-start gap-5">
                       <div className="w-14 h-14 bg-white/20 rounded-2xl flex items-center justify-center shrink-0 backdrop-blur-md shadow-inner border border-white/10">
                          <Star size={28} className="text-yellow-300" />
                       </div>
                       <div>
                          <span className="bg-white/20 backdrop-blur-md px-2.5 py-1 rounded-lg text-[9px] font-black tracking-widest uppercase mb-3 inline-block">
                             Premium Fixed Income
                          </span>
                          <h2 className="text-2xl md:text-3xl font-black tracking-tight mb-2">High Yield Corporate NCDs</h2>
                          <p className="text-sm font-semibold text-white/80 max-w-xl leading-relaxed">
                            Lock in interest rates up to <span className="text-yellow-300 font-bold">11.50%</span> before rate cuts happen. Diversify your fixed income portfolio with highly rated corporate papers.
                          </p>
                       </div>
                    </div>
                    <div className="flex gap-4 shrink-0">
                       <div className="bg-white/10 border border-white/20 rounded-2xl px-5 py-4 backdrop-blur-sm text-center shadow-inner">
                          <p className="text-[10px] font-black uppercase tracking-widest text-white/60 mb-1">Max Rating</p>
                          <p className="text-lg font-black tracking-tight">CRISIL AAA</p>
                       </div>
                       <div className="bg-white/10 border border-white/20 rounded-2xl px-5 py-4 backdrop-blur-sm text-center shadow-inner">
                          <p className="text-[10px] font-black uppercase tracking-widest text-white/60 mb-1">Min Invest</p>
                          <p className="text-lg font-black tracking-tight">₹10,000</p>
                       </div>
                    </div>
                 </div>
              </div>

              {/* NCD Market Feed */}
              <div className="bg-white rounded-[2.5rem] border border-slate-100 shadow-sm p-6 md:p-10">
                 {/* Tabs & Search */}
                 <div className="flex flex-col md:flex-row md:items-center justify-between mb-8 pb-6 border-b border-slate-50 gap-4">
                    <h2 className="text-xl font-black text-slate-900 uppercase tracking-tighter flex items-center gap-3">
                      <Landmark className="text-[#2076C7]" size={24} /> Live Market
                    </h2>
                    
                    <div className="flex items-center gap-4 flex-wrap">
                      <div className="relative">
                          <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-800 w-4 h-4" />
                          <input 
                              type="text" 
                              placeholder="Search issuer or title..."
                              value={searchQuery}
                              onChange={(e) => setSearchQuery(e.target.value)}
                              className="w-full md:w-64 pl-12 pr-4 py-3 rounded-2xl border border-slate-300 focus:outline-none focus:ring-2 focus:ring-[#2076C7]/10 bg-slate-50 transition-all text-xs font-bold text-slate-900 placeholder:text-slate-500"
                          />
                      </div>
                      <div className="flex p-1 bg-slate-50 rounded-2xl border border-slate-100 shrink-0">
                        {(["Open", "Upcoming", "Closed"] as const).map((tab) => (
                          <button
                            key={tab}
                            onClick={() => setNcdStatusTab(tab)}
                            className={`px-6 py-2.5 rounded-xl text-[10px] font-black uppercase tracking-[0.15em] transition-all ${
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

                 {/* Rating Quick-Filters */}
                 <div className="flex items-center gap-3 mb-8 overflow-x-auto pb-4 scrollbar-hidden">
                    <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest shrink-0 mr-2">Filter Rating:</span>
                    {ratings.map((rating) => (
                      <button
                        key={rating}
                        onClick={() => setSelectedRating(rating)}
                        className={`px-5 py-2 rounded-xl text-[10px] font-black uppercase tracking-widest transition-all border shrink-0 ${
                          selectedRating === rating 
                            ? "bg-[#2076C7] border-[#2076C7] text-white shadow-md shadow-[#2076C7]/20" 
                            : "bg-white border-slate-200 text-slate-500 hover:border-slate-300"
                        }`}
                      >
                        {rating}
                      </button>
                    ))}
                 </div>

                 {/* Cards Grid */}
                 <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {filteredNCDs.length > 0 ? (
                      filteredNCDs.map((ncd) => (
                        <motion.div
                          key={ncd.id}
                          initial={{ opacity: 0, y: 20 }}
                          animate={{ opacity: 1, y: 0 }}
                          className="group border border-slate-100 rounded-[2rem] overflow-hidden bg-white hover:border-blue-200 hover:shadow-xl transition-all duration-300 flex flex-col pt-2"
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
                             <div className="w-14 h-14 rounded-2xl bg-[#F8FAFC] flex items-center justify-center border border-slate-100 mb-4 transition-transform group-hover:scale-110">
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
                                <div>
                                  <p className="text-[9px] font-black text-slate-400 uppercase tracking-widest flex items-center gap-1.5 mb-1">
                                     <IndianRupee size={10} /> Min Invest
                                  </p>
                                  <p className="text-sm font-bold text-slate-700">{ncd.minInvest}</p>
                                </div>
                                <div>
                                  <p className="text-[9px] font-black text-slate-400 uppercase tracking-widest flex items-center gap-1.5 mb-1">
                                     <Clock size={10} /> Payout
                                  </p>
                                  <p className="text-sm font-bold text-slate-700">{ncd.frequency}</p>
                                </div>
                             </div>
                             
                             <div className="mt-auto flex gap-3">
                               <button 
                                  onClick={() => handleViewDetails(ncd)}
                                  className="flex-1 bg-white border border-slate-200 text-slate-600 py-3 rounded-xl text-xs font-black transition-all shadow-sm hover:border-[#2076C7] hover:text-[#2076C7]"
                               >
                                  View Details
                               </button>
                               {ncdStatusTab === "Open" ? (
                                 <button onClick={() => handleInvestNow(ncd)} className="flex-1 bg-[#2076C7] text-white py-3 rounded-xl text-xs font-black shadow-md hover:shadow-lg hover:bg-[#1a5fa1] transition-all">
                                    Invest Now
                                 </button>
                               ) : (
                                 <button disabled className="flex-1 bg-slate-200 text-slate-400 py-3 rounded-xl text-xs font-black cursor-not-allowed">
                                    {ncdStatusTab === "Upcoming" ? "Opening Soon" : "Closed"}
                                 </button>
                               )}
                             </div>
                          </div>
                        </motion.div>
                      ))
                    ) : (
                      <div className="col-span-full py-20 text-center bg-slate-50 rounded-[2.5rem] border border-slate-200 border-dashed">
                         <div className="w-20 h-20 bg-white rounded-full flex items-center justify-center mx-auto mb-6 shadow-sm border border-slate-100">
                           <Search size={32} className="text-slate-300" />
                         </div>
                         <h3 className="text-xl font-black text-slate-700 uppercase tracking-tight">No Results Found</h3>
                         <p className="text-sm text-slate-500 font-medium mt-2 max-w-sm mx-auto">Try adjusting your rating filter or search query to find matching NCD issuances.</p>
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
             className="max-w-7xl mx-auto space-y-8"
           >
              <header className="mb-8 flex flex-col sm:flex-row justify-between items-start sm:items-end gap-4">
                  <div>
                      <h1 className="text-3xl font-black text-slate-900 mb-2">My NCD Portfolio</h1>
                      <p className="text-slate-500 text-sm font-medium italic">Consolidated view of your Corporate Debenture holdings.</p>
                  </div>
                  {investments.length > 0 && (
                      <div className="flex gap-3">
                          <button className="flex items-center gap-2 bg-white border border-slate-200 px-5 py-2.5 rounded-xl text-xs font-black text-slate-700 hover:bg-slate-50 transition-all shadow-sm">
                              <Download className="w-4 h-4" /> Export Ledger
                          </button>
                      </div>
                  )}
              </header>

              {/* Portfolio Summary Section */}
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-10">
                  <div className="lg:col-span-2 grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div className="bg-white p-6 rounded-[2rem] border border-slate-100 shadow-sm relative overflow-hidden group">
                          <div className="flex items-center gap-3 mb-4">
                              <div className="p-2.5 bg-blue-50 rounded-xl text-[#2076C7]">
                                  <Wallet className="w-5 h-5" />
                              </div>
                              <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Total Investment</span>
                          </div>
                          <h3 className="text-2xl font-black text-slate-900">₹{portfolioStats.total.toLocaleString()}</h3>
                          <p className="text-[10px] text-emerald-500 font-bold mt-2 flex items-center gap-1">
                              <TrendingUp className="w-3 h-3" /> +{(portfolioStats.total > 0 ? 1.4 : 0)}% vs last quarter
                          </p>
                      </div>

                      <div className="bg-white p-6 rounded-[2rem] border border-slate-100 shadow-sm">
                          <div className="flex items-center gap-3 mb-4">
                              <div className="p-2.5 bg-teal-50 rounded-xl text-[#1CADA3]">
                                  <ShieldCheck className="w-5 h-5" />
                              </div>
                              <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Risk Exposure</span>
                          </div>
                          <h3 className="text-2xl font-black text-slate-900">{portfolioStats.risk}</h3>
                          <p className="text-[10px] text-slate-500 font-bold mt-2">Rated by CRISIL/ICRA</p>
                      </div>

                      <div className="bg-white p-6 rounded-[2rem] border border-slate-100 shadow-sm">
                          <div className="flex items-center gap-3 mb-4">
                              <div className="p-2.5 bg-amber-50 rounded-xl text-amber-500">
                                  <Calendar className="w-5 h-5" />
                              </div>
                              <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Next Payout</span>
                          </div>
                          <h3 className="text-2xl font-black text-slate-900">{investments.length ? portfolioStats.nextCoupon : "-"}</h3>
                          <p className="text-[10px] text-amber-600 font-bold mt-2 flex items-center gap-1">
                              <Clock className="w-3 h-3" /> Scheduled Interest
                          </p>
                      </div>

                      <div className="bg-gradient-to-r from-[#2076C7] to-[#1CADA3] text-white p-6 rounded-[2rem] shadow-sm relative overflow-hidden">
                          <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full blur-2xl -translate-y-1/2 translate-x-1/3" />
                          <div className="flex items-center gap-3 mb-4 relative z-10">
                              <div className="p-2.5 bg-white/20 rounded-xl text-white backdrop-blur-sm">
                                  <Percent className="w-5 h-5" />
                              </div>
                              <span className="text-[10px] font-black text-white/80 uppercase tracking-widest">Weighted Yield</span>
                          </div>
                          <h3 className="text-2xl font-black relative z-10">{portfolioStats.weightedYield}%</h3>
                          <p className="text-[10px] text-white/90 font-bold mt-2 relative z-10">Estimated Annualized Returns</p>
                      </div>
                  </div>

                  {/* Allocation Pie Chart */}
                  <div className="bg-white p-6 rounded-[2.5rem] border border-slate-100 shadow-sm flex flex-col items-center">
                      <h4 className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-4">Issuer Allocation</h4>
                      <div className="w-full h-[200px] relative flex items-center justify-center">
                          {investments.length === 0 ? (
                              <div className="text-center">
                                  <div className="w-20 h-20 border-4 border-dashed border-slate-100 rounded-full mx-auto mb-2 flex items-center justify-center">
                                      <PieChartIcon className="w-6 h-6 text-slate-200" />
                                  </div>
                                  <span className="text-[10px] font-bold text-slate-300">Set Allocation Goal</span>
                              </div>
                          ) : (
                              <ResponsiveContainer width="100%" height="100%">
                                  <PieChart>
                                      <Pie
                                          data={(() => {
                                              const counts: Record<string, number> = {};
                                              investments.forEach(inv => {
                                                  counts[inv.issuer] = (counts[inv.issuer] || 0) + inv.amount;
                                              });
                                              return Object.entries(counts).map(([name, value]) => ({ name, value }));
                                          })()}
                                          cx="50%"
                                          cy="50%"
                                          innerRadius={60}
                                          outerRadius={80}
                                          paddingAngle={5}
                                          dataKey="value"
                                      >
                                          {investments.map((_, index) => (
                                              <Cell key={`cell-${index}`} fill={index % 2 === 0 ? '#2076C7' : '#1CADA3'} stroke="none" />
                                          ))}
                                      </Pie>
                                      <Tooltip 
                                          contentStyle={{ borderRadius: '1rem', border: 'none', boxShadow: '0 10px 25px -5px rgba(0,0,0,0.1)' }}
                                          itemStyle={{ fontSize: '10px', fontWeight: '900' }}
                                      />
                                  </PieChart>
                              </ResponsiveContainer>
                          )}
                      </div>
                      {investments.length > 0 && (
                        <div className="flex gap-4 mt-4 text-[9px] font-black uppercase text-slate-500 tracking-widest">
                            Diversified across {new Set(investments.map(i=>i.issuer)).size} issuer(s)
                        </div>
                      )}
                  </div>
              </div>

              {investments.length === 0 ? (
                  <motion.div 
                      initial={{ opacity: 0, scale: 0.9 }}
                      animate={{ opacity: 1, scale: 1 }}
                      className="bg-white rounded-[3rem] p-12 text-center border-2 border-dashed border-slate-200 shadow-sm flex flex-col items-center justify-center min-h-[350px]"
                  >
                      <div className="w-24 h-24 bg-blue-50/50 rounded-full flex items-center justify-center mb-6 relative border border-blue-100">
                          <ShoppingBag className="w-10 h-10 text-[#2076C7] opacity-20" />
                          <Sparkles className="w-6 h-6 text-[#1CADA3] absolute top-2 right-2 animate-bounce" />
                      </div>
                      <h2 className="text-2xl font-black text-slate-800 mb-2">No Active NCD Assets</h2>
                      <p className="text-slate-500 max-w-sm mx-auto mb-10 leading-relaxed font-medium">
                          You haven't invested in any Non-Convertible Debentures yet. Explore the market to start earning secure yields.
                      </p>
                      <button 
                          onClick={() => setMainTab('explore')}
                          className="flex items-center gap-3 bg-gradient-to-r from-[#2076C7] to-[#1CADA3] text-white px-8 py-5 rounded-2xl font-black text-sm hover:shadow-2xl hover:shadow-[#1CADA3]/20 transition-all active:scale-95 group"
                      >
                          <Plus className="w-5 h-5 bg-white/20 rounded-full p-0.5 group-hover:rotate-90 transition-transform" />
                          Browse Open Issues
                      </button>
                  </motion.div>
              ) : (
                  <>
                  {/* Growth Projection Line Chart */}
                  <section className="bg-white p-8 rounded-[2.5rem] border border-slate-100 shadow-sm mb-10">
                      <div className="flex items-center justify-between mb-8">
                          <h3 className="text-lg font-black text-slate-800">Portfolio Returns Projection</h3>
                          <div className="flex items-center gap-2 px-3 py-1 bg-emerald-50 text-emerald-600 rounded-lg text-[10px] font-black uppercase">
                              <TrendingUp className="w-3 h-3" /> Interest Accruing
                          </div>
                      </div>
                      <div className="h-[300px] w-full relative flex items-center justify-center">
                          <ResponsiveContainer width="100%" height="100%">
                              <LineChart data={chartData}>
                                  <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#E2E8F0" />
                                  <XAxis 
                                      dataKey="month" 
                                      axisLine={false} 
                                      tickLine={false} 
                                      tick={{ fill: '#94A3B8', fontSize: 11, fontWeight: 900 }}
                                      dy={10}
                                  />
                                  <YAxis 
                                      axisLine={false} 
                                      tickLine={false} 
                                      tick={{ fill: '#94A3B8', fontSize: 11, fontWeight: 900 }}
                                      tickFormatter={(v) => `₹${(v/1000).toFixed(1)}k`}
                                  />
                                  <Tooltip 
                                      contentStyle={{ borderRadius: '20px', border: 'none', boxShadow: '0 20px 50px -12px rgb(0 0 0 / 0.15)', padding: '16px' }}
                                      itemStyle={{ color: '#2076C7', fontWeight: '900' }}
                                  />
                                  <Line 
                                      type="monotone" 
                                      dataKey="returns" 
                                      stroke="url(#colorGradientNcd)" 
                                      strokeWidth={5} 
                                      dot={{ fill: '#2076C7', strokeWidth: 2, r: 5, stroke: '#fff' }}
                                      activeDot={{ r: 9, strokeWidth: 0, fill: '#1CADA3' }}
                                  />
                                  <defs>
                                      <linearGradient id="colorGradientNcd" x1="0" y1="0" x2="1" y2="0">
                                          <stop offset="0%" stopColor="#2076C7" />
                                          <stop offset="100%" stopColor="#1CADA3" />
                                      </linearGradient>
                                  </defs>
                              </LineChart>
                          </ResponsiveContainer>
                      </div>
                  </section>

                  {/* Ledger Table */}
                  <section className="bg-white rounded-[2.5rem] border border-slate-100 shadow-sm overflow-hidden auto-cols-min">
                      <div className="p-8 border-b border-slate-50 flex justify-between items-center">
                          <h3 className="text-lg font-black text-slate-800 flex items-center gap-2">
                              <FileText className="w-5 h-5 text-[#2076C7]" /> Position Ledger
                          </h3>
                      </div>
                      <div className="overflow-x-auto">
                          <table className="w-full text-left">
                              <thead>
                                  <tr className="bg-slate-50/50">
                                      <th className="px-8 py-5 text-[10px] font-black uppercase text-slate-400 tracking-wider">Issuer Detail</th>
                                      <th className="px-8 py-5 text-[10px] font-black uppercase text-slate-400 tracking-wider">Capital Allocated</th>
                                      <th className="px-8 py-5 text-[10px] font-black uppercase text-slate-400 tracking-wider">Interest Rate</th>
                                      <th className="px-8 py-5 text-[10px] font-black uppercase text-slate-400 tracking-wider text-center">Status</th>
                                      <th className="px-8 py-5 text-[10px] font-black uppercase text-slate-400 tracking-wider text-right">Certificate</th>
                                  </tr>
                              </thead>
                              <tbody className="divide-y divide-slate-50">
                                  {investments.map((inv) => (
                                      <tr key={inv.id} className="hover:bg-slate-50 transition-colors group">
                                          <td className="px-8 py-6">
                                              <div className="font-bold text-slate-900 group-hover:text-[#2076C7] transition-colors">{inv.issuer}</div>
                                              <div className="text-[10px] text-slate-400 mt-1 font-bold flex items-center gap-1 border border-slate-200 w-fit px-2 py-0.5 rounded-md">
                                                {inv.rating}
                                              </div>
                                          </td>
                                          <td className="px-8 py-6">
                                              <div className="font-black text-slate-800">₹{inv.amount.toLocaleString()}</div>
                                              <div className="text-[10px] text-slate-400 mt-1 font-bold">Invested {inv.investedDate}</div>
                                          </td>
                                          <td className="px-8 py-6">
                                              <div className="font-black text-[#1CADA3]">{inv.interest}</div>
                                              <div className="text-[10px] text-slate-400 mt-1 font-bold">Next Payout: {inv.nextPayout}</div>
                                          </td>
                                          <td className="px-8 py-6 text-center">
                                              <span className="px-4 py-1.5 rounded-xl text-[10px] font-black uppercase tracking-widest inline-flex items-center gap-1.5 bg-emerald-50 text-emerald-600">
                                                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-600"></span>
                                                  {inv.status}
                                              </span>
                                          </td>
                                          <td className="px-8 py-6 text-right">
                                              <button className="p-2.5 bg-slate-50 text-slate-400 hover:text-[#2076C7] hover:bg-blue-50 rounded-xl transition-all">
                                                  <FileText className="w-4 h-4" />
                                              </button>
                                          </td>
                                      </tr>
                                  ))}
                              </tbody>
                          </table>
                      </div>
                  </section>
                  </>
              )}

           </motion.div>
        )}
      </AnimatePresence>

      {/* ─── NCD Detail Drawer ─── */}
      <NCDDetailDrawer 
        isOpen={isDrawerOpen}
        ncd={selectedNCD}
        onClose={() => setIsDrawerOpen(false)}
      />

    </div>
  );
}
