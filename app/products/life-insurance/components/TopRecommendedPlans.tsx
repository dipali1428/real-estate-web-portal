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
import PlanDetailsModal, { Plan } from "./PlanDetailsModal";
import { useModal } from "../../../context/ModalContext";
import { usePathname, useRouter } from "next/navigation";

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
  const pathname = usePathname();
  const [activeFilter, setActiveFilter] = useState("All");
  const [searchQuery, setSearchQuery] = useState("");
  const [detailsPlan, setDetailsPlan] = useState<Plan | null>(null);
  const [isSurveyOpen, setIsSurveyOpen] = useState(false);
  const [surveyStep, setSurveyStep] = useState(0);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [analyzingStep, setAnalyzingStep] = useState(0);
  const [selectedPlanForSurvey, setSelectedPlanForSurvey] = useState<Plan | null>(null);
  const [isKYCProgressing, setIsKYCProgressing] = useState(false);
  const [kycStep, setKycStep] = useState(0);
  const [isSuccess, setIsSuccess] = useState(false);
  const router = useRouter();

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

  const startAnalysis = (plan: Plan) => {
    setIsSurveyOpen(false);
    setIsAnalyzing(true);
    const steps = ["Analyzing Risk Profile", "Verifying Insurer Terms", "Aligning Portfolio", "Generating Illustration"];
    let currentStep = 0;
    
    const interval = setInterval(() => {
      currentStep++;
      if (currentStep < steps.length) {
        setAnalyzingStep(currentStep);
      } else {
        clearInterval(interval);
        setTimeout(() => {
          setIsAnalyzing(false);
          setAnalyzingStep(0);
          setDetailsPlan(plan);
        }, 500);
      }
    }, 600);
  };

  const handleAction = (plan: Plan, actionText: string) => {
    if (actionText === "View Details") {
      setDetailsPlan(plan);
    } else {
      if (!isCustomer) {
        openLogin();
      } else {
        setSelectedPlanForSurvey(plan);
        setIsSurveyOpen(true);
        setSurveyStep(0);
      }
    }
  };

  const handleGetQuote = (plan: Plan) => {
    if (!isCustomer) {
      openLogin();
    } else {
      setDetailsPlan(null);
      setIsKYCProgressing(true);
      const kycSteps = ["Scanning Document Integrity", "Biometric Identity Mapping", "Policy Risk Underwriting", "Finalizing Issuance"];
      let currentKycStep = 0;
      
      const kycInterval = setInterval(() => {
        currentKycStep++;
        if (currentKycStep < kycSteps.length) {
          setKycStep(currentKycStep);
        } else {
          clearInterval(kycInterval);
          setTimeout(() => {
            setIsKYCProgressing(false);
            setIsSuccess(true);
          }, 800);
        }
      }, 900);
    }
  };

  return (
    <>
      <AnimatePresence>
        {isSuccess && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="fixed inset-0 z-[9999] bg-[#FAFAFA] flex items-center justify-center p-6"
          >
            <motion.div 
              initial={{ scale: 0.9, y: 20 }}
              animate={{ scale: 1, y: 0 }}
              className="bg-white p-10 md:p-16 rounded-[4rem] border border-slate-100 shadow-2xl max-w-2xl text-center flex flex-col items-center"
            >
              <div className="w-24 h-24 bg-emerald-50 rounded-full flex items-center justify-center mb-8 relative">
                 <div className="absolute inset-0 bg-emerald-100/50 rounded-full animate-ping" />
                 <CheckCircle2 size={48} className="text-[#1CADA3] relative" />
              </div>
              <p className="text-[10px] font-black text-[#1CADA3] uppercase tracking-[0.4em] mb-3">Submission Success</p>
              <h2 className="text-3xl md:text-5xl font-black text-slate-900 tracking-tight leading-tight mb-6">Application Under <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#2076C7] to-[#1CADA3]">Review</span></h2>
              <p className="text-slate-500 font-medium mb-12 max-w-md mx-auto leading-relaxed">Your digital onboarding is complete. Our underwriters are verifying your profile. You can track the live status in your dashboard.</p>
              
              <div className="flex flex-col sm:flex-row gap-4 w-full">
                <button 
                  onClick={() => router.push("/customer/insurance/life-insurance/applications")}
                  className="flex-1 bg-slate-900 text-white px-8 py-4 rounded-2xl font-black text-[11px] uppercase tracking-[0.2em] shadow-xl hover:bg-black transition-all"
                >
                  Track Application
                </button>
                <button 
                  onClick={() => setIsSuccess(false)}
                  className="flex-1 bg-white border border-slate-200 text-slate-500 px-8 py-4 rounded-2xl font-black text-[11px] uppercase tracking-[0.2em] hover:bg-slate-50 transition-all"
                >
                  Return to Blueprints
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}

        {isKYCProgressing && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[9999] bg-white flex flex-col items-center justify-center text-slate-900"
          >
            <div className="w-full max-w-md px-10">
               <div className="flex items-center gap-4 mb-10">
                  <div className="p-3 bg-blue-50 rounded-2xl border border-blue-100">
                     <ShieldCheck className="text-[#2076C7]" size={24} />
                  </div>
                  <div>
                    <h3 className="text-sm font-black text-slate-400 uppercase tracking-widest leading-none mb-1">Digital KYC</h3>
                    <p className="text-xl font-black text-slate-900">Elite Onboarding Phase</p>
                  </div>
               </div>

               <div className="space-y-8">
                  {["Scanning Document Integrity", "Biometric Identity Mapping", "Policy Risk Underwriting", "Finalizing Issuance"].map((step, idx) => (
                    <div key={step} className="flex items-center gap-4 transition-all duration-500" style={{ opacity: kycStep >= idx ? 1 : 0.2 }}>
                       <div className="w-8 h-8 rounded-full border-2 border-slate-100 flex items-center justify-center shrink-0">
                          {kycStep > idx ? <CheckCircle2 size={16} className="text-[#1CADA3]" /> : <span className="text-[10px] font-black">{idx + 1}</span>}
                       </div>
                       <p className={`text-xs font-black uppercase tracking-widest ${kycStep === idx ? "text-[#2076C7]" : "text-slate-500"}`}>{step}</p>
                       {kycStep === idx && <div className="w-1.5 h-1.5 rounded-full bg-[#2076C7] animate-ping" />}
                    </div>
                  ))}
               </div>
               
               <div className="mt-20 flex flex-col items-center gap-2">
                  <div className="w-full h-1.5 bg-slate-100 rounded-full overflow-hidden">
                     <motion.div 
                        initial={{ width: 0 }}
                        animate={{ width: `${(kycStep + 1) * 25}%` }}
                        className="h-full bg-gradient-to-r from-[#2076C7] to-[#1CADA3]"
                     />
                  </div>
                  <p className="text-[9px] font-black text-slate-300 uppercase tracking-[0.5em] mt-4 animator-pulse">Encryption: AES-256 Bit Secure Layer</p>
               </div>
            </div>
          </motion.div>
        )}

        {isSurveyOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[9999] bg-slate-900/60 backdrop-blur-md flex items-center justify-center p-4"
          >
            <motion.div
              initial={{ scale: 0.9, y: 20 }}
              animate={{ scale: 1, y: 0 }}
              className="bg-white rounded-[3rem] w-full max-w-xl overflow-hidden shadow-2xl"
            >
              <div className="bg-gradient-to-r from-[#2076C7] to-[#1CADA3] p-8 text-white">
                <div className="flex justify-between items-center mb-4 text-[10px] font-black uppercase tracking-[0.2em] opacity-80">
                  <span>Step {surveyStep + 1} of 3</span>
                  <span>AI Precision Surveyor</span>
                </div>
                <h3 className="text-2xl font-black tracking-tight">
                  {surveyStep === 0 && "Define your Risk Preference"}
                  {surveyStep === 1 && "Preferred Payout Mode"}
                  {surveyStep === 2 && "Add Critical Protection?"}
                </h3>
              </div>

              <div className="p-8 space-y-6">
                {surveyStep === 0 && (
                  <div className="grid grid-cols-1 gap-3">
                    {["Guaranteed (Low Risk)", "Balanced (Mid Risk)", "Aggressive (High Risk)"].map((opt) => (
                      <button 
                        key={opt}
                        onClick={() => setSurveyStep(1)}
                        className="p-5 text-left rounded-2xl border border-slate-100 hover:border-[#2076C7] hover:bg-blue-50 transition-all font-sans font-bold text-slate-700 flex justify-between items-center group"
                      >
                        {opt}
                        <ChevronRight size={16} className="group-hover:translate-x-1 transition-transform" />
                      </button>
                    ))}
                  </div>
                )}
                {surveyStep === 1 && (
                  <div className="grid grid-cols-1 gap-3">
                    {["Monthly Income Plan", "Lump Sum Payment", "Hybrid Mode"].map((opt) => (
                      <button 
                        key={opt}
                        onClick={() => setSurveyStep(2)}
                        className="p-5 text-left rounded-2xl border border-slate-100 hover:border-[#1CADA3] hover:bg-emerald-50 transition-all font-sans font-bold text-slate-700 flex justify-between items-center group"
                      >
                        {opt}
                        <ChevronRight size={16} className="group-hover:translate-x-1 transition-transform" />
                      </button>
                    ))}
                  </div>
                )}
                {surveyStep === 2 && (
                  <div className="grid grid-cols-1 gap-3">
                    {["Yes, Include Comprehensive Riders", "No, Basic Cover Only"].map((opt) => (
                      <button 
                        key={opt}
                        onClick={() => startAnalysis(selectedPlanForSurvey!)}
                        className="p-5 text-left rounded-2xl border border-slate-100 hover:border-[#2076C7] hover:bg-blue-50 transition-all font-sans font-bold text-slate-700 flex justify-between items-center group"
                      >
                        {opt}
                        <CheckCircle2 size={16} className="text-[#1CADA3]" />
                      </button>
                    ))}
                  </div>
                )}

                <div className="pt-4 flex justify-center">
                   <button 
                    onClick={() => setIsSurveyOpen(false)}
                    className="text-[10px] font-black text-slate-400 uppercase tracking-widest hover:text-slate-600"
                   >
                     Cancel Selection
                   </button>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}

        {isAnalyzing && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[9999] bg-slate-900/90 backdrop-blur-xl flex flex-col items-center justify-center text-white"
          >
            <div className="relative mb-12">
               <div className="w-24 h-24 border-2 border-white/20 rounded-full border-t-[#1CADA3] animate-spin" />
               <div className="absolute inset-0 flex items-center justify-center">
                  <ShieldCheck className="text-[#1CADA3] animate-pulse" size={32} />
               </div>
            </div>
            <div className="text-center space-y-4">
               <h3 className="text-xl font-black tracking-tight uppercase">AI Eligibility Analysis</h3>
               <div className="flex flex-col items-center gap-2">
                  <p className="text-sm font-black text-[#1CADA3] uppercase tracking-[0.3em] h-6">
                    {["Analyzing Risk Profile", "Verifying Insurer Terms", "Aligning Portfolio", "Generating Illustration"][analyzingStep]}
                  </p>
                  <div className="w-48 h-1 bg-white/10 rounded-full overflow-hidden">
                     <motion.div 
                        initial={{ width: 0 }}
                        animate={{ width: `${(analyzingStep + 1) * 25}%` }}
                        className="h-full bg-gradient-to-r from-[#2076C7] to-[#1CADA3]"
                     />
                  </div>
               </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

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

          {/* Header Part (Reverted) */}
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

            {/* Stats Pill (Reverted) */}
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

          {/* Filters + Search Row (Compact Revert) */}
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
                      </div>

                      <div className={`${isCustomer ? "px-4 py-3" : "px-6 py-4"} bg-slate-50 border-t border-slate-100 flex items-center justify-between`}>
                        <div className="font-sans">
                          <p className="text-[9px] text-slate-400 font-black uppercase tracking-widest mb-0.5">
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
                          {isCustomer ? "Select" : "Quote"}
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