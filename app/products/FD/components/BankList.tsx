"use client";

import React, { useState, useRef, useEffect } from "react";
import { ChevronUp, CheckCircle2, X, ArrowRight, TrendingUp } from "lucide-react";
import { useModal } from "@/app/context/ModalContext";
import api from "@/app/services/api";
import { motion, AnimatePresence } from "framer-motion";

// ================= TYPES =================
interface Bank {
    id: number;
    name: string;
    category: string;
    specialRate: string;
    tenures: {
        short: { rate: string; senior: string };
        medium: { rate: string; senior: string };
        long: { rate: string; senior: string };
        mega: { rate: string; senior: string };
    };
}

interface BankCategory {
    category: string;
    banks: Bank[];
}

const BankList = () => {
    const { openLogin } = useModal();

    const [bankData, setBankData] = useState<BankCategory[]>([]);
    const [loading, setLoading] = useState(true);
    const [openCategory, setOpenCategory] = useState<string | null>(null);
    const [activeTenure, setActiveTenure] =
        useState<keyof Bank["tenures"]>("short");
    const [selectedBanks, setSelectedBanks] = useState<Bank[]>([]);
    const [isCompareModalOpen, setIsCompareModalOpen] = useState(false);

    const isFirstMount = useRef(true);
    const categoryRefs = useRef<Record<string, HTMLDivElement | null>>({});

    // ================= CATEGORY HELPER =================
    const getCategoryLabel = (raw: string) => {
        if (!raw) return "General";
        const c = raw.toLowerCase();
        if (c.includes("public") || c === "psu" || c === "psb") return "Public Sector Banks";
        if (c.includes("private")) return "Private Sector Banks";
        if (c.includes("small finance") || c === "sfb") return "Small Finance Banks";
        if (c.includes("nbfc")) return "NBFCs";
        return raw;
    };

    // ================= FETCH =================
    useEffect(() => {
        const fetchData = async () => {
            try {
                setLoading(true);
                const res = await api.get("/api/products/investments/fd/plans");

                const raw = res.data?.data || [];

                const grouped: Record<string, Bank[]> = {};

                raw.forEach((b: any) => {
                    const label = getCategoryLabel(b.category);

                    if (!grouped[label]) grouped[label] = [];

                    grouped[label].push({
                        id: b.id,
                        name: b.company_name,
                        category: label,
                        specialRate: b.special_offer || "",
                        tenures: {
                            short: {
                                rate: (b.one_year_rate || 0) + "%",
                                senior: (b.one_year_rate ? (parseFloat(b.one_year_rate) + 0.5).toFixed(2) : 0) + "%",
                            },
                            medium: {
                                rate: (b.two_year_rate || 0) + "%",
                                senior: (b.two_year_rate ? (parseFloat(b.two_year_rate) + 0.5).toFixed(2) : 0) + "%",
                            },
                            long: {
                                rate: (b.three_year_rate || 0) + "%",
                                senior: (b.three_year_rate ? (parseFloat(b.three_year_rate) + 0.5).toFixed(2) : 0) + "%",
                            },
                            mega: {
                                rate: (b.five_year_rate || 0) + "%",
                                senior: (b.five_year_rate ? (parseFloat(b.five_year_rate) + 0.5).toFixed(2) : 0) + "%",
                            },
                        },
                    });
                });

                const formatted: BankCategory[] = Object.keys(grouped).map((k) => ({
                    category: k,
                    banks: grouped[k],
                }));

                // Sort categories
                const order = ["Public Sector Banks", "Private Sector Banks", "Small Finance Banks", "NBFCs"];
                formatted.sort((a, b) => {
                    const idxA = order.indexOf(a.category);
                    const idxB = order.indexOf(b.category);
                    if (idxA !== -1 && idxB !== -1) return idxA - idxB;
                    if (idxA !== -1) return -1;
                    if (idxB !== -1) return 1;
                    return a.category.localeCompare(b.category);
                });

                setBankData(formatted);
                if (formatted.length > 0) setOpenCategory(formatted[0].category);
            } catch (e) {
                console.error(e);
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, []);

    // ================= SELECT =================
    const handleSelectBank = (bank: Bank) => {
        setSelectedBanks((prev) => {
            const exists = prev.some((b) => b.id === bank.id);

            if (exists) return prev.filter((b) => b.id !== bank.id);
            if (prev.length >= 3) return prev;

            return [...prev, bank];
        });
    };

    // ================= FD CALC =================
    const calculateFD = (
        rateStr: string,
        tenureKey: keyof Bank["tenures"]
    ) => {
        if (!rateStr || rateStr === "-")
            return { maturity: "-", earned: "-" };

        const rate = parseFloat(rateStr.replace("%", ""));
        if (isNaN(rate)) return { maturity: "-", earned: "-" };

        let years = 1;
        if (tenureKey === "short") years = 0.5;
        if (tenureKey === "medium") years = 2;
        if (tenureKey === "long") years = 4;
        if (tenureKey === "mega") years = 6;

        const principal = 100000;

        const maturity =
            principal * Math.pow(1 + rate / 100 / 4, 4 * years);

        return {
            maturity: `₹${Math.round(maturity).toLocaleString("en-IN")}`,
            earned: `₹${Math.round(maturity - principal).toLocaleString(
                "en-IN"
            )}`,
        };
    };

    // ================= SCROLL =================
    useEffect(() => {
        if (isFirstMount.current) {
            isFirstMount.current = false;
            return;
        }

        if (openCategory && categoryRefs.current[openCategory]) {
            const el = categoryRefs.current[openCategory];
            if (!el) return;

            setTimeout(() => {
                window.scrollTo({
                    top: el.offsetTop - 100,
                    behavior: "smooth",
                });
            }, 150);
        }
    }, [openCategory]);

    const toggleCategory = (cat: string) => {
        setOpenCategory(openCategory === cat ? null : cat);
    };

    const handleApply = (bankName: string) => {
        openLogin();
    };

    const tenureBuckets = [
        { id: "short", label: "1 Year" },
        { id: "medium", label: "2 Years" },
        { id: "long", label: "3 Years" },
        { id: "mega", label: "5 Years" },
    ] as const;

    // ================= LOADING =================
    if (loading) {
        return (
            <div className="w-full py-20 flex justify-center">
                Loading FD Rates...
            </div>
        );
    }

    return (
        <div className="w-full font-sans py-6">
            {/* HEADER */}
            <div className="text-center max-w-4xl mx-auto mb-12 md:mb-6">
                <motion.div
                    initial={{ opacity: 0, y: -20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="inline-flex items-center gap-2 px-4 py-2 mb-4 bg-slate-50 border border-blue-100 rounded-full text-[10px] font-bold uppercase tracking-widest text-[#2076C7] shadow-sm"
                >
                    <TrendingUp size={14} /> Compare & Save
                </motion.div>
                <motion.div
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="max-w-6xl mx-auto mb-10 text-center px-4"
                >
                    <h2 className="text-3xl md:text-4xl font-extrabold bg-linear-to-r from-[#2076C7] via-[#1CADA3] to-[#2076C7] bg-clip-text text-transparent tracking-tight">
                        Compare FD Rates Across Banks
                    </h2>
                    <div
                        className="w-20 h-1.5 rounded-full mt-4 mx-auto"
                        style={{ background: 'linear-gradient(to right, #2076C7, #1CADA3)' }}
                    />
                </motion.div>
                <motion.p
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.1 }}
                    className="text-gray-600 max-w-2xl mx-auto text-lg font-medium"
                >
                    Find the best interest rates from top-rated banks and NBFCs, tailored to your financial goals.
                </motion.p>
            </div>

            {/* TENURE BUTTONS */}
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="flex flex-wrap justify-center gap-3 md:gap-4 mb-6 px-4"
            >
                {tenureBuckets.map((t) => (
                    <button
                        key={t.id}
                        onClick={() => setActiveTenure(t.id)}
                        className={`px-8 py-3 rounded-full font-bold text-xs uppercase tracking-widest transition-all duration-300 border active:scale-95 cursor-pointer flex items-center gap-2 ${activeTenure === t.id
                            ? "text-white shadow-xl shadow-[#2076C7]/20 border-transparent"
                            : "bg-white border-slate-200 text-slate-500 hover:border-[#2076C7]/30 hover:text-[#2076C7]"
                            }`}
                        style={
                            activeTenure === t.id
                                ? {
                                    background:
                                        "linear-gradient(to right, #2076C7, #1CADA3)",
                                }
                                : {}
                        }
                    >
                        {t.label}
                    </button>
                ))}
            </motion.div>

            {/* CATEGORIES */}
            <div className="max-w-6xl mx-auto grid gap-6">
                {bankData.map((section) => (
                    <motion.div
                        key={section.category}
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        ref={(el) => {
                            categoryRefs.current[section.category] = el;
                        }}
                        className={`group rounded-2xl border border-slate-200 transition-all duration-500 overflow-hidden ${openCategory === section.category
                            ? 'bg-white shadow-[0_20px_60px_-15px_rgba(32,118,199,0.15)]'
                            : 'bg-white shadow-[0_10px_30px_-10px_rgba(0,0,0,0.05)] hover:shadow-[0_20px_50px_-12px_rgba(0,0,0,0.1)]'
                            }`}
                    >
                        {/* HEADER */}
                        <button
                            onClick={() => toggleCategory(section.category)}
                            className={`w-full px-10 py-6 flex justify-between items-center transition-all duration-500 cursor-pointer ${openCategory === section.category
                                ? 'bg-linear-to-r from-[#2076C7] to-[#1CADA3] text-white shadow-xl'
                                : 'bg-white text-slate-800 hover:bg-slate-50/50'
                                }`}
                        >
                            <h4 className={`font-bold text-xl tracking-tight ${openCategory === section.category ? 'text-white' : 'text-slate-800'}`}>
                                {section.category}
                            </h4>
                            <div className={`transition-transform duration-300 ${openCategory === section.category ? 'text-white rotate-180' : 'text-slate-400'}`}>
                                <ChevronUp size={20} />
                            </div>
                        </button>

                        {/* TABLE */}
                        <AnimatePresence>
                            {openCategory === section.category && (
                                <motion.div
                                    initial={{ opacity: 0, height: 0 }}
                                    animate={{ opacity: 1, height: "auto" }}
                                    exit={{ opacity: 0, height: 0 }}
                                    transition={{ duration: 0.5, ease: [0.04, 0.62, 0.23, 0.98] }}
                                    className="p-4 sm:p-6 overflow-x-auto bg-slate-50/30"
                                >
                                    <table className="w-full border-separate border-spacing-y-4">
                                        <thead>
                                            <tr className="text-left">
                                                <th className="py-2 px-6 text-slate-400 font-bold uppercase text-[10px] tracking-[0.2em] border-b border-slate-50">Bank Name</th>
                                                <th className="py-2 px-4 text-slate-400 font-bold uppercase text-[10px] tracking-[0.2em] border-b border-slate-50">Regular Rate</th>
                                                <th className="py-2 px-4 text-slate-400 font-bold uppercase text-[10px] tracking-[0.2em] border-b border-slate-50">Senior Citizen</th>
                                                <th className="py-2 px-4 text-slate-400 font-bold uppercase text-[10px] tracking-[0.2em] border-b border-slate-50">Special Offer</th>
                                                <th className="py-2 px-4 text-slate-500 font-bold uppercase text-[10px] tracking-[0.2em] border-b border-slate-50 text-center">Compare</th>
                                                <th className="py-2 px-6 text-slate-400 font-bold uppercase text-[10px] tracking-[0.2em] border-b border-slate-50 text-center">Action</th>
                                            </tr>
                                        </thead>

                                        <tbody className="text-slate-800">
                                            {section.banks.map((bank) => {
                                                const isSelected = selectedBanks.some(
                                                    (b) => b.id === bank.id
                                                );

                                                return (
                                                    <motion.tr
                                                        key={bank.id}
                                                        initial={{ opacity: 0, x: -20 }}
                                                        whileInView={{ opacity: 1, x: 0 }}
                                                        viewport={{ once: true }}
                                                        className="group/row bg-white rounded-3xl overflow-hidden shadow-sm hover:shadow-xl hover:shadow-blue-900/5 transition-all duration-300"
                                                    >
                                                        <td className="py-3 px-6 rounded-l-2xl bg-white group-hover/row:bg-blue-50/50 transition-colors">
                                                            <div className="flex items-center gap-4">
                                                                <div className="w-5 h-5 rounded-full bg-blue-50/50 border border-blue-100 flex items-center justify-center text-blue-500">
                                                                    <CheckCircle2 size={12} />
                                                                </div>
                                                                <div className="font-bold text-slate-800 text-base tracking-tight group-hover/row:text-[#2076C7] transition-all whitespace-nowrap">{bank.name}</div>
                                                            </div>
                                                        </td>
                                                        <td className="py-3 px-4 bg-white group-hover/row:bg-blue-50/50 transition-colors font-bold text-slate-900 text-lg tracking-tight">
                                                            {bank.tenures[activeTenure].rate}
                                                        </td>
                                                        <td className="py-3 px-4 bg-white group-hover/row:bg-blue-50/50 transition-colors font-bold text-slate-900 text-lg tracking-tight">
                                                            {bank.tenures[activeTenure].senior}
                                                        </td>
                                                        <td className="py-3 px-6 bg-white group-hover/row:bg-blue-50/30 transition-colors">
                                                            {bank.specialRate ? (
                                                                <span className="inline-flex items-center px-4 py-2 rounded-lg bg-teal-50/50 text-[#1CADA3] text-[10px] font-bold border border-teal-100 uppercase tracking-widest shadow-sm">
                                                                    {bank.specialRate}
                                                                </span>
                                                            ) : (
                                                                <span className="text-slate-200 font-bold">—</span>
                                                            )}
                                                        </td>
                                                        <td className="py-3 px-6 bg-white group-hover/row:bg-blue-50/30 transition-colors text-center">
                                                            <div className="flex justify-center">
                                                                <label className="relative flex items-center cursor-pointer">
                                                                    <input
                                                                        type="checkbox"
                                                                        checked={isSelected}
                                                                        onChange={() => handleSelectBank(bank)}
                                                                        className="peer sr-only"
                                                                    />
                                                                    <div className="w-6 h-6 bg-white border-2 border-slate-300 rounded-md peer-checked:bg-[#2076C7] peer-checked:border-[#2076C7] transition-all duration-300 flex items-center justify-center">
                                                                        <CheckCircle2 size={12} className={`text-white transition-all duration-300 ${isSelected ? 'opacity-100 scale-100' : 'opacity-0 scale-50'}`} strokeWidth={4} />
                                                                    </div>
                                                                </label>
                                                            </div>
                                                        </td>
                                                        <td className="py-3 px-6 rounded-r-2xl bg-white group-hover/row:bg-blue-50/50 transition-colors text-center">
                                                            <button
                                                                onClick={() => handleApply(bank.name)}
                                                                className="group/btn relative px-8 py-2.5 rounded-xl text-white font-bold text-[10px] uppercase tracking-[0.1em] transition-all shadow-lg hover:shadow-2xl hover:shadow-[#2076C7]/20 active:scale-95 whitespace-nowrap overflow-hidden cursor-pointer"
                                                                style={{ background: 'linear-gradient(to right, #1CADA3, #2076C7)' }}
                                                            >
                                                                <div className="relative z-10 transition-transform group-hover/btn:scale-105">Apply Now</div>
                                                                <div className="absolute inset-0 bg-white/20 opacity-0 group-hover/btn:opacity-100 transition-opacity" />
                                                            </button>
                                                        </td>
                                                    </motion.tr>
                                                );
                                            })}
                                        </tbody>
                                    </table>
                                </motion.div>
                            )}
                        </AnimatePresence>
                    </motion.div>
                ))}
            </div>

            {/* Section Action Bar for Comparison */}
            <AnimatePresence>
                {selectedBanks.length > 0 && (
                    <motion.div
                        initial={{ opacity: 0, y: 100 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: 100 }}
                        className="fixed bottom-8 left-1/2 -translate-x-1/2 z-40 w-full max-w-5xl px-4"
                    >
                        <div className="bg-white/80 backdrop-blur-2xl border border-white/50 shadow-[0_20px_50px_rgba(32,118,199,0.3)] rounded-[3rem] overflow-hidden">
                            <div className="px-10 py-6 flex flex-col sm:flex-row items-center justify-between gap-6">
                                <div className="flex items-center gap-6 w-full sm:w-auto overflow-x-auto no-scrollbar">
                                    <span className="text-[10px] font-black text-[#2076C7] uppercase tracking-[0.2em] whitespace-nowrap">Selected ({selectedBanks.length}/3)</span>
                                    <div className="flex gap-4">
                                        {selectedBanks.map((bank, i) => (
                                            <motion.div
                                                key={i}
                                                layout
                                                initial={{ scale: 0.8, opacity: 0 }}
                                                animate={{ scale: 1, opacity: 1 }}
                                                className="flex items-center gap-3 bg-white border border-blue-100 pl-4 pr-3 py-2.5 rounded-2xl shadow-lg shadow-blue-900/5 group"
                                            >
                                                <span className="text-xs font-bold text-slate-800 whitespace-nowrap tracking-tight">{bank.name}</span>
                                                <button onClick={() => handleSelectBank(bank)} className="w-5 h-5 rounded-full bg-slate-50 text-slate-400 hover:bg-red-50 hover:text-red-500 transition-all flex items-center justify-center cursor-pointer">
                                                    <X size={12} strokeWidth={4} />
                                                </button>
                                            </motion.div>
                                        ))}
                                    </div>
                                </div>

                                <div className="flex items-center gap-6 w-full sm:w-auto">
                                    <button
                                        onClick={() => setSelectedBanks([])}
                                        className="text-slate-400 font-bold text-[10px] uppercase tracking-widest hover:text-red-500 transition-colors px-4 cursor-pointer"
                                    >
                                        Clear
                                    </button>
                                    <button
                                        onClick={() => setIsCompareModalOpen(true)}
                                        disabled={selectedBanks.length < 2}
                                        className={`group/cmp relative font-bold text-[10px] uppercase tracking-[0.2em] px-10 py-5 rounded-2xl shadow-2xl transition-all w-full sm:w-auto active:scale-95 overflow-hidden cursor-pointer ${selectedBanks.length < 2
                                            ? 'bg-slate-100 text-slate-300 cursor-not-allowed shadow-none border border-slate-200'
                                            : 'text-white hover:shadow-[#2076C7]/40'
                                            }`}
                                        style={selectedBanks.length >= 2 ? { background: 'linear-gradient(to right, #2076C7, #1CADA3)' } : {}}
                                    >
                                        <div className="relative z-10 flex items-center justify-center gap-2">
                                            Compare Now
                                            <ArrowRight size={14} className="group-hover/cmp:translate-x-1 transition-transform" />
                                        </div>
                                        {selectedBanks.length >= 2 && <div className="absolute inset-0 bg-white/20 opacity-0 group-hover/cmp:opacity-100 transition-opacity" />}
                                    </button>
                                </div>
                            </div>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>

            {/* Comparison Modal */}
            <AnimatePresence>
                {isCompareModalOpen && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="fixed inset-0 z-[100] flex items-center justify-center p-4 sm:p-8"
                    >
                        <div
                            className="absolute inset-0 bg-slate-900/80 backdrop-blur-xl"
                            onClick={() => setIsCompareModalOpen(false)}
                        ></div>

                        <motion.div
                            initial={{ scale: 0.9, y: 30, opacity: 0 }}
                            animate={{ scale: 1, y: 0, opacity: 1 }}
                            exit={{ scale: 0.9, y: 30, opacity: 0 }}
                            transition={{ type: "spring", damping: 25, stiffness: 300 }}
                            className="relative bg-white rounded-3xl shadow-[0_50px_100px_-20px_rgba(0,0,0,0.25)] w-full max-w-5xl max-h-[95vh] overflow-hidden flex flex-col border border-slate-200"
                        >
                            {/* Modal Header */}
                            <div className="px-8 py-6 border-b border-slate-100 flex justify-between items-start bg-white">
                                <div>
                                    <h3 className="text-xl font-bold text-[#2076C7] tracking-tight mb-1">Compare FD Rates</h3>
                                    <div className="flex items-center gap-2 text-xs font-bold text-slate-400 uppercase tracking-widest">
                                        <span>Investment: ₹1,00,000</span>
                                        <span className="text-slate-200">|</span>
                                        <span>Tenure:</span>
                                        <select
                                            value={activeTenure}
                                            onChange={(e) => setActiveTenure(e.target.value as any)}
                                            className="text-[#1CADA3] bg-transparent outline-none cursor-pointer hover:text-[#2076C7] transition-all"
                                        >
                                            {tenureBuckets.map(t => (
                                                <option key={t.id} value={t.id}>{t.label}</option>
                                            ))}
                                        </select>
                                    </div>
                                </div>
                                <button
                                    onClick={() => setIsCompareModalOpen(false)}
                                    className="w-10 h-10 flex items-center justify-center rounded-full bg-white text-slate-400 hover:text-slate-600 hover:bg-slate-100 transition-all border border-slate-100 shadow-sm cursor-pointer"
                                >
                                    <X size={20} strokeWidth={3} />
                                </button>
                            </div>

                            {/* Comparison Table */}
                            <div className="p-4 sm:p-8 flex-grow overflow-y-auto no-scrollbar bg-slate-50/10">
                                <div className="border border-slate-200 rounded-3xl overflow-hidden bg-white shadow-sm">
                                    <table className="w-full border-collapse">
                                        <thead>
                                            <tr className="bg-slate-50/50">
                                                <th className="p-5 text-left text-slate-800 font-bold text-sm border-r border-b border-slate-200 w-1/4">Institution</th>
                                                {selectedBanks.map((bank, i) => (
                                                    <th key={i} className="p-5 text-center border-b border-slate-200 last:border-r-0 border-r min-w-[200px]">
                                                        <h4 className="text-base font-bold text-[#1CADA3] tracking-tight">{bank.name}</h4>
                                                    </th>
                                                ))}
                                            </tr>
                                        </thead>
                                        <tbody className="text-slate-800 text-center">
                                            <tr className="group">
                                                <td className="p-5 text-left text-sm font-bold text-slate-800 border-r border-b border-slate-200">Interest Rate</td>
                                                {selectedBanks.map((bank, i) => (
                                                    <td key={i} className="p-5 border-b border-slate-200 border-r last:border-r-0 font-bold text-slate-900 text-lg">
                                                        {bank.tenures?.[activeTenure]?.rate || '-'}
                                                    </td>
                                                ))}
                                            </tr>
                                            <tr className="group">
                                                <td className="p-5 text-left text-sm font-bold text-slate-800 border-r border-b border-slate-200">Maturity*</td>
                                                {selectedBanks.map((bank, i) => {
                                                    const calc = calculateFD(bank.tenures?.[activeTenure]?.rate || '', activeTenure);
                                                    return (
                                                        <td key={i} className="p-5 border-b border-slate-200 border-r last:border-r-0 font-bold">
                                                            <span className="inline-block text-[#1CADA3] bg-teal-50 px-4 py-1.5 rounded-lg border border-[#1CADA3]/10">
                                                                {calc.maturity}
                                                            </span>
                                                        </td>
                                                    );
                                                })}
                                            </tr>
                                            <tr className="group">
                                                <td className="p-5 text-left text-sm font-bold text-slate-800 border-r border-b border-slate-200">Gain*</td>
                                                {selectedBanks.map((bank, i) => {
                                                    const calc = calculateFD(bank.tenures?.[activeTenure]?.rate || '', activeTenure);
                                                    return (
                                                        <td key={i} className="p-5 border-b border-slate-200 border-r last:border-r-0 font-bold">
                                                            <span className="inline-block text-[#1CADA3] bg-teal-50 px-4 py-1.5 rounded-lg border border-[#1CADA3]/10">
                                                                {calc.earned}
                                                            </span>
                                                        </td>
                                                    );
                                                })}
                                            </tr>
                                            <tr className="group">
                                                <td className="p-5 text-left text-sm font-bold text-slate-800 border-r border-b border-slate-200">Sr. Citizen</td>
                                                {selectedBanks.map((bank, i) => (
                                                    <td key={i} className="p-5 border-b border-slate-200 border-r last:border-r-0 font-bold text-slate-800">
                                                        {bank.tenures?.[activeTenure]?.senior || '-'}
                                                    </td>
                                                ))}
                                            </tr>
                                            <tr className="group">
                                                <td className="p-5 text-left text-sm font-bold text-slate-800 border-r border-slate-200">A/c Required</td>
                                                {selectedBanks.map((bank, i) => (
                                                    <td key={i} className="p-5 border-r last:border-r-0 text-sm font-medium text-slate-500">
                                                        Savings
                                                    </td>
                                                ))}
                                            </tr>
                                            {/* Action row */}
                                            <tr className="bg-slate-50/30">
                                                <td className="p-5 border-r border-t border-slate-200"></td>
                                                {selectedBanks.map((bank, i) => (
                                                    <td key={i} className="p-5 border-t border-r border-slate-200 last:border-r-0">
                                                        <button
                                                            onClick={() => handleApply(bank.name)}
                                                            className="group/btn relative w-full text-white font-bold text-[11px] uppercase tracking-widest py-3 rounded-lg shadow-md hover:shadow-lg active:scale-95 transition-all overflow-hidden cursor-pointer"
                                                            style={{ background: 'linear-gradient(to right, #1CADA3, #2076C7)' }}
                                                        >
                                                            <div className="relative z-10 flex items-center justify-center gap-2">Apply</div>
                                                            <div className="absolute inset-0 bg-white/10 opacity-0 group-hover/btn:opacity-100 transition-opacity" />
                                                        </button>
                                                    </td>
                                                ))}
                                            </tr>
                                        </tbody>
                                    </table>
                                </div>
                            </div>

                            <div className="px-12 py-8 bg-slate-50/50 border-t border-slate-100">
                                <p className="text-[10px] text-slate-400 font-bold italic text-center uppercase tracking-[0.2em] leading-loose">
                                    * Maturity amounts are indicative calculations based on current quarterly compounding. <br />
                                    The actual returns may vary slightly as per bank norms.
                                </p>
                            </div>
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
};

export default BankList;

