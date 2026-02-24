'use client';

import { useState, useEffect, useRef } from 'react';
import { useRouter } from 'next/navigation';
import { AdminService } from '../../services/unlistedadminservices';
// Import your 'api' instance to handle headers automatically
import api from '../../services/api'; 
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Upload, 
  FileSpreadsheet, 
  RotateCw, 
  X,
  Info,
  Zap,
  Loader2,
  Database,
  ChevronLeft,
  Activity,
  Shield,
  Download,
  FileText,
  AlertCircle
} from "lucide-react";

const ImportExportAdmin: React.FC = () => {
  const router = useRouter();
  const [activeTab, setActiveTab] = useState<'import' | 'export'>('import');

  // States
  const [file, setFile] = useState<File | null>(null);
  const [importType, setImportType] = useState('shares_history');
  const [isImporting, setIsImporting] = useState(false);
  const [isExporting, setIsExporting] = useState<string | null>(null);
  const [progress, setProgress] = useState({ percent: 0, status: 'Waiting...' });
  const [logs, setLogs] = useState<string[]>([]);
  
  const [isClient, setIsClient] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    setIsClient(true);
  }, []);

  // --- FIXED EXPORT LOGIC (NO MORE ACCESS DENIED) ---
  const handleExport = async (type: 'shares' | 'transactions') => {
    setIsExporting(type);
    try {
      const endpoint = type === 'shares' 
        ? "/api/unlisted/admin/analytics/shares/export" 
        : "/api/unlisted/admin/analytics/transactions/export";
      
      // We use the api instance because it automatically includes the Authorization Header
      const response = await api.get(endpoint, {
        responseType: 'blob', // This tells the browser we are downloading a file
      });

      // 1. Create a URL for the downloaded data
      const url = window.URL.createObjectURL(new Blob([response.data]));
      
      // 2. Create a temporary anchor element
      const link = document.createElement('a');
      link.href = url;
      
      // 3. Set the filename
      const fileName = `${type}_export_${new Date().toISOString().split('T')[0]}.csv`;
      link.setAttribute('download', fileName);
      
      // 4. Trigger the download
      document.body.appendChild(link);
      link.click();
      
      // 5. Clean up
      link.remove();
      window.URL.revokeObjectURL(url);

    } catch (err: any) {
      console.error("Export failed", err);
      alert("Failed to export: " + (err.response?.data?.message || "Check your permissions."));
    } finally {
      setIsExporting(null);
    }
  };

  // --- IMPORT LOGIC ---
  const startImport = async () => {
    if (!file) return;
    setIsImporting(true);
    setProgress({ percent: 30, status: 'Processing...' });
    try {
      let response;
      if (importType === 'shares_history') {
        response = await (AdminService as any).uploadSharesWithHistory(file);
      } else {
        response = await (AdminService as any).uploadSharesPdfAndUpdate(file);
      }
      setProgress({ percent: 100, status: 'Completed' });
      setLogs(prev => [...prev, `[${new Date().toLocaleTimeString()}] ✓ Import Successful`]);
    } catch (err: any) {
      setLogs(prev => [...prev, `[${new Date().toLocaleTimeString()}] ✗ Error: ${err.message}`]);
      setProgress({ percent: 0, status: 'Failed' });
    } finally {
      setIsImporting(false);
    }
  };

  if (!isClient) return null;

  return (
    <div className="flex-1 space-y-6 animate-fade-in pb-10">
      
      {/* HEADER */}
      <motion.div
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-gradient-to-r from-[#2076C7] to-[#1CADA3] rounded-2xl p-6 text-white shadow-md flex justify-between items-center"
      >
        <div className="flex items-center gap-3">
          <button onClick={() => router.back()} className="p-2 hover:bg-white/10 rounded-xl transition-colors">
            <ChevronLeft className="w-5 h-5" />
          </button>
          <div>
            <h2 className="text-2xl font-bold flex items-center gap-2">
              <Database className="w-6 h-6" /> Data Portal
            </h2>
            <p className="text-sm opacity-90">Secure Import & Export</p>
          </div>
        </div>
        <div className="flex gap-2">
          <span className="px-3 py-1.5 bg-emerald-500/20 text-emerald-100 text-[10px] font-black uppercase tracking-widest rounded-lg border border-emerald-200/30 flex items-center gap-1">
            <Activity className="w-3 h-3" /> System Live
          </span>
        </div>
      </motion.div>

      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
        
        {/* TABS */}
        <div className="flex border-b border-gray-100">
          <button
            onClick={() => setActiveTab('import')}
            className={`flex-1 py-4 text-xs font-black uppercase tracking-widest flex items-center justify-center gap-2 transition-all ${
              activeTab === 'import' ? 'text-[#2076C7] border-b-2 border-[#2076C7] bg-blue-50/30' : 'text-gray-400'
            }`}
          >
            <Upload className="w-4 h-4" /> Import Data
          </button>
          <button
            onClick={() => setActiveTab('export')}
            className={`flex-1 py-4 text-xs font-black uppercase tracking-widest flex items-center justify-center gap-2 transition-all ${
              activeTab === 'export' ? 'text-[#1CADA3] border-b-2 border-[#1CADA3] bg-teal-50/30' : 'text-gray-400'
            }`}
          >
            <Download className="w-4 h-4" /> Export Excel
          </button>
        </div>

        <div className="p-6 sm:p-8">
          <AnimatePresence mode="wait">
            {activeTab === 'import' ? (
              <motion.div key="import" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="grid grid-cols-1 lg:grid-cols-12 gap-8">
                <div className="lg:col-span-8 space-y-6">
                  {!file ? (
                    <div 
                      onClick={() => fileInputRef.current?.click()}
                      className="border-2 border-dashed border-gray-200 rounded-2xl p-10 text-center cursor-pointer hover:border-[#1CADA3] transition-all"
                    >
                      <div className="w-16 h-16 bg-gray-100 rounded-2xl flex items-center justify-center mx-auto mb-4 text-gray-400">
                        <FileSpreadsheet className="w-8 h-8" />
                      </div>
                      <h4 className="text-lg font-bold text-gray-700">Upload CSV/Excel</h4>
                      <input type="file" ref={fileInputRef} onChange={(e) => setFile(e.target.files?.[0] || null)} accept=".csv, .xlsx" hidden />
                    </div>
                  ) : (
                    <div className="p-5 bg-emerald-50 border border-emerald-200 rounded-2xl flex justify-between items-center">
                      <div className="flex items-center gap-4 text-emerald-900 font-bold text-sm"><FileSpreadsheet /> {file.name}</div>
                      <button onClick={() => setFile(null)}><X className="w-4 h-4" /></button>
                    </div>
                  )}

                  <div className="flex gap-4">
                    <button 
                      onClick={startImport} 
                      disabled={!file || isImporting}
                      className="px-8 py-3.5 bg-gradient-to-r from-[#2076C7] to-[#1CADA3] text-white font-black uppercase text-xs tracking-widest rounded-xl disabled:opacity-50 flex items-center gap-3"
                    >
                      {isImporting ? <Loader2 className="animate-spin w-4 h-4" /> : <Zap className="w-4 h-4" />}
                      Execute
                    </button>
                  </div>
                </div>
              </motion.div>
            ) : (
              /* EXPORT VIEW */
              <motion.div key="export" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="grid grid-cols-1 md:grid-cols-2 gap-6">
                
                {/* Export Shares */}
                <div className="bg-white p-8 rounded-2xl border border-gray-100 shadow-sm hover:border-[#2076C7]/30 transition-all group">
                  <div className="w-12 h-12 bg-blue-50 rounded-xl flex items-center justify-center text-[#2076C7] mb-6 group-hover:scale-110 transition-transform">
                    <FileText className="w-6 h-6" />
                  </div>
                  <h4 className="text-lg font-bold text-gray-800 mb-2">Shares Master</h4>
                  <p className="text-sm text-gray-500 mb-6">Download the list of all shares for Excel auditing.</p>
                  <button 
                    disabled={isExporting !== null}
                    onClick={() => handleExport('shares')}
                    className="w-full py-3.5 bg-gray-900 text-white font-black uppercase text-[10px] tracking-widest rounded-xl hover:bg-[#2076C7] transition-all flex items-center justify-center gap-2"
                  >
                    {isExporting === 'shares' ? <Loader2 className="animate-spin w-3 h-3" /> : <Download className="w-3.5 h-3.5" />}
                    {isExporting === 'shares' ? 'Preparing...' : 'Download'}
                  </button>
                </div>

                {/* Export Transactions */}
                <div className="bg-white p-8 rounded-2xl border border-gray-100 shadow-sm hover:border-[#1CADA3]/30 transition-all group">
                  <div className="w-12 h-12 bg-teal-50 rounded-xl flex items-center justify-center text-[#1CADA3] mb-6 group-hover:scale-110 transition-transform">
                    <Activity className="w-6 h-6" />
                  </div>
                  <h4 className="text-lg font-bold text-gray-800 mb-2">Transactions</h4>
                  <p className="text-sm text-gray-500 mb-6">Full audit log of user Buy/Sell activities.</p>
                  <button 
                    disabled={isExporting !== null}
                    onClick={() => handleExport('transactions')}
                    className="w-full py-3.5 bg-gray-900 text-white font-black uppercase text-[10px] tracking-widest rounded-xl hover:bg-[#1CADA3] transition-all flex items-center justify-center gap-2"
                  >
                    {isExporting === 'transactions' ? <Loader2 className="animate-spin w-3 h-3" /> : <Download className="w-3.5 h-3.5" />}
                    {isExporting === 'transactions' ? 'Preparing...' : 'Download'}
                  </button>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
};

export default ImportExportAdmin;