"use client";
import React, { useState } from "react";
import { motion, Variants } from "framer-motion";
import LASApplicationForm from "./components/LASApplicationForm";
import FAQSection from "./components/FAQSection";
import {
  Landmark,
  Shield,
  TrendingUp,
  Clock,
  CheckCircle,
  CheckCircle2,
  Banknote,
  Users,
  ArrowRight,
  PieChart,
  LineChart,
  ChevronRight,
  Briefcase,
  ShieldCheck,
  ExternalLink,
} from "lucide-react";
import { useModal } from "../../context/ModalContext";
import Chatbot from "../../component/chatbot/page";

/* ---------------- ANIMATIONS ---------------- */

const fadeInUp: Variants = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
};
const staggerContainer: Variants = {
  animate: {
    transition: {
      staggerChildren: 0.1,
    },
  },
};
/* ---------------- HERO GRAPHIC (Branded Visual) ---------------- */
const HeroGraphic = () => {
  const float = (delay: number): Variants => ({
    animate: {
      y: [-8, 8, -8],
      transition: { duration: 5, repeat: Infinity, delay, ease: "easeInOut" },
    },
  });

  return (
    <div className="relative w-full h-[500px] md:h-[600px] flex items-center justify-center">
      {/* Ambient glow */}
      <div className="absolute w-[350px] h-[350px] bg-gradient-to-br from-[#2076C7]/12 to-[#1CADA3]/12 rounded-full blur-[100px] animate-pulse" />

      {/* SVG Network / Constellation */}
      <svg
        className="absolute w-[420px] h-[420px] opacity-40"
        viewBox="0 0 420 420"
        fill="none"
      >
        {/* Connection lines */}
        <motion.line
          x1="210"
          y1="80"
          x2="340"
          y2="160"
          stroke="url(#lineGrad)"
          strokeWidth="1"
          initial={{ pathLength: 0 }}
          animate={{ pathLength: 1 }}
          transition={{ duration: 2, ease: "easeInOut" }}
        />
        <motion.line
          x1="210"
          y1="80"
          x2="80"
          y2="160"
          stroke="url(#lineGrad)"
          strokeWidth="1"
          initial={{ pathLength: 0 }}
          animate={{ pathLength: 1 }}
          transition={{ duration: 2, delay: 0.2, ease: "easeInOut" }}
        />
        <motion.line
          x1="340"
          y1="160"
          x2="340"
          y2="280"
          stroke="url(#lineGrad)"
          strokeWidth="1"
          initial={{ pathLength: 0 }}
          animate={{ pathLength: 1 }}
          transition={{ duration: 2, delay: 0.4, ease: "easeInOut" }}
        />
        <motion.line
          x1="80"
          y1="160"
          x2="80"
          y2="280"
          stroke="url(#lineGrad)"
          strokeWidth="1"
          initial={{ pathLength: 0 }}
          animate={{ pathLength: 1 }}
          transition={{ duration: 2, delay: 0.4, ease: "easeInOut" }}
        />
        <motion.line
          x1="340"
          y1="280"
          x2="210"
          y2="360"
          stroke="url(#lineGrad)"
          strokeWidth="1"
          initial={{ pathLength: 0 }}
          animate={{ pathLength: 1 }}
          transition={{ duration: 2, delay: 0.6, ease: "easeInOut" }}
        />
        <motion.line
          x1="80"
          y1="280"
          x2="210"
          y2="360"
          stroke="url(#lineGrad)"
          strokeWidth="1"
          initial={{ pathLength: 0 }}
          animate={{ pathLength: 1 }}
          transition={{ duration: 2, delay: 0.6, ease: "easeInOut" }}
        />
        {/* Cross connections */}
        <motion.line
          x1="80"
          y1="160"
          x2="340"
          y2="280"
          stroke="url(#lineGrad)"
          strokeWidth="0.5"
          strokeDasharray="4 4"
          initial={{ pathLength: 0 }}
          animate={{ pathLength: 1 }}
          transition={{ duration: 3, delay: 1, ease: "easeInOut" }}
        />
        <motion.line
          x1="340"
          y1="160"
          x2="80"
          y2="280"
          stroke="url(#lineGrad)"
          strokeWidth="0.5"
          strokeDasharray="4 4"
          initial={{ pathLength: 0 }}
          animate={{ pathLength: 1 }}
          transition={{ duration: 3, delay: 1.2, ease: "easeInOut" }}
        />
        {/* Node dots */}
        {[
          [210, 80],
          [340, 160],
          [80, 160],
          [340, 280],
          [80, 280],
          [210, 360],
        ].map(([cx, cy], i) => (
          <motion.circle
            key={i}
            cx={cx}
            cy={cy}
            r="4"
            fill="#2076C7"
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 0.8 }}
            transition={{ delay: i * 0.15 + 0.5, duration: 0.4 }}
          />
        ))}
        <defs>
          <linearGradient id="lineGrad" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#2076C7" />
            <stop offset="100%" stopColor="#1CADA3" />
          </linearGradient>
        </defs>
      </svg>

      {/* Orbiting ring */}
      <motion.div
        animate={{ rotate: 360 }}
        transition={{ duration: 30, repeat: Infinity, ease: "linear" }}
        className="absolute w-[280px] h-[280px] rounded-full"
        style={{
          border: "1.5px solid transparent",
          borderImage:
            "linear-gradient(135deg, #2076C7 0%, transparent 40%, #1CADA3 70%, transparent 100%) 1",
        }}
      />

      {/* Outer soft ring */}
      <div className="absolute w-[340px] h-[340px] rounded-full border border-[#2076C7]/8" />

      {/* Central hub - glassmorphism */}
      <motion.div
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        className="relative z-20 w-32 h-32 rounded-3xl bg-white/60 backdrop-blur-xl border border-white/80 shadow-[0_8px_32px_rgba(32,118,199,0.15)] flex flex-col items-center justify-center gap-1"
      >
        <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-[#2076C7] to-[#1CADA3] flex items-center justify-center shadow-lg">
          <Shield className="w-7 h-7 text-white" />
        </div>
        <span className="text-xs font-extrabold text-[#2076C7] uppercase tracking-widest mt-1">
          LAS
        </span>
      </motion.div>

      {/* Floating cards - Top Left: Mutual Funds */}
      <motion.div
        variants={float(0)}
        animate="animate"
        className="absolute top-[60px] left-[10px] bg-white/90 backdrop-blur-sm rounded-2xl px-4 py-3 border border-[#2076C7]/10 flex items-center gap-3"
      >
        <div className="w-10 h-10 bg-[#2076C7]/10 rounded-xl flex items-center justify-center">
          <TrendingUp className="w-5 h-5 text-[#2076C7]" />
        </div>
        <div>
          <p className="text-xs font-extrabold text-[#2076C7] uppercase tracking-wider">
            Mutual Funds
          </p>
          <p className="text-xs text-slate-400 font-medium">Up to 80% LTV</p>
        </div>
      </motion.div>

      {/* Top Right: Shares */}
      <motion.div
        variants={float(1.5)}
        animate="animate"
        className="absolute top-[80px] right-[10px] bg-white/90 backdrop-blur-sm rounded-2xl px-4 py-3 border border-[#1CADA3]/10 flex items-center gap-3"
      >
        <div className="w-10 h-10 bg-[#1CADA3]/10 rounded-xl flex items-center justify-center">
          <LineChart className="w-5 h-5 text-[#1CADA3]" />
        </div>
        <div>
          <p className="text-xs font-extrabold text-[#1CADA3] uppercase tracking-wider">
            Shares
          </p>
          <p className="text-xs text-slate-400 font-medium">Up to 50% LTV</p>
        </div>
      </motion.div>

      {/* Bottom Left: Insurance */}
      <motion.div
        variants={float(1)}
        animate="animate"
        className="absolute bottom-[80px] left-[20px] bg-white/90 backdrop-blur-sm rounded-2xl px-4 py-3 border border-[#1CADA3]/10 flex items-center gap-3"
      >
        <div className="w-10 h-10 bg-[#1CADA3]/10 rounded-xl flex items-center justify-center">
          <ShieldCheck className="w-5 h-5 text-[#1CADA3]" />
        </div>
        <div>
          <p className="text-xs font-extrabold text-[#1CADA3] uppercase tracking-wider">
            Insurance
          </p>
          <p className="text-xs text-slate-400 font-medium">Up to 90% LTV</p>
        </div>
      </motion.div>

      {/* Bottom Right: Bonds & ETFs */}
      <motion.div
        variants={float(2)}
        animate="animate"
        className="absolute bottom-[60px] right-[15px] bg-white/90 backdrop-blur-sm rounded-2xl px-4 py-3 border border-[#2076C7]/10 flex items-center gap-3"
      >
        <div className="w-10 h-10 bg-[#2076C7]/10 rounded-xl flex items-center justify-center">
          <Briefcase className="w-5 h-5 text-[#2076C7]" />
        </div>
        <div>
          <p className="text-xs font-extrabold text-[#2076C7] uppercase tracking-wider">
            Bonds & ETFs
          </p>
          <p className="text-xs text-slate-400 font-medium">Up to 80% LTV</p>
        </div>
      </motion.div>

      {/* Decorative dots */}
      <div className="absolute top-[45%] left-[15%] w-2 h-2 bg-[#2076C7]/30 rounded-full" />
      <div className="absolute top-[30%] right-[25%] w-1.5 h-1.5 bg-[#1CADA3]/30 rounded-full" />
      <div className="absolute bottom-[35%] left-[30%] w-1.5 h-1.5 bg-[#2076C7]/20 rounded-full" />
      <div className="absolute bottom-[40%] right-[20%] w-2 h-2 bg-[#1CADA3]/25 rounded-full" />
    </div>
  );
};

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
    icon: <Landmark className="w-8 h-8 text-[#1FAD9F]" />,
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
    name: "Specialized Lenders",
    features: [
      "Industry-focused financing",
      "Asset-based lending",
      "Portfolio expertise",
    ],
    icon: <Briefcase className="w-8 h-8 text-[#1FAD9F]" />,
    color: "bg-[#E6F7F5] border-[#1FAD9F]/20",
    buttonColor:
      "text-[#1FAD9F] border-[#1FAD9F]/20 hover:border-[#1FAD9F] hover:bg-teal-50",
  },
];

