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
      <div className="max-w-6xl mx-auto px-4 py-16 md:py-24">

        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 25 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.7 }}
          className="text-center mb-16"
        >
          <div className="inline-block mb-3">
            <span className="text-sm font-semibold tracking-wider text-[#2076C7] uppercase bg-[#2076C7]/5 px-4 py-1.5 rounded-full">
              Corporate Identity
            </span>
          </div>

          <h2 className="text-4xl md:text-5xl font-bold tracking-tight mb-4 bg-gradient-to-r from-[#2076C7] to-[#1CADA3] bg-clip-text text-transparent">
            Group of Companies
          </h2>

          <p className="text-gray-500 max-w-xl mx-auto text-lg">
            Official registrations and corporate details of the Infinity Arthvishva group.
          </p>

          <div className="w-16 h-px bg-gradient-to-r from-[#2076C7] to-[#1CADA3] mx-auto mt-6" />
        </motion.div>

        {/* Parent Company */}
        <motion.div
          initial={{ opacity: 0, y: 35 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4, duration: 0.8 }}
          className="mb-20"
        >
          <div className="relative bg-white rounded-2xl border border-gray-100 p-6 md:p-10 shadow-lg hover:shadow-2xl hover:border-[#1CADA3]/30 transition-all duration-500 group overflow-hidden">
            <div className="absolute top-0 right-0 w-32 md:w-40 h-32 md:h-40 bg-gradient-to-br from-[#2076C7]/10 to-[#1CADA3]/10 rounded-bl-full pointer-events-none" />

            <div className="absolute inset-x-0 bottom-0 h-[2px] bg-gradient-to-r from-[#2076C7] to-[#1CADA3] scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left" />

            <div className="relative z-10 flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6">
              <div>
                <div className="text-xs font-semibold text-[#2076C7] mb-2 tracking-wider">
                  GROUP OF COMPANY
                </div>

                <h3 className="text-2xl md:text-3xl font-bold text-gray-800 leading-snug">
                  INFINITY ARTHVISHVA{' '}
                  <span className="bg-gradient-to-r from-[#2076C7] to-[#1CADA3] bg-clip-text text-transparent">
                    GROUP
                  </span>
                  <br />
                  <span className="text-lg font-medium text-gray-500">
                    PRIVATE LIMITED
                  </span>
                </h3>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 w-full lg:w-auto">
                <div className="bg-white border border-gray-200 rounded-xl px-5 py-4 shadow-md">
                  <div className="text-xs font-semibold text-gray-500 uppercase tracking-wider">
                    CIN
                  </div>
                  <div className="text-sm font-semibold text-black mt-1 break-all">
                    U70200PN2026PTC252411
                  </div>
                </div>

                <div className="bg-white border border-gray-200 rounded-xl px-5 py-4 shadow-md">
                  <div className="text-xs font-semibold text-gray-500 uppercase tracking-wider">
                    GST
                  </div>
                  <div className="text-sm font-semibold text-black mt-1">
                    Under Process
                  </div>
                </div>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Subsidiaries */}
        <motion.div
          initial={{ opacity: 0, y: 35 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6, duration: 0.8 }}
        >
          <div className="text-center mb-10">
            <h3 className="text-2xl font-semibold text-gray-800">
              Subsidiaries & Associates
            </h3>
            <p className="text-gray-500 text-sm mt-1">
              Regulatory entities under the group umbrella
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">

            {/* Advisory */}
            <div className="border border-gray-100 rounded-xl p-6 bg-white shadow-lg hover:shadow-2xl hover:border-[#1CADA3]/30 transition-all duration-500 flex flex-col justify-between min-h-[240px] group relative overflow-hidden">
              <div>
                <div className="font-bold text-lg bg-gradient-to-r from-[#2076C7] to-[#1CADA3] bg-clip-text text-transparent mb-3">
                  ADVISORY
                </div>

                <h4 className="text-gray-800 font-medium mb-4 leading-snug">
                  Infinity Arthvishva Advisory Private Limited
                </h4>

                <div className="space-y-2 text-sm">
                  <div>
                    <span className="text-gray-500">CIN:</span>{' '}
                    <span className="font-semibold text-black break-all">
                      U66190PN2025PTC238981
                    </span>
                  </div>

                  <div>
                    <span className="text-gray-500">GST:</span>{' '}
                    <span className="font-semibold text-black">
                      27AAICI0723K1ZJ
                    </span>
                  </div>
                </div>
              </div>

              <div className="absolute inset-x-0 bottom-0 h-[2px] bg-gradient-to-r from-[#2076C7] to-[#1CADA3] scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left" />
            </div>

            {/* Insurance */}
            <div className="border border-gray-100 rounded-xl p-6 bg-white shadow-lg hover:shadow-2xl hover:border-[#1CADA3]/30 transition-all duration-500 flex flex-col justify-between min-h-[240px] group relative overflow-hidden">
              <div>
                <div className="font-bold text-lg bg-gradient-to-r from-[#2076C7] to-[#1CADA3] bg-clip-text text-transparent mb-3">
                  INSURANCE
                </div>

                <h4 className="text-gray-800 font-medium mb-4 leading-snug">
                  Infinity Arthvishva Insurance Broker Private Limited
                </h4>

                <div className="space-y-2 text-sm">
                  <div>
                    <span className="text-gray-500">CIN:</span>{' '}
                    <span className="font-semibold text-black break-all">
                      U65110PN2025PTC241213
                    </span>
                  </div>

                  <div>
                    <span className="text-gray-500">GST:</span>{' '}
                    <span className="font-semibold text-black">
                      Under Process
                    </span>
                  </div>
                </div>
              </div>

              <div className="absolute inset-x-0 bottom-0 h-[2px] bg-gradient-to-r from-[#2076C7] to-[#1CADA3] scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left" />
            </div>

            {/* Mutual Fund */}
            <div className="border border-gray-100 rounded-xl p-6 bg-white shadow-lg hover:shadow-2xl hover:border-[#1CADA3]/30 transition-all duration-500 flex flex-col justify-between min-h-[240px] group relative overflow-hidden">
              <div>
                <div className="font-bold text-lg bg-gradient-to-r from-[#2076C7] to-[#1CADA3] bg-clip-text text-transparent mb-3">
                  MUTUAL FUND
                </div>

                <h4 className="text-gray-800 font-medium mb-4 leading-snug">
                  Infinity Arthvishva Mutual Fund Distributor LLP
                </h4>

                <div className="space-y-2 text-sm">
                  <div>
                    <span className="text-gray-500">LLPIN:</span>{' '}
                    <span className="font-semibold text-black">
                      ACP-0126
                    </span>
                  </div>

                  <div>
                    <span className="text-gray-500">GST:</span>{' '}
                    <span className="font-semibold text-black">
                      27AALFI4941B1ZH
                    </span>
                  </div>

                  <div>
                    <span className="text-gray-500">ARN:</span>{' '}
                    <span className="font-semibold text-black">
                      347839
                    </span>
                  </div>
                </div>
              </div>

              <div className="absolute inset-x-0 bottom-0 h-[2px] bg-gradient-to-r from-[#2076C7] to-[#1CADA3] scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left" />
            </div>

          </div>
        </motion.div>

        {/* Footer */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.9, duration: 0.8 }}
          className="mt-16 text-center text-xs text-gray-400 border-t border-gray-100 pt-8"
        >
          Registered under the Companies Act, 2013 and relevant financial regulations.
        </motion.div>

      </div>
    </motion.div>
  );
};

export default GroupOfCompaniesPage;