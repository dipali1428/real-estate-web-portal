'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { AdminService, DematDetails } from "../../services/unlistedadminservices";
import { 
  Shield, Search, RotateCw, 
  ChevronLeft, ChevronRight, Hash, Eye, X,
  User, Calendar, Fingerprint, CreditCard, Database,
  AlertCircle, Loader2
} from "lucide-react";

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

  // No initial fetch - let user search by ID

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
    console.error('❌ Error fetching demat by ID:', error);
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
      }
    } catch (error) {
      console.error(`Failed to refresh demat ID ${record.id}:`, error);
    }
  };

  // Filter records based on search term
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

  // Pagination
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
    /* ADJUSTED OUTER PADDING, BACKGROUND, AND MIN-HEIGHT HERE */
    <div className="flex-1 p-4 sm:p-6 bg-[#F8FAFC] min-h-screen font-sans">
      <div className="space-y-6 animate-fade-in">
        
        {/* --- HEADER --- */}
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-linear-to-r from-[#2076C7] to-[#1CADA3] rounded-2xl p-6 text-white shadow-md flex flex-col md:flex-row justify-between items-center gap-4"
        >
          <div>
            <h2 className="text-xl sm:text-2xl font-bold flex items-center gap-2">
              <Shield className="w-6 h-6" /> Demat Management
            </h2>
            <p className="text-sm opacity-90">View individual Demat account details by Demat ID.</p>
          </div>
        </motion.div>

        <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-6">
          <div className="flex flex-col md:flex-row gap-4 items-end">
            <div className="flex-1">
              <label className="text-[10px] font-black uppercase tracking-widest text-gray-400 mb-2 block">
                Search Demat by ID
              </label>
              <div className="flex gap-3">
                <input
                  type="number"
                  placeholder="Enter Demat ID (e.g., 1, 2, 3...)"
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
                  className="px-6 py-2.5 bg-[#2076C7] text-white rounded-xl font-bold text-sm hover:bg-[#1b62a5] transition-all disabled:opacity-50 flex items-center gap-2 min-w-[100px] justify-center"
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
              <p className="text-xs text-gray-400 mt-2">
                Enter a Demat ID to view its details. Example: ID 1 belongs to User 2716
              </p>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
          
          {/* --- SEARCH BAR --- */}
          <div className="p-5 border-b border-gray-100 bg-gray-50/30 flex flex-wrap gap-4 items-center justify-between">
            <span className="text-xs font-black uppercase tracking-widest text-gray-400">
              Total: {filteredDemat.length} Demat Records
            </span>
            <div className="relative w-full md:w-80">
              <Search className="absolute left-4 top-2.5 text-gray-400 w-4 h-4" />
              <input
                type="text"
                placeholder="Filter results..."
                className="w-full pl-11 pr-4 py-2.5 rounded-xl border border-gray-200 focus:border-[#1CADA3] outline-none text-sm text-gray-900 font-medium transition-all shadow-sm"
                value={searchTerm}
                onChange={(e) => {
                  setSearchTerm(e.target.value);
                  setCurrentPage(1);
                }}
              />
            </div>
          </div>

          {/* --- TABLE --- */}
          <div className="overflow-x-auto">
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
                {loading ? (
                  <tr>
                    <td colSpan={8} className="py-20 text-center">
                      <div className="flex items-center justify-center gap-3">
                        <Loader2 className="w-6 h-6 animate-spin text-[#2076C7]" />
                        <span className="text-gray-500 font-medium">Loading...</span>
                      </div>
                    </td>
                  </tr>
                ) : paginatedDemat.length > 0 ? (
                  paginatedDemat.map((record) => (
                    <tr key={record.id} className="hover:bg-gray-50/50 transition-colors group">
                      <td className="px-6 py-4">
                        <div className="flex items-center gap-1.5 font-bold text-gray-700 text-sm">
                          <Hash className="w-3 h-3 text-gray-300" /> {record.id}
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <span className="text-sm font-mono text-gray-600">{record.user_id}</span>
                      </td>
                      <td className="px-6 py-4">
                        <div className="flex items-center gap-3">
                          <div className="w-8 h-8 rounded-full bg-gradient-to-br from-purple-50 to-indigo-50 flex items-center justify-center">
                            <User className="w-4 h-4 text-[#2076C7]" />
                          </div>
                          <div>
                            <div className="font-bold text-gray-800">{record.demat_name}</div>
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <div className="flex items-center gap-1.5 text-gray-600 text-sm font-mono">
                          <Fingerprint className="w-3 h-3 text-gray-400" />
                          {record.dp_id}
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <div className="flex items-center gap-1.5 text-gray-600 text-sm font-mono">
                          <CreditCard className="w-3 h-3 text-gray-400" />
                          {record.client_id}
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <span className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-[10px] font-bold border ${getDepositoryColor(record.depository)}`}>
                          <Database className="w-3 h-3" />
                          {record.depository}
                        </span>
                      </td>
                      <td className="px-6 py-4 text-gray-500 text-sm">
                        <div className="flex items-center gap-1">
                          <Calendar className="w-3 h-3" />
                          {new Date(record.created_at).toLocaleDateString('en-IN')}
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <div className="flex justify-center gap-2">
                          <button 
                            onClick={() => viewDematDetails(record)}
                            className="p-2 text-blue-500 hover:bg-blue-50 rounded-lg transition-colors"
                            title="View Details"
                          >
                            <Eye className="w-4 h-4" />
                          </button>
                          <button 
                            onClick={() => refreshRecord(record)}
                            className="p-2 text-green-500 hover:bg-green-50 rounded-lg transition-colors"
                            title="Refresh"
                          >
                            <RotateCw className="w-4 h-4" />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan={8} className="py-20 text-center text-gray-400">
                      <Shield className="w-12 h-12 mx-auto mb-3 opacity-20" />
                      <p className="text-sm font-medium">No demat records fetched yet</p>
                      <p className="text-xs text-gray-400 mt-1">Enter a Demat ID above to fetch details</p>
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>

          {/* --- PAGINATION --- */}
          {totalPages > 1 && (
            <div className="px-6 py-4 border-t border-gray-100 flex items-center justify-between">
              <button
                onClick={() => setCurrentPage(p => Math.max(1, p - 1))}
                disabled={currentPage === 1}
                className="p-2 text-gray-400 hover:text-[#2076C7] disabled:opacity-30"
              >
                <ChevronLeft className="w-5 h-5" />
              </button>
              <span className="text-sm text-gray-600">
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

        {/* --- VIEW DEMAT DETAILS MODAL --- */}
        <AnimatePresence>
          {viewModalOpen && selectedDemat && (
            <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/40 backdrop-blur-sm">
              <motion.div 
                initial={{ scale: 0.9, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.9, opacity: 0 }}
                className="bg-white rounded-3xl shadow-2xl w-full max-w-md overflow-hidden"
              >
                <div className="bg-gradient-to-r from-[#2076C7] to-[#1CADA3] px-6 py-4 text-white flex justify-between items-center">
                  <h3 className="font-bold text-lg flex items-center gap-2">
                    <Shield className="w-5 h-5" />
                    Demat Details #{selectedDemat.id}
                  </h3>
                  <button onClick={() => setViewModalOpen(false)}>
                    <X className="w-5 h-5 text-white/80 hover:text-white" />
                  </button>
                </div>

                <div className="p-6 space-y-4">
                  <div className="bg-gray-50 rounded-xl p-4">
                    <div className="flex items-center gap-3 mb-3">
                      <div className="w-10 h-10 rounded-full bg-gradient-to-br from-purple-100 to-indigo-100 flex items-center justify-center">
                        <User className="w-5 h-5 text-[#2076C7]" />
                      </div>
                      <div>
                        <p className="text-xs text-gray-500">Account Holder</p>
                        <p className="font-bold text-gray-900">{selectedDemat.demat_name}</p>
                      </div>
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-3">
                    <div className="bg-gray-50 rounded-xl p-3">
                      <p className="text-[10px] font-black uppercase text-gray-400 mb-1">Demat ID</p>
                      <p className="text-sm font-bold text-gray-900">#{selectedDemat.id}</p>
                    </div>
                    <div className="bg-gray-50 rounded-xl p-3">
                      <p className="text-[10px] font-black uppercase text-gray-400 mb-1">User ID</p>
                      <p className="text-sm font-bold text-gray-900">#{selectedDemat.user_id}</p>
                    </div>
                    <div className="bg-gray-50 rounded-xl p-3">
                      <p className="text-[10px] font-black uppercase text-gray-400 mb-1">DP ID</p>
                      <p className="text-sm font-bold text-gray-900 font-mono">{selectedDemat.dp_id}</p>
                    </div>
                    <div className="bg-gray-50 rounded-xl p-3">
                      <p className="text-[10px] font-black uppercase text-gray-400 mb-1">Client ID</p>
                      <p className="text-sm font-bold text-gray-900 font-mono">{selectedDemat.client_id}</p>
                    </div>
                  </div>

                  <div className="bg-gray-50 rounded-xl p-3">
                    <p className="text-[10px] font-black uppercase text-gray-400 mb-1">Depository</p>
                    <div className="flex items-center gap-2">
                      <Database className="w-4 h-4 text-[#2076C7]" />
                      <span className={`px-2 py-1 rounded-full text-xs font-bold ${getDepositoryColor(selectedDemat.depository)}`}>
                        {selectedDemat.depository}
                      </span>
                    </div>
                  </div>

                  <div className="bg-gray-50 rounded-xl p-3">
                    <p className="text-[10px] font-black uppercase text-gray-400 mb-1">Created On</p>
                    <div className="flex items-center gap-2">
                      <Calendar className="w-4 h-4 text-gray-400" />
                      <p className="text-sm text-gray-900">
                        {new Date(selectedDemat.created_at).toLocaleString('en-IN')}
                      </p>
                    </div>
                  </div>

                  <button
                    onClick={() => setViewModalOpen(false)}
                    className="w-full py-3 bg-gray-100 text-gray-700 rounded-xl font-bold text-sm hover:bg-gray-200 transition-all mt-2"
                  >
                    Close
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