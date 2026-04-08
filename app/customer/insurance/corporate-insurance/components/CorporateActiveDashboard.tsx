"use client";

import React from "react";
import { motion } from "framer-motion";
import {
  IconUsers,
  IconShieldCheck,
  IconFileText,
  IconCalendarEvent,
  IconHeartbeat,
  IconHelmet,
  IconArrowUpRight,
  IconDownload,
  IconPlus,
} from "@tabler/icons-react";

export default function CorporateActiveDashboard() {
  const metrics = [
    { label: "Employees Covered", value: "0", sub: "Active Members", icon: IconUsers, color: "text-[#2076C7]", bg: "bg-blue-50" },
    { label: "Active Policies", value: "0", sub: "Group Health & PA", icon: IconShieldCheck, color: "text-[#1CADA3]", bg: "bg-teal-50" },
    { label: "Claims Settled", value: "₹0", sub: "Last 12 Months", icon: IconFileText, color: "text-indigo-600", bg: "bg-indigo-50" },
    { label: "Upcoming Renewal", value: "0 Days", sub: "GMC Policy", icon: IconCalendarEvent, color: "text-amber-600", bg: "bg-amber-50" },
  ];

  const policies: any[] = [];

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
      </div>      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Active Policies List */}
        <div className="lg:col-span-12 space-y-6">
          <div className="flex items-center justify-between">
            <h3 className="text-lg font-black text-slate-900 flex items-center gap-3">
              <IconShieldCheck className="text-[#2076C7]" size={24} />
              My Active Policies
            </h3>
          </div>
          
          <div className="space-y-4">
            {policies.length === 0 ? (
                <div className="bg-white p-12 rounded-3xl border border-slate-100 shadow-sm text-center flex flex-col items-center justify-center h-full">
                   <div className="w-20 h-20 bg-slate-50 flex items-center justify-center rounded-full mb-6">
                      <IconShieldCheck className="text-slate-300" size={40} />
                   </div>
                   <h4 className="text-xl font-extrabold text-slate-700 mb-2">No Active Policies</h4>
                   <p className="text-sm font-medium text-slate-400 max-w-sm mx-auto">You do not have any active corporate policies currently. Generate a quote or contact support to enroll.</p>
                </div>
            ) : (
                <div className="grid grid-cols-1 gap-4">
                    {policies.map((policy, i) => {
                      const Icon = policy.icon;
                      return (
                        <motion.div
                          initial={{ opacity: 0, x: -20 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ delay: i * 0.1 }}
                          key={policy.id}
                          className="bg-white p-5 rounded-3xl border border-slate-100 shadow-sm flex flex-col md:flex-row items-start md:items-center justify-between gap-6"
                        >
                          <div className="flex items-center gap-4">
                            <div className={`w-14 h-14 rounded-2xl bg-gradient-to-br ${policy.color} flex items-center justify-center shrink-0 shadow-lg`}>
                              <Icon className="text-white" size={24} />
                            </div>
                            <div>
                              <span className="px-2.5 py-0.5 rounded-full bg-slate-100 text-[9px] font-black uppercase text-slate-500 tracking-wider mb-1 inline-block">
                                {policy.insurer}
                              </span>
                              <h4 className="text-base font-extrabold text-slate-800">{policy.name}</h4>
                              <p className="text-xs font-bold text-slate-400 mt-0.5">Renews on {policy.renewal}</p>
                            </div>
                          </div>

                          <div className="grid grid-cols-2 md:grid-cols-3 gap-6 w-full md:w-auto mt-4 md:mt-0">
                            <div>
                               <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1">Coverage</p>
                               <p className="text-sm font-extrabold text-[#2076C7]">{policy.coverage}</p>
                            </div>
                            <div>
                               <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1">Covered</p>
                               <p className="text-sm font-extrabold text-slate-700">{policy.livesCovered}</p>
                            </div>
                            <div className="col-span-2 md:col-span-1">
                              <button className="w-full md:w-auto px-4 py-2 rounded-xl bg-slate-50 text-[#1CADA3] border border-teal-100 font-bold text-xs hover:bg-teal-50 transition-colors flex items-center justify-center gap-2">
                                <IconDownload size={14}/> E-Cards
                              </button>
                            </div>
                          </div>
                        </motion.div>
                      )
                    })}
                </div>
            )}
          </div>
          
          {policies.length > 0 && (
             <div className="bg-amber-50/50 border border-amber-100 rounded-3xl p-6">
                 <div className="flex gap-3">
                    <IconCalendarEvent size={24} className="text-amber-500 shrink-0"/>
                    <div>
                      <h4 className="text-sm font-extrabold text-slate-800 mb-1">Upcoming Renewal</h4>
                      <p className="text-xs font-medium text-slate-500 leading-relaxed">Your GMC Policy expires in {metrics[3].value}. Renew early to retain continuity benefits and prevent lapse.</p>
                    </div>
                 </div>
             </div>
           )}
        </div>
      </div>
    </div>
  );
}
