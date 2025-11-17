"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { DashboardService } from "../services/dashboardService";
import { useRouter } from "next/navigation";

interface UserProfile {
    id: number;
    adv_id: string;
    name: string;
    email: string;
    mobile: string;
    city: string;
    head: string;
    category: string;
}

export default function DashboardHome() {
    const [user, setUser] = useState<UserProfile | null>(null);
    const [loading, setLoading] = useState(true);
    const router = useRouter();

    // ✅ Fetch profile data from API
    useEffect(() => {
        const fetchProfile = async () => {
            try {
                const token = document.cookie.match(/authToken=([^;]+)/)?.[1];
                if (!token) return;
                setLoading(true);

                const data = await DashboardService.getProfile();
                setUser(data.user);
            } catch (error) {
                console.error("Profile fetch error:", error);
            } finally {
                setLoading(false);
            }
        };
        fetchProfile();
    }, []);

    // token check 
    useEffect(() => {
        const cookie = document.cookie.includes("authToken=");
        if (!cookie) router.push("/");
    }, []);

    return (
        <div className="p-6 w-full">
            {/* Welcome Banner */}
            <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4 }}
                className="bg-linear-to-r from-[#2076C7] to-[#1CADA3] rounded-xl text-white px-8 py-6 shadow-md">
                <h2 className="text-2xl font-semibold">
                    {loading
                        ? "Loading..."
                        : `Welcome back, ${user?.name || "Partner"} 👋`}
                </h2>
                <p className="text-sm text-white/80 mt-1">
                    Here&rsquo;s a snapshot of your business performance.
                </p>
            </motion.div>

            {/* Dashboard Metrics Section */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 mt-8">
                {/* Total Business Volume */}
                <div className="bg-white rounded-xl p-5 shadow hover:shadow-lg transition">
                    <p className="text-gray-500 text-sm">Total Business Volume</p>
                    <h3 className="text-2xl font-bold mt-1 text-gray-800">
                        ₹ 18,75,000
                    </h3>
                </div>

                {/* Monthly Target */}
                <div className="bg-white rounded-xl p-5 shadow hover:shadow-lg transition">
                    <p className="text-gray-500 text-sm">Monthly Target</p>
                    <h3 className="text-2xl font-bold mt-1 text-gray-800">
                        ₹ 20,00,000
                    </h3>
                    <p className="text-sm text-gray-500 mt-1">Achieved: 75%</p>
                </div>

                {/* Active Policies */}
                <div className="bg-white rounded-xl p-5 shadow hover:shadow-lg transition">
                    <p className="text-gray-500 text-sm">Active Policies</p>
                    <h3 className="text-2xl font-bold mt-1 text-gray-800">142</h3>
                </div>

                {/* Pending Follow-ups */}
                <div className="bg-white rounded-xl p-5 shadow hover:shadow-lg transition">
                    <p className="text-gray-500 text-sm">Pending Follow-ups</p>
                    <h3 className="text-2xl font-bold mt-1 text-gray-800">23</h3>
                </div>

                {/* Total Clients */}
                <div className="bg-white rounded-xl p-5 shadow hover:shadow-lg transition">
                    <p className="text-gray-500 text-sm">Total Clients</p>
                    <h3 className="text-2xl font-bold mt-1 text-gray-800">89</h3>
                </div>

                {/* Incentives */}
                <div className="bg-white rounded-xl p-5 shadow hover:shadow-lg transition">
                    <p className="text-gray-500 text-sm">YTD Incentives Earned</p>
                    <h3 className="text-2xl font-bold mt-1 text-gray-800">
                        ₹ 3,42,500
                    </h3>
                </div>
            </div>

            {/* Recent Activity */}
            <div className="bg-white rounded-xl shadow p-5 mt-8">
                <h3 className="text-lg font-semibold text-gray-800 mb-3">
                    Recent Activity
                </h3>
                <ul className="text-gray-600 text-sm space-y-2">
                    <li>🟢 New lead added for Health Insurance — <span className="text-gray-400">Today, 10:15 AM</span></li>
                    <li>🟢 Client Amit Sharma policy issued — <span className="text-gray-400">Yesterday, 3:45 PM</span></li>
                    <li>💰 Incentive of ₹12,500 credited — <span className="text-gray-400">15 Oct 2023</span></li>
                    <li>🟢 Lead Priya Singh converted to client — <span className="text-gray-400">14 Oct 2023</span></li>
                    <li>🕒 Follow-up scheduled for Mr. Verma — <span className="text-gray-400">13 Oct 2023</span></li>
                </ul>
            </div>

        </div>
    );
}





