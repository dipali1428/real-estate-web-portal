'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { AdminService, DematDetails } from "../../services/unlistedadminservices";
import { 
  Shield, Search, RotateCw, 
  ChevronLeft, ChevronRight, Hash, Eye, X,
  User, Calendar, Fingerprint, CreditCard, Database,
  AlertCircle, Loader2
} from "lucide-react";
import { toast } from 'react-hot-toast';

interface LocalDemat extends DematDetails {
  fetchedAt?: string;
}

const DematManagement: React.FC = () => {
  const [dematRecords, setDematRecords] = useState<LocalDemat[]>([]);
  const [loading] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(10);
  const [selectedDemat, setSelectedDemat] = useState<LocalDemat | null>(null);
  const [viewModalOpen, setViewModalOpen] = useState(false);
  const [dematIdInput, setDematIdInput] = useState('');
  const [fetchingByDematId, setFetchingByDematId] = useState(false);
  const [fetchError, setFetchError] = useState<string | null>(null);

  const fetchDematById = async (dematId: number) => {
    setFetchingByDematId(true);
    setFetchError(null);

    try {
      const response = await AdminService.getUserDemat(dematId);

      if (response?.success && response?.data) {
        const recordWithTime = {
          ...response.data,
          fetchedAt: new Date().toISOString()
        };

        setDematRecords(prev => {
          const exists = prev.some(d => d.id === response.data.id);
          if (exists) {
            return prev.map(d => d.id === response.data.id ? recordWithTime : d);
          } else {
            return [recordWithTime, ...prev];
          }
        });

        setDematIdInput('');
      } else {
        setFetchError('No Demat details found for this ID');
      }
    } catch (error: any) {
      if (error.response?.status === 404) {
        setFetchError('No Demat record found with this ID');
      } else {
        setFetchError(error.response?.data?.message || 'Failed to fetch demat details');
      }
    } finally {
      setFetchingByDematId(false);
    }
  };

  const handleSearch = () => {
    if (!dematIdInput.trim()) {
      setFetchError('Please enter a Demat ID');
      return;
    }

    const dematId = parseInt(dematIdInput);
    if (isNaN(dematId) || dematId <= 0) {
      setFetchError('Invalid Demat ID');
      return;
    }

    fetchDematById(dematId);
  };

  const refreshRecord = async (record: LocalDemat) => {
    try {
      const response = await AdminService.getUserDemat(record.id);
      if (response?.success && response?.data) {
        const updatedRecord = {
          ...response.data,
          fetchedAt: new Date().toISOString()
        };
        setDematRecords(prev => 
          prev.map(d => d.id === record.id ? updatedRecord : d)
        );
        toast.success(`Refreshed ID ${record.id}`);
      }
    } catch (error) {
      toast.error(`Failed to refresh demat ID ${record.id}`);
    }
  };

  const filteredDemat = dematRecords.filter(record => {
    const matchesSearch = searchTerm === '' || 
      record.demat_name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      record.dp_id?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      record.client_id?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      record.depository?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      record.user_id?.toString().includes(searchTerm) ||
      record.id?.toString().includes(searchTerm);
    
    return matchesSearch;
  });

  const totalPages = Math.ceil(filteredDemat.length / itemsPerPage);
  const paginatedDemat = filteredDemat.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  const viewDematDetails = (record: LocalDemat) => {
    setSelectedDemat(record);
    setViewModalOpen(true);
  };

  const getDepositoryColor = (depository: string) => {
    if (depository?.toLowerCase().includes('nsdl')) {
      return 'bg-blue-50 text-blue-700 border-blue-200';
    } else if (depository?.toLowerCase().includes('cdsl')) {
      return 'bg-green-50 text-green-700 border-green-200';
    }
    return 'bg-gray-50 text-gray-700 border-gray-200';
  };

  return (
    <div className="flex-1 p-3 sm:p-6 bg-[#F8FAFC] min-h-screen font-sans">
      <div className="space-y-4 sm:space-y-6 animate-fade-in max-w-full">
        
        {/* --- HEADER --- */}
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-linear-to-r from-[#2076C7] to-[#1CADA3] rounded-xl sm:rounded-2xl p-5 sm:p-6 text-white shadow-md flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4"
        >
          <div>
            <h2 className="text-lg sm:text-2xl font-bold flex items-center gap-2">
              <Shield className="w-5 h-5 sm:w-6 sm:h-6" /> Demat Management
            </h2>
            <p className="text-xs sm:text-sm opacity-90 mt-1">View individual Demat account details by Demat ID.</p>
          </div>
        </motion.div>

        {/* --- SEARCH SECTION --- */}
        <div className="bg-white rounded-xl sm:rounded-2xl shadow-sm border border-gray-200 p-4 sm:p-6">
          <div className="space-y-4">
            <div>
              <label className="text-[10px] font-black uppercase tracking-widest text-gray-400 mb-2 block">
                Search Demat by ID
              </label>
              <div className="flex flex-col sm:flex-row gap-3">
                <input
                  type="number"
                  placeholder="Enter Demat ID (e.g., 1, 2...)"
                  className="flex-1 px-4 py-2.5 rounded-xl border border-gray-200 focus:border-[#1CADA3] outline-none text-sm text-gray-900 font-medium transition-all shadow-sm"
                  value={dematIdInput}
                  onChange={(e) => {
                    setDematIdInput(e.target.value);
                    setFetchError(null);
                  }}
                  onKeyDown={(e) => e.key === 'Enter' && handleSearch()}
                />
                <button
                  onClick={handleSearch}
                  disabled={fetchingByDematId}
                  className="w-full sm:w-auto px-6 py-2.5 bg-[#2076C7] text-white rounded-xl font-bold text-sm hover:bg-[#1b62a5] transition-all disabled:opacity-50 flex items-center gap-2 justify-center"
                >
                  {fetchingByDematId ? (
                    <>
                      <Loader2 className="w-4 h-4 animate-spin" />
                      Searching...
                    </>
                  ) : (
                    <>
                      <Search className="w-4 h-4" />
                      Search
                    </>
                  )}
                </button>
              </div>
              {fetchError && (
                <p className="text-xs text-red-500 mt-2 flex items-center gap-1">
                  <AlertCircle className="w-3 h-3" />
                  {fetchError}
                </p>
              )}
            </div>
          </div>
        </div>

        {/* --- MAIN LIST SECTION --- */}
        <div className="bg-white rounded-xl sm:rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
          
          {/* SEARCH & STATS BAR */}
          <div className="p-4 sm:p-5 border-b border-gray-100 bg-gray-50/30 flex flex-col md:flex-row gap-4 items-center justify-between">
            <span className="text-[10px] sm:text-xs font-black uppercase tracking-widest text-gray-400">
              Fetched: {filteredDemat.length} Records
            </span>
            <div className="relative w-full md:w-80">
              <Search className="absolute left-4 top-2.5 text-gray-400 w-4 h-4" />
              <input
                type="text"
                placeholder="Filter these results..."
                className="w-full pl-11 pr-4 py-2.5 rounded-xl border border-gray-200 focus:border-[#1CADA3] outline-none text-sm text-gray-900 font-medium transition-all shadow-sm"
                value={searchTerm}
                onChange={(e) => {
                  setSearchTerm(e.target.value);
                  setCurrentPage(1);
                }}
              />
            </div>
          </div>

          {/* --- DESKTOP TABLE VIEW --- */}
          <div className="hidden lg:block overflow-x-auto">
            <table className="w-full text-left">
              <thead>
                <tr className="bg-gray-50/50 text-gray-400 text-[11px] font-black uppercase tracking-widest border-b border-gray-100">
                  <th className="px-6 py-4">Demat ID</th>
                  <th className="px-6 py-4">User ID</th>
                  <th className="px-6 py-4">Demat Holder</th>
                  <th className="px-6 py-4">DP ID</th>
                  <th className="px-6 py-4">Client ID</th>
                  <th className="px-6 py-4">Depository</th>
                  <th className="px-6 py-4">Created On</th>
                  <th className="px-6 py-4 text-center">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-50">
                {paginatedDemat.map((record) => (
                  <tr key={record.id} className="hover:bg-gray-50/50 transition-colors group">
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-1.5 font-bold text-gray-700 text-sm">
                        <Hash className="w-3 h-3 text-gray-300" /> {record.id}
                      </div>
                    </td>
                    <td className="px-6 py-4 text-sm font-mono text-gray-600">{record.user_id}</td>
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-3">
                        <div className="w-8 h-8 rounded-full bg-blue-50 flex items-center justify-center text-[#2076C7]"><User className="w-4 h-4" /></div>
                        <span className="font-bold text-gray-800 text-sm">{record.demat_name}</span>
                      </div>
                    </td>
                    <td className="px-6 py-4 text-sm font-mono text-gray-600">{record.dp_id}</td>
                    <td className="px-6 py-4 text-sm font-mono text-gray-600">{record.client_id}</td>
                    <td className="px-6 py-4">
                      <span className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[10px] font-bold border ${getDepositoryColor(record.depository)}`}>
                        <Database className="w-3 h-3" /> {record.depository}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-gray-500 text-xs">
                      {new Date(record.created_at).toLocaleDateString('en-IN')}
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex justify-center gap-2">
                        <button onClick={() => viewDematDetails(record)} className="p-2 text-blue-500 hover:bg-blue-50 rounded-lg"><Eye className="w-4 h-4" /></button>
                        <button onClick={() => refreshRecord(record)} className="p-2 text-green-500 hover:bg-green-50 rounded-lg"><RotateCw className="w-4 h-4" /></button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* --- MOBILE CARD VIEW --- */}
          <div className="lg:hidden divide-y divide-gray-100">
            {paginatedDemat.length > 0 ? (
              paginatedDemat.map((record) => (
                <div key={record.id} className="p-4 space-y-3 hover:bg-gray-50/50">
                  <div className="flex justify-between items-start">
                    <div className="flex items-center gap-2">
                      <div className="w-8 h-8 rounded-lg bg-blue-50 flex items-center justify-center text-[#2076C7]"><User size={16} /></div>
                      <div>
                        <p className="text-sm font-bold text-gray-900">{record.demat_name}</p>
                        <p className="text-[10px] text-gray-400 font-bold uppercase tracking-tighter">Demat ID #{record.id} • User #{record.user_id}</p>
                      </div>
                    </div>
                    <div className="flex gap-1">
                      <button onClick={() => viewDematDetails(record)} className="p-2 text-blue-500 bg-blue-50 rounded-lg"><Eye size={16} /></button>
                      <button onClick={() => refreshRecord(record)} className="p-2 text-green-500 bg-green-50 rounded-lg"><RotateCw size={16} /></button>
                    </div>
                  </div>
                  <div className="grid grid-cols-2 gap-2 bg-gray-50 p-2 rounded-xl">
                    <div>
                      <p className="text-[8px] font-black text-gray-400 uppercase">DP ID</p>
                      <p className="text-xs font-mono font-bold text-gray-700">{record.dp_id}</p>
                    </div>
                    <div>
                      <p className="text-[8px] font-black text-gray-400 uppercase">Client ID</p>
                      <p className="text-xs font-mono font-bold text-gray-700">{record.client_id}</p>
                    </div>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className={`px-2 py-0.5 rounded-full text-[9px] font-black border ${getDepositoryColor(record.depository)}`}>
                      {record.depository}
                    </span>
                    <span className="text-[10px] text-gray-400">{new Date(record.created_at).toLocaleDateString('en-IN')}</span>
                  </div>
                </div>
              ))
            ) : (
              <div className="py-20 text-center text-gray-400 p-6">
                <Shield className="w-12 h-12 mx-auto mb-3 opacity-20" />
                <p className="text-sm font-bold">No Demat records found</p>
                <p className="text-xs mt-1">Search for a Demat ID above to see results.</p>
              </div>
            )}
          </div>

          {/* --- PAGINATION --- */}
          {totalPages > 1 && (
            <div className="px-4 sm:px-6 py-4 border-t border-gray-100 flex items-center justify-between">
              <button
                onClick={() => setCurrentPage(p => Math.max(1, p - 1))}
                disabled={currentPage === 1}
                className="p-2 text-gray-400 hover:text-[#2076C7] disabled:opacity-30"
              >
                <ChevronLeft className="w-5 h-5" />
              </button>
              <span className="text-xs sm:text-sm text-gray-600 font-bold">
                Page {currentPage} of {totalPages}
              </span>
              <button
                onClick={() => setCurrentPage(p => Math.min(totalPages, p + 1))}
                disabled={currentPage === totalPages}
                className="p-2 text-gray-400 hover:text-[#2076C7] disabled:opacity-30"
              >
                <ChevronRight className="w-5 h-5" />
              </button>
            </div>
          )}
        </div>

        {/* --- VIEW DETAILS MODAL --- */}
        <AnimatePresence>
          {viewModalOpen && selectedDemat && (
            <div className="fixed inset-0 z-50 flex items-end sm:items-center justify-center p-0 sm:p-4 bg-black/40 backdrop-blur-sm">
              <motion.div 
                initial={{ y: "100%", opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                exit={{ y: "100%", opacity: 0 }}
                className="bg-white rounded-t-[2rem] sm:rounded-3xl shadow-2xl w-full max-w-md overflow-hidden max-h-[90vh]"
              >
                <div className="bg-gradient-to-r from-[#2076C7] to-[#1CADA3] px-6 py-5 text-white flex justify-between items-center">
                  <h3 className="font-bold text-lg flex items-center gap-2">
                    <Shield className="w-5 h-5" /> Demat Details #{selectedDemat.id}
                  </h3>
                  <button onClick={() => setViewModalOpen(false)}>
                    <X className="w-6 h-6 text-white/80 hover:text-white" />
                  </button>
                </div>

                <div className="p-6 space-y-4 overflow-y-auto">
                  <div className="bg-gray-50 rounded-2xl p-4 border border-gray-100">
                    <div className="flex items-center gap-4">
                      <div className="w-12 h-12 rounded-xl bg-white flex items-center justify-center text-[#2076C7] shadow-sm"><User size={24} /></div>
                      <div>
                        <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest">Account Holder</p>
                        <p className="text-base font-bold text-gray-900">{selectedDemat.demat_name}</p>
                      </div>
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-3">
                    {[
                      { label: 'Demat ID', val: `#${selectedDemat.id}`, icon: Hash },
                      { label: 'User ID', val: `#${selectedDemat.user_id}`, icon: User },
                      { label: 'DP ID', val: selectedDemat.dp_id, icon: Fingerprint, mono: true },
                      { label: 'Client ID', val: selectedDemat.client_id, icon: CreditCard, mono: true }
                    ].map((item, i) => (
                      <div key={i} className="bg-gray-50 rounded-xl p-3 border border-gray-100">
                        <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest mb-1">{item.label}</p>
                        <p className={`text-sm font-bold text-gray-900 ${item.mono ? 'font-mono' : ''}`}>{item.val}</p>
                      </div>
                    ))}
                  </div>

                  <div className="bg-gray-50 rounded-xl p-3 border border-gray-100 flex justify-between items-center">
                    <div>
                      <p className="text-[10px] font-black text-gray-400 uppercase mb-1">Depository</p>
                      <span className={`px-2.5 py-1 rounded-full text-[10px] font-black border ${getDepositoryColor(selectedDemat.depository)}`}>
                        {selectedDemat.depository}
                      </span>
                    </div>
                    <div className="text-right">
                      <p className="text-[10px] font-black text-gray-400 uppercase mb-1">Created Date</p>
                      <p className="text-sm font-bold text-gray-700">{new Date(selectedDemat.created_at).toLocaleDateString()}</p>
                    </div>
                  </div>

                  <button
                    onClick={() => setViewModalOpen(false)}
                    className="w-full py-4 bg-gray-900 text-white rounded-xl font-bold text-sm active:scale-95 transition-all mt-4"
                  >
                    Close Details
                  </button>
                </div>
              </motion.div>
            </div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
};

export default DematManagement;