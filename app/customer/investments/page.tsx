'use client';

import { motion } from 'framer-motion';
import { useRouter } from 'next/navigation';
import {
  ArrowRight,
  BarChart3,
  PieChart,
  BadgeIndianRupee,
  Receipt,
  Layers3,
  BriefcaseBusiness,
} from 'lucide-react';

export default function InvestmentsPage() {
  const router = useRouter();

  const investments = [
    { title: 'Unlisted Shares', desc: 'Access exclusive pre-IPO investment opportunities.', route: '/customer/investments/unlisted', icon: BarChart3 },
    { title: 'Mutual Funds', desc: 'Diversified funds tailored to your financial goals.', route: '/customer/investments/mutual-funds', icon: PieChart },
    { title: 'Fixed Deposit', desc: 'Secure returns with fixed investment tenure.', route: '/customer/investments/FD', icon: BadgeIndianRupee },
    { title: 'Bonds', desc: 'Stable income through debt instruments.', route: '/customer/investments/bonds', icon: Receipt },
    { title: 'AIF', desc: 'Alternative investments for advanced wealth creation.', route: '/customer/investments/aif', icon: Layers3 },
    { title: 'PMS', desc: 'Professionally managed personalized portfolios.', route: '/customer/investments/pms', icon: BriefcaseBusiness },
  ];

  return (
   <div className="flex-1 p-4 sm:p-5 md:p-6 bg-[#F8FAFC] min-h-screen font-sans">

  {/* Header */}
  <motion.div
    initial={{ opacity: 0, y: -10 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.4 }}
    className="mb-6 bg-linear-to-r from-[#2076C7] to-[#1CADA3] rounded-2xl p-6 text-white"
  >
    <h1 className="text-lg sm:text-xl md:text-2xl font-bold leading-snug">
      Smart Investment Opportunities for Long-Term Growth
    </h1>

    <p className="text-xs sm:text-sm md:text-base text-white/80 mt-2 leading-relaxed">
      Explore curated investment solutions designed to diversify and strengthen your wealth journey.
    </p>
  </motion.div>

  {/* Investment Cards */}
  <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-2 gap-5">

    {investments.map((item, index) => {
      const Icon = item.icon;

      return (
        <motion.div
          key={index}
          whileHover={{ y: -4, scale: 1.01 }}
          transition={{ duration: 0.25 }}
          onClick={() => router.push(item.route)}
          className="group relative bg-white rounded-2xl border border-gray-100 px-5 sm:px-6 py-5 flex items-center justify-between cursor-pointer shadow-sm hover:shadow-xl hover:border-[#D6E8FA] transition-all overflow-hidden"
        >
          {/* subtle hover background */}
          <div className="absolute inset-0 bg-linear-to-r from-[#2076C7]/0 to-[#1CADA3]/0 group-hover:from-[#2076C7]/5 group-hover:to-[#1CADA3]/5 transition-all duration-300 rounded-2xl" />

          {/* Left content */}
          <div className="relative flex items-center gap-4 min-w-0 flex-1">

            {/* Icon */}
            <div className="w-12 h-12 rounded-2xl bg-linear-to-br from-[#2076C7]/10 to-[#1CADA3]/10 border border-[#E6F0FA] flex items-center justify-center shrink-0">
              <Icon className="w-5 h-5 text-[#2076C7]" />
            </div>

            {/* Text */}
            <div className="min-w-0">
              <h3 className="text-base sm:text-lg font-semibold text-gray-800 tracking-tight">
                {item.title}
              </h3>

              <p className="text-sm text-gray-500 mt-1 leading-relaxed">
                {item.desc}
              </p>
            </div>
          </div>

          {/* CTA */}
          <div className="relative flex items-center gap-2 px-3 py-2 rounded-xl bg-[#F8FAFC] text-sm text-[#2076C7] font-medium ml-4 shrink-0 group-hover:bg-white group-hover:shadow-sm transition-all">
            View
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-all" />
          </div>
        </motion.div>
      );
    })}

  </div>
</div>
  );
}