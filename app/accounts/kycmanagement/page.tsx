"use client";
import React, { useEffect, useState, useCallback } from 'react';
import { AccountService } from '@/app/services/accountsService';
import {
  Search, RefreshCcw,
  ShieldCheck, Loader2, ChevronLeft, ChevronRight,
  Edit, X, CheckCircle2, AlertCircle
} from 'lucide-react';

export default function KycStatusPage() {
  const [data, setData] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");

  // Modal & Editing State
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingDsa, setEditingDsa] = useState<any>(null);
  const [saveLoading, setSaveLoading] = useState(false);

  // Pagination State
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [totalRecords, setTotalRecords] = useState(0);
  const limit = 10;

  const fetchData = useCallback(async (page: number, search: string) => {
    setLoading(true);
    try {
      const response = await AccountService.getDSAKycStatus({ page, limit, search });
      if (response.success) {
        setData(response.data || []);
        setTotalPages(response.totalPages || 1);
        setTotalRecords(response.total || 0);
      }
    } catch (err) {
      console.error("Fetch Error:", err);
      setData([]);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchData(currentPage, searchTerm);
  }, [currentPage, searchTerm, fetchData]);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    setCurrentPage(1);
    fetchData(1, searchTerm);
  };

  const handleOpenEdit = (item: any) => {
    setEditingDsa({ ...item });
    setIsModalOpen(true);
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

  // Helper for labels to keep UI clean
  const DataField = ({ label, value, verified }: { label: string, value?: string, verified?: any }) => (
    <div className="flex flex-col gap-1">
      <label className="text-[10px] font-bold text-gray-400 uppercase tracking-tight">{label}</label>
      <div className="flex items-center gap-2">
        <span className="text-sm font-semibold text-gray-800">{value || "N/A"}</span>
        {verified !== undefined && <StatusBadge verified={verified} />}
      </div>
    </div>
  );

  const handleInputChange = (field: string, value: any) => {
    setEditingDsa((prev: any) => ({ ...prev, [field]: value }));
  };

  const StatusIndicator = ({ verified }: { verified: any }) => {
    const isVerified = verified === true || verified === "true" || verified === 1 || verified === "1" || verified === "Yes";
    return (
      <div className="flex justify-center">
        {isVerified ? (
          <div className="flex items-center gap-1 text-emerald-600 text-[10px] font-bold">
            Verified
          </div>
        ) : (
          <div className="flex items-center gap-1 text-rose-500 text-[10px] font-bold">
            Not Verified
          </div>
        )}
      </div>
    );
  };

  return (
    <div className="min-h-screen bg-gray-50 p-4 md:p-8 font-sans">
      <div className="max-w-[1600px] mx-auto">

        {/* Header & Search */}
        <div className="flex flex-col md:flex-row md:items-center justify-between mb-6 gap-4">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">KYC Status Management</h1>
            <p className="text-gray-500 text-sm">Verify documentation status for {totalRecords} DSAs</p>
          </div>

          <form onSubmit={handleSearch} className="flex items-center gap-2">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
              <input
                type="text"
                placeholder="Search By Name or ADV_ID..."
                className="pl-10 pr-4 py-2 border border-gray-200 rounded-lg outline-none text-gray-600 focus:ring-2 focus:ring-gray-100 w-64 text-sm bg-white"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            <button type="submit" className="bg-[#2076C7] text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-[#1a65ad] transition-colors">
              Search
            </button>
            <button
              type="button"
              onClick={() => { setSearchTerm(""); setCurrentPage(1); fetchData(1, ""); }}
              className="p-2 bg-white border border-gray-200 rounded-lg text-gray-600 hover:bg-gray-50"
            >
              <RefreshCcw size={18} className={loading ? "animate-spin" : ""} />
            </button>
          </form>
        </div>

        {/* Table Container */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
          <div>
          <div className="block md:hidden space-y-4">
    {data.map((item) => (
      <div key={item.id} className="bg-white p-4 border rounded-lg shadow-sm">
        <div className="flex justify-between items-start mb-2">
          <div>
            <span className="text-[10px] text-gray-400 font-bold uppercase">ID: {item.id}</span>
            <div className="text-sm font-bold text-gray-900">{item.name}</div>
          </div>
          {item.kyc_completed ? (
            <span className="bg-[#1CADA3] text-white text-[10px] font-bold px-2 py-1 rounded flex items-center gap-1">
              <ShieldCheck size={10} /> COMPLETE
            </span>
          ) : (
            <span className="bg-gray-200 text-gray-500 text-[9px] font-black px-2 py-1 rounded">INCOMPLETE</span>
          )}
        </div>
        <div className="text-[13px] text-gray-600 space-y-1">
          <p><strong>Phone:</strong> {item.phone_number}</p>
          <p><strong>Email:</strong> {item.email}</p>
        </div>
        <button
          onClick={() => handleOpenEdit(item)}
          className="mt-3 w-full justify-center inline-flex items-center gap-1 px-3 py-2 bg-[#2076C7] text-white rounded text-[12px] font-bold"
        >
          <Edit size={12} /> View Details
        </button>
      </div>
    ))}
  </div>
  <div className="hidden md:block overflow-x-auto border border-gray-200 rounded-lg">
    <table className="w-full text-left border-collapse"> {/* Set min-width to prevent columns from squishing */}
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
                            onClick={() => handleOpenEdit(item)}
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
            </div>
          </div>

          {/* Pagination Footer */}
          <div className="px-6 py-4 bg-gray-50 border-t border-gray-200 flex flex-col sm:flex-row items-center justify-between gap-4">
            <div className="text-sm text-gray-500 font-medium">
              Showing page <span className="text-gray-900">{currentPage}</span> of <span className="text-gray-900">{totalPages}</span>
              <span className="ml-2 text-xs">({totalRecords} total records)</span>
            </div>

            <div className="flex items-center gap-2">
              <button
                onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
                disabled={currentPage === 1 || loading}
                className="flex items-center gap-1 px-3 py-1.5 border border-gray-300 rounded-md bg-white text-sm font-medium text-gray-700 hover:bg-gray-50 disabled:opacity-50 transition-all"
              >
                <ChevronLeft size={16} /> Previous
              </button>

              <div className="hidden md:flex items-center gap-1">
                {[...Array(Math.min(5, totalPages))].map((_, i) => {
                  let pageNum = currentPage <= 3 ? i + 1 : currentPage - 2 + i;
                  if (pageNum > totalPages || pageNum <= 0) return null;
                  return (
                    <button
                      key={pageNum}
                      onClick={() => setCurrentPage(pageNum)}
                      className={`w-8 h-8 rounded-md text-xs font-bold transition-all ${currentPage === pageNum ? 'bg-[#2076C7] text-white' : 'bg-white border border-gray-300 text-gray-600 hover:border-blue-500'}`}
                    >
                      {pageNum}
                    </button>
                  )
                })}
              </div>

              <button
                onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
                disabled={currentPage === totalPages || loading}
                className="flex items-center gap-1 px-3 py-1.5 border border-gray-300 rounded-md bg-white text-sm font-medium text-gray-700 hover:bg-gray-50 disabled:opacity-50 transition-all"
              >
                Next <ChevronRight size={16} />
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Modal - Newly Added Component Remains Untouched */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm">
          <div className="bg-white rounded-2xl shadow-2xl w-full max-w-4xl max-h-[90vh] overflow-hidden flex flex-col">
            {/* Modal Header */}
            <div className="px-6 py-4 border-b border-gray-100 flex items-center justify-between bg-gray-50">
              <div>
                <h2 className="text-lg font-bold text-gray-900">DSA Profile Details</h2>
                <p className="text-xs text-gray-500">ID: {editingDsa?.adv_id}</p>
              </div>
              <button onClick={() => setIsModalOpen(false)} className="p-2 hover:bg-gray-200 rounded-full transition-colors">
                <X size={20} className="text-gray-500" />
              </button>
            </div>

            <div className="p-6 overflow-y-auto grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Final KYC Status Bar */}
              <div className="md:col-span-2 p-4 rounded-xl border flex items-center justify-between bg-[#2076C7]/5 border-[#2076C7]/20">
                <div className="flex items-center gap-3">
                  <div className={`p-2 rounded-full ${editingDsa?.kyc_completed ? 'bg-emerald-100 text-emerald-600' : 'bg-gray-200 text-gray-500'}`}>
                    <ShieldCheck size={24} />
                  </div>
                  <div>
                    <p className="text-xs font-bold text-gray-500 uppercase">Overall KYC Status</p>
                    <p className={`text-lg font-black ${editingDsa?.kyc_completed ? 'text-emerald-600' : 'text-gray-400'}`}>
                      {editingDsa?.kyc_completed ? "FULLY COMPLETED" : "INCOMPLETE"}
                    </p>
                  </div>
                </div>
              </div>

              {/* Basic & Contact Section */}
              <div className="space-y-4 border p-5 rounded-xl bg-gray-50/50">
                <h3 className="font-bold text-xs text-blue-700 uppercase flex items-center gap-2">
                  <CheckCircle2 size={14} /> Contact Information
                </h3>
                <div className="grid grid-cols-1 gap-4">
                  <DataField label="Full Name" value={editingDsa?.name} />
                  <DataField label="Email Address" value={editingDsa?.email} verified={editingDsa?.email_verified} />
                  <DataField label="Phone Number" value={editingDsa?.phone_number} verified={editingDsa?.phone_verified} />
                </div>
              </div>

              {/* Identity Section */}
              <div className="space-y-4 border p-5 rounded-xl bg-gray-50/50">
                <h3 className="font-bold text-xs text-blue-700 uppercase flex items-center gap-2">
                  <ShieldCheck size={14} /> Identity Documents
                </h3>
                <div className="grid grid-cols-1 gap-4">
                  <DataField label="PAN Number" value={editingDsa?.pan} verified={editingDsa?.pan_verified} />
                  <DataField label="Aadhaar Number" value={editingDsa?.aadhaar_number} verified={editingDsa?.aadhaar_verified} />
                  <div className="flex flex-col gap-1">
                    <label className="text-[10px] font-bold text-gray-400 uppercase">Link Status</label>
                    <div className="flex items-center gap-2">
                      <span className="text-xs font-medium text-gray-700">PAN-Aadhaar Linked:</span>
                      <StatusBadge verified={editingDsa?.pan_aadhaar_linked} />
                    </div>
                  </div>
                </div>
              </div>

              {/* Banking Section */}
              <div className="space-y-4 border p-5 rounded-xl bg-gray-50/50">
                <h3 className="font-bold text-xs text-blue-700 uppercase flex items-center gap-2">
                  <RefreshCcw size={14} /> Banking Details
                </h3>
                <div className="grid grid-cols-1 gap-4">
                  <DataField label="Bank Name" value={editingDsa?.bank_name} />
                  <div className="grid grid-cols-2 gap-2">
                    <DataField label="Account Number" value={editingDsa?.bank_account_number} />
                    <DataField label="IFSC Code" value={editingDsa?.ifsc_code} />
                  </div>
                  <div className="flex flex-col gap-1">
                    <label className="text-[10px] font-bold text-gray-400 uppercase">Verification</label>
                    <StatusBadge verified={editingDsa?.bank_verified} />
                  </div>
                </div>
              </div>

              {/* Business Section */}
              <div className="space-y-4 border p-5 rounded-xl bg-gray-50/50">
                <h3 className="font-bold text-xs text-blue-700 uppercase flex items-center gap-2">
                  <AlertCircle size={14} /> Business & Address
                </h3>
                <div className="grid grid-cols-1 gap-4">
                  <DataField label="GST Number" value={editingDsa?.gst_number} verified={editingDsa?.gst_verified} />
                  <div className="flex flex-col gap-1">
                    <label className="text-[10px] font-bold text-gray-400 uppercase">Current Address</label>
                    <p className="text-sm font-medium text-gray-800 bg-white border p-2 rounded leading-relaxed">
                      {editingDsa?.current_address || "No address provided"}
                    </p>
                  </div>
                </div>
              </div>


            </div>

            {/* Modal Footer */}
            <div className="px-6 py-4 border-t border-gray-100 flex justify-end bg-gray-50">
              <button
                onClick={() => setIsModalOpen(false)}
                className="px-8 py-2 bg-gray-800 text-white rounded-lg text-sm font-bold hover:bg-gray-900 transition-all"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}