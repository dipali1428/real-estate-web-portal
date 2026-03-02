"use client";

import React, { useState, useEffect } from "react";

import { motion, AnimatePresence, Variants } from "framer-motion";

import {
  Shield,
  Home,
  Banknote,
  Heart,
  CheckCircle,
  ChevronDown,
  AlertTriangle,
  Lock,
  Briefcase,
  TrendingUp,
  Clock,
  Award,
  ShieldCheck,
  LineChart,
  ExternalLink,
  Activity,
  User,
  Calendar,
  Zap,
  ChevronRight,
  IndianRupee,
  Info,
  Smartphone,
  CheckCircle2,
  Users,
  Landmark,
  Building2,
  Laptop,
  Factory,
} from "lucide-react";

import Image from "next/image";

import { useModal } from "../../context/ModalContext";

/* ---------------- ANIMATIONS ---------------- */

const fadeInUp: Variants = {
  hidden: { opacity: 0, y: 30 },

  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } },
};

const staggerContainer: Variants = {
  hidden: { opacity: 0 },

  visible: { opacity: 1, transition: { staggerChildren: 0.1 } },
};

const cardHover: Variants = {
  rest: { scale: 1, y: 0 },

  hover: { scale: 1.02, y: -5, transition: { duration: 0.2 } },
};

/* ---------------- HERO GRAPHIC ---------------- */

const HeroGraphic = () => {
  return (
    <div className="relative w-full h-[350px] md:h-[500px] flex items-center justify-center">
      {/* Background Decor: Rotating Rings */}

      <div className="absolute inset-0 flex items-center justify-center">
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ duration: 60, repeat: Infinity, ease: "linear" }}
          className="w-[280px] h-[280px] md:w-[420px] md:h-[420px] border border-blue-200/50 rounded-full border-dashed"
        />

        <motion.div
          animate={{ rotate: -360 }}
          transition={{ duration: 40, repeat: Infinity, ease: "linear" }}
          className="w-[200px] h-[200px] md:w-[320px] md:h-[320px] border border-teal-200/50 rounded-full border-dashed absolute"
        />
      </div>

      {/* Central Hub Icon */}

      <motion.div
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        className="relative z-10 w-24 h-24 md:w-32 md:h-32 bg-gradient-to-br from-[#2076C7] to-[#1CADA3] rounded-3xl rotate-45 transform shadow-[0_20px_50px_rgba(32,118,199,0.4)] flex items-center justify-center border-4 border-white"
      >
        <div className="-rotate-45">
          <ShieldCheck className="w-10 h-10 md:w-14 md:h-14 text-white" />
        </div>
      </motion.div>

      {/* Floating Satellite Icons */}

      <motion.div
        animate={{ y: [-12, 12, -12] }}
        transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
        className="absolute top-10 right-4 md:top-20 md:right-20 bg-white p-3 md:p-4 rounded-2xl shadow-xl border border-blue-50 flex flex-col items-center gap-1 z-20"
      >
        <div className="p-2 bg-blue-50 rounded-xl">
          <Home className="w-5 h-5 md:w-6 md:h-6 text-[#2076C7]" />
        </div>

        <span className="text-[10px] md:text-xs font-bold text-slate-700">
          Home
        </span>
      </motion.div>

      <motion.div
        animate={{ y: [12, -12, 12] }}
        transition={{
          duration: 5,
          repeat: Infinity,
          ease: "easeInOut",
          delay: 1,
        }}
        className="absolute bottom-10 left-4 md:bottom-20 md:left-20 bg-white p-3 md:p-4 rounded-2xl shadow-xl border border-teal-50 flex flex-col items-center gap-1 z-20"
      >
        <div className="p-2 bg-teal-50 rounded-xl">
          <IndianRupee className="w-5 h-5 md:w-6 md:h-6 text-[#1CADA3]" />
        </div>

        <span className="text-[10px] md:text-xs font-bold text-slate-700">
          Financials
        </span>
      </motion.div>

      <motion.div
        animate={{ x: [-8, 8, -8], y: [-8, 8, -8] }}
        transition={{
          duration: 6,
          repeat: Infinity,
          ease: "easeInOut",
          delay: 0.5,
        }}
        className="absolute top-20 left-4 md:top-32 md:left-10 bg-white p-2 md:p-3 rounded-2xl shadow-xl border border-blue-50 flex items-center gap-2 z-20"
      >
        <div className="p-2 bg-blue-50 rounded-xl">
          <Smartphone className="w-4 h-4 md:w-5 md:h-5 text-[#2076C7]" />
        </div>

        <span className="text-xs font-bold text-slate-700 hidden md:inline">
          Personal
        </span>
      </motion.div>

      <motion.div
        animate={{ x: [8, -8, 8], y: [8, -8, 8] }}
        transition={{
          duration: 5.5,
          repeat: Infinity,
          ease: "easeInOut",
          delay: 1.5,
        }}
        className="absolute bottom-24 right-4 md:bottom-32 md:right-10 bg-white p-2 md:p-3 rounded-2xl shadow-xl border border-teal-50 flex items-center gap-2 z-20"
      >
        <div className="p-2 bg-teal-50 rounded-xl">
          <Users className="w-4 h-4 md:w-5 md:h-5 text-[#1CADA3]" />
        </div>

        <span className="text-xs font-bold text-slate-700 hidden md:inline">
          Family
        </span>
      </motion.div>

      {/* Connecting Lines SVG */}

      <svg
        className="absolute inset-0 w-full h-full pointer-events-none opacity-20"
        viewBox="0 0 500 500"
        preserveAspectRatio="xMidYMid slice"
      >
        <motion.path
          d="M250 250 L400 150 M250 250 L100 350 M250 250 L100 150 M250 250 L400 350"
          stroke="#2076C7"
          strokeWidth="1.5"
          strokeDasharray="5 5"
          initial={{ pathLength: 0 }}
          animate={{ pathLength: 1 }}
          transition={{ duration: 2, ease: "easeInOut", delay: 0.5 }}
        />
      </svg>
    </div>
  );
};

/* ---------------- LOAN PROTECTOR CALCULATOR ---------------- */

