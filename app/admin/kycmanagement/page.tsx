"use client";
import React, { useEffect, useState, useCallback } from 'react';
import { AdminService } from '@/app/services/adminService';
import {
  Search, RefreshCcw,
  ShieldCheck, Loader2, ChevronLeft, ChevronRight,
  Edit, X
} from 'lucide-react';
import toast from 'react-hot-toast';

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
      const response = await AdminService.getDSAKycStatus({ page, limit, search });
      if (response.success) {
        setData(response.data || []);
        setTotalPages(response.totalPages || 1);
        setTotalRecords(response.total || 0);
      }
    } catch (err) {
      // console.error("Fetch Error:", err);
      toast.error("Failed to fetch data. Please try again.");
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

  const handleInputChange = (field: string, value: any) => {
    setEditingDsa((prev: any) => ({ ...prev, [field]: value }));
  };

  const handleSave = async () => {
    if (!editingDsa) return;
    setSaveLoading(true);
    try {
      const payload = {
        bank_name: editingDsa.bank_name,
        pan: editingDsa.pan,
        pan_verified: !!editingDsa.pan_verified,
        email: editingDsa.email,
        email_verified: !!editingDsa.email_verified,
        bank_account_number: editingDsa.bank_account_number,
        ifsc_code: editingDsa.ifsc_code,
        bank_verified: !!editingDsa.bank_verified,
        aadhaar_number: editingDsa.aadhaar_number,
        aadhaar_verified: !!editingDsa.aadhaar_verified,
        gst_number: editingDsa.gst_number,
        gst_verified: !!editingDsa.gst_verified,
        kyc_completed: !!editingDsa.kyc_completed,
        phone_number: editingDsa.phone_number,
        mobile: editingDsa.phone_number,
        phone_verified: !!editingDsa.phone_verified,
        pan_aadhaar_linked: !!editingDsa.pan_aadhaar_linked,
        current_address: editingDsa.current_address,
      };

      const res = await AdminService.updateDSAKycStatus(editingDsa.id, payload);
      if (res.success) {
        setData(prev => prev.map(item => item.id === editingDsa.id ? { ...item, ...payload } : item));
        toast.success("KYC status updated successfully");
        setIsModalOpen(false);
      } else {
        toast.error(res.message || "Update failed");
      }
    } catch (error) {
      // console.error("Update Error:", error);
      toast.error("An error occurred while saving. Please try again.");
      // alert("An error occurred during save.");
    } finally {
      setSaveLoading(false);
    }
  };

  const StatusIndicator = ({ verified }: { verified: any }) => {
    const isVerified = verified === true || verified === "true" || verified === 1 || verified === "1" || verified === "Yes";
    return (
      <div className="flex justify-center">
        {isVerified ? (
          <div className="flex items-center gap-1 text-emerald-600 text-[13px] font-bold">
            Verified
          </div>
        ) : (
          <div className="flex items-center gap-1 text-rose-500 text-[13px] font-bold">
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
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-gray-50/50 border-b border-gray-200">
                  <th className="px-4 py-4 text-[11px] font-bold text-gray-500 uppercase tracking-wider">ID</th>
                  <th className="px-4 py-4 text-[11px] font-bold text-gray-500 uppercase tracking-wider">DSA Details</th>
                  <th className="px-2 py-4 text-[11px] font-bold text-gray-500 uppercase tracking-wider text-center">PAN Verified</th>
                  <th className="px-2 py-4 text-[11px] font-bold text-gray-500 uppercase tracking-wider text-center">Aadhaar Verified</th>
                  <th className="px-2 py-4 text-[11px] font-bold text-gray-500 uppercase tracking-wider text-center">PAN-Aadhaar Link</th>
                  <th className="px-2 py-4 text-[11px] font-bold text-gray-500 uppercase tracking-wider text-center">Email Verified</th>
                  <th className="px-2 py-4 text-[11px] font-bold text-gray-500 uppercase tracking-wider text-center">Phone Verified</th>
                  <th className="px-2 py-4 text-[11px] font-bold text-gray-500 uppercase tracking-wider text-center">Bank Verified</th>
                  <th className="px-2 py-4 text-[11px] font-bold text-gray-500 uppercase tracking-wider text-center">GST Verified</th>
                  <th className="px-4 py-4 text-[11px] font-bold text-gray-500 uppercase tracking-wider text-center bg-blue-50/30">KYC Completed</th>
                  <th className="px-4 py-4 text-[11px] font-bold text-gray-500 uppercase tracking-wider text-right">Action</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {loading ? (
                  <tr>
                    <td colSpan={11} className="py-24 text-center">
                      <Loader2 className="animate-spin text-blue-500 mx-auto mb-2" size={32} />
                      <span className="text-gray-400 text-sm">Loading records...</span>
                    </td>
                  </tr>
                ) : data.length > 0 ? (
                  data.map((item) => (
                    <tr key={item.id} className="hover:bg-gray-50/80 transition-colors">
                      <td className="px-4 py-4 text-[12px] font-sans text-gray-700">{item.id}</td>
                      <td className="px-4 py-4">
                        <div className="text-sm font-bold text-gray-900 leading-tight">{item.name}</div>
                        <div className="text-xs text-gray-500 leading-tight">{item.adv_id}</div>
                      </td>
                      <td className="px-2 py-4"><StatusIndicator verified={item.pan_verified} /></td>
                      <td className="px-2 py-4"><StatusIndicator verified={item.aadhaar_verified} /></td>
                      <td className="px-2 py-4"><StatusIndicator verified={item.pan_aadhaar_linked} /></td>
                      <td className="px-2 py-4"><StatusIndicator verified={item.email_verified} /></td>
                      <td className="px-2 py-4"><StatusIndicator verified={item.phone_verified} /></td>
                      <td className="px-2 py-4"><StatusIndicator verified={item.bank_verified} /></td>
                      <td className="px-2 py-4"><StatusIndicator verified={item.gst_verified} /></td>
                      <td className="px-4 py-4 bg-blue-50/10">
                        <div className="flex justify-center">
                          {item.kyc_completed ? (
                            <span className="bg-[#1CADA3] text-white text-[12px] font-bold px-2 py-1 rounded flex items-center gap-1">
                              <ShieldCheck size={14} /> COMPLETE
                            </span>
                          ) : (
                            <span className="bg-gray-200 text-gray-500 text-[12px] font-black px-2 py-1 rounded">INCOMPLETE</span>
                          )}
                        </div>
                      </td>
                      <td className="px-4 py-4 text-right">
                        <button
                          onClick={() => handleOpenEdit(item)}
                          className="inline-flex items-center gap-1 px-3 py-1.5 bg-[#2076C7] text-white rounded text-[11px] font-bold hover:bg-[#1a65ad] transition-all active:scale-95"
                        >
                          <Edit size={12} /> View & Update
                        </button>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan={11} className="py-20 text-center text-gray-400 text-sm">No records found.</td>
                  </tr>
                )}
              </tbody>
            </table>
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
                  const pageNum = currentPage <= 3 ? i + 1 : currentPage - 2 + i;
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
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm">
          <div className="bg-white rounded-2xl shadow-2xl w-full max-w-4xl max-h-[90vh] overflow-hidden flex flex-col scale-in-center">
            <div className="px-6 py-4 border-b border-gray-100 flex items-center justify-between bg-gray-50">
              <h2 className="text-lg font-bold text-gray-900">Update KYC: {editingDsa?.name}</h2>
              <button onClick={() => setIsModalOpen(false)} className="p-2 hover:bg-gray-200 rounded-full transition-colors">
                <X size={20} className="text-gray-500" />
              </button>
            </div>

            <div className="p-6 overflow-y-auto grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Banking Section */}
              <div className="space-y-4 border p-4 rounded-xl bg-gray-50/50">
                <h3 className="font-bold text-sm text-blue-700 uppercase tracking-wider">Banking Details</h3>
                <div>
                  <label className="block text-xs font-semibold text-gray-600 mb-1">Bank Name</label>
                  <input type="text" value={editingDsa?.bank_name || ""} onChange={(e) => handleInputChange('bank_name', e.target.value)} className="w-full text-gray-700 border rounded px-3 py-2 text-sm focus:ring-2 focus:ring-blue-100 outline-none" />
                </div>
                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block text-xs font-semibold text-gray-600 mb-1">Account Number</label>
                    <input type="text" value={editingDsa?.bank_account_number || ""} onChange={(e) => handleInputChange('bank_account_number', e.target.value)} className="w-full text-gray-700 border rounded px-3 py-2 text-sm focus:ring-2 focus:ring-blue-100 outline-none" />
                  </div>
                  <div>
                    <label className="block text-xs font-semibold text-gray-600 mb-1">IFSC Code</label>
                    <input type="text" value={editingDsa?.ifsc_code || ""} onChange={(e) => handleInputChange('ifsc_code', e.target.value)} className="w-full text-gray-700 border rounded px-3 py-2 text-sm focus:ring-2 focus:ring-blue-100 outline-none" />
                  </div>
                </div>
                <label className="flex items-center gap-2 cursor-pointer pt-2">
                  <input type="checkbox" checked={!!editingDsa?.bank_verified} onChange={(e) => handleInputChange('bank_verified', e.target.checked)} className="w-4 h-4 accent-blue-600" />
                  <span className="text-sm font-medium text-gray-700">Mark Bank as Verified</span>
                </label>
              </div>

              {/* Identity Section */}
              <div className="space-y-4 border p-4 rounded-xl bg-gray-50/50">
                <h3 className="font-bold text-sm text-blue-700 uppercase tracking-wider">Identity Details</h3>
                <div>
                  <label className="block text-xs font-semibold text-gray-600 mb-1">PAN Number</label>
                  <input
                    type="text"
                    value={editingDsa?.pan || ""}
                    onChange={(e) => handleInputChange('pan', e.target.value)}
                    className="w-full text-gray-700 border rounded px-3 py-2 text-sm focus:ring-2 focus:ring-blue-100 outline-none uppercase"
                  />
                </div>
                <label className="flex items-center gap-2 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={!!editingDsa?.pan_verified}
                    onChange={(e) => handleInputChange('pan_verified', e.target.checked)}
                    className="w-4 h-4 accent-blue-600"
                  />
                  <span className="text-sm font-medium text-gray-700">PAN Verified</span>
                </label>
                <div>
                  <label className="block text-xs font-semibold text-gray-600 mb-1">Aadhaar Number</label>
                  <input type="text" value={editingDsa?.aadhaar_number || ""} onChange={(e) => handleInputChange('aadhaar_number', e.target.value)} className="w-full text-gray-700 border rounded px-3 py-2 text-sm focus:ring-2 focus:ring-blue-100 outline-none" />
                </div>
                <div className="space-y-2 pt-2">
                  <label className="flex items-center gap-2 cursor-pointer">
                    <input type="checkbox" checked={!!editingDsa?.aadhaar_verified} onChange={(e) => handleInputChange('aadhaar_verified', e.target.checked)} className="w-4 h-4 accent-blue-600" />
                    <span className="text-sm font-medium text-gray-700">Aadhaar Verified</span>
                  </label>
                  <label className="flex items-center gap-2 cursor-pointer">
                    <input type="checkbox" checked={!!editingDsa?.pan_aadhaar_linked} onChange={(e) => handleInputChange('pan_aadhaar_linked', e.target.checked)} className="w-4 h-4 accent-blue-600" />
                    <span className="text-sm font-medium text-gray-700">PAN-Aadhaar Linked</span>
                  </label>
                </div>
              </div>

              {/* Business/Other Section */}
              <div className="space-y-4 border p-4 rounded-xl bg-gray-50/50 md:col-span-2">
                <h3 className="font-bold text-sm text-blue-700 uppercase tracking-wider">Business & Contact</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-semibold text-gray-600 mb-1">Phone Number</label>
                    <input
                      type="text"
                      value={editingDsa?.phone_number || ""}
                      onChange={(e) => handleInputChange('phone_number', e.target.value)}
                      className="w-full text-gray-700 border rounded px-3 py-2 text-sm focus:ring-2 focus:ring-blue-100 outline-none"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-semibold text-gray-600 mb-1">Email Address</label>
                    <input
                      type="email"
                      value={editingDsa?.email || ""}
                      onChange={(e) => handleInputChange('email', e.target.value)}
                      className="w-full text-gray-700 border rounded px-3 py-2 text-sm focus:ring-2 focus:ring-blue-100 outline-none"
                    />
                  </div>
                  <label className="flex items-center gap-2 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={!!editingDsa?.phone_verified}
                      onChange={(e) => handleInputChange('phone_verified', e.target.checked)}
                      className="w-4 h-4 accent-blue-600"
                    />
                    <span className="text-sm font-medium text-gray-700">Phone Number Verified</span>
                  </label>
                  <label className="flex items-center gap-2 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={!!editingDsa?.email_verified}
                      onChange={(e) => handleInputChange('email_verified', e.target.checked)}
                      className="w-4 h-4 accent-blue-600"
                    />
                    <span className="text-sm font-medium text-gray-700">Email Verified</span>
                  </label>
                  <div>
                    <label className="block text-xs font-semibold text-gray-600 mb-1">GST Number</label>
                    <input type="text" value={editingDsa?.gst_number || ""} onChange={(e) => handleInputChange('gst_number', e.target.value)} className="w-full text-gray-700 border rounded px-3 py-2 text-sm focus:ring-2 focus:ring-blue-100 outline-none" />
                  </div>
                  <div>
                    <label className="block text-xs font-semibold text-gray-600 mb-1">Current Address</label>
                    <textarea value={editingDsa?.current_address || ""} onChange={(e) => handleInputChange('current_address', e.target.value)} className="w-full text-gray-700 border rounded px-3 h-10 py-2 text-sm focus:ring-2 focus:ring-blue-100 outline-none resize-none" />
                  </div>
                  <label className="flex items-center gap-2 cursor-pointer">
                    <input type="checkbox" checked={!!editingDsa?.gst_verified} onChange={(e) => handleInputChange('gst_verified', e.target.checked)} className="w-4 h-4 accent-blue-600" />
                    <span className="text-sm font-medium text-gray-700">GST Verified</span>
                  </label>
                </div>
              </div>
              <div className="pt-4 border-t border-blue-100 md:col-span-2 flex justify-center">
                <label className="flex items-center gap-2 cursor-pointer">
                  <input type="checkbox" checked={!!editingDsa?.kyc_completed} onChange={(e) => handleInputChange('kyc_completed', e.target.checked)} className="w-5 h-5 accent-[#2076C7]" />
                  <span className="text-base font-bold text-[#2076C7]">MARK KYC AS FULLY COMPLETE</span>
                </label>
              </div>
            </div>

            <div className="px-6 py-4 border-t border-gray-100 flex justify-end gap-3 bg-gray-50">
              <button onClick={() => setIsModalOpen(false)} className="px-4 py-2 text-sm font-medium text-gray-600 hover:bg-gray-200 rounded-lg transition-colors">Cancel</button>
              <button
                onClick={handleSave}
                disabled={saveLoading}
                className="flex items-center gap-2 px-6 py-2 bg-[#2076C7] text-white rounded-lg text-sm font-bold hover:bg-[#1a65ad] disabled:opacity-50 transition-all"
              >
                {saveLoading ? <Loader2 size={16} className="animate-spin" /> : "Save Changes"}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}