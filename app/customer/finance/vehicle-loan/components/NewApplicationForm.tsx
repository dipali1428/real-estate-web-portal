"use client";

import React from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, Car, IndianRupee, FileText, ArrowRight, User, Phone, Building2, Calendar, Briefcase } from "lucide-react";

interface NewApplicationFormProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function NewApplicationForm({ isOpen, onClose }: NewApplicationFormProps) {
  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/40 backdrop-blur-sm z-40"
          />

          {/* Modal Modal */}
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 pointer-events-none">
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              transition={{ type: "spring", duration: 0.5 }}
              className="bg-white rounded-3xl shadow-2xl w-full max-w-2xl overflow-hidden pointer-events-auto border border-gray-100 flex flex-col font-sans max-h-[90vh]"
            >
              {/* Header */}
              <div className="flex items-center justify-between p-6 border-b border-gray-100 bg-gray-50/50">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 flex items-center justify-center rounded-xl bg-gradient-to-r from-[#2076C7] to-[#1CADA3] text-white shadow-sm">
                    <Car size={20} />
                  </div>
                  <div>
                    <h2 className="text-xl font-black text-transparent bg-clip-text bg-gradient-to-r from-[#2076C7] to-[#1CADA3]">New Vehicle Loan</h2>
                    <p className="text-xs text-gray-500 font-bold uppercase tracking-widest mt-0.5">Start your application</p>
                  </div>
                </div>
                <button
                  onClick={onClose}
                  className="p-2 text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded-xl transition-all"
                >
                  <X size={20} />
                </button>
              </div>

              {/* Body */}
              <div className="p-6 overflow-y-auto custom-scrollbar flex-1 bg-white">
                <form className="space-y-8">
                  
                  {/* Personal Information */}
                  <div className="space-y-4">
                    <div className="flex items-center gap-2 pb-2 border-b border-gray-100">
                      <User size={16} className="text-[#2076C7]" />
                      <h3 className="text-[10px] font-black text-gray-400 uppercase tracking-widest">Personal Information</h3>
                    </div>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div className="relative group">
                        <User className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400 group-focus-within:text-[#2076C7] transition-colors" size={18} />
                        <input
                          type="text"
                          placeholder="Full Name"
                          className="w-full pl-10 pr-4 py-3 bg-gray-50 border border-gray-200 rounded-xl text-sm font-medium text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all"
                        />
                      </div>
                      <div className="relative group">
                        <Phone className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400 group-focus-within:text-[#2076C7] transition-colors" size={18} />
                        <input
                          type="tel"
                          placeholder="Mobile Number"
                          className="w-full pl-10 pr-4 py-3 bg-gray-50 border border-gray-200 rounded-xl text-sm font-medium text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all"
                        />
                      </div>
                    </div>
                  </div>

                  {/* Vehicle Details */}
                  <div className="space-y-4">
                    <div className="flex items-center gap-2 pb-2 border-b border-gray-100">
                      <Car size={16} className="text-[#1CADA3]" />
                      <h3 className="text-[10px] font-black text-gray-400 uppercase tracking-widest">Vehicle Details</h3>
                    </div>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div className="relative group">
                        <Car className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400 group-focus-within:text-[#1CADA3] transition-colors" size={18} />
                        <select className="w-full pl-10 pr-4 py-3 bg-gray-50 border border-gray-200 rounded-xl text-sm font-medium text-gray-900 appearance-none focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all">
                          <option value="" disabled selected>Select Vehicle Type</option>
                          <option value="4wheeler">4-Wheeler Car</option>
                          <option value="2wheeler">2-Wheeler / Bike</option>
                          <option value="commercial">Commercial Vehicle</option>
                        </select>
                      </div>
                      <div className="relative group">
                        <Building2 className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400 group-focus-within:text-[#1CADA3] transition-colors" size={18} />
                        <input
                          type="text"
                          placeholder="Dealer / Showroom Name"
                          className="w-full pl-10 pr-4 py-3 bg-gray-50 border border-gray-200 rounded-xl text-sm font-medium text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all"
                        />
                      </div>
                      <div className="sm:col-span-2 relative group">
                        <Car className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400 group-focus-within:text-[#1CADA3] transition-colors" size={18} />
                        <input
                          type="text"
                          placeholder="Vehicle Make / Model (e.g. Tata Nexon EV)"
                          className="w-full pl-10 pr-4 py-3 bg-gray-50 border border-gray-200 rounded-xl text-sm font-medium text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all"
                        />
                      </div>
                      <div className="relative group">
                        <FileText className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400 group-focus-within:text-[#1CADA3] transition-colors" size={18} />
                        <input
                          type="text"
                          placeholder="Registration No. (Optional)"
                          className="w-full pl-10 pr-4 py-3 bg-gray-50 border border-gray-200 rounded-xl text-sm font-medium text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all uppercase"
                        />
                      </div>
                      <div className="relative group">
                        <IndianRupee className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400 group-focus-within:text-[#1CADA3] transition-colors" size={18} />
                        <input
                          type="number"
                          placeholder="On-Road Price"
                          className="w-full pl-10 pr-4 py-3 bg-gray-50 border border-gray-200 rounded-xl text-sm font-medium text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all"
                        />
                      </div>
                    </div>
                  </div>

                  {/* Financial & Employment Info */}
                  <div className="space-y-4 pb-4">
                    <div className="flex items-center gap-2 pb-2 border-b border-gray-100">
                      <Briefcase size={16} className="text-orange-500" />
                      <h3 className="text-[10px] font-black text-gray-400 uppercase tracking-widest">Financial & Employment</h3>
                    </div>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div className="relative group">
                        <Briefcase className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400 group-focus-within:text-orange-500 transition-colors" size={18} />
                        <select className="w-full pl-10 pr-4 py-3 bg-gray-50 border border-gray-200 rounded-xl text-sm font-medium text-gray-900 appearance-none focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all">
                          <option value="" disabled selected>Select Employment</option>
                          <option value="salaried">Salaried Employee</option>
                          <option value="self_employed">Self-Employed</option>
                          <option value="professional">Professional / Doctor</option>
                        </select>
                      </div>
                      <div className="relative group">
                        <IndianRupee className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400 group-focus-within:text-orange-500 transition-colors" size={18} />
                        <input
                          type="number"
                          placeholder="Monthly Net Income"
                          className="w-full pl-10 pr-4 py-3 bg-gray-50 border border-gray-200 rounded-xl text-sm font-medium text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all"
                        />
                      </div>
                      <div className="relative group">
                        <IndianRupee className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400 group-focus-within:text-orange-500 transition-colors" size={18} />
                        <input
                          type="number"
                          placeholder="Desired Loan Amount"
                          className="w-full pl-10 pr-4 py-3 bg-gray-50 border border-gray-200 rounded-xl text-sm font-medium text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all"
                        />
                      </div>
                      <div className="relative group">
                        <Calendar className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400 group-focus-within:text-orange-500 transition-colors" size={18} />
                        <input
                          type="number"
                          placeholder="Tenure (Years)"
                          className="w-full pl-10 pr-4 py-3 bg-gray-50 border border-gray-200 rounded-xl text-sm font-medium text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all"
                        />
                      </div>
                    </div>
                  </div>
                </form>
              </div>

              {/* Footer */}
              <div className="p-6 border-t border-gray-100 bg-gray-50/50 flex justify-end gap-3">
                <button
                  onClick={onClose}
                  className="px-6 py-2.5 bg-white border border-gray-200 text-gray-600 rounded-xl font-bold text-xs uppercase tracking-widest hover:bg-gray-50 transition-all shadow-sm"
                >
                  Cancel
                </button>
                <button
                  className="flex items-center gap-2 px-6 py-2.5 bg-gradient-to-r from-[#2076C7] to-[#1CADA3] hover:shadow-lg hover:shadow-teal-500/20 text-white rounded-xl font-black text-xs uppercase tracking-widest transition-all active:scale-95"
                >
                  Confirm Application
                  <ArrowRight size={16} />
                </button>
              </div>
            </motion.div>
          </div>
        </>
      )}
    </AnimatePresence>
  );
}
