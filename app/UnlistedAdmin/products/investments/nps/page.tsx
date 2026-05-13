'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
    CheckCircle, AlertCircle, RefreshCw, Search, Trash2, Filter,
    ChevronLeft, ChevronRight, CalendarDays, Video, Phone, MapPin,
    Calendar, Clock, User, Mail, Edit3, X, Loader2, MessageSquare
} from "lucide-react";
import NpsAdminService from '../../../../services/npsAdminService';

// ── Types ──────────────────────────────────────────────────────────────────
interface Meeting {
    id: number;
    meeting_date: string;
    meeting_time: string;
    topic: string;
    meeting_type: string;
    status: string;
    meeting_link?: string;
    note?: string;
    whatsapp_number?: string;
    notify_whatsapp?: boolean;
    customer_name?: string;
    customer_email?: string;
    created_at?: string;
}

type ToastType = 'success' | 'error' | 'info';

const STATUSES = ['All', 'PENDING', 'COMPLETE', 'INCOMPLETE'];
const PAGE_SIZE = 10;

// ── Helpers ────────────────────────────────────────────────────────────────

const StatusBadge = ({ status }: { status: string }) => {
    const s = status.toUpperCase();
    const colors: Record<string, string> = {
        'PENDING': 'bg-blue-100 text-blue-700',
        'COMPLETE': 'bg-emerald-100 text-emerald-700',
        'INCOMPLETE': 'bg-rose-100 text-rose-700',
    };
    const colorClass = colors[s] || 'bg-slate-100 text-slate-600';

    return (
        <span className={`px-2.5 py-1 rounded-lg text-[10px] font-black tracking-widest uppercase ${colorClass}`}>
            {status}
        </span>
    );
};

const TypeBadge = ({ type }: { type: string }) => {
    const t = type.toLowerCase();
    let icon = <Calendar className="w-3 h-3" />;
    if (t === 'video') icon = <Video className="w-3 h-3" />;
    else if (t === 'phone') icon = <Phone className="w-3 h-3" />;
    else if (t === 'in-person') icon = <MapPin className="w-3 h-3" />;

    return (
        <span className="inline-flex items-center gap-1.5 px-2 py-1 bg-slate-100 text-slate-700 rounded-lg text-xs font-bold capitalize">
            {icon}
            {type}
        </span>
    );
};

