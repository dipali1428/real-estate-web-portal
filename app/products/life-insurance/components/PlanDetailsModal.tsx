"use client";

import React, { useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
    X, CheckCircle2, Info, ArrowRight,
    Shield, Target, Award, Sparkles,
    Calendar, IndianRupee, Clock, ArrowUpRight
} from "lucide-react";

type Plan = {
    id: number;
    name: string;
    insurer: string;
    category: string;
    tag: string;
    desc: string;
    features: string[];
    bestFor: string;
    icon: React.ElementType;
    accentColor: string;
    badge: string;
    ctas?: string[];
};

type PlanDetailsModalProps = {
    plan: Plan | null;
    onClose: () => void;
    onGetQuote: (plan: Plan) => void;
};

export default function PlanDetailsModal({ plan, onClose, onGetQuote }: PlanDetailsModalProps) {
    useEffect(() => {
        if (plan) {
            document.body.style.overflow = "hidden";
        } else {
            document.body.style.overflow = "";
        }
        return () => { document.body.style.overflow = ""; };
    }, [plan]);

    return (
        <AnimatePresence>
            {plan && (
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="fixed inset-0 z-[9999] flex items-center justify-center p-4 md:p-6"
                    onClick={onClose}
                >
                    {/* Backdrop */}
                    <div className="absolute inset-0 bg-[#0B1C2E]/70 backdrop-blur-md" />

                    {/* Modal */}
                    <motion.div
                        initial={{ opacity: 0, scale: 0.95, y: 30 }}
                        animate={{ opacity: 1, scale: 1, y: 0 }}
                        exit={{ opacity: 0, scale: 0.95, y: 30 }}
                        transition={{ type: "spring", stiffness: 300, damping: 28 }}
                        onClick={e => e.stopPropagation()}
                        className="relative bg-white rounded-[2.5rem] shadow-[0_50px_100px_rgba(0,0,0,0.3)] w-full max-w-2xl overflow-hidden flex flex-col max-h-[90vh] font-sans"
                    >
                        {/* Header Image/Background */}
                        <div
                            className="h-32 md:h-40 w-full relative overflow-hidden"
                            style={{ backgroundColor: `${plan.accentColor}10` }}
                        >
                            <div className="absolute inset-0 opacity-20">
                                <div className="absolute top-0 right-0 w-64 h-64 rounded-full blur-3xl transform translate-x-1/2 -translate-y-1/2" style={{ backgroundColor: plan.accentColor }} />
                                <div className="absolute bottom-0 left-0 w-48 h-48 rounded-full blur-2xl transform -translate-x-1/2 translate-y-1/2" style={{ backgroundColor: "#1CADA3" }} />
                            </div>

                            {/* Close button */}
                            <button
                                onClick={onClose}
                                className="absolute top-5 right-5 w-10 h-10 bg-white/80 hover:bg-white rounded-full flex items-center justify-center shadow-lg transition-all z-20"
                            >
                                <X className="w-5 h-5 text-slate-700" />
                            </button>

                            {/* Plan Icon Overlay */}
                            <div className="absolute -bottom-8 left-10 w-20 h-20 rounded-3xl bg-white shadow-xl flex items-center justify-center z-10 border border-slate-50">
                                <plan.icon className="w-10 h-10" style={{ color: plan.accentColor }} />
                            </div>
                        </div>

                        <div className="pt-12 pb-8 px-8 md:px-12 overflow-y-auto no-scrollbar">
                            {/* Title Section */}
                            <div className="mb-8">
                                <div className="flex flex-wrap items-center gap-3 mb-2">
                                    <p className="text-[10px] font-black text-slate-400 uppercase tracking-[0.4em]">{plan.insurer}</p>
                                    <div
                                        className="px-2.5 py-1 rounded-full text-[8px] font-black uppercase tracking-widest border"
                                        style={{ color: plan.accentColor, borderColor: `${plan.accentColor}30`, backgroundColor: `${plan.accentColor}08` }}
                                    >
                                        {plan.badge}
                                    </div>
                                </div>
                                <h2 className="text-2xl md:text-3xl font-black text-[#0B1C2E] leading-tight mb-2">
                                    {plan.name}
                                </h2>
                                <p className="text-sm font-bold flex items-center gap-1.5" style={{ color: plan.accentColor }}>
                                    <Sparkles className="w-4 h-4" />
                                    {plan.tag}
                                </p>
                            </div>

                            {/* Description */}
                            <div className="mb-8 p-5 bg-slate-50 rounded-2xl border border-slate-100">
                                <p className="text-sm text-slate-600 font-medium leading-relaxed">
                                    {plan.desc}
                                </p>
                            </div>

                            {/* Feature Grid */}
                            <div className="mb-10">
                                <h4 className="flex items-center gap-2 text-[11px] font-black text-slate-400 uppercase tracking-widest mb-5">
                                    <Award className="w-4 h-4 text-[#2076C7]" />
                                    Core Plan Benefits
                                </h4>
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                    {plan.features.map((feature, idx) => (
                                        <div key={idx} className="flex items-start gap-3 p-3 rounded-xl hover:bg-slate-50 transition-colors">
                                            <div className="w-5 h-5 rounded-full bg-emerald-50 flex items-center justify-center shrink-0 mt-0.5">
                                                <CheckCircle2 className="w-3 h-3 text-emerald-500" />
                                            </div>
                                            <span className="text-[13px] font-bold text-slate-700 leading-snug">{feature}</span>
                                        </div>
                                    ))}
                                </div>
                            </div>

                            {/* Additional Info Cards */}
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-10">
                                <div className="p-5 bg-blue-50/50 rounded-2xl border border-blue-100">
                                    <div className="flex items-center gap-2 mb-3">
                                        <div className="w-8 h-8 rounded-lg bg-white flex items-center justify-center shadow-sm">
                                            <Target className="w-4 h-4 text-[#2076C7]" />
                                        </div>
                                        <p className="text-[10px] font-black text-slate-500 uppercase tracking-widest">Ideal Purpose</p>
                                    </div>
                                    <p className="text-xs font-bold text-slate-700 leading-relaxed">
                                        Best for {plan.bestFor.toLowerCase()}
                                    </p>
                                </div>
                                <div className="p-5 bg-emerald-50/50 rounded-2xl border border-emerald-100">
                                    <div className="flex items-center gap-2 mb-3">
                                        <div className="w-8 h-8 rounded-lg bg-white flex items-center justify-center shadow-sm">
                                            <Shield className="w-4 h-4 text-emerald-500" />
                                        </div>
                                        <p className="text-[10px] font-black text-slate-500 uppercase tracking-widest">Protection Category</p>
                                    </div>
                                    <p className="text-xs font-bold text-slate-700 leading-relaxed">
                                        {plan.category} • IRDAI Approved
                                    </p>
                                </div>
                            </div>

                            {/* Why Choose Section */}
                            <div className="mb-10 p-6 bg-white border border-slate-200 rounded-3xl shadow-sm relative overflow-hidden group">
                                <div className="absolute top-0 right-0 p-4 opacity-5 group-hover:opacity-10 transition-opacity duration-500 transform translate-x-4 -translate-y-4">
                                    <Shield className="w-32 h-32 text-slate-800" />
                                </div>
                                <div className="relative z-10">
                                    <h4 className="text-slate-800 font-black text-lg mb-2">Why choose {plan.insurer}?</h4>
                                    <p className="text-slate-500 text-xs font-medium leading-relaxed max-w-sm">
                                        {plan.insurer} is among India's top life insurers with high Claim Settlement Ratio and digital-first support architecture.
                                    </p>
                                    <div className="mt-6 flex items-center gap-6">
                                        <div className="flex flex-col">
                                            <span className="text-[#2076C7] text-2xl font-black leading-none">98.5%+</span>
                                            <span className="text-slate-400 text-[9px] font-bold uppercase tracking-widest mt-1.5">Claim Settlement</span>
                                        </div>
                                        <div className="w-[1px] h-10 bg-slate-200" />
                                        <div className="flex flex-col">
                                            <span className="text-[#1CADA3] text-2xl font-black leading-none">24x7</span>
                                            <span className="text-slate-400 text-[9px] font-bold uppercase tracking-widest mt-1.5">Assistance</span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Footer Action */}
                        <div className="p-8 border-t border-slate-100 bg-slate-50/50 flex flex-col sm:flex-row gap-4">
                            <button
                                onClick={onClose}
                                className="font-sans flex-1 py-4 px-6 rounded-2xl font-black text-[11px] uppercase tracking-[0.2em] text-slate-500 bg-white border border-slate-200 hover:bg-slate-50 transition-all flex items-center justify-center gap-2"
                            >
                                Close Details
                            </button>
                            <button
                                onClick={() => {
                                    onClose();
                                    setTimeout(() => onGetQuote(plan), 300);
                                }}
                                className="font-sans flex-[1.5] py-4 px-8 rounded-2xl font-black text-[11px] uppercase tracking-[0.2em] text-white shadow-xl flex items-center justify-center gap-2 hover:opacity-90 transition-all active:scale-95"
                                style={{ backgroundColor: plan.accentColor, boxShadow: `0 10px 30px ${plan.accentColor}40` }}
                            >
                                Get Personalized Quote
                                <ArrowRight className="w-4 h-4" />
                            </button>
                        </div>
                    </motion.div>
                </motion.div>
            )}
        </AnimatePresence>
    );
}
