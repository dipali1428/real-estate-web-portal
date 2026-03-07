'use client';

import { useState, useEffect, useRef } from 'react';
import { useRouter } from 'next/navigation';
import { AdminService } from '../../services/unlistedadminservices';
import api from '../../services/api'; 
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Upload, 
  FileSpreadsheet, 
  X,
  Zap,
  Loader2,
  Database,
  Download,
  CheckCircle,
  AlertCircle,
  RefreshCw,
  Package,
  History,
  Clock
} from "lucide-react";

const ImportExportAdmin: React.FC = () => {
  const router = useRouter();

  // States
  const [file, setFile] = useState<File | null>(null);
  const [importType, setImportType] = useState<'history' | 'daily'>('history');
  const [isImporting, setIsImporting] = useState(false);
  const [isExporting, setIsExporting] = useState(false);
  const [progress, setProgress] = useState({ percent: 0, status: 'Waiting...' });
  const [logs, setLogs] = useState<string[]>([]);
  const [toast, setToast] = useState<{ message: string; type: 'success' | 'error' | 'info' } | null>(null);
  const [importResult, setImportResult] = useState<{
    rowsProcessed?: number;
    rowsSkipped?: number;
    mode?: string;
    applySoftDelete?: boolean;
  } | null>(null);
  
  const [isClient, setIsClient] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    setIsClient(true);
  }, []);

  // --- EXPORT SHARES ONLY ---
  const handleExportShares = async () => {
    setIsExporting(true);
    setToast({ message: 'Preparing export...', type: 'info' });
    
    try {
      const endpoint = "/api/unlisted/admin/analytics/shares/export";
      
      const response = await api.get(endpoint, {
        responseType: 'blob',
      });

      const url = window.URL.createObjectURL(new Blob([response.data]));
      const link = document.createElement('a');
      link.href = url;
      
      const fileName = `shares_export_${new Date().toISOString().split('T')[0]}.csv`;
      link.setAttribute('download', fileName);
      
      document.body.appendChild(link);
      link.click();
      
      link.remove();
      window.URL.revokeObjectURL(url);

      // Success message
      const successMsg = '✓ Shares exported successfully';
      setLogs(prev => [...prev, `[${new Date().toLocaleTimeString()}] ${successMsg}`]);
      setToast({ message: successMsg, type: 'success' });
      
      // Auto-hide toast after 3 seconds
      setTimeout(() => setToast(null), 3000);

    } catch (err: any) {
      console.error("Export failed", err);
      const errorMsg = `✗ Export failed: ${err.response?.data?.message || err.message}`;
      setLogs(prev => [...prev, `[${new Date().toLocaleTimeString()}] ${errorMsg}`]);
      setToast({ message: errorMsg, type: 'error' });
      
      // Auto-hide toast after 5 seconds for errors
      setTimeout(() => setToast(null), 5000);
    } finally {
      setIsExporting(false);
    }
  };

  // --- IMPORT LOGIC WITH MODE SELECTION ---
  const startImport = async () => {
    if (!file) {
      setToast({ message: 'Please select a file first', type: 'error' });
      setTimeout(() => setToast(null), 3000);
      return;
    }
    
    setIsImporting(true);
    setProgress({ percent: 30, status: 'Processing...' });
    setToast({ message: `Importing file with ${importType} mode...`, type: 'info' });
    setLogs(prev => [...prev, `[${new Date().toLocaleTimeString()}] Starting ${importType} import of ${file.name}...`]);
    setImportResult(null);
    
    try {
      let response;
      
      if (importType === 'history') {
        // Call history mode API
        response = await AdminService.uploadSharesWithHistoryMode(file);
      } else {
        // Call daily mode API
        response = await AdminService.uploadSharesWithDailyMode(file);
      }
      
      setProgress({ percent: 100, status: 'Completed' });
      
      // Store import result for display
      setImportResult({
        rowsProcessed: response.rowsProcessed,
        rowsSkipped: response.rowsSkipped,
        mode: response.mode,
        applySoftDelete: response.applySoftDelete
      });
      
      // Success message
      const successMsg = `✓ File imported successfully in ${importType} mode (${response.rowsProcessed} rows processed)`;
      setLogs(prev => [...prev, `[${new Date().toLocaleTimeString()}] ${successMsg}`]);
      setToast({ message: successMsg, type: 'success' });
      
      // Clear file after successful import (delayed)
      setTimeout(() => {
        setFile(null);
        setProgress({ percent: 0, status: 'Waiting...' });
        setToast(null);
      }, 3000);
      
    } catch (err: any) {
      const errorMsg = `✗ Import failed: ${err.response?.data?.message || err.message}`;
      setLogs(prev => [...prev, `[${new Date().toLocaleTimeString()}] ${errorMsg}`]);
      setProgress({ percent: 0, status: 'Failed' });
      setToast({ message: errorMsg, type: 'error' });
      setImportResult(null);
      
      // Auto-hide error toast after 5 seconds
      setTimeout(() => setToast(null), 5000);
    } finally {
      setIsImporting(false);
    }
  };

  const clearLogs = () => {
    setLogs([]);
    setImportResult(null);
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
          <div>
            <h2 className="text-2xl font-bold flex items-center gap-2">
              <Database className="w-6 h-6" /> Data Portal
            </h2>
            <p className="text-sm opacity-90">Import & export shares data</p>
          </div>
        </div>
      </motion.div>

      {/* Toast Message */}
      <AnimatePresence>
        {toast && (
          <motion.div
            initial={{ opacity: 0, y: -20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -20, scale: 0.95 }}
            className={`fixed top-24 right-6 z-50 flex items-center gap-3 px-4 py-3 rounded-xl shadow-lg border ${
              toast.type === 'success' 
                ? 'bg-emerald-50 border-emerald-200 text-emerald-700' 
                : toast.type === 'error'
                ? 'bg-red-50 border-red-200 text-red-700'
                : 'bg-blue-50 border-blue-200 text-blue-700'
            }`}
          >
            {toast.type === 'success' ? (
              <CheckCircle className="w-5 h-5" />
            ) : toast.type === 'error' ? (
              <AlertCircle className="w-5 h-5" />
            ) : (
              <RefreshCw className="w-5 h-5" />
            )}
            <span className="text-sm font-medium">{toast.message}</span>
            <button 
              onClick={() => setToast(null)}
              className="p-1 hover:bg-black/5 rounded-lg transition-colors"
            >
              <X className="w-4 h-4" />
            </button>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Main Content - Two Column Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        
        {/* LEFT COLUMN - IMPORT SECTION */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.1 }}
          className="bg-white rounded-2xl shadow-lg border border-gray-100 overflow-hidden"
        >
          <div className="bg-gradient-to-r from-blue-50 to-indigo-50 px-6 py-4 border-b border-blue-100">
            <h3 className="font-bold text-gray-800 flex items-center gap-2">
              <Upload className="w-5 h-5 text-[#2076C7]" />
              Import Share Data
            </h3>
          </div>

          <div className="p-6 space-y-6">
            {/* Import Type Tabs */}
            <div>
              <label className="text-[10px] font-black uppercase text-gray-400 mb-2 block">Import Mode</label>
              <div className="grid grid-cols-2 gap-2 p-1 bg-gray-100 rounded-xl">
                <button
                  onClick={() => setImportType('history')}
                  className={`flex items-center justify-center gap-2 px-4 py-3 rounded-lg text-sm font-medium transition-all ${
                    importType === 'history'
                      ? 'bg-white text-[#2076C7] shadow-sm'
                      : 'text-gray-600 hover:text-gray-900'
                  }`}
                >
                  <History className="w-4 h-4" />
                  History Mode
                </button>
                <button
                  onClick={() => setImportType('daily')}
                  className={`flex items-center justify-center gap-2 px-4 py-3 rounded-lg text-sm font-medium transition-all ${
                    importType === 'daily'
                      ? 'bg-white text-[#2076C7] shadow-sm'
                      : 'text-gray-600 hover:text-gray-900'
                  }`}
                >
                  <Clock className="w-4 h-4" />
                  Daily Mode
                </button>
              </div>
              
              {/* Mode description */}
              <p className="mt-2 text-xs text-gray-500">
                {importType === 'history' 
                  ? '📊 History mode: Updates share master and price history with soft delete'
                  : '📈 Daily mode: Updates only daily prices without soft delete'}
              </p>
            </div>

            {/* File Upload Area */}
            {!file ? (
              <div 
                onClick={() => fileInputRef.current?.click()}
                className="border-2 border-dashed border-gray-200 rounded-2xl p-8 text-center cursor-pointer hover:border-[#1CADA3] transition-all group"
              >
                <div className="w-16 h-16 bg-gray-100 rounded-2xl flex items-center justify-center mx-auto mb-4 text-gray-400 group-hover:scale-110 transition-transform group-hover:text-[#2076C7]">
                  <FileSpreadsheet className="w-8 h-8" />
                </div>
                <h4 className="text-lg font-bold text-gray-700 mb-1">Click to upload</h4>
                <p className="text-xs text-gray-500">CSV or Excel files only</p>
                <input 
                  type="file" 
                  ref={fileInputRef} 
                  onChange={(e) => setFile(e.target.files?.[0] || null)} 
                  accept=".csv, .xlsx, .xls" 
                  hidden 
                />
              </div>
            ) : (
              <div className="p-4 bg-emerald-50 border border-emerald-200 rounded-xl flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-emerald-100 rounded-lg flex items-center justify-center text-emerald-600">
                    <FileSpreadsheet className="w-5 h-5" />
                  </div>
                  <div>
                    <p className="font-bold text-gray-800 text-sm">{file.name}</p>
                    <p className="text-xs text-gray-500">{(file.size / 1024).toFixed(2)} KB</p>
                  </div>
                </div>
                <button 
                  onClick={() => setFile(null)}
                  className="p-1.5 hover:bg-emerald-200 rounded-lg transition-colors"
                  disabled={isImporting}
                >
                  <X className="w-4 h-4 text-emerald-600" />
                </button>
              </div>
            )}

            {/* Progress Bar */}
            {progress.percent > 0 && (
              <div className="space-y-2">
                <div className="flex justify-between text-xs">
                  <span className="font-medium text-gray-600">{progress.status}</span>
                  <span className="font-bold text-[#2076C7]">{progress.percent}%</span>
                </div>
                <div className="w-full h-2 bg-gray-100 rounded-full overflow-hidden">
                  <motion.div 
                    initial={{ width: 0 }}
                    animate={{ width: `${progress.percent}%` }}
                    className="h-full bg-gradient-to-r from-[#2076C7] to-[#1CADA3]"
                  />
                </div>
              </div>
            )}

            {/* Execute Button */}
            <button 
              onClick={startImport} 
              disabled={!file || isImporting}
              className="w-full py-4 bg-gradient-to-r from-[#2076C7] to-[#1CADA3] text-white font-black uppercase text-xs tracking-widest rounded-xl disabled:opacity-50 flex items-center justify-center gap-3 shadow-lg shadow-blue-100"
            >
              {isImporting ? (
                <>
                  <Loader2 className="animate-spin w-4 h-4" />
                  Importing...
                </>
              ) : (
                <>
                  <Zap className="w-4 h-4" />
                  Import file ({importType === 'history' ? 'History' : 'Daily'} mode)
                </>
              )}
            </button>
          </div>
        </motion.div>

        {/* RIGHT COLUMN - EXPORT SECTION (Shares Only) */}
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.2 }}
          className="bg-white rounded-2xl shadow-lg border border-gray-100 overflow-hidden"
        >
          <div className="bg-gradient-to-r from-emerald-50 to-teal-50 px-6 py-4 border-b border-emerald-100">
            <h3 className="font-bold text-gray-800 flex items-center gap-2">
              <Download className="w-5 h-5 text-emerald-600" />
              Export Shares Master
            </h3>
          </div>

          <div className="p-6">
            <div className="bg-gradient-to-br from-gray-50 to-white rounded-2xl p-8 border border-gray-100 text-center">
              <div className="w-20 h-20 bg-emerald-100 rounded-2xl flex items-center justify-center mx-auto mb-6 text-emerald-600">
                <Package className="w-10 h-10" />
              </div>
              
              <h4 className="text-xl font-bold text-gray-800 mb-2">Shares Export Data</h4>
              <p className="text-sm text-gray-500 mb-8 max-w-md mx-auto">
                Download complete list of all shares with current prices, lot sizes, and depository information for auditing purposes.
              </p>

              <button 
                disabled={isExporting}
                onClick={handleExportShares}
                className="w-full py-4 bg-gradient-to-r from-emerald-500 to-green-500 text-white font-black uppercase text-xs tracking-widest rounded-xl hover:opacity-90 transition-all flex items-center justify-center gap-2 shadow-lg shadow-emerald-100 disabled:opacity-50"
              >
                {isExporting ? (
                  <>
                    <Loader2 className="animate-spin w-4 h-4" />
                    Generating Export...
                  </>
                ) : (
                  <>
                    <Download className="w-4 h-4" />
                    Download File
                  </>
                )}
              </button>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default ImportExportAdmin;