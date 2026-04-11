"use client";

import React from "react";
import { motion } from "framer-motion";
import {
  IconBuildingBank,
  IconShieldLock,
  IconFileText,
  IconCash,
  IconActivity,
  IconCheck,
  IconDownload,
} from "@tabler/icons-react";

export default function LoanProtectorActiveDashboard() {
  const metrics = [
    { label: "Protected Debt", value: "₹0", sub: "Total Secured", icon: IconShieldLock, color: "text-[#2076C7]", bg: "bg-blue-50" },
    { label: "Active Covers", value: "0", sub: "Shield Policies", icon: IconFileText, color: "text-[#1CADA3]", bg: "bg-teal-50" },
    { label: "Protection Ratio", value: "0%", sub: "Of Outstanding Loans", icon: IconActivity, color: "text-emerald-600", bg: "bg-emerald-50" },
    { label: "Annual Premium", value: "₹0", sub: "Total Paid", icon: IconCash, color: "text-indigo-600", bg: "bg-indigo-50" },
  ];

  const protections: any[] = [];

  return (
    <div className="space-y-8 animate-fadeIn font-sans">
      {/* Top Metrics Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {metrics.map((card, i) => (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.1 }}
            key={i}
            className="bg-white p-6 rounded-3xl border border-slate-100 shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all group"
          >
            <div className={`w-14 h-14 ${card.bg} ${card.color} rounded-2xl flex items-center justify-center mb-5 group-hover:scale-110 transition-transform shadow-sm`}>
              <card.icon size={28} />
            </div>
            <p className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em] mb-1.5">{card.label}</p>
            <p className="text-3xl font-black text-slate-900">{card.value}</p>
            <div className="flex items-center gap-1.5 mt-2">
              <span className="text-[10px] font-bold text-slate-400">{card.sub}</span>
            </div>
          </motion.div>
        ))}
      </div>

      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <h3 className="text-lg font-black text-slate-900 flex items-center gap-3">
            <IconShieldLock className="text-[#2076C7]" size={24} />
            My Loan Protections
          </h3>
        </div>
        
        <div className="space-y-4">
          {protections.length === 0 ? (
              <div className="bg-white p-12 rounded-3xl border border-slate-100 shadow-sm text-center flex flex-col items-center justify-center h-full">
                 <div className="w-20 h-20 bg-slate-50 flex items-center justify-center rounded-full mb-6">
                    <IconShieldLock className="text-slate-300" size={40} />
                 </div>
                 <h4 className="text-xl font-extrabold text-slate-700 mb-2">No Active Loan Protections</h4>
                 <p className="text-sm font-medium text-slate-400 max-w-sm mx-auto">Your outstanding loans are currently unprotected. Secure your liabilities against unforeseen events.</p>
              </div>
          ) : (
              <div className="grid grid-cols-1 gap-4">
                {protections.map((policy, i) => {
                  const Icon = policy.icon;
                  return (
                    <motion.div
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: i * 0.1 }}
                      key={policy.id}
                      className="bg-white p-5 rounded-[2rem] border border-slate-100 shadow-sm flex flex-col md:flex-row items-start md:items-center justify-between gap-6"
                    >
                      <div className="flex items-center gap-4">
                        <div className={`w-14 h-14 rounded-2xl bg-gradient-to-br ${policy.color} flex items-center justify-center shrink-0 shadow-lg`}>
                          <Icon className="text-white" size={24} />
                        </div>
                        <div>
                          <span className="px-2.5 py-0.5 rounded-full bg-slate-100 text-[9px] font-black uppercase text-slate-500 tracking-wider mb-1 flex items-center gap-1 w-max">
                            <IconBuildingBank size={10}/> {policy.bank}
                          </span>
                          <h4 className="text-base font-extrabold text-slate-800">{policy.loanName}</h4>
                          <p className="text-xs font-bold text-slate-400 mt-0.5">Insured via {policy.insurer}</p>
                        </div>
                      </div>

                      <div className="grid grid-cols-2 md:grid-cols-3 gap-6 w-full md:w-auto mt-4 md:mt-0">
                        <div>
                           <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1">Cover Size</p>
                           <p className="text-sm font-extrabold text-[#2076C7]">{policy.coverage}</p>
                        </div>
                        <div>
                           <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1">Safety</p>
                           <span className="text-xs font-extrabold text-emerald-600 flex items-center gap-1 bg-emerald-50 px-2 py-0.5 rounded-md w-max">
                              <IconCheck size={12}/> Protected
                           </span>
                        </div>
                        <div className="col-span-2 md:col-span-1">
                          <button className="w-full md:w-auto px-4 py-2 rounded-xl bg-slate-50 text-[#1CADA3] border border-teal-100 font-bold text-xs hover:bg-teal-50 transition-colors flex items-center justify-center gap-2">
                            <IconDownload size={14}/> Schedule
                          </button>
                        </div>
                      </div>
                    </motion.div>
                  )
                })}
              </div>
          )}
        </div>
      </div>
    </div>
  );
}
