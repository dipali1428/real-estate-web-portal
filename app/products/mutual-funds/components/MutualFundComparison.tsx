"use client";
import { useState, useEffect, useMemo, useRef } from "react";
import { X, Search, Activity, PlusCircle, Loader2, TrendingUp } from "lucide-react";
import mutualFundService, { AmfiFund } from "@/app/services/mutualfundservice";
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
import { Line } from "react-chartjs-2";
import { motion, AnimatePresence } from "framer-motion";

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend, Filler);

// ---------- Types ----------
interface HistoryPoint {
  date: Date;
  nav: number;
}

interface CompareFund {
  id: number;
  name: string;
  category: string;
  type: string;
  risk: string;
  nav: string;
  return1Y: string;
  return3Y: string;
  return5Y: string;
  fundHouse: string;
  history: HistoryPoint[];
}

const INVESTMENT_STYLES = [
  { label: "Large Cap", key: "large cap" },
  { label: "Mid Cap", key: "mid cap" },
  { label: "Small Cap", key: "small cap" },
  { label: "Flexi Cap", key: "flexi" },
  { label: "ELSS (Tax)", key: "elss" },
  { label: "Hybrid", key: "hybrid" },
];

const CHART_COLORS = ["#2076C7", "#1CADA3", "#8B5CF6"];

const parseDate = (dateStr: string): Date | null => {
  if (!dateStr) return null;
  const [dd, mm, yyyy] = dateStr.split("-").map(Number);
  const d = new Date(yyyy, mm - 1, dd);
  return isNaN(d.getTime()) ? null : d;
};

const buildCompareFund = (details: any, latestNavFromSearch?: string): CompareFund | null => {
  if (!details?.data || !Array.isArray(details.data)) return null;

  const history = details.data
    .map((d: any) => ({
      date: parseDate(d.date),
      nav: parseFloat(d.nav)
    }))
    .filter((d: any): d is HistoryPoint => d.date !== null && !isNaN(d.nav))
    .sort((a: HistoryPoint, b: HistoryPoint) => a.date.getTime() - b.date.getTime());

  if (!history.length) return null;

  const latestNav = latestNavFromSearch ? parseFloat(latestNavFromSearch) : history[history.length - 1].nav;

  const calculateROI = (years: number) => {
    const targetDate = new Date();
    targetDate.setFullYear(targetDate.getFullYear() - years);
    const point = history.find((p: HistoryPoint) => p.date >= targetDate);
    if (!point || point === history[history.length - 1]) return "—";
    const roi = ((latestNav - point.nav) / point.nav) * 100;
    const sign = roi > 0 ? "+" : "";
    return sign + roi.toFixed(1) + "%";
  };

  return {
    id: details.meta.scheme_code,
    name: details.meta.scheme_name,
    category: details.meta.scheme_category ?? "Equity",
    type: details.meta.type ?? "",
    risk: details.meta.risk ?? "High",
    nav: latestNav.toFixed(2),
    return1Y: calculateROI(1),
    return3Y: calculateROI(3),
    return5Y: calculateROI(5),
    fundHouse: details.meta.fund_house,
    history,
  };
};

