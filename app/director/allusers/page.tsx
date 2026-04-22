"use client";

import { useEffect, useMemo, useState, useRef } from "react";
import { AdminService } from "../../services/adminService";
import { Users, Download, Upload } from "lucide-react";
import toast from "react-hot-toast";

type CoreRole = "ADMIN" | "RM" | "DEPARTMENTHEAD" | "DSA";

interface AllUserApiItem {
  id?: number | string;
  adv_id?: string;
  name?: string;
  email?: string;
  mobile?: string;
  pan?: string;
  pan_verified?: string;
  city?: string;
  state?: string;
  head?: string;
  category?: string;
  password?: string;
  date_joined?: string;
  updated_at?: string;
  role?: string;
  department?: string;
  sub_category?: string;
  referral_code?: string | null;
  referred_by_rm?: string | null;
}

interface BaseUser extends AllUserApiItem {
  id: string;
  type: CoreRole;
}

const normalizeString = (value: string | undefined | null) =>
  (value ?? "").toString().toLowerCase().trim();

const formatDateTime = (value?: string) => {
  if (!value) return "-";
  const date = new Date(value);
  if (Number.isNaN(date.getTime())) return value;

  const formattedDate = date.toLocaleDateString("en-IN", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  });

  const formattedTime = date.toLocaleTimeString("en-IN", {
    hour: "2-digit",
    minute: "2-digit",
    hour12: true,
  });

  return `${formattedDate} • ${formattedTime}`;
};

