"use client";

import React from "react";
import {
   FileText,
   CheckCircle2,
   Clock,
   History,
   Download,
   Plus,
   MoreVertical,
   Calendar,
   Layers,
   Search,
   Settings2,
   ChevronRight
} from "lucide-react";
import { motion } from "framer-motion";

interface MyApplicationsProps {
   searchQuery: string;
}

export default function MyApplications({ searchQuery }: MyApplicationsProps) {
   const applications: any[] = []; // Empty state for now as per reference image

   return (
      <div className="space-y-6 text-left font-sans">
         {/* Stats row */}
         <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            <ApplicationStat icon={FileText} label="Total" value={applications.length.toString()} subText="0 app · 0 pend" iconColor="bg-blue-50 text-blue-500" />
            <ApplicationStat icon={CheckCircle2} label="Approved" value="₹0" subText="Sanctioned" iconColor="bg-emerald-50 text-emerald-500" />
            <ApplicationStat icon={Clock} label="Pending" value="₹0" subText="Decision" iconColor="bg-orange-50 text-orange-500" />
            <ApplicationStat icon={Layers} label="Avg. Tenure" value="0 Y" subText="All apps" iconColor="bg-purple-50 text-purple-500" />
         </div>

         {/* Table Section */}
         <div className="bg-white rounded-3xl border border-gray-100 shadow-sm overflow-hidden">
            <div className="p-4 border-b border-gray-50 text-[10px] font-black text-gray-400 uppercase tracking-widest">
               Showing {applications.length} applications
            </div>

            <div className="overflow-x-auto">
               <table className="w-full text-left">
                  <thead className="bg-gray-50/50 border-b border-gray-100">
                     <tr>
                        <th className="px-6 py-4 text-[9px] font-black text-gray-400 uppercase tracking-widest">Date & Time</th>
                        <th className="px-6 py-4 text-[9px] font-black text-gray-400 uppercase tracking-widest">Type</th>
                        <th className="px-6 py-4 text-[9px] font-black text-gray-400 uppercase tracking-widest">Bank Name</th>
                        <th className="px-6 py-4 text-[9px] font-black text-gray-400 uppercase tracking-widest">Tenure</th>
                        <th className="px-6 py-4 text-[9px] font-black text-gray-400 uppercase tracking-widest">Rate</th>
                        <th className="px-6 py-4 text-[9px] font-black text-gray-400 uppercase tracking-widest text-right">Loan Amount</th>
                        <th className="px-6 py-4 text-[9px] font-black text-gray-400 uppercase tracking-widest text-center">Status</th>
                     </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-50">
                     {applications.length > 0 ? (
                        applications.map((app, i) => (
                           <tr key={i} className="hover:bg-gray-50 transition-colors">
                              {/* Rendering mock data if needed */}
                           </tr>
                        ))
                     ) : (
                        <tr>
                           <td colSpan={7} className="py-24 text-center">
                              <div className="flex flex-col items-center">
                                 <div className="w-16 h-16 rounded-2xl bg-gray-50 flex items-center justify-center text-gray-200 mb-4">
                                    <FileText size={32} />
                                 </div>
                                 <p className="text-gray-400 font-bold uppercase tracking-widest">No applications found</p>
                              </div>
                           </td>
                        </tr>
                     )}
                  </tbody>
               </table>
            </div>
         </div>
      </div>
   );
}

function ApplicationStat({ icon: Icon, label, value, subText, iconColor }: { icon: React.ElementType, label: string, value: string, subText: string, iconColor: string }) {
   return (
      <div className="bg-white p-6 rounded-3xl border border-gray-100 shadow-sm flex flex-col items-start gap-4 hover:shadow-md transition-shadow h-full">
         <div className={`p-2.5 rounded-xl ${iconColor} shrink-0`}>
            <Icon size={20} strokeWidth={2.5} />
         </div>
         <div className="flex flex-col items-start">
            <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest">{label}</p>
            <p className="text-2xl font-black text-gray-900 mt-1">{value}</p>
            <p className="text-[10px] text-gray-400 font-bold mt-2 uppercase tracking-tighter">{subText}</p>
         </div>
      </div>
   );
}
