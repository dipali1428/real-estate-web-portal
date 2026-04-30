"use client";
import React, { useEffect, useState, useCallback } from 'react';
import { AccountService } from '@/app/services/accountsService';
import { AdminService } from '@/app/services/adminService';
import {
  Search, RefreshCcw,
  ShieldCheck, Loader2, ChevronLeft, ChevronRight,
  Edit, X, Download
} from 'lucide-react';
import toast from 'react-hot-toast';

export default function KycStatusPage() {
  const [activeTab, setActiveTab] = useState<'kyc' | 'agreement'>('kyc');
  const [data, setData] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  // 1. Search States
  const [searchTerm, setSearchTerm] = useState(""); // Immediate UI state
  const [debouncedTerm, setDebouncedTerm] = useState(""); // State that triggers API

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingDsa, setEditingDsa] = useState<any>(null);
  const [downloadingId, setDownloadingId] = useState<string | null>(null);

  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [totalRecords, setTotalRecords] = useState(0);
  const limit = 10;

  // 2. Debounce Effect: Wait 1 second (1000ms) after last keystroke
  // You can change 1000 to 2000 or 3000 as per your requirement
  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedTerm(searchTerm);
    }, 1000);

    return () => clearTimeout(timer);
  }, [searchTerm]);

  const fetchData = useCallback(async (page: number, search: string, tab: 'kyc' | 'agreement') => {
    setLoading(true);
    try {
      if (tab === 'kyc') {
        const response = await AccountService.getDSAKycStatus({ page, limit, search });
        if (response.success) {
          setData(response.data || []);
          setTotalPages(response.totalPages || 1);
          setTotalRecords(response.total || 0);
        }
      } else {
        const offset = (page - 1) * limit;
        const response = await AdminService.getAgreementRequests({ limit, offset, search });
        const combined = [
          ...(response.completed || []),
          ...(response.in_progress || [])
        ];
        setData(combined);
        setTotalRecords(response.total_requests || 0);
        setTotalPages(Math.ceil((response.total_requests || 0) / limit));
      }
    } catch (err) {
     toast.error("Fetch Error:");
      setData([]);
    } finally {
      setLoading(false);
    }
  }, []);

  // 3. Trigger fetch only when page, tab, or the DEBOUNCED term changes
  useEffect(() => {
    fetchData(currentPage, debouncedTerm, activeTab);
  }, [currentPage, debouncedTerm, fetchData, activeTab]);

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setCurrentPage(1);
    setDebouncedTerm(searchTerm); // Manual override to search immediately on Enter
  };

  const handleTabChange = (tab: 'kyc' | 'agreement') => {
    setActiveTab(tab);
    setCurrentPage(1);
    setSearchTerm("");
    setDebouncedTerm("");
    setData([]);
  };

  const handleRefresh = () => {
    setSearchTerm("");
    setDebouncedTerm("");
    setCurrentPage(1);
    fetchData(1, "", activeTab);
  };

  // ... (Keep handleDownload, StatusBadge, DataField exactly as they were) ...
  const handleDownload = async (uuid: string, name: string) => {
    if (!uuid) {
      toast.error("Invalid request ID");
      return;
    }
    setDownloadingId(uuid);
    try {
      const response = await AdminService.downloadAgreement(uuid);
      const url = window.URL.createObjectURL(response.data);
      const link = document.createElement('a');
      link.href = url;
      link.setAttribute('download', `${name.replace(/\s+/g, '_')}_Agreement.pdf`);
      document.body.appendChild(link);
      link.click();
      link.parentNode?.removeChild(link);
      window.URL.revokeObjectURL(url);
      toast.success("Download started");
    } catch (error) {
      toast.error("Failed to download agreement");
    } finally {
      setDownloadingId(null);
    }
  };

  const StatusBadge = ({ verified }: { verified: any }) => {
    const isVerified = verified === true || verified === "true" || verified === 1 || verified === "1" || verified === "Yes";
    return isVerified ? (
      <span className="px-2 py-0.5 bg-emerald-100 text-emerald-700 text-[10px] font-bold rounded border border-emerald-200">
        VERIFIED
      </span>
    ) : (
      <span className="px-2 py-0.5 bg-rose-50 text-rose-600 text-[10px] font-bold rounded border border-rose-100">
        NOT VERIFIED
      </span>
    );
  };

  const DataField = ({ label, value, verified }: { label: string, value?: string, verified?: any }) => (
    <div className="flex flex-col gap-1">
      <label className="text-[10px] font-bold text-gray-400 uppercase tracking-tight">{label}</label>
      <div className="flex items-center gap-2">
        <span className="text-sm font-semibold text-gray-800">{value || "N/A"}</span>
        {verified !== undefined && <StatusBadge verified={verified} />}
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-gray-50 p-4 md:p-8 font-sans">
      <div className="max-w-[1600px] mx-auto">
        <div className="mb-6">
          <h1 className="text-2xl font-bold text-gray-900">DSA Management</h1>
          <p className="text-gray-500 text-sm">Manage documentation and legal agreements</p>
        </div>

        <div className="flex items-center border-b border-gray-200 mb-6 gap-8">
          <button onClick={() => handleTabChange('kyc')} className={`pb-3 text-sm font-bold transition-all relative ${activeTab === 'kyc' ? 'text-[#2076C7]' : 'text-gray-400 hover:text-gray-600'}`}>
            KYC Status
            {activeTab === 'kyc' && <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-[#2076C7]" />}
          </button>
          <button onClick={() => handleTabChange('agreement')} className={`pb-3 text-sm font-bold transition-all relative ${activeTab === 'agreement' ? 'text-[#2076C7]' : 'text-gray-400 hover:text-gray-600'}`}>
            Agreement Status
            {activeTab === 'agreement' && <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-[#2076C7]" />}
          </button>
        </div>

        {/* Search Bar Section */}
        <div className="flex flex-col md:flex-row md:items-center justify-between mb-6 gap-4">
          <div>
            <h2 className="text-lg font-bold text-gray-800">
              {activeTab === 'kyc' ? "KYC Verification" : "Agreement Requests"}
            </h2>
            <p className="text-gray-500 text-xs">Verify status for {totalRecords} records</p>
          </div>

          <form onSubmit={handleSearchSubmit} className="flex items-center gap-2">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
              <input
                type="text"
                placeholder={activeTab === 'kyc' ? "Search By Name or ADV_ID..." : "Search Name, Email or Mobile..."}
                className="pl-10 pr-4 py-2 border border-gray-200 rounded-lg outline-none text-gray-600 focus:ring-2 focus:ring-gray-100 w-64 text-sm bg-white"
                value={searchTerm}
                onChange={(e) => {
                  setSearchTerm(e.target.value);
                  setCurrentPage(1); // Reset page on type
                }}
              />
            </div>
            <button type="submit" className="bg-[#2076C7] text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-[#1a65ad] transition-colors">
              Search
            </button>
            <button
              type="button"
              onClick={handleRefresh}
              className="p-2 bg-white border border-gray-200 rounded-lg text-gray-600 hover:bg-gray-50"
            >
              <RefreshCcw size={18} className={loading ? "animate-spin" : ""} />
            </button>
          </form>
        </div>

        {/* Table Content Area */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
          <div className="overflow-x-auto">
            {activeTab === 'kyc' ? (
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="bg-gray-50/50 border-b border-gray-200">
                    <th className="px-4 py-4 text-[14px] font-bold text-gray-500 uppercase tracking-wider">ID</th>
                    <th className="px-4 py-4 text-[14px] font-bold text-gray-500 uppercase tracking-wider">DSA Details</th>
                    <th className="px-4 py-4 text-[14px] font-bold text-gray-500 uppercase tracking-wider">Phone Number</th>
                    <th className="px-4 py-4 text-[14px] font-bold text-gray-500 uppercase tracking-wider">Email Address</th>
                    <th className="px-4 py-4 text-[14px] font-bold text-gray-500 uppercase tracking-wider text-center bg-blue-50/30">KYC Completed</th>
                    <th className="px-4 py-4 text-[14px] font-bold text-gray-500 uppercase tracking-wider text-center">Action</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-100 bg-white">
                  {loading ? (
                    <tr>
                      <td colSpan={6} className="py-24 text-center">
                        <Loader2 className="animate-spin text-blue-500 mx-auto mb-2" size={32} />
                        <span className="text-gray-400 text-sm">Loading records...</span>
                      </td>
                    </tr>
                  ) : data.length > 0 ? (
                    data.map((item) => (
                      <tr key={item.id} className="hover:bg-gray-50/80 transition-colors">
                        <td className="px-4 py-4 text-[14px] font-sans text-gray-700">{item.id}</td>
                        <td className="px-4 py-4">
                          <div className="text-sm font-bold text-gray-900 leading-tight whitespace-nowrap">{item.name}</div>
                          <div className="text-[14px] text-gray-500 leading-tight">{item.adv_id}</div>
                        </td>
                        <td className="px-4 py-4 text-[14px] font-medium text-gray-700 whitespace-nowrap">{item.phone_number || "N/A"}</td>
                        <td className="px-4 py-4 text-[14px] font-medium text-gray-700">{item.email || "N/A"}</td>
                        <td className="px-4 py-4 bg-blue-50/10">
                          <div className="flex justify-center">
                            {item.kyc_completed ? (
                              <span className="bg-[#1CADA3] text-white text-[11px] font-bold px-2 py-1 rounded flex items-center gap-1">
                                <ShieldCheck size={12} /> COMPLETE
                              </span>
                            ) : (
                              <span className="bg-gray-200 text-gray-500 text-[9px] font-black px-2 py-1 rounded">
                                INCOMPLETE
                              </span>
                            )}
                          </div>
                        </td>
                        <td className="px-4 py-4 text-center">
                          <button
                            onClick={() => { setEditingDsa({ ...item }); setIsModalOpen(true); }}
                            className="inline-flex items-center gap-1 px-3 py-1.5 bg-[#2076C7] text-white rounded text-[12px] font-bold hover:bg-[#1a65ad] transition-all active:scale-95 whitespace-nowrap"
                          >
                            <Edit size={12} /> View Details
                          </button>
                        </td>
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td colSpan={6} className="py-20 text-center text-gray-400 text-sm">No records found.</td>
                    </tr>
                  )}
                </tbody>
              </table>
            ) : (
              /* Agreement Table Logic (Similar structure) */
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="bg-gray-50/50 border-b border-gray-200">
                    <th className="px-6 py-4 text-[14px] font-bold text-gray-500 uppercase tracking-wider">Name</th>
                    <th className="px-6 py-4 text-[14px] font-bold text-gray-500 uppercase tracking-wider">Email</th>
                    <th className="px-6 py-4 text-[14px] font-bold text-gray-500 uppercase tracking-wider">Mobile</th>
                    <th className="px-6 py-4 text-[14px] font-bold text-gray-500 uppercase tracking-wider text-center">Status</th>
                    <th className="px-6 py-4 text-[14px] font-bold text-gray-500 uppercase tracking-wider text-center">Download</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-100">
                  {loading ? (
                    <tr>
                      <td colSpan={5} className="py-24 text-center">
                        <Loader2 className="animate-spin text-blue-500 mx-auto mb-2" size={32} />
                      </td>
                    </tr>
                  ) : data.length > 0 ? (
                    data.map((item, idx) => (
                      <tr key={idx} className="hover:bg-gray-50/80 transition-colors">
                        <td className="px-6 py-4 text-sm font-bold text-gray-900">{item.name}</td>
                        <td className="px-6 py-4 text-sm text-gray-600">{item.email}</td>
                        <td className="px-6 py-4 text-sm text-gray-600">{item.phone_number}</td>
                        <td className="px-6 py-4 text-center">
                          {item.status === "Completed" ? (
                            <span className="bg-emerald-50 text-emerald-600 px-3 py-1 rounded-full text-xs font-bold border border-emerald-100">Completed</span>
                          ) : (
                            <span className="bg-amber-50 text-amber-600 px-3 py-1 rounded-full text-xs font-bold border border-amber-100">In-Progress</span>
                          )}
                        </td>
                        <td className="px-6 py-4 text-center">
                          {item.status === "Completed" && item.request_uuid ? (
                            <button
                              onClick={() => handleDownload(item.request_uuid, item.name)}
                              disabled={downloadingId === item.request_uuid}
                              className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-[#2076C7] text-white rounded text-[11px] font-bold hover:bg-[#1a65ad] transition-all active:scale-95 disabled:opacity-70 disabled:cursor-not-allowed"
                            >
                              {downloadingId === item.request_uuid ? (
                                <>
                                  <Loader2 size={12} className="animate-spin" />
                                  <span>Downloading...</span>
                                </>
                              ) : (
                                <>
                                  <Download size={12} strokeWidth={2.5} />
                                  <span>Download</span>
                                </>
                              )}
                            </button>
                          ) : "—"}
                        </td>
                      </tr>
                    ))
                  ) : (
                    <tr><td colSpan={5} className="py-20 text-center text-gray-400">No records found.</td></tr>
                  )}
                </tbody>
              </table>
            )}
          </div>

          {/* Pagination */}
          <div className="px-6 py-4 bg-gray-50 border-t border-gray-200 flex flex-col sm:flex-row items-center justify-between gap-4">
            <div className="text-sm text-gray-500 font-medium">
              Showing page <span className="text-gray-900">{currentPage}</span> of <span className="text-gray-900">{totalPages}</span>
            </div>
            <div className="flex items-center gap-2">
              <button onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))} disabled={currentPage === 1 || loading} className="px-3 py-1.5 border rounded-md bg-white disabled:opacity-50">
                <ChevronLeft size={16} />
              </button>
              <button onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))} disabled={currentPage === totalPages || loading} className="px-3 py-1.5 border rounded-md bg-white disabled:opacity-50">
                <ChevronRight size={16} />
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Modal - Same as yours */}
      {isModalOpen && (
        // ... Modal code remains unchanged ...
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60">
          {/* Modal Inner Content */}
          <div className="bg-white rounded-2xl w-full max-w-4xl p-6 relative">
            <button onClick={() => setIsModalOpen(false)} className="absolute top-4 text-gray-600 right-4"><X /></button>
            <h2 className="text-xl text-gray-600 font-bold mb-4">DSA Details</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">

              <DataField label="Name" value={editingDsa?.name} />
              <DataField label="DSA ID" value={editingDsa?.adv_id} />

              <DataField label="Email" value={editingDsa?.email} verified={editingDsa?.email_verified} />
              <DataField label="Phone" value={editingDsa?.phone_number} verified={editingDsa?.phone_verified} />

              <DataField label="PAN" value={editingDsa?.pan} verified={editingDsa?.pan_verified} />
              <DataField label="Aadhaar Number" value={editingDsa?.aadhaar_number} verified={editingDsa?.aadhaar_verified} />

              <DataField label="Bank Name" value={editingDsa?.bank_name} verified={editingDsa?.bank_verified} />
              <DataField label="Account Number" value={editingDsa?.bank_account_number} />

              <DataField label="IFSC Code" value={editingDsa?.ifsc_code} />

              <DataField label="GST Number" value={editingDsa?.gst_number} verified={editingDsa?.gst_verified} />

              <DataField
                label="PAN-Aadhaar Linked"
                value={editingDsa?.pan_aadhaar_linked ? "Yes" : "No"}
              />

              <DataField
                label="KYC Status"
                value={editingDsa?.kyc_completed ? "Completed" : "Pending"}
              />
            </div>
            <button onClick={() => setIsModalOpen(false)} className="mt-6 w-full bg-gray-800 text-white py-2 rounded-lg">Close</button>
          </div>
        </div>
      )}
    </div>
  );
}