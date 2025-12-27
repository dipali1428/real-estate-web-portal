"use client";

import { useState, useEffect, useRef } from "react";
import { motion } from "framer-motion";
import { RmService } from "../services/rmService";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
import StatsCard from "../component/DashboardStatsCard";
import DashboardSectionHeader from "../component/DashboardSectionHeader";
import { Users, Mail } from "lucide-react";

export default function Dashboard() {
  const [loading, setLoading] = useState(true);
  const [userName, setUserName] = useState("");
  const [referralLeadTotal, setReferralLeadTotal] = useState(0);
  const [myDsaTotal, setMyDsaTotal] = useState(0);

  const router = useRouter();
  const hasFetched = useRef(false);

  const fetchDashboardData = async () => {
    try {
      const token = document.cookie.match(/authToken=([^;]+)/)?.[1];
      if (!token) {
        router.push("/");
        return;
      }

      // Fetch RM Profile
      const rmProfile = await RmService.getRmProfile();
      setUserName(rmProfile?.user?.name || "");

      // Fetch Referral Leads Count
      const referralLeadsResponse = await RmService.getReferralLeads();
      setReferralLeadTotal(referralLeadsResponse?.count || 0);

      // Fetch My DSA Count
      const myDsaCountResponse = await RmService.getYourDsaList();
      setMyDsaTotal(myDsaCountResponse?.count || 0);

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
      fetchDashboardData().finally(() => setLoading(false));
    }
  }, []);

  if (loading) {
    return <div className="p-6 text-center text-lg">Loading Dashboard...</div>;
  }

  return (
    <div className="flex-1 p-4 sm:p-6">
                <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="bg-gradient-to-r from-[#2076C7] to-[#1CADA3] rounded-2xl p-6 mb-6 text-white shadow-lg flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4"
          >
            {/* Left Side: Welcome Message */}
            <div>
              <h2 className="text-xl sm:text-2xl font-bold">
                Welcome back, {userName} 👋
              </h2>
              <p className="text-sm sm:text-base opacity-90 mt-1">
                Here&rsquo;s a quick snapshot of your business performance.
              </p>
            </div>

            {/* Right Side: Name and Referral Code */}
            <div className="text-left sm:text-right border-l-2 sm:border-l-0 sm:border-r-0 border-white/20 pl-4 sm:pl-0">
              <p className="text-sm font-semibold opacity-80 uppercase tracking-wider">
                {/* Rakhi Raut  */}
              </p>
              <p className="text-lg font-bold leading-none mt-1">
                {userName}
              </p>
              <div className="mt-2 inline-block sm:block">
                <span className="text-[10px] bg-white/20 px-2 py-1 rounded-md font-mono border border-white/10">
                   <span className="text-white font-bold tracking-widest uppercase">My Ref Code</span>
                </span>
              </div>
            </div>
          </motion.div>

      {/* Referral Leads Overview */}
      <section className="mb-10">
        <DashboardSectionHeader title="Referral Lead Count Overview" />

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <StatsCard
            title="Total Referral Leads"
            value={referralLeadTotal}
            icon={<Users size={26} />}
            subtitle="All active & inactive DSAs"
            color="blue"
          />
        </div>
      </section>
    </div>
  );
}
