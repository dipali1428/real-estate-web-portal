'use client';

import { useState, useEffect, useRef } from 'react';
import { PMSService, PMSFund } from '../../../../services/pmsService';
import api from '../../../../services/api';
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
  Gem,
  Package,
  Edit3,
  Trash2,
  Search,
} from "lucide-react";
import CustomerService from '../../../../services/customerService';

const PMSImportAdmin: React.FC = () => {

  // States for Import
  const [file, setFile] = useState<File | null>(null);
  const [isImporting, setIsImporting] = useState(false);
  const [isExporting, setIsExporting] = useState(false);
  const [progress, setProgress] = useState({ percent: 0, status: 'Waiting...' });
  const [logs, setLogs] = useState<string[]>([]);
  const [toast, setToast] = useState<{ message: string; type: 'success' | 'error' | 'info' } | null>(null);
  const [importResult, setImportResult] = useState<{
    processed?: number;
    skipped?: number;
  } | null>(null);

  // States for Fund Management
  const [funds, setFunds] = useState<PMSFund[]>([]);
  const [isLoadingFunds, setIsLoadingFunds] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
  const [editingFund, setEditingFund] = useState<PMSFund | null>(null);
  const [isUpdating, setIsUpdating] = useState(false);

  const [isClient, setIsClient] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    setIsClient(true);
    fetchFunds();
  }, []);

  const fetchFunds = async () => {
    setIsLoadingFunds(true);
    try {
      const data = await CustomerService.getPMSFundsList();
      setFunds(data);
    } catch (err: any) {
  setToast({
    message: "Failed to fetch PMS funds",
    type: "error",
  });

  setTimeout(() => setToast(null), 3000);
} finally {
      setIsLoadingFunds(false);
    }
  };

  // --- IMPORT PMS FUNDS ---
  const startImport = async () => {
    if (!file) {
      setToast({ message: 'Please select a file first', type: 'error' });
      setTimeout(() => setToast(null), 3000);
      return;
    }

    setIsImporting(true);
    setProgress({ percent: 30, status: 'Processing...' });
    setToast({ message: `Importing PMS fund data...`, type: 'info' });
    setLogs(prev => [...prev, `[${new Date().toLocaleTimeString()}] Starting PMS import of ${file.name}...`]);
    setImportResult(null);

    try {
      const response = await PMSService.uploadPMSFunds(file);

      setProgress({ percent: 100, status: 'Completed' });

      setImportResult({
        processed: response.processed,
        skipped: response.skipped
      });

      const successMsg = `✓ PMS Funds imported successfully (${response.processed} rows processed, ${response.skipped} skipped)`;
      setLogs(prev => [...prev, `[${new Date().toLocaleTimeString()}] ${successMsg}`]);
      setToast({ message: successMsg, type: 'success' });

      // Refresh list
      fetchFunds();

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
      setTimeout(() => setToast(null), 5000);
    } finally {
      setIsImporting(false);
    }
  };

  // --- DELETE FUND ---
  const handleDelete = async (id: number, name: string) => {
    if (!window.confirm(`Are you sure you want to delete ${name}?`)) return;

    try {
      await PMSService.deletePMSFund(id);
      setToast({ message: `${name} deleted successfully`, type: 'success' });
      setFunds(prev => prev.filter(f => f.id !== id));
      setTimeout(() => setToast(null), 3000);
    } catch (err) {
      setToast({ message: 'Failed to delete fund', type: 'error' });
      setTimeout(() => setToast(null), 3000);
    }
  };

  // --- UPDATE FUND ---
  const handleUpdate = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingFund) return;

    setIsUpdating(true);
    try {
      await PMSService.updatePMSFund(editingFund.id, editingFund);
      setToast({ message: `${editingFund.fund_name} updated successfully`, type: 'success' });
      setFunds(prev => prev.map(f => f.id === editingFund.id ? editingFund : f));
      setEditingFund(null);
      setTimeout(() => setToast(null), 3000);
    } catch (err) {
      setToast({ message: 'Failed to update fund', type: 'error' });
      setTimeout(() => setToast(null), 3000);
    } finally {
      setIsUpdating(false);
    }
  };

  const filteredFunds = funds.filter(f =>
    f.fund_name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    f.category.toLowerCase().includes(searchQuery.toLowerCase())
  );

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
              <Database className="w-6 h-6" /> PMS Data Portal
            </h2>
            <p className="text-sm opacity-90">Import & manage PMS fund strategy data</p>
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
            className={`fixed top-24 right-6 z-50 flex items-center gap-3 px-4 py-3 rounded-xl shadow-lg border ${toast.type === 'success'
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
            <button onClick={() => setToast(null)} className="p-1 hover:bg-black/5 rounded-lg transition-colors">
              <X className="w-4 h-4" />
            </button>
          </motion.div>
        )}
      </AnimatePresence>

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
              Import PMS Fund Data
            </h3>
          </div>

          <div className="p-6 space-y-6">
            {!file ? (
              <div
                onClick={() => fileInputRef.current?.click()}
                className="border-2 border-dashed border-gray-200 rounded-2xl p-8 text-center cursor-pointer hover:border-[#1CADA3] transition-all group"
              >
                <div className="w-16 h-16 bg-gray-100 rounded-2xl flex items-center justify-center mx-auto mb-4 text-gray-400 group-hover:scale-110 transition-transform group-hover:text-[#2076C7]">
                  <FileSpreadsheet className="w-8 h-8" />
                </div>
                <h4 className="text-lg font-bold text-gray-700 mb-1">Click to upload</h4>
                <p className="text-xs text-gray-500">Excel files only (.xlsx, .xls)</p>
                <input type="file" ref={fileInputRef} onChange={(e) => setFile(e.target.files?.[0] || null)} accept=".xlsx, .xls" hidden />
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
                <button onClick={() => setFile(null)} className="p-1.5 hover:bg-emerald-200 rounded-lg transition-colors" disabled={isImporting}>
                  <X className="w-4 h-4 text-emerald-600" />
                </button>
              </div>
            )}

            {progress.percent > 0 && (
              <div className="space-y-2">
                <div className="flex justify-between text-xs">
                  <span className="font-medium text-gray-600">{progress.status}</span>
                  <span className="font-bold text-[#2076C7]">{progress.percent}%</span>
                </div>
                <div className="w-full h-2 bg-gray-100 rounded-full overflow-hidden">
                  <motion.div initial={{ width: 0 }} animate={{ width: `${progress.percent}%` }} className="h-full bg-gradient-to-r from-[#2076C7] to-[#1CADA3]" />
                </div>
              </div>
            )}

            <button
              onClick={startImport}
              disabled={!file || isImporting}
              className="w-full py-4 bg-gradient-to-r from-[#2076C7] to-[#1CADA3] text-white font-black uppercase text-xs tracking-widest rounded-xl disabled:opacity-50 flex items-center justify-center gap-3 shadow-lg shadow-blue-100"
            >
              {isImporting ? <><Loader2 className="animate-spin w-4 h-4" /> Importing...</> : <><Zap className="w-4 h-4" /> Import PMS Funds</>}
            </button>
          </div>
        </motion.div>

        {/* RIGHT COLUMN - EXPORT PMS FUNDS */}
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.2 }}
          className="bg-white rounded-2xl shadow-lg border border-gray-100 overflow-hidden"
        >
          <div className="bg-gradient-to-r from-emerald-50 to-teal-50 px-6 py-4 border-b border-emerald-100">
            <h3 className="font-bold text-gray-800 flex items-center gap-2">
              <Download className="w-5 h-5 text-emerald-600" />
              Export PMS Funds
            </h3>
          </div>

          <div className="p-6">
            <div className="bg-gradient-to-br from-gray-50 to-white rounded-2xl p-8 border border-gray-100 text-center">
              <div className="w-20 h-20 bg-emerald-100 rounded-2xl flex items-center justify-center mx-auto mb-6 text-emerald-600">
                <Package className="w-10 h-10" />
              </div>

              <h4 className="text-xl font-bold text-gray-800 mb-2">PMS Funds Export</h4>
              <p className="text-sm text-gray-500 mb-8 max-w-md mx-auto">
                Download complete list of all PMS funds with strategy details, returns, and benchmarks for reporting purposes.
              </p>

              <button
                disabled={isExporting}
                onClick={async () => {
                  setIsExporting(true);
                  setToast({ message: 'Preparing PMS export...', type: 'info' });
                  try {
                    const response = await api.get('/api/products/investments/pms/funds');
                    const fundsData = response.data;
                    const headers = ['Fund Name', 'Category', 'Risk Level', 'Min Investment', 'AUM', 'Return 1Y', 'Return 3Y', 'Return 5Y', 'Benchmark', 'Strategy Type', 'Portfolio Style', 'Description'];
                    const csvRows = [headers.join(',')];
                    fundsData.forEach((f: any) => {
                      csvRows.push([
                        `"${f.fund_name || ''}"`, `"${f.category || ''}"`, `"${f.risk_level || ''}"`,
                        f.min_investment || '', f.aum || '', f.return_1y || '', f.return_3y || '', f.return_5y || '',
                        `"${f.benchmark || ''}"`, `"${f.strategy_type || ''}"`, `"${f.portfolio_style || ''}"`, `"${(f.description || '').replace(/"/g, '""')}"`
                      ].join(','));
                    });
                    const blob = new Blob([csvRows.join('\n')], { type: 'text/csv' });
                    const url = window.URL.createObjectURL(blob);
                    const link = document.createElement('a');
                    link.href = url;
                    link.setAttribute('download', `pms_funds_export_${new Date().toISOString().split('T')[0]}.csv`);
                    document.body.appendChild(link);
                    link.click();
                    link.remove();
                    window.URL.revokeObjectURL(url);
                    setToast({ message: '✓ PMS funds exported successfully', type: 'success' });
                    setTimeout(() => setToast(null), 3000);
                  } catch (err: any) {
                    setToast({ message: `✗ Export failed: ${err.message}`, type: 'error' });
                    setTimeout(() => setToast(null), 5000);
                  } finally {
                    setIsExporting(false);
                  }
                }}
                className="w-full py-4 bg-gradient-to-r from-emerald-500 to-green-500 text-white font-black uppercase text-xs tracking-widest rounded-xl hover:opacity-90 transition-all flex items-center justify-center gap-2 shadow-lg shadow-emerald-100 disabled:opacity-50"
              >
                {isExporting ? (
                  <><Loader2 className="animate-spin w-4 h-4" /> Generating Export...</>
                ) : (
                  <><Download className="w-4 h-4" /> Download File</>
                )}
              </button>
            </div>
          </div>
        </motion.div>
      </div>

      {/* EXISTING FUNDS - FULL WIDTH BELOW */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
        className="bg-white rounded-3xl shadow-xl border border-gray-100 overflow-hidden flex flex-col"
      >
        {/* List Header */}
        <div className="p-6 border-b border-gray-100 bg-gray-50/50 flex flex-col sm:flex-row justify-between items-center gap-4">
          <h3 className="font-bold text-gray-800 flex items-center gap-2">
            <Database className="w-5 h-5 text-[#2076C7]" />
            Existing Funds
            <span className="bg-blue-100 text-[#2076C7] text-[10px] px-2 py-0.5 rounded-full ml-1">
              {funds.length}
            </span>
          </h3>

          <div className="relative w-full sm:w-64">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
            <input
              type="text"
              placeholder="Search funds..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-2 bg-white border border-gray-200 rounded-xl text-xs focus:ring-2 focus:ring-blue-100 focus:border-[#2076C7] transition-all outline-none"
            />
          </div>
        </div>

        {/* List Content - Full Detail Table */}
        <div className="overflow-x-auto">
          {isLoadingFunds ? (
            <div className="flex flex-col items-center justify-center p-20 gap-4 text-gray-400">
              <Loader2 className="w-10 h-10 animate-spin" />
              <p className="text-sm font-medium">Fetching strategy data...</p>
            </div>
          ) : filteredFunds.length === 0 ? (
            <div className="flex flex-col items-center justify-center p-20 text-gray-400 text-center">
              <div className="w-20 h-20 bg-gray-50 rounded-full flex items-center justify-center mb-4">
                <Database className="w-8 h-8 opacity-20" />
              </div>
              <p className="text-sm font-bold text-gray-600 mb-1">No funds found</p>
              <p className="text-xs">Try searching for something else or import a new file.</p>
            </div>
          ) : (
            <table className="w-full text-left text-sm">
              <thead className="bg-gray-50 text-[10px] uppercase text-gray-500 font-bold tracking-wider border-b border-gray-200 sticky top-0 z-10">
                <tr>
                  <th className="px-4 py-3 whitespace-nowrap">Fund Name</th>
                  <th className="px-4 py-3 whitespace-nowrap">Category</th>
                  <th className="px-4 py-3 whitespace-nowrap">Risk</th>
                  <th className="px-4 py-3 whitespace-nowrap text-right">Min Invest</th>
                  <th className="px-4 py-3 whitespace-nowrap">Strategy Type</th>
                  <th className="px-4 py-3 whitespace-nowrap">Benchmark</th>
                  <th className="px-4 py-3 whitespace-nowrap text-center sticky right-0 bg-gray-50">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-50">
                {filteredFunds.map((fund) => (
                  <tr key={fund.id} className="hover:bg-blue-50/30 transition-colors">
                    <td className="px-4 py-3 whitespace-nowrap">
                      <div className="flex items-center gap-2.5">
                        <div className="w-8 h-8 bg-indigo-50 rounded-lg flex items-center justify-center shrink-0">
                          <Gem className="w-4 h-4 text-indigo-500" />
                        </div>
                        <span className="font-bold text-gray-800 text-xs max-w-[220px] truncate">{fund.fund_name}</span>
                      </div>
                    </td>
                    <td className="px-4 py-3 whitespace-nowrap">
                      <span className="text-[10px] font-medium text-gray-500 bg-gray-100 px-2 py-0.5 rounded-md">{fund.category || '—'}</span>
                    </td>
                    <td className="px-4 py-3 whitespace-nowrap">
                      <span className={`text-[10px] font-bold px-2 py-0.5 rounded-md ${fund.risk_level === 'High' || fund.risk_level === 'Very High' ? 'bg-red-50 text-red-600' :
                          fund.risk_level === 'Moderate' ? 'bg-amber-50 text-amber-600' :
                            'bg-green-50 text-green-600'
                        }`}>{fund.risk_level || '—'}</span>
                    </td>
                    <td className="px-4 py-3 whitespace-nowrap text-right text-xs font-semibold text-gray-700">
                      {fund.min_investment ? `₹${(fund.min_investment / 100000).toFixed(0)}L` : '—'}
                    </td>
                    <td className="px-4 py-3 whitespace-nowrap text-xs text-gray-600">
                      {fund.strategy_type || '—'}
                    </td>
                    <td className="px-4 py-3 whitespace-nowrap text-xs text-gray-600">
                      {fund.benchmark || '—'}
                    </td>
                    <td className="px-4 py-3 whitespace-nowrap text-center sticky right-0 bg-white border-l border-gray-100">
                      <div className="flex items-center justify-center gap-1">
                        <button
                          onClick={() => setEditingFund({ ...fund })}
                          className="p-1.5 bg-blue-50 hover:bg-blue-100 rounded-lg text-blue-600 transition-all"
                          title="Edit Strategy"
                        >
                          <Edit3 className="w-3.5 h-3.5" />
                        </button>
                        <button
                          onClick={() => handleDelete(fund.id, fund.fund_name)}
                          className="p-1.5 bg-red-50 hover:bg-red-100 rounded-lg text-red-500 transition-all"
                          title="Delete Fund"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>
      </motion.div>

      {/* EDIT MODAL */}
      <AnimatePresence>
        {editingFund && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 sm:p-6">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setEditingFund(null)}
              className="absolute inset-0 bg-slate-900/60 backdrop-blur-sm"
            />
            <motion.div
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 20 }}
              className="relative w-full max-w-2xl bg-white rounded-3xl shadow-2xl overflow-hidden flex flex-col max-h-[90vh]"
            >
              {/* Modal Header */}
              <div className="bg-gradient-to-r from-[#2076C7] to-[#1CADA3] p-6 text-white shrink-0">
                <div className="flex justify-between items-start">
                  <div>
                    <h3 className="text-xl font-black uppercase tracking-tight">Edit PMS Strategy</h3>
                    <p className="text-xs opacity-80">Modify fund details and performance metrics</p>
                  </div>
                  <button
                    onClick={() => setEditingFund(null)}
                    className="p-2 bg-white/20 hover:bg-white/30 rounded-full transition-colors"
                  >
                    <X className="w-5 h-5" />
                  </button>
                </div>
              </div>

              {/* Modal Body - Form */}
              <form onSubmit={handleUpdate} className="flex-1 overflow-y-auto p-8 space-y-6">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  {/* Basic Info */}
                  <div className="space-y-4 sm:col-span-2">
                    <h4 className="text-[10px] font-black text-gray-400 uppercase tracking-widest border-b pb-2">Basic Information</h4>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div className="space-y-1.5">
                        <label className="text-[11px] font-bold text-gray-500 ml-1">Fund Name</label>
                        <input
                          type="text"
                          value={editingFund.fund_name}
                          onChange={e => setEditingFund({ ...editingFund, fund_name: e.target.value })}
                          className="w-full px-4 py-2.5 bg-gray-50 border border-gray-200 rounded-xl text-sm focus:ring-2 focus:ring-blue-100 outline-none"
                        />
                      </div>
                      <div className="space-y-1.5">
                        <label className="text-[11px] font-bold text-gray-500 ml-1">Category</label>
                        <input
                          type="text"
                          value={editingFund.category}
                          onChange={e => setEditingFund({ ...editingFund, category: e.target.value })}
                          className="w-full px-4 py-2.5 bg-gray-50 border border-gray-200 rounded-xl text-sm focus:ring-2 focus:ring-blue-100 outline-none"
                        />
                      </div>
                    </div>
                  </div>

                  {/* Financials */}
                  <div className="space-y-4">
                    <h4 className="text-[10px] font-black text-gray-400 uppercase tracking-widest border-b pb-2">Investment Details</h4>
                    <div className="space-y-4">
                      <div className="space-y-1.5">
                        <label className="text-[11px] font-bold text-gray-500 ml-1">Min Investment (₹)</label>
                        <input
                          type="number"
                          value={editingFund.min_investment}
                          onChange={e => setEditingFund({ ...editingFund, min_investment: Number(e.target.value) })}
                          className="w-full px-4 py-2.5 bg-gray-50 border border-gray-200 rounded-xl text-sm focus:ring-2 focus:ring-blue-100 outline-none"
                        />
                      </div>
                      <div className="space-y-1.5">
                        <label className="text-[11px] font-bold text-gray-500 ml-1">AUM (₹ Cr)</label>
                        <input type="number" value={editingFund.aum} onChange={e => setEditingFund({ ...editingFund, aum: Number(e.target.value) })}className="w-full px-4 py-2.5 bg-gray-50 border border-gray-200 rounded-xl text-sm focus:ring-2 focus:ring-blue-100 outline-none"/>
                      </div>
                    </div>
                  </div>

                  {/* Performance */}
                  <div className="space-y-4">
                    <h4 className="text-[10px] font-black text-gray-400 uppercase tracking-widest border-b pb-2">Returns (%)</h4>
                    <div className="grid grid-cols-2 gap-4">
                      <div className="space-y-1.5">
                        <label className="text-[11px] font-bold text-gray-500 ml-1">3Y Return</label>
                       <input
                          type="number"
                          step="0.01"
                          value={editingFund.return_3y || ''}
                          onChange={e => setEditingFund({...editingFund, return_3y: Number(e.target.value)})}
                          className="w-full px-4 py-2.5 bg-gray-50 border border-gray-200 rounded-xl text-sm text-black font-bold focus:ring-2 focus:ring-blue-100 outline-none"
                        />
                      </div>
                      <div className="space-y-1.5">
                        <label className="text-[11px] font-bold text-gray-500 ml-1">5Y Return</label>
                        <input
                          type="number"
                          step="0.01"
                          value={editingFund.return_5y}
                          onChange={e => setEditingFund({ ...editingFund, return_5y: Number(e.target.value) })}
                          className="w-full px-4 py-2.5 bg-gray-50 border border-gray-200 rounded-xl text-sm focus:ring-2 focus:ring-blue-100 outline-none font-bold text-emerald-600"
                        />
                      </div>
                    </div>
                    <div className="space-y-1.5">
                      <label className="text-[11px] font-bold text-gray-500 ml-1">Risk Level</label>
                      <select
                        value={editingFund.risk_level}
                        onChange={e => setEditingFund({ ...editingFund, risk_level: e.target.value })}
                        className="w-full px-4 py-2.5 bg-gray-50 border border-gray-200 rounded-xl text-sm focus:ring-2 focus:ring-blue-100 outline-none"
                      >
                        <option value="Low">Low</option>
                        <option value="Moderate">Moderate</option>
                        <option value="High">High</option>
                        <option value="Very High">Very High</option>
                      </select>
                    </div>
                  </div>

                  {/* Description */}
                  <div className="space-y-4 sm:col-span-2">
                    <h4 className="text-[10px] font-black text-gray-400 uppercase tracking-widest border-b pb-2">Notes & Strategy</h4>
                    <div className="space-y-1.5">
                      <textarea
                        rows={3}
                        value={editingFund.description}
                        onChange={e => setEditingFund({ ...editingFund, description: e.target.value })}
                        className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-2xl text-sm focus:ring-2 focus:ring-blue-100 outline-none resize-none"
                        placeholder="Strategy details..."
                      />
                    </div>
                  </div>
                </div>

                <div className="flex gap-3 pt-4 shrink-0">
                  <button
                    type="button"
                    onClick={() => setEditingFund(null)}
                    className="flex-1 py-3 bg-gray-100 text-gray-600 font-bold rounded-xl hover:bg-gray-200 transition-colors"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    disabled={isUpdating}
                    className="flex-[2] py-3 bg-gradient-to-r from-[#2076C7] to-[#1CADA3] text-white font-bold rounded-xl shadow-lg shadow-blue-100 flex items-center justify-center gap-2"
                  >
                    {isUpdating ? <Loader2 className="w-4 h-4 animate-spin" /> : <Database className="w-4 h-4" />}
                    Update Strategy
                  </button>
                </div>
              </form>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default PMSImportAdmin;