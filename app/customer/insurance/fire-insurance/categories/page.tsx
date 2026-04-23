"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  ShieldCheck,
  Building2,
  Store,
  Factory,
  Briefcase,
  CheckCircle2,
  XCircle,
  HelpCircle,
  ArrowRight
} from "lucide-react";
import FireInsuranceHeader from "../components/FireInsuranceHeader";

const fireCategories = [
  {
    id: "sookshma",
    title: "Bharat Sookshma Udyam",
    icon: Store,
    shortDesc: "For small businesses with assets up to ₹5 Crore.",
    fullDesc: "Specially designed for micro and small enterprises, covering physical assets (buildings, equipment, stocks) against fire and allied perils. It provides simple and guaranteed protection with minimal underwriting.",
    inclusions: ["Fire & Lightning", "Explosion/Implosion", "Storm/Flood/Cyclone", "Impact Damage", "Riot/Strike/Malicious Damage"],
    exclusions: ["Nuclear Risk", "War & Invasion", "Wilful Neglect", "Consequential Loss (Unless add-on)"],
    badge: "SME Focused"
  },
  {
    id: "laghu",
    title: "Bharat Laghu Udyam",
    icon: Building2,
    iconColor: "text-blue-500",
    shortDesc: "For medium enterprises with assets ₹5Cr to ₹50Cr.",
    fullDesc: "Robust protection for medium industrial and commercial businesses. It offers wider limits and customized risk calculations for manufacturing units and large trading outlets.",
    inclusions: ["Physical Buildings", "Plant & Machinery", "Raw Materials", "Work-in-Progress", "Finished Goods"],
    exclusions: ["Pollution Damage", "Wear and Tear", "Mechanical Failure", "Theft without Force"],
    badge: "Mid-Market"
  },
  {
    id: "sfsp",
    title: "Standard Fire & Perils",
    icon: ShieldCheck,
    shortDesc: "Universal fire protection for homes and offices.",
    fullDesc: "The classic fire policy that provides fundamental building and content protection. Suitable for residential homes, cooperative societies, and individual offices.",
    inclusions: ["Structural Damage", "Interior Fixtures", "Furniture & Electronics", "Removal of Debris", "Professional Fees"],
    exclusions: ["Cash and Jewels", "Artwork/Collectibles (Unless specified)", "Settling/Cracking", "Vacant Policy (>30 days)"],
    badge: "Universal"
  },
  {
    id: "iar",
    title: "Industrial All Risk (IAR)",
    icon: Factory,
    shortDesc: "A complete safety net for large industries (> ₹50Cr).",
    fullDesc: "An all-hazard policy that covers not only fire but also machinery breakdown, electronic equipment, and business interruption in a single contract for large-scale operations.",
    inclusions: ["Fire and Perils", "Machinery Breakdown", "Electronic Equipment Insurance", "Loss of Profit", "Liability Add-ons"],
    exclusions: ["Inventory Shortage", "Defective Design", "Rust/Corrosion", "Government Action"],
    badge: "Industrial"
  },
  {
    id: "bi",
    title: "Business Interruption",
    icon: Briefcase,
    shortDesc: "Covers loss of revenue after a fire incident.",
    fullDesc: "Also known as Fire Loss of Profit (FLOP), this coverage compensates for the loss of income while your business operations are stopped or reduced due to fire damage.",
    inclusions: ["Lost Net Profit", "Fixed Standing Charges", "Increased Cost of Working", "Wages of Employees", "Auditor's Fees"],
    exclusions: ["Lack of Capital", "Uninsured Perils", "Trade Depression", "Fines and Penalties"],
    badge: "Recovery"
  }
];

