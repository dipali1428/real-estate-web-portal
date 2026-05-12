"use client";

import React, { useState, useEffect, useCallback, useMemo } from 'react';
import {
    Search, X, FileText, ExternalLink, ChevronLeft, ChevronRight, Loader2, CheckCircle2, UserCheck, FileSignature,
} from 'lucide-react';
import toast from 'react-hot-toast';
import { AccountService } from '@/app/services/accountsService';

// --- Types ---
interface Lead {
    assigned_rm_mobile: string;
    assigned_rm_name: string;
    assigned_rm_id: string;
    id: number;
    detail_lead_id: string;
    lead_name: string;
    contact_number: string;
    email: string;
    department: string;
    product_type: string;
    sub_category: string;
    lead_status: string;
    status: string;
    created_at: string;
    dsa_id: number;
    dsa_name: string;
    dsa_adv_id: string;
    dsa_mobile: string;

    rm_id: number;
    rm_name: string;
    rm_acceptance_status: string;
    rm_action_deadline: string;
    referral_rm_name?: string;
    is_self_login: boolean;
    bank_name: string;
    bank_account_number: string;
    ifsc_code: string;
    bank_verified: boolean;
    kyc_completed: boolean;
    agreement_id: number | null;
    agreement_status: string | null;
    disbursement_amount: number | null;
    gross_payout_amount: number | null;
    gst_amount: number | null;
    tds_amount: number | null;
    net_payout_amount: number | null;
    payout_date: string | null;
    payout_id: string | null;
    payment_mode: string | null;
    transaction_reference_no: string | null;
    invoice_number: string | null;
    invoice_date: string | null;
    policy_number: string | null;
    uploaded_documents?: {
        document_key: string;
        document_label?: string;
        file_url: string;
        uploaded_at: string;
    }[];
    form_data?: Record<string, any>;
}

