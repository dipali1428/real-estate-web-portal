"use client";

import React, { useState, useEffect, useMemo } from "react";
import {
  ExternalLink,
  Calculator,
  ChevronRight,
  ShieldCheck,
  TrendingUp,
  Briefcase,
  Factory,
  Building2,
  CheckCircle2,
  Info,
  ArrowRight,
  Zap,
  FileText,
  Users,
  Shield,
  Gem,
  Activity,
  Clock,
  Truck,
  Store,
  Landmark,
  Award,
  Target,
  ArrowUpRight,
  Utensils,
  Stethoscope,
  Building,
  Laptop,
  ChevronDown,
} from "lucide-react";

import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Cell,
  AreaChart,
  Area,
} from "recharts";
import { motion, AnimatePresence, Variants } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { useModal } from "../../context/ModalContext";
import Chatbot from "../../component/chatbot/page";

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
  const floating = (delay: number): Variants => ({
    animate: {
      y: [-15, 15, -15],
      transition: {
        duration: 6,
        repeat: Infinity,
        delay,
        ease: "easeInOut",
      },
    },
  });

  return (
    <div className="relative w-full h-[500px] md:h-[600px] flex items-center justify-center overflow-hidden">
      {/* Soft Background Glow */}
      <div className="absolute w-[450px] h-[450px] bg-[#0056D2]/10 rounded-full blur-[120px]" />
      <div className="absolute w-[350px] h-[350px] bg-[#1FAD9F]/10 rounded-full blur-[100px]" />

      {/* Rotating Outer Ring */}
      <motion.div
        animate={{ rotate: 360 }}
        transition={{ duration: 40, repeat: Infinity, ease: "linear" }}
        className="absolute w-[380px] h-[380px] rounded-full border border-dashed border-[#1FAD9F]/30"
      />

      {/* Rotating Inner Ring */}
      <motion.div
        animate={{ rotate: -360 }}
        transition={{ duration: 30, repeat: Infinity, ease: "linear" }}
        className="absolute w-[300px] h-[300px] rounded-full border border-[#0056D2]/20"
      />

      {/* Central Capital Core */}
      <div className="relative z-20 w-40 h-40 rounded-[2rem] bg-gradient-to-br from-[#0056D2] to-[#1FAD9F] flex items-center justify-center shadow-[0_20px_60px_rgba(0,86,210,0.25)]">
        <Building2 className="w-16 h-16 text-white" />
      </div>

      {/* Floating Industry Icons */}

      <motion.div
        variants={floating(0)}
        animate="animate"
        className="absolute top-16 left-12 bg-white shadow-xl rounded-2xl p-4 border border-slate-100"
      >
        <Factory className="w-6 h-6 text-[#0056D2]" />
      </motion.div>

      <motion.div
        variants={floating(1)}
        animate="animate"
        className="absolute bottom-24 left-20 bg-white shadow-xl rounded-2xl p-4 border border-slate-100"
      >
        <Truck className="w-6 h-6 text-[#1FAD9F]" />
      </motion.div>

      <motion.div
        variants={floating(2)}
        animate="animate"
        className="absolute top-24 right-16 bg-white shadow-xl rounded-2xl p-4 border border-slate-100"
      >
        <Store className="w-6 h-6 text-[#0056D2]" />
      </motion.div>

      <motion.div
        variants={floating(1.5)}
        animate="animate"
        className="absolute bottom-20 right-24 bg-white shadow-xl rounded-2xl p-4 border border-slate-100"
      >
        <Stethoscope className="w-6 h-6 text-[#1FAD9F]" />
      </motion.div>

      {/* Subtle Floor Grid */}
      <div
        className="absolute bottom-0 w-full h-[35%] opacity-10"
        style={{
          backgroundImage:
            "linear-gradient(#0056D2 1px, transparent 1px), linear-gradient(to right, #0056D2 1px, transparent 1px)",
          backgroundSize: "40px 40px",
          transform: "rotateX(60deg)",
        }}
      />
    </div>
  );
};

/* TYPE */

type LoanProduct = {
  title: string;
  description: string;
  icon: React.ReactNode;
  features: string[];
  rate: string;
  tenure: string;
};

/* DATA */

const COMMERCIAL_PRODUCTS: LoanProduct[] = [
  {
    title: "Working Capital Loans",
    description:
      "For day-to-day operations (buying raw materials, paying wages). Includes Cash Credit (CC) and Overdraft (OD) facilities.",
    icon: <Briefcase className="w-6 h-6" />,
    features: ["Cash Credit (CC)", "Overdraft (OD)", "Daily operations"],
    rate: "10.5% - 15%",
    tenure: "12-36 Months",
  },
  {
    title: "Term Loans",
    description:
      "Used for long-term investments like business expansion or buying office space.",
    icon: <Building2 className="w-6 h-6" />,
    features: ["Business expansion", "High value", "Structured EMI"],
    rate: "10% - 14%",
    tenure: "Up to 60 Months",
  },
  {
    title: "Machinery/Equipment Finance",
    description:
      "Loans specifically to purchase plant machinery. The machine itself usually acts as the collateral.",
    icon: <Factory className="w-6 h-6" />,
    features: ["Machine as collateral", "Tax benefits", "Up to 80% funding"],
    rate: "9.5% - 13%",
    tenure: "Up to 84 Months",
  },
  {
    title: "Invoice Discounting",
    description:
      "Allows you to get immediate cash by 'selling' your unpaid invoices to a lender.",
    icon: <FileText className="w-6 h-6" />,
    features: ["Immediate cash", "Unpaid invoices", "Short-term"],
    rate: "12% - 20%",
    tenure: "30-90 Days",
  },
];

const GOVT_SCHEMES: LoanProduct[] = [
  {
    title: "PMMY (Mudra Loan)",
    description:
      "Categorized into Shishu (up to 50k), Kishore (5L), Tarun (10L), and Tarun Plus (20L). No collateral required.",
    icon: <Users className="w-6 h-6" />,
    features: ["No collateral", "Up to ₹20 Lakh", "Micro-units"],
    rate: "As per Banks",
    tenure: "Up to 5 Years",
  },
  {
    title: "CGTMSE",
    description:
      "Provides a government guarantee to lenders, allowing MSMEs to get loans without traditional security/collateral.",
    icon: <ShieldCheck className="w-6 h-6" />,
    features: ["Govt guarantee", "Up to ₹5 Crore", "No security"],
    rate: "Competitive",
    tenure: "Based on Lender",
  },
  {
    title: "PMEGP",
    description:
      "A credit-linked subsidy scheme for new units; offers 15–35% subsidy on the project cost.",
    icon: <Target className="w-6 h-6" />,
    features: ["15-35% Subsidy", "Up to ₹50L (Mfg)", "New units"],
    rate: "Subsidized",
    tenure: "3-7 Years",
  },
  {
    title: "Stand-Up India",
    description:
      "Specifically for SC/ST and Women entrepreneurs starting greenfield projects.",
    icon: <Award className="w-6 h-6" />,
    features: ["SC/ST & Women", "Up to ₹1 Crore", "Greenfield"],
    rate: "Standard",
    tenure: "Up to 7 Years",
  },
  {
    title: "PSB Loans in 59 Min",
    description:
      "An online portal for quick in-principle approval from Public Sector Banks.",
    icon: <Zap className="w-6 h-6" />,
    features: ["59 min app", "Up to ₹5 Crore", "PSB backed"],
    rate: "Varies",
    tenure: "Varies",
  },
];

