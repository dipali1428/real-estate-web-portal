"use client";

import { useState, useEffect, useMemo } from "react";
import {
  Search,
  X,
  Briefcase,
  TrendingUp,
  ShoppingCart,
  Trash2,
  Activity,
  ArrowRight,
  Layers,
  CheckCircle,
  Bookmark,
  BookmarkCheck,
  FileText,
  Calendar
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";

interface CartItem {
  id: string;
  name: string;
  amount: number;
}

import { AIFProduct, aifProducts, MIN_INVESTMENT_AIF } from "../data/aifData";

export default function ExploreAIF() {
  const [searchQuery, setSearchQuery] = useState("");
  const [cart, setCart] = useState<CartItem[]>([]);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState<AIFProduct | null>(null);
  const [activeCategory, setActiveCategory] = useState("All");
  const [wishlist, setWishlist] = useState<any[]>([]);
  const [showAllFunds, setShowAllFunds] = useState(false);
  const [showToast, setShowToast] = useState(false);
  const [toastMessage, setToastMessage] = useState("");

  // Persistence
  useEffect(() => {
    const savedCart = localStorage.getItem("aif_cart");
    if (savedCart) setCart(JSON.parse(savedCart));

    const savedWishlist = localStorage.getItem("user_wishlist");
    if (savedWishlist) setWishlist(JSON.parse(savedWishlist));
  }, []);

  useEffect(() => {
    localStorage.setItem("aif_cart", JSON.stringify(cart));
  }, [cart]);

  useEffect(() => {
    localStorage.setItem("user_wishlist", JSON.stringify(wishlist));
  }, [wishlist]);

  // Filtering
  const filteredProducts = useMemo(() => {
    return aifProducts.filter(p => {
      const matchesSearch =
        p.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        p.desc.toLowerCase().includes(searchQuery.toLowerCase());
      const matchesCategory = activeCategory === "All" || p.category === activeCategory;
      return matchesSearch && matchesCategory;
    });
  }, [searchQuery, activeCategory]);

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

  const toggleWishlist = (product: AIFProduct) => {
    const isPresent = wishlist.some(item => item.id === product.name && item.category === "aif");
    if (isPresent) {
      setWishlist(wishlist.filter(item => !(item.id === product.name && item.category === "aif")));
    } else {
      const wishlistItem = {
        id: product.name,
        category: "aif",
        name: product.name,
        logo: "🏛️",
        keyMetrics: {
          category: product.category,
          minInvestment: 10000000,
          targetIRR: parseFloat(product.returns),
          lockIn: "5-7 Years",
          tenure: product.horizon,
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

  const visibleProducts = showAllFunds ? filteredProducts : filteredProducts.slice(0, 4);

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
            style={{ background: "linear-gradient(135deg, #1CADA3, #2076C7)" }}
          >
            <BookmarkCheck size={18} />
            {toastMessage}
          </motion.div>
        )}
      </AnimatePresence>


      {/* Search & Tabs Header */}
      <div className="bg-white/80 backdrop-blur-md rounded-2xl p-6 border border-gray-100 shadow-sm sticky top-0 z-40 space-y-6">
        <div className="flex flex-col md:flex-row gap-4 items-center">
          <div className="relative flex-1">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={20} />
            <input
              type="text"
              placeholder="Search AIF funds..."
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
            {["All", "Category I", "Category II", "Category III"].map(cat => (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className={`px-4 py-2 rounded-lg text-xs font-black uppercase tracking-widest transition-all whitespace-nowrap ${
                  activeCategory === cat
                    ? "bg-white text-[#1CADA3] shadow-sm"
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
              className="absolute top-4 right-4 p-1.5 rounded-lg bg-white border border-gray-100 shadow-sm text-gray-400 hover:text-[#1CADA3] transition-colors z-10"
            >
              {wishlist.some(item => item.id === product.name && item.category === "aif") ? (
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
                onClick={e => { e.stopPropagation(); }}
                className="w-40 py-2.5 rounded-xl font-black text-[10px] uppercase tracking-widest transition-all shadow-sm active:scale-95 flex items-center justify-center gap-2 bg-white text-[#1CADA3] border-2 border-[#1CADA3]/10 hover:border-[#1CADA3]/30 hover:bg-teal-50/50 cursor-pointer"
              >
                <Calendar size={16} /> Schedule Meeting
              </button>
            </div>
          </motion.div>
        ))}
      </div>

      {/* View More / View Less */}
      {filteredProducts.length > 4 && (
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
                        onClick={() => { }}
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
    </div>
  );
}
