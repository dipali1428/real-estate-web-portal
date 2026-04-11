"use client";

import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import {
    Calculator,
    ChevronDown,
    ShieldCheck,
    Zap,
    ArrowRight,
    User,
    Wind,
    Calendar,
    Target,
    Activity
} from "lucide-react";

export default function TermCalculator() {
    const [gender, setGender] = useState<"male" | "female">("male");
    const [isSmoker, setIsSmoker] = useState<boolean>(false);
    const [age, setAge] = useState<number>(18);
    const [coverage, setCoverage] = useState<number>(10000000); // 1 Crore
    const [coverTillAge, setCoverTillAge] = useState<number>(28);
    const [premium, setPremium] = useState<number>(0);

    useEffect(() => {
        // Ensure coverTillAge is always at least age + 2 or 28
        const minCoverAge = Math.max(28, age + 2);
        if (coverTillAge < minCoverAge) {
            setCoverTillAge(minCoverAge);
        }
    }, [age]);

    // Higher accuracy calculation logic
    useEffect(() => {
        // Base monthly for 18yr female, non-smoker, 1Cr
        // Market baseline is roughly ₹350-400 for these criteria
        const baseMonthly = 370;

        // 1. Age Factor: Real-world premiums grow exponentially, not linearly.
        // Approx 5.2% compounded growth per year of age.
        const ageEffect = Math.pow(1.052, age - 18);

        // 2. Gender factor: Females get a discount because of higher longevity.
        const genderEffect = gender === "male" ? 1.15 : 1.0;

        // 3. Smoker factor: Massive loading for tobacco users (Market standard ~60%)
        const smokerEffect = isSmoker ? 1.60 : 1.0;

        // 4. Coverage Factor with "Volume Discount":
        // 10Cr cover isn't 10x price of 1Cr because fixed costs remain same.
        // We use a weighted factor (base 1Cr) with a discount for high values.
        const baseCoverage = 10000000;
        let coverageEffect = 1.0;

        if (coverage > baseCoverage) {
            // For cover > 1Cr, we apply a sliding scale discount
            const excess = coverage - baseCoverage;
            coverageEffect = 1 + (excess / baseCoverage) * 0.85; // 15% discount on the additional cover
        } else if (coverage < baseCoverage) {
            coverageEffect = coverage / baseCoverage;
        }

        // 5. Term factor: Longer terms increase the risk pool duration
        const term = coverTillAge - age;
        const termEffect = 1 + (term > 50 ? 0.25 : term > 35 ? 0.15 : 0);

        const totalPremium = Math.round(baseMonthly * ageEffect * genderEffect * smokerEffect * coverageEffect * termEffect);

        // Final sanity check: Minimum premium in market is usually around ₹350
        setPremium(Math.max(350, totalPremium));
    }, [gender, isSmoker, age, coverage, coverTillAge]);

    const formatCurrency = (num: number) => {
        return new Intl.NumberFormat('en-IN', {
            maximumFractionDigits: 0
        }).format(num);
    };

    const coverageOptions = (() => {
        const options = [];
        for (let val = 2000000; val <= 200000000; val += 500000) {
            let label = "";
            if (val >= 10000000) {
                label = `${val / 10000000} Cr`;
            } else {
                label = `${val / 100000} Lacs`;
            }
            options.push({ label, value: val });
        }
        return options;
    })();

    return (
        <section className="py-16 md:py-24 bg-white relative overflow-hidden font-sans" id="calculator">
            {/* Background Accents */}
            <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-[#2076C7]/5 rounded-full blur-[120px] pointer-events-none translate-x-1/2 -translate-y-1/2" />
            <div className="absolute bottom-0 left-0 w-[600px] h-[600px] bg-[#1CADA3]/5 rounded-full blur-[120px] pointer-events-none -translate-x-1/2 translate-y-1/2" />

            <div className="container-custom relative z-10 px-4 md:px-6">
                <div className="text-center max-w-3xl mx-auto mb-16">
                    <motion.div
                        initial={{ opacity: 0, y: 10 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="flex items-center justify-center gap-3 mb-6">
                        <div className="w-10 h-10 bg-blue-50 rounded-xl flex items-center justify-center text-[#2076C7]">
                            <Calculator className="w-5 h-5" />
                        </div>
                        <span className="text-[#1CADA3] font-black uppercase text-[10px] md:text-sm tracking-[0.4em]">Smart Premium Estimator</span>
                    </motion.div>
                    <motion.h2
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="text-3xl lg:text-5xl font-bold bg-linear-to-r from-[#2076C7] to-[#1CADA3] bg-clip-text text-transparent mb-6">
                        Term Insurance Calculator
                    </motion.h2>
                    <p className="text-gray-500 text-xl font-light leading-relaxed">
                        Calculate the exact premium for your family&apos;s protection. Our tool analyzes age, lifestyle, and coverage needs to give you the most accurate market rates.
                    </p>
                </div>

                <div className="max-w-6xl mx-auto">
                    <motion.div
                        initial={{ opacity: 0, scale: 0.95 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        viewport={{ once: true }}
                        className="bg-white rounded-[3rem] border border-slate-100 border-b-[6px] border-b-slate-200/50 shadow-[0_30px_80px_rgba(32,118,199,0.08)] hover:-translate-y-2 hover:shadow-[0_40px_100px_rgba(32,118,199,0.12)] transition-all duration-500 overflow-hidden flex flex-col lg:flex-row">
                        {/* Left Side: Inputs */}
                        <div className="lg:w-7/12 p-8 md:p-12 space-y-10">
                            {/* Special Offer Badge */}
                            <div className="flex">
                                <span className="px-4 py-1.5 bg-linear-to-r from-[#1CADA3] to-[#2076C7] text-white text-[10px] font-black uppercase tracking-widest rounded-full shadow-lg shadow-teal-100">
                                    Now 18% Cheaper (NO GST Benefit)
                                </span>
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
                                {/* Gender Selection */}
                                <div className="space-y-4">
                                    <label className="text-[11px] font-black text-slate-400 uppercase tracking-widest flex items-center gap-2">
                                        <User className="w-3.5 h-3.5" /> Gender
                                    </label>
                                    <div className="flex gap-6">
                                        {["male", "female"].map((g) => (
                                            <label
                                                key={g}
                                                className="flex items-center gap-3 cursor-pointer group"
                                            >
                                                <div className="relative flex items-center justify-center">
                                                    <input
                                                        type="radio"
                                                        name="gender"
                                                        checked={gender === g}
                                                        onChange={() => setGender(g as any)}
                                                        className="peer appearance-none w-5 h-5 rounded-full border-2 border-slate-200 checked:border-[#2076C7] transition-all cursor-pointer"
                                                    />
                                                    <div className="absolute w-2.5 h-2.5 rounded-full bg-[#2076C7] scale-0 peer-checked:scale-100 transition-transform pointer-events-none" />
                                                </div>
                                                <span className={`font-sans text-sm font-bold capitalize transition-colors ${gender === g ? "text-[#2076C7]" : "text-slate-500 group-hover:text-slate-700"}`}>
                                                    {g}
                                                </span>
                                            </label>
                                        ))}
                                    </div>
                                </div>

                                {/* Tobacco Selection */}
                                <div className="space-y-4">
                                    <label className="text-[11px] font-black text-slate-400 uppercase tracking-widest flex items-center gap-2">
                                        <Wind className="w-3.5 h-3.5" /> Consume Tobacco?
                                    </label>
                                    <div className="flex gap-6">
                                        {[false, true].map((s) => (
                                            <label
                                                key={String(s)}
                                                className="flex items-center gap-3 cursor-pointer group"
                                            >
                                                <div className="relative flex items-center justify-center">
                                                    <input
                                                        type="radio"
                                                        name="smoker"
                                                        checked={isSmoker === s}
                                                        onChange={() => setIsSmoker(s)}
                                                        className="peer appearance-none w-5 h-5 rounded-full border-2 border-slate-200 checked:border-[#2076C7] transition-all cursor-pointer"
                                                    />
                                                    <div className="absolute w-2.5 h-2.5 rounded-full bg-[#2076C7] scale-0 peer-checked:scale-100 transition-transform pointer-events-none" />
                                                </div>
                                                <span className={`font-sans text-sm font-bold capitalize transition-colors ${isSmoker === s ? "text-[#2076C7]" : "text-slate-500 group-hover:text-slate-700"}`}>
                                                    {s ? "Yes" : "No"}
                                                </span>
                                            </label>
                                        ))}
                                    </div>
                                </div>
                            </div>

                            {/* Dropdowns */}
                            <div className="space-y-8">
                                {/* Age */}
                                <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 p-6 bg-slate-50/50 rounded-[2rem] border border-slate-100">
                                    <div className="flex items-center gap-4">
                                        <div className="w-10 h-10 bg-white rounded-xl shadow-sm flex items-center justify-center text-[#2076C7]">
                                            <Calendar className="w-5 h-5" />
                                        </div>
                                        <div>
                                            <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Current Age</p>
                                            <p className="text-sm font-bold text-[#2076C7]">What is your age?</p>
                                        </div>
                                    </div>
                                    <div className="relative min-w-[140px]">
                                        <select
                                            value={age}
                                            onChange={(e) => setAge(parseInt(e.target.value))}
                                            className="w-full font-sans bg-white border border-slate-200 rounded-xl px-4 py-3 text-sm font-bold text-slate-700 appearance-none focus:outline-none focus:border-[#2076C7] transition-all cursor-pointer"
                                        >
                                            {[...Array(48)].map((_, i) => (
                                                <option key={i} value={i + 18}>{i + 18} Years</option>
                                            ))}
                                        </select>
                                        <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400 pointer-events-none" />
                                    </div>
                                </div>

                                {/* Life Cover */}
                                <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 p-6 bg-slate-50/50 rounded-[2rem] border border-slate-100">
                                    <div className="flex items-center gap-4">
                                        <div className="w-10 h-10 bg-white rounded-xl shadow-sm flex items-center justify-center text-[#1CADA3]">
                                            <Target className="w-5 h-5" />
                                        </div>
                                        <div>
                                            <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Sum Assured</p>
                                            <p className="text-sm font-bold text-[#2076C7]">Life Cover Required</p>
                                        </div>
                                    </div>
                                    <div className="relative min-w-[140px]">
                                        <select
                                            value={coverage}
                                            onChange={(e) => setCoverage(parseInt(e.target.value))}
                                            className="w-full font-sans bg-white border border-slate-200 rounded-xl px-4 py-3 text-sm font-bold text-slate-700 appearance-none focus:outline-none focus:border-[#2076C7] transition-all cursor-pointer"
                                        >
                                            {coverageOptions.map((opt) => (
                                                <option key={opt.value} value={opt.value}>{opt.label}</option>
                                            ))}
                                        </select>
                                        <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400 pointer-events-none" />
                                    </div>
                                </div>

                                {/* Cover Till Age */}
                                <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 p-6 bg-slate-50/50 rounded-[2rem] border border-slate-100">
                                    <div className="flex items-center gap-4">
                                        <div className="w-10 h-10 bg-white rounded-xl shadow-sm flex items-center justify-center text-[#2076C7]">
                                            <Activity className="w-5 h-5" />
                                        </div>
                                        <div>
                                            <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Policy Term</p>
                                            <p className="text-sm font-bold text-[#2076C7]">Cover till age?</p>
                                        </div>
                                    </div>
                                    <div className="relative min-w-[140px]">
                                        <select
                                            value={coverTillAge}
                                            onChange={(e) => setCoverTillAge(parseInt(e.target.value))}
                                            className="w-full font-sans bg-white border border-slate-200 rounded-xl px-4 py-3 text-sm font-bold text-slate-700 appearance-none focus:outline-none focus:border-[#2076C7] transition-all cursor-pointer"
                                        >
                                            {(() => {
                                                const min = Math.max(28, age + 2);
                                                const options = [];
                                                for (let i = min; i <= 100; i++) {
                                                    options.push(i);
                                                }
                                                return options.map(val => (
                                                    <option key={val} value={val}>{val} Years</option>
                                                ));
                                            })()}
                                        </select>
                                        <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400 pointer-events-none" />
                                    </div>
                                </div>
                            </div>

                            <p className="text-[10px] text-slate-400 font-medium italic">
                                *Price is calculated for salaried individuals, annual income 10 Lacs & education is graduate and above.
                            </p>
                        </div>

                        {/* Right Side: Results */}
                        <div className="lg:w-5/12 bg-emerald-50/50 p-8 md:p-12 flex flex-col items-center justify-center text-center relative overflow-hidden">
                            {/* Decorative Grid */}
                            <div className="absolute inset-0 opacity-[0.03] pointer-events-none bg-[radial-gradient(#1CADA3_1px,transparent_1px)] [background-size:20px_20px]" />

                            <motion.div
                                key={premium}
                                initial={{ opacity: 0, scale: 0.9, y: 10 }}
                                animate={{ opacity: 1, scale: 1, y: 0 }}
                                className="relative z-10 space-y-8"
                            >
                                {/* 3D-ish Illustration Container */}
                                <div className="relative w-32 h-32 mx-auto mb-10">
                                    <div className="absolute inset-0 bg-emerald-200 rounded-3xl blur-2xl opacity-40 animate-pulse" />
                                    <div className="relative w-full h-full bg-white rounded-[2rem] shadow-xl flex items-center justify-center border border-emerald-100/50">
                                        <div className="relative">
                                            <Zap className="w-12 h-12 text-[#1CADA3] fill-[#1CADA3]/10" />
                                            <motion.div
                                                animate={{
                                                    scale: [1, 1.2, 1],
                                                    opacity: [0.5, 0.8, 0.5]
                                                }}
                                                transition={{ duration: 2, repeat: Infinity }}
                                                className="absolute -top-1 -right-1 w-4 h-4 bg-[#2076C7] rounded-full border-2 border-white"
                                            />
                                        </div>
                                    </div>
                                </div>

                                <div>
                                    <p className="font-sans text-sm font-bold text-slate-500 mb-2">Your personalized monthly premium starts from</p>
                                    <div className="flex items-baseline justify-center gap-1">
                                        <span className="text-5xl md:text-6xl font-black text-[#2076C7]">₹{formatCurrency(premium)}</span>
                                        <span className="text-xl font-bold text-slate-400">/month*</span>
                                    </div>
                                </div>

                                <div className="space-y-4">
                                    <button
                                        suppressHydrationWarning
                                        onClick={() => {
                                            document.getElementById('recommended-plans')?.scrollIntoView({ behavior: 'smooth' });
                                        }}
                                        className="w-full py-4 md:py-5 bg-linear-to-r from-[#2076C7] to-[#1CADA3] text-white rounded-2xl font-black text-xs md:text-sm uppercase tracking-[0.2em] shadow-xl shadow-blue-500/20 hover:scale-[1.02] active:scale-95 transition-all flex items-center justify-center gap-2 md:gap-3"
                                    >
                                        Check Your Premium <ArrowRight className="w-4 h-4 md:w-5 md:h-5" />
                                    </button>
                                    <p className="text-[10px] text-slate-400 font-bold uppercase tracking-widest flex items-center justify-center gap-2">
                                        <ShieldCheck className="w-4 h-4 text-emerald-500" /> Secure SSL Connection
                                    </p>
                                </div>
                            </motion.div>

                            <div className="absolute bottom-8 left-8 right-8 p-4 bg-white/40 backdrop-blur-md rounded-2xl border border-white/20">
                                <p className="text-[9px] text-slate-500 font-bold leading-relaxed">
                                    Final quote may vary based on medical results & insurer's final underwriting.
                                    Subject to T&C.
                                </p>
                            </div>
                        </div>
                    </motion.div>
                </div>
            </div>
        </section>
    );
}
