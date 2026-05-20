"use client";

import React, { useState, useMemo } from 'react';
import {
  Search, MoreHorizontal, Mail, Phone,
  Plus, Users, CheckCircle2, Clock,
  ArrowUpDown, ChevronRight
} from 'lucide-react';

// Sub-components
const StatusBadge = ({ status }: { status: string }) => {
  const styles: Record<string, string> = {
    New: "bg-blue-50 text-blue-700 border-blue-100",
    Contacted: "bg-amber-50 text-amber-700 border-amber-100",
    Qualified: "bg-emerald-50 text-emerald-700 border-emerald-100",
    Lost: "bg-slate-50 text-slate-600 border-slate-100",
  };
  return (
    <span className={`px-2 py-0.5 rounded-full text-[11px] font-semibold border ${styles[status] || "bg-gray-50 text-gray-600"}`}>
      {status.toUpperCase()}
    </span>
  );
};

const StatCard = ({ label, value, icon: Icon, color }: any) => (
  <div className="bg-white p-5 rounded-xl border border-gray-200 shadow-sm flex items-center gap-4">
    <div className={`p-3 rounded-lg ${color}`}>
      <Icon className="h-5 w-5" />
    </div>
    <div>
      <p className="text-sm text-gray-500 font-medium">{label}</p>
      <p className="text-2xl font-bold text-gray-900">{value}</p>
    </div>
  </div>
);

