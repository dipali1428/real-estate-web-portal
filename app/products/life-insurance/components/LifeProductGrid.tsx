"use client";

import React from "react";
import { motion } from "framer-motion";
import {
  ShieldCheck, Zap, Heart, Coins,
  GraduationCap, Anchor, Gem, ArrowRight,
  TrendingUp, Shield, Star, Users,
  Briefcase, UserPlus, Gift, Landmark
} from "lucide-react";

const products = [
  {
    title: "Retirement Plans",
    tag: "Pension for Life",
    desc: "Secure your golden years with guaranteed lifelong monthly income.",
    icon: Anchor,
    color: "#2076C7",
    isPopular: true
  },
  {
    title: "Term Insurance",
    tag: "Pure Protection",
    desc: "High life cover at the lowest premium. Foundation of security.",
    icon: ShieldCheck,
    color: "#1CADA3"
  },
  {
    title: "1 Crore Term Plan",
    tag: "High Value",
    desc: "Standard high-value coverage for your family's big dreams.",
    icon: Star,
    color: "#2076C7",
    isTrending: true
  },
  {
    title: "Zero Cost Term",
    tag: "TROP Benefit",
    desc: "Get 100% of your premiums back if you survive the term.",
    icon: Zap,
    color: "#1CADA3"
  },
  {
    title: "Whole Life Insurance",
    tag: "Cover till 100",
    desc: "Lifetime protection that leaves a massive legacy for children.",
    icon: Gem,
    color: "#2076C7"
  },
  {
    title: "Child Future Plans",
    tag: "Education Fund",
    desc: "Ensure your child's milestones are funded even in your absence.",
    icon: GraduationCap,
    color: "#1CADA3"
  },
  {
    title: "Money Back Plan",
    tag: "Liquidity Plus",
    desc: "Regular payouts every few years while your cover stays active.",
    icon: Landmark,
    color: "#2076C7"
  },
  {
    title: "Saral Jeevan Bima",
    tag: "Standard Plan",
    desc: "Simple and standardized term plan as per IRDAI guidelines.",
    icon: Shield,
    color: "#1CADA3"
  },
  {
    title: "Term Plan (Salaried)",
    tag: "Exclusive Rates",
    desc: "Special discounted rates and easy KYC for salaried professionals.",
    icon: Briefcase,
    color: "#2076C7"
  },
  {
    title: "Women Term Life",
    tag: "Special Benefits",
    desc: "Lower premium rates and wellness benefits exclusively for women.",
    icon: Heart,
    color: "#1CADA3"
  },
  {
    title: "Group Insurance",
    tag: "B2B Solutions",
    desc: "Life cover for your employees at highly competitive corporate rates.",
    icon: Users,
    color: "#2076C7"
  },
  {
    title: "Couple's Term Plan",
    tag: "Joint Cover",
    desc: "Single policy covering both husband and wife with joint benefits.",
    icon: UserPlus,
    color: "#1CADA3"
  },
  {
    title: "Limited Pay Plan",
    tag: "Short Duration",
    desc: "Pay for just 5-10 years and get life coverage for the full term.",
    icon: Gift,
    color: "#2076C7"
  }
];

