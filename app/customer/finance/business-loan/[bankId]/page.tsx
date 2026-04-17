"use client";

import React from "react";
import { useParams, useRouter } from "next/navigation";
import {
  X,
  ShieldCheck,
  CheckCircle2,
  Percent,
  ArrowRight,
  Briefcase,
  ArrowUpRight,
  Repeat,
  Zap
} from "lucide-react";
import { businessLoanBanks } from "../components/data";

const productIcon: Record<string, React.ElementType> = {
  "Term Loan": Briefcase,
  "Top up": ArrowUpRight,
  "Balance Transfer": Repeat,
  "OD": Zap,
};

export default function BankDetailPage({ params: paramsProp }: { params: { bankId: string } }) {
  const params = useParams();
  const router = useRouter();

  const bankId = paramsProp?.bankId || (params?.bankId as string);
  const bank = businessLoanBanks.find(b => b.slug === bankId);

  if (!bank) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen bg-[#F8FAFC]">
        <div className="bg-white p-12 rounded-[2rem] shadow-sm border border-slate-100 text-center">
          <h1 className="text-2xl font-black text-slate-800 mb-4">Bank Not Found</h1>
          <button
            onClick={() => router.back()}
            className="px-8 py-3 bg-blue-600 text-white rounded-2xl font-bold transition hover:bg-blue-700"
          >
            Go Back
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#F8FAFC] py-6 px-4 flex flex-col items-center">

      {/* ONE BIG CARD */}
      <div className="w-full max-w-4xl bg-white border border-slate-200 rounded-[2.5rem] shadow-xl shadow-slate-200/60 overflow-hidden">

        {/* ── Close Button ── */}
        <div className="px-6 pt-5 flex justify-end">
          <button
            onClick={() => router.back()}
            className="group w-9 h-9 flex items-center justify-center rounded-full border border-slate-200 text-slate-400 hover:bg-red-50 hover:border-red-200 hover:text-red-500 transition-all"
            title="Close"
          >
            <X size={16} className="group-hover:rotate-90 transition-transform duration-200" />
          </button>
        </div>

        {/* ── Bank Identity Header (centered) ── */}
        <div className="px-8 pb-6 pt-2 text-center border-b border-slate-100">
          <span className="inline-flex items-center gap-1.5 px-3 py-1 bg-blue-50 text-blue-600 rounded-lg text-[10px] font-black uppercase tracking-widest border border-blue-100/60 mb-3">
            Verified Finance Partner
          </span>
          <h1 className="text-3xl sm:text-4xl font-black tracking-tight bg-gradient-to-r from-[#2076C7] to-[#1CADA3] bg-clip-text text-transparent">
            {bank.name}
          </h1>
          <p className="text-sm text-slate-500 font-medium mt-1">{bank.tagline}</p>

          {/* Products Chips */}
          <div className="flex flex-wrap justify-center gap-2 mt-4">
            {bank.details.products.map((p) => {
              const Icon = productIcon[p];
              return (
                <span
                  key={p}
                  className="inline-flex items-center gap-1.5 px-3 py-1 text-[10px] font-black bg-slate-50 border border-slate-200 text-slate-500 rounded-full uppercase tracking-wider"
                >
                  {Icon && <Icon size={11} />}
                  {p}
                </span>
              );
            })}
          </div>
        </div>

        {/* ── Two Content Cards ── */}
        <div className="p-6 grid grid-cols-1 md:grid-cols-2 gap-5">

          {/* Eligibility Card */}
          <div className="rounded-2xl border border-emerald-100 bg-gradient-to-br from-emerald-50/60 to-white overflow-hidden">
            {/* Card header bar */}
            <div className="flex items-center gap-3 px-5 py-4 border-b border-emerald-100 bg-emerald-50/40">
              <div className="w-9 h-9 rounded-xl bg-white text-emerald-600 flex items-center justify-center shadow-sm border border-emerald-100">
                <CheckCircle2 size={18} strokeWidth={2.5} />
              </div>
              <h3 className="text-sm font-black text-slate-800 uppercase tracking-wider">Eligibility Requirements</h3>
            </div>
            {/* List */}
            <ul className="divide-y divide-emerald-50">
              {bank.details.eligibility.map((item, i) => (
                <li key={i} className="flex items-start gap-3 px-5 py-3.5 hover:bg-emerald-50/40 transition-colors group">
                  <div className="mt-1 w-4 h-4 rounded-full border border-emerald-200 bg-white flex items-center justify-center shrink-0 group-hover:border-emerald-400 transition-colors">
                    <div className="w-1.5 h-1.5 rounded-full bg-emerald-200 group-hover:bg-emerald-500 transition-colors" />
                  </div>
                  <p className="text-sm font-semibold text-slate-600 leading-snug">{item}</p>
                </li>
              ))}
            </ul>
          </div>

          {/* Key Offer Details Card */}
          <div className="rounded-2xl border border-blue-100 bg-gradient-to-br from-blue-50/60 to-white overflow-hidden">
            {/* Card header bar */}
            <div className="flex items-center gap-3 px-5 py-4 border-b border-blue-100 bg-blue-50/40">
              <div className="w-9 h-9 rounded-xl bg-white text-emerald-600 flex items-center justify-center shadow-sm border border-blue-100">
                <Percent size={18} strokeWidth={2.5} />
              </div>
              <h3 className="text-sm font-black text-slate-800 uppercase tracking-wider">Key Offer Details</h3>
            </div>
            {/* List — same style as Eligibility */}
            <ul className="divide-y divide-blue-50">
              {[
                { label: "Interest Rate (Starting From)", value: bank.interestRate },
                { label: "Processing Fee", value: bank.processingFee },
                { label: "Max Funding Amount", value: bank.details.maxLoanAmount },
                { label: "Maximum Tenure", value: bank.details.maxTenure },
              ].map((item, i) => (
                <li key={i} className="flex items-center justify-between px-5 py-3.5 hover:bg-blue-50/40 transition-colors group">
                  <div className="flex items-center gap-3">
                    <div className="w-4 h-4 rounded-full border border-blue-200 bg-white flex items-center justify-center shrink-0 group-hover:border-blue-400 transition-colors">
                      <div className="w-1.5 h-1.5 rounded-full bg-blue-200 group-hover:bg-blue-500 transition-colors" />
                    </div>
                    <p className="text-sm font-semibold text-slate-500 leading-snug">{item.label}</p>
                  </div>
                  <span className="text-sm font-black text-slate-800">{item.value}</span>
                </li>
              ))}
            </ul>
          </div>

        </div>

        {/* ── Apply CTA ── */}
        <div className="px-6 pb-10 flex flex-col items-center">
          <button className="px-20 py-4 bg-gradient-to-r from-[#2076C7] to-[#1CADA3] text-white rounded-2xl font-black text-sm uppercase tracking-[0.15em] shadow-lg shadow-blue-500/20 hover:shadow-blue-500/40 hover:-translate-y-0.5 transition-all active:scale-[0.98] flex items-center justify-center gap-3 group">
            Apply Now
            <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
          </button>
          <p className="text-center text-[10px] font-bold text-slate-400 mt-3 flex items-center justify-center gap-1.5">
            <ShieldCheck size={12} className="text-emerald-500" />
            No hidden charges · 256-bit secure & encrypted
          </p>
        </div>

      </div>
    </div>
  );
}
