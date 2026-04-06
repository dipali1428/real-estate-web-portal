'use client';

import { useRouter } from 'next/navigation';
import {
  Home,
  Briefcase,
  Building,
  GraduationCap,
  Car,
  CreditCard,
  Landmark,
  ArrowRight,
} from 'lucide-react';
import { motion } from 'framer-motion';

export default function LoansPage() {
  const router = useRouter();

  const loans = [
    {
      title: "Home Loan",
      route: "/customer/finance/loans/home-loan",
      icon: Home,
      desc: "Affordable financing solutions for residential property purchase.",
    },
    {
      title: "Personal Loan",
      route: "/customer/finance/loans/personal-loan",
      icon: Briefcase,
      desc: "Flexible funding for personal and urgent financial requirements.",
    },
    {
      title: "Business Loan",
      route: "/customer/finance/loans/business-loan",
      icon: Building,
      desc: "Business expansion and working capital solutions.",
    },
    {
      title: "Mortgage Loan",
      route: "/customer/finance/loans/mortgage-loan",
      icon: Landmark,
      desc: "Loan facilities backed by property assets.",
    },
    {
      title: "Education Loan",
      route: "/customer/finance/loans/education-loan",
      icon: GraduationCap,
      desc: "Financial support for higher education and career goals.",
    },
    {
      title: "Vehicle Loan",
      route: "/customer/finance/loans/vehicle-loan",
      icon: Car,
      desc: "Convenient vehicle financing for personal or commercial use.",
    },
    {
      title: "Loan Protector",
      route: "/customer/finance/loans/loan-protector",
      icon: Car,
      desc: "Convenient vehicle financing for personal or commercial use.",
    },
    {
      title: "Credit Cards",
      route: "/customer/finance/loans/credit-card",
      icon: CreditCard,
      desc: "Flexible credit access with reward benefits.",
    },
  ];

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
  Explore Smart Loan Solutions for Every Financial Need
</h1>

    <p className="text-xs sm:text-sm md:text-base text-white/80 mt-2 leading-relaxed">
  Flexible financing options crafted to support your personal and business aspirations.
</p>
  </motion.div>

  {/* Loan Cards */}
  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-5">

    {loans.map((loan, index) => {
      const Icon = loan.icon;

      return (
        <motion.div
          key={index}
          whileHover={{ y: -4, scale: 1.01 }}
          transition={{ duration: 0.25 }}
          onClick={() => router.push(loan.route)}
          className="group relative bg-white rounded-2xl border border-gray-100 px-4 sm:px-5 md:px-6 py-4 sm:py-5 flex items-center justify-between gap-3 cursor-pointer shadow-sm hover:shadow-xl hover:border-[#D6E8FA] transition-all overflow-hidden"
        >
          {/* Hover Gradient */}
          <div className="absolute inset-0 bg-linear-to-r from-[#2076C7]/0 to-[#1CADA3]/0 group-hover:from-[#2076C7]/5 group-hover:to-[#1CADA3]/5 transition-all duration-300 rounded-2xl" />

          {/* Left Section */}
          <div className="relative flex items-center gap-3 sm:gap-4 min-w-0 flex-1">

            {/* Icon */}
            <div className="w-10 h-10 sm:w-11 sm:h-11 md:w-12 md:h-12 rounded-2xl bg-linear-to-br from-[#2076C7]/10 to-[#1CADA3]/10 flex items-center justify-center shrink-0 border border-[#E6F0FA]">
              <Icon className="w-4 h-4 sm:w-5 sm:h-5 text-[#2076C7]" />
            </div>

            {/* Text */}
            <div className="min-w-0 flex-1">
              <h3 className="text-sm sm:text-base md:text-lg font-semibold text-gray-800 tracking-tight truncate">
                {loan.title}
              </h3>

              <p className="text-xs sm:text-sm text-gray-500 mt-1 leading-relaxed line-clamp-2 sm:line-clamp-none">
                {loan.desc}
              </p>
            </div>
          </div>

          {/* CTA */}
          <div className="relative flex items-center gap-1 sm:gap-2 px-2 sm:px-3 py-2 rounded-xl bg-[#F8FAFC] text-xs sm:text-sm text-[#2076C7] font-medium shrink-0 group-hover:bg-white group-hover:shadow-sm transition-all">
            <span className="hidden xs:inline">View</span>
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-all" />
          </div>
        </motion.div>
      );
    })}

  </div>
</div>
  );
}