"use client";
import Image from "next/image";
import { useState } from "react";
import { useModal } from "../../context/ModalContext";
import Link from "next/link";
import { useRouter } from "next/navigation";
import Chatbot from "../../component/chatbot/page";
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
  ArrowLeft,
  Layers,
  BarChart2,
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
import FinancialGoalPlanner from "./components/FinancialGoalPlanner";
import CTASection from "@/app/component/CTASection";
import ScrollToTop from "@/app/component/ScrollToTop";
import Funds from "./components/Funds";
import FundTypeComparison from "./components/FundTypeComparison";

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
const staggerContainer = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.1 } },
};
const cardHover = {
  rest: { scale: 1, y: 0 },
  hover: { scale: 1.02, y: -5, transition: { duration: 0.2 } },
};

export default function MutualFundsLandingPage() {
  const { openLogin } = useModal();
  const [expandedIdx, setExpandedIdx] = useState<number | null>(null);
  const [showAllFaqs, setShowAllFaqs] = useState(false);
  const router = useRouter();

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
    <div className="min-h-screen bg-white text-gray-800 font-sans selection:bg-[#2076C7]/10 selection:text-[#2076C7] relative w-full overflow-x-hidden">
      {/* HERO SECTION */}
      <header
        id="offers"
        className="relative w-full overflow-hidden pt-14 sm:pt-16 md:pt-20 pb-14 sm:pb-16 md:pb-20 bg-white"
      >
        {/* Back Button */}
        <Link
          href="/"
          className="absolute top-4 left-4 sm:top-5 sm:left-6 z-20 inline-flex items-center justify-center gap-2 p-2 sm:px-4 sm:py-2 rounded-full sm:rounded-lg text-sm font-medium text-gray-700 bg-white border border-gray-200 sm:border-gray-300 hover:bg-white shadow-sm hover:shadow-md active:scale-95 transition-all group"
        >
          <ArrowLeft
            className="w-5 h-5 group-hover:-translate-x-1 transition-transform"
            strokeWidth={2}
          />
          <span className="hidden sm:inline">Back to Home</span>
        </Link>
        <div className="container mx-auto px-6 relative z-10">
          <div className="flex flex-col lg:flex-row items-center gap-12">
            {/* LEFT HERO TEXT */}
            <div className="w-full lg:w-1/2 text-center lg:text-left space-y-8 relative">
              <div className="flex justify-center lg:justify-start">
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.1, duration: 0.5 }}
                  className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-sm font-semibold bg-teal-50 border border-teal-200 text-teal-700 mb-2"
                >
                  <span className="w-2 h-2 rounded-full bg-teal-500 animate-pulse inline-block" />
                  AMFI Registered
                </motion.div>
              </div>
              <motion.h1
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3, duration: 0.7 }}
                className="text-5xl md:text-6xl lg:text-7xl font-bold mb-6 leading-tight font-sans px-2"
              >
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#2076C7] via-[#1CADA3] to-[#2076C7]">
                  Invest Smarter with Mutual Funds
                </span>
              </motion.h1>
              <motion.p
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4, duration: 0.7 }}
                className="text-lg md:text-xl lg:text-2xl text-slate-700 max-w-2xl mx-auto lg:mx-0 leading-relaxed font-normal"
              >
                Start your journey towards financial freedom with our curated
                selection of top-performing funds and expert guidance.
              </motion.p>
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5, duration: 0.7 }}
                className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4 pt-4 w-full"
              >
                <button
                  onClick={openLogin}
                  className="group relative text-white px-8 py-4 rounded-lg font-semibold text-lg shadow-lg hover:shadow-xl transform hover:-translate-y-1 transition-all duration-300 overflow-hidden"
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
                    className="group relative bg-white px-8 py-4 rounded-lg font-semibold text-lg border-2 hover:bg-blue-50 transform hover:-translate-y-1 transition-all duration-300 shadow-md hover:shadow-lg"
                    style={{ color: "#2076C7", borderColor: "#2076C7" }}
                  >
                    Explore Funds
                  </button>
                </Link>
              </motion.div>
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.8 }}
                className="flex items-center justify-center lg:justify-start gap-6 pt-4 text-sm text-slate-600 font-medium"
              >
                <div className="flex items-center gap-2">
                  <CheckCircle className="w-5 h-5 text-green-500" />
                  Paperless & Secure
                </div>
              </motion.div>
            </div>

            {/* RIGHT HERO IMAGE */}
            <div className="w-full max-w-md sm:max-w-lg lg:max-w-xl">
              <Image
                src="/MF/mf.jpeg"
                alt="Mutual Funds Investment"
                width={600}
                height={400}
                className="w-full h-auto object-contain rounded-3xl"
                priority
              />
            </div>
          </div>
        </div>
      </header>

      <main className="container mx-auto px-4 sm:px-6 py-10 sm:py-16 space-y-16 sm:space-y-24">
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
            <motion.h2 className="text-3xl md:text-4xl font-bold mb-3">
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#2076C7] via-[#1CADA3] to-[#2076C7]">
                Explore Fund Categories
              </span>
            </motion.h2>
          </div>
          <div className="flex gap-6 overflow-x-auto pb-4 snap-x snap-mandatory scrollbar-hide">
            {categories.map((cat, idx) => (
              <motion.div
                key={idx}
                whileHover="hover"
                initial="rest"
                animate="rest"
                className="min-w-[85%] sm:min-w-[45%] lg:min-w-[30%] snap-start"
              >
                <motion.div
                  variants={cardHover}
                  className="relative h-full bg-white p-6 sm:p-8 rounded-xl sm:rounded-2xl border border-gray-100/80 transition-all duration-300 group cursor-pointer text-center md:text-left"
                  style={{
                    boxShadow:
                      "0 2px 4px rgba(28,173,163,0.04), 0 8px 24px rgba(28,173,163,0.08), inset 0 1px 0 rgba(255,255,255,0.9)",
                  }}
                >
                  <div
                    className={`w-14 h-14 ${cat.bg} rounded-xl flex items-center justify-center mb-6 mx-auto md:mx-0`}
                  >
                    <cat.icon className={`w-7 h-7 ${cat.color}`} />
                  </div>

                  <h3 className="text-xl font-bold text-slate-800 mb-3">
                    {cat.title}
                  </h3>

                  <p className="text-slate-600 text-sm sm:text-base">
                    {cat.desc}
                  </p>
                </motion.div>
              </motion.div>
            ))}
          </div>
        </motion.section>

        {/* STRATEGY COMPARISON TABLE */}
        <motion.section
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
        >
          <FundTypeComparison />
        </motion.section>

        {/* WHY CHOOSE US */}
        <motion.section
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={staggerContainer}
        >
          <div className="text-center mb-16">
            <motion.h2 className="text-3xl md:text-4xl font-bold mb-3">
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#2076C7] via-[#1CADA3] to-[#2076C7]">
                Why Choose Us
              </span>
            </motion.h2>
          </div>
          <div className="w-full grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {benefits.map((benefit, idx) => (
              <motion.div
                key={idx}
                className="relative bg-white p-6 md:p-8 rounded-2xl border border-gray-200 hover:border-[#2076C7] transition-all duration-300 hover:-translate-y-1 hover:shadow-lg text-center md:text-left h-full group"
              >
                <div className="w-12 h-12 rounded-xl bg-[#1CADA3]/10 flex items-center justify-center mb-4 mx-auto md:mx-0 group-hover:bg-[#2076C7]/10 transition">
                  <benefit.icon className="w-6 h-6 text-[#1CADA3] group-hover:text-[#2076C7]" />
                </div>
                <h4 className="text-xl font-bold text-slate-800 mb-2">
                  {benefit.title}
                </h4>
                <p className="text-sm md:text-base text-slate-600 leading-relaxed">
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
                  <b>AMFI registered Mutual Funds distributor</b> - Infinity
                  Arthvishva Mutual Fund Distributor LLP
                </h4>
                <p className="text-slate-600 text-sm leading-relaxed">
                  <b>LLPIN ACP</b>-0126 | <b>ARN</b>-347839 | <b>GST Number</b>
                  -27AALFI4941B1ZH
                  <br />
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
              <motion.h2 className="text-3xl md:text-4xl font-bold font-sans bg-gradient-to-r from-[#2076C7] to-[#1CADA3] bg-clip-text text-transparent mb-4">
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
      <ScrollToTop />
      <CTASection />
      <Chatbot />
    </div>
  );
}