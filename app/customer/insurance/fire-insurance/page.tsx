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

const insuranceCategories = [
  {
    title: "Bharat Sookshma Udyam",
    desc: "Specially designed for micro enterprises and retail shops with assets up to ₹5 Crore.",
    icon: Store,
    price: "From ₹45/mo",
    badge: "Most Popular"
  },
  {
    title: "Residential Property SFSP",
    desc: "Complete safety for your home, structural assets, and personal belongings against fire & perils.",
    icon: Building,
    price: "From ₹25/mo",
    badge: "Budget Friendly"
  },
  {
    title: "Industrial Laghu Udyam",
    desc: "Robust protection for medium-sized factories and industrial units (₹5Cr - ₹50Cr).",
    icon: Factory,
    price: "Custom Quote",
    badge: "Enterprise"
  },
  {
    title: "Warehouse & Stock Guard",
    desc: "Dedicated inventory protection including logistics and raw material fire risk coverage.",
    icon: Warehouse,
    price: "Custom Quote",
    badge: "Business"
  },
  {
    title: "Business Interruption",
    desc: "Covers loss of profit and fixed costs while your business recovers from fire damage.",
    icon: Briefcase,
    price: "Add-on Only",
    badge: "Vital"
  },
  {
    title: "Combined Fire & Burglary",
    desc: "Single policy protecting assets against both sudden fire and theft/housebreaking incidents.",
    icon: ShieldCheck,
    price: "From ₹80/mo",
    badge: "Comprehensive"
  }
];

const features = [
  { title: "Standard Fire & Special Perils", desc: "Includes coverage for lightning, floods, and riots.", icon: Zap },
  { title: "Hassle-Free Settlement", desc: "Priority fire claims with minimal documentation.", icon: Clock },
  { title: "Structural Integrity", desc: "Coverage for both building structure and furniture.", icon: Shield },
];

export default function FireInsuranceDashboard() {
  return (
    <div className="flex-1 min-h-screen bg-[#FAFAFA] font-sans">
      <div className="max-w-[1440px] mx-auto px-6 py-6 leading-relaxed">
        
        {/* HEADER */}
        <FireInsuranceHeader />

        {/* ─── HERO BANNER ─── */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-gradient-to-r from-[#2076C7] to-[#1CADA3] rounded-[2rem] p-6 text-white overflow-hidden relative shadow-lg mb-8"
        >
          <div className="absolute top-0 right-0 w-64 h-64 bg-white/5 rounded-full -translate-y-1/2 translate-x-1/4 blur-2xl" />
          <div className="absolute bottom-0 left-20 w-32 h-32 bg-white/10 rounded-full translate-y-1/2 blur-xl" />

          <div className="relative z-10 flex flex-col lg:flex-row items-center justify-between gap-6">
            <div className="flex items-center gap-5 text-center lg:text-left">
              <div className="w-14 h-14 bg-white/20 rounded-2xl flex items-center justify-center backdrop-blur-md shadow-sm border border-white/10">
                <Flame size={24} className="text-white" />
              </div>
              <div>
                <p className="text-[10px] font-black uppercase tracking-[0.3em] text-white/70 mb-1">
                  Asset Protection
                </p>
                <h3 className="text-xl md:text-2xl font-black leading-tight">
                  Protecting your hardest earned assets from{" "}
                  <span className="underline decoration-white/30 underline-offset-4">
                    fire & risks
                  </span>
                </h3>
              </div>
            </div>

            <div className="hidden lg:flex items-center gap-3">
               <div className="bg-white/10 backdrop-blur-md border border-white/20 rounded-2xl px-5 py-3 shrink-0">
                  <p className="text-[9px] font-black text-white/60 uppercase tracking-[0.2em] mb-1">
                    Security Shield
                  </p>
                  <p className="text-sm font-black text-white">
                    Policy Issuance • Instant
                  </p>
               </div>
            </div>
          </div>
        </motion.div>

        {/* ─── ENHANCED INSURANCE CATEGORIES ─── */}
        <div className="mb-12">
          <div className="flex flex-col md:flex-row md:items-center justify-between mb-8 gap-4">
            <div>
              <h2 className="text-2xl md:text-3xl font-black bg-gradient-to-r from-[#2076C7] to-[#1CADA3] bg-clip-text text-transparent tracking-tight">
                Specialised Coverage Categories
              </h2>
              <p className="text-sm text-slate-500 font-medium">Select the right plan based on your asset type and scale.</p>
            </div>
            <button className="w-fit text-sm font-bold text-[#2076C7] flex items-center gap-1 hover:underline p-2.5 bg-blue-50 rounded-xl transition-all">
              View Detailed Matrix <ArrowRight size={16} />
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {insuranceCategories.map((item, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                whileHover={{ y: -5, borderColor: "#2076C7" }}
                className="group bg-white p-2 rounded-[2rem] border border-slate-100 shadow-sm hover:shadow-xl hover:shadow-slate-200/50 transition-all duration-500 cursor-pointer overflow-hidden"
              >
                <div className="p-6">
                    <div className="flex justify-between items-start mb-6">
                      <div className="w-14 h-14 bg-slate-50 rounded-2xl flex items-center justify-center text-[#2076C7] group-hover:scale-110 group-hover:bg-gradient-to-br group-hover:from-[#2076C7] group-hover:to-[#1CADA3] group-hover:text-white transition-all duration-500">
                        <item.icon size={28} />
                      </div>
                      <span className="px-3 py-1 bg-emerald-50 text-emerald-600 text-[10px] font-black uppercase tracking-wider rounded-full border border-emerald-100">
                        {item.badge}
                      </span>
                    </div>

                    <h3 className="text-xl font-bold text-slate-800 mb-3 group-hover:text-[#2076C7] transition-colors">{item.title}</h3>
                    <p className="text-sm text-slate-500 leading-relaxed mb-6 min-h-[40px]">
                      {item.desc}
                    </p>

                    <div className="flex items-center justify-between pt-6 border-t border-slate-50">
                      <div>
                        <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-0.5">Coverage Type</p>
                        <p className="text-lg font-black text-slate-800">{item.price}</p>
                      </div>
                      <div className="w-10 h-10 bg-slate-50 rounded-full flex items-center justify-center text-slate-400 group-hover:bg-[#2076C7] group-hover:text-white transition-all">
                        <Plus size={20} />
                      </div>
                    </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>

      </div>
    </div>
  );
}
