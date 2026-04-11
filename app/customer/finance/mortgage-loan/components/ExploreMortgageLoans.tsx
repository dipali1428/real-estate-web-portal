"use client";

import React, { useState, useEffect } from "react";
import {
  Search,
  Filter,
  Landmark,
  Percent,
  ArrowDownSquare,
  X,
  ShieldCheck,
  Database,
  Clock,
  Bookmark,
  BookmarkCheck,
  Home,
  FileText
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { categorizedPlans } from "../loanConstants";

export default function ExploreMortgageLoans({ activeTab, setActiveTab }: { activeTab: string, setActiveTab: (tab: "explore" | "applications") => void }) {
  const initialBanks = categorizedPlans["New Purchase"] || [];

  const [searchTerm, setSearchTerm] = useState("");
  const [filteredBanks, setFilteredBanks] = useState(initialBanks);
  const [showFilters, setShowFilters] = useState(false);
  const [sortBy, setSortBy] = useState("default");
  const [lastUpdated, setLastUpdated] = useState("");

  // Wishlist state
  const [wishlist, setWishlist] = useState<any[]>([]);
  const [showToast, setShowToast] = useState(false);
  const [toastMessage, setToastMessage] = useState("");

  useEffect(() => {
    const savedWishlist = localStorage.getItem("user_wishlist");
    if (savedWishlist) setWishlist(JSON.parse(savedWishlist));
  }, []);

  useEffect(() => {
    localStorage.setItem("user_wishlist", JSON.stringify(wishlist));
  }, [wishlist]);

  useEffect(() => {
    setLastUpdated(new Date().toLocaleTimeString('en-IN', {
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit'
    }));
  }, []);

  useEffect(() => {
    let filtered = [...initialBanks];

    if (searchTerm.trim()) {
      filtered = filtered.filter(plan =>
        plan.bank.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    if (sortBy === "rate-asc") {
      filtered.sort((a, b) => (parseFloat(a.interest) || 0) - (parseFloat(b.interest) || 0));
    } else if (sortBy === "rate-desc") {
      filtered.sort((a, b) => (parseFloat(b.interest) || 0) - (parseFloat(a.interest) || 0));
    } else if (sortBy === "name-asc") {
      filtered.sort((a, b) => a.bank.localeCompare(b.bank));
    }

    setFilteredBanks(filtered);
  }, [searchTerm, sortBy]);

  const clearFilters = () => {
    setSearchTerm("");
    setSortBy("default");
    setShowFilters(false);
  };

  const toggleWishlist = (plan: any) => {
    const isPresent = wishlist.some(item => item.id === plan.bank && item.category === "mortgage-loan");
    if (isPresent) {
      setWishlist(wishlist.filter(item => !(item.id === plan.bank && item.category === "mortgage-loan")));
    } else {
      const wishlistItem = {
        id: plan.bank,
        category: "mortgage-loan",
        name: plan.bank,
        logo: "🏢",
        keyMetrics: {
          interest: plan.interest,
          processingFee: plan.fee,
          tenure: "Up to 15 Years",
          type: "Mortgage Loan"
        },
        addedDate: new Date().toLocaleDateString(),
      };
      setWishlist([...wishlist, wishlistItem]);
      setToastMessage(`"${plan.bank}" added to wishlist!`);
      setShowToast(true);
      setTimeout(() => setShowToast(false), 3000);
    }
  };

  const totalBanks = initialBanks.length;
  const parseRate = (rateStr: string) => parseFloat(rateStr.replace(/[^\d.]/g, '')) || 0;

  const avgRate = totalBanks > 0
    ? (initialBanks.reduce((sum, p) => sum + parseRate(p.interest), 0) / totalBanks).toFixed(2) + '%'
    : 'N/A';

  const lowestRate = totalBanks > 0
    ? Math.min(...initialBanks.map(p => parseRate(p.interest))).toFixed(2) + '%'
    : 'N/A';

  const hasNilFee = initialBanks.some(p => p.fee.toUpperCase() === 'NIL');
  const bestFee = hasNilFee ? 'NIL' : 'Varies';

  const activeFilterCount = searchTerm ? 1 : 0;

  return (
    <div className="animate-fadeIn pb-12">
      {/* Wishlist Toast */}
      <AnimatePresence>
        {showToast && (
          <motion.div
            initial={{ opacity: 0, y: -20, x: 20 }}
            animate={{ opacity: 1, y: 0, x: 0 }}
            exit={{ opacity: 0, y: -20, x: 20 }}
            className="fixed top-24 right-6 z-[9999] flex items-center gap-3 px-5 py-3 rounded-2xl shadow-2xl text-white text-sm font-bold bg-gradient-to-r from-[#2076C7] to-[#1CADA3]"
          >
            <BookmarkCheck size={18} />
            {toastMessage}
          </motion.div>
        )}
      </AnimatePresence>

      {/* Modern Header */}
      <div className="relative bg-white rounded-2xl p-6 mb-6 shadow-sm border border-slate-100/60 mt-4">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-xl bg-gradient-to-r from-[#2076C7] to-[#1CADA3] flex items-center justify-center text-white font-bold text-xl shadow-lg shrink-0">
              <Landmark size={24} />
            </div>
            <div>
              <div className="flex items-center gap-3 mb-1">
                <h2 className="text-xl sm:text-2xl font-bold text-slate-800">
                  Mortgage Loans
                </h2>
                <span className="px-2.5 py-1 bg-emerald-100 text-emerald-700 text-[10px] font-bold rounded-full border border-emerald-200 whitespace-nowrap">
                  {totalBanks} Partners
                </span>
              </div>
              <p className="text-sm text-slate-500 flex items-center gap-2">
                <Landmark size={14} className="text-gray-400" />
                Compare and apply for the best mortgage loan offers
              </p>
            </div>
          </div>

          <div className="flex pb-2 md:pb-0 w-full sm:w-auto mt-2 sm:mt-0 overflow-x-auto hide-scrollbar sm:overflow-visible">
            <div className="p-1 bg-slate-100/80 backdrop-blur-sm rounded-full flex items-center gap-1 relative shadow-inner border border-slate-200/50 shrink-0">
              <button
                onClick={() => setActiveTab('explore')}
                className={`relative px-3 md:px-5 py-1.5 md:py-2 rounded-full text-[10px] md:text-xs font-bold uppercase tracking-wider transition-all duration-300 z-10 flex items-center gap-1.5 shrink-0 ${activeTab === 'explore' ? 'text-white' : 'text-slate-500 hover:text-slate-700'}`}
              >
                {activeTab === 'explore' && (
                  <div className="absolute inset-0 bg-gradient-to-r from-[#2076C7] to-[#1CADA3] rounded-full -z-10 shadow-sm" />
                )}
                <Home size={14} />
                <span>Offers</span>
              </button>
              <button
                onClick={() => setActiveTab('applications')}
                className={`relative px-3 md:px-5 py-1.5 md:py-2 rounded-full text-[10px] md:text-xs font-bold uppercase tracking-wider transition-all duration-300 z-10 flex items-center gap-1.5 shrink-0 ${activeTab === 'applications' ? 'text-white' : 'text-slate-500 hover:text-slate-700'}`}
              >
                {activeTab === 'applications' && (
                  <div className="absolute inset-0 bg-gradient-to-r from-[#2076C7] to-[#1CADA3] rounded-full -z-10 shadow-sm" />
                )}
                <FileText size={14} />
                <span>Applications</span>
              </button>
            </div>
          </div>
        </div>
      </div>

      <div className="flex flex-col md:flex-row md:items-center justify-end gap-3 mb-6">
        {/* Search Bar */}
        <div className="relative w-full md:w-64">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
          <input
            type="text"
            placeholder="Search partner banks..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-9 pr-4 py-2.5 bg-white border border-gray-200 rounded-xl text-sm text-gray-900 placeholder:text-gray-400 outline-none focus:border-[#2076C7] focus:ring-2 focus:ring-[#2076C7]/10 transition-all shadow-sm"
          />
        </div>

        {/* Filter Button */}
        <button
          onClick={() => setShowFilters(!showFilters)}
          className={`px-4 py-2.5 border rounded-xl text-sm font-medium flex items-center justify-center gap-2 transition-all shrink-0 shadow-sm ${showFilters
            ? 'bg-[#2076C7] text-white border-[#2076C7]'
            : 'bg-white border-gray-200 text-gray-700 hover:bg-gray-50'
            }`}
        >
          <Filter size={18} />
          Filters
          {activeFilterCount > 0 && (
            <span className="w-5 h-5 bg-white text-[#2076C7] rounded-full text-xs flex items-center justify-center font-bold">
              {activeFilterCount}
            </span>
          )}
        </button>
      </div>

      {/* Main Content */}
      <div>

        {/* Market Overview Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4 mb-8">
          <div className="bg-white rounded-xl p-4 shadow-sm border border-gray-100">
            <div className="flex items-center gap-2 text-sm text-gray-500 mb-1">
              <Landmark size={16} className="text-[#2076C7]" />
              Total Banks
            </div>
            <p className="text-2xl font-bold text-gray-900">
              {totalBanks}
            </p>
          </div>

          <div className="bg-white rounded-xl p-4 shadow-sm border border-gray-100">
            <div className="flex items-center gap-2 text-sm text-gray-500 mb-1">
              <Percent size={16} className="text-purple-600" />
              Avg. Interest Rate
            </div>
            <p className="text-2xl font-bold text-gray-900">
              {avgRate}
            </p>
          </div>

          <div className="bg-white rounded-xl p-4 shadow-sm border border-gray-100">
            <div className="flex items-center gap-2 text-sm text-gray-500 mb-1">
              <ArrowDownSquare size={16} className="text-emerald-600" />
              Lowest Rate
            </div>
            <p className="text-2xl font-bold text-gray-900">
              {lowestRate}
            </p>
          </div>

          <div className="bg-white rounded-xl p-4 shadow-sm border border-gray-100">
            <div className="flex items-center gap-2 text-sm text-gray-500 mb-1">
              <Clock size={16} className="text-amber-600" />
              Last Updated
            </div>
            <p className="text-lg font-bold text-gray-900">
              {lastUpdated || 'Just now'}
            </p>
          </div>
        </div>

        {/* Filter Panel */}
        <AnimatePresence>
          {showFilters && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              className="bg-white rounded-2xl shadow-lg border border-gray-200 overflow-hidden mb-8"
            >
              <div className="p-6">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-lg font-bold text-gray-900 flex items-center gap-2">
                    <Filter className="w-5 h-5 text-[#2076C7]" />
                    Filter Offers
                  </h3>
                  <button
                    onClick={clearFilters}
                    className="text-sm text-gray-500 hover:text-gray-700 flex items-center gap-1"
                  >
                    <X size={16} />
                    Clear all
                  </button>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  {/* Sort By Filter */}
                  <div>
                    <label className="block text-xs font-semibold text-gray-700 uppercase tracking-wider mb-2">
                      Sort By
                    </label>
                    <select
                      className="w-full px-4 py-2.5 bg-white border border-gray-300 rounded-xl text-sm text-gray-900 outline-none focus:border-[#2076C7] focus:ring-2 focus:ring-[#2076C7]/10 transition-all"
                      value={sortBy}
                      onChange={(e) => setSortBy(e.target.value)}
                    >
                      <option value="default">Default Order</option>
                      <option value="rate-asc">Interest Rate: Low to High</option>
                      <option value="rate-desc">Interest Rate: High to Low</option>
                      <option value="name-asc">Bank Name: A to Z</option>
                    </select>
                  </div>

                  {/* Results Summary */}
                  <div className="col-span-1 md:col-start-3 bg-gradient-to-r from-blue-50 to-indigo-50 rounded-xl p-4 flex items-center justify-between">
                    <div>
                      <p className="text-xs text-gray-500 mb-1">Showing</p>
                      <p className="text-2xl font-bold text-gray-900">
                        {filteredBanks.length}
                      </p>
                      <p className="text-xs text-gray-500">
                        of {totalBanks} partner banks
                      </p>
                    </div>
                    <div className="w-12 h-12 rounded-full bg-white flex items-center justify-center">
                      <Database className="w-6 h-6 text-[#2076C7]" />
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Companies Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <AnimatePresence mode="popLayout">
            {filteredBanks.length > 0 ? (
              filteredBanks.map((plan: any, index: number) => (
                <motion.div
                  key={plan.bank + index}
                  layout
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  transition={{ duration: 0.2 }}
                  className="bg-white rounded-2xl p-6 shadow-sm border border-gray-200 hover:shadow-lg hover:border-[#2076C7]/30 transition-all flex flex-col relative group"
                >
                  {/* Bank Header */}
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex items-center gap-3">
                      <div
                        className="w-12 h-12 rounded-xl flex items-center justify-center shrink-0 border border-gray-100 shadow-sm"
                        style={{ backgroundColor: '#F0F7FF', color: plan.color === 'peacock-green' ? '#1CADA3' : '#2076C7' }}
                      >
                        <Landmark size={24} />
                      </div>
                      <div>
                        <div className="font-bold text-gray-900 text-lg leading-tight">
                          {plan.bank}
                        </div>
                        <div className="text-xs text-gray-500 flex items-center gap-1 mt-1">
                          <ShieldCheck size={12} className="text-emerald-500" />
                          <span className="truncate max-w-[150px]" title={plan.benefits[0]}>{plan.benefits[0]}</span>
                        </div>
                      </div>
                    </div>

                    <button
                      onClick={() => toggleWishlist(plan)}
                      className="p-2 rounded-full bg-gray-50 text-gray-400 hover:text-[#2076C7] hover:bg-blue-50 transition-colors"
                      title="Save to Wishlist"
                    >
                      {wishlist.some(item => item.id === plan.bank && item.category === "mortgage-loan") ? (
                        <BookmarkCheck size={20} className="text-[#2076C7]" fill="#e0f2fe" />
                      ) : (
                        <Bookmark size={20} />
                      )}
                    </button>
                  </div>

                  {/* Metrics grid */}
                  <div className="grid grid-cols-2 gap-4 mb-6 bg-gray-50 rounded-xl p-4">
                    <div>
                      <p className="text-[10px] font-bold text-gray-400 uppercase tracking-wider mb-1">Interest Rate</p>
                      <p className="font-bold text-[#2076C7] text-xl">{plan.interest}</p>
                    </div>
                    <div>
                      <p className="text-[10px] font-bold text-gray-400 uppercase tracking-wider mb-1">Processing Fee</p>
                      <p className={`font-semibold text-gray-900 ${plan.fee.length > 25 ? 'text-xs' : 'text-sm'}`} title={plan.fee}>
                        {plan.fee}
                      </p>
                    </div>
                  </div>

                  {/* Action */}
                  <div className="mt-auto">
                    <button className="w-full py-3 bg-gradient-to-r from-[#2076C7] to-[#1CADA3] text-white rounded-xl text-sm font-bold shadow-sm hover:opacity-95 active:scale-95 transition-all flex items-center justify-center gap-2">
                      Buy Now
                    </button>
                  </div>
                </motion.div>
              ))
            ) : (
              /* Empty State */
              <div className="col-span-full py-12 text-center bg-white rounded-2xl border border-gray-200">
                <Database className="w-12 h-12 text-gray-300 mx-auto mb-4" />
                <p className="text-gray-600 mb-2">No banks found</p>
                <button
                  onClick={clearFilters}
                  className="text-[#2076C7] text-sm font-semibold hover:underline"
                >
                  Clear filters
                </button>
              </div>
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
          animation: fadeIn 0.3s ease-out;
        }
      `}</style>
    </div>
  );
}