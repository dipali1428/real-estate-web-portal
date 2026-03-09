"use client";

import React, { useState, useEffect, lazy, Suspense } from "react";
import { useModal } from "../../context/ModalContext";
import Link from "next/link";
import { useRouter } from "next/navigation";
import {
  PieChart,
  TrendingUp,
  Shield,
  Search,
  CheckCircle,
  Users,
  Banknote,
  Globe,
  Zap,
  LineChart,
  UserPlus,
  ChevronDown,
  ArrowLeft,
  Sparkles,
  Calendar,
  Layers,
  BarChart2,
  Receipt,
  Coins,
  IndianRupee,
  Plus,
  Minus,
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  Tooltip,
  Legend,
  Filler,
} from "chart.js";
import MutualFundComparison from "./components/MutualFundComparison";
import SIPCalculator from "./components/SIPCalculator";
import MarketOverview from "./components/MarketOverview";
import FinancialGoalPlanner from "./components/FinancialGoalPlanner";
import CTASection from "@/app/component/CTASection";
import Funds from "./components/Funds";

// Register ChartJS Components
ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  Tooltip,
  Legend,
  Filler,
);

// --- Animation Variants ---
const fadeInUp = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } },
};

const staggerContainer = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.1 } },
};

const cardHover = {
  rest: { scale: 1, y: 0 },
  hover: { scale: 1.02, y: -5, transition: { duration: 0.2 } },
};

