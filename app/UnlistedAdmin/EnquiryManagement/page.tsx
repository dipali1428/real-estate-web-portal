"use client";

import { useState, useEffect, useMemo, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { AdminService, Enquiry } from "../../services/unlistedadminservices";
import {
  Bookmark,
  Search,
  Layers,
  TrendingUp,
  BarChart3,
  Building2,
  MapPin,
  Mail,
  User,
  Package,
  MessageSquare,
  X // Added X for the modal close button
} from "lucide-react";
import toast from "react-hot-toast";

/* ---------------- DETAIL MODAL COMPONENT ---------------- */
const EnquiryDetailModal = ({ item, onClose }: { item: Enquiry; onClose: () => void }) => {
  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/40 backdrop-blur-sm">
      <motion.div
        initial={{ opacity: 0, scale: 0.9, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.9, y: 20 }}
        className="bg-white rounded-[32px] w-full max-w-lg overflow-hidden shadow-2xl"
      >
        {/* Header Gradient */}
        <div className="bg-linear-to-r from-[#2076C7] to-[#1CADA3] p-6 text-white flex justify-between items-center">
          <div className="flex items-center gap-3">
            <div className="bg-white/20 p-2 rounded-xl backdrop-blur-md">
              <MessageSquare size={20} />
            </div>
            <h3 className="font-bold text-lg">Enquiry Details</h3>
          </div>
          <button onClick={onClose} className="hover:bg-white/20 p-2 rounded-full transition-colors">
            <X size={20} />
          </button>
        </div>

        <div className="p-8 space-y-6 max-h-[80vh] overflow-y-auto">
          {/* Product Section */}
          <div className="flex items-start gap-4 p-4 bg-slate-50 rounded-2xl border border-slate-100">
            <div className="w-12 h-12 rounded-xl bg-white flex items-center justify-center text-[#2076C7] shadow-sm flex-shrink-0">
              <Package size={24} />
            </div>
            <div>
              <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1">Product Interested In</p>
              <h4 className="font-bold text-gray-900 text-lg leading-tight">{item.product_name || "General Inquiry"}</h4>
              <span className="text-xs font-bold text-[#1CADA3] uppercase">{item.product_type}</span>
            </div>
          </div>

          {/* Info Grid */}
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-1">
              <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Customer Name</p>
              <p className="text-sm font-bold text-gray-800 flex items-center gap-2">
                <User size={14} className="text-[#2076C7]" /> {item.full_name}
              </p>
            </div>
            <div className="space-y-1 text-right">
              <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Location</p>
              <p className="text-sm font-bold text-gray-800 flex items-center justify-end gap-2">
                <MapPin size={14} className="text-red-400" /> {item.city || "N/A"}
              </p>
            </div>
            <div className="space-y-1">
              <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Phone Number</p>
              <p className="text-sm font-black text-[#2076C7]">{item.phone}</p>
            </div>
            <div className="space-y-1 text-right">
              <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Platform</p>
              <span className="inline-block px-2 py-0.5 bg-purple-50 text-purple-600 text-[10px] font-bold rounded uppercase">
                {item.platform || "WEB"}
              </span>
            </div>
          </div>

          <div className="p-3 bg-blue-50/50 rounded-xl border border-blue-100 flex items-center gap-3">
            <Mail size={16} className="text-[#2076C7]" />
            <span className="text-sm font-medium text-gray-600 truncate">{item.email}</span>
          </div>

          {/* Message Content */}
          <div className="space-y-2">
            <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Customer Message</p>
            <div className="p-4 bg-slate-50 rounded-2xl border-l-4 border-[#2076C7] text-sm text-gray-600 italic leading-relaxed">
              "{item.message || "No message provided."}"
            </div>
          </div>

          <div className="pt-4 border-t border-slate-100 flex justify-between items-center text-[11px] text-slate-400 font-bold uppercase">
            <span>Received On: {new Date(item.created_at).toLocaleDateString()}</span>
            <button onClick={onClose} className="text-[#2076C7] hover:underline">Close View</button>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

/* ---------------- MAIN COMPONENT ---------------- */

const productTypeToCategoryId: Record<string, string> = {
  SHARE: "unlisted",
  MUTUAL_FUND: "mutual-funds",
  PMS: "pms",
  BOND: "bonds",
  REAL_ESTATE: "real-estate",
  NCD: "ncd",
  AIF: "aif",
  NPS: "nps"
};

const initialCategories = [
  { id: "all", name: "All Enquiries", icon: Layers },
  { id: "unlisted", name: "Unlisted", icon: Building2 },
  { id: "pms", name: "PMS", icon: BarChart3 },
  { id: "ncd", name: "NCD", icon: TrendingUp },
  { id: "bonds", name: "Bonds", icon: Layers },
  { id: "mutual-funds", name: "Mutual Funds", icon: TrendingUp },
  { id: "Real-Estate", name: "Real Estate", icon: Building2 },
  { id: "aif", name: "AIF", icon: BarChart3 },
  { id: "nps", name: "NPS", icon: Layers }
];

export default function EnquiryManagement() {
  const [enquiries, setEnquiries] = useState<Enquiry[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedEnquiry, setSelectedEnquiry] = useState<Enquiry | null>(null); // Added state for Modal

  const [categories, setCategories] = useState(
    initialCategories.map((c) => ({ ...c, count: 0 }))
  );

  const loadEnquiries = useCallback(async () => {
    try {
      const response = await AdminService.getEnquiries();
      const data = Array.isArray(response) ? response : (response as any).data || [];
      setEnquiries(data);
      updateCategoryCounts(data);
    } catch (error) {
      toast.error("Error loading enquiries");
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => { loadEnquiries(); }, [loadEnquiries]);

  const updateCategoryCounts = (items: Enquiry[]) => {
    setCategories((prev) =>
      prev.map((cat) => {
        if (cat.id === "all") return { ...cat, count: items.length };
        const count = items.filter((item) => productTypeToCategoryId[item.product_type || ""] === cat.id).length;
        return { ...cat, count };
      })
    );
  };

  const filteredItems = useMemo(() => {
    return enquiries.filter((item) => {
      const matchesCategory = selectedCategory === "all" || productTypeToCategoryId[item.product_type || ""] === selectedCategory;
      const matchesSearch =
        item.full_name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.product_name?.toLowerCase().includes(searchQuery.toLowerCase());
      return matchesCategory && matchesSearch;
    });
  }, [enquiries, selectedCategory, searchQuery]);

  if (loading) return <div className="flex items-center justify-center min-h-screen"><div className="w-10 h-10 border-4 border-[#2076C7] border-t-transparent rounded-full animate-spin"></div></div>;

  return (
    <div className="flex-1 p-4 sm:p-6 bg-[#f8fafc] min-h-screen font-sans">

      {/* HEADER BANNER */}
      <motion.div initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} className="bg-linear-to-r from-[#2076C7] to-[#1CADA3] rounded-2xl p-6 mb-6 text-white shadow-lg">
        <div className="flex items-center gap-3">
          <Bookmark className="w-8 h-8 text-white" />
          <div>
            <h2 className="text-2xl font-bold">Lead Management</h2>
            <p className="text-sm opacity-80">Distinguishing Products from Customer Enquiries</p>
          </div>
        </div>
      </motion.div>

      {/* PILL TABS */}
      <div className="flex justify-center mb-6 overflow-x-auto pb-2 scrollbar-hide">
        <div className="p-1 bg-slate-100/80 rounded-full flex items-center gap-1 shadow-inner border border-slate-200/50">
          {categories.map((cat) => (
            <button
              key={cat.id}
              onClick={() => setSelectedCategory(cat.id)}
              className={`relative px-5 py-2 rounded-full text-xs font-bold uppercase transition-all duration-300 z-10 flex items-center gap-2 ${selectedCategory === cat.id ? "text-white" : "text-slate-500 hover:text-slate-700"
                }`}
            >
              {selectedCategory === cat.id && (
                <motion.div layoutId="activeTab" className="absolute inset-0 bg-gradient-to-r from-[#2076C7] to-[#1CADA3] rounded-full -z-10 shadow-sm" />
              )}
              <span>{cat.name}</span>
              <span className={`px-1.5 py-0.5 rounded-full text-[10px] ${selectedCategory === cat.id ? "bg-white/20 text-white" : "bg-slate-200 text-slate-600"}`}>
                {cat.count}
              </span>
            </button>
          ))}
        </div>
      </div>

      {/* SEARCH */}
      <div className="mb-8 flex justify-center">
        <div className="relative w-full max-w-md">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-700" />
          <input
            type="text"
            placeholder="Search by product or customer name..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-10 pr-4 py-3 bg-white border border-slate-200 rounded-2xl text-gray-700 shadow-sm focus:ring-2 focus:ring-[#2076C7]/10 outline-none"
          />
        </div>
      </div>

      {/* TABLE */}
      <div className="hidden md:block bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
        <table className="w-full">
          <thead>
            <tr className="border-b border-gray-50 bg-gray-50/50">
              <th className="px-6 py-4 text-left text-[10px] font-black text-gray-400 uppercase tracking-widest">Enquired Product</th>
              <th className="px-6 py-4 text-left text-[10px] font-black text-gray-400 uppercase tracking-widest">Customer Identity</th>
              <th className="px-6 py-4 text-center text-[10px] font-black text-gray-400 uppercase tracking-widest">Contact Info</th>
              <th className="px-6 py-4 text-center text-[10px] font-black text-gray-400 uppercase tracking-widest">City</th>
              <th className="px-6 py-4 text-center text-[10px] font-black text-gray-400 uppercase tracking-widest">Date</th>
              <th className="px-6 py-4 text-center text-[10px] font-black text-gray-400 uppercase tracking-widest">Action</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-50">
            {filteredItems.map((item) => (
              <tr key={item.id} className="hover:bg-gray-50/50 transition-colors">
                {/* PRODUCT COLUMN */}
                <td className="px-6 py-5">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-xl bg-[#2076C7]/10 flex items-center justify-center text-[#2076C7]">
                      <Package size={20} />
                    </div>
                    <div>
                      <div className="text-sm font-bold text-gray-900">{item.product_name || "N/A"}</div>
                      <div className="text-[10px] font-black text-[#2076C7] uppercase">{item.product_type}</div>
                    </div>
                  </div>
                </td>
                {/* CUSTOMER COLUMN */}
                <td className="px-6 py-5">
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-full bg-blue-50 flex items-center justify-center text-[#2076C7] border border-blue-100 font-bold text-xs">
                      {item.full_name.charAt(0)}
                    </div>
                    <div>
                      <div className="text-sm font-bold text-gray-700">{item.full_name}</div>
                    </div>
                  </div>
                </td>
                <td className="px-6 py-5 text-center">
                  <div className="text-sm font-black text-[#2076C7]">{item.phone}</div>
                  <div className="text-[10px] text-gray-400">{item.email}</div>
                </td>
                <td className="px-6 py-5 text-center">
                  <span className="inline-flex items-center gap-1 text-xs font-bold text-gray-600">
                    <MapPin size={12} className="text-gray-400" /> {item.city || "N/A"}
                  </span>
                </td>
                <td className="px-6 py-5 text-center text-xs font-bold text-gray-500">
                  {new Date(item.created_at).toLocaleDateString('en-IN', { day: '2-digit', month: 'short' })}
                </td>
                <td className="px-6 py-5 text-center">
                  <div className="flex justify-center gap-2">
                    {/* Updated Click Handler */}
                    <button
                      onClick={() => setSelectedEnquiry(item)}
                      className="px-3 py-1 text-sm rounded-md bg-[#2076C7]/10 text-[#2076C7] hover:bg-[#2076C7] hover:text-white transition-all"
                    >
                      View Enquiry
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* MOBILE CARD VIEW */}
      <div className="md:hidden space-y-4">
        {filteredItems.map((item) => (
          <motion.div layout key={item.id} className="bg-white rounded-2xl p-5 shadow-sm border border-slate-100">
            {/* Header: Product Focus */}
            <div className="flex justify-between items-start mb-4">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-[#2076C7]/10 to-[#1CADA3]/10 flex items-center justify-center text-[#2076C7]">
                  <Package size={24} />
                </div>
                <div>
                  <h3 className="font-black text-slate-800 text-sm leading-tight">{item.product_name}</h3>
                  <span className="text-[9px] font-bold text-[#1CADA3] uppercase">{item.product_type}</span>
                </div>
              </div>
              <span className="text-[10px] font-bold text-slate-300">#{item.id}</span>
            </div>

            {/* Content: Customer Focus */}
            <div className="bg-slate-50 rounded-xl p-4 space-y-3">
              <div className="flex items-center gap-2 border-b border-slate-200 pb-2">
                <User size={14} className="text-slate-400" />
                <span className="text-xs font-bold text-slate-700">{item.full_name}</span>
              </div>
              <div className="grid grid-cols-2 gap-2">
                <div className="flex flex-col">
                  <span className="text-[9px] font-bold text-slate-400 uppercase">Phone</span>
                  <span className="text-xs font-black text-[#2076C7]">{item.phone}</span>
                </div>
                <div className="flex flex-col">
                  <span className="text-[9px] font-bold text-slate-400 uppercase">Location</span>
                  <span className="text-xs font-bold text-slate-700">{item.city || "N/A"}</span>
                </div>
              </div>
            </div>

            <div className="mt-4 flex justify-between items-center">
              <div className="text-[10px] font-bold text-slate-400">
                {new Date(item.created_at).toLocaleDateString()}
              </div>
              <div className="flex gap-2">
                {/* Updated Mobile Click Handler */}
                <button
                  onClick={() => setSelectedEnquiry(item)}
                  className="p-2 bg-blue-50 text-[#2076C7] rounded-lg"
                >
                  View Enquiry
                </button >
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      {/* DETAIL MODAL OVERLAY */}
      <AnimatePresence>
        {selectedEnquiry && (
          <EnquiryDetailModal
            item={selectedEnquiry}
            onClose={() => setSelectedEnquiry(null)}
          />
        )}
      </AnimatePresence>
    </div>
  );
}