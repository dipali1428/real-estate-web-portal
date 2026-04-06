"use client";

import { useState, useEffect, useMemo } from "react";
import {
  Search,
  X,
  Briefcase,
  TrendingUp,
  ShoppingCart,
  Trash2,
  ArrowRight,
  Gem,
  CheckCircle,
  Bookmark,
  BookmarkCheck,
  Calendar,
  FileText
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";

interface CartItem {
  id: string;
  name: string;
  amount: number;
}

import { PMSProduct, pmsProducts, MIN_INVESTMENT } from "../data/pmsData";

export default function ExplorePMS() {
  const [searchQuery, setSearchQuery] = useState("");
  const [cart, setCart] = useState<CartItem[]>([]);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState<PMSProduct | null>(null);
  const [activeCategory, setActiveCategory] = useState("All");
  const [wishlist, setWishlist] = useState<any[]>([]);
  const [showAllFunds, setShowAllFunds] = useState(false);
  const [showToast, setShowToast] = useState(false);
  const [toastMessage, setToastMessage] = useState("");

  // Persistence
  useEffect(() => {
    const savedCart = localStorage.getItem("pms_cart");
    if (savedCart) setCart(JSON.parse(savedCart));

    const savedWishlist = localStorage.getItem("user_wishlist");
    if (savedWishlist) setWishlist(JSON.parse(savedWishlist));
  }, []);

  useEffect(() => {
    localStorage.setItem("pms_cart", JSON.stringify(cart));
  }, [cart]);

  useEffect(() => {
    localStorage.setItem("user_wishlist", JSON.stringify(wishlist));
  }, [wishlist]);

  // Filtering
  const filteredProducts = useMemo(() => {
    return pmsProducts.filter(p => {
      const matchesSearch =
        p.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        p.desc.toLowerCase().includes(searchQuery.toLowerCase());
      const matchesCategory = activeCategory === "All" || p.category === activeCategory;
      return matchesSearch && matchesCategory;
    });
  }, [searchQuery, activeCategory]);

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

  const removeFromCart = (id: string) => setCart(cart.filter(item => item.id !== id));
  const updateCartAmount = (id: string, amount: number) =>
    setCart(cart.map(item => (item.id === id ? { ...item, amount } : item)));
  const formatINR = (num: number) => num.toLocaleString("en-IN");

  const toggleWishlist = (product: PMSProduct) => {
    const isPresent = wishlist.some(item => item.id === product.name && item.category === "pms");
    if (isPresent) {
      setWishlist(wishlist.filter(item => !(item.id === product.name && item.category === "pms")));
    } else {
      const wishlistItem = {
        id: product.name,
        category: "pms",
        name: product.name,
        logo: "🏦",
        keyMetrics: {
          returns: { "1Y": 0, "3Y": 0, "5Y": 0 },
          benchmark: product.benchmark || "NIFTY 500",
          minInvestment: parseInt(product.minInvestment),
          lockIn: "3 Years",
          risk: product.risk.replace(" Risk", ""),
        },
        addedDate: new Date().toLocaleDateString(),
      };
      setWishlist([...wishlist, wishlistItem]);
      setToastMessage(`"${product.name}" added to wishlist!`);
      setShowToast(true);
      setTimeout(() => setShowToast(false), 3000);
    }
  };

  const visibleProducts = showAllFunds ? filteredProducts : filteredProducts.slice(0, 3);

  return (
    <div className="space-y-6 relative">
      {/* Wishlist Toast – top-right */}
      <AnimatePresence>
        {showToast && (
          <motion.div
            initial={{ opacity: 0, y: -20, x: 20 }}
            animate={{ opacity: 1, y: 0, x: 0 }}
            exit={{ opacity: 0, y: -20, x: 20 }}
            className="fixed top-6 right-6 z-[9999] flex items-center gap-3 px-5 py-3 rounded-2xl shadow-2xl text-white text-sm font-bold"
            style={{ background: "linear-gradient(135deg, #2076C7, #1CADA3)" }}
          >
            <BookmarkCheck size={18} />
            {toastMessage}
          </motion.div>
        )}
      </AnimatePresence>

      {/* Removed Floating Cart Button */}

      {/* Search & Tabs Header */}
      <div className="bg-white/80 backdrop-blur-md rounded-2xl p-6 border border-gray-100 shadow-sm sticky top-0 z-40 space-y-6">
        <div className="flex flex-col md:flex-row gap-4 items-center">
          <div className="relative flex-1">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={20} />
            <input
              type="text"
              placeholder="Search PMS strategies..."
              value={searchQuery}
              onChange={e => setSearchQuery(e.target.value)}
              className="w-full pl-12 pr-12 py-4 rounded-xl border border-gray-200 bg-white text-gray-800 placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-[#1CADA3]/50 shadow-sm transition-all"
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery("")}
                className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
              >
                <X size={20} />
              </button>
            )}
          </div>
          <div className="flex bg-gray-100 p-1 rounded-xl w-full md:w-auto overflow-x-auto no-scrollbar">
            {["All", "Multi-Cap", "Mid & Small-Cap", "Ethical"].map(cat => (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className={`px-4 py-2 rounded-lg text-xs font-black uppercase tracking-widest transition-all whitespace-nowrap ${
                  activeCategory === cat
                    ? "bg-white text-[#2076C7] shadow-sm"
                    : "text-gray-500 hover:bg-gray-200"
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Products Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {visibleProducts.map((product, index) => (
          <motion.div
            key={index}
            layout
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-white rounded-3xl shadow-md border border-gray-100 hover:border-[#2076C7] transition-all p-8 flex flex-col h-full group w-full relative"
          >
            {/* Bookmark – top-right corner of card */}
            <button
              onClick={e => { e.stopPropagation(); toggleWishlist(product); }}
              className="absolute top-4 right-4 p-1.5 rounded-lg bg-white border border-gray-100 shadow-sm text-gray-400 hover:text-[#2076C7] transition-colors z-10"
            >
              {wishlist.some(item => item.id === product.name && item.category === "pms") ? (
                <BookmarkCheck size={16} className="text-[#2076C7]" fill="#2076C7" />
              ) : (
                <Bookmark size={16} />
              )}
            </button>

            {/* Icon */}
            <div className="w-20 h-20 rounded-2xl bg-gradient-to-br from-blue-50 to-indigo-50 flex items-center justify-center mb-6 mx-auto group-hover:scale-105 transition-transform relative">
              <Gem className="w-10 h-10" style={{ color: product.color }} />
              <div className="absolute -top-2 -right-2 px-2 py-0.5 rounded bg-white border border-gray-100 shadow-sm text-[8px] font-black text-gray-500 uppercase tracking-widest">
                {product.risk.replace(" Risk", "")}
              </div>
            </div>

            {/* Name */}
            <h3 className="text-lg font-black text-center text-gray-900 line-clamp-2 min-h-[56px] mb-2 leading-tight">
              {product.name}
            </h3>

            {/* Category badge */}
            <div className="flex justify-center mb-6">
              <span className="text-[10px] font-black text-[#2076C7] bg-blue-50 px-2 py-1 rounded-md uppercase tracking-widest">
                {product.category}
              </span>
            </div>

            {/* Actions */}
            <div className="space-y-3 mt-auto">
              <button
                onClick={e => { e.stopPropagation(); setSelectedProduct(product); }}
                className="w-full py-3.5 rounded-xl font-black text-xs uppercase tracking-widest transition-all shadow-sm active:scale-95 flex items-center justify-center gap-2 bg-gradient-to-r from-[#2076C7] to-[#1CADA3] text-white hover:opacity-90"
              >
                <FileText size={18} /> Details
              </button>
              <button
                onClick={e => { e.stopPropagation(); }}
                className="w-full py-3.5 rounded-xl font-black text-xs uppercase tracking-widest transition-all shadow-sm active:scale-95 flex items-center justify-center gap-2 bg-white text-[#2076C7] border-2 border-[#2076C7]/10 hover:border-[#2076C7]/30 hover:bg-blue-50/50"
              >
                <Calendar size={18} /> Schedule Meeting
              </button>
            </div>
          </motion.div>
        ))}
      </div>

      {/* View More / View Less */}
      {filteredProducts.length > 3 && (
        <div className="flex justify-center pt-2">
          <button
            onClick={() => setShowAllFunds(prev => !prev)}
            className="px-8 py-3 rounded-xl font-black text-xs uppercase tracking-widest bg-gradient-to-r from-[#2076C7] to-[#1CADA3] text-white shadow-md hover:opacity-90 active:scale-95 transition-all flex items-center gap-2"
          >
            {showAllFunds
              ? "View Less Funds"
              : `View More Funds (${filteredProducts.length - 3} more)`}
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
                  <ShoppingCart className="text-[#2076C7]" /> My Investment Cart
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
                          <X size={18} />
                        </button>
                      </div>
                      <div className="space-y-2">
                        <span className="text-[10px] font-black text-gray-400 uppercase tracking-widest">
                          Investment Amount (Min ₹50L)
                        </span>
                        <div className="flex items-center gap-2 bg-gray-50 px-3 py-2 rounded-lg border border-gray-100 focus-within:border-[#2076C7] transition-all">
                          <span className="text-xs font-bold text-gray-400">₹</span>
                          <input
                            type="number"
                            min={MIN_INVESTMENT}
                            value={item.amount}
                            onChange={e => updateCartAmount(item.id, Number(e.target.value))}
                            className="w-full bg-transparent outline-none font-black text-sm text-right"
                          />
                        </div>
                        {item.amount < MIN_INVESTMENT && (
                          <p className="text-[9px] text-red-500 font-bold mt-1">
                            Min. investment is ₹50,00,000
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
                    <span className="font-bold text-gray-500">Total Assets</span>
                    <span className="text-2xl font-black text-[#2076C7]">
                      ₹{formatINR(cart.reduce((sum, i) => sum + i.amount, 0))}
                    </span>
                  </div>
                  <button
                    disabled={cart.some(i => i.amount < MIN_INVESTMENT)}
                    className="w-full py-4 bg-gradient-to-r from-[#2076C7] to-[#1CADA3] text-white rounded-2xl font-black uppercase tracking-widest flex items-center justify-center gap-2 hover:opacity-95 transition-all disabled:opacity-50"
                  >
                    Generate Proposal <ArrowRight size={18} />
                  </button>
                  <p className="text-[10px] text-center text-gray-400 font-medium italic">
                    Our wealth managers will finalize your strategy proposal.
                  </p>
                </div>
              )}
            </motion.div>
          </>
        )}
      </AnimatePresence>

      {/* --- DETAIL MODAL (kept for direct programmatic use if needed) --- */}
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
                        <TrendingUp size={14} /> Expected Returns: {selectedProduct.returns}
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
                      <h4 className="text-xs font-black text-gray-400 uppercase tracking-widest mb-4">
                        Investment Philosophy
                      </h4>
                      <div className="bg-[#F8FAFC] p-8 rounded-3xl border border-gray-100 leading-relaxed text-gray-700 text-sm">
                        {selectedProduct.strategyDetails || selectedProduct.desc}
                        <p className="mt-4">
                          This strategy leverages high-alpha opportunities through fundamental
                          analysis and tactical capital allocation. The portfolio is managed
                          dynamically to maximize risk-adjusted returns across varied market
                          cycles.
                        </p>
                      </div>
                    </section>
                    <section>
                      <h4 className="text-xs font-black text-gray-400 uppercase tracking-widest mb-4">
                        Key Parameters
                      </h4>
                      <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
                        {[
                          { label: "Benchmark", value: selectedProduct.benchmark || "NIFTY 500" },
                          { label: "Inception", value: selectedProduct.inceptionDate || "N/A" },
                          { label: "Portfolio Size", value: selectedProduct.portfolioSize || "₹100 Cr+" },
                          { label: "Style", value: selectedProduct.investmentStyle || "Growth" },
                          { label: "Strategy Type", value: selectedProduct.strategyType || "Diversified" },
                          { label: "Best Suited For", value: selectedProduct.bestSuitedFor || "Long-Term" },
                        ].map((item, i) => (
                          <div key={i} className="p-4 bg-gray-50 rounded-2xl text-center">
                            <p className="text-[9px] font-bold text-gray-400 uppercase mb-1">{item.label}</p>
                            <p className="text-sm font-black text-gray-900 uppercase">{item.value}</p>
                          </div>
                        ))}
                      </div>
                    </section>
                    {(selectedProduct.marketCap || []).length > 0 && (
                      <section>
                        <h4 className="text-xs font-black text-gray-400 uppercase tracking-widest mb-4">
                          Market Cap Allocation
                        </h4>
                        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                          {selectedProduct.marketCap?.map((cap, i) => (
                            <div
                              key={i}
                              className="p-4 bg-[#2076C7]/5 rounded-2xl border border-[#2076C7]/10 flex flex-col items-center"
                            >
                              <span className="text-[9px] font-bold text-gray-500 uppercase mb-1">
                                {cap.label}
                              </span>
                              <span className="text-lg font-black text-[#2076C7]">{cap.value}%</span>
                            </div>
                          ))}
                        </div>
                      </section>
                    )}
                    {selectedProduct.sectorAllocation && (
                      <section>
                        <h4 className="text-xs font-black text-gray-400 uppercase tracking-widest mb-6">
                          Sector Exposure
                        </h4>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-6">
                          {selectedProduct.sectorAllocation.map((sector, i) => (
                            <div key={i} className="space-y-2">
                              <div className="flex justify-between items-center text-xs">
                                <span className="font-bold text-gray-600 uppercase tracking-tight">
                                  {sector.name}
                                </span>
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
                    <div className="bg-gradient-to-r from-[#2076C7] to-[#1CADA3] p-8 rounded-[2.5rem] text-white shadow-xl relative overflow-hidden h-fit">
                      <div className="absolute top-0 right-0 w-32 h-32 bg-white blur-[80px] opacity-20" />
                      <h3 className="text-lg font-bold mb-6 flex items-center gap-2 relative z-10">
                        Wealth Projection
                      </h3>
                      <div className="space-y-8 relative z-10">
                        {[
                          { year: 3, label: "Year 3" },
                          { year: 5, label: "Year 5" },
                          { year: 10, label: "Year 10" },
                        ].map((proj, i) => {
                          const rate = parseFloat(selectedProduct.returns) / 100;
                          const futureValue = MIN_INVESTMENT * Math.pow(1 + rate, proj.year);
                          const formattedVal =
                            futureValue >= 10000000
                              ? `₹${(futureValue / 10000000).toFixed(2)} Cr`
                              : `₹${(futureValue / 100000).toFixed(1)} L`;
                          return (
                            <div key={i} className="flex justify-between items-end border-b border-white/20 pb-4">
                              <span className="text-[10px] font-bold text-white/80 uppercase tracking-widest">
                                {proj.label}
                              </span>
                              <span
                                className={`font-black ${
                                  proj.year === 10 ? "text-3xl text-white drop-shadow-md" : "text-xl text-white/90"
                                }`}
                              >
                                {formattedVal}+
                              </span>
                            </div>
                          );
                        })}
                      </div>
                      <p className="text-[9px] text-white/70 mt-8 italic leading-relaxed text-center drop-shadow-sm">
                        *Projected at {selectedProduct.returns} CAGR based on strategy track record.
                        Returns are not guaranteed.
                      </p>
                    </div>

                    <div className="space-y-3">
                      <button
                        onClick={() => { }}
                        className="w-full py-5 bg-gradient-to-r from-[#2076C7] to-[#1CADA3] text-white rounded-[1.5rem] font-black uppercase tracking-widest text-xs flex items-center justify-center gap-3 shadow-lg hover:shadow-xl hover:translate-y-[-2px] transition-all"
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
    </div>
  );
}
