'use client';

import React from 'react';
import { useRouter } from 'next/navigation';
import { motion } from 'framer-motion';
import {
  ShieldCheck,
  HeartPulse,
  Car,
  Plane,
  Home,
  Briefcase,
  FileText,
  ArrowRight,
  Flame,
  Fish,
  Landmark,
  Building2,
  Dog
} from 'lucide-react';

const insuranceProducts = [
  {
    title: 'Life Insurance',
    desc: 'Long-term financial protection for your family and future goals.',
    icon: ShieldCheck,
    route: '/customer/insurance/life-insurance',
  },
  {
    title: 'Health Insurance',
    desc: 'Medical coverage for hospitalization and healthcare expenses.',
    icon: HeartPulse,
    route: '/customer/insurance/health-insurance',
  },
  {
    title: 'Motor Insurance',
    desc: 'Secure your vehicle against accidents and damage.',
    icon: Car,
    route: '/customer/insurance/motor-insurance',
  },
  {
    title: 'Travel Insurance',
    desc: 'Stay protected during domestic and international travel.',
    icon: Plane,
    route: '/customer/insurance/travel-insurance',
  },
  {
    title: 'Fire Insurance',
    desc: 'Protect assets against fire-related damage and risks.',
    icon: Flame,
    route: '/customer/insurance/fire-insurance',
  },
  {
    title: 'Cattle Insurance',
    desc: 'Financial protection for livestock and cattle assets.',
    icon: Fish,
    route: '/customer/insurance/cattle-insurance',
  },
  {
    title: 'Marine Insurance',
    desc: 'Coverage for cargo, ships, and marine transport risks.',
    icon: Landmark,
    route: '/customer/insurance/marine-insurance',
  },
  {
    title: 'Corporate Insurance',
    desc: 'Business protection solutions for companies and teams.',
    icon: Building2,
    route: '/customer/insurance/corporate-insurance',
  },
  {
    title: 'Loan Protector',
    desc: 'Insurance support linked to active loan liabilities.',
    icon: FileText,
    route: '/customer/insurance/loan-protector',
  },
  {
    title: 'Pet Insurance',
    desc: 'Healthcare and protection plans for pets.',
    icon: Dog,
    route: '/customer/insurance/pet-insurance',
  },
];

export default function InsurancePage() {
  const router = useRouter();

  return (
<div className="flex-1 p-4 sm:p-5 md:p-6 bg-[#F8FAFC] min-h-screen font-sans">

  {/* Header */}
  <motion.div
    initial={{ opacity: 0, y: -10 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.4 }}
    className="mb-5 sm:mb-6 bg-linear-to-r from-[#2076C7] to-[#1CADA3] rounded-2xl p-5 sm:p-6 text-white"
  >
    <h1 className="text-lg sm:text-xl md:text-2xl font-bold leading-snug">
      Secure Every Stage of Life with Smart Insurance Solutions
    </h1>

    <p className="text-xs sm:text-sm md:text-base text-white/80 mt-2 leading-relaxed">
      Explore trusted protection plans designed for health, wealth, travel, and business security.
    </p>
  </motion.div>

  {/* Insurance Cards */}
  <div className="relative bg-white rounded-3xl border border-slate-200/60 shadow-xl shadow-slate-200/40 overflow-hidden">

    {/* Subtle Background Glassmorphism Decor */}
    <div className="absolute top-0 right-0 w-64 h-64 bg-linear-to-br from-[#2076C7]/5 to-[#1CADA3]/5 blur-3xl pointer-events-none" />

    <div className="flex flex-col">
      {insuranceProducts.map((item, index) => {
        const Icon = item.icon;
        const isLast = index === insuranceProducts.length - 1;

        return (
          <motion.div
            key={index}
            initial={false}
            whileHover={{ backgroundColor: "rgba(248, 250, 252, 0.8)" }}
            onClick={() => router.push(item.route)}
            className={`
              group relative flex flex-col sm:flex-row items-center gap-4 md:gap-6 
              px-6 py-6 sm:py-5 cursor-pointer transition-all duration-300
              ${!isLast ? 'border-b border-slate-100/80' : ''}
            `}
          >
            {/* Left Selection Indicator */}
            <div className="absolute left-0 top-0 bottom-0 w-1 bg-linear-to-b from-[#2076C7] to-[#1CADA3] opacity-0 group-hover:opacity-100 transition-all duration-300" />

            {/* Professional Icon Treatment */}
            <div className="relative shrink-0">
              <div className="w-14 h-14 rounded-2xl bg-slate-50 flex items-center justify-center border border-slate-100 group-hover:scale-110 group-hover:rotate-3 transition-all duration-500 shadow-sm">
                <Icon className="w-6 h-6 text-[#2076C7]" />
              </div>

              {/* Number hidden only on mobile */}
              <span className="hidden sm:block absolute -top-2 -left-2 text-[10px] font-mono font-bold text-slate-300 group-hover:text-[#2076C7] transition-colors">
                0{index + 1}
              </span>
            </div>

            {/* Main Content Block */}
            <div className="flex-1 min-w-0 text-center sm:text-left">
              <div className="flex items-center justify-center sm:justify-start gap-2 mb-1">
                <h3 className="text-base md:text-lg font-bold text-slate-800 tracking-tight">
                  {item.title}
                </h3>
                <div className="hidden md:block h-px w-0 group-hover:w-8 bg-[#1CADA3]/40 transition-all duration-500" />
              </div>

              <p className="text-sm text-slate-500 font-normal leading-relaxed max-w-xl">
                {item.desc}
              </p>
            </div>

            {/* Interactive Metadata / Status Zone */}
            <div className="flex items-center gap-6 shrink-0">
              <div className="hidden lg:flex flex-col items-end">
                <span className="text-[10px] uppercase tracking-widest text-slate-400 font-bold mb-1">
                  Status
                </span>
                <span className="flex items-center gap-1.5 text-xs font-semibold text-[#1CADA3]">
                  <div className="w-1.5 h-1.5 rounded-full bg-[#1CADA3] animate-pulse" />
                  Available
                </span>
              </div>

              {/* CTA Button */}
              <div className="flex items-center justify-center w-10 h-10 rounded-full border border-slate-200 group-hover:border-[#2076C7] group-hover:bg-[#2076C7] transition-all duration-300">
                <ArrowRight className="w-4 h-4 text-slate-400 group-hover:text-white group-hover:translate-x-1 transition-all" />
              </div>
            </div>
          </motion.div>
        );
      })}
    </div>
  </div>
</div>
  );
}