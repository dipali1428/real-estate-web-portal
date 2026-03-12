"use client";
import { useModal } from "../../../context/ModalContext";

import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { ArrowUpRight, AlertCircle } from "lucide-react";

interface FundData {
  schemeCode: number;
  name: string;
  logo: string;
  tag: string;
  color: string;
  return3Y: string | null;
  return5Y: string | null;
  nav: string | null;
  navDate: string | null;
  isLoading: boolean;
  error: string | null;
}

const initialFunds: FundData[] = [
  {
    schemeCode: 122639,
    name: "Parag Parikh Flexi Cap Fund - Direct Plan - Growth",
    logo: "/Logos/Parag Parikh Financial Advisory Services Ltd (PPFAS).jpg",
    tag: "Equity Scheme Flexi Cap",
    color: "bg-white border-slate-100",
    return3Y: null,
    return5Y: null,
    nav: null,
    navDate: null,
    isLoading: true,
    error: null,
  },
  {
    schemeCode: 119063,
    name: "Hdfc Nifty50 Index Fund",
    logo: "/Logos/HDFC Securities Limited Unlisted Shares.jpg",
    tag: "Index Funds",
    color: "bg-white border-slate-100",
    return3Y: null,
    return5Y: null,
    nav: null,
    navDate: null,
    isLoading: true,
    error: null,
  },
  {
    schemeCode: 125494,
    name: "Sbi Small Cap Fund Regular Plan-Growth",
    logo: "/Logos/SBI Mutual Fund Unlisted Shares.jpg",
    tag: "Mid Cap",
    color: "bg-white border-slate-100",
    return3Y: null,
    return5Y: null,
    nav: null,
    navDate: null,
    isLoading: true,
    error: null,
  },
  {
    schemeCode: 119597,
    name: "Sundaram Mutual Fund",
    logo: "/Logos/sundaram.webp",
    tag: "Equity-Sectoral",
    color: "bg-white border-slate-100",
    return3Y: null,
    return5Y: null,
    nav: null,
    navDate: null,
    isLoading: true,
    error: null,
  },
  {
    schemeCode: 118550,
    name: "Franklin U.S. Opportunities Equity Active Fund of Funds - Direct - IDCW",
    logo: "/Logos/franklin.webp",
    tag: "FoF-Overseas",
    color: "bg-white border-slate-100",
    return3Y: null,
    return5Y: null,
    nav: null,
    navDate: null,
    isLoading: true,
    error: null,
  },
  {
    schemeCode: 120334,
    name: "ICICI Prudential Multi-Asset Fund Direct Growth",
    logo: "/Logos/icici.jpg",
    tag: "Multi-Asset",
    color: "bg-white border-slate-100",
    return3Y: null,
    return5Y: null,
    nav: null,
    navDate: null,
    isLoading: true,
    error: null,
  },
];

const fadeInUp = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
};

const staggerContainer = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.1 } },
};

