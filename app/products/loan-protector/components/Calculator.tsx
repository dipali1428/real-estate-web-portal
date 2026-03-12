import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import {
  Calculator,
  IndianRupee,
  ShieldCheck,
  Store,
  Shield,
  Activity,
} from "lucide-react";
import { useModal } from "../../../context/ModalContext";
import { BASE_RATES, TENURE_FACTORS, LOAN_TYPES, PLAN_TYPES } from "./data";

interface CalculatorProps {
  planType: string;
  setPlanType: (val: string) => void;
}

export function LoanProtectorCalculator({
  planType,
  setPlanType,
}: CalculatorProps) {
  const { openLogin } = useModal();

  // State
  const [loanAmount, setLoanAmount] = useState(5000000); // 50 Lakhs
  const [age, setAge] = useState(35);
  const [jointAge, setJointAge] = useState(30);
  const [tenure, setTenure] = useState(20);
  const [interestRate, setInterestRate] = useState(8.5);
  const [loanType, setLoanType] = useState("Home Loan");
  const [premiumType, setPremiumType] = useState<"Single" | "Regular">(
    "Regular",
  );
  const [coverType, setCoverType] = useState<"Reducing" | "Level">("Reducing");
  const [gender, setGender] = useState<"Male" | "Female">("Female");
  const [isSmoker, setIsSmoker] = useState(false);
  const [premiums, setPremiums] = useState({
    annual: 0,
    monthly: 0,
    totalSumAssured: 0,
  });
  const [isAnimating, setIsAnimating] = useState(false);

  // Calculate Premium
  useEffect(() => {
    setIsAnimating(true);
    const timer = setTimeout(() => {
      // 1. Base Rate (based on age)
      const effectiveAge =
        planType === "Joint Loan Protection Plan"
          ? Math.max(age, jointAge)
          : age;

      const baseRateObj =
        BASE_RATES.find((r) => effectiveAge <= r.maxAge) ||
        BASE_RATES[BASE_RATES.length - 1];

      const baseRate = baseRateObj.rate;

      // 2. Tenure Factor
      const tenureFactorObj =
        TENURE_FACTORS.find((t) => tenure <= t.maxTenure) ||
        TENURE_FACTORS[TENURE_FACTORS.length - 1];

      const factorTenure = tenureFactorObj.factor;

      // 3. Actuarial Factors
      const genderFactor = gender === "Male" ? 1.05 : 1.0;
      const smokerFactor = isSmoker ? 1.4 : 1.0;
      const planFactor =
        PLAN_TYPES.find((p) => p.title === planType)?.factor || 1.0;

      // 4. Dynamic Cover Type Factor (Tenure-dependent for Reducing)
      const coverTypeFactor =
        coverType === "Reducing" ? 0.75 + (tenure / 30) * 0.1 : 1.0;

      // 5. Loan Type Factor
      const loanTypeFactorMap: Record<string, number> = {
        "Home Loan": 1.0,
        "Personal Loan": 1.15,
        "Car Loan": 1.1,
        "Business Loan": 1.2,
        "Education Loan": 0.95,
      };
      const loanTypeFactor = loanTypeFactorMap[loanType] || 1.0;

      // 6. Premium Mode Factor
      const premiumModeFactor = premiumType === "Single" ? 8.5 : 1.0;

      // Base calculation
      let annualPremium =
        (loanAmount / 100000) *
        baseRate *
        factorTenure *
        genderFactor *
        smokerFactor *
        planFactor *
        coverTypeFactor *
        loanTypeFactor *
        premiumModeFactor;

      // 7. Minimum Premium Floor
      annualPremium = Math.max(annualPremium, 500);

      setPremiums({
        annual: Math.round(annualPremium),
        monthly: premiumType === "Single" ? 0 : Math.round(annualPremium / 12),
        totalSumAssured: loanAmount,
      });

      setIsAnimating(false);
    }, 300);

    return () => clearTimeout(timer);
  }, [
    loanAmount,
    age,
    jointAge,
    tenure,
    interestRate,
    coverType,
    gender,
    planType,
    isSmoker,
    loanType,
    premiumType,
  ]);

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat("en-IN", {
      style: "currency",
      currency: "INR",
      maximumFractionDigits: 0,
    }).format(amount);
  };

  return (
    <section id="calculator" className="py-12 md:py-20 bg-white scroll-mt-20">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="relative">
          <div className="flex flex-col lg:flex-row gap-8 lg:gap-16 items-start">
            {/* LEFT: CONTENT */}
            <div className="w-full lg:w-5/12 pt-4 lg:pt-12">
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
              >
                <span className="inline-flex items-center gap-2 px-4 py-1.5 bg-gradient-to-r from-[#2076C7]/10 to-[#1CADA3]/10 text-[#2076C7] rounded-full text-xs font-bold uppercase tracking-wider mb-6 border border-[#2076C7]/20">
                  <Calculator className="w-3.5 h-3.5 text-[#2076C7]" />
                  Loan Shield Estimator
                </span>
                <h2 className="text-3xl md:text-4xl font-extrabold mb-6 font-sans leading-tight">
                  <span className="text-transparent bg-clip-text bg-linear-to-r from-[#2076C7] via-[#1CADA3] to-[#2076C7]">
                    Protect Your Family & Your Loan
                  </span>
                </h2>
                <p className="text-slate-600 mb-10 text-lg leading-relaxed">
                  Ensure your loan repayments never become a burden for your
                  loved ones. Get comprehensive cover that secures your
                  financial legacy.
                </p>

                <div className="space-y-6">
                  {/* ... features list ... */}
                  <div className="flex items-start gap-4">
                    <div className="mt-1 bg-blue-50 p-2 rounded-xl shrink-0">
                      <ShieldCheck className="w-5 h-5 text-[#2076C7]" />
                    </div>
                    <div>
                      <h4 className="font-bold text-slate-800 mb-1">
                        Reducing Cover
                      </h4>
                      <p className="text-base text-slate-600">
                        Sum assured matches your declining loan balance
                        perfectly.
                      </p>
                    </div>
                  </div>
                  <div className="flex items-start gap-4">
                    <div className="mt-1 bg-blue-50 p-2 rounded-xl shrink-0">
                      <Users className="w-5 h-5 text-[#2076C7]" />
                    </div>
                    <div>
                      <h4 className="font-bold text-slate-800 mb-1">
                        Joint Protection
                      </h4>
                      <p className="text-base text-slate-600">
                        Secure both co-borrowers under a single cost-effective
                        policy.
                      </p>
                    </div>
                  </div>
                  <div className="flex items-start gap-4">
                    <div className="mt-1 bg-blue-50 p-2 rounded-xl shrink-0">
                      <TrendingDown className="w-5 h-5 text-[#2076C7]" />
                    </div>
                    <div>
                      <h4 className="font-bold text-slate-800 mb-1">
                        Tax Benefits
                      </h4>
                      <p className="text-base text-slate-600">
                        Eligible for tax deductions under Section 80C of IT Act.
                      </p>
                    </div>
                  </div>

                  {/* INSIGHTS SECTION */}
                  <div className="mt-8 space-y-4">
                    <h4 className="font-bold text-slate-800 flex items-center gap-2">
                      <Lightbulb className="w-4 h-4 text-[#1CADA3]" />
                      Protection Insights
                    </h4>
                    <ul className="space-y-3">
                      <li className="flex items-start gap-2 text-base text-slate-600">
                        <CheckCircle2 className="w-5 h-5 text-[#1CADA3] mt-0.5 shrink-0" />
                        <span>
                          <b>Joint Plans</b>: Save up to 40% on premiums by
                          covering both borrowers under one policy.
                        </span>
                      </li>
                      <li className="flex items-start gap-2 text-sm text-slate-600">
                        <CheckCircle2 className="w-4 h-4 text-[#1CADA3] mt-0.5 shrink-0" />
                        <span>
                          <b>Reducing Cover</b>: Sum assured matches your
                          declining balance perfectly, making it the most
                          cost-effective.
                        </span>
                      </li>
                    </ul>
                  </div>

                  {/* LEFT SIDE DISCLAIMER */}
                  <div className="mt-8 p-4 rounded-xl bg-amber-50/50 border border-amber-200/50 text-xs md:text-[13px] text-amber-900/80 leading-relaxed shadow-sm">
                    <div className="flex items-start gap-2">
                      <AlertTriangle className="w-3.5 h-3.5 text-amber-600 mt-[1px] shrink-0" />
                      <p>
                        <b className="font-bold">Disclaimer:</b> These results
                        are indicative estimates. Final premiums are determined
                        by the insurance provider based on medical history,
                        underwriting, and loan conditions.
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
                    Premium Estimator
                  </h3>
                  <p className="text-white/90 text-sm font-medium">
                    Flexible Loan Protection Plans
                  </p>
                </div>

                <div className="p-5 sm:p-8 md:p-10">
                  <div className="grid grid-cols-1 gap-6 mb-8">
                    {/* Plan Selection */}
                    <div className="space-y-3">
                      <label className="text-sm font-bold text-slate-700 flex items-center gap-2">
                        <ShieldCheck className="w-4 h-4 text-[#2076C7]" />
                        Select Protection Plan
                      </label>
                      <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
                        {PLAN_TYPES.map((plan) => (
                          <button
                            key={plan.title}
                            onClick={() => setPlanType(plan.title)}
                            className={`py-2 px-3 text-xs font-bold rounded-xl border transition-all ${planType === plan.title ? "bg-blue-50 border-[#2076C7] text-[#2076C7] shadow-sm" : "bg-white border-slate-200 text-slate-600 hover:border-slate-300"} cursor-pointer flex items-center justify-center gap-2`}
                          >
                            <plan.icon size={14} />
                            {plan.title
                              .replace(" Loan Protection Plan", "")
                              .replace(" Insurance Plan", "")}
                          </button>
                        ))}
                      </div>
                    </div>

                    {/* Loan Amount */}
                    <div className="space-y-3">
                      <div className="flex justify-between items-center">
                        <label className="text-sm font-bold text-slate-700 flex items-center gap-2">
                          <IndianRupee className="w-4 h-4 text-[#2076C7]" />
                          Loan Amount
                        </label>
                        <span className="text-sm font-extrabold text-[#2076C7] bg-blue-50 px-3 py-1 rounded-lg border border-blue-100">
                          {formatCurrency(loanAmount)}
                        </span>
                      </div>
                      <div className="relative pt-2 pb-2">
                        <input
                          type="range"
                          min="100000"
                          max="20000000"
                          step="100000"
                          value={loanAmount}
                          onChange={(e) =>
                            setLoanAmount(parseInt(e.target.value))
                          }
                          className="w-full h-2 bg-slate-100 rounded-lg appearance-none cursor-pointer accent-[#2076C7]"
                        />
                        <div className="flex justify-between mt-2">
                          <span className="text-[10px] font-bold text-slate-400">
                            ₹1L
                          </span>
                          <span className="text-[10px] font-bold text-slate-400">
                            ₹2Cr
                          </span>
                        </div>
                      </div>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                      {/* Loan Type */}
                      <div className="space-y-3">
                        <label className="text-sm font-bold text-slate-700 flex items-center gap-2">
                          <Store className="w-4 h-4 text-[#2076C7]" />
                          Loan Type
                        </label>
                        <select
                          value={loanType}
                          onChange={(e) => setLoanType(e.target.value)}
                          className="w-full p-3 rounded-xl border border-slate-200 focus:border-[#2076C7] focus:ring-4 focus:ring-[#2076C7]/10 outline-none text-slate-700 font-semibold transition-all text-sm"
                        >
                          {LOAN_TYPES.map((type) => (
                            <option key={type} value={type}>
                              {type}
                            </option>
                          ))}
                        </select>
                      </div>

                      {/* Tenure */}
                      <div className="space-y-3">
                        <div className="flex justify-between items-center">
                          <label className="text-sm font-bold text-slate-700">
                            Tenure
                          </label>
                          <span className="text-xs font-bold text-slate-600">
                            {tenure} Yrs
                          </span>
                        </div>
                        <input
                          type="range"
                          min="1"
                          max="30"
                          value={tenure}
                          onChange={(e) => setTenure(parseInt(e.target.value))}
                          className="w-full h-2 bg-slate-100 rounded-lg appearance-none cursor-pointer accent-[#2076C7]"
                        />
                      </div>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                      {/* Interest Rate */}
                      <div className="space-y-3">
                        <div className="flex justify-between items-center">
                          <label className="text-sm font-bold text-slate-700">
                            Interest Rate
                          </label>
                          <span className="text-xs font-bold text-slate-600">
                            {interestRate}%
                          </span>
                        </div>
                        <input
                          type="range"
                          min="5"
                          max="15"
                          step="0.1"
                          value={interestRate}
                          onChange={(e) =>
                            setInterestRate(parseFloat(e.target.value))
                          }
                          className="w-full h-2 bg-slate-100 rounded-lg appearance-none cursor-pointer accent-[#2076C7]"
                        />
                      </div>

                      {/* Age */}
                      <div className="space-y-3">
                        <div className="flex justify-between items-center">
                          <label className="text-sm font-bold text-slate-700">
                            Age
                          </label>
                          <span className="text-xs font-bold text-slate-600">
                            {age} Yrs
                          </span>
                        </div>
                        <input
                          type="range"
                          min="18"
                          max="70"
                          value={age}
                          onChange={(e) => setAge(parseInt(e.target.value))}
                          className="w-full h-2 bg-slate-100 rounded-lg appearance-none cursor-pointer accent-[#2076C7]"
                        />
                      </div>
                    </div>

                    {planType === "Joint Loan Protection Plan" && (
                      <div className="space-y-3">
                        <div className="flex justify-between items-center">
                          <label className="text-sm font-bold text-slate-700">
                            Secondary Age
                          </label>
                          <span className="text-xs font-bold text-slate-600">
                            {jointAge} Yrs
                          </span>
                        </div>
                        <input
                          type="range"
                          min="18"
                          max="70"
                          value={jointAge}
                          onChange={(e) =>
                            setJointAge(parseInt(e.target.value))
                          }
                          className="w-full h-2 bg-slate-100 rounded-lg appearance-none cursor-pointer accent-[#2076C7]"
                        />
                      </div>
                    )}

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                      {/* Gender */}
                      <div className="space-y-3">
                        <label className="text-sm font-bold text-slate-700">
                          Gender
                        </label>
                        <div className="flex bg-slate-100 p-1 rounded-xl">
                          {(["Male", "Female"] as const).map((g) => (
                            <button
                              key={g}
                              onClick={() => setGender(g)}
                              className={`flex-1 py-2 text-xs font-bold rounded-lg transition-all ${gender === g ? "bg-white text-[#2076C7] shadow-sm" : "text-slate-500"} cursor-pointer`}
                            >
                              {g}
                            </button>
                          ))}
                        </div>
                      </div>

                      {/* Tobacco */}
                      <div className="space-y-3">
                        <label className="text-sm font-bold text-slate-700">
                          Tobacco User
                        </label>
                        <div className="flex bg-slate-100 p-1 rounded-xl">
                          <button
                            onClick={() => setIsSmoker(false)}
                            className={`flex-1 py-2 text-xs font-bold rounded-lg transition-all ${!isSmoker ? "bg-white text-[#2076C7] shadow-sm" : "text-slate-500"} cursor-pointer`}
                          >
                            No
                          </button>
                          <button
                            onClick={() => setIsSmoker(true)}
                            className={`flex-1 py-2 text-xs font-bold rounded-lg transition-all ${isSmoker ? "bg-white text-orange-600 shadow-sm" : "text-slate-500"} cursor-pointer`}
                          >
                            Yes
                          </button>
                        </div>
                      </div>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                      {/* Cover Type */}
                      <div className="space-y-3">
                        <label className="text-sm font-bold text-slate-700">
                          Cover Type
                        </label>
                        <div className="flex bg-slate-100 p-1 rounded-xl">
                          {(["Reducing", "Level"] as const).map((type) => (
                            <button
                              key={type}
                              onClick={() => setCoverType(type)}
                              className={`flex-1 py-2 text-xs font-bold rounded-lg transition-all ${coverType === type ? "bg-white text-[#2076C7] shadow-sm" : "text-slate-500"} cursor-pointer`}
                            >
                              {type}
                            </button>
                          ))}
                        </div>
                      </div>

                      {/* Premium Mode */}
                      <div className="space-y-3">
                        <label className="text-sm font-bold text-slate-700">
                          Premium Mode
                        </label>
                        <div className="flex bg-slate-100 p-1 rounded-xl">
                          {(["Regular", "Single"] as const).map((mode) => (
                            <button
                              key={mode}
                              onClick={() => setPremiumType(mode)}
                              className={`flex-1 py-2 text-xs font-bold rounded-lg transition-all ${premiumType === mode ? "bg-white text-[#2076C7] shadow-sm" : "text-slate-500"} cursor-pointer`}
                            >
                              {mode} Pay
                            </button>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* OUTPUT SECTION */}
                  <div className="bg-slate-50 rounded-2xl p-5 sm:p-6 border border-slate-200">
                    <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-4">
                      <div className="w-full md:w-auto">
                        <p className="text-sm text-slate-500 font-bold mb-2 uppercase tracking-wide">
                          {premiumType === "Single"
                            ? "Estimated Single Premium"
                            : "Estimated Monthly Premium"}
                        </p>
                        <div className="flex items-baseline gap-1">
                          {isAnimating ? (
                            <span className="text-2xl md:text-3xl font-bold text-slate-300 animate-pulse">
                              Calculating...
                            </span>
                          ) : (
                            <>
                              <h3 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
                                {premiumType === "Single"
                                  ? formatCurrency(premiums.annual)
                                  : formatCurrency(premiums.monthly)}
                              </h3>
                              <span className="text-sm text-slate-500 font-semibold">
                                + GST
                              </span>
                            </>
                          )}
                        </div>
                        {!isAnimating && (
                          <div className="mt-3 flex flex-wrap gap-x-4 gap-y-1 text-xs font-medium text-slate-500">
                            <span className="flex items-center gap-1">
                              <Shield className="w-3 h-3 text-[#2076C7]" />
                              Sum Assured:{" "}
                              {formatCurrency(premiums.totalSumAssured)}
                            </span>
                            <span className="flex items-center gap-1">
                              <Activity className="w-3 h-3 text-[#1CADA3]" />
                              Mode:{" "}
                              {premiumType === "Single" ? "One-Time" : "Annual"}
                            </span>
                          </div>
                        )}
                      </div>

                      <button
                        onClick={openLogin}
                        className="w-full lg:w-auto px-6 py-3 bg-gradient-to-r from-[#2076C7] to-[#1CADA3] text-white rounded-xl font-bold hover:shadow-[0_8px_25px_rgb(32,118,199,0.3)] transition-all transform hover:-translate-y-1 shrink-0 cursor-pointer"
                      >
                        Get Detailed Quote
                      </button>
                    </div>
                  </div>
                </div>
              </motion.div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

import {
  TrendingDown,
  Users,
  Lightbulb,
  CheckCircle2,
  AlertTriangle,
} from "lucide-react";
