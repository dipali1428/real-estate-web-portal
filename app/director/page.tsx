"use client";

import { useState, useEffect, useRef } from "react";
import { motion } from "framer-motion";
import { AdminService } from "../services/adminService";
import { useRouter } from "next/navigation";
import { getToken, isTokenExpired } from "../lib/auth-token";

import {
  Users, Clock, CheckCircle, LineChart as LineChartIcon,
  FolderOpen,
  Ticket, UserCheck, UserPlus, MessageSquare
} from "lucide-react";

import {
  ResponsiveContainer, BarChart, Bar, PieChart, Pie,
  Legend,
  Radar, RadarChart, PolarGrid, PolarAngleAxis, XAxis, YAxis, Tooltip, Cell,
} from 'recharts';

import StatsCard from "../component/DashboardStatsCard";
import DashboardSectionHeader from "../component/DashboardSectionHeader";

// --- TYPES ---
interface Enquiry {
  status: "Pending" | "Closed" | "Open";
}

const leadDepartmentData = [
  { name: 'Loans', value: 450, color: '#6366f1' },        // Indigo
  { name: 'Insurance', value: 380, color: '#0ea5e9' },    // Sky
  { name: 'Mutual Funds', value: 320, color: '#10b981' }, // Emerald
  { name: 'Investments', value: 210, color: '#f59e0b' },  // Amber
  { name: 'Real Estate', value: 185, color: '#8b5cf6' },  // Violet
];

// Calculate total for dynamic percentages
const totalLeads = leadDepartmentData.reduce((acc, curr) => acc + curr.value, 0);

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

const funnelData = [
  { stage: 'Leads', value: 1000, fill: '#2076C7' },
  { stage: 'Qualified', value: 750, fill: '#3b82f6' },
  { stage: 'Quotation', value: 500, fill: '#60a5fa' },
  { stage: 'Negotiation', value: 300, fill: '#93c5fd' },
  { stage: 'Closed', value: 180, fill: '#1CADA3' },
];

