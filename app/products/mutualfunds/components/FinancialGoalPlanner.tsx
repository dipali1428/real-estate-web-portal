"use client";

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Target, Plus, X, LogIn, UserPlus, Info, ArrowRight } from 'lucide-react';
import { useRouter } from 'next/navigation';

const categories = [
    { name: 'Retirement', icon: '👴', color: 'bg-blue-100 text-blue-600' },
    { name: 'Education', icon: '🎓', color: 'bg-teal-100 text-teal-600' },
    { name: 'Home', icon: '🏠', color: 'bg-pink-100 text-pink-600' },
    { name: 'Car', icon: '🚗', color: 'bg-amber-100 text-amber-600' },
    { name: 'Vacation', icon: '✈️', color: 'bg-purple-100 text-purple-600' },
    { name: 'Emergency Fund', icon: '🚨', color: 'bg-rose-100 text-rose-600' },
    { name: 'Other', icon: '🎯', color: 'bg-gray-100 text-gray-600' }
];

export default function FinancialGoalPlanner() {
    const router = useRouter();
    const [showForm, setShowForm] = useState(false);
    const [showAuthPrompt, setShowAuthPrompt] = useState(false);
    const [formData, setFormData] = useState({
        name: '',
        category: 'Retirement',
        targetAmount: '',
        targetDate: ''
    });

    const checkAuth = () => {
        return typeof window !== 'undefined' && document.cookie.includes('authToken=');
    };

    const handleSave = (e: React.FormEvent) => {
        e.preventDefault();
        if (!checkAuth()) {
            setShowAuthPrompt(true);
        } else {
            // In a real scenario, this would call the API.
            // For the landing page, we'll redirect them to their goals dashboard.
            router.push('/product/mutual-funds/financial-goals');
        }
    };

    return (
        <section className="bg-white rounded-3xl p-8 md:p-12 border border-gray-100 shadow-sm relative overflow-hidden">
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-12 gap-6">
                <div className="max-w-xl">
                    <h2 className="text-3xl md:text-4xl font-medium text-slate-800 mb-4">Financial Goal Planner</h2>
                    <p className="text-lg text-slate-600 font-light">
                        Don't just invest, invest for a reason. Map out your life's milestones and let's calculate the path to achieve them.
                    </p>
                </div>
                {!showForm && (
                    <button
                        onClick={() => setShowForm(true)}
                        className="flex items-center gap-2 px-8 py-4 bg-gradient-to-r from-[#2076C7] to-[#1CADA3] text-white rounded-2xl shadow-lg hover:shadow-xl transition-all font-bold group"
                    >
                        <Plus className="w-5 h-5 group-hover:rotate-90 transition-transform" />
                        Create Your First Goal
                    </button>
                )}
            </div>

            {!showForm ? (
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 opacity-60 grayscale pointer-events-none select-none">
                    <div className="bg-gray-50 p-8 rounded-3xl border border-dashed border-gray-200 flex flex-col items-center justify-center text-center">
                        <div className="w-16 h-16 bg-white rounded-2xl shadow-sm flex items-center justify-center mb-4">
                            <Target className="text-gray-300 w-8 h-8" />
                        </div>
                        <h3 className="font-bold text-gray-400 mb-2">Child's Education</h3>
                        <p className="text-sm text-gray-400">Target: ₹25,00,000</p>
                    </div>
                    <div className="bg-gray-50 p-8 rounded-3xl border border-dashed border-gray-200 flex flex-col items-center justify-center text-center">
                        <div className="w-16 h-16 bg-white rounded-2xl shadow-sm flex items-center justify-center mb-4">
                            <Target className="text-gray-300 w-8 h-8" />
                        </div>
                        <h3 className="font-bold text-gray-400 mb-2">Dream Retirement</h3>
                        <p className="text-sm text-gray-400">Target: ₹5,00,00,000</p>
                    </div>
                    <div className="bg-gray-50 p-8 rounded-3xl border border-dashed border-gray-200 flex flex-col items-center justify-center text-center">
                        <div className="w-16 h-16 bg-white rounded-2xl shadow-sm flex items-center justify-center mb-4">
                            <Target className="text-gray-300 w-8 h-8" />
                        </div>
                        <h3 className="font-bold text-gray-400 mb-2">First Home</h3>
                        <p className="text-sm text-gray-400">Target: ₹75,00,000</p>
                    </div>
                </div>
            ) : (
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="max-w-4xl mx-auto"
                >
                    <form onSubmit={handleSave} className="grid grid-cols-1 md:grid-cols-2 gap-8">
                        <div className="space-y-6">
                            <div>
                                <label className="block text-sm font-semibold text-gray-700 mb-2">What are you saving for?</label>
                                <input
                                    type="text"
                                    required
                                    value={formData.name}
                                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                                    placeholder="e.g. Daughter's Higher Studies"
                                    className="w-full px-5 py-4 bg-gray-50 border border-gray-100 rounded-2xl focus:outline-none focus:ring-2 focus:ring-[#1CADA3] focus:bg-white transition-all text-gray-900"
                                />
                            </div>

                            <div>
                                <label className="block text-sm font-semibold text-gray-700 mb-4">Choose a Category</label>
                                <div className="grid grid-cols-3 sm:grid-cols-4 gap-3">
                                    {categories.map((cat) => (
                                        <button
                                            key={cat.name}
                                            type="button"
                                            onClick={() => setFormData({ ...formData, category: cat.name })}
                                            className={`p-3 rounded-2xl flex flex-col items-center justify-center gap-2 transition-all border ${formData.category === cat.name
                                                    ? 'bg-white border-[#1CADA3] shadow-md scale-105'
                                                    : 'bg-gray-50 border-transparent hover:bg-white hover:border-gray-200'
                                                }`}
                                        >
                                            <span className="text-2xl">{cat.icon}</span>
                                            <span className="text-[10px] font-bold uppercase tracking-wider text-gray-500">{cat.name}</span>
                                        </button>
                                    ))}
                                </div>
                            </div>
                        </div>

                        <div className="space-y-6">
                            <div>
                                <label className="block text-sm font-semibold text-gray-700 mb-2">Target Amount (₹)</label>
                                <input
                                    type="number"
                                    required
                                    value={formData.targetAmount}
                                    onChange={(e) => setFormData({ ...formData, targetAmount: e.target.value })}
                                    placeholder="e.g. 5000000"
                                    className="w-full px-5 py-4 bg-gray-50 border border-gray-100 rounded-2xl focus:outline-none focus:ring-2 focus:ring-[#1CADA3] focus:bg-white transition-all text-gray-900 font-sans"
                                />
                            </div>

                            <div>
                                <label className="block text-sm font-semibold text-gray-700 mb-2">Target Date</label>
                                <input
                                    type="date"
                                    required
                                    value={formData.targetDate}
                                    onChange={(e) => setFormData({ ...formData, targetDate: e.target.value })}
                                    className="w-full px-5 py-4 bg-gray-50 border border-gray-100 rounded-2xl focus:outline-none focus:ring-2 focus:ring-[#1CADA3] focus:bg-white transition-all text-gray-900"
                                />
                            </div>

                            <div className="pt-4 flex gap-4">
                                <button
                                    type="button"
                                    onClick={() => setShowForm(false)}
                                    className="flex-1 px-6 py-4 border-2 border-gray-100 text-gray-500 rounded-2xl hover:bg-gray-50 transition-all font-bold"
                                >
                                    Cancel
                                </button>
                                <button
                                    type="submit"
                                    className="flex-3 px-10 py-4 bg-gradient-to-r from-[#2076C7] to-[#1CADA3] text-white rounded-2xl shadow-lg hover:shadow-xl hover:scale-[1.02] active:scale-[0.98] transition-all font-bold flex items-center justify-center gap-2"
                                >
                                    Save & Plan Goal
                                </button>
                            </div>
                        </div>
                    </form>
                </motion.div>
            )}

            {/* Auth Prompt Modal */}
            <AnimatePresence>
                {showAuthPrompt && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="fixed inset-0 z-[100] flex items-center justify-center p-6 bg-slate-900/60 backdrop-blur-sm"
                    >
                        <motion.div
                            initial={{ scale: 0.9, y: 20 }}
                            animate={{ scale: 1, y: 0 }}
                            exit={{ scale: 0.9, y: 20 }}
                            className="bg-white rounded-[2rem] w-full max-w-lg overflow-hidden shadow-2xl relative"
                        >
                            <button
                                onClick={() => setShowAuthPrompt(false)}
                                className="absolute top-6 right-6 p-2 text-slate-400 hover:text-slate-600 hover:bg-slate-50 rounded-xl transition-all"
                            >
                                <X className="w-6 h-6" />
                            </button>

                            <div className="p-10 pt-16 text-center">
                                <div className="w-20 h-20 bg-blue-50 rounded-3xl flex items-center justify-center mx-auto mb-8">
                                    <Target className="text-[#2076C7] w-10 h-10" />
                                </div>
                                <h3 className="text-3xl font-bold text-slate-800 mb-4">Almost There!</h3>
                                <p className="text-slate-600 mb-10 leading-relaxed text-lg">
                                    We've captured your <span className="text-[#2076C7] font-bold font-sans">₹{Number(formData.targetAmount).toLocaleString('en-IN')}</span> goal for <span className="text-[#1CADA3] font-bold">{formData.name}</span>.
                                    Please login to save this goal and track your progress.
                                </p>

                                <div className="space-y-4">
                                    <button
                                        onClick={() => router.push('/product/mutual-funds/register')}
                                        className="w-full flex items-center justify-between px-8 py-5 bg-gradient-to-r from-[#2076C7] to-[#1CADA3] text-white rounded-2xl shadow-lg hover:shadow-xl transition-all font-bold group"
                                    >
                                        <div className="flex items-center gap-3">
                                            <UserPlus className="w-6 h-6" />
                                            <span>Create Free Account</span>
                                        </div>
                                        <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                                    </button>

                                    <button
                                        onClick={() => router.push('/product/mutual-funds/login')}
                                        className="w-full flex items-center justify-center gap-3 px-8 py-5 bg-white border-2 border-blue-50 text-slate-700 rounded-2xl hover:bg-blue-50/50 hover:border-blue-100 transition-all font-bold"
                                    >
                                        <LogIn className="w-5 h-5 text-[#2076C7]" />
                                        <span>Sign In to Your Account</span>
                                    </button>
                                </div>

                                <div className="mt-8 flex items-center justify-center gap-2 text-xs text-slate-400 font-medium">
                                    <Info className="w-3 h-3" />
                                    <span>Your goal details will be saved after login</span>
                                </div>
                            </div>
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>
        </section>
    );
}
