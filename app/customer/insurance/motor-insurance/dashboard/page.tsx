"use client";

import React from "react";
import {
   FileText,
   CheckCircle2,
   Clock,
   Download,
   Settings2,
   Car
} from "lucide-react";

export default function MotorApplications() {
   const applications: any[] = []; // Empty state for now as per reference image

   return (
      <div className="space-y-6 text-left font-sans animate-in fade-in slide-in-from-bottom-2 duration-500">
         {/* Header Section */}
         <div className="flex flex-col lg:flex-row items-center justify-between gap-4 p-4 bg-white rounded-2xl border border-gray-100 shadow-sm transition-all">
            <div className="flex flex-col sm:flex-row items-center gap-4 w-full lg:w-auto">
               <div className="w-12 h-12 rounded-xl bg-gradient-to-r from-[#2076C7] to-[#1CADA3] flex items-center justify-center text-white shrink-0 shadow-md">
                  <FileText size={24} />
               </div>
               <div className="flex flex-col items-center sm:items-start">
                  <div className="flex flex-col sm:flex-row items-center gap-2 sm:gap-3 text-center sm:text-left">
                     <h1 className="text-xl font-black text-transparent bg-clip-text bg-gradient-to-r from-[#2076C7] to-[#1CADA3]">My Applications</h1>
                     <span className="px-2.5 py-1 bg-blue-50 text-blue-600 text-[10px] font-black rounded-lg border border-blue-100 uppercase tracking-widest whitespace-nowrap">
                        {applications.length} of {applications.length}
                     </span>
                  </div>
               </div>
            </div>

            <div className="flex items-center justify-center lg:justify-end gap-3 w-full lg:w-auto">
               <button className="p-2.5 bg-white border border-gray-200 rounded-xl text-gray-400 hover:bg-gray-50 transition-all shadow-sm active:scale-95">
                  <Settings2 size={18} />
               </button>
               <button className="p-2.5 bg-white border border-gray-200 rounded-xl text-gray-400 hover:bg-gray-50 transition-all shadow-sm active:scale-95">
                  <Download size={18} />
               </button>
            </div>
         </div>

         {/* Stats row */}
         <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            <ApplicationStat icon={FileText} label="Total" value={applications.length.toString()} subText="0 quotes · 0 pend" iconColor="bg-blue-50 text-blue-500" />
            <ApplicationStat icon={CheckCircle2} label="Active" value="0" subText="Policies" iconColor="bg-emerald-50 text-emerald-500" />
            <ApplicationStat icon={Clock} label="Pending" value="0" subText="Decision" iconColor="bg-orange-50 text-orange-500" />
            <ApplicationStat icon={Car} label="Vehicles" value="0" subText="Insured" iconColor="bg-purple-50 text-purple-500" />
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
                        <th className="px-6 py-4 text-[9px] font-black text-gray-400 uppercase tracking-widest">Insurer</th>
                        <th className="px-6 py-4 text-[9px] font-black text-gray-400 uppercase tracking-widest">Vehicle Reg</th>
                        <th className="px-6 py-4 text-[9px] font-black text-gray-400 uppercase tracking-widest">Cover Type</th>
                        <th className="px-6 py-4 text-[9px] font-black text-gray-400 uppercase tracking-widest text-right">Premium</th>
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

function ApplicationStat({ icon: Icon, label, value, subText, iconColor }: any) {
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