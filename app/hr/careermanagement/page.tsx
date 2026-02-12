"use client";

import React, { useState, useMemo } from 'react';
import { 
  FileText, Phone, Mail, Search, 
  Briefcase, MoreVertical, CheckCircle2, 
  XCircle, Clock, Filter, Download,
  Users, UserCheck, Timer, X, Plus
} from 'lucide-react';

// Enhanced Mock Data
const INITIAL_DATA = [
  { id: 1, positionName: "Senior Frontend Developer", fullName: "Arjun Mehta", email: "arjun.m@example.com", phone: "+91 98765 43210", totalExp: "5.2 Years", currentCtc: "18 LPA", expectedCtc: "24 LPA", resumeUrl: "#", status: "Shortlisted", appliedDate: "2024-03-15", initials: "AM" },
  { id: 2, positionName: "Product Designer", fullName: "Sarah Jenkins", email: "sarah.j@design.co", phone: "+1 415 555 0123", totalExp: "3 Years", currentCtc: "$90,000", expectedCtc: "$110,000", resumeUrl: "#", status: "Pending", appliedDate: "2024-03-16", initials: "SJ" },
  { id: 3, positionName: "Backend Engineer", fullName: "Vikram Singh", email: "v.singh@techcorp.in", phone: "+91 99887 76655", totalExp: "8 Years", currentCtc: "25 LPA", expectedCtc: "32 LPA", resumeUrl: "#", status: "Rejected", appliedDate: "2024-03-14", initials: "VS" },
  { id: 4, positionName: "DevOps Engineer", fullName: "Alex Rivera", email: "alex.r@cloud.com", phone: "+1 555 0199", totalExp: "4 Years", currentCtc: "$120,000", expectedCtc: "$145,000", resumeUrl: "#", status: "Pending", appliedDate: "2024-03-17", initials: "AR" },
  { id: 5, positionName: "QA Lead", fullName: "Priya Sharma", email: "priya.q@test.io", phone: "+91 98112 23344", totalExp: "6 Years", currentCtc: "20 LPA", expectedCtc: "26 LPA", resumeUrl: "#", status: "Shortlisted", appliedDate: "2024-03-18", initials: "PS" },
];

// StatCard Component
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
    Pending: "bg-amber-50 text-amber-700 border-amber-100",
    Rejected: "bg-rose-50 text-rose-700 border-rose-100",
  };
  const icons: Record<string, any> = {
    Shortlisted: <CheckCircle2 className="w-3 h-3" />,
    Pending: <Clock className="w-3 h-3" />,
    Rejected: <XCircle className="w-3 h-3" />,
  };
  return (
    <span className={`flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-semibold border ${styles[status]}`}>
      {icons[status]} {status}
    </span>
  );
};

