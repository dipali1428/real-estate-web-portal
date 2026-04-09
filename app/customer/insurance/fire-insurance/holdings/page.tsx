"use client";

import React from "react";
import { motion } from "framer-motion";
import {
  Shield,
  TrendingUp,
  AlertCircle,
  Clock,
  Plus,
  ArrowUpRight,
  Filter,
  Download,
  Search,
  PieChart as PieChartIcon,
  LayoutGrid,
  FileText
} from "lucide-react";
import {
  PieChart,
  Pie,
  Cell,
  ResponsiveContainer,
  Tooltip,
  Legend
} from "recharts";
import FireInsuranceHeader from "../components/FireInsuranceHeader";

// Colors for the "No Data" state or future data
const COLORS = ["#E2E8F0", "#CBD5E1", "#94A3B8"];
const EMPTY_DATA = [{ name: "No Assets Insured", value: 1 }];

export default function FireInsuranceHoldings() {
  const stats = [
    { label: "Total Sum Insured", value: "₹0", icon: Shield, color: "text-[#2076C7]", bg: "bg-blue-50" },
    { label: "Active Policies", value: "0", icon: LayoutGrid, color: "text-[#1CADA3]", bg: "bg-emerald-50" },
    { label: "Invested Premium", value: "₹0", icon: TrendingUp, color: "text-blue-600", bg: "bg-slate-50" },
    { label: "Claims Processing", value: "0", icon: AlertCircle, color: "text-slate-400", bg: "bg-gray-50" },
  ];

  return (
    <>
        {/* ─── SUMMARY STATS ─── */}

        {/* ─── SUMMARY STATS ─── */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {stats.map((stat, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className="bg-white p-6 rounded-[2rem] border border-slate-100 shadow-sm flex items-center justify-between group hover:border-[#2076C7] transition-all duration-500"
            >
              <div className="flex items-center gap-4">
                <div className={`w-12 h-12 ${stat.bg} ${stat.color} rounded-2xl flex items-center justify-center transition-transform group-hover:scale-110`}>
                  <stat.icon size={22} />
                </div>
                <div>
                  <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1">{stat.label}</p>
                  <p className="text-2xl font-black text-slate-800 tracking-tight">{stat.value}</p>
                </div>
              </div>
              <div className="w-8 h-8 rounded-full bg-slate-50 flex items-center justify-center text-slate-300 group-hover:bg-[#2076C7] group-hover:text-white transition-all">
                <ArrowUpRight size={14} />
              </div>
            </motion.div>
          ))}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-8">
          {/* ─── LEFT: MAIN VIEW ─── */}
          <div className="lg:col-span-2 space-y-6">
            <div className="bg-white rounded-[2.5rem] border border-slate-100 shadow-sm overflow-hidden">
               <div className="p-8 border-b border-slate-50 flex items-center justify-between">
                  <div>
                    <h3 className="text-xl font-black text-slate-800 tracking-tight">Active Insurance Portfolio</h3>
                    <p className="text-xs text-slate-400 font-medium mt-1">Detailed list of your insured assets and property units</p>
                  </div>
                  <div className="flex gap-2">
                    <button className="p-2.5 bg-slate-50 text-slate-400 rounded-xl hover:bg-slate-100 transition-all">
                      <Filter size={18} />
                    </button>
                    <button className="p-2.5 bg-slate-50 text-slate-400 rounded-xl hover:bg-slate-100 transition-all">
                      <Download size={18} />
                    </button>
                  </div>
               </div>

               {/* ZERO STATE TABLE */}
               <div className="p-12 flex flex-col items-center justify-center min-h-[400px] text-center">
                  <div className="w-20 h-20 bg-blue-50 rounded-full flex items-center justify-center mb-6">
                    <FileText className="text-[#2076C7] opacity-20" size={40} />
                  </div>
                  <h4 className="text-lg font-black text-slate-800 mb-2">No Active Holdings Found</h4>
                  <p className="text-sm text-slate-400 max-w-sm mx-auto mb-8 font-medium">
                    You haven't purchased any fire insurance policies yet. Your insured assets will appear here once your application is approved.
                  </p>
                  <button className="px-8 py-3 bg-white border-2 border-[#2076C7] text-[#2076C7] font-black rounded-2xl hover:bg-[#2076C7] hover:text-white transition-all uppercase tracking-widest text-[10px]">
                    Browse Products
                  </button>
               </div>
            </div>
          </div>

          {/* ─── RIGHT: ANALYTICS ─── */}
          <div className="space-y-6">
             <div className="bg-white rounded-[2.5rem] border border-slate-100 shadow-sm p-8">
                <div className="flex items-center gap-3 mb-8">
                  <div className="w-10 h-10 bg-blue-50 rounded-xl flex items-center justify-center text-[#2076C7]">
                    <PieChartIcon size={20} />
                  </div>
                  <h3 className="font-black text-slate-800 tracking-tight">Asset Distribution</h3>
                </div>

                <div className="h-[250px] w-full relative">
                   <ResponsiveContainer width="100%" height="100%">
                      <PieChart>
                         <Pie
                            data={EMPTY_DATA}
                            innerRadius={60}
                            outerRadius={80}
                            paddingAngle={5}
                            dataKey="value"
                            stroke="none"
                         >
                            {EMPTY_DATA.map((entry, index) => (
                               <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                            ))}
                         </Pie>
                         <Tooltip />
                      </PieChart>
                   </ResponsiveContainer>
                   <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none">
                      <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Total</p>
                      <p className="text-xl font-black text-slate-300 tracking-tighter">₹0</p>
                   </div>
                </div>

                <div className="space-y-4 mt-8">
                   {["Residential", "Commercial", "Industrial"].map((label, i) => (
                      <div key={i} className="flex items-center justify-between p-4 bg-slate-50/50 rounded-2xl border border-transparent hover:border-slate-100 transition-all">
                         <div className="flex items-center gap-3">
                            <div className="w-2 h-2 rounded-full bg-slate-200" />
                            <span className="text-sm font-bold text-slate-500">{label}</span>
                         </div>
                         <span className="text-sm font-black text-slate-300">0%</span>
                      </div>
                   ))}
                </div>
             </div>

             {/* QUICK ACTION BANNER */}
             <div className="bg-gradient-to-br from-[#2076C7] to-[#1CADA3] rounded-[2.5rem] p-8 text-white relative overflow-hidden shadow-lg shadow-blue-100">
                <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full -translate-y-1/2 translate-x-1/2 blur-2xl" />
                <div className="relative z-10">
                   <h4 className="text-lg font-black mb-2">Secure More Assets</h4>
                   <p className="text-white/80 text-xs font-medium mb-6 leading-relaxed">
                      Expand your protection portfolio by adding machinery breakdown or stock cover.
                   </p>
                   <button className="w-full py-3 bg-white text-[#2076C7] font-black rounded-xl text-[10px] uppercase tracking-widest hover:scale-105 transition-transform">
                      Add New Policy <Plus size={14} className="inline ml-1" />
                   </button>
                </div>
             </div>
          </div>
        </div>

    </>
  );
}
