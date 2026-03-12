"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  CheckCircle2, ExternalLink,
  ShieldCheck, Star, Zap, Anchor,
  TrendingUp, GraduationCap, Heart,
  Briefcase, Gift, Landmark, Info,
  ChevronRight, Search, X, ArrowRight
} from "lucide-react";
// import GetQuoteModal from "./GetQuoteModal";
import PlanDetailsModal from "./PlanDetailsModal";
import { useModal } from "../../../context/ModalContext";

const allPlans = [
  {
    id: 1,
    name: "HDFC Life Sanchay Plus",
    insurer: "HDFC Life",
    category: "Guaranteed Savings",
    tag: "Assured Returns | Low Risk",
    desc: "A non-linked savings plan that offers guaranteed maturity benefits with flexible premium payment options.",
    features: [
      "Guaranteed maturity benefits",
      "Flexible premium payment terms",
      "Life cover throughout policy term",
      "Option for regular income",
      "Tax benefits as per applicable laws",
    ],
    bestFor: "Marriage planning, retirement, long-term savings",
    icon: Landmark,
    accentColor: "#2076C7",
    badge: "Guaranteed",
    ctas: ["View Details", "Get Quote"],
  },
  {
    id: 2,
    name: "ICICI Pru SmartKid Assure",
    insurer: "ICICI Prudential",
    category: "Child Plan",
    tag: "Market Linked Returns",
    desc: "Secure your child's future with market-linked growth and 4 layers of financial protection.",
    features: [
      "Zero premium allocation charges",
      "Wealth creation (market-linked)",
      "Waiver of premium on death",
      "Systematic withdrawal option",
      "Life cover for policy term",
    ],
    bestFor: "Child education & milestone planning",
    icon: GraduationCap,
    accentColor: "#1CADA3",
    badge: "Child Future",
    ctas: ["Plan for My Child", "View Details"],
  },
  {
    id: 3,
    name: "HDFC Life YoungStar Super Premium",
    insurer: "HDFC Life",
    category: "Child Plan",
    tag: "Wealth + Protection",
    desc: "Investment-linked child plan with life insurance coverage to build long-term wealth.",
    features: [
      "Market-linked returns",
      "Flexible premium payment options",
      "Life cover included",
      "Fund switching option",
      "Tax benefits under 80C & 10(10D)",
    ],
    bestFor: "Higher education & long-term growth",
    icon: Star,
    accentColor: "#2076C7",
    badge: "Wealth Builder",
    ctas: ["Get Quote", "View Details"],
  },
  {
    id: 4,
    name: "HDFC Life Systematic Pension",
    insurer: "HDFC Life",
    category: "Retirement",
    tag: "Guaranteed Pension",
    desc: "Build a retirement corpus with compounded bonus and assured vesting benefits.",
    features: [
      "Assured benefit on vesting",
      "Multiple policy terms (5–40 yrs)",
      "Compound bonus accumulation",
      "Guaranteed income post retirement",
    ],
    bestFor: "Retirement planning",
    icon: Anchor,
    accentColor: "#1CADA3",
    badge: "Retirement",
    ctas: ["Get Quote", "View Details"],
  },
  {
    id: 5,
    name: "Axis Max Life Smart Term Plus",
    insurer: "Axis Max Life",
    category: "Term Insurance",
    tag: "Pure Protection",
    desc: "Flexible term plan offering high coverage with multiple benefit options and special women rates.",
    features: [
      "Up to 6 plan variants",
      "Whole life coverage option",
      "100% premium return option",
      "Instant claim payout option",
      "Special benefits for women",
    ],
    bestFor: "Family financial security",
    icon: ShieldCheck,
    accentColor: "#2076C7",
    badge: "Most Popular",
    ctas: ["Get Quote", "View Details"],
  },
  {
    id: 6,
    name: "ICICI Pru iProtect Smart",
    insurer: "ICICI Prudential",
    category: "Term Insurance",
    tag: "High Coverage | Smart Benefits",
    desc: "Affordable term insurance with milestone-based life cover increase and skip-a-premium option.",
    features: [
      "Instant claim payout option",
      "Increase cover at major life events",
      "Option to skip premium for 1 year",
      "Comprehensive all-round protection",
    ],
    bestFor: "Milestone-based life stage protection",
    icon: ShieldCheck,
    accentColor: "#1CADA3",
    badge: "Smart Choice",
    ctas: ["Get Quote", "View Details"],
  },
  {
    id: 7,
    name: "HDFC Life Click 2 Achieve",
    insurer: "HDFC Life",
    category: "Guaranteed Savings",
    tag: "Increasing Income Option",
    desc: "Guaranteed benefits with an income growth option up to 10% per annum for rising needs.",
    features: [
      "Guaranteed returns",
      "Flexible benefit payout options",
      "Increasing income option (up to 10%)",
      "Life cover included",
    ],
    bestFor: "Rising income needs & goal planning",
    icon: TrendingUp,
    accentColor: "#2076C7",
    badge: "High Growth",
    ctas: ["Get Quote", "View Details"],
  },
  {
    id: 8,
    name: "HDFC Life Click 2 Protect Supreme",
    insurer: "HDFC Life",
    category: "Term Insurance",
    tag: "Comprehensive Protection",
    desc: "Advanced term plan with wellness benefits, high CSR, and special discounts for salaried & women.",
    features: [
      "Immediate claim payout option",
      "Special rates – salaried & women",
      "Parent protect care option",
      "Wellness & fitness benefits",
    ],
    bestFor: "Premium elite protection seekers",
    icon: Heart,
    accentColor: "#1CADA3",
    badge: "Top Rated",
    ctas: ["Get Quote", "View Details"],
  },
  {
    id: 9,
    name: "Bajaj Life iSecure II",
    insurer: "Bajaj Allianz Life",
    category: "Term Insurance",
    tag: "Surrogate Income Option",
    desc: "Term plan designed for self-employed individuals without traditional income proof.",
    features: [
      "₹1 Crore coverage option",
      "Surrogate income eligibility",
      "Flexible documentation options",
      "High sum assured available",
    ],
    bestFor: "Business owners, freelancers, self-employed",
    icon: Briefcase,
    accentColor: "#2076C7",
    badge: "Self-Employed",
    ctas: ["Get Quote", "View Details"],
  },
  {
    id: 10,
    name: "Bajaj Life ACE",
    insurer: "Bajaj Allianz Life",
    category: "Savings Plan",
    tag: "Extra Income Benefits",
    desc: "Participating savings plan offering 35% extra income and higher long-term payout benefits.",
    features: [
      "35% extra income option",
      "Long-term income payout",
      "Additional maturity benefits",
      "Tax savings under 80C",
    ],
    bestFor: "Wealth accumulation & income planning",
    icon: Gift,
    accentColor: "#1CADA3",
    badge: "Income Plus",
    ctas: ["Get Quote", "View Details"],
  },
  {
    id: 11,
    name: "Tata AIA Sampoorna Raksha Promise",
    insurer: "Tata AIA Life",
    category: "Term Insurance",
    tag: "Return of Premium",
    desc: "Term plan with return of premium option and whole life coverage up to age 85.",
    features: [
      "₹1 Crore life cover",
      "Coverage till 85 years",
      "Option to defer premium",
      "Return of premium option",
    ],
    bestFor: "Premium-back term plan seekers",
    icon: ShieldCheck,
    accentColor: "#2076C7",
    badge: "Promise",
    ctas: ["Get Quote", "View Details"],
  },
  {
    id: 12,
    name: "Tata AIA Param Raksha Plus 2.0",
    insurer: "Tata AIA Life",
    category: "Combo Plan",
    tag: "360° Protection",
    desc: "Comprehensive combo plan: life, accidental, critical illness & health coverage in one policy.",
    features: [
      "₹1 Crore life + accidental cover",
      "Critical illness benefit",
      "Hospital cash benefit",
      "OPD cover included",
    ],
    bestFor: "All-in-one safety seekers",
    icon: Zap,
    accentColor: "#1CADA3",
    badge: "360° Combo",
    ctas: ["Get Quote", "View Details"],
  },
];

