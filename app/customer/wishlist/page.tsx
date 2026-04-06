'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import customerService from '../../services/customerService';
import { Bookmark } from 'lucide-react';
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
    { id: 'all', name: 'All Items', count: 0, color: 'from-[#2076C7] to-[#1CADA3]' },
    { id: 'unlisted', name: 'Unlisted Shares', count: 0, color: 'from-[#2076C7] to-[#1CADA3]' },
    { id: 'mutual-funds', name: 'Mutual Funds', count: 0, color: 'from-[#2076C7] to-[#1CADA3]' },
    { id: 'loans', name: 'Loans', count: 0, color: 'from-[#2076C7] to-[#1CADA3]' },
    { id: 'insurance', name: 'Insurance', count: 0, color: 'from-[#2076C7] to-[#1CADA3]' },
    { id: 'investments', name: 'Investments', count: 0, color: 'from-[#2076C7] to-[#1CADA3]' },
    { id: 'real-estate', name: 'Real Estate', count: 0, color: 'from-[#2076C7] to-[#1CADA3]' },
];

/* ---------------- COMPONENT ---------------- */

export default function Wishlist() {
    const [wishlistItems, setWishlistItems] = useState<WishlistItem[]>([]);
    const [loading, setLoading] = useState(true);
    const [selectedCategory, setSelectedCategory] = useState('all');
    const [searchQuery, setSearchQuery] = useState('');
    const [categories, setCategories] = useState(initialCategories);

    useEffect(() => {
        loadWishlist();
    }, []);

    /* ---------------- FETCH DATA ---------------- */

    const loadWishlist = async () => {
        setLoading(true);

        try {
            const response = await customerService.getMyWishlist();

            if (response.success && response.data) {
                const dataArray = Array.isArray(response.data)
                    ? response.data
                    : [response.data];

                const transformed: WishlistItem[] = dataArray.map((item: ApiWishlistItem) => ({
                    ...item,
                    price: Number(item.product_data?.price || 0),
                    min_lot: item.product_data?.min_lot_size || 0,
                    depository:
                        item.product_data?.depository_applicable?.replace(/&amp;/g, '&') || '-',
                    logo_url: item.product_data?.logo_url || '',
                }));

                setWishlistItems(transformed);
                updateCategoryCounts(transformed);
            } else {
                toast.error('Failed to load wishlist');
            }
        } catch (error) {
            toast.error('Failed to load wishlist');
        } finally {
            setLoading(false);
        }
    };

    /* ---------------- REMOVE ITEM ---------------- */

    const handleRemoveItem = async (id: number) => {
        try {
            const response = await customerService.removeFromWishlist(id);

            if (response.success) {
                const updated = wishlistItems.filter(item => item.id !== id);
                setWishlistItems(updated);
                updateCategoryCounts(updated);
                toast.success('Item removed from wishlist');
            } else {
                toast.error(response.message || 'Failed to remove item');
            }
        } catch (error) {
            toast.error('Failed to remove item');
        }
    };

    /* ---------------- CATEGORY COUNT ---------------- */

    const updateCategoryCounts = (items: WishlistItem[]) => {
        setCategories(prev =>
            prev.map(cat => {
                if (cat.id === 'all') {
                    return { ...cat, count: items.length };
                }

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
        const matchesCategory =
            selectedCategory === 'all' ||
            productTypeToCategoryId[item.product_type] === selectedCategory;

        const matchesSearch = item.product_name
            .toLowerCase()
            .includes(searchQuery.toLowerCase());

        return matchesCategory && matchesSearch;
    });

    /* ---------------- LOADING ---------------- */

    if (loading) {
        return (
            <div className="flex items-center justify-center min-h-screen bg-[#f8fafc]">
                <div className="w-10 h-10 border-4 border-[#2076C7] border-t-transparent rounded-full animate-spin"></div>
            </div>
        );
    }

    /* ---------------- UI ---------------- */

    return (
        <div className="flex-1 p-4 sm:p-6 bg-[#f8fafc] min-h-screen">

            {/* Header */}
            <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                className="bg-linear-to-r from-[#2076C7] to-[#1CADA3] rounded-2xl p-6 mb-6 text-white shadow-lg"
            >   
                <div className="flex items-center gap-2 mb-2">
                    <Bookmark className="w-5 h-8 text-white" />
                    <h2 className="text-2xl font-bold">My Wishlist</h2>
                </div>
                <p className="text-sm opacity-80 mb-4">
                    Track and manage your potential investments
                </p>
                <div className="relative">
                    <input
                        type="text"
                        placeholder="Search your wishlist..."
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        className="w-full px-4 py-2 pl-10 rounded-xl bg-white/20 text-white placeholder-white/60 border border-white/20 focus:outline-none"
                    />
                </div>
            </motion.div>

            {/* Tabs */}
            <div className="w-full mb-6">
            <div className="flex justify-center overflow-x-auto pb-2 scrollbar-hide">
                <div className="p-1 bg-slate-100/80 backdrop-blur-sm rounded-full flex items-center gap-1 relative shadow-inner border border-slate-200/50 shrink-0">
                {categories.map((cat) => (
                    <button
                    key={cat.id}
                    onClick={() => setSelectedCategory(cat.id)}
                    className={`relative px-4 sm:px-5 py-2 rounded-full text-[11px] sm:text-xs font-bold uppercase tracking-wider transition-all duration-300 z-10 flex items-center gap-2 shrink-0 ${
                        selectedCategory === cat.id
                        ? 'text-white'
                        : 'text-slate-500 hover:text-slate-700'
                    }`}
                    >
                    {selectedCategory === cat.id && (
                        <motion.div
                        layoutId="activeTabWishlist"
                        className="absolute inset-0 bg-gradient-to-r from-[#2076C7] to-[#1CADA3] rounded-full -z-10 shadow-sm"
                        transition={{ type: 'spring', bounce: 0.2, duration: 0.6 }}
                        />
                    )}

                    <span>{cat.name}</span>

                    <span
                        className={`px-1.5 py-0.5 rounded-full text-[10px] ${
                        selectedCategory === cat.id
                            ? 'bg-white/20 text-white'
                            : 'bg-slate-200 text-slate-600'
                        }`}
                    >
                        {cat.count}
                    </span>
                    </button>
                ))}
                </div>
            </div>
            </div>

            {/* Table */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
                <div className="overflow-x-auto">
                    <table className="w-full">
                        <thead>
                            <tr className="border-b border-gray-100">
                                <th className="px-6 py-4 text-left text-[11px] text-gray-400 uppercase">Company</th>
                                <th className="px-6 py-4 text-center text-[11px] text-gray-400 uppercase">Price</th>
                                <th className="px-6 py-4 text-center text-[11px] text-gray-400 uppercase">Min Lot</th>
                                <th className="px-6 py-4 text-center text-[11px] text-gray-400 uppercase">Min Investment</th>
                                <th className="px-6 py-4 text-center text-[11px] text-gray-400 uppercase">Depository</th>
                                <th className="px-6 py-4 text-center text-[11px] text-gray-400 uppercase">Save</th>
                            </tr>
                        </thead>

                        <tbody className="divide-y divide-gray-50">
                            <AnimatePresence>
                                {filteredItems.map(item => (
                                    <motion.tr
                                        key={item.id}
                                        initial={{ opacity: 0 }}
                                        animate={{ opacity: 1 }}
                                        exit={{ opacity: 0 }}
                                        className="hover:bg-gray-50"
                                    >
                                        {/* Company */}
                                        <td className="px-6 py-4">
                                            <div className="flex items-center space-x-4">
                                                <div className="w-10 h-10 rounded-lg border overflow-hidden bg-white">
                                                    {item.logo_url ? (
                                                        <img
                                                            src={item.logo_url}
                                                            alt={item.product_name}
                                                            className="w-full h-full object-cover"
                                                        />
                                                    ) : (
                                                        <div className="w-full h-full flex items-center justify-center text-xs font-bold text-[#2076C7]">
                                                            {item.product_name.substring(0, 2)}
                                                        </div>
                                                    )}
                                                </div>

                                                <div>
                                                    <div className="text-sm font-semibold text-gray-800">
                                                        {item.product_name}
                                                    </div>
                                                    <div className="text-[11px] text-gray-400">
                                                        ID: {item.product_id}
                                                    </div>
                                                </div>
                                            </div>
                                        </td>

                                        {/* Price */}
                                        <td className="px-6 py-4 text-center font-bold text-[#2076C7]">
                                            ₹{item.price.toFixed(2)}
                                        </td>

                                        {/* Min Lot */}
                                        <td className="px-6 py-4 text-center text-gray-800">
                                            {item.min_lot}
                                        </td>

                                        {/* Min Investment */}
                                        <td className="px-6 py-4 text-center text-gray-800">
                                            ₹{(item.price * item.min_lot).toLocaleString('en-IN', {
                                                minimumFractionDigits: 2,
                                            })}
                                        </td>

                                        {/* Depository */}
                                        <td className="px-6 py-4 text-center">
                                            <span className="px-3 py-1 rounded-md bg-purple-50 text-purple-600 text-xs font-bold">
                                                {item.depository}
                                            </span>
                                        </td>

                                        {/* Remove */}
                                        <td className="px-6 py-4 text-center">
                                            <button
                                                onClick={() => handleRemoveItem(item.id)}
                                                className="w-8 h-8 inline-flex items-center justify-center rounded-lg bg-[#2076C7] text-white hover:bg-red-500 transition-all"
                                                title="Remove from wishlist"
                                            >
                                                <Bookmark className="w-4 h-4 fill-current" />
                                            </button>
                                        </td>
                                    </motion.tr>
                                ))}
                            </AnimatePresence>
                        </tbody>
                    </table>

                    {filteredItems.length === 0 && (
                        <div className="text-center py-16 text-gray-400">
                            No wishlist items found
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}