export default function MutualFundComparison() {
  const [selectedFunds, setSelectedFunds] = useState<CompareFund[]>([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [searchResults, setSearchResults] = useState<AmfiFund[]>([]);
  const [isSearching, setIsSearching] = useState(false);
  const [loadingFund, setLoadingFund] = useState<number | null>(null);
  const [isInitializing, setIsInitializing] = useState(true);
  const [selectedStyle, setSelectedStyle] = useState("");
  const [showResults, setShowResults] = useState(false);
  const [timeframe, setTimeframe] = useState(1095); // Default 3Y (in days)
  const searchRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const init = async () => {
      try {
        const defaults = ["HDFC Mid-Cap Opportunities", "Nippon India Growth"];
        const fundsToAdd = [];
        for (const name of defaults) {
          const res = await mutualFundService.searchFunds(name);
          const match = res.find(f => !f.name.toLowerCase().includes("direct"));
          if (match) {
            const details = await mutualFundService.getFundDetails(Number(match.schemeCode));
            const cf = buildCompareFund(details, match.nav);
            if (cf) fundsToAdd.push(cf);
          }
        }
        setSelectedFunds(fundsToAdd);
      } finally {
        setIsInitializing(false);
      }
    };
    init();
  }, []);

  useEffect(() => {
    const timer = setTimeout(async () => {
      if (!searchQuery && !selectedStyle) return;
      setIsSearching(true);
      try {
        const apiQuery = searchQuery.length >= 2 ? searchQuery : (selectedStyle || "Growth");
        let res = await mutualFundService.searchFunds(apiQuery);
        res = res.filter(f => !f.name.toLowerCase().includes("direct"));
        if (selectedStyle) {
          res = res.filter(f =>
            (f.category || "").toLowerCase().includes(selectedStyle.toLowerCase())
          );
        } setSearchResults(res.slice(0, 6));
      } finally {
        setIsSearching(false);
      }
    }, 400);
    return () => clearTimeout(timer);
  }, [searchQuery, selectedStyle]);

  const addFund = async (fund: AmfiFund) => {
    if (selectedFunds.some(f => f.id === Number(fund.schemeCode))) return;
    if (selectedFunds.length >= 3) return;
    setLoadingFund(Number(fund.schemeCode));
    try {
      const details = await mutualFundService.getFundDetails(Number(fund.schemeCode));
      const cf = buildCompareFund(details, fund.nav);
      if (cf) setSelectedFunds(p => [...p, cf]);
      setShowResults(false);
      setSearchQuery("");
    } finally {
      setLoadingFund(null);
    }
  };

  const chartData = useMemo(() => {
    if (!selectedFunds.length) return null;
    const labels = selectedFunds[0].history.slice(-timeframe).map(h =>
      h.date.toLocaleDateString(undefined, { month: "short", year: "2-digit" })
    );
    return {
      labels,
      datasets: selectedFunds.map((f, i) => {
        const slice = f.history.slice(-timeframe);
        const baseNav = slice[0]?.nav || 1;
        return {
          label: f.name.split("-")[0],
          data: slice.map(h => ((h.nav / baseNav) * 100).toFixed(2)),
          borderColor: CHART_COLORS[i],
          backgroundColor: CHART_COLORS[i] + "10",
          fill: true,
          tension: 0.4,
          pointRadius: 0,
          borderWidth: 3,
        };
      }),
    };
  }, [selectedFunds, timeframe]);

  return (
    <div className="max-w-7xl mx-auto px-4 py-8 md:py-16 space-y-12">
      {/* --- Header Section --- */}
      <div className="text-center mb-12">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-3xl md:text-4xl font-bold mb-3 text-center bg-gradient-to-r from-[#2076C7] to-[#1CADA3] bg-clip-text text-transparent drop-shadow-sm"
        >
          Compare Mutual Funds
        </motion.h2>
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="text-slate-500 text-sm md:text-lg max-w-2xl mx-auto font-medium"
        >
          Analyze performance, risk metrics, and NAV history side-by-side to make smarter investment decisions.
        </motion.p>
      </div>

      {/* --- Search & Filter Bar --- */}
      <div className="bg-white p-4 md:p-6 rounded-[2.5rem] shadow-md border border-slate-100 flex flex-col gap-6" ref={searchRef}>
        <div className="flex flex-col md:flex-row gap-4">
          <div className="relative flex-1 group">
            <Search
              className="absolute left-5 top-1/2 -translate-y-1/2 text-slate-400 z-10"
              size={20}
            />

           <input
  value={searchQuery}
  onChange={(e) => {
    setSearchQuery(e.target.value);
    setShowResults(true);
  }}
  onFocus={() => setShowResults(true)}
  placeholder="Type fund name (e.g. Axis Bluechip)..."
  autoComplete="off"
  style={{
    background: "transparent",
    WebkitBoxShadow: "0 0 0 1000px transparent inset",
    WebkitTextFillColor: "#0f172a",
  }}
  className="w-full pl-14 pr-6 py-4 appearance-none outline-none border-2 border-slate-200 rounded-xl focus:border-[#2076C7] focus:ring-2 focus:ring-[#2076C7]/10 transition-all font-semibold"
/>
            {/* Search Dropdown */}
            <AnimatePresence>
              {showResults && searchResults.length > 0 && (
             <motion.div
  initial={{ opacity: 0, y: 10 }}
  animate={{ opacity: 1, y: 0 }}
  exit={{ opacity: 0 }}
  className="absolute w-full mt-3 bg-white border border-slate-200 rounded-3xl shadow-2xl z-50 overflow-hidden"
>
  <div className="flex justify-between items-center px-4 py-3 border-b border-slate-100">
    <span className="text-xs font-bold text-slate-400 uppercase">Search Results</span>
    <button onClick={() => setShowResults(false)}>
      <X size={18} className="text-slate-400 hover:text-red-500" />
    </button>
  </div>

  {searchResults.map((f) => (
    <button
      key={f.schemeCode}
      onClick={() => addFund(f)}
      className="w-full flex items-center justify-between p-4 hover:bg-slate-50 border-b border-slate-50 last:border-none transition-colors group"
    >
      <div className="text-left overflow-hidden">
        <p className="font-bold text-slate-800 truncate text-sm uppercase">{f.name}</p>
        <p className="text-[10px] text-slate-400 font-bold uppercase">{f.category}</p>
      </div>

      {loadingFund === Number(f.schemeCode) ? (
        <Loader2 className="animate-spin text-[#1CADA3]" size={20} />
      ) : (
        <PlusCircle className="text-slate-200 group-hover:text-[#1CADA3]" size={20} />
      )}
    </button>
  ))}
</motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* Quick Categories - Horizontal Scroll on Mobile */}
          <div className="flex items-center gap-2 overflow-x-auto pb-2 md:pb-0 scrollbar-hide no-scrollbar">
            {INVESTMENT_STYLES.map((s) => (
              <button
                key={s.key}
                onClick={() => setSelectedStyle(selectedStyle === s.key ? "" : s.key)}
                className={`whitespace-nowrap px-5 py-3 rounded-xl text-xs font-bold transition-all ${selectedStyle === s.key ? "bg-[#2076C7] text-white shadow-lg" : "bg-slate-100 text-slate-500 hover:bg-slate-200"
                  }`}
              >
                {s.label}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* --- Comparison Cards --- */}
      <div className="flex overflow-x-auto md:grid md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6 pb-8 md:pb-0 snap-x snap-mandatory scrollbar-hide no-scrollbar -mx-4 px-4 md:mx-0 md:px-0">
        <AnimatePresence mode="popLayout">
          {selectedFunds.map((fund, idx) => (
            <motion.div
              layout
              key={fund.id}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              className="bg-white rounded-[2.5rem] border border-slate-100 shadow-md transition-all overflow-hidden flex flex-col w-[85vw] md:w-full flex-shrink-0 snap-center"
            >
              <div className="p-6 flex-1">
                <div className="flex justify-between items-start mb-4">
                  <div className="p-2 rounded-lg bg-slate-50" style={{ color: CHART_COLORS[idx] }}>
                    <Activity size={24} />
                  </div>
                  <button onClick={() => setSelectedFunds(p => p.filter(f => f.id !== fund.id))} className="text-slate-300 hover:text-red-500 transition-colors">
                    <X size={20} />
                  </button>
                </div>

                <h3 className="font-semibold text-slate-800 text-base leading-snug mb-1 line-clamp-2">
                  {fund.name}
                </h3>
                <p className="text-[10px] font-bold text-[#1CADA3] tracking-widest uppercase mb-4">
                  {fund.fundHouse}
                </p>

                <div className="flex gap-2 mb-6">
                  <span className="px-2 py-1 bg-slate-100 text-slate-500 rounded text-[9px] font-bold uppercase">{fund.category}</span>
                  <span className={`px-2 py-1 rounded text-[9px] font-bold uppercase ${fund.risk.toLowerCase().includes('high') ? 'bg-orange-50 text-orange-600' : 'bg-green-50 text-green-600'
                    }`}>
                    {fund.risk} Risk
                  </span>
                </div>

                <div className="grid grid-cols-3 gap-2 py-4 border-y border-slate-50">
                  <div className="text-center">
                    <p className="text-[9px] text-slate-400 font-bold uppercase mb-1">1Y Return</p>
                    <p className={`font-bold text-sm ${fund.return1Y.startsWith('-') ? 'text-red-500' :
                        fund.return1Y.startsWith('+') ? 'text-emerald-500' : 'text-slate-400'
                      }`}>{fund.return1Y}</p>
                  </div>
                  <div className="text-center border-x border-slate-50">
                    <p className="text-[9px] text-slate-400 font-bold uppercase mb-1">3Y Return</p>
                    <p className={`font-bold text-sm ${fund.return3Y.startsWith('-') ? 'text-red-500' :
                        fund.return3Y.startsWith('+') ? 'text-emerald-500' : 'text-slate-400'
                      }`}>{fund.return3Y}</p>
                  </div>
                  <div className="text-center">
                    <p className="text-[9px] text-slate-400 font-bold uppercase mb-1">5Y Return</p>
                    <p className={`font-bold text-sm ${fund.return5Y.startsWith('-') ? 'text-red-500' :
                        fund.return5Y.startsWith('+') ? 'text-emerald-500' : 'text-slate-400'
                      }`}>{fund.return5Y}</p>
                  </div>
                </div>
              </div>

              <div className="bg-slate-50 px-6 py-4 flex justify-between items-center">
                <span className="text-[10px] font-bold text-slate-400 uppercase">Current NAV</span>
                <span className="text-xl font-bold text-[#2076C7]">₹{fund.nav}</span>
              </div>
            </motion.div>
          ))}

          {selectedFunds.length < 3 && (
            <div className="border-4 border-dashed border-slate-100 rounded-[2.5rem] flex flex-col items-center justify-center p-12 text-slate-300">
              <div className="w-16 h-16 rounded-full bg-slate-50 flex items-center justify-center mb-4">
                <PlusCircle size={32} />
              </div>
              <p className="text-xs font-bold uppercase tracking-widest text-center">Add Up To {3 - selectedFunds.length} More<br />Funds to compare</p>
            </div>
          )}
        </AnimatePresence>
      </div>

      {/* --- Visualization Section --- */}
      <div className="bg-white rounded-[3rem] p-6 md:p-10 border border-slate-100 shadow-lg relative overflow-hidden">
        <div className="flex flex-col md:flex-row md:items-center justify-between mb-10 gap-6">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 bg-[#1CADA3]/10 rounded-2xl flex items-center justify-center text-[#1CADA3]">
              <TrendingUp size={24} />
            </div>
            <div>
              <h2 className="text-xl font-bold text-slate-900 uppercase tracking-tight">Performance Growth</h2>
              <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Growth of ₹100 over selected time</p>
            </div>
          </div>

          <div className="flex bg-slate-100 p-1 rounded-2xl self-start md:self-center">
            {[
              { l: "1Y", v: 365 },
              { l: "3Y", v: 1095 },
              { l: "5Y", v: 1825 },
            ].map((t) => (
              <button
                key={t.v}
                onClick={() => setTimeframe(t.v)}
                className={`px-6 py-2 rounded-xl text-xs font-bold transition-all ${timeframe === t.v ? "bg-white text-[#2076C7] shadow-sm" : "text-slate-400 hover:text-slate-600"
                  }`}
              >
                {t.l}
              </button>
            ))}
          </div>
        </div>

        <div className="h-[350px] md:h-[450px] w-full">
          {chartData ? (
            <Line
              data={chartData as any}
              options={{
                responsive: true,
                maintainAspectRatio: false,
                plugins: {
                  legend: { display: false },
                  tooltip: {
                    backgroundColor: "#1e293b",
                    padding: 12,
                    titleFont: { size: 12, weight: "bold" },
                    callbacks: { label: (ctx) => ` Growth: ${ctx.parsed.y}%` },
                  },
                },
                scales: {
                  x: { grid: { display: false }, ticks: { font: { size: 10, weight: 600 }, color: "#94a3b8" } },
                  y: { grid: { color: "#f1f5f9" }, ticks: { callback: (v) => v + "%", font: { size: 10, weight: 600 }, color: "#94a3b8" } },
                },
              }}
            />
          ) : (
            <div className="h-full flex flex-col items-center justify-center text-slate-300 space-y-4">
              {isInitializing ? <Loader2 className="animate-spin" size={40} /> : <Activity size={60} strokeWidth={1} />}
              <p className="text-[10px] font-bold uppercase tracking-[0.3em]">No funds selected for analysis</p>
            </div>
          )}
        </div>

        {/* Chart Legend */}
        {selectedFunds.length > 0 && (
          <div className="mt-8 flex flex-wrap justify-center gap-6">
            {selectedFunds.map((f, i) => (
              <div key={f.id} className="flex items-center gap-2">
                <div className="w-3 h-3 rounded-full" style={{ backgroundColor: CHART_COLORS[i] }} />
                <span className="text-[10px] font-bold text-slate-600 uppercase truncate max-w-[150px]">{f.name}</span>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}