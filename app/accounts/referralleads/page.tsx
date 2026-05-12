'use client';
import { useState, useEffect, useMemo } from 'react';
import * as XLSX from 'xlsx';
import { FileUp, ChevronLeft, ChevronRight } from "lucide-react";
import toast from 'react-hot-toast';
import { AccountService } from '@/app/services/accountsService'; // Adjust path if necessary

const statusStyles: Record<string, string> = {
  completed: "bg-green-50 text-green-700 border-green-100",
  submitted: "bg-blue-50 text-blue-700 border-blue-100",
  in_progress: "bg-yellow-50 text-yellow-700 border-yellow-100",
  rejected: "bg-red-50 text-red-700 border-red-100",
  follow_up: "bg-purple-50 text-purple-700 border-purple-100",
  pending: "bg-gray-50 text-gray-700 border-gray-100",
};

interface ReferralLead {
  id: number;
  lead_name: string;
  contact_number: string;
  email: string | null;
  department: string;
  sub_category: string;
  notes: string;
  referral_lead_status?: string;
  rejection_note?: string;
  status: string;
  created_at: string;
  dsa_id: number;
  dsa_name: string;
  dsa_adv_id: string;
  assigned_rm_department: string;
  assigned_rm_name: string;
  ref_id: string;
}

const formatDate = (dateString: string) => {
  if (!dateString) return '';
  try {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-IN', { year: 'numeric', month: 'short', day: 'numeric' });
  } catch { return dateString; }
};

