'use client';

import { useState, useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import { AdminService } from '../services/adminService';
import { useRouter } from "next/navigation";
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

interface StatsData {
    total: number;
    active: number;
    pending: number;
    inactive: number;
}

interface Enquiry {
    id: number;
    status: 'Pending' | 'Closed';
    [key: string]: any;
}

export default function Dashboard() {
    const [user, setUser] = useState<UserProfile | null>(null);
    const [loading, setLoading] = useState(true);
    const [stats, setStats] = useState<StatsData>({
        total: 0,
        active: 0,
        pending: 0,
        inactive: 0
    });
    const [enquiries, setEnquiries] = useState<Enquiry[]>([]);
    const [totalCount, setTotalCount] = useState(0);
    const router = useRouter();
    const hasFetched = useRef(false);

    // ✅ Fetch all dashboard data from APIs
    useEffect(() => {
        if (hasFetched.current) return;
        hasFetched.current = true;

        const fetchDashboardData = async () => {
            try {
                const token = document.cookie.match(/authToken=([^;]+)/)?.[1];
                if (!token) return router.push("/");
                setLoading(true);

                // Fetch user profile
                const profileData = await AdminService.getAdminProfile();
                setUser(profileData.user);

                // // Fetch DSA statistics (you'll need to implement these API calls)
                // const dsaStats = await AdminService.getDSAStats(); // Implement this
                // setStats(dsaStats);

                // // Fetch enquiries
                // const enquiriesData = await AdminService.getEnquiries(); // Implement this
                // setEnquiries(enquiriesData.enquiries || []);
                // setTotalCount(enquiriesData.totalCount || 0);

            } catch (error: any) {
                console.error("Dashboard fetch error:", error);
                toast.error("Failed to fetch dashboard data.");
                
                if (error?.response?.status === 401) {
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
        fetchDashboardData();
    }, []);

    // token check 
    useEffect(() => {
        const cookie = document.cookie.includes("authToken=");
        if (!cookie) router.push("/");
    }, []);

    if (loading || !user)
        return (
            <div className="flex justify-center items-center h-[60vh] text-[#1CADA3]">
                Loading dashboard...
            </div>
        );

    return (
        <div className="flex-1 p-4 sm:p-6">
            {/* Dashboard Header */}
            <section className="animate-fade-in">
                <div className="flex justify-between items-center mb-6">
                    <div className="flex items-center space-x-4">
                        {/* You can add header content here if needed */}
                    </div>
                </div>

                {/* Welcome Message */}
                <motion.div
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.4 }}
                    className="bg-gradient-to-r from-[#2076C7] to-[#1CADA3] rounded-2xl p-6 mb-6 text-white">
                    <h2 className="text-xl sm:text-2xl font-bold mb-2">
                        Welcome back, {user?.name || "Partner"}.
                    </h2>
                    <p className="text-sm sm:text-base mb-4">Here&apos;s a snapshot of your business performance.</p>
                </motion.div>

                {/* DSA Statistics Cards */}
                <div className="mb-8">
                    <h3 className="text-lg font-semibold text-gray-800 mb-4">DSA Overview</h3>
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
                        {/* Total DSAs */}
                        <motion.div 
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.3 }}
                            className="bg-white rounded-xl shadow-sm border border-gray-100 p-5 hover:shadow-md transition-shadow duration-300"
                        >
                            <div className="flex items-start justify-between">
                                <div>
                                    <p className="text-sm font-medium text-gray-600 mb-1">Total DSAs</p>
                                    <p className="text-2xl font-bold text-gray-900">{stats.total}</p>
                                </div>
                                <div className="p-3 bg-blue-50 rounded-lg">
                                    <svg className="w-6 h-6 text-blue-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                                    </svg>
                                </div>
                            </div>
                            <div className="mt-4 pt-3 border-t border-gray-100">
                                <span className="text-xs text-gray-500">All registered DSAs</span>
                            </div>
                        </motion.div>

                        {/* Active DSAs */}
                        <motion.div 
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.3, delay: 0.1 }}
                            className="bg-white rounded-xl shadow-sm border border-gray-100 p-5 hover:shadow-md transition-shadow duration-300"
                        >
                            <div className="flex items-start justify-between">
                                <div>
                                    <p className="text-sm font-medium text-gray-600 mb-1">Active DSAs</p>
                                    <p className="text-2xl font-bold text-gray-900">{stats.active}</p>
                                </div>
                                <div className="p-3 bg-green-50 rounded-lg">
                                    <svg className="w-6 h-6 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                                    </svg>
                                </div>
                            </div>
                            <div className="mt-4 pt-3 border-t border-gray-100">
                                <span className="text-xs text-gray-500">Currently active</span>
                            </div>
                        </motion.div>
                        {/* Inactive DSAs */}
                        <motion.div 
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.3, delay: 0.3 }}
                            className="bg-white rounded-xl shadow-sm border border-gray-100 p-5 hover:shadow-md transition-shadow duration-300"
                        >
                            <div className="flex items-start justify-between">
                                <div>
                                    <p className="text-sm font-medium text-gray-600 mb-1">Inactive DSAs</p>
                                    <p className="text-2xl font-bold text-gray-900">{stats.inactive}</p>
                                </div>
                                <div className="p-3 bg-purple-50 rounded-lg">
                                    <svg className="w-6 h-6 text-purple-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                                    </svg>
                                </div>
                            </div>
                            <div className="mt-4 pt-3 border-t border-gray-100">
                                <span className="text-xs text-gray-500">Currently inactive</span>
                            </div>
                        </motion.div>
                    </div>
                </div>

                {/* Enquiries Statistics Cards */}
                <div className="mb-8">
                    <h3 className="text-lg font-semibold text-gray-800 mb-4">Enquiries Overview</h3>
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
                        {/* Total Enquiries */}
                        <motion.div 
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.3, delay: 0.4 }}
                            className="bg-white rounded-xl shadow-sm border border-gray-100 p-5 hover:shadow-md transition-shadow duration-300"
                        >
                            <div className="flex items-start justify-between">
                                <div>
                                    <p className="text-sm font-medium text-gray-600 mb-1">Total Enquiries</p>
                                    <p className="text-2xl font-bold text-gray-900">{totalCount}</p>
                                </div>
                                <div className="p-3 bg-blue-50 rounded-lg">
                                    <svg className="w-6 h-6 text-blue-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                                    </svg>
                                </div>
                            </div>
                            <div className="mt-4 pt-3 border-t border-gray-100">
                                <span className="text-xs text-gray-500">All time enquiries</span>
                            </div>
                        </motion.div>

                        {/* Pending Enquiries */}
                        <motion.div 
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.3, delay: 0.5 }}
                            className="bg-white rounded-xl shadow-sm border border-gray-100 p-5 hover:shadow-md transition-shadow duration-300"
                        >
                            <div className="flex items-start justify-between">
                                <div>
                                    <p className="text-sm font-medium text-gray-600 mb-1">Pending</p>
                                    <p className="text-2xl font-bold text-gray-900">{enquiries.filter(e => e.status === 'Pending').length}</p>
                                </div>
                                <div className="p-3 bg-orange-50 rounded-lg">
                                    <svg className="w-6 h-6 text-orange-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                                    </svg>
                                </div>
                            </div>
                            <div className="mt-4 pt-3 border-t border-gray-100">
                                <span className="text-xs text-gray-500">Awaiting response</span>
                            </div>
                        </motion.div>
                        {/* Closed Enquiries */}
                        <motion.div 
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.3, delay: 0.7 }}
                            className="bg-white rounded-xl shadow-sm border border-gray-100 p-5 hover:shadow-md transition-shadow duration-300"
                        >
                            <div className="flex items-start justify-between">
                                <div>
                                    <p className="text-sm font-medium text-gray-600 mb-1">Closed</p>
                                    <p className="text-2xl font-bold text-gray-900">{enquiries.filter(e => e.status === 'Closed').length}</p>
                                </div>
                                <div className="p-3 bg-gray-50 rounded-lg">
                                    <svg className="w-6 h-6 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                                    </svg>
                                </div>
                            </div>
                            <div className="mt-4 pt-3 border-t border-gray-100">
                                <span className="text-xs text-gray-500">Marked as closed</span>
                            </div>
                        </motion.div>
                    </div>
                </div>

                {/* Additional sections can be added here */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                    {/* Recent Activity Section */}
                    <motion.div 
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.4 }}
                        className="bg-white rounded-xl shadow-sm border border-gray-100 p-6"
                    >
                        <h3 className="text-lg font-semibold text-gray-800 mb-4">Recent Activity</h3>
                        <div className="space-y-4">
                            <div className="flex items-center space-x-3">
                                <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                                <p className="text-sm text-gray-600">No recent activity to display</p>
                            </div>
                            <div className="text-center py-4">
                                <p className="text-gray-500 text-sm">Activity feed will appear here</p>
                            </div>
                        </div>
                    </motion.div>

                    {/* Quick Actions Section */}
                    <motion.div 
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.4, delay: 0.1 }}
                        className="bg-white rounded-xl shadow-sm border border-gray-100 p-6"
                    >
                        <h3 className="text-lg font-semibold text-gray-800 mb-4">Quick Actions</h3>
                        <div className="grid grid-cols-2 gap-3">
                            <button className="p-3 bg-blue-50 hover:bg-blue-100 rounded-lg transition-colors duration-200">
                                <span className="text-sm font-medium text-blue-700">Add New DSA</span>
                            </button>
                            <button className="p-3 bg-green-50 hover:bg-green-100 rounded-lg transition-colors duration-200">
                                <span className="text-sm font-medium text-green-700">View Reports</span>
                            </button>
                            <button className="p-3 bg-orange-50 hover:bg-orange-100 rounded-lg transition-colors duration-200">
                                <span className="text-sm font-medium text-orange-700">Check Enquiries</span>
                            </button>
                            <button className="p-3 bg-purple-50 hover:bg-purple-100 rounded-lg transition-colors duration-200">
                                <span className="text-sm font-medium text-purple-700">Settings</span>
                            </button>
                        </div>
                    </motion.div>
                </div>

                {/* Summary Section */}
                <motion.div 
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.4, delay: 0.2 }}
                    className="mt-8 bg-gradient-to-r from-gray-50 to-gray-100 rounded-xl p-6"
                >
                    <h3 className="text-lg font-semibold text-gray-800 mb-3">Performance Summary</h3>
                    <p className="text-gray-600 text-sm">
                        Dashboard shows {stats.total} total DSAs and {totalCount} enquiries. 
                        {enquiries.filter(e => e.status === 'Pending').length > 0 && 
                            ` You have ${enquiries.filter(e => e.status === 'Pending').length} pending enquiries requiring attention.`
                        }
                    </p>
                </motion.div>
            </section>
        </div>
    );
}