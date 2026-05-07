'use client';

import React, { useEffect, useMemo, useState } from 'react';
import { Search, RefreshCw, Download, Eye, Clock, AlertCircle, Layers, CheckCircle, XCircle } from 'lucide-react';
import { AdminService } from '@/app/services/adminService';
import { PublicService } from "../../services/publicService";
import toast from 'react-hot-toast';
import * as XLSX from 'xlsx';

// --- Interfaces ---
interface CIBILRequest {
  id: number;
  request_id: any;
  full_name: string;
  email: string;
  mobile: string;
  pan: string;
  dob?: string;
  cibil_score?: number | null;
  status: string;
  created_at: string;
  // Prefill specific fields
  raw_response?: any;
  eligible?: boolean | string;
  failure_reason?: string | null;
}

const CIBILPage = () => {
  const [activeTab, setActiveTab] = useState<'requests' | 'logs'>('requests');
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(10);

  // Data States
  const [requestsData, setRequestsData] = useState<CIBILRequest[]>([]);
  const [logsData, setLogsData] = useState<CIBILRequest[]>([]);

  // UI States
  const [selectedRequest, setSelectedRequest] = useState<CIBILRequest | null>(null);
  const [showModal, setShowModal] = useState(false);
  const [isDownloading, setIsDownloading] = useState<string | null>(null);

  const fetchData = async () => {
    setLoading(true);
    try {
      if (activeTab === 'requests') {
        const response = await AdminService.getCIBILRequests();
        setRequestsData(response.cibil || []);
      } else {
        const response = await AdminService.prefillLogs();
        const data = Array.isArray(response) ? response : (response?.data || response?.logs || []);
        setLogsData(data);
      }
    } catch (error: any) {
      toast.error('Failed to fetch data');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
    setSearchTerm('');
    setStatusFilter('all');
    setCurrentPage(1);
  }, [activeTab]);

  const currentData = activeTab === 'requests' ? requestsData : logsData;

  const stats = useMemo(() => {
    if (activeTab === 'requests') {
      return {
        total: requestsData.length,
        p1: { label: 'Score Pending', val: requestsData.filter(r => r.status === 'SCORE_PENDING').length, icon: <Clock className="w-5 h-5 text-yellow-600" /> },
        p2: { label: 'Score Received', val: requestsData.filter(r => r.status === 'SCORE_RECEIVED').length, icon: <CheckCircle className="w-5 h-5 text-green-600" /> },
        p3: { label: 'Failed', val: requestsData.filter(r => r.status === 'FAILED').length, icon: <AlertCircle className="w-5 h-5 text-red-600" /> }
      };
    } else {
      return {
        total: logsData.length,
        p1: { label: 'Eligible', val: logsData.filter(r => r.eligible === true).length, icon: <CheckCircle className="w-5 h-5 text-green-600" /> },
        p2: { label: 'Failed', val: logsData.filter(r => r.status === 'FAILED' || r.failure_reason).length, icon: <XCircle className="w-5 h-5 text-red-600" /> },
        // p3: { label: 'Pending', val: logsData.filter(r => r.status === 'PENDING').length, icon: <Clock className="w-5 h-5 text-yellow-600" /> }
      };
    }
  }, [activeTab, requestsData, logsData]);

  const filteredRequests = useMemo(() => {
    let result = [...currentData];
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
  }, [currentData, searchTerm, statusFilter]);

  const totalPages = Math.ceil(filteredRequests.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const currentPageRequests = filteredRequests.slice(startIndex, startIndex + itemsPerPage);

  const handleExport = () => {
    const exportData = filteredRequests.map(r => ({
      'Request ID': r.request_id,
      'Full Name': r.full_name,
      'Email': r.email,
      'Mobile': r.mobile,
      'PAN': r.pan,
      'Status': r.status,
      ...(activeTab === 'requests' ? { 'Score': r.cibil_score } : { 'Eligible': r.eligible ? 'Yes' : 'No' }),
      'Created At': new Date(r.created_at).toLocaleString('en-GB'),
    }));

    const worksheet = XLSX.utils.json_to_sheet(exportData);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, activeTab === 'requests' ? 'CIBIL Requests' : 'Prefill Logs');
    XLSX.writeFile(workbook, `${activeTab}_export.xlsx`);
    toast.success('Data exported successfully');
  };

  const handleDownloadReport = async (id: string) => {
    setIsDownloading(id);
    try {
      const blob = await PublicService.downloadCibilReport(id);
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = `cibil-report-${id}.pdf`;
      document.body.appendChild(a);
      a.click();
      window.URL.revokeObjectURL(url);
      document.body.removeChild(a);
      toast.success('Report downloaded successfully');
    } catch (err) {
      toast.error("Failed to download report.");
    } finally {
      setIsDownloading(null);
    }
  };

  const getStatusColor = (status: string) => {
    const s = status?.toUpperCase();
    if (s.includes('PENDING')) return 'bg-yellow-100 text-yellow-800';
    if (s.includes('SUCCESS') || s.includes('RECEIVED') || s.includes('COMPLETED')) return 'bg-green-100 text-green-800';
    if (s.includes('FAILED')) return 'bg-red-100 text-red-800';
    return 'bg-gray-100 text-gray-800';
  };

  return (
    <div className="bg-gray-50 p-4 md:p-6 min-h-screen">
      <div className="max-w-full mx-auto">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-8 gap-4">
          <div>
            <h1 className="text-3xl font-bold text-gray-900 mb-2">CIBIL Management</h1>
            <p className="text-gray-600">Switch between score requests and prefill eligibility logs</p>
          </div>

        </div>

        {/* Stats Section */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
          <StatsCard label={`Total ${activeTab === 'requests' ? 'Requests' : 'Logs'}`} value={stats.total} icon={<Layers className="w-5 h-5 text-blue-600" />} />
          <StatsCard label={stats.p1.label} value={stats.p1.val} icon={stats.p1.icon} />
          <StatsCard label={stats.p2.label} value={stats.p2.val} icon={stats.p2.icon} />
          {activeTab === 'requests' ? (
            <StatsCard label={'Failed'} value={requestsData.filter(r => r.status === 'FAILED').length} icon={<AlertCircle className="w-5 h-5 text-red-600" />} />
          ) : (null)}
        </div>
        {/* Tab Switcher */}
        <div className="flex bg-gray-200 p-1 rounded-xl mb-6 w-fit">
          <button
            onClick={() => setActiveTab('requests')}
            className={`px-6 py-2 rounded-lg font-medium transition ${activeTab === 'requests' ? 'bg-white text-blue-600 shadow-sm' : 'text-gray-600 hover:text-gray-900'}`}
          >
            CIBIL Requests
          </button>
          <button
            onClick={() => setActiveTab('logs')}
            className={`px-6 py-2 rounded-lg font-medium transition ${activeTab === 'logs' ? 'bg-white text-blue-600 shadow-sm' : 'text-gray-600 hover:text-gray-900'}`}
          >
            Prefill Logs
          </button>
        </div>

        {/* Filters Section */}
        <div className="bg-white rounded-xl shadow-sm p-4 sm:p-6 mb-6 border border-gray-100">
          {/* The key change is the grid-cols-layout below */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-[2fr_1fr_auto_auto] gap-4 items-end">

            {/* 1. Search Bar - Takes most space (2fr) */}
            <div className="w-full">
              <label className="block text-xs font-semibold text-gray-500 uppercase mb-1 ml-1">Search</label>
              <div className="relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                <input
                  type="text"
                  placeholder="Search..."
                  value={searchTerm}
                  onChange={(e) => { setSearchTerm(e.target.value); setCurrentPage(1); }}
                  className="w-full pl-10 pr-4 py-2 bg-gray-50 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:bg-white outline-none text-sm text-gray-700 transition-all"
                />
              </div>
            </div>

            {/* 2. Status Filter - Takes medium space (1fr) */}
            <div className="w-full">
              <label className="block text-xs font-semibold text-gray-500 uppercase mb-1 ml-1">Status</label>
              <select
                value={statusFilter}
                onChange={(e) => { setStatusFilter(e.target.value); setCurrentPage(1); }}
                className="w-full px-3 py-2 bg-gray-50 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:bg-white outline-none text-sm text-gray-700 cursor-pointer"
              >
                <option value="all">All Status</option>
                {Array.from(new Set(currentData.map(r => r.status))).map(s => (
                  <option key={s} value={s}>{s.replace('_', ' ')}</option>
                ))}
              </select>
            </div>

            {/* 3. Entries - SHRINKS TO CONTENT (auto) */}
            <div className="w-full lg:w-32"> {/* Fixed width on desktop to prevent stretching */}
              <label className="block text-xs font-semibold text-gray-500 uppercase mb-1 ml-1">Show</label>
              <div className="flex items-center gap-2 px-3 py-2 border border-gray-200 rounded-lg bg-gray-50 h-[38px]">
                <select
                  value={itemsPerPage}
                  onChange={(e) => { setItemsPerPage(Number(e.target.value)); setCurrentPage(1); }}
                  className="bg-transparent font-bold text-sm text-blue-600 outline-none cursor-pointer w-full"
                >
                  {[5, 10, 20, 50].map(v => <option key={v} value={v}>{v}</option>)}
                </select>
                <span className="text-[10px] font-bold text-gray-400 uppercase">Rows</span>
              </div>
            </div>

            {/* 4. Action Buttons - SHRINKS TO CONTENT (auto) */}
            <div className="flex gap-2">
              <button
                onClick={fetchData}
                className="flex items-center gap-2 px-4 py-2.5 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-all text-sm font-semibold shadow-sm"
              >
                <RefreshCw className={`w-4 h-4 ${loading ? 'animate-spin' : ''}`} />
                <span>Refresh</span>
              </button>

              <button
                onClick={handleExport}
                className="flex items-center gap-2 px-4 py-2.5 bg-emerald-600 text-white rounded-lg hover:bg-emerald-700 transition-all text-sm font-semibold shadow-sm"
              >
                <Download className="w-4 h-4" />
                <span>Export</span>
              </button>
            </div>

          </div>
        </div>

        {loading ? (
          <div className="bg-white rounded-lg shadow-sm p-12 text-center">
            <div className="inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
            <p className="mt-2 text-gray-500">Loading data...</p>
          </div>
        ) : (
          <>
            <div className="bg-white rounded-lg scrollbar-x-thin shadow-sm overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-gray-200 bg-gray-50">
                    <th className="px-6 py-3 text-left text-sm font-semibold text-gray-700">Req ID</th>
                    <th className="px-6 py-3 text-left text-sm font-semibold text-gray-700">Full Name</th>
                    <th className="px-6 py-3 text-left text-sm font-semibold text-gray-700">Contact</th>
                    <th className="px-6 py-3 text-left text-sm font-semibold text-gray-700">PAN</th>
                    {activeTab === 'requests' ? (
                      <>
                        <th className="px-6 py-3 text-left text-sm font-semibold text-gray-700">DOB</th>
                        <th className="px-6 py-3 text-left text-sm font-semibold text-gray-700">Score</th>
                      </>
                    ) : (
                      <th className="px-6 py-3 text-left text-sm font-semibold text-gray-700">Eligible</th>
                    )}
                    <th className="px-6 py-3 text-left text-sm font-semibold text-gray-700">Status</th>
                    <th className="px-6 py-3 text-left text-sm font-semibold text-gray-700">Date</th>
                    <th className="px-6 py-3 text-left text-sm font-semibold text-gray-700">Action</th>
                  </tr>
                </thead>
                <tbody>
                  {currentPageRequests.map((request, idx) => (
                    <tr key={request.request_id || idx} className="border-b border-gray-200 hover:bg-gray-50 transition">
                      <td className="px-6 py-4 text-sm font-medium text-gray-900">#{request.request_id}</td>
                      <td className="px-6 py-4 text-sm text-gray-700">{request.full_name}</td>
                      <td className="px-6 py-4 text-sm text-gray-700">
                        <div className="font-medium">{request.email}</div>
                        <div className="text-xs text-gray-500">{request.mobile}</div>
                      </td>
                      <td className="px-6 py-4 text-sm text-gray-700 uppercase font-mono">{request.pan}</td>

                      {activeTab === 'requests' ? (
                        <>
                          <td className="px-6 py-4 text-sm text-gray-700">{request.dob ? new Date(request.dob).toLocaleDateString('en-GB') : '-'}</td>
                          <td className="px-6 py-4 text-sm font-bold text-gray-900">{request.cibil_score || '-'}</td>
                        </>
                      ) : (
                        <td className="px-6 py-4 text-sm">
                          <span className={request.eligible ? "text-green-600 font-bold" : "text-red-600 font-bold"}>
                            {request.eligible ? 'Yes' : 'No'}
                          </span>
                        </td>
                      )}

                      <td className="px-6 py-4 text-sm whitespace-nowrap">
                        <span className={`inline-flex items-center justify-center px-2.5 py-1 rounded-full text-[10px] sm:text-xs font-bold min-w-[90px] sm:min-w-[110px] text-center uppercase tracking-wider ${getStatusColor(request.status)}`}>
                          {/* Optional: Add a small dot for visual weight */}
                          {/* <span className="w-1.5 h-1.5 rounded-full bg-current mr-1.5 opacity-60 hidden sm:inline-block"></span> */}
                          {request.status?.replace('_', ' ')}
                        </span>
                      </td>
                      <td className="px-6 py-4 text-sm text-gray-700">{new Date(request.created_at).toLocaleDateString('en-GB')}</td>
                      <td className="px-6 py-4 text-sm">
                        <div className="flex gap-2">
                          <button onClick={() => { setSelectedRequest(request); setShowModal(true); }} className="inline-flex items-center gap-1 px-3 py-1 bg-blue-100 text-blue-700 rounded-lg hover:bg-blue-200 transition">
                            <Eye className="w-4 h-4" /> View
                          </button>
                          {activeTab === 'requests' && (
                            <button
                              onClick={() => handleDownloadReport(request.request_id.toString())}
                              disabled={isDownloading === request.request_id.toString()}
                              className="inline-flex items-center gap-1 px-3 py-1 bg-green-600 text-white rounded-lg hover:bg-green-700 transition disabled:opacity-50"
                            >
                              {isDownloading === request.request_id.toString() ? <RefreshCw className="w-3 h-3 animate-spin" /> : <Download className="w-3 h-3" />}
                              Report
                            </button>
                          )}
                        </div>
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
                <button onClick={() => setCurrentPage(prev => Math.min(totalPages, prev + 1))} disabled={currentPage === totalPages} className="px-3 py-1 border rounded-lg disabled:opacity-50 hover:bg-gray-100 text-gray-600">Next</button>
              </div>
            </div>
          </>
        )}
      </div>

      {showModal && selectedRequest && (
        <div className="fixed inset-0 bg-black/60 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-lg shadow-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            <div className="sticky top-0 bg-blue-600 text-white px-6 py-4 flex items-center justify-between">
              <h2 className="text-xl font-bold">{activeTab === 'requests' ? 'Request Details' : 'Log Details'}</h2>
              <button onClick={() => setShowModal(false)} className="text-white text-2xl">×</button>
            </div>
            <div className="p-6 grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <DetailItem label="Request ID" value={`#${selectedRequest.request_id}`} />
                <DetailItem label="Full Name" value={selectedRequest.full_name} />
                <DetailItem label="Email" value={selectedRequest.email} />
                <DetailItem label="Mobile" value={selectedRequest.mobile} />
                <DetailItem label="PAN" value={selectedRequest.pan.toUpperCase()} />
              </div>
              <div>
                {activeTab === 'requests' ? (
                  <>
                    <DetailItem label="Date of Birth" value={selectedRequest.dob ? new Date(selectedRequest.dob).toLocaleDateString('en-GB') : '-'} />
                    <DetailItem label="CIBIL Score" value={selectedRequest.cibil_score?.toString() || 'Pending'} />
                  </>
                ) : (
                  <>
                    <DetailItem label="Eligible" value={selectedRequest.eligible ? 'YES' : 'NO'} />
                    <DetailItem label="Failure Reason" value={selectedRequest.failure_reason || 'None'} />
                  </>
                )}
                <DetailItem label="Status" value={selectedRequest.status.replace('_', ' ')} />
                <DetailItem label="Created At" value={new Date(selectedRequest.created_at).toLocaleString('en-GB')} />
              </div>
              {activeTab === 'logs' && selectedRequest.raw_response && (
                <div className="md:col-span-2">
                  <p className="text-sm font-semibold text-gray-700 mb-1">Raw Response</p>
                  <pre className="bg-gray-900 text-green-400 p-4 rounded-lg text-xs overflow-x-auto max-h-60">
                    {JSON.stringify(selectedRequest.raw_response, null, 2)}
                  </pre>
                </div>
              )}
            </div>
            <div className="bg-gray-50 border-t px-6 py-4 flex justify-end">
              <button onClick={() => setShowModal(false)} className="px-6 py-2 bg-blue-600 text-white rounded-lg">Close</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

const StatsCard = ({ label, value, icon }: { label: string; value: number; icon: React.ReactNode }) => (
  <div className="bg-white border border-gray-200 rounded-xl p-4 shadow-sm flex items-center justify-between">
    <div>
      <p className="text-gray-500 text-sm font-medium">{label}</p>
      <p className="text-2xl font-bold text-gray-900 mt-1">{value}</p>
    </div>
    <div className="p-3 bg-gray-50 rounded-lg">{icon}</div>
  </div>
);

const DetailItem = ({ label, value }: { label: string; value: string }) => (
  <div className="mb-4">
    <p className="text-sm font-semibold text-gray-500 mb-1">{label}</p>
    <p className="text-gray-900 font-medium break-words">{value}</p>
  </div>
);

export default CIBILPage;