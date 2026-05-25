"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  CheckCircle2,
  ShieldCheck, Star, Zap, Anchor,
  TrendingUp, GraduationCap, Heart,
  Briefcase, Gift, Landmark,
  Search, ArrowRight
} from "lucide-react";
import PlanDetailsModal, { Plan } from "./PlanDetailsModal";
import { useModal } from "../../../context/ModalContext";
import { usePathname } from "next/navigation";
import LifeInsuranceForm from "../../../dashboard/leadmanagement/forms/lifeinsuranceform";

const allPlans = [
  {
    id: 1,
    name: "HDFC Life Sanchay Plus",
    insurer: "HDFC Life",
    category: "Guaranteed Savings",
    tag: "Assured Returns | Low Risk",
    desc: "A non-linked, non-participating savings plan that offers guaranteed maturity benefits with flexible premium payment options. Choose between single premium, limited or regular pay to suit your financial goals.",
    features: [
      "Guaranteed maturity benefits with no market risk",
      "Flexible premium payment terms (Single / Limited / Regular Pay)",
      "Life cover throughout policy term",
      "Option for regular income or lump-sum payout",
      "Tax benefits under Section 80C & 10(10D)",
    ],
    bestFor: "Marriage planning, retirement, long-term savings",
    icon: Landmark,
    accentColor: "#2076C7",
    badge: "Guaranteed",
    ctas: ["View Details", "Apply Now"],
    claimSettlementRatio: "98.55%",
  },
  {
    id: 2,
    name: "ICICI Pru SmartKid Assure",
    insurer: "ICICI Prudential",
    category: "Child Plan",
    tag: "Market Linked Returns",
    desc: "A unit-linked child plan that combines market-linked growth with life insurance protection. Designed to help you build a corpus for your child's future milestones like education and marriage.",
    features: [
      "Zero premium allocation charges",
      "Wealth creation through market-linked returns",
      "Waiver of premium on death of life assured",
      "Systematic withdrawal option for milestone payouts",
      "Life cover for the entire policy term",
    ],
    bestFor: "Child education & milestone planning",
    icon: GraduationCap,
    accentColor: "#1CADA3",
    badge: "Child Future",
    ctas: ["View Details", "Apply Now"],
    claimSettlementRatio: "97.82%",
  },
  {
    id: 3,
    name: "HDFC Life YoungStar Super Premium",
    insurer: "HDFC Life",
    category: "Child Plan",
    tag: "Wealth + Protection",
    desc: "A ULIP-based child plan that offers market-linked returns with life insurance coverage. Build long-term wealth for your child's higher education, career launch, or wedding.",
    features: [
      "Market-linked returns with professional fund management",
      "Flexible premium payment options",
      "Life cover included throughout the policy",
      "Fund switching option (up to 12 free switches/year)",
      "Tax benefits under Section 80C & 10(10D)",
    ],
    bestFor: "Higher education & long-term growth",
    icon: Star,
    accentColor: "#2076C7",
    badge: "Wealth Builder",
    ctas: ["View Details", "Apply Now"],
    claimSettlementRatio: "98.55%",
  },
  {
    id: 4,
    name: "HDFC Life Systematic Pension",
    insurer: "HDFC Life",
    category: "Retirement",
    tag: "Guaranteed Pension",
    desc: "A traditional participating pension plan that helps you build a retirement corpus with compounded bonus accumulation and assured vesting benefits at maturity.",
    features: [
      "Assured vesting benefit at maturity",
      "Multiple policy terms available (5–40 years)",
      "Compound bonus accumulation yearly",
      "Guaranteed pension income post-retirement",
    ],
    bestFor: "Retirement planning",
    icon: Anchor,
    accentColor: "#1CADA3",
    badge: "Retirement",
    ctas: ["View Details", "Apply Now"],
    claimSettlementRatio: "98.55%",
  },
  {
    id: 5,
    name: "Axis Max Life Smart Term Plus",
    insurer: "Axis Max Life",
    category: "Term Insurance",
    tag: "Pure Protection",
    desc: "A comprehensive term plan with 6 plan variants offering high life cover at affordable premiums. Includes whole life coverage option and special discounted rates for women.",
    features: [
      "Up to 6 plan variants to choose from",
      "Whole life coverage option (up to age 100)",
      "100% premium return option available",
      "Instant claim payout option within 4 hours",
      "Special discounted rates for women",
    ],
    bestFor: "Family financial security",
    icon: ShieldCheck,
    accentColor: "#2076C7",
    badge: "Most Popular",
    ctas: ["View Details", "Apply Now"],
    claimSettlementRatio: "99.51%",
  },
  {
    id: 6,
    name: "ICICI Pru iProtect Smart",
    insurer: "ICICI Prudential",
    category: "Term Insurance",
    tag: "High Coverage | Smart Benefits",
    desc: "Affordable term insurance with milestone-based cover increase at key life events. Includes a skip-a-premium option for financial flexibility during emergencies.",
    features: [
      "Instant claim payout option",
      "Increase cover at major life events (marriage, child birth)",
      "Option to skip premium for 1 year in emergencies",
      "Comprehensive all-round protection with riders",
    ],
    bestFor: "Milestone-based life stage protection",
    icon: ShieldCheck,
    accentColor: "#1CADA3",
    badge: "Smart Choice",
    ctas: ["View Details", "Apply Now"],
    claimSettlementRatio: "97.82%",
  },
  {
    id: 7,
    name: "HDFC Life Click 2 Achieve",
    insurer: "HDFC Life",
    category: "Guaranteed Savings",
    tag: "Increasing Income Option",
    desc: "A guaranteed income plan with an increasing payout option that grows up to 10% per annum. Designed for rising income needs aligned to your future financial goals.",
    features: [
      "Guaranteed returns with no market risk",
      "Flexible benefit payout options (Lump Sum / Income)",
      "Increasing income option (up to 10% p.a.)",
      "Life cover included throughout policy term",
    ],
    bestFor: "Rising income needs & goal planning",
    icon: TrendingUp,
    accentColor: "#2076C7",
    badge: "High Growth",
    ctas: ["View Details", "Apply Now"],
    claimSettlementRatio: "98.55%",
  },
  {
    id: 8,
    name: "HDFC Life Click 2 Protect Supreme",
    insurer: "HDFC Life",
    category: "Term Insurance",
    tag: "Comprehensive Protection",
    desc: "Premium term plan with wellness benefits, industry-leading Claim Settlement Ratio, and special discounted premiums for salaried employees and women.",
    features: [
      "Immediate claim payout option",
      "Special discounted rates for salaried & women",
      "Parent Protect Care option for dependent parents",
      "Wellness & fitness benefits with rewards",
    ],
    bestFor: "Premium elite protection seekers",
    icon: Heart,
    accentColor: "#1CADA3",
    badge: "Top Rated",
    ctas: ["View Details", "Apply Now"],
    claimSettlementRatio: "98.55%",
  },
  {
    id: 9,
    name: "Bajaj Life iSecure II",
    insurer: "Bajaj Allianz Life",
    category: "Term Insurance",
    tag: "Surrogate Income Option",
    desc: "Term plan designed for self-employed individuals and business owners who may not have traditional income proof. Offers high coverage up to ₹1 Crore with flexible documentation.",
    features: [
      "₹1 Crore coverage option available",
      "Surrogate income eligibility for self-employed",
      "Flexible documentation options (ITR / Bank Statement)",
      "High sum assured at competitive premiums",
    ],
    bestFor: "Business owners, freelancers, self-employed",
    icon: Briefcase,
    accentColor: "#2076C7",
    badge: "Self-Employed",
    ctas: ["View Details", "Apply Now"],
    claimSettlementRatio: "98.49%",
  },
  {
    id: 10,
    name: "Bajaj Life ACE",
    insurer: "Bajaj Allianz Life",
    category: "Savings Plan",
    tag: "Extra Income Benefits",
    desc: "A participating savings plan offering up to 35% extra income benefit and higher long-term payout. Ideal for wealth accumulation with consistent income planning.",
    features: [
      "35% extra income option on regular payout",
      "Long-term income payout for sustained returns",
      "Additional maturity benefits at policy end",
      "Tax savings under Section 80C & 10(10D)",
    ],
    bestFor: "Wealth accumulation & income planning",
    icon: Gift,
    accentColor: "#1CADA3",
    badge: "Income Plus",
    ctas: ["View Details", "Apply Now"],
    claimSettlementRatio: "98.49%",
  },
  {
    id: 11,
    name: "Tata AIA Sampoorna Raksha Promise",
    insurer: "Tata AIA Life",
    category: "Term Insurance",
    tag: "Return of Premium",
    desc: "A term plan with Return of Premium (TROP) option that refunds all premiums paid at maturity if you survive the term. Coverage available up to age 85.",
    features: [
      "₹1 Crore life cover at affordable premiums",
      "Coverage till 85 years of age",
      "Option to defer premium payment for up to 1 year",
      "Return of Premium option at maturity",
    ],
    bestFor: "Premium-back term plan seekers",
    icon: ShieldCheck,
    accentColor: "#2076C7",
    badge: "Promise",
    ctas: ["View Details", "Apply Now"],
    claimSettlementRatio: "98.58%",
  },
  {
    id: 12,
    name: "Tata AIA Param Raksha Plus 2.0",
    insurer: "Tata AIA Life",
    category: "Combo Plan",
    tag: "360° Protection",
    desc: "An all-in-one combo plan covering life, accidental death, critical illness, and health in a single policy. Offers comprehensive protection with hospital cash and OPD cover.",
    features: [
      "₹1 Crore life + accidental death cover",
      "Critical illness benefit covering 36+ conditions",
      "Hospital cash benefit for daily expenses",
      "OPD cover included for outpatient expenses",
    ],
    bestFor: "All-in-one safety seekers",
    icon: Zap,
    accentColor: "#1CADA3",
    badge: "360° Combo",
    ctas: ["View Details", "Apply Now"],
    claimSettlementRatio: "98.58%",
  },
];

