"use client";

import { motion, AnimatePresence } from "framer-motion";
import { ChevronDown, Check } from "lucide-react";
import React, { useState } from "react";
import Link from "next/link";
import { companiesData, vehicleTypes, planTypes, bikeCCSegments, carCCSegments, commercialCCSegments, miscCCSegments, commercialGVWSegments } from "./insuranceData";


interface InsurancePlanComparisonProps {
    activeVehicleType?: string;
    setActiveVehicleType?: (type: string) => void;
    defaultVehicleType?: string;
    showVehicleSelection?: boolean;
}

export default function InsurancePlanComparison({
    activeVehicleType: controlledVehicleType,
    setActiveVehicleType: setControlledVehicleType,
    defaultVehicleType = "car",
    showVehicleSelection = true
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

    return (
        <section id="plans" className="py-20 bg-[#F0F9FF]">
            <div className="container mx-auto px-6 text-center">
                <div className="mb-6">
                    <h2 className="text-4xl font-black mb-8 capitalize bg-gradient-to-r from-[#2076C7] to-[#1CADA3] bg-clip-text text-transparent">
                        Insurance plan starting prices<span className="text-xs align-top ml-1 text-gray-400">#1</span>
                    </h2>

                    {/* Vehicle Type Selection */}
                    {showVehicleSelection && (
                        <div className="flex flex-wrap items-center justify-center gap-4 mb-6">
                            {vehicleTypes.map((type) => {
                                const Icon = type.icon;
                                return (
                                    <button
                                        key={type.id}
                                        onClick={() => {
                                            setActiveVehicleType(type.id);
                                            setShowAll(false);
                                        }}
                                        className={`flex items-center gap-3 px-6 py-4 rounded-2xl font-bold transition-all duration-300 shadow-sm border ${activeVehicleType === type.id
                                            ? "bg-gradient-to-r from-[#2076C7] to-[#1CADA3] text-white border-transparent scale-105 shadow-blue-500/20"
                                            : "bg-gray-100/50 text-gray-400 border-gray-100 hover:bg-white hover:text-gray-600"
                                            }`}
                                    >
                                        <Icon size={24} />
                                        {type.label}
                                    </button>
                                );
                            })}
                        </div>
                    )}
                </div>

                {/* Pill Style Tabs */}
                <div className="flex justify-center mb-4">
                    <div className="inline-flex bg-white rounded-full p-1.5 shadow-sm border border-blue-50">
                        {planTypes
                            .filter(plan => {
                                if ((activeVehicleType === 'commercial' || activeVehicleType === 'misc') && plan.id === 'ownDamage') {
                                    return false;
                                }
                                return true;
                            })
                            .map((plan) => (
                                <button
                                    key={plan.id}
                                    onClick={() => setActivePlanType(plan.id)}
                                    className={`px-8 py-3 rounded-full text-sm font-bold transition-all duration-300 ${activePlanType === plan.id
                                        ? "bg-gradient-to-r from-[#2076C7] to-[#1CADA3] text-white shadow-md"
                                        : "text-[#233E60]/60 hover:text-[#233E60]"
                                        }`}
                                >
                                    {plan.label}
                                </button>
                            ))}
                    </div>
                </div>

                {/* CC & IDV Filters */}
                {(activeVehicleType === "bike" || activeVehicleType === "car" || activeVehicleType === "commercial" || activeVehicleType === "misc") && (
                    <div className="flex flex-wrap items-start justify-center gap-4 lg:gap-8 mb-6 max-w-5xl mx-auto">
                        {/* CC/GVW Selection */}
                        <div className="flex flex-col items-center gap-2">
                            <span className="text-[10px] font-extrabold uppercase tracking-wider text-[#233E60]/40">
                                {activeVehicleType === "commercial" ? "Select GVW" : "Select engine cc"}
                            </span>
                            <div className="inline-flex bg-white rounded-2xl p-1 shadow-sm border border-blue-50">
                                {(() => {
                                    if (activeVehicleType === "bike") return bikeCCSegments;
                                    if (activeVehicleType === "car") return carCCSegments;
                                    if (activeVehicleType === "commercial") return commercialGVWSegments;
                                    if (activeVehicleType === "misc") return miscCCSegments;
                                    return [];
                                })().map((segment) => (
                                    <button
                                        key={segment.id}
                                        onClick={() => handleCCChange(segment.id)}
                                        className={`px-6 py-2.5 rounded-xl text-xs font-bold transition-all duration-300 ${activeCC === segment.id
                                            ? "bg-gradient-to-r from-[#2076C7] to-[#1CADA3] text-white shadow-md"
                                            : "text-[#233E60]/60 hover:text-[#233E60] hover:bg-gray-50"
                                            }`}
                                    >
                                        {segment.label}
                                    </button>
                                ))}
                            </div>
                        </div>

                        {/* IDV Filter */}
                        {(activeVehicleType === "car" || activeVehicleType === "commercial" || activeVehicleType === "misc") && (activePlanType === "comprehensive" || activePlanType === "ownDamage") && (
                            <div className="flex flex-col items-center gap-2">
                                <span className="text-[10px] font-extrabold uppercase tracking-wider text-[#233E60]/40">Select IDV</span>
                                <div className="inline-flex items-center gap-3 px-3 py-1 bg-white/50 rounded-2xl border border-blue-50">
                                    <div className="flex bg-white rounded-xl p-0.5 shadow-inner border border-blue-50">
                                        {(() => {
                                            if (activeVehicleType === "car") return [
                                                { label: "3 Lac", value: 300000 },
                                                { label: "6 Lac", value: 600000 },
                                                { label: "10 Lac", value: 1000000 }
                                            ];
                                            if (activeVehicleType === "misc") return [
                                                { label: "12 Lac", value: 1200000 },
                                                { label: "15 Lac", value: 1500000 },
                                                { label: "18 Lac", value: 1800000 }
                                            ];
                                            if (activeVehicleType === "commercial") return [
                                                { label: "8 Lac", value: 800000 },
                                                { label: "15 Lac", value: 1500000 },
                                                { label: "25 Lac", value: 2500000 },
                                                { label: "35 Lac", value: 3500000 },
                                                { label: "45 Lac", value: 4500000 }
                                            ];
                                            return [
                                                { label: "5 Lac", value: 500000 },
                                                { label: "8 Lac", value: 800000 },
                                                { label: "12 Lac", value: 1200000 }
                                            ];
                                        })().map((opt) => {
                                            // Check if button should be disabled
                                            let isLocked = false;
                                            if (activeVehicleType === "car" && activePlanType === "comprehensive") {
                                                if (activeCC === "upto-1000" && opt.value !== 300000) isLocked = true;
                                                else if (activeCC === "1001-1500" && opt.value !== 600000) isLocked = true;
                                                else if (activeCC === "above-1500" && opt.value !== 1000000) isLocked = true;
                                            } else if (activeVehicleType === "commercial" && activePlanType === "comprehensive") {
                                                if (activeCC === "upto-7500" && opt.value !== 800000) isLocked = true;
                                                else if (activeCC === "7501-12000" && opt.value !== 1500000) isLocked = true;
                                                else if (activeCC === "12001-20000" && opt.value !== 2500000) isLocked = true;
                                                else if (activeCC === "20001-40000" && opt.value !== 3500000) isLocked = true;
                                                else if (activeCC === "above-40000" && opt.value !== 4500000) isLocked = true;
                                            } else if (activeVehicleType === "misc") {
                                                if (activeCC === "upto-1500" && opt.value !== 1200000) isLocked = true;
                                                else if (activeCC === "1501-2500" && opt.value !== 1500000) isLocked = true;
                                                else if (activeCC === "above-2500" && opt.value !== 1800000) isLocked = true;
                                            }

                                            return (
                                                <button
                                                    key={opt.value}
                                                    disabled={isLocked}
                                                    onClick={() => !isLocked && setActiveIDV(opt.value)}
                                                    className={`px-5 py-2 rounded-lg text-xs font-bold transition-all duration-300 ${activeIDV === opt.value
                                                        ? "bg-gradient-to-r from-[#2076C7] to-[#1CADA3] text-white shadow-md"
                                                        : isLocked
                                                            ? "text-gray-200 cursor-not-allowed"
                                                            : "text-[#233E60]/60 hover:text-[#233E60] hover:bg-gray-50"
                                                        }`}
                                                >
                                                    {opt.label}
                                                </button>
                                            );
                                        })}
                                    </div>
                                </div>
                            </div>
                        )}
                    </div>
                )}

                {/* Insurer Type Filter */}
                <div className="flex justify-center mb-6">
                    <div className="inline-flex items-center gap-6 px-8 py-3 bg-white/50 rounded-full border border-blue-50">
                        <span className="text-sm font-bold text-[#233E60]/60">Insurer :</span>
                        <div className="flex items-center gap-6">
                            {["private", "public"].map((type) => (
                                <label key={type} className="flex items-center gap-2 cursor-pointer group">
                                    <div className="relative w-5 h-5 flex items-center justify-center">
                                        <input
                                            type="radio"
                                            name="insurerType"
                                            value={type}
                                            checked={insurerFilter === type}
                                            onChange={(e) => setInsurerFilter(e.target.value)}
                                            className="appearance-none w-5 h-5 rounded-full border-2 border-blue-200 checked:border-[#0066FF] transition-all cursor-pointer"
                                        />
                                        {insurerFilter === type && (
                                            <div className="absolute w-2.5 h-2.5 bg-[#0066FF] rounded-full" />
                                        )}
                                    </div>
                                    <span className={`text-sm font-bold capitalize transition-colors ${insurerFilter === type ? "text-[#233E60]" : "text-[#233E60]/60 group-hover:text-[#233E60]"}`}>
                                        {type}
                                    </span>
                                </label>
                            ))}
                        </div>
                    </div>
                </div>

                <p className="text-gray-400 mb-4 max-w-2xl mx-auto text-[11px] leading-relaxed">
                    * Prices are indicative starting premiums for a {getVehicleBasisLabel(activeVehicleType)} with 0% NCB in Zone B.
                    Actual premiums may vary based on vehicle model, age, location, and coverage selected.
                </p>

                {activeVehicleType === "commercial" && activePlanType === "thirdParty" && (
                    <div className="inline-flex items-center gap-2 bg-amber-50 border border-amber-200 text-amber-600 text-[11px] font-semibold px-4 py-2 rounded-full mb-4">
                        <span>⚠️</span>
                        <span>Prices shown are base TP premiums. 18% GST will be added at the time of purchase.</span>
                    </div>
                )}

                {/* Horizontal List of Cards */}
                <div className="max-w-5xl mx-auto space-y-4 text-left">
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
                                    // Specific formula from image:
                                    // Comprehensive: (TP + IDV * 3%) * 1.18
                                    // Own Damage: (IDV * 3%) * 1.18
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
                                // Original factor-based logic for other types
                                const ccSegments = activeVehicleType === "bike" ? bikeCCSegments : (activeVehicleType === "car" ? carCCSegments : (activeVehicleType === "commercial" ? commercialCCSegments : (activeVehicleType === "misc" ? miscCCSegments : [])));
                                const factor = (ccSegments.length > 0 && activeCC) ? (ccSegments.find(s => s.id === activeCC)?.factor || 1.0) : 1.0;
                                price = Math.round(basePrice * (factor || 1.0));
                            }

                            return (
                                <motion.div
                                    key={company.id}
                                    initial={{ opacity: 0, x: -20 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    exit={{ opacity: 0, scale: 0.95 }}
                                    transition={{ duration: 0.3, delay: index * 0.05 }}
                                    className="bg-white rounded-[1.5rem] p-4 shadow-sm border border-blue-50 flex items-center justify-between hover:shadow-md transition-all group"
                                >
                                    {/* Left: Logo and Name */}
                                    <div className="flex items-center gap-6 pl-2">
                                        <div className="w-24 h-16 bg-white border border-gray-100 rounded-xl p-2 flex items-center justify-center shadow-xs">
                                            <img
                                                src={company.logo}
                                                alt={company.name}
                                                className="max-h-full max-w-full object-contain scale-[1.05]"
                                                onError={(e) => {
                                                    (e.target as HTMLImageElement).src = `https://ui-avatars.com/api/?name=${company.name}&background=f0f9ff&color=2076C7&bold=true`;
                                                }}
                                            />
                                        </div>
                                        <h3 className="text-xl font-bold text-[#233E60] min-w-[140px] tracking-tight">{company.name}</h3>
                                    </div>

                                    {/* Middle: Price Label */}
                                    <div className="flex-1 flex justify-center items-center">
                                        <p className="text-[#233E60] font-bold text-lg">
                                            Price starting @ <span className="text-xl font-black">₹ {price.toLocaleString("en-IN")}/-</span>
                                        </p>
                                    </div>

                                    {/* Right: Button */}
                                    <div className="pr-4">
                                        <button
                                            type="button"
                                            className="px-10 py-3.5 bg-gradient-to-r from-[#2076C7] to-[#1CADA3] text-white rounded-2xl font-black hover:opacity-95 transform hover:scale-[1.02] active:scale-[0.98] transition-all flex items-center justify-center gap-3 group shadow-xl shadow-blue-500/20 whitespace-nowrap"
                                        >
                                            Check premium
                                        </button>
                                    </div>
                                </motion.div>
                            );
                        })}
                    </AnimatePresence>
                </div>

                {/* See More/Less Button */}
                {filteredCompanies.length > 3 && (
                    <div className="flex justify-center mt-12">
                        <button
                            onClick={() => setShowAll(!showAll)}
                            className="bg-white px-8 py-3 rounded-full text-[#2076C7] font-bold text-sm border border-blue-100 shadow-sm hover:shadow-md transition-all flex items-center gap-2 group cursor-pointer"
                        >
                            {showAll ? "See less plans" : "See more plans"}
                            <ChevronDown className={`w-4 h-4 transition-transform duration-300 ${showAll ? "rotate-180" : "group-hover:translate-y-0.5"}`} />
                        </button>
                    </div>
                )}
            </div >
        </section >
    );
}
