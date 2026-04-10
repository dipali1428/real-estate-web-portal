import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import {
  Calculator,
  ShieldCheck,
  Info,
  Store,
  TrendingUp,
  IndianRupee,
  Shield,
  Flame,
  Scale,
} from "lucide-react";
import { BUSINESS_TYPES, LIABILITY_TIERS } from "./data";

interface CorporatePremiumCalculatorProps {
  openQuote: () => void;
  isDashboard?: boolean;
}

export const CorporatePremiumCalculator: React.FC<
  CorporatePremiumCalculatorProps
> = ({ openQuote, isDashboard = false }) => {
  // State
  const [businessType, setBusinessType] = useState(BUSINESS_TYPES[0]);
  const [assetValue, setAssetValue] = useState<number>(1000000); // 10 Lakhs default
  const [turnover, setTurnover] = useState(LIABILITY_TIERS[0]);

  // Covers
  const [covers, setCovers] = useState({
    fire: true,
    burglary: true,
    liability: false,
  });

  const [premiums, setPremiums] = useState({
    fire: 0,
    burglary: 0,
    liability: 0,
    total: 0,
  });
  const [isAnimating, setIsAnimating] = useState(false);

  // Calculate Premium
  useEffect(() => {
    setIsAnimating(true);

    const timer = setTimeout(() => {
      let firePremium = 0;
      let burglaryPremium = 0;
      let liabilityPremium = 0;

      if (covers.fire) firePremium = assetValue * businessType.riskRate;
      if (covers.burglary) burglaryPremium = assetValue * 0.001;
      if (covers.liability) liabilityPremium = turnover.premium;

      const total = Math.round(
        firePremium + burglaryPremium + liabilityPremium,
      );
      setPremiums({
        fire: Math.round(firePremium),
        burglary: Math.round(burglaryPremium),
        liability: Math.round(liabilityPremium),
        total: total,
      });
      setIsAnimating(false);
    }, 400);

    return () => clearTimeout(timer);
  }, [businessType, assetValue, turnover, covers]);

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat("en-IN", {
      style: "currency",
      currency: "INR",
      maximumFractionDigits: 0,
    }).format(amount);
  };

  const toggleCover = (key: keyof typeof covers) => {
    setCovers((prev) => ({ ...prev, [key]: !prev[key] }));
  };

  return (
    <div className="relative">
      <div className="flex flex-col lg:flex-row gap-8 lg:gap-16 items-start">
        {/* LEFT: CONTENT */}
        <div className={`w-full lg:w-5/12 ${isDashboard ? 'pt-0' : 'pt-4 lg:pt-12'}`}>
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
          >
            <span className="inline-flex items-center gap-2 px-4 py-1.5 bg-gradient-to-r from-[#2076C7]/10 to-[#1CADA3]/10 text-[#2076C7] rounded-full text-xs font-bold uppercase tracking-wider mb-6 border border-[#2076C7]/20">
              <Calculator className="w-3.5 h-3.5 text-[#1CADA3]" />
              Business Shield Estimator
            </span>
            <h2 className="text-3xl md:text-4xl font-extrabold mb-6 font-sans leading-tight">
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#2076C7] via-[#1CADA3] to-[#2076C7]">
                Estimate Your Business Insurance Cost
              </span>
            </h2>
            <p className="text-slate-600 mb-10 text-lg leading-relaxed">
              Comprehensive protection for your assets, stock, and legal
              liabilities. Secure your business against Fire, Theft, and
              Third-Party claims.
            </p>

            <div className="space-y-6">
              <div className="flex items-start gap-4">
                <div className="mt-1 bg-blue-50 p-2 rounded-xl shrink-0">
                  <ShieldCheck className="w-5 h-5 text-[#2076C7]" />
                </div>
                <div>
                  <h4 className="font-bold text-slate-800 mb-1">
                    Assets Cover
                  </h4>
                  <p className="text-sm text-slate-600">
                    Protects Building, Plant, Machinery & Stock.
                  </p>
                </div>
              </div>
              <div className="flex items-start gap-4">
                <div className="mt-1 bg-blue-50 p-2 rounded-xl shrink-0">
                  <ShieldCheck className="w-5 h-5 text-[#2076C7]" />
                </div>
                <div>
                  <h4 className="font-bold text-slate-800 mb-1">Burglary</h4>
                  <p className="text-sm text-slate-600">
                    Coverage against Keyman theft and forcible entry.
                  </p>
                </div>
              </div>
              <div className="flex items-start gap-4">
                <div className="mt-1 bg-blue-50 p-2 rounded-xl shrink-0">
                  <ShieldCheck className="w-5 h-5 text-[#2076C7]" />
                </div>
                <div>
                  <h4 className="font-bold text-slate-800 mb-1">Liability</h4>
                  <p className="text-sm text-slate-600">
                    Legal protection against third-party bodily injury or
                    property damage.
                  </p>
                </div>
              </div>
              <div className="mt-8 p-4 rounded-xl bg-blue-50 border border-blue-100 text-sm text-slate-700 leading-relaxed">
                <div className="flex items-start gap-2">
                  <Info className="w-4 h-4 text-[#2076C7] mt-[2px]" />
                  <p>
                    This calculator gives a quick estimate of business insurance
                    costs based on common SME risk factors. Final premiums may
                    vary depending on asset valuation, business operations,
                    claims history, and insurer underwriting.
                  </p>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
        {/* RIGHT: CALCULATOR CARD */}
        <div className="w-full lg:w-7/12 max-w-full">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="bg-white rounded-2xl shadow-[0_10px_40px_rgb(0,0,0,0.08)] border border-slate-100 overflow-hidden"
          >
            <div className="bg-gradient-to-r from-[#2076C7] to-[#1CADA3] p-6 sm:p-8 text-white text-center">
              <h3 className="font-bold font-sans text-2xl mb-1">
                SME Package Calculator
              </h3>
              <p className="text-white/90 text-sm font-medium">
                Fire + Burglary + Public Liability
              </p>
            </div>

            <div className="p-5 sm:p-8 md:p-10">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 mb-8">
                {/* INPUT: BUSINESS TYPE */}
                <div className="space-y-3">
                  <label className="text-sm font-bold text-slate-700 flex items-center gap-2">
                    <Store className="w-4 h-4 text-[#2076C7]" />
                    Business Type
                  </label>
                  <select
                    value={businessType.id}
                    onChange={(e) =>
                      setBusinessType(
                        BUSINESS_TYPES.find((b) => b.id === e.target.value) ||
                          BUSINESS_TYPES[0],
                      )
                    }
                    className="w-full p-4 rounded-xl border border-slate-200 bg-white text-black font-semibold outline-none focus:ring-4 focus:ring-[#2076C7]/10 transition-all appearance-none cursor-pointer"
                  >
                    {BUSINESS_TYPES.map((type) => (
                      <option key={type.id} value={type.id}>
                        {type.name}
                      </option>
                    ))}
                  </select>
                </div>
                {/* INPUT: TURNOVER (FOR LIABILITY) */}
                <div className="space-y-3">
                  <label className="text-sm font-bold text-slate-700 flex items-center gap-2">
                    <TrendingUp className="w-4 h-4 text-[#2076C7]" />
                    Annual Turnover (For Liability)
                  </label>
                  <select
                    value={turnover.label}
                    onChange={(e) =>
                      setTurnover(
                        LIABILITY_TIERS.find(
                          (t) => t.label === e.target.value,
                        ) || LIABILITY_TIERS[0],
                      )
                    }
                    className="w-full p-4 rounded-xl border border-slate-200 bg-white text-black font-semibold outline-none focus:ring-4 focus:ring-[#2076C7]/10 transition-all appearance-none cursor-pointer"
                  >
                    {LIABILITY_TIERS.map((tier) => (
                      <option key={tier.label} value={tier.label}>
                        {tier.label}
                      </option>
                    ))}
                  </select>
                </div>
                {/* INPUT: ASSET VALUE */}
                <div className="space-y-3 md:col-span-2">
                  <label className="text-sm font-bold text-slate-700 flex items-center gap-2">
                    <IndianRupee className="w-4 h-4 text-[#2076C7]" />
                    Total Value of Assets (Stock + Furniture)
                  </label>
                  <div className="relative pt-2 pb-6 px-2">
                    <input
                      type="range"
                      min="500000"
                      max="50000000"
                      step="500000"
                      value={assetValue}
                      onChange={(e) => setAssetValue(parseInt(e.target.value))}
                      className="w-full h-2.5 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-[#1CADA3]"
                    />
                    <div className="flex justify-between mt-4">
                      <span className="text-xs font-semibold text-slate-400">
                        ₹5L
                      </span>
                      <span className="text-xs sm:text-sm font-bold text-[#2076C7] bg-blue-50 px-2 sm:px-3 py-1 rounded-lg border border-blue-100 shadow-sm absolute left-1/2 -translate-x-1/2 top-9">
                        {formatCurrency(assetValue)}
                      </span>
                      <span className="text-xs font-semibold text-slate-400">
                        ₹5Cr+
                      </span>
                    </div>
                  </div>
                </div>
                {/* COVER SELECTION */}
                <div className="space-y-4 md:col-span-2">
                  <label className="text-sm font-bold text-slate-700 flex items-center gap-2">
                    <Shield className="w-4 h-4 text-[#2076C7]" />
                    Selected Covers
                  </label>
                  <div className="grid sm:grid-cols-3 gap-3">
                    <label
                      className={`flex items-center gap-3 cursor-pointer p-4 rounded-xl border transition-all ${covers.fire ? "border-[#2076C7] bg-blue-50/50" : "border-slate-200 hover:border-slate-300"}`}
                    >
                      <input
                        type="checkbox"
                        checked={covers.fire}
                        onChange={() => toggleCover("fire")}
                        className="w-4 h-4 accent-[#2076C7] cursor-pointer"
                      />
                      <span className="text-sm font-semibold text-slate-700">
                        Fire & Perils
                      </span>
                    </label>
                    <label
                      className={`flex items-center gap-3 cursor-pointer p-4 rounded-xl border transition-all ${covers.burglary ? "border-[#2076C7] bg-blue-50/50" : "border-slate-200 hover:border-slate-300"}`}
                    >
                      <input
                        type="checkbox"
                        checked={covers.burglary}
                        onChange={() => toggleCover("burglary")}
                        className="w-4 h-4 accent-[#2076C7] cursor-pointer"
                      />
                      <span className="text-sm font-semibold text-slate-700">
                        Burglary
                      </span>
                    </label>
                    <label
                      className={`flex items-center gap-3 cursor-pointer p-4 rounded-xl border transition-all ${covers.liability ? "border-[#2076C7] bg-blue-50/50" : "border-slate-200 hover:border-slate-300"}`}
                    >
                      <input
                        type="checkbox"
                        checked={covers.liability}
                        onChange={() => toggleCover("liability")}
                        className="w-4 h-4 accent-[#2076C7] cursor-pointer"
                      />
                      <span className="text-sm font-semibold text-slate-700">
                        Public Liability
                      </span>
                    </label>
                  </div>
                </div>
              </div>

              {/* OUTPUT SECTION */}
              <div className="bg-slate-50 rounded-2xl p-5 sm:p-6 border border-slate-200">
                <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-3">
                  <div className="w-full md:w-auto">
                    <p className="text-sm text-slate-500 font-bold mb-2 uppercase tracking-wide">
                      Estimated Annual Premium
                    </p>
                    <div className="flex items-baseline gap-1">
                      {isAnimating ? (
                        <span className="text-2xl md:text-3xl font-bold text-slate-300 animate-pulse">
                          Calculating...
                        </span>
                      ) : (
                        <>
                          <h3 className="text-3xl sm:text-4xl md:text-4xl font-extrabold text-slate-900 tracking-tight">
                            {formatCurrency(premiums.total)}
                          </h3>
                          <span className="text-sm text-slate-500 font-semibold">
                            + GST
                          </span>
                        </>
                      )}
                    </div>

                    {/* Premium Breakdown */}
                    {!isAnimating && premiums.total > 0 && (
                      <div className="mt-2 text-sm font-medium text-slate-600 space-y-1 bg-white p-3 rounded-xl border border-slate-100 shadow-sm w-full">
                        {premiums.fire > 0 && (
                          <div className="flex justify-between items-center gap-3">
                            <span className="flex items-center gap-2 text-sm min-w-0">
                              <Flame className="w-3.5 h-3.5 text-rose-500 shrink-0" />
                              <span className="truncate">Fire</span>
                            </span>
                            <span className="font-bold text-slate-800 shrink-0">
                              {formatCurrency(premiums.fire)}
                            </span>
                          </div>
                        )}

                        {premiums.burglary > 0 && (
                          <div className="flex justify-between items-center gap-3">
                            <span className="flex items-center gap-2 text-sm min-w-0">
                              <Shield className="w-3.5 h-3.5 text-blue-500 shrink-0" />
                              <span className="truncate">Burglary</span>
                            </span>
                            <span className="font-bold text-slate-800 shrink-0">
                              {formatCurrency(premiums.burglary)}
                            </span>
                          </div>
                        )}

                        {premiums.liability > 0 && (
                          <div className="flex justify-between items-center gap-3">
                            <span className="flex items-center gap-2 text-sm min-w-0">
                              <Scale className="w-3.5 h-3.5 text-purple-500 shrink-0" />
                              <span className="truncate">Liability</span>
                            </span>
                            <span className="font-bold text-slate-800 shrink-0">
                              {formatCurrency(premiums.liability)}
                            </span>
                          </div>
                        )}
                      </div>
                    )}
                    <p className="text-xs text-slate-400 mt-2 italic">
                      *Indicative premium for selected{" "}
                      {Object.values(covers).filter(Boolean).length} covers.
                    </p>
                  </div>

                  {!isDashboard && (
                    <button
                      onClick={() => openQuote()}
                      className="w-full lg:w-auto px-6 sm:px-10 py-2.5 md:py-3.5 bg-linear-to-r from-[#2076C7] to-[#1CADA3] text-white rounded-xl font-bold text-base md:text-lg hover:shadow-[0_8px_25px_rgb(32,118,199,0.3)] transition-all transform hover:-translate-y-1 shrink-0 cursor-pointer"
                    >
                      Get Detailed Quote
                    </button>
                  )}
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
};