const BASE_RATES = [
  { maxAge: 25, rate: 850 },

  { maxAge: 30, rate: 900 },

  { maxAge: 35, rate: 1000 },

  { maxAge: 40, rate: 1200 },

  { maxAge: 45, rate: 1600 },

  { maxAge: 50, rate: 2200 },

  { maxAge: 55, rate: 3200 },

  { maxAge: 60, rate: 4800 },

  { maxAge: 65, rate: 7000 },

  { maxAge: 70, rate: 10000 },
];

const TENURE_FACTORS = [
  { maxTenure: 5, factor: 1.0 },

  { maxTenure: 10, factor: 1.05 },

  { maxTenure: 15, factor: 1.1 },

  { maxTenure: 20, factor: 1.15 },

  { maxTenure: 25, factor: 1.2 },

  { maxTenure: 30, factor: 1.25 },
];

const LOAN_TYPES = [
  "Home Loan",
  "Personal Loan",
  "Car Loan",
  "Business Loan",
  "Education Loan",
];

const PLAN_TYPES = [
  {
    title: "Individual Loan Protection Plan",

    desc: "Comprehensive single-life coverage designed for primary borrowers to protect their assets.",

    icon: User,

    color: "text-blue-600",

    bg: "bg-blue-50",

    factor: 1.0,
  },

  {
    title: "Joint Loan Protection Plan",

    desc: "Dual-life protection for co-borrowers or spouses, ensuring the loan is cleared if either partner faces a crisis.",

    icon: Users,

    color: "text-teal-600",

    bg: "bg-teal-50",

    factor: 1.2,
  },

  {
    title: "Group Loan Protection Plan",

    desc: "Affordable, high-volume coverage for employee groups or financial institution members.",

    icon: Briefcase,

    color: "text-indigo-600",

    bg: "bg-indigo-50",

    factor: 0.9,
  },

  {
    title: "Home Loan Protection Plan",

    desc: "High-value, long-tenure protection specifically structured for significant property liabilities.",

    icon: Home,

    color: "text-orange-600",

    bg: "bg-orange-50",

    factor: 1.05,
  },

  {
    title: "Credit Life Insurance Plan",

    desc: "Flexible, short-term coverage for micro-loans, credit card balances, and personal credit lines.",

    icon: Zap,

    color: "text-purple-600",

    bg: "bg-purple-50",

    factor: 0.95,
  },
];

