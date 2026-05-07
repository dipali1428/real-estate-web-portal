"use client";
import React, { useState, useRef, useEffect } from 'react';
import { Search, Download, FileText, Plus, Loader2, ChevronLeft, ChevronRight } from 'lucide-react';
import { AdminService } from '../../services/adminService';
import toast from 'react-hot-toast';

interface TDS {
  id: number;
  user_id: number;
  adv_id: string;
  name: string;
  pan: string;
  q1: number;
  q2: number;
  q3: number;
  q_total: number;
  q1_pdf_url: string | null;
  q2_pdf_url: string | null;
  q3_pdf_url: string | null;
  updated_at: string;
}

export default function TDSManagement() {
  const [records, setRecords] = useState<TDS[]>([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [isExporting, setIsExporting] = useState(false);
  const [isUploading, setIsUploading] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  // Pagination State
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [totalRecords, setTotalRecords] = useState(0);

  const fileInputRef = useRef<HTMLInputElement>(null);

  // Fetch data when page or search changes
  useEffect(() => {
    fetchTDSData();
  }, [currentPage, searchQuery]);

  const fetchTDSData = async () => {
    try {
      setIsLoading(true);
      const response = await AdminService.getTDSData({
        page: currentPage,
        limit: 10,
        search: searchQuery
      });

      if (response.success) {
        setRecords(response.data);
        setTotalPages(response.totalPages);
        setTotalRecords(response.total);
      }
    } catch (error) {
      toast.error("Failed to fetch TDS records");
    } finally {
      setIsLoading(false);
    }
  };

  const triggerUpload = () => fileInputRef.current?.click();

  const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      try {
        setIsUploading(true);
        await AdminService.uploadTDS(file);
        fetchTDSData(); // Refresh list
      } catch (error) {
        toast.error("Failed to upload file. Please try again.");
      } finally {
        setIsUploading(false);
        if (fileInputRef.current) fileInputRef.current.value = '';
      }
    }
  };

  const downloadCSV = async () => {
    try {
      setIsExporting(true);
      const response = await AdminService.exportTDS();
      const blob = new Blob([response.data], { type: 'text/csv' });
      const url = window.URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = url;
      link.setAttribute('download', `TDS_Report_${new Date().toISOString().split('T')[0]}.csv`);
      document.body.appendChild(link);
      link.click();
      link.parentNode?.removeChild(link);
      window.URL.revokeObjectURL(url);
    } catch (error) {
      toast.error("Failed to export TDS records");
    } finally {
      setIsExporting(false);
    }
  };

  const deleteRecord = (id: number) => {
    if (confirm("Are you sure you want to delete this record?")) {
      setRecords(records.filter(r => r.id !== id));
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 p-6 lg:p-12 text-slate-900">
      <div className="max-w-7xl mx-auto">

        <div className="mb-8 flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <h1 className="text-3xl font-bold tracking-tight text-slate-900">TDS Management</h1>
            <p className="text-slate-500 mt-1">Manage quarterly TDS documents and certificates.</p>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={downloadCSV}
              disabled={isExporting}
              className="flex items-center gap-2 bg-white border border-slate-200 px-4 py-2 rounded-lg text-sm font-semibold hover:bg-slate-50 transition shadow-sm disabled:opacity-50"
            >
              {isExporting ? <Loader2 className="w-4 h-4 animate-spin" /> : <Download className="w-4 h-4" />}
              {isExporting ? "Exporting..." : "Export CSV"}
            </button>

            <button
              onClick={triggerUpload}
              disabled={isUploading}
              className="flex items-center gap-2 bg-blue-600 px-4 py-2 rounded-lg text-sm font-semibold text-white hover:bg-blue-700 transition shadow-sm disabled:opacity-50"
            >
              {isUploading ? <Loader2 className="w-4 h-4 animate-spin" /> : <Plus className="w-4 h-4" />}
              {isUploading ? "Uploading..." : "Upload New TDS"}
            </button>
            <input type="file" ref={fileInputRef} onChange={handleFileUpload} className="hidden" accept=".pdf" />
          </div>
        </div>

        <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-sm mb-6">
          <div className="relative w-full max-w-md">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 w-4 h-4" />
            <input
              type="text"
              placeholder="Search by DSA ID, Name or PAN..."
              className="w-full pl-10 pr-4 py-2 rounded-lg border border-slate-200 focus:outline-none focus:ring-2 focus:ring-blue-500"
              value={searchQuery}
              onChange={(e) => {
                setSearchQuery(e.target.value);
                setCurrentPage(1); // Reset to page 1 on search
              }}
            />
          </div>
        </div>

        <div className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-slate-50 border-b border-slate-200">
                  <th className="px-6 py-4 text-sm font-semibold text-slate-600">DSA Details</th>
                  <th className="px-6 py-4 text-sm font-semibold text-slate-600 text-center">Quarter 1</th>
                  <th className="px-6 py-4 text-sm font-semibold text-slate-600 text-center">Quarter 2</th>
                  <th className="px-6 py-4 text-sm font-semibold text-slate-600 text-center">Quarter 3</th>

                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {isLoading ? (
                  <tr>
                    <td colSpan={5} className="px-6 py-12 text-center">
                      <Loader2 className="w-8 h-8 animate-spin mx-auto text-blue-600" />
                    </td>
                  </tr>
                ) : records.length > 0 ? (
                  records.map((record) => (
                    <tr key={record.id} className="hover:bg-slate-50/80 transition-colors">
                      <td className="px-6 py-4">
                        <div className="flex flex-col">
                          <span className="font-mono text-[10px] font-bold bg-slate-100 text-slate-700 px-2 py-0.5 rounded w-fit mb-1">
                            {record.adv_id}
                          </span>
                          <p className="font-medium text-slate-800">{record.name}</p>
                          <p className="text-xs text-slate-400">PAN: {record.pan}</p>
                        </div>
                      </td>

                      {/* Quarter columns using your specific pdf_url fields */}
                      {[1, 2, 3].map((q) => {
                        const url = record[`q${q}_pdf_url` as keyof TDS];
                        return (
                          <td key={q} className="px-6 py-4 text-center">
                            {url ? (
                              <a
                                href={url as string}
                                target="_blank"
                                rel="noreferrer"
                                className="inline-flex items-center gap-1.5 text-blue-600 hover:text-blue-800 font-medium text-xs bg-blue-50 px-2 py-1 rounded"
                              >
                                <FileText className="w-3.5 h-3.5" />
                                View Q{q}
                              </a>
                            ) : (
                              <span className="text-gray-500 text-xs italic">Not Available</span>
                            )}
                          </td>
                        );
                      })}


                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan={5} className="px-6 py-12 text-center text-slate-400 italic">
                      No TDS records found.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>

          <div className="px-6 py-4 bg-slate-50 border-t border-slate-200 flex justify-between items-center">
            <p className="text-xs text-slate-500">
              Showing {(currentPage - 1) * 10 + 1} to {Math.min(currentPage * 10, totalRecords)} of {totalRecords} records
            </p>
            <div className="flex gap-2">
              <button
                disabled={currentPage === 1 || isLoading}
                onClick={() => setCurrentPage(p => p - 1)}
                className="p-1 rounded border bg-white disabled:opacity-50"
              >
                <ChevronLeft className="w-4 h-4" />
              </button>
              <span className="text-sm font-medium px-2 py-1">Page {currentPage} of {totalPages}</span>
              <button
                disabled={currentPage === totalPages || isLoading}
                onClick={() => setCurrentPage(p => p + 1)}
                className="p-1 rounded border bg-white disabled:opacity-50"
              >
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}