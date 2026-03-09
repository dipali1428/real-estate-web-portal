"use client";

import { useState, useEffect, useCallback } from "react";
import { searchMutualFunds, fetchFundDetails } from "../services/mfApi";
import {
  Calculator,
  TrendingUp,
  Search,
  X,
  PieChart,
  LineChart,
  Coins,
  PiggyBank,
  Plus,
  Minus,
} from "lucide-react";

interface MutualFund {
  schemeCode: number;
  name: string;
}

export default function SIPCalculator() {
  const [activeTab, setActiveTab] = useState<"sip" | "lumpsum">("sip");

  // SIP State
  const [sipAmount, setSipAmount] = useState(5000);
  const [sipDuration, setSipDuration] = useState(10);
  const [sipReturn, setSipReturn] = useState(12);

  // Lumpsum State
  const [lumpsumAmount, setLumpsumAmount] = useState(100000);
  const [lumpsumDuration, setLumpsumDuration] = useState(10);
  const [lumpsumReturn, setLumpsumReturn] = useState(12);

  const [results, setResults] = useState({
    invested: 0,
    returns: 0,
    total: 0,
  });

  // Search State
  const [searchQuery, setSearchQuery] = useState("");
  const [searchResults, setSearchResults] = useState<MutualFund[]>([]);
  const [selectedFund, setSelectedFund] = useState<any>(null);
  const [isSearching, setIsSearching] = useState(false);

  // Calculations
  const calculateSIP = useCallback(
    (monthly: number, years: number, rate: number) => {
      const months = years * 12;
      const monthlyRate = rate / 12 / 100;
      const futureValue =
        monthly *
        ((Math.pow(1 + monthlyRate, months) - 1) / monthlyRate) *
        (1 + monthlyRate);
      return {
        invested: monthly * months,
        returns: futureValue - monthly * months,
        total: futureValue,
      };
    },
    [],
  );

  const calculateLumpsum = useCallback(
    (principal: number, years: number, rate: number) => {
      const futureValue = principal * Math.pow(1 + rate / 100, years);
      return {
        invested: principal,
        returns: futureValue - principal,
        total: futureValue,
      };
    },
    [],
  );

  useEffect(() => {
    if (activeTab === "sip") {
      setResults(calculateSIP(sipAmount, sipDuration, sipReturn));
    } else {
      setResults(
        calculateLumpsum(lumpsumAmount, lumpsumDuration, lumpsumReturn),
      );
    }
  }, [
    activeTab,
    sipAmount,
    sipDuration,
    sipReturn,
    lumpsumAmount,
    lumpsumDuration,
    lumpsumReturn,
    calculateSIP,
    calculateLumpsum,
  ]);

  // Search Logic
  useEffect(() => {
    const timer = setTimeout(async () => {
      if (searchQuery.length >= 2) {
        setIsSearching(true);
        try {
          const res = await searchMutualFunds(searchQuery);
          setSearchResults(res.slice(0, 5));
        } catch (error) {
          console.error("Search failed", error);
        } finally {
          setIsSearching(false);
        }
      } else {
        setSearchResults([]);
      }
    }, 500);
    return () => clearTimeout(timer);
  }, [searchQuery]);

  const handleSelectFund = async (fund: MutualFund) => {
    setSearchQuery("");
    setSearchResults([]);
    try {
      const details = await fetchFundDetails(fund.schemeCode);
      if (details.data && details.data.length > 250) {
        const latestNav = parseFloat(details.data[0].nav);
        const oldNav = parseFloat(details.data[250].nav);
        const cagr = parseFloat(
          (((latestNav - oldNav) / oldNav) * 100).toFixed(1),
        );

        if (activeTab === "sip") setSipReturn(cagr);
        else setLumpsumReturn(cagr);

        setSelectedFund({ ...fund, cagr });
      }
    } catch (error) {
      console.error("Failed to get fund details", error);
    }
  };

  const formatCurrency = (amount: number) => {
    if (amount >= 10000000) return "₹" + (amount / 10000000).toFixed(2) + " Cr";
    if (amount >= 100000) return "₹" + (amount / 100000).toFixed(2) + " L";
    return "₹" + Math.round(amount).toLocaleString("en-IN");
  };

  // Chart Height Calculation
  const totalMax = Math.max(results.total, results.invested * 2); // scale factor
  const investedHeight = (results.invested / totalMax) * 200;
  const returnsHeight = (results.returns / totalMax) * 200;

  return (
    <section
      className="relative bg-white rounded-3xl p-8 md:p-12 border border-gray-100/80 overflow-hidden transition-all duration-300 hover:-translate-y-1 space-y-12"
      style={{
        boxShadow:
          "0 2px 4px rgba(0,0,0,0.04), 0 8px 24px rgba(0,0,0,0.08), inset 0 1px 0 rgba(255,255,255,0.9)",
      }}
    >
      <div className="text-center mb-12">
        <h2 className="text-3xl md:text-4xl font-extrabold mb-3">
          <span className="text-transparent bg-clip-text bg-linear-to-r from-[#2076C7] via-[#1CADA3] to-[#2076C7]">
            SIP &amp; Lumpsum Calculator
          </span>
        </h2>
      </div>

      <div className="max-w-6xl mx-auto">
        {/* Tabs */}
        <div className="flex bg-gray-50 rounded-2xl p-1.5 mb-10 max-w-md mx-auto border border-gray-100">
          <button
            className={`flex-1 py-3 px-5 rounded-xl font-semibold transition-all duration-300 flex items-center justify-center gap-2 ${
              activeTab === "sip"
                ? "bg-white text-[#2076C7] shadow-sm border border-gray-100"
                : "text-gray-500 hover:text-gray-700"
            }`}
            onClick={() => setActiveTab("sip")}
          >
            <LineChart className="w-5 h-5" />
            SIP
          </button>
          <button
            className={`flex-1 py-3 px-5 rounded-xl font-semibold transition-all duration-300 flex items-center justify-center gap-2 ${
              activeTab === "lumpsum"
                ? "bg-white text-[#2076C7] shadow-sm border border-gray-100"
                : "text-gray-500 hover:text-gray-700"
            }`}
            onClick={() => setActiveTab("lumpsum")}
          >
            <Coins className="w-5 h-5" />
            Lumpsum
          </button>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Input Section */}
          <div className="space-y-10">
            {/* Search Integration */}
            <div className="relative bg-blue-50/50 p-6 rounded-2xl border border-blue-100/50">
              <label className="block text-xs font-bold text-blue-600 uppercase tracking-wider mb-3">
                Select Fund (Auto-fill Returns)
              </label>
              <div className="relative">
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Search mutual fund to use its actual returns..."
                  className="w-full pl-10 pr-4 py-3 bg-white border border-gray-200 rounded-xl focus:ring-2 focus:ring-[#1CADA3] outline-none text-gray-900 shadow-sm"
                />
                <Search className="w-5 h-5 text-gray-400 absolute left-3 top-3.5" />
              </div>
              {searchResults.length > 0 && (
                <div className="absolute z-10 w-full left-0 mt-2 bg-white border border-gray-100 rounded-xl shadow-2xl max-h-60 overflow-y-auto">
                  {searchResults.map((fund) => (
                    <div
                      key={fund.schemeCode}
                      onClick={() => handleSelectFund(fund)}
                      className="px-4 py-3 hover:bg-gray-50 cursor-pointer border-b last:border-0 transition-colors"
                    >
                      <p className="text-sm font-medium text-gray-900">
                        {fund.name}
                      </p>
                    </div>
                  ))}
                </div>
              )}
              {selectedFund && (
                <div className="mt-3 flex justify-between items-center bg-white px-3 py-2 rounded-lg border border-teal-100 shadow-sm">
                  <span className="text-xs font-bold text-teal-700 truncate max-w-[85%]">
                    {selectedFund.name}
                  </span>
                  <button
                    onClick={() => {
                      setSelectedFund(null);
                      activeTab === "sip"
                        ? setSipReturn(12)
                        : setLumpsumReturn(12);
                    }}
                    className="text-gray-400 hover:text-rose-500"
                  >
                    <X size={16} />
                  </button>
                </div>
              )}
            </div>

            {/* Sliders */}
            <div className="space-y-10">
              {/* Amount */}
              <div className="space-y-4">
                <div className="flex justify-between items-center bg-transparent relative">
                  <label className="text-sm font-semibold text-gray-600 font-sans uppercase tracking-tight">
                    {activeTab === "sip"
                      ? "Monthly Investment"
                      : "Total Investment"}
                  </label>
                  <div className="flex items-center gap-1 bg-gray-50 border border-gray-200 rounded-lg p-1.5 shadow-xs">
                    <button
                      onClick={() =>
                        activeTab === "sip"
                          ? setSipAmount(Math.max(500, sipAmount - 500))
                          : setLumpsumAmount(
                              Math.max(1000, lumpsumAmount - 1000),
                            )
                      }
                      className="p-1 hover:bg-white hover:shadow-sm rounded transition-all text-slate-500 hover:text-rose-500 cursor-pointer"
                    >
                      <Minus size={16} strokeWidth={2.5} />
                    </button>
                    <div className="relative flex items-center justify-center min-w-[120px]">
                      <span className="absolute left-2 font-bold text-slate-900 text-lg">
                        ₹
                      </span>
                      <input
                        type="number"
                        value={activeTab === "sip" ? sipAmount : lumpsumAmount}
                        onChange={(e) => {
                          const val = Number(e.target.value);
                          activeTab === "sip"
                            ? setSipAmount(val)
                            : setLumpsumAmount(val);
                        }}
                        className="w-full text-center bg-transparent font-black text-2xl text-slate-900 outline-none [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
                      />
                    </div>
                    <button
                      onClick={() =>
                        activeTab === "sip"
                          ? setSipAmount(Math.min(1000000, sipAmount + 500))
                          : setLumpsumAmount(
                              Math.min(5000000, lumpsumAmount + 1000),
                            )
                      }
                      className="p-1 hover:bg-white hover:shadow-sm rounded transition-all text-slate-500 hover:text-emerald-500 cursor-pointer"
                    >
                      <Plus size={16} strokeWidth={2.5} />
                    </button>
                  </div>
                </div>
                <input
                  type="range"
                  min={activeTab === "sip" ? 500 : 1000}
                  max={activeTab === "sip" ? 1000000 : 5000000}
                  step={500}
                  value={activeTab === "sip" ? sipAmount : lumpsumAmount}
                  onChange={(e) =>
                    activeTab === "sip"
                      ? setSipAmount(Number(e.target.value))
                      : setLumpsumAmount(Number(e.target.value))
                  }
                  className="w-full h-2 bg-gray-100 rounded-lg appearance-none cursor-pointer accent-[#1CADA3]"
                />
              </div>

              {/* Duration */}
              <div className="space-y-4">
                <div className="flex justify-between items-center">
                  <label className="text-sm font-semibold text-gray-600 font-sans uppercase tracking-tight">
                    Time Period
                  </label>
                  <div className="flex items-center gap-1 bg-gray-50 border border-gray-200 rounded-lg p-1.5 shadow-xs">
                    <button
                      onClick={() =>
                        activeTab === "sip"
                          ? setSipDuration(Math.max(1, sipDuration - 1))
                          : setLumpsumDuration(Math.max(1, lumpsumDuration - 1))
                      }
                      className="p-1 hover:bg-white hover:shadow-sm rounded transition-all text-slate-500 hover:text-rose-500 cursor-pointer"
                    >
                      <Minus size={16} strokeWidth={2.5} />
                    </button>
                    <div className="relative flex items-center justify-center min-w-[90px]">
                      <input
                        type="number"
                        value={
                          activeTab === "sip" ? sipDuration : lumpsumDuration
                        }
                        onChange={(e) => {
                          const val = Number(e.target.value);
                          activeTab === "sip"
                            ? setSipDuration(val)
                            : setLumpsumDuration(val);
                        }}
                        className="w-16 py-0.5 text-center bg-transparent font-black text-2xl text-slate-900 outline-none [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
                      />
                      <span className="absolute right-1 text-sm font-bold text-gray-400">
                        Yr
                      </span>
                    </div>
                    <button
                      onClick={() =>
                        activeTab === "sip"
                          ? setSipDuration(Math.min(30, sipDuration + 1))
                          : setLumpsumDuration(
                              Math.min(30, lumpsumDuration + 1),
                            )
                      }
                      className="p-1 hover:bg-white hover:shadow-sm rounded transition-all text-slate-500 hover:text-emerald-500 cursor-pointer"
                    >
                      <Plus size={16} strokeWidth={2.5} />
                    </button>
                  </div>
                </div>
                <input
                  type="range"
                  min="1"
                  max="30"
                  value={activeTab === "sip" ? sipDuration : lumpsumDuration}
                  onChange={(e) =>
                    activeTab === "sip"
                      ? setSipDuration(Number(e.target.value))
                      : setLumpsumDuration(Number(e.target.value))
                  }
                  className="w-full h-2 bg-gray-100 rounded-lg appearance-none cursor-pointer accent-[#1CADA3]"
                />
              </div>

              {/* Return Rate */}
              <div className="space-y-4">
                <div className="flex justify-between items-center">
                  <label className="text-sm font-semibold text-gray-600 font-sans uppercase tracking-tight">
                    Expected Annual Return
                  </label>
                  <div className="flex items-center gap-1 bg-gray-50 border border-gray-200 rounded-lg p-1.5 shadow-xs">
                    <button
                      onClick={() =>
                        activeTab === "sip"
                          ? setSipReturn(
                              Math.max(1, Number((sipReturn - 0.5).toFixed(1))),
                            )
                          : setLumpsumReturn(
                              Math.max(
                                1,
                                Number((lumpsumReturn - 0.5).toFixed(1)),
                              ),
                            )
                      }
                      className="p-1 hover:bg-white hover:shadow-sm rounded transition-all text-slate-500 hover:text-rose-500 cursor-pointer"
                    >
                      <Minus size={16} strokeWidth={2.5} />
                    </button>
                    <div className="relative flex items-center justify-center min-w-[90px]">
                      <input
                        type="number"
                        step="0.1"
                        value={activeTab === "sip" ? sipReturn : lumpsumReturn}
                        onChange={(e) => {
                          const val = Number(e.target.value);
                          activeTab === "sip"
                            ? setSipReturn(val)
                            : setLumpsumReturn(val);
                        }}
                        className="w-16 py-0.5 pr-2 text-center bg-transparent font-black text-2xl text-[#1CADA3] outline-none [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
                      />
                      <span className="absolute right-1 text-lg font-bold text-[#1CADA3]">
                        %
                      </span>
                    </div>
                    <button
                      onClick={() =>
                        activeTab === "sip"
                          ? setSipReturn(
                              Math.min(
                                30,
                                Number((sipReturn + 0.5).toFixed(1)),
                              ),
                            )
                          : setLumpsumReturn(
                              Math.min(
                                30,
                                Number((lumpsumReturn + 0.5).toFixed(1)),
                              ),
                            )
                      }
                      className="p-1 hover:bg-white hover:shadow-sm rounded transition-all text-slate-500 hover:text-emerald-500 cursor-pointer"
                    >
                      <Plus size={16} strokeWidth={2.5} />
                    </button>
                  </div>
                </div>
                <input
                  type="range"
                  min="1"
                  max="30"
                  step="0.1"
                  value={activeTab === "sip" ? sipReturn : lumpsumReturn}
                  onChange={(e) =>
                    activeTab === "sip"
                      ? setSipReturn(Number(e.target.value))
                      : setLumpsumReturn(Number(e.target.value))
                  }
                  className="w-full h-2 bg-gray-100 rounded-lg appearance-none cursor-pointer accent-[#1CADA3]"
                />
              </div>
            </div>

            <div className="bg-blue-50/50 rounded-2xl p-6 border border-blue-100/30 mt-10">
              <h4 className="text-xs font-black text-blue-600 uppercase tracking-widest mb-3 flex items-center gap-2">
                <TrendingUp className="w-3 h-3" /> Strategy Insight
              </h4>
              <p className="text-sm text-slate-600 leading-relaxed font-normal italic">
                "
                {activeTab === "sip"
                  ? `A monthly SIP of ${formatCurrency(sipAmount)} over ${sipDuration} years at ${sipReturn}% CAGR can build a substantial corpus. Systematic investing averages your entry cost and captures long-term compounding.`
                  : `A one-time investment of ${formatCurrency(lumpsumAmount)} over ${lumpsumDuration} years at ${lumpsumReturn}% CAGR leverages the maximum power of time. The earlier you invest, the larger your final wealth.`}
                "
              </p>
            </div>
          </div>

          {/* Results Section */}
          <div className="space-y-10">
            {/* Summary Card */}
            <div className="bg-gradient-to-br from-[#2076C7] to-[#1CADA3] rounded-3xl p-8 shadow-xl relative overflow-hidden group border border-white/20">
              <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full -mr-16 -mt-16 group-hover:scale-110 transition-transform duration-500" />

              <h3 className="text-sm font-black text-white/70 uppercase tracking-widest mb-8 flex items-center gap-2">
                <PieChart className="w-4 h-4 text-white" />
                Investment Projection
              </h3>

              <div className="space-y-6">
                <div className="flex justify-between items-center pb-6 border-b border-white/10">
                  <span className="text-white/80 font-medium text-lg">
                    Invested Amount
                  </span>
                  <span className="text-2xl font-bold font-sans text-white">
                    {formatCurrency(results.invested)}
                  </span>
                </div>
                <div className="flex justify-between items-center pb-6 border-b border-white/10">
                  <span className="text-white/80 font-medium text-lg">
                    Estimated Gains
                  </span>
                  <span className="text-2xl font-bold font-sans text-emerald-100">
                    +{formatCurrency(results.returns)}
                  </span>
                </div>
                <div className="flex justify-between items-center pt-2">
                  <div>
                    <span className="text-white/60 text-xs font-black uppercase tracking-widest block mb-1">
                      Total Future Value
                    </span>
                    <span className="text-4xl font-black font-sans text-white">
                      {formatCurrency(results.total)}
                    </span>
                  </div>
                  <TrendingUp className="w-10 h-10 text-white/30" />
                </div>
              </div>
            </div>

            {/* Chart Visualization */}
            <div className="bg-white rounded-3xl border border-gray-100 p-8 shadow-sm">
              <div className="flex items-end justify-center gap-16 h-48 pb-4 border-b border-gray-50">
                <div className="flex flex-col items-center gap-3">
                  <div
                    className="w-14 bg-gray-100 rounded-t-xl transition-all duration-700 relative shadow-inner"
                    style={{ height: `${investedHeight}px` }}
                  />
                  <span className="text-[10px] font-black text-gray-400 uppercase tracking-widest">
                    Invested
                  </span>
                </div>
                <div className="flex flex-col items-center gap-3">
                  <div
                    className="w-14 bg-gradient-to-t from-[#2076C7] to-[#1CADA3] rounded-t-xl transition-all duration-700 relative shadow-lg shadow-blue-500/10"
                    style={{ height: `${investedHeight + returnsHeight}px` }}
                  >
                    <div className="absolute -top-6 left-1/2 -translate-x-1/2 text-[10px] font-bold text-[#1CADA3] whitespace-nowrap">
                      Growth
                    </div>
                  </div>
                  <span className="text-[10px] font-black text-gray-400 uppercase tracking-widest text-[#2076C7]">
                    Total Value
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
