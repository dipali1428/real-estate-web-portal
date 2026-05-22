"use client";

import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
    Send, User, CheckCircle2, ArrowLeft, ShieldCheck, 
    Loader2, Search, AlertCircle, Clock, CheckSquare, 
    Mail,LayoutDashboard, 
    ShoppingCart, Inbox, LifeBuoy
} from 'lucide-react';
import toast from 'react-hot-toast';

import { AdminService, Ticket, TicketStats } from '../../services/unlistedadminservices';

interface TicketDetail {
  ticket: Ticket;
  messages: Array<{
    id: number;
    ticket_id: string;
    sender_type: 'admin' | 'customer';
    sender_id: number;
    message: string;
    created_at: string;
  }>;
}

export default function AdminTickets() {
  const [view, setView] = useState<'list' | 'detail'>('list');
  const [tickets, setTickets] = useState<Ticket[]>([]);
  const [stats, setStats] = useState<TicketStats | null>(null);
  const [selectedTicket, setSelectedTicket] = useState<TicketDetail | null>(null);
  const [loading, setLoading] = useState(true);
  const [actionLoading, setActionLoading] = useState(false);

  const [selectedFilter, setSelectedFilter] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [replyMessage, setReplyMessage] = useState('');
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => { loadData(); }, []);

  useEffect(() => {
    if (view === 'detail') {
      messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    }
  }, [selectedTicket, view]);

  const loadData = async () => {
    setLoading(true);
    try {
      const [ticketRes, statsRes] = await Promise.all([
        AdminService.getTickets(),
        AdminService.getTicketStats()
      ]);
      setTickets(ticketRes.data || []);
      setStats(statsRes.data);
    } catch (error) { 
      toast.error('Failed to load tickets'); 
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
        setView('detail');
      }
    } catch (err) { 
      toast.error('Error loading details'); 
    } finally { 
      setLoading(false); 
    }
  };

  const handleStatusUpdate = async (ticketId: string, status: string) => {
    setActionLoading(true);
    try {
      if (status === 'CLOSED') {
        await AdminService.closeTicket(ticketId, "COMPLETE");
      } else {
        await AdminService.updateTicketStatus(ticketId, status);
      }
      toast.success('Status updated');
      const res = await AdminService.getTicketById(ticketId);
      setSelectedTicket(res.data as any);
      loadData();
    } catch (err) { 
      toast.error('Update failed'); 
    } finally { 
      setActionLoading(false); 
    }
  };

  const handleSendReply = async () => {
    if (!replyMessage.trim() || !selectedTicket) return;
    setActionLoading(true);
    try {
      const res = await AdminService.replyToTicket(selectedTicket.ticket.ticket_id, {
        message: replyMessage
      } as any);
      if (res.success) {
        toast.success('Reply sent');
        setReplyMessage('');
        const updated = await AdminService.getTicketById(selectedTicket.ticket.ticket_id);
        setSelectedTicket(updated.data as any);
      }
    } catch (err) { 
      toast.error('Reply failed'); 
    } finally { 
      setActionLoading(false); 
    }
  };

  const getStatusStyles = (status?: string) => {
    const s = status?.toUpperCase();
    if (s === 'OPEN') return 'bg-blue-50 text-blue-600 border-blue-100';
    if (s === 'IN_PROGRESS' || s === 'IN PROGRESS') return 'bg-amber-50 text-amber-600 border-amber-100';
    if (s === 'CLOSED' || s === 'RESOLVED' || s === 'COMPLETED') return 'bg-emerald-50 text-emerald-600 border-emerald-100';
    return 'bg-slate-50 text-slate-400 border-slate-100';
  };

  if (loading && view === 'list') {
    return (
      <div className="flex items-center justify-center min-h-screen bg-[#f8fafc]">
        <div className="w-10 h-10 border-4 border-[#2076C7] border-t-transparent rounded-full animate-spin"></div>
      </div>
    );
  }

  return (
    <div className="flex-1 p-4 md:p-8 bg-[#f8fafc] min-h-screen font-sans">
      <div className="max-w-7xl mx-auto">
        
        {/* --- HEADER --- */}
        <motion.div 
            initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }}
            className="bg-gradient-to-r from-[#2076C7] to-[#1CADA3] rounded-2xl p-6 md:p-8 mb-6 text-white shadow-lg flex flex-col md:flex-row items-center justify-between gap-4 text-left"
        >
            <div className="flex items-center gap-4 w-full md:w-auto">
                <div className="p-2.5 bg-white/20 rounded-full shrink-0">
                    <LifeBuoy className="w-6 h-6 md:w-8 md:h-8 text-white" />
                </div>
                <div>
                    <h2 className="text-xl md:text-2xl font-bold leading-tight">Support Dashboard</h2>
                    <p className="text-[10px] md:text-sm opacity-90 mt-1 font-medium tracking-widest">Global Customer Ticket Management</p>
                </div>
            </div>
        </motion.div>

        {view === 'list' && (
          <>
            {/* --- STATS CARDS --- */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
                {[
                    { label: 'Total Tickets', val: stats?.total_tickets, footer: 'ALL TIME', icon: Inbox, color: 'bg-[#3B82F6]' },
                    { label: 'Pending', val: stats?.open_tickets, footer: 'AWAITING ACTION', icon: AlertCircle, color: 'bg-[#10B981]' },
                    { label: 'In Progress', val: stats?.in_progress_tickets, footer: 'ACTIVE CHATS', icon: Clock, color: 'bg-[#F59E0B]' },
                    { label: 'Resolved', val: stats?.closed_tickets, footer: 'CLOSED CASES', icon: CheckSquare, color: 'bg-[#EC4899]' }
                ].map((s, idx) => (
                    <div key={idx} className="bg-white p-6 rounded-2xl border border-slate-100 shadow-sm flex flex-col items-start gap-4">
                        <div className={`${s.color} p-3 rounded-xl text-white shadow-sm`}><s.icon size={24} /></div>
                        <div className="space-y-1">
                            <p className="text-slate-400 text-sm font-medium">{s.label}</p>
                            <h3 className="text-3xl font-black text-slate-800">{s.val || 0}</h3>
                        </div>
                        <div className="flex items-center gap-1.5 text-[#10B981]">
                            <CheckCircle2 size={14} className="stroke-[3]" />
                            <span className="text-[10px] font-black uppercase tracking-widest">{s.footer}</span>
                        </div>
                    </div>
                ))}
            </div>

            {/* --- TABS --- */}
            <div className="flex mb-8 justify-center">
                <div className="p-1.5 bg-slate-100/80 backdrop-blur-sm rounded-xl md:rounded-full flex flex-col md:flex-row items-stretch md:items-center gap-1 relative shadow-inner border border-slate-200/50 w-full md:w-auto">
                    {[
                        { id: 'all', label: 'All Tickets', icon: LayoutDashboard },
                        { id: 'Open', label: 'Open', icon: ShoppingCart },
                        { id: 'In Progress', label: 'In Progress', icon: Clock },
                        { id: 'Closed', label: 'Closed', icon: CheckSquare }
                    ].map(tab => {
                        const filterKey = tab.id === 'In Progress' ? 'IN_PROGRESS' : tab.id === 'all' ? 'all' : tab.id;
                        const isActive = selectedFilter.toUpperCase() === (filterKey === 'all' ? 'ALL' : filterKey.toUpperCase());
                        return (
                            <button
                                key={tab.id}
                                onClick={() => setSelectedFilter(filterKey)}
                                className={`relative px-5 py-2.5 md:py-2 rounded-lg md:rounded-full text-[10px] md:text-xs font-black uppercase tracking-widest transition-all duration-300 z-10 flex items-center justify-center md:justify-start gap-2 shrink-0 ${isActive ? 'text-white' : 'text-slate-500 hover:text-slate-700'}`}
                            >
                                {isActive && (
                                    <motion.div layoutId="activeTabAdmin" className="absolute inset-0 bg-gradient-to-r from-[#2076C7] to-[#1CADA3] rounded-lg md:rounded-full -z-10 shadow-sm" transition={{ type: "spring", bounce: 0.2, duration: 0.6 }} />
                                )}
                                <tab.icon size={14} />
                                {tab.label}
                            </button>
                        );
                    })}
                </div>
            </div>

            {/* --- SEARCH --- */}
            <div className="max-w-2xl mx-auto mb-8 relative">
                <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                <input 
                    type="text" placeholder="SEARCH BY CUSTOMER OR TICKET ID..." 
                    className="w-full pl-12 pr-4 py-3 md:py-4 bg-white border border-slate-100 rounded-[16px] md:rounded-[20px] shadow-sm focus:outline-none focus:ring-2 focus:ring-[#2076C7]/10 text-[10px] md:text-xs font-bold tracking-widest text-slate-700 uppercase"
                    onChange={(e) => setSearchQuery(e.target.value)}
                />
            </div>

            {/* --- TABLE LIST --- */}
            <div className="bg-white rounded-[24px] border border-slate-100 shadow-sm overflow-hidden">
                <div className="hidden md:block overflow-x-auto">
                    <table className="w-full text-left">
                        <thead className="bg-slate-50/50 border-b border-slate-50 text-[10px] font-bold text-slate-400 uppercase tracking-[0.2em]">
                            <tr>
                                <th className="px-6 py-4">Customer Info</th>
                                <th className="px-6 py-4">Issue Details</th>
                                <th className="px-6 py-4 text-center">Status</th>
                                <th className="px-6 py-4 text-right">Action</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-slate-50">
                            {tickets
                              .filter(t => (selectedFilter === 'all' || t.status.toUpperCase() === selectedFilter.toUpperCase()) && 
                                           ((t.customer_name ?? "").toLowerCase().includes(searchQuery.toLowerCase()) || 
                                            (t.ticket_id ?? "").toLowerCase().includes(searchQuery.toLowerCase())))
                              .map((ticket) => (
                                <tr key={ticket.id} className="hover:bg-slate-50/50 transition-colors group">
                                    <td className="px-6 py-5">
                                        <div className="text-sm font-bold text-slate-800">{ticket.customer_name || "N/A"}</div>
                                        <div className="text-[10px] text-slate-400 font-bold tracking-tighter">ID: {ticket.ticket_id}</div>
                                    </td>
                                    <td className="px-6 py-5">
                                        <div className="text-xs font-bold text-slate-700 truncate max-w-xs">{ticket.subject}</div>
                                        <div className="text-[10px] text-[#2076C7] font-black uppercase tracking-widest">{ticket.category}</div>
                                    </td>
                                    <td className="px-6 py-5 text-center">
                                        <span className={`px-3 py-1 rounded-lg text-[9px] font-black border tracking-widest ${getStatusStyles(ticket.status)}`}>
                                            {ticket.status?.replace('_', ' ')}
                                        </span>
                                    </td>
                                    <td className="px-6 py-5 text-right">
                                        <button 
                                            onClick={() => handleViewDetails(ticket.ticket_id)} 
                                            className="px-5 py-2.5 bg-gradient-to-r from-[#2076C7] to-[#1CADA3] text-white rounded-xl font-black text-[9px] tracking-widest uppercase active:scale-95 transition-all shadow-sm"
                                        >
                                            VIEW MSG
                                        </button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>

                <div className="md:hidden divide-y divide-slate-50">
                    {tickets
                        .filter(t => (selectedFilter === 'all' || t.status.toUpperCase() === selectedFilter.toUpperCase()) && 
                                     ((t.customer_name ?? "").toLowerCase().includes(searchQuery.toLowerCase()) || 
                                      (t.ticket_id ?? "").toLowerCase().includes(searchQuery.toLowerCase())))
                        .map((ticket) => (
                            <div key={ticket.id} className="p-5 space-y-3">
                                <div className="flex justify-between items-start text-left">
                                    <div>
                                        <div className="text-xs font-black text-slate-800 uppercase">{ticket.customer_name || "N/A"}</div>
                                        <p className="text-[9px] font-bold text-slate-400 tracking-tighter uppercase">ID: {ticket.ticket_id}</p>
                                    </div>
                                    <span className={`px-2 py-0.5 rounded text-[8px] font-black uppercase ${getStatusStyles(ticket.status)}`}>{ticket.status}</span>
                                </div>
                                <div className="text-[11px] font-bold text-slate-700 uppercase truncate text-left">{ticket.subject}</div>
                                <button onClick={() => handleViewDetails(ticket.ticket_id)} className="w-full py-3 bg-gradient-to-r from-[#2076C7] to-[#1CADA3] text-slate-700 rounded-lg font-black text-[10px] tracking-widest uppercase">VIEW MSG</button>
                            </div>
                    ))}
                </div>
            </div>
          </>
        )}

        {/* --- DETAIL VIEW --- */}
        {view === 'detail' && selectedTicket && (
          <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="lg:col-span-1 space-y-6 text-left">
              <div className="bg-white rounded-[32px] p-6 shadow-sm border border-slate-100">
                <button onClick={() => setView('list')} className="flex items-center gap-2 text-slate-400 hover:text-[#2076C7] text-xs font-black mb-8 transition-colors uppercase"><ArrowLeft size={16} /> BACK TO LIST</button>
                <div className="space-y-6">
                  <div className="p-5 bg-slate-50 rounded-2xl border border-slate-100">
                      <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-3">Customer Details</p>
                      <div className="text-sm font-black text-slate-800 uppercase">{selectedTicket?.ticket?.customer_name || "N/A"}</div>
                      <div className="text-[11px] text-slate-500 mt-2 flex items-center gap-2 font-bold"><Mail size={12}/> {selectedTicket?.ticket?.customer_email || "N/A"}</div>
                  </div>
                  <div className="space-y-2">
                      <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-3 px-1">Actions</p>
                      <div className="grid grid-cols-1 gap-2">
                          <button onClick={() => handleStatusUpdate(selectedTicket?.ticket?.ticket_id || '', 'IN_PROGRESS')} className="py-3.5 bg-amber-50 text-amber-600 rounded-xl text-[10px] font-black uppercase border border-amber-100 shadow-sm active:scale-95 transition-all">Mark Progress</button>
                          <button onClick={() => handleStatusUpdate(selectedTicket?.ticket?.ticket_id || '', 'CLOSED')} className="py-3.5 bg-emerald-50 text-emerald-600 rounded-xl text-[10px] font-black uppercase border border-emerald-100 shadow-sm active:scale-95 transition-all">Resolve Ticket</button>
                      </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="lg:col-span-2 flex flex-col h-[650px] bg-white rounded-[32px] shadow-sm border border-slate-100 overflow-hidden">
              <div className="px-8 py-5 border-b border-slate-50 flex items-center justify-between bg-white z-10 sticky top-0">
                  <div className="min-w-0 text-left">
                      <h2 className="text-sm md:text-base font-black text-slate-800 uppercase truncate">{selectedTicket?.ticket?.subject}</h2>
                      <div className="flex items-center gap-2 mt-1">
                          <span className={`w-2 h-2 rounded-full ${selectedTicket?.ticket?.status === 'CLOSED' ? 'bg-slate-300' : 'bg-[#10B981]'}`} />
                          <span className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em]">{selectedTicket?.ticket?.status?.replace('_', ' ') || "N/A"}</span>
                      </div>
                  </div>
              </div>

              <div className="flex-1 overflow-y-auto p-6 md:p-8 space-y-6 bg-slate-50/20">
                  <div className="flex gap-4">
                      <div className="w-10 h-10 text-xs rounded-2xl bg-blue-50 text-[#2076C7] flex items-center justify-center shrink-0 border border-blue-100 shadow-sm"><User size={20}/></div>
                      <div className="bg-white border border-slate-100 rounded-2xl rounded-tl-none p-5 shadow-sm max-w-[90%] text-left">
                          <p className="text-sm text-slate-700 leading-relaxed">{selectedTicket?.ticket?.description}</p>
                          <span className="text-[9px] text-slate-700 mt-4 block font-black tracking-widest">{new Date(selectedTicket?.ticket?.created_at || '').toLocaleString()}</span>
                      </div>
                  </div>

                  {selectedTicket?.messages?.map((msg) => {
                      const isAdmin = msg.sender_type === 'admin';
                      return (
                          <div key={msg.id} className={`flex gap-3 md:gap-4 ${isAdmin ? 'flex-row-reverse' : 'justify-start'}`}>
                              <div className={`w-9 h-9 md:w-10 md:h-10 rounded-2xl flex items-center justify-center shadow-sm ${isAdmin ? 'bg-gradient-to-br from-[#2076C7] to-[#1CADA3] text-white' : 'bg-white border border-slate-100 text-slate-400'}`}>
                                  {isAdmin ? <ShieldCheck size={18}/> : <User size={18}/>}
                              </div>
                              <div className={`p-4 md:p-5 max-w-[85%] rounded-2xl shadow-sm text-left ${isAdmin ? 'bg-[#2076C7] text-white rounded-tr-none' : 'bg-white border border-slate-100 rounded-tl-none'}`}>
                                  <p className="text-sm text-slate-700 leading-relaxed">{msg.message}</p>
                                  <span className={`text-[8px] mt-2 block font-black tracking-widest opacity-60 ${isAdmin ? 'text-white' : 'text-slate-700'}`}>{new Date(msg.created_at).toLocaleTimeString()}</span>
                              </div>
                          </div>
                      );
                  })}
                  <div ref={messagesEndRef} />
              </div>

              {selectedTicket?.ticket?.status !== 'CLOSED' && (
                  <div className="p-5 md:p-6 bg-white border-t border-slate-100">
                      <div className="relative">
                          <textarea 
                              value={replyMessage}
                              onChange={(e) => setReplyMessage(e.target.value)}
                              placeholder="Type response here..."
                              className="w-full p-4 md:p-5 pr-20 bg-slate-50 border border-slate-200 rounded-2xl text-xs font-black tracking-widest text-slate-700 outline-none focus:bg-white transition-all resize-none"
                              rows={3}
                          />
                          <button 
                              onClick={handleSendReply} 
                              disabled={actionLoading || !replyMessage.trim()} 
                              className="absolute right-4 bottom-4 p-3 from-[#2076C7] to-[#1CADA3] bg-slate-700 rounded-xl shadow-lg disabled:opacity-30 active:scale-95 transition-all"
                          >
                              {actionLoading ? <Loader2 size={20} className="animate-spin" /> : <Send size={20} />}
                          </button>
                      </div>
                  </div>
              )}
            </div>
          </motion.div>
        )}
      </div>
    </div>
  );
}