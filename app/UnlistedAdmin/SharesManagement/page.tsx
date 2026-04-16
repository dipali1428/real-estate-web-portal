'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { AdminService, Share } from "../../services/unlistedadminservices";
import { 
  Package, Search, RotateCw, Building2,
  ChevronLeft, ChevronRight, Hash, Pencil, Trash2, Plus, X,
  IndianRupee, Layers, CheckCircle, XCircle, Clock
} from "lucide-react";
import { toast } from 'react-hot-toast';

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
        // --- LOGIC: Sort by ID numerically to ensure 1, 2, 3 sequence ---
        const sortedData = [...response].sort((a, b) => {
          return (Number(a.id) || 0) - (Number(b.id) || 0);
        });
        setShares(sortedData);
      }
    } catch (error) {
      toast.error('Error fetching shares');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchShares();
  }, []);

  // Pagination
  const filteredShares = shares.filter(share => 
    share.shares_name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
    share.clean_name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
    share.id?.toString().includes(searchTerm)
  );

  const totalPages = Math.ceil(filteredShares.length / itemsPerPage);
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
        if (selectedShare?.logo_url) addPayload.logo_url = selectedShare.logo_url;
        
        await AdminService.addShare(addPayload);  
        toast.success("Share added successfully!");
      } else {
        if (selectedShare?.id) {
          // --- TS FIX: Payload sanitization to avoid null/string type errors ---
          const updatePayload: any = {};
          if (selectedShare.shares_name) updatePayload.shares_name = selectedShare.shares_name;
          if (selectedShare.price) updatePayload.price = selectedShare.price;
          if (selectedShare.depository_applicable) updatePayload.depository_applicable = selectedShare.depository_applicable;
          if (selectedShare.min_lot_size) updatePayload.min_lot_size = selectedShare.min_lot_size;
          if (selectedShare.clean_name) updatePayload.clean_name = selectedShare.clean_name;
          
          // Fix for the logo_url error: Convert null to undefined
          updatePayload.logo_url = selectedShare.logo_url === null ? undefined : selectedShare.logo_url;
          
          if (selectedShare.is_active !== undefined) updatePayload.is_active = selectedShare.is_active;
          if (selectedShare.status) updatePayload.status = selectedShare.status;

          await AdminService.updateShare(selectedShare.id, updatePayload);
          toast.success("Share updated successfully!");
        }
      }
      
      setIsModalOpen(false);
      fetchShares();
    } catch (error: any) {
      toast.error("Submit error");
    } finally {
      setSubmitLoading(false);
    }
  };

  const handleDelete = async () => {
    if (!shareToDelete) return;
    setDeleteLoading(true);
    try {
      await AdminService.deleteShare(shareToDelete.id);
      toast.success("Share deleted successfully!");
      setDeleteModalOpen(false);
      setShareToDelete(null);
      fetchShares();
    } catch (error: any) {
      toast.error("Delete failed");
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
    <div className="flex-1 space-y-6 animate-fade-in">
      
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
                <th className="px-6 py-4 text-center">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-50">
              {loading ? (
                <tr><td colSpan={7} className="py-20 text-center animate-pulse text-gray-400 font-bold uppercase text-xs">Loading...</td></tr>
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
                  <td colSpan={7} className="py-20 text-center text-gray-400">
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
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="text-[10px] font-black uppercase text-gray-700 mb-1 block">Status</label>
                      <select
                        className="w-full px-4 py-2.5 rounded-xl border border-gray-200 outline-none focus:border-[#1CADA3] text-sm bg-white"
                        value={selectedShare?.status || 'APPROVED'}
                        onChange={e => setSelectedShare({...selectedShare, status: e.target.value})}
                      >
                        <option value="APPROVED">APPROVED</option>
                        <option value="PENDING">PENDING</option>
                      </select>
                    </div>
                    <div>
                      <label className="text-[10px] font-black uppercase text-gray-700 mb-1 block">Active Status</label>
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
                )}

                <button 
                  type="submit"
                  disabled={submitLoading}
                  className="w-full py-3 bg-linear-to-r from-[#2076C7] to-[#1CADA3] text-white rounded-xl font-bold text-sm shadow-lg mt-4 disabled:opacity-50"
                >
                  {submitLoading ? 'Processing...' : (modalType === 'add' ? 'Add Share' : 'Update Share')}
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
            <motion.div initial={{ scale: 0.9 }} animate={{ scale: 1 }} className="bg-white rounded-3xl shadow-2xl w-full max-w-md p-6">
              <h3 className="font-bold text-red-600 text-lg mb-2">Delete Share?</h3>
              <p className="text-gray-600 text-sm mb-6">Are you sure you want to delete <span className="font-bold">{shareToDelete?.shares_name}</span>?</p>
              <div className="flex gap-3">
                <button onClick={() => setDeleteModalOpen(false)} className="flex-1 py-3 bg-gray-100 rounded-xl font-bold text-sm">Cancel</button>
                <button onClick={handleDelete} disabled={deleteLoading} className="flex-1 py-3 bg-red-600 text-white rounded-xl font-bold text-sm disabled:opacity-50">
                  {deleteLoading ? 'Deleting...' : 'Delete Now'}
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default ShareManagement;