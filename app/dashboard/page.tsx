'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { DashboardService } from "../services/dashboardService";
import { useRouter } from "next/navigation";
import PortfolioChart from './components/PortfolioChart';
import toast from "react-hot-toast";

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

                    // Show toast for 2 seconds
                    toast.error("Login session expired! Please login again.", {
                        duration: 2000,
                    });

                    document.cookie = `authToken=; path=/; expires=${new Date(0).toUTCString()}`;

                    setTimeout(() => {
                        router.push("/");
                    }, 500);
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
                    className="bg-linear-to-r from-[#2076C7] to-[#1CADA3] rounded-2xl p-6 mb-6 text-white">
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
                        <span className="text-white ml-3 font-sans">90%</span>
                    </div>
                </motion.div>

                {/* KPI Cards Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-6">
                    {/* Total Business Volume */}
                    <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
                        <div className="flex items-start justify-between">
                            <div className="w-12 h-12 bg-linear-to-r from-blue-500 to-cyan-500 rounded-2xl flex items-center justify-center text-white">
                                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
                                </svg>
                            </div>
                        </div>
                        <div className="mt-4">
                            <div className="text-2xl font-bold font-sans text-gray-800">1.75CR</div>
                            <div className="text-gray-600 mt-1">Total Business Volume</div>
                            <div className="flex items-center text-green-500 text-sm mt-2">
                                <svg className="w-4 h-4 mr-1" fill="currentColor" viewBox="0 0 20 20">
                                    <path fillRule="evenodd" d="M5.293 9.707a1 1 0 010-1.414l4-4a1 1 0 011.414 0l4 4a1 1 0 01-1.414 1.414L11 7.414V15a1 1 0 11-2 0V7.414L6.707 9.707a1 1 0 01-1.414 0z" clipRule="evenodd" />
                                </svg>
                                12% from last month
                            </div>
                        </div>
                    </div>

                    {/* Monthly Target */}
                    <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
                        <div className="flex items-start justify-between">
                            <div className="w-12 h-12 bg-linear-to-r from-[#0f766e] to-[#0f766e] rounded-2xl flex items-center justify-center text-white">
                                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                                </svg>
                            </div>
                        </div>
                        <div className="mt-4">
                            <div className="text-2xl font-bold font-sans text-gray-800">2CR</div>
                            <div className="text-gray-600 mt-1">Monthly Target</div>
                            <div className="mt-3">
                                <div className="w-full bg-gray-200 rounded-full h-2">
                                    <div
                                        className="bg-linear-to-r from-[#0f766e] to-[#0f766e] h-2 rounded-full"
                                        style={{ width: '90%' }}
                                    ></div>
                                </div>
                                <div className="text-sm font-sans text-gray-500 mt-1">Achieved: 90%</div>
                            </div>
                        </div>
                    </div>

                    {/* Active Policies */}
                    <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
                        <div className="flex items-start justify-between">
                            <div className="w-12 h-12 bg-linear-to-r from-green-500 to-emerald-500 rounded-2xl flex items-center justify-center text-white">
                                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                                </svg>
                            </div>
                        </div>
                        <div className="mt-4">
                            <div className="text-2xl font-bold font-sans text-gray-800">142</div>
                            <div className="text-gray-600 mt-1">Active Policies</div>
                            <div className="flex items-center text-green-500 text-sm mt-2">
                                <svg className="w-4 h-4 mr-1" fill="currentColor" viewBox="0 0 20 20">
                                    <path fillRule="evenodd" d="M5.293 9.707a1 1 0 010-1.414l4-4a1 1 0 011.414 0l4 4a1 1 0 01-1.414 1.414L11 7.414V15a1 1 0 11-2 0V7.414L6.707 9.707a1 1 0 01-1.414 0z" clipRule="evenodd" />
                                </svg>
                                8 new this month
                            </div>
                        </div>
                    </div>

                    {/* Pending Follow-ups */}
                    <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
                        <div className="flex items-start justify-between">
                            <div className="w-12 h-12 bg-linear-to-r from-yellow-500 to-orange-500 rounded-2xl flex items-center justify-center text-white">
                                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                                </svg>
                            </div>
                        </div>
                        <div className="mt-4">
                            <div className="text-2xl font-bold font-sans text-gray-800">3</div>
                            <div className="text-gray-600 mt-1">Pending Follow-ups</div>
                            <div className="flex items-center text-red-500 text-sm mt-2">
                                <svg className="w-4 h-4 mr-1" fill="currentColor" viewBox="0 0 20 20">
                                    <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                                </svg>
                                2 overdue
                            </div>
                        </div>
                    </div>

                    {/* Total Clients */}
                    <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
                        <div className="flex items-start justify-between">
                            <div className="w-12 h-12 bg-linear-to-r from-[#fb7185] to-[#fb7185] rounded-2xl flex items-center justify-center text-white">
                                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                                </svg>
                            </div>
                        </div>
                        <div className="mt-4">
                            <div className="text-2xl font-bold font-sans text-gray-800">89</div>
                            <div className="text-gray-600 mt-1">Total Clients</div>
                            <div className="flex items-center text-green-500 text-sm mt-2">
                                <svg className="w-4 h-4 mr-1" fill="currentColor" viewBox="0 0 20 20">
                                    <path fillRule="evenodd" d="M5.293 9.707a1 1 0 010-1.414l4-4a1 1 0 011.414 0l4 4a1 1 0 01-1.414 1.414L11 7.414V15a1 1 0 11-2 0V7.414L6.707 9.707a1 1 0 01-1.414 0z" clipRule="evenodd" />
                                </svg>
                                5 new this month
                            </div>
                        </div>
                    </div>

                    {/* YTD Incentives Earned */}
                    <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
                        <div className="flex items-start justify-between">
                            <div className="w-12 h-12 bg-linear-to-r from-gray-700 to-gray-900 rounded-2xl flex items-center justify-center text-white">
                                {/* Rupee Icon */}
                                {/* YTD Incentives Earned */}
                                <div className="bg-white rounded-2xl p-6 ">
                                    <div className="flex items-start justify-between">
                                        <div className="w-12 h-12 bg-linear-to-r from-gray-700 to-gray-900 rounded-2xl flex items-center justify-center text-white">
                                            {/* Rupee Icon */}
                                            <svg className="w-6 h-6" viewBox="0 0 24 24" fill="currentColor">
                                                <path d="M12.9494914,6 C13.4853936,6.52514205 13.8531598,7.2212202 13.9645556,8 L17.5,8 C17.7761424,8 18,8.22385763 18,8.5 C18,8.77614237 17.7761424,9 17.5,9 L13.9645556,9 C13.7219407,10.6961471 12.263236,12 10.5,12 L7.70710678,12 L13.8535534,18.1464466 C14.0488155,18.3417088 14.0488155,18.6582912 13.8535534,18.8535534 C13.6582912,19.0488155 13.3417088,19.0488155 13.1464466,18.8535534 L6.14644661,11.8535534 C5.83146418,11.538571 6.05454757,11 6.5,11 L10.5,11 C11.709479,11 12.7183558,10.1411202 12.9499909,9 L6.5,9 C6.22385763,9 6,8.77614237 6,8.5 C6,8.22385763 6.22385763,8 6.5,8 L12.9499909,8 C12.7183558,6.85887984 11.709479,6 10.5,6 L6.5,6 C6.22385763,6 6,5.77614237 6,5.5 C6,5.22385763 6.22385763,5 6.5,5 L10.5,5 L17.5,5 C17.7761424,5 18,5.22385763 18,5.5 C18,5.77614237 17.7761424,6 17.5,6 L12.9494914,6 L12.9494914,6 Z" />
                                            </svg>
                                        </div>
                                    </div>
                                    {/* ... rest of card content ... */}
                                </div>
                            </div>
                        </div>
                        <div className="mt-4">
                            <div className="text-2xl font-bold font-sans text-gray-800">₹ 3,42,500</div>
                            <div className="text-gray-600 mt-1">YTD Incentives Earned</div>
                            <div className="flex items-center text-green-500 text-sm mt-2">
                                <svg className="w-4 h-4 mr-1" fill="currentColor" viewBox="0 0 20 20">
                                    <path fillRule="evenodd" d="M5.293 9.707a1 1 0 010-1.414l4-4a1 1 0 011.414 0l4 4a1 1 0 01-1.414 1.414L11 7.414V15a1 1 0 11-2 0V7.414L6.707 9.707a1 1 0 01-1.414 0z" clipRule="evenodd" />
                                </svg>
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
                            <svg className="w-5 h-5 text-blue-500 mr-2 inline" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 3.055A9.001 9.001 0 1020.945 13H11V3.055z" />
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20.488 9H15V3.512A9.025 9.025 0 0120.488 9z" />
                            </svg>
                            My Business Portfolio
                        </h3>
                        <p className="text-gray-600 mb-4">
                            A visual breakdown of your total business by product category.
                        </p>
                        <PortfolioChart />
                    </div>

                    {/* Recent Activity Widget */}
                    <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
                        <h3 className="text-lg font-semibold text-gray-800 mb-2">
                            <svg className="w-5 h-5 text-green-500 mr-2 inline" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                            </svg>
                            Recent Activity
                        </h3>
                        <p className="text-gray-600 mb-4">A log of recent actions.</p>
                        <div className="space-y-4">
                            <div className="pb-3 border-b border-gray-100">
                                <div className="flex items-start">
                                    <svg className="w-5 h-5 text-blue-500 mt-1 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                                    </svg>
                                    <div>
                                        <div className="text-gray-800">New lead added for Health Insurance</div>
                                        <div className="text-sm text-gray-500">Today, 10:15 AM</div>
                                    </div>
                                </div>
                            </div>
                            <div className="pb-3 border-b border-gray-100">
                                <div className="flex items-start">
                                    <svg className="w-5 h-5 text-green-500 mt-1 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                                    </svg>
                                    <div>
                                        <div className="text-gray-800">Client Amit Sharma policy issued</div>
                                        <div className="text-sm text-gray-500">Yesterday, 3:45 PM</div>
                                    </div>
                                </div>
                            </div>
                            <div className="pb-3 border-b border-gray-100">
                                <div className="flex items-start">
                                    {/* Rupee Icon for Incentive */}
                                    <div className="pb-3 border-b border-gray-100">
                                        <div className="flex items-start">
                                            {/* Rupee Icon for Incentive */}
                                            <svg className="w-5 h-5 text-yellow-500 mt-1 mr-3" viewBox="0 0 24 24" fill="currentColor">
                                                <path d="M12.9494914,6 C13.4853936,6.52514205 13.8531598,7.2212202 13.9645556,8 L17.5,8 C17.7761424,8 18,8.22385763 18,8.5 C18,8.77614237 17.7761424,9 17.5,9 L13.9645556,9 C13.7219407,10.6961471 12.263236,12 10.5,12 L7.70710678,12 L13.8535534,18.1464466 C14.0488155,18.3417088 14.0488155,18.6582912 13.8535534,18.8535534 C13.6582912,19.0488155 13.3417088,19.0488155 13.1464466,18.8535534 L6.14644661,11.8535534 C5.83146418,11.538571 6.05454757,11 6.5,11 L10.5,11 C11.709479,11 12.7183558,10.1411202 12.9499909,9 L6.5,9 C6.22385763,9 6,8.77614237 6,8.5 C6,8.22385763 6.22385763,8 6.5,8 L12.9499909,8 C12.7183558,6.85887984 11.709479,6 10.5,6 L6.5,6 C6.22385763,6 6,5.77614237 6,5.5 C6,5.22385763 6.22385763,5 6.5,5 L10.5,5 L17.5,5 C17.7761424,5 18,5.22385763 18,5.5 C18,5.77614237 17.7761424,6 17.5,6 L12.9494914,6 L12.9494914,6 Z" />
                                            </svg>
                                            <div>
                                                <div className="text-gray-800">Incentive of ₹12,500 credited</div>
                                                <div className="text-sm text-gray-500">15 Oct 2023, 11:20 AM</div>
                                            </div>
                                        </div>
                                    </div>
                                    <div>
                                        <div className="text-gray-800">Incentive of ₹12,500 credited</div>
                                        <div className="text-sm text-gray-500">15 Oct 2023, 11:20 AM</div>
                                    </div>
                                </div>
                            </div>
                            <div className="pb-3 border-b border-gray-100">
                                <div className="flex items-start">
                                    <svg className="w-5 h-5 text-purple-500 mt-1 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                                    </svg>
                                    <div>
                                        <div className="text-gray-800">Lead Priya Singh converted to client</div>
                                        <div className="text-sm text-gray-500">14 Oct 2023, 4:30 PM</div>
                                    </div>
                                </div>
                            </div>
                            <div>
                                <div className="flex items-start">
                                    <svg className="w-5 h-5 text-indigo-500 mt-1 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
                                    </svg>
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