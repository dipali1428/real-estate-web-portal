"use client";

import { useState, useEffect, useRef } from "react";
import { motion } from "framer-motion";
import { RmService } from "../services/rmService";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
import StatsCard from "../component/DashboardStatsCard";
import DashboardSectionHeader from "../component/DashboardSectionHeader";
import { Users, Mail, FileText, Copy, Check } from "lucide-react";

export default function Dashboard() {
  const [loading, setLoading] = useState(true);
  const [userName, setUserName] = useState("");
  const [referralCode, setReferralCode] = useState(""); // New state for Ref Code
  const [copied, setCopied] = useState(false); // For copy animation

  const [totalReferralLeads, setTotalReferralLeads] = useState(0);
  const [incomingReferralLeads, setIncomingReferralLeads] = useState(0);
  const [outgoingReferralLeads, setOutgoingReferralLeads] = useState(0);
  const [customerDetailLeadTotal, setCustomerDetailLeadTotal] = useState(0);

  const router = useRouter();
  const hasFetched = useRef(false);

  // Function to copy referral code to clipboard
  const handleCopy = (code: string) => {
    if (!code) return;
    navigator.clipboard.writeText(code);
    setCopied(true);
    toast.success("Referral code copied!");
    setTimeout(() => setCopied(false), 2000);
  };

  const fetchDashboardData = async () => {
    try {
      const token = document.cookie.match(/authToken=([^;]+)/)?.[1];
      if (!token) {
        router.push("/");
        return;
      }

      // 1. Fetch RM Profile & Extract Ref Code
      const rmProfile = await RmService.getRmProfile();
      setUserName(rmProfile?.user?.name || "");
      // console.log("RM Profile:", rmProfile);

      // Assuming your API returns 'referralCode' or 'ref_code'
      // Adjust the key name based on your actual API response
      const code = rmProfile?.user?.referral_code || rmProfile?.user?.ref_code;
      setReferralCode(code);
      // console.log("Referral Code:", code);

      // 2. Fetch Total Referral Leads
      const referralLeadsRes = await RmService.getReferralLeads();
      setTotalReferralLeads(referralLeadsRes?.count || 0);

      // 3. Fetch Incoming Leads
      const incomingRes = await RmService.getIncomingAssignedLeads();
      setIncomingReferralLeads(incomingRes?.count || 0);

      // 4. Fetch Outgoing Leads
      const outgoingRes = await RmService.getoutgoingLeadsToRm();
      setOutgoingReferralLeads(outgoingRes?.count || 0);

      // 5. Fetch Customer Detail Leads Count
      const customerDetailLeadsResponse = await RmService.getConsumerDetailedLeads();
      setCustomerDetailLeadTotal(customerDetailLeadsResponse?.count || 0);

    } catch (error: any) {
      // console.error("Dashboard data error:", error);
      toast.error("Failed to load dashboard data. Please try again.");
      if (error?.response?.status === 401) {
        toast.error("Session expired! Please login again.");
        document.cookie = `authToken=; path=/; expires=${new Date(0).toUTCString()}`;
        router.push("/");
      } else {
        toast.error("Failed to fetch dashboard data.");
      }
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (!hasFetched.current) {
      hasFetched.current = true;
      // setLoading(true);
      fetchDashboardData()
    }
  }, [fetchDashboardData]);

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
          <p className="text-lg font-bold leading-none mt-1">
            {userName}
          </p>
          <div className="mt-2 inline-block sm:block">
            <button
              onClick={() => handleCopy(referralCode)}
              className="flex items-center gap-2 group cursor-pointer"
            >
              <span className="text-[10px] bg-white/20 px-2 py-1 rounded-md font-mono border border-white/10 flex items-center gap-2 transition-all hover:bg-white/30">
                <span className="text-white font-bold tracking-wider uppercase">
                  My Ref Code: {referralCode}
                </span>
                {copied ? <Check size={12} /> : <Copy size={12} className="opacity-60 group-hover:opacity-100" />}
              </span>
            </button>
          </div>
        </div>
      </motion.div>

      {/* Referral Leads Overview */}
      <section className="mb-10">
        <DashboardSectionHeader title="Referral Lead Count Overview" />
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <StatsCard
            title="Total Referral Leads"
            value={totalReferralLeads}
            icon={<Users size={26} />}
            subtitle="All referral leads"
            color="blue"
          />
          <StatsCard
            title="Incoming Referral Leads"
            value={incomingReferralLeads}
            icon={<Mail size={26} />}
            subtitle="Leads assigned to you"
            color="green"
          />
          <StatsCard
            title="Outgoing Referral Leads"
            value={outgoingReferralLeads}
            icon={<Mail size={26} />}
            subtitle="Leads assigned by you"
            color="purple"
          />
        </div>
      </section>

      {/* Customer Detail Leads Overview */}
      <section className="mb-10">
        <DashboardSectionHeader title="Customer Detail Leads Overview" />
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <StatsCard
            title="Total Customer Detail Leads"
            value={customerDetailLeadTotal}
            icon={<FileText size={26} />}
            subtitle="Leads with full customer details & documents"
            color="green"
          />
        </div>
      </section>
    </div>
  );
}