function LoanProtectorCalculator({
  planType,
  setPlanType,
}: {
  planType: string;
  setPlanType: (val: string) => void;
}) {
  const { openQuote } = useModal();

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
    <section id="calculator" className="py-8 md:py-12 bg-white scroll-mt-20">
      <div className="container mx-auto px-4 md:px-6 max-w-7xl">
        <div className="text-center mb-8 sm:mb-10">
          <span className="inline-flex items-center gap-2 px-4 py-1.5 bg-blue-50 text-[#2076C7] rounded-full text-xs font-bold uppercase tracking-wider mb-6 border border-blue-100">
            <Zap className="w-3.5 h-3.5 fill-[#2076C7]" />
            Policybazaar-Style Estimator
          </span>

          <h2 className="text-3xl md:text-4xl font-extrabold mb-4 text-slate-800">
            Loan Protector Premium Calculator
          </h2>

          <p className="text-slate-600 max-w-2xl mx-auto text-lg font-light text-center">
            Estimate your monthly and annual premiums for loan protection in
            seconds.
          </p>
        </div>

        <div className="flex flex-col lg:flex-row gap-8 lg:gap-12 items-start">
          {/* LEFT: INPUTS (Grouped) */}

          <div className="w-full lg:w-7/12 space-y-6">
            {/* GROUP 1: PLAN SELECTION */}

            <div className="bg-white rounded-[2rem] shadow-[0_8px_30px_rgb(0,0,0,0.04)] border border-slate-100 p-6 sm:p-10">
              <div className="space-y-6">
                <div className="flex items-center gap-3 mb-2 pb-4 border-b border-slate-50">
                  <div className="w-8 h-8 bg-blue-50 rounded-lg flex items-center justify-center text-[#2076C7]">
                    <ShieldCheck size={20} />
                  </div>

                  <h3 className="text-lg font-bold text-slate-800">
                    1. Select Protection Plan
                  </h3>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
                  {PLAN_TYPES.map((plan) => (
                    <button
                      key={plan.title}
                      onClick={() => setPlanType(plan.title)}
                      className={`py-3 px-4 text-left rounded-xl border transition-all ${planType === plan.title ? "bg-blue-50 border-[#2076C7] ring-1 ring-[#2076C7]/20 shadow-sm" : "bg-white border-slate-200 hover:border-slate-300"} cursor-pointer group`}
                    >
                      <div className="flex items-center gap-3">
                        <div
                          className={`p-1.5 rounded-lg ${planType === plan.title ? "bg-white text-[#2076C7]" : "bg-slate-50 text-slate-400 group-hover:text-slate-600"}`}
                        >
                          <plan.icon size={16} />
                        </div>

                        <span
                          className={`text-[11px] font-bold leading-tight ${planType === plan.title ? "text-[#2076C7]" : "text-slate-600"}`}
                        >
                          {plan.title
                            .replace(" Loan Protection Plan", "")
                            .replace(" Insurance Plan", "")}
                        </span>
                      </div>
                    </button>
                  ))}
                </div>
              </div>
            </div>

            {/* GROUP 2: LOAN DETAILS */}

            <div className="bg-white rounded-[2rem] shadow-[0_8px_30px_rgb(0,0,0,0.04)] border border-slate-100 p-6 sm:p-10">
              <div className="space-y-8">
                <div className="flex items-center gap-3 mb-2 pb-4 border-b border-slate-50">
                  <div className="w-8 h-8 bg-blue-50 rounded-lg flex items-center justify-center text-[#2076C7]">
                    <IndianRupee size={20} />
                  </div>

                  <h3 className="text-lg font-bold text-slate-800">
                    2. Loan Configuration
                  </h3>
                </div>

                {/* LOAN AMOUNT SLIDER */}

                <div className="space-y-4">
                  <div className="flex justify-between items-center">
                    <label className="text-sm font-bold text-slate-700 flex items-center gap-2">
                      Loan Amount
                    </label>

                    <span className="text-lg font-extrabold text-[#2076C7] bg-blue-50 px-4 py-1 rounded-xl border border-blue-100">
                      {formatCurrency(loanAmount)}
                    </span>
                  </div>

                  <input
                    type="range"
                    min="100000"
                    max="20000000"
                    step="100000"
                    value={loanAmount}
                    onChange={(e) => setLoanAmount(parseInt(e.target.value))}
                    className="w-full h-2 bg-slate-100 rounded-lg appearance-none cursor-pointer accent-[#2076C7]"
                  />

                  <div className="flex justify-between text-[10px] font-bold text-slate-400">
                    <span>₹1 LAKH</span>

                    <span>₹2 CRORE</span>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  {/* TENURE SLIDER */}

                  <div className="space-y-4">
                    <div className="flex justify-between items-center">
                      <label className="text-sm font-bold text-slate-700 flex items-center gap-2">
                        Loan Tenure
                      </label>

                      <span className="text-sm font-bold text-slate-800">
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

                    <div className="flex justify-between text-[10px] font-bold text-slate-400">
                      <span>1 YR</span>

                      <span>30 YRS</span>
                    </div>
                  </div>

                  {/* INTEREST RATE SLIDER */}

                  <div className="space-y-4">
                    <div className="flex justify-between items-center">
                      <label className="text-sm font-bold text-slate-700 flex items-center gap-2">
                        Interest Rate
                      </label>

                      <span className="text-sm font-bold text-slate-800">
                        {interestRate}% p.a.
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

                    <div className="flex justify-between text-[10px] font-bold text-slate-400">
                      <span>5%</span>

                      <span>15%</span>
                    </div>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  {/* LOAN TYPE SELECTION */}

                  <div className="space-y-3">
                    <label className="text-sm font-bold text-slate-700">
                      Loan Type
                    </label>

                    <div className="grid grid-cols-2 gap-2">
                      {LOAN_TYPES.map((type) => (
                        <button
                          key={type}
                          onClick={() => setLoanType(type)}
                          className={`py-2 px-3 text-xs font-bold rounded-xl border transition-all ${loanType === type ? "bg-blue-50 border-[#2076C7] text-[#2076C7]" : "bg-white border-slate-200 text-slate-600 hover:border-slate-300"} cursor-pointer`}
                        >
                          {type}
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* COVER TYPE SELECTION */}

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

                    {/* Dynamic explanation moved to better place below or kept as footnote */}
                  </div>
                </div>
              </div>
            </div>

            {/* GROUP 3: APPLICANT PROFILE */}

            <div className="bg-white rounded-[2rem] shadow-[0_8px_30px_rgb(0,0,0,0.04)] border border-slate-100 p-6 sm:p-10">
              <div className="space-y-8">
                <div className="flex items-center gap-3 mb-2 pb-4 border-b border-slate-50">
                  <div className="w-8 h-8 bg-blue-50 rounded-lg flex items-center justify-center text-[#2076C7]">
                    <User size={20} />
                  </div>

                  <h3 className="text-lg font-bold text-slate-800">
                    3. Borrower Details
                  </h3>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  {/* AGE SLIDER */}

                  <div className="space-y-4">
                    <div className="flex justify-between items-center">
                      <label className="text-sm font-bold text-slate-700">
                        Applicant Age
                      </label>

                      <span className="text-sm font-bold text-slate-800">
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

                    <div className="flex justify-between text-[10px] font-bold text-slate-400">
                      <span>18 YRS</span>

                      <span>70 YRS</span>
                    </div>
                  </div>

                  {/* JOINT AGE SLIDER (Conditional) */}

                  {planType === "Joint Loan Protection Plan" ? (
                    <motion.div
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      className="space-y-4"
                    >
                      <div className="flex justify-between items-center">
                        <label className="text-sm font-bold text-slate-700">
                          Secondary Age
                        </label>

                        <span className="text-sm font-bold text-slate-800">
                          {jointAge} Yrs
                        </span>
                      </div>

                      <input
                        type="range"
                        min="18"
                        max="70"
                        value={jointAge}
                        onChange={(e) => setJointAge(parseInt(e.target.value))}
                        className="w-full h-2 bg-slate-100 rounded-lg appearance-none cursor-pointer accent-[#2076C7]"
                      />

                      <div className="flex justify-between text-[10px] font-bold text-slate-400">
                        <span>18 YRS</span>

                        <span>70 YRS</span>
                      </div>
                    </motion.div>
                  ) : (
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
                  )}
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  <div className="space-y-3">
                    <label className="text-sm font-bold text-slate-700">
                      Gender
                    </label>

                    <div className="flex gap-2">
                      {["Male", "Female"].map((g) => (
                        <button
                          key={g}
                          onClick={() => setGender(g as any)}
                          className={`flex-1 py-2.5 px-4 text-xs font-bold rounded-xl border transition-all ${gender === g ? "bg-blue-50 border-[#2076C7] text-[#2076C7]" : "bg-white border-slate-200 text-slate-600"} cursor-pointer`}
                        >
                          {g}
                        </button>
                      ))}
                    </div>
                  </div>

                  <div className="space-y-3">
                    <label className="text-sm font-bold text-slate-700">
                      Tobacco Consumption
                    </label>

                    <div className="flex gap-2">
                      <button
                        onClick={() => setIsSmoker(false)}
                        className={`flex-1 py-2.5 px-4 text-xs font-bold rounded-xl border transition-all ${!isSmoker ? "bg-blue-50 border-[#2076C7] text-[#2076C7]" : "bg-white border-slate-200 text-slate-600"} cursor-pointer`}
                      >
                        No
                      </button>

                      <button
                        onClick={() => setIsSmoker(true)}
                        className={`flex-1 py-2.5 px-4 text-xs font-bold rounded-xl border transition-all ${isSmoker ? "bg-orange-50 border-orange-600 text-orange-600" : "bg-white border-slate-200 text-slate-600"} cursor-pointer`}
                      >
                        Yes
                      </button>
                    </div>
                  </div>
                </div>

                {/* Conditionally show Premium Mode if Joint (for alignment) */}

                {planType === "Joint Loan Protection Plan" && (
                  <div className="pt-4 mt-4 border-t border-slate-50">
                    <div className="flex flex-col md:flex-row items-center justify-between gap-4">
                      <label className="text-sm font-bold text-slate-700">
                        Premium Payment Mode
                      </label>

                      <div className="flex bg-slate-100 p-1 rounded-xl w-full md:w-64">
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
                )}
              </div>
            </div>

            {/* SUM ASSURED EXPLANATION FOOTNOTE */}

            <div className="p-4 bg-blue-50/30 rounded-2xl border border-blue-100/50 grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="flex items-start gap-3">
                <Activity className="w-5 h-5 text-[#2076C7] shrink-0 mt-1" />

                <div>
                  <h5 className="text-xs font-bold text-slate-800">
                    Reducing Cover
                  </h5>

                  <p className="text-[10px] text-slate-500 leading-tight">
                    Sum assured matches your declining loan balance. Saves up to
                    15% on premiums.
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <TrendingUp className="w-5 h-5 text-[#1CADA3] shrink-0 mt-1" />

                <div>
                  <h5 className="text-xs font-bold text-slate-800">
                    Level Cover
                  </h5>

                  <p className="text-[10px] text-slate-500 leading-tight">
                    Sum assured remains constant. Surplus payout goes to family
                    after loan clearing.
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* RIGHT: RESULTS (Sticky) */}

          <div className="w-full lg:w-5/12 lg:sticky lg:top-32">
            {/* PREMIUM SUMMARY CARD */}

            <div className="bg-linear-to-br from-[#2076C7] to-[#1CADA3] rounded-[2rem] p-8 text-white shadow-xl relative overflow-hidden flex flex-col items-center text-center">
              <div className="absolute top-0 left-0 w-full h-full opacity-10">
                <Activity className="w-full h-full scale-150 rotate-12" />
              </div>

              <h4 className="text-sm font-bold uppercase tracking-widest mb-2 opacity-80">
                {premiumType === "Single"
                  ? "Estimated Single Premium"
                  : "Estimated Monthly Premium"}
              </h4>

              <div
                className={`text-5xl font-extrabold mb-4 transition-all duration-300 ${isAnimating ? "scale-95 opacity-50" : "scale-100 opacity-100"}`}
              >
                {premiumType === "Single"
                  ? formatCurrency(premiums.annual)
                  : formatCurrency(premiums.monthly)}
              </div>

              <div className="w-full h-px bg-white/20 mb-4"></div>

              <div className="flex flex-col gap-3 w-full text-xs font-medium opacity-90 px-4">
                <div className="flex justify-between items-center py-1">
                  <span className="opacity-70">Payment Mode</span>

                  <span className="bg-white/10 px-2 py-0.5 rounded-lg">
                    {premiumType === "Single" ? "One-Time" : "Monthly"}
                  </span>
                </div>

                <div className="flex justify-between items-center py-1">
                  <span className="opacity-70">Annual Premium</span>

                  <span>{formatCurrency(premiums.annual)}</span>
                </div>

                <div className="flex justify-between items-center py-1 font-bold text-sm pt-2 border-t border-white/10">
                  <span>Sum Assured</span>

                  <span>{formatCurrency(premiums.totalSumAssured)}</span>
                </div>
              </div>

              <button
                onClick={() => openQuote("Loan Protector")}
                className="mt-8 w-full py-4 bg-white text-[#2076C7] rounded-2xl font-bold text-lg shadow-lg hover:shadow-xl hover:-translate-y-1 transition-all flex items-center justify-center gap-2 cursor-pointer group"
              >
                Get Detailed Quotes
                <ChevronRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </button>

              <p className="mt-4 text-[10px] opacity-70 italic leading-tight">
                *Indicative premium based on standard actuarial rates.
                <br />
                Final premium varies by insurer underwriting.
              </p>
            </div>

            <div className="mt-6 p-4 bg-teal-50 rounded-2xl flex items-start gap-3 border border-teal-100">
              <Info className="w-5 h-5 text-[#1CADA3] shrink-0 mt-0.5" />

              <p className="text-xs text-slate-600 leading-relaxed font-light">
                <strong>Pro Tip:</strong> Most banks prefer{" "}
                <strong>Reducing Cover</strong> as it matches your amortization
                schedule perfectly, resulting in lower liability costs.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ---------------- PAGE ---------------- */

export default function LoanProtectorInsurancePage() {
  const { openQuote, openSignup } = useModal();

  const [expandedIdx, setExpandedIdx] = useState<number | null>(null);

  const [planType, setPlanType] = useState(PLAN_TYPES[0].title);

  /* ---------------- DATA ---------------- */

  const features = [
    {
      icon: Shield,

      title: "Full Loan Protection",

      desc: "Ensures outstanding loan amount is paid in case of death, disability, or critical illness.",

      color: "text-blue-600",

      bg: "bg-blue-50",
    },

    {
      icon: Home,

      title: "Protect Your Assets",

      desc: "Keeps your home, car, or business safe by clearing loan liabilities automatically.",

      color: "text-indigo-600",

      bg: "bg-indigo-50",
    },

    {
      icon: Banknote,

      title: "EMI Security",

      desc: "Covers EMI payments so your family does not face financial burden.",

      color: "text-teal-600",

      bg: "bg-teal-50",
    },

    {
      icon: Lock,

      title: "Financial Stability",

      desc: "Maintains your family’s financial stability during unexpected events.",

      color: "text-purple-600",

      bg: "bg-purple-50",
    },
  ];

  const benefits = [
    {
      title: "Family Protection",
      desc: "Ensures your family is not burdened with loan repayment.",
      icon: Heart,
    },

    {
      title: "Improves Loan Approval",
      desc: "Enhances loan approval chances with added protection.",
      icon: TrendingUp,
    },

    {
      title: "Long-Term Coverage",
      desc: "Coverage continues throughout the loan tenure.",
      icon: Clock,
    },

    {
      title: "Peace of Mind",
      desc: "Provides confidence knowing liabilities are covered.",
      icon: Award,
    },
  ];

  const faqs = [
    {
      q: "Is loan protector insurance mandatory?",
      a: "No, it is optional. However, it is highly recommended to protect against financial risks like death, disability, or critical illness while carrying a large liability.",
    },

    {
      q: "What is the difference between Individual and Joint plans?",
      a: "Individual plans cover a single borrower. Joint plans cover two co-borrowers (like spouses), settling the loan if either person faces an unfortunate event.",
    },

    {
      q: "How does Group Loan Protection work?",
      a: "It is a cost-effective solution for employees or members of a group, offering institutional-grade protection at lower premiums.",
    },

    {
      q: "Can I use term insurance instead?",
      a: "Yes, but Loan Protector is specifically tailored to match the decreasing balance of your loan, often making it more cost-effective than a static term plan.",
    },

    {
      q: "What is Credit Life Insurance?",
      a: "It's a specialized short-term plan designed to cover smaller liabilities like credit card debt, personal lines of credit, or micro-finance loans.",
    },
  ];

  const coverage = [
    "Death due to natural or accidental causes",

    "Permanent total and partial disability",

    "Critical illness & Terminal illness riders",

    "Job loss coverage for salaried individuals",

    "Full outstanding loan balance settlement",

    "Coverage for co-borrowers in Joint plans",

    "Seamless transfer between lenders",

    "Flexible premium payment (Single/Regular)",
  ];

  const INSURANCE_PARTNER_TYPES = [
    {
      name: "Public Sector Insurers",
      features: [
        "Government-backed reliability",
        "Nationwide network & reach",
        "High trust & stability",
      ],
      icon: Landmark,
      color: "bg-[#E6F0FF] border-[#0056D2]/20",
      textColor: "text-[#0056D2]",
    },
    {
      name: "Private Sector Insurers",
      features: [
        "Tech-driven fast claims",
        "Customized corporate packages",
        "Global reinsurance backing",
      ],
      icon: Building2,
      color: "bg-[#E6F7F5] border-[#1FAD9F]/20",
      textColor: "text-[#1FAD9F]",
    },
    {
      name: "Digital-First Insurers",
      features: [
        "Paperless onboarding",
        "Instant policy approvals",
        "App-based claim tracking",
      ],
      icon: Laptop,
      color: "bg-teal-50 border-[#1CADA3]/20",
      textColor: "text-[#1CADA3]",
    },
    {
      name: "Specialized Commercial Insurers",
      features: [
        "Industry-specific coverage",
        "Complex risk underwriting",
        "Dedicated loss assessors",
      ],
      icon: Factory,
      color: "bg-blue-50 border-[#2076C7]/20",
      textColor: "text-[#2076C7]",
    },
  ];

  return (
    <div className="min-h-screen bg-gray-50 font-sans text-slate-800">
      {/* HERO SECTION */}

      <header className="relative w-full overflow-hidden pt-20 pb-10 md:pt-24 md:pb-12 lg:pt-32 lg:pb-16 bg-white">
        {/* Background Material Layers */}

        <div className="absolute inset-0 bg-gradient-to-br from-blue-50/80 via-white to-teal-50/80"></div>

        {/* Visual Depth: Glow Effects */}

        <div className="absolute top-0 left-1/4 w-[500px] h-[500px] bg-[#2076C7]/10 rounded-full blur-[120px] -translate-y-1/2 -z-0"></div>

        <div className="absolute bottom-0 right-1/4 w-[500px] h-[500px] bg-[#1CADA3]/10 rounded-full blur-[120px] translate-y-1/2 -z-0"></div>

        {/* Grid Texture Overlay */}

        <div
          className="absolute inset-0 opacity-[0.03] pointer-events-none"
          style={{
            backgroundImage: `linear-gradient(#2076C7 1.5px, transparent 1.5px), linear-gradient(to right, #2076C7 1.5px, transparent 1.5px)`,

            backgroundSize: "60px 60px",
          }}
        ></div>

        <div className="container mx-auto px-4 md:px-6 max-w-7xl relative z-10">
          <div className="flex flex-col lg:flex-row items-center gap-12 lg:gap-20">
            {/* LEFT HERO TEXT */}

            <div className="w-full lg:w-1/2 text-center lg:text-left space-y-8">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
              >
                <div className="inline-flex items-center gap-2 bg-gradient-to-r from-[#2076C7]/10 to-[#1CADA3]/10 border border-[#2076C7]/20 text-[#2076C7] px-4 py-2 rounded-full text-sm font-bold tracking-wide uppercase">
                  <ShieldCheck className="w-4 h-4 text-[#1CADA3]" />
                  IRDAI-Approved Loan Protection
                </div>
              </motion.div>

              <motion.h1
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2, duration: 0.7 }}
                className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-extrabold leading-[1.1] tracking-tight"
              >
                <span className="block bg-gradient-to-r from-[#2076C7] to-[#1CADA3] bg-clip-text text-transparent mb-3">
                  Protect Your Debt.
                </span>

                <span className="relative inline-block">
                  <span className="bg-gradient-to-r from-[#2076C7] via-[#1CADA3] to-[#2076C7] bg-clip-text text-transparent bg-[length:200%_auto] animate-gradient">
                    Secure Your Family.
                  </span>

                  {/* Subtle highlight glow */}

                  <span className="absolute bottom-2 left-0 w-full h-4 bg-[#1CADA3]/10 blur-xl -z-10"></span>
                </span>
              </motion.h1>

              <motion.p
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3, duration: 0.7 }}
                className="text-lg md:text-xl text-slate-600 max-w-2xl mx-auto lg:mx-0 leading-relaxed font-light"
              >
                Ensure your family never inherits your liabilities. Loan
                Protector Insurance automatically clears your home, car, or
                business loans in unforeseen events.
              </motion.p>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4, duration: 0.7 }}
                className="flex flex-wrap justify-center lg:justify-start gap-4 pt-4"
              >
                <button
                  onClick={() => openQuote("Loan Protector")}
                  className="group relative px-8 py-4 text-white font-bold rounded-xl overflow-hidden shadow-[0_10px_25px_-5px_rgb(32,118,199,0.4)] hover:shadow-[0_15px_30px_-5px_rgb(28,173,163,0.5)] transition-all duration-300 transform hover:-translate-y-1 cursor-pointer"
                >
                  <span className="absolute inset-0 bg-gradient-to-r from-[#2076C7] to-[#1CADA3]"></span>

                  <span className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 bg-gradient-to-r from-[#1CADA3] to-[#2076C7]"></span>

                  <span className="relative flex items-center justify-center gap-2">
                    Calculate Premium
                    <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                  </span>
                </button>

                <div className="flex items-center gap-2 px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl text-xs font-medium text-slate-500 leading-snug max-w-xs">
                  <ShieldCheck className="w-4 h-4 text-[#1CADA3] shrink-0" />
                  <span>
                    IRDAI approved. Infinity Arthvishva acts as a licensed
                    insurance facilitator. Terms &amp; conditions apply.
                  </span>
                </div>
              </motion.div>

              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.6 }}
                className="flex items-center justify-center lg:justify-start gap-8 pt-4 text-sm font-bold text-slate-500 uppercase tracking-widest"
              >
                <div className="flex items-center gap-2">
                  <Lock className="w-5 h-5 text-teal-600" /> Paperless & 100%
                  Secure
                </div>

                <div className="flex items-center gap-2">
                  <Activity className="w-5 h-5 text-blue-600" /> Instant
                  Approvals
                </div>
              </motion.div>
            </div>

            {/* RIGHT HERO: GRAPHIC */}

            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8 }}
              className="w-full lg:w-1/2 relative mt-12 lg:mt-0"
            >
              {/* Decorative background circle */}

              <div className="absolute inset-0 bg-gradient-to-r from-[#2076C7]/5 to-[#1CADA3]/5 blur-3xl rounded-full scale-110"></div>

              <HeroGraphic />
            </motion.div>
          </div>
        </div>
      </header>

      <LoanProtectorCalculator planType={planType} setPlanType={setPlanType} />

      <main className="container mx-auto px-4 md:px-6 max-w-7xl py-6 sm:py-10 space-y-8 sm:space-y-12">
        {/* FEATURES SECTION */}

        <motion.section
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          variants={staggerContainer}
        >
          <div className="text-center mb-6 sm:mb-8 lg:mb-10">
            <motion.h2 className="text-2xl sm:text-3xl md:text-4xl font-bold font-sans bg-linear-to-r from-[#2076C7] to-[#1CADA3] bg-clip-text text-transparent mb-3 sm:mb-4 tracking-tight">
              Comprehensive Protection Features
            </motion.h2>

            <motion.p className="text-base sm:text-lg text-slate-600 max-w-2xl mx-auto font-light">
              Explore the layers of protection we provide for your financial
              liabilities.
            </motion.p>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6 lg:gap-8">
            {features.map((feat, idx) => (
              <motion.div
                key={idx}
                whileHover="hover"
                initial="rest"
                animate="rest"
              >
                <motion.div
                  variants={cardHover}
                  className="h-full bg-white p-4 sm:p-6 lg:p-8 rounded-2xl shadow-sm border border-gray-100 hover:shadow-lg transition-all duration-300 group cursor-pointer text-center md:text-left"
                >
                  <div
                    className={`w-10 h-10 sm:w-12 sm:h-12 lg:w-14 lg:h-14 ${feat.bg} rounded-xl flex items-center justify-center mb-3 sm:mb-4 lg:mb-6 group-hover:scale-110 transition-transform mx-auto md:mx-0`}
                  >
                    <feat.icon
                      className={`w-5 h-5 sm:w-6 sm:h-6 lg:w-7 lg:h-7 ${feat.color}`}
                    />
                  </div>

                  <h3 className="text-sm sm:text-base lg:text-xl font-medium text-slate-800 mb-1 sm:mb-2 lg:mb-3 group-hover:text-[#2076C7] transition-colors">
                    {feat.title}
                  </h3>

                  <p className="text-slate-600 leading-relaxed text-xs sm:text-sm hidden sm:block">
                    {feat.desc}
                  </p>
                </motion.div>
              </motion.div>
            ))}
          </div>
        </motion.section>

        {/* SPECIALIZED LOAN PROTECTION PLANS SECTION */}

        <motion.section
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={staggerContainer}
          className="py-4 sm:py-6"
        >
          <div className="text-center mb-8 sm:mb-12">
            <motion.h2 className="text-3xl md:text-4xl lg:text-5xl font-extrabold font-sans bg-linear-to-r from-[#2076C7] to-[#1CADA3] bg-clip-text text-transparent mb-4 tracking-tight">
              Our Specialized Loan Protection Plans
            </motion.h2>

            <motion.p className="text-lg text-slate-600 max-w-2xl mx-auto font-light">
              Choose the protection plan that perfectly matches your borrowing
              profile.
            </motion.p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
            {PLAN_TYPES.map((plan, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.1 }}
                whileHover={{ y: -8 }}
                className="group relative"
              >
                <div className="absolute inset-0 bg-linear-to-br from-[#2076C7]/5 to-[#1CADA3]/5 rounded-3xl blur-xl opacity-0 group-hover:opacity-100 transition-opacity"></div>

                <div className="relative h-full bg-white p-8 rounded-3xl border border-slate-100 shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col items-center text-center">
                  <div
                    className={`w-16 h-16 rounded-2xl ${plan.bg} ${plan.color} flex items-center justify-center mb-6 shadow-inner group-hover:scale-110 transition-transform`}
                  >
                    <plan.icon size={32} />
                  </div>

                  <h3 className="text-xl font-bold text-slate-800 mb-3 group-hover:text-[#2076C7] transition-colors">
                    {plan.title}
                  </h3>

                  <p className="text-slate-600 leading-relaxed mb-6 font-light">
                    {plan.desc}
                  </p>

                  <div className="mt-auto w-full pt-6 border-t border-slate-50 flex flex-col gap-3">
                    <button
                      onClick={() => {
                        setPlanType(plan.title);

                        document
                          .getElementById("calculator")
                          ?.scrollIntoView({ behavior: "smooth" });
                      }}
                      className="w-full py-3 bg-slate-50 text-slate-700 rounded-xl font-bold text-sm hover:bg-blue-50 hover:text-[#2076C7] transition-all flex items-center justify-center gap-2"
                    >
                      View in Calculator
                      <ChevronRight className="w-4 h-4" />
                    </button>

                    <button
                      onClick={() => openQuote(plan.title)}
                      className="w-full py-3 bg-linear-to-r from-[#2076C7] to-[#1CADA3] text-white rounded-xl font-bold text-sm shadow-md hover:shadow-lg transition-all"
                    >
                      Get Instant Quote
                    </button>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.section>

        {/* ELIGIBILITY CRITERIA SECTION */}

        <motion.section
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="py-8 sm:py-12 border-y border-slate-100 bg-white/50 relative overflow-hidden"
        >
          {/* Background glow for eligibility */}

          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[300px] bg-blue-50/50 blur-[100px] rounded-full -z-10"></div>

          <div className="max-w-5xl mx-auto px-4">
            <div className="text-center mb-8">
              <h2 className="text-3xl font-extrabold text-slate-800 mb-4">
                Eligibility Criteria
              </h2>

              <p className="text-slate-600 font-light">
                Who can apply for our Loan Protector insurance plans?
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
              {[
                {
                  label: "Entry Age",
                  value: "18 - 70 Years",
                  sub: "At time of policy inception",
                  icon: User,
                },

                {
                  label: "Loan Amount",
                  value: "₹1 Lakh - ₹10 Cr",
                  sub: "Flexible limit per borrower",
                  icon: IndianRupee,
                },

                {
                  label: "Loan Tenure",
                  value: "1 - 30 Years",
                  sub: "Matches your loan term",
                  icon: Clock,
                },

                {
                  label: "Borrower Type",
                  value: "Individual / Joint",
                  sub: "Co-borrowers & Groups allowed",
                  icon: Users,
                },
              ].map((item, i) => (
                <div
                  key={i}
                  className="flex flex-col items-center text-center space-y-3"
                >
                  <div className="w-12 h-12 bg-blue-50 text-[#2076C7] rounded-full flex items-center justify-center mb-2">
                    <item.icon size={24} />
                  </div>

                  <h4 className="text-xs font-bold text-slate-400 uppercase tracking-widest">
                    {item.label}
                  </h4>

                  <p className="text-xl font-extrabold text-[#2076C7]">
                    {item.value}
                  </p>

                  <p className="text-[10px] text-slate-500 font-medium">
                    {item.sub}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </motion.section>

        {/* INSURERS SECTION */}

        <motion.section
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={staggerContainer}
          className="py-8 md:py-12"
        >
          <div className="text-center mb-10">
            <motion.h2 className="text-3xl md:text-4xl font-bold font-sans bg-linear-to-r from-[#2076C7] to-[#1CADA3] bg-clip-text text-transparent mb-4">
              Types of Insurance Partners
            </motion.h2>

            <p className="text-slate-600 max-w-2xl mx-auto font-normal text-sm sm:text-base">
              We connect you with a wide network of trusted insurance providers
              across India. Partner allocation depends on specific protection
              needs and coverage requirements.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {INSURANCE_PARTNER_TYPES.map((type, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.1 }}
                className={`${type.color} p-6 sm:p-8 rounded-3xl border hover:shadow-xl hover:-translate-y-1 transition-all duration-300 relative overflow-hidden group flex flex-col h-full`}
              >
                {/* Decorative background shape */}
                <div className="absolute -top-10 -right-10 w-32 h-32 bg-white/40 rounded-full blur-2xl group-hover:bg-white/60 transition-colors"></div>

                <div className="relative z-10 flex-grow">
                  <div className="w-14 h-14 bg-white rounded-2xl shadow-sm flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                    <type.icon className={`w-7 h-7 ${type.textColor}`} />
                  </div>

                  <h3 className="font-extrabold text-[#0056D2] text-xl mb-6">
                    {type.name}
                  </h3>

                  <ul className="space-y-4 mb-8">
                    {type.features.map((feature, fIdx) => (
                      <li key={fIdx} className="flex items-start gap-3">
                        <div className="mt-1 w-5 h-5 bg-white rounded-full flex items-center justify-center shrink-0 shadow-sm">
                          <CheckCircle2
                            className={`w-3.5 h-3.5 ${type.textColor}`}
                          />
                        </div>
                        <span className="text-sm font-medium text-slate-700 leading-snug">
                          {feature}
                        </span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="relative z-10 mt-auto pt-4 border-t border-black/5">
                  <button
                    onClick={() => openQuote("Loan Protector")}
                    className={`w-full py-3.5 bg-white rounded-xl text-sm ${type.textColor} font-bold shadow-sm hover:shadow-md transition-all flex items-center justify-center gap-2 group/btn cursor-pointer`}
                  >
                    Enquire Now
                    <ExternalLink className="w-4 h-4 group-hover/btn:translate-x-0.5 group-hover/btn:-translate-y-0.5 transition-transform" />
                  </button>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.section>

        {/* COVERAGE SECTION */}

        <motion.section
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="bg-linear-to-b from-gray-50 to-white rounded-3xl p-6 md:p-10 border border-gray-100 shadow-sm"
        >
          <div className="flex flex-col lg:flex-row items-center justify-between gap-8 md:gap-12">
            <div className="w-full lg:w-5/12 text-center lg:text-left">
              <motion.span className="text-[#2076C7] font-medium tracking-wider text-sm uppercase mb-2 block">
                Coverage Details
              </motion.span>

              <motion.h2 className="text-2xl sm:text-3xl md:text-4xl font-bold font-sans bg-linear-to-r from-[#2076C7] to-[#1CADA3] bg-clip-text text-transparent mb-4 sm:mb-6 leading-tight">
                What's Covered Under Loan Protection?
              </motion.h2>

              <motion.p className="text-base sm:text-lg text-slate-600 mb-4 sm:mb-8 font-light">
                We ensure a wide safety net so your family remains unburdened
                from debt in difficult times.
              </motion.p>
            </div>

            <div className="w-full lg:w-6/12 grid grid-cols-1 sm:grid-cols-2 gap-4">
              {coverage.map((item, idx) => (
                <div
                  key={idx}
                  className="flex items-center gap-3 bg-white p-4 rounded-xl border border-blue-50 shadow-sm"
                >
                  <CheckCircle className="text-[#1CADA3] w-5 h-5 flex-shrink-0" />

                  <span className="text-sm sm:text-base font-medium text-slate-700">
                    {item}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </motion.section>

        {/* WHY CHOOSE LOAN PROTECTOR */}

        <motion.section
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={staggerContainer}
        >
          <div className="text-center mb-6 sm:mb-10">
            <motion.h2 className="text-2xl sm:text-3xl md:text-4xl font-bold font-sans bg-linear-to-r from-[#2076C7] to-[#1CADA3] bg-clip-text text-transparent mb-4">
              The Benefits of Secure Financing
            </motion.h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {benefits.map((benefit, idx) => (
              <motion.div
                key={idx}
                whileHover="hover"
                initial="rest"
                animate="rest"
              >
                <motion.div
                  variants={cardHover}
                  className="bg-white p-6 sm:p-8 rounded-2xl shadow-sm border border-gray-100 text-center h-full flex flex-col items-center"
                >
                  <div className="w-14 h-14 bg-teal-50 rounded-full flex items-center justify-center mb-6">
                    <benefit.icon className="w-7 h-7 sm:w-8 sm:h-8 text-[#1CADA3]" />
                  </div>

                  <h4 className="text-base sm:text-lg lg:text-xl font-medium text-slate-800 mb-3">
                    {benefit.title}
                  </h4>

                  <p className="text-sm sm:text-base text-slate-600 leading-relaxed">
                    {benefit.desc}
                  </p>
                </motion.div>
              </motion.div>
            ))}
          </div>
        </motion.section>

        {/* FAQ SECTION */}

        <motion.section
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={staggerContainer}
        >
          <div className="text-center mb-6 sm:mb-8">
            <motion.h2 className="text-2xl sm:text-3xl md:text-4xl font-bold font-sans bg-linear-to-r from-[#2076C7] to-[#1CADA3] bg-clip-text text-transparent mb-4">
              Frequently Asked Questions
            </motion.h2>
          </div>

          <div className="max-w-3xl mx-auto space-y-2 sm:space-y-3">
            {faqs.map((faq, idx) => (
              <motion.div
                key={idx}
                className="bg-white rounded-xl border border-gray-200 overflow-hidden shadow-sm"
              >
                <button
                  onClick={() =>
                    setExpandedIdx(expandedIdx === idx ? null : idx)
                  }
                  className="w-full px-4 sm:px-6 py-3 sm:py-4 flex items-start justify-between hover:bg-gray-50 transition-colors group gap-3"
                >
                  <h3 className="text-sm sm:text-base lg:text-lg font-medium text-slate-800 group-hover:text-[#2076C7] transition-colors text-left">
                    {faq.q}
                  </h3>

                  <ChevronDown
                    className={`w-5 h-5 text-gray-400 transition-transform flex-shrink-0 mt-0.5 ${expandedIdx === idx ? "rotate-180" : ""}`}
                  />
                </button>

                <AnimatePresence>
                  {expandedIdx === idx && (
                    <motion.div
                      initial={{ height: 0 }}
                      animate={{ height: "auto" }}
                      exit={{ height: 0 }}
                      className="overflow-hidden"
                    >
                      <div className="px-6 py-4 bg-gray-50 border-t border-gray-100 text-slate-600 leading-relaxed text-sm md:text-base">
                        {faq.a}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            ))}
          </div>
        </motion.section>

        {/* DISCLAIMER */}

        <motion.section
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="mb-8"
        >
          <div className="max-w-4xl mx-auto">
            <div className="bg-amber-50/50 border border-amber-200/50 rounded-2xl p-6 sm:p-8 flex items-start gap-4 shadow-sm">
              <div className="w-12 h-12 bg-amber-100 rounded-xl flex items-center justify-center shrink-0">
                <AlertTriangle className="w-6 h-6 text-amber-600" />
              </div>

              <div className="space-y-2">
                <h4 className="font-bold text-slate-800 text-sm sm:text-base">
                  Important Disclaimer
                </h4>

                <p className="text-amber-900 text-xs sm:text-sm md:text-base leading-relaxed opacity-80">
                  Coverage, premiums, and benefits vary depending on insurer,
                  loan type, age, and health conditions. Loan Protector
                  Insurance is a subject matter of solicitation. Please review
                  the scheme-related documents and policy terms carefully before
                  purchase.
                </p>
              </div>
            </div>
          </div>
        </motion.section>

        {/* CTA SECTION */}

        <motion.section
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="mb-8 to-white"
        >
          <div className="relative overflow-hidden bg-linear-to-r from-[#2076C7] to-[#1CADA3] rounded-3xl p-6 sm:p-8 md:p-12 text-center shadow-xl text-white">
            <h2 className="text-2xl sm:text-3xl md:text-5xl font-medium text-white mb-4 sm:mb-6 tracking-tight">
              Ready to Secure Your Loans?
            </h2>

            <p className="text-blue-50 text-sm sm:text-lg md:text-xl mb-6 sm:mb-10 max-w-2xl mx-auto opacity-90 font-light font-sans">
              Get the best loan protection plans tailored to your needs.
              Protecting your legacy is just a click away.
            </p>

            <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center">
              <button
                onClick={() => openQuote("Loan Protector")}
                className="px-6 sm:px-8 py-3 sm:py-4 text-[#2076C7] bg-white rounded-xl shadow-lg font-medium hover:bg-gray-50 transition-all cursor-pointer"
              >
                Get Instant Quote
              </button>

              <button className="px-6 sm:px-8 py-3 sm:py-4 border border-white/30 bg-white/10 backdrop-blur-sm rounded-xl font-medium hover:bg-white/20 transition-all">
                Talk to an Expert
              </button>
            </div>
          </div>
        </motion.section>
      </main>

      <style jsx global>{`
        @keyframes gradient {
          0% {
            background-position: 0% 50%;
          }

          50% {
            background-position: 100% 50%;
          }

          100% {
            background-position: 0% 50%;
          }
        }

        .animate-gradient {
          animation: gradient 3s ease infinite;
        }
      `}</style>
    </div>
  );
}
