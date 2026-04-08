'use client';

import React from 'react';
import { useRouter } from 'next/navigation';
import { motion } from 'framer-motion';
import {
  ShieldCheck,
  HeartPulse,
  Car,
  Plane,
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

      {/* Cards Wrapper */}
      <div className="relative bg-white rounded-3xl border border-slate-200/60 shadow-xl shadow-slate-200/40 overflow-hidden">

        {/* Background Decor */}
        <div className="absolute top-0 right-0 w-64 h-64 bg-linear-to-br from-[#2076C7]/5 to-[#1CADA3]/5 blur-3xl pointer-events-none" />

        {/* Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-5 lg:gap-6 p-4 sm:p-5 md:p-6">

          {insuranceProducts.map((item, index) => {
            const Icon = item.icon;

            return (
              <motion.div
                key={index}
                initial={false}
                whileHover={{
                  y: -6,
                  boxShadow: "0 16px 32px rgba(32,118,199,0.12)"
                }}
                onClick={() => router.push(item.route)}
                className="
                  group relative bg-white rounded-2xl
                  border border-slate-200 hover:border-[#2076C7]/40
                  p-4 sm:p-5 cursor-pointer transition-all duration-300
                  overflow-hidden min-h-[200px] sm:min-h-[220px]
                  flex flex-col justify-between
                "
              >

                {/* Top Accent */}
                <div className="absolute top-0 left-0 right-0 h-[3px] bg-linear-to-r from-[#2076C7] to-[#1CADA3]" />

                {/* Top */}
                <div>

                  {/* Icon */}
                  <div className="relative mb-4 sm:mb-5">
                    <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-[#2076C7] to-[#1CADA3] flex items-center justify-center shadow-md group-hover:scale-105 transition-all duration-300">
                      <Icon className="w-6 h-6 text-white" />
                    </div>
                  </div>

                  {/* Title */}
                  <h3 className="text-sm sm:text-base font-semibold text-slate-800 leading-snug group-hover:text-[#2076C7] transition-colors">
                    {item.title}
                  </h3>

                  {/* Desc */}
                  <p className="text-xs sm:text-sm text-slate-500 mt-2 leading-relaxed">
                    {item.desc}
                  </p>

                </div>

                {/* Bottom */}
                <div className="flex items-center justify-between mt-5 sm:mt-6">

                  <div>
                    <span className="text-[10px] uppercase tracking-wider text-slate-400 font-medium">
                      Active
                    </span>

                    <div className="text-xs font-medium text-[#1CADA3] mt-1">
                      Available
                    </div>
                  </div>

                  <div className="w-10 h-10 rounded-xl bg-[#F8FAFC] border border-slate-200 flex items-center justify-center group-hover:bg-[#2076C7] group-hover:border-[#2076C7] transition-all duration-300">
                    <ArrowRight className="w-4 h-4 text-slate-400 group-hover:text-white group-hover:translate-x-1 transition-all duration-300" />
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