export default function LeadDashboard() {
    const [leads, setLeads] = useState<Lead[]>([]);
    const [loading, setLoading] = useState(true);
    const [searchTerm, setSearchTerm] = useState("");

    // Modals / Overlays
    const [selectedLead, setSelectedLead] = useState<Lead | null>(null);
    const [previewUrl, setPreviewUrl] = useState<string | null>(null);
    const [previewType, setPreviewType] = useState<'image' | 'pdf' | 'other' | null>(null);

    // Pagination
    const [currentPage, setCurrentPage] = useState(1);
    const [itemsPerPage, setItemsPerPage] = useState(10);

    // --- API Fetching ---
    const fetchLeads = useCallback(async () => {
        setLoading(true);
        try {
            const response = await AccountService.getCompletedDetailLeads();
            const data = Array.isArray(response) ? response : response.data || [];
            setLeads(data);
        } catch (error: any) {
            toast.error(error?.response?.data?.message || "Failed to fetch leads");
        } finally {
            setLoading(false);
        }
    }, []);

    useEffect(() => {
        fetchLeads();
    }, [fetchLeads]);

    // --- Search & Filter Logic ---
    const filteredLeads = useMemo(() => {
        // Only include leads where status is COMPLETED
        let result = leads.filter(lead => lead.lead_status?.toUpperCase() === 'COMPLETED');

        const term = searchTerm.toLowerCase().trim();
        if (term) {
            result = result.filter(lead =>
                lead.lead_name?.toLowerCase().includes(term) ||
                lead.detail_lead_id?.toLowerCase().includes(term) ||
                lead.dsa_adv_id?.toLowerCase().includes(term) ||
                lead.contact_number?.includes(term) ||
                lead.id.toString().includes(term)
            );
        }
        return result;
    }, [leads, searchTerm]);

    useEffect(() => {
        setCurrentPage(1);
    }, [searchTerm]);

    // --- Pagination Calculation ---
    const totalItems = filteredLeads.length;
    const totalPages = Math.ceil(totalItems / itemsPerPage);
    const indexOfLastItem = currentPage * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;
    const currentLeads = filteredLeads.slice(indexOfFirstItem, indexOfLastItem);

    if (loading) {
        return (
            <div className="flex flex-col items-center justify-center min-h-screen bg-gray-50">
                <Loader2 className="w-10 h-10 text-blue-600 animate-spin mb-2" />
                <p className="text-gray-500 font-medium">Fetching Lead Records...</p>
            </div>
        );
    }

    return (
        <div className="p-4 md:p-6 bg-gray-50 min-h-screen font-sans">
            <div className="max-w-[1800px] mx-auto">

                {/* HEADER */}
                <div className="mb-6">
                    <h1 className="text-xl md:text-2xl font-bold text-gray-900">Completed Detail Leads</h1>
                    <p className="text-sm text-gray-600 mt-1">Found {totalItems} completed leads</p>
                </div>

                {/* CONTROLS */}
                <div className="flex flex-col md:flex-row justify-between items-center mb-6 gap-4">
                    <div className="relative w-full md:w-[450px]">
                        <input
                            type="text"
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                            placeholder="Search by Lead Name, ID, ADV ID, or Mobile..."
                            className="w-full pl-10 pr-10 py-2.5 border rounded-xl shadow-sm focus:outline-none bg-white text-gray-900 focus:ring-2 focus:ring-blue-500 text-sm transition-all"
                        />
                        <Search className="absolute left-3 top-3 w-5 h-5 text-gray-400" />
                        {searchTerm && (
                            <button onClick={() => setSearchTerm("")} className="absolute right-3 top-3 p-0.5 hover:bg-gray-100 rounded-full transition-colors">
                                <X size={16} className="text-gray-500" />
                            </button>
                        )}
                    </div>

                    <div className="flex items-center gap-3">
                        <div className="flex items-center gap-2 bg-white border px-3 py-2 rounded-lg shadow-sm">
                            <span className="text-xs text-gray-500 font-bold">Rows:</span>
                            <select
                                value={itemsPerPage}
                                onChange={(e) => { setItemsPerPage(Number(e.target.value)); setCurrentPage(1); }}
                                className="text-xs bg-transparent focus:outline-none text-gray-900 font-bold cursor-pointer"
                            >
                                {[10, 25, 50, 100].map(val => <option key={val} value={val}>{val}</option>)}
                            </select>
                        </div>
                        <button onClick={fetchLeads} className="p-2.5 bg-white border rounded-lg hover:bg-gray-50 shadow-sm transition-colors">
                            <Loader2 size={18} className={`${loading ? 'animate-spin' : ''} text-gray-600`} />
                        </button>
                    </div>
                </div>

                {/* TABLE */}
                <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
                    <div className="overflow-x-auto">
                        <table className="min-w-full divide-y divide-gray-200">
                            <thead className="bg-gray-50">
                                <tr>
                                    <th className="px-6 py-4 text-left text-xs font-bold text-gray-600 uppercase tracking-wider">ID</th>
                                    <th className="px-6 py-4 text-left text-xs font-bold text-gray-600 uppercase tracking-wider">Lead Details</th>
                                    <th className="px-6 py-4 text-left text-xs font-bold text-gray-600 uppercase tracking-wider">Status</th>
                                    <th className="px-6 py-4 text-left text-xs font-bold text-gray-600 uppercase tracking-wider">DSA & ADV ID</th>
                                    <th className="px-6 py-4 text-left text-xs font-bold text-gray-600 uppercase tracking-wider">Assigned RM</th>
                                    <th className="px-6 py-4 text-right text-xs font-bold text-gray-600 uppercase tracking-wider">Actions</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-gray-200">
                                {currentLeads.length > 0 ? (
                                    currentLeads.map((lead) => (
                                        <tr key={lead.id} className="hover:bg-blue-50/30 transition-colors">
                                            <td className="px-6 py-4 whitespace-nowrap text-sm font-bold text-gray-500">#{lead.id}</td>
                                            <td className="px-6 py-4">
                                                <div className="text-sm font-bold text-gray-900">{lead.lead_name}</div>
                                                <div className="text-[11px] text-gray-500 font-medium">{lead.detail_lead_id}</div>
                                            </td>
                                            <td className="px-6 py-4">
                                                <span className="px-2.5 py-1 rounded-md text-[10px] font-bold uppercase border bg-green-50 text-green-700 border-green-200 shadow-sm">
                                                    COMPLETED
                                                </span>
                                            </td>
                                            <td className="px-6 py-4">
                                                <div className="text-sm font-semibold text-gray-700">
                                                    {lead.dsa_name}
                                                </div>

                                                <div className="text-[10px] text-gray-600 font-bold">
                                                    {lead.dsa_adv_id}
                                                </div>
                                            </td>
                                            <td className="px-6 py-4">
                                                <div className="text-sm font-medium text-gray-700">{lead.assigned_rm_name}</div>
                                                <div className="text-[10px] text-gray-400">UID: {lead.assigned_rm_id}</div>
                                            </td>
                                            <td className="px-6 py-4 text-right">
                                                <button
                                                    onClick={() => setSelectedLead(lead)}
                                                    className="px-4 py-1.5 bg-blue-600 text-white rounded-lg text-xs font-bold hover:bg-blue-700 transition-all shadow-sm"
                                                >
                                                    View File
                                                </button>
                                            </td>
                                        </tr>
                                    ))
                                ) : (
                                    <tr>
                                        <td colSpan={6} className="px-6 py-20 text-center">
                                            <div className="flex flex-col items-center justify-center">
                                                <Search size={40} className="text-gray-200 mb-2" />
                                                <p className="text-gray-500 font-medium text-lg">No completed leads found</p>
                                            </div>
                                        </td>
                                    </tr>
                                )}
                            </tbody>
                        </table>
                    </div>

                    {/* PAGINATION */}
                    <div className="px-6 py-4 border-t bg-gray-50 flex items-center justify-between">
                        <p className="text-xs text-gray-500 font-medium">
                            Showing <span className="text-gray-900 font-bold">{totalItems > 0 ? indexOfFirstItem + 1 : 0}</span> to <span className="text-gray-900 font-bold">{Math.min(indexOfLastItem, totalItems)}</span> of <span className="text-gray-900 font-bold">{totalItems}</span> results
                        </p>
                        <div className="flex items-center gap-2">
                            <button
                                disabled={currentPage === 1}
                                onClick={() => setCurrentPage(p => p - 1)}
                                className="p-1.5 border rounded-lg bg-white text-gray-600 disabled:opacity-40 hover:bg-gray-50 transition-colors"
                            >
                                <ChevronLeft size={18} />
                            </button>
                            <div className="text-xs font-bold text-gray-700 mx-2">
                                Page {currentPage} of {totalPages || 1}
                            </div>
                            <button
                                disabled={currentPage === totalPages || totalPages === 0}
                                onClick={() => setCurrentPage(p => p + 1)}
                                className="p-1.5 border rounded-lg bg-white text-gray-600 disabled:opacity-40 hover:bg-gray-50 transition-colors"
                            >
                                <ChevronRight size={18} />
                            </button>
                        </div>
                    </div>
                </div>
            </div>

            {selectedLead && (
                <div className="fixed inset-0 z-[60] flex items-center justify-center p-4">
                    <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" onClick={() => setSelectedLead(null)} />
                    <div className="relative bg-gray-50 rounded-3xl max-w-4xl w-full max-h-[90vh] overflow-hidden shadow-2xl border border-white/20">

                        {/* Modal Header */}
                        <div className="flex justify-between items-center px-8 py-5 bg-white border-b sticky top-0 z-10">
                            <div>
                                <div className="flex items-center gap-3 mb-1">
                                    <h3 className="text-xl font-black text-gray-900 tracking-tight">{selectedLead.lead_name}</h3>
                                    <span className="px-2 py-0.5 bg-blue-50 text-blue-600 text-[10px] font-bold rounded-md border border-blue-100">
                                        {selectedLead.detail_lead_id}
                                    </span>
                                </div>
                                <p className="text-xs text-gray-400 font-medium">Application filed on {new Date(selectedLead.created_at).toLocaleDateString('en-GB', { day: 'numeric', month: 'short', year: 'numeric' })}</p>
                            </div>
                            <button onClick={() => setSelectedLead(null)} className="p-2 hover:bg-gray-100 rounded-full transition-colors text-gray-400">
                                <X size={20} />
                            </button>
                        </div>

                        <div className="p-8 overflow-y-auto max-h-[calc(90vh-100px)] space-y-8">

                            {/* 1. TOP STATUS BADGES */}
                            <div className="flex flex-wrap gap-2 pb-2">
                                <StatusBadge active={selectedLead.bank_verified} icon={<CheckCircle2 size={12} />} label="Bank Verified" color="green" />
                                <StatusBadge active={selectedLead.kyc_completed} icon={<UserCheck size={12} />} label="KYC Completed" color="blue" />
                                <StatusBadge active={selectedLead.agreement_status === 'created'} icon={<FileSignature size={12} />} label={`Agreement: ${selectedLead.agreement_status || 'Pending'}`} color="purple" />
                            </div>

                            {/* 2. LEAD SUMMARY */}
                            <section>
                                <SectionHeading color="bg-green-500" title="Lead Summary" />
                                <div className="bg-white border border-gray-200 rounded-2xl p-6 shadow-sm">
                                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
                                        <InfoField label="Contact Number" value={selectedLead.contact_number} />
                                        <InfoField label="Email Address" value={selectedLead.email} />
                                        <InfoField label="Department" value={selectedLead.department} isTag />
                                        <InfoField label="Sub-Category" value={selectedLead.sub_category} />
                                        <InfoField label="Product Type" value={selectedLead.product_type} />
                                        <InfoField label="Lead Status" value="COMPLETED" />
                                    </div>
                                </div>
                            </section>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                                {/* 3. RM DETAILS */}
                                <section>
                                    <SectionHeading color="bg-purple-500" title="Assigned Manager" />
                                    <div className="bg-white border border-gray-200 rounded-2xl p-5 flex items-center gap-4 shadow-sm">
                                        <div className="w-12 h-12 bg-purple-100 text-purple-600 rounded-xl flex items-center justify-center font-black text-lg">
                                            {selectedLead.assigned_rm_name?.charAt(0)}
                                        </div>
                                        <div>
                                            <p className="text-sm font-bold text-gray-900">{selectedLead.assigned_rm_name}</p>
                                            <p className="text-[11px] text-gray-400 font-medium mb-1">ID: {selectedLead.assigned_rm_id}</p>
                                        </div>
                                    </div>
                                </section>

                                {/* 4. BANK DETAILS */}
                                <section>
                                    <SectionHeading color="bg-blue-500" title="Bank Information" />
                                    <div className="bg-white border border-gray-200 rounded-2xl p-5 shadow-sm space-y-4">
                                        <div className="flex justify-between items-start">
                                            <div>
                                                <p className="text-[10px] text-gray-400 font-bold uppercase tracking-wider mb-1">Bank Name</p>
                                                <p className="text-sm font-bold text-gray-800">{selectedLead.bank_name || "N/A"}</p>
                                            </div>
                                            <div className="text-right">
                                                <p className="text-[10px] text-gray-400 font-bold uppercase tracking-wider mb-1">IFSC</p>
                                                <p className="text-sm font-mono font-bold text-gray-800">{selectedLead.ifsc_code || "N/A"}</p>
                                            </div>
                                        </div>
                                        <div className="pt-3 border-t border-gray-50">
                                            <p className="text-[10px] text-gray-400 font-bold uppercase tracking-wider mb-1">Account Number</p>
                                            <p className="text-base font-mono font-bold text-gray-900 tracking-wider">
                                                {selectedLead.bank_account_number
                                                    ? `XXXXXXXX${selectedLead.bank_account_number.toString().slice(-4)}`
                                                    : "XXXXXXXXXXXX"}
                                            </p>
                                        </div>
                                    </div>
                                </section>
                            </div>
                        </div>
                    </div>
                </div>
            )}

            {/* --- PREVIEW OVERLAY --- */}
            {previewUrl && (
                <div className="fixed inset-0 z-[110] bg-black/95 flex flex-col items-center justify-center p-4">
                    <button onClick={() => setPreviewUrl(null)} className="absolute top-6 right-6 text-white bg-white/10 p-2 rounded-full hover:bg-white/20 transition-all"><X size={28} /></button>
                    <div className="w-full max-w-5xl h-[80vh] flex items-center justify-center">
                        {previewType === 'image' ? (
                            <img src={previewUrl} className="max-h-full max-w-full object-contain rounded-lg shadow-2xl" alt="Preview" />
                        ) : (
                            <div className="text-white text-center">
                                <FileText size={80} className="mx-auto mb-6 text-blue-500 opacity-80" />
                                <h3 className="text-2xl font-bold mb-2">View Document</h3>
                                <p className="text-gray-400 mb-8">This file format cannot be previewed directly.</p>
                                <a href={previewUrl} target="_blank" rel="noreferrer" className="inline-flex items-center gap-3 bg-blue-600 px-8 py-3 rounded-xl font-bold hover:bg-blue-700 transition-all">
                                    <ExternalLink size={20} /> Open in Browser
                                </a>
                            </div>
                        )}
                    </div>
                </div>
            )}
        </div>
    );
}

