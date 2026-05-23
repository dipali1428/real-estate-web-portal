"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import {
  Flame,
  Shield,
  Building,
  Store,
  Warehouse,
  Zap,
  Clock,
  Factory,
  Briefcase,
  ShieldCheck,
  CheckCircle2,
  ArrowRight
} from "lucide-react";
import FireInsuranceForm from "../../../dashboard/leadmanagement/forms/fireinsuranceform";

const features = [
  { title: "Standard Fire & Special Perils", desc: "Covers damage from fire, lightning, explosion, storms, floods, earthquakes, and riots as per IRDAI guidelines.", icon: Zap },
  { title: "Hassle-Free Claim Settlement", desc: "Priority fire claims processing with minimal documentation and dedicated claim support team.", icon: Clock },
  { title: "Structural & Content Coverage", desc: "Comprehensive coverage for building structure, furniture, fixtures, machinery, and stock-in-trade.", icon: Shield },
];

const plans = [
  {
    title: "Bharat Sookshma Udyam Suraksha",
    type: "Business",
    desc: "IRDAI-mandated policy for micro enterprises (MSME) with total assets up to ₹5 Crore. Covers fire, burglary, and business interruption in a single package.",
    icon: Store,
    price: "₹149/mo",
    color: "bg-blue-50 text-[#2076C7]",
    badge: "Most Popular",
    benefits: ["Zero Documentation for SMEs", "Fire + Burglary + BI Combined", "Instant Digital Certificate", "Assets up to ₹5 Crore"]
  },
  {
    title: "Residential Property Guard",
    type: "Home",
    desc: "Standard Fire & Special Perils policy for residential properties. Covers building structure and contents against fire, lightning, floods, and natural calamities.",
    icon: Building,
    price: "₹39/mo",
    color: "bg-emerald-50 text-emerald-600",
    badge: "Best Value",
    benefits: ["Building + Contents Cover", "Flood & Earthquake Protection", "Theft/Burglary Add-on Available", "24/7 Claim Support"]
  },
  {
    title: "Industrial Laghu Udyam Suraksha",
    type: "Enterprise",
    desc: "IRDAI-mandated policy for small/medium enterprises with assets between ₹5 Crore to ₹50 Crore. Comprehensive fire and allied perils protection for factories.",
    icon: Factory,
    price: "Custom Quote",
    color: "bg-slate-50 text-slate-800",
    badge: "Full Protection",
    benefits: ["Machinery Breakdown Cover", "Business Interruption (BI) Cover", "Earthquake & Terrorism Add-on", "On-site Risk Survey & Audit"]
  },
  {
    title: "Bharat Griha Raksha",
    type: "Residential",
    desc: "A comprehensive dwelling insurance policy covering structure, contents including jewelry, electronic equipment, and provides rent for alternative accommodation during repairs.",
    icon: Building,
    price: "₹75/mo",
    color: "bg-purple-50 text-purple-600",
    badge: "Home Essential",
    benefits: ["Structure + Content Cover", "Jewelry & Valuables Protection", "Rent for Alternative Accommodation", "Architect/Surveyor Fees Included"]
  },
  {
    title: "Public Liability (Fire)",
    type: "Legal",
    desc: "Third-party liability coverage for property damage or bodily injury arising from fire originating at your premises. Mandatory for certain commercial establishments.",
    icon: ShieldCheck,
    price: "₹99/mo",
    color: "bg-rose-50 text-rose-600",
    badge: "Compliance",
    benefits: ["Legal Defense Costs Covered", "Third-Party Property Damage", "Bodily Injury Liability", "Court Awards & Settlements"]
  },
  {
    title: "Warehouse & Stock Guard",
    type: "Inventory",
    desc: "Dedicated fire and allied perils protection for stored inventory, raw materials, work-in-progress, and finished goods in warehouses and godowns.",
    icon: Warehouse,
    price: "Custom Quote",
    color: "bg-amber-50 text-amber-600",
    badge: "Logistics",
    benefits: ["Stock-in-Trade Valuation", "Declaration Basis for Fluctuating Stock", "Spontaneous Combustion Cover", "Burglary Add-on Available"]
  },
  {
    title: "Consequential Loss (Fire)",
    type: "Business",
    desc: "Covers loss of gross profit during the indemnity period while your business is closed for repairs after an insured fire event. Also known as Business Interruption (BI) policy.",
    icon: Clock,
    price: "Custom Quote",
    color: "bg-indigo-50 text-indigo-600",
    badge: "Revenue Shield",
    benefits: ["Gross Profit Protection", "Standing Charges (Rent, Salaries)", "Increased Cost of Working", "Up to 12-Month Indemnity Period"]
  },
  {
    title: "Office Assets Package",
    type: "Office",
    desc: "A combined fire, burglary, and electronic equipment policy tailored for modern office setups including IT infrastructure, furniture, and money-in-transit.",
    icon: Briefcase,
    price: "₹299/mo",
    color: "bg-cyan-50 text-cyan-600",
    badge: "All-in-One",
    benefits: ["IT Equipment & Server Cover", "Furniture & Sanitary Fittings", "Money-in-Transit Protection", "Plate Glass Damage Cover"]
  },
  {
    title: "Terrorism Protection Add-on",
    type: "Security",
    desc: "Extended coverage add-on for damage caused by acts of terrorism, which is specifically excluded from standard fire policies. Available with any base fire policy.",
    icon: Shield,
    price: "+₹10/mo",
    color: "bg-red-50 text-red-600",
    badge: "Critical Add-on",
    benefits: ["IRDA Terrorism Pool Cover", "Explosion & Impact Damage", "Available with Any Fire Policy", "Recommended for High-Value Assets"]
  }
];