export default function BranchLeadsPage() {
  // Leads state initialized as empty
  const [leads, setLeads] = useState<any[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedLeads, setSelectedLeads] = useState<string[]>([]);

  const filteredLeads = useMemo(() =>
    leads.filter(lead =>
      lead.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      lead.email.toLowerCase().includes(searchTerm.toLowerCase())
    ), [searchTerm, leads]
  );

  const toggleSelectAll = () => {
    if (selectedLeads.length === filteredLeads.length && filteredLeads.length > 0) setSelectedLeads([]);
    else setSelectedLeads(filteredLeads.map(l => l.id));
  };

  const toggleSelect = (id: string) => {
    setSelectedLeads(prev => prev.includes(id) ? prev.filter(i => i !== id) : [...prev, id]);
  };

  return (
    <div className="min-h-screen bg-[#F8F9FB] p-6 lg:p-10">
      <div className="max-w-7xl mx-auto space-y-8">

        {/* Header Section */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <h1 className="text-2xl font-bold text-gray-900 tracking-tight">All Leads</h1>
            <p className="text-gray-500 text-sm mt-1">Managing all incoming prospects for <span className="font-semibold text-gray-700">Downtown Branch</span></p>
          </div>
          <div className="flex items-center gap-3">
            <button
              onClick={() => window.location.href = 'dsamanagement/createlead'}
              className="flex items-center gap-2 px-4 py-2 bg-[#2076C7] text-white rounded-lg text-sm font-semibold hover:bg-blue-700 transition-all shadow-md shadow-blue-100"
            >
              <Plus className="h-4 w-4" />
              Add New Lead
            </button>
          </div>
        </div>

        {/* Quick Stats */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <StatCard label="Total Leads" value={leads.length} icon={Users} color="bg-blue-50 text-blue-600" />
          <StatCard label="New Leads" value="0" icon={Clock} color="bg-orange-50 text-orange-600" />
          <StatCard label="Qualified" value="0" icon={CheckCircle2} color="bg-emerald-50 text-emerald-600" />
          <StatCard label="Conversion" value="0%" icon={ArrowUpDown} color="bg-purple-50 text-purple-600" />
        </div>

        {/* Main Content Area */}
        <div className="bg-white border border-gray-200 rounded-2xl shadow-sm overflow-hidden">

          {/* Table Toolbar */}
          <div className="p-4 border-b border-gray-100 flex flex-col sm:flex-row justify-between gap-4 bg-white">
            <div className="relative flex-1 max-w-md">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
              <input
                type="text"
                value={searchTerm}
                placeholder="Search by name, email, or ID..."
                className="w-full pl-10 pr-4 py-2 bg-gray-50 border border-transparent rounded-xl text-gray-600 focus:bg-white focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 outline-none transition-all text-sm"
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
          </div>

          {/* Table Container */}
          <div className="overflow-x-auto">
            <table className="w-full text-left">
              <thead>
                <tr className="bg-gray-50/50 border-b border-gray-100">
                  <th className="px-6 py-4 w-10">
                    <input
                      type="checkbox"
                      className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                      checked={filteredLeads.length > 0 && selectedLeads.length === filteredLeads.length}
                      onChange={toggleSelectAll}
                      disabled={filteredLeads.length === 0}
                    />
                  </th>
                  <th className="px-6 py-4 text-[13px] font-semibold text-gray-500 uppercase tracking-wider">Lead Information</th>
                  <th className="px-6 py-4 text-[13px] font-semibold text-gray-500 uppercase tracking-wider">Status</th>
                  <th className="px-6 py-4 text-[13px] font-semibold text-gray-500 uppercase tracking-wider">Source</th>
                  <th className="px-6 py-4 text-[13px] font-semibold text-gray-500 uppercase tracking-wider text-right">Action</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-50">
                {filteredLeads.map((lead) => (
                  <tr key={lead.id} className="group hover:bg-blue-50/30 transition-colors">
                    <td className="px-6 py-4">
                      <input
                        type="checkbox"
                        className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                        checked={selectedLeads.includes(lead.id)}
                        onChange={() => toggleSelect(lead.id)}
                      />
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-3">
                        <div className="h-10 w-10 rounded-full bg-gray-100 flex items-center justify-center text-gray-600 font-bold text-xs border border-white">
                          {lead.name.split(' ').map((n: string) => n[0]).join('')}
                        </div>
                        <div>
                          <div className="font-semibold text-gray-900 text-sm">{lead.name}</div>
                          <div className="flex items-center gap-3 mt-1 text-xs text-gray-400">
                            <span className="flex items-center gap-1"><Mail className="h-3 w-3" /> {lead.email}</span>
                            <span>•</span>
                            <span className="flex items-center gap-1"><Phone className="h-3 w-3" /> {lead.phone}</span>
                          </div>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4"><StatusBadge status={lead.status} /></td>
                    <td className="px-6 py-4">
                      <span className="text-sm text-gray-600">{lead.source}</span>
                      <div className="text-[10px] text-gray-400 mt-0.5">Added {new Date(lead.date).toLocaleDateString()}</div>
                    </td>
                    <td className="px-6 py-4 text-right">
                      <div className="flex justify-end gap-2">
                        <button className="p-2 text-gray-400 hover:text-blue-600 rounded-lg"><ChevronRight className="h-5 w-5" /></button>
                        <button className="p-2 text-gray-400 hover:text-gray-600 rounded-lg"><MoreHorizontal className="h-5 w-5" /></button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Empty State */}
          {filteredLeads.length === 0 && (
            <div className="flex flex-col items-center justify-center py-24 bg-white">
              <div className="bg-gray-50 p-4 rounded-full mb-4">
                <Users className="h-10 w-10 text-gray-300" />
              </div>
              <h3 className="text-lg font-semibold text-gray-900">No leads yet</h3>
              <p className="text-gray-500 text-sm max-w-xs text-center mt-2">
                {searchTerm 
                  ? `No leads found matching "${searchTerm}"`
                  : "Start growing your branch by adding your first lead manually or importing them."}
              </p>
              {!searchTerm && (
                <button
                  onClick={() => window.location.href = 'dsamanagement/createlead'}
                  className="mt-6 flex items-center gap-2 px-4 py-2 border border-gray-200 rounded-lg text-sm font-bold text-gray-700 hover:bg-gray-50 transition-all"
                >
                  <Plus className="h-4 w-4" />
                  Add your first lead
                </button>
              )}
              {searchTerm && (
                <button
                  onClick={() => setSearchTerm('')}
                  className="mt-4 text-sm font-bold text-gray-600 text-blue-600 hover:underline"
                >
                  Clear search
                </button>
              )}
            </div>
          )}

          {/* Footer */}
          <div className="px-6 py-4 bg-gray-50/50 border-t border-gray-100 flex items-center justify-between text-xs text-gray-500 font-medium">
            <p>Showing {filteredLeads.length} leads</p>
            <div className="flex gap-2">
              <button disabled className="px-3 py-1 border border-gray-200 rounded text-gray-700 bg-white opacity-50 cursor-not-allowed">Previous</button>
              <button disabled className="px-3 py-1 border border-gray-200 rounded text-gray-700 bg-white opacity-50 cursor-not-allowed">Next</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}