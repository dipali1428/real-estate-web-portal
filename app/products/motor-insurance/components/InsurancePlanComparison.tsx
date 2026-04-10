"use client";

import { motion, AnimatePresence } from "framer-motion";
import { ChevronDown, Check, Filter } from "lucide-react";
import React, { useState } from "react";
import Link from "next/link";
import { companiesData, vehicleTypes, planTypes, bikeCCSegments, carCCSegments, commercialCCSegments, miscCCSegments, commercialGVWSegments } from "./insuranceData";


interface InsurancePlanComparisonProps {
    activeVehicleType?: string;
    setActiveVehicleType?: (type: string) => void;
    defaultVehicleType?: string;
    showVehicleSelection?: boolean;
    viewDetailsText?: string;
}


export default function InsurancePlanComparison({
    activeVehicleType: controlledVehicleType,
    setActiveVehicleType: setControlledVehicleType,
    defaultVehicleType = "car",
    showVehicleSelection = true,
    viewDetailsText = "View Details" // ✅ ADDED ONLY
}: InsurancePlanComparisonProps) {
    const [internalVehicleType, setInternalVehicleType] = React.useState(defaultVehicleType);
    const [activePlanType, setActivePlanType] = useState("comprehensive");
    const [showAll, setShowAll] = useState(false);
    const [insurerFilter, setInsurerFilter] = useState("private");
    const [activeCC, setActiveCC] = useState("75-150"); // Default for bike, will adjust for car
    const [activeIDV, setActiveIDV] = useState(300000); // For car comprehensive

    // Use controlled props if provided, otherwise use internal state
    const activeVehicleType = controlledVehicleType ?? internalVehicleType;

    // Reset CC when vehicle type changes
    React.useEffect(() => {
        if (activeVehicleType === "car") {
            setActiveCC("upto-1000");
            setActiveIDV(300000);
        } else if (activeVehicleType === "misc") {
            setActiveCC("upto-1500");
            setActiveIDV(1200000);
        }
        else if (activeVehicleType === "bike") setActiveCC("75-150");
        else if (activeVehicleType === "commercial") {
            setActiveCC("upto-7500");
            setActiveIDV(800000);
        }
    }, [activeVehicleType]);

    // Sync IDV with CC for car by default (matching image pairs)
    const handleCCChange = (ccId: string) => {
        setActiveCC(ccId);
        if (activeVehicleType === "car") {
            if (ccId === "upto-1000") setActiveIDV(300000);
            else if (ccId === "1001-1500") setActiveIDV(600000);
            else if (ccId === "above-1500") setActiveIDV(1000000);
        } else if (activeVehicleType === "commercial") {
            if (ccId === "upto-7500") setActiveIDV(800000);
            else if (ccId === "7501-12000") setActiveIDV(1500000);
            else if (ccId === "12001-20000") setActiveIDV(2500000);
            else if (ccId === "20001-40000") setActiveIDV(3500000);
            else if (ccId === "above-40000") setActiveIDV(4500000);
        } else if (activeVehicleType === "misc") {
            if (ccId === "upto-1500") setActiveIDV(1200000);
            else if (ccId === "1501-2500") setActiveIDV(1500000);
            else if (ccId === "above-2500") setActiveIDV(1800000);
        }
    };

    const setActiveVehicleType = (type: string) => {
        if (setControlledVehicleType) setControlledVehicleType(type);
        else setInternalVehicleType(type);
    };

    const filteredCompanies = companiesData.filter(company => {
        const typeMatch = insurerFilter === "all" || company.type === insurerFilter;
        if (activeVehicleType === "misc") {
            return typeMatch && (company.id === "chola-ms" || company.id === "magma-hdi");
        }
        if (activeVehicleType === "commercial") {
            const commercialIds = ["sbi-general", "chola-ms", "universal-sompo", "tata-aig", "magma-hdi", "royal-sundaram"];
            return typeMatch && commercialIds.includes(company.id);
        }
        return typeMatch;
    });

    const displayedCompanies = showAll ? filteredCompanies : filteredCompanies.slice(0, 3);

    const getVehicleBasisLabel = (type: string) => {
        const ccLabel = activeVehicleType === "bike"
            ? bikeCCSegments.find(s => s.id === activeCC)?.label
            : activeVehicleType === "car"
                ? carCCSegments.find(s => s.id === activeCC)?.label
                : activeVehicleType === "commercial"
                    ? commercialCCSegments.find(s => s.id === activeCC)?.label
                    : activeVehicleType === "misc"
                        ? miscCCSegments.find(s => s.id === activeCC)?.label
                        : "";

        switch (type) {
            case "car": return `${ccLabel || "1.2L Hatchback"}`;
            case "commercial": return `LCV - ${ccLabel || "Goods Carrier"}`;
            case "misc": return `Misc D - ${ccLabel || "Package Policy"}`;
            default: return `${ccLabel || "100cc two-wheeler"}`;
        }
    };

    const handleViewDetails = (company: any) => {
    if (!company) return;

    console.log("Selected Company:", company);
};

    return (
        <section id="plans" className="py-12 md:py-16 pt-32 sm:pt-16 bg-white font-sans">
            <div className="container mx-auto px-4 md:px-6">
                <div className="text-center max-w-3xl mx-auto mb-10">
                    <h2 className="text-3xl md:text-4xl font-extrabold mb-3 bg-linear-to-r from-[#2076C7] to-[#1CADA3] bg-clip-text text-transparent drop-shadow-sm">
                        Compare Insurance Starting Prices
                    </h2>
                    <p className="text-gray-500 text-[15px] md:text-base max-w-2xl mx-auto leading-relaxed">
                        Get instant quotes from top-rated insurers. Save up to 85% on your premium with our transparent comparison tool.
                    </p>
                </div>

                <div className="flex flex-col lg:flex-row gap-6 max-w-6xl mx-auto">
                    {/* Left Sidebar - Filters */}
                    <div className="w-full lg:w-1/4 xl:w-[280px] shrink-0">
                        <div className="bg-white rounded-2xl border border-gray-100 p-6 shadow-sm lg:sticky lg:top-28">
                            <div className="flex items-center gap-2 mb-6 text-gray-800">
                                <Filter size={18} strokeWidth={2.5} />
                                <h3 className="font-bold text-base tracking-tight">Filters</h3>
                            </div>

                            {/* Vehicle Type */}
                            {showVehicleSelection && (
                                <div className="mb-8">
                                    <h4 className="text-[11px] font-bold text-gray-400 uppercase tracking-widest mb-3">Vehicle Type</h4>
                                    <div className="grid grid-cols-2 lg:flex lg:flex-col gap-2">
                                        {vehicleTypes.map((type) => {
                                            const Icon = type.icon;
                                            const isActive = activeVehicleType === type.id;
                                            return (
                                                <button
                                                    key={type.id}
                                                    onClick={() => {
                                                        setActiveVehicleType(type.id);
                                                        setShowAll(false);
                                                    }}
                                                    className={`flex items-center gap-3 px-3 sm:px-4 py-3 rounded-xl text-xs sm:text-sm font-semibold transition-all ${isActive
                                                        ? "bg-linear-to-r from-[#2076C7] to-[#1CADA3] text-white shadow-md shadow-blue-500/20"
                                                        : "bg-gray-50 text-gray-600 hover:bg-gray-100/80"
                                                        }`}
                                                >
                                                    <Icon size={18} className={isActive ? "text-white" : "text-gray-500"} />
                                                    <span className="truncate">{type.label}</span>
                                                    {isActive && <Check size={16} className="ml-auto hidden sm:block" strokeWidth={3} />}
                                                </button>
                                            );
                                        })}
                                    </div>
                                </div>
                            )}

                            {/* Insurer Type */}
                            <div>
                                <h4 className="text-[11px] font-bold text-gray-400 uppercase tracking-widest mb-3">Insurer Type</h4>
                                <div className="flex flex-col gap-2">
                                    {["private", "public"].map((type) => {
                                        const isActive = insurerFilter === type;
                                        return (
                                            <label key={type} className={`flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-semibold transition-all cursor-pointer ${isActive ? "bg-blue-50/50 text-[#2076C7]" : "text-gray-600 hover:bg-gray-50 bg-transparent"}`}>
                                                <div className="relative flex items-center justify-center">
                                                    <input
                                                        type="radio"
                                                        name="insurerType"
                                                        value={type}
                                                        checked={isActive}
                                                        onChange={(e) => setInsurerFilter(e.target.value)}
                                                        className={`appearance-none w-4 h-4 rounded-full border-2 transition-all ${isActive ? 'border-[#2076C7]' : 'border-gray-300'}`}
                                                    />
                                                    {isActive && <div className="absolute w-2 h-2 bg-[#2076C7] rounded-full" />}
                                                </div>
                                                <span className="capitalize">{type}</span>
                                            </label>
                                        );
                                    })}
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Right Area - Main Content */}
                    <div className="w-full lg:flex-1">
                        {/* Top Bar - Plan Types & Filters */}
                        <div className="bg-white rounded-2xl border border-gray-100 px-4 py-3 shadow-sm mb-6 flex flex-col md:flex-row items-center justify-between gap-4">

                            {/* Plan Types */}
                            <div className="flex flex-wrap gap-1 bg-gray-50 p-1 rounded-xl w-full md:w-auto">
                                {planTypes
                                    .filter(plan => {
                                        if ((activeVehicleType === 'commercial' || activeVehicleType === 'misc') && plan.id === 'ownDamage') return false;
                                        return true;
                                    })
                                    .map((plan) => (
                                        <button
                                            key={plan.id}
                                            onClick={() => setActivePlanType(plan.id)}
                                            className={`flex-1 md:flex-none px-3 sm:px-4 py-2 rounded-lg text-xs sm:text-[13px] font-bold transition-all ${activePlanType === plan.id
                                                ? "bg-linear-to-r from-[#2076C7] to-[#1CADA3] text-white shadow-md shadow-blue-500/20"
                                                : "text-gray-500 hover:text-gray-700 hover:bg-white"
                                                }`}
                                        >
                                            {plan.label}
                                        </button>
                                    ))}
                            </div>

                            {/* CC & IDV Drops */}
                            <div className="flex items-center gap-4 sm:gap-6 px-2 w-full md:w-auto overflow-hidden">
                                {/* Engine Capacity */}
                                {(activeVehicleType === "bike" || activeVehicleType === "car" || activeVehicleType === "commercial" || activeVehicleType === "misc") && (
                                    <div className="flex flex-col flex-1 md:flex-none">
                                        <span className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">{activeVehicleType === "commercial" ? "GVW" : "Engine Capacity"}</span>
                                        <select
                                            value={activeCC}
                                            onChange={(e) => handleCCChange(e.target.value)}
                                            className="text-xs sm:text-sm font-bold text-[#1C2024] bg-transparent border-none p-0 focus:ring-0 cursor-pointer outline-none w-full"
                                        >
                                            {(() => {
                                                if (activeVehicleType === "bike") return bikeCCSegments;
                                                if (activeVehicleType === "car") return carCCSegments;
                                                if (activeVehicleType === "commercial") return commercialGVWSegments;
                                                if (activeVehicleType === "misc") return miscCCSegments;
                                                return [];
                                            })().map(seg => <option key={seg.id} value={seg.id}>{seg.label}</option>)}
                                        </select>
                                    </div>
                                )}

                                {/* Selected IDV */}
                                {(activeVehicleType === "car" || activeVehicleType === "commercial" || activeVehicleType === "misc") && (activePlanType === "comprehensive" || activePlanType === "ownDamage") && (
                                    <div className="flex flex-col border-l border-gray-100 pl-4 sm:pl-6 shrink-0 flex-1 md:flex-none">
                                        <span className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">Selected IDV</span>
                                        <select
                                            value={activeIDV}
                                            onChange={(e) => setActiveIDV(Number(e.target.value))}
                                            className="text-xs sm:text-sm font-bold text-[#2076C7] bg-transparent border-none p-0 focus:ring-0 cursor-pointer outline-none w-full"
                                        >
                                            {(() => {
                                                if (activeVehicleType === "car") return [
                                                    { label: "₹ 3.0 Lac", value: 300000 },
                                                    { label: "₹ 6.0 Lac", value: 600000 },
                                                    { label: "₹ 10.0 Lac", value: 1000000 }
                                                ];
                                                if (activeVehicleType === "misc") return [
                                                    { label: "₹ 12.0 Lac", value: 1200000 },
                                                    { label: "₹ 15.0 Lac", value: 1500000 },
                                                    { label: "₹ 18.0 Lac", value: 1800000 }
                                                ];
                                                if (activeVehicleType === "commercial") return [
                                                    { label: "₹ 8.0 Lac", value: 800000 },
                                                    { label: "₹ 15.0 Lac", value: 1500000 },
                                                    { label: "₹ 25.0 Lac", value: 2500000 },
                                                    { label: "₹ 35.0 Lac", value: 3500000 },
                                                    { label: "₹ 45.0 Lac", value: 4500000 }
                                                ];
                                                return [];
                                            })().map(opt => <option key={opt.value} value={opt.value}>{opt.label}</option>)}
                                        </select>
                                    </div>
                                )}
                            </div>
                        </div>

                        {/* Results Header */}
                        <div className="flex flex-col md:flex-row md:items-center justify-between gap-2 mb-4 px-2">
                            <p className="text-[13px] text-gray-500 font-medium">
                                Showing <strong className="text-gray-800">{displayedCompanies.length}</strong> of <strong className="text-gray-800">{filteredCompanies.length}</strong> plans for <strong className="text-[#2076C7]">{getVehicleBasisLabel(activeVehicleType)}</strong>
                            </p>
                        </div>

                        {activeVehicleType === "commercial" && activePlanType === "thirdParty" && (
                            <div className="bg-amber-50 border border-amber-200 text-amber-600 text-[11px] font-semibold px-4 py-2 rounded-lg mb-4 flex items-center gap-2">
                                <span>⚠️</span>
                                <span>Prices shown are base TP premiums. Final price will be shown at the time of purchase.</span>
                            </div>
                        )}

                        {/* Cards List */}
                        <div className="space-y-4">
                            <AnimatePresence mode="popLayout">
                                {displayedCompanies.map((company, index) => {
                                    const currentPrices = company.prices[activeVehicleType as keyof typeof company.prices];
                                    const basePrice = currentPrices[activePlanType as keyof typeof currentPrices];

                                    let price = 0;

                                    if ((activeVehicleType === "car" || activeVehicleType === "commercial" || activeVehicleType === "misc") && (activePlanType === "comprehensive" || activePlanType === "ownDamage")) {
                                        if (activeVehicleType === "misc" && activePlanType === "comprehensive") {
                                            if (activeIDV === 1200000) price = 48625;
                                            else if (activeIDV === 1500000) price = 55705;
                                            else if (activeIDV === 1800000) price = 62785;
                                            else price = Math.round((20305 + activeIDV * 0.03) * 1.18);
                                        } else if (activeVehicleType === "misc" && activePlanType === "ownDamage") {
                                            price = Math.round((activeIDV * 0.03) * 1.18);
                                        } else if (activeVehicleType === "commercial" && activePlanType === "comprehensive") {
                                            if (activeCC === "upto-7500") price = 24049;
                                            else if (activeCC === "7501-12000") price = 42186;
                                            else if (activeCC === "12001-20000") price = 60313;
                                            else if (activeCC === "20001-40000") price = 78950;
                                            else if (activeCC === "above-40000") price = 89242;
                                            else price = 24049;
                                        } else {
                                            let tp = 0;
                                            if (activePlanType === "comprehensive") {
                                                if (activeVehicleType === "car") {
                                                    if (activeCC === "upto-1000") tp = 2094;
                                                    else if (activeCC === "1001-1500") tp = 3416;
                                                    else if (activeCC === "above-1500") tp = 7897;
                                                } else if (activeVehicleType === "commercial") {
                                                    const gvw = commercialGVWSegments.find(s => s.id === activeCC);
                                                    tp = gvw ? gvw.baseTP : 16049;
                                                }
                                            }

                                            const od = activeIDV * 0.03;
                                            price = Math.round((tp + od) * 1.18);
                                        }
                                    } else if (activeVehicleType === "commercial" && activePlanType === "thirdParty") {
                                        const gvw = commercialGVWSegments.find(s => s.id === activeCC);
                                        price = gvw ? gvw.baseTP : 16049;
                                    } else if (activeVehicleType === "misc" && activePlanType === "thirdParty") {
                                        price = 20305;
                                    } else {
                                        const ccSegments = activeVehicleType === "bike" ? bikeCCSegments : (activeVehicleType === "car" ? carCCSegments : (activeVehicleType === "commercial" ? commercialCCSegments : (activeVehicleType === "misc" ? miscCCSegments : [])));
                                        const factor = (ccSegments.length > 0 && activeCC) ? (ccSegments.find(s => s.id === activeCC)?.factor || 1.0) : 1.0;
                                        price = Math.round(basePrice * (factor || 1.0));
                                    }

                                    return (
                                        <motion.div
                                            key={company.id}
                                            initial={{ opacity: 0, y: 10 }}
                                            animate={{ opacity: 1, y: 0 }}
                                            exit={{ opacity: 0, scale: 0.98 }}
                                            transition={{ duration: 0.3 }}
                                            className="bg-white rounded-2xl p-4 shadow-sm border border-gray-100 flex flex-col sm:flex-row items-center justify-between gap-4 overflow-hidden relative group hover:shadow-md transition-all"
                                        >
                                            {/* Left Blue Accent Line */}
                                            <div className="absolute left-0 top-6 bottom-6 w-1 bg-linear-to-b from-[#2076C7] to-[#1CADA3] rounded-r-full" />

                                            {/* Left: Logo and Name */}
                                            <div className="flex items-center gap-4 pl-4 w-full sm:w-auto">
                                                <div className="w-12 h-12 sm:w-16 sm:h-16 bg-gray-50 border border-gray-100 rounded-xl flex items-center justify-center shrink-0 p-2 overflow-hidden">
                                                    {company.logo ? (
                                                        <img
                                                            src={company.logo}
                                                            alt={company.name}
                                                            className="h-full w-full object-contain mix-blend-multiply"
                                                            onError={(e) => {
                                                                (e.target as HTMLImageElement).src = `https://ui-avatars.com/api/?name=${company.name}&background=f0f9ff&color=2076C7&bold=true`;
                                                            }}
                                                        />
                                                    ) : (
                                                        <span className="font-bold text-[#2076C7] text-lg sm:text-xl">{company.name.substring(0, 2).toUpperCase()}</span>
                                                    )}
                                                </div>
                                                <div>
                                                    <h3 className="text-sm sm:text-base font-bold text-[#1C2024] mb-1">{company.name}</h3>
                                                </div>
                                            </div>

                                            {/* Middle/Right Container */}
                                            <div className="flex flex-col sm:flex-row items-center gap-3 sm:gap-6 w-full sm:w-auto justify-between sm:justify-end border-t sm:border-t-0 border-gray-100 pt-4 sm:pt-0 pb-1 pr-1">
                                                {/* Price */}
                                                <div className="text-center sm:text-right w-full sm:w-auto">
                                                    <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-1 sm:mr-1">Starting From</p>
                                                    <p className="text-[#1C2024] font-bold text-gray-700 text-xl sm:text-2xl flex items-end justify-center sm:justify-end gap-1 leading-none">
                                                        ₹ {price.toLocaleString("en-IN")}
                                                        <span className="text-[10px] sm:text-xs font-semibold text-gray-400 mb-0.5">/year</span>
                                                    </p>
                                                </div>

                                                {/* Button */}
                                              <button
    type="button"
    onClick={() => handleViewDetails(company)}
    className="w-full sm:w-auto px-5 py-3 bg-linear-to-r from-[#2076C7] to-[#1CADA3] hover:opacity-90 text-white rounded-xl font-semibold transition-all flex items-center justify-center gap-2 shadow-sm active:scale-95 whitespace-nowrap text-sm cursor-pointer sm:ml-2"
>
    {activePlanType === "thirdParty"
        ? "View TP Details"
        : activePlanType === "ownDamage"
        ? "View OD Details"
        : "View Full Details"}
    <span className="text-lg leading-none">→</span>
</button>
                                            </div>
                                        </motion.div>
                                    );
                                })}
                            </AnimatePresence>
                        </div>

                        {/* See More/Less Button */}
                        {filteredCompanies.length > 3 && (
                            <div className="flex justify-center mt-6">
                                <button
                                    onClick={() => setShowAll(!showAll)}
                                    className="bg-white px-6 py-2.5 rounded-xl text-[#2076C7] font-bold text-sm border border-gray-200 shadow-sm hover:border-[#2076C7] transition-all flex items-center gap-2 group cursor-pointer"
                                >
                                    {showAll ? "See less plans" : "See more plans"}
                                    <ChevronDown className={`w-4 h-4 transition-transform duration-300 ${showAll ? "rotate-180" : "group-hover:translate-y-0.5"}`} />
                                </button>
                            </div>
                        )}

                        <div className="mt-8 p-5 bg-gray-50/50 border border-gray-100 rounded-2xl shadow-sm">
                            <div className="text-gray-400 text-[11px] leading-relaxed flex items-start gap-3">
                                <span className="shrink-0 w-4 h-4 rounded-full bg-[#2076C7] flex items-center justify-center text-[10px] leading-none mt-0.5 text-white font-bold italic font-sans px-0">i</span>
                                <span>* Prices are indicative starting premiums for a {getVehicleBasisLabel(activeVehicleType)} with 0% NCB in Zone B. Actual premiums may vary based on vehicle model, age, location, and coverage selected. Insurance is a subject matter of solicitation.</span>
                            </div>
                        </div>

                    </div>
                </div>
            </div>
        </section>
    );
}