export default function FireInsuranceDashboard() {
  const [showForm, setShowForm] = useState(false);

  return (
    <div className="space-y-12 pb-20">
        {/* Fire Insurance Form Modal */}
        {showForm && <FireInsuranceForm onClose={() => setShowForm(false)} />}

        {/* ─── HERO SECTION ─── */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-gradient-to-r from-[#2076C7] via-[#1CADA3] to-[#16a085] rounded-3xl p-5 md:p-6 text-white relative overflow-hidden shadow-lg"
        >
          <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full -translate-y-1/2 translate-x-1/2 blur-2xl" />
          
          <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div className="max-w-2xl">
              <div className="flex items-center gap-3 mb-2">
                <div className="w-8 h-8 bg-white/20 rounded-lg flex items-center justify-center backdrop-blur-md border border-white/10">
                  <Flame size={16} className="text-white" />
                </div>
                <h2 className="text-lg md:text-xl font-black tracking-tight">
                  Secure Your Assets Against The Unpredictable
                </h2>
              </div>
              <p className="text-white/80 text-[11px] md:text-xs font-medium max-w-xl">
                Institutional-grade protection for properties, factories, and stock with zero-friction claims processing.
              </p>
            </div>
          </div>
        </motion.div>

        {/* ─── KEY FEATURES ─── */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {features.map((f, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.1 }}
              className="bg-white rounded-2xl border border-slate-100 p-5 flex items-start gap-4 shadow-sm"
            >
              <div className="w-10 h-10 bg-blue-50 rounded-xl flex items-center justify-center shrink-0">
                <f.icon size={20} className="text-[#2076C7]" />
              </div>
              <div>
                <h4 className="text-sm font-black text-slate-800 mb-1">{f.title}</h4>
                <p className="text-[11px] text-slate-500 font-medium leading-relaxed">{f.desc}</p>
              </div>
            </motion.div>
          ))}
        </div>

        {/* ─── RECOMMENDATION SECTION ─── */}
        <div className="pt-8">
           <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-10">
              <div className="max-w-2xl">
                <h2 className="text-2xl md:text-3xl font-black bg-gradient-to-r from-[#2076C7] to-[#1CADA3] bg-clip-text text-transparent tracking-tight mb-3">
                  Recommended Protection Plans
                </h2>
                <p className="text-sm text-slate-500 font-medium">Simplified insurance solutions tailored for every scale, from small shops to industrial complexes.</p>
              </div>
           </div>

           <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {plans.map((plan, i) => (
                <motion.div
                  key={i}
                  whileHover={{ y: -8 }}
                  className="bg-white rounded-[2.5rem] border border-slate-100 shadow-sm overflow-hidden flex flex-col group hover:border-[#2076C7] transition-all duration-500"
                >
                  <div className="p-8 pb-0">
                    <div className="flex justify-between items-start mb-6">
                       <div className={`w-14 h-14 rounded-2xl flex items-center justify-center ${plan.color}`}>
                          <plan.icon size={28} />
                       </div>
                       <span className="px-3 py-1 bg-emerald-100 text-emerald-700 text-[9px] font-black uppercase tracking-wider rounded-full">
                          {plan.badge}
                       </span>
                    </div>

                    <p className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-400 mb-1">{plan.type} Coverage</p>
                    <h4 className="text-xl font-black text-slate-800 mb-3 line-clamp-1">{plan.title}</h4>
                    <p className="text-xs text-slate-500 font-medium leading-relaxed mb-6 line-clamp-3">{plan.desc}</p>
                    
                    <div className="flex items-center gap-1.5 mb-8">
                       <p className="text-2xl font-black text-slate-800">{plan.price}</p>
                       <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mt-1">Starting Monthly</p>
                    </div>

                    <div className="border-t border-slate-50 pt-6 mb-8 space-y-3">
                       {plan.benefits.map((benefit, j) => (
                         <div key={j} className="flex items-center gap-2">
                            <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500 shrink-0" />
                            <span className="text-[11px] font-bold text-slate-600 line-clamp-1">{benefit}</span>
                         </div>
                       ))}
                    </div>
                  </div>

                  <div className="p-8 pt-0 mt-auto">
                    <button 
                      onClick={() => setShowForm(true)}
                      className="w-full py-4 bg-slate-50 group-hover:bg-[#2076C7] group-hover:text-white text-slate-800 font-black rounded-2xl text-[10px] uppercase tracking-widest transition-all shadow-sm flex items-center justify-center gap-2"
                    >
                      Apply Now
                      <ArrowRight className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </motion.div>
              ))}
           </div>
        </div>


    </div>
  );
}