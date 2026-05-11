'use client';

import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
    Upload, FileSpreadsheet, X, Zap, Loader2, Landmark, Download,
    CheckCircle, AlertCircle, RefreshCw, Search, Trash2, Filter,
    ChevronLeft, ChevronRight, Database, TrendingUp, Building2, Star, Pencil
} from "lucide-react";
import { FDAdminService } from '../../../../services/fdAdminServices';

// ── Types ──────────────────────────────────────────────────────────────────
interface FDPlan {
    id: number;
    company_name: string;
    category: string;
    one_year_rate: number | null;
    two_year_rate: number | null;
    three_year_rate: number | null;
    five_year_rate: number | null;
    best_rate: number | null;
    senior_citizen_rate: number | null;
    special_offer: string | null;
    updated_at: string | null;
    created_at: string | null;
}

type ToastType = 'success' | 'error' | 'info';

const CATEGORIES = ['All', 'Public Sector Banks', 'Private Sector Banks', 'Small Finance Banks', 'NBFC'];
const PAGE_SIZE = 10;

// ── Helpers ────────────────────────────────────────────────────────────────
const fmt = (v: number | null) => (v != null ? `${v}%` : '—');

const Badge = ({ label }: { label: string }) => {
    const normalized = label.trim().toUpperCase();
    const isNBFC = normalized === 'NBFC' || normalized === 'NBFCS';

    const colors: Record<string, string> = {
        'PUBLIC SECTOR BANK': 'bg-blue-100 text-blue-700',
        'PUBLIC SECTOR BANKS': 'bg-blue-100 text-blue-700',
        'PRIVATE SECTOR BANK': 'bg-violet-100 text-violet-700',
        'PRIVATE SECTOR BANKS': 'bg-violet-100 text-violet-700',
        'SMALL FINANCE BANK': 'bg-emerald-100 text-emerald-700',
        'SMALL FINANCE BANKS': 'bg-emerald-100 text-emerald-700',
    };

    const colorClass = isNBFC ? 'bg-rose-100 text-rose-700' : (colors[normalized] ?? 'bg-slate-100 text-slate-600');

    return (
        <span className={`px-2 py-0.5 rounded-full text-[10px] font-bold tracking-wide whitespace-nowrap ${colorClass}`}>
            {label}
        </span>
    );
};

