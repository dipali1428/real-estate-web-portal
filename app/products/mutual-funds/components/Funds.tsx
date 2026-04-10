"use client";
import { useState, useEffect, useMemo } from "react";
import { useModal } from "../../../context/ModalContext";
import mutualFundService, { AmfiFund, FundDetails } from "@/app/services/mutualfundservice";
import { Search, X, Package, BarChart3, TrendingUp, Shield, Activity, Calendar, IndianRupee } from "lucide-react";
import { TOP_PICKS as TOP_PICKS_DATA } from "./TopPicks";
import TopPicksSection from "./TopPicksSection";
import { AnimatePresence, motion } from "framer-motion";
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

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  Filler
);

// ---------- Types ----------
interface FundCard {
  schemeCode: string;
  name: string;
  nav: string | null;
  navDate: string | null;
  fundHouse: string;
  category: string;
  type: string;
  risk: string;
}

interface ChartPoint {
  date: string; // "DD/MM/YYYY"
  nav: number;
}

// ---------- Helpers ----------
const unique = (arr: FundCard[]) =>
  Array.from(new Map(arr.map((f) => [f.schemeCode, f])).values());

const parseDateString = (dateStr?: string): Date => {
  if (!dateStr) return new Date();
  const [dd, mm, yyyy] = dateStr.split("/");
  return new Date(`${yyyy}-${mm}-${dd}`);
};

const formatINR = (num: number) => num.toLocaleString("en-IN");

const getRiskColors = (risk: string) => {
  switch (risk) {
    case "Very High": return "bg-red-50 text-red-600 border-red-100/50";
    case "High": return "bg-orange-50 text-orange-600 border-orange-100/50";
    case "Moderate to High": return "bg-yellow-50 text-yellow-600 border-yellow-100/50";
    case "Moderate": return "bg-emerald-50 text-emerald-600 border-emerald-100/50";
    default: return "bg-blue-50 text-blue-600 border-blue-100/50";
  }
};

const getStatRiskColors = (risk: string) => {
  switch (risk) {
    case "Very High": return { color: "text-red-600", bg: "bg-red-50" };
    case "High": return { color: "text-orange-600", bg: "bg-orange-50" };
    case "Moderate to High": return { color: "text-yellow-600", bg: "bg-yellow-50" };
    case "Moderate": return { color: "text-emerald-600", bg: "bg-emerald-50" };
    default: return { color: "text-blue-600", bg: "bg-blue-50" };
  }
};

const getFilteredByDate = (data: ChartPoint[], range: string): ChartPoint[] => {
  const yearsMap: Record<string, number> = { "1Y": 1, "3Y": 3, "5Y": 5 };
  const years = yearsMap[range] || 1;
  const pastDate = new Date();
  pastDate.setFullYear(pastDate.getFullYear() - years);
  return data.filter((d) => parseDateString(d.date) >= pastDate);
};

const calculateReturn = (data: ChartPoint[]): string => {
  if (data.length < 2) return "--";
  const start = data[0].nav;
  const end = data[data.length - 1].nav;
  const roi = ((end - start) / start) * 100;
  return (roi > 0 ? "+" : "") + roi.toFixed(2) + "%";
};

const calculateCAGR = (data: ChartPoint[]): string => {
  if (data.length < 2) return "--";
  const start = data[0].nav;
  const end = data[data.length - 1].nav;
  const startDate = parseDateString(data[0].date);
  const endDate = parseDateString(data[data.length - 1].date);
  const years = (endDate.getTime() - startDate.getTime()) / (1000 * 60 * 60 * 24 * 365);
  if (years === 0) return "0.00%";
  const cagr = (Math.pow(end / start, 1 / years) - 1) * 100;
  return (cagr > 0 ? "+" : "") + cagr.toFixed(2) + "%";
};

