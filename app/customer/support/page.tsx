"use client";

import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Send,
  ArrowLeft,
  ShieldCheck,
  Loader2,
  Search,
  MessageSquare,
  Plus,
  Clock,
  CheckSquare,
  ShoppingCart,
  LayoutDashboard,
} from "lucide-react";
import toast from "react-hot-toast";
import customerService from "../../services/customerService";

/* ---------------- TYPES ---------------- */
interface CustomerMessage {
  id: number;
  ticket_id: string;
  sender_type: "admin" | "customer";
  sender_id: number;
  message: string;
  created_at: string;
}

interface CustomerTicket {
  id: string;
  ticket_id: string;
  customer_id: string;
  category: string;
  product_type: string;
  reference_id: string | null;
  issue_type: string;
  severity: string;
  subject: string;
  description: string;
  status: string;
  created_at: string;
  updated_at: string;
  closed_at?: string | null;
}

interface TicketDetailResponse {
  status: boolean;
  ticket: CustomerTicket;
  messages: CustomerMessage[];
}

export default function HelpSupport() {
  const [view, setView] = useState<"list" | "create" | "detail">("list");
  const [tickets, setTickets] = useState<CustomerTicket[]>([]);
  const [categories, setCategories] = useState<
    { id: number; category_name: string }[]
  >([]);
  const [selectedDetail, setSelectedDetail] =
    useState<TicketDetailResponse | null>(null);
  const [loading, setLoading] = useState(true);
  const [actionLoading, setActionLoading] = useState(false);
  const [selectedFilter, setSelectedFilter] = useState("all");
  const [searchQuery, setSearchQuery] = useState("");
  const [replyMessage, setReplyMessage] = useState("");

  const [formData, setFormData] = useState({
    category: "",
    product_type: "",
    reference_id: "N/A",
    issue_type: "General",
    severity: "Medium",
    subject: "",
    description: "",
  });

  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    loadInitialData();
  }, []);

  useEffect(() => {
    if (view === "detail")
      messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [selectedDetail, view]);

  const loadInitialData = async () => {
    setLoading(true);
    try {
      const [ticketRes, catRes] = await Promise.all([
        customerService.getTicketList(),
        customerService.getSupportCategories(),
      ]);
      setTickets(ticketRes.data || []);
      setCategories(catRes.data || []);
    } catch (error) {
      toast.error("Failed to load support data");
    } finally {
      setLoading(false);
    }
  };

  const stats = {
    all: tickets.length,
    open: tickets.filter((t) => t.status.toUpperCase() === "OPEN").length,
    progress: tickets.filter(
      (t) =>
        t.status.toUpperCase() === "IN_PROGRESS" ||
        t.status.toUpperCase() === "IN PROGRESS",
    ).length,
    closed: tickets.filter(
      (t) =>
        t.status.toUpperCase() === "CLOSED" ||
        t.status.toUpperCase() === "RESOLVED",
    ).length,
  };

  const handleViewDetails = async (ticketId: string) => {
    setLoading(true);
    try {
      const res = await customerService.getTicketDetails(ticketId);
      if (res.status) {
        setSelectedDetail(res);
        setView("detail");
      }
    } catch (err) {
      toast.error("Error loading ticket");
    } finally {
      setLoading(false);
    }
  };

  const handleCreateTicket = async (e: React.FormEvent) => {
    e.preventDefault();
    setActionLoading(true);
    try {
      const res = await customerService.createTicket(formData);
      if (res.status) {
        toast.success("Ticket raised successfully");
        setView("list");
        loadInitialData();
        setFormData({
          category: "",
          product_type: "",
          reference_id: "N/A",
          issue_type: "General",
          severity: "Medium",
          subject: "",
          description: "",
        });
      }
    } catch (err) {
      toast.error("Failed to create ticket");
    } finally {
      setActionLoading(false);
    }
  };

  const handleSendReply = async () => {
    if (!replyMessage.trim() || !selectedDetail) return;
    setActionLoading(true);
    try {
      await customerService.replyToTicket({
        ticket_id: selectedDetail.ticket.ticket_id,
        message: replyMessage,
        status: selectedDetail.ticket.status,
      } as any);
      setReplyMessage("");
      handleViewDetails(selectedDetail.ticket.ticket_id);
    } catch (err) {
      toast.error("Failed to send reply");
    } finally {
      setActionLoading(false);
    }
  };

  const handleCloseTicket = async () => {
    if (!selectedDetail) return;
    setActionLoading(true);
    try {
      await customerService.replyToTicket({
        ticket_id: selectedDetail.ticket.ticket_id,
        message: "Resolved by customer",
        status: "CLOSED",
      } as any);
      toast.success("Ticket closed");
      handleViewDetails(selectedDetail.ticket.ticket_id);
      loadInitialData();
    } catch (err) {
      toast.error("Error closing ticket");
    } finally {
      setActionLoading(false);
    }
  };

  if (loading && view === "list") {
    return (
      <div className="flex items-center justify-center min-h-screen bg-[#f8fafc]">
        <div className="w-10 h-10 border-4 border-[#2076C7] border-t-transparent rounded-full animate-spin"></div>
      </div>
    );
  }

  return (
    <div className="flex-1 p-4 sm:p-6 bg-[#f8fafc] min-h-screen font-sans">
      {/* DESKTOP HEADER */}
      <div className="hidden md:block">
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-gradient-to-r from-[#2076C7] to-[#1CADA3] rounded-2xl p-6 mb-6 text-white shadow-lg"
        >
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <ShieldCheck className="w-8 h-8 text-white" />
              <div>
                <h2 className="text-2xl font-bold">Support Center</h2>
                <p className="text-sm opacity-80">
                  Raise tickets and track your requests
                </p>
              </div>
            </div>
            {view === "list" && (
              <button
                onClick={() => setView("create")}
                className="bg-white text-[#2076C7] px-6 py-2.5 rounded-xl font-bold text-sm shadow-sm flex items-center gap-2 hover:bg-opacity-95 transition-all active:scale-95"
              >
                <Plus size={18} /> Raise Ticket
              </button>
            )}
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
            <div className="flex items-center gap-2">
              <ShieldCheck className="w-5 h-5 text-white" />
              <h2 className="text-xl font-bold">Support</h2>
            </div>
            {view === "list" && (
              <button
                onClick={() => setView("create")}
                className="bg-white/20 p-2 rounded-lg text-white"
              >
                <Plus size={20} />
              </button>
            )}
          </div>
        </motion.div>
      </div>

      {view === "list" && (
        <>
          {/* MOBILE CATEGORY GRID (Matched to Padding Code) */}
          <div className="md:hidden mb-6">
            <div className="bg-slate-100/60 backdrop-blur-sm rounded-2xl p-1.5 border border-slate-200/50 shadow-inner">
              <div className="grid grid-cols-2 gap-1.5">
                {[
                  { id: "all", name: "All", icon: LayoutDashboard, count: stats.all },
                  { id: "Open", name: "Open", icon: ShoppingCart, count: stats.open },
                  { id: "IN_PROGRESS", name: "Progress", icon: Clock, count: stats.progress },
                  { id: "CLOSED", name: "Closed", icon: CheckSquare, count: stats.closed },
                ].map((cat) => {
                  const isActive = selectedFilter === cat.id;
                  const Icon = cat.icon;
                  return (
                    <button
                      key={cat.id}
                      onClick={() => setSelectedFilter(cat.id)}
                      className={`relative flex flex-col items-center justify-center gap-1 py-2 px-1 rounded-xl transition-all duration-300 z-10 active:scale-95 ${
                        isActive ? "text-white shadow-sm" : "text-slate-400"
                      }`}
                    >
                      {isActive && (
                        <motion.div
                          layoutId="activeTabMobileSupport"
                          className="absolute inset-0 bg-gradient-to-r from-[#2076C7] to-[#1CADA3] rounded-xl -z-10"
                        />
                      )}
                      <Icon size={18} strokeWidth={isActive ? 2.5 : 1.5} />
                      <span className="text-[10px] font-bold uppercase tracking-tight">
                        {cat.name} ({cat.count})
                      </span>
                    </button>
                  );
                })}
              </div>
            </div>
          </div>

          {/* DESKTOP TABS (Matched to Padding Code) */}
          <div className="hidden md:flex justify-center mb-6 overflow-x-auto pb-2 scrollbar-hide">
            <div className="p-1 bg-slate-100/80 backdrop-blur-sm rounded-full flex items-center gap-1 relative shadow-inner border border-slate-200/50 shrink-0">
              {[
                { id: "all", label: "All Tickets", icon: LayoutDashboard, count: stats.all },
                { id: "Open", label: "Open Tickets", icon: ShoppingCart, count: stats.open },
                { id: "IN_PROGRESS", label: "In Progress", icon: Clock, count: stats.progress },
                { id: "CLOSED", label: "Resolved", icon: CheckSquare, count: stats.closed },
              ].map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setSelectedFilter(tab.id)}
                  className={`relative px-5 py-2 rounded-full text-xs font-bold uppercase tracking-wider transition-all duration-300 z-10 flex items-center gap-2 shrink-0 ${
                    selectedFilter === tab.id ? "text-white" : "text-slate-500 hover:text-slate-700"
                  }`}
                >
                  {selectedFilter === tab.id && (
                    <motion.div
                      layoutId="activeTabSupport"
                      className="absolute inset-0 bg-gradient-to-r from-[#2076C7] to-[#1CADA3] rounded-full -z-10 shadow-sm"
                      transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
                    />
                  )}
                  <span>{tab.label}</span>
                  <span
                    className={`px-1.5 py-0.5 rounded-full text-[10px] ${
                      selectedFilter === tab.id ? "bg-white/20 text-white" : "bg-slate-200 text-slate-600"
                    }`}
                  >
                    {tab.count}
                  </span>
                </button>
              ))}
            </div>
          </div>

          {/* SEARCH BAR (Matched to Padding Code) */}
          <div className="mb-6 flex justify-center">
            <div className="relative w-full max-w-md">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
              <input
                type="text"
                placeholder="Search by subject or ID..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-10 pr-4 py-2.5 bg-white border border-slate-200 rounded-2xl shadow-sm focus:outline-none focus:ring-2 focus:ring-[#2076C7]/20 transition-all text-slate-800 text-sm"
              />
            </div>
          </div>

          {/* TABLE VIEW (Matched to Padding Code) */}
          <div className="hidden md:block bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
            <table className="w-full">
              <thead>
                <tr className="border-b border-gray-100 bg-gray-50/50">
                  <th className="px-6 py-4 text-left text-[11px] font-bold text-gray-400 uppercase tracking-wider">
                    Subject & Ticket ID
                  </th>
                  <th className="px-6 py-4 text-center text-[11px] font-bold text-gray-400 uppercase tracking-wider">
                    Status
                  </th>
                  <th className="px-6 py-4 text-center text-[11px] font-bold text-gray-400 uppercase tracking-wider">
                    Date Raised
                  </th>
                  <th className="px-6 py-4 text-center text-[11px] font-bold text-gray-400 uppercase tracking-wider">
                    Action
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-50">
                {tickets
                  .filter((t) => (selectedFilter === "all" || t.status.toUpperCase() === selectedFilter.toUpperCase()) && (t.subject.toLowerCase().includes(searchQuery.toLowerCase()) || t.ticket_id.toLowerCase().includes(searchQuery.toLowerCase())))
                  .map((ticket) => (
                    <tr key={ticket.id} className="hover:bg-gray-50 transition-colors">
                      <td className="px-6 py-4">
                        <div className="flex items-center space-x-4">
                          <div className="w-10 h-10 rounded-lg bg-blue-50 flex items-center justify-center text-[#2076C7]">
                            <MessageSquare size={18} />
                          </div>
                          <div className="min-w-0">
                            <div className="text-sm font-semibold text-gray-800 truncate uppercase">
                              {ticket.subject}
                            </div>
                            <div className="text-[11px] text-gray-400">
                              ID: {ticket.ticket_id}
                            </div>
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4 text-center">
                        <span className={`px-3 py-1 rounded-md text-[10px] font-bold uppercase border ${
                          ticket.status.toUpperCase() === 'OPEN' ? 'bg-blue-50 text-blue-600 border-blue-100' : 'bg-emerald-50 text-emerald-600 border-emerald-100'
                        }`}>
                          {ticket.status}
                        </span>
                      </td>
                      <td className="px-6 py-4 text-center text-xs font-medium text-gray-600">
                        {new Date(ticket.created_at).toLocaleDateString("en-GB")}
                      </td>
                      <td className="px-6 py-4 text-center">
                        <button
                          onClick={() => handleViewDetails(ticket.ticket_id)}
                          className="px-4 py-1.5 bg-gradient-to-r from-[#2076C7] to-[#1CADA3] text-white rounded-lg font-bold text-[10px] uppercase tracking-wider shadow-sm active:scale-95 transition-all"
                        >
                          View Details
                        </button>
                      </td>
                    </tr>
                  ))}
              </tbody>
            </table>
          </div>

          {/* MOBILE CARDS (Matched to Padding Code) */}
          <div className="md:hidden space-y-4">
            {tickets
              .filter((t) => (selectedFilter === "all" || t.status.toUpperCase() === selectedFilter.toUpperCase()) && (t.subject.toLowerCase().includes(searchQuery.toLowerCase()) || t.ticket_id.toLowerCase().includes(searchQuery.toLowerCase())))
              .map((ticket) => (
                <motion.div
                  key={ticket.id}
                  layout
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="bg-white rounded-2xl p-5 shadow-sm border border-slate-100"
                >
                  <div className="flex justify-between items-start mb-4">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-xl bg-blue-50 flex items-center justify-center text-[#2076C7]">
                        <MessageSquare size={18} />
                      </div>
                      <div>
                        <h3 className="font-bold text-slate-800 text-sm uppercase">
                          {ticket.subject}
                        </h3>
                        <p className="text-[10px] text-slate-400 font-bold">
                          {ticket.ticket_id}
                        </p>
                      </div>
                    </div>
                    <span className="px-2 py-0.5 rounded text-[8px] font-black uppercase bg-blue-50 text-blue-600 border border-blue-100">
                      {ticket.status}
                    </span>
                  </div>
                  <div className="flex justify-between items-center pt-4 border-t border-slate-50">
                    <span className="text-[10px] font-bold text-slate-400 uppercase">
                      {new Date(ticket.created_at).toLocaleDateString("en-GB")}
                    </span>
                    <button
                      onClick={() => handleViewDetails(ticket.ticket_id)}
                      className="px-4 py-2 bg-gradient-to-r from-[#2076C7] to-[#1CADA3] text-white rounded-lg font-black text-[9px] tracking-widest"
                    >
                      VIEW MESSAGE
                    </button>
                  </div>
                </motion.div>
              ))}
          </div>
        </>
      )}

      {/* CREATE TICKET VIEW */}
      {view === "create" && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="max-w-2xl mx-auto w-full"
        >
          <div className="bg-white rounded-3xl border border-slate-100 shadow-xl overflow-hidden">
            <div className="p-4 md:p-6 bg-slate-50 border-b border-slate-100 flex items-center gap-4">
              <button
                onClick={() => setView("list")}
                className="p-2 bg-white rounded-xl shadow-sm text-slate-400"
              >
                <ArrowLeft size={18} />
              </button>
              <h3 className="font-black text-[10px] md:text-xs tracking-widest text-slate-700 uppercase">
                Raise New Ticket
              </h3>
            </div>
            <form
              onSubmit={handleCreateTicket}
              className="p-5 md:p-8 space-y-4 md:space-y-6"
            >
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6">
                <div className="space-y-1">
                  <label className="text-[9px] md:text-[10px] font-black text-slate-700 uppercase tracking-widest ml-1">
                    CATEGORY
                  </label>
                  <select
                    required
                    className="w-full p-3 md:p-4 bg-slate-50 border border-slate-200 rounded-xl md:rounded-2xl text-xs text-slate-600 font-bold outline-none appearance-none"
                    value={formData.category}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        category: e.target.value,
                        product_type: e.target.value,
                      })
                    }
                  >
                    <option value="">SELECT</option>
                    {categories.map((c) => (
                      <option key={c.id} value={c.category_name}>
                        {c.category_name}
                      </option>
                    ))}
                  </select>
                </div>
                <div className="space-y-1">
                  <label className="text-[9px] md:text-[10px] font-black text-slate-700 uppercase tracking-widest ml-1">
                    PRIORITY
                  </label>
                  <select
                    className="w-full p-3 md:p-4 bg-slate-50 border border-slate-200 rounded-xl md:rounded-2xl text-xs text-slate-600 font-bold outline-none appearance-none"
                    value={formData.severity}
                    onChange={(e) =>
                      setFormData({ ...formData, severity: e.target.value })
                    }
                  >
                    <option value="Low">LOW</option>
                    <option value="Medium">MEDIUM</option>
                    <option value="High">HIGH</option>
                  </select>
                </div>
              </div>
              <div className="space-y-1">
                <label className="text-[9px] md:text-[10px] font-black text-slate-700 uppercase tracking-widest ml-1">
                  SUBJECT
                </label>
                <input
                  required
                  type="text"
                  placeholder="Enter Subject"
                  className="w-full p-3 md:p-4 bg-slate-50 border border-slate-200 rounded-xl md:rounded-2xl text-xs text-slate-600 font-bold outline-none"
                  value={formData.subject}
                  onChange={(e) =>
                    setFormData({ ...formData, subject: e.target.value })
                  }
                />
              </div>
              <div className="space-y-1">
                <label className="text-[9px] md:text-[10px] font-black text-slate-700 uppercase tracking-widest ml-1">
                  DESCRIPTION
                </label>
                <textarea
                  required
                  rows={4}
                  placeholder="Enter Description"
                  className="w-full p-3 md:p-4 bg-slate-50 border border-slate-200 rounded-xl md:rounded-2xl text-xs text-slate-600 font-bold outline-none resize-none"
                  value={formData.description}
                  onChange={(e) =>
                    setFormData({ ...formData, description: e.target.value })
                  }
                />
              </div>
              <button
                disabled={actionLoading}
                className="w-full py-4 bg-gradient-to-r from-[#2076C7] to-[#1CADA3] text-white rounded-xl md:rounded-2xl font-black text-[10px] tracking-widest shadow-lg active:scale-[0.98]"
              >
                {actionLoading ? (
                  <Loader2 className="animate-spin mx-auto" />
                ) : (
                  "SUBMIT TICKET"
                )}
              </button>
            </form>
          </div>
        </motion.div>
      )}

      {/* DETAIL VIEW */}
      {view === "detail" && selectedDetail && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="flex flex-col h-[600px] md:h-[700px] bg-white rounded-3xl border border-slate-100 shadow-sm overflow-hidden"
        >
          <div className="px-4 py-3 md:px-6 md:py-4 border-b border-slate-50 flex items-center justify-between sticky top-0 bg-white z-10">
            <div className="flex items-center gap-3">
              <button
                onClick={() => setView("list")}
                className="p-2 bg-slate-50 rounded-lg text-slate-400"
              >
                <ArrowLeft size={16} />
              </button>
              <div>
                <h2 className="font-black text-[10px] md:text-xs tracking-widest text-slate-800 uppercase truncate max-w-[180px] md:max-w-none">
                  {selectedDetail.ticket.subject}
                </h2>
                <p className="text-[9px] text-slate-400 font-bold">{selectedDetail.ticket.ticket_id}</p>
              </div>
            </div>
            <span className="px-3 py-1 rounded-lg bg-blue-50 text-[#2076C7] text-[9px] font-black uppercase border border-blue-100">
              {selectedDetail.ticket.status}
            </span>
          </div>

          <div className="flex-1 overflow-y-auto p-4 md:p-6 space-y-4 bg-slate-50/30">
            <div className="flex flex-col items-end">
              <div className="bg-gradient-to-br from-[#2076C7] to-[#1CADA3] text-white p-4 rounded-[16px] rounded-tr-none max-w-[90%] shadow-md">
                <p className="text-xs font-medium">
                  {selectedDetail.ticket.description}
                </p>
                <p className="text-[8px] font-bold uppercase mt-2 opacity-60">
                  {new Date(selectedDetail.ticket.created_at).toLocaleString()}
                </p>
              </div>
            </div>

            {selectedDetail.messages.map((msg) => (
              <div
                key={msg.id}
                className={`flex ${msg.sender_type === "admin" ? "justify-start" : "justify-end"}`}
              >
                <div
                  className={`p-4 max-w-[85%] rounded-[16px] shadow-sm ${
                    msg.sender_type === "admin"
                      ? "bg-white border border-slate-100 rounded-bl-none text-slate-700"
                      : "bg-[#2076C7] text-white rounded-tr-none"
                  }`}
                >
                  <p className="text-xs font-medium">{msg.message}</p>
                  <p
                    className={`text-[8px] font-bold uppercase mt-2 opacity-50 ${
                      msg.sender_type === "admin"
                        ? "text-slate-400"
                        : "text-blue-100"
                    }`}
                  >
                    {new Date(msg.created_at).toLocaleTimeString()}
                  </p>
                </div>
              </div>
            ))}
            <div ref={messagesEndRef} />
          </div>

          {selectedDetail.ticket.status !== "CLOSED" && (
            <div className="p-3 md:p-4 bg-white border-t border-slate-50">
              <div className="flex gap-2">
                <input
                  value={replyMessage}
                  onChange={(e) => setReplyMessage(e.target.value)}
                  placeholder="TYPE MESSAGE..."
                  className="flex-1 p-3 md:p-4 bg-slate-50 border border-slate-200 text-gray-600 rounded-xl md:rounded-2xl text-[10px] font-bold outline-none focus:ring-2 focus:ring-[#2076C7]/10 transition-all"
                />
                <button
                  onClick={handleSendReply}
                  className="p-3 md:p-4 bg-[#2076C7] text-white rounded-xl md:rounded-2xl shadow-lg active:scale-95 transition-all"
                >
                  <Send size={16} />
                </button>
              </div>
              <button
                onClick={handleCloseTicket}
                className="w-full mt-3 py-2.5 border border-emerald-100 bg-emerald-50 text-emerald-600 rounded-xl text-[9px] font-black uppercase tracking-widest hover:bg-emerald-100 transition-colors"
              >
                Close Ticket
              </button>
            </div>
          )}
        </motion.div>
      )}
    </div>
  );
}