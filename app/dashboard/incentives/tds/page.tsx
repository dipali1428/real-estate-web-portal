"use client";

import React, { useState, useRef, useMemo, useEffect } from 'react';
import { Search, Upload, Download, FileText, Trash2, Plus, Loader2, ChevronLeft, ChevronRight, X } from 'lucide-react';
import { DashboardService } from '@/app/services/dashboardService';

// Updated data structure
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

  // --- NEW STATE FOR MODAL ---
  const [selectedPdf, setSelectedPdf] = useState<string | null>(null);

  // Pagination State
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;

  // ✅ FETCH API (SAFE HANDLING)
  useEffect(() => {
    const fetchTds = async () => {
      try {
        setIsLoading(true);
        const res = await DashboardService.getTdsDetails();
        console.log("Raw TDS API Response:", res);
        const safeData = Array.isArray(res?.tds)
          ? res.tds
          : res?.tds
          ? [res.tds]
          : [];
        setRecords(safeData);
      } catch (error) {
        console.error("Failed to fetch TDS data", error);
        setRecords([]);
      } finally {
        setIsLoading(false);
      }
    };
    fetchTds();
  }, []);

  // Local Filtering Logic
  const filteredRecords = useMemo(() => {
    return records.filter(record =>
      record.name?.toLowerCase().includes(searchQuery.toLowerCase()) ||
      record.adv_id?.toLowerCase().includes(searchQuery.toLowerCase()) ||
      record.pan?.toLowerCase().includes(searchQuery.toLowerCase())
    );
  }, [searchQuery, records]);

  const totalPages = Math.ceil(filteredRecords.length / itemsPerPage) || 1;
  const totalRecords = filteredRecords.length;

  // Paginated View
  const paginatedRecords = useMemo(() => {
    const start = (currentPage - 1) * itemsPerPage;
    return filteredRecords.slice(start, start + itemsPerPage);
  }, [filteredRecords, currentPage]);

  const fileInputRef = useRef<HTMLInputElement>(null);

  const triggerUpload = () => fileInputRef.current?.click();

  const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      try {
        setIsUploading(true);
        await new Promise(resolve => setTimeout(resolve, 1500));
        alert("File uploaded successfully (Simulated)");
      } catch (error) {
        console.error("Upload failed", error);
        alert("Failed to upload TDS document.");
      } finally {
        setIsUploading(false);
        if (fileInputRef.current) fileInputRef.current.value = '';
      }
    }
  };

  const downloadCSV = async () => {
    try {
      setIsExporting(true);
      await new Promise(resolve => setTimeout(resolve, 1000));
      const headers = "DSA ID,Name,PAN,Q1,Q2,Q3\n";
      const rows = records.map(r => `${r.adv_id},${r.name},${r.pan},${r.q1},${r.q2},${r.q3}`).join("\n");
      const blob = new Blob([headers + rows], { type: 'text/csv' });
      const url = window.URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = url;
      link.setAttribute('download', `TDS_Report_${new Date().toISOString().split('T')[0]}.csv`);
      document.body.appendChild(link);
      link.click();
      link.parentNode?.removeChild(link);
      window.URL.revokeObjectURL(url);
    } catch (error) {
      console.error("Export failed", error);
      alert("Failed to export TDS data.");
    } finally {
      setIsExporting(false);
    }
  };

  // --- NEW DOWNLOAD HANDLER FOR INDIVIDUAL PDF ---
  const handleDownloadPdf = async (url: string, fileName: string) => {
    try {
      const response = await fetch(url);
      const blob = await response.blob();
      const blobUrl = window.URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = blobUrl;
      link.setAttribute('download', fileName);
      document.body.appendChild(link);
      link.click();
      link.parentNode?.removeChild(link);
      window.URL.revokeObjectURL(blobUrl);
    } catch (error) {
      window.open(url, '_blank'); // Fallback if fetch is blocked
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
            <h1 className="text-2xl sm:text-3xl font-bold text-slate-700">TDS Download</h1>
            <p className="text-slate-500 mt-1 sm:mt-2 text-sm sm:text-base">You can easily download your quarterly TDS documents and certificates.</p>
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
                setCurrentPage(1);
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
                ) : paginatedRecords.length > 0 ? (
                  paginatedRecords.map((record) => (
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

                      {[1, 2, 3].map((q) => {
                        const url = record[`q${q}_pdf_url` as keyof TDS] as string;
                        return (
                          <td key={q} className="px-6 py-4 text-center">
                            {url ? (
                              <div className="flex flex-col items-center gap-2">
                                {/* Modified View Button to open Modal */}
                                <button
                                  onClick={() => setSelectedPdf(url)}
                                  className="inline-flex items-center gap-1.5 text-blue-600 hover:text-blue-800 font-medium text-xs bg-blue-50 px-2.5 py-1 rounded transition-colors"
                                >
                                  <FileText className="w-3.5 h-3.5" />
                                  View Q{q}
                                </button>
                                
                                {/* New Download Button */}
                                <button
                                  onClick={() => handleDownloadPdf(url, `TDS_${record.name}_Q${q}.pdf`)}
                                  className="inline-flex items-center gap-1.5 text-slate-600 hover:text-slate-900 font-medium text-[10px] bg-slate-100 px-2 py-0.5 rounded transition-colors"
                                >
                                  <Download className="w-3 h-3" />
                                  Download
                                </button>
                              </div>
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
              Showing {totalRecords === 0 ? 0 : (currentPage - 1) * itemsPerPage + 1} to {Math.min(currentPage * itemsPerPage, totalRecords)} of {totalRecords} records
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

      {/* --- PDF VIEW MODAL --- */}
      {selectedPdf && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm">
          <div className="relative bg-white w-full max-w-5xl h-[90vh] rounded-2xl shadow-2xl flex flex-col overflow-hidden">
            <div className="p-4 border-b flex justify-between items-center bg-white">
              <h3 className="font-bold text-slate-700">TDS Document Preview</h3>
              <button 
                onClick={() => setSelectedPdf(null)}
                className="p-2 hover:bg-slate-100 rounded-full transition-colors"
              >
                <X className="w-6 h-6 text-slate-500" />
              </button>
            </div>
            <div className="flex-1 bg-slate-100">
              <iframe 
                src={`${selectedPdf}#toolbar=0`} 
                className="w-full h-full border-none"
                title="TDS Preview"
              />
            </div>
          </div>
        </div>
      )}
    </div>
  );
}