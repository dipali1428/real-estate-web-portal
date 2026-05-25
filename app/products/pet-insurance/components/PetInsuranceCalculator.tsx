'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import toast from 'react-hot-toast';
import {
    IconCheck, IconShieldCheck, IconArrowRight, IconArrowLeft, IconDog, IconCat, IconChevronDown, IconBolt, IconPaw, IconFeather
} from '@tabler/icons-react';
import {
    PieChart, Pie, Cell, ResponsiveContainer, Tooltip, Legend
} from 'recharts';
import Link from 'next/link';
import { useModal } from '../../../context/ModalContext';

// --- Pet Calculator Data ---
interface PetType {
    id: string;
    label: string;
    baseRate: number;
    icon: React.ElementType;
}

interface PetInsuranceCalculatorProps {
    isDashboard?: boolean;
    onShowPlans?: () => void;
}
const PET_TYPES: PetType[] = [
    { id: 'dog', label: 'Dog', baseRate: 299, icon: IconDog },
    { id: 'cat', label: 'Cat', baseRate: 199, icon: IconCat },
    { id: 'bird', label: 'Bird/Parrot', baseRate: 149, icon: IconFeather },
    { id: 'exotic', label: 'Exotic Pet', baseRate: 399, icon: IconPaw },
];

const BREED_OPTIONS: Record<string, string[]> = {
    dog: ['Labrador Retriever', 'German Shepherd', 'Golden Retriever', 'Pug', 'Beagle', 'Rottweiler', 'Rajapalayam', 'Mudhol Hound', 'Indian Spitz', 'Doberman', 'Mixed Breed', 'Other'],
    cat: ['Persian', 'Siamese', 'Maine Coon', 'British Shorthair', 'Indian Domestic', 'Mixed Breed', 'Other'],
    bird: ['Parrot', 'Cockatiel', 'Lovebird', 'Macaw', 'Budgerigar', 'Other'],
    exotic: ['Rabbit', 'Guinea Pig', 'Hamster', 'Turtle', 'Other'],
};

const AGE_GROUPS = [
    { label: 'Puppy/Kitten (< 1 yr)', multiplier: 1.2 },
    { label: 'Adult (1-7 yrs)', multiplier: 1.0 },
    { label: 'Senior (7+ yrs)', multiplier: 1.8 },
];

const SUM_INSURED_OPTIONS = [
    { label: '₹1 Lakh', value: 100000, factor: 1 },
    { label: '₹2 Lakhs', value: 200000, factor: 1.5 },
    { label: '₹5 Lakhs', value: 500000, factor: 2.2 },
];

const COLORS = ['#2076C7', '#1CADA3'];

const fmt = (n: number) => new Intl.NumberFormat('en-IN', { maximumFractionDigits: 0 }).format(n);

