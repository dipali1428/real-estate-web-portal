'use client';

import { useState, useEffect, useRef } from 'react';
import { useRouter } from 'next/navigation';
import { AdminService } from '../../services/unlistedadminservices';
import { motion } from 'framer-motion';
import { 
  Upload, 
  FileSpreadsheet, 
  RotateCw, 
  CheckCircle, 
  AlertCircle,
  X,
  Info,
  Zap,
  Loader2,
  Database,
  ChevronLeft,
  Activity,
  Shield,
  History,
  Clock
} from "lucide-react";

const ImportExportAdmin: React.FC = () => {
  const router = useRouter();
  
  // Import States
  const [file, setFile] = useState<File | null>(null);
  const [importType, setImportType] = useState('shares_history');
  const [isImporting, setIsImporting] = useState(false);
  const [progress, setProgress] = useState({ 
    percent: 0, 
    status: 'Waiting...', 
    processed: 0, 
    skipped: 0 
  });
  const [logs, setLogs] = useState<string[]>([]);
  
  // Data States
  const [isClient, setIsClient] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    setIsClient(true);
  }, []);

  // --- FILE HANDLING ---
  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = e.target.files?.[0];
    if (selectedFile) {
        setFile(selectedFile);
        setLogs([`[${new Date().toLocaleTimeString()}] File "${selectedFile.name}" selected. Ready for processing.`]);
    }
  };

  // --- EXECUTE IMPORT ---
  const startImport = async () => {
    if (!file) return;
    
    setIsImporting(true);
    setProgress({ percent: 30, status: 'Uploading...', processed: 0, skipped: 0 });
    setLogs([`[${new Date().toLocaleTimeString()}] Initializing connection to import API...`]);

    try {
      let response;
      
      if (importType === 'shares_history') {
        setLogs(prev => [...prev, `[${new Date().toLocaleTimeString()}] Processing Excel workbook...`]);
        response = await AdminService.uploadSharesWithHistory(file);
      } else if (importType === 'shares_pdf') {
        response = await AdminService.uploadSharesPdfAndUpdate(file);
      } else {
          setLogs(prev => [...prev, `[${new Date().toLocaleTimeString()}] Standard import selected.`]);
          return;
      }
      
      setProgress({
        percent: 100,
        status: 'Completed',
        processed: response.rowsProcessed || 0,
        skipped: response.rowsSkipped || 0
      });

      setLogs(prev => [
        ...prev, 
        `[${new Date().toLocaleTimeString()}] ✓ ${response.message}`,
        `[${new Date().toLocaleTimeString()}] Rows Processed: ${response.rowsProcessed}`,
        `[${new Date().toLocaleTimeString()}] Rows Skipped: ${response.rowsSkipped}`
      ]);

    } catch (err: any) {
      console.error('Import error:', err);
      const errMsg = err.response?.data?.message || err.message || "Unknown error";
      setLogs(prev => [...prev, `[${new Date().toLocaleTimeString()}] ✗ Error: ${errMsg}`]);
      setProgress(prev => ({ ...prev, percent: 0, status: 'Failed' }));
    } finally {
      setIsImporting(false);
    }
  };

  const clearFile = () => {
    setFile(null);
    setLogs([]);
    setProgress({ percent: 0, status: 'Waiting...', processed: 0, skipped: 0 });
  };

  if (!isClient) return null;

  return (
    <div className="flex-1 space-y-6 animate-fade-in pb-10">
      
      {/* --- HEADER --- */}
      <motion.div
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-gradient-to-r from-[#2076C7] to-[#1CADA3] rounded-2xl p-6 text-white shadow-md flex flex-col md:flex-row justify-between items-center gap-4"
      >
        <div className="flex items-center gap-3">
          <button 
            onClick={() => router.back()}
            className="p-2 hover:bg-white/10 rounded-xl transition-colors"
          >
            <ChevronLeft className="w-5 h-5" />
          </button>
          <div>
            <h2 className="text-xl sm:text-2xl font-bold flex items-center gap-2">
              <Database className="w-6 h-6" /> Data Import
            </h2>
            <p className="text-sm opacity-90">Bulk upload shares with price history</p>
          </div>
        </div>
        <div className="flex gap-2">
          <span className="px-3 py-1.5 bg-emerald-500/20 text-emerald-100 text-[10px] font-black uppercase tracking-widest rounded-lg border border-emerald-200/30 flex items-center gap-1">
            <Activity className="w-3 h-3" /> System Live
          </span>
          <button 
            onClick={() => window.location.reload()} 
            className="p-2.5 bg-white/10 hover:bg-white/20 rounded-xl transition-all border border-white/20"
          >
            <RotateCw className="w-5 h-5" />
          </button>
        </div>
      </motion.div>

      {/* --- QUICK STATS --- */}
      {/* Main Container Card */}
      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
        
        <div className="p-6 border-b border-gray-100 flex justify-between items-center">
          <h3 className="text-lg font-bold text-gray-900 flex items-center gap-2">
            <Upload className="w-5 h-5 text-[#2076C7]" />
            Import Shares with History
          </h3>
        </div>

        <div className="p-6 sm:p-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
            <div className="lg:col-span-8 space-y-6">
              {/* Drag & Drop Area */}
              {!file ? (
                <div 
                  onDragOver={(e) => { 
                    e.preventDefault(); 
                    e.currentTarget.classList.add('border-[#1CADA3]', 'bg-teal-50/30'); 
                  }}
                  onDragLeave={(e) => { 
                    e.currentTarget.classList.remove('border-[#1CADA3]', 'bg-teal-50/30'); 
                  }}
                  onDrop={(e) => { 
                    e.preventDefault(); 
                    e.currentTarget.classList.remove('border-[#1CADA3]', 'bg-teal-50/30');
                    if (e.dataTransfer.files[0]) {
                      const droppedFile = e.dataTransfer.files[0];
                      setFile(droppedFile);
                      setLogs([`[${new Date().toLocaleTimeString()}] File "${droppedFile.name}" selected. Ready for processing.`]);
                    }
                  }}
                  onClick={() => fileInputRef.current?.click()}
                  className="border-2 border-dashed border-gray-200 rounded-2xl p-10 sm:p-12 text-center cursor-pointer hover:border-[#1CADA3] hover:bg-teal-50/30 transition-all group"
                >
                  <div className="w-16 h-16 bg-gray-100 rounded-2xl flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform text-gray-400 group-hover:text-[#1CADA3]">
                    <FileSpreadsheet className="w-8 h-8" />
                  </div>
                  <h4 className="text-lg font-bold text-gray-700">Upload Excel/CSV for Bulk Update</h4>
                  <p className="text-sm text-gray-400 mt-1">Select the file containing share prices and history</p>
                  <p className="text-[10px] font-bold text-gray-300 uppercase tracking-widest mt-4">Supports .csv, .xlsx, .xls</p>
                  <input 
                    type="file" 
                    ref={fileInputRef} 
                    onChange={handleFileSelect} 
                    accept=".csv, .xlsx, .xls" 
                    hidden 
                  />
                </div>
              ) : (
                <div className="p-5 bg-emerald-50/50 border border-emerald-200 rounded-2xl flex items-center justify-between">
                  <div className="flex items-center gap-4">
                    <div className="w-10 h-10 bg-white rounded-xl flex items-center justify-center text-emerald-500 shadow-sm">
                      <FileSpreadsheet className="w-5 h-5" />
                    </div>
                    <div>
                      <div className="font-bold text-emerald-900 text-sm">{file.name}</div>
                      <div className="text-xs text-emerald-600 font-medium">Size: {(file.size / 1024).toFixed(1)} KB</div>
                    </div>
                  </div>
                  <button 
                    onClick={clearFile}
                    className="p-2 text-emerald-900 hover:bg-emerald-100 rounded-full transition-colors"
                  >
                    <X className="w-4 h-4" />
                  </button>
                </div>
              )}

              {/* Import Config */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                <div className="space-y-2">
                  <label className="text-[10px] font-black uppercase text-gray-400 tracking-widest">Import Engine</label>
                  <select 
                    value={importType} 
                    onChange={(e) => setImportType(e.target.value)} 
                    className="w-full px-4 py-3 rounded-xl border border-gray-200 outline-none focus:border-[#1CADA3] bg-white text-sm font-bold text-gray-700"
                  >
                    <option value="shares_history">Shares With History (Excel)</option>
                    <option value="shares_pdf">Shares PDF Extractor</option>
                  </select>
                </div>
                <div className="p-4 bg-blue-50/50 rounded-xl border border-blue-100 flex items-start gap-3">
                  <Info className="w-4 h-4 text-blue-500 flex-shrink-0 mt-0.5" />
                  <p className="text-[11px] font-medium text-blue-700 leading-tight">
                    The engine will automatically match companies by name and update historical price charts.
                  </p>
                </div>
              </div>

              <div className="flex gap-4 pt-4">
                <button 
                  onClick={startImport}
                  disabled={!file || isImporting}
                  className="px-8 py-3.5 bg-gradient-to-r from-[#2076C7] to-[#1CADA3] text-white font-black uppercase text-xs tracking-widest rounded-xl hover:shadow-lg disabled:opacity-50 transition-all flex items-center gap-3"
                >
                  {isImporting ? (
                    <Loader2 className="w-4 h-4 animate-spin" />
                  ) : (
                    <Zap className="w-4 h-4" />
                  )}
                  {isImporting ? 'Processing Excel...' : 'Execute Import'}
                </button>
                <button 
                  onClick={clearFile} 
                  disabled={!file}
                  className="px-6 py-3.5 border border-gray-200 text-gray-400 font-bold rounded-xl hover:bg-gray-50 transition-all uppercase text-[10px] tracking-widest disabled:opacity-50"
                >
                  Clear
                </button>
              </div>
            </div>

            {/* Sidebar: Progress & Results */}
            <div className="lg:col-span-4 space-y-6">
              {(isImporting || progress.percent > 0) && (
                <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm">
                  <h5 className="font-bold text-gray-800 mb-4 uppercase text-xs tracking-widest flex items-center gap-2">
                    <Activity className="w-4 h-4 text-[#1CADA3]" />
                    Process Monitor
                  </h5>
                  
                  <div className="h-2 bg-gray-100 rounded-full mb-3 overflow-hidden">
                    <motion.div 
                      initial={{ width: 0 }}
                      animate={{ width: `${progress.percent}%` }}
                      className="h-full bg-gradient-to-r from-[#2076C7] to-[#1CADA3] rounded-full" 
                    />
                  </div>
                  
                  <div className="flex justify-between text-[10px] font-black uppercase mb-4">
                    <span className="text-[#2076C7]">{progress.percent}%</span>
                    <span className={progress.status === 'Failed' ? 'text-rose-500' : 'text-emerald-500'}>
                      {progress.status}
                    </span>
                  </div>

                  <div className="grid grid-cols-2 gap-3 mb-4">
                    <div className="bg-gray-50 p-3 rounded-xl border border-gray-100 text-center">
                      <div className="text-xl font-black text-gray-800">{progress.processed}</div>
                      <div className="text-[8px] font-bold text-gray-400 uppercase tracking-widest">Processed</div>
                    </div>
                    <div className="bg-gray-50 p-3 rounded-xl border border-gray-100 text-center">
                      <div className="text-xl font-black text-gray-800">{progress.skipped}</div>
                      <div className="text-[8px] font-bold text-gray-400 uppercase tracking-widest">Skipped</div>
                    </div>
                  </div>

                  <div className="bg-gray-900 rounded-xl p-4 font-mono text-[10px] text-emerald-400 h-40 overflow-y-auto">
                    {logs.map((log, i) => (
                      <div key={i} className="mb-1.5 leading-relaxed border-l border-emerald-500/20 pl-2">{log}</div>
                    ))}
                  </div>
                </div>
              )}

              <div className="bg-gray-50 p-6 rounded-2xl border border-gray-100">
                <h5 className="font-bold text-gray-800 mb-4 flex items-center gap-2 text-xs uppercase tracking-widest">
                  <Shield className="w-4 h-4 text-[#1CADA3]" /> Data Integrity
                </h5>
                <ul className="space-y-3 text-[11px] text-gray-500 font-medium">
                  <li className="flex gap-2">
                    <CheckCircle className="w-4 h-4 text-[#1CADA3] flex-shrink-0" />
                    <span>Ensure Company names match exactly.</span>
                  </li>
                  <li className="flex gap-2">
                    <CheckCircle className="w-4 h-4 text-[#1CADA3] flex-shrink-0" />
                    <span>Price columns must be numeric.</span>
                  </li>
                  <li className="flex gap-2">
                    <CheckCircle className="w-4 h-4 text-[#1CADA3] flex-shrink-0" />
                    <span>System automatically archives old prices.</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ImportExportAdmin;