export default function MutualFundsLandingPage() {
  const { openSignup } = useModal();
  const [expandedIdx, setExpandedIdx] = useState<number | null>(null);
  const [showAllFaqs, setShowAllFaqs] = useState(false);
  const [currentNfoIndex, setCurrentNfoIndex] = useState(0);

  // Auto-rotate NFOs
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentNfoIndex((prevIndex) => (prevIndex + 1) % nfos.length);
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  const getNfoStatus = (launchDateStr: string, closeDateStr: string) => {
    const parseDate = (dateStr: string) => {
      // Handle "02 Feb 2026" format
      const parts = dateStr.split(" ");
      if (parts.length !== 3) return new Date();
      const monthMap: { [key: string]: number } = {
        Jan: 0,
        Feb: 1,
        Mar: 2,
        Apr: 3,
        May: 4,
        Jun: 5,
        Jul: 6,
        Aug: 7,
        Sep: 8,
        Oct: 9,
        Nov: 10,
        Dec: 11,
      };
      const day = parseInt(parts[0], 10);
      const month = monthMap[parts[1]] !== undefined ? monthMap[parts[1]] : 0;
      const year = parseInt(parts[2], 10);
      return new Date(year, month, day);
    };

    const today = new Date();
    // Reset time for comparison
    today.setHours(0, 0, 0, 0);

    const launch = parseDate(launchDateStr);
    const close = parseDate(closeDateStr);

    if (today < launch) return "UPCOMING NFO";
    if (today >= launch && today <= close) return "LIVE NFO";
    return "CLOSED NFO";
  };

  // Consolidated Fund Categories
  const categories = [
    {
      title: "Equity Funds",
      desc: "Capital growth by investing in stocks of companies across market caps.",
      icon: TrendingUp,
      color: "text-[#1CADA3]",
      bg: "bg-[#1CADA3]/10",
    },
    {
      title: "Debt Funds",
      desc: "Stable returns and capital preservation via fixed-income securities.",
      icon: Shield,
      color: "text-[#1CADA3]",
      bg: "bg-[#1CADA3]/10",
    },
    {
      title: "Global Funds",
      desc: "Diversify your portfolio by investing in international markets.",
      icon: Globe,
      color: "text-[#1CADA3]",
      bg: "bg-[#1CADA3]/10",
    },
    {
      title: "ETF Funds",
      desc: "Exchange-traded funds offering low costs and high liquidity.",
      icon: Zap,
      color: "text-[#1CADA3]",
      bg: "bg-[#1CADA3]/10",
    },
    {
      title: "Hybrid Funds",
      desc: "Balanced exposure to both equity and debt instruments.",
      icon: Layers,
      color: "text-[#1CADA3]",
      bg: "bg-[#1CADA3]/10",
    },
    {
      title: "Index Funds",
      desc: "Low-cost funds tracking a specific market index.",
      icon: BarChart2,
      color: "text-[#1CADA3]",
      bg: "bg-[#1CADA3]/10",
    },
    {
      title: "Tax Saver (ELSS)",
      desc: "Equity funds offering tax deductions under Section 80C.",
      icon: IndianRupee,
      color: "text-[#1CADA3]",
      bg: "bg-[#1CADA3]/10",
    },
    {
      title: "Commodity Funds",
      desc: "Invest in Gold, Silver, and other commodities.",
      icon: Coins,
      color: "text-[#1CADA3]",
      bg: "bg-[#1CADA3]/10",
    },
  ];

  const benefits = [
    {
      title: "Expert Management",
      desc: "Your money is managed by experienced professionals.",
      icon: Users,
    },
    {
      title: "Diversification",
      desc: "Reduce risk by investing across various sectors and companies.",
      icon: PieChart,
    },
    {
      title: "Liquidity",
      desc: "Withdraw your money easily whenever you need it.",
      icon: Banknote,
    },
    {
      title: "Transparency",
      desc: "Complete visibility into where your money is invested.",
      icon: Search,
    },
  ];

  const steps = [
    {
      title: "Register & KYC",
      desc: "Complete your simple one-time registration.",
      icon: UserPlus,
    },
    {
      title: "Select Fund",
      desc: "Choose from our wide range of curated funds.",
      icon: Search,
    },
    {
      title: "Invest",
      desc: "Start with as low as ₹500 via SIP or Lumpsum.",
      icon: Zap,
    },
    {
      title: "Track Growth",
      desc: "Monitor your portfolio performance in real-time.",
      icon: LineChart,
    },
  ];

  // Combined all NFOs from your prompt
  const nfos = [
    {
      name: "LIC MF Technology Fund",
      type: "Equity Sectoral",
      launchDate: "20 Feb 2026",
      closeDate: "06 Mar 2026",
      minInvestment: "₹5,000",
      desc: "Invests in global and domestic technology companies.",
      logo: "/Logos/lic.png",
    },

    {
      name: "Motilal Oswal Multi Factor Passive FoF",
      type: "Passive / ETF FoF",
      launchDate: "20 Feb 2026",
      closeDate: "06 Mar 2026",
      minInvestment: "₹5,000",
      desc: "Passive strategy combining multiple quantitative factors.",
      logo: "/Logos/motilal.webp",
    },

    {
      name: "Capitalmind Arbitrage Fund",
      type: "Hybrid Arbitrage",
      launchDate: "23 Feb 2026",
      closeDate: "09 Mar 2026",
      minInvestment: "₹5,000",
      desc: "Generates low-risk returns using arbitrage opportunities.",
      logo: "/Logos/capital.png",
    },

    {
      name: "TRUSTMF Mid Cap Fund",
      type: "Equity Midcap",
      launchDate: "27 Feb 2026",
      closeDate: "13 Mar 2026",
      minInvestment: "₹5,000",
      desc: "Focuses on high growth mid-cap companies.",
      logo: "/Logos/trust.png",
    },

    {
      name: "Canara Robeco Banking & Financial Services Fund",
      type: "Sectoral Equity",
      launchDate: "27 Feb 2026",
      closeDate: "13 Mar 2026",
      minInvestment: "₹5,000",
      desc: "Invests in banking and financial sector companies.",
      logo: "/Logos/canararobeco.png",
    },

    {
      name: "Abakkus Small Cap Fund",
      type: "Equity Small Cap",
      launchDate: "26 Feb 2026",
      closeDate: "12 Mar 2026",
      minInvestment: "₹5,000",
      desc: "Invests in emerging small cap businesses.",
      logo: "/Logos/abakkus.jpg",
    },

    {
      name: "Groww Nifty PSU Bank ETF",
      type: "ETF",
      launchDate: "06 Mar 2026",
      closeDate: "20 Mar 2026",
      minInvestment: "₹5,000",
      desc: "Tracks Nifty PSU Bank Index.",
      logo: "/Logos/grow.avif",
    },

    {
      name: "Kotak Quality Overseas Equity FoF",
      type: "Global Equity",
      launchDate: "06 Mar 2026",
      closeDate: "20 Mar 2026",
      minInvestment: "₹5,000",
      desc: "Invests in high quality global companies.",
      logo: "/MF/kotak.png",
    },
  ];

  const faqs = [
    {
      q: "What is a mutual fund, and how does it work?",
      a: "A mutual fund pools money from many investors to buy a diversified portfolio of stocks, bonds, or other assets. It's managed by professional fund managers, giving you instant diversification.",
    },
    {
      q: "What makes your fund's philosophy different?",
      a: 'Our "Quality-At-Reasonable-Price" (QARP) philosophy is core. We systematically invest in financially healthy companies with durable competitive advantages.',
    },
    {
      q: "How do you manage risk beyond volatility?",
      a: "We look beyond price volatility (beta). Our risk management focuses on portfolio durability, including stress-testing against economic downturns.",
    },
    {
      q: "Is my money safe and easily accessible?",
      a: "Mutual funds are regulated, and assets are held separately with a custodian bank. Open-ended funds allow you to redeem units on any business day.",
    },
    {
      q: "What is the minimum investment amount?",
      a: "You can start investing with as little as ₹500/month via SIP. Lump sum investments typically start from ₹5,000, varying by fund scheme.",
    },
    {
      q: "How are mutual fund returns taxed?",
      a: "Taxation depends on the fund type (Equity vs Debt) and holding period. Equity funds held >1 year have LTCG tax of 10% on gains over ₹1 Lakh. Short-term gains are taxed at 15%.",
    },
    {
      q: "Can I stop my SIP anytime?",
      a: "Yes, SIPs are flexible. You can stop, pause, or modify your SIP amount at any time without any penalty from the fund house.",
    },
    {
      q: "What is the difference between Direct and Regular plans?",
      a: "Direct plans have a lower expense ratio as they don't involve distributor commissions, leading to potentially higher returns over the long term compared to Regular plans.",
    },
  ];

  return (
    <div className="min-h-screen bg-gray-50 font-sans text-slate-800">
      {/* HERO SECTION */}
      <header
        id="offers"
        className="relative w-full overflow-hidden pt-12 pb-20 bg-white"
      >
        <div className="container mx-auto px-6 relative z-10">
          <div className="flex flex-col lg:flex-row items-center gap-12">
            {/* LEFT HERO TEXT */}
            <div className="w-full lg:w-1/2 text-center lg:text-left space-y-8">
              <Link
                href="/"
                className="inline-flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium text-gray-700 bg-white/90 backdrop-blur-sm border border-gray-300 hover:bg-white shadow-sm hover:shadow-md active:scale-95 transition-all group mb-2"
              >
                <ArrowLeft
                  className="w-4 h-4 group-hover:-translate-x-1 transition-transform"
                  strokeWidth={2}
                />
                Back to Home
              </Link>
              <br/>
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1, duration: 0.5 }}
                className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-sm font-semibold bg-teal-50 border border-teal-200 text-teal-700 mb-2"
              >
                <span className="w-2 h-2 rounded-full bg-teal-500 animate-pulse inline-block" />
                AMFI Registered &amp; Secure
              </motion.div>
              <motion.h1
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3, duration: 0.7 }}
                className="text-3xl sm:text-4xl md:text-6xl lg:text-7xl font-bold mb-6 min-h-16 md:min-h-20 leading-tight"
                style={{
                  background:
                    "linear-gradient(to right, #2076C7, #1CADA3, #2076C7)",
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                  backgroundClip: "text",
                }}
              >
                Invest Smarter with Expert-Curated Mutual Funds
              </motion.h1>
              <motion.p
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4, duration: 0.7 }}
                className="text-lg md:text-xl text-slate-700 max-w-2xl mx-auto lg:mx-0 leading-relaxed font-normal"
              >
                Start your journey towards financial freedom with our curated
                selection of top-performing funds and expert guidance.
              </motion.p>
              {/* Change this section in your Hero */}
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5, duration: 0.7 }}
                className="flex flex-col sm:flex-row justify-center lg:justify-start gap-4 pt-4"
              >
                {/* REPLACED LINK WITH BUTTON ONCLICK */}
                <button
                  onClick={openSignup}
                  className="group relative text-white px-8 py-4 rounded-lg font-semibold text-lg shadow-lg hover:shadow-xl transform hover:-translate-y-1 transition-all duration-300 overflow-hidden cursor-pointer"
                  style={{
                    background: "linear-gradient(to right, #1CADA3, #2076C7)",
                  }}
                >
                  <span className="relative z-10">Start Investing</span>
                  <div
                    className="absolute inset-0 transform scale-x-0 group-hover:scale-x-100 transition-transform origin-left duration-300"
                    style={{
                      background: "linear-gradient(to right, #189B8D, #1A68B0)",
                    }}
                  ></div>
                </button>

                <Link href="#popular">
                  <button
                    className="group relative bg-white px-8 py-4 rounded-lg font-semibold text-lg border-2 hover:bg-blue-50 transform hover:-translate-y-1 transition-all duration-300 shadow-md hover:shadow-lg w-full sm:w-auto"
                    style={{ color: "#2076C7", borderColor: "#2076C7" }}
                  >
                    <span className="relative z-10 flex items-center justify-center gap-2">
                      Explore Funds
                      <svg
                        className="w-5 h-5 transform group-hover:translate-x-1 transition-transform"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M13 7l5 5m0 0l-5 5m5-5H6"
                        />
                      </svg>
                    </span>
                  </button>
                </Link>
              </motion.div>
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.8 }}
                className="flex items-center gap-6 pt-4 text-sm text-slate-600 font-medium"
              >
                <div className="flex items-center gap-2">
                  <CheckCircle className="w-5 h-5 text-green-500" /> Paperless &
                  Secure
                </div>
              </motion.div>
            </div>
            {/* RIGHT HERO: DYNAMIC NFO CAROUSEL */}
            <div className="w-full lg:w-1/2 flex items-center justify-center relative h-[320px] sm:h-[400px] lg:h-[600px]">
              <AnimatePresence mode="wait">
                <motion.div
                  key={currentNfoIndex}
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  transition={{ duration: 0.5 }}
                  className="absolute w-full max-w-md lg:max-w-xl"
                >
                  {/* DYNAMIC LABEL OUTSIDE BOUNDARY */}
                  <div className="absolute -top-10 left-0 right-0 flex justify-center z-20">
                    <div
                      className={`px-4 py-1.5 rounded-full text-xs font-bold shadow-sm border ${
                        getNfoStatus(
                          nfos[currentNfoIndex].launchDate,
                          nfos[currentNfoIndex].closeDate,
                        ) === "LIVE NFO"
                          ? "bg-green-100 text-green-700 border-green-200 animate-pulse"
                          : "bg-blue-100 text-blue-700 border-blue-200"
                      }`}
                    >
                      {getNfoStatus(
                        nfos[currentNfoIndex].launchDate,
                        nfos[currentNfoIndex].closeDate,
                      )}
                    </div>
                  </div>

                  <div className="h-full bg-white rounded-2xl shadow-xl border border-gray-100 overflow-hidden group">
                    <div className="bg-gray-50/50 p-4 lg:p-5 border-b border-gray-100 flex items-start justify-between">
                      <div className="flex items-center gap-3">
                        {nfos[currentNfoIndex].logo && (
                          <img
                            src={nfos[currentNfoIndex].logo}
                            alt={nfos[currentNfoIndex].name + " logo"}
                            className="w-10 h-10 lg:w-12 lg:h-12 object-contain rounded bg-white p-0.5 shadow-sm"
                          />
                        )}
                        <div>
                          <h3 className="text-lg lg:text-2xl font-semibold text-slate-800 line-clamp-1">
                            {nfos[currentNfoIndex].name}
                          </h3>
                          <p className="text-sm lg:text-base text-slate-600 mt-0.5">
                            {nfos[currentNfoIndex].type}
                          </p>
                        </div>
                      </div>
                      <span className="inline-block bg-white/50 text-slate-600 text-[10px] lg:text-xs font-bold px-2 py-1 rounded border border-slate-200 whitespace-nowrap">
                        {currentNfoIndex + 1} / {nfos.length}
                      </span>
                    </div>
                    <div className="p-6 lg:p-8 space-y-5">
                      <p className="text-sm lg:text-lg text-slate-600 min-h-10">
                        {nfos[currentNfoIndex].desc}
                      </p>
                      <div className="space-y-3 lg:space-y-4 pt-2 text-sm lg:text-lg">
                        <div className="flex justify-between items-center border-b border-dashed border-gray-100 pb-2">
                          <span className="text-slate-500 font-medium">
                            Launch Date
                          </span>
                          <span className="font-semibold lg:font-bold text-slate-800 lg:text-xl">
                            {nfos[currentNfoIndex].launchDate}
                          </span>
                        </div>
                        <div className="flex justify-between items-center border-b border-dashed border-gray-100 pb-2">
                          <span className="text-slate-500 font-medium">
                            Closing Date
                          </span>
                          <span className="font-semibold lg:font-bold text-rose-500 lg:text-xl">
                            {nfos[currentNfoIndex].closeDate}
                          </span>
                        </div>
                        <div className="flex justify-between items-center">
                          <span className="text-slate-500 font-medium">
                            Min Investment
                          </span>
                          <span className="font-semibold lg:font-bold text-slate-800 lg:text-xl">
                            {nfos[currentNfoIndex].minInvestment}
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                </motion.div>
              </AnimatePresence>
            </div>
          </div>
        </div>
      </header>

      <main className="container mx-auto px-4 sm:px-6 py-10 sm:py-16 space-y-16 sm:space-y-24">
        {" "}
        {/* MARKET OVERVIEW SECTION */}
        <motion.section
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
        >
          <MarketOverview />
        </motion.section>
        {/* NFO SECTION */}
        <motion.section
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={staggerContainer}
        >
          <div className="text-center mb-12">
            <motion.div className="flex justify-center mb-4">
              <div className="inline-flex items-center gap-2 bg-amber-50 border border-amber-200 px-4 py-2 rounded-full">
                <Sparkles className="w-4 h-4 text-amber-600" />
                <span className="text-xs font-semibold text-amber-700">
                  UPCOMING NFOs
                </span>
              </div>
            </motion.div>
            <motion.h2 className="text-3xl md:text-4xl font-bold font-sans bg-linear-to-r from-[#2076C7] to-[#1CADA3] bg-clip-text text-transparent mb-4">
              New Fund Offers Coming Soon
            </motion.h2>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {nfos.map((nfo, idx) => (
              <motion.div
                key={idx}
                whileHover="hover"
                initial="rest"
                animate="rest"
              >
                <motion.div
                  variants={cardHover}
                  className="relative h-full bg-white rounded-2xl overflow-hidden group flex flex-col w-full border border-gray-100/80"
                  style={{
                    boxShadow:
                      "0 2px 4px rgba(28,173,163,0.04), 0 8px 24px rgba(28,173,163,0.08), inset 0 1px 0 rgba(255,255,255,0.9)",
                  }}
                >
                  <div className="bg-gradient-to-r from-[#F2F8FB] to-[#F7FCFC] p-4 flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      {nfo.logo && (
                        <div className="w-10 h-10 bg-white rounded-xl flex items-center justify-center p-1.5 shrink-0 border border-slate-100">
                          <img
                            src={nfo.logo}
                            alt={nfo.name + " logo"}
                            className="w-full h-full object-contain"
                          />
                        </div>
                      )}
                      <div>
                        <h3 className="font-bold text-[#0F2942] text-lg leading-tight transition-colors line-clamp-1 group-hover:text-[#2076C7]">
                          {nfo.name}
                        </h3>
                        <p className="text-sm text-[#597A96] mt-0.5">
                          {nfo.type}
                        </p>
                      </div>
                    </div>
                    <span
                      className={`text-[10px] font-bold px-2 py-1 rounded-full whitespace-nowrap ml-2 ${
                        getNfoStatus(nfo.launchDate, nfo.closeDate) ===
                        "LIVE NFO"
                          ? "bg-green-100 text-green-700 animate-pulse"
                          : "bg-blue-100 text-blue-700"
                      }`}
                    >
                      {getNfoStatus(nfo.launchDate, nfo.closeDate)}
                    </span>
                  </div>
                  <div className="p-6 space-y-4 flex-grow px-4">
                    <p className="text-lg text-slate-600 line-clamp-2">
                      {nfo.desc}
                    </p>
                    <div className="space-y-4 pt-2 text-lg">
                      <div className="flex justify-between items-center py-1">
                        <span className="text-[#597A96] font-medium text-lg">
                          Launch
                        </span>
                        <span className="font-bold text-[#0F2942] text-xl">
                          {nfo.launchDate}
                        </span>
                      </div>
                      <div className="flex justify-between items-center py-1">
                        <span className="text-[#597A96] font-medium text-lg">
                          Closing
                        </span>
                        <span className="font-bold text-[#DE2A56] text-xl">
                          {nfo.closeDate}
                        </span>
                      </div>
                      <div className="flex justify-between items-center py-1">
                        <span className="text-[#597A96] font-medium text-lg">
                          Min Inv.
                        </span>
                        <span className="font-bold text-[#0F2942] text-xl">
                          {nfo.minInvestment}
                        </span>
                      </div>
                    </div>
                  </div>
                </motion.div>
              </motion.div>
            ))}
          </div>
        </motion.section>
        <Funds />
        {/* FINANCIAL GOAL PLANNER SECTION */}
        <motion.section
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
        >
          <FinancialGoalPlanner />
        </motion.section>
        {/* COMPARISON SECTION */}
        <motion.section
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
        >
          <MutualFundComparison />
        </motion.section>
        {/* SIP CALCULATOR SECTION */}
        <motion.section
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
        >
          <SIPCalculator />
        </motion.section>
        {/* CATEGORIES SECTION */}
        <motion.section
          id="categories"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          variants={staggerContainer}
        >
          <div className="text-center mb-12">
            <motion.h2 className="text-3xl md:text-4xl font-extrabold mb-3">
              <span className="text-transparent bg-clip-text bg-linear-to-r from-[#2076C7] via-[#1CADA3] to-[#2076C7]">
                Explore Fund Categories
              </span>
            </motion.h2>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {categories.map((cat, idx) => (
              <motion.div
                key={idx}
                whileHover="hover"
                initial="rest"
                animate="rest"
              >
                <motion.div
                  variants={cardHover}
                  className="relative h-full bg-white p-8 rounded-2xl overflow-hidden border border-gray-100/80 transition-all duration-300 group cursor-pointer"
                  style={{
                    boxShadow:
                      "0 2px 4px rgba(28,173,163,0.04), 0 8px 24px rgba(28,173,163,0.08), inset 0 1px 0 rgba(255,255,255,0.9)",
                  }}
                >
                  <div
                    className={`w-14 h-14 ${cat.bg} rounded-xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform`}
                  >
                    <cat.icon className={`w-7 h-7 ${cat.color}`} />
                  </div>
                  <h3 className="text-xl font-bold text-slate-800 mb-3 group-hover:text-[#2076C7] transition-colors">
                    {cat.title}
                  </h3>
                  <p className="text-slate-600 leading-relaxed text-lg">
                    {cat.desc}
                  </p>
                </motion.div>
              </motion.div>
            ))}
          </div>
        </motion.section>
        {/* WHY CHOOSE US */}
        <motion.section
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={staggerContainer}
        >
          <div className="text-center mb-16">
            <motion.h2 className="text-3xl md:text-4xl font-extrabold mb-3">
              <span className="text-transparent bg-clip-text bg-linear-to-r from-[#2076C7] via-[#1CADA3] to-[#2076C7]">
                Why Choose Us
              </span>
            </motion.h2>
          </div>

          <div className="w-full grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {benefits.map((benefit, idx) => (
              <motion.div
                key={idx}
                className="relative bg-white p-6 rounded-xl border border-gray-100/80 overflow-hidden transition-all duration-300 hover:-translate-y-1"
                style={{
                  boxShadow:
                    "0 2px 4px rgba(28,173,163,0.04), 0 6px 16px rgba(28,173,163,0.07), inset 0 1px 0 rgba(255,255,255,0.9)",
                }}
              >
                <benefit.icon className="w-10 h-10 text-[#1CADA3] mb-4" />
                <h4 className="text-xl font-bold text-slate-800 mb-2">
                  {benefit.title}
                </h4>
                <p className="text-lg text-slate-600 leading-relaxed">
                  {benefit.desc}
                </p>
              </motion.div>
            ))}
          </div>
        </motion.section>
        {/* MARKET RISK DISCLAIMER */}
        <motion.section
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="mb-12"
        >
          <div className="max-w-4xl mx-auto space-y-4">
            <div className="max-w-4xl mx-auto bg-yellow-50 border border-yellow-200 rounded-xl p-6 shadow-sm">
              <p className="text-sm text-gray-700 text-center leading-relaxed">
                <strong className="text-black">Disclaimer:</strong> Mutual fund
                schemes are subject to market risk. Please read all
                scheme-related documents carefully before investing.
              </p>
            </div>

            <div
              className="relative bg-white border border-gray-100/80 rounded-3xl p-6 flex flex-col md:flex-row items-center gap-4 text-center md:text-left overflow-hidden transition-all duration-300 hover:-translate-y-1"
              style={{
                boxShadow:
                  "0 2px 4px rgba(28,173,163,0.04), 0 8px 24px rgba(28,173,163,0.08), inset 0 1px 0 rgba(255,255,255,0.9)",
              }}
            >
              <div className="w-12 h-12 bg-gray-50 rounded-xl flex items-center justify-center shrink-0 border border-gray-100">
                <Shield className="w-6 h-6 text-gray-500" />
              </div>
              <div>
                <h4 className="text-slate-800 font-semibold mb-1">
                  <b>Infinity Arthvishva Mutual Fund Distributor LLP</b>
                </h4>
                <p className="text-slate-600 text-sm leading-relaxed">
                  Registered with AMFI. In case of any grievances, please write
                  to us or contact the compliance officer.
                  <br />
                  <b> LLPIN ACP</b>-0126 |<b> ARN</b> -347839 |{" "}
                  <b>GST Number</b> -27AALFI4941B1ZH
                </p>
              </div>
            </div>
          </div>
        </motion.section>
        {/* FAQ SECTION */}
        <motion.section
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={staggerContainer}
        >
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-12">
              <motion.h2 className="text-3xl md:text-4xl font-bold font-sans bg-linear-to-r from-[#2076C7] to-[#1CADA3] bg-clip-text text-transparent mb-4">
                Frequently Asked Questions
              </motion.h2>
            </div>

            <div className="space-y-4">
              {(showAllFaqs ? faqs : faqs.slice(0, 5)).map((faq, idx) => (
                <div
                  key={idx}
                  className="border border-gray-100 rounded-2xl overflow-hidden transition-all duration-300 hover:border-blue-200 hover:shadow-md"
                >
                  <button
                    onClick={() =>
                      setExpandedIdx(expandedIdx === idx ? null : idx)
                    }
                    className="w-full px-4 sm:px-6 py-3 sm:py-4 text-left flex justify-between items-start gap-3 bg-gray-50 hover:bg-blue-50/50 transition-colors focus:outline-none cursor-pointer group"
                  >
                    <span className="font-bold text-gray-700 text-base sm:text-lg pr-2 group-hover:text-blue-600 transition-colors">
                      {faq.q}
                    </span>
                    <div
                      className={`p-1.5 rounded-full bg-white border border-gray-300 text-gray-700 transition-transform duration-300 ${expandedIdx === idx ? "rotate-180" : ""}`}
                    >
                      {expandedIdx === idx ? (
                        <Minus size={18} strokeWidth={3} />
                      ) : (
                        <Plus size={18} strokeWidth={3} />
                      )}
                    </div>
                  </button>
                  <AnimatePresence>
                    {expandedIdx === idx && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        className="overflow-hidden"
                      >
                        <div className="px-6 py-4 bg-white text-gray-600 text-base leading-relaxed border-t border-gray-100 animate-fadeIn">
                          {faq.a}
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              ))}
            </div>

            {faqs.length > 5 && (
              <div className="text-center mt-8">
                <button
                  onClick={() => setShowAllFaqs(!showAllFaqs)}
                  className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-blue-50 text-[#2076C7] font-semibold hover:bg-blue-100 transition-colors cursor-pointer"
                >
                  {showAllFaqs ? "View Less" : "View More"}
                  <Plus
                    size={18}
                    className={`transition-transform duration-300 ${showAllFaqs ? "rotate-45" : ""}`}
                  />
                </button>
              </div>
            )}
          </div>
        </motion.section>
      </main>

      {/* CTA SECTION */}
      <CTASection onClick={openSignup} buttonText="Apply Now" />
    </div>
  );
}


