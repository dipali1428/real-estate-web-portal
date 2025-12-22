"use client";
import { FC, useState, useMemo, useEffect } from "react";
import { DashboardService } from "@/app/services/dashboardService"; // Adjust path as needed

// 1. Interface for the UI
export interface Lead {
  id: string;
  refId: string;
  clientName: string;
  clientType: string;
  contactNumber: string;
  email: string;
  product: string; // Maps to Department
  subCategory: string; // Maps to Sub Category
  notes: string;
  status: 'new' | 'contacted' | 'follow-up' | 'document-review' | 'converted' | 'lost';
  assignedTo: string;
  createdDate: string;
  createdTime: string;
}

// 2. Interface for the API Response
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
  // 🔹 Tab State: 'referral' or 'detailed'
  const [activeTab, setActiveTab] = useState<'referral' | 'detailed'>('referral');

  const [data, setData] = useState<Lead[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(5);

  // 🔹 Reset filters/page when Tab changes
  useEffect(() => {
    setSearchTerm("");
    setStatusFilter("");
    setCurrentPage(1);
    setData([]); // Clear old data before fetching new
  }, [activeTab]);

  // 🔹 Fetch Data based on Active Tab
  useEffect(() => {
    const fetchLeads = async () => {
      try {
        setLoading(true);
        let response;

        if (activeTab === 'referral') {
          response = await DashboardService.getLeads();
        } else {
          // 🚧 FUTURE INTEGRATION: Fetch Detailed Leads
          console.log("Fetching detailed leads...");
          response = { success: true, data: [] };
        }

        if (response.success && Array.isArray(response.data)) {
          const mappedLeads: Lead[] = response.data.map((item: ApiLead) => {
            const dateObj = new Date(item.created_at);
            const dateStr = dateObj.toLocaleDateString("en-US", {
              month: "short", day: "numeric", year: "numeric"
            });
            const timeStr = dateObj.toLocaleTimeString("en-US", {
              hour: "2-digit", minute: "2-digit"
            });

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
              assignedTo: "Not Assigned",
              createdDate: dateStr,
              createdTime: timeStr,
            };
          });
          setData(mappedLeads);
        }
      } catch (error) {
        console.error(`Failed to fetch ${activeTab} leads:`, error);
      } finally {
        setLoading(false);
      }
    };

    fetchLeads();
  }, [activeTab]);

  // Filter leads logic
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

  // Pagination logic
  const totalPages = Math.ceil(filteredLeads.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const currentLeads = filteredLeads.slice(startIndex, endIndex);

  useEffect(() => {
    setCurrentPage(1);
  }, [searchTerm, statusFilter]);

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

    return (
      <span className={`inline-flex px-2 py-1 text-xs rounded-full ${config.bg} ${config.text}`}>
        {config.label}
      </span>
    );
  };

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  const generatePageNumbers = () => {
    const pages = [];
    const maxVisiblePages = 5;

    if (totalPages <= maxVisiblePages) {
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

      {/* 🔹 TABS NAVIGATION */}
      <div className="mb-6 border-b border-gray-200">
        <div className="flex space-x-8">
          <button
            onClick={() => setActiveTab('referral')}
            className={`pb-2 text-sm font-medium transition-colors border-b-2 ${activeTab === 'referral'
                ? 'border-blue-600 text-blue-600'
                : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
              }`}
          >
            Referral Leads
          </button>
          <button
            onClick={() => setActiveTab('detailed')}
            className={`pb-2 text-sm font-medium transition-colors border-b-2 ${activeTab === 'detailed'
                ? 'border-blue-600 text-blue-600'
                : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
              }`}
          >
            Detailed Leads
          </button>
        </div>
      </div>

      {/* Table Header with Controls */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-4 gap-3">
        <h3 className="text-lg sm:text-xl font-semibold text-gray-700">
          {activeTab === 'referral' ? 'Referral Leads' : 'Detailed Leads'}
          {loading && <span className="ml-2 text-sm text-gray-400 font-normal">(Loading...)</span>}
        </h3>

        {/* Table Controls */}
        <div className="flex flex-col sm:flex-row gap-3 w-full sm:w-auto">
          {/* Search Input */}
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

          {/* Filter Dropdown */}
          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm text-gray-700"
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

      {/* Table */}
      <div className="overflow-x-auto bg-white shadow-md rounded-lg">
        {loading ? (
          <div className="p-8 text-center text-gray-500">Loading {activeTab} data...</div>
        ) : (
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th scope="col" className="px-4 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider whitespace-nowrap">
                  Lead ID
                </th>

                {/* 🔹 Ref ID: Only shown in Referral Tab */}
                {activeTab === 'referral' && (
                  <th scope="col" className="px-4 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider whitespace-nowrap">
                    Ref ID
                  </th>
                )}

                <th scope="col" className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider whitespace-nowrap">
                  Client Name
                </th>
                <th scope="col" className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider whitespace-nowrap">
                  Contact Info
                </th>
                <th scope="col" className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider whitespace-nowrap">
                  Department
                </th>
                <th scope="col" className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider whitespace-nowrap">
                  Product
                </th>
                <th scope="col" className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider whitespace-nowrap">
                  Notes
                </th>
                <th scope="col" className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider whitespace-nowrap">
                  Status
                </th>
                <th scope="col" className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider whitespace-nowrap">
                  Assigned To
                </th>
                <th scope="col" className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider whitespace-nowrap">
                  Created
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {currentLeads.length > 0 ? (
                currentLeads.map((lead) => (
                  <tr key={lead.id} className="hover:bg-gray-50 transition-colors">
                    <td className="px-4 py-4 whitespace-nowrap text-center">
                      <div className="text-sm font-medium text-blue-600">{lead.id}</div>
                    </td>

                    {/* 🔹 Ref ID Data: Only shown in Referral Tab */}
                    {activeTab === 'referral' && (
                      <td className="px-4 py-4 whitespace-nowrap text-center">
                        <div className="text-sm text-gray-600">{lead.refId}</div>
                      </td>
                    )}

                    <td className="px-4 py-4 whitespace-nowrap">
                      <div>
                        <div className="text-sm font-medium text-gray-900">{lead.clientName}</div>
                        <div className="text-sm text-gray-500">{lead.clientType}</div>
                      </div>
                    </td>
                    <td className="px-4 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-900">{lead.contactNumber}</div>
                      <div className="text-sm text-gray-500">{lead.email}</div>
                    </td>
                    <td className="px-4 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-900">{lead.product}</div>
                    </td>
                    <td className="px-4 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-500">{lead.subCategory}</div>
                    </td>
                    <td className="px-4 py-4">
                      <div className="min-w-40 text-sm text-gray-500 max-w-xs whitespace-normal break-words" title={lead.notes}>
                        {lead.notes}
                      </div>
                    </td>
                    <td className="px-4 py-4 whitespace-nowrap">
                      {getStatusBadge(lead.status)}
                    </td>
                    <td className="px-4 py-4 whitespace-nowrap text-sm text-gray-500 italic">
                      {lead.assignedTo}
                    </td>
                    <td className="px-4 py-4 whitespace-nowrap">
                      <div className="flex flex-col">
                        <span className="text-sm text-gray-900">{lead.createdDate}</span>
                        <span className="text-xs text-gray-500">{lead.createdTime}</span>
                      </div>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  {/* Dynamic ColSpan based on visible columns */}
                  <td colSpan={activeTab === 'referral' ? 10 : 9} className="px-4 py-8 text-center text-gray-500">
                    {activeTab === 'detailed'
                      ? "No detailed leads found matching your criteria."
                      : "No referral leads found matching your criteria."}
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        )}
      </div>

      {/* Pagination */}
      {!loading && filteredLeads.length > 0 && (
        <div className="flex items-center justify-between border-t border-gray-200 bg-white px-4 py-3 sm:px-6 mt-4 rounded-b-lg">
          <div className="flex flex-1 justify-between sm:hidden">
            <button
              onClick={() => handlePageChange(currentPage - 1)}
              disabled={currentPage === 1}
              className={`relative inline-flex items-center rounded-md border border-gray-300 px-4 py-2 text-sm font-medium ${currentPage === 1 ? 'bg-gray-100 text-gray-400 cursor-not-allowed' : 'bg-white text-gray-700 hover:bg-gray-50'
                }`}
            >
              Previous
            </button>
            <button
              onClick={() => handlePageChange(currentPage + 1)}
              disabled={currentPage === totalPages}
              className={`relative ml-3 inline-flex items-center rounded-md border border-gray-300 px-4 py-2 text-sm font-medium ${currentPage === totalPages ? 'bg-gray-100 text-gray-400 cursor-not-allowed' : 'bg-white text-gray-700 hover:bg-gray-50'
                }`}
            >
              Next
            </button>
          </div>

          <div className="hidden sm:flex sm:flex-1 sm:items-center sm:justify-between">
            <div>
              <p className="text-sm text-gray-700">
                Showing <span className="font-medium">{startIndex + 1}</span> to{' '}
                <span className="font-medium">{Math.min(endIndex, filteredLeads.length)}</span> of{' '}
                <span className="font-medium">{filteredLeads.length}</span> results
              </p>
            </div>

            <div>
              <nav className="isolate inline-flex -space-x-px rounded-md shadow-sm" aria-label="Pagination">
                <button
                  onClick={() => handlePageChange(currentPage - 1)}
                  disabled={currentPage === 1}
                  className={`relative inline-flex items-center rounded-l-md px-2 py-2 text-gray-400 ring-1 ring-inset ring-gray-300 focus:z-20 focus:outline-offset-0 ${currentPage === 1 ? 'cursor-not-allowed' : 'hover:bg-gray-50'
                    }`}
                >
                  <span className="sr-only">Previous</span>
                  <svg className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                    <path fillRule="evenodd" d="M12.79 5.23a.75.75 0 01-.02 1.06L8.832 10l3.938 3.71a.75.75 0 11-1.04 1.08l-4.5-4.25a.75.75 0 010-1.08l4.5-4.25a.75.75 0 011.06.02z" clipRule="evenodd" />
                  </svg>
                </button>

                {generatePageNumbers().map((page, index) => (
                  <button
                    key={index}
                    onClick={() => typeof page === 'number' && handlePageChange(page)}
                    className={`relative inline-flex items-center px-4 py-2 text-sm font-semibold ${page === currentPage
                        ? 'z-10 bg-blue-600 text-white focus:z-20 focus-visible:outline focus-visible:outline-offset-2 focus-visible:outline-blue-600'
                        : page === '...'
                          ? 'text-gray-700 ring-1 ring-inset ring-gray-300 focus:outline-offset-0 cursor-default'
                          : 'text-gray-900 ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus:z-20 focus:outline-offset-0'
                      }`}
                    disabled={page === '...'}
                  >
                    {page}
                  </button>
                ))}

                <button
                  onClick={() => handlePageChange(currentPage + 1)}
                  disabled={currentPage === totalPages}
                  className={`relative inline-flex items-center rounded-r-md px-2 py-2 text-gray-400 ring-1 ring-inset ring-gray-300 focus:z-20 focus:outline-offset-0 ${currentPage === totalPages ? 'cursor-not-allowed' : 'hover:bg-gray-50'
                    }`}
                >
                  <span className="sr-only">Next</span>
                  <svg className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                    <path fillRule="evenodd" d="M7.21 14.77a.75.75 0 01.02-1.06L11.168 10 7.23 6.29a.75.75 0 111.04-1.08l4.5 4.25a.75.75 0 010 1.08l-4.5 4.25a.75.75 0 01-1.06-.02z" clipRule="evenodd" />
                  </svg>
                </button>
              </nav>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default LeadTable;