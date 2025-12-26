"use client";

import { useState, useEffect, useRef } from "react";
import { motion } from "framer-motion";
import { DepartmentHeadService } from "../services/departmentHeadService"; // Updated Import
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
import StatsCard from "../admin/components/DashboardStatsCard";
import DashboardSectionHeader from "../admin/components/DashboardSectionHeader";

import { Users, Mail, Clock, CheckCircle, LineChart, FolderOpen, UserCheck } from "lucide-react";

// Updated Interface based on typical Lead structures
interface Lead {
  status: string; // e.g., "Pending", "Closed", "Open", "Follow-up"
}

export default function Dashboard() {
  const [user, setUser] = useState("");
  const [loading, setLoading] = useState(true);
  const [rmCount, setRmCount] = useState(0); // Changed from dsaTotal

  const [leadStats, setLeadStats] = useState({
    total: 0,
    new: 0,      // Added this
    pending: 0,
    closed: 0,
    open: 0,
  });

  const router = useRouter();
  const hasFetched = useRef(false);

  const fetchDashboardData = async () => {
    try {
      const token = document.cookie.match(/authToken=([^;]+)/)?.[1];
      if (!token) return router.push("/");

      // 1. Fetch Profile
      const profile = await DepartmentHeadService.getDepartmentProfile();
      setUser(profile?.name || profile?.user?.name || "Department Head");

      // 2. Fetch Relationship Managers (Updated logic here)
      const rmData = await DepartmentHeadService.getRelationshipManagers();
      // According to your log: rmData.total = 2 or rmData.rms.length = 2
      setRmCount(rmData?.total || rmData?.rms?.length || 0);

      // 3. Fetch Leads
      const leadsResponse = await DepartmentHeadService.getDepartmentLeads();

      // Check if leads follow a similar pattern (likely leadsResponse.leads)
      const leads = leadsResponse?.leads || (Array.isArray(leadsResponse) ? leadsResponse : []);

      setLeadStats({
  total: leadsResponse?.total || leads.length,
  new: leads.filter((l: any) => l.status?.toLowerCase() === "new").length, // Added filter for 'new'
  pending: leads.filter((l: any) => l.status?.toLowerCase() === "pending").length,
  closed: leads.filter((l: any) => l.status?.toLowerCase() === "closed").length,
  open: leads.filter((l: any) => l.status?.toLowerCase() === "open").length,
});

    } catch (error: any) {
      console.error("Dashboard Fetch Error:", error);
      toast.error("Failed to fetch dashboard data.");
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
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  return (
    <div className="flex-1 p-4 sm:p-6">
      <motion.div
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="bg-linear-to-r from-[#2076C7] to-[#1CADA3] rounded-2xl p-6 mb-6 text-white shadow-lg"
      >
        <h2 className="text-xl sm:text-2xl font-bold">Welcome back, {user} 👋</h2>
        <p className="text-sm sm:text-base opacity-90 mt-1">
          Here&rsquo;s a quick snapshot of your department&rsquo;s performance.
        </p>
      </motion.div>

      {/* Relationship Managers Overview */}
      <section className="mb-10">
        <DashboardSectionHeader title="Team Overview" />
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <StatsCard
            title="Total RMs"
            value={rmCount}
            icon={<UserCheck size={26} />}
            subtitle="Relationship Managers"
            color="blue"
          />
        </div>
      </section>

      {/* Leads Overview */}
      <section className="mb-10">
        <DashboardSectionHeader title="Department Leads" />

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <StatsCard
            title="Total Leads"
            value={leadStats.total}
            icon={<Mail size={26} />}
            subtitle="Total assigned leads"
            delay={0.1}
            color="blue"
          />

          <StatsCard
            title="Open"
            value={leadStats.open}
            icon={<FolderOpen size={26} />}
            subtitle="Active leads"
            color="orange"
            delay={0.2}
          />

          <StatsCard
            title="Pending"
            value={leadStats.pending}
            icon={<Clock size={26} />}
            subtitle="Awaiting action"
            color="red"
            delay={0.3}
          />

          <StatsCard
            title="Closed"
            value={leadStats.closed}
            icon={<CheckCircle size={26} />}
            subtitle="Successfully converted"
            color="green"
            delay={0.4}
          />

          <StatsCard
            title="Conversion Rate"
            value={
              leadStats.total > 0
                ? `${Math.round((leadStats.closed / leadStats.total) * 100)}%`
                : "0%"
            }
            icon={<LineChart size={26} />}
            subtitle="Closed vs Total"
            color="purple"
            delay={0.5}
          />
        </div>
      </section>
    </div>
  );
}