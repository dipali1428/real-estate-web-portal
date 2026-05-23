"use client";

import { useState, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import customerService from "../../services/customerService";
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
  Gem,
} from "lucide-react";
import toast from "react-hot-toast";
import Image from "next/image";

/* ---------------- TYPES ---------------- */

interface ApiWishlistItem {
  id: number;
  user_id?: number;
  product_type: string;
  product_id: number;
  product_name: string;
  created_at: string;

  // 🔥 ADD THESE (BONDS FROM DB TABLE)
  coupon?: string | number;
  rating?: string;
  min_investment?: string | number;
  yield_percentage?: string | number;

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

    // (keep these for other products)
    min_investment?: string | number;
    rating?: string;
    coupon?: string | number;
    yield?: string | number;
    yield_percentage?: string | number;

    location?: string;
    total_area?: string;
    rera_id?: string;
    total_asset_value?: string | number;
    developer_name?: string;

    // FD Specific
    best_rate?: string | number;
    category?: string;
    Special_Offer?: string;
  };
}
interface WishlistItem extends ApiWishlistItem {
  price: number;
  min_lot: number;
  depository: string;
  logo_url: string;
  coupon?: string | number;
  yield?: string | number;

  yield_percentage?: string | number;
  location?: string;
  developer_name?: string;
  min_investment?: number;
  total_area?: string;
  rera_id?: string;
  total_asset_value?: number;

  // FD & Helpers
  senior_rate?: string | number;
  isFD?: boolean;
  isNCD?: boolean;
  isBond?: boolean;
  isMF?: boolean;
  isRealEstate?: boolean;

  // AIF & PMS fields
  displayPrice?: string;
  displayMinLot?: string;
  displayMinInvestment?: string;
  displayDepository?: string;
  color?: string;
}

/* ---------------- CATEGORY MAPPING ---------------- */

const productTypeToCategoryId: Record<string, string> = {
  unlisted_share: "unlisted",
  mutual_fund: "mutual-funds",
  loans: "loans",
  insurance: "insurance",
  investments: "investments",
  bonds: "bonds",
  'real-estate': "real-estate",
  real_estate: 'real-estate', // existing (keep)
  fd: 'fd',
  pms: 'pms',
  aif: 'aif',
  ncd: 'ncd',
  ncds: 'ncd',
};

const initialCategories = [
  // { id: 'all', name: 'All Items', icon: Layers },
  { id: "unlisted", name: "Unlisted", icon: Building2 },
  { id: "mutual-funds", name: "Mutual Funds", icon: TrendingUp },
  { id: "pms", name: "PMS", icon: BarChart3 },
  { id: "fd", name: "Fixed Deposit", icon: Wallet },
  { id: "bonds", name: "Bonds", icon: ShieldCheck },
  { id: "aif", name: "AIF", icon: BarChart3 },
  { id: "real-estate", name: "Real Estate", icon: Home },
  { id: "ncd", name: "NCD", icon: Layers },
];

// Helper to get token
const getTokenFromCookie = (): string | null => {
  if (typeof document === "undefined") return null;
  const cookies = document.cookie.split("; ");
  const authCookie = cookies.find((row) => row.startsWith("authToken="));
  return authCookie ? authCookie.split("=")[1] : null;
};

