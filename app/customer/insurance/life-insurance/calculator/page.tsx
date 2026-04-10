"use client";

import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { useRouter } from "next/navigation";
import { PieChart, Pie, Cell, Tooltip, ResponsiveContainer } from "recharts";
import {
    ChevronDown,
    User,
    Wind,
    Calendar,
    Target,
    Activity
} from "lucide-react";
import LifeInsuranceHeader from "../components/LifeInsuranceHeader";


export default function CustomerTermCalculatorPage() {
    const router = useRouter();
    const [gender, setGender] = useState<"male" | "female">("male");
    const [isSmoker, setIsSmoker] = useState<boolean>(false);
    const [age, setAge] = useState<number>(30);
    const [coverage, setCoverage] = useState<number>(10000000); // 1 Crore
    const [coverTillAge, setCoverTillAge] = useState<number>(60);
    const [premium, setPremium] = useState<number>(0);

    useEffect(() => {
        const minCoverAge = Math.max(28, age + 2);
        if (coverTillAge < minCoverAge) {
            setCoverTillAge(minCoverAge);
        }
    }, [age]);

    useEffect(() => {
        let baseMonthly = 370;
        const ageEffect = Math.pow(1.052, age - 18);
        const genderEffect = gender === "male" ? 1.15 : 1.0;
        const smokerEffect = isSmoker ? 1.60 : 1.0;
        const baseCoverage = 10000000;
        let coverageEffect = 1.0;

        if (coverage > baseCoverage) {
            const excess = coverage - baseCoverage;
            coverageEffect = 1 + (excess / baseCoverage) * 0.85; 
        } else if (coverage < baseCoverage) {
            coverageEffect = coverage / baseCoverage;
        }

        const term = coverTillAge - age;
        const termEffect = 1 + (term > 50 ? 0.25 : term > 35 ? 0.15 : 0);
        const totalPremium = Math.round(baseMonthly * ageEffect * genderEffect * smokerEffect * coverageEffect * termEffect);
        
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

    const totalPremiumPaid = premium * 12 * (coverTillAge - age);
    
    const pieData = [
        { name: "Total Premium Paid", value: totalPremiumPaid, color: "#1CADA3" },
        { name: "Total Life Cover", value: coverage, color: "#2076C7" }
    ];

    return (
        <>
            <div className="py-8">


                <motion.div
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="bg-white rounded-[3rem] border border-slate-100 shadow-[0_30px_80px_rgba(32,118,199,0.08)] overflow-hidden flex flex-col lg:flex-row"
                >
                    {/* Left Side: Inputs (Identical to Public TermCalculator) */}
                    <div className="lg:w-7/12 p-8 md:p-12 space-y-10 border-r border-slate-100/50">
                        {/* Gender & Tobacco */}
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
                            <div className="space-y-4">
                                <label className="text-[11px] font-black text-slate-400 uppercase tracking-widest flex items-center gap-2">
                                    <User className="w-3.5 h-3.5" /> Gender
                                </label>
                                <div className="flex gap-6">
                                    {["male", "female"].map((g) => (
                                        <label key={g} className="flex items-center gap-3 cursor-pointer group">
                                            <div className="relative flex items-center justify-center">
                                                <input
                                                    type="radio" name="gender" checked={gender === g}
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
                            <div className="space-y-4">
                                <label className="text-[11px] font-black text-slate-400 uppercase tracking-widest flex items-center gap-2">
                                    <Wind className="w-3.5 h-3.5" /> Consume Tobacco?
                                </label>
                                <div className="flex gap-6">
                                    {[false, true].map((s) => (
                                        <label key={String(s)} className="flex items-center gap-3 cursor-pointer group">
                                            <div className="relative flex items-center justify-center">
                                                <input
                                                    type="radio" name="smoker" checked={isSmoker === s}
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

                    </div>

                    {/* Right Side: Results & Pie Chart */}
                    <div className="lg:w-5/12 bg-white relative p-8 md:p-12 flex flex-col justify-center items-center overflow-hidden">
                        {/* Decorative Grid */}
                        <div className="absolute inset-0 opacity-[0.03] pointer-events-none bg-[radial-gradient(#1CADA3_1px,transparent_1px)] [background-size:20px_20px]" />

                        <div className="text-center mb-6 relative z-10">
                            <p className="font-sans text-sm font-bold text-slate-500 mb-2">Estimated Monthly Premium starts from</p>
                            <div className="flex items-baseline justify-center gap-1">
                                <span className="text-5xl md:text-6xl font-black text-[#2076C7]">₹{formatCurrency(premium)}</span>
                                <span className="text-xl font-bold text-slate-400">/month*</span>
                            </div>
                        </div>

                        {/* Value Proposition Pie Chart */}
                        <div className="w-full max-w-sm flex flex-col items-center relative z-10">
                            <div className="w-full h-[220px] relative mb-8">
                                <ResponsiveContainer width="100%" height="100%">
                                    <PieChart>
                                        <Pie
                                            data={pieData}
                                            innerRadius={65}
                                            outerRadius={95}
                                            paddingAngle={4}
                                            dataKey="value"
                                            stroke="none"
                                            cornerRadius={8}
                                        >
                                            {pieData.map((entry, index) => (
                                                <Cell key={`cell-${index}`} fill={entry.color} style={{ filter: 'drop-shadow(0px 8px 16px rgba(0,0,0,0.12))' }} />
                                            ))}
                                        </Pie>
                                        <Tooltip
                                            formatter={(value: any) => `₹${formatCurrency(value)}`}
                                            contentStyle={{ borderRadius: '16px', border: 'none', boxShadow: '0 10px 30px rgba(0,0,0,0.15)' }}
                                            itemStyle={{ fontSize: '13px', fontWeight: 'bold' }}
                                        />
                                    </PieChart>
                                </ResponsiveContainer>
                                <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none">
                                    <span className="text-2xl font-black text-[#2076C7]">{Math.round((coverage/totalPremiumPaid))}x</span>
                                    <span className="text-[9px] font-black text-slate-400 uppercase tracking-widest mt-1">Multiplier</span>
                                </div>
                            </div>

                            {/* Legends */}
                            <div className="w-full space-y-3">
                                <div className="flex items-center justify-between p-3.5 bg-slate-50 border border-slate-100 rounded-xl hover:bg-white hover:border-slate-200 transition-all">
                                    <div className="flex items-center gap-2">
                                        <div className="w-3 h-3 rounded-full shadow-sm bg-[#1CADA3]" />
                                        <span className="text-[10px] font-bold text-slate-500 uppercase tracking-widest">Total Premiums Paid</span>
                                    </div>
                                    <span className="text-sm font-black text-slate-800">₹{formatCurrency(totalPremiumPaid)}</span>
                                </div>
                                <div className="flex items-center justify-between p-3.5 bg-slate-50 border border-slate-100 rounded-xl hover:bg-white hover:border-slate-200 transition-all">
                                    <div className="flex items-center gap-2">
                                        <div className="w-3 h-3 rounded-full shadow-sm bg-[#2076C7]" />
                                        <span className="text-[10px] font-bold text-slate-500 uppercase tracking-widest">Assured Cover</span>
                                    </div>
                                    <span className="text-sm font-black text-slate-800">₹{formatCurrency(coverage)}</span>
                                </div>
                            </div>
                        </div>

            </div>
        </motion.div>
      </div>
    </>
  );
}
