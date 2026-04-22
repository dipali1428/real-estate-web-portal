"use client";

import { useState, useEffect, useRef } from "react";
import { motion } from "framer-motion";
import { DepartmentHeadService } from "../services/departmentHeadService";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
import StatsCard from "../admin/components/DashboardStatsCard";
import DashboardSectionHeader from "../admin/components/DashboardSectionHeader";

import {
  Mail,
  UserCheck,
  IndianRupee,
} from "lucide-react";

export default function Dashboard() {
  const [user, setUser] = useState("");
  const [loading, setLoading] = useState(true);
  const [rmCount, setRmCount] = useState(0);

  const [leadStats, setLeadStats] = useState({
    total: 0,
    businessAmount: 0,
  });

  const router = useRouter();
  const hasFetched = useRef(false);

  const fetchDashboardData = async () => {
    try {
      const token = document.cookie.match(/authToken=([^;]+)/)?.[1];
      if (!token) return router.push("/");

      const profile = await DepartmentHeadService.getDepartmentProfile();
      setUser(profile?.name || profile?.user?.name || "Department Head");

      const rmData = await DepartmentHeadService.getRelationshipManagers();
      setRmCount(rmData?.total || rmData?.rms?.length || 0);

      const leadsResponse = await DepartmentHeadService.getDepartmentReferralLeads();
      const leads = leadsResponse?.leads || (Array.isArray(leadsResponse) ? leadsResponse : []);

      // Calculate total business amount
      const totalAmount = leads.reduce((sum: number, lead: any) => {
        return sum + (Number(lead.loanAmount) || Number(lead.amount) || 0);
      }, 0);

      setLeadStats({
        total: leadsResponse?.total || leads.length,
        businessAmount: totalAmount,
      });

    } catch (error: any) {
      toast.error("Failed to fetch dashboard data.");
    }
  };

  useEffect(() => {
    if (hasFetched.current) return;

    hasFetched.current = true;

    const loadData = async () => {
      try {
        await fetchDashboardData();
      } finally {
        setLoading(false);
      }
    };

    loadData();
  }, []);
  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
      maximumFractionDigits: 0,
    }).format(amount);
  };

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
        <h2 className="text-xl sm:text-2xl font-bold">Welcome back, {user}</h2>
        <p className="text-sm sm:text-base opacity-90 mt-1">
          Here&rsquo;s a quick snapshot of your department&rsquo;s performance.
        </p>
      </motion.div>

      {/* Business Overview Section */}
      <section className="mb-10">
        <DashboardSectionHeader title="Department Overview" />
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          <StatsCard
            title="Total Business Amount"
            value={formatCurrency(leadStats.businessAmount)}
            icon={<IndianRupee size={26} strokeWidth={3} className="text-emerald-600" />}
            subtitle="Value of all leads"
            color="emerald"
          />

          <StatsCard
            title="Total Leads"
            value={leadStats.total}
            icon={<Mail size={26} />}
            subtitle="Cumulative leads"
            color="blue"
          />

          <StatsCard
            title="Total RMs"
            value={rmCount}
            icon={<UserCheck size={26} />}
            subtitle="Relationship Managers"
            color="purple"
          />
        </div>
      </section>
    </div>
  );
}