export default function ReferralLeadsDashboard() {
  // Data States
  const [leads, setLeads] = useState<ReferralLead[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(10);

  // Fetch API Data
  useEffect(() => {
    const fetchLeads = async () => {
      try {
        setLoading(true);
        const response = await AccountService.getCompletedReferralLeads();
        const data = Array.isArray(response) ? response : (response.data || []);
        setLeads(data);
      } catch (error) {
        toast.error("Failed to load referral leads");
        console.error(error);
      } finally {
        setLoading(false);
      }
    };
    fetchLeads();
  }, []);

  useEffect(() => {
    setCurrentPage(1);
  }, [searchTerm]);

  // Search Logic
  const normalize = (str: string) => str?.toLowerCase().replace(/[^a-z0-9]/g, "") || "";

  const filteredLeads = useMemo(() => leads.filter(lead => {
    const query = normalize(searchTerm);
    return normalize(lead.lead_name).includes(query) || 
           normalize(lead.contact_number).includes(query) ||
           normalize(lead.dsa_name).includes(query) || 
           normalize(lead.ref_id).includes(query);
  }), [leads, searchTerm]);

  // Pagination Logic
  const totalPages = Math.ceil(filteredLeads.length / itemsPerPage);
  const paginatedData = useMemo(() => {
    const startIndex = (currentPage - 1) * itemsPerPage;
    return filteredLeads.slice(startIndex, startIndex + itemsPerPage);
  }, [filteredLeads, currentPage, itemsPerPage]);

  const downloadExcel = () => {
    const workbook = XLSX.utils.book_new();
    const worksheet = XLSX.utils.json_to_sheet(leads);
    XLSX.utils.book_append_sheet(workbook, worksheet, 'Leads');
    XLSX.writeFile(workbook, `Referral_Leads_${new Date().toISOString().split('T')[0]}.xlsx`);
  };

  return (
    <div className="p-4 md:p-6 bg-gray-50 min-h-screen">
      <div className="max-w-full mx-auto">
        <div className="mb-6 flex justify-between items-end">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">Completed Referral Leads</h1>
            <p className="text-gray-600">Overview of all leads from the system</p>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-sm border overflow-hidden">
          {/* Filters Bar */}
          <div className="p-4 border-b bg-white flex flex-col md:flex-row justify-between items-center gap-4">
            <div className="relative w-full md:w-96">
              <input 
                type="text" 
                value={searchTerm} 
                onChange={(e) => setSearchTerm(e.target.value)} 
                placeholder="Search by name, phone or ID..." 
                className="w-full pl-10 pr-4 py-2 border rounded-lg text-gray-500 bg-gray-50 focus:ring-2 focus:ring-blue-500 focus:bg-white transition-all outline-none" 
              />
              <div className="absolute inset-y-0 left-0 flex items-center pl-3 text-gray-400">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-4.35-4.35M17 11a6 6 0 11-12 0 6 6 0 0112 0z" /></svg>
              </div>
            </div>
            <div className="flex items-center space-x-2 text-sm text-gray-500">
              <span>Rows per page:</span>
              <select 
                value={itemsPerPage} 
                onChange={(e) => setItemsPerPage(Number(e.target.value))} 
                className="border rounded px-2 py-1 outline-none focus:ring-1 focus:ring-blue-500"
              >
                {[5, 10, 25, 50].map(v => <option key={v} value={v}>{v}</option>)}
              </select>
            </div>
          </div>

          {loading ? (
            <div className="flex flex-col items-center justify-center py-20">
              <div className="animate-spin rounded-full h-10 w-10 border-b-2 border-blue-600 mb-4"></div>
              <p className="text-gray-500 font-medium">Fetching referral leads...</p>
            </div>
          ) : (
            <>
              <div className="overflow-x-auto">
                <table className="min-w-full divide-y divide-gray-200">
                  <thead className="bg-gray-50">
                    <tr>
                      {['ID', 'Ref_iD', 'DSA Information', 'Client Details', 'Department', 'Lead Action', 'Created At'].map(h => (
                        <th key={h} className="px-6 py-3 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">{h}</th>
                      ))}
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    {paginatedData.length > 0 ? paginatedData.map(lead => (
                      <tr key={lead.id} className="hover:bg-gray-50 transition-colors">
                        <td className="px-6 py-4 text-sm text-gray-600">{lead.id}</td>
                        <td className="px-6 py-4 text-sm font-mono text-gray-500">{lead.ref_id}</td>
                        <td className="px-6 py-4 text-sm">
                          <div className="flex flex-col">
                              <span className="font-semibold text-gray-800">{lead.dsa_name}</span>
                              <span className="text-xs text-gray-500">{lead.dsa_adv_id}</span>
                          </div>
                        </td>
                        <td className="px-6 py-4 text-sm">
                          <div className="flex flex-col">
                              <span className="font-bold text-gray-900">{lead.lead_name}</span>
                              <span className="text-blue-600">{lead.contact_number}</span>
                          </div>
                        </td>
                        <td className="px-6 py-4 text-sm text-gray-700">{lead.department}</td>
                        <td className="px-6 py-4 text-sm">
                          <span className={`px-2.5 py-1 rounded-full text-[10px] font-bold uppercase border ${statusStyles.completed}`}>
                            COMPLETED
                          </span>
                        </td>
                        <td className="px-6 py-4 text-sm text-gray-600">{formatDate(lead.created_at)}</td>
                      </tr>
                    )) : (
                      <tr>
                        <td colSpan={7} className="px-6 py-10 text-center text-gray-400">No leads found matching your search.</td>
                      </tr>
                    )}
                  </tbody>
                </table>
              </div>

              {/* Pagination Footer */}
              {filteredLeads.length > 0 && (
                <div className="px-6 py-4 bg-gray-50 border-t flex items-center justify-between">
                  <span className="text-sm text-gray-600">
                    Showing <span className="font-semibold">{(currentPage - 1) * itemsPerPage + 1}</span> to <span className="font-semibold">{Math.min(currentPage * itemsPerPage, filteredLeads.length)}</span> of <span className="font-semibold">{filteredLeads.length}</span> entries
                  </span>
                  <div className="flex space-x-2">
                    <button 
                      disabled={currentPage === 1}
                      onClick={() => setCurrentPage(p => p - 1)}
                      className="p-2 border rounded bg-white hover:bg-gray-100 disabled:opacity-50"
                    >
                      <ChevronLeft className="w-4 h-4 text-gray-600" />
                    </button>
                    <div className="flex items-center px-4 text-gray-600 text-sm font-medium">
                      Page {currentPage} of {totalPages}
                    </div>
                    <button 
                      disabled={currentPage === totalPages}
                      onClick={() => setCurrentPage(p => p + 1)}
                      className="p-2 border rounded bg-white hover:bg-gray-100 disabled:opacity-50"
                    >
                      <ChevronRight className="w-4 h-4 text-gray-600" />
                    </button>
                  </div>
                </div>
              )}
            </>
          )}
        </div>
      </div>
    </div>
  );
}