export default function AllUsersPage() {
  const [users, setUsers] = useState<BaseUser[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [search, setSearch] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(50);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const fetchAllUsers = async () => {
    try {
      setLoading(true);
      setError(null);
      const res = await AdminService.getAllUsers();
      const rawList: AllUserApiItem[] =
        (Array.isArray(res?.dsalist) && res.dsalist) ||
        (Array.isArray(res) && res) ||
        [];

      const mapped: BaseUser[] = (rawList || []).map((item) => {
        const rawRole = (item.role ?? "").toString().toUpperCase();
        let type: CoreRole = "DSA";
        if (rawRole === "ADMIN") type = "ADMIN";
        else if (rawRole === "RM") type = "RM";
        else if (rawRole === "DEPARTMENTHEAD") type = "DEPARTMENTHEAD";

        return {
          ...item,
          id: item.id?.toString() ?? "",
          role: rawRole || "DSA",
          type,
        };
      });
      setUsers(mapped);
    } catch (err: any) {
      toast.error("Failed to load users:");
      setError("Failed to load users. Please try again.");
      toast.error(err?.response?.data?.message || err?.message || "Failed to load users.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchAllUsers();
  }, []);

  const handleExportCSV = () => {
    if (users.length === 0) return toast.error("No data to export");
    const headers = [
      "id", "adv_id", "name", "email", "mobile", "pan", "city", "head",
      "category", "password", "date_joined", "updated_at", "role",
      "department", "sub_category", "referral_code", "referred_by_rm","pan_verified","state"
    ];

    const csvRows = users.map(user => {
      return headers.map(header => {
        let val = (user as any)[header];
         if (header === "pan_verified") {
            val = String(val).toLowerCase() === "true";
          }
        const finalVal = (val === null || val === undefined || val === "") ? "null" : val;
        return `"${header === "pan_verified" ? String(finalVal).toLowerCase() : finalVal.toString().replace(/"/g, '""')}"`;
      }).join(",");
    });

    const csvContent = [headers.join(","), ...csvRows].join("\n");
    const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.setAttribute("href", url);
    link.setAttribute("download", `all_users_${new Date().toISOString().split('T')[0]}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const handleImportCSV = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    // Check if file is actually a CSV
    if (!file.name.endsWith('.csv')) {
      return toast.error("Please upload a valid CSV file");
    }

    const loadId = toast.loading("Uploading CSV file...");
    try {
      // Send the raw file object directly to the service
      await AdminService.uploadUsersCSV(file); 
      toast.success("Users imported successfully", { id: loadId });
      fetchAllUsers(); // Refresh list
    } catch (err: any) {
      toast.error(err?.response?.data?.message || "Failed to upload CSV", { id: loadId });
    } finally {
      e.target.value = ""; // Reset input
    }
  };

  const filteredUsers = useMemo(() => {
    const query = normalizeString(search);
    return users.filter((user) => {
      if (!query) return true;
      const haystack = [
        user.adv_id, user.name, user.email, user.mobile, user.city,
        user.role, user.type, user.pan, user.head, user.category,
        user.department, user.sub_category, user.referral_code ?? "", user.referred_by_rm ?? ""
      ].map(normalizeString).join(" ");
      return haystack.includes(query);
    });
  }, [users, search]);

  useEffect(() => {
    setCurrentPage(1);
  }, [search, itemsPerPage]);

  const totalPages = Math.max(1, Math.ceil(filteredUsers.length / itemsPerPage || 1));

  const paginatedUsers = useMemo(() => {
    const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    return filteredUsers.slice(startIndex, endIndex);
  }, [filteredUsers, currentPage, itemsPerPage]);

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
        <div className="mb-5 flex flex-col md:flex-row md:items-center md:justify-between gap-3">
          <div>
            <h1 className="text-2xl sm:text-3xl font-bold text-slate-800 flex items-center gap-2">
              <Users className="h-6 w-6 text-[#2076C7]" /> All Users
            </h1>
            <p className="text-sm text-slate-600">Complete list of all users with full details.</p>
          </div>
          <div className="flex items-center gap-2">
            <button onClick={handleExportCSV} className="flex items-center gap-2 px-3 py-2 bg-white border border-gray-300 rounded-lg text-sm font-medium text-gray-700 hover:bg-gray-50 shadow-sm transition-colors">
              <Download className="h-4 w-4" /> Download CSV
            </button>
            <button onClick={() => fileInputRef.current?.click()} className="flex items-center gap-2 px-3 py-2 bg-[#2076C7] text-white rounded-lg text-sm font-medium hover:bg-[#1a5fa1] shadow-sm transition-colors">
              <Upload className="h-4 w-4" /> Upload CSV
            </button>
            <input type="file" ref={fileInputRef} className="hidden" accept=".csv" onChange={handleImportCSV} />
          </div>
        </div>

        <div className="mb-4 flex flex-col md:flex-row md:items-center md:justify-between gap-3">
          <div className="relative w-full md:w-96">
            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search by any field..."
              className="w-full pl-10 pr-4 py-2 rounded-lg shadow-md focus:outline-none text-gray-700 focus:ring-2 focus:ring-blue-500 bg-white"
            />
            <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
              <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-4.35-4.35M17 11a6 6 0 11-12 0 6 6 0 0112 0z" /></svg>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row sm:items-center gap-3 text-xs sm:text-sm text-gray-600">
            <div className="flex items-center gap-2">
              <span>Show</span>
              <select value={itemsPerPage} onChange={(e) => setItemsPerPage(Number(e.target.value))} className="border border-gray-300 rounded-md px-2 py-1 bg-white">
                <option value={10}>10</option>
                <option value={25}>25</option>
                <option value={50}>50</option>
                <option value={100}>100</option>
              </select>
              <span>per page</span>
            </div>
            <p>
              Showing <span className="font-semibold">{filteredUsers.length === 0 ? 0 : (currentPage - 1) * itemsPerPage + 1}</span> - <span className="font-semibold">{Math.min(currentPage * itemsPerPage, filteredUsers.length)}</span> of <span className="font-semibold">{filteredUsers.length}</span> users
            </p>
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
          {loading ? (
            <div className="py-12 text-center text-gray-500">
              <div className="animate-spin rounded-full h-10 w-10 border-b-2 border-[#2076C7] mx-auto mb-3" /> Loading...
            </div>
          ) : error ? (
            <div className="py-10 text-center text-red-600 text-sm">{error}</div>
          ) : filteredUsers.length === 0 ? (
            <div className="py-12 text-center text-gray-500">No users found.</div>
          ) : (
            <div className="max-h-[65vh] overflow-y-auto overflow-x-auto scrollbar-x-thin scrollbar-thumb-gray-300 scrollbar-track-transparent md:scrollbar-thumb-gray-400">
              <table className="min-w-[900px] w-full text-left border-collapse">
                <thead className="bg-gray-100 border-b border-gray-200 sticky top-0 z-10">
                  <tr>
                    {["ID", "Adv ID", "Name", "Email", "Mobile", "PAN","Pan Verified", "State","City", "Head", "Category", "Department", "Sub Category", "Referral Code", "Referred By RM", "Role", "Date Joined", "Last Updated"].map((h) => (
                      <th key={h} className="px-4 py-3 text-xs font-semibold text-gray-500 uppercase tracking-wide">{h}</th>
                    ))}
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-100">
                  {paginatedUsers.map((user) => (
                    <tr key={`${user.type}-${user.id}`} className="hover:bg-gray-50 transition-colors">
                      <td className="px-4 py-3 text-sm text-gray-700 whitespace-nowrap">{user.id}</td>
                      <td className="px-4 py-3 text-sm text-gray-700 whitespace-nowrap">{user.adv_id}</td>
                      <td className="px-4 py-3 text-sm font-medium text-gray-900 whitespace-nowrap">{user.name}</td>
                      <td className="px-4 py-3 text-sm text-gray-600 whitespace-nowrap">{user.email}</td>
                      <td className="px-4 py-3 text-sm text-gray-700 whitespace-nowrap">{user.mobile}</td>
                      <td className="px-4 py-3 text-sm text-gray-700 whitespace-nowrap">{user.pan}</td>
                      <td className="px-4 py-3 text-sm text-gray-700 whitespace-nowrap">{user.pan_verified}</td>
                      <td className="px-4 py-3 text-sm text-gray-700 max-w-[180px] truncate">{user.state}</td>
                      <td className="px-4 py-3 text-sm text-gray-700 max-w-[180px] truncate">{user.city}</td>
                      <td className="px-4 py-3 text-sm text-gray-700 whitespace-nowrap">{user.head}</td>
                      <td className="px-4 py-3 text-sm text-gray-700 max-w-[180px] truncate" title={user.category}>{user.category}</td>
                      <td className="px-4 py-3 text-sm text-gray-700 whitespace-nowrap">{user.department}</td>
                      <td className="px-4 py-3 text-sm text-gray-700 max-w-[180px] truncate" title={user.sub_category}>{user.sub_category}</td>
                      <td className="px-4 py-3 text-sm text-gray-700 whitespace-nowrap">{user.referral_code ?? "-"}</td>
                      <td className="px-4 py-3 text-sm text-gray-700 whitespace-nowrap">{user.referred_by_rm ?? "-"}</td>
                      <td className="px-4 py-3 text-sm text-gray-700 whitespace-nowrap">{user.role}</td>
                      <td className="px-4 py-3 text-xs text-gray-600 whitespace-nowrap">{formatDateTime(user.date_joined)}</td>
                      <td className="px-4 py-3 text-xs text-gray-600 whitespace-nowrap">{formatDateTime(user.updated_at)}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>

        {!loading && !error && filteredUsers.length > 0 && (
          <div className="mt-4 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs sm:text-sm text-gray-600">
            <div>Page <span className="font-semibold">{currentPage}</span> of <span className="font-semibold">{totalPages}</span></div>
            <div className="flex items-center gap-1 sm:gap-2">
              <button
                onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
                disabled={currentPage === 1}
                className={`px-3 py-1 rounded-md border ${currentPage === 1 ? "bg-gray-100 text-gray-400 cursor-not-allowed" : "bg-white text-gray-700 hover:bg-gray-50 border-gray-300"}`}>
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
                    }`}>
                  {item}
                </button>
              ))}

              <button
                onClick={() => setCurrentPage((p) => Math.min(totalPages, p + 1))}
                disabled={currentPage === totalPages}
                className={`px-3 py-1 rounded-md border ${currentPage === totalPages ? "bg-gray-100 text-gray-400 cursor-not-allowed" : "bg-white text-gray-700 hover:bg-gray-50 border-gray-300"}`}>
                Next
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}