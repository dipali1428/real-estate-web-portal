'use client';

import { useState, useMemo, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { bondsData, Bond } from '../../products/bonds/data/bondsData';
import { 
    ShoppingCart, CreditCard, ChevronRight, TrendingUp, 
    ShieldCheck, Filter, Bookmark, Search, Info, 
    ArrowUpRight, PieChart, HelpCircle, Briefcase, 
    Wallet, CheckCircle2, Clock, Download, Plus, 
    Sparkles, AlertCircle, ShoppingBag, FileText,
    Calendar, BarChart3
} from 'lucide-react';
import { 
    LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid,
    PieChart as RePieChart, Pie, Cell, Legend, BarChart, Bar
} from 'recharts';
import toast from 'react-hot-toast';
import { useWishlist } from '@/app/context/WishlistContext';
import Link from 'next/link';
import BondDetailModal from '../../products/bonds/components/BondDetailModal';

// Types for Portfolio
interface Investment {
    id: number;
    name: string;
    amount: number;
    investedDate: string;
    coupon: string;
    nextPayout: string;
    rating: string;
    status: "Active" | "Matured";
}

export default function CustomerBondsDashboard() {
    const { wishlist, toggleWishlist } = useWishlist();
    const [activeTab, setActiveTab] = useState<'explore' | 'investments' | 'compare'>('explore');
    const [selectedCategory, setSelectedCategory] = useState<string>('All');
    const [searchQuery, setSearchQuery] = useState<string>('');
    const [investments, setInvestments] = useState<Investment[]>([]);
    const [selectedCompareIds, setSelectedCompareIds] = useState<number[]>([]);
    const [loading, setLoading] = useState(true);
    const [selectedBondForModal, setSelectedBondForModal] = useState<Bond | null>(null);

    // Categories for Explore
    const categories = ['All', ...Array.from(new Set(bondsData.map(b => b.category)))];

    // Stats for Explore
    const marketplaceStats = useMemo(() => {
        const total = bondsData.length;
        const yields = bondsData.map(b => parseFloat(b.yield?.replace('%', '') || '0')).filter(y => !isNaN(y));
        const maxYield = yields.length > 0 ? Math.max(...yields).toFixed(2) : '0';
        const avgYield = yields.length > 0 ? (yields.reduce((a, b) => a + b, 0) / yields.length).toFixed(2) : '0';
        return { total, maxYield, avgYield };
    }, []);

    // Filter Logic for Explore
    const filteredBonds = useMemo(() => {
        return bondsData.filter(b => {
            const matchesCategory = selectedCategory === 'All' || b.category === selectedCategory;
            const matchesSearch = b.company.toLowerCase().includes(searchQuery.toLowerCase()) || 
                                 b.category.toLowerCase().includes(searchQuery.toLowerCase());
            return matchesCategory && matchesSearch;
        });
    }, [selectedCategory, searchQuery]);

    // Dynamic Portfolio Loading
    useEffect(() => {
        const loadPortfolio = () => {
            try {
                const stored = localStorage.getItem('bond_portfolio');
                if (stored) {
                    setInvestments(JSON.parse(stored));
                } else {
                    setInvestments([]);
                }
            } catch (e) {
                console.error("Failed to load portfolio", e);
            } finally {
                setLoading(false);
            }
        };

        loadPortfolio();
        window.addEventListener('storage', loadPortfolio);
        return () => window.removeEventListener('storage', loadPortfolio);
    }, []);

    // Stats for Portfolio
    const portfolioStats = useMemo(() => {
        if (investments.length === 0) return { total: 0, activeCount: 0, maturedCount: 0, returns: 0, risk: "N/A", weightedYield: 0, nextCoupon: "N/A" };
        const total = investments.reduce((sum, item) => sum + item.amount, 0);
        const activeCount = investments.filter(i => i.status === "Active").length;
        const maturedCount = investments.filter(i => i.status === "Matured").length;
        const returns = Math.round(total * 0.085);
        
        // Calculate dynamic values
        const coupons = investments.map(i => parseFloat(i.coupon?.replace('%', '') || '0'));
        const weightedYield = coupons.length > 0 ? (coupons.reduce((a, b) => a + b, 0) / coupons.length).toFixed(2) : 0;
        
        return { 
            total, 
            activeCount, 
            maturedCount, 
            returns, 
            risk: "LOW (AAA)", 
            weightedYield, 
            nextCoupon: "15 Apr 2026" // Sample for B2B demo
        };
    }, [investments]);

    // Chart Data for Portfolio
    const chartData = useMemo(() => {
        if (investments.length === 0) {
            return [
                { month: "Jan", returns: 0 },
                { month: "Feb", returns: 0 },
                { month: "Mar", returns: 0 },
                { month: "Apr", returns: 0 }
            ];
        }
        const baseReturn = portfolioStats.returns / 6;
        return [
            { month: "Jan", returns: Math.round(baseReturn * 1) },
            { month: "Feb", returns: Math.round(baseReturn * 2.2) },
            { month: "Mar", returns: Math.round(baseReturn * 3.5) },
            { month: "Apr", returns: Math.round(baseReturn * 4.8) },
            { month: "May", returns: Math.round(baseReturn * 5.5) },
            { month: "Jun", returns: portfolioStats.returns },
        ];
    }, [investments, portfolioStats.returns]);

    const handleAddToCart = (bond: Bond) => {
        // Functionality removed as per request
    };
    
    const handleBuyNow = (bond: Bond) => {
        // Functionality removed as per request
    };

    const handleToggleWishlist = (bond: Bond) => {
        const bondId = `bond-${bond.id}`;
        toggleWishlist({
            id: bondId,
            name: bond.company,
            category: 'fixed-income',
            logo: bond.company.substring(0, 2).toUpperCase(),
            addedDate: new Date().toISOString().split('T')[0],
            keyMetrics: {
                coupon: bond.coupon,
                yield: bond.yield,
                risk: bond.rating?.includes('AAA') || bond.rating === 'Sovereign' ? 'Low' : 'Moderate'
            } as any
        });

        const isInWishlist = wishlist.some(item => item.id === bondId);
        if (isInWishlist) {
            toast.success(`Removed ${bond.company} from wishlist`);
        } else {
            toast.success(`Saved ${bond.company} to wishlist!`);
        }
    };

    return (
        <div className="flex-1 p-4 sm:p-6 bg-[#F8FAFC] min-h-screen font-sans">
            {/* Main Toggle Navigation */}
            <div className="flex justify-start gap-4 mb-8">
                <button
                    onClick={() => setActiveTab('explore')}
                    className={`px-8 py-3 rounded-2xl font-black text-xs uppercase tracking-wider transition-all shadow-sm border border-gray-100 flex items-center gap-2 ${
                        activeTab === 'explore'
                            ? 'bg-gradient-to-br from-[#2076C7] to-[#1CADA3] text-white shadow-lg shadow-blue-200'
                            : 'bg-white text-gray-500 hover:text-[#2076C7]'
                    }`}
                >
                    <Search className={activeTab === 'explore' ? "w-4 h-4 animate-pulse" : "w-4 h-4"} /> 
                    Explore Bonds
                </button>
                <button
                    onClick={() => setActiveTab('investments')}
                    className={`px-8 py-3 rounded-2xl font-black text-xs uppercase tracking-wider transition-all shadow-sm border border-gray-100 flex items-center gap-2 ${
                        activeTab === 'investments'
                            ? 'bg-gradient-to-br from-[#2076C7] to-[#1CADA3] text-white shadow-lg shadow-blue-200'
                            : 'bg-white text-gray-500 hover:text-[#2076C7]'
                    }`}
                >
                    <Briefcase className={activeTab === 'investments' ? "w-4 h-4 animate-pulse" : "w-4 h-4"} /> 
                    My Holdings
                </button>
                <button
                    onClick={() => setActiveTab('compare')}
                    className={`px-8 py-3 rounded-2xl font-black text-xs uppercase tracking-wider transition-all shadow-sm border border-gray-100 flex items-center gap-2 ${
                        activeTab === 'compare'
                            ? 'bg-gradient-to-br from-[#2076C7] to-[#1CADA3] text-white shadow-lg shadow-blue-200'
                            : 'bg-white text-gray-500 hover:text-[#2076C7]'
                    }`}
                >
                    <BarChart3 className={activeTab === 'compare' ? "w-4 h-4 animate-pulse" : "w-4 h-4"} /> 
                    Compare Assets
                </button>
            </div>

            <AnimatePresence mode="wait">
                {activeTab === 'explore' ? (
                    <motion.div
                        key="explore"
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: 20 }}
                        transition={{ duration: 0.3 }}
                    >
                        {/* Explore View Content */}
                        <motion.section 
                            initial={{ opacity: 0, y: -10 }}
                            animate={{ opacity: 1, y: 0 }}
                            className="relative bg-gradient-to-r from-[#2076C7] to-[#1CADA3] rounded-3xl p-6 mb-6 text-white shadow-lg overflow-hidden"
                        >
                            <div className="relative z-10">
                                <span className="bg-white/20 backdrop-blur-md px-2.5 py-1 rounded-lg text-[9px] font-black tracking-widest uppercase mb-3 inline-block">
                                    Fixed Income
                                </span>
                                <h2 className="text-2xl sm:text-3xl font-extrabold mb-1 tracking-tight">
                                    Bonds Marketplace
                                </h2>
                                <p className="text-white/80 text-xs sm:text-sm max-w-lg leading-relaxed mb-1">
                                    Explore, evaluate, and invest in secure Bonds.
                                </p>
                            </div>
                            <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full blur-3xl -translate-y-1/2 translate-x-1/4" />
                        </motion.section>

                        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                            <div className="bg-white p-6 rounded-3xl border border-gray-100 shadow-sm flex items-center gap-4">
                                <div className="w-12 h-12 bg-blue-50 rounded-2xl flex items-center justify-center text-[#2076C7]">
                                    <PieChart className="w-6 h-6" />
                                </div>
                                <div>
                                    <p className="text-gray-400 text-[10px] font-black uppercase tracking-widest">Available Bonds</p>
                                    <h4 className="text-2xl font-black text-gray-800">{marketplaceStats.total}+</h4>
                                </div>
                            </div>
                            <div className="bg-white p-6 rounded-3xl border border-gray-100 shadow-sm flex items-center gap-4">
                                <div className="w-12 h-12 bg-teal-50 rounded-2xl flex items-center justify-center text-[#1CADA3]">
                                    <TrendingUp className="w-6 h-6" />
                                </div>
                                <div>
                                    <p className="text-gray-400 text-[10px] font-black uppercase tracking-widest">Highest Yield</p>
                                    <h4 className="text-2xl font-black text-gray-800">{marketplaceStats.maxYield}%</h4>
                                </div>
                            </div>
                            <div className="bg-white p-6 rounded-3xl border border-gray-100 shadow-sm flex items-center gap-4 border-r-4 border-r-[#2076C7]">
                                <div className="w-12 h-12 bg-orange-50 rounded-2xl flex items-center justify-center text-orange-500">
                                    <ArrowUpRight className="w-6 h-6" />
                                </div>
                                <div>
                                    <p className="text-gray-400 text-[10px] font-black uppercase tracking-widest">Avg. Returns</p>
                                    <h4 className="text-2xl font-black text-gray-800">~{marketplaceStats.avgYield}%</h4>
                                </div>
                            </div>
                        </div>

                        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6 mb-8">
                            <div className="flex items-center gap-4 overflow-x-auto pb-4 lg:pb-0 scrollbar-hide shrink-0">
                                <div className="flex items-center gap-2 text-gray-500 font-semibold mr-2 border-r border-gray-300 pr-4">
                                    <Filter className="w-4 h-4" />
                                    <span className="text-sm">Filter:</span>
                                </div>
                                {categories.map(cat => (
                                    <button
                                        key={cat}
                                        onClick={() => setSelectedCategory(cat)}
                                        className={`px-5 py-2 rounded-xl font-bold text-xs transition-all whitespace-nowrap ${
                                            selectedCategory === cat 
                                                ? 'bg-[#2076C7] text-white shadow-md' 
                                                : 'bg-white text-gray-600 border border-gray-100 hover:border-[#2076C7]/30'
                                        }`}
                                    >
                                        {cat}
                                    </button>
                                ))}
                            </div>

                            <div className="relative flex-1 max-w-md">
                                <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 w-4 h-4" />
                                <input 
                                    type="text" 
                                    placeholder="Search company or category..."
                                    value={searchQuery}
                                    onChange={(e) => setSearchQuery(e.target.value)}
                                    className="w-full pl-12 pr-4 py-3 rounded-2xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-[#2076C7]/10 bg-white transition-all text-sm font-semibold"
                                />
                            </div>
                        </div>

                        <div className="bg-white rounded-[2.5rem] border border-gray-100 shadow-sm p-8">
                            <div className="max-h-[750px] overflow-y-auto pr-4 scrollbar-thin scrollbar-thumb-gray-200 scrollbar-track-transparent">
                                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8 pb-6">
                                    {filteredBonds.map((bond, idx) => (
                                        <motion.div 
                                            initial={{ opacity: 0, scale: 0.95 }}
                                            animate={{ opacity: 1, scale: 1 }}
                                            transition={{ delay: idx * 0.05, duration: 0.3 }}
                                            key={bond.id} 
                                            className="bg-white rounded-[2rem] p-6 shadow-sm border border-gray-100 hover:shadow-xl hover:-translate-y-1 transition-all duration-300 flex flex-col h-full group"
                                        >
                                            <div className="flex justify-between items-start mb-5 relative">
                                                <span className="bg-[#1CADA3]/10 text-[#1CADA3] text-xs font-black px-3 py-1.5 rounded-lg uppercase tracking-wider">
                                                    {bond.category}
                                                </span>
                                                <div className="flex items-center gap-2">
                                                    <span className="bg-gray-100 text-gray-600 text-[10px] font-black px-2.5 py-1.5 rounded-lg">
                                                        {bond.rating || 'N/A'}
                                                    </span>
                                                    <button
                                                        onClick={() => handleToggleWishlist(bond)}
                                                        className="text-gray-400 hover:text-[#2076C7] transition-colors p-1"
                                                    >
                                                        <Bookmark 
                                                            className="w-5 h-5" 
                                                            fill={wishlist.some(w => w.id === `bond-${bond.id}`) ? '#2076C7' : 'none'} 
                                                            color={wishlist.some(w => w.id === `bond-${bond.id}`) ? '#2076C7' : 'currentColor'}
                                                        />
                                                    </button>
                                                </div>
                                            </div>
                                            
                                            <h3 className="font-extrabold text-gray-900 text-lg mb-5 line-clamp-2 min-h-[56px] group-hover:text-[#2076C7] transition-colors leading-tight">
                                                {bond.company}
                                            </h3>

                                            <div className="grid grid-cols-2 gap-3 mb-6 flex-1">
                                                <div className="bg-[#F8FAFC] border border-gray-100 rounded-2xl p-4 flex flex-col items-center justify-center">
                                                    <span className="text-gray-400 text-[10px] font-bold uppercase tracking-widest mb-1">Coupon</span>
                                                    <span className="text-[#2076C7] font-black text-xl">{bond.coupon || '-'}</span>
                                                </div>
                                                <div className="bg-[#F8FAFC] border border-gray-100 rounded-2xl p-4 flex flex-col items-center justify-center">
                                                    <span className="text-gray-400 text-[10px] font-bold uppercase tracking-widest mb-1">Yield</span>
                                                    <span className="text-[#1CADA3] font-black text-xl">{bond.yield || '-'}</span>
                                                </div>
                                                
                                                <div className="col-span-2 bg-gray-50 rounded-xl p-3 mt-1 space-y-2">
                                                    <div className="flex items-center justify-between text-xs">
                                                        <span className="text-gray-500 font-semibold">Min. Invest</span>
                                                        <span className="font-bold text-[#0B1C2E]">{bond.minInvestment}</span>
                                                    </div>
                                                    <div className="flex items-center justify-between text-xs">
                                                        <span className="text-gray-500 font-semibold">Maturity</span>
                                                        <span className="font-bold text-[#0B1C2E]">{bond.maturity}</span>
                                                    </div>
                                                    <div className="flex items-center justify-between text-xs">
                                                        <span className="text-gray-500 font-semibold">Type</span>
                                                        <span className="font-bold text-[#0B1C2E]">{bond.type}</span>
                                                    </div>
                                                </div>
                                            </div>

                                            <div className="flex gap-3 mt-auto pt-2">
                                                <button 
                                                    onClick={() => setSelectedBondForModal(bond)}
                                                    className="flex-1 flex items-center justify-center gap-2 bg-blue-50/50 hover:bg-blue-100/50 border border-blue-100 text-[#2076C7] transition-all py-3.5 rounded-xl font-bold mb-0 text-sm active:scale-95"
                                                >
                                                    View Detail
                                                </button>
                                                <button 
                                                    onClick={() => handleBuyNow(bond)}
                                                    className="flex-[1.5] flex items-center justify-center gap-2 bg-gradient-to-r from-[#2076C7] to-[#1CADA3] hover:opacity-90 hover:shadow-lg text-white py-3.5 rounded-xl font-bold transition-all text-sm"
                                                >
                                                    <CreditCard className="w-4 h-4" /> Buy Now
                                                </button>
                                            </div>
                                        </motion.div>
                                    ))}
                                </div>
                            </div>
                        </div>
                    </motion.div>
                ) : activeTab === 'investments' ? (
                    <motion.div
                        key="investments"
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: -20 }}
                        transition={{ duration: 0.3 }}
                    >
                        {/* Investments View Content */}
                        <header className="mb-8 flex flex-col sm:flex-row justify-between items-start sm:items-end gap-4">
                            <div>
                                <h1 className="text-3xl font-black text-gray-900 mb-2">Institutional Portfolio</h1>
                                <p className="text-gray-500 text-sm font-medium italic">Consolidated view of your managed fixed-income assets.</p>
                            </div>
                            {investments.length > 0 && (
                                <div className="flex gap-3">
                                    <button className="flex items-center gap-2 bg-white border border-gray-200 px-5 py-2.5 rounded-xl text-xs font-black text-gray-700 hover:bg-gray-50 transition-all shadow-sm">
                                        <Download className="w-4 h-4" /> Export Ledger
                                    </button>
                                    <button className="flex items-center gap-2 bg-[#2076C7] px-5 py-2.5 rounded-xl text-xs font-black text-white hover:bg-[#1a5fa1] transition-all shadow-lg shadow-blue-100">
                                        <Plus className="w-4 h-4" /> Add Asset
                                    </button>
                                </div>
                            )}
                        </header>

                        {/* Portfolio Summary & Allocation Section */}
                        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-10">
                            <div className="lg:col-span-2 grid grid-cols-1 sm:grid-cols-2 gap-4">
                                <div className="bg-white p-6 rounded-[2rem] border border-gray-100 shadow-sm relative overflow-hidden group">
                                    <div className="flex items-center gap-3 mb-4">
                                        <div className="p-2.5 bg-blue-50 rounded-xl text-[#2076C7]">
                                            <Wallet className="w-5 h-5" />
                                        </div>
                                        <span className="text-[10px] font-black text-gray-400 uppercase tracking-widest">Enterprise AUM</span>
                                    </div>
                                    <h3 className="text-2xl font-black text-gray-900">₹{portfolioStats.total.toLocaleString()}</h3>
                                    <p className="text-[10px] text-green-500 font-bold mt-2 flex items-center gap-1">
                                        <TrendingUp className="w-3 h-3" /> +2.4% vs last quarter
                                    </p>
                                </div>

                                <div className="bg-white p-6 rounded-[2rem] border border-gray-100 shadow-sm">
                                    <div className="flex items-center gap-3 mb-4">
                                        <div className="p-2.5 bg-teal-50 rounded-xl text-[#1CADA3]">
                                            <ShieldCheck className="w-5 h-5" />
                                        </div>
                                        <span className="text-[10px] font-black text-gray-400 uppercase tracking-widest">Risk Exposure</span>
                                    </div>
                                    <h3 className="text-2xl font-black text-gray-900">{portfolioStats.risk}</h3>
                                    <p className="text-[10px] text-gray-500 font-bold mt-2">Investment Grade Verified</p>
                                </div>

                                <div className="bg-white p-6 rounded-[2rem] border border-gray-100 shadow-sm">
                                    <div className="flex items-center gap-3 mb-4">
                                        <div className="p-2.5 bg-orange-50 rounded-xl text-orange-500">
                                            <Calendar className="w-5 h-5" />
                                        </div>
                                        <span className="text-[10px] font-black text-gray-400 uppercase tracking-widest">Next Coupon</span>
                                    </div>
                                    <h3 className="text-2xl font-black text-gray-900">{portfolioStats.nextCoupon}</h3>
                                    <p className="text-[10px] text-orange-600 font-bold mt-2 flex items-center gap-1">
                                        <Clock className="w-3 h-3" /> Portfolio Scheduled
                                    </p>
                                </div>

                                <div className="bg-white p-6 rounded-[2rem] border border-indigo-100 shadow-sm border-l-4 border-l-indigo-500">
                                    <div className="flex items-center gap-3 mb-4">
                                        <div className="p-2.5 bg-indigo-50 rounded-xl text-indigo-600">
                                            <BarChart3 className="w-5 h-5" />
                                        </div>
                                        <span className="text-[10px] font-black text-gray-400 uppercase tracking-widest">Weighted Yield</span>
                                    </div>
                                    <h3 className="text-2xl font-black text-indigo-700">{portfolioStats.weightedYield}%</h3>
                                    <p className="text-[10px] text-gray-500 font-bold mt-2">Net Portfolio Returns</p>
                                </div>
                            </div>

                            {/* Allocation Pie Chart */}
                            <div className="bg-white p-6 rounded-[3rem] border border-gray-100 shadow-sm flex flex-col items-center">
                                <h4 className="text-[10px] font-black text-gray-400 uppercase tracking-widest mb-4">Core Asset Allocation</h4>
                                <div className="w-full h-[200px] relative flex items-center justify-center">
                                    {investments.length === 0 ? (
                                        <div className="text-center">
                                            <div className="w-20 h-20 border-4 border-dashed border-gray-100 rounded-full mx-auto mb-2 flex items-center justify-center">
                                                <PieChart className="w-6 h-6 text-gray-200" />
                                            </div>
                                            <span className="text-[10px] font-bold text-gray-300">Set Allocation Goal</span>
                                        </div>
                                    ) : (
                                        <ResponsiveContainer width="100%" height="100%">
                                            <RePieChart>
                                                <Pie
                                                    data={(() => {
                                                        const counts: Record<string, number> = {};
                                                        investments.forEach(inv => {
                                                            const cat = inv.rating?.includes('SDL') ? 'State' : 'Private'; // Simple logic for demo
                                                            counts[cat] = (counts[cat] || 0) + inv.amount;
                                                        });
                                                        return Object.entries(counts).map(([name, value]) => ({ name, value }));
                                                    })()}
                                                    cx="50%"
                                                    cy="50%"
                                                    innerRadius={60}
                                                    outerRadius={80}
                                                    paddingAngle={5}
                                                    dataKey="value"
                                                >
                                                    {investments.map((_, index) => (
                                                        <Cell key={`cell-${index}`} fill={index % 2 === 0 ? '#2076C7' : '#1CADA3'} stroke="none" />
                                                    ))}
                                                </Pie>
                                                <Tooltip 
                                                    contentStyle={{ borderRadius: '1rem', border: 'none', boxShadow: '0 10px 25px -5px rgba(0,0,0,0.1)' }}
                                                    itemStyle={{ fontSize: '10px', fontWeight: '900' }}
                                                />
                                            </RePieChart>
                                        </ResponsiveContainer>
                                    )}
                                </div>
                                <div className="flex gap-4 mt-4">
                                    <div className="flex items-center gap-2">
                                        <div className="w-2 h-2 rounded-full bg-[#2076C7]"></div>
                                        <span className="text-[10px] font-bold text-gray-500">PRIVATE</span>
                                    </div>
                                    <div className="flex items-center gap-2">
                                        <div className="w-2 h-2 rounded-full bg-[#1CADA3]"></div>
                                        <span className="text-[10px] font-bold text-gray-500">GOVT/SDL</span>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {investments.length === 0 ? (
                            <motion.div 
                                initial={{ opacity: 0, scale: 0.9 }}
                                animate={{ opacity: 1, scale: 1 }}
                                className="bg-white rounded-[3rem] p-12 text-center border-2 border-dashed border-gray-100 shadow-sm flex flex-col items-center justify-center min-h-[350px]"
                            >
                                <div className="w-24 h-24 bg-blue-50/50 rounded-full flex items-center justify-center mb-6 relative border border-blue-100">
                                    <ShoppingBag className="w-10 h-10 text-[#2076C7] opacity-20" />
                                    <Sparkles className="w-6 h-6 text-[#1CADA3] absolute top-2 right-2 animate-bounce" />
                                </div>
                                <h2 className="text-2xl font-black text-gray-800 mb-2">Institutional Ledger is Empty</h2>
                                <p className="text-gray-500 max-w-sm mx-auto mb-10 leading-relaxed font-medium">
                                    No managed assets found. Begin your corporate wealth journey by exploring our verified listings.
                                </p>
                                <button 
                                    onClick={() => setActiveTab('explore')}
                                    className="flex items-center gap-3 bg-gradient-to-r from-[#2076C7] to-[#1CADA3] text-white px-8 py-5 rounded-2xl font-black text-sm hover:shadow-2xl hover:shadow-[#1CADA3]/20 transition-all active:scale-95 group"
                                >
                                    <Plus className="w-5 h-5 bg-white/20 rounded-full p-0.5 group-hover:rotate-90 transition-transform" />
                                    Acquire Assets
                                </button>
                            </motion.div>
                        ) : (
                            <>
                            <section className="bg-white p-8 rounded-[2.5rem] border border-gray-100 shadow-sm mb-10">
                                <div className="flex items-center justify-between mb-8">
                                    <h3 className="text-lg font-black text-gray-800">Portfolio Growth Projection</h3>
                                    {investments.length > 0 && (
                                        <div className="flex items-center gap-2 px-3 py-1 bg-green-50 text-green-600 rounded-lg text-[10px] font-black uppercase">
                                            <TrendingUp className="w-3 h-3" /> Growth Mode
                                        </div>
                                    )}
                                </div>
                                <div className="h-[300px] w-full relative flex items-center justify-center">
                                    {investments.length === 0 ? (
                                        <div className="flex flex-col items-center text-center">
                                            <div className="w-16 h-16 bg-gray-50 rounded-2xl flex items-center justify-center mb-4 border border-gray-100">
                                                <BarChart3 className="w-6 h-6 text-gray-200" />
                                            </div>
                                            <p className="text-gray-400 font-bold text-sm">Waiting for first investment to track returns.</p>
                                        </div>
                                    ) : (
                                        <ResponsiveContainer width="100%" height="100%">
                                            <LineChart data={chartData}>
                                                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                                                <XAxis 
                                                    dataKey="month" 
                                                    axisLine={false} 
                                                    tickLine={false} 
                                                    tick={{ fill: '#94a3b8', fontSize: 11, fontWeight: 900 }}
                                                    dy={10}
                                                />
                                                <YAxis 
                                                    axisLine={false} 
                                                    tickLine={false} 
                                                    tick={{ fill: '#94a3b8', fontSize: 11, fontWeight: 900 }}
                                                    tickFormatter={(v) => `₹${(v/1000).toFixed(1)}k`}
                                                />
                                                <Tooltip 
                                                    contentStyle={{ borderRadius: '20px', border: 'none', boxShadow: '0 20px 50px -12px rgb(0 0 0 / 0.15)', padding: '16px' }}
                                                    itemStyle={{ color: '#2076C7', fontWeight: '900' }}
                                                />
                                                <Line 
                                                    type="monotone" 
                                                    dataKey="returns" 
                                                    stroke="url(#colorGradient)" 
                                                    strokeWidth={5} 
                                                    dot={{ fill: '#2076C7', strokeWidth: 2, r: 5, stroke: '#fff' }}
                                                    activeDot={{ r: 9, strokeWidth: 0, fill: '#1CADA3' }}
                                                />
                                                <defs>
                                                    <linearGradient id="colorGradient" x1="0" y1="0" x2="1" y2="0">
                                                        <stop offset="0%" stopColor="#2076C7" />
                                                        <stop offset="100%" stopColor="#1CADA3" />
                                                    </linearGradient>
                                                </defs>
                                            </LineChart>
                                        </ResponsiveContainer>
                                    )}
                                </div>
                            </section>

                                <section className="bg-white rounded-[2.5rem] border border-gray-100 shadow-sm overflow-hidden auto-cols-min">
                                    <div className="p-8 border-b border-gray-50 flex justify-between items-center">
                                        <h3 className="text-lg font-black text-gray-800 flex items-center gap-2">
                                            <Briefcase className="w-5 h-5 text-[#2076C7]" /> Current Portfolio
                                        </h3>
                                    </div>
                                    <div className="overflow-x-auto">
                                        <table className="w-full text-left">
                                            <thead>
                                                <tr className="bg-gray-50/50">
                                                    <th className="px-8 py-5 text-[10px] font-black uppercase text-gray-400 tracking-wider">Bond Detail</th>
                                                    <th className="px-8 py-5 text-[10px] font-black uppercase text-gray-400 tracking-wider">Amount</th>
                                                    <th className="px-8 py-5 text-[10px] font-black uppercase text-gray-400 tracking-wider">Coupon</th>
                                                    <th className="px-8 py-5 text-[10px] font-black uppercase text-gray-400 tracking-wider text-center">Status</th>
                                                    <th className="px-8 py-5 text-[10px] font-black uppercase text-gray-400 tracking-wider text-right">Action</th>
                                                </tr>
                                            </thead>
                                            <tbody className="divide-y divide-gray-50">
                                                {investments.map((inv) => (
                                                    <tr key={inv.id} className="hover:bg-gray-50 transition-colors group">
                                                        <td className="px-8 py-6">
                                                            <div className="font-bold text-gray-900 group-hover:text-[#2076C7] transition-colors">{inv.name}</div>
                                                            <div className="text-[10px] text-gray-400 mt-1 font-bold">Invested on {inv.investedDate}</div>
                                                        </td>
                                                        <td className="px-8 py-6">
                                                            <div className="font-black text-gray-800">₹{inv.amount.toLocaleString()}</div>
                                                        </td>
                                                        <td className="px-8 py-6">
                                                            <div className="font-black text-[#2076C7]">{inv.coupon}</div>
                                                        </td>
                                                        <td className="px-8 py-6 text-center">
                                                            <span className={`px-4 py-1.5 rounded-xl text-[10px] font-black uppercase tracking-widest inline-flex items-center gap-1.5 ${
                                                                inv.status === "Active" 
                                                                    ? "bg-green-50 text-green-600" 
                                                                    : "bg-orange-50 text-orange-600"
                                                            }`}>
                                                                <span className={`w-1.5 h-1.5 rounded-full ${inv.status === "Active" ? "bg-green-600" : "bg-orange-600"}`}></span>
                                                                {inv.status}
                                                            </span>
                                                        </td>
                                                        <td className="px-8 py-6 text-right">
                                                            <button className="p-2.5 bg-gray-50 text-gray-400 hover:text-[#2076C7] hover:bg-blue-50 rounded-xl transition-all">
                                                                <ChevronRight className="w-4 h-4" />
                                                            </button>
                                                        </td>
                                                    </tr>
                                                ))}
                                            </tbody>
                                        </table>
                                    </div>
                                </section>
                            </>
                        )}

                        {investments.length > 0 && (
                            <button 
                                onClick={() => {
                                    localStorage.removeItem('bond_portfolio');
                                    setInvestments([]);
                                }}
                                className="mt-12 text-gray-400 text-[10px] font-bold hover:text-red-500 transition-colors flex items-center gap-2 mx-auto uppercase tracking-widest"
                            >
                                <AlertCircle className="w-4 h-4" /> Reset Portfolio Data (Demo Only)
                            </button>
                        )}
                    </motion.div>
                ) : (
                    <motion.div
                        key="compare"
                        initial={{ opacity: 0, scale: 0.95 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0, scale: 1.05 }}
                        transition={{ duration: 0.3 }}
                        className="pb-20"
                    >
                        <header className="mb-10 max-w-2xl">
                            <h2 className="text-3xl font-black text-gray-900 mb-2">Comparison Desk</h2>
                            <p className="text-gray-500 text-sm font-medium italic">Select up to 3 bonds for technical assessment and yield mapping.</p>
                        </header>

                        {/* Selection Slots */}
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
                            {[0, 1, 2].map((idx) => {
                                const bond = bondsData.find(b => b.id === selectedCompareIds[idx]);
                                return (
                                    <div 
                                        key={idx}
                                        className={`relative h-48 rounded-[2.5rem] border-2 border-dashed transition-all p-6 flex flex-col justify-center items-center text-center ${
                                            bond ? 'border-[#2076C7] bg-white shadow-xl shadow-blue-50/30' : 'border-gray-200 bg-gray-50/30'
                                        }`}
                                    >
                                        {bond ? (
                                            <>
                                                <button 
                                                    onClick={() => setSelectedCompareIds(prev => prev.filter(id => id !== bond.id))}
                                                    className="absolute top-4 right-4 text-gray-400 hover:text-red-500 transition-colors bg-gray-100 p-1.5 rounded-full"
                                                >
                                                    <Plus className="w-4 h-4 rotate-45" />
                                                </button>
                                                <span className="bg-[#1CADA3]/10 text-[#1CADA3] text-[9px] font-black px-2.5 py-1 rounded-lg uppercase mb-2 tracking-widest">{bond.category}</span>
                                                <h4 className="font-extrabold text-gray-900 text-sm line-clamp-2 px-1 leading-tight">{bond.company}</h4>
                                                <div className="mt-4 flex gap-4 text-[10px] font-black">
                                                    <div><p className="text-gray-400 uppercase tracking-tighter">Yield</p><p className="text-[#1CADA3]">{bond.yield}</p></div>
                                                    <div><p className="text-gray-400 uppercase tracking-tighter">Rating</p><p className="text-[#2076C7]">{bond.rating}</p></div>
                                                </div>
                                            </>
                                        ) : (
                                            <div className="w-full px-4 relative group">
                                                <div className="relative">
                                                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-gray-400" />
                                                    <input 
                                                        type="text" 
                                                        placeholder="Search all bonds..."
                                                        className="w-full pl-9 pr-4 py-3 rounded-xl border border-gray-200 text-[11px] font-black text-gray-900 outline-none focus:ring-2 focus:ring-blue-100 bg-white shadow-sm placeholder:text-gray-300 transition-all"
                                                        onChange={(e) => setSearchQuery(e.target.value)}
                                                        onFocus={(e) => (e.target as any).select()}
                                                    />
                                                </div>
                                                
                                                {/* Professional Search Dropdown */}
                                                <div className="absolute top-full left-0 right-0 mt-2 bg-white border border-gray-100 rounded-2xl shadow-2xl z-50 max-h-[180px] overflow-y-auto p-2 opacity-0 group-focus-within:opacity-100 pointer-events-none group-focus-within:pointer-events-auto transition-all scale-95 group-focus-within:scale-100 origin-top">
                                                    {bondsData
                                                        .filter(b => !selectedCompareIds.includes(b.id) && 
                                                                (b.company.toLowerCase().includes(searchQuery.toLowerCase()) || 
                                                                 b.category.toLowerCase().includes(searchQuery.toLowerCase())))
                                                        .map(b => (
                                                            <button 
                                                                key={b.id}
                                                                onMouseDown={() => {
                                                                    setSelectedCompareIds(prev => [...prev, b.id]);
                                                                    setSearchQuery('');
                                                                }}
                                                                className="w-full text-left p-3 hover:bg-blue-50 rounded-xl flex items-center justify-between group/item transition-colors"
                                                            >
                                                                <div className="flex flex-col">
                                                                    <span className="text-[8px] font-black text-[#1CADA3] uppercase mb-0.5">{b.category}</span>
                                                                    <span className="text-[10px] font-black text-gray-800 line-clamp-1">{b.company}</span>
                                                                </div>
                                                                <Plus className="w-3 h-3 text-gray-300 group-hover/item:text-[#2076C7]" />
                                                            </button>
                                                        ))}
                                                    {bondsData.filter(b => !selectedCompareIds.includes(b.id) && 
                                                                (b.company.toLowerCase().includes(searchQuery.toLowerCase()) || 
                                                                 b.category.toLowerCase().includes(searchQuery.toLowerCase()))).length === 0 && (
                                                        <p className="p-4 text-[10px] font-black text-gray-400 text-center uppercase">No matching products</p>
                                                    )}
                                                </div>
                                                <p className="mt-3 text-[9px] font-black text-gray-300 uppercase tracking-widest animate-pulse">Choose Slot {idx + 1}</p>
                                            </div>
                                        )}
                                    </div>
                                );
                            })}
                        </div>

                        {selectedCompareIds.length > 0 && (
                            <div className="space-y-10">
                                {/* Yield Mapping Chart */}
                                <div className="bg-white rounded-[3rem] p-8 border border-gray-100 shadow-sm relative overflow-hidden">
                                     <div className="absolute top-0 right-0 w-32 h-32 bg-blue-50/50 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2" />
                                    <h4 className="text-xs font-black text-gray-400 uppercase tracking-widest mb-8 relative z-10 flex items-center gap-2">
                                        <BarChart3 className="w-4 h-4 text-[#2076C7]" /> Yield Alpha Mapping
                                    </h4>
                                    <div className="h-[250px] w-full relative z-10">
                                        <ResponsiveContainer width="100%" height="100%">
                                            <BarChart data={selectedCompareIds.map(id => {
                                                const b = bondsData.find(x => x.id === id);
                                                return {
                                                    name: b?.company.slice(0, 10) + '...',
                                                    Yield: parseFloat(b?.yield?.replace('%', '') || '0'),
                                                    Coupon: parseFloat(b?.coupon?.replace('%', '') || '0')
                                                }
                                            })}>
                                                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#F8FAFC" />
                                                <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{ fontSize: 9, fill: '#94A3B8', fontWeight: '900' }} dy={10} />
                                                <YAxis axisLine={false} tickLine={false} tick={{ fontSize: 9, fill: '#94A3B8', fontWeight: '900' }} />
                                                <Tooltip 
                                                    cursor={{ fill: '#F8FAFC' }}
                                                    contentStyle={{ borderRadius: '1rem', border: 'none', boxShadow: '0 20px 25px -5px rgba(0,0,0,0.1)' }}
                                                    itemStyle={{ fontSize: '10px', fontWeight: '900' }}
                                                />
                                                <Bar dataKey="Yield" fill="#2076C7" radius={[4, 4, 0, 0]} barSize={25} />
                                                <Bar dataKey="Coupon" fill="#1CADA3" radius={[4, 4, 0, 0]} barSize={25} />
                                            </BarChart>
                                        </ResponsiveContainer>
                                    </div>
                                </div>

                                {/* Comparison Details */}
                                <div className="bg-white rounded-[2.5rem] border border-gray-100 shadow-sm overflow-hidden">
                                    <div className="grid grid-cols-4 bg-[#F8FAFC]/50 border-b border-gray-100">
                                        <div className="p-6 text-[10px] font-black text-gray-400 uppercase tracking-widest">Assessment Parameter</div>
                                        {selectedCompareIds.map(id => (
                                            <div key={id} className="p-6 text-center text-[10px] font-black text-gray-900 border-l border-gray-100 truncate flex items-center justify-center">
                                                {bondsData.find(b => b.id === id)?.company}
                                            </div>
                                        ))}
                                    </div>
                                    {[
                                        { label: 'Category', key: 'category' },
                                        { label: 'Credit Rating', key: 'rating' },
                                        { label: 'Yield (%)', key: 'yield' },
                                        { label: 'Coupon Rate', key: 'coupon' },
                                        { label: 'Min. Investment', key: 'minInvestment' }
                                    ].map((row, rIdx) => (
                                        <div key={rIdx} className="grid grid-cols-4 border-b border-gray-100 group hover:bg-blue-50/20 transition-all">
                                            <div className="p-6 text-xs font-black text-gray-500 uppercase tracking-tighter">{row.label}</div>
                                            {selectedCompareIds.map(id => (
                                                <div key={id} className="p-6 border-l border-gray-100 text-center text-xs font-black text-gray-900">
                                                    {String(bondsData.find(b => b.id === id)?.[row.key as keyof Bond] || '-')}
                                                </div>
                                            ))}
                                        </div>
                                    ))}
                                    <div className="grid grid-cols-4 bg-gray-50/30">
                                        <div className="p-6 text-[10px] font-black text-gray-400 uppercase tracking-widest flex items-center">Final Decision</div>
                                        {selectedCompareIds.map(id => {
                                            const b = bondsData.find(x => x.id === id);
                                            return b ? (
                                                <div key={id} className="p-6 border-l border-gray-100 flex flex-col gap-2">
                                                    <button onClick={() => handleBuyNow(b)} className="w-full bg-[#2076C7] text-white py-2.5 rounded-xl font-black text-[9px] uppercase tracking-widest hover:opacity-90 transition-all shadow-md shadow-blue-100">
                                                        Invest Now
                                                    </button>
                                                </div>
                                            ) : null;
                                        })}
                                    </div>
                                </div>
                            </div>
                        )}
                    </motion.div>
                )}
            </AnimatePresence>
            {selectedBondForModal && (
                <BondDetailModal 
                    bond={selectedBondForModal} 
                    isOpen={!!selectedBondForModal} 
                    onClose={() => setSelectedBondForModal(null)}
                />
            )}
        </div>
    );
}
