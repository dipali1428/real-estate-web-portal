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
} from 'lucide-react';
import { motion } from 'framer-motion';

export default function LoansPage() {
  const router = useRouter();

  const loans = [
    {
      title: "Home Loan",
      route: "/customer/finance/home-loan",
      icon: Home,
      desc: "Affordable financing solutions for residential property purchase.",
    },
    {
      title: "Personal Loan",
      route: "/customer/finance/personal-loan",
      icon: Briefcase,
      desc: "Flexible funding for personal and urgent financial requirements.",
    },
    {
      title: "Business Loan",
      route: "/customer/finance/business-loan",
      icon: Building,
      desc: "Business expansion and working capital solutions.",
    },
    {
      title: "Mortgage Loan",
      route: "/customer/finance/mortgage-loan",
      icon: Landmark,
      desc: "Loan facilities backed by property assets.",
    },
    {
      title: "Education Loan",
      route: "/customer/finance/education-loan",
      icon: GraduationCap,
      desc: "Financial support for higher education and career goals.",
    },
    {
      title: "Vehicle Loan",
      route: "/customer/finance/vehicle-loan",
      icon: Car,
      desc: "Convenient vehicle financing for personal or commercial use.",
    },
    {
      title: "Credit Cards",
      route: "/customer/finance/credit-card",
      icon: CreditCard,
      desc: "Flexible credit access with reward benefits.",
    },
    {
      title: "SME Loan",
      route: "/customer/finance/sme",
      icon: CreditCard,
      desc: "Flexible credit access with reward benefits.",
    },
    {
      title: "Loan Against Securities",
      route: "/customer/finance/loan-against-securities",
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
        <h1 className="text-lg sm:text-xl md:text-2xl font-bold">
          Explore Smart Loan Solutions for Every Financial Need
        </h1>

        <p className="text-sm text-white/80 mt-2 leading-relaxed">
          Flexible financing options crafted to support your personal and business aspirations.
        </p>
      </motion.div>

      {/* Loan Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-5 md:gap-6">

        {loans.map((loan, index) => {
          const Icon = loan.icon;

          return (
            <motion.div
              key={index}
              initial={{ opacity: 0, scale: 0.96 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.3, delay: index * 0.04 }}
              whileHover={{ y: -5 }}
              whileTap={{ scale: 0.98 }}
              onClick={() => router.push(loan.route)}
              className="group cursor-pointer"
            >
              <div
                className="
                  h-full min-h-[180px] sm:min-h-[210px]
                  bg-white rounded-2xl border border-[#E6EEF7]
                  px-5 py-5
                  flex flex-col items-center text-center
                  shadow-sm hover:shadow-lg
                  transition-all duration-300
                "
              >

                {/* Icon */}
                <div className="relative mb-4">
                  <div className="absolute inset-0 bg-linear-to-r from-[#2076C7] to-[#1CADA3] blur-md opacity-15 rounded-full group-hover:opacity-25 transition-all" />

                  <div
                    className="
                      relative w-12 h-12 sm:w-14 sm:h-14 rounded-2xl
                      bg-linear-to-br from-[#2076C7] to-[#1CADA3]
                      flex items-center justify-center shadow-sm
                    "
                  >
                    <Icon className="w-5 h-5 sm:w-6 sm:h-6 text-white" />
                  </div>
                </div>

                {/* Title */}
                <h3 className="text-base font-semibold text-slate-800 group-hover:text-[#2076C7] transition-colors">
                  {loan.title}
                </h3>

                {/* Description */}
                <p className="text-sm text-slate-500 mt-3 leading-relaxed line-clamp-2 min-h-[40px]">
                  {loan.desc}
                </p>

                {/* Bottom Accent */}
                <div className="mt-5">
                  <div className="w-7 h-1 rounded-full bg-[#DCEAF8] group-hover:w-10 group-hover:bg-[#1CADA3] transition-all duration-300" />
                </div>

              </div>
            </motion.div>
          );
        })}

      </div>
    </div>
  );
}