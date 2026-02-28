"use client";

import React, { useState, useEffect } from 'react';
import { AdminService } from '../../services/adminService';
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
} from 'lucide-react';

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
  rm_id: number;
  rm_name: string;
  rm_acceptance_status: string;
  rm_action_deadline: string;
  referred_rm?: string;
  is_self_login: boolean;
  uploaded_documents?: {
    document_key: string;
    document_label?: string;
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
  form_data?: any;
  // NEW FIELDS FOR EXPORT
  disbursement_amount?: any;
  gross_payout_amount?: any;
  gst_amount?: any;
  tds_amount?: any;
  net_payout_amount?: any;
  payout_date?: any;
  payout_id?: any;
  payment_mode?: any;
  transaction_reference_no?: string;
  invoice_number?: any;
  invoice_date?: any;
  policy_number?: any;
}

export default function LeadDashboard() {
  const [leads, setLeads] = useState<Lead[]>([]);
  const [loading, setLoading] = useState(true);
  const [leadType] = useState<'my_lead' | 'incoming' | 'outgoing'>('my_lead');
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedLead, setSelectedLead] = useState<Lead | null>(null);
  const [docModalLead, setDocModalLead] = useState<Lead | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const [previewType, setPreviewType] = useState<'image' | 'pdf' | 'other' | null>(null);

  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(5);

  const [uploading, setUploading] = useState(false);

  const fetchLeads = async () => {
    setLoading(true);
    try {
      const response = await AdminService.getAllDetailLeads();
      console.log("Fetched Leads:", response);
      if (response && response.success) {
        setLeads(response.detail_leads || []);
      } else {
        setLeads([]);
      }
    } catch (error) {
      console.error("Error fetching leads:", error);
      setLeads([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchLeads();
    setCurrentPage(1);
  }, []);

  useEffect(() => {
    setCurrentPage(1);
  }, [searchTerm]);

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

  const downloadCSV = () => {
    const dataToExport = filteredLeads;

    if (dataToExport.length === 0) {
      alert("No data available to download");
      return;
    }

    // List of specific fields to ensure are included in the export
    const extraFields = [
      'disbursement_amount',
      'gross_payout_amount',
      'gst_amount',
      'tds_amount',
      'net_payout_amount',
      'payout_date',
      'payout_id',
      'payment_mode',
      'transaction_reference_no',
      'invoice_number',
      'invoice_date',
      'policy_number'
    ];

    const allKeys = new Set<string>();
    
    // Collect existing keys from the data
    dataToExport.forEach(lead => {
      Object.keys(lead).forEach(key => allKeys.add(key));
    });

    // Explicitly add the requested fields to the header set
    extraFields.forEach(field => allKeys.add(field));

    const headers = Array.from(allKeys);
    const csvRows = [];

    // Add Header row
    csvRows.push(headers.join(','));

    // Add Data rows
    for (const lead of dataToExport) {
      const values = headers.map(header => {
        const val = (lead as any)[header];
        let cellValue = '';

        if (val === null || val === undefined) {
          cellValue = '';
        } else if (typeof val === 'object') {
          cellValue = JSON.stringify(val);
        } else {
          cellValue = String(val);
        }

        const escaped = cellValue.replace(/"/g, '""');
        return `"${escaped}"`;
      });
      csvRows.push(values.join(','));
    }

    const csvString = csvRows.join('\n');
    const blob = new Blob([csvString], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.setAttribute('href', url);
    link.setAttribute('download', `all_leads_export_${new Date().toISOString().split('T')[0]}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const handleFileUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    setUploading(true);
    try {
      const response = await AdminService.uploadDetailLeadsCSV(file);
      console.log("Upload response:", response);
      if (response.success) {
        alert("CSV uploaded and processed successfully!");
      } else {
        alert(response.message || "Failed to upload CSV");
      }
    } catch (error: any) {
      console.error("Upload error:", error);
      alert(error.response?.data?.message || "Error uploading file");
    } finally {
      setUploading(false);
      event.target.value = '';
    }
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
              Viewing all assigned leads
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
              placeholder="Search by Lead ID, Client or Number..."
              className="w-full pl-10 pr-4 py-2 border rounded-lg shadow-sm focus:outline-none bg-white text-gray-900 focus:ring-2 focus:ring-[#1CADA3] text-sm"
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
            
            <div className="flex-1 md:flex-none">
              <input
                type="file"
                id="csvUpload"
                accept=".csv"
                className="hidden"
                onChange={handleFileUpload}
                disabled={uploading}
              />
              <label
                htmlFor="csvUpload"
                className={`inline-flex items-center justify-center bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 text-sm font-medium transition-colors shadow-sm cursor-pointer ${uploading ? 'opacity-50 pointer-events-none' : ''}`}>
                {uploading ? (
                  <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                ) : (
                  <FileUp className="w-4 h-4 mr-2" />
                )}
                {uploading ? 'Uploading...' : 'Upload CSV'}
              </label>
            </div>
            
            <button
              onClick={downloadCSV}
              className="flex-1 md:flex-none inline-flex items-center justify-center bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 text-sm font-medium transition-colors shadow-sm cursor-pointer">
              <FileUp className="w-4 h-4 mr-2" /> Download CSV
            </button>
          </div>
        </div>

        {/* MAIN TABLE CONTAINER */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 flex flex-col overflow-hidden">
          <div className="overflow-x-auto overflow-y-auto max-h-[600px] scrollbar-x-thin scrollbar-thumb-gray-300">
            {loading ? (
              <div className="flex flex-col items-center justify-center py-20">
                <Loader2 className="w-10 h-10 text-[#1CADA3] animate-spin mb-4" />
                <p className="text-gray-500 font-medium">Loading Leads...</p>
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
                    <th className="px-4 py-4 text-left text-xs font-bold text-gray-600 uppercase tracking-wider">Referred RM</th>
                    {leadType !== 'my_lead' && (
                      <th className="px-4 py-4 text-left text-xs font-bold text-gray-600 uppercase tracking-wider">Assigned RM</th>
                    )}
                    <th className="px-4 py-4 text-left text-xs font-bold text-gray-600 uppercase tracking-wider">Self Login</th>
                    <th className="px-4 py-4 text-left text-xs font-bold text-gray-600 uppercase tracking-wider bg-gray-50">Acceptance</th>
                    <th className="px-4 py-4 text-left text-xs font-bold text-gray-600 uppercase tracking-wider">Created At</th>
                    <th className="px-4 py-4 text-left text-xs font-bold text-gray-600 uppercase tracking-wider">Documents</th>
                    <th className="px-4 py-4 text-right text-xs font-bold text-gray-600 uppercase tracking-wider">Actions</th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {currentLeads.length > 0 ? (
                    currentLeads.map((lead) => {
                      return (
                        <tr key={lead.id} className="hover:bg-gray-50 transition-colors relative group">
                          <td className="px-4 py-4 whitespace-nowrap text-sm text-gray-600 font-bold bg-white z-20">
                            {lead.id}
                          </td>

                          <td className="px-4 py-4 whitespace-nowrap text-sm font-bold text-gray-700 bg-white z-20">
                            {lead.detail_lead_id}
                          </td>

                          <td className="px-4 py-4 whitespace-nowrap">
                            <span className={`px-2 py-0.5 rounded-full text-[10px] font-bold border ${lead.lead_status === 'NEW' ? 'bg-green-50 text-green-700 border-green-200' : 'bg-blue-50 text-blue-700 border-blue-200'}`}>
                              {lead.lead_status}
                            </span>
                          </td>

                          <td className="px-4 py-4 whitespace-nowrap text-sm text-gray-700">
                            <div className="font-bold">{lead.dsa_name}</div>
                            <div className="text-[10px] text-gray-500">ID: {lead.dsa_id || 'N/A'}</div>
                          </td>

                          <td className="px-4 py-4 whitespace-nowrap text-sm">
                            <div className="font-bold text-gray-800">{lead.lead_name}</div>
                            <div className="text-[11px] text-gray-600">{lead.email}</div>
                            <div className="text-[10px] text-gray-500">{lead.contact_number}</div>
                          </td>

                          <td className="px-4 py-4 whitespace-nowrap text-sm text-gray-600">
                            {lead.referred_rm || 'N/A'}
                          </td>

                          {leadType !== 'my_lead' && (
                            <td className="px-4 py-4 whitespace-nowrap text-sm text-purple-600 font-medium">
                              <div className="font-bold text-gray-800">{lead.assigned_rm_name}</div>
                              <div className="text-[10px] text-gray-500">{lead.assigned_rm_mobile}</div>
                              <div className="text-[11px] text-gray-600">ID: {lead.assigned_rm_id}</div>
                            </td>
                          )}

                          <td className="px-4 py-4 whitespace-nowrap text-sm text-gray-600">
                            {lead.is_self_login ? <span className="text-green-600 font-bold">Yes</span> : 'No'}
                          </td>

                          <td className="px-4 py-4 whitespace-nowrap text-sm font-bold z-20 bg-white">
                            <span className={`${lead.rm_acceptance_status === 'ACCEPTED' ? 'text-green-600' : lead.rm_acceptance_status === 'PENDING' ? 'text-orange-500' : 'text-red-500'} text-[10px] tracking-wider uppercase`}>
                              {lead.rm_acceptance_status}
                            </span>
                          </td>

                          <td className="px-4 py-4 whitespace-nowrap text-sm text-gray-600">
                            {new Date(lead.created_at).toLocaleDateString('en-GB')}
                          </td>

                          <td className="px-4 py-4 whitespace-nowrap">
                            <button onClick={() => setDocModalLead(lead)} className="inline-flex items-center gap-1.5 bg-gray-100 text-gray-700 px-3 py-1 rounded-md font-bold hover:bg-gray-200 transition-colors text-xs">
                              <Files size={14} /> Docs
                            </button>
                          </td>

                          <td className="px-4 py-4 whitespace-nowrap text-right text-sm">
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

          {/* PAGINATION */}
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
                    className={`px-3 py-1 text-xs font-bold rounded-lg transition-all ${currentPage === i + 1 ? 'bg-[#1CADA3] text-white shadow-md' : 'bg-white text-gray-600 border hover:bg-gray-50'}`}
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
                  <button onClick={() => setDocModalLead(null)} className="px-6 py-2 bg-white border rounded-lg text-sm hover:bg-gray-100 transition-colors">Close</button>
                </div>
              </>
            )}
          </div>
        </div>

        {/* --- DOCUMENT PREVIEW MODAL --- */}
        <div className={`fixed inset-0 z-[70] flex items-center justify-center p-2 md:p-10 transition-all duration-300 ${previewUrl ? 'visible opacity-100' : 'invisible opacity-0'}`}>
          <div className="absolute inset-0 bg-black/80 backdrop-blur-md" onClick={() => setPreviewUrl(null)} />
          <div className="relative bg-white rounded-xl shadow-2xl w-full h-full max-w-5xl flex flex-col overflow-hidden">
            <div className="p-4 border-b flex items-center justify-between bg-white">
              <h3 className="font-bold text-gray-800">Document Preview</h3>
              <div className="flex items-center gap-2">
                <a href={previewUrl || '#'} target="_blank" rel="noopener noreferrer" className="p-2 hover:bg-gray-100 rounded-full text-blue-600 transition-colors"><ExternalLink size={20} /></a>
                <button onClick={() => setPreviewUrl(null)} className="p-2 hover:bg-gray-100 rounded-full text-gray-400 transition-colors"><X size={24} /></button>
              </div>
            </div>
            <div className="flex-1 bg-gray-100 overflow-auto flex items-center justify-center p-4">
              {previewType === 'image' && <img src={previewUrl || ''} alt="Document" className="max-w-full max-h-full object-contain shadow-lg" />}
              {previewType === 'pdf' && <iframe src={`${previewUrl}#toolbar=0`} className="w-full h-full rounded-md shadow-inner" title="PDF Preview" />}
              {previewType === 'other' && (
                <div className="text-center p-10 bg-white rounded-xl shadow-sm">
                  <FileText size={48} className="mx-auto text-gray-400 mb-4" />
                  <p className="text-gray-600 mb-4">Preview not available.</p>
                  <a href={previewUrl || ''} download className="inline-flex items-center gap-2 bg-blue-600 text-white px-6 py-2 rounded-lg font-bold">Download to View</a>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* --- LEAD VIEW FORM --- */}
        <div className={`fixed inset-0 z-50 flex items-center justify-center p-4 transition-all duration-300 ${selectedLead ? 'visible opacity-100' : 'invisible opacity-0'}`}>
          <div className="absolute inset-0 bg-slate-900/60 backdrop-blur-sm" onClick={() => setSelectedLead(null)} />
          <div className={`relative bg-white rounded-2xl shadow-2xl w-full max-w-2xl max-h-[90vh] overflow-hidden flex flex-col transition-all duration-300 transform ${selectedLead ? 'scale-100' : 'scale-95'}`}>
            {selectedLead && (
              <>
                <div className="p-6 border-b flex items-center justify-between bg-white">
                  <div>
                    <h3 className="text-xl font-bold text-gray-900">Lead Detail View</h3>
                    <p className="text-xs text-gray-500 font-medium mt-1">{selectedLead.detail_lead_id} • {selectedLead.lead_name}</p>
                  </div>
                  <button onClick={() => setSelectedLead(null)} className="p-2 hover:bg-gray-100 rounded-full text-gray-400 transition-colors"><X size={20} /></button>
                </div>

                <div className="flex-1 overflow-y-auto p-8">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-y-8 gap-x-12">
                    {selectedLead.form_data && Object.keys(selectedLead.form_data).length > 0 ? (
                      Object.entries(selectedLead.form_data).map(([key, value]) => {
                        const formattedLabel = key
                          .replace(/([A-Z])/g, ' $1')
                          .replace(/_/g, ' ')
                          .replace(/^\w/, (c) => c.toUpperCase())
                          .trim();

                        let displayValue = "";
                        if (value === null || value === undefined || value === "") {
                          displayValue = "N/A";
                        } else if (typeof value === 'boolean') {
                          displayValue = value ? "Yes" : "No";
                        } else if (key.toLowerCase().includes('amount') && !isNaN(Number(value))) {
                          displayValue = `₹${parseFloat(value as string).toLocaleString('en-IN')}`;
                        } else if (typeof value === 'object') {
                          displayValue = JSON.stringify(value);
                        } else {
                          displayValue = String(value);
                        }

                        return (
                          <div key={key} className="space-y-1">
                            <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest">
                              {formattedLabel}
                            </p>
                            <p className="text-sm font-bold text-gray-800">
                              {displayValue}
                            </p>
                          </div>
                        );
                      })
                    ) : (
                      <div className="col-span-2 py-10 text-center text-gray-400 italic">
                        No additional form data available for this lead.
                      </div>
                    )}
                  </div>
                </div>

                <div className="p-6 border-t bg-gray-50 flex gap-3">
                  <button onClick={() => setSelectedLead(null)} className="px-6 py-2.5 bg-white border text-gray-600 font-bold rounded-xl text-sm hover:bg-gray-100 transition-all">
                    Close
                  </button>
                </div>
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}