"use client";

import React from "react";
import { motion } from "framer-motion";
import {
  Home, Building2, Factory, Store,
  ShieldCheck, Zap, ArrowRight,
  TrendingUp, Shield, Users, HardHat
} from "lucide-react";

const products = [
  {
    title: "Bharat Griha Raksha",
    tag: "Home Protection",
    desc: "Essential fire insurance for residential buildings and their contents.",
    icon: Home,
    color: "#2076C7",
    isPopular: true
  },
  {
    title: "Bharat Laghu Udyam",
    tag: "SME Protection",
    desc: "Designed for small and medium enterprises with assets between ₹5Cr to ₹50Cr.",
    icon: Building2,
    color: "#1CADA3",
    isTrending: true
  },
  {
    title: "Bharat Sookshma Udyam",
    tag: "Micro Enterprise",
    desc: "Specialized cover for micro-units with total asset value up to ₹5 Crores.",
    icon: Store,
    color: "#2076C7"
  },
  {
    title: "Standard Fire Policy",
    tag: "SFSP Cover",
    desc: "Comprehensive protection against fire and 11 other special perils like lightning and storm.",
    icon: ShieldCheck,
    color: "#1CADA3"
  },
  {
    title: "Industrial All Risk",
    tag: "Large Industrial",
    desc: "All-in-one policy for large industries with sum insured above ₹100 Crores.",
    icon: Factory,
    color: "#2076C7"
  },
  {
    title: "Business Interruption",
    tag: "Consequential Loss",
    desc: "Covers loss of profits arising due to business being shut down after a fire.",
    icon: TrendingUp,
    color: "#1CADA3"
  },
  {
    title: "Machinery Breakdown",
    tag: "Add-on Support",
    desc: "Optional cover for sudden and unforeseen electrical or mechanical breakdown.",
    icon: HardHat,
    color: "#2076C7"
  },
  {
    title: "STFI Cover",
    tag: "Natural Perils",
    desc: "Protects against Storm, Tempest, Flood, and Inundation damages.",
    icon: Zap,
    color: "#1CADA3"
  },
  {
    title: "Terrorism Cover",
    tag: "Political Peril",
    desc: "Vital add-on protecting your assets from malicious damage and terrorist acts.",
    icon: Shield,
    color: "#2076C7"
  },
  {
    title: "Public Liability",
    tag: "Third-Party",
    desc: "Covers liability arising from fire spreading from your property to others.",
    icon: Users,
    color: "#1CADA3"
  }
];

const FireProductGrid = () => {
  return (
    <section
      className="py-10 md:py-16 bg-neutral-50 font-sans relative overflow-hidden text-gray-700 flex justify-center"
      id="products"
    >
      <div className="w-full max-w-7xl mx-auto px-6 md:px-8 lg:px-10 relative z-10">

        {/* Header */}
        <div className="flex flex-col items-center md:items-start text-center md:text-left mb-14">
          <div className="max-w-2xl">

            <motion.span
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              className="text-[#1CADA3] font-bold uppercase text-[10px] md:text-xs tracking-[0.4em] mb-4 block"
            >
              MARKET PRODUCTS · IRDAI STANDARDIZED
            </motion.span>

            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              className="text-3xl sm:text-4xl md:text-5xl font-bold bg-gradient-to-r from-[#2076C7] to-[#1CADA3] bg-clip-text text-transparent mb-4 uppercase tracking-tight"
            >
              Fire Insurance Products
            </motion.h2>

            <p className="text-gray-600 text-base md:text-lg font-medium max-w-xl mx-auto md:mx-0">
              Standardized and custom-built fire insurance plans for SMEs,
              large industries, and residential properties.
            </p>

          </div>
        </div>

        {/* Products Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-5 md:gap-8 place-items-center">

          {products.map((product, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              whileHover={{ y: -6 }}
              transition={{ delay: idx * 0.04 }}
              className="w-full max-w-[220px] group bg-white p-5 md:p-6 rounded-2xl md:rounded-[2.5rem] border border-slate-100 shadow-sm hover:shadow-xl hover:border-[#2076C7]/20 transition-all cursor-pointer relative flex flex-col items-center text-center overflow-hidden"
            >

              {/* Badge */}
              {(product.isPopular || product.isTrending) && (
                <div className="absolute top-0 right-0">
                  <div
                    className={`${product.isPopular
                      ? "bg-[#2076C7]"
                      : "bg-[#1CADA3]"
                      } text-white text-[8px] font-black uppercase tracking-widest px-3 py-1 rounded-bl-xl shadow-lg`}
                  >
                    {product.isPopular ? "Popular" : "Trending"}
                  </div>
                </div>
              )}

              {/* Icon */}
              <div
                className="w-12 h-12 rounded-2xl bg-slate-50 flex items-center justify-center mb-5 group-hover:bg-[#2076C7] transition-colors duration-500"
                style={{ color: product.color }}
              >
                <product.icon
                  size={22}
                  className="group-hover:text-white transition-colors duration-500"
                />
              </div>

              <span className="text-[9px] font-bold text-[#1CADA3] uppercase tracking-widest mb-1">
                {product.tag}
              </span>

              <h3 className="text-sm font-bold text-[#2076C7] mb-2 leading-tight">
                {product.title}
              </h3>

              <p className="text-[11px] text-slate-400 font-bold leading-relaxed line-clamp-2">
                {product.desc}
              </p>

              <motion.div
                initial={{ opacity: 0, x: -10 }}
                whileHover={{ opacity: 1, x: 0 }}
                className="absolute bottom-4 right-4 text-[#2076C7]"
              >
                <ArrowRight className="w-4 h-4" />
              </motion.div>

            </motion.div>
          ))}
        </div>

      </div>

      {/* Background Blurs */}
      <div className="absolute top-1/2 left-0 w-64 h-64 bg-[#1CADA3]/5 rounded-full blur-[100px] -translate-x-1/2 pointer-events-none" />
      <div className="absolute top-1/2 right-0 w-64 h-64 bg-[#2076C7]/5 rounded-full blur-[100px] translate-x-1/2 pointer-events-none" />
    </section>
  );
};

export default FireProductGrid;
