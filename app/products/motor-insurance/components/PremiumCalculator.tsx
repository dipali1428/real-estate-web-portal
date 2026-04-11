"use client";

import { useState } from "react";
import { IndianRupee, ArrowRight, Plus, Shield, ChevronDown } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

interface PremiumCalculatorProps {
    vehicleType: string;
    setVehicleType: (type: string) => void;
    lockedType?: string;
}

export default function PremiumCalculator({ vehicleType, setVehicleType, lockedType }: PremiumCalculatorProps) {
    const [idv, setIdv] = useState(45000);
    const [vehicleAge, setVehicleAge] = useState(2);
    const [premiumType, setPremiumType] = useState("comprehensive");
    const [engineCC, setEngineCC] = useState(150);
    const [regYear, setRegYear] = useState(2022);
    const [ncb, setNcb] = useState(0);
    const [ownerType, setOwnerType] = useState("Individual");
    const [prevPolicyType, setPrevPolicyType] = useState("Comprehensive");
    const [rtoZone, setRtoZone] = useState("Zone B");
    const [city, setCity] = useState("Pune");
    const [isAdditionalOpen, setIsAdditionalOpen] = useState(false);
    const [isAddonsOpen, setIsAddonsOpen] = useState(false);

    // Car specific factors
    const [fuelType, setFuelType] = useState("Petrol");
    const [carSeating, setCarSeating] = useState(5);

    // Commercial specific factors
    const [commCategory, setCommCategory] = useState("Goods Carrier");
    const [gvw, setGvw] = useState(2500);
    const [commSeating, setCommSeating] = useState(2);
    const [isPrivateCarrier, setIsPrivateCarrier] = useState(false);

    const [selectedAddOns, setSelectedAddOns] = useState<string[]>([]);
    const [make, setMake] = useState("Hero");
    const [model, setModel] = useState("Splendor Plus");
    const [variant, setVariant] = useState("Standard");
    const [policyFormat, setPolicyFormat] = useState(() => {
        if (vehicleType === "car") return "1+3";
        if (vehicleType === "commercial") return "1+1";
        return "1+5";
    });

    const [prevVehicleType, setPrevVehicleType] = useState(vehicleType);

    if (vehicleType !== prevVehicleType) {
        setPrevVehicleType(vehicleType);
        setPolicyFormat(vehicleType === "bike" ? "1+5" : vehicleType === "car" ? "1+3" : "1+1");
    }

    const calculatePremium = () => {
        let baseRate = 0;
        let tpPremium = 0;

        if (vehicleType === "car") {
            if (rtoZone === "Zone A") baseRate = 0.025;
            else if (rtoZone === "Zone B") baseRate = 0.022;
            else baseRate = 0.018;

            if (engineCC <= 1000) tpPremium = 2094;
            else if (engineCC <= 1500) tpPremium = 3416;
            else tpPremium = 7897;

            if (fuelType === "Diesel") baseRate *= 1.1;
            else if (fuelType === "CNG") baseRate *= 1.15;
            else if (fuelType === "EV") baseRate *= 0.85;
        }
        else if (vehicleType === "bike") {
            if (rtoZone === "Zone A") baseRate = 0.022;
            else if (rtoZone === "Zone B") baseRate = 0.018;
            else baseRate = 0.015;

            if (engineCC <= 75) tpPremium = 538;
            else if (engineCC <= 150) tpPremium = 843;
            else if (engineCC <= 350) tpPremium = 1366;
            else tpPremium = 2804;
        }
        else if (vehicleType === "commercial") {
            baseRate = 0.035;
            // engineCC here serves as GVW
            if (engineCC <= 7500) tpPremium = 16049;
            else if (engineCC <= 12000) tpPremium = 27186;
            else if (engineCC <= 20000) tpPremium = 35313;
            else if (engineCC <= 40000) tpPremium = 43950;
            else tpPremium = 44242;
            if (isPrivateCarrier) baseRate *= 0.9;
        } else if (vehicleType === "misc") {
            baseRate = 0.035;
            tpPremium = 20305;
            if (idv === 1200000) tpPremium = 41208; // Base for 48625
            else if (idv === 1500000) tpPremium = 47208; // Base for 55705
            else if (idv === 1800000) tpPremium = 53208; // Base for 62785
            if (isPrivateCarrier) baseRate *= 0.9;
        }

        let premium = idv * baseRate;
        if (ownerType === "Company") premium *= 1.15;

        if (premiumType === "third-party") {
            premium = tpPremium;
        } else if (premiumType === "own-damage") {
            premium = premium * 0.7;
            premium = premium * (1 - ncb / 100);
        } else if (premiumType === "comprehensive") {
            let odComponent = premium * 0.7;
            odComponent = odComponent * (1 - ncb / 100);
            premium = tpPremium + odComponent;
        }

        if (vehicleType === "car" || vehicleType === "bike") {
            premium += (engineCC / 100) * 200;
        } else if (vehicleType === "commercial" && commCategory === "Goods Carrier") {
            premium += (gvw / 1000) * 500;
        }

        const ageFactor = vehicleAge > 10 ? 0.65 : vehicleAge > 7 ? 0.75 : vehicleAge > 5 ? 0.85 : 1.0;
        premium *= ageFactor;

        if (prevPolicyType === "Third Party") premium *= 1.05;
        else if (prevPolicyType === "New Bike" || prevPolicyType === "New Car") premium *= 0.9;

        const additionalCoverCosts: Record<string, number> = {
            "Electrical Accessory?": 1500,
            "Non-Electrical Accessory?": 1000,
            "Is Bi-fuel Kit?": 2000,
            "PA Cover for Paid Driver?": 50,
            "PA Cover for unnamed persons?": 250,
            "Legal liability of employee?": 100,
            "Legal Liability to Paid Driver?": 50,
            "Fiber-Glass Fuel Tank?": 500,
            "Zero Depreciation Cover_bike": 1200,
            "Return to Invoice_bike": 800,
            "Consumables_bike": 200,
            "Engine Protector_bike": 1500,
            "Emergency Cover": 800,
            "Zero Depreciation Cover": 2500,
            "Consumables": 600,
            "Tyre Cover": 1200,
            "NCB Protection": 1500,
            "Engine Protector": 2000,
            "Return to Invoice": 3000,
            "Loss of Key": 400,
            "Loss of personal Belonging": 1200,
            "Road Side Assistance": 500,
            "Passenger Assist cover": 1000,
            "Hydrostatic Lock Cover": 1500,
            "Hospital Cash Cover": 700,
            "Conveyance Benefit": 900,
            "Smart Saver": 1500,
            "Fuel Adulteration Cover": 1100,
            "Defence Cost Cover": 2000,
            "Ev Hybrid System Protection": 3500,
            "Rodent Damage Cover": 600
        };

        selectedAddOns.forEach(addon => {
            let lookupKey = addon;
            if (vehicleType === "bike") lookupKey = `${addon}_bike`;
            if (additionalCoverCosts[lookupKey]) {
                premium += additionalCoverCosts[lookupKey];
            } else if (additionalCoverCosts[addon]) {
                premium += additionalCoverCosts[addon];
            }
        });

        return Math.round(premium).toLocaleString("en-IN");
    };

    return (
        <section id="calculator" className="py-12 bg-white text-gray-900 relative overflow-hidden">
            <div className="container mx-auto px-4 md:px-6 relative z-10">
                <div className="text-center max-w-3xl mx-auto mb-8">
                    <h2 className="text-3xl md:text-4xl font-extrabold mb-2 capitalize bg-gradient-to-r from-[#2076C7] to-[#1CADA3] bg-clip-text text-transparent drop-shadow-sm">
                        Calculate Your Estimated Premium
                    </h2>
                </div>

                <div className="bg-white rounded-2xl shadow-xl overflow-hidden max-w-6xl mx-auto border border-gray-200">
                    <div className="bg-linear-to-r from-[#2076C7] to-[#1CADA3] text-white py-4 px-4 sm:px-8 text-center">
                        <h2 className="text-xl sm:text-2xl md:text-3xl font-bold mb-1 sm:mb-2">
                            Premium Calculator
                        </h2>
                        <p className="text-blue-100 text-sm sm:text-base">
                            We&apos;ve designed our calculator to give you the most accurate estimates based on your vehicle details and coverage preferences.
                        </p>
                    </div>

                    <div className="p-4 md:p-8 relative overflow-hidden">
                        {/* Top Selection Bar */}
                        <div className="flex flex-col lg:flex-row gap-4 items-center justify-between mb-3 pb-3 border-b border-gray-50">
                            <div className="w-full lg:w-1/3">
                                <label className="text-gray-700 font-semibold mb-1 block text-sm uppercase tracking-wider">Premium Type</label>
                                <div className="flex bg-gray-50 p-1 rounded-xl">
                                    {["third-party", "comprehensive", "own-damage"].map((type) => (
                                        <button
                                            key={type}
                                            onClick={() => setPremiumType(type)}
                                            className={`flex-1 py-3 px-4 rounded-lg text-xs font-bold capitalize transition-all duration-300 ${premiumType === type
                                                ? "bg-gradient-to-r from-[#2076C7] to-[#1CADA3] text-white shadow-lg"
                                                : "text-gray-500 hover:text-gray-800 hover:bg-white"
                                                }`}
                                        >
                                            {type.replace("-", " ")}
                                        </button>
                                    ))}
                                </div>
                            </div>

                            {!lockedType && (
                                <div className="w-full lg:w-1/3">
                                    <label className="text-gray-700 font-semibold mb-1 block text-sm uppercase tracking-wider">Vehicle Type</label>
                                    <div className="flex bg-gray-50 p-1 rounded-xl">
                                        {["bike", "car", "commercial"].map((type) => (
                                            <button
                                                key={type}
                                                onClick={() => setVehicleType(type)}
                                                className={`flex-1 py-3 px-4 rounded-lg text-xs font-bold capitalize transition-all duration-300 ${vehicleType === type
                                                    ? "bg-linear-to-r from-[#2076C7] to-[#1CADA3] text-white shadow-lg"
                                                    : "text-gray-500 hover:text-gray-800 hover:bg-white"
                                                    }`}
                                            >
                                                {type}
                                            </button>
                                        ))}
                                    </div>
                                </div>
                            )}
                        </div>

                        {/* Main Controls Flow */}
                        <div className="space-y-2">
                            {/* Section 1: Vehicle Information Grid */}
                            <div className="bg-white p-3 rounded-[1.25rem] border border-gray-100 shadow-sm">
                                <div className="flex items-center gap-2 mb-2">
                                    <div className="w-6 h-6 rounded-lg bg-blue-50 flex items-center justify-center">
                                        <Shield size={14} className="text-[#2076C7]" />
                                    </div>
                                    <h3 className="text-gray-900 font-bold text-sm uppercase tracking-wider">Vehicle Details</h3>
                                </div>

                                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                                    <div>
                                        <label className="text-[10px] font-bold text-gray-400 uppercase mb-1 block">Manufacturer</label>
                                        <select
                                            className="w-full p-2 bg-gray-50 border border-gray-300 rounded-lg text-xs outline-none focus:ring-2 ring-blue-500/20 focus:border-[#2076C7] transition-all"
                                            value={make}
                                            onChange={(e) => setMake(e.target.value)}
                                        >
                                            {vehicleType === "bike" ? (
                                                <>
                                                    <option value="Hero">Hero</option>
                                                    <option value="Honda">Honda</option>
                                                    <option value="Royal Enfield">Royal Enfield</option>
                                                    <option value="TVS">TVS</option>
                                                    <option value="Yamaha">Yamaha</option>
                                                    <option value="Bajaj">Bajaj</option>
                                                    <option value="KTM">KTM</option>
                                                    <option value="Suzuki">Suzuki</option>
                                                </>
                                            ) : vehicleType === "car" ? (
                                                <>
                                                    <option value="Maruti">Maruti</option>
                                                    <option value="Hyundai">Hyundai</option>
                                                    <option value="Tata">Tata</option>
                                                    <option value="Mahindra">Mahindra</option>
                                                    <option value="Kia">Kia</option>
                                                    <option value="Toyota">Toyota</option>
                                                    <option value="Honda">Honda</option>
                                                </>
                                            ) : (
                                                <>
                                                    <option value="Tata">Tata</option>
                                                    <option value="Mahindra">Mahindra</option>
                                                    <option value="Ashok Leyland">Ashok Leyland</option>
                                                    <option value="Eicher">Eicher</option>
                                                    <option value="BharatBenz">BharatBenz</option>
                                                </>
                                            )}
                                        </select>
                                    </div>
                                    <div>
                                        <label className="text-[10px] font-bold text-gray-400 uppercase mb-1 block">Model</label>
                                        <input
                                            type="text"
                                            value={model}
                                            onChange={(e) => setModel(e.target.value)}
                                            className="w-full p-2 bg-gray-50 border border-gray-300 rounded-lg text-xs outline-none focus:ring-2 ring-blue-500/20 focus:border-[#2076C7] transition-all"
                                            placeholder="Vehicle Model"
                                        />
                                    </div>
                                    <div>
                                        <label className="text-[10px] font-bold text-gray-400 uppercase mb-1 block">Variant</label>
                                        <input
                                            type="text"
                                            value={variant}
                                            onChange={(e) => setVariant(e.target.value)}
                                            className="w-full p-2 bg-gray-50 border border-gray-300 rounded-lg text-xs outline-none focus:ring-2 ring-blue-500/20 focus:border-[#2076C7] transition-all"
                                            placeholder="Vehicle Variant"
                                        />
                                    </div>
                                    {true && (
                                        <>
                                            <div>
                                                <label className="text-[10px] font-bold text-gray-400 uppercase mb-1 block">
                                                    {vehicleType === "commercial" ? "GVW (kg)" : "Engine CC"}
                                                </label>
                                                <input
                                                    type="number"
                                                    value={engineCC}
                                                    onChange={(e) => setEngineCC(Number(e.target.value))}
                                                    className="w-full p-2 bg-gray-50 border border-gray-300 rounded-lg text-xs outline-none focus:ring-2 ring-blue-500/20 focus:border-[#2076C7] transition-all"
                                                    placeholder={vehicleType === "commercial" ? "e.g. 7500" : "e.g. 1200"}
                                                />
                                            </div>
                                            <div>
                                                <label className="text-[10px] font-bold text-gray-400 uppercase mb-1 block">Reg. Year</label>
                                                <select
                                                    className="w-full p-2 bg-gray-50 border border-gray-300 rounded-lg text-xs outline-none focus:ring-2 ring-blue-500/20 focus:border-[#2076C7] transition-all"
                                                    value={regYear}
                                                    onChange={(e) => {
                                                        setRegYear(Number(e.target.value));
                                                        setVehicleAge(new Date().getFullYear() - Number(e.target.value));
                                                    }}
                                                >
                                                    {[2026, 2025, 2024, 2023, 2022, 2021, 2020, 2019, 2018, 2017, 2016, 2015, 2014, 2013, 2012, 2011, 2010, 2009, 2008, 2007, 2006, 2005, 2004].map(y => (
                                                        <option key={y} value={y}>{y}</option>
                                                    ))}
                                                </select>
                                            </div>
                                            <div>
                                                <label className="text-[10px] font-bold text-gray-400 uppercase mb-1 block">RTO City</label>
                                                <select
                                                    className="w-full p-2 bg-gray-50 border border-gray-300 rounded-lg text-xs outline-none focus:ring-2 ring-blue-500/20 focus:border-[#2076C7] transition-all"
                                                    value={city}
                                                    onChange={(e) => {
                                                        const selectedCity = e.target.value;
                                                        setCity(selectedCity);
                                                        // Auto-set zone based on city
                                                        if (["Mumbai", "Delhi", "Bangalore", "Chennai", "Kolkata"].includes(selectedCity)) setRtoZone("Zone A");
                                                        else if (["Pune", "Ahmedabad", "Jaipur", "Lucknow", "Hyderabad"].includes(selectedCity)) setRtoZone("Zone B");
                                                        else setRtoZone("Zone C");
                                                    }}
                                                >
                                                    <option value="Mumbai">Mumbai</option>
                                                    <option value="Delhi">Delhi</option>
                                                    <option value="Bangalore">Bangalore</option>
                                                    <option value="Pune">Pune</option>
                                                    <option value="Ahmedabad">Ahmedabad</option>
                                                    <option value="Jaipur">Jaipur</option>
                                                    <option value="Hyderabad">Hyderabad</option>
                                                    <option value="Others">Others</option>
                                                </select>
                                            </div>
                                        </>
                                    )}

                                    {vehicleType === "car" && (
                                        <>
                                            <div>
                                                <label className="text-[10px] font-bold text-gray-400 uppercase mb-1 block">Fuel Type</label>
                                                <select
                                                    className="w-full p-2 bg-gray-50 border border-gray-300 rounded-lg text-xs outline-none focus:ring-2 ring-blue-500/20 focus:border-[#2076C7] transition-all"
                                                    value={fuelType}
                                                    onChange={(e) => setFuelType(e.target.value)}
                                                >
                                                    <option value="Petrol">Petrol + CNG</option>
                                                    <option value="Diesel">Diesel</option>
                                                    <option value="EV">Electric</option>
                                                </select>
                                            </div>
                                            <div>
                                                <label className="text-[10px] font-bold text-gray-400 uppercase mb-1 block">Seating</label>
                                                <select
                                                    className="w-full p-2 bg-gray-50 border border-gray-300 rounded-lg text-xs outline-none focus:ring-2 ring-blue-500/20 focus:border-[#2076C7] transition-all"
                                                    value={carSeating}
                                                    onChange={(e) => setCarSeating(Number(e.target.value))}
                                                >
                                                    <option value={5}>5 Seater</option>
                                                    <option value={7}>7 Seater</option>
                                                    <option value={8}>8 Seater</option>

                                                </select>
                                            </div>
                                        </>
                                    )}

                                    {vehicleType === "commercial" && (
                                        <>
                                            <div>
                                                <label className="text-[10px] font-bold text-gray-400 uppercase mb-1 block">Category</label>
                                                <select
                                                    className="w-full p-2 bg-gray-50 border border-gray-300 rounded-lg text-xs outline-none focus:ring-2 ring-blue-500/20 focus:border-[#2076C7] transition-all"
                                                    value={commCategory}
                                                    onChange={(e) => setCommCategory(e.target.value)}
                                                >
                                                    <option value="Goods Carrier">Goods Carrier</option>
                                                    <option value="Passenger Carrier">Passenger Carrier</option>
                                                </select>
                                            </div>
                                            <div>
                                                <label className="text-[10px] font-bold text-gray-400 uppercase mb-1 block">Weight/Seating</label>
                                                <input
                                                    type="number"
                                                    value={commCategory === "Goods Carrier" ? gvw : commSeating}
                                                    onChange={(e) => {
                                                        if (commCategory === "Goods Carrier") setGvw(Number(e.target.value));
                                                        else setCommSeating(Number(e.target.value));
                                                    }}
                                                    className="w-full p-2 bg-gray-50 border border-gray-300 rounded-lg text-xs outline-none focus:ring-2 ring-blue-500/20 focus:border-[#2076C7] transition-all"
                                                />
                                            </div>
                                        </>
                                    )}

                                    <div>
                                        <label className="text-[10px] font-bold text-gray-400 uppercase mb-1 block">NCB (%)</label>
                                        <select
                                            className="w-full p-2 bg-gray-50 border border-gray-300 rounded-lg text-xs outline-none focus:ring-2 ring-blue-500/20 focus:border-[#2076C7] transition-all"
                                            value={ncb}
                                            onChange={(e) => setNcb(Number(e.target.value))}
                                        >
                                            {[0, 20, 25, 35, 45, 50].map(v => (
                                                <option key={v} value={v}>{v}%</option>
                                            ))}
                                        </select>
                                    </div>
                                    <div>
                                        <label className="text-[10px] font-bold text-gray-400 uppercase mb-1 block">Owner Type</label>
                                        <select
                                            className="w-full p-2 bg-gray-50 border border-gray-300 rounded-lg text-xs outline-none focus:ring-2 ring-blue-500/20 focus:border-[#2076C7] transition-all"
                                            value={ownerType}
                                            onChange={(e) => setOwnerType(e.target.value)}
                                        >
                                            <option value="Individual">Individual</option>
                                            <option value="Company">Company</option>
                                        </select>
                                    </div>
                                    <div>
                                        <label className="text-[10px] font-bold text-gray-400 uppercase mb-1 block">Prev. Policy</label>
                                        <select
                                            className="w-full p-2 bg-gray-50 border border-gray-300 rounded-lg text-xs outline-none focus:ring-2 ring-blue-500/20 focus:border-[#2076C7] transition-all"
                                            value={prevPolicyType}
                                            onChange={(e) => setPrevPolicyType(e.target.value)}
                                        >
                                            <option value="Comprehensive">Comprehensive</option>
                                            <option value="Third Party">Third Party</option>
                                            <option value={vehicleType === "bike" ? "New Bike" : "New Vehicle"}>Fresh Policy</option>
                                        </select>
                                    </div>
                                    <div>
                                        <label className="text-[10px] font-bold text-gray-400 uppercase mb-1 block">Policy Format</label>
                                        <select
                                            className="w-full p-2 bg-gray-50 border border-gray-300 rounded-lg text-xs outline-none focus:ring-2 ring-blue-500/20 focus:border-[#2076C7] transition-all"
                                            value={policyFormat}
                                            onChange={(e) => setPolicyFormat(e.target.value)}
                                        >
                                            <option value="1+5">1+5 (New Bike)</option>
                                            <option value="1+3">1+3 (Private Car)</option>
                                            <option value="1+1">1+1 (Commercial/Renewal)</option>
                                            <option value="1">1 Year OD + 1 Year TP</option>
                                            <option value="3">3 Years OD + 3 Years TP</option>
                                        </select>
                                    </div>
                                </div>
                            </div>

                            {/* Section 2: Covers & Addons */}
                            <div className="space-y-2">
                                <div className="bg-white rounded-[1.25rem] border border-gray-100 shadow-sm overflow-hidden">
                                    <button
                                        onClick={() => setIsAdditionalOpen(!isAdditionalOpen)}
                                        className="w-full p-3 flex items-center justify-between hover:bg-gray-50/50 transition-colors cursor-pointer"
                                    >
                                        <div className="flex items-center gap-2">
                                            <div className="w-6 h-6 rounded-lg bg-blue-50 flex items-center justify-center">
                                                <Plus size={12} className="text-[#2076C7]" />
                                            </div>
                                            <h3 className="text-gray-900 font-bold text-xs uppercase tracking-wider">Additional Cover</h3>
                                            {selectedAddOns.filter(a => !["Zero Depreciation Cover", "Consumables", "Return to Invoice", "Engine Protector", "Emergency Cover", "Tyre Cover", "NCB Protection", "Loss of Key", "Loss of personal Belonging", "Road Side Assistance", "Passenger Assist cover", "Hydrostatic Lock Cover", "Hospital Cash Cover", "Conveyance Benefit", "Smart Saver"].includes(a.replace('_bike', ''))).length > 0 && (
                                                <span className="bg-[#2076C7] text-white text-[10px] px-1.5 py-0.5 rounded-full font-black">
                                                    {selectedAddOns.filter(a => !["Zero Depreciation Cover", "Consumables", "Return to Invoice", "Engine Protector", "Emergency Cover", "Tyre Cover", "NCB Protection", "Loss of Key", "Loss of personal Belonging", "Road Side Assistance", "Passenger Assist cover", "Hydrostatic Lock Cover", "Hospital Cash Cover", "Conveyance Benefit", "Smart Saver"].includes(a.replace('_bike', ''))).length}
                                                </span>
                                            )}
                                        </div>
                                        <ChevronDown className={`w-4 h-4 text-gray-400 transition-transform duration-300 ${isAdditionalOpen ? "rotate-180" : ""}`} />
                                    </button>
                                    <AnimatePresence>
                                        {isAdditionalOpen && (
                                            <motion.div
                                                initial={{ height: 0, opacity: 0 }}
                                                animate={{ height: "auto", opacity: 1 }}
                                                exit={{ height: 0, opacity: 0 }}
                                                transition={{ duration: 0.3 }}
                                                className="px-3 pb-3"
                                            >
                                                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-2 pt-2 border-t border-gray-200">
                                                    {[
                                                        "Electrical Accessory?",
                                                        "Non-Electrical Accessory?",
                                                        "Is Bi-fuel Kit?",
                                                        "PA Cover for Paid Driver?",
                                                        "PA Cover for unnamed persons?",
                                                        "Legal liability of employee?",
                                                        "Legal Liability to Paid Driver?",
                                                        "Fiber-Glass Fuel Tank?"
                                                    ].map(addon => (
                                                        <label key={addon} className="flex items-center gap-2 cursor-pointer group">
                                                            <div className={`w-4 h-4 rounded border-2 transition-all flex items-center justify-center shrink-0 ${selectedAddOns.includes(addon) ? "bg-[#2076C7] border-[#2076C7]" : "border-gray-300 bg-white"}`}>
                                                                {selectedAddOns.includes(addon) && (
                                                                    <svg className="w-3 h-3 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="4">
                                                                        <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                                                                    </svg>
                                                                )}
                                                                <input
                                                                    type="checkbox"
                                                                    className="hidden"
                                                                    checked={selectedAddOns.includes(addon)}
                                                                    onChange={(e) => {
                                                                        if (e.target.checked) setSelectedAddOns([...selectedAddOns, addon]);
                                                                        else setSelectedAddOns(selectedAddOns.filter(a => a !== addon));
                                                                    }}
                                                                />
                                                            </div>
                                                            <span className="text-[11px] font-medium text-gray-600 group-hover:text-gray-900 leading-tight">{addon}</span>
                                                        </label>
                                                    ))}
                                                </div>
                                            </motion.div>
                                        )}
                                    </AnimatePresence>
                                </div>

                                <div className="bg-white rounded-[1.25rem] border border-gray-100 shadow-sm overflow-hidden">
                                    <button
                                        onClick={() => setIsAddonsOpen(!isAddonsOpen)}
                                        className="w-full p-3 flex items-center justify-between hover:bg-gray-50/50 transition-colors cursor-pointer"
                                    >
                                        <div className="flex items-center gap-2">
                                            <div className="w-6 h-6 rounded-lg bg-blue-50 flex items-center justify-center">
                                                <Plus size={12} className="text-[#2076C7]" />
                                            </div>
                                            <h3 className="text-gray-900 font-bold text-xs uppercase tracking-wider">AddOn Cover</h3>
                                            {selectedAddOns.filter(a => ["Zero Depreciation Cover", "Consumables", "Return to Invoice", "Engine Protector", "Emergency Cover", "Tyre Cover", "NCB Protection", "Loss of Key", "Loss of personal Belonging", "Road Side Assistance", "Passenger Assist cover", "Hydrostatic Lock Cover", "Hospital Cash Cover", "Conveyance Benefit", "Smart Saver"].includes(a.replace('_bike', ''))).length > 0 && (
                                                <span className="bg-[#1CADA3] text-white text-[10px] px-1.5 py-0.5 rounded-full font-black">
                                                    {selectedAddOns.filter(a => ["Zero Depreciation Cover", "Consumables", "Return to Invoice", "Engine Protector", "Emergency Cover", "Tyre Cover", "NCB Protection", "Loss of Key", "Loss of personal Belonging", "Road Side Assistance", "Passenger Assist cover", "Hydrostatic Lock Cover", "Hospital Cash Cover", "Conveyance Benefit", "Smart Saver"].includes(a.replace('_bike', ''))).length}
                                                </span>
                                            )}
                                        </div>
                                        <ChevronDown className={`w-4 h-4 text-gray-400 transition-transform duration-300 ${isAddonsOpen ? "rotate-180" : ""}`} />
                                    </button>
                                    <AnimatePresence>
                                        {isAddonsOpen && (
                                            <motion.div
                                                initial={{ height: 0, opacity: 0 }}
                                                animate={{ height: "auto", opacity: 1 }}
                                                exit={{ height: 0, opacity: 0 }}
                                                transition={{ duration: 0.3 }}
                                                className="px-3 pb-3"
                                            >
                                                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-2 pt-2 border-t border-gray-200">
                                                    {(vehicleType === "bike"
                                                        ? [
                                                            "Zero Depreciation Cover",
                                                            "Consumables",
                                                            "Return to Invoice",
                                                            "Engine Protector"
                                                        ]
                                                        : [
                                                            "Emergency Cover",
                                                            "Zero Depreciation Cover",
                                                            "Consumables",
                                                            "Tyre Cover",
                                                            "NCB Protection",
                                                            "Engine Protector",
                                                            "Return to Invoice",
                                                            "Loss of Key",
                                                            "Loss of personal Belonging",
                                                            "Road Side Assistance",
                                                            "Passenger Assist cover",
                                                            "Hydrostatic Lock Cover",
                                                            "Hospital Cash Cover",
                                                            "Conveyance Benefit",
                                                            "Smart Saver"
                                                        ]
                                                    ).map(addon => (
                                                        <label key={addon} className="flex items-center gap-2 cursor-pointer group">
                                                            <div className={`w-4 h-4 rounded border-2 transition-all flex items-center justify-center shrink-0 ${selectedAddOns.includes(addon) ? "bg-[#2076C7] border-[#2076C7]" : "border-gray-300 bg-white"}`}>
                                                                {selectedAddOns.includes(addon) && (
                                                                    <svg className="w-3 h-3 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="4">
                                                                        <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                                                                    </svg>
                                                                )}
                                                                <input
                                                                    type="checkbox"
                                                                    className="hidden"
                                                                    checked={selectedAddOns.includes(addon)}
                                                                    onChange={(e) => {
                                                                        if (e.target.checked) setSelectedAddOns([...selectedAddOns, addon]);
                                                                        else setSelectedAddOns(selectedAddOns.filter(a => a !== addon));
                                                                    }}
                                                                />
                                                            </div>
                                                            <span className="text-[11px] font-medium text-gray-600 group-hover:text-gray-900 leading-tight">{addon}</span>
                                                        </label>
                                                    ))}
                                                </div>
                                            </motion.div>
                                        )}
                                    </AnimatePresence>
                                </div>
                            </div>

                            {/* Section 3: Result & Value Summary */}
                            <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 items-stretch mt-2">
                                <div className="bg-white p-4 rounded-[2rem] border border-gray-200 shadow-sm flex flex-col justify-center">
                                    <label className="text-gray-700 font-bold mb-3 flex items-center gap-2 text-sm uppercase tracking-wider">
                                        <IndianRupee size={20} className="text-[#2076C7]" /> Set Vehicle Value (IDV)
                                        <span className="text-[#2076C7] font-black text-xl ml-auto">₹{idv.toLocaleString("en-IN")}</span>
                                    </label>
                                    <input
                                        type="range"
                                        min={vehicleType === "bike" ? "10000" : "50000"}
                                        max={vehicleType === "bike" ? "300000" : "2000000"}
                                        step="5000"
                                        value={idv}
                                        onChange={(e) => setIdv(Number(e.target.value))}
                                        className="w-full h-2 bg-blue-50 rounded-lg appearance-none cursor-pointer accent-[#2076C7]"
                                    />
                                    <div className="flex justify-between mt-2 text-[10px] font-black text-gray-400 uppercase tracking-wider">
                                        <span>Min: ₹{vehicleType === "bike" ? "10k" : "50k"}</span>
                                        <span>Max: ₹{vehicleType === "bike" ? "3L" : "20L"}</span>
                                    </div>
                                </div>

                                <div className="bg-gray-50 rounded-[1.5rem] p-4 border border-gray-200">
                                    <div className="flex flex-col md:flex-row md:items-center justify-between mb-4">
                                        <div>
                                            <p className="text-gray-400 text-[10px] font-bold uppercase tracking-[0.2em] mb-1">Estimated Premium</p>
                                            <div className="flex items-baseline gap-1">
                                                <span className="text-xl font-bold text-[#1CADA3]">₹</span>
                                                <span className="text-3xl font-black bg-clip-text text-transparent bg-linear-to-r from-gray-900 to-gray-600">
                                                    {calculatePremium()}
                                                </span>
                                            </div>
                                        </div>
                                    </div>

                                    <div className="space-y-2 mt-4">
                                        <button className="w-full py-3 bg-linear-to-r from-[#2076C7] to-[#1CADA3] text-white rounded-xl font-black text-sm hover:opacity-95 transform hover:scale-[1.01] active:scale-[0.99] transition-all flex items-center justify-center gap-2 group shadow-xl shadow-blue-500/20">
                                            Get Detailed Quote
                                            <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
                                        </button>
                                        <div className="p-2 bg-blue-50/50 rounded-xl border border-blue-100/50">
                                            <p className="text-gray-500 text-[10px] leading-relaxed text-center">
                                                Indicative Internal Advisory Estimates based on IRDAI factors.
                                            </p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}
