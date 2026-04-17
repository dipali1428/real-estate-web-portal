"use client";

import { useState, useEffect, useMemo } from "react";
import {
  Search, X, TrendingUp, Shield, Activity, IndianRupee, ChevronRight, Bookmark
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { useModal } from "@/app/context/ModalContext";
import mutualFundService, { AmfiFund, NavEntry } from "../../../../services/mutualfundservice";
import toast from "react-hot-toast";
import customerService from "../../../../services/customerService";

import { TOP_PICKS } from "@/app/products/mutual-funds/components/TopPicks";
import TopPicksSection from "@/app/products/mutual-funds/components/TopPicksSection";
import OrderPlacementModal from "./OrderPlacementModal";
import { Line } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,

  Legend,
  Filler,
} from "chart.js";

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend, Filler);

interface Fund {
  code: number;
  name: string;
  nav: string;
  date: string;
  amc?: string;
  category?: string;
  risk?: string;
}

interface ChartPoint {
  date: string;
  nav: number;
}

type RangeKey = "1Y" | "3Y" | "5Y";

const getAuthToken = () =>
  typeof document !== "undefined"
    ? document.cookie.match(/authToken=([^;]+)/)?.[1] || null
    : null;

export default function ExploreFunds() {
  const { openLogin } = useModal();
  const [searchQuery, setSearchQuery] = useState("");
  const [searchResults, setSearchResults] = useState<AmfiFund[]>([]);
  const [loading, setLoading] = useState(true);
  const [categorizedFunds, setCategorizedFunds] = useState<Record<string, Fund[]>>({});
  const [isSearching, setIsSearching] = useState(false);

  // --- Detail Modal & Chart State ---
  const [selectedFund, setSelectedFund] = useState<Fund | null>(null);
  const [chartData, setChartData] = useState<ChartPoint[]>([]);
  const [isChartLoading, setIsChartLoading] = useState(false);
  const [timeRange, setTimeRange] = useState<RangeKey>("1Y");
  const [calcAmount, setCalcAmount] = useState<number>(10000); // Changed default from 0 to 10000
  const [calcPeriod, setCalcPeriod] = useState<RangeKey>("3Y");

  // --- Order Placement State ---
  const [orderFund, setOrderFund] = useState<Fund | null>(null);
  const [showOrderModal, setShowOrderModal] = useState(false);

  // --- Wishlist State ---
  const [wishlistIds, setWishlistIds] = useState<Set<number>>(new Set());
  const [wishlistLoading, setWishlistLoading] = useState<Set<number>>(new Set());

  // Load existing wishlist on mount
  useEffect(() => {
    const loadWishlist = async () => {
      try {
        const token = getAuthToken();
        if (!token) return;
        const response = await customerService.getMyWishlist();
        if (response.success && response.data) {
          const items = Array.isArray(response.data) ? response.data : [response.data];
          const mfIds = new Set(
            items
              .filter((item: { product_type: string }) => item.product_type === 'mutual_fund')
              .map((item: { product_id: number }) => item.product_id)
          );
          setWishlistIds(mfIds);
        }
      } catch {
        // Silently fail — wishlist is non-critical
      }
    };
    loadWishlist();
  }, []);

  const toggleWishlist = async (fund: Fund) => {
    const token = getAuthToken();
    if (!token) {
      openLogin();
      return;
    }

    if (wishlistLoading.has(fund.code)) return;
    setWishlistLoading((prev) => new Set(prev).add(fund.code));

    try {
      if (wishlistIds.has(fund.code)) {
        // Find the wishlist item ID so we can remove it
        const response = await customerService.getMyWishlist();
        if (response.success && response.data) {
          const items = Array.isArray(response.data) ? response.data : [response.data];
          const match = items.find(
            (item: { product_type: string; product_id: number }) =>
              item.product_type === 'mutual_fund' && item.product_id === fund.code
          );
          if (match) {
            await customerService.removeFromWishlist((match as { id: number }).id);
            setWishlistIds((prev) => {
              const next = new Set(prev);
              next.delete(fund.code);
              return next;
            });
            toast.success('Removed from wishlist');
          }
        }
      } else {
        console.log("Adding to wishlist - Product ID (Scheme Code):", fund.code);
        await customerService.addToWishlist({
          product_type: 'mutual_fund',
          product_id: Number(fund.code),
          product_name: fund.name,
          nav: fund.nav,
          risk: fund.risk,
        });
        setWishlistIds((prev) => new Set(prev).add(fund.code));
        toast.success('Added to wishlist');
      }
    } catch {
      toast.error('Wishlist update failed');
    } finally {
      setWishlistLoading((prev) => {
        const next = new Set(prev);
        next.delete(fund.code);
        return next;
      });
    }
  };

  const handleOpenOrder = (fund: Fund) => {
    setOrderFund(fund);
    setShowOrderModal(true);
  };



  // --- Calculation Helpers ---
  const parseDateString = (dateStr?: string) => {
    if (!dateStr) return new Date();
    const [dd, mm, yyyy] = dateStr.split("/");
    return new Date(`${yyyy}-${mm}-${dd}`);
  };

  const formatINR = (num: number) => num.toLocaleString("en-IN");

  const getFilteredByDate = (data: ChartPoint[], range: RangeKey) => {
    const yearsMap: Record<RangeKey, number> = { "1Y": 1, "3Y": 3, "5Y": 5 };
    const years = yearsMap[range] || 1;
    const today = new Date();
    const pastDate = new Date();
    pastDate.setFullYear(today.getFullYear() - years);
    return data.filter((d) => {
      const [day, month, year] = d.date.split("/");
      const date = new Date(`${year}-${month}-${day}`);
      return date >= pastDate;
    });
  };

  const calculateReturn = (data: ChartPoint[]) => {
    if (data.length < 2) return "--";
    const start = data[0].nav;
    const end = data[data.length - 1].nav;
    return (((end - start) / start) * 100).toFixed(2) + "%";
  };

  const calculateCAGR = (data: ChartPoint[]) => {
    if (data.length < 2) return "--";
    const start = data[0].nav;
    const end = data[data.length - 1].nav;
    const startDate = new Date(data[0].date.split("/").reverse().join("-"));
    const endDate = new Date(data[data.length - 1].date.split("/").reverse().join("-"));
    const years = (endDate.getTime() - startDate.getTime()) / (1000 * 60 * 60 * 24 * 365);
    return years === 0 ? "0.00%" : ((Math.pow(end / start, 1 / years) - 1) * 100).toFixed(2) + "%";
  };

  const sortedChartData = useMemo(() => {
    if (!chartData) return [];
    return [...chartData].sort((a, b) => parseDateString(a.date).getTime() - parseDateString(b.date).getTime());
  }, [chartData]);

  const filteredChartData = useMemo(() => getFilteredByDate(sortedChartData, timeRange), [sortedChartData, timeRange]);

  const dynamicReturn = useMemo(() => {
    return timeRange === "1Y" ? calculateReturn(filteredChartData) : calculateCAGR(filteredChartData);
  }, [filteredChartData, timeRange]);

  const availableCalcPeriods = useMemo(() => {
    if (sortedChartData.length === 0) return [];
    const latestDate = parseDateString(sortedChartData[sortedChartData.length - 1].date);
    const oldestDate = parseDateString(sortedChartData[0].date);
    const diffYears = (latestDate.getTime() - oldestDate.getTime()) / (1000 * 3600 * 24 * 365.25);
    const periods: RangeKey[] = [];
    if (diffYears >= 1) periods.push("1Y");
    if (diffYears >= 3) periods.push("3Y");
    if (diffYears >= 5) periods.push("5Y");
    return periods;
  }, [sortedChartData]);

  const calcResult = useMemo(() => {
    if (sortedChartData.length === 0 || !availableCalcPeriods.includes(calcPeriod)) return null;
    const latestValidNav = sortedChartData[sortedChartData.length - 1].nav;
    const latestDate = parseDateString(sortedChartData[sortedChartData.length - 1].date);
    const yearsMap: Record<RangeKey, number> = { "1Y": 1, "3Y": 3, "5Y": 5 };
    const years = yearsMap[calcPeriod] || 1;
    const targetPastDate = new Date(latestDate);
    targetPastDate.setFullYear(targetPastDate.getFullYear() - years);

    let pastNav = null;
    for (let i = sortedChartData.length - 1; i >= 0; i--) {
      if (parseDateString(sortedChartData[i].date) <= targetPastDate) {
        pastNav = sortedChartData[i].nav;
        break;
      }
    }
    if (!pastNav) return null;
    const growthMulti = latestValidNav / pastNav;
    return {
      finalAmount: Math.round(calcAmount * growthMulti),
      absReturn: ((growthMulti - 1) * 100).toFixed(1),
      cagr: ((Math.pow(growthMulti, 1 / years) - 1) * 100).toFixed(1),
    };
  }, [sortedChartData, calcPeriod, calcAmount, availableCalcPeriods]);

  // --- Initial Data Fetch ---
  useEffect(() => {
    const initData = async () => {
      setLoading(true);
      try {
        const topPickNames = Object.values(TOP_PICKS).flat();
        const allResults = await Promise.all(
          topPickNames.map((name) =>
            mutualFundService.searchFunds(name).then(res => {
              const matches = res.filter(f =>
                f.name.toLowerCase().includes(name.toLowerCase()) &&
                !f.name.toLowerCase().includes('direct')
              );
              const growthMatch = matches.find(f => f.name.toLowerCase().includes('growth'));
              const mainMatch = growthMatch || (matches.length > 0 ? matches[0] : null);
              return mainMatch ? [mainMatch] : [];
            }).catch(() => [])
          )
        );
        const merged = allResults.flat();
        const uniqueFunds = Array.from(new Map(merged.map((fund) => [fund.schemeCode, fund])).values());
        const groups: Record<string, Fund[]> = {};
        Object.entries(TOP_PICKS).forEach(([category, names]) => {
          groups[category] = uniqueFunds
            .filter((fund) =>
              names.some((p) => fund.name.toLowerCase().includes(p.toLowerCase()))
            )
            .map((fund) => ({
              code: Number(fund.schemeCode),
              name: fund.name,
              nav: Number(fund.nav).toFixed(2),
              date: fund.date,
              category: fund.category || category,
              risk: fund.risk || "Moderately High",
            }));
        });
        setCategorizedFunds(groups);
      } catch {
      } finally {
        setLoading(false);
      }
    };
    initData();
  }, []);


  // --- Search Logic ---
  useEffect(() => {
    const timer = setTimeout(async () => {
      if (searchQuery.length >= 3) {
        setIsSearching(true);
        try {
          const data = await mutualFundService.searchFunds(searchQuery);
          const filteredData = data.filter((fund) => !fund.name.toLowerCase().includes('direct'));
          setSearchResults(filteredData.slice(0, 10));
        } catch {
          setSearchResults([]);
        } finally {
          setIsSearching(false);
        }
      } else {
        setSearchResults([]);
      }
    }, 500);
    return () => clearTimeout(timer);
  }, [searchQuery]);


  const handleViewDetails = async (fund: Fund) => {
    setSelectedFund(fund);
    setIsChartLoading(true);
    setChartData([]);
    try {
      const details = await mutualFundService.getFundDetails(fund.code);
      if (details?.data) {
        const history = details.data
          .map((entry: NavEntry) => {
            const [dd, mm, yyyy] = entry.date.split("-");
            return { date: `${dd}/${mm}/${yyyy}`, nav: Number(entry.nav) };
          })
          .reverse();
        setChartData(history);
      }
    } catch {
    } finally {
      setIsChartLoading(false);
    }
  };



  const [showAllCategories, setShowAllCategories] = useState(false);

  return (
    <div className="space-y-10 relative px-1">
      {/* Search Bar */}
      <div className="relative max-w-4xl mx-auto mb-10">
        <div className="relative group">
          <Search className="absolute left-5 top-1/2 -translate-y-1/2 text-gray-400 group-focus-within:text-[#2076C7] transition-colors" size={20} />
          <input
            type="text"
            placeholder="Search by fund name, AMC, or category..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-14 pr-14 py-5 rounded-2xl border border-gray-200 bg-white text-gray-800 placeholder:text-gray-400 focus:outline-none focus:ring-4 focus:ring-[#2076C7]/10 focus:border-[#2076C7] shadow-sm transition-all"
          />
          {searchQuery && (
          <button
  type="button"
  aria-label="Clear search"
  onClick={() => setSearchQuery("")}
  className="absolute right-5 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
>
  <X size={20} />
</button>
          )}
        </div>

        {/* Search Results Dropdown */}
        <AnimatePresence>
          {searchQuery.length >= 3 && (
            <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: 10 }} className="absolute z-[101] w-full mt-3 bg-white rounded-2xl shadow-2xl border border-gray-100 max-h-[450px] overflow-y-auto">
              {isSearching ? (
                <div className="p-10 text-center text-gray-500 font-medium italic">Searching...</div>
              ) : searchResults.length === 0 ? (
                <div className="p-10 text-center text-gray-500 font-medium">No funds found matching &quot;{searchQuery}&quot;</div>
              ) : (
                <div className="divide-y divide-gray-50">
                  {searchResults.map((fund) => {
                    const normalizedFund: Fund = {
                      code: Number(fund.schemeCode),
                      name: fund.name,
                      nav: String(fund.nav || "0"),
                      date: fund.date || "",
                      category: fund.category,
                      risk: fund.risk,
                    };

                    return (
                      <div
                        key={fund.schemeCode}
                        className="p-5 hover:bg-gray-50 cursor-pointer flex items-center justify-between group/row transition-colors"
                        onClick={() => handleViewDetails(normalizedFund)}
                      >
                        <div className="flex-1 flex flex-col gap-1 pr-4">
                          <p className="font-semibold text-gray-800 group-hover/row:text-[#2076C7] transition-colors leading-snug">{fund.name}</p>
                          <span className="text-[11px] text-gray-400 font-semibold uppercase tracking-wider">Code: {fund.schemeCode}</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <ChevronRight size={20} className="text-gray-300 group-hover/row:translate-x-1 transition-transform" />
                        </div>
                      </div>
                    );
                  })}
                </div>
              )}
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Categories */}
      <div className="space-y-16">
        {loading ? (
          <div className="animate-pulse space-y-8">
            <div className="h-10 w-64 bg-gray-200 rounded-lg"></div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {[1, 2, 3].map(i => <div key={i} className="h-80 bg-gray-100 rounded-3xl"></div>)}
            </div>
          </div>
        ) : (
          <div className="space-y-20 pb-16">
            {(showAllCategories ? Object.entries(categorizedFunds) : Object.entries(categorizedFunds).slice(0, 1)).map(([cat, funds]) => (
              <TopPicksSection
                key={cat}
                title={cat.charAt(0).toUpperCase() + cat.slice(1).replace(/cap$/, " Cap") + " Funds"}
                funds={funds}
                renderItem={(fund: Fund) => (
                  <FundCard
                    fund={fund}
                    onViewDetails={() => handleViewDetails(fund)}
                    onInvest={() => handleOpenOrder(fund)}
                    isWishlisted={wishlistIds.has(fund.code)}
                    isWishlistLoading={wishlistLoading.has(fund.code)}
                    onToggleWishlist={() => toggleWishlist(fund)}
                  />
                )}
              />
            ))}

            {/* View All Button */}
            {!showAllCategories && Object.keys(categorizedFunds).length > 1 && (
              <div className="flex justify-center -mt-8">
                <button
                  onClick={() => setShowAllCategories(true)}
                  className="group flex items-center gap-3 px-6 py-3 sm:px-10 sm:py-4 bg-[#2076C7] text-white rounded-full text-sm sm:text-base font-bold shadow-xl hover:shadow-2xl hover:-translate-y-1 transition-all active:scale-95"
                >
                  Explore All Fund Categories
                  <ChevronRight size={20} className="group-hover:translate-x-1 transition-transform" />
                </button>
              </div>
            )}

            {showAllCategories && (
              <div className="flex justify-center -mt-8">
                <button
                  onClick={() => setShowAllCategories(false)}
                  className="group flex items-center gap-3 px-6 py-3 sm:px-10 sm:py-4 bg-white border-2 border-[#2076C7] text-[#2076C7] rounded-full text-sm sm:text-base font-bold hover:bg-blue-50 transition-all active:scale-95 shadow-md"
                >
                  Show Less
                </button>
              </div>
            )}
          </div>
        )}
      </div>

      {/* ORDER PLACEMENT MODAL */}
      <OrderPlacementModal
        isOpen={showOrderModal}
        onClose={() => setShowOrderModal(false)}
        fund={orderFund ? { code: orderFund.code, name: orderFund.name, nav: orderFund.nav } : null}
      />

      {/* DETAIL MODAL */}
      <AnimatePresence>
        {selectedFund && (
          <div className="fixed inset-0 bg-black/70 backdrop-blur-md flex items-end sm:items-center justify-center z-[2000] sm:p-6" onClick={(e) => e.target === e.currentTarget && setSelectedFund(null)}>
            <motion.div initial={{ opacity: 0, y: 100 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: 100 }} className="bg-white w-full sm:rounded-[3rem] rounded-t-[2.5rem] h-[92dvh] sm:h-auto sm:max-h-[90vh] sm:max-w-6xl shadow-2xl overflow-hidden flex flex-col border border-gray-100">

              <div className="bg-white border-b border-gray-100 px-8 py-7 flex items-center justify-between sticky top-0 z-10">
                <div className="flex items-center gap-5">
                  <div className="w-14 h-14 rounded-2xl bg-blue-50 flex items-center justify-center font-black text-2xl text-[#2076C7] shadow-inner">{selectedFund.name.charAt(0)}</div>
                  <div>
                    <h2 className="text-2xl font-bold text-gray-900 leading-tight mb-0.5">{selectedFund.name}</h2>
                    <span className="text-xs font-bold text-[#1CADA3] tracking-[0.2em] uppercase">SCHEME CODE: {selectedFund.code}</span>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <button
                    onClick={() => selectedFund && toggleWishlist(selectedFund)}
                    className={`p-3 rounded-full transition-all ${
                      selectedFund && wishlistIds.has(selectedFund.code)
                        ? 'bg-[#2076C7] text-white hover:bg-blue-700'
                        : 'bg-gray-50 text-gray-400 hover:bg-gray-100 hover:text-[#2076C7]'
                    }`}
                    title={selectedFund && wishlistIds.has(selectedFund.code) ? 'Remove from wishlist' : 'Add to wishlist'}
                  >
                    <Bookmark size={20} className={selectedFund && wishlistIds.has(selectedFund.code) ? 'fill-current' : ''} />
                  </button>
                  <button onClick={() => setSelectedFund(null)} 
                  aria-label="Close details modal"
                  className="p-3 bg-gray-50 rounded-full hover:bg-gray-100 text-gray-400 hover:text-gray-900 transition-all"><X size={24} /></button>
                </div>
              </div>

              <div className="flex-1 overflow-y-auto p-8 bg-gray-50/40 custom-scrollbar">
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
                  <div className="lg:col-span-8 space-y-8">
                    <div className="bg-white p-8 rounded-[2.5rem] border border-gray-100 shadow-sm relative">
                      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 mb-8">
                        <div>
                          <h3 className="text-xl font-bold text-gray-900">Historical Performance</h3>
                          <p className="text-sm text-gray-400 font-semibold">NAV Tracking</p>
                        </div>
                        <div className="flex flex-wrap justify-end gap-2 bg-gray-100/80 p-2 rounded-2xl">
                          {(["1Y", "3Y", "5Y"] as RangeKey[]).map((r) => (
                            <button
                              key={r}
                              onClick={() => setTimeRange(r as RangeKey)}
                              className={`px-3 py-1.5 rounded-xl text-[11px] font-bold transition-all ${timeRange === r ? "bg-[#2076C7] text-white shadow-lg" : "text-gray-400 hover:text-gray-600"}`}
                            >
                              {r}
                            </button>
                          ))}
                        </div>
                      </div>
                      <div className="h-[350px] w-full relative">
                        {isChartLoading ? <div className="absolute inset-0 flex items-center justify-center"><div className="w-10 h-10 border-4 border-[#2076C7] border-t-transparent rounded-full animate-spin"></div></div> :
                          <Line data={{ labels: filteredChartData.map(d => d.date), datasets: [{ label: "NAV", data: filteredChartData.map(d => d.nav), borderColor: "#2076C7", backgroundColor: "rgba(32, 118, 199, 0.08)", fill: true, tension: 0.4, pointRadius: 0, borderWidth: 3 }] }} options={{ responsive: true, maintainAspectRatio: false, plugins: { legend: { display: false }, tooltip: { mode: 'index', intersect: false, padding: 12, bodyFont: { weight: 'bold' } } }, scales: { x: { display: false }, y: { ticks: { font: { weight: 'bold', size: 11 }, color: '#94a3b8' }, grid: { color: '#f1f5f9' } } } }} />
                        }
                      </div>
                    </div>

                    <div className="grid grid-cols-2 sm:grid-cols-4 gap-5">
                      <StatItem icon={Activity} label="Current NAV" value={`₹${selectedFund.nav}`} color="text-blue-600" bg="bg-blue-50" />
                      <StatItem icon={TrendingUp} label={`${timeRange} Return`} value={dynamicReturn} color="text-emerald-600" bg="bg-emerald-50" />
                      <StatItem icon={Shield} label="Risk Profile" value={selectedFund.risk || "Moderately High"} color="text-orange-600" bg="bg-orange-50" />
                      <StatItem icon={IndianRupee} label="Min Invest" value="₹500" color="text-indigo-600" bg="bg-indigo-50" />
                    </div>
                  </div>

                  <div className="lg:col-span-4 space-y-8">
                    {availableCalcPeriods.length > 0 && calcResult && (
                      <div className="bg-white p-8 rounded-[2.5rem] border border-blue-100 shadow-xl shadow-blue-900/5 space-y-6 relative overflow-hidden">
                        <div className="absolute top-0 right-0 w-32 h-32 bg-blue-50/50 rounded-full -mr-16 -mt-16" />
                        <h3 className="font-bold text-gray-900 text-lg relative z-10">Return Calculator</h3>
                        <div className="p-4 bg-gray-50 rounded-2xl border border-gray-100 space-y-1">
                          <span className="text-[10px] font-black text-gray-400 uppercase tracking-widest block">If You Invested:</span>
                          <div className="flex items-center gap-2">
                            <span className="font-black text-xl text-gray-400">₹</span>
                            <input type="number" value={calcAmount} onChange={(e) => setCalcAmount(Number(e.target.value))} 
                            aria-label="Enter investment amount"
                            className="bg-transparent border-none outline-none font-black text-2xl w-full text-gray-900 focus:text-[#2076C7]" />
                          </div>
                        </div>
                        <div className="flex bg-gray-100 p-1.5 rounded-xl">
                          {(["1Y", "3Y", "5Y"] as RangeKey[]).map((period) => availableCalcPeriods.includes(period) && (
                            <button key={period} onClick={() => setCalcPeriod(period)} className={`flex-1 py-2 rounded-lg text-xs font-black transition-all ${calcPeriod === period ? "bg-white text-[#2076C7] shadow-sm scale-105" : "text-gray-400"}`}>{period}</button>
                          ))}
                        </div>
                        <div className="pt-6 border-t border-gray-100">
                          <div className="text-[11px] font-black text-gray-400 uppercase tracking-wider mb-1">Estimated Value:</div>
                          <div className="text-4xl font-black text-emerald-600 mb-2">₹{formatINR(calcResult.finalAmount)}</div>
                          <div className="flex items-center gap-2">
                            <span className="px-2 py-0.5 bg-emerald-50 text-emerald-600 text-[10px] font-black rounded-md">+{calcResult.absReturn}% ABS</span>
                            <span className="px-2 py-0.5 bg-blue-50 text-blue-600 text-[10px] font-black rounded-md">{calcResult.cagr}% CAGR</span>
                          </div>
                        </div>
                      </div>)}
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      <style jsx>{`
        .custom-scrollbar::-webkit-scrollbar { width: 6px; }
        .custom-scrollbar::-webkit-scrollbar-thumb { background: #e2e8f0; border-radius: 10px; }
        .custom-scrollbar::-webkit-scrollbar-thumb:hover { background: #cbd5e1; }
      `}</style>
    </div>
  );
}

interface StatItemProps {
  icon: typeof Activity;
  label: string;
  value: string;
  color: string;
  bg: string;
}

function StatItem({ icon: Icon, label, value, color, bg }: StatItemProps) {
  return (
    <div className="bg-white p-5 rounded-[2rem] border border-gray-100 shadow-sm text-center flex flex-col items-center justify-center group hover:border-blue-100 transition-colors">
      <div className={`w-12 h-12 ${bg} ${color} rounded-2xl flex items-center justify-center mb-3 group-hover:scale-110 transition-transform`}>
        <Icon size={22} />
      </div>
      <div className="text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-1.5">{label}</div>
      <div className="text-sm font-bold text-gray-900 leading-tight">{value}</div>
    </div>
  );
}

interface FundCardProps {
  fund: Fund;
  onViewDetails: () => void;
  onInvest: () => void;
  isWishlisted?: boolean;
  isWishlistLoading?: boolean;
  onToggleWishlist?: () => void;
}

function FundCard({ fund, onViewDetails, onInvest, isWishlisted, isWishlistLoading, onToggleWishlist }: FundCardProps) {
  return (
    <motion.div className="bg-white rounded-[1.75rem] shadow-md border border-gray-100 hover:border-[#2076C7] hover:shadow-xl transition-all p-4 sm:p-6 flex flex-col h-full group w-full relative">

      {/* Wishlist Bookmark Button */}
      {onToggleWishlist && (
        <button
          onClick={(e) => { e.stopPropagation(); onToggleWishlist(); }}
          disabled={isWishlistLoading}
          className={`absolute top-3 right-3 p-2 rounded-xl transition-all z-10 ${
            isWishlisted
              ? 'bg-[#2076C7] text-white shadow-lg hover:bg-blue-700'
              : 'bg-gray-50 text-gray-400 hover:bg-blue-50 hover:text-[#2076C7]'
          } ${isWishlistLoading ? 'opacity-50 cursor-wait' : ''}`}
          title={isWishlisted ? 'Remove from wishlist' : 'Add to wishlist'}
        >
          <Bookmark size={18} className={isWishlisted ? 'fill-current' : ''} />
        </button>
      )}

      <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-[1.5rem] bg-gradient-to-br from-blue-50 to-indigo-50 flex items-center justify-center mb-5 sm:mb-6 mx-auto group-hover:scale-105 transition-transform shadow-inner">
        <span className="text-2xl sm:text-3xl font-bold text-[#2076C7]">{fund.name.charAt(0)}</span>
      </div>

      <div className="min-h-[3.5rem] mb-3 sm:mb-4">
        <h3 className="text-sm sm:text-base font-bold text-center text-gray-900 line-clamp-2 leading-tight">{fund.name}</h3>
      </div>

      <div className="flex flex-col items-center py-3 sm:py-4 bg-gray-50 rounded-2xl mb-5 sm:mb-6 group-hover:bg-blue-50/50 transition-colors">
        <span className="text-[9px] sm:text-[10px] text-gray-400 font-bold uppercase tracking-widest mb-1">Current NAV</span>
        <span className="text-xl sm:text-2xl font-bold text-[#2076C7]">₹{fund.nav}</span>
      </div>

      <div className="space-y-3 mt-auto">
        <button
          onClick={(e) => { e.stopPropagation(); onInvest(); }}
          className="w-full py-2.5 sm:py-3 bg-white border-2 border-[#1CADA3] text-[#1CADA3] text-[11px] sm:text-xs font-bold rounded-lg hover:bg-teal-50 transition-all tracking-wider uppercase flex items-center justify-center gap-2"
        >
          <TrendingUp size={16} /> Invest Now
        </button>
        <button
          onClick={onViewDetails}
          className="w-full py-2.5 sm:py-3 border-2 border-[#2076C7]/10 text-[#2076C7] text-[11px] sm:text-xs font-bold rounded-xl hover:bg-blue-50 hover:border-[#2076C7] transition-all tracking-widest uppercase"
        >
          View Details
        </button>
      </div>
    </motion.div>
  );
}
