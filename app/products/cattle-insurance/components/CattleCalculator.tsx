'use client';

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import toast from 'react-hot-toast';
import {
    IconCalculator,
    IconCheck,
    IconShieldCheck,
    IconArrowRight,
    IconArrowLeft,
    IconInfoCircle,
    IconStethoscope,
    IconClover,
    IconTargetArrow,
    IconActivity,
    IconCertificate,
    IconChevronUp,
    IconChevronDown
} from '@tabler/icons-react';

const LIVESTOCK_TYPES = [
    { id: 'cow', label: 'Cow', rate: 0.045, maxAge: 10, defaultIcon: '🐄', baseValue: 50000 },
    { id: 'buffalo', label: 'Buffalo', rate: 0.045, maxAge: 12, defaultIcon: '🐃', baseValue: 60000 },
    { id: 'bullock', label: 'Bullock', rate: 0.04, maxAge: 12, defaultIcon: '🐂', baseValue: 40000 },
    { id: 'goat', label: 'Goat/Sheep', rate: 0.05, maxAge: 7, defaultIcon: '🐐', baseValue: 8000 },
    { id: 'horse', label: 'Horse/Mule', rate: 0.05, maxAge: 15, defaultIcon: '🐎', baseValue: 70000 },
    { id: 'pig', label: 'Pig', rate: 0.06, maxAge: 6, defaultIcon: '🐖', baseValue: 15000 },
];

const SCHEMES = [
    { id: 'std', label: 'Standard Rate', subsidy: 0, desc: 'Full premium paid by owner' },
    { id: 'govt', label: 'Govt. Subsidized', subsidy: 0.5, desc: '50% Govt. contribution (BPL/SC/ST)' },
];

const ADD_ONS = [
    { id: 'ptd', label: 'PTD Cover', rate: 0.01, desc: 'Permanent Total Disability' },
    { id: 'surgical', label: 'Surgical Operations', rate: 0.005, desc: 'Coverage for operations' },
];

