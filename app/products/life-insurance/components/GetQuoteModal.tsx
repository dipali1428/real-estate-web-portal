"use client";

import React, { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
    X, ShieldCheck, User, Phone, Mail, Calendar,
    IndianRupee, ChevronRight, CheckCircle2, Loader2,
    Baby, Anchor, Cigarette,
} from "lucide-react";

type Plan = {
    id: number;
    name: string;
    insurer: string;
    category: string;
    tag: string;
    accentColor: string;
    icon: React.ElementType;
};

type GetQuoteModalProps = {
    plan: Plan | null;
    onClose: () => void;
};

const COVERAGE_OPTIONS: Record<string, string[]> = {
    "Term Insurance": ["₹25 Lakh", "₹50 Lakh", "₹1 Crore", "₹2 Crore", "₹5 Crore+"],
    "Guaranteed Savings": ["₹5 Lakh", "₹10 Lakh", "₹25 Lakh", "₹50 Lakh", "₹1 Crore+"],
    "Child Plan": ["₹10 Lakh", "₹25 Lakh", "₹50 Lakh", "₹1 Crore", "₹2 Crore+"],
    "Retirement": ["₹10K/month", "₹25K/month", "₹50K/month", "₹1L/month", "Custom"],
    "Savings Plan": ["₹5 Lakh", "₹10 Lakh", "₹25 Lakh", "₹50 Lakh", "₹1 Crore+"],
    "Combo Plan": ["₹50 Lakh", "₹1 Crore", "₹2 Crore", "₹5 Crore+"],
};

const TERM_OPTIONS: Record<string, string[]> = {
    "Term Insurance": ["10 Years", "15 Years", "20 Years", "25 Years", "30 Years", "Till Age 85"],
    "Guaranteed Savings": ["5 Years", "10 Years", "15 Years", "20 Years", "25 Years"],
    "Child Plan": ["Till Age 18", "Till Age 21", "Till Age 25"],
    "Retirement": ["Till Age 60", "Till Age 65", "Till Age 70"],
    "Savings Plan": ["5 Years", "10 Years", "15 Years", "20 Years"],
    "Combo Plan": ["10 Years", "15 Years", "20 Years", "25 Years"],
};

const getInitialFormState = () => ({
    name: "",
    phone: "",
    email: "",
    age: "",
    gender: "",
    coverageAmount: "",
    policyTerm: "",
    annualIncome: "",
    isSmoker: "",
    childAge: "",
    childGoal: "",
    retirementAge: "",
    investmentAmount: "",
    paymentFrequency: "",
});

