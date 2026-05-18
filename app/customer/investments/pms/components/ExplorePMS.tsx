"use client";;
import { useState, useEffect, useMemo, useCallback } from "react";
import {
  X,
  Briefcase,
  TrendingUp,
  ShoppingCart,
  Gem,
  Bookmark,
  BookmarkCheck,
  Calendar,
  FileText,
  Clock,
  Video,
  Info,
  MessageSquare,
  ArrowUpRight,
  Check,
  Layers,
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

// Tracks backend wishlist item for PMS products
interface WishlistEntry {
  backendId: number;       // The `id` from the backend wishlist table
  productName: string;     // The product_name stored in backend
}

export interface PMSProduct {
  id: number | string;
  name: string;
  desc: string;
  link: string;
  risk: string;
  horizon: string;
  color: string;
  category: string;
  returns: string;
  minInvestment: string;
  strategyDetails?: string;
  holdings?: { name: string; weight: string }[];
  benchmark?: string;
  inceptionDate?: string;
  investmentStyle?: string;
  portfolioSize?: string;
  performance?: { period: string; strategy: number; benchmark: number }[];
  marketCap?: { label: string; value: number }[];
  sectorAllocation?: { name: string; value: number }[];
  strategyType?: string;
  bestSuitedFor?: string;
}

const MIN_INVESTMENT = 5000000;


export default function ExplorePMS() {
  const [searchQuery, setSearchQuery] = useState("");
  const [cart, setCart] = useState<CartItem[]>([]);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState<PMSProduct | null>(null);
  const [activeCategory, setActiveCategory] = useState("All");
  // Backend-synced wishlist: maps PMS product name -> backend wishlist entry ID
  const [wishlistMap, setWishlistMap] = useState<Record<string, number>>({});
  const [wishlistLoading, setWishlistLoading] = useState<Set<string>>(new Set());

  const [isScheduleModalOpen, setIsScheduleModalOpen] = useState(false);
  const [schedulingProduct, setSchedulingProduct] = useState<PMSProduct | null>(null);
  const [meetingDate, setMeetingDate] = useState("");
  const [meetingTime, setMeetingTime] = useState("");
  const [meetLink, setMeetLink] = useState("https://meet.google.com/oio-bdwb-cxy");
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Notification States
  const [notifyWhatsApp, setNotifyWhatsApp] = useState(true);
  const [notifyEmail, setNotifyEmail] = useState(true);
  const [whatsappNumber, setWhatsappNumber] = useState("");
  const [userId, setUserId] = useState<number | null>(null);

  const [dynamicProducts, setDynamicProducts] = useState<PMSProduct[]>([]);
  const [loadingProducts, setLoadingProducts] = useState(true);

  useEffect(() => {
    const fetchFunds = async () => {
      try {
        const funds = await customerService.getPMSFundsList();

        const colors = ["#2076C7", "#1CADA3", "#8B5CF6", "#f59e0b", "#10b981", "#ef4444"];

        const mappedProducts: PMSProduct[] = funds.map((f: any, idx: number) => {
          return {
            id: f.id,
            name: f.fund_name || "Unknown Strategy",
            desc: f.description || "No description available.",
            link: `/products/pms/${f.id}`,
            risk: f.risk_level || "Moderate",
            horizon: "3-5 Years",
            color: colors[idx % colors.length],
            category: f.category || "Multi-Cap",
            returns: f.return_3y ? `${(f.return_3y * 100).toFixed(1)}%` : f.return_1y ? `${(f.return_1y * 100).toFixed(1)}%` : "N/A",
            minInvestment: f.min_investment ? `₹${f.min_investment}` : "₹50L",
            strategyDetails: f.description,
            benchmark: f.benchmark,
            inceptionDate: f.inception_date ? new Date(f.inception_date).toLocaleDateString() : undefined,
            investmentStyle: f.portfolio_style,
            portfolioSize: f.aum ? `₹${f.aum}` : "N/A",
            strategyType: f.strategy_type,
            bestSuitedFor: f.notes,
            sectorAllocation: f.sector_exposure ? Object.entries(f.sector_exposure).map(([k, v]) => ({ name: k, value: Number(v) })) : undefined,
            marketCap: f.market_allocation ? Object.entries(f.market_allocation).map(([k, v]) => ({ label: k + ' Cap', value: Number(v) })) : undefined,
            holdings: f.top_holdings ? f.top_holdings.split(',').map((h: string) => ({ name: h.trim(), weight: 'N/A' })) : undefined
          };
        });
        setDynamicProducts(mappedProducts);
      } catch (err) {
        toast.error("Failed to load PMS funds");
      } finally {
        setLoadingProducts(false);
      }
    };
    fetchFunds();
  }, []);

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
  }, []);

  const handleScheduleClick = async (product: PMSProduct) => {
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
    if (!meetingDate || !meetingTime) {
      toast.error("Please select both date and time");
      return;
    }
    setIsSubmitting(true);
    try {
      // Use customerService to schedule meeting
      const response = await customerService.schedulePMSMeeting({
        pms_fund_id: schedulingProduct?.name.toLowerCase().replace(/ /g, "-"),
        pms_fund_name: schedulingProduct?.name,
        meeting_time: `${meetingDate}T${meetingTime}:00`,
        user_details: {
          whatsapp: whatsappNumber,
          notifyWhatsApp,
          notifyEmail,
          meetLink
        }
      }, userId || undefined);

      if (response.message === "Meeting scheduled successfully") {
        toast.success("Meeting scheduled successfully!");

        // Reset states
        setIsScheduleModalOpen(false);
        setMeetingDate("");
        setMeetingTime("");
        setSchedulingProduct(null);
      }
    } catch (error: any) {
      toast.error(error.response?.data?.error || "Failed to schedule meeting. Please try again.");
    } finally {
      setIsSubmitting(false);
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
          if (item.product_type === "pms") {
            map[item.product_name] = item.id;
          }
        });
        setWishlistMap(map);
      }
    } catch (error) {
      toast.error("Failed to load wishlist");
    }
  }, []);

  useEffect(() => {
    const savedCart = localStorage.getItem("pms_cart");
    if (savedCart) setCart(JSON.parse(savedCart));
    loadWishlist();
  }, [loadWishlist]);

  useEffect(() => {
    localStorage.setItem("pms_cart", JSON.stringify(cart));
  }, [cart]);

  // Filtering
  const filteredProducts = useMemo(() => {
    return dynamicProducts.filter(p => {
      const matchesSearch =
        p.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        p.desc.toLowerCase().includes(searchQuery.toLowerCase());
      const matchesCategory = activeCategory === "All" || p.category === activeCategory;
      return matchesSearch && matchesCategory;
    });
  }, [searchQuery, activeCategory, dynamicProducts]);

  // Cart Actions
  const handleAddToCart = (product: PMSProduct) => {
    if (cart.find(item => item.id === product.name)) {
      setIsCartOpen(true);
      return;
    }
    const newItem: CartItem = { id: product.name, name: product.name, amount: MIN_INVESTMENT };
    setCart([...cart, newItem]);
    setIsCartOpen(true);
  };



  const toggleWishlist = async (product: PMSProduct) => {
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
          product_type: "pms",
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

  const visibleProducts = filteredProducts;

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
            <div className="w-12 h-12 rounded-xl bg-gradient-to-r from-[#2076C7] to-[#1CADA3] flex items-center justify-center text-white font-bold text-xl shadow-lg shrink-0">
              <Gem size={24} />
            </div>
            <div>
              <div className="flex items-center gap-3 mb-1">
                <h2 className="text-xl sm:text-2xl font-bold text-slate-800">
                  Explore Strategies
                </h2>
                <span className="px-2.5 py-1 bg-blue-100 text-[#2076C7] text-[10px] font-bold rounded-full border border-blue-200 whitespace-nowrap">
                  Active
                </span>
              </div>
              <p className="text-sm text-slate-500 flex items-center gap-2">
                <span className="text-[#2076C7] flex items-center justify-center w-5 h-5 rounded-full bg-blue-50/50">
                  <Info size={14} />
                </span>
                Explore premium wealth management strategies
              </p>
            </div>
          </div>
        </div>
      </motion.div>



      {/* Products Grid */}
      {loadingProducts ? (
        <div className="flex justify-center py-20">
          <Loader2 size={48} className="animate-spin text-[#2076C7]" />
        </div>
      ) : visibleProducts.length === 0 ? (
        <div className="text-center py-20 text-gray-500">
          No strategies found matching your criteria.
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {visibleProducts.map((product, index) => (
            <motion.div
              key={index}
              layout
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-white rounded-3xl shadow-md border border-gray-100 hover:border-[#2076C7] transition-all p-6 flex flex-col h-full group w-full relative"
            >
              {/* Bookmark */}
              <button
                onClick={e => { e.stopPropagation(); toggleWishlist(product); }}
                className={`absolute top-4 right-4 p-1.5 rounded-lg bg-white border border-gray-100 shadow-sm transition-colors z-10 ${wishlistLoading.has(product.name) ? "opacity-50 cursor-wait" : "hover:text-[#2076C7] text-gray-400"
                  }`}
                disabled={wishlistLoading.has(product.name)}
              >
                {wishlistLoading.has(product.name) ? (
                  <Loader2 size={16} className="animate-spin text-[#2076C7]" />
                ) : wishlistMap[product.name] ? (
                  <BookmarkCheck size={16} className="text-[#2076C7]" fill="#2076C7" />
                ) : (
                  <Bookmark size={16} />
                )}
              </button>

              {/* Icon */}
              <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-blue-50 to-indigo-50 flex items-center justify-center mb-4 mx-auto group-hover:scale-105 transition-transform relative shrink-0">
                <Gem className="w-8 h-8" style={{ color: product.color }} />
                <div className="absolute -top-2 -right-2 px-2 py-0.5 rounded bg-white border border-gray-100 shadow-sm text-[8px] font-black text-gray-500 uppercase tracking-widest">
                  {product.risk.replace(" Risk", "")}
                </div>
              </div>

              {/* Name */}
              <h3 className="text-base font-black text-center text-gray-900 line-clamp-2 mb-1 leading-tight min-h-[40px]">
                {product.name}
              </h3>

              {/* Category badge */}
              <div className="flex justify-center mb-3">
                <span className="text-[9px] font-black text-[#2076C7] bg-blue-50 px-2 py-0.5 rounded uppercase tracking-widest">
                  {product.category}
                </span>
              </div>

              {/* Key Stats */}
              <div className="space-y-1.5 mb-4">
                <div className="flex items-center justify-between px-3 py-2 bg-blue-50 rounded-xl">
                  <span className="text-[9px] font-bold text-gray-400 uppercase tracking-widest shrink-0">Returns</span>
                  <span className="text-[11px] font-black text-[#2076C7] text-right ml-2 leading-tight">{product.returns}</span>
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
                  className="w-full py-2.5 rounded-xl font-black text-[10px] uppercase tracking-widest transition-all shadow-sm active:scale-95 flex items-center justify-center gap-2 bg-gradient-to-r from-[#2076C7] to-[#1CADA3] text-white hover:opacity-90 cursor-pointer"
                >
                  <FileText size={16} /> Details
                </button>
                <button
                  onClick={e => { e.stopPropagation(); handleScheduleClick(product); }}
                  className="w-full py-2.5 rounded-xl font-black text-[10px] uppercase tracking-widest transition-all shadow-sm active:scale-95 flex items-center justify-center gap-2 bg-white text-[#2076C7] border-2 border-[#2076C7]/10 hover:border-[#2076C7]/30 hover:bg-blue-50/50 cursor-pointer"
                >
                  <Calendar size={16} /> Schedule Meeting
                </button>
              </div>
            </motion.div>
          ))}
        </div>
      )}

      {/* --- CART SIDEBAR (Optional, keeping for compatibility if logic exists elsewhere) --- */}
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
                  <ShoppingCart className="text-[#2076C7]" /> Investment Cart
                </h2>
                <button
                  onClick={() => setIsCartOpen(false)}
                  className="p-2 hover:bg-gray-100 rounded-full transition-colors text-gray-500"
                >
                  <X />
                </button>
              </div>
              <div className="flex-1 p-8 flex flex-col items-center justify-center text-gray-400">
                <ShoppingCart size={48} className="mb-4 opacity-20" />
                <p className="font-bold text-sm">Cart functionality is coming soon.</p>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>

      {/* --- DETAIL MODAL --- */}
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
                    <Gem className="w-10 h-10" style={{ color: selectedProduct.color }} />
                  </div>
                  <div>
                    <span className="text-[10px] font-black text-[#2076C7] bg-blue-50 px-2 py-0.5 rounded tracking-widest uppercase mb-1 inline-block">
                      Strategy Masterfile
                    </span>
                    <h2 className="text-3xl font-black text-gray-900 leading-tight">
                      {selectedProduct.name}
                    </h2>
                    <div className="flex items-center gap-4 mt-2">
                      <span className="text-xs font-bold text-emerald-600 flex items-center gap-1.5">
                        <TrendingUp size={14} /> Returns: {selectedProduct.returns}
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
                  <div className="lg:col-span-2 space-y-10">
                    <section>
                      <h4 className="text-xs font-black text-gray-400 uppercase tracking-widest mb-4">Investment Objective</h4>
                      <div className="bg-[#F8FAFC] p-8 rounded-3xl border border-gray-100 leading-relaxed text-gray-700 text-sm italic">
                        {selectedProduct.strategyDetails || "This strategy focuses on long-term capital appreciation by investing in a diversified portfolio of high-growth companies across various sectors."}
                      </div>
                    </section>

                    <section>
                      <h4 className="text-xs font-black text-gray-400 uppercase tracking-widest mb-4">Core Strategy</h4>
                      <div className="bg-white p-6 rounded-3xl border border-gray-100 space-y-4">
                        <div className="flex items-start gap-3">
                          <div className="w-6 h-6 rounded-full bg-blue-50 flex items-center justify-center shrink-0 mt-0.5">
                            <Check size={14} className="text-[#2076C7]" />
                          </div>
                          <p className="text-sm text-gray-600 font-medium">Bottom-up stock selection approach focusing on fundamental research.</p>
                        </div>
                        <div className="flex items-start gap-3">
                          <div className="w-6 h-6 rounded-full bg-blue-50 flex items-center justify-center shrink-0 mt-0.5">
                            <Check size={14} className="text-[#2076C7]" />
                          </div>
                          <p className="text-sm text-gray-600 font-medium">Active portfolio management with a multi-cap bias for optimal risk-reward.</p>
                        </div>
                        <div className="flex items-start gap-3">
                          <div className="w-6 h-6 rounded-full bg-blue-50 flex items-center justify-center shrink-0 mt-0.5">
                            <Check size={14} className="text-[#2076C7]" />
                          </div>
                          <p className="text-sm text-gray-600 font-medium">Strict adherence to risk management and drawdown protection protocols.</p>
                        </div>
                      </div>
                    </section>

                    <section>
                      <h4 className="text-xs font-black text-gray-400 uppercase tracking-widest mb-4">Key Parameters</h4>
                      <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
                        {[
                          { label: "Benchmark", value: selectedProduct.benchmark || "BSE 500 TRI" },
                          { label: "Inception", value: selectedProduct.inceptionDate || "Oct 2020" },
                          { label: "Portfolio Size", value: selectedProduct.portfolioSize && selectedProduct.portfolioSize !== '₹N/A' ? selectedProduct.portfolioSize : "Undisclosed" },
                          { label: "Style", value: selectedProduct.investmentStyle || "Diversified" },
                          { label: "Risk", value: selectedProduct.risk || "Moderate" },
                          { label: "Min. Investment", value: selectedProduct.minInvestment || "₹50,00,000" },
                        ].map((item, i) => (
                          <div key={i} className="p-4 bg-gray-50 rounded-2xl text-center border border-transparent hover:border-gray-200 transition-all">
                            <p className="text-[9px] font-bold text-gray-400 uppercase mb-1">{item.label}</p>
                            <p className="text-sm font-black text-gray-900">{item.value}</p>
                          </div>
                        ))}
                      </div>
                    </section>

                    {selectedProduct.sectorAllocation && selectedProduct.sectorAllocation.length > 0 && (
                      <section>
                        <h4 className="text-xs font-black text-gray-400 uppercase tracking-widest mb-6">Sector Exposure</h4>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-6">
                          {selectedProduct.sectorAllocation.map((sector, i) => (
                            <div key={i} className="space-y-2">
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

                    {selectedProduct.marketCap && selectedProduct.marketCap.length > 0 && (
                      <section>
                        <h4 className="text-xs font-black text-gray-400 uppercase tracking-widest mb-6">Market Cap Allocation</h4>
                        <div className="flex gap-4">
                          {selectedProduct.marketCap.map((cap, i) => (
                            <div key={i} className="flex-1 bg-white border border-gray-100 p-4 rounded-2xl shadow-sm">
                              <div className="text-[10px] font-bold text-gray-400 uppercase mb-1">{cap.label}</div>
                              <div className="text-lg font-black text-gray-900">{cap.value}%</div>
                              <div className="h-1 w-full bg-gray-100 rounded-full mt-2 overflow-hidden">
                                <div
                                  className="h-full bg-gradient-to-r from-[#2076C7] to-[#1CADA3]"
                                  style={{ width: `${cap.value}%` }}
                                />
                              </div>
                            </div>
                          ))}
                        </div>
                      </section>
                    )}

                    {selectedProduct.holdings && selectedProduct.holdings.length > 0 && (
                      <section>
                        <h4 className="text-xs font-black text-gray-400 uppercase tracking-widest mb-6">Top Holdings</h4>
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                          {selectedProduct.holdings.map((holding, i) => (
                            <div key={i} className="flex items-center justify-between p-3 bg-gray-50 rounded-xl border border-gray-100 hover:bg-white hover:shadow-sm transition-all group">
                              <div className="flex items-center gap-3">
                                <div className="w-8 h-8 rounded-lg bg-white flex items-center justify-center font-bold text-[#2076C7] text-xs shadow-sm group-hover:scale-110 transition-transform">
                                  {i + 1}
                                </div>
                                <span className="text-xs font-bold text-gray-700">{holding.name}</span>
                              </div>
                              <span className="text-[10px] font-black text-[#1CADA3]">{holding.weight !== 'N/A' ? `${holding.weight}%` : 'N/A'}</span>
                            </div>
                          ))}
                        </div>
                      </section>
                    )}
                  </div>

                  <div className="space-y-6">
                    <div className="bg-gradient-to-br from-[#2076C7] to-[#1CADA3] p-8 rounded-[2.5rem] text-white shadow-xl relative overflow-hidden h-fit">
                      <div className="absolute top-0 right-0 w-32 h-32 bg-white blur-[80px] opacity-20" />
                      <h3 className="text-lg font-bold mb-6 relative z-10">Strategy Projection</h3>
                      <div className="space-y-6 relative z-10">
                        <div className="flex justify-between items-end border-b border-white/20 pb-4">
                          <span className="text-[10px] font-bold text-white/70 uppercase tracking-widest">Target IRR</span>
                          <span className="text-3xl font-black">{selectedProduct.returns !== 'N/A' ? selectedProduct.returns : '18.5%*'}</span>
                        </div>
                        <div className="flex justify-between items-end border-b border-white/20 pb-4">
                          <span className="text-[10px] font-bold text-white/70 uppercase tracking-widest">Min Horizon</span>
                          <span className="text-xl font-black">{selectedProduct.horizon}</span>
                        </div>
                        <div className="flex justify-between items-end border-b border-white/20 pb-4">
                          <span className="text-[10px] font-bold text-white/70 uppercase tracking-widest">Asset Class</span>
                          <span className="text-lg font-black">Equity</span>
                        </div>
                      </div>
                      <p className="text-[9px] text-white/60 mt-8 italic text-center">
                        *Target returns are based on internal research and historical trends. Past performance is not indicative of future results.
                      </p>
                    </div>
                    <button
                      onClick={() => handleScheduleClick(selectedProduct)}
                      className="w-full py-5 bg-gradient-to-r from-[#2076C7] to-[#1CADA3] text-white rounded-[1.5rem] font-black uppercase tracking-widest text-xs flex items-center justify-center gap-3 shadow-lg hover:shadow-xl hover:translate-y-[-2px] transition-all"
                    >
                      <Calendar size={18} /> Schedule Meeting
                    </button>
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
                    <p className="text-[#2076C7] text-[10px] font-black uppercase tracking-widest mt-1">Select your preferred slot</p>
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
                      <Calendar size={14} className="text-[#2076C7]" /> Select Date
                    </label>
                    <div className="relative group">
                      <input
                        type="date"
                        value={meetingDate}
                        onChange={e => setMeetingDate(e.target.value)}
                        className="w-full px-5 py-4 rounded-2xl bg-gray-50 border-2 border-transparent group-hover:bg-white group-hover:border-[#2076C7]/20 focus:bg-white focus:border-[#2076C7] focus:ring-4 focus:ring-[#2076C7]/10 outline-none transition-all font-bold text-gray-700 text-sm"
                      />
                    </div>
                  </div>

                  {/* Time Selection */}
                  <div className="space-y-2">
                    <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest ml-1 flex items-center gap-2">
                      <Clock size={14} className="text-[#2076C7]" /> Select Time
                    </label>
                    <div className="relative group">
                      <input
                        type="time"
                        value={meetingTime}
                        onChange={e => setMeetingTime(e.target.value)}
                        className="w-full px-5 py-4 rounded-2xl bg-gray-50 border-2 border-transparent group-hover:bg-white group-hover:border-[#2076C7]/20 focus:bg-white focus:border-[#2076C7] focus:ring-4 focus:ring-[#2076C7]/10 outline-none transition-all font-bold text-gray-700 text-sm"
                      />
                    </div>
                  </div>
                </div>

                {/* Google Meet Link */}
                <div className="space-y-2">
                  <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest ml-1 flex items-center gap-2">
                    <Video size={14} className="text-[#2076C7]" /> Google Meet Link
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
                      <MessageSquare size={14} className="text-[#2076C7]" /> Confirm WhatsApp Number
                    </label>
                    <input
                      type="text"
                      placeholder="+91 98765 43210"
                      value={whatsappNumber}
                      onChange={e => setWhatsappNumber(e.target.value)}
                      className="w-full px-5 py-4 rounded-2xl bg-white border border-gray-200 focus:border-[#2076C7] focus:ring-2 focus:ring-[#2076C7]/10 outline-none transition-all font-bold text-gray-700"
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
                    className="flex-1 py-5 bg-gradient-to-r from-[#2076C7] to-[#1CADA3] text-white rounded-2xl font-black uppercase tracking-widest text-xs flex items-center justify-center gap-3 shadow-xl shadow-blue-200/50 hover:shadow-2xl hover:translate-y-[-2px] transition-all"
                  >
                    Confirm Schedule <ArrowUpRight size={18} />
                  </button>
                </div>
              </div>

              {/* Right Side: Preview Ticket */}
              <div className="hidden md:flex w-80 lg:w-96 bg-gradient-to-br from-[#2076C7] to-[#1CADA3] p-10 flex-col justify-between relative overflow-hidden text-white">
                <div className="absolute top-0 right-0 w-64 h-64 bg-white blur-[100px] opacity-10 -mr-32 -mt-32" />
                <div className="absolute bottom-0 left-0 w-64 h-64 bg-blue-300 blur-[100px] opacity-20 -ml-32 -mb-32" />

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
                    <p className="text-[10px] font-black text-white/60 uppercase tracking-[0.2em]">Strategy Title</p>
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
                      <img src="https://ui-avatars.com/api/?name=Admin&background=white&color=2076C7" className="w-full h-full rounded-full border border-white/20" alt="Icon" />
                    </div>
                    <div>
                      <p className="text-[10px] font-black text-white/60 uppercase tracking-widest">Organizer</p>
                      <p className="text-xs font-bold">Wealth Manager</p>
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