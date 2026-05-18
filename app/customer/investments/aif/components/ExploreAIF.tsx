"use client";;
import { useState, useEffect, useMemo, useCallback } from "react";
import {
  Search,
  X,
  Briefcase,
  TrendingUp,
  ShoppingCart,
  Trash2,
  ArrowRight,
  Layers,
  Bookmark,
  BookmarkCheck,
  FileText,
  Calendar,
  Info,
  Clock,
  Video,
  MessageSquare,
  ArrowUpRight,
  Check,
  Loader2,
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import customerService from "../../../../services/customerService";
import toast from "react-hot-toast";
interface CartItem {
  id: string;
  name: string;
  amount: number;
}
import { AIFProduct, aifProducts, MIN_INVESTMENT_AIF } from "../data/aifData";
// Tracks backend wishlist item for AIF products
interface WishlistEntry {
  backendId: number;       // The `id` from the backend wishlist table
  productName: string;     // The product_name stored in backend
}
export default function ExploreAIF() {
  const [searchQuery, setSearchQuery] = useState("");
  const [cart, setCart] = useState<CartItem[]>([]);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState<AIFProduct | null>(null);
  const [activeCategory, setActiveCategory] = useState("All");
  // Backend-synced wishlist: maps AIF product name -> backend wishlist entry ID
  const [wishlistMap, setWishlistMap] = useState<Record<string, number>>({});
  const [wishlistLoading, setWishlistLoading] = useState<Set<string>>(new Set());
  const [showAllFunds, setShowAllFunds] = useState(false);
  const [isScheduleModalOpen, setIsScheduleModalOpen] = useState(false);
  const [schedulingProduct, setSchedulingProduct] = useState<AIFProduct | null>(null);
  const [meetingDate, setMeetingDate] = useState("");
  const [meetingTime, setMeetingTime] = useState("");
  const [meetLink, setMeetLink] = useState("https://meet.google.com/oio-bdwb-cxyin");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [notifyWhatsApp, setNotifyWhatsApp] = useState(true);
  const [notifyEmail, setNotifyEmail] = useState(true);
  const [whatsappNumber, setWhatsappNumber] = useState("");
  const [userId, setUserId] = useState<number | null>(null);
  const [dynamicAifProducts, setDynamicAifProducts] = useState<AIFProduct[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const handleScheduleClick = async (product: AIFProduct) => {
    setSchedulingProduct(product);
    setIsScheduleModalOpen(true);
    // If whatsappNumber is empty, try fetching again
    if (!whatsappNumber) {
      try {
        const response = await customerService.getProfile();
        if (response && response.user) {
          setUserId(response.user.id);
          const userMobile = response.user.mobile || response.user.phone || response.user.mobile_number;
          if (userMobile) {
            setWhatsappNumber(userMobile);
          }
        }
      } catch (error) {
        toast.error("Failed to re-fetch user profile");
      }
    }
  };
  const handleConfirmSchedule = async () => {
    if (!meetingDate || !meetingTime || !schedulingProduct) {
      toast.error("Please select both date and time");
      return;
    }
    // Combine date and time into a single Date object
    const combinedDateTime = new Date(`${meetingDate}T${meetingTime}`);
    setIsSubmitting(true);
    try {
      const response = await customerService.scheduleAIFMeeting({
        aif_fund_id: schedulingProduct.id,
        aif_fund_name: schedulingProduct.name,
        meeting_time: combinedDateTime.toISOString(),
        user_details: {
          whatsapp: whatsappNumber,
          notifyWhatsApp,
          notifyEmail,
          meetLink: meetLink // Use state value instead of hardcoded link
        }
      });
      if (response.success) {
        toast.success("Meeting scheduled! Confirmation sent to your WhatsApp and Email.");
        setIsScheduleModalOpen(false);
        setMeetingDate("");
        setMeetingTime("");
      } else {
        toast.error(response.message || "Failed to schedule meeting");
      }
    } catch (error: any) {
      toast.error(error.response?.data?.message || "Something went wrong while scheduling");
    } finally {
      // Brief delay to ensure UI transitions smoothly
      setTimeout(() => {
        setIsSubmitting(false);
      }, 500);
    }
  };
  // Load wishlist from backend on mount
  const loadWishlist = useCallback(async () => {
    try {
      const response = await customerService.getMyWishlist();
      if (response.success && response.data) {
        const items = Array.isArray(response.data) ? response.data : [response.data];
        const map: Record<string, number> = {};
        items.forEach((item: any) => {
          if (item.product_type === "aif") {
            map[item.product_name] = item.id;
          }
        });
        setWishlistMap(map);
      }
    } catch (error) {
      toast.error("Failed to load wishlist");
    }
  }, []);
  // Persistence
  useEffect(() => {
    const fetchUser = async () => {
      try {
        const response = await customerService.getProfile();
        if (response && response.user) {
          setUserId(response.user.id);
          const userMobile = response.user.mobile || response.user.phone || response.user.mobile_number;
          if (userMobile) {
            setWhatsappNumber(userMobile);
          }
        }
      } catch (error) {
        toast.error("Failed to fetch user profile");
      }
    };
    fetchUser();
    const savedCart = localStorage.getItem("aif_cart");
    if (savedCart) setCart(JSON.parse(savedCart));
    // Fetch Dynamic AIF Funds from backend
    const fetchDynamicFunds = async () => {
      try {
        setIsLoading(true);
        const response = await customerService.getAIFFundsList();
        if (response && Array.isArray(response)) {
          const mappedFunds: AIFProduct[] = response.map((fund: any) => ({
            id: fund.id,
            name: fund.fund_name,
            desc: fund.strategy || "No description available.",
            manager: fund.manager || "Investment Team",
            theme: fund.structure || "Growth",
            link: "#",
            risk: "High Risk",
            horizon: fund.tenure || "5-7 Years",
            color: "#2076C7",
            category: fund.category?.replace(/\s*AIF\s*$/i, '').trim() || "Category II",
            returns: fund.target_irr || "N/A",
            minInvestment: fund.min_investment || "₹1 Crore",
            strategyDetails: fund.strategy,
            portfolioSize: fund.structure,
            benchmark: fund.hurdle_rate,
            inceptionDate: fund.created_at ? new Date(fund.created_at).getFullYear().toString() : "N/A",
            investmentStyle: fund.structure,
            coreFocusAreas: fund.sector_allocation ? fund.sector_allocation.split(',').map((s: string) => s.trim()) : [],
          }));
          setDynamicAifProducts(mappedFunds);
        }
      } catch (error) {
        toast.error("Failed to fetch dynamic AIF funds");
      } finally {
        setIsLoading(false);
      }
    };
    fetchDynamicFunds();
    loadWishlist();
  }, [loadWishlist]);
  useEffect(() => {
    localStorage.setItem("aif_cart", JSON.stringify(cart));
  }, [cart]);
  // Filtering
  const filteredProducts = useMemo(() => {
    const allProducts = [...dynamicAifProducts, ...aifProducts];
    // Remove duplicates by name (prefer dynamic)
    const uniqueProducts = allProducts.filter((p, index, self) =>
      index === self.findIndex((t) => t.name === p.name)
    );
    return uniqueProducts.filter(p => {
      const matchesSearch =
        p.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        p.desc.toLowerCase().includes(searchQuery.toLowerCase()) ||
        p.manager.toLowerCase().includes(searchQuery.toLowerCase());
      const matchesCategory = activeCategory === "All" || p.category === activeCategory;
      return matchesSearch && matchesCategory;
    });
  }, [searchQuery, activeCategory, dynamicAifProducts]);
  // Cart Actions
  const handleAddToCart = (product: AIFProduct) => {
    if (cart.find(item => item.id === product.name)) {
      setIsCartOpen(true);
      return;
    }
    const newItem: CartItem = { id: product.name, name: product.name, amount: MIN_INVESTMENT_AIF };
    setCart([...cart, newItem]);
    setIsCartOpen(true);
  };
  const removeFromCart = (id: string) => setCart(cart.filter(item => item.id !== id));
  const updateCartAmount = (id: string, amount: number) =>
    setCart(cart.map(item => (item.id === id ? { ...item, amount } : item)));
  const formatINR = (num: number) => num.toLocaleString("en-IN");
  const toggleWishlist = async (product: AIFProduct) => {
    const productName = product.name;
    const backendId = wishlistMap[productName];
    // Prevent double-clicking while loading
    if (wishlistLoading.has(productName)) return;
    setWishlistLoading(prev => new Set(prev).add(productName));
    try {
      if (backendId) {
        // Remove from wishlist
        const response = await customerService.removeFromWishlist(backendId);
        if (response.success) {
          setWishlistMap(prev => {
            const updated = { ...prev };
            delete updated[productName];
            return updated;
          });
          toast.success(`${productName} removed from wishlist`);
        }
      } else {
        // Add to wishlist  
        const response = await customerService.addToWishlist({
          product_type: "aif",
          product_id: product.id,
          product_name: productName,
          product_data: {
            category: product.category,
            returns: product.returns,
            minInvestment: product.minInvestment,
            min_investment: product.minInvestment,
            risk: product.risk,
            risk_level: product.risk,
            color: product.color
          }
        });
        if (response.success && response.data) {
          const newItem = Array.isArray(response.data) ? response.data[0] : response.data;
          setWishlistMap(prev => ({
            ...prev,
            [productName]: newItem.id
          }));
          toast.success(`${productName} saved to wishlist`);
        }
      }
    } catch (error: any) {
      const msg = error.response?.data?.message || "Failed to update wishlist";
      toast.error(msg);
    } finally {
      setWishlistLoading(prev => {
        const updated = new Set(prev);
        updated.delete(productName);
        return updated;
      });
    }
  };
  const visibleProducts = showAllFunds ? filteredProducts : filteredProducts.slice(0, 4);
  return (
    <div className="space-y-6 relative">
      {/* --- NEW MODERN HEADER --- */}
      <motion.div
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
        className="relative bg-white rounded-2xl p-6 mb-2 shadow-sm border border-slate-100/60"
      >
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-xl bg-gradient-to-r from-[#1CADA3] to-[#2076C7] flex items-center justify-center text-white font-bold text-xl shadow-lg shrink-0">
              <Layers size={24} />
            </div>
            <div>
              <div className="flex items-center gap-3 mb-1">
                <h2 className="text-xl sm:text-2xl font-bold text-slate-800">
                  Explore AIF Opportunities
                </h2>
                <span className="px-2.5 py-1 bg-teal-100 text-teal-700 text-[10px] font-bold rounded-full border border-teal-200 whitespace-nowrap">
                  Active
                </span>
              </div>
              <p className="text-sm text-slate-500 flex items-center gap-2">
                <span className="text-[#1CADA3] flex items-center justify-center w-5 h-5 rounded-full bg-teal-50/50">
                  <Info size={14} />
                </span>
                Access exclusive alternative investment strategies
              </p>
            </div>
          </div>
        </div>
      </motion.div>
      {/* Filter Section */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6">
        {/* Category Filter - Left Side */}
        <div className="flex flex-wrap gap-1.5">
          {["All", "Category I", "Category II", "Category III"].map(cat => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={`px-5 py-2 rounded-xl font-bold text-[11px] tracking-wide transition-all cursor-pointer whitespace-nowrap border ${activeCategory === cat
                ? 'text-white border-transparent shadow-lg shadow-[#2076C7]/20'
                : 'bg-white text-gray-500 border-gray-100 hover:border-gray-200 hover:bg-gray-50'
                }`}
              style={activeCategory === cat ? { background: 'linear-gradient(to right, #2076C7, #1CADA3)' } : {}}
            >
              {cat}
            </button>
          ))}
        </div>
        {/* Search - Right Side */}
        <div className="relative w-full md:w-64">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={16} />
          <input
            type="text"
            placeholder="Search funds..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full h-11 pl-11 pr-4 bg-white border border-gray-200 rounded-xl outline-none focus:ring-2 focus:ring-[#2076C7]/10 transition-all font-medium text-gray-700 text-sm placeholder:text-gray-400 shadow-sm"
          />
        </div>
      </div>
      {/* Products Grid */}
      {isLoading ? (
        <div className="flex flex-col items-center justify-center py-20 bg-white/50 rounded-3xl border border-dashed border-gray-200">
          <Loader2 className="w-12 h-12 text-[#1CADA3] animate-spin mb-4" />
          <p className="text-gray-500 font-medium tracking-wide">Syncing latest AIF opportunities...</p>
        </div>
      ) : visibleProducts.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {visibleProducts.map((product, index) => (
            <motion.div
              key={index}
              layout
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-white rounded-3xl shadow-md border border-gray-100 hover:border-[#1CADA3] transition-all p-6 flex flex-col h-full group w-full relative"
            >
              {/* Bookmark – top-right corner of card */}
              <button
                onClick={e => { e.stopPropagation(); toggleWishlist(product); }}
                className={`absolute top-4 right-4 p-1.5 rounded-lg bg-white border border-gray-100 shadow-sm transition-colors z-10 ${wishlistLoading.has(product.name) ? "opacity-50 cursor-wait" : "hover:text-[#1CADA3] text-gray-400"
                  }`}
                disabled={wishlistLoading.has(product.name)}
              >
                {wishlistLoading.has(product.name) ? (
                  <Loader2 size={16} className="animate-spin text-[#1CADA3]" />
                ) : wishlistMap[product.name] ? (
                  <BookmarkCheck size={16} className="text-[#1CADA3]" fill="#1CADA3" />
                ) : (
                  <Bookmark size={16} />
                )}
              </button>
              {/* Icon + Risk */}
              <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-teal-50 to-emerald-50 flex items-center justify-center mb-4 mx-auto group-hover:scale-105 transition-transform relative shrink-0">
                <Layers className="w-8 h-8" style={{ color: product.color }} />
                <div className="absolute -top-2 -right-2 px-2 py-0.5 rounded bg-white border border-gray-100 shadow-sm text-[8px] font-black text-gray-500 uppercase tracking-widest">
                  {product.risk.replace(" Risk", "")}
                </div>
              </div>
              {/* Name */}
              <h3 className="text-base font-black text-center text-gray-900 line-clamp-2 mb-1 leading-tight">
                {product.name}
              </h3>
              {/* Category + Theme badges */}
              <div className="flex justify-center flex-wrap gap-1.5 mb-3">
                <span className="text-[9px] font-black text-[#1CADA3] bg-teal-50 px-2 py-0.5 rounded uppercase tracking-widest">
                  {product.category}
                </span>
                <span className="text-[9px] font-black text-[#2076C7] bg-blue-50 px-2 py-0.5 rounded uppercase tracking-widest">
                  {product.theme}
                </span>
              </div>
              {/* Manager */}
              <p className="text-[11px] text-gray-500 text-center mb-3 line-clamp-1">
                <span className="font-semibold text-gray-600">Manager: </span>{product.manager}
              </p>
              {/* Description */}
              <p className="text-xs text-gray-500 text-center italic line-clamp-2 mb-4">{product.desc}</p>
              {/* Key Stats — vertical list */}
              <div className="space-y-1.5 mb-4">
                <div className="flex items-center justify-between px-3 py-2 bg-teal-50 rounded-xl">
                  <span className="text-[9px] font-bold text-gray-400 uppercase tracking-widest shrink-0">Target IRR</span>
                  <span className="text-[11px] font-black text-[#1CADA3] text-right ml-2 leading-tight">{product.returns}</span>
                </div>
                <div className="flex items-center justify-between px-3 py-2 bg-blue-50 rounded-xl">
                  <span className="text-[9px] font-bold text-gray-400 uppercase tracking-widest shrink-0">Tenure</span>
                  <span className="text-[11px] font-black text-[#2076C7] text-right ml-2 leading-tight">{product.horizon}</span>
                </div>
                <div className="flex items-center justify-between px-3 py-2 bg-gray-50 rounded-xl">
                  <span className="text-[9px] font-bold text-gray-400 uppercase tracking-widest shrink-0">Min. Invest</span>
                  <span className="text-[11px] font-black text-gray-700 text-right ml-2 leading-tight">{product.minInvestment}</span>
                </div>
              </div>
              {/* Actions */}
              <div className="flex flex-col items-center gap-2 mt-auto pt-4 border-t border-gray-50">
                <button
                  onClick={e => { e.stopPropagation(); setSelectedProduct(product); }}
                  className="w-40 py-2.5 rounded-xl font-black text-[10px] uppercase tracking-widest transition-all shadow-sm active:scale-95 flex items-center justify-center gap-2 bg-gradient-to-r from-[#1CADA3] to-[#2076C7] text-white hover:opacity-90 cursor-pointer"
                >
                  <FileText size={16} /> Details
                </button>
                <button
                  onClick={e => { e.stopPropagation(); handleScheduleClick(product); }}
                  className="w-40 py-2.5 rounded-xl font-black text-[10px] uppercase tracking-widest transition-all shadow-sm active:scale-95 flex items-center justify-center gap-2 bg-white text-[#1CADA3] border-2 border-[#1CADA3]/10 hover:border-[#1CADA3]/30 hover:bg-teal-50/50 cursor-pointer"
                >
                  <Calendar size={16} /> Schedule Meeting
                </button>
              </div>
            </motion.div>
          ))}
        </div>
      ) : (
        <div className="flex flex-col items-center justify-center py-20 bg-white/50 rounded-3xl border border-dashed border-gray-200">
          <Search className="w-12 h-12 text-gray-300 mb-4" />
          <p className="text-gray-500 font-medium tracking-wide text-center px-6">
            No AIF funds found matching your criteria.
          </p>
          <button
            onClick={() => { setSearchQuery(""); setActiveCategory("All"); }}
            className="mt-6 px-6 py-2 bg-gray-100 text-gray-700 rounded-xl font-bold hover:bg-gray-200 transition-all text-sm"
          >
            Clear all filters
          </button>
        </div>
      )}
      {/* View More / View Less */}
      {!isLoading && filteredProducts.length > 4 && (
        <div className="flex justify-center pt-2">
          <button
            onClick={() => setShowAllFunds(prev => !prev)}
            className="px-8 py-3 rounded-xl font-black text-xs uppercase tracking-widest bg-gradient-to-r from-[#1CADA3] to-[#2076C7] text-white shadow-md hover:opacity-90 active:scale-95 transition-all flex items-center gap-2"
          >
            {showAllFunds
              ? "View Less Funds"
              : `View More Funds (${filteredProducts.length - 4} more)`}
            <ArrowRight
              size={16}
              className={`transition-transform ${showAllFunds ? "rotate-[270deg]" : "rotate-90"}`}
            />
          </button>
        </div>
      )}
      {/* --- CART SIDEBAR --- */}
      <AnimatePresence>
        {isCartOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsCartOpen(false)}
              className="fixed inset-0 bg-black/60 backdrop-blur-sm z-[2001]"
            />
            <motion.div
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ type: "spring", damping: 30, stiffness: 300 }}
              className="fixed right-0 top-0 h-full w-full max-w-md bg-white z-[2002] shadow-2xl flex flex-col"
            >
              <div className="p-6 border-b flex items-center justify-between bg-white sticky top-0 z-10">
                <h2 className="text-xl font-black text-gray-900 flex items-center gap-2">
                  <ShoppingCart className="text-[#1CADA3]" /> AIF Investment Cart
                </h2>
                <button
                  onClick={() => setIsCartOpen(false)}
                  className="p-2 hover:bg-gray-100 rounded-full transition-colors text-gray-500"
                >
                  <X />
                </button>
              </div>
              <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-gray-50/50 custom-scrollbar">
                {cart.length === 0 ? (
                  <div className="h-full flex flex-col items-center justify-center text-gray-400">
                    <ShoppingCart size={64} className="mb-4 opacity-10" />
                    <p className="font-bold">Your cart is empty</p>
                  </div>
                ) : (
                  cart.map(item => (
                    <div
                      key={item.id}
                      className="bg-white p-4 rounded-2xl border border-gray-100 shadow-sm space-y-4"
                    >
                      <div className="flex justify-between items-start gap-4">
                        <p className="text-sm font-black text-gray-800 leading-tight">{item.name}</p>
                        <button
                          onClick={() => removeFromCart(item.id)}
                          className="text-gray-300 hover:text-red-500 transition-colors"
                        >
                          <Trash2 size={18} />
                        </button>
                      </div>
                      <div className="space-y-2">
                        <span className="text-[10px] font-black text-gray-400 uppercase tracking-widest">
                          Commitment Amount (Min ₹1Cr)
                        </span>
                        <div className="flex items-center gap-2 bg-gray-50 px-3 py-2 rounded-lg border border-gray-100 focus-within:border-[#1CADA3] transition-all">
                          <span className="text-xs font-bold text-gray-400">₹</span>
                          <input
                            type="number"
                            min={MIN_INVESTMENT_AIF}
                            value={item.amount}
                            onChange={e => updateCartAmount(item.id, Number(e.target.value))}
                            className="w-full bg-transparent outline-none font-black text-sm text-right"
                          />
                        </div>
                        {item.amount < MIN_INVESTMENT_AIF && (
                          <p className="text-[9px] text-red-500 font-bold mt-1">
                            Min. commitment is ₹1,00,00,000
                          </p>
                        )}
                      </div>
                    </div>
                  ))
                )}
              </div>
              {cart.length > 0 && (
                <div className="p-6 border-t bg-white space-y-4 shadow-[0_-10px_20px_-5px_rgba(0,0,0,0.05)]">
                  <div className="flex justify-between items-center">
                    <span className="font-bold text-gray-500">Total Commitment</span>
                    <span className="text-2xl font-black text-[#1CADA3]">
                      ₹{formatINR(cart.reduce((sum, i) => sum + i.amount, 0))}
                    </span>
                  </div>
                  <button
                    disabled={cart.some(i => i.amount < MIN_INVESTMENT_AIF)}
                    className="w-full py-4 bg-gradient-to-r from-[#1CADA3] to-[#2076C7] text-white rounded-2xl font-black uppercase tracking-widest flex items-center justify-center gap-2 hover:opacity-95 transition-all disabled:opacity-50"
                  >
                    Request Information <ArrowRight size={18} />
                  </button>
                  <p className="text-[10px] text-center text-gray-400 font-medium italic">
                    Our specialist will contact you with specific fund documents.
                  </p>
                </div>
              )}
            </motion.div>
          </>
        )}
      </AnimatePresence>
      {/* --- DETAIL MODAL (kept for programmatic use) --- */}
      <AnimatePresence>
        {selectedProduct && (
          <div
            className="fixed inset-0 bg-black/80 backdrop-blur-sm flex items-center justify-center z-[2000] p-4"
            onClick={e => e.target === e.currentTarget && setSelectedProduct(null)}
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              className="bg-white w-full max-w-5xl max-h-[90vh] rounded-[2.5rem] shadow-2xl overflow-hidden flex flex-col border border-white"
            >
              <div className="bg-white border-b border-gray-100 p-8 flex items-start justify-between">
                <div className="flex items-center gap-6">
                  <div
                    className="w-20 h-20 rounded-[1.5rem] flex items-center justify-center shadow-lg"
                    style={{ backgroundColor: selectedProduct.color + "15" }}
                  >
                    <Layers className="w-10 h-10" style={{ color: selectedProduct.color }} />
                  </div>
                  <div>
                    <span className="text-[10px] font-black text-[#1CADA3] bg-teal-50 px-2 py-0.5 rounded tracking-widest uppercase mb-1 inline-block">
                      Fund Overview
                    </span>
                    <h2 className="text-3xl font-black text-gray-900 leading-tight">
                      {selectedProduct.name}
                    </h2>
                    <div className="flex items-center gap-4 mt-2">
                      <span className="text-xs font-bold text-emerald-600 flex items-center gap-1.5">
                        <TrendingUp size={14} /> Target IRR: {selectedProduct.returns}
                      </span>
                      <div className="w-1 h-1 bg-gray-300 rounded-full" />
                      <span className="text-xs font-bold text-gray-500 uppercase flex items-center gap-1.5">
                        <Briefcase size={14} /> {selectedProduct.category}
                      </span>
                    </div>
                  </div>
                </div>
                <button
                  onClick={() => setSelectedProduct(null)}
                  className="p-3 bg-gray-50 rounded-2xl hover:bg-gray-100 transition-colors text-gray-400"
                >
                  <X size={24} />
                </button>
              </div>
              <div className="flex-1 overflow-y-auto p-8 custom-scrollbar">
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
                  <div className="lg:col-span-2 space-y-8">
                    {/* Investment Strategy */}
                    <section>
                      <h4 className="text-xs font-black text-gray-400 uppercase tracking-widest mb-4">Investment Strategy</h4>
                      <div className="bg-[#F8FAFC] p-6 rounded-3xl border border-gray-100 leading-relaxed text-gray-700 text-sm">
                        {selectedProduct.strategyDetails || selectedProduct.desc}
                      </div>
                    </section>
                    {/* Manager Info */}
                    {selectedProduct.managerDescription && (
                      <section>
                        <h4 className="text-xs font-black text-gray-400 uppercase tracking-widest mb-4">About the Manager</h4>
                        <div className="bg-blue-50/50 p-6 rounded-3xl border border-blue-100 text-sm text-gray-700 leading-relaxed">
                          <p className="font-bold text-[#2076C7] mb-2">{selectedProduct.manager}</p>
                          {selectedProduct.managerDescription}
                        </div>
                      </section>
                    )}
                    {/* Core Focus Areas */}
                    {(selectedProduct.coreFocusAreas || []).length > 0 && (
                      <section>
                        <h4 className="text-xs font-black text-gray-400 uppercase tracking-widest mb-4">Core Focus Areas</h4>
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                          {selectedProduct.coreFocusAreas?.map((area, i) => (
                            <div key={i} className="flex items-center gap-3 p-3 bg-teal-50 rounded-2xl border border-teal-100">
                              <div className="w-6 h-6 rounded-full bg-[#1CADA3] flex items-center justify-center shrink-0">
                                <span className="text-white text-[9px] font-black">{i + 1}</span>
                              </div>
                              <span className="text-xs font-semibold text-gray-700">{area}</span>
                            </div>
                          ))}
                        </div>
                      </section>
                    )}
                    {/* Key Parameters */}
                    <section>
                      <h4 className="text-xs font-black text-gray-400 uppercase tracking-widest mb-4">Key Parameters</h4>
                      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                        {[
                          { label: "Tenure", value: selectedProduct.horizon },
                          { label: "Min Commitment", value: selectedProduct.minInvestment },
                          { label: "Theme", value: selectedProduct.theme },
                          { label: "Structure", value: selectedProduct.portfolioSize || "Closed-Ended" },
                        ].map((item, i) => (
                          <div key={i} className="p-4 bg-gray-50 rounded-2xl text-center">
                            <p className="text-[9px] font-bold text-gray-400 uppercase mb-1">{item.label}</p>
                            <p className="text-xs font-black text-gray-900">{item.value}</p>
                          </div>
                        ))}
                      </div>
                    </section>
                    {/* Sector Allocation */}
                    {(selectedProduct.marketCap || []).length > 0 && (
                      <section>
                        <h4 className="text-xs font-black text-gray-400 uppercase tracking-widest mb-4">
                          {selectedProduct.sectorAllocationTitle || "Sector Allocation"}
                        </h4>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-4">
                          {selectedProduct.marketCap?.map((cap, i) => (
                            <div key={i} className="space-y-1.5">
                              <div className="flex justify-between items-center text-xs">
                                <span className="font-bold text-gray-600 uppercase tracking-tight">{cap.label}</span>
                                <span className="font-black text-[#1CADA3]">{cap.value}%</span>
                              </div>
                              <div className="h-1.5 w-full bg-gray-100 rounded-full overflow-hidden">
                                <div
                                  className="h-full bg-gradient-to-r from-[#1CADA3] to-[#2076C7] rounded-full"
                                  style={{ width: `${cap.value}%` }}
                                />
                              </div>
                            </div>
                          ))}
                        </div>
                      </section>
                    )}
                    {/* Stage / Secondary Allocation */}
                    {(selectedProduct.sectorAllocation || []).length > 0 && (
                      <section>
                        <h4 className="text-xs font-black text-gray-400 uppercase tracking-widest mb-4">
                          {selectedProduct.stageAllocationTitle || "Stage Allocation"}
                        </h4>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-4">
                          {selectedProduct.sectorAllocation?.map((sector, i) => (
                            <div key={i} className="space-y-1.5">
                              <div className="flex justify-between items-center text-xs">
                                <span className="font-bold text-gray-600 uppercase tracking-tight">{sector.name}</span>
                                <span className="font-black text-[#2076C7]">{sector.value}%</span>
                              </div>
                              <div className="h-1.5 w-full bg-gray-100 rounded-full overflow-hidden">
                                <div
                                  className="h-full bg-gradient-to-r from-[#2076C7] to-[#1CADA3] rounded-full"
                                  style={{ width: `${sector.value}%` }}
                                />
                              </div>
                            </div>
                          ))}
                        </div>
                      </section>
                    )}
                  </div>
                  <div className="space-y-6">
                    <div className="bg-gradient-to-br from-[#1CADA3] to-[#2076C7] p-8 rounded-[2.5rem] text-white shadow-xl relative overflow-hidden h-fit">
                      <div className="absolute top-0 right-0 w-32 h-32 bg-white blur-[80px] opacity-20" />
                      <h3 className="text-lg font-bold mb-6 flex items-center gap-2 relative z-10">
                        Investor Information
                      </h3>
                      <div className="space-y-5 relative z-10">
                        <div className="flex flex-col gap-1 border-b border-white/20 pb-4">
                          <span className="text-[10px] font-bold text-white/70 uppercase tracking-widest">Target IRR</span>
                          <span className="text-2xl font-black text-white">{selectedProduct.returns}</span>
                        </div>
                        <div className="flex flex-col gap-1 border-b border-white/20 pb-4">
                          <span className="text-[10px] font-bold text-white/70 uppercase tracking-widest">Min Investment</span>
                          <span className="text-xl font-black text-white">{selectedProduct.minInvestment}</span>
                        </div>
                        <div className="flex flex-col gap-1 border-b border-white/20 pb-4">
                          <span className="text-[10px] font-bold text-white/70 uppercase tracking-widest">Tenure</span>
                          <span className="text-base font-black text-white">{selectedProduct.horizon}</span>
                        </div>
                        <div className="flex flex-col gap-1">
                          <span className="text-[10px] font-bold text-white/70 uppercase tracking-widest">Management Fee</span>
                          <span className="text-sm font-bold text-white/90">As per PPM Disclosure</span>
                        </div>
                      </div>
                      <p className="text-[9px] text-white/60 mt-8 italic leading-relaxed text-center">
                        *AIFs are subject to high investment risks. Past performance does not guarantee future results.
                      </p>
                    </div>
                    <div className="space-y-3">
                      <button
                        onClick={() => handleScheduleClick(selectedProduct)}
                        className="w-full py-5 bg-gradient-to-r from-[#1CADA3] to-[#2076C7] text-white rounded-[1.5rem] font-black uppercase tracking-widest text-xs flex items-center justify-center gap-3 shadow-lg hover:shadow-xl hover:translate-y-[-2px] transition-all"
                      >
                        <Calendar size={18} /> Schedule Meeting
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
      {/* --- PREMIUM SCHEDULE MEETING MODAL --- */}
      <AnimatePresence>
        {isScheduleModalOpen && schedulingProduct && (
          <div
            className="fixed inset-0 bg-black/80 backdrop-blur-md flex items-center justify-center z-[3000] p-4 sm:p-6"
            onClick={e => e.target === e.currentTarget && setIsScheduleModalOpen(false)}
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              className="bg-white w-full max-w-4xl rounded-[3rem] shadow-2xl overflow-hidden flex flex-col md:flex-row border border-white"
            >
              {/* Left Side: Form Selection */}
              <div className="flex-1 p-8 sm:p-10 space-y-8 max-h-[90vh] overflow-y-auto no-scrollbar">
                <div className="flex justify-between items-center mb-2">
                  <div>
                    <h3 className="text-2xl font-black text-gray-900 leading-tight">Schedule Meeting</h3>
                    <p className="text-[#1CADA3] text-[10px] font-black uppercase tracking-widest mt-1">Select your preferred slot</p>
                  </div>
                  <button
                    onClick={() => setIsScheduleModalOpen(false)}
                    className="md:hidden p-2 bg-gray-100 hover:bg-gray-200 rounded-xl transition-colors text-gray-400"
                  >
                    <X size={20} />
                  </button>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  {/* Date Selection */}
                  <div className="space-y-2">
                    <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest ml-1 flex items-center gap-2">
                      <Calendar size={14} className="text-[#1CADA3]" /> Select Date
                    </label>
                    <div className="relative group">
                      <input
                        type="date"
                        value={meetingDate}
                        onChange={e => setMeetingDate(e.target.value)}
                        className="w-full px-5 py-4 rounded-2xl bg-gray-50 border-2 border-transparent group-hover:bg-white group-hover:border-[#1CADA3]/20 focus:bg-white focus:border-[#1CADA3] focus:ring-4 focus:ring-[#1CADA3]/10 outline-none transition-all font-bold text-gray-700 text-sm"
                      />
                    </div>
                  </div>
                  {/* Time Selection */}
                  <div className="space-y-2">
                    <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest ml-1 flex items-center gap-2">
                      <Clock size={14} className="text-[#1CADA3]" /> Select Time
                    </label>
                    <div className="relative group">
                      <input
                        type="time"
                        value={meetingTime}
                        onChange={e => setMeetingTime(e.target.value)}
                        className="w-full px-5 py-4 rounded-2xl bg-gray-50 border-2 border-transparent group-hover:bg-white group-hover:border-[#1CADA3]/20 focus:bg-white focus:border-[#1CADA3] focus:ring-4 focus:ring-[#1CADA3]/10 outline-none transition-all font-bold text-gray-700 text-sm"
                      />
                    </div>
                  </div>
                </div>
                {/* Google Meet Link */}
                <div className="space-y-2">
                  <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest ml-1 flex items-center gap-2">
                    <Video size={14} className="text-[#1CADA3]" /> Google Meet Link
                  </label>
                  <div className="relative group">
                    <input
                      type="text"
                      value={meetLink}
                      readOnly
                      className="w-full px-5 py-4 rounded-2xl bg-gray-100 border-2 border-transparent outline-none transition-all font-bold text-gray-500 text-sm cursor-not-allowed"
                    />
                  </div>
                </div>
                {/* WhatsApp Number & Notifications */}
                <div className="bg-gray-50/50 rounded-[2rem] p-6 border border-gray-100 space-y-6">
                  <div className="space-y-2">
                    <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest ml-1 flex items-center gap-2">
                      <MessageSquare size={14} className="text-[#1CADA3]" /> Confirm WhatsApp Number
                    </label>
                    <input
                      type="text"
                      placeholder="+91 98765 43210"
                      value={whatsappNumber}
                      onChange={e => setWhatsappNumber(e.target.value)}
                      className="w-full px-5 py-4 rounded-2xl bg-white border border-gray-200 focus:border-[#1CADA3] focus:ring-2 focus:ring-[#1CADA3]/10 outline-none transition-all font-bold text-gray-700"
                    />
                  </div>
                  <div className="flex flex-col sm:flex-row gap-4 pt-2">
                    <button
                      onClick={() => setNotifyWhatsApp(!notifyWhatsApp)}
                      className={`flex-1 flex items-center justify-center gap-3 px-4 py-3.5 rounded-xl border-2 transition-all ${notifyWhatsApp
                        ? "bg-emerald-50 border-emerald-500 text-emerald-700"
                        : "bg-white border-gray-100 text-gray-400 hover:border-gray-200"
                        }`}
                    >
                      <div className={`w-5 h-5 rounded-full flex items-center justify-center border-2 transition-all ${notifyWhatsApp ? "bg-emerald-500 border-emerald-500 text-white" : "border-gray-200"}`}>
                        {notifyWhatsApp && <Check size={12} />}
                      </div>
                      <span className="text-xs font-black uppercase tracking-wider">WhatsApp</span>
                    </button>
                    <button
                      onClick={() => setNotifyEmail(!notifyEmail)}
                      className={`flex-1 flex items-center justify-center gap-3 px-4 py-3.5 rounded-xl border-2 transition-all ${notifyEmail
                        ? "bg-blue-50 border-blue-500 text-blue-700"
                        : "bg-white border-gray-100 text-gray-400 hover:border-gray-200"
                        }`}
                    >
                      <div className={`w-5 h-5 rounded-full flex items-center justify-center border-2 transition-all ${notifyEmail ? "bg-blue-500 border-blue-500 text-white" : "border-gray-200"}`}>
                        {notifyEmail && <Check size={12} />}
                      </div>
                      <span className="text-xs font-black uppercase tracking-wider">Email</span>
                    </button>
                  </div>
                </div>
                <div className="flex gap-4">
                  <button
                    onClick={handleConfirmSchedule}
                    className="flex-1 py-5 bg-gradient-to-r from-[#1CADA3] to-[#2076C7] text-white rounded-2xl font-black uppercase tracking-widest text-xs flex items-center justify-center gap-3 shadow-xl shadow-teal-200/50 hover:shadow-2xl hover:translate-y-[-2px] transition-all"
                  >
                    Confirm Schedule <ArrowUpRight size={18} />
                  </button>
                </div>
              </div>
              {/* Right Side: Preview Ticket */}
              <div className="hidden md:flex w-80 lg:w-96 bg-gradient-to-br from-[#1CADA3] to-[#2076C7] p-10 flex-col justify-between relative overflow-hidden text-white">
                <div className="absolute top-0 right-0 w-64 h-64 bg-white blur-[100px] opacity-10 -mr-32 -mt-32" />
                <div className="absolute bottom-0 left-0 w-64 h-64 bg-teal-300 blur-[100px] opacity-20 -ml-32 -mb-32" />
                <div className="relative z-10 flex justify-between items-start">
                  <div className="w-16 h-16 rounded-[2rem] bg-white/10 backdrop-blur-md flex items-center justify-center shadow-lg border border-white/20">
                    <Layers size={32} />
                  </div>
                  <button
                    onClick={() => setIsScheduleModalOpen(false)}
                    className="p-3 bg-white/10 hover:bg-white/20 rounded-2xl transition-colors text-white"
                  >
                    <X size={24} />
                  </button>
                </div>
                <div className="relative z-10 space-y-12 py-12">
                  <div className="space-y-2">
                    <p className="text-[10px] font-black text-white/60 uppercase tracking-[0.2em]">Fund Title</p>
                    <h4 className="text-2xl font-black leading-tight">{schedulingProduct.name}</h4>
                  </div>
                  <div className="space-y-8">
                    <div className="flex items-center gap-4">
                      <div className="w-10 h-10 rounded-xl bg-white/10 flex items-center justify-center shadow-sm">
                        <Calendar className="text-white/80" size={20} />
                      </div>
                      <div>
                        <p className="text-[10px] font-black text-white/50 uppercase tracking-widest mb-0.5">Scheduled Date</p>
                        <p className="font-bold text-sm tracking-wide">{meetingDate ? new Date(meetingDate).toLocaleDateString('en-IN', { day: 'numeric', month: 'long', year: 'numeric' }) : "--"}</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-4">
                      <div className="w-10 h-10 rounded-xl bg-white/10 flex items-center justify-center shadow-sm">
                        <Clock className="text-white/80" size={20} />
                      </div>
                      <div>
                        <p className="text-[10px] font-black text-white/50 uppercase tracking-widest mb-0.5">Scheduled Time</p>
                        <p className="font-bold text-sm tracking-wide">{meetingTime || "--"}</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-4">
                      <div className="w-10 h-10 rounded-xl bg-white/10 flex items-center justify-center shadow-sm">
                        <Video className="text-white/80" size={20} />
                      </div>
                      <div>
                        <p className="text-[10px] font-black text-white/50 uppercase tracking-widest mb-0.5">Meet Platform</p>
                        <p className="font-bold text-sm tracking-wide">Google Meet</p>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="relative z-10 pt-10 border-t border-white/10">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full border-2 border-white/20 p-1">
                      <img src="https://ui-avatars.com/api/?name=Admin&background=white&color=1CADA3" className="w-full h-full rounded-full border border-white/20" alt="Icon" />
                    </div>
                    <div>
                      <p className="text-[10px] font-black text-white/60 uppercase tracking-widest">Organizer</p>
                      <p className="text-xs font-bold">AIF Specialist</p>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}