"use client";

import React from "react";
import { motion } from "framer-motion";
import { useRouter } from "next/navigation";
import {
  Star
} from "lucide-react";
import TopRecommendedPlans from "../../../products/life-insurance/components/TopRecommendedPlans";
import LifeInsuranceHeader from "./components/LifeInsuranceHeader";


export default function LifeInsuranceDashboard() {
  const router = useRouter();

  const personalisedOffers = [
    { provider: "HDFC Life", cover: "1 Cr", premium: "₹542/mo" },
    { provider: "ICICI Pru", cover: "1.5 Cr", premium: "₹780/mo" },
    { provider: "Tata AIA", cover: "1.2 Cr", premium: "₹690/mo" },
  ];

  return (
    <>
        {/* ─── OFFERS BANNER ─── */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-gradient-to-r from-[#2076C7] to-[#1CADA3] rounded-[2rem] p-6 text-white overflow-hidden relative shadow-lg mb-8"
        >
          <div className="absolute top-0 right-0 w-64 h-64 bg-white/5 rounded-full -translate-y-1/2 translate-x-1/4 blur-2xl" />
          <div className="absolute bottom-0 left-20 w-32 h-32 bg-white/10 rounded-full translate-y-1/2 blur-xl" />

          <div className="relative z-10 flex flex-col lg:flex-row items-center justify-between gap-6">
            <div className="flex items-center gap-5">
              <div className="w-14 h-14 bg-white/20 rounded-2xl flex items-center justify-center backdrop-blur-md shadow-sm border border-white/10">
                <Star size={24} className="text-white" />
              </div>
              <div>
                <p className="text-[10px] font-black uppercase tracking-[0.3em] text-white/70 mb-1">
                  Tailored Options For You
                </p>
                <h3 className="text-xl md:text-2xl font-black leading-tight">
                  Elite Recommended Plans from{" "}
                  <span className="underline decoration-white/30 underline-offset-4">
                    ₹450/month
                  </span>
                </h3>
              </div>
            </div>

            <div className="flex items-center gap-3 overflow-x-auto pb-2 lg:pb-0 hide-scrollbar w-full lg:w-auto">
              {personalisedOffers.map((o) => (
                <div key={o.provider} className="bg-white/10 backdrop-blur-md border border-white/20 rounded-2xl px-5 py-3 shrink-0 hover:bg-white/15 transition-all cursor-pointer group">
                  <p className="text-[9px] font-black text-white/60 uppercase tracking-[0.2em] mb-1">
                    {o.provider}
                  </p>
                  <p className="text-sm font-black text-white">
                    {o.cover} • {o.premium}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </motion.div>

        {/* ─── BLUEPRINTS ─── */}
        <div className="relative">
          <div className="bg-white p-2 md:p-3 rounded-[2rem] border border-slate-100 shadow-sm relative z-10">
            <TopRecommendedPlans />
          </div>
        </div>

    </>
  );
}