// ---------- Component ----------
export default function Funds() {
  const { openLogin } = useModal();

  // Fund lists
  const [funds, setFunds] = useState<FundCard[]>([]);
  const [userFunds, setUserFunds] = useState<FundCard[]>([]);

  // Search
  const [searchQuery, setSearchQuery] = useState("");
  const [searchResults, setSearchResults] = useState<AmfiFund[]>([]);
  const [isSearching, setIsSearching] = useState(false);

  // Error state
  const [loadError, setLoadError] = useState<string | null>(null);

  // Detail modal
  const [selectedFund, setSelectedFund] = useState<FundCard | null>(null);
  const [chartData, setChartData] = useState<ChartPoint[]>([]);
  const [isChartLoading, setIsChartLoading] = useState(false);
  const [chartError, setChartError] = useState<string | null>(null);
  const [timeRange, setTimeRange] = useState<"1Y" | "3Y" | "5Y">("1Y");

  // Calculator
  const [calcAmount, setCalcAmount] = useState<number>(10000);
  const [calcPeriod, setCalcPeriod] = useState<string>("3Y");

  const TOP_PICKS_NAMES = useMemo(() => Object.values(TOP_PICKS_DATA).flat(), []);

  // ---------- Load top-pick funds via backend ----------
  useEffect(() => {
    const loadFunds = async () => {
      setLoadError(null);
      try {
        // Fetch all top picks by their specific names to ensure visibility
        // We do this in chunks to avoid overwhelming the backend
        const allResults = await Promise.all(
          TOP_PICKS_NAMES.map((name) => 
            mutualFundService.searchFunds(name).then(res => 
              res.filter(f => f.name.toLowerCase().includes(name.toLowerCase()))
            ).catch(() => [])
          )
        );
        
        const merged = allResults.flat();

        const filtered: FundCard[] = merged.map((f) => ({
          schemeCode: f.schemeCode,
          name: f.name,
          nav: f.nav ? "₹" + Number(f.nav).toFixed(2) : null,
          navDate: f.date ?? null,
          fundHouse: f.fundHouse ?? "",
          category: f.category ?? "",
          type: f.type ?? "",
          risk: f.risk ?? "",
        }));

        setFunds(unique(filtered));
      } catch {
        setLoadError("Failed to load funds. Please try again later.");
      }
    };
    loadFunds();
  }, [TOP_PICKS_NAMES]);

  // ---------- Search with debounce ----------
  useEffect(() => {
    if (!searchQuery || searchQuery.length < 2) {
      setSearchResults([]);
      return;
    }
    const timer = setTimeout(async () => {
      setIsSearching(true);
      try {
        const results = await mutualFundService.searchFunds(searchQuery);
        setSearchResults(results.slice(0, 8));
      } catch {
        setSearchResults([]);
      } finally {
        setIsSearching(false);
      }
    }, 300);
    return () => clearTimeout(timer);
  }, [searchQuery]);

  // ---------- Add fund from search ----------
  const addFund = (fund: AmfiFund) => {
    if (userFunds.some((f) => f.schemeCode === fund.schemeCode)) return;
    const newFund: FundCard = {
      schemeCode: fund.schemeCode,
      name: fund.name,
      nav: fund.nav ? "₹" + Number(fund.nav).toFixed(2) : null,
      navDate: fund.date ?? null,
      fundHouse: fund.fundHouse ?? "",
      category: fund.category ?? "",
      type: fund.type ?? "",
      risk: fund.risk ?? "",
    };
    setUserFunds((prev) => unique([newFund, ...prev]));
    setSearchQuery("");
    setSearchResults([]);
  };

  // ---------- View Details ----------
  const viewDetails = async (fund: FundCard) => {
    setSelectedFund(fund);
    setIsChartLoading(true);
    setChartData([]);
    setChartError(null);
    // Reset calculator state for the new fund
    setCalcAmount(10000);
    setCalcPeriod("3Y");
    try {
      const details = await mutualFundService.getFundDetails(fund.schemeCode);
      if (!details || !details.data || !Array.isArray(details.data)) {
        setChartError("No historical data available for this fund.");
        return;
      }
      const history: ChartPoint[] = details.data
        .map((d) => {
          const [dd, mm, yyyy] = d.date.split("-");
          return { date: `${dd}/${mm}/${yyyy}`, nav: Number(d.nav) };
        })
        .reverse();
      setChartData(history);
    } catch {
      setChartError("Could not load fund performance data.");
    } finally {
      setIsChartLoading(false);
    }
  };

  // Escape key closes modal
  useEffect(() => {
    if (!selectedFund) return;
    const handleEsc = (e: KeyboardEvent) => { if (e.key === "Escape") setSelectedFund(null); };
    window.addEventListener("keydown", handleEsc);
    return () => window.removeEventListener("keydown", handleEsc);
  }, [selectedFund]);

  // ---------- Chart derivations ----------
  const sortedChartData = useMemo(() =>
    [...chartData].sort((a, b) => parseDateString(a.date).getTime() - parseDateString(b.date).getTime()),
    [chartData]
  );

  const filteredChartData = useMemo(
    () => getFilteredByDate(sortedChartData, timeRange),
    [sortedChartData, timeRange]
  );

  const dynamicReturn = useMemo(() => {
    if (timeRange === "1Y") return calculateReturn(filteredChartData);
    return calculateCAGR(filteredChartData);
  }, [filteredChartData, timeRange]);

  // ---------- Calculator ----------
  const availableCalcPeriods = useMemo(() => {
    if (!sortedChartData.length) return [];
    const periods: string[] = [];
    const latest = parseDateString(sortedChartData[sortedChartData.length - 1].date);
    const oldest = parseDateString(sortedChartData[0].date);
    const diffYears = (latest.getTime() - oldest.getTime()) / (1000 * 3600 * 24 * 365.25);
    if (diffYears >= 1) periods.push("1Y");
    if (diffYears >= 3) periods.push("3Y");
    if (diffYears >= 5) periods.push("5Y");
    return periods;
  }, [sortedChartData]);

  useEffect(() => {
    if (availableCalcPeriods.length > 0 && !availableCalcPeriods.includes(calcPeriod)) {
      setCalcPeriod(availableCalcPeriods.includes("3Y") ? "3Y" : availableCalcPeriods[0]);
    }
  }, [availableCalcPeriods, calcPeriod]);

  const calcResult = useMemo(() => {
    if (!sortedChartData.length || !availableCalcPeriods.includes(calcPeriod)) return null;
    const latestNav = sortedChartData[sortedChartData.length - 1].nav;
    const latestDate = parseDateString(sortedChartData[sortedChartData.length - 1].date);
    const yearsMap: Record<string, number> = { "1Y": 1, "3Y": 3, "5Y": 5 };
    const years = yearsMap[calcPeriod] || 1;
    const targetPast = new Date(latestDate);
    targetPast.setFullYear(targetPast.getFullYear() - years);

    let pastNav: number | null = null;
    for (let i = sortedChartData.length - 1; i >= 0; i--) {
      if (parseDateString(sortedChartData[i].date) <= targetPast) {
        pastNav = sortedChartData[i].nav;
        break;
      }
    }
    if (!pastNav) return null;

    const growthMulti = latestNav / pastNav;
    const finalAmount = calcAmount * growthMulti;
    const absReturn = (growthMulti - 1) * 100;
    const cagr = years > 0 ? (Math.pow(growthMulti, 1 / years) - 1) * 100 : 0;

    return {
      finalAmount: Math.round(finalAmount),
      absReturn: absReturn.toFixed(1),
      cagr: cagr.toFixed(1),
    };
  }, [sortedChartData, calcPeriod, calcAmount, availableCalcPeriods]);

  // ---------- Categorised top picks ----------
  const categorizedTopPicks = useMemo(() => {
    const categories: Record<string, FundCard[]> = {};
    Object.keys(TOP_PICKS_DATA).forEach((catId) => {
      const fundNamesInCat = (TOP_PICKS_DATA as any)[catId].map((n: string) => n.toLowerCase());
      categories[catId] = funds.filter((f) =>
        fundNamesInCat.some((name: string) => f.name.toLowerCase().includes(name))
      );
    });
    return categories;
  }, [funds]);

  const sortedCategoryKeys = ["midcap", "smallcap", "largecap", "elss", "flexicap", "multicap", "idcw"];

  const getCategoryTitle = (catId: string) => ({
    midcap: "Mid Cap Funds",
    smallcap: "Small Cap Funds",
    largecap: "Large Cap Funds",
    elss: "ELSS Tax Saver Funds",
    flexicap: "Flexi Cap Funds",
    multicap: "Multi Cap Funds",
    idcw: "Dividend / Income Funds",
  }[catId] ?? "Other Funds");

  // ---------- Fund Card ----------
  const fundCard = (fund: FundCard) => (
    <motion.div
      key={fund.schemeCode}
      layout
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      className="bg-white rounded-2xl shadow-md border border-gray-100 hover:border-[#2076C7] transition-all duration-300 hover:shadow-xl p-3 sm:p-4 flex flex-col h-full group w-full mx-auto"
    >
      <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-2xl bg-gradient-to-br from-blue-50 to-indigo-50 flex items-center justify-center mb-2 sm:mb-3 border-2 border-white shadow-sm mx-auto group-hover:scale-105 transition-transform">
        <span className="text-base sm:text-lg font-bold bg-gradient-to-br from-[#2076C7] to-[#1CADA3] bg-clip-text text-transparent">
          {fund.name.charAt(0)}
        </span>
      </div>

      <div className="flex flex-col items-center text-center mb-2 w-full flex-1">
        <h3 className="text-xs sm:text-[13px] font-bold text-gray-900 line-clamp-2 min-h-[32px] mb-1 px-1 w-full leading-tight">
          {fund.name}
        </h3>
        <div className="flex flex-wrap items-center justify-center gap-1.5 sm:gap-2 px-1">
          {fund.category && (
            <span className="px-2 py-1 bg-blue-50 text-[#2076C7] text-[10px] sm:text-xs font-bold rounded uppercase border border-blue-100/50">
              {fund.category}
            </span>
          )}
          {fund.type && (
            <span className="px-2 py-1 bg-emerald-50 text-[#1CADA3] text-[10px] sm:text-xs font-bold rounded uppercase border border-emerald-100/50">
              {fund.type.split(" • ")[1]}
            </span>
          )}
          {fund.risk && (
            <span className={`px-2 py-1 text-[10px] sm:text-xs font-bold rounded uppercase border ${getRiskColors(fund.risk)}`}>
              {fund.risk} Risk
            </span>
          )}
        </div>
      </div>

      <div className="flex flex-col items-center text-center mb-3 w-full py-1.5 bg-gray-50/50 rounded-2xl border border-gray-50">
        <div className="text-[9px] text-gray-400 font-bold uppercase tracking-[0.2em] mb-0.5">
          Current NAV
        </div>
        <div className="text-xl sm:text-2xl font-bold text-[#2076C7] tracking-tight">
          {fund.nav ?? "—"}
        </div>
        <div className="text-[9px] text-gray-400 font-bold mt-1 flex items-center gap-1">
          <Calendar size={10} /> As on {fund.navDate ?? "—"}
        </div>
      </div>

      <div className="flex flex-col gap-1.5 w-full mt-auto">
        <button
          onClick={openLogin}
          className="w-full py-2 bg-gradient-to-r from-[#2076C7] to-[#1CADA3] text-white text-[10px] sm:text-xs font-bold rounded-xl shadow-md hover:shadow-lg hover:opacity-95 transition-all flex items-center justify-center gap-2"
        >
          Invest Now
        </button>
        <button
          onClick={() => viewDetails(fund)}
          className="w-full py-2 border-2 border-[#2076C7] text-[#2076C7] text-[10px] sm:text-xs font-bold rounded-xl hover:bg-blue-50 transition-all flex items-center justify-center gap-2 group/btn"
        >
          <BarChart3 size={14} className="group-hover/btn:scale-110 transition-transform" />
          View Details
        </button>
      </div>
    </motion.div>
  );

  // ---------- Render ----------
  return (
    <div id="popular" className="min-h-screen bg-gradient-to-br from-gray-50 to-white pb-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 sm:py-16">
        <header className="mb-12 text-center">
      
          <h2 className="text-3xl md:text-4xl font-bold mb-3 bg-gradient-to-r from-[#2076C7] to-[#1CADA3] bg-clip-text text-transparent drop-shadow-sm px-2 uppercase tracking-tight">
            Mutual Fund Marketplace
          </h2>
          <div className="w-24 h-1 mx-auto bg-gradient-to-r from-[#2076C7] to-[#1CADA3] rounded-full mb-6"></div>
      
        </header>

        {/* Load error */}
        {loadError && (
          <div className="max-w-2xl mx-auto mb-8 p-4 bg-red-50 border border-red-100 rounded-2xl text-red-600 text-sm font-medium text-center">
            {loadError}
          </div>
        )}

        {/* Search */}
        <div className="max-w-2xl mx-auto mb-10 sm:mb-12 relative z-[100]">
          <div className="relative group">
            <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
              {isSearching
                ? <div className="w-4 h-4 border-2 border-[#2076C7] border-t-transparent rounded-full animate-spin" />
                : <Search className="h-5 w-5 text-gray-400 group-focus-within:text-[#2076C7] transition-colors" />
              }
            </div>
            <input
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search by fund name, AMC or scheme..."
              className="block w-full pl-12 pr-12 py-3.5 sm:py-4 text-sm sm:text-base text-gray-900 border-2 border-gray-200 rounded-xl focus:border-[#2076C7] focus:ring-4 focus:ring-[#2076C7]/5 outline-none transition-all shadow-sm hover:shadow-md bg-white placeholder-gray-500"
            />
            {searchQuery && (
              <button
                onClick={() => { setSearchQuery(""); setSearchResults([]); }}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-red-500 transition-colors p-2"
              >
                <X size={18} />
              </button>
            )}
          </div>
          <p className="text-xs text-gray-500 text-center mt-2">
            Search by fund name, AMC or scheme. Press Enter or click Apply Filters.
          </p>

          <AnimatePresence>
            {searchResults.length > 0 && (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 10 }}
                className="absolute w-full bg-white border border-gray-100 rounded-2xl mt-2 shadow-2xl overflow-y-auto max-h-[60vh]"
              >
                {searchResults.map((fund) => (
                  <button
                    key={fund.schemeCode}
                    onClick={() => addFund(fund)}
                    className="w-full text-left px-4 sm:px-5 py-3 sm:py-4 hover:bg-gray-50 flex items-center justify-between group border-b border-gray-50 last:border-0"
                  >
                    <div className="flex-1 min-w-0 pr-3 sm:pr-4">
                      <div className="font-bold text-gray-900 text-sm sm:text-base truncate group-hover:text-[#2076C7] transition-colors">
                        {fund.name}
                      </div>
                      <div className="text-xs text-gray-500 mt-1">
                        {fund.fundHouse} · {fund.category}
                      </div>
                    </div>
                    <div className="text-right flex-shrink-0">
                      <div className="text-sm sm:text-base font-bold text-[#1CADA3]">
                        ₹{Number(fund.nav || 0).toFixed(2)}
                      </div>
                    </div>
                  </button>
                ))}
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        <div className="space-y-12 sm:space-y-16">
          {/* User selected funds */}
          {userFunds.length > 0 && (
            <div className="space-y-6 sm:space-y-8 mb-12 sm:mb-16">
              <div className="flex flex-col items-center gap-4 mb-10">
                <div className="p-2.5 sm:p-3 bg-emerald-50 rounded-xl sm:rounded-2xl text-[#1CADA3]">
                  <Search size={24} />
                </div>
                <h2 className="text-xl sm:text-2xl font-bold text-center bg-gradient-to-r from-[#2076C7] to-[#1CADA3] bg-clip-text text-transparent">
                  Your Selected Funds
                </h2>
                <div className="w-16 h-1 bg-gradient-to-r from-[#2076C7] to-[#1CADA3] rounded-full" />
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6 sm:gap-8">
                {userFunds.map((fund) => fundCard(fund))}
              </div>
            </div>
          )}

          {/* Category sections */}
          <div className="space-y-12 sm:space-y-16">
            {sortedCategoryKeys.map((catId) => {
              const fundsToRender = categorizedTopPicks[catId] || [];
              if (!fundsToRender.length) return null;
              return (
                <div key={catId}>
                  <TopPicksSection
                    title={getCategoryTitle(catId)}
                    funds={fundsToRender}
                    renderItem={(fund) => fundCard(fund as FundCard)}
                  />
                </div>
              );
            })}
          </div>

          {/* Empty state */}
          {funds.length === 0 && !loadError && (
            <div className="text-center py-16 sm:py-20 px-4 bg-gray-50 rounded-3xl border-2 border-dashed border-gray-200">
              <Package className="w-10 h-10 sm:w-12 sm:h-12 text-gray-300 mx-auto mb-4" />
              <p className="text-sm sm:text-base text-gray-500 font-medium">
                Loading funds...
              </p>
            </div>
          )}
        </div>
      </div>

      {/* Detail Modal */}
      <AnimatePresence>
        {selectedFund && (
          <div
            className="fixed inset-0 bg-black/70 backdrop-blur-sm flex items-end sm:items-center justify-center z-[2000] sm:p-4"
            onClick={(e) => { if (e.target === e.currentTarget) setSelectedFund(null); }}
          >
            <motion.div
              initial={{ opacity: 0, y: "100%", scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: "100%", scale: 0.95 }}
              transition={{ type: "spring", bounce: 0, duration: 0.4 }}
              className="bg-white w-full sm:rounded-[2.5rem] rounded-t-[2rem] h-[90dvh] sm:h-auto sm:max-h-[90vh] sm:max-w-6xl shadow-2xl overflow-hidden flex flex-col border border-gray-100"
            >
              {/* Modal Header */}
              <div className="bg-white border-b border-gray-100 p-4 sm:p-6 lg:p-8 flex items-start sm:items-center justify-between gap-4 sticky top-0 z-10">
                <div className="flex items-center gap-3 sm:gap-4 flex-1">
                  <div className="w-10 h-10 sm:w-12 sm:h-12 flex-shrink-0 rounded-xl bg-blue-50 flex items-center justify-center font-bold text-lg sm:text-xl text-[#2076C7]">
                    {selectedFund.name.charAt(0)}
                  </div>
                  <div>
                    <h2 className="text-lg sm:text-2xl font-bold text-gray-900 leading-tight line-clamp-2">
                      {selectedFund.name}
                    </h2>
                    <div className="flex flex-wrap gap-2 mt-1 sm:mt-2">
                      <span className="text-[10px] sm:text-xs font-bold text-gray-400 uppercase tracking-widest">
                        {selectedFund.category}
                      </span>
                      <span className="text-[10px] sm:text-xs font-bold text-gray-300 hidden sm:inline">•</span>
                      <span className="text-[10px] sm:text-xs font-bold text-[#1CADA3] uppercase tracking-widest">
                        {selectedFund.schemeCode}
                      </span>
                    </div>
                  </div>
                </div>
                <button
                  onClick={() => setSelectedFund(null)}
                  className="p-2 sm:p-3 bg-gray-50 hover:bg-gray-100 rounded-full sm:rounded-2xl transition-colors text-gray-400 hover:text-gray-600 flex-shrink-0"
                >
                  <X size={20} />
                </button>
              </div>

              {/* Modal Body */}
              <div className="flex-1 overflow-y-auto p-4 sm:p-6 lg:p-8 bg-gray-50/50 custom-scrollbar">
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 lg:gap-8">

                  {/* Chart & Stats */}
                  <div className="lg:col-span-2 space-y-6 lg:space-y-8">
                    <div className="bg-white p-4 sm:p-6 rounded-2xl sm:rounded-3xl border border-gray-100 shadow-sm">
                      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
                        <h3 className="text-base sm:text-lg font-bold text-gray-900 flex items-center gap-2">
                          <TrendingUp className="text-[#1CADA3]" size={18} />
                          NAV Performance
                        </h3>
                        <div className="flex gap-1 sm:gap-2 bg-gray-50 p-1 rounded-xl self-start sm:self-auto w-full sm:w-auto justify-between">
                          {(["1Y", "3Y", "5Y"] as const).map((range) => (
                            <button
                              key={range}
                              onClick={() => setTimeRange(range)}
                              className={`flex-1 sm:flex-none px-4 sm:px-6 py-1.5 rounded-lg sm:rounded-xl text-[10px] sm:text-xs font-bold transition-all ${
                                timeRange === range
                                  ? "bg-[#2076C7] text-white shadow-md"
                                  : "text-gray-500 hover:bg-gray-200"
                              }`}
                            >
                              {range}
                            </button>
                          ))}
                        </div>
                      </div>
                      <div className="h-[250px] sm:h-[300px] w-full relative">
                        {isChartLoading ? (
                          <div className="absolute inset-0 flex items-center justify-center">
                            <div className="w-8 h-8 border-4 border-[#2076C7] border-t-transparent rounded-full animate-spin" />
                          </div>
                        ) : chartError ? (
                          <div className="h-full flex items-center justify-center text-red-400 font-medium text-sm text-center px-4">
                            {chartError}
                          </div>
                        ) : filteredChartData.length > 0 ? (
                          <Line
                            data={{
                              labels: filteredChartData.map((d) => d.date),
                              datasets: [{
                                label: "NAV",
                                data: filteredChartData.map((d) => d.nav),
                                borderColor: "#2076C7",
                                backgroundColor: "rgba(32, 118, 199, 0.1)",
                                fill: true,
                                tension: 0.4,
                                pointRadius: 0,
                                pointHoverRadius: 6,
                              }],
                            }}
                            options={{
                              responsive: true,
                              maintainAspectRatio: false,
                              plugins: {
                                legend: { display: false },
                                tooltip: {
                                  backgroundColor: "#1a1f36",
                                  padding: 12,
                                  titleFont: { size: 12 },
                                  bodyFont: { size: 14, weight: "bold" },
                                },
                              },
                              interaction: { mode: "index", intersect: false },
                              scales: {
                                x: { display: false },
                                y: {
                                  grid: { color: "#f0f0f0" },
                                  ticks: { font: { size: 10, weight: "bold" }, maxTicksLimit: 6 },
                                },
                              },
                            }}
                          />
                        ) : (
                          <div className="h-full flex items-center justify-center text-gray-400 font-bold text-sm">
                            No performance data available
                          </div>
                        )}
                      </div>
                    </div>

                    {/* Quick Stats */}
                    <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4">
                      {(() => {
                        const riskStyle = getStatRiskColors(selectedFund.risk);
                        return [
                          { label: "Current NAV", value: selectedFund.nav ?? "—", icon: Activity, color: "text-blue-600", bg: "bg-blue-50" },
                          { 
                            label: `${timeRange} Return`, 
                            value: dynamicReturn, 
                            icon: TrendingUp, 
                            color: dynamicReturn.includes('-') ? "text-red-500" : dynamicReturn.includes('+') ? "text-emerald-500" : "text-gray-400", 
                            bg: dynamicReturn.includes('-') ? "bg-red-50" : dynamicReturn.includes('+') ? "bg-emerald-50" : "bg-gray-50" 
                          },
                          { label: "Risk Level", value: selectedFund.risk || "—", icon: Shield, color: riskStyle.color, bg: riskStyle.bg },
                          { label: "Min Invest", value: "₹5,000", icon: IndianRupee, color: "text-indigo-600", bg: "bg-indigo-50" },
                        ].map((stat, i) => (
                          <div key={i} className="bg-white p-4 sm:p-5 rounded-2xl sm:rounded-3xl border border-gray-100 shadow-sm text-center flex flex-col items-center justify-center">
                            <div className={`w-8 h-8 sm:w-10 sm:h-10 ${stat.bg} ${stat.color} rounded-xl flex items-center justify-center mb-2 sm:mb-3`}>
                              <stat.icon size={18} />
                            </div>
                            <div className="text-[9px] sm:text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-1 line-clamp-1">
                              {stat.label}
                            </div>
                            <div className="text-sm sm:text-lg font-bold text-gray-900">{stat.value}</div>
                          </div>
                        ));
                      })()}
                    </div>
                  </div>

                  {/* Right: Calculator + CTA */}
                  <div className="lg:col-span-1 h-full flex flex-col gap-6">
                    {availableCalcPeriods.length > 0 && calcResult && (
                      <div className="bg-white p-5 sm:p-6 rounded-2xl sm:rounded-3xl border border-blue-100 shadow-sm space-y-5 relative overflow-hidden">
                        <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-[#1CADA3]/10 to-transparent rounded-bl-full pointer-events-none" />
                        <div className="flex items-center gap-2 relative z-10">
                          <div className="w-8 h-8 rounded-full bg-blue-50 flex items-center justify-center text-[#2076C7]">
                            <TrendingUp size={16} />
                          </div>
                          <h3 className="text-base sm:text-lg font-bold text-gray-900 tracking-tight">If you invested...</h3>
                        </div>
                        <div className="p-3 bg-gray-50 rounded-xl border border-gray-200 focus-within:border-blue-300 focus-within:ring-2 focus-within:ring-blue-100 transition-all relative z-10">
                          <div className="flex items-center gap-2">
                            <span className="text-gray-500 font-bold ml-1">₹</span>
                            <input
                              type="number"
                              value={calcAmount || ""}
                              onChange={(e) => setCalcAmount(Math.max(0, Number(e.target.value)))}
                              className="bg-transparent border-none outline-none font-bold text-xl w-full text-slate-800 p-0"
                              min="0"
                            />
                          </div>
                        </div>
                        <div className="flex bg-gray-100 p-1 rounded-lg relative z-10">
                          {["1Y", "3Y", "5Y"].map((period) => {
                            if (!availableCalcPeriods.includes(period)) return null;
                            return (
                              <button
                                key={period}
                                onClick={() => setCalcPeriod(period)}
                                className={`flex-1 py-1.5 rounded-md text-xs font-bold transition-all ${
                                  calcPeriod === period
                                    ? "bg-white text-[#2076C7] shadow-sm border border-gray-200"
                                    : "text-gray-500 hover:text-gray-800"
                                }`}
                              >
                                {period}
                              </button>
                            );
                          })}
                        </div>
                        <div className="pt-2 relative z-10">
                          <div className="flex items-center flex-wrap gap-2 sm:gap-3 mb-2.5">
                            <div className="text-sm font-bold text-gray-400 line-through">₹{formatINR(calcAmount)}</div>
                            <div className="text-emerald-500 font-bold">→</div>
                            <div className="text-2xl sm:text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-emerald-600 to-[#1CADA3]">
                              ₹{formatINR(calcResult.finalAmount)}
                            </div>
                          </div>
                          <div className="flex flex-wrap items-center gap-2">
                            <div className={`flex items-center gap-1.5 w-fit px-2.5 py-1 rounded-md border ${
                              parseFloat(calcResult.absReturn) > 0 ? "bg-emerald-50 border-emerald-100" : 
                              parseFloat(calcResult.absReturn) < 0 ? "bg-red-50 border-red-100" : "bg-gray-50 border-gray-100"
                            }`}>
                              <TrendingUp size={14} className={parseFloat(calcResult.absReturn) > 0 ? "text-emerald-600" : parseFloat(calcResult.absReturn) < 0 ? "text-red-600" : "text-gray-400"} />
                              <span className={`font-bold text-xs sm:text-sm ${
                                parseFloat(calcResult.absReturn) > 0 ? "text-emerald-700" : 
                                parseFloat(calcResult.absReturn) < 0 ? "text-red-600" : "text-gray-500"
                              }`}>
                                {parseFloat(calcResult.absReturn) > 0 ? "+" : ""}{calcResult.absReturn}% growth
                              </span>
                            </div>
                            <span className="text-gray-500 font-bold text-xs">({parseFloat(calcResult.cagr) > 0 ? "+" : ""}{calcResult.cagr}% CAGR)</span>
                          </div>
                          <div className="text-[10px] sm:text-xs text-gray-500 font-medium mt-3">Based on historical NAV data</div>
                        </div>
                      </div>
                    )}

                    <div className="bg-white p-5 sm:p-6 rounded-2xl sm:rounded-3xl border border-gray-100 shadow-sm space-y-6 lg:sticky lg:top-0">
                      <h3 className="text-base sm:text-lg font-bold text-gray-900">Start Your Investment</h3>
                      <div className="space-y-4">
                        <button
                          onClick={openLogin}
                          className="w-full py-3.5 sm:py-4 bg-gradient-to-r from-[#2076C7] to-[#1CADA3] text-white rounded-xl sm:rounded-2xl font-bold text-xs sm:text-sm uppercase tracking-widest shadow-md hover:shadow-lg hover:opacity-95 transition-all"
                        >
                          Invest Lumpsum
                        </button>
                        <button
                          onClick={openLogin}
                          className="w-full py-3.5 sm:py-4 border-2 border-[#2076C7] text-[#2076C7] rounded-xl sm:rounded-2xl font-bold text-xs sm:text-sm uppercase tracking-widest hover:bg-blue-50 transition-all"
                        >
                          Start SIP
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      <style jsx>{`
        .custom-scrollbar::-webkit-scrollbar { width: 6px; }
        .custom-scrollbar::-webkit-scrollbar-track { background: #f1f1f1; border-radius: 10px; }
        .custom-scrollbar::-webkit-scrollbar-thumb { background: #c1c1c1; border-radius: 10px; }
        .custom-scrollbar::-webkit-scrollbar-thumb:hover { background: #2076c7; }
      `}</style>
    </div>
  );
}