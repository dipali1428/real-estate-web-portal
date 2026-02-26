'use client';

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import toast from 'react-hot-toast';
import {
    IconPlus,
    IconMinus,
    IconCalculator,
    IconCheck,
    IconInfoCircle,
    IconWorld,
    IconPlaneArrival,
    IconClock,
    IconUsers,
    IconShieldCheck,
    IconArrowRight,
    IconArrowLeft,
    IconStethoscope,
    IconCalendarEvent
} from '@tabler/icons-react';
import { section } from 'framer-motion/client';
import { useModal } from '@/app/context/ModalContext';

const AGE_GROUPS = [
    { label: '0-17 Years', multiplier: 0.8 },
    { label: '18-45 Years', multiplier: 1.0 },
    { label: '46-60 Years', multiplier: 1.6 },
    { label: '61-70 Years', multiplier: 2.8 },
    { label: '71-80 Years', multiplier: 4.5 },
    { label: '80+ Years', multiplier: 6.5 },
];

const DESTINATIONS = [
    { id: 'asia', label: 'Germany', baseRate: 15 },
    { id: 'schengen', label: 'Schengen Area', baseRate: 35 },
    { id: 'usa', label: 'USA & Canada', baseRate: 95 },
    { id: 'worldwide', label: 'Worldwide', baseRate: 65 },
];

const SUM_INSURED_OPTIONS = [
    { label: '₹25 Lakhs', value: 2500000, factor: 1 },
    { label: '₹50 Lakhs', value: 5000000, factor: 1.4 },
    { label: '₹1 Crore', value: 10000000, factor: 1.9 },
    { label: '₹2 Crores', value: 20000000, factor: 2.5 },
];

const PROVIDERS = [
    {
        name: 'Tata AIG',
        brandColor: 'bg-[#2076C7]',
        planName: 'International Plus',
        medical: '₹ 40 Lakhs',
        tripCancellation: '₹ 1 Lakhs',
        baggageLoss: '₹ 16,500',
        passportLoss: '₹ 20,500',
        factor: 1.0
    },
    {
        name: 'Bajaj Allianz',
        brandColor: 'bg-[#1CADA3]',
        planName: 'Travel Elite',
        medical: '₹ 50 Lakhs',
        tripCancellation: '₹ 1.5 Lakhs',
        baggageLoss: '₹ 20,500',
        passportLoss: '₹ 16,500',
        factor: 0.95
    },
    {
        name: 'HDFC ERGO',
        brandColor: 'bg-[#2076C7]',
        planName: 'Travel Assure',
        medical: '₹ 45 Lakhs',
        tripCancellation: '₹ 1.2 Lakhs',
        baggageLoss: '₹ 25,000',
        passportLoss: '₹ 20,500',
        factor: 1.1
    },
    {
        name: 'ICICI Lombard',
        brandColor: 'bg-[#1CADA3]',
        planName: 'Trip Secure Plus',
        medical: '₹ 60 Lakhs',
        tripCancellation: '₹ 2 Lakhs',
        baggageLoss: '₹ 16,500',
        passportLoss: '₹ 25,000',
        factor: 1.15
    },
    {
        name: 'Niva Bupa',
        brandColor: 'bg-[#2076C7]',
        planName: 'GoActive Travel',
        medical: '₹ 55 Lakhs',
        tripCancellation: '₹ 1.8 Lakhs',
        baggageLoss: '₹ 20,000',
        passportLoss: '₹ 20,000',
        factor: 1.05
    },
    {
        name: 'Reliance',
        brandColor: 'bg-[#1CADA3]',
        planName: 'Travel Care',
        medical: '₹ 35 Lakhs',
        tripCancellation: '₹ 0.8 Lakhs',
        baggageLoss: '₹ 12,500',
        passportLoss: '₹ 16,500',
        factor: 0.85
    },
];


