"use client";

import React, { useState } from 'react';
import { FileText, Phone, Mail, Search, ExternalLink, Briefcase } from 'lucide-react';

// Mock Data
const initialApplications = [
  {
    id: 1,
    positionName: "Senior Frontend Developer",
    fullName: "Arjun Mehta",
    email: "arjun.m@example.com",
    phone: "+91 98765 43210",
    totalExp: "5.2 Years",
    currentCtc: "18 LPA",
    expectedCtc: "24 LPA",
    resumeUrl: "#",
  },
  {
    id: 2,
    positionName: "Product Designer",
    fullName: "Sarah Jenkins",
    email: "sarah.j@design.co",
    phone: "+1 415 555 0123",
    totalExp: "3 Years",
    currentCtc: "$90,000",
    expectedCtc: "$110,000",
    resumeUrl: "#",
  },
  {
    id: 3,
    positionName: "Backend Engineer",
    fullName: "Vikram Singh",
    email: "v.singh@techcorp.in",
    phone: "+91 99887 76655",
    totalExp: "8 Years",
    currentCtc: "25 LPA",
    expectedCtc: "32 LPA",
    resumeUrl: "#",
  },
];

export default function CareerManagementPage() {
  const [searchTerm, setSearchTerm] = useState("");

  const filteredApplications = initialApplications.filter(
    (app) =>
      app.fullName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      app.positionName.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-gray-50 p-4 md:p-8">
      <div className="max-w-7xl mx-auto">
        
        {/* Header Section */}
        <div className="flex flex-col md:flex-row md:items-center justify-between mb-8 gap-4">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">Career Management</h1>
            <p className="text-gray-500 text-sm">Review and manage incoming job applications</p>
          </div>
          
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 w-4 h-4" />
            <input
              type="text"
              placeholder="Search by name or position..."
              className="pl-10 pr-4 py-2 border border-gray-200 rounded-lg w-full md:w-80 focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white"
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
        </div>

        {/* Table Container */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-gray-50 border-b border-gray-200">
                  <th className="px-6 py-4 text-xs font-semibold text-gray-600 uppercase tracking-wider">Position</th>
                  <th className="px-6 py-4 text-xs font-semibold text-gray-600 uppercase tracking-wider">Applicant Details</th>
                  <th className="px-6 py-4 text-xs font-semibold text-gray-600 uppercase tracking-wider">Contact</th>
                  <th className="px-6 py-4 text-xs font-semibold text-gray-600 uppercase tracking-wider text-center">Experience</th>
                  <th className="px-6 py-4 text-xs font-semibold text-gray-600 uppercase tracking-wider">CTC (Cur/Exp)</th>
                  <th className="px-6 py-4 text-xs font-semibold text-gray-600 uppercase tracking-wider text-right">Resume</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {filteredApplications.length > 0 ? (
                  filteredApplications.map((app) => (
                    <tr key={app.id} className="hover:bg-blue-50/30 transition-colors">
                      {/* Position */}
                      <td className="px-6 py-4">
                        <div className="flex items-center gap-2">
                          <Briefcase className="w-4 h-4 text-blue-500" />
                          <span className="font-medium text-gray-900">{app.positionName}</span>
                        </div>
                      </td>

                      {/* Full Name */}
                      <td className="px-6 py-4">
                        <div className="text-sm font-semibold text-gray-800">{app.fullName}</div>
                      </td>

                      {/* Mail & Phone */}
                      <td className="px-6 py-4">
                        <div className="flex flex-col gap-1">
                          <div className="flex items-center gap-2 text-xs text-gray-600">
                            <Mail className="w-3 h-3" /> {app.email}
                          </div>
                          <div className="flex items-center gap-2 text-xs text-gray-600">
                            <Phone className="w-3 h-3" /> {app.phone}
                          </div>
                        </div>
                      </td>

                      {/* Total Exp */}
                      <td className="px-6 py-4 text-center">
                        <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-gray-100 text-gray-800">
                          {app.totalExp}
                        </span>
                      </td>

                      {/* CTC Details */}
                      <td className="px-6 py-4 text-sm">
                        <div className="text-gray-900 font-medium">{app.currentCtc} <span className="text-[10px] text-gray-400 font-normal">CUR</span></div>
                        <div className="text-blue-600 font-semibold">{app.expectedCtc} <span className="text-[10px] text-blue-400 font-normal">EXP</span></div>
                      </td>

                      {/* Resume Action */}
                      <td className="px-6 py-4 text-right">
                        <a
                          href={app.resumeUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-indigo-50 text-indigo-700 rounded-md text-xs font-bold hover:bg-indigo-100 transition-colors border border-indigo-100"
                        >
                          <FileText className="w-3.5 h-3.5" />
                          VIEW PDF
                        </a>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan={6} className="px-6 py-12 text-center text-gray-500">
                      No applications found matching your search.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
          
          {/* Footer / Pagination Mockup */}
          <div className="px-6 py-4 bg-gray-50 border-t border-gray-200 text-xs text-gray-500 flex justify-between items-center">
            Showing {filteredApplications.length} applications
            <div className="flex gap-2">
              <button className="px-3 py-1 border rounded bg-white hover:bg-gray-50 disabled:opacity-50" disabled>Prev</button>
              <button className="px-3 py-1 border rounded bg-white hover:bg-gray-50 disabled:opacity-50" disabled>Next</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}