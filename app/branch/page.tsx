"use client";

import { useState, useEffect } from "react";
import { motion, Variants } from "framer-motion";
import { Users, Clock,ArrowRight, Activity, ArrowUpRight,  MapPin, Target,DollarSign,FileX, FileCheck, Award,IndianRupee,} from "lucide-react";
import {XAxis, YAxis,  CartesianGrid, Tooltip, ResponsiveContainer, AreaChart, Area} from 'recharts';

// Define the interface for the new, expanded props
interface DashboardProps {
  user?: string;
  branchName?: string;
  // New Key Metrics
  totalLeads?: number;
  todaysLeads?: number;
  approvedCases?: number;
  pendingApplications?: number;
  rejectedCases?: number;
  loanDisbursedAmount?: number;
  monthlyTarget?: number;
  revenueGenerated?: number;
  activeDsaCount?: number;
  // Branch Performance
  branchRanking?: { rank: number; total: number };
  // Chart Data
  monthlyTrendData?: Array<{ name: string; disbursed: number }>;
  // DSA Data (kept from original)
  topDsa?: { name: string; deals: number };
  dsaData?: Array<{
    id: string;
    name: string;
    type: string;
    status: string;
    leads: number;
    closures: number;
    performance: string;
  }>;
}

// Dummy data for the chart if none is provided
const defaultMonthlyTrend = [
  { name: 'Jan', disbursed: 4000 },
  { name: 'Feb', disbursed: 3000 },
  { name: 'Mar', disbursed: 5000 },
  { name: 'Apr', disbursed: 4500 },
  { name: 'May', disbursed: 6000 },
  { name: 'Jun', disbursed: 5500 },
];

const containerVariants: Variants = {
  hidden: { opacity: 0 },
  show: { opacity: 1, transition: { staggerChildren: 0.08 } }
};

const itemVariants: Variants = {
  hidden: { y: 20, opacity: 0 },
  show: { y: 0, opacity: 1, transition: { type: "spring", stiffness: 100 } }
};

// Reusable Stat Card Component
const StatCard = ({ icon, title, value, subValue }: { icon: React.ReactNode, title: string, value: string, subValue?: string }) => (
  <motion.div variants={itemVariants} className="bg-white rounded-2xl p-5 border border-slate-100 shadow-sm">
    <div className="flex items-center gap-4">
      <div className="w-12 h-12 bg-blue-50 text-[#2076C7] rounded-xl flex items-center justify-center">
        {icon}
      </div>
      <div>
        <p className="text-sm font-medium text-slate-500">{title}</p>
        <p className="text-2xl font-extrabold text-slate-700">{value}</p>
        {subValue && <p className="text-xs text-slate-400 font-medium mt-0.5">{subValue}</p>}
      </div>
    </div>
  </motion.div>
);

