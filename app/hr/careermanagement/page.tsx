"use client";

import React, { useState, useMemo, useEffect } from 'react';
import { 
  FileText, Search, MoreVertical, CheckCircle2, 
  XCircle, Clock, Download, Users, UserCheck, 
  Timer, X, Plus, Loader2, Linkedin, MapPin
} from 'lucide-react';
import { AdminService } from "@/app/services/adminService"; // Ensure this path is correct
import toast from 'react-hot-toast';

// --- Types ---
interface CareerApplication {
  id: number;
  full_name: string;
  email: string;
  phone: string;
  current_city: string;
  total_experience: string;
  notice_period: string;
  current_ctc: string;
  expected_ctc: string;
  linkedin_url: string;
  applying_for: string;
  status: string;
  created_at: string;
}

// --- Sub-components ---
const StatCard = ({ title, value, icon: Icon, color }: any) => (
  <div className="bg-white p-5 rounded-xl border border-gray-100 shadow-sm flex items-center gap-4">
    <div className={`p-3 rounded-lg ${color}`}>
      <Icon className="w-6 h-6" />
    </div>
    <div>
      <p className="text-sm text-gray-500 font-medium">{title}</p>
      <p className="text-2xl font-bold text-gray-900">{value}</p>
    </div>
  </div>
);

const StatusBadge = ({ status }: { status: string }) => {
  const styles: Record<string, string> = {
    Shortlisted: "bg-emerald-50 text-emerald-700 border-emerald-100",
    Applied: "bg-amber-50 text-amber-700 border-amber-100", // "Applied" is the backend default
    Pending: "bg-amber-50 text-amber-700 border-amber-100",
    Rejected: "bg-rose-50 text-rose-700 border-rose-100",
  };
  const icons: Record<string, any> = {
    Shortlisted: <CheckCircle2 className="w-3 h-3" />,
    Applied: <Clock className="w-3 h-3" />,
    Pending: <Clock className="w-3 h-3" />,
    Rejected: <XCircle className="w-3 h-3" />,
  };
  
  return (
    <span className={`flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-semibold border ${styles[status] || styles['Applied']}`}>
      {icons[status] || icons['Applied']} {status}
    </span>
  );
};

