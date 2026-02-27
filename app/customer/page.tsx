'use client';

import { useState, useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
// Update the import path to your unlistedservices.ts file
import { fetchAllShares } from "../services/unlistedservices"; 
import { 
  TrendingUp, Layers, Home, BarChart3, ArrowUpRight, 
  Clock, Zap, Search, Globe, ChevronRight 
} from 'lucide-react';
import toast from "react-hot-toast";

export default function CustomerDashboard() {
    const [shares, setShares] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);
    const hasFetched = useRef(false);

    useEffect(() => {
        if (hasFetched.current) return;
        hasFetched.current = true;

        const loadMarketData = async () => {
            try {
                setLoading(true);
                // Fetching ONLY the specific API requested
                const data = await fetchAllShares();
                
                // Set data handles both direct array or wrapped data
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
                
                {/* UNLISTED - Dynamic from API */}
                <AssetCard 
                    title="Unlisted Shares" 
                    icon={<Layers className="w-5 h-5 text-white" />}
                    gradient="from-indigo-600 to-violet-600"
                    value={loading ? "..." : shares.length.toString()}
                    label="Live Opportunities"
                    badge="Dynamic"
                    badgeColor="bg-indigo-100 text-indigo-700"
                />

                {/* MUTUAL FUNDS - UI Placeholder */}
                <AssetCard 
                    title="Mutual Funds" 
                    icon={<TrendingUp className="w-5 h-5 text-white" />}
                    gradient="from-blue-500 to-cyan-500"
                    value="0"
                    label="Personal Portfolio"
                    badge="Placeholder"
                    badgeColor="bg-gray-100 text-gray-500"
                />

                {/* INVESTMENTS - UI Placeholder */}
                <AssetCard 
                    title="Investments" 
                    icon={<BarChart3 className="w-5 h-5 text-white" />}
                    gradient="from-orange-500 to-red-500"
                    value="₹ 0.00"
                    label="PMS, AIF, Bonds, NPS"
                    badge="Placeholder"
                    badgeColor="bg-gray-100 text-gray-500"
                />

                {/* REAL ESTATE - UI Placeholder */}
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