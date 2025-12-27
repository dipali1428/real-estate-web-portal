'use client';
import { useState, useEffect, useMemo } from 'react';
import { RmService } from '@/app/services/rmService';
import * as XLSX from 'xlsx';
import { Pencil, FileUp, FileText, Calendar, Clock, Video, MapPin, Plus, X, ArrowRight, Share2, UserCheck, ClipboardList, Inbox, ExternalLink, ChevronLeft, ChevronRight } from "lucide-react";

// ... (Interfaces remain exactly the same)
interface DSA {
  id: string;
  adv_id: string;
  name: string;
  email: string;
  mobile: string;
  pan: string;
  city: string;
  head: string;
  category: string;
  date_joined: string;
  status: 'Active' | 'Inactive' | 'Pending';
  total_leads?: number;
  converted_leads?: number;
  pending_leads?: number;
}

interface ReferralLead {
  id: number;
  lead_name: string;
  contact_number: string;
  email: string | null;
  department: string;
  sub_category: string;
  notes: string;
  status: 'pending' | 'contacted' | 'follow_up' | 'converted' | 'lost' | 'rejected' | 'new' | 'closed';
  created_at: string;
  dsa_id: number;
  dsa_name: string;
  dsa_adv_id: string;
  assigned_rm_department: string;
  assigned_rm_name: string;
  ref_id: string;
  last_follow_up?: string;
  documents?: { name: string; url: string }[];
}

interface Meeting {
  id: number;
  dsa_id: number;
  dsa_name: string;
  dsa_adv_id?: string;
  title: string;
  description: string;
  scheduled_date: string;
  scheduled_time: string;
  duration: number;
  meeting_type: 'virtual' | 'in-person';
  status: 'scheduled' | 'completed' | 'cancelled';
  platform?: string;
  location?: string;
  meeting_link?: string;
  agenda?: string;
}

const mapApiDataToDSA = (apiData: any[]): DSA[] => {
  return apiData.map(item => ({
    id: item.id?.toString() || '',
    adv_id: item.adv_id || '',
    name: item.name || '',
    email: item.email || '',
    mobile: item.mobile || '',
    pan: item.pan || '',
    city: item.city || '',
    head: item.head || '',
    category: item.category || '',
    date_joined: item.date_joined || '',
    status: 'Active',
    total_leads: item.total_leads || 0,
    converted_leads: item.converted_leads || 0,
    pending_leads: item.pending_leads || 0
  }));
};

const formatDate = (dateString: string) => {
  if (!dateString) return '';
  try {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-IN', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  } catch {
    return dateString;
  }
};

const formatTime = (dateString: string) => {
  if (!dateString) return '';
  try {
    const date = new Date(dateString);
    return date.toLocaleTimeString('en-IN', {
      hour: '2-digit',
      minute: '2-digit',
      hour12: true
    });
  } catch {
    return '';
  }
};

