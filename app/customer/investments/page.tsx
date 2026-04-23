'use client';

import { motion } from 'framer-motion';
import { useRouter } from 'next/navigation';
import {
  ArrowRight,
  BarChart3,
  PieChart,
  BadgeIndianRupee,
  Box,
  Layers3,
  BriefcaseBusiness,
  Landmark,
  Home,
  PiggyBank
} from 'lucide-react';

export default function InvestmentsPage() {
  const router = useRouter();

  const investments = [
    { title: 'Unlisted Shares', desc: 'Access exclusive pre-IPO investment opportunities.', route: '/customer/investments/unlisted', icon: BarChart3 },
    { title: 'Mutual Funds', desc: 'Diversified funds tailored to your financial goals.', route: '/customer/investments/mutual-funds', icon: PieChart },
    { title: 'Fixed Deposit', desc: 'Secure returns with fixed investment tenure.', route: '/customer/investments/FD', icon: BadgeIndianRupee },
    { title: 'Bonds', desc: 'Stable income through debt instruments.', route: '/customer/investments/bonds', icon: Box },
    { title: 'AIF', desc: 'Alternative investments for advanced wealth creation.', route: '/customer/investments/aif', icon: Layers3 },
    { title: 'PMS', desc: 'Professionally managed personalized portfolios.', route: '/customer/investments/pms', icon: BriefcaseBusiness },
    { title: 'Real Estate', desc: 'Invest in residential and commercial property opportunities.', route: '/customer/investments/real-estate', icon: Home },
    { title: 'NCD', desc: 'Fixed-income debentures with stable returns and maturity benefits.', route: '/customer/investments/ncd', icon: Landmark },
    { title: 'NPS', desc: 'Long-term retirement savings with tax benefits and market-linked growth.', route: '/customer/investments/nps', icon: PiggyBank },
  ];

  return (
    <div className="flex-1 p-4 sm:p-5 md:p-6 bg-[#F8FAFC] min-h-screen font-sans">

      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
        className="mb-6 sm:mb-8 bg-gradient-to-r from-[#2076C7] to-[#1CADA3] rounded-2xl p-5 sm:p-6 text-white"
      >
        <h1 className="text-lg sm:text-xl md:text-2xl font-bold">
          Smart Investment Opportunities for Long-Term Growth
        </h1>

        <p className="text-sm sm:text-base text-white/80 mt-2 leading-relaxed">
          Explore curated investment solutions designed to diversify and strengthen your wealth journey.
        </p>
      </motion.div>

      {/* Cards Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-5 md:gap-6 p-1">

        {investments.map((item) => {
          const Icon = item.icon;

          return (
            <motion.div
              key={item.title}
              whileHover={{ y: -4 }}
              transition={{ duration: 0.2 }}
              onClick={() => router.push(item.route)}
              className="
                group relative bg-white rounded-2xl 
                border border-slate-200 
                px-5 py-5
                cursor-pointer
                shadow-sm hover:shadow-lg hover:border-[#2076C7]/40
                min-h-[180px] w-full
                flex flex-col justify-between
                overflow-hidden
              "
            >

              {/* Left Gradient Border */}
              <div className="absolute left-0 top-0 bottom-0 w-[4px] bg-gradient-to-b from-[#2076C7] to-[#1CADA3]" />

              {/* Content */}
              <div className="ml-1">

                <div className="flex items-center gap-3 mb-3">

                  {/* Premium Icon */}
                  <div className="w-12 h-12 sm:w-14 sm:h-14 rounded-2xl bg-gradient-to-br from-[#2076C7] to-[#1CADA3] flex items-center justify-center shadow-md group-hover:scale-105 transition-all duration-300">
                    <Icon className="w-5 h-5 sm:w-6 sm:h-6 text-white" />
                  </div>

                  <h3 className="text-base font-semibold text-slate-800 group-hover:text-[#2076C7] transition">
                    {item.title}
                  </h3>

                </div>

                {/* Info */}
                <div className="flex items-center justify-between text-sm text-slate-500">
                  <div>
                    <p className="text-[11px] uppercase text-slate-400">Type</p>
                    <p className="font-medium text-slate-700">Equity</p>
                  </div>

                  {/* <div>
                    <p className="text-[11px] uppercase text-slate-400">Returns</p>
                    <p className="font-semibold text-[#1CADA3]">+12.4%</p>
                  </div> */}
                </div>

                {/* Description */}
                <p className="text-sm text-slate-500 mt-3 line-clamp-2 min-h-[40px]">
                  {item.desc}
                </p>

              </div>

              {/* Bottom */}
              <div className="flex items-center justify-between mt-4 ml-1">

                <div className="flex items-center gap-1 text-xs text-slate-400">
                  <span className="w-2 h-2 rounded-full bg-green-500" />
                  Active
                </div>

                <div className="flex items-center gap-1 text-sm font-medium text-slate-400 group-hover:text-[#2076C7]">
                  View Details
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition" />
                </div>

              </div>

            </motion.div>
          );
        })}

      </div>
    </div>
  );
}