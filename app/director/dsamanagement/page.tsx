"use client";

import { useState, useEffect, useCallback, useMemo } from "react";
import { Tab } from "@headlessui/react";
import * as XLSX from "xlsx";
import { AdminService } from "@/app/services/adminService";
import { STATES_CITIES } from "@/app/data/statesCities";
import {
  Pencil,
  RefreshCw,
  FileUp,
  Users,
  UserCheck,
  UserX,
  Search,
  X,
  ChevronLeft,
  ChevronRight,
  Clock,
  Trash2,
} from "lucide-react";
import toast, { Toaster } from "react-hot-toast";

// --- TYPES & INTERFACES ---
interface DSA {
  password?: string;
  id: string;
  adv_id: string;
  name: string;
  email: string;
  mobile: string;
  pan: string;
  city: string;
  head: string;
  category: string;
  date_joined: string;
  updated_at: string;
  role: string;
  status: "Active" | "Inactive" | "Pending";
}

const mapApiDataToDSA = (apiData: any[]): DSA[] => {
  return apiData.map((item) => ({
    id: item.id?.toString() || "",
    adv_id: item.adv_id || "",
    name: item.name || "",
    email: item.email || "",
    mobile: item.mobile || "",
    pan: item.pan || "",
    city: item.city || "",
    head: item.head || "",
    category: item.category || "",
    date_joined: item.date_joined || "",
    updated_at: item.updated_at || "",
    role: item.role || "",
    status: "Active",
    password: item.password || "",
  }));
};

function classNames(...classes: string[]) {
  return classes.filter(Boolean).join(" ");
}

const inputClass =
  "w-full px-3 py-2 border border-gray-300 rounded-lg outline-none focus:ring-2 focus:ring-[#2076C7] bg-white text-gray-700 placeholder-gray-400 text-sm transition-all";

