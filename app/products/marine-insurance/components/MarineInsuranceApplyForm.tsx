'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Send, User, Mail, Phone, MapPin, Ship } from 'lucide-react';

interface ApplyFormProps {
    isOpen: boolean;
    onClose: () => void;
    planName?: string;
}

const MarineInsuranceApplyForm: React.FC<ApplyFormProps> = ({ isOpen, onClose, planName }) => {
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [isSuccess, setIsSuccess] = useState(false);

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        setIsSubmitting(true);
        // Simulate API call
        setTimeout(() => {
            setIsSubmitting(false);
            setIsSuccess(true);
        }, 1500);
    };

    if (!isOpen && !isSuccess) return null;

    return (
        <AnimatePresence>
            {(isOpen || isSuccess) && (
                <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
                    {/* Backdrop */}
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        onClick={onClose}
                        className="absolute inset-0 bg-gray-900/60 backdrop-blur-sm"
                    />

                    {/* Modal Content */}
                    <motion.div
                        initial={{ opacity: 0, scale: 0.9, y: 20 }}
                        animate={{ opacity: 1, scale: 1, y: 0 }}
                        exit={{ opacity: 0, scale: 0.9, y: 20 }}
                        className="relative w-full max-w-lg bg-white rounded-xl shadow-2xl overflow-hidden overflow-y-auto max-h-[90vh] custom-scrollbar"
                    >
                        {/* Header Section */}
                        <div className="h-36 relative flex items-center justify-center overflow-hidden"
                            style={{ background: 'linear-gradient(135deg, #2076C7, #1CADA3)' }}
                        >
                            <h2 className="text-2xl font-bold text-white relative z-10 uppercase tracking-[0.2em] px-8 text-center pt-2">
                                Protect Your Cargo
                            </h2>
                            <button
                                onClick={onClose}
                                className="absolute top-6 right-6 p-2 rounded-full hover:bg-white/10 text-white transition-all z-20"
                            >
                                <X size={24} />
                            </button>
                        </div>

                        <div className="p-8 sm:p-12">
                            {!isSuccess ? (
                                <>
                                    <div className="mb-10 flex flex-col items-center text-center">
                                        <p className="text-gray-400 font-bold text-[10px] uppercase tracking-[0.2em] mb-2 leading-none">Applying For:</p>
                                        <h3 className="text-xl font-bold text-[#2076C7] uppercase tracking-tight leading-none h-10 flex items-center">
                                            {planName || 'Standard Marine Cargo Insurance'}
                                        </h3>
                                    </div>

                                    <form onSubmit={handleSubmit} className="space-y-4">
                                        <div className="space-y-4">
                                            {/* Full Name */}
                                            <div className="relative group">
                                                <User className="absolute left-6 top-1/2 -translate-y-1/2 text-gray-400" size={20} />
                                                <input
                                                    required
                                                    type="text"
                                                    placeholder="Full Name / Business Name"
                                                    className="w-full h-16 pl-16 pr-6 bg-gray-50 border-none rounded-2xl outline-none focus:ring-2 focus:ring-primary/10 transition-all font-bold text-gray-700 placeholder:text-gray-400/80"
                                                />
                                            </div>

                                            {/* Email */}
                                            <div className="relative group">
                                                <Mail className="absolute left-6 top-1/2 -translate-y-1/2 text-gray-400" size={20} />
                                                <input
                                                    required
                                                    type="email"
                                                    placeholder="Email Address"
                                                    className="w-full h-16 pl-16 pr-6 bg-gray-50 border-none rounded-2xl outline-none focus:ring-2 focus:ring-primary/10 transition-all font-bold text-gray-700 placeholder:text-gray-400/80"
                                                />
                                            </div>

                                            <div className="grid grid-cols-1 md:grid-cols-1 gap-4">
                                                {/* Phone */}
                                                <div className="relative group col-span-1">
                                                    <Phone className="absolute left-6 top-1/2 -translate-y-1/2 text-gray-400" size={20} />
                                                    <input
                                                        required
                                                        type="tel"
                                                        placeholder="Phone Number"
                                                        className="w-full h-16 pl-16 pr-6 bg-gray-50 border-none rounded-2xl outline-none focus:ring-2 focus:ring-primary/10 transition-all font-bold text-gray-700 placeholder:text-gray-400/80"
                                                    />
                                                </div>
                                            </div>

                                            {/* City */}
                                            <div className="relative group">
                                                <MapPin className="absolute left-6 top-1/2 -translate-y-1/2 text-gray-400" size={20} />
                                                <input
                                                    required
                                                    type="text"
                                                    placeholder="Port of Origin / City"
                                                    className="w-full h-16 pl-16 pr-6 bg-gray-50 border-none rounded-2xl outline-none focus:ring-2 focus:ring-primary/10 transition-all font-bold text-gray-700 placeholder:text-gray-400/80"
                                                />
                                            </div>
                                        </div>

                                        <button
                                            type="submit"
                                            disabled={isSubmitting}
                                            className="w-full mt-6 h-18 text-white rounded-full font-bold tracking-widest text-lg shadow-[0_12px_24px_rgba(28,173,163,0.3)] hover:brightness-110 active:scale-[0.98] transition-all flex items-center justify-center gap-3 disabled:opacity-70 disabled:scale-100 overflow-hidden"
                                            style={{ background: 'linear-gradient(to right, #2076C7, #1CADA3)' }}
                                        >
                                            {isSubmitting ? (
                                                <div className="w-6 h-6 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                                            ) : (
                                                <>
                                                    GET FREE QUOTE
                                                    <Send size={20} />
                                                </>
                                            )}
                                        </button>

                                        <p className="text-[9px] text-gray-400 text-center font-bold leading-relaxed uppercase tracking-wider pt-4 px-4">
                                            By submitting, you agree to our Terms and authorize our experts to reach out for personalized advice.
                                        </p>
                                    </form>
                                </>
                            ) : (
                                <motion.div
                                    initial={{ opacity: 0, y: 10 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    className="text-center py-10"
                                >
                                    <div className="w-20 h-20 rounded-xl flex items-center justify-center mx-auto mb-6 shadow-2xl"
                                        style={{ background: 'linear-gradient(to bottom right, #2076C7, #1CADA3)' }}
                                    >
                                        <Ship size={32} className="text-white" />
                                    </div>
                                    <h3 className="text-2xl font-bold text-gray-900 uppercase tracking-tight mb-4">
                                        Quote Request Sent!
                                    </h3>
                                    <p className="text-gray-500 font-medium mb-10 max-w-xs mx-auto">
                                        Our marine insurance specialist will contact you within 30 minutes to provide your customized quote.
                                    </p>
                                    <button
                                        onClick={onClose}
                                        className="px-10 py-4 bg-gray-900 text-white rounded-full font-bold tracking-widest text-xs hover:scale-105 active:scale-95 transition-all shadow-xl"
                                    >
                                        RETURN TO PLANS
                                    </button>
                                </motion.div>
                            )}
                        </div>
                    </motion.div>
                </div>
            )}
        </AnimatePresence>
    );
};

export default MarineInsuranceApplyForm;
