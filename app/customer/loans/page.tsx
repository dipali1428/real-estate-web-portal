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
      route: "/customer/loans/home-loan",
      icon: Home,
      desc: "Affordable financing solutions for residential property purchase.",
    },
    {
      title: "Personal Loan",
      route: "/customer/loans/personal-loan",
      icon: Briefcase,
      desc: "Flexible funding for personal and urgent financial requirements.",
    },
    {
      title: "Business Loan",
      route: "/customer/loans/business-loan",
      icon: Building,
      desc: "Business expansion and working capital solutions.",
    },
    {
      title: "Mortgage Loan",
      route: "/customer/loans/mortgage-loan",
      icon: Landmark,
      desc: "Loan facilities backed by property assets.",
    },
    {
      title: "Education Loan",
      route: "/customer/loans/education-loan",
      icon: GraduationCap,
      desc: "Financial support for higher education and career goals.",
    },
    {
      title: "Vehicle Loan",
      route: "/customer/loans/vehicle-loan",
      icon: Car,
      desc: "Convenient vehicle financing for personal or commercial use.",
    },
    {
      title: "Credit Cards",
      route: "/customer/loans/credit-card",
      icon: CreditCard,
      desc: "Flexible credit access with reward benefits.",
    },
  ];

  return (
    <div className="min-h-screen bg-[#F8FAFC] p-4 sm:p-6">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-2xl sm:text-3xl font-semibold text-gray-800">
          Loan Products
        </h1>
        <p className="text-gray-500 mt-1 text-sm sm:text-base">
          Structured financing solutions designed for different financial needs.
        </p>
      </div>

     {/* Structured Professional Layout */}
<div className="grid grid-cols-1 lg:grid-cols-2 gap-4">

  {loans.map((loan, index) => {
    const Icon = loan.icon;

    return (
      <motion.div
        key={index}
        whileHover={{ y: -2 }}
        transition={{ duration: 0.2 }}
        onClick={() => router.push(loan.route)}
        className="group bg-white rounded-2xl border border-gray-200 px-5 sm:px-6 py-5 flex items-center justify-between hover:shadow-md transition-all cursor-pointer"
      >
        {/* Left Section */}
        <div className="flex items-center gap-4 sm:gap-5 min-w-0">

          {/* Icon */}
          <div className="w-11 h-11 sm:w-12 sm:h-12 rounded-xl bg-[#F1F5F9] flex items-center justify-center shrink-0">
            <Icon className="w-5 h-5 text-[#2076C7]" />
          </div>

          {/* Text */}
          <div className="min-w-0">
            <h3 className="text-base font-semibold text-gray-800">
              {loan.title}
            </h3>

            <p className="text-sm text-gray-500 mt-1 leading-relaxed">
              {loan.desc}
            </p>
          </div>
        </div>

        {/* Right CTA */}
        <div className="flex items-center gap-2 text-sm text-[#2076C7] font-medium ml-4 shrink-0 group-hover:translate-x-1 transition-all">
          View
          <ArrowRight className="w-4 h-4" />
        </div>
      </motion.div>
    );
  })}

</div>
    </div>
  );
}