// ── Main Page ──────────────────────────────────────────────────────────────
export default function NPSAdminPage() {
    const [toast, setToast] = useState<{ message: string; type: ToastType } | null>(null);

    const [meetings, setMeetings] = useState<Meeting[]>([]);
    const [isLoading, setIsLoading] = useState(false);
    const [search, setSearch] = useState('');
    const [statusFilter, setStatusFilter] = useState('All');
    const [page, setPage] = useState(1);

    const [deleteId, setDeleteId] = useState<number | null>(null);
    const [isDeleting, setIsDeleting] = useState(false);

    const [editMeeting, setEditMeeting] = useState<Meeting | null>(null);
    const [isUpdatingStatus, setIsUpdatingStatus] = useState(false);

    const [isClient, setIsClient] = useState(false);

    useEffect(() => { setIsClient(true); fetchMeetings(); }, []);

    const showToast = (message: string, type: ToastType) => {
        setToast({ message, type });
        setTimeout(() => setToast(null), type === 'error' ? 5000 : 3000);
    };

    // ── Fetch ────────────────────────────────────────────────────────────────
    const fetchMeetings = async () => {
        setIsLoading(true);
        try {
            const data = await NpsAdminService.getAllMeetings();
            setMeetings(Array.isArray(data?.data) ? data.data : (Array.isArray(data) ? data : []));
        } catch (error) {
            console.error('Error fetching meetings:', error);
            showToast('Failed to load meetings', 'error');
        } finally {
            setIsLoading(false);
        }
    };

    // ── Delete ───────────────────────────────────────────────────────────────
    const handleDelete = async () => {
        if (deleteId == null) return;
        setIsDeleting(true);
        try {
            await NpsAdminService.deleteMeeting(deleteId);
            setMeetings(prev => prev.filter(m => m.id !== deleteId));
            showToast('Meeting deleted successfully', 'success');
        } catch (error) {
            console.error('Error deleting meeting:', error);
            showToast('Failed to delete meeting', 'error');
        } finally {
            setIsDeleting(false);
            setDeleteId(null);
        }
    };

    // ── Update Meeting (General) ───────────────────────────────────────────
    const handleUpdateMeeting = async () => {
        if (!editMeeting) return;
        setIsUpdatingStatus(true);
        try {
            const updateData = {
                meeting_date: editMeeting.meeting_date,
                meeting_time: editMeeting.meeting_time,
                topic: editMeeting.topic,
                note: editMeeting.note,
                meeting_type: editMeeting.meeting_type,
                meeting_link: editMeeting.meeting_link,
                status: editMeeting.status,
                whatsapp_number: editMeeting.whatsapp_number
            };
            await NpsAdminService.updateMeeting(editMeeting.id, updateData);
            showToast('Meeting updated successfully', 'success');
            setMeetings(prev => prev.map(m => m.id === editMeeting.id ? { ...m, ...updateData } : m));
            setEditMeeting(null);
        } catch (err: any) {
            console.error('Update failed:', err);
            showToast(`Update failed: ${err.response?.data?.message || err.message}`, 'error');
        } finally {
            setIsUpdatingStatus(false);
        }
    };

    // ── Filtered + paginated data ────────────────────────────────────────────
    const filtered = meetings.filter(m => {
        const query = search.toLowerCase();
        const matchSearch = (
            (m.customer_name || '').toLowerCase().includes(query) ||
            (m.customer_email || '').toLowerCase().includes(query) ||
            (m.topic || '').toLowerCase().includes(query)
        );
        const matchStatus = statusFilter === 'All' || (m.status || '').toUpperCase() === statusFilter;
        return matchSearch && matchStatus;
    });

    const totalPages = Math.max(1, Math.ceil(filtered.length / PAGE_SIZE));
    const paginated = filtered.slice((page - 1) * PAGE_SIZE, page * PAGE_SIZE);

    if (!isClient) return null;

    return (
        <div className="flex-1 min-h-screen bg-slate-50 p-6 lg:p-8 space-y-8 pb-20 font-sans">
            {/* ── Toast ─────────────────────────────────────────────────────────── */}
            <AnimatePresence>
                {toast && (
                    <motion.div
                        initial={{ opacity: 0, y: -20 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -20 }}
                        className={`fixed top-6 left-1/2 -translate-x-1/2 z-50 flex items-center gap-3 px-5 py-3.5 rounded-2xl shadow-2xl border backdrop-blur-md
                            ${toast.type === 'success' ? 'bg-emerald-50/95 border-emerald-200 text-emerald-800'
                                : toast.type === 'error' ? 'bg-rose-50/95 border-rose-200 text-rose-800'
                                    : 'bg-blue-50/95 border-blue-200 text-blue-800'}`}
                    >
                        {toast.type === 'success' ? <CheckCircle className="w-4 h-4" />
                            : toast.type === 'error' ? <AlertCircle className="w-4 h-4" />
                                : <RefreshCw className="w-4 h-4 animate-spin" />}
                        <span className="text-sm font-bold">{toast.message}</span>
                        <button onClick={() => setToast(null)} className="ml-2 opacity-60 hover:opacity-100">
                            <X className="w-3.5 h-3.5" />
                        </button>
                    </motion.div>
                )}
            </AnimatePresence>

            {/* ── Delete Confirm Modal ───────────────────────────────────────────── */}
            <AnimatePresence>
                {deleteId != null && (
                    <motion.div
                        initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
                        className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm"
                    >
                        <motion.div
                            initial={{ scale: 0.9, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} exit={{ scale: 0.9, opacity: 0 }}
                            className="bg-white rounded-3xl shadow-2xl p-8 max-w-sm w-full mx-4"
                        >
                            <div className="w-14 h-14 bg-rose-100 rounded-2xl flex items-center justify-center mx-auto mb-4">
                                <Trash2 className="w-7 h-7 text-rose-600" />
                            </div>
                            <h3 className="text-xl font-bold text-slate-900 text-center mb-2">Delete Meeting?</h3>
                            <p className="text-sm text-slate-500 text-center mb-6">
                                This action cannot be undone. The consultation record will be permanently removed.
                            </p>
                            <div className="flex gap-3">
                                <button
                                    onClick={() => setDeleteId(null)}
                                    className="flex-1 py-3 rounded-xl border border-slate-200 text-slate-600 font-semibold text-sm hover:bg-slate-50 transition-colors"
                                >
                                    Cancel
                                </button>
                                <button
                                    onClick={handleDelete}
                                    disabled={isDeleting}
                                    className="flex-1 py-3 rounded-xl bg-rose-600 text-white font-semibold text-sm hover:shadow-lg hover:shadow-rose-200 transition-colors disabled:opacity-60 flex items-center justify-center gap-2"
                                >
                                    {isDeleting ? <Loader2 className="w-4 h-4 animate-spin" /> : <Trash2 className="w-4 h-4" />}
                                    {isDeleting ? 'Deleting...' : 'Delete'}
                                </button>
                            </div>
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>

            {/* ── Edit Meeting Modal (Reschedule + Info) ────────────────────────── */}
            <AnimatePresence>
                {editMeeting && (
                    <motion.div
                        initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
                        className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm p-4 overflow-y-auto"
                    >
                        <motion.div
                            initial={{ scale: 0.9, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} exit={{ scale: 0.9, opacity: 0 }}
                            className="bg-white rounded-3xl shadow-2xl w-full max-w-2xl my-auto overflow-hidden"
                        >
                            <div className="px-6 py-5 bg-gradient-to-r from-[#2076C7] to-[#1CADA3] text-white flex items-center justify-between">
                                <div className="flex items-center gap-3">
                                    <div className="w-10 h-10 bg-white/20 backdrop-blur-md rounded-xl flex items-center justify-center">
                                        <Edit3 className="w-5 h-5" />
                                    </div>
                                    <div>
                                        <h3 className="font-bold text-lg">Edit Consultation</h3>
                                        <p className="text-xs text-blue-50 opacity-80">ID: #{editMeeting.id} • {editMeeting.customer_name}</p>
                                    </div>
                                </div>
                                <button onClick={() => setEditMeeting(null)} className="p-2 hover:bg-white/10 rounded-xl transition-colors">
                                    <X className="w-5 h-5" />
                                </button>
                            </div>

                            <div className="p-6 sm:p-8 space-y-6">
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                    {/* Column 1: Date & Time */}
                                    <div className="space-y-4">
                                        <div>
                                            <label className="block text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1.5">Reschedule Date</label>
                                            <div className="relative">
                                                <Calendar className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                                                <input
                                                    type="date"
                                                    value={editMeeting.meeting_date.split('T')[0]}
                                                    onChange={e => setEditMeeting({ ...editMeeting, meeting_date: e.target.value })}
                                                    className="w-full pl-10 pr-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm font-bold text-slate-700 focus:outline-none focus:border-[#2076C7] focus:bg-white transition-all"
                                                />
                                            </div>
                                        </div>
                                        <div>
                                            <label className="block text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1.5">Reschedule Time</label>
                                            <div className="relative">
                                                <Clock className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                                                <select
                                                    value={editMeeting.meeting_time}
                                                    onChange={e => setEditMeeting({ ...editMeeting, meeting_time: e.target.value })}
                                                    className="w-full pl-10 pr-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm font-bold text-slate-700 focus:outline-none focus:border-[#2076C7] focus:bg-white transition-all appearance-none"
                                                >
                                                    {['10:00 AM', '11:00 AM', '12:00 PM', '01:00 PM', '02:00 PM', '03:00 PM', '04:00 PM', '05:00 PM', '06:00 PM'].map(t => (
                                                        <option key={t} value={t}>{t}</option>
                                                    ))}
                                                </select>
                                            </div>
                                        </div>
                                        <div>
                                            <label className="block text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1.5">Meeting Status</label>
                                            <div className="grid grid-cols-3 gap-2">
                                                {['PENDING', 'COMPLETE', 'INCOMPLETE'].map(s => (
                                                    <button
                                                        key={s}
                                                        type="button"
                                                        onClick={() => setEditMeeting({ ...editMeeting, status: s })}
                                                        className={`py-2 rounded-lg text-[10px] font-black tracking-tighter transition-all border ${editMeeting.status.toUpperCase() === s
                                                            ? (s === 'COMPLETE' ? 'bg-emerald-500 border-emerald-500 text-white shadow-md shadow-emerald-100' : s === 'INCOMPLETE' ? 'bg-rose-500 border-rose-500 text-white shadow-md shadow-rose-100' : 'bg-blue-500 border-blue-500 text-white shadow-md shadow-blue-100')
                                                            : 'bg-white border-slate-200 text-slate-400 hover:border-slate-300'
                                                            }`}
                                                    >
                                                        {s}
                                                    </button>
                                                ))}
                                            </div>
                                        </div>
                                    </div>

                                    {/* Column 2: Details */}
                                    <div className="space-y-4">
                                        <div>
                                            <label className="block text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1.5">Meeting Topic</label>
                                            <input
                                                type="text"
                                                value={editMeeting.topic}
                                                onChange={e => setEditMeeting({ ...editMeeting, topic: e.target.value })}
                                                className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm font-bold text-slate-700 focus:outline-none focus:border-[#2076C7] focus:bg-white transition-all"
                                            />
                                        </div>
                                        <div>
                                            <label className="block text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1.5">Meeting Type</label>
                                            <div className="grid grid-cols-3 gap-2">
                                                {['Video', 'Phone', 'In-Person'].map(t => (
                                                    <button
                                                        key={t}
                                                        type="button"
                                                        onClick={() => setEditMeeting({ ...editMeeting, meeting_type: t })}
                                                        className={`py-2 rounded-lg text-[10px] font-black tracking-tighter transition-all border ${editMeeting.meeting_type.toLowerCase() === t.toLowerCase()
                                                            ? 'bg-slate-800 border-slate-800 text-white shadow-md shadow-slate-200'
                                                            : 'bg-white border-slate-200 text-slate-400 hover:border-slate-300'
                                                            }`}
                                                    >
                                                        {t}
                                                    </button>
                                                ))}
                                            </div>
                                        </div>
                                        <div>
                                            <label className="block text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1.5">Meeting Link / Address</label>
                                            <input
                                                type="text"
                                                value={editMeeting.meeting_link || ''}
                                                onChange={e => setEditMeeting({ ...editMeeting, meeting_link: e.target.value })}
                                                placeholder={editMeeting.meeting_type === 'In-Person' ? 'Office Address' : 'Meeting Link'}
                                                className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm font-bold text-slate-700 focus:outline-none focus:border-[#2076C7] focus:bg-white transition-all"
                                            />
                                        </div>
                                    </div>
                                </div>

                                <div>
                                    <label className="block text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1.5">Internal Notes</label>
                                    <textarea
                                        rows={3}
                                        value={editMeeting.note || ''}
                                        onChange={e => setEditMeeting({ ...editMeeting, note: e.target.value })}
                                        className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl text-sm font-bold text-slate-700 focus:outline-none focus:border-[#2076C7] focus:bg-white transition-all resize-none"
                                        placeholder="Add any internal remarks or meeting summary..."
                                    />
                                </div>

                                <div className="flex gap-3 pt-4 border-t border-slate-100">
                                    <button
                                        onClick={() => setEditMeeting(null)}
                                        className="flex-1 py-3.5 rounded-2xl border border-slate-200 text-slate-500 font-bold text-xs uppercase tracking-widest hover:bg-slate-50 transition-colors"
                                    >
                                        Cancel
                                    </button>
                                    <button
                                        onClick={handleUpdateMeeting}
                                        disabled={isUpdatingStatus}
                                        className="flex-[2] py-3.5 bg-gradient-to-r from-[#2076C7] to-[#1CADA3] text-white font-bold text-xs uppercase tracking-widest rounded-2xl shadow-lg shadow-blue-500/20 hover:opacity-90 disabled:opacity-50 transition-all flex items-center justify-center gap-2"
                                    >
                                        {isUpdatingStatus ? <Loader2 className="w-4 h-4 animate-spin" /> : <CheckCircle className="w-4 h-4" />}
                                        {isUpdatingStatus ? 'Updating...' : 'Save Changes'}
                                    </button>
                                </div>
                            </div>
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>

            {/* ── Header ────────────────────────────────────────────────────────── */}
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div className="flex items-center gap-3">
                    <div className="w-12 h-12 bg-gradient-to-r from-[#2076C7] to-[#1CADA3] rounded-2xl flex items-center justify-center shadow-lg shadow-blue-100">
                        <CalendarDays className="w-6 h-6 text-white" />
                    </div>
                    <div>
                        <h1 className="text-2xl font-black text-slate-900 tracking-tight">NPS Consultations</h1>
                        <p className="text-sm text-slate-500 font-medium">Manage scheduled meetings and customer engagements</p>
                    </div>
                </div>
            </div>

            {/* ── Stats Row ─────────────────────────────────────────────────────── */}
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
                {[
                    { icon: CalendarDays, label: 'Total Consultations', value: meetings.length, color: 'text-[#2076C7] bg-blue-50' },
                    {
                        icon: Clock,
                        label: 'Pending',
                        value: meetings.filter(m => m.status?.toUpperCase() === 'PENDING').length,
                        color: 'text-blue-600 bg-blue-50'
                    },
                    {
                        icon: CheckCircle,
                        label: 'Complete',
                        value: meetings.filter(m => m.status?.toUpperCase() === 'COMPLETE').length,
                        color: 'text-emerald-600 bg-emerald-50'
                    },
                    {
                        icon: AlertCircle,
                        label: 'Incomplete',
                        value: meetings.filter(m => m.status?.toUpperCase() === 'INCOMPLETE').length,
                        color: 'text-rose-600 bg-rose-50'
                    },
                ].map((s, i) => (
                    <motion.div
                        key={i}
                        initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.08 }}
                        className="bg-white rounded-2xl border border-slate-100 shadow-sm p-4 flex flex-col sm:flex-row items-center sm:items-start gap-3"
                    >
                        <div className={`w-10 h-10 shrink-0 rounded-xl flex items-center justify-center ${s.color}`}>
                            <s.icon className="w-5 h-5" />
                        </div>
                        <div className="text-center sm:text-left overflow-hidden">
                            <p className="text-xl font-black text-slate-900 truncate">{isLoading ? '…' : s.value}</p>
                            <p className="text-[10px] font-bold text-slate-400 uppercase tracking-wider truncate">{s.label}</p>
                        </div>
                    </motion.div>
                ))}
            </div>

            {/* ── Data Table ────────────────────────────────────────────────────── */}
            <motion.div
                initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }}
                className="bg-white rounded-3xl border border-slate-200 shadow-sm overflow-hidden"
            >
                {/* Table Header */}
                <div className="px-6 py-4 border-b border-slate-100 flex flex-col sm:flex-row sm:items-center gap-4">
                    <div className="flex items-center gap-3 flex-1">
                        <div className="w-9 h-9 bg-slate-50 rounded-xl flex items-center justify-center">
                            <User className="w-4 h-4 text-slate-500" />
                        </div>
                        <div>
                            <h2 className="font-bold text-slate-800 text-sm">Meeting Directory</h2>
                            <p className="text-xs text-slate-400">{filtered.length} record{filtered.length !== 1 ? 's' : ''} found</p>
                        </div>
                    </div>
                    <div className="flex items-center gap-3">
                        {/* Search */}
                        <div className="relative">
                            <Search className="w-3.5 h-3.5 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
                            <input
                                type="text"
                                placeholder="Search client or topic..."
                                value={search}
                                onChange={e => { setSearch(e.target.value); setPage(1); }}
                                className="pl-9 pr-4 py-2 text-xs border border-slate-200 rounded-xl bg-slate-50 text-slate-700 placeholder-slate-400 focus:outline-none focus:border-[#2076C7] focus:bg-white transition-all w-56"
                            />
                        </div>
                        {/* Status filter */}
                        <div className="relative">
                            <Filter className="w-3.5 h-3.5 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none" />
                            <select
                                value={statusFilter}
                                onChange={e => { setStatusFilter(e.target.value); setPage(1); }}
                                className="pl-9 pr-4 py-2 text-xs border border-slate-200 rounded-xl bg-slate-50 text-slate-700 focus:outline-none focus:border-[#2076C7] focus:bg-white transition-all appearance-none cursor-pointer"
                            >
                                {STATUSES.map(c => <option key={c} value={c}>{c}</option>)}
                            </select>
                        </div>
                    </div>
                </div>

                {/* Table */}
                <div className="overflow-x-auto">
                    <table className="w-full text-sm">
                        <thead>
                            <tr className="bg-slate-50 border-b border-slate-100">
                                {['Date & Time', 'Customer Info', 'Topic', 'Type', 'Status', 'Actions'].map((h, i) => (
                                    <th key={i} className="px-6 py-4 text-left text-[10px] font-black text-slate-500 uppercase tracking-widest whitespace-nowrap">
                                        {h}
                                    </th>
                                ))}
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-slate-100">
                            {isLoading ? (
                                <tr>
                                    <td colSpan={6} className="py-20 text-center">
                                        <Loader2 className="w-8 h-8 animate-spin text-blue-300 mx-auto" />
                                        <p className="text-slate-400 text-xs mt-3 font-medium">Loading consultations...</p>
                                    </td>
                                </tr>
                            ) : paginated.length === 0 ? (
                                <tr>
                                    <td colSpan={6} className="py-20 text-center">
                                        <div className="w-16 h-16 bg-slate-50 rounded-full flex items-center justify-center mx-auto mb-4 border border-slate-100">
                                            <CalendarDays className="w-8 h-8 text-slate-300" />
                                        </div>
                                        <p className="text-slate-500 text-sm font-bold">
                                            {search || statusFilter !== 'All' ? 'No meetings match your filters' : 'No meetings scheduled yet'}
                                        </p>
                                        <p className="text-slate-400 text-xs mt-1.5">
                                            {search || statusFilter !== 'All' ? 'Try adjusting your search or filter' : 'Customers can schedule meetings from their dashboard.'}
                                        </p>
                                    </td>
                                </tr>
                            ) : (
                                paginated.map((meeting, idx) => (
                                    <motion.tr
                                        key={meeting.id ?? idx}
                                        initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: idx * 0.03 }}
                                        className="hover:bg-blue-50/40 transition-colors group cursor-default"
                                    >
                                        <td className="px-6 py-4">
                                            <div className="flex items-center gap-2">
                                                <Calendar className="w-3.5 h-3.5 text-slate-400" />
                                                <span className="font-bold text-slate-800 text-sm">
                                                    {new Date(meeting.meeting_date).toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' })}
                                                </span>
                                            </div>
                                            <div className="flex items-center gap-2 mt-1">
                                                <Clock className="w-3.5 h-3.5 text-slate-400" />
                                                <span className="font-semibold text-slate-500 text-xs">{meeting.meeting_time}</span>
                                            </div>
                                        </td>
                                        <td className="px-6 py-4">
                                            <p className="font-bold text-slate-800 text-sm mb-0.5">{meeting.customer_name || 'N/A'}</p>
                                            <div className="flex flex-col gap-1">
                                                <div className="flex items-center gap-1.5 text-slate-500 text-xs">
                                                    <Mail className="w-3 h-3" />
                                                    <span className="truncate max-w-[150px]">{meeting.customer_email || 'N/A'}</span>
                                                </div>
                                                {meeting.whatsapp_number && (
                                                    <div className="flex items-center gap-1.5 text-emerald-600 text-[10px] font-bold">
                                                        <MessageSquare className="w-3 h-3" />
                                                        {meeting.whatsapp_number}
                                                    </div>
                                                )}
                                            </div>
                                        </td>
                                        <td className="px-6 py-4">
                                            <p className="font-bold text-slate-700 text-sm">{meeting.topic}</p>
                                            {meeting.note && (
                                                <p className="text-xs text-slate-400 mt-1 line-clamp-1 max-w-[200px]" title={meeting.note}>
                                                    {meeting.note}
                                                </p>
                                            )}
                                        </td>
                                        <td className="px-6 py-4">
                                            <TypeBadge type={meeting.meeting_type} />
                                        </td>
                                        <td className="px-6 py-4">
                                            <StatusBadge status={meeting.status} />
                                        </td>
                                        <td className="px-6 py-4">
                                            <div className="flex items-center gap-2">
                                                <button
                                                    onClick={() => setEditMeeting(meeting)}
                                                    className="p-2.5 bg-slate-50 text-slate-600 hover:text-[#2076C7] hover:bg-blue-100 rounded-xl transition-all border border-slate-200 hover:border-blue-200"
                                                    title="Update Status"
                                                >
                                                    <Edit3 className="w-4 h-4" />
                                                </button>
                                                <button
                                                    onClick={() => setDeleteId(meeting.id)}
                                                    className="p-2.5 bg-slate-50 text-slate-600 hover:text-rose-600 hover:bg-rose-100 rounded-xl transition-all border border-slate-200 hover:border-rose-200"
                                                    title="Delete Meeting"
                                                >
                                                    <Trash2 className="w-4 h-4" />
                                                </button>
                                            </div>
                                        </td>
                                    </motion.tr>
                                ))
                            )}
                        </tbody>
                    </table>
                </div>

                {/* Pagination */}
                {!isLoading && filtered.length > PAGE_SIZE && (
                    <div className="px-6 py-4 border-t border-slate-100 flex items-center justify-between bg-slate-50/50">
                        <p className="text-xs text-slate-500 font-medium">
                            Showing <span className="font-bold text-slate-700">{(page - 1) * PAGE_SIZE + 1}</span> to <span className="font-bold text-slate-700">{Math.min(page * PAGE_SIZE, filtered.length)}</span> of <span className="font-bold text-slate-700">{filtered.length}</span>
                        </p>
                        <div className="flex items-center gap-2">
                            <button
                                onClick={() => setPage(p => Math.max(1, p - 1))}
                                disabled={page === 1}
                                className="p-2 rounded-xl border border-slate-200 bg-white text-slate-500 hover:border-[#2076C7] hover:text-[#2076C7] disabled:opacity-30 disabled:cursor-not-allowed transition-all shadow-sm"
                            >
                                <ChevronLeft className="w-4 h-4" />
                            </button>
                            {Array.from({ length: Math.min(totalPages, 5) }, (_, i) => {
                                const pg = i + 1;
                                return (
                                    <button
                                        key={pg}
                                        onClick={() => setPage(pg)}
                                        className={`w-8 h-8 rounded-xl text-xs font-bold transition-all shadow-sm ${page === pg
                                            ? 'bg-gradient-to-r from-[#2076C7] to-[#1CADA3] text-white shadow-md shadow-blue-200 border-transparent'
                                            : 'bg-white border border-slate-200 text-slate-600 hover:border-[#2076C7] hover:text-[#2076C7]'}`}
                                    >
                                        {pg}
                                    </button>
                                );
                            })}
                            <button
                                onClick={() => setPage(p => Math.min(totalPages, p + 1))}
                                disabled={page === totalPages}
                                className="p-2 rounded-xl border border-slate-200 bg-white text-slate-500 hover:border-[#2076C7] hover:text-[#2076C7] disabled:opacity-30 disabled:cursor-not-allowed transition-all shadow-sm"
                            >
                                <ChevronRight className="w-4 h-4" />
                            </button>
                        </div>
                    </div>
                )}
            </motion.div>
        </div>
    );
}
