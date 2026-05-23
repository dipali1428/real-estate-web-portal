'use client';

import { useState, useEffect, useRef, useMemo } from 'react';
import { motion } from 'framer-motion';
import { PieChart, Pie, Cell, Tooltip, ResponsiveContainer } from 'recharts';
import { fetchAllShares } from "../services/unlistedservices"; 
import customerService from "../services/customerService";
import { 
  TrendingUp, Layers, Home, BarChart3, CheckCircle, 
  ShieldCheck, Banknote, Landmark 
} from 'lucide-react';
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";

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
}

export default function CustomerDashboard() {
    const [customer, setCustomer] = useState<CustomerProfile | null>(null);
    const [shares, setShares] = useState<any[]>([]);
    
    // New state for counts (initialized to 0)
    const [counts, setCounts] = useState({
        unlisted: 0,
        mutualFunds: 0,
        investments: 0, // PMS, AIF, FD, Bonds, NCD, NPS
        realEstate: 0,
        loans: 0,       // Home, Personal, Business, etc.
        insurance: 0    // Life, Health, Motor, etc.
    });

    const [loading, setLoading] = useState(true);
    const [chartReady, setChartReady] = useState(false);
    const hasFetched = useRef(false);
    const router = useRouter();

    useEffect(() => {
        const timer = setTimeout(() => setChartReady(true), 200);
        return () => clearTimeout(timer);
    }, []);

    const capitalizeFullName = (name: string): string => {
        if (!name || name.trim() === '') return 'Investor';
        return name.toLowerCase().split(' ').filter(word => word.length > 0)
            .map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ');
    };

    useEffect(() => {
        if (hasFetched.current) return;
        hasFetched.current = true;

        const fetchDashboardData = async () => {
            try {
                const token = document.cookie.match(/authToken=([^;]+)/)?.[1];
                if (!token) {
                    router.push("/");
                    return;
                }
                
                setLoading(true);
                
                // 1. Fetch Profile
                try {
                    const profileResponse = await customerService.getProfile();
                    const userData = profileResponse.user || profileResponse;
                    setCustomer({
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
                    });
                } catch (profileErr: any) {
                    if (profileErr?.response?.status === 401) {
                        router.push("/");
                    }
                }

                // 2. Fetch Unlisted (Existing logic)
                const unlistedData = await fetchAllShares();
                const sharesList = Array.isArray(unlistedData) ? unlistedData : unlistedData?.data || [];
                setShares(sharesList);

                // 3. Update Counts (Replace 0 with actual service calls like fetchLoans(), fetchInsurance(), etc.)
                setCounts({
                    unlisted: sharesList.length,
                    mutualFunds: 0, // Replace with API call
                    investments: 0, // Replace with API call (PMS, AIF, Bonds, etc.)
                    realEstate: 0,  // Replace with API call
                    loans: 0,       // Replace with API call
                    insurance: 0    // Replace with API call
                });
                
            } catch (error) {
                toast.error("Failed to load dashboard data");
            } finally {
                setLoading(false);
            }
        };

        fetchDashboardData();
    }, [router]);

    // Updated Chart Data to include all new categories
    const chartData = useMemo(() => {
        return [
            { name: 'Unlisted Shares', value: counts.unlisted, color: '#4f46e5' },
            { name: 'Mutual Funds', value: counts.mutualFunds, color: '#0ea5e9' },
            { name: 'Investments', value: counts.investments, color: '#f97316' },
            { name: 'Real Estate', value: counts.realEstate, color: '#10b981' },
            { name: 'Loans', value: counts.loans, color: '#ef4444' },
            { name: 'Insurance', value: counts.insurance, color: '#8b5cf6' },
        ];
    }, [counts]);

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
                <div className="text-gray-600 mt-1 text-sm font-medium">{label}</div>
            </div>
        </div>
    );

    return (
        <div className="flex-1 p-4 sm:p-6 bg-[#F8FAFC] min-h-screen font-sans">
            <section className="animate-fade-in">
                {/* --- WELCOME HEADER --- */}
                <motion.div
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="relative bg-linear-to-r from-[#2076C7] to-[#1CADA3] rounded-2xl p-6 mb-6 text-white"
                >
                    <h2 className="text-xl sm:text-2xl font-bold mb-2 pr-10 sm:pr-20">
                        {loading ? "Loading..." : `Welcome back, ${customer?.name || "Investor"}!`}
                    </h2>
                    <p className="text-sm sm:text-base text-white/80">
                        Comprehensive view of your financial ecosystem.
                    </p>
                </motion.div>

                {/* --- KPI CARDS GRID (Updated to 3 columns to handle more items) --- */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-6">
                    <KpiCard 
                        icon={<Layers className="w-5 h-5" />}
                        color="from-indigo-600 to-violet-600"
                        value={counts.unlisted.toString()}
                        label="Unlisted Shares"
                        badge="Equity"
                        badgeColor="bg-indigo-100 text-indigo-700"
                    />
                    <KpiCard 
                        icon={<TrendingUp className="w-5 h-5" />}
                        color="from-blue-500 to-cyan-500"
                        value={counts.mutualFunds.toString()}
                        label="Mutual Funds"
                        badge="Portfolio"
                        badgeColor="bg-blue-100 text-blue-700"
                    />
                    <KpiCard 
                        icon={<BarChart3 className="w-5 h-5" />}
                        color="from-orange-500 to-red-500"
                        value={counts.investments.toString()}
                        label="PMS, AIF, Bonds, FD, NPS"
                        badge="Investments"
                        badgeColor="bg-orange-100 text-orange-700"
                    />
                    <KpiCard 
                        icon={<Banknote className="w-5 h-5" />}
                        color="from-rose-500 to-pink-600"
                        value={counts.loans.toString()}
                        label="Loans & Credit Cards"
                        badge="Liabilities"
                        badgeColor="bg-rose-100 text-rose-700"
                    />
                    <KpiCard 
                        icon={<ShieldCheck className="w-5 h-5" />}
                        color="from-purple-500 to-indigo-600"
                        value={counts.insurance.toString()}
                        label="Insurance Policies"
                        badge="Protection"
                        badgeColor="bg-purple-100 text-purple-700"
                    />
                    <KpiCard 
                        icon={<Home className="w-5 h-5" />}
                        color="from-emerald-500 to-teal-600"
                        value={counts.realEstate.toString()}
                        label="Real Estate"
                        badge="Assets"
                        badgeColor="bg-emerald-100 text-emerald-700"
                    />
                </div>

                {/* --- PIE CHART SECTION --- */}
                <motion.div 
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="bg-white rounded-2xl p-4 sm:p-6 shadow-sm border border-gray-100"
                >
                    <h3 className="text-base sm:text-lg font-semibold text-gray-800 mb-2 flex items-center">
                        <Landmark className="w-5 h-5 text-blue-500 mr-2" />
                        Complete Asset Allocation
                    </h3>
                    <p className="text-xs sm:text-sm text-gray-600 mb-4">
                        Consolidated view of all your financial holdings and liabilities.
                    </p>

<div className="flex flex-col xl:flex-row items-stretch gap-6 xl:gap-8">
    {/* Chart Area */}
    <div className="w-full xl:w-1/2">
        <div className="w-full aspect-square max-h-[400px] mx-auto rounded-2xl overflow-hidden bg-gray-50/30 p-3 sm:p-4">
            {chartReady ? (
                <ResponsiveContainer width="100%" height="100%">
                    <PieChart>
                        <Pie
                            data={chartData.filter(d => d.value > 0)} 
                            cx="50%"
                            cy="50%"
                            innerRadius="35%"
                            outerRadius="65%"
                            paddingAngle={2}
                            dataKey="value"
                            isAnimationActive={true}
                        >
                            {chartData.map((entry, index) => (
                                <Cell key={`cell-${index}`} fill={entry.color} stroke="rgba(255,255,255,0.5)" strokeWidth={2} />
                            ))}
                        </Pie>
                        <Tooltip 
                            contentStyle={{ 
                                borderRadius: '8px', 
                                border: 'none', 
                                boxShadow: '0 4px 6px -1px rgba(0,0,0,0.1)',
                                fontSize: '11px',
                                padding: '6px 10px'
                            }}
                        />
                    </PieChart>
                </ResponsiveContainer>
            ) : (
                <div className="w-full h-full flex items-center justify-center">
                    <div className="text-center">
                        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600 mx-auto mb-2"></div>
                        <p className="text-gray-400 text-xs">Loading...</p>
                    </div>
                </div>
            )}
        </div>
    </div>

    {/* Legend Area */}
    <div className="w-full xl:w-1/2">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
            {chartData.map((item, idx) => (
                <div 
                    key={idx} 
                    className="group flex items-center justify-between p-2.5 rounded-lg bg-gray-50/50 hover:bg-white transition-all duration-200 border border-transparent hover:border-gray-200 cursor-pointer"
                >
                    <div className="flex items-center gap-2 min-w-0">
                        <div className="w-2.5 h-2.5 rounded-full shrink-0" style={{ backgroundColor: item.color }}></div>
                        <span className="text-xs font-medium text-gray-700 truncate">{item.name}</span>
                    </div>
                    <div className="flex items-center gap-1.5">
                        <span className="text-xs font-bold text-gray-900">{item.value}%</span>
                        <CheckCircle className="w-3 h-3 text-emerald-500 shrink-0 opacity-60 group-hover:opacity-100" />
                    </div>
                </div>
            ))}
        </div>
    </div>
</div>
                </motion.div>
            </section>
        </div>
    );
}