"use client";

import React, { useState, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  TrendingUp,
  Shield,
  PieChart as PieChartIcon,
  ArrowRight,
  AlertCircle,
  Zap,
  Target,
  Activity,
  ChevronDown,
  Info,
  ArrowUpRight,
  Coins,
  Gem,
  BarChart3,
  Clock,
  UserCheck,
  Wallet,
  Lock,
  Unlock,
  Trophy,
  TrendingDown,
  Download,
} from "lucide-react";

/* ================= HELPERS ================= */

const InfoTooltip = ({ content }: { content: string }) => (
  <div className="group relative inline-block ml-1">
    <Info className="w-3.5 h-3.5 text-slate-400 cursor-help" />
    <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 w-48 p-2 bg-slate-800 text-white text-[10px] rounded-lg opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all pointer-events-none z-50">
      {content}
    </div>
  </div>
);
import {
  PieChart,
  Pie,
  Cell,
  ResponsiveContainer,
  Tooltip as RechartsTooltip,
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
} from "recharts";

/* ================= TYPES ================= */

type RiskLevel = "Conservative" | "Balanced" | "Aggressive";

type GoalType =
  | "Wealth Creation"
  | "Retirement"
  | "Passive Income"
  | "Capital Preservation";

interface AllocationItem {
  name: string;
  percentage: number;
  amount: number;
  expectedReturn: number;
  types: string[];
  color: string;
  icon: React.ReactNode;
}

interface Projection {
  year: string;
  value: number;
}

interface WealthTier {
  name: string;
  threshold: number;
  nextThreshold?: number;
  description: string;
  color: string;
  bg: string;
}

/* ================= CONSTANTS ================= */

const PMS_MINIMUM = 5000000;
const AIF_MINIMUM = 10000000;
const EMERGENCY_MONTHS = 6;

const COLORS = {
  blue: "#0056D2",
  green: "#1FAD9F",
  gold: "#F59E0B",
  purple: "#8B5CF6",
  black: "#1e293b",
  slate: "#64748B",
  red: "#EF4444",
};

const RETURNS = {
  equity: 0.12,
  debt: 0.07,
  gold: 0.06,
  pms: 0.14,
  aif: 0.16,
};

/* ================= UTIL ================= */

const formatCurrency = (amount: number) => {
  if (amount >= 10000000) return "₹" + (amount / 10000000).toFixed(2) + " Cr";
  if (amount >= 100000) return "₹" + (amount / 100000).toFixed(2) + " L";
  return "₹" + amount.toLocaleString("en-IN");
};

const compound = (principal: number, rate: number, years: number) =>
  principal * Math.pow(1 + rate, years);

/* ================= COMPONENT ================= */

