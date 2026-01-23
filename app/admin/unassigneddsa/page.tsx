"use client";

import React, { useState, useEffect, useMemo } from "react";
import {
  Search,
  User,
  Users,
  CheckCircle,
  RefreshCw,
} from "lucide-react";
import { AdminService } from "../../services/adminService";
import { Tab } from "@headlessui/react";
import toast from "react-hot-toast";

// --- INTERFACES ---
interface Lead {
  id: string;
  name: string;
  email: string;
  phone: string;
  city: string;
  department: string;
  subCategory: string;
  assignedTo: string | null;
  status: "new" | "contacted" | "qualified" | "converted";
  dsa?: {
    id: number;
    name: string;
    code?: string;
    phone?: string;
  } | null;
}

interface RelationshipManager {
  id: string | number;
  name: string;
  department: string;
  sub_category?: string;
  currentLeads: number;
  maxLeads: number;
}

interface AssignConfirmation {
  show: boolean;
  leadId: string;
  leadName: string;
  rmId: string;
  rmName: string;
  rmSubCategories: string;
  department: string;
  subCategory: string;
}

function classNames(...classes: string[]) {
  return classes.filter(Boolean).join(" ");
}

export default function AdminLeadPanel() {
  const [leads, setLeads] = useState<Lead[]>([]);
  const [rms, setRms] = useState<RelationshipManager[]>([]);
  const [loading, setLoading] = useState(true);
  const [rmLoading, setRmLoading] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedLeads, setSelectedLeads] = useState<string[]>([]);
  const [activeTab, setActiveTab] = useState<"unassigned" | "assigned">("unassigned");

  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(50);

  const [assignConfirmation, setAssignConfirmation] = useState<AssignConfirmation>({
    show: false,
    leadId: "",
    leadName: "",
    rmId: "",
    rmName: "",
    rmSubCategories: "",
    department: "",
    subCategory: "",
  });

  const fetchData = async () => {
    try {
      setLoading(true);
      const res = await AdminService.getUnassignedDsas();
      const mapped: Lead[] = (res.dsas || []).map((item: any) => ({
        id: String(item.id),
        name: item.name,
        email: item.email,
        phone: item.mobile,
        city: item.city,
        department: item.head?.toLowerCase().replace(/\s+/g, "_") || "",
        subCategory: item.category || "",
        assignedTo: item.assigned_rm_name || null,
        status: "new",
        dsa: { id: item.id, name: item.name, code: item.adv_id, phone: item.mobile },
      }));
      setLeads(mapped);
    } catch (err) {
      toast.error("Failed to sync data");
    } finally {
      setLoading(false);
    }
  };

  const fetchRMs = async () => {
    setRmLoading(true);
    try {
      const res = await AdminService.getRms();
      setRms(res.rms || []);
    } finally {
      setRmLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
    fetchRMs();
  }, []);

  const normalize = (str: string) => str?.toLowerCase().replace(/[\s_]/g, "") || "";

  const getRMsForLead = (lead: Lead) => {
    const filtered = rms.filter(
      (rm) =>
        normalize(rm.department) === normalize(lead.department) ||
        rm.department?.toLowerCase() === "all"
    );
    return filtered.length > 0 ? filtered : rms;
  };

  const confirmAssignment = async () => {
    const loadId = toast.loading("Assigning RM...");
    try {
      const { leadId, rmId } = assignConfirmation;
      const res = await AdminService.assignDsaToRm({ dsa_id: leadId, rm_id: rmId });

      if (res.success || res.status === "success") {
        toast.success("RM Assigned successfully!", { id: loadId });
        setAssignConfirmation((prev) => ({ ...prev, show: false }));
        fetchData();
      } else {
        toast.error(res.message || "Assignment failed.", { id: loadId });
      }
    } catch (error: any) {
      toast.error("An error occurred during assignment.", { id: loadId });
    }
  };

  const filteredLeads = useMemo(() => {
    return leads.filter((l) => {
      const matchesSearch =
        l.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        l.dsa?.code?.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesTab = activeTab === "assigned" ? l.assignedTo !== null : l.assignedTo === null;
      return matchesSearch && matchesTab;
    });
  }, [leads, searchTerm, activeTab]);

  const totalPages = Math.max(1, Math.ceil(filteredLeads.length / itemsPerPage));
  const paginatedLeads = filteredLeads.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  // Consistency: Pagination Group logic from reference
  const getPaginationGroup = useMemo(() => {
    const pages: (number | string)[] = [];
    if (totalPages <= 7) {
      for (let i = 1; i <= totalPages; i++) pages.push(i);
    } else {
      if (currentPage <= 3) {
        pages.push(1, 2, 3, 4, "...", totalPages);
      } else if (currentPage >= totalPages - 2) {
        pages.push(1, "...", totalPages - 3, totalPages - 2, totalPages - 1, totalPages);
      } else {
        pages.push(1, "...", currentPage - 1, currentPage, currentPage + 1, "...", totalPages);
      }
    }
    return pages;
  }, [currentPage, totalPages]);

  return (
    <div className="bg-gray-50 py-6">
      <div className="max-w-full mx-auto sm:px-4 lg:px-6">
        {/* Header */}
        <div className="mb-5 flex flex-col md:flex-row md:items-center md:justify-between gap-3">
          <div>
            <h1 className="text-2xl sm:text-3xl font-bold text-slate-800 flex items-center gap-2">
              <Users className="h-6 w-6 text-[#2076C7]" /> Lead Assignment
            </h1>
            <p className="text-sm text-slate-600">Assign leads to relationship managers efficiently.</p>
          </div>
          <div className="flex items-center gap-2">
            <button
              onClick={() => {
                fetchData();
                fetchRMs();
              }}
              className="flex items-center gap-2 px-3 py-2 bg-[#2076C7] text-white rounded-lg text-sm font-medium hover:bg-[#1a5fa1] shadow-sm transition-colors"
            >
              <RefreshCw className={classNames("h-4 w-4", loading ? "animate-spin" : "")} /> Refresh Data
            </button>
          </div>
        </div>

        {/* Statistics Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
          {[
            { label: "Unassigned", value: leads.filter((l) => !l.assignedTo).length, icon: Users, color: "text-blue-600", bg: "bg-blue-50", border: "border-blue-200" },
            { label: "Assigned", value: leads.filter((l) => l.assignedTo).length, icon: CheckCircle, color: "text-green-600", bg: "bg-green-50", border: "border-green-200" },
            { label: "Total RMs", value: rms.length, icon: User, color: "text-purple-600", bg: "bg-purple-50", border: "border-purple-200" },
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

        <Tab.Group
          onChange={(index) => {
            setActiveTab(index === 0 ? "unassigned" : "assigned");
            setCurrentPage(1);
          }}
        >

          <div className="mb-4 flex flex-col md:flex-row md:items-center md:justify-between gap-3">
            <Tab.List className="flex p-1 bg-gray-200/50 rounded-xl w-full md:w-fit">
              <Tab className={({ selected }) => classNames("px-6 py-2 text-sm font-medium rounded-lg transition-all", selected ? "bg-white text-[#2076C7] shadow-sm" : "text-gray-600 hover:text-gray-800")}>
                Unassigned Leads
              </Tab>
              <Tab className={({ selected }) => classNames("px-6 py-2 text-sm font-medium rounded-lg transition-all", selected ? "bg-white text-[#2076C7] shadow-sm" : "text-gray-600 hover:text-gray-800")}>
                Assigned Leads
              </Tab>
            </Tab.List>

            <div className="relative w-full md:w-96">
              <input
                type="text"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                placeholder="Search by name or ADV ID..."
                className="w-full pl-10 pr-4 py-2 rounded-lg shadow-md focus:outline-none text-gray-700 focus:ring-2 focus:ring-blue-500 bg-white"
              />
              <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                <Search className="w-5 h-5 text-gray-400" />
              </div>
            </div>

            <div className="flex flex-col sm:flex-row sm:items-center gap-3 text-xs sm:text-sm text-gray-600">
              <div className="flex items-center gap-2">
                <span>Show</span>
                <select
                  value={itemsPerPage}
                  onChange={(e) => setItemsPerPage(Number(e.target.value))}
                  className="border border-gray-300 rounded-md px-2 py-1 bg-white"
                >
                  <option value={10}>10</option>
                  <option value={25}>25</option>
                  <option value={50}>50</option>
                  <option value={100}>100</option>
                </select>
                <span>per page</span>
              </div>
              <p>
                Showing <span className="font-semibold">{filteredLeads.length === 0 ? 0 : (currentPage - 1) * itemsPerPage + 1}</span> -{" "}
                <span className="font-semibold">{Math.min(currentPage * itemsPerPage, filteredLeads.length)}</span> of{" "}
                <span className="font-semibold">{filteredLeads.length}</span> leads
              </p>
            </div>
          </div>

          <Tab.Panel className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
            {loading ? (
              <div className="py-12 text-center text-gray-500">
                <div className="animate-spin rounded-full h-10 w-10 border-b-2 border-[#2076C7] mx-auto mb-3" /> Loading Leads...
              </div>
            ) : filteredLeads.length === 0 ? (
              <div className="py-12 text-center text-gray-500">No leads found.</div>
            ) : (
              <div className="max-h-[60vh] overflow-x-auto scrollbar-x-thin scrollbar-thumb-gray-300 scrollbar-track-transparent md:scrollbar-thumb-gray-400">
                <table className="min-w-[1000px] w-full text-left border-collapse">
                  <thead className="bg-gray-100 border-b border-gray-200 sticky top-0 z-10">
                    <tr>
                      {/* <th className="px-4 py-3"><input type="checkbox" className="rounded border-gray-300 text-[#2076C7] focus:ring-[#2076C7]" onChange={(e) => setSelectedLeads(e.target.checked ? paginatedLeads.map((l) => l.id) : [])} /></th> */}
                      <th className="px-4 py-3 text-xs font-semibold text-gray-500 uppercase tracking-wide">ADV ID</th>
                      <th className="px-4 py-3 text-xs font-semibold text-gray-500 uppercase tracking-wide">DSA Details</th>
                      <th className="px-4 py-3 text-xs font-semibold text-gray-500 uppercase tracking-wide">Department</th>
                      <th className="px-4 py-3 text-xs font-semibold text-gray-500 uppercase tracking-wide">Sub-Category</th>
                      <th className="px-4 py-3 text-xs font-semibold text-gray-500 uppercase tracking-wide">City</th>
                      <th className="px-4 py-3 text-xs font-semibold text-gray-500 uppercase tracking-wide">Action / Assigned To</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-100">
                    {paginatedLeads.map((l) => (
                      <tr key={l.id} className="hover:bg-gray-50 transition-colors">
                        {/* <td className="px-4 py-3">
                          <input type="checkbox" checked={selectedLeads.includes(l.id)} className="rounded border-gray-300 text-[#2076C7] focus:ring-[#2076C7]" onChange={() => setSelectedLeads((p) => (p.includes(l.id) ? p.filter((x) => x !== l.id) : [...p, l.id]))} />
                        </td> */}
                        <td className="px-4 py-3 text-sm font-medium text-gray-900 whitespace-nowrap">{l.dsa?.code}</td>
                        <td className="px-4 py-3 whitespace-nowrap">
                          <div className="text-sm font-medium text-gray-900">{l.name}</div>
                          <div className="text-xs text-gray-500">{l.phone}</div>
                        </td>
                        <td className="px-4 py-3 text-sm text-gray-700 capitalize whitespace-nowrap">{l.department.replace("_", " ")}</td>
                        <td className="px-4 py-3 text-sm text-gray-600 max-w-[180px] truncate" title={l.subCategory}>{l.subCategory || "-"}</td>
                        <td className="px-4 py-3 text-sm text-gray-700 whitespace-nowrap">{l.city}</td>
                        <td className="px-4 py-3 text-sm whitespace-nowrap">
                          {l.assignedTo ? (
                            <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
                              <CheckCircle className="w-3 h-3 mr-1" /> {l.assignedTo}
                            </span>
                          ) : (
                            <select
                              className="block w-full min-w-40 text-xs text-gray-700 border border-gray-300 rounded-lg focus:ring-[#2076C7] focus:border-[#2076C7] py-1 bg-white outline-none shadow-sm"
                              value=""
                              onChange={(e) => {
                                const rm = rms.find((r) => String(r.id) === e.target.value);
                                if (rm)
                                  setAssignConfirmation({
                                    show: true,
                                    leadId: l.id,
                                    leadName: l.name,
                                    rmId: String(rm.id),
                                    rmName: rm.name,
                                    rmSubCategories: rm.sub_category || "No categories listed",
                                    department: l.department,
                                    subCategory: l.subCategory,
                                  });
                              }}
                            >
                              <option value="" className="text-gray-600">Select RM to Assign</option>
                              {rmLoading ? (
                                <option disabled>Loading RMs...</option>
                              ) : (
                                getRMsForLead(l).map((rm) => (
                                  <option key={rm.id} value={rm.id} className="text-gray-800 font-medium">
                                    {rm.name} ({rm.department})
                                  </option>
                                ))
                              )}
                            </select>
                          )}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </Tab.Panel>
        </Tab.Group>

        {/* Updated Pagination to match reference exactly */}
        {!loading && filteredLeads.length > 0 && (
          <div className="mt-4 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs sm:text-sm text-gray-600">
            <div>Page <span className="font-semibold">{currentPage}</span> of <span className="font-semibold">{totalPages}</span></div>
            <div className="flex items-center gap-1 sm:gap-2">
              <button
                onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
                disabled={currentPage === 1}
                className={`px-3 py-1 rounded-md border ${currentPage === 1 ? "bg-gray-100 text-gray-400 cursor-not-allowed" : "bg-white text-gray-700 hover:bg-gray-50 border-gray-300"}`}
              >
                Previous
              </button>

              {getPaginationGroup.map((item, idx) => (
                <button
                  key={idx}
                  onClick={() => typeof item === "number" && setCurrentPage(item)}
                  disabled={item === "..."}
                  className={`px-3 py-1 rounded-md border transition-colors ${currentPage === item
                    ? "bg-[#2076C7] text-white border-[#2076C7]"
                    : item === "..."
                      ? "bg-transparent border-none cursor-default"
                      : "bg-white text-gray-700 hover:bg-gray-50 border-gray-300"
                    }`}
                >
                  {item}
                </button>
              ))}

              <button
                onClick={() => setCurrentPage((p) => Math.min(totalPages, p + 1))}
                disabled={currentPage === totalPages}
                className={`px-3 py-1 rounded-md border ${currentPage === totalPages ? "bg-gray-100 text-gray-400 cursor-not-allowed" : "bg-white text-gray-700 hover:bg-gray-50 border-gray-300"}`}
              >
                Next
              </button>
            </div>
          </div>
        )}
      </div>

      {/* Confirmation Modal */}
      {assignConfirmation.show && (
        <div className="fixed inset-0 bg-slate-900/60 backdrop-blur-sm flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-2xl p-6 max-w-sm w-full shadow-2xl border border-gray-100">
            <div className="flex items-center gap-3 mb-4">
              <div className="bg-blue-50 p-2 rounded-full">
                <User className="w-6 h-6 text-[#2076C7]" />
              </div>
              <h3 className="text-xl font-bold text-slate-800">Confirm Assignment</h3>
            </div>
            <p className="text-sm text-slate-600 mb-4 leading-relaxed">
              Assign RM <span className="text-[#2076C7] font-bold">{assignConfirmation.rmName}</span> to DSA <span className="text-[#2076C7] font-bold">{assignConfirmation.leadName}</span>?
            </p>
            <div className="flex gap-3 mt-6">
              <button
                onClick={() => setAssignConfirmation((p) => ({ ...p, show: false }))}
                className="flex-1 py-2.5 text-slate-600 bg-white border border-gray-300 rounded-xl hover:bg-gray-50 font-semibold"
              >
                Cancel
              </button>
              <button
                onClick={confirmAssignment}
                className="flex-1 py-2.5 bg-[#2076C7] text-white rounded-xl font-bold shadow-lg hover:bg-[#1a5fa1]"
              >
                Confirm
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}