'use client';

import { useState, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import customerService from '../../services/customerService';
import { 
    Bookmark, 
    Search, 
    Layers, 
    TrendingUp, 
    Wallet, 
    ShieldCheck, 
    BarChart3, 
    Home, 
    Building2,
    Trash2,
    PlusCircle,
    RefreshCw
} from 'lucide-react';
import toast from 'react-hot-toast';

/* ---------------- TYPES ---------------- */

interface ApiWishlistItem {
    id: number;
    user_id?: number;
    product_type: string;
    product_id: number;
    product_name: string;
    created_at: string;
    product_data?: {
        id: number;
        price: string;
        logo_url: string;
        min_lot_size: number;
        depository_applicable: string;
          nav?: string | number;
           nav_date?: string;
             risk?: string;
               scheme_name?: string;
    };
}

interface WishlistItem extends ApiWishlistItem {
    price: number;
    min_lot: number;
    depository: string;
    logo_url: string;
}

/* ---------------- CATEGORY MAPPING ---------------- */

const productTypeToCategoryId: Record<string, string> = {
    unlisted_share: 'unlisted',
    mutual_fund: 'mutual-funds',
    loans: 'loans',
    insurance: 'insurance',
    investments: 'investments',
    'real-estate': 'real-estate'
};

const initialCategories = [
    { id: 'all', name: 'All Items', icon: Layers },
    { id: 'unlisted', name: 'Unlisted', icon: Building2 },
    { id: 'mutual-funds', name: 'Mutual Funds', icon: TrendingUp },
    { id: 'loans', name: 'Loans', icon: Wallet },
    { id: 'insurance', name: 'Insurance', icon: ShieldCheck },
    { id: 'investments', name: 'Investments', icon: BarChart3 },
    { id: 'real-estate', name: 'Real Estate', icon: Home },
];

// Helper to get token
const getTokenFromCookie = (): string | null => {
    if (typeof document === 'undefined') return null;
    const cookies = document.cookie.split('; ');
    const authCookie = cookies.find(row => row.startsWith('authToken='));
    return authCookie ? authCookie.split('=')[1] : null;
};

export default function Wishlist() {
    const [wishlistItems, setWishlistItems] = useState<WishlistItem[]>([]);
    const [loading, setLoading] = useState(true);
    const [refreshing, setRefreshing] = useState(false);
    const [selectedCategory, setSelectedCategory] = useState('all');
    const [searchQuery, setSearchQuery] = useState('');
    const [categories, setCategories] = useState(initialCategories.map(c => ({ ...c, count: 0 })));

    /* ---------------- FETCH DATA WITH PROPER ERROR HANDLING ---------------- */

    const loadWishlist = useCallback(async (showRefreshToast = false) => {
        // Check token first
        const token = getTokenFromCookie();
        if (!token) {
            toast.error('Session expired. Please login again.');
            setWishlistItems([]);
            setLoading(false);
            setRefreshing(false);
            return;
        }

        try {
            const response = await customerService.getMyWishlist();
            
            // PROPER API RESPONSE HANDLING
            if (!response || !response.success) {
                toast('Wishlist API returned unsuccessful:');
                setWishlistItems([]);
                updateCategoryCounts([]);
                if (showRefreshToast) {
                    toast.error('Failed to load wishlist');
                }
                return;
            }

            // SAFE DATA EXTRACTION - Handle null, undefined, or non-array responses
            let dataArray: any[] = [];
            
            if (response.data && Array.isArray(response.data)) {
                dataArray = response.data;
            } else if (response.data && !Array.isArray(response.data)) {
                // Handle case where API returns single object
                dataArray = [response.data];
            } else {
                // Handle null or undefined
                dataArray = [];
            }

              const transformed: WishlistItem[] = dataArray.map((item: ApiWishlistItem) => {
    const isMF = item.product_type === 'mutual_fund';

    return {
        ...item,
        price: isMF
            ? Number(item.product_data?.nav || 0)
            : Number(item.product_data?.price || 0),

        min_lot: isMF ? 0 : item.product_data?.min_lot_size || 0,

        depository: isMF
            ? item.product_data?.risk || 'Moderate'
            : item.product_data?.depository_applicable?.replace(/&amp;/g, '&') || '-',

        logo_url: item.product_data?.logo_url || '',
    };
});

            setWishlistItems(transformed);
            updateCategoryCounts(transformed);
            
            if (showRefreshToast && transformed.length > 0) {
                toast.success(`Wishlist refreshed (${transformed.length} items)`);
            } else if (showRefreshToast && transformed.length === 0) {
                toast('Your wishlist is empty', { icon: '📋' });
            }
        } catch (error) {
            toast.error('Error loading wishlist:');
            setWishlistItems([]);
            updateCategoryCounts([]);
            if (showRefreshToast) {
                toast.error('Failed to load wishlist');
            }
        } finally {
            setLoading(false);
            setRefreshing(false);
        }
    }, []);

    /* ---------------- AUTO REFRESH & SYNC ---------------- */

    useEffect(() => {
        loadWishlist();

        // Auto-refresh every 30 seconds to keep in sync with other pages
        const intervalId = setInterval(() => {
            loadWishlist(false); // Silent refresh
        }, 30000);

        // Also refresh when page becomes visible again (user returns from another tab)
        const handleVisibilityChange = () => {
            if (document.visibilityState === 'visible') {
                loadWishlist(false);
            }
        };
        document.addEventListener('visibilitychange', handleVisibilityChange);

        return () => {
            clearInterval(intervalId);
            document.removeEventListener('visibilitychange', handleVisibilityChange);
        };
    }, [loadWishlist]);

    /* ---------------- REMOVE ITEM WITH SYNC ---------------- */

    const handleRemoveItem = async (id: number) => {
        const token = getTokenFromCookie();
        if (!token) {
            toast.error('Session expired');
            return;
        }

        try {
            const response = await customerService.removeFromWishlist(id);
            if (response.success) {
                const updated = wishlistItems.filter(item => item.id !== id);
                setWishlistItems(updated);
                updateCategoryCounts(updated);
                toast.success('Item removed from wishlist');
                
                // Dispatch custom event for other components to sync
                if (typeof window !== 'undefined') {
                    window.dispatchEvent(new CustomEvent('wishlistUpdated', { detail: { action: 'remove', id } }));
                }
            } else {
                toast.error(response.message || 'Failed to remove item');
                // Reload to ensure consistency
                loadWishlist(false);
            }
        } catch (error) {
            toast.error('Failed to remove item');
        }
    };

    /* ---------------- CATEGORY COUNT ---------------- */

    const updateCategoryCounts = (items: WishlistItem[]) => {
        setCategories(prev =>
            prev.map(cat => {
                if (cat.id === 'all') return { ...cat, count: items.length };
                const type = Object.keys(productTypeToCategoryId).find(
                    key => productTypeToCategoryId[key] === cat.id
                );
                return {
                    ...cat,
                    count: items.filter(item => item.product_type === type).length,
                };
            })
        );
    };

    /* ---------------- FILTER ---------------- */

    const filteredItems = wishlistItems.filter(item => {
        const matchesCategory = selectedCategory === 'all' || productTypeToCategoryId[item.product_type] === selectedCategory;
        const matchesSearch = item.product_name.toLowerCase().includes(searchQuery.toLowerCase());
        return matchesCategory && matchesSearch;
    });

    /* ---------------- MANUAL REFRESH ---------------- */

    const handleManualRefresh = () => {
        setRefreshing(true);
        loadWishlist(true);
    };

    if (loading) {
        return (
            <div className="flex items-center justify-center min-h-screen bg-[#f8fafc]">
                <div className="w-10 h-10 border-4 border-[#2076C7] border-t-transparent rounded-full animate-spin"></div>
            </div>
        );
    }

    return (
        <div className="flex-1 p-4 sm:p-6 bg-[#f8fafc] min-h-screen font-sans">
            
            {/* DESKTOP HEADER (Hidden on Mobile) */}
            <div className="hidden md:block">
                <motion.div initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} className="bg-linear-to-r from-[#2076C7] to-[#1CADA3] rounded-2xl p-6 mb-6 text-white shadow-lg">
                    <div className="flex items-center justify-between">
                        <div>
                            <div className="flex items-center gap-2 mb-2">
                                <Bookmark className="w-5 h-8 text-white" />
                                <h2 className="text-2xl font-bold">Wishlist</h2>
                            </div>
                            <p className="text-sm opacity-80">Track and manage your potential investments</p>
                        </div>
                        <button 
                            onClick={handleManualRefresh}
                            disabled={refreshing}
                            className="p-2 bg-white/10 rounded-xl hover:bg-white/20 transition-all disabled:opacity-50"
                        >
                            <RefreshCw className={`w-5 h-5 ${refreshing ? 'animate-spin' : ''}`} />
                        </button>
                    </div>
                </motion.div>
            </div>

            {/* MOBILE HEADER */}
            <div className="md:hidden flex flex-col items-center pt-2 pb-4 px-4">
                <div className="w-14 h-14 bg-gradient-to-br from-[#2076C7] to-[#1CADA3] rounded-2xl flex items-center justify-center shadow-lg mb-3">
                    <Bookmark className="text-white w-7 h-7" />
                </div>
                <h1 className="text-xl font-bold text-slate-800">Wishlist</h1>
                <div className="mt-1 bg-emerald-100 text-emerald-700 text-[9px] font-black px-2 py-0.5 rounded-full uppercase tracking-wider">
                    {filteredItems.length} Items Active
                </div>
            </div>

            {/* DASHBOARD GRID (REDUCED SIZE VERSION) */}
            <div className="md:hidden mb-6">
                <div className="bg-slate-100/60 backdrop-blur-sm rounded-3xl p-1.5 border border-slate-200/50 shadow-inner">
                    <div className="grid grid-cols-2 gap-1">
                        {categories.map((cat) => {
                            const isActive = selectedCategory === cat.id;
                            const Icon = cat.icon;
                            return (
                                <button
                                    key={cat.id}
                                    onClick={() => setSelectedCategory(cat.id)}
                                    className={`relative flex flex-col items-center justify-center gap-1 py-3 px-2 rounded-xl transition-all duration-300 z-10 active:scale-95 ${
                                        isActive 
                                        ? "text-white shadow-sm" 
                                        : "text-slate-400 hover:text-slate-500"
                                    }`}
                                >
                                    {isActive && (
                                        <motion.div 
                                            layoutId="activeCategoryMobile" 
                                            className="absolute inset-0 bg-gradient-to-r from-[#2076C7] to-[#1CADA3] rounded-xl -z-10" 
                                            transition={{ type: "spring", bounce: 0.2, duration: 0.6 }} 
                                        />
                                    )}
                                    <Icon size={16} strokeWidth={isActive ? 2.5 : 2} />
                                    <span className="text-[9px] font-black uppercase tracking-tight leading-none text-center truncate w-full px-1">
                                        {cat.name.split(' ')[0]}
                                    </span>
                                    {cat.count > 0 && !isActive && (
                                        <div className="absolute top-1 right-1 w-3.5 h-3.5 bg-[#1CADA3] text-white text-[7px] flex items-center justify-center rounded-full font-black">
                                            {cat.count}
                                        </div>
                                    )}
                                </button>
                            );
                        })}
                    </div>
                </div>
            </div>

            {/* DESKTOP TABS (Hidden on Mobile) */}
            <div className="hidden md:flex justify-center mb-6 overflow-x-auto pb-2 scrollbar-hide">
                <div className="p-1 bg-slate-100/80 backdrop-blur-sm rounded-full flex items-center gap-1 relative shadow-inner border border-slate-200/50 shrink-0">
                    {categories.map((cat) => (
                        <button
                            key={cat.id}
                            onClick={() => setSelectedCategory(cat.id)}
                            className={`relative px-5 py-2 rounded-full text-xs font-bold uppercase tracking-wider transition-all duration-300 z-10 flex items-center gap-2 shrink-0 ${
                                selectedCategory === cat.id ? 'text-white' : 'text-slate-500 hover:text-slate-700'
                            }`}
                        >
                            {selectedCategory === cat.id && (
                                <motion.div layoutId="activeTabWishlist" className="absolute inset-0 bg-gradient-to-r from-[#2076C7] to-[#1CADA3] rounded-full -z-10 shadow-sm" transition={{ type: 'spring', bounce: 0.2, duration: 0.6 }} />
                            )}
                            <span>{cat.name}</span>
                            <span className={`px-1.5 py-0.5 rounded-full text-[10px] ${selectedCategory === cat.id ? 'bg-white/20 text-white' : 'bg-slate-200 text-slate-600'}`}>{cat.count}</span>
                        </button>
                    ))}
                </div>
            </div>

            {/* SEARCH BAR */}
            <div className="mb-6 flex justify-center">
                <div className="relative w-full max-w-md">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                    <input 
                        type="text" 
                        placeholder="Search saved items..." 
                        value={searchQuery} 
                        onChange={(e) => setSearchQuery(e.target.value)} 
                        className="w-full pl-10 pr-4 py-2.5 bg-white border border-slate-200 rounded-2xl shadow-sm focus:outline-none focus:ring-2 focus:ring-[#2076C7]/20 transition-all text-slate-800 text-sm" 
                    />
                </div>
            </div>

            {/* CONTENT AREA */}
            <div className="space-y-4">
                {/* Desktop Table View */}
                <div className="hidden md:block bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
                    <table className="w-full">
                        <thead>
                            <tr className="border-b border-gray-100 bg-gray-50/50">
                                <th className="px-6 py-4 text-left text-[11px] font-bold text-gray-400 uppercase tracking-wider">Company</th>
                                <th className="px-6 py-4 text-center text-[11px] font-bold text-gray-400 uppercase tracking-wider">Price</th>
                                <th className="px-6 py-4 text-center text-[11px] font-bold text-gray-400 uppercase tracking-wider">Min Lot</th>
                                <th className="px-6 py-4 text-center text-[11px] font-bold text-gray-400 uppercase tracking-wider">Min Investment</th>
                                <th className="px-6 py-4 text-center text-[11px] font-bold text-gray-400 uppercase tracking-wider"> {selectedCategory === 'mutual-funds' ? 'Risk' : 'Depository'}</th>
                                <th className="px-6 py-4 text-center text-[11px] font-bold text-gray-400 uppercase tracking-wider">Action</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-50">
                            {filteredItems.length === 0 ? (
                                <tr>
                                    <td colSpan={6} className="px-6 py-20 text-center text-gray-400">
                                        <Bookmark className="w-12 h-12 mx-auto mb-3 opacity-20" />
                                        <p className="text-sm font-medium">No items in wishlist</p>
                                        <p className="text-xs mt-1">Add companies from the marketplace</p>
                                    </td>
                                </tr>
                            ) : (
                                filteredItems.map(item => (
                                    <tr key={item.id} className="hover:bg-gray-50 transition-colors">
                                        <td className="px-6 py-4">
                                            <div className="flex items-center space-x-4">
                                                <div className="w-10 h-10 rounded-lg border overflow-hidden bg-white shadow-sm flex-shrink-0">
                                                    {item.logo_url ? <img src={item.logo_url} alt="" className="w-full h-full object-contain" /> : <div className="w-full h-full flex items-center justify-center text-xs font-bold text-[#2076C7] bg-blue-50">{item.product_name.substring(0, 2)}</div>}
                                                </div>
                                                <div className="min-w-0">
                                                    <div className="text-sm font-semibold text-gray-800 truncate">{item.product_name}</div>
                                                    <div className="text-[11px] text-gray-400">ID: {item.product_id}</div>
                                                </div>
                                            </div>
                                        </td>
                                        <td className="px-6 py-4 text-center font-bold text-[#2076C7]">
                                        {item.product_type === 'mutual_fund'
    ? `₹${item.price.toFixed(2)}`
    : `₹${item.price.toFixed(2)}`
}
                                        </td>
                                        <td className="px-6 py-4 text-center text-gray-800 font-medium">
                                           {item.product_type === 'mutual_fund' ? '-' : item.min_lot}
                                        </td>
                                        <td className="px-6 py-4 text-center text-gray-800 font-semibold">
                                          {item.product_type === 'mutual_fund'
    ? '-'
    : `₹${(item.price * item.min_lot).toLocaleString('en-IN', {
          minimumFractionDigits: 2,
      })}`
}
                                        </td>
                                        <td className="px-6 py-4 text-center">
                                            <span className="px-3 py-1 rounded-md bg-purple-50 text-purple-600 text-[10px] font-bold uppercase border border-purple-100">
                                               {item.product_type === 'mutual_fund'
    ? item.depository   // now holds risk
    : item.depository}
                                            </span>
                                        </td>
                                        <td className="px-6 py-4 text-center">
                                            <button
                                                onClick={() => handleRemoveItem(item.id)}
                                                className="w-8 h-8 inline-flex items-center justify-center rounded-lg bg-[#2076C7] text-white hover:bg-red-500 transition-all shadow-sm"
                                                title="Remove from wishlist"
                                            >
                                                <Trash2 size={16} />
                                            </button>
                                        </td>
                                    </tr>
                                ))
                            )}
                        </tbody>
                    </table>
                </div>

                {/* Mobile Card View */}
                <div className="md:hidden grid grid-cols-1 gap-4">
                    <AnimatePresence>
                        {filteredItems.length === 0 ? (
                            <div className="flex flex-col items-center justify-center py-20 text-slate-400 bg-white rounded-2xl">
                                <Bookmark className="w-12 h-12 mb-3 opacity-20" />
                                <p className="text-sm font-medium">No items in wishlist</p>
                            </div>
                        ) : (
                            filteredItems.map((item) => (
                                <motion.div
                                    key={item.id}
                                    layout
                                    initial={{ opacity: 0, scale: 0.9 }}
                                    animate={{ opacity: 1, scale: 1 }}
                                    exit={{ opacity: 0, scale: 0.9 }}
                                    className="bg-white rounded-[2rem] p-5 shadow-sm border border-slate-100"
                                >
                                    <div className="flex items-start justify-between mb-4">
                                        <div className="flex items-center gap-4">
                                            <div className="w-14 h-14 rounded-2xl border border-slate-100 bg-white flex items-center justify-center overflow-hidden">
                                                {item.logo_url ? <img src={item.logo_url} className="w-full h-full object-contain" alt="" /> : <Building2 className="text-[#2076C7] w-6 h-6" />}
                                            </div>
                                            <div>
                                                <h3 className="font-bold text-slate-800 text-lg leading-tight">{item.product_name}</h3>
                                                <span className="text-[10px] font-bold text-[#1CADA3] bg-emerald-50 px-2 py-0.5 rounded uppercase">{item.product_type.replace('_', ' ')}</span>
                                            </div>
                                        </div>
                                        <button onClick={() => handleRemoveItem(item.id)} className="text-slate-300 hover:text-red-500 p-1">
                                            <Trash2 size={20} />
                                        </button>
                                    </div>

                                    <div className="grid grid-cols-2 gap-4 py-4 border-y border-slate-50">
                                        <div className="flex flex-col">
                                            <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Price</span>
                                            <span className="text-sm font-bold text-slate-800">₹{item.price.toFixed(2)}</span>
                                        </div>
                                        <div className="flex flex-col">
                                            <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Lot Size</span>
                                            <span className="text-sm font-bold text-slate-800">{item.min_lot} Units</span>
                                        </div>
                                    </div>

                                    <div className="mt-4 flex items-center justify-between">
                                        <div>
                                            <span className="text-[10px] font-bold text-slate-400 uppercase block mb-1">Min. Invest</span>
                                            <span className="text-lg font-black text-[#2076C7]">₹{(item.price * item.min_lot).toLocaleString('en-IN')}</span>
                                        </div>
                                        <button className="bg-slate-100 p-2 rounded-xl text-slate-600 hover:bg-[#2076C7] hover:text-white transition-all">
                                            <PlusCircle size={20} />
                                        </button>
                                    </div>
                                </motion.div>
                            ))
                        )}
                    </AnimatePresence>
                </div>
            </div>
        </div>
    );
}