"use client";
import { useState, useMemo } from "react";
import HomeLoanForm from "../../../../dashboard/leadmanagement/forms/homeloanform";
import { Search, Filter, Landmark, Percent, ArrowDownSquare, X, ShieldCheck, Database, FileText } from "lucide-react";
import { categorizedPlans } from "../loanConstants";
import { motion, AnimatePresence } from "framer-motion";
import { HomeLoanService, HomeLoanPlan } from "../../../../services/homeLoanServices";
import { useEffect } from "react";
import toast from "react-hot-toast";
export default function ExploreHomeLoans({ activeTab, setActiveTab }: { activeTab: string, setActiveTab: (tab: "explore" | "applications") => void }) {
  const [showForm, setShowForm] = useState(false);
  const [apiPlans, setApiPlans] = useState<HomeLoanPlan[]>([]);

  const [searchTerm, setSearchTerm] = useState("");
  const [showFilters, setShowFilters] = useState(false);
  const [sortBy, setSortBy] = useState("default");
  useEffect(() => {

    const fetchApiPlans = async () => {
      try {
        const data = await HomeLoanService.getPublicHomeLoanPlans();
        if (data && data.length > 0) {
          setApiPlans(data);
        }
     } catch (err: any) {
    toast.error(
        err?.response?.data?.message || 
        "Failed to fetch home loan plans"
    );
}
    };
    fetchApiPlans();
  }, []);
  // Combine API plans with local fallback if no API data for the category

  const initialBanks = useMemo(() => {
    // Show all API plans if they exist
    if (apiPlans.length > 0) {
      return apiPlans.map(p => ({
        bank: p.bank_name,
        category: p.category,
        interest: p.interest_rate,
        fee: p.processing_fee,
        benefits: p.benefits,
        color: p.color
      }));
    }

    // fallback to constants ONLY if the database is empty
    return Object.values(categorizedPlans).flat();
  }, [apiPlans]);

  // Use useMemo instead of useEffect for filtering - Derived state
  const filteredBanks = useMemo(() => {
    let filtered = [...initialBanks];
    // Apply search
    if (searchTerm.trim()) {
      filtered = filtered.filter(plan =>
        plan.bank.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }
    // Apply Sorting
    if (sortBy === "rate-asc") {
      filtered.sort((a, b) => (parseFloat(a.interest) || 0) - (parseFloat(b.interest) || 0));
    } else if (sortBy === "rate-desc") {
      filtered.sort((a, b) => (parseFloat(b.interest) || 0) - (parseFloat(a.interest) || 0));
    } else if (sortBy === "name-asc") {
      filtered.sort((a, b) => a.bank.localeCompare(b.bank));
    }
    return filtered;
  }, [searchTerm, sortBy, initialBanks]);
  const clearFilters = () => {
    setSearchTerm("");
    setSortBy("default");
    setShowFilters(false);
  };
  // ========== CALCULATE STATS ==========
  const totalBanks = initialBanks.length;
  const parseRate = (rateStr: string) => parseFloat(rateStr.replace(/[^\d.]/g, '')) || 0;
  const avgRate = totalBanks > 0
    ? (initialBanks.reduce((sum, p) => sum + parseRate(p.interest), 0) / totalBanks).toFixed(2) + '%'
    : 'N/A';
  const lowestRate = totalBanks > 0
    ? Math.min(...initialBanks.map(p => parseRate(p.interest))).toFixed(2) + '%'
    : 'N/A';
  const activeFilterCount = searchTerm ? 1 : 0;

  return (
    <div className="animate-fadeIn pb-12">
      {/* Main Content */}

      {/* --- NEW MODERN HEADER --- */}
      <motion.div
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
        className="relative bg-white rounded-2xl p-6 mb-6 shadow-sm border border-slate-100/60 mt-4"
      >
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-xl bg-gradient-to-r from-[#2076C7] to-[#1CADA3] flex items-center justify-center text-white font-bold text-xl shadow-lg shrink-0">
              <Landmark size={24} />
            </div>
            <div>
              <div className="flex items-center gap-3 mb-1">
                <h2 className="text-xl sm:text-2xl font-bold text-slate-800">
                  Home Loans
                </h2>
                <span className="px-2.5 py-1 bg-emerald-100 text-emerald-700 text-[10px] font-bold rounded-full border border-emerald-200 whitespace-nowrap">
                  {totalBanks} Partners
                </span>
              </div>
              <p className="text-sm text-slate-500 flex items-center gap-2">
                <FileText size={14} className="text-[#2076C7]" />
                Compare and apply for the best partner bank offers
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
                  <motion.div
                    layoutId="activeTabExplore"
                    className="absolute inset-0 bg-gradient-to-r from-[#2076C7] to-[#1CADA3] rounded-full -z-10 shadow-sm"
                    transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
                  />
                )}
                <Landmark size={14} />
                <span>Offers</span>
              </button>
              <button
                onClick={() => setActiveTab('applications')}
                className={`relative px-3 md:px-5 py-1.5 md:py-2 rounded-full text-[10px] md:text-xs font-bold uppercase tracking-wider transition-all duration-300 z-10 flex items-center gap-1.5 shrink-0 ${activeTab === 'applications' ? 'text-white' : 'text-slate-500 hover:text-slate-700'}`}
              >
                {activeTab === 'applications' && (
                  <motion.div
                    layoutId="activeTabExplore"
                    className="absolute inset-0 bg-gradient-to-r from-[#2076C7] to-[#1CADA3] rounded-full -z-10 shadow-sm"
                    transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
                  />
                )}
                <FileText size={14} />
                <span>Policies</span>
              </button>
            </div>
          </div>
        </div>
      </motion.div>
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
                      style={{ backgroundColor: `var(--${plan.color}-50, #F8FAFC)`, color: plan.color === 'peacock-green' ? '#1CADA3' : '#2076C7' }}
                    >
                      <Landmark size={24} />
                    </div>
                    <div>
                      <div className="font-bold text-gray-900 text-lg leading-tight">
                        {plan.bank}
                      </div>
                      <div className="flex items-center gap-2 mt-1">
                      <span className="px-2 py-0.5 bg-slate-100 text-slate-600 text-[10px] font-bold rounded uppercase tracking-wider border border-slate-200">
                        {plan.category || 'General'}
                      </span>
                    </div>
                    <div className="text-xs text-gray-500 flex items-center gap-1 mt-1">
                        <ShieldCheck size={12} className="text-emerald-500" />
                        <span className="truncate max-w-[150px]" title={plan.benefits[0]}>{plan.benefits[0]}</span>
                      </div>
                    </div>
                  </div>
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
                <div className="mt-auto">
                  <button
                    onClick={() => setShowForm(true)}
                    className="w-full py-3 bg-gradient-to-r from-[#2076C7] to-[#1CADA3] text-white rounded-xl text-sm font-bold shadow-sm hover:opacity-95 active:scale-95 transition-all flex items-center justify-center gap-2"
                  >
                    Apply Now
                  </button>
                </div>
              </motion.div>
            ))
          ) : (
            /* Empty State */
            (<div className="col-span-full py-12 text-center bg-white rounded-2xl border border-gray-200">
              <Database className="w-12 h-12 text-gray-300 mx-auto mb-4" />
              <p className="text-gray-600 mb-2">No banks found</p>
              <button
                onClick={clearFilters}
                className="text-[#2076C7] text-sm font-semibold hover:underline"
              >
                Clear filters
              </button>
            </div>)
          )}
        </AnimatePresence>
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
      {showForm && <HomeLoanForm onClose={() => setShowForm(false)} />}
    </div>
  );
}