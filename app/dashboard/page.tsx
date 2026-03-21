'use client';

import { useState, useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import { DashboardService } from "../services/dashboardService";
import { useRouter } from "next/navigation";
import PortfolioChart from './components/PortfolioChart';
import toast from "react-hot-toast";
import { getToken, isTokenExpired } from "../lib/auth-token";

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

// ✅ Interface for top products
interface TopProduct {
    name: string;
    count: number;
    revenue: number;
    color: string;
}

export default function Dashboard() {
    const [user, setUser] = useState<UserProfile | null>(null);
    const [loading, setLoading] = useState(true);
    const [clientCount, setClientCount] = useState<number>(0);
    const [totalLeadsCount, setTotalLeadsCount] = useState<number>(0);
    const [totalEarnings, setTotalEarnings] = useState<string>("0");

    // ✅ New state for top products
    const [topProducts, setTopProducts] = useState<TopProduct[]>([
        { name: 'Health Insurance', count: 0, revenue: 0, color: 'from-blue-500 to-cyan-500' },
        { name: 'Life Insurance', count: 0, revenue: 0, color: 'from-green-500 to-emerald-500' },
        { name: 'Motor Insurance', count: 0, revenue: 0, color: 'from-yellow-500 to-orange-500' },
        { name: 'Travel Insurance', count: 0, revenue: 0, color: 'from-purple-500 to-pink-500' },
    ]);

    const router = useRouter();
    const hasFetched = useRef(false);

    // Capitalize function (unchanged)
    const capitalizeFullName = (name: string): string => {
        if (!name || name.trim() === '') return 'User';
        return name
            .toLowerCase()
            .split(' ')
            .filter(word => word.length > 0)
            .map(word => {
                if (word.includes('-')) {
                    return word
                        .split('-')
                        .map(part => part.charAt(0).toUpperCase() + part.slice(1))
                        .join('-');
                }
                return word.charAt(0).toUpperCase() + word.slice(1);
            })
            .join(' ');
    };

    // Fetch profile data (unchanged logic)
    useEffect(() => {
        if (hasFetched.current) return;
        hasFetched.current = true;

        const fetchProfile = async () => {
            try {

                const token = getToken();
                if (!token || isTokenExpired(token)) {
                    router.push("/");
                }
                setLoading(true);

                const data = await DashboardService.getProfile();
                const userData = data.user;
                const formattedUser = {
                    ...userData,
                    name: capitalizeFullName(userData.name)
                };
                setUser(formattedUser);

                // Fetch leads count
                try {
                    const [referralRes, detailedRes] = await Promise.all([
                        DashboardService.getLeads(),
                        DashboardService.getMyLeads()
                    ]);

                    const referralCount = (referralRes?.success && Array.isArray(referralRes.data)) ? referralRes.data.length : 0;
                    const detailedCount = (detailedRes?.success && Array.isArray(detailedRes.data)) ? detailedRes.data.length : 0;
                    setTotalLeadsCount(referralCount + detailedCount);
                } catch (err) {
                    console.error("Leads count fetch error:", err);
                }

                // Fetch earnings
                try {
                    const response = await DashboardService.getCompletedDetailLeads();
                    const rawList = Array.isArray(response)
                        ? response
                        : (response?.leads || response?.data || []);

                    if (Array.isArray(rawList)) {
                        const total = rawList.reduce((acc: number, curr: any) => {
                            let val = curr.net_payout_amount || 0;
                            if (typeof val === 'string') {
                                val = val.replace(/,/g, '');
                            }
                            return acc + (parseFloat(val) || 0);
                        }, 0);
                        setTotalEarnings(total.toLocaleString('en-IN'));

                        // ✅ Calculate top products from leads data
                        const productCounts: Record<string, { count: number; revenue: number }> = {};

                        rawList.forEach((lead: any) => {
                            const productName = lead.product_name || lead.product || 'Other';
                            const revenue = parseFloat(lead.net_payout_amount?.replace(/,/g, '') || '0');

                            if (!productCounts[productName]) {
                                productCounts[productName] = { count: 0, revenue: 0 };
                            }
                            productCounts[productName].count += 1;
                            productCounts[productName].revenue += revenue;
                        });

                        // Sort and get top 4 products
                        const sortedProducts = Object.entries(productCounts)
                            .sort((a, b) => b[1].revenue - a[1].revenue)
                            .slice(0, 4)
                            .map(([name, data], index) => ({
                                name,
                                count: data.count,
                                revenue: data.revenue,
                                color: ['from-blue-500 to-cyan-500', 'from-green-500 to-emerald-500', 'from-yellow-500 to-orange-500', 'from-purple-500 to-pink-500'][index]
                            }));

                        if (sortedProducts.length > 0) {
                            setTopProducts(sortedProducts);
                        }
                    }
                } catch (err) {
                    console.error("Earnings fetch error:", err);
                }

            } catch (error: any) {
                console.error("Profile fetch error:", error);
                if (error?.response?.status === 401) {
                    toast.error("Login session expired! Please login again.", { duration: 2000 });
                    document.cookie = `authToken=; path=/; expires=${new Date(0).toUTCString()}`;
                    setTimeout(() => router.push("/"), 500);
                }
            } finally {
                setLoading(false);
            }
        };
        fetchProfile();
    }, [router]);

    // Token check
    useEffect(() => {
        const token = getToken();
        if (!token || isTokenExpired(token)) {
            router.push("/");
        }
    }, [router]);

    // ✅ KPI Card Component
    const KpiCard = ({ icon, color, value, label, bgColor }: any) => (
        <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100 hover:shadow-md transition-shadow">
            <div className="flex items-start justify-between">
                <div className={`w-12 h-12 bg-linear-to-r ${color} rounded-2xl flex items-center justify-center text-white`}>
                    {icon}
                </div>
            </div>
            <div className="mt-4">
                <div className="text-2xl font-bold font-sans text-gray-800">
                    {loading ? "..." : value}
                </div>
                <div className="text-gray-600 mt-1">{label}</div>
            </div>
        </div>
    );

    return (
        <div className="flex-1 p-4 sm:p-6">
            <section className="animate-fade-in">
                {/* Welcome Header */}
                <motion.div
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.4 }}
                    className="relative bg-linear-to-r from-[#2076C7] to-[#1CADA3] rounded-2xl p-6 mb-6 text-white">
                    <div className="absolute bottom-4 right-6 text-xs sm:text-sm font-mono text-white/90 bg-black/20 px-2 py-1 rounded-md border border-white/10">
                        ID: <span className="text-white-400 font-bold ml-1">
                            {loading ? "..." : (user?.adv_id || "N/A")}
                        </span>
                    </div>
                    <h2 className="text-xl sm:text-2xl font-bold mb-2 pr-20">
                        {loading ? "Loading..." : `Welcome back, ${user?.name || "Partner"}!`}
                    </h2>
                    <p className="text-sm sm:text-base">
                        Here's a snapshot of your business performance.
                    </p>
                </motion.div>

                {/* KPI Cards Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-6">
                    <KpiCard
                        icon={<svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" /></svg>}
                        color="from-blue-500 to-cyan-500"
                        value={`₹ ${totalEarnings}`}
                        label="Total Payout Earnings"
                    />

                    <KpiCard
                        icon={<svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" /></svg>}
                        color="from-green-500 to-emerald-500"
                        value="0"
                        label="Active Leads"
                    />

                    <KpiCard
                        icon={<svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>}
                        color="from-yellow-500 to-orange-500"
                        value="0"
                        label="Pending Leads"
                    />

                    <KpiCard
                        icon={<svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5h6m-3-3v3m-7 4h14v11a2 2 0 01-2 2H7a2 2 0 01-2-2V9zM9 14l2 2 4-4" /></svg>}
                        color="from-gray-400 to-gray-500"
                        value={loading ? "..." : totalLeadsCount}
                        label="Completed Leads"
                    />

                    <KpiCard
                        icon={<svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" /></svg>}
                        color="from-[#fb7185] to-[#fb7185]"
                        value={loading ? "..." : clientCount}
                        label="Total Clients"
                    />

                    <KpiCard
                        icon={<svg className="w-6 h-6" viewBox="0 0 24 24" fill="currentColor"><path d="M12.9494914,6 C13.4853936,6.52514205 13.8531598,7.2212202 13.9645556,8 L17.5,8 C17.7761424,8 18,8.22385763 18,8.5 C18,8.77614237 17.7761424,9 17.5,9 L13.9645556,9 C13.7219407,10.6961471 12.263236,12 10.5,12 L7.70710678,12 L13.8535534,18.1464466 C14.0488155,18.3417088 14.0488155,18.6582912 13.8535534,18.8535534 C13.6582912,19.0488155 13.3417088,19.0488155 13.1464466,18.8535534 L6.14644661,11.8535534 C5.83146418,11.538571 6.05454757,11 6.5,11 L10.5,11 C11.709479,11 12.7183558,10.1411202 12.9499909,9 L6.5,9 C6.22385763,9 6,8.77614237 6,8.5 C6,8.22385763 6.22385763,8 6.5,8 L12.9499909,8 C12.7183558,6.85887984 11.709479,6 10.5,6 L6.5,6 C6.22385763,6 6,5.77614237 6,5.5 C6,5.22385763 6.22385763,5 6.5,5 L10.5,5 L17.5,5 C17.7761424,5 18,5.22385763 18,5.5 C18,5.77614237 17.7761424,6 17.5,6 L12.9494914,6 L12.9494914,6 Z" /></svg>}
                        color="from-gray-700 to-gray-900"
                        value="0"
                        label="Incentives Earned"
                    />
                </div>

                {/* Visual Data Widgets */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
                    {/* Portfolio Chart */}
                    <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
                        <h3 className="text-base sm:text-lg font-semibold text-gray-800 mb-2">
                            <svg className="w-5 h-5 text-blue-500 mr-2 inline" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 3.055A9.001 9.001 0 1020.945 13H11V3.055z" />
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20.488 9H15V3.512A9.025 9.025 0 0120.488 9z" />
                            </svg>
                            Business Portfolio
                        </h3>
                        <p className="text-xs sm:text-sm text-gray-600 mb-4">
                            Revenue breakdown by product category
                        </p>
                        <PortfolioChart />
                    </div>

                    {/* Top Products Section - Replaced Recent Activity */}
                    <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
                        <h3 className="text-lg font-semibold text-gray-800 mb-4">
                            <svg className="w-5 h-5 text-purple-500 mr-2 inline" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                            </svg>
                            Top Performing Products
                        </h3>

                        {loading ? (
                            <div className="space-y-3">
                                {[1, 2, 3, 4].map(i => (
                                    <div key={i} className="animate-pulse flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                                        <div className="h-4 bg-gray-200 rounded w-32"></div>
                                        <div className="h-4 bg-gray-200 rounded w-20"></div>
                                    </div>
                                ))}
                            </div>
                        ) : (
                            <div className="space-y-4">
                                {topProducts.map((product, index) => {
                                    const maxRevenue = Math.max(...topProducts.map(p => p.revenue));
                                    const percentage = maxRevenue > 0 ? (product.revenue / maxRevenue * 100).toFixed(0) : 0;

                                    return (
                                        <motion.div
                                            key={product.name}
                                            initial={{ opacity: 0, y: 10 }}
                                            animate={{ opacity: 1, y: 0 }}
                                            transition={{ delay: index * 0.1 }}
                                            className="group"
                                        >
                                            <div className="flex items-center justify-between mb-1">
                                                <div className="flex items-center space-x-2">
                                                    <span className={`w-2 h-2 rounded-full bg-linear-to-r ${product.color}`} />
                                                    <span className="text-sm font-medium text-gray-700">{product.name}</span>
                                                </div>
                                                <div className="text-right">
                                                    <span className="text-sm font-semibold text-gray-900">
                                                        ₹{product.revenue.toLocaleString('en-IN')}
                                                    </span>
                                                    <span className="text-xs text-gray-500 ml-2">
                                                        ({product.count} {product.count === 1 ? 'policy' : 'policies'})
                                                    </span>
                                                </div>
                                            </div>

                                            {/* Progress bar with label */}
                                            <div className="relative pt-1">
                                                <div className="flex items-center justify-between text-xs text-gray-500 mb-1">
                                                    <span>Revenue share</span>
                                                    <span>{percentage}% of top product</span>
                                                </div>
                                                <div className="overflow-hidden h-2 text-xs flex rounded-full bg-gray-100">
                                                    <motion.div
                                                        initial={{ width: 0 }}
                                                        animate={{ width: `${percentage}%` }}
                                                        transition={{ duration: 0.5, delay: index * 0.1 }}
                                                        className={`shadow-none flex flex-col text-center whitespace-nowrap text-white justify-center bg-linear-to-r ${product.color}`}
                                                    />
                                                </div>
                                            </div>

                                            {/* Mini metric badges */}
                                            <div className="flex gap-3 mt-1">
                                                <div className="text-xs text-gray-500">
                                                    <span className="font-medium text-gray-700">Avg. per policy: </span>
                                                    ₹{product.count > 0 ? (product.revenue / product.count).toFixed(0) : 0}
                                                </div>
                                            </div>
                                        </motion.div>
                                    );
                                })}

                                {topProducts.every(p => p.revenue === 0) && (
                                    <div className="text-center py-8">
                                        <div className="w-20 h-20 mx-auto mb-4 bg-gray-100 rounded-full flex items-center justify-center">
                                            <svg className="w-10 h-10 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 13V6a2 2 0 00-2-2H6a2 2 0 00-2 2v7m16 0v5a2 2 0 01-2 2H6a2 2 0 01-2-2v-5m16 0h-2.586a1 1 0 00-.707.293l-2.414 2.414a1 1 0 01-.707.293h-3.172a1 1 0 01-.707-.293l-2.414-2.414A1 1 0 006.586 13H4" />
                                            </svg>
                                        </div>
                                        <p className="text-gray-600 font-medium">No product data available yet</p>
                                        <p className="text-sm text-gray-400 mt-1">Start adding leads to see your top performers</p>
                                        <button className="mt-4 px-4 py-2 bg-blue-50 text-blue-600 rounded-lg text-sm font-medium hover:bg-blue-100 transition-colors">
                                            + Add Your First Lead
                                        </button>
                                    </div>
                                )}
                            </div>
                        )}

                        {/* Performance Summary Footer */}
                        {!loading && topProducts.some(p => p.revenue > 0) && (
                            <div className="mt-6 pt-4 border-t border-gray-100">
                                <div className="grid grid-cols-3 gap-3">
                                    <div className="bg-blue-50 rounded-lg p-3 text-center">
                                        <div className="text-xs text-blue-600 font-medium mb-1">Best Seller</div>
                                        <div className="font-semibold text-gray-800 text-sm truncate" title={topProducts[0]?.name}>
                                            {topProducts[0]?.name || 'N/A'}
                                        </div>
                                    </div>
                                    <div className="bg-green-50 rounded-lg p-3 text-center">
                                        <div className="text-xs text-green-600 font-medium mb-1">Total Revenue</div>
                                        <div className="font-semibold text-gray-800">
                                            ₹{topProducts.reduce((sum, p) => sum + p.revenue, 0).toLocaleString('en-IN')}
                                        </div>
                                    </div>
                                    <div className="bg-purple-50 rounded-lg p-3 text-center">
                                        <div className="text-xs text-purple-600 font-medium mb-1">Active Products</div>
                                        <div className="font-semibold text-gray-800">
                                            {topProducts.filter(p => p.revenue > 0).length}
                                        </div>
                                    </div>
                                </div>

                                {/* Performance tip */}
                                {topProducts[0]?.revenue > 0 && (
                                    <div className="mt-3 text-xs text-gray-500 flex items-center justify-center">
                                        <svg className="w-4 h-4 text-yellow-500 mr-1" fill="currentColor" viewBox="0 0 20 20">
                                            <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                                        </svg>
                                        Tip: {topProducts[0]?.name} is your top performer. Consider focusing more on this product!
                                    </div>
                                )}
                            </div>
                        )}
                    </div>
                </div>
            </section>
        </div>
    );
}