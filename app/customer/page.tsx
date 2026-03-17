'use client';

import { useState, useEffect, useRef, useMemo } from 'react';
import { motion } from 'framer-motion';
// Import Recharts components
import { PieChart, Pie, Cell, Tooltip } from 'recharts';
import { fetchAllShares } from "../services/unlistedservices"; 
import customerService from "../services/customerService";
import { 
  TrendingUp, Layers, Home, BarChart3, 
  Clock, Globe, CheckCircle 
} from 'lucide-react';
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";
import api from "../services/api"; // Import your api instance

// ✅ Interface for customer profile (based on your API pattern)
interface CustomerProfile {
 id: number;
    adv_id?: string;
    name: string;
    email: string;
    mobile: string;
    city?: string;
    head?: string;
    category?: string;
    pan?: string;
    pan_verified?: boolean;
    // Add other fields as per your API response
}

export default function CustomerDashboard() {
    const [customer, setCustomer] = useState<CustomerProfile | null>(null);
    const [shares, setShares] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);
    const [chartReady, setChartReady] = useState(false); // Hydration fix
    const hasFetched = useRef(false);
    const router = useRouter();

    // Recharts hydration fix
    useEffect(() => {
        const timer = setTimeout(() => setChartReady(true), 200);
        return () => clearTimeout(timer);
    }, []);

    // ✅ Capitalize function (same as first dashboard)
    const capitalizeFullName = (name: string): string => {
        if (!name || name.trim() === '') return 'Investor';
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

    // ✅ Fetch customer profile and market data
    useEffect(() => {
        if (hasFetched.current) return;
        hasFetched.current = true;

        const fetchDashboardData = async () => {
            try {
                // Check for auth token
                const token = document.cookie.match(/authToken=([^;]+)/)?.[1];
                if (!token) {
                    router.push("/");
                    return;
                }
                
                setLoading(true);
                // ✅ Fetch customer profile using the correct API
                try {
                    const profileResponse = await customerService.getProfile();
                    console.log('Profile response:', profileResponse);
                    
                    // Extract user data from response
                    const userData = profileResponse.user || profileResponse;
                    
                    const formattedCustomer = {
                        id: userData.id,
                        adv_id: userData.adv_id,
                        name: capitalizeFullName(userData.name || ''),
                        email: userData.email || '',
                        mobile: userData.mobile || '',
                        city: userData.city || '',
                        head: userData.head || '',
                        category: userData.category || '',
                        pan: userData.pan || '',
                        pan_verified: userData.pan_verified || false
                    };
                    
                    setCustomer(formattedCustomer);
                    
                    // You can also store KYC details if needed
                    if (profileResponse.kycDetails) {
                        console.log('KYC Details:', profileResponse.kycDetails);
                        // You can set these in state if you want to display KYC status on dashboard
                        // setKycDetails(profileResponse.kycDetails);
                    }
                    
                } catch (profileErr: any) {
                    console.error("Profile fetch error:", profileErr);
                    
                    if (profileErr?.response?.status === 401) {
                        toast.error("Session expired! Please login again.");
                        document.cookie = `authToken=; path=/; expires=${new Date(0).toUTCString()}`;
                        setTimeout(() => router.push("/"), 500);
                    } else {
                        // Set a default/fallback customer name
                        setCustomer({
                            id: 0,
                            name: "Investor",
                            email: "",
                            mobile: ""
                        });
                    }
                }

                // ✅ Fetch market data (existing code)
                const data = await fetchAllShares();
                const sharesList = Array.isArray(data) ? data : data?.data || [];
                setShares(sharesList);
                
            } catch (error) {
                console.error("Dashboard Load Error:", error);
                toast.error("Failed to load dashboard data");
            } finally {
                setLoading(false);
            }
        };

        fetchDashboardData();
    }, [router]);

    // Prepare Chart Data based on your KPI cards
    const chartData = useMemo(() => {
        return [
            { name: 'Unlisted Shares', value: shares.length, color: '#4f46e5' }, // Indigo
            { name: 'Mutual Funds', value: 0, color: '#0ea5e9' },               // Blue
            { name: 'Other Investments', value: 0, color: '#f97316' },         // Orange
            { name: 'Real Estate', value: 0, color: '#10b981' },               // Emerald
        ];
    }, [shares]);

    // ✅ KPI Card Component (same styling as first dashboard)
    const KpiCard = ({ icon, color, value, label, badge, badgeColor }: any) => (
        <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100 hover:shadow-md transition-shadow">
            <div className="flex items-start justify-between">
                <div className={`w-12 h-12 bg-linear-to-r ${color} rounded-2xl flex items-center justify-center text-white`}>
                    {icon}
                </div>
                {badge && (
                    <span className={`text-[9px] font-bold px-2 py-1 rounded-md tracking-tighter ${badgeColor}`}>
                        {badge}
                    </span>
                )}
            </div>
            <div className="mt-4">
                <div className="text-2xl font-bold font-sans text-gray-800">
                    {loading ? "..." : value}
                </div>
                <div className="text-gray-600 mt-1 text-sm">{label}</div>
            </div>
        </div>
    );

    return (
        <div className="flex-1 p-4 sm:p-6 bg-[#F8FAFC] min-h-screen font-sans">
            <section className="animate-fade-in">
                {/* --- WELCOME HEADER WITH CUSTOMER NAME --- */}
                <motion.div
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.4 }}
                    className="relative bg-linear-to-r from-[#2076C7] to-[#1CADA3] rounded-2xl p-6 mb-6 text-white"
                >
                    <h2 className="text-xl sm:text-2xl font-bold mb-2 pr-20">
                        {loading ? "Loading..." : `Welcome back, ${customer?.name || "Investor"}!`}
                    </h2>
                    <p className="text-sm sm:text-base text-white/80">
                        Here's a snapshot of your investment portfolio performance.
                    </p>
                </motion.div>

                {/* --- KPI CARDS GRID --- */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-6">
                    <KpiCard 
                        icon={<Layers className="w-5 h-5" />}
                        color="from-indigo-600 to-violet-600"
                        value={loading ? "..." : shares.length.toString()}
                        label="Live Opportunities"
                        badge="Dynamic"
                        badgeColor="bg-indigo-100 text-indigo-700"
                    />
                    <KpiCard 
                        icon={<TrendingUp className="w-5 h-5" />}
                        color="from-blue-500 to-cyan-500"
                        value="0"
                        label="Personal Portfolio"
                        badge="Placeholder"
                        badgeColor="bg-gray-100 text-gray-500"
                    />
                    <KpiCard 
                        icon={<BarChart3 className="w-5 h-5" />}
                        color="from-orange-500 to-red-500"
                        value="₹ 0.00"
                        label="PMS, AIF, Bonds, NPS"
                        badge="Placeholder"
                        badgeColor="bg-gray-100 text-gray-500"
                    />
                    <KpiCard 
                        icon={<Home className="w-5 h-5" />}
                        color="from-emerald-500 to-teal-600"
                        value="0"
                        label="Managed Properties"
                        badge="Placeholder"
                        badgeColor="bg-gray-100 text-gray-500"
                    />
                </div>

                {/* --- PIE CHART SECTION --- */}
                <motion.div 
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100"
                >
                    <h3 className="text-base sm:text-lg font-semibold text-gray-800 mb-2">
                        <svg className="w-5 h-5 text-blue-500 mr-2 inline" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 3.055A9.001 9.001 0 1020.945 13H11V3.055z" />
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20.488 9H15V3.512A9.025 9.025 0 0120.488 9z" />
                        </svg>
                        Portfolio Asset Allocation
                    </h3>
                    <p className="text-xs sm:text-sm text-gray-600 mb-4">
                        Breakdown of your investment portfolio by asset class
                    </p>

                    <div className="flex flex-col md:flex-row items-center gap-8">
                        {/* Chart Area */}
                        <div className="w-full md:w-1/2">
                            <div style={{ 
                                width: '100%', 
                                height: '350px', 
                                position: 'relative',
                                borderRadius: '1rem',
                                overflow: 'hidden'
                            }}>
                                {chartReady ? (
                                    <div style={{ width: '100%', height: '100%', position: 'relative' }}>
                                        <PieChart width={500} height={350} style={{ position: 'absolute', top: 0, left: '50%', transform: 'translateX(-50%)' }}>
                                            <Pie
                                                data={chartData}
                                                cx="50%"
                                                cy="50%"
                                                innerRadius={80}
                                                outerRadius={120}
                                                paddingAngle={5}
                                                dataKey="value"
                                                isAnimationActive={true}
                                            >
                                                {chartData.map((entry, index) => (
                                                    <Cell key={`cell-${index}`} fill={entry.color} stroke="none" />
                                                ))}
                                            </Pie>
                                            <Tooltip 
                                                contentStyle={{ 
                                                    borderRadius: '12px', 
                                                    border: 'none', 
                                                    boxShadow: '0 10px 15px -3px rgba(0,0,0,0.1)', 
                                                    fontWeight: 'bold',
                                                    fontSize: '12px'
                                                }}
                                            />
                                        </PieChart>
                                    </div>
                                ) : (
                                    <div className="w-full h-full flex items-center justify-center">
                                        <p className="text-gray-400">Loading analysis...</p>
                                    </div>
                                )}
                            </div>
                        </div>

                        {/* Details/Legend Area */}
                        <div className="w-full md:w-1/2 space-y-4">
                            <h4 className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-2">Asset Breakdown</h4>
                            {chartData.map((item, idx) => (
                                <div key={idx} className="flex items-center justify-between p-3 rounded-lg bg-gray-50/50 border border-gray-100 transition-all hover:bg-white hover:shadow-sm">
                                    <div className="flex items-center gap-3">
                                        <div className="w-3 h-3 rounded-full" style={{ backgroundColor: item.color }}></div>
                                        <span className="text-sm font-medium text-gray-700">{item.name}</span>
                                    </div>
                                    <div className="flex items-center gap-3">
                                        <span className="text-sm font-semibold text-gray-900">{item.value}</span>
                                        <CheckCircle className="w-4 h-4 text-emerald-500" />
                                    </div>
                                </div>
                            ))}

                        </div>
                    </div>
                </motion.div>
            </section>
        </div>
    );
}