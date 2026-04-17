"use client";

import React, { useState, useEffect } from 'react';
import { RmService } from '../../services/rmService';
import {
  Search,
  X,
  FileText,
  ExternalLink,
  FileUp,
  ChevronLeft,
  ChevronRight,
  Loader2,
  UserCheck,
  Clock,
  Files,
  CheckCircle2,
  Check,
  XCircle
} from 'lucide-react';
import toast from 'react-hot-toast';
import Image from 'next/image';

// --- Status Styles from Second Code ---
const statusStyles: Record<string, string> = {
  new: "bg-blue-50 text-blue-700 border-blue-200",
  completed: "bg-blue-50 text-blue-700 border-blue-200",
  submitted: "bg-green-50 text-green-700 border-green-200",
  in_progress: "bg-yellow-50 text-yellow-700 border-yellow-200",
  rejected: "bg-red-50 text-red-700 border-red-200",
  follow_up: "bg-orange-50 text-orange-700 border-orange-200",
  sanctioned: "bg-purple-50 text-purple-700 border-purple-200",
};
const ALLOWED_STATUSES = ["NEW", "SUBMITTED", "IN_PROGRESS", "FOLLOW_UP", "SANCTIONED", "COMPLETED", "REJECTED"];

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
  uploaded_documents?: {
    document_key: string;
    document_label?: string; // Made optional
    file_url: string;
    uploaded_at: string;
  }[];
  pending_documents?: {
    id: number;
    document_key: string;
    document_label?: string;
    is_mandatory: boolean;
    uploaded: boolean;
  }[];
  form_data?: {
    dob?: string;
    employmentType?: string;
    hasOtherLoan?: string | boolean;
    loanAmount?: string;
    loanType?: string;
    location?: string;
    otherIncome?: string | boolean;
    otherIncomeAmount?: string;
    otherLoanAmount?: string;
    bankName?: string;
    fileId?: string;
    refId?: string;
    rmName?: string;
  };
}


