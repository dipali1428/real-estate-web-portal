"use client";

import React, { useState, useEffect } from "react";
import {
  Search,
  Users,
  CheckCircle,
  RefreshCw,
  MapPin,
  UserMinus,
  ChevronDown,
  ArrowLeft,
  Briefcase,
} from "lucide-react";
import { Tab } from "@headlessui/react";
import toast from "react-hot-toast";
import { AdminService } from '../../services/adminService';

function classNames(...classes: string[]) {
  return classes.filter(Boolean).join(" ");
}

export default function MockBranchAssignmentPanel() {
  const [activeTab, setActiveTab] = useState<"unassigned" | "assigned" | "all_branches">("unassigned");
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(10);
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [branches, setBranches] = useState<{ id: number; name: string }[]>([]);
  const [leads, setLeads] = useState<any[]>([]);
  const [totalCount, setTotalCount] = useState(0);
  const [loading, setLoading] = useState(true);

  // State for "All Branches" view
  const [allBranchesData, setAllBranchesData] = useState<any[]>([]);
  const [selectedBranchId, setSelectedBranchId] = useState<string>("");

  const [assignConfirmation, setAssignConfirmation] = useState({
    show: false,
    leadId: "",
    leadName: "",
    branchName: "",
  });

  const fetchData = async () => {
    setLoading(true);
    try {
      if (branches.length === 0) {
        const branchRes = await AdminService.getBranches();
        setBranches(branchRes.branches || branchRes.data || []);
      }

      const params = {
        limit: itemsPerPage,
        offset: (currentPage - 1) * itemsPerPage,
        search: searchTerm
      };

      if (activeTab === "unassigned") {
        const response = await AdminService.getBranchUnassignedDsas(params as any);
        setLeads(response.data || []);
        setTotalCount(response.pagination?.total_records || 0);
      } else if (activeTab === "assigned") {
        const response = await AdminService.getAssignedDsas(params);
        setLeads(response.data || []);
        setTotalCount(response.pagination?.total_records || 0);
      } else if (activeTab === "all_branches") {
        if (selectedBranchId) {
          // Fetch DSAs for a specific branch when a card is clicked
          const response = await AdminService.getDsasByBranch(Number(selectedBranchId));
          setLeads(response.data || []);
          setTotalCount(response.data?.length || 0);
        } else {
          // Fetch the summary list of all branches for cards
          const response = await AdminService.getAllBranches(params);
          setAllBranchesData(response.data || []);
          setTotalCount(response.pagination?.total_records || response.total || 0);
        }
      }

    } catch (error) {
      toast.error("Failed to load data");
    } finally {
      setLoading(false);
      setIsRefreshing(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, [activeTab, currentPage, searchTerm, itemsPerPage, selectedBranchId]);

  const handleRefresh = () => {
    setIsRefreshing(true);
    fetchData();
    toast.success("Data synchronized successfully");
  };

  const confirmAssignment = async () => {
    const loadId = toast.loading("Processing assignment...");
    try {
      const selectedBranch = branches.find(b => b.name === assignConfirmation.branchName);

      await AdminService.AssignDsaToBranch({
        branch_id: Number(selectedBranch?.id),
        dsa_ids: [Number(assignConfirmation.leadId)],
      });

      toast.success("Assigned successfully", { id: loadId });
      setAssignConfirmation({ show: false, leadId: "", leadName: "", branchName: "" });
      fetchData();
    } catch (error) {
      toast.error("Assignment failed", { id: loadId });
    }
  };

  const totalPages = Math.ceil(totalCount / itemsPerPage) || 1;

  const getPageNumbers = () => {
    const pages = [];
    const maxVisible = 5;
    if (totalPages <= maxVisible) {
      for (let i = 1; i <= totalPages; i++) pages.push(i);
    } else {
      pages.push(1);
      if (currentPage > 3) pages.push("...");
      const start = Math.max(2, currentPage - 1);
      const end = Math.min(totalPages - 1, currentPage + 1);
      for (let i = start; i <= end; i++) {
        if (!pages.includes(i)) pages.push(i);
      }
      if (currentPage < totalPages - 2) pages.push("...");
      if (!pages.includes(totalPages)) pages.push(totalPages);
    }
    return pages;
  };

  return (
    <div className="bg-slate-50 min-h-screen w-full font-sans text-slate-900 antialiased">
      <div className="w-full px-4 sm:px-6 lg:px-10 py-8">

        {/* Header */}
        <div className="mb-8 flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6">
          <div>
            <h1 className="text-3xl font-bold text-slate-900 tracking-tight flex items-center gap-3">
              {/* <div className="bg-blue-600 p-2 shadow-blue-200 shadow-lg">
                <Building2 className="h-7 w-7 text-white rounded-2xl" />
              </div> */}
              Branch Assignment Panel
            </h1>
            <p className="text-slate-500 mt-2 text-base font-medium">Manage and distribute DSAs across your regional network.</p>
          </div>
          <button
            onClick={handleRefresh}
            className="flex items-center justify-center gap-2 px-6 py-3 rounded-2xl cursor-pointer bg-slate-700 text-white text-sm font-semibold hover:bg-slate-800 shadow-lg shadow-slate-200 transition-all active:scale-[0.98]">
            <RefreshCw className={classNames("h-4 w-4", isRefreshing ? "animate-spin" : "")} />
            Sync Records
          </button>
        </div>

        {/* Statistics Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
          {[
            { label: "Total Found", value: totalCount, icon: Users, color: "text-blue-600", bg: "bg-blue-50/50", ring: "ring-blue-100" },
            { label: "Current View", value: activeTab === "all_branches" && !selectedBranchId ? allBranchesData.length : leads.length, icon: UserMinus, color: "text-amber-600", bg: "bg-amber-50/50", ring: "ring-amber-100" },
            { label: "Active Branches", value: branches.length, icon: MapPin, color: "text-emerald-600", bg: "bg-emerald-50/50", ring: "ring-emerald-100" },
          ].map((stat, i) => (
            <div key={i} className={`bg-white p-6 rounded-lg shadow-md flex items-center gap-5 transition-all hover:shadow-lg`}>
              <stat.icon className={`w-7 h-7 ${stat.color}`} />
              <div>
                <p className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-1">{stat.label}</p>
                <p className="text-3xl font-bold text-slate-800">{stat.value}</p>
              </div>
            </div>
          ))}
        </div>

        <Tab.Group
          selectedIndex={activeTab === "unassigned" ? 0 : activeTab === "assigned" ? 1 : 2}
          onChange={(index) => {
            const tabs: ("unassigned" | "assigned" | "all_branches")[] = ["unassigned", "assigned", "all_branches"];
            setActiveTab(tabs[index]);
            setCurrentPage(1);
            setSelectedBranchId("");
          }}>
          {/* Controls Bar */}
          <div className="mb-6 flex flex-col xl:flex-row xl:items-center xl:justify-between gap-6 bg-white p-4 rounded-lg shadow-md">
            <div className="flex items-center gap-4">
              {selectedBranchId && activeTab === "all_branches" && (
                <button
                  onClick={() => setSelectedBranchId("")}
                  className="p-2 hover:bg-slate-100 rounded-full transition-colors text-slate-600"
                  title="Back to Branches">
                  <ArrowLeft className="w-5 h-5" />
                </button>
              )}
              <Tab.List className="flex p-1 bg-slate-100 rounded-2xl w-full xl:w-fit">
                <Tab className={({ selected }) => classNames("px-8 py-2.5 text-sm font-bold transition-all outline-none flex-1 xl:flex-none rounded-2xl cursor-pointer", selected ? "bg-white text-blue-600 shadow-sm border border-slate-200" : "text-slate-500 hover:text-slate-500")}>
                  Unassigned
                </Tab>
                <Tab className={({ selected }) => classNames("px-8 py-2.5 text-sm font-bold transition-all outline-none flex-1 xl:flex-none rounded-2xl cursor-pointer", selected ? "bg-white text-blue-600 shadow-sm border border-slate-200" : "text-slate-500 hover:text-slate-500")}>
                  Assigned
                </Tab>
                <Tab className={({ selected }) => classNames("px-8 py-2.5 text-sm font-bold transition-all outline-none flex-1 xl:flex-none rounded-2xl cursor-pointer", selected ? "bg-white text-blue-600 shadow-sm border border-slate-200" : "text-slate-500 hover:text-slate-500")}>
                  All Branches
                </Tab>
              </Tab.List>
            </div>

            <div className="flex flex-col md:flex-row items-center gap-4 w-full xl:w-auto">
              <div className="relative w-full md:w-80">
                <input
                  type="text"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  placeholder="Search..."
                  className="w-full pl-11 pr-4 py-3 rounded-xl border-none ring-1 ring-slate-200 focus:ring-2 focus:ring-blue-500 bg-slate-50 text-sm font-medium transition-all placeholder:text-slate-400"
                />
                <Search className="absolute left-4 top-3.5 w-4 h-4 text-slate-400" />
              </div>

              <div className="flex items-center gap-3 bg-slate-50 px-4 py-3 ring-1 ring-slate-200 text-sm font-semibold text-slate-600 ml-auto rounded-2xl">
                <span className="opacity-80">Show</span>
                <select
                  value={itemsPerPage}
                  onChange={(e) => setItemsPerPage(Number(e.target.value))}
                  className="text-blue-600 outline-none bg-transparent cursor-pointer font-bold">
                  {[10, 25, 50].map(v => <option key={v} value={v}>{v}</option>)}
                </select>
              </div>
            </div>
          </div>

          {/* Conditional Rendering: Cards or Table */}
          {activeTab === "all_branches" && !selectedBranchId ? (
            /* Branch Cards Grid */
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {allBranchesData.map((branch) => (
                <div
                  key={branch.id}
                  onClick={() => {
                    setSelectedBranchId(branch.id.toString());
                    setCurrentPage(1);
                  }}
                  className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm hover:shadow-md hover:border-blue-300 transition-all cursor-pointer group">
                  <div className="flex justify-between items-start mb-4">
                    <div className="bg-slate-100 p-3 rounded-lg group-hover:bg-blue-50 transition-colors">
                      <MapPin className="w-6 h-6 text-slate-600 group-hover:text-blue-600" />
                    </div>
                    <span className="bg-blue-50 text-blue-700 text-xs font-bold px-2.5 py-1 rounded-full">
                      ID: {branch.id}
                    </span>
                  </div>
                  <h3 className="text-lg font-bold text-slate-800 mb-1">{branch.name}</h3>
                  <p className="text-sm text-slate-500 mb-4">{branch.city}, {branch.state}</p>
                  <div className="pt-4 border-t border-slate-100 flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <Briefcase className="w-4 h-4 text-slate-400" />
                      <span className="text-sm font-bold text-slate-700">{branch.total_dsas || 0} DSAs</span>
                    </div>
                    <span className="text-blue-600 text-xs font-bold group-hover:translate-x-1 transition-transform">View Details →</span>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            /* Table Container (Used for Unassigned, Assigned, and Branch Detail) */
            <div className="bg-white shadow-md border border-slate-200 overflow-hidden w-full relative rounded-2xl">
              {loading && <div className="absolute inset-0 bg-white/50 z-10 flex items-center justify-center font-bold">Loading...</div>}
              <div className="overflow-x-auto scrollbar-x-thin w-full">
                <table className="w-full text-left border-collapse min-w-[1000px]">
                  <thead>
                    <tr className="bg-slate-50/80 border-b border-slate-200">
                      <th className="px-6 py-4 text-xs font-bold text-slate-500 uppercase tracking-wider">ID</th>
                      <th className="px-6 py-4 text-xs font-bold text-slate-500 uppercase tracking-wider">DSA & Contact</th>
                      <th className="px-6 py-4 text-xs font-bold text-slate-500 uppercase tracking-wider">Email</th>
                      <th className="px-6 py-4 text-xs font-bold text-slate-500 uppercase tracking-wider">Status / Branch</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100">
                    {leads.map((l) => (
                      <tr key={l.id} className="hover:bg-slate-50/50 transition-colors">
                        <td className="px-6 py-4 text-sm font-bold text-blue-600 uppercase">{l.adv_id || l.id}</td>
                        <td className="px-6 py-4">
                          <div className="text-sm font-bold text-slate-800">{l.name}</div>
                          <div className="text-xs font-medium text-slate-400">{l.mobile}</div>
                        </td>
                        <td className="px-6 py-4 text-sm font-medium text-slate-500">{l.email}</td>
                        <td className="px-6 py-4">
                          {activeTab !== "unassigned" ? (
                            <span className="inline-flex items-center px-3 py-1.5 text-xs font-bold bg-emerald-50 text-emerald-700 border border-emerald-100">
                              <CheckCircle className="w-3.5 h-3.5 mr-1.5" />
                              {l.branch_name || "Assigned"}
                            </span>
                          ) : (
                            <div className="relative max-w-[200px]">
                              <select
                                className="appearance-none block w-full text-xs font-bold text-slate-700 border border-slate-200 focus:outline-none focus:ring-1 focus:ring-blue-500 py-2.5 px-3 bg-white cursor-pointer shadow-sm pr-10 transition-all hover:bg-slate-50"
                                value=""
                                onChange={(e) => {
                                  if (e.target.value) {
                                    setAssignConfirmation({
                                      show: true,
                                      leadId: l.id,
                                      leadName: l.name,
                                      branchName: e.target.value,
                                    });
                                  }
                                }}
                              >
                                <option value="">Select Branch</option>
                                {branches.map((b) => (
                                  <option key={b.id} value={b.name}>{b.name}</option>
                                ))}
                              </select>
                              <ChevronDown className="absolute right-3 top-2.5 w-4 h-4 text-slate-400 pointer-events-none" />
                            </div>
                          )}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}
        </Tab.Group>

        {/* Footer Pagination */}
        <div className="mt-8 flex flex-col lg:flex-row items-center justify-between gap-6 py-2">
          <p className="text-sm text-slate-500 font-medium">
            Showing <span className="text-slate-900 font-bold">
              {(activeTab === "all_branches" && !selectedBranchId) ? allBranchesData.length : leads.length > 0 ? (currentPage - 1) * itemsPerPage + 1 : 0}
            </span>-
            <span className="text-slate-900 font-bold">{Math.min(currentPage * itemsPerPage, totalCount)}</span> of{" "}
            <span className="text-slate-900 font-bold">{totalCount}</span> records
          </p>
          <div className="flex items-center gap-2">
            <button
              disabled={currentPage === 1}
              onClick={() => setCurrentPage(p => p - 1)}
              className="px-4 py-2 border border-slate-400 bg-white text-xs font-bold text-slate-600 hover:bg-slate-50 disabled:opacity-40 disabled:cursor-not-allowed transition-all rounded-2xl">
              Previous
            </button>
            <div className="flex items-center gap-1.5">
              {getPageNumbers().map((pageNum, idx) => (
                <button
                  key={idx}
                  onClick={() => typeof pageNum === 'number' && setCurrentPage(pageNum)}
                  className={classNames(
                    "w-9 h-9 text-xs font-bold transition-all flex items-center justify-center rounded-2xl",
                    currentPage === pageNum
                      ? "bg-blue-600 text-white shadow-md shadow-blue-100"
                      : "bg-white text-slate-400 border border-slate-400"
                  )}>
                  {pageNum}
                </button>
              ))}
            </div>
            <button
              disabled={currentPage === totalPages}
              onClick={() => setCurrentPage(p => p + 1)}
              className="px-4 py-2 border border-slate-400 bg-white text-xs font-bold text-slate-600 hover:bg-slate-50 disabled:opacity-40 disabled:cursor-not-allowed transition-all rounded-2xl">
              Next
            </button>
          </div>
        </div>
      </div>

      {/* Confirmation Modal */}
      {assignConfirmation.show && (
        <div className="fixed inset-0 bg-slate-900/40 backdrop-blur-[2px] flex items-center justify-center p-4 z-[100]">
          <div className="bg-white rounded-3xl p-8 max-w-sm w-full shadow-2xl border border-slate-200">
            <div className="flex flex-col items-center text-center mb-6">
              <div className="bg-blue-50 p-4 mb-4 ring-1 ring-blue-100">
                <MapPin className="w-8 h-8 text-blue-600" />
              </div>
              <h3 className="text-xl font-bold text-slate-900 mb-1">Confirm Assignment</h3>
              <p className="text-slate-500 text-sm font-medium">
                You are assigning <span className="text-slate-900 font-bold">{assignConfirmation.leadName}</span> to:
              </p>
            </div>

            <div className="bg-slate-50 py-4 border-2 border-dashed border-slate-200 text-center mb-8">
              <span className="text-lg font-bold text-blue-700">{assignConfirmation.branchName}</span>
            </div>

            <div className="flex gap-3">
              <button
                onClick={() => setAssignConfirmation({ show: false, leadId: "", leadName: "", branchName: "" })}
                className="flex-1 py-3 text-slate-600 bg-slate-100 hover:bg-slate-200 font-bold text-sm transition-all"
              >
                Cancel
              </button>
              <button
                onClick={confirmAssignment}
                className="flex-1 py-3 bg-blue-600 text-white font-bold text-sm shadow-lg shadow-blue-100 hover:bg-blue-700 transition-all transform active:scale-[0.98]"
              >
                Assign Now
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}