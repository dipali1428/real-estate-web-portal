'use client';
import React from 'react';
import { motion } from 'framer-motion';

const GroupOfCompaniesPage = () => {
  return (
  <motion.div
  initial={{ opacity: 0, y: 35 }}
  animate={{ opacity: 1, y: 0 }}
  transition={{ duration: 0.8, ease: 'easeOut' }}
  className="w-full bg-white font-sans"
>
  <div className="max-w-7xl mx-auto px-4 py-16 md:py-24">

    {/* Section Header */}
    <motion.div
      initial={{ opacity: 0, y: 25 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.2, duration: 0.7 }}
      className="text-center mb-14"
    >
      <div className="inline-block mb-3">
        <span className="text-sm font-semibold tracking-wider text-[#2076C7] uppercase bg-[#2076C7]/5 px-4 py-1.5 rounded-full">
          Corporate Identity
        </span>
      </div>

      <h2 className="text-4xl md:text-4xl font-bold tracking-tight mb-4 bg-gradient-to-r from-[#2076C7] to-[#1CADA3] bg-clip-text text-transparent">
        Group of Companies
      </h2>
 <div className="w-20 sm:w-24 h-1 mx-auto bg-gradient-to-r from-[#2076C7] to-[#1CADA3] rounded-full mb-6"></div>
       <p className="text-gray-500 max-w-xl mx-auto text-lg">
        Official registrations and corporate details of the Infinity Arthvishva group.
      </p>
    </motion.div>

    {/* All Cards in One Row */}
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">

      {/* Group Card */}
      <div className="border border-gray-100 rounded-xl p-5 bg-white shadow-md hover:shadow-xl hover:border-[#1CADA3]/30 transition-all duration-500 min-h-[240px] group relative overflow-hidden">
        <div className="font-bold text-base bg-gradient-to-r from-[#2076C7] to-[#1CADA3] bg-clip-text text-transparent mb-3">
          GROUP OF COMPANY
        </div>

        <h4 className="text-gray-800 font-medium mb-4 leading-snug text-sm">
          Infinity Arthvishva Group Private Limited
        </h4>

        <div className="space-y-2 text-sm">
          <div>
            <span className="text-gray-500">CIN:</span>{" "}
            <span className="font-semibold text-black break-all">
              U70200PN2026PTC252411
            </span>
          </div>

          <div>
            <span className="text-gray-500">GST:</span>{" "}
            <span className="font-semibold text-black">
              Under Process
            </span>
          </div>
        </div>

        <div className="absolute inset-x-0 bottom-0 h-[2px] bg-gradient-to-r from-[#2076C7] to-[#1CADA3] scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left" />
      </div>

      {/* Advisory */}
      <div className="border border-gray-100 rounded-xl p-5 bg-white shadow-md hover:shadow-xl hover:border-[#1CADA3]/30 transition-all duration-500 min-h-[240px] group relative overflow-hidden">
        <div className="font-bold text-base bg-gradient-to-r from-[#2076C7] to-[#1CADA3] bg-clip-text text-transparent mb-3">
          ADVISORY
        </div>

        <h4 className="text-gray-800 font-medium mb-4 leading-snug text-sm">
          Infinity Arthvishva Advisory Private Limited
        </h4>

        <div className="space-y-2 text-sm">
          <div>
            <span className="text-gray-500">CIN:</span>{" "}
            <span className="font-semibold text-black break-all">
              U66190PN2025PTC238981
            </span>
          </div>

          <div>
            <span className="text-gray-500">GST:</span>{" "}
            <span className="font-semibold text-black">
              27AAICI0723K1ZJ
            </span>
          </div>
        </div>

        <div className="absolute inset-x-0 bottom-0 h-[2px] bg-gradient-to-r from-[#2076C7] to-[#1CADA3] scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left" />
      </div>

      {/* Insurance */}
      <div className="border border-gray-100 rounded-xl p-5 bg-white shadow-md hover:shadow-xl hover:border-[#1CADA3]/30 transition-all duration-500 min-h-[240px] group relative overflow-hidden">
        <div className="font-bold text-base bg-gradient-to-r from-[#2076C7] to-[#1CADA3] bg-clip-text text-transparent mb-3">
          INSURANCE
        </div>

        <h4 className="text-gray-800 font-medium mb-4 leading-snug text-sm">
          Infinity Arthvishva Insurance Broker Private Limited
        </h4>

        <div className="space-y-2 text-sm">
          <div>
            <span className="text-gray-500">CIN:</span>{" "}
            <span className="font-semibold text-black break-all">
              U65110PN2025PTC241213
            </span>
          </div>

          <div>
            <span className="text-gray-500">GST:</span>{" "}
            <span className="font-semibold text-black">
              Under Process
            </span>
          </div>
        </div>

        <div className="absolute inset-x-0 bottom-0 h-[2px] bg-gradient-to-r from-[#2076C7] to-[#1CADA3] scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left" />
      </div>

      {/* Mutual Fund */}
      <div className="border border-gray-100 rounded-xl p-5 bg-white shadow-md hover:shadow-xl hover:border-[#1CADA3]/30 transition-all duration-500 min-h-[240px] group relative overflow-hidden">
        <div className="font-bold text-base bg-gradient-to-r from-[#2076C7] to-[#1CADA3] bg-clip-text text-transparent mb-3">
          MUTUAL FUND
        </div>

        <h4 className="text-gray-800 font-medium mb-4 leading-snug text-sm">
          Infinity Arthvishva Mutual Fund Distributor LLP
        </h4>

        <div className="space-y-2 text-sm">
          <div>
            <span className="text-gray-500">LLPIN:</span>{" "}
            <span className="font-semibold text-black">
              ACP-0126
            </span>
          </div>

          <div>
            <span className="text-gray-500">GST:</span>{" "}
            <span className="font-semibold text-black">
              27AALFI4941B1ZH
            </span>
          </div>

          <div>
            <span className="text-gray-500">ARN:</span>{" "}
            <span className="font-semibold text-black">
              347839
            </span>
          </div>
        </div>

        <div className="absolute inset-x-0 bottom-0 h-[2px] bg-gradient-to-r from-[#2076C7] to-[#1CADA3] scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left" />
      </div>

    </div>

    {/* Footer */}
    <div className="mt-14 text-center text-xs text-gray-400 border-t border-gray-100 pt-8">
      Registered under the Companies Act, 2013 and relevant financial regulations.
    </div>

  </div>
</motion.div>
  );
};

export default GroupOfCompaniesPage;