export default function ReferralManagementDashboard() {
  const [activeTab, setActiveTab] = useState<'dsa' | 'leads' | 'outgoing-leads' | 'incoming-leads' | 'meetings'>('dsa');
  const [dsaList, setDsaList] = useState<DSA[]>([]);
  const [meetings, setMeetings] = useState<Meeting[]>([]);
  const [leads, setLeads] = useState<ReferralLead[]>([]);
  const [incomingLeads, setIncomingLeads] = useState<ReferralLead[]>([]);
  const [outgoingLeads, setOutgoingLeads] = useState<ReferralLead[]>([]);
  const [loading, setLoading] = useState({
    dsa: true,
    meetings: true,
    leads: true,
    incomingLeads: true,
    outgoingLeads: true
  });
  const [error, setError] = useState<string | null>(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(5);

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [newMeeting, setNewMeeting] = useState({
    dsa_id: '',
    title: '',
    description: '',
    scheduled_date: '',
    scheduled_time: '',
    duration: 30,
    meeting_type: 'virtual' as 'virtual' | 'in-person',
    platform: 'Google Meet',
    location: ''
  });

  // Reset page when tab or search changes
  useEffect(() => {
    setCurrentPage(1);
  }, [activeTab, searchTerm]);

  useEffect(() => {
    const fetchAllData = async () => {
      try {
        await Promise.allSettled([
          fetchDSAList(),
          fetchMeetings(),
          fetchLeads(),
          fetchIncomingLeads(),
          fetchOutgoingLeads()
        ]);
      } catch (err) {
        console.error('Error in fetchAllData:', err);
        setError('Failed to load dashboard data');
      }
    };
    fetchAllData();
  }, []);

  const fetchLeads = async () => {
    try {
      const leadsRes = await RmService.getReferralLeads();
      if (leadsRes?.success && Array.isArray(leadsRes.leads)) {
        setLeads(leadsRes.leads);
      } else {
        setLeads([]);
      }
    } catch (err: any) {
      setError('Failed to load leads');
    } finally {
      setLoading(prev => ({ ...prev, leads: false }));
    }
  };

  const fetchIncomingLeads = async () => {
    try {
      const res = await RmService.getIncomingAssignedLeads();
      if (res?.success && Array.isArray(res.leads)) {
        setIncomingLeads(res.leads);
      } else {
        setIncomingLeads([]);
      }
    } catch (err: any) { } finally {
      setLoading(prev => ({ ...prev, incomingLeads: false }));
    }
  };

  const fetchDSAList = async () => {
    try {
      const dsaRes = await RmService.getYourDsaList();
      if (dsaRes?.success && Array.isArray(dsaRes.dsas)) {
        const mappedDSAs = mapApiDataToDSA(dsaRes.dsas);
        setDsaList(mappedDSAs);
      } else {
        setDsaList([]);
      }
    } catch (err: any) {
      setError('Failed to load DSA list');
    } finally {
      setLoading(prev => ({ ...prev, dsa: false }));
    }
  };

  const fetchOutgoingLeads = async () => {
    try {
      const res = await RmService.getoutgoingLeadsToRm();
      if (res?.success && Array.isArray(res.leads)) {
        setOutgoingLeads(res.leads);
      } else {
        setOutgoingLeads([]);
      }
    } catch (err: any) { } finally {
      setLoading(prev => ({ ...prev, outgoingLeads: false }));
    }
  };

  const fetchMeetings = async () => {
    try {
      setMeetings([]);
    } catch (err: any) { } finally {
      setLoading(prev => ({ ...prev, meetings: false }));
    }
  };

  const normalize = (str: string) =>
    str?.toLowerCase().replace(/[^a-z0-9]/g, "") || "";

  // Filtered Lists Logic
  const filteredDSAs = useMemo(() => dsaList.filter((dsa) => {
    const query = normalize(searchTerm);
    return normalize(dsa.adv_id).includes(query) || normalize(dsa.name).includes(query) ||
      normalize(dsa.email).includes(query) || normalize(dsa.mobile).includes(query);
  }), [dsaList, searchTerm]);

  const filteredMyLeads = useMemo(() => leads.filter(lead => {
    const query = normalize(searchTerm);
    return normalize(lead.lead_name).includes(query) || normalize(lead.contact_number).includes(query) ||
      normalize(lead.dsa_name).includes(query) || normalize(lead.sub_category).includes(query);
  }), [leads, searchTerm]);

  const filteredIncLeads = useMemo(() => incomingLeads.filter(lead => {
    const query = normalize(searchTerm);
    return normalize(lead.lead_name).includes(query) || normalize(lead.contact_number).includes(query) ||
      normalize(lead.dsa_name).includes(query);
  }), [incomingLeads, searchTerm]);

  const filteredOutLeads = useMemo(() => outgoingLeads.filter(lead => {
    const query = normalize(searchTerm);
    return normalize(lead.lead_name).includes(query) || normalize(lead.contact_number).includes(query) ||
      normalize(lead.dsa_name).includes(query);
  }), [outgoingLeads, searchTerm]);

  // Generic Pagination Helper
  const getPaginatedData = (data: any[]) => {
    const startIndex = (currentPage - 1) * itemsPerPage;
    return data.slice(startIndex, startIndex + itemsPerPage);
  };

  // Excel Download Functions
  const downloadDSAExcel = () => {
    const excelData = dsaList.map(dsa => ({
      'ID': dsa.id, 'Adv ID': dsa.adv_id, 'Name': dsa.name, 'Email': dsa.email,
      'Mobile': dsa.mobile, 'PAN': dsa.pan, 'City': dsa.city, 'Head': dsa.head,
      'Category': dsa.category, 'Date Joined': dsa.date_joined, 'Status': dsa.status,
      'Total Leads': dsa.total_leads || 0, 'Converted Leads': dsa.converted_leads || 0,
      'Pending Leads': dsa.pending_leads || 0,
    }));
    const workbook = XLSX.utils.book_new();
    const worksheet = XLSX.utils.json_to_sheet(excelData);
    XLSX.utils.book_append_sheet(workbook, worksheet, 'DSAs');
    const timestamp = new Date().toISOString().split('T')[0];
    const filename = `DSA_Report_${timestamp}.xlsx`;
    XLSX.writeFile(workbook, filename);
  };

  const downloadLeadsExcel = () => {
    const excelData = leads.map(lead => ({
      'Lead ID': lead.id,
      'DSA Name': lead.dsa_name,
      'DSA Adv ID': lead.dsa_adv_id,
      'Client Name': lead.lead_name,
      'Contact Number': lead.contact_number,
      'Email': lead.email,
      'Department': lead.department,
      'Sub Category': lead.sub_category,
      'Notes': lead.notes,
      'Status': lead.status,
      'Created At': lead.created_at,
      'Assigned RM': lead.assigned_rm_name || 'Unassigned',
      'Referral ID': lead.ref_id
    }));
    const workbook = XLSX.utils.book_new();
    const worksheet = XLSX.utils.json_to_sheet(excelData);
    XLSX.utils.book_append_sheet(workbook, worksheet, 'Referral Leads');
    const timestamp = new Date().toISOString().split('T')[0];
    const filename = `Referral_Leads_Report_${timestamp}.xlsx`;
    XLSX.writeFile(workbook, filename);
  };

  const downloadIncomingLeadsExcel = () => {
    const excelData = incomingLeads.map(lead => ({
      'Lead ID': lead.id,
      'Referral ID': lead.ref_id,
      'DSA Name': lead.dsa_name,
      'DSA Adv ID': lead.dsa_adv_id,
      'Client Name': lead.lead_name,
      'Contact Number': lead.contact_number,
      'Email': lead.email,
      'Department': lead.department,
      'Sub Category': lead.sub_category,
      'Notes': lead.notes || '-',
      'Status': lead.status,
      'Created At': lead.created_at,
      'Assigned RM Department': lead.assigned_rm_department,
      'Assigned RM Name': lead.assigned_rm_name || 'Unassigned'
    }));
    const workbook = XLSX.utils.book_new();
    const worksheet = XLSX.utils.json_to_sheet(excelData);
    XLSX.utils.book_append_sheet(workbook, worksheet, 'Incoming Leads');
    const timestamp = new Date().toISOString().split('T')[0];
    const filename = `Incoming_Referral_Leads_${timestamp}.xlsx`;
    XLSX.writeFile(workbook, filename);
  };

  const downloadOutgoingLeadsExcel = () => {
    const excelData = outgoingLeads.map(lead => ({
      'Lead ID': lead.id,
      'DSA Name': lead.dsa_name,
      'DSA Adv ID': lead.dsa_adv_id,
      'Client Name': lead.lead_name,
      'Contact Number': lead.contact_number,
      'Email': lead.email,
      'Department': lead.department,
      'Status': lead.status,
      'Created At': lead.created_at,
      'Assigned RM Name': lead.assigned_rm_name || 'Unassigned',
      'Referral ID': lead.ref_id
    }));
    const workbook = XLSX.utils.book_new();
    const worksheet = XLSX.utils.json_to_sheet(excelData);
    XLSX.utils.book_append_sheet(workbook, worksheet, 'Outgoing Leads');
    const timestamp = new Date().toISOString().split('T')[0];
    const filename = `Outgoing_Referral_Leads_${timestamp}.xlsx`;
    XLSX.writeFile(workbook, filename);
  };

  const PaginationControls = ({ totalItems }: { totalItems: number }) => {
    const totalPages = Math.ceil(totalItems / itemsPerPage);
    if (totalPages <= 1) return null;

    const pageNumbers = [];
    if (totalPages <= 5) {
      for (let i = 1; i <= totalPages; i++) pageNumbers.push(i);
    } else if (currentPage <= 3) {
      pageNumbers.push(1, 2, 3, 4, '...', totalPages);
    } else if (currentPage >= totalPages - 2) {
      pageNumbers.push(1, '...', totalPages - 3, totalPages - 2, totalPages - 1, totalPages);
    } else {
      pageNumbers.push(1, '...', currentPage - 1, currentPage, currentPage + 1, '...', totalPages);
    }

    return (
      <div className="flex items-center justify-between px-4 py-3 bg-white border-t border-gray-200 sm:px-6 mt-4">
        <div className="flex justify-between flex-1 sm:hidden">
          <button onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))} className="relative inline-flex items-center px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md hover:bg-gray-50">Previous</button>
          <button onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))} className="relative ml-3 inline-flex items-center px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md hover:bg-gray-50">Next</button>
        </div>
        <div className="hidden sm:flex sm:flex-1 sm:items-center sm:justify-between">
          <div>
            <p className="text-sm text-gray-700">
              Showing <span className="font-medium">{(currentPage - 1) * itemsPerPage + 1}</span> to <span className="font-medium">{Math.min(currentPage * itemsPerPage, totalItems)}</span> of <span className="font-medium">{totalItems}</span> results
            </p>
          </div>
          <div>
            <nav className="relative z-0 inline-flex -space-x-px rounded-md shadow-sm" aria-label="Pagination">
              <button onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))} className="relative inline-flex items-center px-2 py-2 rounded-l-md border border-gray-300 bg-white text-sm font-medium text-gray-500 hover:bg-gray-50">
                <ChevronLeft className="h-5 w-5" />
              </button>
              {pageNumbers.map((number, idx) => (
                <button
                  key={idx}
                  onClick={() => typeof number === 'number' && setCurrentPage(number)}
                  className={`relative inline-flex items-center px-4 py-2 border text-sm font-medium ${currentPage === number ? 'z-10 bg-blue-50 border-blue-500 text-blue-600' : 'bg-white border-gray-300 text-gray-500 hover:bg-gray-50'}`}
                  disabled={typeof number !== 'number'}
                >
                  {number}
                </button>
              ))}
              <button onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))} className="relative inline-flex items-center px-2 py-2 rounded-r-md border border-gray-300 bg-white text-sm font-medium text-gray-500 hover:bg-gray-50">
                <ChevronRight className="h-5 w-5" />
              </button>
            </nav>
          </div>
        </div>
      </div>
    );
  };

  const renderDSAList = () => {
    if (loading.dsa) return <div className="py-12 text-center animate-pulse">Loading...</div>;
    const paginatedDSAs = getPaginatedData(filteredDSAs);

    return (
      <div className="w-full max-w-7xl mx-auto">
        <div className="flex justify-between items-center mb-6">
          <div className="relative w-96">
            <input type="text" value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)} placeholder="Search by adv_id, name, email or mobile" className="w-full pl-10 pr-4 py-2 border rounded-lg bg-white text-gray-900 focus:ring-2 focus:ring-blue-500" />
            <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none text-gray-400">
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-4.35-4.35M17 11a6 6 0 11-12 0 6 6 0 0112 0z" /></svg>
            </div>
          </div>
          <div className="flex items-center space-x-1">
          <label className="text-sm text-gray-600">Show:</label>
            <select value={itemsPerPage} onChange={(e) => setItemsPerPage(Number(e.target.value))} className="border border-gray-300 text-gray-500 rounded-md px-2 py-1 text-sm bg-white">
              <option value="5">5</option><option value="10">10</option><option value="25">25</option><option value="50">50</option><option value="100">100</option>
            </select>
            <button
              onClick={downloadDSAExcel}
              disabled={dsaList.length === 0}
              className="inline-flex items-center justify-center mx-4 bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <FileUp className="w-5 h-5 mr-2" />
              Download Excel
            </button>
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                {['ID', 'Adv ID', 'Name', 'Email', 'Mobile', 'PAN', 'City', 'Head', 'Category', 'Date Joined', 'Status', 'Total Leads', 'Converted Leads', 'Pending Leads'].map(h => (
                  <th key={h} className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">{h}</th>
                ))}
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {paginatedDSAs.map((dsa) => (
                <tr key={dsa.id} className="hover:bg-gray-50">
                  <td className="px-4 py-3 whitespace-nowrap text-sm font-medium text-gray-900">{dsa.id}</td>
                  <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-900">{dsa.adv_id}</td>
                  <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-900">{dsa.name}</td>
                  <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-500">{dsa.email}</td>
                  <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-900">{dsa.mobile}</td>
                  <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-900">{dsa.pan}</td>
                  <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-900">{dsa.city}</td>
                  <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-900">{dsa.head}</td>
                  <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-900">{dsa.category}</td>
                  <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-500">{formatDate(dsa.date_joined)}</td>
                  <td className="px-4 py-3 whitespace-nowrap">
                    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${dsa.status === 'Active' ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}`}>{dsa.status}</span>
                  </td>
                  <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-900">{dsa.total_leads || 0}</td>
                  <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-900">{dsa.converted_leads || 0}</td>
                  <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-900">{dsa.pending_leads || 0}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <PaginationControls totalItems={filteredDSAs.length} />
      </div>
    );
  };

  const renderLeads = () => {
    if (loading.leads) return <div className="py-12 text-center animate-pulse">Loading...</div>;
    const paginatedLeads = getPaginatedData(filteredMyLeads);

    return (
      <div>
        <div className="mb-6 bg-white p-4 rounded-lg border shadow-sm flex justify-between items-center">
          <div className="relative w-96">
            <input type="text" value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)} placeholder="Search leads..." className="w-full pl-10 pr-4 py-2 border rounded-lg bg-white text-gray-900 focus:ring-2 focus:ring-blue-500" />
            <div className="absolute inset-y-0 left-0 flex items-center pl-3 text-gray-400">
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-4.35-4.35M17 11a6 6 0 11-12 0 6 6 0 0112 0z" /></svg>
            </div>
          </div>
          <div className="flex items-center space-x-1">
            <label className="text-sm text-gray-600">Show:</label>
            <select value={itemsPerPage} onChange={(e) => setItemsPerPage(Number(e.target.value))} className="border border-gray-300 text-gray-500 rounded-md px-2 py-1 text-sm bg-white">
              <option value="5">5</option><option value="10">10</option><option value="25">25</option><option value="50">50</option><option value="100">100</option>
            </select>
            <button
              onClick={downloadLeadsExcel}
              disabled={leads.length === 0}
              className="inline-flex items-center justify-center mx-4 bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <FileUp className="w-5 h-5 mr-2" />
              Download Excel
            </button>
          </div>
        </div>
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                {['DSA', 'Client Details', 'Department', 'Sub Category', 'Additional Notes', 'Status', 'Created At'].map(h => (
                  <th key={h} className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">{h}</th>
                ))}
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {paginatedLeads.map(lead => (
                <tr key={lead.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 text-sm"><div className="flex flex-col"><span className="font-medium text-gray-900">{lead.dsa_name}</span><span className="text-xs text-gray-500">{lead.dsa_adv_id}</span></div></td>
                  <td className="px-6 py-4 text-sm"><div className="flex flex-col"><span className="font-bold text-gray-900">{lead.lead_name}</span><span className="text-blue-600">{lead.contact_number}</span><span className="text-blue-600">{lead.email}</span></div></td>
                  <td className="px-6 py-4 text-sm text-gray-500">{lead.department}</td>
                  <td className="px-6 py-4 text-sm text-gray-500">{lead.sub_category}</td>
                  <td className="px-6 py-4 text-sm text-gray-500 max-w-xs truncate">{lead.notes}</td>
                  <td className="px-6 py-4 text-sm"><span className="px-2 py-1 bg-blue-100 text-blue-800 rounded-full text-xs">{lead.status}</span></td>
                  <td className="px-6 py-4 text-sm text-gray-500">{formatDate(lead.created_at)}<div className="text-xs text-gray-400">{formatTime(lead.created_at)}</div></td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <PaginationControls totalItems={filteredMyLeads.length} />
      </div>
    );
  };

  const renderIncomingLeads = () => {
    if (loading.incomingLeads) return <div className="py-12 text-center animate-pulse">Loading...</div>;
    const paginatedLeads = getPaginatedData(filteredIncLeads);

    return (
      <div>
        <div className="mb-6 bg-white p-4 rounded-lg border shadow-sm flex justify-between items-center">
          <div className="relative w-96">
            <input type="text" value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)} placeholder="Search incoming leads..." className="w-full pl-10 pr-4 py-2 border rounded-lg bg-white text-gray-900" />
            <div className="absolute inset-y-0 left-0 flex items-center pl-3 text-gray-400">
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-4.35-4.35M17 11a6 6 0 11-12 0 6 6 0 0112 0z" /></svg>
            </div>
          </div>
          <div className="flex items-center space-x-1">
            <label className="text-sm text-gray-600">Show:</label>
            <select value={itemsPerPage} onChange={(e) => setItemsPerPage(Number(e.target.value))} className="border border-gray-300 text-gray-500 rounded-md px-2 py-1 text-sm bg-white">
              <option value="5">5</option><option value="10">10</option><option value="25">25</option><option value="50">50</option><option value="100">100</option>
            </select>
            <button
              onClick={downloadIncomingLeadsExcel}
              disabled={incomingLeads.length === 0}
              className="inline-flex items-center justify-center mx-4 bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <FileUp className="w-5 h-5 mr-2" />
              Download Excel
            </button>
          </div>
        </div>
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                {['DSA', 'Referral ID', 'Client Details', 'Department', 'Sub Category', 'Notes', 'Status', 'Created At'].map(h => (
                  <th key={h} className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">{h}</th>
                ))}
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {paginatedLeads.map(lead => (
                <tr key={lead.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 text-sm"><div className="flex flex-col"><span className="font-medium text-gray-900">{lead.dsa_name}</span><span className="text-xs text-gray-500">{lead.dsa_adv_id}</span></div></td>
                  <td className="px-6 py-4 text-sm"><span className="font-bold text-gray-600">{lead.ref_id}</span></td>
                  <td className="px-6 py-4 text-sm"><div className="flex flex-col"><span className="font-bold text-gray-900">{lead.lead_name}</span><span className="text-blue-600">{lead.contact_number}</span><span className="text-gray-600">{lead.email}</span></div></td>
                  <td className="px-6 py-4 text-sm text-gray-500">{lead.department}</td>
                  <td className="px-6 py-4 text-sm text-gray-500">{lead.sub_category}</td>
                  <td className="px-6 py-4 text-sm text-gray-500 max-w-xs truncate">{lead.notes || '-'}</td>
                  <td className="px-6 py-4 text-sm"><span className={`inline-flex px-2.5 py-0.5 rounded-full text-xs font-medium ${lead.status === 'converted' ? 'bg-green-100 text-green-800' : lead.status === 'new' ? 'bg-blue-100 text-blue-800' : 'bg-gray-100 text-gray-800'}`}>{lead.status}</span></td>
                  <td className="px-6 py-4 text-sm text-gray-500">{formatDate(lead.created_at)}<div className="text-xs text-gray-400">{formatTime(lead.created_at)}</div></td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <PaginationControls totalItems={filteredIncLeads.length} />
      </div>
    );
  };

  const renderoutgoingLeads = () => {
    if (loading.outgoingLeads) return <div className="py-12 text-center animate-pulse">Loading...</div>;
    const paginatedLeads = getPaginatedData(filteredOutLeads);

    return (
      <div>
        <div className="flex justify-between items-center mb-6">
          <div className="relative w-96">
            <input type="text" value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)} placeholder="Search outgoing leads..." className="w-full pl-10 pr-4 py-2 border rounded-lg bg-white text-gray-900" />
            <div className="absolute inset-y-0 left-0 flex items-center pl-3 text-gray-400">
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-4.35-4.35M17 11a6 6 0 11-12 0 6 6 0 0112 0z" /></svg>
            </div>
          </div>
          <div className="flex items-center space-x-1">
            <label className="text-sm text-gray-600">Show:</label>
            <select value={itemsPerPage} onChange={(e) => setItemsPerPage(Number(e.target.value))} className="border border-gray-300 text-gray-500 rounded-md px-2 py-1 text-sm bg-white">
              <option value="5">5</option><option value="10">10</option><option value="25">25</option><option value="50">50</option><option value="100">100</option>
            </select>
            <button
              onClick={downloadOutgoingLeadsExcel}
              disabled={outgoingLeads.length === 0}
              className="inline-flex items-center justify-center mx-4 bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <FileUp className="w-5 h-5 mr-2" />
              Download Excel
            </button>
          </div>
        </div>
        <div className="mb-4 p-3 bg-indigo-50 border border-indigo-200 rounded-md">
          <p className="text-sm text-blue-600 font-medium flex items-center"><ClipboardList className="w-4 h-4 mr-2" />Leads specifically assigned to you from the department team.</p>
        </div>
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                {['DSA Details', 'Client Details', 'Department', 'Status', 'Assigned RM', 'Created At'].map(h => (
                  <th key={h} className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">{h}</th>
                ))}
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {paginatedLeads.map(lead => (
                <tr key={lead.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 text-sm"><div className="flex flex-col"><span className="font-medium text-gray-900">{lead.dsa_name}</span><span className="text-xs text-gray-500">{lead.dsa_adv_id}</span></div></td>
                  <td className="px-6 py-4 text-sm"><div className="flex flex-col"><span className="font-bold text-gray-900">{lead.lead_name}</span><span className="text-blue-600 font-medium">{lead.contact_number}</span><span className="text-gray-600 font-medium">{lead.email}</span></div></td>
                  <td className="px-6 py-4 text-sm text-gray-600">{lead.department}</td>
                  <td className="px-6 py-4 text-sm text-gray-600">{lead.status}</td>
                  <td className="px-6 py-4 text-sm font-semibold text-blue-600">{lead.assigned_rm_name || 'Unassigned'}</td>
                  <td className="px-6 py-4 text-sm text-gray-500">{formatDate(lead.created_at)}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <PaginationControls totalItems={filteredOutLeads.length} />
      </div>
    );
  };

  const renderMeetings = () => {
    const upcomingMeetings = meetings.filter(m => m.status === 'scheduled');
    return (
      <div>
        <div className="mb-6 flex justify-between items-center">
          <h3 className="text-lg font-semibold text-gray-900">Meeting Schedules</h3>
          <button onClick={() => setIsModalOpen(true)} className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-blue-600 hover:bg-blue-700">
            <Plus className="w-4 h-4 mr-2" /> Schedule with DSA
          </button>
        </div>
        {upcomingMeetings.length === 0 ? (
          <div className="text-center py-12 text-gray-500">No scheduled meetings found.</div>
        ) : (
          upcomingMeetings.map(meeting => (
            <div key={meeting.id} className="border rounded-lg p-4 mb-4 bg-white">
              <h5 className="font-semibold text-gray-900">{meeting.title}</h5>
              <p className="text-sm text-gray-600">DSA: {meeting.dsa_name}</p>
              <p className="text-sm text-gray-600">Date: {formatDate(meeting.scheduled_date)} at {meeting.scheduled_time}</p>
            </div>
          ))
        )}
      </div>
    );
  };

  const isLoading = loading.dsa || loading.leads || loading.meetings || loading.outgoingLeads || loading.incomingLeads;

  return (
    <div className="p-4 md:p-6 bg-gray-50 min-h-screen">
      <div className="max-w-7xl mx-auto">
        <div className="mb-6 md:mb-8">
          <h1 className="text-xl md:text-2xl font-bold text-gray-900">Referral Management Dashboard</h1>
          <p className="text-sm md:text-base text-gray-600 mt-1">Manage your DSAs, meetings, and leads in one place</p>
        </div>

        <div className="border-b border-gray-200 mb-6">
          <nav className="flex space-x-4 md:space-x-8 -mb-px overflow-x-auto">
            <button onClick={() => setActiveTab('dsa')} className={`py-2 px-1 border-b-2 font-medium text-sm whitespace-nowrap flex items-center ${activeTab === 'dsa' ? 'border-blue-600 text-blue-600' : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'}`}>
              My DSA List <span className="ml-2 py-0.5 px-2 rounded-full text-xs font-medium bg-gray-100">{dsaList.length}</span>
            </button>
            <button onClick={() => setActiveTab('leads')} className={`py-2 px-1 border-b-2 font-medium text-sm whitespace-nowrap flex items-center ${activeTab === 'leads' ? 'border-blue-600 text-blue-600' : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'}`}>
              My Referral Leads <span className="ml-2 py-0.5 px-2 rounded-full text-xs font-medium bg-gray-100">{leads.length}</span>
            </button>
            <button onClick={() => setActiveTab('incoming-leads')} className={`py-2 px-1 border-b-2 font-medium text-sm whitespace-nowrap flex items-center ${activeTab === 'incoming-leads' ? 'border-blue-600 text-blue-600' : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'}`}>
              Incoming Referral Leads <span className="ml-2 py-0.5 px-2 rounded-full text-xs font-medium bg-gray-100">{incomingLeads.length}</span>
            </button>
            <button onClick={() => setActiveTab('outgoing-leads')} className={`py-2 px-1 border-b-2 font-medium text-sm whitespace-nowrap flex items-center ${activeTab === 'outgoing-leads' ? 'border-blue-600 text-blue-600' : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'}`}>
              Outgoing Referral Leads <span className="ml-2 py-0.5 px-2 rounded-full text-xs font-medium bg-gray-100">{outgoingLeads.length}</span>
            </button>
            <button onClick={() => setActiveTab('meetings')} className={`py-2 px-1 border-b-2 font-medium text-sm whitespace-nowrap flex items-center ${activeTab === 'meetings' ? 'border-blue-600 text-blue-600' : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'}`}>
              DSA Meetings <span className="ml-2 py-0.5 px-2 rounded-full text-xs font-medium bg-gray-100">{meetings.length}</span>
            </button>
          </nav>
        </div>

        <div className="bg-white rounded-lg shadow-sm border p-4 md:p-6">
          {isLoading ? (
            <div className="flex flex-col items-center justify-center py-12">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500 mb-4"></div>
              <p className="text-gray-600">Loading data...</p>
            </div>
          ) : (
            <>
              {activeTab === 'dsa' && renderDSAList()}
              {activeTab === 'leads' && renderLeads()}
              {activeTab === 'outgoing-leads' && renderoutgoingLeads()}
              {activeTab === 'incoming-leads' && renderIncomingLeads()}
              {activeTab === 'meetings' && renderMeetings()}
            </>
          )}
        </div>
      </div>
    </div>
  );
}