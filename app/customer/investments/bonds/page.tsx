'use client';

import { useState, useMemo, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Bond } from '../../../products/bonds/data/bondsData';
import { 
    Search,TrendingUp, ShieldCheck, 
    LayoutDashboard
} from 'lucide-react';
import toast from 'react-hot-toast';
import customerService from '../../../services/customerService';

import BondDetailModal from '../../../products/bonds/components/BondDetailModal';

// 🆕 Extracted Components
import CategoryFilter from './components/CategoryFilter';
import BondCard from './components/BondCard';
import HoldingsDashboard from './components/HoldingsDashboard';
import ComparisonDesk from './components/ComparisonDesk';

interface Investment {
    id: number;
    name: string;
    amount: number;
    investedDate: string;
    coupon: string;
    status: "Active" | "Matured";
}

export default function CustomerBondsDashboard() {
    const [activeTab, setActiveTab] = useState<'explore' | 'investments' | 'compare'>('explore');
    const [selectedCategory, setSelectedCategory] = useState<string>('All');
    const [searchQuery, setSearchQuery] = useState<string>('');
    const [investments, setInvestments] = useState<Investment[]>([]);
    const [selectedCompareIds, setSelectedCompareIds] = useState<number[]>([]);
    const [loading, setLoading] = useState(true);
    const [selectedBondForModal, setSelectedBondForModal] = useState<Bond | null>(null);
    const [bonds, setBonds] = useState<Bond[]>([]);
    const [wishlistedIds, setWishlistedIds] = useState<Set<number>>(new Set());

    useEffect(() => {
        fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/api/products/investments/bonds/all`)
            .then(res => res.json())
            .then(data => {
                const categoryMapping: Record<string, string> = {
                    'Private': 'Private Corporate',
                    'TaxFree': 'Tax-Free Bonds',
                    'StateGuaranteed': 'State Guaranteed',
                    'GSec': 'G-Sec / SDL',
                    'PSU': 'PSU Bonds',
                    'Municipal': 'Municipal Bonds'
                };
                const applyMap = (raw: any[]) => raw.map(b => ({ ...b, category: categoryMapping[b.category] || b.category }));

                if (Array.isArray(data)) {
                    setBonds(applyMap(data));
                } else if (data.data && Array.isArray(data.data)) {
                    setBonds(applyMap(data.data));
                }
            })
            .catch(err => console.error("Failed to fetch bonds:", err));
    }, []);

    // Fetch existing wishlist to mark already wishlisted bonds
    useEffect(() => {
        const fetchWishlist = async () => {
            try {
                const response = await customerService.getMyWishlist();
                if (response.success && response.data) {
                    const dataArray = Array.isArray(response.data) ? response.data : [response.data];
                    const bondIds = dataArray
                        .filter((item: any) => item.product_type === 'bonds')
                        .map((item: any) => item.product_id);
                    setWishlistedIds(new Set(bondIds));
                }
            } catch (error) {
                // User might not be logged in, silently ignore
            }
        };
        fetchWishlist();
    }, []);

    const getItemsPerPage = () => {
        if (typeof window !== 'undefined') {
            return window.innerWidth < 768 ? 5 : 12;
        }
        return 12;
    };

    const [visibleCount, setVisibleCount] = useState(12);

    useEffect(() => {
        // Set correct initial count after hydration
        setVisibleCount(getItemsPerPage());
    }, []);

    // 🔷 RESET COMPARE ON TAB CHANGE
    useEffect(() => {
        if (activeTab !== 'compare') {
            setSelectedCompareIds([]);
        }
    }, [activeTab]);

    const categories = useMemo(() => ['All', ...Array.from(new Set(bonds.map(b => b.category)))], [bonds]);

    const marketplaceStats = useMemo(() => {
        const total = bonds.length;
        const yields = bonds.map(b => parseFloat(b.yield?.replace('%', '') || '0')).filter(y => !isNaN(y));
        const maxYield = yields.length > 0 ? Math.max(...yields).toFixed(2) : '0';
        return { total, maxYield };
    }, [bonds]);

    const filteredBonds = useMemo(() => {
        return bonds.filter(b => {
            const matchesCategory = selectedCategory === 'All' || b.category === selectedCategory;
            const matchesSearch = (b.company || "").toLowerCase().includes((searchQuery || "").toLowerCase());
            return matchesCategory && matchesSearch;
        });
    }, [bonds, selectedCategory, searchQuery]);

    useEffect(() => {
        setVisibleCount(getItemsPerPage());
    }, [selectedCategory, searchQuery]);

    useEffect(() => {
        const stored = localStorage.getItem('bond_portfolio');
        if (stored) setInvestments(JSON.parse(stored));
        setLoading(false);
    }, []);

    const portfolioStats = useMemo(() => {
        if (investments.length === 0) return { total: 0, activeCount: 0, maturedCount: 0, returns: 0, risk: "N/A", weightedYield: 0, nextCoupon: "N/A" };
        const total = investments.reduce((sum, item) => sum + item.amount, 0);
        const activeCount = investments.filter(i => i.status === "Active").length;
        const maturedCount = investments.filter(i => i.status === "Matured").length;
        const returns = Math.round(total * 0.085);
        const coupons = investments.map(i => parseFloat(i.coupon?.replace('%', '') || '0'));
        const weightedYield = coupons.length > 0 ? (coupons.reduce((a, b) => a + b, 0) / coupons.length).toFixed(2) : 0;
        
        return { 
            total, 
            activeCount, 
            maturedCount, 
            returns, 
            risk: "LOW (AAA)", 
            weightedYield, 
            nextCoupon: "15 Apr 2026" 
        };
    }, [investments]);

    const chartData = useMemo(() => {
        if (investments.length === 0) {
            return [
                { month: "Jan", returns: 0 }, { month: "Feb", returns: 0 },
                { month: "Mar", returns: 0 }, { month: "Apr", returns: 0 }
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

    const handleBuyNow = (bond: Bond) => {
        toast.error("Ordering is temporarily disabled for maintenance.");
    };

    const handleWishlistToggle = async (bond: Bond): Promise<boolean> => {
        try {
            if (wishlistedIds.has(bond.id)) {
                // Already wishlisted — get wishlist to find the wishlist entry ID
                const response = await customerService.getMyWishlist();
                if (response.success && response.data) {
                    const dataArray = Array.isArray(response.data) ? response.data : [response.data];
                    const entry = dataArray.find((item: any) => item.product_type === 'bonds' && item.product_id === bond.id);
                    if (entry) {
                        const removeRes = await customerService.removeFromWishlist(entry.id);
                        if (removeRes.success) {
                            setWishlistedIds(prev => { const next = new Set(prev); next.delete(bond.id); return next; });
                            toast.success('Removed from wishlist');
                            return true;
                        }
                    }
                }
                toast.error('Failed to remove from wishlist');
                return false;
            } else {
                const response = await customerService.addToWishlist({
                    product_type: 'bonds',
                    product_id: bond.id,
                    product_name: bond.company
                });
                if (response.success) {
                    setWishlistedIds(prev => new Set(prev).add(bond.id));
                    toast.success('Added to wishlist!');
                    return true;
                }
                toast.error(response.message || 'Failed to add to wishlist');
                return false;
            }
        } catch (error: any) {
            const msg = error?.response?.data?.message || 'Wishlist action failed';
            toast.error(msg);
            return false;
        }
    };


    const handleResetPortfolio = () => {
        localStorage.removeItem('bond_portfolio');
        setInvestments([]);
        toast.success("Portfolio reset for demo.");
    };

    return (
        <div className="flex-1 min-h-screen bg-[#FAFAFA] font-sans">
            <div className="max-w-[1440px] mx-auto px-6 py-10 leading-relaxed">
                
                {/* 🔷 PREMIUM HEADER */}
                <motion.div
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="bg-white rounded-2xl p-5 mb-8 shadow-sm border border-slate-100/60">
                    <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                        <div className="flex items-center gap-4">
                            <div className="w-12 h-12 rounded-xl bg-gradient-to-r from-[#2076C7] to-[#1CADA3] flex items-center justify-center text-white shadow-md shrink-0">
                                <TrendingUp size={22} />
                            </div>
                            <div>
                                <h1 className="text-lg md:text-xl font-bold text-slate-800 flex flex-wrap items-center gap-2">
                                    Bonds Investment Hub
                                    <span className="px-2.5 py-1 bg-emerald-100 text-emerald-700 text-[8px] md:text-[10px] font-bold rounded-full border border-emerald-200 whitespace-nowrap">
                                        Institutional Beta
                                    </span>
                                </h1>
                                <p className="text-xs text-slate-500 font-medium flex items-center gap-1.5">
                                    <LayoutDashboard size={12} className="text-[#2076C7]" />
                                    Institutional-grade Fixed Income Assets
                                </p>
                            </div>
                        </div>

                        <div className="p-1.5 bg-slate-100/80 rounded-full flex gap-1 border border-slate-200/50 backdrop-blur-sm shadow-inner overflow-hidden">
                            {(['explore', 'investments', 'compare'] as const).map(tab => (
                                <button
                                    key={tab}
                                    onClick={() => setActiveTab(tab)}
                                    className={`px-6 py-2.5 rounded-full text-[10px] font-black uppercase tracking-widest transition-all ${
                                        activeTab === tab ? "bg-white text-[#2076C7] shadow-sm" : "text-slate-400 hover:text-slate-600"
                                    }`}
                                >
                                    {tab === 'explore' ? 'Marketplace' : tab === 'investments' ? 'Holdings' : 'Compare'}
                                </button>
                            ))}
                        </div>
                    </div>
                </motion.div>

                <AnimatePresence mode="wait">
                    {activeTab === 'explore' ? (
                        <motion.div key="explore" initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: 20 }}>
                            <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="relative bg-gradient-to-r from-[#2076C7] to-[#1CADA3] rounded-[2.5rem] p-8 mb-8 text-white shadow-lg overflow-hidden">
                                <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full blur-3xl -translate-y-1/2 translate-x-1/4" />
                                <div className="relative z-10 flex flex-col md:flex-row items-center justify-between gap-6">
                                    <div className="flex items-center gap-5">
                                        <div className="w-14 h-14 bg-white/20 rounded-2xl flex items-center justify-center backdrop-blur-md border border-white/10">
                                            <ShieldCheck size={26} />
                                        </div>
                                        <div>
                                            <p className="text-[10px] font-black uppercase tracking-[0.3em] text-white/70 mb-1">Elite Alpha Access</p>
                                            <h2 className="text-2xl font-black">Yields up to <span className="underline decoration-white/30 underline-offset-4">{marketplaceStats.maxYield}% Fixed</span></h2>
                                        </div>
                                    </div>
                                    <div className="flex gap-4">
                                        <div className="bg-white/10 border border-white/20 rounded-2xl px-6 py-4 backdrop-blur-sm text-center">
                                            <p className="text-[9px] font-black uppercase text-white/60 mb-0.5 tracking-widest">Global Issues</p>
                                            <p className="text-base font-black">{marketplaceStats.total}+ Verified</p>
                                        </div>
                                    </div>
                                </div>
                            </motion.div>

                            <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6 mb-8">
                                <CategoryFilter categories={categories} selectedCategory={selectedCategory} onSelect={setSelectedCategory} />
                                <div className="relative flex-1 max-w-md">
                                    <Search className="absolute left-5 top-1/2 -translate-y-1/2 text-slate-400 w-4 h-4" />
                                    <input type="text" placeholder="Search by company..." value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)} className="w-full pl-14 pr-6 py-4 rounded-2xl border border-slate-100 focus:outline-none bg-white font-bold text-xs shadow-sm" />
                                </div>
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                                {filteredBonds.slice(0, visibleCount).map((bond, idx) => (
                                    <BondCard key={bond.id} bond={bond} idx={idx} onView={setSelectedBondForModal} onBuy={handleBuyNow} onWishlist={handleWishlistToggle} isWishlisted={wishlistedIds.has(bond.id)} />
                                ))}
                            </div>

                            {visibleCount < filteredBonds.length && (
                                <div className="flex justify-center mt-10">
                                    <button 
                                        onClick={() => setVisibleCount(prev => prev + getItemsPerPage())}
                                        className="px-8 py-4 bg-white border border-slate-200 hover:border-[#2076C7] rounded-full text-[#2076C7] text-[10px] font-black uppercase tracking-widest shadow-sm hover:shadow-md hover:bg-slate-50 transition-all active:scale-95">
                                        View More Products
                                    </button>
                                </div>
                            )}
                        </motion.div>
                    ) : activeTab === 'investments' ? (
                        <motion.div key="investments" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }}>
                            <HoldingsDashboard 
                                investments={investments}
                                portfolioStats={portfolioStats as any}
                                chartData={chartData}
                                onExplore={() => setActiveTab('explore')}
                                onReset={handleResetPortfolio}
                            />
                        </motion.div>
                    ) : (
                        <motion.div key="compare" initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 1.05 }}>
                                <ComparisonDesk 
                                    selectedCompareIds={selectedCompareIds}
                                    setSelectedCompareIds={setSelectedCompareIds}
                                    bondsData={bonds}
                                    onExplore={() => setActiveTab('explore')}
                                />
                        </motion.div>
                    )}
                </AnimatePresence>
            </div>

            {selectedBondForModal && (
                <BondDetailModal 
                    isOpen={!!selectedBondForModal} 
                    bond={selectedBondForModal} 
                    onClose={() => setSelectedBondForModal(null)} 
                />
            )}
        </div>
    );
}