"use client";

import { useState, useEffect, useRef } from "react";
import { motion } from "framer-motion";
import {
  Send,
  User,
  ArrowLeft,
  ShieldCheck,
  Loader2,
  Search,
  AlertCircle,
  Clock,
  CheckSquare,
  Mail,
  LayoutDashboard,
  ShoppingCart,
  Inbox,
  LifeBuoy
} from "lucide-react";
import toast from "react-hot-toast";

import { AdminService, Ticket, TicketStats } from "../../services/unlistedadminservices";

interface TicketDetail {
  ticket: Ticket;
  messages: Array<{
    id: number;
    ticket_id: string;
    sender_type: "admin" | "customer";
    sender_id: number;
    message: string;
    created_at: string;
  }>;
}

export default function AdminTickets() {
  const [view, setView] = useState<"list" | "detail">("list");
  const [tickets, setTickets] = useState<Ticket[]>([]);
  const [stats, setStats] = useState<TicketStats | null>(null);
  const [selectedTicket, setSelectedTicket] = useState<TicketDetail | null>(null);
  const [loading, setLoading] = useState(true);
  const [actionLoading, setActionLoading] = useState(false);

  const [selectedFilter, setSelectedFilter] = useState("all");
  const [searchQuery, setSearchQuery] = useState("");
  const [replyMessage, setReplyMessage] = useState("");
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => { loadData(); }, []);

  useEffect(() => {
    if (view === "detail") {
      messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    }
  }, [selectedTicket, view]);

  const loadData = async () => {
    setLoading(true);
    try {
      const [ticketRes, statsRes] = await Promise.all([
        AdminService.getTickets(),
        AdminService.getTicketStats(),
      ]);
      setTickets(ticketRes.data || []);
      setStats(statsRes.data);
    } catch (error) {
      toast.error("Failed to load tickets");
    } finally {
      setLoading(false);
    }
  };

  const handleViewDetails = async (ticketId: string) => {
    setLoading(true);
    try {
      const res = await AdminService.getTicketById(ticketId);
      if (res.success) {
        setSelectedTicket(res.data as any);
        setView("detail");
      }
    } catch (err) {
      toast.error("Error loading details");
    } finally {
      setLoading(false);
    }
  };

  const handleStatusUpdate = async (ticketId: string, status: string) => {
    setActionLoading(true);
    try {
      if (status === "CLOSED") {
        await AdminService.closeTicket(ticketId, "COMPLETE");
      } else {
        await AdminService.updateTicketStatus(ticketId, status);
      }
      toast.success("Status updated");
      const res = await AdminService.getTicketById(ticketId);
      setSelectedTicket(res.data as any);
      loadData();
    } catch (err) {
      toast.error("Update failed");
    } finally {
      setActionLoading(false);
    }
  };

  const handleSendReply = async () => {
    if (!replyMessage.trim() || !selectedTicket) return;
    setActionLoading(true);
    try {
      const res = await AdminService.replyToTicket(
        selectedTicket.ticket.ticket_id,
        { message: replyMessage } as any
      );
      if (res.success) {
        toast.success("Reply sent");
        setReplyMessage("");
        const updated = await AdminService.getTicketById(selectedTicket.ticket.ticket_id);
        setSelectedTicket(updated.data as any);
      }
    } catch (err) {
      toast.error("Reply failed");
    } finally {
      setActionLoading(false);
    }
  };

  const getStatusStyles = (status?: string) => {
    const s = status?.toUpperCase();
    if (s === "OPEN") return "bg-blue-50 text-blue-600 border-blue-100";
    if (s === "IN_PROGRESS" || s === "IN PROGRESS") return "bg-amber-50 text-amber-600 border-amber-100";
    if (s === "CLOSED" || s === "RESOLVED" || s === "COMPLETED") return "bg-emerald-50 text-emerald-600 border-emerald-100";
    return "bg-slate-50 text-slate-400 border-slate-100";
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
      {/* MINIMALIST HEADER */}
      <motion.div
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-gradient-to-r from-[#2076C7] to-[#1CADA3] rounded-2xl p-5 mb-6 text-white shadow-lg"
      >
        <div className="flex items-center gap-3">
          <LifeBuoy className="w-6 h-6 text-white" />
          <div>
            <h2 className="text-xl font-bold">Support Admin</h2>
            <p className="text-[10px] opacity-80 uppercase tracking-widest font-black">Global Ticket Management</p>
          </div>
        </div>
      </motion.div>

      {view === "list" && (
        <>
          {/* COMPACT STATS CARDS (Small Card Boxes) */}
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 mb-8">
            {[
              { label: "Total", val: stats?.total_tickets, icon: Inbox, color: "text-blue-500", bg: "bg-blue-50" },
              { label: "Pending", val: stats?.open_tickets, icon: AlertCircle, color: "text-emerald-500", bg: "bg-emerald-50" },
              { label: "Active", val: stats?.in_progress_tickets, icon: Clock, color: "text-amber-500", bg: "bg-amber-50" },
              { label: "Closed", val: stats?.closed_tickets, icon: CheckSquare, color: "text-pink-500", bg: "bg-pink-50" },
            ].map((s, idx) => (
              <div key={idx} className="bg-white p-3.5 rounded-xl border border-slate-100 shadow-sm flex items-center gap-3">
                <div className={`${s.bg} ${s.color} p-2 rounded-lg`}>
                  <s.icon size={18} />
                </div>
                <div className="text-left">
                  <h3 className="text-lg font-black text-slate-800 leading-none">{s.val || 0}</h3>
                  <p className="text-slate-400 text-[9px] font-bold uppercase tracking-tighter mt-1">{s.label}</p>
                </div>
              </div>
            ))}
          </div>

          {/* CAPSULE TABS */}
          <div className="flex justify-center mb-6 overflow-x-auto pb-2 scrollbar-hide">
            <div className="p-1 bg-slate-100/80 backdrop-blur-sm rounded-full flex items-center gap-1 relative shadow-inner border border-slate-200/50 shrink-0">
              {[
                { id: "all", label: "All Tickets", icon: LayoutDashboard },
                { id: "Open", label: "Open", icon: ShoppingCart },
                { id: "IN_PROGRESS", label: "Progress", icon: Clock },
                { id: "CLOSED", label: "Closed", icon: CheckSquare },
              ].map((tab) => {
                const isActive = selectedFilter.toUpperCase() === tab.id.toUpperCase() || (selectedFilter === 'all' && tab.id === 'all');
                return (
                  <button
                    key={tab.id}
                    onClick={() => setSelectedFilter(tab.id)}
                    className={`relative px-5 py-2 rounded-full text-[10px] font-black uppercase tracking-wider transition-all duration-300 z-10 flex items-center gap-2 shrink-0 ${isActive ? "text-white" : "text-slate-500 hover:text-slate-700"}`}
                  >
                    {isActive && (
                      <motion.div
                        layoutId="activeTabAdmin"
                        className="absolute inset-0 bg-gradient-to-r from-[#2076C7] to-[#1CADA3] rounded-full -z-10 shadow-sm"
                        transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
                      />
                    )}
                    <span>{tab.label}</span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* SEARCH BAR */}
          <div className="mb-6 flex justify-center">
            <div className="relative w-full max-w-md">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
              <input
                type="text"
                placeholder="SEARCH BY CUSTOMER OR TICKET ID..."
                className="w-full pl-10 pr-4 py-2.5 bg-white border border-slate-200 rounded-xl shadow-sm focus:outline-none focus:ring-2 focus:ring-[#2076C7]/20 transition-all text-slate-800 text-[10px] font-black uppercase tracking-widest"
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
          </div>

          {/* DESKTOP TABLE VIEW */}
          <div className="hidden md:block bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
            <table className="w-full">
              <thead className="bg-gray-50/50 border-b border-gray-100">
                <tr>
                  <th className="px-6 py-4 text-left text-[11px] font-black text-gray-400 uppercase tracking-widest">Customer</th>
                  <th className="px-6 py-4 text-left text-[11px] font-black text-gray-400 uppercase tracking-widest">Subject</th>
                  <th className="px-6 py-4 text-center text-[11px] font-black text-gray-400 uppercase tracking-widest">Status</th>
                  <th className="px-6 py-4 text-center text-[11px] font-black text-gray-400 uppercase tracking-widest">Action</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-50">
                {tickets
                  .filter(t => (selectedFilter === 'all' || t.status.toUpperCase() === selectedFilter.toUpperCase()) && 
                    ((t.customer_name ?? "").toLowerCase().includes(searchQuery.toLowerCase()) || (t.ticket_id ?? "").toLowerCase().includes(searchQuery.toLowerCase())))
                  .map((ticket) => (
                    <tr key={ticket.id} className="hover:bg-gray-50/50 transition-colors">
                      <td className="px-6 py-4 text-left">
                        <div className="text-[11px] font-black text-slate-800 uppercase">{ticket.customer_name || "N/A"}</div>
                        <div className="text-[9px] text-slate-400 font-bold uppercase tracking-tighter">ID: {ticket.ticket_id}</div>
                      </td>
                      <td className="px-6 py-4 text-left">
                        <div className="text-[11px] font-bold text-slate-600 truncate max-w-[200px] uppercase">{ticket.subject}</div>
                        <div className="text-[9px] text-[#2076C7] font-black uppercase tracking-widest mt-0.5">{ticket.category}</div>
                      </td>
                      <td className="px-6 py-4 text-center">
                        <span className={`px-2.5 py-1 rounded-md text-[9px] font-black border tracking-widest uppercase ${getStatusStyles(ticket.status)}`}>
                          {ticket.status}
                        </span>
                      </td>
                      <td className="px-6 py-4 text-center">
                        <button onClick={() => handleViewDetails(ticket.ticket_id)} className="px-4 py-1.5 bg-gradient-to-r from-[#2076C7] to-[#1CADA3] text-white rounded-lg text-[9px] font-black uppercase tracking-widest active:scale-95 transition-all">View</button>
                      </td>
                    </tr>
                  ))}
              </tbody>
            </table>
          </div>

          {/* MOBILE LIST VIEW */}
          <div className="md:hidden space-y-3">
            {tickets
              .filter(t => (selectedFilter === 'all' || t.status.toUpperCase() === selectedFilter.toUpperCase()) && 
                ((t.customer_name ?? "").toLowerCase().includes(searchQuery.toLowerCase()) || (t.ticket_id ?? "").toLowerCase().includes(searchQuery.toLowerCase())))
              .map((ticket) => (
                <div key={ticket.id} className="bg-white p-4 rounded-xl shadow-sm border border-slate-100 text-left">
                  <div className="flex justify-between items-start mb-2">
                    <div className="min-w-0">
                      <h3 className="font-black text-slate-800 text-[11px] uppercase truncate">{ticket.customer_name || "N/A"}</h3>
                      <p className="text-[9px] font-bold text-slate-400 mt-0.5 uppercase">ID: {ticket.ticket_id}</p>
                    </div>
                    <span className={`px-1.5 py-0.5 rounded text-[8px] font-black uppercase border ${getStatusStyles(ticket.status)}`}>{ticket.status}</span>
                  </div>
                  <p className="text-[10px] text-slate-500 font-bold mb-3 uppercase truncate">{ticket.subject}</p>
                  <button onClick={() => handleViewDetails(ticket.ticket_id)} className="w-full py-2 bg-slate-50 text-[#2076C7] rounded-lg text-[10px] font-black uppercase border border-slate-100">View MSG</button>
                </div>
              ))}
          </div>
        </>
      )}

      {/* COMPACT DETAIL VIEW */}
      {view === "detail" && selectedTicket && (
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="grid grid-cols-1 lg:grid-cols-3 gap-5">
          <div className="lg:col-span-1">
            <div className="bg-white rounded-2xl p-5 shadow-sm border border-slate-100 text-left">
              <button onClick={() => setView("list")} className="flex items-center gap-1.5 text-slate-400 text-[10px] font-black mb-6 uppercase tracking-widest">
                <ArrowLeft size={14} /> Back to list
              </button>
              <div className="p-4 bg-slate-50 rounded-xl mb-4 border border-slate-100">
                <p className="text-[9px] font-black text-slate-400 uppercase tracking-widest mb-1.5">Customer Profile</p>
                <div className="text-[11px] font-black text-slate-800 uppercase">{selectedTicket.ticket.customer_name}</div>
                <div className="text-[10px] text-slate-500 font-bold truncate mt-1 lowercase flex items-center gap-1"><Mail size={10}/> {selectedTicket.ticket.customer_email}</div>
              </div>
              <div className="grid grid-cols-1 gap-2">
                <button onClick={() => handleStatusUpdate(selectedTicket.ticket.ticket_id, 'IN_PROGRESS')} className="py-2.5 bg-amber-50 text-amber-600 rounded-lg text-[9px] font-black uppercase border border-amber-100">Active Progress</button>
                <button onClick={() => handleStatusUpdate(selectedTicket.ticket.ticket_id, 'CLOSED')} className="py-2.5 bg-emerald-50 text-emerald-600 rounded-lg text-[9px] font-black uppercase border border-emerald-100">Resolve Case</button>
              </div>
            </div>
          </div>

          <div className="lg:col-span-2 flex flex-col h-[550px] bg-white rounded-2xl shadow-sm border border-slate-100 overflow-hidden">
            <div className="px-5 py-4 border-b border-slate-50 flex items-center justify-between sticky top-0 bg-white z-10">
              <div className="text-left min-w-0">
                <h2 className="text-[11px] font-black text-slate-800 uppercase truncate max-w-[250px] tracking-tight">{selectedTicket.ticket.subject}</h2>
                <div className="flex items-center gap-2 mt-0.5">
                  <div className={`w-1.5 h-1.5 rounded-full ${selectedTicket.ticket.status === 'CLOSED' ? 'bg-slate-300' : 'bg-emerald-500 animate-pulse'}`} />
                  <p className="text-[8px] font-black text-slate-400 uppercase tracking-widest">{selectedTicket.ticket.ticket_id}</p>
                </div>
              </div>
            </div>

            <div className="flex-1 overflow-y-auto p-5 space-y-5 bg-slate-50/30">
              <div className="flex gap-3 text-left">
                <div className="w-8 h-8 rounded-lg bg-blue-50 text-[#2076C7] flex items-center justify-center shrink-0 border border-blue-100 shadow-sm"><User size={16}/></div>
                <div className="bg-white border border-slate-100 rounded-xl rounded-tl-none p-4 shadow-sm max-w-[90%]">
                  <p className="text-[11px] text-slate-600 font-bold leading-relaxed">{selectedTicket.ticket.description}</p>
                  <span className="text-[8px] text-slate-400 mt-2.5 block font-black uppercase tracking-widest">{new Date(selectedTicket.ticket.created_at).toLocaleString()}</span>
                </div>
              </div>

              {selectedTicket.messages.map((msg) => {
                const isAdmin = msg.sender_type === "admin";
                return (
                  <div key={msg.id} className={`flex gap-3 ${isAdmin ? "flex-row-reverse" : "justify-start text-left"}`}>
                    <div className={`w-8 h-8 rounded-lg flex items-center justify-center shrink-0 shadow-sm ${isAdmin ? "bg-[#2076C7] text-white" : "bg-white border border-slate-100 text-slate-400"}`}>
                      {isAdmin ? <ShieldCheck size={16}/> : <User size={16}/>}
                    </div>
                    <div className={`p-4 max-w-[85%] rounded-xl shadow-sm ${isAdmin ? "bg-[#2076C7] text-white rounded-tr-none" : "bg-white border border-slate-100 rounded-tl-none text-left"}`}>
                      <p className={`text-[11px] font-bold leading-relaxed ${isAdmin ? "text-white" : "text-slate-600"}`}>{msg.message}</p>
                      <span className={`text-[7px] mt-1.5 block font-black uppercase tracking-widest opacity-60 ${isAdmin ? "text-white" : "text-slate-400"}`}>{new Date(msg.created_at).toLocaleTimeString()}</span>
                    </div>
                  </div>
                );
              })}
              <div ref={messagesEndRef} />
            </div>

            {selectedTicket.ticket.status !== "CLOSED" && (
              <div className="p-4 bg-white border-t border-slate-100">
                <div className="relative">
                  <textarea 
                    value={replyMessage}
                    onChange={(e) => setReplyMessage(e.target.value)}
                    placeholder="TYPE RESPONSE..."
                    className="w-full p-4 pr-14 bg-slate-50 border border-slate-200 rounded-xl text-[10px] font-black tracking-widest text-slate-700 outline-none focus:bg-white transition-all resize-none"
                    rows={2}
                  />
                  <button onClick={handleSendReply} disabled={actionLoading || !replyMessage.trim()} className="absolute right-3 bottom-3 p-2.5 bg-[#2076C7] text-white rounded-lg shadow-lg disabled:opacity-30 active:scale-90 transition-all">
                    {actionLoading ? <Loader2 size={16} className="animate-spin" /> : <Send size={16} />}
                  </button>
                </div>
              </div>
            )}
          </div>
        </motion.div>
      )}
    </div>
  );
}