export default function CareerManagementPage() {
  const [applications, setApplications] = useState<CareerApplication[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [activeTab, setActiveTab] = useState("All");
  
  // Pagination State
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 8;

  // 1. Fetch Data
  const loadApplications = async () => {
    try {
      setLoading(true);
      const res = await AdminService.getCareerApplications();
      if (res.success) {
        setApplications(res.career_applications);
      }
    } catch (error) {
      console.error("Fetch Error:", error);
      toast.error("Failed to load applications");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadApplications();
  }, []);

  // 2. Filter & Search Logic
  const filteredApplications = useMemo(() => {
    return applications.filter((app) => {
      const matchesSearch = 
        app.full_name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        app.applying_for.toLowerCase().includes(searchTerm.toLowerCase()) ||
        app.email.toLowerCase().includes(searchTerm.toLowerCase());
      
      const matchesTab = activeTab === "All" 
        ? true 
        : activeTab === "Pending" 
          ? app.status === "Applied" // Backend uses "Applied" as pending
          : app.status === activeTab;

      return matchesSearch && matchesTab;
    });
  }, [searchTerm, activeTab, applications]);

  // 3. Stats Calculations
  const stats = useMemo(() => ({
    total: applications.length,
    shortlisted: applications.filter(a => a.status === "Shortlisted").length,
    pending: applications.filter(a => a.status === "Applied").length,
    rejected: applications.filter(a => a.status === "Rejected").length,
  }), [applications]);

  // 4. Pagination Calculation
  const totalPages = Math.ceil(filteredApplications.length / itemsPerPage);
  const paginatedData = filteredApplications.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  // 5. CSV Export
  const exportToCSV = () => {
    const headers = ["Name,Role,Email,Phone,City,Exp,Current CTC,Expected CTC,Notice,Status,Applied At"];
    const rows = filteredApplications.map(app => 
      `"${app.full_name}","${app.applying_for}","${app.email}","${app.phone}","${app.current_city}","${app.total_experience}","${app.current_ctc}","${app.expected_ctc}","${app.notice_period}","${app.status}","${app.created_at}"`
    );
    const csvContent = "data:text/csv;charset=utf-8," + [headers, ...rows].join("\n");
    const link = document.createElement("a");
    link.href = encodeURI(csvContent);
    link.download = `career_apps_${new Date().toISOString().split('T')[0]}.csv`;
    link.click();
  };

  if (loading) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-[#F8FAFC]">
        <Loader2 className="w-10 h-10 animate-spin text-[#1CADA3] mb-4" />
        <p className="text-gray-500 font-medium">Loading applications...</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#F8FAFC] p-4 md:p-8">
      <div className="max-w-7xl mx-auto">
        
        {/* Header Section */}
        <div className="flex flex-col md:flex-row md:items-center justify-between mb-8 gap-4">
          <div>
            <h1 className="text-3xl font-bold text-slate-900 tracking-tight">Career Management</h1>
            <p className="text-slate-500 mt-1">Review and manage job applications.</p>
          </div>
          <div className="flex gap-3">
            <button 
              onClick={exportToCSV}
              className="flex items-center gap-2 px-4 py-2 bg-white border border-gray-200 rounded-lg text-sm font-medium text-gray-700 hover:bg-gray-50 transition-all shadow-sm"
            >
              <Download className="w-4 h-4" /> Export CSV
            </button>
            <button 
              onClick={loadApplications}
              className="flex items-center gap-2 px-4 py-2 bg-[#1CADA3] text-white rounded-lg text-sm font-medium hover:opacity-90 transition-all shadow-md"
            >
              Refresh Data
            </button>
          </div>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
          <StatCard title="Total Applicants" value={stats.total} icon={Users} color="bg-blue-50 text-blue-600" />
          <StatCard title="Shortlisted" value={stats.shortlisted} icon={UserCheck} color="bg-emerald-50 text-emerald-600" />
          <StatCard title="New / Applied" value={stats.pending} icon={Timer} color="bg-amber-50 text-amber-600" />
          <StatCard title="Rejected" value={stats.rejected} icon={XCircle} color="bg-rose-50 text-rose-600" />
        </div>

        {/* Filters & Search */}
        <div className="bg-white p-4 rounded-xl border border-gray-200 shadow-sm mb-6 flex flex-col md:flex-row gap-4 justify-between items-center">
          <div className="flex bg-gray-100 p-1 rounded-lg w-full md:w-auto">
            {["All", "Shortlisted", "Pending", "Rejected"].map((tab) => (
              <button
                key={tab}
                onClick={() => { setActiveTab(tab); setCurrentPage(1); }}
                className={`px-4 py-1.5 text-sm font-medium rounded-md transition-all ${
                  activeTab === tab ? "bg-white text-[#1CADA3] shadow-sm" : "text-gray-500 hover:text-gray-700"
                }`}
              >
                {tab}
              </button>
            ))}
          </div>
          
          <div className="relative w-full md:w-80">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 w-4 h-4" />
            <input
              type="text"
              placeholder="Search by name, email, or role..."
              className="w-full pl-10 pr-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-[#1CADA3]/20 outline-none transition-all text-sm text-gray-600"
              value={searchTerm}
              onChange={(e) => { setSearchTerm(e.target.value); setCurrentPage(1); }}
            />
          </div>
        </div>

        {/* Applications Table */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-slate-50 border-b border-gray-200">
                  <th className="px-6 py-4 text-[11px] font-bold text-slate-500 uppercase tracking-wider">Candidate</th>
                  <th className="px-6 py-4 text-[11px] font-bold text-slate-500 uppercase tracking-wider">Position</th>
                  <th className="px-6 py-4 text-[11px] font-bold text-slate-500 uppercase tracking-wider">Location & Exp</th>
                  <th className="px-6 py-4 text-[11px] font-bold text-slate-500 uppercase tracking-wider">CTC (LPA)</th>
                  <th className="px-6 py-4 text-[11px] font-bold text-slate-500 uppercase tracking-wider">Status</th>
                  <th className="px-6 py-4 text-[11px] font-bold text-slate-500 uppercase tracking-wider text-right">Profile</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {paginatedData.length > 0 ? (
                  paginatedData.map((app) => (
                    <tr key={app.id} className="hover:bg-slate-50/50 transition-colors group">
                      <td className="px-6 py-4">
                        <div className="flex items-center gap-3">
                          <div>
                            <div className="text-sm font-bold text-slate-900">{app.full_name}</div>
                            <div className="text-[11px] text-slate-500">{app.email}</div>
                            <div className="text-[11px] text-slate-500">{app.phone}</div>
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <div className="flex flex-col">
                          <span className="text-sm font-medium text-slate-700">{app.applying_for}</span>
                          <span className="text-[11px] text-slate-400">
                            Applied {new Date(app.created_at).toLocaleDateString('en-GB')}
                          </span>
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <div className="flex flex-col gap-1">
                          <div className="flex items-center gap-1 text-[11px] text-slate-600 font-medium">
                            <MapPin className="w-3 h-3" /> {app.current_city}
                          </div>
                          <span className="inline-block w-fit px-2 py-0.5 rounded bg-slate-100 text-slate-700 text-[10px] font-bold">
                            {app.total_experience} Years Exp
                          </span>
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <div className="text-[11px]">
                          <div className="text-slate-500">Current: <span className="font-semibold text-slate-700">{app.current_ctc}</span></div>
                          <div className="text-slate-500">Expected: <span className="font-semibold text-indigo-600">{app.expected_ctc}</span></div>
                          <div className="text-[10px] text-amber-600 font-medium mt-1">Notice: {app.notice_period} Days</div>
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <StatusBadge status={app.status} />
                      </td>
                      <td className="px-6 py-4 text-right">
                        <div className="flex items-center justify-end gap-2">
                          <a
                            href={app.linkedin_url}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="flex items-center gap-1.5 px-3 py-1.5 text-blue-600 bg-blue-50 hover:bg-blue-100 rounded-md transition-colors text-xs font-bold"
                          >
                            <Linkedin className="w-3.5 h-3.5" /> LinkedIn
                          </a>
                          <button className="p-1.5 text-gray-400 hover:bg-gray-100 rounded-lg">
                            <MoreVertical className="w-4 h-4" />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan={6} className="px-6 py-20 text-center text-gray-400">
                      No applications found matching your criteria.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
          
          {/* Pagination Footer */}
          <div className="px-6 py-4 bg-white border-t border-gray-100 flex justify-between items-center">
            <p className="text-xs font-medium text-slate-500">
              Showing <span className="text-slate-900">{paginatedData.length}</span> of <span className="text-slate-900">{filteredApplications.length}</span> candidates
            </p>
            <div className="flex gap-2">
              <button 
                onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
                disabled={currentPage === 1}
                className="px-4 py-1.5 text-xs font-bold border border-gray-200 rounded-lg hover:bg-gray-50 disabled:opacity-50 transition-all text-gray-600"
              >
                Previous
              </button>
              <button 
                onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
                disabled={currentPage === totalPages || totalPages === 0}
                className="px-4 py-1.5 text-xs font-bold bg-slate-900 text-white rounded-lg hover:bg-slate-800 disabled:opacity-50 transition-all"
              >
                Next
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}