export default function LeadDashboard() {
  const [leads, setLeads] = useState<Lead[]>([]);
  const [loading, setLoading] = useState(true);
  const [leadType, setLeadType] = useState<'my_lead' | 'incoming' | 'outgoing'>('incoming');
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedLead, setSelectedLead] = useState<Lead | null>(null);
  const [docModalLead, setDocModalLead] = useState<Lead | null>(null);
  const [processingId, setProcessingId] = useState<number | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const [previewType, setPreviewType] = useState<'image' | 'pdf' | 'other' | null>(null);
  const [rejectModalId, setRejectModalId] = useState<number | null>(null);

  const [openStatusDropdown, setOpenStatusDropdown] = useState<number | null>(null);
  // --- Pagination States ---
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(5);

  const fetchLeads = async () => {
    setLoading(true);
    try {
      let response;
      if (leadType === 'my_lead') {
        response = await RmService.getMyDetailLeads();
      } else if (leadType === 'incoming') {
        response = await RmService.getIncomingDetailLeads();
      } else if (leadType === 'outgoing') {
        response = await RmService.getOutgoingDetailLeads();
      }


      if (response && response.success) {
        setLeads(response.leads || []);
      } else {
        setLeads([]);
      }
    } catch (error) {
      // console.error("Error fetching leads:", error);
      toast.error("Failed to fetch leads. Please try again later.");
      setLeads([]);
    } finally {
      setLoading(false);
    }
  };
  const handleStatusUpdate = async (leadId: number, status: string) => {
    try {
      setProcessingId(leadId);

      const response = await RmService.updateDetailLeadStatus(leadId, status);
      if (response.success) {
        fetchLeads();
        toast.success("Status updated successfully.");
        setOpenStatusDropdown(null);
      } else {
        // alert(response.message || "Failed to update status");
        toast.error(response.message || "Failed to update status. Please try again.");
      }
    } catch (error: any) {
      // console.error("Error updating status:", error);
      toast.error("Failed to update status. Please try again later.");
    } finally {
      setProcessingId(null);
    }
  };


  useEffect(() => {
    fetchLeads();
    setCurrentPage(1);
  }, [leadType]);

  useEffect(() => {
    setCurrentPage(1);
  }, [searchTerm]);

  const handleAction = async (id: number, action: 'accept' | 'reject') => {
    setProcessingId(id);
    try {
      const response = action === 'accept'
        ? await RmService.acceptDetailLead(id)
        : await RmService.rejectDetailLead(id);
  
      if (response.success) {
        toast.success(`Lead ${action}ed successfully`);
        
        // 1. Refresh the list
        await fetchLeads(); 
        
        // 2. IMPORTANT: Close the modal here
        setRejectModalId(null); 
      } else {
        toast.error(response.message || `Failed to ${action} lead`);
      }
    } catch (error: any) {
      toast.error(error.response?.data?.message || `Server error during ${action}`);
    } finally {
      setProcessingId(null);
    }
  };

  const handlePreview = (url: string) => {
    const extension = url.split('.').pop()?.toLowerCase();
    if (['jpg', 'jpeg', 'png', 'webp'].includes(extension || '')) {
      setPreviewType('image');
    } else if (extension === 'pdf') {
      setPreviewType('pdf');
    } else {
      setPreviewType('other');
    }
    setPreviewUrl(url);
  };

  const filteredLeads = leads.filter(lead =>
    lead.lead_name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
    lead.detail_lead_id?.toLowerCase().includes(searchTerm.toLowerCase()) ||
    lead.contact_number?.includes(searchTerm)
  );

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentLeads = filteredLeads.slice(indexOfFirstItem, indexOfLastItem);
  const totalPages = Math.ceil(filteredLeads.length / itemsPerPage);

  const paginate = (pageNumber: number) => setCurrentPage(pageNumber);

  return (
    <div className="p-4 md:p-6 bg-gray-50 min-h-screen font-sans">
      <div className="max-w-[1800px] mx-auto">

        {/* HEADER SECTION */}
        <div className="mb-6 flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <h1 className="text-xl md:text-2xl font-bold text-gray-900">Lead Management</h1>
            <p className="text-sm text-gray-600 mt-1">
              Viewing {leadType === 'my_lead' ? 'My Leads' : leadType === 'incoming' ? 'Incoming Leads' : 'Outgoing Leads'}
            </p>
          </div>
        </div>

        {/* TABLE CONTROL BAR */}
        <div className="flex flex-col md:flex-row justify-between items-center mb-4 gap-4">
          <div className="relative w-full md:w-96">
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="Search..."
              className="w-full pl-10 pr-4 py-2 border rounded-lg shadow-sm focus:outline-none bg-white text-gray-900 focus:ring-2 focus:ring-blue-500 text-sm"
            />
            <Search className="absolute left-3 top-2.5 w-5 h-5 text-gray-400" />
          </div>

          <div className="flex items-center gap-3 w-full md:w-auto">
            <div className="flex items-center gap-2 bg-white border px-3 py-2 rounded-lg shadow-sm">
              <span className="text-xs text-gray-500 font-bold whitespace-nowrap">Show:</span>
              <select
                value={itemsPerPage}
                onChange={(e) => { setItemsPerPage(Number(e.target.value)); setCurrentPage(1); }}
                className="text-xs bg-transparent focus:outline-none text-gray-900 font-bold cursor-pointer"
              >
                {[5, 10, 25, 50, 100].map(val => (
                  <option key={val} value={val}>{val}</option>
                ))}
              </select>
            </div>
            <button className="flex-1 md:flex-none inline-flex items-center justify-center bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 text-sm font-medium transition-colors shadow-sm">
              <FileUp className="w-4 h-4 mr-2" /> Export Excel
            </button>
          </div>
        </div>

        {/* TABS SECTION */}
        <div className="flex bg-gray-200 p-1 rounded-xl w-fit overflow-x-auto mb-6">
          <button onClick={() => setLeadType('my_lead')} className={`px-4 py-2 rounded-lg text-sm font-bold transition-all whitespace-nowrap ${leadType === 'my_lead' ? 'bg-white shadow-sm text-blue-600' : 'text-gray-500 hover:text-gray-700'}`}>My Lead</button>
          <button onClick={() => setLeadType('incoming')} className={`px-4 py-2 rounded-lg text-sm font-bold transition-all whitespace-nowrap ${leadType === 'incoming' ? 'bg-white shadow-sm text-blue-600' : 'text-gray-500 hover:text-gray-700'}`}>Incoming</button>
          <button onClick={() => setLeadType('outgoing')} className={`px-4 py-2 rounded-lg text-sm font-bold transition-all whitespace-nowrap ${leadType === 'outgoing' ? 'bg-white shadow-sm text-blue-600' : 'text-gray-500 hover:text-gray-700'}`}>Outgoing</button>
        </div>

        {/* MAIN TABLE CONTAINER */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 flex flex-col overflow-hidden">
          <div className="overflow-x-auto overflow-y-auto max-h-[600px] scrollbar-thin scrollbar-thumb-gray-300">
            {loading ? (
              <div className="flex flex-col items-center justify-center py-20">
                <Loader2 className="w-10 h-10 text-blue-500 animate-spin mb-4" />
                <p className="text-gray-500 font-medium">Loading Data...</p>
              </div>
            ) : (
              <table className="min-w-full divide-y divide-gray-200 table-auto">
                <thead className="bg-gray-50 sticky top-0 z-30">
                  <tr>
                    <th className="px-4 py-4 text-left text-xs font-bold text-gray-600 uppercase tracking-wider">ID</th>
                    <th className="px-4 py-4 text-left text-xs font-bold text-gray-600 uppercase tracking-wider">Lead ID</th>
                    <th className="px-4 py-4 text-left text-xs font-bold text-gray-600 uppercase tracking-wider">Status</th>
                    <th className="px-4 py-4 text-left text-xs font-bold text-gray-600 uppercase tracking-wider">DSA Details</th>
                    <th className="px-4 py-4 text-left text-xs font-bold text-gray-600 uppercase tracking-wider">Client Details</th>
                    {leadType !== 'outgoing' && (
                      <th className="px-4 py-4 text-left text-xs font-bold text-gray-600 uppercase tracking-wider">Referred RM</th>
                    )}
                    {leadType !== 'my_lead' && (
                      <th className="px-4 py-4 text-left text-xs font-bold text-gray-600 uppercase tracking-wider">Assigned RM</th>
                    )}
                    <th className="px-4 py-4 text-left text-xs font-bold text-gray-600 uppercase tracking-wider">Self Login</th>
                    {leadType !== 'my_lead' && (
                      <th className="px-4 py-4 text-left text-xs font-bold text-gray-600 uppercase tracking-wider bg-gray-50">
                        Acceptance
                      </th>
                    )}
                    <th className="px-4 py-4 text-left text-xs font-bold text-gray-600 uppercase tracking-wider">Created At</th>
                    <th className="px-4 py-4 text-left text-xs font-bold text-gray-600 uppercase tracking-wider">Documents</th>
                    <th className="px-4 py-4 text-right text-xs font-bold text-gray-600 uppercase tracking-wider">Actions</th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {currentLeads.length > 0 ? (
                    currentLeads.map((lead) => {
                      const isPending = lead.rm_acceptance_status === 'PENDING';
                      // NEW: Only blur if we are in the 'incoming' tab and status is PENDING
                      const shouldBlur = leadType === 'incoming' && isPending;

                      return (
                        <tr key={lead.id} className="hover:bg-gray-50 transition-colors relative group">
                          {/* 1. ID */}
                          <td className="px-4 py-4 whitespace-nowrap text-sm text-gray-600 font-bold bg-white z-20">
                            {lead.id}
                            {/* Show Deadline badge only on Incoming Pending leads */}
                            {shouldBlur && (
                              <div className="absolute inset-0 z-10 flex items-center justify-center pointer-events-none w-[1200px]">
                                <span className="text-red-600 font-bold text-[10px] sm:text-xs bg-white/80 px-3 py-1 rounded-full border border-red-200 backdrop-blur-sm shadow-sm whitespace-nowrap">
                                  Deadline: {new Date(lead.rm_action_deadline).toLocaleDateString('en-GB')} / {new Date(lead.rm_action_deadline).toLocaleTimeString('en-GB', {
                                    hour: '2-digit', minute: '2-digit', hour12: true
                                  })}
                                </span>
                              </div>
                            )}
                          </td>

                          {/* 2. Lead ID */}
                          <td className="px-4 py-4 whitespace-nowrap text-sm font-bold text-gray-700 bg-white z-20">
                            {lead.detail_lead_id}
                          </td>

                          {/* 3. Status - MODIFIED TO MATCH SECOND CODE STYLE */}
                          <td
                            className={`px-4 py-4 whitespace-nowrap transition-all duration-300 relative 
                              ${shouldBlur ? 'blur-[8px] opacity-10 select-none pointer-events-none' : ''}`}
                          >
                            <select
                              value={lead.lead_status?.toUpperCase() || ""}
                              onChange={(e) => handleStatusUpdate(lead.id, e.target.value)}
                              disabled={processingId === lead.id}
                              className={`px-2 py-1 rounded-md text-[10px] font-bold uppercase border cursor-pointer focus:outline-none transition-colors ${statusStyles[lead.lead_status?.toLowerCase() || ""] || "bg-gray-50 text-gray-700 border-gray-100"
                                }`}
                            >
                              <option value="" disabled>Select</option>
                              {ALLOWED_STATUSES.map(s => <option key={s} value={s}>{s}</option>)}
                            </select>
                          </td>


                          {/* 4. DSA Info */}
                          <td className={`px-4 py-4 whitespace-nowrap text-sm text-gray-700 transition-all duration-300 ${shouldBlur ? 'blur-[8px] opacity-10 select-none pointer-events-none' : ''}`}>
                            <div className="font-bold">{lead.dsa_name}</div>
                            <div className="font-bold">{lead.dsa_mobile}</div>
                            <div className="text-[10px] text-gray-500">{lead.dsa_adv_id}</div>
                          </td>

                          {/* 5. Client Info */}
                          <td className={`px-4 py-4 whitespace-nowrap text-sm transition-all duration-300 ${shouldBlur ? 'blur-[8px] opacity-10 select-none pointer-events-none' : ''}`}>
                            <div className="font-bold text-gray-800">{lead.lead_name}</div>
                            <div className="text-[11px] text-gray-600">{lead.email}</div>
                            <div className="text-[10px] text-gray-500">
                              {/* Logic for N/A or NA check */}
                              {lead.contact_number === 'N/A' || lead.contact_number === 'NA'
                                ? 'Mobile: not available'
                                : lead.contact_number}
                            </div>
                          </td>

                          {/* Updated: Referred RM Cell - Hidden if leadType is 'outgoing' */}
                          {leadType !== 'outgoing' && (
                            <td className={`px-4 py-4 whitespace-nowrap text-sm text-gray-600 transition-all duration-300 ${shouldBlur ? 'blur-[8px] opacity-10 select-none pointer-events-none' : ''}`}>
                              {lead.referral_rm_name || 'Unassigned'}
                            </td>
                          )}

                          {/* 7. Assigned RM */}
                          {leadType !== 'my_lead' && (
                            <td className={`px-4 py-4 whitespace-nowrap text-sm text-purple-600 font-medium transition-all duration-300 ${shouldBlur ? 'blur-[8px] opacity-10 select-none pointer-events-none' : ''}`}>
                              <div className="font-bold text-gray-800">{lead.assigned_rm_name}</div>
                              <div className="text-[10px] text-gray-500">{lead.assigned_rm_mobile}</div>
                              <div className="text-[11px] text-gray-600">ID: {lead.assigned_rm_id}</div>
                            </td>
                          )}

                          {/* 8. Self Login */}
                          <td className={`px-4 py-4 whitespace-nowrap text-sm text-gray-600 transition-all duration-300 ${shouldBlur ? 'blur-[8px] opacity-10 select-none pointer-events-none' : ''}`}>
                            {lead.is_self_login ? <span className="text-green-600 font-bold">Yes</span> : 'No'}
                          </td>

                          {/* 9. Acceptance - MODIFIED: Buttons ONLY for Incoming Pending */}
                          {leadType !== 'my_lead' && (
                            <td className="px-4 py-4 whitespace-nowrap text-sm font-bold z-20 bg-white">
                              {leadType === 'incoming' && isPending ? (
                                <div className="flex items-center gap-2">
                                  {processingId === lead.id ? (
                                    <Loader2 className="w-4 h-4 animate-spin text-blue-500" />
                                  ) : (
                                    <>
                                      <button onClick={() => handleAction(lead.id, 'accept')} className="p-1.5 bg-green-50 text-green-600 rounded-md hover:bg-green-100 transition-colors border border-green-100" title="Accept"><Check size={16} /></button>
                                      <button onClick={() => setRejectModalId(lead.id)} className="p-1.5 bg-red-50 text-red-600 rounded-md hover:bg-red-100 transition-colors border border-red-100" title="Reject">
  <XCircle size={16} />
</button>
                                    </>
                                  )}
                                </div>
                              ) : (
                                <span className={`text-[10px] tracking-wider uppercase ${lead.rm_acceptance_status === 'ACCEPTED' ? 'text-green-600' :
                                  lead.rm_acceptance_status === 'PENDING' ? 'text-orange-500' : 'text-red-500'
                                  }`}>
                                  {lead.rm_acceptance_status}
                                </span>
                              )}
                            </td>
                          )}

                          {/* 10. Created At */}
                          <td className={`px-4 py-4 whitespace-nowrap text-sm text-gray-600 transition-all duration-300 ${shouldBlur ? 'blur-[8px] opacity-10 select-none pointer-events-none' : ''}`}>
                            {new Date(lead.created_at).toLocaleDateString('en-GB')}
                          </td>

                          {/* 11. Documents */}
                          <td className={`px-4 py-4 whitespace-nowrap transition-all duration-300 ${shouldBlur ? 'blur-[8px] opacity-10 select-none pointer-events-none' : ''}`}>
                            <button onClick={() => setDocModalLead(lead)} className="inline-flex items-center gap-1.5 bg-gray-100 text-gray-700 px-3 py-1 rounded-md font-bold hover:bg-gray-200 transition-colors text-xs">
                              <Files size={14} /> Docs
                            </button>
                          </td>

                          {/* 12. Actions */}
                          <td className={`px-4 py-4 whitespace-nowrap text-right text-sm transition-all duration-300 ${shouldBlur ? 'blur-[8px] opacity-10 select-none pointer-events-none' : ''}`}>
                            <button onClick={() => setSelectedLead(lead)} className="bg-blue-50 text-blue-600 px-3 py-1 rounded-md font-bold transition-colors hover:bg-blue-100">
                              View
                            </button>
                          </td>
                        </tr>
                      );
                    })
                  ) : (
                    <tr><td colSpan={13} className="px-6 py-10 text-center text-gray-500 italic">No leads found.</td></tr>
                  )}
                </tbody>
              </table>
            )}
          </div>

          {/* ORIGINAL PAGINATION Logic - ALIGNED TO RIGHT CORNER */}
          <div className="px-4 py-4 border-t border-gray-100 flex items-center justify-end bg-gray-50/50">
            <div className="flex items-center gap-4 mr-6">
              <span className="text-xs text-gray-500 font-medium">
                Showing {indexOfFirstItem + 1} to {Math.min(indexOfLastItem, filteredLeads.length)} of {filteredLeads.length} leads
              </span>
            </div>

            <div className="flex items-center gap-1">
              <button
                onClick={() => paginate(currentPage - 1)}
                disabled={currentPage === 1}
                className="p-1.5 rounded-lg border bg-white text-gray-600 disabled:opacity-50 hover:bg-gray-100 transition-colors"
              >
                <ChevronLeft size={16} />
              </button>

              {[...Array(totalPages)].map((_, i) => {
                if (totalPages > 5 && i + 1 !== 1 && i + 1 !== totalPages && Math.abs(currentPage - (i + 1)) > 1) {
                  if (i + 1 === 2 || i + 1 === totalPages - 1) return <span key={i} className="px-1 text-gray-400">...</span>;
                  return null;
                }
                return (
                  <button
                    key={i}
                    onClick={() => paginate(i + 1)}
                    className={`px-3 py-1 text-xs font-bold rounded-lg transition-all ${currentPage === i + 1 ? 'bg-blue-600 text-white shadow-md' : 'bg-white text-gray-600 border hover:bg-gray-50'}`}
                  >
                    {i + 1}
                  </button>
                );
              })}

              <button
                onClick={() => paginate(currentPage + 1)}
                disabled={currentPage === totalPages || totalPages === 0}
                className="p-1.5 rounded-lg border bg-white text-gray-600 disabled:opacity-50 hover:bg-gray-100 transition-colors"
              >
                <ChevronRight size={16} />
              </button>
            </div>
          </div>
        </div>

        {/* --- DOCS MODAL --- */}
        <div className={`fixed inset-0 z-[60] flex items-center justify-center p-4 transition-all duration-300 ${docModalLead ? 'visible opacity-100' : 'invisible opacity-0'}`}>
          <div className="absolute inset-0 bg-slate-900/60 backdrop-blur-sm" onClick={() => setDocModalLead(null)} />
          <div className={`relative bg-white rounded-2xl shadow-2xl w-full max-w-xl max-h-[85vh] overflow-hidden flex flex-col transition-all duration-300 transform ${docModalLead ? 'scale-100' : 'scale-95'}`}>
            {docModalLead && (
              <>
                <div className="p-5 border-b flex items-center justify-between bg-white">
                  <div className="flex items-center gap-3">
                    <div className="p-2 bg-blue-50 rounded-lg text-blue-600"><Files size={20} /></div>
                    <div><h3 className="text-lg font-bold text-gray-900">Lead Documents</h3><p className="text-xs text-gray-500 font-medium">{docModalLead.detail_lead_id} • {docModalLead.lead_name}</p></div>
                  </div>
                  <button onClick={() => setDocModalLead(null)} className="p-2 hover:bg-gray-100 rounded-full text-gray-400 transition-colors"><X size={20} /></button>
                </div>
                <div className="flex-1 overflow-y-auto p-6">
                  {docModalLead.is_self_login ? (
                    <div className="flex flex-col items-center justify-center py-12 text-center">
                      <UserCheck className="w-16 h-16 text-green-600 mb-4" />
                      <h4 className="text-lg font-bold text-gray-900">Self Login Lead</h4>
                      <p className="text-sm text-gray-500 mt-2">Documents not required for self-login leads.</p>
                    </div>
                  ) : (
                    <div className="space-y-8">
                      <div>
                        <h4 className="text-sm font-bold text-gray-900 flex items-center gap-2 mb-4"><CheckCircle2 className="w-4 h-4 text-green-500" /> Uploaded Documents</h4>
                        <div className="space-y-2">
                          {docModalLead.uploaded_documents && docModalLead.uploaded_documents.length > 0 ? (
                            docModalLead.uploaded_documents.map((doc, idx) => (
                              <div key={idx} className="flex items-center justify-between p-3 bg-green-50 border border-green-100 rounded-xl">
                                <span className="text-sm text-green-700 font-medium">
                                  {doc.document_label || doc.document_key.replace(/_/g, ' ')}
                                </span>
                                <button
                                  onClick={() => handlePreview(doc.file_url)}
                                  className="text-[10px] font-bold text-blue-600 flex items-center gap-1 hover:underline cursor-pointer"
                                >
                                  View <ExternalLink size={12} />
                                </button>
                              </div>
                            ))
                          ) : (<div className="p-3 bg-gray-50 border border-dashed rounded-xl text-center text-xs text-gray-400">No documents uploaded yet</div>)}
                        </div>
                      </div>
                      <div>
                        <h4 className="text-sm font-bold text-gray-900 flex items-center gap-2 mb-4"><Clock className="w-4 h-4 text-orange-500" /> Pending Documents</h4>
                        <div className="space-y-2">
                          {docModalLead.pending_documents && docModalLead.pending_documents.length > 0 ? (
                            docModalLead.pending_documents.map((doc, idx) => (
                              <div key={idx} className="flex items-center justify-between p-3 bg-gray-50 border border-dashed rounded-xl">
                                <span className="text-sm text-gray-700 font-medium">
                                  {/* Handles both string arrays and the object structure seen in your console log */}
                                  {typeof doc === 'string'
                                    ? doc
                                    : (doc.document_label || doc.document_key.replace(/_/g, ' '))}
                                </span>
                                <div className="flex items-center gap-2">
                                  {doc.is_mandatory && <span className="text-[9px] bg-red-100 text-red-600 px-1.5 py-0.5 rounded font-bold">REQUIRED</span>}
                                  <span className="text-[10px] font-bold text-orange-600 uppercase">Pending</span>
                                </div>
                              </div>
                            ))
                          ) : (<div className="p-3 bg-gray-50 border border-dashed rounded-xl text-center text-xs text-gray-400">No pending documents</div>)}
                        </div>
                      </div>
                    </div>
                  )}
                </div>
                <div className="p-4 border-t bg-gray-50 flex justify-end">
                  <button onClick={() => setDocModalLead(null)} className="px-6 py-2 bg-white border text-gray-700 rounded-lg text-sm hover:bg-gray-100 transition-colors">Close</button>
                </div>
              </>
            )}
          </div>
        </div>

        {/* --- DOCUMENT PREVIEW MODAL (IN-APP) --- */}
        <div className={`fixed inset-0 z-[70] flex items-center justify-center p-2 md:p-10 transition-all duration-300 ${previewUrl ? 'visible opacity-100' : 'invisible opacity-0'}`}>
          <div className="absolute inset-0 bg-black/80 backdrop-blur-md" onClick={() => setPreviewUrl(null)} />

          <div className="relative bg-white rounded-xl shadow-2xl w-full h-full max-w-5xl flex flex-col overflow-hidden">
            {/* Modal Header */}
            <div className="p-4 border-b flex items-center justify-between bg-white">
              <h3 className="font-bold text-gray-800">Document Preview</h3>
              <div className="flex items-center gap-2">
                <a
                  href={previewUrl || '#'}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-2 hover:bg-gray-100 rounded-full text-blue-600 transition-colors"
                  title="Open in new tab"
                >
                  <ExternalLink size={20} />
                </a>
                <button
                  onClick={() => setPreviewUrl(null)}
                  className="p-2 hover:bg-gray-100 rounded-full text-gray-400 transition-colors"
                >
                  <X size={24} />
                </button>
              </div>
            </div>

            {/* Content Area */}
            <div className="flex-1 bg-gray-100 overflow-auto flex items-center justify-center p-4">
              {previewType === 'image' && (
                <Image
                  src={previewUrl || ''}
                  alt="Document"
                  width={800}
                  height={360}
                  className="max-w-full max-h-full object-contain shadow-lg"
                />
              )}

              {previewType === 'pdf' && (
                <iframe
                  src={`${previewUrl}#toolbar=0`}
                  className="w-full h-full rounded-md shadow-inner"
                  title="PDF Preview"
                />
              )}

              {previewType === 'other' && (
                <div className="text-center p-10 bg-white rounded-xl shadow-sm">
                  <FileText size={48} className="mx-auto text-gray-400 mb-4" />
                  <p className="text-gray-600 mb-4">Preview not available for this file type.</p>
                  <a
                    href={previewUrl || ''}
                    download
                    className="inline-flex items-center gap-2 bg-blue-600 text-white px-6 py-2 rounded-lg font-bold"
                  >
                    Download to View
                  </a>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* --- LEAD VIEW FORM (DYNAMIC) --- */}
        <div className={`fixed inset-0 z-50 flex items-center justify-center p-4 transition-all duration-300 ${selectedLead ? 'visible opacity-100' : 'invisible opacity-0'}`}>
          <div className="absolute inset-0 bg-slate-900/60 backdrop-blur-sm" onClick={() => setSelectedLead(null)} />
          <div className={`relative bg-white rounded-2xl shadow-2xl w-full max-w-2xl max-h-[90vh] overflow-hidden flex flex-col transition-all duration-300 transform ${selectedLead ? 'scale-100' : 'scale-95'}`}>
            {selectedLead && (
              <>
                <div className="p-6 border-b flex items-center justify-between bg-white">
                  <div>
                    <h3 className="text-xl font-bold text-gray-900">Lead Detail View</h3>
                    <div className="flex items-center gap-2 mt-2">
                      <span className="text-[11px] font-black text-gray-500 mr-2">ID:</span>
                      <span className="px-2 py-0.5 bg-blue-50 text-blue-700 border border-blue-100 rounded text-[10px] font-bold tracking-wider uppercase">
                        {selectedLead.detail_lead_id}
                      </span>
                      <span className="text-gray-300">|</span>
                      <span className="text-[11px] font-black text-gray-500 mr-2">NAME:</span>
                      <span className="text-sm font-semibold text-gray-700">
                        {selectedLead.lead_name}
                      </span>
                    </div>
                  </div>
                  <button onClick={() => setSelectedLead(null)} className="p-2 hover:bg-gray-100 rounded-full text-gray-400 transition-colors"><X size={20} /></button>
                </div>

                <div className="flex-1 overflow-y-auto p-8">
                  <div className="grid grid-cols-2 gap-y-8 gap-x-12">
                    {Object.entries(selectedLead.form_data || {}).map(([key, value]) => {
                      // 1. Format the label
                      const label = key
                        .replace(/([A-Z])/g, ' $1')
                        .replace(/^./, (str) => str.toUpperCase());

                      // 2. Logic for display value
                      let displayValue: string | number = 'N/A';

                      if (value === true || value === 'true') {
                        displayValue = 'Yes';
                      } else if (value === false || value === 'false') {
                        displayValue = 'No';
                      } else if (value !== null && value !== undefined && value !== '') {
                        // Check if it's a currency/amount field
                        if (key.toLowerCase().includes('amount')) {
                          const numValue = Number(value); // Convert to number safely
                          if (!isNaN(numValue)) {
                            displayValue = `₹${numValue.toLocaleString('en-IN')}`;
                          } else {
                            displayValue = String(value);
                          }
                        } else {
                          displayValue = String(value);
                        }
                      }

                      return (
                        <div key={key} className="space-y-1">
                          <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest">{label}</p>
                          <p className="text-sm font-bold text-gray-800 break-words">
                            {displayValue}
                          </p>
                        </div>
                      );
                    })}
                  </div>

                  {/* Fallback if form_data is empty */}
                  {Object.keys(selectedLead.form_data || {}).length === 0 && (
                    <div className="text-center py-10 text-gray-400">
                      No additional form data available.
                    </div>
                  )}
                </div>

                <div className="p-6 border-t bg-gray-50 flex gap-3">
                  {/* <button className="flex-1 bg-[#1CADA3] text-white font-bold py-2.5 rounded-xl text-sm hover:shadow-lg transition-all">Process Lead</button> */}
                  <button onClick={() => setSelectedLead(null)} className="px-6 py-2.5 bg-white border text-gray-600 font-bold rounded-xl text-sm hover:bg-gray-100 transition-all">Close</button>
                </div>
              </>
            )}
          </div>
        </div>
      </div>
      <div className={`fixed inset-0 z-[100] flex items-center justify-center p-4 transition-all duration-300 ${rejectModalId ? 'visible opacity-100' : 'invisible opacity-0'}`}>
  <div className="absolute inset-0 bg-slate-900/60 backdrop-blur-sm" onClick={() => setRejectModalId(null)} />
  <div className={`relative bg-white rounded-2xl shadow-2xl w-full max-w-sm p-6 transition-all duration-300 transform ${rejectModalId ? 'scale-100' : 'scale-95'}`}>
    <div className="flex flex-col items-center text-center">
      <div className="w-16 h-16 bg-red-50 text-red-500 rounded-full flex items-center justify-center mb-4">
        <XCircle size={32} />
      </div>
      <h3 className="text-xl font-bold text-gray-900">Reject Lead?</h3>
      <p className="text-sm text-gray-500 mt-2">
        Are you sure you want to reject this lead? This action cannot be undone.
      </p>
      
      <div className="flex flex-col w-full gap-2 mt-6">
        <button
          onClick={() => rejectModalId && handleAction(rejectModalId, 'reject')}
          disabled={processingId !== null}
          className="w-full py-2.5 bg-red-600 text-white font-bold rounded-xl hover:bg-red-700 transition-colors disabled:opacity-50 flex items-center justify-center"
        >
          {processingId ? <Loader2 className="w-4 h-4 animate-spin mr-2" /> : "Yes, Reject Lead"}
        </button>
        <button
          onClick={() => setRejectModalId(null)}
          className="w-full py-2.5 bg-gray-100 text-gray-700 font-bold rounded-xl hover:bg-gray-200 transition-colors"
        >
          Cancel
        </button>
      </div>
    </div>
  </div>
</div>
    </div>
  );
}