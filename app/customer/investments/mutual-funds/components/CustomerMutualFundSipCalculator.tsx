"use client";

import {
  BarChart3,
  Calculator,
  Calendar,
  Coins,
  LineChart,
  Minus,
  PiggyBank,
  Plus,
  Search,
  TrendingUp,
  X,
} from "lucide-react";
import { useCallback, useEffect, useState } from "react";
import mutualFundService, { AmfiFund } from "@/app/services/mutualfundservice";

interface CalcResults {
  invested: number;
  returns: number;
  total: number;
}

interface SelectedFund {
  schemeCode: string;
  name: string;
  cagr: number;
}

export default function CustomerMutualFundSipCalculator() {
  const [activeTab, setActiveTab] = useState<"sip" | "lumpsum">("sip");

  const [sipAmount, setSipAmount] = useState(5000);
  const [sipDuration, setSipDuration] = useState(10);
  const [sipReturn, setSipReturn] = useState(12);

  const [lumpsumAmount, setLumpsumAmount] = useState(100000);
  const [lumpsumDuration, setLumpsumDuration] = useState(10);
  const [lumpsumReturn, setLumpsumReturn] = useState(12);

  const [sipResults, setSipResults] = useState<CalcResults>({ invested: 0, returns: 0, total: 0 });
  const [lumpsumResults, setLumpsumResults] = useState<CalcResults>({ invested: 0, returns: 0, total: 0 });

  const [searchQuery, setSearchQuery] = useState("");
  const [searchResults, setSearchResults] = useState<AmfiFund[]>([]);
  const [selectedFund, setSelectedFund] = useState<SelectedFund | null>(null);
  const [isSearching, setIsSearching] = useState(false);

  const calculateSIP = useCallback((monthly: number, years: number, rate: number): CalcResults => {
    const months = years * 12;
    const monthlyRate = rate / 12 / 100;
    const futureValue =
      monthly * ((Math.pow(1 + monthlyRate, months) - 1) / monthlyRate) * (1 + monthlyRate);

    return {
      invested: monthly * months,
      returns: futureValue - monthly * months,
      total: futureValue,
    };
  }, []);

  const calculateLumpsum = useCallback((principal: number, years: number, rate: number): CalcResults => {
    const futureValue = principal * Math.pow(1 + rate / 100, years);

    return {
      invested: principal,
      returns: futureValue - principal,
      total: futureValue,
    };
  }, []);

  useEffect(() => {
    setSipResults(calculateSIP(sipAmount, sipDuration, sipReturn));
  }, [sipAmount, sipDuration, sipReturn, calculateSIP]);

  useEffect(() => {
    setLumpsumResults(calculateLumpsum(lumpsumAmount, lumpsumDuration, lumpsumReturn));
  }, [lumpsumAmount, lumpsumDuration, lumpsumReturn, calculateLumpsum]);

  useEffect(() => {
    if (searchQuery.length < 2) {
      setSearchResults([]);
      return;
    }

    const timer = setTimeout(async () => {
      setIsSearching(true);
      try {
        const res = await mutualFundService.searchFunds(searchQuery);
        const data = Array.isArray(res) ? res : (res as { data?: AmfiFund[] })?.data || [];
        setSearchResults(data.slice(0, 5));
      } catch {
        setSearchResults([]);
      } finally {
        setIsSearching(false);
      }
    }, 500);

    return () => clearTimeout(timer);
  }, [searchQuery]);

  const handleSelectFund = async (fund: AmfiFund) => {
    setSearchQuery("");
    setSearchResults([]);

    try {
      const details = await mutualFundService.getFundDetails(fund.schemeCode);
      if (details?.data && details.data.length > 1) {
        const latestNav = parseFloat(details.data[0].nav);
        const oldestIndex = Math.min(250, details.data.length - 1);
        const oldNav = parseFloat(details.data[oldestIndex].nav);
        const years = oldestIndex / 250;
        const cagr = ((Math.pow(latestNav / oldNav, 1 / (years || 1)) - 1) * 100).toFixed(1);
        const finalReturn = parseFloat(cagr);

        if (activeTab === "sip") {
          setSipReturn(finalReturn);
        } else {
          setLumpsumReturn(finalReturn);
        }

        setSelectedFund({
          schemeCode: fund.schemeCode.toString(),
          name: fund.name,
          cagr: finalReturn,
        });
      }
    } catch {
      // Keep manual values if fund details fail.
    }
  };

  const clearSelectedFund = () => {
    setSelectedFund(null);
    if (activeTab === "sip") {
      setSipReturn(12);
    } else {
      setLumpsumReturn(12);
    }
  };

  const formatCurrency = (amount: number) => {
    if (amount >= 10000000) return `₹${(amount / 10000000).toFixed(1)}Cr`;
    if (amount >= 100000) return `₹${(amount / 100000).toFixed(1)}L`;
    if (amount >= 1000) return `₹${(amount / 1000).toFixed(0)}K`;
    return `₹${Math.round(amount).toLocaleString("en-IN")}`;
  };

  const activeResults = activeTab === "sip" ? sipResults : lumpsumResults;
  const primaryAmount = activeTab === "sip" ? sipAmount : lumpsumAmount;
  const primaryDuration = activeTab === "sip" ? sipDuration : lumpsumDuration;
  const primaryReturn = activeTab === "sip" ? sipReturn : lumpsumReturn;
  const primaryTitle = activeTab === "sip" ? "SIP Calculator" : "Lumpsum Calculator";
  const primarySubtitle =
    activeTab === "sip"
      ? "Calculate returns on your monthly investments"
      : "Calculate returns on your one-time investment";

  const maxChartValue = Math.max(sipResults.total, lumpsumResults.total, 1);
  const sipBarHeight = (sipResults.total / maxChartValue) * 200;
  const lumpsumBarHeight = (lumpsumResults.total / maxChartValue) * 200;

  return (
    <div className="rounded-[28px] bg-white p-5 shadow-sm ring-1 ring-slate-200 sm:p-8">
      <div className="mx-auto max-w-5xl">
        <div className="mx-auto mb-8 flex max-w-md rounded-2xl bg-slate-100 p-1.5">
          <button
            type="button"
            onClick={() => setActiveTab("sip")}
            className={`flex-1 rounded-xl px-5 py-3 text-sm font-semibold transition-all ${
              activeTab === "sip"
                ? "bg-[#1CADA3] text-white shadow-md"
                : "text-slate-700"
            }`}
          >
            <span className="flex items-center justify-center gap-2">
              <LineChart className="h-4 w-4" />
              SIP Calculator
            </span>
          </button>
          <button
            type="button"
            onClick={() => setActiveTab("lumpsum")}
            className={`flex-1 rounded-xl px-5 py-3 text-sm font-semibold transition-all ${
              activeTab === "lumpsum"
                ? "bg-[#1CADA3] text-white shadow-md"
                : "text-slate-700"
            }`}
          >
            <span className="flex items-center justify-center gap-2">
              <Coins className="h-4 w-4" />
              Lumpsum Calculator
            </span>
          </button>
        </div>

        <div className="grid gap-6 lg:grid-cols-2">
          <section className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
            <div className="mb-5 flex items-center gap-4 border-b border-slate-200 pb-4">
              <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-teal-50 text-[#1CADA3]">
                {activeTab === "sip" ? <PiggyBank className="h-6 w-6" /> : <Calculator className="h-6 w-6" />}
              </div>
              <div>
                <h3 className="text-2xl font-bold text-slate-800">{primaryTitle}</h3>
                <p className="text-sm text-slate-500">{primarySubtitle}</p>
              </div>
            </div>

            <div className="relative mb-6 rounded-xl border border-[#1CADA3]/20 bg-[#F7FCFB] p-4">
              <label className="mb-2 block text-xs font-bold uppercase tracking-[0.2em] text-[#1CADA3]">
                Search Fund
              </label>
              <div className="relative">
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Search mutual fund to use its actual returns..."
                  className="w-full rounded-xl border border-slate-200 bg-white py-3 pl-10 pr-4 text-sm text-slate-900 outline-none transition focus:border-[#1CADA3] focus:ring-2 focus:ring-[#1CADA3]/15"
                />
                {isSearching ? (
                  <div className="absolute left-3 top-3.5 h-4 w-4 animate-spin rounded-full border-2 border-[#1CADA3] border-t-transparent" />
                ) : (
                  <Search className="absolute left-3 top-3 h-5 w-5 text-slate-400" />
                )}
              </div>

              {searchResults.length > 0 && (
                <div className="absolute left-0 right-0 z-20 mt-2 rounded-xl border border-slate-200 bg-white shadow-xl">
                  {searchResults.map((fund) => (
                    <button
                      key={fund.schemeCode}
                      type="button"
                      onClick={() => handleSelectFund(fund)}
                      className="block w-full border-b border-slate-100 px-4 py-3 text-left transition hover:bg-slate-50 last:border-b-0"
                    >
                      <p className="text-sm font-medium text-slate-900">{fund.name}</p>
                      <p className="text-xs text-slate-400">
                        {fund.fundHouse} · {fund.category ?? "Mutual Fund"}
                      </p>
                    </button>
                  ))}
                </div>
              )}

              {selectedFund && (
                <div className="mt-3 flex items-center justify-between rounded-lg border border-teal-100 bg-white px-3 py-2">
                  <div>
                    <p className="truncate text-xs font-bold text-teal-700">{selectedFund.name}</p>
                    <p className="text-[11px] text-slate-500">Auto-filled return: {selectedFund.cagr}%</p>
                  </div>
                  <button type="button" onClick={clearSelectedFund} className="text-slate-400 transition hover:text-rose-500">
                    <X className="h-4 w-4" />
                  </button>
                </div>
              )}
            </div>

            <CalculatorSlider
              label={activeTab === "sip" ? "Monthly Investment" : "Investment Amount"}
              valueLabel={formatCurrency(primaryAmount)}
              min={activeTab === "sip" ? 500 : 1000}
              max={activeTab === "sip" ? 100000 : 5000000}
              step={activeTab === "sip" ? 500 : 1000}
              value={primaryAmount}
              onChange={(value) =>
                activeTab === "sip" ? setSipAmount(value) : setLumpsumAmount(value)
              }
              startLabel={activeTab === "sip" ? "₹500" : "₹1,000"}
              endLabel={activeTab === "sip" ? "₹1,00,000" : "₹50,00,000"}
            />

            <CalculatorSlider
              label="Investment Period"
              valueLabel={`${primaryDuration} Years`}
              min={1}
              max={30}
              step={1}
              value={primaryDuration}
              onChange={(value) =>
                activeTab === "sip" ? setSipDuration(value) : setLumpsumDuration(value)
              }
              startLabel="1 Year"
              endLabel="30 Years"
            />

            <CalculatorSlider
              label="Expected Annual Return"
              valueLabel={`${primaryReturn}%`}
              min={1}
              max={30}
              step={0.1}
              value={primaryReturn}
              onChange={(value) =>
                activeTab === "sip" ? setSipReturn(value) : setLumpsumReturn(value)
              }
              startLabel="1%"
              endLabel="30%"
            />
          </section>

          <section className="rounded-2xl border border-[#1CADA3]/30 bg-slate-50 p-5 shadow-sm">
            <h3 className="mb-5 flex items-center gap-2 text-xl font-bold text-[#2076C7]">
              <PieSummaryIcon />
              Investment Summary
            </h3>

            <SummaryRow label="Total Investment" value={formatCurrency(activeResults.invested)} />
            <SummaryRow label="Est. Returns" value={formatCurrency(activeResults.returns)} />
            <SummaryRow label="Total Value" value={formatCurrency(activeResults.total)} isLast />
          </section>
        </div>

        <section className="mt-6 rounded-2xl border border-slate-800 bg-white p-6 shadow-sm">
          <h3 className="mb-8 flex items-center justify-center gap-2 text-2xl font-bold text-slate-800">
            <BarChart3 className="h-5 w-5 text-[#2076C7]" />
            Investment Comparison
          </h3>

          <div className="flex items-end justify-center gap-16 py-6">
            <BarColumn
              height={sipBarHeight}
              colorClass="from-[#1CADA3] to-[#22c3b8]"
              label="SIP Investment"
              value={formatCurrency(sipResults.total)}
            />
            <BarColumn
              height={lumpsumBarHeight}
              colorClass="from-[#2076C7] to-[#3b8ae0]"
              label="Lumpsum Investment"
              value={formatCurrency(lumpsumResults.total)}
            />
          </div>

          <div className="mt-8 flex justify-center gap-8 text-sm text-slate-600">
            <LegendDot colorClass="bg-[#1CADA3]" label="SIP Investment" />
            <LegendDot colorClass="bg-[#2076C7]" label="Lumpsum Investment" />
          </div>
        </section>

        <section className="mt-6 grid gap-4 md:grid-cols-3">
          <InsightCard
            icon={TrendingUp}
            label="Wealth Gain"
            value={formatCurrency(activeResults.returns)}
          />
          <InsightCard
            icon={Calculator}
            label="Annualized Return"
            value={`${primaryReturn}%`}
          />
          <InsightCard
            icon={Calendar}
            label="Investment Period"
            value={`${primaryDuration} Years`}
          />
        </section>
      </div>
    </div>
  );
}

function CalculatorSlider({
  label,
  valueLabel,
  min,
  max,
  step,
  value,
  onChange,
  startLabel,
  endLabel,
}: {
  label: string;
  valueLabel: string;
  min: number;
  max: number;
  step: number;
  value: number;
  onChange: (value: number) => void;
  startLabel: string;
  endLabel: string;
}) {
  return (
    <div className="mb-6">
      <div className="mb-3 flex items-center justify-between">
        <span className="font-semibold text-slate-800">{label}</span>
        <div className="flex items-center gap-1 rounded-lg border border-slate-200 bg-slate-50 p-1.5">
          <button
            type="button"
            onClick={() => onChange(Math.max(min, Number((value - step).toFixed(1))))}
            className="rounded p-1 text-slate-500 transition hover:bg-white hover:text-rose-500"
          >
            <Minus className="h-4 w-4" />
          </button>
          <span className="min-w-[110px] text-center font-bold text-[#1CADA3]">{valueLabel}</span>
          <button
            type="button"
            onClick={() => onChange(Math.min(max, Number((value + step).toFixed(1))))}
            className="rounded p-1 text-slate-500 transition hover:bg-white hover:text-emerald-500"
          >
            <Plus className="h-4 w-4" />
          </button>
        </div>
      </div>

      <input
        type="range"
        min={min}
        max={max}
        step={step}
        value={value}
        onChange={(e) => onChange(Number(e.target.value))}
        className="w-full cursor-pointer appearance-none rounded-lg bg-slate-200 accent-[#1CADA3]"
      />

      <div className="mt-2 flex justify-between text-sm text-slate-500">
        <span>{startLabel}</span>
        <span>{endLabel}</span>
      </div>
    </div>
  );
}

function SummaryRow({
  label,
  value,
  isLast = false,
}: {
  label: string;
  value: string;
  isLast?: boolean;
}) {
  return (
    <div className={`flex items-center justify-between py-5 ${isLast ? "" : "border-b border-slate-200"}`}>
      <span className="text-lg text-slate-600">{label}</span>
      <span className="text-xl font-bold text-[#1CADA3]">{value}</span>
    </div>
  );
}

function BarColumn({
  height,
  colorClass,
  label,
  value,
}: {
  height: number;
  colorClass: string;
  label: string;
  value: string;
}) {
  return (
    <div className="flex flex-col items-center">
      <div
        className={`relative w-16 rounded-t-lg bg-gradient-to-t ${colorClass} shadow-lg transition-all duration-700`}
        style={{ height: `${Math.max(height, 36)}px` }}
      >
        <div className="absolute -top-8 left-1/2 -translate-x-1/2 whitespace-nowrap text-lg font-bold text-slate-800">
          {value}
        </div>
      </div>
      <div className="mt-4 text-sm font-semibold text-slate-800">{label}</div>
    </div>
  );
}

function LegendDot({ colorClass, label }: { colorClass: string; label: string }) {
  return (
    <div className="flex items-center gap-2">
      <span className={`h-3 w-3 rounded ${colorClass}`} />
      <span>{label}</span>
    </div>
  );
}

function InsightCard({
  icon: Icon,
  label,
  value,
}: {
  icon: typeof TrendingUp;
  label: string;
  value: string;
}) {
  return (
    <div className="rounded-2xl border border-slate-200 bg-white p-6 text-center shadow-sm">
      <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-teal-50 text-[#1CADA3]">
        <Icon className="h-5 w-5" />
      </div>
      <div className="mb-2 text-sm text-slate-500">{label}</div>
      <div className="text-xl font-bold text-slate-800">{value}</div>
    </div>
  );
}

function PieSummaryIcon() {
  return <PieChartIcon className="h-5 w-5 text-[#2076C7]" />;
}

function PieChartIcon({ className }: { className?: string }) {
  return <BarChart3 className={className} />;
}