export default function CattleCalculator() {
    const [step, setStep] = useState(1);
    const [animal, setAnimal] = useState(LIVESTOCK_TYPES[0]);
    const [marketValue, setMarketValue] = useState(0);
    const [age, setAge] = useState(3);
    const [breedType, setBreedType] = useState('indigenous');
    const [purpose, setPurpose] = useState('');
    const [scheme, setScheme] = useState(SCHEMES[0]);
    const [selectedAddOns, setSelectedAddOns] = useState<string[]>([]);
    const [totalPremium, setTotalPremium] = useState(0);

    // Dynamic base value update on animal change
    useEffect(() => {
        setMarketValue(animal.baseValue);
        if (age > animal.maxAge) setAge(animal.maxAge);
    }, [animal]);

    // Calculation Logic
    useEffect(() => {
        let baseRate = animal.rate;

        // Age loading (older animals higher premium)
        if (age > animal.maxAge * 0.7) baseRate += 0.005;

        // Breed loading (Exotic/Cross higher risk)
        if (breedType === 'exotic') baseRate += 0.01;
        if (breedType === 'cross') baseRate += 0.005;

        // Purpose loading
        if (purpose === 'milch') baseRate += 0.005;
        if (purpose === 'breeding') baseRate += 0.01;

        let premium = marketValue * baseRate;

        // Add-ons
        selectedAddOns.forEach(id => {
            const addOn = ADD_ONS.find(a => a.id === id);
            if (addOn) premium += marketValue * addOn.rate;
        });

        // Apply subsidy
        premium = premium * (1 - scheme.subsidy);

        // 18% GST
        const finalPremium = Math.round(premium * 1.18);
        setTotalPremium(finalPremium);
    }, [animal, marketValue, age, scheme, selectedAddOns]);

    const nextStep = () => setStep(s => Math.min(3, s + 1));
    const prevStep = () => setStep(s => Math.max(1, s - 1));

    const toggleAddOn = (id: string) => {
        setSelectedAddOns(prev =>
            prev.includes(id) ? prev.filter(a => a !== id) : [...prev, id]
        );
    };

    return (
        <section className="py-20 relative overflow-hidden bg-[#fafcfe]" id="calculator">
            {/* Background Decor */}
            <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-primary-blue/5 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2" />
            <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-secondary-teal/5 rounded-full blur-3xl translate-y-1/2 -translate-x-1/2" />

            <div className="max-w-6xl mx-auto px-6 md:px-12 relative z-10">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="text-center mb-8"
                >
                    <span className="text-primary-blue font-bold tracking-widest uppercase text-[10px] md:text-xs">Estimate Premium</span>
                    <h2 className="text-3xl md:text-4xl font-extrabold mb-3 bg-linear-to-r from-[#2076C7] to-[#1CADA3] bg-clip-text text-transparent drop-shadow-sm">
                        Cattle Insurance Calculator
                    </h2>
                    <p className="text-xs md:text-sm text-slate-500 mt-2 max-w-xl mx-auto font-medium">
                        Quick premiums for livestock with real-time subsidy adjustments.
                    </p>
                </motion.div>

                {/* Progress Bar */}
                <div className="max-w-xs mx-auto mb-8 flex items-center justify-between relative px-2">
                    <div className="absolute top-1/2 left-0 w-full h-0.5 bg-slate-100 -translate-y-1/2 -z-10" />
                    {[1, 2, 3].map((num) => (
                        <div key={num} className="relative bg-[#fafcfe] p-1.5">
                            <div
                                className={`w-8 h-8 rounded-full flex items-center justify-center text-[10px] font-black transition-all duration-500 scale-90 md:scale-100 ${step >= num ? 'bg-linear-to-r from-[#2076C7] to-[#1CADA3] text-white shadow-lg' : 'bg-white text-slate-300 border-2 border-slate-100'
                                    }`}
                            >
                                {num}
                            </div>
                            <span className={`absolute top-full left-1/2 -translate-x-1/2 mt-2 text-[8px] font-black uppercase tracking-widest whitespace-nowrap ${step >= num ? 'text-primary-blue' : 'text-slate-300'
                                }`}>
                                {num === 1 ? 'Animal' : num === 2 ? 'Subsidies' : 'Quote'}
                            </span>
                        </div>
                    ))}
                </div>

                <div className="grid lg:grid-cols-2 gap-8 items-start max-w-5xl mx-auto">
                    {/* Input Container */}
                    <motion.div
                        initial={{ opacity: 0, x: -30 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        className="bg-white p-6 md:p-10 rounded-[2.5rem] shadow-[0_20px_60px_-15px_rgba(32,118,199,0.08)] border border-slate-100 min-h-[420px] md:min-h-[500px] flex flex-col justify-between font-sans"
                    >
                        <AnimatePresence mode="wait">
                            {step === 1 && (
                                <motion.div
                                    key="step1"
                                    initial={{ opacity: 0, x: 20 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    exit={{ opacity: 0, x: -20 }}
                                    className="space-y-12"
                                >
                                    <div>
                                        <label className="flex items-center gap-2 text-sm font-black text-slate-900 uppercase tracking-[0.1em] mb-4">
                                            <IconTargetArrow className="text-secondary-teal" size={18} />
                                            Select Livestock
                                        </label>
                                        <div className="relative">
                                            <select
                                                value={animal.id}
                                                onChange={(e) => {
                                                    const selected = LIVESTOCK_TYPES.find(t => t.id === e.target.value);
                                                    if (selected) setAnimal(selected);
                                                }}
                                                className="w-full pl-5 pr-12 py-4 bg-slate-50 border border-slate-200 rounded-2xl font-bold text-slate-700 focus:border-secondary-teal/40 focus:bg-white outline-none transition-all text-sm appearance-none cursor-pointer shadow-sm hover:border-slate-300"
                                            >
                                                {LIVESTOCK_TYPES.map((type) => (
                                                    <option key={type.id} value={type.id} className="font-bold py-2">
                                                        {type.label}
                                                    </option>
                                                ))}
                                            </select>
                                            <div className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none text-slate-400">
                                                <IconChevronDown size={18} strokeWidth={3} />
                                            </div>
                                        </div>
                                    </div>

                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                                        <div>
                                            <label className="flex items-center gap-2 text-sm font-black text-slate-900 uppercase tracking-[0.1em] mb-4">
                                                <IconClover className="text-primary-blue" size={18} />
                                                Market Value (₹)
                                            </label>
                                            <div className="relative group">
                                                <input
                                                    type="text"
                                                    inputMode="numeric"
                                                    value={marketValue}
                                                    onChange={(e) => setMarketValue(Number(e.target.value.replace(/\D/g, '')))}
                                                    className="w-full pl-4 pr-12 py-4 bg-slate-50 border border-slate-200 rounded-2xl font-black text-slate-700 focus:border-primary-blue/30 outline-none transition-all text-sm hover:border-slate-300"
                                                />
                                                <div className="absolute right-3 top-1/2 -translate-y-1/2 flex flex-col items-center">
                                                    <button
                                                        onClick={() => setMarketValue(marketValue + 1000)}
                                                        className="p-1 text-slate-300 hover:text-primary-blue transition-colors"
                                                    >
                                                        <IconChevronUp size={14} stroke={5} />
                                                    </button>
                                                    <button
                                                        onClick={() => setMarketValue(Math.max(1000, marketValue - 1000))}
                                                        className="p-1 text-slate-300 hover:text-primary-blue transition-colors"
                                                    >
                                                        <IconChevronDown size={14} stroke={5} />
                                                    </button>
                                                </div>
                                            </div>
                                        </div>
                                        <div>
                                            <label className="flex items-center gap-2 text-sm font-black text-slate-900 uppercase tracking-[0.1em] mb-4">
                                                <IconActivity className="text-primary-blue" size={18} />
                                                Age
                                            </label>
                                            <div className="flex items-center gap-4">
                                                <div className="flex-grow relative flex items-center h-12">
                                                    <input
                                                        type="range"
                                                        min="1"
                                                        max="100"
                                                        value={age}
                                                        onChange={(e) => setAge(Number(e.target.value))}
                                                        className="w-full accent-primary-blue scale-100 cursor-pointer"
                                                    />
                                                </div>
                                                <div className="flex items-center gap-2 shrink-0 bg-blue-50/50 border border-blue-100 p-2 rounded-2xl min-w-[60px] justify-center">
                                                    <span className="w-8 text-center font-black text-primary-blue text-xs">{age}</span>
                                                    <div className="flex flex-col">
                                                        <button
                                                            onClick={() => setAge(Math.min(100, age + 1))}
                                                            className="text-slate-300 hover:text-primary-blue transition-colors leading-[0]"
                                                        >
                                                            <IconChevronUp size={14} stroke={4} />
                                                        </button>
                                                        <button
                                                            onClick={() => setAge(Math.max(1, age - 1))}
                                                            className="text-slate-300 hover:text-primary-blue transition-colors leading-[0]"
                                                        >
                                                            <IconChevronDown size={14} stroke={4} />
                                                        </button>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>

                                    <div>
                                        <label className="flex items-center gap-2 text-sm font-black text-slate-900 uppercase tracking-[0.1em] mb-4">
                                            <IconShieldCheck className="text-secondary-teal" size={18} />
                                            Breed Type
                                        </label>
                                        <div className="relative">
                                            <select
                                                value={breedType}
                                                onChange={(e) => setBreedType(e.target.value)}
                                                className="w-full pl-5 pr-12 py-4 bg-slate-50 border border-slate-200 rounded-2xl font-bold text-slate-700 focus:border-secondary-teal/40 focus:bg-white outline-none transition-all text-sm appearance-none cursor-pointer shadow-sm hover:border-slate-300"
                                            >
                                                <option value="indigenous">Indigenous / Desi</option>
                                                <option value="cross">Cross-Breed</option>
                                                <option value="exotic">Exotic / Foreign Breed</option>
                                            </select>
                                            <div className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none text-slate-400">
                                                <IconChevronDown size={18} strokeWidth={3} />
                                            </div>
                                        </div>
                                    </div>

                                    <div>
                                        <label className="flex items-center gap-2 text-sm font-black text-slate-900 uppercase tracking-[0.1em] mb-4">
                                            <IconCertificate className="text-primary-blue" size={18} />
                                            Usage Purpose
                                        </label>
                                        <div className="relative">
                                            <select
                                                value={purpose}
                                                onChange={(e) => setPurpose(e.target.value)}
                                                className={`w-full pl-5 pr-12 py-4 border rounded-2xl font-bold outline-none transition-all text-sm appearance-none cursor-pointer shadow-sm ${purpose === ''
                                                    ? 'bg-red-50/30 border-red-100 text-slate-400'
                                                    : 'bg-slate-50 border-slate-200 text-slate-700 hover:border-slate-300'
                                                    }`}
                                            >
                                                <option value="" disabled>Select Purpose...</option>
                                                <option value="milch">Milch (Milk Production)</option>
                                                <option value="draught">Draught (Working/Ploughing)</option>
                                                <option value="breeding">Breeding / Stud</option>
                                            </select>
                                            <div className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none text-slate-400">
                                                <IconChevronDown size={18} strokeWidth={3} />
                                            </div>
                                        </div>
                                    </div>
                                </motion.div>
                            )}

                            {step === 2 && (
                                <motion.div
                                    key="step2"
                                    initial={{ opacity: 0, x: 20 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    exit={{ opacity: 0, x: -20 }}
                                    className="space-y-10"
                                >
                                    <div>
                                        <label className="flex items-center gap-2 text-sm font-black text-slate-900 uppercase tracking-[0.1em] mb-4">
                                            <IconCertificate className="text-secondary-teal" size={18} />
                                            Benefit Schemes
                                        </label>
                                        <div className="grid grid-cols-1 gap-3">
                                            {SCHEMES.map((s) => (
                                                <button
                                                    key={s.id}
                                                    onClick={() => setScheme(s)}
                                                    className={`p-4.5 rounded-2xl border-2 text-left transition-all ${scheme.id === s.id
                                                        ? 'border-secondary-teal bg-teal-50 shadow-sm'
                                                        : 'border-slate-50 bg-slate-50/50 hover:border-slate-200'
                                                        }`}
                                                >
                                                    <div className="flex items-center justify-between">
                                                        <span className={`text-sm font-black ${scheme.id === s.id ? 'text-secondary-teal' : 'text-slate-700'}`}>{s.label}</span>
                                                        {scheme.id === s.id && <IconCheck size={18} className="text-secondary-teal" />}
                                                    </div>
                                                </button>
                                            ))}
                                        </div>
                                    </div>

                                    <div>
                                        <label className="flex items-center gap-2 text-sm font-black text-slate-900 uppercase tracking-[0.1em] mb-4">
                                            <IconStethoscope className="text-primary-blue" size={18} />
                                            Optional Add-ons
                                        </label>
                                        <div className="grid grid-cols-2 gap-3">
                                            {ADD_ONS.map((addOn) => (
                                                <button
                                                    key={addOn.id}
                                                    onClick={() => toggleAddOn(addOn.id)}
                                                    className={`p-4 rounded-xl border-2 text-left transition-all ${selectedAddOns.includes(addOn.id)
                                                        ? 'border-primary-blue bg-blue-50/50'
                                                        : 'border-slate-50 bg-slate-50/30 hover:border-slate-200'
                                                        }`}
                                                >
                                                    <span className="text-[10px] font-black text-slate-700 block">{addOn.label}</span>
                                                </button>
                                            ))}
                                        </div>
                                    </div>
                                </motion.div>
                            )}

                            {step === 3 && (
                                <motion.div
                                    key="step3"
                                    initial={{ opacity: 0, scale: 0.95 }}
                                    animate={{ opacity: 1, scale: 1 }}
                                    className="flex flex-col items-center justify-center py-10 text-center space-y-8"
                                >
                                    <div className="w-20 h-20 bg-blue-50 rounded-full flex items-center justify-center text-primary-blue border border-blue-100 shadow-inner">
                                        <IconCalculator size={40} stroke={1.5} />
                                    </div>
                                    <div className="space-y-2">
                                        <h3 className="text-2xl font-black text-slate-900">Calculation Ready!</h3>
                                        <p className="text-xs font-bold text-slate-400 px-6 max-w-xs mx-auto">Click proceed to confirm your Infinity cattle insurance policy.</p>
                                    </div>
                                    <div className="w-full max-w-[240px] p-6 bg-slate-50/50 rounded-[2rem] border border-dashed border-slate-200 shadow-sm">
                                        <div className="text-[10px] font-black uppercase tracking-widest text-slate-400 mb-2">Estimated Premium</div>
                                        <div className="text-4xl font-black text-slate-900">₹{totalPremium.toLocaleString()}</div>
                                        <div className="text-[10px] font-black text-[#1CADA3] mt-2 uppercase tracking-tight">Incl. 18% GST</div>
                                    </div>
                                </motion.div>
                            )}
                        </AnimatePresence>

                        <div className="mt-5 flex gap-2 pt-4 border-t border-slate-50">
                            {step > 1 && (
                                <button
                                    onClick={prevStep}
                                    className="w-12 h-12 rounded-lg bg-slate-50 text-slate-400 flex items-center justify-center hover:bg-slate-100 transition-colors border border-slate-100"
                                >
                                    <IconArrowLeft size={18} />
                                </button>
                            )}
                            <button
                                onClick={() => {
                                    if (step === 1) {
                                        if (marketValue <= 0) {
                                            toast.error('Please enter Market Value');
                                            return;
                                        }
                                        if (purpose === '') {
                                            toast.error('Please select Usage Purpose');
                                            return;
                                        }
                                    }

                                    if (step < 3) {
                                        nextStep();
                                    } else {
                                        toast.success('Quote Confirmed!');
                                        document.getElementById('coverage')?.scrollIntoView({ behavior: 'smooth' });
                                    }
                                }}
                                disabled={step === 1 && (marketValue <= 0 || purpose === '')}
                                className={`flex-grow py-3 text-white font-black rounded-lg shadow-md transition-all flex items-center justify-center gap-2 tracking-widest uppercase text-[9px] ${step === 1 && (marketValue <= 0 || purpose === '')
                                    ? 'bg-slate-300 cursor-not-allowed opacity-60'
                                    : 'bg-linear-to-r from-[#2076C7] to-[#1CADA3] hover:scale-[1.01] active:scale-[0.99]'
                                    }`}
                            >
                                {step === 3 ? 'Proceed' : 'Continue'}
                                <IconArrowRight size={14} />
                            </button>
                        </div>
                    </motion.div>

                    {/* Right: Summary Visual */}
                    <motion.div
                        initial={{ opacity: 0, x: 30 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        className="lg:sticky lg:top-24 space-y-4"
                    >
                        <div className="bg-white p-6 md:p-10 rounded-[2.5rem] text-slate-800 shadow-[0_15px_40px_-10px_rgba(32,118,199,0.08)] border border-slate-100 relative overflow-hidden group">
                            <div className="absolute top-0 right-0 p-8 opacity-[0.03] scale-150 transition-transform duration-1000">
                                <IconShieldCheck size={140} className="text-slate-200" />
                            </div>

                            <div className="relative z-10">
                                <span className="text-[10px] font-black tracking-[0.4em] text-slate-400 uppercase mb-6 block">Live Evaluation</span>

                                <div className="space-y-6 font-sans">
                                    <div className="flex items-baseline gap-2">
                                        <span className="text-5xl md:text-7xl font-black tracking-tighter text-slate-800">₹{totalPremium.toLocaleString()}</span>
                                        <span className="text-[11px] font-bold text-slate-400 uppercase tracking-widest">Total</span>
                                    </div>

                                    <div className="grid grid-cols-1 gap-2">
                                        <div className="bg-slate-50/50 border border-slate-100 p-3 rounded-xl flex items-center justify-between">
                                            <div>
                                                <p className="text-[8px] font-black text-slate-400 uppercase tracking-widest mb-0.5">Livestock</p>
                                                <p className="text-sm font-black text-slate-800">{animal.label}</p>
                                            </div>
                                            <div className="text-2xl font-black text-secondary-teal/20 pointer-events-none">
                                                <IconShieldCheck size={32} />
                                            </div>
                                        </div>

                                        <div className="grid grid-cols-2 gap-2">
                                            <div className="bg-slate-50/50 border border-slate-100 p-3 rounded-xl">
                                                <p className="text-[8px] font-black text-slate-400 uppercase tracking-widest mb-0.5">Value</p>
                                                <p className="text-sm font-black text-slate-800">₹{(marketValue / 1000).toFixed(0)}k</p>
                                            </div>
                                            <div className="bg-slate-50/50 border border-slate-100 p-3 rounded-xl">
                                                <p className="text-[8px] font-black text-slate-400 uppercase tracking-widest mb-0.5">Purpose</p>
                                                <p className="text-sm font-black text-slate-800 capitalize">{purpose || '---'}</p>
                                            </div>
                                        </div>

                                        <div className="grid grid-cols-1 gap-2">
                                            <div className="bg-slate-50/50 border border-slate-100 p-3 rounded-xl">
                                                <p className="text-[8px] font-black text-slate-400 uppercase tracking-widest mb-0.5">Subsidy</p>
                                                <p className="text-sm font-black text-[#1CADA3]">{scheme.subsidy * 100}%</p>
                                            </div>
                                        </div>
                                    </div>

                                    <div className="pt-5 border-t border-slate-100 flex items-center gap-3">
                                        <div className="flex -space-x-2">
                                            {[1, 2].map(i => (
                                                <div key={i} className="w-8 h-8 rounded-full border-2 border-white bg-linear-to-br from-[#2076C7] to-[#1CADA3] flex items-center justify-center text-[7px] font-black text-white">PB</div>
                                            ))}
                                        </div>
                                        <p className="text-[9px] font-bold text-slate-400 leading-tight">
                                            Verified by IRDA standardized logic.
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="bg-blue-50/50 p-4 rounded-[1.5rem] border border-blue-100/50 shadow-lg flex items-start gap-3">
                            <div className="w-10 h-10 bg-white rounded-xl shadow-sm flex items-center justify-center shrink-0 border border-blue-50">
                                <IconInfoCircle className="text-primary-blue" size={20} />
                            </div>
                            <div>
                                <h4 className="text-xs font-black text-slate-800 mb-0.5">Disclaimer</h4>
                                <p className="text-[9px] text-slate-500 font-bold leading-tight">
                                    Indicative rates; final premium subject to physical verification.
                                </p>
                            </div>
                        </div>
                    </motion.div>
                </div>
            </div>
        </section>
    );
}