const FILTER_TABS = ["All", "Term Insurance", "Guaranteed Savings", "Child Plan", "Retirement", "Savings Plan", "Combo Plan"];

export default function TopRecommendedPlans() {
  const pathname = usePathname();
  const [activeFilter, setActiveFilter] = useState("All");
  const [searchQuery, setSearchQuery] = useState("");
  const [detailsPlan, setDetailsPlan] = useState<Plan | null>(null);
  const [showForm, setShowForm] = useState(false);

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
  const isCustomer = pathname?.includes("/customer");

  const handleAction = (plan: Plan, actionText: string) => {
    if (actionText === "View Details") {
      setDetailsPlan(plan);
    } else {
      if (!isCustomer) {
        openLogin();
      } else {
        setShowForm(true);
      }
    }
  };

  const handleGetQuote = (plan: Plan) => {
    if (!isCustomer) {
      openLogin();
    } else {
      setDetailsPlan(null);
      setShowForm(true);
    }
  };

  return (
    <>
      {showForm && <LifeInsuranceForm onClose={() => setShowForm(false)} />}
      <PlanDetailsModal
        plan={detailsPlan}
        onClose={() => setDetailsPlan(null)}
        onGetQuote={handleGetQuote}
        isCustomer={isCustomer}
      />
      <section
        className={`${isCustomer ? "py-8 md:py-12" : "py-16 md:py-24 bg-neutral-50"} relative overflow-hidden text-gray-700 font-sans selection:bg-[#2076C7]/10`}
        id="recommended-plans"
      >

        <div className={`container-custom relative z-10 ${isCustomer ? "px-2" : "px-6 md:px-10"} mx-auto max-w-7xl`}>

          {/* Header Part */}
          <div className={`flex flex-col lg:flex-row items-center lg:items-end justify-between ${isCustomer ? "gap-6 mb-4" : "gap-10 mb-16"} text-center lg:text-left`}>

            <div className="max-w-2xl mx-auto lg:mx-0">
              <div className={`flex items-center justify-center lg:justify-start gap-3 ${isCustomer ? "mb-1" : "mb-6"}`}>
                <span className="w-8 h-[2px] bg-[#1CADA3]" />
                <span className="text-[#1CADA3] font-black uppercase text-[10px] tracking-[0.5em]">
                  TOP RECOMMENDED PLANS
                </span>
              </div>

              <h2 className={`${isCustomer ? "text-2xl md:text-3xl" : "text-3xl md:text-4xl lg:text-5xl"} font-black bg-gradient-to-r from-[#2076C7] to-[#1CADA3] bg-clip-text text-transparent ${isCustomer ? "mb-2" : "mb-6"} tracking-tight`}>
                Insurance Blueprints
              </h2>

              <p className={`${isCustomer ? "text-sm md:text-base text-slate-500" : "text-gray-500 text-lg md:text-xl"} font-medium max-w-xl mx-auto lg:mx-0 leading-relaxed font-sans`}>
                Research-driven strategies designed to capture value across diverse market cycles.
              </p>
            </div>

            {/* Stats Pill */}
            <div className={`flex items-center gap-4 bg-white border border-slate-100 rounded-3xl ${isCustomer ? "p-3" : "p-5"} shadow-lg mx-auto lg:mx-0`}>
              <div className={`${isCustomer ? "w-10 h-10" : "w-14 h-14"} bg-gradient-to-br from-[#2076C7] to-[#1CADA3] rounded-2xl flex items-center justify-center text-white shadow-md`}>
                <ShieldCheck className={`${isCustomer ? "w-5 h-5" : "w-7 h-7"}`} />
              </div>
              <div className="text-left font-sans">
                <p className="text-[10px] font-black text-slate-500 uppercase tracking-widest">
                  Verified
                </p>
                <p className={`${isCustomer ? "text-base" : "text-xl"} font-black text-[#2076C7]`}>
                  {filtered.length} Live Blueprints
                </p>
              </div>
            </div>
          </div>

          {/* Filters + Search Row */}
          <div className={`flex flex-col xl:flex-row items-center gap-4 ${isCustomer ? "mb-4" : "mb-12"} w-full`}>
            
            {/* Filters */}
            <div className={`flex items-center ${isCustomer ? "gap-1.5" : "gap-2"} overflow-x-auto flex-1 no-scrollbar py-2`}>
              {FILTER_TABS.map(tab => (
                <button
                  key={tab}
                  onClick={() => setActiveFilter(tab)}
                  className={`whitespace-nowrap font-sans ${isCustomer ? "px-3 py-1.5" : "px-4 py-2"} rounded-2xl text-[10px] font-black uppercase tracking-widest transition-all border ${activeFilter === tab
                    ? "bg-[#2076C7] text-white border-[#2076C7] shadow-lg shadow-blue-500/20"
                    : "bg-white text-slate-500 border-slate-100 hover:border-[#2076C7]/30 hover:text-[#2076C7]"
                    }`}
                >
                  {tab}
                </button>
              ))}
            </div>

            {/* Search */}
            <div className="flex items-center gap-3 bg-white border border-slate-200 rounded-full px-5 py-2.5 w-full xl:w-[320px] shadow-sm shrink-0">
              <Search className="w-4 h-4 text-slate-400 shrink-0" />
              <input
                type="text"
                value={searchQuery}
                onChange={e => setSearchQuery(e.target.value)}
                placeholder="Search insurer..."
                className="flex-1 bg-transparent font-sans text-[13px] font-semibold text-[#2076C7] placeholder:text-slate-400 outline-none"
              />
            </div>
          </div>

          {/* Cards Grid */}
          <div className="relative">
            <div className="w-full">
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
                      <div className={`${isCustomer ? "p-4" : "p-6"} flex-1 flex flex-col`}>

                        <div className="flex items-center justify-between mb-4">
                          <div className="font-sans">
                            <p className="text-[9px] font-black text-slate-400 uppercase tracking-widest leading-none mb-1">
                              {plan.insurer}
                            </p>
                            <h3 className="text-sm font-black text-slate-800 tracking-tight">
                              {plan.name}
                            </h3>
                          </div>

                          <div
                            className="px-2 py-1 rounded-md text-[8px] font-black uppercase tracking-wider font-sans shadow-sm border border-black/5"
                            style={{
                              color: plan.accentColor,
                              backgroundColor: `${plan.accentColor}10`,
                            }}
                          >
                            {plan.badge}
                          </div>
                        </div>

                        <div className={`space-y-2 ${isCustomer ? "mb-3" : "mb-6"} flex-1 font-sans`}>
                          {plan.features.slice(0, 2).map((feat, i) => (
                            <div key={i} className="flex items-start gap-2">
                              <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500 mt-[2px]" />
                              <span className="text-[11px] text-slate-600 font-bold">{feat}</span>
                            </div>
                          ))}
                        </div>

                        {/* Claim Settlement Ratio */}
                        {isCustomer && (
                          <div className="flex items-center gap-2 mb-3 px-2 py-1.5 bg-blue-50/60 rounded-lg border border-blue-100/50">
                            <ShieldCheck className="w-3.5 h-3.5 text-[#2076C7]" />
                            <span className="text-[10px] font-black text-slate-600">
                              Claim Settlement: <span className="text-[#2076C7]">{plan.claimSettlementRatio}</span>
                            </span>
                          </div>
                        )}
                      </div>

                      <div className={`${isCustomer ? "px-4 py-3" : "px-6 py-4"} bg-slate-50 border-t border-slate-100 flex items-center justify-between`}>
                        <button
                          onClick={() => handleAction(plan, "View Details")}
                          className="text-[10px] font-black text-slate-500 uppercase tracking-wider hover:text-[#2076C7] transition-colors flex items-center gap-1 font-sans"
                        >
                          View Details
                        </button>

                        <button
                          onClick={() => handleAction(plan, "Apply Now")}
                          className="px-4 py-2 font-sans rounded-lg text-[10px] font-black uppercase tracking-wider text-white shadow-md hover:scale-105 transition-all flex items-center gap-1.5"
                          style={{ backgroundColor: plan.accentColor }}
                        >
                          {isCustomer ? "Apply Now" : "Quote"}
                          {isCustomer && <ArrowRight className="w-3 h-3" />}
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