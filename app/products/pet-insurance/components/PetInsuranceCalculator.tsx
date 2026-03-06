'use client';

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import toast from 'react-hot-toast';
import {
    IconCalculator,
    IconCheck,
    IconInfoCircle,
    IconClock,
    IconShieldCheck,
    IconArrowRight,
    IconArrowLeft,
    IconStethoscope,
    IconDog,
    IconCat,
    IconBone,
    IconVaccine,
    IconHeart,
    IconFeather,
    IconPaw
} from '@tabler/icons-react';
import { useModal } from '@/app/context/ModalContext';

const PET_TYPES = [
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

const PROVIDERS = [
    {
        name: 'Digit Pet',
        brandColor: 'bg-[#2076C7]',
        planName: 'Digit Compassion',
        medical: '100% of Cover',
        surgery: '50% of Cover',
        recovery: 'Up to ₹10k',
        wellness: 'Optional',
        factor: 1.0
    },
    {
        name: 'Bajaj Allianz',
        brandColor: 'bg-[#1CADA3]',
        planName: 'Pet Elite',
        medical: '100% of Cover',
        surgery: '80% of Cover',
        recovery: 'Up to ₹15k',
        wellness: '₹5k Limit',
        factor: 1.15
    },
    {
        name: 'Oriental Ins.',
        brandColor: 'bg-[#2076C7]',
        planName: 'Traditional Paws',
        medical: '80% of Cover',
        surgery: '50% of Cover',
        recovery: 'Up to ₹5k',
        wellness: 'Not Available',
        factor: 0.85
    },
];

export default function PetInsuranceCalculator() {
    const { openPartner } = useModal();
    const [step, setStep] = useState(1);
    const [petType, setPetType] = useState(PET_TYPES[0]);
    const [petName, setPetName] = useState('');
    const [petBreed, setPetBreed] = useState('');
    const [petSubType, setPetSubType] = useState('');
    const [ageGroup, setAgeGroup] = useState(AGE_GROUPS[1]);
    const [sumInsured, setSumInsured] = useState(SUM_INSURED_OPTIONS[0]);
    const [hasOPD, setHasOPD] = useState(false);
    const [totalPremium, setTotalPremium] = useState(0);
    const [showPlans, setShowPlans] = useState(false);
    const [carouselIndex, setCarouselIndex] = useState(0);

    // Premium Calculation Logic
    useEffect(() => {
        let calculatedPremium = petType.baseRate * ageGroup.multiplier * sumInsured.factor;
        if (hasOPD) calculatedPremium *= 1.3; // 30% loading for OPD

        // Applying GST (18%) and rounding
        const withGst = calculatedPremium * 1.18;
        setTotalPremium(Math.round(withGst));
    }, [petType, ageGroup, sumInsured, hasOPD]);

    const nextStep = () => setStep(s => Math.min(s + 1, 3));
    const prevStep = () => setStep(s => Math.max(s - 1, 1));

    const isStepValid = () => {
        if (step === 1) return petName.trim() !== '';
        return true;
    };

    return (
        <section id="calculator" className="pt-24 pb-12 px-4 sm:px-6 bg-slate-50 relative overflow-hidden">
            <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-[#2076C7]/10 rounded-full blur-[120px] -z-0" />
            <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-[#1CADA3]/10 rounded-full blur-[120px] -z-0" />

            <div className="max-w-6xl mx-auto relative z-10">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="text-center mb-10 md:mb-16"
                >
                    <span className="text-[#2076C7] font-bold tracking-widest uppercase text-xs md:text-sm">Instant Estimates</span>
                    <h2 className="text-3xl md:text-4xl font-extrabold mb-3 bg-linear-to-r from-[#2076C7] to-[#1CADA3] bg-clip-text text-transparent drop-shadow-sm px-2">
                        Pet Premium Calculator
                    </h2>
                    <p className="text-base md:text-lg text-slate-500 mt-4 max-w-2xl mx-auto px-4 md:px-0">
                        Get personalized insurance quotes for your pet in just a few clicks. Fast, accurate, and completely free.
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
                                {num === 1 ? 'Pet Info' : num === 2 ? 'Profile' : 'Coverage'}
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
                        className="bg-white p-5 sm:p-6 md:p-11 rounded-[2rem] md:rounded-[3rem] shadow-[0_32px_64px_-16px_rgba(32,118,199,0.08)] border border-slate-100 min-h-[480px] md:min-h-[560px] flex flex-col relative overflow-hidden"
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
                                            <IconHeart className="text-[#1CADA3]" size={20} />
                                            What's your pet's name?
                                        </label>
                                        <input
                                            type="text"
                                            value={petName}
                                            onChange={(e) => setPetName(e.target.value)}
                                            placeholder="Enter Pet Name"
                                            className="w-full p-4 bg-slate-50 border border-slate-100 rounded-2xl font-bold text-slate-700 outline-none focus:border-[#2076C7]/30 text-lg shadow-sm"
                                        />
                                    </div>

                                    <div>
                                        <label className="flex items-center gap-2 text-sm font-black text-slate-900 uppercase tracking-widest mb-4">
                                            <IconDog className="text-[#2076C7]" size={20} />
                                            Pet Type
                                        </label>
                                        <div className="grid grid-cols-2 lg:grid-cols-4 lg:gap-3 gap-4">
                                            {PET_TYPES.map((type) => (
                                                <button
                                                    key={type.id}
                                                    onClick={() => setPetType(type)}
                                                    className={`py-6 px-4 rounded-2xl border-2 font-bold transition-all flex flex-col items-center gap-2 ${petType.id === type.id
                                                        ? 'border-[#2076C7] bg-blue-50 text-[#2076C7] shadow-sm'
                                                        : 'border-slate-100 bg-slate-50 text-slate-400 hover:border-blue-200'
                                                        }`}
                                                >
                                                    <type.icon size={32} />
                                                    {type.label}
                                                </button>
                                            ))}
                                        </div>
                                    </div>

                                    {/* Breed / Sub-Type Dropdown */}
                                    <div className="mt-8">
                                        <label className="flex items-center gap-2 text-sm font-black text-slate-900 uppercase tracking-widest mb-4">
                                            <IconBone className="text-[#1CADA3]" size={20} />
                                            Breed / Sub-Type
                                        </label>
                                        <select
                                            value={petSubType}
                                            onChange={(e) => setPetSubType(e.target.value)}
                                            className="w-full p-4 bg-slate-50 border border-slate-100 rounded-2xl font-bold text-slate-700 outline-none focus:border-[#2076C7]/30 text-lg shadow-sm appearance-none cursor-pointer"
                                        >
                                            <option value="">Select Breed / Sub-Type</option>
                                            {BREED_OPTIONS[petType.id]?.map((breed) => (
                                                <option key={breed} value={breed}>{breed}</option>
                                            ))}
                                        </select>
                                    </div>
                                </motion.div>
                            )}

                            {step === 2 && (
                                <motion.div
                                    key="step2"
                                    initial={{ opacity: 0, x: 20 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    exit={{ opacity: 0, x: -20 }}
                                    className="space-y-8 flex-grow"
                                >
                                    <div>
                                        <label className="flex items-center gap-2 text-sm font-black text-slate-900 uppercase tracking-widest mb-4">
                                            <IconClock className="text-[#2076C7]" size={20} />
                                            Pet Age
                                        </label>
                                        <div className="grid grid-cols-1 gap-3">
                                            {AGE_GROUPS.map((g) => (
                                                <button
                                                    key={g.label}
                                                    onClick={() => setAgeGroup(g)}
                                                    className={`py-4 px-6 rounded-2xl border-2 font-bold transition-all text-left flex justify-between items-center ${ageGroup.label === g.label
                                                        ? 'border-[#1CADA3] bg-teal-50 text-[#1CADA3]'
                                                        : 'border-slate-100 bg-slate-50 text-slate-500'
                                                        }`}
                                                >
                                                    {g.label}
                                                    {ageGroup.label === g.label && <IconCheck size={20} />}
                                                </button>
                                            ))}
                                        </div>
                                    </div>

                                    <div>
                                        <label className="flex items-center gap-2 text-sm font-black text-slate-900 uppercase tracking-widest mb-4">
                                            <IconBone className="text-[#2076C7]" size={20} />
                                            Pet Breed (Optional)
                                        </label>
                                        <input
                                            type="text"
                                            value={petBreed}
                                            onChange={(e) => setPetBreed(e.target.value)}
                                            placeholder="Enter Breed"
                                            className="w-full p-4 bg-slate-50 border border-slate-100 rounded-2xl font-bold text-slate-700 outline-none focus:border-[#2076C7]/30"
                                        />
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
                                            Sum Insured (Annually)
                                        </label>
                                        <div className="grid grid-cols-1 gap-3">
                                            {SUM_INSURED_OPTIONS.map((opt) => (
                                                <button
                                                    key={opt.value}
                                                    onClick={() => setSumInsured(opt)}
                                                    className={`py-4 px-6 rounded-2xl border-2 font-black transition-all flex justify-between items-center ${sumInsured.value === opt.value
                                                        ? 'border-[#2076C7] bg-blue-50 text-[#2076C7]'
                                                        : 'border-slate-100 bg-slate-50 text-slate-500'
                                                        }`}
                                                >
                                                    {opt.label}
                                                    {sumInsured.value === opt.value && <IconCheck size={20} />}
                                                </button>
                                            ))}
                                        </div>
                                    </div>

                                    <div className="p-6 rounded-3xl bg-slate-50 border border-slate-100">
                                        <div className="flex items-center justify-between">
                                            <div className="flex items-center gap-3">
                                                <IconVaccine className="text-[#2076C7]" size={24} />
                                                <div>
                                                    <p className="text-sm font-black text-slate-900">Add OPD Cover?</p>
                                                    <p className="text-[10px] text-slate-500 font-bold uppercase">Routine Checkups & Consultations</p>
                                                </div>
                                            </div>
                                            <button
                                                onClick={() => setHasOPD(!hasOPD)}
                                                className={`w-14 h-8 rounded-full relative transition-colors ${hasOPD ? 'bg-gradient-to-r from-[#2076C7] to-[#1CADA3]' : 'bg-slate-200'
                                                    }`}
                                            >
                                                <div className={`absolute top-1 w-6 h-6 bg-white rounded-full transition-all ${hasOPD ? 'left-7' : 'left-1'
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
                                        toast.error("Please enter your pet's name");
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
                                {step === 3 ? 'View Detailed Quotes' : 'Next Step'}
                                <IconArrowRight size={20} />
                            </button>
                        </div>
                    </motion.div>

                    {/* Quick Summary Card */}
                    <div className="space-y-6 lg:sticky lg:top-24">
                        <motion.div
                            layout
                            className="bg-white p-6 md:p-8 rounded-[2rem] md:rounded-[3rem] shadow-2xl relative overflow-hidden group"
                        >
                            <div className="absolute top-0 right-0 p-8 opacity-10 group-hover:rotate-12 transition-transform duration-1000">
                                <IconCalculator size={180} className="text-slate-200" />
                            </div>

                            <div className="relative z-10">
                                <span className="text-[12px] font-black tracking-[0.3em] text-[#2076C7] mb-2 block uppercase">Monthly Premium</span>

                                <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100 mt-3">
                                    <div className="flex items-center gap-3 md:gap-4 mb-4 md:mb-6">
                                        <div className="w-10 h-10 md:w-12 md:h-12 rounded-xl bg-blue-50 flex items-center justify-center flex-shrink-0">
                                            <petType.icon size={24} className="text-[#2076C7]" />
                                        </div>
                                        <div>
                                            <h3 className="text-lg md:text-xl font-black text-slate-900">{petName || 'Your Pet'}</h3>
                                            <p className="text-[10px] md:text-xs font-bold text-slate-400">{petType.label} | {ageGroup.label.split(' ')[0]}</p>
                                        </div>
                                    </div>

                                    <div className="flex items-baseline gap-2 mb-4 md:mb-6 pb-4 md:pb-6 border-b border-slate-100">
                                        <span className="text-4xl md:text-6xl font-black text-slate-900">₹{totalPremium.toLocaleString()}</span>
                                        <span className="text-xs md:text-sm font-bold text-slate-400">/mo</span>
                                    </div>

                                    <div className="grid grid-cols-2 gap-2 md:gap-3">
                                        <div className="bg-slate-50 p-3 md:p-4 rounded-xl border border-slate-100">
                                            <div className="text-[8px] md:text-[10px] font-black uppercase tracking-widest text-slate-400 mb-1">Coverage</div>
                                            <div className="text-sm md:text-lg font-black text-slate-800">{sumInsured.label}</div>
                                        </div>
                                        <div className="bg-slate-50 p-3 md:p-4 rounded-xl border border-slate-100">
                                            <div className="text-[8px] md:text-[10px] font-black uppercase tracking-widest text-slate-400 mb-1">OPD Cover</div>
                                            <div className="text-sm md:text-lg font-black text-slate-800">{hasOPD ? 'Yes' : 'No'}</div>
                                        </div>
                                    </div>
                                </div>

                                <button
                                    onClick={openPartner}
                                    className="w-full mt-6 py-4 bg-linear-to-r from-[#2076C7] to-[#1CADA3] text-white font-black rounded-2xl shadow-xl hover:shadow-2xl hover:scale-[1.02] active:scale-[0.98] transition-all flex items-center justify-center gap-3 text-lg"
                                >
                                    Get This Plan
                                    <IconArrowRight className="text-white" size={24} />
                                </button>
                            </div>
                        </motion.div>

                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            className="bg-white p-8 rounded-[2.5rem] border border-slate-100 shadow-xl"
                        >
                            <div className="p-4 bg-blue-50 border border-blue-100 rounded-2xl flex items-start gap-4">
                                <IconInfoCircle className="text-[#2076C7] flex-shrink-0 mt-0.5" size={20} />
                                <p className="text-[11px] text-slate-600 leading-relaxed font-bold">
                                    Premium is subject to change based on actual medical checkup results (if required). Taxes are included in the estimate.
                                </p>
                            </div>
                        </motion.div>
                    </div>
                </div>

                {/* --- Plan Comparison --- */}
                {showPlans && (
                    <motion.div
                        id="recommended-plans"
                        initial={{ opacity: 0, y: 40 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="mt-20 border-t border-slate-200 pt-16"
                    >
                        <div className="text-center mb-12">
                            <h3 className="text-3xl md:text-4xl font-extrabold mb-3 bg-linear-to-r from-[#2076C7] to-[#1CADA3] bg-clip-text text-transparent drop-shadow-sm leading-tight px-2">
                                Compare Top Pet Plans
                            </h3>
                            <div className="w-24 h-1 mx-auto bg-gradient-to-r from-[#2076C7] via-[#1CADA3] to-[#2076C7] rounded-full mt-4 mb-4" />
                            <p className="text-base md:text-lg text-slate-500 font-bold mt-4 px-4 md:px-0">Recommended for {petName || 'your pet'}'s profile</p>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                            {PROVIDERS.map((p, idx) => (
                                <motion.div
                                    key={idx}
                                    whileHover={{ y: -8 }}
                                    className="bg-white p-8 rounded-[2rem] border border-slate-100 shadow-xl flex flex-col h-full"
                                >
                                    <div className="flex items-center gap-4 mb-8">
                                        <div className={`w-14 h-14 flex-shrink-0 ${p.brandColor} rounded-2xl flex items-center justify-center text-white font-black text-xl`}>
                                            {p.name.charAt(0)}
                                        </div>
                                        <div>
                                            <h4 className="text-xl font-black text-slate-900 leading-tight">{p.name}</h4>
                                            <p className="text-xs font-bold text-[#1CADA3]">{p.planName}</p>
                                        </div>
                                    </div>

                                    <div className="space-y-4 mb-8 flex-grow">
                                        {[
                                            { label: 'Medical Illness', val: p.medical },
                                            { label: 'Surgery Limit', val: p.surgery },
                                            { label: 'Recovery Benefit', val: p.recovery },
                                            { label: 'Wellness Cover', val: p.wellness }
                                        ].map((item, i) => (
                                            <div key={i} className="flex justify-between items-center py-3 border-b border-slate-50">
                                                <span className="text-xs font-bold text-slate-400 uppercase tracking-wider">{item.label}</span>
                                                <span className="text-sm font-black text-slate-900">{item.val}</span>
                                            </div>
                                        ))}
                                    </div>

                                    <div className="pt-6 mt-auto">
                                        <div className="flex items-baseline justify-between mb-6">
                                            <span className="text-sm font-bold text-slate-400">Monthly</span>
                                            <span className="text-3xl font-black text-[#2076C7]">₹{Math.round(totalPremium * p.factor).toLocaleString()}</span>
                                        </div>
                                        <button onClick={openPartner} className="w-full py-4 bg-linear-to-r from-[#2076C7] to-[#1CADA3] text-white font-black rounded-xl shadow-md hover:shadow-lg transition-all">
                                            Apply Now
                                        </button>
                                    </div>
                                </motion.div>
                            ))}
                        </div>
                    </motion.div>
                )}
            </div>
        </section >
    );
}
