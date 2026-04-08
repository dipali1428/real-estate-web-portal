'use client';

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import toast from 'react-hot-toast';
import {
    IconPlus, IconMinus, IconArrowRight, IconArrowLeft,
    IconUsers, IconShieldCheck,
    IconCalendarEvent, IconSearch, IconMapPin, IconFileText, IconBolt
} from '@tabler/icons-react';
import {
    PieChart, Pie, Cell, ResponsiveContainer, Tooltip, Legend
} from 'recharts';
import { useModal } from '../../../context/ModalContext';

interface SumInsuredOption {
    label: string;
    value: number;
    factor: number;
}

// --- Calculator Data ---
const AGE_GROUPS = [
    { label: '0-17 Years', multiplier: 0.8 }, { label: '18-45 Years', multiplier: 1.0 },
    { label: '46-60 Years', multiplier: 1.6 }, { label: '61-70 Years', multiplier: 2.8 },
    { label: '71-80 Years', multiplier: 4.5 }, { label: '80+ Years', multiplier: 6.5 },
];
const DESTINATIONS = [
    { id: 'asia', label: 'Asia', baseRate: 15 }, { id: 'schengen', label: 'Schengen Area', baseRate: 35 },
    { id: 'usa', label: 'USA & Canada', baseRate: 95 }, { id: 'worldwide', label: 'Worldwide', baseRate: 65 },
];
const SUM_INSURED_OPTIONS: SumInsuredOption[] = [
    { label: '₹25 Lakhs', value: 2500000, factor: 1 },
    { label: '₹50 Lakhs', value: 5000000, factor: 1.4 },
    { label: '₹1 Crore', value: 10000000, factor: 1.9 },
    { label: '₹2 Crores', value: 20000000, factor: 2.5 }
];

const steps = [
    { title: 'Enter Details', desc: 'Provide destination, duration, and traveler age.', icon: IconMapPin, color: 'from-[#1CADA3] to-[#2076C7]' },
    { title: 'Compare Plans', desc: 'Choose from top-rated global insurance partners.', icon: IconSearch, color: 'from-[#1CADA3] to-[#2076C7]' },
    { title: 'Submit Details', desc: 'Quick digital form with minimal paperwork.', icon: IconFileText, color: 'from-[#1CADA3] to-[#2076C7]' },
    { title: 'Instant Policy', desc: 'Get your policy via email within minutes.', icon: IconBolt, color: 'from-[#1CADA3] to-[#2076C7]' }
];

const COLORS = ['#2076C7', '#1CADA3'];

const fmt = (n: number) => new Intl.NumberFormat('en-IN', { maximumFractionDigits: 0 }).format(n);