export default function DSAManagementPage() {
  const [dsas, setDsas] = useState<DSA[]>([]);
  const [totalCount, setTotalCount] = useState(0); // Added to store the 'count' from API
  const [editingDSA, setEditingDSA] = useState<DSA | null>(null);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
  const [activeTab, setActiveTab] = useState("All");
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(10); // Matches your API default limit

  const tabs = ["All", "Active", "Inactive", "Pending"];

  const [cities, setCities] = useState<string[]>(() => 
    Array.from(new Set(Object.values(STATES_CITIES).flat())).sort()
  );
  const [roles, setRoles] = useState<string[]>([]);

  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [dsaToDelete, setDsaToDelete] = useState<string | null>(null);

  const fetchDSAs = useCallback(async () => {
    try {
      setLoading(true);
      // Passing pagination and search params to the API
      const apiResponse = await AdminService.dsaList({
        page: currentPage,
        limit: itemsPerPage,
        search: searchQuery
      });

      const apiData = apiResponse?.dsalist || apiResponse?.dsas || [];
      const count = apiResponse?.count || 0;

      const mappedDSAs = mapApiDataToDSA(apiData);
      setDsas(mappedDSAs);
      setTotalCount(count); // Setting the proper 2690 count here

      if (cities.length === 0) {
        // Flatten all cities from all states into one unique, sorted list
        const allCities = Object.values(STATES_CITIES)
          .flat()
          .filter((city) => city !== "Other"); // Optional: remove "Other" if you don't want it in the list
        
        const uniqueSortedCities = Array.from(new Set(allCities)).sort();
        setCities(uniqueSortedCities);
      }
      if (roles.length === 0) {
        setRoles(Array.from(new Set(mappedDSAs.map((d) => d.role).filter(Boolean))));
      }
    } catch (err) {
      toast.error("Failed to load DSAs");
    } finally {
      setLoading(false);
    }
  }, [currentPage, itemsPerPage, searchQuery]); // Re-fetch when these change

  useEffect(() => {
    fetchDSAs();
  }, [fetchDSAs]);

  // Handle Tab Filtering locally (since the current API might not support status filtering)
  const filteredDSAs = useMemo(() => {
    let result = dsas;
    if (activeTab !== "All") {
      result = result.filter((dsa) => dsa.status === activeTab);
    }
    return result;
  }, [dsas, activeTab]);

  // Pagination logic using server totalCount
  const totalPages = Math.max(1, Math.ceil(totalCount / itemsPerPage));

  const getPaginationGroup = useMemo(() => {
    const pages: (number | string)[] = [];
    if (totalPages <= 7) {
      for (let i = 1; i <= totalPages; i++) pages.push(i);
    } else {
      if (currentPage <= 3) pages.push(1, 2, 3, 4, "...", totalPages);
      else if (currentPage >= totalPages - 2)
        pages.push(1, "...", totalPages - 3, totalPages - 2, totalPages - 1, totalPages);
      else pages.push(1, "...", currentPage - 1, currentPage, currentPage + 1, "...", totalPages);
    }
    return pages;
  }, [currentPage, totalPages]);

  const handleEdit = (dsa: DSA) => {
    setEditingDSA({ ...dsa });
    setIsEditModalOpen(true);
  };

  const handleSaveEdit = async () => {
    if (!editingDSA) return;
    const loadId = toast.loading("Updating DSA...");
    try {
      await AdminService.updateDSA(editingDSA.id, editingDSA);
      toast.success("DSA Updated Successfully!", { id: loadId });
      setDsas((prev) => prev.map((d) => (d.id === editingDSA.id ? { ...editingDSA, updated_at: new Date().toISOString() } : d)));
      setIsEditModalOpen(false);
    } catch (err) {
      toast.error("Failed to update DSA", { id: loadId });
    }
  };

  // Call this when the trash icon is clicked
  const handleDeleteClick = (id: string) => {
    setDsaToDelete(id);
    setIsDeleteModalOpen(true);
  };

  // Call this when "Confirm" is clicked inside the custom modal
  const handleConfirmDelete = async () => {
    if (!dsaToDelete) return;

    const loadId = toast.loading("Deleting DSA...");
    try {
      await AdminService.deleteDSA(dsaToDelete);
      toast.success("DSA Deleted Successfully!", { id: loadId });

      // Update local state
      setDsas((prev) => prev.filter((dsa) => dsa.id !== dsaToDelete));
      setTotalCount((prev) => prev - 1);
    } catch (err) {
      toast.error("Failed to delete DSA", { id: loadId });
    } finally {
      setIsDeleteModalOpen(false);
      setDsaToDelete(null);
    }
  };

const downloadExcel = async () => {
  const loadId = toast.loading("Preparing all data for export...");
  try {
    const response = await AdminService.downloadDsa();

    const allApiData = response?.dsalist || response?.dsas || [];
    
    if (allApiData.length === 0) {
      toast.error("No data found to export", { id: loadId });
      return;
    }

    // 2. Map the data to your DSA format
    const allMappedDSAs = mapApiDataToDSA(allApiData);

    // 3. Create and download the Excel file
    const worksheet = XLSX.utils.json_to_sheet(allMappedDSAs);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, "All DSAs");
    
    XLSX.writeFile(
      workbook, 
      `DSA_Full_Report_${new Date().toISOString().split("T")[0]}.xlsx`
    );

    toast.success("Export complete!", { id: loadId });
  } catch (err) {
    console.error(err);
    toast.error("Failed to export data", { id: loadId });
  }
};

  const formatDate = (dateString: string) => {
    if (!dateString) return "-";
    const date = new Date(dateString);
    return isNaN(date.getTime()) ? dateString : date.toLocaleDateString("en-IN", { day: "2-digit", month: "short", year: "numeric" });
  };

  const stats = {
    total: totalCount, // Properly using the API count
    active: totalCount,
    inactive: dsas.filter((d) => d.status === "Inactive").length,
    pending: dsas.filter((d) => d.status === "Pending").length,
  };

  return (
    <div className="bg-gray-50 py-6 min-h-screen">
      <Toaster position="top-right" />
      <div className="max-w-full mx-auto sm:px-4 lg:px-6">
        <div className="mb-5 flex flex-col md:flex-row md:items-center md:justify-between gap-3">
          <div>
            <h1 className="text-2xl sm:text-3xl font-bold text-slate-800 flex items-center gap-2">
              <Users className="h-6 w-6 text-[#2076C7]" /> DSA Management
            </h1>
            <p className="text-sm text-slate-600">View and manage all Direct Selling Agents.</p>
          </div>
          <div className="flex items-center gap-2">
            <button onClick={() => fetchDSAs()} className="flex items-center gap-2 px-3 py-2 bg-white border border-gray-300 rounded-lg text-sm font-medium text-gray-700 hover:bg-gray-50 shadow-sm transition-colors">
              <RefreshCw className={classNames("h-4 w-4", loading ? "animate-spin" : "")} /> Refresh
            </button>
            <button onClick={downloadExcel} className="flex items-center gap-2 px-3 py-2 bg-green-600 text-white rounded-lg text-sm font-medium hover:bg-green-700 shadow-sm transition-colors">
              <FileUp className="h-4 w-4" /> Export Excel
            </button>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
          {[
            { label: "Total DSAs", value: stats.total, icon: Users, color: "text-blue-600", bg: "bg-blue-50", border: "border-blue-200" },
            { label: "Active", value: stats.active, icon: UserCheck, color: "text-green-600", bg: "bg-green-50", border: "border-green-200" },
            { label: "Inactive", value: stats.inactive, icon: UserX, color: "text-red-600", bg: "bg-red-50", border: "border-red-200" },
            { label: "Pending", value: stats.pending, icon: Clock, color: "text-yellow-600", bg: "bg-yellow-50", border: "border-yellow-200" },
          ].map((stat, i) => (
            <div key={i} className={`bg-white p-4 rounded-xl shadow-sm border ${stat.border} flex items-center gap-4`}>
              <div className={`${stat.bg} p-3 rounded-lg`}>
                <stat.icon className={`w-6 h-6 ${stat.color}`} />
              </div>
              <div>
                <p className="text-xs font-bold text-gray-500 uppercase tracking-wider">{stat.label}</p>
                <p className="text-2xl font-bold text-slate-800">{stat.value}</p>
              </div>
            </div>
          ))}
        </div>

        <Tab.Group onChange={(index) => { setActiveTab(tabs[index]); setCurrentPage(1); }}>
          <div className="flex flex-col gap-4 mb-4">
            <div className="flex flex-col md:flex-row md:items-center gap-3">

              {/* LEFT SECTION (Search + Tabs) */}
              <div className="flex flex-col md:flex-row md:items-center gap-3">

                <div className="relative w-full md:w-96">
                  <input
                    type="text"
                    value={searchQuery}
                    onChange={(e) => { setSearchQuery(e.target.value); setCurrentPage(1); }}
                    placeholder="Search by Name, Mobile, Adv Id"
                    className="w-full pl-10 pr-4 py-2 rounded-lg shadow-md focus:outline-none text-gray-700 focus:ring-2 focus:ring-blue-500 bg-white"
                  />
                  <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                    <Search className="w-5 h-5 text-gray-400" />
                  </div>
                </div>

                <Tab.List className="flex p-1 bg-gray-200/50 rounded-xl w-fit">
                  {tabs.map((tab) => (
                    <Tab
                      key={tab}
                      className={({ selected }) =>
                        classNames(
                          "px-6 py-2 text-sm font-medium rounded-lg transition-all outline-none",
                          selected
                            ? "bg-white text-[#2076C7] shadow-sm"
                            : "text-gray-600 hover:text-gray-800"
                        )}>
                      {tab}
                    </Tab>
                  ))}
                </Tab.List>
              </div>

              {/* RIGHT SECTION (Pagination Info) */}
              <div className="ml-auto flex flex-col sm:flex-row sm:items-center gap-3 text-xs sm:text-sm text-gray-600">
                <div className="flex items-center gap-2">
                  <span>Show</span>
                  <select
                    value={itemsPerPage}
                    onChange={(e) => {
                      setItemsPerPage(Number(e.target.value));
                      setCurrentPage(1);
                    }}
                    className="border border-gray-300 rounded-md px-2 py-1 bg-white">
                    <option value={10}>10</option>
                    <option value={25}>25</option>
                    <option value={50}>50</option>
                    <option value={100}>100</option>
                  </select>
                  <span>per page</span>
                </div>

                <p>
                  Showing{" "}
                  <span className="font-semibold">
                    {totalCount === 0 ? 0 : (currentPage - 1) * itemsPerPage + 1}
                  </span>{" "}-{" "}
                  <span className="font-semibold">
                    {Math.min(currentPage * itemsPerPage, totalCount)}
                  </span>{" "}
                  of <span className="font-semibold">{totalCount}</span> DSAs
                </p>
              </div>
            </div>

          </div>

          <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
            {loading ? (
              <div className="py-12 text-center text-gray-500"><div className="animate-spin rounded-full h-10 w-10 border-b-2 border-[#2076C7] mx-auto mb-3" /> Loading DSAs...</div>
            ) : filteredDSAs.length === 0 ? (
              <div className="py-12 text-center text-gray-500">No DSAs found.</div>
            ) : (
              <div className="max-h-[60vh] overflow-x-auto scrollbar-x-thin scrollbar-thumb-gray-300 scrollbar-track-transparent md:scrollbar-thumb-gray-400">
                <table className="min-w-[1600px] w-full text-left border-collapse">
                  <thead className="bg-gray-100 border-b border-gray-200 sticky top-0 z-10">
                    <tr>
                      <th className="px-4 py-3 text-xs font-semibold text-gray-500 uppercase tracking-wide w-24">Update</th>
                      <th className="px-4 py-3 text-xs font-semibold text-gray-500 uppercase tracking-wide w-16">ID</th>
                      <th className="px-4 py-3 text-xs font-semibold text-gray-500 uppercase tracking-wide w-32">Adv ID</th>
                      <th className="px-4 py-3 text-xs font-semibold text-gray-500 uppercase tracking-wide">Name</th>
                      <th className="px-4 py-3 text-xs font-semibold text-gray-500 uppercase tracking-wide">Email</th>
                      <th className="px-4 py-3 text-xs font-semibold text-gray-500 uppercase tracking-wide">Mobile</th>
                      <th className="px-4 py-3 text-xs font-semibold text-gray-500 uppercase tracking-wide">PAN</th>
                      <th className="px-4 py-3 text-xs font-semibold text-gray-500 uppercase tracking-wide">City</th>
                      <th className="px-4 py-3 text-xs font-semibold text-gray-500 uppercase tracking-wide">Head</th>
                      <th className="px-4 py-3 text-xs font-semibold text-gray-500 uppercase tracking-wide">Category</th>
                      <th className="px-4 py-3 text-xs font-semibold text-gray-500 uppercase tracking-wide">Role</th>
                      <th className="px-4 py-3 text-xs font-semibold text-gray-500 uppercase tracking-wide">Joined Date</th>
                      <th className="px-4 py-3 text-xs font-semibold text-gray-500 uppercase tracking-wide">Updated At</th>
                      <th className="px-4 py-3 text-xs font-semibold text-gray-500 uppercase tracking-wide">Status</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-100">
                    {filteredDSAs.map((dsa) => (
                      <tr key={dsa.id} className="hover:bg-gray-50 transition-colors">
                        <td className="px-4 py-3 flex items-center gap-2">
                          <button
                            onClick={() => handleEdit(dsa)}
                            className="p-1.5 text-[#2076C7] hover:text-[#2076C7] hover:bg-blue-50 rounded-md transition-colors"
                            title="Edit">
                            <Pencil size={16} />
                          </button>

                          {/* <button
                            onClick={() => handleDeleteClick(dsa.id)}
                            className="p-1.5 text-red-500 hover:text-red-600 hover:bg-red-50 rounded-md transition-colors"
                            title="Delete">
                            <Trash2 size={16} />
                          </button> */}
                        </td>
                        <td className="px-4 py-3 text-sm font-medium text-[#2076C7]">{dsa.id}</td>
                        <td className="px-4 py-3 text-sm text-gray-700 font-medium">{dsa.adv_id}</td>
                        <td className="px-4 py-3 text-sm whitespace-nowrap font-medium text-gray-900">{dsa.name}</td>
                        <td className="px-4 py-3 text-sm text-gray-600">{dsa.email}</td>
                        <td className="px-4 py-3 text-sm text-gray-700">{dsa.mobile}</td>
                        <td className="px-4 py-3 text-sm text-gray-700 uppercase">{dsa.pan}</td>
                        <td className="px-4 py-3 text-sm whitespace-nowrap text-gray-700">{dsa.city}</td>
                        <td className="px-4 py-3 text-sm text-gray-600">{dsa.head}</td>
                        <td className="px-4 py-3 text-sm text-gray-600 truncate max-w-[200px]" title={dsa.category}>{dsa.category}</td>
                        <td className="px-4 py-3 text-sm font-bold text-[#2076C7] uppercase">{dsa.role}</td>
                        <td className="px-4 py-3 text-sm whitespace-nowrap text-gray-600">{formatDate(dsa.date_joined)}</td>
                        <td className="px-4 py-3 text-sm whitespace-nowrap text-gray-500">{formatDate(dsa.updated_at)}</td>
                        <td className="px-4 py-3">
                          <span className={classNames("inline-flex items-center px-2.5 py-0.5 rounded-full text-[10px] font-bold uppercase", dsa.status === "Active" ? "bg-green-100 text-green-700" : dsa.status === "Pending" ? "bg-yellow-100 text-yellow-700" : "bg-red-100 text-red-700")}>{dsa.status}</span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </div>
        </Tab.Group>

        {!loading && totalCount > 0 && (
          <div className="mt-4 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs sm:text-sm text-gray-600">
            <div>Page <span className="font-semibold">{currentPage}</span> of <span className="font-semibold">{totalPages}</span></div>
            <div className="flex items-center gap-1 sm:gap-2">
              <button onClick={() => setCurrentPage((p) => Math.max(1, p - 1))} disabled={currentPage === 1} className={`px-3 py-1 rounded-md border ${currentPage === 1 ? "bg-gray-100 text-gray-400 cursor-not-allowed" : "bg-white text-gray-700 hover:bg-gray-50 border-gray-300"}`}><ChevronLeft className="w-4 h-4" /></button>
              {getPaginationGroup.map((item, idx) => (
                <button key={idx} onClick={() => typeof item === "number" && setCurrentPage(item)} disabled={item === "..."} className={`px-3 py-1 rounded-md border transition-colors ${currentPage === item ? "bg-[#2076C7] text-white border-[#2076C7]" : item === "..." ? "bg-transparent border-none cursor-default" : "bg-white text-gray-700 hover:bg-gray-50 border-gray-300"}`}>{item}</button>
              ))}
              <button onClick={() => setCurrentPage((p) => Math.min(totalPages, p + 1))} disabled={currentPage === totalPages} className={`px-3 py-1 rounded-md border ${currentPage === totalPages ? "bg-gray-100 text-gray-400 cursor-not-allowed" : "bg-white text-gray-700 hover:bg-gray-50 border-gray-300"}`}><ChevronRight className="w-4 h-4" /></button>
            </div>
          </div>
        )}
      </div>

      {isEditModalOpen && editingDSA && (
        <div className="fixed inset-0 bg-slate-900/60 backdrop-blur-sm flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-2xl shadow-2xl max-w-2xl w-full overflow-hidden border border-gray-100">
            <div className="flex justify-between items-center p-5 border-b bg-gray-50"><h3 className="text-xl font-bold text-slate-800">Edit DSA Details</h3><button onClick={() => setIsEditModalOpen(false)} className="text-gray-400 hover:text-gray-600"><X size={22} /></button></div>
            <div className="p-6 grid grid-cols-1 md:grid-cols-2 gap-4">
              <div><label className="block text-[10px] font-bold text-gray-400 uppercase mb-1">Advisor ID</label><input type="text" className={classNames(inputClass, "bg-gray-50")} value={editingDSA.adv_id} disabled /></div>
              <div><label className="block text-[10px] font-bold text-gray-400 uppercase mb-1">Full Name</label><input type="text" className={inputClass} value={editingDSA.name} onChange={(e) => setEditingDSA({ ...editingDSA, name: e.target.value })} /></div>
              <div><label className="block text-[10px] font-bold text-gray-400 uppercase mb-1">Email</label><input type="email" className={inputClass} value={editingDSA.email} onChange={(e) => setEditingDSA({ ...editingDSA, email: e.target.value })} /></div>
              <div><label className="block text-[10px] font-bold text-gray-400 uppercase mb-1">Mobile</label><input type="text" className={inputClass} value={editingDSA.mobile} onChange={(e) => setEditingDSA({ ...editingDSA, mobile: e.target.value })} /></div>
              <div><label className="block text-[10px] font-bold text-gray-400 uppercase mb-1">PAN</label><input type="text" className={inputClass} value={editingDSA.pan} onChange={(e) => setEditingDSA({ ...editingDSA, pan: e.target.value })} /></div>
              <div><label className="block text-[10px] font-bold text-gray-400 uppercase mb-1">City</label><select className={inputClass} value={editingDSA.city} onChange={(e) => setEditingDSA({ ...editingDSA, city: e.target.value })}><option value="">Select City</option>{cities.map((city) => (<option key={city} value={city}>{city}</option>))}</select></div>
              <div><label className="block text-[10px] font-bold text-gray-400 uppercase mb-1">Role</label><select className={inputClass} value={editingDSA.role} onChange={(e) => setEditingDSA({ ...editingDSA, role: e.target.value })}>{roles.map((role) => (<option key={role} value={role}>{role}</option>))}</select></div>
              <div><label className="block text-[10px] font-bold text-gray-400 uppercase mb-1">New Password (Optional)</label><input type="password" placeholder="Leave blank to keep current" className={inputClass} value={editingDSA.password} onChange={(e) => setEditingDSA({ ...editingDSA, password: e.target.value })} /></div>
            </div>
            <div className="p-5 border-t bg-gray-50 flex justify-end gap-3"><button onClick={() => setIsEditModalOpen(false)} className="px-4 py-2 text-sm font-semibold text-gray-500">Cancel</button><button onClick={handleSaveEdit} className="px-6 py-2 bg-[#2076C7] text-white rounded-lg text-sm font-bold shadow-md hover:bg-[#1a5fa1]">Save Changes</button></div>
          </div>
        </div>
      )}

      {isDeleteModalOpen && (
        <div className="fixed inset-0 bg-slate-900/60 backdrop-blur-sm flex items-center justify-center p-4 z-[60]">
          <div className="bg-white rounded-2xl shadow-2xl max-w-sm w-full overflow-hidden border border-gray-100 animate-in fade-in zoom-in duration-200">
            <div className="p-6 text-center">
              <div className="mx-auto flex items-center justify-center h-12 w-12 rounded-full bg-red-100 mb-4">
                <Trash2 className="h-6 w-6 text-red-600" />
              </div>
              <h3 className="text-lg font-bold text-slate-800">Confirm Delete</h3>
              <p className="text-sm text-gray-500 mt-2">
                Are you sure you want to delete this DSA? This action cannot be undone.
              </p>
            </div>
            <div className="p-4 bg-gray-50 flex gap-3">
              <button
                onClick={() => setIsDeleteModalOpen(false)}
                className="flex-1 px-4 py-2 text-sm font-semibold text-gray-600 bg-white border border-gray-300 rounded-lg hover:bg-gray-100 transition-colors"
              >
                Cancel
              </button>
              <button
                onClick={handleConfirmDelete}
                className="flex-1 px-4 py-2 text-sm font-semibold text-white bg-red-600 rounded-lg hover:bg-red-700 shadow-md transition-colors"
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}