const HIGHLIGHTS = [
  {
    title: "Loan Amount",
    value: "Up to ₹5 Crore",
    icon: <TrendingUp size={18} />,
    desc: "For established businesses",
  },
  {
    title: "Interest Rate",
    value: "Starting 10.5% p.a.",
    icon: <Activity size={18} />,
    desc: "Based on credit profile",
  },
  {
    title: "Approval Time",
    value: "24–72 Hours",
    icon: <Clock size={18} />,
    desc: "Digital-first process",
  },
  {
    title: "No Collateral",
    value: "Available",
    icon: <Shield size={18} />,
    desc: "Unsecured options",
  },
  {
    title: "Tenure",
    value: "Up to 120 Months",
    icon: <Gem size={18} />,
    desc: "For machinery loans",
  },
  {
    title: "Paperwork",
    value: "Minimal Digital",
    icon: <FileText size={18} />,
    desc: "Upload & approve",
  },
];

const DOCUMENTS = [
  {
    category: "KYC & Identity",
    items: [
      "PAN Card (Promoters & Business)",
      "Aadhaar Card of Promoters",
      "Passport / Voter ID (Optional)",
    ],
  },
  {
    category: "Business Proof",
    items: [
      "Business Registration Certificate",
      "Partnership Deed / MoA & AoA",
      "Udyam Registration (for MSMEs)",
      "Utility Bill for Business Address",
    ],
  },
  {
    category: "Financial Documents",
    items: [
      "Last 12 Months GST Returns",
      "12 Months Bank Statements (All Accts)",
      "ITR & Audited Financials (Last 2-3 years)",
      "CMA Data / Projected Financials",
    ],
  },
  {
    category: "Credit & Other Reports",
    items: [
      "CIBIL / Credit Report of Promoters",
      "CMR / Business Credit Report",
      "Existing Loan Sanction Letters",
      "Ownership Proof of Asset (for Machinery/LAP)",
    ],
  },
];

const FAQ = [
  {
    q: "Is collateral mandatory for an SME loan?",
    a: "No, we facilitate unsecured business loans through our lending partners where no collateral is required. Approval is based on business vintage and financials. For larger amounts above ₹2 Crore, secured options may be recommended for better rates.",
  },
  {
    q: "How soon can I get the funds?",
    a: "Digital approval typically happens within 24 hours, and disbursal occurs within 3 working days after document verification. For pre-approved customers, funds can be credited within 24 hours.",
  },
  {
    q: "What is the minimum turnover required?",
    a: "Generally, a minimum annual turnover of ₹10 Lakhs is required for most of our SME lending products. However, startups with strong business models may qualify through our partner NBFCs.",
  },
  {
    q: "Can I prepay my SME loan?",
    a: "Yes, prepayment options are available. The terms vary by lending partner; some offer zero foreclosure charges after a certain period. Typically, floating rate loans have no prepayment penalties.",
  },
  {
    q: "What credit score is needed?",
    a: "Most lenders prefer a CIBIL score of 700+ for unsecured business loans. However, we work with multiple partners who consider overall business health, cash flows, and industry potential.",
  },
  {
    q: "Do you fund new businesses?",
    a: "Yes, we have specialized programs for businesses with 6-12 months of operations. These may require a stronger business plan, promoter contribution, or collateral options.",
  },
];

const LENDER_TYPES = [
  {
    name: "Public Sector Banks",
    features: [
      "Nationwide presence",
      "Competitive interest rates",
      "Government-backed schemes",
    ],
    icon: <Landmark className="w-8 h-8 text-[#0056D2]" />,
    color: "bg-[#E6F0FF] border-[#0056D2]/20",
    buttonColor:
      "text-[#0056D2] border-[#0056D2]/20 hover:border-[#0056D2] hover:bg-blue-50",
  },
  {
    name: "Private Sector Banks",
    features: ["Faster approvals", "Flexible products", "Digital processing"],
    icon: <Building2 className="w-8 h-8 text-[#1FAD9F]" />,
    color: "bg-[#E6F7F5] border-[#1FAD9F]/20",
    buttonColor:
      "text-[#1FAD9F] border-[#1FAD9F]/20 hover:border-[#1FAD9F] hover:bg-teal-50",
  },
  {
    name: "NBFC Lenders",
    features: ["Quick disbursal", "Flexible eligibility", "Startup-friendly"],
    icon: <Briefcase className="w-8 h-8 text-[#0056D2]" />,
    color: "bg-[#E6F0FF] border-[#0056D2]/20",
    buttonColor:
      "text-[#0056D2] border-[#0056D2]/20 hover:border-[#0056D2] hover:bg-blue-50",
  },
  {
    name: "Specialized MSME Lenders",
    features: [
      "Industry-focused financing",
      "Machinery loans",
      "Working capital expertise",
    ],
    icon: <Factory className="w-8 h-8 text-[#1FAD9F]" />,
    color: "bg-[#E6F7F5] border-[#1FAD9F]/20",
    buttonColor:
      "text-[#1FAD9F] border-[#1FAD9F]/20 hover:border-[#1FAD9F] hover:bg-teal-50",
  },
];

const INDUSTRIES_SERVED = [
  {
    title: "Manufacturing, Steel & Defense",
    icon: Factory,
    desc: "Machinery loans for Heavy Engineering, Defense, Textiles, Sugar & Ethanol.",
  },
  {
    title: "Retail, Traders & E-commerce",
    icon: Store,
    desc: "Inventory financing, POS-based loans, and supply chain credit for traders.",
  },
  {
    title: "Logistics & Shipping",
    icon: Truck,
    desc: "Fleet expansion loans, commercial vehicle finance, and shipping vessel credit.",
  },
  {
    title: "Healthcare, Pharma & Hospitals",
    icon: Stethoscope,
    desc: "Medical equipment leasing, hospital infrastructure loans, and working capital.",
  },
  {
    title: "Hotels, Food & Hospitality",
    icon: Utensils,
    desc: "Restaurant & hotel expansion capital, and kitchen equipment loans.",
  },
  {
    title: "Infra & Real Estate",
    icon: Building2,
    desc: "Project financing, heavy equipment leasing, and working capital for contractors.",
  },
  {
    title: "Education & Institutions",
    icon: Building,
    desc: "Infrastructure expansion, smart-class upgrades, and working capital facilities.",
  },
  {
    title: "IT & Digital Services",
    icon: Laptop,
    desc: "Tech stack upgrades, office infrastructure loans, and service-export credit.",
  },
  {
    title: "NBFCs & Financial Entities",
    icon: Landmark,
    desc: "Term loans, working capital, and specialized credit lines for on-lending.",
  },
];

