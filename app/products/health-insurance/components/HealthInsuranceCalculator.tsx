'use client';

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Calculator, Users, Shield, ArrowRight, CheckCircle2 } from 'lucide-react';

const HealthInsuranceCalculator = () => {
    const [age, setAge] = useState('26-35');
    const [sumInsured, setSumInsured] = useState('₹10 Lakh');
    const [coverageType, setCoverageType] = useState('Individual');
    const [familyMembers, setFamilyMembers] = useState('2 Members');
    const [isCalculated, setIsCalculated] = useState(false);
    const [monthlyPremium, setMonthlyPremium] = useState(0);
    const [yearlyPremium, setYearlyPremium] = useState(0);

    const calculatePremium = () => {
        // Base premium for 18-25, 3L, Individual
        let base = 399;

        // Age Multiplier
        const ageMultipliers: { [key: string]: number } = {
            '18-25': 1.0, '26-35': 1.2, '36-45': 1.6, '46-55': 2.2, '56-65': 3.5, '65+': 5.0
        };

        // Sum Insured Multiplier
        const sumMultipliers: { [key: string]: number } = {
            '₹5 Lakh': 1.0, '₹10 Lakh': 1.5, '₹20 Lakh': 2.2, '₹50 Lakh': 3.5, '₹1 Crore': 5.5, '₹2 Crore': 8.5, '₹3 Crore': 12.0
        };

        let result = base * (ageMultipliers[age] || 1) * (sumMultipliers[sumInsured] || 1);

        if (coverageType === 'Family Floater') {
            const memberCount = parseInt(familyMembers) || 2;
            result = result * (1.5 + (memberCount - 2) * 0.3);
        }

        setMonthlyPremium(Math.round(result));
        setYearlyPremium(Math.round(result * 11.2)); // Slight discount for yearly
        setIsCalculated(true);
    };

    return (
        <div className="w-full max-w-4xl mx-auto font-sans">
            <div className="bg-white rounded-xl shadow-2xl border border-gray-100 overflow-hidden relative group">
                {/* Content Container */}

                <div className="p-6 sm:p-12 relative z-10">
                    <div className="grid md:grid-cols-2 gap-8">
                        {/* Inputs */}
                        <div className="space-y-6">
                            <div>
                                <label className="block text-sm font-bold text-gray-700 mb-2 uppercase tracking-wider">Your Age</label>
                                <select
                                    className="w-full h-14 px-4 bg-gray-50 border border-gray-200 rounded-lg focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all outline-none text-gray-700 font-medium"
                                    value={age}
                                    onChange={(e) => setAge(e.target.value)}
                                >
                                    {['18-25', '26-35', '36-45', '46-55', '56-65', '65+'].map(a => (
                                        <option key={a} value={a}>{a}</option>
                                    ))}
                                </select>
                            </div>

                            <div>
                                <label className="block text-sm font-bold text-gray-700 mb-2 uppercase tracking-wider">Sum Insured</label>
                                <select
                                    className="w-full h-14 px-4 bg-gray-50 border border-gray-200 rounded-lg focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all outline-none text-gray-700 font-medium"
                                    value={sumInsured}
                                    onChange={(e) => setSumInsured(e.target.value)}
                                >
                                    {['₹5 Lakh', '₹10 Lakh', '₹20 Lakh', '₹50 Lakh', '₹1 Crore', '₹2 Crore', '₹3 Crore'].map(s => (
                                        <option key={s} value={s}>{s}</option>
                                    ))}
                                </select>
                            </div>

                            <div>
                                <label className="block text-sm font-bold text-gray-700 mb-4 uppercase tracking-wider">Coverage Type</label>
                                <div className="flex gap-4">
                                    {['Individual', 'Family Floater'].map(type => (
                                        <button
                                            key={type}
                                            onClick={() => setCoverageType(type)}
                                            className={`flex-1 h-14 rounded-lg font-bold transition-all border ${coverageType === type
                                                ? 'bg-primary border-primary text-white shadow-lg shadow-primary/20'
                                                : 'bg-white border-gray-200 text-gray-500 hover:border-primary/30 hover:bg-primary/5'
                                                }`}
                                        >
                                            {type}
                                        </button>
                                    ))}
                                </div>
                            </div>

                            <AnimatePresence>
                                {coverageType === 'Family Floater' && (
                                    <motion.div
                                        initial={{ opacity: 0, height: 0 }}
                                        animate={{ opacity: 1, height: 'auto' }}
                                        exit={{ opacity: 0, height: 0 }}
                                    >
                                        <label className="block text-sm font-bold text-gray-700 mb-2 uppercase tracking-wider">Family Members</label>
                                        <select
                                            className="w-full h-14 px-4 bg-gray-50 border border-gray-200 rounded-lg focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all outline-none text-gray-700 font-medium"
                                            value={familyMembers}
                                            onChange={(e) => setFamilyMembers(e.target.value)}
                                        >
                                            {['2 Members', '3 Members', '4 Members', '5+ Members'].map(m => (
                                                <option key={m} value={m}>{m}</option>
                                            ))}
                                        </select>
                                    </motion.div>
                                )}
                            </AnimatePresence>

                            <button
                                onClick={calculatePremium}
                                className="group relative w-full h-16 text-white rounded-xl font-bold text-lg shadow-lg hover:brightness-110 transform hover:-translate-y-0.5 transition-all duration-300 cursor-pointer overflow-hidden"
                                style={{ background: 'linear-gradient(to right, #2076C7, #1CADA3)' }}
                            >
                                <span className="relative z-10 flex items-center justify-center gap-3">
                                    CALCULATE PREMIUM
                                    <Calculator size={20} />
                                </span>
                            </button>
                        </div>

                        {/* Results */}
                        <div className="relative">
                            <div className="bg-gray-50/50 backdrop-blur-sm rounded-xl p-8 h-full border border-gray-100 flex flex-col justify-center border-dashed">
                                {!isCalculated ? (
                                    <div className="text-center space-y-4 py-12">
                                        <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto text-gray-300">
                                            <Shield size={32} />
                                        </div>
                                        <p className="text-gray-400 font-medium">Enter your details to see <br /> estimated premiums</p>
                                    </div>
                                ) : (
                                    <motion.div
                                        initial={{ opacity: 0, scale: 0.9 }}
                                        animate={{ opacity: 1, scale: 1 }}
                                        className="space-y-8"
                                    >
                                        <div className="text-center">
                                            <span className="inline-block px-4 py-1 bg-teal-100 text-teal-600 rounded-lg text-xs font-bold uppercase tracking-widest mb-4">
                                                Best Estimate
                                            </span>
                                            <h3 className="text-2xl font-bold uppercase tracking-tighter mb-2 text-gray-900">
                                                Your Estimated Premium
                                            </h3>
                                        </div>

                                        <div className="space-y-4">
                                            <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-100">
                                                <p className="text-gray-500 text-sm font-bold uppercase tracking-wider mb-1">Monthly Premium</p>
                                                <div className="flex items-baseline gap-1">
                                                    <span className="text-3xl font-bold text-[#2076C7]">₹{monthlyPremium.toLocaleString()}</span>
                                                    <span className="text-gray-400 text-sm font-medium">/month*</span>
                                                </div>
                                            </div>

                                            <div className="p-6 rounded-lg shadow-lg text-white"
                                                style={{ background: 'linear-gradient(to bottom right, #2076C7, #1CADA3, #2076C7)' }}
                                            >
                                                <p className="text-white/80 text-sm font-bold uppercase tracking-wider mb-1">Yearly Premium (Save ~7%)</p>
                                                <div className="flex items-baseline gap-1">
                                                    <span className="text-3xl font-extrabold text-white">₹{yearlyPremium.toLocaleString()}</span>
                                                    <span className="text-white/60 text-sm font-medium">/year*</span>
                                                </div>
                                            </div>
                                        </div>

                                        <button
                                            onClick={() => document.getElementById('plans-grid')?.scrollIntoView({ behavior: 'smooth' })}
                                            className="group relative w-full h-14 text-white rounded-xl font-bold tracking-widest shadow-lg hover:brightness-110 transform hover:-translate-y-0.5 transition-all duration-300 cursor-pointer active:scale-95 flex items-center justify-center gap-2 overflow-hidden"
                                            style={{ background: 'linear-gradient(to right, #2076C7, #1CADA3)' }}
                                        >
                                            <span className="relative z-10 flex items-center gap-2">
                                                VIEW DETAILED PLANS
                                                <ArrowRight size={18} />
                                            </span>
                                        </button>

                                        <p className="text-[10px] text-gray-400 text-center leading-tight">
                                            *This is an estimate. Final premium depends on medical history and underwriting.
                                        </p>
                                    </motion.div>
                                )}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default HealthInsuranceCalculator;
