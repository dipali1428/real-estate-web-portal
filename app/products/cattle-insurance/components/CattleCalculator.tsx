'use client';

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import toast from 'react-hot-toast';
import {
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
    IconChevronDown
} from '@tabler/icons-react';
import {
    PieChart, Pie, Cell, ResponsiveContainer, Tooltip, Legend
} from 'recharts';
import { useModal } from '../../../context/ModalContext';

type CattleCalculatorProps = {
    isDashboard?: boolean;
    onShowPlans?: () => void;
};

const LIVESTOCK_TYPES = [
    { id: 'cow', label: 'Cow', rate: 0.045, maxAge: 10, baseValue: 50000 },
    { id: 'buffalo', label: 'Buffalo', rate: 0.045, maxAge: 12, baseValue: 60000 },
    { id: 'bullock', label: 'Bullock', rate: 0.04, maxAge: 12, baseValue: 40000 },
    { id: 'goat', label: 'Goat/Sheep', rate: 0.05, maxAge: 7, baseValue: 8000 },
    { id: 'horse', label: 'Horse/Mule', rate: 0.05, maxAge: 15, baseValue: 70000 },
    { id: 'pig', label: 'Pig', rate: 0.06, maxAge: 6, baseValue: 15000 },
];

const SCHEMES = [
    { id: 'std', label: 'Standard Rate', subsidy: 0, desc: 'Full premium paid by owner' },
    { id: 'govt', label: 'Govt. Subsidized', subsidy: 0.5, desc: '50% Govt. contribution (BPL/SC/ST)' },
];

const ADD_ONS = [
    { id: 'ptd', label: 'PTD Cover', rate: 0.01, desc: 'Permanent Total Disability' },
    { id: 'surgical', label: 'Surgical Operations', rate: 0.005, desc: 'Coverage for operations' },
];

const COLORS = ['#2076C7', '#1CADA3'];

const fmt = (n: number) => new Intl.NumberFormat('en-IN', { maximumFractionDigits: 0 }).format(n);

const getSliderStyle = (value: number, min: number, max: number) => {
    const percentage = ((value - min) / (max - min)) * 100;
    return {
        background: `linear-gradient(to right, #2076C7 0%, #1CADA3 ${percentage}%, #f1f5f9 ${percentage}%, #f1f5f9 100%)`
    };
};

