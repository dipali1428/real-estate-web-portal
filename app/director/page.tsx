"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { 
  Users, Mail, Clock, CheckCircle, LineChart as LineChartIcon, 
  FolderOpen, ArrowUpRight, Plus, Download, Filter,
  TrendingUp, BarChart3, PieChart as PieIcon, 
  Target, Zap, Globe, ArrowDownRight, MoreHorizontal,
  Activity, ShieldCheck, Map, Smartphone, MousePointer2,
  Calendar, Award, Briefcase, ZapOff, Layers, TableProperties
} from "lucide-react";

// Advanced Chart Imports
import { 
  AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, 
  ResponsiveContainer, BarChart, Bar, Cell, PieChart, Pie, 
  Legend, ComposedChart, Line, RadialBarChart, RadialBar,
  Radar, RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis,
  LineChart // Added LineChart for Power BI Sparklines
} from 'recharts';

import StatsCard from "../component/DashboardStatsCard";
import DashboardSectionHeader from "../component/DashboardSectionHeader";

// --- ADVANCED MOCK DATA ---
const leadSourceData = [
  { name: 'Organic Search', value: 400, color: '#2076C7' },
  { name: 'Social Media', value: 300, color: '#1CADA3' },
  { name: 'Referrals', value: 200, color: '#8B5CF6' },
  { name: 'Paid Ads', value: 278, color: '#F59E0B' },
  { name: 'Email Mktg', value: 189, color: '#EF4444' },
];

const agentPerformanceData = [
  { subject: 'Response Time', A: 120, B: 110, fullMark: 150 },
  { subject: 'Closing Rate', A: 98, B: 130, fullMark: 150 },
  { subject: 'Lead Quality', A: 86, B: 130, fullMark: 150 },
  { subject: 'Customer Sat', A: 99, B: 100, fullMark: 150 },
  { subject: 'Volume', A: 85, B: 90, fullMark: 150 },
  { subject: 'Upsell', A: 65, B: 85, fullMark: 150 },
];

const activityHeatmap = [
  { day: 'Mon', morning: 40, afternoon: 60, evening: 20 },
  { day: 'Tue', morning: 50, afternoon: 80, evening: 40 },
  { day: 'Wed', morning: 70, afternoon: 90, evening: 50 },
  { day: 'Thu', morning: 60, afternoon: 70, evening: 30 },
  { day: 'Fri', morning: 80, afternoon: 100, evening: 60 },
];

const performanceData = [
  { name: 'Week 1', enquiries: 400, conversions: 240, target: 300, revenue: 2400 },
  { name: 'Week 2', enquiries: 300, conversions: 198, target: 300, revenue: 1800 },
  { name: 'Week 3', enquiries: 600, conversions: 480, target: 450, revenue: 4200 },
  { name: 'Week 4', enquiries: 800, conversions: 600, target: 500, revenue: 5800 },
  { name: 'Week 5', enquiries: 500, conversions: 390, target: 400, revenue: 3100 },
  { name: 'Week 6', enquiries: 700, conversions: 510, target: 550, revenue: 4900 },
];

const funnelData = [
  { stage: 'Leads', value: 1000, fill: '#2076C7' },
  { stage: 'Qualified', value: 750, fill: '#3b82f6' },
  { stage: 'Quotation', value: 500, fill: '#60a5fa' },
  { stage: 'Negotiation', value: 300, fill: '#93c5fd' },
  { stage: 'Closed', value: 180, fill: '#1CADA3' },
];

// --- NEW POWER BI STYLE MOCK DATA ---
const regionalData = [
  { region: 'North America', revenue: 85000, target: 70000 },
  { region: 'Europe', revenue: 62000, target: 65000 },
  { region: 'Asia Pacific', revenue: 94000, target: 80000 },
  { region: 'Latin America', revenue: 31000, target: 35000 },
  { region: 'Middle East', revenue: 48000, target: 40000 },
];