const FILTER_TABS = ["All", "Term Insurance", "Guaranteed Savings", "Child Plan", "Retirement", "Savings Plan", "Combo Plan"];

export default function TopRecommendedPlans() {
  const [activeFilter, setActiveFilter] = useState("All");
  const [searchQuery, setSearchQuery] = useState("");
  const [detailsPlan, setDetailsPlan] = useState<typeof allPlans[0] | null>(null);

  const filtered = allPlans.filter(p => {
    const matchesCategory = activeFilter === "All" || p.category === activeFilter;
    const q = searchQuery.toLowerCase();
    const matchesSearch = !q ||
      p.name.toLowerCase().includes(q) ||
      p.insurer.toLowerCase().includes(q) ||
      p.tag.toLowerCase().includes(q) ||
      p.category.toLowerCase().includes(q) ||
      p.bestFor.toLowerCase().includes(q) ||
      p.features.some(f => f.toLowerCase().includes(q));
    return matchesCategory && matchesSearch;
  });

  const { openLogin } = useModal();
  const handleAction = (plan: typeof allPlans[0], actionText: string) => {
    if (actionText === "View Details") {
      setDetailsPlan(plan);
    } else {
      openLogin();
    }
  };

  return (
    <>
      <PlanDetailsModal
        plan={detailsPlan}
        onClose={() => setDetailsPlan(null)}
        onGetQuote={() => openLogin()}
      />
      <section
        className="py-16 md:py-24 bg-neutral-50 relative overflow-hidden text-gray-700 font-sans"
        id="recommended-plans"
      >
        {/* Background accents */}
        <div className="absolute top-0 left-0 w-[600px] h-[600px] bg-[#2076C7]/5 rounded-full blur-[120px] pointer-events-none -translate-x-1/2 -translate-y-1/2" />
        <div className="absolute bottom-0 right-0 w-[600px] h-[600px] bg-[#1CADA3]/5 rounded-full blur-[120px] pointer-events-none translate-x-1/2 translate-y-1/2" />

        <div className="container-custom relative z-10 px-6 md:px-10 mx-auto max-w-7xl">

          {/* Header */}
          <div className="flex flex-col lg:flex-row items-center lg:items-end justify-between gap-10 mb-16 text-center lg:text-left">

            <div className="max-w-2xl mx-auto lg:mx-0">
              <div className="flex items-center justify-center lg:justify-start gap-3 mb-6">
                <span className="w-8 h-[2px] bg-[#1CADA3]" />
                <span className="text-[#1CADA3] font-black uppercase text-xs tracking-[0.5em]">
                  TOP RECOMMENDED PLANS
                </span>
              </div>

              <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold bg-gradient-to-r from-[#2076C7] to-[#1CADA3] bg-clip-text text-transparent mb-6">
                Insurance Blueprints
              </h2>

              <p className="text-gray-500 text-lg md:text-xl font-light max-w-xl mx-auto lg:mx-0 leading-relaxed">
                Research-driven strategies designed to capture value across diverse market cycles.
              </p>
            </div>

            {/* Stats Pill */}
            <div className="flex items-center gap-4 bg-white border border-slate-100 rounded-3xl p-5 shadow-lg mx-auto lg:mx-0">
              <div className="w-14 h-14 bg-gradient-to-br from-[#2076C7] to-[#1CADA3] rounded-2xl flex items-center justify-center text-white">
                <ShieldCheck className="w-7 h-7" />
              </div>
              <div className="text-left">
                <p className="text-[10px] font-black text-slate-500 uppercase tracking-widest">
                  Verified
                </p>
                <p className="text-xl font-black text-[#2076C7]">
                  {filtered.length} Live Blueprints
                </p>
              </div>
            </div>
          </div>

          {/* Search + Filters */}
          <div className="flex flex-col xl:flex-row items-center gap-6 mb-12">

            {/* Search */}
            <div className="flex items-center gap-3 bg-white border border-slate-200 rounded-2xl px-5 py-3 w-full xl:w-[400px] shadow-sm">
              <Search className="w-5 h-5 text-slate-500 shrink-0" />
              <input
                type="text"
                value={searchQuery}
                onChange={e => setSearchQuery(e.target.value)}
                placeholder="Search by insurer, category or feature..."
                className="flex-1 bg-transparent font-sans text-sm font-semibold text-[#2076C7] placeholder:text-slate-500 outline-none"
              />
            </div>

            {/* Filters */}
            <div className="flex items-center gap-2 overflow-x-auto w-full xl:flex-1 justify-center xl:justify-start">
              {FILTER_TABS.map(tab => (
                <button
                  key={tab}
                  onClick={() => setActiveFilter(tab)}
                  className={`whitespace-nowrap font-sans px-4 py-2 rounded-2xl text-[10px] font-black uppercase tracking-widest transition-all border ${activeFilter === tab
                    ? "bg-[#2076C7] text-white border-[#2076C7]"
                    : "bg-white text-slate-500 border-slate-100 hover:border-[#2076C7]/30 hover:text-[#2076C7]"
                    }`}
                >
                  {tab}
                </button>
              ))}
            </div>
          </div>

          {/* Cards Grid */}
          <div className="relative">
            <div className="max-h-[700px] overflow-y-auto pr-2 md:pr-4 plans-scroll-vertical">

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 pb-6">
                <AnimatePresence mode="popLayout">
                  {filtered.map(plan => (
                    <motion.div
                      key={plan.id}
                      layout
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0 }}
                      className="bg-white rounded-3xl border border-slate-100 shadow-sm hover:shadow-lg transition-all flex flex-col"
                    >
                      <div className="p-6 flex-1 flex flex-col">

                        <div className="flex items-center justify-between mb-4">
                          <div>
                            <p className="text-[9px] font-black text-slate-400 uppercase tracking-widest">
                              {plan.insurer}
                            </p>
                            <h3 className="text-sm font-black text-slate-800">
                              {plan.name}
                            </h3>
                          </div>

                          <div
                            className="px-2 py-1 rounded-md text-[8px] font-bold uppercase tracking-wider"
                            style={{
                              color: plan.accentColor,
                              backgroundColor: `${plan.accentColor}10`,
                            }}
                          >
                            {plan.badge}
                          </div>
                        </div>

                        <div className="space-y-2 mb-6 flex-1">
                          {plan.features.slice(0, 2).map((feat, i) => (
                            <div key={i} className="flex items-start gap-2">
                              <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500 mt-[2px]" />
                              <span className="text-[11px] text-slate-600">{feat}</span>
                            </div>
                          ))}
                        </div>
                      </div>

                      <div className="px-6 py-4 bg-slate-50 border-t border-slate-100 flex items-center justify-between">
                        <div>
                          <p className="text-[9px] text-slate-400 font-bold uppercase tracking-widest">
                            Starting
                          </p>
                          <p className="text-sm font-black text-slate-800">
                            ₹{420 + plan.id * 85}/mo
                          </p>
                        </div>

                        <button
                          onClick={() => handleAction(plan, "Get Quote")}
                          className="px-4 py-2 font-sans rounded-lg text-[10px] font-black uppercase tracking-wider text-white shadow-md hover:scale-105 transition-all"
                          style={{ backgroundColor: plan.accentColor }}
                        >
                          Quote
                        </button>
                      </div>
                    </motion.div>
                  ))}
                </AnimatePresence>
              </div>
            </div>
          </div>

          {/* Disclaimer */}
          <p className="mt-16 text-center text-sm text-slate-400 max-w-2xl mx-auto leading-relaxed italic font-sans">
            *Premium rates and benefits are subject to respective insurer terms &
            conditions.
          </p>
        </div>
      </section>
    </>
  );
}