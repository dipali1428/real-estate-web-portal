
'use client';

import React, { useEffect, useMemo, useState } from 'react';
import { Tab } from '@headlessui/react';
import * as XLSX from 'xlsx';
import {
  Search,
  Eye,
  RefreshCw,
  Download,
  X,
  User,
  FileText,
  Clock,
  CheckCircle,
  ChevronsUpDown
} from 'lucide-react';
import { AdminService } from '@/app/services/adminService';
import toast from 'react-hot-toast';

interface Enquiry {
  id: number;
  enquiry_id: string;
  enquiry_type?: string;
  name: string;
  email: string;
  phone: string;
  message: string;
  entry_time: string;
  status: 'Open' | 'Pending' | 'Closed';
  source?: string;
  subject?: string;
  [key: string]: any;
}

interface ApiResponse {
  success: boolean;
  count?: number;
  contactus: any[];
}

type EnquiryKey = 'enquiry_id' | 'enquiry_type' | 'name' | 'email' | 'phone' | 'message' | 'entry_time' | 'status';

function classNames(...classes: string[]) {
  return classes.filter(Boolean).join(' ');
}

const EnquiryAdminPage: React.FC = () => {
  const [enquiries, setEnquiries] = useState<Enquiry[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [searchTerm, setSearchTerm] = useState<string>('');
  const [sortConfig, setSortConfig] = useState<{ key: EnquiryKey; direction: 'asc' | 'desc' } | null>(null);
  const [selectedEnquiry, setSelectedEnquiry] = useState<Enquiry | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isExporting, setIsExporting] = useState(false);
  const [activeTab, setActiveTab] = useState<'All' | 'Pending' | 'Closed'>('All');
  const [totalCount, setTotalCount] = useState<number>(0);
  const [updatingStatus, setUpdatingStatus] = useState<number | null>(null);

  useEffect(() => {
    fetchEnquiries();
  }, []);

  const fetchEnquiries = async () => {
    try {
      setLoading(true);
      setError(null);

      // Use your AdminService function (keeps your original name)
      const response: ApiResponse = await AdminService.contactusData();

      if (response && response.success) {
        const transformed: Enquiry[] = (response.contactus || []).map((item: any, idx: number) => ({
          id: idx + 1,
          enquiry_id: item.enquiry_id || `ENQ-${new Date().getFullYear()}-${(idx + 1).toString().padStart(3, '0')}`,
          enquiry_type: item.enquiry_type || 'General',
          name: item.name || 'Unknown',
          email: item.email || 'N/A',
          phone: item.phone || 'N/A',
          message: item.message || 'No message provided',
          entry_time: item.entry_time || new Date().toISOString(),
          status: (item.status as Enquiry['status']) || 'Pending',
          source: item.source || 'Website',
          subject: item.subject || 'General Inquiry',
          ...item
        }));

        setEnquiries(transformed);
        setTotalCount(response.count ?? transformed.length);
      } else {
        setError('Failed to fetch enquiries from server');
      }
    } catch (err: any) {
      // console.error('Error fetching enquiries:', err);
      setError(err?.message || 'Failed to fetch enquiries. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const refreshData = async () => {
    await fetchEnquiries();
  };

  // Search helper
  const searchEnquiries = (enquiry: Enquiry, term: string) => {
    if (!term.trim()) return true;
    const lower = term.toLowerCase().trim();

    const date = new Date(enquiry.entry_time);
    const searchable = [
      enquiry.enquiry_id,
      enquiry.enquiry_type,
      enquiry.name,
      enquiry.email,
      enquiry.phone,
      enquiry.message,
      enquiry.source,
      enquiry.subject,
      enquiry.status,
      isNaN(date.getTime()) ? '' : date.toLocaleDateString(),
      isNaN(date.getTime()) ? '' : date.toLocaleTimeString(),
      isNaN(date.getTime()) ? '' : date.getFullYear().toString(),
      isNaN(date.getTime()) ? '' : (date.getMonth() + 1).toString(),
      isNaN(date.getTime()) ? '' : date.getDate().toString(),
    ].filter(Boolean) as any[];

    return searchable.some(f => String(f).toLowerCase().includes(lower));
  };

  // Filter by tab + search
  const filteredEnquiries = useMemo(() => {
    return enquiries.filter(e => {
      const matchesTab = activeTab === 'All' || e.status === activeTab;
      const matchesSearch = searchEnquiries(e, searchTerm);
      return matchesTab && matchesSearch;
    });
  }, [enquiries, activeTab, searchTerm]);

  // Sorting
  const sortedEnquiries = useMemo(() => {
    if (!sortConfig) return filteredEnquiries;
    return [...filteredEnquiries].sort((a, b) => {
      let aV: any = a[sortConfig.key];
      let bV: any = b[sortConfig.key];

      if (sortConfig.key === 'entry_time') {
        aV = new Date(aV).getTime();
        bV = new Date(bV).getTime();
      }

      if (aV === undefined || aV === null) aV = '';
      if (bV === undefined || bV === null) bV = '';

      return sortConfig.direction === 'asc'
        ? String(aV).localeCompare(String(bV))
        : String(bV).localeCompare(String(aV));
    });
  }, [filteredEnquiries, sortConfig]);

  const requestSort = (key: EnquiryKey) => {
    let direction: 'asc' | 'desc' = 'asc';
    if (sortConfig && sortConfig.key === key && sortConfig.direction === 'asc') direction = 'desc';
    setSortConfig({ key, direction });
  };

  // Excel export
  const exportToExcel = () => {
    try {
      setIsExporting(true);
      const dataToExport = filteredEnquiries;
      if (dataToExport.length === 0) {
        // alert('No data to export!');
        setIsExporting(false);
        return;
      }

      const excelData = dataToExport.map(enq => ({
        'Enquiry ID': enq.enquiry_id,
        'Subject': enq.subject,
        'Type': enq.enquiry_type,
        'Name': enq.name,
        'Email': enq.email,
        'Phone': enq.phone,
        'Message': enq.message,
        'Status': enq.status,
        'Source': enq.source,
        'Entry Date': new Date(enq.entry_time).toLocaleDateString(),
        'Entry Time': new Date(enq.entry_time).toLocaleTimeString()
      }));

      const ws = XLSX.utils.json_to_sheet(excelData);
      const wb = XLSX.utils.book_new();
      XLSX.utils.book_append_sheet(wb, ws, 'Enquiries');

      const filename = `enquiries_${activeTab.toLowerCase()}_${new Date().toISOString().split('T')[0]}.xlsx`;
      XLSX.writeFile(wb, filename);
    } catch (err) {
      // console.error('Export error', err);
      toast('Failed to export data. Please try again.');
    } finally {
      setIsExporting(false);
    }
  };

  // View details modal
  const viewEnquiryDetails = (enq: Enquiry) => {
    setSelectedEnquiry(enq);
    setIsModalOpen(true);
  };

  // Update status (optimistic)
  const updateStatus = async (id: number, newStatus: Enquiry['status']) => {
    const target = enquiries.find(e => e.id === id);
    if (!target) return;

    const original = target.status;
    try {
      setUpdatingStatus(id);
      // optimistic update
      setEnquiries(prev => prev.map(e => (e.id === id ? { ...e, status: newStatus } : e)));

      // call API - matches your earlier code name
      const res = await AdminService.updateContactStatus(target.enquiry_id, newStatus);
      if (!res?.success) {
        throw new Error(res?.message || 'Update failed on server');
      }
    } catch (err: any) {
      // console.error('Status update failed', err);
      toast('Failed to update status. Please try again.');
      // rollback
      setEnquiries(prev => prev.map(e => (e.id === id ? { ...e, status: original } : e)));
      toast.error(err?.message || 'Failed to update status. Please try again.');
    } finally {
      setUpdatingStatus(null);
    }
  };

  const clearSearch = () => setSearchTerm('');
  const formatDate = (s: string) => {
    try {
      const d = new Date(s);
      if (isNaN(d.getTime())) return 'Invalid Date';
      return d.toLocaleDateString('en-US', { year: 'numeric', month: 'short', day: 'numeric' });
    } catch {
      return 'Invalid Date';
    }
  };
  const formatTime = (s: string) => {
    try {
      const d = new Date(s);
      if (isNaN(d.getTime())) return 'Invalid Time';
      return d.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit', hour12: true });
    } catch {
      return 'Invalid Time';
    }
  };

  const columns: { key?: EnquiryKey; label: string }[] = [
    { key: 'enquiry_id', label: 'Enquiry ID' },
    { key: 'enquiry_type', label: 'Enquiry Type' },
    { key: 'name', label: 'Name' },
    { key: 'email', label: 'Email' },
    { key: 'phone', label: 'Phone' },
    { key: 'message', label: 'Message' },
    { key: 'entry_time', label: 'Entry Time' },
    { key: 'status', label: 'Status' },
    { label: 'Actions' }
  ];

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center p-6">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto" />
          <p className="mt-4 text-gray-600">Loading enquiries...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center p-6">
        <div className="bg-white p-8 rounded-lg shadow-md max-w-md w-full text-center">
          <div className="text-red-500 text-4xl mb-4">⚠️</div>
          <h2 className="text-xl font-bold text-gray-900 mb-2">Error Loading Data</h2>
          <p className="text-gray-600 mb-4">{error}</p>
          <button onClick={refreshData} className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700">
            Retry
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 p-4 md:p-6">
      <div className="max-w-7xl mx-auto">
        <div className="flex justify-between items-start mb-8">
          <div>
            <h1 className="text-2xl md:text-3xl font-bold text-gray-900">Enquiry Management</h1>
            <p className="text-gray-600 mt-2">View and manage all customer enquiries</p>
          </div>

          <div className="flex flex-col sm:flex-row gap-3">
            <button
              onClick={exportToExcel}
              className="inline-flex items-center bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 disabled:opacity-60"
              disabled={isExporting || filteredEnquiries.length === 0}
            >
              <Download className="w-4 h-4 mr-2" />
              Download Excel
            </button>

            <button
              onClick={refreshData}
              className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 flex items-center"
            >
              <RefreshCw className="w-4 h-4 mr-2" />
              Refresh
            </button>
          </div>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-6 mb-8">
          <div className="bg-white rounded-lg shadow p-6">
            <div className="flex items-center">
              <div className="p-2 bg-blue-100 rounded-lg">
                <User className="w-5 h-5 text-blue-600" />
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">Total Enquiries</p>
                <p className="text-2xl font-semibold text-gray-900">{totalCount}</p>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow p-6">
            <div className="flex items-center">
              <div className="p-2 bg-yellow-100 rounded-lg">
                <Clock className="w-5 h-5 text-yellow-600" />
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">Pending</p>
                <p className="text-2xl font-semibold text-gray-900">{enquiries.filter(e => e.status === 'Pending').length}</p>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow p-6">
            <div className="flex items-center">
              <div className="p-2 bg-gray-100 rounded-lg">
                <CheckCircle className="w-5 h-5 text-gray-600" />
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">Closed</p>
                <p className="text-2xl font-semibold text-gray-900">{enquiries.filter(e => e.status === 'Closed').length}</p>
              </div>
            </div>
          </div>
        </div>

        {/* Tabs */}
        <Tab.Group>
          <Tab.List className="flex space-x-1 rounded-xl bg-[#2076C7] p-1 mb-8">
            {(['All', 'Pending', 'Closed'] as const).map(tab => (
              <Tab
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={({ selected }) =>
                  classNames(
                    'w-full rounded-lg py-2.5 text-sm font-medium leading-5',
                    'ring-white ring-opacity-60 ring-offset-2 ring-offset-blue-400 focus:outline-none focus:ring-2',
                    selected ? 'bg-white text-blue-700 shadow' : 'text-blue-100 hover:bg-white/12 hover:text-white'
                  )
                }
              >
                {tab} (
                {tab === 'All' ? enquiries.length : enquiries.filter(e => e.status === tab).length}
                )
              </Tab>
            ))}
          </Tab.List>
        </Tab.Group>

        {/* Search and info */}
        <div className="bg-white rounded-lg shadow p-4 mb-6">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
              <input
                type="text"
                placeholder="Search enquiries by ID, name, email, phone, message, status, or date..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                onKeyDown={(e) => { if (e.key === 'Escape') clearSearch(); }}
                className="w-full pl-10 pr-10 py-2.5 text-gray-700 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
              />
              {searchTerm && (
                <button onClick={clearSearch} className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600">
                  <X className="w-4 h-4" />
                </button>
              )}
            </div>

            <div className="text-sm text-gray-600">
              <div className="flex items-center gap-3">
                <div>
                  Showing <span className="font-bold">{filteredEnquiries.length}</span> of <span className="font-bold">{enquiries.length}</span>
                </div>
                {searchTerm && <div className="px-2 py-1 bg-blue-100 text-blue-800 text-xs rounded-full">{searchTerm}</div>}
                {activeTab !== 'All' && <div className="text-xs text-gray-500 bg-gray-100 px-2 py-1 rounded">Filtered: <span className="font-medium">{activeTab}</span></div>}
              </div>
            </div>
          </div>
        </div>

        {/* Table */}
        <div className="bg-white rounded-lg shadow overflow-hidden">
          <div className="overflow-x-auto scrollbar-x-thin scrollbar-thumb-gray-300 scrollbar-track-transparent md:scrollbar-thumb-gray-400">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  {columns.map(col => (
                    <th key={col.key ?? col.label} className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider whitespace-nowrap">
                      {col.key ? (
                        <button className="flex items-center space-x-1 hover:text-gray-700" onClick={() => col.key && requestSort(col.key)}>
                          <span>{col.label}</span>
                          <ChevronsUpDown className="w-4 h-4" />
                        </button>
                      ) : (
                        col.label
                      )}
                    </th>
                  ))}
                </tr>
              </thead>

              <tbody className="bg-white divide-y divide-gray-200">
                {sortedEnquiries.map(enq => (
                  <tr key={enq.id} className="hover:bg-gray-50 transition-colors duration-150">
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm font-medium text-blue-600">{enq.enquiry_id}</div>
                    </td>

                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm font-medium text-gray-900">{enq.subject || enq.enquiry_type}</div>
                    </td>

                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm font-medium text-gray-900">{enq.name}</div>
                    </td>

                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-900 flex items-center">
                        {/* <Mail className="w-4 h-4 mr-2 text-gray-400" /> */}
                        <span className="truncate max-w-xs">{enq.email}</span>
                      </div>
                    </td>

                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-900 flex items-center">
                        {/* <Phone className="w-4 h-4 mr-2 text-gray-400" /> */}
                        {enq.phone}
                      </div>
                    </td>

                    <td className="px-6 py-4">
                      <div className="text-sm text-gray-900">
                        <div className="truncate max-w-xs" title={enq.message}>{enq.message}</div>
                      </div>
                    </td>

                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-900">{formatDate(enq.entry_time)}</div>
                      <div className="text-sm text-gray-500">{formatTime(enq.entry_time)}</div>
                    </td>

                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className={classNames(
                        'px-3 py-1 rounded-full text-sm font-medium',
                        enq.status === 'Pending' ? 'bg-yellow-100 text-yellow-800' : enq.status === 'Closed' ? 'bg-gray-100 text-gray-800' : 'bg-blue-100 text-blue-800'
                      )}>
                        {enq.status}
                      </span>
                    </td>

                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                      <div className="flex items-center space-x-3">
                        <button onClick={() => viewEnquiryDetails(enq)} className="text-blue-600 hover:text-blue-900" title="View Details">
                          <Eye className="w-5 h-5" />
                        </button>

                        <select
                          value={enq.status}
                          onChange={(e) => updateStatus(enq.id, e.target.value as Enquiry['status'])}
                          className="text-gray-700 border border-gray-300 rounded px-2 py-1 focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                          disabled={updatingStatus === enq.id}
                          title="Change status"
                        >
                          <option value="Open">Open</option>
                          <option value="Pending">Pending</option>
                          <option value="Closed">Closed</option>
                        </select>

                        {updatingStatus === enq.id && <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-blue-600" />}
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {sortedEnquiries.length === 0 && (
            <div className="text-center py-12">
              <FileText className="h-12 w-12 text-gray-400 mx-auto mb-4" />
              <p className="text-gray-500">
                {searchTerm ? `No enquiries found for "${searchTerm}" in ${activeTab === 'All' ? 'all enquiries' : activeTab.toLowerCase() + ' enquiries'}` : `No ${activeTab === 'All' ? 'enquiries' : activeTab.toLowerCase() + ' enquiries'} found`}
              </p>
              {searchTerm && <button onClick={clearSearch} className="mt-2 text-blue-600 hover:text-blue-800 text-sm">Clear search</button>}
            </div>
          )}

          {/* Simple pagination placeholder */}
          {sortedEnquiries.length > 0 && (
            <div className="px-6 py-4 border-t border-gray-200 flex items-center justify-between">
              <div className="text-sm text-gray-700">Showing <span className="font-medium">{sortedEnquiries.length}</span> enquiries</div>
              <div className="flex space-x-2">
                <button className="px-3 py-1 border border-gray-300 rounded text-gray-700 hover:bg-gray-50">Previous</button>
                <button className="px-3 py-1 border border-gray-300 rounded text-gray-700 bg-blue-50 text-blue-600">1</button>
                <button className="px-3 py-1 border border-gray-300 rounded text-gray-700 hover:bg-gray-50">Next</button>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Modal */}
      {isModalOpen && selectedEnquiry && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-lg shadow-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            <div className="p-6 text-gray-700">
              <div className="flex justify-between items-start mb-6">
                <div>
                  <h2 className="text-xl font-bold text-gray-900">Enquiry Details</h2>
                  <p className="text-blue-600 font-medium">{selectedEnquiry.enquiry_id}</p>
                </div>
                <button onClick={() => setIsModalOpen(false)} className="text-gray-400 hover:text-gray-600">
                  <X className="h-6 w-6" />
                </button>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Customer Information</label>
                    <div className="bg-gray-50 p-4 rounded-lg">
                      <p className="font-medium">{selectedEnquiry.name}</p>
                      <p className="text-sm text-gray-600 mt-1">{selectedEnquiry.email}</p>
                      <p className="text-sm text-gray-600">{selectedEnquiry.phone}</p>
                      <p className="text-sm text-gray-600 mt-2"><span className="font-medium">Enquiry Type:</span> {selectedEnquiry.enquiry_type}</p>
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Entry Details</label>
                    <div className="bg-gray-50 p-4 rounded-lg">
                      <p className="text-sm"><span className="font-medium">Date:</span> {formatDate(selectedEnquiry.entry_time)}</p>
                      <p className="text-sm"><span className="font-medium">Time:</span> {formatTime(selectedEnquiry.entry_time)}</p>
                      {selectedEnquiry.source && <p className="text-sm"><span className="font-medium">Source:</span> {selectedEnquiry.source}</p>}
                    </div>
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Message</label>
                  <div className="bg-gray-50 p-4 rounded-lg h-full">
                    <p className="whitespace-pre-line text-gray-700">{selectedEnquiry.message}</p>
                  </div>
                </div>
              </div>

              <div className="border-t pt-6">
                <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between">
                  <div className="mb-4 sm:mb-0">
                    <label className="block text-sm font-medium text-gray-700 mb-2">Current Status</label>
                    <span className={classNames(
                      'px-3 py-1 rounded-full text-sm font-medium',
                      selectedEnquiry.status === 'Pending' ? 'bg-yellow-100 text-yellow-800' : selectedEnquiry.status === 'Closed' ? 'bg-gray-100 text-gray-800' : 'bg-blue-100 text-blue-800'
                    )}>
                      {selectedEnquiry.status}
                    </span>
                  </div>

                  <div className="flex space-x-3">
                    <button onClick={() => setIsModalOpen(false)} className="px-4 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50">Close</button>
                    <button className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700">Send Response</button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default EnquiryAdminPage;