export default function Dashboard({
  user = "Manager",
  branchName = "Main Office",
  totalLeads = 1250,
  todaysLeads = 45,
  approvedCases = 310,
  pendingApplications = 78,
  rejectedCases = 92,
  loanDisbursedAmount = 15600000,
  monthlyTarget = 20000000,
  revenueGenerated = 780000,
  activeDsaCount = 85,
  branchRanking = { rank: 3, total: 15 },
  monthlyTrendData = defaultMonthlyTrend,
  topDsa = { name: "Ravi Kumar", deals: 42 },
  dsaData = [] // Default to empty, can be populated via API
}: DashboardProps) {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 500);
    return () => clearTimeout(timer);
  }, []);

  // Helper for formatting currency
  const formatCurrency = (value: number) => 
    new Intl.NumberFormat('en-IN', { 
      style: 'currency', 
      currency: 'INR',
      maximumFractionDigits: 0 
    }).format(value);

  // Loading spinner (unchanged)
  if (loading) {
    return (
      <div className="flex h-screen items-center justify-center bg-[#F8FAFC]">
        <div className="relative flex items-center justify-center">
          <div className="absolute w-16 h-16 border-4 border-slate-200 rounded-full"></div>
          <div className="absolute w-16 h-16 border-4 border-[#2076C7] rounded-full border-t-transparent animate-spin"></div>
          <Activity className="text-[#1CADA3] w-6 h-6 animate-pulse" />
        </div>
      </div>
    );
  }

  const achievementRate = monthlyTarget > 0 
    ? Math.round((loanDisbursedAmount / monthlyTarget) * 100) 
    : 0;

  const conversionRatio = totalLeads > 0 ? Math.round((approvedCases / totalLeads) * 100) : 0;

  return (
    <div className="min-h-screen bg-[#F8FAFC] p-4 sm:p-6 lg:p-8 font-sans text-slate-700">
      <motion.div 
        variants={containerVariants}
        initial="hidden"
        animate="show"
        className="grid grid-cols-1 lg:grid-cols-12 gap-6"
      >
        {/* === HERO / TARGET WIDGET === */}
        <motion.div 
          variants={itemVariants}
          className="lg:col-span-8 bg-white rounded-[2rem] p-8 shadow-sm border border-slate-100 flex flex-col md:flex-row items-center justify-between gap-8 relative overflow-hidden"
        >
          <div className="absolute -right-20 -top-20 w-64 h-64 bg-blue-50 rounded-full blur-3xl opacity-50 pointer-events-none"></div>
          <div className="flex-1 z-10">
             <div className="flex items-center gap-3 mb-2">
              <span className="px-3 py-1 bg-blue-50 border border-blue-100 text-[#2076C7] rounded-full text-xs font-bold flex items-center gap-1.5 shadow-sm">
                <MapPin size={12} /> {branchName}
              </span>
            </div>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-700 mb-4 tracking-tight">
              Branch Overview
            </h2>
            <p className="text-slate-500 text-lg max-w-md leading-relaxed">
              Welcome back, {user}! Here's your operational summary.
            </p>
          </div>

          <div className="relative w-48 h-48 shrink-0 z-10 flex items-center justify-center">
            <svg viewBox="0 0 36 36" className="w-full h-full transform -rotate-90 drop-shadow-md">
              <path className="text-slate-100" strokeWidth="3.5" stroke="#E2E8F0" fill="none" d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831" />
              <motion.path
                stroke="url(#gradient)" strokeWidth="3.5" strokeLinecap="round" fill="none"
                d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                initial={{ strokeDasharray: "0, 100" }}
                animate={{ strokeDasharray: `${achievementRate}, 100` }}
                transition={{ duration: 1.5, ease: "easeOut" }}
              />
              <defs><linearGradient id="gradient" x1="0" y1="0" x2="1" y2="1"><stop offset="0%" stopColor="#2076C7" /><stop offset="100%" stopColor="#1CADA3" /></linearGradient></defs>
            </svg>
            <div className="absolute flex flex-col items-center justify-center">
              <span className="text-3xl font-extrabold text-slate-700">{achievementRate}%</span>
              <span className="text-xs font-bold text-slate-400 uppercase tracking-widest">Target Met</span>
            </div>
          </div>
        </motion.div>

        {/* === PENDING APPLICATIONS WIDGET === */}
        <motion.div 
          variants={itemVariants}
          className="lg:col-span-4 bg-gradient-to-br from-[#2076C7] to-[#1CADA3] rounded-[2rem] p-8 text-white shadow-xl shadow-orange-100/50 flex flex-col justify-between relative overflow-hidden"
        >
          <div className="absolute top-0 right-0 w-full h-full bg-[url('data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSI4IiBoZWlnaHQ9IjgiPgo8cmVjdCB3aWR0aD0iOCIgaGVpZ2h0PSI4IiBmaWxsPSIjZmZmIiBmaWxsLW9wYWNpdHk9IjAuMDUiLz4KPC9zdmc+')] opacity-20"></div>
          <div className="relative z-10">
            <div className="w-12 h-12 bg-white/20 backdrop-blur-md rounded-2xl flex items-center justify-center mb-6 border border-white/30">
              <Clock size={24} className="text-white" />
            </div>
            <h3 className="text-2xl font-bold mb-2">Pending Applications</h3>
            <p className="text-orange-50 opacity-90 text-sm mb-6">These applications require your immediate attention for processing.</p>
          </div>
          <div className="relative z-10 bg-white/10 backdrop-blur-md border border-white/20 rounded-2xl p-4 flex items-center justify-between">
            <div>
              <p className="text-xs uppercase tracking-wider text-orange-100 font-semibold mb-1">Awaiting Action</p>
              <p className="text-3xl font-extrabold text-white">{pendingApplications}</p>
            </div>
            <button className="h-10 w-10 bg-white text-gray-500 rounded-full flex items-center justify-center hover:scale-105 transition-transform shadow-md">
              <ArrowRight size={20} />
            </button>
          </div>
        </motion.div>

        {/* === KEY METRICS GRID === */}
        <div className="lg:col-span-12 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6">
          <StatCard icon={<Users size={20}/>} title="Total Leads" value={totalLeads.toLocaleString('en-IN')} subValue={`${todaysLeads} today`} />
          <StatCard icon={<FileCheck size={20}/>} title="Approved Cases" value={approvedCases.toLocaleString('en-IN')} />
          <StatCard icon={<FileX size={20}/>} title="Rejected Cases" value={rejectedCases.toLocaleString('en-IN')} />
          <StatCard icon={<Target size={20}/>} title="Conversion Ratio" value={`${conversionRatio}%`} />
          <StatCard icon={<DollarSign size={20}/>} title="Revenue Generated" value={formatCurrency(revenueGenerated)} />
        </div>
        
        {/* === MONTHLY TREND CHART === */}
        <motion.div
          variants={itemVariants}
          className="lg:col-span-8 bg-white rounded-[2rem] p-6 sm:p-8 border border-slate-100 shadow-sm"
        >
          <h3 className="text-lg font-bold text-slate-700 mb-1">Monthly Disbursal Trend</h3>
          <p className="text-sm text-slate-500 mb-6">Loan amount disbursed over the last 6 months.</p>
          <div style={{ width: '100%', height: 300 }}>
             <ResponsiveContainer>
              <AreaChart data={monthlyTrendData} margin={{ top: 10, right: 30, left: 0, bottom: 0 }}>
                <defs>
                  <linearGradient id="colorDisbursed" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#2076C7" stopOpacity={0.8}/>
                    <stop offset="95%" stopColor="#2076C7" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="#e0e0e0" />
                <XAxis dataKey="name" stroke="#94a3b8" fontSize={12} />
                <YAxis stroke="#94a3b8" fontSize={12} tickFormatter={(value) => `₹${Number(value) / 1000}k`} />
                <Tooltip 
                  contentStyle={{ 
                    borderRadius: '0.75rem', 
                    border: '1px solid #e2e8f0',
                    boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1), 0 2px 4px -2px rgb(0 0 0 / 0.1)'
                  }}
                    formatter={(value: any) => [formatCurrency(Number(value)), 'Disbursed']}
                />
                <Area type="monotone" dataKey="disbursed" stroke="#2076C7" fillOpacity={1} fill="url(#colorDisbursed)" strokeWidth={2} />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </motion.div>

        {/* === PERFORMANCE & RANKING WIDGETS === */}
        <div className="lg:col-span-4 flex flex-col gap-6">
            <motion.div variants={itemVariants} className="bg-white rounded-[2rem] p-8 border border-slate-100 shadow-sm flex-1 flex flex-col justify-center">
                <div className="w-12 h-12 bg-green-50 text-green-600 rounded-2xl flex items-center justify-center mb-4">
                  <Award size={24} />
                </div>
                <p className="text-sm font-medium text-slate-500 mb-1">Branch Performance</p>
                <h3 className="text-3xl font-extrabold text-slate-700">Rank #{branchRanking.rank}</h3>
                <p className="text-sm font-medium text-slate-400">out of {branchRanking.total} branches</p>
            </motion.div>
             <motion.div variants={itemVariants} className="bg-white rounded-[2rem] p-8 border border-slate-100 shadow-sm flex-1 flex flex-col justify-center">
                <div className="w-12 h-12 bg-blue-50 text-[#2076C7] rounded-2xl flex items-center justify-center mb-4">
                  <IndianRupee size={24} />
                </div>
                <p className="text-sm font-medium text-slate-500 mb-1">Total Loan Disbursed</p>
                <h3 className="text-3xl font-extrabold text-slate-700">{formatCurrency(loanDisbursedAmount)}</h3>
                <p className="text-sm font-medium text-slate-400">this month</p>
            </motion.div>
        </div>


        {/* === DSA DIRECTORY (ADAPTED) === */}
        <motion.div 
          variants={itemVariants}
          className="lg:col-span-12 bg-white rounded-[2rem] border border-slate-100 shadow-sm overflow-hidden flex flex-col"
        >
          <div className="p-6 sm:p-8 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 border-b border-slate-100">
            <div>
              <h3 className="text-xl font-extrabold text-slate-700 tracking-tight">DSA Directory</h3>
              <p className="text-slate-500 text-sm font-medium mt-0.5">Manage and monitor direct selling agents</p>
            </div>
            <div className="flex items-center gap-6">
                <div className="text-right">
                    <p className="text-slate-400 text-xs font-bold uppercase tracking-widest">Active DSAs</p>
                    <p className="text-2xl font-bold text-slate-700">{activeDsaCount}</p>
                </div>
                 <div className="text-right">
                    <p className="text-slate-400 text-xs font-bold uppercase tracking-widest">Top Performer</p>
                    <p className="text-lg font-bold text-[#2076C7]">{topDsa.name}</p>
                </div>
            </div>
          </div>
          <div className="p-6 sm:p-8 w-full overflow-x-auto">
            <table className="w-full text-left border-collapse min-w-[700px]">
              <thead>
                <tr className="border-b-2 border-slate-100 text-slate-400 text-xs uppercase tracking-wider">
                  <th className="py-3 font-bold pb-4 w-1/3">Agent Details</th>
                  <th className="py-3 font-bold pb-4">Status & Type</th>
                  <th className="py-3 font-bold pb-4 w-1/4">Progress (Closed / Leads)</th>
                  <th className="py-3 font-bold pb-4 text-right">Performance</th>
                </tr>
              </thead>
              <tbody>
                {/* Your DSA data mapping remains the same. Add data to the dsaData prop to see it here. */}
                {dsaData.length > 0 ? dsaData.map((agent, index) => {
                  const closureRate = agent.leads > 0 ? Math.round((agent.closures / agent.leads) * 100) : 0;
                  return (
                    <tr key={index} className="border-b border-slate-50 hover:bg-blue-50/30 transition-colors group">
                       <td className="py-4">
                        <div className="flex items-center gap-4">
                          <div className="w-10 h-10 rounded-full bg-white border border-slate-200 shadow-sm text-[#2076C7] font-bold flex items-center justify-center text-sm">
                            {agent.name.split(" ").map(n => n[0]).join("")}
                          </div>
                          <div>
                            <p className="font-bold text-slate-700 group-hover:text-[#2076C7] transition-colors">{agent.name}</p>
                            <p className="text-xs text-slate-400 font-medium mt-0.5 font-mono">{agent.id}</p>
                          </div>
                        </div>
                      </td>
                      <td className="py-4">
                        <div className="flex flex-col gap-1.5">
                          <span className={`px-2.5 py-1 rounded-md text-[10px] uppercase tracking-widest font-bold inline-block w-fit ${
                            agent.status === 'Active' ? 'bg-green-50 text-green-600 border border-green-100' : 'bg-orange-50 text-orange-500 border border-orange-100'
                          }`}>
                            {agent.status}
                          </span>
                          <span className="text-xs text-slate-500 font-medium bg-slate-100 px-2 py-0.5 rounded-md w-fit">{agent.type}</span>
                        </div>
                      </td>
                      <td className="py-4">
                        <div className="flex flex-col gap-2 pr-4">
                          <div className="flex items-center justify-between text-sm">
                            <span className="font-bold text-slate-700">{agent.closures} <span className="text-slate-400 font-normal">/ {agent.leads}</span></span>
                            <span className="text-xs font-bold text-slate-400">{closureRate}%</span>
                          </div>
                          <div className="w-full h-1.5 bg-slate-100 rounded-full overflow-hidden">
                            <div className={`h-full rounded-full ${agent.status === 'Active' ? 'bg-[#2076C7]' : 'bg-slate-300'}`} style={{ width: `${closureRate}%` }}></div>
                          </div>
                        </div>
                      </td>
                      <td className="py-4 text-right">
                        <div className="flex items-center justify-end gap-3">
                          <span className={`flex items-center gap-1 text-sm font-bold px-2.5 py-1 rounded-lg ${
                            agent.performance.startsWith('+') ? 'bg-emerald-50 text-emerald-600' : 
                            agent.performance.startsWith('-') ? 'bg-red-50 text-red-500' : 'bg-slate-50 text-slate-500'
                          }`}>
                            {agent.performance.startsWith('+') && <ArrowUpRight size={14} />}
                            {agent.performance}
                          </span>
                        </div>
                      </td>
                    </tr>
                  );
                }) : (
                    <tr>
                        <td colSpan={4} className="text-center py-10 text-slate-400 font-medium">No DSA data available.</td>
                    </tr>
                )}
              </tbody>
            </table>
          </div>
        </motion.div>
      </motion.div>
    </div>
  );
}