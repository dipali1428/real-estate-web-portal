'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { AdminService, Share } from "../../services/unlistedadminservices";
import { 
  Package, Search, RotateCw, Building2,
  ChevronLeft, ChevronRight, Hash, Pencil, Trash2, Plus, X,
  IndianRupee, Layers, CheckCircle, XCircle, Clock
} from "lucide-react";

const ShareManagement: React.FC = () => {
  const [shares, setShares] = useState<Share[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(10);

  // Modal States
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalType, setModalType] = useState<'add' | 'edit'>('add');
  const [selectedShare, setSelectedShare] = useState<Partial<Share> | null>(null);
  const [submitLoading, setSubmitLoading] = useState(false);

  // Delete Confirmation Modal
  const [deleteModalOpen, setDeleteModalOpen] = useState(false);
  const [shareToDelete, setShareToDelete] = useState<Share | null>(null);
  const [deleteLoading, setDeleteLoading] = useState(false);

  const fetchShares = async () => {
    setLoading(true);
    try {
      const response = await AdminService.getShares();
      if (Array.isArray(response)) {
        setShares(response);
      }
    } catch (error) {
      console.error('Error fetching shares:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchShares();
  }, []);

  // Pagination
  const totalPages = Math.ceil(shares.length / itemsPerPage);
  const filteredShares = shares.filter(share => 
    share.shares_name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
    share.clean_name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
    share.id?.toString().includes(searchTerm)
  );

  const paginatedShares = filteredShares.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  const openModal = (type: 'add' | 'edit', share?: Share) => {
    setModalType(type);
    if (type === 'add') {
      setSelectedShare({ 
        shares_name: '', 
        price: '', 
        depository_applicable: 'NSDL & CDSL',
        min_lot_size: 100,
        logo_url: ''
      });
    } else {
      setSelectedShare(share || null);
    }
    setIsModalOpen(true);
  };

  const openDeleteModal = (share: Share) => {
    setShareToDelete(share);
    setDeleteModalOpen(true);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitLoading(true);

    try {
      if (modalType === 'add') {
        const addPayload: any = {
          shares_name: selectedShare?.shares_name || '',
          price: selectedShare?.price || '0',
          depository_applicable: selectedShare?.depository_applicable || 'NSDL & CDSL',
          min_lot_size: selectedShare?.min_lot_size || 100,
        };

        if (selectedShare?.logo_url) {
          addPayload.logo_url = selectedShare.logo_url;
        }
        
        const response = await AdminService.addShare(addPayload);
        alert("Share added successfully!");
        
      } else {
        if (selectedShare?.id) {
          const updatePayload: any = {};

          if (selectedShare.shares_name) updatePayload.shares_name = selectedShare.shares_name;
          if (selectedShare.price) updatePayload.price = selectedShare.price;
          if (selectedShare.depository_applicable) updatePayload.depository_applicable = selectedShare.depository_applicable;
          if (selectedShare.min_lot_size) updatePayload.min_lot_size = selectedShare.min_lot_size;
          if (selectedShare.clean_name) updatePayload.clean_name = selectedShare.clean_name;
          if (selectedShare.logo_url) updatePayload.logo_url = selectedShare.logo_url;
          if (selectedShare.is_active !== undefined) updatePayload.is_active = selectedShare.is_active;
          if (selectedShare.status) updatePayload.status = selectedShare.status;
          
          const response = await AdminService.updateShare(selectedShare.id, updatePayload);
          alert("Share updated successfully!");
        }
      }
      
      setIsModalOpen(false);
      fetchShares();
    } catch (error: any) {
      console.error("Submit error:", error);
      const serverMessage = error.response?.data?.message || error.response?.data?.error || "Check all fields";
      alert(`Failed: ${serverMessage}`);
    } finally {
      setSubmitLoading(false);
    }
  };

  const handleDelete = async () => {
    if (!shareToDelete) return;
    
    setDeleteLoading(true);
    try {
      await AdminService.deleteShare(shareToDelete.id);
      alert("Share deleted successfully!");
      setDeleteModalOpen(false);
      setShareToDelete(null);
      fetchShares();
    } catch (error: any) {
      console.error("Delete error:", error);
      alert(`Delete failed: ${error.response?.data?.message || error.message}`);
    } finally {
      setDeleteLoading(false);
    }
  };

  const getStatusBadge = (status?: string, is_active?: boolean) => {
    if (is_active === false) {
      return <span className="px-2 py-1 rounded-md text-[10px] font-black uppercase border bg-gray-50 text-gray-500 border-gray-200"><XCircle className="w-3 h-3 inline mr-1" /> Inactive</span>;
    }
    
    switch(status) {
      case 'APPROVED':
        return <span className="px-2 py-1 rounded-md text-[10px] font-black uppercase border bg-green-50 text-green-600 border-green-100"><CheckCircle className="w-3 h-3 inline mr-1" /> Approved</span>;
      case 'PENDING':
        return <span className="px-2 py-1 rounded-md text-[10px] font-black uppercase border bg-yellow-50 text-yellow-600 border-yellow-100"><Clock className="w-3 h-3 inline mr-1" /> Pending</span>;
      default:
        return <span className="px-2 py-1 rounded-md text-[10px] font-black uppercase border bg-gray-50 text-gray-600 border-gray-200">{status || 'N/A'}</span>;
    }
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
              <Package className="w-6 h-6" /> Share Management
            </h2>
            <p className="text-sm opacity-90">Manage unlisted shares, prices, and depository details.</p>
          </div>
          <div className="flex gap-2">
            <button 
               onClick={() => openModal('add')}
               className="flex items-center gap-2 px-5 py-2.5 bg-white text-[#2076C7] rounded-xl font-bold text-sm shadow-lg hover:bg-gray-50 transition-all"
            >
              <Plus className="w-4 h-4" /> Add Share
            </button>
            <button 
              onClick={() => fetchShares()} 
              className="p-2.5 bg-white/10 hover:bg-white/20 rounded-xl transition-all border border-white/20"
            >
              <RotateCw className={`w-5 h-5 ${loading ? 'animate-spin' : ''}`} />
            </button>
          </div>
        </motion.div>

        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
          
          {/* --- SEARCH BAR --- */}
          <div className="p-5 border-b border-gray-100 bg-gray-50/30 flex flex-wrap gap-4 items-center justify-between">
            <span className="text-xs font-black uppercase tracking-widest text-gray-400">
              Total: {filteredShares.length} Shares
            </span>
            <div className="relative w-full md:w-80">
              <Search className="absolute left-4 top-2.5 text-gray-400 w-4 h-4" />
              <input
                type="text"
                placeholder="Search shares by name or ID..."
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
                  <th className="px-6 py-4">ID</th>
                  <th className="px-6 py-4">Company Name</th>
                  <th className="px-6 py-4">Price (₹)</th>
                  <th className="px-6 py-4">Lot Size</th>
                  <th className="px-6 py-4">Depository</th>
                  <th className="px-6 py-4">Status</th>
                  <th className="px-6 py-4">Last Updated</th>
                  <th className="px-6 py-4 text-center">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-50">
                {loading ? (
                  <tr><td colSpan={8} className="py-20 text-center animate-pulse text-gray-400 font-bold uppercase text-xs">Loading...</td></tr>
                ) : paginatedShares.length > 0 ? (
                  paginatedShares.map((share) => (
                    <tr key={share.id} className="hover:bg-gray-50/50 transition-colors group">
                      <td className="px-6 py-4">
                        <div className="flex items-center gap-1.5 font-bold text-gray-700 text-sm">
                          <Hash className="w-3 h-3 text-gray-300" /> {share.id}
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <div className="flex items-center gap-3">
                          <div className="w-8 h-8 rounded-full bg-gradient-to-br from-blue-50 to-indigo-50 flex items-center justify-center">
                            {share.logo_url ? (
                              <img src={share.logo_url} className="w-5 h-5 object-contain" alt="" />
                            ) : (
                              <Building2 className="w-4 h-4 text-[#2076C7]" />
                            )}
                          </div>
                          <div>
                            <div className="font-bold text-gray-800">{share.shares_name}</div>
                            <div className="text-xs text-gray-500">{share.clean_name || '—'}</div>
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <div className="flex items-center gap-1 font-bold text-gray-800">
                          <IndianRupee className="w-3 h-3 text-[#1CADA3]" /> 
                          {parseFloat(share.price).toLocaleString('en-IN', { minimumFractionDigits: 2 })}
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <div className="flex items-center gap-1 text-gray-600 text-sm font-medium">
                          <Layers className="w-3 h-3 text-[#2076C7]" /> {share.min_lot_size}
                        </div>
                      </td>
                      <td className="px-6 py-4 text-sm text-gray-600">
                        {share.depository_applicable?.replace(/&amp;/gi, '&')}
                      </td>
                      <td className="px-6 py-4">
                        {getStatusBadge(share.status, share.is_active)}
                      </td>
                      <td className="px-6 py-4 text-gray-500 text-sm">
                        {share.updated_at ? new Date(share.updated_at).toLocaleDateString('en-IN') : '—'}
                      </td>
                      <td className="px-6 py-4">
                        <div className="flex justify-center gap-2">
                          <button 
                            onClick={() => openModal('edit', share)}
                            className="p-2 text-blue-500 hover:bg-blue-50 rounded-lg transition-colors"
                            title="Edit Share"
                          >
                            <Pencil className="w-4 h-4" />
                          </button>
                          <button 
                            onClick={() => openDeleteModal(share)}
                            className="p-2 text-rose-500 hover:bg-rose-50 rounded-lg transition-colors"
                            title="Delete Share"
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
                      <Package className="w-12 h-12 mx-auto mb-3 opacity-20" />
                      <p className="text-sm font-medium">No shares found</p>
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

        {/* --- ADD/EDIT MODAL --- */}
        <AnimatePresence>
          {isModalOpen && (
            <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/40 backdrop-blur-sm">
              <motion.div 
                initial={{ scale: 0.9, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.9, opacity: 0 }}
                className="bg-white rounded-3xl shadow-2xl w-full max-w-2xl overflow-hidden max-h-[90vh] overflow-y-auto"
              >
                <div className="bg-gray-50 px-6 py-4 border-b border-gray-100 flex justify-between items-center sticky top-0">
                  <h3 className="font-bold text-gray-800">
                    {modalType === 'add' ? 'Add New Share' : 'Update Share'}
                  </h3>
                  <button onClick={() => setIsModalOpen(false)}>
                    <X className="w-5 h-5 text-gray-400" />
                  </button>
                </div>

                <form onSubmit={handleSubmit} className="p-6 space-y-4">
                  <div>
                    <label className="text-[10px] font-black uppercase text-gray-700 mb-1 block">
                      Company Name <span className="text-red-500">*</span>
                    </label>
                    <input 
                      required
                      className="w-full px-4 py-2.5 rounded-xl border border-gray-200 outline-none focus:border-[#1CADA3] text-gray-700 text-sm"
                      value={selectedShare?.shares_name || ''}
                      onChange={e => setSelectedShare({...selectedShare, shares_name: e.target.value})}
                      placeholder="e.g., ABC Technologies Limited Unlisted Shares"
                    />
                  </div>

                  <div>
                    <label className="text-[10px] font-black uppercase text-gray-700 mb-1 block">
                      Logo URL (Optional)
                    </label>
                    <input 
                      className="w-full px-4 py-2.5 rounded-xl border border-gray-200 outline-none focus:border-[#1CADA3] text-gray-700 text-sm"
                      value={selectedShare?.logo_url || ''}
                      onChange={e => setSelectedShare({...selectedShare, logo_url: e.target.value})}
                      placeholder="https://example.com/logo.jpg"
                    />
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="text-[10px] font-black uppercase text-gray-700 mb-1 block">
                        Price (₹) <span className="text-red-500">*</span>
                      </label>
                      <input 
                        required
                        type="number"
                        step="0.01"
                        className="w-full px-4 py-2.5 rounded-xl border border-gray-200 outline-none focus:border-[#1CADA3] text-gray-700 text-sm"
                        value={selectedShare?.price || ''}
                        onChange={e => setSelectedShare({...selectedShare, price: e.target.value})}
                        placeholder="475.00"
                      />
                    </div>
                    <div>
                      <label className="text-[10px] font-black uppercase text-gray-700 mb-1 block">
                        Minimum Lot Size <span className="text-red-500">*</span>
                      </label>
                      <input 
                        required
                        type="number"
                        className="w-full px-4 py-2.5 rounded-xl border border-gray-200 outline-none focus:border-[#1CADA3] text-gray-700 text-sm"
                        value={selectedShare?.min_lot_size || 100}
                        onChange={e => setSelectedShare({...selectedShare, min_lot_size: parseInt(e.target.value)})}
                        placeholder="100"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="text-[10px] font-black uppercase text-gray-700 mb-1 block">
                      Depository Applicable <span className="text-red-500">*</span>
                    </label>
                    <select
                      required
                      className="w-full px-4 py-2.5 rounded-xl border border-gray-200 outline-none focus:border-[#1CADA3] text-gray-700 text-sm bg-white"
                      value={selectedShare?.depository_applicable || 'NSDL & CDSL'}
                      onChange={e => setSelectedShare({...selectedShare, depository_applicable: e.target.value})}
                    >
                      <option value="NSDL & CDSL">NSDL & CDSL</option>
                      <option value="NSDL Only">NSDL Only</option>
                      <option value="CDSL Only">CDSL Only</option>
                    </select>
                  </div>

                  {modalType === 'edit' && (
                    <>
                      <div>
                        <label className="text-[10px] font-black uppercase text-gray-400 mb-1 block">
                          Clean Name (Optional)
                        </label>
                        <input 
                          className="w-full px-4 py-2.5 rounded-xl border border-gray-200 outline-none focus:border-[#1CADA3] text-gray-700 text-sm"
                          value={selectedShare?.clean_name || ''}
                          onChange={e => setSelectedShare({...selectedShare, clean_name: e.target.value})}
                          placeholder="Display name without 'Unlisted Shares'"
                        />
                      </div>

                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <label className="text-[10px] font-black uppercase text-gray-700 mb-1 block">
                            Status
                          </label>
                          <select
                            className="w-full px-4 py-2.5 rounded-xl border border-gray-200 outline-none focus:border-[#1CADA3] text-sm bg-white"
                            value={selectedShare?.status || 'APPROVED'}
                            onChange={e => setSelectedShare({...selectedShare, status: e.target.value})}
                          >
                            <option value="APPROVED">APPROVED</option>
                            <option value="PENDING">PENDING</option>
                            <option value="REJECTED">REJECTED</option>
                          </select>
                        </div>
                        <div>
                          <label className="text-[10px] font-black uppercase text-gray-700 mb-1 block">
                            Active Status
                          </label>
                          <select
                            className="w-full px-4 py-2.5 rounded-xl border border-gray-200 outline-none focus:border-[#1CADA3] text-sm bg-white"
                            value={selectedShare?.is_active ? 'true' : 'false'}
                            onChange={e => setSelectedShare({...selectedShare, is_active: e.target.value === 'true'})}
                          >
                            <option value="true">Active</option>
                            <option value="false">Inactive</option>
                          </select>
                        </div>
                      </div>
                    </>
                  )}

                  <button 
                    type="submit"
                    disabled={submitLoading}
                    className="w-full py-3 bg-linear-to-r from-[#2076C7] to-[#1CADA3] text-white rounded-xl font-bold text-sm shadow-lg shadow-blue-100 mt-4 disabled:opacity-50 flex items-center justify-center gap-2"
                  >
                    {submitLoading ? (
                      <>
                        <RotateCw className="w-4 h-4 animate-spin" />
                        Processing...
                      </>
                    ) : (
                      modalType === 'add' ? 'Add Share' : 'Update Share'
                    )}
                  </button>
                </form>
              </motion.div>
            </div>
          )}
        </AnimatePresence>

        {/* --- DELETE CONFIRMATION MODAL --- */}
        <AnimatePresence>
          {deleteModalOpen && (
            <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/40 backdrop-blur-sm">
              <motion.div 
                initial={{ scale: 0.9, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.9, opacity: 0 }}
                className="bg-white rounded-3xl shadow-2xl w-full max-w-md overflow-hidden"
              >
                <div className="bg-red-50 px-6 py-4 border-b border-red-100 flex justify-between items-center">
                  <h3 className="font-bold text-red-600">Confirm Delete</h3>
                  <button onClick={() => setDeleteModalOpen(false)}>
                    <X className="w-5 h-5 text-red-400" />
                  </button>
                </div>

                <div className="p-6">
                  <p className="text-gray-600 mb-2">
                    Are you sure you want to delete:
                  </p>
                  <p className="font-bold text-gray-800 mb-4">
                    {shareToDelete?.shares_name}
                  </p>
                  <p className="text-sm text-red-600 bg-red-50 p-3 rounded-lg mb-6">
                    This action cannot be undone. All data associated with this share will be permanently removed.
                  </p>

                  <div className="flex gap-3">
                    <button
                      type="button"
                      onClick={() => setDeleteModalOpen(false)}
                      className="flex-1 py-3 px-4 bg-gray-100 text-gray-700 rounded-xl font-medium hover:bg-gray-200 transition-colors"
                      disabled={deleteLoading}
                    >
                      Cancel
                    </button>
                    <button
                      onClick={handleDelete}
                      disabled={deleteLoading}
                      className="flex-1 py-3 px-4 bg-red-600 text-white rounded-xl font-medium hover:bg-red-700 transition-colors disabled:opacity-50 flex items-center justify-center gap-2"
                    >
                      {deleteLoading ? (
                        <>
                          <RotateCw className="w-4 h-4 animate-spin" />
                          Deleting...
                        </>
                      ) : (
                        'Delete'
                      )}
                    </button>
                  </div>
                </div>
              </motion.div>
            </div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
};

export default ShareManagement;