export default function InvestmentAllocationCalculator() {
  const [savings, setSavings] = useState(8000000); // 80 Lacs default
  const [salary, setSalary] = useState(150000);
  const [goal, setGoal] = useState<GoalType>("Wealth Creation");

  /* ================= WEALTH TIER ENGINE ================= */

  const wealthTier = useMemo((): WealthTier => {
    if (savings < 2500000)
      return {
        name: "Emerging",
        threshold: 0,
        nextThreshold: 2500000,
        description:
          "Foundation building phase. Focus on SIPs and emergency funds.",
        color: "text-blue-500",
        bg: "bg-blue-50",
      };
    if (savings < PMS_MINIMUM)
      return {
        name: "Affluent",
        threshold: 2500000,
        nextThreshold: PMS_MINIMUM,
        description: "Growing wealth. Diversify across Mutual Funds and Debt.",
        color: "text-teal-500",
        bg: "bg-teal-50",
      };
    if (savings < AIF_MINIMUM)
      return {
        name: "HNI",
        threshold: PMS_MINIMUM,
        nextThreshold: AIF_MINIMUM,
        description: "High Net-worth. Eligible for PMS alpha strategies.",
        color: "text-purple-500",
        bg: "bg-purple-50",
      };
    return {
      name: "Ultra HNI",
      threshold: AIF_MINIMUM,
      description: "Strategic Wealth. Full access to AIF and Private Equity.",
      color: "text-slate-900",
      bg: "bg-slate-100",
    };
  }, [savings]);

  const progressToNext = wealthTier.nextThreshold
    ? ((savings - wealthTier.threshold) /
        (wealthTier.nextThreshold - wealthTier.threshold)) *
      100
    : 100;

  /* ================= RISK SCORE ENGINE ================= */

  const riskScore = useMemo(() => {
    let score = 50;
    if (goal === "Wealth Creation") score += 15;
    if (goal === "Passive Income") score -= 5;
    if (goal === "Capital Preservation") score -= 20;
    if (savings > 20000000) score += 10;
    if (salary > 300000) score += 10;
    return Math.max(0, Math.min(100, score));
  }, [goal, savings, salary]);

  const riskLevel: RiskLevel =
    riskScore > 70
      ? "Aggressive"
      : riskScore > 40
        ? "Balanced"
        : "Conservative";

  /* ================= ALLOCATION ENGINE ================= */

  const allocations: AllocationItem[] = useMemo(() => {
    let equity = 50;
    let debt = 40;
    let gold = 10;

    if (riskLevel === "Aggressive") {
      equity = 65;
      debt = 25;
      gold = 10;
    }
    if (riskLevel === "Conservative") {
      equity = 25;
      debt = 65;
      gold = 10;
    }
    if (goal === "Retirement" && riskLevel !== "Aggressive") {
      debt += 5;
      equity -= 5;
    }

    const items: AllocationItem[] = [
      {
        name: "Equity Funds",
        percentage: equity,
        amount: (equity / 100) * savings,
        expectedReturn: RETURNS.equity,
        types: ["Index", "Flexi Cap", "Mid Cap"],
        color: COLORS.blue,
        icon: <TrendingUp className="w-4 h-4" />,
      },
      {
        name: "Debt & Bonds",
        percentage: debt,
        amount: (debt / 100) * savings,
        expectedReturn: RETURNS.debt,
        types: ["Corporate Bonds", "Gilt Funds"],
        color: COLORS.green,
        icon: <Shield className="w-4 h-4" />,
      },
      {
        name: "Gold / Alternatives",
        percentage: gold,
        amount: (gold / 100) * savings,
        expectedReturn: RETURNS.gold,
        types: ["Gold SGB", "Silver ETF"],
        color: COLORS.gold,
        icon: <Coins className="w-4 h-4" />,
      },
    ];

    // Absolute Minimum Ticket Size Logic
    // We only enable these if the user has enough wealth that the minimum ticket
    // doesn't exceed 60% (for PMS) or 40% (for AIF) of their total portfolio.

    const PMS_GATE = PMS_MINIMUM * 1.5; // Recommend starting at 75L
    const AIF_GATE = AIF_MINIMUM * 2; // Recommend starting at 2Cr

    if (savings >= PMS_GATE) {
      // PMS must be AT LEAST 50L.
      const pmsAmt = Math.max(PMS_MINIMUM, savings * 0.15);
      const pmsWeight = Math.min(40, (pmsAmt / savings) * 100); // Cap at 40% max

      // Rebalance core items
      const currentTotal = items.reduce(
        (sum, item) => sum + item.percentage,
        0,
      );
      items.forEach((item) => {
        const reduction = (item.percentage / currentTotal) * pmsWeight;
        item.percentage = Math.max(5, item.percentage - reduction); // Maintain minimum 5%
      });

      items.push({
        name: "PMS (Prof. Mgmt)",
        percentage: pmsWeight,
        amount: pmsAmt,
        expectedReturn: RETURNS.pms,
        types: ["Discretionary Equity"],
        color: COLORS.purple,
        icon: <Gem className="w-4 h-4" />,
      });
    }

    if (savings >= AIF_GATE) {
      // AIF must be AT LEAST 1Cr.
      const aifAmt = Math.max(AIF_MINIMUM, savings * 0.1);
      const aifWeight = Math.min(20, (aifAmt / savings) * 100); // Cap at 20% max

      // Rebalance everything (including PMS if it exists)
      const currentTotal = items.reduce(
        (sum, item) => sum + item.percentage,
        0,
      );
      items.forEach((item) => {
        const reduction = (item.percentage / currentTotal) * aifWeight;
        item.percentage = Math.max(5, item.percentage - reduction); // Maintain minimum 5%
      });

      items.push({
        name: "AIF (Private Equity)",
        percentage: aifWeight,
        amount: aifAmt,
        expectedReturn: RETURNS.aif,
        types: ["Cat II Venture Cap"],
        color: COLORS.black,
        icon: <Target className="w-4 h-4" />,
      });
    }

    // Clean up percentages to ensure they sum to exactly 100
    const totalPerc = items.reduce((sum, item) => sum + item.percentage, 0);
    if (totalPerc !== 100) {
      items[0].percentage += 100 - totalPerc;
    }

    // Round percentages for display
    items.forEach(
      (item) => (item.percentage = Number(item.percentage.toFixed(1))),
    );
    items.forEach((item) => (item.amount = (item.percentage / 100) * savings));

    return items.sort((a, b) => b.percentage - a.percentage);
  }, [savings, riskLevel, goal]);

  /* ================= EXPECTED RETURN & PROJECTIONS ================= */

  const avgReturn = useMemo(() => {
    const total = allocations.reduce(
      (sum, a) => sum + (a.percentage / 100) * a.expectedReturn,
      0,
    );
    return total * 100;
  }, [allocations]);

  const projections = useMemo(() => {
    const rate = avgReturn / 100;
    return [0, 5, 10, 15, 20].map((y) => ({
      year: `Year ${y}`,
      value: Math.round(compound(savings, rate, y) / 100000), // In Lacs for graph
    }));
  }, [savings, avgReturn]);

  /* ================= INSIGHTS ================= */

  const emergencyFund = salary * EMERGENCY_MONTHS;
  const isUnderFunded = savings < emergencyFund;

  /* ================= TAX & METRICS ENGINE ================= */

  const taxEfficiency = useMemo(() => {
    const equityFunds =
      allocations.find((a) => a.name === "Equity Funds")?.percentage || 0;
    const pms =
      allocations.find((a) => a.name.includes("PMS"))?.percentage || 0;
    const totalEquity = equityFunds + pms;
    const debtAllocation =
      allocations.find((a) => a.name === "Debt & Bonds")?.percentage || 0;

    if (totalEquity > 60)
      return { label: "Tax Efficient", color: "text-green-600", icon: Shield };
    if (debtAllocation > 60)
      return {
        label: "Taxable Income",
        color: "text-amber-600",
        icon: TrendingDown,
      };
    return {
      label: "Balanced Tax Impact",
      color: "text-blue-600",
      icon: BarChart3,
    };
  }, [allocations]);

  const metrics = useMemo(() => {
    const sharpeRatio = (avgReturn - 6) / 12; // Simplified Sharpe
    const diversificationScore = allocations.length * 20;
    return { sharpeRatio, diversificationScore };
  }, [allocations, avgReturn]);

  const rebalanceNeeded = useMemo(() => {
    const equity =
      allocations.find((a) => a.name === "Equity Funds")?.percentage || 0;
    const target =
      riskLevel === "Aggressive" ? 65 : riskLevel === "Balanced" ? 50 : 25;
    return Math.abs(equity - target) > 10;
  }, [allocations, riskLevel]);

  /* ================= UI HELPERS ================= */

  const cardVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
  };

  return (
    <section className="bg-[#F8FCFC] min-h-screen py-8 px-3 md:py-12 md:px-10">
      <div className="max-w-7xl mx-auto">
        {/* Header with Wealth Tier Progression */}
        <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center mb-12 gap-8">
          <div className="flex-1">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              className="inline-flex items-center gap-2 px-3 py-1 bg-[#E6F0FF] rounded-full text-[10px] font-bold text-[#0056D2] uppercase tracking-[0.2em] mb-4"
            >
              <Zap className="w-3.5 h-3.5" />
              Elite Wealth Architect
            </motion.div>
            <h1 className="text-3xl md:text-5xl font-black text-slate-900 tracking-tight">
              Master Your{" "}
              <span className="bg-gradient-to-r from-[#0056D2] to-[#1FAD9F] bg-clip-text text-transparent">
                Financial Legacy
              </span>
            </h1>
            <p className="text-slate-500 mt-2 text-lg max-w-xl font-normal">
              Sophisticated allocation logic tailored to institutional
              thresholds.
            </p>
          </div>

          <div className="flex flex-col sm:flex-row lg:flex-col items-stretch sm:items-center lg:items-end gap-4 w-full lg:w-auto">
            {/* Export Button */}
            <button
              onClick={() => {
                console.log("Exporting Strategy...", {
                  allocations,
                  projections,
                  wealthTier: wealthTier.name,
                  riskLevel,
                  avgReturn,
                });
              }}
              className="px-4 py-2 border border-slate-200 rounded-xl text-sm font-medium hover:bg-slate-50 transition-colors flex items-center justify-center gap-2 bg-white"
            >
              <Download className="w-4 h-4" />
              Export Strategy
            </button>

            {/* Risk Profile Badge */}
            <div
              className={`px-4 py-2 rounded-full text-xs font-bold inline-flex items-center justify-center gap-2 ${
                riskLevel === "Aggressive"
                  ? "bg-purple-100 text-purple-700"
                  : riskLevel === "Balanced"
                    ? "bg-green-100 text-green-700"
                    : "bg-blue-100 text-blue-700"
              }`}
            >
              <Target className="w-3.5 h-3.5" />
              {riskLevel} Portfolio
              <span className="ml-2 text-[10px] opacity-70 border-l border-current pl-2">
                Score: {riskScore}
              </span>
            </div>
          </div>
        </div>

        <div className="flex flex-col lg:flex-row gap-8 mb-12">
          {/* Wealth Tier Status Card */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="bg-white p-4 md:p-6 rounded-[1.5rem] md:rounded-[2rem] shadow-sm border border-slate-100 flex flex-col sm:flex-row items-center gap-6 flex-1"
          >
            <div
              className={`w-16 h-16 ${wealthTier.bg} rounded-3xl flex items-center justify-center ${wealthTier.color}`}
            >
              <Trophy className="w-8 h-8" />
            </div>
            <div className="flex-1 w-full">
              <div className="flex justify-between items-end mb-2">
                <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">
                  Current Wealth Tier
                </p>
                <p className={`text-sm font-black ${wealthTier.color}`}>
                  {wealthTier.name}
                </p>
              </div>
              <div className="h-2 w-full bg-slate-100 rounded-full overflow-hidden mb-2">
                <motion.div
                  initial={{ width: 0 }}
                  animate={{ width: `${progressToNext}%` }}
                  className={`h-full bg-gradient-to-r from-[#0056D2] to-[#1FAD9F] rounded-full`}
                />
              </div>
              {wealthTier.nextThreshold && (
                <p className="text-[10px] text-slate-400 font-medium">
                  {formatCurrency(wealthTier.nextThreshold - savings)} to unlock{" "}
                  <span className="font-bold text-slate-600">
                    {wealthTier.name === "Emerging"
                      ? "Affluent"
                      : wealthTier.name === "Affluent"
                        ? "HNI"
                        : "Ultra HNI"}
                  </span>
                </p>
              )}
            </div>
          </motion.div>
        </div>

        <div className="grid lg:grid-cols-12 gap-8 items-start">
          {/* LEFT COLUMN: CONTROLS */}
          <div className="lg:col-span-4 space-y-6">
            <motion.div
              variants={cardVariants}
              initial="hidden"
              animate="visible"
              className="bg-white p-8 rounded-[2rem] shadow-sm border border-slate-100"
            >
              <div className="space-y-10">
                {/* Savings Slider */}
                <div className="space-y-6">
                  <div className="flex justify-between items-end">
                    <div className="flex items-center gap-2">
                      <label className="text-xs font-bold text-slate-400 uppercase tracking-widest flex items-center">
                        Investable Assets
                        <InfoTooltip content="Liquid assets including stocks, mutual funds, FD, and cash" />
                      </label>
                    </div>
                    <span className="text-2xl font-black text-[#0056D2]">
                      {formatCurrency(savings)}
                    </span>
                  </div>
                  <input
                    type="range"
                    min="500000"
                    max="50000000"
                    step="100000"
                    value={savings}
                    onChange={(e) => setSavings(Number(e.target.value))}
                    className="w-full h-1.5 bg-slate-100 rounded-lg appearance-none cursor-pointer accent-[#0056D2]"
                  />
                  <div className="flex justify-between text-[10px] font-bold text-slate-400 uppercase tracking-tighter">
                    <span className={savings >= 500000 ? "text-[#0056D2]" : ""}>
                      ₹5L
                    </span>
                    <div
                      className={`flex flex-col items-center ${savings >= PMS_MINIMUM ? "text-purple-600" : ""}`}
                    >
                      <span className="flex items-center gap-1">
                        {savings >= PMS_MINIMUM ? (
                          <Unlock size={8} />
                        ) : (
                          <Lock size={8} />
                        )}{" "}
                        PMS
                      </span>
                      <span>₹50L</span>
                    </div>
                    <div
                      className={`flex flex-col items-center ${savings >= AIF_MINIMUM ? "text-slate-900" : ""}`}
                    >
                      <span className="flex items-center gap-1">
                        {savings >= AIF_MINIMUM ? (
                          <Unlock size={8} />
                        ) : (
                          <Lock size={8} />
                        )}{" "}
                        AIF
                      </span>
                      <span>₹1Cr</span>
                    </div>
                    <span>₹5Cr+</span>
                  </div>
                </div>

                {/* Salary Slider */}
                <div className="space-y-6">
                  <div className="flex justify-between items-end">
                    <label className="text-xs font-bold text-slate-400 uppercase tracking-widest">
                      Monthly Take-Home
                    </label>
                    <span className="text-xl font-bold text-slate-800">
                      {formatCurrency(salary)}
                    </span>
                  </div>
                  <input
                    type="range"
                    min="25000"
                    max="1000000"
                    step="5000"
                    value={salary}
                    onChange={(e) => setSalary(Number(e.target.value))}
                    className="w-full h-1.5 bg-slate-100 rounded-lg appearance-none cursor-pointer accent-[#1FAD9F]"
                  />
                </div>

                {/* Goal Dropdown */}
                <div className="space-y-4">
                  <label className="text-xs font-bold text-slate-400 uppercase tracking-widest">
                    Strategy Objective
                  </label>
                  <div className="relative group">
                    <select
                      value={goal}
                      onChange={(e) => setGoal(e.target.value as GoalType)}
                      className="w-full p-4 bg-slate-50 border border-slate-100 rounded-xl font-bold text-slate-700 appearance-none outline-none focus:ring-2 focus:ring-[#0056D2] transition-all cursor-pointer"
                    >
                      <option value="Wealth Creation">
                        Aggressive Wealth Creation
                      </option>
                      <option value="Retirement">Sustainable Retirement</option>
                      <option value="Passive Income">
                        Optimized Passive Income
                      </option>
                      <option value="Capital Preservation">
                        Strategic Preservation
                      </option>
                    </select>
                    <ChevronDown className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none group-hover:text-[#0056D2] transition-colors" />
                  </div>
                </div>
              </div>
            </motion.div>

            {/* Elite Milestone Tracker */}
            <AnimatePresence>
              {savings < AIF_MINIMUM && (
                <motion.div
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, scale: 0.9 }}
                  className="bg-white p-6 rounded-[2rem] shadow-sm border border-slate-100 border-l-4 border-l-[#1FAD9F]"
                >
                  <div className="flex items-center gap-3 mb-4">
                    <div className="p-2 bg-[#E6F7F5] rounded-xl text-[#1FAD9F]">
                      <ArrowUpRight className="w-5 h-5" />
                    </div>
                    <h4 className="font-bold text-slate-800 text-sm">
                      Next Major Unlock
                    </h4>
                  </div>
                  <p className="text-xs text-slate-500 mb-4 leading-relaxed">
                    You are{" "}
                    {formatCurrency(
                      savings < PMS_MINIMUM
                        ? PMS_MINIMUM - savings
                        : AIF_MINIMUM - savings,
                    )}{" "}
                    away from unlocking
                    <span className="font-black text-slate-800">
                      {" "}
                      {savings < PMS_MINIMUM
                        ? "PMS Discretionary Portfolios"
                        : "Alternative Investment Funds"}
                    </span>
                    .
                  </p>
                  <div className="grid grid-cols-2 gap-3 text-center">
                    <div className="bg-slate-50 p-3 rounded-2xl">
                      <p className="text-[8px] font-bold text-slate-400 uppercase mb-1">
                        Target Alpha
                      </p>
                      <p className="text-xs font-bold text-[#1FAD9F]">
                        +{savings < PMS_MINIMUM ? "2.5%" : "4.0%"} p.a.
                      </p>
                    </div>
                    <div className="bg-slate-50 p-3 rounded-2xl">
                      <p className="text-[8px] font-bold text-slate-400 uppercase mb-1">
                        Status
                      </p>
                      <p className="text-xs font-bold text-slate-600">
                        {Math.round(progressToNext)}% Ready
                      </p>
                    </div>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>

            {/* Emergency Fund Analysis */}
            <motion.div
              variants={cardVariants}
              initial="hidden"
              animate="visible"
              className={`p-6 rounded-[2rem] border transition-all ${isUnderFunded ? "bg-red-50 border-red-100" : "bg-green-50 border-green-100"}`}
            >
              <div className="flex items-center gap-4">
                <div
                  className={`p-3 rounded-2xl ${isUnderFunded ? "bg-red-100 text-red-500" : "bg-green-100 text-green-500"}`}
                >
                  {isUnderFunded ? (
                    <AlertCircle className="w-6 h-6" />
                  ) : (
                    <Shield className="w-6 h-6" />
                  )}
                </div>
                <div>
                  <p
                    className={`text-[10px] font-bold uppercase tracking-widest ${isUnderFunded ? "text-red-800" : "text-green-800"}`}
                  >
                    Liquidity Shield
                  </p>
                  <p className="text-xs font-medium text-slate-600 mt-1">
                    {isUnderFunded
                      ? `Need ${formatCurrency(emergencyFund)} for safety.`
                      : `Shield active with ${formatCurrency(emergencyFund)} buffer.`}
                  </p>
                </div>
              </div>
            </motion.div>
          </div>

          {/* RIGHT COLUMN: VISUALS */}
          <div className="lg:col-span-8 space-y-8">
            <div className="grid md:grid-cols-2 gap-8">
              {/* ALLOCATION CHART */}
              <motion.div
                variants={cardVariants}
                initial="hidden"
                animate="visible"
                className="bg-white p-6 md:p-8 rounded-[1.5rem] md:rounded-[2.5rem] shadow-sm border border-slate-100"
              >
                <div className="flex items-center justify-between mb-8">
                  <h3 className="text-lg font-black text-slate-800">
                    Asset Composition
                  </h3>
                  <PieChartIcon className="w-5 h-5 text-[#0056D2]" />
                </div>

                <div className="h-[240px] w-full relative">
                  <ResponsiveContainer width="100%" height="100%">
                    <PieChart>
                      <Pie
                        data={allocations}
                        cx="50%"
                        cy="50%"
                        innerRadius={65}
                        outerRadius={95}
                        paddingAngle={4}
                        dataKey="percentage"
                        animationDuration={1500}
                      >
                        {allocations.map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={entry.color} />
                        ))}
                      </Pie>
                      <RechartsTooltip
                        contentStyle={{
                          borderRadius: "16px",
                          border: "none",
                          boxShadow: "0 10px 25px rgba(0,0,0,0.1)",
                        }}
                      />
                    </PieChart>
                  </ResponsiveContainer>
                  <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none">
                    <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">
                      Efficiency
                    </p>
                    <p className="text-xl font-black text-[#0056D2]">
                      {avgReturn.toFixed(1)}%
                    </p>
                  </div>
                </div>

                <div className="mt-8 space-y-3">
                  {allocations.map((a, i) => (
                    <div
                      key={i}
                      className="flex items-center justify-between group"
                    >
                      <div className="flex items-center gap-3">
                        <div
                          className={`w-3 h-3 rounded-full`}
                          style={{ backgroundColor: a.color }}
                        ></div>
                        <span className="text-sm font-bold text-slate-700 group-hover:text-[#0056D2] transition-colors">
                          {a.name}
                        </span>
                      </div>
                      <div className="flex items-center gap-3">
                        <span className="text-[10px] font-bold text-slate-400">
                          {formatCurrency(a.amount)}
                        </span>
                        <span className="text-sm font-black text-slate-900 min-w-[40px] text-right">
                          {a.percentage}%
                        </span>
                      </div>
                    </div>
                  ))}
                </div>

                <div className="mt-4 flex items-center gap-2 text-xs border-t border-slate-50 pt-4">
                  <taxEfficiency.icon
                    className={`w-4 h-4 ${taxEfficiency.color}`}
                  />
                  <span className={`font-medium ${taxEfficiency.color}`}>
                    {taxEfficiency.label}
                  </span>
                </div>

                <div className="grid grid-cols-3 gap-4 mt-6 pt-6 border-t border-slate-100">
                  <div>
                    <p className="text-[8px] font-bold text-slate-400 uppercase">
                      Sharpe Ratio
                    </p>
                    <p className="text-sm font-black text-slate-800">
                      {metrics.sharpeRatio.toFixed(2)}
                    </p>
                  </div>
                  <div>
                    <p className="text-[8px] font-bold text-slate-400 uppercase">
                      Diversification
                    </p>
                    <p className="text-sm font-black text-slate-800">
                      {metrics.diversificationScore}/100
                    </p>
                  </div>
                  <div>
                    <p className="text-[8px] font-bold text-slate-400 uppercase">
                      Expected Alpha
                    </p>
                    <p className="text-sm font-black text-green-600">
                      +{(avgReturn - 8).toFixed(1)}%
                    </p>
                  </div>
                </div>
              </motion.div>

              {/* GROWTH PROJECTION */}
              <motion.div
                variants={cardVariants}
                initial="hidden"
                animate="visible"
                className="bg-white p-6 md:p-8 rounded-[1.5rem] md:rounded-[2.5rem] shadow-sm border border-slate-100"
              >
                <div className="flex items-center justify-between mb-8">
                  <h3 className="text-lg font-black text-slate-800">
                    Portfolio Trajectory
                  </h3>
                  <BarChart3 className="w-5 h-5 text-[#1FAD9F]" />
                </div>

                <div className="h-[240px] w-full">
                  <ResponsiveContainer width="100%" height="100%">
                    <AreaChart
                      data={projections}
                      margin={{ top: 10, right: 10, left: -20, bottom: 0 }}
                    >
                      <defs>
                        <linearGradient
                          id="colorValue"
                          x1="0"
                          y1="0"
                          x2="0"
                          y2="1"
                        >
                          <stop
                            offset="5%"
                            stopColor={COLORS.green}
                            stopOpacity={0.2}
                          />
                          <stop
                            offset="95%"
                            stopColor={COLORS.green}
                            stopOpacity={0}
                          />
                        </linearGradient>
                      </defs>
                      <XAxis
                        dataKey="year"
                        fontSize={10}
                        tickLine={false}
                        axisLine={false}
                        tick={{ fill: "#94a3b8", fontWeight: 600 }}
                      />
                      <YAxis
                        fontSize={10}
                        tickLine={false}
                        axisLine={false}
                        tick={{ fill: "#94a3b8" }}
                        tickFormatter={(v) => `₹${v}L`}
                      />
                      <CartesianGrid
                        strokeDasharray="3 3"
                        vertical={false}
                        stroke="#f1f5f9"
                      />
                      <RechartsTooltip
                        formatter={(value: number | string | undefined) => [
                          `₹${value ?? 0} Lacs`,
                          "Future Worth",
                        ]}
                        contentStyle={{
                          borderRadius: "16px",
                          border: "none",
                          boxShadow: "0 10px 25px rgba(0,0,0,0.1)",
                        }}
                      />
                      <Area
                        type="monotone"
                        dataKey="value"
                        stroke={COLORS.green}
                        strokeWidth={3}
                        fillOpacity={1}
                        fill="url(#colorValue)"
                      />
                    </AreaChart>
                  </ResponsiveContainer>
                </div>

                <div className="mt-8 p-6 bg-[#E6F7F5] rounded-2xl border border-[#1FAD9F]/20 flex justify-between items-center group cursor-help">
                  <div>
                    <div className="flex items-center gap-3 mb-2">
                      <Clock className="w-4 h-4 text-[#1FAD9F]" />
                      <span className="text-[10px] font-bold text-[#1FAD9F] uppercase tracking-widest">
                        20-Year Horizon
                      </span>
                    </div>
                    <p className="text-lg font-black text-slate-800 group-hover:text-[#1FAD9F] transition-colors">
                      {formatCurrency(
                        projections[projections.length - 1].value * 100000,
                      )}
                    </p>
                  </div>
                  <div className="text-right">
                    <p className="text-[10px] font-bold text-slate-400 uppercase mb-1">
                      Total Return
                    </p>
                    <p className="text-xs font-black text-slate-600">
                      {(
                        (projections[projections.length - 1].value /
                          (savings / 100000)) *
                        100
                      ).toFixed(0)}
                      % Growth
                    </p>
                  </div>
                </div>
              </motion.div>
            </div>

            {/* ELITE COMPONENT DRILLDOWN */}
            <div className="space-y-4">
              <h3 className="text-lg font-black text-slate-800 flex items-center gap-2">
                <Activity className="w-5 h-5 text-purple-600" />
                Strategy Components
              </h3>
              <div className="grid md:grid-cols-2 gap-6">
                {allocations.map((item, idx) => (
                  <motion.div
                    key={idx}
                    variants={cardVariants}
                    initial="hidden"
                    animate="visible"
                    transition={{ delay: 0.1 * idx }}
                    className="bg-white p-5 md:p-6 rounded-2xl md:rounded-3xl shadow-sm border border-slate-100 hover:shadow-md transition-all group overflow-hidden"
                  >
                    <div className="flex items-start justify-between mb-4">
                      <div className="flex items-center gap-3">
                        <div
                          className={`p-3 rounded-2xl bg-slate-50`}
                          style={{ color: item.color }}
                        >
                          {item.icon}
                        </div>
                        <div>
                          <h4 className="font-bold text-slate-800 text-sm">
                            {item.name}
                          </h4>
                          <div className="flex flex-wrap gap-1 mt-1">
                            {item.types.map((t, ti) => (
                              <span
                                key={ti}
                                className="text-[8px] font-bold text-slate-400 bg-slate-50 px-2 py-0.5 rounded border border-slate-100 uppercase tracking-tighter"
                              >
                                {t}
                              </span>
                            ))}
                          </div>
                        </div>
                      </div>
                      <div className="text-right">
                        <p className="text-sm font-black text-slate-900">
                          {formatCurrency(item.amount)}
                        </p>
                        <p className="text-[10px] font-bold text-slate-400 uppercase">
                          {item.percentage}%
                        </p>
                      </div>
                    </div>

                    <div className="w-full bg-slate-50 h-1 rounded-full overflow-hidden">
                      <motion.div
                        initial={{ width: 0 }}
                        animate={{ width: `${item.percentage}%` }}
                        className="h-full rounded-full"
                        style={{ backgroundColor: item.color }}
                      />
                    </div>
                  </motion.div>
                ))}

                {/* Locked/Placeholder for Advanced Tiers */}
                {savings < AIF_MINIMUM && (
                  <motion.div className="bg-slate-50/50 p-6 rounded-3xl border border-dashed border-slate-200 flex flex-col items-center justify-center text-center opacity-70 group hover:opacity-100 transition-opacity">
                    <Lock
                      size={20}
                      className="text-slate-400 mb-2 group-hover:text-slate-600 transition-colors"
                    />
                    <p className="text-xs font-bold text-slate-500 uppercase tracking-widest">
                      Locked: {savings < PMS_MINIMUM ? "PMS Tier" : "AIF Tier"}
                    </p>
                    <p className="text-[10px] text-slate-400 mt-1 max-w-[200px]">
                      Reach{" "}
                      {formatCurrency(
                        savings < PMS_MINIMUM ? PMS_MINIMUM : AIF_MINIMUM,
                      )}{" "}
                      to unlock{" "}
                      {savings < PMS_MINIMUM ? "Equity Alpha" : "Private Deals"}
                      .
                    </p>
                  </motion.div>
                )}
              </div>
            </div>

            {/* Rebalancing Recommendation */}
            {rebalanceNeeded && (
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                className="bg-amber-50 border border-amber-200 p-4 rounded-2xl flex items-center gap-3"
              >
                <AlertCircle className="w-5 h-5 text-amber-600" />
                <p className="text-xs text-amber-800 font-medium">
                  Portfolio drift detected. Consider rebalancing to maintain
                  your{" "}
                  <span className="font-bold">{riskLevel.toLowerCase()}</span>{" "}
                  strategy.
                </p>
              </motion.div>
            )}

            {/* FINAL CONVERSION BOX */}
            <motion.div
              variants={cardVariants}
              initial="hidden"
              animate="visible"
              className="bg-slate-900 p-6 md:p-10 rounded-[2rem] md:rounded-[3rem] text-white shadow-2xl relative overflow-hidden group"
            >
              <div className="absolute top-0 right-0 p-16 opacity-5 pointer-events-none group-hover:scale-110 transition-transform duration-700">
                <Trophy className="w-48 h-48" />
              </div>

              <div className="relative z-10 flex flex-col md:flex-row items-center justify-between gap-10">
                <div className="space-y-4">
                  <div className="inline-flex items-center gap-2 px-3 py-1 bg-white/10 rounded-full text-[9px] font-bold text-white/70 uppercase tracking-widest border border-white/10">
                    <UserCheck className="w-3.5 h-3.5" />
                    Institutional Grade Advisory
                  </div>
                  <h3 className="text-3xl font-black tracking-tight leading-tight">
                    Ready to Build Your <br />
                    <span className="text-[#1FAD9F]">HNI Strategy?</span>
                  </h3>
                  <p className="text-sm text-white/60 max-w-md font-normal leading-relaxed">
                    Our portfolio managers specialize in{" "}
                    {riskLevel.toLowerCase()} growth and tax-efficient wealth
                    structures. Connect for a bespoke roadmap.
                  </p>
                </div>

                <div className="flex flex-col items-center gap-4">
                  <button
                    className="group relative text-white px-12 py-5 rounded-xl font-bold shadow-xl hover:shadow-2xl transform hover:-translate-y-1 transition-all hover:scale-105 active:scale-95 duration-300 overflow-hidden cursor-pointer flex items-center justify-center gap-3 whitespace-nowrap"
                    style={{
                      background: "linear-gradient(to right, #1CADA3, #2076C7)",
                    }}
                  >
                    <span className="relative z-10 flex items-center gap-3">
                      Consult HNI Specialist
                      <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                    </span>
                    <div
                      className="absolute inset-0 transform scale-x-0 group-hover:scale-x-100 transition-transform origin-left duration-300"
                      style={{
                        background:
                          "linear-gradient(to right, #189B8D, #1A68B0)",
                      }}
                    ></div>
                  </button>
                  <p className="text-[10px] text-white/40 font-bold uppercase tracking-tighter">
                    Typical Onboarding: 24-48 Hours
                  </p>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}
