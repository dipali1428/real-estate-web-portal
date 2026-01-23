'use client';

import React, { useEffect, useMemo, useState } from 'react';
import { Search, RefreshCw, Download, Eye, Clock, AlertCircle, Layers, CheckCircle } from 'lucide-react';
import { AdminService } from '@/app/services/adminService';
import toast from 'react-hot-toast';
import * as XLSX from 'xlsx';

interface CIBILRequest {
  id: number;
  request_id: number;
  full_name: string;
  email: string;
  mobile: string;
  pan: string;
  dob: string;
  cibil_score: number | null;
  status: 'SCORE_PENDING' | 'SCORE_RECEIVED' | 'FAILED';
  created_at: string;
}

const CIBILPage = () => {
  const [allRequests, setAllRequests] = useState<CIBILRequest[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [selectedRequest, setSelectedRequest] = useState<CIBILRequest | null>(null);
  const [showModal, setShowModal] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(5); // Default changed to 5

  const fetchCIBILRequests = async () => {
    setLoading(true);
    try {
      const response = await AdminService.getCIBILRequests();
      const requests = response.cibil || [];
      setAllRequests(requests);
    } catch (error: any) {
      console.error('Error fetching CIBIL requests:', error);
      toast.error('Failed to fetch CIBIL requests');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCIBILRequests();
  }, []);

  const availableStatuses = useMemo(() => {
    const statuses = allRequests.map(r => r.status);
    return Array.from(new Set(statuses));
  }, [allRequests]);

  const stats = useMemo(() => ({
    total: allRequests.length,
    pending: allRequests.filter(r => r.status === 'SCORE_PENDING').length,
    received: allRequests.filter(r => r.status === 'SCORE_RECEIVED').length,
    failed: allRequests.filter(r => r.status === 'FAILED').length,
  }), [allRequests]);

  const filteredRequests = useMemo(() => {
    let result = [...allRequests];
    if (statusFilter !== 'all') {
      result = result.filter(r => r.status === statusFilter);
    }
    if (searchTerm) {
      const term = searchTerm.toLowerCase();
      result = result.filter(r =>
        r.full_name.toLowerCase().includes(term) ||
        r.email.toLowerCase().includes(term) ||
        r.mobile.includes(term) ||
        r.pan.toLowerCase().includes(term)
      );
    }
    return result.sort((a, b) => new Date(b.created_at).getTime() - new Date(a.created_at).getTime());
  }, [allRequests, searchTerm, statusFilter]);

  const totalPages = Math.ceil(filteredRequests.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const currentPageRequests = filteredRequests.slice(startIndex, startIndex + itemsPerPage);

  const handleExport = () => {
    const exportData = filteredRequests.map(r => ({
      'ID': r.id,
      'Request ID': r.request_id,
      'Full Name': r.full_name,
      'Email': r.email,
      'Mobile': r.mobile,
      'PAN': r.pan,
      'DOB': new Date(r.dob).toLocaleDateString('en-GB'),
      'CIBIL Score': r.cibil_score || 'Pending',
      'Status': r.status,
      'Created At': new Date(r.created_at).toLocaleString('en-GB'),
    }));

    const worksheet = XLSX.utils.json_to_sheet(exportData);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, 'CIBIL Requests');
    XLSX.writeFile(workbook, 'cibil_requests.xlsx');
    toast.success('Data exported successfully');
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'SCORE_PENDING': return 'bg-yellow-100 text-yellow-800';
      case 'SCORE_RECEIVED': return 'bg-green-100 text-green-800';
      case 'FAILED': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="bg-gray-50 p-4 md:p-6">
      <div className="max-w-full mx-auto">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">CIBIL Score Requests</h1>
          <p className="text-gray-600">Manage and track CIBIL score check requests</p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
          <StatsCard label="Total Requests" value={stats.total} icon={<Layers className="w-5 h-5 text-blue-600" />} />
          <StatsCard label="Score Pending" value={stats.pending} icon={<Clock className="w-5 h-5 text-yellow-600" />} />
          <StatsCard label="Score Received" value={stats.received} icon={<CheckCircle className="w-5 h-5 text-green-600" />} />
          <StatsCard label="Failed" value={stats.failed} icon={<AlertCircle className="w-5 h-5 text-red-600" />} />
        </div>

        <div className="bg-white rounded-lg shadow-sm p-4 md:p-6 mb-6">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <div className="relative">
              <Search className="absolute left-3 top-3 w-5 h-5 text-gray-700" />
              <input
                type="text"
                placeholder="Search..."
                value={searchTerm}
                onChange={(e) => { setSearchTerm(e.target.value); setCurrentPage(1); }}
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none text-gray-700"
              />
            </div>

            <select
              value={statusFilter}
              onChange={(e) => { setStatusFilter(e.target.value); setCurrentPage(1); }}
              className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none text-gray-700 capitalize"
            >
              <option value="all">All Status</option>
              {availableStatuses.map((status) => (
                <option key={status} value={status}>
                  {status.replace('_', ' ').toLowerCase()}
                </option>
              ))}
            </select>

            {/* Smaller Page Selector */}
            <div className="flex items-center gap-2">
              <span className="text-sm text-gray-600 whitespace-nowrap">Show:</span>
              <select
                value={itemsPerPage}
                onChange={(e) => { setItemsPerPage(Number(e.target.value)); setCurrentPage(1); }}
                className="w-20 px-2 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none text-gray-700"
              >
                <option value={5}>5</option>
                <option value={10}>10</option>
                <option value={20}>20</option>
                <option value={50}>50</option>
              </select>
            </div>

            <div className="flex gap-2">
              <button onClick={fetchCIBILRequests} className="flex-1 flex items-center justify-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition">
                <RefreshCw className="w-4 h-4" /> Refresh
              </button>
              <button onClick={handleExport} className="flex-1 flex items-center justify-center gap-2 px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition">
                <Download className="w-4 h-4" /> Export
              </button>
            </div>
          </div>
        </div>

        {loading ? (
          <div className="bg-white rounded-lg shadow-sm p-8 text-center">
            <div className="inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
          </div>
        ) : (
          <>
            <div className="bg-white rounded-lg shadow-sm overflow-x-auto scrollbar-x-thin scrollbar-thumb-gray-300 scrollbar-track-transparent md:scrollbar-thumb-gray-400">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-gray-200 bg-gray-50">
                    <th className="px-6 py-3 text-left text-sm font-semibold text-gray-700">ID</th>
                    <th className="px-6 py-3 text-left text-sm font-semibold text-gray-700">Req ID</th>
                    <th className="px-6 py-3 text-left text-sm font-semibold text-gray-700">Full Name</th>
                    <th className="px-6 py-3 text-left text-sm font-semibold text-gray-700">Contact</th>
                    <th className="px-6 py-3 text-left text-sm font-semibold text-gray-700">PAN</th>
                    <th className="px-6 py-3 text-left text-sm font-semibold text-gray-700">DOB</th>
                    <th className="px-6 py-3 text-left text-sm font-semibold text-gray-700">Score</th>
                    <th className="px-6 py-3 text-left text-sm font-semibold text-gray-700">Status</th>
                    <th className="px-6 py-3 text-left text-sm font-semibold text-gray-700">Date</th>
                    <th className="px-6 py-3 text-left text-sm font-semibold text-gray-700">Action</th>
                  </tr>
                </thead>
                <tbody>
                  {currentPageRequests.map((request) => (
                    <tr key={request.id} className="border-b border-gray-200 hover:bg-gray-50 transition">
                      <td className="px-6 py-4 text-sm text-gray-500">{request.id}</td>
                      <td className="px-6 py-4 text-sm font-medium text-gray-900">#{request.request_id}</td>
                      <td className="px-6 py-4 text-sm text-gray-700">{request.full_name}</td>
                      <td className="px-6 py-4 text-sm text-gray-700">
                        <div className="font-medium">{request.email}</div>
                        <div className="text-xs text-gray-500">{request.mobile}</div>
                      </td>
                      <td className="px-6 py-4 text-sm text-gray-700 uppercase font-mono">{request.pan}</td>
                      <td className="px-6 py-4 text-sm text-gray-700">{new Date(request.dob).toLocaleDateString('en-GB')}</td>
                      <td className="px-6 py-4 text-sm font-semibold text-gray-900">{request.cibil_score || '-'}</td>
                      <td className="px-6 py-4 text-sm">
                        <span className={`inline-flex items-center gap-1 px-3 py-1 rounded-full text-sm font-medium ${getStatusColor(request.status)}`}>
                          {/* {getStatusIcon(request.status)} */}
                          {request.status.replace('_', ' ')}
                        </span>
                      </td>
                      <td className="px-6 py-4 text-sm text-gray-700">{new Date(request.created_at).toLocaleDateString('en-GB')}</td>
                      <td className="px-6 py-4 text-sm">
                        <button onClick={() => { setSelectedRequest(request); setShowModal(true); }} className="inline-flex items-center gap-2 px-3 py-1 bg-blue-100 text-blue-700 rounded-lg hover:bg-blue-200 transition">
                          <Eye className="w-4 h-4" /> View
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            <div className="mt-4 flex items-center justify-between">
              <p className="text-sm text-gray-600">Showing {startIndex + 1} to {Math.min(startIndex + itemsPerPage, filteredRequests.length)} of {filteredRequests.length} results</p>
              <div className="flex gap-1">
                <button 
                  onClick={() => setCurrentPage(Math.max(1, currentPage - 1))} 
                  disabled={currentPage === 1} 
                  className="px-3 py-1 border border-gray-300 rounded-lg disabled:opacity-50 text-gray-700 hover:bg-gray-50"
                >
                  Previous
                </button>
                
                {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
                  <button
                    key={page}
                    onClick={() => setCurrentPage(page)}
                    className={`px-3 py-1 border rounded-lg transition-colors ${
                      currentPage === page
                        ? 'bg-blue-600 text-white border-blue-600'
                        : 'border-gray-300 text-gray-700 hover:bg-gray-50'
                    }`}
                  >
                    {page}
                  </button>
                ))}

                <button 
                  onClick={() => setCurrentPage(Math.min(totalPages, currentPage + 1))} 
                  disabled={currentPage === totalPages} 
                  className="px-3 py-1 border border-gray-300 rounded-lg disabled:opacity-50 text-gray-700 hover:bg-gray-50"
                >
                  Next
                </button>
              </div>
            </div>
          </>
        )}
      </div>

      {showModal && selectedRequest && (
        <div className="fixed inset-0 bg-black/60 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-lg shadow-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            <div className="sticky top-0 bg-blue-600 text-white px-6 py-4 flex items-center justify-between">
              <h2 className="text-xl font-bold">Request Details</h2>
              <button onClick={() => setShowModal(false)} className="text-white text-2xl">×</button>
            </div>
            <div className="p-6 grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <DetailItem label="Internal ID" value={selectedRequest.id.toString()} />
                <DetailItem label="Request ID" value={`#${selectedRequest.request_id}`} />
                <DetailItem label="Full Name" value={selectedRequest.full_name} />
                <DetailItem label="Email" value={selectedRequest.email} />
                <DetailItem label="Mobile" value={selectedRequest.mobile} />
              </div>
              <div>
                <DetailItem label="PAN" value={selectedRequest.pan.toUpperCase()} />
                <DetailItem label="Date of Birth" value={new Date(selectedRequest.dob).toLocaleDateString('en-GB')} />
                <DetailItem label="CIBIL Score" value={selectedRequest.cibil_score?.toString() || 'Pending'} />
                <DetailItem label="Status" value={selectedRequest.status.replace('_', ' ')} />
                <DetailItem label="Created At" value={new Date(selectedRequest.created_at).toLocaleString('en-GB')} />
              </div>
            </div>
            <div className="bg-gray-50 border-t border-gray-200 px-6 py-4 flex justify-end">
              <button onClick={() => setShowModal(false)} className="px-4 py-2 bg-blue-600 text-white rounded-lg">Close</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

const StatsCard = ({ label, value, icon }: { label: string; value: number; icon: React.ReactNode }) => (
  <div className="bg-white border border-gray-200 rounded-lg p-4 shadow-sm flex items-center justify-between">
    <div>
      <p className="text-gray-500 text-sm font-medium">{label}</p>
      <p className="text-2xl font-bold text-gray-900 mt-1">{value}</p>
    </div>
    <div className="p-3 bg-gray-50 rounded-lg">
      {icon}
    </div>
  </div>
);

const DetailItem = ({ label, value }: { label: string; value: string }) => (
  <div className="mb-4">
    <p className="text-sm font-semibold text-gray-700 mb-1">{label}</p>
    <p className="text-gray-900">{value}</p>
  </div>
);

export default CIBILPage;