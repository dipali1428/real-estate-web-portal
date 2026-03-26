"use client";
import React, { useEffect, useState, useCallback } from 'react';
import { AdminService } from '@/app/services/adminService';
import { 
  Search, RefreshCcw, 
  ShieldCheck, Loader2, ChevronLeft, ChevronRight 
} from 'lucide-react';

export default function KycStatusPage() {
  const [data, setData] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  
  // Pagination State
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [totalRecords, setTotalRecords] = useState(0);
  const limit = 10;

  const fetchData = useCallback(async (page: number, search: string) => {
    setLoading(true);
    try {
      const response = await AdminService.getDSAKycStatus({ 
        page, 
        limit, 
        search 
      });
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

  // Updated dependency array to include searchTerm to make it searchable
  useEffect(() => {
    fetchData(currentPage, searchTerm);
  }, [currentPage, searchTerm, fetchData]);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    setCurrentPage(1); // Reset to page 1 on new search
    fetchData(1, searchTerm);
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
                placeholder="Search Name or ID..." 
                className="pl-10 pr-4 py-2 border border-gray-200 rounded-lg outline-none text-gray-600 focus:ring-2 focus:ring-gray-100 w-64 text-sm bg-white"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            <button type="submit" className="bg-[#2076C7] text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-[#2076C7] transition-colors">
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
                  <th className="px-4 py-4 text-[11px] font-bold text-gray-500 uppercase tracking-wider">DSA Name</th>
                  <th className="px-2 py-4 text-[11px] font-bold text-gray-500 uppercase tracking-wider text-center">PAN Verified</th>
                  <th className="px-2 py-4 text-[11px] font-bold text-gray-500 uppercase tracking-wider text-center">Email Verified</th>
                  <th className="px-2 py-4 text-[11px] font-bold text-gray-500 uppercase tracking-wider text-center">Bank Verified</th>
                  <th className="px-2 py-4 text-[11px] font-bold text-gray-500 uppercase tracking-wider text-center">Aadhaar Verified</th>
                  <th className="px-2 py-4 text-[11px] font-bold text-gray-500 uppercase tracking-wider text-center">GST Verified</th>
                  <th className="px-2 py-4 text-[11px] font-bold text-gray-500 uppercase tracking-wider text-center">PAN-Aadhaar Link</th>
                  <th className="px-4 py-4 text-[11px] font-bold text-gray-500 uppercase tracking-wider text-center bg-blue-50/30">KYC Completed</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {loading ? (
                  <tr>
                    <td colSpan={9} className="py-24 text-center">
                      <Loader2 className="animate-spin text-blue-500 mx-auto mb-2" size={32} />
                      <span className="text-gray-400 text-sm">Loading records...</span>
                    </td>
                  </tr>
                ) : data.length > 0 ? (
                  data.map((item) => (
                    <tr key={item.id} className="hover:bg-gray-50/80 transition-colors">
                      <td className="px-4 py-4 text-xs font-mono text-gray-400">{item.id}</td>
                      <td className="px-4 py-4">
                        <div className="text-sm font-bold text-gray-900 leading-tight">{item.name}</div>
                      </td>
                      <td className="px-2 py-4"><StatusIndicator verified={item.pan_verified} /></td>
                      <td className="px-2 py-4"><StatusIndicator verified={item.email_verified} /></td>
                      <td className="px-2 py-4"><StatusIndicator verified={item.bank_verified} /></td>
                      <td className="px-2 py-4"><StatusIndicator verified={item.aadhaar_verified} /></td>
                      <td className="px-2 py-4"><StatusIndicator verified={item.gst_verified} /></td>
                      <td className="px-2 py-4"><StatusIndicator verified={item.pan_aadhaar_linked} /></td>
                      <td className="px-4 py-4 bg-blue-50/10">
                        <div className="flex justify-center">
                          {item.kyc_completed ? (
                            <span className="bg-[#2076C7] text-white text-[9px] font-black px-2 py-1 rounded flex items-center gap-1">
                              <ShieldCheck size={10} /> COMPLETE
                            </span>
                          ) : (
                            <span className="bg-gray-200 text-gray-500 text-[9px] font-black px-2 py-1 rounded">
                              INCOMPLETE
                            </span>
                          )}
                        </div>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan={9} className="py-20 text-center text-gray-400 text-sm">No records found.</td>
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
                className="flex items-center gap-1 px-3 py-1.5 border border-gray-300 rounded-md bg-white text-sm font-medium text-gray-700 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed transition-all"
              >
                <ChevronLeft size={16} /> Previous
              </button>

              <div className="hidden md:flex items-center gap-1">
                 {[...Array(Math.min(5, totalPages))].map((_, i) => {
                    let pageNum = currentPage <= 3 ? i + 1 : currentPage - 2 + i;
                    if (pageNum > totalPages) return null;
                    if (pageNum <= 0) return null;
                    
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
                 {totalPages > 5 && <span className="text-gray-400 px-1">...</span>}
              </div>

              <button 
                onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
                disabled={currentPage === totalPages || loading}
                className="flex items-center gap-1 px-3 py-1.5 border border-gray-300 rounded-md bg-white text-sm font-medium text-gray-700 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed transition-all"
              >
                Next <ChevronRight size={16} />
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}