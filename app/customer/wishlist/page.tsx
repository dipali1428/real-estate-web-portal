'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import customerService from '../../services/customerService';
import { Bookmark } from 'lucide-react';

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
    pms: 'pms',
};

const initialCategories = [
    { id: 'all', name: 'All Items', count: 0, color: 'from-[#2076C7] to-[#1CADA3]' },
    { id: 'unlisted', name: 'Unlisted Shares', icon: '📄', count: 0, color: 'from-[#2076C7] to-[#1CADA3]' },
    { id: 'mutual-funds', name: 'Mutual Funds', icon: '📈', count: 0, color: 'from-[#2076C7] to-[#1CADA3]' },
    { id: 'pms', name: 'PMS', icon: '🏦', count: 0, color: 'from-[#2076C7] to-[#1CADA3]' },
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
            }
        } catch (error) {
            console.error('Wishlist fetch error:', error);
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
            }
        } catch (error) {
            console.error('Remove failed:', error);
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
                <h2 className="text-2xl font-bold">My Wishlist</h2>
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
                    <span className="absolute left-3 top-2.5">🔍</span>
                </div>
            </motion.div>

            {/* Tabs */}
            <div className="flex space-x-2 overflow-x-auto pb-6 scrollbar-hide">
                {categories.map(cat => (
                    <button
                        key={cat.id}
                        onClick={() => setSelectedCategory(cat.id)}
                        className={`px-4 py-2 rounded-xl text-sm font-medium flex items-center space-x-2 transition-all ${
                            selectedCategory === cat.id
                                ? `bg-linear-to-r ${cat.color} text-white`
                                : 'bg-white text-gray-600 border border-gray-100'
                        }`}
                    >
                        {cat.icon && <span>{cat.icon}</span>}
                        <span>{cat.name}</span>
                        <span className="text-[10px] px-1.5 py-0.5 rounded-full bg-white/20">
                            {cat.count}
                        </span>
                    </button>
                ))}
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