export default function CareerManagementPage() {
  const [applications, setApplications] = useState(INITIAL_DATA);
  const [searchTerm, setSearchTerm] = useState("");
  const [activeTab, setActiveTab] = useState("All");
  const [isModalOpen, setIsModalOpen] = useState(false);
  
  // Pagination State
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 4;

  // Filter Logic
  const filteredApplications = useMemo(() => {
    return applications.filter((app) => {
      const matchesSearch = 
      app.fullName.toLowerCase().includes(searchTerm.toLowerCase()) ||
        app.positionName.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesTab = activeTab === "All" || app.status === activeTab;
      return matchesSearch && matchesTab;
    });
  }, [searchTerm, activeTab, applications]);

  // Stats Calculations
  const stats = useMemo(() => ({
    total: applications.length,
    shortlisted: applications.filter(a => a.status === "Shortlisted").length,
    pending: applications.filter(a => a.status === "Pending").length,
    rejected: applications.filter(a => a.status === "Rejected").length,
  }), [applications]);

  // Pagination Calculation
  const totalPages = Math.ceil(filteredApplications.length / itemsPerPage);
  const paginatedData = filteredApplications.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  // CSV Export Function
  const exportToCSV = () => {
    const headers = ["Candidate,Position,Email,Experience,Current CTC,Expected CTC,Status,Applied Date"];
    const rows = filteredApplications.map(app => 
      `"${app.fullName}","${app.positionName}","${app.email}","${app.totalExp}","${app.currentCtc}","${app.expectedCtc}","${app.status}","${app.appliedDate}"`
    );
    const csvContent = "data:text/csv;charset=utf-8," + headers.concat(rows).join("\n");
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement("a");
    link.setAttribute("href", encodedUri);
    link.setAttribute("download", `applications_export_${new Date().toLocaleDateString()}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  // Add Application Handler
  const handleAddJob = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const newApp = {
      id: Date.now(),
      fullName: formData.get('fullName') as string,
      positionName: formData.get('position') as string,
      email: formData.get('email') as string,
      phone: "+91 00000 00000",
      totalExp: formData.get('exp') as string + " Years",
      currentCtc: "N/A",
      expectedCtc: "N/A",
      resumeUrl: "#",
      status: "Pending",
      appliedDate: new Date().toISOString().split('T')[0],
      initials: (formData.get('fullName') as string).split(' ').map(n => n[0]).join('').toUpperCase()
    };
    setApplications([newApp, ...applications]);
    setIsModalOpen(false);
  };

  return (
    <div className="min-h-screen bg-[#F8FAFC] p-4 md:p-8">
      <div className="max-w-7xl mx-auto">
        
        {/* Header Section */}
        <div className="flex flex-col md:flex-row md:items-center justify-between mb-8 gap-4">
          <div>
            <h1 className="text-3xl font-bold text-slate-900 tracking-tight">Career Management</h1>
            <p className="text-slate-500 mt-1">Manage all candidates.</p>
          </div>
          <div className="flex gap-3">
            <button 
              onClick={exportToCSV}
              className="flex items-center gap-2 px-4 py-2 bg-white border border-gray-200 rounded-lg text-sm font-medium text-gray-700 hover:bg-gray-50 transition-all shadow-sm"
            >
              <Download className="w-4 h-4" /> Export CSV
            </button>
            <button 
              onClick={() => setIsModalOpen(true)}
              className="flex items-center gap-2 px-4 py-2 bg-[#1CADA3] text-white rounded-lg text-sm font-medium hover:bg-[#1CADA3] transition-all shadow-md shadow-indigo-100"
            >
              <Plus className="w-4 h-4" /> Post New Job
            </button>
          </div>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
          <StatCard title="Total Applicants" value={stats.total} icon={Users} color="bg-blue-50 text-blue-600" />
          <StatCard title="Shortlisted" value={stats.shortlisted} icon={UserCheck} color="bg-emerald-50 text-emerald-600" />
          <StatCard title="Pending Review" value={stats.pending} icon={Timer} color="bg-amber-50 text-amber-600" />
          <StatCard title="Rejected" value={stats.rejected} icon={XCircle} color="bg-rose-50 text-rose-600" />
        </div>

        {/* Filters & Search */}
        <div className="bg-white p-4 rounded-xl border text-gray-600  border-gray-200 shadow-sm mb-6 flex flex-col md:flex-row gap-4 justify-between items-center">
          <div className="flex bg-gray-100 p-1 rounded-lg w-full md:w-auto">
            {["All", "Shortlisted", "Pending", "Rejected"].map((tab) => (
              <button
                key={tab}
                onClick={() => { setActiveTab(tab); setCurrentPage(1); }}
                className={`px-4 py-1.5 text-sm font-medium rounded-md transition-all ${
                  activeTab === tab ? "bg-white text-indigo-600 shadow-sm" : "text-gray-500 hover:text-gray-700"
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
              placeholder="Search by name, role..."
              className="w-full pl-10 pr-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-gray-100 outline-none transition-all text-sm"
              onChange={(e) => { setSearchTerm(e.target.value); setCurrentPage(1); }}
            />
          </div>
        </div>

        {/* Enhanced Table */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-slate-50 border-b border-gray-200">
                  <th className="px-6 py-4 text-[11px] font-bold text-slate-500 uppercase tracking-wider">Candidate</th>
                  <th className="px-6 py-4 text-[11px] font-bold text-slate-500 uppercase tracking-wider">Position</th>
                  <th className="px-6 py-4 text-[11px] font-bold text-slate-500 uppercase tracking-wider">Experience</th>
                  <th className="px-6 py-4 text-[11px] font-bold text-slate-500 uppercase tracking-wider">Current CTC</th>
                  <th className="px-6 py-4 text-[11px] font-bold text-slate-500 uppercase tracking-wider">Status</th>
                  <th className="px-6 py-4 text-[11px] font-bold text-slate-500 uppercase tracking-wider text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {paginatedData.length > 0 ? (
                  paginatedData.map((app) => (
                    <tr key={app.id} className="hover:bg-slate-50/50 transition-colors group">
                      <td className="px-6 py-4">
                        <div className="flex items-center gap-3">
                          <div>
                            <div className="text-sm font-bold text-slate-900">{app.fullName}</div>
                            <div className="text-[11px] text-slate-500">{app.email}</div>
                            <div className="text-[11px] text-slate-500">{app.phone}</div>
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <div className="flex flex-col">
                          <span className="text-sm font-medium text-slate-700">{app.positionName}</span>
                          <span className="text-[11px] text-slate-400">Applied {app.appliedDate}</span>
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <span className="px-2 py-0.5 rounded bg-slate-100 text-slate-700 text-[11px] font-bold">
                          {app.totalExp}
                        </span>
                      </td>
                      <td className="px-6 py-4">
                        <div className="text-[11px]">
                          <div className="text-slate-500">Exp: <span className="font-semibold text-blue-500">{app.currentCtc}</span></div>
                          <div className="text-slate-500">Exp: <span className="font-semibold text--500">{app.expectedCtc}</span></div>
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <StatusBadge status={app.status} />
                      </td>
                      <td className="px-6 py-4 text-right">
                        <div className="flex items-center justify-end gap-2">
                        <a
                          href={app.resumeUrl}
                            className="flex items-center gap-1.5 px-3 py-1.5 text-indigo-600 bg-indigo-50 hover:bg-indigo-100 rounded-md transition-colors text-xs font-bold"
                        >
                            <FileText className="w-3.5 h-3.5" /> Resume
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
                    <td colSpan={6} className="px-6 py-20 text-center text-gray-400">No applications found.</td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
          
          {/* Pagination Footer */}
          <div className="px-6 py-4 bg-white border-t border-gray-100 flex justify-between items-center">
            <p className="text-xs font-medium text-slate-500">
              Page <span className="text-slate-900">{currentPage}</span> of <span className="text-slate-900">{totalPages || 1}</span>
            </p>
            <div className="flex gap-2">
              <button 
                onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
                disabled={currentPage === 1}
                className="px-4 py-1.5 text-xs font-bold border border-gray-200 rounded-lg hover:bg-gray-50 disabled:opacity-50 transition-all"
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

      {/* Modal for Post New Job */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl w-full max-w-md shadow-2xl animate-in fade-in zoom-in duration-200">
            <div className="p-6 border-b border-gray-100 flex justify-between items-center">
              <h2 className="text-xl font-bold text-gray-900">Add New Candidate</h2>
              <button onClick={() => setIsModalOpen(false)} className="text-gray-400 hover:text-gray-600">
                <X className="w-5 h-5" />
              </button>
            </div>
            <form onSubmit={handleAddJob} className="p-6 space-y-4">
              <div>
                <label className="block text-xs font-bold text-gray-700 uppercase mb-1">Full Name</label>
                <input required name="fullName" type="text" className="w-full px-3 py-2 border text-gray-600 rounded-lg focus:ring-2 focus:ring-gray-100 outline-none text-sm" placeholder="Full Name" />
              </div>
              <div>
                <label className="block text-xs font-bold text-gray-700 uppercase mb-1">Position</label>
                <input required name="position" type="text" className="w-full px-3 py-2 border text-gray-600 rounded-lg focus:ring-2 focus:ring-gray-100 outline-none text-sm" placeholder="Position" />
              </div>
              <div>
                <label className="block text-xs font-bold text-gray-700 uppercase mb-1">Email</label>
                <input required name="email" type="email" className="w-full px-3 py-2 border text-gray-600 rounded-lg focus:ring-2 focus:ring-gray-100 outline-none text-sm" placeholder="abc@company.com" />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-gray-700 uppercase mb-1">Experience (Years)</label>
                  <input required name="exp" type="number" className="w-full px-3 py-2 border text-gray-600 rounded-lg focus:ring-2 focus:ring-gray-100 outline-none text-sm" placeholder="0" />
                </div>
                <div>
                  <label className="block text-xs font-bold text-gray-700 uppercase mb-1">Resume Link</label>
                  <input type="text" className="w-full px-3 py-2 border rounded-lg bg-gray-50 text-gray-400 text-sm" disabled value="" />
                </div>
              </div>
              <div className="pt-4 flex gap-3">
                <button type="button" onClick={() => setIsModalOpen(false)} className="flex-1 px-4 py-2 border border-gray-200 rounded-lg text-sm font-medium text-gray-600 hover:bg-gray-50">Cancel</button>
                <button type="submit" className="flex-1 px-4 py-2 bg-[#1CADA3] text-white rounded-lg text-sm font-medium hover:bg-[#1CADA3]">Create Application</button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}