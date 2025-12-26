"use client";
import { FC, useState, useMemo, useEffect } from "react";
import { DashboardService } from "@/app/services/dashboardService";

export interface Lead {
  id: string;
  refId: string;
  clientName: string;
  clientType: string;
  contactNumber: string;
  email: string;
  product: string;
  subCategory: string;
  notes: string;
  status: 'new' | 'contacted' | 'follow-up' | 'document-review' | 'converted' | 'lost';
  createdDate: string;
  createdTime: string;
}

interface ApiLead {
  id: number;
  ref_id: string;
  lead_name: string;
  contact_number: string;
  email: string;
  department: string;
  sub_category: string;
  notes: string;
  status: string;
  created_at: string;
}

interface LeadTableProps {
  onEdit?: (lead: Lead) => void;
  onDelete?: (lead: Lead) => void;
}

const LeadTable: FC<LeadTableProps> = ({ onEdit, onDelete }) => {
  const [activeTab, setActiveTab] = useState<'referral' | 'detailed'>('referral');
  const [data, setData] = useState<Lead[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(5); // Default to 10

  useEffect(() => {
    setSearchTerm("");
    setStatusFilter("");
    setCurrentPage(1);
    setData([]);
  }, [activeTab]);

  useEffect(() => {
    // Inside LeadTable.tsx -> fetchLeads function
    const fetchLeads = async () => {
      try {
        setLoading(true);
        let response;

        if (activeTab === 'referral') {
          response = await DashboardService.getLeads();
        } else {
          response = { success: true, data: [] };
        }

        // Safely check if response and response.data exist
        if (response && response.success && Array.isArray(response.data)) {
          const mappedLeads: Lead[] = response.data.map((item: ApiLead) => {
            const dateObj = new Date(item.created_at);
            return {
              id: item.id.toString(),
              refId: item.ref_id || "-",
              clientName: item.lead_name || "N/A",
              clientType: activeTab === 'referral' ? "Referral" : "Detailed",
              contactNumber: item.contact_number || "N/A",
              email: item.email || "N/A",
              product: item.department || "General",
              subCategory: item.sub_category || "-",
              notes: item.notes || "-",
              status: (['new', 'contacted', 'follow-up', 'document-review', 'converted', 'lost'].includes(item.status)
                ? item.status
                : 'new') as Lead['status'],
              createdDate: isNaN(dateObj.getTime()) ? "N/A" : dateObj.toLocaleDateString(),
              createdTime: isNaN(dateObj.getTime()) ? "" : dateObj.toLocaleTimeString(),
            };
          });
          setData(mappedLeads);
        } else {
          setData([]); // Fallback to empty data if API fails
        }
      } catch (error) {
        console.error(`Failed to fetch ${activeTab} leads:`, error);
        setData([]);
      } finally {
        setLoading(false);
      }
    };
    fetchLeads();
  }, [activeTab]);

  const filteredLeads = useMemo(() => {
    return data.filter(lead => {
      const matchesSearch =
        lead.clientName.toLowerCase().includes(searchTerm.toLowerCase()) ||
        lead.refId.toLowerCase().includes(searchTerm.toLowerCase()) ||
        lead.contactNumber.includes(searchTerm) ||
        lead.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
        lead.product.toLowerCase().includes(searchTerm.toLowerCase()) ||
        lead.subCategory.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesStatus = statusFilter === "" || lead.status === statusFilter;
      return matchesSearch && matchesStatus;
    });
  }, [data, searchTerm, statusFilter]);

  const totalPages = Math.ceil(filteredLeads.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const currentLeads = filteredLeads.slice(startIndex, endIndex);

  useEffect(() => {
    setCurrentPage(1);
  }, [searchTerm, statusFilter, itemsPerPage]);

  const getStatusBadge = (status: Lead['status']) => {
    const statusConfig = {
      new: { bg: 'bg-gray-100', text: 'text-gray-800', label: 'New' },
      contacted: { bg: 'bg-blue-100', text: 'text-blue-800', label: 'Contacted' },
      'follow-up': { bg: 'bg-yellow-100', text: 'text-yellow-800', label: 'Follow-up' },
      'document-review': { bg: 'bg-purple-100', text: 'text-purple-800', label: 'Document Review' },
      converted: { bg: 'bg-green-100', text: 'text-green-800', label: 'Converted' },
      lost: { bg: 'bg-red-100', text: 'text-red-800', label: 'Lost' }
    };
    const config = statusConfig[status] || statusConfig['new'];
    return <span className={`inline-flex px-2 py-1 text-xs rounded-full ${config.bg} ${config.text}`}>{config.label}</span>;
  };

  const handlePageChange = (page: number) => setCurrentPage(page);

  const generatePageNumbers = () => {
    const pages = [];
    if (totalPages <= 5) {
      for (let i = 1; i <= totalPages; i++) pages.push(i);
    } else {
      pages.push(1);
      let start = Math.max(2, currentPage - 1);
      let end = Math.min(totalPages - 1, currentPage + 1);
      if (currentPage <= 2) end = 4;
      if (currentPage >= totalPages - 1) start = totalPages - 3;
      if (start > 2) pages.push('...');
      for (let i = start; i <= end; i++) pages.push(i);
      if (end < totalPages - 1) pages.push('...');
      pages.push(totalPages);
    }
    return pages;
  };

  return (
    <div className="w-full mt-8">
      {/* TABS NAVIGATION */}
      <div className="mb-6 border-b border-gray-200">
        <div className="flex space-x-8">
          {['referral', 'detailed'].map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab as any)}
              className={`pb-2 text-sm font-medium transition-colors border-b-2 capitalize ${activeTab === tab ? 'border-blue-600 text-blue-600' : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'}`}
            >
              {tab} Leads
            </button>
          ))}
        </div>
      </div>

      {/* Table Header with Controls */}
      <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center mb-4 gap-4">
        <h3 className="text-lg font-semibold text-gray-700">
          {activeTab === 'referral' ? 'Referral Leads' : 'Detailed Leads'}
          {loading && <span className="ml-2 text-sm text-gray-400 font-normal">(Loading...)</span>}
        </h3>

        <div className="flex flex-wrap items-center gap-3 w-full lg:w-auto">
          {/* Max Rows Selector */}
          <div className="flex items-center gap-2 bg-white border border-gray-300 rounded-lg px-3 py-2">
            <span className="text-xs font-medium text-gray-500 uppercase">Show</span>
            <select
              value={itemsPerPage}
              onChange={(e) => setItemsPerPage(Number(e.target.value))}
              className="text-sm text-gray-700 focus:outline-none bg-transparent"
            >
              <option value={5}>5</option>
              <option value={10}>10</option>
              <option value={25}>25</option>
              <option value={50}>50</option>
            </select>
          </div>

          {/* Search */}
          <div className="relative">
            <input
              type="text"
              placeholder={`Search ${activeTab} leads...`}
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent w-full sm:w-64 text-sm text-gray-700"
            />
            <svg
              className="absolute left-3 top-2.5 h-4 w-4 text-gray-400"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
          </div>

          {/* Status Filter */}
          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none text-sm text-gray-700 focus:ring-2 focus:ring-blue-500"
          >
            <option value="">All Status</option>
            <option value="new">New</option>
            <option value="contacted">Contacted</option>
            <option value="follow-up">Follow-up</option>
            <option value="document-review">Document Review</option>
            <option value="converted">Converted</option>
            <option value="lost">Lost</option>
          </select>
        </div>
      </div>

      {/* Table Content */}
      <div className="overflow-x-auto bg-white shadow-md rounded-lg border border-gray-200">
        {loading ? (
          <div className="p-12 text-center text-gray-500">Loading {activeTab} data...</div>
        ) : (
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-4 py-3 text-center text-xs font-bold text-gray-500 uppercase">ID</th>
                {activeTab === 'referral' && <th className="px-4 py-3 text-center text-xs font-bold text-gray-500 uppercase">Ref ID</th>}
                <th className="px-4 py-3 text-left text-xs font-bold text-gray-500 uppercase">Client</th>
                <th className="px-4 py-3 text-left text-xs font-bold text-gray-500 uppercase">Contact</th>
                <th className="px-4 py-3 text-left text-xs font-bold text-gray-500 uppercase">Dept</th>
                <th className="px-4 py-3 text-left text-xs font-bold text-gray-500 uppercase">Product</th>
                <th className="px-4 py-3 text-left text-xs font-bold text-gray-500 uppercase">Notes</th>
                <th className="px-4 py-3 text-left text-xs font-bold text-gray-500 uppercase">Status</th>
                <th className="px-4 py-3 text-left text-xs font-bold text-gray-500 uppercase">Created</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {currentLeads.length > 0 ? (
                currentLeads.map((lead) => (
                  <tr key={lead.id} className="hover:bg-gray-50 transition-colors">
                    <td className="px-4 py-4 text-center text-sm font-medium text-blue-600">{lead.id}</td>
                    {activeTab === 'referral' && <td className="px-4 py-4 text-center text-sm text-gray-600">{lead.refId}</td>}
                    <td className="px-4 py-4 text-sm">
                      <div className="text-gray-900">{lead.clientName}</div>
                      <div className="text-gray-500 text-xs">{lead.clientType}</div>
                    </td>
                    <td className="px-4 py-4 text-sm text-gray-600">
                      <div>{lead.contactNumber}</div>
                      <div className="text-xs text-gray-700">{lead.email}</div>
                    </td>
                    <td className="px-4 py-4 text-sm text-gray-900">{lead.product}</td>
                    <td className="px-4 py-4 text-sm text-gray-700">{lead.subCategory}</td>
                    <td className="px-4 py-4 text-sm text-gray-700 max-w-xs truncate" title={lead.notes}>{lead.notes}</td>
                    <td className="px-4 py-4">{getStatusBadge(lead.status)}</td>
                    <td className="px-4 py-4 text-xs text-gray-700">
                      <div>{lead.createdDate}</div>
                      <div>{lead.createdTime}</div>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={activeTab === 'referral' ? 9 : 8} className="px-4 py-12 text-center text-gray-400">
                    No leads found matching your criteria.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        )}
      </div>

      {/* Pagination */}
      {!loading && filteredLeads.length > 0 && (
        <div className="flex items-center justify-between border-t border-gray-200 bg-white px-4 py-4 mt-4 rounded-lg shadow-sm">
          <div className="text-sm text-gray-700">
            Showing <span className="font-bold">{startIndex + 1}</span> to <span>{Math.min(endIndex, filteredLeads.length)}</span> of <span className="font-bold">{filteredLeads.length}</span> results
          </div>
          <nav className="inline-flex -space-x-px rounded-md shadow-sm">
            <button
              disabled={currentPage === 1}
              onClick={() => handlePageChange(currentPage - 1)}
              className="px-2 py-2 text-gray-700 ring-1 ring-inset ring-gray-300 hover:bg-gray-50 disabled:opacity-50 rounded-l-md"
            >
              Prev
            </button>
            {generatePageNumbers().map((page, idx) => (
              <button
                key={idx}
                onClick={() => typeof page === 'number' && handlePageChange(page)}
                className={`px-4 py-2 text-sm border ${page === currentPage ? 'bg-blue-600 text-white border-blue-600' : 'text-gray-900 border-gray-300 hover:bg-gray-50'}`}
                disabled={page === '...'}
              >
                {page}
              </button>
            ))}
            <button
              disabled={currentPage === totalPages}
              onClick={() => handlePageChange(currentPage + 1)}
              className="px-2 py-2 text-gray-700 ring-1 ring-inset ring-gray-300 hover:bg-gray-50 disabled:opacity-50 rounded-r-md"
            >
              Next
            </button>
          </nav>
        </div>
      )}
    </div>
  );
};

export default LeadTable;