export default function FireInsuranceCategories() {
  const [selected, setSelected] = useState(fireCategories[0]);

  return (
    <div className="flex-1 min-h-screen bg-[#FAFAFA] font-sans">
      <div className="max-w-[1440px] mx-auto px-6 py-6 leading-relaxed">
        
        {/* SHARED HEADER */}
        <FireInsuranceHeader />

        <div className="flex flex-col lg:flex-row gap-8">
          {/* LEFT: CATEGORY SELECTOR */}
          <div className="w-full lg:w-1/3 flex flex-col gap-4">
            <div className="mb-4">
              <h1 className="text-2xl md:text-3xl font-black bg-gradient-to-r from-[#2076C7] to-[#1CADA3] bg-clip-text text-transparent tracking-tight leading-tight">
                Insurance Portfolio
              </h1>
              <p className="text-sm text-slate-500 font-medium">Select a category to view detailed coverage matrix</p>
            </div>
            
            {fireCategories.map((cat) => (
              <motion.button
                key={cat.id}
                onClick={() => setSelected(cat)}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className={`
                  relative flex items-center gap-4 p-5 rounded-2xl border transition-all text-left group
                  ${selected.id === cat.id 
                    ? "bg-white border-[#2076C7] shadow-lg shadow-blue-100" 
                    : "bg-white/50 border-slate-100 hover:border-slate-200 hover:bg-white"}
                `}
              >
                <div className={`
                  w-12 h-12 rounded-xl flex items-center justify-center transition-colors
                  ${selected.id === cat.id ? "bg-[#2076C7] text-white" : "bg-slate-50 text-slate-400 group-hover:bg-blue-50 group-hover:text-[#2076C7]"}
                `}>
                  <cat.icon size={24} />
                </div>
                <div className="flex-1">
                  <h3 className={`text-sm font-black uppercase tracking-wider ${selected.id === cat.id ? "text-[#2076C7]" : "text-slate-600"}`}>
                    {cat.title}
                  </h3>
                  <p className="text-xs text-slate-400 font-medium truncate max-w-[180px]">{cat.shortDesc}</p>
                </div>
                <ArrowRight size={16} className={`${selected.id === cat.id ? "text-[#2076C7] opacity-100" : "opacity-0"}`} />
              </motion.button>
            ))}
          </div>

          {/* RIGHT: DETAILED VIEW */}
          <div className="w-full lg:w-2/3">
             <AnimatePresence mode="wait">
                <motion.div
                  key={selected.id}
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  transition={{ duration: 0.3 }}
                  className="bg-white rounded-[2.5rem] border border-slate-100 shadow-sm overflow-hidden"
                >
                   {/* COVER IMAGE / HEADER PLACEHOLDER */}
                   <div className="bg-gradient-to-br from-[#2076C7] to-[#1CADA3] p-10 text-white relative">
                      <div className="absolute top-0 right-0 w-64 h-64 bg-white/5 rounded-full -translate-y-1/2 translate-x-1/2 blur-2xl" />
                      <span className="px-3 py-1 bg-white/20 backdrop-blur-md rounded-full text-[10px] font-black uppercase tracking-widest border border-white/20 mb-4 inline-block">
                        {selected.badge}
                      </span>
                      <h2 className="text-3xl font-black mb-4">{selected.title} Solutions</h2>
                      <p className="text-white/80 max-w-xl font-medium leading-relaxed text-sm">
                        &quot;{selected.fullDesc}&quot;
                      </p>
                   </div>

                   {/* MAIN DETAILS */}
                   <div className="p-8 md:p-10">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
                         {/* INCLUSIONS */}
                         <div>
                            <div className="flex items-center gap-2 mb-6">
                               <CheckCircle2 size={20} className="text-emerald-500" />
                               <h3 className="text-sm font-black uppercase tracking-widest text-slate-800">What is Covered?</h3>
                            </div>
                            <ul className="flex flex-col gap-4">
                               {selected.inclusions.map((item, i) => (
                                 <li key={i} className="flex items-start gap-3 group">
                                    <div className="w-1.5 h-1.5 rounded-full bg-emerald-400 mt-1.5 group-hover:scale-150 transition-transform" />
                                    <span className="text-sm text-slate-600 font-medium leading-snug">{item}</span>
                                 </li>
                               ))}
                            </ul>
                         </div>

                         {/* EXCLUSIONS */}
                         <div>
                            <div className="flex items-center gap-2 mb-6">
                               <XCircle size={20} className="text-rose-500" />
                               <h3 className="text-sm font-black uppercase tracking-widest text-slate-800">What is Excluded?</h3>
                            </div>
                            <ul className="flex flex-col gap-4">
                               {selected.exclusions.map((item, i) => (
                                 <li key={i} className="flex items-start gap-3 group">
                                    <div className="w-1.5 h-1.5 rounded-full bg-rose-400 mt-1.5 group-hover:scale-150 transition-transform" />
                                    <span className="text-sm text-slate-600 font-medium leading-snug">{item}</span>
                                 </li>
                               ))}
                            </ul>
                         </div>
                      </div>

                      {/* CALL TO ACTION */}
                      <div className="mt-12 p-8 bg-slate-50 rounded-3xl border border-dashed border-slate-200 flex flex-col md:flex-row items-center justify-between gap-6">
                         <div className="flex items-center gap-5">
                            <div className="w-14 h-14 bg-white rounded-2xl flex items-center justify-center shadow-sm text-[#2076C7]">
                               <HelpCircle size={28} />
                            </div>
                            <div>
                               <p className="text-sm font-bold text-slate-800 leading-tight">Need a customized evaluation for {selected.title}?</p>
                               <p className="text-xs text-slate-500 mt-1">Talk to our safety experts for an on-site asset valuation.</p>
                            </div>
                         </div>
                         <button className="px-8 py-3 bg-[#2076C7] text-white font-black rounded-xl text-xs uppercase tracking-widest hover:bg-[#1CADA3] transition-all shadow-lg shadow-blue-100 whitespace-nowrap">
                            Contact Expert
                         </button>
                      </div>
                   </div>
                </motion.div>
             </AnimatePresence>
          </div>
        </div>

      </div>
    </div>
  );
}