// --- Internal Helper Components ---

function SectionHeading({ color, title }: { color: string; title: string }) {
    return (
        <div className="flex items-center gap-3 mb-4">
            <div className={`w-1 h-5 ${color} rounded-full`}></div>
            <h4 className="text-sm font-bold text-gray-900 uppercase tracking-wider">{title}</h4>
        </div>
    );
}

function StatusBadge({ active, icon, label, color }: { active: boolean | null; icon: React.ReactNode; label: string; color: 'green' | 'blue' | 'purple' }) {
    const colorMap = {
        green: active ? "bg-green-50 text-green-700 border-green-100" : "bg-gray-50 text-gray-400 border-gray-100 opacity-60",
        blue: active ? "bg-blue-50 text-blue-700 border-blue-100" : "bg-gray-50 text-gray-400 border-gray-100 opacity-60",
        purple: active ? "bg-purple-50 text-purple-700 border-purple-100" : "bg-gray-50 text-gray-400 border-gray-100 opacity-60"
    };

    return (
        <div className={`flex items-center gap-1.5 px-3 py-1 rounded-full border text-[11px] font-bold transition-all ${colorMap[color]}`}>
            {icon}
            {label}
        </div>
    );
}

function InfoField({ label, value, isTag }: { label: string; value: any; isTag?: boolean }) {
    return (
        <div>
            <p className="text-[10px] text-gray-400 font-bold uppercase tracking-wider mb-1.5">{label}</p>
            {isTag ? (
                <span className="px-2.5 py-1 bg-gray-100 text-gray-700 text-[11px] font-bold rounded-lg border">
                    {value || "N/A"}
                </span>
            ) : (
                <p className="text-sm font-bold text-gray-800">{value || "N/A"}</p>
            )}
        </div>
    );
}