export default function Dashboard() {
  const [user, setUser] = useState("");
  const [loading, setLoading] = useState(true);
  const [dsaTotal, setDsaTotal] = useState(0);

  const [stats, setStats] = useState({
    totalEnquiries: 0,
    ticketsRaised: 0,
    openLeads: 0,
    closedLeads: 0,
    kycCompleted: 0,
    referralLeads: 0,
    detailLeads: 0,
    pendingFollowUp: 0
  });

  const router = useRouter();
  const hasFetched = useRef(false);

  const fetchDashboardData = async () => {
    try {
      const token = getToken();
      if (!token || isTokenExpired(token)) {
        router.push("/");
        return;
      }

      // 👥 DSA LIST API
      const dsaResponse = await AdminService.dsaList();
      const dsaList = dsaResponse?.data || [];

      setDsaTotal(dsaResponse?.count || 0);

      // 📩 CONTACT US API
      const enquiryResponse = await AdminService.contactusData();
      const enquiries = enquiryResponse?.contactus || [];

      // 🎯 MAP DATA PROPERLY
      setStats({
        totalEnquiries: enquiryResponse?.count || 0,

        openLeads: enquiries.filter((e: Enquiry) => e.status === "Open").length,

        closedLeads: enquiries.filter((e: Enquiry) => e.status === "Closed").length,

        pendingFollowUp: enquiries.filter((e: Enquiry) => e.status === "Pending").length,

        // 👇 OPTIONAL (depends on your backend fields)
        ticketsRaised: enquiries.filter((e: any) => e.type === "ticket").length || 0,

        kycCompleted: dsaList.filter((d: any) => d.kycStatus === "Approved").length || 0,

        referralLeads: enquiries.filter((e: any) => e.source === "referral").length || 0,

        detailLeads: enquiries.filter((e: any) => e.detailsFilled === true).length || 0,
      });

    } catch (error: any) {

      if (error?.response?.status === 401) {
        router.push("/");
      }
    }
  };

  useEffect(() => {
    if (!hasFetched.current) {
      hasFetched.current = true;
      setLoading(true);
      fetchDashboardData().then(() => setLoading(false));
    }
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
    show: { opacity: 1, transition: { staggerChildren: 0.05 } }
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    show: { y: 0, opacity: 1 }
  };

  return (
    <div className="min-h-screen bg-[#F8FAFC] p-4 sm:p-8">
      <header className="mb-8 flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div>
          <motion.h1
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="text-2xl sm:text-3xl font-bold text-slate-800"
          >
            Dashboard Overview
          </motion.h1>
          <p className="text-slate-500 mt-1">Welcome back, Director.</p>
        </div>
      </header>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          className="lg:col-span-2 relative overflow-hidden bg-linear-to-br from-[#2076C7] to-[#1CADA3] rounded-2xl p-8 text-white shadow-xl shadow-blue-100">
          <div className="relative z-10 flex flex-col h-full justify-center">
            <h2 className="text-2xl sm:text-3xl font-bold mb-2">Systems are running smooth.</h2>
            <p className="opacity-90 max-w-md mb-6">
              You have {stats.openLeads} active leads requiring attention today.
            </p>
            <div className="flex gap-4">
              <div className="bg-white/20 backdrop-blur-md rounded-lg p-3 px-5 border border-white/20">
                <p className="text-xs uppercase tracking-wider opacity-80">KYC Success</p>
                <p className="text-xl font-bold">0%</p>
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
          className="bg-white rounded-2xl p-6 shadow-sm border border-slate-100 flex flex-col justify-between">
          <div className="flex justify-between items-start">
            <div className="p-3 bg-purple-50 rounded-xl text-purple-600">
              <LineChartIcon size={24} />
            </div>
          </div>
          <div>
            <h3 className="text-slate-500 font-medium">Lead Conversion Rate</h3>
            <p className="text-3xl font-bold text-slate-800 mt-1">
              {stats.totalEnquiries > 0 ? `${Math.round((stats.closedLeads / stats.totalEnquiries) * 100)}%` : "0%"}
            </p>
            <div className="w-full bg-slate-100 h-2 rounded-full mt-4 overflow-hidden">
              <div
                className="h-full bg-purple-500"
                style={{ width: stats.totalEnquiries > 0 ? `${(stats.closedLeads / stats.totalEnquiries) * 100}%` : '0%' }}
              />
            </div>
          </div>
        </motion.div>
      </div>

      <motion.section variants={containerVariants} initial="hidden" animate="show" className="space-y-8">
        <div>
          <div className="flex items-center justify-between mb-6">
            <DashboardSectionHeader title="Performance Metrics" />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            <motion.div variants={itemVariants}>
              <StatsCard title="Total Enquiries" value={stats.totalEnquiries} icon={<MessageSquare size={22} />} subtitle="All inbound channels" color="blue" />
            </motion.div>
            <motion.div variants={itemVariants}>
              <StatsCard title="Tickets Raised (Pending)" value={stats.ticketsRaised} icon={<Ticket size={22} />} subtitle="Support queries" color="red" />
            </motion.div>
            <motion.div variants={itemVariants}>
              <StatsCard title="Open Leads (Pending)" value={stats.openLeads} icon={<FolderOpen size={22} />} subtitle="In active pipeline" color="orange" />
            </motion.div>
            <motion.div variants={itemVariants}>
              <StatsCard title="Closed Leads" value={stats.closedLeads} icon={<CheckCircle size={22} />} subtitle="Successfully converted" color="green" />
            </motion.div>
            <motion.div variants={itemVariants}>
              <StatsCard title="KYC Completed (Pending)" value={stats.kycCompleted} icon={<UserCheck size={22} />} subtitle="Verified customers" color="indigo" />
            </motion.div>
            <motion.div variants={itemVariants}>
              <StatsCard title="Referral Leads (Pending)" value={stats.referralLeads} icon={<UserPlus size={22} />} subtitle="Via DSA network" color="purple" />
            </motion.div>
            <motion.div variants={itemVariants} className="sm:col-span-1 lg:col-span-2">
              <StatsCard title="Pending Follow-ups (Pending)" value={stats.pendingFollowUp} icon={<Clock size={22} />} subtitle="Awaiting action" color="cyan" />
            </motion.div>
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
          </div>
        </motion.div>

        <div className="grid grid-cols-1 xl:grid-cols-3 gap-8 mt-8">
          <motion.div variants={itemVariants} className="bg-white p-6 rounded-2xl border border-slate-100 shadow-sm">
            <div className="mb-6">
              <h3 className="font-bold text-slate-800">Department Acquisition</h3>
              <p className="text-xs text-slate-400">Distribution across business units</p>
            </div>

            <div className="h-[250px] w-full">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={leadDepartmentData}
                    cx="50%"
                    cy="50%"
                    innerRadius={70}
                    outerRadius={90}
                    paddingAngle={8}
                    dataKey="value"
                      cornerRadius={5} 
                  >
                    {leadDepartmentData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                  <Tooltip
                    contentStyle={{ borderRadius: '12px', border: 'none', boxShadow: '0 4px 12px rgba(0,0,0,0.1)' }}
                  />
                </PieChart>
              </ResponsiveContainer>
            </div>

            <div className="space-y-3 mt-4">
              {leadDepartmentData.map((item) => (
                <div key={item.name} className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <div
                      className="w-2.5 h-2.5 rounded-full"
                      style={{ backgroundColor: item.color }}
                    />
                    <span className="text-xs font-medium text-slate-600">{item.name}</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <span className="text-[10px] text-slate-400 font-mono">{item.value}</span>
                    <span className="text-xs font-bold text-slate-800 w-8 text-right">
                      {Math.round((item.value / totalLeads) * 100)}%
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </motion.div>

          <motion.div variants={itemVariants} className="xl:col-span-2 bg-white p-6 rounded-2xl border border-slate-100 shadow-sm">
            <h3 className="font-bold text-slate-800 mb-8">System Activity Heatmap</h3>
            <div className="h-[300px] w-full">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={activityHeatmap} layout="vertical">
                  <XAxis type="number" hide />
                  <YAxis dataKey="day" type="category" axisLine={false} tickLine={false} tick={{ fill: '#64748b' }} width={40} />
                  <Tooltip cursor={{ fill: 'transparent' }} />
                  <Bar dataKey="morning" stackId="a" fill="#BFDBFE" />
                  <Bar dataKey="afternoon" stackId="a" fill="#60A5FA" />
                  <Bar dataKey="evening" stackId="a" fill="#2563EB" radius={[0, 4, 4, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </motion.div>
        </div>

        <div className="mt-12 space-y-8">
          <h2 className="text-xl font-bold text-slate-800">Deep-Dive Analytics</h2>
          <div className="grid grid-cols-1 xl:grid-cols-3 gap-8 pb-12">
            <motion.div variants={itemVariants} className="bg-white p-6 rounded-2xl border border-slate-100 shadow-sm xl:col-span-2">
              <h3 className="font-bold text-slate-800 mb-6">Operational Capability</h3>
              <div className="h-[350px] w-full">
                <ResponsiveContainer width="100%" height="100%">
                  <RadarChart cx="50%" cy="50%" outerRadius="80%" data={agentPerformanceData}>
                    <PolarGrid stroke="#e2e8f0" />
                    <PolarAngleAxis dataKey="subject" tick={{ fill: '#64748b', fontSize: 11 }} />
                    <Radar name="North Team" dataKey="A" stroke="#2076C7" fill="#2076C7" fillOpacity={0.5} />
                    <Radar name="South Team" dataKey="B" stroke="#1CADA3" fill="#1CADA3" fillOpacity={0.5} />
                    <Legend iconType="circle" />
                  </RadarChart>
                </ResponsiveContainer>
              </div>
            </motion.div>

            <motion.div variants={itemVariants} className="bg-white p-6 rounded-2xl border border-slate-100 shadow-sm flex flex-col">
              <h3 className="font-bold text-slate-800 mb-8">Conversion Funnel</h3>
              <div className="flex-1 space-y-4">
                {funnelData.map((item, idx) => (
                  <div key={item.stage} className="relative">
                    <div className="flex justify-between items-center mb-1"><span className="text-xs font-bold text-slate-600 uppercase">{item.stage}</span><span className="text-xs font-bold text-slate-800">{item.value}</span></div>
                    <div className="w-full bg-slate-50 h-3 rounded-full overflow-hidden">
                      <motion.div initial={{ width: 0 }} whileInView={{ width: `${(item.value / 1000) * 100}%` }} className="h-full rounded-full" style={{ backgroundColor: item.fill }} />
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>
          </div>
        </div>
      </motion.section>
    </div>
  );
}