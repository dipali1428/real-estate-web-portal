import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import {
  Heart,
    Info,
  Loader2,
} from "lucide-react";
import { WELLNESS_FEATURES } from "./data";

interface GroupHealthCalculatorProps {
  openQuote: () => void;
  isDashboard?: boolean;
}

export const GroupHealthCalculator: React.FC<GroupHealthCalculatorProps> = ({
  openQuote,
  isDashboard = false,
}) => {
  const [employees, setEmployees] = useState(100);
  const [avgAge, setAvgAge] = useState("26-30");
  const [industry, setIndustry] = useState("IT");
  const [sumInsured, setSumInsured] = useState(300000); // 3 Lakhs default
  const [premium, setPremium] = useState(0);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);
    const timer = setTimeout(() => {
      let baseRate = 2500;
      // Age multipliers — 5-year bands
      const ageMultipliers: Record<string, number> = {
        "20-25": 0.85,
        "26-30": 1.0,
        "31-35": 1.15,
        "36-40": 1.3,
        "41-45": 1.55,
        "46-50": 1.8,
        "51-55": 2.0,
        "55+": 2.22,
      };

      // Industry multipliers
      const industryMultipliers: Record<string, number> = {
        IT: 0.9,
        Manufacturing: 1.3,
        Healthcare: 1.2,
        Retail: 1.0,
        Finance: 1.1,
        Other: 1.15,
      };

      baseRate *= ageMultipliers[avgAge] ?? 1;
      baseRate *= industryMultipliers[industry] ?? 1;

      if (sumInsured === 500000) baseRate *= 1.45;
      if (sumInsured === 1000000) baseRate *= 2.4;

      if (employees > 500) baseRate *= 0.8;
      else if (employees > 100) baseRate *= 0.85;
      else if (employees > 50) baseRate *= 0.9;

      setPremium(Math.round(baseRate * employees));
      setLoading(false);
    }, 600);
    return () => clearTimeout(timer);
  }, [employees, avgAge, sumInsured, industry]);

  const formatCurrency = (val: number) =>
    new Intl.NumberFormat("en-IN", {
      style: "currency",
      currency: "INR",
      maximumFractionDigits: 0,
    }).format(val);

  return (
    <div className="relative">
      <div className="flex flex-col lg:flex-row gap-8 lg:gap-16 items-start">
        {/* LEFT CONTENT */}
        <div className={`w-full lg:w-5/12 ${isDashboard ? 'pt-0' : 'pt-4 lg:pt-12'}`}>
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
          >
            <span className="inline-flex items-center gap-2 px-4 py-1.5 bg-blue-50 text-[#2076C7] rounded-full text-xs font-bold uppercase tracking-wider mb-6 border border-blue-100">
              <Heart className="w-3.5 h-3.5" />
              Employee Wellness
            </span>
            <h2 className="text-3xl md:text-4xl font-extrabold mb-6 font-sans leading-tight">
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#2076C7] via-[#1CADA3] to-[#2076C7]">
                Group Health Insurance Estimate
              </span>
            </h2>
            <p className="text-slate-600 mb-10 text-lg font-normal leading-relaxed">
              Calculate estimated premium for covering your team against
              hospitalization expenses. Boost employee retention with
              comprehensive health benefits.
            </p>

            <div className="grid sm:grid-cols-2 gap-4">
              {WELLNESS_FEATURES.map((feature, i) => (
                <div
                  key={i}
                  className="flex items-center gap-3 bg-white p-4 rounded-xl border border-slate-200 shadow-sm"
                >
                  <feature.icon
                    className={`w-5 h-5 ${feature.color} shrink-0`}
                  />
                  <span className="text-sm font-bold text-slate-700">
                    {feature.text}
                  </span>
                </div>
              ))}
            </div>

            {/* Disclaimer */}
            <div className="mt-8 flex items-start gap-3 p-4 bg-blue-50/50 rounded-xl text-[#2076C7] text-base border border-blue-100">
              <Info className="w-5 h-5 shrink-0 mt-0.5" />
              <p className="leading-relaxed">
                <span className="font-semibold">Disclaimer: </span>
                Starting premiums are indicative for a base sum insured for a
                healthy group of 100+ employees. Final quotes may vary based on
                group age, industry risk, and chosen add-ons as per IRDAI
                guidelines.
              </p>
            </div>
          </motion.div>
        </div>
        {/* RIGHT CALCULATOR */}
        <div className="w-full lg:w-7/12 max-w-full">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="bg-white rounded-2xl shadow-[0_10px_40px_rgb(0,0,0,0.08)] border border-slate-100 overflow-hidden"
          >
            <div className="bg-gradient-to-r from-[#2076C7] to-[#1CADA3] p-6 sm:p-8 text-white text-center">
              <h3 className="font-bold font-sans text-2xl mb-1">
                GMC Premium Calculator
              </h3>
              <p className="text-white/90 text-sm font-medium">
                Instant Quote for Group Mediclaim
              </p>
            </div>

            <div className="p-6 sm:p-8 space-y-6">
              {/* Employee Count Input */}
              <div className="space-y-4">
                <div className="flex justify-between items-center">
                  <label className="text-sm font-bold text-slate-700">
                    Number of Employees
                  </label>
                  <span className="text-sm font-extrabold text-[#2076C7] bg-blue-50 px-3 py-1.5 rounded-lg border border-blue-100">
                    {employees}
                  </span>
                </div>
                <input
                  type="range"
                  min="5"
                  max="500"
                  step="5"
                  value={employees}
                  onChange={(e) => setEmployees(Number(e.target.value))}
                  className="w-full h-2.5 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-[#1CADA3]"
                />
                <div className="flex justify-between text-xs font-semibold text-slate-400">
                  <span>5</span>
                  <span>500+</span>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
                {/* Sum Insured Select */}
                <div className="space-y-3">
                  <label className="text-sm font-bold text-slate-700 block">
                    Sum Insured / Family
                  </label>
                  <select
                    value={sumInsured}
                    onChange={(e) => setSumInsured(Number(e.target.value))}
                    className="w-full p-4 rounded-xl border border-slate-200 bg-white text-black font-semibold outline-none focus:ring-4 focus:ring-[#2076C7]/10 transition-all appearance-none cursor-pointer"
                  >
                    <option value={200000}>₹2 Lakhs</option>
                    <option value={300000}>₹3 Lakhs</option>
                    <option value={500000}>₹5 Lakhs</option>
                    <option value={1000000}>₹10 Lakhs</option>
                  </select>
                </div>
                {/* Avg Age Select */}
                <div className="space-y-3">
                  <label className="text-sm font-bold text-slate-700 block text-left">
                    Avg. Age Group
                  </label>
                  <select
                    value={avgAge}
                    onChange={(e) => setAvgAge(e.target.value)}
                    className="w-full p-4 rounded-xl border border-slate-200 bg-white text-black font-semibold outline-none focus:ring-4 focus:ring-[#2076C7]/10 transition-all appearance-none cursor-pointer"
                  >
                    <option value="20-25">20 – 25 Yrs</option>
                    <option value="26-30">26 – 30 Yrs</option>
                    <option value="31-35">31 – 35 Yrs</option>
                    <option value="36-40">36 – 40 Yrs</option>
                    <option value="41-45">41 – 45 Yrs</option>
                    <option value="46-50">46 – 50 Yrs</option>
                    <option value="51-55">51 – 55 Yrs</option>
                    <option value="55+">55+ Yrs</option>
                  </select>
                </div>
                {/* Industry Select */}
                <div className="space-y-3">
                  <label className="text-sm font-bold text-slate-700 block text-left">
                    Industry Type
                  </label>
                  <select
                    value={industry}
                    onChange={(e) => setIndustry(e.target.value)}
                    className="w-full p-4 rounded-xl border border-slate-200 bg-white text-black font-semibold outline-none focus:ring-4 focus:ring-[#2076C7]/10 transition-all appearance-none cursor-pointer"
                  >
                    <option value="IT">IT / Software</option>
                    <option value="Manufacturing">Manufacturing</option>
                    <option value="Healthcare">Healthcare</option>
                    <option value="Retail">Retail</option>
                    <option value="Finance">Finance / Banking</option>
                    <option value="Other">Other / Services</option>
                  </select>
                </div>
              </div>

              {/* Total Premium Output */}
              <div className="bg-slate-50 p-4 sm:p-5 rounded-2xl border border-slate-200 text-center">
                <p className="text-sm text-slate-500 font-bold mb-3 uppercase tracking-wide">
                  Estimated Annual Premium
                </p>
                {loading ? (
                  <div className="h-12 flex items-center justify-center gap-3 text-slate-400 font-medium">
                    <Loader2 className="animate-spin w-6 h-6" /> Calculating...
                  </div>
                ) : (
                  <h3 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-slate-900 tracking-tight break-words">
                    {formatCurrency(premium)}
                    <span className="text-sm text-slate-500 font-semibold ml-2 whitespace-nowrap">
                      {" "}
                      + GST
                    </span>
                  </h3>
                )}
                <p className="text-xs text-slate-500 mt-2 italic">
                  Includes maternity & day care procedures
                </p>
              </div>

              {!isDashboard && (
                <button
                  onClick={() => openQuote()}
                  className="w-full py-2.5 md:py-3.5 bg-linear-to-r from-[#2076C7] to-[#1CADA3] text-white font-bold rounded-xl shadow-[0_8px_25px_rgb(32,118,199,0.3)] hover:shadow-[0_8px_30px_rgb(28,173,163,0.4)] hover:-translate-y-1 transition-all duration-300 text-base md:text-lg cursor-pointer"
                >
                  Request Custom Group Quote
                </button>
              )}
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
};