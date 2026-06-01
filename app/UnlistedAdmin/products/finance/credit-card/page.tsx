'use client';

import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { AdminService } from '@/app/services/unlistedadminservices';
import {
  Upload,
  FileSpreadsheet,
  X,
  Zap,
  Loader2,
  CreditCard,
  RefreshCw,
  CheckCircle,
  AlertCircle,
  Database,
  Search,
  Landmark,
  Pencil,
  Trash2,
  XCircle
} from "lucide-react";

const CreditCardImport: React.FC = () => {
  const [propertyFile, setPropertyFile] = useState<File | null>(null);
  const [isImporting, setIsImporting] = useState(false);
  const [toast, setToast] = useState<{ message: string; type: 'success' | 'error' | 'info' } | null>(null);
  const [isClient, setIsClient] = useState(false);
  const propertyInputRef = useRef<HTMLInputElement>(null);

  // Management States
  const [properties, setProperties] = useState<any[]>([]);
  const [propertiesLoading, setPropertiesLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(10);

  // Modal States
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [selectedProperty, setSelectedProperty] = useState<any>(null);
  const [submitLoading, setSubmitLoading] = useState(false);

  // Delete Modal States
  const [deleteModalOpen, setDeleteModalOpen] = useState(false);
  const [propertyToDelete, setPropertyToDelete] = useState<any>(null);
  const [deleteLoading, setDeleteLoading] = useState(false);

  useEffect(() => {
    setIsClient(true);
    fetchProperties();
  }, []);

 const fetchProperties = async () => {
  setPropertiesLoading(true);

  try {
    const response = await AdminService.getCreditCards();

    if (response && Array.isArray(response.data)) {
      setProperties(response.data);

      setToast({
        message: "Credit cards loaded successfully",
        type: "success"
      });
    } else {
      setProperties([]);

      setToast({
        message: "No credit cards found",
        type: "info"
      });
    }

  } catch (error) {
    setProperties([]);

    setToast({
      message: "Error fetching credit cards",
      type: "error"
    });

  } finally {
    setPropertiesLoading(false);
  }
};

  const handleImportProperties = async () => {
    if (!propertyFile) {
      setToast({ message: 'Please select a file first', type: 'error' });
      return;
    }

    setIsImporting(true);
    setToast({ message: 'Importing credit cards...', type: 'info' });

    try {
      const response = await AdminService.uploadCreditCards(propertyFile);

      const successMsg = `✓ Credit cards imported successfully (${response?.inserted || 0} records)`;
      setToast({ message: successMsg, type: 'success' });
      setPropertyFile(null);

    } catch (err: any) {
      const errorMsg = `✗ Import failed: ${err.response?.data?.message || err.message}`;
      setToast({ message: errorMsg, type: 'error' });
    } finally {
      setIsImporting(false);
      setTimeout(() => setToast(null), 5000);
      fetchProperties();
    }
  };

  // Filter and Pagination Logic
  const filteredProperties = properties.filter(p => 
    p.card_name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
    p.bank_name?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const paginatedProperties = filteredProperties.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  const totalPages = Math.ceil(filteredProperties.length / itemsPerPage);

  const openEditModal = (property: any) => {
    setSelectedProperty(property);
    setIsEditModalOpen(true);
  };

  const openDeleteModal = (property: any) => {
    setPropertyToDelete(property);
    setDeleteModalOpen(true);
  };

  const handleUpdateSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedProperty?.id) return;
    
    setSubmitLoading(true);
    try {
      await AdminService.updateCreditCard(selectedProperty.id, selectedProperty);
      setToast({ message: "Credit card updated successfully!", type: 'success' });
      setIsEditModalOpen(false);
      fetchProperties();
    } catch (error: any) {
      setToast({ message: `Update Failed: ${error.response?.data?.message || "Check all fields"}`, type: 'error' });
    } finally {
      setSubmitLoading(false);
      setTimeout(() => setToast(null), 5000);
    }
  };

  const handleDelete = async () => {
    if (!propertyToDelete?.id) return;
    
    setDeleteLoading(true);
    try {
      await AdminService.deleteCreditCard(propertyToDelete.id);
      setToast({ message: "Credit card deleted successfully!", type: 'success' });
      setDeleteModalOpen(false);
      setPropertyToDelete(null);
      fetchProperties();
    } catch (error: any) {
      setToast({ message: `Delete failed: ${error.response?.data?.message || error.message}`, type: 'error' });
    } finally {
      setDeleteLoading(false);
      setTimeout(() => setToast(null), 5000);
    }
  };

  const getStatusBadge = (status?: string) => {
    switch(status?.toUpperCase()) {
      case 'ACTIVE':
        return <span className="px-2 py-1 rounded-md text-[10px] font-black uppercase border bg-emerald-50 text-emerald-600 border-emerald-200"><CheckCircle className="w-3 h-3 inline mr-1" /> Active</span>;
      case 'INACTIVE':
        return <span className="px-2 py-1 rounded-md text-[10px] font-black uppercase border bg-gray-50 text-gray-500 border-gray-200"><XCircle className="w-3 h-3 inline mr-1" /> Inactive</span>;
      default:
        return <span className="px-2 py-1 rounded-md text-[10px] font-black uppercase border bg-blue-50 text-blue-600 border-blue-200">{status || 'UNKNOWN'}</span>;
    }
  };

  if (!isClient) return null;

  return (
    <div className="flex-1 space-y-6 animate-fade-in pb-10 w-full p-4 md:p-6">
      {/* HEADER */}
      <motion.div
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-gradient-to-r from-[#2076C7] to-[#1CADA3] rounded-2xl p-6 text-white shadow-md flex justify-between items-center"
      >
        <div className="flex items-center gap-3">
          <div className="bg-white/20 p-2 rounded-lg">
             <Database className="w-6 h-6" />
          </div>
          <div>
            <h2 className="text-2xl font-bold flex items-center gap-2">
              Credit Card Data Portal
            </h2>
            <p className="text-sm opacity-90">Import & export credit card data</p>
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
            <button
              onClick={() => setToast(null)}
              className="p-1 hover:bg-black/5 rounded-lg transition-colors"
            >
              <X className="w-4 h-4" />
            </button>
          </motion.div>
        )}
      </AnimatePresence>

      {/* SECTION - IMPORT CREDIT CARDS */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
        className="bg-white rounded-2xl shadow-lg border border-gray-100 overflow-hidden"
      >
        <div className="bg-gradient-to-r from-teal-50 to-emerald-50 px-6 py-4 border-b border-teal-100 flex justify-between items-center">
          <h3 className="font-bold text-gray-800 flex items-center gap-2">
            <CreditCard className="w-5 h-5 text-teal-600" />
            Import Credit Card Data
          </h3>
          <div className="flex items-center gap-2 bg-white/50 px-3 py-1 rounded-full border border-teal-200">
            <span className="text-[10px] font-black uppercase text-teal-700">Financial Product</span>
          </div>
        </div>

        <div className="p-6 grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="md:col-span-1 space-y-4">
            <div className="p-4 bg-teal-50/50 rounded-2xl border border-teal-100">
              <h4 className="text-sm font-bold text-teal-800 mb-2 flex items-center gap-2">
                <FileSpreadsheet className="w-4 h-4" /> Formatting Guide
              </h4>
              <ul className="space-y-2">
                {['Card Name', 'Bank Name', 'Card Type', 'Annual Fee', 'Status (ACTIVE/INACTIVE)', 'Image URL'].map((col, i) => (
                  <li key={i} className="text-xs text-gray-600 flex items-center gap-2">
                    <div className="w-1 h-1 bg-teal-400 rounded-full" /> {col}
                  </li>
                ))}
              </ul>
            </div>
            <div className="flex items-start gap-3 p-3 bg-blue-50/50 rounded-xl border border-blue-100">
              <Zap className="w-4 h-4 text-teal-600 shrink-0 mt-0.5" />
              <p className="text-xs text-teal-700 leading-relaxed">
                Cards will be automatically matched by Card Name & Bank. If a card exists, it will be updated.
              </p>
            </div>
          </div>

          <div className="md:col-span-2 space-y-6">
            {!propertyFile ? (
              <div
                onClick={() => propertyInputRef.current?.click()}
                className="border-2 border-dashed border-teal-200 rounded-2xl p-10 text-center cursor-pointer hover:border-teal-400 transition-all group bg-teal-50/20"
              >
                <div className="w-16 h-16 bg-teal-100 rounded-2xl flex items-center justify-center mx-auto mb-4 text-teal-600 group-hover:scale-110 transition-transform">
                  <Upload className="w-8 h-8" />
                </div>
                <h4 className="text-lg font-bold text-gray-700 mb-1">Select Credit Card Excel/CSV</h4>
                <p className="text-xs text-slate-500 uppercase font-black tracking-widest">Supports .xlsx, .xls, .csv</p>
                <input
                  type="file"
                  ref={propertyInputRef}
                  onChange={(e) => setPropertyFile(e.target.files?.[0] || null)}
                  accept=".csv, .xlsx, .xls"
                  hidden
                />
              </div>
            ) : (
              <div className="p-6 bg-teal-50 border border-teal-200 rounded-2xl flex items-center justify-between shadow-sm">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 bg-white rounded-xl flex items-center justify-center text-teal-600 shadow-sm">
                    <CreditCard className="w-6 h-6" />
                  </div>
                  <div>
                    <p className="font-bold text-gray-800 text-base">{propertyFile.name}</p>
                    <p className="text-xs text-teal-600 font-medium">Ready to sync data</p>
                  </div>
                </div>
                <button
                  onClick={() => setPropertyFile(null)}
                  className="p-2 hover:bg-teal-200 rounded-xl transition-colors text-teal-700"
                  disabled={isImporting}
                >
                  <X className="w-5 h-5" />
                </button>
              </div>
            )}

            <button
              onClick={handleImportProperties}
              disabled={!propertyFile || isImporting}
              className="w-full py-4 bg-teal-600 text-white font-black uppercase text-xs tracking-widest rounded-xl disabled:opacity-50 flex items-center justify-center gap-3 shadow-lg shadow-teal-100 hover:bg-teal-700 transition-all"
            >
              {isImporting ? (
                <>
                  <Loader2 className="animate-spin w-4 h-4" />
                  Processing Data...
                </>
              ) : (
                <>
                  <RefreshCw className="w-4 h-4" />
                  Upload & Sync Credit Cards
                </>
              )}
            </button>
          </div>
        </div>
      </motion.div>

      {/* SECTION - MANAGE CREDIT CARDS */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4 }}
        className="bg-white rounded-2xl shadow-lg border border-gray-100 overflow-hidden mt-8"
      >
        <div className="bg-gradient-to-r from-teal-50 to-emerald-50 px-6 py-4 border-b border-teal-100 flex justify-between items-center">
          <h3 className="font-bold text-black flex items-center gap-2">
            <Database className="w-5 h-5 text-teal-600" />
            Credit Card Management
          </h3>
          <button 
            onClick={fetchProperties} 
            className="p-2 bg-white border border-teal-200 hover:bg-teal-50 rounded-xl transition-all shadow-sm"
            title="Refresh Data"
          >
            <RefreshCw className={`w-4 h-4 text-teal-600 ${propertiesLoading ? 'animate-spin' : ''}`} />
          </button>
        </div>

        <div className="p-4 border-b border-gray-100 bg-gray-50/30 flex justify-between items-center flex-wrap gap-4">
          <span className="text-xs font-black uppercase tracking-widest text-[#2076C7]">
            Total: {filteredProperties.length} Cards
          </span>
          <div className="relative w-full md:w-80">
            <Search className="absolute left-3 top-2.5 text-gray-400 w-4 h-4" />
            <input
              type="text"
              placeholder="Search by card or bank name..."
              className="w-full pl-10 pr-4 py-2 rounded-lg border border-gray-200 focus:border-teal-400 focus:ring-1 focus:ring-teal-400 outline-none text-sm transition-all"
              value={searchTerm}
              onChange={(e) => {
                setSearchTerm(e.target.value);
                setCurrentPage(1);
              }}
            />
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead>
              <tr className="bg-gray-50 text-gray-400 text-[11px] font-black uppercase tracking-widest border-b border-gray-100">
                <th className="px-4 py-3">Card Name</th>
                <th className="px-4 py-3">Bank</th>
                <th className="px-4 py-3">Type</th>
                <th className="px-4 py-3">Annual Fee</th>
                <th className="px-4 py-3">Image URL</th>
                <th className="px-4 py-3">Status</th>
                <th className="px-4 py-3 text-center">Actions</th>
               </tr>
            </thead>
            <tbody className="divide-y divide-gray-50">
              {propertiesLoading ? (
                <tr><td colSpan={7} className="py-12 text-center animate-pulse text-gray-400 font-bold uppercase text-xs">Loading...</td></tr>
              ) : paginatedProperties.length > 0 ? (
                paginatedProperties.map((prop) => (
                  <tr key={prop.id} className="hover:bg-gray-50/50 transition-colors">
                    <td className="px-4 py-3">
                      <div className="font-bold text-gray-800 text-sm">{prop.card_name}</div>
                     </td>
                    <td className="px-4 py-3 text-sm font-medium text-gray-700">
                      <div className="flex items-center gap-1"><Landmark className="w-4 h-4 text-teal-600"/>{prop.bank_name || '—'}</div>
                     </td>
                    <td className="px-4 py-3 font-medium text-gray-700 text-sm">
                      {prop.card_type || '—'}
                     </td>
                    <td className="px-4 py-3 font-bold text-teal-600 text-sm">
                      {prop.annual_fee ? `₹ ${parseFloat(prop.annual_fee).toLocaleString('en-IN')}` : 'Free'}
                     </td>
                    <td className="px-4 py-3 text-sm font-medium text-gray-700 max-w-[150px] truncate">
                      {prop.image_url ? <a href={prop.image_url} target="_blank" rel="noreferrer" className="text-blue-500 hover:underline">Link</a> : '—'}
                     </td>
                    <td className="px-4 py-3">
                      {getStatusBadge(prop.status)}
                     </td>
                    <td className="px-4 py-3">
                      <div className="flex justify-center gap-1">
                        <button 
                          onClick={() => openEditModal(prop)}
                          className="p-1.5 text-blue-500 hover:bg-blue-50 rounded-lg transition-colors"
                          title="Edit Card"
                        >
                          <Pencil className="w-3.5 h-3.5" />
                        </button>
                        <button 
                          onClick={() => openDeleteModal(prop)}
                          className="p-1.5 text-rose-500 hover:bg-rose-50 rounded-lg transition-colors"
                          title="Delete Card"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </div>
                     </td>
                   </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={7} className="py-12 text-center text-gray-400">
                    <CreditCard className="w-10 h-10 mx-auto mb-2 opacity-20" />
                    <p className="text-sm font-medium">No credit cards found</p>
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        {/* PAGINATION */}
        {totalPages > 1 && (
          <div className="px-4 py-3 border-t border-gray-100 flex items-center justify-between bg-gray-50/30">
            <span className="text-sm text-gray-600">
              Page {currentPage} of {totalPages}
            </span>
            <div className="flex items-center gap-2">
              <button
                onClick={() => setCurrentPage(p => Math.max(1, p - 1))}
                disabled={currentPage === 1}
                className="px-4 py-1.5 text-sm font-bold text-white bg-gradient-to-r from-[#2076C7] to-[#1CADA3] rounded-lg transition-all hover:opacity-90 disabled:opacity-30 shadow-sm"
              >
                Previous
              </button>
              <button
                onClick={() => setCurrentPage(p => Math.min(totalPages, p + 1))}
                disabled={currentPage === totalPages}
                className="px-4 py-1.5 text-sm font-bold text-white bg-gradient-to-r from-[#2076C7] to-[#1CADA3] rounded-lg transition-all hover:opacity-90 disabled:opacity-30 shadow-sm"
              >
                Next
              </button>
            </div>
          </div>
        )}
      </motion.div>

      {/* EDIT MODAL */}
      <AnimatePresence>
        {isEditModalOpen && (
          <div className="fixed inset-0 z-[60] flex items-center justify-center p-4 bg-black/40 backdrop-blur-sm">
            <motion.div 
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="bg-white rounded-2xl shadow-2xl w-full max-w-2xl overflow-hidden max-h-[90vh] overflow-y-auto"
            >
              <div className="bg-gradient-to-r from-teal-50 to-emerald-50 px-5 py-4 border-b border-teal-100 flex justify-between items-center sticky top-0 z-10">
                <h3 className="font-bold text-black">Update Credit Card</h3>
                <button onClick={() => setIsEditModalOpen(false)} className="p-1 hover:bg-white/50 rounded-lg">
                  <X className="w-5 h-5 text-gray-400 hover:text-gray-600" />
                </button>
              </div>

              <form onSubmit={handleUpdateSubmit} className="p-5 space-y-4">
                <div className="grid grid-cols-2 gap-4 text-black">
                  <div className="col-span-2 md:col-span-1 ">
                    <label className="text-[10px] font-black uppercase text-gray-600 mb-1 block">Card Name *</label>
                    <input 
                      required
                      className="w-full px-3 py-2  rounded-lg border border-gray-200 outline-none focus:border-teal-400 focus:ring-1 focus:ring-teal-400 text-sm"
                      value={selectedProperty?.card_name || ''}
                      onChange={e => setSelectedProperty({...selectedProperty, card_name: e.target.value})}
                    />
                  </div>
                  <div className="col-span-2 md:col-span-1">
                    <label className="text-[10px] font-black uppercase text-gray-600 mb-1 block">Bank Name</label>
                    <input 
                      className="w-full px-3 py-2 rounded-lg border border-gray-200 outline-none focus:border-teal-400 focus:ring-1 focus:ring-teal-400 text-sm"
                      value={selectedProperty?.bank_name || ''}
                      onChange={e => setSelectedProperty({...selectedProperty, bank_name: e.target.value})}
                    />
                  </div>
                  
                  <div className="col-span-2 md:col-span-1">
                    <label className="text-[10px] font-black uppercase text-gray-600 mb-1 block">Card Type</label>
                    <input 
                      className="w-full px-3 py-2 rounded-lg border border-gray-200 outline-none focus:border-teal-400 focus:ring-1 focus:ring-teal-400 text-sm"
                      value={selectedProperty?.card_type || ''}
                      onChange={e => setSelectedProperty({...selectedProperty, card_type: e.target.value})}
                      placeholder="e.g. Cashback, Travel"
                    />
                  </div>
                  
                  <div className="col-span-2 md:col-span-1">
                    <label className="text-[10px] font-black uppercase text-gray-600 mb-1 block">Annual Fee (₹)</label>
                    <input 
                      type="number"
                      className="w-full px-3 py-2 rounded-lg border border-gray-200 outline-none focus:border-teal-400 focus:ring-1 focus:ring-teal-400 text-sm"
                      value={selectedProperty?.annual_fee || ''}
                      onChange={e => setSelectedProperty({...selectedProperty, annual_fee: e.target.value})}
                    />
                  </div>

                  <div className="col-span-2 md:col-span-1">
                    <label className="text-[10px] font-black uppercase text-gray-600 mb-1 block">Image URL</label>
                    <input 
                      className="w-full px-3 py-2 rounded-lg border border-gray-200 outline-none focus:border-teal-400 focus:ring-1 focus:ring-teal-400 text-sm"
                      value={selectedProperty?.image_url || ''}
                      onChange={e => setSelectedProperty({...selectedProperty, image_url: e.target.value})}
                      placeholder="e.g. https://aws-bucket..."
                    />
                  </div>

                  <div className="col-span-2 md:col-span-1">
                    <label className="text-[10px] font-black uppercase text-gray-600 mb-1 block">Status</label>
                    <select
                      className="w-full px-3 py-2 rounded-lg border border-gray-200 outline-none focus:border-teal-400 focus:ring-1 focus:ring-teal-400 text-sm bg-white"
                      value={selectedProperty?.status || 'ACTIVE'}
                      onChange={e => setSelectedProperty({...selectedProperty, status: e.target.value})}
                    >
                      <option value="ACTIVE">ACTIVE</option>
                      <option value="INACTIVE">INACTIVE</option>
                    </select>
                  </div>
                </div>

                <div className="flex justify-center mt-6">
                  <button 
                    type="submit"
                    disabled={submitLoading}
                    className="px-10 py-3 bg-teal-600 hover:bg-teal-700 text-white rounded-xl font-black uppercase tracking-[0.2em] text-xs disabled:opacity-50 flex items-center justify-center gap-2 transition-all shadow-md"
                  >
                    {submitLoading ? <Loader2 className="animate-spin w-4 h-4" /> : null}
                    {submitLoading ? 'Updating...' : 'Save Changes'}
                  </button>
                </div>
              </form>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* DELETE MODAL */}
      <AnimatePresence>
        {deleteModalOpen && (
          <div className="fixed inset-0 z-[60] flex items-center justify-center p-4 bg-black/40 backdrop-blur-sm">
            <motion.div 
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="bg-white rounded-2xl shadow-2xl w-full max-w-md overflow-hidden"
            >
              <div className="bg-red-50 px-5 py-4 border-b border-red-100 flex justify-between items-center">
                <h3 className="font-bold text-red-600">Confirm Deletion</h3>
                <button onClick={() => setDeleteModalOpen(false)} className="p-1 hover:bg-white/50 rounded-lg">
                  <X className="w-5 h-5 text-red-400" />
                </button>
              </div>

              <div className="p-5">
                <p className="text-gray-600 text-sm mb-2">Are you sure you want to delete this credit card?</p>
                <p className="font-bold text-gray-800 text-base mb-4">{propertyToDelete?.card_name}</p>
                
                <div className="flex gap-3 mt-4">
                  <button
                    type="button"
                    onClick={() => setDeleteModalOpen(false)}
                    className="flex-1 py-2.5 px-4 bg-gray-100 text-gray-700 rounded-lg font-medium text-sm"
                    disabled={deleteLoading}
                  >
                    Cancel
                  </button>
                  <button
                    onClick={handleDelete}
                    disabled={deleteLoading}
                    className="flex-1 py-2.5 px-4 bg-red-600 text-white rounded-lg font-medium text-sm flex justify-center items-center gap-2"
                  >
                    {deleteLoading ? <Loader2 className="animate-spin w-4 h-4" /> : 'Confirm Delete'}
                  </button>
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default CreditCardImport;