const INDUSTRY_COVERAGE = [
  { name: "Manufacturing", icon: Factory, count: "1200+ units" },
  { name: "Retail & Trade", icon: Store, count: "2000+ stores" },
  { name: "Logistics", icon: Truck, count: "800+ fleets" },
  { name: "Healthcare", icon: Activity, count: "500+ clinics" },
  { name: "Construction", icon: Building2, count: "600+ projects" },
  { name: "F&B", icon: Store, count: "900+ outlets" },
];

const LOAN_STATS_DATA = [
  { name: "Working Capital", minAPR: 10.5, maxAPR: 15, maxLoan: 200 },
  { name: "Machinery", minAPR: 9.5, maxAPR: 13, maxLoan: 500 },
  { name: "Unsecured", minAPR: 12, maxAPR: 19, maxLoan: 75 },
  { name: "Credit Line", minAPR: 11, maxAPR: 16, maxLoan: 100 },
];

const LoanComparisonGraph = () => {
  const [view, setView] = useState<"apr" | "liquidity">("apr");

  return (
    <div className="space-y-8">
      <div className="flex justify-center">
        <div className="bg-slate-100 p-1 rounded-xl flex gap-1">
          <button
            onClick={() => setView("apr")}
            className={`px-4 py-2 rounded-lg text-sm font-black uppercase tracking-widest transition-all ${view === "apr" ? "bg-white text-[#0056D2] shadow-sm" : "text-slate-500 hover:text-slate-700"}`}
          >
            Interest Rates
          </button>
          <button
            onClick={() => setView("liquidity")}
            className={`px-4 py-2 rounded-lg text-sm font-black uppercase tracking-widest transition-all ${view === "liquidity" ? "bg-white text-[#0056D2] shadow-sm" : "text-slate-500 hover:text-slate-700"}`}
          >
            Loan Limits
          </button>
        </div>
      </div>

      <div className="h-[300px] w-full">
        <ResponsiveContainer width="100%" height="100%">
          {view === "apr" ? (
            <BarChart
              data={LOAN_STATS_DATA}
              margin={{ top: 20, right: 30, left: 0, bottom: 0 }}
            >
              <CartesianGrid
                strokeDasharray="3 3"
                vertical={false}
                stroke="#E2E8F0"
              />
              <XAxis
                dataKey="name"
                axisLine={false}
                tickLine={false}
                tick={{ fill: "#64748B", fontSize: 10, fontWeight: 700 }}
                interval={0}
              />
              <YAxis hide />
              <Tooltip
                cursor={{ fill: "#F1F5F9" }}
                content={({ active, payload }) => {
                  if (active && payload && payload.length) {
                    return (
                      <div className="bg-white p-4 rounded-xl shadow-2xl border border-slate-100">
                        <p className="text-xs font-black text-slate-400 mb-1 uppercase tracking-widest">
                          {payload[0].payload.name}
                        </p>
                        <div className="space-y-1">
                          <p className="text-sm font-extrabold text-[#0056D2]">
                            {payload[0].value}% - {payload[0].payload.maxAPR}%
                          </p>
                          <p className="text-xs font-bold text-slate-500 uppercase">
                            Annual Interest Rate
                          </p>
                        </div>
                      </div>
                    );
                  }
                  return null;
                }}
              />
              <Bar dataKey="minAPR" radius={[4, 4, 0, 0]} barSize={40}>
                {LOAN_STATS_DATA.map((entry, index) => (
                  <Cell
                    key={`cell-${index}`}
                    fill={index % 2 === 0 ? "#0056D2" : "#1FAD9F"}
                    fillOpacity={0.8}
                  />
                ))}
              </Bar>
            </BarChart>
          ) : (
            <AreaChart
              data={LOAN_STATS_DATA}
              margin={{ top: 20, right: 30, left: 0, bottom: 0 }}
            >
              <defs>
                <linearGradient id="colorLoan" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#0056D2" stopOpacity={0.3} />
                  <stop offset="95%" stopColor="#0056D2" stopOpacity={0} />
                </linearGradient>
              </defs>
              <CartesianGrid
                strokeDasharray="3 3"
                vertical={false}
                stroke="#E2E8F0"
              />
              <XAxis
                dataKey="name"
                axisLine={false}
                tickLine={false}
                tick={{ fill: "#64748B", fontSize: 10, fontWeight: 700 }}
              />
              <YAxis hide />
              <Tooltip
                content={({ active, payload }) => {
                  if (active && payload && payload.length) {
                    return (
                      <div className="bg-white p-4 rounded-xl shadow-2xl border border-slate-100">
                        <p className="text-xs font-black text-slate-400 mb-1 uppercase tracking-widest">
                          {payload[0].payload.name}
                        </p>
                        <div className="space-y-1">
                          <p className="text-lg font-extrabold text-[#0056D2]">
                            ₹{payload[0].value}
                            {payload[0].value >= 1 ? " Cr" : "L"}
                          </p>
                          <p className="text-xs font-bold text-slate-500 uppercase">
                            Maximum Eligibility
                          </p>
                        </div>
                      </div>
                    );
                  }
                  return null;
                }}
              />
              <Area
                type="monotone"
                dataKey="maxLoan"
                stroke="#0056D2"
                strokeWidth={3}
                fillOpacity={1}
                fill="url(#colorLoan)"
              />
            </AreaChart>
          )}
        </ResponsiveContainer>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 px-4">
        {LOAN_STATS_DATA.map((item, idx) => (
          <div
            key={idx}
            className="bg-slate-50 p-3 rounded-xl border border-slate-100"
          >
            <p className="text-xs font-black text-slate-400 uppercase tracking-widest mb-1 truncate">
              {item.name}
            </p>
            <p className="text-xs font-extrabold text-slate-700">
              {view === "apr"
                ? `${item.minAPR}% - ${item.maxAPR}%`
                : `Up to ₹${item.maxLoan}Cr`}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
};

const EMICalculator = () => {
  const { openQuote } = useModal();
  const [amount, setAmount] = useState(1000000);
  const [rate, setRate] = useState(12);
  const [tenure, setTenure] = useState(36);

  const [emi, setEmi] = useState(0);
  const [totalInterest, setTotalInterest] = useState(0);
  const [totalPayment, setTotalPayment] = useState(0);

  useEffect(() => {
    const r = rate / 12 / 100;
    const n = tenure;

    let emiValue;
    if (r === 0) {
      emiValue = amount / n;
    } else {
      emiValue = (amount * r * Math.pow(1 + r, n)) / (Math.pow(1 + r, n) - 1);
    }

    if (isFinite(emiValue)) {
      setEmi(Math.round(emiValue));
      const totalPay = emiValue * n;
      setTotalPayment(Math.round(totalPay));
      setTotalInterest(Math.round(totalPay - amount));
    }
  }, [amount, rate, tenure]);

  return (
    <div className="bg-white rounded-2xl shadow-xl border border-[#1FAD9F]/10 p-4 sm:p-10 lg:p-12">
      <div className="flex items-center gap-3 mb-8 sm:mb-10">
        <div className="p-3 bg-[#E6F7F5] rounded-2xl text-[#1FAD9F]">
          <Calculator className="w-6 h-6" />
        </div>
        <h3 className="text-2xl md:text-3xl font-extrabold font-sans">
          <span className="bg-gradient-to-r from-[#0056D2] to-[#1FAD9F] bg-clip-text text-transparent">
            SME Loan EMI Architect
          </span>
        </h3>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20">
        <div className="space-y-10">
          <div className="space-y-6">
            <div className="flex justify-between items-center bg-slate-50 p-3 rounded-xl border border-slate-200 focus-within:border-[#0056D2] focus-within:ring-1 focus-within:ring-[#0056D2] transition-all">
              <label className="text-sm font-bold text-[#0056D2] uppercase tracking-widest">
                Loan Amount
              </label>
              <div className="flex items-center gap-1 text-2xl font-black text-[#0056D2]">
                <span>₹</span>
                <input
                  type="number"
                  value={amount}
                  onChange={(e) => {
                    const val = Number(e.target.value);
                    if (val >= 100000 && val <= 100000000) setAmount(val);
                  }}
                  className="bg-transparent text-right outline-none w-24 sm:w-32 appearance-none p-0 border-0 focus:ring-0"
                />
              </div>
            </div>
            <div className="flex items-center gap-4">
              <button
                onClick={() => setAmount(Math.max(100000, amount - 50000))}
                className="w-8 h-8 rounded-full bg-slate-100 flex items-center justify-center text-[#0056D2] font-black text-lg hover:bg-[#0056D2] hover:text-white transition-colors flex-shrink-0"
              >
                -
              </button>
              <input
                type="range"
                min="100000"
                max="100000000"
                step="50000"
                value={amount}
                onChange={(e) => setAmount(Number(e.target.value))}
                className="w-full h-2 bg-slate-100 rounded-lg appearance-none cursor-pointer accent-[#0056D2]"
              />
              <button
                onClick={() => setAmount(Math.min(100000000, amount + 50000))}
                className="w-8 h-8 rounded-full bg-slate-100 flex items-center justify-center text-[#0056D2] font-black text-lg hover:bg-[#0056D2] hover:text-white transition-colors flex-shrink-0"
              >
                +
              </button>
            </div>
            <div className="flex justify-between text-xs font-bold text-[#1FAD9F] uppercase tracking-tighter">
              <span>₹1 Lakh</span>
              <span>₹10 Crore</span>
            </div>
          </div>

          <div className="space-y-6">
            <div className="flex justify-between items-center bg-slate-50 p-3 rounded-xl border border-slate-200 focus-within:border-[#1FAD9F] focus-within:ring-1 focus-within:ring-[#1FAD9F] transition-all">
              <label className="text-sm font-bold text-[#0056D2] uppercase tracking-widest">
                Interest Rate (% p.a.)
              </label>
              <div className="flex items-center gap-1 text-2xl font-black text-[#1FAD9F]">
                <input
                  type="number"
                  value={rate}
                  step="0.1"
                  onChange={(e) => {
                    const val = Number(e.target.value);
                    if (val >= 8 && val <= 24) setRate(val);
                  }}
                  className="bg-transparent text-right outline-none w-16 appearance-none p-0 border-0 focus:ring-0"
                />
                <span>%</span>
              </div>
            </div>
            <div className="flex items-center gap-4">
              <button
                onClick={() => setRate(Math.max(8, rate - 0.5))}
                className="w-8 h-8 rounded-full bg-slate-100 flex items-center justify-center text-[#1FAD9F] font-black text-lg hover:bg-[#1FAD9F] hover:text-white transition-colors flex-shrink-0"
              >
                -
              </button>
              <input
                type="range"
                min="8"
                max="24"
                step="0.5"
                value={rate}
                onChange={(e) => setRate(Number(e.target.value))}
                className="w-full h-2 bg-slate-100 rounded-lg appearance-none cursor-pointer accent-[#1FAD9F]"
              />
              <button
                onClick={() => setRate(Math.min(24, rate + 0.5))}
                className="w-8 h-8 rounded-full bg-slate-100 flex items-center justify-center text-[#1FAD9F] font-black text-lg hover:bg-[#1FAD9F] hover:text-white transition-colors flex-shrink-0"
              >
                +
              </button>
            </div>
            <div className="flex justify-between text-xs font-bold text-[#0056D2] uppercase tracking-tighter">
              <span>8% p.a.</span>
              <span>24% p.a.</span>
            </div>
          </div>

          <div className="space-y-6">
            <div className="flex justify-between items-center bg-slate-50 p-3 rounded-xl border border-slate-200 focus-within:border-[#0056D2] focus-within:ring-1 focus-within:ring-[#0056D2] transition-all">
              <label className="text-sm font-bold text-[#0056D2] uppercase tracking-widest">
                Tenure (Months)
              </label>
              <div className="flex items-center gap-2 text-2xl font-black text-slate-800">
                <input
                  type="number"
                  value={tenure}
                  onChange={(e) => {
                    const val = Number(e.target.value);
                    if (val >= 12 && val <= 120) setTenure(val);
                  }}
                  className="bg-transparent text-right outline-none w-16 appearance-none p-0 border-0 focus:ring-0"
                />
                <span className="text-sm">Months</span>
              </div>
            </div>
            <div className="flex items-center gap-4">
              <button
                onClick={() => setTenure(Math.max(12, tenure - 6))}
                className="w-8 h-8 rounded-full bg-slate-100 flex items-center justify-center text-[#0056D2] font-black text-lg hover:bg-[#0056D2] hover:text-white transition-colors flex-shrink-0"
              >
                -
              </button>
              <input
                type="range"
                min="12"
                max="120"
                step="6"
                value={tenure}
                onChange={(e) => setTenure(Number(e.target.value))}
                className="w-full h-2 bg-slate-100 rounded-lg appearance-none cursor-pointer accent-[#0056D2]"
              />
              <button
                onClick={() => setTenure(Math.min(120, tenure + 6))}
                className="w-8 h-8 rounded-full bg-slate-100 flex items-center justify-center text-[#0056D2] font-black text-lg hover:bg-[#0056D2] hover:text-white transition-colors flex-shrink-0"
              >
                +
              </button>
            </div>
            <div className="flex justify-between text-xs font-bold text-[#1FAD9F] uppercase tracking-tighter">
              <span>1 Year</span>
              <span>10 Years</span>
            </div>
          </div>

          <div className="bg-[#E6F7F5] p-6 rounded-xl border border-[#1FAD9F]/20">
            <div className="flex items-center gap-2 text-[#1FAD9F] mb-2">
              <Info size={16} />
              <span className="text-xs font-bold uppercase">Pro Tip</span>
            </div>
            <p className="text-xs text-slate-600 leading-relaxed">
              For machinery loans, consider longer tenures (60-84 months) to
              match asset life and optimize monthly cash flow.
            </p>
          </div>
        </div>

        <div className="bg-gradient-to-br from-[#E6F0FF] to-white rounded-2xl p-5 sm:p-8 flex flex-col justify-center space-y-6 sm:space-y-8 border border-[#0056D2]/20">
          <div className="text-center space-y-2">
            <p className="text-slate-500 text-sm font-bold uppercase tracking-[0.2em]">
              Estimated Monthly EMI
            </p>
            <p className="text-2xl sm:text-4xl lg:text-5xl font-extrabold bg-gradient-to-r from-[#2076C7] to-[#1CADA3] bg-clip-text text-transparent break-words">
              ₹{emi.toLocaleString("en-IN")}
            </p>
          </div>

          <div className="h-px bg-gradient-to-r from-transparent via-[#0056D2]/20 to-transparent w-full" />

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-8">
            <div className="break-words">
              <p className="text-slate-400 text-xs font-bold uppercase tracking-wider">
                Total Interest
              </p>
              <p className="text-sm sm:text-lg font-extrabold text-[#2076C7]">
                ₹{totalInterest.toLocaleString("en-IN")}
              </p>
            </div>
            <div className="break-words">
              <p className="text-slate-400 text-xs font-bold uppercase tracking-wider">
                Total Payment
              </p>
              <p className="text-sm sm:text-lg font-extrabold text-[#1CADA3]">
                ₹{totalPayment.toLocaleString("en-IN")}
              </p>
            </div>
          </div>

          <Link
            href="/products/Loans/SME/apply"
            className="w-full bg-gradient-to-r from-[#0056D2] to-[#1FAD9F] text-white py-4 rounded-xl font-bold shadow-lg hover:shadow-xl hover:scale-[1.02] transition-all cursor-pointer flex items-center justify-center gap-2 group"
          >
            Apply for SME Loan{" "}
            <ArrowUpRight className="w-4 h-4 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
          </Link>

          <p className="text-xs text-center text-slate-400">
            *Rates indicative, subject to credit assessment
          </p>
        </div>
      </div>
    </div>
  );
};

/* MAIN PAGE */

export default function SMELoansPage() {
  const { openQuote } = useModal();
  const [expandedIdx, setExpandedIdx] = useState<number | null>(null);
  const [activeProductTab, setActiveProductTab] = useState<
    "commercial" | "govt"
  >("commercial");

  return (
    <div className="min-h-screen bg-gradient-to-b from-white to-[#F8FCFC] text-slate-800 font-sans selection:bg-[#0056D2] selection:text-white relative overflow-hidden">
      {/* Background Animated Blobs - Matching Homepage Hero */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none z-0">
        <div
          className="absolute -top-40 -right-40 w-[500px] h-[500px] rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-pulse"
          style={{ backgroundColor: "rgba(28, 202, 163, 0.3)" }}
        ></div>
        <div
          className="absolute top-[20%] -left-40 w-[600px] h-[600px] rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-pulse"
          style={{
            backgroundColor: "rgba(32, 118, 199, 0.3)",
            animationDelay: "1s",
          }}
        ></div>
        <div
          className="absolute top-[50%] left-1/2 transform -translate-x-1/2 w-[800px] h-[800px] rounded-full mix-blend-multiply filter blur-3xl opacity-10 animate-pulse"
          style={{
            backgroundColor: "rgba(28, 202, 163, 0.2)",
            animationDelay: "2s",
          }}
        ></div>
        <div
          className="absolute -bottom-40 -right-40 w-[600px] h-[600px] rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-pulse"
          style={{
            backgroundColor: "rgba(32, 118, 199, 0.3)",
            animationDelay: "1.5s",
          }}
        ></div>
      </div>
      {/* HERO SECTION */}
      <header
        className="relative w-full overflow-hidden pt-24 pb-16 md:pb-20"
        style={{
          background:
            "linear-gradient(to bottom right, #79c2f7ff, #ffffffff, #e5f8e5ff)",
        }}
      >
        {/* Background Gradient Layer */}
        <div className="absolute inset-0 z-0"></div>

        {/* Glow Effects */}
        <div className="absolute top-0 left-1/3 w-[500px] h-[500px] bg-[#0056D2]/5 rounded-full blur-[100px] -translate-y-1/2"></div>
        <div className="absolute bottom-0 right-1/4 w-[500px] h-[500px] bg-[#1FAD9F]/5 rounded-full blur-[100px] translate-y-1/2"></div>

        {/* Grid texture overlay */}
        <div
          className="absolute inset-0 opacity-[0.02]"
          style={{
            backgroundImage:
              "linear-gradient(#0056D2 1px, transparent 1px), linear-gradient(to right, #0056D2 1px, transparent 1px)",
            backgroundSize: "64px 64px",
          }}
        />

        <div className="container mx-auto px-4 md:px-6 max-w-7xl relative z-10">
          <div className="flex flex-col lg:flex-row items-center gap-12 lg:gap-20">
            {/* Hero Text - Minimal version without facts and figures */}
            <div className="w-full lg:w-1/2 text-center lg:text-left space-y-8">
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="inline-flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-[#0056D2]/10 to-[#1FAD9F]/10 border border-[#0056D2]/20 rounded-full text-xs font-bold uppercase tracking-[0.2em] text-[#0056D2]"
              >
                <ShieldCheck className="w-4 h-4 text-[#1FAD9F]" />
                Empowering Indian SMEs
              </motion.div>

              <motion.h1
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3, duration: 0.7 }}
                className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold bg-gradient-to-r from-[#2076C7] to-[#1CADA3] bg-clip-text text-transparent leading-tight"
              >
                Structured Business <br className="hidden md:block" />
                Financing for <br className="hidden md:block" />
                Growth-Driven SMEs
              </motion.h1>

              <motion.p
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4, duration: 0.7 }}
                className="text-base md:text-lg lg:text-xl text-slate-700 max-w-2xl mx-auto lg:mx-0 leading-relaxed font-normal"
              >
                Fast, flexible, and secure business financing designed for your
                growth journey.
              </motion.p>

              <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3, duration: 0.7 }}
                className="flex flex-wrap justify-center lg:justify-start gap-4 pt-2"
              >
                <Link
                  href="/products/Loans/SME/apply"
                  className="group relative px-8 py-4 rounded-xl font-bold text-white overflow-hidden shadow-[0_8px_20px_rgba(0,86,210,0.25)] hover:shadow-[0_8px_25px_rgba(31,173,159,0.35)] transition-all flex items-center gap-2 cursor-pointer"
                >
                  <span className="absolute inset-0 bg-gradient-to-r from-[#0056D2] to-[#1FAD9F]"></span>
                  <span className="absolute inset-0 opacity-0 group-hover:opacity-100 transition duration-300 bg-gradient-to-r from-[#1FAD9F] to-[#0056D2]"></span>
                  <span className="relative flex items-center justify-center gap-2">
                    Enquire Online <ArrowRight className="w-5 h-5" />
                  </span>
                </Link>
                <button
                  onClick={() =>
                    document
                      .getElementById("products")
                      ?.scrollIntoView({ behavior: "smooth" })
                  }
                  className="px-8 py-4 border-2 border-[#1FAD9F]/30 rounded-xl font-bold text-[#0056D2] hover:border-[#1FAD9F] hover:bg-[#E6F7F5] transition-all duration-300"
                >
                  Explore Products
                </button>
              </motion.div>
            </div>

            {/* Hero Graphic - Enhanced visual only, no facts/figures */}
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8 }}
              className="w-full lg:w-1/2 relative"
            >
              <div className="absolute inset-0 bg-gradient-to-r from-[#0056D2]/20 to-[#1FAD9F]/20 blur-3xl rounded-full"></div>
              <HeroGraphic />
            </motion.div>
          </div>
        </div>
      </header>

      {/* EMI CALCULATOR SECTION */}
      <section className="py-12 md:py-16 bg-gradient-to-b from-[#F8FCFC] to-white relative overflow-hidden">
        <div className="container mx-auto px-4 md:px-6 max-w-5xl relative z-10">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-extrabold font-sans mb-4">
              <span className="bg-gradient-to-r from-[#0056D2] to-[#1FAD9F] bg-clip-text text-transparent">
                Precision Planning
              </span>
            </h2>
          </div>
          <EMICalculator />
        </div>
      </section>

      {/* PRODUCT SECTION */}
      <section
        id="products"
        className="py-12 md:py-16 bg-gradient-to-b from-white to-[#F8FCFC]"
      >
        <div className="container mx-auto px-4 md:px-6 max-w-7xl">
          <div className="text-center mb-10 space-y-4">
            <h2 className="text-3xl md:text-4xl font-extrabold font-sans">
              <span className="bg-gradient-to-r from-[#0056D2] to-[#1FAD9F] bg-clip-text text-transparent">
                Customized SME Products
              </span>
            </h2>
            <p className="text-slate-600 max-w-2xl mx-auto font-normal text-sm sm:text-base leading-relaxed">
              Explore our range of commercial loan products and
              government-backed schemes designed to fuel your business growth.
            </p>
          </div>

          <div className="flex justify-center mb-12">
            <div className="bg-slate-100 p-1.5 rounded-2xl flex gap-1 w-full sm:w-auto max-w-md">
              <button
                onClick={() => setActiveProductTab("commercial")}
                className={`flex-1 px-6 py-3 rounded-xl text-sm font-black uppercase tracking-widest transition-all ${
                  activeProductTab === "commercial"
                    ? "bg-white text-[#0056D2] shadow-sm"
                    : "text-slate-500 hover:text-slate-700"
                }`}
              >
                Commercial Loans
              </button>
              <button
                onClick={() => setActiveProductTab("govt")}
                className={`flex-1 px-6 py-3 rounded-xl text-sm font-black uppercase tracking-widest transition-all ${
                  activeProductTab === "govt"
                    ? "bg-white text-[#1FAD9F] shadow-sm"
                    : "text-slate-500 hover:text-slate-700"
                }`}
              >
                Government Schemes
              </button>
            </div>
          </div>

          <motion.div
            key={activeProductTab}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
            className="flex flex-wrap justify-center items-stretch gap-6"
          >
            {(activeProductTab === "commercial"
              ? COMMERCIAL_PRODUCTS
              : GOVT_SCHEMES
            ).map((product, idx) => (
              <motion.div
                key={idx}
                whileHover="hover"
                initial="rest"
                className="w-full sm:w-[calc(50%-12px)] lg:w-[calc(33.33%-16px)] xl:w-[calc(20%-19.2px)] bg-white p-6 rounded-2xl shadow-lg border border-[#1FAD9F]/10 hover:shadow-xl transition-all duration-300 flex flex-col h-full"
              >
                <div className="w-12 h-12 bg-[#E6F7F5] rounded-xl flex items-center justify-center text-[#1FAD9F] mb-6 border border-[#1FAD9F]/20 group-hover:bg-gradient-to-r group-hover:from-[#0056D2] group-hover:to-[#1FAD9F] group-hover:text-white transition-all duration-300">
                  {product.icon}
                </div>
                <h3 className="text-lg font-extrabold text-[#2076C7] mb-2">
                  {product.title}
                </h3>
                <p className="text-slate-600 text-sm leading-relaxed mb-6 flex-1 font-normal">
                  {product.description}
                </p>

                <div className="space-y-3 mb-6 bg-slate-50 p-4 rounded-xl border border-slate-100">
                  <div className="flex flex-col gap-1">
                    <span className="text-xs uppercase font-bold text-slate-400">
                      Interest Rate / Cost
                    </span>
                    <span className="font-bold text-[#0056D2] text-sm">
                      {product.rate}
                    </span>
                  </div>
                  <div className="flex flex-col gap-1">
                    <span className="text-xs uppercase font-bold text-slate-400">
                      Tenure
                    </span>
                    <span className="font-bold text-[#1FAD9F] text-sm">
                      {product.tenure}
                    </span>
                  </div>
                </div>

                <div className="space-y-2 mb-6">
                  {product.features.map((feature, fIdx) => (
                    <div key={fIdx} className="flex items-center gap-2">
                      <CheckCircle2 className="w-3 h-3 text-[#1FAD9F] flex-shrink-0" />
                      <span className="text-xs text-slate-600 font-medium">
                        {feature}
                      </span>
                    </div>
                  ))}
                </div>

                <Link
                  href="/products/Loans/SME/apply"
                  className="w-full py-3 bg-gradient-to-r from-[#0056D2] to-[#1FAD9F] text-white rounded-xl text-xs font-black uppercase tracking-widest flex items-center justify-center gap-2 group cursor-pointer mt-auto hover:shadow-md transition-all"
                >
                  Apply Today{" "}
                  <ChevronRight
                    size={14}
                    className="group-hover:translate-x-1 transition-transform"
                  />
                </Link>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>
      {/* LENDERS SECTION */}
      <section className="py-12 md:py-16 bg-gradient-to-b from-white to-[#F8FCFC] relative">
        <div className="container mx-auto px-4 md:px-6 max-w-7xl">
          <div className="text-center mb-16 space-y-4">
            <h2 className="text-3xl md:text-4xl font-extrabold font-sans">
              <span className="bg-gradient-to-r from-[#2076C7] to-[#1CADA3] bg-clip-text text-transparent">
                Types of Lending Partners
              </span>
            </h2>
            <p className="text-slate-600 max-w-2xl mx-auto font-normal text-sm sm:text-base">
              We connect businesses with a wide network of trusted lending
              institutions across India. Lender allocation depends on
              eligibility, credit profile, and business requirements.
            </p>
            <p className="text-xs text-slate-400 max-w-3xl mx-auto mt-4 italic font-medium">
              *Lender participation depends on eligibility, asset type, lender
              policies, and portfolio composition. Some lenders may provide
              secured lending options through partners.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {LENDER_TYPES.map((lender, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.05 }}
                className={`${lender.color} p-6 rounded-2xl border hover:shadow-xl hover:-translate-y-1 transition-all duration-300 relative overflow-hidden group flex flex-col h-full`}
              >
                <div className="flex flex-col items-start mb-6 w-full">
                  <div className="w-14 h-14 rounded-xl bg-white flex items-center justify-center font-black shadow-sm mb-4">
                    {lender.icon}
                  </div>
                  <h3 className="font-extrabold text-xl text-[#2076C7] leading-tight">
                    {lender.name}
                  </h3>
                </div>

                <div className="space-y-4 mb-8 flex-1">
                  {lender.features.map((feature, fIdx) => (
                    <div key={fIdx} className="flex items-start gap-3">
                      <CheckCircle2
                        className={`w-5 h-5 flex-shrink-0 mt-0.5 ${idx % 2 === 0 ? "text-[#0056D2]" : "text-[#1FAD9F]"}`}
                      />
                      <span className="font-medium text-slate-700 text-sm">
                        {feature}
                      </span>
                    </div>
                  ))}
                </div>

                <div className="mt-auto w-full pt-4 border-t border-black/5">
                  <Link
                    href="/products/Loans/SME/apply"
                    className={`w-full py-3 bg-white rounded-lg text-sm font-bold border transition-all flex items-center justify-center gap-2 group/btn ${lender.buttonColor}`}
                  >
                    Enquire Now
                    <ExternalLink className="w-4 h-4 group-hover/btn:translate-x-0.5 group-hover/btn:-translate-y-0.5 transition-transform" />
                  </Link>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* INDUSTRIES WE SERVE */}
      <section className="py-12 md:py-16 bg-slate-50 border-t border-slate-200/50">
        <div className="container mx-auto px-4 md:px-6 max-w-7xl">
          <div className="text-center mb-12 md:mb-16">
            <h2 className="text-3xl md:text-4xl font-extrabold font-sans mb-4">
              <span className="bg-gradient-to-r from-[#0056D2] to-[#1FAD9F] bg-clip-text text-transparent">
                Industries We Serve
              </span>
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
            {INDUSTRIES_SERVED.map((industry: any, index: number) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="bg-white p-8 rounded-2xl hover:shadow-xl transition-all duration-300 border border-slate-100 group flex flex-col items-center text-center h-full"
              >
                <div className="w-16 h-16 bg-blue-50 rounded-2xl flex items-center justify-center mb-6 group-hover:-translate-y-2 transition-transform duration-300">
                  <industry.icon className="text-[#0056D2] w-8 h-8" />
                </div>
                <h3 className="font-extrabold text-xl text-[#2076C7] mb-3 font-sans">
                  {industry.title}
                </h3>
                <p className="text-sm text-slate-600 leading-relaxed max-w-xs mx-auto font-normal">
                  {industry.desc}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ELIGIBILITY FACTORS SECTION */}
      <section className="py-12 md:py-16 bg-white border-t border-slate-200/50">
        <div className="container mx-auto px-4 md:px-6 max-w-7xl">
          <div className="text-center mb-12 md:mb-16">
            <h2 className="text-3xl md:text-4xl font-extrabold font-sans mb-4">
              <span className="bg-gradient-to-r from-[#2076C7] to-[#1CADA3] bg-clip-text text-transparent">
                Eligibility Factors Considered
              </span>
            </h2>
            <p className="text-slate-600 max-w-2xl mx-auto font-normal text-sm sm:text-base leading-relaxed">
              We look at the complete picture of your business. Here are the key
              factors that determine your eligibility and loan limits.
            </p>
          </div>

          <div className="grid grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              {
                title: "Business Vintage",
                desc: "Minimum 1-3 years of continuous operation depending on the lender.",
                icon: <Building2 className="w-6 h-6 text-[#0056D2]" />,
              },
              {
                title: "Annual Turnover",
                desc: "Consistent revenue flow validating business size and scale.",
                icon: <ArrowUpRight className="w-6 h-6 text-[#1FAD9F]" />,
              },
              {
                title: "Cash Flow Stability",
                desc: "Healthy month-on-month banking transactions and profitability.",
                icon: <Landmark className="w-6 h-6 text-[#0056D2]" />,
              },
              {
                title: "Credit Profile",
                desc: "Promoter's CIBIL score and the company's credit history.",
                icon: <ShieldCheck className="w-6 h-6 text-[#1FAD9F]" />,
              },
              {
                title: "Industry Type",
                desc: "Lender policies varying by manufacturing, retail, or service sectors.",
                icon: <Factory className="w-6 h-6 text-[#0056D2]" />,
              },
              {
                title: "Existing Obligations",
                desc: "Current EMIs and debt-to-income ratios ensuring affordability.",
                icon: <Briefcase className="w-6 h-6 text-[#1FAD9F]" />,
              },
            ].map((factor, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 15 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.1 }}
                className="bg-slate-50 p-6 rounded-2xl border border-slate-100 hover:shadow-md transition-all group"
              >
                <div className="w-12 h-12 bg-white rounded-xl shadow-sm flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                  {factor.icon}
                </div>
                <h3 className="font-extrabold text-[#2076C7] text-lg mb-2">
                  {factor.title}
                </h3>
                <p className="text-sm text-slate-600 leading-relaxed font-normal">
                  {factor.desc}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* DOCUMENTS REQUIRED SECTION */}
      <section className="py-12 md:py-16 bg-slate-50 relative">
        <div className="container mx-auto px-4 md:px-6 max-w-7xl">
          <div className="text-center mb-16 space-y-4">
            <h2 className="text-3xl md:text-4xl font-extrabold font-sans">
              <span className="bg-gradient-to-r from-[#2076C7] to-[#1CADA3] bg-clip-text text-transparent">
                Documents Required
              </span>
            </h2>
            <p className="text-slate-600 max-w-2xl mx-auto font-normal text-sm sm:text-base leading-relaxed">
              Keep these documents handy to ensure a smooth and accelerated loan
              approval process.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {DOCUMENTS.map((docCategory, idx) => {
              const gradients = [
                "from-[#0056D2] to-[#1FAD9F]",
                "from-[#1FAD9F] to-[#0056D2]",
                "from-[#0056D2] to-[#1FAD9F]",
                "from-[#1FAD9F] to-[#0056D2]",
              ];
              const lightBgs = [
                "bg-[#E6F0FF]",
                "bg-[#E6F7F5]",
                "bg-[#E6F0FF]",
                "bg-[#E6F7F5]",
              ];
              const borderColors = [
                "border-[#0056D2]/20",
                "border-[#1FAD9F]/20",
                "border-[#0056D2]/20",
                "border-[#1FAD9F]/20",
              ];
              const accentText = [
                "text-[#0056D2]",
                "text-[#1FAD9F]",
                "text-[#0056D2]",
                "text-[#1FAD9F]",
              ];
              return (
                <motion.div
                  key={idx}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: idx * 0.1, duration: 0.5 }}
                  whileHover={{ y: -6 }}
                  className={`bg-white rounded-2xl border ${borderColors[idx]} shadow-md hover:shadow-xl transition-all duration-300 overflow-hidden group`}
                >
                  {/* Gradient Header Strip */}
                  <div
                    className={`bg-gradient-to-r ${gradients[idx]} px-6 py-5 flex items-center gap-4`}
                  >
                    <div className="w-11 h-11 bg-white/20 rounded-xl flex items-center justify-center text-white backdrop-blur-sm border border-white/30 group-hover:scale-110 transition-transform duration-300">
                      <FileText className="w-5 h-5 text-white" />
                    </div>
                    <div>
                      <p className="text-xs font-bold text-white/70 uppercase tracking-widest">
                        Category {idx + 1}
                      </p>
                      <h3 className="font-extrabold text-white text-sm sm:text-base leading-tight">
                        {docCategory.category}
                      </h3>
                    </div>
                  </div>

                  {/* Items */}
                  <div className="p-5">
                    <ul className="space-y-3">
                      {docCategory.items.map((item, itemIdx) => (
                        <li key={itemIdx} className="flex items-start gap-3">
                          <div
                            className={`mt-0.5 w-5 h-5 ${lightBgs[idx]} rounded-full flex items-center justify-center flex-shrink-0 border ${borderColors[idx]}`}
                          >
                            <CheckCircle2
                              className={`w-3 h-3 ${accentText[idx]}`}
                            />
                          </div>
                          <span className="text-sm font-medium text-slate-700 leading-snug">
                            {item}
                          </span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* STRATEGIC FAQ SECTION */}
      <section
        id="faq"
        className="py-12 md:py-16 bg-gradient-to-b from-white to-[#F8FCFC] border-t border-[#1FAD9F]/10"
      >
        <div className="container mx-auto px-4 md:px-6 max-w-7xl">
          <div className="text-center mb-16 space-y-4">
            <h2 className="text-3xl md:text-4xl font-extrabold font-sans">
              <span className="bg-gradient-to-r from-[#2076C7] to-[#1CADA3] bg-clip-text text-transparent">
                FAQ
              </span>
            </h2>
          </div>

          <div className="bg-white rounded-2xl border border-slate-200 divide-y divide-slate-100 overflow-hidden shadow-sm max-w-4xl mx-auto">
            {FAQ.map((item, index) => (
              <div key={index} className="group">
                <button
                  onClick={() =>
                    setExpandedIdx(expandedIdx === index ? null : index)
                  }
                  className={`flex justify-between items-center w-full px-6 py-5 text-left transition-colors duration-200 ${expandedIdx === index ? "bg-blue-50/50" : "hover:bg-slate-50"}`}
                  aria-expanded={expandedIdx === index}
                >
                  <span className="font-bold text-[#2076C7] pr-8 text-sm md:text-base">
                    {item.q}
                  </span>
                  <ChevronDown
                    className={`transition-transform duration-300 flex-shrink-0 text-slate-400 w-5 h-5 ${expandedIdx === index ? "rotate-180 text-[#0056D2]" : "group-hover:text-[#0056D2]"}`}
                  />
                </button>

                <AnimatePresence>
                  {expandedIdx === index && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      className="overflow-hidden bg-blue-50/20"
                    >
                      <div className="px-6 pb-6 pt-2 text-slate-600 leading-relaxed text-sm md:text-base font-normal">
                        {item.a}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA SECTION */}
      <section className="py-12 md:py-16">
        <div className="container mx-auto px-4 md:px-6 max-w-7xl">
          <div className="relative overflow-hidden bg-gradient-to-br from-[#0056D2] via-[#1FAD9F] to-[#0056D2] rounded-[2rem] p-10 sm:p-20 text-center shadow-2xl text-white">
            <div className="relative z-10 space-y-8">
              <h3 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-white tracking-tight">
                Ready to Scale Your Business?
              </h3>

              <div className="flex flex-col sm:flex-row gap-4 justify-center pt-4">
                <Link
                  href="/products/Loans/SME/apply"
                  className="px-12 py-5 bg-white text-[#0056D2] rounded-xl font-bold shadow-xl hover:shadow-white/20 hover:scale-105 transition-all cursor-pointer uppercase tracking-tight text-xs flex items-center gap-2 group"
                >
                  Start Digital Application{" "}
                  <ArrowUpRight className="w-4 h-4 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* LEGAL DISCLAIMER */}
      <section className="py-8 bg-slate-50 border-t border-slate-200/50">
        <div className="container mx-auto px-4 md:px-6">
          <div className="bg-slate-100/50 border border-slate-200 shadow-sm p-4 md:p-6 rounded-xl max-w-4xl mx-auto">
            <p className="text-sm font-medium text-slate-500 text-center leading-relaxed">
              <strong className="text-slate-600 mr-1 text-base">
                Disclaimer:
              </strong>
              Infinity Arthvishva acts as a loan facilitator and connects
              borrowers with lending partners. Loan approval, interest rates,
              and terms are determined solely by the respective lender based on
              credit assessment.
            </p>
          </div>
        </div>
      </section>
      {/* Sticky CTA */}
      <div className="fixed bottom-20 right-6 z-50 md:hidden">
        <Link
          href="/products/Loans/SME/apply"
          className="bg-gradient-to-r from-[#0056D2] to-[#1FAD9F] text-white px-5 py-3 rounded-full shadow-[0_8px_30px_rgb(0,0,0,0.2)] text-sm font-bold animate-bounce flex items-center gap-2"
          aria-label="Apply for SME Loan"
        >
          Apply Now <ArrowUpRight className="w-4 h-4" />
        </Link>
      </div>
      <div className="fixed bottom-24 right-8 z-50 hidden md:block">
        <Link
          href="/products/Loans/SME/apply"
          className="bg-gradient-to-r from-[#0056D2] to-[#1FAD9F] text-white px-8 py-4 rounded-xl shadow-[0_8px_30px_rgba(0,86,210,0.3)] hover:shadow-[0_8px_30px_rgba(31,173,159,0.4)] transition-all duration-300 font-bold hover:-translate-y-1 flex items-center gap-2"
          aria-label="Apply for SME Loan"
        >
          Apply Now <ArrowUpRight className="w-5 h-5" />
        </Link>
      </div>

      <Chatbot />
    </div>
  );
}
