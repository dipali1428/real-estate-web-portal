'use client';

import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import customerService from '../../services/customerService';
import { 
    Plus, Send, X, AlertCircle, User, Headset, Eye, CheckCircle2,
    ArrowLeft, ShieldCheck, Loader2
} from 'lucide-react';
import toast from 'react-hot-toast';

/* ---------------- CATEGORY MAPPING ---------------- */
const PRODUCT_OPTIONS = [
    "Unlisted Shares", "Mutual Funds", "Bonds & Fixed Income", 
    "Investment Issue", "Insurance", "Technical Support"
];

const initialFilters = [
    { id: 'all', name: 'All Tickets', count: 0, color: 'from-[#2076C7] to-[#1CADA3]' },
    { id: 'Open', name: 'Open Issues', count: 0, color: 'from-[#2076C7] to-[#1CADA3]' },
    { id: 'Closed', name: 'Resolved', count: 0, color: 'from-[#2076C7] to-[#1CADA3]' },
];

export default function HelpSupport() {
    const [view, setView] = useState<'list' | 'create' | 'detail'>('list');
    const [tickets, setTickets] = useState<any[]>([]);
    const [apiCategories, setApiCategories] = useState<any[]>([]);
    const [selectedTicket, setSelectedTicket] = useState<any>(null);
    const [loading, setLoading] = useState(true);
    const [actionLoading, setActionLoading] = useState(false);
    
    const [selectedFilter, setSelectedFilter] = useState('all');
    const [searchQuery, setSearchQuery] = useState('');
    const [filterTabs, setFilterTabs] = useState(initialFilters);

    const [replyMessage, setReplyMessage] = useState('');
    const chatEndRef = useRef<HTMLDivElement>(null);
    const messagesEndRef = useRef<HTMLDivElement>(null);

    const [formData, setFormData] = useState({
        category: '', product_type: '', reference_id: '',
        issue_type: 'General', severity: 'Medium', subject: '', description: ''
    });

    // Resolve confirmation modal state
    const [showResolveModal, setShowResolveModal] = useState(false);
    const [ticketToResolve, setTicketToResolve] = useState<string | null>(null);

    useEffect(() => {
        loadInitialData();
    }, []);

    useEffect(() => {
        if (view === 'detail') {
            scrollToBottom();
        }
    }, [selectedTicket, view]);

    const scrollToBottom = () => {
        messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    };

    const loadInitialData = async () => {
        setLoading(true);
        try {
            const [ticketRes, catRes] = await Promise.all([
                customerService.getTicketList(),
                customerService.getSupportCategories()
            ]);
            const ticketData = ticketRes.data || [];
            setTickets(ticketData);
            setApiCategories(catRes.data || []);
            updateTabCounts(ticketData);
            toast.success(`Loaded ${ticketData.length} tickets`);
        } catch (error) {
            toast.error('Failed to load support tickets');
        } finally {
            setLoading(false);
        }
    };

    const updateTabCounts = (items: any[]) => {
        setFilterTabs(prev => prev.map(tab => ({
            ...tab,
            count: tab.id === 'all' ? items.length : items.filter(t => t.status === tab.id).length
        })));
    };

    const handleViewDetails = async (tid: string) => {
        setLoading(true);
        try {
            const res = await customerService.getTicketDetails(tid);
            if (res.status) {
                setSelectedTicket(res);
                setView('detail');
            } else {
                toast.error('Failed to load ticket details');
            }
        } catch (err) {
            toast.error('Error loading ticket details');
        } finally { 
            setLoading(false); 
        }
    };

    const handleCreateTicket = async (e: React.FormEvent) => {
        e.preventDefault();
        setActionLoading(true);
        try {
            const res = await customerService.createTicket({
                ...formData,
                product_type: formData.product_type || formData.category,
                reference_id: formData.reference_id || "N/A"
            });
            if (res.status) {
                toast.success('Ticket created successfully');
                setView('list');
                loadInitialData();
                setFormData({ category: '', product_type: '', reference_id: '', issue_type: 'General', severity: 'Medium', subject: '', description: '' });
            } else {
                toast.error(res.message || 'Failed to create ticket');
            }
        } catch (err) {
            toast.error('Failed to create ticket');
        } finally { 
            setActionLoading(false); 
        }
    };

    const handleSendReply = async () => {
        if (!replyMessage.trim()) return;
        setActionLoading(true);
        try {
            const res = await customerService.replyToTicket({
                ticket_id: selectedTicket.ticket.ticket_id,
                message: replyMessage
            });
            if (res.success) {
                toast.success('Message sent successfully');
                setReplyMessage('');
                handleViewDetails(selectedTicket.ticket.ticket_id);
            } else {
                toast.error(res.message || 'Failed to send message');
            }
        } catch (err) {
            toast.error('Failed to send message');
        } finally { 
            setActionLoading(false); 
        }
    };

    // Updated resolve handler - opens modal instead of confirm
    const handleResolveClick = (tid: string) => {
        setTicketToResolve(tid);
        setShowResolveModal(true);
    };

    const handleConfirmResolve = async () => {
        if (!ticketToResolve) return;
        
        setActionLoading(true);
        try {
            await customerService.closeTicket(ticketToResolve);
            toast.success('Ticket resolved successfully');
            setShowResolveModal(false);
            setTicketToResolve(null);
            setView('list');
            loadInitialData();
        } catch (err) {
            toast.error('Error resolving ticket');
        } finally {
            setActionLoading(false);
        }
    };

    const filteredTickets = tickets.filter(t => {
        const matchesFilter = selectedFilter === 'all' || t.status === selectedFilter;
        const matchesSearch = t.subject.toLowerCase().includes(searchQuery.toLowerCase()) || 
                              t.ticket_id.toLowerCase().includes(searchQuery.toLowerCase());
        return matchesFilter && matchesSearch;
    });

    if (loading && view === 'list') {
        return (
            <div className="flex-1 p-3 sm:p-4 md:p-6 bg-[#f8fafc] min-h-screen flex items-center justify-center">
                <div className="text-center px-4">
                    <div className="w-10 h-10 sm:w-12 sm:h-12 border-4 border-[#2076C7] border-t-transparent rounded-full animate-spin mx-auto mb-3 sm:mb-4"></div>
                    <p className="text-gray-600 text-sm sm:text-base">Loading your tickets...</p>
                </div>
            </div>
        );
    }

    return (
        <div className="flex-1 p-3 sm:p-4 md:p-6 bg-[#f8fafc] min-h-screen">
            
            {/* Resolve Confirmation Modal - Responsive */}
            {showResolveModal && (
                <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center p-3 sm:p-4">
                    <div className="bg-white rounded-xl sm:rounded-2xl max-w-md w-full shadow-2xl animate-in zoom-in-95 duration-200 mx-3 sm:mx-4">
                        <div className="p-4 sm:p-6">
                            <div className="flex justify-center mb-3 sm:mb-4">
                                <div className="w-12 h-12 sm:w-16 sm:h-16 bg-emerald-100 rounded-full flex items-center justify-center">
                                    <CheckCircle2 className="w-6 h-6 sm:w-8 sm:h-8 text-emerald-600" />
                                </div>
                            </div>
                            <h3 className="text-lg sm:text-xl font-bold text-gray-900 text-center mb-2">
                                Resolve Ticket
                            </h3>
                            <p className="text-sm sm:text-base text-gray-500 text-center mb-4 sm:mb-6">
                                Is your issue fully resolved? Clicking Confirm will finalize and close this support ticket.
                            </p>
                            <div className="flex flex-col sm:flex-row gap-2 sm:gap-3">
                                <button
                                    onClick={() => {
                                        setShowResolveModal(false);
                                        setTicketToResolve(null);
                                    }}
                                    className="order-2 sm:order-1 py-2.5 sm:py-3 bg-gray-100 text-gray-700 rounded-xl font-medium hover:bg-gray-200 transition-all text-sm sm:text-base"
                                >
                                    Cancel
                                </button>
                                <button
                                    onClick={handleConfirmResolve}
                                    disabled={actionLoading}
                                    className="order-1 sm:order-2 py-2.5 sm:py-3 bg-gradient-to-r from-[#2076C7] to-[#1CADA3] text-white rounded-xl font-medium hover:opacity-90 transition-all disabled:opacity-50 flex items-center justify-center gap-2 text-sm sm:text-base"
                                >
                                    {actionLoading ? (
                                        <Loader2 className="w-4 h-4 animate-spin" />
                                    ) : (
                                        <CheckCircle2 className="w-4 h-4" />
                                    )}
                                    Confirm Resolve
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            )}

            {/* Header - Responsive */}
            <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                className="bg-gradient-to-r from-[#2076C7] to-[#1CADA3] rounded-xl sm:rounded-2xl p-4 sm:p-6 mb-4 sm:mb-6 text-white shadow-lg"
            >
                <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-3 sm:gap-4 mb-3 sm:mb-4">
                    <div>
                        <h2 className="text-lg sm:text-xl md:text-2xl font-bold flex items-center gap-2">
                            <ShieldCheck className="opacity-80 w-5 h-5 sm:w-6 sm:h-6" /> Help & Support
                        </h2>
                        <p className="text-xs sm:text-sm opacity-80 mt-1">Track your requests or get expert assistance</p>
                    </div>
                    {view === 'list' && (
                        <button 
                            onClick={() => setView('create')}
                            className="bg-white text-[#2076C7] hover:bg-gray-100 px-4 sm:px-6 py-2 rounded-xl text-xs sm:text-sm font-bold flex items-center justify-center gap-2 transition-all shadow-md active:scale-95"
                        >
                            <Plus size={16} strokeWidth={3} /> Raise Ticket
                        </button>
                    )}
                </div>

                {view === 'list' && (
                    <div className="relative">
                        <input
                            type="text"
                            placeholder="Search by Ticket ID or Subject..."
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            className="w-full px-3 sm:px-4 py-2 pl-8 sm:pl-10 rounded-xl bg-white/20 text-white placeholder-white/60 border border-white/20 focus:outline-none focus:bg-white/30 transition-all text-sm sm:text-base"
                        />
                        <svg
                            className="absolute left-2 sm:left-3 top-1/2 transform -translate-y-1/2 w-3 h-3 sm:w-4 sm:h-4 text-white/60"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                        >
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                        </svg>
                    </div>
                )}
            </motion.div>

            <AnimatePresence mode="wait">
                {/* VIEW 1: DASHBOARD TABLE */}
                {view === 'list' && (
                    <motion.div key="list" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
                        {/* Tabs - Horizontal Scroll on Mobile */}
                        <div className="flex space-x-1 sm:space-x-2 overflow-x-auto pb-4 sm:pb-6 scrollbar-hide">
                            {filterTabs.map(tab => (
                                <button
                                    key={tab.id}
                                    onClick={() => setSelectedFilter(tab.id)}
                                    className={`flex-shrink-0 px-3 sm:px-4 py-1.5 sm:py-2 rounded-xl text-xs sm:text-sm font-medium flex items-center space-x-1 sm:space-x-2 transition-all whitespace-nowrap ${
                                        selectedFilter === tab.id
                                            ? `bg-gradient-to-r ${tab.color} text-white`
                                            : 'bg-white text-gray-600 border border-gray-100'
                                    }`}
                                >
                                    <span className="text-xs sm:text-sm">{tab.name}</span>
                                    <span className="text-[8px] sm:text-[10px] px-1 sm:px-1.5 py-0.5 rounded-full bg-white/20">
                                        {tab.count}
                                    </span>
                                </button>
                            ))}
                        </div>

                        {/* Table - Horizontal Scroll on Mobile */}
                        <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
                            <div className="overflow-x-auto">
                                <table className="w-full min-w-[500px] sm:min-w-full">
                                    <thead>
                                        <tr className="border-b border-gray-100 bg-gray-50/50">
                                            <th className="px-4 sm:px-6 py-3 sm:py-4 text-left text-[10px] sm:text-[11px] text-gray-400 uppercase tracking-widest font-black">Conversation</th>
                                            <th className="px-4 sm:px-6 py-3 sm:py-4 text-center text-[10px] sm:text-[11px] text-gray-400 uppercase tracking-widest font-black hidden sm:table-cell">Product</th>
                                            <th className="px-4 sm:px-6 py-3 sm:py-4 text-center text-[10px] sm:text-[11px] text-gray-400 uppercase tracking-widest font-black">Status</th>
                                            <th className="px-4 sm:px-6 py-3 sm:py-4 text-center text-[10px] sm:text-[11px] text-gray-400 uppercase tracking-widest font-black hidden md:table-cell">Last Update</th>
                                            <th className="px-4 sm:px-6 py-3 sm:py-4 text-center text-[10px] sm:text-[11px] text-gray-400 uppercase tracking-widest font-black">Action</th>
                                        </tr>
                                    </thead>
                                    <tbody className="divide-y divide-gray-50">
                                        <AnimatePresence>
                                            {filteredTickets.length > 0 ? (
                                                filteredTickets.map(ticket => (
                                                    <motion.tr 
                                                        key={ticket.id} 
                                                        initial={{ opacity: 0 }}
                                                        animate={{ opacity: 1 }}
                                                        exit={{ opacity: 0 }}
                                                        className="hover:bg-gray-50 transition-colors group"
                                                    >
                                                        <td className="px-4 sm:px-6 py-4 sm:py-5">
                                                            <div className="flex items-center space-x-2 sm:space-x-4">
                                                                <div>
                                                                    <div className="text-xs sm:text-sm font-semibold text-gray-800 truncate max-w-[150px] sm:max-w-none">{ticket.subject}</div>
                                                                    <div className="text-[9px] sm:text-[11px] text-gray-400">ID: {ticket.ticket_id}</div>
                                                                </div>
                                                            </div>
                                                        </td>
                                                        <td className="px-4 sm:px-6 py-4 sm:py-5 text-center hidden sm:table-cell">
                                                            <span className="text-[9px] sm:text-[11px] font-medium text-gray-500 bg-gray-100 px-2 sm:px-3 py-1 rounded-lg">
                                                                {ticket.category}
                                                            </span>
                                                        </td>
                                                        <td className="px-4 sm:px-6 py-4 sm:py-5 text-center">
                                                            <span className={`px-2 sm:px-3 py-0.5 sm:py-1 rounded-full text-[8px] sm:text-[10px] font-bold uppercase tracking-wider ${
                                                                ticket.status === 'Open' ? 'bg-amber-100 text-amber-700' : 'bg-emerald-100 text-emerald-700'
                                                            }`}>
                                                                {ticket.status}
                                                            </span>
                                                        </td>
                                                        <td className="px-4 sm:px-6 py-4 sm:py-5 text-center text-[10px] sm:text-xs text-gray-400 hidden md:table-cell">
                                                            {new Date(ticket.updated_at).toLocaleDateString()}
                                                        </td>
                                                        <td className="px-4 sm:px-6 py-4 sm:py-5 text-center">
                                                            <button 
                                                                onClick={() => handleViewDetails(ticket.ticket_id)}
                                                                className="px-2 sm:px-4 py-1.5 sm:py-2 bg-[#2076C7] text-white rounded-lg sm:rounded-xl text-[10px] sm:text-xs font-bold hover:shadow-lg transition-all active:scale-95 flex items-center gap-1 sm:gap-2 mx-auto"
                                                            >
                                                                <Eye size={12} className="sm:w-3.5 sm:h-3.5" />
                                                                <span className="hidden sm:inline">View Chat</span>
                                                                <span className="sm:hidden">View</span>
                                                            </button>
                                                        </td>
                                                    </motion.tr>
                                                ))
                                            ) : (
                                                <tr>
                                                    <td colSpan={5} className="px-4 sm:px-6 py-12 sm:py-16 text-center">
                                                        <div className="flex flex-col items-center justify-center">
                                                            <div className="w-16 h-16 sm:w-20 sm:h-20 bg-gray-100 rounded-full flex items-center justify-center mb-3 sm:mb-4">
                                                                <ShieldCheck className="w-8 h-8 sm:w-10 sm:h-10 text-gray-400" />
                                                            </div>
                                                            <p className="text-gray-500 font-medium mb-1 text-sm sm:text-base">No support tickets found</p>
                                                            <p className="text-xs sm:text-sm text-gray-400 px-4">Raise a new ticket to get help from our support team</p>
                                                        </div>
                                                    </td>
                                                </tr>
                                            )}
                                        </AnimatePresence>
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </motion.div>
                )}

                {/* VIEW 2: CREATE TICKET MODAL - Responsive */}
                {view === 'create' && (
                    <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center p-3 sm:p-4">
                        <div className="bg-white rounded-2xl sm:rounded-3xl max-w-2xl w-full max-h-[90vh] overflow-y-auto mx-3 sm:mx-4">
                            <div className="bg-gradient-to-r from-[#2076C7] to-[#1CADA3] p-4 sm:p-6 text-white rounded-t-2xl sm:rounded-t-3xl flex justify-between items-center sticky top-0">
                                <div className="flex items-center gap-2 sm:gap-3">
                                    <h3 className="text-lg sm:text-xl font-bold">Raise Support Ticket</h3>
                                </div>
                                <button 
                                    onClick={() => setView('list')} 
                                    className="p-1.5 sm:p-2 hover:bg-white/20 rounded-lg sm:rounded-xl transition-colors"
                                >
                                    <X size={18} className="sm:w-5 sm:h-5" />
                                </button>
                            </div>
                            
                            <div className="p-4 sm:p-8 space-y-4 sm:space-y-6">
                                <form onSubmit={handleCreateTicket} className="space-y-4 sm:space-y-6">
                                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
                                        <div>
                                            <label className="text-xs sm:text-sm font-medium text-gray-700 mb-1.5 sm:mb-2 block">
                                                Investment Area
                                            </label>
                                            <select 
                                                required 
                                                className="w-full px-3 sm:px-4 py-2.5 sm:py-3 bg-white border border-gray-300 rounded-xl text-gray-900 outline-none focus:border-[#2076C7] focus:ring-2 focus:ring-[#2076C7]/10 transition-all text-sm sm:text-base appearance-none"
                                                value={formData.category} 
                                                onChange={(e) => setFormData({...formData, category: e.target.value, product_type: e.target.value})}
                                                style={{
                                                    backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 24 24' stroke='%2394a3b8'%3E%3Cpath stroke-linecap='round' stroke-linejoin='round' stroke-width='2' d='M19 9l-7 7-7-7'%3E%3C/path%3E%3C/svg%3E")`,
                                                    backgroundRepeat: 'no-repeat',
                                                    backgroundPosition: 'right 1rem center',
                                                    backgroundSize: '1rem'
                                                }}
                                            >
                                                <option value="">Select Category</option>
                                                {PRODUCT_OPTIONS.map(opt => <option key={opt} value={opt}>{opt}</option>)}
                                            </select>
                                        </div>
                                        <div>
                                            <label className="text-xs sm:text-sm font-medium text-gray-700 mb-1.5 sm:mb-2 block">
                                                Priority
                                            </label>
                                            <select 
                                                className="w-full px-3 sm:px-4 py-2.5 sm:py-3 bg-white border border-gray-300 rounded-xl text-gray-900 outline-none focus:border-[#2076C7] focus:ring-2 focus:ring-[#2076C7]/10 transition-all text-sm sm:text-base appearance-none"
                                                value={formData.severity} 
                                                onChange={(e) => setFormData({...formData, severity: e.target.value})}
                                                style={{
                                                    backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 24 24' stroke='%2394a3b8'%3E%3Cpath stroke-linecap='round' stroke-linejoin='round' stroke-width='2' d='M19 9l-7 7-7-7'%3E%3C/path%3E%3C/svg%3E")`,
                                                    backgroundRepeat: 'no-repeat',
                                                    backgroundPosition: 'right 1rem center',
                                                    backgroundSize: '1rem'
                                                }}
                                            >
                                                <option value="Low">Low</option>
                                                <option value="Medium">Medium</option>
                                                <option value="High">High</option>
                                            </select>
                                        </div>
                                    </div>

                                    <div>
                                        <label className="text-xs sm:text-sm font-medium text-gray-700 mb-1.5 sm:mb-2 block">
                                            Reference ID <span className="text-gray-400 text-[10px] sm:text-xs font-normal">(Optional)</span>
                                        </label>
                                        <input
                                            type="text"
                                            placeholder="e.g., Investment ID, Policy Number"
                                            className="w-full px-3 sm:px-4 py-2.5 sm:py-3 bg-white border border-gray-300 rounded-xl text-gray-900 outline-none focus:border-[#2076C7] focus:ring-2 focus:ring-[#2076C7]/10 transition-all text-sm sm:text-base"
                                            value={formData.reference_id}
                                            onChange={(e) => setFormData({...formData, reference_id: e.target.value})}
                                        />
                                    </div>

                                    <div>
                                        <label className="text-xs sm:text-sm font-medium text-gray-700 mb-1.5 sm:mb-2 block">
                                            Subject
                                        </label>
                                        <input
                                            required
                                            type="text"
                                            placeholder="What is the issue?"
                                            className="w-full px-3 sm:px-4 py-2.5 sm:py-3 bg-white border border-gray-300 rounded-xl text-gray-900 outline-none focus:border-[#2076C7] focus:ring-2 focus:ring-[#2076C7]/10 transition-all text-sm sm:text-base"
                                            value={formData.subject}
                                            onChange={(e) => setFormData({...formData, subject: e.target.value})}
                                        />
                                    </div>

                                    <div>
                                        <label className="text-xs sm:text-sm font-medium text-gray-700 mb-1.5 sm:mb-2 block">
                                            Detailed Description
                                        </label>
                                        <textarea
                                            required
                                            rows={4}
                                            placeholder="Describe your concern in detail..."
                                            className="w-full px-3 sm:px-4 py-2.5 sm:py-3 bg-white border border-gray-300 rounded-xl text-gray-900 outline-none focus:border-[#2076C7] focus:ring-2 focus:ring-[#2076C7]/10 transition-all resize-none text-sm sm:text-base"
                                            value={formData.description}
                                            onChange={(e) => setFormData({...formData, description: e.target.value})}
                                        />
                                    </div>

                                    <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 pt-4">
                                        <button
                                            type="button"
                                            onClick={() => setView('list')}
                                            className="order-2 sm:order-1 py-3 sm:py-4 bg-gray-100 text-gray-700 rounded-xl font-medium hover:bg-gray-200 transition-colors text-sm sm:text-base"
                                        >
                                            Cancel
                                        </button>
                                        <button
                                            type="submit"
                                            disabled={actionLoading || !formData.category || !formData.subject || !formData.description}
                                            className="order-1 sm:order-2 py-3 sm:py-4 bg-gradient-to-r from-[#2076C7] to-[#1CADA3] text-white rounded-xl font-medium hover:opacity-90 disabled:opacity-50 flex items-center justify-center gap-2 transition-all text-sm sm:text-base"
                                        >
                                            {actionLoading ? (
                                                <div className="w-4 h-4 sm:w-5 sm:h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                                            ) : (
                                                <Send size={16} className="sm:w-4.5 sm:h-4.5" />
                                            )}
                                            Submit Support Request
                                        </button>
                                    </div>
                                </form>
                            </div>
                        </div>
                    </div>
                )}

                {/* VIEW 3: CHAT VIEW - Responsive */}
                {view === 'detail' && selectedTicket && (
                    <motion.div 
                        key="detail" 
                        initial={{ opacity: 0, y: 20 }} 
                        animate={{ opacity: 1, y: 0 }} 
                        className="bg-white rounded-xl sm:rounded-2xl shadow-lg border border-gray-200 overflow-hidden flex flex-col h-[calc(100vh-160px)] sm:h-[calc(100vh-180px)] md:h-[calc(100vh-200px)]"
                    >
                        {/* Chat Header */}
                        <div className="bg-gradient-to-r from-[#2076C7] to-[#1CADA3] px-4 sm:px-6 py-3 sm:py-4 flex flex-col sm:flex-row sm:justify-between sm:items-center gap-3">
                            <div className="flex items-center gap-2 sm:gap-4">
                                <button 
                                    onClick={() => setView('list')}
                                    className="p-1.5 sm:p-2 hover:bg-white/20 rounded-lg sm:rounded-xl transition-all text-white"
                                    title="Back to tickets"
                                >
                                    <ArrowLeft size={16} className="sm:w-5 sm:h-5" />
                                </button>
                                <div>
                                    <div className="flex items-center gap-1 sm:gap-2 mb-0.5 sm:mb-1">
                                        <span className="text-[8px] sm:text-[10px] font-black text-white/80 uppercase tracking-[0.1em] sm:tracking-[0.2em]">
                                            Ticket #{selectedTicket.ticket.ticket_id}
                                        </span>
                                        <span className={`px-1.5 sm:px-2 py-0.5 rounded-full text-[7px] sm:text-[9px] font-black uppercase tracking-wider ${
                                            selectedTicket.ticket.status === 'Open' 
                                                ? 'bg-amber-400/20 text-amber-100 border border-amber-400/30' 
                                                : 'bg-emerald-400/20 text-emerald-100 border border-emerald-400/30'
                                        }`}>
                                            {selectedTicket.ticket.status}
                                        </span>
                                    </div>
                                    <h3 className="text-sm sm:text-lg font-bold text-white truncate max-w-[200px] sm:max-w-none">{selectedTicket.ticket.subject}</h3>
                                    <p className="text-white/70 text-[10px] sm:text-xs mt-0.5 sm:mt-1">
                                        Category: {selectedTicket.ticket.category} • Created: {new Date(selectedTicket.ticket.created_at).toLocaleDateString()}
                                    </p>
                                </div>
                            </div>
                            
                            {selectedTicket.ticket.status === 'Open' && (
                                <button 
                                    onClick={() => handleResolveClick(selectedTicket.ticket.ticket_id)}
                                    disabled={actionLoading}
                                    className="px-3 sm:px-4 py-1.5 sm:py-2 bg-white/20 hover:bg-white/30 text-white rounded-lg sm:rounded-xl text-[10px] sm:text-xs font-bold uppercase tracking-wider transition-all backdrop-blur-sm border border-white/30 disabled:opacity-50"
                                >
                                    {actionLoading ? (
                                        <div className="w-3 h-3 sm:w-4 sm:h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                                    ) : (
                                        'Mark as Resolved'
                                    )}
                                </button>
                            )}
                        </div>

                        {/* Messages Area */}
                        <div className="flex-1 overflow-y-auto p-3 sm:p-6 bg-gradient-to-b from-gray-50 to-white">
                            <div className="space-y-3 sm:space-y-4 max-w-4xl mx-auto">
                                {/* Initial Issue Message */}
                                <div className="flex gap-2 sm:gap-3 animate-in slide-in-from-bottom-2 duration-300">
                                    <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-full bg-gradient-to-br from-[#2076C7] to-[#1CADA3] flex items-center justify-center shadow-md flex-shrink-0">
                                        <User size={14} className="sm:w-4.5 sm:h-4.5 text-white" />
                                    </div>
                                    <div className="flex-1">
                                        <div className="bg-white rounded-xl sm:rounded-2xl rounded-tl-none shadow-sm border border-gray-100 p-3 sm:p-4 max-w-[90%] sm:max-w-[80%]">
                                            <div className="flex flex-wrap items-center gap-1 sm:gap-2 mb-1 sm:mb-2">
                                                <span className="text-[10px] sm:text-xs font-bold text-gray-900">You</span>
                                                <span className="text-[8px] sm:text-[10px] text-gray-400">
                                                    {new Date(selectedTicket.ticket.created_at).toLocaleString()}
                                                </span>
                                            </div>
                                            <p className="text-xs sm:text-sm text-gray-700 leading-relaxed">
                                                {selectedTicket.ticket.description}
                                            </p>
                                        </div>
                                    </div>
                                </div>

                                {/* Support Messages */}
                                {selectedTicket.messages && selectedTicket.messages.map((msg: any, index: number) => (
                                    <div 
                                        key={msg.id} 
                                        className={`flex gap-2 sm:gap-3 ${msg.sender_type === 'customer' ? '' : 'flex-row-reverse'} animate-in slide-in-from-bottom-2 duration-300`}
                                        style={{ animationDelay: `${index * 100}ms` }}
                                    >
                                        <div className={`w-8 h-8 sm:w-10 sm:h-10 rounded-full flex items-center justify-center shadow-md flex-shrink-0 ${
                                            msg.sender_type === 'customer' 
                                                ? 'bg-gradient-to-br from-[#2076C7] to-[#1CADA3]' 
                                                : 'bg-gradient-to-br from-emerald-500 to-teal-600'
                                        }`}>
                                            {msg.sender_type === 'customer' ? (
                                                <User size={14} className="sm:w-4.5 sm:h-4.5 text-white" />
                                            ) : (
                                                <Headset size={14} className="sm:w-4.5 sm:h-4.5 text-white" />
                                            )}
                                        </div>
                                        <div className={`flex-1 ${msg.sender_type === 'customer' ? '' : 'flex justify-end'}`}>
                                            <div className={`rounded-xl sm:rounded-2xl shadow-sm p-3 sm:p-4 max-w-[90%] sm:max-w-[80%] ${
                                                msg.sender_type === 'customer' 
                                                    ? 'bg-white border border-gray-100 rounded-tl-none' 
                                                    : 'bg-gradient-to-r from-[#2076C7] to-[#1CADA3] rounded-tr-none'
                                            }`}>
                                                <div className={`flex flex-wrap items-center gap-1 sm:gap-2 mb-1 sm:mb-2 ${msg.sender_type === 'customer' ? '' : 'justify-end'}`}>
                                                    <span className={`text-[10px] sm:text-xs font-bold ${
                                                        msg.sender_type === 'customer' ? 'text-gray-900' : 'text-white'
                                                    }`}>
                                                        {msg.sender_type === 'customer' ? 'You' : 'Support Team'}
                                                    </span>
                                                    <span className={`text-[8px] sm:text-[10px] ${
                                                        msg.sender_type === 'customer' ? 'text-gray-400' : 'text-white/70'
                                                    }`}>
                                                        {new Date(msg.created_at).toLocaleString()}
                                                    </span>
                                                </div>
                                                <p className={`text-xs sm:text-sm leading-relaxed ${
                                                    msg.sender_type === 'customer' ? 'text-gray-700' : 'text-white'
                                                }`}>
                                                    {msg.message}
                                                </p>
                                            </div>
                                        </div>
                                    </div>
                                ))}
                                <div ref={messagesEndRef} />
                            </div>
                        </div>

                        {/* Reply Input - Responsive */}
                        <div className="border-t border-gray-200 bg-white p-3 sm:p-4">
                            {selectedTicket.ticket.status === 'Open' ? (
                                <div className="max-w-4xl mx-auto">
                                    <div className="flex gap-2 sm:gap-3 items-end">
                                        <div className="flex-1 relative">
                                            <textarea
                                                rows={2}
                                                placeholder="Type your message here..."
                                                className="w-full px-3 sm:px-4 py-2 sm:py-3 pr-10 sm:pr-12 bg-gray-50 border border-gray-200 rounded-xl sm:rounded-2xl outline-none text-gray-700 text-xs sm:text-sm font-medium focus:border-[#2076C7] focus:ring-2 focus:ring-[#2076C7]/10 transition-all resize-none"
                                                value={replyMessage}
                                                onChange={(e) => setReplyMessage(e.target.value)}
                                                onKeyPress={(e) => {
                                                    if (e.key === 'Enter' && !e.shiftKey) {
                                                        e.preventDefault();
                                                        handleSendReply();
                                                    }
                                                }}
                                            />
                                        </div>
                                        <button
                                            disabled={actionLoading || !replyMessage.trim()}
                                            onClick={handleSendReply}
                                            className="px-3 sm:px-6 py-2 sm:py-3 bg-gradient-to-r from-[#2076C7] to-[#1CADA3] text-white rounded-lg sm:rounded-xl font-medium hover:opacity-90 disabled:opacity-50 transition-all flex items-center gap-1 sm:gap-2 shadow-md text-xs sm:text-sm"
                                        >
                                            {actionLoading ? (
                                                <div className="w-3 h-3 sm:w-4 sm:h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                                            ) : (
                                                <>
                                                    <Send size={14} className="sm:w-4 sm:h-4" />
                                                    <span className="hidden sm:inline">Send</span>
                                                </>
                                            )}
                                        </button>
                                    </div>
                                </div>
                            ) : (
                                <div className="text-center py-3 sm:py-4 bg-gradient-to-r from-gray-50 to-gray-100 rounded-xl sm:rounded-2xl border border-gray-200">
                                    <CheckCircle2 size={16} className="sm:w-5 sm:h-5 text-emerald-500 mx-auto mb-1 sm:mb-2" />
                                    <p className="text-xs sm:text-sm text-gray-600 font-medium">This ticket has been resolved</p>
                                    <p className="text-[10px] sm:text-xs text-gray-400 mt-0.5 sm:mt-1">The conversation is now closed</p>
                                </div>
                            )}
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
}