export default function TravelCalculator() {
    const { openPartner } = useModal();
    const [step, setStep] = useState(1);
    const [destination, setDestination] = useState(DESTINATIONS[2]); // Default USA/Canada
    const [startDate, setStartDate] = useState('');
    const [endDate, setEndDate] = useState('');
    const [duration, setDuration] = useState(7);
    const [showPlans, setShowPlans] = useState(false);
    const [travelers, setTravelers] = useState<{ id: number, ageGroup: typeof AGE_GROUPS[0] }[]>([
        { id: 1, ageGroup: AGE_GROUPS[1] }
    ]);
    const [hasMedicalCondition, setHasMedicalCondition] = useState(false);
    const [sumInsured, setSumInsured] = useState(SUM_INSURED_OPTIONS[1]);
    const [totalPremium, setTotalPremium] = useState(0);
    const [carouselIndex, setCarouselIndex] = useState(0);

    // Auto-calculate duration from dates
    useEffect(() => {
        if (startDate && endDate) {
            const start = new Date(startDate);
            const end = new Date(endDate);
            const diffTime = Math.abs(end.getTime() - start.getTime());
            const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24)) + 1;
            if (diffDays > 0) setDuration(diffDays);
        }
    }, [startDate, endDate]);

    // Premium Calculation Logic
    useEffect(() => {
        const calculatedPremium = travelers.reduce((acc, t) => {
            let travelerBase = (destination.baseRate * t.ageGroup.multiplier * duration * sumInsured.factor);
            if (hasMedicalCondition) travelerBase *= 1.4; // 40% loading for medical
            return acc + travelerBase;
        }, 0);

        // Applying minimal GST (18%) and rounding
        const withGst = calculatedPremium * 1.18;
        setTotalPremium(Math.round(withGst));
    }, [destination, duration, travelers, hasMedicalCondition, sumInsured]);

    const addTraveler = () => {
        if (travelers.length < 6) {
            setTravelers([...travelers, { id: Date.now(), ageGroup: AGE_GROUPS[1] }]);
        }
    };

    const removeTraveler = (id: number) => {
        if (travelers.length > 1) {
            setTravelers(travelers.filter(t => t.id !== id));
        }
    };

    const updateTravelerAge = (id: number, ageGroup: typeof AGE_GROUPS[0]) => {
        setTravelers(travelers.map(t => t.id === id ? { ...t, ageGroup } : t));
    };

    const nextStep = () => setStep(s => Math.min(s + 1, 3));
    const prevStep = () => setStep(s => Math.max(s - 1, 1));

    // Step validation
    const isStepValid = () => {
        if (step === 1) return startDate !== '' && endDate !== '';
        if (step === 2) return travelers.length > 0;
        return true;
    };

    return (
        <section id="calculator" className="pt-24 pb-12 px-6 bg-slate-50 relative overflow-hidden">
            <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-[#2076C7]/10 rounded-full blur-[120px] -z-0" />
            <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-[#1CADA3]/10 rounded-full blur-[120px] -z-0" />

            <div className="max-w-6xl mx-auto relative z-10">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="text-center mb-10 md:mb-16"
                >
                    <span className="text-secondary-teal font-bold tracking-widest uppercase text-xs md:text-sm">Compare & Save</span>
                     <h2 className="text-3xl md:text-4xl font-extrabold mb-3 bg-linear-to-r from-[#2076C7] to-[#1CADA3] bg-clip-text text-transparent drop-shadow-sm">
                              Travel Premium Calculator
                    </h2>
                    <p className="text-base md:text-lg text-slate-500 mt-4 max-w-2xl mx-auto px-4 md:px-0">
                        Get personalized quotes in 3 simple steps, similar to PolicyBazaar’s advanced evaluation.
                    </p>
                </motion.div>

                {/* Multi-step Navigation Bar */}
                <div className="max-w-xs md:max-w-md mx-auto mb-10 md:mb-12 flex items-center justify-between relative px-2">
                    <div className="absolute top-1/2 left-0 w-full h-0.5 bg-slate-200 -translate-y-1/2 -z-10" />
                    {[1, 2, 3].map((num) => (
                        <div key={num} className="relative bg-slate-50 p-1 md:p-2">
                            <div
                                className={`w-8 h-8 md:w-10 md:h-10 rounded-full flex items-center justify-center text-xs md:text-base font-black transition-all duration-300 ${step >= num ? 'bg-gradient-to-br from-[#2076C7] to-[#1CADA3] text-white shadow-lg' : 'bg-white text-slate-300 border-2 border-slate-200'
                                    }`}
                            >
                                {num}
                            </div>
                            <span className={`absolute top-full left-1/2 -translate-x-1/2 mt-2 text-[8px] md:text-[10px] font-black uppercase tracking-widest whitespace-nowrap ${step >= num ? 'text-[#2076C7]' : 'text-slate-300'
                                }`}>
                                {num === 1 ? 'Trip Info' : num === 2 ? 'Travelers' : 'Cover'}
                            </span>
                        </div>
                    ))}
                </div>

                <div className="grid lg:grid-cols-2 gap-12 items-start">
                    {/* Main Calculator Card */}
                    <motion.div
                        initial={{ opacity: 0, x: -30 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        className="bg-white p-6 md:p-11 rounded-[2rem] md:rounded-[3rem] shadow-[0_32px_64px_-16px_rgba(32,118,199,0.08)] border border-slate-100 min-h-[480px] md:min-h-[560px] flex flex-col relative overflow-hidden"
                    >
                        <AnimatePresence mode="wait">
                            {step === 1 && (
                                <motion.div
                                    key="step1"
                                    initial={{ opacity: 0, x: 20 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    exit={{ opacity: 0, x: -20 }}
                                    className="space-y-8 flex-grow"
                                >
                                    <div>
                                        <label className="flex items-center gap-2 text-sm font-black text-slate-900 uppercase tracking-widest mb-4">
                                            <IconWorld className="text-[#1CADA3]" size={20} />
                                            Where are you traveling?
                                        </label>
                                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                                            {DESTINATIONS.map((d) => (
                                                <button
                                                    key={d.id}
                                                    onClick={() => setDestination(d)}
                                                    className={`py-4 px-4 rounded-2xl border-2 font-bold transition-all text-sm ${destination.id === d.id
                                                        ? 'border-secondary-teal bg-teal-50 text-secondary-teal shadow-sm'
                                                        : 'border-slate-100 bg-slate-50 text-slate-500 hover:border-teal-200 text-left'
                                                        }`}
                                                >
                                                    {d.label}
                                                </button>
                                            ))}
                                        </div>
                                    </div>

                                    <div>
                                        <label className="flex items-center gap-2 text-sm font-black text-slate-900 uppercase tracking-widest mb-4">
                                            <IconCalendarEvent className="text-[#2076C7]" size={20} />
                                            Trip Dates
                                        </label>
                                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                            <div className="space-y-1">
                                                <span className="text-[10px] font-bold text-slate-400 uppercase">Departure</span>
                                                <input
                                                    type="date"
                                                    value={startDate}
                                                    onChange={(e) => setStartDate(e.target.value)}
                                                    className="w-full p-3 bg-slate-50 border border-slate-100 rounded-xl font-bold text-slate-700 outline-none focus:border-[#2076C7]/30"
                                                />
                                            </div>
                                            <div className="space-y-1">
                                                <span className="text-[10px] font-bold text-slate-400 uppercase">Return</span>
                                                <input
                                                    type="date"
                                                    value={endDate}
                                                    onChange={(e) => setEndDate(e.target.value)}
                                                    className="w-full p-3 bg-slate-50 border border-slate-100 rounded-xl font-bold text-slate-700 outline-none focus:border-[#2076C7]/30"
                                                />
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
                                    className="space-y-6 flex-grow"
                                >
                                    <div className="flex justify-between items-center mb-4">
                                        <label className="flex items-center gap-2 text-sm font-black text-slate-900 uppercase tracking-widest">
                                            <IconUsers className="text-[#2076C7]" size={20} />
                                            Who is traveling?
                                        </label>
                                        <button
                                            onClick={addTraveler}
                                            disabled={travelers.length >= 6}
                                            className="flex items-center gap-1 text-xs font-black text-[#2076C7] hover:text-[#2076C7]/80 disabled:opacity-30 uppercase tracking-wider"
                                        >
                                            <IconPlus size={16} stroke={3} />
                                            Add Member
                                        </button>
                                    </div>

                                    <div className="space-y-3 max-h-[350px] overflow-y-auto pr-2 custom-scrollbar">
                                        {travelers.map((t, index) => (
                                            <motion.div
                                                key={t.id}
                                                initial={{ opacity: 0, y: 10 }}
                                                animate={{ opacity: 1, y: 0 }}
                                                className="flex items-center gap-4 p-4 rounded-2xl bg-slate-50 border border-slate-100 group"
                                            >
                                                <div className="flex-shrink-0 w-9 h-9 rounded-xl bg-[#2076C7]/10 flex items-center justify-center text-[#2076C7] text-sm font-black">
                                                    {index + 1}
                                                </div>
                                                <div className="flex-grow">
                                                    <p className="text-[10px] font-bold text-slate-400 uppercase mb-1">Select Age</p>
                                                    <select
                                                        value={t.ageGroup.label}
                                                        onChange={(e) => {
                                                            const group = AGE_GROUPS.find(g => g.label === e.target.value);
                                                            if (group) updateTravelerAge(t.id, group);
                                                        }}
                                                        className="bg-transparent w-full text-base font-extrabold text-slate-800 outline-none cursor-pointer"
                                                    >
                                                        {AGE_GROUPS.map(g => (
                                                            <option key={g.label} value={g.label}>{g.label}</option>
                                                        ))}
                                                    </select>
                                                </div>
                                                {travelers.length > 1 && (
                                                    <button
                                                        onClick={() => removeTraveler(t.id)}
                                                        className="p-2 text-slate-300 hover:text-red-500"
                                                    >
                                                        <IconMinus size={20} stroke={3} />
                                                    </button>
                                                )}
                                            </motion.div>
                                        ))}
                                    </div>
                                </motion.div>
                            )}

                            {step === 3 && (
                                <motion.div
                                    key="step3"
                                    initial={{ opacity: 0, x: 20 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    exit={{ opacity: 0, x: -20 }}
                                    className="space-y-8 flex-grow"
                                >
                                    <div>
                                        <label className="flex items-center gap-2 text-sm font-black text-slate-900 uppercase tracking-widest mb-6">
                                            <IconShieldCheck className="text-[#2076C7]" size={20} />
                                            Choose Sum Insured
                                        </label>
                                        <div className="grid grid-cols-2 gap-3">
                                            {SUM_INSURED_OPTIONS.map((opt) => (
                                                <button
                                                    key={opt.value}
                                                    onClick={() => setSumInsured(opt)}
                                                    className={`py-4 rounded-2xl border-2 font-black transition-all ${sumInsured.value === opt.value
                                                        ? 'border-secondary-teal bg-teal-50 text-secondary-teal'
                                                        : 'border-slate-100 bg-slate-50 text-slate-500'
                                                        }`}
                                                >
                                                    {opt.label}
                                                </button>
                                            ))}
                                        </div>
                                    </div>

                                    <div className="p-6 rounded-3xl bg-slate-50 border border-slate-100">
                                        <div className="flex items-center justify-between">
                                            <div className="flex items-center gap-3">
                                                <IconStethoscope className="text-[#2076C7]" size={24} />
                                                <div>
                                                    <p className="text-sm font-black text-slate-900">Pre-existing Diseases?</p>
                                                    <p className="text-[10px] text-slate-500 font-bold uppercase">Diabetes, Hypertension, etc.</p>
                                                </div>
                                            </div>
                                            <button
                                                onClick={() => setHasMedicalCondition(!hasMedicalCondition)}
                                                className={`w-14 h-8 rounded-full relative transition-colors ${hasMedicalCondition ? 'bg-gradient-to-r from-[#2076C7] to-[#1CADA3]' : 'bg-slate-200'
                                                    }`}
                                            >
                                                <div className={`absolute top-1 w-6 h-6 bg-white rounded-full transition-all ${hasMedicalCondition ? 'left-7' : 'left-1'
                                                    }`} />
                                            </button>
                                        </div>
                                    </div>
                                </motion.div>
                            )}
                        </AnimatePresence>

                        <div className="mt-8 flex gap-4 pt-8 border-t border-slate-100">
                            {step > 1 && (
                                <button
                                    onClick={prevStep}
                                    className="flex-shrink-0 w-14 h-14 rounded-2xl bg-slate-100 text-slate-500 flex items-center justify-center hover:bg-slate-200"
                                >
                                    <IconArrowLeft size={24} />
                                </button>
                            )}
                            <button
                                onClick={() => {
                                    if (!isStepValid()) {
                                        toast.error(step === 1 ? 'Please select both departure and return dates' : 'Please add at least one traveler');
                                        return;
                                    }
                                    if (step < 3) {
                                        nextStep();
                                    } else {
                                        setShowPlans(true);
                                        setTimeout(() => document.getElementById('recommended-plans')?.scrollIntoView({ behavior: 'smooth' }), 100);
                                    }
                                }}
                                className={`flex-grow py-4 font-black rounded-2xl shadow-lg hover:shadow-xl hover:scale-[1.02] active:scale-[0.98] transition-all flex items-center justify-center gap-3 ${isStepValid() ? 'bg-linear-to-r from-[#2076C7] to-[#1CADA3] text-white' : 'bg-slate-200 text-slate-400 cursor-not-allowed hover:scale-100'}`}
                            >
                                {step === 3 ? 'View Detailed Plans' : 'Continue'}
                                <IconArrowRight size={20} />
                            </button>
                        </div>
                    </motion.div>

                    {/* Result Visualization Card */}
                    <div className="space-y-6 lg:sticky lg:top-24">
                        <motion.div
                            layout
                            className="bg-gray-300 p-6 md:p-8 rounded-[2rem] md:rounded-[3rem] shadow-2xl relative overflow-hidden group"
                        >
                            <div className="absolute top-0 right-0 p-8 opacity-10 group-hover:rotate-12 transition-transform duration-1000">
                                <IconCalculator size={180} className="text-white" />
                            </div>

                            <div className="relative z-10">
                                <span className="text-[15px] font-black tracking-[0.3em] text-white mb-2 block">Quick Summary</span>

                                <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100 mt-3">
                                    <div className="flex items-center gap-3 md:gap-4 mb-4 md:mb-6">
                                        <div className="w-10 h-10 md:w-12 md:h-12 rounded-xl bg-slate-100 flex items-center justify-center flex-shrink-0">
                                            <IconShieldCheck size={24} className="md:size-7 text-[#2076C7]" />
                                        </div>
                                        <div>
                                            <h3 className="text-lg md:text-xl font-black text-slate-900">Estimated Quote</h3>
                                            <p className="text-[10px] md:text-xs font-bold text-slate-400">{travelers.length} Member(s) | {duration} Days</p>
                                        </div>
                                    </div>

                                    <div className="flex items-baseline gap-2 mb-4 md:mb-6 pb-4 md:pb-6 border-b border-slate-100">
                                        <span className="text-4xl md:text-6xl font-black text-slate-900">₹{totalPremium.toLocaleString()}</span>
                                        <span className="text-xs md:text-sm font-bold text-slate-400">Incl. GST</span>
                                    </div>

                                    <div className="grid grid-cols-2 gap-2 md:gap-3">
                                        <div className="bg-slate-50 p-3 md:p-4 rounded-xl border border-slate-100">
                                            <div className="text-[8px] md:text-[10px] font-black uppercase tracking-widest text-slate-400 mb-1">Max Cover</div>
                                            <div className="text-sm md:text-lg font-black text-slate-800">{sumInsured.label}</div>
                                        </div>
                                        <div className="bg-slate-50 p-3 md:p-4 rounded-xl border border-slate-100">
                                            <div className="text-[8px] md:text-[10px] font-black uppercase tracking-widest text-slate-400 mb-1">Zone</div>
                                            <div className="text-sm md:text-lg font-black text-slate-800 truncate">{destination.label.split(' ')[0]}</div>
                                        </div>
                                    </div>
                                </div>

                                <button
                                    onClick={openPartner}
                                    className="w-full mt-6 py-4 bg-linear-to-r from-[#2076C7] to-[#1CADA3] text-white font-black rounded-2xl shadow-xl hover:shadow-2xl hover:scale-[1.02] active:scale-[0.98] transition-all flex items-center justify-center gap-3 text-lg"
                                >
                                    Confirm & Proceed
                                    <IconArrowRight className="text-white" size={24} />
                                </button>
                            </div>
                        </motion.div>

                        {/* Why PolicyBazaar-Style? Section */}
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            className="bg-white p-8 rounded-[2.5rem] border border-slate-100 shadow-xl"
                        >
                            <div className="p-4 bg-teal-50 border border-teal-100/50 rounded-2xl flex items-start gap-4">
                                <IconInfoCircle className="text-secondary-teal flex-shrink-0 mt-0.5" size={20} />
                                <p className="text-[11px] text-teal-900/80 leading-relaxed font-bold">
                                    Calculated based on {destination.label} risk profile. Our logic accounts for high healthcare costs abroad to give you actual protection values in Indian Rupees.
                                </p>
                            </div>
                        </motion.div>
                    </div>
                </div>

                {/* --- Dynamic Plan Results Carousel --- */}
                {showPlans && totalPremium > 0 && (
                    <motion.div
                        id="recommended-plans"
                        initial={{ opacity: 0, y: 40 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="mt-20 border-t border-slate-200 pt-16"
                    >
                        <div className="flex flex-col md:flex-row items-center justify-between mb-8 md:mb-10 gap-6">
                            <div className="text-center md:text-left">
                                <h3 className="text-2xl md:text-3xl font-black gradient-text">Recommended Plans for You</h3>
                                <p className="text-sm md:text-base text-slate-500 font-bold mt-2">Personalized coverage from India's top insurers</p>
                            </div>
                            <div className="flex gap-4">
                                <button
                                    onClick={() => setCarouselIndex(Math.max(0, carouselIndex - 1))}
                                    className={`w-12 h-12 rounded-xl border-2 flex items-center justify-center transition-all ${carouselIndex === 0 ? 'border-slate-100 text-slate-200 cursor-not-allowed' : 'border-secondary-teal text-secondary-teal hover:bg-teal-50 shadow-sm'}`}
                                    disabled={carouselIndex === 0}
                                >
                                    <IconArrowLeft size={24} />
                                </button>
                                <button
                                    onClick={() => setCarouselIndex(Math.min(PROVIDERS.length - 3, carouselIndex + 1))}
                                    className={`w-12 h-12 rounded-xl border-2 flex items-center justify-center transition-all ${carouselIndex >= PROVIDERS.length - 3 ? 'border-slate-100 text-slate-200 cursor-not-allowed' : 'border-secondary-teal text-secondary-teal hover:bg-teal-50 shadow-sm'}`}
                                    disabled={carouselIndex >= PROVIDERS.length - 3}
                                >
                                    <IconArrowRight size={24} />
                                </button>
                            </div>
                        </div>

                        <div className="overflow-x-auto pb-8 -mx-6 px-6 lg:mx-0 lg:px-0 lg:overflow-visible custom-scrollbar">
                            <motion.div
                                animate={{ x: `-${carouselIndex * (window.innerWidth < 768 ? 100 : 33.33)}%` }}
                                transition={{ type: "spring", stiffness: 300, damping: 30 }}
                                className="flex"
                                style={{ gap: '1rem' }}
                            >
                                {PROVIDERS.map((p, idx) => (
                                    <motion.div
                                        key={idx}
                                        whileHover={{ y: -4 }}
                                        className="bg-white p-6 rounded-2xl border border-slate-100 shadow-[0_8px_24px_-5px_rgba(32,118,199,0.05)] hover:shadow-lg transition-all flex-shrink-0 w-full md:w-[calc(33.33%-0.67rem)]"
                                    >
                                        <div className="flex items-center gap-3 mb-6">
                                            <div className={`w-11 h-11 flex-shrink-0 ${p.brandColor} rounded-lg flex flex-col items-center justify-center border border-white/20 shadow-inner overflow-hidden relative`}>
                                                <span className="text-white font-black text-sm leading-none">{p.name.split(' ').map(n => n[0]).join('')}</span>
                                                <div className="absolute bottom-0 w-full h-0.5 bg-black/10"></div>
                                            </div>
                                            <div>
                                                <h4 className="text-base font-bold text-[#1CADA3] leading-tight">{p.name}</h4>
                                                <p className="text-xs font-medium text-slate-500">{p.planName}</p>
                                            </div>
                                        </div>

                                        <div className="grid grid-cols-2 gap-x-4 gap-y-4 mb-6">
                                            <div>
                                                <p className="text-[10px] font-bold text-slate-400 uppercase tracking-tight mb-1">Medical Cover</p>
                                                <p className="text-sm font-black text-slate-900">{p.medical}</p>
                                            </div>
                                            <div>
                                                <p className="text-[10px] font-bold text-slate-400 uppercase tracking-tight mb-1">Trip Cancel</p>
                                                <p className="text-sm font-black text-slate-900">{p.tripCancellation}</p>
                                            </div>
                                            <div>
                                                <p className="text-[10px] font-bold text-slate-400 uppercase tracking-tight mb-1">Baggage Loss</p>
                                                <p className="text-sm font-black text-slate-900">{p.baggageLoss}</p>
                                            </div>
                                            <div>
                                                <p className="text-[10px] font-bold text-slate-400 uppercase tracking-tight mb-1">Passport Loss</p>
                                                <p className="text-sm font-black text-slate-900">{p.passportLoss}</p>
                                            </div>
                                        </div>

                                        <div className="pt-5 border-t border-slate-100 flex items-center justify-between">
                                            <p className="text-sm font-bold text-slate-500">Plan Premium</p>
                                            <p className="text-xl font-black text-[#2076C7]">₹{Math.round(totalPremium * p.factor).toLocaleString()}</p>
                                        </div>
                                    </motion.div>
                                ))}
                            </motion.div>
                        </div>
                    </motion.div>
                )}
            </div>
        </section >
    );
}
