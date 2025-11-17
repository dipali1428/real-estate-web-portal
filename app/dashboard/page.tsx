'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { DashboardService } from "../services/dashboardService";
import { useRouter } from "next/navigation";
import PortfolioChart from './components/PortfolioChart';

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

export default function Dashboard() {
    const [user, setUser] = useState<UserProfile | null>(null);
    const [loading, setLoading] = useState(true);
    const router = useRouter();

    // ✅ Fetch profile data from API
    useEffect(() => {
        const fetchProfile = async () => {
            try {
                const token = document.cookie.match(/authToken=([^;]+)/)?.[1];
                if (!token) return router.push("/");
                setLoading(true);

                const data = await DashboardService.getProfile();
                setUser(data.user);

            } catch (error: any) {
                console.error("Profile fetch error:", error);

                // 🔥 If backend says token expired → logout user
                if (error?.response?.status === 401) {
                    document.cookie = `authToken=; path=/; expires=${new Date(0).toUTCString()}`;
                    router.push("/");
                }
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
        <div className="flex-1 p-6">
            {/* Dashboard Header */}
            <section className="animate-fade-in">
                <div className="flex justify-between items-center mb-6">
                    <div className="flex items-center space-x-4">
                        {/* Notifications */}
                        <div className="relative group">
                            <div className="absolute right-0 top-full mt-2 w-80 bg-white rounded-lg shadow-lg border border-gray-200 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 z-10">
                                <div className="p-4">
                                    <h5 className="font-semibold text-gray-800 mb-3">Notifications</h5>
                                    <div className="space-y-3">
                                        <div className="pb-3 border-b border-gray-100">
                                            <div className="font-medium text-gray-800">New incentive credited</div>
                                            <div className="text-sm text-gray-500">10 minutes ago</div>
                                        </div>
                                        <div className="pb-3 border-b border-gray-100">
                                            <div className="font-medium text-gray-800">Monthly target achieved</div>
                                            <div className="text-sm text-gray-500">2 hours ago</div>
                                        </div>
                                        <div className="pb-3">
                                            <div className="font-medium text-gray-800">New campaign launched</div>
                                            <div className="text-sm text-gray-500">Yesterday</div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>

                    </div>
                </div>

                {/* Welcome Message */}
                <motion.div
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.4 }}
                    className="bg-gradient-to-r from-[#2076C7] to-[#1CADA3] rounded-2xl p-6 mb-6 text-white">
                    <h2 className="text-2xl font-bold mb-2">
                        {loading ? "Loading..." : `Welcome back, ${user?.name || "Partner"}.`}
                    </h2>
                    <p className="mb-4">Here&apos;s a snapshot of your business performance.</p>
                    <div className="flex items-center">
                        <span className="text-white mr-3">Monthly Goal Progress</span>
                        <div className="flex-1 bg-white bg-opacity-30 rounded-full h-3">
                            <div
                                className="bg-white bg-opacity-50 h-3 rounded-full"
                                style={{ width: '90%' }}
                            ></div>
                        </div>
                        <span className="text-white ml-3">90%</span>
                    </div>
                </motion.div>

                {/* KPI Cards Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-6">
                    {/* Total Business Volume */}
                    <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
                        <div className="flex items-start justify-between">
                            <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-2xl flex items-center justify-center text-white">
                                <i className="fas fa-chart-line"></i>
                            </div>
                        </div>
                        <div className="mt-4">
                            <div className="text-2xl font-bold text-gray-800">1.75CR</div>
                            <div className="text-gray-600 mt-1">Total Business Volume</div>
                            <div className="flex items-center text-green-500 text-sm mt-2">
                                <i className="fas fa-arrow-up mr-1"></i>
                                12% from last month
                            </div>
                        </div>
                    </div>

                    {/* Monthly Target */}
                    <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
                        <div className="flex items-start justify-between">
                            <div className="w-12 h-12 bg-gradient-to-r from-[#0f766e] to-[#0f766e] rounded-2xl flex items-center justify-center text-white">
                                <i className="fas fa-bullseye"></i>
                            </div>
                        </div>
                        <div className="mt-4">
                            <div className="text-2xl font-bold text-gray-800">2CR</div>
                            <div className="text-gray-600 mt-1">Monthly Target</div>
                            <div className="mt-3">
                                <div className="w-full bg-gray-200 rounded-full h-2">
                                    <div
                                        className="bg-gradient-to-r from-[#0f766e] to-[#0f766e] h-2 rounded-full"
                                        style={{ width: '90%' }}
                                    ></div>
                                </div>
                                <div className="text-sm text-gray-500 mt-1">Achieved: 90%</div>
                            </div>
                        </div>
                    </div>

                    {/* Active Policies */}
                    <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
                        <div className="flex items-start justify-between">
                            <div className="w-12 h-12 bg-gradient-to-r from-green-500 to-emerald-500 rounded-2xl flex items-center justify-center text-white">
                                <i className="fas fa-file-contract"></i>
                            </div>
                        </div>
                        <div className="mt-4">
                            <div className="text-2xl font-bold text-gray-800">142</div>
                            <div className="text-gray-600 mt-1">Active Policies</div>
                            <div className="flex items-center text-green-500 text-sm mt-2">
                                <i className="fas fa-arrow-up mr-1"></i>
                                8 new this month
                            </div>
                        </div>
                    </div>

                    {/* Pending Follow-ups */}
                    <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
                        <div className="flex items-start justify-between">
                            <div className="w-12 h-12 bg-gradient-to-r from-yellow-500 to-orange-500 rounded-2xl flex items-center justify-center text-white">
                                <i className="fas fa-clock"></i>
                            </div>
                        </div>
                        <div className="mt-4">
                            <div className="text-2xl font-bold text-gray-800">3</div>
                            <div className="text-gray-600 mt-1">Pending Follow-ups</div>
                            <div className="flex items-center text-red-500 text-sm mt-2">
                                <i className="fas fa-exclamation-circle mr-1"></i>
                                2 overdue
                            </div>
                        </div>
                    </div>

                    {/* Total Clients */}
                    <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
                        <div className="flex items-start justify-between">
                            <div className="w-12 h-12 bg-gradient-to-r from-[#fb7185] to-[#fb7185] rounded-2xl flex items-center justify-center text-white">
                                <i className="fas fa-user-friends"></i>
                            </div>
                        </div>
                        <div className="mt-4">
                            <div className="text-2xl font-bold text-gray-800">89</div>
                            <div className="text-gray-600 mt-1">Total Clients</div>
                            <div className="flex items-center text-green-500 text-sm mt-2">
                                <i className="fas fa-arrow-up mr-1"></i>
                                5 new this month
                            </div>
                        </div>
                    </div>

                    {/* YTD Incentives Earned */}
                    <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
                        <div className="flex items-start justify-between">
                            <div className="w-12 h-12 bg-gradient-to-r from-gray-700 to-gray-900 rounded-2xl flex items-center justify-center text-white">
                                <i className="fas fa-rupee-sign"></i>
                            </div>
                        </div>
                        <div className="mt-4">
                            <div className="text-2xl font-bold text-gray-800">₹ 3,42,500</div>
                            <div className="text-gray-600 mt-1">YTD Incentives Earned</div>
                            <div className="flex items-center text-green-500 text-sm mt-2">
                                <i className="fas fa-arrow-up mr-1"></i>
                                15% from last quarter
                            </div>
                        </div>
                    </div>
                </div>

                {/* Visual Data Widgets */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                    {/* Business Portfolio Widget */}
                    <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
                        <h3 className="text-lg font-semibold text-gray-800 mb-2">
                            <i className="fas fa-chart-pie text-blue-500 mr-2"></i>
                            My Business Portfolio
                        </h3>
                        <p className="text-gray-600 mb-4">
                            A visual breakdown of your total business by product category.
                        </p>
                        <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
                                <h3 className="text-lg font-semibold text-gray-800 mb-2">
                                    <i className="fas fa-chart-pie text-blue-500 mr-2"></i>
                                    My Business Portfolio
                                </h3>
                                <p className="text-gray-600 mb-4">
                                    A visual breakdown of your total business by product category.
                                </p>
                                <PortfolioChart />
</div>
                    </div>

                    {/* Recent Activity Widget */}
                    <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
                        <h3 className="text-lg font-semibold text-gray-800 mb-2">
                            <i className="fas fa-list-alt text-green-500 mr-2"></i>
                            Recent Activity
                        </h3>
                        <p className="text-gray-600 mb-4">A log of recent actions.</p>
                        <div className="space-y-4">
                            <div className="pb-3 border-b border-gray-100">
                                <div className="flex items-start">
                                    <i className="fas fa-plus-circle text-blue-500 mt-1 mr-3"></i>
                                    <div>
                                        <div className="text-gray-800">New lead added for Health Insurance</div>
                                        <div className="text-sm text-gray-500">Today, 10:15 AM</div>
                                    </div>
                                </div>
                            </div>
                            <div className="pb-3 border-b border-gray-100">
                                <div className="flex items-start">
                                    <i className="fas fa-file-invoice text-green-500 mt-1 mr-3"></i>
                                    <div>
                                        <div className="text-gray-800">Client Amit Sharma policy issued</div>
                                        <div className="text-sm text-gray-500">Yesterday, 3:45 PM</div>
                                    </div>
                                </div>
                            </div>
                            <div className="pb-3 border-b border-gray-100">
                                <div className="flex items-start">
                                    <i className="fas fa-rupee-sign text-yellow-500 mt-1 mr-3"></i>
                                    <div>
                                        <div className="text-gray-800">Incentive of ₹12,500 credited</div>
                                        <div className="text-sm text-gray-500">15 Oct 2023, 11:20 AM</div>
                                    </div>
                                </div>
                            </div>
                            <div className="pb-3 border-b border-gray-100">
                                <div className="flex items-start">
                                    <i className="fas fa-user-check text-purple-500 mt-1 mr-3"></i>
                                    <div>
                                        <div className="text-gray-800">Lead Priya Singh converted to client</div>
                                        <div className="text-sm text-gray-500">14 Oct 2023, 4:30 PM</div>
                                    </div>
                                </div>
                            </div>
                            <div>
                                <div className="flex items-start">
                                    <i className="fas fa-comment text-indigo-500 mt-1 mr-3"></i>
                                    <div>
                                        <div className="text-gray-800">Follow-up scheduled for Mr. Verma</div>
                                        <div className="text-sm text-gray-500">13 Oct 2023, 2:15 PM</div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    );
}