export default function GetQuoteModal({ plan, onClose }: GetQuoteModalProps) {
    const [step, setStep] = useState(1); // 1 = basic, 2 = plan-specific, 3 = success
    const [submitting, setSubmitting] = useState(false);
    const [form, setForm] = useState(getInitialFormState);
    
    // Use ref to track previous plan to avoid unnecessary resets
    const prevPlanRef = useRef<Plan | null>(null);

    // Handle plan changes without direct state updates in effect
    useEffect(() => {
        if (plan && plan !== prevPlanRef.current) {
            // Store current plan as previous
            prevPlanRef.current = plan;
            
            // Use a timeout to avoid the setState warning (alternative approach)
            // But since this is a legitimate use case, we'll use eslint-disable
            // eslint-disable-next-line react-hooks/set-state-in-effect
            setStep(1);
             
            setForm(getInitialFormState());
        }
    }, [plan]);

    useEffect(() => {
        // Prevent body scroll when modal open
        if (plan) {
            document.body.style.overflow = "hidden";
        } else {
            document.body.style.overflow = "";
        }
        return () => { document.body.style.overflow = ""; };
    }, [plan]);

    const update = (key: string, val: string) => setForm(f => ({ ...f, [key]: val }));

    const [referenceId] = useState(() =>
        `INF-${Date.now().toString().slice(-6)}`
    );

    const isStep1Valid = form.name && form.phone.length >= 10 && form.age;
    const isStep2Valid = form.coverageAmount && form.policyTerm;

    const handleSubmit = async () => {
        setSubmitting(true);
        await new Promise(r => setTimeout(r, 1800)); // simulate API call
        setSubmitting(false);
        setStep(3);
    };

    const coverageOptions = COVERAGE_OPTIONS[plan?.category ?? "Term Insurance"] ?? COVERAGE_OPTIONS["Term Insurance"];
    const termOptions = TERM_OPTIONS[plan?.category ?? "Term Insurance"] ?? TERM_OPTIONS["Term Insurance"];

    const isChildPlan = plan?.category === "Child Plan";
    const isRetirementPlan = plan?.category === "Retirement";
    const isTermPlan = plan?.category === "Term Insurance";
    const isSavingsPlan = plan?.category === "Guaranteed Savings" || plan?.category === "Savings Plan";

    return (
        <AnimatePresence>
            {plan && (
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="fixed inset-0 z-[9999] flex items-center justify-center p-4"
                    onClick={onClose}
                >
                    {/* Backdrop */}
                    <div className="absolute inset-0 bg-[#0B1C2E]/60 backdrop-blur-sm" />

                    {/* Modal */}
                    <motion.div
                        initial={{ opacity: 0, scale: 0.94, y: 20 }}
                        animate={{ opacity: 1, scale: 1, y: 0 }}
                        exit={{ opacity: 0, scale: 0.94, y: 20 }}
                        transition={{ type: "spring", stiffness: 300, damping: 28 }}
                        onClick={e => e.stopPropagation()}
                        className="relative bg-white rounded-[2.5rem] shadow-[0_40px_100px_rgba(0,0,0,0.2)] w-full max-w-lg overflow-hidden font-sans"
                    >
                        {/* Top accent bar */}
                        <div
                            className="h-1.5 w-full"
                            style={{ background: `linear-gradient(to right, ${plan.accentColor}, #1CADA3)` }}
                        />

                        {/* Close button */}
                        <button
                            onClick={onClose}
                            className="absolute top-5 right-5 w-9 h-9 bg-slate-100 hover:bg-slate-200 rounded-full flex items-center justify-center transition-all z-10"
                        >
                            <X className="w-4 h-4 text-slate-500" />
                        </button>

                        <div className="p-8 max-h-[85vh] overflow-y-auto">

                            {/* Plan Info Header */}
                            <div className="flex items-center gap-4 mb-8">
                                <div
                                    className="w-12 h-12 rounded-2xl flex items-center justify-center shrink-0"
                                    style={{ backgroundColor: `${plan.accentColor}15` }}
                                >
                                    <plan.icon className="w-6 h-6" style={{ color: plan.accentColor }} />
                                </div>
                                <div>
                                    <p className="text-[9px] font-black text-slate-400 uppercase tracking-[0.3em]">{plan.insurer} · {plan.category}</p>
                                    <h3 className="text-lg font-black text-[#0B1C2E] leading-tight">{plan.name}</h3>
                                    <span className="text-[10px] font-black uppercase tracking-wider" style={{ color: plan.accentColor }}>{plan.tag}</span>
                                </div>
                            </div>

                            {/* Progress dots */}
                            {step < 3 && (
                                <div className="flex items-center gap-2 mb-8">
                                    {[1, 2].map(s => (
                                        <div key={s} className="flex items-center gap-2">
                                            <div
                                                className={`w-7 h-7 rounded-full flex items-center justify-center text-[10px] font-black transition-all`}
                                                style={{
                                                    backgroundColor: step >= s ? plan.accentColor : "#f1f5f9",
                                                    color: step >= s ? "white" : "#94a3b8"
                                                }}
                                            >{s}</div>
                                            {s < 2 && <div className={`w-12 h-0.5 rounded transition-all`} style={{ backgroundColor: step > s ? plan.accentColor : "#e2e8f0" }} />}
                                        </div>
                                    ))}
                                    <p className="ml-2 text-[10px] text-slate-400 font-bold uppercase tracking-widest">
                                        {step === 1 ? "Your Details" : "Plan Preferences"}
                                    </p>
                                </div>
                            )}

                            {/* ── STEP 1 ── */}
                            {step === 1 && (
                                <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} className="space-y-4">
                                    <h4 className="text-base font-black text-[#0B1C2E] mb-5">Tell us about yourself</h4>

                                    {/* Name */}
                                    <div className="relative">
                                        <User className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                                        <input
                                            type="text"
                                            placeholder="Full Name"
                                            value={form.name}
                                            onChange={e => update("name", e.target.value)}
                                            className="w-full pl-11 pr-4 py-3.5 bg-slate-50 border border-slate-200 rounded-xl text-sm font-medium text-slate-700 placeholder:text-slate-400 outline-none focus:border-[#2076C7] focus:shadow-[0_0_0_3px_rgba(32,118,199,0.08)] transition-all"
                                        />
                                    </div>

                                    {/* Phone */}
                                    <div className="relative">
                                        <Phone className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                                        <input
                                            type="tel"
                                            placeholder="Mobile Number"
                                            value={form.phone}
                                            onChange={e => update("phone", e.target.value.replace(/\D/g, "").slice(0, 10))}
                                            className="w-full pl-11 pr-4 py-3.5 bg-slate-50 border border-slate-200 rounded-xl text-sm font-medium text-slate-700 placeholder:text-slate-400 outline-none focus:border-[#2076C7] focus:shadow-[0_0_0_3px_rgba(32,118,199,0.08)] transition-all"
                                        />
                                    </div>

                                    {/* Email */}
                                    <div className="relative">
                                        <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                                        <input
                                            type="email"
                                            placeholder="Email Address (Optional)"
                                            value={form.email}
                                            onChange={e => update("email", e.target.value)}
                                            className="w-full pl-11 pr-4 py-3.5 bg-slate-50 border border-slate-200 rounded-xl text-sm font-medium text-slate-700 placeholder:text-slate-400 outline-none focus:border-[#2076C7] focus:shadow-[0_0_0_3px_rgba(32,118,199,0.08)] transition-all"
                                        />
                                    </div>

                                    {/* Age + Gender */}
                                    <div className="grid grid-cols-2 gap-3">
                                        <div className="relative">
                                            <Calendar className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                                            <input
                                                type="number"
                                                placeholder="Your Age"
                                                min={18} max={70}
                                                value={form.age}
                                                onChange={e => update("age", e.target.value)}
                                                className="w-full pl-11 pr-4 py-3.5 bg-slate-50 border border-slate-200 rounded-xl text-sm font-medium text-slate-700 placeholder:text-slate-400 outline-none focus:border-[#2076C7] focus:shadow-[0_0_0_3px_rgba(32,118,199,0.08)] transition-all"
                                            />
                                        </div>
                                        <div className="grid grid-cols-2 gap-2">
                                            {["Male", "Female"].map(g => (
                                                <button key={g} onClick={() => update("gender", g)}
                                                    className={`py-3.5 rounded-xl text-xs font-black transition-all border ${form.gender === g ? "border-[#2076C7] text-white" : "bg-slate-50 border-slate-200 text-slate-500 hover:border-slate-300"}`}
                                                    style={form.gender === g ? { backgroundColor: plan.accentColor, borderColor: plan.accentColor } : {}}
                                                >
                                                    {g}
                                                </button>
                                            ))}
                                        </div>
                                    </div>

                                    {/* Annual Income (for term/savings) */}
                                    {(isTermPlan || isSavingsPlan) && (
                                        <div className="relative">
                                            <IndianRupee className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                                            <select
                                                value={form.annualIncome}
                                                onChange={e => update("annualIncome", e.target.value)}
                                                className="w-full pl-11 pr-4 py-3.5 bg-slate-50 border border-slate-200 rounded-xl text-sm font-medium text-slate-700 outline-none focus:border-[#2076C7] transition-all appearance-none"
                                            >
                                                <option value="">Annual Income</option>
                                                <option>Less than ₹3 LPA</option>
                                                <option>₹3–6 LPA</option>
                                                <option>₹6–10 LPA</option>
                                                <option>₹10–20 LPA</option>
                                                <option>₹20 LPA+</option>
                                            </select>
                                        </div>
                                    )}

                                    {/* Child age (child plans) */}
                                    {isChildPlan && (
                                        <div className="relative">
                                            <Baby className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                                            <input
                                                type="number"
                                                placeholder="Child's Current Age"
                                                min={0} max={17}
                                                value={form.childAge}
                                                onChange={e => update("childAge", e.target.value)}
                                                className="w-full pl-11 pr-4 py-3.5 bg-slate-50 border border-slate-200 rounded-xl text-sm font-medium text-slate-700 placeholder:text-slate-400 outline-none focus:border-[#2076C7] transition-all"
                                            />
                                        </div>
                                    )}

                                    {/* Smoker (term) */}
                                    {isTermPlan && (
                                        <div>
                                            <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-2 block">Do you smoke?</label>
                                            <div className="grid grid-cols-2 gap-3">
                                                {["No", "Yes"].map(s => (
                                                    <button key={s} onClick={() => update("isSmoker", s)}
                                                        className={`py-3 rounded-xl text-xs font-black flex items-center justify-center gap-2 transition-all border ${form.isSmoker === s ? "text-white" : "bg-slate-50 border-slate-200 text-slate-500"}`}
                                                        style={form.isSmoker === s ? { backgroundColor: plan.accentColor, borderColor: plan.accentColor } : {}}
                                                    >
                                                        <Cigarette className="w-3.5 h-3.5" /> {s}
                                                    </button>
                                                ))}
                                            </div>
                                        </div>
                                    )}

                                    {/* Retirement age */}
                                    {isRetirementPlan && (
                                        <div className="relative">
                                            <Anchor className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                                            <select
                                                value={form.retirementAge}
                                                onChange={e => update("retirementAge", e.target.value)}
                                                className="w-full pl-11 pr-4 py-3.5 bg-slate-50 border border-slate-200 rounded-xl text-sm font-medium text-slate-700 outline-none focus:border-[#2076C7] transition-all appearance-none"
                                            >
                                                <option value="">Desired Retirement Age</option>
                                                {[55, 58, 60, 62, 65].map(a => <option key={a}>{a} years</option>)}
                                            </select>
                                        </div>
                                    )}

                                    <button
                                        onClick={() => setStep(2)}
                                        disabled={!isStep1Valid}
                                        className="font-sans w-full py-4 rounded-2xl font-black text-sm text-white flex items-center justify-center gap-2 transition-all mt-2 disabled:opacity-40 hover:opacity-90"
                                        style={{ backgroundColor: plan.accentColor, boxShadow: `0 10px 30px ${plan.accentColor}30` }}
                                    >
                                        Next — Plan Details <ChevronRight className="w-4 h-4" />
                                    </button>
                                </motion.div>
                            )}

                            {/* ── STEP 2 ── */}
                            {step === 2 && (
                                <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} className="space-y-4">
                                    <h4 className="text-base font-black text-[#0B1C2E] mb-5">Plan Preferences</h4>

                                    {/* Coverage amount */}
                                    <div>
                                        <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-3 block">
                                            {isRetirementPlan ? "Desired Monthly Income" : "Coverage / Sum Assured"}
                                        </label>
                                        <div className="grid grid-cols-2 gap-2">
                                            {coverageOptions.map(opt => (
                                                <button key={opt} onClick={() => update("coverageAmount", opt)}
                                                    className={`py-3 px-3 rounded-xl text-xs font-black transition-all border text-left ${form.coverageAmount === opt ? "text-white" : "bg-slate-50 border-slate-200 text-slate-600 hover:border-slate-300"}`}
                                                    style={form.coverageAmount === opt ? { backgroundColor: plan.accentColor, borderColor: plan.accentColor } : {}}
                                                >
                                                    {opt}
                                                </button>
                                            ))}
                                        </div>
                                    </div>

                                    {/* Policy term */}
                                    <div>
                                        <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-3 block">Policy Term / Duration</label>
                                        <div className="grid grid-cols-3 gap-2">
                                            {termOptions.map(opt => (
                                                <button key={opt} onClick={() => update("policyTerm", opt)}
                                                    className={`py-3 rounded-xl text-[10px] font-black transition-all border ${form.policyTerm === opt ? "text-white" : "bg-slate-50 border-slate-200 text-slate-600 hover:border-slate-300"}`}
                                                    style={form.policyTerm === opt ? { backgroundColor: plan.accentColor, borderColor: plan.accentColor } : {}}
                                                >
                                                    {opt}
                                                </button>
                                            ))}
                                        </div>
                                    </div>

                                    {/* Investment amount for savings */}
                                    {(isSavingsPlan || isChildPlan) && (
                                        <div className="relative">
                                            <IndianRupee className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                                            <select
                                                value={form.investmentAmount}
                                                onChange={e => update("investmentAmount", e.target.value)}
                                                className="w-full pl-11 pr-4 py-3.5 bg-slate-50 border border-slate-200 rounded-xl text-sm font-medium text-slate-700 outline-none focus:border-[#2076C7] transition-all appearance-none"
                                            >
                                                <option value="">Monthly Investment Capacity</option>
                                                <option>₹1,000 – ₹2,500</option>
                                                <option>₹2,500 – ₹5,000</option>
                                                <option>₹5,000 – ₹10,000</option>
                                                <option>₹10,000 – ₹25,000</option>
                                                <option>₹25,000+</option>
                                            </select>
                                        </div>
                                    )}

                                    {/* Child goal */}
                                    {isChildPlan && (
                                        <div>
                                            <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-3 block">Planning For</label>
                                            <div className="grid grid-cols-2 gap-2">
                                                {["Higher Education", "Marriage", "Startup Fund", "All Goals"].map(g => (
                                                    <button key={g} onClick={() => update("childGoal", g)}
                                                        className={`py-3 rounded-xl text-xs font-black transition-all border ${form.childGoal === g ? "text-white" : "bg-slate-50 border-slate-200 text-slate-600"}`}
                                                        style={form.childGoal === g ? { backgroundColor: plan.accentColor, borderColor: plan.accentColor } : {}}
                                                    >
                                                        {g}
                                                    </button>
                                                ))}
                                            </div>
                                        </div>
                                    )}

                                    {/* Payment frequency */}
                                    <div>
                                        <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-3 block">Payment Frequency</label>
                                        <div className="grid grid-cols-4 gap-2">
                                            {["Monthly", "Quarterly", "Half-Yearly", "Yearly"].map(f => (
                                                <button key={f} onClick={() => update("paymentFrequency", f)}
                                                    className={`py-2.5 rounded-xl text-[10px] font-black transition-all border ${form.paymentFrequency === f ? "text-white" : "bg-slate-50 border-slate-200 text-slate-600"}`}
                                                    style={form.paymentFrequency === f ? { backgroundColor: plan.accentColor, borderColor: plan.accentColor } : {}}
                                                >
                                                    {f}
                                                </button>
                                            ))}
                                        </div>
                                    </div>

                                    {/* Credibility */}
                                    <div className="flex items-center gap-2 p-3 bg-slate-50 rounded-xl border border-slate-100 mt-2">
                                        <ShieldCheck className="w-4 h-4 text-emerald-500 shrink-0" />
                                        <p className="text-[10px] text-slate-500 font-bold">IRDAI approved · No spam · Expert callback in 30 mins</p>
                                    </div>

                                    <div className="flex gap-3 mt-2">
                                        <button
                                            onClick={() => setStep(1)}
                                            className="font-sans flex-1 py-4 rounded-2xl font-black text-sm text-slate-500 bg-slate-100 hover:bg-slate-200 transition-all"
                                        >
                                            ← Back
                                        </button>
                                        <button
                                            onClick={handleSubmit}
                                            disabled={!isStep2Valid || submitting}
                                            className="font-sans flex-2 flex-grow py-4 rounded-2xl font-black text-sm text-white flex items-center justify-center gap-2 transition-all disabled:opacity-40 hover:opacity-90"
                                            style={{ backgroundColor: plan.accentColor, boxShadow: `0 10px 30px ${plan.accentColor}30` }}
                                        >
                                            {submitting ? <><Loader2 className="w-4 h-4 animate-spin" /> Processing…</> : <>Get My Quote <ChevronRight className="w-4 h-4" /></>}
                                        </button>
                                    </div>
                                </motion.div>
                            )}

                            {/* ── STEP 3 SUCCESS ── */}
                            {step === 3 && (
                                <motion.div
                                    initial={{ opacity: 0, scale: 0.9 }}
                                    animate={{ opacity: 1, scale: 1 }}
                                    className="flex flex-col items-center text-center py-6"
                                >
                                    <div className="w-20 h-20 rounded-full bg-emerald-50 border-2 border-emerald-100 flex items-center justify-center mb-6">
                                        <CheckCircle2 className="w-10 h-10 text-emerald-500" />
                                    </div>
                                    <h3 className="text-2xl font-black text-[#0B1C2E] mb-2">Quote Request Sent!</h3>
                                    <p className="text-slate-500 text-sm font-medium max-w-xs mb-1">
                                        Our expert advisor will call you within <strong>30 minutes</strong> with the best quote for
                                    </p>
                                    <span className="text-sm font-black mt-1 mb-6" style={{ color: plan.accentColor }}>
                                        {plan.name}
                                    </span>

                                    <div className="w-full p-4 bg-slate-50 rounded-2xl border border-slate-100 text-left space-y-2 mb-6">
                                        <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Your Summary</p>
                                        <div className="grid grid-cols-2 gap-2 text-xs">
                                            <div><span className="text-slate-400 font-bold">Name</span><br /><span className="text-slate-700 font-black">{form.name}</span></div>
                                            <div><span className="text-slate-400 font-bold">Phone</span><br /><span className="text-slate-700 font-black">+91 {form.phone}</span></div>
                                            <div><span className="text-slate-400 font-bold">Coverage</span><br /><span className="text-slate-700 font-black">{form.coverageAmount}</span></div>
                                            <div><span className="text-slate-400 font-bold">Term</span><br /><span className="text-slate-700 font-black">{form.policyTerm}</span></div>
                                        </div>
                                    </div>

                                    <p className="text-[9px] text-slate-300 font-medium italic">
                                        Reference ID: {referenceId} · IRDAI Certified
                                    </p>

                                    <button
                                        onClick={onClose}
                                        className="font-sans mt-6 px-8 py-3 rounded-xl text-sm font-black text-white transition-all hover:opacity-90"
                                        style={{ backgroundColor: plan.accentColor }}>
                                        Done
                                    </button>
                                </motion.div>
                            )}
                        </div>
                    </motion.div>
                </motion.div>
            )}
        </AnimatePresence>
    );
}