/* ---------------- MAIN PAGE ---------------- */

export default function LoanAgainstSecuritiesPage() {
  const { openQuote } = useModal();
  const [isFormOpen, setIsFormOpen] = useState(false);

  return (
    <div className="bg-white text-gray-800 font-sans selection:bg-[#2076C7]/10 selection:text-[#2076C7] relative overflow-hidden">
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

      <Chatbot />
      <LASApplicationForm
        isOpen={isFormOpen}
        onClose={() => setIsFormOpen(false)}
      />

      {/* Hero Section */}
      <section
        className="relative pt-16 pb-16 md:pt-20 md:pb-24 overflow-hidden"
        style={{
          background:
            "linear-gradient(to bottom right, #79c2f7ff, #ffffffff, #e5f8e5ff)",
        }}
      >
        <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none">
          <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-[#2076C7]/5 rounded-full blur-[120px] opacity-60" />
          <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-[#1CADA3]/5 rounded-full blur-[120px] opacity-60" />
        </div>

        <div className="container mx-auto px-4 md:px-6 relative z-10">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <motion.div
              initial="initial"
              animate="animate"
              variants={staggerContainer}
              className="text-center lg:text-left"
            >
              <motion.h1
                variants={fadeInUp}
                className="text-4xl md:text-5xl lg:text-6xl font-extrabold tracking-tight text-[#2076C7] mb-6"
              >
                Unlock liquidity from your{" "}
                <span className="bg-clip-text text-transparent bg-gradient-to-r from-[#2076C7] to-[#1CADA3]">
                  investments.
                </span>
              </motion.h1>

              <motion.p
                variants={fadeInUp}
                className="text-lg md:text-xl text-gray-600 mb-8 max-w-xl mx-auto lg:mx-0 leading-relaxed"
              >
                Get instant funds against your shares, mutual funds, and bonds
                without selling them. Interest rates starting at{" "}
                <span className="font-bold text-[#2076C7]">
                  8.5% p.a.(Subject to lender approval)
                </span>
              </motion.p>

              <motion.div
                variants={fadeInUp}
                className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start"
              >
                <button
                  onClick={() => setIsFormOpen(true)}
                  className="px-8 py-4 bg-gradient-to-r from-[#2076C7] to-[#1CADA3] text-white rounded-xl font-bold hover:scale-[1.02] transition-all active:scale-95 flex items-center justify-center gap-2 group"
                >
                  Enquire Now{" "}
                  <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                </button>
              </motion.div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8, ease: "easeOut" }}
              className="relative lg:block hidden"
            >
              <HeroGraphic />
            </motion.div>
          </div>
        </div>
      </section>

      {/* Trust Section */}
      <section className="py-12 md:py-16 bg-white">
        <div className="container mx-auto px-4 md:px-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-10"
          >
            <h2 className="text-3xl md:text-4xl font-bold font-sans mb-4 text-[#2076C7]">
              <span className="bg-gradient-to-r from-[#2076C7] to-[#1CADA3] bg-clip-text text-transparent">
                Empowering Investors Across India
              </span>
            </h2>
            <p className="text-gray-500 max-w-2xl mx-auto">
              We've helped thousands of investors get the liquidity they need
              while keeping their portfolio growth intact.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            <TrustItem
              icon={<Banknote />}
              value="₹10Cr+"
              label="Loans Facilitated"
            />
            <TrustItem icon={<Users />} value="500+" label="Happy Clients" />
            <TrustItem icon={<Shield />} value="100%" label="Secure Process" />
            <TrustItem icon={<Clock />} value="24h" label="Fast Disbursal" />
          </div>
        </div>
      </section>

      {/* Products Section */}
      <section
        id="products"
        className="py-12 md:py-16 bg-gradient-to-b from-white to-[#F8FCFC]"
      >
        <div className="container mx-auto px-4 md:px-6 max-w-7xl">
          <div className="text-center mb-10 space-y-4">
            <h2 className="text-3xl md:text-4xl font-extrabold font-sans">
              <span className="bg-gradient-to-r from-[#2076C7] to-[#1CADA3] bg-clip-text text-transparent">
                Loan Against Securities Products
              </span>
            </h2>
            <p className="text-slate-600 max-w-2xl mx-auto font-normal text-sm sm:text-base leading-relaxed">
              Get competitive rates and instant liquidity without selling your
              investments. Choose from our diverse range of LAS products.
            </p>
          </div>

          <div className="flex flex-wrap justify-center items-stretch gap-6">
            {[
              {
                title: "Mutual Funds",
                description:
                  "Pledge equity, debt, hybrid, or ELSS mutual fund units for immediate capital.",
                icon: <TrendingUp className="w-6 h-6" />,
                features: [
                  "Equity MF: 50% -65% LTV",
                  "Debt MF:70%- 80% LTV",
                  "Retain SIP growth",
                ],
                rate: "9% - 12%",
                ltv: "Up to 80%",
                popular: true,
              },
              {
                title: "Shares (Equity)",
                description:
                  "Unlock funds against NSE/BSE listed large-cap and approved mid-cap shares.",
                icon: <LineChart className="w-6 h-6" />,
                features: [
                  "Keep earning dividends",
                  "Retain ownership",
                  "Top 500 scripts",
                ],
                rate: "9% - 14%",
                ltv: "Up to 50%",
              },
              {
                title: "Insurance Policies",
                description:
                  "Leverage your life insurance policies (Endowment, Money-back, LIC Traditional).",
                icon: <ShieldCheck className="w-6 h-6" />,
                features: [
                  "Surrender value based",
                  "Low interest rates",
                  "Term/Health excluded",
                ],
                rate: "10% - 13%",
                ltv: "Up to 90%",
              },
              {
                title: "Bonds",
                description:
                  "Secure a loan against your fixed-income corporate, PSU, or government bonds.",
                icon: <Briefcase className="w-6 h-6" />,
                features: [
                  "Fixed income stays yours",
                  "Steady interest rates",
                  "High LTV ratio",
                ],
                rate: "9% - 12%",
                ltv: "Up to 80%",
              },
              {
                title: "ETFs",
                description:
                  "Use Exchange Traded Funds (Gold, Nifty, Bank ETFs) as collateral for your loan.",
                icon: <PieChart className="w-6 h-6" />,
                features: [
                  "Gold ETFs preferred",
                  "Real-time pricing",
                  "Highly liquid",
                ],
                rate: "9% - 13%",
                ltv: "Up to 65%",
              },
              {
                title: "Govt Securities",
                description:
                  "Get the lowest interest rates by pledging sovereign risk-free securities.",
                icon: <Landmark className="w-6 h-6" />,
                features: [
                  "Treasury Bills",
                  "Sovereign Gold Bonds",
                  "Lowest cost of capital",
                ],
                rate: "7.5% - 10%",
                ltv: "Up to 90%",
              },
            ].map((product, idx) => (
              <motion.div
                key={idx}
                whileHover="hover"
                initial="rest"
                className="w-full sm:w-[calc(50%-12px)] lg:w-[calc(33.33%-16px)] bg-white p-6 rounded-2xl shadow-lg border border-[#1CADA3]/10 hover:shadow-xl transition-all duration-300 flex flex-col h-full relative overflow-hidden"
              >
                {product.popular && (
                  <div className="absolute top-0 right-0 bg-[#1CADA3] text-white text-xs font-black uppercase tracking-widest px-3 py-1 rounded-bl-xl">
                    Most Popular
                  </div>
                )}
                <div className="w-12 h-12 bg-[#E6F7F5] rounded-xl flex items-center justify-center text-[#1CADA3] mb-6 border border-[#1CADA3]/20">
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
                      Interest Rate
                    </span>
                    <span className="font-bold text-[#2076C7] text-sm">
                      {product.rate}
                    </span>
                  </div>
                  <div className="flex flex-col gap-1">
                    <span className="text-xs uppercase font-bold text-slate-400">
                      Max LTV
                    </span>
                    <span className="font-bold text-[#1CADA3] text-sm">
                      {product.ltv}
                    </span>
                  </div>
                </div>

                <div className="space-y-2 mb-6">
                  {product.features.map((feature, fIdx) => (
                    <div key={fIdx} className="flex items-center gap-2">
                      <CheckCircle2 className="w-3 h-3 text-[#1CADA3] flex-shrink-0" />
                      <span className="text-xs text-slate-600 font-medium">
                        {feature}
                      </span>
                    </div>
                  ))}
                </div>

                <button
                  onClick={() => setIsFormOpen(true)}
                  className="w-full py-3 bg-gradient-to-r from-[#2076C7] to-[#1CADA3] text-white rounded-xl text-sm font-black uppercase tracking-widest flex items-center justify-center gap-2 group cursor-pointer mt-auto hover:shadow-md transition-all"
                >
                  Enquire Now{" "}
                  <ChevronRight
                    size={14}
                    className="group-hover:translate-x-1 transition-transform"
                  />
                </button>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Process */}
      <section className="py-12 md:py-16 bg-gray-50 border-y border-gray-100">
        <div className="container mx-auto px-4 md:px-6">
          <h2 className="text-3xl md:text-4xl font-bold font-sans text-center mb-10">
            <span className="bg-gradient-to-r from-[#2076C7] to-[#1CADA3] bg-clip-text text-transparent">
              Digitized 5-Step Process
            </span>
          </h2>
          <div className="grid md:grid-cols-5 gap-8">
            <StepItem
              step="01"
              title="Apply Online"
              desc="Quick digital form"
            />
            <StepItem
              step="02"
              title="KYC Check"
              desc="Paperless verification"
            />
            <StepItem step="03" title="E-Approval" desc="Instant sanction" />
            <StepItem step="04" title="Digital Pledge" desc="Safe & Secure" />
            <StepItem step="05" title="Disbursal" desc="Funds in 24 hours" />
          </div>
        </div>
      </section>

      {/* Eligibility Criteria */}
      <section className="py-12 md:py-16 bg-white">
        <div className="container mx-auto px-4 md:px-6 max-w-5xl">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-10"
          >
            <h3 className="inline-block px-4 py-1.5 rounded-full bg-[#2076C7]/10 text-[#2076C7] text-xs font-bold tracking-wider uppercase mb-4">
              Who Can Apply
            </h3>
            <h2 className="text-3xl md:text-4xl font-bold font-sans mb-4">
              <span className="bg-gradient-to-r from-[#2076C7] to-[#1CADA3] bg-clip-text text-transparent">
                Eligibility Criteria
              </span>
            </h2>
            <p className="text-slate-600 max-w-2xl mx-auto text-sm sm:text-base">
              Check if you qualify for a Loan Against Securities in just a few
              simple steps.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {[
              {
                icon: <Users className="w-6 h-6" />,
                title: "Resident Indian",
                desc: "Individual, HUF, or Corporate entity",
              },
              {
                icon: <Briefcase className="w-6 h-6" />,
                title: "Eligible Securities",
                desc: "Own approved securities in Demat or folio",
              },
              {
                icon: <ShieldCheck className="w-6 h-6" />,
                title: "Valid PAN & KYC",
                desc: "Completed KYC with valid PAN card",
              },
              {
                icon: <CheckCircle className="w-6 h-6" />,
                title: "Age 18+",
                desc: "Must be 18 years or older to apply",
              },
            ].map((item, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 15 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.1 }}
                className="bg-gradient-to-br from-slate-50 to-white p-6 rounded-2xl border border-slate-100 shadow-sm hover:shadow-lg hover:-translate-y-1 transition-all duration-300 text-center group"
              >
                <div className="w-14 h-14 mx-auto bg-gradient-to-br from-[#2076C7]/10 to-[#1CADA3]/10 rounded-2xl flex items-center justify-center text-[#2076C7] mb-4 group-hover:scale-110 transition-transform border border-[#2076C7]/10">
                  {item.icon}
                </div>
                <h4 className="font-extrabold text-[#2076C7] text-base mb-1">
                  {item.title}
                </h4>
                <p className="text-sm text-slate-500 font-medium leading-relaxed">
                  {item.desc}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="py-12 md:py-16 bg-white">
        <div className="container mx-auto px-4 md:px-6">
          <div className="text-center mb-10">
            <h3 className="inline-block px-4 py-1.5 rounded-full bg-[#1CADA3]/10 text-[#1CADA3] text-xs font-bold tracking-wider uppercase mb-4">
              Key Advantages
            </h3>
            <h2 className="text-3xl md:text-4xl font-bold font-sans mb-4">
              <span className="bg-gradient-to-r from-[#2076C7] to-[#1CADA3] bg-clip-text text-transparent">
                Why Choose Loan Against Securities?
              </span>
            </h2>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            <FeatureItem
              icon={<TrendingUp className="text-[#2076C7]" />}
              title="Maintain Portfolio"
              desc="Continue earning returns, dividends, and bonuses on your investments."
            />
            <FeatureItem
              icon={<Clock className="text-[#2076C7]" />}
              title="Swift Disbursal"
              desc="Digital application ensures funds reach your account within 24 hours."
            />
            <FeatureItem
              icon={<CheckCircle className="text-[#2076C7]" />}
              title="Flexible Repayment"
              desc="No foreclosure charges and ability to pay back at your convenience."
            />
          </div>
        </div>
      </section>

      <section className="py-12 md:py-16 bg-gradient-to-b from-white to-[#F8FCFC] relative">
        <div className="container mx-auto px-4 md:px-6 max-w-7xl">
          <div className="text-center mb-16 space-y-4">
            <h2 className="text-3xl md:text-4xl font-extrabold font-sans">
              <span className="bg-gradient-to-r from-[#2076C7] to-[#1CADA3] bg-clip-text text-transparent">
                Types of Lending Partners
              </span>
            </h2>
            <p className="text-slate-600 max-w-2xl mx-auto font-normal text-sm sm:text-base">
              We connect investors with a wide network of trusted lending
              institutions across India. Lender allocation depends on
              eligibility, asset type, and portfolio composition.
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

                <div className="space-y-3 mb-8 flex-grow">
                  {lender.features.map((feature, fIdx) => (
                    <div key={fIdx} className="flex items-center gap-2">
                      <CheckCircle2 className="w-3.5 h-3.5 text-[#1CADA3] flex-shrink-0" />
                      <span className="text-sm text-slate-600 font-medium">
                        {feature}
                      </span>
                    </div>
                  ))}
                </div>

                <div className="mt-auto">
                  <button
                    onClick={() => setIsFormOpen(true)}
                    className={`w-full py-3.5 rounded-xl border text-sm font-black uppercase tracking-widest flex items-center justify-center gap-2 transition-all duration-300 ${lender.buttonColor}`}
                  >
                    Check Eligibility <ExternalLink size={14} />
                  </button>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <FAQSection onApply={() => setIsFormOpen(true)} />
    </div>
  );
}

/* ---------------- INTERNAL COMPONENTS ---------------- */

function StatItem({ label, value, sub }: any) {
  return (
    <div className="bg-white border border-[#2076C7]/10 p-3 rounded-xl">
      <p className="text-xs text-gray-400 font-bold uppercase tracking-wider">
        {label}
      </p>
      <div className="text-lg font-extrabold text-gray-800">{value}</div>
      <p className="text-xs text-[#1CADA3] font-medium">{sub}</p>
    </div>
  );
}

function TrustItem({ icon, value, label }: any) {
  return (
    <div className="p-8 bg-slate-50 border border-slate-100 rounded-3xl text-center group hover:bg-white hover:shadow-xl transition-all duration-300">
      <div className="mb-4 inline-flex items-center justify-center p-4 bg-white rounded-2xl text-[#2076C7] shadow-sm group-hover:scale-110 transition-transform">
        {React.cloneElement(icon, { className: "w-8 h-8" })}
      </div>
      <div className="text-2xl font-black text-[#2076C7]">{value}</div>
      <div className="text-sm text-gray-400 font-bold uppercase mt-1">
        {label}
      </div>
    </div>
  );
}

function ProductCard({ title, desc, ltv, popular, bulletPoints }: any) {
  return (
    <div className="bg-white rounded-3xl p-8 border border-gray-100 shadow-sm hover:shadow-2xl hover:-translate-y-1 transition-all relative group overflow-hidden">
      <div className="absolute top-0 left-0 right-0 h-1.5 bg-gradient-to-r from-[#2076C7] to-[#1CADA3]" />
      <div className="flex justify-between items-start mb-6">
        <h4 className="text-xl font-bold text-[#2076C7]">{title}</h4>
        {popular && (
          <span className="bg-[#1CADA3] text-white px-2 py-1 rounded-md text-xs font-black uppercase">
            Popular
          </span>
        )}
      </div>
      <p className="text-gray-500 text-sm mb-6 h-10">{desc}</p>
      <div className="bg-slate-50 p-4 rounded-2xl mb-6 border-l-4 border-[#2076C7]">
        <div className="text-xs text-gray-400 font-bold uppercase">
          Max Funding
        </div>
        <div className="text-xl font-black text-[#2076C7]">{ltv}</div>
      </div>
      <ul className="space-y-3">
        {bulletPoints.map((point: string, i: number) => (
          <li key={i} className="flex gap-2 text-sm text-gray-600 font-medium">
            <CheckCircle className="w-4 h-4 text-[#1CADA3] flex-shrink-0 mt-0.5" />
            {point}
          </li>
        ))}
      </ul>
    </div>
  );
}

function FeatureItem({ icon, title, desc }: any) {
  return (
    <div className="p-6 sm:p-8 rounded-2xl bg-white border border-[#1CADA3]/10 shadow-lg hover:shadow-xl hover:-translate-y-1 transition-all duration-300 flex flex-col h-full">
      <div className="w-12 h-12 bg-[#E6F7F5] rounded-xl flex items-center justify-center mb-6 border border-[#1CADA3]/20">
        {React.cloneElement(icon, { className: "w-6 h-6" })}
      </div>
      <h4 className="text-lg font-extrabold text-[#2076C7] mb-2">{title}</h4>
      <p className="text-sm text-slate-600 leading-relaxed font-normal">
        {desc}
      </p>
    </div>
  );
}

function StepItem({ step, title, desc }: any) {
  return (
    <div className="text-center group">
      <div className="w-16 h-16 bg-white border-2 border-slate-100 rounded-2xl flex items-center justify-center text-xl font-black text-[#2076C7] mx-auto mb-6 group-hover:bg-[#2076C7] group-hover:text-white group-hover:border-[#2076C7] transition-all duration-300">
        {step}
      </div>
      <h5 className="font-bold text-[#2076C7] mb-1">{title}</h5>
      <p className="text-xs text-gray-400 font-bold uppercase">{desc}</p>
    </div>
  );
}
