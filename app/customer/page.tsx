'use client';

import { useState, useEffect, useRef, useMemo } from 'react';
import { motion } from 'framer-motion';
// Import Recharts components
import { PieChart, Pie, Cell, Tooltip } from 'recharts';
import { fetchAllShares } from "../services/unlistedservices"; 
import { 
  TrendingUp, Layers, Home, BarChart3, 
  Clock, Globe, CheckCircle 
} from 'lucide-react';
import toast from "react-hot-toast";

export default function CustomerDashboard() {
    const [shares, setShares] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);
    const [chartReady, setChartReady] = useState(false); // Hydration fix
    const hasFetched = useRef(false);

    // Recharts hydration fix
    useEffect(() => {
        const timer = setTimeout(() => setChartReady(true), 200);
        return () => clearTimeout(timer);
    }, []);

    useEffect(() => {
        if (hasFetched.current) return;
        hasFetched.current = true;

        const loadMarketData = async () => {
            try {
                setLoading(true);
                const data = await fetchAllShares();
                const sharesList = Array.isArray(data) ? data : data?.data || [];
                setShares(sharesList);
            } catch (error) {
                console.error("Dashboard Load Error:", error);
                toast.error("Failed to sync unlisted market data");
            } finally {
                setLoading(false);
            }
        };

        loadMarketData();
    }, []);

    // Prepare Chart Data based on your KPI cards
    const chartData = useMemo(() => {
        return [
            { name: 'Unlisted Shares', value: shares.length, color: '#4f46e5' }, // Indigo
            { name: 'Mutual Funds', value: 0, color: '#0ea5e9' },               // Blue
            { name: 'Other Investments', value: 0, color: '#f97316' },         // Orange
            { name: 'Real Estate', value: 0, color: '#10b981' },               // Emerald
        ];
    }, [shares]);

    return (
        <div className="flex-1 p-4 sm:p-6 bg-[#F8FAFC] min-h-screen font-sans">
            
            {/* --- HERO BANNER --- */}
            <motion.section 
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                className="relative bg-linear-to-r from-[#2076C7] to-[#1CADA3] rounded-3xl p-8 mb-8 text-white shadow-xl overflow-hidden"
            >
                <div className="relative z-10">
                    <span className="bg-white/20 backdrop-blur-md px-3 py-1 rounded-lg text-[10px] font-bold tracking-widest uppercase mb-4 inline-block">
                        Investment Console
                    </span>
                    <h2 className="text-3xl sm:text-4xl font-extrabold mb-2 tracking-tight">
                        Dashboard Overview
                    </h2>
                    <p className="text-white/80 text-sm sm:text-lg max-w-xl leading-relaxed">
                        Manage your wealth across all asset classes and explore <span className="text-white font-bold">{shares.length}</span> unlisted opportunities.
                    </p>
                </div>
                <Globe className="absolute -right-10 -bottom-10 w-64 h-64 text-white/5 rotate-12" />
            </motion.section>

            {/* --- KPI CARDS GRID --- */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
                <AssetCard 
                    title="Unlisted Shares" 
                    icon={<Layers className="w-5 h-5 text-white" />}
                    gradient="from-indigo-600 to-violet-600"
                    value={loading ? "..." : shares.length.toString()}
                    label="Live Opportunities"
                    badge="Dynamic"
                    badgeColor="bg-indigo-100 text-indigo-700"
                />
                <AssetCard 
                    title="Mutual Funds" 
                    icon={<TrendingUp className="w-5 h-5 text-white" />}
                    gradient="from-blue-500 to-cyan-500"
                    value="0"
                    label="Personal Portfolio"
                    badge="Placeholder"
                    badgeColor="bg-gray-100 text-gray-500"
                />
                <AssetCard 
                    title="Investments" 
                    icon={<BarChart3 className="w-5 h-5 text-white" />}
                    gradient="from-orange-500 to-red-500"
                    value="₹ 0.00"
                    label="PMS, AIF, Bonds, NPS"
                    badge="Placeholder"
                    badgeColor="bg-gray-100 text-gray-500"
                />
                <AssetCard 
                    title="Real Estate" 
                    icon={<Home className="w-5 h-5 text-white" />}
                    gradient="from-emerald-500 to-teal-600"
                    value="0"
                    label="Managed Properties"
                    badge="Placeholder"
                    badgeColor="bg-gray-100 text-gray-500"
                />
            </div>

            {/* --- PIE CHART SECTION (SAME AS ADMIN PATTERN) --- */}
            <motion.div 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="bg-white rounded-3xl p-8 shadow-sm border border-gray-100"
            >
                <div className="flex flex-col md:flex-row items-center gap-12">
                    {/* Chart Area */}
                    <div className="w-full md:w-1/2">
                        <h3 className="text-lg font-black text-gray-800 mb-6 uppercase tracking-tight">Portfolio Asset Allocation</h3>
                        
                        <div style={{ 
                            width: '100%', 
                            height: '350px', 
                            position: 'relative',
                            backgroundColor: '#f9fafb',
                            borderRadius: '2rem',
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
                                                borderRadius: '16px', 
                                                border: 'none', 
                                                boxShadow: '0 10px 15px -3px rgba(0,0,0,0.1)', 
                                                fontWeight: 'bold' 
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
                    <div className="w-full md:w-1/2 space-y-6">
                        <div className="grid grid-cols-1 gap-4">
                            <h4 className="text-[11px] font-black text-gray-400 uppercase tracking-[0.2em] mb-2">Asset Breakdown</h4>
                            {chartData.map((item, idx) => (
                                <div key={idx} className="flex items-center justify-between p-4 rounded-2xl bg-gray-50/50 border border-gray-100 transition-all hover:bg-white hover:shadow-sm">
                                    <div className="flex items-center gap-3">
                                        <div className="w-3 h-3 rounded-full" style={{ backgroundColor: item.color }}></div>
                                        <span className="text-sm font-bold text-gray-700">{item.name}</span>
                                    </div>
                                    <div className="flex items-center gap-4">
                                        <span className="text-lg font-black text-gray-900">{item.value}</span>
                                        <CheckCircle className="w-4 h-4 text-emerald-500" />
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </motion.div>

        </div>
    );
}

// --- REUSABLE PATTERN COMPONENT ---
function AssetCard({ title, icon, gradient, value, label, badge, badgeColor }: any) {
    return (
        <motion.div whileHover={{ y: -5 }} className="bg-white rounded-3xl p-6 shadow-sm border border-gray-100 group overflow-hidden">
            <div className="flex justify-between items-start mb-6">
                <div className={`w-12 h-12 rounded-2xl bg-linear-to-br ${gradient} flex items-center justify-center shadow-lg group-hover:rotate-6 transition-transform`}>
                    {icon}
                </div>
                <span className={`text-[9px] font-bold px-2 py-1 rounded-md tracking-tighter ${badgeColor}`}>
                    {badge}
                </span>
            </div>
            <p className="text-gray-400 text-[10px] font-bold uppercase tracking-widest">{title}</p>
            <h4 className="text-2xl font-black text-gray-800 tracking-tighter mt-1">{value}</h4>
            <div className="mt-4 pt-4 border-t border-gray-50 flex items-center gap-2">
                <Clock className="w-3 h-3 text-gray-300" />
                <span className="text-[10px] text-gray-400 font-bold uppercase">{label}</span>
            </div>
        </motion.div>
    );
}