export default function CattleCalculator({
    isDashboard = false,
    onShowPlans,
}: CattleCalculatorProps) {
    const { openLogin } = useModal();
    const [step, setStep] = useState(1);
    const [animal, setAnimal] = useState(LIVESTOCK_TYPES[0]);
    const [marketValue, setMarketValue] = useState(0);
    const [age, setAge] = useState(3);
    const [breedType, setBreedType] = useState('indigenous');
    const [purpose, setPurpose] = useState('');
    const [scheme, setScheme] = useState(SCHEMES[0]);
    const [selectedAddOns, setSelectedAddOns] = useState<string[]>([]);
    const [totalPremium, setTotalPremium] = useState(0);

    useEffect(() => {
        setMarketValue(animal.baseValue);
        if (age > animal.maxAge) setAge(animal.maxAge);
    }, [animal]);

    useEffect(() => {
        let baseRate = animal.rate;
        if (age > animal.maxAge * 0.7) baseRate += 0.005;
        if (breedType === 'exotic') baseRate += 0.01;
        if (breedType === 'cross') baseRate += 0.005;
        if (purpose === 'milch') baseRate += 0.005;
        if (purpose === 'breeding') baseRate += 0.01;

        let premium = marketValue * baseRate;
        selectedAddOns.forEach(id => {
            const addOn = ADD_ONS.find(a => a.id === id);
            if (addOn) premium += marketValue * addOn.rate;
        });
        premium = premium * (1 - scheme.subsidy);
        setTotalPremium(Math.round(premium * 1.18));
    }, [animal, marketValue, age, breedType, purpose, scheme, selectedAddOns]);

    const nextStep = () => setStep(s => Math.min(3, s + 1));
    const prevStep = () => setStep(s => Math.max(1, s - 1));

    const toggleAddOn = (id: string) => {
        setSelectedAddOns(prev => prev.includes(id) ? prev.filter(a => a !== id) : [...prev, id]);
    };

    const ownerPremium = Math.round(totalPremium);
    const subsidyAmount = Math.round((marketValue * animal.rate) * scheme.subsidy * 1.18);
    const chartData = [
        { name: 'Owner Premium', value: ownerPremium },
        { name: 'Govt. Subsidy', value: subsidyAmount > 0 ? subsidyAmount : 1 },
    ];

    return (
        <section className="py-8 bg-white relative overflow-hidden" id="calculator">
            <div className="max-w-7xl mx-auto px-6">
                <div className="bg-white rounded-[2.5rem] shadow-[0_40px_100px_-20px_rgba(0,0,0,0.1)] border border-slate-100 overflow-hidden">

                    {/* Header */}
                    <div className="bg-white border-b border-slate-50 py-10 px-6 text-center">
                        <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
                            <h2 className="text-3xl md:text-4xl font-extrabold mb-6 bg-linear-to-r from-[#2076C7] to-[#1CADA3] bg-clip-text text-transparent drop-shadow-sm tracking-tight leading-tight">
                                Cattle Insurance Calculator
                            </h2>

                            <p className="text-gray-600 max-w-2xl mx-auto font-medium text-base md:text-lg leading-relaxed">
                                Quick premiums for livestock with real-time subsidy adjustments.
                            </p>
                        </motion.div>
                    </div>

                    <div className="p-6 lg:p-10">
                        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">

                            {/* Left Column: Controls */}
                            <div className="space-y-8 lg:pr-8 lg:border-r border-slate-100">
                                {/* Step Indicator */}
                                <div className="relative flex justify-between items-center max-w-xs mx-auto mb-4 w-full px-2">
                                    <div className="absolute top-1/2 left-0 right-0 h-[2px] bg-slate-200 -translate-y-1/2" />
                                    <div className="absolute top-1/2 left-0 h-[3px] bg-gradient-to-r from-[#2076C7] to-[#1CADA3] transition-all duration-500 -translate-y-1/2" style={{ width: `${((step - 1) / 2) * 100}%` }} />
                                    {[1, 2, 3].map(n => (
                                        <div key={n} className={`relative z-10 w-10 h-10 rounded-full flex items-center justify-center font-black text-sm transition-all border-4 border-white ${step >= n ? 'bg-gradient-to-br from-[#2076C7] to-[#1CADA3] text-white shadow-lg' : 'bg-slate-100 text-slate-300'}`}>{n}</div>
                                    ))}
                                </div>

                                <AnimatePresence mode="wait">
                                    {step === 1 && (
                                        <motion.div key="step1" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }} className="space-y-8">

                                            {/* Select Livestock */}
                                            <div className="space-y-4">
                                                <label className="block text-base md:text-lg font-extrabold text-[#2076C7]">
                                                    <span className="flex items-center gap-2"><IconTargetArrow size={20} />Select Livestock</span>
                                                </label>
                                                <div className="relative">
                                                    <select value={animal.id} onChange={(e) => { const selected = LIVESTOCK_TYPES.find(t => t.id === e.target.value); if (selected) setAnimal(selected); }} className="w-full pl-5 pr-12 py-4 bg-slate-50 border border-slate-200 rounded-2xl font-bold text-slate-700 focus:outline-none focus:ring-4 focus:ring-[#2076C7]/5 transition-all text-sm appearance-none cursor-pointer">
                                                        {LIVESTOCK_TYPES.map((type) => <option key={type.id} value={type.id}>{type.label}</option>)}
                                                    </select>
                                                    <div className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none text-slate-400"><IconChevronDown size={18} strokeWidth={3} /></div>
                                                </div>
                                            </div>

                                            {/* Market Value */}
                                            <div className="space-y-4">
                                                <label className="block text-base md:text-lg font-extrabold text-[#2076C7]">
                                                    <span className="flex items-center gap-2"><IconClover size={20} />Market Value (₹)</span>
                                                </label>
                                                <input
                                                    type="range"
                                                    min="1000"
                                                    max="500000"
                                                    step="1000"
                                                    value={marketValue}
                                                    onChange={(e) => setMarketValue(Number(e.target.value))}
                                                    className="w-full h-2 rounded-lg appearance-none cursor-pointer transition-all"
                                                    style={getSliderStyle(marketValue, 1000, 500000)}
                                                />
                                                <div className="flex justify-between text-xs md:text-sm font-bold text-slate-400">
                                                    <span>₹1,000</span><span>₹5,00,000</span>
                                                </div>
                                                <div className="flex items-center gap-2">
                                                    <div className="relative flex-grow">
                                                        <input type="number" value={marketValue} onChange={(e) => setMarketValue(Number(e.target.value))} className="w-full bg-slate-50 border border-slate-200 rounded-lg pl-4 pr-10 py-2.5 text-base font-extrabold text-slate-700 focus:outline-none focus:ring-4 focus:ring-[#2076C7]/5 transition-all text-center" />
                                                        <span className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-300 font-bold text-sm">₹</span>
                                                    </div>
                                                    <button onClick={() => setMarketValue(Math.max(1000, marketValue - 1000))} className="p-2 bg-slate-50 border border-slate-200 rounded-lg hover:bg-blue-50 hover:text-[#2076C7] transition-all">−</button>
                                                    <button onClick={() => setMarketValue(Math.min(500000, marketValue + 1000))} className="p-2 bg-slate-50 border border-slate-200 rounded-lg hover:bg-blue-50 hover:text-[#2076C7] transition-all">+</button>
                                                </div>
                                            </div>

                                            {/* Age */}
                                            <div className="space-y-4">
                                                <label className="block text-base md:text-lg font-extrabold text-[#2076C7]">
                                                    <span className="flex items-center gap-2"><IconActivity size={20} />Age (Years)</span>
                                                </label>
                                                <input
                                                    type="range"
                                                    min="1"
                                                    max={animal.maxAge}
                                                    step="1"
                                                    value={age}
                                                    onChange={(e) => setAge(Number(e.target.value))}
                                                    className="w-full h-2 rounded-lg appearance-none cursor-pointer transition-all"
                                                    style={getSliderStyle(age, 1, animal.maxAge)}
                                                />
                                                <div className="flex justify-between text-xs md:text-sm font-bold text-slate-400">
                                                    <span>1 Year</span><span>{animal.maxAge} Years</span>
                                                </div>
                                                <div className="flex items-center gap-2">
                                                    <div className="relative flex-grow">
                                                        <input type="number" value={age} onChange={(e) => setAge(Number(e.target.value))} className="w-full bg-slate-50 border border-slate-200 rounded-lg pl-4 pr-10 py-2.5 text-base font-extrabold text-slate-700 focus:outline-none focus:ring-4 focus:ring-[#2076C7]/5 transition-all text-center" />
                                                        <span className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-300 font-bold text-sm">Yr</span>
                                                    </div>
                                                    <button onClick={() => setAge(Math.max(1, age - 1))} className="p-2 bg-slate-50 border border-slate-200 rounded-lg hover:bg-blue-50 hover:text-[#2076C7] transition-all">−</button>
                                                    <button onClick={() => setAge(Math.min(animal.maxAge, age + 1))} className="p-2 bg-slate-50 border border-slate-200 rounded-lg hover:bg-blue-50 hover:text-[#2076C7] transition-all">+</button>
                                                </div>
                                            </div>

                                            {/* Breed Type */}
                                            <div className="space-y-4">
                                                <label className="block text-base md:text-lg font-extrabold text-[#2076C7]">
                                                    <span className="flex items-center gap-2"><IconShieldCheck size={20} />Breed Type</span>
                                                </label>
                                                <div className="relative">
                                                    <select value={breedType} onChange={(e) => setBreedType(e.target.value)} className="w-full pl-5 pr-12 py-4 bg-slate-50 border border-slate-200 rounded-2xl font-bold text-slate-700 focus:outline-none focus:ring-4 focus:ring-[#2076C7]/5 transition-all text-sm appearance-none cursor-pointer">
                                                        <option value="indigenous">Indigenous / Desi</option>
                                                        <option value="cross">Cross-Breed</option>
                                                        <option value="exotic">Exotic / Foreign Breed</option>
                                                    </select>
                                                    <div className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none text-slate-400"><IconChevronDown size={18} strokeWidth={3} /></div>
                                                </div>
                                            </div>

                                            {/* Usage Purpose */}
                                            <div className="space-y-4">
                                                <label className="block text-base md:text-lg font-extrabold text-[#2076C7]">
                                                    <span className="flex items-center gap-2"><IconCertificate size={20} />Usage Purpose</span>
                                                </label>
                                                <div className="relative">
                                                    <select value={purpose} onChange={(e) => setPurpose(e.target.value)} className={`w-full pl-5 pr-12 py-4 border rounded-2xl font-bold outline-none focus:ring-4 focus:ring-[#2076C7]/5 transition-all text-sm appearance-none cursor-pointer ${purpose === '' ? 'bg-red-50/30 border-red-100 text-slate-400' : 'bg-slate-50 border-slate-200 text-slate-700'}`}>
                                                        <option value="" disabled>Select Purpose...</option>
                                                        <option value="milch">Milch (Milk Production)</option>
                                                        <option value="draught">Draught (Working/Ploughing)</option>
                                                        <option value="breeding">Breeding / Stud</option>
                                                    </select>
                                                    <div className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none text-slate-400"><IconChevronDown size={18} strokeWidth={3} /></div>
                                                </div>
                                            </div>
                                        </motion.div>
                                    )}

                                    {step === 2 && (
                                        <motion.div key="step2" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }} className="space-y-8">
                                            {/* Benefit Schemes */}
                                            <div className="space-y-4">
                                                <label className="block text-base md:text-lg font-extrabold text-[#2076C7]">
                                                    <span className="flex items-center gap-2"><IconCertificate size={20} />Benefit Schemes</span>
                                                </label>
                                                <div className="grid grid-cols-1 gap-3">
                                                    {SCHEMES.map((s) => (
                                                        <button key={s.id} onClick={() => setScheme(s)} className={`p-5 rounded-2xl border-2 text-left transition-all ${scheme.id === s.id ? 'border-[#1CADA3] bg-teal-50' : 'border-slate-200 bg-slate-50 hover:border-slate-300'}`}>
                                                            <div className="flex items-center justify-between">
                                                                <div>
                                                                    <span className={`text-sm font-black ${scheme.id === s.id ? 'text-[#1CADA3]' : 'text-slate-700'}`}>{s.label}</span>
                                                                    <p className="text-xs text-slate-400 font-medium mt-1">{s.desc}</p>
                                                                </div>
                                                                {scheme.id === s.id && <IconCheck size={20} className="text-[#1CADA3] shrink-0" />}
                                                            </div>
                                                        </button>
                                                    ))}
                                                </div>
                                            </div>

                                            {/* Optional Add-ons */}
                                            <div className="space-y-4">
                                                <label className="block text-base md:text-lg font-extrabold text-[#2076C7]">
                                                    <span className="flex items-center gap-2"><IconStethoscope size={20} />Optional Add-ons</span>
                                                </label>
                                                <div className="grid grid-cols-2 gap-3">
                                                    {ADD_ONS.map((addOn) => (
                                                        <button key={addOn.id} onClick={() => toggleAddOn(addOn.id)} className={`p-5 rounded-xl border-2 text-left transition-all ${selectedAddOns.includes(addOn.id) ? 'border-[#2076C7] bg-blue-50' : 'border-slate-200 bg-slate-50 hover:border-slate-300'}`}>
                                                            <span className={`text-sm font-black block mb-1 ${selectedAddOns.includes(addOn.id) ? 'text-[#2076C7]' : 'text-slate-700'}`}>{addOn.label}</span>
                                                            <span className="text-xs text-slate-400 font-medium">{addOn.desc}</span>
                                                        </button>
                                                    ))}
                                                </div>
                                            </div>
                                        </motion.div>
                                    )}

                                    {step === 3 && (
                                        <motion.div key="step3" initial={{ opacity: 0, scale: 0.97 }} animate={{ opacity: 1, scale: 1 }} className="space-y-6">
                                            <div className="p-6 sm:p-8 rounded-[2.5rem] border-2 border-[#1CADA3]/20 bg-gradient-to-br from-[#1CADA3]/5 to-transparent text-center shadow-sm">
                                                <div className="text-sm font-black text-slate-400 uppercase tracking-widest mb-3">Estimated Annual Premium</div>
                                                <div className="text-5xl font-extrabold text-[#1CADA3] mb-4 tracking-tight">₹{fmt(totalPremium)}</div>
                                                <div className="text-xs font-bold text-slate-400">Incl. 18% GST</div>
                                            </div>
                                        </motion.div>
                                    )}
                                </AnimatePresence>

                                {/* Nav Buttons */}
                                <div className="flex gap-4 pt-4 border-t border-slate-100">
                                    <button onClick={prevStep} disabled={step === 1} className="w-14 h-14 bg-slate-50 border border-slate-200 rounded-xl flex items-center justify-center disabled:opacity-0 hover:bg-blue-50 hover:text-[#2076C7] transition-all">
                                        <IconArrowLeft size={20} />
                                    </button>
                                    <button
                                        onClick={() => {
                                            if (step === 1) {
                                                if (marketValue <= 0) { toast.error('Please enter Market Value'); return; }
                                                if (purpose === '') { toast.error('Please select Usage Purpose'); return; }
                                            }
                                            if (step < 3) { nextStep(); } else { toast.success('Quote Confirmed!'); document.getElementById('coverage')?.scrollIntoView({ behavior: 'smooth' }); }
                                        }}
                                        disabled={step === 1 && (marketValue <= 0 || purpose === '')}
                                        className={`flex-grow py-4 text-white font-black uppercase tracking-widest text-sm rounded-xl shadow-lg transition-all duration-300 flex items-center justify-center gap-3 ${step === 1 && (marketValue <= 0 || purpose === '') ? 'bg-slate-300 cursor-not-allowed' : 'bg-gradient-to-r from-[#2076C7] to-[#1CADA3] hover:shadow-[0_20px_40px_-10px_rgba(32,118,199,0.3)] hover:-translate-y-0.5'}`}
                                    >
                                        {step === 3 ? 'Confirm & Proceed' : 'Continue'}
                                        <IconArrowRight size={18} strokeWidth={3} />
                                    </button>
                                </div>

                                {/* Key Insights for Step 2 & 3 */}
                                <AnimatePresence>
                                    {step > 1 && (
                                        <motion.div
                                            initial={{ opacity: 0, y: 10 }}
                                            animate={{ opacity: 1, y: 0 }}
                                            exit={{ opacity: 0, y: 10 }}
                                            className="mt-8 p-6 bg-blue-50/50 rounded-2xl border border-blue-100/50 shadow-sm"
                                        >
                                            <h4 className="flex items-center gap-2 text-sm font-black text-[#2076C7] uppercase tracking-widest mb-4">
                                                <IconInfoCircle size={18} /> Key Insights
                                            </h4>
                                            <ul className="space-y-4">
                                                {step === 2 && (
                                                    <>
                                                        <li className="flex gap-3 text-xs md:text-sm font-medium text-slate-600 leading-relaxed">
                                                            <div className="w-5 h-5 bg-[#1CADA3] rounded-full flex items-center justify-center shrink-0 mt-0.5 shadow-sm text-white">
                                                                <IconCheck size={12} strokeWidth={4} />
                                                            </div>
                                                            <p><strong className="text-slate-900 block mb-0.5">Subsidy Benefit:</strong> Small/Marginal farmers and BPL/SC/ST categories can avail up to 50% premium subsidy.</p>
                                                        </li>
                                                        <li className="flex gap-3 text-xs md:text-sm font-medium text-slate-600 leading-relaxed">
                                                            <div className="w-5 h-5 bg-[#1CADA3] rounded-full flex items-center justify-center shrink-0 mt-0.5 shadow-sm text-white">
                                                                <IconCheck size={12} strokeWidth={4} />
                                                            </div>
                                                            <p><strong className="text-slate-900 block mb-0.5">Comprehensive Add-ons:</strong> PTD and Surgical Add-ons ensure coverage beyond simple death benefits.</p>
                                                        </li>
                                                    </>
                                                )}
                                                {step === 3 && (
                                                    <>
                                                        <li className="flex gap-3 text-xs md:text-sm font-medium text-slate-600 leading-relaxed">
                                                            <div className="w-5 h-5 bg-[#1CADA3] rounded-full flex items-center justify-center shrink-0 mt-0.5 shadow-sm text-white">
                                                                <IconCheck size={12} strokeWidth={4} />
                                                            </div>
                                                            <p><strong className="text-slate-900 block mb-0.5">Claim Readiness:</strong> Ensure tags are intact and vaccinations are up-to-date for smooth claim processing.</p>
                                                        </li>
                                                        <li className="flex gap-3 text-xs md:text-sm font-medium text-slate-600 leading-relaxed">
                                                            <div className="w-5 h-5 bg-[#1CADA3] rounded-full flex items-center justify-center shrink-0 mt-0.5 shadow-sm text-white">
                                                                <IconCheck size={12} strokeWidth={4} />
                                                            </div>
                                                            <p><strong className="text-slate-900 block mb-0.5">Indicative Quote:</strong> Final premium depends on health certificates and tag verification by the insurer.</p>
                                                        </li>
                                                        <li className="flex gap-3 text-xs md:text-sm font-medium text-slate-600 leading-relaxed">
                                                            <div className="w-5 h-5 bg-[#1CADA3] rounded-full flex items-center justify-center shrink-0 mt-0.5 shadow-sm text-white">
                                                                <IconCheck size={12} strokeWidth={4} />
                                                            </div>
                                                            <p><strong className="text-slate-900 block mb-0.5">No Claim Bonus:</strong> Stay claim-free and enjoy attractive discounts on your policy renewal premiums.</p>
                                                        </li>
                                                        <li className="flex gap-3 text-xs md:text-sm font-medium text-slate-600 leading-relaxed">
                                                            <div className="w-5 h-5 bg-[#1CADA3] rounded-full flex items-center justify-center shrink-0 mt-0.5 shadow-sm text-white">
                                                                <IconCheck size={12} strokeWidth={4} />
                                                            </div>
                                                            <p><strong className="text-slate-900 block mb-0.5">Natural Calamity Protection:</strong> Your livestock is protected against unforeseen events like floods, cyclones, and earthquakes.</p>
                                                        </li>
                                                        <li className="flex gap-3 text-xs md:text-sm font-medium text-slate-600 leading-relaxed">
                                                            <div className="w-5 h-5 bg-[#1CADA3] rounded-full flex items-center justify-center shrink-0 mt-0.5 shadow-sm text-white">
                                                                <IconCheck size={12} strokeWidth={4} />
                                                            </div>
                                                            <p><strong className="text-slate-900 block mb-0.5">Group Insurance Benefit:</strong> Cooperative societies and large dairy farms can avail special group discounts for bulk coverage.</p>
                                                        </li>
                                                    </>
                                                )}
                                            </ul>
                                        </motion.div>
                                    )}
                                </AnimatePresence>
                            </div>

                            {/* Right Column: Visuals & Summary */}
                            <div className="flex flex-col">
                                {/* Donut Chart */}
                                <div className="h-[240px] md:h-[280px] w-full mb-6 relative flex items-center justify-center">
                                    <ResponsiveContainer width="100%" height="100%">
                                        <PieChart>
                                            <Pie data={[{ value: 100 }]} cx="50%" cy="50%" innerRadius="70%" outerRadius="85%" fill="#f1f5f9" dataKey="value" stroke="none" isAnimationActive={false} />
                                            <Pie data={chartData} cx="50%" cy="50%" innerRadius="70%" outerRadius="85%" dataKey="value" stroke="none" animationDuration={1200}>
                                                {chartData.map((_, index) => (
                                                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                                                ))}
                                            </Pie>
                                            <Tooltip contentStyle={{ borderRadius: '1rem', border: 'none', boxShadow: '0 10px 30px rgba(0,0,0,0.1)' }} formatter={(value: any) => `₹${fmt(Number(value) || 0)}`} />
                                            <Legend verticalAlign="bottom" height={36} iconType="circle" formatter={(value) => <span className="text-xs md:text-sm font-bold text-slate-500 uppercase tracking-widest ml-1">{value}</span>} />
                                        </PieChart>
                                    </ResponsiveContainer>
                                    {/* Central Label */}
                                    <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none pb-8">
                                        <div className="text-sm font-black text-slate-400 uppercase tracking-widest mb-1">Your Premium</div>
                                        <div className="text-2xl font-black text-[#2076C7]">₹{fmt(totalPremium)}</div>
                                    </div>
                                </div>

                                {/* Summary Box */}
                                <div className="bg-slate-50/50 rounded-[2.5rem] border border-blue-100/50 p-6 sm:p-8 shadow-sm flex-grow flex flex-col">
                                    <div className="flex items-center gap-4 mb-6 border-l-4 border-[#2076C7] pl-5">
                                        <h3 className="text-2xl font-extrabold text-gray-700 tracking-tight">Premium Summary</h3>
                                    </div>
                                    <div className="space-y-4 mb-6">
                                        <div className="flex justify-between items-center py-2 border-b border-slate-100">
                                            <span className="text-sm font-bold text-slate-500">Livestock</span>
                                            <span className="text-base font-extrabold text-[#1CADA3]">{animal.label}</span>
                                        </div>
                                        <div className="flex justify-between items-center py-2 border-b border-slate-100">
                                            <span className="text-sm font-bold text-slate-500">Market Value</span>
                                            <span className="text-base font-extrabold text-[#1CADA3]">₹{fmt(marketValue)}</span>
                                        </div>
                                        <div className="flex justify-between items-center py-2 border-b border-slate-100">
                                            <span className="text-sm font-bold text-slate-500">Age</span>
                                            <span className="text-base font-extrabold text-[#1CADA3]">{age} Year{age > 1 ? 's' : ''}</span>
                                        </div>
                                        <div className="flex justify-between items-center py-2 border-b border-slate-100">
                                            <span className="text-sm font-bold text-slate-500">Purpose</span>
                                            <span className="text-base font-extrabold text-[#1CADA3] capitalize">{purpose || '—'}</span>
                                        </div>
                                        <div className="flex justify-between items-center py-2 border-b border-slate-100">
                                            <span className="text-sm font-bold text-slate-500">Govt. Subsidy</span>
                                            <span className="text-base font-extrabold text-[#1CADA3]">{scheme.subsidy * 100}%</span>
                                        </div>
                                        <div className="flex justify-between items-center py-2">
                                            <span className="text-sm font-bold text-slate-500">Total Premium (incl. GST)</span>
                                            <span className="text-lg md:text-xl font-extrabold text-[#1CADA3]">₹{fmt(totalPremium)}</span>
                                        </div>
                                    </div>

                                    <button
                                        onClick={openLogin}
                                        className="w-full mt-10 md:mt-12 group relative flex items-center justify-center gap-3 bg-gradient-to-r from-[#2076C7] to-[#1CADA3] text-white py-5 px-8 rounded-2xl font-black text-sm tracking-widest uppercase overflow-hidden shadow-[0_20px_40px_-15px_rgba(28,173,163,0.5)] hover:shadow-[0_20px_40px_-10px_rgba(28,173,163,0.6)] hover:-translate-y-1 transition-all duration-300"
                                    >
                                        Apply For Cattle Insurance
                                        <IconArrowRight size={16} className="inline-block ml-3 group-hover:translate-x-1.5 transition-transform" />
                                    </button>
                                </div>

                                {/* Disclaimer */}
                                <div className="mt-6 p-5 bg-yellow-50/50 border border-yellow-100 rounded-[1.5rem] flex items-start gap-3">
                                    <div className="w-8 h-8 bg-white rounded-xl shadow-sm flex items-center justify-center shrink-0 border border-blue-50">
                                        <IconInfoCircle className="text-[#2076C7]" size={18} />
                                    </div>
                                    <p className="text-xs md:text-sm leading-relaxed text-slate-500">
                                        * Indicative rates; final premium subject to physical verification by the insurer.
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <style>{`
                input[type='range']::-webkit-slider-thumb {
                    -webkit-appearance: none;
                    appearance: none;
                    width: 18px;
                    height: 18px;
                    background: #2076C7;
                    border: 3px solid #fff;
                    border-radius: 50%;
                    cursor: pointer;
                    box-shadow: 0 4px 8px rgba(32, 118, 199, 0.2);
                    transition: all 0.3s ease;
                }
                input[type='range']::-webkit-slider-thumb:hover {
                    transform: scale(1.15);
                    box-shadow: 0 5px 12px rgba(32, 118, 199, 0.3);
                }
                input::-webkit-outer-spin-button,
                input::-webkit-inner-spin-button {
                    -webkit-appearance: none;
                    margin: 0;
                }
                input[type=number] {
                    -moz-appearance: textfield;
                }
            `}</style>
        </section>
    );
}
