"use client";

import React, { useState, useEffect, useMemo } from "react";
import { 
  Plus, Upload, Trash2, Search, 
  FileText, CheckCircle2, AlertCircle, 
  TrendingUp,  Landmark, 
  X, Edit3
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import toast from "react-hot-toast";
import { AdminService } from "../../../../services/unlistedadminservices";
import { NCDData } from "../../../../products/NCD/data/ncdData";
import CustomerService from "../../../../services/customerService";

export default function AdminNCDManagement() {
  const [ncds, setNcds] = useState<NCDData[]>([]);
  const [loading, setLoading] = useState(true);
  const [uploading, setUploading] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState("All");

  const [editingNCD, setEditingNCD] = useState<NCDData | null>(null);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);

  useEffect(() => {
    fetchNCDs();
  }, []);

  const fetchNCDs = async () => {
    try {
      setLoading(true);
      const data = await CustomerService.getAllNCDs();
      setNcds(Array.isArray(data) ? data : (data?.data || []));
    } catch (error: any) {
      toast.error(error?.response?.data?.message || "Failed to fetch NCDs");
    } finally {
      setLoading(false);
    }
  };

  const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (!file.name.endsWith(".csv")) {
      toast.error("Please upload a CSV file");
      return;
    }

    try {
      setUploading(true);
      const res = await AdminService.uploadNCDs(file);
      toast.success(res.message || "NCDs uploaded successfully");
      fetchNCDs();
    } catch (error: any) {
      toast.error(error?.response?.data?.message || "Upload failed");
    } finally {
      setUploading(false);
      // Reset input
      e.target.value = "";
    }
  };

  const handleDelete = async (id: any) => {
    if (!window.confirm("Are you sure you want to delete this NCD?")) return;

    try {
      await AdminService.deleteNCD(id);
      toast.success("NCD deleted successfully");
      setNcds(ncds.filter(ncd => ncd.id !== id));
    } catch (error: any) {
      toast.error(error?.response?.data?.message || "Delete failed");
    }
  };

  const handleEditClick = (ncd: NCDData) => {
    setEditingNCD({ ...ncd });
    setIsEditModalOpen(true);
  };

  const handleUpdate = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingNCD) return;

    try {
      setUploading(true);
      await AdminService.updateNCD(editingNCD.id, editingNCD);
      toast.success("NCD updated successfully ✅");
      setIsEditModalOpen(false);
      fetchNCDs();
    } catch (error: any) {
      toast.error(error?.response?.data?.message || "Update failed ❌");
    } finally {
      setUploading(false);
    }
  };

  const filteredNCDs = useMemo(() => {
    return ncds.filter(ncd => {
      const matchesSearch = ncd.issuer.toLowerCase().includes(searchQuery.toLowerCase()) || 
                           ncd.isin?.toLowerCase().includes(searchQuery.toLowerCase());
      const matchesStatus = statusFilter === "All" || ncd.status === statusFilter;
      return matchesSearch && matchesStatus;
    });
  }, [ncds, searchQuery, statusFilter]);

  return (
    <div className="p-4 sm:p-6 md:p-8 bg-[#F8FAFC] min-h-screen">
      {/* Edit Modal */}
      <AnimatePresence>
        {isEditModalOpen && editingNCD && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
            <motion.div 
              initial={{ opacity: 0 }} 
              animate={{ opacity: 1 }} 
              exit={{ opacity: 0 }}
              onClick={() => setIsEditModalOpen(false)}
              className="absolute inset-0 bg-slate-900/40 backdrop-blur-sm"
            />
            <motion.div 
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              className="relative bg-white w-full max-w-2xl rounded-[2.5rem] shadow-2xl overflow-hidden flex flex-col max-h-[90vh]"
            >
              <div className="p-8 border-b border-slate-100 flex items-center justify-between bg-slate-50/50">
                <div>
                  <h2 className="text-2xl font-black text-slate-900">Edit NCD Details</h2>
                  <p className="text-slate-500 text-sm font-medium">Update issue information for {editingNCD.issuer}</p>
                </div>
                <button 
                  onClick={() => setIsEditModalOpen(false)}
                  className="p-2 hover:bg-white rounded-full transition-colors shadow-sm"
                >
                  <X size={20} className="text-slate-400" />
                </button>
              </div>

              <form onSubmit={handleUpdate} className="p-8 overflow-y-auto space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">Issuer Name</label>
                    <input 
                      type="text" 
                      value={editingNCD.issuer} 
                      onChange={(e) => setEditingNCD({...editingNCD, issuer: e.target.value})}
                      className="w-full px-5 py-3 bg-slate-50 border-none rounded-2xl text-sm font-bold focus:ring-2 focus:ring-blue-500/20"
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">ISIN</label>
                    <input 
                      type="text" 
                      value={editingNCD.isin} 
                      onChange={(e) => setEditingNCD({...editingNCD, isin: e.target.value})}
                      className="w-full px-5 py-3 bg-slate-50 border-none rounded-2xl text-sm font-bold focus:ring-2 focus:ring-blue-500/20"
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">Rating</label>
                    <input 
                      type="text" 
                      value={editingNCD.rating} 
                      onChange={(e) => setEditingNCD({...editingNCD, rating: e.target.value})}
                      className="w-full px-5 py-3 bg-slate-50 border-none rounded-2xl text-sm font-bold focus:ring-2 focus:ring-blue-500/20"
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">Interest / Yield</label>
                    <input 
                      type="text" 
                      value={editingNCD.interest} 
                      onChange={(e) => setEditingNCD({...editingNCD, interest: e.target.value})}
                      className="w-full px-5 py-3 bg-slate-50 border-none rounded-2xl text-sm font-bold focus:ring-2 focus:ring-blue-500/20"
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">Tenure</label>
                    <input 
                      type="text" 
                      value={editingNCD.tenure} 
                      onChange={(e) => setEditingNCD({...editingNCD, tenure: e.target.value})}
                      className="w-full px-5 py-3 bg-slate-50 border-none rounded-2xl text-sm font-bold focus:ring-2 focus:ring-blue-500/20"
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">Min Investment</label>
                    <input 
                      type="text" 
                      value={editingNCD.minInvest} 
                      onChange={(e) => setEditingNCD({...editingNCD, minInvest: e.target.value})}
                      className="w-full px-5 py-3 bg-slate-50 border-none rounded-2xl text-sm font-bold focus:ring-2 focus:ring-blue-500/20"
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">Status</label>
                    <select 
                      value={editingNCD.status} 
                      onChange={(e) => setEditingNCD({...editingNCD, status: e.target.value as any})}
                      className="w-full px-5 py-3 bg-slate-50 border-none rounded-2xl text-sm font-bold focus:ring-2 focus:ring-blue-500/20 appearance-none"
                    >
                      <option value="Open">Open</option>
                      <option value="Upcoming">Upcoming</option>
                      <option value="Closed">Closed</option>
                    </select>
                  </div>
                </div>

                <div className="pt-6 border-t border-slate-100 flex gap-4">
                  <button 
                    type="button"
                    onClick={() => setIsEditModalOpen(false)}
                    className="flex-1 px-6 py-4 bg-slate-100 text-slate-600 rounded-2xl font-black text-sm hover:bg-slate-200 transition-colors"
                  >
                    Cancel
                  </button>
                  <button 
                    type="submit"
                    disabled={uploading}
                    className="flex-2 px-10 py-4 bg-blue-600 text-white rounded-2xl font-black text-sm hover:bg-blue-700 shadow-lg shadow-blue-200 transition-all disabled:opacity-50"
                  >
                    {uploading ? "Updating..." : "Save Changes"}
                  </button>
                </div>
              </form>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* Header Section */}
      <div className="max-w-7xl mx-auto space-y-8">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div>
            <h1 className="text-3xl font-black text-slate-900 tracking-tight flex items-center gap-3">
              <div className="p-2.5 bg-blue-600 rounded-xl text-white shadow-lg shadow-blue-200">
                <Landmark size={24} />
              </div>
              NCD Management
            </h1>
            <p className="text-slate-500 mt-2 font-medium">
              Manage Non-Convertible Debentures, upload data, and monitor live issues.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-3">
            <div className="relative group">
              <input
                type="file"
                onChange={handleFileUpload}
                accept=".csv"
                className="hidden"
                id="csv-upload"
                disabled={uploading}
              />
              <label
                htmlFor="csv-upload"
                className={`flex items-center gap-2 px-6 py-3 rounded-2xl font-bold text-sm transition-all cursor-pointer shadow-sm ${
                  uploading 
                  ? "bg-slate-100 text-slate-400 cursor-not-allowed" 
                  : "bg-white text-slate-700 border border-slate-200 hover:border-blue-500 hover:text-blue-600 hover:shadow-md"
                }`}
              >
                {uploading ? (
                  <div className="animate-spin rounded-full h-4 w-4 border-2 border-slate-400 border-t-transparent" />
                ) : (
                  <Upload size={18} />
                )}
                {uploading ? "Processing..." : "Import CSV"}
              </label>
            </div>
            
            <button className="flex items-center gap-2 bg-blue-600 text-white px-6 py-3 rounded-2xl font-bold text-sm hover:bg-blue-700 hover:shadow-xl hover:shadow-blue-200 transition-all shadow-lg shadow-blue-100">
              <Plus size={18} />
              Add NCD
            </button>
          </div>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {[
            { label: "Total Issues", value: ncds.length, icon: FileText, color: "blue" },
            { label: "Live Now", value: ncds.filter(n => n.status === "Open").length, icon: CheckCircle2, color: "emerald" },
            { label: "Upcoming", value: ncds.filter(n => n.status === "Upcoming").length, icon: TrendingUp, color: "amber" },
            { label: "Total ISINs", value: new Set(ncds.map(n => n.isin)).size, icon: Landmark, color: "indigo" },
          ].map((stat, i) => (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.1 }}
              key={stat.label}
              className="bg-white p-6 rounded-3xl border border-slate-100 shadow-sm"
            >
              <div className={`p-3 bg-${stat.color}-50 text-${stat.color}-600 rounded-2xl w-fit mb-4`}>
                <stat.icon size={20} />
              </div>
              <p className="text-slate-500 text-xs font-bold uppercase tracking-widest">{stat.label}</p>
              <h3 className="text-2xl font-black text-slate-900 mt-1">{stat.value}</h3>
            </motion.div>
          ))}
        </div>

        {/* Filter & Table Section */}
        <div className="bg-white rounded-[2.5rem] border border-slate-100 shadow-sm overflow-hidden">
          <div className="p-6 border-b border-slate-50 flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div className="relative flex-1 max-w-md">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
              <input
                type="text"
                placeholder="Search by issuer or ISIN..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-12 pr-4 py-3 bg-slate-50 rounded-2xl border-none focus:ring-2 focus:ring-blue-500/20 text-sm font-medium"
              />
            </div>
            
            <div className="flex items-center gap-3">
              <div className="flex p-1 bg-slate-50 rounded-2xl">
                {["All", "Open", "Upcoming", "Closed"].map((status) => (
                  <button
                    key={status}
                    onClick={() => setStatusFilter(status)}
                    className={`px-4 py-2 rounded-xl text-xs font-bold transition-all ${
                      statusFilter === status 
                      ? "bg-white text-blue-600 shadow-sm" 
                      : "text-slate-500 hover:text-slate-700"
                    }`}
                  >
                    {status}
                  </button>
                ))}
              </div>
            </div>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-slate-50/50">
                  <th className="px-6 py-4 text-[10px] font-black text-slate-400 uppercase tracking-widest">Issuer</th>
                  <th className="px-6 py-4 text-[10px] font-black text-slate-400 uppercase tracking-widest">Rating</th>
                  <th className="px-6 py-4 text-[10px] font-black text-slate-400 uppercase tracking-widest">Yield</th>
                  <th className="px-6 py-4 text-[10px] font-black text-slate-400 uppercase tracking-widest">Min. Invest</th>
                  <th className="px-6 py-4 text-[10px] font-black text-slate-400 uppercase tracking-widest">Status</th>
                  <th className="px-6 py-4 text-[10px] font-black text-slate-400 uppercase tracking-widest">ISIN</th>
                  <th className="px-6 py-4 text-[10px] font-black text-slate-400 uppercase tracking-widest text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-50">
                {loading ? (
                  Array(5).fill(0).map((_, i) => (
                    <tr key={i} className="animate-pulse">
                      <td colSpan={7} className="px-6 py-8">
                        <div className="h-4 bg-slate-100 rounded-full w-full" />
                      </td>
                    </tr>
                  ))
                ) : filteredNCDs.length > 0 ? (
                  filteredNCDs.map((ncd) => (
                    <tr key={ncd.id} className="hover:bg-slate-50/50 transition-colors group">
                      <td className="px-6 py-4">
                        <div>
                          <p className="font-bold text-slate-900 line-clamp-1">{ncd.issuer}</p>
                          <p className="text-[10px] text-slate-400 font-medium line-clamp-1">{ncd.title}</p>
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <span className="inline-flex items-center px-2.5 py-1 rounded-lg bg-indigo-50 text-indigo-700 text-[10px] font-black border border-indigo-100">
                          {ncd.rating}
                        </span>
                      </td>
                      <td className="px-6 py-4 font-black text-slate-700 text-sm">{ncd.interest}</td>
                      <td className="px-6 py-4 font-bold text-slate-600 text-sm">{ncd.minInvest}</td>
                      <td className="px-6 py-4">
                        <span className={`inline-flex items-center px-2.5 py-1 rounded-lg text-[10px] font-black border ${
                          ncd.status === "Open" ? "bg-emerald-50 text-emerald-700 border-emerald-100" :
                          ncd.status === "Upcoming" ? "bg-amber-50 text-amber-700 border-amber-100" :
                          "bg-slate-50 text-slate-600 border-slate-100"
                        }`}>
                          {ncd.status}
                        </span>
                      </td>
                      <td className="px-6 py-4 font-mono text-[10px] text-slate-400">{ncd.isin}</td>
                      <td className="px-6 py-4 text-right">
                        <div className="flex items-center justify-end gap-2">
                          <button 
                            onClick={() => handleEditClick(ncd)}
                            className="p-2 text-slate-400 hover:text-blue-600 hover:bg-blue-50 rounded-xl transition-all"
                          >
                            <Edit3 size={16} />
                          </button>
                          <button 
                            onClick={() => handleDelete(ncd.id)}
                            className="p-2 text-slate-400 hover:text-red-600 hover:bg-red-50 rounded-xl transition-all"
                          >
                            <Trash2 size={16} />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan={7} className="px-6 py-20 text-center">
                      <div className="flex flex-col items-center">
                        <div className="p-4 bg-slate-50 rounded-3xl mb-4">
                          <AlertCircle size={32} className="text-slate-300" />
                        </div>
                        <h3 className="text-lg font-bold text-slate-900">No NCDs Found</h3>
                        <p className="text-slate-500 text-sm max-w-xs mx-auto mt-2">
                          Start by uploading a CSV file or add an NCD manually to see them here.
                        </p>
                      </div>
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}