const LifeProductGrid = () => {
  return (
    <section
      className="py-16 md:py-24 bg-neutral-50 relative overflow-hidden text-gray-700 font-sans"
      id="products"
    >
      <div className="container-custom relative z-10 px-6 md:px-10 mx-auto max-w-7xl">

        {/* Header */}
        <div className="flex flex-col md:flex-row items-center md:items-end justify-between gap-10 mb-16 text-center md:text-left">

          <div className="max-w-2xl mx-auto md:mx-0">
            <motion.span
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              className="text-[#1CADA3] font-black uppercase text-[10px] md:text-xs tracking-[0.4em] mb-4 block"
            >
              PRODUCT TYPES · MARKET UNIVERSE
            </motion.span>

            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              className="text-3xl md:text-4xl lg:text-5xl font-bold bg-gradient-to-r from-[#2076C7] to-[#1CADA3] bg-clip-text text-transparent mb-6"
            >
              Life Insurance Categories
            </motion.h2>

            <p className="text-gray-500 text-lg md:text-xl font-light max-w-xl mx-auto md:mx-0 leading-relaxed">
              Explore all types of life insurance — from pure protection to wealth
              creation, retirement, and child planning.
            </p>
          </div>

          {/* Right Badge */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            className="flex items-center gap-4 p-4 bg-white rounded-2xl border border-slate-100 shadow-sm mx-auto md:mx-0"
          >
            <div className="w-10 h-10 bg-slate-50 rounded-xl flex items-center justify-center text-[#1CADA3]">
              <ShieldCheck className="w-5 h-5" />
            </div>
            <div className="text-left">
              <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1">
                IRDAI APPROVED
              </p>
              <p className="text-xs font-bold text-slate-600">
                Standardized Market Terms
              </p>
            </div>
          </motion.div>

        </div>

        {/* Grid Container with Vertical Scrollbar */}
        <div className="max-h-[650px] overflow-y-auto pr-2 md:pr-4 custom-scrollbar">
          <div className="grid grid-cols-2 lg:grid-cols-4 xl:grid-cols-5 gap-4 md:gap-8 p-1">

            {products.map((product, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, scale: 0.95 }}
                whileInView={{ opacity: 1, scale: 1 }}
                whileHover={{ y: -6 }}
                transition={{ delay: idx * 0.04 }}
                className="group relative bg-white p-6 rounded-3xl border border-slate-100 shadow-sm hover:shadow-xl hover:border-[#2076C7]/20 transition-all flex flex-col items-center text-center"
              >
                {/* Badge */}
                {product.isPopular && (
                  <div className="absolute top-3 right-3 bg-[#2076C7] text-white text-[8px] font-black uppercase tracking-widest px-3 py-1 rounded-full shadow-md">
                    Popular
                  </div>
                )}
                {product.isTrending && (
                  <div className="absolute top-3 right-3 bg-[#1CADA3] text-white text-[8px] font-black uppercase tracking-widest px-3 py-1 rounded-full shadow-md">
                    Trending
                  </div>
                )}

                {/* Icon */}
                <div
                  className="w-14 h-14 rounded-2xl bg-slate-50 flex items-center justify-center mb-5 group-hover:bg-[#2076C7] transition-colors duration-500"
                  style={{ color: product.color }}
                >
                  <product.icon className="w-6 h-6 group-hover:text-white transition-colors duration-500" />
                </div>

                {/* Tag */}
                <span className="text-[9px] font-black text-[#1CADA3] uppercase tracking-widest mb-2">
                  {product.tag}
                </span>

                {/* Title */}
                <h3 className="font-sans text-[13px] md:text-base font-black text-[#2076C7] mb-3 leading-tight group-hover:text-[#1CADA3] transition-colors">
                  {product.title}
                </h3>

                {/* Description */}
                <p className="font-sans text-[10px] md:text-[11px] text-slate-500 font-medium leading-relaxed line-clamp-3">
                  {product.desc}
                </p>

                {/* Arrow */}
                <div className="mt-6 opacity-0 group-hover:opacity-100 transition-all">
                  <ArrowRight className="w-4 h-4 text-[#2076C7]" />
                </div>
              </motion.div>
            ))}

          </div>
        </div>
      </div>

      {/* Background Blurs */}
      <div className="absolute top-1/2 left-0 w-64 h-64 bg-[#1CADA3]/5 rounded-full blur-[100px] -translate-x-1/2" />
      <div className="absolute top-1/2 right-0 w-64 h-64 bg-[#2076C7]/5 rounded-full blur-[100px] translate-x-1/2" />
    </section>
  );
};

export default LifeProductGrid;
