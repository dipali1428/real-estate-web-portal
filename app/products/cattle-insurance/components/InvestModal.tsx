'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { IconX, IconUser, IconDog, IconCheck, IconArrowRight, IconArrowLeft } from '@tabler/icons-react';

interface InvestModalProps {
    isOpen: boolean;
    onClose: () => void;
    animalType: string;
}

export default function InvestModal({ isOpen, onClose, animalType }: InvestModalProps) {
    const [step, setStep] = useState(1);
    const [isSubmitted, setIsSubmitted] = useState(false);
    const [ownerData, setOwnerData] = useState({
        name: '',
        phone: '',
        email: '',
        address: ''
    });
    const [animalData, setAnimalData] = useState({
        breed: '',
        age: '',
        marketValue: '',
        tagNumber: ''
    });

    const handleNext = () => setStep(2);
    const handleBack = () => setStep(1);

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        setIsSubmitted(true);
    };

    const handleReset = () => {
        setStep(1);
        setIsSubmitted(false);
        setOwnerData({ name: '', phone: '', email: '', address: '' });
        setAnimalData({ breed: '', age: '', marketValue: '', tagNumber: '' });
        onClose();
    };

    if (!isOpen) return null;

    return (
        <AnimatePresence>
            <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
                {/* Backdrop */}
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    onClick={handleReset}
                    className="absolute inset-0 bg-slate-900/60 backdrop-blur-sm"
                />

                {/* Modal Container */}
                <motion.div
                    initial={{ opacity: 0, scale: 0.95, y: 20 }}
                    animate={{ opacity: 1, scale: 1, y: 0 }}
                    exit={{ opacity: 0, scale: 0.95, y: 20 }}
                    className="relative w-full max-w-lg bg-white rounded-[2.5rem] shadow-2xl overflow-hidden z-10"
                >
                    {/* Header */}
                    <div className="bg-gradient-to-r from-[#2076C7] to-[#1CADA3] p-6 md:p-8 text-white relative">
                        <button
                            onClick={handleReset}
                            className="absolute top-4 right-4 md:top-6 md:right-6 p-2 rounded-full bg-white/10 hover:bg-white/20 transition-colors"
                        >
                            <IconX size={20} />
                        </button>
                        <div className="flex items-center gap-4 mb-2">
                            <div className="w-10 h-10 md:w-12 md:h-12 bg-white/20 rounded-2xl flex items-center justify-center backdrop-blur-md">
                                {step === 1 ? <IconUser size={20} className="md:size-6" /> : <IconDog size={20} className="md:size-6" />}
                            </div>
                            <div>
                                <h3 className="text-xl md:text-2xl font-black tracking-tight leading-none">
                                    {isSubmitted ? 'Success!' : `Step ${step}: ${step === 1 ? 'Owner Info' : 'Animal Info'}`}
                                </h3>
                                {!isSubmitted && (
                                    <p className="text-white/80 text-xs md:text-sm font-bold mt-2">
                                        Investing in {animalType}
                                    </p>
                                )}
                            </div>
                        </div>

                        {/* Progress Bar */}
                        {!isSubmitted && (
                            <div className="absolute bottom-0 left-0 h-1 bg-white/30 transition-all duration-500" style={{ width: `${(step / 2) * 100}%` }} />
                        )}
                    </div>

                    <div className="p-8">
                        {isSubmitted ? (
                            <div className="text-center py-10">
                                <div className="w-20 h-20 bg-green-100 rounded-[2rem] flex items-center justify-center mx-auto mb-6 shadow-xl shadow-green-500/10">
                                    <IconCheck size={40} className="text-green-600" strokeWidth={3} />
                                </div>
                                <h4 className="text-2xl font-black text-slate-800 mb-3 tracking-tight">Application Submitted!</h4>
                                <p className="text-slate-500 font-bold leading-relaxed mb-8">
                                    Our cattle insurance expert will review your data and contact you for verification.
                                </p>
                                <button
                                    onClick={handleReset}
                                    className="w-full py-4 rounded-2xl bg-linear-to-r from-[#2076C7] to-[#1CADA3] text-white font-black uppercase tracking-widest transition-all shadow-lg hover:shadow-blue-500/20"
                                >
                                    Close Window
                                </button>
                            </div>
                        ) : (
                            <form onSubmit={handleSubmit} className="space-y-6">
                                {step === 1 ? (
                                    <motion.div
                                        initial={{ opacity: 0, x: 20 }}
                                        animate={{ opacity: 1, x: 0 }}
                                        className="space-y-4"
                                    >
                                        <div className="grid grid-cols-1 gap-4">
                                            <div>
                                                <label className="block text-[10px] font-black text-slate-400 uppercase tracking-widest mb-2 px-1">Full Name</label>
                                                <input
                                                    required
                                                    type="text"
                                                    placeholder="Owner's Name"
                                                    value={ownerData.name}
                                                    onChange={e => setOwnerData({ ...ownerData, name: e.target.value })}
                                                    className="w-full px-5 py-4 rounded-2xl bg-slate-50 border border-slate-100 focus:outline-none focus:border-blue-400 focus:bg-white text-slate-700 font-bold transition-all"
                                                />
                                            </div>
                                            <div className="grid grid-cols-2 gap-4">
                                                <div>
                                                    <label className="block text-[10px] font-black text-slate-400 uppercase tracking-widest mb-2 px-1">Phone</label>
                                                    <input
                                                        required
                                                        type="tel"
                                                        placeholder="+91"
                                                        value={ownerData.phone}
                                                        onChange={e => setOwnerData({ ...ownerData, phone: e.target.value })}
                                                        className="w-full px-5 py-4 rounded-2xl bg-slate-50 border border-slate-100 focus:outline-none focus:border-blue-400 focus:bg-white text-slate-700 font-bold transition-all"
                                                    />
                                                </div>
                                                <div>
                                                    <label className="block text-[10px] font-black text-slate-400 uppercase tracking-widest mb-2 px-1">Email</label>
                                                    <input
                                                        type="email"
                                                        placeholder="Optional"
                                                        value={ownerData.email}
                                                        onChange={e => setOwnerData({ ...ownerData, email: e.target.value })}
                                                        className="w-full px-5 py-4 rounded-2xl bg-slate-50 border border-slate-100 focus:outline-none focus:border-blue-400 focus:bg-white text-slate-700 font-bold transition-all"
                                                    />
                                                </div>
                                            </div>
                                            <div>
                                                <label className="block text-[10px] font-black text-slate-400 uppercase tracking-widest mb-2 px-1">Address</label>
                                                <textarea
                                                    required
                                                    rows={3}
                                                    placeholder="Farm or Residential Address"
                                                    value={ownerData.address}
                                                    onChange={e => setOwnerData({ ...ownerData, address: e.target.value })}
                                                    className="w-full px-5 py-4 rounded-2xl bg-slate-50 border border-slate-100 focus:outline-none focus:border-blue-400 focus:bg-white text-slate-700 font-bold transition-all resize-none"
                                                />
                                            </div>
                                        </div>
                                    </motion.div>
                                ) : (
                                    <motion.div
                                        initial={{ opacity: 0, x: 20 }}
                                        animate={{ opacity: 1, x: 0 }}
                                        className="space-y-4"
                                    >
                                        <div className="grid grid-cols-2 gap-4">
                                            <div>
                                                <label className="block text-[10px] font-black text-slate-400 uppercase tracking-widest mb-2 px-1">Breed</label>
                                                <input
                                                    required
                                                    type="text"
                                                    placeholder="e.g. Gir, Murrah"
                                                    value={animalData.breed}
                                                    onChange={e => setAnimalData({ ...animalData, breed: e.target.value })}
                                                    className="w-full px-5 py-4 rounded-2xl bg-slate-50 border border-slate-100 focus:outline-none focus:border-blue-400 focus:bg-white text-slate-700 font-bold transition-all"
                                                />
                                            </div>
                                            <div>
                                                <label className="block text-[10px] font-black text-slate-400 uppercase tracking-widest mb-2 px-1">Age (Years)</label>
                                                <input
                                                    required
                                                    type="text"
                                                    placeholder="Animal Age"
                                                    value={animalData.age}
                                                    onChange={e => setAnimalData({ ...animalData, age: e.target.value })}
                                                    className="w-full px-5 py-4 rounded-2xl bg-slate-50 border border-slate-100 focus:outline-none focus:border-blue-400 focus:bg-white text-slate-700 font-bold transition-all"
                                                />
                                            </div>
                                            <div>
                                                <label className="block text-[10px] font-black text-slate-400 uppercase tracking-widest mb-2 px-1">Market Value</label>
                                                <input
                                                    required
                                                    type="text"
                                                    placeholder="₹ Current Price"
                                                    value={animalData.marketValue}
                                                    onChange={e => setAnimalData({ ...animalData, marketValue: e.target.value })}
                                                    className="w-full px-5 py-4 rounded-2xl bg-slate-50 border border-slate-100 focus:outline-none focus:border-blue-400 focus:bg-white text-slate-700 font-bold transition-all"
                                                />
                                            </div>
                                            <div>
                                                <label className="block text-[10px] font-black text-slate-400 uppercase tracking-widest mb-2 px-1">Tag Number</label>
                                                <input
                                                    required
                                                    type="text"
                                                    placeholder="Unique ID"
                                                    value={animalData.tagNumber}
                                                    onChange={e => setAnimalData({ ...animalData, tagNumber: e.target.value })}
                                                    className="w-full px-5 py-4 rounded-2xl bg-slate-50 border border-slate-100 focus:outline-none focus:border-blue-400 focus:bg-white text-slate-700 font-bold transition-all"
                                                />
                                            </div>
                                        </div>
                                    </motion.div>
                                )}

                                <div className="flex gap-4 pt-4">
                                    {step === 2 && (
                                        <button
                                            type="button"
                                            onClick={handleBack}
                                            className="flex-1 py-4 rounded-2xl bg-slate-100 text-slate-600 font-black uppercase tracking-widest hover:bg-slate-200 transition-all flex items-center justify-center gap-2"
                                        >
                                            <IconArrowLeft size={18} /> Back
                                        </button>
                                    )}
                                    {step === 1 ? (
                                        <button
                                            type="button"
                                            onClick={handleNext}
                                            disabled={!ownerData.name || !ownerData.phone || !ownerData.address}
                                            className="flex-1 py-4 rounded-2xl bg-linear-to-r from-[#2076C7] to-[#1CADA3] text-white font-black uppercase tracking-widest transition-all flex items-center justify-center gap-2 shadow-lg shadow-blue-500/20 disabled:opacity-50 disabled:cursor-not-allowed"
                                        >
                                            Next Step <IconArrowRight size={18} />
                                        </button>
                                    ) : (
                                        <button
                                            type="submit"
                                            className="flex-1 py-4 rounded-2xl bg-linear-to-r from-[#2076C7] to-[#1CADA3] text-white font-black uppercase tracking-widest transition-all flex items-center justify-center gap-2 shadow-lg shadow-teal-500/20"
                                        >
                                            Submit Form <IconCheck size={18} />
                                        </button>
                                    )}
                                </div>
                            </form>
                        )}
                    </div>
                </motion.div>
            </div>
        </AnimatePresence>
    );
}
