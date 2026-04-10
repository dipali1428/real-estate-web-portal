"use client";

import React from "react";
import { motion } from "framer-motion";
import {
  Flame,
  Shield,
  Building,
  Store,
  Warehouse,
  FileCheck,
  Zap,
  Clock,
  ArrowRight,
  Plus,
  HelpCircle,
  AlertTriangle,
  Factory,
  Briefcase,
  Layers,
  ShieldCheck,
  Truck
} from "lucide-react";
import FireInsuranceHeader from "./components/FireInsuranceHeader";

const features = [
  { title: "Standard Fire & Special Perils", desc: "Includes coverage for lightning, floods, and riots.", icon: Zap },
  { title: "Hassle-Free Settlement", desc: "Priority fire claims with minimal documentation.", icon: Clock },
  { title: "Structural Integrity", desc: "Coverage for both building structure and furniture.", icon: Shield },
];

const plans = [
  {
    title: "Bharat Sookshma Udyam",
    type: "Business",
    desc: "Perfect for micro enterprises and retail shops with total assets up to ₹5 Crore.",
    icon: Store,
    price: "₹149/mo",
    color: "bg-blue-50 text-[#2076C7]",
    badge: "Most Popular",
    benefits: ["Zero Documentation", "All Risk Coverage", "Instant Certificate"]
  },
  {
    title: "Residential Property Guard",
    type: "Home",
    desc: "Complete structural and content protection for your home and personal belongings.",
    icon: Building,
    price: "₹39/mo",
    color: "bg-emerald-50 text-emerald-600",
    badge: "Best Value",
    benefits: ["Flood & Fire", "Theft Add-on", "24/7 Support"]
  },
  {
    title: "Industrial Laghu Udyam",
    type: "Enterprise",
    desc: "Comprehensive protection for medium factories and industrial units (₹5Cr - ₹50Cr).",
    icon: Factory,
    price: "Custom Quote",
    color: "bg-slate-50 text-slate-800",
    badge: "Full Protection",
    benefits: ["Machinery Cover", "Business Loss", "Risk Audit"]
  },
  {
    title: "Bharat Griha Raksha",
    type: "Residential",
    desc: "A comprehensive policy for homeowners covering both structure and extensive household contents.",
    icon: Building,
    price: "₹75/mo",
    color: "bg-purple-50 text-purple-600",
    badge: "Home Essential",
    benefits: ["Structure Cover", "Jewelry Protection", "Rent For Alternative Accom."]
  },
  {
    title: "Public Liability (Fire)",
    type: "Legal",
    desc: "Third-party liability coverage for incidents arising from fire originating at your premises.",
    icon: ShieldCheck,
    price: "₹99/mo",
    color: "bg-rose-50 text-rose-600",
    badge: "Compliance",
    benefits: ["Legal Defense Costs", "Third Party Damage", "Casualty Coverage"]
  },
  {
    title: "Warehouse & Stock Guard",
    type: "Inventory",
    desc: "Dedicated fire protection for stored inventory, raw materials, and finished goods in transit.",
    icon: Warehouse,
    price: "Custom Quote",
    color: "bg-amber-50 text-amber-600",
    badge: "Logistics",
    benefits: ["Stock Valuation", "Transit Fire Risk", "Burglary Add-on"]
  },
  {
    title: "Consequential Loss (Fire)",
    type: "Business",
    desc: "Covers the loss of business income/profits during the period your business is closed for repairs after a fire.",
    icon: Clock,
    price: "Custom Quote",
    color: "bg-indigo-50 text-indigo-600",
    badge: "Revenue Shield",
    benefits: ["Gross Profit Cover", "Standing Charges", "Increased Cost of Work"]
  },
  {
    title: "Office Assets Package",
    type: "Office",
    desc: "A combined policy covering fire, burglary, and electrical breakdown for modern office equipment.",
    icon: Briefcase,
    price: "₹299/mo",
    color: "bg-cyan-50 text-cyan-600",
    badge: "All-in-One",
    benefits: ["PC & Server Cover", "Sanitary Fittings", "Money in Transit"]
  },
  {
    title: "Terrorism Protection Add-on",
    type: "Security",
    desc: "Extended protection covering damage to property caused by acts of terrorism, which standard policies exclude.",
    icon: Shield,
    price: "+₹10/mo",
    color: "bg-red-50 text-red-600",
    badge: "Critical Add-on",
    benefits: ["Global Compliance", "Explosion Cover", "Peace of Mind"]
  }
];



export default function FireInsuranceDashboard() {
  return (
    <div className="space-y-12 pb-20">
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

        {/* ─── RECOMMENDATION SECTION ─── */}
        <div className="pt-8">
           <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-10">
              <div className="max-w-2xl">
                <h2 className="text-2xl md:text-3xl font-black bg-gradient-to-r from-[#2076C7] to-[#1CADA3] bg-clip-text text-transparent tracking-tight mb-3">
                  Recommended Protection Plans
                </h2>
                <p className="text-sm text-slate-500 font-medium">Simplified insurance solutions tailored for every scale, from small shops to industrial complexes.</p>
              </div>
              <button className="px-6 py-2.5 bg-slate-100 text-slate-600 font-bold rounded-xl text-xs hover:bg-slate-200 transition-all">
                Compare All Plans
              </button>
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
                    <p className="text-xs text-slate-500 font-medium leading-relaxed mb-6 line-clamp-2">{plan.desc}</p>
                    
                    <div className="flex items-center gap-1.5 mb-8">
                       <p className="text-2xl font-black text-slate-800">{plan.price}</p>
                       <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mt-1">Starting Monthly</p>
                    </div>

                    <div className="border-t border-slate-50 pt-6 mb-8 space-y-3">
                       {plan.benefits.map((benefit, j) => (
                         <div key={j} className="flex items-center gap-2">
                            <div className="w-1.5 h-1.5 rounded-full bg-[#2076C7] opacity-60" />
                            <span className="text-[11px] font-bold text-slate-600 line-clamp-1">{benefit}</span>
                         </div>
                       ))}
                    </div>
                  </div>

                  <div className="p-8 pt-0 mt-auto">
                    <button className="w-full py-4 bg-slate-50 group-hover:bg-[#2076C7] group-hover:text-white text-slate-800 font-black rounded-2xl text-[10px] uppercase tracking-widest transition-all shadow-sm">
                      Select Plan
                    </button>
                  </div>
                </motion.div>
              ))}
           </div>
        </div>


    </div>
  );
}
