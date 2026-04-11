"use client";
import React, { useState, useMemo, useEffect } from 'react';
import { 
  Download, 
  FileText, 
  Loader2, 
  X, 
  User, 
  Building2, 
  Clock,
  CheckCircle2,
  ExternalLink,
  Wallet
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { DashboardService } from '@/app/services/dashboardService';

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
  const [isLoading, setIsLoading] = useState(false);
  const [selectedPdf, setSelectedPdf] = useState<string | null>(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalDeductions, setTotalDeductions] = useState<string>("0"); 
  const itemsPerPage = 6; 

  useEffect(() => {
    const fetchData = async () => {
      try {
        setIsLoading(true);
        
        // Fetch TDS Records and Totals from the same API
        const res = await DashboardService.getTdsDetails();
        console.log("Fetched TDS Data:", res);
        
        // 1. Set Records
        const safeData = Array.isArray(res?.tds) ? res.tds : res?.tds ? [res.tds] : [];
        setRecords(safeData);

        // 2. Set Total Deductions dynamically from response (tdsTotal.sum)
        if (res?.tdsTotal?.sum) {
          const total = parseFloat(res.tdsTotal.sum);
          setTotalDeductions(total.toLocaleString('en-IN'));
        }

      } catch (error) {
        console.error("Failed to fetch dashboard data", error);
        setRecords([]);
      } finally {
        setIsLoading(false);
      }
    };
    fetchData();
  }, []);

  const filteredRecords = useMemo(() => {
    return records.filter(record =>
      record.name?.toLowerCase().includes(searchQuery.toLowerCase()) ||
      record.adv_id?.toLowerCase().includes(searchQuery.toLowerCase()) ||
      record.pan?.toLowerCase().includes(searchQuery.toLowerCase())
    );
  }, [searchQuery, records]);

  const totalPages = Math.ceil(filteredRecords.length / itemsPerPage) || 1;
  const totalRecords = filteredRecords.length;

  const paginatedRecords = useMemo(() => {
    const start = (currentPage - 1) * itemsPerPage;
    return filteredRecords.slice(start, start + itemsPerPage);
  }, [filteredRecords, currentPage]);

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
      window.open(url, '_blank');
    }
  };

  return (
    <div className="min-h-screen bg-[#F8F9FA] text-[#333] font-sans">
      <main className="max-w-7xl mx-auto px-6 py-10">
        <header className="mb-8">
          <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}>
            <h1 className="text-2xl font-semibold text-slate-800 mb-1">Tax Deducted at Source (TDS)</h1>
            <p className="text-sm text-slate-500 max-w-2xl">
              Manage and download your quarterly certificates.
            </p>
          </motion.div>
        </header>

        {/* Stats Row */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5 mb-8">
          {[
            { label: 'Active Partners', value: records.length, icon: Building2, color: 'text-[#2076C7]', bg: 'bg-blue-50' },
            { label: 'Total Deductions', value: `₹ ${totalDeductions}`, icon: Wallet, color: 'text-emerald-600', bg: 'bg-emerald-50' },
          ].map((stat, i) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.1 }}
              className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm"
            >
              <div className="flex items-center gap-4">
                <div className={`p-2.5 ${stat.bg} ${stat.color} rounded-xl`}>
                  <stat.icon size={20} />
                </div>
                <div>
                  <p className="text-[10px] font-bold uppercase tracking-wider text-slate-400">{stat.label}</p>
                  <p className="text-lg font-semibold text-slate-800">{stat.value}</p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

       
        {/* Full-Width Records */}
        <div className="space-y-6">
          {isLoading ? (
            <div className="flex flex-col items-center justify-center py-24 bg-white rounded-3xl border border-slate-100">
              <Loader2 className="w-8 h-8 animate-spin text-[#2076C7] mb-2" />
              <p className="text-xs font-medium text-slate-400">Loading records...</p>
            </div>
          ) : paginatedRecords.length > 0 ? (
            paginatedRecords.map((record, index) => (
              <motion.div
                key={record.id}
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.05 }}
                className="bg-white rounded-[2rem] border border-slate-200 p-8 shadow-sm group"
              >
                <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-4 mb-8 pb-6 border-b border-slate-50">
                  <div className="flex items-center gap-5">
                    <div className="w-14 h-14 bg-slate-50 rounded-2xl flex items-center justify-center text-slate-400 group-hover:bg-[#2076C7]/5 group-hover:text-[#2076C7] transition-colors">
                      <User size={28} />
                    </div>
                    <div>
                      <div className="flex items-center gap-2 mb-1">
                        <span className="px-2 py-0.5 rounded bg-slate-100 text-[9px] font-bold text-slate-500 uppercase tracking-tight">
                          DSA ID: {record.adv_id}
                        </span>
                        <span className="px-2 py-0.5 rounded bg-emerald-50 text-emerald-600 text-[9px] font-bold uppercase tracking-tight">
                          Active
                        </span>
                      </div>
                      <h3 className="text-lg font-semibold text-slate-800 leading-tight">{record.name}</h3>
                      <p className="text-xs text-slate-400 font-medium tracking-tight">PAN: {record.pan}</p>
                    </div>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  {[1, 2, 3].map((q) => {
                    const url = record[`q${q}_pdf_url` as keyof TDS] as string;
                    const isAvailable = !!url;
                    
                    return (
                      <div 
                        key={q} 
                        className={`p-6 rounded-[1.5rem] border transition-all flex flex-col justify-between min-h-[220px] ${
                          isAvailable 
                          ? 'bg-white border-slate-100 hover:border-[#2076C7]/20 shadow-sm' 
                          : 'bg-slate-50 border-dashed border-slate-200 opacity-60'
                        }`}
                      >
                        <div>
                          <div className="flex justify-between items-start mb-4">
                            <div className={`p-3 rounded-xl ${isAvailable ? 'bg-blue-50 text-[#2076C7]' : 'bg-slate-100 text-slate-400'}`}>
                              <FileText size={20} />
                            </div>
                            {isAvailable ? (
                              <div className="flex items-center gap-1 px-2 py-0.5 rounded-full bg-emerald-50 text-emerald-600 text-[9px] font-bold uppercase tracking-tight">
                                <CheckCircle2 size={10} /> AVAILABLE
                              </div>
                            ) : (
                              <div className="flex items-center gap-1 px-2 py-0.5 rounded-full bg-slate-100 text-slate-400 text-[9px] font-bold uppercase tracking-tight">
                                <Clock size={10} /> NOT AVAILABLE
                              </div>
                            )}
                          </div>
                          <h4 className="text-base font-semibold text-slate-800">Quarter 0{q}</h4>
                          <p className="text-[11px] text-gray-500 font-medium">TDS Certificate Form 16A</p>
                        </div>
                        
                        {isAvailable ? (
                          <div className="grid grid-cols-2 gap-2 mt-6">
                            <button
                              onClick={() => setSelectedPdf(url)}
                              className="py-2.5 rounded-xl bg-slate-100 text-slate-600 text-[11px] font-bold flex items-center justify-center gap-1.5 hover:bg-slate-200 transition-all uppercase tracking-tight"
                            >
                              <ExternalLink size={13} /> Preview
                            </button>
                            <button
                              onClick={() => handleDownloadPdf(url, `TDS_${record.name}_Q${q}.pdf`)}
                              className="py-2.5 rounded-xl bg-[#2076C7] text-white text-[11px] font-bold flex items-center justify-center gap-1.5 hover:bg-[#1a62a5] transition-all uppercase tracking-tight shadow-sm"
                            >
                              <Download size={13} /> Download
                            </button>
                          </div>
                        ) : (
                          <div className="mt-6 py-2.5 text-center border-t border-slate-100">
                            <span className="text-[15px] font-medium text-gray-500 italic">No Document uploaded</span>
                          </div>
                        )}
                      </div>
                    );
                  })}
                </div>
              </motion.div>
            ))
          ) : (
            <div className="text-center py-32 bg-white rounded-3xl border border-dashed border-slate-200">
              <p className="text-sm text-slate-400">No matching records found.</p>
            </div>
          )}
        </div>

      </main>

      {/* PDF Modal */}
      <AnimatePresence>
        {selectedPdf && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="fixed inset-0 z-[60] flex items-center justify-center p-4 bg-slate-900/40 backdrop-blur-sm">
            <motion.div initial={{ scale: 0.98, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} className="relative bg-white w-full max-w-5xl h-[85vh] rounded-[2rem] shadow-2xl flex flex-col overflow-hidden">
              <div className="px-6 py-4 border-b flex justify-between items-center bg-white">
                <div className="flex items-center gap-3">
                  <div className="p-2 bg-blue-50 text-[#2076C7] rounded-lg">
                    <FileText size={18} />
                  </div>
                  <h3 className="font-semibold text-base text-slate-800 tracking-tight">Document Preview</h3>
                </div>
                <button onClick={() => setSelectedPdf(null)} className="p-2 hover:bg-slate-100 rounded-full transition-colors">
                  <X size={20} className="text-slate-400" />
                </button>
              </div>
              <div className="flex-1 bg-slate-50 p-6">
                <iframe src={`${selectedPdf}#toolbar=0`} className="w-full h-full rounded-xl border border-slate-200 bg-white" title="TDS Preview" />
              </div>
              <div className="px-6 py-4 bg-white border-t flex justify-end gap-3">
                <button 
                   onClick={() => handleDownloadPdf(selectedPdf, 'TDS_Document.pdf')}
                   className="px-6 py-2.5 bg-[#2076C7] text-white rounded-xl font-bold text-[11px] uppercase tracking-tight hover:bg-[#1a62a5] transition-all shadow-md shadow-blue-500/10"
                >
                  Download Certificate
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}