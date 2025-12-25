"use client";

import { useState, useEffect, useRef } from "react";
import { motion } from "framer-motion";
import { AdminService } from "../services/adminService";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
import StatsCard from "../admin/components/DashboardStatsCard";
import DashboardSectionHeader from "../admin/components/DashboardSectionHeader"

import { Users, Mail, Clock, CheckCircle, LineChart, FolderOpen } from "lucide-react";

interface Enquiry {
  status: "Pending" | "Closed" | "Open";
}

export default function Dashboard() {
  const [user, setUser] = useState("");
  const [loading, setLoading] = useState(true);

  const [dsaTotal, setDsaTotal] = useState(0);

  const [enquiryStats, setEnquiryStats] = useState({
    total: 0,
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

      // Fetch Admin Profile
      const profile = await AdminService.getAdminProfile();
      setUser(profile.user.name);

      // Fetch DSA Count
      const dsaResponse = await AdminService.dsaList();
      setDsaTotal(dsaResponse?.count || 0);

      // Fetch Enquiries
      const enquiryResponse = await AdminService.contactusData();
      const enquiries = enquiryResponse?.contactus || [];

      setEnquiryStats({
        total: enquiryResponse.count || 0,
        pending: enquiries.filter((e: Enquiry) => e.status === "Pending").length,
        closed: enquiries.filter((e: Enquiry) => e.status === "Closed").length,
        open: enquiries.filter((e: Enquiry) => e.status === "Open").length,
      });
    } catch (error: any) {
      toast.error("Failed to fetch dashboard data.");

      if (error?.response?.status === 401) {
        toast.error("Session expired! Please login again.");
        document.cookie = `authToken=; path=/; expires=${new Date(0).toUTCString()}`;
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

  // if (loading || !user)
  //   return <div className="p-6 text-center text-lg">Loading Dashboard...</div>;

  return (
    <div className="flex-1 p-4 sm:p-6">
      <motion.div
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="bg-linear-to-r from-[#2076C7] to-[#1CADA3] rounded-2xl p-6 mb-6 text-white shadow-lg">
        <h2 className="text-xl sm:text-2xl font-bold">Welcome back, Lead Department {} 👋</h2>
        <p className="text-sm sm:text-base opacity-90 mt-1">
          Here&rsquo;s a quick snapshot of your business performance.
        </p>
      </motion.div>

      {/* DSA Overview */}
      <section className="mb-10">
        <DashboardSectionHeader title="DSA Overview" />

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <StatsCard
            title="Total DSAs"
            value={dsaTotal}
            icon={<Users size={26} />}
            subtitle="All active & inactive DSAs"
            color="blue"
          />
        </div>
      </section>

      {/* Enquiry Overview */}
      <section className="mb-10">
        <DashboardSectionHeader title="Enquiries Overview" />

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <StatsCard
            title="Total Enquiries"
            value={enquiryStats.total}
            icon={<Mail size={26} />}
            subtitle="All time enquiries"
            delay={0.1}
            color="blue"
          />

          <StatsCard
            title="Open"
            value={enquiryStats.open}
            icon={<FolderOpen size={26} />}
            subtitle="New enquiries received"
            color="orange"
            delay={0.2}
          />

          <StatsCard
            title="Pending"
            value={enquiryStats.pending}
            icon={<Clock size={26} />}
            subtitle="Awaiting follow-up"
            color="red"
            delay={0.3}
          />

          <StatsCard
            title="Closed"
            value={enquiryStats.closed}
            icon={<CheckCircle size={26} />}
            subtitle="Completed & resolved"
            color="green"
            delay={0.4}
          />

          <StatsCard
            title="Response Rate"
            value={
              enquiryStats.total > 0
                ? `${Math.round((enquiryStats.closed / enquiryStats.total) * 100)}%`
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
