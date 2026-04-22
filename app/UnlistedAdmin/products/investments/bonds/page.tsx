'use client';

import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {AdminService}from '../../../../services/unlistedadminservices';
import{
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
  Search,
  Hash,
  Layers3,
  IndianRupee,
  Clock,
  Briefcase,
  Pencil,
  Trash2
} from "lucide-react";

const BondsAdmin: React.FC = () => {
  // States
  const [file, setFile] = useState<File | null>(null);
  const [isImporting, setIsImporting] = useState(false);
  const [progress, setProgress] = useState({ percent: 0, status: 'Waiting...' });
  const [logs, setLogs] = useState<string[]>([]);
  const [toast, setToast] = useState<{ message: string; type: 'success' | 'error' | 'info' } | null>(null);

  const [bonds, setBonds] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [visibleCount, setVisibleCount] = useState(5);
  const [editingBond, setEditingBond] = useState<any | null>(null);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);

  const fileInputRef = useRef<HTMLInputElement>(null);

  const fetchBonds = async () => {
    setLoading(true);
    try {
      const response = await AdminService.getBonds();
      if (Array.isArray(response)) {
        setBonds(response);
      } else if (response && response.data && Array.isArray(response.data)) {
        setBonds(response.data);
      } else {
        setBonds([]);
      }
    } catch (error) {
      console.error('Error fetching bonds:', error);
      setBonds([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchBonds();
  }, []);

  const startImport = async () => {
    if (!file) {
      setToast({ message: 'Please select a file first', type: 'error' });
      setTimeout(() => setToast(null), 3000);
      return;
    }

    setIsImporting(true);
    setProgress({ percent: 30, status: 'Processing...' });
    setToast({ message: `Importing bonds file...`, type: 'info' });

    try {
      const res = await AdminService.uploadBonds(file);

      setProgress({ percent: 100, status: 'Completed' });

      const successMsg = `✓ ${res.message || 'Bonds imported successfully'}`;
      setLogs(prev => [...prev, `[${new Date().toLocaleTimeString()}] ${successMsg}${res.inserted ? ` (${res.inserted} processed)` : ''}`]);
      setToast({ message: successMsg, type: 'success' });

      fetchBonds(); // Refresh the list

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

  const filteredBonds = bonds.filter(bond =>
    bond.company?.toLowerCase().includes(searchTerm.toLowerCase()) ||
    bond.isin?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleDelete = async (id: number) => {
    if (!window.confirm('Are you sure you want to delete this bond?')) return;
    try {
      // We will implement this API next
      await AdminService.deleteBond(id);
      setToast({ message: 'Bond deleted successfully', type: 'success' });
      fetchBonds();
    } catch (error) {
      setToast({ message: 'Failed to delete bond', type: 'error' });
    }
  };

  const handleEditClick = (bond: any) => {
    setEditingBond({ ...bond });
    setIsEditModalOpen(true);
  };

  const handleSaveEdit = async () => {
    if (!editingBond) return;
    try {
      await AdminService.updateBond(editingBond.id, editingBond);
      setToast({ message: 'Bond updated successfully', type: 'success' });
      setIsEditModalOpen(false);
      setEditingBond(null);
      fetchBonds();
    } catch (error) {
      setToast({ message: 'Failed to update bond', type: 'error' });
    }
  };

  return (
    <div className="flex-1 space-y-6 animate-fade-in pb-10 p-6">

      {/* HEADER */}
      <motion.div
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-gradient-to-r from-[#2076C7] to-[#1CADA3] rounded-2xl p-6 text-white shadow-md flex justify-between items-center"
      >
        <div className="flex items-center gap-3">
          <div className="p-3 bg-white/20 rounded-xl">
            <Layers3 className="w-8 h-8 text-white" />
          </div>
          <div>
            <h2 className="text-2xl font-bold flex items-center gap-2">
              Bonds Management
            </h2>
            <p className="text-sm opacity-90">Upload and manage bond inventory</p>
          </div>
        </div>
        <button
          onClick={fetchBonds}
          className="p-2 bg-white/10 hover:bg-white/20 rounded-xl transition-all border border-white/20"
        >
          <RefreshCw className={`w-5 h-5 ${loading ? 'animate-spin' : ''}`} />
        </button>
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

      {/* Main Content - Two Column Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">

        {/* LEFT COLUMN - IMPORT SECTION */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          className="bg-white rounded-2xl shadow-lg border border-gray-100 overflow-hidden"
        >
          <div className="bg-gradient-to-r from-blue-50 to-indigo-50 px-6 py-4 border-b border-blue-100">
            <h3 className="font-bold text-gray-800 flex items-center gap-2">
              <Upload className="w-5 h-5 text-[#2076C7]" />
              Import Bonds Data
            </h3>
          </div>

          <div className="p-6 space-y-6">
            <div className="bg-blue-50/50 p-4 rounded-xl border border-blue-100">
              <p className="text-xs text-blue-700 leading-relaxed">
                <strong>Note:</strong> Please ensure your CSV has the following headers: <br />
                <code className="bg-white px-1 rounded border border-blue-200 mt-1 inline-block">
                  company, category, type, yield_percentage, coupon, min_investment, frequency, next_call_date, rating, maturity_date, maturity_text, isin, featured
                </code>
              </p>
            </div>

            {!file ? (
              <div
                onClick={() => fileInputRef.current?.click()}
                className="border-2 border-dashed border-gray-200 rounded-2xl p-8 text-center cursor-pointer hover:border-[#1CADA3] transition-all group"
              >
                <div className="w-16 h-16 bg-gray-100 rounded-2xl flex items-center justify-center mx-auto mb-4 text-gray-400 group-hover:scale-110 transition-transform group-hover:text-[#2076C7]">
                  <FileSpreadsheet className="w-8 h-8" />
                </div>
                <h4 className="text-lg font-bold text-gray-700 mb-1">Click to upload bonds CSV</h4>
                <p className="text-xs text-gray-500">Only .csv files are supported for now</p>
                <input
                  type="file"
                  ref={fileInputRef}
                  onChange={(e) => setFile(e.target.files?.[0] || null)}
                  accept=".csv"
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

            <button
              onClick={startImport}
              disabled={!file || isImporting}
              className="w-full py-4 bg-gradient-to-r from-[#2076C7] to-[#1CADA3] text-white font-black uppercase text-xs tracking-widest rounded-xl disabled:opacity-50 flex items-center justify-center gap-3 shadow-lg shadow-blue-100"
            >
              {isImporting ? (
                <>
                  <Loader2 className="animate-spin w-4 h-4" />
                  Importing Bonds...
                </>
              ) : (
                <>
                  <Zap className="w-4 h-4" />
                  Execute Bond Import
                </>
              )}
            </button>
          </div>
        </motion.div>

        {/* RIGHT COLUMN - LOGS/HELP SECTION */}
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          className="bg-white rounded-2xl shadow-lg border border-gray-100 overflow-hidden flex flex-col"
        >
          <div className="bg-gradient-to-r from-emerald-50 to-teal-50 px-6 py-4 border-b border-emerald-100 flex justify-between items-center">
            <h3 className="font-bold text-gray-800 flex items-center gap-2">
              <RefreshCw className="w-5 h-5 text-emerald-600" />
              Import Activities
            </h3>
            <button onClick={() => setLogs([])} className="text-[10px] font-black uppercase text-gray-400 hover:text-gray-600 transition-colors">Clear</button>
          </div>

          <div className="p-6 flex-1 bg-gray-50/50">
            {logs.length === 0 ? (
              <div className="h-full flex flex-col items-center justify-center text-center opacity-40">
                <Clock className="w-12 h-12 mb-3" />
                <p className="text-sm font-medium">No activity data available yet</p>
              </div>
            ) : (
              <div className="space-y-3">
                {logs.map((log, i) => (
                  <div key={i} className="text-xs font-mono bg-white p-2.5 rounded-lg border border-gray-100 shadow-xs">
                    {log}
                  </div>
                ))}
              </div>
            )}
          </div>
        </motion.div>
      </div>

      {/* BOTTOM SECTION - CURRENT BONDS TABLE */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-white rounded-2xl shadow-lg border border-gray-100 overflow-hidden"
      >
        <div className="p-6 border-b border-gray-100 flex flex-col md:flex-row justify-between items-center gap-4">
          <div>
            <h3 className="text-lg font-bold text-gray-800">Available Bonds</h3>
            <p className="text-sm text-gray-500">Currently listed bonds in the database (Showing {Math.min(visibleCount, filteredBonds.length)} of {filteredBonds.length})</p>
          </div>

          <div className="relative w-full md:w-80">
            <Search className="absolute left-4 top-2.5 text-gray-400 w-4 h-4" />
            <input
              type="text"
              placeholder="Search by company or ISIN..."
              className="w-full pl-11 pr-4 py-2.5 rounded-xl border border-gray-200 focus:border-[#1CADA3] outline-none text-sm text-gray-900 font-medium transition-all"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead>
              <tr className="bg-gray-50/50 text-gray-400 text-[11px] font-black uppercase tracking-widest border-b border-gray-100">
                <th className="px-6 py-4">ID</th>
                <th className="px-6 py-4">Company</th>
                <th className="px-6 py-4">Category</th>
                <th className="px-6 py-4">Yield (%)</th>
                <th className="px-6 py-4">Min Inv (₹)</th>
                <th className="px-6 py-4">Maturity</th>
                <th className="px-6 py-4">Rating</th>
                <th className="px-6 py-4 text-center">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-50">
              {loading ? (
                <tr><td colSpan={8} className="py-20 text-center animate-pulse text-gray-400 font-bold uppercase text-xs">Loading Bonds...</td></tr>
              ) : filteredBonds.length > 0 ? (
                filteredBonds.slice(0, visibleCount).map((bond) => (
                  <tr key={bond.id} className="hover:bg-gray-50/10 transition-colors group">
                    <td className="px-6 py-4 font-bold text-gray-700 text-sm">
                      #{bond.id}
                    </td>
                    <td className="px-6 py-4">
                      <div className="font-bold text-gray-800">{bond.company}</div>
                      <div className="text-[10px] text-gray-400 font-mono">{bond.isin || 'N/A'}</div>
                    </td>
                    <td className="px-6 py-4">
                      <span className={`px-2 py-0.5 rounded text-[10px] font-bold uppercase ${bond.category?.toLowerCase() === 'corporate' ? 'bg-purple-50 text-purple-600' : 'bg-blue-50 text-blue-600'
                        }`}>
                        {bond.category || 'N/A'}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-sm font-black text-[#1CADA3]">
                      {bond.yield || "0%"}
                    </td>
                    <td className="px-6 py-4 font-bold text-gray-700 text-sm">
                      {bond.minInvestment || "₹0"}
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-600">
                      {bond.maturity || '—'}
                    </td>
                    <td className="px-6 py-4">
                      <span className="px-2 py-0.5 bg-gray-100 rounded text-[10px] font-black text-gray-600 uppercase border border-gray-200">
                        {bond.rating || 'NR'}
                      </span>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex items-center justify-center gap-2">
                        <button 
                          onClick={() => handleEditClick(bond)}
                          title="Edit Bond"
                          className="p-2 hover:bg-blue-50 text-blue-600 rounded-lg transition-colors border border-transparent hover:border-blue-100"
                        >
                          <Pencil className="w-4 h-4" />
                        </button>
                        <button 
                          onClick={() => handleDelete(bond.id)}
                          title="Delete Bond"
                          className="p-2 hover:bg-red-50 text-red-500 rounded-lg transition-colors border border-transparent hover:border-red-100"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={8} className="py-20 text-center text-gray-400">
                    <Briefcase className="w-12 h-12 mx-auto mb-3 opacity-20" />
                    <p className="text-sm font-medium uppercase tracking-widest">No bonds found in inventory</p>
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
        
        {visibleCount < filteredBonds.length && (
          <div className="p-6 border-t border-gray-100 flex justify-center bg-gray-50/30">
            <button 
              onClick={() => setVisibleCount(prev => prev + 10)}
              className="px-8 py-3 bg-white border border-gray-200 hover:border-[#1CADA3] text-[#2076C7] rounded-full text-xs font-black uppercase tracking-widest shadow-sm hover:shadow-md transition-all active:scale-95"
            >
              View More Bonds
            </button>
          </div>
        )}
      </motion.div>

      {/* EDIT MODAL */}
      <AnimatePresence>
        {isEditModalOpen && editingBond && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm">
            <motion.div 
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 20 }}
              className="bg-white rounded-[2.5rem] w-full max-w-2xl overflow-hidden shadow-2xl flex flex-col max-h-[90vh]"
            >
              <div className="bg-gradient-to-r from-[#2076C7] to-[#1CADA3] p-6 text-white flex justify-between items-center">
                <h3 className="text-xl font-black flex items-center gap-2">
                  <RefreshCw className="w-6 h-6" /> Edit Bond Details
                </h3>
                <button onClick={() => setIsEditModalOpen(false)} className="p-2 hover:bg-white/20 rounded-full transition-colors">
                  <X className="w-5 h-5" />
                </button>
              </div>

              <div className="p-8 overflow-y-auto grid grid-cols-2 gap-6">
                <div className="col-span-2">
                  <label className="text-[10px] font-black uppercase text-gray-400 mb-1.5 block tracking-widest">Company Name</label>
                  <input 
                    type="text" 
                    value={editingBond.company} 
                    onChange={e => setEditingBond({...editingBond, company: e.target.value})}
                    className="w-full p-4 bg-gray-50 border border-gray-100 rounded-2xl font-bold text-sm focus:border-[#2076C7] outline-none transition-all"
                  />
                </div>
                <div>
                  <label className="text-[10px] font-black uppercase text-gray-400 mb-1.5 block tracking-widest">Category</label>
                  <input 
                    type="text" 
                    value={editingBond.category} 
                    onChange={e => setEditingBond({...editingBond, category: e.target.value})}
                    className="w-full p-4 bg-gray-50 border border-gray-100 rounded-2xl font-bold text-sm focus:border-[#2076C7] outline-none transition-all"
                  />
                </div>
                <div>
                  <label className="text-[10px] font-black uppercase text-gray-400 mb-1.5 block tracking-widest">ISIN</label>
                  <input 
                    type="text" 
                    value={editingBond.isin || ''} 
                    onChange={e => setEditingBond({...editingBond, isin: e.target.value})}
                    className="w-full p-4 bg-gray-50 border border-gray-100 rounded-2xl font-bold text-sm focus:border-[#2076C7] outline-none transition-all"
                  />
                </div>
                <div>
                  <label className="text-[10px] font-black uppercase text-gray-400 mb-1.5 block tracking-widest">Yield</label>
                  <input 
                    type="text" 
                    value={editingBond.yield || ''} 
                    onChange={e => setEditingBond({...editingBond, yield: e.target.value})}
                    className="w-full p-4 bg-gray-50 border border-gray-100 rounded-2xl font-bold text-sm focus:border-[#2076C7] outline-none transition-all text-[#1CADA3]"
                  />
                </div>
                <div>
                  <label className="text-[10px] font-black uppercase text-gray-400 mb-1.5 block tracking-widest">Coupon</label>
                  <input 
                    type="text" 
                    value={editingBond.coupon || ''} 
                    onChange={e => setEditingBond({...editingBond, coupon: e.target.value})}
                    className="w-full p-4 bg-gray-50 border border-gray-100 rounded-2xl font-bold text-sm focus:border-[#2076C7] outline-none transition-all text-[#2076C7]"
                  />
                </div>
                <div>
                  <label className="text-[10px] font-black uppercase text-gray-400 mb-1.5 block tracking-widest">Min Investment</label>
                  <input 
                    type="text" 
                    value={editingBond.minInvestment || ''} 
                    onChange={e => setEditingBond({...editingBond, minInvestment: e.target.value})}
                    className="w-full p-4 bg-gray-50 border border-gray-100 rounded-2xl font-bold text-sm focus:border-[#2076C7] outline-none transition-all"
                  />
                </div>
                <div>
                  <label className="text-[10px] font-black uppercase text-gray-400 mb-1.5 block tracking-widest">Rating</label>
                  <input 
                    type="text" 
                    value={editingBond.rating || ''} 
                    onChange={e => setEditingBond({...editingBond, rating: e.target.value})}
                    className="w-full p-4 bg-gray-50 border border-gray-100 rounded-2xl font-bold text-sm focus:border-[#2076C7] outline-none transition-all"
                  />
                </div>
              </div>

              <div className="p-8 bg-gray-50/50 border-t border-gray-100 flex gap-4">
                <button 
                  onClick={() => setIsEditModalOpen(false)}
                  className="flex-1 py-4 bg-white border border-gray-200 rounded-2xl font-black uppercase text-[10px] tracking-widest text-gray-400 hover:bg-gray-50 transition-all"
                >
                  Cancel
                </button>
                <button 
                  onClick={handleSaveEdit}
                  className="flex-2 py-4 bg-gradient-to-r from-[#2076C7] to-[#1CADA3] text-white rounded-2xl font-black uppercase text-[10px] tracking-widest shadow-lg shadow-blue-100 active:scale-95 transition-all px-12"
                >
                  Save Changes
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default BondsAdmin;