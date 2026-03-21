"use client";

import { useState, useEffect } from "react";
import { motion, Variants } from "framer-motion";
import { 
  Users, Mail, Clock, CheckCircle, 
  FolderOpen, ArrowRight, Activity, 
  BarChart3, ArrowUpRight, MapPin, Trophy
} from "lucide-react";

export default function Dashboard() {
  const [user] = useState("Branch Head");
  const [branchName] = useState("Pune");
  const [loading, setLoading] = useState(true);

  const [dsaTotal] = useState(128);
  const [topDsa] = useState({ name: "Amit Kumar", deals: 14 });
  const [pendingDsa] = useState(3);
  
  const [enquiryStats] = useState({
    total: 450,
    pending: 85,
    closed: 320,
    open: 45,
  });

  const [dsaData] = useState([
    { id: "DSA-042", name: "Amit Kumar", type: "Individual", status: "Active", leads: 45, closures: 14, performance: "+12%" },
    { id: "DSA-089", name: "Priya Sharma", type: "Corporate", status: "Active", leads: 38, closures: 11, performance: "+8%" },
    { id: "DSA-102", name: "Rahul Verma", type: "Individual", status: "Pending", leads: 0, closures: 0, performance: "N/A" },
    { id: "DSA-033", name: "Sneha Patel", type: "Individual", status: "Active", leads: 29, closures: 8, performance: "-2%" },
  ]);

  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 500);
    return () => clearTimeout(timer);
  }, []);

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

  // Applied Framer Motion's 'Variants' type to fix the TypeScript error
  const containerVariants: Variants = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: { staggerChildren: 0.1 }
    }
  };

  const itemVariants: Variants = {
    hidden: { y: 20, opacity: 0 },
    show: { y: 0, opacity: 1, transition: { type: "spring", stiffness: 100 } }
  };

  const conversionRate = enquiryStats.total > 0 
    ? Math.round((enquiryStats.closed / enquiryStats.total) * 100) 
    : 0;

  return (
    <div className="min-h-screen bg-[#F8FAFC] p-4 sm:p-6 lg:p-8 font-sans text-slate-700">
      
      {/* TOP NAVIGATION / HEADER */}
      <header className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
        <motion.div 
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          className="flex items-center gap-4"
        >
          <div className="h-12 w-12 rounded-2xl bg-gradient-to-br from-[#2076C7] to-[#1CADA3] flex items-center justify-center text-white shadow-lg shadow-blue-100">
            <span className="text-lg font-bold">BH</span>
          </div>
          <div>
            <div className="flex items-center gap-3 mb-1">
              <h1 className="text-2xl font-bold leading-tight text-slate-700">Branch Head</h1>
              <span className="px-3 py-1 bg-blue-50 border border-blue-100 text-[#2076C7] rounded-full text-xs font-bold flex items-center gap-1.5 shadow-sm">
                <MapPin size={12} /> {branchName}
              </span>
            </div>
            <p className="text-sm text-slate-500 font-medium">Welcome back, {user}</p>
          </div>
        </motion.div>
      </header>

      <motion.div 
        variants={containerVariants}
        initial="hidden"
        animate="show"
        className="grid grid-cols-1 lg:grid-cols-12 gap-6"
      >
        {/* HERO METRIC WIDGET (BENTO SPAN 8) */}
        <motion.div 
          variants={itemVariants}
          className="lg:col-span-8 bg-white rounded-[2rem] p-8 shadow-sm border border-slate-100 flex flex-col md:flex-row items-center justify-between gap-8 relative overflow-hidden"
        >
          <div className="absolute -right-20 -top-20 w-64 h-64 bg-blue-50 rounded-full blur-3xl opacity-50 pointer-events-none"></div>
          
          <div className="flex-1 z-10">
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-blue-50 text-[#2076C7] text-xs font-bold uppercase tracking-wide mb-4">
              <BarChart3 size={14} /> Overall Performance
            </div>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-700 mb-4 tracking-tight">
              {conversionRate}% Conversion
            </h2>
            <p className="text-slate-500 text-lg max-w-md leading-relaxed">
              Your branch has successfully closed <strong className="text-slate-600 font-bold">{enquiryStats.closed}</strong> out of <strong className="text-slate-600 font-bold">{enquiryStats.total}</strong> enquiries this period. Maintain this momentum!
            </p>
          </div>

          {/* CUSTOM RADIAL CHART */}
          <div className="relative w-48 h-48 shrink-0 z-10 flex items-center justify-center">
            <svg viewBox="0 0 36 36" className="w-full h-full transform -rotate-90 drop-shadow-md">
              <path
                className="text-slate-100"
                strokeWidth="3.5"
                stroke="#CCCCCC"
                fill="none"
                d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
              />
              <path
                stroke="url(#gradient)"
                strokeWidth="3.5"
                strokeDasharray={`${conversionRate}, 100`}
                strokeLinecap="round"
                fill="none"
                className="animate-[dash_1.5s_ease-out_forwards]"
                d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
              />
              <defs>
                <linearGradient id="gradient" x1="0" y1="0" x2="1" y2="1">
                  <stop offset="0%" stopColor="#2076C7" />
                  <stop offset="100%" stopColor="#1CADA3" />
                </linearGradient>
              </defs>
            </svg>
            <div className="absolute flex flex-col items-center justify-center">
              <span className="text-3xl font-extrabold text-slate-700">{conversionRate}%</span>
              <span className="text-xs font-bold text-slate-400 uppercase tracking-widest">Closed</span>
            </div>
          </div>
        </motion.div>

        {/* ACTION ALERT WIDGET (BENTO SPAN 4) */}
        <motion.div 
          variants={itemVariants}
          className="lg:col-span-4 bg-gradient-to-br from-[#2076C7] to-[#1CADA3] rounded-[2rem] p-8 text-white shadow-xl shadow-blue-100/50 flex flex-col justify-between relative overflow-hidden"
        >
          <div className="absolute top-0 right-0 w-full h-full bg-[url('data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSI4IiBoZWlnaHQ9IjgiPgo8cmVjdCB3aWR0aD0iOCIgaGVpZ2h0PSI4IiBmaWxsPSIjZmZmIiBmaWxsLW9wYWNpdHk9IjAuMDUiLz4KPC9zdmc+')] opacity-20"></div>
          
          <div className="relative z-10">
            <div className="w-12 h-12 bg-white/20 backdrop-blur-md rounded-2xl flex items-center justify-center mb-6 border border-white/30">
              <Clock size={24} className="text-white" />
            </div>
            <h3 className="text-2xl font-bold mb-2">Needs Attention</h3>
            <p className="text-blue-50 opacity-90 text-sm mb-6">
              You have pending tasks that require immediate branch approval.
            </p>
          </div>
          
          <div className="relative z-10 bg-white/10 backdrop-blur-md border border-white/20 rounded-2xl p-4 flex items-center justify-between">
            <div>
              <p className="text-xs uppercase tracking-wider text-blue-100 font-semibold mb-1">Awaiting Follow-up</p>
              <p className="text-3xl font-extrabold text-white">{enquiryStats.pending}</p>
            </div>
            <button className="h-10 w-10 bg-white text-[#2076C7] rounded-full flex items-center justify-center hover:scale-105 transition-transform shadow-md">
              <ArrowRight size={20} />
            </button>
          </div>
        </motion.div>

        {/* ENQUIRY FUNNEL (BENTO SPAN 12) */}
        <motion.div 
          variants={itemVariants}
          className="lg:col-span-12 bg-white rounded-[2rem] border border-slate-100 shadow-sm p-6 sm:p-8"
        >
          <div className="flex items-center justify-between mb-8">
            <h3 className="text-lg font-bold text-slate-700">Enquiry</h3>
            <span className="text-sm font-medium text-slate-500 bg-slate-50 px-3 py-1 rounded-full">Last 30 Days</span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {/* Stage 1 */}
            <div className="bg-[#F8FAFC] rounded-2xl p-6 border border-slate-100 relative group hover:border-[#2076C7]/30 transition-colors">
              <div className="flex items-center justify-between mb-4">
                <div className="p-3 bg-blue-100/50 text-[#2076C7] rounded-xl"><Mail size={20} /></div>
                <span className="text-slate-400 font-medium text-sm">Total</span>
              </div>
              <p className="text-3xl font-extrabold text-slate-700">{enquiryStats.total}</p>
              <div className="w-full h-1.5 bg-slate-200 rounded-full mt-4 overflow-hidden">
                <div className="h-full bg-[#2076C7] w-full rounded-full"></div>
              </div>
            </div>

            {/* Stage 2 */}
            <div className="bg-[#F8FAFC] rounded-2xl p-6 border border-slate-100 relative group hover:border-orange-300/50 transition-colors">
              <div className="hidden lg:block absolute -left-3 top-1/2 -translate-y-1/2 z-10 text-slate-300">
                <ArrowRight size={24} />
              </div>
              <div className="flex items-center justify-between mb-4">
                <div className="p-3 bg-orange-50 text-orange-500 rounded-xl"><FolderOpen size={20} /></div>
                <span className="text-slate-400 font-medium text-sm">Open</span>
              </div>
              <p className="text-3xl font-extrabold text-slate-700">{enquiryStats.open}</p>
              <div className="w-full h-1.5 bg-slate-200 rounded-full mt-4 overflow-hidden">
                <div className="h-full bg-orange-400 rounded-full" style={{ width: `${(enquiryStats.open/enquiryStats.total)*100}%` }}></div>
              </div>
            </div>

            {/* Stage 3 */}
            <div className="bg-[#F8FAFC] rounded-2xl p-6 border border-slate-100 relative group hover:border-red-300/50 transition-colors">
              <div className="hidden lg:block absolute -left-3 top-1/2 -translate-y-1/2 z-10 text-slate-300">
                <ArrowRight size={24} />
              </div>
              <div className="flex items-center justify-between mb-4">
                <div className="p-3 bg-red-50 text-red-500 rounded-xl"><Clock size={20} /></div>
                <span className="text-slate-400 font-medium text-sm">Pending</span>
              </div>
              <p className="text-3xl font-extrabold text-slate-700">{enquiryStats.pending}</p>
              <div className="w-full h-1.5 bg-slate-200 rounded-full mt-4 overflow-hidden">
                <div className="h-full bg-red-400 rounded-full" style={{ width: `${(enquiryStats.pending/enquiryStats.total)*100}%` }}></div>
              </div>
            </div>

            {/* Stage 4 */}
            <div className="bg-[#F8FAFC] rounded-2xl p-6 border border-slate-100 relative group hover:border-green-300/50 transition-colors">
              <div className="hidden lg:block absolute -left-3 top-1/2 -translate-y-1/2 z-10 text-slate-300">
                <ArrowRight size={24} />
              </div>
              <div className="flex items-center justify-between mb-4">
                <div className="p-3 bg-green-50 text-green-600 rounded-xl"><CheckCircle size={20} /></div>
                <span className="text-slate-400 font-medium text-sm">Closed</span>
              </div>
              <p className="text-3xl font-extrabold text-slate-700">{enquiryStats.closed}</p>
              <div className="w-full h-1.5 bg-slate-200 rounded-full mt-4 overflow-hidden">
                <div className="h-full bg-[#1CADA3] rounded-full" style={{ width: `${(enquiryStats.closed/enquiryStats.total)*100}%` }}></div>
              </div>
            </div>
          </div>
        </motion.div>

        {/* DSA NETWORK DIRECTORY (BENTO SPAN 12) */}
        <motion.div 
          variants={itemVariants}
          className="lg:col-span-12 bg-white rounded-[2rem] border border-slate-100 shadow-sm overflow-hidden flex flex-col"
        >
          {/* Header Section */}
          <div className="p-6 sm:p-8 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 border-b border-slate-100">
            <div className="flex items-center gap-4">
              <div className="w-14 h-14 bg-gradient-to-br from-blue-50 to-slate-50 border border-blue-100/50 rounded-2xl flex items-center justify-center text-[#2076C7] shadow-sm">
                <Users size={28} />
              </div>
              <div>
                <h3 className="text-xl font-extrabold text-slate-700 tracking-tight">DSA Directory</h3>
                <p className="text-slate-500 text-sm font-medium mt-0.5">Manage and monitor direct selling agents</p>
              </div>
            </div>
            <button className="w-full sm:w-auto px-5 py-2.5 bg-white border-2 border-slate-100 text-slate-600 font-bold rounded-xl hover:border-[#2076C7] hover:text-[#2076C7] transition-all shadow-sm flex items-center justify-center gap-2 group">
              Manage Directory <ArrowRight size={16} className="text-slate-400 group-hover:text-[#2076C7] transition-colors" />
            </button>
          </div>

          {/* ==================================================== */}
          {/* REDESIGNED METRICS GRID START */}
          {/* ==================================================== */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-px bg-slate-100 border-t border-slate-100">
            
            {/* Metric 1 */}
            <div className="bg-white p-8 flex flex-col justify-between">
              <div>
                <p className="text-slate-400 text-xs font-bold uppercase tracking-widest mb-1">Total Active</p>
                <h4 className="text-4xl font-light text-slate-800">{dsaTotal}</h4>
              </div>
              <div className="mt-6 flex items-center gap-2 text-xs font-semibold text-emerald-600">
                <ArrowUpRight size={14} /> <span>+4 this week</span>
              </div>
            </div>

            {/* Metric 2 */}
            <div className="bg-white p-8 flex flex-col justify-between">
              <div>
                <p className="text-slate-400 text-xs font-bold uppercase tracking-widest mb-1">Top Agent</p>
                <h4 className="text-lg font-bold text-slate-800">{topDsa.name}</h4>
              </div>
              <div className="mt-6 text-xs font-semibold text-slate-500">
                {topDsa.deals} verified closures
              </div>
            </div>

            {/* Metric 3 */}
            <div className="bg-white p-8 flex flex-col justify-between">
              <div>
                <p className="text-slate-400 text-xs font-bold uppercase tracking-widest mb-1">Pending</p>
                <h4 className="text-4xl font-light text-slate-800">{pendingDsa}</h4>
              </div>
              <button className="mt-6 text-xs font-bold text-[#2076C7] hover:underline flex items-center gap-1">
                Review queue <ArrowRight size={12} />
              </button>
            </div>

          </div>
          {/* ==================================================== */}
          {/* REDESIGNED METRICS GRID END */}
          {/* ==================================================== */}

          {/* Table Section */}
          <div className="p-6 sm:p-8 w-full overflow-x-auto">
            <div className="flex items-center justify-between mb-6">
              <h4 className="text-lg font-bold text-slate-700">Recent Activity</h4>
              <span className="text-xs font-bold text-slate-400 uppercase tracking-wider bg-slate-100 px-3 py-1.5 rounded-lg">Last 7 Days</span>
            </div>
            
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
                {dsaData.map((agent, index) => {
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
                        <div className="flex flex-col gap-1.5 items-start">
                          <span className={`px-2.5 py-1 rounded-md text-[10px] uppercase tracking-widest font-bold ${
                            agent.status === 'Active' ? 'bg-green-50 text-green-600 border border-green-100' : 'bg-orange-50 text-orange-500 border border-orange-100'
                          }`}>
                            {agent.status}
                          </span>
                          <span className="text-xs text-slate-500 font-medium bg-slate-100 px-2 py-0.5 rounded-md">{agent.type}</span>
                        </div>
                      </td>
                      <td className="py-4">
                        <div className="flex flex-col gap-2 pr-4">
                          <div className="flex items-center justify-between text-sm">
                            <span className="font-bold text-slate-700">{agent.closures} <span className="text-slate-400 font-normal">/ {agent.leads}</span></span>
                            <span className="text-xs font-bold text-slate-400">{closureRate}%</span>
                          </div>
                          <div className="w-full h-1.5 bg-slate-100 rounded-full overflow-hidden">
                            <div 
                              className={`h-full rounded-full ${agent.status === 'Active' ? 'bg-[#2076C7]' : 'bg-slate-300'}`} 
                              style={{ width: `${closureRate}%` }}
                            ></div>
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
                          <button className="p-2 text-slate-300 hover:text-[#2076C7] hover:bg-blue-50 rounded-lg transition-colors">
                            <ArrowRight size={18} />
                          </button>
                        </div>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </motion.div>

      </motion.div>
    </div>
  );
}