// ── Main Page ──────────────────────────────────────────────────────────────
export default function FDAdminPage() {
    const [file, setFile] = useState<File | null>(null);
    const [isUploading, setIsUploading] = useState(false);
    const [progress, setProgress] = useState({ percent: 0, status: 'Waiting...' });
    const [toast, setToast] = useState<{ message: string; type: ToastType } | null>(null);

    const [plans, setPlans] = useState<FDPlan[]>([]);
    const [isLoading, setIsLoading] = useState(false);
    const [search, setSearch] = useState('');
    const [category, setCategory] = useState('All');
    const [page, setPage] = useState(1);

    const [deleteId, setDeleteId] = useState<number | null>(null);
    const [isDeleting, setIsDeleting] = useState(false);

    const [editPlan, setEditPlan] = useState<FDPlan | null>(null);
    const [isUpdatingPlan, setIsUpdatingPlan] = useState(false);

    const [isClient, setIsClient] = useState(false);
    const fileInputRef = useRef<HTMLInputElement>(null);

    useEffect(() => { setIsClient(true); fetchPlans(); }, []);

    const showToast = (message: string, type: ToastType) => {
        setToast({ message, type });
        setTimeout(() => setToast(null), type === 'error' ? 5000 : 3000);
    };

    // ── Fetch (stub ready for your API) ─────────────────────────────────────
    const fetchPlans = async () => {
        setIsLoading(true);
        try {
            const data = await FDAdminService.getFDPlans();
            setPlans(Array.isArray(data) ? data : []);
        } catch {
            showToast('Failed to load FD plans', 'error');
        } finally {
            setIsLoading(false);
        }
    };

    // ── Delete (stub — wire your API here) ──────────────────────────────────
    const handleDelete = async () => {
        if (deleteId == null) return;
        setIsDeleting(true);
        try {
            // TODO: replace with real delete call e.g. await FDAdminService.deleteFDPlan(deleteId);
            await FDAdminService.deleteFDPlan(deleteId);
            setPlans(prev => prev.filter(p => p.id !== deleteId));
            showToast('FD plan deleted successfully', 'success');
        } catch {
            showToast('Failed to delete FD plan', 'error');
        } finally {
            setIsDeleting(false);
            setDeleteId(null);
        }
    };
    // ── Update ───────────────────────────────────────────────────────────────
    const handleUpdate = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!editPlan) return;
        setIsUpdatingPlan(true);
        try {
            await FDAdminService.updateFDPlan(editPlan.id, editPlan);
            showToast('FD plan updated successfully', 'success');
            setEditPlan(null);
            fetchPlans();
        } catch (err: any) {
            showToast(`Update failed: ${err.response?.data?.message || err.message}`, 'error');
        } finally {
            setIsUpdatingPlan(false);
        }
    };

    // ── Upload ───────────────────────────────────────────────────────────────
    const startUpload = async () => {
        if (!file) { showToast('Please select a file first', 'error'); return; }
        setIsUploading(true);
        setProgress({ percent: 30, status: 'Uploading...' });
        showToast(`Uploading ${file.name}...`, 'info');
        try {
            const res = await FDAdminService.uploadFDPlans(file);
            setProgress({ percent: 100, status: 'Completed' });
            showToast(`✓ ${res.rowsProcessed || 'All'} rows processed`, 'success');
            fetchPlans();
            setTimeout(() => { setFile(null); setProgress({ percent: 0, status: 'Waiting...' }); }, 3000);
        } catch (err: any) {
            setProgress({ percent: 0, status: 'Failed' });
            showToast(`✗ Upload failed: ${err.response?.data?.message || err.message}`, 'error');
        } finally {
            setIsUploading(false);
        }
    };

    // ── Export CSV ───────────────────────────────────────────────────────────
    const exportToCSV = () => {
        if (filtered.length === 0) {
            showToast('No data to export', 'error');
            return;
        }

        const headers = [
            'Company Name', 'Category', '1Y Rate', '2Y Rate', '3Y Rate', '5Y Rate',
            'Best Rate', 'Senior Citizen Rate', 'Special Offer'
        ];

        const rows = filtered.map(p => [
            `"${p.company_name}"`,
            `"${p.category}"`,
            p.one_year_rate ?? '',
            p.two_year_rate ?? '',
            p.three_year_rate ?? '',
            p.five_year_rate ?? '',
            p.best_rate ?? '',
            p.senior_citizen_rate ?? '',
            `"${p.special_offer || ''}"`
        ]);

        const csvContent = [headers, ...rows].map(e => e.join(",")).join("\n");
        const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
        const url = URL.createObjectURL(blob);
        const link = document.createElement("a");
        link.setAttribute("href", url);
        link.setAttribute("download", `FD_Plans_${new Date().toISOString().split('T')[0]}.csv`);
        link.style.visibility = 'hidden';
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
    };

    // ── Filtered + paginated data ────────────────────────────────────────────
    const filtered = plans.filter(p => {
        const matchSearch = p.company_name.toLowerCase().includes(search.toLowerCase());

        // Normalize categories for comparison (handle singular/plural differences)
        const normalize = (cat: string) => {
            const c = cat.trim().toUpperCase();
            if (c === 'NBFC' || c === 'NBFCS') return 'NBFC';
            return c.endsWith('S') ? c.slice(0, -1) : c;
        };

        const matchCat = category === 'All' || normalize(p.category) === normalize(category);
        return matchSearch && matchCat;
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
                            <h3 className="text-xl font-bold text-slate-900 text-center mb-2">Delete FD Plan?</h3>
                            <p className="text-sm text-slate-500 text-center mb-6">
                                This action cannot be undone. The FD plan and all its rate data will be permanently removed.
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

            {/* ── Header ────────────────────────────────────────────────────────── */}
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div className="flex items-center gap-3">
                    <div className="w-12 h-12 bg-gradient-to-r from-[#2076C7] to-[#1CADA3] rounded-2xl flex items-center justify-center shadow-lg shadow-blue-100">
                        <Landmark className="w-6 h-6 text-white" />
                    </div>
                    <div>
                        <h1 className="text-2xl font-black text-slate-900 tracking-tight">FD Management</h1>
                        <div className="flex items-center gap-2">
                            <p className="text-sm text-slate-500 font-medium">Upload, view and manage Fixed Deposit plans</p>
                            {plans.length > 0 && (
                                <>
                                    <span className="text-slate-300">•</span>
                                    <p className="text-[10px] font-bold text-[#2076C7] bg-blue-50 px-2 py-0.5 rounded-full uppercase tracking-tighter">
                                        Last Updated: {(() => {
                                            const latest = plans.reduce((max, p) => {
                                                const date = p.updated_at || p.created_at;
                                                if (!date) return max;
                                                return !max || new Date(date) > new Date(max) ? date : max;
                                            }, null as string | null);
                                            return latest ? new Date(latest).toLocaleDateString('en-IN', { day: '2-digit', month: 'short', hour: '2-digit', minute: '2-digit' }) : 'Never';
                                        })()}
                                    </p>
                                </>
                            )}
                        </div>
                    </div>
                </div>
                <div className="flex items-center gap-3">
                    <button
                        onClick={fetchPlans}
                        className="flex items-center gap-2 px-5 py-2.5 bg-gradient-to-r from-[#2076C7] to-[#1CADA3] text-white rounded-xl text-sm font-bold hover:shadow-lg hover:shadow-blue-200 transition-all shadow-sm active:scale-95"
                    >
                        <RefreshCw className={`w-4 h-4 ${isLoading ? 'animate-spin' : ''}`} />
                        Sync Data
                    </button>
                    <button
                        onClick={exportToCSV}
                        className="flex items-center gap-2 px-5 py-2.5 bg-white border border-slate-200 text-slate-600 rounded-xl text-sm font-bold hover:bg-slate-50 hover:border-slate-300 transition-all shadow-sm active:scale-95"
                    >
                        <Download className="w-4 h-4" />
                        Export CSV
                    </button>
                </div>
            </div>

            {/* ── Stats Row ─────────────────────────────────────────────────────── */}
            <div className="grid grid-cols-2 lg:grid-cols-5 gap-4">
                {[
                    { icon: Database, label: 'Total Plans', value: plans.length, color: 'text-[#2076C7] bg-blue-50' },
                    {
                        icon: Landmark,
                        label: 'Public Sector',
                        value: plans.filter(p => p.category.toLowerCase().includes('public sector')).length,
                        color: 'text-blue-600 bg-blue-50'
                    },
                    {
                        icon: Building2,
                        label: 'Private Sector',
                        value: plans.filter(p => p.category.toLowerCase().includes('private sector')).length,
                        color: 'text-violet-600 bg-violet-50'
                    },
                    {
                        icon: Star,
                        label: 'Small Finance',
                        value: plans.filter(p => p.category.toLowerCase().includes('small finance')).length,
                        color: 'text-emerald-600 bg-emerald-50'
                    },
                    {
                        icon: TrendingUp,
                        label: 'NBFC',
                        value: plans.filter(p => p.category.toLowerCase().includes('nbfc')).length,
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

            {/* ── Upload Card ───────────────────────────────────────────────────── */}
            <motion.div
                initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }}
                className="bg-white rounded-3xl border border-slate-200 shadow-sm overflow-hidden"
            >
                <div className="px-6 py-4 border-b border-slate-100 flex items-center gap-3">
                    <div className="w-9 h-9 bg-blue-50 rounded-xl flex items-center justify-center">
                        <Upload className="w-4 h-4 text-[#2076C7]" />
                    </div>
                    <div>
                        <h2 className="font-bold text-slate-800 text-sm">Sync New Rates via CSV</h2>
                        <p className="text-xs text-slate-400">Upload a CSV to insert or update FD plans in bulk</p>
                    </div>
                </div>
                <div className="p-6 space-y-5">
                    {!file ? (
                        <div
                            onClick={() => fileInputRef.current?.click()}
                            className="group border-2 border-dashed border-slate-200 rounded-2xl p-10 text-center cursor-pointer hover:border-[#2076C7] hover:bg-blue-50 transition-all"
                        >
                            <div className="w-16 h-16 bg-slate-50 rounded-2xl flex items-center justify-center mx-auto mb-4 text-slate-300 group-hover:text-[#2076C7] group-hover:bg-white group-hover:shadow-lg transition-all">
                                <FileSpreadsheet className="w-8 h-8" />
                            </div>
                            <p className="font-bold text-slate-600 mb-1">Drop CSV file here or click to browse</p>
                            <p className="text-xs text-slate-400">Only .csv • Max 10MB</p>
                            <input type="file" ref={fileInputRef} onChange={e => setFile(e.target.files?.[0] || null)} accept=".csv" hidden />
                        </div>
                    ) : (
                        <div className="flex items-center justify-between bg-blue-50 border border-blue-100 rounded-2xl p-4">
                            <div className="flex items-center gap-3">
                                <div className="w-10 h-10 bg-white rounded-xl flex items-center justify-center text-[#2076C7] shadow-sm">
                                    <FileSpreadsheet className="w-5 h-5" />
                                </div>
                                <div>
                                    <p className="font-bold text-slate-800 text-sm truncate max-w-xs">{file.name}</p>
                                    <p className="text-xs text-[#2076C7]">{(file.size / 1024).toFixed(1)} KB · Ready</p>
                                </div>
                            </div>
                            <button onClick={() => setFile(null)} className="p-2 text-slate-400 hover:text-rose-500 rounded-xl transition-colors" disabled={isUploading}>
                                <X className="w-4 h-4" />
                            </button>
                        </div>
                    )}
                    {progress.percent > 0 && (
                        <div className="space-y-1.5">
                            <div className="flex justify-between text-xs font-bold text-slate-400">
                                <span>{progress.status}</span>
                                <span className="text-[#2076C7]">{progress.percent}%</span>
                            </div>
                            <div className="h-2 bg-slate-100 rounded-full overflow-hidden">
                                <motion.div
                                    initial={{ width: 0 }} animate={{ width: `${progress.percent}%` }}
                                    className="h-full bg-gradient-to-r from-[#2076C7] to-[#1CADA3] rounded-full"
                                />
                            </div>
                        </div>
                    )}
                    <button
                        onClick={startUpload}
                        disabled={!file || isUploading}
                        className="w-full py-4 bg-gradient-to-r from-[#2076C7] to-[#1CADA3] text-white font-bold text-xs uppercase tracking-widest rounded-xl hover:shadow-lg hover:shadow-blue-200 transition-colors disabled:opacity-40 disabled:cursor-not-allowed flex items-center justify-center gap-2 shadow-lg shadow-blue-100"
                    >
                        {isUploading ? <><Loader2 className="w-4 h-4 animate-spin" />Processing...</> : <><Zap className="w-4 h-4" />Initialize Sync</>}
                    </button>
                </div>
            </motion.div>

            {/* ── Data Table ────────────────────────────────────────────────────── */}
            <motion.div
                initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }}
                className="bg-white rounded-3xl border border-slate-200 shadow-sm overflow-hidden"
            >
                {/* Table Header */}
                <div className="px-6 py-4 border-b border-slate-100 flex flex-col sm:flex-row sm:items-center gap-4">
                    <div className="flex items-center gap-3 flex-1">
                        <div className="w-9 h-9 bg-slate-50 rounded-xl flex items-center justify-center">
                            <Database className="w-4 h-4 text-slate-500" />
                        </div>
                        <div>
                            <h2 className="font-bold text-slate-800 text-sm">FD Plans Directory</h2>
                            <p className="text-xs text-slate-400">{filtered.length} plan{filtered.length !== 1 ? 's' : ''} found</p>
                        </div>
                    </div>
                    <div className="flex items-center gap-3">
                        {/* Search */}
                        <div className="relative">
                            <Search className="w-3.5 h-3.5 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
                            <input
                                type="text"
                                placeholder="Search company..."
                                value={search}
                                onChange={e => { setSearch(e.target.value); setPage(1); }}
                                className="pl-9 pr-4 py-2 text-xs border border-slate-200 rounded-xl bg-slate-50 text-slate-700 placeholder-slate-400 focus:outline-none focus:border-[#2076C7] focus:bg-white transition-all w-44"
                            />
                        </div>
                        {/* Category filter */}
                        <div className="relative">
                            <Filter className="w-3.5 h-3.5 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none" />
                            <select
                                value={category}
                                onChange={e => { setCategory(e.target.value); setPage(1); }}
                                className="pl-9 pr-4 py-2 text-xs border border-slate-200 rounded-xl bg-slate-50 text-slate-700 focus:outline-none focus:border-[#2076C7] focus:bg-white transition-all appearance-none cursor-pointer"
                            >
                                {CATEGORIES.map(c => <option key={c} value={c}>{c}</option>)}
                            </select>
                        </div>
                    </div>
                </div>

                {/* Table */}
                <div className="overflow-x-auto">
                    <table className="w-full text-sm">
                        <thead>
                            <tr className="bg-slate-50 border-b border-slate-100">
                                {['Company', 'Category', '1Y Rate', '2Y Rate', '3Y Rate', '5Y Rate', 'Best Rate', 'Sr. Citizen', 'Offer', ''].map((h, i) => (
                                    <th key={i} className="px-4 py-3 text-left text-[10px] font-black text-slate-600 uppercase tracking-wider whitespace-nowrap">
                                        {h}
                                    </th>
                                ))}
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-slate-50">
                            {isLoading ? (
                                <tr>
                                    <td colSpan={10} className="py-16 text-center">
                                        <Loader2 className="w-8 h-8 animate-spin text-blue-300 mx-auto" />
                                        <p className="text-slate-400 text-xs mt-3 font-medium">Loading plans...</p>
                                    </td>
                                </tr>
                            ) : paginated.length === 0 ? (
                                <tr>
                                    <td colSpan={10} className="py-16 text-center">
                                        <div className="w-14 h-14 bg-slate-100 rounded-2xl flex items-center justify-center mx-auto mb-3">
                                            <Database className="w-6 h-6 text-slate-300" />
                                        </div>
                                        <p className="text-slate-400 text-sm font-semibold">
                                            {search || category !== 'All' ? 'No plans match your filters' : 'No FD plans uploaded yet'}
                                        </p>
                                        <p className="text-slate-300 text-xs mt-1">
                                            {search || category !== 'All' ? 'Try adjusting your search or filter' : 'Upload a CSV to get started'}
                                        </p>
                                    </td>
                                </tr>
                            ) : (
                                paginated.map((plan, idx) => (
                                    <motion.tr
                                        key={plan.id ?? idx}
                                        initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: idx * 0.03 }}
                                        className="hover:bg-blue-50/40 transition-all duration-200 group cursor-default"
                                    >
                                        <td className="px-4 py-3.5 font-semibold text-slate-800 whitespace-nowrap max-w-[160px] truncate group-hover:translate-x-1 transition-transform duration-200">
                                            {plan.company_name}
                                        </td>
                                        <td className="px-4 py-3.5"><Badge label={plan.category} /></td>
                                        <td className="px-4 py-3.5 text-slate-600 font-bold text-xs">{fmt(plan.one_year_rate)}</td>
                                        <td className="px-4 py-3.5 text-slate-600 font-bold text-xs">{fmt(plan.two_year_rate)}</td>
                                        <td className="px-4 py-3.5 text-slate-600 font-bold text-xs">{fmt(plan.three_year_rate)}</td>
                                        <td className="px-4 py-3.5 text-slate-600 font-bold text-xs">{fmt(plan.five_year_rate)}</td>
                                        <td className="px-4 py-3.5">
                                            {plan.best_rate != null ? (
                                                <span className="inline-flex items-center gap-1 text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-lg text-xs font-bold">
                                                    <TrendingUp className="w-3 h-3" />{plan.best_rate}%
                                                </span>
                                            ) : '—'}
                                        </td>
                                        <td className="px-4 py-3.5 text-slate-600 font-bold text-xs">{fmt(plan.senior_citizen_rate)}</td>
                                        <td className="px-4 py-3.5 max-w-[140px]">
                                            {plan.special_offer ? (
                                                <span className="inline-flex items-center gap-1 text-amber-700 bg-amber-50 px-2 py-0.5 rounded-lg text-xs font-semibold truncate max-w-full">
                                                    <Star className="w-3 h-3 shrink-0" />
                                                    <span className="truncate">{plan.special_offer}</span>
                                                </span>
                                            ) : <span className="text-slate-300 text-xs">—</span>}
                                        </td>
                                        <td className="px-4 py-3.5">
                                            <div className="flex items-center gap-1">
                                                <button
                                                    onClick={() => setEditPlan(plan)}
                                                    className="p-2 text-slate-400 hover:text-[#2076C7] hover:bg-blue-50 rounded-xl transition-all"
                                                    title="Edit plan"
                                                >
                                                    <Pencil className="w-4 h-4" />
                                                </button>
                                                <button
                                                    onClick={() => setDeleteId(plan.id)}
                                                    className="p-2 text-slate-400 hover:text-rose-500 hover:bg-rose-50 rounded-xl transition-all"
                                                    title="Delete plan"
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
                    <div className="px-6 py-4 border-t border-slate-100 flex items-center justify-between">
                        <p className="text-xs text-slate-400 font-medium">
                            Showing {(page - 1) * PAGE_SIZE + 1}–{Math.min(page * PAGE_SIZE, filtered.length)} of {filtered.length}
                        </p>
                        <div className="flex items-center gap-2">
                            <button
                                onClick={() => setPage(p => Math.max(1, p - 1))}
                                disabled={page === 1}
                                className="p-2 rounded-xl border border-slate-200 text-slate-500 hover:border-[#2076C7] hover:text-[#2076C7] disabled:opacity-30 disabled:cursor-not-allowed transition-all"
                            >
                                <ChevronLeft className="w-4 h-4" />
                            </button>
                            {Array.from({ length: Math.min(totalPages, 5) }, (_, i) => {
                                const pg = i + 1;
                                return (
                                    <button
                                        key={pg}
                                        onClick={() => setPage(pg)}
                                        className={`w-8 h-8 rounded-xl text-xs font-bold transition-all ${page === pg
                                            ? 'bg-gradient-to-r from-[#2076C7] to-[#1CADA3] text-white shadow-md shadow-blue-200'
                                            : 'border border-slate-200 text-slate-500 hover:border-[#2076C7] hover:text-[#2076C7]'}`}
                                    >
                                        {pg}
                                    </button>
                                );
                            })}
                            <button
                                onClick={() => setPage(p => Math.min(totalPages, p + 1))}
                                disabled={page === totalPages}
                                className="p-2 rounded-xl border border-slate-200 text-slate-500 hover:border-[#2076C7] hover:text-[#2076C7] disabled:opacity-30 disabled:cursor-not-allowed transition-all"
                            >
                                <ChevronRight className="w-4 h-4" />
                            </button>
                        </div>
                    </div>
                )}
            </motion.div>

            {/* ── Edit Modal ────────────────────────────────────────────────────── */}
            <AnimatePresence>
                {editPlan && (
                    <motion.div
                        initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
                        className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm p-4 overflow-y-auto"
                    >
                        <motion.div
                            initial={{ scale: 0.9, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} exit={{ scale: 0.9, opacity: 0 }}
                            className="bg-white rounded-3xl shadow-2xl w-full max-w-2xl my-auto"
                        >
                            <div className="px-8 py-6 border-b border-slate-100 flex items-center justify-between">
                                <div className="flex items-center gap-3">
                                    <div className="w-10 h-10 bg-blue-50 rounded-xl flex items-center justify-center">
                                        <Pencil className="w-5 h-5 text-[#2076C7]" />
                                    </div>
                                    <h3 className="text-xl font-bold text-slate-900">Edit FD Plan</h3>
                                </div>
                                <button onClick={() => setEditPlan(null)} className="p-2 hover:bg-slate-50 rounded-xl transition-colors">
                                    <X className="w-5 h-5 text-slate-400" />
                                </button>
                            </div>

                            <form onSubmit={handleUpdate} className="p-8 space-y-6">
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                    {/* Basic Info */}
                                    <div className="space-y-4">
                                        <div>
                                            <label className="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-1.5">Company Name</label>
                                            <input
                                                type="text"
                                                required
                                                value={editPlan.company_name}
                                                onChange={e => setEditPlan({ ...editPlan, company_name: e.target.value })}
                                                className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm font-bold text-slate-900 focus:outline-none focus:border-[#2076C7] focus:bg-white transition-all"
                                            />
                                        </div>
                                        <div>
                                            <label className="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-1.5">Category</label>
                                            <select
                                                value={editPlan.category}
                                                onChange={e => setEditPlan({ ...editPlan, category: e.target.value })}
                                                className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm font-bold text-slate-900 focus:outline-none focus:border-[#2076C7] focus:bg-white transition-all"
                                            >
                                                {CATEGORIES.filter(c => c !== 'All').map(c => <option key={c} value={c}>{c}</option>)}
                                            </select>
                                        </div>
                                        <div>
                                            <label className="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-1.5">Special Offer</label>
                                            <input
                                                type="text"
                                                value={editPlan.special_offer || ''}
                                                onChange={e => setEditPlan({ ...editPlan, special_offer: e.target.value })}
                                                className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm font-bold text-slate-900 focus:outline-none focus:border-[#2076C7] focus:bg-white transition-all"
                                                placeholder="e.g. Extra 0.25% for limited time"
                                            />
                                        </div>
                                    </div>

                                    {/* Rates */}
                                    <div className="grid grid-cols-2 gap-4">
                                        {[
                                            { label: '1Y Rate', key: 'one_year_rate' },
                                            { label: '2Y Rate', key: 'two_year_rate' },
                                            { label: '3Y Rate', key: 'three_year_rate' },
                                            { label: '5Y Rate', key: 'five_year_rate' },
                                            { label: 'Best Rate', key: 'best_rate' },
                                            { label: 'Sr. Citizen', key: 'senior_citizen_rate' },
                                        ].map(f => (
                                            <div key={f.key}>
                                                <label className="block text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-1">{f.label}</label>
                                                <div className="relative">
                                                    <input
                                                        type="number"
                                                        step="0.01"
                                                        value={editPlan[f.key as keyof FDPlan] || ''}
                                                        onChange={e => setEditPlan({ ...editPlan, [f.key]: e.target.value ? parseFloat(e.target.value) : null })}
                                                        className="w-full pl-4 pr-8 py-2 bg-slate-50 border border-slate-200 rounded-xl text-sm font-bold text-slate-900 focus:outline-none focus:border-[#2076C7] focus:bg-white transition-all"
                                                    />
                                                    <span className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 text-xs">%</span>
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                </div>

                                <div className="flex gap-3 pt-4 border-t border-slate-100">
                                    <button
                                        type="button"
                                        onClick={() => setEditPlan(null)}
                                        className="flex-1 py-3 rounded-xl border border-slate-200 text-slate-600 font-semibold text-sm hover:bg-slate-50 transition-colors"
                                    >
                                        Cancel
                                    </button>
                                    <button
                                        type="submit"
                                        disabled={isUpdatingPlan}
                                        className="flex-2 px-12 py-3 rounded-xl bg-gradient-to-r from-[#2076C7] to-[#1CADA3] text-white font-bold text-sm hover:shadow-lg hover:shadow-blue-200 transition-colors disabled:opacity-60 flex items-center justify-center gap-2 shadow-lg shadow-blue-100"
                                    >
                                        {isUpdatingPlan ? <Loader2 className="w-4 h-4 animate-spin" /> : <CheckCircle className="w-4 h-4" />}
                                        {isUpdatingPlan ? 'Updating...' : 'Save Changes'}
                                    </button>
                                </div>
                            </form>
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
}