export default function Wishlist() {
  const [wishlistItems, setWishlistItems] = useState<WishlistItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState("unlisted");
  const [searchQuery, setSearchQuery] = useState("");
  const [categories, setCategories] = useState(
    initialCategories.map((c) => ({ ...c, count: 0 })),
  );

  /* ---------------- FETCH DATA WITH PROPER ERROR HANDLING ---------------- */

  const loadWishlist = useCallback(async (showRefreshToast = false) => {
    try {
      const response = await customerService.getMyWishlist();
      // PROPER API RESPONSE HANDLING
      if (!response || !response.success) {
        toast("Wishlist API returned unsuccessful:");
        setWishlistItems([]);
        updateCategoryCounts([]);
        if (showRefreshToast) {
          toast.error("Failed to load wishlist");
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

      const transformed: WishlistItem[] = dataArray.map(
        (item: ApiWishlistItem) => {
          const normalizedType = item.product_type.replace("-", "_");

          const isMF = normalizedType === "mutual_fund";
          const isBond = item.product_type === "bonds";
          const isNCD = normalizedType === "ncd" || normalizedType === "ncds";
          const isRealEstate = normalizedType === "real_estate";
          const isFD = normalizedType === "fd";
          const isPMS = item.product_type === "pms";
          const isAIF = item.product_type === "aif";

          let productData = item.product_data;

          if (typeof productData === "string") {
            try {
              productData = JSON.parse(productData);
            } catch {
              productData = undefined;
            }
          }

          // FD Rate Logic
          const oneYearRateRaw = (productData as any)?.best_rate ||
            (productData as any)?.bestRate ||
            (productData as any)?.one_year_rate ||
            (productData as any)?.Short_Term ||
            (productData as any)?.interest_rate ||
            (productData as any)?.Interest_Rate ||
            (productData as any)?.rate ||
            (productData as any)?.Rate ||
            (productData as any)?.total_rate || 0;
          const oneYearRate = typeof oneYearRateRaw === 'string'
            ? parseFloat(oneYearRateRaw.replace(/[₹%,]/g, ''))
            : Number(oneYearRateRaw || 0);

          const seniorRateRaw = (productData as any)?.senior_rate ||
            (productData as any)?.seniorRate ||
            (productData as any)?.bestSeniorRate ||
            (productData as any)?.Senior_Citizen_Rate;
          const seniorRate = isFD
            ? (seniorRateRaw ? (typeof seniorRateRaw === 'string' ? parseFloat(seniorRateRaw.replace(/[₹%,]/g, '')) : seniorRateRaw) : (oneYearRate > 0 ? (oneYearRate + 0.5).toFixed(2) : 0))
            : undefined;

          let displayPrice = "-";
          let displayMinLot = "-";
          let displayMinInvestment = "-";
          let displayDepository = "-";
          let color = "";

          if (isPMS) {
            const pData = (productData as any) || {};
            if (pData.returns && pData.returns !== "N/A") {
              displayPrice = pData.returns;
            } else {
              displayPrice = pData.return_3y ? `${(pData.return_3y * 100).toFixed(1)}%` : (pData.return_1y ? `${(pData.return_1y * 100).toFixed(1)}%` : (pData.risk_level || "Invest"));
            }
            displayMinLot = pData.strategy_type || pData.benchmark || pData.portfolio_style || "Growth";
            displayMinInvestment = pData.min_investment ? (typeof pData.min_investment === 'number' ? `₹${pData.min_investment.toLocaleString('en-IN')}` : pData.min_investment) : (pData.minInvestment || "₹50L");
            displayDepository = pData.category || "Equity";
            color = pData.color || "#2076C7";
          } else if (isAIF) {
            const pData = (productData as any) || {};
            displayPrice = (pData.returns && pData.returns !== "N/A") ? pData.returns : (pData.target_irr || pData.risk_level || "Invest");
            displayMinLot = pData.strategy || pData.manager || pData.structure || "Growth";
            displayMinInvestment = pData.min_investment ? (typeof pData.min_investment === 'number' ? `₹${pData.min_investment.toLocaleString('en-IN')}` : pData.min_investment) : (pData.minInvestment || "₹1 Cr");
            displayDepository = pData.category || "Alternative";
            color = pData.color || "#1CADA3";
          }

          return {
            ...item,
            isFD,
            isNCD,
            isBond,
            isMF,
            isRealEstate,
            senior_rate: seniorRate,
            displayPrice,
            displayMinLot,
            displayMinInvestment,
            displayDepository,
            color,

            // ✅ FIX: bonds/NCD use min_investment as price
            price: isFD
              ? (oneYearRate > 0 ? oneYearRate : Number((productData as any)?.best_rate || 0))
              : (isBond || isNCD)
                ? Number(String(productData?.min_investment ?? (productData as any)?.min_invest ?? item.min_investment ?? productData?.price ?? 0).replace(/[^0-9.]/g, ''))
                : isRealEstate
                  ? Number(productData?.min_investment || productData?.price || 0)
                  : isMF
                    ? Number(productData?.nav || 0)
                    : isPMS || isAIF
                      ? 0
                      : Number(productData?.price || 0),

            // ✅ FIX: bonds/NCD don't have lot → force 1
            min_lot: isFD ? 0 : isMF ? 0 : (isBond || isNCD) ? 1 : isPMS || isAIF ? 0 : productData?.min_lot_size || 0,

            depository: isFD
              ? (productData as any)?.category || 'Bank'
              : isMF
                ? productData?.risk || "Moderate"
                : (isBond || isNCD)
                  ? item.rating || (productData as any)?.rating || "NR"
                  : isPMS || isAIF
                    ? displayDepository
                    : isMF
                      ? productData?.risk || "Moderate"
                      : productData?.depository_applicable?.replace(/&amp;/g, "&") || "-",

            logo_url: productData?.logo_url || "",

            coupon: (isBond || isNCD)
              ? String(productData?.coupon || (productData as any)?.interest || item.coupon || 0).replace(/[^0-9.]/g, '')
              : undefined,

            yield: (isBond || isNCD)
              ? String(productData?.yield_percentage || productData?.yield || (productData as any)?.interest || item.yield_percentage || 0).replace(/[^0-9.]/g, '')
              : undefined,



            yield_percentage: isRealEstate
              ? productData?.yield_percentage
              : undefined,

            location: isRealEstate ? productData?.location : undefined,
            developer_name: isRealEstate ? productData?.developer_name : undefined,
            min_investment: isRealEstate
              ? Number(productData?.min_investment || 0)
              : undefined,
            total_area: isRealEstate ? productData?.total_area : undefined,
            rera_id: isRealEstate ? productData?.rera_id : undefined,
            total_asset_value: isRealEstate
              ? Number(productData?.total_asset_value || productData?.price || 0)
              : undefined,
          };
        }
      );
      setWishlistItems(transformed);
      updateCategoryCounts(transformed);

      if (showRefreshToast && transformed.length > 0) {
        toast.success(`Wishlist refreshed (${transformed.length} items)`);
      } else if (showRefreshToast && transformed.length === 0) {
        toast("Your wishlist is empty", { icon: "📋" });
      }
    } catch (error) {
      toast.error('Error loading wishlist');
      setWishlistItems([]);
      updateCategoryCounts([]);
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  }, []);

  /* ---------------- AUTO REFRESH & SYNC ---------------- */

  useEffect(() => {
    // Initial load of wishlist items
    loadWishlist();

    // Auto-refresh every 30 seconds to keep in sync with other pages
    const intervalId = setInterval(() => {
      loadWishlist(false); // Silent refresh
    }, 30000);

    // Also refresh when page becomes visible again (user returns from another tab)
    const handleVisibilityChange = () => {
      if (document.visibilityState === "visible") {
        loadWishlist(false);
      }
    };
    document.addEventListener("visibilitychange", handleVisibilityChange);

    // Listen for custom wishlistUpdated events (add actions)
    const handleWishlistUpdated = (e: Event) => {
      const customEvent = e as CustomEvent<any>;
      if (customEvent?.detail?.action === "add") {
        loadWishlist(false);
      }
    };
    window.addEventListener("wishlistUpdated", handleWishlistUpdated);

    return () => {
      clearInterval(intervalId);
      document.removeEventListener("visibilitychange", handleVisibilityChange);
      window.removeEventListener("wishlistUpdated", handleWishlistUpdated);
    };
  }, [loadWishlist]);

  /* ---------------- REMOVE ITEM WITH SYNC ---------------- */

  const handleRemoveItem = async (id: number) => {
    const token = getTokenFromCookie();
    if (!token) {
      toast.error("Session expired");
      return;
    }

    try {
      const response = await customerService.removeFromWishlist(id);
      if (response.success) {
        const updated = wishlistItems.filter((item) => item.id !== id);
        setWishlistItems(updated);
        updateCategoryCounts(updated);
        toast.success("Item removed from wishlist");

        // Dispatch custom event for other components to sync
        if (typeof window !== "undefined") {
          window.dispatchEvent(
            new CustomEvent("wishlistUpdated", {
              detail: { action: "remove", id },
            }),
          );
        }
      } else {
        toast.error(response.message || "Failed to remove item");
        // Reload to ensure consistency
        loadWishlist(false);
      }
    } catch (error) {
      toast.error('Failed to remove item');
    }
  };

  /* ---------------- CATEGORY COUNT ---------------- */

  const updateCategoryCounts = (items: WishlistItem[]) => {
    setCategories((prev) =>
      prev.map((cat) => {
        // Count all items whose normalized product_type maps to cat.id
        const count = items.filter((item) => {
          const normalized = item.product_type.replace("-", "_");
          return productTypeToCategoryId[normalized] === cat.id;
        }).length;

        return {
          ...cat,
          count,
        };
      }),
    );
  };
  /* ---------------- FILTER ---------------- */

  const normalizeType = (type: string) => type.replace("-", "_");

  const filteredItems = wishlistItems.filter(item => {
    const normalizedType = normalizeType(item.product_type);

    const matchesCategory =
      productTypeToCategoryId[normalizedType] === selectedCategory;

    const matchesSearch =
      item.product_name.toLowerCase().includes(searchQuery.toLowerCase());

    return matchesCategory && matchesSearch;
  });


  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-[#f8fafc]">
        <div className="w-10 h-10 border-4 border-[#2076C7] border-t-transparent rounded-full animate-spin"></div>
      </div>
    );
  }
  const isRealEstateSelected = selectedCategory === "real-estate";
  const isFDSelected = selectedCategory === "fd";
  return (
    <div className="flex-1 p-4 sm:p-6 bg-[#f8fafc] min-h-screen font-sans">
      {/* DESKTOP HEADER (Hidden on Mobile) */}
      <div className="hidden md:block">
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-linear-to-r from-[#2076C7] to-[#1CADA3] rounded-2xl p-6 mb-6 text-white shadow-lg"
        >
          <div className="flex items-center justify-between">
            <div>
              <div className="flex items-center gap-2 mb-2">
                <Bookmark className="w-5 h-8 text-white" />
                <h2 className="text-2xl font-bold">Wishlist</h2>
              </div>
              <p className="text-sm opacity-80">
                Track and manage your potential investments
              </p>
            </div>
          </div>
        </motion.div>
      </div>

      {/* MOBILE HEADER */}
      <div className="md:hidden">
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-gradient-to-r from-[#2076C7] to-[#1CADA3] rounded-2xl p-5 mb-6 text-white shadow-lg"
        >
          <div className="flex items-center justify-between">
            <div>
              <div className="flex items-center gap-2 mb-2">
                <Bookmark className="w-5 h-5 text-white" />
                <h2 className="text-xl font-bold">Wishlist</h2>
              </div>
              <p className="text-xs opacity-80">
                Track and manage your potential investments
              </p>
            </div>
          </div>
        </motion.div>
      </div>

      {/* MOBILE CATEGORY GRID - 2 COLUMNS, ALL BUTTONS VISIBLE */}
      <div className="md:hidden mb-6">
        <div className="bg-slate-100/60 backdrop-blur-sm rounded-2xl p-1.5 border border-slate-200/50 shadow-inner">
          <div className="grid grid-cols-2 gap-1.5">
            {categories.map((cat) => {
              const isActive = selectedCategory === cat.id;
              const Icon = cat.icon;
              const hasItems = cat.count > 0;

              return (
                <button
                  key={cat.id}
                  onClick={() => setSelectedCategory(cat.id)}
                  className={`relative flex flex-col items-center justify-center gap-1 py-2 px-1 rounded-xl transition-all duration-300 z-10 active:scale-95 ${isActive
                    ? "text-white shadow-sm"
                    : "text-slate-400 hover:text-slate-500"
                    }`}
                >
                  {isActive && (
                    <motion.div
                      layoutId="activeCategoryMobile"
                      className="absolute inset-0 bg-gradient-to-r from-[#2076C7] to-[#1CADA3] rounded-xl -z-10"
                      transition={{
                        type: "spring",
                        bounce: 0.2,
                        duration: 0.6,
                      }}
                    />
                  )}
                  <Icon size={18} strokeWidth={isActive ? 2.5 : 1.5} />
                  <div className="flex items-center gap-1">
                    <span className="text-[10px] font-bold uppercase tracking-tight leading-none">
                      {cat.name.split(" ")[0]}
                    </span>
                    {hasItems && (
                      <span
                        className={`text-[9px] font-bold px-1.5 py-0.5 rounded-full ${isActive
                          ? "bg-white/20 text-white"
                          : "bg-slate-200 text-slate-600"
                          }`}
                      >
                        {cat.count}
                      </span>
                    )}
                  </div>
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
              className={`relative px-5 py-2 rounded-full text-xs font-bold uppercase tracking-wider transition-all duration-300 z-10 flex items-center gap-2 shrink-0 ${selectedCategory === cat.id
                ? "text-white"
                : "text-slate-500 hover:text-slate-700"
                }`}
            >
              {selectedCategory === cat.id && (
                <motion.div
                  layoutId="activeTabWishlist"
                  className="absolute inset-0 bg-gradient-to-r from-[#2076C7] to-[#1CADA3] rounded-full -z-10 shadow-sm"
                  transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
                />
              )}
              <span>{cat.name}</span>
              <span
                className={`px-1.5 py-0.5 rounded-full text-[10px] ${selectedCategory === cat.id ? "bg-white/20 text-white" : "bg-slate-200 text-slate-600"}`}
              >
                {cat.count}
              </span>
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
                <th className="px-6 py-4 text-left text-[11px] font-bold text-gray-400 uppercase tracking-wider">
                  {isRealEstateSelected ? "Property" : selectedCategory === "mutual-funds" ? "Fund Name" : "Company"}
                </th>
                {isRealEstateSelected ? (
                  <>
                    <th className="px-6 py-4 text-center text-[11px] font-bold text-gray-400 uppercase tracking-wider">
                      Location
                    </th>
                    <th className="px-6 py-4 text-center text-[11px] font-bold text-gray-400 uppercase tracking-wider">
                      Area
                    </th>
                    <th className="px-6 py-4 text-center text-[11px] font-bold text-gray-400 uppercase tracking-wider">
                      RERA ID
                    </th>
                    <th className="px-6 py-4 text-center text-[11px] font-bold text-gray-400 uppercase tracking-wider">
                      Min Investment
                    </th>
                    <th className="px-6 py-4 text-center text-[11px] font-bold text-gray-400 uppercase tracking-wider">
                      Yield
                    </th>
                    <th className="px-6 py-4 text-center text-[11px] font-bold text-gray-400 uppercase tracking-wider">
                      Total Value
                    </th>
                  </>
                ) : isFDSelected ? (
                  <>
                    <th className="px-6 py-4 text-center text-[11px] font-bold text-gray-400 uppercase tracking-wider">Category</th>
                    <th className="px-6 py-4 text-center text-[11px] font-bold text-gray-400 uppercase tracking-wider">Interest Rate</th>
                    <th className="px-6 py-4 text-center text-[11px] font-bold text-gray-400 uppercase tracking-wider">Senior Rate</th>
                    <th className="px-6 py-4 text-center text-[11px] font-bold text-gray-400 uppercase tracking-wider">Special Offer</th>
                  </>
                ) : selectedCategory === 'pms' || selectedCategory === 'aif' ? (
                  <>
                    <th className="px-6 py-4 text-center text-[11px] font-bold text-gray-400 uppercase tracking-wider">Returns</th>
                    <th className="px-6 py-4 text-center text-[11px] font-bold text-gray-400 uppercase tracking-wider">Strategy</th>
                    <th className="px-6 py-4 text-center text-[11px] font-bold text-gray-400 uppercase tracking-wider">Min Investment</th>
                    <th className="px-6 py-4 text-center text-[11px] font-bold text-gray-400 uppercase tracking-wider">Category</th>
                  </>
                ) : selectedCategory === "mutual-funds" ? (
                  <>
                    <th className="px-6 py-4 text-center text-[11px] font-bold text-gray-400 uppercase tracking-wider">Current NAV</th>
                    <th className="px-6 py-4 text-center text-[11px] font-bold text-gray-400 uppercase tracking-wider">Risk Profile</th>
                  </>
                ) : (
                  <>
                    <th className="px-6 py-4 text-center text-[11px] font-bold text-gray-400 uppercase">{selectedCategory === 'bonds' || selectedCategory === 'ncd' ? 'Min Invest' : 'Price'}</th>
                    <th className="px-6 py-4 text-center text-[11px] font-bold text-gray-400 uppercase">{selectedCategory === 'bonds' || selectedCategory === 'ncd' ? 'Coupon' : 'Min Lot'}</th>
                    <th className="px-6 py-4 text-center text-[11px] font-bold text-gray-400 uppercase">{selectedCategory === 'bonds' || selectedCategory === 'ncd' ? 'Yield' : 'Min Investment'}</th>

                    <th className="px-6 py-4 text-center text-[11px] font-bold text-gray-400 uppercase">{selectedCategory === 'mutual-funds' ? 'Risk' : selectedCategory === 'bonds' || selectedCategory === 'ncd' ? 'Rating' : 'Depository'}</th>
                  </>
                )}
                <th className="px-6 py-4 text-center text-[11px] font-bold text-gray-400 uppercase tracking-wider">
                  Action
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-50">
              {filteredItems.length === 0 ? (
                <tr>
                  <td
                    colSpan={selectedCategory === "mutual-funds" ? 4 : isFDSelected ? 6 : isRealEstateSelected ? 8 : 6}
                    className="px-6 py-20 text-center text-gray-400"
                  >
                    <Bookmark className="w-12 h-12 mx-auto mb-3 opacity-20" />
                    <p className="text-sm font-medium">No items in wishlist</p>
                    <p className="text-xs mt-1">
                      Add companies from the marketplace
                    </p>
                  </td>
                </tr>
              ) : (
                filteredItems.map((item) => {
                  const isRE =
                    item.product_type === "real-estate" ||
                    item.product_type === "real-estate";
                  return (
                    <motion.tr
                      key={item.id}
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      className="hover:bg-gray-50 transition-colors"
                    >
                      <td className="px-6 py-4">
                        <div className="flex items-center space-x-4">
                          <div className="w-10 h-10 rounded-lg border overflow-hidden bg-white shadow-sm flex-shrink-0">
                            {item.logo_url ? (
                              <Image
                                src={item.logo_url}
                                width={40}
                                height={40}
                                alt=""
                                className="w-full h-full object-contain"
                              />
                            ) : item.product_type === 'pms' || item.product_type === 'aif' ? (
                              <div className="w-full h-full flex items-center justify-center bg-blue-50">
                                <Gem size={18} style={{ color: item.color || '#2076C7' }} />
                              </div>
                            ) : (
                              <div className="w-full h-full flex items-center justify-center text-xs font-bold text-[#2076C7] bg-blue-50">
                                {item.product_name.substring(0, 2)}
                              </div>
                            )}
                          </div>
                          <div className="min-w-0">
                            <div className="text-sm font-semibold text-gray-800 truncate">
                              {item.product_name}
                            </div>
                            <div className="text-[11px] text-gray-400">
                              ID: {item.product_id}
                            </div>
                            {isRE && item.yield_percentage && (
                              <div className="text-[10px] text-teal-600 font-semibold mt-0.5">
                                Yield: {item.yield_percentage}%
                              </div>
                            )}
                          </div>
                        </div>
                      </td>

                      {isRE ? (
                        <>
                          <td className="px-6 py-4 text-center text-xs text-gray-600 font-medium whitespace-nowrap">
                            {item.location || "-"}
                          </td>
                          <td className="px-6 py-4 text-center text-xs text-gray-800 font-bold">
                            {item.total_area ? `${item.total_area} sq.ft` : "-"}
                          </td>
                          <td className="px-6 py-4 text-center text-[10px] text-gray-500 font-mono">
                            {item.rera_id || "-"}
                          </td>
                          <td className="px-6 py-4 text-center text-sm font-bold text-emerald-600">
                            ₹
                            {(item.min_investment || 0).toLocaleString("en-IN")}
                          </td>
                          <td className="px-6 py-4 text-center">
                            <span className="px-2 py-1 rounded bg-blue-50 text-[#2076C7] text-[10px] font-black uppercase border border-blue-100">
                              {item.yield_percentage
                                ? `${item.yield_percentage}%`
                                : "-"}
                            </span>
                          </td>
                          <td className="px-6 py-4 text-center font-black text-gray-800 text-sm">
                            ₹
                            {(
                              item.total_asset_value ||
                              item.price ||
                              0
                            ).toLocaleString("en-IN")}
                          </td>
                        </>
                      ) : item.isFD ? (
                        <>
                          <td className="px-6 py-4 text-center">
                            <span className="px-3 py-1 rounded-md bg-purple-50 text-purple-600 text-[10px] font-bold uppercase border border-purple-100">
                              {item.depository}
                            </span>
                          </td>
                          <td className="px-6 py-4 text-center font-bold text-[#2076C7]">
                            {item.price > 0 ? `${Number(item.price).toFixed(2)}%` : 'N/A'}
                          </td>
                          <td className="px-6 py-4 text-center text-[#2076C7] font-bold">
                            {item.senior_rate ? `${item.senior_rate}%` : 'N/A'}
                          </td>
                          <td className="px-6 py-4 text-center">
                            <div className="inline-flex items-center px-2 py-1 bg-amber-50 border border-amber-200 rounded-lg">
                              <span className="text-[10px] text-amber-700 font-bold uppercase whitespace-nowrap">
                                {(item.product_data as any)?.Special_Offer ? `${(item.product_data as any).Special_Offer} 🎁` : '-'}
                              </span>
                            </div>
                          </td>
                        </>
                      ) : item.product_type === 'pms' || item.product_type === 'aif' ? (
                        <>
                          <td className="px-6 py-4 text-center font-bold text-[#2076C7] whitespace-nowrap">
                            {item.displayPrice}
                          </td>
                          <td className="px-6 py-4 text-center text-gray-800 whitespace-nowrap">
                            {item.displayMinLot}
                          </td>
                          <td className="px-6 py-4 text-center text-gray-800 whitespace-nowrap">
                            {item.displayMinInvestment}
                          </td>
                          <td className="px-6 py-4 text-center">
                            <span className="px-3 py-1 rounded-md bg-purple-50 text-purple-600 text-[10px] font-bold uppercase border border-purple-100">
                              {item.displayDepository}
                            </span>
                          </td>
                        </>
                      ) : item.isMF ? (
                        <>
                          <td className="px-6 py-4 text-center font-bold text-[#2076C7]">
                            ₹{item.price > 0 ? Number(item.price).toFixed(2) : "0.00"}
                          </td>
                          <td className="px-6 py-4 text-center">
                            <span className="px-3 py-1 rounded-md bg-[#2076C7]/10 text-[#2076C7] text-[10px] font-bold uppercase border border-[#2076C7]/20">
                              {item.depository || "Moderate"}
                            </span>
                          </td>
                        </>
                      ) : (
                        <>
                          <td className="px-6 py-4 text-center font-bold text-[#2076C7]">
                            ₹{item.price.toLocaleString('en-IN', { minimumFractionDigits: 2 })}
                          </td>
                          <td className="px-6 py-4 text-center text-gray-800 font-medium">
                            {(item.isBond || item.isNCD) ? `${item.coupon || 0}%` : (item.isMF ? '-' : item.min_lot)}
                          </td>
                          <td className="px-6 py-4 text-center text-gray-800 font-semibold">
                            {(item.isBond || item.isNCD) ? `${item.yield || 0}%` : (item.isMF ? '-' : `₹${(item.price * (item.min_lot || 1)).toLocaleString("en-IN")}`)}
                          </td>
                          <td className="px-6 py-4 text-center">
                            <span className="px-3 py-1 rounded-md bg-purple-50 text-purple-600 text-[10px] font-bold uppercase border border-purple-100">
                              {item.depository}
                            </span>
                          </td>
                        </>
                      )}
                      <td className="px-6 py-4 text-center">
                        <button
                          onClick={() => handleRemoveItem(item.id)}
                          className="w-8 h-8 inline-flex items-center justify-center rounded-lg 
             bg-gradient-to-r from-blue-500 to-teal-500 
             text-white transition-all shadow-sm"
                          title="Remove from wishlist"
                        >
                          <Trash2 size={16} />
                        </button>
                      </td>
                    </motion.tr>
                  );
                })
              )}
            </tbody>
          </table>
        </div>

        {/* Mobile Card View - NO HORIZONTAL LINES */}
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
                  className="bg-white rounded-2xl p-5 shadow-sm border border-slate-100"
                >
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex items-center gap-4 flex-1 min-w-0">
                      <div className="w-14 h-14 rounded-2xl border border-slate-100 bg-white flex items-center justify-center overflow-hidden shadow-sm flex-shrink-0">
                        {item.logo_url ? (
                          <Image
                            src={item.logo_url}
                            width={56}
                            height={56}
                            className="w-full h-full object-contain p-1.5"
                            alt={item.product_name}
                          />
                        ) : (
                          <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-[#2076C7]/10 to-[#1CADA3]/10">
                            {item.isFD ? <Wallet className="text-[#2076C7] w-7 h-7" strokeWidth={1.5} /> : item.product_type === 'pms' || item.product_type === 'aif' ? <Gem className="w-7 h-7" style={{ color: item.color || '#2076C7' }} strokeWidth={1.5} /> : <Building2 className="text-[#2076C7] w-7 h-7" strokeWidth={1.5} />}
                          </div>
                        )}
                      </div>
                      <div className="flex-1 min-w-0">
                        <h3 className="font-bold text-slate-800 text-base leading-tight truncate">
                          {item.product_name}
                        </h3>
                        <span className="text-[9px] font-bold text-[#1CADA3] bg-emerald-50 px-2 py-0.5 rounded-full uppercase inline-block mt-1">
                          {item.isFD ? "Fixed Deposit" : item.product_type.replace("_", " ")}
                        </span>
                      </div>
                    </div>
                    <button
                      onClick={() => handleRemoveItem(item.id)}
                      className="text-slate-300 hover:text-red-500 p-1 transition-colors flex-shrink-0 ml-2"
                    >
                      <Trash2 size={18} />
                    </button>
                  </div>

                  {item.isMF ? (
                    <div className="grid grid-cols-2 gap-4 py-3">
                      <div className="flex flex-col">
                        <span className="text-[9px] font-bold text-slate-400 uppercase tracking-wider">
                          Current NAV
                        </span>
                        <span className="text-base font-bold text-[#2076C7]">
                          ₹{item.price > 0 ? Number(item.price).toFixed(2) : "0.00"}
                        </span>
                      </div>
                      <div className="flex flex-col">
                        <span className="text-[9px] font-bold text-slate-400 uppercase tracking-wider">
                          Risk Profile
                        </span>
                        <span className="text-sm font-bold text-slate-800">
                          {item.depository || "Moderate"}
                        </span>
                      </div>
                    </div>
                  ) : (
                    <>
                      <div className="grid grid-cols-2 gap-4 py-3">
                        <div className="flex flex-col">
                          <span className="text-[9px] font-bold text-slate-400 uppercase tracking-wider">
                            {item.isFD ? 'Interest Rate' : item.product_type === 'pms' || item.product_type === 'aif' ? 'Returns' : 'Price'}
                          </span>
                          <span className="text-base font-bold text-[#2076C7]">
                            {item.isFD ? `${Number(item.price).toFixed(2)}%` : item.product_type === 'pms' || item.product_type === 'aif' ? item.displayPrice : (item.product_type === "bonds" || item.isNCD ? `₹${item.price.toLocaleString("en-IN")}` : `₹${item.price.toFixed(2)}`)}
                          </span>
                        </div>
                        <div className="flex flex-col">
                          <span className="text-[9px] font-bold text-slate-400 uppercase tracking-wider">
                            {item.isFD ? 'Senior Rate' : item.product_type === 'pms' || item.product_type === 'aif' ? 'Strategy' : (item.product_type === "bonds" || item.isNCD) ? 'Coupon' : 'Lot Size'}
                          </span>
                          <span className="text-base font-bold text-slate-800">
                            {item.isFD ? (item.senior_rate ? `${item.senior_rate}%` : 'N/A') : item.product_type === 'pms' || item.product_type === 'aif' ? item.displayMinLot : (item.product_type === "bonds" || item.isNCD) ? `${item.coupon || 0}%` : (item.min_lot === 0 ? "-" : `${item.min_lot} Units`)}
                          </span>
                        </div>
                      </div>

                      {item.isFD && (item.product_data as any)?.Special_Offer && (
                        <div className="mt-2 p-2 bg-orange-50 rounded-xl border border-orange-100">
                          <div className="text-[8px] text-orange-400 uppercase font-bold mb-1">Special Offer</div>
                          <div className="text-xs text-orange-600 font-bold italic truncate">🎁 {(item.product_data as any).Special_Offer}</div>
                        </div>
                      )}

                      <div className="mt-4 grid grid-cols-2 gap-4">
                        {/* Min Investment / Tenure */}
                        <div className="flex flex-col">
                          <span className="text-[9px] font-bold text-slate-400 uppercase tracking-wider">
                            {item.isFD ? 'Tenure' : 'Min Invest'}
                          </span>
                          <span className="text-base font-black text-[#2076C7]">
                            {item.isFD
                              ? `${(item.product_data as any)?.Short_Term || '-'} / ${(item.product_data as any)?.Mega_Term || '-'}`
                              : item.product_type === 'pms' || item.product_type === 'aif'
                                ? item.displayMinInvestment
                                : (item.product_type === 'bonds' || item.isNCD)
                                  ? `₹${item.price.toLocaleString("en-IN")}`
                                  : item.price && item.min_lot
                                    ? `₹${(item.price * item.min_lot).toLocaleString("en-IN")}`
                                    : "N/A"}
                          </span>
                        </div>

                        {(item.product_type === "bonds" || item.isNCD) && (
                          <div className="flex flex-col">
                            <span className="text-[9px] font-bold text-slate-400 uppercase tracking-wider">Yield</span>
                            <span className="text-base font-bold text-emerald-600">{item.yield || 0}%</span>
                          </div>
                        )}
                      </div>
                    </>
                  )}
                </motion.div>
              ))
            )}
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
}