export default function PetInsuranceCalculator({
    isDashboard = false,
    onShowPlans
}: PetInsuranceCalculatorProps) {
    const { openLogin } = useModal();
    const [step, setStep] = useState(1);
    const [petName, setPetName] = useState('');
    const [petType, setPetType] = useState(PET_TYPES[0]);
    const [petSubType, setPetSubType] = useState('');
    const [ageGroup, setAgeGroup] = useState(AGE_GROUPS[1]);
    const [sumInsured, setSumInsured] = useState(SUM_INSURED_OPTIONS[0]);
    const [hasOPD, setHasOPD] = useState(false);
    const [showPlans, setShowPlans] = useState(false);

    const baseCalculated = petType.baseRate * ageGroup.multiplier * sumInsured.factor;
    const premiumWithAddons = hasOPD ? baseCalculated * 1.3 : baseCalculated;
    const totalPremium = Math.round(premiumWithAddons * 1.18);

    const nextStep = () => setStep(s => Math.min(3, s + 1));
    const prevStep = () => setStep(s => Math.max(1, s - 1));

    const isStepValid = () => {
        if (step === 1) return petName.trim() !== '';
        return true;
    };

    const basePremium = Math.round(totalPremium / 1.18);
    const gstAmount = totalPremium - basePremium;
    const chartData = [
        { name: 'Base Premium', value: basePremium },
        { name: 'GST (18%)', value: gstAmount },
    ];

    return (
        <>
            <section id="calculator" className={`py-10 md:py-10 bg-slate-50 relative overflow-hidden ${isDashboard ? 'rounded-[2.5rem] mt-4' : ''}`}>
                <div className={isDashboard ? 'max-w-full' : 'max-w-7xl mx-auto px-4 sm:px-6'}>
                    <div className={`${isDashboard ? '' : 'bg-white rounded-[2.5rem] shadow-[0_40px_100px_-20px_rgba(0,0,0,0.1)] border border-slate-100 overflow-hidden'}`}>
                        {/* Header - Only in Public mode */}
                        {!isDashboard && (
                            <div className="bg-white border-b border-slate-50 py-8 sm:py-10 px-4 sm:px-6 text-center">
                                <motion.div
                                    initial={{ opacity: 0, y: 20 }}
                                    whileInView={{ opacity: 1, y: 0 }}
                                    viewport={{ once: true }}
                                >
                                    <h2 className="text-2xl md:text-4xl font-extrabold mb-4 md:mb-6 bg-linear-to-r from-[#2076C7] to-[#1CADA3] bg-clip-text text-transparent drop-shadow-sm tracking-tight leading-tight">
                                        Pet Premium Calculator
                                    </h2>
                                    <div className="w-20 md:w-24 h-1 bg-gradient-to-r from-[#2076C7] via-[#1CADA3] to-[#2076C7] mx-auto rounded-full mb-6 opacity-30" />
                                    <p className="text-gray-600 max-w-2xl mx-auto font-medium text-sm md:text-lg leading-relaxed">
                                        Get personalized quotes for your pet in 3 simple steps.
                                    </p>
                                </motion.div>
                            </div>
                        )}

                        <div className="p-4 sm:p-6 lg:p-10">
                            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12">

                                {/* Left Column: Controls */}
                                <div className="space-y-8 lg:pr-8 lg:border-r border-slate-100 flex flex-col">
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
                                            <motion.div key="1" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }} className="space-y-8">
                                                {/* Pet Name */}
                                                <div className="space-y-4">
                                                    <label className="block text-base md:text-lg font-extrabold text-[#2076C7]">Pet&apos;s Name</label>
                                                    <input
                                                        type="text"
                                                        value={petName}
                                                        onChange={(e) => setPetName(e.target.value)}
                                                        placeholder="Enter Pet Name"
                                                        className="w-full p-4 bg-slate-50 border border-slate-200 rounded-xl font-bold text-slate-700 outline-none focus:ring-4 focus:ring-[#2076C7]/5"
                                                    />
                                                </div>

                                                {/* Pet Type */}
                                                <div className="space-y-4">
                                                    <label className="block text-base md:text-lg font-extrabold text-[#2076C7]">Pet Type</label>
                                                    <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                                                        {PET_TYPES.map(type => (
                                                            <button key={type.id} onClick={() => setPetType(type)} className={`p-4 rounded-xl border-2 font-bold text-sm transition-all flex flex-col items-center gap-2 ${petType.id === type.id ? 'border-[#1CADA3] bg-teal-50 text-[#1CADA3]' : 'bg-slate-50 text-slate-500 border-slate-200 hover:border-slate-300'}`}>
                                                                <type.icon size={24} />
                                                                <span className="text-[10px] uppercase tracking-wider">{type.label}</span>
                                                            </button>
                                                        ))}
                                                    </div>
                                                </div>

                                                {/* Breed */}
                                                <div className="space-y-4">
                                                    <label className="block text-base md:text-lg font-extrabold text-[#2076C7]">Breed / Sub-Type</label>
                                                    <div className="relative">
                                                        <select
                                                            value={petSubType}
                                                            onChange={(e) => setPetSubType(e.target.value)}
                                                            className="w-full pl-5 pr-12 py-4 bg-slate-50 border border-slate-200 rounded-xl font-bold text-slate-700 outline-none appearance-none cursor-pointer"
                                                        >
                                                            <option value="">Select Breed</option>
                                                            {BREED_OPTIONS[petType.id]?.map((breed) => (
                                                                <option key={breed} value={breed}>{breed}</option>
                                                            ))}
                                                        </select>
                                                        <div className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none text-slate-400"><IconChevronDown size={18} strokeWidth={3} /></div>
                                                    </div>
                                                </div>
                                            </motion.div>
                                        )}

                                        {step === 2 && (
                                            <motion.div key="2" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }} className="space-y-6">
                                                <label className="block text-base md:text-lg font-extrabold text-[#2076C7]">Pet Age Group</label>
                                                <div className="grid grid-cols-1 gap-3">
                                                    {AGE_GROUPS.map((g) => (
                                                        <button
                                                            key={g.label}
                                                            onClick={() => setAgeGroup(g)}
                                                            className={`p-5 rounded-xl border-2 text-left flex justify-between items-center transition-all ${ageGroup.label === g.label ? 'border-[#1CADA3] bg-teal-50 text-[#1CADA3]' : 'bg-slate-50 border-slate-200 text-slate-700 hover:border-slate-300'}`}
                                                        >
                                                            <span className="font-bold">{g.label}</span>
                                                            {ageGroup.label === g.label && <IconCheck size={20} />}
                                                        </button>
                                                    ))}
                                                </div>
                                            </motion.div>
                                        )}

                                        {step === 3 && (
                                            <motion.div key="3" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }} className="space-y-8">
                                                {/* Sum Insured */}
                                                <div className="space-y-4">
                                                    <label className="block text-base md:text-lg font-extrabold text-[#2076C7]">Sum Insured (Annually)</label>
                                                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                                                        {SUM_INSURED_OPTIONS.map(opt => (
                                                            <button key={opt.value} onClick={() => setSumInsured(opt)} className={`p-4 rounded-xl border-2 font-black text-sm transition-all ${sumInsured.value === opt.value ? 'border-[#2076C7] bg-blue-50 text-[#2076C7]' : 'bg-slate-50 text-slate-500 border-slate-200 hover:border-slate-300'}`}>
                                                                {opt.label}
                                                            </button>
                                                        ))}
                                                    </div>
                                                </div>

                                                {/* OPD Cover */}
                                                <div className="p-5 rounded-2xl bg-slate-50 border border-slate-200 flex items-center justify-between">
                                                    <div>
                                                        <p className="font-black text-slate-900">Add OPD Cover?</p>
                                                        <p className="text-xs text-slate-400 font-bold mt-0.5">Routine Checkups & Consultations</p>
                                                    </div>
                                                    <button onClick={() => setHasOPD(!hasOPD)} className={`w-12 h-7 rounded-full relative transition-colors duration-300 ${hasOPD ? 'bg-[#1CADA3]' : 'bg-slate-200'}`}>
                                                        <div className={`absolute top-1 w-5 h-5 bg-white rounded-full shadow transition-all duration-300 ${hasOPD ? 'left-6' : 'left-1'}`} />
                                                    </button>
                                                </div>
                                            </motion.div>
                                        )}
                                    </AnimatePresence>

                                    {/* Nav Buttons */}
                                    <div className="flex items-center justify-between pt-6 border-t border-slate-100">
                                        <button onClick={prevStep} disabled={step === 1} className="w-14 h-14 bg-slate-50 border border-slate-200 rounded-xl flex shrink-0 items-center justify-center disabled:opacity-0 hover:bg-blue-50 hover:text-[#2076C7] transition-all">
                                            <IconArrowLeft size={20} />
                                        </button>
                                        <button
                                            onClick={() => {
                                                if (isStepValid()) {
                                                    if (step < 3) {
                                                        nextStep();
                                                    } else {
                                                        if (onShowPlans) {
                                                            onShowPlans(); // dashboard case
                                                        } else {
                                                            setShowPlans(true); // normal page case
                                                        }
                                                    }
                                                } else {
                                                    toast.error("Please enter pet's name");
                                                }
                                            }}
                                            className="w-full max-w-[260px] md:max-w-[300px] mx-4 py-4 bg-gradient-to-r from-[#2076C7] to-[#1CADA3] text-white font-black uppercase tracking-widest text-xs md:text-sm rounded-xl shadow-lg hover:shadow-[0_20px_40px_-10px_rgba(32,118,199,0.3)] hover:-translate-y-0.5 transition-all duration-300 flex items-center justify-center gap-2 md:gap-3"
                                        >
                                            {step === 3 ? 'View Recommended Plans' : 'Continue'}
                                            <IconArrowRight size={18} strokeWidth={3} />
                                        </button>
                                        <div className="w-14 h-14 shrink-0 pointer-events-none opacity-0" />
                                    </div>

                                    {/* Key Insights Box */}
                                    <div className="p-6 rounded-[2rem] bg-gradient-to-br from-blue-50/50 to-teal-50/50 border border-[#2076C7]/10 mt-8 flex-grow flex flex-col justify-center">
                                        <div className="flex items-center gap-2 mb-4">
                                            <IconBolt size={20} className="text-[#2076C7]" />
                                            <h4 className="font-extrabold text-slate-800 text-base">Key Pet Insights</h4>
                                        </div>
                                        <ul className="space-y-3.5">
                                            <li className="flex items-start gap-3 text-xs md:text-sm text-slate-600 font-medium leading-relaxed">
                                                <div className="w-2 h-2 rounded-full bg-[#1CADA3] mt-1.5 shrink-0 shadow-sm shadow-[#1CADA3]/30" />
                                                <span><strong className="text-slate-800">Cashless network</strong> of top veterinary clinics and hospitals.</span>
                                            </li>
                                            <li className="flex items-start gap-3 text-xs md:text-sm text-slate-600 font-medium leading-relaxed">
                                                <div className="w-2 h-2 rounded-full bg-[#1CADA3] mt-1.5 shrink-0 shadow-sm shadow-[#1CADA3]/30" />
                                                <span><strong className="text-slate-800">Accident & Illness</strong> coverage included in all base plans.</span>
                                            </li>
                                            <li className="flex items-start gap-3 text-xs md:text-sm text-slate-600 font-medium leading-relaxed">
                                                <div className="w-2 h-2 rounded-full bg-[#1CADA3] mt-1.5 shrink-0 shadow-sm shadow-[#1CADA3]/30" />
                                                <span><strong className="text-slate-800">No medical tests</strong> required for pets under 7 years of age.</span>
                                            </li>
                                            <li className="flex items-start gap-3 text-xs md:text-sm text-slate-600 font-medium leading-relaxed">
                                                <div className="w-2 h-2 rounded-full bg-[#1CADA3] mt-1.5 shrink-0 shadow-sm shadow-[#1CADA3]/30" />
                                                <span><strong className="text-slate-800">Lifetime Renewability</strong> ensures your senior companions stay protected.</span>
                                            </li>
                                        </ul>
                                    </div>
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
                                            <div className="text-[10px] md:text-sm font-black text-slate-400 uppercase tracking-widest mb-1">Monthly Premium</div>
                                            <div className="text-2xl font-black text-[#2076C7]">₹{fmt(totalPremium)}</div>
                                        </div>
                                    </div>

                                    {/* Summary Box */}
                                    <div className="bg-slate-50/50 rounded-[2.5rem] border border-blue-100/50 p-6 sm:p-8 shadow-sm flex-grow flex flex-col">
                                        <div className="flex items-center gap-4 mb-6 border-l-4 border-[#2076C7] pl-5">
                                            <h3 className="text-2xl font-extrabold text-gray-700 tracking-tight">Quote Summary</h3>
                                        </div>
                                        <div className="space-y-4 mb-6">
                                            <div className="flex justify-between items-center py-2 border-b border-slate-100">
                                                <span className="text-sm font-bold text-slate-500">Pet Name</span>
                                                <span className="text-base font-extrabold text-[#1CADA3]">{petName || '—'}</span>
                                            </div>
                                            <div className="flex justify-between items-center py-2 border-b border-slate-100">
                                                <span className="text-sm font-bold text-slate-500">Pet Type</span>
                                                <span className="text-base font-extrabold text-[#1CADA3]">{petType.label}</span>
                                            </div>
                                            <div className="flex justify-between items-center py-2 border-b border-slate-100">
                                                <span className="text-sm font-bold text-slate-500">Age Group</span>
                                                <span className="text-base font-extrabold text-[#1CADA3]">{ageGroup.label.split(' ')[0]}</span>
                                            </div>
                                            <div className="flex justify-between items-center py-2 border-b border-slate-100">
                                                <span className="text-sm font-bold text-slate-500">Sum Insured</span>
                                                <span className="text-base font-extrabold text-[#1CADA3]">{sumInsured.label}</span>
                                            </div>
                                            <div className="flex justify-between items-center py-2">
                                                <span className="text-sm font-bold text-slate-500">Premium (incl. GST)</span>
                                                <span className="text-lg md:text-xl font-extrabold text-[#1CADA3]">₹{fmt(totalPremium)}</span>
                                            </div>
                                        </div>

                                        <button
                                            onClick={isDashboard ? undefined : openLogin}
                                            className="w-full mt-auto py-5 bg-gradient-to-r from-[#2076C7] to-[#1CADA3] text-white rounded-2xl font-black uppercase tracking-widest text-sm md:text-base shadow-[0_20px_40px_-10px_rgba(32,118,199,0.3)] hover:shadow-[0_25px_50px_-10px_rgba(32,118,199,0.4)] hover:-translate-y-1.5 transition-all duration-500 group"
                                        >
                                            Apply For Pet Insurance
                                            <IconArrowRight size={16} className="inline-block ml-3 group-hover:translate-x-1.5 transition-transform" />
                                        </button>
                                    </div>

                                    {/* Disclaimer */}
                                    <div className="mt-6 p-5 bg-yellow-50/50 border border-yellow-100 rounded-[1.5rem] text-xs md:text-sm leading-relaxed text-slate-500">
                                        <p>* Figures are indicative. Final premium is subject to medical checkup results and insurer approval.</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Recommended Plans Section */}
            <AnimatePresence>
                {showPlans && (
                    <section id="recommended-plans" className="py-20 bg-white border-t border-slate-100">
                        <div className="max-w-7xl mx-auto px-4 sm:px-6">
                            <div className="text-center mb-16">
                                <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
                                    <h2 className="text-3xl md:text-4xl font-extrabold mb-3 bg-linear-to-r from-[#2076C7] to-[#1CADA3] bg-clip-text text-transparent drop-shadow-sm">
                                        Recommended Pet Plans
                                    </h2>
                                </motion.div>
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                                {[
                                    { name: 'Digit Pet Care', ratio: '97.5%', network: '5,000+', color: '#2076C7', price: totalPremium },
                                    { name: 'Bajaj Allianz Pet', ratio: '98.2%', network: '4,500+', color: '#1CADA3', price: Math.round(totalPremium * 1.05) },
                                    { name: 'Future Generali', ratio: '96.8%', network: '3,800+', color: '#2076C7', price: Math.round(totalPremium * 0.95) }
                                ].map((plan, idx) => (
                                    <motion.div
                                        key={idx}
                                        initial={{ opacity: 0, y: 30 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        transition={{ delay: idx * 0.1 }}
                                        className="bg-white rounded-[2.5rem] border border-slate-100 shadow-xl shadow-slate-200/50 overflow-hidden flex flex-col group hover:border-[#2076C7]/30 transition-all duration-500"
                                    >
                                        <div className="p-8">
                                            <div className="flex justify-between items-start mb-6">
                                                <div className="w-14 h-14 rounded-2xl bg-slate-50 border border-slate-100 flex items-center justify-center text-slate-800 shadow-sm group-hover:scale-110 transition-transform duration-500">
                                                    <IconShieldCheck size={28} style={{ color: plan.color }} />
                                                </div>
                                                <div className="px-3 py-1 bg-teal-50 text-[#1CADA3] text-[10px] font-black uppercase tracking-widest rounded-full border border-teal-100">
                                                    {plan.ratio} Claims
                                                </div>
                                            </div>
                                            <h3 className="text-xl font-black text-[#2076C7] mb-2">{plan.name}</h3>
                                            <p className="text-sm text-slate-400 font-bold mb-6">Network hospitals: {plan.network}</p>

                                            <div className="py-6 border-y border-slate-50 mb-8">
                                                <div className="flex items-baseline gap-1">
                                                    <span className="text-4xl font-black text-[#1CADA3]">₹{fmt(plan.price)}</span>
                                                    <span className="text-sm text-slate-400 font-bold uppercase tracking-wider">/ monthly</span>
                                                </div>
                                            </div>

                                            <ul className="space-y-4 mb-10">
                                                {['Accidental Injury cover', 'Illness & Disease cover', 'Surgery & OT charges'].map((feature, i) => (
                                                    <li key={i} className="flex items-center gap-3 text-sm text-slate-600 font-bold">
                                                        <div className="w-5 h-5 bg-blue-50 text-[#2076C7] rounded-full flex items-center justify-center shrink-0">
                                                            <IconCheck size={12} strokeWidth={4} />
                                                        </div>
                                                        {feature}
                                                    </li>
                                                ))}
                                            </ul>

                                            <button
                                                onClick={() => document.getElementById('plans')?.scrollIntoView({ behavior: 'smooth' })}
                                                className="w-full py-4 bg-slate-50 border border-slate-100 rounded-2xl font-black uppercase tracking-widest text-xs text-slate-600 group-hover:bg-[#2076C7] group-hover:text-white group-hover:border-[#2076C7] group-hover:shadow-[0_20px_40px_-10px_rgba(32,118,199,0.3)] transition-all duration-500"
                                            >
                                                Select Plan
                                            </button>
                                        </div>
                                    </motion.div>
                                ))}
                            </div>

                            <div className="mt-16 text-center">
                                <p className="text-sm text-slate-400 font-medium">Need help choosing? <Link href="/#contact" className="text-[#2076C7] font-black decoration-2">Talk to an expert</Link></p>
                            </div>
                        </div>
                    </section>
                )}
            </AnimatePresence>
        </>
    );
}