export default function Funds() {
  const { openSignup } = useModal();
  const [funds, setFunds] = useState<FundData[]>(initialFunds);

  useEffect(() => {
    const fetchReturns = async (fund: FundData) => {
      try {
        const response = await fetch(
          `https://api.mfapi.in/mf/${fund.schemeCode}`
        );

        if (!response.ok) throw new Error("Failed to fetch data");

        const data = await response.json();
        const navData = data.data;

        const latestNav = parseFloat(navData[0].nav);
        const latestNavStr = "₹" + latestNav.toFixed(2);
        const latestDate = navData[0].date;

        const calculateCAGR = (years: number) => {
          const targetDate = new Date();
          targetDate.setFullYear(targetDate.getFullYear() - years);

          const historicalNavObj = navData.find((d: any) => {
            const [day, month, year] = d.date.split("-");
            const dDate = new Date(year, month - 1, day);
            return dDate <= targetDate;
          });

          if (!historicalNavObj) return "N/A";

          const historicalNav = parseFloat(historicalNavObj.nav);

          const cagr =
            (Math.pow(latestNav / historicalNav, 1 / years) - 1) * 100;

          return cagr.toFixed(1) + "%";
        };

        const r3Y = calculateCAGR(3);
        const r5Y = calculateCAGR(5);

        setFunds((prev) =>
          prev.map((f) =>
            f.schemeCode === fund.schemeCode
              ? {
                  ...f,
                  return3Y: r3Y,
                  return5Y: r5Y,
                  nav: latestNavStr,
                  navDate: latestDate,
                  isLoading: false,
                }
              : f
          )
        );
      } catch {
        setFunds((prev) =>
          prev.map((f) =>
            f.schemeCode === fund.schemeCode
              ? { ...f, isLoading: false, error: "Error fetching data" }
              : f
          )
        );
      }
    };

    initialFunds.forEach(fetchReturns);
  }, []);

  return (
    <section
      id="popular"
      className="relative py-10 sm:py-12 px-4 sm:px-6 bg-white rounded-3xl border border-gray-100/80 overflow-hidden"
      style={{
        boxShadow:
          "0 2px 4px rgba(0,0,0,0.04), 0 8px 24px rgba(0,0,0,0.08), inset 0 1px 0 rgba(255,255,255,0.9)",
      }}
    >
      <div className="max-w-7xl mx-auto">

        {/* Heading */}
        <div className="text-center mb-8 sm:mb-10">
          <h2 className="text-xl sm:text-2xl md:text-4xl font-extrabold">
            <span className="text-transparent bg-clip-text bg-linear-to-r from-[#2076C7] via-[#1CADA3] to-[#2076C7]">
              Popular Mutual Funds
            </span>
          </h2>
        </div>

        {/* Cards */}
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6"
        >
          {funds.map((fund, idx) => (
            <motion.div key={idx} variants={fadeInUp} className="flex h-full">

              <div className="bg-white rounded-xl shadow border border-slate-200 flex flex-col h-full w-full">

                {/* Header */}
                <div className="bg-gradient-to-r from-[#F2F8FB] to-[#F7FCFC] p-3 sm:p-4 flex items-start gap-3 min-h-[110px] sm:min-h-[140px]">

                  <div className="w-9 h-9 sm:w-10 sm:h-10 bg-white rounded-xl flex items-center justify-center p-1.5 shrink-0 mt-1">
                    <img
                      src={fund.logo}
                      alt={fund.name}
                      className="w-full h-full object-contain"
                    />
                  </div>

                  <div>
                    <h3 className="font-bold text-[#0F2942] text-sm sm:text-base md:text-lg leading-tight">
                      {fund.name}
                    </h3>

                    <p className="text-xs sm:text-sm text-[#597A96]">
                      {fund.tag}
                    </p>
                  </div>
                </div>

                {/* Data */}
                <div className="space-y-3 sm:space-y-4 flex-grow px-4 py-3">

                  <div className="flex justify-between items-center">
                    <span className="text-[#597A96] font-medium text-sm">
                      Current NAV
                    </span>

                    <span className="font-bold text-[#0F2942] text-base sm:text-lg">
                      {fund.isLoading ? "Loading..." : fund.nav || "N/A"}
                    </span>
                  </div>

                  <div className="flex justify-between items-center">
                    <span className="text-[#597A96] font-medium text-sm">
                      3Y CAGR
                    </span>

                    <span className="font-bold text-[#DE2A56] text-base sm:text-lg">
                      {fund.isLoading ? "..." : fund.return3Y || "N/A"}
                    </span>
                  </div>

                  <div className="flex justify-between items-center">
                    <span className="text-[#597A96] font-medium text-sm">
                      5Y CAGR
                    </span>

                    <span className="font-bold text-[#0F2942] text-base sm:text-lg">
                      {fund.isLoading ? "..." : fund.return5Y || "N/A"}
                    </span>
                  </div>

                  {fund.error && (
                    <div className="text-rose-500 text-xs flex items-center gap-1">
                      <AlertCircle className="w-3 h-3" />
                      {fund.error}
                    </div>
                  )}

                  <div className="text-xs text-slate-400 text-center pt-2">
                    Updated: {fund.isLoading ? "..." : fund.navDate}
                  </div>

                </div>

              </div>

            </motion.div>
          ))}
        </motion.div>

        {/* Button */}
        <div className="mt-12 sm:mt-16 text-center">

          <button
            onClick={openSignup}
            className="group relative text-white px-6 sm:px-8 py-3 sm:py-4 rounded-lg font-semibold text-sm sm:text-lg shadow-lg hover:shadow-xl transform hover:-translate-y-1 transition-all duration-300 overflow-hidden inline-flex items-center justify-center gap-2"
            style={{
              background: "linear-gradient(to right, #1CADA3, #2076C7)",
            }}
          >
            <span className="relative z-10 flex items-center gap-2">
              Start Investing
              <ArrowUpRight className="w-4 h-4 sm:w-5 sm:h-5" />
            </span>

            <div
              className="absolute inset-0 transform scale-x-0 group-hover:scale-x-100 transition-transform origin-left duration-300"
              style={{
                background: "linear-gradient(to right, #189B8D, #1A68B0)",
              }}
            ></div>

          </button>

        </div>

      </div>
    </section>
  );
}