const targetAchievementData = [
  { name: 'Background', value: 100, fill: '#f1f5f9' },
  { name: 'Current', value: 82, fill: '#2076C7' }
];

const marketShareData = [
  { name: 'Enterprise', value: 45, color: '#1E293B' },
  { name: 'Mid-Market', value: 35, color: '#334155' },
  { name: 'SMB', value: 20, color: '#64748B' },
];

const topAgents = [
  { name: 'Sarah Jenkins', role: 'Senior Director', sales: 1420, quota: 1200, trend: [100, 150, 120, 180, 240, 200] },
  { name: 'Michael Chen', role: 'Regional Lead', sales: 980, quota: 1000, trend: [120, 140, 180, 150, 200, 220] },
  { name: 'Emma Watson', role: 'Account Exec', sales: 1150, quota: 850, trend: [80, 120, 150, 140, 180, 190] },
  { name: 'James Rodriguez', role: 'Account Exec', sales: 890, quota: 800, trend: [50, 80, 120, 100, 150, 140] },
];

export default function Dashboard() {
  const [user] = useState("Director");
  const [loading, setLoading] = useState(true);

  const [dsaTotal] = useState(128);
  const [enquiryStats] = useState({
    total: 450,
    pending: 85,
    closed: 320,
    open: 45,
  });

  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 500);
    return () => clearTimeout(timer);
  }, []);

  if (loading) {
    return (
      <div className="flex h-screen items-center justify-center bg-gray-50">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-[#2076C7]"></div>
      </div>
    );
  }

  const containerVariants = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: { staggerChildren: 0.1 }
    }
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    show: { y: 0, opacity: 1 }
  };

  return (
    <div className="min-h-screen bg-[#F8FAFC] p-4 sm:p-8">
      {/* HEADER SECTION */}
      <header className="mb-8 flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div>
          <motion.h1 
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="text-2xl sm:text-3xl font-bold text-slate-800"
          >
            Dashboard Overview
          </motion.h1>
          <p className="text-slate-500 mt-1">Welcome back, {user}. Here is your performance summary.</p>
        </div>
        
        <div className="flex items-center gap-3">
          <button className="flex items-center gap-2 px-4 py-2 bg-white border border-slate-200 rounded-lg text-sm font-medium text-slate-600 hover:bg-slate-50 transition-all shadow-sm">
            <Download size={16} /> Export Report
          </button>
          <button className="flex items-center gap-2 px-4 py-2 bg-[#2076C7] text-white rounded-lg text-sm font-medium hover:bg-[#1a5fa1] transition-all shadow-md">
            <Plus size={16} /> New Enquiry
          </button>
        </div>
      </header>

      {/* WELCOME BANNER & PRIMARY KPI */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          className="lg:col-span-2 relative overflow-hidden bg-linear-to-br from-[#2076C7] to-[#1CADA3] rounded-2xl p-8 text-white shadow-xl shadow-blue-100"
        >
          <div className="relative z-10 flex flex-col h-full justify-center">
            <h2 className="text-2xl sm:text-3xl font-bold mb-2">Systems are running smooth.</h2>
            <p className="opacity-90 max-w-md mb-6">
              You have {enquiryStats.open} new enquiries today. Check the pending tasks to keep the response rate high.
            </p>
            <div className="flex gap-4">
              <div className="bg-white/20 backdrop-blur-md rounded-lg p-3 px-5 border border-white/20">
                <p className="text-xs uppercase tracking-wider opacity-80">Conversion</p>
                <p className="text-xl font-bold">71.2%</p>
              </div>
              <div className="bg-white/20 backdrop-blur-md rounded-lg p-3 px-5 border border-white/20">
                <p className="text-xs uppercase tracking-wider opacity-80">Active DSAs</p>
                <p className="text-xl font-bold">{dsaTotal}</p>
              </div>
            </div>
          </div>
          <div className="absolute top-[-20%] right-[-10%] w-64 h-64 bg-white/10 rounded-full blur-3xl" />
        </motion.div>

        <motion.div 
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          className="bg-white rounded-2xl p-6 shadow-sm border border-slate-100 flex flex-col justify-between"
        >
          <div className="flex justify-between items-start">
            <div className="p-3 bg-purple-50 rounded-xl text-purple-600">
              <LineChartIcon size={24} />
            </div>
            <span className="flex items-center text-green-500 text-sm font-medium bg-green-50 px-2 py-1 rounded-full leading-none">
              <ArrowUpRight size={14} className="mr-1" /> +12%
            </span>
          </div>
          <div>
            <h3 className="text-slate-500 font-medium">Monthly Response Rate</h3>
            <p className="text-3xl font-bold text-slate-800 mt-1">
               {enquiryStats.total > 0 ? `${Math.round((enquiryStats.closed / enquiryStats.total) * 100)}%` : "0%"}
            </p>
            <div className="w-full bg-slate-100 h-2 rounded-full mt-4 overflow-hidden">
               <div 
                 className="h-full bg-purple-500" 
                 style={{ width: `${Math.round((enquiryStats.closed / enquiryStats.total) * 100)}%` }}
               />
            </div>
          </div>
        </motion.div>
      </div>

      {/* STATS GRID */}
      <motion.section variants={containerVariants} initial="hidden" animate="show" className="space-y-8">
        <div>
          <div className="flex items-center justify-between mb-4">
            <DashboardSectionHeader title="Performance Metrics" />
            <div className="flex items-center gap-2 text-sm text-slate-500"><Filter size={14} /> <span>Last 30 Days</span></div>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            <motion.div variants={itemVariants}><StatsCard title="Total Enquiries" value={enquiryStats.total} icon={<Mail size={22} />} subtitle="Across all channels" color="blue" /></motion.div>
            <motion.div variants={itemVariants}><StatsCard title="New & Open" value={enquiryStats.open} icon={<FolderOpen size={22} />} subtitle="Needs attention" color="orange" /></motion.div>
            <motion.div variants={itemVariants}><StatsCard title="Awaiting Follow-up" value={enquiryStats.pending} icon={<Clock size={22} />} subtitle="Pending action" color="red" /></motion.div>
            <motion.div variants={itemVariants}><StatsCard title="Successfully Closed" value={enquiryStats.closed} icon={<CheckCircle size={22} />} subtitle="Resolved enquiries" color="green" /></motion.div>
          </div>
        </div>

        <motion.div variants={itemVariants} className="bg-white rounded-2xl border border-slate-100 shadow-sm p-6 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="flex items-center gap-4">
            <div className="p-4 bg-blue-50 rounded-2xl text-[#2076C7]"><Users size={32} /></div>
            <div>
              <h3 className="text-lg font-bold text-slate-800">Direct Selling Agents (DSA)</h3>
              <p className="text-slate-500">Manage your active network and onboarding</p>
            </div>
          </div>
          <div className="flex items-center gap-8 px-6">
             <div className="text-center">
                <p className="text-2xl font-bold text-[#2076C7]">{dsaTotal}</p>
                <p className="text-xs text-slate-400 uppercase font-semibold tracking-tighter">Total Members</p>
             </div>
             <div className="h-10 w-[1px] bg-slate-100" />
             <button className="text-[#2076C7] font-semibold text-sm hover:underline flex items-center gap-1">View Network <ArrowUpRight size={16} /></button>
          </div>
        </motion.div>

        {/* --- STRATEGIC INSIGHTS (Executive Revenue Forecast Swapped Here) --- */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mt-12">
            <motion.div variants={itemVariants} className="bg-white p-6 rounded-2xl border border-slate-100 shadow-sm lg:col-span-2">
              <div className="flex items-center justify-between mb-8">
                <div className="flex items-center gap-3">
                  <div className="p-2 bg-blue-50 text-[#2076C7] rounded-lg"><TrendingUp size={18} /></div>
                  <div>
                    <h3 className="font-bold text-slate-800">Executive Revenue Forecast</h3>
                    <p className="text-xs text-slate-400">Projected vs Actual Performance</p>
                  </div>
                </div>
              </div>

              <div className="h-[350px] w-full">
                <ResponsiveContainer width="100%" height="100%">
                  <ComposedChart data={performanceData}>
                    <defs>
                      <linearGradient id="colorRev" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%" stopColor="#2076C7" stopOpacity={0.2}/>
                        <stop offset="95%" stopColor="#2076C7" stopOpacity={0}/>
                      </linearGradient>
                    </defs>
                    <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                    <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{fill: '#94a3b8', fontSize: 11}} dy={10} />
                    <YAxis axisLine={false} tickLine={false} tick={{fill: '#94a3b8', fontSize: 11}} />
                    <Tooltip contentStyle={{ borderRadius: '12px', border: 'none', boxShadow: '0 20px 25px -5px rgba(0,0,0,0.1)' }} />
                    <Legend verticalAlign="top" align="right" iconType="circle" wrapperStyle={{paddingBottom: '20px', fontSize: '12px'}} />
                    <Area type="monotone" dataKey="revenue" name="Total Revenue" fill="url(#colorRev)" stroke="none" />
                    <Bar dataKey="conversions" name="Actual Sales" fill="#1CADA3" radius={[4, 4, 0, 0]} barSize={40} />
                    <Line type="stepAfter" dataKey="target" name="Quota Target" stroke="#F59E0B" strokeWidth={2} strokeDasharray="5 5" dot={false} />
                  </ComposedChart>
                </ResponsiveContainer>
              </div>
            </motion.div>
        </div>

        {/* --- OPERATIONAL VELOCITY SECTION --- */}
        <div className="grid grid-cols-1 xl:grid-cols-3 gap-8 mt-8">
            <motion.div variants={itemVariants} className="bg-white p-6 rounded-2xl border border-slate-100 shadow-sm">
                <h3 className="font-bold text-slate-800 mb-6">Lead Acquisition Channels</h3>
                <div className="h-[250px] w-full">
                    <ResponsiveContainer width="100%" height="100%">
                        <PieChart>
                            <Pie data={leadSourceData} cx="50%" cy="50%" innerRadius={60} outerRadius={80} paddingAngle={8} dataKey="value">
                                {leadSourceData.map((entry, index) => (<Cell key={`cell-${index}`} fill={entry.color} />))}
                            </Pie>
                            <Tooltip />
                        </PieChart>
                    </ResponsiveContainer>
                </div>
                <div className="space-y-3 mt-4">
                    {leadSourceData.map((item) => (
                        <div key={item.name} className="flex items-center justify-between">
                            <div className="flex items-center gap-2"><div className="w-2 h-2 rounded-full" style={{ backgroundColor: item.color }} /><span className="text-xs font-medium text-slate-600">{item.name}</span></div>
                            <span className="text-xs font-bold text-slate-800">{Math.round((item.value / 1445) * 100)}%</span>
                        </div>
                    ))}
                </div>
            </motion.div>

            <motion.div variants={itemVariants} className="xl:col-span-2 bg-white p-6 rounded-2xl border border-slate-100 shadow-sm">
                <div className="flex justify-between items-center mb-8">
                    <div><h3 className="font-bold text-slate-800">System Activity Heatmap</h3><p className="text-xs text-slate-400">Peak enquiry hours by time of day</p></div>
                    <div className="flex items-center gap-4 text-[10px] font-bold uppercase">
                        <div className="flex items-center gap-1"><div className="w-2 h-2 bg-blue-200 rounded-sm" /> Morning</div>
                        <div className="flex items-center gap-1"><div className="w-2 h-2 bg-blue-400 rounded-sm" /> Afternoon</div>
                        <div className="flex items-center gap-1"><div className="w-2 h-2 bg-blue-600 rounded-sm" /> Evening</div>
                    </div>
                </div>
                <div className="h-[300px] w-full">
                    <ResponsiveContainer width="100%" height="100%">
                        <BarChart data={activityHeatmap} layout="vertical" barGap={8}>
                            <XAxis type="number" hide />
                            <YAxis dataKey="day" type="category" axisLine={false} tickLine={false} tick={{fill: '#64748b', fontSize: 12}} width={40} />
                            <Tooltip cursor={{fill: 'transparent'}} contentStyle={{ borderRadius: '12px', border: 'none'}} />
                            <Bar dataKey="morning" stackId="a" fill="#BFDBFE" radius={[0, 0, 0, 0]} barSize={24} />
                            <Bar dataKey="afternoon" stackId="a" fill="#60A5FA" />
                            <Bar dataKey="evening" stackId="a" fill="#2563EB" radius={[0, 4, 4, 0]} />
                        </BarChart>
                    </ResponsiveContainer>
                </div>
            </motion.div>
        </div>

        {/* --- PERFORMANCE INTELLIGENCE (Operational Capability Swapped Here) --- */}
        <div className="mt-12 space-y-8">
          <div><h2 className="text-xl font-bold text-slate-800">Deep-Dive Analytics</h2><p className="text-sm text-slate-500">Financial and conversion forensics</p></div>

          <div className="grid grid-cols-1 xl:grid-cols-3 gap-8 pb-12">
            <motion.div variants={itemVariants} className="bg-white p-6 rounded-2xl border border-slate-100 shadow-sm xl:col-span-2">
                <div className="flex justify-between items-start mb-6">
                    <div><h3 className="font-bold text-slate-800">Operational Capability</h3><p className="text-xs text-slate-400">Comparison of Top Two Agent Teams</p></div>
                    <div className="p-2 bg-purple-50 text-purple-600 rounded-lg"><ShieldCheck size={18} /></div>
                </div>
                <div className="h-[350px] w-full">
                    <ResponsiveContainer width="100%" height="100%">
                        <RadarChart cx="50%" cy="50%" outerRadius="80%" data={agentPerformanceData}>
                            <PolarGrid stroke="#e2e8f0" />
                            <PolarAngleAxis dataKey="subject" tick={{fill: '#64748b', fontSize: 11}} />
                            <PolarRadiusAxis angle={30} domain={[0, 150]} tick={false} axisLine={false} />
                            <Radar name="North Team" dataKey="A" stroke="#2076C7" fill="#2076C7" fillOpacity={0.5} />
                            <Radar name="South Team" dataKey="B" stroke="#1CADA3" fill="#1CADA3" fillOpacity={0.5} />
                            <Legend iconType="circle" wrapperStyle={{fontSize: '12px', paddingTop: '20px'}} />
                        </RadarChart>
                    </ResponsiveContainer>
                </div>
            </motion.div>

            {/* Conversion Funnel */}
            <motion.div variants={itemVariants} className="bg-white p-6 rounded-2xl border border-slate-100 shadow-sm flex flex-col">
              <div className="flex items-center gap-3 mb-8">
                <div className="p-2 bg-orange-50 text-orange-500 rounded-lg"><Target size={18} /></div>
                <div><h3 className="font-bold text-slate-800">Conversion Funnel</h3><p className="text-xs text-slate-400">Lead to Close Ratio</p></div>
              </div>
              <div className="flex-1 space-y-4">
                {funnelData.map((item, idx) => (
                  <div key={item.stage} className="relative">
                    <div className="flex justify-between items-center mb-1"><span className="text-xs font-bold text-slate-600 uppercase tracking-tight">{item.stage}</span><span className="text-xs font-bold text-slate-800">{item.value}</span></div>
                    <div className="w-full bg-slate-50 h-3 rounded-full overflow-hidden">
                      <motion.div initial={{ width: 0 }} whileInView={{ width: `${(item.value / 1000) * 100}%` }} transition={{ duration: 1, delay: idx * 0.1 }} className="h-full rounded-full" style={{ backgroundColor: item.fill }} />
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>
          </div>
        </div>

        {/* --- POWER BI STYLE EXTENSIONS --- */}
        <div className="mt-12 space-y-8 pb-16 border-t border-slate-200 pt-12">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-slate-800 text-white rounded-lg"><Layers size={18} /></div>
            <div>
              <h2 className="text-xl font-bold text-slate-800">Business Intelligence Matrix</h2>
              <p className="text-sm text-slate-500">Advanced organizational KPIs and matrices</p>
            </div>
          </div>

          <div className="grid grid-cols-1 xl:grid-cols-4 gap-8">
            
            {/* KPI Gauge Chart (Power BI Classic) */}
            <motion.div variants={itemVariants} className="bg-white p-6 rounded-2xl border border-slate-100 shadow-sm flex flex-col items-center justify-between">
              <div className="self-start w-full flex justify-between items-center mb-4">
                <h3 className="font-bold text-slate-800 text-sm">Quarterly Quota Target</h3>
                <MoreHorizontal size={16} className="text-slate-400" />
              </div>
              <div className="h-[180px] w-full relative">
                <ResponsiveContainer width="100%" height="100%">
                  <RadialBarChart 
                    cx="50%" cy="60%" innerRadius="70%" outerRadius="100%" 
                    barSize={16} data={targetAchievementData} 
                    startAngle={180} endAngle={0}
                  >
                    <PolarAngleAxis type="number" domain={[0, 100]} angleAxisId={0} tick={false} />
                    <RadialBar background dataKey="value" cornerRadius={10} />
                  </RadialBarChart>
                </ResponsiveContainer>
                <div className="absolute inset-0 flex flex-col items-center justify-center pt-8 pointer-events-none">
                  <span className="text-4xl font-extrabold text-slate-800 tracking-tight">82%</span>
                  <span className="text-xs font-semibold text-green-500 bg-green-50 px-2 py-0.5 rounded-full mt-1">On Track</span>
                </div>
              </div>
            </motion.div>

            {/* Regional Combo Chart */}
            <motion.div variants={itemVariants} className="bg-white p-6 rounded-2xl border border-slate-100 shadow-sm xl:col-span-2">
              <div className="flex justify-between items-center mb-6">
                <div>
                  <h3 className="font-bold text-slate-800 text-sm">Regional Revenue vs. Target</h3>
                  <p className="text-xs text-slate-400 mt-1">Global territory performance breakdown</p>
                </div>
              </div>
              <div className="h-[200px] w-full">
                <ResponsiveContainer width="100%" height="100%">
                  <ComposedChart layout="vertical" data={regionalData} margin={{ top: 0, right: 20, bottom: 0, left: 0 }}>
                    <CartesianGrid strokeDasharray="3 3" horizontal={true} vertical={false} stroke="#f1f5f9" />
                    <XAxis type="number" hide />
                    <YAxis dataKey="region" type="category" axisLine={false} tickLine={false} tick={{fill: '#64748b', fontSize: 11}} width={90} />
                    <Tooltip cursor={{fill: '#f8fafc'}} contentStyle={{ borderRadius: '8px', border: 'none', boxShadow: '0 10px 15px -3px rgba(0,0,0,0.1)' }} />
                    <Bar dataKey="revenue" name="Actual Revenue" fill="#2076C7" barSize={16} radius={[0, 4, 4, 0]} />
                    <Line dataKey="target" type="step" name="Target Objective" stroke="#EF4444" strokeWidth={2} dot={false} />
                  </ComposedChart>
                </ResponsiveContainer>
              </div>
            </motion.div>

            {/* Market Segment Donut */}
            <motion.div variants={itemVariants} className="bg-white p-6 rounded-2xl border border-slate-100 shadow-sm">
              <h3 className="font-bold text-slate-800 text-sm mb-2">Market Share Segment</h3>
              <div className="h-[180px] w-full">
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie 
                      data={marketShareData} cx="50%" cy="50%" 
                      innerRadius={50} outerRadius={70} 
                      paddingAngle={2} dataKey="value"
                      stroke="none"
                    >
                      {marketShareData.map((entry, index) => (<Cell key={`cell-${index}`} fill={entry.color} />))}
                    </Pie>
                    <Tooltip contentStyle={{ borderRadius: '8px', border: 'none', fontSize: '12px' }} />
                  </PieChart>
                </ResponsiveContainer>
              </div>
              <div className="flex flex-wrap gap-2 justify-center mt-2">
                {marketShareData.map(item => (
                  <div key={item.name} className="flex items-center gap-1.5 text-[10px] font-semibold text-slate-600 uppercase tracking-wider">
                    <div className="w-2 h-2 rounded-sm" style={{ backgroundColor: item.color }} />
                    {item.name}
                  </div>
                ))}
              </div>
            </motion.div>

          </div>

          {/* Matrix Visual (Power BI Table with Sparklines & Data Bars) */}
          <motion.div variants={itemVariants} className="bg-white rounded-2xl border border-slate-100 shadow-sm overflow-hidden">
             <div className="p-6 border-b border-slate-100 flex items-center gap-3">
               <div className="p-2 bg-indigo-50 text-indigo-600 rounded-lg"><TableProperties size={18} /></div>
               <div>
                 <h3 className="font-bold text-slate-800">Agent Performance Matrix</h3>
                 <p className="text-xs text-slate-400">Detailed quota attainment and rolling trends</p>
               </div>
             </div>
             <div className="overflow-x-auto">
               <table className="w-full text-left border-collapse">
                 <thead>
                   <tr className="bg-slate-50 text-xs uppercase tracking-wider text-slate-500 border-b border-slate-200">
                     <th className="px-6 py-4 font-semibold">Agent Name</th>
                     <th className="px-6 py-4 font-semibold">Role / Title</th>
                     <th className="px-6 py-4 font-semibold text-right">Sales YTD</th>
                     <th className="px-6 py-4 font-semibold">Quota Attainment</th>
                     <th className="px-6 py-4 font-semibold">6-Mo Trend</th>
                   </tr>
                 </thead>
                 <tbody className="divide-y divide-slate-100">
                   {topAgents.map((agent) => {
                     const percent = Math.min((agent.sales / agent.quota) * 100, 100);
                     const isOvertarget = agent.sales > agent.quota;
                     return (
                       <tr key={agent.name} className="hover:bg-slate-50/50 transition-colors">
                         <td className="px-6 py-4 font-bold text-slate-800 text-sm">{agent.name}</td>
                         <td className="px-6 py-4 text-sm text-slate-500">{agent.role}</td>
                         <td className="px-6 py-4 font-bold text-[#2076C7] text-right text-sm">
                           ${agent.sales.toLocaleString()}
                         </td>
                         <td className="px-6 py-4 w-[250px]">
                           <div className="flex flex-col gap-1.5">
                             <div className="flex justify-between items-center text-xs font-semibold">
                               <span className={isOvertarget ? "text-green-600" : "text-slate-600"}>
                                 {Math.round(percent)}%
                               </span>
                               <span className="text-slate-400">${agent.quota.toLocaleString()}</span>
                             </div>
                             <div className="w-full h-1.5 bg-slate-100 rounded-full overflow-hidden">
                               <div 
                                 className={`h-full rounded-full ${isOvertarget ? "bg-green-500" : "bg-[#1CADA3]"}`} 
                                 style={{ width: `${percent}%` }}
                               ></div>
                             </div>
                           </div>
                         </td>
                         <td className="px-6 py-4 w-40 h-16">
                            <ResponsiveContainer width="100%" height="100%">
                              <LineChart data={agent.trend.map((val, i) => ({ val, i }))}>
                                <Line 
                                  type="monotone"
                                  dataKey="val" 
                                  stroke={isOvertarget ? "#10B981" : "#8B5CF6"} 
                                  strokeWidth={2} 
                                  dot={false} 
                                />
                              </LineChart>
                            </ResponsiveContainer>
                         </td>
                       </tr>
                     );
                   })}
                 </tbody>
               </table>
             </div>
          </motion.div>
        </div>

      </motion.section>
    </div>
  );
}