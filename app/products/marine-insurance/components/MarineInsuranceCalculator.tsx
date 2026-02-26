'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Calculator, Shield, ArrowRight, Ship, Box, AlertCircle, IndianRupee, Info } from 'lucide-react';

const MarineInsuranceCalculator = () => {
    const [cargoValue, setCargoValue] = useState(1000000); // 10 Lakh default
    const [transportMode, setTransportMode] = useState('Sea');
    const [cargoType, setCargoType] = useState('Normal');
    const [packagingType, setPackagingType] = useState('Standard');
    const [isCalculated, setIsCalculated] = useState(false);
    const [estimatedPremium, setEstimatedPremium] = useState(0);

    const calculatePremium = () => {
        // Base rate: 0.1% of cargo value
        let rate = 0.001;

        // Mode of transport multiplier
        const modeModifiers: { [key: string]: number } = {
            'Sea': 1.0,
            'Air': 0.8, // Faster, safer (usually lower rate)
            'Road': 1.2,
            'Rail': 1.1
        };

        // Cargo type multiplier
        const typeModifiers: { [key: string]: number } = {
            'Fragile': 1.5,
            'Normal': 1.0,
            'Heavy': 1.3,
            'Hazardous': 2.5
        };

        // Packaging multiplier
        const packModifiers: { [key: string]: number } = {
            'Standard': 1.0,
            'Premium': 0.9,
            'Custom': 1.2
        };

        rate = rate * (modeModifiers[transportMode] || 1) * (typeModifiers[cargoType] || 1) * (packModifiers[packagingType] || 1);

        const result = cargoValue * rate;
        setEstimatedPremium(Math.round(result));
        setIsCalculated(true);
    };

    return (
        <div className="w-full max-w-6xl mx-auto font-sans">
            <div className="bg-white rounded-2xl shadow-xl overflow-hidden max-w-6xl mx-auto border border-gray-100">
                <div className="bg-gradient-to-r from-[#2076C7] to-[#1CADA3] text-white py-8 px-8 text-center">
                    <h1 className="text-3xl font-bold mb-2 uppercase tracking-tight">Marine Insurance Premium Estimator</h1>
                    <p className="text-blue-100 font-medium">Get an instant estimate for your cargo protection</p>
                </div>

                <div className="flex flex-col lg:flex-row p-6 lg:p-10">
                    {/* Inputs Section */}
                    <div className="flex-1 min-w-0 lg:pr-10 lg:border-r border-gray-100">
                        <div className="space-y-8">
                            <div>
                                <label className="block text-blue-800 font-semibold mb-3">Value of Goods (₹)</label>
                                <div className="relative">
                                    <IndianRupee className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
                                    <input
                                        type="number"
                                        className="w-full h-14 pl-12 pr-4 bg-gray-50 border border-gray-200 rounded-lg focus:bg-white focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all outline-none text-gray-700 font-bold"
                                        value={cargoValue}
                                        onChange={(e) => setCargoValue(Number(e.target.value))}
                                        placeholder="Enter value of goods"
                                    />
                                </div>
                            </div>

                            <div className="grid grid-cols-2 gap-6">
                                <div>
                                    <label className="block text-blue-800 font-semibold mb-3">Transport Mode</label>
                                    <select
                                        className="w-full h-14 px-4 bg-gray-50 border border-gray-200 rounded-lg focus:bg-white focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all outline-none text-gray-700 font-bold appearance-none cursor-pointer"
                                        value={transportMode}
                                        onChange={(e) => setTransportMode(e.target.value)}
                                    >
                                        {['Sea', 'Air', 'Road', 'Rail'].map(m => (
                                            <option key={m} value={m}>{m}</option>
                                        ))}
                                    </select>
                                </div>
                                <div>
                                    <label className="block text-blue-800 font-semibold mb-3">Cargo Type</label>
                                    <select
                                        className="w-full h-14 px-4 bg-gray-50 border border-gray-200 rounded-lg focus:bg-white focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all outline-none text-gray-700 font-bold appearance-none cursor-pointer"
                                        value={cargoType}
                                        onChange={(e) => setCargoType(e.target.value)}
                                    >
                                        {['Normal', 'Fragile', 'Heavy', 'Hazardous'].map(t => (
                                            <option key={t} value={t}>{t}</option>
                                        ))}
                                    </select>
                                </div>
                            </div>

                            <div>
                                <label className="block text-blue-800 font-semibold mb-3">Packaging Type</label>
                                <div className="flex gap-3">
                                    {['Standard', 'Premium', 'Custom'].map(type => (
                                        <button
                                            key={type}
                                            onClick={() => setPackagingType(type)}
                                            className={`flex-1 h-12 rounded-lg font-bold text-xs transition-all border ${packagingType === type
                                                ? 'bg-[#1CADA3] border-[#1CADA3] text-white shadow-lg'
                                                : 'bg-white border-gray-200 text-gray-500 hover:border-[#1CADA3]/30'
                                                }`}
                                        >
                                            {type}
                                        </button>
                                    ))}
                                </div>
                            </div>

                            <button
                                onClick={calculatePremium}
                                className="w-full h-16 text-white rounded-lg font-bold tracking-widest text-lg shadow-lg hover:brightness-110 transform hover:-translate-y-0.5 transition-all duration-300 flex items-center justify-center gap-3 overflow-hidden mt-4"
                                style={{ background: 'linear-gradient(to right, #2076C7, #1CADA3)' }}
                            >
                                ESTIMATE PREMIUM
                                <Calculator size={20} />
                            </button>
                        </div>
                    </div>

                    {/* Results Section */}
                    <div className="flex-1 min-w-0 lg:pl-10 mt-10 lg:mt-0">
                        <div className="h-full flex flex-col justify-center">
                            {!isCalculated ? (
                                <div className="bg-gray-50/50 rounded-2xl p-10 py-16 border border-gray-100 border-dashed text-center space-y-4">
                                    <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto text-gray-300">
                                        <Shield size={32} />
                                    </div>
                                    <p className="text-gray-400 font-bold text-sm uppercase tracking-widest">Enter details to see <br /> estimated premium</p>
                                </div>
                            ) : (
                                <motion.div
                                    initial={{ opacity: 0, scale: 0.95 }}
                                    animate={{ opacity: 1, scale: 1 }}
                                    className="space-y-8"
                                >
                                    <div className="bg-gray-50 p-8 rounded-xl shadow-sm border-l-4 border-[#1CADA3] text-center">
                                        <div className="text-5xl font-bold text-[#1CADA3] mb-4">
                                            ₹{estimatedPremium.toLocaleString()}
                                        </div>
                                        <p className="text-[#1CADA3] text-sm font-bold uppercase tracking-widest">Estimated Policy Premium</p>
                                    </div>

                                    <div className="bg-gray-50 p-6 rounded-xl shadow-sm border-l-4 border-blue-700">
                                        <h5 className="text-blue-800 font-semibold mb-4 text-lg">Detailed Breakdown</h5>
                                        <div className="space-y-4">
                                            <div className="flex justify-between pb-3 border-b border-gray-200">
                                                <span className="text-gray-600 font-medium">Cargo Value</span>
                                                <span className="font-bold text-[#1CADA3]">₹{cargoValue.toLocaleString()}</span>
                                            </div>
                                            <div className="flex justify-between pb-3 border-b border-gray-200 text-[10px] uppercase tracking-wider font-bold">
                                                <span className="text-gray-400">Rate applied</span>
                                                <span className="text-[#2076C7]">Market Average</span>
                                            </div>
                                            <div className="flex items-center gap-3 p-3 bg-amber-50 rounded-lg border border-amber-100">
                                                <AlertCircle className="text-amber-500 shrink-0" size={16} />
                                                <p className="text-[9px] text-amber-700 font-bold leading-relaxed uppercase tracking-wider">
                                                    Subject to Port Risks & Actual Weight
                                                </p>
                                            </div>
                                        </div>
                                    </div>

                                    <button
                                        onClick={() => document.getElementById('plans-grid')?.scrollIntoView({ behavior: 'smooth' })}
                                        className="w-full h-14 text-white rounded-lg font-bold tracking-widest text-xs shadow-lg hover:brightness-110 active:scale-95 transition-all flex items-center justify-center gap-2"
                                        style={{ background: 'linear-gradient(to right, #2076C7, #1CADA3)' }}
                                    >
                                        VIEW DETAILED COVERS
                                        <ArrowRight size={16} />
                                    </button>
                                </motion.div>
                            )}
                        </div>
                    </div>
                </div>
            </div>

            {/* Disclaimer Section */}
            <div className="mt-8 p-6 bg-gray-50/50 rounded-2xl border border-gray-100 border-dashed">
                <div className="flex gap-4">
                    <div className="w-10 h-10 rounded-xl bg-gray-100 flex items-center justify-center text-gray-400 shrink-0">
                        <Info size={20} />
                    </div>
                    <div>
                        <h4 className="text-xs font-bold text-gray-900 uppercase tracking-widest mb-2">Disclaimer: Marine Insurance Premium Estimator</h4>
                        <p className="text-[10px] text-gray-500 font-bold leading-relaxed uppercase tracking-wider">
                            The premiums generated by this tool are indicative estimates based on standard market rates and general risk parameters. Actual policy premiums are subject to final underwriting by the insurance provider and may vary based on specific factors including but not limited to: precise nature of cargo, vessel age, voyage route, port congestion, historical claim data, and current global maritime risk indices. This estimate does not constitute a formal offer of insurance.
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default MarineInsuranceCalculator;