export default function CalculatorAndProcess({ isDashboard = false, onShowPlans }: { isDashboard?: boolean; onShowPlans?: () => void }) {
    const { openLogin } = useModal();
    const [step, setStep] = useState(1);
    const [destination, setDestination] = useState(DESTINATIONS[2]);
    const [startDate, setStartDate] = useState('');
    const [endDate, setEndDate] = useState('');
    const [duration, setDuration] = useState(7);
    const [travelers, setTravelers] = useState([{ id: 1, ageGroup: AGE_GROUPS[1] }]);
    const [hasMedicalCondition, setHasMedicalCondition] = useState(false);
    const [sumInsured, setSumInsured] = useState(SUM_INSURED_OPTIONS[1]);
    const [totalPremium, setTotalPremium] = useState(0);

    useEffect(() => {
        if (startDate && endDate) {
            const start = new Date(startDate);
            const end = new Date(endDate);
            const diffDays = Math.ceil(Math.abs(end.getTime() - start.getTime()) / (1000 * 60 * 60 * 24)) + 1;
            if (diffDays > 0) setDuration(diffDays);
        }
    }, [startDate, endDate]);

    useEffect(() => {
        const premium = travelers.reduce((acc, t) => acc + (destination.baseRate * t.ageGroup.multiplier * duration * (sumInsured.factor || 1) * (hasMedicalCondition ? 1.4 : 1)), 0);
        setTotalPremium(Math.round(premium * 1.18));
    }, [destination, duration, travelers, hasMedicalCondition, sumInsured]);

    const isStepValid = () => step === 1 ? startDate && endDate : step === 2 ? travelers.length > 0 : true;

    const basePremium = Math.round(totalPremium / 1.18);
    const gstAmount = totalPremium - basePremium;
    const chartData = [
        { name: 'Base Premium', value: basePremium },
        { name: 'GST (18%)', value: gstAmount },
    ];

    return (
        <>
            {/* --- CALCULATOR (EMI Style) --- */}
            <section id="calculator" className={`py-10 bg-slate-50 relative overflow-hidden ${isDashboard ? 'rounded-[2.5rem] mt-4' : ''}`}>
                <div className={`${isDashboard ? 'max-w-full' : 'max-w-7xl mx-auto px-4 sm:px-6'}`}>
                    <div className={`${isDashboard ? '' : 'bg-white rounded-[2.5rem] shadow-[0_40px_100px_-20px_rgba(0,0,0,0.1)] border border-slate-100 overflow-hidden'}`}>

                        {/* Header - Only in Public mode */}
                        {!isDashboard && (
                            <div className="bg-white border-b border-slate-50 py-8 sm:py-10 px-4 sm:px-6 text-center">
                                <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
                                    <h2 className="text-2xl md:text-4xl font-extrabold mb-4 md:mb-6 bg-linear-to-r from-[#2076C7] to-[#1CADA3] bg-clip-text text-transparent drop-shadow-sm tracking-tight leading-tight">
                                        Travel Premium Calculator
                                    </h2>
                                    <div className="w-20 md:w-24 h-1 bg-gradient-to-r from-[#2076C7] via-[#1CADA3] to-[#2076C7] mx-auto rounded-full mb-6 opacity-30" />
                                    <p className="text-gray-600 max-w-2xl mx-auto font-medium text-sm md:text-lg leading-relaxed">
                                        Get personalized quotes in 3 simple steps.
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
                                                {/* Destination */}
                                                <div className="space-y-4">
                                                    <label className="block text-base md:text-lg font-extrabold text-[#2076C7]">Destination</label>
                                                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                                                        {DESTINATIONS.map(d => (
                                                            <button key={d.id} onClick={() => setDestination(d)} className={`p-4 rounded-xl border-2 font-bold text-sm transition-all ${destination.id === d.id ? 'border-[#1CADA3] bg-teal-50 text-[#1CADA3]' : 'bg-slate-50 text-slate-500 border-slate-200 hover:border-slate-300'}`}>
                                                                {d.label}
                                                            </button>
                                                        ))}
                                                    </div>
                                                </div>

                                                {/* Dates */}
                                                <div className="space-y-4">
                                                    <label className="block text-base md:text-lg font-extrabold text-[#2076C7]">
                                                        <span className="flex items-center gap-2"><IconCalendarEvent size={20} />Travel Dates</span>
                                                    </label>
                                                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                                        <input type="date" value={startDate} onChange={e => setStartDate(e.target.value)} className="p-3 bg-slate-50 border border-slate-200 rounded-xl font-bold text-slate-700 w-full focus:outline-none focus:ring-4 focus:ring-[#2076C7]/5" />
                                                        <input type="date" value={endDate} onChange={e => setEndDate(e.target.value)} className="p-3 bg-slate-50 border border-slate-200 rounded-xl font-bold text-slate-700 w-full focus:outline-none focus:ring-4 focus:ring-[#2076C7]/5" />
                                                    </div>
                                                </div>
                                            </motion.div>
                                        )}

                                        {step === 2 && (
                                            <motion.div key="2" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }} className="space-y-6">
                                                <div className="flex justify-between items-center">
                                                    <label className="block text-base md:text-lg font-extrabold text-[#2076C7]">
                                                        <span className="flex items-center gap-2"><IconUsers size={20} />Travelers</span>
                                                    </label>
                                                    <button onClick={() => travelers.length < 6 && setTravelers([...travelers, { id: Date.now(), ageGroup: AGE_GROUPS[1] }])} className="text-xs font-black text-[#2076C7] uppercase tracking-widest hover:underline">+ Add Member</button>
                                                </div>
                                                {travelers.map((t, i) => (
                                                    <div key={t.id} className="flex items-center gap-4 p-4 rounded-xl bg-slate-50 border border-slate-200">
                                                        <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-[#2076C7] to-[#1CADA3] flex items-center justify-center text-white text-xs font-black">{i + 1}</div>
                                                        <select value={t.ageGroup.label} onChange={e => setTravelers(travelers.map(m => m.id === t.id ? { ...m, ageGroup: AGE_GROUPS.find(g => g.label === e.target.value)! } : m))} className="bg-transparent flex-grow font-extrabold text-slate-800 focus:outline-none">
                                                            {AGE_GROUPS.map(g => <option key={g.label} value={g.label}>{g.label}</option>)}
                                                        </select>
                                                        {travelers.length > 1 && <button onClick={() => setTravelers(travelers.filter(m => m.id !== t.id))} className="text-slate-300 hover:text-red-500"><IconMinus size={18} /></button>}
                                                    </div>
                                                ))}
                                            </motion.div>
                                        )}

                                        {step === 3 && (
                                            <motion.div key="3" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }} className="space-y-8">
                                                {/* Sum Insured */}
                                                <div className="space-y-4">
                                                    <label className="block text-base md:text-lg font-extrabold text-[#2076C7]">
                                                        <span className="flex items-center gap-2"><IconShieldCheck size={20} />Sum Insured</span>
                                                    </label>
                                                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                                                        {SUM_INSURED_OPTIONS.map(o => (
                                                            <button key={o.value} onClick={() => setSumInsured(o)} className={`p-4 rounded-xl border-2 font-black text-sm transition-all ${sumInsured.value === o.value ? 'border-[#1CADA3] bg-teal-50 text-[#1CADA3]' : 'bg-slate-50 text-slate-500 border-slate-200 hover:border-slate-300'}`}>
                                                                {o.label}
                                                            </button>
                                                        ))}
                                                    </div>
                                                </div>

                                                {/* Pre-existing condition */}
                                                <div className="p-5 rounded-2xl bg-slate-50 border border-slate-200 flex items-center justify-between">
                                                    <div>
                                                        <p className="font-black text-slate-900">Pre-existing Diseases?</p>
                                                        <p className="text-xs text-slate-400 font-bold mt-0.5">Adds 40% loading to premium</p>
                                                    </div>
                                                    <button onClick={() => setHasMedicalCondition(!hasMedicalCondition)} className={`w-12 h-7 rounded-full relative transition-colors duration-300 ${hasMedicalCondition ? 'bg-[#1CADA3]' : 'bg-slate-200'}`}>
                                                        <div className={`absolute top-1 w-5 h-5 bg-white rounded-full shadow transition-all duration-300 ${hasMedicalCondition ? 'left-6' : 'left-1'}`} />
                                                    </button>
                                                </div>

                                            </motion.div>
                                        )}
                                    </AnimatePresence>

                                    {/* Nav Buttons */}
                                    <div className="flex items-center justify-between pt-6 border-t border-slate-100">
                                        <button onClick={() => setStep(s => s - 1)} disabled={step === 1} className="w-14 h-14 bg-slate-50 border border-slate-200 rounded-xl flex shrink-0 items-center justify-center disabled:opacity-0 hover:bg-blue-50 hover:text-[#2076C7] transition-all">
                                            <IconArrowLeft size={20} />
                                        </button>
                                        <button
                                            onClick={() => isStepValid() ? (step < 3 ? setStep(s => s + 1) : (onShowPlans ? onShowPlans() : document.getElementById('plans')?.scrollIntoView({ behavior: 'smooth' }))) : toast.error('Fill required details')}
                                            className="w-full max-w-[260px] md:max-w-[300px] mx-4 py-4 bg-gradient-to-r from-[#2076C7] to-[#1CADA3] text-white font-black uppercase tracking-widest text-xs md:text-sm rounded-xl shadow-lg hover:shadow-[0_20px_40px_-10px_rgba(32,118,199,0.3)] hover:-translate-y-0.5 transition-all duration-300 flex items-center justify-center gap-2 md:gap-3"
                                        >
                                            {step === 3 ? 'View Plans & Apply' : 'Continue'}
                                            <IconArrowRight size={18} strokeWidth={3} />
                                        </button>
                                        <div className="w-14 h-14 shrink-0 pointer-events-none opacity-0" />
                                    </div>

                                    {/* Key Insights Box (Moved Below Button to Fill Whitespace) */}
                                    <div className="p-5 md:p-6 rounded-[1.5rem] md:rounded-[2rem] bg-gradient-to-br from-blue-50/50 to-teal-50/50 border border-[#2076C7]/10 mt-8 flex-grow flex flex-col justify-center">
                                        <div className="flex items-center gap-2 mb-4">
                                            <IconBolt size={20} className="text-[#2076C7]" />
                                            <h4 className="font-extrabold text-slate-800 text-base">Key Travel Insights</h4>
                                        </div>
                                        <ul className="space-y-3.5">
                                            <li className="flex items-start gap-3 text-xs md:text-sm text-slate-600 font-medium leading-relaxed">
                                                <div className="w-2 h-2 rounded-full bg-[#1CADA3] mt-1.5 shrink-0 shadow-sm shadow-[#1CADA3]/30" />
                                                <span><strong className="text-slate-800">100% Cashless</strong> network spanning across 195+ countries.</span>
                                            </li>
                                            <li className="flex items-start gap-3 text-xs md:text-sm text-slate-600 font-medium leading-relaxed">
                                                <div className="w-2 h-2 rounded-full bg-[#1CADA3] mt-1.5 shrink-0 shadow-sm shadow-[#1CADA3]/30" />
                                                <span><strong className="text-slate-800">Instant Policy</strong> generation with zero medical tests required up to 70 years.</span>
                                            </li>
                                            <li className="flex items-start gap-3 text-xs md:text-sm text-slate-600 font-medium leading-relaxed">
                                                <div className="w-2 h-2 rounded-full bg-[#1CADA3] mt-1.5 shrink-0 shadow-sm shadow-[#1CADA3]/30" />
                                                <span><strong className="text-slate-800">Flight Delays</strong> and missed connections are fully compensated.</span>
                                            </li>
                                            <li className="flex items-start gap-3 text-xs md:text-sm text-slate-600 font-medium leading-relaxed">
                                                <div className="w-2 h-2 rounded-full bg-[#1CADA3] mt-1.5 shrink-0 shadow-sm shadow-[#1CADA3]/30" />
                                                <span><strong className="text-slate-800">Trip Cancellation</strong> coverage for unforeseen emergencies before departure.</span>
                                            </li>
                                            <li className="flex items-start gap-3 text-xs md:text-sm text-slate-600 font-medium leading-relaxed">
                                                <div className="w-2 h-2 rounded-full bg-[#1CADA3] mt-1.5 shrink-0 shadow-sm shadow-[#1CADA3]/30" />
                                                <span><strong className="text-slate-800">Baggage Loss</strong> protection providing immediate allowance for essentials.</span>
                                            </li>
                                            <li className="flex items-start gap-3 text-xs md:text-sm text-slate-600 font-medium leading-relaxed">
                                                <div className="w-2 h-2 rounded-full bg-[#1CADA3] mt-1.5 shrink-0 shadow-sm shadow-[#1CADA3]/30" />
                                                <span><strong className="text-slate-800">Personal Liability</strong> coverage against accidental damages abroad.</span>
                                            </li>
                                            <li className="flex items-start gap-3 text-xs md:text-sm text-slate-600 font-medium leading-relaxed">
                                                <div className="w-2 h-2 rounded-full bg-[#1CADA3] mt-1.5 shrink-0 shadow-sm shadow-[#1CADA3]/30" />
                                                <span><strong className="text-slate-800">Adventure Sports</strong> add-ons available for thrill-seekers.</span>
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
                                            <div className="text-sm font-black text-slate-400 uppercase tracking-widest mb-1">Total Premium</div>
                                            <div className="text-2xl font-black text-[#2076C7]">₹{fmt(totalPremium)}</div>
                                        </div>
                                    </div>

                                    {/* Summary Box */}
                                    <div className="bg-slate-50/50 rounded-[2rem] md:rounded-[2.5rem] border border-blue-100/50 p-5 sm:p-8 shadow-sm flex-grow flex flex-col">
                                        <div className="flex items-center gap-4 mb-6 border-l-4 border-[#2076C7] pl-5">
                                            <h3 className="text-2xl font-extrabold text-gray-700 tracking-tight">Quote Summary</h3>
                                        </div>
                                        <div className="space-y-4 mb-6">
                                            <div className="flex flex-col sm:flex-row justify-between sm:items-center py-2 border-b border-slate-100 gap-1 sm:gap-4">
                                                <span className="text-sm font-bold text-slate-500">Destination</span>
                                                <span className="text-base font-extrabold text-[#1CADA3]">{destination.label}</span>
                                            </div>
                                            <div className="flex flex-col sm:flex-row justify-between sm:items-center py-2 border-b border-slate-100 gap-1 sm:gap-4">
                                                <span className="text-sm font-bold text-slate-500">Travelers</span>
                                                <span className="text-base font-extrabold text-[#1CADA3]">{travelers.length} Person{travelers.length > 1 ? 's' : ''}</span>
                                            </div>
                                            <div className="flex flex-col sm:flex-row justify-between sm:items-center py-2 border-b border-slate-100 gap-1 sm:gap-4">
                                                <span className="text-sm font-bold text-slate-500">Duration</span>
                                                <span className="text-base font-extrabold text-[#1CADA3]">{duration} Days</span>
                                            </div>
                                            <div className="flex flex-col sm:flex-row justify-between sm:items-center py-2 border-b border-slate-100 gap-1 sm:gap-4">
                                                <span className="text-sm font-bold text-slate-500">Sum Insured</span>
                                                <span className="text-base font-extrabold text-[#1CADA3]">{sumInsured.label}</span>
                                            </div>
                                            <div className="flex flex-col sm:flex-row justify-between sm:items-center py-2 gap-1 sm:gap-4">
                                                <span className="text-sm font-bold text-slate-500">Total Premium (incl. GST)</span>
                                                <span className="text-lg md:text-xl font-extrabold text-[#1CADA3]">₹{fmt(totalPremium)}</span>
                                            </div>
                                        </div>

                                        <button
                                            onClick={() => onShowPlans ? onShowPlans() : openLogin()}
                                            className="w-full mt-auto py-5 bg-gradient-to-r from-[#2076C7] to-[#1CADA3] text-white rounded-2xl font-black uppercase tracking-widest text-sm md:text-base shadow-[0_20px_40px_-10px_rgba(32,118,199,0.3)] hover:shadow-[0_25px_50px_-10px_rgba(32,118,199,0.4)] hover:-translate-y-1.5 transition-all duration-500 group"
                                        >
                                            Apply For Travel Insurance
                                            <IconArrowRight size={16} className="inline-block ml-3 group-hover:translate-x-1.5 transition-transform" />
                                        </button>
                                    </div>

                                    {/* Disclaimer */}
                                    <div className="mt-6 p-4 md:p-5 bg-yellow-50/50 border border-yellow-100 rounded-[1.5rem] text-xs md:text-sm leading-relaxed text-slate-500">
                                        <p>* Figures are indicative. Final premium is subject to insurer approval and verification of travel details.</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* --- HOW IT WORKS --- - Only in Public mode */}
            {!isDashboard && (
                <section className="py-16 px-4 sm:px-6 bg-white">
                    <div className="max-w-7xl mx-auto">
                        <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="text-center max-w-3xl mx-auto mb-12">
                            <h2 className="text-2xl md:text-4xl font-extrabold mb-6 bg-linear-to-r from-[#2076C7] to-[#1CADA3] bg-clip-text text-transparent drop-shadow-sm tracking-tight leading-tight">
                                How It Works
                            </h2>
                            <p className="text-gray-600 max-w-2xl mx-auto font-medium text-sm md:text-lg leading-relaxed">
                                Quick and hassle-free coverage in four easy steps.
                            </p>
                        </motion.div>
                        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
                            {steps.map((s, i) => (
                                <motion.div key={i} initial={{ opacity: 0, y: 40 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.15 }} className="bg-white p-6 rounded-2xl border-2 border-slate-100 hover:border-[#2076C7] transition-all flex flex-col items-center text-center shadow-lg hover:shadow-2xl">
                                    <div className={`w-14 h-14 rounded-2xl bg-gradient-to-br ${s.color} flex items-center justify-center text-white shadow-lg mb-4`}><s.icon size={24} /></div>
                                    <h3 className="text-base font-black text-gray-700 mb-2">{s.title}</h3>
                                    <p className="text-gray-600 text-xs leading-relaxed">{s.desc}</p>
                                </motion.div>
                            ))}
                        </div>
                    </div>
                </section>
            )}

            <style jsx>{`
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
            `}</style>
        </>
    );
}