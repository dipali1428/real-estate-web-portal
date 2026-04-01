"use client";

import React, { useState, useEffect, useMemo } from "react";
import {
  Plus,
  Calendar,
  Activity,
  Pause,
  Play,
  XCircle,
  Edit3,
  ChevronRight,
  AlertCircle,
} from "lucide-react";
import { motion } from "framer-motion";
import toast from "react-hot-toast";
import Link from "next/link";

interface SIP {
  id: string;
  scheme_name: string;
  amount: number;
  frequency: string;
  installment_day: number;
  next_installment_date: string;
  status: "ACTIVE" | "PAUSED" | "CANCELLED";
  total_installments: number;
  paid_installments: number;
}

export default function SIPManagementPage() {
  const [loading, setLoading] = useState(true);
  const [sips, setSips] = useState<SIP[]>([]);

  useEffect(() => {
    setTimeout(() => setLoading(false), 800);
  }, []);

  const handleToggleStatus = (id: string, currentStatus: string) => {
    const newStatus = currentStatus === "ACTIVE" ? "PAUSED" : "ACTIVE";
    setSips((prev) =>
      prev.map((sip) =>
        sip.id === id ? { ...sip, status: newStatus as any } : sip
      )
    );
    toast.success(`SIP ${newStatus === "ACTIVE" ? "Resumed" : "Paused"} successfully!`);
  };

  const handleCancel = (id: string) => {
    if (confirm("Are you sure you want to cancel this SIP?")) {
      setSips((prev) =>
        prev.map((sip) =>
          sip.id === id ? { ...sip, status: "CANCELLED" as any } : sip
        )
      );
      toast.success("SIP Cancelled!");
    }
  };

  const activeSips = sips.filter((s) => s.status !== "CANCELLED");

  const upcomingPayments = useMemo(() => {
    return [...activeSips].sort(
      (a, b) =>
        new Date(a.next_installment_date).getTime() -
        new Date(b.next_installment_date).getTime()
    );
  }, [activeSips]);

  return (
    <div className="max-w-7xl mx-auto space-y-10 px-4">

      {/* Header */}
    

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">

        {/* Left Section */}
        <div className="lg:col-span-8 space-y-5">

          <h3 className="text-sm font-semibold text-slate-600 uppercase tracking-wide flex items-center gap-2">
            <Activity size={16} className="text-[#2076C7]" />
            Active Subscriptions ({activeSips.length})
          </h3>

          {loading ? (
            <div className="p-10 bg-white rounded-2xl border shadow-sm flex flex-col items-center gap-3">
              <div className="w-8 h-8 border-4 border-[#1CADA3] border-t-transparent rounded-full animate-spin" />
              <p className="text-sm text-slate-500">Fetching SIPs...</p>
            </div>
          ) : activeSips.length === 0 ? (
            <div className="p-12 bg-white rounded-2xl border text-center shadow-sm">
              <AlertCircle size={40} className="mx-auto mb-3 text-slate-300" />
              <p className="text-sm text-slate-500">No active SIPs found</p>
            </div>
          ) : (
            activeSips.map((sip) => (
              <motion.div
                layout
                key={sip.id}
                className="bg-white rounded-2xl p-6 border shadow-sm hover:shadow-md transition-all"
              >
                <div className="flex flex-col md:flex-row justify-between gap-5">

                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 rounded-xl bg-slate-100 text-[#2076C7] flex items-center justify-center font-semibold text-lg">
                      {sip.scheme_name.charAt(0)}
                    </div>

                    <div>
                      <h4 className="font-semibold text-slate-800 text-base">
                        {sip.scheme_name}
                      </h4>

                      <div className="flex gap-2 text-xs text-slate-500 mt-1">
                        <span>{sip.id}</span>
                        <span>•</span>
                        <span
                          className={
                            sip.status === "ACTIVE"
                              ? "text-emerald-500"
                              : "text-amber-500"
                          }
                        >
                          {sip.status}
                        </span>
                      </div>
                    </div>
                  </div>

                  <div className="flex gap-2">
                    <button
                      onClick={() => handleToggleStatus(sip.id, sip.status)}
                      className="p-2.5 bg-slate-100 rounded-lg hover:bg-slate-200 transition"
                    >
                      {sip.status === "ACTIVE" ? (
                        <Pause size={16} />
                      ) : (
                        <Play size={16} />
                      )}
                    </button>

                    <button className="p-2.5 bg-slate-100 rounded-lg hover:bg-slate-200 transition">
                      <Edit3 size={16} />
                    </button>

                    <button
                      onClick={() => handleCancel(sip.id)}
                      className="p-2.5 bg-slate-100 rounded-lg hover:bg-red-50 hover:text-red-500 transition"
                    >
                      <XCircle size={16} />
                    </button>
                  </div>
                </div>

                <div className="grid grid-cols-2 lg:grid-cols-4 gap-5 mt-6 pt-5 border-t">

                  <div>
                    <p className="text-xs text-slate-500">Monthly Pay</p>
                    <p className="text-base font-semibold text-[#2076C7]">
                      ₹{sip.amount.toLocaleString()}
                    </p>
                  </div>

                  <div>
                    <p className="text-xs text-slate-500">Installment Day</p>
                    <p className="text-sm text-slate-700">{sip.installment_day}th</p>
                  </div>

                  <div>
                    <p className="text-xs text-slate-500">Progress</p>
                    <p className="text-sm text-slate-700">
                      {sip.paid_installments} / {sip.total_installments}
                    </p>

                    <div className="w-full h-1.5 bg-slate-100 rounded-full mt-2">
                      <div
                        className="h-full bg-[#1CADA3] rounded-full"
                        style={{
                          width: `${(sip.paid_installments / sip.total_installments) * 100}%`,
                        }}
                      />
                    </div>
                  </div>

                  <div>
                    <p className="text-xs text-slate-500">Next Pay</p>
                    <p className="text-sm text-emerald-600">
                      {new Date(sip.next_installment_date).toLocaleDateString("en-IN", {
                        day: "2-digit",
                        month: "short",
                      })}
                    </p>
                  </div>
                </div>
              </motion.div>
            ))
          )}
        </div>

        {/* Sidebar */}
        <div className="lg:col-span-4">

          <div className="bg-gradient-to-br from-[#2076C7] to-[#1CADA3] rounded-3xl p-7 text-white shadow-lg">

            <h3 className="text-lg font-semibold mb-5 flex items-center gap-2">
              <Calendar size={18} />
              Upcoming Payments
            </h3>

            <div className="space-y-4">
              {upcomingPayments.slice(0, 3).map((sip) => (
                <div
                  key={sip.id}
                  className="flex justify-between items-center bg-white/10 rounded-xl px-4 py-3"
                >
                  <div>
                    <p className="text-sm font-medium">{sip.scheme_name}</p>
                    <p className="text-xs text-white/70">₹{sip.amount.toLocaleString()}</p>
                  </div>

                  <ChevronRight size={16} />
                </div>
              ))}
            </div>

            <button className="w-full py-3 mt-6 bg-white text-slate-800 rounded-xl text-sm font-medium hover:bg-slate-100 transition">
              View Full Schedule
            </button>
          </div>

        </div>
      </div>
    </div>
  );
}