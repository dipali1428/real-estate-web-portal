"use client";

import React, { useState, useEffect } from 'react';
import { AdminService } from '../../services/adminService';
import {
    Search,
    X,
    ChevronLeft,
    ChevronRight,
    Loader2,
    Calendar,
    User,
    Hash,
    Briefcase,
    ShieldCheck,
    UserCog
} from 'lucide-react';

interface ReferralLead {
    id: number;
    dsa_id: number;
    rm_id: number | null;
    lead_name: string;
    contact_number: string;
    email: string;
    department: string;
    sub_category: string;
    notes: string;
    referral_lead_status: string;
    created_at: string;
    ref_id: string;
    department_head_id: number;
    assigned_rm_id: number;
}

export default function ReferralLeadDashboard() {
    const [leads, setLeads] = useState<ReferralLead[]>([]);
    const [loading, setLoading] = useState(true);
    const [searchTerm, setSearchTerm] = useState("");
    const [selectedLead, setSelectedLead] = useState<ReferralLead | null>(null);
    const [currentPage, setCurrentPage] = useState(1);
    const [itemsPerPage, setItemsPerPage] = useState(10);

    useEffect(() => {
        const fetchLeads = async () => {
            setLoading(true);
            try {
                const response = await AdminService.getAllReferralLeads();
                console.log("API Response:", response);
                if (response?.success) setLeads(response.referral_leads || []);
            } catch (error) {
                console.error("Error:", error);
            } finally {
                setLoading(false);
            }
        };
        fetchLeads();
    }, []);

    const filteredLeads = leads.filter(lead =>
        Object.values(lead).some(val =>
            String(val).toLowerCase().includes(searchTerm.toLowerCase())
        )
    );

    const indexOfLastItem = currentPage * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;
    const currentLeads = filteredLeads.slice(indexOfFirstItem, indexOfLastItem);
    const totalPages = Math.ceil(filteredLeads.length / itemsPerPage);

    return (
        <div className="p-4 md:p-6 bg-gray-50 min-h-screen font-sans">
            <div className="max-w-[1800px] mx-auto">

                <div className="mb-6">
                    <h1 className="text-2xl font-bold text-gray-700">Referral Leads</h1>
                    <p className="text-sm text-gray-700 mt-1">Management of internal referral records and assignments</p>
                </div>

                {/* SEARCH & CONTROLS */}
                <div className="flex flex-col md:flex-row justify-between mb-4 gap-4">
                    <div className="relative w-full md:w-96">
                        <input
                            type="text"
                            placeholder="Search leads..."
                            className="w-full pl-10 pr-4 py-2 border rounded-lg bg-white text-sm text-gray-700 focus:ring-2 focus:ring-[#1CADA3]"
                            onChange={(e) => { setSearchTerm(e.target.value); setCurrentPage(1); }}
                        />
                        <Search className="absolute left-3 top-2.5 w-4 h-4 text-gray-700" />
                    </div>
                    <select
                        onChange={(e) => setItemsPerPage(Number(e.target.value))}
                        className="border rounded-lg px-3 py-2 text-sm bg-white font-bold text-gray-700"
                    >
                        {[10, 25, 50].map(v => <option key={v} value={v}>Show {v}</option>)}
                    </select>
                </div>

                {/* DATA TABLE */}
                <div className="bg-white rounded-lg shadow-sm border border-gray-200 flex flex-col overflow-hidden">
                    <div className="overflow-x-auto overflow-y-auto max-h-[600px] scrollbar-x-thin scrollbar-thumb-gray-300">
                        <table className="min-w-full divide-y divide-gray-200 table-auto">
                            <thead className="bg-gray-50 sticky top-0 z-30">
                                <tr className="text-[10px] font-bold text-gray-700 uppercase tracking-wider">
                                    <th className="px-4 py-3 text-left">Internal IDs</th>
                                    <th className="px-4 py-3 text-left">Ref ID</th>
                                    <th className="px-4 py-3 text-left">Lead Info</th>
                                    <th className="px-4 py-3 text-left">Department</th>
                                    <th className="px-4 py-3 text-left">Staff Assignment</th>
                                    <th className="px-4 py-3 text-left">Status</th>
                                    <th className="px-4 py-3 text-left">Created</th>
                                    <th className="px-4 py-3 text-right">Action</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-gray-200">
                                {loading ? (
                                    <tr><td colSpan={8} className="py-20 text-center"><Loader2 className="animate-spin mx-auto text-[#1CADA3]" /></td></tr>
                                ) : currentLeads.map((lead) => (
                                    <tr key={lead.id} className="hover:bg-gray-50 text-sm">
                                        <td className="px-4 py-3">
                                            <div className="font-bold text-gray-700">ID: {lead.id}</div>
                                            <div className="text-[10px] text-gray-700">DSA: {lead.dsa_id}</div>
                                        </td>
                                        <td className="px-4 py-3 font-mono font-bold text-blue-600">{lead.ref_id}</td>
                                        <td className="px-4 py-3">
                                            <div className="font-bold text-gray-700">{lead.lead_name}</div>
                                            <div className="text-xs text-gray-700">{lead.email}</div>
                                            <div className="text-xs text-gray-700">{lead.contact_number}</div>
                                        </td>
                                        <td className="px-4 py-3">
                                            <div className="font-medium text-gray-700">{lead.department}</div>
                                            <div className="text-[10px] text-gray-700 uppercase">{lead.sub_category}</div>
                                        </td>
                                        <td className="px-4 py-3">
                                            <div className="text-[11px] text-gray-700"><b>RM ID:</b> {lead.rm_id || 'None'}</div>
                                            <div className="text-[11px] text-gray-700"><b>Head ID:</b> {lead.department_head_id}</div>
                                            <div className="text-[11px] text-purple-600"><b>Assigned RM:</b> {lead.assigned_rm_id}</div>
                                        </td>
                                        <td className="px-4 py-3">
                                            <span className="px-2 py-0.5 rounded-full text-[10px] font-black border bg-orange-50 text-orange-600 border-orange-200">
                                                {lead.referral_lead_status
}
                                            </span>
                                        </td>
                                        <td className="px-4 py-3 text-xs text-gray-700">
                                            {new Date(lead.created_at).toLocaleDateString('en-GB')}
                                        </td>
                                        <td className="px-4 py-3 text-right">
                                            <button
                                                onClick={() => setSelectedLead(lead)}
                                                className="bg-gray-700 text-white px-3 py-1 rounded text-xs font-bold hover:bg-gray-900 transition-all"
                                            >
                                                View All
                                            </button>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>

                    {/* PAGINATION */}
                    <div className="p-4 bg-gray-50 border-t flex justify-between items-center">
                        <p className="text-xs text-gray-700 font-bold">Total Records: {filteredLeads.length}</p>
                        <div className="flex gap-2">
                            <button disabled={currentPage === 1} onClick={() => setCurrentPage(prev => prev - 1)} className="p-1 border rounded bg-white disabled:opacity-30"><ChevronLeft size={16} className="text-gray-700" /></button>
                            <span className="text-xs font-bold self-center text-gray-700">Page {currentPage} of {totalPages}</span>
                            <button disabled={currentPage === totalPages} onClick={() => setCurrentPage(prev => prev + 1)} className="p-1 border rounded bg-white disabled:opacity-30"><ChevronRight size={16} className="text-gray-700" /></button>
                        </div>
                    </div>
                </div>
            </div>

            {/* MODAL - ALL FIELDS */}
            {selectedLead && (
                <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
                    <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" onClick={() => setSelectedLead(null)} />
                    <div className="relative bg-white rounded-2xl shadow-2xl w-full max-w-2xl overflow-hidden">
                        <div className="p-6 border-b flex justify-between items-center bg-gray-50">
                            <div>
                                <h2 className="text-xl font-bold text-gray-700">Lead Field Mapping</h2>
                                <p className="text-xs text-gray-700 uppercase tracking-widest font-bold">Ref: {selectedLead.ref_id}</p>
                            </div>
                            <button onClick={() => setSelectedLead(null)} className="p-2 hover:bg-gray-200 rounded-full transition-colors text-gray-700"><X size={20} /></button>
                        </div>

                        <div className="p-8 max-h-[70vh] overflow-y-auto">
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">

                                {/* SYSTEM SECTION */}
                                <div className="space-y-4">
                                    <h3 className="text-[10px] font-black text-[#1CADA3] uppercase tracking-[0.2em] border-b pb-1">IDs & System</h3>
                                    <DataRow label="Lead Primary ID" value={selectedLead.id} icon={<Hash size={12} />} />
                                    <DataRow label="Reference ID" value={selectedLead.ref_id} icon={<ShieldCheck size={12} />} />
                                    <DataRow label="DSA Source ID" value={selectedLead.dsa_id} />
                                    <DataRow label="Relationship Mgr ID" value={selectedLead.rm_id || 'Null'} />
                                    <DataRow label="Dept Head ID" value={selectedLead.department_head_id} />
                                    <DataRow label="Final Assigned RM" value={selectedLead.assigned_rm_id} />
                                </div>

                                {/* CLIENT SECTION */}
                                <div className="space-y-4">
                                    <h3 className="text-[10px] font-black text-[#1CADA3] uppercase tracking-[0.2em] border-b pb-1">Client Information</h3>
                                    <DataRow label="Full Name" value={selectedLead.lead_name} icon={<User size={12} />} />
                                    <DataRow label="Contact Number" value={selectedLead.contact_number} />
                                    <DataRow label="Email Address" value={selectedLead.email} />
                                    <DataRow label="Date of Creation" value={selectedLead.created_at} icon={<Calendar size={12} />} />
                                </div>

                                {/* CONTENT SECTION */}
                                <div className="space-y-4 md:col-span-2">
                                    <h3 className="text-[10px] font-black text-[#1CADA3] uppercase tracking-[0.2em] border-b pb-1">Additional Data</h3>
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                        <DataRow label="Lead Department" value={selectedLead.department} icon={<Briefcase size={12} />} />
                                        <DataRow label="Sub Category" value={selectedLead.sub_category} />
                                        <DataRow label="Current Status" value={selectedLead.referral_lead_status} icon={<UserCog size={12} />} />
                                    </div>
                                    <div className="mt-4 p-4 bg-gray-50 rounded-xl border border-gray-200">
                                        <p className="text-[10px] font-black text-gray-700 uppercase mb-1">Lead Notes</p>
                                        <p className="text-sm text-gray-700 italic">"{selectedLead.notes}"</p>
                                    </div>
                                </div>

                            </div>
                        </div>

                        <div className="p-4 bg-gray-50 border-t flex justify-end">
                            <button onClick={() => setSelectedLead(null)} className="px-8 py-2.5 bg-white border border-gray-300 rounded-xl text-sm font-bold text-gray-700 hover:bg-gray-100 transition-all">
                                Close
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}

// Sub-component
function DataRow({ label, value, icon }: { label: string, value: any, icon?: React.ReactNode }) {
    return (
        <div className="flex flex-col">
            <span className="text-[9px] font-bold text-gray-700 uppercase flex items-center gap-1">
                {icon} {label}
            </span>
            <span className="text-sm font-bold text-gray-700">{value ?? 'N/A'}</span>
        </div>
    );
}